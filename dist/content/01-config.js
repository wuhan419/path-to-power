/* ============================================================================
 * CONTENT · 01-config.js
 * 全局配置：平衡参数、派系、轨道、党派、姿态、状态词条名。
 * 想调数值、加派系、加轨道/党派 —— 只改这个文件，引擎自动适配。
 * ==========================================================================*/
POTUS.define("balance", {
  /* 建角初始值 */
  startAge: 24, startFun: 0, startRep: 0, startHp: 100, startAp: 8, startFav: 0,
  /* 开局三围与资金全 0（硬核从零）：魅力/智力/手腕靠建角自由点自己洒，钱靠分配点/钱卡挣。
     判定中性点在 50（dice.js），所以没点到的维会吃负修正——这是自甘风险的偏科代价。
     诚信 INTG 是幕后属性、不在建角分配位，固定 50 = 中性，不受玩家摆布。 */
  startAttr: { CHA: 0, INT: 0, CUN: 0, INTG: 50 },
  /* ---- 建角自由点（覆盖 engine/core.js BALANCE_DEFAULTS）----
     v0.12 #20 定稿：定命一掷删除，属性直接吃 startAttr 打底，自由点分配到四个去处。
     汇率（与天赋卡价值同一把尺）：1 点 = +10 魅力/智力/手腕 = +$2k 金钱。

     ⚠ freePoints:12 是【第一周目】的池子大小，不是常量 —— 这是个多周目成长游戏：
       每局结束周目数 +1，每完成一个周目永久送 loopFreeBonus 点（见 core.js freePool），
       实际额度 = 12 + 已完成周目 × 1。
     ⚠ 单维上限 = 「能点到属性值 100 为止」，不再按点数封顶：
       三围从 startAttr(0) 起步、1 点 = +10，所以加到 100 正好 10 点 ——
       freeCapPerAttr / freeCapMax 都定成 10，即单维最多洒 10 点（属性上限 100 的等价点数）。
       freeCapGrow 仍保留：周目/作弊送的点继续抬【总额度】，单维这 10 点已够灌满一维。 */
  freePoints: 12, freeCapPerAttr: 10, freeCapMax: 10, freeCapGrow: 6,
  /* #31：周目成长的唯一系数 —— 每完成一个周目 +1 自由点（保卡不再是它的替代品，随时可挑）。 */
  loopFreeBonus: 1,

  /* ---- 开局天赋卡墙（v0.12 #20 · engine/core.js POTUS.gachaCfg 消费，卡定义在 content/15-cards.js）----
     难度 = 能选几张卡（不再 = 出身发多少钱）；各档开局资金全部搬进卡池（见 15-cards.js 的钱卡）。
     四档稀有度 白1/蓝2/紫3/橙4，每个呈现卡位【独立】掷一次稀有度，再在该档内等概率抽一张。
     概率随周目递增（loopRarity，第 N 周目覆盖第 N 档，未写的档自动兜底）：
       一周目压蓝（93/6/0.9/0），二三周目逐步抬蓝紫橙，越玩越容易撞好东西。
     橙卡（命卡档）受周目门槛：orangeLoop=2 → 第二周目起进池，第一周目绝不掷橙；
       旧的「当过总统才解锁」已废（#31）。玩家手里没有总统成就也能靠周目数摸到橙。 */
  gacha: {
    enabled: true,
    offer: 12,                     // 开局呈现几张供挑选
    rerolls: 1,                    // #31：建角页整面卡墙允许刷新几次（用完按钮变灰）
    loopRarity: {
      1: { 1: 93, 2: 6, 3: 0.9, 4: 0 },        // 一周目：蓝卡明显收着，橙卡不进池
      2: { 1: 88, 2: 10, 3: 1.7, 4: 0.25 },    // 二周目：橙卡开始露头
      3: { 1: 82, 2: 14, 3: 3.2, 4: 0.5 }      // 三周目及以后（再往后沿用这档）
    },
    orangeRarity: 4,               // 哪一档是"橙"（受周目门槛解锁的命卡档）
    orangeLoop: 2,                 // 第几周目起橙卡进池（1 = 首局即可，0 = 完全不设闸）
    picks: { brutal: 1, hard: 2, normal: 3, easy: 4, legendary: 5 },  // 难度 → 可选几张卡
    keepQuota: 1,                  // 下周目可跨局保留几张卡
    spareRepPenalty: 15            // 免死卡挡下一次致命结局时扣的声望
  },

  tierMin: 0, tierMax: 9,
  /* 生涯终点年：从开局（1980）一路打到 2025 再结算成就，做到总统不再即终局。
     挂点在 engine/view/stage.js 的 endYear / nextYear。死亡/入狱/被迫害等仍可提前结束。 */
  endYear: 2025,
  /* 晋升线共 10 级（引擎内部 tier 0..9，界面显示「等级 1..10」）。旧的 6 档内容门槛由
     engine/when.js 的 tierBand 单调抬进这 10 级空间；这里是铺档密度表（索引=旧档 0..5，
     值=新级）。想调疏密只改这一行。 */
  tierBand: [0, 2, 4, 5, 7, 9],
  /* 胜利线：demo 目标是在 1988 之前摸到「等级 7」（tier 6，联邦众议员）。达到该级顶栏记一笔里程碑。 */
  victoryTier: 6,
  /* 晋升年限闸（引擎级）：升到下一级需要在本级熬够的月数（索引=当前级）。
     按真实政治人物的在任节奏校准（每级 = 一届以上），并保证 demo 能在 ~8 年（106 月）内
     够到等级 7：累计到 tier6 约 92 月，留 ~14 月缓冲去等一个空缺 + 选战。
     级越低升得越快（幕僚→地方快），级越高越要熬（联邦→全国一步好几年）。 */
  tierGates: [8, 10, 12, 18, 20, 24, 28, 34, 40, 0],

  /* ---- 时间：一个月一回合，一年 12 个月 ----
   * 不是每个月都有事件。平静的月份会被自动跳过，只留一行月历记录。
   *   本月有没有档期：pActive = activeChance + 时代压力×activePressureMul + 活跃度×activeBonusMul
   *   有几个档期：slotsBase + floor(压力/2) + floor(活跃度/2) + rint(0, slotsVariance)，封顶 slotsMax
   *   每个档期什么量级：按 gradeWeights 加权抽（压力越高，大事件越可能出现）
   * 「时代压力」写在 content/20-eras.js 的 era.pressure；
   * 「活跃度」由引擎按 丑闻/调查中/选举年/层级≥T4 自动叠加（见 engine/time.js）。
   */
  /* 密度校准（用户反馈「随机事件太多」，三轮）：无压力月基线 0.12→0.10→0.08→0.05。
     第三轮是 1980 全年实测（12 个月里只有 1 个平静月）逼出来的：单降 activeChance 不动
     activeMin 等于没降 —— pActive 被夹在 [activeMin, activeMax] 里，0.06 的下限比新基线还高。
     时代压力/活跃度照常把有大事的月份抬回去；开局头两年另有 balance.earlyCalm 一道闸
     （engine/core.js），因为「刚入职就天天有大事」是最劝退的第一印象。
     第四轮（#38）的结论是**别再动这里**：事件总量由 `pace` 的年度额度决定（engine/core.js），
     用户口径「一年 2—6 件」是额度闸守出来的，不是概率闸 —— 概率只管"哪个月有空档期"。 */
  activeChance: 0.05, activePressureMul: 0.04, activeBonusMul: 0.04,
  activeMin: 0.04, activeMax: 0.95,
  /* 一个月最多两个档期（原 3）：一次撞三件事是"接二连三"体感的直接来源。 */
  slotsBase: 1, slotsVariance: 1, slotsMax: 2,
  /* ---- #37① 开局冷静期（乘子见 engine/core.js 的注释：为什么动额度而不是只动概率）----
   * #38 之后全局已经收进「非固定 2—6 件/年」（pace.eventMax），这里退成**轻闸**：
   * 前 24 个月有事概率 ×0.8、日常公务 ×0.6、年度额度总闸 ×0.5（eventMax 6→3、careerMax 2→1）、
   * 一个月只排一条。
   * 实测教训：这道额度折扣**不能**落在随机/灰产的桶额度上——那两个桶各只有 1 件名额，
   * floor(1×0.5)=0 把桶整个封死而公务没闸，开局两年反而比全局还稠（4.17 vs 3.10）。
   * 「刚入职的社区志愿者」那两年本该大部分月份静着 —— 这是第一印象，不是数值平衡。 */
  earlyCalm: { enabled: true, months: 24, activeMul: 0.8, choreMul: 0.6, quotaMul: 0.5, slotsCap: 1 },
  slotsPressureAt: 4, slotsBonusAt: 2,
  /* 「活跃度」各项权重：丑闻 / 被调查 / 选举年 / 层级达 threshold / 手上把柄够多
   * 把柄这一条的含义是：手里的秘密超过 leverageAt 份，你自己就成了别人的目标，
   * 日程会自然变密（调查、传唤、约谈接踵而来）。把柄不能囤。 */
  bonusPressure: {
    scandal: 0.8, investigation: 0.8, election: 0.6, tierHigh: 0.5, tierHighAt: 4,
    leverage: 0.4, leverageAt: 3
  },
  /* 时代专属事件的权重倍数（跨时代通用事件不乘），保证"这个时代自己的故事"不被淹没 */
  eraWeightMul: 3,
  /* 「事件续集」的权重倍数：前一幕演过之后（ev.after 解锁），
   * 续集要明显更容易被抽到 —— 否则一条故事线会被几百个档期冲散，玩家连不起来。 */
  chainWeightMul: 9,

  /* ==========================================================================
   * 权重管线：谁更容易遇上什么事
   * --------------------------------------------------------------------------
   *   w = 基础 × 时代 × 续集 × tilt     ｜  tilt = 身份 × 资源 × 主线 × 重复
   * 每个因子夹在 [weightFactorMin, weightFactorMax]（默认 0.4~3）
   * 整条 tilt 封顶在 ±weightTiltCap（默认 ×8 / ÷8）。
   *
   * 怎么写一条规则：
   *   { when: <统一条件，见 docs/CONTENT-SCHEMA.md §4.16>,
   *     ids:  { "事件id": 倍数 },     ← 命中才有；不在名单里 = ×1，不是惩罚
   *     cats: { "类型": 倍数 },
   *     tags: { "标签": 倍数 },
   *     mul:  通用倍数, off: true 可临时停用 }
   * 命中的规则相乘，最后整体夹取。**别写超过 3 的数**：会被夹掉，写了也没用
   * （夹取上限就是为了拦住"一个 ×100 的笔误让整类事件刷屏"）。
   *
   * 为什么用"表"而不是写进每个事件：一张表能一眼看出"哪种人活在哪种故事里"，
   * 而散在 61 个事件里谁也读不出来。事件自己也可以写 ev.bias（同一套规则形状）。
   * ======================================================================== */
  identityBias: [
    /* 轨道：你怎么往上爬，就更容易碰上什么事 */
    { when: { tracks: ["electoral"] }, cats: { civil: 1.6, political: 1.6, career: 1.3, shady: 0.7 } },
    { when: { tracks: ["appointment"] }, cats: { political: 2.0, foreign: 1.4 } },
    { when: { tracks: ["celebrity"] }, cats: { media: 2.0, romance: 1.4, scandal: 1.3, political: 0.7 } },
    { when: { tracks: ["operative"] }, cats: { shady: 2.0, political: 1.4, career: 0.8 } },
    { when: { tracks: ["wealth"] }, cats: { finance: 2.0, shady: 1.3, political: 1.3, civil: 0.7 } },
    /* 党派与姿态：独立参选 / 反建制 → 更靠舆论和街头，更少靠党内机器 */
    { when: { parties: ["I"] }, cats: { media: 1.3, civil: 1.3, political: 0.7 } },
    { when: { stances: ["outsider"] }, cats: { civil: 1.5, media: 1.3, scandal: 1.2, political: 0.7 } },
    /* 出身（origin id：dynasty 政治世家 / immigrant 移民二代 / labor 蓝领工人 / elite 精英） */
    { when: { origins: ["labor"] }, cats: { civil: 1.6, finance: 0.8 } },
    { when: { origins: ["dynasty"] }, cats: { political: 1.4, career: 1.3, civil: 0.8 } },
    { when: { origins: ["immigrant"] }, cats: { civil: 1.4, media: 1.2 } },
    { when: { origins: ["elite"] }, cats: { finance: 1.4, foreign: 1.3, civil: 0.8 } },
    /* 起点（entry id：insider 直接入行 / pro 专业起手 / celebrity 名人起手 /
     *        ngo NGO 起手 / business 商界起手 / operative 幕僚起手） */
    { when: { entries: ["ngo"] }, cats: { civil: 1.6 } },
    { when: { entries: ["business"] }, cats: { finance: 1.5 } },
    { when: { entries: ["celebrity"] }, cats: { media: 1.6 } },
    { when: { entries: ["operative"] }, cats: { shady: 1.5, political: 1.3 } },
    /* 层级：小人物碰不到大国事；大人物躲不开 */
    { when: { maxTier: 1 }, cats: { career: 1.6, civil: 1.4, foreign: 0.4, crisis: 0.4 } },
    { when: { minTier: 4 }, cats: { crisis: 1.8, foreign: 1.8, political: 1.4, career: 0.7 } },
    /* 出生州的地形：
       摇摆州 → 全国目光常驻，选举与舆论类事件更密；
       深州（任何倾向）→ 少数派的处境自带民权/舆论版面（反对者叙事有人看） */
    { when: { states: ["OH", "FL", "PA"] }, cats: { political: 1.4, media: 1.2 } },
    { when: { states: ["TX", "AL", "NY", "MA"] }, cats: { civil: 1.3, media: 1.1 } },
    /* 铁锈带 · 摇摆州（demo 主角家乡锚点，见 content/12-states.js）：全国的贸易/工会/汽车/
       钢铁叙事都落在这条街上，党务·民权·仕途类事件加权，让任何层级都更容易撞进时代主线。 */
    { when: { states: ["OH"] }, cats: { political: 1.35, civil: 1.3, career: 1.15 } },
    /* 路线抉择的余波：走过哪条岔路，就更常遇到那条路的世界 */
    { when: { flags: ["cross_runner"] }, cats: { career: 1.3, civil: 1.2 } },
    { when: { flags: ["cross_staffer"] }, cats: { political: 1.3, shady: 1.2 } },
    { when: { flags: ["cross_ngo"] }, cats: { civil: 1.4 } },
    { when: { flags: ["cross_insider"] }, cats: { political: 1.3, career: 1.2 } },
    /* 浪潮亲历者：站进过历史的人，社会运动类事件会认你 */
    { when: { flags: ["wave_occupy", "wave_tea", "wave_antiwar", "wave_civil60"] }, cats: { civil: 1.5 } }
  ],

  resourceBias: [
    /* 缺钱的时候，钱的事会追着你跑 */
    { when: { maxFun: 50000 }, cats: { finance: 1.8, shady: 1.3 } },
    /* 有钱到一定程度，钱的玩法自己找上门 */
    { when: { minFun: 2000000 }, cats: { finance: 1.5, shady: 1.3, civil: 0.8 } },
    /* 有名声，就有版面；版面是双刃的 */
    { when: { minRep: 60 }, cats: { media: 1.6, political: 1.3, scandal: 1.2 } },
    /* 手里攥着秘密，你自己也会变成目标 */
    { when: { minLev: 3 }, cats: { shady: 2.0, scandal: 1.5 } },
    /* 身体垮了就折腾不动了 —— 这一条是"健康"目前唯一的内容后果 */
    { when: { maxHp: 30 }, cats: { career: 0.7, crisis: 0.7, general: 1.5 } },
    /* 认识的人多了，党务类的事会找你去牵线 */
    { when: { minContacts: 5 }, cats: { political: 1.3 } },
    /* 蹲得久了，位子本身会变成话题 */
    { when: { minTenure: 60 }, cats: { career: 1.4 } }
  ],
  /* 重复惩罚：默认关闭（1 = 关）。调到 0.5 → 同一类型每多演一次就减半。
   * 打开它会明显拉平类型分布（现在 media / shady / civil 三家偏重），
   * 但它同时改变了内容构成，会牵动死亡 / 晋升曲线 —— 开之前先重跑 300 局。 */
  repeatBias: 1,
  /* 单卡终身衰减（v0.12 · 用户「同一事件反复出现不现实，一年或几年一次就够」）：
   * 一张卡这局演过一次后，再进卡池时整条权重乘这个系数。0.15 = 之后基本撞不上了。
   * 与 era/chain 同列全局旋钮、不吃 clamp。它只管「冷却到期回访后还稀不稀」，
   * 「这几年内根本别再出现」由下面的 idRepelMonths 硬闸负责（探针实测：光有衰减时，
   * 薄池组合一路掉进 pass3 兜底，同一张 dyn 卡单局被抽 147 次）。
   * 事件可用 ev.rereq（when 词汇）声明"重新解锁"条件（如"家人还在惹祸"的 flag），
   * 命中则豁免本衰减、并走更短的冷却 —— 见 engine/events.js。调 1 = 关闭衰减。 */
  idRepeatMul: 0.15,
  /* 单卡硬冷却（月）：演过一次后这么久以内，任何兜底档（含 pass3）都不再入选。
   * 24 = 「同一件事最少两年一遇」。豁免：仅 prog_* 晋升卡（失败后每年重试是设计）。
   * 调 0 = 关闭硬闸（回到纯权重衰减的老问题，别关）。 */
  idRepelMonths: 24,
  /* debuff 续燃卡（rereq 命中）的缩短冷却：「麻烦的家人」可以回来，但不能变成年报。
     12 = 被诅咒后最快一年一遇（对照基准 24）；这是 dyn 卡，每次回来是不同变体。 */
  idRepelRereqMonths: 12,

  /* 主线：同一时刻只有一条，但可以换线（见 engine/arc.js） */
  arc: { switchAfterMonths: 12, maxActive: 1 },

  /* 把柄的年度贬值率：每份把柄每年有一定概率失效（当事人下台、事情过去了）。
   * 调高 → 把柄更"易腐"，玩家更倾向于尽快用掉；调低 → 囤把柄成为主流打法。 */
  leverageDecayChance: 0.34,
  /* 量级配比（用户反馈「小事雷同刷屏」）：下调 minor 基权、抬高 mid ——
     把一部分「鸡毛蒜皮的重复日常」换成「有点分量的事」，随机感更实。 */
  gradeWeights: {
    major: { base: 0.25, perPressure: 0.5 },
    mid: { base: 2.7, perPressure: 0.7 },
    minor: { base: 5.6, perPressure: -0.5 }
  },
  gradeFallback: { major: ["major", "mid", "minor"], mid: ["mid", "minor"], minor: ["minor"] },

  /* ---------- 事件三值性（valence）与动态经济标尺（engine/scale.js） ----------
   * 每张卡是 机遇(boon) / 风险(risk) / 威胁(bane) 中的一种；每个档期独立掷一类，
   * 类与类互不挤占。下面三个权重是校准基线，最终值由 validate.js 的
   * 网格搜索（体验指标最优）反推写回。valencePressure：每点时代压力对
   * boon/bane 权重的乘性微调（越动荡，威胁越密、机遇越稀）。
   * valenceDefault：漏标 valence 的旧内容的兜底类。 */
  valenceWeights: { boon: 0.40, risk: 0.33, bane: 0.27 },
  valencePressure: { boonPerPressure: -0.05, banePerPressure: 0.10 },
  valenceDefault: "risk",
  /* dyn 事件的内容系数 × 这里的标尺 = 结算绝对值（四舍五入）。
   * 语义锚：系数 1.0 = T2 基准人物（属性 50）在该量级的标准份量。
   * 改这些参数会平移全局经济曲线，改完必须重跑 node tools/validate.js。 */
  econ: {
    funMonths: { minor: 1.5, mid: 6, major: 20 },   /* 钱标尺 = 职位月薪 × 量级月数 */
    repBase: { minor: 2.5, mid: 5, major: 9 },
    hpBase: { minor: 2, mid: 4, major: 7 },
    smallBase: { minor: 1, mid: 1.5, major: 2 },    /* lev/fav/ap 共用 */
    tierLean: 0.30,        /* 声望随层级：每级 ±30% */
    hpTierLean: 0.12,      /* 健康磨损随层级（比声望慢 —— 高位的人更扛得住） */
    attrLean: 0.40,        /* 主属性每偏离 50 点 ±0.4%×倍数：100 属性 ≈ +20% 收益 */
    coefMin: -8, coefMax: 8,                         /* dyn 卡系数合法区间（校验用） */
    coefMaxFun: 150,     /* money 单独放宽：大额贿金/收购/竞选款对低标尺天然上百份（只防绝对值忘除的极端） */
    repGateMax: 80       /* dyn 卡 req.rep 门槛展开后的天花板：声望 0—100 有界，门槛不许顶出可达区 */
  },

  midtermCycle: 2,

  /* 年度结算 */
  hpDecayMin: 1, hpDecayMax: 3, interestRate: 0.03, scandalDecayChance: 0.25,
  /* recentCap 20→40：非 unique 的 minor 卡过去在 20 档窗口滑过后即可重演，
     这正是「8 年 demo 里同一事件撞上两次」的根因；抬到 40 基本覆盖整个 demo 档期。 */
  blackswanChance: 0.18, recentCap: 40, retireAge: 74, aiCallCap: 80,

  /* 精力池（v0.9 已退役：G.ap 仍按此恢复但无人消耗，仅作兼容残留）：
     每年恢复 = apBase + floor(健康 / apHealthDiv)，夹在 [apMin, apMax] */
  apBase: 6, apHealthDiv: 25, apMin: 1, apMax: 12,

  /* ---- 静好岁月：平静的月份里，主角照样过日子、按部就班地长 ----
   * 叙事素材在 content/08-vignettes.js；这里只管"成长曲线"。
   *
   * 关于 hpChance（平静月恢复健康的机会）—— 默认 0，是个刻意的选择：
   *   这个游戏的死亡率卡在退休年龄那条线上（年度衰减约 2，从 100 点撑 50 年），
   *   所以哪怕每平静月只回 0.15 点健康，也会把一大批"累死"翻成"退休"。
   *   实测（300 局，node tools/validate.js 的结局分布）：
   *     hpChance 0.00 → 因病去世 ~111-126 ／ 打到 T5 ~155-173   ← 基线附近
   *     hpChance 0.04 → 因病去世   48                            ← 曲线被推平
   *     hpChance 0.28 → 因病去世    0                            ← 没有人会累死
   *   想要"平静的月份让人喘口气"这个感觉，就把 hpChance 调到 0.04；
   *   代价是整个终局会明显变温和。这个取舍留给你。
   *
   * 改完务必跑 node tools/validate.js，看层级分布与结局分布有没有被推歪。 */
  vignette: {
    enabled: true,
    maxShown: 4,
    /* #37③：0.20→0.14→0.08。岁月仍然长本事，但一辈子靠平静月堆不满一个维度。 */
    attrChance: 0.08, attrGain: 1, attrCap: 88,
    /* v0.5.2：INTG（诚信）不进自然成长池——诚信是选择塑造的，不是岁月。
       事件 outcomes 里的 attr.INTG 照常生效（那是"你做了什么"的结果）。 */
    attrKeys: ["CHA", "INT", "CUN"],
    attrAgeFade: true,
    hpChance: 0, hpGain: 1,
    repChance: 0.06, repGain: 1,
    contactChance: 0.20, contactGain: 1,
    /* 按轨道分化：无事发生的岁月里，你做的那件事决定什么在自然生长。
     * 选举的人天天见人（声望）、管钱的钱在生钱、幕僚在攒关系、
     * 委任的在啃专业、名人不做事也有人谈论。
     * 只加正向乘子 —— 别在这里写惩罚，改了要重跑 300 局看结局分布。 */
    trackBonus: {
      electoral: { rep: 1.6 },
      operative: { contact: 1.5 },
      appointment: { attr: 1.3 },
      celebrity: { rep: 1.3 }
    },
    /* v0.5.2 平静月的随机变动：喘口气/攒人情。
     * v0.12 #37③：**平静月不再产生资金**（原 funChance 0.30 的 ±$0.5k—$8k 暗账整条删除）。
     * 用户投诉「这个月的账明明赤字，下面却写『按部就班 资金 +$6k』」——根因是这条随笔侧账
     * 绕开了 P.monthlyLedger 这单一流水，玩家看不到它的来源。钱从此只有两条门：
     * 【月账（工资-开销-学贷-利息）】+【事件卡】。生息仍然只在年终结算（interestRate）。
     * 调大之前先跑 300 局看资金曲线有没有被推歪。 */
    apChance: 0.25,
    favChance: 0.08,
    /* 年龄曲线：65 岁起 CHA/INT 每月 6% 概率掉 1 点（下限 30），CUN 不衰（经验），
       INTG 不随年龄变（诚信是选择）。改这两个数要重跑 300 局看结局分布。 */
    attrDeclineAge: 65, attrDeclineChance: 0.06, attrFloor: 30
  },

  /* ---------- 平静月的"这个月做了什么"：具体工作素材（v0.5.2） ----------
   * 用户反馈：散文太虚，要看得见做了什么事。这些是政治生活的日常颗粒：
   * 见选民、开会、跑基层、剪彩、读简报。按轨道/层级筛选，texts 随机挑一条。
   * 写作纪律：动词开头、一件具体的事、不抒情（抒情留给随笔槽）。 */
  quietWorks: [
    /* T0-T1：跑腿层 */
    { minTier: 0, maxTier: 1, texts: [
      "帮办公室整理了三百份选民来电，逐条归类：漏水、账单、儿子在学校被欺负。你能背出其中十一条的回电进度。",
      "周六跟着候选人在超市门口握了四个小时的手。最后一位老太太捏着你的手说：你们要说话算话。",
      "给选区 Newsletter 写了本月稿子，五百字，改了四遍。主编删掉了你最得意的那句。",
      "把仓库里的竞选物料清点了一遍：两千个牌子、六卷横幅、一台总罢工的老打印机。",
      "替缺席的同事去听了一场分区规划听证会，记了七页笔记，三页有用。"
    ] },
    /* 选举轨道：见选民是主业 */
    { tracks: ["electoral"], minTier: 1, maxTier: 3, texts: [
      "开了两场镇民会。第一场来了四十人，问的全是路坑；第二场来了十二人，问的是你什么时候竞选下一届。",
      "上午在老年中心被问了四十分钟医保，下午在商会被问了四十分钟税收。两边要的东西正好相反。",
      "陪着公共工程处巡了一遍选区的排水系统。没人报道这件事，但十一月下大雨的时候会有人记得。",
      "给选区里今年高中毕业的孩子们发了十七封贺信。这种事没有回报，除了二十年后的某一张选票。",
      "处理了选区服务案：一位老兵的补助被停了，你打了九个电话，第七个起了作用。"
    ] },
    /* 委任/幕僚轨道：开会与简报是主业 */
    { tracks: ["appointment", "operative"], minTier: 1, maxTier: 3, texts: [
      "这一周的会：预算会、人事会、和一个没有议程但开了九十分钟的会。你的备忘录写了三页，被采纳了半页。",
      "把一摞立法简报读完并做了摘要。其中两条将来会成为头条——现在只有你注意到了。",
      "替老板去了一趟听证会做笔记。回来路上你把证词的漏洞整理成了一页纸，老板说了句：留着。",
      "改了一份发言稿到凌晨。第二天念出来的是第七版，最好的一版是第三版。",
      "和另外两个办公室的幕僚吃了午饭，换了三条消息。这种饭局的产出从来不在任何报告里。"
    ] },
    /* 名人轨道：曝光是主业 */
    { tracks: ["celebrity"], minTier: 1, maxTier: 3, texts: [
      "上了本地台的圆桌节目，二十分钟。你说的三句话被剪进了预告片——正好是最锋利的三句。",
      "专栏交稿日。这周写的是大家都懂但没人说破的那件事，编辑一个字没改。",
      "一场慈善晚宴、一场开业剪彩、一场毕业致辞。笑容保持得很好，握手次数没数。",
      "在电台接听听众来电九十分钟。有个电话是骂你的，你请他说完了——后来那段被转得最多。"
    ] },
    /* 财富轨道：生意与捐赠 */
    { tracks: ["wealth"], minTier: 1, maxTier: 3, texts: [
      "审了两个季度的账。有些数字你在学习怎么看懂它的言外之意。",
      "出席了两场募款晚宴：一场你掏钱，一场别人掏钱。两张桌上的话题完全不同。",
      "看了一处物业的图纸。中介说这是「政治家的地段」，你知道他在说什么。",
      "和律师核了一遍捐赠的合规边界。合法的慷慨和收买之间的那条线，比想象的细。"
    ] },
    /* T4-T5：议程层 */
    { minTier: 4, texts: [
      "立法议程排期会：你的办公室这周排进来两项，挤出去一项。被挤的那项的发起人现在还在给你打电话。",
      "见了两个州长、一个大使和一个来募捐的老同学。日程表比讲稿更能说明你现在的位置。",
      "在委员会走了一遍年度预算。你圈出的三个数字，明年会变成三则新闻。",
      "上了一次全国台的周日访谈。准备好的一句金句说了出去，对方准备好的一记闷棍也挨了过来。"
    ] },
    /* 全层级通用的杂事 */
    { texts: [
      "把积压的信件回完了。百分之九十是格式回信，但每一封都签了名。",
      "参加了消防站的周年开放日，吃了两根热狗，和站长聊了二十分钟辖区的事。",
      "陪志愿者做了一次社区清洁。捡垃圾的两小时里聊出来的消息，比办公室一周都多。",
      "在机场延误了四个小时，读完了一本一直没空读的报告。",
      "雨天。推掉了所有行程，在办公室把下个季度的计划想清楚了。"
    ] }
  ],

  /* 平静月的工资/开销（引擎 quietAccount 用）。salaryBase×(1+tier×salaryPerTier)，
     开销是随机的 livingMin..livingMax ×(1+tier×livingTierCoef)（位置越高、体面越贵）。
     v0.11 曲线重配：旧 livingMin/Max(800..2200) 让基层 tier0-3「工资−开销」长期为负 →
     钱无声滑向负且无后果。下调到 500..1400 后，t0 勉强糊口、t1 打平、t2 起转正、越走越宽，
     「白手起家早期紧」的题材张力仍在，但不再是逼退玩家的持续掉血。系数从硬编码搬进配置，一处可调。 */
  quietAccount: { salaryBase: 2000, salaryPerTier: 2.2, livingMin: 500, livingMax: 1400, livingTierCoef: 0.6 },

  /* 学生贷款（普通难度以下的开局背贷 · 见 engine/core.js 的 P.loanStep）
     设计意图：现实里奥巴马当总统还在还哈佛法学院的贷 —— 让金钱从开局就被一条
     固定现金流咬住，越穷的难度越疼，把「钱」变成真资源。
     v0.12 改制：按月复利改「单利 + 年度资本化」—— 每月利息进 G.debtAccr 欠息桶、
     不滚本金，每年 1 月（loanStep 内）才把桶并入本金。利息不再无声利滚利，
     「缓交几个月」和「拖一整年」是两种量级的决定，玩家读得懂、也算得清。
     · startDebt：按难度给本金，未列出的难度（easy/legendary）= 0（世家替你交了）。
     · interestAnnual：年利率，按单利月度计提（进欠息桶，年内不滚）。
     · payShare：月供目标 ≈ 职位月薪 × payShare —— 收入越高还得越快，联邦高层才还得清。
     · minPayment：每月最低还款额（现金见底则本月少还、绝不扣成负）。
     · forbear：缓交（Forbearance）—— 主动申请、冻结月供：
         maxMonths 终身额度（月），perMonths 单次申请上限，repCost 恢复时扣声望
         （征信留痕），且恢复当月桶内欠息资本化进本金。
     · pslf：公职贷款豁免（Public Service Loan Forgiveness）——
         months 个合格月（在任、未缓交、当月还款盖住利息）后，本金+欠息一笔清零，
         并解锁成就；minTier 起才算合格（基层志愿不算数）。 */
  studentLoan: {
    enabled: true,
    startDebt: { normal: 65000, hard: 42000, brutal: 28000 },
    interestAnnual: 0.045, payShare: 0.25, minPayment: 120,
    /* lateMonths：连续逾期多少个月仍还不上，才引来「催收/征信」压力事件。
       长期违约 + 现金持续见底 → 提高负面事件概率，但仍不直接 BE（艰难度日）。 */
    lateMonths: 12,
    /* lateLimit：连续断供多少个月 → 信用破产（hardEnd "bankrupt"，见 core.js loanStep）。
       断供 = 当月连利息都没交上（欠息桶在增长），部分还款且盖住利息即重新计时。
       #19 定稿：**三档统一 20 个月**（旧口径 6/4/3）。两条理由——
       ① 旧值太狠：不设防实测 20 局的「每局最长连续断供」中位就有 10 个月、p90 35，
          阈值定在 6 等于 80% 的局在 1980s 就被银行判死（`--late-cap=99` 换算表：
          5→85%、6→80%、10→70%、12→65%、16→60%、20→50%）。定 20 → 破产率 ≈50%，
          而且那是**上界**：模拟器不会主动用缓交（forbear）泄压，真人玩家会。
       ② 旧口径还"越穷宽限期越短"（normal 6 / hard 4 / brutal 3）——难度本该只决定
          欠多少（startDebt 65k/42k/28k 已经承担了这件事），不该再叠一层"银行给几天脸"。
       12 个月起有「催收/征信」压力事件（lateMonths）先警告，20 个月才判死：放任必死，但不是一脚踩死。 */
    lateLimit: { normal: 20, hard: 20, brutal: 20 },
    forbear: { maxMonths: 24, perMonths: 6, repCost: 3 },
    pslf: { months: 120, minTier: 1 },
  },

  /* 负债设底（engine/core.js 的 POTUS.enforceDebtFloor）
     设计意图：钱可以见底、可以难堪，但不许无声无息滑进无底洞（旧实现只在渲染处留了
     一句空操作「允许负债」，既无后果也无出路 —— 前期掉血到负就是纯劝退）。
     触到谷底 → 家人/老同事凑钱把你托一把（资金回正、记一次、声望受损），
     把「静默死亡螺旋」变成有代价、能继续的戏剧点。私房钱与竞选金库本轮仍是同一池子，共用门槛。 */
  debtFloor: {
    enabled: true,
    depth: 6000,       // 谷底：fun < -depth×(1+perTier×tier) 触发接济（位越高、背得起的窟窿越大）
    perTier: 1.2,
    restore: 2500,     // 接济后资金回到 restore×(1+tier)（一笔正现金流，重新办得成事）
    repCost: 4         // 被托底的代价：失面子/落话柄，声望受损（夹在 [0,100]）
  },

  /* ---------- 选民池：选区规模按层级（注册选民数，近似值） ----------
   * 10 级由小到大：社区/学区 → 地方党区 → 市 → 州众选区 → 州参选区 → 全州 → 国会选区
   * → 联邦参/州长（全州）→ 全国重量级 → 全国。
   * carryKeep：升一级能带进新选区的旧选民比例锚；carryStepDecay：跨得越多带得越少
   * （每多跳一级再乘一次），跳级=破格直提，根基更薄。engine/core.js rescaleVoters 用。 */
  voterBase: {
    electorate: [5000, 18000, 70000, 180000, 450000, 1200000, 3000000, 8000000, 20000000, 240000000],
    /* 从这一级起选区就是整个国家：基本盘卡不再挂家乡州名，改口「美利坚 · 全国选民 2.4 亿」
       （玩家实测纠错：都当上总统了还写着"俄亥俄 · 选区 2.4 亿"）。钉在 tierMax=总统。 */
    nationalTier: 9,
    carryKeep: 0.35,
    carryStepDecay: 0.66,
    /* 当选份额：新职位的基本盘占新选区的比例。 */
    winShare: 0.08
  },

  /* ---------- 选民动态（v0.6） ----------
   * 背景：v0.5.2 只做了"选民池的数据结构与显示"，选民除了少数几个写死
   * effects.voters 的事件之外**不会动**——不主动做选民事件的人，三档永远是 0，
   * 看起来就像没实装（用户实测反馈）。
   *
   * 这一块把选民变成"会呼吸的东西"，三件事：
   *   ① 自然增减：每个平静月朝"该层级正常在任者应有的基本盘"收敛（日常工作攒口碑，
   *      在任也会有人不满）。均值回归 —— 天然有上限，挂机不会挂满。
   *   ② 事件增减：所有事件的成败按 量级×档位×事件类型 自动给选民增减。
   *      内容显式写了 effects.voters 的，以内容为准（作者说了算）。
   *   ③ 反噬：选民底气 voterEdge() 作为判定修正，影响 晋升 / 连任 / 政策推进。
   *
   * 调参前务必跑 node tools/validate.js，看 300 局的层级分布与结局分布有没有被推歪。 */
  voterDynamic: {
    enabled: true,

    /* ① 自然增减（每平静月）：delta = (目标 - 当前) × monthly × 轨道系数 × 声望系数 */
    monthly: 0.05,             /* 每月收敛 5% 差额：从 0 到目标约需 5 年到位 */
    targetShare: 0.08,         /* 目标「有好感」= 选区规模 × 8%（与当选份额同一语义） */
    diehardTargetShare: 0.02,  /* 目标「死忠」= 规模 × 2%：自然只出"有好感"，死忠要靠打赢事件 */
    opposeTargetShare: 0.04,   /* 目标「反对」= 规模 × 4%：你做了决定就会有人不满 */
    repWeight: 0.6,            /* 声望系数 = repWeight + 声望/100（声望越高，自然吸粉越快） */
    /* 轨道系数：选举的人天天见人，钱人在办公室数钱——只有搞选举的最能把露面变成票 */
    track: { electoral: 1.5, celebrity: 1.3, appointment: 0.9, operative: 0.8, wealth: 0.7 },

    /* ② 事件成败（每次结算一次）
       base = 选区规模 × eventBase[量级]；再乘 byOutcome[判定档位] × categoryMul[事件类型]。
       档位表里负数=流失/反噬（失败时反对者涨得比好感掉得快——骂声比掌声传得远）。 */
    eventBase: { major: 0.006, mid: 0.0025, minor: 0.0008 },
    byOutcome: {
      crit:     { warm:  2.00, diehard: 0.45, oppose: 0.45 },
      ok:       { warm:  1.00, diehard: 0.18, oppose: 0.22 },
      meh:      { warm:  0.30, diehard: 0.05, oppose: 0.15 },
      fail:     { warm: -0.35, diehard: -0.10, oppose: 0.55 },
      critfail: { warm: -0.80, diehard: -0.25, oppose: 1.00 }
    },
    /* 事件类型系数：上媒体/政治/丑闻的事选民看得见；家里的、恋爱的、纯粹技术性的看不见 */
    categoryMul: {
      media: 1.3, political: 1.2, scandal: 1.1, civil: 1.0, crisis: 1.0, foreign: 0.8,
      career: 0.7, demo: 0.6, shady: 0.6, finance: 0.5, general: 0.5, romance: 0.15
    },

    /* ③ 反噬：voterEdge() ∈ [-1,1] 作为判定修正（乘 contestW 后是 ±8% 胜算）
       · edgeCenter 对齐"自然均衡点"（约 27%）—— 那里修正=0，所以不改动既有 300 局平衡；
         低于中心扣分、高于中心加分，鼓励玩家真的去经营选民。
       · 晋升/连任类选项（任一档位含 tier+1）自动吃这个修正；
         政策推进类由内容显式声明 mods: [{ src: "voters", w: 0.08 }]。 */
    contestW: 0.08,
    edgeCenter: 27,
    edgeSpan: 35
  },

  /* ---------- 资源投注汇率（D&D 式加码的默认值；单个选项可覆盖） ----------
   * 玩法：判定前可"投入资源加码"——资金 抬判定目标值，人情 换一次重投取优。
   *
   * 演进（见 engine/dice.js 的 stakeFunPer）：
   *   v0.6 之前 per 全游戏写死 $250k —— 小兵永远投不进第一档，"赚 $50k 的事让你压 $250k"。
   *   v0.7 加"事件钱量级锚"，v0.12 加"钱袋闸（单档 ≤ 现金×6%）"——
   *            于是单价随余额浮动，玩家实测"同样的事，穷时便宜富时贵"，价码成了第二次随机。
   *   #28① 两样都删，**只留身位锚**：
   *
   *   per = 职位月薪(track,tier) × perSalaryMonths × gradeMul，夹进 [perMin, perMax] 后抹零
   *     · 月薪取自 reg.officeSalary —— 与平静月工资**同一个来源**：身份决定钱，口径只能有一个。
   *     · 一档 ≈ 你这个位子一个月的月薪（#36 标尺），大事（major）按 1.8 倍放大手笔。
   *     · **单价恒定，不看余额**：家底只决定你押得起几档（stakeMax 的 floor(现金/单价)）。
   *       T0 志愿者月薪 $1k → 一档 $500—$1.8k，押满 8 档要小半个月工资；
   *       T7+ 参议员/州长往上一档就是六位数 —— 全部由薪资表推导，内容不单独定价。
   * 内容写死 `per` 时以内容为准（绝对覆盖，不参与换算）。
   *
   * 调参前务必跑 node tools/validate.js，看 300 局的层级分布 / 结局分布有没有被推歪。 */
  stakeRates: {
    fun: {
      w: 0.04, cap: 0.30,
      perSalaryMonths: 1,        /* 级别价 = 职位月薪 × 1 个月（#28①/#36 标尺） */
      gradeMul: { minor: 0.6, mid: 1.0, major: 1.8 },   /* 量级系数：同一身位下小事便宜、大事贵 */
      perMin: 500, perMax: 500000
    },
    ap: { w: 0.03, cap: 0.09 },
    fav: { reroll: true }
  },

  /* 模糊胜算档位 */
  fuzzBands: [0.15, 0.35, 0.55, 0.75, 0.90],
  fuzzLabels: ["渺茫", "不利", "五五开", "有利", "稳操胜券", "几乎必胜"],

  /* 终局评分权重 */
  scoreWeights: { tier: 20, rep: 1, intg: 2, scandal: -15, prison: -40 },

  /* 状态标记（引擎显示用；值可为字符串或 {name, desc, effect}——desc/effect 会出现在悬停说明里）
   * desc = 这个状态是什么；effect = 它在游戏里的实际影响（数值/倾斜/事件门槛）。 */
  tagNames: {
    /* v0.9 精简：标签只保留"身份钥匙"——每一个都真实门控某条专属事件链 / 结局 / 引擎机制，
       绝不放"只写不读"的纯装饰标签。宁可少而稀有，也不要多而廉价。 */
    /* —— 引擎 / 结局硬门 —— */
    investigation_open: { name: "调查中", desc: "有正式调查在你头上进行", effect: "日程变密（活跃度+0.8），恶果事件更容易出现" },
    prison: { name: "入狱", desc: "你进了联邦系统", effect: "政治生命终结（终局）" },
    president: { name: "总统", desc: "你坐上了那个位置", effect: "终局结算按总统线走" },
    president_done: { name: "曾任总统", desc: "你的任期结束了", effect: "退休结局按总统评价" },
    fallen: { name: "下野过", desc: "你从台上摔下来过", effect: "爬回 T3+ 退休=「东山再起」结局；否则=「从谷底收场」；顶栏光谱挂「下野」印记" },
    owns_media: { name: "拥有媒体", desc: "一支笔在你手里", effect: "解锁「话语权的所有者」退休结局" },
    pslf_forgiven: { name: "学贷已豁免", desc: "十年公职按时供款，剩余学贷被联邦一笔勾销", effect: "生涯结算屏挂 PSLF 成就印" },
    /* —— 事件链钥匙（有它才解锁后续专属事件） —— */
    mentor: { name: "导师", desc: "有人愿意指点你、在房间里替你说话", effect: "解锁导师后续专属事件（党内关键场合指路）" },
    shady_start: { name: "走过灰路", desc: "你的第一桶金不干净", effect: "解锁灰产后续专属事件链（脏钱越陷越深）" },
    union_backing: { name: "工会背书", desc: "劳工组织站在你身后", effect: "解锁工会背书专属事件；背弃它会遭反噬" },
    archive_taken: { name: "手上有档案", desc: "地下室那格文件在你手里", effect: "解锁整条档案链（要挟 / 交易 / 摊牌 / 了结）" },
    /* —— 路线余波（identityBias 加权：走过哪条岔路，就更常碰上那条路的世界） —— */
    cross_insider: { name: "入过体制", desc: "你接过了党机器的位置", effect: "党务 / 仕途类事件加权；顶栏光谱挂「机器」印记" },
    cross_runner: { name: "选过参选路", desc: "在第一道分岔你把自己的名字印上了选票", effect: "仕途与民权类事件加权" },
    cross_staffer: { name: "选过幕僚路", desc: "在第一道分岔你选择了抬轿子", effect: "党务与灰产类事件加权" },
    cross_ngo: { name: "坚守过NGO", desc: "面对党机器你留在了议题组织", effect: "民权类事件加权" },
    /* —— 时代浪潮亲历（identityBias 加权 + 顶栏光谱底色） —— */
    wave_occupy: { name: "占领亲历", desc: "你在帐篷里待过", effect: "民权类事件加权；顶栏光谱挂「占领」底色" },
    wave_tea: { name: "茶党亲历", desc: "你站上过市政厅的讲台", effect: "民权类事件加权；顶栏光谱挂「茶党」底色" },
    wave_antiwar: { name: "反战亲历", desc: "你在游行前排站过", effect: "民权类事件加权；顶栏光谱挂「反战」印记" },
    wave_civil60: { name: "民权亲历", desc: "你去过华盛顿那个八月", effect: "民权类事件加权" }
  }
});

