/* ============================================================================
 * CONTENT · events/123-line-2003-06.js
 * 连续时间轴 · 2003—2006 定点大事件（Track B · w04）。
 *
 * 形制照 events/110-line-1980s.js（见 docs/PARALLEL-CONTENT-WORK.md §4）：
 *   · 不写 era —— 一律 minYear/maxYear + scoped；到点必发靠本文件末尾的 fixed。
 *   · 存量卡只钉不重写：wt03_wmd（开战理由）、wt02_patriot（爱国者法执行）、
 *     wt02_alert（色彩警报）复用既有卡，只追加定点锚。
 *   · 每卡一个保底选项（无 cost 无 req、高地板低天花板、不埋负面 flag）；
 *     冒险项之间支出↔把握↔天花板错位，收益铺至少两根轴。
 *   · 本带最高优先级：ln05_katrina（卡特里娜飓风与联邦救灾失灵）。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2003-05 · 开战余波：航母甲板上的「任务完成」（已做层级分层）
   *   （开战与背书角度已由存量卡 wt03_wmd 覆盖，本卡只做「速胜庆功」余波）
   *   选项级 when 用 tierRaw 写在 0—9 真实层级：底 T0—3 自救、中 T4—6 办事、
   *   高 T7—9 定调；每档两条。卡级去掉 tierMax，让高段玩家也发得出这张卡。
   * ==================================================================== */
  {
    id: "ln03_war", grade: "major", category: "foreign",
    valence: "risk", dyn: true,
    minYear: 2003, maxYear: 2003, scoped: true, tierRaw: true, tierMin: 0, weight: 13, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 5,
    title: "总统在航母上宣布「任务完成」，举国替这场战争喝彩",
    body: "开战三周，巴格达陷落，雕像被拉倒的画面循环播了一整周。五月一日，总统穿着飞行服降落在航母甲板，身后挂着「任务完成」的横幅。支持率冲上峰值，「志愿联盟」成了最体面的词。\n" +
      "党部催你出席庆功集会，本地电视台在找「胜利者」的脸——而占领区断水与抢劫的新闻，此刻还排不进晚间头条。",
    brief: {
      lede: "所有人都在庆功，没人愿意先问「然后呢」——这个问题此刻问出口最伤人伤己。",
      known: [
        "党部请你上庆功台，因为你早前替战争递过支持。",
        "巴格达被占领，临时管理没搭起来，抢劫上了电视。",
        "支持率在峰值，此刻唱低调等于自毁。",
        "金主在传话：占领的花销正在变成预算问题。"
      ],
      rumor: [
        "有人说五角大楼根本没写完战后方案。",
        "有人说这股胜风能一直吹到明年选举。"
      ],
      unknown: [
        "没人提的游击战与账单在后面等。",
        "你今晚的姿态，会跟你很多年。"
      ],
      terms: [
        { k: "任务完成", v: "2003 年宣布对伊主要战事结束。" },
        { k: "志愿联盟", v: "未经联合国授权、支持出兵的多国集合。" }
      ]
    },
    choices: [
      {
        id: "ride_victory", text: "站上庆功台：把自己算进「胜利者」里",
        when: { tierRaw: true, tierMin: 7 },
        note: "赌的是胜利能变成你的台阶。风险：潮水退时，台上的人最显眼。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "military", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你庆功台上的几句话被电视网反复引用，「早就支持开战」成了有远见的注脚，军界与建制第一次把你当自己人。", effects: { rep: 1.6, fac: { establishment: 10, military: 8, base: 4 } } },
          ok: { body: "你搭上了这班顺风，露了不少脸，谁都没挑出毛病。", effects: { rep: 0.8, fac: { establishment: 5, military: 4 } } },
          meh: { body: "你去了，说了几句应景话。掌声太响，没人听清你说了什么。", effects: { rep: 0.2 } },
          fail: { body: "占领区的账单开始见报，你当初的「胜利」被翻出来，配着烧毁的油井重播。", effects: { rep: -1.4, fac: { press: -6, military: -4 } } },
          critfail: { body: "「任务完成」成了笑话的封面，而你站在封面正中央。「他催着打的这场仗」从此跟着你。", effects: { rep: -2.4, fac: { press: -8, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "ask_after", text: "当众追问「然后呢」：谁管这座城，钱从哪来",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        note: "赌的是你比全国早醒一年。风险：现在没人爱听扫兴话。",
        base: 0.40, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "attr", key: "INTG", w: 0.2 }],
        outcomes: {
          crit: { body: "两年后重建失控、账单爆炸，你那句「然后呢」被剪进每一支回顾片，成了「先醒的人」的标签。", effects: { rep: 1.8, attr: { INT: 2 }, fac: { press: 8, base: 6, establishment: -10 } } },
          ok: { body: "你问得得体，当时挨了骂，事后攒下几分「有脑子」的名声。", effects: { rep: 0.6, fac: { press: 4, establishment: -3 } } },
          meh: { body: "你的问题被欢呼声盖过去。没人答，也没人记。", effects: { rep: -0.2, fac: { establishment: -3 } } },
          fail: { body: "在举国庆功的空气里你唱反调，对手把你剪成「他盼着这仗输」。", effects: { rep: -1.6, fac: { establishment: -8, military: -6 } } },
          critfail: { body: "你追着白宫吵「战后方案」，机器回头清算：本地资源一夜之间绕着你走。", effects: { rep: -2.6, fac: { military: -10, establishment: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "toast_troops", text: "只向士兵道谢，战后安排一个字不评",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        note: "赌的是不沾「然后呢」三个字。风险：两头都嫌你话少。",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你那句「先谢过在这里的人」被军属社区传开——那种时刻不抢功也不拆台，反倒显得可靠。", effects: { rep: 0.6, fac: { military: 4 } } },
          ok: { body: "你说了得体的感谢，没人挑出毛病，也没人特别记住你。", effects: { rep: 0.3 } },
          meh: { body: "你道了谢，风头都被名字更大的人占了。", effects: {} },
          fail: { body: "两拨人都来劝你表态，你都没接，两边的饭局从此少摆你的牌子。", effects: { rep: -0.3 } },
          critfail: { body: "你的「谁也不得罪」被两头各自解读：一边说你心虚，一边说你滑头。", effects: { rep: -0.6, fac: { press: -2 } } }
        }
      },
      {
        id: "welcome_home", text: "去基地门口接回家的人：替乡邻接下行李，送他到家",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        base: 0.62, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "military", w: 0.25 }],
        outcomes: {
          crit: { body: "你接的那个兵就住你隔壁街。他母亲在门廊上当着所有人说：「多亏有你跑这一趟。」军属社区记住了你。", effects: { rep: 1.0, fac: { military: 6, base: 6 } } },
          ok: { body: "你跑了三趟大巴站，帮两家把人和行李安顿回家。没人登报道谢，可那两家记得。", effects: { rep: 0.4, fac: { base: 3 } } },
          meh: { body: "你去接了，接站的人比下车的还多，你帮不上什么大忙。", effects: { rep: 0.1 } },
          fail: { body: "你替一位母亲去问儿子的归期，几处都被官腔挡回。你那句「我尽力了」说得自己都不信。", effects: { rep: -0.5, fac: { military: -3 } } },
          critfail: { body: "你接回的那名士兵次日被本地报拍到进了戒所处。有人问：「你接人时就没看出他有伤？」", effects: { rep: -1.2, fac: { base: -4, military: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "care_desk", text: "在本州设一个归建过渡窗口：床位、岗位、伤残评定一次排办",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        note: "花钱把「能办事」做成招牌。庆功的人不爱听伤兵的事，可这张桌子写你的名字。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "military", w: 0.25 }],
        cost: { fun: 1 },
        outcomes: {
          crit: { body: "你的窗口三个月办完了别人两年的量，国防部把你这套办法写进各州参考文本。伤兵家庭管你叫「那位办事的」。", effects: { rep: 1.5, fun: -0.5, fac: { military: 8, establishment: 5, base: 3 } } },
          ok: { body: "桌子支起来了，队排上了，事办成了大半。经费烧得不慢，好在账目干净。", effects: { rep: 0.6, fun: -1, fac: { military: 4 } } },
          meh: { body: "窗口是开了，流程却卡在联邦表格上。你贴出来的只是一张又一张「等待中」。", effects: { rep: 0.05, fun: -1.5 } },
          fail: { body: "一笔转拨被审计咬住，你的「安置桌」成了「挪用公款」的新闻素材。", effects: { rep: -1.5, fun: -2, fac: { press: -5, establishment: -3 } } },
          critfail: { body: "一名等不及的伤兵出了事，家属举着你的竞选传单在州府门口质问：窗口不是你开的吗？", effects: { rep: -2.2, fun: -2, fac: { base: -6, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "demand_plan", text: "把「然后呢」变成正式质询：要国防部分管官员交出占领开销与重建时间表",
        when: { tierRaw: true, tierMin: 7 },
        note: "全国版面替你把问题放大，也替对手把靶子画大。这一步迈出去，就没有中间。",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "press", w: 0.2 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你逼出的那份开销清单第一次进了听证记录，「谁付账」从此有人负责追问。两年后每支战争回顾片里都有你那一页。", effects: { rep: 2.0, voters: { warm: 300 }, fac: { press: 8, establishment: -6, base: 5 }, flags: ["saw_it_early"] } },
          ok: { body: "质询立住了，时间表挤出来半页。建制骂你扫兴，报界记你清醒。", effects: { rep: 0.8, fac: { press: 4, establishment: -3 } } },
          meh: { body: "你的质询被一句「支持前线部队」的程序动议绕开，没成记录。", effects: { rep: -0.2, fac: { establishment: -3 } } },
          fail: { body: "胜选余温里你追着要账单，捐款名单开始漏人。「他盼着这仗输」被反复重播。", effects: { rep: -1.8, fac: { establishment: -6, military: -5 } } },
          critfail: { body: "你援引的那份「占领开销」被证实数字错得离谱，从「先醒的人」到「乱咬的人」只用了一个星期。", effects: { rep: -2.8, fac: { press: -10, establishment: -6 }, flags: ["scandal_2"] } }
        }
      },
      /* #21 M4：总统视角 —— 横幅挂在你身后，「任务完成」这四个字只有你能说出口。 */
      {
        id: "carry_deck", text: "落在航母甲板上宣布主要战事结束：把胜利写成自己的政治资本，同时定下占领的规矩",
        when: { tierRaw: true, tierMin: 9 },
        note: "全国此刻只听得进一句话，而那句话归你说。风险：「任务完成」四个字将成为此后八年的对照。",
        base: 0.55, mods: [{ src: "approval", w: 0.3 }, { src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "飞行服、拦阻索、甲板上的掌声——这一场戏你排得干净。你把宣布当天用来签占领令：文官管重建、军费单列、审计公开。两年后骂这场战争的人，也承认那半年的秩序不是意外。", effects: { rep: 2.6, appr: 7, fac: { military: 10, establishment: 8, base: 4 }, voters: { warm: 500 } } },
          ok: { body: "支持率冲到任内峰值。趁着这股劲，你国会山的人把手伸进了原本推不动的账目里。", effects: { rep: 1.4, appr: 4, fac: { military: 5, establishment: 5 } } },
          meh: { body: "照片很好看，宣布很顺利。第二天幕僚问你占领阶段谁负责，你发现名单还没定。", effects: { rep: 0.3, appr: 1, fac: { establishment: -2 } } },
          fail: { body: "「任务完成」的横幅被剪成此后每一段路边炸弹新闻的前奏。你赢了那三周，此后年年被这三周追问。", effects: { rep: -1.6, appr: -5, fac: { press: -8, base: -5 } } },
          critfail: { body: "宣布后第七十二小时，第一起没有补给的巡逻被炸。你当初省略的那份重建时间表，从此由士兵的阵亡通知替它填上。", effects: { rep: -2.8, appr: -9, fac: { press: -10, military: -6, base: -8 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2003-10 · 加州罢免选举：影星接管大州（机遇/规则改写）
   * ==================================================================== */
  {
    id: "ln03_recall", grade: "mid", category: "media",
    valence: "risk", dyn: true,
    minYear: 2003, maxYear: 2003, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 11, unique: true,
    medium: ["tv", "cable", "internet", "radio"], month: 10,
    title: "加州选民罢免了州长，选下一位曾演终结者的影星",
    body: "十月七日，加州完成史上第二次州长罢免：选票上一百三十五个名字，赢的那个从没当过任何公职——他只是在电视上说过「把政府从我们身上挪开」。\n" +
      "本地晚报的社论问：这是闹剧，还是预兆？党部定调「偶然事件」，可你昨夜想了半宿：这要真是信号，信号是说给谁听的。",
    brief: {
      lede: "别人家的马戏刚刚在你这行的门口搭台。当笑话看，还是当预兆学？",
      known: [
        "罢免能成，是因为财政窟窿与电力危机把人逼急了。",
        "新科州长毫无执政履历，却有现成的影迷票仓。",
        "党部已定调「偶然事件」，你不好公开拆台。"
      ],
      rumor: [
        "有人说电台名嘴和真人秀造出了这场胜利。",
        "有人说连你这种人都能靠脸赢，州里也能。"
      ],
      unknown: [
        "名人式政治是不是要卷进你的赛道。",
        "这教训你记住，还是五年后它成常识。"
      ],
      terms: [{ k: "罢免选举", v: "选民提前投票解除民选官员的程序。" }]
    },
    choices: [
      {
        id: "study_style", text: "认真研究这套镜头打法，改自己的表达",
        note: "赌的是观众换了口味。风险：党部说你学对手那套没出息的。",
        base: 0.45, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "CUN", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你把镜头前那套短句与自嘲练成了自己的腔，本地台开始说你「像电视上的人」——这是这个季节最高的夸奖。", effects: { rep: 1.6, voters: { warm: 600 }, fac: { press: 6 } } },
          ok: { body: "你的新腔调试出来了，几个人开始因为「上镜」记住你。", effects: { rep: 0.6, voters: { warm: 200 } } },
          meh: { body: "你学了个半吊子，老派嫌你轻浮，新派嫌你端着。", effects: { rep: -0.2 } },
          fail: { body: "你模仿的痕迹被扒出来，晚间段子拿你开涮：山寨版还没上映就过气。", effects: { rep: -1.5, fac: { establishment: -6, press: -4 } } },
          critfail: { body: "一整个夏天，本地报的漫画栏都在画你学人精的样子。「他没本领，只有发型」写进了对手的传单。", effects: { rep: -2.5, fac: { press: -8, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "mock_farce", text: "把这事讲成闹剧：在讲台上把影星州长当笑话",
        note: "赌的是建制还鄙夷名人政客。风险：选民觉得你在笑话他们选的乐子。",
        base: 0.52, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "establishment", w: 0.2 }],
        outcomes: {
          crit: { body: "你的嘲讽段子在本地电台连播两周，老派与党内都认你是「说人话的明白人」。", effects: { rep: 1.2, voters: { warm: 300 }, fac: { establishment: 6 } } },
          ok: { body: "你骂得漂亮，党内点头，只是台下有些年轻面孔没跟着笑。", effects: { rep: 0.5, fac: { establishment: 3 } } },
          meh: { body: "你的段子不痛不痒，没人接，也没人记。", effects: { rep: -0.1 } },
          fail: { body: "看热闹的人不觉得自己选错了一个逗他们乐的节目。你嘲他，他记你。", effects: { rep: -1.3, fac: { base: -6 } } },
          critfail: { body: "「看不起观众口味」的帽子扣实了，对手把你嘲讽的录音剪成广告，循环播。", effects: { rep: -2.2, fac: { base: -8, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "keep_distance", text: "不下判断：只说「加州的事留给加州人」",
        note: "赌的是这阵风三个月就散。风险：散不了时，你没留下任何一句站得住的话。",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "一年后加州把烂账演成了连续剧，你当初那句「不评」被引用成「谨慎的先例」。", effects: { rep: 0.5 } },
          ok: { body: "你没说错什么。在人人抢着评论的季节，这算一种成绩。", effects: { rep: 0.25 } },
          meh: { body: "你躲过了这一轮口水，也躲过了别人的记忆。", effects: {} },
          fail: { body: "两头都觉得你「连这事都不敢吭声」，胆小的标签悄悄贴上。", effects: { rep: -0.25 } },
          critfail: { body: "你想两头不沾，可「他对什么都无所谓」被写进了一篇人物侧写的短稿。", effects: { rep: -0.5 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2003-08 · 东北部大停电：九秒钟黑掉五千万人
   * ==================================================================== */
  {
    id: "ln03_blackout", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2003, maxYear: 2003, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 11, unique: true,
    medium: ["tv", "radio", "print"], month: 8,
    title: "电网九秒连环崩溃，八州五千万人陷入黑暗",
    body: "八月十四日下午，从安大略到纽约，电网在九秒里一层层跳闸。五千万人没了电：信号灯灭了，电梯停在层间，地铁卡在隧道里，机场停飞。入夜后，人们涌上街头——第一次看见没有灯光的星星。\n" +
      "联邦的调查要几个月才有结论，可选民今晚只需要一个能打通的本机号码。那个电话，正往你这里打。",
    brief: {
      lede: "三十八小时没有电，足够证明你能管事，也足够显得没人管事。",
      known: [
        "故障源于跨州的监控系统，没人说得清谁该负责。",
        "本地避难所与供水点的求助电话已经打爆。",
        "联邦与州在互相甩锅，媒体在找「背锅的人」。"
      ],
      rumor: [
        "有人说这是新型网络攻击，联邦在瞒。",
        "有人说一天就能复电，不会有人负责。"
      ],
      unknown: [
        "这场停电将逼出一整轮能源立法。",
        "危机里越权的人，事后论功还是论罪。"
      ],
      terms: [{ k: "连环故障", v: "一点崩溃拖着相邻区域连锁断电。" }]
    },
    choices: [
      {
        id: "command", text: "自设临时指挥：协调庇护所、发电机与警消联动",
        note: "赌的是你能在没人授权时把事办成。风险：乱阵脚的画面会被重播。",
        base: 0.48, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你搭的临时调度网撑过了三十八小时，报上把你印成「黑暗里那个接线的人」，事后听证会请去当正面样本。", effects: { rep: 1.7, fac: { base: 10, establishment: 6 } } },
          ok: { body: "物资跟人都有了落点，虽然乱，但你守住了本区。", effects: { rep: 0.8, fac: { base: 4 } } },
          meh: { body: "你跑前跑后，电力在你做完之前就恢复了，像一场没观众的救火。", effects: { rep: 0.1 } },
          fail: { body: "一次重复调度把两个避难所都断了水，你从「管事的人」变成「添乱的人」。", effects: { rep: -1.6, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "黑暗里有老人等不到急救车，调查报告把你那几通电话写进了时间线。", effects: { rep: -2.6, fac: { press: -8, base: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "demand_probe", text: "抢话筒问责：逼联邦把电网监管摊开查",
        note: "赌的是民怨会站你这边。风险：联邦与电力公司一起把你记上账。",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "press", w: 0.25 }],
        outcomes: {
          crit: { body: "你在听证场外那段「九秒钟没人负责」的独白被全国转播，能源立法的头一页引用了你的名字。", effects: { rep: 1.4, attr: { INT: 2 }, fac: { press: 8, base: 5, establishment: -10 } } },
          ok: { body: "你把问责钉进了议程，虽然结论还远。", effects: { rep: 0.5, fac: { press: 3, establishment: -3 } } },
          meh: { body: "你的批评太技术，没人听得懂，也没人接。", effects: { rep: -0.3 } },
          fail: { body: "电力公司是你大金主，你逼查的正是它的监管部门，撤资的传闻开始冒头。", effects: { rep: -1.5, fac: { establishment: -8, commercial: -6 } } },
          critfail: { body: "你的追问被定性为「趁乱抹黑美国基础设施」，联邦那条线从此对你关门。", effects: { rep: -2.3, fac: { establishment: -10, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "block_watch", text: "不表态：提手电挨家巡自己这条街，先照看独居老人",
        note: "不赌。风险：做事的人不出名，风头都归了会喊话的。",
        base: 0.60, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你巡完整条街，帮十几位老人接上了亲友消息。这条街的人情账上，你的名字记在了「那种时候来了的人」那一栏。", effects: { rep: 0.6, fac: { base: 3 } } },
          ok: { body: "你做了该做的邻里活，安全、实在，也没上任何头条。", effects: { rep: 0.3 } },
          meh: { body: "你帮了能帮的，电来了，日子照旧。", effects: {} },
          fail: { body: "有人嫌你「只顾自家街面」，不像个干大事的。", effects: { rep: -0.3 } },
          critfail: { body: "你想低调做事，偏偏你这条街出了桩没人管的事故，「他在场，却没看见」传开了。", effects: { rep: -0.5 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2003-12 · 萨达姆被活捉 —— 递到嘴边的胜利糖果（boon）
   * ==================================================================== */
  {
    id: "ln03_saddam", grade: "mid", category: "foreign",
    valence: "boon", dyn: true,
    minYear: 2003, maxYear: 2003, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 11, unique: true,
    medium: ["tv", "cable", "internet", "print"], month: 12,
    title: "萨达姆被从地洞里拖出来，活捉的消息刷遍全国",
    body: "十二月十三日深夜，临时联盟当局证实：萨达姆在老家附近的一个小土洞中被抓获，胡子拉碴，没有反抗。「藏洞视频」当晚传遍全球，支持战争的首都们开了香槟，反对的人一时语塞。\n" +
      "这是开战以来最大的一颗糖果。本地电视台正在收集「地方人物的第一反应」——你符合人设，而窗口只有今晚。",
    brief: {
      lede: "举国在找人为胜利鼓掌：此刻伸手接到的是掌声，伸错姿势接住的才是尴尬。",
      known: [
        "抓捕由美军实施，功劳按级别摊给每个表态的人。",
        "媒体今晚就要「地方反应」，素材随取随用。",
        "仍有选民在问：武器没找到，这场仗图什么？"
      ],
      rumor: [
        "有人说他会受公开审判，全球直播。",
        "有人说抓人容易收场难，治安战才开头。"
      ],
      unknown: [
        "这张胜利牌是台阶还是欠条。",
        "你今晚的笑脸日后怎么被重剪。"
      ],
      terms: [{ k: "临时联盟当局", v: "战后美英在伊设立的军管机构。" }]
    },
    choices: [
      {
        id: "claim_credit", text: "高调认领：「这是路线的胜利，我们赢了」",
        note: "赌的是胜利叙事还能撑几年。风险：叙事塌时你站得最近。",
        base: 0.50, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "military", w: 0.25 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你的庆贺词被全国台引用，「坚决支持这场战争」的名单把你排在了前排——此刻这是最值钱的排队。", effects: { rep: 1.8, fac: { establishment: 4, military: 6, base: 6 } } },
          ok: { body: "你痛快鼓掌了，党内的电话当晚就多起来。", effects: { rep: 1.0, fac: { establishment: 3 } } },
          meh: { body: "你说了祝贺，风头都是名字更大的替这仗代言的人。", effects: { rep: 0.4 } },
          fail: { body: "你的欢呼被剪进对手的嘲讽素材，但没人能证明你说过一句错话。", effects: { rep: 0.1 } },
          critfail: { body: "「他为此仗鼓的掌」上了黑名单，但黑名单此刻还不算数。", effects: {} }
        }
      },
      {
        id: "pivot_rebuild", text: "把话题拧向重建：订单、岗位、回家的路",
        note: "赌的是战争股能转成生意股。风险：两头都嫌你眼里只有钱。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "commercial", w: 0.3 }],
        outcomes: {
          crit: { body: "你把「抓到他了，然后修什么」讲成了本地工程界的请战书，重建承包商与退伍军人就业项目都记住了你。", effects: { rep: 1.4, fun: 2.5, fac: { commercial: 6 } } },
          ok: { body: "你搭上了重建话语的顺风，本地合同桌上有了你的名字。", effects: { rep: 0.7, fun: 1.0 } },
          meh: { body: "你的生意经讲得太早，全国的节目单上只有那个地洞。", effects: { rep: 0.3 } },
          fail: { body: "你的务实没换来骂，也没换来钱——只是这晚没人想听。", effects: { rep: 0.15 } },
          critfail: { body: "订单被更大的名字截走，你只分到一句「他很会赶时髦」。", effects: {} }
        }
      },
      {
        id: "send_congrats", text: "只发一句祝贺，不扩写、不预测",
        note: "不赌。风险：这种夜晚，安静的人不被骂，也不被想起。",
        base: 0.70, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你那句「愿这场抓捕换来和平」成了几周里唯一被两边都引用的话。", effects: { rep: 0.6 } },
          ok: { body: "你道了贺，安全、体面、没有下文。", effects: { rep: 0.2 } },
          meh: { body: "你发了一句，淹没在几百句里。", effects: { rep: 0.1 } },
          fail: { body: "当晚没人注意到你——这总好过被注意到。", effects: {} },
          critfail: { body: "你的谨慎既没加分也没扣分，历史今晚不给你留座。", effects: {} }
        }
      }
    ]
  },

  /* ======================================================================
   * 2004-04 · 阿布格莱布虐俘照片曝光（major · bane）
   * ==================================================================== */
  {
    id: "ln04_abu", grade: "major", category: "scandal",
    valence: "bane", dyn: true,
    minYear: 2004, maxYear: 2004, scoped: true, tierRaw: true, tierMin: 1, tierMax: 6, weight: 14, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 4,
    title: "阿布格莱布监狱的虐俘照片登出，全国作呕",
    body: "人塔、头套、吊在电线上的裸身囚犯、咧嘴的军犬——照片右下角的说明写着：伊拉克，阿布格莱布，美军管理的监狱。\n" +
      "白宫把这说成「几颗烂苹果」。可全国都算得过来账：几颗苹果，拍不出几百张照片。记者堵在你门口的提纲只有一个问题：你是震惊，还是不意外。",
    brief: {
      lede: "让全国作呕的照片，正逼你回答一个你躲了一年的问题。",
      known: [
        "照片是真的，调查已指向监狱管理层。",
        "「烂苹果」是既定口径：复读安全，质疑犯险。",
        "本地的军人家庭与被怀疑的族裔社区都在等你开口。"
      ],
      rumor: [
        "有人供称有些审讯法是上面批准的。",
        "有人说这新闻一周内就会被盖掉。"
      ],
      unknown: [
        "这把火烧不烧得到决策层。",
        "你今晚这句话会成为你的标签。"
      ],
      terms: [{ k: "阿布格莱布", v: "巴格达西侧监狱，2004 年虐俘丑闻曝光。" }]
    },
    choices: [
      {
        id: "name_it", text: "点名定罪：这不是烂苹果，是链条失守",
        note: "赌的是事后清算站在你这边。风险：当下这顶「抹黑美军」的帽子很沉。",
        base: 0.42, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "数月后听证层层上收，你那句「链条失守」被引用成「当时少数敢讲的」。媒体、教会与反战选民都记了你这一笔。", effects: { rep: 1.8, fac: { press: 8, base: 6, church: 5, military: -8, establishment: -6 } } },
          ok: { body: "你说了重话，挨了骂，也在某份「先醒者」名单上占了一行。", effects: { rep: 0.7, fac: { press: 3, military: -3 } } },
          meh: { body: "你的谴责淹没在辩论节目里，没人引用，也没人追责。", effects: { rep: -0.2 } },
          fail: { body: "「他在这个月羞辱自己的军队」被做成传单，发在征兵办公室门口。", effects: { rep: -1.6, fac: { military: -8, establishment: -5 } } },
          critfail: { body: "军方家属团体联手发难，你的办公室门口开始有人举你的照片烧。", effects: { rep: -2.6, fac: { military: -10, establishment: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "bad_apples", text: "咬死口径：严惩个人，但别怀疑任务本身",
        note: "赌的是建制护短护得住。风险：照片会腐烂，引用你的句子不会。",
        base: 0.48, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "military", w: 0.3 }],
        outcomes: {
          crit: { body: "你的口径在保守阵营被当范本转发，军工与建制当场把你划进「可堪大用」那一栏。", effects: { rep: 1.4, fac: { military: 10, establishment: 6, base: -4 } } },
          ok: { body: "你复读了口径，安全、无趣、上面满意。", effects: { rep: 0.6, fac: { military: 5, establishment: 3 } } },
          meh: { body: "你的表态四平八稳，稳到没人复述。", effects: {} },
          fail: { body: "新一批照片在夏天曝出，你四月的「烂苹果」论被翻出来，配上新的画面。", effects: { rep: -1.5, fac: { press: -6, base: -4 } } },
          critfail: { body: "调查指向上层授权，而你当初那句「只是个人」成了「知情粉饰」的现成证据。", effects: { rep: -2.5, fac: { press: -8, base: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "visit_families", text: "不接这个话头：去探望部署归来的兵和家属",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        note: "不赌。风险：躲过的问题，都会在选举年找上门。",
        outcomes: {
          crit: { body: "照片风波最凶的那两周，你一直在病房与家属院里。没人因为你没上电视而怪你。", effects: { rep: 0.6, fac: { base: 2, church: 2 } } },
          ok: { body: "你做了安静而正确的事，没沾上任何一句会被重播的话。", effects: { rep: 0.3 } },
          meh: { body: "你没说错话，也没留下话。", effects: {} },
          fail: { body: "有记者问你对照片事件的意见，你答「无可奉告」，稿子把你写成「回避的人」。", effects: { rep: -0.2 } },
          critfail: { body: "「无可奉告」四个字被两头各自放大，你的照片事件立场至今成谜。", effects: { rep: -0.4 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2004-11 · 2004 大选：以县为界被劈开的国家
   * ==================================================================== */
  {
    id: "ln04_election", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 2004, maxYear: 2004, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "radio", "internet"], month: 11,
    title: "2004 大选开票到凌晨，一张红蓝地图把国家对折",
    body: "战争、就业、价值观、谁更像个总统——两张竞选班子把全国犁成两块。开票到凌晨，俄亥俄的县数只差一点点，出口民调把选区图染成一张红蓝拼贴画，两边都宣布这四年属于自己。\n" +
      "全国级别的操盘手都到了你这片选区。对你这层人，问题从来不是要不要下场——你不下场，也会有人抬着你下场当道具。",
    brief: {
      lede: "国家倾斜的时候，你这层的人是赌盘上最便宜的筹码。",
      known: [
        "两边的党部都开了价：要你替谁讲、替谁站台。",
        "伊拉克议题是断层线，站哪边就吃哪边的饭。",
        "很清楚：两边的好处你拿不到双份。"
      ],
      rumor: [
        "有人说某个大城市的计票风波会定俄亥俄。",
        "有人说押中这次边，下次划分选区就有你。"
      ],
      unknown: [
        "险胜会很快变成跛脚任期。",
        "替你押注的人账上记的是你的名字。"
      ],
      terms: [
        { k: "摇摆州", v: "两党无稳拿、大选逐票争夺的州。" },
        { k: "红州蓝州", v: "按共和党、民主党得势划色的州。" }
      ]
    },
    choices: [
      {
        id: "all_in", text: "押一边打到底：出钱买广告、替它跑地面动员",
        note: "赌的是赢家记得谁掏过本。风险：钱与名字一起挂在输赢上。",
        base: 0.50, mods: [{ src: "fac", key: "establishment", w: 0.3 }, { src: "attr", key: "CUN", w: 0.2 }],
        cost: { fun: 3 },
        outcomes: {
          crit: { body: "你押的一边赢了，且赢得险——险胜的账本上，每一笔雪中送炭都有编号。新班子里有人主动替你开门。", effects: { rep: 1.5, tier: 1, fac: { establishment: 12, base: 4 } } },
          ok: { body: "你随队押赢了，分席时你的名字排在中段。", effects: { rep: 0.7, fac: { establishment: 6 } } },
          meh: { body: "钱花了，劲使了，庆功电话却没打到你这里。", effects: { rep: 0.1 } },
          fail: { body: "你押的一边输了，出资与站台记录被对手裱进广告，配着败选的凌晨。", effects: { rep: -1.4, fac: { establishment: -5, base: -4 } } },
          critfail: { body: "败选清算里，你是本地「最激进的那笔钱」。两党的中间派今晚起都与你保持距离。", effects: { rep: -2.4, fac: { establishment: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "play_both", text: "两头下注：给两边各递一份人情，谁赢都不欠",
        note: "赌的是机器换人不换账本。风险：两头查账的人凑一块时。",
        base: 0.42, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "哪边都没赢到清算你的心情，两边都还留着你那半份情面。你成了「换谁当家都办事」的人。", effects: { rep: 1.2, lev: 1, fac: { establishment: 5 } } },
          ok: { body: "你两头都留了后手，混了个脸熟与安全。", effects: { rep: 0.4, fac: { establishment: 2 } } },
          meh: { body: "两头都收了你的好处，两头都没把你当自己人。", effects: { rep: -0.3 } },
          fail: { body: "有人翻出你两边递话的记录，「两头下注」被印上传单，正好配着你想要的那个提名。", effects: { rep: -1.5, fac: { establishment: -8, base: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "两家的机器各自把你从名单上划了去，还互相知会了一声。", effects: { rep: -2.4, fac: { establishment: -6, press: -6 }, flags: ["investigation_open"] } }
        }
      },
      {
        id: "own_race", text: "谁的名字都不替：只安安静静打自己的选",
        note: "不赌全国。风险：浪潮翻过去时，船上没有你的位置。",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "全国乱成一锅粥，你把自己那摊事做扎实，本地票仓反而没人来抢。", effects: { rep: 0.7 } },
          ok: { body: "你没欠下任何人情，也没多欠一分喧嚣。", effects: { rep: 0.3 } },
          meh: { body: "大选的烟花跟你无关，第二天照常上班。", effects: {} },
          fail: { body: "新班子论功行赏时发现你的名字不在任何一份出力名单上。", effects: { rep: -0.3 } },
          critfail: { body: "「关键时刻不站队」被读成对哪边都不忠诚，两边顺手都晾着你。", effects: { rep: -0.6, fac: { establishment: -2 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2005-08 · 卡特里娜飓风与新奥尔良溃堤 —— 本带最高优先级（已做层级分层）
   *   存量四选项按档归位：底（自救）= 热线与车队、中（表态/执行）= 直播点名与
   *   程序搬资源；另补两条高段（T7—9 决策/担当），全卡收成 2/2/2。
   * ==================================================================== */
  {
    id: "ln05_katrina", grade: "major", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2005, maxYear: 2005, scoped: true, tierRaw: true, tierMin: 0, weight: 14, unique: true,
    medium: ["tv", "cable", "radio", "internet", "print"], month: 8,
    title: "卡特里娜袭击新奥尔良，堤坝决口，城市沉入水下",
    body: "八月二十九日凌晨，风眼登陆；午后堤坝接连决口，八成城市没入水下。超级穹顶体育馆和会展中心成了最后的孤岛：没有胰岛素的老人、抱婴儿排队的女人、等不来救援大巴的居民、等不来冰的遗体。\n" +
      "联邦救灾署长在镜头前说系统「已经就绪」，几天后又改口「我们确实被搞了一把」。联邦、州、市三级互相甩锅，甩了不止一个星期。水落下去之前，全国的电视都在等一个管事的人——任何一级都行。",
    brief: {
      lede: "水漫到二楼时，电话能拨通的只有真办事的那个号码。",
      known: [
        "堤坝是联邦承诺的护城方案，它垮了。",
        "联邦救灾署动作迟缓，地方已在公开抱怨。",
        "你辖区有成千选民还在避难所与撤离途中。"
      ],
      rumor: [
        "有人说救灾物资就锁在国民警卫队看守的仓里。",
        "有人说工程师早就警告过堤坝扛不住这场风。"
      ],
      unknown: [
        "这场失灵会成行政史的判例。",
        "那几天谁在管事，谁躲着。"
      ],
      terms: [
        { k: "FEMA", v: "联邦统筹灾害救助的机构。" },
        { k: "堤坝", v: "挡河护城的堤防，溃堤是淹城主因。" }
      ]
    },
    choices: [
      {
        id: "confront", text: "直播镜头前点名联邦救灾失灵，逼驻军与联邦资源立刻下来",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        note: "赌的是观众站在溺水的人那边。风险：甩锅者先把你变成锅。",
        base: 0.44, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "press", w: 0.25 }],
        outcomes: {
          crit: { body: "你那句「这里现在就需要军队」被全国台重播一周，成为灾后问责的旗帜。听证会的主角席第一次是地方上的人。", effects: { rep: 2.0, fac: { press: 10, base: 10, church: 5, agency: -12, establishment: -8 } } },
          ok: { body: "你的喊话逼出了部分资源，也得罪了整条审批链。", effects: { rep: 0.9, fac: { press: 4, base: 4, agency: -3 } } },
          meh: { body: "你上了电视，镜头却先给了水。", effects: { rep: -0.3, fac: { establishment: -3 } } },
          fail: { body: "联邦反手把你的喊话归为「地方不配合统筹」，协调权开始绕着你走。", effects: { rep: -1.8, fac: { establishment: -8, agency: -6 } } },
          critfail: { body: "「他趁灾抹黑联邦救灾」的定调下发，你成了内部审查的第一个样本。", effects: { rep: -2.8, fac: { agency: -10, establishment: -8 }, flags: ["scandal_1", "investigation_open"] } }
        }
      },
      {
        id: "convoy", text: "自掏腰包组织车队：跨州借大巴飞机，先把人出来",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        note: "赌的是办成事不需要谁批准。风险：钱与命都压在你一个人的决定上。",
        base: 0.52, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "base", w: 0.25 }],
        cost: { fun: 1 },
        outcomes: {
          crit: { body: "你的车队跑通了别人以为跑不通的线路。后来的灾后报告里，你的名字和「先动起来的那批人」写在一起。", effects: { rep: 1.7, attr: { INT: 2 }, fac: { base: 8, establishment: 6 } } },
          ok: { body: "人出来了大半，程序问题留给以后的听证会吵。", effects: { rep: 0.8, fac: { base: 4 } } },
          meh: { body: "你的车队跑了几趟，油钱贴了不少，规模却没跑过大队伍。", effects: { rep: 0.1 } },
          fail: { body: "一次调度失误让一车人在中转站困了二十小时，投诉电话打进了你的办公室。", effects: { rep: -1.4, fac: { base: -4 } } },
          critfail: { body: "一车老人没能等到医院，账单与追问一起寄到你桌上。", effects: { rep: -2.4, fac: { press: -6, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "work_channels", text: "一句狠话不说：在拨款与审批程序里熬夜搬资源",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        note: "赌的是程序也认得会哭会磨的人。风险：没人知道你搬了多少。",
        base: 0.47, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "agency", w: 0.2 }],
        outcomes: {
          crit: { body: "你熬走了三个联邦经办人，签下了别人以为签不下来的安置指标。事后记者来挖「谁在这几天里干了好事」，差点绕开了你。", effects: { rep: 1.2, fac: { agency: 6, establishment: 5 } } },
          ok: { body: "资源一点点渗进来，你攒下的全是查不到、也忘不掉的账。", effects: { rep: 0.5, fac: { establishment: 3 } } },
          meh: { body: "你磨了一礼拜，批下来的还没烧掉的多。", effects: {} },
          fail: { body: "你替联邦程序挡了民意，民意回头把你归进了那一头。", effects: { rep: -1.3, fac: { press: -5, base: -3 } } },
          critfail: { body: "「他一直在里面帮忙把事按住」——这话从灾后第三天起，一直在你背后传。", effects: { rep: -2.2, fac: { base: -8, press: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "hotline", text: "只接一个电话：搭寻亲热线，帮邻里临时安置",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        note: "不赌。风险：你照看的是眼前的人，风头都归了喊话的人。",
        base: 0.60, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你的热线接通了几百个家庭。名单不显眼，可那些名字此后每轮选举都替你投票。", effects: { rep: 0.6, fac: { base: 3 } } },
          ok: { body: "你做了最基层的联络活，没人夸，也没人挑出毛病。", effects: { rep: 0.3 } },
          meh: { body: "你接了很多电话，帮了很多具体的小忙，没人记得。", effects: {} },
          fail: { body: "热线占线太多，有个家庭没能联系上亲人，投诉归到了「服务不利」那一栏。", effects: { rep: -0.25 } },
          critfail: { body: "「他在灾后只来得及接电话」被对手讲成了一个小时的段子。", effects: { rep: -0.5 } }
        }
      },
      {
        id: "take_command", text: "请缨接管联邦协调：把三级甩锅收成一个指挥链，出了事你负责",
        when: { tierRaw: true, tierMin: 7 },
        note: "把别人不敢接的锅接过来。办成了是果断，办砸了你就是这场失灵的最后负责人。",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "military", w: 0.25 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你接手的指挥链在七十二小时里把大巴、冰和药品跑通了。事后复盘把那几天单独立成一章，标题是「终于有人负责」。", effects: { rep: 2.2, attr: { INT: 2 }, voters: { warm: 400 }, fac: { military: 8, establishment: 6, base: 5, agency: -4 } } },
          ok: { body: "协调权归了你，乱局没能全止住，但救援确实快了一拍。各级都松了口气，也都记了你一笔。", effects: { rep: 0.9, fac: { establishment: 4, military: 3 } } },
          meh: { body: "你接到的只是个「协调」名分，各机关照旧各跑各的。", effects: { rep: -0.2, fac: { agency: -3 } } },
          fail: { body: "一条调令慢了半拍，一处避难所多撑了一夜。问责名单的头一个名字是你。", effects: { rep: -2.0, fac: { press: -6, establishment: -5 } } },
          critfail: { body: "你签发的一道调度把一支救援队送错了街区，他们被困的水位比谁都深。这场灾最后姓了你的姓。", effects: { rep: -3.0, fac: { base: -8, press: -8, agency: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "rebuild_bill", text: "推联邦重建与堤坝问责捆绑立法：钱和审计一起到，签字的人上听证席",
        when: { tierRaw: true, tierMin: 7 },
        note: "把救急钱和查责任捆成一张纸。工程界欢迎你，整条审批链恨你。",
        base: 0.48, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "establishment", w: 0.25 }],
        cost: { fun: 1.5 },
        outcomes: {
          crit: { body: "案子过了：重建拨款与堤坝审计同文本生效，工程问责第一次写进联邦条文。你那句「先查坝、再修城」成了党纲里的话。", effects: { rep: 1.8, fun: -1, voters: { warm: 300 }, fac: { establishment: 6, base: 6, press: 4, agency: -5 } } },
          ok: { body: "钱批下来了，审计条款被砍剩骨架。城市开始复工，你的名字在提案人一栏。", effects: { rep: 0.7, fun: -1.5, fac: { establishment: 4, base: 2 } } },
          meh: { body: "拨款过了，问责被并进了别的案子。你那份文本躺进了档案。", effects: { rep: 0.1, fun: -2 } },
          fail: { body: "捆绑条款被骂「趁灾要权」，案子卡在委员会里，连金主都嫌你多事。", effects: { rep: -1.6, fun: -2, fac: { establishment: -5, press: -4 } } },
          critfail: { body: "有人翻出你连任捐款里有承建商的钱，「他修坝是为自己的票」坐成了头条。", effects: { rep: -2.6, fun: -2, fac: { press: -8, base: -5, establishment: -5 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2006-11 · 中期选举：把国会递给对面的一股浪
   * ==================================================================== */
  {
    id: "ln06_wave", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2006, maxYear: 2006, scoped: true, tierRaw: true, tierMin: 1, tierMax: 6, weight: 11, unique: true,
    medium: ["tv", "cable", "radio", "internet", "print"], month: 11,
    title: "2006 中期选举：在任党惨败，国会多数党一夜换人",
    body: "那场被保证「会结束这场战争」的战争，成了没完的那场；游说公司的腐败案一桩接一桩。开票夜，对面拿下众院、在参院也净增席位，获胜演说里都是同一个词：「改变」。\n" +
      "败的一方当夜就开始换马。电话来自两拨人：一拨在数「谁早就说过不行」，一拨想把你这样的「还能说话的人」递到新多数党的门前——新议长办公室正在要一份可接触名单。",
    brief: {
      lede: "浪翻过来了。此刻的问题不是站哪边，是倒戈多快才不像叛徒。",
      known: [
        "战争与腐败议题把在任党的支持率埋进了土里。",
        "新多数党团在点名，早到早进名单。",
        "你的旧阵营还在气头上，记得你说过的每个字。"
      ],
      rumor: [
        "有人说新班底开议前就把位子排完了。",
        "有人说这股浪只是情绪，中期浪向来如此。"
      ],
      unknown: [
        "早倒戈是远见还是运气。",
        "两头账上的你的名字都加厚了。"
      ],
      terms: [
        { k: "中期选举", v: "总统任期过半时举行的国会改选。" },
        { k: "浪派选举", v: "一股单向浪潮带走大批席位。" }
      ]
    },
    choices: [
      {
        id: "early_turn", text: "抢在开票夜与败方切割：喊出「需要新路线」",
        note: "赌的是浪不会退。风险：新主嫌你来得晚、来得太急。",
        base: 0.48, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "base", w: 0.2 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你成了「原阵营里第一个看清形势的人」，新多数党开门迎接，基层选民也觉得你说了他们的话。", effects: { rep: 1.5, voters: { warm: 500 }, fac: { base: 8, establishment: -6 } } },
          ok: { body: "你及时换了旗，旧同僚没当场点你，新同僚还没空查你。", effects: { rep: 0.6, fac: { base: 4, establishment: -3 } } },
          meh: { body: "你切割了，可比你快的人已经在排新位子的座次。", effects: { rep: -0.2 } },
          fail: { body: "旧阵营记下了你开票夜那句话，新阵营只当你是投机。两头都不带你的份。", effects: { rep: -1.4, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "两拨人马合流办你：一个两头下注还下砸了的投机客。", effects: { rep: -2.2, fac: { press: -4, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "stand_loyal", text: "留守败方：替旧队收拢残部，让人记住你的忠",
        note: "赌的是输家也会翻身。风险：翻不了身，你就陪葬。",
        base: 0.44, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "establishment", w: 0.3 }],
        outcomes: {
          crit: { body: "败夜里你组织的守夜把人心拢住了。两年后党内重建，第一批核心位置留给了「那种晚上没走的人」。", effects: { rep: 1.3, fac: { establishment: 10, military: 4 }, flags: ["loyal"] } },
          ok: { body: "你守了夜，党内的账本上，你的名字用红笔圈过。", effects: { rep: 0.5, fac: { establishment: 5 } } },
          meh: { body: "你忠诚，可忠诚在败选夜不值钱。", effects: { rep: -0.1 } },
          fail: { body: "你替一艘漏水的船喊冤，岸上的人只看见你和水一起沉。", effects: { rep: -1.5, fac: { base: -6, establishment: -4 } } },
          critfail: { body: "清算名单上你以「最忠诚的一档」入选，新多数党顺手把你立成了反面样板。", effects: { rep: -2.4, fac: { press: -6, base: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "local_only", text: "不接全国的浪：只把自己那摊地方事务办扎实",
        note: "不赌。风险：浪里换的全是管全国的人，与你无关的人先出局。",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "换党如换季的年月，你这块「只办事」的招牌反倒成了两边都肯用的接口。", effects: { rep: 0.6, fac: { base: 2 } } },
          ok: { body: "你躲过了清算也躲过了红利，本地一切如常。", effects: { rep: 0.3 } },
          meh: { body: "全国的座位重排，没有一处需要问你。", effects: {} },
          fail: { body: "两边都默认你「不属于任何人」，需要人站出来的位置自然也没你的。", effects: { rep: -0.3 } },
          critfail: { body: "「关键时刻他只顾自家门口」——这句评语出现在两边的内部评估里，措辞一模一样。", effects: { rep: -0.5 } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 世界线 · 2003—2006：本带每年的压力 / 全国情绪 / 当年真实存在的媒体口径。
 *   （core.js 按字段深合并，不动 21-worldline.js 的 1980—1990 基线。）
 * ==========================================================================*/
POTUS.define("worldline", {
  pressure: {
    "2003": 5,   // 开战与占领开局、停电、罢免、萨达姆落网——一年塞满三场国运题
    "2004": 4,   // 虐俘曝光、大选险胜：国家在电视里被劈成两半
    "2005": 6,   // 卡特里娜与联邦救灾失灵：本带峰值，信任随水退去
    "2006": 4    // 战争账单到期、中期浪翻盘：华盛顿换了一屋子人
  },
  brief: {
    "2003": "速胜与漫长的占领共用同一本日历：全国刚想开庆祝会，就隐约觉得这会开得早了点。",
    "2004": "国家沿着一条断层线对折：红与蓝、教堂与酒吧、胜利与泥潭——同一台电视，两套现实。",
    "2005": "水来了、堤垮了、救援迟了。全国第一次在直播里看见政府没有敲开自己公民的门。",
    "2006": "战争账单到期，选民终于找到了收银台。「改变」这个词，一夜之间同时在两党嘴里变值钱。"
  },
  outlets: {
    "2003": ["纽约时报", "华盛顿邮报", "今日美国", "有线电视新闻网", "哥伦比亚广播公司", "全国广播"],
    "2004": ["华尔街日报", "今日美国", "有线电视新闻网", "美国广播", "新闻周刊"],
    "2005": ["纽约时报", "今日美国", "有线电视新闻网", "哥伦比亚广播公司", "赫芬顿邮报"],
    "2006": ["华尔街日报", "华盛顿邮报", "今日美国", "有线电视新闻网", "美国广播", "赫芬顿邮报"]
  }
});

/* ============================================================================
 * 定点锚：8 张新卡 + 复用存量卡（wt03_wmd 开战背书 / wt02_patriot 爱国者法执行 /
 * wt02_alert 色彩警报——都只钉不重写）。major 4 / 11 ≈ 1/3。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "wt03_wmd", year: 2003, month: 3, grade: "mid" },        // 复用：开战理由与地方背书
  { event: "ln03_war", year: 2003, month: 5, grade: "major" },
  { event: "ln03_blackout", year: 2003, month: 8, grade: "mid" },
  { event: "ln03_recall", year: 2003, month: 10, grade: "mid" },
  { event: "ln03_saddam", year: 2003, month: 12, grade: "mid" },
  { event: "wt02_alert", year: 2004, month: 6, grade: "minor" },    // 复用：色彩警报的常态化
  { event: "ln04_abu", year: 2004, month: 4, grade: "major" },
  { event: "ln04_election", year: 2004, month: 11, grade: "major" },
  { event: "wt02_patriot", year: 2005, month: 2, grade: "mid" },    // 复用：爱国者法续案期的地方执行
  { event: "ln05_katrina", year: 2005, month: 8, grade: "major" },
  { event: "ln06_wave", year: 2006, month: 11, grade: "mid" }
]);
