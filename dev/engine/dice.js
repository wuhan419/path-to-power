/* ============================================================================
 * POTUS ENGINE · dice.js
 * 胜算计算、资源投注（stake）、五档掷骰、D&D 式判定明细。
 * 纯机制，不含任何剧情数值。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* 单条修饰符 -> {v, label}；不满足条件时 v=0 */
  function evalMod(m) {
    const G = P.G;
    if (m.src === "attr" && G.attr[m.key] != null) {
      const v = (G.attr[m.key] - 50) / 100 * (m.w == null ? 0.6 : m.w);
      return { v: v, label: m.key + " " + G.attr[m.key] };
    }
    if (m.src === "fac") {
      const v = (G.faction[m.key] || 0) / 100 * (m.w == null ? 0.3 : m.w);
      return { v: v, label: P.t("ui.dice.modFac", "派系·{v}", { v: P.factionName(m.key) }) };
    }
    if (m.src === "flag") { const v = P.hasFlag(m.key) ? m.w : 0; return { v: v, label: P.t("ui.dice.modFlag", "状态·{v}", { v: m.key }) }; }
    if (m.src === "talent") { const v = G.talent === m.key ? m.w : 0; return { v: v, label: P.t("ui.dice.modTalent", "天赋·{v}", { v: m.key }) }; }
    if (m.src === "track") { const v = G.track === m.key ? m.w : 0; return { v: v, label: P.t("ui.dice.modTrack", "轨道·{v}", { v: m.key }) }; }
    if (m.src === "party") { const v = G.party === m.key ? m.w : 0; return { v: v, label: P.t("ui.dice.modParty", "党派·{v}", { v: m.key }) }; }
    if (m.src === "stance") { const v = G.stance === m.key ? m.w : 0; return { v: v, label: P.t("ui.dice.modStance", "姿态·{v}", { v: m.key }) }; }
    if (m.src === "tier") { const v = G.tier * m.w; return { v: v, label: P.t("ui.tier.level", "等级 {n}", { n: G.tier + 1 }) }; }
    if (m.src === "res" && m.key === "fun") { const v = G.fun >= (m.min || 0) ? m.w : 0; return { v: v, label: P.t("ui.dice.modFunOk", "资金充足") }; }
    /* v0.6 选民底气：voterEdge() ∈ [-1,1]（自然均衡点处为 0）。
       内容可以用 mods: [{ src: "voters", w: 0.08 }] 显式声明，
       晋升/连任类选项则由 computeP 自动附加（见下）。 */
    if (m.src === "voters") {
      const e = P.voterEdge ? P.voterEdge() : 0;
      const w = m.w == null ? 0.06 : m.w;
      /* 「选民底气 X%」：validate.js 的相关断言已包进 ZH(() => …)，可放心提取 */
      return { v: e * w, label: P.t("ui.dice.modVoters", "选民底气 {pct}%", { pct: P.electionStrength().pct }) };
    }
    return { v: 0, label: null };
  }

  /* 这个选项是不是"交给选民裁决"的（晋升/连任）：任一档位的成功效果里含 tier +1。
   * 用于 computeP 自动附加选民底气修正 —— 内容不用逐条改就能吃到"选民影响晋升"。 */
  P.isContestChoice = function (ch) {
    if (!ch || !ch.outcomes) return false;
    const oc = ch.outcomes;
    for (const k in oc) {
      const eff = oc[k] && oc[k].effects;
      if (eff && typeof eff.tier === "number" && eff.tier > 0) return true;
    }
    return false;
  };

  /* ---------- 资源投注（D&D 式"加码"） ----------
   * 选项里声明 stake 即开启投注面板：
   *   stake: { fun: true, ap: true, fav: true }              // 用平衡表里的默认汇率
   *   stake: { fun: { per:500000, w:0.06, cap:0.3 } }        // 单项自定义（per 写死 = 关闭级别价换算）
   * 资金的默认汇率不是全游戏常数，但**只跟身位有关**：一档 ≈ 你这个位子一个月的月薪，
   * 见下面的 stakeFunPer()。
   */
  /* 把美元数抹成整数档（面板要写"每 $6k → +4%"，$6,124 太难读）。
     一律向下取整：宁可少收。 */
  function niceUsd(n) {
    const step = n < 10000 ? 500 : n < 100000 ? 1000 : n < 1000000 ? 5000 : 50000;
    return Math.max(step, Math.floor(n / step) * step);
  }
  P.niceUsd = niceUsd;

  /* 金额显示（投注面板 / 汇率说明共用）：$400 · $6.1k · $1.5M。
     动态汇率下同一个选项在不同身位是不同价，界面必须写得清楚，所以格式要短。 */
  P.fmtUsd = function (n) {
    n = Math.round(Number(n) || 0);
    const neg = n < 0; n = Math.abs(n);
    let s;
    if (n >= 1000000) s = "$" + (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "M";
    else if (n >= 10000) s = "$" + Math.round(n / 1000) + "k";
    else if (n >= 1000) s = "$" + (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    else s = "$" + n;
    return (neg ? "-" : "") + s;
  };

  /* ---------- 资金每档汇率（#28① 定稿：纯级别价） ----------
   * 演进三步：
   *   v0.6 之前：全游戏一个常数 $250k —— 小兵投不进第一档，"收益 $50k 的事让你压 $250k"。
   *   v0.7：加入事件钱量级锚（这件事值多少钱）。
   *   v0.12：再加"钱袋闸"（单档 ≤ 现金×6%）—— 于是价码又随余额浮动，
   *            玩家反映"同样的事，穷时便宜富时贵"，价码成了第二次随机。
   *   #28①：删掉钱袋闸与事件钱量级锚，**只留身位锚**。
   *
   *   per = 职位月薪(track,tier) × perSalaryMonths × gradeMul，夹进 [perMin, perMax] 抹零
   *         —— 月薪取自 P.officeSalary()，与平静月工资同源：身份决定钱，这个口径只有一个。
   *
   * 关键手感：**每档价码恒定，不随你手里有多少钱而变化**。余额只决定你押得起几档
   * （见 P.stakeMax 的 floor(fun/per)）——投得起几档是家底的事，一档多少钱是位子的事。
   * 内容写死 `per` 时以内容为准（绝对覆盖，见 P.stakeSpec）。
   *
   * 返回 {per, anchor, source, raw}。 */
  P.stakeFunPer = function (grade) {
    const d = (P.balance().stakeRates || {}).fun || {};
    const months = d.perSalaryMonths == null ? 1 : d.perSalaryMonths;
    const g = grade || (P.G && P.G.__curGrade) || "mid";
    const gm = (d.gradeMul || {})[g];
    const gmul = gm == null ? 1 : gm;
    const A = Math.max(1, (P.officeSalary ? P.officeSalary() : 0) * months * gmul);
    const lo = d.perMin == null ? 500 : d.perMin, hi = d.perMax == null ? 5000000 : d.perMax;
    const per = niceUsd(P.clamp(A, lo, hi));
    return { per: per, anchor: A, source: "office", raw: A };
  };

  P.stakeSpec = function (choice, grade) {
    if (!choice || !choice.stake) return null;
    const def = P.balance().stakeRates || {};
    const spec = {};
    ["fun", "fav"].forEach(function (k) {
      const raw = choice.stake[k];
      if (!raw) return;
      spec[k] = (raw === true) ? Object.assign({}, def[k] || {}) : Object.assign({}, def[k] || {}, raw);
    });
    if (!Object.keys(spec).length) return null;
    /* 资金汇率：内容写死了 per 就以内容为准（绝对覆盖）；否则按身位算级别价。
       级别价写回 spec.fun.per，下游（stakeMax / stakeInfo / 面板）无需知道它是算出来的。 */
    if (spec.fun) {
      const kf = choice.stake.fun;
      const written = (kf !== true && kf && kf.per != null) ? Number(kf.per) : null;
      if (written != null && written > 0) {
        spec.fun.__rate = { per: written, anchor: null, source: "content", raw: written };
      } else {
        const r = P.stakeFunPer(grade);
        spec.fun.per = r.per;
        spec.fun.__rate = r;
      }
    }
    return spec;
  };

  /* ---------- 投注档位上限 ----------
   * 一个资源最多能投几档。必须同时被两件事夹住：
   *   ① 加成上限：cap ÷ w —— 超过这个档数，加成不再增长，资源纯属白花
   *   ② 你手上还剩多少：floor(现金 ÷ 级别价)
   * 「到达上限需要几档」用 ceil：最后一档即使只吃到部分上限，也仍然 >0 收益，
   * 绝不会出现"花一整档的钱买 0 收益"。
   */
  function capSteps(w, cap) { return Math.max(1, Math.ceil(cap / w - 1e-9)); }

  P.stakeMax = function (k, choice) {
    const spec = P.stakeSpec(choice);
    if (!spec || !spec[k]) return 0;
    const s = spec[k], G = P.G;
    if (k === "fav") return G.fav > 0 ? 1 : 0;                // 人情是开关：1 点换一次重投
    if (k === "fun") {
      const per = Math.max(1, s.per || 0), w = s.w || 0.04, cap = s.cap || 0.30;
      return Math.max(0, Math.min(capSteps(w, cap), Math.floor(G.fun / per)));
    }
    return 0;                                                  // v0.9：精力已退役，不再有第三加码轴
  };

  /* 达到上限后总共能加多少胜算（界面拿来显示"上限 +X%"） */
  P.stakeCapPct = function (k, choice) {
    const spec = P.stakeSpec(choice);
    if (!spec || !spec[k] || k === "fav") return 0;
    const s = spec[k];
    return (s.cap != null ? s.cap : (k === "fun" ? 0.30 : 0.09)) * 100;
  };

  /* 计算一次投注：加成、花费、明细、是否获得重投
   * 注意：档数一律过一遍 P.stakeMax —— 界面就算被改坏，也绝不会多扣资源。 */
  P.stakeInfo = function (choice, st) {
    const spec = P.stakeSpec(choice);
    st = st || {};
    const out = { bonus: 0, cost: { fun: 0, fav: 0 }, parts: [], reroll: false, spec: spec };
    if (!spec) return out;
    if (spec.fun && st.fun) {
      const per = Math.max(1, spec.fun.per || 0);
      const steps = Math.min(st.fun, P.stakeMax("fun", choice));
      if (steps > 0) {
        const b = Math.min(steps * (spec.fun.w || 0.04), spec.fun.cap || 0.30);
        out.cost.fun = steps * per; out.bonus += b;
        out.parts.push({ label: P.t("ui.dice.stakeFun", "资金 {amt}", { amt: P.fmtUsd(out.cost.fun) }), pct: b * 100 });
      }
    }
    if (spec.fav && st.fav) {
      const n = Math.min(st.fav, P.G.fav);
      out.cost.fav = n; out.reroll = n > 0;
      out.parts.push({ label: P.t("ui.dice.stakeFav", "人情 {n}（重投取优）", { n: n }), pct: 0 });
    }
    return out;
  };

  /* 选项的胜算：base + 选项修饰符 + 天赋全局修饰符 + 投注，限制在 [0.05, 0.95] */
  P.computeP = function (choice, stake) {
    let p = choice.base;
    const bd = [{ label: P.t("ui.dice.baseOdds", "基础"), pct: choice.base * 100 }];
    const apply = function (m) {
      const r = evalMod(m);
      if (r.v) { p += r.v; bd.push({ label: r.label, pct: r.v * 100 }); }
    };
    (choice.mods || []).forEach(apply);
    const tal = P.reg.talent[P.G.talent];
    if (tal && tal.mods) tal.mods.forEach(apply);
    /* v0.12 #20：卡墙上的 mods 与旧单卡天赋同权叠加（多卡各自出一条 breakdown） */
    if (P.cardMods) P.cardMods().forEach(apply);
    /* v0.6：晋升/连任类选项自动吃「选民底气」修正（±contestW）。
       这一条让"选民"真的影响晋升：票仓不稳的人在晋升判定上会吃亏，
       票仓扎实的人更容易抓住机会。中心点对齐自然均衡点，故不推翻既有平衡。
       政策推进类由内容显式声明 mods: [{ src: "voters", w: 0.08 }]。 */
    const vdyn = P.balance().voterDynamic || {};
    if (vdyn.enabled !== false && P.isContestChoice(choice)) {
      apply({ src: "voters", w: vdyn.contestW == null ? 0.08 : vdyn.contestW });
    }
    if (stake && stake.bonus) { p += stake.bonus; (stake.parts || []).forEach(function (x) { if (x.pct) bd.push({ label: P.t("ui.dice.investLabel", "投入·{label}", { label: x.label }), pct: x.pct }); }); }
    const Pv = P.clamp(p, 0.05, 0.95);
    return { P: Pv, target: Math.round(Pv * 100), breakdown: bd };
  };

  P.TIER_RANK = { critfail: 0, fail: 1, meh: 2, ok: 3, crit: 4 };

  /* 五档判定。天赋/卡可声明 critMul / critfailBoost；#20 起 Luck 卡给全局 +百分点
     （luckPct 在 p100 上加成，meh 上限与 critfail 下界都从 p100 派生，自动跟随） */
  P.rollTier = function (p) {
    const p100 = Math.min(99, Math.round(p * 100) + (P.luckPct ? P.luckPct() : 0));
    const roll = P.rint(1, 100);
    const tal = P.reg.talent[P.G.talent] || {};
    const critMul = Math.max(tal.critMul || 1, ...P.activeCards().map(c => c.critMul || 1));
    const cfMul = Math.max(tal.critfailBoost || 1, ...P.activeCards().map(c => c.critfailBoost || 1));
    if (roll <= Math.round(p100 * 0.30 * critMul)) return { tier: "crit", roll: roll };
    if (roll <= p100) return { tier: "ok", roll: roll };
    const mehCap = Math.min(p100 + 25, 100 - 5 * cfMul - 1);
    if (roll <= mehCap) return { tier: "meh", roll: roll };
    if (roll >= 101 - 3 * cfMul) return { tier: "critfail", roll: roll };
    return { tier: "fail", roll: roll };
  };

  /* 重投取优（D&D 的 advantage） */
  P.rollTierAdv = function (p, reroll) {
    const a = P.rollTier(p);
    if (!reroll) return a;
    const b = P.rollTier(p);
    const better = (P.TIER_RANK[b.tier] > P.TIER_RANK[a.tier]) ? b : a;
    return { tier: better.tier, roll: better.roll, rolls: [a.roll, b.roll], rerolled: true };
  };

  /* 给玩家看的模糊档位。fuzzLabels 是 boot 前生成的常量表（BALANCE_DEFAULTS /
     content 01-config 各有一份，后者覆盖前者），所以中文原文留在数据里、
     在取用点现翻：key = ui.dice.fuzz.<档位下标>，档位边界仍走 fuzzBands，数值零改动。 */
  P.fuzzy = function (p) {
    const b = P.balance(), bands = b.fuzzBands, labels = b.fuzzLabels;
    let i = bands.length;
    for (let j = 0; j < bands.length; j++) if (p < bands[j]) { i = j; break; }
    if (i >= bands.length) i = labels.length - 1;
    return P.t("ui.dice.fuzz." + i, labels[i]);
  };

  P.TIER_LABEL = { crit: "★ 大成功", ok: "✓ 成功", meh: "~ 勉强过关", fail: "✗ 失败", critfail: "☠ 大失败" };
})();
