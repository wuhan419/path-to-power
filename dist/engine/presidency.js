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
         M1 只有 8 张卡（四族各 2），所以那时只能定 8：正好让每张卡每 8 个月轮一次、逐月不断流。
         M2 扩池到每族 6 张（首届可用 5 张，第 6 张挂次任旗）→ 5×4=20 ≥ 18，抬回 18：
         同卡三个月内不重演才不像复读机。validate 逐族钉这条公式。 */
      repeatMonths: fnum(b.repeatMonths, 18),
      baseline: fnum(b.baseline, 45),
      revert: fnum(b.revert, 0.05),
      drift: fnum(b.drift, -0.15),
      pressureBelow: fnum(b.pressureBelow, 28),
      pressureMonths: fnum(b.pressureMonths, 4),
      /* M2 在任选举的档期口径（届内月序，见文件底部 presRaces 的注释） */
      midtermAt: fnum(b.midtermAt, 14),
      reelectLead: fnum(b.reelectLead, 12),
      raceGrace: fnum(b.raceGrace, 6),
      raceDefs: Object.assign({ midterm: "camp_midterm", reelect: "camp_reelect" }, b.raceDefs || {}),
      /* M3 离任清算喂料 + 弹劾闸 */
      exitWrath: Object.assign({ apprBelow: 35, establishment: 12, press: 10, agency: 15 }, b.exitWrath || {}),
      impeach: Object.assign({ scandalMin: 2, card: "wh_impeachment", retryMonths: 24 }, b.impeach || {}),
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
        const w = presExitSettle(p, c);
        P.pushLog(P.t("ui.presidency.left",
          "你离开了白宫。支持率停在 {n}%，在任 {m} 个月。",
          { n: Math.round(p.appr), m: p.months || 0 }) +
          (w ? P.t("ui.presidency.leftWrath", " 党内的账还没算完。", {}) : ""));
      }
      return p || null;
    }

    if (!G.pres) {
      const a = P.seedApproval();
      G.pres = {
        since: P.monthSeq(), appr: a, prev: a, term: 1, months: 0,
        famIdx: 0, lowStreak: 0, termStart: 0, raceDue: null, midDone: 0
      };
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
    presRaces(p, c);
    return p;
  };

  /* ---------- M2/M3：届数、在任选举档期、任期届满离任 ----------
   * 为什么按**届内月序**而不是日历锚：玩家何时入主白宫由玩法决定（1983 年补上去的也行），
   * 把选举钉死在 year%4===0 会出现「任期还剩 30 个月却要投票」或反过来永远等不到。
   * 所以档期一律从 termStart 数起：
   *   midtermAt 月 → 中期保卫战 ｜ termMonths−reelectLead 月 → 连任战 ｜ termMonths 月 → 该走了。
   * 引擎只**开闸**（置 G.pres.raceDue，竞选链的 gate 认它）与**结账**（本届那条链收尾就摘闸），
   * 胜负判定在 campaign.js（winKind:"retain" + winFlag）——写剧情的那一方是内容。 */
  function racing() {
    const G = P.G;
    if (!G.campaign) return null;
    const def = P.campaignDef(G.campaign.id);
    return def && def.incumbent ? G.campaign.id : null;
  }

  /* 本届这一场打完没有：campaignLog 里同 id 且同 ctx（= 同届）的那条已有 to = 收场。 */
  function closeRace(p, c) {
    const id = c.raceDefs[p.raceDue];
    if (!id) { p.raceDue = null; return; }
    const log = P.G.campaignLog || [];
    for (let i = log.length - 1; i >= 0; i--) {
      if (log[i].id !== id || String(log[i].ctx) !== String(p.term)) continue;
      if (log[i].to != null) p.raceDue = null;
      return;
    }
  }

  function presRaces(p, c) {
    const G = P.G;
    const mt = p.months - (p.termStart || 0);
    /* 1) 连任胜选由末幕盖章（pres_re_elected）→ 进入第二届。旗子留在 flags 里，
          结局分级与清算都要读它，所以不消费、只靠 p.term 做闩。 */
    if (p.term === 1 && P.hasFlag("pres_re_elected")) {
      p.term = 2; p.termStart = p.months; p.midDone = 0; p.raceDue = null; p.termDone = 0;
      P.addFlag("pres_two_terms");
      P.pushLog(P.t("ui.presidency.term2",
        "第二届任期开始（累计在任 {m} 个月）。宪法只让你走到这里——下一道门是别人替你关的。",
        { m: p.months }));
    }
    /* 2) 结账 */
    if (p.raceDue) closeRace(p, c);
    /* 3) 开闸：一场在任选举同时只欠一次 */
    if (!p.raceDue && !racing()) {
      if (mt === c.midtermAt && !p.midDone) {
        p.raceDue = "midterm"; p.midDone = 1;
        P.pushLog(P.t("ui.presidency.midtermOpen",
          "就职满 {m} 个月，党机器来函：中期选举的名单该定了。国会两院都在票上。", { m: mt }));
      } else if (mt === c.termMonths - c.reelectLead && p.term === 1) {
        p.raceDue = "reelect";
        P.pushLog(P.t("ui.presidency.reelectOpen",
          "距离投票日还有 {n} 个月。要么现在宣布寻求连任，要么就此告一段落。", { n: c.reelectLead }));
      }
    }
    /* 4) 届满离任：没能连任（或已干满第二届）就走。链还在演时宽限 raceGrace 月，
          超过就按"没能连任"收口——绝不能让一个人永远赖在白宫的月决策通道上。 */
    const race = racing();
    const overdue = mt >= c.termMonths && (!race || mt >= c.termMonths + c.raceGrace);
    if (overdue && p.raceDue !== "reelect") {
      P.leaveOffice(p.term === 2 ? "limit" : "termEnd");
    }
  }

  /* ---------- M3：走出白宫 ----------
   * 只把 tier 从总统降回"联邦重量级"那一档（复用 tier 效果键：峰值、在位时长、
   * 选民池重算都归它管），wh 通道随 isPresident() 转 false 自动关账。
   * 离任的**后果**（记恨、插旗、日志）统一放在 presidencyTick 的离场分支里结算一次，
   * 所以这里只负责"把人挪出白宫"，连任败选与弹劾定罪的 `fall:` 也走同一条收口。 */
  P.leaveOffice = function (reason) {
    const G = P.G;
    if (!G || !P.isPresident()) return false;
    G.presExit = reason || "termEnd";
    P.applyEffects({ tier: -1 });
    return true;
  };

  /* ---------- M3：卸任清算喂料 ----------
   * 140-reckoning 池只认 G.counters["wrath_<组>"]（门槛 25 前哨／55 清算）。
   * 在任时得罪人的账以前没人结，卸任就永远演不出清算 —— 这一笔就是那条管线。
   * 全部走既有键（count/flags），不新增数值系统。 */
  function presExitSettle(p, c) {
    const w = c.exitWrath, cnt = {};
    if ((p.appr || 0) < w.apprBelow || (p.lowStreak || 0) >= c.pressureMonths) cnt.wrath_establishment = w.establishment;
    if (P.scandalLevel() >= 2) cnt.wrath_press = w.press;
    if (P.hasFlag("impeached") || P.hasFlag("investigation_open")) cnt.wrath_agency = w.agency;
    const eff = { flags: ["president_left"] };
    if (Object.keys(cnt).length) eff.count = cnt;
    P.applyEffects(eff);
    return !!eff.count;
  }

  /* ---------- M3：弹劾/逼宫的档期 ----------
   * 引擎只判"这个月该不该演这一出"，输赢交给卡自己的骰子（dice 的 src:"approval"
   * + 建制派 mods）——与「竞选不再掷赌骰、但也不由引擎判死」是同一条纪律。
   * 演过一次就插 impeached 旗；retryMonths 之内不再重复敲同一扇门。 */
  P.impeachmentDue = function () {
    const G = P.G, p = G && G.pres;
    if (!p || p.left != null || !P.isPresident()) return false;
    const c = P.presCfg();
    if (!c.enabled || p.lowStreak < c.pressureMonths) return false;
    if (P.hasFlag("impeached")) return false;
    if (p.impeachAt != null && P.monthSeq() - p.impeachAt < c.impeach.retryMonths) return false;
    return P.scandalLevel() >= c.impeach.scandalMin || P.hasFlag("investigation_open");
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
    /* M3 弹劾/逼宫优先于轮转：真到那一步，这个月的桌上只有这一件事。
       它占的还是那"每月恰 1 条"的名额，所以不推游标——弹完照原节奏继续轮。 */
    if (P.impeachmentDue()) {
      const ic = P.evById(c.impeach.card);
      if (ic && P.when(ic, snap)) {
        G.pres.impeachAt = P.monthSeq();
        return {
          eventId: ic.id, grade: P.gradeOf(ic) || "major",
          valence: P.valenceOf(ic) || "risk", wh: true
        };
      }
    }
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
