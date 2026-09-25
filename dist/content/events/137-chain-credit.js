/* ============================================================================
 * CONTENT · events/137-chain-credit.js
 * 次贷后话链 —— 从空头的电话，到 2010 的替罪羊听证与新监管。
 *
 *   本文件是 124-line-2007-10.js 旗舰叙事（ln07_subprime）的余波幕：
 *   每一幕靠 after 续接前幕（前幕没演则本幕静默跳过，可断裂，不强灌历史）。
 *
 *   · 刻意不写 fixed 钉卡 —— planMonth 会把钉死的 eventId 直送过关，
 *     绕过 when.js 的 after 判定，等于把「可断裂」的链强灌给没演过前幕的局。
 *     后幕的到场靠 balance.chainWeightMul（默认 9）加权，几乎一定会来，
 *     但只在 ch08_short 真演过的时候来（第二幕承的是本链第一幕）。
 *   · 不写 era —— 一律绝对年窗 minYear/maxYear + scoped；tierRaw 直接按真实层级。
 *   · 避让已有节拍：2008-09 的雷曼背书（2008_crash_offer）、救市奖金骂街
 *     （ln09_aig）、刺激分钱（ln09_stimulus）、车企饭碗（ln08_auto）都不碰；
 *     ch08_short 只写「内部人拉你上车 + 选区在丢房子」这一条，
 *     ch10_blame 写在 ln09_aig 之后：2010 的挑替罪羊听证与立新规的法案文本。
 *   · 铁律 —— 引号只用「」；无真人姓名，一律职务称谓（财长 / 联准会主席 /
 *     券商老板 / 议长 / 党团干事）；每卡恰一个无 cost 无 req 的保底选项；
 *     经济字段全部写系数（dyn:true），投资回报走 funMul；链上每幕 unique:true。
 *   · after 目标：ch08_short 承 ln07_subprime（+3~18 个月）；
 *     ch10_blame 承 ch08_short（+6~30 个月），链断在第一幕则第二幕同断。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2008—2009 · 大空头：有人早就做空，内部人打电话拉你上车（风险）
   *   承 ln07_subprime —— 两只基金倒下之后，裂缝被证实成了塌方。
   * ==================================================================== */
  {
    id: "ch08_short", grade: "mid", category: "finance",
    valence: "risk", dyn: true,
    minYear: 2008, maxYear: 2009, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["print", "tv", "cable", "internet"],
    after: { id: "ln07_subprime", minMonthsAfter: 3, maxMonthsAfter: 18 },
    title: "做空房市的人赚到了，打电话来拉你上车",
    body: "去年八月那两只基金的事，如今全国有了大名：次贷。你县里的收房通知一周贴过一条街，法院台阶上摆起了法律援助的折叠桌。\n" +
      "昨晚来电显示上那个你不想忘掉的名字，是分行行长：他手里两位客户「早就看对了方向」，账面翻了几倍。电话那头的热情里夹着一层别的意思——他要的不只是替你高兴，他还要你县里那笔钱的去向，和你叫得动的那些名字。",
    brief: {
      lede: "那通电话不是人情，是杠杆：他看重你的门路，你看重他的先见。",
      known: [
        "县退休金的去向，你去年在董事会上表过态。",
        "那笔空头基金账面正赚钱，还留着席位。",
        "你选区的止拍与收房数字这季度还在往上走。"
      ],
      rumor: [
        "有人说这通电话已经打过三个人的号码。",
        "有人说他也被总部逼着，拉你筑墙。"
      ],
      unknown: [
        "今天进的名额，明天写进披露表。",
        "底在哪里，他自己也不知道。"
      ],
      terms: [
        { k: "做空", v: "押资产价格下跌，跌了才赚钱。" },
        { k: "内部人", v: "因职务先于公众掌握消息的人。" }
      ]
    },
    choices: [
      {
        id: "ride", text: "上车：把动得的钱换进那只「看对了」的基金",
        note: "赌的是你比他先知道止盈的位置。风险：钱和名声一起锁进同一只抽屉。",
        base: 0.42, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "attr", key: "INT", w: 0.3 }],
        cost: { fun: 2 }, stake: { fun: true },
        outcomes: {
          crit: { body: "你在崩盘前一个月听了自己团队的劝，落了袋。圈子里传你是「看得清的人」，没人追问另一半钱是从哪条街上收上来的。", effects: { funMul: 2.5, rep: 0.6, fac: { commercial: 9, base: -6 }, flags: ["short_rider"] } },
          ok: { body: "你赚了一笔，来得不干净也去得不安静。会计替你找了一句能写在纸上的话：对冲。", effects: { funMul: 0.8, rep: -0.4, fac: { commercial: 6, base: -4 }, flags: ["short_rider"] } },
          meh: { body: "基金撑住了账面，你的钱趴在里面动不了。倒是本地的报纸替你把这笔交易抄了个遍。", effects: { funMul: 0, rep: -0.8, fac: { base: -5, press: -3 }, flags: ["short_rider"] } },
          fail: { body: "你在最高的那班车上去的。跌到底时你的份额刚好补了别人的盈，县党部开例会的议题第一次是「要不要跟你切割」。", effects: { funMul: -0.6, rep: -1.4, fac: { base: -8, commercial: -4 }, flags: ["short_rider"] } },
          critfail: { body: "律师团反诉那通电话时，你的入金时间线被写成披露记录的第一页。做空本身不犯法，可「他当时知道什么」这行字，以后每场辩论都要替它作证。", effects: { funMul: -1, rep: -2.2, fav: -2, fac: { press: -8, base: -10 }, flags: ["short_rider", "scandal_1", "investigation_open"] } }
        }
      },
      {
        id: "warn", text: "不上车，反手开一场全县房贷风险提示会",
        note: "赌的是民愤可借、预警值钱。风险：你成了「靠恐慌做买卖的人」。",
        base: 0.45, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "base", w: 0.25 }],
        cost: { fun: 0.6 },
        outcomes: {
          crit: { body: "你把违约池的数据摊在中学体育馆，当晚三个邻县照抄了你的会。州检察长的办公室来电，问能不能把你的清单当模板。", effects: { rep: 1.6, fac: { base: 9, press: 6, commercial: -8 }, flags: ["credit_warn"] } },
          ok: { body: "会开了，话撂下了。来的人一半是谢你的，一半是骂你危言耸听的——都记着是你说的。", effects: { rep: 0.7, fac: { base: 5, commercial: -3 } } },
          meh: { body: "你的提示会来了四十个人。第二天行情照涨，你的话像提前散场的布道。", effects: { rep: -0.1 } },
          fail: { body: "房价没等你说完就稳了一阵。「他咒大家亏钱好上位」的信件稿进了商会通讯的头版。", effects: { rep: -1.3, fac: { commercial: -6, establishment: -4 } } },
          critfail: { body: "有记者问出你那场数据是从哪来的——那通电话。你解释不了「为什么是你先拿到」，警告者变成了嫌疑人。", effects: { rep: -2, fun: -1, fac: { press: -7, commercial: -6, base: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "desk", text: "钱不收，会不开：只在县里把法律援助的桌子撑住",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "折叠桌撑了一整个夏天，两百多户的文件从你这里寄出去。没人替这桌子上电视，可保住房子的家庭里，有人把你的名字写进了感恩节贺卡。", effects: { rep: 0.9, attr: { INTG: 1 }, fac: { base: 5, church: 4 } } },
          ok: { body: "桌子在，人就在。你什么大风向也没蹭上，什么烂账也没沾上。", effects: { rep: 0.35, fac: { church: 2 } } },
          meh: { body: "案子接了，房子多数还是没了。桌子后面的你，谁也怪不着。", effects: { rep: 0.05 } },
          fail: { body: "有丢了房子的退休教师在援助桌前问你：你不是那个圈里的人吗，你怎么帮不上。你说不上来，因为你也不知道。", effects: { rep: -0.5 } },
          critfail: { body: "援助桌撑不住关了张。有人贴出你去年从分行拿过的捐款记录：「他的桌子只对自己的债主开。」", effects: { rep: -1, fac: { press: -3, base: -2 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2010 · 问责与立新规矩：替罪羊听证与新监管同时开场（风险）
   *   承 ch08_short —— 你 2008 年的那一页，就在听证卷宗里。
   * ==================================================================== */
  {
    id: "ch10_blame", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2010, maxYear: 2011, scoped: true, tierRaw: true, tierMin: 2, tierMax: 7, weight: 12, unique: true,
    medium: ["tv", "cable", "internet", "social"],
    after: { id: "ch08_short", minMonthsAfter: 6, maxMonthsAfter: 30 },
    title: "国会听证在挑替罪羊，金融改革同时立新规",
    body: "这一年的华盛顿，银行老板一个一个被请上证人席，对着镜头回答同一个问题：你们当时知不知道。\n" +
      "改革法案在两党之间交换条款，新的监管机构已经有了名字，还差一张成立的票。街上的愤怒从两头同时烧过来：一头在问谁该坐牢，一头在问谁在为「大政府」买单。\n" +
      "听证材料袋里也有你的名字：2008 年那通电话、那笔钱、你说过的话——卷宗里都有。你不是头排被审的人，可聚光灯斜对面的座位，恰好空着。",
    brief: {
      lede: "立新规矩和挑替罪羊是同一份卷宗：谁的话写进法案，谁的话念给镜头。",
      known: [
        "两个委员会递来了温度不同的邀请函。",
        "法案文本本周送审，最终稿你也没见过。",
        "你 2008 年的记录在卷宗里，谁先开口谁引用。"
      ],
      rumor: [
        "有人说领导层已内定：谁也差不成。",
        "有人说新监管的实权早被挖走了大半。"
      ],
      unknown: [
        "豁免条款最后是谁写的，文本没人读完。",
        "秋天的中期选举，会给今天的镜头结账。"
      ],
      terms: [
        { k: "替罪羊听证", v: "挑一两个人公开问责，制度各让一步。" },
        { k: "新监管机构", v: "危机后新设的金融监管衙门。" }
      ]
    },
    choices: [
      {
        id: "gavel", text: "抢话筒：把本地券商老板请上证人席，一条一条问",
        note: "赌的是民愤可用、座位给你留着。风险：本党的钱当场把线掐了。",
        base: 0.46, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "press", w: 0.25 }],
        cost: { fun: 0.6 },
        outcomes: {
          crit: { body: "那位老板在你桌上说了一句「我当时也以为在涨」。当晚四个全国台循环播这句，你的名字和「敢问大人物」绑在了一起——党团干事在电话里沉默的三秒，你听懂了。", effects: { rep: 1.7, fac: { press: 8, base: 9, establishment: -8, commercial: -6 }, flags: ["hearing_hawk"] } },
          ok: { body: "听证开成了，问题问到了点上。基层痛快，捐款人开始退订你的晚宴请柬。", effects: { rep: 0.8, fac: { base: 5, press: 4, commercial: -3 } } },
          meh: { body: "老板念了稿，你问了套话，记者等的吵架没发生。第二天的版面给了别人。", effects: { rep: -0.1 } },
          fail: { body: "他出庭那天的律师团反手放出你 2008 年的入金记录。审的是谁，主持人念歪了嘴。", effects: { rep: -1.5, fac: { commercial: -8, establishment: -6, press: -4 } } },
          critfail: { body: "你的质询词逐条被他用你自己的披露表顶了回去。「先解释你的电话，再问我的董事会」——这句成了你这一年的标题。", effects: { rep: -2.4, fac: { establishment: -9, commercial: -7, press: -6 }, flags: ["hearing_hawk", "scandal_1"] } }
        }
      },
      {
        id: "write", text: "进条款组：把新监管的授权与办事处位置磨进法案文本",
        note: "赌的是规矩比镜头耐久。风险：你写的文本，将来第一个套住你。",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "establishment", w: 0.25 }],
        cost: { fav: 1 }, stake: { fav: true },
        outcomes: {
          crit: { body: "法案带着你那条款通过，新监管首批挂牌的名单里有你这条街。多年后的稽核报告说，那几句条款比整个机构值钱——说的是你。", effects: { rep: 1.5, attr: { INT: 2 }, fac: { establishment: 9, press: 4, base: -3 }, flags: ["rule_writer"] } },
          ok: { body: "你的措辞进了送审版，位置排在中段。名字不出现在新闻里，出现在注释里——那里住得久。", effects: { rep: 0.7, fac: { establishment: 5 } } },
          meh: { body: "你在小组里熬了三周，你的条款被合并进了别人名下的那一条。", effects: { rep: 0.1 } },
          fail: { body: "交换条款的最后一天，你那条被两党一起剪了。「他想要的那个东西谁都没答应」上了本地报的结算栏。", effects: { rep: -1.2, fac: { establishment: -5, base: -3 } } },
          critfail: { body: "你参与写的豁免文本，恰好盖住一家你熟识的公司。「旋转门」这个词，第一次以你的名字上了全国版。", effects: { rep: -2.3, fac: { press: -8, establishment: -6, base: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "casework", text: "哪个会场都不进：在县里办止拍与养老账接待日",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "全国的镜头对准证人席，你的桌牌写的是「带贷款合同来」。一年下来，两党复盘这个县都写同一句：他没上台，也没丢人。", effects: { rep: 0.9, attr: { INTG: 1 }, fac: { base: 5, church: 4 } } },
          ok: { body: "接待日一期一期地办。没人引用你，卷宗里也翻不出你——这年头，这算两种清净。", effects: { rep: 0.35, fac: { church: 2 } } },
          meh: { body: "你躲过了这轮风口，也躲过了所有人的记忆。", effects: { rep: 0.05 } },
          fail: { body: "两头都来问：法案你到底支不支持。你的接待日排满了，记者的问题一个也没答。", effects: { rep: -0.5 } },
          critfail: { body: "「他连自己选区丢了几套房子都说不清」——这句不是你讲的，但统计你的桌子时，数字真的对不上。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  }
]);
