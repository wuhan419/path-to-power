/* ============================================================================
 * CONTENT · i18n/en/view/events.js
 * engine/events.js 界面串的英文表：填充器兜底文案 + 安全兜底卡 + 新闻标题模板。
 * 中文原文就是默认值，中文侧不需要本文件；缺 key 自动回落中文。
 * 注意：fillerBodyTpl / newsTpl 里的 {act}{topic} / {outlet}{year}{month}{name}{headline}
 * 占位符由引擎后续 replace 填充，英文保留同名占位符、不改参数名。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    /* 填充器兜底（引擎默认值；内容包 30-fillers 提供正式文案） */
    "ui.events.fillerTopic": "a local scandal",
    "ui.events.fillerAct": "You are pulled into",
    "ui.events.fillerBodyTpl": "{act} {topic}. You must choose under the spotlight.",

    /* 内容缺失时的安全兜底卡 */
    "ui.events.safeBody": "You are pulled into a local scandal. You must choose under the spotlight.",
    "ui.events.safeChoiceHi": "Go public and seize the moral high ground",
    "ui.events.safeChoiceLow": "Make it go away quietly, through connections",
    "ui.events.safeCrit": "You handled it beautifully.",
    "ui.events.safeOk": "You land on your feet.",
    "ui.events.safeMeh": "You scrape through, at a small cost.",
    "ui.events.safeFail": "It falls apart.",
    "ui.events.safeCritfail": "You lose control of the situation.",

    /* 新闻标题 */
    "ui.events.newsOutlet": "Local Gazette",
    "ui.events.newsTpl": "[{outlet}] {month}/{year} | {name}: {headline}"
  }
});
