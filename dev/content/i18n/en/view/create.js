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
    "ui.create.diffHeading": "Choose a difficulty (that means your background + how many talent cards you may pick)",
    "ui.create.intro": "Pick a <b>difficulty</b> (= background + how many cards you get), draw a few <b>talent cards</b>, spend some <b>attribute points</b> — then give a <b>name</b> and start climbing from a young nobody in your hometown.",
    "ui.create.nameLabel": "Name (leave it blank and you are \"Tommy\")",
    "ui.create.namePlaceholder": "Blank = Tommy",
    "ui.create.startBtn": "Start game →",
    "ui.create.back": "Back",
    "ui.create.summary": "Difficulty <b>{d}</b> · Background <b>{o}</b> · Entry <b>{e}</b>. The starting year, party and talent are set for you; you can switch them later in-game.",
    "ui.create.entryInsider": "Straight in (start as a volunteer)",
    "ui.create.defaultName": "Tommy",

    /* ---- 三步向导（stepBarHTML / navHTML / createNext） ---- */
    "ui.create.step1": "Difficulty",
    "ui.create.step2": "Cards",
    "ui.create.step3": "Points",
    "ui.create.prev": "← Back",
    "ui.create.next": "Next →",
    "ui.create.needCard": "Pick at least 1 talent card before moving on (this difficulty lets you pick {n}).",

    /* ---- 难度名 + 难度说明（DIFFS，取用点提取，key = ui.create.diff.<id>.label/note） ---- */
    "ui.create.diff.legendary.label": "Legendary",
    "ui.create.diff.legendary.note": "Political dynasty · pick 5 talent cards · +7 reputation, +4 favors, +10 establishment, +5 to every attribute — the deepest pockets and the most cards to spend.",
    "ui.create.diff.easy.label": "Easy",
    "ui.create.diff.easy.note": "Political family · pick 4 talent cards · +30 establishment contacts, +8 reputation — someone has already cleared the path for you.",
    "ui.create.diff.normal.label": "Normal",
    "ui.create.diff.normal.note": "Business / law school elite · pick 3 talent cards · +15 Wit, but the grassroots don't trust you.",
    "ui.create.diff.hard.label": "Hard",
    "ui.create.diff.hard.note": "Second-generation immigrant · pick 2 talent cards · +20 base but -20 establishment — climbing purely on grit.",
    "ui.create.diff.brutal.label": "Brutal",
    "ui.create.diff.brutal.note": "Blue-collar worker · only 1 talent card · just the union and the base, with lower starting reputation and a colder establishment — a true start from nothing.",

    /* ---- 开局抽卡卡墙（gachaHTML） ---- */
    "ui.create.gachaHeading": "Talent Draw (difficulty = number of picks)",
    "ui.create.gachaReroll": "Re-draw",
    "ui.create.gachaCount": "Picked {n}/{need}",
    "ui.create.gachaEmpty": "Hit “Re-draw” to pull your starting talent cards.",
    "ui.create.gachaLocked": "🔒 Orange (destiny) cards only enter the pool once you've been president before — this run tops out at purple.",
    "ui.create.rarity.1": "White",
    "ui.create.rarity.2": "Blue",
    "ui.create.rarity.3": "Purple",
    "ui.create.rarity.4": "Orange",

    /* ---- 自由点分配（allocHTML；定命一掷已删，三围/资金从 0 起） ---- */
    "ui.create.allocTitle": "Spend Your Free Points",
    "ui.create.loopTag": "Run no. {n}",
    "ui.create.allocRate": "1 point = +{per} Charisma / Intellect / Cunning · 1 point = +${fun}k cash · any single attribute can be pushed to 100",
    "ui.create.allocMoney": "Cash",
    "ui.create.capped": "max",
    "ui.create.freePoints": "Free points: <b>{left}</b> of {total} left",
    "ui.create.poolMeta": " · first run {base} + run bonuses {bonus}",
    /* 作弊码输入框（#20 收尾：不再隐藏，常驻在第 3 步加点屏） */
    "ui.create.cheatPlaceholder": "Cheat code: woshishabi10 (redeem +10 points)",
    "ui.create.cheatBtn": "Redeem",
    "ui.create.cheatOk": "+{n} free points injected ({total} from cheats this run)",
    "ui.create.cheatBad": "That code doesn't work — try woshishabi10.",

    /* ---- 开局日志（confirmCreate） ---- */
    "ui.create.loanLog": "You start ${v}k deep in student loans — a slice of each month's surplus goes to the debt; the more you earn, the faster it clears.",
    "ui.create.startLog": "The story begins: {name}, {era}, a {origin} background, {entry}, {party}/{stance}.",
    "ui.create.startLogHome": "The story begins: {name}, {era}, a {origin} background out of {home}, {entry}, {party}/{stance}."
  }
});
