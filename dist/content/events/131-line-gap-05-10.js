/* ============================================================================
 * CONTENT · events/131-line-gap-05-10.js
 * 连续时间轴 · 2005—2010 定点大事补薄（第二轮 gapfill，Track B · w57）。
 *
 * 这批只补 123/124 两个年带漏掉的定点（游说案 / 法官确认 / 前政权受审 / 增兵 / 竞选出资），
 * 写法与 124-line-2007-10.js 一致（见 docs/PARALLEL-CONTENT-WORK.md §4）：
 *   · 不写 era —— 一律绝对年窗 minYear/maxYear + scoped，tierRaw 直接按真实层级解释。
 *   · 到点必发 —— 每张卡都在本文件末尾的 POTUS.define("fixed", …) 里钉死年月与量级。
 *   · 不重复世界线 —— 2003—2010 各年的 pressure/brief/outlets 已由 123/124 带写齐，
 *     本文件只添卡与定点，不再覆盖世界线条目。
 *   · 铁律 —— 字符串只用「」；每卡恰一个保底（无 cost 无 req，高地板低天花板）；
 *     risk 卡保底五档净值压在 ±0.35 份内；经济只写系数；正文交代认知边界；
 *     2005—2010 前后的卡不直呼真人姓名，一律职务称谓（在任总统/说客/大法官）。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2005-11 · 首都游说网络被起诉 —— 捐款与合同被串成一条线（风险·大事件）
   * ==================================================================== */
  {
    id: "ln05_lobby", photo: "era-2005.jpg", grade: "major", category: "scandal",
    valence: "risk", dyn: true,
    minYear: 2005, maxYear: 2005, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["print", "tv", "cable", "internet"], month: 11, day: 3,
    title: "首都游说网络被起诉，捐款与合同的换购关系摊在案卷上",
    body: "十一月的头一个礼拜，首都联邦检察官起诉一名顶级说客：同一批案卷，把他和国会多数党的领导层串成一条线——募款、献金、拨款、合同，一件一件对得上价。\n" +
      "你这条线上也有钱：地方党部收过的捐款，正是从他事务所过的手。记者已经在预约采访，在野党放话：明年中选，要把这笔账拉到选票上算。\n" +
      "案卷里捐过钱的名字全列着，最后被起诉的只有几个——你党部那笔进的是哪一份清单，还没人告诉你。",
    choices: [
      {
        id: "keep_dist", text: "不沾案：钱一分不动，话一句不讲",
        note: "赌的是火烧不到地方。风险：捐款记录还在那里，记者照来。",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "案子两个月后停在了首都那一层。你没答任何问题，报道里也没有你。", effects: { rep: 0.2, fac: { base: 2 } } },
          ok: { body: "你没沾这件事。有人嫌你胆小，没人能从你身上找出线头。", effects: { rep: 0.2 } },
          meh: { body: "这个月你只把电话打得更勤，日子照过。", effects: { rep: 0.1 } },
          fail: { body: "记者查到那笔钱过手的账户，本地报纸发了条小版面的侧栏。", effects: { rep: -0.2 } },
          critfail: { body: "报道最后一行写着：这些钱最终落在地方党部。那句话里有你的名字。", effects: { rep: -0.3 } }
        }
      },
      {
        id: "return_cash", text: "退回过手捐款，公开要求全行业披露",
        note: "赌的是干净比机器值钱。风险：党部从此把你当外人。",
        base: 0.52, mods: [{ src: "attr", key: "INTG", w: 0.45 }, { src: "fac", key: "base", w: 0.2 }],
        cost: { fun: 0.4 },
        outcomes: {
          crit: { body: "你给披露法案联署排在第一列。党机器骂你作秀，本地台管你叫「把钱吐回去的那位」。", effects: { rep: 1.2, fac: { base: 7, establishment: -5 }, flags: ["ethics_line"] } },
          ok: { body: "钱退了，稿子发了。机器不痛快，选民觉得你做对了事。", effects: { rep: 0.7, fac: { base: 4 } } },
          meh: { body: "退款进了账，没有一家报纸来问为什么。", effects: { rep: 0.2 } },
          fail: { body: "党部说你拿党的钱买自己的名声。下一笔州里的拨款分配，你县排到最后。", effects: { rep: -0.8, fac: { establishment: -6 } } },
          critfail: { body: "记者追问：你当初到底收了多少。数字不大，但退钱的是你，上镜的也是你。", effects: { rep: -1.4, fac: { establishment: -8, base: -3 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "point_press", text: "开记者会：把合同与捐款拆开讲，不点任何人名",
        note: "赌的是民众要有人结账。风险：整条链把你当成公敌。",
        base: 0.4, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "press", w: 0.25 }],
        cost: { fun: 0.3 }, req: { tier: 2 },
        outcomes: {
          crit: { body: "你那句「先去翻合同」成了这个选举季的口头禅。全国报纸引你，说客的事务所绕开你州接活。", effects: { rep: 1.8, fac: { press: 8, base: 6, establishment: -8, commercial: -5 }, voters: { warm: 400 }, flags: ["ethics_line"] } },
          ok: { body: "你点了体制，没点人。媒体买账，机器把你记进另一本册子。", effects: { rep: 0.9, fac: { press: 5, establishment: -4 } } },
          meh: { body: "你的声明见报了。第二天一批更大的起诉书把它盖了下去。", effects: {} },
          fail: { body: "检察官没接你的话头，先接话的是党部。他们替你解释了什么叫忠诚。", effects: { rep: -1.4, fac: { establishment: -8, commercial: -4 } } },
          critfail: { body: "一家前客户当天反诉你诽谤。取证清单第一项，就是你党部的捐款台账。", effects: { rep: -2.2, fac: { press: -4, establishment: -10, commercial: -6 }, flags: ["scandal_1", "investigation_open"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2006-01 · 大法官确认表决 —— 冗谈威胁第一次成为大众党争（风险）
   * ==================================================================== */
  {
    id: "ln06_alito", photo: "era-2006.jpg", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2006, maxYear: 2006, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 1, day: 31,
    title: "大法官确认表决逼近门槛，冗谈威胁首次成规模摆上桌面",
    body: "一月底，最高法院的确认听证走到表决前最后一里。在野党第一次成规模地把冗谈威胁摆上桌面，把议事规则本身逼成了议题：终结辩论的门槛要不要改，悬了三个礼拜。\n" +
      "最后五十八比四十二，确认通过。「司法哲学」这个词，第一次进了酒馆的争论。两党都在催你交一份立场，地方报会把你的话逐字印出来。\n" +
      "冗谈就是少数党拿连续发言挡表决、要超级多数才能终止——你今天挑的那一句，早晚会在某场听证会上被人引用。",
    choices: [
      {
        id: "do_job", text: "不掺和：在本地办法律援助接待，不谈听证",
        note: "赌的是这仗打不到你身上。风险：两边都记得你没露过面。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "确认之争闹了三个礼拜，你的名字没进任何一篇稿子。表决过后，两边的律师都来申请你那格的补助。", effects: { rep: 0.2, fac: { base: 3 } } },
          ok: { body: "你什么也没说，什么也没得到。事办完了，人没提你。", effects: { rep: 0.2 } },
          meh: { body: "这个月你只签了一沓法律援助单。", effects: { rep: 0.1 } },
          fail: { body: "党部要你签一份表态信，你拖过了截止日。主席记得。", effects: { rep: -0.2 } },
          critfail: { body: "两边复盘时都想起：他连话都没说一句。两边的下一次名单里都没有你。", effects: { rep: -0.3 } }
        }
      },
      {
        id: "oppose", text: "站在挡的那边：质疑提名记录，把表决拖紧",
        note: "赌的是基层热情比机器更值钱。风险：人没挡住，锅归挡的人。",
        base: 0.48, mods: [{ src: "fac", key: "base", w: 0.35 }, { src: "attr", key: "CUN", w: 0.3 }],
        cost: { fun: 0.3 },
        outcomes: {
          crit: { body: "你质询的那一段在 cable 台循环了一整夜。提名人最终还是确认了，可你的名字上了在野党下一季的点名册。", effects: { rep: 1.4, fac: { base: 9, press: 4, establishment: -5 }, voters: { warm: 600 }, flags: ["court_fight"] } },
          ok: { body: "你投了反对，话也放硬了。基层鼓掌，律师协会皱眉头。", effects: { rep: 0.7, fac: { base: 5, establishment: -3 } } },
          meh: { body: "你发了言，没人转播；你投了票，跟着党团走。", effects: {} },
          fail: { body: "五十八比四十二，确认了。报纸写：本州代表站在挡拆的那一边。机器的记性比表决长。", effects: { rep: -1, fac: { establishment: -6 } } },
          critfail: { body: "提名人的记录干净得挑不出错。就任那天，你的狠话被人逐字念回给你听。", effects: { rep: -1.8, fac: { press: -5, establishment: -8 } } }
        }
      },
      {
        id: "principled_yes", text: "投确认票：但公开写下司法权力边界那句话",
        note: "赌的是制度声望比党周期耐久。风险：基层把你当叛徒。",
        base: 0.42, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "establishment", w: 0.25 }],
        outcomes: {
          crit: { body: "你那篇「赞成，但是」的投稿被全国报系转载。法院那边来了谢函，党委会的信却始终没来。", effects: { rep: 1.5, fac: { establishment: 8, press: 5, base: -6 }, attr: { INT: 1 }, flags: ["institutionalist"] } },
          ok: { body: "你投了赞成，写了那句话。机器记得你，街区开始跟你算账。", effects: { rep: 0.7, fac: { establishment: 5, base: -4 } } },
          meh: { body: "你的表态太克制，谁都没引用。", effects: { rep: -0.1 } },
          fail: { body: "挑战者已经下场：他把你的赞成票剪进了第一条广告。", effects: { rep: -1.2, fac: { base: -8 } } },
          critfail: { body: "建制夸你，基层骂你，律师协会嫌你作秀。三家报纸给了你三个不一样的称呼。", effects: { rep: -2, fac: { base: -9, press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2006-12 · 前政权受审行刑 —— 一段手机录像改写了战争的算术（威胁·大事件）
   * ==================================================================== */
  {
    id: "ln06_saddam", photo: "era-2006.jpg", grade: "major", category: "foreign",
    valence: "bane", dyn: true,
    minYear: 2006, maxYear: 2006, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "internet", "radio"], month: 12, day: 30,
    title: "前国家元首被特别法庭判处绞刑，行刑录像当日外流",
    body: "十二月，占领国的特别法庭宣判：前国家元首犯反人类罪，处以绞刑，赶在新年前执行。行刑当天，一段现场手机录像就在网上传开——喊叫、讨价还价、最后一瞬。\n" +
      "那一周，那里的教派报复杀戮成倍往上翻。国内的晚间节目反复放这段录像，问的已经不是正义，是值得不值。老兵团体递过话：先谈死者，别谈录像。\n" +
      "这段录像落在你的表态上，是添分还是减分，没人肯替你先算。",
    choices: [
      {
        id: "wreaths", text: "不碰审判：去给本地战死者开追悼会",
        note: "赌的是哀悼不需要立场。风险：家属要说的比你多。",
        base: 0.6, mods: [{ src: "attr", key: "CHA", w: 0.35 }],
        outcomes: {
          crit: { body: "追悼会上你把每一面叠好的旗都念了一个名字。第二天本地版头条是那间屋子，不是那段录像。", effects: { rep: 0.3, fac: { base: 3, military: 2 } } },
          ok: { body: "该到的场合你都到了，该说的都说对了。", effects: { rep: 0.2, fac: { military: 2 } } },
          meh: { body: "你在礼堂站了一晚上，来的人比预想的少。", effects: { rep: 0.1 } },
          fail: { body: "有家属问：他儿子的名字在名单上排第几。你说不出数。", effects: { rep: -0.2 } },
          critfail: { body: "悼词三分钟，漏了两个名字。家属不读报纸，但他们记得。", effects: { rep: -0.3 } }
        }
      },
      {
        id: "account", text: "盯着录像查：要求战区司令解释手机怎么进去的",
        note: "赌的是民众要一个交代。风险：军方把你当甩锅的人。",
        base: 0.46, mods: [{ src: "fac", key: "base", w: 0.3 }, { src: "attr", key: "INT", w: 0.3 }],
        cost: { fun: 0.3 },
        outcomes: {
          crit: { body: "你追问「谁把手机带进行刑室」被全国报系接了过去。两个礼拜后，五角大楼改了探视规矩。", effects: { rep: 1.3, fac: { press: 6, base: 6, military: -6 }, flags: ["video_probe"] } },
          ok: { body: "质询上了本地晚间新闻。司令没答，可选民听见了你问。", effects: { rep: 0.7, fac: { press: 4, military: -3 } } },
          meh: { body: "你的函件进了联合回应机制，和几百封别的信一起。", effects: {} },
          fail: { body: "五角大楼回了一句「调查已在进行」，不回答任何问题。你追了个空。", effects: { rep: -0.9, fac: { military: -6, establishment: -3 } } },
          critfail: { body: "有人查出行刑录像的拍摄者里有个你选区出去的孩子。现在全郡都认识你了。", effects: { rep: -1.7, fac: { military: -8, base: -4 } } }
        }
      },
      {
        id: "worth", text: "把话说穿：这场战争该交还全民公断",
        note: "赌的是厌战已到临界。风险：你要当阵亡者的背叛者。",
        base: 0.38, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        req: { fac: "base", min: 18 },
        outcomes: {
          crit: { body: "你那句「该让国民自己算这笔账」被反战阵营接住。秋天的征兵数字又低了一截，你的电话却被打爆了。", effects: { rep: 1.4, fac: { base: 9, press: 5, military: -10 }, voters: { warm: 500 }, flags: ["war_skeptic"] } },
          ok: { body: "你把那句话说出口了。一半选区写信骂你，一半写信谢你。", effects: { rep: 0.7, fac: { base: 5, military: -5 } } },
          meh: { body: "你说晚了。首都那几位比你先说了，而且说得更响。", effects: { rep: -0.1 } },
          fail: { body: "老兵团体把你的话印在追思墙页面上。明年阵亡将士纪念日，那一页就是你对手的弹药。", effects: { rep: -1.4, fac: { military: -8, base: -3 } } },
          critfail: { body: "那周又有一具灵柩回家，家属见到你说的是你那段声明。报纸把这句话登了出来。", effects: { rep: -2.2, fac: { military: -10, press: -4, establishment: -5 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2007-01 · 增兵与拨款时间表 —— 钱袋与战争在参院对撞（风险）
   * ==================================================================== */
  {
    id: "ln07_surge", photo: "era-2007.jpg", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2007, maxYear: 2007, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 1, day: 10,
    title: "增兵两万一千人开赴前线，在野党把时间表夹进拨款案",
    body: "一月初，战争统帅在全国电视讲话里宣布向巴格达增兵两万一千人。参院已经换了主人：三周之内，拨款案被夹上撤离时间表，白宫回敬一份否决声明。\n" +
      "党团里的人开始按这一条线重新排队。你县国民警卫队第二拨开拔的家属，还在等你一句准话——而你州的军工厂订单，全挂在战争预算上。\n" +
      "把政策夹进钱袋案就很难单独摘掉，这一票投下去，你被排进哪一列，谁都看得见。",
    choices: [
      {
        id: "care_units", text: "两头不站：只推轮换与心理卫生经费",
        note: "赌的是兵的账不分党派。风险：战略表决还是没你一句。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你把轮换条例在两个礼拜内办到位了。归来的连长登门道谢；那天的拨款表决，你照样没表态。", effects: { rep: 0.3, fac: { military: 3, base: 2 } } },
          ok: { body: "你只谈部队的事，一句战略没沾。有人嫌你小气，没人说你站错。", effects: { rep: 0.2, fac: { military: 2 } } },
          meh: { body: "你签了几笔探视与补助的条子，这个月就过去了。", effects: { rep: 0.1 } },
          fail: { body: "第二拨开拔那天，欢送会没人来通知你。家属自己办了。", effects: { rep: -0.2 } },
          critfail: { body: "有个班减员归来，你只说过一句「注意轮换」。那句话被人在礼堂上重复了一遍。", effects: { rep: -0.3 } }
        }
      },
      {
        id: "rider_yes", text: "支持时间表：给拨款上笼头，限期撤离",
        note: "赌的是厌战压得住惯例。风险：你在部队开拔时断钱。",
        base: 0.48, mods: [{ src: "fac", key: "base", w: 0.3 }, { src: "attr", key: "INT", w: 0.3 }],
        cost: { fun: 0.4 },
        outcomes: {
          crit: { body: "夹带案过了，白宫说要走否决。你上了当晚所有台的分屏：「敢给钱袋上笼头的人」。", effects: { rep: 1.4, fac: { base: 8, press: 5, military: -7, establishment: -5 }, voters: { warm: 400 }, flags: ["purse_strings"] } },
          ok: { body: "你跟着新多数投了。党团给你换了个位置坐，军属席没人挪。", effects: { rep: 0.8, fac: { base: 5, establishment: -4 } } },
          meh: { body: "你的票进了计票单，第二天没人再翻这一页。", effects: {} },
          fail: { body: "否决威胁把案子收了回去，钱照花，仗照打。同事说你只会作秀。", effects: { rep: -1.1, fac: { establishment: -6, military: -4 } } },
          critfail: { body: "你州那家军工厂丢了一单，两千人被裁。裁员通知上没写你的名字，镇上写了。", effects: { rep: -1.9, fac: { commercial: -8, labor: -5, establishment: -5 } } }
        }
      },
      {
        id: "surge_back", text: "公开撑增兵：不能在人往前线时拆台",
        note: "赌的是十八个月能变天。风险：战略失败你就是招牌。",
        base: 0.4, mods: [{ src: "fac", key: "establishment", w: 0.3 }, { src: "attr", key: "CUN", w: 0.35 }],
        cost: { fun: 0.3 }, req: { tier: 2 },
        outcomes: {
          crit: { body: "秋天暴力数字真的往下走。年终盘点请这位「撑增兵的人」出镜，你州军工厂新开了一个班次。", effects: { rep: 1.6, fac: { establishment: 9, military: 7, commercial: 5, base: -6 }, attr: { INT: 1 }, flags: ["surge_ally"] } },
          ok: { body: "你站在了统帅那边。机器记下了，街区没原谅。", effects: { rep: 0.8, fac: { establishment: 6, military: 5, base: -4 } } },
          meh: { body: "你的表态两边都不引用，安安静静过了一个季度。", effects: { rep: -0.1 } },
          fail: { body: "阵亡数字接着往上爬。你那段撑增兵的话，成了对手广告的核心素材。", effects: { rep: -1.4, fac: { base: -7, press: -4 } } },
          critfail: { body: "时间表没加上，钱全批了。那月本镇又抬回一口棺，抬棺的人不肯看你。", effects: { rep: -2.2, fac: { base: -10, military: -3, press: -5 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2010-01 · 竞选出资裁决 —— 募款算术一夜改写（机遇）
   * ==================================================================== */
  {
    id: "ln10_money", photo: "era-2010.jpg", grade: "major", category: "political",
    valence: "boon", dyn: true,
    minYear: 2010, maxYear: 2010, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["internet", "cable", "print", "social"], month: 1, day: 21,
    title: "最高法院放开独立政治支出，超级政治行动委员会随即出现",
    body: "一月下旬，最高法院对一家非营利组织诉联邦选举委员会案落槌：公司与工会的独立政治支出，政府不得设限。留下的唯一规矩是——不得与候选人协调。\n" +
      "几个月内，「超级政治行动委员会」开张：它募款上不封顶，只禁一条——不得与候选人协调。筹款的算术一夜改写：你的委员会还戴着募款上限，替你把钱花出去的人却没有。\n" +
      "当年中选的开销，照预期贵成了历史纪录。谁的钱会先走到你门口？",
    choices: [
      {
        id: "keep_books", text: "不跟：按老规矩募款，一分不多拿",
        note: "赌的是克制在浪退后还值钱。风险：你的声音被广告淹掉。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "秋天广告淹了本地频道。到头来还立着的只有你的草皮牌，选民说：至少他没求过外面的钱。", effects: { rep: 0.3, fac: { base: 3 } } },
          ok: { body: "你按老限额募款，按老规矩办事。谁也没挑出你毛病。", effects: { rep: 0.2 } },
          meh: { body: "你把账做得很干净，干净到没人注意。", effects: { rep: 0.1 } },
          fail: { body: "对手的外包广告一个月放三遍，你的回应只买得起一遍。", effects: { rep: -0.2 } },
          critfail: { body: "选后复盘写在你那页上：他连钱都不敢收。这行字被人念到你下次集会。", effects: { rep: -0.3 } }
        }
      },
      {
        id: "super_hook", text: "接新管道：让超级委员会「恰好」替你说话",
        note: "赌的是协调查不实。风险：线一旦被坐实就是丑闻。",
        base: 0.44, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "commercial", w: 0.3 }],
        cost: { fun: 0.5 },
        outcomes: {
          crit: { body: "三条挺你的广告上线，钱全来自州外。你一个名字没念，记者也没找到一条接线。", effects: { fun: 1, rep: 1.5, fac: { commercial: 8, establishment: 5, press: -4 }, flags: ["dark_money"] } },
          ok: { body: "委员会替你打了你想打却不能说的那一仗。机器学会了对你这段装看不见。", effects: { rep: 0.8, fac: { commercial: 6, establishment: 3 } } },
          meh: { body: "你递的名片没回音，广告里夸的是别人。", effects: { rep: 0.1 } },
          fail: { body: "「恰好」得太准：广告词与你内部备忘录一字不差。社论版要你解释什么叫巧合。", effects: { rep: -1.2, fac: { press: -6, commercial: -3 } } },
          critfail: { body: "那家委员会和你的办公室共用一名律师。报纸管这叫「协调」，告状信已送到选委会。", effects: { rep: -2.1, fac: { press: -7, establishment: -5 }, flags: ["scandal_1", "investigation_open"] } }
        }
      },
      {
        id: "reform_cry", text: "骑反浪：把推翻这条裁决当竞选议题",
        note: "赌的是骂钱的怒火买不动。风险：你没有钱打广告战。",
        base: 0.38, mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "CHA", w: 0.35 }],
        cost: { fun: 0.4 },
        outcomes: {
          crit: { body: "你那句「这个席位不出售」成了全年被转发最多的筹款邮件。你被砸得最狠，票却收得最多。", effects: { rep: 1.6, fac: { base: 10, press: 6, commercial: -8, establishment: -4 }, voters: { warm: 800 }, flags: ["antimoney"] } },
          ok: { body: "你把这句话在每一场镇厅辩论上说了一遍。钱没进来，握手进来了。", effects: { rep: 0.8, fac: { base: 6, commercial: -4 } } },
          meh: { body: "你的议题人人点头，人人接着去看广告。", effects: { rep: -0.1 } },
          fail: { body: "三家超级委员会把你州淹了。你的声音出不了教堂地下室。", effects: { rep: -1.3, fac: { base: -5, commercial: -5 } } },
          critfail: { body: "你输掉的不只是席位：出口民调说最后两周的广告定的局。金主名单上，你的名字被划在对手那栏。", effects: { rep: -2.2, fac: { base: -8, establishment: -4, press: -3 } } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 定点表 fixed · 2005—2010 补薄（5 个锚点，major 3 / 5）
 *   只钉本带此前漏掉的月份，与 123/124 带已有锚点（2005-02/08、2006-11、
 *   2007-04/08、2008、2009、2010-04/07/09）互不重复。
 *   世界线 pressure/brief/outlets 已由 123（2003—2006）与 124（2007—2010）写齐，
 *   本文件不重复覆盖。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln05_lobby", year: 2005, month: 11, grade: "major" },
  { event: "ln06_alito", year: 2006, month: 1, grade: "mid" },
  { event: "ln06_saddam", year: 2006, month: 12, grade: "major" },
  { event: "ln07_surge", year: 2007, month: 1, grade: "mid" },
  { event: "ln10_money", year: 2010, month: 1, grade: "major" }
]);
