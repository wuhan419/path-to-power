/* ============================================================================
 * CONTENT · events/124-line-2007-10.js
 * 连续时间轴 · 2007—2010 定点大事件（B5 年带）。
 *
 * 写法与 110-line-1980s.js 一致（见 docs/PARALLEL-CONTENT-WORK.md §4）：
 *   · 不写 era —— 一律绝对年窗 minYear/maxYear + scoped，tierRaw 直接按真实层级解释。
 *   · 到点必发 —— 每张卡都在本文件末尾的 POTUS.define("fixed", …) 里钉死年月与量级。
 *   · 存量卡（2008_crash_offer / 2008_debate / 2008_tea_party / wave_tea_rally）
 *     按本带归属**只做 pin**，不重写、不写同主题新卡。
 *   · 低层级落点 —— 多数卡 tierMin:0，危机与枪击正面撞上社区小人物。
 *   · 铁律 —— 字符串只用「」；每卡一个保底（无 cost 无 req，高地板低天花板）；
 *     risk 卡保底五档净值压在 ±0.35 份内（否则引擎会补一条 lay_low）；
 *     经济只写系数；brief 交代认知边界。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2007-04 · 校园枪击 —— 三十二条名字与一台开着的摄像机（威胁）
   * ==================================================================== */
  {
    id: "ln07_vt", photo: "era-2007.jpg", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2007, maxYear: 2007, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 12, unique: true,
    medium: ["tv", "cable", "internet"], month: 4, day: 16,
    title: "校园枪声过后，三十二个名字要有人念",
    body: "早上八点，宿舍楼与工程楼先后响枪。到中午，三十二个名字被贴上网，最小的十九岁。\n" +
      "下午两点，大学的追悼会排定了座位，本地台把话筒对准每一位到场的民选官员。你县里那家心理健康中心，去年刚被州预算砍掉一半人手。",
    brief: {
      lede: "一屋子死者与一台开着的摄像机：说深了像消费，说浅了像冷漠。",
      known: [
        "追悼会致辞排到了地方官员，大学不想谈立法。",
        "本县的心理健康中心去年被砍掉一半人手。",
        "你在削减预算那一票上投了赞成，记录在案。",
        "州长办公室已放话：今年不重开精神卫生法。"
      ],
      rumor: [
        "有人说枪手当年的门诊材料还在县教育局。",
        "有人说党部要你只哭不讲话，别碰枪和钱。"
      ],
      unknown: [
        "这类案子最后会逼出什么法。",
        "你今天这句话会进哪份材料。"
      ],
      terms: [{ k: "强制治疗", v: "法院下令把重性精神病人送医。" }]
    },
    choices: [
      {
        id: "memorial", text: "去念名字，只谈哀悼，不提法案与预算",
        note: "赌的是哀悼本身够用。风险：什么也没推动，账还在。",
        base: 0.62, mods: [{ src: "attr", key: "CHA", w: 0.4 }],
        outcomes: {
          crit: { body: "你一个一个把名字念完，没有一句拔高。第二天本地晚报的标题是那些名字，不是你的。", effects: { rep: 0.4, fac: { base: 4, church: 3 } } },
          ok: { body: "你说了得体的话，没人挑得出毛病，也没人觉得事情结束了。", effects: { rep: 0.2, fac: { base: 2 } } },
          meh: { body: "你念了几个名字，话筒太响，你自己也没听清自己说了什么。", effects: { rep: 0.1 } },
          fail: { body: "你的悼词听起来像念材料，散场时有人在门口没跟你握手。", effects: { rep: -0.4 } },
          critfail: { body: "你说错了一处细节，本地博客把你那段剪出来反复放：他连数字都没看。", effects: { rep: -0.6, fac: { press: -4 } } }
        }
      },
      {
        id: "law", text: "趁势提案：把被砍的心理服务预算加回来",
        note: "赌的是舆论还热。风险：人情烧光，法案躺在委员会。",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "establishment", w: 0.2 }],
        cost: { fun: 0.4 },
        outcomes: {
          crit: { body: "你把听证开成了全国第一场，州里两个月后重开了那笔预算。你的名字写在法案的注脚上。", effects: { rep: 1.6, fac: { establishment: 6, labor: 4 }, attr: { INT: 2 }, flags: ["health_push"] } },
          ok: { body: "案子立住了，钱只回来一小半，但至少有人开始谈这件事。", effects: { rep: 0.8, fac: { establishment: 5 } } },
          meh: { body: "你的提案进了委员会，然后就在那里安静地过冬。", effects: { rep: 0.1 } },
          fail: { body: "党部说时机不对，媒体说你趁热打铁。预算一个字没动。", effects: { rep: -1.2, fac: { establishment: -5, base: -4 } } },
          critfail: { body: "有记者翻出你去年那票，标题写成「他先砍的，再来救」。听证会变成你的审判。", effects: { rep: -2, fac: { press: -6, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "blame", text: "开记者会：钱被砍走那天，枪就已经上了膛",
        note: "赌的是民愤可借。风险：建制的钱与引荐从此绕开你。",
        base: 0.38, mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "CUN", w: 0.35 }],
        req: { fac: "base", min: 20 },
        outcomes: {
          crit: { body: "你那句话当晚就上了一遍又一遍的 cable 台。街区的电话打爆党部，全是要替你说话的人。", effects: { rep: 1.3, fac: { base: 12, press: 6, establishment: -8 }, voters: { warm: 400 }, flags: ["health_push"] } },
          ok: { body: "你把话挑明了。基层记住了你的名字，上面把你记进了另一本账。", effects: { rep: 0.6, fac: { base: 8, press: 3, establishment: -4 }, voters: { warm: 300 } } },
          meh: { body: "你说完了，没人接。当天还有别的新闻。", effects: { rep: -0.2, fac: { base: -2 } } },
          fail: { body: "州里把责任推回县里，县里说你多嘴。两边的报纸都不好看。", effects: { rep: -1.4, fac: { establishment: -10, base: -4 } } },
          critfail: { body: "你那句「早就有人知道」被追到第二句：是谁。你答不上来，只剩下你在镜头前那张脸。", effects: { rep: -2.2, fac: { establishment: -12, press: -6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2007-08 · 次贷裂缝 —— 两只基金倒下，县里的钱还在里面（风险·已做层级分层）
   *   选项级 when 用 tierRaw 写在 0—9 真实层级：底 T0—3 自救、中 T4—6 表态、
   *   高 T7—9 定调，每档两条；卡级放开 tierMax，高段玩家也发得出这张卡。
   * ==================================================================== */
  {
    id: "ln07_subprime", photo: "era-2007.jpg", grade: "mid", category: "finance",
    valence: "risk", dyn: true,
    minYear: 2007, maxYear: 2007, scoped: true, tierRaw: true, tierMin: 0, weight: 12, unique: true,
    medium: ["print", "cable", "internet"], month: 8,
    title: "两只基金倒了，县里的退休金还在那家银行",
    body: "八月的一个礼拜里，两只靠房贷证券吃饭的基金被冻结赎回，「次级贷款」第一次上了电视。\n" +
      "你收到的消息更近：县教师退休金存放的那家银行，正是发这批贷款的那一家。财政主管带着报表来敲门——抽，还是留。分行行长说：先跑的人，就是踩死它的人。",
    brief: {
      lede: "没人知道这是裂缝还是塌方。你能定的只有这笔公家的钱几时动。",
      known: [
        "县退休金的存放银行正在发那些违约的房贷。",
        "抽钱要董事会表决，公开理由只能写审慎。",
        "留下：分行承诺不抽本地贷；抽走：建商先失血。",
        "你去年收过这家银行分行的政治捐款。"
      ],
      rumor: [
        "有人说州里已经在安排接盘，只是不外传。",
        "有人说钱早被总部抽走了，账上是空的。"
      ],
      unknown: [
        "会不会一路崩到存款保险。",
        "先跑的人是聪明还是背叛。"
      ],
      terms: [{ k: "次级贷款", v: "放给信用不足者的房贷，违约极高。" }]
    },
    choices: [
      {
        id: "pull", text: "召集董事会表决，把退休金先挪走",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        note: "赌的是银行真撑不住。风险：本地建商当场骂你。",
        base: 0.44, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "establishment", w: 0.2 }],
        cost: { fun: 0.5 },
        outcomes: {
          crit: { body: "一个月后那家银行的总部被接管，全县只有你的钱提前搬了家。教师工会第一次主动来问你别的议题。", effects: { rep: 1.5, fac: { establishment: 6, labor: 4 }, attr: { INT: 1 }, flags: ["saw_it"] } },
          ok: { body: "钱保住了，本地骂你胆小，账本上你是对的那一个。", effects: { rep: 0.8, fac: { establishment: 4 } } },
          meh: { body: "你忙了一整夏，钱只是换了个账户，什么也没发生。", effects: { rep: 0.1 } },
          fail: { body: "银行没事，两条本地建商却因为抽贷停了两百套房子。他们把账算在你头上。", effects: { rep: -1, fac: { commercial: -6 } } },
          critfail: { body: "挪钱的过程被翻出来：你先通知了自家熟人。报纸用了「内行」两个字。", effects: { rep: -1.8, fac: { commercial: -8, establishment: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "stay", text: "按兵不动：钱留在原处，只说一切合规",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        note: "赌的是银行还撑得住。风险：崩了你是没预警那一个。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你要求补充披露的那份材料后来成了州里查案的第一份证据。当时没人谢你，也没人怪你。", effects: { rep: 0.2, fac: { commercial: 3 } } },
          ok: { body: "你什么都没错。账上还是那些钱，本地还是那些生意。", effects: { rep: 0.2 } },
          meh: { body: "这个夏天你什么也没做，什么也没做不成。", effects: {} },
          fail: { body: "开学时家长会上有人问：你们当时是不是早就知道。没人替你答。", effects: { rep: -0.2 } },
          critfail: { body: "钱到底还是冻了三个月。董事会上有人念出你投的那张「不动」的票。", effects: { rep: -0.3 } }
        }
      },
      {
        id: "rescue", text: "私下撮合：让银行续贷本地建商，你也入一股",
        when: { tierRaw: true, tierMin: 7 },
        note: "赌的是这次能软着陆。风险：钱和名声一起垫进去。",
        base: 0.4, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "commercial", w: 0.3 }],
        cost: { fun: 1 }, req: { fun: 2 },
        outcomes: {
          crit: { body: "贷款续上了，本地两百套房子封顶。项目结算那天，你的名字出现在两家公司的股东名单上——都在本地。", effects: { fun: 2, rep: 0.8, fac: { commercial: 10 }, flags: ["deal_maker"] } },
          ok: { body: "工程保住了，你回了一小笔，也欠下一大笔人情。", effects: { fun: 1, rep: 0.2, fac: { commercial: 6 } } },
          meh: { body: "你垫了钱，贷款还是抽了一半。没人记得你跑过这一趟。", effects: { rep: -0.2 } },
          fail: { body: "建商还是倒了。你的钱进去没出来，被裁的人却在名单上认得你。", effects: { rep: -1.2, fac: { base: -6, labor: -4 } } },
          critfail: { body: "破产清算人翻出这笔撮合：公家的钱还没保住，你自己的先坐在里面。州检察长的办公室来电话了。", effects: { rep: -2, fac: { base: -8, press: -6 }, flags: ["scandal_1", "investigation_open"] } }
        }
      },
      {
        id: "calm_queue", text: "站在银行门口劝邻里：别挤提，先回家等消息",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        base: 0.6, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "base", w: 0.25 }],
        outcomes: {
          crit: { body: "你劝住了当天排队最前的十几户。第二天挤提的新闻里少了这家分行，镇民的存款多稳了一个礼拜。", effects: { rep: 0.8, fac: { base: 6 } } },
          ok: { body: "你站了一下午，劝回几户是几户。没人道谢，门口的秩序确实松了一点。", effects: { rep: 0.35, fac: { base: 3 } } },
          meh: { body: "你说你的，排队的排队，谁也不认得谁。", effects: { rep: 0 } },
          fail: { body: "你劝人别挤提的第二天，分行贴出暂停营业的告示。你的话被人拿来反着讲。", effects: { rep: -0.6, fac: { base: -4 } } },
          critfail: { body: "有人咬定你「早知道要关门还劝人别取钱」。你不过说了句实话，却挑了最坏的日子说。", effects: { rep: -1.3, fac: { base: -5, commercial: -3 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "disclose", text: "开一场对分行的公开问询会：把本地贷款敞口和资本状况摊到桌上",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        note: "公开要账最招恨，也最攒「较真」的名声。全场手机都举着，话说错一个字都跑不掉。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "commercial", w: 0.2 }],
        outcomes: {
          crit: { body: "行长顶不住满堂的手机，摊开了那几页数字。你把最险的一块报给州里——后来的接管文书里，你这场问询会是附件之一。", effects: { rep: 1.4, fac: { base: 6, press: 4, commercial: -4, establishment: 3 } } },
          ok: { body: "问询会开了两小时，行长讲了半小时外交辞令，但你问出的那两位数被本地报登了出来。", effects: { rep: 0.5, fac: { press: 2, commercial: -2 } } },
          meh: { body: "会上只有一句「一切合规」。你早知道会被这么打发。", effects: { rep: 0.05 } },
          fail: { body: "银行律师反函你的办公室，指控问询会「制造挤提」。本地生意人开始绕着你走。", effects: { rep: -1.2, fac: { commercial: -6, establishment: -3 } } },
          critfail: { body: "问询会一周后这家分行真被接管——储户的恐慌全被算到你头上：「谁叫你先去吓人的。」", effects: { rep: -2, fac: { base: -6, commercial: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "senate_inquiry", text: "把质询递到联邦层面：要求就房贷证券链与评级机构开调查听证",
        when: { tierRaw: true, tierMin: 7 },
        note: "点名两只基金只是开始，点名整条链条才是决断。赌错，你就是「不懂金融的人」。",
        base: 0.44, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "你问的那句「谁给这些债券盖的合格章」钉上了全国议程。数月后联邦调查令下来，发贷方与评级机构同一天收到传票。", effects: { rep: 1.9, attr: { INT: 2 }, voters: { warm: 300 }, fac: { press: 7, base: 6, commercial: -8, establishment: 3 }, flags: ["saw_it_early"] } },
          ok: { body: "案子立了，传唤排到了明年。你上了「懂这行」的短名单，也上了华尔街的黑名单。", effects: { rep: 0.7, fac: { press: 3, base: 3, commercial: -4 } } },
          meh: { body: "你的质询被归进「选前表演」，听证排期无限往后拖。", effects: { rep: -0.1, fac: { commercial: -2 } } },
          fail: { body: "金主集体撤线，评论员笑你把两只基金说成一场危机。你的捐款名单瘦了一圈。", effects: { rep: -1.7, fun: -1.5, fac: { commercial: -8, establishment: -5 } } },
          critfail: { body: "你引用的一页资产数据被当场证伪，「他不读年报，只读小报」上了财经版头排。", effects: { rep: -2.7, fun: -1.5, fac: { press: -8, establishment: -6, commercial: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2008-11 · 大选夜 —— 第一位黑人候选人就要走进白宫（风险·大事件）
   * ==================================================================== */
  {
    id: "ln08_election", photo: "era-2008.jpg", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 2008, maxYear: 2008, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 15, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 11, day: 4,
    title: "大选夜：第一位黑人候选人就要走进白宫",
    body: "选前所有民调都指着一个方向：如果今晚赢，他是第一个坐进那把椅子的黑人。排队的人从学校体育馆绕到街角，有人在车里哭。\n" +
      "本地两拨人同一天找上你：一拨要你立刻把竞选机器并过去；一拨提醒你，潮水退得比涨得快，而你明年还要在这片街上握手。",
    brief: {
      lede: "一场会把你的名字和一面旗绑在一起的选举。绑早了、绑错了都难解。",
      known: [
        "开票前夜两党都在抢本地票站，志愿者不够。",
        "你党本州的建制派还没表态，钱在等信号。",
        "你的对手已在照片墙上挂好全国候选人的旗。",
        "党部数据：本县去年差两千票输掉。"
      ],
      rumor: [
        "有人说这波会连执政八年，别站错边。",
        "有人说建制派准备卖人，只等新赢家。"
      ],
      unknown: [
        "这股风会带来还是带走本地的工作。",
        "你今夜的站位会被记几年。"
      ],
      terms: [{ k: "票站", v: "投票日开票与监票的据点，由地方党部调度。" }]
    },
    choices: [
      {
        id: "ride", text: "把本地机器并进这股东风，上台介绍他",
        note: "赌的是潮水不退。风险：明年这条街上你得自己解释。",
        base: 0.5, mods: [{ src: "fac", key: "base", w: 0.35 }, { src: "attr", key: "CHA", w: 0.4 }],
        cost: { fun: 0.7 },
        outcomes: {
          crit: { body: "你在体育馆前那两分钟被全国台循环放了一整夜。开票后，党部把你的名字写进了本州下一轮的名单。", effects: { rep: 1.6, fac: { base: 10, labor: 5 }, voters: { warm: 2200, diehard: 500 }, flags: ["wave_08"] } },
          ok: { body: "你上了台、喊对了名字。风把你抬起来一点，不多，但够你下一场用。", effects: { rep: 0.9, fac: { base: 7 }, voters: { warm: 1200 } } },
          meh: { body: "你站台了，话筒前挤满了更有名的人。没人记住你说了什么。", effects: { rep: 0.2 } },
          fail: { body: "本县照旧输了两个点。党部复盘时说，有些人只会喊口号不会拉票。", effects: { rep: -1.2, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "全国赢了，本地全输。你的照片成了对手传单正面的素材：他替外面的人说话。", effects: { rep: -2.2, fac: { establishment: -10, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "distance", text: "谁也不接：只办本地的事，不谈全国选情",
        note: "赌的是本地账本比全国风更耐久。风险：两边都不当你的人。",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "潮水退去后，两个党都发现你还站在本地那件事上。要办事的人开始先打你的电话。", effects: { rep: 0.2, fac: { establishment: 3 } } },
          ok: { body: "你一句话也没说错，也一句话也没被记住。", effects: { rep: 0.2 } },
          meh: { body: "这一夜与你无关。你在办公室看完了开票直播，然后回家。", effects: {} },
          fail: { body: "庆功的人少了你一个，追责的人也想起少了你一个。", effects: { rep: -0.2 } },
          critfail: { body: "两党各自的名单里都没有你。历史翻了页，你连页边都没沾上。", effects: { rep: -0.3 } }
        }
      },
      {
        id: "scoff", text: "赌他本州会输：把钱和人先送另一家",
        note: "赌的是民调在骗人。风险：赌错你就站在赢家对立面。",
        base: 0.44, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "establishment", w: 0.2 }],
        cost: { fun: 0.9 }, req: { tier: 2 },
        stake: { fun: true },
        outcomes: {
          crit: { body: "本州真的翻了。你成了少数几个提前站对的人，新政府的第一批地方名额在等你的电话。", effects: { rep: 2, fac: { establishment: 14, commercial: 10 }, lev: 1, flags: ["early_bet"] } },
          ok: { body: "你保住了本州的盘子。旧搭档嫌你投机，新赢家还得用你。", effects: { rep: 1, fac: { establishment: 8 } } },
          meh: { body: "你押的边没人认，钱花了，两边都不提你。", effects: {} },
          fail: { body: "风比你想象的硬。你在本地的老关系替你挡了一阵，然后一起被吹散。", effects: { rep: -1.6, fac: { base: -8, establishment: -4 } } },
          critfail: { body: "赢家查了本州谁在最后一周反手。名单上有你，你的捐款人先跟你切割。", effects: { rep: -2.4, fac: { base: -12, press: -8 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2008-12 · 三大车企救助 —— 五千个饭碗压在这纸救市案上（风险·大事件）
   * ==================================================================== */
  {
    id: "ln08_auto", photo: "era-2008.jpg", grade: "major", category: "finance",
    valence: "risk", dyn: true,
    minYear: 2008, maxYear: 2009, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 12,
    title: "联邦出手救三大车企，账要摊到你的县",
    body: "十二月的华盛顿在吵一笔紧急贷款：把通用与克莱斯勒从破产线上拽回来，条件是砍岗位、关工厂。\n" +
      "你的县有一座配件厂和一条整车物流线，五千个饭碗挂在它的订单上。厂方递来联名信，要你替它去华盛顿说句好话；工会的人已经在党部门口等你开口。",
    brief: {
      lede: "一笔全国都骂的救市案，摊到你县就是五千个饭碗：接不接。",
      known: [
        "配件厂五千岗位挂在车企订单上，厂方要你替它说话。",
        "工会已在党部门口等你开口骂资本。",
        "联邦条款写死：贷款换关厂、减薪。",
        "你去年收过那家配件厂的捐款。"
      ],
      rumor: [
        "有人说厂里早把订单往邻州挪了。",
        "有人说这案子撑不到夏天就散。"
      ],
      unknown: [
        "救活的是车厂还是债。",
        "你这一票会被记几年。"
      ],
      terms: [{ k: "救市贷款", v: "联邦以公款换股权与条款，救车企。" }]
    },
    choices: [
      {
        id: "local", text: "不表态全国：只在县里办就业对接，先保住现有岗位",
        note: "赌的是躲过这锅全国骂。风险：岗位照丢，账记你头上。",
        /* 本卡三支地方口吻的选项一律挡在 8 级以下：在位总统没有「你的县」，
           也不该去华盛顿替厂方游说。总统那一档只剩下面的 controlled_bust（它无 cost 无 req，点得起）。 */
        when: { tierRaw: true, tierMax: 8 },
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你把就业对接会开成本地唯一还在发薪的场合。车企后来还是倒了，可这五千人在最难的那半年没找错门。", effects: { rep: 0.3, fac: { base: 3 } } },
          ok: { body: "你只谈本地的事，一句话没多说。有人嫌你太淡，没人能说你站错队。", effects: { rep: 0.2, fac: { base: 2 } } },
          meh: { body: "这桩全国的事你一句没沾，日子照过。", effects: { rep: 0.1 } },
          fail: { body: "厂里还是裁了两千人。有人问：你当时在做什么。", effects: { rep: -0.2 } },
          critfail: { body: "「他一个字也没替我们说」被印在工会自己的传单上，发在厂门口。", effects: { rep: -0.3 } }
        }
      },
      {
        id: "back", text: "替厂方去华盛顿游说：把这笔救市贷款接住",
        note: "赌的是本地饭碗比全国舆论硬。风险：金主与工会两头不领情。",
        when: { tierRaw: true, tierMax: 8 },
        base: 0.46, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "establishment", w: 0.2 }],
        cost: { fun: 0.5 },
        outcomes: {
          crit: { body: "贷款批了，配件厂的单子续到后年。华盛顿的人记住了你能办成事，本地工人却记得你替资本说过话。", effects: { rep: 1.5, fac: { establishment: 9, commercial: 8, base: -5 }, attr: { INT: 1 }, flags: ["auto_yes"] } },
          ok: { body: "厂子保住大半，你的名字进了本地经济的功臣名单，也进了愤怒名单。", effects: { rep: 0.8, fac: { establishment: 5, commercial: 5 } } },
          meh: { body: "你跑了一趟华盛顿，什么也没改变，也没人记得你跑过。", effects: { rep: -0.2 } },
          fail: { body: "厂子照倒。你替资本说话那段视频在本地循环放，工会和街上的人一起把你算进账。", effects: { rep: -1.3, fac: { base: -8, labor: -4 } } },
          critfail: { body: "有人翻出你和厂方的联名信、你那笔捐款：他先收了钱，再替它辩护。调查的信封随之打开。", effects: { rep: -2, fac: { base: -10, press: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "claw", text: "开记者会：要救就先追高管的钱，别拿纳税人的钱保资本",
        note: "赌的是民愤可借。风险：厂主从此不接你电话。",
        when: { tierRaw: true, tierMax: 8 },
        base: 0.4, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "fac", key: "base", w: 0.3 }],
        req: { fac: "base", min: 18 }, cost: { fun: 0.4 },
        outcomes: {
          crit: { body: "你那句「先追高管的钱」当晚上下了一遍遍 cable 台。厂方把你列进不欢迎名单，而街区把你的名字写进了下次集会的横幅。", effects: { rep: 1.4, fac: { base: 10, press: 5, establishment: -8 }, voters: { warm: 400 }, flags: ["auto_claw"] } },
          ok: { body: "你把话说狠了。基层痛快，配件厂与上面的钱开始绕开你。", effects: { rep: 0.7, fac: { base: 6, establishment: -4 } } },
          meh: { body: "你的狠话被更大的声浪盖过去，第二天没人再提。", effects: { rep: -0.2, fac: { base: -2 } } },
          fail: { body: "贷款条款里有一项是本地厂得先减薪。你骂了资本，也被自己的选区骂。", effects: { rep: -1.2, fac: { commercial: -6, establishment: -5 } } },
          critfail: { body: "厂方放出你和工会往来的邮件，反咬你「两头吃」。两头一起翻脸，建制把你钉进被告席。", effects: { rep: -2.2, fac: { commercial: -9, establishment: -6, press: -4 }, flags: ["scandal_2"] } }
        }
      },
      /* #21 M4：总统视角 —— 十二月的白宫，签字笔在你手里：救，但要按你的条件救。 */
      {
        id: "controlled_bust", text: "自己拍板：给钱，但先走一遍有管理的破产——砍岗位、废卡车补贴、董事会换血",
        when: { tierRaw: true, tierMin: 9 },
        note: "赌全国恨过程但更恨失业。风险：你把「救资本」和「动资本」同时记在自己账上。",
        base: 0.48, mods: [{ src: "approval", w: -0.3 }, { src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "工厂在春末重新开工，岗位少了一半但厂子活着。两份骂你的声明出自同一批人，而州长替你说了一句「至少有人做了决定」。", effects: { rep: 2.2, appr: 3, fac: { base: 8, establishment: 5, commercial: -8 }, attr: { INT: 2 } } },
          ok: { body: "钱放出去了，条款也真的执行了。车企活着，工会嫌你狠，华尔街嫌你多事——你两边都不是自己的人。", effects: { rep: 1, appr: -1, fac: { commercial: -6, base: 4 } } },
          meh: { body: "程序按你写的走，市场按自己的走。三家厂里保住两家，第三家还是倒了。", effects: { rep: 0.2, appr: -2, fac: { establishment: -3 } } },
          fail: { body: "「总统替资方砍工人」剪成一条四十秒的口播，在你选区的电视循环播放。", effects: { rep: -1.8, appr: -6, fac: { base: -10, press: -6 } } },
          critfail: { body: "破产管理人把上一届董事会的奖金单和联邦条款一起放上网。所有人问同一句：批条款的人知不知道。", effects: { rep: -3, appr: -9, fac: { base: -10, press: -9, establishment: -6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2009-02 · 复苏与刺激方案 —— 七千亿要经过你的县（机遇·大事件）
   * ==================================================================== */
  {
    id: "ln09_stimulus", photo: "era-2009.jpg", grade: "major", category: "govt",
    valence: "boon", dyn: true,
    minYear: 2009, maxYear: 2009, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 14, unique: true,
    medium: ["print", "tv", "internet"], month: 2, day: 17,
    title: "联邦签出一张七千亿的支票，钱要经过你的县",
    body: "方案签字那天，全国的评论在吵它到底算不算数。你手边的东西更实在：一张修了二十年的桥图、一座漏水的学校体育馆、一份「就绪工程」排队表。\n" +
      "州的分配口径两周后下来。同一天，两家承包商各自递来一份合作意向，都写着我们做过。",
    brief: {
      lede: "机遇不等人：钱一定有人拿到，问题是谁的名字先写在项目上。",
      known: [
        "项目要报州里，本地得先出配套与环评。",
        "你县的桥与校舍都在表上，排队十年。",
        "两拨人都在递方案：一拨会做，一拨会送。",
        "名单公开，抢到第一笔的人会被记四年。"
      ],
      rumor: [
        "有人说州里已内定给自家县的工程。",
        "有人说真正的门在会递话的人手里。"
      ],
      unknown: [
        "这笔钱会不会变成明年的就业数字。",
        "你抢到的是工程还是债。"
      ],
      terms: [{ k: "就绪工程", v: "图纸与许可齐全、拨款即可开工的项目。" }]
    },
    choices: [
      {
        id: "apply", text: "按程序报：把排队十年的桥图先递上去",
        note: "赌的是流程还讲道理。风险：别人比你快，名额就没。",
        base: 0.65, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你的表填得最干净，州里把它当成了范例。桥的钱不多，但排在第一个，签字栏上是你的名字。", effects: { rep: 0.4, fac: { base: 4, establishment: 3 } } },
          ok: { body: "钱到账了，是别人吃剩的那一份，但桥确实要修了。", effects: { rep: 0.2, fac: { base: 2 } } },
          meh: { body: "你的申请在系统里显示「已受理」，就这样。", effects: { rep: 0.1 } },
          fail: { body: "名额给了邻县。流程一步没错，只是慢了一个礼拜。", effects: { rep: 0 } },
          critfail: { body: "你的表被退回：配套文件少了一页环评。补上来时，钱已经分完。", effects: { rep: 0, fac: { base: -2 } } }
        }
      },
      {
        id: "wire", text: "让掮客把项目挂进州里的打包清单",
        note: "赌的是有人肯替你递话。风险：人情要用选票还。",
        base: 0.55, mods: [{ src: "fac", key: "commercial", w: 0.3 }, { src: "attr", key: "CUN", w: 0.35 }],
        req: { contact: "lobbyist" },
        outcomes: {
          crit: { body: "你的桥被并进了州里那一大包，同包还有十二个县的项目。名单公布时，你是本地唯一被念到名字的人。", effects: { rep: 1.8, fac: { commercial: 10, establishment: 6 }, contact: { lobbyist: 8 }, flags: ["state_line"] } },
          ok: { body: "你上了那张清单，位置在中段，但确实是你的。", effects: { rep: 0.9, fac: { commercial: 6, establishment: 3 } } },
          meh: { body: "掮客接了你的材料，回了一句「排队」。", effects: { rep: 0.2 } },
          fail: { body: "州里的包里没有你这一项。你没输在道理上，输在没人替你说话。", effects: { rep: 0 } },
          critfail: { body: "打包清单曝光后，别人都写「本县申请」，只有你写的是那家掮客事务所。", effects: { rep: 0, fac: { press: -3 } } }
        }
      },
      {
        id: "shovel", text: "县里先垫配套，把图纸做成真开工",
        note: "赌的是联邦真会补上。风险：垫出去的是县里的债。",
        base: 0.5, mods: [{ src: "fac", key: "labor", w: 0.35 }, { src: "attr", key: "INT", w: 0.3 }],
        req: { fun: 2 },
        outcomes: {
          crit: { body: "联邦的批复晚到四个月，而你的桥已经在浇筑。工会把第一顶安全帽送给县里，本地台的镜头站在开工的坑边。", effects: { fun: 1.2, rep: 1.4, fac: { labor: 9, base: 7 }, contact: { union_boss: 10 }, voters: { warm: 800 }, flags: ["shovel_first"] } },
          ok: { body: "钱回来了，还了垫付款，工地留下了三十个本地人。", effects: { fun: 0.5, rep: 0.7, fac: { labor: 6 } } },
          meh: { body: "你垫的钱在账上趴了一个季度，才等到一纸批复。", effects: { rep: 0.2 } },
          fail: { body: "批复还在审，垫付款先进了审计的信封。桥没动，利息动了。", effects: { rep: 0 } },
          critfail: { body: "联邦最后把这批钱转去了别的州。县里的账上多出一笔要谁买单的债。", effects: { rep: 0, fac: { base: -2 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2009-03 · 被救公司的奖金单 —— 愤怒要找一张本地脸（风险）
   * ==================================================================== */
  {
    id: "ln09_aig", photo: "era-2009.jpg", grade: "mid", category: "scandal",
    valence: "risk", dyn: true,
    minYear: 2009, maxYear: 2009, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 3,
    title: "救市的钱刚到，奖金单先上了电视",
    body: "为了不让体系塌下去，联邦给那家保险巨头注了几千亿美元。三月的一个礼拜，电视上放出它发给高管的一亿六千五百万奖金单。\n" +
      "全国在骂。你的党部也在骂——因为你的竞选账上，去年收过这家公司本地分公司三笔钱。电话里说：今晚之前，你要不要讲点什么。",
    brief: {
      lede: "愤怒是现成的武器，也是现成的陷阱：谁先举起来，谁就先被打量。",
      known: [
        "你去年收过这家公司本地分行的三笔捐款。",
        "奖金合法，合同在救市之前就签了。",
        "党部要你骂，金主要你别说。",
        "本地分公司在这县还有一千多个岗位。"
      ],
      rumor: [
        "有人说名单是总部漏给记者，为了逼辞。",
        "有人说退钱只是做样子，一分退不回。"
      ],
      unknown: [
        "这股怒火烧到最后烧的是谁。",
        "你说出口的那一句会跟到哪。"
      ],
      terms: [{ k: "救市注资", v: "联邦以公款换股权，防机构连锁倒。" }]
    },
    choices: [
      {
        id: "jobs", text: "不接这茬：只在本县开就业会，谈岗位",
        note: "赌的是愤怒会自己转向。风险：捐款记录还在那儿。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "两周后全国的头条换成了失业率。你那一屋子找工作的人，成了本地唯一还摆着的好消息。", effects: { rep: 0.2, fac: { base: 3 } } },
          ok: { body: "你没上那张骂战名单，也没人替你说话。日子照过。", effects: { rep: 0.2 } },
          meh: { body: "这一周你一句没说，安静得不像发生了大事。", effects: {} },
          fail: { body: "本地报纸在小版面上重提你那三笔捐款，标题里没有你的名字，但有你的照片。", effects: { rep: -0.2 } },
          critfail: { body: "「他一句都没说过」被印成传单，发在工厂门口。骂声转向了你。", effects: { rep: -0.3 } }
        }
      },
      {
        id: "names", text: "开记者会，念出本地领奖金那几个名字",
        note: "赌的是民愤站在你这边。风险：岗位与金主同时翻脸。",
        base: 0.45, mods: [{ src: "fac", key: "base", w: 0.3 }, { src: "attr", key: "CUN", w: 0.4 }],
        cost: { fun: 0.5 },
        outcomes: {
          crit: { body: "那五个名字当晚被全国台念了一遍。总部打电话来问「这是谁」，而本地的电话被打爆——全是替你叫好的人。", effects: { rep: 1.6, fac: { base: 8, press: 6 }, voters: { warm: 600 }, flags: ["bonus_hunter"] } },
          ok: { body: "你把名单念完了。基层痛快，公司的人从此不接你电话。", effects: { rep: 0.8, fac: { base: 5 } } },
          meh: { body: "记者来了两家，稿子里名字写在最后一段。", effects: {} },
          fail: { body: "名单里那个人在本地住了二十年，还在教堂教书。第二天开始，被围的是你。", effects: { rep: -1.2, fac: { press: -5, commercial: -4 } } },
          critfail: { body: "有人翻出你那三笔捐款：他先收了钱，再来卖名单。州检察长的办公室也这么想。", effects: { rep: -2, fac: { commercial: -8, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "defend", text: "上电视替体系说话：骂它，但别撤钱",
        note: "赌的是讲道理的人还在。风险：你要一个人顶住全国的怒。",
        base: 0.38, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "commercial", w: 0.3 }],
        cost: { fun: 0.8 }, req: { fac: "commercial", min: 20 },
        outcomes: {
          crit: { body: "你的那段辩论被反复引用，「他敢说不爱听的那句」成了你的标签。金融圈的人开始把你当自己人。", effects: { rep: 1.6, fac: { commercial: 12, establishment: 10 }, contact: { lobbyist: 8 }, attr: { INT: 2 }, flags: ["system_man"] } },
          ok: { body: "你讲清了一件事，代价是三天没人邀请你。钱和引荐开始流向你。", effects: { rep: 0.8, fac: { commercial: 7, establishment: 4 } } },
          meh: { body: "你的道理没错，只是没人愿意在愤怒的年份听。", effects: { rep: -0.2, fac: { base: -2 } } },
          fail: { body: "节目主持人在你走后念了一句「观众怎么看」，屏幕下方开始滚动投票。", effects: { rep: -1.4, fac: { base: -8, press: -6 } } },
          critfail: { body: "你的剪辑版被放进对手的全国广告，标题只有四个字：他懂这个。", effects: { rep: -2.2, fac: { base: -10, press: -8, establishment: -4 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2009-04 · 新型流感 —— 停课要有人在纸上签字（威胁）
   * ==================================================================== */
  {
    id: "ln09_h1n1", photo: "era-2009.jpg", grade: "mid", category: "civil",
    valence: "bane", dyn: true,
    minYear: 2009, maxYear: 2009, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 12, unique: true,
    medium: ["tv", "radio", "print"], month: 4,
    title: "一种新流感进了校园，停课要有人签字",
    body: "四月底，外地一个小镇因为几例高烧的孩子关掉了学校。几天后本州报了第一例，而检测试剂盒只够确诊，不够筛查。\n" +
      "学区总监打来电话：停课两周，谁签字。县医院说他们只剩八张观察床。五月有州考、有毕业礼，还有两周不发薪的水厂临时工。",
    brief: {
      lede: "决定不难做，难的是做完之后谁付账：孩子、工资，还是你的名声。",
      known: [
        "试剂盒不够，本地病例多数不会被确诊。",
        "停课要学区与县共同签字，责任写名字。",
        "县医院观察床只剩八张，重症得转市里。",
        "五月有州考，双职工家庭没人带孩子。"
      ],
      rumor: [
        "有人说州里压着不报，怕影响旅游季。",
        "有人说这病九月还会回来一次，更凶。"
      ],
      unknown: [
        "这病最后有多重，四月底没人知道。",
        "停课那个字会救你还是毁你。"
      ],
      terms: [{ k: "甲型流感", v: "新型流感病毒，当年春季起全球蔓延。" }]
    },
    choices: [
      {
        id: "defer", text: "照州里口径办：转发指引，不替学区签字",
        note: "赌的是上面比你先担责。风险：你是那个没动作的人。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "五月中，州里自己下了令。你的档案里什么都没写，医院的走廊也没有变长。", effects: { rep: 0.3, fac: { establishment: 4 } } },
          ok: { body: "你按流程转发了所有文件。有人嫌你太淡，没人能说你做错。", effects: { rep: 0.2, fac: { establishment: 2 } } },
          meh: { body: "那两周你只发了一封邮件，抄送十二个人。", effects: {} },
          fail: { body: "毕业礼上一个班的孩子病倒，家长会上有人问：县里那几周在做什么。", effects: { rep: -0.4, fac: { base: -2 } } },
          critfail: { body: "「他当时只说按州里办」——这句话被印在家属自己做的传单上。", effects: { rep: -1, fac: { base: -5, press: -4 } } }
        }
      },
      {
        id: "close", text: "不等州里批：本地学校先停课两周",
        note: "赌的是疫情真的会来。风险：钱与安全两头都骂你。",
        base: 0.44, mods: [{ src: "fac", key: "base", w: 0.35 }, { src: "attr", key: "INTG", w: 0.3 }],
        cost: { fun: 0.4 },
        outcomes: {
          crit: { body: "本州第二例出现在停课后的第九天。县医院没挤满，邻县照着你的纸抄了自己的令。", effects: { rep: 1.4, fac: { base: 9, labor: 4 }, voters: { warm: 400 }, flags: ["shut_first"] } },
          ok: { body: "课停了，病没来太多。家长谢你，商户抱怨你，两边都算数。", effects: { rep: 0.7, fac: { base: 5 } } },
          meh: { body: "你抢在州里前面签了字，然后发现什么也没发生。", effects: {} },
          fail: { body: "两周的课没了，州考照常。教师、家长与餐馆一起把账算在你身上。", effects: { rep: -1, fac: { commercial: -6, labor: -3 } } },
          critfail: { body: "州教育厅发话：地方无权停课。你的令被撤回，还多了一份调查报告。", effects: { rep: -1.8, fac: { commercial: -8, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "trace", text: "自掏钱请医院做分流，每天公布真实数字",
        note: "赌的是数据换得来信任。风险：数字难看就是难看。",
        base: 0.4, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "labor", w: 0.25 }],
        cost: { fun: 0.6 }, req: { contact: "doctor" },
        outcomes: {
          crit: { body: "你那张每日统计表被本地台挂在角标上播了六周。等到疫苗八月到货时，县里的分配名额排在全国前列。", effects: { rep: 1.5, fac: { base: 6, labor: 5 }, contact: { doctor: 12 }, attr: { INT: 2 }, flags: ["count_public"] } },
          ok: { body: "分流跑起来了，数字小得让人放心，也小得没人注意。", effects: { rep: 0.7, fac: { labor: 4 }, contact: { doctor: 6 } } },
          meh: { body: "你贴了六周的表，看的人越来越少。", effects: {} },
          fail: { body: "公布的数字往上跳了一格，恐慌比病毒先到。卫生厅说你越权发布。", effects: { rep: -1.2, fac: { establishment: -6, press: -4 } } },
          critfail: { body: "有个数字错了。报上去、印出来、成了「县里瞒报」的证据，调查从你的办公室开始。", effects: { rep: -2, fac: { establishment: -8, press: -6, base: -4 }, flags: ["scandal_1", "investigation_open"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2009-11 · 基地枪击 —— 该给这件事取什么名字（威胁）
   * ==================================================================== */
  {
    id: "ln09_forthood", photo: "era-2009.jpg", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2009, maxYear: 2009, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "radio"], month: 11, day: 5,
    title: "基地枪响十三人，该叫什么名字成了问题",
    body: "十一月的一个上午，得州一处大军营的诊所里响起枪声，十三个人再没走出来。开枪者是军中的医生，现场有人喊过一句阿拉伯语。\n" +
      "当天傍晚，全国的争论从「为什么」换成了「该叫什么」：恐怖袭击，还是别的。你县里有基地的家属，也有一座刚被报纸点名过的清真寺。",
    brief: {
      lede: "定性两个字，就能决定你的邻居明天会不会被敲门。",
      known: [
        "基地征兵处挂在本地高中，家属会来问你。",
        "军方调查口径未出，党部要你先表态。",
        "本县有座清真寺，上周刚被报纸点过名。",
        "州反恐联络站的预算归你的小组管。"
      ],
      rumor: [
        "有人说凶手早被同僚举报过，没人理。",
        "有人说定性是为了不必查军队内部。"
      ],
      unknown: [
        "这次会不会被写进战争史。",
        "你选的措辞会护住谁、砸了谁。"
      ],
      terms: [{ k: "内部威胁", v: "由组织内部人员发动的袭击，军方口径。" }]
    },
    choices: [
      {
        id: "families", text: "只做事：接家属、协调探视，不谈定性",
        note: "赌的是实务本身站得住。风险：除了流程谁都没被安抚。",
        base: 0.6, mods: [{ src: "attr", key: "CHA", w: 0.35 }],
        outcomes: {
          crit: { body: "你把巴士、住宿与探视排得一件没漏。三个月后，阵亡者名单的纪念册里有一页在谢本地。", effects: { rep: 0.4, fac: { base: 3, military: 3 } } },
          ok: { body: "该办的事都办到了。没人夸，也没人挑。", effects: { rep: 0.2, fac: { military: 2 } } },
          meh: { body: "你在机场接待厅站了两晚，来的人没几个需要你说话。", effects: { rep: 0.1 } },
          fail: { body: "一个家属找不到孩子该住哪里，视频里那句「本地没人管」传遍了全网。", effects: { rep: -0.4 } },
          critfail: { body: "你协调的那笔探视费被查出重复报销。十三个人死了，而你在解释收据。", effects: { rep: -0.9, fac: { base: -3 } } }
        }
      },
      {
        id: "name", text: "公开定性：这就是恐怖袭击，别绕",
        note: "赌的是民众要一句硬话。风险：军方与本地社区两头冲你来。",
        base: 0.4, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        cost: { fun: 0.3 },
        outcomes: {
          crit: { body: "你那句「别替它换名字」被三家全国台引用。两周后，军方改了口径。", effects: { rep: 1.5, fac: { base: 8, press: 6, military: -8 }, voters: { warm: 300 }, flags: ["naming_fight"] } },
          ok: { body: "你说了那句硬话。街上的人点头，基地的人不再跟你点头。", effects: { rep: 0.7, fac: { press: 4, military: -4 } } },
          meh: { body: "你的定性被更大的声浪盖过去了，第二天没人再提。", effects: { rep: -0.2, fac: { base: -2 } } },
          fail: { body: "调查口径最终没改，军方把你那句写进了新闻回应的反驳段。你的病也一起拖长了。", effects: { rep: -1.2, fac: { military: -8, establishment: -5 } } },
          critfail: { body: "本地基地的征兵站被砸了玻璃。所有人回头找是谁先喊的那一句。", effects: { rep: -2, fac: { military: -10, establishment: -6, base: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "protect", text: "先去清真寺与阵亡者两头站，拒绝定性",
        note: "赌的是本地不会先炸。风险：全国的骂声会落到你头上。",
        base: 0.36, mods: [{ src: "attr", key: "INTG", w: 0.45 }, { src: "fac", key: "church", w: 0.25 }],
        cost: { fun: 0.5 }, req: { fac: "church", min: 15 },
        outcomes: {
          crit: { body: "清真寺那晚的灯开着，阵亡者家属说本地有人来握过手。两年后一份联邦报告承认：内部的审查早就该做。", effects: { rep: 1.6, fac: { church: 10, base: 6, press: 5, military: -6 }, attr: { INTG: 2 }, flags: ["held_the_line"] } },
          ok: { body: "两边都被你护住了。全国的骂声冲你来，本地没人还嘴。", effects: { rep: 0.8, fac: { church: 7, base: 3 } } },
          meh: { body: "你说的克制话没人转发，也没人反对。这个月就这样过去了。", effects: {} },
          fail: { body: "「他不去基地，倒先去清真寺」被剪成十五秒，在 cable 台放了三天。", effects: { rep: -1.4, fac: { base: -6, military: -6, press: -4 } } },
          critfail: { body: "第二起枪击在别的州发生，你的名字被挂在因果链上。有人开始正式要求查你。", effects: { rep: -2.4, fac: { press: -8, military: -8 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2010-04 · 海上钻井平台爆炸 —— 油没上岸，账已经上路（威胁）
   * ==================================================================== */
  {
    id: "ln10_oil", photo: "era-2010.jpg", grade: "mid", category: "civil",
    valence: "bane", dyn: true,
    minYear: 2010, maxYear: 2010, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "social"], month: 4, day: 20,
    title: "海上平台炸了，油漂到谁的岸边没人说",
    body: "四月的一个晚上，墨西哥湾一座钻井平台起火爆炸，十一人没有回来。两天后油开始冒，公司新闻稿第一句是：责任不止在我们。\n" +
      "你管着三个海岸县：三千多张捕鱼执照、两家假日旅馆、一个夏天。州里说要告联邦，县里说要人先到。渔会的人问你：谁替我们记账。",
    brief: {
      lede: "水面上什么都看不见，账已经在往下走：谁先把签字的位置占住。",
      known: [
        "赔偿要走公司的理赔办事处，材料自己交。",
        "州检方已备好集体诉讼，缺地方背书。",
        "本地两家旅馆的季度订金这个月退光。",
        "平台的岸上承包商去年给你捐过钱。"
      ],
      rumor: [
        "有人说公司在私下按人买和解书。",
        "有人说堵漏的办法还没人试过，在拖。"
      ],
      unknown: [
        "油什么时候上岸，海流说了算。",
        "你占的这个位置四年后要结账。"
      ],
      terms: [{ k: "理赔办事处", v: "公司为集体索赔设的窗口，先签先领。" }]
    },
    choices: [
      {
        id: "watch", text: "先等联邦定性：发个声明，说密切关注",
        note: "赌的是这事自有人管。风险：本地人只记得你没来。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "油最终绕开了你的岸线。你那张克制的声明，事后被算成「没有添乱」。", effects: { rep: 0.3, fac: { establishment: 3 } } },
          ok: { body: "你按程序说话，什么也没得到，什么也没失去。", effects: { rep: 0.2, fac: { base: 2 } } },
          meh: { body: "你的声明被塞在报纸第六版。海上那根柱子还在冒。", effects: {} },
          fail: { body: "捕季关了两次。渔民在码头烧了渔具，也烧了你的名字。", effects: { rep: -0.4, fac: { base: -2 } } },
          critfail: { body: "「密切关注」那四个字被印在悼念死难者的旗子上，就在你办公室门口。", effects: { rep: -0.9, fac: { base: -4, press: -3 } } }
        }
      },
      {
        id: "claims", text: "把理赔桌搬到本地：帮渔民一户一户立案",
        note: "赌的是钱真会到账。风险：办事处一句不合规就白忙。",
        base: 0.44, mods: [{ src: "fac", key: "labor", w: 0.3 }, { src: "attr", key: "CHA", w: 0.4 }],
        cost: { fun: 0.5 },
        outcomes: {
          crit: { body: "你借中学体育馆开了三个月的立案桌，一千二百份材料交出去，第一笔赔款在秋天到账。渔会的主席席上开始有人提你的名字。", effects: { fun: 1.2, rep: 1.4, fac: { labor: 8, base: 5 }, voters: { warm: 500 }, flags: ["claim_desk"] } },
          ok: { body: "钱到账了一半，还有一半在「审核中」。人记得你跑过。", effects: { fun: 0.6, rep: 0.6, fac: { labor: 5 } } },
          meh: { body: "桌摆上了，来的人填了两张表就走了：赔款还没有开禁。", effects: {} },
          fail: { body: "公司办事处把你的材料退回：格式不合。渔民听不懂格式，只听见没人赔。", effects: { rep: -1, fac: { commercial: -6, labor: -3 } } },
          critfail: { body: "有人发现立案桌收了承包商的赞助费，而承包商正是平台的岸上分包。两头的官司都来找你。", effects: { rep: -1.8, fac: { commercial: -8, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "hearing", text: "开听证：把承包商老板与州环保局长摁上桌",
        note: "赌的是全国镜头会跟来。风险：建制的钱从此绕你走。",
        base: 0.48, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "press", w: 0.25 }],
        cost: { fun: 0.3 }, req: { tier: 2 },
        outcomes: {
          crit: { body: "那位老板在你桌上说了「我们还不知道有多糟」。第二天，这句话在四个全国台播了一整天。", effects: { rep: 1.7, fac: { press: 8, base: 5, establishment: -6 }, attr: { INT: 2 }, flags: ["hot_seat"] } },
          ok: { body: "听证开成了，证词不痛不痒，但程序留在了你手里。", effects: { rep: 0.9, fac: { press: 5 } } },
          meh: { body: "局长念了稿，老板念了稿，记者等的是吵架，没人吵。", effects: { rep: -0.1 } },
          fail: { body: "党部说你把盟友按在被告席上。你下一次要钱的时候，电话没人接。", effects: { rep: -1.2, fac: { establishment: -6, commercial: -4 } } },
          critfail: { body: "承包商的律师团翻出你选区那笔捐款，听证会反手变成对你的审计。", effects: { rep: -2, fac: { establishment: -8, press: -4, commercial: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2010-07 · 战场日志外泄 —— 公开与有人因此死，成了同一句话（风险）
   * ==================================================================== */
  {
    id: "ln10_wikileaks", photo: "era-2010.jpg", grade: "mid", category: "media",
    valence: "risk", dyn: true,
    minYear: 2010, maxYear: 2010, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["internet", "social", "print", "cable"], month: 7,
    title: "几万份战场日志一夜公开，本地也有人上榜",
    body: "七月底，一个网站把阿富汗战争的几万份原始日志一次摊开：阵亡者名单、线人代号，也有一句提到本州。八月，更大的一批在路上。\n" +
      "国务院说这是安全问题。你认得的两个人同一天打来电话：一个是本地周报主编，他说要跟着登；一个在国民警卫队，他说你的名字已经被人问起。",
    brief: {
      lede: "信息公开与有人因此死，第一次成了同一句话的两头。",
      known: [
        "本地周报在等你一句该不该登。",
        "警卫队里有你的旧相识，名单上有地名。",
        "党部要你喊追责，媒体圈要你护报馆。",
        "反泄密的口径由司法部定，地方插不上话。"
      ],
      rumor: [
        "有人说名单上的人早已被转移。",
        "有人说这批文件先被审过才放出。"
      ],
      unknown: [
        "这事最后落在新闻自由还是间谍案。",
        "你先说的哪一句会被引用两年。"
      ],
      terms: [{ k: "战争日志", v: "军方前线的原始行动记录，非官方发布。" }]
    },
    choices: [
      {
        id: "ask", text: "只问一句：名单上的人会不会死",
        note: "赌的是这道题谁都答不了。风险：两边都说你在躲。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你那句追问被两家周刊引用，成了当年讨论这件事时最常用的那句引语。", effects: { rep: 0.2, fac: { church: 3 } } },
          ok: { body: "你把问题放在桌上，没有替任何人回答。", effects: { rep: 0.2 } },
          meh: { body: "你的问题很小，那天的新闻很大。", effects: {} },
          fail: { body: "两边的稿子都写：他拒绝表态。", effects: { rep: -0.2 } },
          critfail: { body: "十月那批文件出来后，有人翻出你那句追问：他当时就知道。", effects: { rep: -0.3 } }
        }
      },
      {
        id: "pursue", text: "联署要求按反间谍法追查泄密源头",
        note: "赌的是军方与建制要这姿态。风险：媒体圈把你记成敌人。",
        base: 0.45, mods: [{ src: "fac", key: "military", w: 0.3 }, { src: "attr", key: "CUN", w: 0.35 }],
        cost: { fun: 0.4 },
        outcomes: {
          crit: { body: "你的联署排进国会听证的材料附件。警卫队的旧相识主动约你吃饭，情报机构的人记住了这个县。", effects: { rep: 1.5, fac: { agency: 9, military: 7, establishment: 5 }, contact: { fed: 6 }, flags: ["chase_source"] } },
          ok: { body: "名字排上了第三十位，方向是对的，功劳是别人的。", effects: { rep: 0.7, fac: { agency: 6 } } },
          meh: { body: "联署交上去，像投进一个没有信箱口的楼。", effects: {} },
          fail: { body: "文件浪潮更高，你的联署被读成了「替做错的事封口」。", effects: { rep: -1, fac: { base: -6, press: -5 } } },
          critfail: { body: "报馆在头版回敬了你，标题是「他要查说话的人」。本地的订报率当月掉了。", effects: { rep: -1.8, fac: { base: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "shield", text: "替报馆与爆料者说话：别让叛徒两字先落地",
        note: "赌的是风会转向新闻自由。风险：你可能亲手招来调查。",
        base: 0.38, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "press", w: 0.3 }],
        cost: { fun: 0.6 }, req: { contact: "columnist" },
        outcomes: {
          crit: { body: "十月，最大那批文件落地，全国都在问同一个问题——你四月就问了。周刊把你的旧话重登了一遍。", effects: { rep: 1.7, fac: { press: 9, base: 7 }, attr: { INTG: 2 }, voters: { warm: 400 }, flags: ["press_side"] } },
          ok: { body: "你替报馆挡了一晚。党部电话打来的时候，主编替你说了话。", effects: { rep: 0.8, fac: { press: 6, base: 3 } } },
          meh: { body: "你的声明和本地新闻一起排在第二版。", effects: {} },
          fail: { body: "有一名人据称因文件出事。你的立场在一夜之间变成罪名。", effects: { rep: -1.2, fac: { agency: -8, military: -5 } } },
          critfail: { body: "联邦调查人员的电话打进了你的办公室，问的是你和那位主编的通信。", effects: { rep: -2.2, fac: { agency: -10, establishment: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 世界线 · 2007—2010（按绝对年份深合并，见 content/21-worldline.js 的约定）
 *   · 不写 "*"：本带之外的年份整体回落 era。
 *   · pressure 取真实动荡度：2008 为本带峰值。
 * ==========================================================================*/
POTUS.define("worldline", {
  pressure: {
    "2007": 3,   // 房价开始失血、信贷接连出事，战争账单没人愿意认
    "2008": 6,   // 投行接连倒下、政府亲自接盘，加上一次改写版图的大选
    "2009": 5,   // 失业爬到两位数字，救市的账单寄到每家每户
    "2010": 4    // 漏油与泄密同期发生，愤怒在中期选举找到出口
  },
  brief: {
    "2007": "账面财富还在涨，可房子的地基已经在响；人人隐约觉得哪里不对，谁也说不出口。",
    "2008": "秩序当众塌了一角，选票上出现从没站过的名字。这一年的情绪是：原来它真的会坏。",
    "2009": "钱被拿去救别人，账单寄回自己家；上街的人开始把「政府」两个字说得不客气。",
    "2010": "海面上的油在收，海底的账没结；愤怒从广场挪进了投票站。"
  },
  outlets: {
    "2007": ["华尔街日报", "纽约时报", "有线电视新闻网", "今日美国", "赫芬顿邮报"],
    "2008": ["华尔街日报", "华盛顿邮报", "有线电视新闻网", "赫芬顿邮报", "BuzzFeed", "推特"],
    "2009": ["纽约时报", "有线电视新闻网", "今日美国", "BuzzFeed", "推特", "全国广播"],
    "2010": ["华尔街日报", "华盛顿邮报", "有线电视新闻网", "福克斯新闻", "布赖特巴特新闻", "推特"]
  }
});

/* ============================================================================
 * 定点表 fixed · 2007—2010（14 个锚点，major 5 个 ≈1/3）
 *   前 10 项是本带新卡；后 4 项是**存量卡只做 pin**（不重写、不写同主题新卡）：
 *     2008_crash_offer（雷曼与 7000 亿方案，2008-09，major）
 *     2008_debate（选前辩论，2008-10，mid）
 *     2008_tea_party（报税季的抗税浪潮，2009-04，mid —— 与 era.scheduled 同点，去重后只演一次）
 *     wave_tea_rally（茶党集会潮，2010-09，major）
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln07_vt", year: 2007, month: 4, grade: "mid" },
  { event: "ln07_subprime", year: 2007, month: 8, grade: "mid" },
  { event: "2008_crash_offer", year: 2008, month: 9, grade: "major" },
  { event: "2008_debate", year: 2008, month: 10, grade: "mid" },
  { event: "ln08_election", year: 2008, month: 11, grade: "major" },
  { event: "ln08_auto", year: 2008, month: 12, grade: "major" },
  { event: "ln09_stimulus", year: 2009, month: 2, grade: "major" },
  { event: "ln09_aig", year: 2009, month: 3, grade: "mid" },
  { event: "2008_tea_party", year: 2009, month: 4, grade: "mid" },
  { event: "ln09_h1n1", year: 2009, month: 4, grade: "mid" },
  { event: "ln09_forthood", year: 2009, month: 11, grade: "mid" },
  { event: "ln10_oil", year: 2010, month: 4, grade: "mid" },
  { event: "ln10_wikileaks", year: 2010, month: 7, grade: "mid" },
  { event: "wave_tea_rally", year: 2010, month: 9, grade: "major" }
]);
