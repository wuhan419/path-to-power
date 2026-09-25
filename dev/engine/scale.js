/* ============================================================================
 * POTUS ENGINE · scale.js
 * 事件三值性（valence）与动态经济标尺（econ ruler）。
 * --------------------------------------------------------------------------
 * 两件事：
 *  ① valence：每张事件卡是 机遇(boon) / 风险(risk) / 威胁(bane) 中的哪一种。
 *     抽取改成两段式：每个档期先独立掷 valence（每档期各自独立，类型之间
 *     不再互相挤占），再在该类的可触发池里按原权重管线抽具体事件。
 *  ② 标尺：内容侧写「系数」（1.0 = T2 基准人物在该量级的标准份量），
 *     抽中事件后由 P.realize() 把系数 × 当前人物的标尺折算成绝对数值，
 *     下游（dice/effects/render）看到的仍然是绝对数值 —— 零改动兼容。
 *
 * 标尺构成（balance.econ）：
 *   资金 = 职位月薪（officeSalary，随轨道×层级）× 量级月数 × 属性因子
 *   声望 = repBase[grade] × (1 + (tier-2)×tierLean) × 属性因子
 *   健康 = hpBase[grade] × (1 + (tier-2)×hpTierLean)     —— 身体不随官位线性膨胀
 *   把柄/人情/精力 = smallBase[grade]                     —— 小整数资源只随量级
 *   属性因子 = 1 + (attr-50)/100 × attrLean               —— 能人办事收益更大
 * attr/fac/contact/tier/flags/voters 等"刻度类/结构类"效果**不折算**，保持绝对值。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* ---------- 三值性 ---------- */
  P.VAL_CHAIN = ["boon", "risk", "bane"];
  P.VAL_LABEL = { boon: "机遇", risk: "风险", bane: "威胁" };
  /* 未声明 valence 的旧内容按"中性风险"处理（内容逐批补齐后此默认只是兜底） */
  P.valenceOf = function (ev) {
    if (!ev) return "risk";
    if (ev.valence && P.VAL_CHAIN.indexOf(ev.valence) >= 0) return ev.valence;
    return (P.balance() || {}).valenceDefault || "risk";
  };

  function econ() { return P.balance().econ || {}; }

  /* 独立掷一个 valence：基础权重 × 时代压力微调（越动荡，威胁越多、机遇越少）。 */
  P.pickValence = function (pressure) {
    const b = P.balance();
    const w = Object.assign({ boon: 0.4, risk: 0.35, bane: 0.25 }, b.valenceWeights || {});
    const p = pressure == null ? P.pressure() : pressure;
    const adj = b.valencePressure || { boonPerPressure: -0.05, banePerPressure: 0.10 };
    const wb = Math.max(0.01, w.boon * (1 + (adj.boonPerPressure || 0) * p));
    const wr = Math.max(0.01, (w.risk == null ? 0.35 : w.risk));
    const wn = Math.max(0.01, w.bane * (1 + (adj.banePerPressure || 0) * p));
    const tot = wb + wr + wn;
    let r = Math.random() * tot;
    if ((r -= wb) < 0) return "boon";
    if ((r -= wr) < 0) return "risk";
    return "bane";
  };

  /* ---------- 当前人物的标尺 ---------- */
  /* 事件的主属性：ev.attrKey 显式声明 → 否则取各选项 mods 里权重最大的
     attr → 再否则取当前轨道的主属性（reg.track[key].key）。 */
  P.leanAttrOf = function (ev) {
    const G = P.G;
    let key = ev && ev.attrKey;
    if (!key && ev && ev.choices) {
      let best = null, bw = -1;
      for (let i = 0; i < ev.choices.length; i++) {
        const mods = (ev.choices[i] || {}).mods || [];
        for (let j = 0; j < mods.length; j++) {
          const m = mods[j];
          const w = m && m.src === "attr" ? (m.w == null ? 0.6 : m.w) : -1;
          if (w > bw) { bw = w; best = m.key; }
        }
      }
      key = best;
    }
    if (!key) { const t = P.reg.track[G && G.track]; key = (t && t.key) || "CHA"; }
    if (key === "FUN") key = "INT";                 /* 财富轨道主属性写作 FUN（旧语义），属性表里没有 */
    const a = (G && G.attr && G.attr[key] != null) ? G.attr[key] : 50;
    return { key: key, v: a };
  };

  P.ruler = function (grade, ev) {
    const G = P.G, e = econ();
    const gm = (e.funMonths || { minor: 1.5, mid: 6, major: 20 });
    const rb = (e.repBase || { minor: 2.5, mid: 5, major: 9 });
    const hb = (e.hpBase || { minor: 2, mid: 4, major: 7 });
    const sb = (e.smallBase || { minor: 1, mid: 1.5, major: 2 });
    const g = grade || "mid";
    const lean = P.leanAttrOf(ev);
    const attrF = 1 + (lean.v - 50) / 100 * (e.attrLean == null ? 0.4 : e.attrLean);
    const tier = G ? G.tier : 2;
    const tierF = Math.max(0.5, 1 + (tier - 2) * (e.tierLean == null ? 0.3 : e.tierLean));
    const hpF = Math.max(0.5, 1 + (tier - 2) * (e.hpTierLean == null ? 0.12 : e.hpTierLean));
    const salary = Math.max(1, P.officeSalary ? P.officeSalary() : 2000);
    return {
      fun: salary * (gm[g] || 3) * attrF,
      rep: rb[g] * tierF * attrF,
      hp: hb[g] * hpF,
      small: sb[g] || 1,
      attrKey: lean.key, attr: lean.v, tierF: tierF, attrF: attrF
    };
  };

  /* 系数 → 绝对值（四舍五入）。非 dyn 事件原样返回。 */
  const SCALE_KEYS = { fun: 1, rep: 1, hp: 1, lev: 1, fav: 1, ap: 1 };
  function matVal(k, v, r) {
    if (typeof v !== "number" || !isFinite(v)) return v;
    if (k === "fun") return Math.round(v * r.fun);
    if (k === "rep") return Math.round(v * r.rep);
    if (k === "hp") return Math.round(v * r.hp);
    /* lev/fav/ap：小整数资源，折算后非零值至少留 1 的颗粒 */
    const n = Math.round(v * r.small);
    return v > 0 ? Math.max(1, n) : v < 0 ? Math.min(-1, n) : 0;
  }
  function matEffects(eff, r) {
    if (!eff) return eff;
    const out = {};
    for (const k in eff) {
      out[k] = SCALE_KEYS[k] ? matVal(k, eff[k], r) : eff[k];
    }
    return out;
  }

  /* ---------- #35② 非 dyn 卡的最小展开：只换"砸钱"那一档的价码 ----------
   * dyn 卡整张按标尺折算；竞选幕事件只想给大钱选项换个汇率，不想让 rep/选情跟着缩放
   * （它们本来就是绝对量）。所以另开这条最小通道：内容写 `cost: { funLevel: N }`
   * （N 档级别价，且**不写** cost.fun），这里换成绝对美元，下游照旧只看 cost.fun。
   * 于是"幕间固定几万"的裸数从内容里消失：同一件事在 T2 与 T8 值多少钱，由薪资表说话。 */
  function levelCosts(ev) {
    const chs = ev.choices || [];
    let n = null;
    for (let i = 0; i < chs.length; i++) {
      const c = chs[i] && chs[i].cost;
      if (c && c.funLevel != null) n = c.funLevel;
    }
    if (n == null) return ev;                       // 没有级别价代价：原样返回，热路径零开销
    const grade = P.gradeOf(ev);
    const out = Object.assign({}, ev, { __realized: true, __raw: ev });
    out.choices = chs.map(function (ch) {
      if (!ch || !ch.cost || ch.cost.funLevel == null) return ch;
      const cost = Object.assign({}, ch.cost);
      const steps = cost.funLevel; delete cost.funLevel;
      cost.fun = P.levelPrice(steps, grade);
      return Object.assign({}, ch, { cost: cost });
    });
    return out;
  }

  /* ---------- 事件的运行时展开（抽中后调用） ----------
   * dyn 事件深拷贝 cost / outcomes.effects 为绝对数值；其余字段共享引用。
   * 下游引擎（stake/effects/render）不需要知道 dyn 的存在。 */
  P.realize = function (ev) {
    if (!ev) return ev;
    if (ev.__realized && ev.__raw) return ev;                 // 已是展开副本，直接给
    if (!ev.dyn) return levelCosts(ev);
    const r = P.ruler(P.gradeOf(ev), ev);
    const out = Object.assign({}, ev);
    out.__realized = true;                       // 只标在副本上 —— 原卡永远保持系数态，
    out.__raw = ev;                              // 不同处境的人物各自按自己的标尺展开
    out.__ruler = r;
    out.choices = (ev.choices || []).map(function (ch) {
      const c = Object.assign({}, ch);
      /* req 里的资源门槛（fun/rep/lev）同样是“份量”语义，随标尺展开 */
      if (ch.req) {
        const req = Object.assign({}, ch.req);
        for (const k in req) if (SCALE_KEYS[k] && typeof req[k] === "number") req[k] = matVal(k, req[k], r);
        c.req = req;
      }
      /* mods 里的资金门槛（src:"res"）同上：min 按系数写入，展开成绝对值 */
      if (ch.mods && ch.mods.length) {
        c.mods = ch.mods.map(function (m) {
          if (!m || m.src !== "res" || m.min == null) return m;
          const mm = Object.assign({}, m);
          mm.min = matVal(m.key === "rep" || m.key === "fun" ? m.key : "fun", m.min, r);
          return mm;
        });
      }
      if (ch.cost) {
        const cost = {};
        for (const k in ch.cost) cost[k] = SCALE_KEYS[k] ? matVal(k, ch.cost[k], r) : ch.cost[k];
        c.cost = cost;
      }
      if (ch.outcomes) {
        const oc = {};
        for (const t in ch.outcomes) {
          const o = ch.outcomes[t];
          oc[t] = o && o.effects ? Object.assign({}, o, { effects: matEffects(o.effects, r) }) : o;
        }
        c.outcomes = oc;
      }
      return c;
    });
    shapeByValence(out);
    return out;
  };

  /* ---------- 三值性契约在结算层的强制 ----------
   * 内容侧只声明“意图”(valence) + 系数；具体卡是否“真不能亏 / 有无保底”不依赖
   * 作者逐卡手改——由 realize 按意图把展开后的绝对值形状到契约上：
   *   boon（机遇）：去掉代价 + 把各档负向标量抹平（只会“少赚”，不会倒贴）；base 抬到 ≥ 0.5。
   *   risk（中性）：若本卡没有“保底线”（无 cost/req 且五档净值≈ 0），补一个“静观其变”选项。
   *   bane（威胁）：保持作者原样（默认有损，翻盘路靠内容）。 */
  const NEG_FLOOR = { fun: 1, rep: 1, hp: 1, lev: 1, fav: 1, ap: 1 };
  const TIERS5 = ["crit", "ok", "meh", "fail", "critfail"];
  function tierNet(ch, t, grade, ev) {
    const o = (ch.outcomes || {})[t];
    if (!o) return null;
    return P.netScore(o.effects, grade, ev) - (ch.cost ? P.netScore(ch.cost, grade, ev) : 0);
  }
  function shapeByValence(out) {
    const vz = out.valence;
    const grade = P.gradeOf(out);
    if (vz === "boon") {
      out.choices.forEach(function (ch) {
        delete ch.cost;                                   /* 机遇不收“入场费” */
        if (ch.base != null && ch.base < 0.5) ch.base = 0.5;
        const oc = ch.outcomes || {};
        for (const t in oc) {
          const o = oc[t];
          if (!o || !o.effects) continue;
          const e = o.effects;
          for (const k in NEG_FLOOR) if (typeof e[k] === "number" && e[k] < 0) e[k] = 0;   /* 标量损失抹平 */
          if (typeof e.funMul === "number" && e.funMul < 0) e.funMul = 0;                   /* 比例也只会少赚 */
          if (e.attr) for (const a in e.attr) if (e.attr[a] < 0) delete e.attr[a];
          if (e.fac) for (const a in e.fac) if (e.fac[a] < 0) delete e.fac[a];
          if (e.score < 0) e.score = 0;
          if (typeof e.fall === "number" && e.fall) delete e.fall;   /* 机遇不该致下野 */
        }
      });
      return;
    }
    if (vz === "risk") {
      const hasSafe = out.choices.some(function (ch) {
        if (ch.cost || ch.req) return false;
        return TIERS5.every(function (t) { const n = tierNet(ch, t, grade, out); return n == null || Math.abs(n) <= 0.35; });
      });
      if (!hasSafe) {
        const blank = {};
        TIERS5.forEach(function (t) { blank[t] = { body: P.t("ui.scale.layLowBody", "你把这一页轻轻翻了过去——既没有接住机会，也没有留下把柄。"), effects: {} }; });
        out.choices.push({ id: "lay_low", text: P.t("ui.scale.layLowText", "按下不表，静观其变"), note: P.t("ui.scale.layLowNote", "不赌这一把，也不接这份情——先保住眼前。"), base: 0.6, outcomes: blank });
      }
    }
  }

  /* ---------- 净值（单位：该量级的"标准份量"） ----------
   * 判定一张卡/一个选项对玩家是赚是亏的公共尺。校验器的三值性断言、
   * 模拟器的体验指标都走这里。 */
  P.netScore = function (eff, grade, ev) {
    if (!eff) return 0;
    /* realized 副本自带展开时的标尺 —— 直接复用，保证结算/评估口径一致 */
    const r = (ev && ev.__ruler) || P.ruler(grade, ev);
    let s = 0;
    for (const k in eff) {
      const v = eff[k];
      switch (k) {
        case "fun": s += num(v) / r.fun; break;
        case "funMul": s += num(v) * 0.35; break;      /* 比例收益粗折算（本金≈一份标准量级） */
        case "rep": s += num(v) / r.rep; break;
        case "hp": s += num(v) / r.hp; break;
        case "lev": case "fav": case "ap": s += num(v) / r.small; break;
        case "attr": for (const a in v) s += num(v[a]) / 8; break;    /* 属性点是硬通货：8 点 ≈ 一份 */
        case "fac": for (const a in v) s += num(v[a]) / 30; break;    /* 派系 30 点 ≈ 一份 */
        case "contact": for (const a in v) s += num(v[a]) / 60; break;
        case "tier": s += num(v) * 2.5; break;                        /* 升一级是超重头 */
        case "score": s += num(v) / 40; break;
        case "fall": s -= 2.5 * Math.max(1, num(v)); break;
        case "hardEnd": s -= 99; break;
        /* flags / notFlags / voters / setTrack / setStance：结构性，不计净值 */
      }
    }
    return s;
  };

  P.NET_TIERS = ["crit", "ok", "meh", "fail", "critfail"];
  /* 把任意效果值安全转成数字：非数（写错的对象/字符串）按 0 */
  function num(x) { const n = Number(x); return Number.isFinite(n) ? n : 0; }
  /* 一个选项五档的净值一览（校验与诊断用） */
  P.choiceNets = function (ch, grade, ev) {
    const oc = (ch && ch.outcomes) || {};
    const out = {};
    P.NET_TIERS.forEach(function (t) {
      if (oc[t]) out[t] = P.netScore(oc[t].effects, grade, ev);
    });
    return out;
  };
})();
