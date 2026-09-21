/* ============================================================================
 * CONTENT · events/105-era-1980.js
 * 时代：1980 保守回潮 —— 里根浪潮、减税松监管、空中交通管制员被解雇、核冻结运动。
 * 铁律见 docs/EVENT-WRITING-BRIEF.md。人脉只用已登记的 8 个。
 * ==========================================================================*/

POTUS.define("event", [

  /* ------------------------------------------------------------------------
   * 1) 「政府本身才是问题」—— 1980 大选浪潮（大事件，锚点 11 月）
   * ---------------------------------------------------------------------- */
  {
    id: "rg80_wave", grade: "major", category: "political",
    valence: "risk", dyn: true,
    era: ["1980_REAGAN"], tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["print", "radio", "tv", "cable"], month: 11,
    title: "一整片州一夜之间换了颜色",
    body: "电视里，那位前演员以碾压之势横扫全国。滞胀、人质、和一句「政府不能解决问题」，\n" +
      "把在位者送下了台，也把一整套新说法送进了主流。你所在的这片选区，第一次出现了裂缝。\n" +
      "老派建制还在消化败选，而一个新词——「里根民主党人」——已经被印进了每一张民调。",
    brief: {
      lede: "一阵风向变了。你可以逆流站，也可以借势换一身衣服——但换衣服的手不能被人看见。",
      known: [
        "风向找到你，是因为你所在的选区这次投给了对手，党部要你来解释「为什么」，也等着看你会不会跟着变调。",
        "减税、强军、放松监管——这三样从前是对手的话，如今连本党都得小心措辞。",
        "你手上有一份老建制的任命、也有一批开始动摇的基层。两边此刻都在看你眼色。"
      ],
      rumor: [
        "有人说党魁已经准备投降式改弦更张，正挑「第一个公开转向的人」当样板。",
        "有人说这股浪潮撑不过两任，等经济一塌就会回头。"
      ],
      unknown: [
        "这次转向会被记成「识时务」还是「没骨气」，取决于接下来十年谁当家。",
        "如果你抢在所有人前面拥抱新风，你会是新朝的功臣，还是老同事眼里最先出卖大家的那个。"
      ],
      terms: [
        { k: "里根民主党人", v: "原本投民主党的蓝领与保守选民，1980 年倒向共和党，成为此后两党争夺的关键群体。" }
      ]
    },
    choices: [
      {
        id: "ride", text: "抢先转向：公开赞成减税与强军，拥抱新多数",
        note: "赌新浪潮长期主导。抢得早是先知，抢得难看是墙头草——而且新朝未必记得你的Timing。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "commercial", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你第一个把老话改口成新话，新班子把你当「开明的地方人」。你既保住了老关系，又领了新潮流的功。",
            effects: { rep: 1, tier: 1, fac: { establishment: 6, commercial: 12, base: 6 }, flags: ["reagan_era"] } },
          ok: { body: "你顺势转向，成了「读懂选区」的人。老同事侧目，但账面上的好处是实打实的。",
            effects: { rep: 0.6, fac: { commercial: 8, establishment: 3 } } },
          meh: { body: "你转了向，可转得太露骨，谁都没全信。新的嫌你油滑，旧的骂你背叛。",
            effects: { rep: -0.1, fac: { base: -4 } } },
          fail: { body: "你急着拥抱新风，被拍到你「昨天还在念老稿子」。墙头草的标签一次贴牢。",
            effects: { rep: -0.7, fac: { base: -8, establishment: -6 }, flags: ["scandal_1"] } },
          critfail: { body: "你跳得太快，反被新势力当成「随时会再跳走的旧机器的人」，两边都不要你。",
            effects: { rep: -1.25, fac: { establishment: -10, commercial: -8, base: -8 }, flags: ["party_traitor"] } }
        }
      },
      {
        id: "hold", text: "守住老派：照旧讲救济、劳工与政府该管的事",
        note: "逆着浪守旧原则。可能一夜过时，也可能在浪退后被重新尊为「有骨气」。",
        base: 0.45, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "labor", w: 0.35 }],
        outcomes: {
          crit: { body: "在全党投降的空气里，你替老议程说了完整的一段。当下没人接话，可工会和基层悄悄记住了「那种时候他还敢讲」。",
            effects: { rep: 0.8, fac: { labor: 12, base: 8, establishment: -4 }, contact: { union_boss: 8 }, flags: ["old_school"] } },
          ok: { body: "你守住了老话。短期内不占便宜，但你没丢自己的根，也没丢自己人。",
            effects: { rep: 0.3, fac: { labor: 6, base: 3 } } },
          meh: { body: "你讲了原则，讲得没人爱听。位子没动，声音越来越小。",
            effects: { rep: 0.1, fac: { establishment: -3 } } },
          fail: { body: "在举国思变的时刻你死守旧调，被报纸写成「跟不上时代的老派」。",
            effects: { rep: -0.6, fac: { press: -6, commercial: -6 } } },
          critfail: { body: "你的固执被算成了整片老机器的失败之一，党要把败选的责任甩给「不肯改的人」，你首当其冲。",
            effects: { rep: -1, fac: { establishment: -12, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "pragmatic", text: "不谈主义谈钱包：只强调就业与减税的「本地版」",
        base: 0.62, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你把宏大的意识形态翻译成「给你少收点、多留点工作」的本地话，两边都挑不出毛病，选民觉得你最实在。",
            effects: { rep: 0.7, fac: { base: 8, commercial: 5 } } },
          ok: { body: "你避开了主义的坑，只谈柴米油盐。安全，也还算讨喜。",
            effects: { rep: 0.3, fac: { base: 4 } } },
          meh: { body: "你哪边都没深谈，像一阵穿堂风，谁都没抓住你说过什么。",
            effects: { rep: 0.1 } },
          fail: { body: "你的「不谈主义」被两边读成「没有立场」。在狂热的选举年，这几乎等于没票。",
            effects: { rep: -0.4, fac: { establishment: -4, base: -3 } } },
          critfail: { body: "你谁也没得罪，也谁也没动员。选区被对手一波带走，党内部检讨名单上有你「不出力」一条。",
            effects: { rep: -0.7, fac: { establishment: -6, labor: -4 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 2) 塔台空无一人 —— 管制员被集体解雇（1981，劳工/危机）
   * ---------------------------------------------------------------------- */
  {
    id: "rg81_patco", grade: "mid", category: "civil",
    valence: "bane", dyn: true,
    era: ["1980_REAGAN"], tierMin: 1, tierMax: 4, weight: 11,
    medium: ["print", "radio", "tv"], month: 8,
    title: "上百万人订的机票，一夜之间说不清",
    body: "空中交通管制员罢工了，白宫给每个人发了信：回来，否则解雇，还引用了一部禁止公务人员罢工的法。\n" +
      "绝大多数人没回来。几周之内，一萬多人被正式开除，工会被罚款到破产。全国头一次看清：风向真的变了。",
    brief: {
      lede: "一次被当作立威靶子的罢工。你要站在「依法铁腕」那边，还是「工人饭碗」那边。",
      known: [
        "这事过到你手上，是因为你管着本地那几座机场的预算与选区，成千上万被解雇者的家属就在你的选民册里。",
        "白宫要用这一刀告诉全国：工会的好日子到头了。执行者风光，反对者被当成纵容违法。",
        "被解雇的人里，有不少是你从前在选区握过手的普通工薪族。"
      ],
      rumor: [
        "有人说上面早备好了替代人手，根本不在乎机场会不会乱。",
        "有人说这场罢工是被故意激出来的，好给「杀鸡儆猴」一个由头。"
      ],
      unknown: [
        "这一刀砍下去，会不会顺带砍掉你赖以生存的整个工会票仓。",
        "十年后回看，你会被记成「看清风向的人」还是「帮凶」。"
      ],
      terms: [
        { k: "公务人员罢依法", v: "禁止政府雇员罢工的法律；1981 年管制员罢工即据此被集体解雇。" }
      ]
    },
    choices: [
      {
        id: "labor", text: "替被解雇的人说话：反对这种杀鸡儆猴",
        note: "和全国最风光的铁腕对着干。工会会记你一辈子，主流与上层会给你贴标签。",
        base: 0.48, mods: [{ src: "fac", key: "labor", w: 0.45 }, { src: "attr", key: "INTG", w: 0.3 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "你在一片「依法办事」的声浪里替丢掉饭碗的人说了话。劳工阵营把你当成罕见的敢言者，日后每逢选举都替你抬桥。",
            effects: { rep: 1.75, fac: { labor: 16, base: 8, establishment: -8 }, contact: { union_boss: 12 }, flags: ["labor_champion"] } },
          ok: { body: "你替工人顶了几句。上层不悦，可工会的人记住了你没在他们最难的时候缩回去。",
            effects: { rep: 1, fac: { labor: 10, establishment: -5 }, contact: { union_boss: 6 } } },
          meh: { body: "你说了几句软话，谁都没解气。工会嫌你不够，上层嫌你多事。",
            effects: { rep: 0.2, fac: { labor: 3, establishment: -2 } } },
          fail: { body: "你反对铁腕，被说成「支持违法罢工」。这股逆流把你冲得够呛。",
            effects: { rep: -1, fac: { establishment: -8, press: -5 }, flags: ["scandal_1"] } },
          critfail: { body: "你带头反对，成了全国「谁在纵容罢工」的头号靶子。反对你，成了一种政治正确。",
            effects: { rep: -2, fac: { establishment: -12, commercial: -8, base: -4 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "lawful", text: "支持依法处理：公务人员就不能罢工",
        note: "顺着最硬的浪头走。眼下最安全也最风光，代价是彻底得罪整个劳工世界。",
        base: 0.62, mods: [{ src: "fac", key: "establishment", w: 0.4 }, { src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你公开支持铁腕，被新潮流当成「敢讲常识的地方人」。上层与你越走越近，只是工会的门从此对你关了。",
            effects: { rep: 1, tier: 1, fac: { establishment: 12, commercial: 8, labor: -16 } } },
          ok: { body: "你站在「依法」一边，短期得利。可你在选区里握过手的工人，开始避开你的眼神。",
            effects: { rep: 0.4, fac: { establishment: 8, labor: -10 } } },
          meh: { body: "你跟着说了句「不该罢工」，说得含糊。上层没把你当自己人，工人也没真生气。",
            effects: { fac: { establishment: 3, labor: -4 } } },
          fail: { body: "机场乱成了一锅粥，航班大面积取消。选民把怨气算到了「只会喊依法」的你头上。",
            effects: { rep: -1, fac: { base: -8, labor: -6 } } },
          critfail: { body: "你替铁腕吆喝得最响，转头被媒体扒出你自己的办公室也雇着「走后门」的关系——「讲规则的人自己不讲」。",
            effects: { rep: -1.75, fac: { press: -10, base: -8, labor: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "bridge", text: "不谈对错，只替被裁的人争取再就业与补偿",
        base: 0.58, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "你绕开了意识形态的战场，闷头给丢了饭碗的人对接再就业。两边都欠你情，工人尤其记这份实惠。",
            effects: { rep: 1.25, fav: 1, fac: { labor: 8, establishment: 4, base: 5 } } },
          ok: { body: "你没站队，只办了件实事。被裁的人领了你的情，上层也不讨厌你。",
            effects: { rep: 0.6, fac: { labor: 5, base: 3 } } },
          meh: { body: "你想两头兼顾，结果两头都觉得你「光会做事、不敢说话」。",
            effects: { rep: 0.2 } },
          fail: { body: "你的再就业方案慢得像蜗牛，工人等不起，骂你「拿我们做秀」。",
            effects: { rep: -0.8, fac: { labor: -6 } } },
          critfail: { body: "你想两头讨好，方案却因钱不到位黄了。工人说你画饼，上层说你添乱。",
            effects: { rep: -1.25, fac: { labor: -8, establishment: -4 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 3) 放松监管的钱 —— 储贷与地产（投资型，回报走 funMul）
   * ---------------------------------------------------------------------- */
  {
    id: "rg82_snl", grade: "mid", category: "finance",
    valence: "risk", dyn: true,
    era: ["1980_REAGAN"], tierMin: 2, tierMax: 5, weight: 10,
    medium: ["print", "tv"],
    title: "一家「什么都敢贷」的新储贷公司找上门",
    body: "监管松绑后，一批新开的储贷公司开始满世界撒钱：地产、油田、 anything。他们要的是「有个懂政治的人挂个名」。\n" +
      "给你的价码很客气：投一笔，挂个董事，年底分红——如果它没在你分红前先倒下的话。",
    brief: {
      lede: "松绑之后满地是快钱，问题是快钱来得快去得也快，而你的名字一旦挂上去就摘不下来。",
      known: [
        "他们找上你，是因为你这个位子正好能替他们的牌照扫清地方上的障碍——你要的不是这个，你要的是分红。",
        "到这层位子，钱不是问题，问题是这笔钱干不干净、倒不倒。",
        "储贷的钱吸的是普通储户的存款，有联邦担保兜底，一旦崩了，最后要有人替它背。"
      ],
      rumor: [
        "有人说这家公司的账目全是花架子，撑两年就卷款走人。",
        "有人说隔壁州一家一模一样的，去年分红高得吓人，老板如今在迈阿密晒太阳。"
      ],
      unknown: [
        "这场监管狂欢什么时候散场，散场时你的名字会出现在领奖台上还是被告席上。",
        "如果你现在抽身，能不能全身而退，还是连本带名声一起赔进去。"
      ],
      terms: [
        { k: "储贷协会", v: "专门吸收存款、发放房贷的机构。1980 年代监管松绑后大量投机，酿成波及全国的储贷危机。" }
      ]
    },
    choices: [
      {
        id: "invest", text: "投一笔进去挂名董事，赌它崩前落袋",
        note: "投入本金的投机。赌对了盆满钵满，赌输了连本带名声一起埋进这堆监管废墟。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "INT", w: 0.3 }],
        cost: { fun: 3.5 }, req: { fun: 3.5 }, stake: { fun: true },
        outcomes: {
          crit: { body: "你在泡沫顶上及时套了现，一分红到手就辞了董事。别人还在往里冲，你已经坐在岸上数钱。",
            effects: { funMul: 1.6, rep: 0.6, fac: { commercial: 8 } } },
          ok: { body: "分红到账，比存银行强多了。你劝自己见好就收，也确实收了手。",
            effects: { funMul: 0.7, fac: { commercial: 6 } } },
          meh: { body: "你赚了一点点就撤，钱没赔，可心里一直嘀咕自己是不是撤早了。",
            effects: { funMul: 0.2 } },
          fail: { body: "你贪了一下没撤干净，公司说倒就倒，你投进去的大部分打了水漂，还挂了个「董事」的名。",
            effects: { funMul: -0.7, rep: -0.8, flags: ["scandal_1"] } },
          critfail: { body: "储贷崩盘惊动联邦，作为挂名董事的你被追责。「监管放松的钱，最后要纳税人赔」——报道里的每一个字都对着你。",
            effects: { funMul: -1.0, rep: -2.5, fac: { press: -10, commercial: -8, base: -8 }, flags: ["scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "advise", text: "不投钱，只出「政策建议」收顾问费",
        note: "不出本金换稳定收益，风险小，但一样是替投机者开路的把柄。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.45 }],
        outcomes: {
          crit: { body: "你一份「建议放松这块监管」的报告被储贷公司高价采纳，顾问费稳稳入账，你手上干干净净没投一分。",
            effects: { fun: 2.5, lev: 1, fac: { commercial: 6 } } },
          ok: { body: "你收了顾问费替他们说了几句「专业意见」。钱不多，来得稳。",
            effects: { fun: 1.5 } },
          meh: { body: "你提了建议，对方却嫌不够「有用」，只给了个象征性的车马费。",
            effects: { fun: 0.4 } },
          fail: { body: "你替投机者开路的「意见书」被反对手翻出来，标题是「他收了钱替危机铺路」。",
            effects: { rep: -1.25, fac: { press: -8, base: -5 }, flags: ["scandal_1"] } },
          critfail: { body: "崩盘后调查者拿着你的意见书问：是谁指使你替这家骗子公司站台「合规」的。你百口莫辩。",
            effects: { rep: -2, fac: { press: -10, commercial: -6 }, flags: ["scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "walkaway", text: "不沾这摊快钱，劝本地机构别往里冲",
        base: 0.66, mods: [{ src: "attr", key: "INTG", w: 0.45 }],
        outcomes: {
          crit: { body: "你躲过了这场狂欢，还提前预警了几家本地机构。几年后满地狼藉，唯独你和你提醒过的人毫发无损——「这人靠得住」的名声就是这么攒下的。",
            effects: { rep: 1.5, fac: { base: 8, church: 5, commercial: -4 }, flags: ["snl_escaped"] } },
          ok: { body: "你没沾，也没劝动谁。但你自己的账，从头到尾是干净的。",
            effects: { rep: 0.6, fac: { establishment: 3 } } },
          meh: { body: "你躲开了，可眼看别人赚得盆满钵满，你心里多少有点不是滋味。",
            effects: { rep: 0.2 } },
          fail: { body: "你的「别往里冲」扫了想借机发财的同僚的兴，你在小圈子里成了「挡人财路」的那一个。",
            effects: { rep: -0.6, fac: { commercial: -6, establishment: -4 } } },
          critfail: { body: "你劝退了别人，自己却因为一个「朋友」的面子投了一小笔。崩盘时，连这一笔也赔了进去，还落个「双标」。",
            effects: { rep: -1.25, fun: -1.75, fac: { base: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 4) 核冬天里的请愿书 —— 小事（外交/民意）
   * ---------------------------------------------------------------------- */
  {
    id: "rg83_freeze", grade: "minor", category: "foreign",
    valence: "risk", dyn: true,
    era: ["1980_REAGAN"], tierMin: 0, tierMax: 3, weight: 10,
    medium: ["print", "radio", "tv"],
    title: "大学里发起了一份「核冻结」请愿",
    body: "军备竞赛升温，电视上放着「导弹几分钟能到」的模拟画面。大学城发起请愿，要美苏同时冻结核武。\n" +
      "他们收集到了你的选区几千个签名，来请你表个态——支持，是「天真」；反对，是「好战」。",
    brief: {
      lede: "一份关于人类存亡的请愿，被压缩成一道你必须二选一的政治题。",
      known: [
        "他们来找你，是因为你是本地最可能被这事绑上全国的年轻面孔，你的表态会被双方媒体各自引用。",
        "「冻结核武」听起来人畜无害，可它直接顶撞了本时代「以实力求和平」的主基调。",
        "签名的人里有学生，也有把孙子送上航母的母亲。"
      ],
      rumor: [
        "有人说这场运动背后有外国势力资助，正等着政客上钩。",
        "也有人说反对冻结的军工游说，才是真正在给地方选举砸钱的一方。"
      ],
      unknown: [
        "几年后会不会真有一份削减核武的协议，让你今天的表态显得先知或愚蠢。",
        "哪一边更记仇——喊和平的学生，还是造导弹的承包商。"
      ],
      terms: [
        { k: "核冻结", v: "主张美国与苏联同时停止新增核武器的社会运动，1980 年代初席卷欧美校园。" }
      ]
    },
    choices: [
      {
        id: "support", text: "签上名字，公开支持冻结核武",
        note: "回应最广泛的那种恐惧。会被军工与鹰派当成「软弱天真」。",
        base: 0.52, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你签下名字上了本地报，年轻选民和一批忧心忡忡的家长把你当成了「说人话的人」。军工那边记你一账。",
            effects: { rep: 2, fac: { base: 8, foreign: -5, commercial: -4 } } },
          ok: { body: "你表达了反核的立场，基层同情你，上层觉得你不够「硬」。",
            effects: { rep: 0.8, fac: { base: 4 } } },
          meh: { body: "你签了，可这事很快被更新闻盖过去。你既没风光也没挨打。",
            effects: { rep: 0.4 } },
          fail: { body: "对手把你「支持冻结」剪进了一段「他连国防都靠不住」的广告。",
            effects: { rep: -1.5, fac: { military: -6, establishment: -4 } } },
          critfail: { body: "你的签名被做成了「通敌」的暗示满城张贴，你不得不花好几周自证没那么天真。",
            effects: { rep: -2.5, fac: { press: -6, military: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "deter", text: "反对冻结：和平靠实力，不能先自废武功",
        note: "顺着军力与鹰派的胃口说。军工与你靠近，反核的街头会冲你来。",
        base: 0.58, mods: [{ src: "fac", key: "military", w: 0.4 }, { src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你一段「实力才带来和平」的发言被保守派电台反复播放，军工游说第一次主动来约你吃饭。",
            effects: { rep: 1.5, fac: { military: 8, establishment: 6, commercial: 5, base: -4 } } },
          ok: { body: "你站了「硬」的一边，上层满意，街头的学生冲你嘘。",
            effects: { rep: 0.8, fac: { establishment: 5, military: 4 } } },
          meh: { body: "你说了硬话，可核阴影下的选民更想要安慰，你的「实力」没太打动他们。",
            effects: { rep: 0.4, fac: { base: -3 } } },
          fail: { body: "你的「实力」论被反核者做成海报贴满校园，你成了「好战」的本地代表。",
            effects: { rep: -1.5, fac: { base: -6 } } },
          critfail: { body: "就在你高喊扩军时，一桩军工回扣案爆了，你恰好在拿军工的献金。「战争贩子」四个字第一次上了你的门。",
            effects: { rep: -3, fac: { press: -8, base: -8 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "principle", text: "两边都不选：谈「核查、透明、别瞒着人民搞军备」",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你绕开「软不软、战不战」的口号，只谈可核查与透明。这听起来既不像投降也不像好战，反倒显出一种少见的成熟。",
            effects: { rep: 1.5, fac: { establishment: 4, press: 4 } } },
          ok: { body: "你用一个技术性立场躲开了意识形态的坑。谁都没法把你归到对面。",
            effects: { rep: 0.8 } },
          meh: { body: "你的「第三条路」听起来有道理，可激情四射的辩论里没人爱听细则。",
            effects: { rep: 0.4 } },
          fail: { body: "两边都觉得你「不表态」。在这种事上，骑墙就是最响亮的表态。",
            effects: { rep: -1.25, fac: { base: -4, establishment: -3 } } },
          critfail: { body: "你想两头都不沾，结果被对手一句话归了类：「他连怕不怕核战都不敢说」。",
            effects: { rep: -2, fac: { base: -6, press: -3 } } }
        }
      }
    ]
  }
]);

POTUS.define("balance", {
  tagNames: {
    reagan_era: { name: "踩准新时代", desc: "在 1980 浪潮里抢先转向了新多数。", effect: "商业与建制缘你而升，但「墙头草」的旧账随时可能被翻。" },
    old_school: { name: "老派硬骨", desc: "在全党改口时仍替旧议程说话。", effect: "劳工与基层念你的骨气，短期内不太受新当权者待见。" },
    labor_champion: { name: "劳工代言人", desc: "在管制员被集体解雇时公开替工人说话。", effect: "工会长期替你抬桥，商业派系对你设防。" },
    snl_escaped: { name: "躲过泡沫", desc: "没沾松绑后的储贷快钱还预警了别人。", effect: "泡沫破裂后你的清白成了最硬的口碑。" }
  }
});
