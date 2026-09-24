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
    return '<button class="btn" onclick="POTUS.openLog()">' + P.t("ui.shell.log", "动态") + '</button>' +
      '<button class="btn" onclick="POTUS.quickSave()">' + P.t("ui.shell.save", "保存") + '</button>' +
      '<button class="btn" onclick="POTUS.openLoad()">' + P.t("ui.shell.load", "读取") + '</button>' +
      '<button class="btn" onclick="POTUS.exportSave()">' + P.t("ui.shell.export", "导出") + '</button>' +
      '<button class="btn" onclick="POTUS.importSave()">' + P.t("ui.shell.import", "导入") + '</button>' +
      '<button class="btn" onclick="if(confirm(\'' + P.t("ui.shell.quitConfirm", "确定放弃本局？") + '\'))POTUS.renderTitle()">' + P.t("ui.shell.quit", "退出") + '</button>';
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
  /* 时代名（视图层）：去时代化后开局统一从 1980 起，内容侧「保守回潮 (1980)」这类
     年份后缀是遗留物 —— 展示层统一剥掉（内容文件不动，标题里年份由 kb-r 单独报）。 */
  P.eraName = function () {
    const G = P.G;
    const raw = G ? (((P.reg.era || {})[G.era] || {}).name || G.era || "") : "";
    return String(raw).replace(/\s*[（(]\d{4}[）)]\s*$/, "");
  };

  P.topbarHTML = function () {
    let kicker = "";
    const G = P.G;
    if (G && G.year) {
      const b = P.balance() || {};
      const startAge = b.startAge == null ? 25 : b.startAge;
      const yrs = (G.age || startAge) - startAge + 1;
      kicker = '<div class="kicker-band">' +
        '<span class="kb-l">' + P.t("ui.shell.game", "权力之路") + ' · <b>' + P.eraName() + '</b> · ' + P.t("ui.shell.yearNth", "第 {n} 个年头", { n: yrs }) + '</span>' +
        '<span class="kb-ops">' + P.opsButtons() + (P.langSwitchHTML ? P.langSwitchHTML() : "") + '</span>' +
        '<span class="kb-r">' + P.t("ui.shell.date", "{y} 年 {m} 月", { y: G.year, m: G.month || 1 }) + ' · ' + (G.name || "") + '</span>' +
        '</div>';
    }
    /* v0.9 框架收敛（不做大改）：原「有头像的标题栏」拆成两半——
       ① 游戏级操作 + 标题/时代/年份 + 日期/姓名 → 收进这条黑色 kicker 条（就在这里）；
       ② 身份证式状态卡（头像·姓名·年龄 / 等级·晋升·日期·资源·选区基本盘 / 标签·派系·人脉）
          → 放进右栏状态带顶部（见 topbar.js 的 statusPanel() 里 #ident / .idc-id）。
       骨架保持原样：左 = 事件；右 = 上状态栏 + 下操作栏。 */
    return kicker;
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

  /* ---------------- 全局语言切换 dock（顶栏缺席屏的兜底入口，w45） ----------------
     对局中/事件屏的语言开关挂在 kicker 顶栏 .kb-ops 尾部（见上方 topbarHTML）；
     建角/终局屏不渲染顶栏（topbarHTML 只在有 G.year 时出条），这里在 <body> 挂一枚
     固定小 dock 兜底，按钮复用 topbar.js 的 langSwitchHTML 工厂。顶栏在场或标题屏
     （title.js 自带完整 langBar）时自动隐藏，全屏幕同一时刻只出现一个入口。
     与悬浮气泡同款宿主检查：validate.js / i18n-coverage.js 的 DOM stub 下安静跳过。 */
  function langDockHost() {
    return typeof document !== "undefined" && document &&
      typeof document.createElement === "function" &&
      document.body && typeof document.body.appendChild === "function" &&
      typeof MutationObserver !== "undefined";
  }
  function mountLangDock() {
    if (!langDockHost()) return;   // 无真 DOM 宿主（门禁 stub）：不挂
    const dock = document.createElement("div");
    dock.id = "langdock";
    dock.style.cssText = "position:fixed;top:8px;right:10px;z-index:15;display:none;align-items:center;gap:4px";
    dock.innerHTML = '<span class="muted" style="font-size:11px">' + P.t("ui.shell.langDock", "语言：") + "</span>" +
      (P.langSwitchHTML ? P.langSwitchHTML() : "");
    document.body.appendChild(dock);
    const sync = function () {
      const band = document.querySelector(".kicker-band");
      dock.style.display = (!band && P.SCREEN !== "title") ? "inline-flex" : "none";
    };
    const app = P.app ? P.app() : null;
    if (app && app.nodeType) {
      try { new MutationObserver(sync).observe(app, { childList: true, subtree: true }); } catch (e) { }
    }
    sync();
  }

  /* ---------------- 启动 ---------------- */
  P.boot = function () {
    /* 语言覆盖层必须在任何渲染之前并入注册表（读 localStorage / ?lang=） */
    if (P.i18n) P.i18n.boot();
    bindTooltip();
    mountLangDock();
    if (!Object.keys(P.reg.era).length) {
      P.app().innerHTML = '<div class="center" style="padding:40px"><h2>' + P.t("ui.shell.noContentTitle", "未加载任何内容包") + '</h2><p class="muted">' + P.t("ui.shell.noContentHint", "请在 content/ 下至少提供一个时代（era）内容包，并在 index.html 的清单中引入。") + '</p></div>';
      return;
    }
    P.renderTitle();
  };
})();
