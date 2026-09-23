/* ============================================================================
 * CONTENT · i18n/en/reg/21-worldline.js
 * 中文文件 content/21-worldline.js（1980—1990 全局世界线基线）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md §3、docs/PARALLEL-CONTENT-WORK.md §4.4）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · worldline 在 core.js 里是**按字段逐年深合并**的，所以这里只写 brief / outlets
 *     两个字段，年份键（"1980"…"1990"）与中文侧一一对应，一个都不新增、不删除。
 *   · pressure 是数值（0—6 时代压力），不是文案，**不写**：写了也会被 i18n 层并进
 *     注册表，把平衡数值带进本地化改动，那是红名单 content/21-worldline.js 的活。
 *   · fixed 锚点表（event/year/month/grade）全是结构性键，没有玩家可见文案，不覆盖。
 *   · 年份覆盖范围：只做 1980—1990。1991—2024 的按年简报归各年代带分片
 *     （i18n/en/lines/126、127 已自带 2015—2021），重复覆盖会让后加载的一方顶掉前者。
 *
 * outlets 是"这一年确实存在、会替你把话说出去"的媒体：英文侧按 I18N.md §4 做**专有名词
 * 回译**（有线电视新闻网→CNN、华尔街日报→The Wall Street Journal…），条数与中文严格一致
 * （每年 4 家），《今日美国》1982 年 9 月才创刊，所以 1982 年之前不出现。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    worldline: {
      brief: {
        "1980": "Election year. Stagflation and the hostages in Tehran crush the incumbent; a former actor is making \"government is the problem\" into common sense.",
        "1981": "Reagan moves into the White House, and the assassination attempt that fails only lifts him. Tax cuts and deregulation get moving; the first blow lands on the striking air-traffic controllers.",
        "1982": "The deepest recession since the war: unemployment passes ten percent, and the farm belt and the rust belt bleed in the same season. The optimistic story shows its first crack.",
        "1983": "One night's bombing at the Beirut barracks pulls American troops back into a powder keg; Grenada is taken. The economy begins to climb and the talk of \"America is back\" gets louder.",
        "1984": "A landslide reelection. The opposition is still digesting the loss, while tax cuts and rearmament have become new common sense that neither party dares oppose out loud.",
        "1985": "The Plaza Agreement drives the dollar down and presses Japan and Europe onto the same negotiating table. Sidewalk prosperity beside shuttered plants; fast money starts hunting an outlet everywhere.",
        "1986": "Challenger comes apart seconds after liftoff, live in every classroom. On the day tax reform is signed, the Iran-Contra bill has already begun to ferment out of sight.",
        "1987": "Black Monday: the Dow loses a fifth of itself in a single session and the regulators are caught bare-handed. For the first time the faith in prosperity leaks in public.",
        "1988": "Election year, and power changes hands inside the same party. In December a jetliner breaks up over Lockerbie, and terrorism steps quietly to the front of the stage.",
        "1989": "The Berlin wall is chipped through in one night, and the champagne smell of \"the end of history\" fills the room. But the leaking tanker and the distant explosions have not presented their bill.",
        "1990": "Recession returns; Saddam swallows Kuwait and oil prices spike. The victory of the cold war has barely warmed before the first war of the \"new world order\" begins to mass."
      },
      outlets: {
        "1980": ["The Wall Street Journal", "Time", "CBS", "NBC"],
        "1981": ["The Wall Street Journal", "Time", "CNN", "ABC"],
        "1982": ["USA Today", "Time", "CNN", "CBS"],
        "1983": ["USA Today", "Newsweek", "CNN", "ABC"],
        "1984": ["The Wall Street Journal", "USA Today", "CNN", "CBS"],
        "1985": ["USA Today", "Time", "CNN", "NBC"],
        "1986": ["USA Today", "The Washington Post", "CNN", "ABC"],
        "1987": ["The Wall Street Journal", "USA Today", "CNN", "CBS"],
        "1988": ["The New York Times", "USA Today", "CNN", "NBC"],
        "1989": ["The Washington Post", "USA Today", "CNN", "ABC"],
        "1990": ["The New York Times", "The Wall Street Journal", "CNN", "CBS"]
      }
    }
  }
});
