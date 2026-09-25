/* ============================================================================
 * POTUS ENGINE · presidency.js
 * 「在白宫」—— #21 M1：入主白宫之后，时间不再按年抽象过去，而是一月一决策。
 *
 * 为什么要有这个文件（改动前的现状诊断）：
 *   总统只是 tier 9，引擎里**没有任何专属月度分支** —— 宣誓之后照旧走平民那套月引擎，
 *    player 手感上就是"薪水变高、事件名变大的普通上班年"。任期是这个游戏的高潮，
 *   却是最没有玩法的一段。M1 先立核心循环：白宫月决策槽 + 支持率。
 *
 * 三条设计决定（都是刻意的）：
 *   1) 【复用月引擎，不另开一套时间】白宫月决策槽是 planMonth 的第三个 forced 档期供给者
 *      （前两个：campaignForceSlot 竞选幕、choresSlot 日常公务）。同一条通道的语义是
 *      "到点必演、不看运气"，于是逐月化不需要动 startYear/nextMonth/endYear 那一圈。
 *   2) 【支持率是会往下掉的】appr 向自然水位回归 + 每月净流失，与竞选 momentum 的
 *      meterDrift 同语义：一事一事挣来的涨幅会自己掉，"在位越久越难"。起手也只有 ~46。
 *   3) 【M1 不判负】低支持率只在日志里出一句党内压力。弹劾、连任败选、卸任清算都是 M3 的活
 *      —— 骨架阶段留一个会弄死玩家的闸，只会把 balance 搞成不可解释的泥。
 *
 * 支持率不是展示件：dice.js 的 evalMod 有 src:"approval"，白宫卡的立法/外交选项吃它。
 * 内容侧：白宫事务池在 content/events/147-whitehouse.js（wh:true + whFamily 四族）。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  function fnum(v, d) { return (typeof v === "number" && isFinite(v)) ? v : d; }

  /* ---------- 标定入口：全部参数在 balance.presidency（见 core.js 的默认与注释）---------- */
  P.presCfg = function () {
    const b = (P.balance() || {}).presidency || {};
    return {
      enabled: b.enabled !== false,
      termMonths: fnum(b.termMonths, 48),
      /* 池子容量公式：每月要 1 条档期 → 需要 N ≥ repeatMonths。
         M1 只有 8 张卡（四族各 2），所以这里定 8：正好让每张卡每 8 个月轮一次、逐月不断流。
         M2 扩池到 24 张后应把它抬回 18（同卡三个月内不重演才不像复读机）。 */
      repeatMonths: fnum(b.repeatMonths, 8),
      baseline: fnum(b.baseline, 45),
      revert: fnum(b.revert, 0.05),
      drift: fnum(b.drift, -0.15),
      pressureBelow: fnum(b.pressureBelow, 28),
      pressureMonths: fnum(b.pressureMonths, 4),
      seed: Object.assign({ base: 46, perRep: 0.3, perEdge: 8, floor: 25, ceil: 72 }, b.seed || {}),
      pressure: Object.assign({ scandal: -0.5, investigation: -0.4 }, b.pressure || {}),
      families: [].concat(b.families || ["crisis", "legislation", "foreign", "personnel"])
    };
  };

  /* 总统 = 爬到全局层级顶（tierMax，默认 9）。下野之后自动不算。 */
  P.isPresident = function () {
    const G = P.G;
    if (!G) return false;
    return G.tier >= fnum(P.balance().tierMax, 9);
  };

  /* ---------- 就职月播种 ----------
   * 与 P.seedMomentum() 同一纪律：起手不到中线，余下要一事一事挣。
   * 三项来源：执政资本（声望）+ 选民底气（voterEdge，自然均衡点处为 0）。 */
  P.seedApproval = function () {
    const G = P.G, s = P.presCfg().seed;
    if (!G) return s.base;
    const raw = s.base + (G.rep || 0) * s.perRep +
      (P.voterEdge ? P.voterEdge() : 0) * s.perEdge;
    return Math.round(P.clamp(raw, s.floor, s.ceil));
  };

  /* ---------- 每月一 tick（挂在 time.js 的 advanceMonth 上）----------
   * 幂等：入主那月只播种（不漂），之后每月结算一次；离开白宫那月记一次离任。 */
  P.presidencyTick = function (month) {
    const G = P.G;
    if (!G) return null;
    const c = P.presCfg();
    if (!c.enabled) return null;

    if (!P.isPresident()) {
      const p = G.pres;
      if (p && p.left == null) {
        p.left = P.monthSeq();
        P.pushLog(P.t("ui.presidency.left",
          "你离开了白宫。支持率停在 {n}%，在任 {m} 个月。",
          { n: Math.round(p.appr), m: p.months || 0 }));
      }
      return p || null;
    }

    if (!G.pres) {
      const a = P.seedApproval();
      G.pres = { since: P.monthSeq(), appr: a, prev: a, term: 1, months: 0, famIdx: 0, lowStreak: 0 };
      P.pushLog(P.t("ui.presidency.swornIn",
        "宣誓就职。当晚幕僚把第一份民意调查放在你桌上：支持率 {n}%。", { n: a }));
      return G.pres;
    }

    const p = G.pres;
    p.months = (p.months || 0) + 1;
    let a = p.appr + (c.baseline - p.appr) * c.revert + c.drift;
    const sc = P.scandalLevel();
    if (sc > 0) a += c.pressure.scandal * sc;
    if (P.hasFlag("investigation_open")) a += c.pressure.investigation;
    p.prev = Math.round(p.appr);
    p.appr = Math.round(P.clamp(a, 0, 100));
    p.lowStreak = p.appr < c.pressureBelow ? (p.lowStreak || 0) + 1 : 0;
    if (p.lowStreak === c.pressureMonths) {
      P.pushLog(P.t("ui.presidency.pressure",
        "党内开始有人当面问「中期选举你们打算怎么办」——你的支持率在 {n}% 以下已经 {m} 个月了。",
        { n: c.pressureBelow, m: c.pressureMonths }));
    }
    /* 届数只记账：连任的胜败要等 M2 把总统连任选举链接进 campaign，M1 不凭空判你当选。 */
    if (p.term === 1 && !p.termDone && p.months >= c.termMonths) {
      p.termDone = 1;
      P.pushLog(P.t("ui.presidency.termDone",
        "第一届任期满了（{m} 个月）。要不要再选一次，是党、选民和你自己的事。", { m: p.months }));
    }
    return p;
  };

  /* ---------- 白宫事务卡的入选闸 ----------
   * 与 choresSlot 同一条纪律：不走随机卡的 recentIds 窗口（8 张池共 20 抽窗口会自我饿死），
   * 改用月份冷却；层级/年份/媒介仍由事件自身声明把关。 */
  function whEligible(e, snap, rm) {
    if (!e.wh) return false;
    if (!P.when(e, snap)) return false;
    if (!P.yearOK(e) || !P.mediumOK(e)) return false;
    if (P.isUnique(e) && P.G.doneIds.indexOf(e.id) >= 0) return false;
    if (rm > 0) { const since = P.monthsSince(e.id); if (since != null && since < rm) return false; }
    return true;
  }

  /* ---------- 白宫月决策槽（planMonth 调用，与竞选幕同一条强制通道）----------
   * 四族轮转：游标 G.pres.famIdx 逐月往后走一格，本族没货就顺延下一族 ——
   * 于是"这个月是外交还是人事"看得见规律，又绝不会同一族连刷三个月。
   * 四族都饿着时返回 null：宁可这个月安静，也不硬塞一张刚演过的卡。 */
  P.whiteHouseSlot = function (month) {
    const G = P.G;
    if (!G) return null;
    const c = P.presCfg();
    if (!c.enabled || !P.isPresident() || !G.pres) return null;
    const fams = c.families;
    if (!fams.length) return null;
    const snap = P.snap();
    if (snap && month != null) snap.month = month;
    const start = (G.pres.famIdx || 0) % fams.length;
    for (let i = 0; i < fams.length; i++) {
      const fi = (start + i) % fams.length;
      const pool = P.events.filter(function (e) { return e.whFamily === fams[fi] && whEligible(e, snap, c.repeatMonths); });
      if (!pool.length) continue;
      let tot = 0;
      const ws = pool.map(function (e) { const w = Number(e.weight) || 10; tot += w; return w; });
      let r = Math.random() * tot, hit = pool[0];
      for (let j = 0; j < pool.length; j++) { r -= ws[j]; if (r <= 0) { hit = pool[j]; break; } }
      G.pres.famIdx = (fi + 1) % fams.length;
      return {
        eventId: hit.id, grade: P.gradeOf(hit) || "major",
        valence: P.valenceOf(hit) || "risk", wh: true
      };
    }
    return null;
  };

  /* ---------- 界面投影 ---------- */
  P.approvalBand = function (v) {
    if (v >= 60) return { key: "strong", cls: "strong", text: P.t("ui.presidency.band.strong", "强势") };
    if (v >= 45) return { key: "steady", cls: "steady", text: P.t("ui.presidency.band.steady", "平稳") };
    if (v >= P.presCfg().pressureBelow) return { key: "soft", cls: "soft", text: P.t("ui.presidency.band.soft", "偏弱") };
    return { key: "danger", cls: "danger", text: P.t("ui.presidency.band.danger", "危险") };
  };
  P.approvalPanel = function () {
    const G = P.G, p = G && G.pres;
    /* enabled=false 时整条通道下线，读数件也一并消失 ——
       HUD 上挂一个不再会变的支持率，比不挂更误导。 */
    if (!P.presCfg().enabled || !P.isPresident() || !p) return null;
    const v = Math.round(p.appr || 0);
    return {
      value: v, delta: Math.round(v - Math.round(p.prev == null ? p.appr : p.prev)),
      band: P.approvalBand(v), term: p.term || 1, months: p.months || 0,
      since: p.since, year: Math.floor((p.months || 0) / 12)
    };
  };

  /* ---------- 内容侧效果键：{ appr: -3 } ----------
   * 非总统在位时空操（与 campaign 的 camp 键同纪律：内容写错不该打扰玩家，只留日志）。 */
  P.effect("appr", function (v, G) {
    if (!G || !G.pres || !P.isPresident()) return;
    G.pres.appr = Math.round(P.clamp(fnum(G.pres.appr, 0) + fnum(v, 0), 0, 100));
  });
})();
