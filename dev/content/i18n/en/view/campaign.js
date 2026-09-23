/* ============================================================================
 * CONTENT · i18n/en/view/campaign.js
 * 竞选引擎（engine/campaign.js）界面串的英文分片。
 * key 形如 ui.campaign.<名字>；{x} 占位符两侧同名，中文原文即兜底默认值。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    "ui.campaign.start": "Campaign launched: {office} — you've put your name on the ballot.",
    "ui.campaign.abortLost": "The campaign collapses: your run for {office} is dead.",
    "ui.campaign.won": "You win the election: {office}.",
    "ui.campaign.ballotLost": "The ballots are counted, but this one wasn't yours: you lose the race for {office}.",
    "ui.campaign.paceLost": "The campaign dragged on and stalled out: nothing comes of your run for {office}."
  }
});
