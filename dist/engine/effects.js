/* ============================================================================
 * POTUS ENGINE · effects.js
 * 后果应用。默认支持
 *   attr / fac / fun / rep / hp / ap / fav / lev / tier / flags / notFlags / score / contact
 * 内容可注册自定义效果键：POTUS.effect('myKey', function(value, G){ ... })
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  P.effectHandlers = {
    attr: function (v, G) { for (const k in v) if (G.attr[k] != null) G.attr[k] = P.clamp(G.attr[k] + v[k], 0, 100); },
    fac: function (v, G) { for (const k in v) G.faction[k] = P.clamp((G.faction[k] || 0) + v[k], -100, 100); },
    fun: function (v, G) { G.fun += v; },
    /* 按比例的资金变动：funMul: 0.5 = 资金×1.5；funMul: -0.3 = 资金×0.7。
       投资型事件的回报用它——投入 100k 的人赚 50%，投入 2M 的人也赚 50%，
       不会再出现「押上全部本金，赚回 15k」的空账。 */
    funMul: function (v, G) { G.fun += Math.round(G.fun * v); },
    rep: function (v, G) { G.rep = P.clamp(G.rep + v, 0, 100); },
    hp: function (v, G) { G.hp = P.clamp(G.hp + v, 0, 100); },
    ap: function (v, G) { const b = P.balance(); G.ap = P.clamp(G.ap + v, b.apMin == null ? 0 : b.apMin, b.apMax || 12); },
    fav: function (v, G) { G.fav = P.clamp(G.fav + v, 0, 20); },
    /* 把柄：只能靠"让某人不敢开口"得到，不能靠钱买。下限 0，无上限 */
    lev: function (v, G) { G.lev = Math.max(0, (G.lev || 0) + v); },
    tier: function (v, G) {
      const b = P.balance();
      const before = G.tier;
      G.tier = P.clamp(G.tier + v, b.tierMin, b.tierMax);
      /* 层级一变就重置"在位时长"，晋升台阶的门槛（ev.minTenure）靠它计量；
         同时重算选民池——升位=选区扩大，旧地盘的人只能带过来一小部分 */
      if (G.tier !== before) {
        G.tierSince = P.monthSeq();
        if (P.rescaleVoters) P.rescaleVoters(before, G.tier);
      }
    },
    score: function (v, G) { G.score = (G.score || 0) + v; },
    flags: function (v) { [].concat(v).forEach(P.addFlag); },
    notFlags: function (v) { [].concat(v).forEach(P.delFlag); },
    /* 选民池（v0.5.2）：{ warm: 500, diehard: 100, oppose: -200 } → 具体人数的增减。
       warm=有好感（可能票）diehard=死忠（必到票）oppose=反对（对手的票）。 */
    voters: function (v, G) { if (P.applyVoters) P.applyVoters(v); },
    /* 人脉：{ ruby: 8 } → 好感 +8；第一次出现就代表"从此认识这个人"（从 0 起算） */
    contact: function (v, G) {
      if (!G.contacts) G.contacts = {};
      for (const id in v) {
        if (G.contacts[id] == null) G.contacts[id] = 0;
        G.contacts[id] = P.clamp(G.contacts[id] + v[id], -100, 100);
      }
    },
    /* 彻底断掉一段关系（被背叛、对方死了、你把他卖了） */
    forget: function (v, G) {
      if (!G.contacts) return;
      [].concat(v).forEach(function (id) { delete G.contacts[id]; });
    },

    /* ---- v0.5：中途结局与路线转向 ---- */

    /* 软 BE「下野」：政治生命受重创但没死 —— 降层级、摔声望、背一个「下野」标记，
     * 之后仍有东山再起的机会（40-endings.js 的 fallen_return 会认这个标记）。
     * v 是下野深度（1=轻，2=重），影响降几级。 */
    fall: function (v, G) {
      const P = window.POTUS;
      const depth = Math.max(1, Math.min(2, Number(v) || 1));
      const from = G.tier;
      /* 保护期：刚下野一年内不再叠加恶性下野（否则连环 fall 会把人直接犁穿到 T0） */
      if ((G.fallenShieldUntil || 0) > P.monthSeq()) return;
      G.tier = Math.max(0, G.tier - depth);
      if (G.tier !== from) G.tierSince = P.monthSeq();
      G.rep = P.clamp(Math.round(G.rep * (depth >= 2 ? 0.45 : 0.65)), 0, 100);
      G.flags = (G.flags || []).filter(function (f) {
        return f !== "investigation_open";        // 调查随下野了结（人都不在了，查谁呢）
      });
      /* 丑闻降两级：事情跟着你，但热度下去了 */
      for (let i = 5; i >= 2; i--) {
        const f = "scandal_" + i;
        if (G.flags.indexOf(f) >= 0) {
          G.flags = G.flags.filter(function (x) { return x !== f; });
          G.flags.push("scandal_" + Math.max(1, i - 2));
          break;
        }
      }
      if (G.flags.indexOf("fallen") < 0) G.flags.push("fallen");
      G.fallenCount = (G.fallenCount || 0) + 1;
      G.fallenShieldUntil = P.monthSeq() + 12;    // 12 个月保护期
      G.fallenThisTurn = true;                    // afterEvent 会据此补一段"下野"的交代
      P.pushLog("下野：你从 T" + from + " 摔到了 T" + G.tier + "。政治生命还在，但台阶要重新爬。");
    },

    /* 硬 BE：政治生命就此终结。v = 结局理由（"prison" 入狱 / "disgrace" 身败名裂）。
     * 只写一个标记；真正的终局判定在 render.js 的 afterEvent 里统一收口。 */
    hardEnd: function (v, G) {
      G.pendingHardEnd = String(v || "disgrace");
    },

    /* 路线转向：选项直接把玩家挪到另一条轨道/姿态（代价已经写在剧情里） */
    setTrack: function (v, G) { if (POTUS.reg.track[v]) G.track = v; },
    setStance: function (v, G) { if (POTUS.reg.stance[v]) G.stance = v; }
  };

  /* 内容注册自定义效果键 */
  P.effect = function (key, fn) { P.effectHandlers[key] = fn; };
  /* 若内容在 effects.js 之前就声明了效果键，这里补登记 */
  if (P._pendingEffects) { for (const k in P._pendingEffects) P.effectHandlers[k] = P._pendingEffects[k]; }

  P.applyEffects = function (eff) {
    if (!eff) return;
    const G = P.G;
    for (const k in eff) {
      const h = P.effectHandlers[k];
      if (h) h(eff[k], G);
      else console.warn("[POTUS] 未知效果键: " + k + "（可用 POTUS.effect() 注册）");
    }
  };
})();
