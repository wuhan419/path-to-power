/* ============================================================================
 * CONTENT · i18n/en/view/dice.js
 * engine/dice.js 界面串的英文表：判定明细修正项标签 + 投注明细。
 * 中文原文就是默认值，中文侧不需要本文件；缺 key 自动回落中文。
 * 「等级 {n}」复用既有 key ui.tier.level（见 en/ui.js），不另立。
 * 「选民底气 X%」「投入·」两处留白未提取：validate.js / smoke-ui.js 的断言
 * 按中文原文匹配该标签，翻译会挂 en 门禁。
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
    "ui.dice.baseOdds": "Base odds",

    /* 投注明细 */
    "ui.dice.stakeFun": "Funds {amt}",
    "ui.dice.stakeFav": "Favors {n} (reroll, keep best)"
  }
});
