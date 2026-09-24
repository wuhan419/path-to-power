/* ============================================================================
 * POTUS ENGINE · core.js
 * 引擎内核：注册表、工具、全局状态、平衡配置、存档。
 * 【重要】引擎文件只提供"机制"，不包含任何剧情/数值。新增内容请只改 content/。
 * ==========================================================================*/
"use strict";
var POTUS = window.POTUS = window.POTUS || {};

POTUS.VERSION = "0.4.0";

/* ---------- 注册表：内容通过 POTUS.define() 写入这里，引擎只读 ---------- */
POTUS.reg = {
  era: {}, origin: {}, talent: {}, entry: {}, track: {}, party: {}, stance: {},
  faction: {}, factionUnknown: "其他", blackswan: {}, filler: {},
  /* 仇家群体（清算系统）：仇恨值藏在 G.counters["wrath_<组>"]，门槛判定走现成的
     countMin/countMax/countEq 词汇。内容见 content/01-config.js 的 wrath 登记。 */
  wrath: {},
  /* 连续时间轴（去"时代"化改造）：worldline 是按年键控的全局世界线
     （pressure/brief/outlets/blackswan 一律按绝对年份取），fixed 是全局
     "定点事件表"——到某年某月必发的历史大事件与事件串。见 content/21-worldline.js。
     era 仍保留为迁移期兼容层：未迁移的年代照旧走 reg.era[G.era]。 */
  worldline: {},
  fixed: [],
  category: {}, grade: {}, medium: {}, contact: {}, newsOutlets: {}, ending: [], npc: {}, balance: {},
  /* 风味词典（让可重复事件每次呈现不同真实细节）：token 大写名 → [{minYear,maxYear,text}]。
     事件正文写 {ORG} {PLACE} {MEET} 等占位符，抽取时由 engine/flavor.js 按当年选词填入。
     见 content/09-flavor.js。 */
  flavor: {},
  /* 出生州：每州带政治倾向（D/R/S 摇摆），建角时选择，影响派系起点与事件倾斜。
     见 content/12-states.js。事件/倾向表可用 when.states 引用。 */
  state: {},
  /* 年终随笔：年终结算时按"得到/失去/处境"给文学性段落的素材库。
     见 content/13-year-tales.js。键是条目 id，值带 when 条件与 texts 数组。 */
  yeartale: {},
  /* 职位名表（状态面板的职位卡用）：键 "track_tier" → 职位名。
     内容包按轨道×层级给出真实职位名；miss 时引擎用 officeFallback 兜底。 */
  office: {},
  officeFallback: [],
  /* 职位月薪表（美元/月，平静月结算用）：键 "track_tier"，miss 退 "*_tier" 再退公式。
     参考真实公职薪水换算成月（市议员兼职制、联邦职位年薪/12）。 */
  officeSalary: {},
  /* 事件配图的「照片表」：类型 → 图片文件名（见 content/09-photo-art.js）。
     没登记的类型自动退回 category.art 的程序化 SVG，所以照片是可加可减的。 */
  photo: { dir: "assets/events/", files: {} },
  /* 主线：一个人这一辈子主要在过哪一条命（见 engine/arc.js + content/11-arcs.js）。
     单线制 —— 同一时刻只有一条活跃主线，但可以换线。 */
  arc: {},
  /* 竞选：每一次民选晋升的一连串事件（见 engine/campaign.js + content/61-campaigns.js）。
     单场制 —— 同一时刻只有一场活跃竞选，一幕一幕强制推进到投票日。 */
  campaign: {},
  /* 静好岁月：平静月份的随笔片段库（见 engine/vignette.js）。多个内容文件可各自追加片段。 */
  vignette: { title: "静好岁月", lede: "", fragments: [] }
};
POTUS.events = [];      // 事件库（全部内容包的合集）

/* 内容声明入口。用法见 docs/CONTENT-SCHEMA.md */
POTUS.define = function (kind, payload) {
  if (payload == null) return;
  if (kind === "event") { POTUS.events = POTUS.events.concat([].concat(payload)); return; }
  if (kind === "ending") { POTUS.reg.ending = POTUS.reg.ending.concat([].concat(payload)); return; }
  /* 定点事件表是"累加"：多个时代/主题文件可各自往全局 fixed 追加自己的历史锚点 */
  if (kind === "fixed") { POTUS.reg.fixed = POTUS.reg.fixed.concat([].concat(payload)); return; }
  /* 多语言覆盖层：载荷交给 engine/i18n.js 收着，boot 时按当前语言一次性并入。
     见 docs/I18N.md —— 内容原文件不动，英文写在 content/i18n/en/ 里。 */
  if (kind === "l10n") {
    const pl = [].concat(payload);
    for (const one of pl) {
      const lg = one.lang && POTUS.i18n.LANGS[one.lang] ? one.lang : "en";
      POTUS.i18n.ingest(lg, one);
    }
    return;
  }
  /* 世界线按绝对年份键控，必须**逐年深合并**：多个内容包各自铺自己的年份段
     （1991—1995 一个文件、1996—2000 一个文件），浅合并会让后写的整表顶掉前写的。
     其余 kind 一律维持 Object.assign 的浅合并语义。 */
  if (kind === "worldline") {
    const w = POTUS.reg.worldline;
    for (const field in payload) {
      const pv = payload[field];
      if (pv && typeof pv === "object" && !Array.isArray(pv)) {
        w[field] = Object.assign(w[field] || {}, pv);
      } else {
        w[field] = pv;
      }
    }
    return;
  }
  if (kind === "balance") {
    /* 词典类的键（tagNames）要**深合并**而不是整键覆盖——
       多个事件包各自登记自己的状态词条时，覆盖会把别人的词条全吃掉（踩过：
       writer 的 tagNames 把主配置的 fallen 等 60+ 词条整个顶掉了）。 */
    const DICT_KEYS = ["tagNames"];
    for (const dk of DICT_KEYS) {
      if (payload[dk] && typeof payload[dk] === "object") {
        POTUS.reg.balance[dk] = Object.assign(POTUS.reg.balance[dk] || {}, payload[dk]);
        delete payload[dk];
      }
    }
    Object.assign(POTUS.reg.balance, payload);
    return;
  }
  if (kind === "news") { Object.assign(POTUS.reg.newsOutlets, payload); return; }
  /* 风味词典是"逐 token 累加"：多个内容包可各自往同一个 token 追加候选词 */
  if (kind === "flavor") {
    const f = POTUS.reg.flavor;
    for (const tok in payload) f[tok] = (f[tok] || []).concat([].concat(payload[tok]));
    return;
  }
  /* 静好岁月的片段是"累加"而不是"覆盖"——允许多个内容文件各自添一段人生 */
  if (kind === "vignette") {
    const v = POTUS.reg.vignette;
    if (payload.title) v.title = payload.title;
    if (payload.lede) v.lede = payload.lede;
    if (payload.fragments) v.fragments = v.fragments.concat([].concat(payload.fragments));
    return;
  }
  /* 事件配图的照片表也是"累加"：dir 可被覆盖，files 逐条合并 ——
     于是新加一批事件/类型的人，可以在自己的内容包里补自己的照片，不用改别人文件。 */
  if (kind === "photo") {
    const p = POTUS.reg.photo;
    if (payload.dir) p.dir = payload.dir;
    if (payload.files) Object.assign(p.files, payload.files);
    return;
  }
  if (kind === "effect") {                        // 内容自定义效果键：{myKey: function(v, G){...}}
    POTUS._pendingEffects = Object.assign(POTUS._pendingEffects || {}, payload);
    for (const k in payload) if (POTUS.effect) POTUS.effect(k, payload[k]);
    return;
  }
  const bucket = POTUS.reg[kind];
  if (!bucket) { console.warn("[POTUS] 未知内容类别: " + kind); return; }
  Object.assign(bucket, payload);
};

