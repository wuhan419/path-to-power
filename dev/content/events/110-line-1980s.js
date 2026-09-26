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
 *   risk 卡要有真实的"稳守不冒进"退路且摆幅够大；boon 卡不写负收益；正文交代认知边界。
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
    body: "离开的车队刚停稳，六声枪响从人群里炸开。电视信号切断了正常节目，全国第一次看一场刺杀在直播里发生。\n" +
      "枪手小欣克利被当场按倒。总统中弹送医，生死未卜，白宫发言人在讲台上语无伦次，继任的说法已经冒头。" +
      "本地电视台的直播连线就在你面前：他们要一个本地民意代表的第一句话。有人说枪手追的是女演员朱迪·福斯特，与政治无关。" +
      "你今晚这句话，二十年后会被逐字重播。",
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
      "全国失业率冲上战后最高点。登记只是开头，救济批下来常要拖上几周，这几周人家的餐桌上没有东西。" +
      "地方报纸想要一个「替他们说话的人」，市政厅想要一个「别把事闹大的人」。有人说厂里的设备早被老板转走了，关门是抽干资产。" +
      "你在镜头前哭还是去砸厂门，十年后才见得出对错。",
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
    body: "贝鲁特的多国部队营地（派驻黎巴嫩的维和部队）被一辆装满炸药的卡车掀塌，数百名年轻士兵埋在瓦砾下。灵柩运回国的画面，一具接一具爬过电视。\n" +
      "名单里有一个是本州的孩子。家里只是普通工薪，他参军是为了学费。部队从调停变成了靶子，国防部到今天还说不清这支部队奉的是什么命令。" +
      "他母亲在教堂门口接受采访，问：他们到底为什么死在那里。镜头随后转向你。有人说白宫早知道这处营地守不住，只是没人敢下令撤。",
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
    body: "主要工业国在广场饭店关起门定下联合干预，让美元对日元、马克大幅贬值，去填美国的贸易窟窿。上面管这叫「有序调整」，市面上管这叫「美国不再说了算」。\n" +
      "消息一出，汇市与出口板块天翻地覆。美元贬了，出口理论上更划算，可厂里那些进口原料也跟着变贵：有人指望翻身，有人怕被冲垮门面，两边都来敲你的门。" +
      "有操盘手几个月前就听到风声，钱早被赚走了。你今天替谁背书，三年后汇率会来找你。",
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
    body: "发射因天气推迟过一次，终于在一个晴朗的早晨升空。七十三秒后，天空裂成一团白烟。舱里有一位小学教师麦考利夫，全国的孩子本来在直播里看她上课——挑战者号升空即解体，七人全部遇难。\n" +
      "学校停课，家长们不知所措，社区的学校董事会想要一个既有分量又不出错的声音，想到了你。" +
      "事故原因未查清，NASA 的口径一天三变，「O 形环」——火箭接缝处那圈密封圈——的说法已在私下流传。有人说警告邮件早就发过，是赶工把它压了下去。" +
      "你怎么跟那些孩子讲这件事，他们会记一辈子。",
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
    body: "有人秘密向对手卖武器，好换人质获释；卖武器的钱，又绕道去资助别处一支国会不许出钱的武装——那条拨款禁令就写在法条里。这条链子的每一环都「不方便留痕」。\n" +
      "一位旧同僚只带了一句口信来试探你：本地有没有一条「不用走账面」的路，替这事搭把手。没有文件，没有签字。" +
      "搭好了是新朝功臣，搭砸了事发时头一个被问的就是你这个中间人。有人说钱根本没到该去的地方，几个掮客先把自己喂饱了。",
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
    body: "丑闻彻底爆了：秘密售武、绕开国会、资金流向另一场不许打的仗，一环环被摊到阳光下。国会的取证听证会全程电视直播，收视率压过橄榄球。\n" +
      "你的名字已经在证人名单上。你当年在这条链上站过的位置——不管多边缘——正被律师和记者一字一句地重翻；你手上那点旧往来，如今既可能是护身符，也可能是绞索。" +
      "有人说核心人物已开始互相指认，抢先交代的换轻判。你说出口的那一个字，保住或葬送的都是你自己的政治生命。",
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
    body: "听证落幕、定罪与宽免（总统对已定罪或待定罪者的赦免）交替登场，这桩丑闻渐渐并入「那个年代的一段插曲」。可对你的清算没完：本地要重新决定，还愿不愿跟一个「上过听证席的人」共事。\n" +
      "核心人物或被轻判、或被放过，是非在公众眼里已经模糊。你在链上的边缘角色本地人心里有数，只是没人先松口；" +
      "党机器正重新洗牌，你上一次的表态被拿来标今天的价。赌的是人心多久会忘——忘了，你便清白。",
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
      "你的电话被打爆：丢了半辈子积蓄的选民在问，作为「管钱的那个人」，你到底知不知道发生了什么。监管者自己也说不清原因。" +
      "本地那家券商和那家银行都在等「上面有人」发话稳局——它们也都是你的金主。有人说这只是技术性回调，下周就涨回来。你此刻镇定还是失态，会被记很久。",
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
    body: "一道误传的通告，让检查站涌入人山人海，守卫不知所措，墙在欢呼里被凿开。全球直播，香槟、锤子和拥抱。\n" +
      "「冷战还能撑多久」忽然成了人人都抢着回答的问题。电视台正向各地找「反应镜头」，" +
      "你社区里的东欧移民后代激动得彻夜敲门，把你当成那张现成的、懂他们的脸。有人说苏联会像往年一样把坦克开回街头。谁在这个节点说对了话，就被焊进这段历史。",
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
    body: "伊拉克大军一夜吞并科威特，萨达姆把世界最大的一批油田攥在手里。航母开进波斯湾，加油站的价格牌一天翻三回，队已经排到了街角。\n" +
      "联合国在倒计时要求撤军，白宫倾向动武，国会却还没投票授权。「要不要打、打得起打不起」这道题摆到全国面前——" +
      "你选区有征兵办公室、有油田相关的岗位，也有刚从海湾飞回来的家属。有人说这会是一场速战速决，打完就收兵。你现在押哪边，是看清还是随大流。",
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
    body: "经济回暖、人质回国、对手自乱阵脚。里根眼看要拿下四十几个州连任，共和党连带扫下一大批席位——媒体管这叫「月亮竞选」：借全国浪潮顺带当选，潮退时最先被冲走。\n" +
      "胜局已定，悬着的只是这股风能带走多少个位置。党部催你上台站台，上面在盘算把哪些席位分给出力的人，捐主要你上桌。" +
      "有人说这股风顶多再吹两年，第二任期的麻烦已经在路上。借来的光不是你的光——你的名字可能被当成「什么都没赢过」的证据。",
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
  * 1984-08 · 中西部农场拍卖潮 —— 土地价钱塌了，银行来收地（分层示范卡）
  *   #32⑤ 示范：同一史实、三种身份视角。选项级 when 用 tierRaw 直接写在 0—9 的
  *   真实层级上（不写 tierRaw 会被 when.js 抬进旧 6 档空间）。底 T0—3 自救、
  *   中 T4—6 办事、高 T7—9 定调；每档各留两条，玩家在任何一级都有得选。
  * ==================================================================== */
  {
    id: "rg84_farm", grade: "mid", category: "finance",
    valence: "risk", dyn: true,
    minYear: 1984, maxYear: 1984, scoped: true, tierRaw: true, tierMin: 0, weight: 12, unique: true,
    medium: ["print", "radio", "tv"], month: 8, day: 6,
    title: "县银行门口贴出拍卖单，一家的三代地按斤称",
    body: "粮价塌了，地价跟着塌，利率还压在头上。八月，县里又贴出一张拍卖单：一块三代人种的地，抵不上欠银行和联邦农业信贷局的两笔账。\n" +
      "中西部几个州刚争来抵押贷款展期——州法允许把到期的农贷往后推，先不被收地，但展期不是免债。联邦农业部长也宣布了一年宽限，" +
      "能不能落到这个县没人说得准。人群里有人哭，有人举着「银行家才是输家」的纸板。你在哪儿站着、说着什么，会被印在对手下一张传单上。",
    choices: [
      {
        id: "help_neighbor", text: "先去那家农场的谷仓：帮着把牲畜、农机和孩子的学杂费一件件安排掉",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        base: 0.62, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "base", w: 0.25 }],
        outcomes: {
          crit: { body: "你把一家的颜面保住了：机器连夜分存到邻居家，孩子没转学。镇上人不说你官大，说你是「那天在场的人」。", effects: { rep: 1.1, fac: { base: 9, church: 5 } } },
          ok: { body: "你跑了两夜，能帮的都帮上了。事情没变，但这家人记住了你。", effects: { rep: 0.5, fac: { base: 4 } } },
          meh: { body: "你去了，站着帮了会儿忙，说了句「有什么需要就来找我」。谁也没当真。", effects: { rep: 0.1 } },
          fail: { body: "你答应的事一件没办成，被问到时只能说「这个县的事我管不着」。", effects: { rep: -0.8, fac: { base: -5 } } },
          critfail: { body: "拍卖那天你在场，可你上车走了。第二周镇上开始流传你「怕被拍到和闹事的人站一起」。", effects: { rep: -1.8, fac: { base: -9, church: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "stand_with", text: "站到拍卖台前面：不吵不打，只让所有人看见你也在这儿",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        note: "赌的是「敢站」比「能说」值钱。赌错，你成了县银行名单上最难办的那个名字。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "fac", key: "labor", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "照片第二天上了州报：一个本地人站在举牌的人群前头。农场县开始把你当自己人。", effects: { rep: 1.4, fac: { labor: 8, base: 8, establishment: -4 } } },
          ok: { body: "你站住了，没说话，也没走。当地人口耳相传：「他没躲」。", effects: { rep: 0.6, fac: { base: 4, labor: 3 } } },
          meh: { body: "人太多，没人注意到你。你自己也觉得这更像一场表演。", effects: { rep: 0 } },
          fail: { body: "拍卖照走，你被银行界的朋友提醒「别把自己搭进去」。", effects: { rep: -0.7, fac: { commercial: -6 } } },
          critfail: { body: "现场有人砸了玻璃，你恰好在旁边被拍进画面。「煽动暴民」的帽子和「他不敢承认」的辩解一起送到。", effects: { rep: -2.2, fac: { commercial: -8, press: -6, establishment: -4 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "state_probe", text: "回州里开听证：把农业信贷局的地方办事处叫来，一县一县念账",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "establishment", w: 0.25 }],
        cost: { fun: 1.5 },
        outcomes: {
          crit: { body: "听证桌上摆出三十七户被同一份内部指示展期失败的家。州里被迫发出口头指令：收地暂缓，逐案复核。", effects: { rep: 1.6, attr: { INT: 1 }, fun: -1, fac: { labor: 8, base: 6, commercial: -5, establishment: 4 } } },
          ok: { body: "办事处来了人，念了两小时规则。什么都没改，但账第一次被摊在桌上。", effects: { rep: 0.6, fun: -1.5, fac: { base: 3, labor: 2 } } },
          meh: { body: "听证变成一次「程序已走完」的记录。钱花了，新闻只有一句。", effects: { rep: 0.1, fun: -2 } },
          fail: { body: "被传唤的机构请来了律师，反过来质询你收过谁的捐款。", effects: { rep: -1.4, fun: -2, fac: { press: -5, establishment: -3 } } },
          critfail: { body: "听证散会那天，你替自己选区争到的那笔纾困被查出走了熟人的账。「用公权做私事」上了州报头版。", effects: { rep: -2.6, fun: -2.5, fac: { press: -8, base: -6, establishment: -5 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "keep_credit", text: "护住本地的信贷：先保住银行不塌，才有钱借给明年的农民",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        note: "这话农民不爱听， banker 爱听。风险：你被记成「替收地的人说话」。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "commercial", w: 0.3 }],
        outcomes: {
          crit: { body: "你把话说在点上：坏账若把本地两家银行压垮，明年连种子钱都借不到。商会与农会各让了一步。", effects: { rep: 1.2, fac: { commercial: 9, establishment: 5, labor: -3 } } },
          ok: { body: "你的稳调子让银行界松了口气，农民骂你，但项目还在推进。", effects: { rep: 0.4, fac: { commercial: 5, base: -2 } } },
          meh: { body: "两头都没记住你的话，只记住你「谁也没帮」。", effects: { rep: 0 } },
          fail: { body: "那家银行秋天还是倒了，你的「保银行」变成一句现成的罪状。", effects: { rep: -1.5, fac: { base: -6, press: -4 } } },
          critfail: { body: "倒闭前一个月，你家人的账户往那家银行转过一笔钱。这个问题你要回答整整十年。", effects: { rep: -2.5, fun: -2, fac: { press: -8, base: -7 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "farm_bill", text: "在农业法案上投票：把债务重组、展期和拍卖通知期一起写进联邦条文",
        when: { tierRaw: true, tierMin: 7 },
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "labor", w: 0.2 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你争到的那一条成了整案的交换条件：联邦农业贷款机构必须给展期，收地前先公示。全国农业县记住了这个州的名字。", effects: { rep: 2, voters: { warm: 400 }, fac: { labor: 10, base: 8, establishment: 6, commercial: -4 }, flags: ["farm_champion"] } },
          ok: { body: "条文过了，被砍掉一半。展期是真的，钱是不够的。农民谢你，也骂你。", effects: { rep: 0.8, fac: { base: 4, labor: 3 } } },
          meh: { body: "你的名字在提案人后面第 47 位，法案在参院磨成了别的东西。", effects: { rep: 0.15 } },
          fail: { body: "案子死了。你花掉的信用换不回一块地，对手已经开始排练「他只会念稿」。", effects: { rep: -1.6, fac: { base: -6, establishment: -4 } } },
          critfail: { body: "为换票你在价格支持上松了口，两个阵营同日发声明：「他背叛了农民」。你的名字成了反面教材。", effects: { rep: -2.8, fac: { base: -10, labor: -6, press: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "national_line", text: "接住全国的话头：上节目替这届政府的农业政策辩护，说危机会过去",
        when: { tierRaw: true, tierMin: 7 },
        note: "全国版面很值钱，也很烫。风险：明年粮价再塌一次，这句话会回来找你。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "establishment", w: 0.3 }],
        outcomes: {
          crit: { body: "你讲得比华盛顿的人诚恳得多，节目播出后州里的捐款电话被打爆，上面把你当成能解释政策的那个人。", effects: { rep: 1.5, fac: { establishment: 10, commercial: 5, base: -3 }, flags: ["reagan_belt"] } },
          ok: { body: "你稳稳把话接住了。党满意，农民不买账，但你上了全国的短名单。", effects: { rep: 0.5, fac: { establishment: 6 } } },
          meh: { body: "你在镜头前说了三分钟，没人记得你说过什么。", effects: { rep: 0 } },
          fail: { body: "主持人拿本地拍卖单追问你，你答不上那个县的名字。「他没见过那张纸」剪成片段循环播。", effects: { rep: -1.5, fac: { press: -6, base: -5 } } },
          critfail: { body: "你说「危机会过去」的第二周，这个州又有一家人在拍卖台上自杀。那段录像从此跟着你。", effects: { rep: -3, fac: { base: -12, press: -8, establishment: -3 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1985-11 · 日内瓦峰会 —— 两位领袖关起门谈了五个半小时（分层示范卡）
   *   与 110 里的 rg85_plaza（经济）互为同年两张钉卡：一场在酒店里按下去美元，
   *   一场在湖畔别墅里按下核。头版图 era-1985.jpg 归这张（报眼就是 GENEVA SUMMIT）。
   * ==================================================================== */
  {
    id: "rg85_geneva", photo: "era-1985.jpg", grade: "major", category: "foreign",
    valence: "risk", dyn: true,
    minYear: 1985, maxYear: 1985, scoped: true, tierRaw: true, tierMin: 0, weight: 12, unique: true,
    medium: ["tv", "print", "radio"], month: 11, day: 19,
    title: "日内瓦：没有协议，但两个人说还要再谈",
    body: "十年不欢的峰会，忽然就成了。两位领袖在日内瓦关起门谈了五个半小时，从核武谈到「星球大战」——那套设想用天基拦截挡住核打击的防御计划，正是这一轮谈不拢的地方。最后没签一个字，只约定下一轮更快、更实。\n" +
      "电视把两人并肩走路的画面循环了一整天。本地的军工厂和大学里同时被拨动两根神经：一根怕裁军砸饭碗，一根怕核战砸掉一切。" +
      "你身边的人开始问你：你站哪一边。你今天替哪句话背书，四年后就要替它解释。",
    choices: [
      {
        id: "watch_local", text: "看住本地那根弦：给军工厂和基地写信，说「什么都没变，别慌」",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.3 }, { src: "fac", key: "military", w: 0.3 }],
        outcomes: {
          crit: { body: "你的短信把一场全国恐慌按住了：基地照常开工，订单没撤。厂方和镇民都认你这个「懂分寸的人」。", effects: { rep: 1.1, fac: { military: 8, commercial: 4, base: 3 } } },
          ok: { body: "你把话说稳了，没人再传「裁军要砸我们的饭碗」。", effects: { rep: 0.5, fac: { military: 4 } } },
          meh: { body: "信发了，没人回。大家都忙着自己的猜测。", effects: { rep: 0.05 } },
          fail: { body: "两周后一笔转产评估被本地报翻出来，你的「什么都没变」显得像没做功课。", effects: { rep: -0.8, fac: { labor: -4, press: -3 } } },
          critfail: { body: "工厂真关了，而你把话说得太早。失业者举着你的话堵在党部门口。", effects: { rep: -1.9, fac: { labor: -8, base: -5, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "freeze_local", text: "趁这口气办一场本地核冻结集会：把「和平」做成你能主持的事",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        note: "街头能量真实，也真实地被两党各自记账。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "教堂和学校把场地给了你，镇厅挤满了人。本地第一次觉得「外交」这件大事自己也插得上话。", effects: { rep: 1.3, fac: { base: 9, church: 7, establishment: -5 } } },
          ok: { body: "集会平稳办成，报上有一栏你的照片。", effects: { rep: 0.5, fac: { base: 4, church: 3 } } },
          meh: { body: "来了一半人。你意识到这场会主要是给自己开的。", effects: { rep: 0.1 } },
          fail: { body: "有人把集会说成「替对面张目」，你的名字第一次出现在保守派的名单上。", effects: { rep: -0.9, fac: { establishment: -5, church: -3 } } },
          critfail: { body: "集会上有人烧了征兵卡，警察带走人时镜头全对准你。这一晚足够毁掉一条仕途。", effects: { rep: -2.2, fac: { military: -10, establishment: -7, press: -5 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "back_summit", text: "公开替峰会背书：把「愿意坐下来谈」讲成本党该有的样子",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "establishment", w: 0.25 }],
        outcomes: {
          crit: { body: "你的话被全国引用了一次，两党都需要一个「会谈也敢谈」的人，你排进了那个短名单。", effects: { rep: 1.5, fac: { establishment: 9, press: 5, base: 3 } } },
          ok: { body: "你把一件还没结果的事讲成了方向。温和派满意，鹰派记了一笔。", effects: { rep: 0.6, fac: { establishment: 4, press: 2 } } },
          meh: { body: "声明发出去，被埋在峰会花絮新闻里。", effects: { rep: 0.1 } },
          fail: { body: "峰会没有下文，你的「方向」变成一句空话，还被对手剪成了短片。", effects: { rep: -1.1, fac: { press: -4, base: -3 } } },
          critfail: { body: "下一轮谈崩了，你在镜头前说过的「几乎要成了」被一字一字回放给你听。", effects: { rep: -2.1, fac: { establishment: -6, press: -7 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "press_spend", text: "反过来逼问：峰会再漂亮，也要先把本地基地的防护与预算摊开讲",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        note: "把国家议题拉回本地账，是地方官最稳的打法；也最容易被骂「不懂大局」。",
        base: 0.55, mods: [{ src: "attr", key: "INTG", w: 0.35 }, { src: "fac", key: "military", w: 0.2 }],
        outcomes: {
          crit: { body: "你把「握手之前先修好掩体」讲成了本地共识，军方与镇民同时接了你的账。", effects: { rep: 1.3, attr: { INTG: 1 }, fac: { military: 7, base: 5, establishment: 3 } } },
          ok: { body: "你争到一次现场视察，新闻说你这人「实在」。", effects: { rep: 0.55, fac: { military: 4, base: 2 } } },
          meh: { body: "你的追问被归进「地方抱怨」，没人接。", effects: { rep: 0.05 } },
          fail: { body: "「他在峰会上泼冷水」这句话从华盛顿传下来，党里开始给你贴标签。", effects: { rep: -1, fac: { establishment: -5, press: -3 } } },
          critfail: { body: "你坚持公开的那份防护清单被认定涉密，一纸警告寄到你办公室。", effects: { rep: -2, fac: { military: -8, establishment: -6, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "arms_framework", text: "在上一层做局：推动一整套核查与通报机制，把「不再见面」变成制度",
        when: { tierRaw: true, tierMin: 7 },
        base: 0.48, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "establishment", w: 0.25 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你搭的那份跨党框架成了下一轮谈判的底稿。史书写到这一步时，你的名字在脚注里。", effects: { rep: 2.1, voters: { warm: 300 }, fac: { establishment: 11, press: 7, base: 4 }, flags: ["statesman"] } },
          ok: { body: "机制通过了一半，但「两个人谈完还得有制度接住」这句话站住了。", effects: { rep: 0.9, fac: { establishment: 6, press: 3 } } },
          meh: { body: "你的方案在委员会里躺了半年，最后被并进出口的另一份文本。", effects: { rep: 0.15 } },
          fail: { body: "两党都嫌你多事：白宫要自由裁量，对手要立刻裁军。你两头不落地。", effects: { rep: -1.5, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "你替一桩私下换好处的军控条款说话，正好赶在雷克雅未克谈崩之后。你成了「拿国家安全做交易」的标本。", effects: { rep: -3, fac: { press: -10, establishment: -6, military: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "red_phone", text: "只管把风险按住：主张先建直通通信与事故通报，裁军以后再说",
        when: { tierRaw: true, tierMin: 7 },
        note: "最不像成果的成就，也最不容易被打脸。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "military", w: 0.25 }],
        outcomes: {
          crit: { body: "一场误传的火箭预警之后，你的「先通电话」成了全场唯一能立刻做的事。两党一致通过。", effects: { rep: 1.6, attr: { INT: 1 }, fac: { military: 9, establishment: 6, press: 4 } } },
          ok: { body: "你把这个不性感的东西做了出来：一条热线，一份事故清单。", effects: { rep: 0.7, fac: { military: 5, establishment: 3 } } },
          meh: { body: "热线的旧机器修好了，没人庆祝。", effects: { rep: 0.1 } },
          fail: { body: "有人讥笑你「只会修电话」。你的谨慎被当成没有想象力。", effects: { rep: -1, fac: { press: -4, base: -3 } } },
          critfail: { body: "热线真出了一次故障，而你曾保证它从不断。听证会开了整整一天。", effects: { rep: -2, fac: { establishment: -6, military: -7, press: -5 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1988-11 · 大选交接 —— 「里根之后」的第一把火
   * ==================================================================== */  {
    id: "rg88_election", photo: "era-1988.jpg", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 1988, maxYear: 1988, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "print", "radio"], month: 11,
    title: "总统两届将满，继任之争把整个党撕成两半",
    body: "总统两届不能再选，继任之争（现任不能连任时，党内围绕接班路线的争夺）把整个党撕成两半：举着里根大旗要「延续」的副总统布什，对上要「翻新」的党内挑战者；" +
      "对手那边，马萨诸塞州长杜卡基斯把「和平与繁荣」挂在嘴边，想把这八年的功劳一并接走。\n" +
      "你这一层的人被迫选边。这一回没有里根的光环罩着，地方上没人再能白搭顺风车，一票一票都得自己挣。" +
      "赌错了方向，再没人替你兜底——他们只会问：你这一站是有主张，还是只会跟风。",
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
    body: "松绑的狂欢散场：一批储贷（专做储蓄与住房贷款的小银行）相继倒闭，联邦要纳税人掏钱填这个窟窿。" +
      "检察官开始挨个查「当初是谁替它把路踩平的」，已有同僚被传唤，名单上下一个是谁没人敢说。\n" +
      "你当年在董事会挂的那个名、那份「专业意见书」，在他们的文件里原样留着，如今装进一个牛皮纸档案袋，袋上写着你的名字。" +
      "有人说上面要拿几个边缘挂名的开刀，好保住大鱼。这个袋子合还是开，看你先迈哪一步。",
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
    body: "德黑兰的学生占领了美国使馆，五十多名美国人被扣已半年。深夜突袭的直升机与运输机在沙漠集结点相撞起火，八名军人葬身异域的沙丘——行动还没碰上人质就已失败。\n" +
      "电视反复播放燃烧的残骸，举国憋了半年的窝囊气一夜点燃。白宫把失败推给沙尘和机械故障，没几个人信。" +
      "本地也有一户人家刚接到阵亡通知书——你怎么去敲那扇门，街坊会记很多年。",
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
    body: "一句大白话问进千家万户的客厅，卷走四十几个州，共和党几十年头一回夺回参议院，「沉默的大多数」第一次被点名为一支力量——" +
      "里根把保守派和宗教右翼攒成了一个新联盟，这版图的改写，有人说一画就是二十年。\n" +
      "潮水转向的夜里，本地两拨人都在等你表态：建制想对冲，基层想跟上。你站哪边，未来十年的资源就从哪边流向你——这一夜你押的边，会是你档案里最显眼的一笔。",
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
    body: "柏林一家夜总会爆炸、死了美军士兵，华盛顿指认是卡扎菲策动，深夜空袭的黎波里与班加西，还炸死了他的养女。当晚多数民众拍手，说终于硬回了一回。\n" +
      "国会吵翻了：宣战权在国会、统帅权在总统，总统能不能不宣而战？批评者说这一炸还把海外的人质置于报复风险。本地派出去的兵，此刻正从海外基地起飞。" +
      "你被记者堵在门口，要一句表态——你今晚站哪边，会被翻出来很久。",
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
    id: "rg87_wall", photo: "era-1987.jpg", grade: "major", category: "foreign",
    valence: "risk", dyn: true,
    minYear: 1987, maxYear: 1987, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "radio", "print"], month: 6,
    title: "总统隔着一堵墙喊话：「把它拆了」",
    body: "勃兰登堡门——柏林墙旁那道象征冷战分裂的门——前，美国总统点名对着墙那头的对手喊话，要他「推倒这道墙」。全球镜头齐刷刷对准这里。\n" +
      "墙那头刚上来一位年轻的改革者，说话方式和前任不一样；同一年，削减欧洲中程核武器的秘密谈判正悄悄推进。" +
      "本地电视台又要你那一句：这是勇气，还是逞口舌之快？你今天的这句话，要等历史转弯时才见高下。",
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
  /* #32④：1984 原本全年只有一张钉卡（密度门禁要求每年 ≥2）——补农场拍卖潮这张 */
  { event: "rg84_farm", year: 1984, month: 8, grade: "mid" },
  { event: "rg85_plaza", year: 1985, month: 9, grade: "mid" },
  /* #32④：1985 同上补日内瓦峰会；era-1985.jpg 从广场协议移交给它（报眼即 GENEVA SUMMIT） */
  { event: "rg85_geneva", year: 1985, month: 11, grade: "major" },
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
