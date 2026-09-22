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
  /* v0.5.6：日期/身份/职位信息全部合并进顶部状态条（.topstat）——
     原先右上角的 .masthead .meta 与顶部条重复（姓名、年月各出现两遍），已删掉。
     推进月份/事件后刷新顶部条即可（保留函数名，调用点不动）。 */
  P.tickDate = function () {
    const sb = document.getElementById("statusbox");
    if (sb) sb.innerHTML = P.statusPanel();
    const id = document.getElementById("ident");
    if (id) id.innerHTML = P.identityHTML();
  };

  /* 头像路径：难度×层级 → assets/heroes/hero-<难度>-<层级>.jpg。
     缺失难度信息（旧存档）退回 normal；文件缺失由 onerror 在界面层隐藏，绝不影响布局。 */
  P.heroPortrait = function () {
    const G = P.G; if (!G) return "";
    const d = G.difficulty || "normal";
    const t = G.tier || 0;
    return "assets/heroes/hero-" + d + "-" + t + ".jpg";
  };

  /* 核心身份徽标（顶栏右侧）：姓名 · 职位 · T层级 · 年龄 ·（在位）
     ——玩家最该盯的“等级”信息，包在 #ident 里按 tier 上色（见 CSS .tb-ident.tier-N）。 */
  P.identityHTML = function () {
    const G = P.G;
    const tenure = P.monthsAtTier();
    const tenureTxt = tenure >= 12
      ? "在位 " + Math.floor(tenure / 12) + " 年" + (tenure % 12 ? "余" : "")
      : "在位 " + (tenure || 0) + " 个月";
    /* 分组徽标（v0.8）：左侧「T 层级牌」实心色块（按层级配色），右侧上下两行——
       职位是玩家最该盯的「身份」，给最大字号做主视觉；姓名·年龄·在位收成淡注副行小字。
       层级 class 挂在 .idcard 内层，好让 tickDate 用 innerHTML 刷新时配色随之更新。 */
    /* 晋升就绪度小条（v0.8 从「选区基本盘」上移到顶栏，与身份并列——玩家最该盯的「差多少能升」） */
    const escAttr = function (s) { return String(s).replace(/"/g, "&quot;"); };
    const b = P.balance();
    let progChip;
    if (G.tier >= b.tierMax) {
      progChip = '<span class="id-prog atmax"><b>等级 ' + (G.tier + 1) + ' · 权力顶点</b></span>';
    } else {
      const prog = P.promotionProgress();
      const tip = prog.note + "。晋升就绪度＝在位 40%＋声望 25%＋选民底气 20%＋组织关系 15%；满 60 进机会区间，但晋升仍需等一个空缺位置。";
      progChip = '<span class="id-prog' + (prog.ready ? " ready" : "") + ' hastip" data-tip="' + escAttr(tip) + '">' +
        '<span class="idp-cap">晋升</span>' +
        '<span class="idp-bar"><i style="width:' + prog.pct + '%"></i></span>' +
        '<span class="idp-pct">' + prog.pct + '</span>' +
        '<span class="idp-next">→ ' + prog.nextName + '</span>' +
        '</span>';
    }
    const port = P.heroPortrait ? P.heroPortrait() : "";
    return '<span class="idcard tier-' + G.tier + '">' +
      (port ? '<span class="portrait"><img src="' + port + '" alt="' + escAttr(G.name) + '"' +
        ' onerror="this.closest(\'.portrait\').style.visibility=\'hidden\'"></span>' : "") +
      '<span class="id-tier">等级' + (G.tier + 1) + '</span>' +
      '<span class="id-main">' +
        '<span class="id-office">' + P.officeName() + '</span>' +
        '<span class="id-sub">' +
          '<span class="id-name">' + G.name + '</span>' +
          '<span class="id-sep">·</span>' +
          '<span class="id-age">' + G.age + ' 岁</span>' +
          '<span class="id-sep">·</span>' +
          '<span class="id-tenure">' + tenureTxt + '</span>' +
        '</span>' +
      '</span>' +
      '<span class="id-vdiv"></span>' +
      progChip +
    '</span>';
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
      "无名之辈", "圈内人", "地方官员", "地方资深", "州级新人",
      "州级人物", "联邦官员", "全国性人物", "重量级人物", "权力顶点"
    ])[G.tier] || ("等级 " + (G.tier + 1));
  };
  /* ---------------- 晋升进度条（v0.5.2 用户设计） ----------------
   * 进度不是"经验值"，是"你准备好了吗"的综合读数：
   *   在位时长（熬）40% + 声望 25% + 选民底气 20% + 组织关系 15%
   * 到 60 就进入"有机会"区间——但晋升仍要等一个位置空出来（prog_* 事件），
   * 进度只决定机会来的时候你抓不抓得住。满了不晋升也正常：位置就那么多。 */
  P.promotionProgress = function () {
    const G = P.G, b = P.balance();
    if (G.tier >= b.tierMax) return { pct: 100, ready: true, note: "已在顶点" };
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
    /* v0.5.6：职位卡从左栏「状态」提到顶部状态条，横向排布。原首行的「职位（在位 N 个月）」
       与顶部条原来的「职务 / 在位」两个 chip 重复 —— 合并成一行：职位 · T层级（在位 N 个月）。 */
    /* v0.8 压高度：选区规模+光谱缩略进标题行；晋升进度上移到顶栏身份徒章（identityHTML）。
       卡体只留最关键的「选民三档 + 底气」一行。 */
    let specShort = partyName + (G.stance === "outsider" ? "·反建制" : "");
    const specMarks = [["wave_tea", "茶党"], ["wave_occupy", "占领"], ["wave_antiwar", "反战"], ["cross_insider", "机器"], ["fallen", "下野"]];
    specShort += specMarks.filter(function (m) { return P.hasFlag(m[0]); }).map(function (m) { return "·" + m[1]; }).join("");
    const metaTxt = (stateTxt ? stateTxt + " · " : "") + "选区 " + fmtNum(es.size) + " · " + specShort;
    const spectrumTip = "选区规模：层级越高盘子越大。光谱=党派打底+姿态偏移+时代印记，决定哪些事件与派系对你友好、哪些把你当异类。";
    /* 选民三档是本卡的核心读数 → 数字做大、按语义配色（死忠绿/好感金/反对红），标签小字退到上方 */
    const voterLine = '<span class="vt vt-die"><i>死忠</i><b>' + fmtNum(vp.diehard) + '</b></span>' +
      '<span class="vt vt-warm"><i>有好感</i><b>' + fmtNum(vp.warm) + '</b></span>' +
      '<span class="vt vt-oppose"><i>反对</i><b>' + fmtNum(vp.oppose) + '</b></span>' +
      '<span class="vt-power hastip" data-tip="\u9009\u4e3e\u5e95\u6c14\uff1a\u4e09\u6863\u9009\u6c11\u7684\u7efc\u5408\u53ef\u6253\u5206，0–100">\u5e95\u6c14 <b>' + es.pct + '</b><em>/100</em></span>';
    const voterTip = "死忠=几乎必到的票；有好感=看你表现的可能票；反对=对手的票。选举判定主要吃死忠，其次好感；底气 0–100。";
    const escAttr = function (s) { return String(s).replace(/"/g, "&quot;"); };
    return '<div class="officecard">' +
      '<div class="oc-head"><span class="oc-title">选区基本盘</span>' +
        '<span class="oc-meta hastip" data-tip="' + escAttr(spectrumTip) + '">' + metaTxt + '</span></div>' +
      '<div class="oc-rows"><div class="ocline hastip" data-tip="' + escAttr(voterTip) + '">' + voterLine + "</div></div>" +
      "</div>";
  };

  /* 顶部状态条（v0.5.6 合并去重）：把"我是谁 / 关键资源 / 我现在是谁"全部收进页面顶端。
     · 第 1 行：姓名 · 日期（含"第 N 个年头"）
     · 资源瓷贴：声望 / 资金 / 人情（精力·健康已于 v0.9 退役，不再上屏）
     · 第 2 行：职位卡 officeCard（职务·T层级（在位）｜州·选区规模｜选民池｜政治光谱｜晋升）
     原先右上角 .masthead .meta 与本条重复（姓名、年月各两遍），职务/在位/州也与职位卡重复，
     均已合并为各出现一次。 */
  P.topStatus = function () {
    const G = P.G, a = G.attr, b = P.balance();
    const esc = function (s) { return String(s).replace(/"/g, '&quot;'); };
    /* 精简元信息 chip（时代/日期/轨道）——保持轻量文字，不与资源瓷贴抢戏 */
    const chip = function (k, v, t) {
      return '<span class="tchip"' + (t ? ' data-tip="' + esc(t) + '"' : '') +
        '><span class="tk">' + k + '</span><b>' + v + '</b></span>';
    };
    /* 资源瓷贴：小图标 + 名称 + 大号数值，按资源语义着色；bad 时整块转红示警 */
    const stat = function (k, v, cls, icon, bad, t) {
      return '<span class="stat ' + cls + (bad ? ' bad' : '') + '"' +
        (t ? ' data-tip="' + esc(t) + '"' : '') + '>' +
        '<span class="sicon">' + icon + '</span>' +
        '<span class="sbody"><span class="slab">' + k + '</span><b class="sval">' + v + '</b></span></span>';
    };
    /* 图标用 currentColor 描边/填充，颜色由 .stat 的 --sc 变量决定，风格贴合纸面克制 */
    const ICON = {
      rep:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.1 6.6.6-5 4.4 1.5 6.5L12 16.9 5.9 20.1 7.4 13.6l-5-4.4 6.6-.6z"/></svg>',
      intg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l7 2.6V12c0 4.3-2.9 7.4-7 9-4.1-1.6-7-4.7-7-9V5.6z"/></svg>',
      fun:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M16.5 6.5H10a3 3 0 000 6h4a3 3 0 010 6H7"/></svg>',
      hp:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.5S4 15.6 4 9.9C4 7.2 6 5.2 8.5 5.2c1.6 0 3 .9 3.5 2 .5-1.1 1.9-2 3.5-2C18 5.2 20 7.2 20 9.9c0 5.7-8 10.6-8 10.6z"/></svg>',
      ap:   '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13z"/></svg>',
      fav:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0111 0"/><path d="M16 5.4a3.2 3.2 0 010 5.9M18.5 20a5.5 5.5 0 00-2.8-4.6"/></svg>'
    };
    const yrs = G.age - b.startAge + 1;
    /* v0.9：去掉「年代」概念（现在是按绝对年月推进的连续时间轴）与「轨道」（demo 期只一条轨道），
       顶栏只保留日期。要恢复：把下面两个 chip 加回来即可。 */
    return '<div class="tsrow tsmeta">' +
        chip('日期', P.dateText() + ' · 第 ' + yrs + ' 个年头') +
      '</div>' +
      '<div class="tsrow statgrid">' +
        stat('声望', G.rep, 's-rep', ICON.rep, false, '名望与曝光度（含风评与丑闻）。很多事件的门槛、派系态度与晋升都看它；太低会被人当无名小卒。') +
        stat('资金', '$' + (G.fun / 1000).toFixed(0) + 'k', 's-fun', ICON.fun, false, '竞选与运作的钱。多数关键行动都要烧钱，投注加码也吃它；归零会寸步难行。') +
        stat('人情', G.fav, 's-fav', ICON.fav, false, '攒下与欠下的人脉关照。可动用关系换取助力，也会被旧账反噬。') +
      '</div>' +
      '<div class="tsrow tsoffice">' + P.officeCard() + '</div>';
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
      '<span class="cmp-left' + (cp.stepLeft <= 1 ? ' warn' : '') + '">这一幕还剩 ' + cp.stepLeft + ' 个月</span>';
    return '<div class="campbar">' +
      '<div class="cmp-head"><span class="cmp-tag">竞选中</span>' +
      '<b class="cmp-office">' + esc(cp.office) + '</b>' +
      '<span class="cmp-stage">第 ' + cp.stage + ' / ' + cp.stageCount + ' 幕 · ' + esc(cp.stageTitle) + '</span>' +
      left + '</div>' +
      (cp.lede ? '<div class="cmp-lede">' + esc(cp.lede) + '</div>' : "") +
      (cp.meters.length ? '<div class="cmp-meters">' + cp.meters.map(bar).join("") + '</div>' : "") +
      '</div>';
  };

  /* ---------------- 状态区（v0.8 两栏重构） ----------------
     顶栏只留游戏级操作后，原本散在「页面顶端 .topstat」+「左栏 .panel」两块的状态信息
     合并进右栏顶部的 #statusbox，按重要度自上而下：
       身份条 + 资源瓷贴 + 职位卡（.topstat，按 T0–T5 配色）
       → 属性 / 派系 / 人脉 / 把柄 / 标签 / 日志（.sb-detail）
     外壳 .sb.tier-N 供 CSS 按当前层级上色（职位徽标底色 + 状态区左描边）。 */
  P.statusPanel = function () {
    const G = P.G;
    return '<div class="sb tier-' + G.tier + '">' +
      '<div class="topstat">' + P.topStatus() + '</div>' +
      P.campaignHTML() +
      '<div class="panel sb-detail">' + P.statusDetailHTML() + '</div>' +
      '</div>';
  };
})();