/* ---------- 默认平衡参数（content 的 balance 包可覆盖任意项） ---------- */
const BALANCE_DEFAULTS = {
  startAge: 24, startFun: 10000, startRep: 0, startHp: 100, startAp: 8, startFav: 0, startLev: 0,
  startAttr: { CHA: 45, INT: 45, CUN: 45, INTG: 50 },
  tierMin: 0, tierMax: 9,
  /* v0.11 P1：生涯终点年 —— 游戏一路打到 2025 再结算成就，而非做到总统即终局。
     endYear 是唯一权威（挂在 stage.js endYear/nextYear）；死亡/入狱等仍可提前结束。 */
  endYear: 2025,

  /* ---- 建角掷骰：定命一掷 + 自由点 ----
   * rollAttrs   四属性各掷一次的范围（默认 35-55，d20+35 的味道）
   * rerolls     每个属性可以单独重掷几次（天命不公，给你一次反悔的机会）
   * freePoints  掷完之后可自由分配的点数（VIP 充值码在此之上追加，见 vipCodes）
   * freeCapPerAttr  单属性最多接受的加点 —— 防止把一维堆成怪物、其余躺平 */
  rollAttrs: { min: 35, max: 55, rerolls: 1 },
  freePoints: 8, freeCapPerAttr: 15,
  /* VIP 充值码（测试码表）：输入匹配即给本局追加自由点。
   * 已激活的码记在 localStorage（单机防重复）。正式运营前整个表都会换掉。 */
  vipCodes: { "VIP1": 1, "VIP5": 5, "VIP20": 20, "VIP50": 50 },

  /* ---- 时间：一个月一回合，一年 12 个月 ----
   * 一个「档期」= 一次需要玩家决策的事件。平静的月份会被自动跳过（只留一行月历记录）。
   * 目标节奏：常态年 ~4 个档期，危机年 8-12 个 —— 一个月一回合，但不是每个月都出事。
   *   pActive = clamp(activeChance + 时代压力×activePressureMul + 活跃度×activeBonusMul, min, max)
   *   slots   = slotsBase + (压力≥slotsPressureAt ?1:0) + (活跃度≥slotsBonusAt ?1:0) + rint(0,slotsVariance) */
  monthsPerYear: 12,
  activeChance: 0.12, activePressureMul: 0.04, activeBonusMul: 0.04,
  activeMin: 0.06, activeMax: 0.95,
  slotsBase: 1, slotsVariance: 1, slotsMax: 3,
  slotsPressureAt: 4, slotsBonusAt: 2,
  /* 玩家自身造成的「活跃度」：麻烦缠身、选举年、身居高位，日程都会变密 */
  bonusPressure: { scandal: 0.8, investigation: 0.8, election: 0.6, tierHigh: 0.5, tierHighAt: 4, leverage: 0.4, leverageAt: 3 },
  /* 时代专属事件的权重倍数：跨时代的通用事件会出现在所有时代里，
     不加权的话，时代专属内容会被通用内容淹没（越往后加内容越明显）。 */
  eraWeightMul: 3,
  /* 「事件续集」的权重倍数：一旦前情已经演过（ev.after 解锁），
     续集要明显更容易被抽到，否则一个故事会散落在几百个档期里连不起来。 */
  chainWeightMul: 9,

  /* ---- 日常公务 / 选民服务池（去时代化改造新增）----
     各级（含志愿者 tier 0 的基层事务：致悼词/剪彩/夜巡/调解邻里）都可能撞上的琐事（葬礼致辞/切蛋糕/town hall…），
     主吃选民池、量级轻。它不参与随机抽卡（事件带 chore:true，eligible 直接挡掉），
     只经 time.js 的 choresSlot 注入通道出现，频率可控、可回退。
     · enabled=false → 完全关闭，回到现状；
     · chance        → 本月已有档期时，额外再塞 1 条日常公务的概率（默认 0，保守）；
     · emptyFillChance → 本月本会空转（无 fixed/竞选/随机档期）时，用一条日常公务
                        兜底的概率。设成 1 = "空月保底 1"；默认 0.7，留出纯静好岁月月份。*/
  choreDynamic: { enabled: true, chance: 0, emptyFillChance: 0.7 },

  /* ---- 权重管线：玩家处境造成的倾斜（见 engine/events.js 的 P.weightBreakdown）----
   *   w = 基础 × 时代 × 续集 × tilt
   *   tilt = 身份 × 资源 × 主线 × 重复    ← 这四项按玩家逐条算出来，必须夹取 + 封顶
   * 夹取是**双向**的：向上防刷屏，向下防"某类玩家被彻底饿死"。
   * 倾斜表本身写在 content/01-config.js（identityBias / resourceBias / 主线里的 weightMul）。
   * repeatBias = 1 表示**关闭**重复惩罚；调到 0.5 会让同一类型每多演一次就减半。
   * 打开它会把类型分布明显拉平，但会牵动死亡 / 晋升曲线 —— 改完必须重跑 300 局。 */
  weightFactorMin: 0.4, weightFactorMax: 3, weightTiltCap: 8, repeatBias: 1,
  identityBias: [], resourceBias: [],
  /* 主线（arc）：同一时刻只有一条，但可以换线。见 engine/arc.js
   *   switchAfterMonths  跑够这么久之后才允许换线。太短会让一条线还没成形就被顶掉；
   *                      24 个月（两年）= 一条线至少要交代两年，才轮到"更贴身的那条"。
   *   switchMargin       换线要**高出一整档**，不是高一点就换（否则同档的线互相顶来顶去）。
   *   cooldownMonths     一条线走完/淡出之后的空窗，空窗期由「静好岁月」接管。
   *   maxPerLife         一局最多进几条线。定成 4 = "一辈子三四个章节"；没有这个上限时，
   *                      模拟里会跑到 7-8 条，读起来像清单而不像人生。
   *   maxActive          单线制。内容方可以放开，但面板与权重叠加都只按单线设计。 */
  arc: { switchAfterMonths: 24, switchMargin: 12, cooldownMonths: 18, maxPerLife: 4, maxActive: 1 },

  /* 把柄的贬值率：每年有一定概率失效一份（当事人下台、事情过去了、证据过期）。
     把柄不能当永久资产囤，否则玩家会只囤不用。 */
  leverageDecayChance: 0.34,
  /* 时代压力 → 事件量级（大/中/普通）的权重。pressure 越高，大事件越可能出现。
   * 注意：大事件默认「一局只演一次」（见 engine/events.js 的 P.isUnique），
   *      所以大事件池会被消耗光，之后按 gradeFallback 降级。多写大事件、或给某个大事件写 unique:false，
   *      是这个模型下唯一需要注意的坑。 */
  gradeWeights: {
    major: { base: 0.25, perPressure: 0.5 },
    mid: { base: 2.2, perPressure: 0.7 },
    minor: { base: 7.0, perPressure: -0.5 }
  },
  gradeFallback: { major: ["major", "mid", "minor"], mid: ["mid", "minor"], minor: ["minor"] },

  /* ---- 年度结算 ---- */
  hpDecayMin: 1, hpDecayMax: 3, interestRate: 0.03, scandalDecayChance: 0.25,
  blackswanChance: 0.20, recentCap: 20, retireAge: 74,
  apBase: 6, apHealthDiv: 25, apMin: 1, apMax: 12,

  aiCallCap: 80, fuzzBands: [0.15, 0.35, 0.55, 0.75, 0.90],
  fuzzLabels: ["渺茫", "不利", "五五开", "有利", "稳操胜券", "几乎必胜"],

  /* ---- 静好岁月：平静的月份里，主角照样在过日子、按部就班地长 ----
   * 叙事片段库在 content/08-vignettes.js；这里的数字只管"成长曲线"。
   * 年轻的年头学得快（attrAgeFade），年纪上去之后渐渐定型；
   * 健康从平静里恢复一点，是"没有大事发生"最实在的价值。 */
  vignette: {
    enabled: true,
    maxShown: 4,             // 一次最多展开几段随笔（平静太久的年月只记一句"另有多月"）
    /* 属性成长 */
    attrChance: 0.20,        // 每个平静月的基准概率（再乘年龄衰减）
    attrGain: 1, attrCap: 88,
    attrKeys: ["CHA", "INT", "CUN", "INTG"],
    attrAgeFade: true,       // 越老越长不动：×(1 - 已从政年数/60)，下限 0.25
    /* 健康 / 声望 / 人脉 / 资金
       健康这一项必须克制：平静的月份只够把年度衰减"垫回来一点"。
       默认取 0 而不是 0.08 —— 死亡线本来就卡在退休年龄上，任何正的回血率
       都会把一大批"累死"翻成"退休"，整个终局曲线随之变温和。
       想要"平静的月份让人喘口气"的手感，把它调到 0.04，并重跑 300 局看结局分布。 */
    hpChance: 0, hpGain: 1,
    repChance: 0.06, repGain: 1,
    contactChance: 0.20, contactGain: 1,
    funRate: 0               // 平静月的资金生息（默认 0：生息统一放在年终结算）
  }
};

/* 旧版（v0.2 "一年几回合"）参数 → 新版按月参数的兼容映射 */
const BEAT_ALIAS = {
  beatBase: "slotsBase", beatVariance: "slotsVariance",
  beatMin: null, beatMax: "slotsMax",
  beatScandalBonus: null, beatInvestigationBonus: null, beatElectionBonus: null
};

POTUS.balance = function () {
  const b = Object.assign({}, BALANCE_DEFAULTS, POTUS.reg.balance);
  /* 兼容：老内容包若只声明了 beat*，映射到 slots*（slots* 一旦显式声明就优先） */
  if (POTUS.reg.balance) {
    for (const oldKey in BEAT_ALIAS) {
      const newKey = BEAT_ALIAS[oldKey];
      if (!newKey || POTUS.reg.balance[newKey] != null) continue;
      if (POTUS.reg.balance[oldKey] != null) b[newKey] = POTUS.reg.balance[oldKey];
    }
  }
  return b;
};

/* ---------- 运行时状态 ---------- */
POTUS.G = null;          // 当前存档状态
POTUS.CSEL = {};         // 建角暂存
POTUS.recentIds = [];    // 近期事件去重

