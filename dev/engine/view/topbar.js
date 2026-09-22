/* ============================================================================
 * POTUS ENGINE · view/topbar.js
 * 顶部状态条：日期/推进、topStatus 汇总条、职位卡（我是谁 / 选民 / 光谱 / 晋升进度）。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

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
    const ts = document.querySelector(".topstat");
    if (ts) ts.innerHTML = P.topStatus();
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
    /* 熬的年数按下一级职位加权：T1→T2 要 3 年，T3→T4 要 5 年，T4→T5 要 7 年
       （v0.5.4 用户实测反馈：28 岁干 5 年就州长太快）。 */
    const NEED = [30, 36, 36, 48, 60, 84];
    const needTenure = NEED[Math.min(G.tier, NEED.length - 1)];
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
    const lineDefs = [
      { h: "<b>" + P.officeName() + "</b> · T" + G.tier + tenureTxt,
        t: "现任职务与层级（T1 最低、越高越接近权力顶点）。在同一层级熬得越久，越接近晋升窗口。" },
      { h: (stateTxt ? stateTxt + " · " : "") + "选区规模 " + fmtNum(es.size) + " 人",
        t: "你所代表选区的选民总量——层级越高、盘子越大，竞选要触达的人越多。" },
      { h: "选民：死忠 " + fmtNum(vp.diehard) + " · 有好感 " + fmtNum(vp.warm) + " · 反对 " + fmtNum(vp.oppose) +
          ' <span class="muted">（选举底气 ' + es.pct + "/100）</span>",
        t: "死忠=几乎必到的票；有好感=看你表现的可能票；反对=对手的票。选举判定主要吃死忠，其次好感；底气 0–100。" },
      { h: "政治光谱：" + spectrum,
        t: "党派打底＋姿态偏移＋时代印记。它决定哪些事件与派系对你友好、哪些把你当异类。" }
    ];
    /* 晋升进度条：到 60 进"机会区间"（位置仍要等事件空缺）。标签 / 进度条 / 百分比 / 说明合并为一行。 */
    const prog = P.promotionProgress();
    const progTip = "在位时长 40% ＋ 声望 25% ＋ 选民底气 20% ＋ 组织关系 15%。到 60 进入机会区间——但晋升仍要等一个位置空出来（对应事件）。";
    const progHTML = G.tier < P.balance().tierMax
      ? '<div class="progrow' + (prog.ready ? " ready" : "") + '">' +
        '<div class="progline"><span class="prog-label">晋升' + (prog.ready ? "（机会区间）" : "") + '</span>' +
        '<div class="progbar"><i style="width:' + prog.pct + '%"></i><em style="left:60%"></em></div>' +
        '<span class="prog-pct">' + prog.pct + '</span>' +
        '<span class="prog-note hastip" data-tip="' + progTip.replace(/"/g, "&quot;") + '">' + prog.note + "</span></div></div>"
      : "";
    const escAttr = function (s) { return String(s).replace(/"/g, "&quot;"); };
    return '<div class="officecard">' + lineDefs.filter(function (d) { return d.h; }).map(function (d) {
      return '<div class="hastip" data-tip="' + escAttr(d.t) + '">' + d.h + "</div>";
    }).join("") + progHTML + "</div>";
  };

  /* 顶部状态条（v0.5.6 合并去重）：把"我是谁 / 关键资源 / 我现在是谁"全部收进页面顶端。
     · 第 1 行：姓名 · 日期（含"第 N 个年头"） · 轨道 · 声望/公信力/资金 · 健康/精力/人情
     · 第 2 行：职位卡 officeCard（职务·T层级（在位）｜州·选区规模｜选民池｜政治光谱｜晋升）
     原先右上角 .masthead .meta 与本条重复（姓名、年月各两遍），职务/在位/州也与职位卡重复，
     均已合并为各出现一次。 */
  P.topStatus = function () {
    const G = P.G, a = G.attr, b = P.balance();
    const chip = function (k, v, cls, t) {
      return '<span class="tchip' + (cls ? ' ' + cls : '') + (t ? ' hastip' : '') + '"' +
        (t ? ' data-tip="' + String(t).replace(/"/g, '&quot;') + '"' : '') +
        '><span class="tk">' + k + '</span><b>' + v + '</b></span>';
    };
    const track = (P.reg.track[G.track] || { name: G.track }).name;
    const eraName = (P.reg.era[G.era] || { name: G.era }).name;
    const yrs = G.age - b.startAge + 1;
    return '<div class="tsrow">' +
        '<span class="tname">' + G.name + '</span>' +
        chip('时代', eraName, '', '当前时代——它决定世界议题、媒介与事件池，也给整个画面定主色调。') +
        chip('日期', P.dateText() + ' · 第 ' + yrs + ' 个年头') +
        chip('轨道', track, '', '你现在走的这条路：选仕途、幕僚、其它轨道各有不同的晋升线与事件池。') +
        '<span class="tsep"></span>' +
        chip('声望', G.rep, '', '名望与曝光度。很多事件的门槛、派系态度与晋升都看它；太低会被人当无名小卒。') +
        chip('公信力', a.INTG, '', '诚信口碑。丑闻与失信会拉低它；它是一些清正选项与关键判定的门槛。') +
        chip('资金', '$' + (G.fun / 1000).toFixed(0) + 'k', '', '竞选与运作的钱。多数关键行动都要烧钱，投注加码也吃它；归零会寸步难行。') +
        '<span class="tsep"></span>' +
        chip('健康', G.hp, G.hp <= 30 ? 'bad' : '', '身体本钱。连轴转会透支；太低会触发健康危机，甚至病故退场。') +
        chip('精力', G.ap, G.ap <= 1 ? 'bad' : '', '本月可用的行动力。处理一件事往往吃掉若干点，投精力博胜算也花它；逐月回满。') +
        chip('人情', G.fav, '', '攒下与欠下的人脉关照。可动用关系换取助力，也会被旧账反噬。') +
      '</div>' +
      '<div class="tsrow tsoffice">' + P.officeCard() + '</div>';
  };
})();
