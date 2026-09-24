/* ============================================================================
 * POTUS ENGINE · view/stage.js
 * 主循环与中/右栏呈现：年 → 月 → 档期；背景卡、月历卡、平静月、事件出题、
 * 选项代价与保底、收益结算、掷骰结算、下野、年终结算。
 * 本区内私有辅助（reqBlock/costBlock/payCost/resText、pickTale、gainBoxHTML、
 * actClear/actAppend/actInsert/mainInsert 等）只在文件内部使用，不外泄。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* ---------------- 背景卡（折叠 / 展开） ---------------- */
  /* 主角视角的认知边界：他确知什么、他听到什么（真假不明）、他不可能知道什么。
     第三块是留给"懂历史的玩家"的钩子——知道那里有信息差，才能做出更有利的选择。 */
  P.briefCollapsed = function () {
    try { return localStorage.getItem("potus_brief_collapsed") === "1"; } catch (e) { return false; }
  };
  P.toggleBrief = function () {
    const el = P.$("#brief"); if (!el) return;
    const now = el.classList.toggle("collapsed");
    try { localStorage.setItem("potus_brief_collapsed", now ? "1" : "0"); } catch (e) { }
  };
  P.briefHTML = function (ev) {
    const b = ev.brief;
    if (!b) return "";
    const sec = function (cls, title, arr) {
      if (!arr || !arr.length) return "";
      return '<div class="brief-sec ' + cls + '"><h4>' + title + "</h4><ul>" +
        arr.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div>";
    };
    const terms = (b.terms && b.terms.length)
      ? '<div class="brief-sec terms"><h4>' + P.t("ui.stage.briefTerms", "名词") + '</h4>' + b.terms.map(function (t) {
        return '<div class="term"><b>' + t.k + "</b>" + t.v + "</div>";
      }).join("") + "</div>"
      : "";
    return '<div class="brief' + (P.briefCollapsed() ? " collapsed" : "") + '" id="brief">' +
      '<button class="brief-head" onclick="POTUS.toggleBrief()">' +
      '<span class="caret"></span><span class="brief-title">' + P.t("ui.stage.briefTitle", "背景 · 你此刻知道多少") + '</span>' +
      (b.lede ? '<span class="brief-lede">' + b.lede + "</span>" : "") + "</button>" +
      '<div class="brief-body">' +
      sec("known", P.t("ui.stage.briefKnown", "你确知的"), b.known) +
      sec("rumor", P.t("ui.stage.briefRumor", "你听到的 · 真假不明"), b.rumor) +
      sec("unknown", P.t("ui.stage.briefUnknown", "你尚不知道的"), b.unknown) +
      terms + "</div></div>";
  };

  /* ---------------- 主循环：年 → 月 → 档期 ----------------
   * 一个月 = 一个回合。一个「档期」= 一次需要玩家决策的事件。
   * 平静的月份不进 monthPlan，只在月历卡上留一行「平静」。
   * 本月的档期有几个、每个是什么量级（大/中/小），由 engine/time.js 按时代压力抽定。
   * 于是「一年只有几个事件」变成了「一整条月历」，而大事件会往压力高的年份聚。 */

  /* ---------------- 年终随笔：把这一年写成三段人话 ----------------
   * 数字让存档去记。这里回答三个问题：这一年你做了什么、你得到/失去了什么、你现在站在哪。
   * 句子来自 content/13-year-tales.js（reg.yeartale），引擎按条件挑、按顺序拼。 */
  function pickTale(kind, ctx) {
    const tales = P.reg.yeartale || {};
    const cands = [];
    for (const id in tales) {
      const t = tales[id];
      if (t.kind !== kind) continue;
      if (t.when && !P.when(t.when, ctx)) continue;
      cands.push(t);
    }
    if (!cands.length) return "";
    const t = P.pick(cands);
    const s = (t.texts && t.texts.length) ? P.pick(t.texts) : t.text;
    if (!s) return "";
    return s.replace(/\{name\}/g, P.G.name)
      .replace(/\{year\}/g, P.G.year)
      .replace(/\{age\}/g, P.G.age)
      .replace(/\{state\}/g, P.stateName(P.G.state) || P.t("ui.stage.yourState", "你的州"))
      .replace(/\{dRep\}/g, ctx.dRep).replace(/\{dFun\}/g, ctx.dFunTxt)
      .replace(/\{dHp\}/g, ctx.dHp).replace(/\{tier\}/g, P.tierName(P.G.tier));
  }
  P.yearNarrative = function () {
    const G = P.G;
    const snap0 = G.yearStartSnap || { rep: G.rep, fun: G.fun, hp: G.hp, lev: G.lev || 0, tier: G.tier };
    const dRep = G.rep - snap0.rep;
    const dFun = G.fun - snap0.fun;
    const dHp = G.hp - snap0.hp;
    const dLev = (G.lev || 0) - (snap0.lev || 0);
    const dTier = G.tier - snap0.tier;
    const kFun = Math.round(dFun / 1000);
    const ctx = {
      era: G.era, year: G.year, month: 12, age: G.age, track: G.track, party: G.party, stance: G.stance,
      origin: G.origin, entry: G.entry, talent: G.talent, state: G.state, tier: G.tier,
      rep: G.rep, hp: G.hp, fun: G.fun, fav: G.fav, lev: G.lev || 0,
      contactN: P.myContacts().length, knownIds: G.contacts || {},
      scandal: P.scandalLevel(), tenure: P.monthsAtTier(), flags: G.flags || [],
      /* 给句子模板用的差值 */
      dRep: (dRep > 0 ? "+" : "") + dRep, dFunTxt: (kFun > 0 ? "+$" : (kFun < 0 ? "-$" : "$")) + Math.abs(kFun) + "k",
      dHp: (dHp > 0 ? "+" : "") + dHp, dLev: dLev, dTier: dTier,
      upRep: dRep >= 5, downRep: dRep <= -5,
      upFun: kFun >= 150, downFun: kFun <= -150,
      upHp: dHp > 0, downHp: dHp <= -4,
      upTier: dTier > 0, downTier: dTier < 0,
      busyYear: (G.quietMonths || []).length <= 3,
      quietYear: (G.quietMonths || []).length >= 8,
      heads: (G.yearHeads || []).length,
      fallen: G.flags.indexOf("fallen") >= 0
    };
    /* 三段：做了什么 → 得到/失去 → 现在在哪 */
    const did = pickTale("did", ctx);
    const gain = pickTale("gain", ctx);
    const now = pickTale("now", ctx);
    const segs = [];
    if (did) segs.push(did);
    if (gain) segs.push(gain);
    if (now) segs.push(now);
    return segs.join("\n\n");
  };

  /* 时代简报头版照：第一步全年份共用 era.jpg；第二步若有 era-<year>.jpg 则优先用之年专属头版。
     onerror 回退保证「丢了某年图」也不会破版。 */
  P.eraFrontPhoto = function (year) {
    const dir = "assets/events/";
    const specific = "era-" + year + ".jpg";
    const generic = "era.jpg";
    const alt = P.t("ui.stage.eraFrontAlt", "{year} 年 · 时代简报头版", { year: year });
    return '<figure class="art art-press era-front">' +
      '<img src="' + dir + specific + '" alt="' + alt + '"' +
      ' onerror="this.onerror=null;this.src=\'' + dir + generic + '\'">' +
      '<span class="art-ptag">' + P.t("ui.stage.eraFrontTag", "时代头版") + '</span>' +
      '<span class="art-pnum">' + P.t("ui.stage.eraFrontNum", "卷宗 {year}", { year: year }) + "</span>" +
      "</figure>";
  };

  P.startYear = function (resume) {
    P.SCREEN = "game";
    const G = P.G, w = P.reg.worldline || {}, era = P.reg.era[G.era] || { name: G.era, brief: {} };
    /* 年初播报：优先全局时间轴的按年条目，其次 era.brief（按年或通配），
       再退回时间轴通配 —— 未迁移年代照旧走 era，可回退。 */
    const brief = (w.brief && w.brief[G.year])
      || (era.brief && (era.brief[G.year] || era.brief["*"]))
      || (w.brief && w.brief["*"])
      || P.t("ui.stage.yearBrief", "{year}年，风暴仍在继续。", { year: G.year });
    if (!resume) G.month = 0;                 // 0 → advanceMonth 会从 1 月开始
    G.monthPlan = []; G.slotIndex = 0; G.slotCount = 0;
    G.quietMonths = []; G.yearHeads = [];
    G.vigMonth = 0; G.quietLog = [];           // 新的一年：静好岁月的结算水位与随笔记录归零
    /* 年初快照：年终叙事要对比"这一年你得到/失去了什么"，差值从这里来 */
    G.yearStartSnap = { rep: G.rep, fun: G.fun, hp: G.hp, lev: G.lev || 0, tier: G.tier };
    const pl = P.pressureLabel();
    const media = P.mediaNow().map(function (m) { return m.name; }).join(" · ");
    P.app().innerHTML =
      P.topbarHTML() +
      '<div class="grid">' +
      '<div id="main" class="col-event"><div class="news fade"><div class="dateline">' + (w.name || P.eraName() || era.name) +
      " · " + P.t("ui.stage.yearWorld", "{year} 年的世界", { year: G.year }) + '</div><h2>' +
      P.t("ui.stage.yearBriefHead", "{year}：时代简报", { year: G.year }) + "</h2>" +
      (typeof P.eraFrontPhoto === "function" ? P.eraFrontPhoto(G.year) : "") +
      '<div class="body">' + brief + "</div>" +
      '<div class="yearbar">' +
      "<div>" + P.t("ui.stage.pressureLabel", "时代压力：") + "<b class=\"" + pl.cls + '">' + pl.text + "</b>" +
      P.t("ui.stage.pressureNote", "（{v}／6）　·　压力越高，风波越多、越大。", { v: P.pressure().toFixed(1) }) + "</div>" +
      (media ? "<div>" + P.t("ui.stage.mediaNow", "此刻存在的媒介：") + media + "</div>" : "") +
      "</div>" +
      '</div></div>' +
      '<aside class="col-right">' +
      /* 右栏 = 上状态栏 + 下操作栏（#statusbox 必须在 .col-right 内，别放回顶部全宽） */
      '<div id="statusbox" class="statusbox">' + P.statusPanel() + '</div>' +
      '<div class="actbar"><div id="actbody"></div></div></aside></div>';
    document.body.className = "game era-" + G.era;
    // v0.5.4：年度简报「进入 N 月 →」继续按钮进右栏 #actbar（与事件流一致，操作不滚动中栏）
    actAppend('<div class="acthead">' + P.t("ui.stage.newYearHead", "进入新的一年") + '</div><button class="btn primary actbtn" onclick="POTUS.' +
      (resume ? "resumeMonth" : "nextMonth") + '()">' +
      (resume ? P.t("ui.stage.backToMonth", "回到 {m} 月 →", { m: (G.month || 1) }) : P.t("ui.stage.enterJan", "进入 1 月 →")) + "</button>");
    P.tickDate();
  };

  /* 从存档恢复：重建"当月"档期，不重头演这一年。有事月直接进事件，不再过月历页。 */
  P.resumeMonth = function () {
    const G = P.G;
    const plan = (G.monthPlan && G.monthPlan.length) ? G.monthPlan : P.loadMonth(G.month || 1);
    if (!plan.length) { P.nextMonth(); return; }
    P.nextSlot();
  };

  /* 出一个档期：抽事件 → 出题。本月档期出完就推进月份。 */
  P.nextSlot = function () {
    const G = P.G;
    if (G.monthPlan && G.slotIndex < G.slotCount) {
      const slot = G.monthPlan[G.slotIndex];
      G.slotIndex++;
      P.presentEvent(P.drawEvent(slot), slot);
      return;
    }
    P.nextMonth();
  };

  /* 推进到下一个月（v0.9）：
   *   · 有事发生的月份不再有月历中间页 —— 直接进事件（需求①）；
   *   · 连续平静月合并成一张卡再走（需求②）；每个月的"上班账"已由 advanceMonth→monthlyLedger 结清。
   * 逐月推进直到撞到"有事的月"（停在该月、已装载 monthPlan）或一年走完。 */
  P.nextMonth = function () {
    const G = P.G;
    const run = [];
    let ok;
    while (true) {
      ok = P.advanceMonth();
      if (ok === "quiet") { run.push(G.month); continue; }
      break;                                   // ok === "event"（plan 已装载）或 false（年结束）
    }
    /* 学贷断供等"账本型"终局在月度结算里挂上 pendingHardEnd —— 平静月没有 afterEvent，
       这里补一道：下一个月结算完成即收口，不押后到下一个事件。 */
    if (G.pendingHardEnd) {
      const why = G.pendingHardEnd;
      G.pendingHardEnd = null;
      P.ending(why);
      return;
    }
    if (run.length) {
      const nextCall = ok ? "POTUS.nextSlot()" : "POTUS.endYear()";
      const label = ok ? P.t("ui.stage.continue", "继续 →") : P.t("ui.stage.toYearEnd", "进入年度结算 →");
      P.renderQuietRun(run, nextCall, label);  // 连续的平静月 → 合并成一个页面
      return;
    }
    if (!ok) { P.endYear(); return; }
    P.nextSlot();                              // 有事的月份（前面没有平静月）→ 直接进事件
  };

  /* 平静月的"这个月做了什么"：从素材表里按 轨道×层级 抽一条具体工作。
   * 素材在 content/08-vignettes.js 的 quietWorks；引擎只管筛选和拼接。 */
  P.quietWorkLine = function (m) {
    const G = P.G;
    const list = (P.balance().quietWorks) || [];
    const snap = P.snap();
    if (snap && snap.month == null) snap.month = m;
    const ok = list.filter(function (w) {
      return (!w.tracks || w.tracks.indexOf(G.track) >= 0) &&
        (w.minTier == null || G.tier >= w.minTier) && (w.maxTier == null || G.tier <= w.maxTier) &&
        (!w.months || w.months.indexOf(m) >= 0) &&
        (!w.when || P.when(w.when, snap));
    });
    if (!ok.length) return P.t("ui.stage.quietDefault", "按部就班地处理手头的事务。");
    const w = P.pick(ok);
    return (w.texts && w.texts.length) ? P.pick(w.texts) : (w.text || "");
  };

  /* 选民增减筹码：把一批 ledger 的 voters 合并成好感/死忠/反对三枚 chip（反对减少=好，配色随之）。 */
  function voterChips(v) {
    if (!v) return "";
    const CN = {
      warm: P.t("ui.stage.voterWarm", "好感选民"), diehard: P.t("ui.stage.voterDiehard", "死忠"),
      oppose: P.t("ui.stage.voterOppose", "反对者")
    };
    const fmt = P.fmtVoterNum || function (x) { return String(x); };
    let out = "";
    ["warm", "diehard", "oppose"].forEach(function (k) {
      const n = v[k]; if (!n) return;
      const pos = n > 0, isOpp = (k === "oppose");
      const good = isOpp ? !pos : pos;
      out += '<span class="gchip2 ' + (good ? "good" : "bad") + '">' + CN[k] + " " + (pos ? "+" : "") + fmt(n) + "</span>";
    });
    return out;
  }

  /* 把若干个月的"上班账"合成一栏筹码：工资/开销/结余（求和）+ 学贷 + 选民（求和）+ 学贷余额小字。
   * 纯显示 —— 钱已由 core.js monthlyLedger 在时间轴上结清，这里只读 ledger 记录、不再扣钱。 */
  P.ledgerBoxHTML = function (recs, label) {
    recs = (recs || []).filter(Boolean);
    if (!recs.length) return "";
    let salary = 0, living = 0, net = 0, loanPay = 0, cleared = false, debt = 0, late = 0;
    const voters = {};
    recs.forEach(function (r) {
      salary += r.salary || 0; living += r.living || 0; net += r.net || 0;
      loanPay += r.loanPay || 0; if (r.loanCleared) cleared = true;
      if (r.voters) for (const k in r.voters) voters[k] = (voters[k] || 0) + r.voters[k];
      debt = r.debt || 0; late = r.loanLate || 0;
    });
    const items = [];
    items.push({ k: P.t("ui.stage.ledgerSalary", "工资"), v: "+$" + (salary / 1000).toFixed(1) + "k", sign: 1 });
    items.push({ k: P.t("ui.stage.ledgerLiving", "开销"), v: "-$" + (living / 1000).toFixed(1) + "k", sign: -1 });
    items.push({ k: P.t("ui.stage.ledgerNet", "结余"), v: (net >= 0 ? "+$" : "-$") + Math.abs(net / 1000).toFixed(1) + "k", sign: net >= 0 ? 1 : -1 });
    if (loanPay > 0) items.push({ k: P.t("ui.stage.ledgerLoan", "学贷"), v: "-$" + (loanPay / 1000).toFixed(1) + "k", sign: -1 });
    let debtChip = "";
    if (debt > 0) {
      const lim = P.loanLateLimit ? P.loanLateLimit() : 0;
      const lateTxt = late >= 3 ? P.t("ui.stage.loanLate", " · 已逾期 {late} 月", { late: late }) +
        (lim > 0 ? P.t("ui.stage.loanDoom", "（再断供 {left} 个月信用破产）", { left: Math.max(1, lim - late) }) : "") : "";
      debtChip = '<span class="gchip2 ' + (late >= 3 ? "bad" : "muted") + '">' +
        P.t("ui.stage.loanBalance", "学贷余额 ${amt}k", { amt: (debt / 1000).toFixed(0) }) + lateTxt + "</span>";
    } else if (cleared) {
      debtChip = '<span class="gchip2 good">' + P.t("ui.stage.loanCleared", "✓ 学贷还清") + "</span>";
    }
    return '<div class="gainbox"><span class="gtag">' + (label || P.t("ui.stage.monthLedger", "这个月的账")) + "</span>" +
      items.map(function (x) {
        const cls = x.sign > 0 ? "good" : x.sign < 0 ? "bad" : "";
        return '<span class="gchip2 ' + cls + '">' + x.k + " " + x.v + "</span>";
      }).join("") +
      voterChips(voters) + debtChip + "</div>";
  };

  /* ---------------- 连续平静月合并成一张卡（v0.9 需求②） ----------------
   * 把一段"什么都没发生"的月份并成一页交代：月历条列出这几个月（末月标 now）；
   * 单月给一条具体工作、多月给一句概括；工资/学贷/选民读 monthlyLedger 已结的账；
   * 静好岁月随笔 + 按部就班成长由 renderQuiet 出。继续按钮跳到调用方给的下一步。 */
  P.renderQuietRun = function (months, nextCall, label) {
    const G = P.G;
    const box = P.$("#main");
    if (!box) return;
    months = (months || []).filter(function (m) { return m != null; });
    if (!months.length) { P.nextSlot(); return; }
    const n = months.length, first = months[0], last = months[n - 1];
    const recs = months.map(function (m) { return (G.ledger && G.ledger[m]) || null; });
    const acct = P.ledgerBoxHTML(recs, n === 1 ? P.t("ui.stage.monthLedger", "这个月的账") : P.t("ui.stage.monthsLedger", "这 {n} 个月的账", { n: n }));
    let strip = "";
    months.forEach(function (m) {
      strip += '<div class="mlabel quiet' + (m === last ? " now" : "") + '"><b>' + P.t("ui.stage.monthN", "{m} 月", { m: m }) +
        '</b><span>' + P.t("ui.stage.quiet", "平静") + "</span></div>";
    });
    const workHtml = n === 1
      ? '<div class="quietwork"><span class="qw-tag">' + P.t("ui.stage.qwThisMonth", "这个月") + '</span><span class="qw-text">' + P.quietWorkLine(first) + "</span></div>"
      : '<div class="quietwork"><span class="qw-tag">' + P.t("ui.stage.qwTheseMonths", "这几个月") + '</span><span class="qw-text">' + P.t("ui.stage.qwSummary", "按部就班，没有哪件事值得单独记一笔。") + "</span></div>";
    const quiet = P.renderQuiet(months);
    const pl = P.pressureLabel();
    const rangeTxt = n === 1 ? P.t("ui.stage.rangeOne", "{y} 年 {m} 月", { y: G.year, m: first }) : P.t("ui.stage.rangeRun", "{y} 年 {m1} 月 – {m2} 月", { y: G.year, m1: first, m2: last });
    const subtitle = n === 1 ? P.t("ui.stage.quietOne", "平静的一个月") : P.t("ui.stage.quietRun", "平静地度过了 {n} 个月", { n: n });
    box.innerHTML = '<div class="news fade monthcard quietcard">' +
      '<div class="dateline"><span class="dt">' + rangeTxt + "</span> · " + subtitle + "</div>" +
      "<h2>" + rangeTxt + "</h2>" +
      '<div class="mstrip">' + strip + "</div>" +
      workHtml + acct +
      (quiet.html || "") +
      '<div class="yearbar"><div>' + P.t("ui.stage.pressureLabel", "时代压力：") + '<b class="' + pl.cls + '">' + pl.text + "</b></div></div></div>";
    actClear();
    actAppend('<div class="acthead">' + (n === 1 ? P.t("ui.stage.overOne", "这个月过完了") : P.t("ui.stage.overRun", "这几个月过完了")) + '</div><button class="btn primary actbtn" onclick="' + nextCall + '">' + label + "</button>");
    P.tickDate();
    P.refreshPanel();
  };

  /* 选项前置条件：返回 null 表示满足，否则返回提示文本 */
  function reqBlock(ch) {
    const G = P.G, r = ch.req;
    if (!r) return null;
    if (r.fun != null && G.fun < r.fun) return P.t("ui.stage.reqFun", "需要资金 ≥ ${v}", { v: r.fun.toLocaleString() });
    if (r.lev != null && (G.lev || 0) < r.lev) return P.t("ui.stage.reqLev", "需要把柄 ≥ {v}", { v: r.lev });
    if (r.rep != null && G.rep < r.rep) return P.t("ui.stage.reqRep", "需要声望 ≥ {v}", { v: r.rep });
    if (r.tier != null && G.tier < r.tier) return P.t("ui.stage.reqTier", "需要身居 {t} 或以上", { t: P.tierName(r.tier) });
    if (r.track && G.track !== r.track) return P.t("ui.stage.reqNamed", "需要「{name}」", { name: ((P.reg.track[r.track] || {}).name || r.track) });
    if (r.party && G.party !== r.party) return P.t("ui.stage.reqNamed", "需要「{name}」", { name: ((P.reg.party[r.party] || {}).name || r.party) });
    if (r.fac && (G.faction[r.fac] || 0) < (r.min || 0)) return P.t("ui.stage.reqFac", "需要{name}好感 ≥ {v}", { name: P.factionName(r.fac), v: (r.min || 0) });
    if (r.contact && !P.hasContact(r.contact)) return P.t("ui.stage.reqContact", "需要先认识「{name}」", { name: P.contactName(r.contact) });
    if (r.flag && !P.hasFlag(r.flag)) return P.t("ui.stage.reqFlag", "需要状态：{flag}", { flag: r.flag });
    return null;
  }

  /* 资源盘点：选项代价 + 当前余额 */
  const RES_LABEL = { fun: "资金", fav: "人情", rep: "声望", lev: "把柄" };   /* v0.9：精力/健康已退役，不再作为代价展示。本表在 i18n boot 前求值，故中文只作 P.t 默认值，取用时才翻译 */
  function resText(cost) {
    return Object.keys(cost).filter(function (k) { return k !== "ap" && k !== "hp"; }).map(function (k) {
      const v = cost[k];
      if (k === "fun") {
        const a = Math.abs(v);
        /* 不足一千的零头按原样显示——一律除千会算出「资金 $0k」这种没有意义的标签 */
        return P.t("ui.stage.costFun", "资金 {amt}", { amt: (v < 0 ? "-$" : "$") + (a >= 1000 ? (a / 1000).toFixed(0) + "k" : a) });
      }
      return P.t("ui.stage.res." + k, RES_LABEL[k]) + " " + v;
    }).join(" · ");
  }
  function costBlock(ch) {
    if (!ch.cost) return null;
    const G = P.G, lack = [];
    for (const k in ch.cost) { if (k === "ap" || k === "hp") continue; if (k === "fun" ? G.fun < ch.cost[k] : (G[k] || 0) < ch.cost[k]) lack.push(P.t("ui.stage.res." + k, RES_LABEL[k] || k)); }
    return lack.length ? P.t("ui.stage.lack", "缺少{v}", { v: lack.join(P.t("ui.stage.listSep", "、")) }) : null;
  }
  function payCost(ch, extra) {
    const G = P.G, paid = {};
    [ch.cost, extra].forEach(function (c) {
      if (!c) return;
      for (const k in c) { if (!c[k] || k === "ap" || k === "hp") continue; G[k] = (G[k] || 0) - c[k]; paid[k] = (paid[k] || 0) + c[k]; }
    });
    /* 允许负债，但设有谷底：保险丝逼玩家"硬撑"付一笔付不起的开销时，钱可探到负；
       一旦触底即由 enforceDebtFloor 托一把（有代价），不再是无声滑进无底洞。 */
    if (P.enforceDebtFloor) P.enforceDebtFloor();
    G.fav = P.clamp(G.fav, 0, 20); G.ap = P.clamp(G.ap, 0, 99); G.hp = P.clamp(G.hp, 0, 100);
    G.lev = Math.max(0, G.lev || 0);           // 把柄是"份"，花掉就没了，不能欠
    return paid;
  }

  /* 保底选项的选择（纯函数，便于单测）：
   *   本来就有能选的 → -1（不用干预）
   *   全被堵死 → 优先放行「只是资源不够」的那个（剧情走向仍成立，只是硬撑），
   *              其次第一个，返回它的下标。
   * 内容侧的正确做法是每个事件都留一个"不要钱、不设门槛"的选项；
   * 这里只是保险丝，防止内容写漏把玩家关死在一个事件里。 */
  P.fallbackIndex = function (chs) {
    if (!chs || !chs.length) return -1;
    const reqs = chs.map(reqBlock), costs = chs.map(costBlock);
    for (let i = 0; i < chs.length; i++) if (!reqs[i] && !costs[i]) return -1;
    for (let i = 0; i < chs.length; i++) if (!reqs[i]) return i;
    return 0;
  };

  /* ---------------- 收益结算：把 effects 翻译成玩家语言 ----------------
   * 数字是给存档看的，这一栏是给玩家看的：声望、钱、人情、派系、状态，
   * 正负分色，一眼看清"这一手你得到了什么、赔了什么"。 */
  function fmtVoterNum(n) {
    const abs = Math.abs(n);
    if (abs >= 10000) return P.t("ui.stage.numWan", "{n} 万", { n: (n / 10000).toFixed(1) });
    if (abs >= 1000) return P.t("ui.stage.numKilo", "{n} 千", { n: (n / 1000).toFixed(1) });
    return String(n);
  }
  P.fmtVoterNum = fmtVoterNum;      /* v0.6：月卡（vignette.js）也要按同样口径显示选民变化 */
  /* hardEnd 的预览标签：理由不同，死法不同。prison/framed 是铁窗，disgrace/ruined/purged
     是社会性死亡，其余（assassinated/bankrupt…）各按各的收口 —— 一律裸显"入狱"会把
     清算线的"丧命"剧透错方向。 */
  P.hardEndLabel = function (r) {
    r = String(r == null ? "disgrace" : r);
    if (r === "prison" || r === "framed") return P.t("ui.stage.prison", "入狱");
    if (r === "disgrace" || r === "ruined" || r === "purged") return P.t("ui.stage.disgraced", "身败名裂");
    if (r === "bankrupt") return P.t("ui.stage.bankrupt", "信用破产");
    return P.t("ui.stage.doomed", "丧命");
  };
  P.gainSummary = function (eff) {
    const P_ = window.POTUS, G = P_.G;
    const out = [];
    if (!eff) return out;
    /* 变化量为 0 的项一律不列：结算条是给玩家看「这一手改变了什么」，
       堆一串「声望 0」只会把真正有变化的项淹掉。 */
    if (eff.rep) out.push({ k: P.t("ui.stage.res.rep", "声望"), v: eff.rep, sign: eff.rep });
    if (eff.fun) {
      const k = Math.round(eff.fun / 1000);
      if (k) out.push({ k: P.t("ui.stage.res.fun", "资金"), v: (k >= 0 ? "+$" : "-$") + Math.abs(k) + "k", sign: eff.fun });
    }
    if (eff.funMul) {
      const pct = Math.round(eff.funMul * 100);
      if (pct) {
        const base = (P.G.__stakeBase != null && P.G.__stakeBase > 0) ? P.G.__stakeBase : null;
        /* 口径说清楚：本金在选下这项时已扣，这里给的是"这一单回款到账多少"。
           赚 80% = 投 5k 回 9k（5×1.8）；亏 60% = 投 5k 只回 2k。 */
        const fmtK = n => (Math.abs(n) >= 100 ? Math.round(n / 1000) : Math.round(n / 100) / 10) + "k";
        let v;
        if (base != null && pct >= 0) {
          v = P.t("ui.stage.funMulGain", "回款 ${v}（本金 ${b} 赚 {p}%）", { v: fmtK(base * (100 + pct) / 100), b: fmtK(base), p: pct });
        } else if (base != null) {
          v = P.t("ui.stage.funMulLoss", "回款 ${v}（本金 ${b} 已亏 {l}%）", { v: fmtK(base * (100 + pct) / 100), b: fmtK(base), l: -pct });
        } else {
          /* 没有本金声明（req/cost/投注全空）：引擎侧这笔会空转（effects.js），显示同样不给金额 */
          v = P.t("ui.stage.funMulPct", "{pct}%（本金）", { pct: (pct >= 0 ? "+" : "") + pct });
        }
        out.push({ k: P.t("ui.stage.res.fun", "资金"), v: v, sign: pct >= 0 ? 1 : -1,
          tip: base != null ? P.t("ui.stage.stakeTip", STAKE_TIP) : null });
      }
    }
    if (eff.fav) out.push({ k: P.t("ui.stage.res.fav", "人情"), v: eff.fav, sign: eff.fav });
    if (eff.lev) out.push({ k: P.t("ui.stage.res.lev", "把柄"), v: eff.lev, sign: eff.lev });
    if (eff.tier != null && eff.tier !== 0) out.push({ k: P.t("ui.stage.tierLabel", "层级"), v: (eff.tier > 0 ? "T↑" : "T↓"), sign: eff.tier });
    if (eff.attr) for (const a in eff.attr) { if (!eff.attr[a]) continue; out.push({ k: P.t("ui.stage.attr." + a, { CHA: "魅力", INT: "智力", CUN: "手腕", INTG: "诚信" }[a] || a), v: eff.attr[a], sign: eff.attr[a] }); }
    if (eff.fac) for (const f in eff.fac) { if (!eff.fac[f]) continue; out.push({ k: P_.factionName(f), v: eff.fac[f], sign: eff.fac[f] }); }
    if (eff.contact) for (const c in eff.contact) { if (!eff.contact[c]) continue; out.push({ k: P_.contactName(c), v: eff.contact[c], sign: eff.contact[c] }); }
    /* 状态词条：只在 tagNames 里登记过的才翻译（scandal_n 这类内部标记不翻） */
    const tagNames = P_.balance().tagNames || {};
    if (eff.flags) [].concat(eff.flags).forEach(function (f) {
      if (f.indexOf("scandal_") === 0 || f.indexOf("bs_") === 0) return;
      const ti = P.tagInfo(f);
      if (!ti.name || ti.name === f) return;        // 没登记的 key 不显示（宁缺毋滥）
      out.push({ k: P.t("ui.stage.statusTag", "状态"), v: ti.name, sign: 1, flag: true, tip: P.tagTooltip(f) });
    });
    if (eff.notFlags) [].concat(eff.notFlags).forEach(function (f) {
      const ti = P.tagInfo(f);
      if (ti.name && ti.name !== f) out.push({ k: P.t("ui.stage.clearedTag", "解除"), v: ti.name, sign: 1, flag: true, tip: P.tagTooltip(f) });
    });
    if (eff.voters) {
      const VCN = {
        warm: P.t("ui.stage.voterWarm", "好感选民"), diehard: P.t("ui.stage.voterDiehard", "死忠"),
        oppose: P.t("ui.stage.voterOppose", "反对者")
      };
      for (const vk in eff.voters) {
        const n = eff.voters[vk];
        if (!n) continue;
        out.push({ k: VCN[vk] || vk, v: (n > 0 ? "+" : "") + fmtVoterNum(n), sign: vk === "oppose" ? -n : n });
      }
    }
    if (eff.fall) out.push({ k: P.t("ui.stage.fallen", "下野"), v: eff.fall >= 2 ? P.t("ui.stage.fallHard", "重挫") : P.t("ui.stage.fallSoft", "跌落"), sign: -1, flag: true });
    if (eff.hardEnd) out.push({ k: P.t("ui.stage.endgame", "终局"), v: P.hardEndLabel(eff.hardEnd), sign: -1, flag: true });
    /* 树敌：count 效果里带 wrath_ 前缀的键 = 给某个群体攒了仇恨（负面，红字）。
       能力 counters（cap_*）刻意不显示，仇恨 counters 必须显示 —— 玩家得知道谁记恨上自己了。 */
    if (eff.count) for (const ck in eff.count) {
      if (ck.indexOf("wrath_") !== 0 || !eff.count[ck]) continue;
      out.push({ k: P.t("ui.stage.wrath", "树敌"), v: (P.wrathInfo ? P.wrathInfo(ck.slice(6)).name : ck.slice(6)) + " " + (eff.count[ck] > 0 ? "+" : "") + eff.count[ck], sign: -1, flag: true });
    }
    return out;
  };
  function gainBoxHTML(eff) {
    const items = P.gainSummary(eff);
    if (!items.length) return "";
    return '<div class="gainbox"><span class="gtag">' + P.t("ui.stage.thisMove", "这一手") + "</span>" +
      items.map(function (x) {
        const cls = "gchip2 " + (x.flag ? "gflag" : (x.sign > 0 ? "good" : x.sign < 0 ? "bad" : ""));
        /* 只在「值本身就是数字且为正」时补 + 号：
           选民那几项的 v 已经是带符号字符串（"+320"），再补一个就变成 "++320"。
           另：原先这里会拼出两个 class 属性（class="gchip2" class="good"），
           浏览器忽略后者 —— 正负分色其实一直没生效，这里一并修掉。 */
        const plus = (typeof x.v === "number" && x.v > 0 && !x.flag) ? "+" : "";
        const tipAttr = x.tip ? ' hastip" data-tip="' + String(x.tip).replace(/"/g, "&quot;") + '"' : "";
        return '<span class="' + cls + tipAttr + '">' + x.k + " " + plus + x.v + "</span>";
      }).join("") + "</div>";
  }

  /* ---------------- 选项回报预览（掷骰前的区间式预览） ----------------
   * 把五个判定档位（crit/ok/meh/fail/critfail）的 effects 同类项聚合成「最小~最大」
   * 区间，让玩家点之前看清这条路最好 / 最坏能摆动多少（决策信息对称），但不透露
   * 具体落在哪档（保留掷骰悬念）。稀有终局（下野 / 入狱）只用不写细节的角标点一下。
   * 注意：ev 已由 P.drawEvent→P.realize 展开成绝对数值，这里直接读即可；
   *       唯 funMul（投资按比例回报）本金未定，只给百分比区间；flags/状态一律不预览（避免剧透）。 */
  const REW_SCAL = { rep: "声望", fun: "资金", fav: "人情", lev: "把柄" };
  const REW_ATTR = { CHA: "魅力", INT: "智力", CUN: "手腕", INTG: "诚信" };
  const REW_INLINE = 6;                 // 常驻一行最多几枚筹码，其余折进「回报明细」
  function _rmin(a) { return Math.min.apply(null, a); }
  function _rmax(a) { return Math.max.apply(null, a); }
  function _rwSigned(v) { return (v > 0 ? "+" : "") + v; }
  function _rwUsd(v) { return (v < 0 ? "-" : "+") + "$" + (Math.abs(v) / 1000).toFixed(0) + "k"; }
  function _rwVoter(v) { return (v > 0 ? "+" : "") + fmtVoterNum(v); }
  function _rwPct(v) { return (v > 0 ? "+" : "") + Math.round(v) + "%"; }
  function _rwChip(k, lo, hi, fmt, flip, tip, note) {
    let sign = (lo >= 0 && hi >= 0) ? 1 : (hi <= 0 && lo <= 0) ? -1 : 0;
    if (flip) sign = -sign;
    const cls = sign > 0 ? "good" : sign < 0 ? "bad" : "";
    return { k: k, v: (lo === hi) ? fmt(lo) : fmt(lo) + "~" + fmt(hi), cls: cls, tip: tip || null, note: note || null };
  }
  /* 「仅某一档生效」角标（v0.12）：某效果只出现在单个结果档（如只在 crit 的 层级+1），
     区间式预览会让人以为"成功就有"。只在整条选项有 ≥2 个生效档时才标注，单结果选项不啰嗦。 */
  const TIER_NAME_KEY = { crit: ["ui.stage.tierName.crit", "大成功"], ok: ["ui.stage.tierName.ok", "成功"], meh: ["ui.stage.tierName.meh", "勉强过关"], fail: ["ui.stage.tierName.fail", "失败"], critfail: ["ui.stage.tierName.critfail", "大失败"] };
  function _mkSeen() {
    const seen = {};
    return {
      mark: function (id, t) { (seen[id] = seen[id] || []); if (seen[id].indexOf(t) < 0) seen[id].push(t); },
      /* live = 该选项实际参与预览的档数 */
      note: function (id, live) {
        const ts = seen[id] || [];
        if (live < 2 || ts.length !== 1) return null;
        const d = TIER_NAME_KEY[ts[0]];
        return P.t("ui.stage.onlyTier", "仅{t}", { t: P.t(d[0], d[1]) });
      }
    };
  }
  /* ---------------- 竖屏紧凑：强度模糊预览 ----------------
   * 手机竖屏不当攻略本：只看成功档（crit/ok；无掷骰的单结果选项就取其唯一档）的
   * 回报，具体数值换成 +/++/+++ 三档强度（阈值 RW_TICK），最大摆动那笔算强度。
   * 真正落到多少，结算屏会告诉玩家（flashStatusDiffs 红绿高亮已兜底）。 */
  P.compactUI = function () {
    return !!(window.matchMedia && window.matchMedia("(max-width:820px) and (orientation:portrait)").matches);
  };
  const RW_TICK = { fun: [30000, 100000], scal: [6, 15], pct: [100, 250], voter: [60, 200], fac: [10, 25], attr: [2, 5] };
  function _rwTicks(v, th) {
    if (!v) return "";
    const a = Math.abs(v);
    const n = a >= th[1] ? 3 : a >= th[0] ? 2 : 1;
    return (v < 0 ? "-" : "+").repeat(n);
  }
  function _rwPeak(a) {
    let best = 0;
    a.forEach(function (v) { if (Math.abs(v) > Math.abs(best)) best = v; });
    return best;
  }
  /* 树敌预览：扫**所有**结果档的 count 效果，只要有任何一档会攒下 wrath_，
     这一手就点warning —— 仇恨是延时炸弹，不像数值那样只在成功档出现才有意义。 */
  function _rwFeud(outs) {
    const seen = [];
    ["crit", "ok", "meh", "fail", "critfail"].forEach(function (t) {
      const e = outs[t] && outs[t].effects;
      if (!e || !e.count) return;
      for (const ck in e.count) {
        if (ck.indexOf("wrath_") !== 0 || !(e.count[ck] > 0)) continue;
        const g = ck.slice(6);
        if (seen.indexOf(g) < 0) seen.push(g);
      }
    });
    return seen.map(function (g) { return (P.wrathInfo ? P.wrathInfo(g).name : g); });
  }
  P.rewardPreviewCompact = function (ch) {
    const outs = (ch && ch.outcomes) || {};
    const all = ["crit", "ok", "meh", "fail", "critfail"];
    let hasFall = false; const ends = {};
    all.forEach(function (t) {
      const e = outs[t] && outs[t].effects;
      if (!e) return;
      if (e.fall) hasFall = true;
      if (e.hardEnd) ends[e.hardEnd] = 1;
    });
    const risk = [];
    Object.keys(ends).forEach(function (r) {
      const l = P.hardEndLabel(r); if (risk.indexOf(l) < 0) risk.push(l);
    });
    if (hasFall) risk.push(P.t("ui.stage.fallen", "下野"));
    let good = ["crit", "ok"].filter(function (t) { return outs[t] && outs[t].effects; });
    if (!good.length) good = all.filter(function (t) { return outs[t] && outs[t].effects; });
    const scal = {}, voters = { diehard: [], warm: [], oppose: [] }, fac = {}, attr = {}, funMul = [];
    let up = false;
    const seen = _mkSeen();
    good.forEach(function (t) {
      const e = outs[t].effects;
      for (const k in REW_SCAL) if (typeof e[k] === "number") { (scal[k] = scal[k] || []).push(e[k]); seen.mark("s:" + k, t); }
      if (typeof e.funMul === "number") { funMul.push(e.funMul); seen.mark("fm", t); }
      if (e.voters) for (const vk in voters) if (typeof e.voters[vk] === "number") { voters[vk].push(e.voters[vk]); seen.mark("v:" + vk, t); }
      if (e.fac) for (const f in e.fac) { (fac[f] = fac[f] || []).push(e.fac[f]); seen.mark("f:" + f, t); }
      if (e.attr) for (const a in e.attr) { (attr[a] = attr[a] || []).push(e.attr[a]); seen.mark("a:" + a, t); }
      if (e.tier > 0) { up = true; seen.mark("tier+", t); }
    });
    const chips = [];
    const put = function (k, v, th, flip, tip) {
      if (flip) v = -v;                       // 反对者增加 = 坏事（与完整版 _rwChip 同约定）
      const s = _rwTicks(v, th);
      if (!s) return;
      chips.push({ k: k, v: s, cls: v > 0 ? "good" : v < 0 ? "bad" : "", tip: tip || null });
    };
    if (scal.rep) put(P.t("ui.stage.res.rep", "声望"), _rwPeak(scal.rep), RW_TICK.scal);
    if (scal.fun) put(P.t("ui.stage.res.fun", "资金"), _rwPeak(scal.fun), RW_TICK.fun);
    if (funMul.length) put(P.t("ui.stage.principal", "本金回报"), _rwPeak(funMul) * 100, RW_TICK.pct, false, STAKE_TIP);
    if (voters.diehard.length) put(P.t("ui.stage.voterDiehard", "死忠"), _rwPeak(voters.diehard), RW_TICK.voter);
    if (voters.warm.length) put(P.t("ui.stage.voterWarm", "好感选民"), _rwPeak(voters.warm), RW_TICK.voter);
    if (voters.oppose.length) put(P.t("ui.stage.voterOppose", "反对者"), _rwPeak(voters.oppose), RW_TICK.voter, true);
    if (up) chips.push({ k: P.t("ui.stage.tierLabel", "层级"), v: "↑", cls: "gflag", note: seen.note("tier+", good.length) });
    ["fav", "lev"].forEach(function (k) {
      if (scal[k]) put(P.t("ui.stage.res." + k, REW_SCAL[k]), _rwPeak(scal[k]), RW_TICK.scal);
    });
    Object.keys(fac).map(function (f) { return { f: f, s: Math.abs(_rwPeak(fac[f])) }; })
      .sort(function (a, b) { return b.s - a.s; }).slice(0, 2).forEach(function (x) {
        put(P.factionName(x.f), _rwPeak(fac[x.f]), RW_TICK.fac);
      });
    Object.keys(attr).forEach(function (a) { put(P.t("ui.stage.attr." + a, REW_ATTR[a] || a), _rwPeak(attr[a]), RW_TICK.attr); });
    return { chips: chips, risk: risk, feud: _rwFeud(outs) };
  };
  P.rewardPreview = function (ch) {
    if (P.compactUI()) return P.rewardPreviewCompact(ch);
    const outs = (ch && ch.outcomes) || {};
    const tiers = ["crit", "ok", "meh", "fail", "critfail"];
    const scal = {}, voters = { diehard: [], warm: [], oppose: [] }, fac = {}, attr = {};
    const funMul = [];
    let hasFall = false, ends = {}, up = false, down = false;
    const seen = _mkSeen();
    let liveTiers = 0;
    tiers.forEach(function (t) {
      const e = outs[t] && outs[t].effects;
      if (!e) return;
      liveTiers++;
      for (const k in REW_SCAL) if (typeof e[k] === "number") { (scal[k] = scal[k] || []).push(e[k]); seen.mark("s:" + k, t); }
      if (typeof e.funMul === "number") { funMul.push(e.funMul); seen.mark("fm", t); }
      if (e.voters) for (const vk in voters) if (typeof e.voters[vk] === "number") { voters[vk].push(e.voters[vk]); seen.mark("v:" + vk, t); }
      if (e.fac) for (const f in e.fac) { (fac[f] = fac[f] || []).push(e.fac[f]); seen.mark("f:" + f, t); }
      if (e.attr) for (const a in e.attr) { (attr[a] = attr[a] || []).push(e.attr[a]); seen.mark("a:" + a, t); }
      if (e.fall) hasFall = true;
      if (e.hardEnd) ends[e.hardEnd] = 1;
      if (e.tier > 0) { up = true; seen.mark("tier+", t); }
      if (e.tier < 0) { down = true; seen.mark("tier-", t); }
    });
    const chips = [];
    if (scal.rep) chips.push(_rwChip(P.t("ui.stage.res.rep", "声望"), _rmin(scal.rep), _rmax(scal.rep), _rwSigned, false, null, seen.note("s:rep", liveTiers)));
    if (scal.fun) chips.push(_rwChip(P.t("ui.stage.res.fun", "资金"), _rmin(scal.fun), _rmax(scal.fun), _rwUsd, false, null, seen.note("s:fun", liveTiers)));
    if (funMul.length) chips.push(_rwChip(P.t("ui.stage.principal", "本金回报"), _rmin(funMul) * 100, _rmax(funMul) * 100, _rwPct, false, STAKE_TIP, seen.note("fm", liveTiers)));
    if (voters.diehard.length) chips.push(_rwChip(P.t("ui.stage.voterDiehard", "死忠"), _rmin(voters.diehard), _rmax(voters.diehard), _rwVoter, false, null, seen.note("v:diehard", liveTiers)));
    if (voters.warm.length) chips.push(_rwChip(P.t("ui.stage.voterWarm", "好感选民"), _rmin(voters.warm), _rmax(voters.warm), _rwVoter, false, null, seen.note("v:warm", liveTiers)));
    if (voters.oppose.length) chips.push(_rwChip(P.t("ui.stage.voterOppose", "反对者"), _rmin(voters.oppose), _rmax(voters.oppose), _rwVoter, true, null, seen.note("v:oppose", liveTiers)));
    if (up || down) chips.push({ k: P.t("ui.stage.tierLabel", "层级"), v: (up && down) ? "↑↓" : (up ? "↑" : "↓"), cls: (down && !up) ? "bad" : "gflag",
      note: (up && down) ? null : seen.note(up ? "tier+" : "tier-", liveTiers) });
    ["fav", "lev"].forEach(function (k) { if (scal[k]) chips.push(_rwChip(P.t("ui.stage.res." + k, REW_SCAL[k]), _rmin(scal[k]), _rmax(scal[k]), _rwSigned, false, null, seen.note("s:" + k, liveTiers))); });
    Object.keys(fac).map(function (f) { return { f: f, s: Math.abs(_rmin(fac[f])) + Math.abs(_rmax(fac[f])) }; })
      .sort(function (a, b) { return b.s - a.s; }).slice(0, 2).forEach(function (x) {
        chips.push(_rwChip(P.factionName(x.f), _rmin(fac[x.f]), _rmax(fac[x.f]), _rwSigned, false, null, seen.note("f:" + x.f, liveTiers)));
      });
    Object.keys(attr).forEach(function (a) { chips.push(_rwChip(P.t("ui.stage.attr." + a, REW_ATTR[a] || a), _rmin(attr[a]), _rmax(attr[a]), _rwSigned, false, null, seen.note("a:" + a, liveTiers))); });
    const risk = [];
    Object.keys(ends).forEach(function (r) {
      const l = P.hardEndLabel(r); if (risk.indexOf(l) < 0) risk.push(l);
    });
    if (hasFall) risk.push(P.t("ui.stage.fallen", "下野"));
    return { chips: chips, risk: risk, feud: _rwFeud(outs) };
  };
  function rewChipHTML(c) {
    const tip = c.tip ? ' hastip" data-tip="' + String(c.tip).replace(/"/g, "&quot;") : "";
    return '<span class="gchip2 ' + c.cls + tip + '">' + c.k + " " + c.v +
      (c.note ? '<i class="gnote">' + c.note + "</i>" : "") + "</span>";
  }
  function rewLineHTML(rew) {
    if (!rew.chips.length && !rew.risk.length && !(rew.feud && rew.feud.length)) return "";
    const show = rew.chips.slice(0, REW_INLINE), more = rew.chips.slice(REW_INLINE);
    return '<span class="rewline"><span class="gtag">' + P.t("ui.stage.rewardTag", "回报") + "</span>" +
      show.map(rewChipHTML).join("") +
      (more.length ? '<span class="gchip2 rew-more">' + P.t("ui.stage.moreItems", "＋{n} 项", { n: more.length }) + "</span>" : "") +
      (rew.risk.length ? '<span class="rew-risk">' + P.t("ui.stage.riskNote", "⚠ 有{r}风险", { r: rew.risk.join("/") }) + "</span>" : "") +
      (rew.feud && rew.feud.length ? '<span class="rew-feud">' + P.t("ui.stage.feudNote", "⚠ 树敌：{f}", { f: rew.feud.join("/") }) + "</span>" : "") +
      "</span>";
  }

  /* 头版导语（standfirst）：有 ev.standfirst 直接用；否则从正文第一句提炼一句斜体引文。
     不写回事件文件——只做界面层的呈现提炼。 */
  function standfirstOf(ev) {
    if (ev && ev.standfirst) return ev.standfirst;
    const b = (ev && ev.body) || "";
    const parts = b.split(/[。！？\n]/);
    let first = (parts[0] || "").trim();
    if (first.length > 64) first = first.slice(0, 64) + "…";
    return first || (ev && ev.title) || "";
  }

  /* ---------- 成功把握的「文字档位」 ----------
   * 只给一句话的手感，不报百分比（保留不确定性，也避免玩家拿数字当精确预期）。
   * 六档由红到绿递进：机会渺茫 → 凶多吉少 → 胜负难料 → 略占上风 → 胜券在握 → 十拿九稳。
   * 只有带 base（要走判定）的选项才有把握可说；纯剧情选项（无判定）不显示，避免误导。 */
  const ODDS_SCALE = [
    { min: 0.85, key: "ui.stage.odds.l5", label: "十拿九稳", cls: "odds-l5" },
    { min: 0.70, key: "ui.stage.odds.l4", label: "胜券在握", cls: "odds-l4" },
    { min: 0.55, key: "ui.stage.odds.l3", label: "略占上风", cls: "odds-l3" },
    { min: 0.40, key: "ui.stage.odds.l2", label: "胜负难料", cls: "odds-l2" },
    { min: 0.25, key: "ui.stage.odds.l1", label: "凶多吉少", cls: "odds-l1" },
    { min: -1,   key: "ui.stage.odds.l0", label: "机会渺茫", cls: "odds-l0" }
  ];
  function oddsOf(ch) {
    if (!ch || ch.base == null) return null;      // 不用判定 → 没有「把握」可言
    const p = P.computeP(ch).P;
    for (let i = 0; i < ODDS_SCALE.length; i++) if (p >= ODDS_SCALE[i].min) return ODDS_SCALE[i];
    return ODDS_SCALE[ODDS_SCALE.length - 1];
  }
  const ODDS_TIP = "这一手成功的把握：受选项本身、你的天赋、以及选区选民底气共同影响；投入资金可以往上加，但每次判定本身仍然有运气。";
  /* 投资筹码的口径说明：按【本金利润率】显示（80% = 投 5k 回 9k，即本金+八成利润） */
  const STAKE_TIP = "选下这项时本金已垫付；这里的百分比是本金的回报率：赚 80% = 投 5k 回 9k（含本金），亏 60% = 投 5k 回 2k。";

  P.presentEvent = function (ev, slot) {
    P.tickDate();
    const grade = (slot && slot.grade) || P.gradeOf(ev);
    /* v0.6：把本次量级记在状态上，结算时（resolveChoice）算"事件自动选民增减"要用 */
    P.G.__curGrade = grade;
    const gdef = P.reg.grade[grade] || {};
    const catName = ev.category ? P.categoryName(ev.category) : "";
    const medName = ev.medium ? [].concat(ev.medium).map(P.mediumName).join(" / ") : "";
    /* 事件链的「前情」：让玩家知道自己接的是哪条线、上一幕是多久以前 */
    let chainHTML = "";
    if (ev.after && ev.after.id) {
      const prev = P.prevEventOf(ev);
      const gap = P.monthsSince(ev.after.id);
      const gapText = gap == null ? "" : (gap <= 0 ? P.t("ui.stage.thisMonth", "就在本月") : P.t("ui.stage.monthsAgo", "{n} 个月前", { n: gap }));
      chainHTML = '<div class="chain"><span class="chain-tag">' + P.t("ui.stage.chainTag", "承 前") + '</span>' +
        '<span class="chain-body">' + (prev ? prev.title : ev.after.id) +
        (gapText ? P.t("ui.stage.wideSep", "　·　") + gapText : "") + "</span></div>";
    }
    const box = P.$("#main");
    /* 三值性徽标：机遇/风险/威胁 —— 玩家第一眼就知道找上我的是哪种事 */
    const val = P.valenceOf(ev);
    const vchip = '<span class="vchip ' + val + '" title="' +
      (val === "boon" ? P.t("ui.stage.valBoon", "机会：再糟的处理也不会亏") : val === "bane" ? P.t("ui.stage.valBane", "威胁：不处理必有代价，处理得好能翻盘") : P.t("ui.stage.valRisk", "风险：搏与不搏都是路")) + '">'
      + P.t("ui.stage.valLabel." + val, P.VAL_LABEL[val] || val) + "</span>";
    /* 主次顺序：标题 → 承前 → 正文（主角视角发生了什么）→ 插画 → 背景卡（折叠）→ 选项 */
    const standfirst = standfirstOf(ev);
    /* 档案编号：本局走到第几件事（不足三位补零），配合等宽字做档案标签 */
    const dno = String(((P.G.history || []).length) + 1).padStart(3, "0");
    /* v0.9：有事发生的月份也把"本月上班的账"（工资/开销/学贷/选民）露在事件卡顶部。
       只在本月第一件事上显示（避免同月多事件重复刷屏）；钱已由 advanceMonth→monthlyLedger 结清。 */
    let settleHTML = "";
    if (P.G.slotIndex === 1 && P.G.ledger && P.G.ledger[P.G.month]) {
      settleHTML = P.ledgerBoxHTML([P.G.ledger[P.G.month]], P.t("ui.stage.monthSettle", "本月 · 身位结算"));
    }
    box.innerHTML =
      '<article class="news editorial fade">' +
      '<div class="dossier-head">' +
        '<span class="dnum">DOSSIER // EVENT NO. ' + dno + ' — ' + P.dateText(ev) + '</span>' +
        '<span class="dmeta">' + vchip +
          (gdef.name ? '<span class="gchip ' + (gdef.cls || "") + '">' + gdef.name + "</span>" : "") +
          (catName ? '<span class="cchip">' + catName + "</span>" : "") +
          (medName ? '<span class="cchip medium">' + medName + "</span>" : "") +
          (ev.type ? '<span class="cchip">' + ev.type + "</span>" : "") +
        '</span>' +
      '</div>' +
      settleHTML +
      chainHTML +
      '<h1 class="headline">' + (ev.title || "") + '</h1>' +
      (standfirst ? '<p class="standfirst">' + standfirst + "</p>" : "") +
      /* 红色橡皮章：盖在头条图右上角（用户设计）。artSVG 恒有返回（兜底垫片），
         包一层 .art-slot 作定位容器，章子从图上沿斜压下来。 */
      '<div class="art-slot">' + P.artSVG(ev) +
        '<div class="stamp">' + P.t("ui.stage.stamp", "档案") + "</div></div>" +
      '<div class="body">' + (ev.body || "") + "</div>" +
      '</article>' +
      /* 背景卡在事件框下面（中栏底部）：想细看的人展开，不挡任何东西 */
      '<div class="brief-slot">' + P.briefHTML(ev) + "</div>";
    /* v0.5.3 三栏布局：选项进右栏（#actbar），与掷骰/结算/继续按钮同栏 */
    const cbox = document.getElementById("actbody");
    let choicesHost = null;
    if (cbox) {
      choicesHost = document.createElement("div");
      choicesHost.className = "choices act-choices";
      choicesHost.id = "choices";
      cbox.innerHTML = '<div class="acthead">' + P.t("ui.stage.yourChoices", "你的选择") +
        (P.compactUI() ? '<span class="ah-hint">' + P.t("ui.stage.pickHint", "成功收益越大，失败的损失可能越大") + "</span>" : "") +
        "</div>";
      cbox.appendChild(choicesHost);
    }
    const cTarget = choicesHost || P.$("#choices");
    const chs = ev.choices || [];
    /* 保底机制：如果所有选项都被堵死（没钱 / 没声望 / 没层级），放行一个，
       免得玩家卡在一个点不动的事件上。正常情况下不该触发（校验器强制每个事件
       都有保底选项），这里只是兜底。 */
    const forced = P.fallbackIndex(chs);
    chs.forEach(function (ch, i) {
      const blockedReq = reqBlock(ch);
      const blockedCost = costBlock(ch);
      const isForced = i === forced;
      const blocked = isForced ? null : (blockedReq || blockedCost);
      const stakeSpec = P.stakeSpec(ch);
      const rew = P.rewardPreview(ch);
      const btn = document.createElement("button");
      const _odds = oddsOf(ch);
      btn.className = "choice" + (isForced ? " forced" : "") + (_odds ? " odds-bg " + _odds.cls : "");
      btn.disabled = !!blocked;
      /* 掷骰对用户隐藏：不报胜算百分比，只用一句话给「把握」的手感；
         风险的量由三值性徽标 + 把握档位 + 回报区间共同传达。 */
      const hint = stakeSpec ? '<span class="hint">' + P.t("ui.stage.stakeHint", "可投入资源，搏更大把握") + "</span>" : "";
      const oddsHTML = _odds ? '<span class="odds ' + _odds.cls + ' hastip" data-tip="' + P.t("ui.stage.oddsTip", ODDS_TIP) + '">' + P.t(_odds.key, _odds.label) + "</span>" : "";
      /* 代价可能「有键但无内容」（例如只写了已退役的 ap/hp），先算出文本再决定渲不渲染 */
      const costTxt = ch.cost ? resText(ch.cost) : "";
      btn.innerHTML = ch.text + oddsHTML + hint +
        (costTxt ? '<span class="costtag">' + P.t("ui.stage.costTag", "代价：") + costTxt + "</span>" : "") +
        rewLineHTML(rew) +
        (blocked ? '<span class="req">✕ ' + (blockedReq || blockedCost) + "</span>" : "") +
        (isForced ? '<span class="req forced-tag">' + P.t("ui.stage.forcedNote", "⚠ 保底选项：{why}，硬撑一次（资源会被扣到见底）", { why: (blockedCost || blockedReq) }) + "</span>" : "");
      /* 选项说明：折叠展开（默认收起）—— 把"这条路意味着什么"留给愿意细看的玩家 */
      if (ch.note) {
        const det = document.createElement("details");
        det.className = "chnote";
        det.innerHTML = "<summary>" + P.t("ui.stage.noteTag", "说明") + "</summary><div>" + ch.note + "</div>";
        btn.appendChild(det);
      }
      /* 回报溢出的完整区间：超出一行的筹码折进「回报明细」（同样靠 closest('.chnote') 不误触选择） */
      if (rew.chips.length > REW_INLINE) {
        const rdet = document.createElement("details");
        rdet.className = "chnote";
        rdet.innerHTML = "<summary>" + P.t("ui.stage.rewardDetail", "回报明细") + "</summary><div>" + rew.chips.map(rewChipHTML).join(" ") + "</div>";
        btn.appendChild(rdet);
      }
      btn.onclick = function (e) {
        if (e && e.target && e.target.closest && e.target.closest(".chnote")) return;  // 点说明不选选项
        P.choose(ev, ch);
      };
      cTarget.appendChild(btn);
    });
    /* 状态面板同步当前日期（否则要等到本次结算后才会刷新） */
    P.refreshPanel();
  };

  /* funMul 的本金基数（investment base）：
     结算前写入，applyEffects 用，结算完清零。 */
  function G_stakeBase(v) { P.G.__stakeBase = v; }

  /* 右栏（#actbar）的两个 HTML 快捷操作 */
  function actClear() { const bar = document.getElementById("actbody"); if (bar) bar.innerHTML = ""; }
  function actAppend(html) { const bar = document.getElementById("actbody"); if (bar) { const d = document.createElement("div"); d.innerHTML = html; while (d.firstChild) bar.appendChild(d.firstChild); } }

  /* 操作元素（选项/掷骰/结算/继续按钮）的归宿：右栏 #actbar。
     没有右栏的页面（标题/建角/年终）退回 #main 尾部——单栏兼容。 */
  function actInsert(el) {
    const bar = document.getElementById("actbody");
    if (bar) { bar.appendChild(el); return; }
    const main = P.$("#main");
    if (main) main.appendChild(el);
  }
  /* 旧名兼容（投注面板等历史调用点） */
  function mainInsert(el) { actInsert(el); }

  /* ---------------- 判定与结算 ---------------- */
  P.resolveChoice = function (ev, ch, st) {
    const prevVals = P.statusVals ? P.statusVals() : null;   // 扣费/结算前拍一张，供「什么变了」红绿高亮对照
    const info = st ? P.stakeInfo(ch, st) : null;
    const r = P.computeP(ch, info);
    const res = P.rollTierAdv(r.P, !!(info && info.reroll));
    const out = ch.outcomes[res.tier] || ch.outcomes.ok || {};
    /* v0.6 选民动态：所有事件的成败都自动给选民增减（量级 × 判定档位 × 事件类型），
       内容显式写了 effects.voters / 或本次改变身位的，以内容为准。
       合成一个 effFinal 给「应用到状态」和「收益结算显示」共用——账面上写的和实际扣的一致。 */
    const effFinal = P.withEventVoters
      ? P.withEventVoters(out.effects, ev, ch, out, res.tier)
      : (out.effects || {});
    /* 投资本金基数：选项 cost + 入场费门槛 req.fun + 投注的资金 —— funMul 按它算回报（不是总余额）。
       v0.12：req.fun 也计入（"账上要有 60 万才吃得下这单"= 60 万压进这单）；
       三者全空的 funMul 在 effects.js 空转告警，绝不再拿总余额乘倍数。 */
    G_stakeBase((ch.cost && ch.cost.fun ? ch.cost.fun : 0) + (ch.req && ch.req.fun ? ch.req.fun : 0) + (info && info.cost ? (info.cost.fun || 0) : 0));
    const paid = payCost(ch, info && info.cost);
    const cbox = P.$("#choices"); if (cbox) cbox.style.display = "none";
    /* 掷骰在后台完成（rollTier 已算出 res.tier），界面上不再演骰子、不报点数、
       不列目标值与加值明细。玩家看到的只有：结果档位（大成功/成功/勉强/失败/大失败）
       ＋ 叙事正文 ＋ 收益结算。判定过程依旧确定可复算，只是不作为噪声呈现。 */
    P.applyEffects(effFinal);
    P.G.__stakeBase = 0;                       // 用完即清：后续事件不再吃旧本金
    /* TIER_LABEL 是 i18n 加载前求值的表（dice.js），中文原文兜底、取用点现翻 */
    const label = P.t("ui.stage.tierBadge." + res.tier, P.TIER_LABEL[res.tier] || res.tier);
    const div = document.createElement("div");
    div.className = "result " + res.tier + " fade";
    /* 档位做成小徽章（按档位配色），叙事正文独立成段 —— 一眼看清"结果如何"，
       再读"发生了什么"，不再是一个 18px 粗体压着一段正文。 */
    div.innerHTML = '<span class="rtag">' + label + '</span><div class="rbody">' + (out.body || "") + "</div>";
    mainInsert(div);
    const gainHTML = gainBoxHTML(effFinal);
    if (gainHTML) {
      const gb = document.createElement("div");
      gb.className = "fade";
      gb.innerHTML = gainHTML;
      mainInsert(gb);
    }
    const eff = effFinal || {};
    const newScandal = (eff.flags || []).some(function (f) { return f.indexOf("scandal_") === 0; });
    if (newScandal || out.news) {
      const headline = P.makeNews(out.news || P.t("ui.stage.newsLead", "陷入争议：{t}", { t: String(out.body || "").slice(0, 24) }));
      P.G.history.push(headline);
      (P.G.yearHeads = P.G.yearHeads || []).push(headline);
      P.pushLog(P.t("ui.stage.logHeadline", "头条：{h}", { h: headline }));
      const nv = document.createElement("div"); nv.className = "news fade";
      nv.innerHTML = '<div class="dateline">' + P.t("ui.stage.breaking", "突发") + '</div><div class="body">' + headline + "</div>";
      mainInsert(nv);
    }
    P.pushLog("[" + (ev.title || "") + "] " + label);
    const btn = document.createElement("button");
    btn.className = "btn primary"; btn.style.marginTop = "10px"; btn.textContent = P.t("ui.stage.continue", "继续 →");
    btn.onclick = function () { P.afterEvent(); };
    mainInsert(btn);
    P.refreshPanel();
    if (P.flashStatusDiffs) P.flashStatusDiffs(prevVals);   // 状态栏标出这一手改变了什么
    P.autosave();
  };

  P.afterEvent = function () {
    const b = P.balance(), G = P.G;
    /* 事件效果可能把资金一次扣穿：过一遍负债设底，触底即被接济（有代价），再判生死去留。 */
    if (P.enforceDebtFloor) P.enforceDebtFloor();
    if (G.hp <= 0) return P.ending("death_health");
    /* 硬 BE：事件效果键 hardEnd 已写入 pendingHardEnd（入狱/身败名裂）—— 政治生命就此终结 */
    if (G.pendingHardEnd) {
      const why = G.pendingHardEnd;
      G.pendingHardEnd = null;
      return P.ending(why);
    }
    if (P.hasFlag("prison") || P.hasFlag("scandal_5")) return P.ending("prison");
    if (G.age >= b.retireAge) return P.ending("retire");
    /* v0.11 P1：入主白宫不再是终局。达成最高层级时只记「曾任总统」状态，游戏继续打到 2025。
       完整任期/连任/表现分机制见 P2；此处先让「总统成为一种可继续任职的状态」。 */
    if (G.tier >= b.tierMax && !P.hasFlag("president_done")) { P.addFlag("president_done"); }
    /* 软 BE「下野」：fall 效果已把层级/声望/标记处理完。这里单独出一页交代卡，
       玩家点「继续」才推进 —— 不然 nextSlot 会立刻把这一页冲掉。游戏继续，东山再起留给后面。 */
    if (G.fallenThisTurn) {
      G.fallenThisTurn = false;
      const main = P.$("#main");
      if (main) {
        const fb = document.createElement("div");
        fb.className = "bs fade";
        fb.innerHTML = '<div class="dateline" style="color:#7a1f1f">' + P.t("ui.stage.fallen", "下野") + '</div><h2>' +
          P.t("ui.stage.fallenHead", "你从台上走了下来") + "</h2>" +
          '<div class="body">' + P.t("ui.stage.fallenBody",
            "办公室的灯还亮着，但已经不是为你亮的了。你交出钥匙、名单和那些「回头再说」的承诺，" +
            "从台阶上退了下来。支持你的人散了一半，记得你的人却一个没少。\n\n" +
            "这不是结局。这个国家见过太多从谷底爬回来的人 —— 只要政治生命还在，台阶就还在。") + "</div>";
        mainInsert(fb);
        const cbtn = document.createElement("button");
        cbtn.className = "btn primary"; cbtn.style.marginTop = "10px"; cbtn.textContent = P.t("ui.stage.continue", "继续 →");
        cbtn.onclick = function () { P.nextSlot(); };
        mainInsert(cbtn);
        P.refreshPanel();
        P.autosave();
        return;
      }
    }
    P.nextSlot();
  };

  /* 年终结算：把这一年发生过的事收成一页，再进下一年 */
  P.endYear = function () {
    const b = P.balance(), G = P.G;
    G.age++;
    const tal = P.reg.talent[G.talent] || {};
    const decay = tal.hpDecayMul == null ? 1 : tal.hpDecayMul;
    G.hp = P.clamp(G.hp - Math.round(P.rint(b.hpDecayMin, b.hpDecayMax) * decay), 0, 100);
    if (G.fun > 0) G.fun = Math.round(G.fun * (1 + b.interestRate));
    // 精力按健康恢复：健康是"精力上限"的来源，健康差 → 每年可投入的资源变少
    const apBase = b.apBase == null ? 6 : b.apBase, apDiv = b.apHealthDiv || 25;
    G.ap = P.clamp(apBase + Math.floor(G.hp / apDiv), b.apMin || 1, b.apMax || 12);
    for (let i = 5; i >= 1; i--) {
      const f = "scandal_" + i;
      if (P.hasFlag(f) && P.chance(b.scandalDecayChance)) { P.delFlag(f); if (i > 1) P.addFlag("scandal_" + (i - 1)); }
    }
    /* 把柄会过期：当事人下台、死了，或者事情被时间冲淡了。
       所以"囤把柄"不是稳健策略 —— 留到需要用的时候用。 */
    let levGone = 0;
    if ((G.lev || 0) > 0) {
      for (let i = 0; i < G.lev; i++) if (P.chance(b.leverageDecayChance == null ? 0.34 : b.leverageDecayChance)) levGone++;
      G.lev = Math.max(0, G.lev - levGone);
    }
    if (levGone) P.pushLog(P.t("ui.stage.levDecay", "时效：有 {n} 份把柄失去了价值（当事人下台或事情过去了）。", { n: levGone }));
    P.pushLog(P.t("ui.stage.yearSettleLog", "年度结算：{age}岁，声望{rep}，资金${fun}k。", { age: G.age, rep: G.rep, fun: (G.fun / 1000).toFixed(0) }));

    let bsHTML = "";
    if (P.chance(b.blackswanChance)) {
      const wl = P.reg.worldline || {};
      const list = (wl.blackswan && (wl.blackswan[G.year] || wl.blackswan["*"])) || P.reg.blackswan[G.era] || [];
      if (list.length) {
        const bs = P.pick(list);
        P.addFlag("bs_" + (bs.id || bs.title));
        P.applyEffects(bs.effects);
        bsHTML = '<div class="bs"><div class="dateline" style="color:#9c2b2b">' + P.t("ui.stage.blackswan", "黑天鹅") + "</div>" +
          "<h2>" + bs.title + '</h2><div class="body">' + bs.body + "</div></div>";
        P.pushLog(P.t("ui.stage.blackswanLog", "黑天鹅：{t}", { t: bs.title }));
      }
    }
    P.autosave();

    const main = P.$("#main");
    if (!main) return;
    const sc = P.scandalLevel();
    const heads = (G.yearHeads || []).slice(-5).map(function (h) { return "<li>" + h + "</li>"; }).join("");
    const quiet = (G.quietMonths || []).length;
    /* v0.5.2：平静月已逐月出卡，年终不再重复整段文字（tailVig 保留给旧存档渲染） */
    const tailVig = { html: "" };
    /* 年终随笔：三段人话（做了什么/得失/处境）放在数字条上方 —— 文学为主，数字为辅 */
    const taleText = P.yearNarrative();
    const tales = taleText
      ? '<div class="ytales">' + taleText.split(/\n\n+/).map(function (p) {
        return '<p class="ytale-p">' + p + "</p>";
      }).join("") + "</div>"
      : "";
    main.innerHTML = '<div class="news fade yearcard">' +
      '<div class="dateline"><span class="dt">' + P.t("ui.stage.yearN", "{y} 年", { y: G.year }) + "</span>" +
      P.t("ui.stage.yearEndTag", " · 年度结算") + "</div>" +
      "<h2>" + P.t("ui.stage.yearDone", "{y} 年走完了", { y: G.year }) + "</h2>" +
      tales +
      '<div class="yearbar">' +
      "<div>" + P.t("ui.stage.sumAge", "{n} 岁", { n: G.age }) + P.t("ui.stage.wideSep", "　·　") + P.officeName() +
      P.t("ui.stage.sumOffice", "（在位 {n} 个月）", { n: P.monthsAtTier() }) + P.t("ui.stage.wideSep", "　·　") +
      (sc ? P.t("ui.stage.sumScandal", "丑闻 Lv") + sc : P.t("ui.stage.noScandal", "无丑闻")) +
      P.t("ui.stage.wideSep", "　·　") + P.t("ui.stage.sumQuiet", "平静的月份 {n} 个", { n: quiet }) + "</div>" +
      "<div>" + P.t("ui.stage.sumRep", "声望 {v}", { v: G.rep }) + P.t("ui.stage.wideSep", "　·　") +
      P.t("ui.stage.sumCash", "资金 ${v}k", { v: (G.fun / 1000).toFixed(0) }) + P.t("ui.stage.wideSep", "　·　") +
      P.t("ui.stage.sumLev", "把柄 {n} 份", { n: (G.lev || 0) }) + "</div>" +
      "<div>" + P.t("ui.stage.sumContacts", "人脉 {n} 人", { n: P.myContacts().length }) +
      (G.state ? P.t("ui.stage.wideSep", "　·　") + P.stateName(G.state) : "") +
      (levGone ? P.t("ui.stage.wideSep", "　·　") + P.t("ui.stage.sumLevLost", "{n} 份把柄在本年失效", { n: levGone }) : "") + "</div>" +
      "</div>" +
      (tailVig.html || "") +
      (heads ? '<h3 class="sechead">' + P.t("ui.stage.yearHeads", "这一年的头条") + '</h3><ul class="heads">' + heads + "</ul>" : "") +
      bsHTML +
      '</div>';
    // v0.5.4：年终「进入 N 年 →」继续按钮进右栏 #actbar（清理上一事件残留结算，操作不滚动中栏）
    actClear();
    const endY = b.endYear == null ? 2025 : b.endYear;
    if (G.year >= endY) {
      /* v0.11 P1：打到终点年（2025）——不再进入下一年，改为弹出生涯成就结算。 */
      actAppend('<button class="btn primary actbtn" onclick="POTUS.careerEnd()">' + P.t("ui.stage.settleCareer", "查看生涯结算 →") + "</button>");
    } else {
      actAppend('<button class="btn primary actbtn" onclick="POTUS.nextYear()">' + P.t("ui.stage.enterYear", "进入 {y} 年 →", { y: (G.year + 1) }) + "</button>");
    }
    P.tickDate();
    P.refreshPanel();
  };

  /* 生涯结算入口：走到 2025 终点年后由年终结算屏的按钮触发（见 endYear）。 */
  P.careerEnd = function () { P.ending("career_end"); };

  P.nextYear = function () {
    const b = P.balance(), endY = b.endYear == null ? 2025 : b.endYear;
    if (P.G.year >= endY) return P.careerEnd();     // 保险：越不过终点年
    P.G.year++; P.startYear();
  };
})();
