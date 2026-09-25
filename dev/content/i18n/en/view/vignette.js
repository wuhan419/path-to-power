/* ============================================================================
 * CONTENT · i18n/en/view/vignette.js
 * 引擎 engine/vignette.js（静好岁月：平静月随笔卡 + 按部就班成长）界面串的英文表。
 * 契约见 docs/I18N.md §2：中文原文就是兜底，本表没登记的 key 在英文界面显中文。
 *
 * 本轮（w44）补齐上一批刻意留白的英文：门禁里的中文断言已改成 ZH(() => …)
 * locale 感知，以下 key 可以安全给英文：
 *   ui.vignette.title / .range.single / .range.span / .leftover
 *   ui.vignette.attr.{CHA,INT,CUN,INTG} / .note.attr
 * 另：SLOT_NAME（时令/世相/案头/日常/心绪/收束）为加载期常量，
 *   在 P.vignetteSlotName() 取用点提取，key = ui.vignette.slot.<slot>。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    /* 卡头：标题 + 日期范围（P.t 兜底在 vignette.js:344 / renderQuiet；
       标题术语与 en/reg/08-vignettes.js 覆盖层的 reg.vignette.title 对齐） */
    "ui.vignette.title": "Quiet Months",
    "ui.vignette.range.single": "Month {M}, {Y}",
    "ui.vignette.range.span": "Months {M1}–{M2}, {Y}",
    "ui.vignette.leftover": "Another {N} months slipped by just as silently.",

    /* 随笔槽位名（P.vignetteSlotName 取用点现翻） */
    "ui.vignette.slot.season": "Season",
    "ui.vignette.slot.world": "The world",
    "ui.vignette.slot.work": "The desk",
    "ui.vignette.slot.life": "Daily life",
    "ui.vignette.slot.self": "Inner life",
    "ui.vignette.slot.close": "Coda",

    /* 属性名（与 ui.attr.* 术语对齐）+ 「属性 +N」成长行 */
    "ui.vignette.attr.CHA": "Charm",
    "ui.vignette.attr.INT": "Wit",
    "ui.vignette.attr.CUN": "Guile",
    "ui.vignette.attr.INTG": "Integrity",
    "ui.vignette.note.attr": "{NAME} +{N}",

    /* 成长清单（卡尾「按部就班」一行 + 日志里那句）：标签 + 带符号的变化量 */
    "ui.vignette.note.rep": "Rep +{N}",
    "ui.vignette.note.contactFav": "Contacts +{N}",
    "ui.vignette.note.fav": "Favors +{N}",
    "ui.vignette.note.voters": "{NAME} {D}",
    "ui.vignette.voter.warm": "Supporters",
    "ui.vignette.voter.diehard": "Diehards",
    "ui.vignette.voter.oppose": "Opponents",

    /* 平静月写进日志的前缀（存的是渲染成品，切语言不追溯历史行，见 I18N.md §6） */
    "ui.vignette.log.quiet": "Quiet spell (month {M}): ",

    /* 随笔卡正文 */
    "ui.vignette.empty": "These days passed too quietly to leave a mark.",
    "ui.vignette.growthTag": "Steady growth",
    "ui.vignette.growthSep": " · "
  }
});
