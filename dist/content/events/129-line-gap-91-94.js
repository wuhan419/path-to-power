/* ============================================================================
 * CONTENT · events/129-line-gap-91-94.js
 * 连续时间轴 · 1991—1994 定点大事补薄（w55 / Track B 口径，见 docs/PARALLEL-CONTENT-WORK.md §4.2）。
 *
 * 形制照 events/120-line-1991-94.js（同带主文件）：
 *   · 不写 era —— 一律绝对年窗 minYear/maxYear + scoped。
 *   · 到点必发 —— 本文件末尾 POTUS.define("fixed", …) 钉死年月量级；
 *     只补 120 带未覆盖的四件定点大事（听证确认 / 1992 大选夜 / 背景审查法 / 犯罪法），
 *     不与 gulf9x_*、ln9x_* 存量锚点重复。
 *   · 世界线 —— 1991—1994 的 pressure/brief/outlets 已由 120 带写过，本文件不重复挂。
 *
 * 铁律：字符串只用「」；每卡恰有一个无 cost 无 req 的保守保底选项（高地板低天花板、
 *   ok 为正小额、fail 幅度 ≤ 冒险项一半、不埋负面 flag）；冒险项之间
 *   支出↔把握↔天花板错位，收益铺 ≥2 根轴，同卡 base 极差 ≥0.10。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 1991-10 · 大法官确认听证 —— 直播里的罗生门（风险面）
   * ==================================================================== */
  {
    id: "ln91_hearings", grade: "mid", category: "civil",
    valence: "risk", dyn: true,
    minYear: 1991, maxYear: 1991, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 12, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 10, photo: "era-1991.jpg",
    title: "大法官提名人被前下属在全美直播的听证会上当面指控",
    body: "最高法院提名人坐在镜头前，与他当年的女下属、一位法学教授互相指认：她说他当年没完没了地追问，他说这是「高科技私刑」。委员会七比五把提名送交全院，五十二比四十八，确认了。\n" +
      "妇女与黑人的票仓在你眼前被劈成两半。你所在州的教堂、工会和妇女团体都在等你的第一句话——每一句都收不回去。",
    brief: {
      lede: "直播把一桩罗生门送进每间客厅：两块票仓当场裂开，各半都在等你站哪边。",
      known: [
        "委员会七比五送全院，全院五十二比四十八确认。",
        "指控者是名校法学教授，证词在全美直播里讲完。",
        "提名人对镜头全盘否认，听证照样过了。",
        "本州的妇女团体与黑人教会各自发了联名信。"
      ],
      rumor: [
        "有人说还有两名前下属备好了证词。",
        "有人说党团早投定了票，直播只是过场。"
      ],
      unknown: [
        "裂开的票仓明年怎么合。",
        "今天这句表态几时来兑。"
      ],
      terms: [{ k: "确认听证", v: "参院司法委员会表决后全院认证。" }]
    },
    choices: [
      {
        id: "reopen", text: "要求重开听证、补充传唤证人，站在指控者一边",
        note: "赌的是妇女选票与教会一起记账。风险：党团会记你「不守规矩」。",
        base: 0.45, cost: { fav: 1 }, mods: [{ src: "attr", key: "INTG", w: 0.45 }, { src: "fac", key: "press", w: 0.25 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你的补传证人动议在州里有人跟进，妇女组织抬着你的名字走上街头。人们从这天起管你叫「肯听证词的人」。", effects: { rep: 1.2, fac: { press: 6, base: 8, church: 4 }, voters: { warm: 600 } } },
          ok: { body: "你为重开听证发了言，评论版引用了你，妇女联盟的电话道了谢。", effects: { rep: 0.6, fac: { base: 5 }, voters: { warm: 200 } } },
          meh: { body: "你的申请信被堆在委员会的同类函件顶上，没人批，也没人驳。", effects: { rep: -0.2 } },
          fail: { body: "证人没传来，党团把你排进「不听话名单」，来年的募款电话明显变少。", effects: { rep: -1.5, fac: { establishment: -6, commercial: -6, church: -3 } } },
          critfail: { body: "你在听证会外的措辞被剪成「媒体审判」样本，投诉信像雪片。你的名字响了，成色却成了问号。", effects: { rep: -2.5, fac: { press: -6, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "vouch", text: "对镜头替提名人背书：程序优先，传闻不定罪",
        note: "赌的是中间选民不吃直播这一套。风险：妇女票仓当场对你关门。",
        base: 0.5, req: { fac: "establishment", min: 20 }, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "establishment", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你的「程序优先」上了全国保守派专栏，党团把下一个能办事的位置留给你。晚宴请帖叠着来。", effects: { rep: 1.1, fun: 2.5, fac: { establishment: 9, commercial: 5 } } },
          ok: { body: "你站了稳妥的一边。建制点头，专栏懒得骂你，这就够了。", effects: { rep: 0.4, fun: 1, fac: { establishment: 5 } } },
          meh: { body: "你发的声明像一份新闻通稿。建制不觉得被帮了，公众也没觉得什么。", effects: { rep: -0.15 } },
          fail: { body: "表决过了，你补一句「没什么可再说」。这句话被妇女集会一遍遍放给你听。", effects: { rep: -1.6, fac: { base: -10, commercial: -4 } } },
          critfail: { body: "你在私下晚宴上的那句俏皮话被人递了出去。从此你走到哪，那段录音就跟到哪；金主绕开你，记者开始约你「解释」。", effects: { rep: -2.6, fun: -2, fac: { press: -8, church: -5 }, flags: ["scandal_1", "investigation_open"] } }
        }
      },
      {
        id: "listen", text: "不表态：回区里办一场「一起看完听证」的讨论会",
        note: "最稳的一步：不借风也不挡火。不攒大分，也不挨闷棍。",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "讨论会开到很晚，两拨人都觉得被倾听了。晚报给了张小照片：一间平静的屋子。", effects: { rep: 0.2, fac: { base: 3 } } },
          ok: { body: "你倒了咖啡、打了招呼，一句立场没提。区里记得你到场了。", effects: { rep: 0.2, fac: { base: 2 } } },
          meh: { body: "来了十来个人。听证在每家的电视里，不在你这里。", effects: { rep: 0.05 } },
          fail: { body: "散场有人当众问：所以你站哪边？你说站事实那边。有人笑了。", effects: { rep: -0.2 } },
          critfail: { body: "两头都没讨到话，两头的名单上倒都有了你：「那个不吭声的」。不疼，但记得住。", effects: { rep: -0.25 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1992-11 · 大选夜 —— 浪潮换了方向（机遇面）
   * ==================================================================== */
  {
    id: "ln92_election", grade: "major", category: "political",
    valence: "boon", dyn: true,
    minYear: 1992, maxYear: 1992, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 11, photo: "era-1992.jpg",
    title: "挑战者靠「关键是经济」赢下大选夜，单党十二年收场",
    body: "挑战者把「关键是经济」喊成了全国方言，计票夜赢下白宫：同一党执掌白宫十二年，一夜结清。第三党候选人卷走近两成普选票，把在任者在数个只有一两个点差距的州顶下了台。\n" +
      "同一夜，新总统所在党把参众两院一并握住——这样的「一党通吃」，已经四十年没出现过。浪潮已经在路上：不在浪头上的人，就得吃浪。",
    brief: {
      lede: "浪潮已经上路：谁先挤上车谁有座，可浪也会回头把人拍在甲板上。",
      known: [
        "当选者所在党同时握住了参众两院多数。",
        "第三党拿了近两成普选票，选举人票一张没有。",
        "数个州的最终差距只有一两个点。",
        "新政府上台的一百天，本地任命表要重新排。"
      ],
      rumor: [
        "有人说第三党九月就散，明年另立门户。",
        "有人说交接班底在排座次，不给外人留门。"
      ],
      unknown: [
        "浪头能站多久。",
        "今天的赢家名单有没有你。"
      ],
      terms: [{ k: "选举人团", v: "逐州计票、赢者通吃的选总统制度。" }]
    },
    choices: [
      {
        id: "bandwagon", text: "天亮前发去第一封贺电，排队进新多数谈本地席位",
        note: "赌的是先来的人有座。风险：排队的人比座位多得多。",
        base: 0.5, req: { tier: 2 }, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "fac", key: "establishment", w: 0.25 }],
        outcomes: {
          crit: { body: "交接团队记住了「第一个道贺的人」。州里那个空缺还没挂牌，名字已经先在办公桌上过了一遍。", effects: { rep: 1.3, tier: 1, fac: { establishment: 6 } } },
          ok: { body: "你挤进了胜利合影的第一排。图说里没你的名字，可位置对了。", effects: { rep: 0.6, fac: { establishment: 6 } } },
          meh: { body: "贺电有几千封，你那一封在归档里排到了窗边。", effects: { rep: 0.2 } },
          fail: { body: "交接班子把「太早太热络」记在了你名下。没人点破，只是笑意淡了。", effects: { rep: 0.1 } },
          critfail: { body: "你的贺电被当成别人的转发给了报料人。玩笑传了一星期，你的名姓跟着传了一星期。", effects: { rep: 0.05 } }
        }
      },
      {
        id: "rebuild", text: "不追风口：把党的地方组织按新票仓从头重排",
        note: "赌的是浪潮能变成登记册。风险：重排的刀先削到自己。",
        base: 0.45, req: { fac: "base", min: 15 }, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "选区重划在你手里做成了实活：来年女性参政的名单排队借你的名头，「她们之年」的头功里有你一个。", effects: { rep: 1.1, fac: { base: 10, labor: 5 }, voters: { warm: 800 } } },
          ok: { body: "机构重排完成，党员册多了两千个名字。都在庆贺，没人注意你干了活。", effects: { rep: 0.6, fac: { base: 5 }, voters: { warm: 250 } } },
          meh: { body: "重排做了一半，另一半在等划界的那张桌子安静下来。", effects: { rep: 0.2 } },
          fail: { body: "你在重排里丢了分区的座次，换来一句「大局需要」。被你抬进来的人还叫你老板。", effects: { rep: 0.1, fac: { base: 2 } } },
          critfail: { body: "重排砸了锅，党报登了封道歉信。信没点名，可整个县城都知道该看哪一行。", effects: { rep: 0.05 } }
        }
      },
      {
        id: "porch", text: "不猜风向：照原日程回选区，一家一家敲门",
        note: "哪边刮风都得先刮过你的选区：不排队，也不下注。",
        base: 0.65, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "潮水里外的人都往州府跑，你在门廊上把投票率又抬了两个点。本地编辑管你叫「常数」。", effects: { rep: 0.25, fac: { base: 3 } } },
          ok: { body: "大选夜你敲的门比谁都多。熟人们记得：你哪边都不站，你站门口。", effects: { rep: 0.15, fac: { base: 2 } } },
          meh: { body: "浪是报纸上的，你是街上的。两边各干各的。", effects: { rep: 0.1 } },
          fail: { body: "人们谈论的全是新总统，没人接你的议题。没关系，门还是敲了。", effects: { rep: 0.05 } },
          critfail: { body: "有户人家隔着门链子说「你都换了旗了」。你说旗没换，换的是天。他没把门关上，也就这样。", effects: { rep: 0.05 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1993-11 · 购枪背景审查法签署 —— 柜台上的那张表（风险面）
   * ==================================================================== */
  {
    id: "ln93_brady", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 1993, maxYear: 1993, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 12, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 11, photo: "era-1993.jpg",
    title: "联邦购枪背景审查与等待期法案签署，枪主团体称之为执法末日",
    body: "联邦购枪背景审查与等待期法案在十一月落笔签署：来年春天临时条款陆续施行，枪店的柜台上多出一张非填不可的表。拥枪阵营把这一天叫作「执法的末日」——今年春天就有上万人携枪涌进首都游说，来年春天的草坪集会许可已经递了上去。\n" +
      "你的办公室里，枪店协会的请愿书和警长们的联署函摞在一起，都等你的第一句话。",
    brief: {
      lede: "一纸签名把等待期写进法律：民选官的第一句表态，两边都会记账。",
      known: [
        "临时条款明年春天生效：买枪先核查、再等待。",
        "拥枪团体已在申请来年的草坪集会许可。",
        "本地枪店协会和警长协会都约了你见面。"
      ],
      rumor: [
        "有人说秋天还要办数万人规模的悼念游行。",
        "有人说等待期根本执行不了，枪店会成批关门。"
      ],
      unknown: [
        "执法的钱和锅，哪个先到你头上。",
        "这个话题明年秋天值多少票。"
      ],
      terms: [{ k: "背景核查", v: "持牌枪店售枪前须核对购买资格。" }]
    },
    choices: [
      {
        id: "campaign", text: "替法案站台：上地方电视台讲等待期挡下的案子",
        note: "赌的是警长和家长的情比枪店的捐款硬。风险：草坪那边记住了你的脸。",
        base: 0.45, cost: { fav: 1 }, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "press", w: 0.25 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你念的那份「等待期拦住的名字」在地方台反复播出，警员家属协会送来锦旗；枪店橱窗里从此贴着一张不欢迎你的告示。两边都记下了你。", effects: { rep: 1.2, fac: { base: 8, church: 5, press: 4 }, voters: { warm: 600 } } },
          ok: { body: "你为等待期说了话，民调一劈两半，警长协会记得你。", effects: { rep: 0.6, fac: { base: 5 }, voters: { warm: 200 } } },
          meh: { body: "你录了公益短片，排在清晨六点档播完，没人回信。", effects: { rep: -0.2 } },
          fail: { body: "商户协会撤了捐款，狩猎俱乐部退了晚宴。你的名字被挪到「反对名单」第一页。", effects: { rep: -1.5, fac: { establishment: -6, commercial: -6, church: -3 } } },
          critfail: { body: "你站台时引用的一份数据被查出造假。「拿真相换口号」的标签贴了两个选举周期，已有记者开始登门核对你的旧账。", effects: { rep: -2.5, fac: { press: -6, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "rally", text: "挺拥枪：赴枪展演说，骂等待期是走形式的羞辱",
        note: "赌的是乡村选民的怒气够纯粹。风险：会被当成城市媒体的活样本。",
        base: 0.47, cost: { fun: 1 }, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "commercial", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "枪展上人挤到你讲不动，握手与支票排到店门外。来年春天那场集会的组织者，把你的名字写进了串词。", effects: { rep: 1.1, fun: 2.5, fac: { commercial: 9, establishment: 4 } } },
          ok: { body: "你替枪主们说了狠话。枪店老板凑钱给你买了广告时段，评论版多骂了你一栏。", effects: { rep: 0.4, fun: 1.5, fac: { commercial: 6 } } },
          meh: { body: "你在狩猎俱乐部讲了话，掌声和骂声都没过线。", effects: { rep: -0.15 } },
          fail: { body: "等待期里出了一起枪击，你的「走形式」四个字被人一句句顶回来。", effects: { rep: -1.6, fac: { base: -10, commercial: -4 } } },
          critfail: { body: "你被拍到在展台举起一把不合法的枪，主播念这条新闻时笑了。金主开始两头下注，小报把你裱上了头版。", effects: { rep: -2.6, fun: -2, fac: { press: -8, church: -5 }, flags: ["scandal_1", "investigation_open"] } }
        }
      },
      {
        id: "brief", text: "不下场：给本地枪店送一份司法部的答疑手册",
        note: "把道德题答成事务题：不站队，只跑流程。",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "两头的律师都来电说「你们办公室讲得最清楚」。没人谢你，也没人骂你——这就是过关。", effects: { rep: 0.2, fac: { agency: 3 } } },
          ok: { body: "手册送到，枪店照章办事。你把一件事办完了。", effects: { rep: 0.2, fac: { agency: 2 } } },
          meh: { body: "手册还压在柜台上，店老板客气地说先放着。", effects: { rep: 0.05 } },
          fail: { body: "一家枪店因填错表格误了生意，怪你的答疑「不讲人话」。", effects: { rep: -0.2 } },
          critfail: { body: "两头一起抱怨：一边怪你软，一边怪你硬。你夹在中间，名字各上了两份名单。", effects: { rep: -0.25 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1994-09 · 联邦犯罪法签署 —— 十万新警与十年禁令（风险面）
   * ==================================================================== */
  {
    id: "ln94_crime", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 1994, maxYear: 1994, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 13, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 9, photo: "era-1994.jpg",
    title: "联邦犯罪法签署：增警十万，攻击性武器禁令限时十年",
    body: "三百页的联邦犯罪法在九月签署：十年增警十万，社区警力拨款下沉到警局，联邦上诉程序拧紧；攻击性武器禁令也第一次写进联邦法律，尾巴上带着十年日落条款。\n" +
      "凶案曲线还在高位，中期选举只剩两个月，「打击犯罪」成了最锋利的话筒：人人都抢着认领这个词，人人都怕被贴上「心软」的标签。",
    brief: {
      lede: "十万警察、一道十年禁令：话筒谁抢谁有，锅也谁接谁背。",
      known: [
        "法案已过两院，签字即生效，拨款逐年到位。",
        "武器禁令十年后自动失效，这是头一遭。",
        "本地警长正在向你要社区警力的名额。"
      ],
      rumor: [
        "有人说凶案数明年就能落一大截。",
        "有人说拨款名额早被自己人预订了。"
      ],
      unknown: [
        "十一月的浪会往哪边卷。",
        "今天的标签四年后贴回谁脸上。"
      ],
      terms: [{ k: "日落条款", v: "到期自动失效的立法设定。" }]
    },
    choices: [
      {
        id: "call", text: "抢「打击犯罪」的话筒：办警民大会，要下增警名额",
        note: "赌的是选民信夜里的警笛声。风险：犯罪率一掉头，你就是「煽恐慌的人」。",
        base: 0.5, cost: { fav: 1 }, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "fac", key: "agency", w: 0.3 }],
        outcomes: {
          crit: { body: "警民大会挤到站满，本地增警预算抢在州府前批下，警员工会的支持信发进了每一间选区办公室。「他替警察办成了事」——这张牌子归你。", effects: { rep: 1.3, fac: { agency: 9, base: 5 }, voters: { warm: 600 } } },
          ok: { body: "增警名额落了地，警局的排班表上多了一栏谢谢。", effects: { rep: 0.6, fac: { agency: 5 }, voters: { warm: 200 } } },
          meh: { body: "你递了预算，纸还在州府的签字桌上排着。", effects: { rep: -0.15 } },
          fail: { body: "一场警察过度执法的官司恰好在你的大会后开庭，镜头从你的讲台直接切到被告席。", effects: { rep: -1.4, fac: { base: -8, press: -4 } } },
          critfail: { body: "你被钉上「恐慌贩子」的招牌，民权团体把你大会的讲稿递进了选举委员会的听证材料。", effects: { rep: -2.4, fac: { press: -6, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "quote", text: "逆着风说话：自费出册，讲「预防比监禁便宜」",
        note: "赌的是三年后潮水会转向。风险：十一月你就是「对犯罪心软」的广告主角。",
        base: 0.42, cost: { fun: 1 }, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "church", w: 0.25 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "三年后青少年犯罪回落，你那本小册子被人从抽屉里翻出来当预言。「那个先讲预防的人」，学院与教坛一起挂上了你的名。", effects: { rep: 0.9, attr: { INT: 3 }, fac: { church: 12, base: 8, press: 4 } } },
          ok: { body: "白皮书被两篇专栏引用，党部主席来电问候了一句——顺便确认你还在不在本党。", effects: { rep: 0.3, attr: { INT: 1 }, fac: { church: 8 } } },
          meh: { body: "册子印了寄了，邮局退回来两份。", effects: { rep: -0.3 } },
          fail: { body: "辩论季有人把话筒怼到你面前：「罪犯值得同情吗？」你的眼神被剪成广告，循环播放。", effects: { rep: -1.8, fac: { establishment: -8, agency: -6 } } },
          critfail: { body: "「同情罪犯」六个字成了你名下资产。那一年，连本党的候选人都避着与你同框。", effects: { rep: -2.8, fac: { press: -6, base: -6, agency: -4 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "hold", text: "不抢话筒：把本地警局的加班费与出警表格理顺",
        note: "话筒爱谁拿谁拿：警长排不开班的时候，还是先想到你。",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "加班费到账、轮班转得开、出警记录不再压在柜上。警长把值班室那面墙的照片换成了你的，第二天又笑着换回来。", effects: { rep: 0.2, fac: { agency: 3 } } },
          ok: { body: "你替一部大法律办好了小事。没人报道，也没人骂街。", effects: { rep: 0.2, fac: { agency: 2 } } },
          meh: { body: "你在核表格，话筒在别人手里。各忙各的。", effects: { rep: 0.05 } },
          fail: { body: "加班费年底还没批透，工会抱怨了一句「他连这点事都没办利索」。", effects: { rep: -0.2 } },
          critfail: { body: "核销单被人翻出一处错账，落了个「拨款优先序不清」。小伤，但难看。", effects: { rep: -0.25 } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 定点锚 · 1991—1994 补薄（4 个：major 2 / mid 2）
 *   与 120 带存量锚点错开月份；同一事件一局只演一次。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln91_hearings", year: 1991, month: 10, grade: "mid" },     // 大法官确认听证（1991-10 全院表决）
  { event: "ln92_election", year: 1992, month: 11, grade: "major" },   // 大选夜（1992-11）
  { event: "ln93_brady", year: 1993, month: 11, grade: "mid" },        // 背景审查法签署（1993-11）
  { event: "ln94_crime", year: 1994, month: 9, grade: "major" }        // 联邦犯罪法签署（1994-09）
]);
