/* ============================================================================
 * CONTENT · 09-photo-art.js
 * 事件配图的「照片层」—— 把真实图片挂到事件卡上。
 *
 * 引擎的配图解析顺序（engine/art.js 的 P.artSVG）：
 *     1) 内容级渲染器（POTUS.art(fn) 注册）   ← 本文件挂在这一层，最优先
 *     2) 事件自带的 ev.art
 *     3) 事件类型的默认图（content/05-categories.js 里的程序化 SVG）
 *     4) 引擎内置兜底（永远有图）
 *
 * 所以这里只做一件事：能给照片就给照片，**给不了就 return null**，
 * 让下面三层照常工作。缺照片、关照片、没登记的类型，都不会白屏。
 *
 * 三条硬规矩：
 *   ① 图片文件名由 POTUS.define("photo", …) 登记，不在代码里硬编码路径。
 *      想换图 → 把新图命名成 <类型 key>.jpg 覆盖 assets/events/ 下的同名文件即可。
 *      想让某个事件用自己的图 → 在该事件里写 ev.photo = "my-shot.jpg"。
 *      想让某个事件不要照片 → 写 ev.photo = false。
 *   ② 每张照片卡里都预先垫了一张"本来会画的"程序化 SVG（.art-back）。
 *      图片加载失败时（onerror）把它翻出来顶上，玩家不会看到破图 ——
 *      只拷了部分文件 / 改了文件名 的常见事故都不会破坏观感。
 *   ③ 照片层坏掉（抛异常）也不能连累配图：整段逻辑包在 try 里，出错就退回 SVG。
 *
 * 文件清单与来源见 docs/CONTENT-SCHEMA.md §4.15。
 * ==========================================================================*/
(function () {
  const P = POTUS;

  /* ---------- 照片登记表：类型 key → 文件名 ----------
     命名约定：<类型 key>.jpg。新增类型就加一行。 */
  POTUS.define("photo", {
    dir: "assets/events/",
    files: {
      general: "general.jpg",     // 综合：发布台 / 记者会
      career: "career.jpg",       // 仕途：讲台与聚光灯
      political: "political.jpg", // 党务：签字落笔
      media: "media.jpg",         // 舆论：版面与流量
      scandal: "scandal.jpg",     // 丑闻：围堵与标语
      finance: "finance.jpg",     // 金钱：大厅里的那件东西
      romance: "romance.jpg",     // 私情：灯下的两个人
      civil: "civil.jpg",         // 民权：街上的人群
      crisis: "crisis.jpg",       // 危机：从阴影里长出来的东西
      foreign: "foreign.jpg",     // 外交：握手与地图
      shady: "shady.jpg",         // 灰产：不该被拍到的那一面
      govt:  "govt.jpg"           // 政务：日常公务、选民接待
    }
  });

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* 把"这个类型本来会画的那张 SVG"先算出来，垫在照片底下备用。
     直接调 category.art，不经过 P.artSVG —— 否则会绕回本渲染器，无限递归。 */
  function svgBackup(ev) {
    const cat = P.category(ev.category);
    if (!cat || typeof cat.art !== "function") return "";
    const r = cat.art(ev, P, {
      ink: cat.ink || "#3a4a63",
      base: cat.base || "#e8e2d2",
      caption: P.artCaption
    });
    return r || "";
  }

  P.art(function (ev, PP) {
    if (!ev) return null;
    try {
      if (ev.photo === false || ev.photo === "") return null;   // 显式关掉 → 走 SVG
      const table = PP.reg.photo || {};
      const dir = table.dir || "assets/events/";
      const files = table.files || {};
      const file = typeof ev.photo === "string" ? ev.photo : files[ev.category];
      if (!file) return null;                                   // 没登记 → 交给下一层
      const cat = PP.category(ev.category);
      const tag = (cat && cat.name) || "";
      const back = svgBackup(ev);
      const pnum = ev.id ? esc(ev.id) : esc(ev.category || "");
      return '<figure class="art art-press">' +
        '<img src="' + dir + encodeURIComponent(file) + '" alt="' + esc(ev.title || "") + '"' +
        ' onerror="this.closest(\'.art-press\').classList.add(\'art-press-broken\')">' +
        (tag ? '<span class="art-ptag">头版 · ' + esc(tag) + "</span>" : "") +
        '<span class="art-pnum">卷宗 ' + pnum + "</span>" +
        (back ? '<span class="art-back" aria-hidden="true">' + back + "</span>" : "") +
        "</figure>";
    } catch (e) {
      return null;   // 照片层自己的问题，绝不影响配图
    }
  });
})();
