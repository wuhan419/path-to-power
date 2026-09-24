/* ============================================================================
 * CONTENT · i18n/en/view/scale.js
 * 引擎 scale.js 界面串的英文表：只有 risk 卡缺保适时由 realize() 注入的
 * lay_low 兜底选项（选项文案 / 说明 / 五档正文）会走到玩家眼前。
 * P.VAL_LABEL（机遇/风险/威胁）为加载期常量，已在取用点 engine/view/stage.js 现翻，
 * 对应 key ui.stage.valLabel.{boon,risk,bane} 落在 view/stage.js 分片里（本文件不重复登记）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    "ui.scale.layLowText": "Say nothing; let it play out",
    "ui.scale.layLowNote": "No bet, no favor owed — protect what you have today.",
    "ui.scale.layLowBody": "You turn the page quietly — no chance taken, no leverage left behind."
  }
});
