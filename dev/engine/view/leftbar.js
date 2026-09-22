/* ============================================================================
 * POTUS ENGINE · view/leftbar.js
 * 左栏状态面板：属性条 / 把柄 / 丑闻 / 状态词条 / 派系好感 / 人脉 / 日志，
 * 面板刷新，以及共用的层级名 / 状态词条（tagInfo·tagTooltip）文案查表。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* 层级的可读名：优先轨道职位表，退 fallback（"T3"/"层级3" 这种内部代号不该裸奔见玩家） */
  P.tierName = function (t) {
    const G = P.G;
    const table = P.reg.office || {};
    const hit = table[(G ? G.track : "*") + "_" + t] || table["*_" + t];
    const name = hit ? (typeof hit === "string" ? hit : hit.name) : null;
    if (name) return name;
    const fb = P.balance().officeFallback || [];
    return fb[t] || ("等级 " + (t + 1));
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

  /* 状态区刷新：v0.8 两栏重构后，完整状态（topstat + 详情）由 topbar.js 的
     P.statusPanel() 统一产出，写进右栏顶部的 #statusbox。
     属性/派系/人脉等「详情」部分见下方 P.statusDetailHTML()。 */
  P.refreshPanel = function () {
    const sb = document.getElementById("statusbox");
    if (sb) sb.innerHTML = P.statusPanel();
    const id = document.getElementById("ident");
    if (id) id.innerHTML = P.identityHTML();
  };

  /* ---------------- 状态详情（能力 / 标签 / 派系 / 人脉 / 日志）—— v0.8 高度压缩 ----------------
     只返回内层 HTML，.panel 外壳由 statusPanel() 负责。两条原则：
       ① 一行一个太占高度 → 属性/派系/人脉改成内联 chip 流式换行；日志只留最近 3 条。
       ② 已决定不再展示的项（智力/诚信/健康/精力/把柄 + 媒体·工会·宗教·情报派系）
          仅在视图层隐藏（引擎数值与判定不动），隐藏清单见 topbar.js 的 P.UI_HIDE。 */
  P.statusDetailHTML = function () {
    const G = P.G, a = G.attr;
    const hide = (P.UI_HIDE || {});
    const hideAttr = hide.attr || {}, hideFac = hide.fac || {};
    const ATTR_CN = { CHA: "魅力", INT: "智力", CUN: "手腕", INTG: "诚信" };
    const sgn = function (v) { return (v > 0 ? "+" : "") + v; };
    /* 能力：可见属性内联（智力等已隐藏） */
    const attrChips = ["CHA", "INT", "CUN"].filter(function (k) { return !hideAttr[k]; })
      .map(function (k) {
        return '<span class="qchip"><b>' + ATTR_CN[k] + '</b><span class="qval">' + a[k] + "</span></span>";
      }).join("");
    /* 派系：仅可见且非 0 的，内联 */
    let facChips = "";
    for (const k in P.reg.faction) {
      if (hideFac[k]) continue;
      const v = G.faction[k] || 0;
      if (v === 0) continue;
      facChips += '<span class="qchip"><b>' + P.factionName(k) + '</b><span class="' + (v > 0 ? "pos" : "neg") + '">' + sgn(v) + "</span></span>";
    }
    /* 人脉：内联（前 5） */
    const ctChips = P.myContacts().slice(0, 5).map(function (c) {
      return '<span class="qchip"' + (c.role ? ' data-tip="' + String(c.role).replace(/"/g, "&quot;") + '"' : "") + '><b>' + c.name +
        '</b><span class="' + (c.favor >= 30 ? "pos" : c.favor <= -20 ? "neg" : "") + '">' + sgn(c.favor) + "</span></span>";
    }).join("");
    /* 状态标签（导师/走过灰路… 这类 buff 式「际遇」，不含丑闻/黑天鹅）：单独成排。
       数量往往偏多 → 收敛到前 6 枚，其余折成「+N」；悬停看完整说明。 */
    const tagList = G.flags.filter(function (f) {
      if (f.indexOf("scandal_") === 0 || f.indexOf("bs_") === 0) return false;
      const ti = P.tagInfo(f);
      return ti.name && ti.name !== f;
    });
    const TAG_MAX = 6;
    const tagChips = tagList.slice(0, TAG_MAX).map(function (f) {
      const tip = P.tagTooltip(f);
      return '<span class="tag hastip"' + (tip ? ' data-tip="' + String(tip).replace(/"/g, "&quot;") + '"' : "") + ">" + P.tagInfo(f).name + "</span>";
    }).join("");
    const tagMore = tagList.length > TAG_MAX ? '<span class="tag tag-more">+' + (tagList.length - TAG_MAX) + "\u9879</span>" : "";
    const sc = P.scandalLevel();
    const scandal = sc ? '<span class="tag scandal hastip" data-tip="\u4e11\u95fb\u7b49\u7ea7\uff1a\u8d8a\u9ad8\u8d8a\u5bb9\u6613\u88ab\u653b\u51fb\u3001\u4e5f\u66f4\u96be\u6d88\u9664\u3002">\u4e11\u95fb Lv' + sc + "</span>" : "";
    const statusChips = scandal + tagChips + tagMore;
    /* 四行紧凑布局：左侧固定标签列 + 右侧 chip 流（能力/标签/派系/人脉）。日志已收进顶栏「动态」弹窗。 */
    const row = function (lab, chips) { return '<div class="sbrow"><span class="sblab">' + lab + '</span><span class="qchips">' + chips + '</span></div>'; };
    return (attrChips ? row('能力', attrChips) : "") +
      (statusChips ? row('标签', statusChips) : "") +
      row('派系', facChips || '<span class="muted">—</span>') +
      row('人脉', ctChips || '<span class="muted">—</span>');
  };
})();
