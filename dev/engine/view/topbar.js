/* ============================================================================
 * POTUS ENGINE · view/topbar.js
 * 顶部状态条：日期/推进、topStatus 汇总条、职位卡（我是谁 / 选民 / 光谱 / 晋升进度）。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* v0.8 视图层隐藏清单：这些项从面板上撤下，但**引擎数值与判定一律不动**（值照旧参与
     结算/门槛/掷骰）。与「属性减法」的冻结为常量策略对应，后续彻底重构再回到引擎层。
     · attr INT/INTG：智力/诚信——不再上面板
     · attr CHA/CUN：玩法大改造后 demo 期整条「能力」先隐藏（属性仍由出身模板给、
       仍照旧参与判定，只是不上面板减少噪声；要恢复展示把 CHA/CUN 从下表删掉即可）
     · res hp/ap/intg：健康/精力/公信力（公信力并入声望）——不再上资源瓷贴
     · fac press/labor/religious/intel：媒体/工会（常量）+ 宗教/情报（死轴）——不再上派系区 */
  P.UI_HIDE = {
    attr: { INT: 1, INTG: 1, CHA: 1, CUN: 1 },
    res: { hp: 1, ap: 1, intg: 1 },
    fac: { press: 1, labor: 1, religious: 1, intel: 1 }
  };

  /* 时间：年 / 月 / 日
     月份由引擎推进（engine/time.js 的 advanceMonth），是唯一权威；
     事件只负责声明自己的「日」（day），以及它内容上属于哪个月（month，用于抽取时匹配）。 */
  P.dateText = function (ev) {
    const G = P.G;
    const y = (ev && ev.year) || G.year;
    const m = G.month || 1;
    /* P.dateLabel 是 i18n 的两个日期原语之一：中文 2008 年 9 月 24 日 / 英文 Sep 24, 2008。
       validate.js 的时间契约断言走 ZH() 取词，所以英文侧渲染不会假红。 */
    return P.dateLabel(y, m, ev && ev.day);
  };
  /* 兼容旧内容 / 旧测试：把当前月向后推到 m（接受数字或 {month:n}）。年内不回退。 */
  P.setMonth = function (m) {
    const G = P.G;
    const want = (m && m.month) || m || G.month || 1;
    G.month = Math.max(want, G.month || 1);
    return G.month;
  };
  /* v0.5.6：日期/身份/职位信息全部合并进顶部状态条（.topstat）——
     原先右上角的 .masthead .meta 与顶部条重复（姓名、年月各出现两遍），已删掉。
     推进月份/事件后刷新顶部条即可（保留函数名，调用点不动）。
     v0.9.1：顶栏黑条（kicker-band）里的月份只在年初渲染一次 → 每次一并刷新，
     避免「顶栏 1 月 / 状态卡 3 月」两处日期打架。 */
  P.tickDate = function () {
    const sb = document.getElementById("statusbox");
    if (sb) sb.innerHTML = P.statusPanel();
    const id = document.getElementById("ident");
    if (id) id.innerHTML = P.identityHTML();
    const kb = document.querySelector(".kicker-band");
    if (kb && P.G && P.G.year) kb.outerHTML = P.topbarHTML();
  };

  /* 头像路径：难度×层级 → assets/heroes/hero-<难度>-<层级>.jpg。
     缺失难度信息（旧存档）退回 normal；文件缺失由 onerror 在界面层隐藏，绝不影响布局。 */
  P.heroPortrait = function () {
    const G = P.G; if (!G) return "";
    const d = G.difficulty || "normal";
    const t = G.tier || 0;
    return "assets/heroes/hero-" + d + "-" + t + ".jpg";
  };

  /* 核心身份（组件①）：头像 → 姓名 + 年龄。
     v0.10 组件化：职位/等级/晋升拆成独立的 officeProgHTML()（组件②），
     两者在 STATUS_LAYOUT 里同列竖排——布局归配置，组件各自独立可挪。 */
  P.identityHTML = function () {
    const G = P.G;
    const escAttr = function (s) { return String(s).replace(/"/g, "&quot;"); };
    const port = P.heroPortrait ? P.heroPortrait() : "";
    return (port ? '<span class="idc-portrait"><img src="' + port + '" alt="' + escAttr(G.name) + '"' +
        ' onerror="this.closest(\'.idc-portrait\').style.visibility=\'hidden\'"></span>' : "") +
      '<span class="idc-info">' +
        '<span class="idc-name">' + G.name + '</span>' +
        '<span class="idc-age">' + P.t("ui.topbar.age", "{n} 岁", { n: G.age }) + '</span>' +
      '</span>';
  };
  /* 组件②：职位 · 等级徽标 · 晋升条（原 identityHTML 的下半截，v0.10 拆出） */
  P.officeProgHTML = function () {
    const G = P.G;
    return '<span class="idc-office">' + P.officeName() + '</span>' +
      '<span class="idc-tier">' + P.t("ui.topbar.tierLevel", "等级 {n}", { n: G.tier + 1 }) + '</span>' +
      P.promoBarHTML();
  };

  /* 晋升就绪度：悬浮提示的完整文字（百分比 / 下一级 / 规则说明） */
  P.promoTip = function () {
    const b = P.balance();
    if (P.G.tier >= b.tierMax) return P.t("ui.topbar.tipMax", "已达权力顶点。");
    const prog = P.promotionProgress();
    return P.t("ui.topbar.tip", "{note}。晋升就绪度 {pct}＝在位 40%＋声望 25%＋选民底气 20%＋组织关系 15%；满 60 进机会区间，但晋升仍需等一个空缺位置。",
      { note: prog.note, pct: prog.pct });
  };
  /* 晋升就绪度小条（纯进度条版）：只画条子，文字全部收进悬浮提示（hastip）。 */
  P.promoBarHTML = function () {
    const G = P.G;
    const escAttr = function (s) { return String(s).replace(/"/g, "&quot;"); };
    if (G.tier >= P.balance().tierMax) {
      return '<span class="id-prog idc-prog atmax hastip" data-tip="' + escAttr(P.promoTip()) + '">' +
        '<span class="idp-bar"><i style="width:100%"></i></span></span>';
    }
    const prog = P.promotionProgress();
    return '<span class="id-prog idc-prog' + (prog.ready ? " ready" : "") + ' hastip" data-tip="' + escAttr(P.promoTip()) + '">' +
      '<span class="idp-bar"><i style="width:' + prog.pct + '%"></i></span>' +
      '</span>';
  };
  /* 晋升就绪度小条（完整版，带文字）：旧调用点兼容保留 */
  P.promoChipHTML = function () {
    const G = P.G;
    const escAttr = function (s) { return String(s).replace(/"/g, "&quot;"); };
    let progChip;
    if (G.tier >= P.balance().tierMax) {
      progChip = '<span class="id-prog atmax"><b>' + P.t("ui.topbar.peak", "权力顶点") + '</b></span>';
    } else {
      const prog = P.promotionProgress();
      progChip = '<span class="id-prog' + (prog.ready ? " ready" : "") + ' hastip" data-tip="' + escAttr(P.promoTip()) + '">' +
        '<span class="idp-cap">' + P.t("ui.topbar.promoCap", "晋升") + '</span>' +
        '<span class="idp-bar"><i style="width:' + prog.pct + '%"></i></span>' +
        '<span class="idp-pct">' + prog.pct + '</span>' +
        '<span class="idp-next">→ ' + prog.nextName + '</span>' +
        '</span>';
    }
    return progChip;
  };

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
    return (P.reg.officeFallback || [
      P.t("ui.topbar.fbNobody", "无名之辈"), P.t("ui.topbar.fbInsider", "圈内人"), P.t("ui.topbar.fbLocal", "地方官员"), P.t("ui.topbar.fbLocalVet", "地方资深"), P.t("ui.topbar.fbStateNew", "州级新人"),
      P.t("ui.topbar.fbStateFig", "州级人物"), P.t("ui.topbar.fbFed", "联邦官员"), P.t("ui.topbar.fbNational", "全国性人物"), P.t("ui.topbar.fbHeavy", "重量级人物"), P.t("ui.topbar.peak", "权力顶点")
    ])[G.tier] || P.t("ui.topbar.tierLevel", "等级 {n}", { n: G.tier + 1 });
  };
  /* ---------------- 晋升进度条（v0.5.2 用户设计） ----------------
   * 进度不是"经验值"，是"你准备好了吗"的综合读数：
   *   在位时长（熬）40% + 声望 25% + 选民底气 20% + 组织关系 15%
   * 到 60 就进入"有机会"区间——但晋升仍要等一个位置空出来（prog_* 事件），
   * 进度只决定机会来的时候你抓不抓得住。满了不晋升也正常：位置就那么多。 */
  P.promotionProgress = function () {
    const G = P.G, b = P.balance();
    if (G.tier >= b.tierMax) return { pct: 100, ready: true, note: P.t("ui.topbar.noteAtMax", "已在顶点") };
    /* 在位的年数按下一级职位加权：直接取全局年限闸 balance.tierGates（与晋升判定同源） */
    const GATES = b.tierGates || [8, 10, 12, 18, 20, 24, 28, 34, 40, 0];
    const needTenure = GATES[Math.min(G.tier, GATES.length - 1)];
    const tenureScore = Math.min(1, P.monthsAtTier() / needTenure);
    const repScore = Math.min(1, G.rep / 60);
    const es = P.electionStrength();
    const voterScore = Math.min(1, es.pct / 45);
    const org = Math.max(0, Math.min(100, (G.faction ? (G.faction.establishment || 0) : 0) + 30)) / 100;
    const pct = Math.round((tenureScore * 0.40 + repScore * 0.25 + voterScore * 0.20 + org * 0.15) * 100);
    const ready = pct >= 60;
    const nextName = P.tierName(G.tier + 1);
    const note = ready
      ? P.t("ui.topbar.noteReady", "机会区间——在等一个空缺的位置（{n}）", { n: nextName })
      : P.t("ui.topbar.noteNext", "还没到时候（下一级：{n}）", { n: nextName });
    return { pct: pct, ready: ready, note: note, nextName: nextName };
  };

  P.officeCard = function () {
    const G = P.G;
    /* 选民池（v0.5.2）：三档具体人数 + 选区规模 + 选举强度——
       warm 有好感 / diehard 死忠 / oppose 反对，选区按层级取规模表。 */
    const vp = P.voterPools();
    const es = P.electionStrength();
    const fmtNum = function (n) {
      /* 中文按 亿/万/千 三档；英文没有「万」这个量级，走覆盖层模板换算成 K/M/B。 */
      if (n >= 100000000) return P.t("ui.topbar.numYi", "{n} 亿", { n: (n / 100000000).toFixed(1) });
      if (n >= 10000) return P.t("ui.topbar.numWan", "{n} 万", { n: (n / 10000).toFixed(n >= 100000 ? 0 : 1) });
      if (n >= 1000) return P.t("ui.topbar.numKilo", "{n} 千", { n: (n / 1000).toFixed(1) });
      return String(n);
    };
    const diehardTxt = fmtNum(vp.diehard) + " " + P.t("ui.topbar.vtDie", "死忠") + " · "
      + fmtNum(vp.warm) + " " + P.t("ui.topbar.vtWarm", "有好感") + " · "
      + fmtNum(vp.oppose) + " " + P.t("ui.topbar.vtOppose", "反对");
    /* 政治光谱：党派打底，姿态偏移，关键标记再拉 */
    const partyName = (P.reg.party[G.party] || {}).name || P.t("ui.topbar.noParty", "无党派");
    let wing = G.stance === "outsider" ? P.t("ui.topbar.wingOutsider", "（反建制）") : "";
    let spectrum = partyName + wing;
    if (P.hasFlag("wave_tea")) spectrum += P.t("ui.topbar.mTea", "·茶党底色");
    if (P.hasFlag("wave_occupy")) spectrum += P.t("ui.topbar.mOccupy", "·占领底色");
    if (P.hasFlag("wave_antiwar")) spectrum += P.t("ui.topbar.mAntiwar", "·反战印记");
    if (P.hasFlag("cross_insider")) spectrum += P.t("ui.topbar.mMachine", "·机器的人");
    if (P.hasFlag("fallen")) spectrum += P.t("ui.topbar.mFallen", "·下野待起");
    const stateTxt = G.state ? P.stateName(G.state) : "";
    const tenure = P.monthsAtTier();
    const tenureTxt = tenure >= 12 ? (tenure % 12 ? P.t("ui.topbar.tenureYearsRest", "（在位 {n} 年余）", { n: Math.floor(tenure / 12) }) : P.t("ui.topbar.tenureYears", "（在位 {n} 年）", { n: Math.floor(tenure / 12) })) : (tenure ? P.t("ui.topbar.tenureMonths", "（在位 {n} 个月）", { n: tenure }) : "");
    /* v0.5.6：职位卡从左栏「状态」提到顶部状态条，横向排布。原首行的「职位（在位 N 个月）」
       与顶部条原来的「职务 / 在位」两个 chip 重复 —— 合并成一行：职位 · T层级（在位 N 个月）。 */
    /* v0.8 压高度：选区规模+光谱缩略进标题行；晋升进度上移到顶栏身份徒章（identityHTML）。
       卡体只留最关键的「选民三档 + 底气」一行。 */
    let specShort = partyName + (G.stance === "outsider" ? P.t("ui.topbar.wingShort", "·反建制") : "");
    const specMarks = [["wave_tea", P.t("ui.topbar.sTea", "茶党")], ["wave_occupy", P.t("ui.topbar.sOccupy", "占领")], ["wave_antiwar", P.t("ui.topbar.sAntiwar", "反战")], ["cross_insider", P.t("ui.topbar.sMachine", "机器")], ["fallen", P.t("ui.topbar.sFallen", "下野")]];
    specShort += specMarks.filter(function (m) { return P.hasFlag(m[0]); }).map(function (m) { return "·" + m[1]; }).join("");
    const metaTxt = (stateTxt ? stateTxt + " · " : "") + P.t("ui.topbar.district", "选区 {n}", { n: fmtNum(es.size) }) + " · " + specShort;
    const spectrumTip = P.t("ui.topbar.spectrumTip", "选区规模：层级越高盘子越大。光谱=党派打底+姿态偏移+时代印记，决定哪些事件与派系对你友好、哪些把你当异类。");
    /* 选民三档是本卡的核心读数 → 数字做大、按语义配色（死忠绿/好感金/反对红），标签小字退到上方 */
    const voterLine = '<span class="vt vt-die"><i>' + P.t("ui.topbar.vtDie", "死忠") + '</i><b>' + fmtNum(vp.diehard) + '</b></span>' +
      '<span class="vt vt-warm"><i>' + P.t("ui.topbar.vtWarm", "有好感") + '</i><b>' + fmtNum(vp.warm) + '</b></span>' +
      '<span class="vt vt-oppose"><i>' + P.t("ui.topbar.vtOppose", "反对") + '</i><b>' + fmtNum(vp.oppose) + '</b></span>' +
      '<span class="vt-power hastip" data-tip="' + P.t("ui.topbar.powerTip", "选举底气：三档选民的综合可打分，0–100") + '">' + P.t("ui.topbar.vtPower", "底气") + ' <b>' + es.pct + '</b><em>/100</em></span>';
    const voterTip = P.t("ui.topbar.voterTip", "死忠=几乎必到的票；有好感=看你表现的可能票；反对=对手的票。选举判定主要吃死忠，其次好感；底气 0–100。");
    /* v0.10 基本盘占比条：三档人数占三档合计的比例（死忠绿/好感金/反对红）。
       非零段最小可视宽 2%（否则 268/2100 这种小段画不出来）；三档全 0 整条隐藏。 */
    const escAttr = function (s) { return String(s).replace(/"/g, "&quot;"); };
    const vt = vp.diehard + vp.warm + vp.oppose;
    let voterBar = "";
    if (vt > 0) {
      const segW = function (v) { return Math.max(v / vt * 100, 2).toFixed(1); };
      const segPct = Math.round(vp.diehard / vt * 100) + "% / " + Math.round(vp.warm / vt * 100) + "% / " + Math.round(vp.oppose / vt * 100) + "%";
      const barTip = P.t("ui.topbar.baseTip", "基本盘结构（死忠/有好感/反对占有票盘子的比例）：{pct}——{d} / {w} / {o}（合计 {t} 人）",
        { pct: segPct, d: fmtNum(vp.diehard), w: fmtNum(vp.warm), o: fmtNum(vp.oppose), t: fmtNum(vt) });
      voterBar = '<div class="vbar hastip" data-tip="' + escAttr(barTip) + '">' +
        (vp.diehard > 0 ? '<i class="vb-die" style="width:' + segW(vp.diehard) + '%"></i>' : "") +
        (vp.warm > 0 ? '<i class="vb-warm" style="width:' + segW(vp.warm) + '%"></i>' : "") +
        (vp.oppose > 0 ? '<i class="vb-opp" style="width:' + segW(vp.oppose) + '%"></i>' : "") +
        '</div>';
    }
    return '<div class="officecard">' +
      '<div class="oc-head"><span class="oc-title">' + P.t("ui.topbar.baseTitle", "选区基本盘") + '</span>' +
        '<span class="oc-meta hastip" data-tip="' + escAttr(spectrumTip) + '">' + metaTxt + '</span></div>' +
      '<div class="oc-rows"><div class="ocline hastip" data-tip="' + escAttr(voterTip) + '">' + voterLine + "</div>" + voterBar + "</div>" +
      "</div>";
  };

  /* 顶部状态条（v0.5.6 合并去重）：把"我是谁 / 关键资源 / 我现在是谁"全部收进页面顶端。
     · 第 1 行：姓名 · 日期（含"第 N 个年头"）
     · 资源瓷贴：声望 / 资金 / 人情（精力·健康已于 v0.9 退役，不再上屏）
     · 第 2 行：职位卡 officeCard（职务·T层级（在位）｜州·选区规模｜选民池｜政治光谱｜晋升）
     原先右上角 .masthead .meta 与本条重复（姓名、年月各两遍），职务/在位/州也与职位卡重复，
     均已合并为各出现一次。 */
  /* 日期 / 时代 kicker —— 移到状态带左栏，轻量文字不与资源瓷贴抢戏 */
  P.dateChipHTML = function () {
    const G = P.G, b = P.balance();
    const yrs = G.age - b.startAge + 1;
    return '<div class="topstat"><div class="tsrow tsmeta">' +
      '<span class="tchip"><span class="tk">' + P.t("ui.topbar.dateLab", "日期") + '</span><b>' + P.dateText() + ' · ' + P.t("ui.topbar.yearNth", "第 {n} 个年头", { n: yrs }) + '</b></span>' +
      '</div></div>';
  };
  /* 资金显示分级缩写：随仕途增长宽度恒定，不把瓷贴撑爆/截断 ——
     < $1M   → "$408k"（千位取整）
     ≥ $1M   → "$1.23M"（< $10M 两位小数）/ "$12.3M"（≥ $10M 一位小数）
     ≥ $1B   → "$1.23B"
     负数带负号；等宽字体 + tabular 数字，位数变化不跳动。 */
  P.fmtMoney = function (n) {
    const s = n < 0 ? "-" : "";
    const v = Math.abs(n);
    if (v >= 1e9) return s + "$" + (v / 1e9).toFixed(2) + "B";
    if (v >= 1e6) return s + "$" + (v / 1e6).toFixed(v >= 1e7 ? 1 : 2) + "M";
    return s + "$" + Math.round(v / 1e3) + "k";
  };
  /* 资源瓷贴：声望 / 资金 / 人情 / 把柄（v0.9 把柄回归显示）。
     小图标 + 名称 + 大号数值，按资源语义着色；bad 时整块转红示警。
     v0.9.1：把柄数值不再带「份」字（窄栏里 4 枚瓷贴放不下会折行、高度参差）；
     单位说明移进悬停提示。 */
  P.resourcesHTML = function () {
    const G = P.G;
    const esc = function (s) { return String(s).replace(/"/g, '&quot;'); };
    const stat = function (k, v, cls, icon, bad, t) {
      return '<span class="stat ' + cls + (bad ? ' bad' : '') + '"' +
        (t ? ' data-tip="' + esc(t) + '"' : '') + '>' +
        '<span class="sicon">' + icon + '</span>' +
        '<span class="sbody"><span class="slab">' + k + '</span><b class="sval">' + v + '</b></span></span>';
    };
    /* 图标用 currentColor 描边/填充，颜色由 .stat 的 --sc 变量决定，风格贴合纸面克制 */
    const ICON = {
      rep:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.1 6.6.6-5 4.4 1.5 6.5L12 16.9 5.9 20.1 7.4 13.6l-5-4.4 6.6-.6z"/></svg>',
      fun:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M16.5 6.5H10a3 3 0 000 6h4a3 3 0 010 6H7"/></svg>',
      fav:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0111 0"/><path d="M16 5.4a3.2 3.2 0 010 5.9M18.5 20a5.5 5.5 0 00-2.8-4.6"/></svg>',
      lev:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="4"/><path d="M11 11l8 8M16 16l2-2M14 18l2-2"/></svg>'
    };
    return '<div class="topstat"><div class="tsrow statgrid">' +
        stat(P.t("ui.topbar.resRep", "声望"), G.rep, 's-rep', ICON.rep, false, P.t("ui.topbar.tipRep", "名望与曝光度（含风评与丑闻）。很多事件的门槛、派系态度与晋升都看它；太低会被人当无名小卒。")) +
        stat(P.t("ui.topbar.resFun", "资金"), P.fmtMoney(G.fun), 's-fun', ICON.fun, false, P.t("ui.topbar.tipFun", "竞选与运作的钱。多数关键行动都要烧钱，投注加码也吃它；归零会寸步难行。")) +
        stat(P.t("ui.topbar.resFav", "人情"), G.fav, 's-fav', ICON.fav, false, P.t("ui.topbar.tipFav", "攒下与欠下的人脉关照。可动用关系换取助力，也会被旧账反噬。")) +
        stat(P.t("ui.topbar.resLev", "把柄"), G.lev, 's-lev', ICON.lev, false, P.t("ui.topbar.tipLev", "别人见不得光的事，单位是「份」——握着就能在关键时刻要挟、换取让步；但会随时间失效（当事人下台或事情过去）。")) +
      '</div></div>';
  };

  /* ---------------- 竞选条（campaign.js 的界面投影） ----------------
   * 只在有一场活跃竞选时出现：这一场在选什么、走到第几幕、这一幕的窗口还剩几个月、
   * 选情表（动量 / 金库）的实时读数。让玩家看得见"这是一场一连串事件的竞选"，而不是一锤子买卖。 */
  P.campaignHTML = function () {
    const cp = P.campaignPanel ? P.campaignPanel() : null;
    if (!cp) return "";
    const esc = function (s) { return String(s == null ? "" : s).replace(/"/g, '&quot;'); };
    const METER_MAX = 60;                          // 选情条满格参考值（momentum 常见 45 起、上限不硬编）
    const bar = function (m) {
      const pctv = Math.max(0, Math.min(100, Math.round(m.value / METER_MAX * 100)));
      const low = m.value <= 18 ? " low" : "";
      return '<span class="cmp-meter' + low + '"><i>' + esc(m.name) + '</i>' +
        '<span class="cmp-track"><b style="width:' + pctv + '%"></b></span>' +
        '<em>' + m.value + '</em></span>';
    };
    const left = cp.stepLeft == null ? "" :
      '<span class="cmp-left' + (cp.stepLeft <= 1 ? ' warn' : '') + '">' + P.t("ui.topbar.campLeft", "这一幕还剩 {n} 个月", { n: cp.stepLeft }) + '</span>';
    return '<div class="campbar">' +
      '<div class="cmp-head"><span class="cmp-tag">' + P.t("ui.topbar.campTag", "竞选中") + '</span>' +
      '<b class="cmp-office">' + esc(cp.office) + '</b>' +
      '<span class="cmp-stage">' + P.t("ui.topbar.campStage", "第 {s} / {t} 幕 · {title}", { s: cp.stage, t: cp.stageCount, title: esc(cp.stageTitle) }) + '</span>' +
      left + '</div>' +
      (cp.lede ? '<div class="cmp-lede">' + esc(cp.lede) + '</div>' : "") +
      (cp.meters.length ? '<div class="cmp-meters">' + cp.meters.map(bar).join("") + '</div>' : "") +
      '</div>';
  };

  /* ---------------- 状态区（v0.10 组件化流式布局） ----------------
     状态卡拆成原子块：注册表 P.STATUS_BLOCKS（id → HTML 工厂）+ 布局配置 P.STATUS_LAYOUT。
     LAYOUT 项两种写法：
       · 字符串        = 原子块 id，直接渲染；
       · {cls,items,…} = 一个 flex 块（items 竖排），进 .idc-flow 参与 flex-wrap 自动换行；
         collapse: "档案" = 该块在窄屏（≤600px）折叠，由 .idc-chip-toggle 展开收起。
     以后把「人脉」单独挪到基本盘下面、或新增读数块 —— 只改这个数组，不动结构。 */
  P.STATUS_BLOCKS = {
    identity:   function () { return '<div class="idc-ident" id="ident">' + P.identityHTML() + '</div>'; },
    officeProg: function () { return '<div class="idc-officeprog">' + P.officeProgHTML() + '</div>'; },
    date:       function () { return '<div class="idc-date">' + P.dateText() + '</div>'; },
    resources:  function () { return P.resourcesHTML(); },
    officeCard: function () { return P.officeCard(); },
    attrs:      function () { return P.statusRows().attrs; },
    tags:       function () { return P.statusRows().tags; },
    factions:   function () { return P.statusRows().factions; },
    contacts:   function () { return P.statusRows().contacts; }
  };
  P.STATUS_LAYOUT = [
    { cls: "idc-left",  items: ["identity", "officeProg"] },
    { cls: "idc-facts", items: ["date", "resources", "officeCard"] },
    { cls: "idc-chips", items: ["attrs", "tags", "factions", "contacts"], collapse: "档案" }
  ];
  P.toggleChips = function (btn) {
    const box = btn.closest(".idc-chips");
    if (!box) return;
    const open = box.classList.toggle("open");
    btn.textContent = (open ? P.t("ui.topbar.chipsClose", "收起 ▴") : P.t("ui.topbar.chipsOpen", "档案 ▸"));
  };
  /* ---------------- 语言切换（对局内常驻入口，w45） ----------------
     与标题屏 langBar 同一机制：点非当前语言的按钮 → P.i18n.setLang 写
     localStorage.potus_lang 后整页重载（覆盖层是 boot 时一次性并进去的，不能热切），
     当前语言的按钮置灰。紧凑两枚小钮「中 / EN」——语言自称按母语书写，两语下都印 中/EN。
     摆放：对局中/事件屏挂在 kicker 顶栏 .kb-ops 尾部（shell.js 的 topbarHTML）；
     建角/终局这类不渲染顶栏的屏由 shell.js 全局 #langdock 复用本工厂兜底。 */
  P.langSwitchHTML = function () {
    const cur = P.locale.lang;
    const esc = function (s) { return String(s).replace(/"/g, "&quot;"); };
    const b = function (code, label) {
      return '<button type="button" class="btn tiny lang-btn" data-lang="' + code + '" data-i18n-native="1"' +
        (cur === code ? " disabled" : ' onclick="POTUS.i18n.setLang(\'' + code + '\')"') + ">" + label + "</button>";
    };
    /* 「语言 / Language」标签 + 与操作按钮组之间的一道分隔线：
       原来只有紧贴存档按钮的两枚「中/EN」小钮，没人看得出是切语言。标签走 P.t，
       两枚自称按钮带 data-i18n-native（i18n-coverage 量残留时剔掉，不自证假红）。 */
    return '<span class="lang-sw" role="group" title="' + esc(P.t("ui.topbar.langTip", "切换界面语言（重载后生效）")) + '">' +
      '<span class="lang-label">' + P.t("ui.topbar.langLabel", "语言") + "</span>" +
      b("zh", P.t("ui.topbar.langZh", "中")) + b("en", P.t("ui.topbar.langEn", "EN")) + "</span>";
  };
  P.statusPanel = function () {
    const G = P.G;
    const render = function (it) {
      if (typeof it === "string") {
        const f = P.STATUS_BLOCKS[it];
        return f ? f() : "";
      }
      const inner = it.items.map(render).join("");
      /* 折叠钮文案在取用点过 P.t（布局常量只存中文原文兜底），与 toggleChips 共用
         ui.topbar.chipsOpen，保证初始渲染和点击后的文案一致 */
      const toggle = it.collapse
        ? '<button type="button" class="btn tiny idc-chip-toggle" onclick="POTUS.toggleChips(this)">' + P.t("ui.topbar.chipsOpen", it.collapse + " ▸") + '</button>'
        : "";
      return '<div class="' + (it.cls || "") + '">' + inner + toggle + '</div>';
    };
    return '<div class="sb tier-' + G.tier + '"><div class="idc">' +
      '<div class="idc-flow">' + P.STATUS_LAYOUT.map(render).join("") + '</div>' +
      P.campaignHTML() +
      '</div></div>';
  };
})();
