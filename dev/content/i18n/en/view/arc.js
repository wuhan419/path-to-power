/* ============================================================================
 * CONTENT · i18n/en/view/arc.js
 * 引擎「主线」模块（engine/arc.js）界面串的英文分片。
 * 中文原文即默认值，本表只登记英文；缺译的 key 自动回落中文。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    /* 生涯日志（pushLog） */
    "ui.arc.logStart": "Storyline begins: {name}",
    "ui.arc.logDone": "Storyline completed: {name}",
    "ui.arc.logFaded": "Storyline fades out: {name}",
    "ui.arc.logDropped": "Storyline set aside: {name}",

    /* 风向：命中 gate 的身份维度（ui.arc.whyRow 的 label 用） */
    "ui.arc.dimTracks": "Track",
    "ui.arc.dimParties": "Party",
    "ui.arc.dimStances": "Stance",
    "ui.arc.dimOrigins": "Origin",
    "ui.arc.dimEntries": "Entry",
    "ui.arc.dimTalents": "Talent",
    "ui.arc.dimTiers": "Tier",
    "ui.arc.whyRow": "{label}: {name}",

    /* 风向：门槛行 */
    "ui.arc.gateMinTier": "Tier ≥ T{n}",
    "ui.arc.gateMinRep": "Reputation ≥ {n}",
    "ui.arc.gateMinLev": "Blackmail ≥ {n}",
    "ui.arc.gateMinFun": "Cash ≥ {n}",
    "ui.arc.gateFlags": "Carrying flag: {flags}"
  }
});