/* ---------- 工具 ---------- */
POTUS.$ = function (s) { return document.querySelector(s); };
POTUS.app = function () { return document.getElementById("app"); };
POTUS.clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
POTUS.rint = function (a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; };
POTUS.pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };
POTUS.chance = function (p) { return Math.random() < p; };
POTUS.hasFlag = function (f) { return POTUS.G.flags.indexOf(f) >= 0; };
POTUS.addFlag = function (f) { if (POTUS.G.flags.indexOf(f) < 0) POTUS.G.flags.push(f); };
POTUS.delFlag = function (f) { POTUS.G.flags = POTUS.G.flags.filter(function (x) { return x !== f; }); };
/* 隐藏计数器 buff（程度记忆）：读 / 取。写入走 effects 的 count 处理器。 */
POTUS.counter = function (k) { const c = POTUS.G && POTUS.G.counters; return (c && c[k]) || 0; };
POTUS.pushLog = function (s) {
  const G = POTUS.G;
  const stamp = (G.month && G.month <= 12)
    ? POTUS.t("ui.core.stampYm", "{y}年{m}月", { y: G.year, m: G.month })
    : POTUS.t("ui.core.stampY", "{y}年", { y: G.year });
  G.log.unshift("[" + stamp + "] " + s);
  if (G.log.length > 80) G.log.pop();
};

/* 大事件/中事件的中文名（引擎只用来显示，内容可覆盖 reg.grade） */
POTUS.gradeName = function (g) {
  const d = POTUS.reg.grade[g];
  return d ? (d.name || g) : ({
    major: POTUS.t("ui.core.gradeMajor", "大事件"),
    mid: POTUS.t("ui.core.gradeMid", "中事件"),
    minor: POTUS.t("ui.core.gradeMinor", "小事")
  }[g] || g);
};
/* 事件类型（类别）定义，内容可增删 */
POTUS.category = function (key) {
  return POTUS.reg.category[key] || POTUS.reg.category.general || null;
};
POTUS.categoryName = function (key) {
  const c = POTUS.category(key);
  return c ? (c.name || key) : (key || POTUS.t("ui.core.catGeneral", "综合"));
};

/* ---------- 时代媒介（口径）----------
 * 某个"说话的方式"在某一年到底存不存在：报纸 / 广播 / 电视 / 互联网 / 短视频 …
 * 内容在 content/06-media.js 里定义各自的 from / to 年份。
 * 事件只要声明 medium，引擎就会自动按年份把它挡在时代之外——
 * 1840 年不会有人发推文，1960 年也不会有热搜。 */
POTUS.medium = function (key) { return POTUS.reg.medium[key] || null; };
POTUS.mediumName = function (key) { const m = POTUS.medium(key); return m ? (m.name || key) : key; };
POTUS.mediaAvail = function (key) {
  const m = POTUS.medium(key);
  if (!m) return false;
  const y = (POTUS.G && POTUS.G.year) || 0;
  if (m.from != null && y < m.from) return false;
  if (m.to != null && y > m.to) return false;
  return true;
};
/* 当前年份存在的媒介列表（界面用：让玩家一眼看见"这个年代有什么"） */
POTUS.mediaNow = function () {
  const out = [];
  for (const k in POTUS.reg.medium) if (POTUS.mediaAvail(k)) out.push({ key: k, name: POTUS.mediumName(k) });
  return out;
};
/* 事件声明的媒介要求：medium 写字符串或数组，满足其中「任一个」即可发生。
 *   medium: "tv"                  → 要有电视
 *   medium: ["tv", "internet"]    → 电视或互联网，有其一就行（"靠哪种都传得开"） */
POTUS.mediumOK = function (ev) {
  const m = ev && ev.medium;
  if (!m) return true;
  const list = [].concat(m);
  if (!list.length) return true;
  for (let i = 0; i < list.length; i++) if (POTUS.mediaAvail(list[i])) return true;
  return false;
};
/* 事件声明的年份窗口：fromYear / toYear / years:[a,b] 三种写法都行 */
POTUS.yearOK = function (ev) {
  const y = (POTUS.G && POTUS.G.year) || 0;
  if (ev.fromYear != null && y < ev.fromYear) return false;
  if (ev.toYear != null && y > ev.toYear) return false;
  if (ev.years && (y < ev.years[0] || y > ev.years[1])) return false;
  return true;
};

POTUS.factionName = function (k) {
  const f = POTUS.reg.faction[k];
  /* reg.factionUnknown 是加载期常量「其他」，英文覆盖层 boot 后才就位 → 在取用点过 t() */
  return f ? (f.name || k) : (k || POTUS.t("ui.core.factionUnknown", POTUS.reg.factionUnknown));
};
POTUS.scandalLevel = function () {
  const lv = POTUS.G.flags.filter(function (f) { return f.indexOf("scandal_") === 0; })
    .map(function (f) { return parseInt(f.split("_")[1], 10) || 0; });
  return lv.length ? Math.max.apply(null, lv) : 0;
};

/* ---------- 时间坐标：把"年+月"压成一个单调递增的整数 ----------
 * 事件链（ev.after 的 minMonthsAfter）和晋升在位时长（ev.minTenure）都靠它算间隔。
 * 用整数而不是日期对象，是为了能直接存进 JSON 存档。 */
POTUS.monthSeq = function () {
  const G = POTUS.G;
  if (!G) return 0;
  return (G.year || 0) * 12 + (G.month || 1);
};
/* 某个事件上一次被演到，距今多少个月（没演过返回 null） */
POTUS.monthsSince = function (eventId) {
  const at = POTUS.G && POTUS.G.doneSeq ? POTUS.G.doneSeq[eventId] : null;
  if (at == null) return null;
  return POTUS.monthSeq() - at;
};
/* 在当前层级待了几个月（用来实现"一级台阶要蹲够年头"） */
POTUS.monthsAtTier = function () {
  const G = POTUS.G;
  if (!G) return 0;
  return POTUS.monthSeq() - (G.tierSince == null ? POTUS.monthSeq() : G.tierSince);
};

/* ---------- 人脉（contacts）----------
 * 一个人 = 注册表里的一条定义（content/07-contacts.js）+ 存档里的一个好感数字。
 * 存档里出现这个 key 就代表"你认识他"。事件可以：
 *   req: { contact: "ruby" }        认识才能选
 *   effects: { contact: { ruby: 8 } }  好感 +8（首次接触时会自动登记）
 *   contacts: ["ruby"]              事件级门槛：不认识就不触发
 */
POTUS.contactDef = function (id) { return POTUS.reg.contact[id] || null; };
POTUS.contactName = function (id) {
  const d = POTUS.contactDef(id);
  return d ? (d.name || id) : (id || POTUS.t("ui.core.contactSomeone", "某人"));
};
POTUS.hasContact = function (id) {
  const G = POTUS.G;
  return !!(G && G.contacts && G.contacts[id] != null);
};
POTUS.contactFavor = function (id) {
  const G = POTUS.G;
  return (G && G.contacts && G.contacts[id] != null) ? G.contacts[id] : 0;
};
/* 当前认识的人，按"关系深浅 + 是否在册"排序（界面用） */
POTUS.myContacts = function () {
  const G = POTUS.G, out = [];
  if (!G || !G.contacts) return out;
  for (const id in G.contacts) {
    const d = POTUS.contactDef(id) || { name: id };
    out.push({ id: id, name: d.name || id, role: d.role || "", tag: d.tag || "", favor: G.contacts[id] });
  }
  out.sort(function (a, b) { return Math.abs(b.favor) - Math.abs(a.favor); });
  return out;
};

/* ---------- 出生州（state）----------
 * 一个州 = 注册表里的一条定义（content/12-states.js）+ 存档里的 state key。
 * 州的政治倾向（lean: D/R/S + strength 1-3）参与两件事：
 *   1) 建角时按 党派×州倾向 给起点派系加成（顺风/逆风/摇摆）
 *   2) 内容的 identityBias / 事件门槛可用 when.states 把事件钉在特定州 */
POTUS.stateDef = function (id) { return POTUS.reg.state[id] || null; };
POTUS.stateName = function (id) {
  const d = POTUS.stateDef(id);
  return d ? (d.name || id) : (id || "");
};
/* 州对某党是否顺风：深蓝州(D,strength>=2)对民主党顺风；深红同理；摇摆州谁都不顺风 */
POTUS.stateWindFor = function (stateId, party) {
  const s = POTUS.stateDef(stateId);
  if (!s || !party || s.lean === "S" || !s.strength) return 0;
  if (s.lean === party) return s.strength;       // 顺风：+1~+3
  return -s.strength;                            // 逆风：-1~-3（拉拢少数派的地形）
};

/* ---------- VIP 充值码（测试码表；正式运营前整表替换） ----------
 * 测试阶段：同一个码可以无限次使用（用户 v0.5.2 决定）——方便反复试手感。
 * 正式运营前把无限用关掉：把 INFINITE 置 false 即恢复"一码一用"（记 localStorage）。
 * 返回 null = 激活成功；返回字符串 = 失败原因。 */
