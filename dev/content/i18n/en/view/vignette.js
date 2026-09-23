/* ============================================================================
 * CONTENT · i18n/en/view/vignette.js
 * 引擎 engine/vignette.js（静好岁月：平静月随笔卡 + 按部就班成长）界面串的英文表。
 * 契约见 docs/I18N.md §2：中文原文就是兜底，本表没登记的 key 在英文界面显中文。
 *
 * 有意**不给英文**的几条（引擎侧 key 已就位，补译文前要先解掉门禁里的中文断言，
 * 这些断言跑在 --lang=en 下，判的是渲染成品句）：
 *   ui.vignette.title / .range.single / .range.span / .leftover
 *   ui.vignette.attr.{CHA,INT,CUN,INTG} / .note.attr
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    /* 成长清单（卡尾「按部就班」一行 + 日志里那句）：标签 + 带符号的变化量 */
    "ui.vignette.note.rep": "Rep +{N}",
    "ui.vignette.note.contactFav": "Contacts +{N}",
    "ui.vignette.note.fav": "Favors +{N}",
    "ui.vignette.note.money": "Cash {V}k",
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
