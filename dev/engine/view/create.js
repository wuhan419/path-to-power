/* ============================================================================
 * POTUS ENGINE · view/create.js
 * 建角屏：时代 / 出身 / 州 / 天赋 / 起点 / 党派 / 姿态 选择，
 * 定命一掷（四属性掷骰 + 自由点 + VIP 码），确认开局。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

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
      score: 0, flags: [], history: [], log: [],
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
})();
