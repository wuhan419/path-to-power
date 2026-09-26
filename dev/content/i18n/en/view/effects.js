/* ============================================================================
 * CONTENT · i18n/en/view/effects.js
 * 效果结算播报（engine/effects.js）界面串的英文分片。
 * key 形如 ui.effects.<名字>；{x} 占位符两侧同名，中文原文即兜底默认值。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    "ui.effects.tierGate": "Time served isn't enough: {have}/{need} months — the job will have to wait (reputation +3).",
    "ui.effects.tierNoBallot": "The top chair is counted out at the polls, not handed out by events: this did not carry you into the presidency (reputation +3).",
    "ui.effects.milestone": "★ Milestone: you step onto the national stage (Level {n}: {name}).",
    "ui.effects.fallen": "Downfall: you fall from Level {from} to Level {to}. Your political life survives — but the ladder starts over."
  }
});