/* ---------- 派系（好感度条） ---------- */
POTUS.define("faction", {
  base: { name: "基层组织", desc: "工会/教会/社团等基层组织对你的态度（机器好感，不是选民人数——选民看选民池）" },
  establishment: { name: "党建制派", desc: "党务机器、州党部与大金主——提名是他们手里发出来的" },
  commercial: { name: "商业/华尔街", desc: "企业董事会与市场：出钱给朋友，也惩罚看起来像威胁的人" },
  labor: { name: "工会/劳工" },
  press: { name: "媒体" },
  military: { name: "军工复合体", desc: "军火商、五角大楼，以及那些把基地开进选区的城镇" },
  church: { name: "宗教/道德团体", desc: "教会与价值观组织：用祝福换政策" },
  agency: { name: "情报/执法机构" },
  foreign: { name: "外国势力" },
  tech: { name: "科技巨头" },
  criminal: { name: "地下势力" }
});

/* ---------- 仇家（清算系统的仇恨群体） ----------
 * 仇恨值存在 G.counters["wrath_<组>"]：大收益选项攒恨，攒到门槛触发 140-reckoning 的清算事件。
 * 门槛判定走现成的 when 词汇 countMin/countMax/countEq —— 这里只登记"谁会记恨、记恨的方式"。
 * 键（press/establishment/…）被事件 when/effects 引用，只翻展示值 name/desc。 */
