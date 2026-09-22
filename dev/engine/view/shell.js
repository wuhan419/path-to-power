/* ============================================================================
 * POTUS ENGINE · view/shell.js
 * 外壳：屏幕状态、启动流程、悬浮说明气泡、操作按钮组。
 * 必须最先加载（P.SCREEN 与 boot 在这里定义）。界面完全由注册表驱动。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;
  P.SCREEN = "title";

  /* 操作按钮组：右栏顶部 opsbar 与旧版整页 toolbar 共用。纯本地操作——
     存档 / 读档 / 导出 / 导入 / 退出。大模型功能、以及任何实名收款/打赏入口
     均已整体移除（公开发包的政治题材不应携带可定位到作者身份的渠道）。 */
  P.opsButtons = function () {
    return '<button class="btn" onclick="POTUS.openLog()">动态</button>' +
      '<button class="btn" onclick="POTUS.quickSave()">保存</button>' +
      '<button class="btn" onclick="POTUS.openLoad()">读取</button>' +
      '<button class="btn" onclick="POTUS.exportSave()">导出</button>' +
      '<button class="btn" onclick="POTUS.importSave()">导入</button>' +
      '<button class="btn" onclick="if(confirm(\'确定放弃本局？\'))POTUS.renderTitle()">退出</button>';
  };
  P.toolbarHTML = function () {
    return '<div class="toolbar">' + P.opsButtons() + "</div>";
  };

  /* v0.8 两栏重构：游戏级操作（保存/读取/导出/导入/退出）从左栏与右栏 opsbar
     提到独立的顶部栏。左 = 操作按钮，右 = 游戏标题。这些是对「游戏本身」的操作，
     与右栏底部的「对局操作」（继续 / 选项 / 结算）分属两个层级。 */
  /* v0.8 顶栏：左 = 游戏级操作（含「动态」弹窗）；右 = 核心身份徽标（取代旧标题
     “权力之路”）——姓名·职位·T层级·年龄·在位，像别的游戏的“等级栏”，按层级配色。
     徒章包在 #ident 里，随月份/事件刷新（见 topbar.js 的 identityHTML / refreshPanel）。 */
  P.topbarHTML = function () {
    return '<header class="topbar">' +
      '<div class="tb-ops">' + P.opsButtons() + '</div>' +
      '<div class="tb-ident" id="ident">' + P.identityHTML() + '</div>' +
      '</header>';
  };

  /* ---------------- 悬浮说明气泡（固定层，避免被边栏 overflow 裁切） ----------------
     见 style.css #tipbox 注释。要点：
     · 气泡挂在 <body>、position:fixed —— 不被任何祖先的 overflow 裁掉，恒在最顶层；
     · 横向位置夹在「悬浮元素所属栏」（.col-left/.col-right；不属于任何栏则退到视口）
       之内，保证不越出边栏；下方放不下时自动翻到元素上方。 */
  /* 宿主是否具备真实 DOM。tools/validate.js 用极简 stub 跑引擎（window=global、body 无
     appendChild），那里没有可用的 DOM API —— 直接停用气泡，绝不能因此拖垮加载流程。 */
  function tipReady() {
    return typeof document !== "undefined" && document &&
      typeof document.addEventListener === "function" &&
      typeof document.createElement === "function" &&
      document.body && typeof document.body.appendChild === "function" &&
      typeof window !== "undefined" && window && typeof window.addEventListener === "function";
  }
  function tipLayer() {
    if (!tipReady()) return null;
    let el = document.getElementById("tipbox");
    if (!el) { el = document.createElement("div"); el.id = "tipbox"; document.body.appendChild(el); }
    return el;
  }
  function showTip(anchor) {
    const text = anchor.getAttribute("data-tip");
    if (!text) return;
    const el = tipLayer();
    if (!el || !el.classList) return;
    el.textContent = text;                 // 用 textContent，天然免疫注入
    el.classList.add("on");
    const ar = anchor.getBoundingClientRect();
    /* 横向夹取边界：优先所属栏，其次视口 */
    let cl = 8, cr = window.innerWidth - 8;
    const col = anchor.closest ? anchor.closest(".col-left,.col-right") : null;
    if (col) { const r = col.getBoundingClientRect(); cl = r.left + 4; cr = r.right - 4; }
    el.style.maxWidth = Math.min(300, Math.max(140, cr - cl)) + "px";
    const tr = el.getBoundingClientRect();  // 定宽后再量，尺寸才准
    let left = ar.left;
    if (left + tr.width > cr) left = cr - tr.width;
    if (left < cl) left = cl;
    const gap = 6;
    let top = ar.bottom + gap;
    if (top + tr.height > window.innerHeight - 4) top = ar.top - gap - tr.height;  // 下方放不下 → 翻上方
    if (top < 4) top = 4;
    el.style.left = Math.round(left) + "px";
    el.style.top = Math.round(top) + "px";
  }
  function hideTip() {
    if (!tipReady()) return;
    const el = document.getElementById("tipbox");
    if (el && el.classList) el.classList.remove("on");
  }
  function bindTooltip() {
    if (!tipReady()) return;   // 无 DOM 宿主（validate.js）：跳过绑定
    /* 事件委托：内容动态重渲染也不需要重新绑 */
    document.addEventListener("mouseover", function (e) {
      const t = e.target && e.target.closest ? e.target.closest("[data-tip]") : null;
      if (t) showTip(t);
    });
    document.addEventListener("mouseout", function (e) {
      const t = e.target && e.target.closest ? e.target.closest("[data-tip]") : null;
      if (!t) return;
      const to = e.relatedTarget;
      if (to && t.contains && t.contains(to)) return;   // 只是移到了子节点，不收起
      hideTip();
    });
    window.addEventListener("scroll", hideTip, true);   // 栏内滚动 / 页面滚动都收起，避免错位
    window.addEventListener("resize", hideTip);
  }

  /* ---------------- 启动 ---------------- */
  P.boot = function () {
    bindTooltip();
    if (!Object.keys(P.reg.era).length) {
      P.app().innerHTML = '<div class="center" style="padding:40px"><h2>未加载任何内容包</h2><p class="muted">请在 content/ 下至少提供一个时代（era）内容包，并在 index.html 的清单中引入。</p></div>';
      return;
    }
    P.renderTitle();
  };
})();
