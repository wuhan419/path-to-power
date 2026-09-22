/* ============================================================================
 * POTUS ENGINE · view/create.js
 * 建角屏：时代 / 出身 / 州 / 天赋 / 起点 / 党派 / 姿态 选择，
 * 定命一掷（四属性掷骰 + 自由点 + VIP 码），确认开局。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* ---------------- 建角（demo 极简版） ----------------
   * 用户定的快速开局：时代锁死 1980，玩家只选「难度 + 姓名」。
   *   · 难度 = 出身 + 初始资源（直接吃 10-characters.js 的 origin 资源梯度）
   *   · 其余轴（起点=insider、党派/州/天赋）代码自动填或随机，玩家不碰
   *   · 姓名留空 → 默认「汤米」
   * 老的完整建角（八选 + 掷骰 + VIP）函数都还在本文件里，只是不再被 renderCreate 调用，便于回退。 */
  const DEMO_ERA = "1980_REAGAN";
  /* 五档难度：出身（吃 10-characters.js 的资源梯度）+ bonus（在出身之上再叠一笔开局增量）。
   * bonus 走 applyEffects，支持的键与事件效果一致：fun / rep / fav / lev / fac / attr。
   *   —— 精力(ap)、健康(hp) 已在 v0.9 退役，这里不再出现。
   * 由易到难：传奇 → 简单 → 普通 → 困难 → 炼狱。 */
  const DIFFS = {
    legendary: { label: "传奇", origin: "dynasty", note: "政治世家中的世家 · 开局资金 $3.0M · 声望 +15、人情 +6、天赋全属性 +5 —— 含着金汤匙落地，一路都有人铺",
      bonus: { fun: 1800000, rep: 7, fav: 4, fac: { establishment: 10 }, attr: { CHA: 5, INT: 5, CUN: 5, INTG: 5 } } },
    easy:   { label: "简单", origin: "dynasty", note: "政治世家 · 开局资金 $1.2M · 建制人脉 +30、声望 +8 —— 有人替你开好路" },
    normal: { label: "普通", origin: "elite",   note: "商学院／法学院精英 · 开局资金 $400k · 智力 +15，但基层不信任你" },
    hard:   { label: "困难", origin: "immigrant", note: "移民二代 · 白手起家（资金 0）· 基层 +20 但建制 -20，全凭一股韧劲往上爬" },
    brutal: { label: "炼狱", origin: "labor",   note: "蓝领工人 · 家无余财 $0 · 只有工会与基层，且起步声望更低、建制更冷 —— 真正的从零开始",
      bonus: { rep: -6, fav: -1, fac: { establishment: -10 } } }
  };
  function randKey(map) { const ks = Object.keys(map); return ks[Math.floor(Math.random() * ks.length)]; }
  /* 给四属性各掷一把（35-55），自动开局用，不再让玩家手动洒自由点 */
  function autoRoll() {
    const r = (P.balance() && P.balance().rollAttrs) || {};
    const lo = r.min == null ? 35 : r.min, hi = r.max == null ? 55 : r.max;
    return { CHA: P.rint(lo, hi), INT: P.rint(lo, hi), CUN: P.rint(lo, hi), INTG: P.rint(lo, hi) };
  }
  function fillDefaults(C) {
    C.era = DEMO_ERA;
    C.entry = "insider";                    // 从志愿者/助理做起，tier0 —— 契合晋升阶梯的第一格
    C.stance = "establishment";
    C.party = P.chance(0.5) ? "D" : "R";    // 随机党派，给重复开局留点变化
    C.state = randKey(P.reg.state);
    C.talent = randKey(P.reg.talent);
    C.rolled = autoRoll(); C.spent = {}; C.rerolled = {}; C.freeExtra = 0;
  }
  P.startCreate = function () {
    P.SCREEN = "create";
    P.CSEL = { name: "", difficulty: "normal" };
    const C = P.CSEL;
    C.origin = DIFFS[C.difficulty].origin;
    fillDefaults(C);
    P.renderCreate();
  };
  /* 选难度：只换出身(资源梯度)，不重掷其它轴，避免点一下全屏乱闪 */
  P.pickDifficulty = function (id) {
    if (!DIFFS[id]) return;
    const C = P.CSEL;
    C.difficulty = id; C.origin = DIFFS[id].origin;
    P.renderCreate();
  };
  /* 兼容：老代码/事件仍可能调 pickCreate */
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
    let h = '<h3 style="margin:14px 0 4px">选择难度（＝你的出身与初始资源）</h3>';
    for (const id in DIFFS) {
      const d = DIFFS[id], sel = C.difficulty === id ? " sel" : "";
      h += '<div class="opt' + sel + '" onclick="POTUS.pickDifficulty(\'' + id + '\')"><b>' +
        d.label + "</b><small>" + d.note + "</small></div>";
    }
    const oInfo = P.reg.origin[C.origin] || {};
    P.app().innerHTML =
      '<div class="create"><div class="masthead"><div class="title">权力之路 · 快速开局</div>' +
      '<div class="meta">一个美国小伙的从政之路</div></div>' +
      '<p class="hintline" style="margin:8px 0 2px">' +
      '你只需要挑一个<b>难度</b>、给个<b>名字</b>，就能从社区里那个啥都没有的年轻人开始，一步一步往上爬。</p>' +
      h +
      '<h3 style="margin:14px 0 4px">姓名（留空默认叫「汤米」）</h3>' +
      '<input type="text" id="pname" placeholder="不填就叫汤米" value="' + (C.name || "") + '" style="width:100%">' +
      '<div style="margin-top:16px" class="center">' +
      '<button class="btn primary" onclick="POTUS.confirmCreate()">开始游戏 →</button> ' +
      '<button class="btn" onclick="POTUS.renderTitle()">返回</button></div>' +
      '<p class="hintline">难度 <b>' + (C.difficulty ? DIFFS[C.difficulty].label : "—") + "</b>" +
      "　出身 <b>" + (oInfo.name || "—") + "</b>" +
      "　起点 <b>直接入行（从志愿者做起）</b>。开局年份、党派、天赋等由系统自动定，游戏里可再切换。</p></div>";
    const inp = P.$("#pname");
    if (inp) inp.oninput = function (e) { P.CSEL.name = e.target.value; };
  };

  P.confirmCreate = function () {
    const C = P.CSEL, b = P.balance();
    const name = (C.name || "汤米").trim() || "汤米";
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
      /* 竞选链：当前竞选 + 本局打过的竞选 + 败选重开冷却。*/
      campaign: null, campaignLog: [], campaignCool: 0,
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
    /* 难度资源梯度：在出身/起点/州的效果之上，再叠一档难度增量（可正可负） */
    P.applyEffects((DIFFS[C.difficulty] || {}).bonus);
    P.pushLog("开局：" + name + "，" + era.name + "，" + (P.reg.origin[C.origin] || {}).name + "出身，" +
      (C.state ? P.stateName(C.state) + "，" : "") +
      (P.reg.entry[C.entry] || {}).name + "，" + (P.reg.party[C.party] || {}).name + "/" + (P.reg.stance[C.stance] || {}).name + "。");
    document.body.className = "era-" + C.era;
    P.startYear();
  };
})();
