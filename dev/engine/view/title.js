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
      '<div class="meta">一个美国小伙的从政之路<br>文字驱动 · 政治生涯模拟</div></div>' +
      hero +
      '<p class="muted">《权力之路》是一款文字驱动的政治生涯模拟。你从 1980 年代一个一无所有的年轻人起步，' +
      '在四十年美国政治的风浪里经营声望、金脉与人情，一路从社区议会爬向州府、国会，直至问鼎白宫——或在中途轰然倒下。</p>' +
      '<p class="muted">玩法极简：选定难度与出身，开始你的从政路。每个月都会撞上真实历史事件与虚构风波' +
      '（挑战者号、伊朗门、9·11、金融危机、大选年……），你只需为每一次抉择押下砝码。每个决定都在改写' +
      '声望、资金、人情与把柄的天平，左右你的选民基本盘，决定你能否赢得选举、向上攀登。没有标准答案，' +
      '多种结局，等你走出属于自己的权力之路。</p>' +
      '<button class="btn primary" onclick="POTUS.startCreate()">开始新游戏</button> ' +
      '<button class="btn" onclick="POTUS.openLoad()">读取存档</button></div>';
  };
})();
