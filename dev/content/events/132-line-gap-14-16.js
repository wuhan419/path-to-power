/* ============================================================================
 * CONTENT · events/132-line-gap-14-16.js
 * 2014—2016 定点大事补薄（Track B · 第二轮补密度，文件号 132）。
 *
 * 形制（见 docs/PARALLEL-CONTENT-WORK.md §4 与 docs/CONTENT-SCHEMA.md §11.6/§11.7）：
 *   · 本文件是 125/126 两年带之间的定点缺口补薄：2014 中选变天、2014 双重恐慌、
 *     2015 核协议、2016 大法官席位空悬，共 4 张新卡。
 *   · 不写 era —— 一律 minYear/maxYear + scoped，绝对年窗走 when.js。
 *   · 到点必发 —— 四张卡全部钉进文件末尾 POTUS.define("fixed", …)。
 *   · 每卡恰有一个「保底」选项：零 cost、零 req、高地板低天花板、不埋负面 flag。
 *     其余选项各带真实支出（钱或人情），支出↔把握↔天花板三者错位互衡。
 *   · 敏感题材只写政治处境，不写血腥细节；不点真人姓名，一律用职务称谓
 *     （在任总统 / 反对党领袖 / 提名人 / 多数党领袖 / 说客），照 126-line-2015-18 的做法。
 *   · 经济数值写系数（dyn:true）；引号只用「」；标题为完整陈述句。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2014-11 · 中期选举变天 —— 多数易手，总统任期进入否决期
   * ==================================================================== */
  {
    id: "ln14_wave", photo: "era-2014.jpg", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 2014, maxYear: 2014, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 11,
    title: "中期选举执政党净丢九席，总统剩余任期进入否决期",
    body: "十一月的开票夜，农业州与南方一块块翻色——参院净丢九席，多数党鞭换了人；对面的众院差距同时扩大。" +
      "在任总统的剩余两年被记者写成「否决期」：人事冻结，拨款改口径，每位部长开口先问能不能两党联署。\n" +
      "党部里你的电话两线同时响：一线要你谈路线，一线要你闭嘴。委员会的椅子等着重分。有人说，新多数党团已经在排一份账：谁在什么时候说了什么——本周的沉默，也有价格。",
    choices: [
      {
        id: "hold_local", text: "不评路线不站队，只守本地已立项的议程",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "党争换了一茬人，你还在原地办本地的事。两边重排椅子时发现：都得跟你共事。", effects: { rep: 0.8, fac: { base: 3, establishment: 3 } } },
          ok: { body: "你没评价任何人，也没人挑出你任何一句话。", effects: { rep: 0.3 } },
          meh: { body: "那几周没人想起你，这本身就等于安全。", effects: { rep: 0.05 } },
          fail: { body: "两头都把你的安静读成对另一头的效忠，报上开始给你配问号。", effects: { rep: -0.5, fac: { press: -3 } } },
          critfail: { body: "沉默被算成「谁的人都不是」，重排名单时你排在末尾。", effects: { rep: -1.0, fac: { base: -4 } } }
        }
      },
      {
        id: "sign_pivot", text: "联合同僚递备忘录，要白宫在剩余任期转向",
        note: "赌选民恨的是输而不是方向。风险：白宫与党团都记这笔账。",
        base: 0.47, mods: [{ src: "fac", key: "press", w: 0.3 }, { src: "attr", key: "CUN", w: 0.25 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "备忘录被全国报端引用，改革派捐款与电视台访谈一起涌来；党团开会时，你成了必须请的人。", effects: { rep: 1.5, fac: { press: 10, base: 5, establishment: -8 } } },
          ok: { body: "签名凑齐了，转向的话题被你逼上桌；上面也有人在你的名字下面画了红线。", effects: { rep: 0.6, fac: { press: 4, base: 3, establishment: -5 } } },
          meh: { body: "备忘录递了出去，像递进一只抽屉。", effects: { rep: 0 } },
          fail: { body: "转向成了别人的口号，你的署名被白宫公开点名成「造反的那位」。", effects: { rep: -1.6, fac: { establishment: -10, press: -4 } } },
          critfail: { body: "败选清算轮到你：拨款座次、党内背书、晚宴座位一并收回，机器逢人便说当初就是你带的头。", effects: { rep: -2.4, fac: { establishment: -14, press: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "defend_record", text: "自掏腰包替政府的剩余议程打辩护广告",
        note: "赌忠诚在重排椅子时最值钱。风险：两年后这卷带子归你。",
        base: 0.46, mods: [{ src: "fac", key: "establishment", w: 0.35 }, { src: "attr", key: "CUN", w: 0.25 }],
        cost: { fun: 0.6 },
        outcomes: {
          crit: { body: "政府在最难看的时候记得谁掏了钱：委员会给你换了一把大椅子，捐款名单把你挪到第一行。", effects: { rep: 1.2, fun: 0.8, fac: { establishment: 14, commercial: 6, base: -8 } } },
          ok: { body: "你护住了政府，上面记你一功；街区的怒气没处去，全记到你头上。", effects: { rep: 0.4, fun: 0.3, fac: { establishment: 8, base: -5 } } },
          meh: { body: "广告播了两周，没人记得是谁买的。", effects: { rep: -0.1 } },
          fail: { body: "风向继续朝下，你的辩护广告被剪进对手的广告，配的是败选夜的哭脸。", effects: { rep: -1.5, fun: -0.5, fac: { press: -6, base: -5 } } },
          critfail: { body: "政府末段每项不体面的妥协都算到你名下，捐款人开始当面问你：值吗。", effects: { rep: -2.4, fun: -1.0, fac: { press: -8, establishment: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "fund_newcomers", text: "出钱办败选后新星论坛，签下一批新面孔",
        note: "赌下一波席位由这批新人带回。风险：钱与人都会自己长腿。",
        base: 0.43, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "commercial", w: 0.25 }],
        cost: { fun: 0.8 },
        outcomes: {
          crit: { body: "论坛成了本党检讨会的地下总部，两个新人公开喊你导师。两年后的名单上，有一列是你排的。", effects: { rep: 1.5, fun: 0.9, fac: { commercial: 12, establishment: 6, base: -6 } } },
          ok: { body: "你攒下一条自己的线：钱花得出，名字也挂得上。", effects: { rep: 0.5, fac: { commercial: 6, establishment: 3 } } },
          meh: { body: "人来了，谢了，然后各回各家。", effects: { rep: -0.1 } },
          fail: { body: "新人转头骂你「把我们当资产」，老同僚笑你押错了马。", effects: { rep: -1.5, fun: -0.7, fac: { press: -5, base: -4 } } },
          critfail: { body: "论坛的账目被扒了个干净，你从推手变成被告，机器把你当败选的样本展览。", effects: { rep: -2.3, fun: -1.1, fac: { press: -8, establishment: -5 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2014-08～10 · 双重恐慌 —— 处决录像与首例输入病例同时抵达
   * ==================================================================== */
  {
    id: "ln14_panic", photo: "era-2014.jpg", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2014, maxYear: 2014, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 12, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 10,
    title: "处决录像与首例输入病例同时引爆恐慌，国会赶在选前表决",
    body: "八月中，一支境外武装把本国记者处决的录像放上流媒体，四十八小时内循环在每一块屏幕上；九月底，" +
      "首例输入性传染病（境外感染、入境后发病）确诊入院，十月初病人离世、两名本地护士相继阳性——急诊筛查、禁令请愿与「安全」立法拉满排队。国会赶在中选前表决，每个人都要显得强硬。\n" +
      "你手上只有一张牌：本周之内，你必须对两件没搞清楚的事各说一句话。两头的定性都没定，两边都在等你先开口；而本地急诊的筛查缺口名单摊在你桌上。退潮之后谁显得利用了死者，没人提前告诉你。",
    choices: [
      {
        id: "run_drill", text: "只协调医院演练与信息公开会，不猜因不喊话",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "演练按部就班，信息公开会坐满却没一人挑出错。医院的人记住了：那种时候他没抢功。", effects: { rep: 0.85, fac: { base: 4, agency: 3 } } },
          ok: { body: "你排了演练、开了通报会，没说错话，也没上头条。", effects: { rep: 0.3 } },
          meh: { body: "你做了该做的事，全国的镜头在拍别处。", effects: { rep: 0.05 } },
          fail: { body: "有人当众问：你就没什么要说的吗？安静成了一句指控。", effects: { rep: -0.6, fac: { press: -3 } } },
          critfail: { body: "你的低调被剪成「他那天躲起来了」，两条恐慌一起烧到你身上。", effects: { rep: -1.1, fac: { base: -4, press: -3 } } }
        }
      },
      {
        id: "back_crackdown", text: "联署禁令请愿，把两件事讲成同一个威胁",
        note: "赌恐惧比追问好卖。风险：退潮后你的名字和「借死者拉票」同榜。",
        base: 0.48, mods: [{ src: "fac", key: "military", w: 0.35 }, { src: "attr", key: "CUN", w: 0.25 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "你把安全语言讲成了本地共识，军界与鹰派电台把你当会办事的人，请愿签名一夜过万。", effects: { rep: 1.4, fun: 0.5, fac: { military: 10, base: 6, press: -4 } } },
          ok: { body: "你站了强硬一边，掌声来自外面，医院的电话从此难打。", effects: { rep: 0.6, fac: { military: 6, base: 3, agency: -3 } } },
          meh: { body: "你签了名，全国已有一百个人签过。", effects: { rep: 0 } },
          fail: { body: "筛查专家在电视上逐条拆你的话，本地医护公开说你贩卖恐慌。", effects: { rep: -1.5, fac: { press: -6, agency: -6 } } },
          critfail: { body: "恐慌退潮，你的名字与「借死者拉票」印在同一张传单上，发到每一家门口。", effects: { rep: -2.5, fac: { press: -9, military: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "push_facts", text: "公开筛查流程与数据，反对恐慌式立法",
        note: "赌事实跑得赢情绪。风险：专家不领情，媒体嫌你平淡。",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "press", w: 0.25 }],
        cost: { fun: 0.5 },
        outcomes: {
          crit: { body: "你把流程讲成一张人人看得懂的图，医护公开站到你身边，监管机构反过来引用你的说法。", effects: { rep: 1.6, attr: { INT: 2 }, fac: { press: 8, base: 6, agency: 5 } } },
          ok: { body: "你压下了几分恐慌，上面嫌你泼冷水，街坊记你一功。", effects: { rep: 0.7, fac: { base: 4, agency: -3 } } },
          meh: { body: "你讲了数据，那周没人想要数据。", effects: { rep: 0 } },
          fail: { body: "你的「不必恐慌」出了纰漏：又一例确诊公布，报上把你写成说大话的人。", effects: { rep: -1.6, fun: -0.4, fac: { press: -8, agency: -5 } } },
          critfail: { body: "你反对的法案照样通过，而你被写成替危险说话的人；监管与建制同时关门。", effects: { rep: -2.5, fun: -0.9, fac: { establishment: -12, agency: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "fund_beds", text: "出钱为本地急诊补筛查设备与隔离床位",
        note: "把钱花在办事上是最稳的答案。风险：账目与镜头都会回来问你。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "fac", key: "establishment", w: 0.3 }],
        cost: { fun: 0.8 },
        outcomes: {
          crit: { body: "设备当周到货，隔离床位成了本区样板，邻州来抄你的方案。医护见到你都喊名字。", effects: { rep: 1.3, fun: 0.6, attr: { INT: 1 }, fac: { establishment: 10, commercial: 5, agency: 4 } } },
          ok: { body: "床位铺好了，程序排顺了，钱换来了实打实的一句「办成过半」。", effects: { rep: 0.45, fac: { establishment: 6, agency: 2 } } },
          meh: { body: "设备入库，疫情已过，没人翻你的发票。", effects: { rep: 0 } },
          fail: { body: "有人查账：「恐慌刚起他就忙着给自己立碑。」钱花了，好话没落一句。", effects: { rep: -1.4, fun: -0.6, fac: { press: -6 } } },
          critfail: { body: "采购被扒出关联公司，你成了恐慌里最好捏的那只蚂蚱，检察处在约采访。", effects: { rep: -2.2, fun: -1.0, fac: { press: -8, commercial: -4 }, flags: ["investigation_open"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2015-07 · 核问题框架协议 —— 一纸协议变成一场忠诚考试
   * ==================================================================== */
  {
    id: "ln15_iran", photo: "era-2015.jpg", grade: "major", category: "foreign",
    valence: "risk", dyn: true,
    minYear: 2015, maxYear: 2015, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 7,
    title: "核问题框架协议签署，反对派把撕毁协议写成初选承诺",
    body: "七月，主要大国与德黑兰签下框架协议：核查换制裁解除，技术附件厚过一本电话簿。" +
      "反对党领袖带着几位资深同僚致信对方最高领袖，公开把谈判中的盟友称作「邪」；初选季刚开跑，「撕毁协议」成了每个候选人的标配承诺。\n" +
      "游说预算与捐款一夜分成两极，两边都在订你的档期。初选把协议当成必问题，一整年你躲不开它。\n" +
      "附件厚得没几个人读完，表态只剩情绪；有人说那封联名信本就是写给镜头的。你今天说的哪一句，两年后会被人原样念回来打你？",
    choices: [
      {
        id: "ask_brief", text: "只要求技术简报与附件全文公开，不谈立场",
        base: 0.63, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你避开全部口水，只把核查条款问得极细。委员会幕僚开始主动把材料寄给你。", effects: { rep: 0.9, fac: { establishment: 4, press: 3 } } },
          ok: { body: "你讲条款、讲核查、讲程序。不得罪人，也不上头条。", effects: { rep: 0.3 } },
          meh: { body: "你的技术性提问像投进深井的石子。", effects: { rep: 0.05 } },
          fail: { body: "两头都嫌你绕开要害：这人今天不敢说人话。", effects: { rep: -0.5, fac: { base: -3 } } },
          critfail: { body: "你的「只谈程序」被两头同读成替对面挡了一下，两边的信任同时降了一格。", effects: { rep: -1.0, fac: { press: -4 } } }
        }
      },
      {
        id: "sign_letter", text: "加入联名信，向初选选民承诺撕毁协议",
        note: "赌基本盘把协议当成出卖。风险：几年后这卷带子归你。",
        base: 0.46, mods: [{ src: "fac", key: "base", w: 0.35 }, { src: "attr", key: "CUN", w: 0.25 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "你的署名被党内电台循环播放，「撕毁」写进了每位候选人的统一讲稿；初选资金第一次主动朝你流。", effects: { rep: 1.4, fun: 0.7, fac: { base: 12, military: 6, establishment: -6 } } },
          ok: { body: "你站了强硬一边，基层记你的力，党团的老派系开始绕着你走。", effects: { rep: 0.5, fun: 0.3, fac: { base: 7, military: 3, establishment: -4 } } },
          meh: { body: "名单上几十个人，没人数到你的字。", effects: { rep: -0.1 } },
          fail: { body: "风向转向「他至少读完了协议」，你的联名信被对手印成反面教材。", effects: { rep: -1.6, fac: { press: -8, establishment: -6 } } },
          critfail: { body: "协议后来被逐条证明落地，你成了「替愤怒签字的人」，捐款与背书一并回头算账。", effects: { rep: -2.5, fac: { press: -10, establishment: -6, foreign: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "back_deal", text: "公开支持核查机制，与本党口径拉开距离",
        note: "赌建制与盟国记得谁站了台。风险：初选机器把你当软肋。",
        base: 0.44, mods: [{ src: "fac", key: "establishment", w: 0.35 }, { src: "attr", key: "INTG", w: 0.25 }],
        cost: { fun: 0.6 },
        outcomes: {
          crit: { body: "你是同级别里第一个公开挺核查条款的人，全国专栏与使馆圈都引用了你那段话；党内的门开始变窄。", effects: { rep: 1.7, fac: { press: 10, establishment: 8, foreign: 6, base: -10 } } },
          ok: { body: "你护住了协议，上层与媒体记你一功；基层的捐款电话冷了一个星期。", effects: { rep: 0.7, fac: { press: 4, establishment: 4, base: -6 } } },
          meh: { body: "你说了支持，声音被更大的名字盖过去。", effects: { rep: 0, fac: { base: -2 } } },
          fail: { body: "本党募款信直接拿你当反面样本：「他不为我们说话。」", effects: { rep: -1.8, fac: { base: -12, press: -5 } } },
          critfail: { body: "你被写进初选清洗名单：地方党职、晚宴座位、外部背书一并撤下。", effects: { rep: -2.7, fac: { base: -16, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "run_forum", text: "自费办核查条款研修，把自己做成懂行的人",
        note: "懂行是慢钱，两头都想用你。风险：两头也都不想你发言。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "foreign", w: 0.3 }],
        cost: { fun: 0.8 },
        outcomes: {
          crit: { body: "研修手册成了本地媒体唯一引用得到的技术文件，出访团与监管机构都来请你讲解。你成了「读过附件的那个」。", effects: { rep: 1.2, fun: 0.6, attr: { INT: 2 }, fac: { foreign: 10, agency: 5, establishment: 4 } } },
          ok: { body: "会开了，手册印了，你的名字和「专业」挂上了钩。", effects: { rep: 0.4, fac: { foreign: 5, establishment: 3 } } },
          meh: { body: "钱花了，来听的都是本来就支持你的。", effects: { rep: 0 } },
          fail: { body: "两边的说客同时抱怨：他把我们各自的道理讲成了自己的功劳。", effects: { rep: -1.3, fun: -0.5, fac: { press: -4, foreign: -4 } } },
          critfail: { body: "有人翻出研修的赞助名单，你被写成「拿对面的钱上课」，检察处在约采访。", effects: { rep: -2.1, fun: -0.9, fac: { commercial: -6, press: -5 }, flags: ["investigation_open"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2016-02 · 大法官席位空悬 —— 选举年的提名人卡在门外
   * ==================================================================== */
  {
    id: "ln16_seat", photo: "era-2016.jpg", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 2016, maxYear: 2016, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "print", "internet", "social"], month: 2,
    title: "资深自由派大法官选举年去世，提名人被卡在委员会门外",
    body: "二月，一位在任数十年的自由派大法官去世。白宫一周内交出一名中间派提名人，名字却卡在参院司法委员会门外：" +
      "多数党领袖宣布「选举年不提人、不听证、不表决」，把席位留给下一任总统。空缺一整年，法院一代人的走向突然变成竞选议题。\n" +
      "两边的电话同时打进来，都要你本周内定性。本地律师公会与教会团体各备好一份公开信，等你第一个签名。\n" +
      "这条「选举年不提人」的政治先例灵不灵，没有定论；但填这个位子的人由谁选，押的正是今年这张选票。",
    choices: [
      {
        id: "stay_quiet", text: "不掺位子之争，只办手头听证与选区事务",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "空位吵了一年，你手头的事办完了一半。两边后来都发现：那几个月他没添火。", effects: { rep: 0.85, fac: { establishment: 3, base: 3 } } },
          ok: { body: "你没进那场辩论，也没留下一句可剪的话。", effects: { rep: 0.3 } },
          meh: { body: "这场戏里没有你的台词，也没人写你的不是。", effects: { rep: 0.05 } },
          fail: { body: "有人问：法院都成这样了他还闷声做事？沉默也成了话。", effects: { rep: -0.5, fac: { press: -3 } } },
          critfail: { body: "你的回避被两头同读成心虚，秋天对手的广告直接点了你的名。", effects: { rep: -1.0, fac: { base: -4, press: -3 } } }
        }
      },
      {
        id: "force_hearing", text: "为提名人开听证，施压委员会交付全院表决",
        note: "赌程序正义能跨党圈粉。风险：多数党机器把你当钉子。",
        base: 0.47, mods: [{ src: "fac", key: "press", w: 0.3 }, { src: "attr", key: "INTG", w: 0.25 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "你把「为什么不表决」问成了全国的题目，律师公会与两家报端社论联名称引；多数党团开始给你让路又防你。", effects: { rep: 1.5, fac: { press: 10, base: 6, establishment: -10 } } },
          ok: { body: "听证的话题被你逼上桌，舆论买账，党里的门变窄了一扇。", effects: { rep: 0.6, fac: { press: 5, base: 3, establishment: -5 } } },
          meh: { body: "你喊了开听证，全国已有二十个人喊过。", effects: { rep: 0 } },
          fail: { body: "你的要求被剪成「他想绕过选民」，本党募款信整周轮播这一段。", effects: { rep: -1.7, fac: { establishment: -12, press: -4 } } },
          critfail: { body: "你成了不听话的那个：委员会席位重排时，你的名字被挪到最后一行。", effects: { rep: -2.6, fac: { establishment: -16 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "back_freeze", text: "站队「选举年不提人」，向基本盘兑现强硬",
        note: "赌本党只要你不松口。风险：历史会记住谁冻结了席位。",
        base: 0.45, mods: [{ src: "fac", key: "base", w: 0.35 }, { src: "attr", key: "CUN", w: 0.25 }],
        cost: { fun: 0.5 },
        outcomes: {
          crit: { body: "你把「让下一任总统来定」讲成一套能被引用的道理，党内电台循环播你的话，募款按钮下面配的就是你的脸。", effects: { rep: 1.3, fun: 0.8, fac: { base: 12, establishment: 6, press: -6 } } },
          ok: { body: "你守住了党的口径，钱先进了你的账户；中间选民开始把你写进怀疑名单。", effects: { rep: 0.5, fun: 0.3, fac: { base: 7, establishment: 3, press: -3 } } },
          meh: { body: "你重复了一句安全的话，无人称赞也无人记得。", effects: { rep: -0.1 } },
          fail: { body: "空悬拖成了丑闻，报上把「他冻结了一个位子」印在你的照片下面。", effects: { rep: -1.6, fac: { press: -8, base: -5 } } },
          critfail: { body: "法院改朝换代后，那年的拖延被逐字回算成先例，你的名字在每一份检讨稿里。", effects: { rep: -2.4, fac: { press: -10, establishment: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "build_issue", text: "把法院走向做成自己的竞选议题，募新选民",
        note: "赌议题比人活得久。风险：花钱买一副算盘，两头不领情。",
        base: 0.43, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "commercial", w: 0.25 }],
        cost: { fun: 0.8 },
        outcomes: {
          crit: { body: "你把一个空位讲成了一代人的问题，登记桌排到街口，两家倡议组织把你的讲稿编进教材。", effects: { rep: 1.6, voters: { warm: 400 }, fac: { base: 8, commercial: 5, establishment: -5 } } },
          ok: { body: "议题立住了，新名字进了名册，老账本上多了你的开销。", effects: { rep: 0.6, voters: { warm: 150 }, fac: { base: 4 } } },
          meh: { body: "钱下去了，选民动了动，没动到你这边。", effects: { rep: 0 } },
          fail: { body: "两边同时骂你「拿法院拉票」，你的广告成了共同靶子。", effects: { rep: -1.5, fun: -0.7, fac: { press: -5 } } },
          critfail: { body: "赞助来源被扒出与某位被卡提名人的金主重合，你从议题推手变成新闻主角。", effects: { rep: -2.4, fun: -1.1, fac: { press: -8, commercial: -5 }, flags: ["scandal_1"] } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 定点表 fixed · 2014—2016 补薄（4 个锚点，major 3 个；年月按史实锚定）
 *   · ln14_panic 钉 2014-10：首例确诊十月初病故、本地继发感染当月——恐慌峰值月。
 *   · 存量 2014-08 ln14_ferguson / 2015、2016 各锚点归 125/126 文件，互不重复。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln14_panic", year: 2014, month: 10, grade: "mid" },
  { event: "ln14_wave", year: 2014, month: 11, grade: "major" },
  { event: "ln15_iran", year: 2015, month: 7, grade: "major" },
  { event: "ln16_seat", year: 2016, month: 2, grade: "major" }
]);
