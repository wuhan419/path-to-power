/* ============================================================================
 * CONTENT · 01-config.js
 * 全局配置：平衡参数、派系、轨道、党派、姿态、状态词条名。
 * 想调数值、加派系、加轨道/党派 —— 只改这个文件，引擎自动适配。
 * ==========================================================================*/
POTUS.define("balance", {
  /* 建角初始值 */
  startAge: 24, startFun: 10000, startRep: 0, startHp: 100, startAp: 8, startFav: 0,
  startAttr: { CHA: 45, INT: 45, CUN: 45, INTG: 50 },
  tierMin: 0, tierMax: 5,

  /* ---- 时间：一个月一回合，一年 12 个月 ----
   * 不是每个月都有事件。平静的月份会被自动跳过，只留一行月历记录。
   *   本月有没有档期：pActive = activeChance + 时代压力×activePressureMul + 活跃度×activeBonusMul
   *   有几个档期：slotsBase + floor(压力/2) + floor(活跃度/2) + rint(0, slotsVariance)，封顶 slotsMax
   *   每个档期什么量级：按 gradeWeights 加权抽（压力越高，大事件越可能出现）
   * 「时代压力」写在 content/20-eras.js 的 era.pressure；
   * 「活跃度」由引擎按 丑闻/调查中/选举年/层级≥T4 自动叠加（见 engine/time.js）。
   */
  activeChance: 0.12, activePressureMul: 0.04, activeBonusMul: 0.04,
  activeMin: 0.06, activeMax: 0.95,
  slotsBase: 1, slotsVariance: 1, slotsMax: 3,
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

  /* 主线：同一时刻只有一条，但可以换线（见 engine/arc.js） */
  arc: { switchAfterMonths: 12, maxActive: 1 },

  /* 把柄的年度贬值率：每份把柄每年有一定概率失效（当事人下台、事情过去了）。
   * 调高 → 把柄更"易腐"，玩家更倾向于尽快用掉；调低 → 囤把柄成为主流打法。 */
  leverageDecayChance: 0.34,
  gradeWeights: {
    major: { base: 0.25, perPressure: 0.5 },
    mid: { base: 2.2, perPressure: 0.7 },
    minor: { base: 7.0, perPressure: -0.5 }
  },
  gradeFallback: { major: ["major", "mid", "minor"], mid: ["mid", "minor"], minor: ["minor"] },
  midtermCycle: 2,

  /* 年度结算 */
  hpDecayMin: 1, hpDecayMax: 3, interestRate: 0.03, scandalDecayChance: 0.25,
  blackswanChance: 0.18, recentCap: 20, retireAge: 74, aiCallCap: 80,

  /* 精力池：每年恢复 = apBase + floor(健康 / apHealthDiv)，夹在 [apMin, apMax] */
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
    attrChance: 0.14, attrGain: 1, attrCap: 88,
    /* v0.5.2：INTG（诚信）不进自然成长池——诚信是选择塑造的，不是岁月。
       事件 outcomes 里的 attr.INTG 照常生效（那是"你做了什么"的结果）。 */
    attrKeys: ["CHA", "INT", "CUN"],
    attrAgeFade: true,
    hpChance: 0, hpGain: 1,
    repChance: 0.06, repGain: 1,
    contactChance: 0.20, contactGain: 1,
    funRate: 0,
    /* 按轨道分化：无事发生的岁月里，你做的那件事决定什么在自然生长。
     * 选举的人天天见人（声望）、管钱的钱在生钱、幕僚在攒关系、
     * 委任的在啃专业、名人不做事也有人谈论。
     * 只加正向乘子 —— 别在这里写惩罚，改了要重跑 300 局看结局分布。 */
    trackBonus: {
      electoral: { rep: 1.6 },
      wealth: { fun: 0.002 },
      operative: { contact: 1.5 },
      appointment: { attr: 1.3 },
      celebrity: { rep: 1.3 }
    },
    /* v0.5.2 平静月的随机变动：工资/开销/喘口气/攒人情。
     * 量级刻意小（scale = 500 + tier×1500，再乘 1-4），大事仍然只属于事件。
     * 调大之前先跑 300 局看资金曲线有没有被推歪。 */
    funChance: 0.30, funGoodChance: 0.55,
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
     开销是随机的 livingMin..livingMax ×(1+tier×0.6)（位置越高、体面越贵）。 */
  quietAccount: { salaryBase: 2000, salaryPerTier: 2.2, livingMin: 800, livingMax: 2200 },

  /* ---------- 选民池（v0.5.2）：选区规模按层级（注册选民数，近似值） ----------
   * T0 社区/学区 → T1 市 → T2 州众议院选区 → T3 国会选区 → T4 全州 → T5 全国。
   * carryKeep：升位时只能把旧选区 25% 的选民带进新选区——地盘换了，人心要重新攒。 */
  voterBase: {
    electorate: [5000, 60000, 300000, 750000, 9000000, 240000000],
    carryKeep: 0.25
  },

  /* 资源投注汇率（D&D 式加码的默认值；单个选项可覆盖）
   * fun：每 per 美元 +w 胜算，最多 +cap ／ ap：每 1 点 +w，最多 +cap ／ fav：花 1 点换一次重投取优 */
  stakeRates: {
    fun: { per: 250000, w: 0.04, cap: 0.30 },
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
    mentor: { name: "导师", desc: "有人愿意指点你、在房间里替你说话", effect: "部分党内事件的判定加分" },
    party_traitor: { name: "党内叛徒", desc: "你在关键场合与本党划清了界限", effect: "建制派好感事件容易变差，反建制叙事反而认你" },
    compromised: { name: "被拿捏", desc: "有人手里握着你的把柄", effect: "特定胁迫事件会找上门" },
    whistleblower: { name: "吹哨人", desc: "你把内部的脏东西端了出去", effect: "媒体好感上升，建制派戒备你" },
    vulture: { name: "秃鹫", desc: "危机里发过别人的国难财", effect: "基层好感类事件变差，商业派系反而高看一眼" },
    bought: { name: "已标价", desc: "大家知道你的立场是可以买到的", effect: "诚信相关判定减分，金主更愿意接近" },
    shell: { name: "空壳", desc: "你的竞选账目被人查过", effect: "财务类丑闻事件更容易触发" },
    affair_secret: { name: "隐秘情", desc: "一段没人知道的关系", effect: "暂时没有影响——直到有人知道" },
    affair_stain: { name: "情变", desc: "私生活的事见了报", effect: "声望受创，道德团体好感下降" },
    leaker_hero: { name: "泄密英雄", desc: "你把该公开的东西公开了，公众叫好", effect: "基层与媒体好感，建制派记恨" },
    foundation_watch: { name: "基金被盯", desc: "你的慈善基金正在被查账", effect: "调查类事件概率上升" },
    launder: { name: "洗钱嫌疑", desc: "账目说不清来源", effect: "司法类事件更容易找上你" },
    investigation_open: { name: "调查中", desc: "有正式调查在你头上进行", effect: "日程变密（活跃度+0.8），恶果事件更容易出现" },
    divorce_pending: { name: "离婚待定", desc: "家事正在变成公事", effect: "私人类事件的负面影响加重" },
    tape_out: { name: "录音外流", desc: "你的一段私下录音在流传", effect: "媒体好感下降，相关丑闻加重" },
    crisis_2008: { name: "危机亲历", desc: "你完整经历了那场崩盘", effect: "金融类事件认你这段经历" },
    cuba_crisis: { name: "核危机亲历", desc: "古巴导弹危机时你在场", effect: "外交与国安类事件的经验加分" },
    bridge: { name: "民权桥", desc: "你在那座桥的画面里站过", effect: "民权类事件认你" },
    constitutional_crisis: { name: "宪政危机", desc: "你亲历了宪政机器的正面相撞", effect: "制度相关事件的判断加分" },
    leak: { name: "举报信", desc: "一封与你有关的举报信在流传", effect: "调查概率上升" },
    president: { name: "总统", desc: "你坐上了那个位置", effect: "终局结算按总统线走" },
    president_done: { name: "曾任总统", desc: "你的任期结束了", effect: "退休结局按总统评价" },
    kingmaker: { name: "造王者", desc: "别人当选是因为你", effect: "幕僚线结局与党内话语权" },
    owns_media: { name: "拥有媒体", desc: "一支笔在你手里", effect: "舆论类事件可选择自己的版本" },
    saw_crisis: { name: "预见危机", desc: "你在崩盘前看出了苗头", effect: "金融判定加分" },
    debt_crisis: { name: "债务危机", desc: "个人财务亮过红灯", effect: "部分金主对你观望" },
    leaker_suspect: { name: "疑似泄密者", desc: "有人怀疑是你说的", effect: "建制派疏远，虽无实据" },
    burn_seen: { name: "烧文件被目击", desc: "有人看见你销毁过东西", effect: "调查类事件的线索" },
    tweet_saved: { name: "推文被存证", desc: "你发过又删的东西有人截图", effect: "随时可能被翻出来" },
    bailout_stain: { name: "救市污点", desc: "你为救市背过书", effect: "反建制阵营会用这个打你" },
    bailout_stain2: { name: "救市污点", desc: "你为救市背过书", effect: "反建制阵营会用这个打你" },
    prison: { name: "入狱", desc: "你进了联邦系统", effect: "政治生命终结（终局）" },
    /* 灰产线 */
    shady_start: { name: "走过灰路", desc: "你的第一桶金不干净", effect: "灰产类事件更容易找上你" },
    sold_brother: { name: "卖过自家人", desc: "你把自己的兄弟卖了", effect: "家人相关事件永久变差" },
    owes_shark: { name: "有账在身", desc: "你欠着不该欠的人的钱", effect: "放贷人会定期出现" },
    black_money: { name: "黑钱入账", desc: "你的账上有说不清的钱", effect: "洗钱嫌疑类事件概率上升" },
    union_backing: { name: "工会背书", desc: "劳工组织站在你身后", effect: "基层动员类判定加分" },
    street_army: { name: "街头班底", desc: "你有一群随时能上街的人", effect: "集会与动员事件加分" },
    /* 媒体线 */
    bought_editor: { name: "买通过编辑", desc: "某家报纸的版面跟你有默契", effect: "舆论危机可压稿一次" },
    /* 档案链 */
    archive_taken: { name: "手上有档案", desc: "地下室那格文件在你手里", effect: "档案链后续事件解锁" },
    archive_seen: { name: "被人看见翻档案", desc: "那晚有人注意到了你", effect: "档案链反噬事件解锁" },
    archive_hunter: { name: "反查过对方", desc: "你也去挖了对方的底", effect: "摊牌时的筹码" },
    archive_leak: { name: "材料已外流", desc: "档案的内容见了光", effect: "局势进入公开阶段" },
    archive_deal: { name: "做过交易", desc: "你用档案换过东西", effect: "双方都记着这笔账" },
    archive_expose: { name: "公开过材料", desc: "是你把它端上台面的", effect: "吹哨人形象，建制记恨" },
    archive_hold: { name: "扣着没用的牌", desc: "档案还压在你手里", effect: "把柄类玩法可用" },
    archive_burn: { name: "当面烧掉了", desc: "你把档案烧了给他们看", effect: "这条线了结，敌友各记一笔" },
    archive_owned: { name: "这件事已由我定调", desc: "档案的故事版本由你说了算", effect: "该线收益锁定" },
    /* 族群飞地线 */
    enclave_base: { name: "飞地班底", desc: "一个社区把你当自己人", effect: "该社区相关事件判定加分" },
    enclave_standard: { name: "被社区推出", desc: "社区推你做他们的旗", effect: "代表该社区参选的事件解锁" },
    civil_win: { name: "替社区赢过一次", desc: "你为他们拿到过实在的东西", effect: "基层好感类判定加分" },
    street_patrol: { name: "街区巡逻队", desc: "你手里有一支巡逻队", effect: "治安议题事件的筹码，也是风险" },
    /* v0.5：下野与路线 */
    fallen: { name: "下野过", desc: "你从台上摔下来过", effect: "层级与声望曾受重创；爬回 T3+ 退休=「东山再起」结局" },
    cross_staffer: { name: "选过幕僚路", desc: "在第一道分岔你选择了抬轿子", effect: "党务与灰产类事件更密" },
    cross_runner: { name: "选过参选路", desc: "在第一道分岔你把自己的名字印上了选票", effect: "仕途与民权类事件更密" },
    cross_ngo: { name: "坚守过NGO", desc: "面对党机器你留在了议题组织", effect: "民权类事件更密" },
    cross_insider: { name: "入过体制", desc: "你接过了党机器的位置", effect: "党务类事件更密" },
    cross_senate_road: { name: "走了州参议院", desc: "你在州府与华盛顿之间选了州府", effect: "州级议程相关事件" },
    cross_federal_road: { name: "走了联邦众议院", desc: "你去了华盛顿", effect: "联邦议程相关事件" },
    cross_wh_road: { name: "进了竞选团队", desc: "你跟了那个人", effect: "委任线事件更密" },
    cross_gov_road: { name: "选了州长", desc: "你把名字放在了全州选票最上面", effect: "州级行政权相关事件" },
    /* v0.5：时代浪潮亲历 */
    wave_occupy: { name: "占领亲历", desc: "你在帐篷里待过", effect: "民权类事件更密；进步派选民认你" },
    wave_tea: { name: "茶党亲历", desc: "你站上过市政厅的讲台", effect: "民权类事件更密；保守派民粹认你" },
    wave_antiwar: { name: "反战亲历", desc: "你在游行前排站过", effect: "反战叙事的信用，军系好感受损" },
    wave_civil60: { name: "民权亲历", desc: "你去过华盛顿那个八月", effect: "民权类事件更密" },
    wave_busing: { name: "校车亲历", desc: "你在路线图之争里站过位", effect: "教育议题相关事件" },
    wave_gasline: { name: "油队亲历", desc: "你在加油队里做过事", effect: "民生议题的信用" },
    wave_detroit: { name: "底特律亲历", desc: "你参与过那场听证", effect: "工业与工会议题" },
    wave_irancon: { name: "伊朗门亲历", desc: "你离那批文件很近", effect: "高风险高回报的档案类事件" },
    wave_veteran: { name: "退伍军人", desc: "你穿过军装、去过战场", effect: "竞选时的履历加分，军系好感" },
    wave_deferred: { name: "缓征过", desc: "你用学业躲开了那场战争", effect: "合法但会被追问的记录" }
  }
});

/* ---------- 派系（好感度条） ---------- */
POTUS.define("faction", {
  base: { name: "基层组织", desc: "工会/教会/社团等基层组织对你的态度（机器好感，不是选民人数——选民看选民池）" },
  establishment: { name: "党建制派" },
  commercial: { name: "商业/华尔街" },
  labor: { name: "工会/劳工" },
  press: { name: "媒体" },
  military: { name: "军工复合体" },
  church: { name: "宗教/道德团体" },
  agency: { name: "情报/执法机构" },
  foreign: { name: "外国势力" },
  tech: { name: "科技巨头" },
  criminal: { name: "地下势力" }
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
