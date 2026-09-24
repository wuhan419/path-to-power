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
    return fb[t] || P.t("ui.tier.level", "等级 {n}", { n: t + 1 });
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
    if (t.effect) parts.push(P.t("ui.leftbar.effectNote", "（游戏影响：{v}）", { v: t.effect }));
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

  /* ---------------- 状态详情（能力 / 标签 / 派系 / 人脉 / 日志）—— v0.10 行级组件化 ----------------
     每一行是一个独立组件（sbrow：左侧固定标签列 + 右侧 chip 流），由 P.statusRows()
     按行返回，供 topbar.js 的 STATUS_LAYOUT 任意组合挪放。两条原则不变：
       ① 一行一个太占高度 → 属性/派系/人脉改成内联 chip 流式换行；日志只留最近 3 条。
       ② 已决定不再展示的项（智力/诚信/健康/精力/把柄 + 媒体·工会·宗教·情报派系）
          仅在视图层隐藏（引擎数值与判定不动），隐藏清单见 topbar.js 的 P.UI_HIDE。 */
  P.statusRows = function () {
    const G = P.G, a = G.attr;
    const hide = (P.UI_HIDE || {});
    const hideAttr = hide.attr || {}, hideFac = hide.fac || {};
    const ATTR_CN = {
      CHA: P.t("ui.attr.CHA", "魅力"), INT: P.t("ui.attr.INT", "智力"),
      CUN: P.t("ui.attr.CUN", "手腕"), INTG: P.t("ui.attr.INTG", "诚信")
    };
    const sgn = function (v) { return (v > 0 ? "+" : "") + v; };
    /* 底色分档（v0.10）：按正负 + 幅度给 chip 上淡底，三档封顶保证文字可读：
       |v| ≥ 40 → 第 3 档，≥ 15 → 第 2 档，> 0 → 第 1 档，0 → 不上底色。 */
    const tint = function (v) {
      if (!v) return "";
      const a = Math.abs(v);
      const lv = a >= 40 ? 3 : a >= 15 ? 2 : 1;
      return " tint-" + (v > 0 ? "p" : "n") + lv;
    };
    /* 能力：可见属性内联（智力等已隐藏）。data-diff/data-val 供选择后红绿高亮对照。 */
    const attrChips = ["CHA", "INT", "CUN"].filter(function (k) { return !hideAttr[k]; })
      .map(function (k) {
        return '<span class="qchip" data-diff="attr_' + k + '" data-val="' + a[k] + '"><b>' + ATTR_CN[k] + '</b><span class="qval">' + a[k] + "</span></span>";
      }).join("");
    /* 派系：仅可见且非 0 的，内联 */
    let facChips = "";
    for (const k in P.reg.faction) {
      if (hideFac[k]) continue;
      const v = G.faction[k] || 0;
      if (v === 0) continue;
      facChips += '<span class="qchip' + tint(v) + '" data-diff="fac_' + k + '" data-val="' + v + '"><b>' + P.factionName(k) + '</b><span class="' + (v > 0 ? "pos" : "neg") + '">' + sgn(v) + "</span></span>";
    }
    /* 人脉：内联（前 5） */
    const ctChips = P.myContacts().slice(0, 5).map(function (c) {
      return '<span class="qchip' + tint(c.favor) + '" data-diff="ct_' + c.id + '" data-val="' + (c.favor || 0) + '"' + (c.role ? ' data-tip="' + String(c.role).replace(/"/g, "&quot;") + '"' : "") + '><b>' + c.name +
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
    const tagMore = tagList.length > TAG_MAX
      ? '<span class="tag tag-more">' + P.t("ui.leftbar.more", "+{n} 项", { n: tagList.length - TAG_MAX }) + "</span>" : "";
    const sc = P.scandalLevel();
    const scandal = sc
      ? '<span class="tag scandal hastip" data-tip="' + P.t("ui.leftbar.scandalTip", "丑闻等级：越高越容易被攻击、也更难消除。") + '">'
        + P.t("ui.leftbar.scandal", "丑闻 Lv") + sc + "</span>" : "";
    const statusChips = scandal + tagChips + tagMore;
    const row = function (lab, chips) { return '<div class="sbrow"><span class="sblab">' + lab + '</span><span class="qchips">' + chips + '</span></div>'; };
    return {
      attrs: attrChips ? row(P.t("ui.leftbar.row.attrs", "能力"), attrChips) : "",
      tags: statusChips ? row(P.t("ui.leftbar.row.tags", "标签"), statusChips) : "",
      factions: row(P.t("ui.leftbar.row.factions", "派系"), facChips || '<span class="muted">—</span>'),
      contacts: row(P.t("ui.leftbar.row.contacts", "人脉"), ctChips || '<span class="muted">—</span>')
    };
  };
  /* 兼容旧调用点：四行按默认顺序拼接 */
  P.statusDetailHTML = function () {
    const r = P.statusRows();
    return r.attrs + r.tags + r.factions + r.contacts;
  };
})();
