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
    "ui.campaign.paceLost": "The campaign dragged on and stalled out: nothing comes of your run for {office}.",

    /* #23 投放把柄（竞选面板上的黑料行动） */
    "ui.campaign.dropNone": "No campaign is running.",
    "ui.campaign.dropNoStage": "There's no one to aim this act at in the current stage.",
    "ui.campaign.dropNoLev": "You're not holding any dirt.",
    "ui.campaign.dropUsed": "You've already played that card this stage.",
    "ui.campaign.dropPrimary": "Leak the dirt: make the rival's scandal undeniable (rival quits {p}%)",
    "ui.campaign.dropGeneral": "Leak the dirt to the press (momentum +{g} · backlash {p}%)",
    "ui.campaign.dropWinLog": "The story detonates through the primary field: the rival's campaign manager quits that night, and by morning the rival quits too.",
    "ui.campaign.dropFailLog": "The story lands with a shrug — the rival calls it \"a desperate move\" and goes back to raising money.",
    "ui.campaign.dropBackLog": "The dirt made headlines, but the thread led straight back to your campaign office. Next day the front page reads: \"DIRTY TRICKS AT {who}'s CAMPAIGN OFFICE\".",
    "ui.campaign.dropGeneralLog": "The story runs for three days and the rival spends them on the defensive. Your campaign creeps up while everyone is watching the other guy."
  }
});
