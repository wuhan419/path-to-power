/* ============================================================================
 * CONTENT · 09-flavor.js
 * 时代风味词典 —— 供 engine/flavor.js 在抽取事件时按当年填进 {大写} 占位符。
 * --------------------------------------------------------------------------
 * 目的：让"可反复发生"的基层/职业事件每次都换一副真实面孔（换组织、换街区、
 *   换拉票说法、换报刊），根治"连续两次同一描述"。真实存在于那个年代的美国。
 *
 * 约定：
 *   · 每个 token 一组候选，{minYear,maxYear,text} 省略年份即全期通用。
 *   · text 里可再嵌别的 token（如 {MEET} 里写 {PLACE}），引擎会一并展开。
 *   · 只用「」不加英文引号；不要出现结算逻辑，这里全是文案名词。
 *   {ORG}=草根/公民组织  {PLACE}=真实街区/城区/县  {MEET}=拜票的说法  {PUB}=报刊
 *   {HOME}{STATE}{CITY}{DISTRICT} 是内置词（取主角家乡，见 engine/flavor.js），无需在此登记。
 * ==========================================================================*/

POTUS.define("flavor", {

  /* ---------- 真实草根 / 公民 / 倡导组织（按年代铺） ---------- */
  ORG: [
    { minYear: 1980, maxYear: 1984, text: "「公共事业利益」组织 Common Cause 的地方分会" },
    { minYear: 1980, maxYear: 1988, text: "妇女选民联盟（League of Women Voters）" },
    { minYear: 1980, maxYear: 1988, text: "保守派的「道德多数派」（Moral Majority）新募的县委会" },
    { minYear: 1980, maxYear: 1988, text: "弗吉尼亚·基格尔的「鹰论坛」（Eagle Forum）" },
    { minYear: 1980, maxYear: 1990, text: "汽车工人工会（UAW）的一个地方支部" },
    { minYear: 1980, maxYear: 1990, text: "AFL-CIO 在这片的地区劳工联合会" },
    { minYear: 1980, maxYear: 1990, text: "全国纳税人减负联盟的一支地方队伍" },
    { minYear: 1981, maxYear: 1995, text: "反核冻结运动（Nuclear Freeze）的校园委员会" },
    { minYear: 1982, maxYear: 1992, text: "「公共研究小组」（PIRG）的州分部" },
    { minYear: 1985, maxYear: 1995, text: "艾滋病平权行动联盟（ACT UP）的同城支部" },
    { minYear: 1986, maxYear: 1998, text: "邻里「犯罪受害者互助会」" },
    { minYear: 1988, maxYear: 2000, text: "反涂鸦、反垃圾的「美化街区协会」" },
    { minYear: 1990, maxYear: 2005, text: "推动「任期限制」修宪的地方办事处" },
    { minYear: 1994, maxYear: 2004, text: "一个草根消费者维权合作社" },
    { minYear: 1998, maxYear: 2012, text: "网上进步派组织 MoveOn 的本地分会" },
    { minYear: 2004, maxYear: 2016, text: "「塞拉俱乐部」（Sierra Club）的地方分支" },
    { minYear: 2009, maxYear: 2016, text: "「茶党」快闪协调的核心小组" },
    { minYear: 2011, maxYear: 2018, text: "「占领华尔街」之后涌现的街头动员网络" },
    { minYear: 2016, maxYear: 2020, text: "一支「抵抗」特朗普的县一级行动组（Indivisible 类）" },
    { text: "一个刚在镇上租下门面的新兴公民倡议团体" }
  ],

  /* ---------- 真实街区 / 城区 / 县（偏铁锈带与主角家乡，兼顾全国） ---------- */
  PLACE: [
    { minYear: 1980, maxYear: 2020, text: "扬斯敦的钢铁厂区" },
    { minYear: 1980, maxYear: 2020, text: "克利夫兰的东侧（the Flats 一带）" },
    { minYear: 1980, maxYear: 2020, text: "代顿的空军基地家属区" },
    { minYear: 1980, maxYear: 2020, text: "阿克伦的橡胶厂区老街" },
    { minYear: 1980, maxYear: 2020, text: "辛辛那提的河滨岸" },
    { minYear: 1980, maxYear: 2010, text: "底特律工厂外迁后空下来的社区" },
    { minYear: 1980, maxYear: 2020, text: "匹兹堡撤除高炉后的河岸" },
    { minYear: 1980, maxYear: 2020, text: "纽约皇后区的一条主街" },
    { minYear: 1980, maxYear: 2020, text: "曼哈顿下城的社区中心" },
    { minYear: 1980, maxYear: 2000, text: "费城北部工人住宅区" },
    { minYear: 1980, maxYear: 2020, text: "巴尔的摩的港区" },
    { minYear: 1980, maxYear: 2020, text: "密尔沃基的德裔老街区" },
    { minYear: 1990, maxYear: 2020, text: "图森边境一侧的移民社区" },
    { minYear: 1990, maxYear: 2020, text: "亚特兰大向外扩张的郊区带" },
    { minYear: 2000, maxYear: 2020, text: "凤凰城新垦的太阳带住宅区" },
    { text: "城郊结合部那片刚起了快餐连锁的新居民区" }
  ],

  /* ---------- 「拉选票 / 拜票」的多种真实说法（可内嵌 {PLACE}） ---------- */
  MEET: [
    { text: "在{PLACE}挨家挨户敲门" },
    { text: "在{PLACE}的教堂后门发传单" },
    { text: "在{PLACE}的工会大厅和选民面对面" },
    { text: "在{PLACE}的社区大学办一场市政厅对话（town hall）" },
    { text: "在{PLACE}的农夫市场门口支一张桌子" },
    { text: "在{PLACE}的小联盟棒球场外发名片" },
    { text: "赶在{PLACE}那家酒吧打烊前,挨个握手道谢" },
    { text: "在{PLACE}的谷仓集会（barn raising）上亮个相" },
    { text: "在{PLACE}的图书馆公告栏贴上手写海报" },
    { text: "在{PLACE}的高中毕业典礼后逐个家长寒暄" }
  ],

  /* ---------- 报刊（当年真实存在的媒体） ---------- */
  PUB: [
    { minYear: 1980, maxYear: 2020, text: "本地日报《老实人报》" },
    { minYear: 1980, maxYear: 2020, text: "《华尔街日报》的地方版" },
    { minYear: 1980, maxYear: 2020, text: "《纽约时报》" },
    { minYear: 1980, maxYear: 2007, text: "已经停刊的《社区纪事周报》" },
    { minYear: 1982, maxYear: 2020, text: "创刊不久的《今日美国》（USA Today）" },
    { minYear: 1980, maxYear: 2020, text: "《时代》周刊" },
    { minYear: 1990, maxYear: 2020, text: "刚上线不久的地方新闻网" },
    { minYear: 2005, maxYear: 2020, text: "本地报纸的政论博客版" }
  ]

});
