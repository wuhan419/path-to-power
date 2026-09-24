/* ============================================================================
 * CONTENT · i18n/en/reg/12-states.js
 * 中文文件 content/12-states.js（出生州／选区）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md §3）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的展示字段**（name / city / district / desc）。
 *   · kind 与中文侧一致：state（并入 P.reg.state）。
 *   · 州 id（OH / FL / TX …）被建角屏、身份条与事件条件引用，一律不动。
 *   · lean / strength / entryEffects 是结构数值键（顺风逆风、派系底色由引擎算），
 *     不写（写了即 protectedHits，validate 直接判失败）。
 *   · city / district 里的 {CITY}/{HOME}/{DISTRICT} 是引擎占位符（flavor.js 替换），
 *     这里给的是英文专名，占位符本身不出现于源，无需转义。
 *
 * 英文写法：真实美国州名与选区说法（Iowa / Rust Belt …），短句、现在时。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    state: {
      OH: {
        name: "Ohio",
        city: "Youngstown",
        district: "Congressional District 17 (steel-and-coal blue-collar mix)",
        desc: "Whoever wins Ohio wins the White House — both parties pour money in, the fight is brutal, and one win makes you a national story; "
          + "and once the Youngstown furnaces go cold, every trade, auto and steel story in the country finds you down this street"
      },
      FL: {
        name: "Florida",
        city: "Miami",
        district: "South Florida Cuban-American enclave",
        desc: "Retirees, Cuban immigrants, and Disney: every election here is a hurricane"
      },
      PA: {
        name: "Pennsylvania",
        city: "Scranton",
        district: "Northeastern industrial-corridor district",
        desc: "The streets of Philadelphia and the Appalachian valleys speak two languages; you have to be fluent in both"
      },
      TX: {
        name: "Texas",
        city: "Houston",
        district: "Gulf Coast district",
        desc: "Oil, ranches, and an ego two sizes too big; Democrats are the permanent minority here"
      },
      AL: {
        name: "Alabama",
        city: "Birmingham",
        district: "Black Belt cotton-county district",
        desc: "The heart of the Bible Belt. Sunday's pulpit carries more weight than Tuesday's ballot"
      },
      NY: {
        name: "New York",
        city: "Queens",
        district: "Queens multicultural district",
        desc: "Wall Street and the Bronx need each other on the same island; Republicans are the permanent minority here"
      },
      MA: {
        name: "Massachusetts",
        city: "Boston",
        district: "Suffolk County urban district",
        desc: "A political tradition older than the Constitution; the home base of academia, lawyers, and reformers"
      },
      CA: {
        name: "California",
        city: "East Los Angeles",
        district: "East L.A. Latino district",
        desc: "From San Francisco to Orange County, one freeway strings together two Americas; Democrats hold the edge but fight among themselves"
      },
      GA: {
        name: "Georgia",
        city: "Atlanta",
        district: "Metro-expansion suburban district",
        desc: "Atlanta keeps growing while the country rules stay put; nobody can say for sure what color it turns next"
      },
      MI: {
        name: "Michigan",
        city: "Detroit",
        district: "Auto-city union district",
        desc: "Birthplace of the auto unions: the assembly line taught these people how to organize, and taught them what it means to be abandoned"
      }
    }
  }
});
