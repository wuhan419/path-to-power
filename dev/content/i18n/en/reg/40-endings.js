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
      { id: "reck_assassinated",
        title: "Like Kennedy, You Left With Your Mind Wide Open",
        body: "The textbooks remember three names: Lincoln in 1865, Kennedy in 1963 — and you, in the smaller type of the footnote. The country's traditional craft gained a new inheritor. The audience clapped half a beat too late, and then it clapped for you. The style critics were not wrong: your hair remains unsurpassed to this day — no one has lived long enough to dare copy it. Political assassination is never secret: it only counts as an accident once somebody decides to try." },
      { id: "reck_framed",
        title: "Charges Without Basis, Sentence Without Appeal",
        body: "A case that never happened gained one real section after all: the years you served. The prosecutor's win-rate spreadsheet has no column for your innocence — it was never on the evidence list. The system never forges documents. The system files them. And filing, in this country, means never deleting." },
      { id: "reck_ruined",
        title: "You Paid for the Front Page — and the Death Certificate",
        body: "The four-week series finally wrapped, and you were its best-selling episode. Your name moved from the politics section to the metro section — where layouts never get pulled and subscriptions run for life. The press never fabricates a case. It only tells true things in the right order." },
      { id: "reck_purged",
        title: "Administratively Deleted by Your Own Party",
        body: "No impeachment, no trial — just redistricting, a registration scandal, and one \"technical\" ballot barrier. Nixon's famous enemies list saved you a seat: number 21 — the twenty ahead of you all finished. The order that purged you was written in sober prose, like the disposal of faulty equipment: every procedure observed, and not one signature authorizing you to keep existing. The machine doesn't ignite when it grinds people. It closes valves." },
      { id: "reck_bankrupt",
        title: "Your Campaign Manager Took the Remainder to the Bahamas",
        body: "The lecture halls still remember your name; the collections department only knows your account number. After {late} consecutive months of missed payments, a bankruptcy court accepted your petition — Chapter 7, the most popular chapter in the federal code. The judge added a personal note at the bottom of the order: \"A person who could win a primary could not win five hundred dollars a month.\" As for your campaign manager: the day the credit freeze took effect, their last social-media check-in came from Nassau, Bahamas, cocktail in hand, captioned — \"At last, campaign money I could spend on myself.\"" },
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
      { id: "career_president_great",
        title: "A President in the Textbooks",
        body: "You played the whole board out to 2025. After your years in the White House you did not rush for the exit; you stayed at the table and watched the laws you signed and the people you appointed slowly bend the country. From 1980 to the final bell your name had long since entered the textbooks — entered it clean." },
      { id: "career_president",
        title: "A President Who Left a Mark",
        body: "You ran this country, and you carried the game all the way to 2025. The argument over your term still rages in bars and editorials, but no one now pretends you were never here. From 1980 to the day you set down the pieces, you climbed the mountain of power and came out the other side." },
      { id: "career_heavyweight",
        title: "Power Behind the Throne",
        body: "You were always one step from the White House, and never once far away. Forty-five years on, no convention, no war chest, no vote in the chamber moved without routing through you. Not becoming president is this country's regret — not yours." },
      { id: "career_federal",
        title: "A Name in Washington",
        body: "You grinded your way up into the federal tier and planted your feet in Washington. History will not keep a page for you alone, but your seal is on any number of documents. For a public servant, that is the dignity you can ask for." },
      { id: "career_state",
        title: "An Evergreen of State Politics",
        body: "The national stage never lit for you, but within one state you outlasted term after term and rival after rival, until you had become the tree no local politics could step around. Forty-five years, and you made a state your own fief." },
      { id: "career_local",
        title: "The Local Grind",
        body: "You never left your name anywhere higher, but from 1980 on a county, a school board, a local ballot always carried you. On the pyramid of power you held your one square all the way to the 2025 bell." },
      { id: "career_quiet",
        title: "Forty-One Quiet Years",
        body: "From 1980 to 2025 you stayed on the sideline. You voted, you donated, you applauded other people's victories, but your own name was never once read aloud. This game is over — and most political stories were always like this: they begin quietly, and they end quietly." },
      { id: "default",
        title: "Intermission",
        body: "The story continues. This game ends here." }
    ]
  }
});
