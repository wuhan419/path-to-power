/* ============================================================================
 * CONTENT · i18n/en/view/presidency.js
 * 白宫引擎（engine/presidency.js）界面串的英文分片 —— #21 M1。
 * key 形如 ui.presidency.<名字>；{x} 占位符两侧同名，中文原文即兜底默认值。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    "ui.presidency.swornIn": "Sworn in. That night an aide puts the first national poll on your desk: approval {n}%.",
    "ui.presidency.left": "You leave the White House. Approval stops at {n}%, after {m} months in office.",
    "ui.presidency.leftWrath": " The party's accounts are not settled yet.",
    "ui.presidency.term2": "The second term begins ({m} months in office, cumulative). The Constitution lets you go this far — the next door is closed for you.",
    "ui.presidency.midtermOpen": "{m} months into the presidency, the party machinery writes in: the midterm slate needs deciding. Both chambers of Congress are on the ballot.",
    "ui.presidency.reelectOpen": "{n} months until Election Day. Either announce that you seek another term, or let this be where it ends.",
    "ui.presidency.pressure": "Party leaders start asking, to your face, what you plan to do about the midterms. Approval has been under {n}% for {m} months.",
    "ui.presidency.termDone": "Your first term is complete ({m} months). Whether to run again is now your party's, the voters' and your own business.",

    /* 支持率四档（HUD 右侧的定性词） */
    "ui.presidency.band.strong": "Strong",
    "ui.presidency.band.steady": "Steady",
    "ui.presidency.band.soft": "Soft",
    "ui.presidency.band.danger": "Danger"
  }
});
