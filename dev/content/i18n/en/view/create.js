/* ============================================================================
 * CONTENT · i18n/en/view/create.js
 * 建角屏（engine/view/create.js）界面串的英文分片。
 * 约定见 docs/I18N.md：中文原文是引擎里的兜底，这里只登记英文；
 * {x} 占位符两侧同名。属性名复用 ui.attr.*、副题复用 ui.title.sub（均在 en/ui.js）。
 * 注：难度名与难度说明（DIFFS）为加载期常量，已在取用点提取：
 *   key = ui.create.diff.<难度>.label / .note（diffLabel()/diffNote()）。
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

    /* ---- 难度名 + 难度说明（DIFFS，取用点提取，key = ui.create.diff.<id>.label/note） ---- */
    "ui.create.diff.legendary.label": "Legendary",
    "ui.create.diff.legendary.note": "A dynasty's own dynasty · Start with $3.0M · +15 reputation, +6 favors, +5 to every attribute — born on a silver spoon, the road paved all the way.",
    "ui.create.diff.easy.label": "Easy",
    "ui.create.diff.easy.note": "Political family · Start with $1.2M · +30 establishment contacts, +8 reputation — someone has already cleared the path for you.",
    "ui.create.diff.normal.label": "Normal",
    "ui.create.diff.normal.note": "Business / law school elite · Start with $400k · +15 Wit, but the grassroots don't trust you.",
    "ui.create.diff.hard.label": "Hard",
    "ui.create.diff.hard.note": "Second-generation immigrant · Self-made (no starting cash) · +20 base but -20 establishment — climbing purely on grit.",
    "ui.create.diff.brutal.label": "Brutal",
    "ui.create.diff.brutal.note": "Blue-collar worker · Not a penny to your name ($0) · Only the union and the base, with lower starting reputation and a colder establishment — a true start from nothing.",

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
