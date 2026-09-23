/* ============================================================================
 * CONTENT · i18n/en/reg/40-endings.js
 * 中文文件 content/40-endings.js（结局规则）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md §3）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的展示字段**（title / body）。
 *   · ending 在 reg 里是数组：覆盖层按 **id** 定位，顺序无关。
 *   · when / gate / priority / tierMin / flags / trackIn 等条件字段是**逻辑**，
 *     由引擎 PROTECT 键保护或干脆不写，本层绝不出现。
 *   · {age} 是引擎占位符（progression.js 渲染时替换），英文原样保留。
 *
 * 英文写法：史学家评语 / 政治回忆书评辞的口气——短句、克制、过去时收尾。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    ending: [
      { id: "president_great",
        title: "A Great President",
        body: "You reached the very top. Historians will argue whether you saved the country or picked its bones; no one denies that the country never took the same course again." },
      { id: "president_flawed",
        title: "A Contested Presidency",
        body: "You moved into the White House and brought your scandals into the Oval Office with you. History's verdict on you will run about as long as the files you left behind." },
      { id: "prison",
        title: "Guest of the Federal Prison",
        body: "Every rung, every deal, led to one iron door. You signed the plea. A page of the era records your name under a single word: convicted." },
      { id: "disgrace",
        title: "A Name in Ruins",
        body: "No handcuffs — and no funeral either, which is colder. Your name became a byword for scandal; the clip files pin your photograph beside the headlines. Your political life stopped one afternoon, mid-sentence, before you could say goodbye." },
      { id: "death_health",
        title: "The Lamp Goes Out",
        body: "Overwork and indulgence arrived first. You collapsed at {age}; the game of power went on as usual after your eyes closed." },
      { id: "retire_kingmaker",
        title: "The Man Who Never Ran",
        body: "You never once put your own name on a ballot, yet you decided other people's victories and defeats. This is how a kingmaker exits — unnoticed, undefeated." },
      { id: "retire_magnate",
        title: "Power Behind the Purse",
        body: "You did not win elections. You bought them. It took years for people to notice who the house really was." },
      { id: "retire_media",
        title: "The Proprietor",
        body: "You no longer had to persuade the press — you were the press. On the day you stepped down, the front page was yours, in your own words." },
      { id: "retire_high",
        title: "A Dignified Exit",
        body: "You sat close enough to power, for long enough, that people began to miss you. In Washington that is a rare achievement." },
      { id: "retire_comeback",
        title: "The Comeback",
        body: "You had fallen from office — the day you handed over the keys, everyone assumed the story was over. You climbed back one rung at a time from the bottom, and finished higher than where you fell. This country loves a redemption story; you wrote yourself into one." },
      { id: "retire_fallen",
        title: "Ending at the Bottom",
        body: "You lost power once, and spent the rest of your life making peace with it. You never regained the height — but you never conceded either. The stairs were simply too steep, and the time too short." },
      { id: "retire_low",
        title: "A Quiet Departure",
        body: "At {age} you chose to leave, back to somewhere no one knows you. No presidential laurels — but no noose, either." },
      { id: "default",
        title: "Intermission",
        body: "The story continues. This game ends here." }
    ]
  }
});
