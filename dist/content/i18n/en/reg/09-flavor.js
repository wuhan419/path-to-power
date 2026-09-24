/* ============================================================================
 * CONTENT · i18n/en/reg/09-flavor.js
 * 中文文件 content/09-flavor.js（时代风味词典）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md §3）：
 *   · kind 用同名 "flavor"，并进活注册表 reg.flavor。
 *   · 候选条目是**不带 id 的对象数组 → 按下标对齐**：条数与中文完全一致
 *     （ORG 20 ｜ PLACE 16 ｜ MEET 10 ｜ PUB 8），只写 text 一个字段，
 *     minYear/maxYear 留在原条目上不动（保护键，写了不同的值会被 validate 判失败）。
 *   · MEET 里内嵌的 {PLACE} 占位符原样保留，语序按英文重排（介词在前：in/at {PLACE}）。
 *   · 专有名词回译不翻译（Common Cause、League of Women Voters、UAW、AFL-CIO、
 *     ACT UP、MoveOn、Sierra Club、USA Today、Time、The Wall Street Journal…）。
 *   · 这里全是文案名词，不含结算逻辑；「」在英文里去掉或改成英文引号。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    flavor: {

      /* ---------- ORG：真实草根 / 公民 / 倡导组织（20 条，下标对齐） ---------- */
      ORG: [
        { text: "the local chapter of Common Cause" },
        { text: "the League of Women Voters" },
        { text: "a freshly organized county committee of the Moral Majority" },
        { text: "the county Eagle Forum chapter" },
        { text: "a UAW local" },
        { text: "the county AFL-CIO labor council" },
        { text: "the local team of the National Taxpayers Union" },
        { text: "the campus Nuclear Freeze committee" },
        { text: "the state chapter of PIRG" },
        { text: "the local ACT UP chapter" },
        { text: "the neighborhood crime-victims support group" },
        { text: "the block beautification league — anti-graffiti, anti-litter" },
        { text: "the local field office for the term-limits amendment" },
        { text: "a grassroots consumer-rights co-op" },
        { text: "the local chapter of MoveOn" },
        { text: "the regional Sierra Club chapter" },
        { text: "the core group coordinating the Tea Party flash mobs" },
        { text: "one of the street-mobilization networks that grew out of Occupy Wall Street" },
        { text: "an Indivisible-style county action group" },
        { text: "a new civic-advocacy group that just rented a storefront in town" }
      ],

      /* ---------- PLACE：真实街区 / 城区 / 县（16 条） ---------- */
      PLACE: [
        { text: "Youngstown's steel district" },
        { text: "Cleveland's Flats" },
        { text: "the Air Force family housing over in Dayton" },
        { text: "the old rubber-mill streets of Akron" },
        { text: "the Cincinnati waterfront" },
        { text: "the Detroit neighborhoods the plants left behind" },
        { text: "the Pittsburgh riverfront where the furnaces stood" },
        { text: "a main street in Queens" },
        { text: "the community center in lower Manhattan" },
        { text: "the rowhouse blocks of North Philadelphia" },
        { text: "the Baltimore harbor district" },
        { text: "the old German neighborhood in Milwaukee" },
        { text: "the immigrant blocks on the Tucson side of the border" },
        { text: "Atlanta's spreading suburbs" },
        { text: "a new Sun Belt subdivision outside Phoenix" },
        { text: "the new housing out past the fast-food strip" }
      ],

      /* ---------- MEET：拜票的说法（10 条，{PLACE} 原样保留） ---------- */
      MEET: [
        { text: "going door to door in {PLACE}" },
        { text: "handing out flyers at the back door of the church in {PLACE}" },
        { text: "meeting voters face to face in the union hall in {PLACE}" },
        { text: "holding a town hall at the community college in {PLACE}" },
        { text: "putting a folding table at the gate of the farmers market in {PLACE}" },
        { text: "passing out cards outside the minor-league ballpark in {PLACE}" },
        { text: "shaking every hand at the bar in {PLACE} before last call" },
        { text: "making an appearance at the barn raising in {PLACE}" },
        { text: "taping handwritten posters to the library board in {PLACE}" },
        { text: "working the parents one by one after graduation at the high school in {PLACE}" }
      ],

      /* ---------- PUB：报刊（8 条，当年真实存在的媒体） ---------- */
      PUB: [
        { text: "the Plain Dealer, the local daily" },
        { text: "the regional edition of The Wall Street Journal" },
        { text: "The New York Times" },
        { text: "the Community Chronicle — the weekly that shut down" },
        { text: "USA Today, still new" },
        { text: "Time magazine" },
        { text: "one of the first local news websites" },
        { text: "the hometown paper's politics blog" }
      ]
    }
  }
});
