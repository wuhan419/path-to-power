/* ============================================================================
 * CONTENT · i18n/en/view/dice.js
 * engine/dice.js 界面串的英文表：判定明细修正项标签 + 投注明细。
 * 中文原文就是默认值，中文侧不需要本文件；缺 key 自动回落中文。
 * 「等级 {n}」复用既有 key ui.tier.level（见 en/ui.js），不另立。
 * 「选民底气 X%」「投入·」：门禁断言已改 ZH(() => …) locale 感知，本轮正常提取。
 * 「ui.dice.fuzz.0—5」：BALANCE_DEFAULTS.fuzzLabels 是 boot 前常量，
 *   中文原文留在数据表里兜底，P.fuzzy 取用点按档位下标现翻（数值/边界零改动）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    /* 判定明细：单条修正项标签 */
    "ui.dice.modFac": "Faction: {v}",
    "ui.dice.modFlag": "Status: {v}",
    "ui.dice.modTalent": "Talent: {v}",
    "ui.dice.modTrack": "Track: {v}",
    "ui.dice.modParty": "Party: {v}",
    "ui.dice.modStance": "Stance: {v}",
    "ui.dice.modFunOk": "Well funded",
    "ui.dice.modVoters": "Voter backing {pct}%",
    "ui.dice.baseOdds": "Base odds",
    "ui.dice.ballotOdds": "Campaign momentum",

    /* 投注明细 */
    "ui.dice.stakeFun": "Funds {amt}",
    "ui.dice.stakeFav": "Favors {n} (reroll, keep best)",
    "ui.dice.investLabel": "Invested · {label}",

    /* 模糊胜算档位（fuzzLabels，按档位下标；中文：渺茫/不利/五五开/有利/稳操胜券/几乎必胜） */
    "ui.dice.fuzz.0": "Long shot",
    "ui.dice.fuzz.1": "Against you",
    "ui.dice.fuzz.2": "Coin flip",
    "ui.dice.fuzz.3": "In your favor",
    "ui.dice.fuzz.4": "Confident",
    "ui.dice.fuzz.5": "Near certain",

    /* #21 M1 白宫卡上的判定来源：总统支持率（50% 为零点） */
    "ui.dice.modApproval": "Approval {n}%",
  }

});
