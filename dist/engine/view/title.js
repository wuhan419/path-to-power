/* ============================================================================
 * POTUS ENGINE · view/title.js
 * 标题屏：游戏入口、读取存档、内容规模。
 * v0.9：改版——居中主视觉（assets/hero.jpg）+ 去掉「时代」表述的统计文案。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* ---------------- 标题 ---------------- */
  P.renderTitle = function () {
    P.SCREEN = "title"; document.body.className = "";
    /* 主视觉：居中、限宽、圆角与纸面阴影；图片加载失败则整块安静隐藏（退回纯文字首页） */
    const hero =
      '<div class="hero-wrap" style="display:flex;justify-content:center;margin:18px 0 22px">' +
      '<img src="assets/hero.jpg" alt="权力之路" decoding="async" ' +
      'style="max-width:min(440px,78vw);width:100%;height:auto;display:block;' +
      'border-radius:10px;border:1px solid rgba(0,0,0,.18);' +
      'box-shadow:0 10px 30px rgba(0,0,0,.28);object-fit:cover" ' +
      'onerror="this.parentNode.style.display=\'none\'">' +
      "</div>";
    P.app().innerHTML =
      '<div class="center" style="padding:26px 0">' +
      '<div class="masthead"><div class="title">权力之路</div>' +
      '<div class="meta">一个美国小伙的从政之路<br>文字驱动 · 政治生涯模拟 · 引擎 v' + P.VERSION + "</div></div>" +
      hero +
      '<p class="muted">从社区里那个啥都没有的年轻人做起，在历史的浪潮里一步一步爬向权力顶点——或摔下去。<br>选择难度，投出命运，存档随时在手。</p>' +
      '<button class="btn primary" onclick="POTUS.startCreate()">开始新游戏</button> ' +
      '<button class="btn" onclick="POTUS.openLoad()">读取存档</button>' +
      '<p class="hintline">内容规模：' + P.events.length + ' 个事件 · ' +
      Object.keys(P.reg.ending).length + ' 条结局 · 5 档难度起步</p></div>';
  };
})();
