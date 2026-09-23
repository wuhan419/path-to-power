/* ============================================================================
 * CONTENT · events/91-scandal-2.js
 * 【丑闻线·第二包】丑闻是账单 —— 之前赚的每一笔灰色收益，都会来结账。
 *
 * 这条线的三条规则：
 *   1) 丑闻不是天降横祸，是延迟支付的代价。挖坟队、录音带、旧账本，
 *      找上你的时机永远是你最经不起的时候 —— 但「为什么是我」永远有答案。
 *   2) 应对策略有真实的窗口期：否认只在证据链断掉时有效；
 *      切割的代价是你失去被切割那部分的价值；反诉是险棋，赢了翻盘输了加倍。
 *   3) 核心事件 sca2_coverup_choice 带 after 余波幕：硬扛 / 切割 / 反诉
 *      三条路各打一个标记，余波幕用 req.flag 分支 —— 怎么选的，就怎么读。
 * ==========================================================================*/

const SCA2_ERAS = Object.keys(POTUS.reg.era);

function s2Out(body, effects) { return { body: body, effects: effects || {} }; }

POTUS.define("event", [

  /* ==========================================================================
   * 1) 挖坟队盯上了你的大学时代
   * ======================================================================== */
  {
    id: "sca2_opposition_research", era: SCA2_ERAS, tierMin: 0, tierMax: 5, weight: 11,
    grade: "minor", valence: "bane", dyn: true, category: "scandal",
    title: "有人在翻你的大学年鉴",
    body: "竞选部的实习生发现有人在校友会办公室查过你的旧档案。\n" +
      "不是记者 —— 记者会直接打电话来。这是一家「研究公司」，\n" +
      "而你的大学时代，有几页你自己都不太愿意重读。",
    brief: {
      lede: "对手在翻你的大学旧档，而你先知道了——他们不知道。",
      known: [
        "你大学做过几件会被标题化的事，不是犯罪，但会被放大。",
        "挖坟公司按页付钱，从年鉴翻到毕业名册，已有几条线索。",
        "他们找到也不会立刻用，会等到你最经不起的那一周。"
      ],
      rumor: [
        "据说这公司上次让一位众议员初选前两周退了选。",
        "据说抢先否认本身会告诉对方哪一页是真的。"
      ],
      unknown: [
        "他们翻到的是传闻还是复印件。",
        "先讲掉算坦白，还是算「还有这事」。"
      ],
      terms: [
        { k: "挖坟队", v: "对手雇来翻候选人旧记录的研究公司。" }
      ]
    },
    choices: [
      {
        id: "confess", text: "抢先坦白：在采访里自己把旧事讲掉",
        note: "赌的是：选民讨厌被 surprise 甚于讨厌那件事本身。你自己说了就是「坦白」，被别人挖出来就是「丑闻」。风险：如果本来他们什么关键证据都没拿到，你等于主动把地图交了出去。",
        base: 0.52, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "INTG", w: 0.25 }],
        cost: { ap: 1 },
        outcomes: {
          crit: s2Out("你在一次关于教育的访谈末尾轻描淡写地讲了那件旧事，主持人愣了两秒，然后笑了。三个月后挖坟公司的报告送到对手桌上时，上面写着一句注脚：「已失效 —— 本人先讲过了。」",
            { rep: 2, fac: { base: 8, press: 6 }, flags: ["sca2_confessed"] }),
          ok: s2Out("你讲了。地方版第二天登了两段，没有后续。旧事在成为武器之前就哑了火。",
            { rep: 0.8, fac: { base: 4 }, flags: ["sca2_confessed"] }),
          meh: s2Out("你讲了，但讲得含糊。记者顺着你的含糊又查了两周，什么都没查到 —— 可你的含糊被记下来了。",
            { rep: -0.4, hp: -1, flags: ["sca2_confessed"] }),
          fail: s2Out("你的坦白给了对手一个具体的方向。他们原本只有传闻，现在知道该去哪个系馆查了。",
            { rep: -1.5, fac: { press: -5 }, flags: ["scandal_1"] }),
          critfail: s2Out("你坦白的版本和校报档案里的版本差了三个细节。第二天两家都登了出来 —— 现在丑闻不是那件旧事，是你为什么撒谎。",
            { rep: -3, fac: { press: -10, base: -6 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "preempt", text: "反查是谁在搞你：把挖坟变成对手的丑闻",
        note: "赌的是：找到委托人之后你可以选择「曝光他」或「递个话让对方停手」。查得到就反客为主，查不到就是白花几万块暴露了你很慌。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        cost: { fun: 2.25, ap: 1 },
        outcomes: {
          crit: s2Out("一周后你拿到了一张汇款凭证的复印件：委托人是对手竞选委员会的一位顾问。你没有声张 —— 你只是让一位专栏作家「碰巧」知道了。挖坟的事从此没人再提。",
            { rep: 1.5, fac: { press: 8, establishment: 4 }, flags: ["sca2_oppo_hold"] }),
          ok: s2Out("你查到了那条线，但只查到中间人。也够了 —— 你托人递了句话，校友会办公室的查档记录从此「遗失」。",
            { rep: 0.8, fac: { establishment: 3 }, contact: { fixer: 6 } }),
          meh: s2Out("你花了两万美元，查到那家公司注册在一家律所名下，而那家律所替半个城里的人办事。线索到此为止。",
            { hp: -1.5, contact: { fixer: 3 } }),
          fail: s2Out("你派去打听的人被认了出来。对手连夜把材料从「备用」移进了「主攻」文件夹。",
            { rep: -1.5, flags: ["scandal_1"] }),
          critfail: s2Out("你反查的动作被做成了另一份档案：「候选人雇私家侦探盯梢对手」。这份档案比你大学时代那几页好看得多 —— 对他们来说。",
            { rep: -2.75, fac: { press: -10, base: -8 }, flags: ["scandal_2", "investigation_open"] })
        }
      },
      {
        id: "pray", text: "什么也不做，照常过日子",
        note: "赌的是：大多数挖坟报告最后都躺在抽屉里没被用——对手忙着打选战，没空处理你的大学破事。但如果他们真挖到了什么，你完全没有准备过任何版本的回应。",
        base: 0.64, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: s2Out("两个月后初选结束了，对手败选，那份报告随竞选委员会一起解散。你至今不知道他们翻到了什么。",
            { rep: 1.25, fac: { base: 3 } }),
          ok: s2Out("没有下文。也许是没挖到，也许是留着以后用 —— 你把这些页从脑子里划掉了。",
            { rep: 0.4 }),
          meh: s2Out("没有下文，但你此后每次接受采访前都会多背一遍自己大学的年表。这不算活着，只能算没死。",
            { hp: -1.5 }),
          fail: s2Out("竞选后期，一篇不起眼的小稿引用了「据知情人士」。不指名，但足够让懂的人懂了。",
            { rep: -1.25, fac: { base: -4 }, flags: ["scandal_1"] }),
          critfail: s2Out("投票日前十一天，全部材料被装订成册寄给了三家报纸。你没有准备过任何一个版本的回应 —— 连「无可奉告」都说得结结巴巴。",
            { rep: -3, voters: { warm: -1200, oppose: 600 }, flags: ["scandal_2"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 2) 私下场合的话被录了音
   * ======================================================================== */
  {
    id: "sca2_leak_pod", era: SCA2_ERAS, tierMin: 1, tierMax: 5, weight: 10,
    grade: "mid", valence: "bane", dyn: true, category: "scandal",
    title: "有人录下了你私下说的话来勒索你",
    body: "那天晚上是在一个朋友家的书房里，在座的你全认识。\n" +
      "你说了一段话 —— 关于选民、关于金钱、关于你真正怎么看那件事。\n" +
      "说得很痛快。现在有人把那段痛快装在一件东西里，寄给了你：\n" +
      "没有署名，只有一句话：「你觉得它值多少？」",
    brief: {
      lede: "录你的人要的不是正义，是你在此之前每一分的配合。",
      known: [
        "那段话单独看是断章，连前后听完才最致命。",
        "书房里在场的除了你只有三个人，录你的就在其中。",
        "录音一旦流通就收不回：你买到的只是第一份。"
      ],
      rumor: [
        "据说同一段录音上周在两个中间人手里出现过。",
        "据说上一个付了钱的人，三个月后第二封信又来了。"
      ],
      unknown: [
        "录你的人要的是钱、要挟，还是长期听话。",
        "三个在场者里，是哪只口袋你还不敢确定。"
      ],
      terms: [
        { k: "断章", v: "剪掉语境的一小段话。" },
        { k: "买断", v: "花钱换母带，换不回翻录的每一盘。" }
      ]
    },
    choices: [
      {
        id: "ownit", text: "抢先公开：自己把录音和前后文一起放出去",
        note: "自杀式排雷 —— 剥夺对方引爆的乐趣，把断章变回全文。赌你的支持者听完上下文之后还站在你这边。",
        base: 0.46, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        cost: { ap: 2, rep: 0.6 },
        outcomes: {
          crit: s2Out("你在记者会上放了完整录音，然后自己先把最难听的那几句逐条回应了。当晚的评论是：「狼狈，但干净。」勒索者手里的东西在一夜之间变成了废塑料。",
            { rep: 1.5, fac: { press: 10, base: 8 }, flags: ["sca2_own_voice"] }),
          ok: s2Out("录音你自己放了。挨了十天骂，然后舆论发现了更有意思的事。你活着，带着一句跟很久的外号。",
            { rep: 0.6, fac: { press: 5, base: -4 }, flags: ["sca2_own_voice"] }),
          meh: s2Out("你放了，但剪过的版本已经先跑了一周。你的完整版没人听 —— 大家只记得标题。",
            { rep: -0.6, fac: { press: 3 }, flags: ["scandal_1"] }),
          fail: s2Out("完整录音里还有第二段你忘了的更糟的话。你亲手给对方补了弹药。",
            { rep: -1.5, fac: { press: -8, base: -6 }, flags: ["scandal_2"] }),
          critfail: s2Out("你在回应时说「我私下确实这么想」——这句话被单独剪出来，比原录音致命十倍。你的诚实成了你的罪证。",
            { rep: -2.5, voters: { warm: -2000, oppose: 1200 }, flags: ["scandal_3"] })
        }
      },
      {
        id: "buy", text: "买断：付钱，拿母带",
        note: "买得来这盘买不来记忆。而且这笔支出本身 —— 一笔说不清用途的钱 —— 是下一个丑闻的种子。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        cost: { fun: 4 }, stake: { fun: true },
        outcomes: {
          crit: s2Out("中间人收钱、交带、当面消磁，流程熟练得像做过一百次。你从此对每一间书房里的每一件电器保持礼貌的警觉。",
            { attr: { CUN: 2 }, fac: { commercial: 3 }, flags: ["sca2_tape_bought"] }),
          ok: s2Out("母带到手了。你把它锁进保险箱，然后开始等 —— 等第二封信，或者等它永远不来。",
            { attr: { CUN: 1 }, flags: ["sca2_tape_bought", "compromised"] }),
          meh: s2Out("钱付了，带子拿到手 —— 是翻录的。母带在谁那里，对方没说。",
            { hp: -1, flags: ["compromised"] }),
          fail: s2Out("付钱这件事被记下来了。现在你有两个秘密：那段话，和为了盖住那段话的这笔转账。",
            { rep: -1, flags: ["compromised", "scandal_1"] }),
          critfail: s2Out("「候选人向不明身份者支付封口费」—— 这个标题比原录音劲爆十倍，而且财务披露表上有你的签名。你花钱买来了更大的丑闻。",
            { rep: -2.25, flags: ["scandal_3", "investigation_open"], fall: 1 })
        }
      },
      {
        id: "deny", text: "冷处理：不回应，不承认，照常出席每一场活动",
        note: "勒索者的本钱是你的慌。你的日程表继续排满，比任何声明都更能证明这段录音不重要。",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "attr", key: "INTG", w: 0.2 }],
        outcomes: {
          crit: s2Out("你照常剪彩、照常聚餐、照常在电视上讲你的议题。三周后勒索者等不下去了，把带子白送给一家小报 —— 编辑听完觉得「不够劲」，进了抽屉。",
            { rep: 0.6, fac: { base: 4 } }),
          ok: s2Out("没有下文。也许它在等一个更好的时机 —— 但至少这个月不是。",
            { rep: 0.2 }),
          meh: s2Out("你装作无事，但每次进有人的房间都会下意识找那只音箱。这种活法很贵。",
            { hp: -1 }),
          fail: s2Out("带子流出去了，剪得只剩四十秒。你的沉默被读成了默认。",
            { rep: -1.25, fac: { press: -6, base: -5 }, flags: ["scandal_2"] }),
          critfail: s2Out("你沉默的那三周里，对手把它做成了广告，在三个选区轮播。等你终于开口，人们问的第一个问题是：为什么现在才说？",
            { rep: -2, voters: { warm: -1800, oppose: 1000 }, flags: ["scandal_3"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 3) 家人惹祸
   * ======================================================================== */
  {
    id: "sca2_family_member", era: SCA2_ERAS, tierMin: 0, tierMax: 5, weight: 10,
    grade: "mid", valence: "bane", dyn: true, category: "scandal",
    title: "凌晨两点的保释电话",
    body: "你弟弟在郊区被拦下来了。酒驾，车里还坐着一个你竞选金主的儿子。\n" +
      "按程序他会在天亮前被保释 —— 按程序这件事也会出现在明天的地方版上。\n" +
      "他在电话里只说了一句话：「哥，别告诉妈。」\n" +
      "你握着电话，想起他为你做过的每一次站台、每一块标语牌。",
    brief: {
      lede: "你可以救他、切割他，或陪他挨这一刀。三条路都通向明天的报纸。",
      known: [
        "找上你是因为你的姓——他如今是「候选人的家属」。",
        "他不是第一次了；上次邻县的记录花钱按过。",
        "车上那金主的儿子，他父亲正在给你写支票。"
      ],
      rumor: [
        "据说邻县那次的记录没销掉，一查就有。",
        "据说他最近向你一位幕僚借过钱，数目不小。"
      ],
      unknown: [
        "切割公告一发，感恩节餐桌就回不去了。",
        "他会感激你，还是认定你欠他。"
      ],
      terms: [
        { k: "家属丑闻", v: "家人惹祸，回应越快杀伤越小。" },
        { k: "切割声明", v: "公开与家人划清界限的公告。" }
      ]
    },
    choices: [
      {
        id: "fix", text: "连夜捞人：找个中间人把这件事在天亮前按住",
        note: "钱和人情能摆平警局，摆不平警局的值班记录。按下去的东西不会消失，只会改天再来 —— 带利息。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "criminal", w: 0.2 }],
        cost: { fun: 1.75, ap: 1, fav: 1 },
        outcomes: {
          crit: s2Out("天亮前，这次拦截变成了一次「口头警告」。地方版的记者睡了个好觉。那位中间人只说了一句：「下不为例 —— 我是说你的电话，不是他。」",
            { attr: { CUN: 2 }, contact: { fixer: 10 }, flags: ["sca2_family_hidden"] }),
          ok: s2Out("按住了。报上没有名字，只有一个「郊区拦停」的简讯。你弟弟欠你的，从今天起换了一种记法。",
            { attr: { CUN: 1 }, contact: { fixer: 6 }, flags: ["sca2_family_hidden", "compromised"] }),
          meh: s2Out("名字按住了，程序没按住：他被吊销驾照九十天，而你多了一个知道你全部底细的中间人。",
            { hp: -0.8, contact: { fixer: 4 }, flags: ["sca2_family_hidden"] }),
          fail: s2Out("有人把「候选人弟弟被特殊处理」的风声递给了报社。新闻的主角从酒驾变成了特权。",
            { rep: -1.25, fac: { press: -8, base: -5 }, flags: ["scandal_2"] }),
          critfail: s2Out("按住这次拦截的动作成了案件本身。地区检察官立案调查的不是酒驾，而是妨碍司法 —— 被调查的人是你。",
            { rep: -1.75, flags: ["scandal_3", "investigation_open"] })
        }
      },
      {
        id: "cut", text: "发切割声明：他是成年人，为自己的行为负责",
        note: "最像「领导力」的选项，也是最冷的一个。选民会点头，你的母亲不会。",
        base: 0.58, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "press", w: 0.25 }],
        outcomes: {
          crit: s2Out("声明写得干净利落：他成年，他负责，你爱他但你不干预程序。评论员称赞你「划清了公私」，金主的那张支票如期寄到。",
            { rep: 1, fac: { press: 6, establishment: 6, commercial: 4 }, contact: { brother: -12 } }),
          ok: s2Out("声明发了，风波两天就过。你在家族里的位置也变了 —— 从「家里的骄傲」变成「家里那个狠的」。",
            { rep: 0.4, fac: { establishment: 4 }, contact: { brother: -8 } }),
          meh: s2Out("声明发了。没人夸你，也没人骂你 —— 大家只是记住了你的弟弟坐过警车，还有你不救他。",
            { rep: -0.2, contact: { brother: -6 } }),
          fail: s2Out("切割切割得太快了。照片里他独自走出警局的背影，配上你的声明，像一个段子在网上传了一周。",
            { rep: -1, fac: { base: -6, press: -4 }, contact: { brother: -10 } }),
          critfail: s2Out("他接受了一个电台采访，讲了你们家的另一套版本 —— 包括小时候谁替谁挨的打。切割你的人被反切割，而且用的是眼泪。",
            { rep: -1.75, voters: { warm: -1500 }, contact: { brother: -16 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "stand", text: "陪他出庭，一起去面对镜头",
        note: "把他当家人而不是当麻烦。选民里有一半人会为这个动容 —— 另一半会记下你的车牌。",
        base: 0.54, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: s2Out("你站在他身边认了错、交了罚款、说了一句「我家的事我家担」。那张兄弟同框的照片第二天登在头版，配的标题意外地温和。",
            { rep: 1.25, fac: { base: 8, church: 4 }, contact: { brother: 12 } }),
          ok: s2Out("你陪他走完了程序。有人骂你作秀，更多人只是看见一个人站在自己弟弟旁边。",
            { rep: 0.6, contact: { brother: 8 } }),
          meh: s2Out("你陪了他，新闻还是新闻。他在庭上小声说了句谢，你觉得值。",
            { rep: 0.2, contact: { brother: 5 } }),
          fail: s2Out("同框的照片把你和「酒驾」两个字钉在了同一块版面上，整整一周。金主的支票没有来。",
            { rep: -1, fac: { commercial: -8, base: -4 }, contact: { brother: 6 } }),
          critfail: s2Out("庭审时邻县那次旧记录被当庭翻出 —— 原来根本没销掉。「屡犯」加上「家属特权」，两条线一起烧到你身上。",
            { rep: -1.75, flags: ["scandal_2", "investigation_open"], contact: { brother: 3 } })
        }
      }
    ]
  },

  /* ==========================================================================
   * 4) 旧账清算日 —— shady_start / bought 标记的「结账」
   * ======================================================================== */
  {
    id: "sca2_old_receipt", era: SCA2_ERAS, tierMin: 1, tierMax: 5, weight: 9,
    grade: "major", valence: "bane", dyn: true, category: "scandal", unique: true,
    flags: ["shady_start"],
    title: "有人拿你十年前的灰色启动资金来敲诈",
    body: "信封里是一张复印件：十年前的支票存根、一个你几乎忘了的账号、\n" +
      "还有用红笔圈出来的一个数字 —— 你当年拿过的那笔。\n" +
      "寄信人不是记者，不是检察官，是一个你此刻才想起来还活着的名字。\n" +
      "他只附了一行字：「当年说好的，不是这个价。」",
    brief: {
      lede: "你在起点拿过的每一分钱，都写在这一页上。现在它到期了。",
      known: [
        "你从一笔灰色启动资金起家，放钱的人手里留着一页底。",
        "寄信人是当年的中间人；放钱的人已死，账簿在他手上。",
        "他要两层：一笔「保管费」，和一个照旧口径的承诺。",
        "存根一到记者手里，被翻出的不止这一笔。"
      ],
      rumor: [
        "据说这本账在他手里放了七年，就等最值钱的时机。",
        "据说照旧口径说的人，如今在另一个州当官。"
      ],
      unknown: [
        "复印件到底有几份在流通。",
        "你照他口径说，就成了拴住你的第二根绳子。"
      ],
      terms: [
        { k: "旧口径", v: "当年统一好的说法，也是破绽。" },
        { k: "清算日", v: "灰色收益的到期日，利息是服从。" }
      ]
    },
    choices: [
      {
        id: "pay", text: "付保管费，照旧口径说",
        note: "把这一页买回去，把话也认下来。你保住起点，代价是从此他的每一句话你都得听 —— 而且你成了那套口径的新担保人。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        cost: { fun: 2, fav: 1 }, stake: { fun: true },
        outcomes: {
          crit: s2Out("钱付了，口径认了。他守信得像个银行家：存根归你，账簿上你的那一页从此是空白。你烧掉存根的时候想，这大概是这个行当里唯一的体面结局。",
            { fac: { criminal: 5 }, notFlags: ["shady_start"], flags: ["compromised", "sca2_settled"] }),
          ok: s2Out("成交。你买回了这一页，也买回了一个长期的主人。他说「下次联系」的时候，语气像在约一场高尔夫。",
            { flags: ["compromised", "sca2_settled"] }),
          meh: s2Out("钱付了，他没给存根 —— 给了一份「副本已被销毁」的书面保证。那张纸如果是假的，你连证据都没有。",
            { hp: -0.6, flags: ["compromised", "sca2_settled"] }),
          fail: s2Out("他收了钱，转手把存根卖给了记者 —— 一鱼两吃是这个行当的传统。现在你既丢了钱，又丢了那页纸。",
            { rep: -0.9, fac: { press: -10 }, flags: ["scandal_2", "compromised"] }),
          critfail: s2Out("「候选人向证人支付封口费并串供」—— 检察官的起诉书里就是这么写的。你买口的每一分钱都成了新的罪证。",
            { rep: -1.25, flags: ["scandal_4", "investigation_open"], fall: 1 })
        }
      },
      {
        id: "flip", text: "反手把他连同账簿一起交给检方",
        note: "把旧账变成自首。你交出起点，换一张污点证人的门票 —— 罪减一等，但「那个交代了一切的人」这个身份跟一辈子。",
        base: 0.44, mods: [{ src: "attr", key: "INTG", w: 0.35 }, { src: "attr", key: "INT", w: 0.3 }],
        cost: { ap: 2, rep: 0.6 },
        outcomes: {
          crit: s2Out("你带着律师走进联邦大楼，交出了你知道的一切。三年后他因敲诈和妨碍司法入狱，而你 —— 因为是第一个开口的 —— 得到了一份不起诉协议。你的旧账成了历史，你的证词成了判例。",
            { rep: 1, fac: { agency: 14, press: 8, establishment: -8 }, notFlags: ["shady_start"], flags: ["whistleblower", "sca2_settled"] }),
          ok: s2Out("你交了。他进去了，你也进了一段漫长的「配合调查」。出来的时候你的选区还在 —— 有一部分人甚至在门口等你说完那段往事。",
            { rep: 0.4, fac: { agency: 8, establishment: -10 }, notFlags: ["shady_start"], flags: ["sca2_settled"] }),
          meh: s2Out("你交了，检方却更想要大鱼：他们要你继续戴着窃听器去见他。你从此活在两面派的每一天里。",
            { hp: -0.9, fac: { agency: 5 }, flags: ["compromised"] }),
          fail: s2Out("账簿是假的 —— 是他伪造来钓你的。你的「自首」成了唯一的真实证据。你亲手把起点交给了检察官。",
            { rep: -1, flags: ["scandal_3", "investigation_open"] }),
          critfail: s2Out("你在笔录里说的一句谎话被拆穿 —— 就一句。整个合作协议作废，你从污点证人变回嫌疑人，而且是「撒谎的那个」。",
            { rep: -1.5, flags: ["scandal_4", "investigation_open"], fall: 2 })
        }
      },
      {
        id: "ride", text: "不理他：让他去寄，看谁先死",
        note: "他手里那页纸烧你，也烧所有上过那本账簿的人 —— 包括比你有分量得多的人。赌的是那些人比你更想让账簿消失。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: s2Out("你没动。两周后，他「心脏病突发」死在一家汽车旅馆，账簿从此下落不明。你没问，也没人告诉你。你只是在那天晚上多坐了一会儿，给自己倒了一杯，然后去洗了碗。",
            { rep: 0.4, fac: { criminal: 8 }, notFlags: ["shady_start"], flags: ["sca2_settled"] }),
          ok: s2Out("你没动，也没人来找你。三个月后有消息说账簿「遗失」了 —— 那本账簿上别的名字，显然比你值钱。",
            { rep: 0.1, fac: { criminal: 3 }, notFlags: ["shady_start"] }),
          meh: s2Out("僵住了。存根没出现，人也没消失。你们像两个都举着枪的人，从此谁也不能先眨眼。",
            { hp: -0.7, flags: ["compromised"] }),
          fail: s2Out("他真的寄了。记者把那条线头抽了出来，你的起点被完整地写成了三个版面。",
            { rep: -1, fac: { press: -10, establishment: -8 }, flags: ["scandal_3", "investigation_open"] }),
          critfail: s2Out("账簿交到了检察官手上 —— 全本。你的那一页只是其中最不起眼的一页，但「你的那一页」成了启动整个案子的第一份证据。",
            { rep: -1.5, flags: ["scandal_4", "investigation_open"], fall: 2 })
        }
      },
      {
        id: "clean", text: "先把钱连本带利还回去 —— 还给当初真正的受害者",
        note: "只有真正收过「那位金主」的钱的人才懂这条路：不还给他，还给这笔钱最初伤害过的人。这是唯一一条不欠任何人的路。",
        base: 0.42, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "base", w: 0.2 }],
        cost: { fun: 2.5, ap: 2 }, req: { flag: "bought" },
        outcomes: {
          crit: s2Out("你查了三个月，查清那笔钱最初是从谁身上刮下来的，然后通过一家信托匿名还了回去 —— 本金加十年的利息。存根还在他手上，可当一个记者后来拿到它来问你时，你把信托的记录放在了桌上。那篇报道的标题是关于救赎的。",
            { rep: 1.25, fac: { base: 12, press: 8, church: 6 }, notFlags: ["shady_start", "bought"], flags: ["sca2_settled"] }),
          ok: s2Out("还了。钱到了该到的人手里，你从此夜里睡得着。存根成了一页废纸 —— 一个你已经还清的债，能翻出什么风浪呢。",
            { rep: 0.7, fac: { base: 8 }, notFlags: ["shady_start", "bought"], flags: ["sca2_settled"] }),
          meh: s2Out("还了，但找到的「受害者」对不对，你始终没有十足把握。你尽了力 —— 这四个字你自己信就够了。",
            { rep: 0.2, fac: { base: 4 }, notFlags: ["shady_start"], flags: ["sca2_settled"] }),
          fail: s2Out("还款的转账被查了：一大笔来历不明的支出，收款方说不清。你没洗白旧账，只是给它加了一个新注脚。",
            { rep: -0.7, flags: ["investigation_open"] }),
          critfail: s2Out("你自以为的「受害者」是对方安排的一出戏 —— 钱转了一圈，回到他手里，多了一张你自愿付款的凭证。你的良心被明码标价地卖了第二次。",
            { rep: -1, flags: ["scandal_3", "compromised"], fall: 1 })
        }
      }
    ]
  },

  /* ==========================================================================
   * 5) 丑闻应对的十字路口（本包核心，major，flags: scandal_2 触发）
   * ======================================================================== */
  {
    id: "sca2_coverup_choice", era: SCA2_ERAS, tierMin: 1, tierMax: 5, weight: 12,
    grade: "major", valence: "bane", dyn: true, category: "scandal", unique: true,
    flags: ["scandal_2"],
    title: "丑闻压不住了，你有四十八小时选一条应对的路",
    body: "那件事压不住了。主编室里已经排好了版，律师的电话在桌上震动，\n" +
      "竞选经理站在窗前背对着你，问了一个你现在必须回答的问题：\n" +
      "「我们到底走哪条路？」\n" +
      "否认的窗口还开着 —— 但你不知道开到几点。",
    brief: {
      lede: "否认、切割、反诉。三条路都有人走完过，也有人死在路上。",
      known: [
        "你手上有一件压不住的事，不是今天发生，是今天到期。",
        "否认有窗口期：到证据链补全为止，可能四十八小时。",
        "切割的数学很诚实：扔出去的人要够大，否则只是延时。",
        "反诉唯一能翻盘，也唯一会加倍——你同时交出自家案卷。"
      ],
      rumor: [
        "据说主编手里只有一半材料，在赌你自己供出另一半。",
        "据说对手阵营里也有人在这事上不干净。"
      ],
      unknown: [
        "对方证据链缺的那环，此刻在谁手里。",
        "你今天选的路，两年后以哪张账单寄回。"
      ],
      terms: [
        { k: "否认窗口", v: "指控公开到硬证据落地之间的时间。" },
        { k: "切割", v: "把责任推给下属或家人。" }
      ]
    },
    choices: [
      {
        id: "hold", text: "硬扛到底：否认、拖延、等他们先犯错",
        note: "不后退一步。赌证据链断在那关键的一环上。硬扛赢了的人从此有铜墙铁壁 —— 输了的人连道歉的机会都没有。",
        base: 0.48, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: s2Out("你咬死了「查无此事」四个字，天天照常上班。三周后，对方的「关键证人」被发现拿过两家阵营的钱，整篇报道被撤回。你的铜墙是从这一次硬扛里铸出来的。",
            { rep: 1.25, fac: { base: 10, press: 6 }, notFlags: ["scandal_2"], flags: ["sca2_hold"] }),
          ok: s2Out("扛过去了。没有撤回，也没有实锤 —— 那件事以「有争议」的名义挂在你的维基页面第三段，但你的任期没断。",
            { rep: 0.3, flags: ["sca2_hold"] }),
          meh: s2Out("扛成了拉锯战。每周一个新说法，你的议程从此只剩这一件事。",
            { rep: -0.2, hp: -0.6, flags: ["sca2_hold"] }),
          fail: s2Out("窗口关了：那份你赌它不存在的文件，出现在了第二个记者的邮箱里。你的第一句否认现在成了罪状第一条。",
            { rep: -1, fac: { press: -10, base: -6 }, flags: ["scandal_3", "sca2_hold"] }),
          critfail: s2Out("证据链完整闭合的那天晚上，你的党连夜发声明「视情况发展」。你不是被指控打倒的 —— 你是被自己的第一句否认打倒的。",
            { rep: -1.75, fac: { press: -14, establishment: -12, base: -8 }, flags: ["scandal_5", "sca2_hold"], fall: 1 })
        }
      },
      {
        id: "cut", text: "切割：把责任交给该负责的人，公开、彻底、当天",
        note: "让故事改姓。你交出一个够大的人，换自己的名字从标题里下来 —— 代价是他知道你全部的事，而他现在恨你。",
        base: 0.56, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "attr", key: "CUN", w: 0.25 }],
        cost: { ap: 1, fav: 1 },
        outcomes: {
          crit: s2Out("你当天开了发布会，把时间线、签名、责任一层一层摆清楚，末了说：「错在他的职务范围，错在我的信任。」第二天头条换了主角。你失去了一位十年的老部下，保住了剩下的一切。",
            { rep: 0.7, fac: { press: 8, establishment: 6 }, notFlags: ["scandal_2"], flags: ["sca2_cut"] }),
          ok: s2Out("切了。故事确实改了姓，但每个跑这条线的记者都记得：被切掉的那个人，办公桌离你只有十步。",
            { rep: 0.1, flags: ["sca2_cut"] }),
          meh: s2Out("切了，切小了。故事的主角还是你，只是多了一个「已辞职」的注脚。你白白扔掉了一个替身。",
            { rep: -0.4, flags: ["sca2_cut"] }),
          fail: s2Out("他不接受这个安排。四十八小时内他带着自己的律师和自己的时间线上了电视 —— 现在是两个人对质，而你多了「甩锅」这个新罪名。",
            { rep: -1, fac: { press: -8, establishment: -6 }, flags: ["scandal_3", "sca2_cut"] }),
          critfail: s2Out("切割的邮件往来被完整曝光：连辞职信的措辞都是你办公室的人代拟的。「导演了一场假辞职」成了压垮你的最后一层标题。",
            { rep: -1.5, flags: ["scandal_4", "investigation_open", "sca2_cut"], fall: 1 })
        }
      },
      {
        id: "counter", text: "反诉：把爆料者和对手一起拖上法庭",
        note: "险棋中的险棋。进攻是最好的防守 —— 前提是你的案子比对方的干净。翻开对方案卷的同时，你自己的也进了同一个法官的抽屉。",
        base: 0.42, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "INT", w: 0.25 }, { src: "fac", key: "establishment", w: 0.2 }],
        cost: { fun: 1.75, ap: 2 }, stake: { fun: true },
        outcomes: {
          crit: s2Out("你的律师在取证阶段就挖出了对方和竞选委员会之间的转账。诉讼反转成了新的丑闻 —— 别人的丑闻。你在台阶上读声明的那张照片，被用了整整一个任期。",
            { rep: 1.5, fac: { base: 12, press: 8 }, notFlags: ["scandal_2"], flags: ["sca2_counter"] }),
          ok: s2Out("案子立案了，热度从「你的丑闻」变成了「两家的战争」。你没赢，但你把刑场改成了擂台。",
            { rep: 0.6, flags: ["sca2_counter"] }),
          meh: s2Out("案子拖着，热度拖着，你的律师费也在拖。一年后和解，各方保密 —— 你的账面干净了，账里没有的东西还在。",
            { rep: 0.1, flags: ["sca2_counter", "compromised"] }),
          fail: s2Out("法官驳回了你的大部分诉求，连带把你的案卷并进了对方的证据。反诉成了自诉：你在法庭上亲手补全了自己的证据链。",
            { rep: -1.25, fac: { press: -8 }, flags: ["scandal_3", "investigation_open", "sca2_counter"] }),
          critfail: s2Out("你指控对方伪造的那份文件，被鉴定为真。反诉、伪证、干扰司法 —— 三项一起立案。你不光输掉了原来的案子，你还亲手给它加了刑期。",
            { rep: -1.75, flags: ["scandal_5", "investigation_open", "sca2_counter"], fall: 2 })
        }
      }
    ]
  },

  /* ==========================================================================
   * 5b) 十字路口的余波 —— 三条路，三种账单（req.flag 分支）
   * ======================================================================== */
  {
    id: "sca2_coverup_after", era: SCA2_ERAS, tierMin: 1, tierMax: 5, weight: 11,
    grade: "mid", valence: "bane", dyn: true, category: "scandal", unique: true,
    after: { id: "sca2_coverup_choice", minMonthsAfter: 6, maxMonthsAfter: 36 },
    title: "当初选的那条路，现在寄来了账单",
    body: "当初那件事有了结局 —— 或者说，有了第一版结局。\n" +
      "你以为账已经结了。今天寄到的是利息。\n" +
      "寄账单的人各不相同，但账单的抬头都是同一行：\n" +
      "你在那四十八小时里选的那条路。",
    brief: {
      lede: "每一条路都有余波。余波不是惩罚，是那条路的续费。",
      known: [
        "当初选的路，决定今天来敲门的是谁。",
        "第一版结局从来不是最终版。",
        "你要决定的不是那件事，是往后按哪个版本说。"
      ],
      rumor: [
        "有人在收集所有版本的说法，用途不明。",
        "据说当年双方都有不想见光的份。"
      ],
      unknown: [
        "定稿那一版会不会有你没料到的一句话。",
        "按哪个版本说话的成本，多年后才看得清。"
      ],
      terms: [
        { k: "续费", v: "被按下事件的维护成本，隔几年付一次。" }
      ]
    },
    choices: [
      {
        id: "after_hold", text: "把当初扛住的版本，讲成一以贯之的立场",
        req: { flag: "sca2_hold" },
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: s2Out("你在回忆录里用了一整章写那四十八小时，逐日、逐小时，没有一个字改口。连当年不信你的人也承认：不管真假，这份稳定本身就是一种政治资产。",
            { rep: 1.75, fac: { base: 8, press: 5 }, flags: ["sca2_owned"] }),
          ok: s2Out("你把那套说法又讲了一遍，讲熟了。老故事没有新版就慢慢凉了。",
            { rep: 0.6, flags: ["sca2_owned"] }),
          meh: s2Out("版本没变，但每次重讲都要多圆两个漏洞。你算过：照这个速度，再过十年就圆不动了。",
            { rep: -0.2, hp: -0.8 }),
          fail: s2Out("有人终于补上了那一环证据。你没有新说法可讲 —— 因为旧说法你已经讲死了。",
            { rep: -1.5, flags: ["scandal_3"] }),
          critfail: s2Out("一份内部录音显示你当年私下说过「那件事是真的」。公开的否认、私下的坦白、写进书里的立场 —— 三个版本同一天上了头版。",
            { rep: -2.5, flags: ["scandal_4", "investigation_open"], fall: 1 })
        }
      },
      {
        id: "after_cut", text: "去见那个被你切割的人",
        req: { flag: "sca2_cut" },
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "INTG", w: 0.25 }],
        outcomes: {
          crit: s2Out("你约他在一家偏僻的餐馆见面，把当年的决定一句一句讲给他听，末了说：「当时只有这一条路，但路是我选的，账该记在我头上。」他沉默很久，然后要了你那份工作他没吃完的牛排打包。第二年他的证词救了你一次。",
            { rep: 1.5, fac: { base: 6, press: 4 }, flags: ["sca2_owned"] }),
          ok: s2Out("见了一面，谈得不深。他收下了你的道歉，也收下了那份新工作 —— 你们都知道这两样哪个更值钱。",
            { rep: 0.8, fac: { establishment: 4 }, flags: ["sca2_owned"] }),
          meh: s2Out("他同意见你，全程在录音。你说的每一句客套他都留着 —— 不是为了用，是为了让你知道他留着。",
            { hp: -1, flags: ["compromised"] }),
          fail: s2Out("他不见你，只托人带回一句话：「告诉他还记得辞职信是谁写的就行。」这句话开始在你自己的党内流传。",
            { rep: -1.5, fac: { establishment: -8 }, flags: ["scandal_2"] }),
          critfail: s2Out("他写了一本书。第九章是你：你们的每一条短信、每一通凌晨的电话。书本身不重要，重要的是宣传期恰好和你的连任选举重合。",
            { rep: -2.5, voters: { warm: -1500, oppose: 800 }, flags: ["scandal_3"] })
        }
      },
      {
        id: "after_counter", text: "那场反诉的案子，到了真正的判决日",
        req: { flag: "sca2_counter" },
        base: 0.52, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "agency", w: 0.2 }],
        outcomes: {
          crit: s2Out("判决那天你赢了 —— 不只是胜诉，法官在判词里写了一句「原告的指控成立」。这句话被你的团队裱起来挂在办公室。当初的险棋，现在是你最硬的一块盾牌。",
            { rep: 2, fac: { base: 8, press: 6, establishment: 6 }, notFlags: ["scandal_2"], flags: ["sca2_owned"] }),
          ok: s2Out("和解了，条款保密。对外你可以说「我赢了」，对内你知道那叫「买回」。也好。",
            { rep: 0.8, flags: ["sca2_owned"] }),
          meh: s2Out("案子以「证据不足」不了了之。没有赢家 —— 你花掉的钱和对方花掉的时间，互相抵消。",
            { rep: 0.2, hp: -0.8 }),
          fail: s2Out("判决对你不利。当初反诉时交出去的那些材料，如今成了另一桩调查的起点 —— 你的案卷还躺在那个法官的抽屉里，只是换了个人读。",
            { rep: -1.75, flags: ["scandal_3", "investigation_open"] }),
          critfail: s2Out("对方在反诉里反杀成功：你被认定滥诉并承担全部诉讼费。更糟的是，这个判例被写进了教科书 —— 每一个法律系学生都会学到「以反诉掩丑的风险」，用的就是你的名字。",
            { rep: -2.75, fac: { press: -10, establishment: -10 }, flags: ["scandal_4", "investigation_open"], fall: 1 })
        }
      },
      {
        id: "silence", text: "不再讲任何版本。让它只活在别人的记忆里",
        note: "不续费了。故事失去主人之后会自己长 —— 长成什么样不归你管。",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "attr", key: "INTG", w: 0.25 }],
        outcomes: {
          crit: s2Out("你从此不接这个话题，一次都没有。五年后在一次完全无关的听证会上有人旧事重提，主席直接敲了槌：「与议题无关。」你一个字都没说，它就这么老了。",
            { rep: 1, fac: { base: 4 }, flags: ["sca2_owned"] }),
          ok: s2Out("你不讲，别人慢慢也懒得问。它变成了一个没有定论的旧闻 —— 没有定论，有时候就是最好的定论。",
            { rep: 0.4, flags: ["sca2_owned"] }),
          meh: s2Out("你不讲，但每年总有那么一两天，它会自己回来一下，然后又走。像一处旧伤,变天就疼。",
            { hp: -0.8 }),
          fail: s2Out("你的沉默被解读成默认。对手的广告不需要你的版本 —— 沉默就是他们要的那个版本。",
            { rep: -1, voters: { warm: -800 }, flags: ["scandal_2"] }),
          critfail: s2Out("一部纪录片替你讲了那个故事：两小时，三十七个证人,没有你。片尾你的沉默被配上了一行字幕：「我们邀请了他，他拒绝了。」",
            { rep: -2, fac: { press: -8, base: -6 }, flags: ["scandal_3"] })
        }
      }
    ]
  }
]);