POTUS.vipInfinite = true;
POTUS.vipActivate = function (code) {
  const b = POTUS.balance();
  const codes = b.vipCodes || {};
  const key = String(code || "").trim().toUpperCase();
  if (!key) return POTUS.t("ui.core.vipEmpty", "请输入充值码");
  if (codes[key] == null) return POTUS.t("ui.core.vipUnknown", "没有这个码：{k}", { k: key });
  if (!POTUS.vipInfinite) {
    let used = [];
    try { used = JSON.parse(localStorage.getItem("potus_vip_used") || "[]"); } catch (e) { used = []; }
    if (used.indexOf(key) >= 0) return POTUS.t("ui.core.vipUsed", "这个码已经用过了");
    used.push(key);
    try { localStorage.setItem("potus_vip_used", JSON.stringify(used)); } catch (e) { }
  }
  return null;
};
POTUS.vipUsedList = function () {
  try { return JSON.parse(localStorage.getItem("potus_vip_used") || "[]"); } catch (e) { return []; }
};


/* ---------- 选民池（v0.5.2）：三档具体人数，不是百分比 ----------
 * 用户的设计：基层好感不该是 -100~100 的抽象条——"满了=全国满意？"。
 * 选民是数出来的：warm（有好感）/ diehard（死忠）/ oppose（反对），单位是人。
 * 选区规模随层级扩大（balance.voterBase.electorate），升位后旧数字按新选区重新换算：
 * 你在市议会的五千人死忠，放到全州只占一小块——人数还在，密度稀释。
 * faction.base 的语义同时收窄为「基层组织关系」（工会/教会/社团的机器好感），不再是选民。 */
POTUS.voterPools = function () {
  const G = POTUS.G;
  if (!G) return { warm: 0, diehard: 0, oppose: 0 };
  return G.voters || { warm: 0, diehard: 0, oppose: 0 };
};
/* 当前选区的注册选民规模（按层级取表） */
POTUS.electorateSize = function () {
  const b = POTUS.balance();
  const table = (b.voterBase && b.voterBase.electorate) || [5000, 18000, 70000, 180000, 450000, 1200000, 3000000, 8000000, 20000000, 240000000];
  const G = POTUS.G;
  return table[G ? G.tier : 0] || table[0];
};
/* 选民效果键：effects.voters = { warm: 500, diehard: 100, oppose: -200 }。
   负数=流失（oppose 的负数是拉走了反对者）。人数夹在 [0, 选区规模]。 */
POTUS.applyVoters = function (delta) {
  const G = POTUS.G;
  if (!G || !delta) return;
  if (!G.voters) G.voters = { warm: 0, diehard: 0, oppose: 0 };
  const cap = POTUS.electorateSize();
  ["warm", "diehard", "oppose"].forEach(function (k) {
    if (delta[k] == null) return;
    G.voters[k] = Math.max(0, Math.min(cap, (G.voters[k] || 0) + delta[k]));
  });
};
/* 层级变化时重新换算选民池：升位只能带走旧选区的一小部分人（carryKeep），其余留在老地盘 */
POTUS.rescaleVoters = function (fromTier, toTier) {
  const G = POTUS.G;
  if (!G || !G.voters || fromTier === toTier) return;
  const b = POTUS.balance();
  const vb = b.voterBase || {};
  const table = vb.electorate || [5000, 18000, 70000, 180000, 450000, 1200000, 3000000, 8000000, 20000000, 240000000];
  const ratio = table[toTier] / (table[fromTier] || 1);
  /* 升位=换选区：旧地盘的人只能带走一小部分。carryKeep 是"升一级"的锚，
     跨得越多带得越少（每多跳一级再乘一次 carryStepDecay）—— 跳级=破格直提，根基更薄。 */
  let keep = 1;
  if (ratio > 1) {
    const steps = Math.max(1, toTier - fromTier);
    const base = vb.carryKeep != null ? vb.carryKeep : 0.35;
    const decay = vb.carryStepDecay != null ? vb.carryStepDecay : 0.66;
    keep = base * Math.pow(decay, steps - 1);
  }
  ["warm", "diehard", "oppose"].forEach(function (k) {
    G.voters[k] = Math.round((G.voters[k] || 0) * keep);
  });
};
/* 选举胜算参考（界面用）：死忠=必到票，好感=可能票，反对=对手的票，其余=未定盘 */
POTUS.electionStrength = function () {
  const v = POTUS.voterPools();
  const size = POTUS.electorateSize();
  const mine = v.diehard * 3 + v.warm;
  const theirs = v.oppose * 2;
  const rest = Math.max(0, size - v.diehard - v.warm - v.oppose);
  const total = mine + theirs + rest * 0.35;
  return { mine: mine, theirs: theirs, rest: rest, size: size, pct: Math.round(Math.min(100, mine / Math.max(1, total) * 100)) };
};

/* ---------- 选民动态（v0.6）----------
 * 见 content/01-config.js 的 voterDynamic 注释。这里只放三件事：
 *   voterTargets()    该层级"自然状态下"的目标基本盘（drift 朝它收敛）
 *   voterDrift()      平静月的自然增减（日常工作攒口碑 / 在任必然有人不满）
 *   voterEdge()       选民底气 → 判定修正（-1..+1），晋升/连任/政策推进共用
 *   eventVoterDelta() 事件成败 → 选民增减（内容显式写了 voters 就交还给内容）
 * 全部参数读 balance.voterDynamic，内容侧可调、不用改引擎。 */
POTUS.voterTargets = function () {
  const b = POTUS.balance(), d = b.voterDynamic || {};
  const size = POTUS.electorateSize();
  const num = function (x, dflt) { return size * (x == null ? dflt : x); };
  return {
    size: size,
    warm: Math.round(num(d.targetShare, 0.08)),
    diehard: Math.round(num(d.diehardTargetShare, 0.02)),
    oppose: Math.round(num(d.opposeTargetShare, 0.04))
  };
};

/* 平静月的自然增减：向目标均值回归。
   delta = (目标 - 当前) × monthly × 轨道系数 × 声望系数
   低于目标就涨、高于目标就慢慢掉 —— 天然有界（挂机也不会满池），
   且事件赢来的超额支持会随时间缓慢回落（注意力是要不断续费的）。
   返回本月实际增减（没有变化时返回 null），供月卡显示。 */
POTUS.voterDrift = function () {
  const G = POTUS.G;
  const b = POTUS.balance(), d = b.voterDynamic || {};
  if (!G || d.enabled === false) return null;
  const t = POTUS.voterTargets();
  const monthly = d.monthly == null ? 0.05 : d.monthly;
  const trackMul = (d.track && d.track[G.track] != null) ? d.track[G.track] : 1;
  const repMul = (d.repWeight == null ? 0.6 : d.repWeight) + (G.rep || 0) / 100;
  const k = monthly * trackMul * repMul;
  const cur = POTUS.voterPools();
  const out = {};
  ["warm", "diehard", "oppose"].forEach(function (key) {
    const delta = Math.round((t[key] - (cur[key] || 0)) * k);
    if (delta) out[key] = delta;
  });
  if (!Object.keys(out).length) return null;
  POTUS.applyVoters(out);
  return out;
};

/* 选民底气 → 判定修正 ∈ [-1, 1]。
   中心对齐"自然均衡点"（edgeCenter，默认 27%）：那里修正为 0，
   所以既不奖励也不惩罚"正常经营"的玩家（300 局平衡不被推翻）；
   明显低于均衡点扣分、明显高于加分 —— 选民不是背景板，是你能不能继续往上走的本钱。 */
POTUS.voterEdge = function () {
  const b = POTUS.balance(), d = b.voterDynamic || {};
  if (d.enabled === false) return 0;
  const center = d.edgeCenter == null ? 27 : d.edgeCenter;
  const span = d.edgeSpan == null ? 35 : d.edgeSpan;
  const pct = POTUS.electionStrength().pct;
  return POTUS.clamp((pct - center) / span, -1, 1);
};

/* 事件成败 → 选民自动增减。tierName 是本次判定档位（crit/ok/meh/fail/critfail）。
   规则：内容显式写了 effects.voters → 返回 null（作者说了算）；
        事件本身改变身位（tier/fall/hardEnd）→ 返回 null（当选基本盘由 effects.tier 单独发放，
        避免和"当选自带基本盘"重复计一次）。
   返回 {warm,diehard,oppose} 或 null（无变化）。 */
POTUS.eventVoterDelta = function (ev, choice, outcome, tierName) {
  const G = POTUS.G;
  const b = POTUS.balance(), d = b.voterDynamic || {};
  if (!G || d.enabled === false) return null;
  const eff = (outcome && outcome.effects) || {};
  if (eff.voters || eff.tier || eff.fall || eff.hardEnd) return null;
  const mul = (d.byOutcome || {})[tierName];
  if (!mul) return null;
  const grade = G.__curGrade || POTUS.gradeOf(ev);
  const base = POTUS.electorateSize() * ((d.eventBase || {})[grade] == null ? 0 : d.eventBase[grade]);
  if (!base) return null;
  const catMul = (d.categoryMul || {})[ev && ev.category];
  const cm = catMul == null ? 1 : catMul;
  const out = {};
  ["warm", "diehard", "oppose"].forEach(function (k) {
    const w = mul[k];
    if (!w) return;
    const n = Math.round(base * w * cm);
    if (n) out[k] = n;
  });
  return Object.keys(out).length ? out : null;
};

