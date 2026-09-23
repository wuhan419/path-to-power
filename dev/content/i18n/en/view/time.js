/* ============================================================================
 * CONTENT · i18n/en/view/time.js
 * 引擎 engine/time.js（时间轴 / 时代压力 / 档期）界面串的英文表。
 * 契约见 docs/I18N.md §2：中文原文就是兜底，本表没登记的 key 在英文界面显中文。
 *
 * 有意**不给英文**的一条（补上前要先解掉门禁里的中文断言，见 dev/tools/validate.js）：
 *   ui.time.reason.leverage —— validate.js 在 --lang=en 下仍断言 bonusReason() 含「把柄在手」。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    /* 时代压力五档（年卡 / 平静月卡上的读数）：一条从静到乱的刻度，不逐字对译 */
    "ui.time.pressure.calm": "Calm",
    "ui.time.pressure.uneasy": "Restless",
    "ui.time.pressure.tense": "Tense",
    "ui.time.pressure.storm": "Turbulent",
    "ui.time.pressure.abyss": "On the brink",

    /* 活跃度由什么顶起来的（日程变密的理由） */
    "ui.time.reason.scandal": "Scandal",
    "ui.time.reason.investigation": "Under investigation",
    "ui.time.reason.election": "Election year",
    "ui.time.reason.tierHigh": "High office",

    /* 时间读数 */
    "ui.time.monthLabel": "Month {M}",
    "ui.time.slotLabel": "Item {N} of {T} this month"
  }
});
