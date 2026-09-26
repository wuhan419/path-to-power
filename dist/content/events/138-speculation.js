/* ============================================================================
 * CONTENT · 138-speculation.js
 * 【投机包 · 庄家生意】#28②③：六个历史级的钱窗口，你以「有钱人」的身份路过。
 *
 * 与 110/123/124 那些「史实卡」的分工：
 *   · 史实卡写的是**这件事找上你的政治身份**（听证、救灾、表态）；
 *   · 这一包写的是**同一天的另一条街** —— 你的仓位、你的经纪人、你手里那点现金。
 *   两张卡同年出现不重复：一个问「你怎么回应」，一个问「你赌不赌」。
 *
 * 这一包存在的机制理由（#28②）：
 *   1) 全部 `pace:"exempt"` —— 生意可以做第二次。引擎因此不给它们吃单卡衰减（idRepeatMul）
 *      与 24 个月硬冷却，但仍吃**灰产年度额度**（balance.pace.grayMax），一年最多排那么多。
 *   2) 全部 `unique:false` —— major 卡默认一局一次，忘了显式关掉就等于永远只出一次。
 *   3) 收益一律走 `funMul`（比例）而不是 `fun`（绝对额）：投注面板押进来的本金要吃同一个倍数，
 *      倍率再由 INT 修正（effects.js 的 funMulIntMul）——聪明人赚得多、翻车亏得少。
 *   4) 入场费写在 `req.fun`（账上没这么多钱就吃不下这单），**不是** 单价：
 *      #28① 之后一档投注多少钱只看身位，钱多钱少只决定你押得起几档。
 *
 * 写法纪律：dyn:true（钱是系数不是美元）· 不写 era（用 minYear/maxYear + scoped:true）·
 *   tierMin 走 tierRaw:true 的原始层级 · 引号只用「」 · 每张留一条无 cost 无 req 的保底 ·
 *   category 复用 "shady"（不新增 key）· 配图沿用 shady.jpg · 近十年不写真实姓名（用职务称谓）。
 * ==========================================================================*/

