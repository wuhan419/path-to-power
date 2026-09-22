/* ============================================================================
 * CONTENT · events/101-era-1929.js
 * 时代：1929 大萧条 —— 崩盘、挤提、面包线、退伍军人补偿金、新政以工代赈。
 * 铁律见 docs/CONTENT-SCHEMA.md §11；投资型回报用 funMul，消费型 ok 档给非钱回报。
 * ==========================================================================*/

POTUS.define("event", [

  /* ------------------------------------------------------------------------
   * 1) 黑色星期二 —— 崩盘当周（大事件，史实锚点 10/29）
   * ---------------------------------------------------------------------- */
  {
    id: "dep1929_crash", grade: "major", category: "crisis",
    valence: "bane", dyn: true,
    era: ["1929_DEPRESSION"], tierMin: 0, tierMax: 5, weight: 13, unique: true,
    month: 10, day: 29,
    title: "这一天，股票卖不出去了",
    body: "交易所的电报机吐出的纸条拖到了地上。你认识的人里，昨天还有人在讲「永远涨」，\n" +
      "今天已经在问你能不能帮他把股票脱手。你手上的钱，和整座城市的钱，同一天变薄了。",
    brief: {
      lede: "财富没有凭空消失，它只是换了一批人替它着急。",
      known: [
        "你被卷进来，是因为你之前替本地的证券公司说过话、拉过存款，街坊把你和他们绑在一起看。",
        "崩盘是交易所里的事，但挤提发生在你选区的银行门口。",
        "有三家常来你这里的商户今天开始挂「现金交易」的牌子。",
        "谁都能在电视没有的年代靠一张嘴稳住或搅乱一家银行的存款人。"
      ],
      rumor: [
        "有人说银行其实没倒，是有钱人先撤了，故意吓散户。",
        "有人说财政部已经在凑一笔钱救最大的那几家——至于救不救得到你这样的，没人说。"
      ],
      unknown: [
        "这场崩是又一次普通衰退，还是一个十年的开头。",
        "如果你此刻替储户喊话，喊对了是领袖，喊错了是恐慌的放大器。"
      ],
      terms: [
        { k: "挤提", v: "存款人同时去银行取钱。银行只留一小部分现金，谁都抢，就谁都可能抢空。" },
        { k: "券商", v: "替人买卖股票、也替小银行拉存款的中间人，崩盘时最容易成为出气筒。" }
      ]
    },
    choices: [
      {
        id: "steady", text: "站到银行门口，替储户喊「别抢，我第一个不取」",
        note: "把信誉押上。稳住则成危机里的定盘星；一旦银行真倒了，你就是「劝人别取钱的那个人」。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.5 }, { src: "fac", key: "base", w: 0.4 }],
        stake: { ap: true },
        outcomes: {
          crit: { body: "你连着三天站在那扇门上，队伍真的散了。银行撑过了挤提，你的名字和本城的「稳」字绑在了一起。",
            effects: { rep: 1.75, fac: { base: 16, commercial: 8 }, flags: ["dep_anchor"] } },
          ok: { body: "你劝住了大半人。银行撑过来了，没全信你，但也没忘了你那天站在门口。",
            effects: { rep: 0.9, fac: { base: 10, commercial: 4 } } },
          meh: { body: "喊了两天，人还是取了钱。银行勉强没倒，你嗓子哑了，落一句「他尽力了」。",
            effects: { rep: 0.3, hp: -0.4, fac: { base: 4 } } },
          fail: { body: "你稳住了场面，可第四天银行还是贴了封条。取不到钱的人想起了你劝他们别取的话。",
            effects: { rep: -0.7, fac: { base: -10, commercial: -6 }, flags: ["scandal_1"] } },
          critfail: { body: "封条贴上那天你就明白：这家银行早在你喊话前就已经空了。你替一个空壳稳住了人群，成了最后一根稻草的替罪羊。",
            effects: { rep: -1.5, fac: { base: -16, commercial: -10 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "run", text: "不声张，先把自己和亲近人的钱取出来",
        note: "损人不一定利己，但能自保。若被看见，你就是「早跑的那个人」。",
        base: 0.66, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你在贴封条前取空了自己和几家老朋友的存款，安排得滴水不漏。钱保住了，朋友把这份人情记了一辈子。",
            effects: { fun: 1, fav: 3, contact: { fixer: 10 }, fac: { commercial: 6 } } },
          ok: { body: "你把该取的钱取了出来。别人亏，你没亏，只是走在街上开始有人多看你了。",
            effects: { fun: 0.7, fac: { commercial: 3 } } },
          meh: { body: "你取到了一部分，队伍太长，剩下的卡在闸里。你只保住了自己那点。",
            effects: { fun: 0.2, rep: -0.2 } },
          fail: { body: "你取钱的消息先漏了出去，反倒给银行招来更大一波挤提。你既没多保住钱，又背了「放风的人」的名。",
            effects: { fun: 0.3, rep: -0.6, fac: { base: -8, commercial: -6 } } },
          critfail: { body: "你跑得太早也太张扬，被拍到你从后门搬钱箱。储户的钱没保住，你的名声先保不住了。",
            effects: { fun: 0.3, rep: -1.25, fac: { base: -14, press: -10 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "broke", text: "一分钱也取不动，只能去门口跟邻居一起排队",
        base: 0.7, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你和排队的街坊在冷里聊了一整天，把彼此的难处摸清了。你手上没有钱，却有了一份谁也拿不走的「知道谁在挨饿」的名册。",
            effects: { rep: 0.4, fac: { base: 8, labor: 5 }, flags: ["knows_hunger"] } },
          ok: { body: "你和大家一起排，一起空手回。没什么收获，但你和这条街站到了一起。",
            effects: { rep: 0.2, fac: { base: 4 } } },
          meh: { body: "你排了队，取了点零头，回家算着能撑几周。日子紧，但没出事。",
            effects: { rep: 0.1, hp: -0.3 } },
          fail: { body: "队伍里有人认出你「前几天在替券商说话」，把这几年的火撒到你身上。",
            effects: { rep: -0.4, fac: { base: -6 } } },
          critfail: { body: "你取不到钱，又被人堵在队伍里质问。第二天，「他也取不出」成了整条街唯一的笑话。",
            effects: { rep: -0.7, hp: -0.4, fac: { base: -8, commercial: -4 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 2) 补偿金大军 —— 退伍兵进京城讨薪（1932，民权/危机）
   * ---------------------------------------------------------------------- */
  {
    id: "dep1932_bonus", grade: "mid", category: "civil",
    valence: "risk", dyn: true,
    era: ["1929_DEPRESSION"], tierMin: 1, tierMax: 5, weight: 11,
    medium: ["print", "radio"],
    title: "他们举着当年的军旗来要钱",
    body: "一戰老兵在城边的空地上搭起了帐篷，孩子和病人都睡在里面。他们要的是三年前就该发的补偿金。\n" +
      "市政厅准备叫骑警清场，动手前先想到了你——上次你在退伍军人会门口握过一圈手。",
    brief: {
      lede: "一群穿过军装的人来讨一纸承诺，你能替他们做的，和该替他们做的，不是一回事。",
      known: [
        "他们点名要你来说话，因为你在会上握过手、许过「补偿金的事我记着」——这就是为什么是你。",
        "补偿金在国会卡着，市政只想让这片帐篷今天消失，好让市容撑到某个大选前。",
        "营里有病人、有孩子，也有真拿过勋章的老兵，鱼龙混杂，谁都能被当成借口。",
        "清场的命令随时会下，你只有这几十小时做一次有分量的表态。"
      ],
      rumor: [
        "有人说营里混进了鼓动暴动的人，正等着有人替他们把火点起来。",
        "有人说上面已经决定要清，只是缺一个「他们先动手」的由头。"
      ],
      unknown: [
        "如果你替他们说话，会被当成领袖，还是会被当成同谋一起清掉。",
        "这一营人散去之后，会不会在某次广播里变成一个全国的话题。"
      ],
      terms: [
        { k: "补偿金", v: "政府承诺提前发放给一戰老兵的服役报酬，被国会一再拖延，成了萧条里最刺眼的一笔欠账。" }
      ]
    },
    choices: [
      {
        id: "advocate", text: "进营安抚，然后把他们的账直接捅到市政厅",
        note: "把街头接到体制内。办成是斡旋，办砸就是「替闹事者背书」。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "military", w: 0.4 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "你把老兵的请愿当面拍在市长桌上，还带着两家报纸。清场暂时收了手，你的名字和「替穿军装的人说过话」连在了一起。",
            effects: { rep: 2, fav: 1, fac: { military: 14, base: 8, establishment: -6 }, flags: ["veteran_friend"] } },
          ok: { body: "你既稳住了营里，又把诉求递了上去。钱没马上发，但清场缓了一缓，两边都还认你。",
            effects: { rep: 1.25, fac: { military: 8, base: 5 } } },
          meh: { body: "你两头传话，两头都觉得你在拖。营地散了，你什么实质也没换来。",
            effects: { rep: 0.4, fac: { military: 3 } } },
          fail: { body: "市政厅用你的名义安抚了两天，然后趁夜清了场。老兵发现你「原来也是他们的人」。",
            effects: { rep: -1.25, fac: { military: -12, base: -8 }, flags: ["scandal_1"] } },
          critfail: { body: "清场时起了火，有人把「煽动」的帽子扣到你头上，因为你之前进过营。你没救成他们，还差点把自己搭进去。",
            effects: { rep: -2, hp: -0.8, fac: { military: -14, establishment: -8 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "suppress", text: "站市政一边：劝他们散去，别逼骑警动手",
        note: "对机器「懂事」。保得住位子，但会得罪一批最不会忘记的人。",
        base: 0.62, mods: [{ src: "fac", key: "establishment", w: 0.4 }],
        outcomes: {
          crit: { body: "你替市政厅把场面说得体体面面，老兵悻悻散去。市长在党内名单上给你记了「关键时刻靠得住」。",
            effects: { rep: 0.8, tier: 1, fac: { establishment: 12, military: -12 } } },
          ok: { body: "你劝散了营，没动粗。上层满意，老兵不骂你，只是不再信你。",
            effects: { rep: 0.4, fac: { establishment: 8, military: -8 } } },
          meh: { body: "你说了「快散了吧」，可没人听你的，也没人记你的好。",
            effects: { fac: { establishment: 3, military: -4 } } },
          fail: { body: "你替当局劝场，第二天骑警还是冲了。照片里老兵抱着军旗倒地，你那句「散了吧」成了帮凶。",
            effects: { rep: -1.25, fac: { military: -14, base: -8 }, flags: ["scandal_1"] } },
          critfail: { body: "营地在「你劝散之后」被烧，有人说正是你拖住的这些人错过了撤离。这条账砸实了砸到你头上。",
            effects: { rep: -2.25, fac: { military: -18, base: -10, press: -6 }, flags: ["scandal_3"] } }
        }
      },
      {
        id: "aid", text: "不表态，只悄悄把营里的病人和小孩安排出去",
        base: 0.7, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你没说一句政治话，只是连夜把几个病号和孩子送到了亲戚家。这事没上头版，可营里每个人都记住了你的名字。",
            effects: { rep: 1.25, hp: -0.8, fac: { base: 8, military: 8 }, contact: { doctor: 8 } } },
          ok: { body: "你帮着安置了几个人。政治的事你没碰，人道的事你做到了。",
            effects: { rep: 0.6, fac: { base: 4, military: 3 } } },
          meh: { body: "你帮了几个，帮不完。忙了一夜，第二天营照样被清。",
            effects: { rep: 0.2, hp: -1 } },
          fail: { body: "你的「悄悄帮忙」被两边都看见了：当局说你通营，营里说你不够意思。",
            effects: { rep: -0.6, fac: { base: -4, establishment: -4 } } },
          critfail: { body: "你替一个病重老兵找的住处出了事，他被当成「逃跑者」抓了回去，罪名算到你头上。",
            effects: { rep: -1.25, fac: { military: -8, establishment: -6 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 3) 以工代赈的拨款 —— 投资型（回报走 funMul）
   * ---------------------------------------------------------------------- */
  {
    id: "dep1933_works", grade: "mid", category: "finance",
    valence: "risk", dyn: true,
    era: ["1929_DEPRESSION"], tierMin: 1, tierMax: 4, weight: 10,
    medium: ["print", "radio"],
    title: "上面拨下来一笔「以工代赈」的钱",
    body: "联邦的新政机构给本郡批了一笔款，修那条年年淹水的土路。钱不多，但要有人先垫、先组织、先担责。\n" +
      "新政的办事员问你能不能牵头——他需要一个本地「出了事跑得掉责任、也担得起责任」的人。",
    brief: {
      lede: "一笔救急的公款，经手的人是英雄还是替罪羊，全看这条路修不修得起来。",
      known: [
        "之所以找你，是因为这条土路穿过你的选区，你为它喊了好几年，本地只有你说得上话也兜得住人。",
        "款子分批到，第一笔要先由牵头人垫上材料和工钱。",
        "修得好，你的名号和这条能用的路一起留下；修砸了，垫进去的钱和被欠薪的工人一起找你。",
        "新政的账目要公开——这意味着它既护你，也能在任何时候把你暴露。"
      ],
      rumor: [
        "有人说这笔款根本不够修完，先垫的人是在替上面填坑。",
        "有人说邻郡有人借同样的名义把公款挪去了自己生意上，如今活得好好的。"
      ],
      unknown: [
        "这条路上马之后，会不会变成下次选举你「有政绩」的证据。",
        "如果款子中途断，垫进去的钱还能不能见着。"
      ],
      terms: [
        { k: "以工代赈", v: "政府出钱雇失业者做公共工程，把救济变成工资。牵头人常要先垫付。" }
      ]
    },
    choices: [
      {
        id: "lead", text: "牵头，先自掏材料钱把工程开起来",
        note: "投入本金做一件会生钱也会生名声的事。修成 = 回本 + 政绩 + 工会人情；烂尾 = 钱和名声一起填进土里。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "labor", w: 0.35 }],
        cost: { fun: 1 }, req: { fun: 1 }, stake: { fun: true, ap: true },
        outcomes: {
          crit: { body: "路在冬天前修通了，公款陆续到账，你垫的钱连本带利回到你账上，还顺手把沿线的选民变成了你的铁杆。",
            effects: { funMul: 1.4, rep: 1.5, fac: { labor: 12, base: 10, establishment: 6 }, flags: ["works_chief"] } },
          ok: { body: "路修好了，钱回本了，工头们记住了你这个「不欠薪的牵头人」。",
            effects: { funMul: 0.7, rep: 1, fac: { labor: 8, base: 5 } } },
          meh: { body: "拖拖拉拉总算收了尾，款子勉强盖住你垫的钱。修是修成了，没人特别念你的好。",
            effects: { funMul: 0.25, rep: 0.4, fac: { labor: 3 } } },
          fail: { body: "款子在半途断了，材料钱打了水漂，工人堵着你要工钱。路没修完，你先欠了一身。",
            effects: { funMul: -0.7, rep: -1, fac: { labor: -10, base: -4 } } },
          critfail: { body: "工程烂尾还出了塌方伤人的事。审计顺着新政的公开账目找到了你的名字：「就是他垫的、就是他管的」。",
            effects: { funMul: -1.0, rep: -2.25, hp: -0.8, fac: { labor: -14, establishment: -8 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "farm", text: "不自己垫，把牵头位转给包工头，你只挂名督办",
        note: "低风险、低回报。工程成，你署名；工程败，你「只是挂名」——但机器也看你有没有担事。",
        base: 0.68, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "包工头把事干成了，你挂着督办的名分收了工头递来的一份「辛苦钱」，还不用垫一分钱。",
            effects: { fun: 1, rep: 0.8, fac: { commercial: 6, labor: 3 } } },
          ok: { body: "路修好了，你署名督办，谁也没亏着。稳妥的一手。",
            effects: { rep: 0.6, fac: { base: 4, commercial: 3 } } },
          meh: { body: "工程磕磕绊绊，你两头协调得难受，最后勉强交差，名声平平。",
            effects: { rep: 0.2, hp: -0.5 } },
          fail: { body: "包工头卷了预付款跑了。审计来问督办是谁，你手上连一张能自证的纸都没有。",
            effects: { rep: -1, fac: { establishment: -8, base: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "包工头跑了，还带走了一份写着「督办知情」的字据。这顶「挂名」的帽子，突然有了分量。",
            effects: { rep: -1.75, fac: { establishment: -10, base: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "decline", text: "不沾这笔钱，让新政直接对工会发包",
        base: 0.72, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你退了一步，让办事员直接对接本地工会。路照样修，你干净落了一个「不占公款」的清名，工会反倒主动来谢你。",
            effects: { rep: 0.8, fac: { labor: 6, base: 4 }, contact: { union_boss: 6 } } },
          ok: { body: "你没沾手。工程照走，你的账目干净，只是少了一次攒功劳的机会。",
            effects: { rep: 0.2, fac: { base: 2 } } },
          meh: { body: "你推了牵头，可路修成时大家想起的是「那笔钱本来是他争取的」。说不清是谁的功劳。",
            effects: { rep: 0.2, fac: { labor: -2 } } },
          fail: { body: "你退得太干脆，机器觉得你「关键时刻不顶事」。以后有好项目，也未必先想到你。",
            effects: { rep: -0.4, fac: { establishment: -6 } } },
          critfail: { body: "你把牵头推给了别人，那人却出了事，转头咬定「当初是某某逼我接的」。你没沾钱，倒沾了一身解释。",
            effects: { rep: -1, fac: { establishment: -6, base: -4 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 4) 面包线前的记者 —— 小事（消费/舆论，无重钱选项，保底天然）
   * ---------------------------------------------------------------------- */
  {
    id: "dep1930_breadline", grade: "minor", category: "media",
    valence: "risk", dyn: true,
    era: ["1929_DEPRESSION"], tierMin: 0, tierMax: 3, weight: 10,
    medium: ["print", "radio"],
    title: "你从面包线前面走过",
    body: "街角排了一条领免费汤的队，从人行道上一直拐进巷子。有记者正好在拍，镜头抬起来，等你的反应。\n" +
      "这条队里站着的，一大半是去年还在给你投票的人。",
    brief: {
      lede: "一条队伍，一台相机，一个躲不开的政治人物——这就是三样东西凑在一起时的局面。",
      known: [
        "你被拍，是因为这条线就在你的办公室楼下，你每天出门都经过，今天没绕开。",
        "排队的人认得你，记者也正想听你说句「有分量」的话。",
        "此刻任何一句「会好的」都可能变成明天的标题，也可能变成巷子里的一声冷笑。"
      ],
      rumor: [
        "有人说这条线是对手故意放人来「拍照用的」。",
        "有人说记者其实是你自己党部的，专拍你「关心民间」的暖新闻。"
      ],
      unknown: [
        "这张照片明天是把你写成「和百姓站在一起」，还是「走过百姓身边」。",
        "队伍里那几张熟脸，下次选举还会不会投你。"
      ],
      terms: [
        { k: "面包线", v: "萧条里慈善机构或社区支锅施食前排的长队，是「大萧条」最直接的视觉符号。" }
      ]
    },
    choices: [
      {
        id: "join", text: "走进队伍，挽起袖子帮工",
        note: "用最笨也最有效的办法。帮到位是「自己人」，帮砸了是「来作秀的」。",
        base: 0.58, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.35 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "你帮着支锅、给熟人多舀了一勺，照片上你的袖子是脏的。这张比任何竞选海报都管用。",
            effects: { rep: 2.5, fac: { base: 10, press: 5 } } },
          ok: { body: "你在队里干了一上午。累，但街坊说「他没架子」。",
            effects: { rep: 1.25, hp: -1, fac: { base: 5 } } },
          meh: { body: "你帮了半天手忙脚乱，帮倒忙被人嫌。心意到了，效果一般。",
            effects: { rep: 0.4, hp: -1.5 } },
          fail: { body: "你一进去就像来参观的，队伍里的人当场说「回去坐你的办公室吧」。照片拍下了你的尴尬。",
            effects: { rep: -1.25, fac: { base: -6 } } },
          critfail: { body: "你在队伍里打翻了汤锅，烫着一个孩子。第二天标题是「议员的作秀，一锅热汤」。",
            effects: { rep: -2.5, fac: { base: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "promise", text: "对镜头说一句「我下周就带救济来」",
        note: "话好说，兑现难。说了就要做到，做不到就是给自己挖坑。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.45 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你说下周带救济，还真从教会和商会凑来了。一句空话被你兑现成了实打实的一车面包。",
            effects: { rep: 2.75, fav: 2, fac: { church: 8, base: 6 } } },
          ok: { body: "你对镜头许了愿，勉强凑出了半数。有惊无险地兑现了。",
            effects: { rep: 1.25, fac: { base: 3, church: 3 } } },
          meh: { body: "话说得很漂亮，救济却拖了两周才勉强到位。人们记住了前半句，也记住了后半句的迟到。",
            effects: { rep: -0.4 } },
          fail: { body: "你许了愿却凑不来东西。下周你没能出现在街角，那成为另一张更有名的照片。",
            effects: { rep: -2, fac: { base: -8, church: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "救济没来，反倒来了骑警清队。镜头把你那句「下周带救济」和清空街面的画面剪在了一起。",
            effects: { rep: -3, fac: { base: -10, press: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "dodge", text: "低头快步走过去，不当这个背景",
        base: 0.66, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你沉着地快步走过，既没躲镜头也没作秀。有人反而觉得你「像个真在办事、没空表演的人」。",
            effects: { rep: 0.8, fac: { establishment: 3 } } },
          ok: { body: "你走过去了，没留话也没留影。小事一桩，翻篇了。",
            effects: { rep: 0.4 } },
          meh: { body: "你走得太急，反倒显得心虚。记者追了一句，你没回头。",
            effects: { rep: -0.4, fac: { base: -2 } } },
          fail: { body: "你躲镜头的样子被拍了个正着，标题是「他不敢从队伍前走」。",
            effects: { rep: -1.5, fac: { base: -6, press: -4 } } },
          critfail: { body: "你夺路而走还撞翻了一个排队老人的桶。这一幕被画成了整版漫画，从此跟着你。",
            effects: { rep: -2.75, fac: { base: -10, press: -8 }, flags: ["scandal_1"] } }
        }
      }
    ]
  }
]);
