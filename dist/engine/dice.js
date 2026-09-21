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
      return { v: v, label: "派系·" + P.factionName(m.key) };
    }
    if (m.src === "flag") { const v = P.hasFlag(m.key) ? m.w : 0; return { v: v, label: "状态·" + m.key }; }
    if (m.src === "talent") { const v = G.talent === m.key ? m.w : 0; return { v: v, label: "天赋·" + m.key }; }
    if (m.src === "track") { const v = G.track === m.key ? m.w : 0; return { v: v, label: "轨道·" + m.key }; }
    if (m.src === "party") { const v = G.party === m.key ? m.w : 0; return { v: v, label: "党派·" + m.key }; }
    if (m.src === "stance") { const v = G.stance === m.key ? m.w : 0; return { v: v, label: "姿态·" + m.key }; }
    if (m.src === "tier") { const v = G.tier * m.w; return { v: v, label: "层级 T" + G.tier }; }
    if (m.src === "res" && m.key === "fun") { const v = G.fun >= (m.min || 0) ? m.w : 0; return { v: v, label: "资金充足" }; }
    /* v0.6 选民底气：voterEdge() ∈ [-1,1]（自然均衡点处为 0）。
       内容可以用 mods: [{ src: "voters", w: 0.08 }] 显式声明，
       晋升/连任类选项则由 computeP 自动附加（见下）。 */
    if (m.src === "voters") {
      const e = P.voterEdge ? P.voterEdge() : 0;
      const w = m.w == null ? 0.06 : m.w;
      return { v: e * w, label: "选民底气 " + P.electionStrength().pct + "%" };
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
   *   stake: { fun: true, ap: true, fav: true }              // 用全局默认汇率
   *   stake: { fun: { per:500000, w:0.06, cap:0.3 } }        // 单项自定义
   * 汇率默认值来自 balance.stakeRates。
   */
  P.stakeSpec = function (choice) {
    if (!choice.stake) return null;
    const def = P.balance().stakeRates || {};
    const spec = {};
    ["fun", "ap", "fav"].forEach(function (k) {
      const raw = choice.stake[k];
      if (!raw) return;
      spec[k] = (raw === true) ? Object.assign({}, def[k] || {}) : Object.assign({}, def[k] || {}, raw);
    });
    return Object.keys(spec).length ? spec : null;
  };

  /* ---------- 投注档位上限 ----------
   * 一个资源最多能投几档。必须同时被三件事夹住：
   *   ① 汇率：每档花多少（资金默认 $250k/档；精力 1 点/档）
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
      const per = s.per || 250000, w = s.w || 0.04, cap = s.cap || 0.30;
      return Math.max(0, Math.min(capSteps(w, cap), Math.floor(G.fun / per)));
    }
    const w = s.w || 0.03, cap = s.cap || 0.09;               // k === "ap"
    return Math.max(0, Math.min(capSteps(w, cap), G.ap));
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
    const out = { bonus: 0, cost: { fun: 0, fav: 0, ap: 0 }, parts: [], reroll: false, spec: spec };
    if (!spec) return out;
    if (spec.fun && st.fun) {
      const per = spec.fun.per || 250000;
      const steps = Math.min(st.fun, P.stakeMax("fun", choice));
      if (steps > 0) {
        const b = Math.min(steps * (spec.fun.w || 0.04), spec.fun.cap || 0.30);
        out.cost.fun = steps * per; out.bonus += b;
        out.parts.push({ label: "资金 $" + (out.cost.fun / 1000).toFixed(0) + "k", pct: b * 100 });
      }
    }
    if (spec.ap && st.ap) {
      const n = Math.min(st.ap, P.stakeMax("ap", choice));
      if (n > 0) {
        const b = Math.min(n * (spec.ap.w || 0.03), spec.ap.cap || 0.09);
        out.cost.ap = n; out.bonus += b;
        out.parts.push({ label: "精力 " + n, pct: b * 100 });
      }
    }
    if (spec.fav && st.fav) {
      const n = Math.min(st.fav, P.G.fav);
      out.cost.fav = n; out.reroll = n > 0;
      out.parts.push({ label: "人情 " + n + "（重投取优）", pct: 0 });
    }
    return out;
  };

  /* 选项的胜算：base + 选项修饰符 + 天赋全局修饰符 + 投注，限制在 [0.05, 0.95] */
  P.computeP = function (choice, stake) {
    let p = choice.base;
    const bd = [{ label: "基础", pct: choice.base * 100 }];
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
    if (stake && stake.bonus) { p += stake.bonus; (stake.parts || []).forEach(function (x) { if (x.pct) bd.push({ label: "投入·" + x.label, pct: x.pct }); }); }
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

  /* 给玩家看的模糊档位 */
  P.fuzzy = function (p) {
    const b = P.balance(), bands = b.fuzzBands, labels = b.fuzzLabels;
    for (let i = 0; i < bands.length; i++) if (p < bands[i]) return labels[i];
    return labels[labels.length - 1];
  };

  P.TIER_LABEL = { crit: "★ 大成功", ok: "✓ 成功", meh: "~ 勉强过关", fail: "✗ 失败", critfail: "☠ 大失败" };
})();
