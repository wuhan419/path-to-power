/* ============================================================================
 * POTUS ENGINE · view/leftbar.js
 * 左栏状态面板：属性条 / 把柄 / 丑闻 / 状态词条 / 派系好感 / 人脉 / 日志，
 * 面板刷新，以及共用的层级名 / 状态词条（tagInfo·tagTooltip）文案查表。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* 层级的可读名：优先轨道职位表，退 fallback（"T3" 这种内部代号不该裸奔见玩家） */
  P.tierName = function (t) {
    const G = P.G;
    const table = P.reg.office || {};
    const hit = table[(G ? G.track : "*") + "_" + t] || table["*_" + t];
    const name = hit ? (typeof hit === "string" ? hit : hit.name) : null;
    if (name) return name;
    const fb = P.balance().officeFallback || [];
    return fb[t] || ("层级" + t);
  };

  /* ---------------- 状态词条：名字 + hover 说明（是什么 / 有什么影响） ----------------
   * tagNames 的值支持两种写法（兼容旧内容）：
   *   "救市污点"                                          —— 只有名字（无说明）
   *   { name:"救市污点", desc:"…", effect:"…" }           —— 名字 + 悬停说明
   * desc 解释这个状态是什么；effect 解释它在游戏里产生什么影响（数值/事件倾斜）。 */
  P.tagInfo = function (flag) {
    const raw = (P.balance().tagNames || {})[flag];
    if (raw == null) return { name: flag, desc: "", effect: "" };
    if (typeof raw === "string") return { name: raw, desc: "", effect: "" };
    return { name: raw.name || flag, desc: raw.desc || "", effect: raw.effect || "" };
  };
  P.tagTooltip = function (flag) {
    const t = P.tagInfo(flag);
    const parts = [];
    if (t.desc) parts.push(t.desc);
    if (t.effect) parts.push("（游戏影响：" + t.effect + "）");
    return parts.join(" ");
  };

  /* 状态面板刷新：v0.5.3 三栏布局后 .panel 在左栏（.col-left）里，
     这里统一替换它的 innerHTML 而不是 outerHTML（保持左栏结构不动）。
     v0.5.6：顺手修掉原来的无限递归 —— 旧代码在 .topstat 不存在时会再调一次
     refreshPanel()，条件不变 → 栈溢出。现在两者各自「有则刷，无则跳过」。 */
  P.refreshPanel = function () {
    const col = document.querySelector(".col-left");
    if (col) col.innerHTML = P.statPanel();
    const ts = document.querySelector(".topstat");
    if (ts) ts.innerHTML = P.topStatus();
  };

  /* ---------------- 状态面板 / 工具条 ---------------- */
  P.statPanel = function () {
    const G = P.G, a = G.attr;
    const bar = function (v) { return '<div class="bar"><i style="width:' + v + '%"></i></div>'; };
    let fac = "";
    for (const k in P.reg.faction) {
      const v = G.faction[k] || 0;
      if (v !== 0) fac += '<div class="fac"><span>' + P.factionName(k) + "</span><span>" + (v > 0 ? "+" : "") + v + "</span></div>";
    }
    const tags = G.flags.filter(function (f) {
      if (f.indexOf("scandal_") === 0 || f.indexOf("bs_") === 0) return false;
      const ti = P.tagInfo(f);
      return ti.name && ti.name !== f;
    })
      .slice(0, 8).map(function (f) {
        const tip = P.tagTooltip(f);
        return '<span class="tag hastip"' + (tip ? ' data-tip="' + String(tip).replace(/"/g, "&quot;") + '"' : "") + ">" +
          P.tagInfo(f).name + "</span>";
      }).join("");
    const sc = P.scandalLevel();
    const cts = P.myContacts().slice(0, 6);
    const ctHTML = cts.map(function (c) {
      return '<div class="ct"><span>' + c.name + (c.role ? '<i>' + c.role + "</i>" : "") + "</span>" +
        '<b class="' + (c.favor >= 30 ? "good" : c.favor <= -20 ? "bad" : "") + '">' + (c.favor > 0 ? "+" : "") + c.favor + "</b></div>";
    }).join("");
    return '<div class="panel"><h3>状态</h3>' +
      "<div>魅力 " + a.CHA + "</div>" + bar(a.CHA) +
      "<div>智力 " + a.INT + "</div>" + bar(a.INT) +
      "<div>手腕 " + a.CUN + "</div>" + bar(a.CUN) + "<hr>" +
      '<div class="levrow' + (G.lev ? " has" : "") + '">把柄 ' + (G.lev || 0) + " 份" +
      ((G.lev || 0) > 0 ? '<span class="muted">（攥着别人的秘密，也用掉得掉）</span>' : "") + "</div>" +
      "<div>" + (sc ? "丑闻 Lv" + sc : "无丑闻") + "</div>" +
      '<div style="margin-top:6px">' + tags + "</div><hr><h3>派系好感</h3>" + (fac || '<div class="muted">—</div>') +
      "<h3>人脉</h3>" + (ctHTML || '<div class="muted">—</div>') +
      '<div class="log">' + G.log.map(function (x) { return "<div>" + x + "</div>"; }).join("") + "</div></div>";
  };
})();