POTUS.define("wrath", {
  press: { name: "新闻界", desc: "围剿、构陷式报道、把你的旧话翻出来一条一条对质" },
  establishment: { name: "党建制派", desc: "初动候选人、黑名单、听证会上给你留位置" },
  money: { name: "金主", desc: "断供、转向扶持你的对手、让银行重新评估你的每一笔钱" },
  opposition: { name: "政敌", desc: "政治陷害、诬告、往人群里派拿枪的人" },
  agency: { name: "情报/执法系统", desc: "匿名泄密、翻旧账、让卷宗「恰好」出现在记者桌上" }
});

/* ---------- 晋升轨道（决定"怎么往上爬"） ---------- */
POTUS.define("track", {
  electoral: { name: "选举轨道", desc: "自己参选，走党内台阶", key: "CHA" },
  appointment: { name: "委任轨道", desc: "靠专业/关系/献金被任命", key: "INT" },
  celebrity: { name: "名人轨道", desc: "名气直接变现为选票，绕过党内机器", key: "CHA" },
  operative: { name: "操盘轨道", desc: "不搞自己当选，搞别人当选（kingmaker）", key: "CUN" },
  wealth: { name: "财富轨道", desc: "用钱买影响力", key: "FUN" }
});

/* ---------- 党派与姿态 ---------- */
POTUS.define("party", {
  D: { name: "民主党" },
  R: { name: "共和党" },
  I: { name: "独立参选" }
});
POTUS.define("stance", {
  establishment: { name: "建制派", desc: "入党获背书与资源，须服从党意" },
  outsider: { name: "反建制", desc: "掀翻党内建制，高自主高敌意，基层狂热" }
});
