/* ============================================================================
 * CONTENT · events/128-line-2022-24.js
 * 连续时间轴 · 2022—2024 定点大事件（Track B9，worker w11）。
 *
 * 形制照 110-line-1980s.js：不写 era，一律 minYear/maxYear + scoped；
 * 每张卡在文件末尾的 POTUS.define("fixed", …) 里钉死年月量级；
 * worldline 按年补 pressure/brief/outlets（引擎按字段深合并，不顶别的年带）。
 *
 * 这是玩家亲身经历的近三年：日期、程序、机构一律按史实写；立场与后果留给虚构。
 * 真人一律用职务称谓（总统/前总统/州长/众议院议长），不写姓名。
 * 引号只用「」；每卡一个无 cost 无 req 的保底项；经济只写系数（dyn:true）。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2022-05 · 尤瓦尔迪小学枪击 —— 二十一具灵柩与七十二分钟（本带最高优先级）
   * ==================================================================== */
  {
    id: "ln22_robles", grade: "major", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2022, maxYear: 2022, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 14, unique: true,
    medium: ["tv", "cable", "social", "shortvideo"], month: 5,
    title: "州里的小学响起枪声，十九个孩子没回家",
    body: "得州尤瓦尔迪，周三上午：一个步枪手走进三年级教室。十九个孩子、两名老师留在学校里——而全副武装的边境巡警在走廊外守了七十几分钟才破门。\n" +
      "你所在的选区今晚有烛光守夜。本地台要你说第一句话；党部要你「先别谈政治」。蜡烛一周就熄，问题不会。",
    brief: {
      lede: "枪声之后的每一句话，都会被拿死难者的脸来称重量。",
      known: [
        "死者二十一人：十九个孩子、两名老师；枪手已被击毙在校内。",
        "武装警察在走廊外守了七十几分钟才进去，指挥链当场乱套。",
        "本州拥枪传统深厚，党团办公室就挨着州议会。"
      ],
      rumor: [
        "有人说州议会早备好了应对法案，只等有人带头鼓掌。",
        "有人说联邦那条线这周的表态，直接写进捐款账本。"
      ],
      unknown: [
        "调查报告会把指挥链公开处刑。",
        "你扶哪条法案，是党鞭记下的第一笔。"
      ],
      terms: [{ k: "党团", v: "美国最有分量的拥枪游说团体。" }]
    },
    choices: [
      {
        id: "hold", text: "在镇上帮家属料理后事与心理救助，不谈枪支", note: "赌的是人情能分辨敬意与作秀。风险：被骂「沉默的帮凶」。",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你连续一周守在家属门口，没说一句口号。有人把「他做了实事」的帖子顶上了本地热榜。", effects: { rep: 1, fac: { base: 8, church: 5 } } },
          ok: { body: "你帮家属把抚恤与转诊跑通了，没人挑你的错，也没人记得你的话。", effects: { rep: 0.5, fac: { base: 4 } } },
          meh: { body: "你去了守夜，站在后排。没人注意到你来过。", effects: { rep: 0.1 } },
          fail: { body: "有人举着死去孩子的照片问你「今天你打算做什么」，你答得很官腔。", effects: { rep: -0.5 } },
          critfail: { body: "你帮忙联络殡仪馆的照片被拍下来，配文「他急需这些尸体」。你从未想过讣告能变成传单。", effects: { rep: -1, fac: { press: -4, base: -3 } } }
        }
      },
      {
        id: "ban", text: "趁本地怒势，把联邦禁攻枪与背景审查推上议程", note: "赌的是蜡烛能点亮全国浪潮。风险：在拥枪州你会上黑名单。",
        base: 0.44, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "base", w: 0.25 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你的名字和孩子们的名单一起念了出来。全国街头把这场立法浪潮叫成他们的名字，你也成了浪潮的一部分。", effects: { rep: 1.75, fac: { base: 10, press: 8, establishment: -8 }, voters: { warm: 300 } } },
          ok: { body: "你替街头的愤怒找到了出口，另一边开始印你的「反面教材」。", effects: { rep: 0.8, fac: { base: 6, press: 5, establishment: -5 }, voters: { warm: 150 } } },
          meh: { body: "你喊了口号，法案照旧卡在参议院。愤怒降温比汽油挥发还快。", effects: { rep: -0.2 } },
          fail: { body: "本党操盘的人公开抱怨「他在给深南州挖坟」；你的献金名单开始漏风。", effects: { rep: -2.25, fac: { establishment: -10, press: -4 } } },
          critfail: { body: "一条被剪过的发言卷土重来：「孩子们很快就会被缴枪」。你从没说过后半句，也没人听后半句。", effects: { rep: -3, fac: { establishment: -12, press: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "secur", text: "飞州府：推校园安保与心理师拨款，绕开枪本身", note: "赌的是「做成小事」胜过「吵赢大架」。风险：两头都骂你回避。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        cost: { fun: 1 },
        outcomes: {
          crit: { body: "你把锁门预算与驻校心理师打包谈成，州长签字时念了你的名字。家长谢你，两边骂你滑头——但账面上孩子安全了。", effects: { rep: 1.25, attr: { INT: 3 }, fac: { establishment: 8, commercial: 4 } } },
          ok: { body: "法案过了，钱不多，名字留下了。党团替你「没碰枪」记了一分好。", effects: { rep: 0.5, attr: { INT: 2 }, fac: { establishment: 5 } } },
          meh: { body: "你磨出一笔听证经费，新闻没你的位置。", effects: {} },
          fail: { body: "安保拨款被捆进争议条款夭折了。有人说你「花钱买了个体面，买了个寂寞」。", effects: { rep: -1.5, fac: { commercial: -6, press: -3 } } },
          critfail: { body: "你游说议员的酒局照片流出，背景里是党团的大金主。「走廊外那七十几分钟」被拿来与你那晚对比。", effects: { rep: -2.5, fac: { press: -6, base: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2022-06 · 多布斯判决推翻罗伊 —— 半个国家的规则一夜改写
   * ==================================================================== */
  {
    id: "ln22_dobbs", grade: "major", category: "civil",
    valence: "risk", dyn: true,
    minYear: 2022, maxYear: 2022, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 14, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 6,
    title: "联邦最高法院推翻了五十年的先例",
    body: "五月初，泄漏的判决书草稿让九位大法官的天平先漏了底；六月下旬，判决落地：近五十年的联邦宪法保护戛然而止，南方十几个州的「触发法」当天生效。\n" +
      "你选区就有一家有几十年历史的女性诊所。本地两派的电视台都架着机器等你：「庆祝生命」还是「捍卫选择」，一句就够给整张选票定价。",
    brief: {
      lede: "一个判决把国家劈成两套规则，另一半永远不打算认账。",
      known: [
        "联邦层面的宪法保护已终结，交由各州立法裁决。",
        "十余州的触发法已生效，诊所连夜开始转诊。",
        "党部一天两个电话催你表态：中期选举要靠这道题动员。"
      ],
      rumor: [
        "有人说白宫在准备行政令，部分绕开州禁令。",
        "有人说首席大法官本想收窄判决，泄漏全打乱了。"
      ],
      unknown: [
        "跨州购药与远程医疗的灰色通道将撑多久。",
        "十一月的投票率会被这道题抬高一大截。"
      ],
      terms: [{ k: "罗伊案", v: "1973 年确立堕胎权保护的里程碑判决。" }]
    },
    choices: [
      {
        id: "narrow", text: "只讲个人立场，转身谈本地的孕产补助预算", note: "赌的是潮水里耐心比快话值钱。风险：两头都记得你滑。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你没有接「审判」的剧本，预算却真落下去了。两个阵营都不满意，两个诊所都还会接你的电话。", effects: { rep: 0.3 } },
          ok: { body: "你把最烫的问题降温成一份预算，没加分也没减分。", effects: { rep: 0.2, fac: { base: 2 } } },
          meh: { body: "全国在吵，你在开会。新闻里没有你。", effects: { rep: 0.05 } },
          fail: { body: "两边都把你的「不表态」剪成证据。「他不敢说」成了一句免费的攻击词。", effects: { rep: -0.2, fac: { press: -1 } } },
          critfail: { body: "你私下劝一位捐主别打堕胎广告，录音被交给对立阵营。你这才发现两边都在装麦。", effects: { rep: -0.25, fac: { establishment: -1 } } }
        }
      },
      {
        id: "welcome", text: "公开欢迎判决，接住宗教右翼的掌声", note: "赌的是这条议题就是基本盘的第一优先级。风险：郊区中间人记账到十一月。",
        base: 0.44, mods: [{ src: "fac", key: "church", w: 0.35 }, { src: "attr", key: "CUN", w: 0.25 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "判决当天你就站在州议会台阶上。教会网把你当自己人，党团名单第一次有了你的名字。", effects: { rep: 1.6, fac: { church: 12, establishment: 6, base: -8 }, voters: { warm: 300 } } },
          ok: { body: "你站对了眼下的队。掌声是真的，郊区捐款人的退信也是真的。", effects: { rep: 0.7, fac: { church: 7, establishment: 3, base: -5 } } },
          meh: { body: "你说了欢迎的话，风头被更纯熟的口号盖过。", effects: { rep: -0.15 } },
          fail: { body: "诊所关停的名单上了本地报，你的「庆祝生命」被并排印在旁边。", effects: { rep: -2.2, fac: { base: -10, church: 3 }, flags: ["scandal_1"] } },
          critfail: { body: "「保障孕产」是你判决夜的承诺，十个月后还停在口头。本地报把承诺剪成广告循环播放。", effects: { rep: -3, fac: { base: -12, press: -6, church: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "codify", text: "把翻案变成主线：推动联邦法典化，动员年轻人", note: "赌的是愤怒的潮水能漫过中期选举。风险：浪潮不来，你就是最大声的那个。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.25 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你的口号成了今年投票站的现实：年轻选民第一次为一道司法题排队。你被写进「谁点燃了它」的报道里。", effects: { rep: 1.75, fac: { base: 8, press: 6, church: -8 }, voters: { warm: 600 } } },
          ok: { body: "你为这场动员署了名，议题追着你——也抬着你。", effects: { rep: 0.8, fac: { press: 4, church: -5 }, voters: { warm: 250 } } },
          meh: { body: "你喊了法典化，参议院规则先把路堵死。街头散场比聚场快。", effects: { rep: -0.15 } },
          fail: { body: "对手把选情崩盘归因于你的激进姿态，党机器悄悄把你的名字往后挪。", effects: { rep: -2.25, fac: { base: -8, press: -4 } } },
          critfail: { body: "你办公室给激进组织透风的备忘录被公开。教会网从此把你当反面标本养。", effects: { rep: -3.2, fac: { church: -12, press: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2022-07 · CPI 破九与央行连环加息 —— 物价是每一个家庭的选举
   * ==================================================================== */
  {
    id: "ln22_cpi", grade: "mid", category: "finance",
    valence: "bane", dyn: true,
    minYear: 2022, maxYear: 2022, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 12, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 7,
    title: "通胀冲上四十年新高，央行连环加息",
    body: "六月 CPI 同比 9.1%——四十年来最高，七月十三日公布。油价破五块，房贷利率跟着央行的锤子上蹿。白宫说峰值已过、风向要转，本地加油站的价格牌不认这句话。\n" +
      "镇民大会上坐满了算账算到发火的人。他们不问你什么是通胀，问你：谁的错，你打算怎么办。",
    brief: {
      lede: "对每个家庭来说物价就是选举，谁先定义痛苦谁就赢。",
      known: [
        "六月 CPI 同比 9.1%，为四十年来最高；工资没跟上。",
        "央行连续多次大幅加息，房贷利率一年翻了一倍。",
        "白宫放风「峰值已过」，但汽油与房租还在爬。"
      ],
      rumor: [
        "有人说央行行长私下已想松口，秋天降档。",
        "有人说十一月前会放出战略储备压低油价。"
      ],
      unknown: [
        "加息的代价明年初才轮到就业市场还。",
        "你站哪一边，都会被做成对比广告。"
      ],
      terms: [{ k: "基点", v: "利率的百分之一；75 基点即加 0.75%。" }]
    },
    choices: [
      {
        id: "listen", text: "开镇民大会把账单听完，先落实本地能源补助",
        base: 0.57, mods: [{ src: "attr", key: "INTG", w: 0.35 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你把取暖补助与食物银行的钱真跑了下来。镜头说「他至少肯把话说完」。", effects: { rep: 1.1, fac: { base: 8, labor: 6 } } },
          ok: { body: "你挨家挨户把火听完，没解决问题，也没添乱。", effects: { rep: 0.4, fac: { base: 4, labor: 3 } } },
          meh: { body: "会开了三小时，你成了现场背景。", effects: { rep: 0.05 } },
          fail: { body: "有人问「所以呢」，你答成了念通稿。", effects: { rep: -0.5 } },
          critfail: { body: "散场时有人朝你手里塞了一张退租通知。那张照片比你任何声明都诚实。", effects: { rep: -1, fac: { base: -3 } } }
        }
      },
      {
        id: "gouge", text: "把火引向炼油厂「牟取暴利」：要超额利得税", note: "赌的是加油站的怒火比投票箱的算计大。风险：金主与专业名声两头烧。",
        base: 0.45, mods: [{ src: "fac", key: "base", w: 0.35 }, { src: "attr", key: "CUN", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "超额利得税的提案被各州接力，你成了「敢对石油开口」的那个人。基层与工会记你这一份。", effects: { rep: 1.6, fac: { base: 10, labor: 5, commercial: -12 }, voters: { warm: 400 } } },
          ok: { body: "你替加油排队的人骂了出来。能源股开始拿你做反面教材。", effects: { rep: 0.7, fac: { base: 6, commercial: -6 }, voters: { warm: 150 } } },
          meh: { body: "你骂了石油，税案胎死腹中。谁都没把你的话当真。", effects: { rep: -0.1 } },
          fail: { body: "提案被算出会推高本州物价，你从「代言人」变成「不懂经济的人」。", effects: { rep: -2.25, fun: -0.8, fac: { commercial: -10 } } },
          critfail: { body: "金主反手把你当年拿能源献金的记录翻出来：「他好意思谈暴利？」。", effects: { rep: -3, fun: -1.5, fac: { commercial: -12, base: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "fed", text: "力挺央行加息到底：宁可疼也不能养通胀", note: "赌的是选民会谢那个放血的人。风险：衰退之年你的话会被挂在门上。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.45 }],
        outcomes: {
          crit: { body: "通胀当年冬天见顶回落，「疼一次好过年年涨」成了你名片。建制与金融圈记住了你的清醒。", effects: { rep: 1.25, attr: { INT: 2 }, fac: { establishment: 8, commercial: 6, labor: -8 } } },
          ok: { body: "你顶住了骂声，站对了行情。基层觉得你站在银行那边。", effects: { rep: 0.5, attr: { INT: 1 }, fac: { establishment: 5, labor: -4 } } },
          meh: { body: "你说了正确而不讨好的话，两头都没接。", effects: { rep: -0.1 } },
          fail: { body: "利率压垮了本地房市，选民记得是你盼着加息。", effects: { rep: -2.1, fac: { labor: -10, base: -6 } } },
          critfail: { body: "裁员潮里你的「长痛不如短痛」被印满反对派传单。你的名字和失业办公室排在一起。", effects: { rep: -2.8, fac: { labor: -12, base: -8 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2022-11 · 中期选举 —— 「红潮」只漫到脚踝
   * ==================================================================== */
  {
    id: "ln22_midterm", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2022, maxYear: 2022, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 12, unique: true,
    medium: ["tv", "cable", "social", "shortvideo"], month: 11,
    title: "中期选举：预期中的红潮只涨到脚踝",
    body: "十一月八日，出口民调本该讲一个浪潮故事。结果是：总统所在党在参院反增席位，众院以极微弱多数易手，佐治亚要等十二月的决胜轮定参院归属。\n" +
      "你押了潮水的人此刻得重新读表：一场没输光的败选，一场没赢到的胜。剩下的账，都是自己的。",
    brief: {
      lede: "浪潮落空的夜晚，清算比败选之夜更狠。",
      known: [
        "红潮没来；参院五五开，悬在佐治亚十二月决胜轮。",
        "委员会席位要等新国会一月开席才分。",
        "两党数据组都在连夜复盘，先找到病灶的人先掌舵。"
      ],
      rumor: [
        "有人说年轻人投票率被一个判决拉高了两成。",
        "有人说计票口径又被改了，赢的那方要等州法院。"
      ],
      unknown: [
        "这读数将定义 2024 两条初选路。",
        "你今晚的定位就是下轮的起拍价。"
      ],
      terms: [{ k: "中期选举", v: "总统任期过半时的国会改选。" }]
    },
    choices: [
      {
        id: "ownlane", text: "不掺和全国胜负解读：只兑现地方承诺", note: "赌的是本地账本比全国行情硬。风险：洗牌时没人替你说活。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "全国的清算吵成一片，你把本地三件事做完了。两年后有人翻账，你的名字在「干活的」那一栏。", effects: { rep: 0.25, fac: { base: 3 } } },
          ok: { body: "你没蹭浪也没背锅。这种夜晚，不显眼就是资产。", effects: { rep: 0.2, fac: { base: 1 } } },
          meh: { body: "计票直播与你无关，你早就去睡了。", effects: { rep: 0.05 } },
          fail: { body: "有人说「选情这样他还闷声」，是在躲什么。", effects: { rep: -0.2 } },
          critfail: { body: "你想两边不得罪，两边都把你从「可培养名单」里划掉了。", effects: { rep: -0.3, fac: { establishment: -1 } } }
        }
      },
      {
        id: "carry", text: "把真金与名字押给全国 tide：替每一县催票", note: "赌的是浪虽小仍把你推上岸。风险：浪不来，只有你付了钱。",
        base: 0.42, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "fac", key: "establishment", w: 0.25 }],
        cost: { fun: 2 },
        outcomes: {
          crit: { body: "「他输也得票」成了你的招牌。党机器复盘时唯一舍不得裁的人就是你。", effects: { rep: 1.75, fac: { establishment: 12, commercial: 5 } } },
          ok: { body: "你的巡回站台没扭转全国，但收据都收进了党内档案。", effects: { rep: 0.7, fac: { establishment: 6 } } },
          meh: { body: "钱花完，浪没来。党的感谢信写得很短。", effects: {} },
          fail: { body: "败选清算第一个问「谁替这些候选人站台收钱」。你上了清单。", effects: { rep: -2.4, fun: -1, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "「他押注输家」上了对手筹款邮件。你花大钱买了个负资产。", effects: { rep: -3.2, fun: -1.8, flags: ["scandal_1"] } }
        }
      },
      {
        id: "hedge", text: "留一道后门：与对方的人保持往来，不把桥烧掉", note: "赌的是佐治亚与两年后的胜负都没定。风险：两头都记得你两副面孔。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        outcomes: {
          crit: { body: "计票夜两边都有人替你说话。在新旧国会交接的灰色名单里，你提前占了格。", effects: { rep: 0.3, lev: 1, fac: { press: 4, commercial: 3 } } },
          ok: { body: "你不声不响留了两条线。暂时没人用得上，也没人用得着伤害你。", effects: { rep: 0.25, fac: { press: 3 } } },
          meh: { body: "你两头寒暄，两头都没往心里去。", effects: { rep: 0.05 } },
          fail: { body: "你「两边通吃」的名声先到了。本党开始查你的捐款去向。", effects: { rep: -1.2, fac: { establishment: -5 } } },
          critfail: { body: "一条你私下示好对手的短信被截给本党媒体。你两头不是人，名字上了「不可信任」清单。", effects: { rep: -1.8, fac: { establishment: -6, base: -3 }, flags: ["party_traitor"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2023-03 · 硅谷银行倒闭与存款大搬家 —— 四十八小时塌掉一行招牌
   * ==================================================================== */
  {
    id: "ln23_svbu", grade: "mid", category: "finance",
    valence: "risk", dyn: true,
    minYear: 2023, maxYear: 2023, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 12, unique: true,
    medium: ["internet", "social", "tv", "cable"], month: 3,
    title: "科技公司的开户银行四十八小时倒闭",
    body: "周三，母公司公告卖资产补缺口；周四一天被提走约一千亿美元；周五监管进门接管——全美第十六大银行，两天塌掉。随后一个周末另一家银行也进去了，又一天，财政部与央行宣布「系统性风险」例外——全部存款兜底。\n" +
      "你选区科技镇上的创始人打来电话：工资到底该发在哪张卡里。存款早几个月就朝 5% 的货币基金搬家了，这次只是没人再假装没事。",
    brief: {
      lede: "当「不会倒的银行」倒了，最先跑掉的永远是聪明钱。",
      known: [
        "它排全美第十六大行，九成以上存款超保险线。",
        "储户单日提走约一千亿美元，次日监管接管。",
        "官方宣布兜底全部存款，另一家银行同周末关闭。"
      ],
      rumor: [
        "有人说监管名单上还挂着两三家，每晚说法不同。",
        "有人说兜底权限日后必被国会审计翻案。"
      ],
      unknown: [
        "信贷收紧会把裁员推到下个季度。",
        "你替谁稳住的钱，会被人记得很久。"
      ],
      terms: [{ k: "系统性风险例外", v: "监管为防挤兑兜底全部存款的紧急口径。" }]
    },
    choices: [
      {
        id: "steady", text: "去银行门口安抚储户：存款受保，别信谣言", note: "赌的是你能当本地最可信的那个人。风险：安抚失败你就是谣言。",
        base: 0.57, mods: [{ src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你在被围的分行门口开了一场记者会，数字全部核实，镇上没人挤兑。央行检查员难得道谢。", effects: { rep: 0.25, fac: { commercial: 2, agency: 1 } } },
          ok: { body: "你安抚得体的话没出错，队伍真的退了。", effects: { rep: 0.2, fac: { commercial: 1 } } },
          meh: { body: "你去了，说不上关键的话。第二天该跑的钱还是跑了。", effects: { rep: 0.05 } },
          fail: { body: "你说「保险线以下没问题」，当晚有企业发现工资账户在界线以上。", effects: { rep: -0.25, fac: { commercial: -2 } } },
          critfail: { body: "分行门口安抚的照片被贴进集体诉讼：「他保证过，一起告」。", effects: { rep: -0.25, fac: { base: -2 } } }
        }
      },
      {
        id: "move", text: "替本地企业把存款搬去「安全港」：你引荐的大行", note: "赌的是搬钱的人两头欠你情。风险：出事时你就是那个「早知风声」。",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "tech", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "你把整条街的科技账搬进你担保的大行，基金与银行的感谢名单都有你。", effects: { rep: 0.8, fun: 3, fac: { tech: 8, commercial: 8, labor: -6 } } },
          ok: { body: "钱安全了，佣金与好意也是真的。", effects: { rep: 0.3, fun: 1.5, fac: { commercial: 6, tech: 4, labor: -4 } } },
          meh: { body: "你搬了几家，剩下的没信你。人情花了，两头没落实。", effects: { fun: 0.2 } },
          fail: { body: "搬家的钱卡在开户审查里，发不出工资。企业开始怀疑你拿了回扣。", effects: { rep: -1, fun: -1, fac: { base: -8 } } },
          critfail: { body: "引荐费曝光：你在恐慌里替自己揽储。科技圈记仇比记恩久。", effects: { rep: -2.2, fun: -2, fac: { base: -10, tech: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "audit", text: "追监管的松绑账：问责为什么没人查长期债亏损", note: "赌的是把专业变成审判能立住。风险：机构记住你点名的人。",
        base: 0.47, mods: [{ src: "attr", key: "INT", w: 0.45 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你把「5% 利率、满手长期债」讲成一门可审的学问。调查主席邀你坐证人席，媒体给你留了固定席位。", effects: { rep: 1.75, attr: { INT: 3 }, fac: { press: 8, agency: -10 } } },
          ok: { body: "你的问责信成了早报标题，监管的口径松了一寸。", effects: { rep: 0.8, attr: { INT: 2 }, fac: { press: 5, agency: -5 } } },
          meh: { body: "你引经据典，听证排期排到明年。", effects: {} },
          fail: { body: "你把两家小银行错归进同一份名单，律师函替你上了一遍全国新闻。", effects: { rep: -2.2, fac: { agency: -10, establishment: -5 } } },
          critfail: { body: "你被查到替某家接盘机构说过话，问责者成了被问责的。", effects: { rep: -3, fac: { press: -10, establishment: -6 }, flags: ["investigation_open"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2023-05 · 债务上限边缘 —— 国家账本被当人质
   * ==================================================================== */
  {
    id: "ln23_debt", grade: "mid", category: "political",
    valence: "bane", dyn: true,
    minYear: 2023, maxYear: 2023, scoped: true, tierRaw: true, tierMin: 1, tierMax: 7, weight: 13, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 5,
    title: "财政部数着日子：发不出钱的六月在逼近",
    body: "上限早就触顶，财政部的非常规手段进入倒计时——评级机构已放话要下调。众议院议长把提高上限与两年支出上限捆成一张票，白宫说「不谈条件」，政府内斗在电视上直播。\n" +
      "你的选区靠联邦吃饭：基地、医保诊所、农场贷款。若真违约，最先断的是他们的现金流。华盛顿在看谁能先眨眼，本地在看你会不会说话。",
    brief: {
      lede: "国家的账本被人当人质，押注的人赌的是谁先眨眼。",
      known: [
        "财政部警告：最早的违约日在六月初。",
        "众议院已由强硬派推动、把上限与两年支出上限捆票。",
        "白宫拒绝「就条件谈判」，但深夜电话一直在响。"
      ],
      rumor: [
        "有人说财政部在探「铸造一万亿金币」的合规路。",
        "有人说议长内部数票已经过半，只等签字笔。"
      ],
      unknown: [
        "违约风险会伤评级，市场先跌为敬。",
        "无论谁输，中间人下次都绕道走。"
      ],
      terms: [{ k: "债务上限", v: "国会设定的举债额度，触顶即可能违约。" }]
    },
    choices: [
      {
        id: "prep", text: "不谈僵局，只做本地「断供预案」演练", note: "赌的是危机最后总会解，本地不会。风险：两头骂你只会躲。",
        base: 0.58, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "联邦加薪真晚发了两周，只有你的县贴出了排队时间表。基地与诊所联名写了封感谢信。", effects: { rep: 1.1, fac: { military: 6, base: 6 } } },
          ok: { body: "你做了功课，没人挨饿，没人记功。危机年份这就够本。", effects: { rep: 0.4, fac: { military: 3, base: 3 } } },
          meh: { body: "你的预案躺在抽屉里，僵局比你先结束了。", effects: { rep: 0.05 } },
          fail: { body: "违约没发生，你的「恐慌演练」反被嘲成浪费税款。", effects: { rep: -1.2, fac: { press: -3 } } },
          critfail: { body: "你提前放话「联邦不会真停」，结果真停了两天——你的县没准备，信全砸了。", effects: { rep: -2.2, fac: { base: -4, military: -4 } } }
        }
      },
      {
        id: "hawk", text: "挺「先砍支出再提上限」，替强硬派撑场", note: "赌的是财政痛苦会被归功给胆量。风险：砍到选民头上你挡刀。",
        base: 0.45, mods: [{ src: "fac", key: "base", w: 0.3 }, { src: "attr", key: "CUN", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "协议按你的版本签了字。初选金主把你当「说到做到的人」，党内地位一夜改写。", effects: { rep: 1.5, fac: { establishment: 10, commercial: 6, labor: -8 }, voters: { warm: 200 } } },
          ok: { body: "你借财政的硬气刷了存在感；预算刀口没人细看。", effects: { rep: 0.6, fac: { establishment: 5, commercial: 4, labor: -4 } } },
          meh: { body: "你站了队，头条是别人的。", effects: { rep: -0.1 } },
          fail: { body: "协议最后没有你吹的那些砍项，你落得两头不认。", effects: { rep: -2.2, fac: { labor: -8, base: -6 } } },
          critfail: { body: "你撑过的砍单砍进了本地诊所。镜头前医生一字一句念你的发言。", effects: { rep: -3, fac: { labor: -12, base: -8, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "clean", text: "拒绝为任何法案夹带换票：要干净表决", note: "赌的是体面比算盘长久。风险：两党机器都会记住你的不配合。",
        base: 0.48, mods: [{ src: "attr", key: "INTG", w: 0.45 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你的「不交易」成了当晚评论圈的清流样板，筹款页涨了一倍。", effects: { rep: 1.75, fac: { press: 8, base: 6, establishment: -8 }, voters: { warm: 300 } } },
          ok: { body: "你拒得干净，也把自己排除出了分赃名单。", effects: { rep: 0.9, fac: { press: 4, establishment: -4 } } },
          meh: { body: "你的原则很贵，也没人出这个价。", effects: { rep: -0.1 } },
          fail: { body: "党鞭把不配合记成账，你在委员会排班表上往后挪了十格。", effects: { rep: -2.4, fac: { establishment: -8, base: -4 } } },
          critfail: { body: "僵局拖到了最后一刻——媒体找到替罪羊：「就是这批人害国家违约风险成真」。", effects: { rep: -3.2, fac: { establishment: -10, press: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2023-10 · 10 月 7 日与校园对立 —— 一场远方的屠杀撕开本地的裂缝
   * ==================================================================== */
  {
    id: "ln23_oct7", grade: "major", category: "foreign",
    valence: "risk", dyn: true,
    minYear: 2023, maxYear: 2023, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 14, unique: true,
    medium: ["tv", "cable", "social", "shortvideo"], month: 10,
    title: "远方突袭死难上千人，对立当月爬上校园",
    body: "十月七日，哈马斯越界袭击南以色列，约一千二百人死亡、两百余人被掳；以色列随即对加沙展开空袭，人道数字一天一个样。远方的战争当月就爬上本地校园与犹太会堂的围墙。\n" +
      "你的捐款账本与街区的祈祷都朝你伸着手。两边都用同一个词指控对方：仇恨。大学正在开听证，校董会名单上有你认识的姓。",
    brief: {
      lede: "别人家的战争，本地人的考卷：一句话就会站进某一边。",
      known: [
        "死亡与劫持人数被核实，人质家属已站到镜头前。",
        "加沙死难与流离的数字每日刷新，本地两族情绪同步升温。",
        "献血、集会与抗议在同一座城轮流排期。"
      ],
      rumor: [
        "有人说真主党可能在北线点火，冲突要外溢。",
        "有人说白宫在私下压以方给援助通道留口子。"
      ],
      unknown: [
        "校长的听证会证词将引爆全国捐款榜。",
        "你此刻的措辞会被两边各剪一版。"
      ],
      terms: [{ k: "触发式集会", v: "未经审批、社媒召集的校园与街头快闪。" }]
    },
    choices: [
      {
        id: "heal", text: "两边社区各拜会一次，拒绝把悲剧变记分牌", note: "赌的是伤口两边都疼。风险：两边都说你「和稀泥」。",
        base: 0.59, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你在会堂与清真寺说了同一句话。仇恨升温的这一个月里，本地没出一件事——这被记在你名下。", effects: { rep: 0.25, fac: { church: 2 } } },
          ok: { body: "两边都愿听你说话。这是窄门，但你是走进去的少数人。", effects: { rep: 0.2, fac: { base: 1 } } },
          meh: { body: "你说了一整月安慰话，没有头条。", effects: { rep: 0.05 } },
          fail: { body: "一场守夜会冲突，有人说你「两边都不痛不痒」。", effects: { rep: -0.25, fac: { base: -1 } } },
          critfail: { body: "两边同一天骂你：一边的社媒说你是恐怖分子之友，另一边说你是占领者帮凶。你被同一块牌子打了两个耳光。", effects: { rep: -0.3 } }
        }
      },
      {
        id: "stand", text: "到团结集会演讲：力挺报复权，指控校园占领", note: "赌的是这场议题会把捐款与初选票一起点着。风险：校园与街区的另一群人不打算原谅。",
        base: 0.46, mods: [{ src: "fac", key: "establishment", w: 0.3 }, { src: "attr", key: "CHA", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "你在人质横幅下的演讲被全国播送，党团与犹太捐款网把你列入新名单。", effects: { rep: 1.6, fac: { establishment: 10, commercial: 6, base: -10 }, voters: { warm: 300 } } },
          ok: { body: "你说了最安全也最响亮的话；另一边社区的门开始对你关。", effects: { rep: 0.7, fac: { establishment: 5, commercial: 4, base: -6 } } },
          meh: { body: "你的表态淹没在更响的口号里。", effects: { rep: -0.1 } },
          fail: { body: "加沙的夜间画面占了当晚头条，你的「坚决支持」听起来像劝人别看。", effects: { rep: -2.3, fac: { base: -8, press: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "穆斯林商户联名退订你的集会。你的话被印在清真寺外的抗议横幅上。", effects: { rep: -3.2, fac: { base: -12, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "ceasefire", text: "喊停火与人道走廊，与年轻人同进同出", note: "赌的是道德义愤会变成投票率。风险：建制与捐赠网把你划进对立面。",
        base: 0.5, mods: [{ src: "fac", key: "base", w: 0.35 }, { src: "attr", key: "CUN", w: 0.2 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "停火与援助的口号从校园冲进市区。你被写进「谁先敢喊」的那栏，年轻捐款第一次进你的账。", effects: { rep: 1.6, fac: { base: 10, press: 6, establishment: -8 }, voters: { warm: 600 } } },
          ok: { body: "你站上了街头的一边，也永久坐进了党内的被告席。", effects: { rep: 0.6, fac: { base: 6, press: 4, establishment: -4 }, voters: { warm: 250 } } },
          meh: { body: "你的停火喊话被下一场守夜盖过。", effects: { rep: -0.1 } },
          fail: { body: "一场袭击使你的口号「天真」了二十四小时，党团群情开始点名。", effects: { rep: -2.2, fac: { establishment: -8, press: -4, military: -6 } } },
          critfail: { body: "营地与你的合影被送到每一位议员邮箱。筹款宴的主桌换掉了你的卡。", effects: { rep: -3, fac: { establishment: -10, commercial: -6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2024-07 · 前总统集会遇刺未遂 —— 一枪改了大选的引力
   * ==================================================================== */
  {
    id: "ln24_shooting", grade: "mid", category: "crisis",
    valence: "risk", dyn: true,
    minYear: 2024, maxYear: 2024, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 14, unique: true,
    medium: ["tv", "cable", "social", "shortvideo"], month: 7,
    title: "集会上响起枪声，前总统耳廓带血举拳",
    body: "宾州钢铁镇，前总统候选人露天集会：枪声起，特勤局扑上讲台——他耳廓带血举起拳头，看台上有人永远没再站起来，枪手被狙击手当场击毙。\n" +
      "全国数小时内完成站队：有人高喊团结，有人查安保漏洞，有人先算这场血会怎么改写民调。你的电话也在响。",
    brief: {
      lede: "一枪之后，国家只有几小时重新决定：要不要还像一国之人。",
      known: [
        "一名观众死亡、两人重伤，枪手在场外被击毙。",
        "特勤局为何迟了，成为两党都想要的议题。",
        "这场事件把「强人」与「稳定」同时摆上舆论桌。"
      ],
      rumor: [
        "有人说是独狼，现场清单与旧发帖很快公开。",
        "有人说对立营地的集会也收到过威胁，没人播报。"
      ],
      unknown: [
        "事件后支持率的「聚旗效应」会立刻抬升。",
        "两周后你方换提名候选，表态将重新剪辑。"
      ],
      terms: [{ k: "聚旗效应", v: "突发袭击后支持率短期冲高的现象。" }]
    },
    choices: [
      {
        id: "mourn", text: "只悼念遇难者、谴责政治暴力，两头各给一句", note: "赌的是多数家庭和你一样害怕。风险：极化两头都骂你「没立场」。",
        base: 0.59, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "两派主持人都引用了你那句话。这个夏天，「像个成年人」成了稀缺品。", effects: { rep: 0.25, fac: { base: 2, church: 1 } } },
          ok: { body: "你在正确的时间说了得体的话，不得罪任何一家的餐桌。", effects: { rep: 0.2, fac: { church: 1 } } },
          meh: { body: "全国情绪跑得太快，你稳但不响。", effects: { rep: 0.05 } },
          fail: { body: "「他在流血直播里谈体面」成了对家广告脚本。", effects: { rep: -0.25 } },
          critfail: { body: "你的慰问信被双方各截一半使用；「他根本不知道自己在说谁」。", effects: { rep: -0.3, fac: { press: -2 } } }
        }
      },
      {
        id: "surge", text: "趁势站队：把「强硬与秩序」插进自己的招牌", note: "赌的是恐惧能换成两周的领跑。风险：像发国难财，反噬极快。",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "base", w: 0.2 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你被剪进「同一类硬汉」的蒙太奇，捐款与民调一起抬头。党机器给你开了新账户。", effects: { rep: 1.75, fac: { establishment: 8, base: 4 }, voters: { warm: 500 } } },
          ok: { body: "你蹭到了势，也被看见吃相。名字开始与枪声一起搜索。", effects: { rep: 0.9, fac: { establishment: 4 }, voters: { warm: 200 } } },
          meh: { body: "浪潮太大，你不是浪尖的那位。", effects: { rep: -0.1 } },
          fail: { body: "一句失言被逐字重播：「他连枪响都想用」。温和派开始退订。", effects: { rep: -2.3, fac: { press: -6, base: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "你的「强硬」短视频在死者家属出殡当天发布。截图不需要任何解读。", effects: { rep: -3.2, fac: { press: -10, church: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "protect", text: "不谈政治谈机制：要求彻查安保失职", note: "赌的是把镜头从口号转到流程。风险：执法机构从此记你的名。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.45 }],
        outcomes: {
          crit: { body: "你的「现场清单为何没拉起」成了听证会标题，专业圈把你当会干事的人。", effects: { rep: 1.4, attr: { INT: 2 }, fac: { press: 8, establishment: 5, agency: -6 } } },
          ok: { body: "你问到了点子上，只是把看门的人全得罪了。", effects: { rep: 0.6, fac: { press: 5, agency: -5 } } },
          meh: { body: "问题太技术，全国只想听口号。", effects: { rep: -0.1 } },
          fail: { body: "调查报告替你打了脸：你点的那处本就有预案。", effects: { rep: -2.2, fac: { agency: -10, establishment: -5 } } },
          critfail: { body: "你扣的失职帽子被当场证伪，机构与媒体一起判你「为黑而黑」。", effects: { rep: -3, fac: { agency: -12, press: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2024-11 · 大选与政权更迭 —— 两个平行现实在开票夜对撞
   * ==================================================================== */
  {
    id: "ln24_election", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 2024, maxYear: 2024, scoped: true, tierRaw: true, tierMin: 0, tierMax: 7, weight: 15, unique: true,
    medium: ["tv", "cable", "social", "shortvideo", "deepfake"], month: 11,
    title: "十一月五日：换人、变天，与一场按程序交棒",
    body: "夏天退选、副总统接棒、辩论与 AI 假音频轮番上场，最后开票：前总统归来，参议院翻转，众院计到次日凌晨。在野一方的败选检讨会还没开，执政一方的分赃会已经开始。\n" +
      "你的处境取决于：你此刻坐在哪一桌、还有没有桌可坐。",
    brief: {
      lede: "大选之夜，两个平行现实在开票屏幕上对撞，程序仍会走。",
      known: [
        "白宫易主；参院改朝；众院计票拖到深夜。",
        "败方已有人连夜讲「尊重结果」。",
        "交接从电话开始，委员会与人事清单随之而来。"
      ],
      rumor: [
        "有人说新班底人事已过筛，就等签字。",
        "有人说败方内部酝酿一场初选政变。"
      ],
      unknown: [
        "两年后的中期就是新政府的成绩单。",
        "今晚的选边，几年后都会被逐条清算。"
      ],
      terms: [{ k: "政权交接", v: "选举后按程序移交与安全、行政资源。" }]
    },
    choices: [
      {
        id: "unity", text: "接受结果、说团结话，把在任文件整理归档", note: "赌的是程序本身还值钱。风险：两头都把你当旧时代家具。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你的团结论被对方台引用，你方的体面也由你守住。新政府真来挖你时，谈的是条件不是施舍。", effects: { rep: 0.25, fac: { press: 2, establishment: 1 } } },
          ok: { body: "你守住体面，交出不体面。账本干净，行情冷清。", effects: { rep: 0.2, fac: { establishment: 2 } } },
          meh: { body: "全国换台，你像一段旧广告。", effects: { rep: 0.05 } },
          fail: { body: "你的「团结」被两方各解读成跪与软。", effects: { rep: -0.25, fac: { press: -1 } } },
          critfail: { body: "一封「欢迎留任」的信被剪成「早去表忠」——败方的人这么信。", effects: { rep: -0.3 } }
        }
      },
      {
        id: "cross", text: "跨党自荐：押新政府里有你的位置", note: "赌的是新朝缺你这种「旧地盘的活地图」。风险：旧队伍拿你祭旗。",
        base: 0.44, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "establishment", w: 0.2 }],
        cost: { fav: 2 },
        outcomes: {
          crit: { body: "过渡团队来电点名要你，新政府背后的捐主网络随即向你开放。你带着旧票仓的钥匙走进新办公室。", effects: { rep: 1.5, fun: 0.6, tier: 1, fac: { establishment: 10, base: -8 } } },
          ok: { body: "你上了「可谈」名单，也上了「不可信」名单——两边同时。", effects: { rep: 0.6, fac: { establishment: 5, base: -5 } } },
          meh: { body: "你的自荐信石沉大海。新班子用自己人。", effects: { rep: -0.1 } },
          fail: { body: "旧队伍先公布你的通话记录。你两头都没落着座位。", effects: { rep: -2.3, fac: { establishment: -6, base: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "新班底内斗把你当投名状抛出来：「那个叛徒」。你成两党共同的反面教材。", effects: { rep: -3.4, fac: { base: -10, establishment: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "rebuild", text: "押重建败方：四年赌一个回身", note: "赌的是败得越近、翻修越有价。风险：路线内战第一个拿你开刀。",
        base: 0.46, mods: [{ src: "fac", key: "base", w: 0.3 }, { src: "attr", key: "CHA", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你的「败选检讨」成小册子疯传。两年后，全国每一张选票都绕不开你那张桌子。", effects: { rep: 1.75, fac: { base: 8, press: 5 }, voters: { warm: 600 } } },
          ok: { body: "你抢到修船的名分，船却不知归你还是要分。", effects: { rep: 0.7, fac: { base: 5 }, voters: { warm: 250 } } },
          meh: { body: "你的检讨书没人读完。清算比你想的早。", effects: { rep: -0.1 } },
          fail: { body: "败选内战开打，你被划进「错的一派」。", effects: { rep: -2.4, fac: { base: -8, establishment: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "你自掏腰包办的大会开成公开互撕，收据与录音一起外流。", effects: { rep: -3.2, fun: -1.8, fac: { base: -10, press: -6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 世界线 · 2022—2024：按年压力 / 年度简报 / 媒介景观。
 *   引擎对 worldline 按字段深合并，只写本带年份，不碰别的年带。
 *   outlets 体现 2022-10 X（原 Twitter）易主后的媒介格局与 AI 生成内容的普及。
 * ==========================================================================*/
POTUS.define("worldline", {
  pressure: {
    "2022": 4,   // 通胀破九、罗伊被推翻、小学枪击、中期选举
    "2023": 4,   // 银行连环倒闭、债务上限边缘、野火、中东战火与校园对立
    "2024": 5    // 大选年：遇刺未遂、换人、政权更迭
  },
  brief: {
    "2022": "物价涨得比工资快，最高法院掀掉了五十年的规则；两半国民都确信国家被错误的人糟蹋着——中期选举就照这个吵法投。",
    "2023": "银行在新闻里连环塌，华盛顿把国家信用当倒计时的炸弹拆；人们疲惫到只求今年别再出新的坏消息——直到秋天，远方的战火烧进本地校园。",
    "2024": "枪声、换人、算法喂出的两套现实同夜开票：这个国家用一张选票互相确认——我们是否还住在同一个国家。"
  },
  outlets: {
    "2022": ["纽约时报", "有线电视新闻网", "福克斯新闻", "今日美国", "推特"],
    "2023": ["有线电视新闻网", "福克斯新闻", "X（原推特）", "独立通讯（Substack）", "AI 生成内容账号"],
    "2024": ["有线电视新闻网", "福克斯新闻", "X（原推特）", "短视频平台", "AI 合成音频与生成账号"]
  }
});

/* ============================================================================
 * 定点表 fixed：本带 9 卡各钉一处，共 9 个定点（major 4 / mid 5）。
 * 弃题（毛伊野火、飓风海伦妮与米尔顿）见交付回报。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln22_robles", year: 2022, month: 5, grade: "major" },
  { event: "ln22_dobbs", year: 2022, month: 6, grade: "major" },
  { event: "ln22_cpi", year: 2022, month: 7, grade: "mid" },
  { event: "ln22_midterm", year: 2022, month: 11, grade: "mid" },
  { event: "ln23_svbu", year: 2023, month: 3, grade: "mid" },
  { event: "ln23_debt", year: 2023, month: 5, grade: "mid" },
  { event: "ln23_oct7", year: 2023, month: 10, grade: "major" },
  { event: "ln24_shooting", year: 2024, month: 7, grade: "mid" },
  { event: "ln24_election", year: 2024, month: 11, grade: "major" }
]);
