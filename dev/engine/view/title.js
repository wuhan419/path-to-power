/* ============================================================================
 * POTUS ENGINE · view/title.js
 * 标题屏：游戏入口、读取存档、内容规模、语言切换。
 * v0.9：改版——居中主视觉（assets/hero.jpg）+ 去掉「时代」表述的统计文案。
 * 文案全部走 P.t(key, 中文原文)：中文不需要词典，缺英文时自动显示原文。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* 语言切换：切完写 localStorage 并重载（覆盖层是 boot 时一次性并入的） */
  function langBar() {
    const cur = P.locale.lang;
    const btn = (code, label) =>
      '<button class="btn" style="padding:2px 10px;font-size:.85em;margin-left:6px"' +
      (cur === code ? " disabled" : ' onclick="POTUS.i18n.setLang(\'' + code + '\')"') + ">" + label + "</button>";
    return '<div style="margin:14px 0 2px"><span class="muted">' +
      P.t("ui.title.langLabel", "语言：") + "</span>" +
      btn("zh", "简体中文") + btn("en", "English") + "</div>";
  }

  /* ---------------- 标题 ---------------- */
  P.renderTitle = function () {
    P.SCREEN = "title"; document.body.className = "";
    /* 主视觉：居中、限宽、圆角与纸面阴影；图片加载失败则整块安静隐藏（退回纯文字首页） */
    const hero =
      '<div class="hero-wrap" style="display:flex;justify-content:center;margin:18px 0 22px">' +
      '<img src="assets/hero.jpg" alt="' + P.t("ui.title.heroAlt", "权力之路") + '" decoding="async" ' +
      'style="max-width:min(440px,78vw);width:100%;height:auto;display:block;' +
      'border-radius:10px;border:1px solid rgba(0,0,0,.18);' +
      'box-shadow:0 10px 30px rgba(0,0,0,.28);object-fit:cover" ' +
      'onerror="this.parentNode.style.display=\'none\'">' +
      "</div>";
    P.app().innerHTML =
      '<div class="center" style="padding:26px 0">' +
      '<div class="masthead"><div class="title">' + P.t("ui.title.game", "权力之路") + "</div>" +
      '<div class="meta">' + P.t("ui.title.sub", "一个美国小伙的从政之路") + "<br>" +
      P.t("ui.title.tag", "文字驱动 · 政治生涯模拟") + "</div></div>" +
      hero +
      '<p class="muted">' + P.t("ui.title.p1",
        "《权力之路》是一款文字驱动的政治生涯模拟。你从 1980 年代一个一无所有的年轻人起步，" +
        "在四十年美国政治的风浪里经营声望、金脉与人情，一路从社区议会爬向州府、国会，直至问鼎白宫——或在中途轰然倒下。") + "</p>" +
      '<p class="muted">' + P.t("ui.title.p2",
        "玩法极简：选定难度与出身，开始你的从政路。每个月都会撞上真实历史事件与虚构风波" +
        "（挑战者号、伊朗门、9·11、金融危机、大选年……），你只需为每一次抉择押下砝码。每个决定都在改写" +
        "声望、资金、人情与把柄的天平，左右你的选民基本盘，决定你能否赢得选举、向上攀登。没有标准答案，" +
        "多种结局，等你走出属于自己的权力之路。") + "</p>" +
      '<button class="btn primary" onclick="POTUS.startCreate()">' + P.t("ui.title.newGame", "开始新游戏") + "</button> " +
      '<button class="btn" onclick="POTUS.openLoad()">' + P.t("ui.title.load", "读取存档") + "</button>" +
      langBar() + "</div>";
  };
})();
