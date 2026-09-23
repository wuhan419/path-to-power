/* ============================================================================
 * CONTENT · i18n/en/view/core.js
 * 引擎内核 engine/core.js 运行期界面串的英文分片（Track A · w06）。
 * key 前缀 ui.core.*，与 dev/engine/core.js 调用点一一对应；
 * 中文原文是兜底默认值，这里只登记英文。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    /* 时间戳（pushLog / 默认档名 / 存档摘要共用） */
    "ui.core.stampYm": "{m}/{y}",
    "ui.core.stampY": "{y}",
    "ui.core.loadedDate": "{m}/{y}.",

    /* 量级 / 类别 / 人脉兜底名 */
    "ui.core.gradeMajor": "Major",
    "ui.core.gradeMid": "Mid",
    "ui.core.gradeMinor": "Minor",
    "ui.core.catGeneral": "General",
    "ui.core.contactSomeone": "Someone",
    "ui.core.factionUnknown": "Other",

    /* VIP 充值码提示 */
    "ui.core.vipEmpty": "Enter a code",
    "ui.core.vipUnknown": "No such code: {k}",
    "ui.core.vipUsed": "Code already used",

    /* 存档系统：存档位 / 保存与读取对话框 */
    "ui.core.slot": "Slot {n}",
    "ui.core.emptySlot": "Empty slot {n}",
    "ui.core.empty": "Empty",
    "ui.core.unnamed": "Untitled",
    "ui.core.paren": " ({v})",
    "ui.core.thumbLevel": "Lv {n}",
    "ui.core.saveQuotaFull": "Browser storage is full, so the save failed. Delete some saves and try again.",
    "ui.core.saveFailed": "Save failed: {e}",
    "ui.core.saveTitle": "Save game",
    "ui.core.nameLabel": "Save name",
    "ui.core.ctaOverwrite": "Click to overwrite this slot",
    "ui.core.ctaSaveHere": "Click to save here",
    "ui.core.confirmOverwrite": "Click again to confirm overwrite!",
    "ui.core.savedTo": "Saved to Slot {n} · {name}",
    "ui.core.rename": "Rename",
    "ui.core.confirm": "OK",
    "ui.core.cancel": "Cancel",
    "ui.core.confirmDel": "Delete?",
    "ui.core.del": "Delete",
    "ui.core.loadTitle": "Load save",
    "ui.core.autoSave": "Autosave",
    "ui.core.live": "Live",
    "ui.core.noSaves": "No saves yet. Start a game and press Save to write to a slot.",
    "ui.core.noSave": "No save found",
    "ui.core.loadFailed": "Load failed: {e}",
    "ui.core.exportFailed": "Export failed: {e}",
    "ui.core.importFailed": "Import failed: {e}",
    "ui.core.close": "Close",

    /* 存档摘要行（saveBrief）：注意 死忠≥1万 的数值仍带中文「万」，
       属格式化逻辑，需走 P.numGroup/fmtUsd 原语，不在字符串提取范围内 */
    "ui.core.saveAge": "{n} yrs",
    "ui.core.statRep": "Rep {v}",
    "ui.core.statFun": "Funds ${v}k",
    "ui.core.statDiehard": "Diehards {v}",

    /* 「距今多久」（存档时间戳） */
    "ui.core.agoJust": "just now",
    "ui.core.agoMin": "{n} min ago",
    "ui.core.agoHour": "{n} hr ago",
    "ui.core.agoDay": "{n} days ago",

    /* 日志 / 读档后的继续屏 */
    "ui.core.logTitle": "Recent activity",
    "ui.core.noLog": "Nothing logged yet.",
    "ui.core.loadedBadge": "Save loaded",
    "ui.core.resumeHead": "Continue your career",
    "ui.core.resumeBtn": "Continue →"
  }
});
