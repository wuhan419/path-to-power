/* ============================================================================
 * POTUS ENGINE · view/create.js
 * 建角屏：三步向导 —— ① 难度 + 姓名 ② 天赋抽卡（含周目抬头与作弊码入口）③ 自由点分配。
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
  /* demo 主角的家乡锚点：铁锈带 · 摇摆州 · 俄亥俄（扬斯敦）。为什么是它 ——
   *   · 摇摆州：每一次大选两党都得来这里敲门，你站在聚光灯底下（任何层级都能撞上全国叙事）；
   *   · 铁锈带：去工业化 / 工会 / 汽车 / 钢铁 / 贸易协定这些时代主线全砸在自家门口，
   *     从街头发传单到国会投票，历史一路都能顺着这条街找上你。
   * 于是主角不必身居高位也天然"在场"。州定义与市 / 选区见 content/12-states.js。 */
  const DEMO_HOME_STATE = "OH";
  /* 五档难度：出身（吃 10-characters.js 的派系/声望梯度）+ bonus（少量非资金增量）。
   * v0.12 #20 起，难度不再发开局资金——钱全搬进天赋卡池（见 15-cards.js），
   *   难度的真正区别是【能选几张卡】（cardPickCount：炼狱1 / 困难2 / 普通3 / 简单4 / 传奇5）。
   * bonus 走 applyEffects，支持的键与事件效果一致：rep / fav / fac
   *   —— #37② 起 attr 与 fun 都退出了难度加成：属性只能由【自由点 + 天赋卡】决定，
   *      否则"开局四维"里混着一块玩家看不见也点不到的地（传奇那 4×+5 就是这块）。
   *   —— 精力(ap)、健康(hp) 已在 v0.9 退役，这里不再出现。
   * 由易到难：传奇 → 简单 → 普通 → 困难 → 炼狱。
   * 注意：label/note 是加载期立即求值的中文原文（此时 boot 还没套用英文覆盖层），
   * 所以取用点一律走 diffLabel()/diffNote() 现取现翻，key = ui.create.diff.<id>.label/note。 */
  const DIFFS = {
    legendary: { label: "传奇", origin: "dynasty", note: "政治世家 · 可选 5 张天赋卡 · 声望 +12、人情 +4、建制 +20、商业 +10 —— 底子最厚，还能挑最多牌",
      /* #37②：原本这里挂着一份「全属性 +5」——四项合计 +20，等于白送两个自由点，
         却不在向导第 3 步的预览里（用户把它记成了"四年涨了 35 智力"）。属性一律收回，
         难度的补偿改走非属性门（声望/人情/派系）。 */
      bonus: { rep: 12, fav: 4, fac: { establishment: 20, commercial: 10 } } },
    easy:   { label: "简单", origin: "dynasty", note: "政治世家 · 可选 4 张天赋卡 · 建制人脉 +30、声望 +8 —— 有人替你开好路" },
    normal: { label: "普通", origin: "elite",   note: "商学院／法学院精英 · 可选 3 张天赋卡 · 商业 +40、人情 +2，但基层不信任你" },
    hard:   { label: "困难", origin: "immigrant", note: "移民二代 · 可选 2 张天赋卡 · 基层 +20 但建制 -20，全凭一股韧劲往上爬" },
    brutal: { label: "炼狱", origin: "labor",   note: "蓝领工人 · 只能选 1 张天赋卡 · 只有工会与基层，起步声望更低、建制更冷 —— 真正的从零开始",
      bonus: { rep: -6, fav: -1, fac: { establishment: -10 } } }
  };
  P.DIFFS = DIFFS;      /* #37②：validate 要逐档扫 bonus 里有没有偷偷发属性 */
  function diffLabel(id) { const d = DIFFS[id]; return d ? P.t("ui.create.diff." + id + ".label", d.label) : "—"; }
  function diffNote(id) { const d = DIFFS[id]; return d ? P.t("ui.create.diff." + id + ".note", d.note) : ""; }
  function randKey(map) { const ks = Object.keys(map); return ks[Math.floor(Math.random() * ks.length)]; }
  /* 建角可分配的四格（v0.12 #20：定命一掷已删，属性吃 startAttr 打底 + 自由点分配）。
   * 前三个是属性（1 点 = freeAttrPerPoint 属性点）；FUN「金钱」不是属性，
   * 而是把点折成开局资金（1 点 = freeFunPerPoint 美元）——属性封顶后多出来的点自然落这里。
   * 诚信 INTG 不在其中：它只能靠游戏内选择后天涨跌（内容里 239 处判定权重照常生效）。 */
  const ATTR_TARG = ["CHA", "INT", "CUN"];           // 吃属性点、受单维软上限约束
  const ALLOC_TARG = ["CHA", "INT", "CUN", "FUN"];   // 四个分配去处（FUN=金钱，不受 cap）
  /* 属性硬顶：三围从 startAttr 打底、1 点 = +10，能一路点到 100（旧口径 99 已放宽到满值）。 */
  const ATTR_HARD_MAX = 100;
  /* 家乡标签：把州定义里的 city / district 拼成一句人话（扬斯敦 · 俄亥俄 · 第 17 选区）。
     缺市/选区就退回州名，保证任何州都能显示；与 engine/flavor.js 的 {HOME}/{CITY}/{DISTRICT} 同源。 */
  function homeLabel(sid) {
    const d = (P.stateDef && P.stateDef(sid)) || {};
    const st = d.name || sid || "";
    const parts = [];
    if (d.city) parts.push(d.city);
    if (st) parts.push(st);
    if (d.district) parts.push(d.district);
    return parts.join(" · ") || st;
  }
  function fillDefaults(C) {
    C.era = DEMO_ERA;
    C.entry = "insider";                    // 从志愿者/助理做起，tier0 —— 契合晋升阶梯的第一格
    C.stance = "establishment";
    C.party = P.chance(0.5) ? "D" : "R";    // 随机党派，给重复开局留点变化
    /* 家乡固定成铁锈带俄亥俄：让 demo 主角无论什么层级都更容易卷入 1980—2020 的历史大事件
       （州若被内容方删掉则退回随机，绝不卡死开局）。 */
    C.state = P.reg.state[DEMO_HOME_STATE] ? DEMO_HOME_STATE : randKey(P.reg.state);
    C.talent = randKey(P.reg.talent);
    /* 自由点分配（定命一掷已删）：spent 记四格各洒了几点。
       #31：作弊码兑的是【周目】—— cheatLoops 只抬本次建角的口径（自由点额度 + 高稀有卡概率），
       它活在 CSEL 里、不进 localStorage，所以兑来的周目不会滚进真实的周目账本。
       rerollsUsed 记本局用掉几次"换一批"（配额在 balance.gacha.rerolls）。 */
    C.spent = { CHA: 0, INT: 0, CUN: 0, FUN: 0 };
    C.cheatLoops = 0;
    C.rerollsUsed = 0;
    C.cheatInput = ""; C.cheatMsg = "";      // 作弊码输入框：未提交的内容 + 上一次的兑换反馈
    /* v0.12 #20：开局抽好一批天赋卡呈现（换难度不重掷，"换一批"按钮才重掷） */
    C.offer = P.gachaCfg().enabled ? P.rollCardOffer() : [];
    C.picks = [];
  }
  P.startCreate = function () {
    P.SCREEN = "create";
    P.CSEL = { name: "", difficulty: "normal", step: 1 };
    const C = P.CSEL;
    C.origin = DIFFS[C.difficulty].origin;
    fillDefaults(C);
    C.step = 1;                              // fillDefaults 之外再钉一次：每次进建角都从第 1 步开始
    installCheatListener();                  // 作弊码：连打键盘这条老路保留（输入框是明牌主路）
    P.renderCreate();
  };
  /* 选难度：只换出身 + 收敛可选卡数，不重掷牌面（避免点一下全屏乱闪、也不坑掉已抽到的好牌） */
  P.pickDifficulty = function (id) {
    if (!DIFFS[id]) return;
    const C = P.CSEL;
    C.difficulty = id; C.origin = DIFFS[id].origin;
    const need = P.cardPickCount(id);
    if (C.picks && C.picks.length > need) C.picks = C.picks.slice(0, need);   // 难度调低 → 多选的卡退回牌面
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

  /* ---------- 自由点分配（定命一掷已删：不再有掷骰 / 重掷） ----------
   * P.spendPoint(k, d)：给某去处加/退 d 点。夹在三道闸之间——
   *   ① 剩余额度（P.freePool = 首局基础 + 已完成周目 × loopFreeBonus；作弊码兑的周目也算进来）
   *   ② 单维软上限 P.freeCap（只卡属性三格；金钱是不受 cap 的溢出池）
   *   ③ 属性本身 0-100 硬顶（startAttr 打底 + 点×每点属性，越顶的点自动退回）
   * 保留旧名 spendAttr 作别名（validate/smoke 与老调用方沿用）。 */
  function usedPoints(C) {
    const sp = C.spent || {};
    return ALLOC_TARG.reduce(function (a, x) { return a + (sp[x] || 0); }, 0);
  }
  P.spendPoint = function (k, d) {
    const C = P.CSEL;
    if (ALLOC_TARG.indexOf(k) < 0) return;
    if (!C.spent) C.spent = {};
    const b = P.balance();
    const per = b.freeAttrPerPoint == null ? 10 : b.freeAttrPerPoint;
    const cap = P.freeCap();
    const cur = C.spent[k] || 0;
    const left = P.freePool() - usedPoints(C);
    if (d > 0) {
      d = Math.min(d, left);                              // 不越过剩余额度
      if (ATTR_TARG.indexOf(k) >= 0) {
        d = Math.min(d, cap - cur);                        // 属性受单维软上限
        const base = (b.startAttr || {})[k] || 0;          // 属性硬顶 100（能一路点到满值）
        const room = Math.floor((ATTR_HARD_MAX - base) / per) - cur;
        d = Math.min(d, room < 0 ? 0 : room);
      }
      if (d <= 0) return;
    } else {
      d = Math.max(d, -cur);                               // 退款不越过已洒进去的
      if (d >= 0) return;
    }
    C.spent[k] = cur + d;
    P.renderCreate();
  };
  P.spendAttr = P.spendPoint;                              /* 兼容旧名 */
  /* ---------- 作弊码（v0.12 #31：兑的是【周目】，输入框住在第 2 步天赋页） ----------
   * 码面 = woshishabiN → 本次建角按「第 N+1 周目」的口径开局：自由点额度与高稀有卡概率一起抬
   * （夹到 balance.cheatMax=10，可多次提交、累加；只影响本次建角，不写 localStorage）。
   * ① 界面入口：gachaHTML() 里的输入框 + 「兑换」按钮（Enter 也可提交）→ P.submitCheat()；
   * ② 键盘连打：保留旧彩蛋路径，只在建角屏生效，焦点在输入框时不听（免得把码字打进姓名栏）。
   * 两条路都落到同一个计数器 C.cheatLoops，额度由 P.freePool / P.gachaCfg 现算。
   * ⚠ 已经掷过的牌面不会因此变脸 —— 想看高周目才有的橙卡得用「换一批」（配额另算）。 */
  let cheatListenerOn = false;
  function installCheatListener() {
    if (cheatListenerOn || typeof document === "undefined") return;
    cheatListenerOn = true;
    let settleTimer = null;
    const award = function (loops) {
      if (!loops || !P.CSEL) return;
      P.CSEL.cheatLoops = (P.CSEL.cheatLoops || 0) + loops;
      if (typeof P.renderCreate === "function") P.renderCreate();
    };
    document.addEventListener("keydown", function (e) {
      if (P.SCREEN !== "create" || !P.CSEL) return;
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) { P.cheatReset(); return; }
      if (!e.key || e.key.length !== 1) return;
      const loops = P.cheatFeed(e.key);
      if (loops) { award(loops); return; }
      // 数字先攒着：停手 250ms 后再判一次，woshishabi10 才不会被读成 woshishabi1
      clearTimeout(settleTimer);
      settleTimer = setTimeout(function () { award(P.cheatFeed("", true)); }, 250);
    });
  }

  /* 作弊码兑换（界面入口）：读输入框 → 解析 → 累加本局作弊周目，并把结果说清楚。
   * 传 code 可直接调用（测试/脚本）；不传则取 #cheatcode 输入框的值。
   * 返回本次注入的周目数（未命中 0）——UI 反馈写在 C.cheatMsg，重绘后显示在输入框下方。 */
  P.submitCheat = function (code) {
    const C = P.CSEL;
    if (!C) return 0;
    let raw = code;
    if (raw == null) {
      const el = (typeof document !== "undefined") ? document.getElementById("cheatcode") : null;
      raw = el ? el.value : "";
    }
    const loops = P.cheatParse(raw);
    if (loops > 0) {
      C.cheatLoops = (C.cheatLoops || 0) + loops;
      C.cheatMsg = P.t("ui.create.cheatOk",
        "已注入 +{n} 周目 → 现在是第 {loop} 周目：自由点 {pool} 点，高稀有卡概率同步抬升（换一批才重掷牌面）。",
        { n: loops, loop: P.currentLoop(), pool: P.freePool() });
    } else {
      C.cheatMsg = P.t("ui.create.cheatBad", "这个码不对——试试 woshishabi10。");
    }
    C.cheatInput = "";
    if (typeof P.renderCreate === "function") P.renderCreate();
    return loops;
  };

  /* 建角页的「自由点分配」整块（内联 onclick，POTUS.* 方法渲染后即生效）。
   * #31：作弊码入口搬去第 2 步的天赋页 —— 它兑的是周目，而周目首先改变的是卡池。 */
  function allocHTML() {
    const b = P.balance(), C = P.CSEL, spent = C.spent || {};
    const per = b.freeAttrPerPoint == null ? 10 : b.freeAttrPerPoint;
    const funPer = b.freeFunPerPoint == null ? 2000 : b.freeFunPerPoint;
    const total = P.freePool();
    const cap = P.freeCap();
    const used = usedPoints(C);
    const loop = P.currentLoop();
    const sp = C.spent || {};
    /* #37②：第 3 步要把**所有**剩余来源摊开 —— 玩家在游戏里第一眼看到的数字，
       必须就是他在向导里能算出来的数字（startAttr 打底 + 自由点 + 已选卡）。
       出身/起点/难度那份 attr 已经从内容里删除，这里不再需要"偷偷加一块"。 */
    const cardAttr = {};
    let cardFun = 0, cardN = 0;
    (C.picks || []).forEach(function (id) {
      const cd = (P.reg.card || {})[id];
      const eff = cd && cd.effects;
      if (!eff) return;
      cardN++;
      if (eff.fun) cardFun += eff.fun;
      for (const k in (eff.attr || {})) cardAttr[k] = (cardAttr[k] || 0) + eff.attr[k];
    });
    const ATTR_NAME = {
      CHA: P.t("ui.attr.CHA", "魅力"), INT: P.t("ui.attr.INT", "智力"),
      CUN: P.t("ui.attr.CUN", "手腕"), INTG: P.t("ui.attr.INTG", "诚信")
    };
    let h = '<h3 style="margin:14px 0 4px">' + P.t("ui.create.allocTitle", "分配自由点") +
      '　<small class="muted">' + P.t("ui.create.loopTag", "第 {n} 周目", { n: loop }) + "</small></h3>";
    h += '<div class="muted alloc-rate">' + P.t("ui.create.allocRate",
      "1 点 = +{per} 魅力/智力/手腕　·　1 点 = +${fun}k 金钱　·　单维可一路点到 100",
      { per: per, fun: (funPer / 1000).toFixed(0), cap: cap }) + "</div>";
    h += '<div class="rollgrid">';
    ALLOC_TARG.forEach(function (k) {
      const put = spent[k] || 0;
      const left = total - used;
      const isFun = k === "FUN";
      const base = isFun ? 0 : ((b.startAttr || {})[k] || 0);
      const atCap = !isFun && put >= cap;
      const canUp = left > 0 && !atCap;
      const canDown = put > 0;
      const name = isFun ? P.t("ui.create.allocMoney", "金钱") : ATTR_NAME[k];
      const card = isFun ? cardFun : (cardAttr[k] || 0);
      const val = isFun ? (put * funPer + card) : (base + put * per + card);
      const valTxt = isFun ? "+$" + (val / 1000).toFixed(0) + "k" : val;
      /* 尾巴逐项拆开来写：自由点给多少、卡给多少 —— 合起来就是上面那个大数 */
      let tail = "";
      if (put && !isFun) tail += '<i class="rspent">+' + (put * per) + "</i>";
      if (card) tail += '<i class="rscard">' + P.t("ui.create.allocCardTag", "卡") +
        (card > 0 ? "+" : "") + (isFun ? "$" + (card / 1000).toFixed(0) + "k" : card) + "</i>";
      h += '<div class="rattr"><b>' + name + "</b>" +
        '<span class="rval">' + val + "</span>" + tail +
        (atCap ? '<i class="rcapped">' + P.t("ui.create.capped", "顶") + "</i>" : "") +
        '<span class="rctrl">' +
        '<button class="btn tiny" ' + (canDown ? "" : "disabled") + ' onclick="POTUS.spendPoint(\'' + k + '\',-1)">−1</button>' +
        '<button class="btn tiny" ' + (canDown ? "" : "disabled") + ' onclick="POTUS.spendPoint(\'' + k + '\',-5)">−5</button>' +
        '<button class="btn tiny" ' + (canUp ? "" : "disabled") + ' onclick="POTUS.spendPoint(\'' + k + '\',5)">+5</button>' +
        '<button class="btn tiny" ' + (canUp ? "" : "disabled") + ' onclick="POTUS.spendPoint(\'' + k + '\',1)">+1</button></span>' +
        "</div>";
    });
    h += "</div>";
    /* 来路核对：把卡池那份加成单独列一句，免得玩家以为大数只来自自由点。
       诚信 INTG 不在上表里（隐藏属性，面板不展示），所以只能在这句话里见到它。 */
    if (cardN) {
      const bits = [];
      ["CHA", "INT", "CUN", "INTG"].forEach(function (k) {
        const v = cardAttr[k];
        if (v) bits.push(ATTR_NAME[k] + " " + (v > 0 ? "+" : "") + v);
      });
      if (cardFun) bits.push(P.t("ui.create.allocMoney", "金钱") + " +$" + (cardFun / 1000).toFixed(0) + "k");
      h += '<div class="muted alloc-cardsum">' + P.t("ui.create.allocFromCards",
        "已选 {n} 张天赋卡带来：{LIST}（已并进上表；诚信是隐藏属性，只在这句里出现）",
        { n: cardN, LIST: bits.join(" · ") || "—" }) + "</div>";
    }
    h += '<div class="rleft' + (used >= total ? " done" : "") + '">' +
      P.t("ui.create.freePoints", "自由点：还剩 <b>{left}</b>／{total}", { left: total - used, total: total }) +
      (P.readBonusFree() > 0 ? P.t("ui.create.poolMeta",
        "　·　首局 {base} ＋ 第 {loop} 周目奖励 {bonus}", { base: b.freePoints, loop: loop, bonus: P.readBonusFree() }) : "") +
      "</div>";
    return h;
  }

  /* ---------- v0.12 #20 开局抽卡（卡墙选择）· #31 加上刷新配额、周目门槛与作弊码入口 ----------
   * C.offer = 本局呈现的卡 id 数组（难度无关，换难度不重掷）；C.picks = 玩家选中的卡。
   * 难度只决定【可选几张】（P.cardPickCount）；橙卡受【周目】门槛（P.orangeUnlocked），
   * 由 rollCardOffer 内部处理。整面卡墙每局可刷 gacha.rerolls 次（默认 1）。 */
  const RARITY = {
    1: { label: "白", color: "#9aa3ad" },
    2: { label: "蓝", color: "#3d8fd1" },
    3: { label: "紫", color: "#8b5cf6" },
    4: { label: "橙", color: "#e8930c" }
  };
  function rarityLabel(r) { const x = RARITY[r]; return x ? P.t("ui.create.rarity." + r, x.label) : "?"; }
  function rerollsLeft(C, g) { return Math.max(0, (g.rerolls == null ? 1 : g.rerolls) - (C.rerollsUsed || 0)); }
  P.rollOffer = function () {
    const C = P.CSEL, g = P.gachaCfg();
    if (rerollsLeft(C, g) <= 0) {          // 配额用尽：说清楚，牌面一张都不动
      C.stepMsg = P.t("ui.create.gachaNoReroll", "刷新次数用完了（每局 {n} 次）——就在这批里挑吧。", { n: g.rerolls });
      P.renderCreate();
      return;
    }
    C.rerollsUsed = (C.rerollsUsed || 0) + 1;
    C.offer = P.rollCardOffer();
    C.picks = (C.picks || []).filter(id => C.offer.indexOf(id) >= 0);   // 重掷后旧选择按新牌面收敛
    C.stepMsg = "";
    P.renderCreate();
  };
  P.toggleCardPick = function (id) {
    const C = P.CSEL;
    const need = P.cardPickCount(C.difficulty);
    if (!C.offer || C.offer.indexOf(id) < 0) return;
    const i = (C.picks || []).indexOf(id);
    if (i >= 0) C.picks.splice(i, 1);
    else { if ((C.picks || []).length >= need) return; C.picks.push(id); }
    P.renderCreate();
  };
  function gachaHTML() {
    const C = P.CSEL, g = P.gachaCfg();
    if (!g.enabled) return "";
    const need = P.cardPickCount(C.difficulty);
    const left = rerollsLeft(C, g);
    let h = '<h3 style="margin:14px 0 4px">' + P.t("ui.create.gachaHeading", "天赋抽卡（难度＝可选张数）") +
      ' <button class="btn tiny" ' + (left > 0 ? "" : "disabled") + ' onclick="POTUS.rollOffer()">' +
      P.t("ui.create.gachaReroll", "换一批") + "</button>" +
      ' <small class="muted">' + P.t("ui.create.gachaCount", "已选 {n}/{need}", { n: (C.picks || []).length, need: need }) + "</small>" +
      ' <small class="muted">· ' + P.t("ui.create.gachaRerollsLeft", "刷新剩 {n}", { n: left }) + "</small></h3>";
    /* 周目抬头：高周目 = 更高的卡池 + 更多自由点，这一屏就是它的橱窗 */
    h += '<div class="muted" style="font-size:12.5px;margin-bottom:6px">' +
      P.t("ui.create.gachaLoop", "第 {loop} 周目　·　橙卡（命卡）{state}", {
        loop: g.loop,
        state: P.t(P.orangeUnlocked() ? "ui.create.orangeInPool" : "ui.create.orangeLocked",
          P.orangeUnlocked() ? "已进池" : "要到第 " + g.orangeLoop + " 周目才进池", { n: g.orangeLoop })
      }) + "</div>";
    if (!C.offer || !C.offer.length) {
      h += '<div class="muted" style="font-size:13px">' + P.t("ui.create.gachaEmpty", "点「换一批」抽开局天赋卡。") + "</div>";
    } else {
      h += '<div class="gwall">';
      C.offer.forEach(function (id) {
        const c = P.reg.card[id] || {};
        const r = RARITY[c.rarity || 1] || RARITY[1];
        const sel = (C.picks || []).indexOf(id) >= 0;
        const full = !sel && (C.picks || []).length >= need;
        h += '<div class="gcard' + (sel ? " sel" : "") + (full ? " dim" : "") + '" ' +
          'style="border-color:' + r.color + (sel ? ";box-shadow:0 0 0 2px " + r.color : "") + '" ' +
          'onclick="POTUS.toggleCardPick(\'' + id + '\')">' +
          '<span class="grar" style="background:' + r.color + '">' + rarityLabel(c.rarity || 1) + "</span>" +
          '<b>' + P.cardName(id) + "</b><small>" + P.cardDesc(id) + "</small></div>";
      });
      h += "</div>";
    }
    /* 作弊码入口（#31 搬到天赋页）：woshishabiN → 本次建角按第 N+1 周目口径开局。
       兑换只动额度与卡池概率，牌面要等下一次「换一批」才重掷。 */
    h += '<div class="cheatbox">' +
      '<input type="text" id="cheatcode" autocomplete="off" placeholder="' +
      P.t("ui.create.cheatPlaceholder", "作弊码：woshishabi10 ＝ 按第 11 周目开局") + '">' +
      '<button class="btn tiny" onclick="POTUS.submitCheat()">' +
      P.t("ui.create.cheatBtn", "兑换") + "</button></div>";
    if (C.cheatMsg) h += '<div class="cheatmsg">' + C.cheatMsg + "</div>";
    return h;
  }

  /* ---------- 三步向导（照顾手机竖屏：一屏一件事，下一步下一步） ----------
   * step 1 = 难度 + 姓名；step 2 = 天赋抽卡（+ 作弊码）；step 3 = 自由点分配 + 开始游戏。
   * C.step 由 startCreate 钉成 1；页面内所有交互（选难度/抽卡/加点）都留在当前步重绘。 */
  P.createStep = function (n) {
    const C = P.CSEL;
    const to = Math.max(1, Math.min(3, n | 0));
    C.step = to;
    C.stepMsg = "";                     // 换步清掉上一次的拦截提示
    P.renderCreate();
  };
  /* 点「下一步」：从第 2 步（抽卡）往前走的门槛——炼狱等难度至少选 1 张卡，别空着进下一屏 */
  P.createNext = function () {
    const C = P.CSEL;
    if (C.step === 2 && P.gachaCfg().enabled) {
      const need = P.cardPickCount(C.difficulty);
      const got = (C.picks || []).length;
      if (need > 0 && got < 1) {
        C.stepMsg = P.t("ui.create.needCard", "至少选 1 张天赋卡再往下走（本难度可选 {n} 张）。", { n: need });
        P.renderCreate();
        return;
      }
    }
    P.createStep(C.step + 1);
  };
  /* 步序指示条：① 难度 ② 抽卡 ③ 加点 */
  function stepBarHTML(cur) {
    const labels = [
      P.t("ui.create.step1", "难度"),
      P.t("ui.create.step2", "抽卡"),
      P.t("ui.create.step3", "加点")
    ];
    return '<div class="stepbar">' + labels.map(function (lab, i) {
      const n = i + 1;
      const cls = n === cur ? " on" : (n < cur ? " done" : "");
      return '<span class="step' + cls + '" onclick="POTUS.createStep(' + n + ')"><b>' + n + "</b>" + lab + "</span>";
    }).join('<i class="stepsep">›</i>') + "</div>";
  }
  /* 向导底部导航：第 1 步返回标题；末步给「开始游戏」；其余给「下一步」。 */
  function navHTML(cur) {
    let h = '<div class="create-nav">';
    if (cur > 1) h += '<button class="btn" onclick="POTUS.createStep(' + (cur - 1) + ')">' +
      P.t("ui.create.prev", "← 上一步") + "</button>";
    else h += '<button class="btn" onclick="POTUS.renderTitle()">' + P.t("ui.create.back", "返回") + "</button>";
    if (cur < 3) h += '<button class="btn primary" onclick="POTUS.createNext()">' +
      P.t("ui.create.next", "下一步 →") + "</button>";
    else h += '<button class="btn primary" onclick="POTUS.confirmCreate()">' +
      P.t("ui.create.startBtn", "开始游戏 →") + "</button>";
    h += "</div>";
    if (P.CSEL.stepMsg) h += '<div class="createmsg">' + P.CSEL.stepMsg + "</div>";
    return h;
  }

  P.renderCreate = function () {
    const C = P.CSEL;
    const step = C.step || 1;
    /* 每步的正文块：只渲染当前这一步，手机一屏放得下 */
    let body = "";
    if (step === 1) {
      body = '<h3 style="margin:14px 0 4px">' +
        P.t("ui.create.diffHeading", "选择难度（＝出身 + 能选几张天赋卡）") + "</h3>";
      for (const id in DIFFS) {
        const sel = C.difficulty === id ? " sel" : "";
        const label = diffLabel(id), note = diffNote(id);
        body += '<div class="opt opt-diff' + sel + '" onclick="POTUS.pickDifficulty(\'' + id + '\')">' +
          '<img class="opt-port" src="assets/heroes/hero-' + id + '-0.jpg" alt="' + label +
          '" onerror="this.style.visibility=\'hidden\'">' +
          '<div class="opt-body"><b>' + label + "</b><small>" + note + "</small></div></div>";
      }
      body += '<h3 style="margin:14px 0 4px">' + P.t("ui.create.nameLabel", "姓名（留空默认叫「汤米」）") + "</h3>" +
        '<input type="text" id="pname" placeholder="' + P.t("ui.create.namePlaceholder", "不填就叫汤米") +
        '" value="' + (C.name || "") + '" style="width:100%">';
    } else if (step === 2) {
      body = gachaHTML();
    } else {
      body = allocHTML();
    }
    const oInfo = P.reg.origin[C.origin] || {};
    P.app().innerHTML =
      '<div class="create"><div class="masthead"><div class="title">' + P.t("ui.create.quickTitle", "权力之路 · 快速开局") + "</div>" +
      '<div class="meta">' + P.t("ui.title.sub", "一个美国小伙的从政之路") + "</div></div>" +
      stepBarHTML(step) +
      '<p class="hintline" style="margin:8px 0 2px">' +
      P.t("ui.create.intro",
        "挑个<b>难度</b>（＝出身 + 能选几张卡），抽几张<b>天赋卡</b>，再洒一洒<b>属性点</b>——然后给个<b>名字</b>，从社区里那个啥都没有的年轻人开始往上爬。") + "</p>" +
      body +
      navHTML(step) +
      '<p class="hintline">' + P.t("ui.create.summary",
        "难度 <b>{d}</b>　出身 <b>{o}</b>　起点 <b>{e}</b>。开局年份、党派、天赋等由系统自动定，游戏里可再切换。",
        {
          d: diffLabel(C.difficulty),
          o: oInfo.name || "—",
          e: P.t("ui.create.entryInsider", "直接入行（从志愿者做起）")
        }) + "</p></div>";
    const inp = P.$("#pname");
    if (inp) inp.oninput = function (e) { P.CSEL.name = e.target.value; };
    /* 作弊码输入框：把未提交的内容留在 C.cheatInput（重绘不丢字），回车直接兑换 */
    const cc = P.$("#cheatcode");
    if (cc) {
      cc.value = C.cheatInput || "";
      cc.oninput = function (e) { C.cheatInput = e.target.value; };
      cc.onkeydown = function (e) { if (e.key === "Enter") P.submitCheat(); };
    }
  };

  P.confirmCreate = function () {
    const C = P.CSEL, b = P.balance();
    const dfltName = P.t("ui.create.defaultName", "汤米");
    const name = (C.name || dfltName).trim() || dfltName;
    const era = P.reg.era[C.era];
    /* 属性 = startAttr 打底 + 自由点分配（定命一掷已删，无掷骰）；金钱档分配折进开局资金。
       CSEL 也可能被外部（测试/旧调用方）直接塞进来而没有 spent，故兜底成空分配。
       三围开局真·0（硬核从零），未分配的维停在 0（与 effects.js 属性下限一致）。 */
    const per = b.freeAttrPerPoint == null ? 10 : b.freeAttrPerPoint;
    const funPer = b.freeFunPerPoint == null ? 2000 : b.freeFunPerPoint;
    const sp = C.spent || {};
    const attr = Object.assign({}, b.startAttr);
    ATTR_TARG.forEach(function (k) {
      attr[k] = P.clamp((attr[k] || 0) + (sp[k] || 0) * per, 0, ATTR_HARD_MAX);
    });
    const startMoney = (sp.FUN || 0) * funPer;   // 分配给「金钱」的自由点 → 开局资金
    /* 出生州对党派的顺风/逆风：写进起点派系（深州同党 +建制，逆风党 -建制+基层的同情） */
    const wind = P.stateWindFor(C.state, C.party);
    const stateFx = {};
    if (wind > 0) stateFx.establishment = wind * 5;
    else if (wind < 0) { stateFx.establishment = wind * 4; stateFx.base = Math.abs(wind) * 3; }
    P.G = {
      version: P.VERSION, seed: P.rint(1, 9999999),
      name: name, difficulty: C.difficulty, era: C.era, year: era.startYear, age: b.startAge,
      origin: C.origin, talent: C.talent,
      entry: C.entry, track: (P.reg.entry[C.entry] || {}).track_suggest || Object.keys(P.reg.track)[0],
      party: C.party, stance: C.stance, state: C.state || "",
      attr: attr, faction: {},
      fun: b.startFun + startMoney, rep: b.startRep, hp: b.startHp, ap: b.startAp, fav: b.startFav, lev: b.startLev || 0,
      debt: 0, debtAccr: 0, loanLate: 0, loanCaps: 0,
      forbearUntil: 0, forbearUsed: 0, forbearActive: false,
      pslfMonths: 0, pslfDone: false, bailouts: 0,
      tier: (P.reg.entry[C.entry] || {}).tier || 0,
      peakTier: (P.reg.entry[C.entry] || {}).tier || 0,
      score: 0, flags: [], history: [], log: [],
      contacts: {},
      /* v0.12 #20 天赋卡墙：cards = 本局持有卡 id，spentCards = 已烧掉的免死卡（留痕用）。
         #37②：attrGiven = 「这张卡的属性已经发过了」的账本（可重复卡不再重复发属性） */
      cards: [], spentCards: [], attrGiven: {},
      /* #31：本局是否已在结算屏给周目账本记过 +1（防重复结算刷歪） */
      loopCounted: 0,
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
      fallenCount: 0, fallenShieldUntil: 0, yearStartSnap: null,
      /* 升职庆典：promoteCount = 本局第几次晋升（弹窗生涯统计行）；
         fanfareQ = 待弹队列，一次性 UI 交接件（载入时一律清空，见 core.js 的 migrate） */
      promoteCount: 0, fanfareQ: []
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
    /* v0.12 #20 开局选中的天赋卡入墙：登记卡面 + 结算一次性 effects（钱卡在此把资金叠到基础盘之上）。
       聚合被动（mods/crit/luck/hpDecay/voterDrift/spare）不在此结算，持卡期间由 dice/core/stage 现读。 */
    if (b.gacha && b.gacha.enabled !== false && C.picks && C.picks.length) P.adoptCards(C.picks);
    /* 学生贷款：普通难度以下（normal/hard/brutal）开局背贷；世家（easy/legendary）无贷。
       余额存进 G.debt，每月由 P.loanStep 在平静月结算时计息 + 还款（见 core.js / stage.js）。 */
    const sl = (b.studentLoan || {});
    P.G.debt = (sl.enabled && sl.startDebt) ? (sl.startDebt[C.difficulty] || 0) : 0;
    if (P.G.debt > 0) P.pushLog(P.t("ui.create.loanLog",
      "开局欠着学生贷款 ${v}k —— 每月从结余里还一点，收入越高还得越快。",
      { v: (P.G.debt / 1000).toFixed(0) }));
    const home = C.state ? homeLabel(C.state) : "";
    P.pushLog(home
      ? P.t("ui.create.startLogHome", "开局：{name}，{era}，{origin}出身，{home}，{entry}，{party}/{stance}。", {
        name: name, era: era.name, origin: (P.reg.origin[C.origin] || {}).name, home: home,
        entry: (P.reg.entry[C.entry] || {}).name, party: (P.reg.party[C.party] || {}).name,
        stance: (P.reg.stance[C.stance] || {}).name
      })
      : P.t("ui.create.startLog", "开局：{name}，{era}，{origin}出身，{entry}，{party}/{stance}。", {
        name: name, era: era.name, origin: (P.reg.origin[C.origin] || {}).name,
        entry: (P.reg.entry[C.entry] || {}).name, party: (P.reg.party[C.party] || {}).name,
        stance: (P.reg.stance[C.stance] || {}).name
      }));
    document.body.className = "era-" + C.era;
    P.startYear();
  };
})();
