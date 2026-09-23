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
   *   stake: { fun: { per:500000, w:0.06, cap:0.3 } }        // 单项自定义（per 写死 = 关闭动态换算）
   * 资金默认汇率**不是常数** —— 按 身位 × 事件钱量级 动态算，见下面的 stakeFunPer()。
   */
  /* ---------- 选项的"钱量级"（pot）：这个选项自己押着多少钱 ----------
   * 取 max(|cost.fun|, 各档 |effects.fun|, |cost.fun × funMul|)：
   *   · cost.fun   —— 明码标价的代价（"花 $400k 请律师团"）
   *   · effects.fun —— 直接给/扣的钱（"这一笔赚 $150k"）
   *   · funMul      —— 按本金的比例（"押多少赚 200%"），本金就是 cost.fun，故换算回美元
   * 一个钱都没写的选项返回 0 —— 那时汇率只用身位锚（见 stakeFunPer）。 */
  P.stakePot = function (choice) {
    if (!choice) return 0;
    const amts = [];
    const costFun = (choice.cost && choice.cost.fun) || 0;
    if (costFun) amts.push(Math.abs(costFun));
    const oc = choice.outcomes || {};
    for (const k in oc) {
      const eff = oc[k] && oc[k].effects;
      if (!eff) continue;
      if (eff.fun) amts.push(Math.abs(eff.fun));
      if (eff.funMul != null && costFun) amts.push(Math.abs(costFun * eff.funMul));
    }
    return amts.length ? Math.max.apply(null, amts) : 0;
  };

  /* 把美元数抹成整数档（面板要写"每 $6k → +4%"，$6,124 太难读）。
     一律向下取整：宁可少收，绝不因为抹零把价码抬到事件锚之上。 */
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

  /* ---------- 资金每档汇率（v0.7：不再是固定值） ----------
   * 用户实测反馈：过去固定 $250k/档，① 小兵永远投不进第一档，② 价码与事情的钱量级脱钩
   * （"收益只有 $50k 却让你花 $250k 搏"）。现在每档金额 = 两个锚的几何平均，并被事件锚夹住：
   *
   *   身位锚 A = 职位月薪(track,tier) × perSalaryMonths × gradeMul
   *              —— 你这个位子办一件事的常规手笔（月薪来自 P.officeSalary()，与平静月工资同源）
   *   事件锚 X = 事件钱量级 × potShare
   *              —— 这件事本身值多少钱；也是总投入的硬顶
   *   per = min(√(A × X), X)
   *     · A < X（身位小 / 事件大）→ 走 √ 那支：per 随身位抬升，小兵不能拿零头买下大事
   *     · A > X（身位大 / 事件小）→ 被 X 夹住：价码跟着事情走，大佬也不为小事掏大钱
   *   事件没写钱（pot = 0）→ per = A（只用身位锚）
   *
   * 不变量：8 档总投入 = 8 × per ≤ 8 × X = 2 × 事件钱量级。
   * 返回 {per, pot, anchor, source, raw}，per 已是最终价码（抹过零）。 */
  P.stakeFunPer = function (choice, grade) {
    const d = (P.balance().stakeRates || {}).fun || {};
    const months = d.perSalaryMonths == null ? 3 : d.perSalaryMonths;
    const g = grade || (P.G && P.G.__curGrade) || "mid";
    const gm = (d.gradeMul || {})[g];
    const gmul = gm == null ? 1 : gm;
    const pot = P.stakePot(choice);
    const A = Math.max(1, (P.officeSalary ? P.officeSalary() : 0) * months * gmul);
    const share = d.potShare == null ? 0.25 : d.potShare;
    const X = pot > 0 ? pot * share : 0;
    let raw, source;
    if (X > 0) {
      raw = Math.min(Math.sqrt(A * X), X);
      source = A <= X ? "office+pot" : "pot";
    } else {
      raw = A;
      source = "office";
    }
    const lo = d.perMin == null ? 500 : d.perMin, hi = d.perMax == null ? 5000000 : d.perMax;
    let per = niceUsd(P.clamp(raw, lo, hi));
    /* 抹零后再确认一次：事件锚是硬顶（除非 X 本身连下限都不到——内容里不会出现） */
    if (X >= lo && per > X) per = niceUsd(X);
    return { per: per, pot: pot, anchor: A, ceiling: X, source: source, raw: raw };
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
    /* 资金汇率：内容写死了 per 就以内容为准（绝对覆盖）；否则按 身位 × 事件钱量级 动态算。
       动态结果写回 spec.fun.per，下游（stakeMax / stakeInfo / 面板）无需知道它是算出来的。 */
    if (spec.fun) {
      const kf = choice.stake.fun;
      const written = (kf !== true && kf && kf.per != null) ? Number(kf.per) : null;
      if (written != null && written > 0) {
        spec.fun.__rate = { per: written, pot: P.stakePot(choice), anchor: null, ceiling: null, source: "content", raw: written };
      } else {
        const r = P.stakeFunPer(choice, grade);
        spec.fun.per = r.per;
        spec.fun.__rate = r;
      }
    }
    return spec;
  };

  /* ---------- 投注档位上限 ----------
   * 一个资源最多能投几档。必须同时被三件事夹住：
   *   ① 汇率：每档花多少（资金 = stakeFunPer() 算出来的动态价码；精力 1 点/档）
   *   ② 加成上限：cap ÷ w —— 超过这个档数，加成不再增长，资源纯属白花
   *   ③ 你手上还剩多少
   * 「到达上限需要几档」用 ceil：最后一档即使只吃到部分上限，也仍然 >0 收益，
   * 绝不会出现"花一整档的钱买 0 收益"。例如 ap：每点 +3%、上限 +9% → 正好 3 档。
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

  /* 五档判定。天赋可声明 critMul / critfailBoost */
  P.rollTier = function (p) {
    const p100 = Math.round(p * 100);
    const roll = P.rint(1, 100);
    const tal = P.reg.talent[P.G.talent] || {};
    const critMul = tal.critMul || 1;
    const cfMul = tal.critfailBoost || 1;
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
