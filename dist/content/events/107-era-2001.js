/* ============================================================================
 * CONTENT · events/107-era-2001.js
 * 时代：2001 反恐战争 —— 9·11、爱国者法案、大规模杀伤性武器、色彩警报。
 * 铁律见 docs/CONTENT-SCHEMA.md §11。社交媒体 2008 才有，本包不写 social。
 * ==========================================================================*/

POTUS.define("event", [

  /* ------------------------------------------------------------------------
   * 1) 九月十一日 —— 国运转折（大事件，史实锚点 9/11）
   * ---------------------------------------------------------------------- */
  {
    id: "wt01_september", photo: "era-2001.jpg", grade: "major", category: "crisis",
    valence: "bane", dyn: true,
    era: ["2001_WARONTERROR"], tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["print", "radio", "tv", "cable", "internet"], month: 9, day: 11,
    title: "两架飞机，撞进了所有人的电视",
    body: "上午的烟还没散，第二座塔也倒了。几个小时里，「本土不会被打」这个假设彻底作废。\n" +
      "国旗一夜之间挂满每辆皮卡。国会两党争先表态要「做点什么」，而「点什么」正被恐惧推着走。\n" +
      "你所在的选区有亲属在军方、在纽约、也在刚被怀疑的那几个族裔社区。",
    brief: {
      lede: "一场国难把每个选择都变成了站队：安全、自由、和「谁是我们、谁是他们」。",
      known: [
        "你被推上前台：既安抚参军家庭，又面对被盘问的邻居。",
        "动武与加监控的民意高到离谱，此刻说慢一点等于自毁。",
        "一场没尽头的「反恐战争」和一部新法案，正在以极快的速度成型。"
      ],
      rumor: [
        "有人说情报系统早有线索，只是没人把它们连起来。",
        "有人说政府借恐攻塞进无关反恐的扩权条款。"
      ],
      unknown: [
        "战争会打几年，会不会把你也送上战场。",
        "今天换掌声的监控权，十年后指向谁。"
      ],
      terms: [
        { k: "爱国者法案", v: "9·11后通过的扩权法，放宽监听搜查。" }
      ]
    },
    choices: [
      {
        id: "rally", text: "全盘挺同：动武、扩权、一个都不落",
        note: "骑在最顶峰的民意上最风光，可你也就此和这场没尽头的战争绑在了一起。",
        base: 0.62, mods: [{ src: "fac", key: "military", w: 0.4 }, { src: "fac", key: "establishment", w: 0.35 }],
        stake: { fun: true, ap: true },
        outcomes: {
          crit: { body: "你在悲愤的浪潮里冲在最前，动武、拨款、扩权一票不落。全国都记着这个「关键时刻站得最直」的人。",
            effects: { rep: 1.5, tier: 1, fac: { military: 12, establishment: 10, base: 6 } } },
          ok: { body: "你顺着举国同仇的气走，安全又讨彩。只是那份「反恐」的大旗，从此压得你不敢有二话。",
            effects: { rep: 0.8, fac: { military: 8, establishment: 6 } } },
          meh: { body: "你挺了，可比你挺得更狠的人太多，你只是万千掌声里的一个。",
            effects: { rep: 0.3, fac: { military: 4 } } },
          fail: { body: "你抢着表态，可下一场战争的代价开始显现，你当初那句「坚定支持」被重新翻出来晒。",
            effects: { rep: -0.3, fac: { base: -5 } } },
          critfail: { body: "你推动扩权最力，多年后这些权力被用来对付政敌的消息爆出，你成了「帮凶」名单上的熟名字。",
            effects: { rep: -1, fac: { press: -10, base: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "balance", text: "支持反击，但拦住法案里那些和反恐无关的扩权条款",
        note: "在最不适宜讲「但是」的时刻讲「但是」。会被骂「不清醒」，却可能守住一条底线。",
        base: 0.48, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你顶着「不爱国」的帽子，硬是把几条最过火的监听条款挡了下来。当时举国骂你，多年后有份文件把你列为「早看出问题的人」。",
            effects: { rep: 1, attr: { INTG: 3 }, fac: { press: 8, base: 6, agency: -10, establishment: -6 }, flags: ["civil_liberties"] } },
          ok: { body: "你削掉了法案里一点最肥的权，代价是被人嘀咕「他对反恐不够上心」。",
            effects: { rep: 0.4, attr: { INTG: 1 }, fac: { base: 4, agency: -5 } } },
          meh: { body: "你喊了话，可没人愿意在悲愤里听细则。条款照样过了，你白担了风险。",
            effects: { rep: 0.1, fac: { establishment: -3 } } },
          fail: { body: "在人人喊「要权利还是要安全」的时刻你选了权利，被剪成了「他更在乎恐怖分子」。",
            effects: { rep: -0.7, fac: { military: -8, base: -6 }, flags: ["scandal_1"] } },
          critfail: { body: "你反对扩权的发言被做成「他替敌人说话」的广告，恐惧是这世上最好用的电锯。",
            effects: { rep: -1, fac: { military: -10, establishment: -8, base: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "home", text: "不谈海外，先顾本地：护住被盘问的族裔社区、安抚军属",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "当所有人盯着远方，你在本地替被无端盘问的邻居撑了腰、给军属办了实事。这份「身边人」的口碑比任何全国头条都持久。",
            effects: { rep: 0.9, voters: { warm: 500 }, fac: { base: 12, church: 6, military: 4 }, flags: ["home_front"] } },
          ok: { body: "你守着本地该守的人，既没喊打喊杀，也没袖手。邻里记你的好。",
            effects: { rep: 0.4, voters: { warm: 200 }, fac: { base: 6 } } },
          meh: { body: "你做的都是不显山露水的事。乱世里，这种稳当最容易被忽略。",
            effects: { rep: 0.2 } },
          fail: { body: "你顾本地被读成了「不关心国家大事」。在这种时刻，安静也是一种罪。",
            effects: { rep: -0.4, fac: { establishment: -5, base: -3 } } },
          critfail: { body: "你替被怀疑族裔说话，正撞上一桩本地治安案，两件事被拼成了「他就是那一伙的」。",
            effects: { rep: -0.9, fac: { base: -6, military: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 2) 爱国者法案的地方执行 —— 监视还是被监视（政治/丑闻）
   * ---------------------------------------------------------------------- */
  {
    id: "wt02_patriot", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    era: ["2001_WARONTERROR"], tierMin: 2, tierMax: 5, weight: 11,
    medium: ["print", "tv", "internet"],
    title: "联邦来人在你辖区调阅记录",
    body: "新法案给了执法部门一纸命令就能调走图书馆借阅、银行流水、就医记录的权力。这次，他们要用在你的地盘。\n" +
      "上面递来一句话：「别问,配合就行。」可你的选民里,有人正担心自己会不会就是那个被调阅的对象。",
    brief: {
      lede: "一部好听的法案落到地方，就变成一次具体的、有人情有人脉、也有风险的执行。",
      known: [
        "轮到你，是因为辖区的合规与预算走你这条线，你得点头。",
        "配合能换来联邦的信任和一笔反恐拨款；抵触会被记成「不合作」。",
        "调阅是无差别的——今天被查的人里，可能有你最铁的捐助者。"
      ],
      rumor: [
        "有人说调阅记录会流向数据公司当打击弹药。",
        "也有人说真被盯上的没几个，多数只是走个过场。"
      ],
      unknown: [
        "你今天开的门，将来会不会被拿来查你。",
        "那笔反恐拨款会不会变成绑住你的绳子。"
      ],
      terms: [
        { k: "调阅令", v: "新法授权索取个人记录，绕过司法审查。" }
      ]
    },
    choices: [
      {
        id: "cooperate", text: "全力配合，把反恐拨款和联邦好感一起收下",
        note: "短期实惠最大。但你在替一套可能反噬自己的机器铺路。",
        base: 0.62, mods: [{ src: "fac", key: "agency", w: 0.4 }, { src: "fac", key: "establishment", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你办得又快又「懂事」，联邦把你列为可靠的合作伙伴，一笔反恐专项资金长期挂在你名下。只是每次签字，你都想多想一秒,又忍住了。",
            effects: { rep: 0.8, fun: 4, lev: 1, fac: { agency: 12, establishment: 8 } } },
          ok: { body: "你配合到位，联邦满意，钱也到了。本地有人嘀咕，但没成气候。",
            effects: { fun: 2.25, fac: { agency: 8, establishment: 4 } } },
          meh: { body: "你配合了，可联邦转头就把你当成了「理所当然」，好处没见着几样。",
            effects: { rep: 0.2, fac: { agency: 3 } } },
          fail: { body: "你替他们开的门，最后查到了你自己的捐款人身上，对方觉得你在「卖友求荣」。",
            effects: { rep: -1, fac: { base: -6, commercial: -6 }, flags: ["scandal_1"] } },
          critfail: { body: "多年后这批调阅权被用于政治打压被曝光，而「最早在地方上积极配合的人」的名单里，头一个就是你。",
            effects: { rep: -2, fac: { press: -10, base: -8 }, flags: ["scandal_3"] } }
        }
      },
      {
        id: "guard", text: "配合，但坚持每份调阅都留档、都要走合法程序",
        note: "既不得罪联邦，又给选民一个「他在把关」的交代。两头都落一点。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你设的留档程序挡住了几次明显过界的调阅，本地人第一次觉得「原来这条线上有人在看着」。联邦嫌你麻烦，却挑不出你的错。",
            effects: { rep: 1.5, fac: { base: 8, agency: 3, establishment: -3 }, flags: ["proceduralist"] } },
          ok: { body: "你按章办事，既拿了该拿的合作分，也没越自己的线。",
            effects: { rep: 0.6, fac: { base: 4, agency: 4 } } },
          meh: { body: "你走程序走得慢，联邦不耐烦，本地也没觉出你护了他们。",
            effects: { rep: 0.2, hp: -0.5 } },
          fail: { body: "你的「留档」被联邦当成「不信任」，合作的大门开始对你虚掩。",
            effects: { rep: -0.6, fac: { agency: -8, establishment: -4 } } },
          critfail: { body: "你留的档被人反用成「他自己也承认这套权力危险，却还配合到底」的证据。里外不是人。",
            effects: { rep: -1.5, fac: { agency: -8, base: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "resist", text: "阳奉阴违：面上配合，暗中给选民递一句「你会被查什么」",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "你悄悄提醒了几家最可能被盯上的机构，让他们提前把「不该有的东西」理干净。没人知道是你，可这批人承了你的情。",
            effects: { rep: 1, attr: { CUN: 2 }, fac: { base: 6, agency: -4 }, flags: ["quiet_shield"] } },
          ok: { body: "你两头下注：面子上交差了，里子给自家人递了信。",
            effects: { rep: 0.4, attr: { CUN: 1 }, fac: { base: 3 } } },
          meh: { body: "你想两头讨好，结果两头都没落着实实在在的好处。",
            effects: { rep: 0.2 } },
          fail: { body: "你的「递信」被联邦察觉，你从「可靠伙伴」变成了「需要提防的人」。",
            effects: { rep: -1, fac: { agency: -10, establishment: -6 }, flags: ["leaker_suspect"] } },
          critfail: { body: "你暗中阻挠的把柄被坐实，「反恐不力」的帽子在战后年代格外沉重。",
            effects: { rep: -1.75, fac: { agency: -12, military: -6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 3) 大规模杀伤性武器 —— 通向伊拉克的路（外交/危机，锚点 3 月）
   * ---------------------------------------------------------------------- */
  {
    id: "wt03_wmd", photo: "era-2003.jpg", grade: "mid", category: "foreign",
    valence: "bane", dyn: true,
    era: ["2001_WARONTERROR"], tierMin: 2, tierMax: 5, weight: 11,
    medium: ["print", "radio", "tv", "cable", "internet"], month: 3,
    title: "他们要你为一场还没发生的战争背书",
    body: "情报摘要摊在桌上：一个「可能被藏起来」的武器、一个「可能和恐怖分子挂钩」的政权。\n" +
      "每个「可能」下面都写着「尚无确证」。可决策层已经在倒计时，需要的只是本地也递一份「支持」。\n" +
      "签下去，你就成了一场后来被推翻的战争最初的助推者之一。",
    brief: {
      lede: "一场将被历史重新审视的战争，此刻正需要你这些「够不着决策、却能盖章」的人点头。",
      known: [
        "要你的背书，是你这条线能给出「地方一致支持」的漂亮材料。",
        "支持率仍在高位，反对这场战争的政治成本眼下极高。",
        "情报的关键结论，连情报官员自己都在私下摇头。"
      ],
      rumor: [
        "有人说真正想打这场仗的人，早在上一场战争就没打完。",
        "也有人说中东的情报本就真假掺半，谁都没法拍胸脯。"
      ],
      unknown: [
        "多年后你信了什么，会被写进哪份报告。",
        "这场仗会不会真如保证那样几天结束。"
      ],
      terms: [
        { k: "大规模杀伤性武器", v: "发动伊拉克战争的理由，战后证实为误导。" }
      ]
    },
    choices: [
      {
        id: "endorse", text: "背书：递上「本地支持」，站进主流那一队",
        note: "顺着当时最响的声音走。若理由日后崩塌，你这份早期背书会成为洗不掉的旧账。",
        base: 0.6, mods: [{ src: "fac", key: "establishment", w: 0.4 }, { src: "fac", key: "military", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你递上的背书被印进了全国宣传材料，决策层的晚宴给你留了位子。可每次念出「武器」两个字，你都要在心里把它念得更轻一点。",
            effects: { rep: 1.25, tier: 1, fac: { establishment: 12, military: 8 }, flags: ["wmd_endorser"] } },
          ok: { body: "你随大流站了队，短期内风光。多年以后，「你当初为什么信」会变成一道没有好答案的题。",
            effects: { rep: 0.6, fac: { establishment: 8 } } },
          meh: { body: "你背了书，可这场战争很快被更响的名字抢走，你没捞着多少，倒留了笔潜在账。",
            effects: { rep: 0.2 } },
          fail: { body: "战事陷入泥潭，你的「支持开战」成了对手的靶心。",
            effects: { rep: -1.25, fac: { base: -8, press: -5 }, flags: ["wmd_endorser", "scandal_1"] } },
          critfail: { body: "「武器根本不存在」被证实的那天，最早一批背书者的名单被媒体逐一翻出，你的名字高居其上。",
            effects: { rep: -2.5, fac: { press: -12, base: -10, establishment: -6 }, flags: ["wmd_endorser", "scandal_3"] } }
        }
      },
      {
        id: "question", text: "追问：要确证，先别急着盖章",
        note: "趁民意还在高位时留一分清醒。代价是被上层贴上「拖后腿」。",
        base: 0.48, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你一句「请把『可能』换成『确证』」当时被讥为天真，战事吃紧后却被反复引用成「先醒的人」。",
            effects: { rep: 1.75, fac: { press: 8, base: 6, establishment: -8 }, flags: ["saw_it_early"] } },
          ok: { body: "你坚持要证据，没硬顶也没盖章，留了个体面的距离。上层记你的「刺头」，历史记你的「清醒」。",
            effects: { rep: 0.8, fac: { base: 4, establishment: -5 } } },
          meh: { body: "你提了要求，可机器照转不误。你成了背景里一个不太合群的声音。",
            effects: { rep: 0.2, fac: { establishment: -3 } } },
          fail: { body: "在举国喊打的时刻你要证据，被说成「帮着敌人拖延」。",
            effects: { rep: -1.25, fac: { establishment: -8, military: -6 }, flags: ["scandal_1"] } },
          critfail: { body: "你的公开质疑被上层定性为「唱反调、通敌」，一场针对「不够爱国者」的地方清算顺带烧到了你。",
            effects: { rep: -2, fac: { establishment: -12, military: -8, base: -5 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "avoid", text: "躲开这一票：出差、请假、什么都能推",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "你恰好在这份表决前「因故缺席」。战争泥潭化时，你是少数既没背书也没反对的透明人——最难看的两头，都没沾上。",
            effects: { rep: 0.6, hp: -0.5, fac: { establishment: -2 } } },
          ok: { body: "你滑开了。上层记下了你「没出力」，历史却放过了你。",
            effects: { rep: 0.2, fac: { establishment: -3 } } },
          meh: { body: "你躲过了这一票，可谁都看得出来你没胆站任何一边。",
            effects: { rep: -0.2 } },
          fail: { body: "你的缺席被两边都记成了「临阵躲人」。上层嫌你不顶用，选民觉得你心虚。",
            effects: { rep: -0.8, fac: { establishment: -6, base: -3 } } },
          critfail: { body: "你想两头不沾，却被曝出你其实两边都在私下递话。「不站队」变成了「两头下注」。",
            effects: { rep: -1.5, fac: { establishment: -6, base: -6 }, flags: ["leaker_suspect"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 4) 色彩警报与机场 —— 小事（综合/舆论）
   * ---------------------------------------------------------------------- */
  {
    id: "wt02_alert", grade: "minor", category: "general",
    valence: "bane", dyn: true,
    era: ["2001_WARONTERROR"], tierMin: 0, tierMax: 3, weight: 10,
    medium: ["print", "tv"],
    title: "本土威胁等级又调成了「橙」",
    body: "一套五色的「威胁警报」挂上了全国新闻，隔三差五就在「高」与「警戒」之间跳。\n" +
      "本地机场加派了警察，告示牌上写着「如发现可疑请报告」。可真正可疑的,是这套永远不降回「蓝」的警报。",
    brief: {
      lede: "当恐惧变成一种常态管理，政客要么靠它吃红利，要么被它拖进无休止的紧张。",
      known: [
        "机场安保预算归你批，警报每升一级，你的账就紧一分。",
        "「橙色」是更高警戒，也是媒体几周重播的同一堆烟雾。",
        "本地靠旅游业吃饭的人开始抱怨：天天橙色，客人不敢来。"
      ],
      rumor: [
        "有人说警报毫无信息量，只为显出政府在做事。",
        "也有人说真情报被稀释了，百姓早对橙色麻木。"
      ],
      unknown: [
        "喊危机换来的配合，何时反噬成狼来了。",
        "你为橙色争的安保拨款，几年后还作数。"
      ],
      terms: [
        { k: "色彩警报", v: "9·11后的五级威胁色阶，含义模糊。" }
      ]
    },
    choices: [
      {
        id: "alert", text: "加码：主动为本地多要一笔「橙色」专项安保",
        note: "顺着恐惧要资源。短期安全感和拨款都到手，可你也在替这套麻木机制续命。",
        base: 0.6, mods: [{ src: "fac", key: "agency", w: 0.35 }, { src: "attr", key: "CUN", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你多要来的安保预算把机场守得铁桶一般，本地媒体夸你「把安全放在心上」。只是你清楚，这笔钱大部分花在了看得见的排场上。",
            effects: { rep: 1.5, fun: 4.5, fac: { agency: 6, establishment: 4 } } },
          ok: { body: "你替本地争到了额外的安保，选民觉得安心，联邦觉得你懂事。",
            effects: { rep: 0.8, fac: { agency: 4, establishment: 3 } } },
          meh: { body: "你多要了钱，可安保效果说不清，游客却因这阵仗少了两个。",
            effects: { rep: 0.4 } },
          fail: { body: "你为「橙色」造势，偏偏本地什么威胁都没有，只有商店在抱怨，你被批「花钱买恐慌」。",
            effects: { rep: -1.5, fac: { base: -5, commercial: -4 } } },
          critfail: { body: "你的「橙色」专项钱被曝去向成谜，一场针对浪费公帑的调查找上了你。",
            effects: { rep: -2.75, fac: { press: -6, establishment: -4 }, flags: ["scandal_1", "investigation_open"] } }
        }
      },
      {
        id: "calm", text: "降温：公开提醒大家别对颜色麻木，把钱花在真有用的地方",
        note: "顶着一部分「危言」的反方向说话，赌的是长期的判断力口碑。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "attr", key: "INTG", w: 0.25 }],
        outcomes: {
          crit: { body: "你说了一句「天天橙色等于没有橙色」，戳中了很多人心里那点麻木。联邦不悦，但明白人给你记了一笔「脑子清楚」。",
            effects: { rep: 2, fac: { base: 5, press: 4, agency: -5 } } },
          ok: { body: "你呼吁冷静用度，本地商人谢你，只是这话不讨安保部门的喜欢。",
            effects: { rep: 0.8, fac: { commercial: 4, agency: -3 } } },
          meh: { body: "你想降温，可在恐惧当道的年头，你的实话有点孤掌难鸣。",
            effects: { rep: 0.4, fac: { agency: -2 } } },
          fail: { body: "你劝大家别紧张，恰好本地闹出一桩虚惊，「就是他让大家松懈的」成了现成的锅。",
            effects: { rep: -2, fac: { agency: -6, base: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "你淡化威胁的发言被做成「他连安全都不当回事」的短促广告,恐惧是最好的电锯。",
            effects: { rep: -3, fac: { press: -6, base: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "neutral", text: "不增不减，一切照上面说的办",
        base: 0.7, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你不声不响照章办事。既没因紧张出丑，也没因淡化背锅。在恐惧的年代，「什么都没做」常常就是最聪明。",
            effects: { rep: 0.8 } },
          ok: { body: "你保持中立地执行了上面的分级。没人夸你，也没人怪你。",
            effects: { rep: 0.4 } },
          meh: { body: "你按本本办事，本地既不安心也不抱怨，你就是隐形的。",
            effects: {} },
          fail: { body: "你不表态，两边都觉得你「不冷不热不像话」。安全议题上，不表态也是一种表态。",
            effects: { rep: -1.25, fac: { establishment: -3 } } },
          critfail: { body: "你的「照本宣科」在一次虚惊后被追问：作为主管，你当时做了什么？你答不上来。",
            effects: { rep: -2, fac: { base: -4, establishment: -4 } } }
        }
      }
    ]
  }
]);
