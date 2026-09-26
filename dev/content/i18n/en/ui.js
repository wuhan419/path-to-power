/* ============================================================================
 * CONTENT · i18n/en/ui.js
 * 引擎界面串的英文表（样板分片）。
 *
 * 引擎里每处硬编码中文都改写成 P.t("ui.路径", "中文原文"[, 参数])：
 *   · 中文原文就是默认值，所以中文侧永远不需要这个文件；
 *   · 本文件里没登记的 key，英文界面自动显示中文原文（分层回补，不要求一次翻完）；
 *   · key 用 ui.<视图或模块>.<名字> 的点分路径，全局唯一，别复用别人的 key；
 *   · {x} 是占位符，英文必须保留同名占位符（参数名不改）。
 * 已转换的引擎文件见 docs/I18N.md 的进度表。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    "ui.doc.title": "Path to Power · An American Kid's Road to Office",

    "ui.title.game": "Path to Power",
    "ui.title.heroAlt": "Path to Power",
    "ui.title.sub": "An American Kid's Road to Office",
    "ui.title.tag": "Text-driven · political career simulation",
    "ui.title.langLabel": "Language: ",
    "ui.title.newGame": "New game",
    "ui.title.load": "Load save",
    "ui.title.p1": "Path to Power is a text-driven political career simulation. You start in the 1980s as a young " +
      "man with nothing, and over four decades of American politics you build reputation, money and favors — " +
      "climbing from a community council toward the statehouse, Congress, and maybe the White House. Or you fall, hard, somewhere along the way.",
    "ui.title.p2": "The rules are simple: pick a difficulty and a background, then start. Every month brings real " +
      "history and invented trouble — Challenger, Iran-Contra, 9/11, the financial crisis, election years — and all " +
      "you do is set the stakes on each choice. Every decision moves the balance of reputation, cash, favors and " +
      "blackmail, shifts your base, and decides whether you win and climb. No right answers; many endings. Walk your own road to power.",

    /* 事件配图的头版角标（content/09-photo-art.js） */
    "ui.photo.frontTag": "Front page",
    "ui.photo.dossierNo": "File {n}",

    /* 属性 / 层级 / 左栏状态面板（engine/view/leftbar.js） */
    "ui.attr.CHA": "Charm",
    "ui.attr.INT": "Wit",
    "ui.attr.CUN": "Guile",
    "ui.attr.INTG": "Integrity",
    "ui.tier.level": "Level {n}",
    "ui.leftbar.effectNote": "(in-game effect: {v})",
    "ui.leftbar.more": "+{n}",
    "ui.leftbar.scandal": "Scandal Lv",
    "ui.leftbar.scandalTip": "Scandal level: the higher it is, the easier you are attacked and the harder it is to bury.",
    "ui.leftbar.row.attrs": "Ability",
    "ui.leftbar.row.tags": "Tags",
    "ui.leftbar.row.wrath": "Enemies",
    "ui.leftbar.wrathTip": "Wrath: {v}. This debt never expires — once it piles up, they come for you.",
    "ui.leftbar.row.factions": "Factions",
    /* #29 派系四栏面板的分档形容词（|v|≥40 / ≥15 / >0，两侧各三档 + 中立） */
    "ui.leftbar.facW3n": "Hostile",
    "ui.leftbar.facW2n": "Wary",
    "ui.leftbar.facW1n": "Cool",
    "ui.leftbar.facW0": "Neutral",
    "ui.leftbar.facW1p": "Friendly",
    "ui.leftbar.facW2p": "Supportive",
    "ui.leftbar.facW3p": "Solid ally",
    "ui.leftbar.row.contacts": "Contacts",
    "ui.leftbar.row.cards": "Talents",
    "ui.leftbar.cardSpent": "(blocked one fatal ending already, then burned up)",
    "ui.core.spareLog": "\u300c{card}\u300d took the bullet for you — Reputation −{rep}, and this card is gone.",

    /* 升职庆典弹窗（engine/view/fanfare.js）。占位符名（{n}/{need}/{have}…）不许改。 */
    "ui.effects.promoted": "★ Promoted: {from} → {to} (Level {n})",
    "ui.fanfare.kicker": "PATH TO POWER · INAUGURATION",
    "ui.fanfare.kickerMax": "PATH TO POWER · INTO THE WHITE HOUSE",
    "ui.fanfare.was": "You stepped up from “{n}”.",
    "ui.fanfare.rowSalary": "Monthly pay",
    "ui.fanfare.rowElectorate": "Electorate",
    "ui.fanfare.rowDiehard": "Diehard backers",
    "ui.fanfare.dieDiluted": "bigger district, thinner density",
    "ui.fanfare.next": "Next rung: {n} · needs {need} months in office (at {have})",
    "ui.fanfare.atMax": "That is the top of the ladder. All that's left is the term — and how the history books write you.",
    "ui.fanfare.skip": "A rocket promotion — {k} levels at once. The ranks you skipped never logged any seniority; someone will bring that up later.",
    "ui.fanfare.stat": "Promotion no. {n} this run · {y} · career peak Level {p}",
    "ui.fanfare.go": "TAKE OFFICE →",
    "ui.fanfare.goMax": "TAKE THE OATH →"
  }
});
