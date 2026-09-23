/* ============================================================================
 * CONTENT · i18n/en/view/shell.js
 * 外壳（engine/view/shell.js）界面串的英文分片：操作按钮、顶栏 kicker、缺内容提示。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    /* 操作按钮组 */
    "ui.shell.log": "Log",
    "ui.shell.save": "Save",
    "ui.shell.load": "Load",
    "ui.shell.export": "Export",
    "ui.shell.import": "Import",
    "ui.shell.quit": "Quit",
    "ui.shell.quitConfirm": "Abandon this run?",

    /* 顶栏 kicker */
    "ui.shell.game": "Path to Power",
    "ui.shell.yearNth": "Year {n}",
    "ui.shell.date": "{y}-{m}",

    /* 启动兜底提示 */
    "ui.shell.noContentTitle": "No content pack loaded",
    "ui.shell.noContentHint": "Provide at least one era content pack under content/ and add it to the manifest in index.html."
  }
});