/* 把「事件自动选民增减」并进 effects，返回**新的** effects 对象（不改动内容包原件）。
   结算与显示都走这一个对象，保证"账面上写的"和"实际扣的"永远一致。
   内容已显式声明 voters、或本次无变化时原样返回。 */
POTUS.withEventVoters = function (effects, ev, choice, outcome, tierName) {
  const base = effects || {};
  const add = POTUS.eventVoterDelta(ev, choice, outcome, tierName);
  if (!add) return base;
  const merged = {};
  for (const k in base) merged[k] = base[k];
  const v = {};
  for (const k in (base.voters || {})) v[k] = base.voters[k];
  for (const k in add) v[k] = (v[k] || 0) + add[k];
  merged.voters = v;
  return merged;
};

/* ---------- 职位月薪（"身位值多少钱"的唯一口径） ----------
 * 每月的上班工资与投注的资金汇率都从这里取，保证"身份决定钱"只有一个来源：
 *   reg.officeSalary["track_tier"] → miss 退 "*_tier" → 再退公式 salaryBase×(1+tier×salaryPerTier)。
 * 内容（content/14-offices.js）可以按轨道给不同薪级 —— 财富轨道 T5 就是比选举轨道 T5 有钱。
 * 改工资表 = 同时改了日常收入与投注价码，这**是有意的**：两者本来就该同源。 */
POTUS.officeSalary = function () {
  const G = POTUS.G;
  if (!G) return 0;
  const table = POTUS.reg.officeSalary || {};
  let v = table[G.track + "_" + G.tier];
  if (v == null) v = table["*_" + G.tier];
  if (v == null) {
    const q = POTUS.balance().quietAccount || {};
    v = Math.round((q.salaryBase == null ? 2000 : q.salaryBase) * (1 + G.tier * (q.salaryPerTier == null ? 2.2 : q.salaryPerTier)));
  }
  return Number(v) || 0;
};

/* ---------- 学生贷款：一个月的计息 + 还款 ----------
 * 由每月上班账（core.js 的 monthlyLedger）调用，与工资/开销同一个时机、同一口径。
 * 规则：
 *   1) 先按月利率对余额计息（还不清就一直滚 —— 还原「多年后仍在还」）；
 *   2) 月供目标 = max(minPayment, 月薪 × payShare)，随收入上升而加速；
 *   3) 月供被「当前欠款」与「可用现金」双重封顶 —— 掏不出就本月不还本、只挂息，绝不把 fun 扣成负；
 *   4) 余额到 0 就锁死为 0，之后不再产生任何影响（cleared 供界面显示「已还清」）。
 * 返回 null 表示本月无贷（无余额 / 未启用）；否则返回 {interest, pay, principal, remaining, cleared}。 */
POTUS.loanStep = function () {
  const G = POTUS.G, s = (POTUS.balance() || {}).studentLoan || {};
  if (!G || !s.enabled) return null;
  if (G.debt == null) G.debt = 0;
  if (G.debt <= 0) { G.debt = 0; return null; }
  if (G.loanLate == null) G.loanLate = 0;
  const rate = s.interestAnnual == null ? 0.045 : s.interestAnnual;
  const interest = Math.round(G.debt * rate / 12);
  G.debt += interest;                                    /* 先计息 */
  const salary = Math.max(0, POTUS.officeSalary ? POTUS.officeSalary() : 0);
  const share = s.payShare == null ? 0.25 : s.payShare;
  const minPay = s.minPayment == null ? 120 : s.minPayment;
  const target = Math.min(G.debt, Math.max(minPay, Math.round(salary * share)));  /* 本月应还 */
  let pay = target;
  pay = Math.min(pay, Math.max(0, Math.round(G.fun || 0)));   /* 现金见底则少还 / 不还 */
  pay = Math.max(0, pay);
  G.fun -= pay;
  G.debt = Math.max(0, Math.round(G.debt - pay));
  const cleared = G.debt <= 0;
  if (cleared) { G.debt = 0; G.loanLate = 0; }
  /* 断供定义 = 连本月利息都没覆盖住（余额开始真实增长）。
     不用 pay<target：升职工资一涨、月供目标跳档，会把按时交钱的人误判成老赖。 */
  else if (pay < interest) G.loanLate++;                  /* 没能还满 → 连续逾期 +1 */
  else G.loanLate = 0;                                    /* 按时还满 → 逾期归零 */
  /* 死亡螺旋收口：连续断供到难度上限 → 信用破产。走 hardEnd 同一管道
     （pendingHardEnd → P.ending(reason)），判定点与其他终局一致。 */
  const lim = POTUS.loanLateLimit ? POTUS.loanLateLimit() : 0;
  if (lim > 0 && G.loanLate >= lim && !G.pendingHardEnd) G.pendingHardEnd = "bankrupt";
  return { interest: interest, pay: pay, principal: pay - interest, remaining: G.debt, cleared: cleared, late: G.loanLate };
};

/* 连续断供多少个月触发信用破产（0/缺省 = 不启用）。按难度分档：
   越是白手起家，银行越不留情 —— 见 content/01-config.js studentLoan.lateLimit。 */
POTUS.loanLateLimit = function () {
  const G = POTUS.G, s = (POTUS.balance() || {}).studentLoan || {};
  if (!G || !s.enabled || !(G.debt > 0)) return 0;
  const byDiff = s.lateLimit || {};
  const v = byDiff[G.difficulty || "normal"];
  return v == null ? 0 : v;
};

/* ---------- 负债设底：触到谷底则由家人/金主托一把 ----------
 * 见 content/01-config.js 的 balance.debtFloor。fun 见底到某深度即触发一次接济：
 * 资金回正到 restore×(1+tier)、记 G.bailouts、扣一笔声望作代价。
 * 幂等：只在已触底时动作，接济后 fun 高于谷底，同回合重复调用即空转。
 * 返回接济信息（供记账/调试），未触底返回 null。 */
POTUS.enforceDebtFloor = function () {
  const G = POTUS.G; if (!G) return null;
  const b = (POTUS.balance() || {}).debtFloor || {};
  if (b.enabled === false) return null;
  if (G.fun == null) G.fun = 0;
  const tier = G.tier || 0;
  const depth = Math.abs(b.depth == null ? 6000 : b.depth) * (1 + tier * (b.perTier == null ? 1.2 : b.perTier));
  if (G.fun > -depth) return null;                       /* 还没到谷底 */
  const restore = Math.round((b.restore == null ? 2500 : b.restore) * (1 + tier));
  const repCost = b.repCost == null ? 4 : b.repCost;
  G.fun = restore;
  if (repCost > 0) G.rep = POTUS.clamp((G.rep || 0) - repCost, 0, 100);
  G.bailouts = (G.bailouts || 0) + 1;
  const low = tier <= 2;
  POTUS.pushLog(POTUS.t(low ? "ui.core.bailoutLow" : "ui.core.bailoutHigh",
    low ? "山穷水尽——家里人凑了一笔钱把你托住：资金回到 ${amt}k，但丢了面子（声望 -{rep}）。这是本局第 {n} 次被接济。"
        : "现金见底——老同事和金主出手周转：资金回到 ${amt}k，难免落人话柄（声望 -{rep}）。这是本局第 {n} 次被接济。",
    { amt: Math.round(restore / 1000), rep: repCost, n: G.bailouts }));
  return { restore: restore, repCost: repCost, bailouts: G.bailouts };
};

/* ---------- 每月"上班"的账（时间轴上跑，有事/无事月都结算一次） ----------
 * v0.9：日常收入过去只在平静月结算，导致"越忙（等级/压力越高→事件月越多）反而越赚不到工资"的倒挂。
 * 现在把"工资 - 体面开销 + 学贷还款 + 选区选民自然增减"统一搬到每月经手一次，收益才真正跟着身位走。
 *   · 工资只从 POTUS.officeSalary() 取（与投注汇率同一口径）；
 *   · 先进工资、后还学贷（loanStep 会拿现金封顶还款，顺序有意）；
 *   · 幂等：同一个月只结一次，结果记进 G.ledger[month]（随存档持久化），界面只读不再扣钱。 */
