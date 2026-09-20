/* ============================================================================
 * POTUS ENGINE · art.js
 * 事件配图的解析顺序（三级降级）：
 *     1) 事件自带的 ev.art（专属图）
 *     2) 事件类型（category）的默认图 —— 内容在 content/05-categories.js 里定义
 *     3) 引擎内置的通用图（兜底，永远有图）
 * 全部是程序化 SVG，零依赖、零外部图片。
 * 想换成真图片：让 ev.art / category.art 返回 <img src="..."> 之类的 HTML 即可。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  P.artRenderers = [];          // 内容级自定义渲染器（POTUS.art(fn) 注册），最优先
  P.art = function (fn) { P.artRenderers.push(fn); };

  function css(varName, fallback) {
    try {
      const v = getComputedStyle(document.body).getPropertyValue(varName).trim();
      return v || fallback;
    } catch (e) { return fallback; }
  }

  const SIZE = 132;

  /* 把任意绘制函数包成统一尺寸的 SVG 外框 */
  P.artFrame = function (inner, ink, base) {
    return '<svg class="art" viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice">' +
      '<rect width="120" height="120" fill="' + base + '"/>' +
      '<g opacity=".10">' +
      '<rect x="0" y="0" width="120" height="1" fill="' + ink + '"/>' +
      '<rect x="0" y="30" width="120" height="1" fill="' + ink + '"/>' +
      '<rect x="0" y="60" width="120" height="1" fill="' + ink + '"/>' +
      '<rect x="0" y="90" width="120" height="1" fill="' + ink + '"/>' +
      '<rect x="30" y="0" width="1" height="120" fill="' + ink + '"/>' +
      '<rect x="60" y="0" width="1" height="120" fill="' + ink + '"/>' +
      '<rect x="90" y="0" width="1" height="120" fill="' + ink + '"/>' +
      "</g>" + inner + "</svg>";
  };

  /* 事件标题印在图片底部（像报纸图片说明）
     导出成 P.artCaption：内容级渲染器（如 content/09-photo-art.js 的照片层）
     需要自己拼一张 SVG 兜底图时，可以复用同一条标题带，避免两处各写一份。 */
  function caption(ev, ink) {
    const t = String(ev.title || "").slice(0, 12);
    if (!t) return "";
    return '<rect x="0" y="99" width="120" height="21" fill="' + ink + '" opacity=".55"/>' +
      '<text x="60" y="113" fill="#fff" font-size="9" text-anchor="middle">' + t + "</text>";
  }
  P.artCaption = caption;

  P.artSVG = function (ev) {
    /* 1) 内容级渲染器（最高优先，返回 null 则继续往下） */
    for (let i = 0; i < P.artRenderers.length; i++) {
      const r = P.artRenderers[i](ev, P);
      if (r) return r;
    }
    /* 2) 事件专属图 */
    if (typeof ev.art === "function") {
      const r = ev.art(ev, P);
      if (r) return r;
    }
    /* 3) 类型默认图 */
    const cat = P.category(ev.category);
    if (cat && typeof cat.art === "function") {
      const r = cat.art(ev, P, { ink: cat.ink || "#fff", base: cat.base || css("--era1", "#3a4a63"), caption: caption });
      if (r) return r;
    }
    /* 4) 内置兜底 */
    return P.artFallback(ev);
  };

  P.artFallback = function (ev) {
    const c1 = css("--era1", "#3a4a63");
    const c2 = css("--era3", "#caa53a");
    const t = String(ev && ev.title || "").length % 3;
    const shape = t === 0 ? '<polygon points="60,26 98,88 22,88" fill="' + c2 + '" opacity=".55"/>'
      : t === 1 ? '<rect x="32" y="32" width="56" height="56" fill="' + c2 + '" opacity=".5"/>'
        : '<circle cx="60" cy="60" r="34" fill="' + c2 + '" opacity=".5"/>';
    return P.artFrame(shape + caption(ev || {}, c1), "#fff", c1);
  };
})();
