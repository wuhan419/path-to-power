/* ============================================================================
 * CONTENT · i18n/en/view/create.js
 * 建角屏（engine/view/create.js）界面串的英文分片。
 * 约定见 docs/I18N.md：中文原文是引擎里的兜底，这里只登记英文；
 * {x} 占位符两侧同名。属性名复用 ui.attr.*、副题复用 ui.title.sub（均在 en/ui.js）。
 * 注：难度名与难度说明（DIFFS）是加载期立即执行的串，本轮未提取，故无对应 key。
 * ==========================================================================*/
POTUS.define("l10n", {
  lang: "en",
  ui: {
    /* ---- 快速开局屏（renderCreate） ---- */
    "ui.create.quickTitle": "Path to Power · Quick Start",
    "ui.create.diffHeading": "Choose a difficulty (that means your background and starting resources)",
    "ui.create.intro": "Just pick a <b>difficulty</b> and a <b>name</b> — you start as a young nobody in your hometown, and climb one rung at a time.",
    "ui.create.nameLabel": "Name (leave it blank and you are \"Tommy\")",
    "ui.create.namePlaceholder": "Blank = Tommy",
    "ui.create.startBtn": "Start game →",
    "ui.create.back": "Back",
    "ui.create.summary": "Difficulty <b>{d}</b> · Background <b>{o}</b> · Entry <b>{e}</b>. The starting year, party and talent are set for you; you can switch them later in-game.",
    "ui.create.entryInsider": "Straight in (start as a volunteer)",
    "ui.create.defaultName": "Tommy",

    /* ---- 定命一掷 / 自由点 / VIP 码（rollBlockHTML） ---- */
    "ui.create.rollTitle": "Roll Your Fate",
    "ui.create.rollAll": "Reroll All",
    "ui.create.rollOnce": "Roll Dice",
    "ui.create.rollHint": "No roll yet. Each of the four attributes lands between {lo} and {hi} — fate deals the cards, you play them.",
    "ui.create.reroll": "Reroll",
    "ui.create.freePoints": "Free points: <b>{left}</b> of {total} left",
    "ui.create.vipExtra": " (incl. VIP +{n})",
    "ui.create.capNote": " · max +{cap} per attribute",
    "ui.create.vipPlaceholder": "Top-up code (VIP1/VIP5/VIP20/VIP50...)",
    "ui.create.vipBtn": "Redeem",
    "ui.create.vipUsed": "Activated: ",

    /* ---- 开局日志（confirmCreate） ---- */
    "ui.create.loanLog": "You start ${v}k deep in student loans — a slice of each month's surplus goes to the debt; the more you earn, the faster it clears.",
    "ui.create.startLog": "The story begins: {name}, {era}, a {origin} background, {entry}, {party}/{stance}.",
    "ui.create.startLogHome": "The story begins: {name}, {era}, a {origin} background out of {home}, {entry}, {party}/{stance}."
  }
});
