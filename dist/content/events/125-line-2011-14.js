/* ============================================================================
 * CONTENT · events/125-line-2011-14.js   （Track-B · B6 带子：2011—2014）
 * 连续时间轴 · 债务上限到弗格森：占领运动之后的四个年头。
 *
 * 写法沿用 events/110-line-1980s.js 的样板（见 docs/CONTENT-SCHEMA.md §11.7 / §13）：
 *   · 不写 era —— 一律绝对年窗 minYear/maxYear + scoped，分期专属走 eraWeightMul。
 *   · 到点必发 —— 每张卡都在本文件末尾 POTUS.define("fixed", …) 里钉死年月与量级，
 *     并顺手钉入 54-era-waves.js 的 wave_occupy_low（2011 年帐篷城的余震）。
 *   · 低层级落点 —— 多数卡 tierMin:0，让社区小人物也被历史正面撞上。
 *   · 经济只写系数（dyn:true），引号只用「」，每卡留一条既无 cost 又无 req 的保底。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2011-05 · 本·拉丹被击毙 —— 十年战争的句号落在一个深夜
   * ==================================================================== */
  {
    id: "ln11_binladen", photo: "era-2011.jpg", grade: "mid", category: "foreign",
    valence: "boon", dyn: true,
    minYear: 2011, maxYear: 2011, scoped: true, tierRaw: true, tierMin: 0, tierMax: 3, weight: 14, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 5,
    title: "深夜讲话宣布：本·拉丹已被击毙",
    body: "总统在十点半走进椭圆形办公室，讲了一句「我们正义已经得到」。十年、近三千条人命、几万亿美元，收在一段十一分钟的录像里。\n" +
      "你所在的街区当晚有人按喇叭，也有人在算另一件事：驻军一个没撤，退伍军人事务的案子还在你桌上排着。" +
      "本地电视台要的是「反应」，两句话就够，谁的都能播。有人说情报其实早到了几周，只等周期挑日子——这股上扬的士气能撑几个月，没人敢说。",
    choices: [
      {
        id: "vision", text: "把话题从复仇引到「打完仗之后怎么办」",
        note: "赌全国愿意听一句远一点的话。风险：这晚没人想谈账单。",
        base: 0.62, req: { tier: 2 }, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你在一片欢呼里谈了撤军、退伍安置和国债，第二天被两家全国性媒体引为「那晚唯一谈明天的地方议员」。", effects: { rep: 1.5, fac: { press: 8, establishment: 6 } } },
          ok: { body: "你说的话有人记下了，调子不讨嫌也不出格。", effects: { rep: 0.8, fac: { press: 5 } } },
          meh: { body: "你的采访被切到只剩一句「很重要」，别人在讲突击队。", effects: { rep: 0.4 } },
          fail: { body: "你谈长远，主持人问的是「你高兴不高兴」，你对着镜头愣了两秒。", effects: { rep: 0.2 } },
          critfail: { body: "你那一晚的稿子被翻出来，标题是「他在庆祝的时候在算钱」。没伤到你，但有人记住了这张脸。", effects: { fac: { base: 4 } } }
        }
      },
      {
        id: "honor", text: "只谈军队与家属：办悼念、催安置拨款",
        note: "赌军人社区与工会把这份情算成自己的账。风险：普通选民觉得这是例行公事。",
        base: 0.56, req: { rep: 0.6 }, mods: [{ src: "fac", key: "military", w: 0.35 }],
        outcomes: {
          crit: { body: "你在基地门口替家属念了名字清单，部队、工会与教会同时记你这一份；那笔安置款也过了。", effects: { rep: 0.4, fac: { military: 16, base: 12, church: 6 } } },
          ok: { body: "你替家属跑了手续，军队社区与基层组织都领了情。", effects: { rep: 0.4, fac: { military: 10, base: 8 } } },
          meh: { body: "你去露了个面，话没说几句，人倒是握了不少。", effects: { rep: 0.2, fac: { military: 5 } } },
          fail: { body: "悼念被你办成了一场剪彩，老兵在镜头前说了句不太客气的话。", effects: { rep: 0.2 } },
          critfail: { body: "安置款最终卡在程序里，家属们记得你答应过什么。没有人受伤，只是这份账挂在了你名下。", effects: {} }
        }
      },
      {
        id: "no_headline", text: "不发全国性的话，只在本地致意一句",
        base: 0.75, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你不抢话筒，只在本地念了一句悼词。教堂和家属后来提起这件事时说「他没蹭」。", effects: { rep: 0.4, fac: { church: 4, establishment: 3 } } },
          ok: { body: "你说了句得体的短话，没人记得，也没人挑刺。", effects: { rep: 0.2 } },
          meh: { body: "这一页你翻得干净利落，第二天没人想起你。", effects: {} },
          fail: { body: "你太安静了，对手在本地电台问了一句「他在哪」。", effects: { rep: 0.2 } },
          critfail: { body: "「他躲起来了」成了一句本地笑话，仅此而已。", effects: {} }
        }
      }
    ]
  },

  /* ======================================================================
   * 2011-08 · 债务上限僵局与评级下调 —— AAA 被剥掉的那个周五
   * ==================================================================== */
  {
    id: "ln11_debt", grade: "major", category: "finance",
    valence: "risk", dyn: true,
    minYear: 2011, maxYear: 2011, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 16, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 8,
    title: "债务上限僵局第十天，美国被剥掉了 AAA 评级",
    body: "债务上限——国会给自己设的联邦借款总额天花板——两党为抬高它吵了整整两个月，标准普尔在周五收盘后把美国评级下调一级。电视把这事讲成世界末日，你的电话被本地小老板打爆：贷款、信用卡、养老金。\n" +
      "评级掉了，美元没崩，市场下周可能就涨回去；两家本地银行已经在收紧贷款、问要不要裁员。\n" +
      "党部要你支持那份「负责任方案」，基层要你反对任何让步。镜头要你回答一个问题：这笔账该谁还。有人说削减条款里替承包商塞好了私货——你今晚这句话，明年会被重播。",
    choices: [
      {
        id: "fiscal_deal", text: "公开为「削减换上限」的止损方案背书",
        note: "赌建制与市场领你的情。风险：基层把你当成替华尔街擦账的人。",
        base: 0.44, cost: { fav: 0.5 }, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "establishment", w: 0.2 }],
        outcomes: {
          crit: { body: "方案过关，你在财经版上被写成「肯负责的地方声音」，银行家与党团同时向你伸手。", effects: { rep: 0.7, fac: { establishment: 18, commercial: 14, base: -8 } } },
          ok: { body: "你站对了边，党内的门开了一条缝，街区里有人开始叫你「他们的人」。", effects: { rep: 0.45, fac: { establishment: 12, commercial: 10, base: -6 } } },
          meh: { body: "你替一个记不住名字的方案说了话，两头都没记住你。", effects: { rep: 0.11, fac: { establishment: 4, base: -4 } } },
          fail: { body: "方案通过那天油价与贷款利率一起上，你的选区只记得是你投的票。", effects: { rep: -0.33, fac: { establishment: -8, base: -10 } } },
          critfail: { body: "自动减赤条款落地，你的选区第一批裁掉的是退伍军人诊所。报纸登了你那句「别无选择」。", effects: { rep: -0.55, fac: { establishment: -14, commercial: -8, base: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "refuse_ceiling", text: "拒绝任何让步，把僵局讲成对浪费的审判",
        note: "赌民愤撑得住你。风险：真违约那天，你就是逼宫的人。",
        base: 0.36, cost: {}, mods: [{ src: "fac", key: "base", w: 0.35 }],
        outcomes: {
          crit: { body: "最后让步的是别人，你一句没软。街头把你的话印成了标语，捐款第一次从外面进来。", effects: { rep: 0.9, fac: { base: 14, establishment: -16, commercial: -10 }, voters: { warm: 500 } } },
          ok: { body: "你守住了阵地，基层爽了，党部的电话开始不接。", effects: { rep: 0.66, fac: { base: 10, establishment: -12 }, voters: { warm: 200 } } },
          meh: { body: "你骂得很响，但新闻里已经换成了别人的名字。", effects: { rep: 0.22, fac: { establishment: -4 } } },
          fail: { body: "养老金支票晚发了一周，你的选区第一次发现「不妥协」是有代价的。", effects: { rep: -0.5, fac: { establishment: -12, commercial: -10, base: -6 } } },
          critfail: { body: "技术性违约真的发生，评级二次下调。听证会请你的理由是：你当时在台上喊得最响。", effects: { rep: -0.9, fac: { establishment: -18, commercial: -14, press: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "quiet_work", text: "不站队，只替本地的贷款与养老金跑具体事",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "全国在吵，你在替两家公司谈过桥贷款。事成了，没人把你写进任何一边的故事。", effects: { rep: 0.11, fac: { base: 6 } } },
          ok: { body: "你办成了几件小事，没参与任何一句大话。", effects: { rep: 0.11, fac: { base: 5 } } },
          meh: { body: "这段时间没人想起你，你也没想起任何人。", effects: {} },
          fail: { body: "两边都问了一句「你到底站哪边」，你的答案听起来像没有答案。", effects: { rep: -0.22, fac: { base: -3 } } },
          critfail: { body: "有记者写了一段：国家在悬崖边时，你们的代表在忙着填表格。", effects: { rep: -0.22, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2012-09 · 班加西领事馆遇袭 —— 九小时的求援电话（分层卡）
   *   底（0-3）旁观自救 · 中（4-6）表态执行 · 高（7-9）决策担当
   * ==================================================================== */
  {
    id: "ln12_benghazi", grade: "mid", category: "foreign",
    valence: "bane", dyn: true,
    minYear: 2012, maxYear: 2012, scoped: true, tierRaw: true, tierMin: 0, weight: 14, unique: true,
    medium: ["cable", "tv", "internet", "social"], month: 9,
    title: "驻班加西领事馆遭袭，四名美国人死亡",
    body: "夜里十点半，火箭弹落进沙漠边上的旧办公楼，之后是九小时的枪声与打不通的求援电话。大使死了。\n" +
      "第二天上午，官方说法先讲「一部抗议视频」，可同一处馆点先前就被袭过，增援安全的申请也被驳回过——那份审批链此刻能一份份念出来。全国电视台开始问同一个问题：那九小时里，谁在给谁打电话。\n" +
      "离大选六周，任何一句「程序还在走」都会被反复回放。有人说头几个小时其实有可动的救援。你要真相，还是要队伍。",
    choices: [
      {
        id: "say_very_little", text: "只发一句哀悼声明，「定性」两个字绝不出口",
        note: "赌这件事轮不到你说话。风险：沉默也是表态，只是没人替你做记录。",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        base: 0.72, mods: [{ src: "attr", key: "CHA", w: 0.25 }],
        outcomes: {
          crit: { body: "声明措辞稳妥，家属的秘书回了一封谢函。本地报纸把你的名字放在第四段。", effects: { rep: 0.4, fac: { establishment: 3, base: 2 } } },
          ok: { body: "声明发出去，当天就被更大的标题盖住了。没人来找你补话。", effects: { rep: 0.2, fac: { establishment: 2 } } },
          meh: { body: "你的话没被引用，也没被反问。这个月就这么过去了。", effects: {} },
          fail: { body: "记者在你办公室门口等到收工，把「拒绝回应」四个字写进了稿子。", effects: { rep: -0.4, fac: { press: -3, base: -2 } } },
          critfail: { body: "那九小时的通话清单被公开，其中一个号码你当年存过。你一个字的解释都没给。", effects: { rep: -0.6, fac: { press: -5, base: -4 } } }
        }
      },
      {
        id: "family_first", text: "不谈定性，只替家属办葬礼与手续",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        base: 0.66, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你替一个家属跑通了跨国运灵的手续。他后来在本地报纸上只提了你的名字。", effects: { rep: 0.2, fac: { base: 4, church: 3 } } },
          ok: { body: "你把该办的小事办了，没参与任何一句大话。", effects: { rep: 0.2, fac: { base: 3 } } },
          meh: { body: "你去了葬礼，站在后排，谁也没特别注意。", effects: {} },
          fail: { body: "有人问：为什么只看见你出席，看不见你说话。", effects: { rep: -0.2, fac: { base: -3 } } },
          critfail: { body: "一张你在葬礼后用餐桌自拍的照片被发到网上，配了一行字。", effects: { rep: -0.2, fac: { press: -4 } } }
        }
      },
      {
        id: "steady", text: "先要事实、不先要人头，公开说「别在抢救时定责」",
        note: "赌公众最终欣赏稳。风险：稳话听起来像替人挡枪。",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        base: 0.55, cost: { fav: 0.5 }, mods: [{ src: "attr", key: "CHA", w: 0.35 }],
        outcomes: {
          crit: { body: "事后回头看，你是少数没在情绪里喊话的人。建制的门给你开了一年。", effects: { rep: 0.7, fac: { establishment: 12, agency: 6, base: -4 } } },
          ok: { body: "你说了稳的话，被两边各骂一天，然后归于平淡。", effects: { rep: 0.3, fac: { establishment: 6, base: -4 } } },
          meh: { body: "你的克制没人注意到，也没人反对。", effects: { rep: 0.1 } },
          fail: { body: "对手替你写好了台词：你在保护下令的人。", effects: { rep: -0.8, fac: { base: -8, press: -4 } } },
          critfail: { body: "解密文件显示求援电话确实被挂断过，而你当时公开说「没有延误」。", effects: { rep: -1.6, fac: { press: -10, base: -10 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "hold_session", text: "在本地开一场公开听证，把安保审批链一份份念出来",
        note: "赌程序本身能替你说话。风险：念到谁的名字，谁就记住你。",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "agency", w: 0.15 }],
        outcomes: {
          crit: { body: "记录当天上网。你念到第七份被驳回的申请时，电视台终于有了能放画面的东西。", effects: { rep: 1.4, fac: { press: 8, agency: 9, base: 5, establishment: -6 } } },
          ok: { body: "程序走完了，材料归档了。党部抱怨你抢跑，报馆夸你较真。", effects: { rep: 0.8, fac: { press: 5, agency: 4, establishment: -4 } } },
          meh: { body: "会场来了十一个人。第二天的头版给了球赛。", effects: { rep: 0.2 } },
          fail: { body: "证人当场翻了供，你的会被人写成「拿别人的死办自己的秀」。", effects: { rep: -1.2, fac: { establishment: -8, press: -6 } } },
          critfail: { body: "你请来的证人被查出与承包商报团有关，整场会成了对方的筹款广告。", effects: { rep: -2.1, fac: { establishment: -10, press: -8, base: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "demand_probe", text: "立刻要求独立彻查，把九小时逐分钟摊开",
        note: "赌事实最终站在你这边。风险：查不动时，你是那个搅局的人。",
        when: { tierRaw: true, tierMin: 7 },
        base: 0.42, cost: {}, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "agency", w: 0.2 }],
        outcomes: {
          crit: { body: "几个月后听证记录公开，你当初那封质询信成了最早的一份。情报圈有人承认：至少有人在看。", effects: { rep: 1.5, fac: { agency: 12, press: 8, establishment: -6 }, flags: ["investigation_open"] } },
          ok: { body: "你把问题钉在议程上，党部不高兴，但报纸替你写了稿。", effects: { rep: 0.8, fac: { press: 6, establishment: -6, agency: 4 } } },
          meh: { body: "你的声明被礼貌地归档，两周后没人再问。", effects: { rep: 0.2, fac: { establishment: -2 } } },
          fail: { body: "调查最终不了了之，你被写成「拿死者做文章的人」。", effects: { rep: -1, fac: { establishment: -8, press: -4 } } },
          critfail: { body: "你要求公开的那批邮件被断章剪成广告，在你选区循环播放。死者家属也被请去当了背景。", effects: { rep: -1.8, fac: { establishment: -12, press: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "sign_subpoena", text: "签发传票：那九小时的分钟级记录限期交出",
        note: "赌你手里那点程序权真撬得开行政楼的门。风险：撬不开，就是你的越权。",
        when: { tierRaw: true, tierMin: 7 },
        base: 0.44, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "agency", w: 0.2 }],
        outcomes: {
          crit: { body: "传票送达，两周后清单真的送到了。你在全国镜头前念出那九小时的第一个分钟。", effects: { rep: 2.2, attr: { INT: 2 }, voters: { warm: 400 }, fac: { press: 12, agency: 10, base: 8, establishment: -14 }, flags: ["investigation_open"] } },
          ok: { body: "交出来一部分，够写三篇稿。你成了「问责」两个字的固定发言人。", effects: { rep: 1.3, fac: { press: 8, agency: 6, base: 5, establishment: -8 } } },
          meh: { body: "传票被拖成拉锯，法庭把排期排在选举之后。", effects: { rep: 0.3, fac: { establishment: -3 } } },
          fail: { body: "法院以管辖存疑撤了传票。对手把那份裁定书印成了一万份传单。", effects: { rep: -1.6, fun: -0.6, fac: { establishment: -12, press: -8 } } },
          critfail: { body: "传票被认定用于党派目的，你的委员会资格先被停掉，调查掉头查进你自己的办公室。", effects: { rep: -3, fun: -1, fac: { establishment: -16, agency: -8, press: -12 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2012-10 · 飓风桑迪 —— 海边城市停电的那七天
   * ==================================================================== */
  {
    id: "ln12_sandy", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2012, maxYear: 2012, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 14, unique: true,
    medium: ["tv", "cable", "radio", "social"], month: 10,
    title: "飓风桑迪淹没沿海街区，变压器炸了",
    body: "风暴潮灌进地铁隧道和地下室，七个城区停电，供暖油车进不来。有人在加油站排了一夜，有人在用手电筒给胰岛素保鲜。\n" +
      "大选前一周。救灾款要过联邦宣布区（州里申请、联邦核准的前置认定）这道门，走程序最快也得几周；电网是私营的，抢修顺序按合同不按人情。电视台只想看你身上有没有泥。\n" +
      "有人说电先送给有钱的街区。这笔重建款最后落到谁手上，此刻看不出来。",
    choices: [
      {
        id: "frontline", text: "冲在最前面：开办公室、调冰和油、上镜头",
        note: "赌苦劳被直接看成功劳。风险：做实事时说的错话会被一起播。",
        base: 0.5, cost: {}, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你在发电机边上连轴转了四天，本地报纸的头版是你满鞋泥的照片。街区记你一辈子。", effects: { rep: 1.5, fac: { base: 16, church: 6, establishment: -4 }, voters: { warm: 600 } } },
          ok: { body: "你确实搬了箱子、打了电话，人们知道自己被照顾过。", effects: { rep: 0.8, fac: { base: 9, establishment: 2 }, voters: { warm: 250 } } },
          meh: { body: "你去了，但镜头更多给了州长和国民警卫队。", effects: { rep: 0.2, fac: { base: 3 } } },
          fail: { body: "你对着一群等油的人说了句「程序要走」，那句话被循环播了三天。", effects: { rep: -1.2, fac: { base: -10, press: -6 } } },
          critfail: { body: "停电第三夜有人冻伤，记者翻出你那句「不必过度反应」。你的脸和那句话绑在了一起。", effects: { rep: -2, fac: { base: -14, press: -10 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "push_fed", text: "把事闹上去：逼州里申请联邦宣布区",
        note: "赌联邦钱真能落到本地。风险：党部不喜欢有人抢话筒。",
        base: 0.58, req: { tier: 2 }, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "establishment", w: 0.25 }],
        outcomes: {
          crit: { body: "联邦宣布区批下来了，第一笔重建款按你列的清单落地。党部承认你推得动事。", effects: { rep: 0.9, fac: { establishment: 12, base: 8, commercial: 4 } } },
          ok: { body: "你争到了名额，程序仍然慢，但钱在路上。", effects: { rep: 0.5, fac: { establishment: 8, base: 4 } } },
          meh: { body: "你的公文被收下了，回复是一句「正在评估」。", effects: { rep: 0.1, fac: { establishment: 2 } } },
          fail: { body: "申请被退回一次，重报又错过窗口。你的选区多等了六周。", effects: { rep: -0.8, fac: { base: -8, establishment: -6 } } },
          critfail: { body: "报上去的损失清单被查出注水，联邦审计员来问的是你签的那一页。", effects: { rep: -1.6, fac: { establishment: -12, press: -6 }, flags: ["scandal_1", "investigation_open"] } }
        }
      },
      {
        id: "keep_shelter", text: "守住自己的辖区：只开收容所、不碰政治",
        base: 0.68, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你的收容所是那一区唯一通宵亮灯的地方。教会后来把你写进了纪念册。", effects: { rep: 0.2, fac: { base: 5, church: 4 } } },
          ok: { body: "你把该开的门开了，该报的名单报了。", effects: { rep: 0.2, fac: { base: 3 } } },
          meh: { body: "你守住了自己那一小片，外面发生什么没人告诉你。", effects: {} },
          fail: { body: "有人在你收容所门口等了两个小时才进去，被本地电台看见了。", effects: { rep: -0.2, fac: { base: -3 } } },
          critfail: { body: "收容所缺毯子的照片被发到网上，配文是「这里关着门」。", effects: { rep: -0.2, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2012-11 · 大选之夜 —— 连任尘埃落定后的第二天早上
   * ==================================================================== */
  {
    /* era-2012.jpg 是那张振臂高呼的奥巴马图：按 #34 裁定不挂任何卡（真人胜选照
       不该压给一张玩家可能站到对立面的事件卡），本年回退通用头版 era.jpg。 */
    id: "ln12_election", photo: "era.jpg", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 2012, maxYear: 2012, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 16, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 11,
    title: "大选之夜尘埃落定，赢家开始排下一届的队",
    body: "计票到凌晨两点就结束了。赢家拿到第二个任期，输家的电话没人接，而你所在的党在一夜之间同时决定了两件事：谁留下来，谁负责。\n" +
      "本地电视台要你说一句「这对本区意味着什么」——本区的票其实和全国方向并不完全一致。两个派系此刻都在拉人，名单周五上报，你的明天要出现在其中一份上。\n" +
      "有人说赢家那个接手前的筹备班子（过渡团队）里已经给你留了位子。今晚这一步，管你五年。",
    choices: [
      {
        id: "bandwagon", text: "结果刚出就致电赢家，公开祝贺并谈本地要办的事",
        note: "赌新班子的第一轮名单。风险：旧队伍把你当成最先跑的人。",
        base: 0.52, cost: { fun: 0.4 }, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "两周后你接到过渡团队的电话，本地项目进了优先清单。你成了「两边都说得上话的人」。", effects: { rep: 0.8, fac: { establishment: 16, commercial: 8, base: -6 }, tier: 1 } },
          ok: { body: "你上了新名单的第一页，旧同事在走廊里绕着你走。", effects: { rep: 0.5, fac: { establishment: 10, base: -6 } } },
          meh: { body: "你的祝贺电话被礼貌地记下，然后没有下文。", effects: { rep: 0.11, fac: { establishment: 3, base: -2 } } },
          fail: { body: "你被写成「墙头草」，两边都不完全信你。", effects: { rep: -0.6, fac: { base: -8, establishment: -6 } } },
          critfail: { body: "你那通电话的录音流出，里面你替赢家解释了本地的败因。旧部把这当成出卖。", effects: { rep: -1.2, fac: { base: -14, establishment: -10, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "hold_base", text: "不打电话，先回街区：把票仓的话带进城",
        note: "赌基层这股怒劲会变成明年的谈判筹码。风险：新班子记不住你。",
        base: 0.34, cost: { fav: 0.5 }, mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "CHA", w: 0.25 }],
        outcomes: {
          crit: { body: "你把街区的怒话整理成一份纲领，两个月后党内会议桌上放的正是它。", effects: { rep: 1.1, fac: { base: 20, establishment: -8 }, voters: { diehard: 300, warm: 400 } } },
          ok: { body: "你成了街区与新机器之间唯一的传话人，位置不体面但没人绕得开。", effects: { rep: 0.66, fac: { base: 12, establishment: -4 }, voters: { warm: 250 } } },
          meh: { body: "你回去开了三场会，城里的名单上没有你的名字。", effects: { rep: 0.22, fac: { base: 4 } } },
          fail: { body: "你替愤怒的人说了话，新党部开始查你其他的关系。", effects: { rep: -0.5, fac: { establishment: -12, commercial: -8 } } },
          critfail: { body: "你被党内调查当成「败选责任样本」，本地报纸第一次用了「刺头」这个词。", effects: { rep: -1, fac: { establishment: -16, commercial: -10, press: -6 }, flags: ["scandal_1", "investigation_open"] } }
        }
      },
      {
        id: "host_night", text: "自己办开票夜：把两拨人请进同一间屋子",
        note: "赌一场成功的主场能让你独立于两边。风险：办砸了，谁都在看你出丑。",
        base: 0.44, cost: { fun: 1.2 }, mods: [{ src: "attr", key: "CHA", w: 0.45 }],
        outcomes: {
          crit: { body: "那一夜全城的人都来了，你站在门口迎客。第二天两份名单上都有你的名字。", effects: { rep: 1.3, fac: { establishment: 10, base: 10, press: 8, commercial: 6 } } },
          ok: { body: "晚会办得像样，钱花得看得见，你成了「能攒局的人」。", effects: { rep: 0.7, fac: { establishment: 6, base: 6, press: 4 } } },
          meh: { body: "来的人不多，账单是真的，只有你知道这晚花了多少。", effects: { rep: 0.1 } },
          fail: { body: "酒不够、话筒啸了、赢家没来。本地版把你写成一件笑话。", effects: { rep: -0.7, fac: { press: -8, establishment: -4 } } },
          critfail: { body: "有人查出晚会账单走了 contractor 的账，报上去的捐款表格对不上。", effects: { rep: -1.3, fac: { press: -10, establishment: -8 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "local_only", text: "这个夜不做全国判断，只处理本地公务",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你那天在排水站签了一叠单子。两周后新班子来调研，第一个找的竟是「那个还在岗的人」。", effects: { rep: 0.11, fac: { base: 6 } } },
          ok: { body: "你没在任何一边露脸，事照办，人照见。", effects: { rep: 0.11, fac: { base: 5 } } },
          meh: { body: "这一晚与你无关，第二天的议程也与你无关。", effects: {} },
          fail: { body: "两边都在问：那晚你到底在干什么。听起来像个问题。", effects: { rep: -0.22, fac: { base: -3 } } },
          critfail: { body: "「他不表态」被写成了一句指控，两个派系都用上了它。", effects: { rep: -0.22, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2012-12 · 桑迪·胡克校园枪击 —— 二十个孩子的那个星期五
   * ==================================================================== */
  {
    id: "ln12_hookes", grade: "mid", category: "civil",
    valence: "bane", dyn: true,
    minYear: 2012, maxYear: 2012, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 14, unique: true,
    medium: ["tv", "cable", "print", "radio"], month: 12,
    title: "康涅狄格一所小学发生枪击，二十名儿童死亡",
    body: "星期五上午，一所乡村小学响了两小时枪声。二十个孩子、六个大人。全国在半天之内从震惊变成了另一件事：该改哪条法。\n" +
      "本地的家长在夜里聚集到教堂，念的名字是从外地传来的。他们要有人站在前面，而你的党在这个议题上是分裂的。\n" +
      "本区小学明天复课，保安和牧师都不够。州里的购枪背景审查（买枪前强制核查买方资格）草案已在起草，枪支选票在下场选举里仍是要命的东西。有人说草案最后会被削成一条象征。",
    choices: [
      {
        id: "push_laws", text: "立即联署限枪草案，把名字排在最前面",
        note: "赌这波民意足以压倒党内阻力。风险：州里的党机器记你一笔。",
        base: 0.45, cost: { fav: 0.5 }, mods: [{ src: "fac", key: "base", w: 0.3 }, { src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "草案过了州议会上限的那一半，你在全国性节目上被介绍为牵头的人。郊区女性第一次为你开门。", effects: { rep: 1.5, fac: { base: 14, church: 8, establishment: -12 }, voters: { warm: 500, oppose: -80 } } },
          ok: { body: "你把话说在了前头，党内的电话从此变冷，报纸却替你写了好话。", effects: { rep: 0.8, fac: { base: 8, church: 4, establishment: -8 }, voters: { warm: 200 } } },
          meh: { body: "你签了名，草案在委员会里躺到夏天。没人记得是谁签的。", effects: { rep: 0.2, fac: { establishment: -3 } } },
          fail: { body: "草案死在程序里，本党把责任分给了你们这几个「惹事的」。", effects: { rep: -1, fac: { establishment: -12, base: -4 } } },
          critfail: { body: "对手把「他要收你的枪」印成传单，投到你所在的每一个县。你的名字在最上面。", effects: { rep: -1.8, fac: { establishment: -14, base: -8, press: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "fund_local", text: "不碰立法，先把本地的心理干预与校门保安办实",
        note: "赌具体的小事比宏大议题更经得住时间。风险：被批「回避问题」。",
        base: 0.55, cost: { fun: 0.6 }, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "复课前一天，每间教室有了一个受训的大人。邻县来抄你的方案，家长记得是谁掏的钱。", effects: { rep: 0.9, fac: { base: 12, church: 8, establishment: 4 } } },
          ok: { body: "钱落地了，事办了，全国议题上没人提起你。", effects: { rep: 0.5, fac: { base: 7, church: 4 } } },
          meh: { body: "你的拨款走完了程序，明年才到位。", effects: { rep: 0.2, fac: { base: 3 } } },
          fail: { body: "有人说你在孩子死后只肯花钱办事、不敢说话。", effects: { rep: -0.6, fac: { press: -4, base: -4 } } },
          critfail: { body: "采购单里的两家承包公司与你的捐助名单重了名。有人在记者会上把两张纸并排举起。", effects: { rep: -1.4, fac: { press: -10, establishment: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "grieve_only", text: "只出席悼念，一条政策都不说",
        base: 0.66, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你在烛光会上只念了名字，一个字政策都没提。有人事后说：那晚只有你没在讲自己。", effects: { rep: 0.2, fac: { church: 4, base: 4 } } },
          ok: { body: "你去了，站住了，没说错话。", effects: { rep: 0.2, fac: { base: 3 } } },
          meh: { body: "你在人群里没被看见，也没被指责。", effects: {} },
          fail: { body: "有家长在散场时问：所以你到底要不要改法。你没答。", effects: { rep: -0.2, fac: { base: -3 } } },
          critfail: { body: "一张你在悼念现场看表的被截取的照片开始流传。", effects: { rep: -0.2, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2013-04 · 波士顿马拉松爆炸 —— 终点线前的两个压力锅
   * ==================================================================== */
  {
    id: "ln13_boston", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2013, maxYear: 2013, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 14, unique: true,
    medium: ["tv", "cable", "social", "internet"], month: 4,
    title: "马拉松终点线旁连续两次爆炸，三人死亡",
    body: "下午两点四十九分，终点线两侧先后炸了两个自制压力锅。十七小时后又有一名警官被杀，整座城被告知待在家里。\n" +
      "第三天，有人在网上一句句指认，把无辜的死人当成了嫌犯。你的电话先是问伤亡，后来开始问「我们能信谁」。\n" +
      "线索很真，公开的部分很少，媒体在抢空白；通告要商户闭门、交通全停，本地已有几家少数族裔商铺被当成了目标。还有没有第二组人在外面，没人能说。",
    choices: [
      {
        id: "surge", text: "把人力全压到排查与封控上，公开站在指挥席",
        note: "赌快与狠被当成可靠。风险：查错人或封控失序时你要署名。",
        base: 0.44, cost: {}, mods: [{ src: "fac", key: "agency", w: 0.35 }],
        outcomes: {
          crit: { body: "封控与排查没有出乱子，你在指挥席上的那几天被本地写成「他在」。执法系统记住了你的名字。", effects: { rep: 1.4, fac: { agency: 14, establishment: 6, base: -4 } } },
          ok: { body: "你压上了全部人手，事稳住了，也有几户商铺被误查。", effects: { rep: 0.7, fac: { agency: 8, base: -4 } } },
          meh: { body: "你在场，但指挥系统不需要多一个人。", effects: { rep: 0.2, fac: { agency: 3 } } },
          fail: { body: "封控命令前后矛盾，两小时里没人知道该关门还是开门。", effects: { rep: -1, fac: { base: -8, establishment: -6 } } },
          critfail: { body: "一次误查被拍下来传到网上，被踢的门上有你的签字。", effects: { rep: -1.8, fac: { press: -10, base: -12 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "fund_tips", text: "出钱办事：热线、翻译、被误伤商户的补偿",
        note: "赌具体服务比表态更经得住时间。风险：钱被说成买安静。",
        base: 0.52, cost: { fun: 0.8 }, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "两条热线与一批译者让排查没在语言关卡死，被误查的商铺拿到了补偿。社区记住了这份账。", effects: { rep: 1, fac: { base: 12, agency: 6, church: 4 } } },
          ok: { body: "钱花在能看见的地方，没有人被落下来。", effects: { rep: 0.5, fac: { base: 8, agency: 3 } } },
          meh: { body: "预算批了，落地要等到夏天。", effects: { rep: 0.2, fac: { base: 3 } } },
          fail: { body: "有人问补偿是谁定的标准，答案听起来像临时编的。", effects: { rep: -0.6, fac: { base: -5, press: -4 } } },
          critfail: { body: "补偿名单被扒出三个与你有关系的名字，标题自己会写。", effects: { rep: -1.4, fac: { press: -10, establishment: -6 }, flags: ["scandal_1", "investigation_open"] } }
        }
      },
      {
        id: "calm_facts", text: "只发一句：不指认任何人，等正式发布",
        base: 0.64, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "在网络狂欢那两天，你是本地少数没跟着指认的人。后来被误伤的那家店主来握了你的手。", effects: { rep: 0.2, fac: { base: 4, press: 3 } } },
          ok: { body: "你没添乱，也没留下什么。", effects: { rep: 0.2, fac: { base: 3 } } },
          meh: { body: "你的声明很短，没人转发。", effects: {} },
          fail: { body: "有人觉得你在替谁遮掩，理由是你什么都没说。", effects: { rep: -0.2, fac: { base: -3 } } },
          critfail: { body: "「他为什么不说话」成了一句本地广播里的固定疑问。", effects: { rep: -0.2, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2013-06 · 斯诺登与大规模监控 —— 报纸开始算哪一行该印（分层卡）
   *   底（0-3）旁观自救 · 中（4-6）表态执行 · 高（7-9）决策担当
   * ==================================================================== */
  {
    id: "ln13_snowden", grade: "major", category: "media",
    valence: "risk", dyn: true,
    minYear: 2013, maxYear: 2013, scoped: true, tierRaw: true, tierMin: 0, weight: 16, unique: true,
    medium: ["internet", "print", "cable", "social"], month: 6,
    title: "前承包商用文件揭开大规模电话与网络监控",
    body: "六月开头，两份报纸先后登出程序性文件：电话记录与网络数据的批量调取。情报系统说这合法且救过命，科技界说这单要黄了。\n" +
      "批这些令的是一间专管监视的秘密法院（特庭），公开到哪一步由行政部门说了算；本地已有两家公司说合同受了影响，而你自己办公室的电话与云存储也是外包的。\n" +
      "你的本地律师只问一句：当事人和我说话，你还录不录。有人说登出来的文件只是很小的一批。",
    choices: [
      {
        id: "own_wires", text: "不表态，先把办公室自己的电话与云服务换成不认路的",
        note: "赌这件事最后只是麻烦，不是丑闻。风险：省事不等于安全。",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        base: 0.7, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "换完两周后本地一次批量调取真找上门，你的线一条没接到。办公室的人开始把「他会留档」当成一句好话。", effects: { rep: 0.4, fac: { establishment: 3, tech: 3 } } },
          ok: { body: "合同换了，账多了一点，事情没落到你头上。", effects: { rep: 0.2, fac: { tech: 2 } } },
          meh: { body: "你折腾了一个月，没人知道你折腾过。", effects: {} },
          fail: { body: "换供应商的账单被本地报翻出来，标题是「他怕什么」。", effects: { rep: -0.4, fac: { press: -3, establishment: -2 } } },
          critfail: { body: "新供应商自己在同一周被点名。你从「躲事的人」被写成「有鬼的人」。", effects: { rep: -0.6, fac: { press: -4, agency: -3 } } }
        }
      },
      {
        id: "local_rights", text: "不谈全国，只把本地档案与监听合规查一遍",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你查出了本地警局两台没有令状的设备，处理干净且没上全国新闻。律师协会给你写了封信。", effects: { rep: 0.11, fac: { base: 6, agency: -2 } } },
          ok: { body: "你把本地的程序理了一遍，没人注意到，也没人受损。", effects: { rep: 0.11, fac: { base: 5 } } },
          meh: { body: "你读了几百页本地合同，什么也没发现。", effects: {} },
          fail: { body: "你查了别人，也顺便让人查到了你自己的旧授权。", effects: { rep: -0.22, fac: { press: -3 } } },
          critfail: { body: "「他自己也签过」被写进了一篇报道的最后一句。", effects: { rep: -0.22, fac: { agency: -3, base: -2 } } }
        }
      },
      {
        id: "oversee", text: "要求公开令状标准、给监控设审计与日落条款",
        note: "赌中产与技术圈的愤怒会持续。风险：执法系统从此把你当对面。",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        base: 0.4, cost: {}, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "tech", w: 0.2 }],
        outcomes: {
          crit: { body: "你那份修正案在委员会过了，全国的科技版把你写成「少数会读文件的政客」。", effects: { rep: 1.6, fac: { tech: 14, press: 10, base: 6, agency: -12 } } },
          ok: { body: "你把议题钉进了议程，圈内人开始把你当成可谈的对象。", effects: { rep: 0.9, fac: { tech: 8, press: 6, agency: -8 } } },
          meh: { body: "你的提案被归档，等下一次选举再翻出来。", effects: { rep: 0.2, fac: { tech: 3 } } },
          fail: { body: "一次未遂袭击被拿出来说事，你的改革被写成「绑住我们的手」。", effects: { rep: -0.9, fac: { agency: -12, establishment: -6, base: -4 } } },
          critfail: { body: "听证会上有人出示你与某境外基金会的旧合影，问题从「该不该管」变成「你替谁说话」。", effects: { rep: -1.7, fac: { agency: -16, establishment: -10, press: -8 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "write_position", text: "把立场写成一份公开备忘录：哪些令该公示、哪条法该改",
        note: "赌白纸黑字比口号耐用。风险：写清楚的人最先被逐句追问。",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        base: 0.52, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "两家全国报转了你的六页备忘录，科技圈把它印成手册。从此谈这事要引用你的分类法。", effects: { rep: 1.4, fac: { press: 9, tech: 8, base: 4, agency: -7 } } },
          ok: { body: "备忘录被认真读了两天。你上了「会做事」那份名单。", effects: { rep: 0.8, fac: { press: 5, tech: 5, agency: -4 } } },
          meh: { body: "文件挂在网站上，下载数是个位。", effects: { rep: 0.2 } },
          fail: { body: "安全版记者挑出你两处外行话，稿风从「专业」变成「越级」。", effects: { rep: -1.1, fac: { agency: -8, press: -5 } } },
          critfail: { body: "你写「这些程序不触及国内号码」，第二天就有新文件证明触及了。这句话此后跟着你。", effects: { rep: -2.2, fac: { press: -10, agency: -10, base: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "back_agency", text: "公开站在情报系统一边：合法、有效、别自己拆台",
        note: "赌恐惧比愤怒更长。风险：舆论转向时你站在昨天的位置上。",
        when: { tierRaw: true, tierMin: 7 },
        base: 0.5, cost: { fav: 0.5 }, mods: [{ src: "fac", key: "agency", w: 0.4 }],
        outcomes: {
          crit: { body: "国家安全委员会的简报第一次给了你一个席位，情报与执法的社区从此把你算作自己人。", effects: { rep: 0.8, fac: { agency: 18, establishment: 10, press: -8, base: -6 }, tier: 1 } },
          ok: { body: "你在闭门会里说了硬话，圈内记你的账，圈外骂你一句。", effects: { rep: 0.5, fac: { agency: 12, establishment: 6, press: -6 } } },
          meh: { body: "你的声明被安全版面用了一行。", effects: { rep: 0.11, fac: { agency: 4 } } },
          fail: { body: "被误查的小业主找上门来，你的话在他们的账上不值一分钱。", effects: { rep: -0.6, fac: { base: -8, press: -6 } } },
          critfail: { body: "文件显示本地一个组织确实被列入名单，而你在镜头前说「没人被针对」。", effects: { rep: -1.3, fac: { base: -12, press: -10 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "vote_sunsets", text: "把自己那份授权直接摆上表：条款到期就停，续期要公开投票",
        note: "赌你愿意用自己的程序位置换一次全国级的选择。风险：票没过去，你就是那个放走监控的人。",
        when: { tierRaw: true, tierMin: 7 },
        base: 0.44, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "tech", w: 0.2 }],
        outcomes: {
          crit: { body: "条款被限期重审。你在全国电视台讲了三分钟「为什么政府要申请许可才能看你的记录」，那三分钟被反复引用了很多年。", effects: { rep: 2.3, attr: { INT: 2 }, voters: { warm: 450 }, fac: { tech: 14, press: 12, base: 8, agency: -16, establishment: -10 } } },
          ok: { body: "续期被附加了公开报告义务。不多，但从此有据可查。", effects: { rep: 1.3, fac: { tech: 8, press: 7, base: 4, agency: -8 } } },
          meh: { body: "你的修正案在程序里被搁住，只剩一个编号。", effects: { rep: 0.3, fac: { tech: 3, agency: -3 } } },
          fail: { body: "当晚一次未遂爆炸案把辩论整个掐断。你的票被写成「在这时候拆台」。", effects: { rep: -1.8, fun: -0.8, fac: { agency: -14, establishment: -10, press: -6 } } },
          critfail: { body: "重审失败，且爆出你在关键一票前收过科技承包商的捐款。两边同时把你当叛徒。", effects: { rep: -3, fun: -1.2, fac: { agency: -18, tech: -12, establishment: -10, base: -8 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2013-10 · 联邦政府停摆 —— 十七天没有工资的那批人
   * ==================================================================== */
  {
    id: "ln13_shutdown", photo: "era-2013.jpg", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2013, maxYear: 2013, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 14, unique: true,
    medium: ["tv", "cable", "print", "social"], month: 10,
    title: "医保拨款僵住，联邦政府停摆十七天",
    body: "联邦政府停摆——拨款未过时非必要部门停工——到今天是第十七天。拨不出钱的雇员被通知回家，国家公园上了锁，签证与检查排成长队。\n" +
      "中期选举前一年，你的电话一半是问公园能不能进，另一半是问房贷批不批得下来：本地有几百家店靠联邦合同和小企业贷款过活。\n" +
      "两党的支持率都在掉，选民在找一个人负责，而那份继续决议只能撑到年底。有人说甩锅用的联合声明已经在起草了。",
    choices: [
      {
        id: "pressure", text: "把停摆讲成对法律的拆解，要求先开票再谈条件",
        note: "赌中间选民讨厌僵局。风险：把基层的怒气全接在自己身上。",
        base: 0.42, cost: {}, mods: [{ src: "attr", key: "CHA", w: 0.4 }],
        outcomes: {
          crit: { body: "第十七天的联合决议按你的口径写，你的话在早间节目播了一整个秋天。", effects: { rep: 1.4, fac: { establishment: 12, base: -6, commercial: 6 } } },
          ok: { body: "你喊得响，党部不喜欢，但本地商会开始替你说话。", effects: { rep: 0.7, fac: { establishment: 4, commercial: 8, base: -6 } } },
          meh: { body: "你的声明被夹在一堆同样声音里。", effects: { rep: 0.2, fac: { commercial: 3 } } },
          fail: { body: "决议最后还是让步了，而你成了「先喊散的人」。", effects: { rep: -0.9, fac: { base: -10, establishment: -6 } } },
          critfail: { body: "有人把停摆期间的公园与检查成本账全归到你的那句「不能谈」。", effects: { rep: -1.6, fac: { base: -12, press: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "bridge", text: "两头跑：关门期间先给本地垫钱、开临时窗口",
        note: "赌具体服务能让你独立于两边的骂声。风险：垫出去的钱要不回来。",
        base: 0.55, cost: { fun: 0.8, fav: 0.5 }, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你用办公室的备用金撑住了两处食物银行与一叠房贷申请，两边都在找你去开会。", effects: { rep: 1.1, fac: { base: 14, establishment: 6, church: 6 } } },
          ok: { body: "你办事、垫钱、不讲话。人领情，账也疼。", effects: { rep: 0.6, fac: { base: 8, church: 4 } } },
          meh: { body: "窗口开了，钱花了，事不算大也不算小。", effects: { rep: 0.2, fac: { base: 4 } } },
          fail: { body: "垫款被说成「用别人的钱买自己的好话」。", effects: { rep: -0.7, fac: { press: -6, establishment: -4 } } },
          critfail: { body: "临时窗口的名册被拿去比对捐款记录，两份名单重了七个名字。", effects: { rep: -1.4, fac: { press: -10, establishment: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "keep_running", text: "不掺和僵局，把本地能开的事都开起来",
        base: 0.64, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "停摆那十七天你照常上班、替人打电话问贷款。没人写你的稿，但排队的人知道你。", effects: { rep: 0.2, fac: { base: 4 } } },
          ok: { body: "你把自己那一格公务维持住了，仅此而已。", effects: { rep: 0.2, fac: { base: 3 } } },
          meh: { body: "这十七天像没发生过。", effects: {} },
          fail: { body: "有人问：你到底是哪一边的。你说不上来。", effects: { rep: -0.2, fac: { base: -3 } } },
          critfail: { body: "「他在最乱的时候什么都不干」被对手写进了一句口播。", effects: { rep: -0.2, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2014-08 · 弗格森 —— 一次枪击之后十天的街头
   * ==================================================================== */
  {
    id: "ln14_ferguson", grade: "major", category: "civil",
    valence: "bane", dyn: true,
    minYear: 2014, maxYear: 2014, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 16, unique: true,
    medium: ["tv", "cable", "social", "internet", "print"], month: 8,
    title: "一名青年被警员枪杀，十天燃烧的同一条街",
    body: "午后的枪声之后，那条街在十天内变成了两个国家：一边举着名字游行，一边是装甲车与闪光弹的夜。国家警卫队进驻，记者被扣。\n" +
      "决定起诉与否的是一个大陪审团（只审卷宗、不审有罪的公民团），而卷宗不对外：尸检与弹道都做了，只有他们能看。要等到秋天。\n" +
      "你的电话一边说「他手上没枪」，另一边说「你敢不信警察试试」——本地警力的人口构成，和这条街明显不是一回事。有人说那名警员早有的投诉一直没人处理。",
    choices: [
      {
        id: "march", text: "走上那条街，和游行者一起走完整段路",
        note: "赌街头的能量会成为你明年的票。风险：警员社区与商会从此不叫你。",
        base: 0.42, cost: {}, mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你走在最前面那一段，被拍到扶起一个中暑的老人。全国版用了三秒，本地版用了一整版。", effects: { rep: 1.6, fac: { base: 20, church: 8, agency: -14 }, voters: { diehard: 260, warm: 500 } } },
          ok: { body: "你走完了全程，激进的人开始愿意跟你说话，警员协会发了措辞很冷的声明。", effects: { rep: 0.8, fac: { base: 12, agency: -10 }, voters: { warm: 250 } } },
          meh: { body: "你去了，站在中间，谁也没把你当成自己人。", effects: { rep: 0.2, fac: { base: 4 } } },
          fail: { body: "那天夜里两家铺子被砸，店主问你在街上做了什么。", effects: { rep: -1, fac: { commercial: -10, base: -6 } } },
          critfail: { body: "一张你与人群同框的照片被印在「暴徒的赞助人」标题下面，投满了整个县。", effects: { rep: -1.8, fac: { commercial: -14, establishment: -10, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "back_police", text: "公开站在警员一边：等卷宗，别先定罪",
        note: "赌执法与郊区怕乱。风险：一旦不起诉，你就是替凶器说话的人。",
        base: 0.48, cost: { fav: 0.5 }, mods: [{ src: "fac", key: "agency", w: 0.4 }],
        outcomes: {
          crit: { body: "警员协会把唯一的公开感谢给了你，商会的钱第一次主动找上你。", effects: { rep: 0.8, fun: 0.6, fac: { agency: 16, commercial: 10, establishment: 6, base: -12 } } },
          ok: { body: "你稳住了治安派，街区的门从此对你关上。", effects: { rep: 0.4, fun: 0.3, fac: { agency: 10, commercial: 6, base: -10 } } },
          meh: { body: "你说了程序话，没人新增意见，也没人原谅你。", effects: { rep: 0.1, fun: 0.2, fac: { agency: 4 } } },
          fail: { body: "不起诉决定公布那晚，你的车窗被砸了一块。", effects: { rep: -1.1, fac: { base: -14, press: -6 } } },
          critfail: { body: "录音流出：你在闭门的商会午餐会上说「那孩子自己也有问题」。这句话在你选区播了一个月。", effects: { rep: -2, fac: { base: -18, church: -8, press: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "roundtable", text: "把双方拉回桌前：警民联席、公开数据、独立审查",
        note: "赌你能同时被两边当成对手。风险：谈崩了，两边一起怪你。",
        base: 0.56, cost: { fav: 0.5 }, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "联席会开成了本地第一份公开的执法数据表，全国的记者来抄你的模板。", effects: { rep: 1.3, fac: { establishment: 10, base: 10, agency: 4, press: 8 } } },
          ok: { body: "桌上谈了三小时，两边各自骂了你一顿，但表格留下来了。", effects: { rep: 0.6, fac: { establishment: 6, base: 6, press: 4 } } },
          meh: { body: "会开了，纪要写了，没有下文。", effects: { rep: 0.2, fac: { establishment: 2 } } },
          fail: { body: "一方中途退席，第二天报纸的标题是「他连一张桌子都摆不平」。", effects: { rep: -0.9, fac: { establishment: -8, base: -8 } } },
          critfail: { body: "退席的一方放出你私下让步的邮件，两边同时宣布你不是对话人。", effects: { rep: -1.6, fac: { press: -10, establishment: -8, base: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "records_only", text: "不表态，只把卷宗与投诉记录的公开程序推起来",
        base: 0.66, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你推动的那份投诉公开表在秋天生效，两个月后被另一起案子引用。没人感谢你，但路是通的。", effects: { rep: 0.11, fac: { base: 6 } } },
          ok: { body: "你只推了程序，两边都不满意，也都没法怪你。", effects: { rep: 0.11, fac: { base: 5 } } },
          meh: { body: "你按流程交了申请，等答复。", effects: {} },
          fail: { body: "有记者问你对起诉怎么看，你说「等程序」。这句被两边同时用了。", effects: { rep: -0.22, fac: { base: -3 } } },
          critfail: { body: "「他在等程序」被印在了游行的标语牌背面。", effects: { rep: -0.22, fac: { press: -3 } } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 世界线 · 2011—2014（按绝对年份键控；引擎优先读 worldline、回落 era）
 *   pressure：0—6。大选年 ≥3；评级下调与停摆把 2011/2013 抬高。
 *   brief：一句话讲这一年的国家情绪，不列事件。
 *   outlets：该年真实存在的媒介（Substack 2017 才上路，不写）。
 * ==========================================================================*/
POTUS.define("worldline", {
  pressure: {
    "2011": 4,   // 评级下调 + 停摆阴影 + 击毙本·拉丹 + 帐篷城
    "2012": 4,   // 大选年 + 桑迪 + 班加西 + 小学校园枪击
    "2013": 3,   // 监控风暴 + 联邦停摆，但无全国投票
    "2014": 3    // 街头与执法信任问题持续发酵，中期选举预热
  },
  brief: {
    "2011": "十年战争刚刚有了一个句号，钱包却被人当众划开了一道口子：人们开始怀疑「恢复」这个词到底指谁。",
    "2012": "投票年。每一场灾难都赶在选举前一周发生，每一句安慰都要被折算成票。",
    "2013": "人们忙着检查自己的通话记录，同时发现政府连发工资都办不到——愤怒和尴尬混在了一起。",
    "2014": "一条街上同时举着名字和闪光弹；人们开始怀疑，谁来执法和为谁执法是不是两个问题。"
  },
  outlets: {
    "2011": ["有线电视新闻网", "今日美国", "赫芬顿邮报", "沙龙网", "布赖特巴特", "政治客"],
    "2012": ["有线电视新闻网", "纽约时报", "今日美国", "政治客", "每日野兽", "赫芬顿邮报"],
    "2013": ["有线电视新闻网", "今日美国", "华盛顿邮报", "斯莱特网", "推特", "布赖特巴特"],
    "2014": ["有线电视新闻网", "瓦克斯", "截击", "今日美国", "纽约时报", "布赖特巴特"]
  }
});

/* ============================================================================
 * 定点表：2011—2014 共 11 个历史锚点（major 4 个 ≈ 1/3）。
 *   · wave_occupy_low 是 54-era-waves.js 的存量卡（带子 B6 归属），此处只钉不改。
 *   · wave_detroit_high 的年窗是 2008—2010（不属本带），故跳过。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln11_binladen", year: 2011, month: 5, grade: "mid" },
  { event: "ln11_debt", year: 2011, month: 8, grade: "major" },
  { event: "wave_occupy_low", year: 2011, month: 10, grade: "mid" },
  { event: "ln12_benghazi", year: 2012, month: 9, grade: "mid" },
  { event: "ln12_sandy", year: 2012, month: 10, grade: "mid" },
  { event: "ln12_election", year: 2012, month: 11, grade: "major" },
  { event: "ln12_hookes", year: 2012, month: 12, grade: "mid" },
  { event: "ln13_boston", year: 2013, month: 4, grade: "mid" },
  { event: "ln13_snowden", year: 2013, month: 6, grade: "major" },
  { event: "ln13_shutdown", year: 2013, month: 10, grade: "mid" },
  { event: "ln14_ferguson", year: 2014, month: 8, grade: "major" }
]);