POTUS.define("event", [

  /* ==========================================================================
   * 1) 1985 · 广场协议之后 —— 换汇那一夜
   * ======================================================================== */
  {
    id: "sp85_plaza", photo: "shady.jpg", grade: "mid", category: "shady",
    valence: "risk", dyn: true, unique: false, pace: "exempt",
    minYear: 1985, maxYear: 1986, scoped: true, tierRaw: true, tierMin: 2, tierMax: 6, weight: 9,
    title: "公报发出的那个周末，你手里握着一把美元",
    body: "五国财长把美元按下去的消息是星期六晚上到的。银行柜台周一才开门，中间人今晚就在你家客厅。\n" +
      "他的说法很朴素：所有人都会去买日元和马克，你先动手就是便宜的那一个。晚一个月，同样的钱只能买到一半。\n" +
      "公报以五个国家的名义签了字，汇率不由谁想不想动。中间人要你先把钱换成他能动的形式，渠道费先付、事后不退——而你的现钱躺在地方银行的定期里，取早了要赔一截利息。有人说财政部里有人，提前两周就听到了这份公报的风声。要是日元不涨，赔的是你还是递话的人？",
    choices: [
      {
        id: "all_in", text: "把能动的钱都换成外币（压上本金）",
        note: "赌的是政策继续走。押的是你全部现钱，而且是别人替你动手。",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "INT", w: 0.3 }],
        cost: { fun: 0.3 }, req: { fun: 1.2 }, stake: { fun: true },
        outcomes: {
          crit: { body: "三个月后牌价回到你出手的一半。你没跟任何人商量，也没在任何文件上留下名字。选区里开始有人叫你「懂钱的那个人」。", effects: { funMul: 2.2, rep: 0.3, fac: { commercial: 6 }, flags: ["speculator"] } },
          ok: { body: "换回来够买回两倍的东西。你没发财，只是没错过。", effects: { funMul: 0.9, fac: { commercial: 3 }, flags: ["speculator"] } },
          meh: { body: "银行柜台的价差吃掉了大部分利润。折腾一圈，落下一叠外币现钞和一点手续费。", effects: { funMul: 0.1 } },
          fail: { body: "公报之后美元只跌了两个星期，然后弹回去。你在低点割了肉。", effects: { funMul: -0.5, rep: -0.4, fac: { base: -4 } } },
          critfail: { body: "中间人带着你的钱消失了，只留下一张写错数字的收据。更难看的是：地方报纸发现你为了换钱把一笔定期存款取空了。", effects: { funMul: -1, rep: -1.5, fac: { press: -8, base: -6 }, flags: ["speculator", "scandal_1"] } }
        }
      },
      {
        id: "hedge", text: "只换一小份，够摸清渠道的深浅",
        note: "学费便宜：赚不了大钱，但你知道这门生意怎么走账。",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        cost: { fun: 0.12 }, stake: { fun: true },
        outcomes: {
          crit: { body: "小钱赚得不多，可你看懂了一件大事：政策一动，全世界的钱都会重新排队。这眼光以后值钱得多。", effects: { funMul: 0.8, attr: { CUN: 2 }, fac: { commercial: 3 } } },
          ok: { body: "换回来的够付手续费，还余一点。你记住了两个名字，以后用得着。", effects: { funMul: 0.25, contact: { fixer: 6 } } },
          meh: { body: "价差不够覆盖费用。等于花钱上了一节课。", effects: { funMul: -0.1 } },
          fail: { body: "你换早了两天，回来时牌价已经不动了。零头没了。", effects: { funMul: -0.3 } },
          critfail: { body: "小额也要填表。你的第一笔外币交易被写进了地方银行的一份内部备忘，日后谁都能翻出来看一眼。", effects: { funMul: -0.5, rep: -0.6, fac: { press: -4 } } }
        }
      },
      {
        id: "stay", text: "不动。钱留在本地的银行里",
        note: "没有仓位，也就没有把柄。这一条路的代价是别人赚而你没赚。",
        base: 0.8, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "换汇潮过去后，本地的银行反而稳住了储户。行长在周年晚宴上提了你的名字：那种时候还把钱放在这里的人。", effects: { rep: 0.6, fac: { commercial: 5, base: 6 } } },
          ok: { body: "定期利息照拿，什么都没发生。你省下了一趟麻烦。", effects: { fun: 0.08, rep: 0.1 } },
          meh: { body: "通胀把利息吃掉一半。你没亏，只是白放了一年。", effects: { fun: 0.03 } },
          fail: { body: "看着别人赚你没赚，你在自家饭桌上被家人念叨了一个月。", effects: { rep: -0.2 } },
          critfail: { body: "不换汇不代表安全：本地一家小银行在换汇潮里被抽走了存款，你的账户被并进了别家，取钱要写信去申请。", effects: { fun: -0.15, rep: -0.5, fac: { base: -4 } } }
        }
      }
    ]
  },

  /* ==========================================================================
   * 2) 1987 · 黑色星期一 —— 没人接电话的那天
   * ======================================================================== */
  {
    id: "sp87_monday", photo: "shady.jpg", grade: "major", category: "shady",
    valence: "risk", dyn: true, unique: false, pace: "exempt",
    minYear: 1987, maxYear: 1988, scoped: true, tierRaw: true, tierMin: 3, tierMax: 7, weight: 8,
    title: "指数一天跌掉两成，你的经纪人打了十七个电话",
    body: "开盘二十分钟，报价机上的数字就不像真的了。你认识的每个人都同处在一种状态：手握现金，不知道该怎么花。\n" +
      "下午两点，一位机构清算的熟人打来电话：有几家信托在按三折甩抵押良好的头寸，明天中午之前没人接盘就强制平仓（保证金不够就被强卖持仓，价格不问价值）。\n" +
      "抵押物是实在的，只是没人敢接；你手上的现金够吃下一单——吃了就取不出来。有人说联储今晚就会表态放流动性。这是底还是更大一场清算的开头，没人说得清；今天捡的便宜，将来会被算成从别人的灾难里发财。",
    choices: [
      {
        id: "buy_dip", text: "接那几家信托的头寸，三折",
        note: "赌的是流动性明早就回来。押的是全部现钱，赌注是别人的强制平仓。",
        base: 0.42, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "attr", key: "CUN", w: 0.35 }],
        req: { fun: 2.5 }, stake: { fun: true },
        outcomes: {
          crit: { body: "第三天午后，价格弹起四成。你没做什么不合法的事——你只是那天有现金。圈子里开始流传那句评语：崩盘时还站着的人。", effects: { funMul: 2.8, rep: 0.4, fac: { commercial: 12 }, flags: ["crash_buyer"] } },
          ok: { body: "反弹不够漂亮，但足够证明那三折是真的。你把这笔账写进了一句体面的话里：长期投资。", effects: { funMul: 1.1, fac: { commercial: 6 }, flags: ["crash_buyer"] } },
          meh: { body: "你接的东西趴了半年才回本。钱没丢，人先熬白了。", effects: { funMul: 0.15 } },
          fail: { body: "第二天又跌了一成。你在自己的清算通知上明白过来：三折之后还能有两折。", effects: { funMul: -0.8, rep: -0.8, fac: { commercial: -6 }, flags: ["crash_buyer"] } },
          critfail: { body: "其中一家信托的受益人里有本地养老金的钱。报纸不问价格问日期：为什么在储户排队取钱的那天，你买走了它的抵押物。", effects: { funMul: -1, rep: -2.2, fac: { press: -12, base: -10, church: -8 }, flags: ["crash_buyer", "scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "wait", text: "拿着现金等着，先看两天",
        note: "不动手也是一种下注：赌自己能忍住，也赌底部还没到。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        /* req.fun = 你压在券商那里等着进场的现钱：它是本条 funMul 的本金（#28② 写法纪律 4） */
        req: { fun: 1 },
        outcomes: {
          crit: { body: "两天后你确认了底部，用一半的仓位进场，赚得不如别人多，但每一笔都在自己看得清的范围里。", effects: { funMul: 0.9, attr: { INT: 1 }, fac: { commercial: 4 } } },
          ok: { body: "你没赚到那波最肥的，也没接住最深的那一刀。现金还是现金。", effects: { funMul: 0.2 } },
          meh: { body: "你在等一个更好的价格，它再也没有出现过。", effects: { fun: 0.05 } },
          fail: { body: "等你终于出手，价格已经回到崩盘前。你付了一整轮的迟疑。", effects: { funMul: -0.3 } },
          critfail: { body: "你等到第三天，等来的是自家账户被券商挪用保证金的通知。崩盘让人明白：现金在手上和在别人手上是两件事。", effects: { fun: -0.5, rep: -0.6, fac: { base: -5 } } }
        }
      },
      {
        id: "calm", text: "去街上讲话：劝大家别在恐慌里卖",
        note: "把这一个月当作政治而不是生意。钱赚不到，但有人在你的话之后没跳楼。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你在镇上的银行台阶上讲了十分钟，第二天有几位老人没有去排队。地方报纸把这段话放在头版下面一行：先别卖。", effects: { rep: 2, fac: { base: 14, commercial: 5 }, voters: { diehard: 600, warm: 900 }, flags: ["calm_voice"] } },
          ok: { body: "有人听，有人骂你不懂经济。但你留下了「崩盘那天他在场」这个说法。", effects: { rep: 0.9, fac: { base: 6 }, voters: { warm: 300 } } },
          meh: { body: "你的话被当作另一种恐慌：连政客都出来喊话，说明事情真的大。", effects: { rep: -0.3, fac: { base: -3 } } },
          fail: { body: "你说「两天就好」。第三天又跌。这句话以后每次竞选都会被人念一遍。", effects: { rep: -1.2, fac: { base: -8, press: -6 } } },
          critfail: { body: "记者翻出你当天下午的一笔买单：你在劝别人别卖的时候买了。两条新闻拼在一页上，不需要评论。", effects: { rep: -2.2, fac: { press: -14, base: -12 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ==========================================================================
   * 3) 1997 · 投机资本狙击本币 —— 站在哪一边
   * ======================================================================== */
  {
    id: "sp97_currency", photo: "shady.jpg", grade: "mid", category: "shady",
    valence: "risk", dyn: true, unique: false, pace: "exempt",
    minYear: 1997, maxYear: 1998, scoped: true, tierRaw: true, tierMin: 3, tierMax: 8, weight: 8,
    title: "有人在外围抛售，逼你把储备花光",
    body: "财经台的措辞很客气：「国际投机资本」。你听到的版本更直接——几家基金在外汇市场上连续砸同一种货币，赌你的官方撑不住。\n" +
      "你的位子刚好在两股力量中间：一边要你放开汇率，一边要你守住。而你自己也有一笔可以挪动的钱。\n" +
      "央行的美元储备两周里少了一大截，还在往外流；本地企业借的是外币，本币一贬，债务自己就变大。守住要烧光储备，放开要赔死企业——哪张账单更贵，没人敢算。至于把矛头指向「外国投机客」：那是分析，还是挡箭牌？",
    choices: [
      {
        id: "ride_short", text: "跟着风做：把手上的钱换出去，等本币跌",
        note: "与国家为敌的一注。对了是天才，错了是「那种人」。",
        base: 0.44, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "CUN", w: 0.3 }],
        req: { fun: 2 }, stake: { fun: true },
        outcomes: {
          crit: { body: "本币在星期五失守。你的仓位在星期一早上变成了原来的一倍半。地方上有人开始用一种新的眼神看你：看得清，但不站在我们这边。", effects: { funMul: 2.4, rep: -0.5, fac: { commercial: 10, base: -8 }, flags: ["currency_rider"] } },
          ok: { body: "你赚了一笔，还得不太快——刚好够不被点名，又够被议论。", effects: { funMul: 0.9, fac: { commercial: 5, base: -3 }, flags: ["currency_rider"] } },
          meh: { body: "央行撑住了。你换出去的钱在账上趴了三个月，回来时汇率原地不动。", effects: { funMul: 0.05 } },
          fail: { body: "你算错了方向：本币没跌，利率先被拉到天上。你借钱换的外币，光利息就把利润吃光。", effects: { funMul: -0.7, rep: -0.6, fac: { commercial: -5 } } },
          critfail: { body: "审计把「国家在花储备守汇率、你在同一市场抛出」写在同一页上。听证会问你：你什么时候知道会贬值的。", effects: { funMul: -1, rep: -2.5, fac: { press: -14, base: -12, establishment: -6 }, flags: ["currency_rider", "scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "defend", text: "站在守住的一边：把钱留在本地，公开劝别人也留",
        note: "押的是自己人撑得住。赔了自己也赔，赢了是「他那时候没跑」。",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.35 }, { src: "fac", key: "base", w: 0.35 }],
        cost: { fun: 0.4 }, stake: { fun: true },
        outcomes: {
          crit: { body: "守住了。至少守到了体面的位置。央行行长在闭门会上说了一句：危机里不跑的人，我们记得。", effects: { funMul: 0.6, rep: 1.6, fac: { establishment: 10, base: 8, commercial: -3 }, flags: ["stood_ground"] } },
          ok: { body: "贬值还是来了，幅度比你担心的小。你留下的钱缩水了，留下的名声没有。", effects: { funMul: -0.2, rep: 1.1, fac: { base: 7, establishment: 4 } } },
          meh: { body: "什么都没变，你也什么都没得到。只有那笔留在本地的钱继续躺着。", effects: { funMul: 0.05, rep: 0.3 } },
          fail: { body: "你劝别人留下，自己账户却在做对冲。这两件事被同一位记者在一个下午发现。", effects: { rep: -1.4, fac: { press: -8, base: -8 } } },
          critfail: { body: "本币一夜跌掉三成，你留在本地的那笔钱变成了一堆欠条。人们记得你劝他们别跑，也记得你当时站在台上。", effects: { funMul: -0.9, rep: -1.8, fac: { base: -12, labor: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "blame", text: "把这件事讲成外来者干的",
        note: "民粹是最便宜的政治语言。说出去很快，收回来很难。",
        base: 0.58, mods: [{ src: "attr", key: "CHA", w: 0.45 }],
        outcomes: {
          crit: { body: "一句话上了当晚头条，第二天有人在你的办公室门口排队握手。那几家基金的总部在地球另一端，你的选民不需要知道更细的事。", effects: { rep: 1.4, voters: { diehard: 800, warm: 1000 }, fac: { base: 8, establishment: -6 }, flags: ["populist_hit"] } },
          ok: { body: "骂声有用，也仅此而已。汇率还是那个汇率。", effects: { rep: 0.5, voters: { warm: 300 }, fac: { establishment: -3 } } },
          meh: { body: "本地媒体替你补了一句：那你自己的外币账户是怎么回事。", effects: { rep: -0.3, fac: { press: -4 } } },
          fail: { body: "一位经济学家在电视上把狙击的机制讲了三分钟，末了问你：投机的定义是不是「赚了我看不懂的钱」。", effects: { rep: -1, fac: { press: -6, establishment: -4 } } },
          critfail: { body: "你扣下的那家外资机构请来了律师，律师带来一份你本人账户的公开记录。第二天头条换了标题。", effects: { rep: -2.2, fun: -0.2, fac: { press: -12, commercial: -8, establishment: -8 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ==========================================================================
   * 4) 2007 · 次贷裂缝 —— 分红还在发
   * ======================================================================== */
  {
    id: "sp07_cracks", photo: "shady.jpg", grade: "mid", category: "shady",
    valence: "risk", dyn: true, unique: false, pace: "exempt",
    minYear: 2007, maxYear: 2007, scoped: true, tierRaw: true, tierMin: 3, tierMax: 8, weight: 9,
    title: "有两家房贷公司倒了，你的那笔分红照时到账",
    body: "第一季度的支票还是按老数字寄来，封面印着一家你从没见过的管理公司。\n" +
      "你手上那笔钱当初是被当作「比国债多一点收益」卖给你的。现在你翻到说明书第八页，看到一句话：底层资产（拆开这层证券，最后面是一笔笔住房贷款）的信用质量不再复核。\n" +
      "你的产品里就混着那两家出事机构放出去的贷款，比例没人肯给准数。客户经理劝你别动：现在卖，是最低价。可你现在割肉，等于承认自己半年前没读那八页。",
    choices: [
      {
        id: "exit", text: "割肉出去：现在卖掉，接受最低价",
        note: "花钱买一个清楚：知道自己还剩多少，也知道别人会怎么讲这件事。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.45 }],
        cost: { fun: 0.2 }, stake: { fun: true },
        outcomes: {
          crit: { body: "三个月后这只产品归零清算。你在最不像价的位置上出去了，但你的手是干净的：钱还在，名字没在任何起诉书上。", effects: { funMul: -0.25, rep: 0.8, attr: { INT: 2 }, fac: { base: 5, commercial: -3 }, flags: ["early_out"] } },
          ok: { body: "卖掉的钱够再谈一笔别的。你学到一课：按时付钱不等于安全。", effects: { funMul: -0.35, attr: { CUN: 1 } } },
          meh: { body: "出去时比进来时少三成，之后价格又弹了一点。谁都会算这道题，谁都不爱看答案。", effects: { funMul: -0.4 } },
          fail: { body: "卖单挂出去没人接。这只产品的市场已经不存在了——你只是知道自己拿的是什么。", effects: { funMul: -0.5, rep: -0.4 } },
          critfail: { body: "你割在最高点之前，也割在自家选区最难看的时候：本地一家银行因为同一批贷款被接管，而你在前一天刚把份额卖给它的对手。", effects: { funMul: -0.6, rep: -1.4, fac: { base: -8, press: -8, commercial: -6 }, flags: ["early_out", "scandal_1"] } }
        }
      },
      {
        id: "hedge", text: "不卖，但花钱买一份保险（违约互换）",
        note: "对冲的代价是一笔确定的钱。如果没事，这笔钱就是纯成本。",
        base: 0.46, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "CUN", w: 0.3 }],
        req: { fun: 1.5 }, stake: { fun: true },
        outcomes: {
          crit: { body: "违约被认定，保险按面值赔。你没发财——你只是在一个所有人互相亏钱的行业里，站在赔钱的那一边。", effects: { funMul: 1.8, rep: -0.3, fac: { commercial: 6, base: -5 }, flags: ["hedged"] } },
          ok: { body: "赔款够补上账面的洞。别人问你最近怎么样，你说：还行，对冲了。", effects: { funMul: 0.7, fac: { commercial: 3 } } },
          meh: { body: "保险要到期续，产品没违约，只是不动。你每年付一笔钱买一个不发生的故事。", effects: { funMul: -0.1 } },
          fail: { body: "卖方在你签字那天改了定义：这不算触发事件。", effects: { funMul: -0.4, rep: -0.5, fac: { commercial: -4 } } },
          critfail: { body: "卖保险的那家自己也倒了。你的对冲成了一句话，写在一封再也无人回复的邮件里。", effects: { funMul: -0.8, rep: -1, fac: { base: -5, press: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "keep", text: "什么都不做，等分红继续到账",
        note: "不确认亏损就不算亏损——这是最贵的一种自我安慰。",
        base: 0.55,
        /* 保底不押钱、也不设门槛，所以这里没有本金可乘：账面涨跌写成绝对系数（fun），不用 funMul。 */
        outcomes: {
          crit: { body: "到年底价格回到票面，评级只是降了一档。你成了那种「什么都没做却是对的」的人，这种人在饭局上最让人生气。", effects: { fun: 0.25, attr: { CUN: 1 } } },
          ok: { body: "账面还在，分红停了一季又续上。你告诉自己：这就是长期。", effects: { fun: 0.06 } },
          meh: { body: "分红没了，账面还在。你开始把那个对账单压在别的文件下面。", effects: { fun: -0.12 } },
          fail: { body: "第五页那句「不再复核」后面写着：所有损失由持有人承担。", effects: { fun: -0.35, rep: -0.3 } },
          critfail: { body: "清算通知只有一页，写明你当初投入的百分之九十七已经不存在。更糟的是：你在选区大会上刚说过这笔投资「很稳」。", effects: { fun: -0.55, rep: -1.6, fac: { base: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ==========================================================================
   * 5) 2008 · 流动性冻结 —— 有现金的人定价一切
   * ======================================================================== */
  {
    id: "sp08_liquidity", photo: "shady.jpg", grade: "major", category: "shady",
    valence: "risk", dyn: true, unique: false, pace: "exempt",
    minYear: 2008, maxYear: 2009, scoped: true, tierRaw: true, tierMin: 4, tierMax: 9, weight: 8,
    title: "同业拆借停了，来问你借钱的人排到门口",
    body: "银行间断了银行间的钱。这条街上最好的五金店、给学校供餐的承包商、还有一家开了四十年的印刷厂，都在同一周里来找你。\n" +
      "他们要的不是投资，是过桥的九十天——短钱，赌你撑到下一笔融资。利率可以自己写：正规渠道这周对所有人关了门，连信用最好的那几家也不例外，而现在能拿出来的人不多。\n" +
      "来的人里有你的老选民，也有你竞选对手的支持者。有人说有位本地富商已开出四倍于银行的利率。九十天后这些招牌还剩几家，决定你是恩人还是债主。",
    choices: [
      {
        id: "predatory", text: "放：按他们此刻不得不答应的价",
        note: "回报最高的一档，也是把所有人的名字写进同一份文件的一档。",
        base: 0.48, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "INT", w: 0.3 }],
        req: { fun: 3 }, stake: { fun: true },
        outcomes: {
          crit: { body: "九十天内全部回款，利息够买两条街的铺面。没人抱怨——他们当时自己签的字。只是现在见到你，有人会低头。", effects: { funMul: 2.6, fac: { commercial: 10, base: -10 }, flags: ["bridge_lender"] } },
          ok: { body: "钱回来了大半，利息依然可观。有两家还不上，你收了它们的设备。", effects: { funMul: 1.2, fac: { commercial: 5, base: -6 }, flags: ["bridge_lender"] } },
          meh: { body: "回款拖了半年，扣掉律师费刚好打平。你得到一个教训：恐慌里签字的人，之后不记得自己签过什么。", effects: { funMul: 0.1 } },
          fail: { body: "三家一起倒。担保物是一堆卖不掉的库存，和一张写了名字的欠条。", effects: { funMul: -0.7, rep: -0.6, fac: { base: -6 } } },
          critfail: { body: "一家拿了你的钱还是倒了。破产律师把借款合同附在起诉书的第三页，标题是：本地一位公职人员在危机期间的放款条件。", effects: { funMul: -0.8, rep: -2.4, fac: { press: -14, base: -14, labor: -10 }, flags: ["bridge_lender", "scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "community", text: "放：按成本价，只挑真能活下来的",
        note: "少赚，换一句「那年冬天他没趁火打劫」。前提是你判断得准。",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.35 }, { src: "attr", key: "INT", w: 0.3 }],
        cost: { fun: 0.8 }, stake: { fun: true },
        outcomes: {
          crit: { body: "你挑的六家活下来五家。第二年商会年会把你介绍给全场，用的称呼不是官衔，是「帮过我们的人」。", effects: { funMul: 0.7, rep: 2, fac: { base: 14, commercial: 6, labor: 8 }, voters: { diehard: 700, warm: 1100 }, flags: ["town_lender"] } },
          ok: { body: "回款一般，人情全记下。这类账不用利息算。", effects: { funMul: 0.25, rep: 1.1, fac: { base: 8, labor: 4 } } },
          meh: { body: "你借出去的钱有一成收不回来，但没人知道你按了什么价。好事变成一笔糊涂账。", effects: { funMul: -0.1, rep: 0.4 } },
          fail: { body: "两家拿了钱还是倒了，其中一家是你的老选民。他们说：你既然是这种人，当初为什么不多帮一点。", effects: { funMul: -0.4, rep: -0.9, fac: { base: -8 } } },
          critfail: { body: "有人把「谁按成本价、谁按高价」的名单泄露了。没拿到钱的那几家上街游了，横幅上写的是你的名字。", effects: { funMul: -0.5, rep: -1.8, fac: { base: -12, labor: -10, press: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "hold", text: "不放。钱留在账上过冬",
        note: "零风险、零回报、零故事。唯一的好处是没人能在文件上找到你。",
        base: 0.75,
        outcomes: {
          crit: { body: "半年后你手里还有现金，而街上大半的人没有了。等到有人开始重新借钱，你是那个能点头的人。", effects: { fun: 0.15, rep: 0.4, fac: { commercial: 4 }, attr: { CUN: 1 } } },
          ok: { body: "钱好好的。有两家企业关了门，你想过如果当时出手会怎样，然后没往下想。", effects: { fun: 0.08 } },
          meh: { body: "什么也没发生。你在一个有故事的一年站在故事外面。", effects: {} },
          fail: { body: "一位本来能活下来的老板在关门前替你补了一句：他不是没钱，他只是在等我们死人。", effects: { rep: -0.8, fac: { base: -6, labor: -4 } } },
          critfail: { body: "两家企业倒在你隔壁的街上，地方报纸登了它们门口封条的照片，标题里点名那个「手里有钱却什么都做不了」的年份。", effects: { rep: -1.5, fac: { base: -9, labor: -6, press: -5 } } }
        }
      }
    ]
  },

  /* ==========================================================================
   * 6) 2022 · 手机上的挤兑 —— 二十八小时
   * ======================================================================== */
  {
    id: "sp22_run", photo: "shady.jpg", grade: "mid", category: "shady",
    valence: "risk", dyn: true, unique: false, pace: "exempt",
    minYear: 2022, maxYear: 2024, scoped: true, tierRaw: true, tierMin: 2, tierMax: 9, weight: 9,
    title: "一条帖子两小时转发一万次，你的一家银行开始掉存款",
    body: "这家银行没有倒闭，它只是持有别人不想要的债券（账面损失没卖就不算实现，市场随时替你实现一次）。上午九点有财经账号算了一笔账，下午三点开始，客户在手机上排队转账。\n" +
      "你在里面有存款，也有认识的人在里面。你现在有大约一天的时间决定自己是哪一种人。\n" +
      "监管早就知道这笔账面损失，过桥方案还在谈。存款保险只保到某个数额，超过的部分要等——你账上那笔刚好在线之上，转走只要两分钟。留下一句「我信它」值多少钱？说晚了，又值多少？",
    choices: [
      {
        id: "first_out", text: "先转走。超过保险线的部分也走",
        note: "最快、最聪明、也最不可撤回的一步：截图会留着。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        /* req.fun = 你压在这家银行里的存款：既是取款的资格，也是本条 funMul 的本金 */
        req: { fun: 1 }, stake: { fun: true },
        outcomes: {
          crit: { body: "第二天这家银行宣布被接管。你的钱一分不少，因为你比大多数人早了半天。这种胜利说不出口，也没人想听。", effects: { funMul: 0.5, rep: -0.6, fac: { base: -6, commercial: 4 }, flags: ["ran_first"] } },
          ok: { body: "钱安全回来了，手续费给了别家银行。你少赚一点，睡得着。", effects: { funMul: 0.1, rep: -0.2 } },
          meh: { body: "银行撑过了那一周。你把钱转出去又转不回来——利率已经变了。", effects: { funMul: -0.2 } },
          fail: { body: "转走的当天就谈成了过桥。第二天有人说你那天在大厅里站着拍照，照片里你的账户余额清楚可见。", effects: { funMul: -0.25, rep: -1, fac: { base: -8, press: -5 }, flags: ["ran_first"] } },
          critfail: { body: "监管事后调取转账时间线，你的一笔出现在「集中提现」那一栏里。有人问：你那天为什么知道，以及你为什么告诉别人不用怕。", effects: { funMul: -0.3, rep: -2.2, fac: { press: -12, base: -12, establishment: -6 }, flags: ["ran_first", "scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "public_stay", text: "留下，而且公开说「钱我不取」",
        note: "一次押上自己名声的对冲：止住恐慌你就是那个人，止不住你就是那个傻瓜。",
        base: 0.42, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        /* 公开喊「我不取」的前提是钱真的在里面 —— 同 first_out，这笔存款就是本金 */
        req: { fun: 1 }, stake: { fun: true },
        outcomes: {
          crit: { body: "你的那句话出现在本地新闻开头，当天下午这家分行的取号机没人按。过桥方案在夜里签了。第二年这家银行请你去给新员工讲一句开场白。", effects: { rep: 2.2, funMul: 0.4, fac: { base: 14, commercial: 8, establishment: 5 }, voters: { diehard: 600, warm: 900 }, flags: ["run_calmer"] } },
          ok: { body: "流出慢了下来，没停。你的话至少让一部分人等到方案落地。", effects: { rep: 1, fac: { base: 7, commercial: 4 } } },
          meh: { body: "什么都止不住。你等于免费把自己的钱锁了一年。", effects: { funMul: -0.1, rep: 0.3 } },
          fail: { body: "银行还是没了。人们记住的不是你叫他们别取，而是你当时也在大厅里。", effects: { rep: -1.2, funMul: -0.4, fac: { base: -8 } } },
          critfail: { body: "接管清单一出来，你留在里面的钱超过保险线的那部分要等三年。地方台的标题是：他叫大家别慌，他自己的钱也在里面。", effects: { rep: -2, funMul: -0.7, fac: { base: -12, press: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "quiet_info", text: "既不转也不喊，先去问一句内部情况",
        note: "打一个电话，得到一个不该给的答案。这条路的收益和风险都不在钱上。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "establishment", w: 0.3 }],
        outcomes: {
          crit: { body: "监管的人给了你半句话：方案在谈，别在周末之前上电视。你没上，也没让别人上。这半句话后来值很多——不是钱的那种多。", effects: { fun: 0.35, rep: 0.6, lev: 1, fac: { establishment: 8 } } },
          ok: { body: "你得到一个笼统的「在处理」。不够用，但比外面的人早知道方向。", effects: { fun: 0.12, contact: { fixer: 6 } } },
          meh: { body: "对方说：这个不能告诉你。你等于把自己的好奇登记在了对方的小本子上。", effects: { rep: -0.2 } },
          fail: { body: "你问的那位正是被约谈的对象。第二天你的名字出现在「谁在四处打听」的一份名单上。", effects: { rep: -0.9, lev: -1, fac: { establishment: -6, press: -4 } } },
          critfail: { body: "你的电话被写进了事后报告，作为「个别存款人提前获得非公开信息」的例证之一。听证会只需要一个名字，而你刚好在名单上。", effects: { rep: -2, fac: { press: -10, establishment: -8, base: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      }
    ]
  }
]);
