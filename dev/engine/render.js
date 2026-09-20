/* ============================================================================
 * POTUS ENGINE · render.js
 * 界面与主循环（年 / beat / 选择 / 结算）。界面完全由注册表驱动，
 * 内容里新增出身、天赋、起点、轨道、党派、派系都会自动出现在界面上。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;
  P.SCREEN = "title";

  /* ---------------- 标题 ---------------- */
  P.renderTitle = function () {
    P.SCREEN = "title"; document.body.className = "";
    P.app().innerHTML =
      '<div class="center" style="padding:30px 0">' +
      '<div class="masthead"><div class="title">POTUS</div>' +
      '<div class="meta">一个美国小伙的从政之路<br>文字驱动 · 政治生涯模拟 · 引擎 v' + P.VERSION + "</div></div>" +
      '<p class="muted">在真实的历史浪潮里，从毕业生爬向权力顶点——或摔下去。<br>掷骰决定命运，存档随时在手。</p>' +
      '<button class="btn primary" onclick="POTUS.startCreate()">开始新游戏</button> ' +
      '<button class="btn" onclick="POTUS.openLoad()">读取存档</button>' +
      '<p class="hintline">内容包数量：' + Object.keys(P.reg.era).length + ' 个时代 · ' + P.events.length + ' 个事件 · ' +
      Object.keys(P.reg.ending).length + " 条结局规则</p></div>";
  };

  /* ---------------- 建角 ---------------- */
  P.startCreate = function () {
    P.SCREEN = "create";
    P.CSEL = { era: null, origin: null, talent: null, entry: null, party: null, stance: null, state: null, name: "",
      rolled: null, spent: {}, rerolled: {}, freeExtra: 0 };
    P.renderCreate();
  };
  P.pickCreate = function (key, k) { P.CSEL[key] = k; P.renderCreate(); };

  function group(title, map, key, extra) {
    let h = '<h3 style="margin:14px 0 4px">' + title + "</h3>";
    for (const k in map) {
      const o = map[k], sel = P.CSEL[key] === k ? " sel" : "";
      const bits = [];
      if (o.desc) bits.push(o.desc);
      if (extra) { const e = extra(o); if (e) bits.push(e); }
      h += '<div class="opt' + sel + '" onclick="POTUS.pickCreate(\'' + key + "','" + k + "')\"><b>" +
        (o.name || k) + "</b><small>" + bits.join(" · ") + "</small></div>";
    }
    return h;
  }

  /* ---------- 定命一掷：四属性各 roll 一把，再洒自由点 ----------
   * 掷出来的数字是"命"，自由点是"努力"。命不公平时允许各重掷一次（rerolls），
   * VIP 充值码可以给努力加码 —— 测试码表见 balance.vipCodes。 */
  P.rollAttrs = function () {
    const b = P.balance(), r = b.rollAttrs || {};
    P.CSEL.rolled = {
      CHA: P.rint(r.min == null ? 35 : r.min, r.max == null ? 55 : r.max),
      INT: P.rint(r.min == null ? 35 : r.min, r.max == null ? 55 : r.max),
      CUN: P.rint(r.min == null ? 35 : r.min, r.max == null ? 55 : r.max),
      INTG: P.rint(r.min == null ? 35 : r.min, r.max == null ? 55 : r.max)
    };
    P.CSEL.spent = {};
    P.CSEL.rerolled = {};
    P.renderCreate();
  };
  /* 单属性重掷（每个属性限 rerolled[k] < rerolls 次） */
  P.rerollAttr = function (k) {
    const b = P.balance(), r = b.rollAttrs || {};
    if (!P.CSEL.rolled) return;
    const n = (r.rerolls == null ? 1 : r.rerolls);
    if ((P.CSEL.rerolled[k] || 0) >= n) return;
    P.CSEL.rerolled[k] = (P.CSEL.rerolled[k] || 0) + 1;
    P.CSEL.rolled[k] = P.rint(r.min == null ? 35 : r.min, r.max == null ? 55 : r.max);
    P.CSEL.spent[k] = 0;                       // 重掷过的属性退回洒进去的点
    P.renderCreate();
  };
  P.spendAttr = function (k, d) {
    if (!P.CSEL.rolled) return;
    const b = P.balance();
    const cap = b.freeCapPerAttr == null ? 15 : b.freeCapPerAttr;
    const cur = P.CSEL.spent[k] || 0;
    const used = ["CHA", "INT", "CUN", "INTG"].reduce(function (a, x) { return a + (P.CSEL.spent[x] || 0); }, 0);
    const total = (b.freePoints == null ? 8 : b.freePoints) + (P.CSEL.freeExtra || 0);
    if (d > 0 && used >= total) return;                 // 点数洒完了
    if (d > 0 && cur >= cap) return;                    // 单属性加点到顶
    if (d < 0 && cur <= 0) return;
    P.CSEL.spent[k] = cur + d;
    P.renderCreate();
  };
  /* VIP 充值码：输入匹配码表即激活（一码一用，记 localStorage） */
  P.applyVipCode = function () {
    const inp = P.$("#vipcode");
    if (!inp) return;
    const err = P.vipActivate(inp.value);
    if (err) { alert(err); return; }
    const key = String(inp.value).trim().toUpperCase();
    const b = P.balance();
    P.CSEL.freeExtra = (P.CSEL.freeExtra || 0) + (b.vipCodes[key] || 0);
    P.pushLog ? null : null;
    P.renderCreate();
  };

  /* 建角页的「定命一掷 + 自由点 + VIP」整块 */
  function rollBlockHTML() {
    const b = P.balance();
    const r = b.rollAttrs || {};
    const total = (b.freePoints == null ? 8 : b.freePoints) + (P.CSEL.freeExtra || 0);
    const used = ["CHA", "INT", "CUN", "INTG"].reduce(function (a, x) { return a + (P.CSEL.spent[x] || 0); }, 0);
    const cap = b.freeCapPerAttr == null ? 15 : b.freeCapPerAttr;
    const ATTR_NAME = { CHA: "魅力", INT: "智力", CUN: "手腕", INTG: "诚信" };
    const usedCodes = P.vipUsedList();
    let h = '<h3 style="margin:14px 0 4px">定命一掷 <button class="btn tiny" id="rollBtn">' +
      (P.CSEL.rolled ? "重掷全部" : "掷骰") + "</button></h3>";
    if (!P.CSEL.rolled) {
      h += '<div class="muted" style="font-size:13px">还没掷。四属性各在 ' +
        (r.min == null ? 35 : r.min) + "-" + (r.max == null ? 55 : r.max) +
        " 之间 —— 命运发牌，你决定怎么打。</div>";
      return h;
    }
    h += '<div class="rollgrid">';
    ["CHA", "INT", "CUN", "INTG"].forEach(function (k) {
      const base = P.CSEL.rolled[k], sp = P.CSEL.spent[k] || 0;
      const canUp = used < total && sp < cap;
      const canDown = sp > 0;
      const rer = (P.CSEL.rerolled[k] || 0) >= (r.rerolls == null ? 1 : r.rerolls);
      h += '<div class="rattr"><b>' + ATTR_NAME[k] + "</b>" +
        '<span class="rval">' + (base + sp) + "</span>" +
        (sp ? '<i class="rspent">+' + sp + "</i>" : "") +
        '<button class="btn tiny" ' + (rer ? "disabled" : "") + ' data-reroll="' + k + '">重掷</button>' +
        '<span class="rctrl"><button class="btn tiny" ' + (canDown ? "" : "disabled") + ' data-spend="' + k + ',-1">−</button>' +
        '<button class="btn tiny" ' + (canUp ? "" : "disabled") + ' data-spend="' + k + ',1">＋</button></span>' +
        "</div>";
    });
    h += "</div>";
    h += '<div class="rleft' + (used >= total ? " done" : "") + '">自由点：还剩 <b>' + (total - used) + "</b>／" + total +
      (P.CSEL.freeExtra ? '（含 VIP +' + P.CSEL.freeExtra + "）" : "") +
      "　·　单属性最多 +" + cap + "</div>";
    h += '<div class="viprow"><input type="text" id="vipcode" placeholder="充值码（VIP1/VIP5/VIP20/VIP50…）">' +
      '<button class="btn tiny" id="vipBtn">兑换</button>' +
      (usedCodes.length ? '<span class="muted" style="font-size:11.5px">已激活：' + usedCodes.join("、") + "</span>" : "") +
      "</div>";
    return h;
  }

  P.renderCreate = function () {
    const C = P.CSEL;
    const ready = C.era && C.origin && C.talent && C.entry && C.party && C.stance && C.state && C.rolled;
    P.app().innerHTML =
      '<div class="create"><div class="masthead"><div class="title">创建角色</div><div class="meta">可能性优先</div></div>' +
      group("选择时代锚点（开局年份）", P.reg.era, "era", function (o) { return o.startYear + " 年 · 难度 " + (o.diff || "—"); }) +
      group("出身", P.reg.origin, "origin") +
      group("出生州（当地选民有自己的倾向）", P.reg.state, "state", function (o) {
        const LEAN = { D: "民主党地盘", R: "共和党地盘", S: "摇摆州" };
        const STR = { 1: "略偏", 2: "明显倾向", 3: "铁票仓" };
        return (LEAN[o.lean] || "") + (o.lean === "S" ? "" : "·" + (STR[o.strength] || "")) +
          " ｜ 与州倾向同党顺风，反着走是逆风（拉拢少数派的地形）";
      }) +
      group("天赋（灵根）", P.reg.talent, "talent") +
      group("起点路径", P.reg.entry, "entry", function (o) { return o.track_suggest ? "建议轨道：" + (P.reg.track[o.track_suggest] || {}).name : ""; }) +
      group("党派", P.reg.party, "party") +
      group("姿态", P.reg.stance, "stance") +
      rollBlockHTML() +
      '<h3 style="margin:14px 0 4px">姓名</h3>' +
      '<input type="text" id="pname" placeholder="输入你的名字" value="' + (C.name || "") + '" style="width:100%">' +
      '<div style="margin-top:16px" class="center">' +
      '<button class="btn primary" ' + (ready ? "" : "disabled") + ' onclick="POTUS.confirmCreate()">进入 ' +
      (ready ? (P.reg.era[C.era] || {}).name : "…（先完成选择与掷骰）") + "</button> " +
      '<button class="btn" onclick="POTUS.renderTitle()">返回</button></div>' +
      '<p class="hintline">起点 ' + Object.keys(P.reg.entry).length + " 种 × 轨道 " + Object.keys(P.reg.track).length +
      " 条 × 党派 " + Object.keys(P.reg.party).length + " × 姿态 " + Object.keys(P.reg.stance).length +
      " × 州 " + Object.keys(P.reg.state).length + "。轨道由起点建议，可在游戏中切换。</p></div>";
    const inp = P.$("#pname");
    if (inp) inp.oninput = function (e) { P.CSEL.name = e.target.value; };
    const rb = P.$("#rollBtn");
    if (rb) rb.onclick = function () { P.rollAttrs(); };
    document.querySelectorAll("[data-reroll]").forEach(function (el) {
      el.onclick = function () { P.rerollAttr(el.getAttribute("data-reroll")); };
    });
    document.querySelectorAll("[data-spend]").forEach(function (el) {
      const parts = el.getAttribute("data-spend").split(",");
      el.onclick = function () { P.spendAttr(parts[0], parseInt(parts[1], 10)); };
    });
    const vb = P.$("#vipBtn");
    if (vb) vb.onclick = function () { P.applyVipCode(); };
  };

  P.confirmCreate = function () {
    const C = P.CSEL, b = P.balance();
    const name = (C.name || "无名氏").trim() || "无名氏";
    const era = P.reg.era[C.era];
    /* 属性：掷骰 + 自由点；没掷过（旧调用方/测试）就用平衡表的 startAttr */
    let attr;
    if (C.rolled) {
      attr = {};
      ["CHA", "INT", "CUN", "INTG"].forEach(function (k) {
        attr[k] = P.clamp((C.rolled[k] || 0) + (C.spent[k] || 0), 1, 99);
      });
    } else {
      attr = Object.assign({}, b.startAttr);
    }
    /* 出生州对党派的顺风/逆风：写进起点派系（深州同党 +建制，逆风党 -建制+基层的同情） */
    const wind = P.stateWindFor(C.state, C.party);
    const stateFx = {};
    if (wind > 0) stateFx.establishment = wind * 5;
    else if (wind < 0) { stateFx.establishment = wind * 4; stateFx.base = Math.abs(wind) * 3; }
    P.G = {
      version: P.VERSION, seed: P.rint(1, 9999999),
      name: name, era: C.era, year: era.startYear, age: b.startAge,
      origin: C.origin, talent: C.talent,
      entry: C.entry, track: (P.reg.entry[C.entry] || {}).track_suggest || Object.keys(P.reg.track)[0],
      party: C.party, stance: C.stance, state: C.state || "",
      attr: attr, faction: {},
      fun: b.startFun, rep: b.startRep, hp: b.startHp, ap: b.startAp, fav: b.startFav, lev: b.startLev || 0,
      tier: (P.reg.entry[C.entry] || {}).tier || 0,
      score: 0, flags: [], history: [], log: [], aiState: { callsUsed: 0 },
      contacts: {},
      /* 时间模型：month(1-12) 是唯一权威。
         monthPlan 是本月的"档期表"——一个档期 = 一次需要玩家决策的事件。
         平静的月份不会进 monthPlan，只记在 quietMonths 里。 */
      month: 1, monthPlan: [], slotIndex: 0, slotCount: 0, quietMonths: [], doneIds: [],
      doneSeq: {}, tierSince: 0, vigMonth: 0, quietLog: [], rngState: P.rint(1, 9999999), endingReason: null,
      /* 主线：当前主线 + 本局走过的主线 + 换线空窗的截止月。跨年不清零 —— 一条线可以横跨好几年。 */
      arc: null, arcLog: [], arcCool: 0,
      /* v0.5：下野记录 + 年初快照（年终叙事对比用） */
      fallenCount: 0, fallenShieldUntil: 0, yearStartSnap: null
    };
    P.G.tierSince = P.monthSeq();
    for (const k in P.reg.faction) P.G.faction[k] = 0;
    P.recentIds = [];
    P.applyEffects((P.reg.origin[C.origin] || {}).effects);
    P.applyEffects((P.reg.entry[C.entry] || {}).effects);
    P.applyEffects((P.reg.state[C.state] || {}).entryEffects);
    if (Object.keys(stateFx).length) P.applyEffects({ fac: stateFx });
    P.pushLog("开局：" + name + "，" + era.name + "，" + (P.reg.origin[C.origin] || {}).name + "出身，" +
      (C.state ? P.stateName(C.state) + "，" : "") +
      (P.reg.entry[C.entry] || {}).name + "，" + (P.reg.party[C.party] || {}).name + "/" + (P.reg.stance[C.stance] || {}).name + "。");
    document.body.className = "era-" + C.era;
    P.startYear();
  };

  /* 时间：年 / 月 / 日
     月份由引擎推进（engine/time.js 的 advanceMonth），是唯一权威；
     事件只负责声明自己的「日」（day），以及它内容上属于哪个月（month，用于抽取时匹配）。 */
  P.dateText = function (ev) {
    const G = P.G;
    const y = (ev && ev.year) || G.year;
    const m = G.month || 1;
    const d = ev && ev.day;
    return y + " 年 " + m + " 月" + (d ? " " + d + " 日" : "");
  };
  /* 兼容旧内容 / 旧测试：把当前月向后推到 m（接受数字或 {month:n}）。年内不回退。 */
  P.setMonth = function (m) {
    const G = P.G;
    const want = (m && m.month) || m || G.month || 1;
    G.month = Math.max(want, G.month || 1);
    return G.month;
  };
  P.tickDate = function () {
    const G = P.G, b = P.balance();
    const el = document.querySelector(".masthead .meta");
    if (!el) return;
    const track = P.reg.track[G.track] || { name: G.track };
    el.innerHTML = P.dateText() + "　·　第 " + (G.age - b.startAge + 1) + " 个年头<br>" +
      G.name + " · " + track.name + "<br>" +
      (P.reg.party[G.party] || {}).name + "/" + (P.reg.stance[G.stance] || {}).name;
  };

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
      ? '<div class="brief-sec terms"><h4>名词</h4>' + b.terms.map(function (t) {
        return '<div class="term"><b>' + t.k + "</b>" + t.v + "</div>";
      }).join("") + "</div>"
      : "";
    return '<div class="brief' + (P.briefCollapsed() ? " collapsed" : "") + '" id="brief">' +
      '<button class="brief-head" onclick="POTUS.toggleBrief()">' +
      '<span class="caret"></span><span class="brief-title">背景 · 你此刻知道多少</span>' +
      (b.lede ? '<span class="brief-lede">' + b.lede + "</span>" : "") + "</button>" +
      '<div class="brief-body">' +
      sec("known", "你确知的", b.known) +
      sec("rumor", "你听到的 · 真假不明", b.rumor) +
      sec("unknown", "你尚不知道的", b.unknown) +
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
      .replace(/\{state\}/g, P.stateName(P.G.state) || "你的州")
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

  P.startYear = function (resume) {
    P.SCREEN = "game";
    const G = P.G, era = P.reg.era[G.era] || { name: G.era, brief: {} };
    const brief = (era.brief && (era.brief[G.year] || era.brief["*"])) || (G.year + "年，风暴仍在继续。");
    if (!resume) G.month = 0;                 // 0 → advanceMonth 会从 1 月开始
    G.monthPlan = []; G.slotIndex = 0; G.slotCount = 0;
    G.quietMonths = []; G.yearHeads = [];
    G.vigMonth = 0; G.quietLog = [];           // 新的一年：静好岁月的结算水位与随笔记录归零
    /* 年初快照：年终叙事要对比"这一年你得到/失去了什么"，差值从这里来 */
    G.yearStartSnap = { rep: G.rep, fun: G.fun, hp: G.hp, lev: G.lev || 0, tier: G.tier };
    const pl = P.pressureLabel();
    const media = P.mediaNow().map(function (m) { return m.name; }).join(" · ");
    P.app().innerHTML =
      '<div class="masthead"><div class="title">' + era.name + '</div><div class="meta"></div></div>' +
      P.toolbarHTML() +
      '<div class="grid"><aside class="col-left">' + P.statPanel() + '</aside><div id="main"><div class="news fade"><div class="dateline">' + era.name +
      " · " + G.year + ' 年的世界</div><h2>' + G.year + "：时代简报</h2>" +
      '<div class="body">' + brief + "</div>" +
      '<div class="yearbar">' +
      "<div>时代压力：<b class=\"" + pl.cls + '">' + pl.text + "</b>（" + P.pressure().toFixed(1) + "／6）　·　压力越高，风波越多、越大。</div>" +
      (media ? "<div>此刻存在的媒介：" + media + "</div>" : "") +
      "</div>" +
      '</div><button class="btn primary" style="margin-top:10px" onclick="POTUS.' +
      (resume ? "resumeMonth" : "nextMonth") + '()">' +
      (resume ? "回到 " + (G.month || 1) + " 月 →" : "进入 1 月 →") + "</button>" +
      "</div></div><aside class=\"col-right\" id=\"actbar\"></aside></div>";
    P.tickDate();
  };

  /* 从存档恢复：重建"当月"档期，不重头演这一年 */
  P.resumeMonth = function () {
    const G = P.G;
    const plan = (G.monthPlan && G.monthPlan.length) ? G.monthPlan : P.loadMonth(G.month || 1);
    if (!plan.length) { P.nextMonth(); return; }
    P.renderMonthCard([]);
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

  /* 推进到下一个月；平静月也出一张卡（逐月手动点继续），一年到头就年终结算 */
  P.nextMonth = function () {
    const G = P.G;
    const before = G.quietMonths.length;
    const ok = P.advanceMonth();
    const skipped = G.quietMonths.slice(before);
    if (ok === "quiet") { P.renderQuietMonthCard(); return; }   // v0.5.2：平静月逐月出卡
    if (!ok) { P.endYear(); return; }
    P.renderMonthCard(skipped);
  };

  /* ---------------- 平静月的月卡：一个月一个月地过 ----------------
   * 用户 v0.5.2 的要求：连续平静月不许合并——每个月单独一张卡，手动点继续。
   * 卡上交代：这个月做了什么（具体工作，素材按轨道/层级筛选）+ 这个月的账
   * （工资进、开销出、顺手攒的人情/人脉）+ 引擎结算的成长。 */
  P.renderQuietMonthCard = function () {
    const G = P.G;
    const box = P.$("#main");
    if (!box) return;
    const m = G.month;
    /* 这个月的静好结算已经由 advanceMonth→settleQuietMonth 做掉了，这里只读 */
    const entry = (G.quietLog || []).filter(function (e) { return e.year === G.year && e.month === m; })[0];
    const gain = (entry && entry.gain) || {};
    const workLine = P.quietWorkLine(m);            /* 具体做了什么（content/08 的素材） */
    /* 账目行：工资/开销（引擎按职位与年代实算） + 静好结算的成长 */
    const acct = P.quietAccount(m, gain);
    const pl = P.pressureLabel();
    box.innerHTML = '<div class="news fade monthcard quietcard">' +
      '<div class="dateline"><span class="dt">' + G.year + " 年 " + m + " 月</span> · 平静的一个月</div>" +
      "<h2>" + G.year + " 年 " + m + " 月</h2>" +
      '<div class="mstrip"><div class="mlabel now quiet"><b>' + m + " 月</b><span>平静</span></div></div>" +
      '<div class="quietwork"><span class="qw-tag">这个月</span><span class="qw-text">' + workLine + "</span></div>" +
      (acct.html || "") +
      (entry && entry.text ? '<div class="vig"><div class="vig-body">' +
        entry.text.split(/\n\n+/).map(function (p) { return '<p class="vig-p">' + p + "</p>"; }).join("") +
        "</div></div>" : "") +
      '<div class="yearbar"><div>时代压力：<b class="' + pl.cls + '">' + pl.text + "</b></div></div></div>";
    /* 继续按钮 → 右栏 */
    actClear();
    actAppend('<div class="acthead">这个月过完了</div><button class="btn primary actbtn" onclick="POTUS.nextMonth()">继续 →</button>');
    P.tickDate();
    P.refreshPanel();
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
    if (!ok.length) return "按部就班地处理手头的事务。";
    const w = P.pick(ok);
    return (w.texts && w.texts.length) ? P.pick(w.texts) : (w.text || "");
  };

  /* 平静月的账目：工资按【职位】实算（reg.officeSalary 可给具体职位定月薪，
     miss 才退到 tier 公式）- 开销（体面成本）+ 静好成长合并成一行筹码。
     用户的原则：身份直接决定日常收益——市议员和联邦参议员的工资差一个数量级。 */
  P.quietAccount = function (m, gain) {
    const G = P.G, b = P.balance();
    const q = b.quietAccount || {};
    const officeTable = (P.reg.officeSalary || {});
    let salary = officeTable[G.track + "_" + G.tier];
    if (salary == null) salary = officeTable["*_" + G.tier];
    if (salary == null) salary = Math.round((q.salaryBase == null ? 2000 : q.salaryBase) * (1 + G.tier * (q.salaryPerTier == null ? 2.2 : q.salaryPerTier)));
    const living = P.rint((q.livingMin == null ? 800 : q.livingMin), (q.livingMax == null ? 2200 : q.livingMax)) * (1 + G.tier * 0.6);
    const net = salary - Math.round(living);
    G.fun += net;                                    /* 账当场入存档（平静月出卡即结算） */
    const items = [];
    items.push({ k: "工资", v: "+$" + (salary / 1000).toFixed(1) + "k", sign: 1 });
    items.push({ k: "开销", v: "-$" + (living / 1000).toFixed(1) + "k", sign: -1 });
    items.push({ k: "结余", v: (net >= 0 ? "+$" : "-$") + Math.abs(net / 1000).toFixed(1) + "k", sign: net >= 0 ? 1 : -1 });
    const ATTR_CN = { CHA: "魅力", INT: "智力", CUN: "手腕", INTG: "诚信" };
    for (const k in (gain.attr || {})) items.push({ k: ATTR_CN[k] || k, v: "+" + gain.attr[k], sign: 1 });
    if (gain.hp) items.push({ k: "健康", v: "+" + gain.hp, sign: 1 });
    if (gain.rep) items.push({ k: "声望", v: "+" + gain.rep, sign: 1 });
    if (gain.contact) items.push({ k: "人脉好感", v: "+" + gain.contact, sign: 1 });
    if (gain.fav) items.push({ k: "人情", v: "+" + gain.fav, sign: 1 });
    if (gain.ap) items.push({ k: "精力", v: "+" + gain.ap, sign: 1 });
    if (gain.fun) items.push({ k: "额外进账", v: (gain.fun > 0 ? "+$" : "-$") + Math.abs(gain.fun / 1000).toFixed(1) + "k", sign: gain.fun > 0 ? 1 : -1 });
    return {
      net: net,
      html: '<div class="gainbox"><span class="gtag">这个月的账</span>' +
        items.map(function (x) {
          const cls = x.sign > 0 ? "good" : x.sign < 0 ? "bad" : "";
          return '<span class="gchip2 ' + cls + '">' + x.k + " " + x.v + "</span>";
        }).join("") + "</div>"
    };
  };

  /* 月历卡：把刚刚「静悄悄过去」的月份一次交代清楚，并把本月要发生什么亮出来 */
  P.renderMonthCard = function (skipped) {
    const G = P.G;
    const box = P.$("#main");
    if (!box) return;
    const gc = P.monthGradeCount();
    const chips = ["major", "mid", "minor"].filter(function (g) { return gc[g]; })
      .map(function (g) {
        const d = P.reg.grade[g] || {};
        return '<span class="gchip ' + (d.cls || "") + '">' + P.gradeName(g) + " ×" + gc[g] + "</span>";
      }).join("");
    let strip = "";
    (skipped || []).forEach(function (m) {
      strip += '<div class="mlabel quiet"><b>' + m + ' 月</b><span class="muted">平静</span></div>';
    });
    strip += '<div class="mlabel now"><b>' + G.month + " 月</b><span>有事发生</span>" + chips + "</div>";
    const pl = P.pressureLabel();
    const media = P.mediaNow().map(function (m) { return m.name; }).join(" · ");
    /* 静好岁月：刚刚静悄悄过去的月份，不只是一行"平静"——写成一段日子给玩家看，
       同时把"按部就班"的那点成长结算掉（同一个月只结算一次）。 */
    const quiet = P.renderQuiet(skipped);
    box.innerHTML = '<div class="news fade monthcard">' +
      '<div class="dateline"><span class="dt">' + G.year + " 年 " + G.month + " 月</span> · 月历</div>" +
      "<h2>" + G.year + " 年 " + G.month + " 月</h2>" +
      '<div class="mstrip">' + strip + "</div>" +
      (quiet.html || "") +
      '<div class="yearbar"><div>时代压力：<b class="' + pl.cls + '">' + pl.text + "</b>" +
      (media ? "　·　媒介：" + media : "") + "</div></div></div>";
    /* 继续按钮 → 右栏 */
    actClear();
    actAppend('<div class="acthead">本月</div><button class="btn primary actbtn" onclick="POTUS.nextSlot()">继续 →</button>');
    P.tickDate();
    P.refreshPanel();
  };

  /* 选项前置条件：返回 null 表示满足，否则返回提示文本 */
  function reqBlock(ch) {
    const G = P.G, r = ch.req;
    if (!r) return null;
    if (r.fun != null && G.fun < r.fun) return "需要资金 ≥ $" + r.fun.toLocaleString();
    if (r.lev != null && (G.lev || 0) < r.lev) return "需要把柄 ≥ " + r.lev;
    if (r.rep != null && G.rep < r.rep) return "需要声望 ≥ " + r.rep;
    if (r.tier != null && G.tier < r.tier) return "需要身居 " + P.tierName(r.tier) + " 或以上";
    if (r.track && G.track !== r.track) return "需要「" + ((P.reg.track[r.track] || {}).name || r.track) + "」";
    if (r.party && G.party !== r.party) return "需要「" + ((P.reg.party[r.party] || {}).name || r.party) + "」";
    if (r.fac && (G.faction[r.fac] || 0) < (r.min || 0)) return "需要" + P.factionName(r.fac) + "好感 ≥ " + (r.min || 0);
    if (r.contact && !P.hasContact(r.contact)) return "需要先认识「" + P.contactName(r.contact) + "」";
    if (r.flag && !P.hasFlag(r.flag)) return "需要状态：" + r.flag;
    return null;
  }

  /* 资源盘点：选项代价 + 当前余额 */
  const RES_LABEL = { fun: "资金", fav: "人情", ap: "精力", rep: "声望", hp: "健康", lev: "把柄" };
  function resText(cost) {
    return Object.keys(cost).map(function (k) {
      const v = cost[k];
      if (k === "fun") return "资金 " + (v < 0 ? "-$" : "$") + (Math.abs(v) / 1000).toFixed(0) + "k";
      return RES_LABEL[k] + " " + v;
    }).join(" · ");
  }
  function costBlock(ch) {
    if (!ch.cost) return null;
    const G = P.G, lack = [];
    for (const k in ch.cost) if (k === "fun" ? G.fun < ch.cost[k] : (G[k] || 0) < ch.cost[k]) lack.push(RES_LABEL[k] || k);
    return lack.length ? ("缺少" + lack.join("、")) : null;
  }
  function payCost(ch, extra) {
    const G = P.G, paid = {};
    [ch.cost, extra].forEach(function (c) {
      if (!c) return;
      for (const k in c) { if (!c[k]) continue; G[k] = (G[k] || 0) - c[k]; paid[k] = (paid[k] || 0) + c[k]; }
    });
    if (G.fun < 0) G.fun = G.fun;              // 允许负债（保留戏剧性）
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

  /* 层级的可读名：优先轨道职位表，退 fallback（"T3" 这种内部代号不该裸奔见玩家） */
  P.tierName = function (t) {
    const G = P.G;
    const table = P.reg.office || {};
    const hit = table[(G ? G.track : "*") + "_" + t] || table["*_" + t];
    const name = hit ? (typeof hit === "string" ? hit : hit.name) : null;
    if (name) return name;
    const fb = P.balance().officeFallback || [];
    return fb[t] || ("层级" + t);
  };

  /* ---------------- 状态词条：名字 + hover 说明（是什么 / 有什么影响） ----------------
   * tagNames 的值支持两种写法（兼容旧内容）：
   *   "救市污点"                                          —— 只有名字（无说明）
   *   { name:"救市污点", desc:"…", effect:"…" }           —— 名字 + 悬停说明
   * desc 解释这个状态是什么；effect 解释它在游戏里产生什么影响（数值/事件倾斜）。 */
  P.tagInfo = function (flag) {
    const raw = (P.balance().tagNames || {})[flag];
    if (raw == null) return { name: flag, desc: "", effect: "" };
    if (typeof raw === "string") return { name: raw, desc: "", effect: "" };
    return { name: raw.name || flag, desc: raw.desc || "", effect: raw.effect || "" };
  };
  P.tagTooltip = function (flag) {
    const t = P.tagInfo(flag);
    const parts = [];
    if (t.desc) parts.push(t.desc);
    if (t.effect) parts.push("（游戏影响：" + t.effect + "）");
    return parts.join(" ");
  };

  /* ---------------- 收益结算：把 effects 翻译成玩家语言 ----------------
   * 数字是给存档看的，这一栏是给玩家看的：声望、钱、人情、派系、状态，
   * 正负分色，一眼看清"这一手你得到了什么、赔了什么"。 */
  function fmtVoterNum(n) {
    const abs = Math.abs(n);
    if (abs >= 10000) return (n / 10000).toFixed(1) + " 万";
    if (abs >= 1000) return (n / 1000).toFixed(1) + " 千";
    return String(n);
  }
  P.gainSummary = function (eff) {
    const P_ = window.POTUS, G = P_.G;
    const out = [];
    if (!eff) return out;
    if (eff.rep != null) out.push({ k: "声望", v: eff.rep, sign: eff.rep });
    if (eff.fun != null) {
      const k = Math.round(eff.fun / 1000);
      out.push({ k: "资金", v: (k >= 0 ? "+$" : "-$") + Math.abs(k) + "k", sign: eff.fun });
    }
    if (eff.funMul != null) {
      const pct = Math.round(eff.funMul * 100);
      const base = (P.G.__stakeBase != null && P.G.__stakeBase > 0) ? P.G.__stakeBase : null;
      const amt = base != null ? Math.round(base * eff.funMul / 1000) : null;
      out.push({
        k: "资金",
        v: (pct >= 0 ? "+" : "") + pct + "%（本金）" + (amt != null ? (amt >= 0 ? " ≈+$" : " ≈-$") + Math.abs(amt) + "k" : ""),
        sign: eff.funMul
      });
    }
    if (eff.fav != null) out.push({ k: "人情", v: eff.fav, sign: eff.fav });
    if (eff.ap != null) out.push({ k: "精力", v: eff.ap, sign: eff.ap });
    if (eff.hp != null) out.push({ k: "健康", v: eff.hp, sign: eff.hp });
    if (eff.lev != null) out.push({ k: "把柄", v: eff.lev, sign: eff.lev });
    if (eff.tier != null && eff.tier !== 0) out.push({ k: "层级", v: (eff.tier > 0 ? "T↑" : "T↓"), sign: eff.tier });
    if (eff.attr) for (const a in eff.attr) out.push({ k: { CHA: "魅力", INT: "智力", CUN: "手腕", INTG: "诚信" }[a] || a, v: eff.attr[a], sign: eff.attr[a] });
    if (eff.fac) for (const f in eff.fac) out.push({ k: P_.factionName(f), v: eff.fac[f], sign: eff.fac[f] });
    if (eff.contact) for (const c in eff.contact) out.push({ k: P_.contactName(c), v: eff.contact[c], sign: eff.contact[c] });
    /* 状态词条：只在 tagNames 里登记过的才翻译（scandal_n 这类内部标记不翻） */
    const tagNames = P_.balance().tagNames || {};
    if (eff.flags) [].concat(eff.flags).forEach(function (f) {
      if (f.indexOf("scandal_") === 0 || f.indexOf("bs_") === 0) return;
      const ti = P.tagInfo(f);
      if (!ti.name || ti.name === f) return;        // 没登记的 key 不显示（宁缺毋滥）
      out.push({ k: "状态", v: ti.name, sign: 1, flag: true, tip: P.tagTooltip(f) });
    });
    if (eff.notFlags) [].concat(eff.notFlags).forEach(function (f) {
      const ti = P.tagInfo(f);
      if (ti.name && ti.name !== f) out.push({ k: "解除", v: ti.name, sign: 1, flag: true, tip: P.tagTooltip(f) });
    });
    if (eff.voters) {
      const VCN = { warm: "好感选民", diehard: "死忠", oppose: "反对者" };
      for (const vk in eff.voters) {
        const n = eff.voters[vk];
        out.push({ k: VCN[vk] || vk, v: (n > 0 ? "+" : "") + fmtVoterNum(n), sign: vk === "oppose" ? -n : n });
      }
    }
    if (eff.fall) out.push({ k: "下野", v: eff.fall >= 2 ? "重挫" : "跌落", sign: -1, flag: true });
    if (eff.hardEnd) out.push({ k: "终局", v: eff.hardEnd === "prison" ? "入狱" : "身败名裂", sign: -1, flag: true });
    return out;
  };
  function gainBoxHTML(eff) {
    const items = P.gainSummary(eff);
    if (!items.length) return "";
    return '<div class="gainbox"><span class="gtag">这一手</span>' +
      items.map(function (x) {
        const cls = x.flag ? "gflag" : (x.sign > 0 ? "good" : x.sign < 0 ? "bad" : "");
        const tip = x.tip ? ' class="' + cls + ' hastip" data-tip="' + String(x.tip).replace(/"/g, "&quot;") + '"' : ' class="' + cls + '"';
        return '<span class="gchip2 ' + (tip ? tip + '"' : cls + '"') + ">" + x.k + " " + (x.v > 0 && !x.flag ? "+" : "") + x.v + "</span>";
      }).join("") + "</div>";
  }

  P.presentEvent = function (ev, slot) {
    P.tickDate();
    const grade = (slot && slot.grade) || P.gradeOf(ev);
    const gdef = P.reg.grade[grade] || {};
    const catName = ev.category ? P.categoryName(ev.category) : "";
    const medName = ev.medium ? [].concat(ev.medium).map(P.mediumName).join(" / ") : "";
    /* 事件链的「前情」：让玩家知道自己接的是哪条线、上一幕是多久以前 */
    let chainHTML = "";
    if (ev.after && ev.after.id) {
      const prev = P.prevEventOf(ev);
      const gap = P.monthsSince(ev.after.id);
      const gapText = gap == null ? "" : (gap <= 0 ? "就在本月" : gap + " 个月前");
      chainHTML = '<div class="chain"><span class="chain-tag">承 前</span>' +
        '<span class="chain-body">' + (prev ? prev.title : ev.after.id) +
        (gapText ? '　·　' + gapText : "") + "</span></div>";
    }
    const box = P.$("#main");
    /* 主次顺序：标题 → 承前 → 正文（主角视角发生了什么）→ 插画 → 背景卡（折叠）→ 选项 */
    box.innerHTML =
      '<div class="news fade"><div class="dateline"><span class="dt">' + P.dateText(ev) + "</span>" +
      (gdef.name ? ' <span class="gchip ' + (gdef.cls || "") + '">' + gdef.name + "</span>" : "") +
      (catName ? ' <span class="cchip">' + catName + "</span>" : "") +
      (medName ? ' <span class="cchip medium">' + medName + "</span>" : "") +
      (ev.type ? " · " + ev.type : "") + "</div>" +
      chainHTML +
      "<h2>" + (ev.title || "") + "</h2>" +
      '<div class="body">' + (ev.body || "") + "</div>" +
      P.artSVG(ev) +
      '</div>' +
      /* 背景卡在事件框下面（中栏底部）：想细看的人展开，不挡任何东西 */
      '<div class="brief-slot">' + P.briefHTML(ev) + "</div>";
    /* v0.5.3 三栏布局：选项进右栏（#actbar），与掷骰/结算/继续按钮同栏 */
    const cbox = document.getElementById("actbar");
    let choicesHost = null;
    if (cbox) {
      choicesHost = document.createElement("div");
      choicesHost.className = "choices act-choices";
      choicesHost.id = "choices";
      cbox.innerHTML = '<div class="acthead">你的选择</div>';
      cbox.appendChild(choicesHost);
    }
    const cTarget = choicesHost || P.$("#choices");
    const chs = ev.choices || [];
    /* 保底机制：如果所有选项都被堵死（没钱 / 没声望 / 没层级），放行一个，
       免得玩家卡在一个点不动的事件上。正常情况下不该触发（校验器强制每个事件
       都有保底选项），这里只是兜底。 */
    const forced = P.fallbackIndex(chs);
    chs.forEach(function (ch, i) {
      const r = P.computeP(ch);
      const blockedReq = reqBlock(ch);
      const blockedCost = costBlock(ch);
      const isForced = i === forced;
      const blocked = isForced ? null : (blockedReq || blockedCost);
      const stakeSpec = P.stakeSpec(ch);
      const btn = document.createElement("button");
      btn.className = "choice" + (isForced ? " forced" : "");
      btn.disabled = !!blocked;
      let hint = "胜算：" + P.fuzzy(r.P) + "（" + Math.round(r.P * 100) + "%）";
      if (stakeSpec) hint += " · 可投入资源";
      btn.innerHTML = ch.text + '<span class="hint">' + hint + "</span>" +
        (ch.cost ? '<span class="costtag">代价：' + resText(ch.cost) + "</span>" : "") +
        (blocked ? '<span class="req">✕ ' + (blockedReq || blockedCost) + "</span>" : "") +
        (isForced ? '<span class="req forced-tag">⚠ 保底选项：' + (blockedCost || blockedReq) + "，硬撑一次（资源会被扣到见底）</span>" : "");
      /* 选项说明：折叠展开（默认收起）—— 把"这条路意味着什么"留给愿意细看的玩家 */
      if (ch.note) {
        const det = document.createElement("details");
        det.className = "chnote";
        det.innerHTML = "<summary>说明</summary><div>" + ch.note + "</div>";
        btn.appendChild(det);
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

  /* ---------------- 资源投注面板（D&D 式加码） ---------------- */
  let _stake = null;

  P.choose = function (ev, ch) {
    if (P.stakeSpec(ch)) { P.openStake(ev, ch); return; }
    P.resolveChoice(ev, ch, null);
  };

  P.openStake = function (ev, ch) {
    _stake = { ev: ev, ch: ch, st: { fun: 0, fav: 0, ap: 0 } };
    const c = P.$("#choices"); if (c) c.style.display = "none";
    P.renderStake();
  };

  P.stakeStep = function (k, d) {
    if (!_stake) return;
    /* 上限由引擎统一算：既看加成上限（cap÷w），也看你手上还剩多少 */
    const max = P.stakeMax(k, _stake.ch);
    _stake.st[k] = P.clamp(_stake.st[k] + d, 0, max);
    P.renderStake();
  };
  P.stakeToggleFav = function () {
    if (!_stake) return;
    if (!_stake.st.fav && P.stakeMax("fav", _stake.ch) < 1) return;   // 没人情就点不动
    _stake.st.fav = _stake.st.fav ? 0 : 1;
    P.renderStake();
  };
  P.stakeCancel = function () {
    const box = P.$("#stake"); if (box) box.remove();
    const c = P.$("#choices"); if (c) c.style.display = "flex";
    _stake = null;
  };
  P.stakeConfirm = function () {
    const s = _stake; if (!s) return;
    const box = P.$("#stake"); if (box) box.remove();
    _stake = null;
    P.resolveChoice(s.ev, s.ch, s.st);
  };

  P.renderStake = function () {
    const s = _stake; if (!s) return;
    const ch = s.ch, st = s.st;
    const spec = P.stakeSpec(ch);
    const info = P.stakeInfo(ch, st);
    const r = P.computeP(ch, info);
    const prev = P.$("#stake"); if (prev) prev.remove();
    const rows = [];
    if (spec.fun) {
      const per = spec.fun.per || 250000, w = (spec.fun.w || 0.04) * 100, cap = (spec.fun.cap || 0.30) * 100;
      const mx = P.stakeMax("fun", ch), atMax = st.fun >= mx;
      const note = mx === 0
        ? "资金不足：每档需 $" + (per / 1000).toFixed(0) + "k，你现在只有 $" + (P.G.fun / 1000).toFixed(0) + "k"
        : (atMax
          ? "已达上限 +" + cap + "%（最多 " + mx + " 档）"
          : "每 $" + (per / 1000).toFixed(0) + "k → +" + w + "%，上限 +" + cap + "%，还可投 " + (mx - st.fun) + " 档（余额 $" + (P.G.fun / 1000).toFixed(0) + "k）");
      rows.push('<div class="stake-row' + (mx === 0 ? " off" : "") + '"><b>资金</b>' +
        '<button class="btn" id="stFunMinus"' + (st.fun <= 0 ? " disabled" : "") + '>−</button>' +
        '<span class="stake-val">$' + (st.fun * per / 1000).toFixed(0) + "k</span>" +
        '<button class="btn" id="stFunPlus"' + (atMax ? " disabled" : "") + '>＋</button>' +
        '<span class="stake-note">' + note + "</span></div>");
    }
    if (spec.ap) {
      const w = (spec.ap.w || 0.03) * 100, cap = (spec.ap.cap || 0.09) * 100;
      const mx = P.stakeMax("ap", ch), atMax = st.ap >= mx;
      const note = mx === 0
        ? "精力已经见底，投不动了"
        : (atMax
          ? "已达上限 +" + cap + "%（最多 " + mx + " 点）"
          : "每 1 点 → +" + w + "%，上限 +" + cap + "%，还可投 " + (mx - st.ap) + " 点（精力 " + P.G.ap + "）");
      rows.push('<div class="stake-row' + (mx === 0 ? " off" : "") + '"><b>精力</b>' +
        '<button class="btn" id="stApMinus"' + (st.ap <= 0 ? " disabled" : "") + '>−</button>' +
        '<span class="stake-val">' + st.ap + "</span>" +
        '<button class="btn" id="stApPlus"' + (atMax ? " disabled" : "") + '>＋</button>' +
        '<span class="stake-note">' + note + "</span></div>");
    }
    if (spec.fav) {
      const canFav = P.stakeMax("fav", ch) >= 1;
      rows.push('<div class="stake-row' + (canFav ? "" : " off") + '"><b>人情</b><label class="stake-check"><input type="checkbox" id="stFav" ' +
        (st.fav ? "checked" : "") + (canFav ? "" : " disabled") + "> 花 1 点，获得<b>重投（取优）</b></label>" +
        '<span class="stake-note">' + (canFav ? "（人情 " + P.G.fav + "）" : "没有人情可以动用") + "</span></div>");
    }
    const bd = r.breakdown.map(function (b) {
      return "<span>" + b.label + " " + (b.pct >= 0 ? "+" : "") + b.pct.toFixed(1) + "</span>";
    }).join("");
    const box = document.createElement("div");
    box.className = "stake"; box.id = "stake";
    box.innerHTML = "<h3>投入资源，提高胜算</h3>" +
      '<div class="stake-note" style="margin:-4px 0 6px;font-size:11.5px;color:var(--muted)">加码只提高这一判定的胜算，不增加事件本身的回报 —— 量力而行。</div>' + rows.join("") +
      '<div class="check-preview">判定目标值 <b>' + r.target + "</b>%　" + bd + "</div>" +
      '<div class="stake-actions"><button class="btn primary" id="stGo">确认判定</button>' +
      '<button class="btn" id="stBack">返回</button></div>';
    P.$("#main").appendChild(box);
    const wire = function (id, fn) { const el = P.$("#" + id); if (el) el.onclick = fn; };
    wire("stFunPlus", function () { P.stakeStep("fun", 1); });
    wire("stFunMinus", function () { P.stakeStep("fun", -1); });
    wire("stApPlus", function () { P.stakeStep("ap", 1); });
    wire("stApMinus", function () { P.stakeStep("ap", -1); });
    wire("stGo", P.stakeConfirm);
    wire("stBack", P.stakeCancel);
    const fav = P.$("#stFav"); if (fav) fav.onchange = P.stakeToggleFav;
  };

  /* funMul 的本金基数（investment base）：
     结算前写入，applyEffects 用，结算完清零。 */
  function G_stakeBase(v) { P.G.__stakeBase = v; }

  /* 状态面板刷新：v0.5.3 三栏布局后 .panel 在左栏（.col-left）里，
     这里统一替换它的 innerHTML 而不是 outerHTML（保持左栏结构不动）。 */
  P.refreshPanel = function () {
    const col = document.querySelector(".col-left");
    if (col) col.innerHTML = P.statPanel();
    else {
      P.refreshPanel();          // 旧布局兼容（标题/建角等无三栏的页面）
    }
  };

  /* 右栏（#actbar）的两个 HTML 快捷操作 */
  function actClear() { const bar = document.getElementById("actbar"); if (bar) bar.innerHTML = ""; }
  function actAppend(html) { const bar = document.getElementById("actbar"); if (bar) { const d = document.createElement("div"); d.innerHTML = html; while (d.firstChild) bar.appendChild(d.firstChild); } }

  /* 操作元素（选项/掷骰/结算/继续按钮）的归宿：右栏 #actbar。
     没有右栏的页面（标题/建角/年终）退回 #main 尾部——单栏兼容。 */
  function actInsert(el) {
    const bar = document.getElementById("actbar");
    if (bar) { bar.appendChild(el); return; }
    const main = P.$("#main");
    if (main) main.appendChild(el);
  }
  /* 旧名兼容（投注面板等历史调用点） */
  function mainInsert(el) { actInsert(el); }

  /* ---------------- 判定与结算 ---------------- */
  P.resolveChoice = function (ev, ch, st) {
    const info = st ? P.stakeInfo(ch, st) : null;
    const r = P.computeP(ch, info);
    const res = P.rollTierAdv(r.P, !!(info && info.reroll));
    const out = ch.outcomes[res.tier] || ch.outcomes.ok || {};
    /* 投资本金基数：选项 cost + 投注的资金 —— funMul 按它算回报（不是总余额） */
    G_stakeBase((ch.cost && ch.cost.fun ? ch.cost.fun : 0) + (info && info.cost ? (info.cost.fun || 0) : 0));
    const paid = payCost(ch, info && info.cost);
    const cbox = P.$("#choices"); if (cbox) cbox.style.display = "none";
    const main = P.$("#main");
    const dice = document.createElement("div"); dice.className = "dicebar";
    dice.innerHTML = '<span class="db-tag">掷骰</span><b>🎲</b>';
    mainInsert(dice);
    let n = 0;
    const iv = setInterval(function () {
      const db = dice.querySelector("b"); if (db) db.textContent = P.rint(1, 100);
      if (++n <= 10) return;
      clearInterval(iv);
      const db2 = dice.querySelector("b"); if (db2) db2.textContent = res.roll;
      P.applyEffects(out.effects);
      P.G.__stakeBase = 0;                       // 用完即清：后续事件不再吃旧本金
      const label = P.TIER_LABEL[res.tier] || res.tier;
      // 主次分明：结果正文（叙事）→ 收益结算（对账）→ 判定明细（折叠，给较真的人）
      const div = document.createElement("div");
      div.className = "result " + res.tier + " fade";
      div.innerHTML = "<b>" + label + "</b><br>" + (out.body || "");
      mainInsert(div);
      const gainHTML = gainBoxHTML(out.effects);
      if (gainHTML) {
        const gb = document.createElement("div");
        gb.className = "fade";
        gb.innerHTML = gainHTML;
        mainInsert(gb);
      }
      // D&D 式判定明细（默认收起）
      const check = document.createElement("details");
      check.className = "check fade";
      const rollTxt = res.rerolled ? ("d100 = <b>" + res.roll + "</b>（重投 " + res.rolls.join(" / ") + " 取优）") : ("d100 = <b>" + res.roll + "</b>");
      check.innerHTML = "<summary>判定明细　d100 = <b>" + res.roll + "</b> ／ 目标 <b>" + r.target + "</b></summary>" +
        '<div class="check-line">' + rollTxt + ' ／ 目标 <b>' + r.target + "</b></div>" +
        '<div class="mods">' + r.breakdown.map(function (b) {
          return "<span>" + b.label + " " + (b.pct >= 0 ? "+" : "") + b.pct.toFixed(1) + "</span>";
        }).join("") + "</div>" +
        (Object.keys(paid).length ? '<div class="paid">已消耗：' + resText(paid) + "</div>" : "");
      mainInsert(check);
      const eff = out.effects || {};
      const newScandal = (eff.flags || []).some(function (f) { return f.indexOf("scandal_") === 0; });
      if (newScandal || out.news) {
        const headline = P.makeNews(out.news || ("陷入争议：" + String(out.body || "").slice(0, 24)));
        P.G.history.push(headline);
        (P.G.yearHeads = P.G.yearHeads || []).push(headline);
        P.pushLog("头条：" + headline);
        const nv = document.createElement("div"); nv.className = "news fade";
        nv.innerHTML = '<div class="dateline">突发</div><div class="body">' + headline + "</div>";
        mainInsert(nv);
      }
      P.pushLog("[" + (ev.title || "") + "] " + label + "（目标" + r.target + "，d100=" + res.roll + "）");
      const btn = document.createElement("button");
      btn.className = "btn primary"; btn.style.marginTop = "10px"; btn.textContent = "继续 →";
      btn.onclick = function () { P.afterEvent(); };
      mainInsert(btn);
      P.refreshPanel();
      P.autosave();
    }, 45);
  };

  P.afterEvent = function () {
    const b = P.balance(), G = P.G;
    if (G.hp <= 0) return P.ending("death_health");
    /* 硬 BE：事件效果键 hardEnd 已写入 pendingHardEnd（入狱/身败名裂）—— 政治生命就此终结 */
    if (G.pendingHardEnd) {
      const why = G.pendingHardEnd;
      G.pendingHardEnd = null;
      return P.ending(why);
    }
    if (P.hasFlag("prison") || P.hasFlag("scandal_5")) return P.ending("prison");
    if (G.age >= b.retireAge) return P.ending("retire");
    if (G.tier >= b.tierMax && !P.hasFlag("president_done")) { P.addFlag("president_done"); return P.ending("president"); }
    /* 软 BE「下野」：fall 效果已把层级/声望/标记处理完。这里单独出一页交代卡，
       玩家点「继续」才推进 —— 不然 nextSlot 会立刻把这一页冲掉。游戏继续，东山再起留给后面。 */
    if (G.fallenThisTurn) {
      G.fallenThisTurn = false;
      const main = P.$("#main");
      if (main) {
        const fb = document.createElement("div");
        fb.className = "bs fade";
        fb.innerHTML = '<div class="dateline" style="color:#7a1f1f">下野</div><h2>你从台上走了下来</h2>' +
          '<div class="body">办公室的灯还亮着，但已经不是为你亮的了。你交出钥匙、名单和那些「回头再说」的承诺，' +
          "从台阶上退了下来。支持你的人散了一半，记得你的人却一个没少。\n\n" +
          "这不是结局。这个国家见过太多从谷底爬回来的人 —— 只要政治生命还在，台阶就还在。</div>";
        mainInsert(fb);
        const cbtn = document.createElement("button");
        cbtn.className = "btn primary"; cbtn.style.marginTop = "10px"; cbtn.textContent = "继续 →";
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
    if (levGone) P.pushLog("时效：有 " + levGone + " 份把柄失去了价值（当事人下台或事情过去了）。");
    P.pushLog("年度结算：" + G.age + "岁，声望" + G.rep + "，资金$" + (G.fun / 1000).toFixed(0) + "k，健康" + G.hp + "。");

    let bsHTML = "";
    if (P.chance(b.blackswanChance)) {
      const list = P.reg.blackswan[G.era] || [];
      if (list.length) {
        const bs = P.pick(list);
        P.addFlag("bs_" + (bs.id || bs.title));
        P.applyEffects(bs.effects);
        bsHTML = '<div class="bs"><div class="dateline" style="color:#9c2b2b">黑天鹅</div>' +
          "<h2>" + bs.title + '</h2><div class="body">' + bs.body + "</div></div>";
        P.pushLog("黑天鹅：" + bs.title);
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
      '<div class="dateline"><span class="dt">' + G.year + " 年</span> · 年度结算</div>" +
      "<h2>" + G.year + " 年走完了</h2>" +
      tales +
      '<div class="yearbar">' +
      "<div>" + G.age + " 岁　·　" + P.officeName() + "（在位 " + P.monthsAtTier() + " 个月）　·　" +
      (sc ? "丑闻 Lv" + sc : "无丑闻") + "　·　平静的月份 " + quiet + " 个</div>" +
      "<div>声望 " + G.rep + "　·　资金 $" + (G.fun / 1000).toFixed(0) + "k　·　健康 " + G.hp + "　·　精力 " + G.ap +
      "　·　把柄 " + (G.lev || 0) + " 份</div>" +
      "<div>人脉 " + P.myContacts().length + " 人" +
      (G.state ? "　·　" + P.stateName(G.state) : "") +
      (levGone ? "　·　" + levGone + " 份把柄在本年失效" : "") + "</div>" +
      "</div>" +
      (tailVig.html || "") +
      (heads ? '<h3 class="sechead">这一年的头条</h3><ul class="heads">' + heads + "</ul>" : "") +
      bsHTML +
      '<button class="btn primary" style="margin-top:10px" onclick="POTUS.nextYear()">进入 ' + (G.year + 1) + " 年 →</button></div>";
    P.tickDate();
    P.refreshPanel();
  };

  P.nextYear = function () { P.G.year++; P.startYear(); };

  /* ---------------- 职位卡：我现在是谁（状态面板顶部的一块） ----------------
   * 参考真实政治人物的履历表述：职务 → 选区/机构 → 基本盘 → 光谱定位。
   * 机制在引擎，名词表在内容（reg.office：按 track×tier 查，miss 就用 officeFallback）。
   * 铁杆选民 = 声望 × 基层派系好感 的量纲换算（千人）；光谱 = 党派 + 姿态 + 关键标记。 */
  P.officeName = function () {
    const G = P.G;
    const table = P.reg.office || {};
    const key = (G.track || "*") + "_" + G.tier;
    const hit = table[key] || table["*_" + G.tier];
    if (hit) return typeof hit === "string" ? hit : hit.name;
    return (P.reg.officeFallback || ["无名之辈", "圈内人", "地方民选官员", "州级人物", "全国性人物", "权力顶点"])[G.tier] ||
      ("T" + G.tier);
  };
  /* ---------------- 晋升进度条（v0.5.2 用户设计） ----------------
   * 进度不是"经验值"，是"你准备好了吗"的综合读数：
   *   在位时长（熬）40% + 声望 25% + 选民底气 20% + 组织关系 15%
   * 到 60 就进入"有机会"区间——但晋升仍要等一个位置空出来（prog_* 事件），
   * 进度只决定机会来的时候你抓不抓得住。满了不晋升也正常：位置就那么多。 */
  P.promotionProgress = function () {
    const G = P.G, b = P.balance();
    if (G.tier >= b.tierMax) return { pct: 100, ready: true, note: "已在顶点" };
    const needTenure = 36;                                  /* 三年视为"熬够了"（满分的在位分） */
    const tenureScore = Math.min(1, P.monthsAtTier() / needTenure);
    const repScore = Math.min(1, G.rep / 60);
    const es = P.electionStrength();
    const voterScore = Math.min(1, es.pct / 45);
    const org = Math.max(0, Math.min(100, (G.faction ? (G.faction.establishment || 0) : 0) + 30)) / 100;
    const pct = Math.round((tenureScore * 0.40 + repScore * 0.25 + voterScore * 0.20 + org * 0.15) * 100);
    const ready = pct >= 60;
    const nextName = P.tierName(G.tier + 1);
    const note = ready
      ? "机会区间——在等一个空缺的位置（" + nextName + "）"
      : "还没到时候（下一级：" + nextName + "）";
    return { pct: pct, ready: ready, note: note, nextName: nextName };
  };

  P.officeCard = function () {
    const G = P.G;
    /* 选民池（v0.5.2）：三档具体人数 + 选区规模 + 选举强度——
       warm 有好感 / diehard 死忠 / oppose 反对，选区按层级取规模表。 */
    const vp = P.voterPools();
    const es = P.electionStrength();
    const fmtNum = function (n) {
      if (n >= 100000000) return (n / 100000000).toFixed(1) + " 亿";
      if (n >= 10000) return (n / 10000).toFixed(n >= 100000 ? 0 : 1) + " 万";
      if (n >= 1000) return (n / 1000).toFixed(1) + " 千";
      return String(n);
    };
    const diehardTxt = fmtNum(vp.diehard) + " 死忠 · " + fmtNum(vp.warm) + " 有好感 · " + fmtNum(vp.oppose) + " 反对";
    /* 政治光谱：党派打底，姿态偏移，关键标记再拉 */
    const partyName = (P.reg.party[G.party] || {}).name || "无党派";
    let wing = G.stance === "outsider" ? "（反建制）" : "";
    let spectrum = partyName + wing;
    if (P.hasFlag("wave_tea")) spectrum += "·茶党底色";
    if (P.hasFlag("wave_occupy")) spectrum += "·占领底色";
    if (P.hasFlag("wave_antiwar")) spectrum += "·反战印记";
    if (P.hasFlag("cross_insider")) spectrum += "·机器的人";
    if (P.hasFlag("fallen")) spectrum += "·下野待起";
    const stateTxt = G.state ? P.stateName(G.state) : "";
    const tenure = P.monthsAtTier();
    const tenureTxt = tenure >= 12 ? "（在位 " + Math.floor(tenure / 12) + " 年" + (tenure % 12 ? "余" : "") + "）" : (tenure ? "（在位 " + tenure + " 个月）" : "");
    const lines = [
      "<b>" + P.officeName() + "</b>" + tenureTxt,
      (stateTxt ? stateTxt + " · " : "") + "选区规模 " + fmtNum(es.size) + " 人",
      "选民：死忠 " + fmtNum(vp.diehard) + " · 有好感 " + fmtNum(vp.warm) + " · 反对 " + fmtNum(vp.oppose) +
      ' <span class="muted" title="死忠=几乎必到的票；有好感=看你表现的可能票；反对=对手的票。选举判定主要吃死忠，其次好感。">（选举底气 ' + es.pct + "/100）</span>",
      "政治光谱：" + spectrum
    ];
    /* 晋升进度条：到 60 进"机会区间"（位置仍要等事件空缺） */
    const prog = P.promotionProgress();
    const progHTML = G.tier < P.balance().tierMax
      ? '<div class="progrow' + (prog.ready ? " ready" : "") + '">' +
        '<div class="progline"><span class="prog-label">晋升' + (prog.ready ? "（机会区间）" : "") + '</span>' +
        '<div class="progbar"><i style="width:' + prog.pct + '%"></i><em style="left:60%"></em></div>' +
        '<span class="prog-pct">' + prog.pct + "</span></div>" +
        '<div class="prog-note" title="在位时长40%＋声望25%＋选民底气20%＋组织关系15%。到60进入机会区间——但晋升仍要等一个位置空出来（对应事件）。">' + prog.note + "</div></div>"
      : "";
    return '<div class="officecard">' + lines.filter(Boolean).map(function (l) { return "<div>" + l + "</div>"; }).join("") + progHTML + "</div>";
  };

  /* ---------------- 状态面板 / 工具条 ---------------- */
  P.statPanel = function () {
    const G = P.G, a = G.attr;
    const bar = function (v) { return '<div class="bar"><i style="width:' + v + '%"></i></div>'; };
    let fac = "";
    for (const k in P.reg.faction) {
      const v = G.faction[k] || 0;
      if (v !== 0) fac += '<div class="fac"><span>' + P.factionName(k) + "</span><span>" + (v > 0 ? "+" : "") + v + "</span></div>";
    }
    const tagNames = P.balance().tagNames || {};
    const tags = G.flags.filter(function (f) {
      if (f.indexOf("scandal_") === 0 || f.indexOf("bs_") === 0) return false;
      const ti = P.tagInfo(f);
      return ti.name && ti.name !== f;             // 没登记词条的 flag 不显示原文，宁缺毋滥
    })
      .slice(0, 8).map(function (f) {
        const tip = P.tagTooltip(f);
        return '<span class="tag hastip"' + (tip ? ' data-tip="' + String(tip).replace(/"/g, "&quot;") + '"' : "") + ">" +
          P.tagInfo(f).name + "</span>";
      }).join("");
    const sc = P.scandalLevel();
    /* 人脉：只显示最"深"的几位，避免二十年的交情把面板撑成通讯录 */
    const cts = P.myContacts().slice(0, 6);
    const ctHTML = cts.map(function (c) {
      return '<div class="ct"><span>' + c.name + (c.role ? '<i>' + c.role + "</i>" : "") + "</span>" +
        '<b class="' + (c.favor >= 30 ? "good" : c.favor <= -20 ? "bad" : "") + '">' + (c.favor > 0 ? "+" : "") + c.favor + "</b></div>";
    }).join("");
    const tenure = P.monthsAtTier();
    return '<div class="panel"><h3>状态 · ' + G.name + "</h3>" +
      '<div class="nowdate">' + P.dateText() + "　·　" + (G.age) + " 岁" +
      (G.state ? "　·　" + P.stateName(G.state) : "") + "</div>" +
      P.officeCard() +
      "<div>魅力 " + a.CHA + "</div>" + bar(a.CHA) +
      "<div>智力 " + a.INT + "</div>" + bar(a.INT) +
      "<div>手腕 " + a.CUN + "</div>" + bar(a.CUN) + "<hr>" +
      /* 公信力（INTG）不是"能力"而是"社会对你的信任"——和声望放一行。
         它不设门槛挡选项，只在需要公信的判定里加分（吹哨/证词/改革）。 */
      '<div title="公信力：公众对你的信任。不决定你能选什么，决定「你出面说话」的分量——吹哨、作证、推动改革这类判定的胜算。它只能被你的选择改变。">声望 ' + G.rep + ' · <b>公信力 ' + a.INTG + "</b> · 资金 $" + (G.fun / 1000).toFixed(0) + "k</div>" +
      "<div>健康 " + G.hp + " · 精力 " + G.ap + " · 人情 " + G.fav + "</div>" +
      "<div>" + P.officeName() + ' <span class="muted" style="font-size:11px">（T' + G.tier + "）</span> · 在位 " + tenure + " 个月</div>" +
      '<div class="levrow' + (G.lev ? " has" : "") + '">把柄 ' + (G.lev || 0) + " 份" +
      ((G.lev || 0) > 0 ? '<span class="muted">（攥着别人的秘密，也用掉得掉）</span>' : "") + "</div>" +
      "<div>" + (sc ? "丑闻 Lv" + sc : "无丑闻") + "</div>" +
      '<div style="margin-top:6px">' + tags + "</div><hr><h3>派系好感</h3>" + (fac || '<div class="muted">—</div>') +
      "<h3>人脉</h3>" + (ctHTML || '<div class="muted">—</div>') +
      '<div class="log">' + G.log.map(function (x) { return "<div>" + x + "</div>"; }).join("") + "</div></div>";
  };

  P.toolbarHTML = function () {
    /* AI 按钮：没接大模型时点开是设置面板，接上了就直接进设置（可随时关掉）。
       它永远不挡路——游戏本身不需要网络。 */
    const aiOn = (P.llm && P.llm.ready());
    return '<div class="toolbar">' +
      '<button class="btn" onclick="POTUS.quickSave()">保存</button>' +
      '<button class="btn" onclick="POTUS.openLoad()">读取</button>' +
      '<button class="btn" onclick="POTUS.exportSave()">导出</button>' +
      '<button class="btn" onclick="POTUS.importSave()">导入</button>' +
      (P.llm ? '<button class="btn ai' + (aiOn ? " on" : "") + '" onclick="POTUS.llmOpenSettings()">✨ AI' +
        (aiOn ? " 已接" : " 未接") + "</button>" : "") +
      '<button class="btn" onclick="if(confirm(\'确定放弃本局？\'))POTUS.renderTitle()">退出</button>' +
      '<span class="muted" style="align-self:center;font-size:12px">' + P.G.name + " · " + P.G.year + "</span></div>";
  };
  /* 工具条上的 AI 入口（llm.js 没加载也不会报错） */
  P.llmOpenSettings = function () {
    if (P.llm && P.llm.openSettings) { P.llm.openSettings(); return; }
    alert("这一版没有加载大模型适配层（engine/llm.js）。");
  };
  /* 设置面板里改完配置后，把工具条上那个按钮的状态同步过来（否则要等下一次重建工具条） */
  P.refreshAIBtn = function () {
    const el = document.querySelector(".toolbar .btn.ai");
    if (!el || !P.llm) return;
    const on = P.llm.ready();
    el.textContent = "✨ AI" + (on ? " 已接" : " 未接");
    el.className = "btn ai" + (on ? " on" : "");
  };

  /* ---------------- 启动 ---------------- */
  P.boot = function () {
    if (!Object.keys(P.reg.era).length) {
      P.app().innerHTML = '<div class="center" style="padding:40px"><h2>未加载任何内容包</h2><p class="muted">请在 content/ 下至少提供一个时代（era）内容包，并在 index.html 的清单中引入。</p></div>';
      return;
    }
    P.renderTitle();
  };
})();
