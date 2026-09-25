/* ============================================================================
 * CONTENT · 80-shady.js
 * 【灰产线】不靠党内机器，靠"别人不敢说的事"往上走的那条路。
 *
 * 这条线的三条规则（写在这个文件的每个事件里）：
 *   1) 钱来得快，但每一笔钱都在某人手里留下一个可以随时打开的抽屉 ——
 *      所以灰色选项赚的是 资金 和 把柄（lev），而不是声望。
 *   2) 把柄不能囤。手里攥着三份以上，你自己就变成了别人的目标（引擎会自动抬高活跃度），
 *      而且每年都会有几份因为当事人下台而失效。
 *   3) 每一次"单次生效"都只能用一次。做过一次，你就是"那个人"了，路就变了。
 *
 * 这条线与正经政治路线的差别不是"更赚"，而是"更脏、更快、更不可逆"。
 * 主线事件的保底选项永远留着 —— 你可以一辈子不碰这里，游戏照样能通关。
 * ==========================================================================*/

const SHADY_ERAS = Object.keys(POTUS.reg.era);

/* 写结果的写法糖：五档各一行，读起来像剧本而不是 JSON。 */
function out(body, effects) { return { body: body, effects: effects || {} }; }

POTUS.define("event", [

  /* ==========================================================================
   * 1) 单次生效 —— 那条只容一个人走一次的路
   * ======================================================================== */
  {
    id: "shady_oneshot", era: SHADY_ERAS, tierMin: 0, tierMax: 4, weight: 11,
    grade: "mid", valence: "risk", dyn: true, category: "shady",
    title: "你做起一桩只能做一次的快钱生意",
    body: "你花两个下午摸清一件事：城里想往上爬的年轻人都要同一样东西，却找不到地方买。你找到了货源。\n" +
      "麻烦在于这种生意只能做成一次——做第二次，你就从「碰巧能办到的人」变成了「干这行的人」。",
    brief: {
      lede: "有一条路只容一个人走一次。走完就得换一条。",
      known: [
        "你知道哪几所学校的学生最付得起钱，也知道谁在管那件东西。",
        "你手上有一下午、一辆借来的车，和一个不算钱的本金。",
        "中间人愿意带货，但要你先付钱——他不相信生面孔。",
        "这个市镇里认识你脸的人还很少。这是你现在唯一的优势。"
      ],
      rumor: [
        "有人说上月有人做过一样的事，被学校记下了名字。",
        "有人说赚钱的不是货，是知道谁需要这件事。"
      ],
      unknown: [
        "哪一天会有人开始问「他凭什么能办到」。",
        "路的尽头是一杯酒，还是一张传票。"
      ],
      terms: [
        { k: "单次生效", v: "只做一次、不留痕迹。第二次就不成立。" },
        { k: "本金", v: "你得先垫钱。灰色生意没账期也没合同。" }
      ]
    },
    choices: [
      {
        id: "push", text: "赶在别人之前把这一票做满（压上全部本金）",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "attr", key: "CHA", w: 0.3 }],
        cost: { fun: 0.8 }, stake: { fun: true },
        outcomes: {
          /* 回报按比例（funMul）——押多少赚多少百分比，投注加码进来的钱同样吃倍数 */
          crit: out("一个下午，本金翻了三倍。走之前你还顺手把那张写满学生名字的收据揣进了口袋——不是为了用，是为了万一。",
            { funMul: 2.0, rep: 0.4, lev: 1, fac: { base: 5 }, flags: ["shady_start"] }),
          ok: out("钱到手了，比你想的多。你数钱的时候手有点抖，不是因为怕，是因为快。",
            { funMul: 0.8, fac: { base: 3 }, flags: ["shady_start"] }),
          meh: out("货出了一半，另一半砸在手里。白忙一场——钱没少，觉没了。",
            { funMul: 0.2, fac: { base: 1 } }),
          fail: out("有个家伙拿了货不给钱，还带走了你的名字。本金进了水。",
            { funMul: -0.6, rep: -0.6, fac: { base: -5 }, flags: ["shady_start"] }),
          critfail: out("学校保安记下了车牌。你没被起诉，但那辆车的登记人是你哥。货和本钱一起没了。",
            { funMul: -1.0, rep: -1.25, fac: { base: -8, press: -5 }, flags: ["scandal_1", "sold_brother"] })
        }
      },
      {
        id: "small", text: "只做小份，慢慢试水温",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        cost: { fun: 0.2 }, stake: {},
        outcomes: {
          crit: out("量小，但每一单都干净。你没有变成「那个人」，只是变成了一个「有点门路的人」。",
            { funMul: 1.5, lev: 1, fac: { base: 4 }, flags: ["shady_start"] }),
          ok: out("赚得不多，学到的比赚到的多。你知道下一次该找谁。",
            { funMul: 0.6, fac: { base: 2 }, flags: ["shady_start"] }),
          meh: out("跑了三天，跑出一点零钱。至少你摸清了门在哪。",
            { funMul: 0.15 }),
          fail: out("小份的东西没人要。有钱的学生嫌少，没钱的还是没钱。",
            { funMul: -0.5, rep: -0.2 }),
          critfail: out("你找错了人。对方拿了样品，转头照着你说的做了一遍，还做得比你快。",
            { funMul: -0.9, rep: -0.6, fac: { commercial: -5 } })
        }
      },
      {
        id: "pass", text: "不做这笔，去老老实实打工",
        base: 0.8, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: out("暑假结束时你手上有一笔小钱，还有一整套对这座城市的了解——哪个社区的教堂最有钱，哪家店在给谁交钱。这些以后都有用。",
            { fun: 0.2, rep: 0.4, fac: { base: 5, labor: 5 }, contact: { fixer: 8 } }),
          ok: out("四周的工钱，一分不多一分不少。你没赚到快钱，但你也没欠任何人。",
            { fun: 0.1, rep: 0.2 }),
          meh: out("工头拖了两周工钱。你学到了第一课：老实人也会被欠钱。",
            { fun: 0.1, fac: { labor: -3 } }),
          fail: out("干了一个月，身体累坏了，钱没剩几个。",
            { fun: 0.1 }),
          critfail: out("你在流水线上伤了手，医药费自己付，工头说这是你自己不小心。",
            { fun: -0.1, fac: { labor: -6 } })
        }
      }
    ]
  },

  /* ==========================================================================
   * 2) 社区里的钱庄 —— 借钱的成本不是利息，是"关系"
   * ======================================================================== */
  {
    id: "shady_shark", era: SHADY_ERAS, tierMin: 0, tierMax: 5, weight: 10,
    grade: "minor", valence: "risk", dyn: true, category: "shady",
    title: "你到社区里的钱庄借一笔钱",
    body: "社区里有个做皮具生意的人，私下也放贷。他不签合同——在这个社区，靠的是熟人和面子，赖账的比签字的少。\n" +
      "你缺钱，来找他。他头也不抬，只问两句：借多少、什么时候还。这两句之间，没有第三句客气的余地。",
    brief: {
      lede: "利息写在嘴上。所以真正贵的是你答应他的那一刻。",
      known: [
        "他只借给同一个社区的人，而且从不催熟人。",
        "他的利息比银行高得多，但比银行快得多、也安静得多。",
        "他记性好得可怕，说得清十年前谁在哪个下午还了多少钱。",
        "他还认识一些你不认识的人——这是他另一个更有用的用途。"
      ],
      rumor: [
        "有人说他上面的那一层，才是真正在放钱的人。",
        "在他那借钱，等于在不会忘事的人面前低头。"
      ],
      unknown: [
        "他到底替谁管这笔账。",
        "你若还不上，他先找你还是先找你哥哥。"
      ],
      terms: [
        { k: "短期拆借", v: "只借几周。利息按次不算月，越短越贵。" },
        { k: "人情担保", v: "不要抵押物，要一个肯为你说话的人。" }
      ]
    },
    choices: [
      {
        id: "borrow_big", text: "借一笔大的，够撑一整年",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        req: { rep: 2 }, stake: { fun: true, fav: true },
        outcomes: {
          crit: out("他把钱推过来，还多加了两成：「你这个人我看了很久，值得多押一点。」你第一次意识到，被信任是有价格的。",
            { fun: 29, contact: { shark: 16 }, fac: { commercial: 6 } }),
          ok: out("钱到手了，说好了秋天还。你们握了手，事情就这么定了。",
            { fun: 18, contact: { shark: 8 }, flags: ["owes_shark"] }),
          meh: out("他给了钱，但少了两成，说「你现在还不值这个数」。这句话你要记很久。",
            { fun: 10, contact: { shark: 2 }, flags: ["owes_shark"] }),
          fail: out("他笑着拒绝了：「我借钱给有把握的人，你现在不像。」你从他店里走出去的时候，觉得自己矮了一截。",
            { rep: -1.25, contact: { shark: -6 } }),
          critfail: out("他借了，但让你在收据上按了个手印，还让旁边的人看了一眼。你成了这条街上「有账在身」的人。",
            { fun: 8, rep: -2, contact: { shark: 4 }, flags: ["owes_shark", "compromised"] })
        }
      },
      {
        id: "borrow_small", text: "只借周转的零头，当天还清",
        base: 0.72, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: out("当天还清，还多给了一点。他点点头说：「规矩人。」在这个社区里，这三个字能当钱用。",
            { fun: 2.75, contact: { shark: 12 }, rep: 0.4 }),
          ok: out("借了，还了，谁也没多说话。你在他那里有了第一条记录。",
            { fun: 1.25, contact: { shark: 6 } }),
          meh: out("凑钱的那两天你几乎没睡。钱还上了，人也垮了。",
            { fun: 0.7, contact: { shark: 4 } }),
          fail: out("你迟到了一天。他没说什么，只是把利息改了。",
            { fun: -0.4, contact: { shark: -3 } }),
          critfail: out("你没能按时凑齐，去求他宽限。他答应了，但这件事在社区里传开了。",
            { fun: -0.7, rep: -1.5, contact: { shark: -8 }, flags: ["compromised"] })
        }
      },
      {
        id: "refuse", text: "不借。宁可慢一点",
        base: 0.8, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: out("你空着手走出那家店，反而觉得踏实。你后来发现，那天如果借了，你会在三个月后做一件自己都不认识自己的事。",
            { rep: 1.25, contact: { shark: -4 }, fac: { base: 4 } }),
          ok: out("你没借钱。日子紧，但每一分钱都是自己的。",
            { rep: 0.4 }),
          meh: out("钱不够，你少做了一件本来想做的事。没什么大事，只是有些机会就这样过去了。",
            { rep: 0.4, fun: -0.2 }),
          fail: out("你因为缺钱办砸了一件小事，被人当面说了一句「穷」。",
            { rep: -0.8, fac: { commercial: -3 } }),
          critfail: out("缺钱让你错过了一次本该抓住的机会。你坐在空公寓里，第一次认真想过去借那笔钱。",
            { rep: -1.25 })
        }
      }
    ]
  },

  /* ==========================================================================
   * 3) 一份不该存在的人事档案 —— 第一次真的拿到"把柄"
   * ======================================================================== */
  {
    id: "shady_file", era: SHADY_ERAS, tierMin: 1, tierMax: 5, weight: 10,
    grade: "mid", valence: "risk", dyn: true, category: "shady",
    title: "有人塞给你一份能毁掉一个人的档案",
    body: "有人把一个牛皮纸袋塞给你就走，连名字都没留。里面是一份复印的人事记录：某位在职官员三年前签过一份文件，\n" +
      "这文件能让他本人、他的家庭、以及当初给他钱的两个人同时睡不着。\n" +
      "你现在握着足以让一个人就范的把柄。",
    brief: {
      lede: "把柄不是武器，是一张借条——你借了他的安全，将来要还利息。",
      known: [
        "记录是真的。你看得懂编号和签章，它本该保密。",
        "涉事的这位先生现在还在位，而且正好卡在你要过的那道门上。",
        "送东西的人没留名，他要这东西被用掉，不是收起来。",
        "持有本身不违法，用它才违法——抓到与否看你怎么用。"
      ],
      rumor: [
        "有人说这份记录本来有第二份，在某家报社的抽屉里。",
        "有人说他当年不是自己签的，是替别人签的。"
      ],
      unknown: [
        "送东西的人想从这件事里得到什么。",
        "你什么都不做，这纸五年后还有没有用。"
      ],
      terms: [
        { k: "把柄", v: "让人坐立不安的东西，只能换成沉默。" },
        { k: "有效期", v: "把柄跟着人走：人下台或死了纸就作废。" }
      ]
    },
    choices: [
      {
        id: "keep", text: "收进抽屉，什么都不做，先记住这件事",
        base: 0.72, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "attr", key: "INTG", w: -0.2 }],
        outcomes: {
          crit: out("你把纸袋放进抽屉最底层，然后花了三周弄清楚它为什么会在你手上。等你弄明白时，你已经比以前更懂这座城市了。",
            { lev: 1, fac: { base: 3 }, contact: { fixer: 8 } }),
          ok: out("收起来了。你偶尔会想起它，但你没有打开第二次。",
            { lev: 1 }),
          meh: out("你把它收起来，然后忘了放在哪一格。三个月后你才重新找到它。",
            { lev: 1 }),
          fail: out("你收起来了，但房东翻过一次你的房间。她没拿走什么，但你从此不放心。",
            { lev: 1, fac: { base: -3 } }),
          critfail: out("你收起来了，但那个牛皮纸袋上留着你的指纹，而它第二天出现在了别人的桌上。",
            { lev: 1, rep: -0.8, flags: ["scandal_2"] })
        }
      },
      {
        id: "use", text: "现在就把它用掉——敲那扇门",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.55 }],
        stake: { fun: true, fav: true },
        outcomes: {
          crit: out("你只说了三句话，其中一句是那个编号。他请你坐下，给你倒了水，然后答应了你要的那件事——还多答应了一件。",
            { tier: 1, rep: 1.5, lev: 1, fac: { establishment: 12, press: -6 }, flags: ["compromised"] }),
          ok: out("事情办成了。你没说威胁的话，但你们两个都听见了那句话没说出口的部分。",
            { rep: 1, lev: 1, fac: { establishment: 8 }, flags: ["compromised"] }),
          meh: out("他答应得很痛快，痛快得你怀疑这件事对他来说根本不算什么。",
            { rep: 0.6, lev: 1, fac: { establishment: 4 } }),
          fail: out("他听完之后笑了，说他三年前就为这件事道过歉、付过代价。你的纸在他眼里已经过期了。",
            { lev: 1, rep: -1, fac: { establishment: -12, press: -8 }, flags: ["scandal_2"] }),
          critfail: out("他没等你说完就按了铃。保安进来的时候他把纸袋推到你面前，说：「这是你的东西，先生。」全程没有一句威胁，但所有人都懂了。",
            { lev: 1, rep: -1.75, fac: { establishment: -18 }, flags: ["scandal_3", "investigation_open"] })
        }
      },
      {
        id: "burn", text: "烧掉它。就当没见过",
        base: 0.78, mods: [{ src: "attr", key: "INTG", w: 0.5 }],
        outcomes: {
          crit: out("你在后院的铁桶里把它烧了，还把灰搅开。你失去了一个机会，也失去了一个将来会让人半夜敲门的东西。你那天睡得很沉。",
            { rep: 0.6, fac: { base: 6, agency: 5 }, contact: { fixer: -6 } }),
          ok: out("烧了。你什么都没得到，但也什么都没欠。",
            { rep: 0.2, fac: { base: 3 } }),
          meh: out("烧了。可你记住了上面的编号，这件事后来在你脑子里待了很多年。",
            {}),
          fail: out("你烧了，但送纸袋的人知道了。他从那以后没再找过你。",
            { fac: { base: 2 }, contact: { fixer: -10 } }),
          critfail: out("你正在烧的时候，邻居在阳台上看了一会儿。后来有人开始打听「那个在院子里烧东西的年轻人」。",
            { rep: -0.6, fac: { base: -5 }, flags: ["scandal_1"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 4) 诊所医生的签名 —— 用别人的职业风险，换自己的时间
   * ======================================================================== */
  {
    id: "shady_doctor", era: SHADY_ERAS, tierMin: 0, tierMax: 4, weight: 9,
    grade: "minor", valence: "risk", dyn: true, category: "shady", medium: "print",
    title: "你让旧城区诊所的医生替你签假条",
    body: "旧城区有家挂着双语招牌的医务中心，进门得先说清楚自己不是来找麻烦的。\n" +
      "你要的，是医生签一张能让你合法消失几天的证明。他做事谨慎，只在意一件事：你走了之后，他这块招牌还挂不挂得住。",
    brief: {
      lede: "你需要的是几天时间。问题是替你把日期签掉的人，要拿自己的执照替你担着。",
      known: [
        "医务中心最赚钱的业务不是看病，是替人签时间。",
        "医生最怕的不是罚款，是被社区当成「把事捅出去的人」。",
        "签一份的成本对他是零——风险才是全部成本。",
        "他有一个女儿在读书，这件事让他很容易被说服，也很容易被逼急。"
      ],
      rumor: [
        "有人说他上个月刚被卫生部门的人上门问过一次话。",
        "有人说他其实留了一份底账，记着所有找他签过字的人。"
      ],
      unknown: [
        "他会把这件事记在哪里、记多久。",
        "他女儿将来会知道他靠什么供自己念完的书。"
      ],
      terms: [
        { k: "签名", v: "一份带医生签字的纸，让你合法消失几天。" },
        { k: "底账", v: "经手人自留的备份，对你是把柄对他也是。" }
      ]
    },
    choices: [
      {
        id: "press", text: "直接施压：把话说到他不敢拒绝",
        base: 0.66, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "attr", key: "INTG", w: -0.25 }],
        stake: { fav: true },
        outcomes: {
          crit: out("他没敢多问，而且为了保险，还多给了你一份完全不同的记录。你走的时候他手在抖——你知道自己以后还能来。",
            { lev: 1, rep: 0.4, attr: { CUN: 2 }, fac: { base: -2, press: 3 }, contact: { doctor: 6 } }),
          ok: out("他签了。你没说一句难听的话，但两个人都清楚刚才发生了什么。",
            { rep: 0.4, attr: { CUN: 1 }, fac: { base: -3 }, contact: { doctor: 2 } }),
          meh: out("他签了一半就开始拖延。你拿到了东西，但他记住了你的脸。",
            { contact: { doctor: -5 } }),
          fail: out("他很怕，但怕到了极点反而硬了起来：「你报警吧，我明天就关门。」你拿不到签名，还多了一个敌人。",
            { rep: -1.25, fac: { base: -6 }, contact: { doctor: -16 } }),
          critfail: out("他把这件事说给了同乡会的几位长辈。三个月后，旧城区的每一家店都知道你是什么人。",
            { rep: -2.5, fac: { base: -12, civil: -10 }, contact: { doctor: -22 }, flags: ["scandal_1"] })
        }
      },
      {
        id: "deal", text: "谈生意：付钱，然后让他觉得这买卖划算",
        base: 0.72, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "attr", key: "CHA", w: 0.3 }],
        cost: { fun: 0.7 },
        outcomes: {
          crit: out("你付了钱，还替他算了一笔账：你带来的量能让他的房租轻松几个月。他从那天起把你当成「一个客户」。",
            { rep: 0.4, contact: { doctor: 14 }, fac: { base: 3, commercial: 4 } }),
          ok: out("钱付了，签名拿到，双方都很客气。这是最干净的一种脏。",
            { contact: { doctor: 8 } }),
          meh: out("他收了钱，但只肯签两张，还让你下次别在白天来。",
            { fun: -0.7, contact: { doctor: 2 } }),
          fail: out("他退了钱：「我宁可少赚，也不想让你再进这道门。」",
            { rep: -0.4, contact: { doctor: -6 } }),
          critfail: out("他收了钱，第二天把所有东西都退给了你的对手，还附上了你的名字。",
            { fun: -0.7, rep: -1.5, contact: { doctor: -18 }, flags: ["scandal_1"] })
        }
      },
      {
        id: "honest", text: "不签了。自己扛过去",
        base: 0.8, mods: [{ src: "attr", key: "INTG", w: 0.45 }],
        outcomes: {
          crit: out("你去见了该见的人，把情况原原本本说了。对方沉默了一会儿，然后说：「你至少没骗我。」这件事后来意外地帮了你。",
            { rep: 1.5, fac: { base: 6 }, contact: { doctor: 6 } }),
          ok: out("你自己扛了过去。累，但没欠谁。",
            { rep: 0.4 }),
          meh: out("你硬扛，结果两头都没落好。",
            { rep: -0.4 }),
          fail: out("你没去签字，也没去处理，事情就这样坏掉了。",
            { rep: -1.25, fac: { base: -3 } }),
          critfail: out("你硬扛的办法是骗人。被人当场拆穿之后，你连医务中心都回不去了。",
            { rep: -2.5, fac: { base: -6, press: -8 }, flags: ["scandal_1"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 5) 工会的一声口令
   * ======================================================================== */
  {
    id: "shady_union", era: SHADY_ERAS, tierMin: 1, tierMax: 5, weight: 10,
    grade: "mid", valence: "risk", dyn: true, category: "shady", medium: ["print", "tv"],
    title: "你去请工会头目为你站台",
    body: "工会大楼的会议室一股咖啡和旧地毯味。头目听你讲了十分钟，只问了一句：「你要我的人替你做什么？」\n" +
      "这句话答错，你这辈子都不用再进这栋楼。",
    brief: {
      lede: "他不投你的票。他能决定别人的票往哪走。这两件事的价钱不一样。",
      known: [
        "罢工投票那几天你替他们守了三个通宵的登记台，会员都知道。",
        "他的会员有八千人；初选那天他们先看他怎么站。",
        "他要的不是钱，是「下份合同里别把我们卖了」。",
        "他上个月刚和厂方谈崩，手里有火，也说话很短。"
      ],
      rumor: [
        "有人说他上面还有人，那个人收的是另一种钱。",
        "有人说他打算退，正在挑接班人 —— 这件事比合同重要。"
      ],
      unknown: [
        "他要的那个承诺，你会不会兑现。",
        "若他和对手先谈成，你还有没有第二条路。"
      ],
      terms: [
        { k: "背书", v: "一纸声明：价值不在内容，在谁说的。" },
        { k: "动员", v: "把名单变成到场人数。" }
      ]
    },
    choices: [
      {
        id: "promise", text: "直接给承诺：那份合同上签字的是我",
        base: 0.6, mods: [{ src: "attr", key: "CHA", w: 0.45 }, { src: "fac", key: "labor", w: 0.4 }],
        stake: { fun: true, fav: true },
        outcomes: {
          crit: out("他站起来和你握了手，然后叫进来三个人：「以后这位先生的事，就是我们的事。」你那天带走的是一整套名单。",
            { rep: 1.75, fav: 1, fac: { labor: 22, base: 10 }, contact: { union_boss: 18 }, flags: ["union_backing", "street_army"] }),
          ok: out("他没说「支持」，只说「我们可以谈谈」。对工会来说，这已经是很重的话了。",
            { rep: 1, fac: { labor: 12, base: 5 }, contact: { union_boss: 10 }, flags: ["union_backing"] }),
          meh: out("他答应「考虑」，然后把你送到电梯口。你知道「考虑」是什么意思。",
            { rep: 0.2, fac: { labor: 3 }, contact: { union_boss: 2 } }),
          fail: out("他一眼看穿你在开空头支票：「你连自己那一关都过不了，拿什么给我签字？」",
            { rep: -0.8, fac: { labor: -14 }, contact: { union_boss: -12 } }),
          critfail: out("你承诺得太满，而他正好缺一个可以公开骂的对象。他的会员开始在报纸上认识你的名字。",
            { rep: -1.5, fac: { labor: -22, press: -10 }, contact: { union_boss: -24 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "listen", text: "先不谈条件，坐下来听他们讲两小时",
        base: 0.68, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: out("两小时后你记住了十七个名字，还有三个他们真正在意的问题。他最后说：「你是第一个问我们车间温度的人。」",
            { rep: 1.25, fac: { labor: 16, base: 8 }, contact: { union_boss: 16 } }),
          ok: out("你听完了。没拿到背书，但拿到了一个电话号码，以及他私人的一句忠告。",
            { rep: 0.6, fac: { labor: 8 }, contact: { union_boss: 9 } }),
          meh: out("你听了两小时，净听到抱怨。有一半是真的，另一半是习惯。",
            { fac: { labor: 3 }, contact: { union_boss: 3 } }),
          fail: out("你在第二十分钟就看了表。他看见了。",
            { rep: -0.4, fac: { labor: -8 }, contact: { union_boss: -8 } }),
          critfail: out("你中间接了一个电话。他等你挂掉，说：「看来有人比我更重要。」会议就这样结束了。",
            { rep: -0.8, fac: { labor: -14 }, contact: { union_boss: -16 } })
        }
      },
      {
        id: "decline", text: "不进去。跟西装们走更安全",
        base: 0.76, mods: [{ src: "attr", key: "CUN", w: 0.35 }],
        outcomes: {
          crit: out("你选了另一条路，而且走得很稳。后来你算了一笔账：工会这条路更短，但那两小时你换不回来。",
            { rep: 0.4, fac: { establishment: 8, commercial: 6 } }),
          ok: out("你没去工会大楼。你的支持者里少了一批人，但你的麻烦也少了一批。",
            { rep: 0.2, fac: { establishment: 4 } }),
          meh: out("你以为两边都能不得罪，结果两边都不太信你。",
            { rep: -0.2, fac: { labor: -4, establishment: 2 } }),
          fail: out("你的对手先去了。当他站在厂门口的照片见报时，你才明白自己错过了什么。",
            { rep: -0.8, fac: { labor: -12, base: -6 } }),
          critfail: out("你没去，但手下人替你传了句话，说「那位先生看不上工会」。话传到他耳朵里时已经不是原话了。",
            { rep: -1.25, fac: { labor: -18, base: -10 }, flags: ["scandal_1"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 5b) 工会的余波 —— 说过的话，两年后有人来兑（shady_union 的 aft er链）
   * ======================================================================== */
  {
    id: "shady_union_collect", era: SHADY_ERAS, tierMin: 1, tierMax: 5, weight: 9,
    unique: true, grade: "major", valence: "risk", dyn: true, category: "shady", medium: ["print", "tv"],
    after: { id: "shady_union", minMonthsAfter: 10, maxMonthsAfter: 42 },
    flags: ["union_backing"],
    title: "工会来兑现你两年前许下的承诺",
    body: "市议会下周要表决一份外包合同，电话响了，是工会头目本人。\n" +
      "「两年前你说过，签合同的手是我们的人。」他说，「下周，让我们看看这只手怎么投。」\n" +
      "这一次他要的不是承诺，是你实打实的一票——你的人情，到期结账了。",
    brief: {
      lede: "背书不是礼物，是贷款。两年免息，今天到期。",
      known: [
        "下周表决市政外包合同——工会八千岗位就在这票里。",
        "你现在是当事人：这一票怎么投，全楼都在看。",
        "当年那句「签合同的是我」，双方都没有忘记——包括报纸。"
      ],
      rumor: [
        "有人说他录了你们的谈话，压在办公桌第二层。",
        "有人说对手开出更好的价：一份不裁员书面保证。"
      ],
      unknown: [
        "这票之后多个盟友还是敌人，工会都记。",
        "录音有没有没人知道，但你说话会小心。"
      ],
      terms: [
        { k: "市政外包", v: "公共服务交给私营公司做，省钱但丢岗位。" }
      ]
    },
    choices: [
      {
        id: "deliver", text: "兑现承诺：投反对票，把外包案挡下",
        note: "还人情。工会的信任是长期的——但商业派系和预算鹰派会记住你「贵」。",
        base: 0.62, mods: [{ src: "fac", key: "labor", w: 0.45 }, { src: "attr", key: "INTG", w: 0.25 }],
        outcomes: {
          crit: out("你的发言把外包案挡在了委员会里。当晚工会大楼的灯亮到很晚——他们在给你写感谢信，八千份。", { rep: 1.25, fac: { labor: 25, base: 10, commercial: -12 }, contact: { union_boss: 20 }, flags: ["civil_win"] }),
          ok: out("票投了，案挡了。他只发来四个字：「下次再谈。」这就是他的「谢谢」。", { rep: 0.7, fac: { labor: 15, commercial: -8 }, contact: { union_boss: 10 } }),
          meh: out("你投了反对，但议案还是过了。工会知道你尽力了——这年头，「尽力」也算数。", { rep: 0.2, fac: { labor: 8 }, contact: { union_boss: 5 } }),
          fail: out("你的反对被对手做成了「为了工会损害纳税人」的广告。", { rep: -0.7, fac: { labor: 6, commercial: -8, press: -6 } }),
          critfail: out("表决前夜，你「被承诺给工会好处」的传闻见了报。合同过了，人情没了，名声也脏了。", { rep: -1.25, fac: { labor: -8, press: -10, commercial: 6 }, flags: ["scandal_3"] })
        }
      },
      {
        id: "renegotiate", text: "两边都不得罪：换一个「不裁员的书面保证」",
        note: "不直接投反对，逼厂方签保证书。办成了是艺术，办不成两头空。",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "attr", key: "INT", w: 0.25 }],
        outcomes: {
          crit: out("你拿着工会的票和商业的钱当筹码，逼出了一个「三年不裁」的书面修正案。两边的头条都在夸你。", { rep: 1.5, fac: { labor: 12, commercial: 8, establishment: 8 }, contact: { union_boss: 12 } }),
          ok: out("保证书签了，虽然细则含糊。他收下了：「比你前任强。」", { rep: 0.8, fac: { labor: 8, commercial: 4 }, contact: { union_boss: 7 } }),
          meh: out("厂方只肯给口头承诺。他听完你的转述，只说了一句：「至少你来传话了。」", { rep: 0.2, fac: { labor: 3 }, contact: { union_boss: 2 } }),
          fail: out("两边都嫌你骑墙：工会说你软弱，厂方说你多事。", { rep: -0.6, fac: { labor: -8, commercial: -5 } }),
          critfail: out("你私下对厂方说的「工会其实能接受裁员」被转述给了他本人。这栋楼，你真的不用再进了。", { rep: -1, fac: { labor: -25, base: -8 }, forget: ["union_boss"], notFlags: ["union_backing"], flags: ["scandal_2"] })
        }
      },
      {
        id: "refuse", text: "合同照过：当初的话就当没说过",
        note: "赖账。商业派系满意，但工会的记性比任何 PAC 都长。",
        base: 0.7, mods: [{ src: "fac", key: "commercial", w: 0.3 }],
        outcomes: {
          crit: out("合同高票通过，预算省了一截，商业派系给你递来了下一张支票。工会那边——你把手机调了静音。", { rep: 0.3, fun: 1.75, fac: { commercial: 14, labor: -10 }, notFlags: ["union_backing"] }),
          ok: out("票投了，案过了。散会后你在走廊遇见他，两个人都装作在看手机。", { fac: { commercial: 8, labor: -14 }, forget: ["union_boss"], notFlags: ["union_backing"] }),
          meh: out("合同过了。工会的沉默比骂声更难受。", { fac: { commercial: 5, labor: -16 }, contact: { union_boss: -15 }, notFlags: ["union_backing"] }),
          fail: out("你投了支持票，对手把「背叛劳工」做成了整轮广告。你的选区里每一家工厂门口都贴着那张海报。", { rep: -0.9, fac: { labor: -20, base: -8 }, flags: ["scandal_1"] }),
          critfail: out("投票当天，工会会员把「他答应过我们」的旧传单重印了两万份，撒满了你的选区。签名是你当年的笔迹。", { rep: -1.5, fac: { labor: -25, base: -12, press: -8 }, forget: ["union_boss"], notFlags: ["union_backing"], flags: ["scandal_2"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 6) 把黑钱洗成竞选经费 —— 入账之后就没有退路了
   * ======================================================================== */
  {
    id: "shady_launder", era: SHADY_ERAS, tierMin: 2, tierMax: 5, weight: 10,
    grade: "major", valence: "risk", dyn: true, category: "shady", unique: true, medium: ["print", "tv", "internet"],
    title: "有人要塞给你一笔不能见光的巨款",
    body: "有人要给你一笔大到无法拒绝的钱，唯一的条件是别问他从哪来。\n" +
      "会计坐在你对面，用铅笔画了三条把它洗干净的路，每条末尾都写着同一句话：一旦进来，就没有干净的退路。",
    brief: {
      lede: "有些钱你收了，就等于把自己的名字签在了别人的账上。",
      known: [
        "这笔钱如果走正常渠道，三天之内就会有四个人知道它的来源。",
        "走非正常渠道，它可变成小额捐款、咨询费或演讲费。",
        "会计不怕做这件事，他怕的是你会不会在某个下午把他交出去。",
        "监管这一年很忙——它现在会把注意力放在比你这笔钱更大的地方。"
      ],
      rumor: [
        "有人说这笔钱真正的主人和你对手也见过面。",
        "据说去年同样结构的一笔钱，变成了起诉书。"
      ],
      unknown: [
        "这笔钱背后的人最终要买什么。",
        "若有一天要你把钱吐出来，你吐不吐得出。"
      ],
      terms: [
        { k: "洗钱", v: "把黑钱变白不难，难在之后一直替它保密。" },
        { k: "披露", v: "把来源报给监管：写上去就等于交出把柄。" }
      ]
    },
    choices: [
      {
        id: "wash", text: "收下。让会计把它拆成一千笔小额捐款",
        base: 0.52, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "fac", key: "commercial", w: 0.3 }],
        stake: { fun: true, fav: true },
        outcomes: {
          crit: out("一千笔小额捐款，每一笔都经得起查。竞选小组第一次不用算着钱花。你在夜里醒来过一次，然后又睡着了。",
            { fun: 11.5, rep: 0.9, lev: 1, fac: { commercial: 18, base: 6 }, flags: ["black_money", "launder"] }),
          ok: out("钱清了进来。会计把底稿锁进了一个你不知道的地方 —— 他说「这是为了你」，你选择相信他。",
            { fun: 7.5, rep: 0.6, fac: { commercial: 12 }, flags: ["black_money", "launder"] }),
          meh: out("钱进来了，但花了半年才铺开，中间折损了两成。你既没干净也没快。",
            { fun: 4.5, rep: 0.2, fac: { commercial: 6 }, flags: ["black_money"] }),
          fail: out("拆得不够散，一家小银行把几笔转账核在了一起。钱被冻结了四个月，你的竞选日程撞得粉碎。",
            { fun: -1, rep: -0.7, fac: { commercial: -8 }, flags: ["scandal_2", "investigation_open"] }),
          critfail: out("会计把底稿带回家了。三个月后，那份底稿出现在一份传票的附件里。",
            { rep: -1.25, fav: -2, fac: { commercial: -16, press: -12 }, flags: ["scandal_4", "investigation_open", "launder"] })
        }
      },
      {
        id: "report", text: "收下，但如实披露来源",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.55 }],
        outcomes: {
          crit: out("你把它原原本本写进了公开文件。三天之内有记者来查，查完之后写了一句：「这次是真的干净的。」这句话比钱值钱。",
            { fun: 6, rep: 1.5, fac: { press: 16, base: 10, commercial: 6 } }),
          ok: out("披露了。钱变少了，麻烦也变少了。你睡得很好。",
            { fun: 3.5, rep: 0.9, fac: { press: 8, base: 5 } }),
          meh: out("你披露了，但那笔钱的主人不喜欢被写在纸上。他把支票收了回去，还告诉别人你「不懂事」。",
            { fun: 0.5, rep: 0.3, fac: { commercial: -10, press: 6 } }),
          fail: out("你以为披露就没事了，结果监管机构顺着披露又查了三个月。查完没事，但你这三个月什么也没干成。",
            { rep: -0.3, fac: { commercial: -8, press: 4 } }),
          critfail: out("披露的内容里有一笔你说不清去处的旧账。你本意是澄清，结果打开了一个更旧的口子。",
            { rep: -0.9, fac: { press: -10, base: -6 }, flags: ["scandal_3", "investigation_open"] })
        }
      },
      {
        id: "refuse", text: "退回去。这一笔不要",
        base: 0.72, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: out("你把支票退回去，还多写了一句「下次请您光明正大地来」。这个人后来真的又来了，而且来得很规矩。有些金主只尊重拒绝过一次的人。",
            { rep: 1, fac: { press: 10, commercial: 8, base: 8 } }),
          ok: out("退回去了。你的账户很干净，竞选很难看。",
            { rep: 0.6, fac: { press: 5, base: 4 } }),
          meh: out("退回去了，但这件事在你团队里留下了一道裂缝 —— 有两个人大吵一架然后离开。",
            { rep: 0.2, fac: { commercial: -6 } }),
          fail: out("你退回去的时候姿态太难看，等于当众打了对方一巴掌。他答应过要给你的另一笔钱也没有了。",
            { rep: -0.2, fac: { commercial: -14 } }),
          critfail: out("你退了钱，但你的对手接了。三个月后，你发现自己同时在缺钱和缺人。",
            { rep: -0.6, fun: -0.7, fac: { commercial: -10, base: -6 } })
        }
      }
    ]
  }
]);
