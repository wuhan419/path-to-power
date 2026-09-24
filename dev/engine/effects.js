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
    /* 学生贷款本金：事件里用 debt:-N 一次性抹平一笔欠款（不受标尺缩放，保持绝对额）。
       还款/减免即视为按时，连续逾期计数 loanLate 归零；余额锁死不为负。 */
    debt: function (v, G) {
      G.debt = Math.max(0, Math.round((G.debt || 0) + v));
      if (v < 0) G.loanLate = 0;
      if (G.debt <= 0) { G.debt = 0; G.loanLate = 0; }
    },
    /* 投资回报按【投入的本金】算，不是总余额（用户实测纠错）：
       funMul: 1.0 = 本金翻倍赚 100%；funMul: -1.0 = 本金全亏。
       本金 = 选项 cost.fun（或入场费 req.fun）+ 投注的 stake 资金 —— 结算前由 stage.js
       resolveChoice 写进 G.__stakeBase。v0.12 收紧旧兜底：没有本金声明时【不再】
       按总余额乘倍数（那是"点一下家底翻 2.2 倍"的漏洞），空转 + 告警让内容现形。 */
    funMul: function (v, G) {
      const base = (G.__stakeBase != null && G.__stakeBase > 0) ? G.__stakeBase : 0;
      if (!base) { console.warn("[POTUS] funMul 没有本金声明（cost.fun / req.fun / 投注都为空），本笔收益空转"); return; }
      G.fun += Math.round(base * v);
    },
    rep: function (v, G) { G.rep = P.clamp(G.rep + v, 0, 100); },
    /* v0.9 退役：健康/精力不再是玩家可感资源。事件里残留的 hp/ap 增减一律**空操**（保留 handler 入口
       以免“未知效果键”告警刷屏）。健康仍由 endYear 的年度老化直接结算（驱动生病/死亡结局），
       但不再被任何事件影响；精力彻底退出玩法。要恢复：把下面两个空函数改回原实现即可。 */
    hp: function (v, G) { /* 事件不再影响健康（后台静态量） */ },
    ap: function (v, G) { /* 精力已退役（事件不再影响） */ },
    fav: function (v, G) { G.fav = P.clamp(G.fav + v, 0, 20); },
    /* 把柄：只能靠"让某人不敢开口"得到，不能靠钱买。下限 0，无上限 */
    lev: function (v, G) { G.lev = Math.max(0, (G.lev || 0) + v); },
    tier: function (v, G) {
      const b = P.balance();
      const before = G.tier;
      /* 全局年限闸：正常晋升（一步一级）要在当前层级熬够月数（不满足 → tier 不动，
         折成一点声望——"资历还不够"的引擎级表达）。门槛表写在 balance.tierGates（10 级）。
         破格直提：tier:+2/+3 视为非常规提拔，**绕过资历闸**；代价是被跳过的中间级
         不会记进 counters["served_N"]，日后"德不配位"类事件据此找上门。 */
      const GATES = b.tierGates || [8, 10, 12, 18, 20, 24, 28, 34, 40, 0];
      const need = GATES[Math.min(before, GATES.length - 1)];
      const bypass = v >= 2;
      if (v > 0 && !bypass && P.monthsAtTier && P.monthsAtTier() < need) {
        G.rep = P.clamp((G.rep || 0) + 3, 0, 100);
        if (P.pushLog) P.pushLog(P.t("ui.effects.tierGate", "资历还差着：{have}/{need} 个月——位子的事再等等（声望+3）。", { have: P.monthsAtTier(), need: need }));
        return;
      }
      /* 离开本级前登记：你确实坐过这一级（跳级时只登记起点，中间级留白 → 资历债） */
      if (v > 0) { if (!G.counters) G.counters = {}; G.counters["served_" + before] = 1; }
      G.tier = P.clamp(G.tier + v, b.tierMin, b.tierMax);
      /* 记录生涯峰值层级：下野会拉低 G.tier，但"做到过哪一级"要按峰值算（2025 成就结算用）。 */
      G.peakTier = Math.max(G.peakTier == null ? G.tier : G.peakTier, G.tier);
      /* 层级一变就重置"在位时长"，晋升台阶的门槛（ev.minTenure）靠它计量；
         同时重算选民池——升位=选区扩大，旧地盘的人只能带过来一小部分（跳级带得更少） */
      if (G.tier !== before) {
        G.tierSince = P.monthSeq();
        if (P.rescaleVoters) P.rescaleVoters(before, G.tier);
        if (G.tier > before && P.applyVoters) {
          const esize = P.electorateSize();
          const share = (b.voterBase && b.voterBase.winShare != null) ? b.voterBase.winShare : 0.08;
          const diehard = Math.round(esize * share * (0.04 + Math.min(60, G.rep || 0) / 300));
          const warm = Math.round(diehard * 2.5);
          const oppose = Math.round(diehard * 1.5);
          P.applyVoters({ diehard: diehard, warm: warm, oppose: oppose });
        }
        /* 胜利线里程碑：首次抵达 demo 目标级（默认等级 7 / 联邦众议员）记一笔高光，不结束游戏 */
        if (b.victoryTier != null && G.tier > before && G.tier >= b.victoryTier && before < b.victoryTier && P.pushLog) {
          P.pushLog(P.t("ui.effects.milestone", "★ 里程碑：你踏进了全国政治的中心舞台（等级 {n}：{name}）。",
            { n: G.tier + 1, name: (P.tierName ? P.tierName(G.tier) : "") }));
        }
      }
    },
    score: function (v, G) { G.score = (G.score || 0) + v; },
    flags: function (v) { [].concat(v).forEach(P.addFlag); },
    notFlags: function (v) { [].concat(v).forEach(P.delFlag); },
    /* 隐藏计数器 buff：{ cap_legal: 1, cap_fund: 2 } → 累加（下限 0）。
     * 与 flags 的分工：flags 记"发生过没有"（布尔），counters 记"攒了多少"（程度）。
     * 刻意不进 tagNames、不上状态面板 —— 玩家看不见，但世界看得见：
     * 后续事件用 countMin/countMax/countEq 读它，决定该不该触发。 */
    count: function (v, G) {
      if (!G.counters) G.counters = {};
      for (const k in v) G.counters[k] = Math.max(0, (G.counters[k] || 0) + (Number(v[k]) || 0));
    },
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
      P.pushLog(P.t("ui.effects.fallen", "下野：你从等级 {from} 摔到了等级 {to}。政治生命还在，但台阶要重新爬。", { from: from + 1, to: G.tier + 1 }));
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
