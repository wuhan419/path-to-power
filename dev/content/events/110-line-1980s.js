/* ============================================================================
 * CONTENT · events/110-line-1980s.js
 * 连续时间轴 · 1980—1990 定点大事件与事件串。
 *
 * 这是「去时代化」改造的内容主力（见 docs 与 content/21-worldline.js）：
 *   · 不写 era —— 一律用绝对年窗 minYear/maxYear + scoped（分期专属，走 eraWeightMul 加权）。
 *   · 到点必发 —— 每张卡都在本文件末尾的 POTUS.define("fixed", …) 里钉死年、月、量级。
 *   · 事件串 —— 关键节点写成 2～3 幕（前奏→爆发→余波），靠事件自带的 after/flags 续接；
 *     后幕也钉进 fixed，但只有前幕演过（after 成立）才排得出来，否则静默跳过（可断裂的串）。
 *   · 低层级落点 —— 多数大事件给 tierMin:0／1，让刚起步的社区小人物也被历史正面撞上。
 *   · 下行面 —— 错误的选择或坏运气把主角往深渊里推：scandal_N / investigation_open /
 *     fall（下野，还能东山再起）/ hardEnd（入狱、身败名裂，政治生命就此了断）。
 *
 * 铁律（老规矩）：字符串只用「」；每卡至少一个既无 cost 又无 req 的保底选项；
 *   risk 卡要有真实的"稳守不冒进"退路且摆幅够大；boon 卡不写负收益；brief 交代认知边界。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 1981-03 · 里根遇刺未遂 —— 全国震惊的一枪（低层级也能撞上）
   * ==================================================================== */
  {
    id: "rg81_shooting", photo: "era-1981.jpg", grade: "mid", category: "media",
    valence: "risk", dyn: true,
    minYear: 1981, maxYear: 1981, scoped: true, tierRaw: true, tierMin: 0, tierMax: 3, weight: 12, unique: true,
    medium: ["tv", "radio"], month: 3,
    title: "直播里响起枪声，里根总统倒在血泊中",
    body: "离开的车队刚停稳，六枪声从人群里炸开。电视信号切断了正常节目，全国第一次看一场刺杀在直播里发生。\n" +
      "枪手小欣克利很快被按倒。里根总统中弹进医院，而你的电话开始响——本地电视台要你的第一句话。",
    brief: {
      lede: "举国错愕的几个钟头里，每一句脱口而出的话都会被录下来、回放很多年。",
      known: [
        "里根生死未卜，白宫发言人语无伦次，继任传闻已经冒头。",
        "电视台连线就在你面前：他们要「本地民意代表」的即时反应。",
        "你清楚，这个镜头既可能是台阶，也可能是你政治生涯的终点。"
      ],
      rumor: [
        "有人说枪手是冲着女演员朱迪福斯特，与政治无关。",
        "有人说这是对「华盛顿软骨头」的耳光，私下有人拍手。"
      ],
      unknown: [
        "里根会活下来、声望不降反升，无人料到。",
        "你今晚这句话，二十年后会被逐字重播。"
      ],
      terms: [{ k: "直播连线", v: "突发事件中电视实时切入地方政客的采访。" }]
    },
    choices: [
      {
        id: "unity", text: "趁镜头呼吁团结、为总统祈福，不碰任何阴谋论",
        note: "最稳、也最考验分寸：一步到位显得有格局，用力过猛像作秀。",
        base: 0.62, mods: [{ src: "attr", key: "CHA", w: 0.4 }],
        outcomes: {
          crit: { body: "你几句得体的话在电视网被反复引用，被人记住「那种时刻他还稳得住」。", effects: { rep: 1.5, fac: { establishment: 6, base: 5 } } },
          ok: { body: "你说了妥当的祈福与团结，没人挑得出毛病，也没人特别记住你。", effects: { rep: 0.7 } },
          meh: { body: "你的话很平，主持人礼貌地切走了画面。", effects: { rep: 0.2 } },
          fail: { body: "你说得太像念稿，镜头捕捉到你眼珠子乱转的那一秒，本地笑话集当晚就有了素材。", effects: { rep: -0.8, fac: { press: -4 } } },
          critfail: { body: "你紧张之下说错了一句「他早该……」，半句话被剪出来循环播放。", effects: { rep: -1.8, fac: { press: -8, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "strike", text: "借题发挥，把这一幕讲成对现政权的审判",
        note: "赌总统会倒、赌民愤会被点着。赌错，你就是那个在枪声里趁乱咬人的疯子。",
        base: 0.4, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "base", w: 0.25 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你抢先一步把情绪说成了街头共识，激进派把你当成敢讲的人，街头开始替你转发。", effects: { rep: 1.25, fac: { base: 10, establishment: -8 }, voters: { warm: 500 } } },
          ok: { body: "你骂出了部分人的气，也被另一部分人记住了脸。", effects: { rep: 0.4, fac: { base: 6, establishment: -6 }, voters: { warm: 200 } } },
          meh: { body: "没人接你的茬，全国此刻只想让总统活下来。", effects: { rep: -0.2, fac: { establishment: -3 } } },
          fail: { body: "在举国祈福的空气里你唱反调，报纸标题把你写成「趁乱的人」。", effects: { rep: -1.5, fac: { establishment: -10, base: -4 } } },
          critfail: { body: "总统伤愈归来的那天，你那句话还在网上流传。所有人都想起你在枪声里说了什么。", effects: { rep: -2.5, fac: { establishment: -14, press: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "silent", text: "不评论，只把镜头让给医生和家属",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你的克制事后被称赞：那种时刻不抢镜，反倒显得可靠。建制的与教堂的人都记住了你这份分寸。", effects: { rep: 0.8, fac: { establishment: 9, church: 9 } } },
          ok: { body: "你没说错话，也没留下什么。这本身就是一种成绩。", effects: { rep: 0.3 } },
          meh: { body: "记者追着你请你表态，你摇头走开。第二天没人记得这件事里有你。", effects: {} },
          fail: { body: "你的沉默被对手解读成「不敢站队」。", effects: { rep: -0.5, fac: { base: -3 } } },
          critfail: { body: "你躲得过镜头，却躲不过一句「他在总统中弹那天去打了高尔夫」的小报照片。", effects: { rep: -1.4, fac: { press: -6, church: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1982 · 失业潮 —— 战后最惨的冬天（基层视角，tierMin:0）
   * ==================================================================== */
  {
    id: "rg82_unemp", photo: "era-1982.jpg", grade: "mid", category: "civil",
    valence: "bane", dyn: true,
    minYear: 1982, maxYear: 1982, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 12, unique: true,
    medium: ["print", "radio", "tv"], month: 11,
    title: "选区最大的那家厂，贴上了封条",
    body: "利率钉到天上，订单一起蒸发。选区里最老的那家厂关门，几百个你在选举夜握过手的人，一夜之间站在失业登记队伍的冷风里。\n" +
      "全国失业率冲上战后最高点。地方报纸想要一个「替他们说话的人」，市政厅想要一个「别把事闹大的人」。",
    brief: {
      lede: "当饥饿敲上门，温和的字眼听起来像推诿，激烈的手段又可能砸了饭碗。",
      known: [
        "厂说撑不住走了，银行说按市场办事，只几百人没解释。",
        "失业救济要几周才批得下来，中间这几周，人们的餐桌上没有东西。",
        "党部担心闹事上电视，你的选民却只想看见你站到队伍里去。"
      ],
      rumor: [
        "有人说厂子被故意抽干资产，老板早转走了设备。",
        "有人说上面已有秘密纾困方案，只差别闹事。"
      ],
      unknown: [
        "这轮衰退会持续多久，会不会逼出松绑。",
        "你对镜头哭还是砸厂门，十年后见分晓。"
      ],
      terms: [{ k: "失业登记", v: "领失业救济的前置；排队批款常拖很久。" }]
    },
    choices: [
      {
        id: "rally", text: "站到失业队伍最前面，办救济、把火引向厂方与银行",
        note: "基层的怒火烧得最旺，你得当那根烟囱——但烧到谁、烧多大，不由你全控。",
        base: 0.52, mods: [{ src: "fac", key: "base", w: 0.45 }, { src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你带着人逼出了紧急救济，也成了本地「敢挡在别人前面」的名字。工会与街区记你这一份。", effects: { rep: 1.5, fac: { base: 14, labor: 10 }, contact: { union_boss: 8, jackson: 6 }, flags: ["labor_champion"] } },
          ok: { body: "你把事闹到了桌上，钱虽不多，人却领你的情。", effects: { rep: 0.8, fac: { base: 8, labor: 5 }, contact: { union_boss: 4 } } },
          meh: { body: "你来了，可除了几张合影什么也没推动。", effects: { rep: 0.2, fac: { base: 3 } } },
          fail: { body: "你带头堵了厂门，却把想复工的人也一起堵在门外，怨气掉头冲你来。", effects: { rep: -1, fac: { base: -6, establishment: -6 } } },
          critfail: { body: "一场本该和平的集会闹成了打砸，你被指为煽动者。逮捕令在路上，报纸已印好你的照片。", effects: { rep: -2, fac: { establishment: -12, press: -8 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "broker", text: "关起门谈判：拉开发商、争减税，悄悄保岗位不上头条",
        note: "谈得成是实绩，谈不成两边都骂你——而且过程不能见光。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "commercial", w: 0.3 }],
        cost: { fun: 0.5 },
        outcomes: {
          crit: { body: "你悄悄谈回了一批临时岗位，工厂重开门那天，人们以为是市场自己回暖。开发商也把后续项目的赞助记在你名下。", effects: { rep: 1, fun: 3, attr: { INT: 2 }, fac: { commercial: 8, base: 6, establishment: 4 } } },
          ok: { body: "你争到了一点缓冲，不多，但没白忙。金主也愿意留着你这条能谈事的线。", effects: { rep: 0.5, fun: 1, fac: { commercial: 5 } } },
          meh: { body: "你两头跑，最后两头都不领情——事没成，钱也花了。", effects: { rep: 0.1, fun: -0.3 } },
          fail: { body: "谈判崩了，被裁的人后来才知道你收了开发商的饭局。「两边吃」的传闻悄悄传开。", effects: { rep: -1.25, fac: { base: -8, commercial: 4 }, flags: ["scandal_1"] } },
          critfail: { body: "你被拍到和厂方老板称兄道弟，而工人们在下岗名单上。你的名字上了本地头版最下方的小字。", effects: { rep: -2.25, fac: { base: -12, press: -8, commercial: -4 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "hold", text: "不添柴：只喊冷静与信心，劝大家别砸自己的锅",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你的克制避免了事态失控，事后被算成了保住本地信誉的一功。", effects: { rep: 0.7, fac: { establishment: 6, commercial: 4 } } },
          ok: { body: "你没火上浇油。街上的人不满意，但上面的人记得你没闹事。", effects: { rep: 0.1, fac: { establishment: 4 } } },
          meh: { body: "你说了「要有信心」，可信心不顶饭吃，没人把这话当回事。", effects: { rep: -0.2 } },
          fail: { body: "在饿着肚子的街区喊冷静，你成了「不食人间烟火」的活标本。", effects: { rep: -1, fac: { base: -8 } } },
          critfail: { body: "你的一句「他们该自己想办法」被录音播出。那扇门，本地基层从此对你关了。", effects: { rep: -2, fac: { base: -14, labor: -8 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1983-10 · 贝鲁特军营爆炸 —— 战争回到主街（外交/危机）
   * ==================================================================== */
  {
    id: "rg83_beirut", photo: "era-1983.jpg", grade: "mid", category: "foreign",
    valence: "bane", dyn: true,
    minYear: 1983, maxYear: 1983, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 11, unique: true,
    medium: ["tv", "radio"], month: 10,
    title: "凌晨，一辆卡车撞进了驻扎营地",
    body: "贝鲁特的多国部队营地被一辆装满炸药的卡车掀塌，数百名年轻士兵埋在瓦砾下。灵柩运回国的画面，一具接一具爬过电视。\n" +
      "名单里有一个是本州的孩子。他母亲在教堂门口接受采访，问：他们到底为什么死在那里。镜头随后转向你。",
    brief: {
      lede: "一场没人能解释「为什么」的死亡，正变成一道「你支持什么」的必答题。",
      known: [
        "驻守从调停变成靶子，国防部说不清这支部队的命令。",
        "阵亡者里有一个来自你选区，家里只是普通工薪，参军是为了学费。",
        "反战与挺战两拨人都想要你一句话。"
      ],
      rumor: [
        "有人说白宫早就知道营地防不住，只是没人敢下令撤。",
        "有人说这不过是连环爆炸的第一响，后面还有更糟的。"
      ],
      unknown: [
        "这爆炸会把美军逐出黎巴嫩。",
        "你怎么回应那位母亲，会被两边记着。"
      ],
      terms: [{ k: "多国部队", v: "派驻黎巴嫩的维和部队，爆炸后被迫撤离。" }]
    },
    choices: [
      {
        id: "withdraw", text: "要求查清授权、把孩子们带回家",
        note: "顺应那位母亲与反战情绪，但会被扣上「在士兵尸体前认输」的帽子。",
        base: 0.52, mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你成了替那位母亲问话的人。基层与退伍军人家庭记你的直言。", effects: { rep: 1.5, fac: { base: 10, military: -6, church: 6 }, flags: ["old_school"] } },
          ok: { body: "你主张撤军，说得恳切。反战者满意，鹰派记你一账。", effects: { rep: 0.7, fac: { base: 5, military: -5 } } },
          meh: { body: "你喊了撤军，可这件事很快盖过，谁都没真把你归到哪一边。", effects: { rep: 0.2 } },
          fail: { body: "对手把你的「带回家」剪成「他支持投降」。", effects: { rep: -1.25, fac: { military: -8, establishment: -5 } } },
          critfail: { body: "你高喊撤军那天，又传来一起新的袭击。人们不问缘由，只问：是不是你这种人泄了军心。", effects: { rep: -2.25, fac: { military: -12, establishment: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "resolve", text: "呼吁实力与报复：不能让他们白死",
        note: "顺着悲愤与鹰派走，眼下最解气；风险是这口气不知该往哪使。",
        base: 0.5, mods: [{ src: "fac", key: "military", w: 0.4 }, { src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你一句「以实力回应」被保守电台反复播放，军界与建制第一次把你当自己人。", effects: { rep: 1.25, fac: { military: 10, establishment: 6, base: -4 } } },
          ok: { body: "你站了强硬的一边，上层满意，反战的街头嘘你。", effects: { rep: 0.6, fac: { military: 6, establishment: 4 } } },
          meh: { body: "你说了狠话，可没人为一句狠话改派一支军队。", effects: { rep: 0.2, fac: { military: 3 } } },
          fail: { body: "那位阵亡士兵的母亲在报上公开说你「拿我儿子的死做文章」。", effects: { rep: -1.25, fac: { base: -8, church: -6 } } },
          critfail: { body: "报复升级，又一队人被派了出去，再没回来。你的名字和「送更多孩子去死」被写在同一张海报上。", effects: { rep: -2.5, fac: { base: -12, press: -8, church: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "grieve", text: "不谈战略，只陪那家人办完一场葬礼",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.45 }],
        outcomes: {
          crit: { body: "你没讲一句大道理，只是站在教堂门口陪到最后一刻。本地小报拍下了这一幕。", effects: { rep: 1, fac: { base: 6, church: 8 } } },
          ok: { body: "你送了花圈、讲了悼词，得体而克制。", effects: { rep: 0.5, fac: { church: 4 } } },
          meh: { body: "你来了，站了一会儿就走了。谁也没说什么，也没记住什么。", effects: { rep: 0.1 } },
          fail: { body: "你在葬礼上被拍到低头看表。「他赶场」三个字第二天上了报。", effects: { rep: -1, fac: { base: -6, church: -5 } } },
          critfail: { body: "你本想蹭个体面，却被家属当场请了出去。那一幕比任何丑闻都难洗。", effects: { rep: -2, fac: { base: -10, press: -8 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1985-09 · 广场协议 —— 美元一夜转向（金融/贸易，中高层）
   * ==================================================================== */
  {
    id: "rg85_plaza", grade: "mid", category: "finance",
    valence: "risk", dyn: true,
    minYear: 1985, maxYear: 1985, scoped: true, tierRaw: true, tierMin: 2, tierMax: 6, weight: 11, unique: true,
    medium: ["print", "tv"], month: 9,
    title: "五国财长关起门，把美元按了下去",
    body: "主要工业国在广场饭店密谋联合干预，让美元对日元、马克大幅贬值，去填美国的贸易窟窿。消息一出，汇市与出口板块天翻地覆。\n" +
      "本地的工厂主与农户各有各的算盘：有人指望出口翻身，有人担心进口货冲垮门面。他们都来敲你的门。",
    brief: {
      lede: "一场在异国酒店关起门定下的汇率转向，账单与红利最后都落在你选区的车间和田里。",
      known: [
        "美元要贬，出口理论上更划算，可手头的进口原料也会变贵。",
        "本地靠出口的大厂想拉你站台，靠进口的小厂怕被挤垮。",
        "上面把这叫「有序调整」，市面管这叫「美国不再说了算」。"
      ],
      rumor: [
        "这只是给日本开的第一张支票，还要它买国债。",
        "汇市操盘手早几个月就知风声，钱被提前赚走。"
      ],
      unknown: [
        "这次转向会催生日本资产狂潮。",
        "你今天替谁背书，三年后汇率会找上门。"
      ],
      terms: [{ k: "广场协议", v: "五国联合压低美元，催生了日本泡沫。" }]
    },
    choices: [
      {
        id: "export", text: "为出口与制造背书，替本地大厂站台",
        note: "站对是「懂经济」，站错是被指为替大企业牺牲消费者。",
        base: 0.55, mods: [{ src: "fac", key: "commercial", w: 0.4 }, { src: "attr", key: "INT", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "贬值真带来了订单，本地厂扩了工，你把这算成自己「看得懂大势」的功劳。", effects: { rep: 1.25, fac: { commercial: 10, labor: 4, base: 4 } } },
          ok: { body: "出口确实回暖，你搭上了这班顺风车。", effects: { rep: 0.6, fac: { commercial: 6 } } },
          meh: { body: "你站了台，可汇市的涨跌和你的站台关系不大。", effects: { rep: 0.2 } },
          fail: { body: "进口零件涨价压垮了本地小厂，它们把账算到你替大厂背书头上。", effects: { rep: -1.25, fac: { base: -6, commercial: 4 } } },
          critfail: { body: "你收了大厂的好处替它摇旗，正赶上「美国把工作交给汇率」的民怨爆发。你的名字上了工会的批评名单。", effects: { rep: -2.25, fac: { base: -10, labor: -8, press: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "worker", text: "替被挤垮的小厂与进口竞争者争缓冲与转岗",
        base: 0.55, mods: [{ src: "fac", key: "labor", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你为两头受损的小厂争到一笔转岗金，工人和企业主都觉得你公道。", effects: { rep: 1.25, fac: { labor: 8, base: 8, establishment: 3 } } },
          ok: { body: "你替被冲击的一方说了话，钱不算多但意思到了。", effects: { rep: 0.6, fac: { labor: 5, base: 3 } } },
          meh: { body: "你两头照顾，谁都觉得你说了该说的，也都没真沾光。", effects: { rep: 0.2 } },
          fail: { body: "大厂骂你「只会挡出口」，你的转岗方案也被嫌太慢。", effects: { rep: -1, fac: { commercial: -8 } } },
          critfail: { body: "缓冲金因程序卡住发不下来，工人骂你画饼，大厂笑你无能——两头都不是人。", effects: { rep: -2, fac: { commercial: -8, labor: -6, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "neutral", text: "不评判汇率对错，只谈「把本地工人的账算清楚」",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你避开宏大的口水仗，只做了一份扎实的本地影响评估，媒体难得夸你「懂行」。", effects: { rep: 0.9, fac: { establishment: 5, press: 4 } } },
          ok: { body: "你用一个技术活躲开了站队的坑。安全，也算专业。", effects: { rep: 0.4 } },
          meh: { body: "你的报告没人细看，你也没落到任何一边。", effects: { rep: 0.1 } },
          fail: { body: "「不站队」被两边都读成「没立场」。", effects: { rep: -0.6, fac: { base: -4 } } },
          critfail: { body: "你谁也没得罪，也谁也没护住。事后被问「广场协议那年你在干什么」，你答不上来。", effects: { rep: -1.25, fac: { establishment: -4, labor: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1986-01 · 挑战者号 —— 升空七秒（国家哀悼，低层级落点）
   * ==================================================================== */
  {
    id: "rg86_challenger", photo: "rg86_challenger.jpg", grade: "mid", category: "general",
    valence: "risk", dyn: true,
    minYear: 1986, maxYear: 1986, scoped: true, tierRaw: true, tierMin: 0, tierMax: 3, weight: 11, unique: true,
    medium: ["tv", "radio"], month: 1,
    title: "全国的孩子都在教室里看着它升空",
    body: "发射因天气推迟过一次，终于在一个晴朗的早晨升空。七十三秒后，天空裂成一团白烟。舱里有一位小学教师麦考利夫，全国的孩子本来在直播里看她上课。\n" +
      "学校停课，家长们不知所措，你所在社区的学校董事会希望有人出来说句话。",
    brief: {
      lede: "一场当着全体孩子面的死亡，把「怎么解释」这道题抛给了每一个大人。",
      known: [
        "原因未查清，NASA 口径混乱，O 形环传闻在传。",
        "社区里有遇难教师麦考利夫的亲属，孩子的同学整天不愿进教室。",
        "学校董事会想要一个既有分量又不出错的声音，想到了你。"
      ],
      rumor: [
        "有人说这是官僚的赶工酿成的，早有人发过警告邮件。",
        "有人说太空计划要停摆几年，本地承包商日子难过。"
      ],
      unknown: [
        "调查结论会动摇公众对政府的信任。",
        "你怎么对孩子讲话，会被他们记一辈子。"
      ],
      terms: [{ k: "挑战者号", v: "航天飞机升空 73 秒后解体，七人遇难。" }]
    },
    choices: [
      {
        id: "comfort", text: "到学校去，陪孩子们把这件事说开",
        note: "面对孩子最见功力：说重了吓人，说轻了敷衍。",
        base: 0.62, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你在教室里说的那番话，后来被本地报纸整版引用，人们说「那种时刻他让孩子们安心了」。", effects: { rep: 1.25, fac: { base: 8, church: 6 } } },
          ok: { body: "你讲了得体的悼词，孩子们记住了你。", effects: { rep: 0.6, fac: { base: 5 } } },
          meh: { body: "你去了，说了几句，气氛慢慢缓过来。没人特别记住。", effects: { rep: 0.2 } },
          fail: { body: "你的一句「太空还是要继续」被读成「不把人命当回事」。", effects: { rep: -1, fac: { base: -6 } } },
          critfail: { body: "你想把悲伤变成自己的政绩，被家长当场质问「你今天是来讲话还是来拉票」。", effects: { rep: -2, fac: { base: -10, press: -6, church: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "probe", text: "顺势追问：NASA 到底有没有忽视警告",
        note: "在举国哀恸里当那个谈「责任」的人——有人赞你清醒，有人骂你冷血。",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "press", w: 0.25 }],
        outcomes: {
          crit: { body: "你提前点出赶工的问题，媒体开始把你当「会盯 O 形环的那个人」。", effects: { rep: 1.25, attr: { INT: 2 }, fac: { press: 8, establishment: -6, base: 4 } } },
          ok: { body: "你呼吁彻查，说得在理，只是时机显得有点急。", effects: { rep: 0.5, attr: { INT: 1 }, fac: { press: 5 } } },
          meh: { body: "你提了调查，可全国此刻只想哭，不想追责。", effects: { rep: 0.1 } },
          fail: { body: "在丧礼的空气里谈问责，你被说成「拿遇难者出头」。", effects: { rep: -1.25, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "你的追查戳到了本地航天承包商，他们反手捐给你的对手一大笔，还放话你「只会砸本地饭碗」。", effects: { rep: -2, fac: { commercial: -8, base: -6, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "lowkey", text: "此刻少说话：只发一封简短慰问，把话筒让给家属",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你的克制被称赞：那种举国悲恸时不抢镜，反倒留下稳重的印象。", effects: { rep: 0.7, attr: { INTG: 2 }, fac: { establishment: 4, church: 4 } } },
          ok: { body: "你低调慰问，没出任何错，也没留下什么。", effects: { rep: 0.3, attr: { INTG: 1 } } },
          meh: { body: "你躲过了镜头，也躲过了所有人的记忆。", effects: {} },
          fail: { body: "有人说连这种事你都不肯出头，是不是太惜身。", effects: { rep: -0.5, fac: { base: -3 } } },
          critfail: { body: "你本想避风头，却被拍到同一天你在剪彩一家商场。「别人家的孩子在看天上掉下来的人，你在剪彩」——配图杀伤力十足。", effects: { rep: -1.8, fac: { base: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1986→1987 · 伊朗门事件串（前奏 → 爆发 → 余波）——三幕固定链
   *   靠 after/flags 续接：只有前幕演过，后幕才排得出（可断裂的串）。
   * ==================================================================== */
  {
    id: "rg86_iran_open", photo: "era-1986.jpg", grade: "mid", category: "foreign",
    valence: "risk", dyn: true,
    minYear: 1986, maxYear: 1986, scoped: true, tierRaw: true, tierMin: 2, tierMax: 5, weight: 12, unique: true,
    medium: ["print", "tv", "radio"], month: 11,
    title: "一条不该存在的渠道，递到你面前",
    body: "有人秘密向对手卖武器，好换人质获释；卖武器的钱，又绕道去资助别处一支不许国会出钱的武装。这条链子的每一环都「不方便留痕」。\n" +
      "一位旧同僚试探你：本地有没有一条「不用走账面」的路，替这事搭把手。搭好了是新朝功臣，搭砸了是联邦被告。",
    brief: {
      lede: "一件「上面要你办、但谁都不肯写下来」的差事。答应就是把名字签在一枚未爆弹上。",
      known: [
        "这事若属实，绕开了国会的拨款禁令——本身就悬在违法边缘。",
        "旧同僚只给你一句口信，没有任何文件、没有任何签字。",
        "你若应下来，事发时头一个被问的就是你这个中间人。"
      ],
      rumor: [
        "有人说人质那边确实有进展，这渠道在悄悄起作用。",
        "也有人说钱根本没去该去的地方，早被几个掮客中饱了。"
      ],
      unknown: [
        "这会演成动摇整个白宫的大调查。",
        "功劳是暗的，责任却明晃晃等人来查。"
      ],
      terms: [{ k: "伊朗门", v: "秘密卖武伊朗、以所得援尼加拉瓜的丑闻。" }]
    },
    choices: [
      {
        id: "join", text: "接下这条线，替它跑一趟「不留痕」的腿",
        note: "赌这事成、且永远查不到你头上。赌对了是新朝的红人，赌错了是档案里的替罪羊。",
        base: 0.42, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "fac", key: "establishment", w: 0.3 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你办得干净利落，人不知鬼不觉，上面记住了「这人在最难办的事上靠得住」。", effects: { rep: 0.6, lev: 1, fac: { establishment: 12, agency: 8 }, flags: ["iran_touched"] } },
          ok: { body: "你跑通了这一趟，拿到了实权和一条暗线，也背上了一份不能见光的账。", effects: { rep: 0.3, lev: 1, fac: { establishment: 8 }, flags: ["iran_touched"] } },
          meh: { body: "你把事办了，可整个过程让你夜不能寐，你开始后悔沾手。", effects: { rep: 0, flags: ["iran_touched"] } },
          fail: { body: "链条在别处断了，你的名字却出现在一份「中间人清单」的边角。有人开始盯着你。", effects: { rep: -0.8, fac: { establishment: -4, agency: -6 }, flags: ["iran_touched", "scandal_1"] } },
          critfail: { body: "你这一趟被人当场撞见，成了唯一没有官方掩护的人。调查一旦启动，你首当其冲。", effects: { rep: -1.75, fac: { establishment: -10, agency: -10 }, flags: ["iran_touched", "investigation_open", "scandal_2"] } }
        }
      },
      {
        id: "watch", text: "收下这个人情线索，但绝不亲自经手",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你留了个「知道内情却未沾手」的位置，日后无论谁倒下你都能全身而退，也把这条暗线攥在了自己手里。", effects: { rep: 0.6, lev: 1, attr: { INT: 2 }, fac: { establishment: 4 } } },
          ok: { body: "你没沾手，却拿到了几分先机信息，够你审时度势。", effects: { rep: 0.3, attr: { INT: 1 } } },
          meh: { body: "你什么都知道一点，却什么也决定不了。", effects: {} },
          fail: { body: "你既没帮忙也没拒绝得干净，两头都觉得你「神神秘秘」。", effects: { rep: -0.5, fac: { establishment: -3 } } },
          critfail: { body: "你本想留一手，结果被当成知情不报的一员。事后追责，你说不清自己究竟知不知道。", effects: { rep: -1.4, fac: { press: -6, agency: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "refuse", text: "把门关上：这事我不碰，也劝你别在我面前提",
        note: "最干净，也得罪可能正要借这条路上位的人。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.45 }],
        outcomes: {
          crit: { body: "你躲过了整场风暴，多年后「他早就抽身」成了你清白的注脚。", effects: { rep: 1, fac: { establishment: -2, church: 4, base: 4 }, flags: ["iran_refused"] } },
          ok: { body: "你没沾这摊浑水。短期内可能得罪几个人，但账上干净。", effects: { rep: 0.4 } },
          meh: { body: "你拒了，风平浪静，没人记得你拒过。", effects: {} },
          fail: { body: "你拒得太直白，传到了正想借这条路上位的人耳朵里，你多了个暗敌。", effects: { rep: -0.4, fac: { establishment: -5 } } },
          critfail: { body: "你不仅拒了，还差点嚷出去。这条线的人联手把你排出了本地的核心圈子。", effects: { rep: -1, fac: { establishment: -10, agency: -6 }, flags: ["iran_refused"] } }
        }
      }
    ]
  },
  {
    id: "rg87_iran_hearings", photo: "rg87_iran_hearings.jpg", grade: "major", category: "scandal",
    valence: "bane", dyn: true,
    minYear: 1987, maxYear: 1987, scoped: true, tierRaw: true, tierMin: 2, tierMax: 6, weight: 14, unique: true,
    medium: ["tv", "print"], month: 7,
    after: { id: "rg86_iran_open", minMonthsAfter: 3 },
    title: "全国直播的听证席上，轮到你说清楚",
    body: "丑闻彻底爆了：秘密售武、绕开国会、资金流向另一场不许打的仗，一环环被摊到阳光下，听证会全程电视直播，全国收视率压过橄榄球。\n" +
      "你当年在这条链上站过的位置——不管多边缘——现在都被律师和记者一字一句地重翻。这一次，你必须当面回答。",
    brief: {
      lede: "当年一笔「不留痕」的账，如今要你在镜头前一环一环地补上说法。",
      known: [
        "你已经上了相关证人名单，媒体在猜你会「交代」还是会「扛住」。",
        "你手上那点当年的往来，如今既可能是护身符，也可能是绞索。",
        "全国都在看：一个地方人物怎么面对一桩全国丑闻。"
      ],
      rumor: [
        "有人说核心人物开始互相指认，抢先交代的换轻判。",
        "也有人说这案子最后会不了了之，扛过镜头就是赢家。"
      ],
      unknown: [
        "特别检察官会一路查到白宫最高层。",
        "你一个字，就可能保住或葬送政治生命。"
      ],
      terms: [{ k: "听证直播", v: "国会开、全国直播的取证听证会。" }]
    },
    choices: [
      {
        id: "fess", text: "坦白从宽：把当年被动的角色讲清楚，配合调查",
        note: "赌坦诚换来轻判与「至少没撒谎」的名声；代价是永远背着一页不光彩。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.45 }],
        outcomes: {
          crit: { body: "你坦诚得体，只被训诫了事。「他没撒大谎」让不少人愿意再给你一次机会。", effects: { rep: 0.7, fac: { press: 6, establishment: -4 }, flags: ["iran_fessed"] } },
          ok: { body: "你交了底，挨了骂但没进档案上的黑名单，政治生命保住了。", effects: { rep: -0.2, flags: ["iran_fessed"] } },
          meh: { body: "你的坦白不痛不痒，媒体觉得你没说多少新东西。", effects: { rep: -0.4 } },
          fail: { body: "你想大事化小，却被追问得前后矛盾，「他在撒谎」上了标题。", effects: { rep: -1.5, fac: { press: -8 }, flags: ["scandal_2"] } },
          critfail: { body: "你越描越黑，一句伪证坐实。调查者不再问「你做了什么」，改问「你还撒了哪些谎」。", effects: { rep: -2.5, fac: { press: -10, establishment: -8 }, flags: ["investigation_open", "scandal_3"] } }
        }
      },
      {
        id: "stone", text: "一字不认：咬定毫不知情，把一切推给「他们没告诉我」",
        note: "赌没人能把你钉在链条上。赌对了全身而退，赌错了就是伪证。",
        base: 0.38, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "你在镜头前滴水不漏，全国观众里有不少人被你的镇定说动。档案里没留下你的硬伤。", effects: { rep: 1.5, fac: { establishment: 8, base: 4 } } },
          ok: { body: "你守住了口风，没被钉死，可疑点从此一直挂在你名下。", effects: { rep: 0.3, flags: ["iran_deny"] } },
          meh: { body: "你的否认平淡无力，信的人不多，怀疑的人不少。", effects: { rep: -0.4, flags: ["iran_deny"] } },
          fail: { body: "一份你签过字的旧电报被甩到桌上，你当场的慌乱被全国看见。", effects: { rep: -2, fac: { press: -10, establishment: -6 }, flags: ["scandal_2", "investigation_open"] } },
          critfail: { body: "伪证与妨碍调查坐实。为保全自己你撒的谎，如今成了把你送进去的那份罪状。", effects: { rep: -3, fac: { press: -12, establishment: -10, base: -6 }, hardEnd: "prison" } }
        }
      },
      {
        id: "resign", text: "主动退出本地一切要职，先止损、避开锋芒",
        base: 0.55, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你以退为进，主动让位换来了「知进退」的余地，日后可东山再起。", effects: { rep: 0.4, fac: { establishment: 3 }, fall: 1 } },
          ok: { body: "你抽身而出，风头过后仍留着体面回来的路。", effects: { rep: 0, fall: 1 } },
          meh: { body: "你退了，可该来的调查一样来，退让没换来豁免。", effects: { rep: -0.5, fall: 1 } },
          fail: { body: "你的退被读成「做贼心虚」。躲了镜头，没躲过定性。", effects: { rep: -1.25, fall: 1, flags: ["scandal_1"] } },
          critfail: { body: "你以为让位就能了断，可你的位置恰恰是别人急着交出去的人。退都没让你退干净。", effects: { rep: -2, fall: 2, flags: ["scandal_2", "investigation_open"] } }
        }
      }
    ]
  },
  {
    id: "rg89_iran_after", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 1988, maxYear: 1989, scoped: true, tierRaw: true, tierMin: 2, tierMax: 6, weight: 11, unique: true,
    medium: ["print", "tv"], month: 3,
    after: { id: "rg87_iran_hearings", minMonthsAfter: 6 },
    title: "风头过后，本地重新审视你这个上过听证席的人",
    body: "听证落幕、定罪与赦免交替登场，这桩丑闻渐渐并入「那个年代的一段插曲」。可对你的清算并未结束——本地要重新决定：还愿不愿意跟一个「上过听证席的人」共事。",
    brief: {
      lede: "全国已经翻篇，你的选区还没。这一回，是你自己去敲门问一句「还能不能算我一个」。",
      known: [
        "丑闻的核心人物或被轻判或被宽免，是非在公众眼里已相当模糊。",
        "你在链上的边缘角色，本地人心里有数，却没人先松口。",
        "党机器正重新洗牌，你上一次的表态会被拿来做今天的价码。"
      ],
      rumor: [
        "有人说上面准备发一批宽免，被牵连的很快能露面。",
        "也有说你这种边缘角色没人护，出事第一个被推。"
      ],
      unknown: [
        "历史会淡化，你本地的账却要现在结。",
        "赌的是人心多久会忘——忘了你便清白。"
      ],
      terms: [{ k: "宽免", v: "总统对已定罪或待定罪者的赦免。" }]
    },
    choices: [
      {
        id: "return", text: "高调复出：把听证经历讲成「我守住了底线」的故事",
        note: "赌时间已经站在你这边。讲得好是韧性，讲得早是厚颜。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.45 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你抢在清算淡去前翻身，把一页尴尬讲成了坚定，许多人竟真信了。", effects: { rep: 1.25, tier: 1, fac: { base: 6, establishment: 4 } } },
          ok: { body: "你慢慢回到牌桌上，旧账没人再当面提。", effects: { rep: 0.6 } },
          meh: { body: "你回来了，可每次介绍都要多一句「当年那件事……」。", effects: { rep: 0.1 } },
          fail: { body: "你复出太急，被反问「你哪来的脸」，舆论重新翻出旧页。", effects: { rep: -1.25, fac: { press: -6 } } },
          critfail: { body: "你越急着翻篇，越显得心里有鬼。旧账被对手重新裱好挂上墙上。", effects: { rep: -2, fac: { press: -8, establishment: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "layback", text: "再蛰伏一阵，从最基层的会务悄悄做起",
        base: 0.58, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你低到尘埃里做事，几年后人们说「那件事没把他压垮，反倒踏实了」。", effects: { rep: 0.8, fac: { base: 6, establishment: 3 }, flags: ["iran_survivor"] } },
          ok: { body: "你熬过了风头，一点点把信任攒了回来。", effects: { rep: 0.4, flags: ["iran_survivor"] } },
          meh: { body: "你蛰伏着，既没出局也没人想起你。", effects: {} },
          fail: { body: "你蛰伏太久，错过了重新洗牌的窗口，被彻底晾在了一边。", effects: { rep: -0.6, fac: { establishment: -4 } } },
          critfail: { body: "你以为躲着就好，可党机器重组时顺手把你从名单上划了去——没人替你留位置。", effects: { rep: -1.4, fac: { establishment: -8, base: -4 }, fall: 1 } }
        }
      },
      {
        id: "flip", text: "反过来：公开把这桩丑闻痛批一番，与过去彻底切割",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "你把自己从「链上的人」改写成「看穿它的人」，竟真骗过了不少选民，新面孔开始聚到你这边。", effects: { rep: 1, voters: { warm: 500 }, fac: { base: 6, establishment: -4 } } },
          ok: { body: "你和旧账划清了界限，至少面上没人再牵扯你。", effects: { rep: 0.4, voters: { warm: 150 } } },
          meh: { body: "你的痛批说得没底气，谁都知道你也曾在那条线上。", effects: { rep: 0 } },
          fail: { body: "你反咬旧日同僚，被指「叛徒」，圈子两头都不再信你。", effects: { rep: -1.25, fac: { establishment: -8 } } },
          critfail: { body: "你切割太狠，把知情人的嘴一起得罪了。有人决定，要让你说清楚那年究竟做了什么。", effects: { rep: -2, fac: { establishment: -10, press: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "mentor", text: "请奥尼尔替你背一句书：「那孩子守得住底线」",
        note: "只有 1980 年你没跟着浪潮跑、留在原队伍时，才会结识这位铁了心的众议院议长。八年前那份「没跑」，如今换成他为你打的一个电话——可他的面子也有限，用一次少一次。",
        req: { contact: "oneill" },
        base: 0.46, mods: [{ src: "fac", key: "establishment", w: 0.35 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "众议院议长奥尼尔只打了一个电话。第二天，本地党机器里最会看风向的人主动约你吃饭——「上面说你还行」。一页尴尬被人脉轻轻翻了过去。", effects: { rep: 1.25, fac: { establishment: 10, base: 4 }, contact: { oneill: 3 }, flags: ["iran_survivor"] } },
          ok: { body: "他替你说了话，清算的调门当场低了一截。人情记在他账上，你也记在自己心里。", effects: { rep: 0.6, fac: { establishment: 6 }, contact: { oneill: 2 } } },
          meh: { body: "他的话还剩几分分量，不多，但够让门口那些人对你客气一点。", effects: { rep: 0.2 } },
          fail: { body: "一个退了位的议长开口护人，反倒被看成「他还在那条线上」。你借的光，成了别人指你的证据。", effects: { rep: -1.2, fac: { press: -6, establishment: -5 }, contact: { oneill: -4 } } },
          critfail: { body: "你想借旧权威脱身，可他的旧账本身就成了靶子——你们两个被一并写进了同一篇「那个年代的人脉网」。", effects: { rep: -2.2, fac: { press: -10, establishment: -8 }, contact: { oneill: -8 }, flags: ["scandal_1", "investigation_open"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1987-10 · 黑色星期一 —— 一天跌掉两成（金融/危机，下行面）
   * ==================================================================== */
  {
    id: "rg87_monday", photo: "rg87_monday.jpg", grade: "major", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 1987, maxYear: 1987, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "print", "radio"], month: 10,
    title: "道琼斯一天蒸发两成，没人接电话",
    body: "开盘即雪崩，一天之内全球财富以万亿计地消失，交易大厅里有人当场崩溃。恐慌顺着电话线爬进每一个选区的养老金与共同基金账户。\n" +
      "你的电话被打爆：丢了半辈子积蓄的选民在问，作为「管钱的那个人」，你到底知不知道发生了什么。",
    brief: {
      lede: "市场不讲情面，也不认你的资历；崩盘当天，公众只想要一个能让他们不砸柜台的人。",
      known: [
        "崩盘来得毫无征兆，监管者自己也解释不清原因。",
        "本地不少选民把养老钱投进基金，这跌砍了退休指望。",
        "你选区有家券商和银行，都在等「上面有人」发话稳局。"
      ],
      rumor: [
        "有人说这只是一个技术性回调，下周就能涨回来。",
        "有人说是程序化交易与日元引爆的，大萧条开头。"
      ],
      unknown: [
        "央行会迅速注资，市场几天内企稳。",
        "你此刻镇定还是失态，会被记很久。"
      ],
      terms: [{ k: "黑色星期一", v: "全球股市单日暴跌的标志性崩盘。" }]
    },
    choices: [
      {
        id: "steady", text: "出来稳人心：劝大家别在恐慌里砸盘，守住养老金",
        note: "赌你说的是对的、且大家会信。稳住了是功臣，被证明外行是笑话。",
        base: 0.52, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "commercial", w: 0.2 }],
        outcomes: {
          crit: { body: "市场果然几天内回稳，你「泰山崩于前而色不变」的那番话成了本地美谈。", effects: { rep: 1.5, tier: 1, fac: { establishment: 6, commercial: 8, base: 4 } } },
          ok: { body: "你的镇定起了作用，挤兑没发生，人们记住了你没乱。", effects: { rep: 0.7, fac: { commercial: 5, establishment: 3 } } },
          meh: { body: "你说了稳住的话，涨跌照旧，但好歹没添乱。", effects: { rep: 0.2 } },
          fail: { body: "第二天接着跌，你「别慌」的话成了笑话，人们说你懂个市场的盘。", effects: { rep: -1.25, fac: { press: -6, commercial: -4 } } },
          critfail: { body: "你劝人守住的正是继续暴跌的那只，几个老人因此赔光积蓄上了本地报。「外行充内行」的帽子很难摘。", effects: { rep: -2.5, fac: { base: -10, press: -8, commercial: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "blame", text: "顺势把火引向「华尔街的贪婪与失控」",
        note: "把民怨往最招人恨的一方引。讨巧，也彻底得罪金主。",
        base: 0.5, mods: [{ src: "fac", key: "base", w: 0.45 }],
        outcomes: {
          crit: { body: "你替赔了钱的选民出了口恶气，基层把你当「替普通人说话的人」。", effects: { rep: 1.25, voters: { warm: 600 }, fac: { base: 12, labor: 6, commercial: -10 } } },
          ok: { body: "你骂了华尔街，穷人解气，金主记仇。", effects: { rep: 0.5, voters: { warm: 200 }, fac: { base: 6, commercial: -6 } } },
          meh: { body: "你跟着骂了两句，谁都没太往心里去。", effects: { rep: 0.1 } },
          fail: { body: "本地券商和银行正是你的金主，你这一骂把票仓也骂毛了。", effects: { rep: -1, fun: -0.8, fac: { commercial: -10 } } },
          critfail: { body: "你高调反华尔街，可金主们撤资后你的机器当场停摆，基层也看穿你「骂人是做戏」。", effects: { rep: -2, fun: -1.5, fac: { commercial: -12, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "quiet", text: "不懂装懂不如闭嘴：只承诺监督，绝不预测涨跌",
        base: 0.58, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你坦诚承认外行、只谈监督，反被夸「比那些瞎指挥的诚实」。", effects: { rep: 0.8, fac: { establishment: 4, press: 3 } } },
          ok: { body: "你说了稳妥的场面话，没出丑也没出彩。", effects: { rep: 0.3 } },
          meh: { body: "你选择沉默，风头里没人注意到你，这有时就是最优解。", effects: {} },
          fail: { body: "所有人都被烫得想找人说话，只有你躲着，「关键时刻不在」被记了一笔。", effects: { rep: -0.7, fac: { base: -4 } } },
          critfail: { body: "你的「只监督不表态」被两头解读：金主觉得你冷漠，选民觉得你滑头。", effects: { rep: -1.4, fac: { base: -6, commercial: -5 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1989-11 · 柏林墙倒塌 —— 历史馈赠的机遇面（boon）
   * ==================================================================== */
  {
    id: "rg89_berlin", photo: "era-1989.jpg", grade: "major", category: "foreign",
    valence: "boon", dyn: true,
    minYear: 1989, maxYear: 1989, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "print"], month: 11,
    title: "一堵墙，在一夜之间被普通人凿穿",
    body: "一道误传的通告，让检查站涌入人山人海，守卫不知所措，墙在欢呼里被凿开。四十年的分裂，一个夜晚开始松土。全球直播，香槟、锤子和拥抱。\n" +
      "这一刻，「冷战还能撑多久」忽然成了人人都想抢着回答的问题。你的社区里有东欧移民的后代，他们激动得彻夜敲门。",
    brief: {
      lede: "一块天赐的舞台：这是少数几个「只要站着、说人话」就能被历史照亮的时刻。",
      known: [
        "墙在被拆，两德合并已不可逆，但节奏与欧洲反应未定。",
        "本地东欧裔社区情绪高涨，把你当成「懂他们」的现成面孔。",
        "电视台在找各地的「反应镜头」，机会明晃晃摆在那里。"
      ],
      rumor: [
        "有人说苏联会像往年派坦克回场，欢庆转眼成血。",
        "也有人说这一切不过是表演，铁幕背后的人还在掌权。"
      ],
      unknown: [
        "苏联两年内解体，胜利叙事定义一代人。",
        "谁在这节点说对话，就被焊进这段历史。"
      ],
      terms: [{ k: "柏林墙", v: "隔开东西柏林的边墙，1989 年被开放。" }]
    },
    choices: [
      {
        id: "historic", text: "去东欧裔社区，和他们一起为自由守夜、讲一段能被记住的话",
        base: 0.7, mods: [{ src: "attr", key: "CHA", w: 0.4 }],
        outcomes: {
          crit: { body: "你的话被剪进了本地台对这一夜的报道，人们把这个伟大时刻和你的脸放在一起。", effects: { rep: 2, tier: 1, fac: { base: 10, establishment: 6, church: 5 } } },
          ok: { body: "你和社区一起守了夜，气氛里全是希望，你也沾了这份光。", effects: { rep: 1.2, fac: { base: 6, establishment: 3 } } },
          meh: { body: "你去了，说了几句应景的话，历史太响，没人听清你说什么。", effects: { rep: 0.5 } },
          fail: { body: "你的话被现场的欢庆淹没，第二天没人记得那一夜你也在场。", effects: { rep: 0.1 } },
          critfail: { body: "你想借光，却被激动的移民质疑「你平时可没把我们当回事」，当场冷了脸。", effects: { rep: 0, fac: { base: -2 } } }
        }
      },
      {
        id: "vision", text: "把镜头拉远：谈一个「没有铁幕的欧洲」该往哪走",
        base: 0.65, mods: [{ src: "attr", key: "INT", w: 0.45 }],
        outcomes: {
          crit: { body: "你的远景分析被更高层的人注意到，「这人看得到十年后」的说法开始流传。", effects: { rep: 1.5, attr: { INT: 3 }, tier: 1, fac: { establishment: 8, press: 5 } } },
          ok: { body: "你讲了格局，显得有分量，虽然暂时没人接你的话头。", effects: { rep: 0.8, attr: { INT: 1 }, fac: { establishment: 4 } } },
          meh: { body: "你讲了大道理，可全国只想庆祝，不想听规划。", effects: { rep: 0.4 } },
          fail: { body: "在举国欢呼时你冷静谈「往后」，显得不合时宜，被人嫌你扫兴。", effects: { rep: 0.1, fac: { press: -2 } } },
          critfail: { body: "你的一套宏大规划被截成「他怀疑这一切会不会成真」的引语，两边都不爱听。", effects: { rep: 0, fac: { base: -2, establishment: -2 } } }
        }
      },
      {
        id: "simply", text: "只做一个普通人：举着香槟站到人群里，什么也不说",
        base: 0.7, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你真实的喜悦被镜头捕捉，人们说「这才像一个正常人面对历史」，人群里有人开始高叫你的名字。", effects: { rep: 1.25, voters: { warm: 600 }, fac: { base: 8 } } },
          ok: { body: "你融入欢庆，什么都没做错，什么也记住了。", effects: { rep: 0.6, voters: { warm: 200 } } },
          meh: { body: "你跟着欢呼了一晚上，第二天太阳照常升起。", effects: { rep: 0.3 } },
          fail: { body: "你在人群里显得有点格格不入，有人小声说「他来干什么」。", effects: { rep: 0.1 } },
          critfail: { body: "你想低调蹭个镜头，却被拍到一脸茫然，本地晚报配文「他与他的选民不同频」。", effects: { rep: 0, fac: { base: -2 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1990-08 · 海湾危机 —— 萨达姆吞下科威特（外交/战争前夜）
   * ==================================================================== */
  {
    id: "rg90_gulf", photo: "era-1990.jpg", grade: "major", category: "foreign",
    valence: "risk", dyn: true,
    minYear: 1990, maxYear: 1990, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "radio", "cable"], month: 8,
    title: "坦克越过边界，油价一夜跳涨",
    body: "伊拉克大军一夜吞并科威特，萨达姆把世界最大的一批油田攥在手里。航母开进了波斯湾，加油站的价格牌一天翻三回，电视上全是集结的坦克。\n" +
      "「要不要打、打得起打不起」这道题摆到全国面前，你所在的选区有征兵办公室、有油田相关的岗位，也有刚从海湾飞回来的家属。",
    brief: {
      lede: "一场可能很快、也可能拖很久的战争在门口；油价、兵源与道义，全被拧成一道题递给你。",
      known: [
        "联合国在倒计时要求撤军，白宫倾向动武，国会尚未投票授权。",
        "本地加油站排队，油价的恐慌比战争本身先到。",
        "反战与「不能纵容侵略」两股情绪各占半壁，都想借你的嘴。"
      ],
      rumor: [
        "有人说这是一场速战速决，打完就能收兵。",
        "也有人说这是另一个泥潭的开始，会拖成消耗。"
      ],
      unknown: [
        "正面战争会很快，战后泥潭才刚开始。",
        "你现在押哪边，是看清还是随大流。"
      ],
      terms: [{ k: "海湾危机", v: "1990 年伊拉克吞并科威特引发的危机。" }]
    },
    choices: [
      {
        id: "authorize", text: "支持强硬：授权动武、把油价与信誉一起稳住",
        note: "顺「不能示弱」的大流。速胜则你英明，陷住则你为泥潭开过绿灯。",
        base: 0.55, mods: [{ src: "fac", key: "military", w: 0.4 }, { src: "attr", key: "CUN", w: 0.25 }],
        outcomes: {
          crit: { body: "联盟迅速击溃入侵者，你「果断反对绥靖」的立场成了有胆识的标签。", effects: { rep: 1.5, tier: 1, fac: { military: 10, establishment: 6, base: 4 } } },
          ok: { body: "你站了强硬，主流认可，反战者皱眉。", effects: { rep: 0.7, fac: { military: 6, establishment: 4 } } },
          meh: { body: "你支持动武，可这件事最后主要由别人说了算。", effects: { rep: 0.2 } },
          fail: { body: "战事虽起却迟迟不结，油价高企，人们开始问「当初是谁催着打的」。", effects: { rep: -1.25, fac: { base: -6, press: -4 } } },
          critfail: { body: "拖成消耗、伤亡见报，你当初的「速战」保证被反复回放。「为一个泥潭背书的人」很难翻身。", effects: { rep: -2.5, fac: { base: -10, press: -8, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "diplo", text: "先给制裁与外交一次机会，别急着把孩子们送上前线",
        note: "守住反战与谨慎的基层，但可能被扣「纵容侵略」的帽子。",
        base: 0.5, mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你「先别急着开战」的声音在战后被重新评价为清醒，稳重的标签贴住了。", effects: { rep: 1.25, voters: { warm: 600 }, fac: { base: 10, church: 6, military: -6 }, flags: ["old_school"] } },
          ok: { body: "你呼吁先外交，反战者欣慰，鹰派不悦。", effects: { rep: 0.5, voters: { warm: 200 }, fac: { base: 6, military: -5 } } },
          meh: { body: "你说了谨慎的话，很快被开战头条淹没。", effects: { rep: 0.1 } },
          fail: { body: "开战后你被指「在侵略面前讲风度」，显得不合时宜。", effects: { rep: -1, fac: { military: -8, establishment: -4 } } },
          critfail: { body: "「萨达姆拿下油田会掐住我们命脉」的论调占了上风，你的谨慎被说成天真甚至通敌。", effects: { rep: -2, fac: { military: -10, establishment: -6, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "homefront", text: "不谈打不打，只管油价与军属：先把本地这头稳住",
        base: 0.58, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你躲开了意识形态的战场，闷头替军属和加油站做事，两边都挑不出毛病。", effects: { rep: 1, fac: { base: 6, military: 3, establishment: 3 } } },
          ok: { body: "你做了实惠的本地活，安全，也算讨喜。", effects: { rep: 0.4, fac: { base: 3 } } },
          meh: { body: "你只顾本地，宏大叙事里没人记得你。", effects: { rep: 0.1 } },
          fail: { body: "在举国争论打不打时你只谈加油，被说成「分不清大事」。", effects: { rep: -0.7, fac: { establishment: -4 } } },
          critfail: { body: "你想两头不沾，结果两头都把你当成了「关键时刻不说话的人」。", effects: { rep: -1.4, fac: { base: -5, military: -5 } } }
        }
      }
    ]
  },

 /* ======================================================================
   * 1984-11 · 「月亮竞选」—— 一场碾压式连任把全国版图重画
   * ==================================================================== */
  {
    id: "rg84_landslide", photo: "era-1984.jpg", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 1984, maxYear: 1984, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "print", "radio"], month: 11,
    title: "「月亮竞选」：谁都想像月亮一样借光",
    body: "经济回暖、人质回国、对手自乱阵脚。里根眼看要拿下四十几个州连任，共和党连带扫下一大批席位——媒体管这叫「月亮竞选」。\n" +
      "顺风里，党部催你上台站台，捐主要你上桌分席位，连对手都在清算自问。浪潮能把人托起来，也能把押错了边的人一起埋进沙里。",
    brief: {
      lede: "在一场不属于你的海啸里，什么时候站、站到哪儿，比这一局赢不赢更要命。",
      known: [
        "民调一边倒，胜局已定；悬着的是它能带走多少「顺带当选」。",
        "党部要你出席一连串联演，上头在盘算把哪些位置分给出力的人。",
        "你清楚借来的光不是自己的光——潮水退了，谁在裸泳一目了然。"
      ],
      rumor: [
        "有人说这股风顶多再吹两年，第二任期麻烦已在路上。",
        "有人说你现在把招牌押上去，下轮分蛋糕就有你一份。"
      ],
      unknown: [
        "两年后这场横扫会变成权力真空。",
        "你的名字会被当成什么都没赢过的证据。"
      ],
      terms: [{ k: "月亮竞选", v: "借全国浪潮顺带当选；潮退时最先被冲走。" }]
    },
    choices: [
      {
        id: "bandwagon", text: "把招牌彻底押上浪潮，全国替胜者站台",
        note: "赌风还能吹——赌对了你一步登天，赌错了你就是「只会借光」的活标本。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "establishment", w: 0.25 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你成了这股风里最卖力的鼓手，胜选庆功宴上你的名被念了三遍，党部记牢了你的这份力。", effects: { rep: 1.5, fac: { establishment: 10, base: 4 } } },
          ok: { body: "你蹭上了顺风，露了不少脸，分席时你的名字排在中段。", effects: { rep: 0.6, fac: { establishment: 5 } } },
          meh: { body: "你忙前忙后，风头却都被上面的人占了，没几个人把功劳算你头上。", effects: { rep: -0.1, fac: { establishment: 2, base: -2 } } },
          fail: { body: "风过了，你替一个本地丑闻缠身的候选人站台的话被翻了出来，退也退不清。", effects: { rep: -1, fac: { establishment: -4, base: -6 } } },
          critfail: { body: "你借着浪潮揽下的那笔好处被翻了出来：「他就是靠这次站台捞的」。你的名字上了清算名单。", effects: { rep: -2, fac: { base: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "wait", text: "不押边：只讲本地议题，给自己留一条后路",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你没蹭那股东风，闷头把本地的几件事做实——潮水退了，你还在岸上。", effects: { rep: 0.3, fac: { base: 2 } } },
          ok: { body: "你保持了距离，不冷不热，谁也没抓着你把柄。", effects: { rep: 0.15 } },
          meh: { body: "浪潮席卷全国，而你安静得像没参加这场选举。", effects: {} },
          fail: { body: "两头的风头都没你的份，有人说你「连站哪边都不敢说」。", effects: { rep: -0.15, fac: { establishment: -2 } } },
          critfail: { body: "你谁也没帮，等来的不是感激，是两边都把你当成了「靠不住的人」。", effects: { rep: -0.3, fac: { base: -2 } } }
        }
      },
      {
        id: "host", text: "自掏腰包办一场捐款晚宴，把全国的风请到自己桌上",
        note: "办局的人天生是局里的头一份——但这顿要花一大笔，钱不到位的人只能站在门外陪笑。",
        base: 0.68, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "fac", key: "commercial", w: 0.2 }],
        cost: { fun: 3 },
        outcomes: {
          crit: { body: "一桌人后来都成了「那顿饭上认识的」，你的名字和这股风绑得最紧，分席位时先问你。", effects: { rep: 1.5, fac: { establishment: 12, commercial: 6, base: 3 }, flags: ["reagan_belt"] } },
          ok: { body: "晚宴办得齐整，党部把你当成「能攒局的人」，下次有位置先想到你。", effects: { rep: 0.7, fac: { establishment: 7, commercial: 3 } } },
          meh: { body: "钱花了，菜凉了，该来的人没来几个，只落一句「他还挺热心」。", effects: { rep: 0.1, fac: { commercial: 2 } } },
          fail: { body: "这场晚宴被说成「拿公众的钱给自己贴金」，捐款人没记下你的好。", effects: { rep: -0.8, fac: { press: -4, establishment: -3 } } },
          critfail: { body: "宴席的账单和落选者的合影一起被翻出来，你成了「浪潮里最会给自己脸上贴金的那个」。", effects: { rep: -1.6, fac: { press: -6, base: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1988-11 · 大选交接 —— 「里根之后」的第一把火
   * ==================================================================== */
  {
    id: "rg88_election", photo: "era-1988.jpg", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 1988, maxYear: 1988, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "print", "radio"], month: 11,
    title: "总统两届将满，继任之争把整个党撕成两半",
    body: "总统任期已满，继任之争把整个党撕成两半：举着里根大旗、要「延续」的副总统布什，对上要「翻新」的党内挑战者。对手那边，马萨诸塞州长杜卡基斯把话讲得又软又稳。\n" +
      "你这一层的人被迫选边。这场选举没有里根的光环罩着，赌错了方向，再没人替你兜底。",
    brief: {
      lede: "浪潮退去的头一场选举，比的不是谁嗓门大，是谁在风向未明时押对了注。",
      known: [
        "里根声望尚高，但接班的是谁、路线要不要变，党内先打了起来。",
        "对手把「和平与繁荣」挂在嘴边，试图把八年的功劳一并接过去。",
        "地方一级没人再能白搭顺风车，每一票都得自己挣。"
      ],
      rumor: [
        "有人说这是「一代人的接力」，跟着能吃到八年红利。",
        "也有说风向说变就变，现在跳赢面两年后成负资产。"
      ],
      unknown: [
        "这场交接留下「什么都没变」的局面。",
        "你这局的站队，是有主张还是只会跟风。"
      ],
      terms: [{ k: "继任之争", v: "现任不能连任时，党内围绕接班路线的争夺。" }]
    },
    choices: [
      {
        id: "attack", text: "替一边打「负面牌」：把对手钉成不称职的人",
        note: "脏活总得有人干——干好了是新朝功臣，干砸了全党的丑闻算在你头上。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "base", w: 0.2 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你操盘的几记负面拳精准又不脏，选后论功行赏，你的名字进了「懂打仗」的小圈子。", effects: { rep: 1.25, fac: { establishment: 8, base: 4 }, contact: { atwater: 6 } } },
          ok: { body: "你打的牌见效了，虽不漂亮，却替一边抢下了关键几州。", effects: { rep: 0.4, fac: { establishment: 4 }, contact: { atwater: 3 } } },
          meh: { body: "你的负面牌打得不痛不痒，反被对手借「团结」一句拉了回去。", effects: { rep: -0.3 } },
          fail: { body: "你操盘的一条黑料被证实是假的，火全烧到你身上——「是他授意的」。", effects: { rep: -1.25, fac: { press: -6, establishment: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "伪造黑料、暗中操盘的事被掀了个底朝天。你从「竞选功臣」变成「调查对象」。", effects: { rep: -2, fac: { press: -8, establishment: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "issues", text: "不碰脏活：只端自己的主张，安静做事",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "满场互撕里你这段「不接招」反倒立住了，有人开始把你当成「还能好好说话的人」。", effects: { rep: 0.3, fac: { base: 2 } } },
          ok: { body: "你没参战，也没失分，安安静静守住了自己的地盘。", effects: { rep: 0.15 } },
          meh: { body: "这轮选举的喧嚣里没有你的声音，也没人记得黑你。", effects: {} },
          fail: { body: "两边打完回头都嫌你「选边选得太晚」。", effects: { rep: -0.15, fac: { establishment: -2 } } },
          critfail: { body: "你不肯碰脏活，却被自己支持的那一边当成「不肯出力的人」，悄悄划进了冷宫。", effects: { rep: -0.3, fac: { establishment: -2 } } }
        }
      },
      {
        id: "callins", text: "动用攒下的人情，请本地与教会的老朋友替这仗站台",
        note: "平时攒的人情，就在这种时候变现：几张老脸能把一场冷仗焐热。可人情是花一件少一件的硬账——没攒够的人，开不了这个口。",
        base: 0.64, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "fac", key: "base", w: 0.25 }],
        cost: { fav: 3 },
        outcomes: {
          crit: { body: "你挨个拨通了那几本旧号码，基层与教堂的人为你站了出来——这股不靠钱的劲头，反比脏活更得人心。", effects: { rep: 1.3, fac: { base: 10, church: 4 }, voters: { warm: 400 } } },
          ok: { body: "几个人情换来了几句真心的背书，你这一方稳住了阵脚。", effects: { rep: 0.6, fac: { base: 5 }, voters: { warm: 150 } } },
          meh: { body: "你张了口，响应的人不多，场面没崩也没靠你翻盘。", effects: { rep: 0.1 } },
          fail: { body: "你借的人情没兜住场，反倒欠下一笔「关键时刻不中用」的账。", effects: { rep: -0.6, fac: { base: -4 } } },
          critfail: { body: "你四处求人的样子被对手拍成「他自己没人脉，还得靠别人施舍」，人情与名声一起见了底。", effects: { rep: -1.4, fac: { press: -4, base: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1989—90 · 储贷危机余波（接在 rg82_snl 之后：当年挂的名，如今结账）
   * ==================================================================== */
  {
    id: "rg90_snl_wreck", grade: "mid", category: "finance",
    valence: "bane", dyn: true,
    minYear: 1989, maxYear: 1990, scoped: true, tierRaw: true, tierMin: 2, tierMax: 6, weight: 12, unique: true,
    medium: ["print", "tv"], month: 8,
    after: { id: "rg82_snl", minMonthsAfter: 12 },
    title: "当年那家「什么都敢贷」的公司，塌了",
    body: "松绑的狂欢散场：一批储贷相继倒闭，联邦要纳税人掏钱填这个窟窿，检察官开始挨个查「当初是谁替它把路踩平的」。\n" +
      "你当年在董事会挂的那个名、那份「专业意见书」，如今被装进了一个牛皮纸档案袋，袋上写着你的名字。",
    brief: {
      lede: "当年那笔来得快的钱与那句来得轻的话，如今都要你亲自连本带利地还。",
      known: [
        "联邦储贷保险基金被掏空，清算与追责全面展开。",
        "你当年的挂名或顾问记录，在对方的文件里被完整保留着。",
        "有同僚已被传唤，名单上的下一个是谁没人敢说。"
      ],
      rumor: [
        "有人说上面要拿几个边缘挂名的开刀，保住大鱼。",
        "也有人说只要退钱就能了事，不会真有人进去。"
      ],
      unknown: [
        "账单由纳税人埋，追责看谁先被推出去。",
        "你切割、死扛还是先退，档案袋合或开。"
      ],
      terms: [{ k: "储贷危机", v: "储贷投机倒闭，由纳税人兜底的丑闻。" }]
    },
    choices: [
      {
        id: "refund", text: "主动退钱、配合清算：把挂名的分红一分不少退回去",
        note: "破财免灾，赌「知趣」能换来不追究。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        cost: { fun: 2 },
        outcomes: {
          crit: { body: "你退得干净，被清算组当成「主动配合」的样本，悄悄从追责名单上划了名。", effects: { rep: 0.6, fac: { establishment: 4 }, flags: ["snl_escaped"] } },
          ok: { body: "你吐出了当年的好处，丢了钱，保住了位子。", effects: { rep: 0.1, flags: ["snl_escaped"] } },
          meh: { body: "你退了钱，可清算组对你的兴趣没减多少。", effects: { rep: -0.3 } },
          fail: { body: "你退了钱还被追问：光退分红不够，你当初到底替它做了什么。", effects: { rep: -1.25, fac: { press: -6 }, flags: ["investigation_open"] } },
          critfail: { body: "你退的钱被当成「封口费」的反证，退钱反倒坐实了你明知有问题。", effects: { rep: -2, fac: { press: -8, establishment: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "deny", text: "死扛：我当年只是挂个名，什么内情都不清楚",
        base: 0.42, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你咬定不知情，文件里也确实钉不死你，你惊险过关。", effects: { rep: 0.7, fac: { commercial: 4 } } },
          ok: { body: "你守住了口径，虽被怀疑却没被坐实。", effects: { rep: 0 } },
          meh: { body: "你的否认不痛不痒，查你的人决定再看看。", effects: { rep: -0.4 } },
          fail: { body: "一封你签过字的旧邮件被翻出来，「不知情」三个字说不圆了。", effects: { rep: -1.5, fac: { press: -8 }, flags: ["investigation_open", "scandal_2"] } },
          critfail: { body: "文件坐实了你知情还站台。为躲追责撒的谎，成了把你钉死的证据。", effects: { rep: -2.75, fac: { press: -10, establishment: -8, base: -6 }, hardEnd: "disgrace" } }
        }
      },
      {
        id: "sacrifice", text: "把水引向别人：交出更大的名字，换自己上岸",
        note: "踩人自救，能脱身也树了死敌。",
        base: 0.48, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "establishment", w: 0.2 }],
        outcomes: {
          crit: { body: "你供出了更大的名字，自己轻拿轻放，清算组满意地合上了你这一页。", effects: { rep: 0.3, lev: 1, fac: { establishment: 6, commercial: -6 } } },
          ok: { body: "你卖了队友换来自保，事是平了，圈子里再没人信你。", effects: { rep: -0.3, fac: { establishment: -6, commercial: -8 }, flags: ["party_traitor"] } },
          meh: { body: "你供了人，可你的位置太边缘，换不来多少宽待。", effects: { rep: -0.5 } },
          fail: { body: "你想拉人垫背，反被对方先反咬一口，两个人互相指着进了档案。", effects: { rep: -1.5, fac: { establishment: -8, press: -6 }, flags: ["investigation_open", "scandal_2"] } },
          critfail: { body: "你编的供词被拆穿，你从「嫌疑人」升级成「妨碍调查者」。这一步，迈进了牢门。", effects: { rep: -2.5, fac: { establishment: -12, press: -8 }, hardEnd: "prison" } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1980-04 · 鹰爪行动 —— 沙漠里的爆炸与举国的屈辱（1980 串·前奏）
   * ==================================================================== */
  {
    id: "rg80_eagleclaw", grade: "mid", category: "foreign",
    valence: "risk", dyn: true,
    minYear: 1980, maxYear: 1980, scoped: true, tierRaw: true, tierMin: 0, tierMax: 3, weight: 12, unique: true,
    medium: ["tv", "radio", "print"], month: 4,
    title: "救人质行动在沙漠里烧成火球，八个人没能回来",
    body: "德黑兰扣押美国人质已过半年。深夜突袭的直升机与运输机在沙漠集结点相撞起火，八名军人葬身异域的沙丘——行动还没碰上人质就已失败。\n" +
      "电视反复播放燃烧的残骸，举国憋了半年的窝囊气一夜点燃。本地也有一户人家刚接到阵亡通知书——你可以去敲那扇门，也可以装作没这回事。",
    brief: {
      lede: "一场当众演砸的营救，把「我们是不是不行了」摆到每个客厅的茶几上。",
      known: [
        "五十余名美国人仍被扣在德黑兰，营救失败后连谈判都更像话柄。",
        "八名阵亡者里有本地子弟，媒体正追着要一个「代表地方」的声音。",
        "白宫把失败归咎于沙尘与机械故障，可没几个人信服。"
      ],
      rumor: [
        "有人说行动太冒险，是替政治日程硬凑的。",
        "有人说气象与协调的隐患早被察觉，为抢功瞒下。"
      ],
      unknown: [
        "人质问题会成笼罩大选的阴影。",
        "你对那户人家的姿态，街坊会记很多年。"
      ],
      terms: [{ k: "人质危机", v: "伊朗学生占美国使馆扣人质；营救惨败。" }]
    },
    choices: [
      {
        id: "condole", text: "登门慰问阵亡者家属，把话说到实处，不碰白宫的是非",
        note: "最稳：哀悼不会出错，但也借不到「强硬」的光。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你在客厅里陪着那家人红了眼眶，没说一句场面话。本地记住「那种时候他真来了」。", effects: { rep: 1.2, fac: { base: 8, church: 4 } } },
          ok: { body: "你得体地致意、默默帮忙，家属领你的情。", effects: { rep: 0.5, fac: { base: 5 } } },
          meh: { body: "你去了，说了几句，谁都没特别记下。", effects: { rep: 0.1 } },
          fail: { body: "你把慰问走成了竞选拜票，被家属当面问「你是来看他的还是来拉票的」。", effects: { rep: -0.4, fac: { press: -3 } } },
          critfail: { body: "你在灵堂边接了个电话谈笑，照片上了本地报。", effects: { rep: -1, fac: { press: -5, base: -3 } } }
        }
      },
      {
        id: "hawk", text: "借这股屈辱喊话：要更强硬，把军事选项摆上台面",
        note: "赌民意爱「硬气」；可一旦真升级出事，你推的每一把都在账上。",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你在本地电台一句「不能再这样被人骑在头上」被反复转发，鹰派把你当成敢讲的自己人。", effects: { rep: 1.1, fac: { base: 8, military: 5 }, voters: { warm: 300 } } },
          ok: { body: "你喊出了不少人的闷气，也被另一部分人记了脸。", effects: { rep: 0.4, fac: { base: 4 } } },
          meh: { body: "此刻全国只想先救回人，你的喊话显得空洞。", effects: { rep: -0.2 } },
          fail: { body: "在举国哀伤里你鼓噪开战，报上把你写成「拿死人的血要热度」。", effects: { rep: -1, fac: { press: -5, church: -4 } } },
          critfail: { body: "你一句「早该炸平那里」被人逐字重播，连温和派都跟你划清界限。", effects: { rep: -1.6, fac: { press: -6, establishment: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "blame", text: "把矛头对准白宫的决策混乱，公开问责这场灾难性行动",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你引经据典点出程序与情报的漏洞，被本地报夸成「少数敢讲清问题在哪的人」。", effects: { rep: 0.8, fac: { press: 5, base: 3 }, attr: { INT: 2 } } },
          ok: { body: "你挑出了真问题，虽得罪人，也显出分量。", effects: { rep: 0.2, attr: { INT: 1 } } },
          meh: { body: "你说了些技术性的批评，没多少人听得进去。", effects: { rep: -0.2 } },
          fail: { body: "你追着白宫骂，被人反问「你有什么更好的办法」，答不上来。", effects: { rep: -0.9, fac: { establishment: -5 } } },
          critfail: { body: "你越界甩出没证据的内幕指控，反被指为造谣。", effects: { rep: -1.5, fac: { establishment: -6, press: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1980-11 · 里根当选 —— 保守主义回潮的分水岭（1980 串·爆发）
   * ==================================================================== */
  {
    id: "rg80_election", photo: "era-1980.jpg", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 1980, maxYear: 1980, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 14, unique: true,
    medium: ["tv", "radio", "print"], month: 11,
    after: { id: "rg80_eagleclaw", minMonthsAfter: 5 },
    title: "「你比五年前过得更好吗？」——一句话改写了政治版图",
    body: "一句大白话问进千家万户的客厅，卷走四十几个州，共和党几十年头一回夺回参议院，「沉默的大多数」第一次被点名为一支力量。\n" +
      "潮水转向的夜里，本地两拨人都在等你表态：一拨急着跟新浪潮搭话，一拨要你守住原来的队伍。你站哪边，未来十年的资源就从哪边流向你。",
    brief: {
      lede: "一场不关政策、只关情绪的选举。读懂浪头的人，会跟着一起涨起来。",
      known: [
        "通胀、人质、失败的营救，早把卡特支持率拖穿。",
        "里根以演员亲和力横扫电视，保守派正聚成新力量。",
        "本地党机器分裂：建制想对冲，基层想跟上。"
      ],
      rumor: [
        "有人说这不过又是一代人厌倦了，四年后就会转回去。",
        "有人说这是真正的版图重画，一画就是二十年。"
      ],
      unknown: [
        "这股联盟将重塑此后十年的议程。",
        "你转向之夜押的边，是最显眼的一笔。"
      ],
      terms: [{ k: "政治版图重组", v: "里根当选，保守派与宗教右翼结成新联盟。" }]
    },
    choices: [
      {
        id: "bandwagon", text: "顺势靠拢新联盟：给崛起的浪潮递话、排队",
        note: "赌这一波要执政十几年。押对一步登天，押错你就是党内那个「见风使舵」的。",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "base", w: 0.2 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你踩准了浪头，一夜之间从边缘人变成「新联盟里有头脸的人」，捐款与引荐都顺着这条线来。", effects: { rep: 1.5, fac: { establishment: 8, base: 6 }, lev: 1, contact: { atwater: 5 }, flags: ["reagan_belt"] } },
          ok: { body: "你及时靠了过去，新朝的人记下了你的名字。", effects: { rep: 0.7, fac: { establishment: 6 }, flags: ["reagan_belt"] } },
          meh: { body: "你递了话，可浪头没给你留位置。", effects: { rep: 0.1 } },
          fail: { body: "你押错了本地的盘子，新盟友嫌你来得晚，老同僚骂你是叛徒。", effects: { rep: -1, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "你冲在最前替浪潮摇旗，浪潮却在本地输个精光，你被两头一起扫地出门。", effects: { rep: -1.8, fac: { base: -8, establishment: -6 }, flags: ["party_traitor"] } }
        }
      },
      {
        id: "hold", text: "留在原队伍：守住基本盘，不做墙头草",
        base: 0.55, mods: [{ src: "attr", key: "INTG", w: 0.45 }],
        outcomes: {
          crit: { body: "潮退之后你还站在原地，苦主们都认得你这份「没跑」。你在废墟里攒下了最硬的人情。", effects: { rep: 1, fac: { base: 8 }, contact: { oneill: 5 }, flags: ["loyal"] } },
          ok: { body: "你没跟风向跑，基层记你的稳。", effects: { rep: 0.4, fac: { base: 4 }, flags: ["loyal"] } },
          meh: { body: "你守住了队伍，可队伍正在散。", effects: {} },
          fail: { body: "守的是输的一方，资源从此绕着你走。", effects: { rep: -0.7, fac: { establishment: -4 } } },
          critfail: { body: "你既没跟上新局、又守不住旧盘，两头都觉得你没用。", effects: { rep: -1.5, fac: { base: -6, establishment: -4 } } }
        }
      },
      {
        id: "localist", text: "不押全国赌注：只谈本地的事，谁赢都照样办事",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你不掺和全国的风，专心把本地的水电气理顺——两拨人都还得来求你办事。", effects: { rep: 0.8, fac: { establishment: 4, base: 4 } } },
          ok: { body: "你谁也没得罪，也谁都没深交。", effects: { rep: 0.3 } },
          meh: { body: "你躲开了这轮站队，安稳无波。", effects: { rep: 0.1 } },
          fail: { body: "风向大变时你「中立」成了「没担当」的代名词。", effects: { rep: -0.4 } },
          critfail: { body: "谁赢了都没把你当自己人——机会来了也绕开你。", effects: { rep: -1, fac: { press: -4 } } }
        }
      },
      {
        id: "purse", text: "开一张大支票，直接坐进新联盟的筹建桌",
        note: "钱能买来入场券：一步站到浪潮最前排。但要真金白银掏出去——家底不厚的人连门都进不去，只能眼看别人上桌。",
        base: 0.66, mods: [{ src: "attr", key: "INT", w: 0.25 }, { src: "fac", key: "commercial", w: 0.3 }],
        cost: { fun: 3 },
        outcomes: {
          crit: { body: "你把第一笔大钱拍了上桌，「新联盟里出钱的那几个」名单当场添了你一个名字，全国的操盘手主动递来名片。", effects: { rep: 1.4, fac: { establishment: 12, commercial: 6 }, contact: { atwater: 6 }, flags: ["reagan_belt"] } },
          ok: { body: "支票换来了入场券，庆功宴上你坐进主桌，名字被正式念了出来。", effects: { rep: 0.7, fac: { establishment: 7, commercial: 3 }, contact: { atwater: 3 }, flags: ["reagan_belt"] } },
          meh: { body: "钱花了，浪头却没给你留位子，只换来一张边角合影。", effects: { rep: 0.1 } },
          fail: { body: "你砸了重金，本地却翻了盘，钱打了水漂，还被老同僚笑「人傻钱多」。", effects: { rep: -0.6, fac: { establishment: -3, base: -4 } } },
          critfail: { body: "一张大支票买了个「只会用钱砸」的名声，风头过后两头不认你，家底也见了底。", effects: { rep: -1.2, fac: { base: -6, press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1986-04 · 空袭的黎波里 —— 越境打击与战争权之辩（中期补强）
   * ==================================================================== */
  {
    id: "rg86_libya", grade: "mid", category: "foreign",
    valence: "risk", dyn: true,
    minYear: 1986, maxYear: 1986, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 11, unique: true,
    medium: ["tv", "radio", "print"], month: 4,
    title: "战机越过大西洋，把炸弹丢到的黎波里",
    body: "柏林一家夜总会爆炸、死了美军士兵，华盛顿指认是卡扎菲策动，深夜空袭的黎波里与班加西，还炸死了卡扎菲的养女。全国直播里，第一次有人把「报复」二字说得这么直接。\n" +
      "国会吵翻了：总统能不能不宣而战？本地派出去的兵，此刻正从海外基地起飞。你被记者堵在门口，要一句表态。",
    brief: {
      lede: "一场受欢迎的空袭，和一场关于「谁有权开战」的宪政追问，同时压到你面前。",
      known: [
        "多数民众当晚拍手叫好，觉得终于有人「硬了一回」。",
        "批评者说这绕过国会、开了危险先例，也把海外人质置于报复风险。",
        "本地有家庭的孩子就在参战部队里，他们只想他平安回来。"
      ],
      rumor: [
        "有人说真正的目标是卡扎菲本人，这次是暗杀未遂。",
        "有人说醉翁之意在秀肌肉，国内政治才是主场。"
      ],
      unknown: [
        "报复会不会招来针对美国人的连环袭击。",
        "你今晚站哪边，会跟你很久。"
      ],
      terms: [{ k: "战争权", v: "宣战权归国会、统帅权归总统的权限之争。" }]
    },
    choices: [
      {
        id: "back", text: "公开支持空袭：该还手时就还手",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你在镜头前的硬气正对上当晚的民意，被人当成「不怯场」的代表。", effects: { rep: 1.1, fac: { base: 6, military: 5 } } },
          ok: { body: "你顺着民意站了台，掌声不少。", effects: { rep: 0.5, fac: { base: 3 } } },
          meh: { body: "你说支持，语气平淡，没人特别记得。", effects: { rep: -0.1 } },
          fail: { body: "随后针对美国人的报复性袭击上了新闻，有人翻出你当初鼓吹的「硬」。", effects: { rep: -0.9, fac: { press: -4 } } },
          critfail: { body: "死难者名单越拉越长，你的名字和「把孩子们送上战场」被并排写进社论。", effects: { rep: -1.6, fac: { press: -6, church: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "warpowers", text: "质疑程序：总统不能不宣而战",
        base: 0.42, mods: [{ src: "attr", key: "INT", w: 0.45 }],
        outcomes: {
          crit: { body: "在一片叫好里你稳住了讲宪政，事后被证明是把住了分寸，法律与舆论圈都记住你。", effects: { rep: 1, fac: { press: 5, establishment: 4 }, attr: { INT: 2 } } },
          ok: { body: "你提出了正当的程序质疑，虽不合时宜，也显出骨头。", effects: { rep: 0.3, attr: { INT: 1 } } },
          meh: { body: "你的程序论太书生气，爱国声浪一浪高过一浪。", effects: { rep: -0.3 } },
          fail: { body: "在举国同仇的空气里你谈「程序」，被骂成拆自己的台。", effects: { rep: -1.1, fac: { base: -6 } } },
          critfail: { body: "你被扣上「替对手说话」的帽子，对手把它裱起来挂进了竞选广告。", effects: { rep: -2, fac: { base: -8, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "personal", text: "只谈派出去的本地球：把孩子平安带回家",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "military", w: 0.2 }],
        outcomes: {
          crit: { body: "你不谈大道理，只惦记那几家等信的父母——这份朴素最得人心，军属社区把你当自己人。", effects: { rep: 0.9, fac: { base: 5, military: 4 } } },
          ok: { body: "你把镜头引向具体的人和家庭，稳妥又有人情。", effects: { rep: 0.4 } },
          meh: { body: "你说的是家长里短，没蹭到热度，也没出错。", effects: { rep: 0.1 } },
          fail: { body: "有人嫌你「只顾自己那几户」，不像个谈国事的人。", effects: { rep: -0.4 } },
          critfail: { body: "就在你说「平安回来」的当口，第二拨伤亡的名单传到本地，你显得不合时宜。", effects: { rep: -1, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1987-06 · 推倒这堵墙 —— 勃兰登门前的一句喊话（冷战高点）
   * ==================================================================== */
  {
    id: "rg87_wall", grade: "major", category: "foreign",
    valence: "risk", dyn: true,
    minYear: 1987, maxYear: 1987, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "radio", "print"], month: 6,
    title: "总统隔着一堵墙喊话：「把它拆了」",
    body: "勃兰登堡门前，美国总统对着墙那头的对手点名喊话，要他「推倒这道墙」。全球镜头齐刷刷对准冷战最硬的伤疤，现场还有反核示威的喊声一度盖过演讲。\n" +
      "一边是军控谈判正悄悄加速，一边是鹰派为这句话热血沸腾。本地电视台又要你那一句：这是勇气，还是拿和平冒险的逞口舌之快？",
    brief: {
      lede: "一句话把冷战的走向摆上台面——你可能在为终局欢呼，也可能在替一场误判背书。",
      known: [
        "墙那头刚上来一位年轻的改革者，说话方式与前任不同。",
        "同一年，削减欧洲中程核武器的秘密谈判正在推进。",
        "反核运动仍能让几座城市的街头水泄不通。"
      ],
      rumor: [
        "有人说这话其实是讲给国内选民听的，外交效果存疑。",
        "有人说对方若不让步，这话会被当成挑衅宣传。"
      ],
      unknown: [
        "这墙两年后会自己倒塌，此刻没人敢信。",
        "你今日的话，历史转弯时才见高下。"
      ],
      terms: [{ k: "勃兰登堡门", v: "柏林墙旁象征冷战的地标；里根在此喊话。" }]
    },
    choices: [
      {
        id: "echo", text: "高声呼应：这才是自由世界该有的硬气",
        base: 0.48, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你把这句喊话接成本地的口号，保守阵营一致认你是「站得正的人」，党内资源开始向你倾斜。", effects: { rep: 1.4, fac: { establishment: 7, base: 5 }, flags: ["cold_hawk"] } },
          ok: { body: "你顺势为强硬叫好，鹰派记你一功。", effects: { rep: 0.6, fac: { establishment: 4 }, flags: ["cold_hawk"] } },
          meh: { body: "你附和了一句，谁都没往心里去。", effects: { rep: -0.1 } },
          fail: { body: "缓和最终成了主旋律，你的高亢显得刺眼而时过境迁。", effects: { rep: -1, fac: { press: -4 } } },
          critfail: { body: "军控协议签署那天，你当初「绝不妥协」的录音被人翻出来当反面教材。", effects: { rep: -1.7, fac: { press: -6, establishment: -4 } } }
        }
      },
      {
        id: "caution", text: "泼冷水：逞口舌之快，别真把对手逼到墙角",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.45 }],
        outcomes: {
          crit: { body: "你点破这更多是讲给国内听的姿态，事后被夸有远见，评论圈把你当「冷静的那几个之一」。", effects: { rep: 1.1, fac: { press: 5, establishment: 3 }, attr: { INT: 2 } } },
          ok: { body: "你留了三分清醒，虽不合潮，也立了个有脑子的形象。", effects: { rep: 0.4, attr: { INT: 1 } } },
          meh: { body: "在一片热血里你的谨慎没人爱听。", effects: { rep: -0.3 } },
          fail: { body: "你被鹰派逮住「替对手找理由」，本地右翼报纸点名批你。", effects: { rep: -1, fac: { base: -6 } } },
          critfail: { body: "「对共产主义软弱」的标签被贴到你竞选材料上，甩都甩不掉。", effects: { rep: -1.6, fac: { base: -8, establishment: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "local", text: "躲开宏大叙事：只谈本地的厂要不要接军备订单",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你把一句意识形态口号落回到了「本地有多少个饭碗」，务实的形象两头都买账。", effects: { rep: 0.8, fac: { base: 5, labor: 3 } } },
          ok: { body: "你不蹭热度，只谈民生，稳当。", effects: { rep: 0.3 } },
          meh: { body: "你谈你的工厂，没人接这茬。", effects: { rep: 0.05 } },
          fail: { body: "历史大场面里你只惦记订单，被人笑「格局太小」。", effects: { rep: -0.4 } },
          critfail: { body: "你算的军备账被曝出有利益关联，「主战还是主饱」的闲话跟着你。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 把上面的大事件与事件串钉进全局定点表 fixed（到点必发；后幕靠 after 续接）。
 *   · rg89_iran_after 的窗口 1988—1989，用 fromYear/toYear 给一段弹性年月。
 *   · 前幕 rg86_iran_open 若因层级/机缘没演，则后两幕 after 不成立、静默跳过——可断裂的串。
 * ==========================================================================*/
POTUS.define("fixed", [
  /* —— 1980 开场串（前奏→爆发）：demo 起点年不再是空窗 —— */
  { event: "rg80_eagleclaw", year: 1980, month: 4, grade: "mid" },
  { event: "rg80_election", year: 1980, month: 11, grade: "major" },
  { event: "rg81_shooting", year: 1981, month: 3, grade: "mid" },
  { event: "rg82_unemp", year: 1982, month: 11, grade: "mid" },
  { event: "rg83_beirut", year: 1983, month: 10, grade: "mid" },
  { event: "rg84_landslide", year: 1984, month: 11, grade: "mid" },
  { event: "rg85_plaza", year: 1985, month: 9, grade: "mid" },
  { event: "rg86_challenger", year: 1986, month: 1, grade: "mid" },
  { event: "rg86_libya", year: 1986, month: 4, grade: "mid" },
  /* —— 伊朗门事件串（前奏→爆发→余波） —— */
  { event: "rg86_iran_open", year: 1986, month: 11, grade: "mid" },
  { event: "rg87_iran_hearings", year: 1987, month: 7, grade: "major" },
  { event: "rg89_iran_after", fromYear: 1988, toYear: 1989, month: 3, grade: "mid" },
  /* —— 独立大事件 —— */
  { event: "rg87_wall", year: 1987, month: 6, grade: "major" },
  { event: "rg87_monday", year: 1987, month: 10, grade: "major" },
  { event: "rg88_election", year: 1988, month: 11, grade: "mid" },
  { event: "rg89_berlin", year: 1989, month: 11, grade: "major" },
  { event: "rg90_gulf", year: 1990, month: 8, grade: "major" },
  /* 储贷危机余波：接在 21-worldline.js 钉入的 rg82_snl 之后 */
  { event: "rg90_snl_wreck", year: 1990, month: 8, grade: "mid" }
]);