POTUS.monthlyLedger = function (m) {
  const G = POTUS.G;
  if (!G || m == null) return null;
  if (G.ledgerYear !== G.year) { G.ledgerYear = G.year; G.ledger = {}; }
  if (!G.ledger) G.ledger = {};
  if (G.ledger[m]) return G.ledger[m];
  const q = POTUS.balance().quietAccount || {};
  const salary = POTUS.officeSalary();
  const living = Math.round(POTUS.rint(q.livingMin == null ? 500 : q.livingMin, q.livingMax == null ? 1400 : q.livingMax) * (1 + G.tier * (q.livingTierCoef == null ? 0.6 : q.livingTierCoef)));
  const net = salary - living;
  G.fun += net;                                             /* 工资进、开销出 */
  const loan = POTUS.loanStep ? POTUS.loanStep() : null;    /* 学贷计息 + 还款（动用上面的现金） */
  const bailout = POTUS.enforceDebtFloor ? POTUS.enforceDebtFloor() : null; /* 掉到谷底则被接济（有代价） */
  const voters = POTUS.voterDrift ? POTUS.voterDrift() : null; /* 选区选民自然增减 */
  const rec = {
    month: m, salary: salary, living: living, net: net,
    loanPay: (loan && loan.pay) || 0, loanInterest: (loan && loan.interest) || 0, loanCleared: !!(loan && loan.cleared),
    bailout: !!bailout,
    voters: voters || null, debt: G.debt || 0, loanLate: G.loanLate || 0
  };
  G.ledger[m] = rec;
  return rec;
};

POTUS.stamp = function (eventId) {
  const G = POTUS.G;
  if (!G) return;
  if (!G.doneSeq) G.doneSeq = {};
  G.doneSeq[eventId] = POTUS.monthSeq();
};

/* ---------- 存档 ---------- */
const SAVE_KEY = "potus_save_v1";
POTUS.serialize = function () { return JSON.stringify(POTUS.G); };

/* 存档迁移：把旧版存档补齐到当前形状（月回合 / 把柄 / 人脉 / 事件链 / 在位时长） */
POTUS.migrate = function (G) {
  if (!G) return G;
  if (G.month == null) G.month = 1;                       // 旧存档只有"第几个 beat"，没有月份
  if (G.flags == null) G.flags = [];
  if (G.counters == null) G.counters = {};                  /* v0.6 隐藏计数器 buff */
  if (G.doneIds == null) G.doneIds = [];
  if (G.quietMonths == null) G.quietMonths = [];
  if (G.yearHeads == null) G.yearHeads = [];
  if (G.slotIndex == null) G.slotIndex = 0;
  if (G.slotCount == null) G.slotCount = 0;
  if (G.monthPlan == null) G.monthPlan = [];
  if (G.ledger == null) G.ledger = {};                       // v0.9 每月上班账（幂等结算），旧存档补空表
  if (G.ledgerYear == null) G.ledgerYear = G.year;
  if (G.curMonth != null && G.month === 1) G.month = G.curMonth;   // 尽量接住旧存档的月份
  /* v0.12 存档迁移：时代锚点选择器下线后，旧存档可能是 1990/2008 等开局年份。
     年龄与年份在活树里始终同步步进（G.age++ / G.year++），所以工龄（age-startAge）可信：
     平移 G.year = 当前时代 startYear + 工龄，人物年龄、履历年限都不重算。 */
  if (G.era && G.era !== "1980_REAGAN" && POTUS.reg.era["1980_REAGAN"]) {
    const sa = (POTUS.balance() || {}).startAge || 24;
    G.year = POTUS.reg.era["1980_REAGAN"].startYear + Math.max(0, (G.age || sa) - sa);
    G.era = "1980_REAGAN";
  }
  /* v0.4 新增状态 */
  if (G.lev == null) G.lev = 0;                           // 把柄（旧存档没有 = 0 份）
  if (G.debt == null) G.debt = 0;                         // 学生贷款余额（旧存档没有 = 0）
  if (G.loanLate == null) G.loanLate = 0;                 // 学贷连续逾期月数
  if (G.bailouts == null) G.bailouts = 0;                 // v0.11 负债设底：本局被接济次数
  if (G.peakTier == null) G.peakTier = G.tier || 0;       // v0.11 P1：生涯峰值层级（成就结算用）
  if (G.contacts == null) G.contacts = {};                // 人脉好感表
  if (G.doneSeq == null) G.doneSeq = {};                  // 事件发生时的"月份序号"，事件链靠它算间隔
  if (G.tierSince == null) G.tierSince = POTUS.monthSeq() - (G.tier || 0) * 12;  // 在位时长
  /* v0.4 静好岁月：本年已经结算过随笔/成长的最高月号 + 本年已写好的随笔 */
  if (G.vigMonth == null) G.vigMonth = 0;
  if (G.quietLog == null) G.quietLog = [];
  if (G.vigYear == null) G.vigYear = G.year;
  /* v0.5 主线：当前主线 + 本局走过的主线（旧存档 = 还没进过任何主线，
     下一次 arcTick 会按当时的身份重新选一条，所以旧存档能平滑接上） */
  if (G.arc == null) G.arc = null;
  if (G.arcLog == null) G.arcLog = [];
  if (G.arcCool == null) G.arcCool = 0;      // 换线空窗的截止月序号（0 = 随时可开新线）
  /* 竞选链：当前竞选 + 本局打过的竞选 + 败选重开冷却（旧存档 = 还没开打过任何竞选） */
  if (G.campaign == null) G.campaign = null;
  if (G.campaignLog == null) G.campaignLog = [];
  if (G.campaignCool == null) G.campaignCool = 0;
  /* v0.5 主线之后的机制：出生州 / 下野 / 年初快照（年终叙事要对比"今年与去年"） */
  if (G.voters == null) G.voters = { warm: 0, diehard: 0, oppose: 0 };   /* v0.5.2 选民池 */
  if (G.state == null) G.state = "";
  if (G.fallenCount == null) G.fallenCount = 0;
  if (G.fallenShieldUntil == null) G.fallenShieldUntil = 0;
  if (G.yearStartSnap == null) G.yearStartSnap = null;   // startYear 时会重建
  delete G.beatIndex; delete G.beatCount; delete G.beatMonth; delete G.curMonth;
  G.version = POTUS.VERSION;
  return G;
};

POTUS.autosave = function () { try { localStorage.setItem(SAVE_KEY + "_auto", POTUS.serialize()); } catch (e) { } };

/* 局内切语言重载后用：若存在实时自动档，直接载入并回到进行中的那一局（不退回标题页）。
   成功返回 true；无 auto 档 / 载入失败返回 false，交回调用方走正常 boot。 */
POTUS.resumeAutoSave = function () {
  try {
    if (!localStorage.getItem(SAVE_KEY + "_auto")) return false;
    POTUS.doLoad("auto");
    return POTUS.SCREEN === "game" && !!POTUS.G;
  } catch (e) { return false; }
};

/* ---------- v0.6 存档系统：固定存档位 ----------
 * 用户反馈：无限时间戳档长期堆积、不便管理。改为固定 8 个手动存档位 + 1 个自动存档位。
 *   存档位 = SAVE_KEY + "_slot0" … "_slot7"（覆盖即写回同一位，永不堆积）
 *   元信息 = 名字/时间写进序列化后的 G（saveName / saveAt），不再维护单独索引
 *   自动档 = SAVE_KEY + "_auto"（沿用，每步刷新，读取列表置顶、不可改名/删除）
 *   旧档  = 首次进存/读档时，把历史时间戳档按时间倒序导入前 8 个空位再清理旧 key
 * 交互：保存=选位写入（占用位两段确认覆盖）；读取=选位载入；占用位支持重命名(✎)与删除(×)。 */
