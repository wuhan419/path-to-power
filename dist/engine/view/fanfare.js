/* ============================================================================
 * POTUS ENGINE · view/fanfare.js
 * 升职庆典弹窗（tier up fanfare）：层级每往上走一级，盖一层典礼窗。
 *
 * 为什么值得打断玩家：这款游戏的正反馈原本只有结算页里那行绿色「声望+6」——
 * 45 年一局、九级台阶，升职这个最大的里程碑和普通事件长得一模一样。
 * 数据一条都不新算：头衔查 reg.office、价码查 salaryAt、选区查 electorateAt，
 * 全是既有口径，窗子只负责把它们并排摆出来。
 *
 * 触发口径（effects.js 的 tier handler 入队，这里出队）：
 *   · 只认往上走 —— 资历闸拦住的（handler 提前 return）与 fall/弹劾的下跌都不进队；
 *   · 跳级（tier:+2/+3）算一件事，中间被跳过的级在窗子里标出来，因为那是笔资历债；
 *   · 关闭只认「就任 →」按钮：点背景不关、不自动消失。仪式不能有逃生口。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* 阶梯条：10 格台阶，从左（第 1 级）走到右（第 10 级）。
     走过的、正站上的、被跳过的三种状态。 */
  function ladderHTML(from, to) {
    const b = P.balance();
    let h = '<div class="ff-ladder" aria-hidden="true">';
    for (let t = b.tierMin; t <= b.tierMax; t++) {
      let cls = "step ffl";
      if (t === to) cls += " now";
      else if (t <= from) cls += " past";
      if (t > from && t < to) cls += " skip";
      h += '<i class="' + cls + ' tier-' + t + '"><b>' + (t + 1) + "</b></i>";
    }
    return h + "</div>";
  }

  /* 一行对比：旧值 → 新值（＋增量）。增量为 0 时不写废话。
     以 "+" 开头才算好消息（绿）；否则是注解（如升位后死忠被稀释 —— 数字确实变小了）。 */
  function rowHTML(label, oldS, newS, deltaS) {
    return '<div class="ff-row"><span class="ff-k">' + label + "</span>" +
      '<span class="ff-v"><s>' + oldS + "</s> <em>" + newS + "</em>" +
      (deltaS ? ' <u class="' + (deltaS.charAt(0) === "+" ? "up" : "note") + '">' + deltaS + "</u>" : "") + "</span></div>";
  }

  /* 纯函数：给定一条队列载荷，吐出弹窗内部 HTML。
     单独拆出来是为了能被 validate / smoke-ui 直接调用断言，不必真去点界面。 */
  P.fanfareHTML = function (q) {
    const G = P.G, b = P.balance();
    const top = q.to >= b.tierMax;
    const rows = [];
    const s0 = P.salaryAt ? P.salaryAt(q.from) : 0;
    const s1 = P.salaryAt ? P.salaryAt(q.to) : 0;
    rows.push(rowHTML(P.t("ui.fanfare.rowSalary", "月薪"), P.fmtUsd(s0), P.fmtUsd(s1),
      s1 > s0 ? "+" + P.fmtUsd(s1 - s0) : ""));
    rows.push(rowHTML(P.t("ui.fanfare.rowElectorate", "选区规模"), P.fmtVoterNum(q.size0 || 0), P.fmtVoterNum(q.size1 || 0),
      (q.size1 || 0) > (q.size0 || 0) ? "×" + Math.round((q.size1 / (q.size0 || 1)) * 10) / 10 : ""));
    rows.push(rowHTML(P.t("ui.fanfare.rowDiehard", "死忠支持者"), P.fmtVoterNum(q.die0 || 0), P.fmtVoterNum(q.die1 || 0),
      q.die1 > q.die0 ? "+" + P.fmtVoterNum(q.die1 - q.die0) : (q.die1 < q.die0 ? P.t("ui.fanfare.dieDiluted", "选区变大，密度被稀释") : "")));

    /* 下一级预告：门槛表与晋升判定同源（balance.tierGates + monthsAtTier） */
    let next;
    if (top) {
      next = '<div class="ff-next max">' + P.t("ui.fanfare.atMax", "台阶到头了。剩下的只有任期，和史书怎么写你。") + "</div>";
    } else {
      const GATES = b.tierGates || [8, 10, 12, 18, 20, 24, 28, 34, 40, 0];
      const need = GATES[Math.min(q.to, GATES.length - 1)];
      next = '<div class="ff-next">' + P.t("ui.fanfare.next", "下一级：{n} · 需在位 {need} 个月（已 {have}）",
        { n: P.tierName(q.to + 1), need: need, have: P.monthsAtTier ? P.monthsAtTier() : 0 }) + "</div>";
    }

    return '<div class="ff-kicker">' + P.t(top ? "ui.fanfare.kickerMax" : "ui.fanfare.kicker",
        top ? "权力之路 · 入主白宫" : "权力之路 · 就任典礼") + "</div>" +
      ladderHTML(q.from, q.to) +
      '<div class="ff-name">' + P.tierName(q.to) + "</div>" +
      '<div class="ff-was">' + P.t("ui.fanfare.was", "你从「{n}」走上来。", { n: P.tierName(q.from) }) + "</div>" +
      (q.to - q.from >= 2 ? '<div class="ff-skip">' + P.t("ui.fanfare.skip",
        "破格直提，连跳 {k} 级：被跳过的那几级没记下资历 —— 日后会有人拿这个说你闲话。",
        { k: q.to - q.from }) + "</div>" : "") +
      '<div class="ff-rows">' + rows.join("") + "</div>" +
      next +
      '<div class="ff-stat">' + P.t("ui.fanfare.stat", "本局第 {n} 次晋升 · {y} 年 · 生涯峰值第 {p} 级",
        { n: q.n || 1, y: G.year, p: (G.peakTier != null ? G.peakTier : G.tier) + 1 }) + "</div>" +
      '<button class="btn primary ff-go">' + P.t(top ? "ui.fanfare.goMax" : "ui.fanfare.go",
        top ? "宣誓就职 →" : "就任 →") + "</button>";
  };

  /* 出队并盖上一层庆典窗。返回 true = 弹了（调用方据此知道界面被占了）。
     同屏只留一层：沿用 .modal 的惯例，先清掉任何既有弹窗再挂自己的。
     没有 DOM 的环境（validate.js 里纯跑引擎）只清队列不弹窗 —— 队列是 UI 交接件，
     留在存档里等着下次顶出来反而不对。 */
  P.popFanfare = function () {
    const G = P.G;
    if (!G || !G.fanfareQ || !G.fanfareQ.length) return false;
    if (!document.body || typeof document.body.appendChild !== "function") { G.fanfareQ.length = 0; return false; }
    const q = G.fanfareQ.shift();
    const old = document.querySelector(".modal"); if (old) old.remove();
    const m = document.createElement("div");
    m.className = "modal fanfare";
    /* 刻意不绑背景关闭：点「就任 →」是唯一出口。 */
    m.innerHTML = '<div class="box"><div class="ff-rays" aria-hidden="true"></div>' + P.fanfareHTML(q) + "</div>";
    document.body.appendChild(m);
    const go = m.querySelector(".ff-go");
    if (go) go.onclick = function () { m.remove(); };
    return true;
  };

  /* 有没有待弹的窗（插桩点用它决定要不要占这一拍） */
  P.fanfarePending = function () {
    const G = P.G;
    return !!(G && G.fanfareQ && G.fanfareQ.length);
  };
})();
