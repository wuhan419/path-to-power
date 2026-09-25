/* ============================================================================
 * CONTENT · i18n/en/view/actions.js
 * 资源投注面板（engine/view/actions.js）界面串的英文分片。
 * 约定见 docs/I18N.md：中文原文是引擎里的兜底，这里只登记英文；
 * {x} 占位符两侧同名。术语与 en/ui.js 一致。
 * ==========================================================================*/
POTUS.define("l10n", {
  lang: "en",
  ui: {
    /* ---- 价码依据（stakeRateNote） ---- */
    "ui.actions.perTierContent": "{v} per notch — this bet is priced by the story itself.",
    "ui.actions.gradeMul": " × event scale {g}",
    "ui.actions.rateNoteLevel": "{v} per notch: priced by your seat — salary {s} × {m} months{gm}. Your cash only decides how many notches you can afford, never the unit price.",

    /* ---- 投注面板（renderStake） ---- */
    "ui.actions.stakeTitle": "Stake Resources, Boost Your Odds",
    "ui.actions.stakeNote": "Staking only steadies this roll — it never changes the prize itself. Bet within your means.",
    "ui.actions.fundsShort": "Not enough cash: each notch costs {need} and you have only {have}",
    "ui.actions.atMax": "Already at this option's cap",
    "ui.actions.fundsHint": "{per} per notch — the more you stake, the better the odds (up to {mx} notches; balance {bal})",
    "ui.actions.funds": "Cash",
    "ui.actions.favors": "Favors",
    "ui.actions.favSpend": "Spend 1 for a <b>reroll (keep the best)</b>",
    "ui.actions.favCount": "(favors: {n})",
    "ui.actions.noFavors": "No favors to spend",
    "ui.actions.confirm": "Resolve Roll",
    "ui.actions.back": "Back"
  }
});
