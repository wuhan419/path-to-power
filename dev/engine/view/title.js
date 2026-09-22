/* ============================================================================
 * POTUS ENGINE · view/title.js
 * 标题屏：游戏入口、读取存档、内容包统计。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* ---------------- 标题 ---------------- */
  P.renderTitle = function () {
    P.SCREEN = "title"; document.body.className = "";
    P.app().innerHTML =
      '<div class="center" style="padding:30px 0">' +
      '<div class="masthead"><div class="title">权力之路</div>' +
      '<div class="meta">一个美国小伙的从政之路<br>文字驱动 · 政治生涯模拟 · 引擎 v' + P.VERSION + "</div></div>" +
      '<p class="muted">在真实的历史浪潮里，从毕业生爬向权力顶点——或摔下去。<br>掷骰决定命运，存档随时在手。</p>' +
      '<button class="btn primary" onclick="POTUS.startCreate()">开始新游戏</button> ' +
      '<button class="btn" onclick="POTUS.openLoad()">读取存档</button>' +
      '<p class="hintline">内容包数量：' + Object.keys(P.reg.era).length + ' 个时代 · ' + P.events.length + ' 个事件 · ' +
      Object.keys(P.reg.ending).length + " 条结局规则</p></div>";
  };
})();