const SLOT_COUNT = 8;
function slotKey(i) { return SAVE_KEY + "_slot" + i; }
function slotDefaultName(i) { return POTUS.t("ui.core.slot", "存档位 {n}", { n: i + 1 }); }
function readSlotRaw(i) { return localStorage.getItem(slotKey(i)); }
function escHtml(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function escAttr(s) { return escHtml(s).replace(/"/g, "&quot;"); }
/* 写 localStorage：捕获配额写满，给出明确告警而不是静默失败 */
function safeSetItem(k, v) {
  try { localStorage.setItem(k, v); return true; }
  catch (e) {
    const full = e && (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED" || e.code === 22 || e.code === 1014);
    alert(full ? POTUS.t("ui.core.saveQuotaFull", "浏览器存储空间已满，保存失败。请先删除部分存档后重试。")
      : POTUS.t("ui.core.saveFailed", "保存失败：{e}", { e: e && e.message ? e.message : e }));
    return false;
  }
}
/* 职位名（默认档名用）：track_tier → *_tier → officeFallback，与 saveBrief 同口径 */
function officeNameFor(G) {
  const oTable = POTUS.reg.office || {};
  const fb = POTUS.balance().officeFallback || [];
  const hit = oTable[(G.track || "*") + "_" + (G.tier || 0)] || oTable["*_" + (G.tier || 0)];
  return hit ? (typeof hit === "string" ? hit : hit.name) : (fb[G.tier || 0] || "");
}
function defaultSaveName(G) {
  const o = officeNameFor(G);
  return POTUS.t("ui.core.stampYm", "{y}年{m}月", { y: G.year || "", m: G.month || 1 }) + " · " + G.name +
    (o ? POTUS.t("ui.core.paren", "（{v}）", { v: o }) : "");
}
/* 一次性迁移：把 v0.5.4 及更早的时间戳档导入固定存档位，然后删除旧 key 与索引 */
function migrateOldSaves() {
  try { if (localStorage.getItem(SAVE_KEY + "_slots_v6") === "1") return; } catch (e) { return; }
  const olds = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || k.indexOf(SAVE_KEY + "_") !== 0) continue;
      if (k === SAVE_KEY + "_auto" || k === SAVE_KEY + "_names" || k.indexOf(SAVE_KEY + "_slot") === 0) continue;
      let at = 0; try { at = JSON.parse(localStorage.getItem(k) || "{}").saveAt || 0; } catch (e) { }
      olds.push({ k: k, at: at });
    }
  } catch (e) { }
  olds.sort(function (a, b) { return b.at - a.at; });
  let idx = {}; try { idx = JSON.parse(localStorage.getItem(SAVE_KEY + "_names") || "{}") || {}; } catch (e) { }
  for (let j = 0; j < olds.length && j < SLOT_COUNT; j++) {
    let g; try { g = JSON.parse(localStorage.getItem(olds[j].k) || ""); } catch (e) { continue; }
    if (!g) continue;
    g.saveName = g.saveName || (idx[olds[j].k] && idx[olds[j].k].name) || slotDefaultName(j);
    if (!g.saveAt) g.saveAt = olds[j].at || 0;
    try { localStorage.setItem(slotKey(j), JSON.stringify(g)); } catch (e) { }
  }
  for (let m = 0; m < olds.length; m++) { try { localStorage.removeItem(olds[m].k); } catch (e) { } }
  try { localStorage.removeItem(SAVE_KEY + "_names"); localStorage.setItem(SAVE_KEY + "_slots_v6", "1"); } catch (e) { }
}
function fmtAgo(at) {
  if (!at) return "";
  const s = Math.max(0, Math.floor((Date.now() - at) / 1000));
  if (s < 60) return POTUS.t("ui.core.agoJust", "刚刚");
  if (s < 3600) return POTUS.t("ui.core.agoMin", "{n} 分钟前", { n: Math.floor(s / 60) });
  if (s < 86400) return POTUS.t("ui.core.agoHour", "{n} 小时前", { n: Math.floor(s / 3600) });
  if (s < 86400 * 30) return POTUS.t("ui.core.agoDay", "{n} 天前", { n: Math.floor(s / 86400) });
  return new Date(at).toLocaleDateString();
}

/* 存档位缩略预览：复用顶栏头像口径 hero-<难度>-<层级>.jpg，图缺失时退化为等级纯色块。
   等级色由 .saveline.tier-N 注入的 --tier 变量驱动（与顶栏/状态区同一套色阶）。 */
function slotThumbHTML(b) {
  const t = (b && b.tier) || 0, d = (b && b.diff) || "normal";
  const src = "assets/heroes/hero-" + d + "-" + t + ".jpg";
  return '<span class="svthumb"><img src="' + src + '" alt="" decoding="async" ' +
    'onerror="this.closest(\'.svthumb\').classList.add(\'noimg\')">' +
    '<span class="svlvl">' + POTUS.t("ui.core.thumbLevel", "等级{n}", { n: t + 1 }) + "</span></span>";
}

/* 保存对话框：命名 + 选固定存档位写入。占用位两段确认覆盖，绝不新建堆积档。 */
POTUS.quickSave = function () {
  migrateOldSaves();
  const old = document.querySelector(".modal"); if (old) old.remove();
  const G = POTUS.G; if (!G) return;
  const defName = defaultSaveName(G);
  let rows = "";
  for (let i = 0; i < SLOT_COUNT; i++) {
    const raw = readSlotRaw(i);
    const b = raw ? POTUS.saveBrief(raw) : null;
    if (b) {
      rows += '<div class="saverow"><button class="btn saveline tier-' + (b.tier || 0) + '" onclick="POTUS.saveToSlot(' + i + ',this)">' +
        slotThumbHTML(b) +
        '<span class="svbody">' +
        "<b>" + POTUS.t("ui.core.slot", "存档位 {n}", { n: i + 1 }) + " · " + escHtml(b.name) + (b.at ? ' <i class="ago">' + fmtAgo(b.at) + "</i>" : "") + "</b>" +
        "<small>" + escHtml(b.line) + "</small>" +
        "<small>" + escHtml(b.line2) + "</small>" +
        '<small class="svcta">' + POTUS.t("ui.core.ctaOverwrite", "点击覆盖保存到此位") + "</small></span></button></div>";
    } else {
      rows += '<div class="saverow"><button class="btn saveline svel" onclick="POTUS.saveToSlot(' + i + ',this)">' +
        '<span class="svthumb svel-ph" aria-hidden="true"></span>' +
        '<span class="svbody"><b>' + POTUS.t("ui.core.emptySlot", "空存档位 {n}", { n: i + 1 }) + "</b>" +
        '<small class="svcta">' + POTUS.t("ui.core.ctaSaveHere", "点击保存到此位") + "</small></span></button></div>";
    }
  }
  const m = document.createElement("div");
  m.className = "modal";
  m.onclick = function (e) { if (e.target === m) m.remove(); };
  m.innerHTML = '<div class="box savemodal"><h3>' + POTUS.t("ui.core.saveTitle", "保存存档") + '</h3>' +
    '<label class="airow">' + POTUS.t("ui.core.nameLabel", "存档名称") + '<input type="text" id="svName" value="' + escAttr(defName) + '" maxlength="40"></label>' +
    '<div class="slotlist">' + rows + "</div>" +
    '<p class="hintline" id="svMsg"></p>' +
    '<button class="btn" onclick="this.closest(\'.modal\').remove()">' + POTUS.t("ui.core.close", "关闭") + "</button></div>";
  document.body.appendChild(m);
  const inp = document.getElementById("svName");
  if (inp) { inp.focus(); inp.select(); }
};

/* 保存到指定存档位：占用位先两段确认，再写回同一 key（覆盖） */
POTUS.saveToSlot = function (i, btn) {
  const G = POTUS.G; if (!G) return;
  const occupied = !!readSlotRaw(i);
  const cta = btn ? btn.querySelector(".svcta") : null;
  if (occupied && btn && btn.dataset.armed !== "1") {
    btn.dataset.armed = "1";
    if (cta) { cta.dataset.orig = cta.textContent; cta.textContent = POTUS.t("ui.core.confirmOverwrite", "再次点击确认覆盖！"); }
    btn.classList.add("danger");
    setTimeout(function () { if (btn.isConnected) { btn.dataset.armed = ""; btn.classList.remove("danger"); if (cta) cta.textContent = cta.dataset.orig || POTUS.t("ui.core.ctaOverwrite", "点击覆盖保存到此位"); } }, 2500);
    return;
  }
  const name = ((document.getElementById("svName") || {}).value || "").trim() || defaultSaveName(G);
  G.saveName = name; G.saveAt = Date.now();
  if (!safeSetItem(slotKey(i), POTUS.serialize())) return;
  POTUS.autosave();
  const msg = document.getElementById("svMsg");
  if (msg) msg.textContent = POTUS.t("ui.core.savedTo", "已保存到「存档位 {n}」· {name}", { n: i + 1, name: name });
  setTimeout(function () { const mm = document.querySelector(".modal"); if (mm) mm.remove(); }, 750);
};

/* 存档的简要状态（读档列表用）——解析失败返回 null */
POTUS.saveBrief = function (raw) {
  try {
    const G = JSON.parse(raw);
    const era = (POTUS.reg.era[G.era] || {}).name || G.era || "";
    const oTable = POTUS.reg.office || {};
    const fb = POTUS.balance().officeFallback || [];
    const oHit = oTable[(G.track || "*") + "_" + (G.tier || 0)] || oTable["*_" + (G.tier || 0)];
    const oName = oHit ? (typeof oHit === "string" ? oHit : oHit.name) : (fb[G.tier || 0] || "");
    const party = (POTUS.reg.party[G.party] || {}).name || "";
    const st = G.state ? (POTUS.stateName ? POTUS.stateName(G.state) : G.state) : "";
    return {
      name: G.saveName || POTUS.t("ui.core.unnamed", "未命名"),
      line: POTUS.t("ui.core.stampYm", "{y}年{m}月", { y: G.year || "", m: G.month || 1 }) + " · " +
        POTUS.t("ui.core.saveAge", "{n}岁", { n: G.age || "?" }) +
        (oName ? " · " + oName : "") +
        (party ? " · " + party : "") + (st ? " · " + st : ""),
      line2: POTUS.t("ui.core.statRep", "声望 {v}", { v: G.rep || 0 }) + " · " +
        POTUS.t("ui.core.statFun", "资金 ${v}k", { v: ((G.fun || 0) / 1000).toFixed(0) }) +
        (G.voters ? " · " + POTUS.t("ui.core.statDiehard", "死忠 {v}", { v: G.voters.diehard >= 10000 ? (G.voters.diehard / 10000).toFixed(1) + "万" : G.voters.diehard }) : ""),
      office: oName, tier: G.tier || 0, diff: G.difficulty || "normal",
      at: G.saveAt
    };
  } catch (e) { return null; }
};

/* 重命名某个存档位（独立小弹窗，改完刷新列表） */
POTUS.renameSlot = function (i) {
  const raw = readSlotRaw(i); if (!raw) return;
  let g; try { g = JSON.parse(raw); } catch (e) { return; }
  const cur = g.saveName || slotDefaultName(i);
  const old = document.querySelector(".modal"); if (old) old.remove();
  const m = document.createElement("div"); m.className = "modal";
  m.innerHTML = '<div class="box"><h3>' + POTUS.t("ui.core.rename", "重命名") + " · " + POTUS.t("ui.core.slot", "存档位 {n}", { n: i + 1 }) + '</h3>' +
    '<label class="airow">' + POTUS.t("ui.core.nameLabel", "存档名称") + '<input type="text" id="rnName" maxlength="40" value="' + escAttr(cur) + '"></label>' +
    '<div class="airow" style="display:flex;gap:8px"><button class="btn primary" id="rnGo">' + POTUS.t("ui.core.confirm", "确定") + '</button>' +
    '<button class="btn" id="rnCancel">' + POTUS.t("ui.core.cancel", "取消") + "</button></div></div>";
  document.body.appendChild(m);
  const inp = document.getElementById("rnName"); if (inp) { inp.focus(); inp.select(); }
  function commit() {
    const nm = ((inp && inp.value) || "").trim() || slotDefaultName(i);
    g.saveName = nm;
    if (safeSetItem(slotKey(i), JSON.stringify(g))) { m.remove(); POTUS.openLoad(); }
  }
  document.getElementById("rnCancel").onclick = function () { m.remove(); POTUS.openLoad(); };
  document.getElementById("rnGo").onclick = commit;
  if (inp) inp.onkeydown = function (e) { if (e.key === "Enter") commit(); };
};

/* 删除存档位（两段确认防误删） */
POTUS.delSlot = function (i, btn) {
  if (btn.dataset.armed !== "1") {
    btn.dataset.armed = "1";
    btn.textContent = POTUS.t("ui.core.confirmDel", "确认删");
    btn.classList.add("danger");
    setTimeout(function () { if (btn.isConnected) { btn.dataset.armed = ""; btn.textContent = "×"; btn.classList.remove("danger"); } }, 2500);
    return;
  }
  try { localStorage.removeItem(slotKey(i)); } catch (e) { }
  POTUS.openLoad();
};

/* 读取/管理列表：自动档置顶 + 8 个固定存档位；占用位可载入/重命名(✎)/删除(×)，空位灰显 */
POTUS.openLoad = function () {
  migrateOldSaves();
  const old = document.querySelector(".modal"); if (old) old.remove();
  let html = '<div class="modal" onclick="if(event.target===this)this.remove()"><div class="box savemodal"><h3>' + POTUS.t("ui.core.loadTitle", "读取存档") + '</h3>';
  let any = false;
  const autoRaw = localStorage.getItem(SAVE_KEY + "_auto");
  const ab = autoRaw ? POTUS.saveBrief(autoRaw) : null;
  if (ab) {
    any = true;
    html += '<div class="saverow"><button class="btn saveline tier-' + (ab.tier || 0) + '" onclick="POTUS.doLoad(\'' + SAVE_KEY + '_auto\')">' +
      slotThumbHTML(ab) +
      '<span class="svbody"><b>' + POTUS.t("ui.core.autoSave", "自动存档") + ' <i class="ago">' + POTUS.t("ui.core.live", "实时") + '</i></b>' +
      "<small>" + escHtml(ab.line) + "</small>" +
      "<small>" + escHtml(ab.line2) + "</small></span></button></div>";
  }
  for (let i = 0; i < SLOT_COUNT; i++) {
    const raw = readSlotRaw(i);
    const b = raw ? POTUS.saveBrief(raw) : null;
    if (b) {
      any = true;
      html += '<div class="saverow">' +
        '<button class="btn saveline tier-' + (b.tier || 0) + '" onclick="POTUS.doLoad(\'' + slotKey(i) + '\')">' +
        slotThumbHTML(b) +
        '<span class="svbody"><b>' + POTUS.t("ui.core.slot", "存档位 {n}", { n: i + 1 }) + " · " + escHtml(b.name) + (b.at ? ' <i class="ago">' + fmtAgo(b.at) + "</i>" : "") + "</b>" +
        "<small>" + escHtml(b.line) + "</small>" +
        "<small>" + escHtml(b.line2) + "</small></span></button>" +
        '<button class="btn svedit" title="' + POTUS.t("ui.core.rename", "重命名") + '" onclick="POTUS.renameSlot(' + i + ')">✎</button>' +
        '<button class="btn svdel" title="' + POTUS.t("ui.core.del", "删除") + '" onclick="POTUS.delSlot(' + i + ',this)">×</button>' +
        "</div>";
    } else {
      html += '<div class="saverow saverow-empty"><span class="slotempty">' + POTUS.t("ui.core.slot", "存档位 {n}", { n: i + 1 }) + " · " + POTUS.t("ui.core.empty", "空") + "</span></div>";
    }
  }
  if (!any) html += '<p class="muted">' + POTUS.t("ui.core.noSaves", "还没有任何存档。开始游戏后点「保存」写入存档位。") + '</p>';
  html += '<hr><button class="btn" onclick="this.closest(\'.modal\').remove()">' + POTUS.t("ui.core.close", "关闭") + "</button></div></div>";
  const m = document.createElement("div"); m.innerHTML = html; document.body.appendChild(m.firstElementChild);
};
POTUS.doLoad = function (key) {
  try {
    const full = key === "auto" ? SAVE_KEY + "_auto" : (key.indexOf(SAVE_KEY + "_") === 0 ? key : SAVE_KEY + "_" + key);
    const s = localStorage.getItem(full);
    if (!s) { alert(POTUS.t("ui.core.noSave", "无存档")); return; }
    POTUS.G = POTUS.migrate(JSON.parse(s));
    document.body.className = "era-" + POTUS.G.era;
    const m = document.querySelector(".modal"); if (m) m.remove();
    POTUS.renderLoadedScreen();
    POTUS.SCREEN = "game";
  } catch (e) { alert(POTUS.t("ui.core.loadFailed", "读取失败：{e}", { e: e.message })); }
};
POTUS.exportSave = function () {
  try {
    const blob = new Blob([POTUS.serialize()], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "POTUS_" + POTUS.G.name + "_" + POTUS.G.era + "_" + POTUS.G.year + ".potus.json"; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  } catch (e) { alert(POTUS.t("ui.core.exportFailed", "导出失败：{e}", { e: e.message })); }
};
POTUS.importSave = function () {
  const inp = document.createElement("input"); inp.type = "file"; inp.accept = ".json,.potus";
  inp.onchange = function () {
    const f = inp.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = function () {
      try { POTUS.G = POTUS.migrate(JSON.parse(r.result)); document.body.className = "era-" + POTUS.G.era; POTUS.renderLoadedScreen(); POTUS.SCREEN = "game"; }
      catch (e) { alert(POTUS.t("ui.core.importFailed", "导入失败：{e}", { e: e.message })); }
    };
    r.readAsText(f);
  };
  inp.click();
};
POTUS.openLog = function () {
  if (!POTUS.G) return;
  const old = document.querySelector(".modal"); if (old) old.remove();
  const logs = (POTUS.G.log || []).slice().reverse();   // 最新在上
  let h = '<div class="modal" onclick="if(event.target===this)this.remove()"><div class="box logmodal"><h3>' + POTUS.t("ui.core.logTitle", "近期动态") + '</h3>';
  h += logs.length
    ? '<div class="loglist">' + logs.map(function (x) { return '<div class="logline">' + x + "</div>"; }).join("") + "</div>"
    : '<p class="muted">' + POTUS.t("ui.core.noLog", "还没有记录。") + '</p>';
  h += '<hr><button class="btn" onclick="this.closest(\'.modal\').remove()">' + POTUS.t("ui.core.close", "关闭") + "</button></div></div>";
  const m = document.createElement("div"); m.innerHTML = h; document.body.appendChild(m.firstElementChild);
};

POTUS.renderLoadedScreen = function () {
  POTUS.app().innerHTML =
    POTUS.topbarHTML() +
    '<div class="grid"><div id="main" class="col-event"><div class="news fade"><div class="dateline">' + POTUS.t("ui.core.loadedBadge", "已载入存档") + '</div>' +
    '<div class="body">' + POTUS.t("ui.core.loadedDate", "{y} 年 {m} 月。", { y: POTUS.G.year, m: POTUS.G.month || 1 }) + '</div></div></div>' +
    '<aside class="col-right">' +
    '<div class="actbar"><div id="actbody"><div class="acthead">' + POTUS.t("ui.core.resumeHead", "继续你的政治生涯") + '</div>' +
    '<button class="btn primary actbtn" onclick="POTUS.startYear(true)">' + POTUS.t("ui.core.resumeBtn", "继续 →") + "</button></div></div></aside></div>";
};
