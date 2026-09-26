/* ============================================================================
 * POTUS ENGINE · view/topbar.js
 * 顶部状态条：日期/推进、topStatus 汇总条、职位卡（我是谁 / 选民 / 光谱 / 晋升进度）。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* v0.8 视图层隐藏清单：这些项从面板上撤下，但**引擎数值与判定一律不动**（值照旧参与
     结算/门槛/掷骰）。与「属性减法」的冻结为常量策略对应，后续彻底重构再回到引擎层。
     · attr：v0.12 #20 定稿——建角改自由点分配后，玩家只看**魅力/智力/手腕**三维（金钱走资源条）。
       **诚信 INTG 撤下展示**：它仍是活跃的幕后属性（239 处判定权重照常吃它、事件照常涨跌它），
       只是不再上面板、不再写进卡面（卡面改为"你的话没人当真"这类模糊措辞）。引擎数值与判定一律不动。
     · res hp/ap/intg：健康/精力/公信力（公信力并入声望）——不再上资源瓷贴
     · fac press/labor/agency：媒体/工会（常量）+ 情报（死轴）——不再上派系区。
       ⚠ 旧注释这里写的是 religious/intel，注册表实键是 church/agency（键名对不上＝白藏）。
       #29 起 church（宗教·道德团体）与 military（军工复合体）改由左栏 2×2 面板展示（P.FAC_PANELS）。 */
  P.UI_HIDE = {
    attr: { INTG: 1 },
    res: { hp: 1, ap: 1, intg: 1 },
    fac: { press: 1, labor: 1, agency: 1 }
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
  P.officeNameAt = function (tier) {
    const G = P.G;
    const table = P.reg.office || {};
    const key = (G.track || "*") + "_" + tier;
    const hit = table[key] || table["*_" + tier];
    if (hit) return typeof hit === "string" ? hit : hit.name;
    return (P.reg.officeFallback || [
      P.t("ui.topbar.fbNobody", "无名之辈"), P.t("ui.topbar.fbInsider", "圈内人"), P.t("ui.topbar.fbLocal", "地方官员"), P.t("ui.topbar.fbLocalVet", "地方资深"), P.t("ui.topbar.fbStateNew", "州级新人"),
      P.t("ui.topbar.fbStateFig", "州级人物"), P.t("ui.topbar.fbFed", "联邦官员"), P.t("ui.topbar.fbNational", "全国性人物"), P.t("ui.topbar.fbHeavy", "重量级人物"), P.t("ui.topbar.peak", "权力顶点")
    ])[tier] || P.t("ui.topbar.tierLevel", "等级 {n}", { n: tier + 1 });
  };
  P.officeName = function () { return P.officeNameAt(P.G.tier); };
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
    /* 选区地名跟着盘子走：总统级（balance.voterBase.nationalTier）的选区就是整个国家，
       再挂家乡州名就成了"俄亥俄 · 选区 2.4 亿"这种自相矛盾的说法（玩家实测纠错）。
       家乡州并没有消失 —— 它仍在存档戳里作为出身出现（core.js 的 stamp line）。 */
    const vbConf = P.balance().voterBase || {};
    const natTier = vbConf.nationalTier == null ? P.balance().tierMax : vbConf.nationalTier;
    const national = G.tier >= natTier;
    const stateTxt = national ? P.t("ui.topbar.districtNation", "美利坚")
                              : (G.state ? P.stateName(G.state) : "");
    const tenure = P.monthsAtTier();
    const tenureTxt = tenure >= 12 ? (tenure % 12 ? P.t("ui.topbar.tenureYearsRest", "（在位 {n} 年余）", { n: Math.floor(tenure / 12) }) : P.t("ui.topbar.tenureYears", "（在位 {n} 年）", { n: Math.floor(tenure / 12) })) : (tenure ? P.t("ui.topbar.tenureMonths", "（在位 {n} 个月）", { n: tenure }) : "");
    /* v0.5.6：职位卡从左栏「状态」提到顶部状态条，横向排布。原首行的「职位（在位 N 个月）」
       与顶部条原来的「职务 / 在位」两个 chip 重复 —— 合并成一行：职位 · T层级（在位 N 个月）。 */
    /* v0.8 压高度：选区规模+光谱缩略进标题行；晋升进度上移到顶栏身份徒章（identityHTML）。
       卡体只留最关键的「选民三档 + 底气」一行。 */
    let specShort = partyName + (G.stance === "outsider" ? P.t("ui.topbar.wingShort", "·反建制") : "");
    const specMarks = [["wave_tea", P.t("ui.topbar.sTea", "茶党")], ["wave_occupy", P.t("ui.topbar.sOccupy", "占领")], ["wave_antiwar", P.t("ui.topbar.sAntiwar", "反战")], ["cross_insider", P.t("ui.topbar.sMachine", "机器")], ["fallen", P.t("ui.topbar.sFallen", "下野")]];
    specShort += specMarks.filter(function (m) { return P.hasFlag(m[0]); }).map(function (m) { return "·" + m[1]; }).join("");
    const metaTxt = (stateTxt ? stateTxt + " · " : "") + (national
      ? P.t("ui.topbar.districtNat", "全国选民 {n}", { n: fmtNum(es.size) })
      : P.t("ui.topbar.district", "选区 {n}", { n: fmtNum(es.size) })) + " · " + specShort;
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
      '<div class="oc-head"><span class="oc-title">' + (national
        ? P.t("ui.topbar.baseTitleNat", "全国基本盘")
        : P.t("ui.topbar.baseTitle", "选区基本盘")) + '</span>' +
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
       单位说明移进悬停提示。
     v0.11：每枚瓷贴带 data-diff/data-val —— 选择结算后由 P.flashStatusDiffs 对照上一次快照，
       给真正变动的读数标红/绿并挂 ±delta 角标，让玩家一眼看见「这一手改变了什么」。 */
  P.resourcesHTML = function () {
    const G = P.G;
    const esc = function (s) { return String(s).replace(/"/g, '&quot;'); };
    const stat = function (k, v, cls, icon, bad, t, diffKey, diffVal) {
      return '<span class="stat ' + cls + (bad ? ' bad' : '') + '"' +
        (t ? ' data-tip="' + esc(t) + '"' : '') +
        (diffKey ? ' data-diff="' + diffKey + '" data-val="' + diffVal + '"' : "") + '>' +
        '<span class="sicon">' + icon + '</span>' +
        '<span class="sbody"><span class="slab">' + k + '</span><b class="sval">' + v + '</b></span></span>';
    };
    /* 图标用 currentColor 描边/填充，颜色由 .stat 的 --sc 变量决定，风格贴合纸面克制 */
    const ICON = {
      rep:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.1 6.6.6-5 4.4 1.5 6.5L12 16.9 5.9 20.1 7.4 13.6l-5-4.4 6.6-.6z"/></svg>',
      fun:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M16.5 6.5H10a3 3 0 000 6h4a3 3 0 010 6H7"/></svg>',
      fav:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0111 0"/><path d="M16 5.4a3.2 3.2 0 010 5.9M18.5 20a5.5 5.5 0 00-2.8-4.6"/></svg>',
      lev:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="4"/><path d="M11 11l8 8M16 16l2-2M14 18l2-2"/></svg>',
      /* 支持率：三根投票柱状条 */
      appr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 20V12M10 20V5M16 20v-7M22 20H2"/></svg>'
    };
    /* #21 M1：总统支持率就挂在同一格资源栏里（第五枚瓷贴），不另起一块面板 ——
       它和声望/资金是同一类东西：玩家每个决策都在动的读数。
       数据来自 P.approvalPanel()（非总统为 null → 整枚瓷贴不出现）。 */
    const ap = P.approvalPanel ? P.approvalPanel() : null;
    const apprStat = !ap ? "" :
      stat(P.t("ui.topbar.resAppr", "支持率"), ap.value + "%", 's-appr band-' + ap.band.cls,
        ICON.appr, ap.band.cls === "danger",
        P.t("ui.topbar.tipAppr", "全国民意调查。白宫每个月的决策都吃它（判定加成按 50% 为零点），每月还会向自然水位回归、缓慢流失；跌到危险区时党内会有人来敲门。"),
        "appr", ap.value);
    return '<div class="topstat"><div class="tsrow statgrid">' +
        stat(P.t("ui.topbar.resRep", "声望"), G.rep, 's-rep', ICON.rep, false, P.t("ui.topbar.tipRep", "名望与曝光度（含风评与丑闻）。很多事件的门槛、派系态度与晋升都看它；太低会被人当无名小卒。"), "rep", G.rep) +
        stat(P.t("ui.topbar.resFun", "资金"), P.fmtMoney(G.fun), 's-fun', ICON.fun, false, P.t("ui.topbar.tipFun", "竞选与运作的钱。多数关键行动都要烧钱，投注加码也吃它；归零会寸步难行。"), "fun", G.fun) +
        stat(P.t("ui.topbar.resFav", "人情"), G.fav, 's-fav', ICON.fav, false, P.t("ui.topbar.tipFav", "攒下与欠下的人脉关照。可动用关系换取助力，也会被旧账反噬。"), "fav", G.fav) +
        stat(P.t("ui.topbar.resLev", "把柄"), G.lev, 's-lev', ICON.lev, false, P.t("ui.topbar.tipLev", "别人见不得光的事，单位是「份」——握着就能在关键时刻要挟、换取让步；但会随时间失效（当事人下台或事情过去）。"), "lev", G.lev || 0) +
        apprStat +
      '</div></div>';
  };

  /* ---------------- 学贷面板（v0.12 改制：单利 + 缓交 + PSLF 的实时读数） ----------------
     只在「还背着贷 / 攒过 PSLF / 已豁免」时出现，一行筹码：
       本金 · 今年欠息（资本化前的单利桶） · 缓交状态或申请入口 · PSLF 进度。
     缓交不自动触发 —— 是玩家看见欠息攒起来之后主动按的钮；点了立刻冻结还款与逾期计数。 */
  P.loanPanelHTML = function () {
    const G = P.G;
    const s = (P.balance() || {}).studentLoan || {};
    if (!s.enabled) return "";
    const pf = s.pslf || {};
    const has = (G.debt || 0) > 0 || (G.debtAccr || 0) > 0;
    if (!has && !G.pslfDone && !(G.pslfMonths > 0)) return "";
    const esc = function (v) { return String(v == null ? "" : v).replace(/"/g, "&quot;"); };
    const k = function (v) { return (v / 1000).toFixed(1); };
    const info = P.forbearInfo ? P.forbearInfo() : { canStart: false, active: false, quota: 0, per: 0, leftMonths: 0 };
    const chips = [];
    if (has) {
      const late = G.loanLate || 0;
      const lim = P.loanLateLimit ? P.loanLateLimit() : 0;
      const balTip = lim > 0 ? P.t("ui.topbar.loanBalTip",
        "学生贷款本金。每月按单利计提利息、今年攒下的欠息在 1 月并入本金；连续断供 {lim} 个月将信用破产。", { lim: lim })
        : P.t("ui.topbar.loanBalTipOff", "学生贷款本金。每月按单利计提利息、今年攒下的欠息在 1 月并入本金。");
      chips.push('<span class="gchip2' + (late >= 3 ? " bad" : " muted") + ' hastip" data-tip="' + esc(balTip) + '">' +
        P.t("ui.topbar.loanBal", "学贷 ${v}k", { v: k(G.debt || 0) }) + "</span>");
      if ((G.debtAccr || 0) > 0) {
        chips.push('<span class="gchip2 muted hastip" data-tip="' + esc(P.t("ui.topbar.loanAccrTip", "今年新攒的欠息（还没并进本金），1 月资本化；还款先填它、再抵本金。")) + '">' +
          P.t("ui.topbar.loanAccr", "欠息 ${v}k", { v: k(G.debtAccr) }) + "</span>");
      }
      if (info.active) {
        chips.push('<span class="gchip2 muted hastip" data-tip="' + esc(P.t("ui.topbar.forbearActiveTip", "缓交冻结中：本月不还款、不计逾期，但欠息照常攒；期满一次性并入本金并扣声望（征信留痕）。")) + '">' +
          P.t("ui.topbar.forbearLeft", "缓交中 · 剩 {n} 月", { n: info.leftMonths }) + "</span>");
      } else if (info.canStart) {
        chips.push('<button type="button" class="btn tiny forbear-btn hastip" data-tip="' +
          esc(P.t("ui.topbar.forbearBtnTip", "申请 {per} 个月缓交：冻结还款与逾期计数，欠息照攒；恢复时并入本金、声望 -{rep}。终身额度剩 {q} 个月。",
            { per: info.per, rep: ((s.forbear || {}).repCost == null ? 3 : s.forbear.repCost), q: info.quota })) +
          '" onclick="POTUS.forbearClick()">' + P.t("ui.topbar.forbearBtn", "申请缓交") + "</button>");
      }
      if (pf.months > 0 && !G.pslfDone && ((G.tier || 0) >= (pf.minTier == null ? 1 : pf.minTier) || (G.pslfMonths || 0) > 0)) {
        chips.push('<span class="gchip2 muted hastip" data-tip="' + esc(P.t("ui.topbar.pslfTip",
          "公职贷款豁免：任公职期间按时还款（不缓交、还满当月利息）攒 {n} 个合格月，剩余学贷一笔勾销。层级低于门槛的月份不计数。", { n: pf.months })) + '">' +
          P.t("ui.topbar.pslfProg", "豁免进度 {m}/{n}", { m: Math.min(G.pslfMonths || 0, pf.months), n: pf.months }) + "</span>");
      }
    } else if (G.pslfDone) {
      chips.push('<span class="gchip2 good hastip" data-tip="' + esc(P.t("ui.topbar.pslfDoneTip", "公职贷款豁免已生效——用整段公职生涯换掉了这笔债。")) + '">' +
        P.t("ui.topbar.pslfBadge", "✓ 学贷已豁免") + "</span>");
    } else if ((G.pslfMonths || 0) > 0) {
      chips.push('<span class="gchip2 good">' + P.t("ui.topbar.loanClearedShort", "✓ 学贷还清") + "</span>");
    }
    return '<div class="loanline">' + chips.join("") + "</div>";
  };
  /* 缓交按钮：冻结生效 → 刷新面板 + 落盘（这是一次真实的财务决定，即时保存） */
  P.forbearClick = function () {
    const info = P.forbearInfo ? P.forbearInfo() : null;
    if (!info || !info.canStart) return;
    if (!P.startForbear(info.per)) return;
    if (P.autosave) P.autosave();
    if (P.refreshPanel) P.refreshPanel();
  };

  /* ---------------- 竞选条（campaign.js 的界面投影） ----------------
   * 只在有一场活跃竞选时出现：这一场在选什么、走到第几幕、这一幕的窗口还剩几个月、
   * 选情表（动量 / 金库）的实时读数。让玩家看得见"这是一场一连串事件的竞选"，而不是一锤子买卖。
   * #23：条上还挂着一颗「投放把柄」按钮 —— 把 lev 花成这一幕的选情（每幕一次，双靶两本账）。
   * 能不能按、为什么按不了，口径全在 P.levDropInfo()，界面只负责照抄。 */
  P.levDropClick = function () {
    const r = P.levDrop ? P.levDrop() : null;
    if (!r) return;
    if (P.autosave) P.autosave();
    if (P.refreshPanel) P.refreshPanel();
  };
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
    const d = P.levDropInfo ? P.levDropInfo() : null;
    const drop = !d ? "" :
      '<div class="cmp-drop-row"><button class="btn cmp-drop' + (d.can ? '' : ' off') + '"' + (d.can ? ' onclick="POTUS.levDropClick()"' : ' disabled') +
      ' data-tip="' + esc(d.can ? d.label : d.why) + '">' +
      P.t("ui.topbar.dropBtn", "投放把柄") +
      '<b>' + (d.can ? "−" + d.cost : "") + '</b></button>' +
      (d.can ? '<span class="cmp-drop-p">' + esc(d.label) + '</span>' : '<span class="cmp-drop-p why">' + esc(d.why) + '</span>') + '</div>';
    return '<div class="campbar">' +
      '<div class="cmp-head"><span class="cmp-tag">' + P.t("ui.topbar.campTag", "竞选中") + '</span>' +
      '<b class="cmp-office">' + esc(cp.office) + '</b>' +
      '<span class="cmp-stage">' + P.t("ui.topbar.campStage", "第 {s} / {t} 幕 · {title}", { s: cp.stage, t: cp.stageCount, title: esc(cp.stageTitle) }) + '</span>' +
      left + '</div>' +
      (cp.lede ? '<div class="cmp-lede">' + esc(cp.lede) + '</div>' : "") +
      (cp.meters.length ? '<div class="cmp-meters">' + cp.meters.map(bar).join("") + '</div>' : "") +
      drop +
      '</div>';
  };

  /* ---------------- #21 M1 总统任期条（presidency.js 的界面投影）----------------
   * 只在入主白宫后出现。皮直接复用竞选条那一套（.campbar 的兄弟 .presbar + 同款进度条），
   * 因为玩家要读的是同一件事：「我此刻的势头值多少」。区别在两处：
   *   · 支持率是 0—100 的真百分比，不像 momentum 那样有 60 的满格参考值；
   *   · 条上没有「投放把柄」按钮 —— 竞选手段在任内不该还在手边（M2 的中期选举会另开行动）。
   * 非总统 / presidency.enabled=false 时返回空串，DOM 里什么都不留。 */
  P.presidencyHTML = function () {
    const ap = P.approvalPanel ? P.approvalPanel() : null;
    if (!ap) return "";
    const trend = ap.delta > 0 ? " up" : ap.delta < 0 ? " down" : "";
    const trendTxt = ap.delta > 0 ? "+" + ap.delta : ap.delta < 0 ? String(ap.delta) : "±0";
    return '<div class="campbar presbar band-' + ap.band.cls + '">' +
      '<div class="cmp-head"><span class="cmp-tag">' + P.t("ui.topbar.presTag", "在任") + "</span>" +
      '<b class="cmp-office">' + P.t("ui.topbar.presOffice", "总统") + "</b>" +
      '<span class="cmp-stage">' + P.t("ui.topbar.presTerm", "第 {t} 届 · 在任 {m} 个月", { t: ap.term, m: ap.months }) + "</span>" +
      '<span class="pres-band">' + ap.band.text + "</span></div>" +
      '<div class="pres-meter"><i>' + P.t("ui.topbar.presApproval", "支持率") + "</i>" +
      '<span class="cmp-track"><b style="width:' + ap.value + '%"></b></span>' +
      '<em>' + ap.value + "%</em>" +
      '<span class="pres-trend' + trend + '">' + trendTxt + "</span></div>" +
      "</div>";
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
    loan:       function () { return P.loanPanelHTML(); },
    officeCard: function () { return P.officeCard(); },
    attrs:      function () { return P.statusRows().attrs; },
    tags:       function () { return P.statusRows().tags; },
    wrath:      function () { return P.statusRows().wrath; },
    factions:   function () { return P.statusRows().factions; },
    contacts:   function () { return P.statusRows().contacts; }
  };
  P.STATUS_LAYOUT = [
    { cls: "idc-left",  items: ["identity", "officeProg"] },
    { cls: "idc-facts", items: ["date", "resources", "loan", "officeCard"] },
    { cls: "idc-chips", items: ["attrs", "cards", "tags", "wrath", "factions", "contacts"], collapse: "档案" }
  ];
  P.toggleChips = function (btn) {
    const box = btn.closest(".idc-chips");
    if (!box) return;
    box.classList.remove("auto-open");   // 玩家手动接管：取消自动展开的收回定时器
    const open = box.classList.toggle("open");
    btn.textContent = (open ? P.t("ui.topbar.chipsClose", "收起 ▴") : P.t("ui.topbar.chipsOpen", "档案 ▸"));
  };
  /* ---------------- 选择后「什么变了」红绿高亮（v0.11） ----------------
   * statusVals() 把状态栏里所有展示型数值拍成一张扁平快照（原始数，不含格式化）。
   * resolveChoice 在扣费/结算前拍一张、渲染后交 flashStatusDiffs 对照：
   *   · 变高的读数标绿 + 「+n」角标、变低的标红 + 「−n」，约 2.6 秒后自动淡去；
   *   · 只对带 data-diff 的元素生效（资源瓷贴 / 属性 / 派系 / 人脉 chip），
   *     竖屏默认折叠的档案 chip 虽被标上但看不见，等玩家展开档案时角标仍在，无害。 */
  P.statusVals = function () {
    const G = P.G, m = { rep: G.rep, fun: G.fun, fav: G.fav, lev: G.lev || 0 };
    /* #21 M1：总统支持率进对照表 —— 白宫卡结算完那一手，涨跌要标红标绿 */
    const ap = P.approvalPanel ? P.approvalPanel() : null;
    if (ap) m.appr = ap.value;
    const a = G.attr || {};
    ["CHA", "INT", "CUN"].forEach(function (k) { m["attr_" + k] = a[k] || 0; });
    const f = G.faction || {};
    for (const k in f) m["fac_" + k] = f[k] || 0;
    if (P.myContacts) P.myContacts().forEach(function (c) { m["ct_" + (c.id != null ? c.id : c.name)] = c.favor || 0; });
    /* 仇家仇恨值：与 chip 的 data-diff="wrath_<组>" 对齐，树敌那一手会被标红 */
    const wr = (G.counters) || {};
    for (const k in wr) if (k.indexOf("wrath_") === 0) m[k] = wr[k] || 0;
    return m;
  };
  P.flashStatusDiffs = function (prev) {
    if (!prev || typeof document === "undefined" || !document.getElementById) return;
    const box = document.getElementById("statusbox");
    if (!box || !box.querySelectorAll) return;
    const fmtDelta = function (key, d) {
      const sign = d > 0 ? "+" : "-";
      if (key === "fun") return sign + "$" + Math.round(Math.abs(d) / 1000) + "k";
      return sign + Math.abs(d);
    };
    let touchedChips = false;                    // 有无变动落在默认收起的「档案」块里
    box.querySelectorAll("[data-diff]").forEach(function (el) {
      const key = el.getAttribute("data-diff");
      const cur = Number(el.getAttribute("data-val"));
      if (!(key in prev) || !isFinite(cur)) return;
      const d = cur - prev[key];
      if (!d) return;
      el.classList.remove("chg-up", "chg-down");
      void el.offsetWidth;                       // 强制回流，保证连续两次选择都能重放动画
      el.classList.add(d > 0 ? "chg-up" : "chg-down");
      const old = el.querySelector(".chg"); if (old) old.remove();
      const badge = document.createElement("span");
      badge.className = "chg " + (d > 0 ? "u" : "d");
      badge.textContent = fmtDelta(key, d);
      (el.querySelector(".sbody") || el).appendChild(badge);
      if (el.closest && el.closest(".idc-chips") && !el.closest(".idc-chips.open")) touchedChips = true;
    });
    /* 档案默认收起（竖屏省地方）：若这一手改到了收起中的属性/派系/人脉，自动展开几秒，
       让红绿角标被看见，然后收回 —— 省地方与"看得清影响"两全。按钮文案交回 toggleChips，
       这里只挪 class，几秒后收回；玩家若已手动点开则尊重其状态，不强行收起。 */
    let autoOpened = null;
    if (touchedChips) {
      const chips = box.querySelector(".idc-chips:not(.open)");
      if (chips) { chips.classList.add("open", "auto-open"); autoOpened = chips; }
    }
    setTimeout(function () {
      if (autoOpened && autoOpened.classList.contains("auto-open")) autoOpened.classList.remove("open", "auto-open");
    }, 4200);
    setTimeout(function () {
      if (!document.getElementById("statusbox")) return;
      document.querySelectorAll("#statusbox .chg-up,#statusbox .chg-down").forEach(function (e) { e.classList.remove("chg-up", "chg-down"); });
      document.querySelectorAll("#statusbox .chg").forEach(function (b) { b.remove(); });
    }, 2600);
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
      P.presidencyHTML() +
      '</div></div>';
  };
})();
