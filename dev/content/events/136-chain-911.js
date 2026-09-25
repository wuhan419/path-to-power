/* ============================================================================
 * CONTENT · events/136-chain-911.js
 * 9·11 后话链 —— 爱国法案落地与情报失实，在几年后各自找上门。
 *
 *   本文件是 107-era-2001.js 旗舰叙事（wt02_patriot / wt03_wmd）的余波幕：
 *   每一幕靠 after 续接前幕（前幕没演则本幕静默跳过，可断裂，不强灌历史）。
 *
 *   · 刻意不写 fixed 钉卡 —— planMonth 会把钉死的 eventId 直送过关，
 *     绕过 when.js 的 after 判定，等于把「可断裂」的链强灌给没演过前幕的局。
 *     后幕的到场靠 balance.chainWeightMul（默认 9）加权，几乎一定会来，
 *     但只在前幕真演过的时候来。
 *   · 不写 era —— 一律绝对年窗 minYear/maxYear + scoped；tierRaw 直接按真实层级。
 *   · 铁律 —— 引号只用「」；无真人姓名，一律职务称谓（总统 / 总检察长 / 情报总监）；
 *     每卡恰一个无 cost 无 req 的保底选项；经济字段全部写系数（dyn:true）；
 *     链上每一幕 unique:true；前情用 after 表，不用 flags 表。
 *   · after 目标：ch911_watch 承 wt02_patriot（+6~30 个月）；
 *     ch911_blame 承 wt03_wmd（+8 个月起，不设上限——清算可以来得很晚）。
 *   · 本文件只在结果里落下新旗（watch_list_debtor / owns_the_bill 等），
 *     供日后的清算内容认领；卡上不以 flags 当前情。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2002—2004 · 爱国法落地之后：联邦监视名单伸进本地机场与警局（风险）
   *   承 wt02_patriot —— 联邦来人调阅记录之后，机器开始常态运转。
   * ==================================================================== */
  {
    id: "ch911_watch", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2002, maxYear: 2004, scoped: true, tierRaw: true, tierMin: 2, tierMax: 6, weight: 12, unique: true,
    medium: ["print", "tv", "cable", "internet"],
    after: { id: "wt02_patriot", minMonthsAfter: 6, maxMonthsAfter: 30 },
    title: "联邦监视名单落到了你辖区的机场和警局",
    body: "新法案生效一年多，调阅的权力长成了机器：禁飞与加查名单从联邦下发到本地机场柜台，\n" +
      "反恐拨款的附加条款写进了县警长的预算表，地方执法领了联邦的案件编号当「反恐联络」。\n" +
      "社区里开始有人小声说话：谁在关口被拦下盘问了半小时，谁的执照多审了一轮。你在前幕的态度，联邦和地方各记了一本账——现在，两本账同时来敲你的门。",
    brief: {
      lede: "法案不再是纸上的条文，是登机口被带走的人，和你桌上那份要签字的条款。",
      known: [
        "反恐拨款带附加条款，钱要过你的签字。",
        "名单在联邦手里，地方只见到执行结果。",
        "你在联邦调阅那条线上的态度，两边都有人记得。"
      ],
      rumor: [
        "有人说名单上的人早过了十万，多数是错认。",
        "有人说县警长是自己抢着接案换钱的。"
      ],
      unknown: [
        "今天点头开的路，将来查谁的户口。",
        "谁被多看了一眼，街坊记得，卷宗不记。"
      ],
      terms: [
        { k: "禁飞名单", v: "联邦航空盘查名单，标准不公开。" },
        { k: "反恐拨款", v: "附带执法配合条款的联邦专项资金。" }
      ]
    },
    choices: [
      {
        id: "push", text: "顺着名单走：替县里把反恐拨款与联络官名额一起要下来",
        note: "赌的是恐惧能换成真金白银的基础设施。风险：从此你的名字写在名单机器一侧。",
        base: 0.55, mods: [{ src: "fac", key: "agency", w: 0.4 }, { src: "fac", key: "establishment", w: 0.3 }],
        cost: { fun: 1.5 },
        outcomes: {
          crit: { body: "联络官办公室开进了县大楼，机场多开两条筛查通道，拨款条线写上了你的名字。商会晚宴上你被称为「把安全放在心上的人」——只有散场后的酒保多看了你一眼，没说话。", effects: { rep: 1.4, fun: 2, fac: { agency: 9, establishment: 6, base: -4 }, flags: ["watch_list_debtor"] } },
          ok: { body: "钱到了，名额到了。联邦把你列进取件便利的那一栏，本地社区把你列进取件不便的那一栏。", effects: { rep: 0.6, fun: 1, fac: { agency: 6, establishment: 4 }, flags: ["watch_list_debtor"] } },
          meh: { body: "你跑了几轮，拨款批给了邻县。联邦谢你的「积极姿态」，谢完就没了下文。", effects: { rep: -0.1, fun: -0.5, fac: { agency: 2 } } },
          fail: { body: "筛查通道开了三个月，一位在本地住了三十年的店主被拦下盘查的照片上了周报头版，照片下方印着那份你签过字的条款。", effects: { rep: -1.4, fun: -1, fac: { base: -6, commercial: -4 } } },
          critfail: { body: "联邦稽核发现拨款流向了与你有旧的公司名单。有人替你把那句话写好了：「他靠恐惧做买卖。」这次不用对手做广告，本地人自己会传。", effects: { rep: -2.25, fun: -1.5, fac: { press: -8, base: -6, agency: -4 }, flags: ["watch_list_debtor", "scandal_1"] } }
        }
      },
      {
        id: "paper", text: "配合，但立留档规矩：每一次名单协查都备案、都过法务",
        note: "赌的是纸熬得住：将来总要用一份纸回答。风险：联邦把配合的窗口对你关小。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你的留档表格挡住了两次明显过界的协查请求。本地律师开始把「先过县里那道档」当成可以援引的东西——这是普通人难得拥有的护身符，而它上面有你的名字。", effects: { rep: 1.5, attr: { INT: 1 }, fac: { base: 8, press: 4, agency: -3 }, flags: ["watchdog_file"] } },
          ok: { body: "协查照办，档也照留。联邦嫌你多事，但每一页都挑不出错。", effects: { rep: 0.6, fac: { base: 4, agency: 2 } } },
          meh: { body: "你的表格在档案柜里积灰。要查的照查，没人来调档。", effects: { rep: 0.1 } },
          fail: { body: "你留的档被联邦当成不信任的证据，反恐条线的会议邀请越来越少。本地人倒是安心了——可安心换不来连任。", effects: { rep: -0.8, fac: { agency: -7, establishment: -3 } } },
          critfail: { body: "一桩真案子里的线索绕开了你的留档程序出了县。报告里没写你的名字，但「谁立的规矩耽误了谁」这句话，已经在走廊里传开了。", effects: { rep: -1.6, fac: { agency: -8, establishment: -5 } } }
        }
      },
      {
        id: "town", text: "不开新口子：只办一场社区夜谈，听人说谁被多看了一眼",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "体育馆的折叠椅上坐了三百人，讲了四十分钟。你没有一句能上新闻的话，但第二天开始，被拦的人知道先给谁打电话。", effects: { rep: 0.9, attr: { INTG: 1 }, fac: { base: 5, church: 4 }, flags: ["community_shield"] } },
          ok: { body: "夜谈开了，苦水倒了。事情没有改变，但有人听完了，这件事本身被记住了。", effects: { rep: 0.35, fac: { church: 2 } } },
          meh: { body: "来了二十几个人，说的都是重复的话。没人上头条，也没人记得这场会。", effects: { rep: 0.05 } },
          fail: { body: "夜谈被两边同读：联邦说你煽动对立，报馆问你「除了开会你还做了什么」。你的会开成了谁的都不是。", effects: { rep: -0.5 } },
          critfail: { body: "散场当晚，本州另一头出了事。有人翻出这场夜谈的记录，标题是：「他早就知道，他只开了个会。」", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2004—2005 · 情报失实的清算：当年的表态变成递到桌上的账单（威胁）
   *   承 wt03_wmd —— 那场所谓「大规模杀伤性武器」的战争露出底牌之后。
   * ==================================================================== */
  {
    id: "ch911_blame", grade: "mid", category: "political",
    valence: "bane", dyn: true,
    minYear: 2004, maxYear: 2005, scoped: true, tierRaw: true, tierMin: 2, tierMax: 7, weight: 12, unique: true,
    medium: ["print", "tv", "cable", "internet"],
    after: { id: "wt03_wmd", minMonthsAfter: 8 },
    title: "武器没有找到，当年的表态记录变成了账单",
    body: "开战时的「确证」一件也没有落地，检讨报告一份一份印出来，结论都是那句：依据的是有问题的材料。\n" +
      "到了这个选举季，两党的攻讦词用的是同一句话：「谁当初骗了国会。」制作组翻出你当年的材料——那份背书，或那份质询记录——主播逐字念，字幕压在画面下方，日期标得清清楚楚。\n" +
      "这一次，掌声不在你这边；要不要接这盏灯，才是你的选择。",
    brief: {
      lede: "战争进入对账期。账本的第一行，写的是每个人当年说过的话。",
      known: [
        "检讨结论已公开：关键理由不成立。",
        "你当年的立场有记录、有日期、有你的签名。",
        "本党幕僚已打招呼：别解释，别接话。"
      ],
      rumor: [
        "有人说还有一批原始情报没有解密。",
        "有人说攻讦广告的词是同一班人写的。"
      ],
      unknown: [
        "传票最后落到谁头上，还在协商。",
        "你今晚的说法，明年听证会逐字照读。"
      ],
      terms: [
        { k: "检讨报告", v: "战后官方复盘，承认开战依据有误。" }
      ]
    },
    choices: [
      {
        id: "shift", text: "把账往上递：点名当初递材料、催背书的决策层",
        note: "赌的是攻讦的浪头里也轮得到你。风险：建制的账本上，你记下了他们怎么教你的。",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "press", w: 0.2 }],
        cost: { fav: 1 }, stake: { fav: true },
        outcomes: {
          crit: { body: "你把那句「他们把可能包装成确证，我们只是签字的人」送进了每一个晚间节目。对手给你让出半句版面，党机器在电话里祝你好运——语气不像祝福。", effects: { rep: 1.5, fac: { press: 8, base: 5, establishment: -9 }, flags: ["blame_upward"] } },
          ok: { body: "账递上去了，接住的是别人家的议员。你出了一口险气，也上了一本黑名单的候补页。", effects: { rep: 0.7, fac: { press: 4, establishment: -5 } } },
          meh: { body: "你点了名，可当天有更响的人物倒下。镜头从你脸上扫过去，没有停。", effects: { rep: -0.1 } },
          fail: { body: "上面的人一句「我那时也问过证据」就把球踢了回来，记录显示你比他们早三个月闭嘴。递账的人自己先对不上账。", effects: { rep: -1.6, fac: { establishment: -8, base: -4, press: -4 } } },
          critfail: { body: "你手里那份「内部也有人摇头」的说法被证伪：发你材料的人站出来出示了原件。骗国会的人里，从此有一个地方级别的名字。", effects: { rep: -2.5, fac: { establishment: -10, press: -6, base: -5 }, flags: ["blame_upward", "scandal_2"] } }
        }
      },
      {
        id: "own", text: "公开认账：我当年信了该怀疑的东西，责任不全在别人",
        note: "赌的是认错本身能立住。风险：两段广告都拿你这句话当素材。",
        base: 0.4, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你说：「我被说服了，我也有份。」当时被两边夹击，几年后一份口述史引了这句——他说出来了，所以我们能往前走。", effects: { rep: 1.7, attr: { INTG: 3 }, fac: { press: 7, base: 6, establishment: -5 }, flags: ["owns_the_bill"] } },
          ok: { body: "你认了账。基层觉得你说的是人话，上面觉得你不懂规矩。两本账你都上了。", effects: { rep: 0.8, attr: { INTG: 1 }, fac: { base: 4, press: 3 } } },
          meh: { body: "你的认错声明和本周所有认错声明排在一起，读者分不清哪句是你的。", effects: { rep: 0.1 } },
          fail: { body: "对面把你的认错剪成「他承认骗了选民」——主语换了，句子还是你那句。你解释了三天，没人听完。", effects: { rep: -1.3, fac: { base: -5, press: -4 } } },
          critfail: { body: "认到一半，有人追问你当年从那份材料里得到了什么。你答不上来，于是认错变成了认罪，只是被告席上只有你。", effects: { rep: -2.2, fac: { press: -7, base: -6, establishment: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "ledger", text: "不接这个话头：把账单留在桌上，人去把本地的实事办完",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "全国在逐字念你的旧表态，你在念本地的预算听证。一个月后话题翻了页，「那阵子他一直在干活」这句话，是邻居替你讲的。", effects: { rep: 0.9, attr: { INTG: 1 }, fac: { base: 5, church: 4 } } },
          ok: { body: "你一个字没多说，一单事没少办。没人引用你，也没人能用你。", effects: { rep: 0.35, fac: { church: 2 } } },
          meh: { body: "这轮清算里没有你的名字，这轮的记忆里也没有。", effects: { rep: 0.05 } },
          fail: { body: "不接话被两边同读成默认。记者的问题从「你怎么看」变成「你是不是」，你一次都没答。", effects: { rep: -0.5 } },
          critfail: { body: "你的沉默最后也被引用了：「他连一句当年为什么信都讲不出来。」这句不是你说的，但镜头前坐的是你。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  }
]);
