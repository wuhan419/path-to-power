/* ============================================================================
 * CONTENT · events/54-era-waves.js
 * 时代浪潮：真实历史事件按「主角当时的位置」分化成不同版本。
 *
 * 写法核心（区别于普通事件）：
 *   同一个历史时刻，T0 的人在征兵队列里，T3 的人在投票席上 —— 所以同一个
 *   历史节点写成两条独立事件，各带各的 tierMin/tierMax，引擎自动按层级分流。
 *
 * 「投入浪潮」：没有政府背景的人（低 tier / ngo / outsider）可以选择站进
 *   浪潮里 —— 用时间换政治资本（rep/基层/工会好感），拿到 wave_* 标记，
 *   后续事件认这些标记给更高的起点（政治资本兑现）。
 *
 * 恶性结局挂钩：时代大事件的 critfail 在「已有调查」时直接 hardEnd（入狱/
 *   身败名裂），或 fall（下野，还能东山再起）—— 对应 40-endings.js 的新规则。
 *
 * 写作注意（老规矩）：
 *   ① 字符串里只用「」，不用 ASCII/全角弯引号
 *   ② 每个事件必须有保底选项（无 cost 无 req）
 *   ③ brief 四段齐全，日期钉在真实历史锚点上
 *
 * 本包只保留 2008 时代的浪潮（时钟 1980 起）：占领华尔街 / 茶党 / 底特律听证。
 *   1960、1974 时代的浪潮事件（越战征兵、街头民权、石油加油队、泄密链、校车
 *   废校）属 pre-1980 死内容，已移入 deprecated/snapshots/54-era-waves.js
 *   （冻结，不翻译不改动，将来真做那个年代再从这里取回）。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2008 时代 · 占领华尔街 —— 帐篷里的政治资本
   * ==================================================================== */

  {
    id: "wave_occupy_low",
    grade: "mid", valence: "risk", dyn: true, unique: true, category: "civil", era: ["2008_CRASH"],
    tierMin: 0, tierMax: 2, fromYear: 2011, toYear: 2012, month: 9, weight: 20,
    brief: {
      lede: "公园里的帐篷城。图书馆、厨房、和一条人人都在等的推特。",
      known: [
        "祖科蒂公园被帐篷占满；「九十九」两周上了所有媒体。",
        "没领袖、没纲领、人人可发言：这是魅力也是病。",
        "你认识的人都在里面，也有职业活动家和几个来路不明的人。"
      ],
      rumor: [
        "据说市政已定了清场日期，就等天冷。",
        "据说两党在盯这股劲儿流向哪，也据说场内有便衣。"
      ],
      unknown: [
        "这个词会改变此后十年的政治语言。",
        "帐篷里认识的人，十年后可能进了国会山。"
      ],
      terms: [
        { k: "占领华尔街", v: "2011 年纽约露营抗议，直指贫富分化。" }
      ]
    },
    title: "占领华尔街的帐篷城请你去做对外沟通",
    body: "公园里的帐篷没有减少的迹象。你去送过一次咖啡，现在他们问你：要不要留下来帮他们做「对外沟通」——你有一张会说话的嘴。",
    choices: [
      {
        id: "join", text: "住进帐篷：成为他们的一员",
        note: "把生活搬进去。「亲历者」三个字在未来的选举里对抗任何精英履历。代价：档案、时间和接下来的每个冬天。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你成了帐篷城的声音之一：镜头找你，捐款经你，警方的档案也给你立了页。冬天来之前，你已经把运动里认识的两百个人存进了自己的通讯录。", effects: { rep: 3, fac: { base: 16, labor: 8, commercial: -10, agency: -6 }, flags: ["wave_occupy"] } },
          ok: { body: "你在帐篷里过了六个星期。清场那天你被抬走的样子上了地区新闻——没有名字，但你的选区都看见了。", effects: { rep: 1.75, fac: { base: 12, commercial: -6, agency: -4 }, flags: ["wave_occupy"] } },
          meh: { body: "你参与了，也看清了：一群好人、无领袖、和无限延长的大会。你带着笔记本离开。", effects: { rep: 1, fac: { base: 8, commercial: -4 }, attr: { INT: 2 }, flags: ["wave_occupy"] } },
          fail: { body: "清场那晚你不在。第二天你去收拾东西，公园已经冲洗干净，像什么都没发生过。", effects: { rep: 0.4, fac: { base: 4 } } },
          critfail: { body: "一段你的发言视频被剪了：掐头去尾之后，你像在号召冲击银行。原视频三千播放，剪辑版三十万。", effects: { rep: -1.5, fac: { base: 6, press: -10, commercial: -12 }, flags: ["scandal_2", "wave_occupy"] } }
        }
      },
      {
        id: "bridge", text: "做桥梁：替工会跟帐篷城牵线",
        note: "不上帐篷也不旁观：把组织资源（工会、教会）和街头热情连起来。两边都讨好，两边都怀疑你。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "fac", key: "labor", w: 0.3 }],
        outcomes: {
          crit: { body: "工会的大巴开进了公园：食物、热水、和几百个有编制的抗议者。两个月的松散运动第一次有了后勤。所有人都记住了是谁牵的线。", effects: { rep: 2, fac: { base: 8, labor: 14 }, flags: ["wave_occupy"] } },
          ok: { body: "牵线成功了一半：工会出了声援声明，但没出大巴。已经比大多数「联盟」走得远。", effects: { rep: 1.25, fac: { labor: 9, base: 4 } } },
          meh: { body: "工会的人听完说「有意思」，然后去开了别的会。你学会了听懂「有意思」。", effects: { fac: { labor: 3 } } },
          fail: { body: "帐篷城里有人指你是「工会的特务」，工会那边则嫌你太出风头。两头不是人。", effects: { fac: { labor: -4, base: -4 } } },
          critfail: { body: "你安排的会面照片流出：标题写的是「工会高层密会占领领袖」。双方的公关部门同时找你谈话。", effects: { rep: -1, fac: { labor: -8, base: -6, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "observe", text: "在 Twitter 上支持，人不去",
        note: "转发的成本是零，收益也是零——但至少档案上不会有你的帐篷编号。",
        base: 0.8,
        outcomes: {
          crit: { body: "你的几条推文在小圈子里转了转。有个帐篷里的人回复：下次来现场。你回了个拳头。", effects: { fac: { base: 3 } } },
          ok: { body: "你关注了这件事，偶尔转发。像大多数人一样。", effects: { fac: { base: 1 } } },
          meh: { body: "转发被同事的领导看到了。周一的会议上气氛微妙。", effects: { fac: { base: 2, commercial: -2 } } },
          fail: { body: "你的时间线安静地滑过去了。后来别人讲起那个秋天，你只能点头。", effects: {} },
          critfail: { body: "你转的那条「占领」口号来自一个后来被证实是假账号的帖子。截图留下了。", effects: { rep: -0.6, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2008 时代 · 茶党 —— 另一边的浪潮
   * ==================================================================== */

  {
    id: "wave_tea_rally", photo: "era-2009.jpg",
    grade: "mid", valence: "risk", dyn: true, unique: true, category: "civil", era: ["2008_CRASH"],
    tierMin: 0, tierMax: 3, fromYear: 2009, toYear: 2012, month: 4, weight: 18,
    brief: {
      lede: "科赫兄弟的账单、两条创始人的推文、和一个雨天的市政厅。",
      known: [
        "救市后一段记者怒骂视频点着另一边怒火，市政厅挤满人。",
        "你选区的市政厅下周开会，组织者电台里喊「坐满会议室」。",
        "愤怒是真的：账单、房贷、「我们的钱救了他们」。背后也有钱。"
      ],
      rumor: [
        "据说集会背后有资金网络：智库、电台、家族基金会。",
        "据说建制派在算：这股力量能收编还是得扑灭。"
      ],
      unknown: [
        "茶党一年内会改写一个政党。",
        "浪也会退。退潮时，浪尖上的人会挂在滩上。"
      ],
      terms: [
        { k: "茶党", v: "右翼民粹运动：反税、反救市、反大政府。" }
      ]
    },
    title: "茶党要坐满市政厅会议，逼你表态",
    body: "选区的市政厅要讨论联邦项目，组织者号召「坐满会议室」。你收到了两份邀请：一份来自愤怒的人群，一份来自吓得想让你去「灭火」的商会。",
    choices: [
      {
        id: "ride", text: "站上讲台，把这股怒气接住",
        note: "替人群说话，人群就会把你抬起来。茶党的浪最高的时候，浪尖上连无名之辈都能起飞。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "stance", key: "outsider", w: 0.2 }],
        outcomes: {
          crit: { body: "你的三分钟发言被拍了竖屏，一周五十万播放。三个月后，你被邀请在州级集会上压轴。", effects: { rep: 2.75, fac: { base: 14, commercial: -6, establishment: -10 }, flags: ["wave_tea"] } },
          ok: { body: "会议室的人站起来为你鼓掌。商会的邀请函第二天被撤回了。", effects: { rep: 1.5, fac: { base: 10, establishment: -6, commercial: -4 }, flags: ["wave_tea"] } },
          meh: { body: "你讲得不错。人群激动的原因你理解了七成——剩下三成你不敢深想。", effects: { rep: 0.8, fac: { base: 6, establishment: -3 } } },
          fail: { body: "你被起哄了：人群要的是怒吼，你给的是分析。有人喊「下一个」。", effects: { rep: -0.4, fac: { base: -4 } } },
          critfail: { body: "你引用的一组数据被当场戳穿是错的。竖屏照样传了五十万——配的标题是「精英的傲慢」。", effects: { rep: -1.75, fac: { base: -8, press: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "cool", text: "应商会之请去「灭火」",
        note: "把怒气引回会议室的程序里。商会记得你的靠谱，人群记得你是谁的人。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.3 }, { src: "fac", key: "commercial", w: 0.3 }],
        outcomes: {
          crit: { body: "你把会议主持住了：怒气没有消失，但议程走完了。商会当场决定支持你「更进一步」。", effects: { rep: 1, fac: { commercial: 12, establishment: 8 }, fun: 2.75 } },
          ok: { body: "会议没出事。商会的人跟你握手时说了三个字：「有前途」。", effects: { fac: { commercial: 8, establishment: 5 } } },
          meh: { body: "你讲道理，人群讲分贝。会议延期了。双方都怪你。", effects: { fac: { commercial: 3, base: -6 } } },
          fail: { body: "「灭火」的照片传开了：你站在台上，台下全是愤怒的手指。标题替你选了边。", effects: { rep: -1, fac: { commercial: 5, base: -10, press: -4 } } },
          critfail: { body: "你私下跟商会说的「这帮人迟早散」被人录了音。录音在人群的邮件列表里转了一个月。", effects: { rep: -2, fac: { base: -14, commercial: 4, press: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "document", text: "去做田野：把每个人名字都记下来",
        note: "不站队，做记录。名单是民主政治里最古老的本钱——无论浪往哪边打。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你收了两百份问卷和一百多个联系方式。半年后，无论哪边参选的人，都来问你要过名单。", effects: { rep: 1.25, fac: { base: 6, commercial: 4, press: 4 }, contact: { fixer: 8 }, flags: ["wave_tea"] } },
          ok: { body: "名单攒起来了。做记录的人不会被骂，也很少被记得——暂时。", effects: { rep: 0.6, fac: { base: 3, press: 3 } } },
          meh: { body: "两百份问卷，一半是愤怒的涂抹。你学到的是：愤怒有语法。", effects: { attr: { INT: 2 }, rep: 0.4 } },
          fail: { body: "举着写字板的人在人群里格外显眼。有人抢过你的板子摔了。", effects: { fac: { base: -4 }, hp: -0.5 } },
          critfail: { body: "你的名单被怀疑是「给谁做的」。无论你怎么解释，板子上那两百个名字看起来都像情报。", effects: { rep: -0.8, fac: { base: -6, agency: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2008 时代 · 底特律听证 —— 一座城的生死的会场版
   * ==================================================================== */

  {
    id: "wave_detroit_high", photo: "wave_detroit_high.jpg",
    grade: "major", valence: "bane", dyn: true, unique: true, category: "crisis", era: ["2008_CRASH"],
    tierMin: 3, tierMax: 5, fromYear: 2008, toYear: 2010, month: 12, weight: 18,
    brief: {
      lede: "三家汽车公司的老板坐着公司的商务机来要钱——报纸标题自己会写。",
      known: [
        "底特律三巨头在国会哭穷，要几百亿救援贷。上次轮华尔街。",
        "来听证路上经过一家零件厂，停车场草长了半尺。",
        "算术很冷：救是几百亿，不救是几十万岗位圣诞前清零。"
      ],
      rumor: [
        "有人说三家其实有一家有救，另外两家是搭车的。",
        "据说白宫倾向「有条件的救」，条件里塞着私货。"
      ],
      unknown: [
        "救助通过，但岗位和退休金再也回不来。",
        "这一票会成为密歇根二十年版图的注脚。"
      ],
      terms: [
        { k: "汽车业救助", v: "2008 年对三车厂的纾困，附带重组条件。" }
      ]
    },
    title: "国会要表决一笔几百亿的汽车业救援",
    body: "听证会开了两天，全美国都在看那些坐着商务机来要钱的老板。现在轮到你表态：几百亿，救还是不救——圣诞节的新闻标题已经排好两个版本。",
    choices: [
      {
        id: "save", text: "投救援：几十万岗位不能在圣诞节清零",
        note: "保住岗位是真实的，救援的骂名也是真实的。工会会记住你，茶党的广告也会。",
        base: 0.55, mods: [{ src: "fac", key: "labor", w: 0.4 }],
        outcomes: {
          crit: { body: "救援案通过，条件里你塞进了工人退休金的保护条款。工会的通讯把你的照片印在了头版。", effects: { rep: 1.25, fac: { labor: 16, base: 8, commercial: -4 } } },
          ok: { body: "你投了支持。密歇根的报纸谢了你，别州的社论问你「下一个是谁」。", effects: { rep: 0.6, fac: { labor: 10, base: 4, commercial: -2 } } },
          meh: { body: "票投了，案过了，条件把你原本想要的条款稀释成了一句「原则性关切」。", effects: { fac: { labor: 6, base: 2 } } },
          fail: { body: "救援通过了，但一年后工厂还是关了两条线。工会怪条件太松，报纸怪你太软。", effects: { rep: -0.4, fac: { labor: 2, base: -6 } } },
          critfail: { body: "你在听证上替高管辩护的那段话，被剪进了茶党的全国广告：「你的钱，他的商务机」。", effects: { rep: -1.25, fac: { labor: -6, base: -14, press: -8 }, flags: ["scandal_3"] } }
        }
      },
      {
        id: "no", text: "投反对：不能纳税人救所有犯错的巨无霸",
        note: "财政鹰派和茶党的掌声真实存在，工会的怒火也是。这一票在工业州是负债，在阳光地带是资产。",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.3 }, { src: "fac", key: "commercial", w: 0.2 }],
        outcomes: {
          crit: { body: "你的反对演说逻辑严整，被财政鹰派奉为「那一年最好的一段」。三个州的筹款邀请飞来。", effects: { rep: 1, fac: { base: 8, commercial: 8, labor: -14 }, fun: 1.25 } },
          ok: { body: "你投了反对。案还是过了，但你的立场清晰得可以印在传单上。", effects: { rep: 0.4, fac: { base: 6, commercial: 5, labor: -10 } } },
          meh: { body: "反对票没挡住什么，只表达了什么。表达在政治里也算工作。", effects: { fac: { base: 3, labor: -6 } } },
          fail: { body: "选区的工会把你的画像贴在了本地会议的门口——靶心的位置。", effects: { rep: -0.6, fac: { labor: -16, base: -6 } } },
          critfail: { body: "你反对救助的第二天，你选区最大的零件厂宣布关门。新闻发布会你被问了十一次「现在呢」。", effects: { rep: -1.25, fac: { labor: -18, base: -12 }, flags: ["scandal_2"], fall: 1 } }
        }
      },
      {
        id: "condition", text: "有条件支持：把救援改造成「重组计划」",
        note: "中间路线：救，但要换管理层、要还钱、要时间表。做成了是艺术，做不成是两边挨打。",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.5 }],
        outcomes: {
          crit: { body: "你牵头拟的修正案成了最终版本：钱分批、条件带钩、政府持股。报纸说这是「教科书式的中间路线」。", effects: { rep: 1.5, fac: { labor: 8, commercial: 6, base: 6, establishment: 8 }, attr: { INT: 2 } } },
          ok: { body: "修正案采纳了大半。救援带上了缰绳——缰绳握多紧，以后见分晓。", effects: { rep: 0.7, fac: { labor: 5, commercial: 4, establishment: 5 } } },
          meh: { body: "条件加了，但执行条款被删了。你知道那才是牙齿。", effects: { rep: 0.2, fac: { labor: 3, commercial: 2 } } },
          fail: { body: "两边都拒绝了你：一方说太少，一方说太多。中间派的地盘比想象的窄。", effects: { fac: { labor: -4, commercial: -4, base: -3 } } },
          critfail: { body: "你的方案被《华尔街日报》和工会报纸同一天骂——两边用的词几乎一样：天真。", effects: { rep: -0.8, fac: { labor: -8, commercial: -6, press: -6, establishment: -5 } } }
        }
      }
    ]
  }

]);
