/* ============================================================================
 * CONTENT · events/88-finance-2.js
 * 【金钱线】钱怎么来、怎么走、怎么变成别的东西。
 *   意外之财 / 税务审计 / 地产投资 / 领导型PAC / 资金链断裂 —— 五种常见的财务时刻，
 *   外加一幕「意外之财的余波」：来路琢磨过的钱，两年后有人来对账。
 * ==========================================================================*/

const FIN2_ERAS = ["2008_CRASH", "1960_CAMELOT", "1974_WATERGATE"];

function out(body, effects) { return { body: body, effects: effects || {} }; }

POTUS.define("event", [

  /* ==========================================================================
   * 1) 意外之财 —— 低层友好，钱来路要琢磨
   * ======================================================================== */
  {
    id: "fin2_windfall", era: FIN2_ERAS, tierMin: 0, tierMax: 3, weight: 12,
    grade: "mid", valence: "risk", dyn: true, category: "finance",
    title: "一笔没写来历的钱",
    body: "律师事务所的信封很厚，里面只有一页纸：一位你几乎忘了的远房姑婆留给你一笔遗产，\n" +
      "数目不大不小——够你把眼下的窟窿全堵上，还剩一点。\n" +
      "问题是，执行人附了一句：「委托人希望您不要询问这笔资产的构成。」",
    brief: {
      lede: "天上掉下来的钱，落地时总带着一点别人的指纹。",
      known: [
        "你能收到这封信，是因为全家族里眼下「在从政」的只有你一个——名字是能拿来用的。",
        "遗产本身合法：遗嘱、税单、法院文书一样不缺。缺的是那笔资产变成现金之前的履历。",
        "执行人是个守规矩的律师，他只负责交割，不负责回答问题。",
        "你现在的账上，正好缺这么一笔钱来撑过下半年。"
      ],
      rumor: [
        "有人说姑婆晚年的钱和一个早已结业的商行有关，那商行什么生意都做过一点。",
        "有人说家族里还有第二封内容不同的信，压在另一个亲戚手里。"
      ],
      unknown: [
        "这笔钱在被花掉之后，还会不会有第三个人记得它的来历。",
        "「不要询问」这句话，是遗产的条件，还是某个活人的习惯。"
      ],
      terms: [
        { k: "遗产交割", v: "法院文书齐全、程序合法。合法不等于干净——干净指来源说得清。" },
        { k: "资产构成", v: "钱在变成现金之前是什么：股票、房产、还是一笔旧账的清偿。" }
      ]
    },
    choices: [
      {
        id: "take_all", text: "全收下。窟窿要紧，来路以后再说",
        note: "钱能救急，但「没问过」这件事会被你记一辈子——也可能被别人记住。",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "attr", key: "INTG", w: -0.15 }],
        stake: { fav: true },
        outcomes: {
          crit: out("钱到账的当天，你顺手把交割文书从头到尾读了一遍，还抄了一份留底。半年后有人来打听时，你是全家族唯一说得清的人。",
            { fun: 6, rep: 0.6, fac: { base: 4 }, flags: ["windfall_kept"] }),
          ok: out("钱进了账，窟窿堵上了。你把那页「不要询问」的附言折起来收进了抽屉最底层。",
            { fun: 4.5, flags: ["windfall_kept"] }),
          meh: out("钱到得比说好的少了两成——「税费和杂费」。你没处问，也懒得问。",
            { fun: 2.5, flags: ["windfall_kept"] }),
          fail: out("交割拖了四个月，你的下半年是在催款电话里过的。钱最后还是来了，只是来晚了。",
            { fun: 1.75, hp: -0.8, flags: ["windfall_kept"] }),
          critfail: out("钱到账第三周，一家旧商行的清算人找上门：这笔遗产里有一笔「有待确认的债权」。你没发大财，倒是先请了律师。",
            { fun: 0.6, rep: -0.8, hp: -1, fac: { commercial: -6 }, flags: ["windfall_kept", "investigation_open"] })
        }
      },
      {
        id: "ask", text: "先花精力查清来路，再决定收不收",
        note: "慢，但你以后每花这笔钱的时候都睡得着。查的过程本身也会教你怎么读账。",
        base: 0.58, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "attr", key: "INTG", w: 0.3 }],
        cost: { ap: 1 },
        outcomes: {
          crit: out("你花了三周，把那笔资产三十年的履历拼了出来。它不算干净，但说得清——你只收下说得清的那一半，把剩下的捐给了姑婆生前常去的教学。报纸给了你一小段表扬。",
            { fun: 2.5, rep: 1.25, fac: { press: 8, base: 6, church: 4 } }),
          ok: out("查清了：钱是老派的、慢的、无趣的——租金和利息攒了四十年。你收得心安理得。",
            { fun: 3.5, rep: 0.6, fac: { base: 3 } }),
          meh: out("查了个半懂。你收下了钱，也在心里留了一个没关上的抽屉。",
            { fun: 2.75, flags: ["windfall_kept"] }),
          fail: out("越查越乱。执行人最后不耐烦了：「要么签字，要么放弃。」你在压力下签了。",
            { fun: 2, hp: -0.5, flags: ["windfall_kept"] }),
          critfail: out("你查到的那半截，恰好是别人不想让任何人碰的旧账。信封还没拆完，就有人托话来请你「适可而止」。",
            { fun: 0.8, rep: -0.6, fac: { criminal: -8 }, contact: { fixer: 6 }, flags: ["compromised"] })
        }
      },
      {
        id: "refuse", text: "放弃继承。一分不要",
        note: "最干净的一条路，代价是你继续缺钱——但你缺的只是钱。",
        base: 0.74, mods: [{ src: "attr", key: "INTG", w: 0.45 }],
        outcomes: {
          crit: out("你写了放弃声明。三年后竞选对手派人去挖这笔「来路不明的遗产」，挖到的只有你那页签名。你的清白在那一天有了价格——而且很高。",
            { rep: 1.25, fac: { press: 8, base: 6 } }),
          ok: out("放弃了。日子照旧地紧，但你夜里不看账户也能睡着。",
            { rep: 0.6, fac: { base: 3 } }),
          meh: out("放弃了。家族里有人说你傻，也有人说你「装」。两边的声音都不大。",
            { rep: 0.2, fac: { base: -2 } }),
          fail: out("你放弃之后才听说，那笔钱最后去了另一位亲戚手里——他拿它做了你不愿意想的事。",
            { rep: -0.4, hp: -0.5 }),
          critfail: out("放弃的手续办了一半卡住了，钱在你名下悬了半年。既没得到钱，也没得到清白，还搭进去一堆解释。",
            { rep: -0.8, hp: -0.8, fac: { base: -4 } })
        }
      }
    ]
  },

  /* ==========================================================================
   * 1b) 意外之财的余波 —— 两年后有人来对账
   * ======================================================================== */
  {
    id: "fin2_windfall_collect", era: FIN2_ERAS, tierMin: 0, tierMax: 4, weight: 9,
    unique: true, grade: "major", valence: "bane", dyn: true, category: "finance",
    after: { id: "fin2_windfall", minMonthsAfter: 12, maxMonthsAfter: 36 },
    flags: ["windfall_kept"],
    title: "有人记得那笔钱",
    body: "一个自称「资产管理人」的人约你在一家不吵的餐厅见面。\n" +
      "他把一份复印件推过桌面——是你那笔遗产交割文书的最后一页，上面多了一行你从没见过的批注。\n" +
      "「委托人当年有一个附加安排，」他说，「现在到期了。」",
    brief: {
      lede: "你没问过的那个问题，两年后自己找上门来问了。",
      known: [
        "他能坐到你对面，是因为你收钱那天没有问「资产构成」——空白就是门缝。",
        "他要的不是全部：一笔「管理费」，外加你在某个委员会里「保持现状」。",
        "交割文书是真的，批注也是真的——这就是最麻烦的地方。",
        "餐厅里没有第三个人听得见你们说什么。"
      ],
      rumor: [
        "有人说这位管理人手里不止你一份批注，整条街的遗产他都管过「附加安排」。",
        "有人说他背后的委托人早就不在人世，他只是在收一笔无主的账。"
      ],
      unknown: [
        "那份批注在法律上到底站不站得住——他赌你不敢去验证。",
        "如果你把这页纸交给而不是交钱给该交的地方，会先炸到谁。"
      ],
      terms: [
        { k: "附加安排", v: "遗嘱之外的私人备忘。法律效力模糊，敲诈效力清楚。" },
        { k: "保持现状", v: "不投票、不发声、不推进。政治上最便宜的一种收买。" }
      ]
    },
    choices: [
      {
        id: "pay", text: "付那笔「管理费」，换他永远消失",
        note: "花钱买安静。但付过一次的人，在对方眼里就是会付第二次的人。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        cost: { fun: 1 },
        outcomes: {
          crit: out("你付了钱，还让他签了一份「两清」的确认函——你不知从哪来的冷静。他收了函，真的再没出现过。",
            { rep: 0.2, fac: { criminal: 4 }, notFlags: ["windfall_kept"] }),
          ok: out("钱付了，人走了。你在停车场坐了半个小时才发动车。",
            { notFlags: ["windfall_kept"], flags: ["compromised"] }),
          meh: out("他嫌少。你又加了一笔，事情才算完。",
            { fun: -0.7, notFlags: ["windfall_kept"], flags: ["compromised"] }),
          fail: out("你付了钱，三个月后换了一个「新的资产管理人」来接手「同一份安排」。",
            { fun: -1, rep: -0.3, fac: { criminal: -6 }, flags: ["compromised"] }),
          critfail: out("付款的记录成了新的把柄。从此你不是被一份旧遗嘱拿住，而是被你自己的一笔支出拿住。",
            { fun: -1, rep: -0.9, fac: { criminal: 8, press: -6 }, flags: ["compromised", "black_money"] })
        }
      },
      {
        id: "go_public", text: "把这页纸交给委员会和记者",
        note: "自曝比被曝便宜。你会疼一阵子，但空出来的手比疼值钱。",
        base: 0.48, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "press", w: 0.3 }],
        cost: { ap: 1 },
        outcomes: {
          crit: out("你先开了记者会，再把材料交上去。故事的主角从「收黑钱的政客」变成了「敲诈候选人的骗子」。那位管理人当月被带走协助调查。",
            { rep: 1, voters: { diehard: 600, warm: 1200 }, fac: { press: 14, base: 8, criminal: -12 }, notFlags: ["windfall_kept"], flags: ["whistleblower"] }),
          ok: out("调查立案了，你也挨了几天的骂。但你把「被拿住」变成了「主动交出」，那扇门从此关上了。",
            { rep: 0.4, voters: { diehard: 300 }, fac: { press: 8, criminal: -8 }, notFlags: ["windfall_kept"] }),
          meh: out("委员会收了材料，然后没有下文。你暴露了自己，却没换来一个说法。",
            { rep: -0.2, fac: { press: 4 }, notFlags: ["windfall_kept"] }),
          fail: out("记者先写的是你「收过一笔说不清的遗产」，敲诈的事放在了第七段。你疼了整整一个季度。",
            { rep: -0.8, voters: { warm: -1500 }, fac: { press: -6, base: -6 }, flags: ["scandal_2"], notFlags: ["windfall_kept"] }),
          critfail: out("材料交上去第二天就泄了，泄出来的版本只剩你收钱那一半。管理人没事，你成了那条街的笑话。",
            { rep: -1.25, voters: { warm: -2500, oppose: 1200 }, fac: { press: -10, base: -10, criminal: 6 }, flags: ["scandal_3", "investigation_open"], notFlags: ["windfall_kept"] })
        }
      },
      {
        id: "stall", text: "不付也不交。拖着，看他敢不敢掀桌",
        note: "赌他的批注站不住。赌赢了一了百了，赌输了就是两条战线同时开火。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "INT", w: 0.25 }],
        outcomes: {
          crit: out("你只回了一句话：「请你的律师和我的律师谈。」两个月后那份批注被鉴定为后添的——他赌输了，而且输了整条街的生意。",
            { rep: 0.7, fac: { criminal: -14, base: 6 }, notFlags: ["windfall_kept"] }),
          ok: out("你拖住了。他等的成本比你要的高，半年后他自己消失了。",
            { rep: 0.2, notFlags: ["windfall_kept"] }),
          meh: out("僵持着。没有交易，也没有了结，这件事变成了你日程表上一个删不掉的备注。",
            { hp: -0.4, flags: ["compromised"] }),
          fail: out("他把批注的复印件寄给了三家报社，附上你的名字。没有一家核实，但三家都「听说了」。",
            { rep: -0.7, fac: { press: -8 }, flags: ["scandal_2"] }),
          critfail: out("他掀了桌：交割文书、批注、还有你当年「没有提问」的签收记录，一次性全放了出来。",
            { rep: -1.5, voters: { warm: -2000, oppose: 1000 }, fac: { press: -12, base: -8, criminal: 8 }, flags: ["scandal_3", "investigation_open"], notFlags: ["windfall_kept"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 2) 税务审计 —— 收入与支出不匹配的政治人物
   * ======================================================================== */
  {
    id: "fin2_taxreturn", era: FIN2_ERAS, tierMin: 1, tierMax: 5, weight: 11,
    grade: "major", valence: "bane", dyn: true, category: "finance", medium: ["print", "tv"],
    title: "对不上的一栏",
    body: "通知函只有两段：税务部门「依法」调阅你近三年的申报材料，\n" +
      "理由那一栏写着——「申报生活水准与报告收入存在显著差异」。\n" +
      "你的会计在电话里沉默了很久，然后说：「先生，我们得谈谈那些没进账的支出。」",
    brief: {
      lede: "政治人物最怕的不是贪污指控，是一栏对不上的数字——数字不会解释自己。",
      known: [
        "你会被选中，是因为你的公开行程里有太多「报告收入付不起的场面」——账单不会说谎，也不会替你说谎。",
        "三年里你有十一笔支出走了现金，其中三笔你本人也说不清用途。",
        "审计不等于指控：结果可以是一次补税，也可以是一份转给检方的案卷。",
        "你的对手在公众场合提过一句「希望某些人的账目经得起看」——时间点太巧。"
      ],
      rumor: [
        "有人说这次审计的名单上还有两个人，都比你有名。",
        "有人说会计手里有一本「真账」，他留着它是为了自保。"
      ],
      unknown: [
        "会计的底稿此刻在谁的抽屉里。",
        "那三笔现金支出，会先被税务局问到，还是先被记者问到。"
      ],
      terms: [
        { k: "生活水准审计", v: "不看你的账，看你的日子：车、房、旅行、学费。日子比账诚实。" },
        { k: "底稿", v: "会计自留的工作底稿。法律上属于他，内容上全是你。" }
      ]
    },
    choices: [
      {
        id: "full_coop", text: "全面配合：补税、交材料、开发布会",
        note: "最疼也最干净。补的是钱，买回来的是「他至少没赖」这句话。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "press", w: 0.25 }],
        cost: { fun: 2, ap: 1 },
        outcomes: {
          crit: out("你补了税、付了罚金，然后把三年报表全文公开。发布会最后你说：「数字对不上的部分，责任在我。」那句话被引用了很多年。",
            { rep: 1, voters: { diehard: 500, warm: 1000 }, fac: { press: 12, base: 8 }, flags: ["audit_clean"] }),
          ok: out("补税、罚金、结案。没有发布会，也没有头条——对审计来说，这就是最好的结局。",
            { rep: 0.3, fac: { base: 4 }, flags: ["audit_clean"] }),
          meh: out("案子结了，但「某人被审计过」这件事进了档案。以后每次有类似的新闻，你的名字都会被提一次。",
            { rep: -0.2, hp: -0.3 }),
          fail: out("你配合了，但流程走了一年。一整年里你的每个日程都被「他正在被查」这句话压着。",
            { rep: -0.6, hp: -0.6, fac: { base: -6 } }),
          critfail: out("你交的材料里有一处日期对不上——你主动递上去的。调查升级，案卷转了部门。",
            { rep: -1, voters: { warm: -1200 }, fac: { press: -8, agency: -8 }, flags: ["scandal_3", "investigation_open"] })
        }
      },
      {
        id: "lawyer_up", text: "请最贵的税务律师，一寸一寸地打",
        note: "程序战能拖能赢，但「他雇了天价律师」本身就是一条新闻。",
        base: 0.66, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "commercial", w: 0.25 }],
        cost: { fun: 4 },
        outcomes: {
          crit: out("律师团把每一笔现金支出都配上了说法和凭证。结案函写得像表扬信。你花的钱买回了完整的清白。",
            { rep: 0.8, fac: { commercial: 10, establishment: 8, base: 4 }, flags: ["audit_clean"] }),
          ok: out("拖了八个月，以补税少量、不加罚结案。钱花得肉疼，事算是过去了。",
            { fun: -1, rep: 0.2, fac: { commercial: 5 }, flags: ["audit_clean"] }),
          meh: out("程序赢了一半：补税照补，罚金减了。你赢的是折扣，不是说法。",
            { fun: -2, rep: -0.1 }),
          fail: out("律师的每一封函都被记者拿到。八个月里你上过六次版面，没有一次是你写的稿。",
            { rep: -0.7, fac: { press: -10, commercial: 4 } }),
          critfail: out("律师团队里有人把你的底稿卖了个好价钱。你花了钱，买回来一份起诉书。",
            { rep: -1.25, voters: { warm: -1800, oppose: 800 }, fac: { press: -12, commercial: -8 }, flags: ["scandal_4", "investigation_open"] })
        }
      },
      {
        id: "blame_accountant", text: "把责任推给会计：那是他的失职",
        note: "脱身最快的一条路，也最容易在后脑留下一个记仇的人。",
        base: 0.52, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "attr", key: "INTG", w: -0.3 }],
        outcomes: {
          crit: out("你解雇了他，公开说是「记账失职」，私下替他付了转行的路费。他签了保密协议，至今没开口。",
            { rep: 0.1, contact: { fixer: 4 }, flags: ["audit_clean"] }),
          ok: out("会计背下了「工作失误」，审计以整改结案。你在办公室多坐了十分钟才去开下一个会。",
            { rep: -0.2, flags: ["audit_clean", "compromised"] }),
          meh: out("他认了失误，但认得心不甘情不愿。你看得出来，这个故事会有下半部。",
            { rep: -0.4, flags: ["compromised"] }),
          fail: out("他不背。他把底稿的「存在」透露给了记者——不是内容，是存在。这下人人都知道有一本真账。",
            { rep: -0.8, fac: { press: -8 }, flags: ["scandal_2", "leaker_suspect"] }),
          critfail: out("他反手成了污点证人。你推出去的那个人，回来的时候带着案卷和豁免协议。",
            { rep: -1.5, voters: { warm: -2200, oppose: 1500 }, fac: { press: -12, agency: -6, base: -10 }, flags: ["scandal_4", "investigation_open", "whistleblower"] })
        }
      },
      {
        id: "quiet_fix", text: "先什么都不做，看风向",
        note: "保底选项。不花钱不押人，赌的是程序自己会慢下来——也赌输了不还手的机会。",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: out("流程自己卡在了排期上——他们真的很忙。九个月后你等来一封措辞平淡的问询函，从容答完了。",
            { rep: 0.2 }),
          ok: out("什么都没发生，又什么都没解决。文件在两个部门之间旅行。",
            {}),
          meh: out("沉默被解读为心虚。第一篇「他为什么不应答」的稿子见了报。",
            { rep: -0.3, fac: { press: -5 } }),
          fail: out("期限过了。不回应本身成了记录在案的事实，罚金和传闻一起涨。",
            { fun: -0.8, rep: -0.6, flags: ["scandal_2"] }),
          critfail: out("你的沉默给了对手整整一个季度。等传票下来的时候，公众早就判完了。",
            { rep: -1, voters: { warm: -1500, oppose: 800 }, fac: { press: -10, base: -8 }, flags: ["scandal_3", "investigation_open"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 3) 地产投资 —— 有钱人路线，funMul 比例回报
   * ======================================================================== */
  {
    id: "fin2_realestate", era: FIN2_ERAS, tierMin: 2, tierMax: 5, weight: 10,
    grade: "mid", valence: "risk", dyn: true, category: "finance",
    title: "河对岸的那块地",
    body: "介绍你来的中间人说得很直白：河对岸规划中的大桥一旦立项，那片仓库区就是下一个城区。\n" +
      "「立项的消息，比你以为的近。」他压低了声音，「买不买，这一周就要定。」\n" +
      "你很清楚：政治人物炒地，赚的是信息差——而信息差正是别人盯你的地方。",
    brief: {
      lede: "内行赚钱靠的不是运气，是比别人早三个星期知道一座桥的位置。",
      known: [
        "你能拿到这个机会，是因为开发商需要几个「有分量」的早期买家来撑住盘子——你的名字就是分量。",
        "规划图还是草案，但草案上有你委员会里见过面的那几个签名。",
        "投入越大回报越高，也越接近「利用职务信息获利」那条线。",
        "地价现在只有立项后估值的三成——这个差价就是全部诱惑。"
      ],
      rumor: [
        "有人说大桥的走向还有第二套方案，仓库区在那套方案里是一片滩涂。",
        "有人说中间人去年用同样的故事卖过另一块地，那块地现在还荒着。"
      ],
      unknown: [
        "草案上的签名会不会在最后一轮换掉。",
        "如果交易曝光，先倒的是你的钱，还是你的席位。"
      ],
      terms: [
        { k: "信息差", v: "你知道、公众不知道的那三个星期。合法与违规之间隔着的就是它。" },
        { k: "早期买家", v: "开发商找来撑盘面的名字。名字越响，盘子越稳，你也越像同谋。" }
      ]
    },
    choices: [
      {
        id: "big_buy", text: "重仓买入：把能动用的钱都压进去",
        note: "赢是翻倍，输是腰斩，曝光是三样一起来。投注加进去的钱同样吃倍数。",
        base: 0.48, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "commercial", w: 0.35 }],
        req: { fun: 28 }, stake: { fun: true, ap: true },
        outcomes: {
          crit: out("立项公告那天，你的地块估值为买入价的三倍半。你提前两个月就办好了脱手文书——赚完就走，一步没多留。",
            { funMul: 2.5, rep: 0.6, fac: { commercial: 12 }, flags: ["land_deal"] }),
          ok: out("大桥立项了，地价如约起飞。你在高点分批出手，落袋为安。",
            { funMul: 1.2, fac: { commercial: 8 }, flags: ["land_deal"] }),
          meh: out("立项拖了一年半。地价没跌也没涨，你的钱在泥地里睡了一觉。",
            { funMul: 0.15, fac: { commercial: 2 } }),
          fail: out("第二套方案胜出——仓库区真的还是仓库区。你割肉离场，中间人的电话再没打通过。",
            { funMul: -0.7, rep: -0.6, fac: { commercial: -6 } }),
          critfail: out("你买入的时机太准了，准到有记者去查了成交日和草案签发日。两个日期之间只差四天。故事不需要再多的素材了。",
            { funMul: -0.9, rep: -2, voters: { warm: -1500, oppose: 800 }, fac: { press: -12, base: -10, commercial: 4 }, flags: ["scandal_3", "investigation_open", "land_deal"] })
        }
      },
      {
        id: "small_buy", text: "小仓位试水：买一间仓库的钱",
        note: "进可攻退可守。赚头有限，但「只是正常投资」这句话你说得出口。",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "commercial", w: 0.2 }],
        req: { fun: 8.5 }, stake: { fun: true },
        outcomes: {
          crit: out("仓位小，出手快，账面干净。立项那天你小赚一笔，还顺手认识了对岸的两个业主——他们后来帮过你大忙。",
            { funMul: 1.6, rep: 0.4, fac: { commercial: 6 }, contact: { fixer: 5 } }),
          ok: out("一间仓库的收益，一个干净的交割记录。不多，但稳。",
            { funMul: 0.7, fac: { commercial: 4 } }),
          meh: out("赚了个零头，够付这一趟的交际费。",
            { funMul: 0.2 }),
          fail: out("立项黄了。小仓位，小亏损——这条线你至少探明白了。",
            { funMul: -0.5 }),
          critfail: out("即便只是一间仓库，成交通知也进了本地报纸的地产版。标题里你的职务比金额显眼。",
            { funMul: -0.6, rep: -1, fac: { press: -8, base: -4 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "decline_watch", text: "不买。但把这一片的业主名单留下来",
        note: "保底选项。不碰钱，改攒人。河对岸的人情，以后选区重划时用得上。",
        base: 0.74, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "attr", key: "INT", w: 0.25 }],
        outcomes: {
          crit: out("你没掏一分钱，却花了一个月把对岸的业主摸成了熟人。两年后选区重划，那片新城区成了你最稳的一块票仓。",
            { rep: 1, voters: { warm: 900, diehard: 300 }, fac: { base: 6, commercial: 4 }, contact: { fixer: 6 } }),
          ok: out("不买，但留下了好印象。中间人后来把别的机会先拿来问了你——问你「碰不碰」，不是「买不买」。",
            { rep: 0.4, contact: { fixer: 4 }, fac: { commercial: 3 } }),
          meh: out("你退出了。那块地后来涨了四倍，你在心里给自己记了一笔，然后翻篇。",
            {}),
          fail: out("你退出的消息传成了「他看不上我们这边」。对岸的业主俱乐部没给你发第二张请帖。",
            { rep: -0.4, fac: { commercial: -4 } }),
          critfail: out("中间人觉得你「占了信息不办事」，把你的犹豫添油加醋地说了出去。你什么都还没做，名声先成了「精」。",
            { rep: -0.8, fac: { commercial: -8, base: -3 } })
        }
      }
    ]
  },

  /* ==========================================================================
   * 4) 领导型 PAC —— 把钱变成政治影响力
   * ======================================================================== */
  {
    id: "fin2_pac_game", era: FIN2_ERAS, tierMin: 2, tierMax: 5, weight: 10,
    grade: "major", valence: "risk", dyn: true, category: "finance", unique: true, medium: ["print", "tv", "internet"],
    title: "自己的盘子",
    body: "两个说客把方案摊在你面前：成立一个以你的名义运作的领导型政治行动委员会。\n" +
      "「捐款上限管的是给候选人的钱，管不了给委员会的钱。」其中一人笑着说，\n" +
      "「从今天起，您可以不求人——可以决定别人的选举。」",
    brief: {
      lede: "别人给你钱是投资，你给别人钱是权力。中间隔着的那家机构，就叫委员会。",
      known: [
        "你能开这个口子，是因为你在圈内的名字已经值钱——没有分量的人立不起委员会。",
        "委员会收的钱没有个人上限，但它不能直接给你的竞选——它资助别人，换别人的记性。",
        "登记、章程、合规官都是现成的，说客们连首笔捐款都物色好了。",
        "媒介就是命脉：靠报纸扬名的年代它靠人头，电视年代靠广告，到了网络年代——一笔钱一夜之间能变成一场运动。"
      ],
      rumor: [
        "有人说首笔捐款的真正主人想借你的盘子洗一段旧关系。",
        "有人说党内大佬已经盯着这个委员会了——他不喜欢别人自建盘子。"
      ],
      unknown: [
        "拿了委员会钱的那些人，四年后还听不听你的。",
        "这个盘子做大之后，是你用它，还是它用你。"
      ],
      terms: [
        { k: "领导型委员会", v: "以某位政客名义设立、但独立于其竞选的募款机构。收钱几乎不限额，花钱要避嫌。" },
        { k: "独立支出", v: "委员会替你打广告、办活动，只要「不协调」就合法。协调不协调，只有你们自己知道。" }
      ]
    },
    choices: [
      {
        id: "go_big", text: "大干一场：设常驻团队，把钱花成一场运动",
        note: "钱换影响力最快的一条路。盘子越大，盯着盘子的眼睛越多。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "commercial", w: 0.3 }],
        cost: { fun: 6.5, ap: 2 }, stake: { fun: true, fav: true },
        outcomes: {
          crit: out("六个月后，你的委员会成了本党最锋利的一把刀——它资助的七个候选人赢了五个。党内再也没人敢把你当配角。",
            { rep: 1.25, lev: 1, voters: { diehard: 1200, warm: 800 }, fac: { establishment: 14, commercial: 12, base: 8 }, contact: { lobbyist: 16 }, flags: ["pac_leader", "kingmaker"] }),
          ok: out("盘子立起来了，头两场助选赢了一场半——赢的那场赢得漂亮，输的那场输得体面。找上门的钱开始变多。",
            { rep: 0.7, voters: { diehard: 500 }, fac: { establishment: 8, commercial: 8 }, contact: { lobbyist: 10 }, flags: ["pac_leader"] }),
          meh: out("委员会开了张，募款刚够养团队。它暂时还只是一块招牌，不是一把刀。",
            { rep: 0.2, fac: { commercial: 4 }, contact: { lobbyist: 5 }, flags: ["pac_leader"] }),
          fail: out("首笔捐款的来源被记者顺藤摸到了一个你不想沾边的名字。盘子还没热就得先灭火。",
            { rep: -0.7, fac: { press: -8, commercial: -6 }, flags: ["pac_leader", "scandal_2"] }),
          critfail: out("「不协调」那条线被一封邮件戳穿了——你的竞选经理和委员会总监每周三同一时间通话。委员会被吊销，你的名字进了案卷标题。",
            { rep: -1.25, voters: { warm: -2000, oppose: 1200 }, fac: { press: -12, establishment: -12, agency: -6 }, flags: ["scandal_4", "investigation_open"], notFlags: ["pac_leader"] })
        }
      },
      {
        id: "go_small", text: "低调起步：先挂招牌，只做募款通道",
        note: "盘子小，靶子也小。等你摸清了水有多深再决定要不要加码。",
        base: 0.68, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "CUN", w: 0.25 }],
        cost: { fun: 1.75 },
        outcomes: {
          crit: out("小盘子运转得意外地好：钱干净、账清楚、每次助选都挑得准。三年后回头看，这个不起眼的开局比任何大干一场都稳。",
            { rep: 0.8, voters: { diehard: 600 }, fac: { establishment: 8, base: 5 }, contact: { lobbyist: 10 }, flags: ["pac_leader"] }),
          ok: out("招牌挂上了，通道通了。第一年它替三个地方选举送了钱，也替你攒了三个人情。",
            { rep: 0.4, fac: { establishment: 5, commercial: 4 }, contact: { lobbyist: 7 }, flags: ["pac_leader"] }),
          meh: out("募款平平。委员会成了名片上的一行字，聊胜于无。",
            { rep: 0.1, contact: { lobbyist: 3 }, flags: ["pac_leader"] }),
          fail: out("低调没换来安全——第一份捐款申报就填错了一栏，罚金加整改，招牌蒙了灰。",
            { fun: -0.8, rep: -0.3, fac: { establishment: -4 } }),
          critfail: out("说客里有一个同时替三方管钱，你的「干净通道」被卷进了他的对账风波。你提前切割才全身而退，但招牌没保住。",
            { rep: -0.8, fac: { press: -8, commercial: -6, establishment: -6 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "sell_access", text: "把委员会变成门票：谁捐得多，谁见得到你",
        note: "来钱最快，也最像你在教科书里骂过的那种人。媒体对这种故事永远有胃口。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "attr", key: "INTG", w: -0.3 }],
        cost: { fun: 2.5 }, stake: { fav: true },
        outcomes: {
          crit: out("钱像水一样进来。你定好了规矩：只见、不承诺、不落笔。半年里你见的人比党内大佬还多，而每一步都擦着线却没越线。",
            { fun: 12.5, rep: 0.2, fac: { commercial: 16, establishment: 6, criminal: 4 }, contact: { lobbyist: 14 }, flags: ["pac_leader", "bought"] }),
          ok: out("门票生意做起来了。你见了一屋子想要东西的人，也记住了每一张脸想要什么——这些以后都是牌。",
            { fun: 6.5, fac: { commercial: 10 }, contact: { lobbyist: 10 }, flags: ["pac_leader", "bought"] }),
          meh: out("赚了钱，见了人，但「见面的价码」这个说法开始在圈子里流传。",
            { fun: 3.5, rep: -0.2, fac: { commercial: 6, press: -4 }, flags: ["pac_leader", "bought"] }),
          fail: out("一位捐了大钱的先生在见面后三天拿到了一份合同。时间线太过好看，记者把它画成了一张图表。",
            { rep: -0.8, fac: { press: -10, commercial: 4 }, flags: ["scandal_2", "pac_leader"] }),
          critfail: out("门票的价目表被人录了音。那段录音在电视上放了一周，在网络上传了一年。你成了「明码标价」这个词的配图。",
            { rep: -1.5, voters: { warm: -3000, oppose: 2000 }, fac: { press: -14, base: -12, commercial: 6 }, flags: ["scandal_4", "tape_out", "investigation_open"] })
        }
      },
      {
        id: "refuse_pac", text: "不立盘子：继续借党的机器",
        note: "保底选项。把钱和麻烦一起留在门外，代价是你继续排队。",
        base: 0.72, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: out("你拒绝了。党内大佬听说了这件事，单独约你吃了一次饭——不是每个人都敢把送到手里的刀推开。你的位置反而往前挪了半步。",
            { rep: 0.7, fac: { establishment: 12, base: 5 }, contact: { lobbyist: 4 } }),
          ok: out("不立盘子，机器照用。你少了一件武器，也少了一堆需要每天盯的账。",
            { rep: 0.2, fac: { establishment: 6 } }),
          meh: out("你拒绝了，说客们转头把方案卖给了你的同僚。三个月后那把刀立了起来，刀口朝着你这边。",
            { rep: -0.1, fac: { establishment: 3 } }),
          fail: out("没有自己的盘子，你在党内的话语权开始打折——机器给谁用，从来是看谁能让机器更值钱。",
            { rep: -0.4, fac: { establishment: -4, base: -3 } }),
          critfail: out("你拒绝的话被添油加醋地传成了「他瞧不起搞钱的人」。整个募款圈对你关了半扇门，日子突然紧了很多。",
            { rep: -0.7, fun: -1.25, fac: { commercial: -12, establishment: -5 } })
        }
      }
    ]
  },

  /* ==========================================================================
   * 5) 资金链断裂 —— 负责触发：G.fun < 50000
   * ======================================================================== */
  {
    id: "fin2_bankruptcy", era: FIN2_ERAS, tierMin: 0, tierMax: 5, weight: 12,
    grade: "major", valence: "bane", dyn: true, category: "finance",
    cond: function (G) { return G.fun < 50000; },
    title: "账上见底的那一天",
    body: "财务主管把最后一页报表推过来，上面只有一个加框的数字——比你觉得还能撑的数少了两位。\n" +
      "「房租下周到期，印刷厂要现结，还有两笔工资。」她一条一条念，\n" +
      "「先生，我们不是经营不善，我们是没钱了。这是两回事。」",
    brief: {
      lede: "破产不是因为做错了事，是因为该到账的钱没到。这更难受。",
      known: [
        "你会走到这一步，是因为三笔说好「月底到」的捐款同时黄了——其中一个捐款人进了医院，另两个在观望你的民调。",
        "债主们现在还没上门，是因为他们还不知道这个数字。这个信息差是你最后的资产。",
        "竞选拖欠工资是会上报纸的事——一旦见报，捐款会更进不来。死循环就是这样合拢的。",
        "最迟下周五，你必须拿出一个数字给团队看，任何数字。"
      ],
      rumor: [
        "有人说对手正在到处放话「他快撑不住了」，捐款人观望就是被这话吓的。",
        "有人说有个放贷的专门等这种时候——他的条件从来不只是利息。"
      ],
      unknown: [
        "团队里有几个人已经把简历更新了。",
        "如果你把实情告诉大家，会等来同舟共济，还是等来集体的下一站。"
      ],
      terms: [
        { k: "现金流", v: "不是赚多赚少的问题，是钱到账的日子和账单的日子对不对得上。" },
        { k: "信心崩塌", v: "政治捐款看的是你会不会赢。一旦传出你撑不住，钱会跑得比消息还快。" }
      ]
    },
    choices: [
      {
        id: "confess", text: "把实数字摊给全团队，请大家共渡",
        note: "不花钱，赌人心。人们可以接受穷，不能接受被骗。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.5 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: out("你把报表投影在墙上，一个数字一个数字地讲。散会时没人辞职——三个职员说「下月工资缓发」，你的竞选经理把自己的积蓄垫了进来。那晚办公室的灯亮到很晚，没人是在加班。",
            { fun: 1, rep: 0.9, fac: { base: 10, labor: 8 }, contact: { fixer: 6 } }),
          ok: out("大家接受了缓发，没人鼓掌，也没人走。队伍保住了，就保住了翻盘的本钱。",
            { fun: 0.5, rep: 0.4, fac: { base: 5, labor: 4 } }),
          meh: out("有人当场就走了，走的人什么也没说。剩下的人留下来了，但每个人看你的眼神都变了一点。",
            { rep: 0.1, fac: { labor: -3 } }),
          fail: out("实情第二天就上了网——走掉的那个人带走了故事。「某竞选团队发不出工资」比任何攻击广告都好用。",
            { rep: -0.8, voters: { warm: -1200 }, fac: { press: -8, base: -6 }, flags: ["scandal_2"] }),
          critfail: out("你召开了那次会，然后眼睁睁看着团队在四十八小时内散了一半，剩下的一半开始给自己找退路。你没有破产，你失去了让你有可能翻身的那群人。",
            { rep: -1.25, hp: -0.9, fac: { base: -12, labor: -8 }, flags: ["fallen"] })
        }
      },
      {
        id: "bridge_loan", text: "找那个放贷的：借一笔过桥的钱",
        note: "快捷、无问、有价。签过一次这种合同的人，都记得签字笔的重量。",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        stake: { fav: true },
        outcomes: {
          crit: out("钱当天到账，连一句多余的话都没有。你三个月内连本带利还清——他握着你的手说：「我就喜欢还不拖的人。」这一笔他没打算赚别的。",
            { fun: 2, contact: { shark: 10 } }),
          ok: out("过桥的钱到了，桥过了。利息高得吓人，但你活着走到了对岸。",
            { fun: 1.25, contact: { shark: 8 }, flags: ["owes_shark"] }),
          meh: out("他给了钱，但要了你未来助选名单上「三个职位」的第一拒绝权。你签了。",
            { fun: 0.8, contact: { shark: 5 }, flags: ["owes_shark", "compromised"] }),
          fail: out("利息、罚则、连带担保——条款一条比一条狠。你借到了钱，也把缰绳递了出去。",
            { fun: 0.7, rep: -0.3, contact: { shark: 4 }, flags: ["owes_shark", "compromised"] }),
          critfail: out("他还真来了——带着两个律师和一份「逾期则接管债务」的合同。账上见底第五天，你的竞选多了一个真正的老板。",
            { fun: 0.5, rep: -0.7, contact: { shark: 6 }, flags: ["owes_shark", "compromised", "black_money"] })
        }
      },
      {
        id: "shrink", text: "壮士断腕：裁掉一半人，保住核心",
        note: "花精力的外科手术。队伍小一半，但账立刻就能平。",
        base: 0.68, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "attr", key: "CUN", w: 0.2 }],
        cost: { ap: 2 },
        outcomes: {
          crit: out("你亲自裁，一个一个谈，遣散费给足、推荐信写好。留下的十二个人反而空前地紧——后来的很多年里，他们管那两周叫「我们的冬天」。",
            { fun: 0.3, rep: 0.6, fac: { base: 6, labor: 4 }, flags: ["lean_team"] }),
          ok: out("一半的人走了，账平了。竞选变慢了，但没死。",
            { fun: 0.2, rep: 0.2, fac: { labor: -3 }, flags: ["lean_team"] }),
          meh: out("裁得手忙脚乱，走了两个不该走的人。账是平了，阵脚也乱了。",
            { rep: -0.2, fac: { labor: -5 }, flags: ["lean_team"] }),
          fail: out("被裁的人里有会讲故事的那个。他的版本上了三家媒体：节省的成本，全变成了名声的窟窿。",
            { rep: -0.7, fac: { press: -8, labor: -8 }, flags: ["scandal_2"] }),
          critfail: out("裁员的名单被指「专裁忠于你的人、留溜须拍马的人」。你是在省成本，全城听到的却是清洗。核心团队保住了，你的信誉没保住。",
            { rep: -1, voters: { warm: -1500 }, fac: { base: -10, labor: -12 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "gamble_event", text: "孤注一掷：办一场免费入场的募款大会，赌它爆满",
        note: "保底选项，不花钱——花的全是你的嗓子。赌赢满血，赌输散场。",
        base: 0.42, mods: [{ src: "attr", key: "CHA", w: 0.55 }, { src: "attr", key: "INTG", w: 0.2 }],
        stake: { ap: true },
        outcomes: {
          crit: out("你站在借来的场地里讲了四十分钟，讲钱、讲窘境、讲为什么还要做下去。散场时捐款桶装不下了——第二天本地报纸的标题是《他自己把话说破了》。",
            { fun: 2.5, rep: 1, voters: { diehard: 800, warm: 1000 }, fac: { base: 10, press: 8 } }),
          ok: out("场子坐了七成，钱够撑两个半月。你把这一天讲给了以后遇见的每一个困难时刻。",
            { fun: 1.25, rep: 0.6, voters: { diehard: 300 }, fac: { base: 6 } }),
          meh: out("来的人不多，捐的钱刚够场地费。你至少确认了谁真的会来。",
            { fun: 0.3, voters: { diehard: 100 } }),
          fail: out("场子空了一半，对手的人还来拍了照。照片配的标题是《他的时代结束了》。",
            { rep: -0.7, voters: { warm: -800 }, fac: { press: -8, base: -5 }, flags: ["fallen"] }),
          critfail: out("你在台上讲到嗓子劈了，台下稀稀拉拉。第二天的报道只有一句：那位先生的募款会，到场的记者比支持者多。",
            { rep: -1.25, hp: -0.7, voters: { warm: -1800, oppose: 600 }, fac: { press: -10, base: -10 }, flags: ["fallen"] })
        }
      }
    ]
  }
]);
