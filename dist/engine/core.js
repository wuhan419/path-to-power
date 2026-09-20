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
  category: {}, grade: {}, medium: {}, contact: {}, newsOutlets: {}, ending: [], npc: {}, balance: {},
  /* 出生州：每州带政治倾向（D/R/S 摇摆），建角时选择，影响派系起点与事件倾斜。
     见 content/12-states.js。事件/倾向表可用 when.states 引用。 */
  state: {},
  /* 年终随笔：年终结算时按"得到/失去/处境"给文学性段落的素材库。
     见 content/13-year-tales.js。键是条目 id，值带 when 条件与 texts 数组。 */
  yeartale: {},
  /* 大模型服务商预设（llm.js 的设置面板下拉用）。内容包可追加自己的网关。 */
  llmPreset: {},
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
  /* 静好岁月：平静月份的随笔片段库（见 engine/vignette.js）。多个内容文件可各自追加片段。 */
  vignette: { title: "静好岁月", lede: "", fragments: [] }
};
POTUS.events = [];      // 事件库（全部内容包的合集）

/* 内容声明入口。用法见 docs/CONTENT-SCHEMA.md */
POTUS.define = function (kind, payload) {
  if (payload == null) return;
  if (kind === "event") { POTUS.events = POTUS.events.concat([].concat(payload)); return; }
  if (kind === "ending") { POTUS.reg.ending = POTUS.reg.ending.concat([].concat(payload)); return; }
  if (kind === "balance") { Object.assign(POTUS.reg.balance, payload); return; }
  if (kind === "news") { Object.assign(POTUS.reg.newsOutlets, payload); return; }
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
  tierMin: 0, tierMax: 5,

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
POTUS.pushLog = function (s) {
  const G = POTUS.G;
  const stamp = G.year + (G.month && G.month <= 12 ? "年" + G.month + "月" : "年");
  G.log.unshift("[" + stamp + "] " + s);
  if (G.log.length > 80) G.log.pop();
};

/* 大事件/中事件的中文名（引擎只用来显示，内容可覆盖 reg.grade） */
POTUS.gradeName = function (g) {
  const d = POTUS.reg.grade[g];
  return d ? (d.name || g) : ({ major: "大事件", mid: "中事件", minor: "小事" }[g] || g);
};
/* 事件类型（类别）定义，内容可增删 */
POTUS.category = function (key) {
  return POTUS.reg.category[key] || POTUS.reg.category.general || null;
};
POTUS.categoryName = function (key) {
  const c = POTUS.category(key);
  return c ? (c.name || key) : (key || "综合");
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
  return f ? (f.name || k) : (k || POTUS.reg.factionUnknown);
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
  return d ? (d.name || id) : (id || "某人");
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
  if (!key) return "请输入充值码";
  if (codes[key] == null) return "没有这个码：" + key;
  if (!POTUS.vipInfinite) {
    let used = [];
    try { used = JSON.parse(localStorage.getItem("potus_vip_used") || "[]"); } catch (e) { used = []; }
    if (used.indexOf(key) >= 0) return "这个码已经用过了";
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
  const table = (b.voterBase && b.voterBase.electorate) || [5000, 60000, 300000, 750000, 9000000, 240000000];
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
  const table = (b.voterBase && b.voterBase.electorate) || [5000, 60000, 300000, 750000, 9000000, 240000000];
  const ratio = table[toTier] / (table[fromTier] || 1);
  const keep = ratio > 1 ? (b.voterBase && b.voterBase.carryKeep != null ? b.voterBase.carryKeep : 0.25) : 1;
  ["warm", "diehard", "oppose"].forEach(function (k) {
    G.voters[k] = Math.round((G.voters[k] || 0) * (ratio > 1 ? keep : 1));
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
  if (G.doneIds == null) G.doneIds = [];
  if (G.quietMonths == null) G.quietMonths = [];
  if (G.yearHeads == null) G.yearHeads = [];
  if (G.slotIndex == null) G.slotIndex = 0;
  if (G.slotCount == null) G.slotCount = 0;
  if (G.monthPlan == null) G.monthPlan = [];
  if (G.curMonth != null && G.month === 1) G.month = G.curMonth;   // 尽量接住旧存档的月份
  /* v0.4 新增状态 */
  if (G.lev == null) G.lev = 0;                           // 把柄（旧存档没有 = 0 份）
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
POTUS.quickSave = function () {
  try {
    const name = prompt("存档名称：", "存档 " + new Date().toLocaleString());
    if (name) { localStorage.setItem(SAVE_KEY + "_" + btoa(unescape(encodeURIComponent(name))).slice(0, 20), POTUS.serialize()); alert("已保存：" + name); }
  } catch (e) { alert("保存失败：" + e.message); }
};
POTUS.openLoad = function () {
  let html = '<div class="modal" onclick="if(event.target===this)this.remove()"><div class="box"><h3>读取存档</h3>';
  html += '<button class="btn" onclick="POTUS.doLoad(\'auto\')">自动存档</button> ';
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.indexOf(SAVE_KEY + "_") === 0 && k !== SAVE_KEY + "_auto") keys.push(k); }
  keys.forEach(function (k) { html += '<button class="btn" onclick="POTUS.doLoad(\'' + k + '\')">' + k.replace(SAVE_KEY + "_", "") + "</button> "; });
  html += '<hr><button class="btn" onclick="this.closest(\'.modal\').remove()">关闭</button></div></div>';
  const m = document.createElement("div"); m.innerHTML = html; document.body.appendChild(m.firstElementChild);
};
POTUS.doLoad = function (key) {
  try {
    const full = key === "auto" ? SAVE_KEY + "_auto" : (key.indexOf(SAVE_KEY + "_") === 0 ? key : SAVE_KEY + "_" + key);
    const s = localStorage.getItem(full);
    if (!s) { alert("无存档"); return; }
    POTUS.G = POTUS.migrate(JSON.parse(s));
    document.body.className = "era-" + POTUS.G.era;
    const m = document.querySelector(".modal"); if (m) m.remove();
    POTUS.renderLoadedScreen();
    POTUS.SCREEN = "game";
  } catch (e) { alert("读取失败：" + e.message); }
};
POTUS.exportSave = function () {
  try {
    const blob = new Blob([POTUS.serialize()], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "POTUS_" + POTUS.G.name + "_" + POTUS.G.era + "_" + POTUS.G.year + ".potus.json"; a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  } catch (e) { alert("导出失败：" + e.message); }
};
POTUS.importSave = function () {
  const inp = document.createElement("input"); inp.type = "file"; inp.accept = ".json,.potus";
  inp.onchange = function () {
    const f = inp.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = function () {
      try { POTUS.G = POTUS.migrate(JSON.parse(r.result)); document.body.className = "era-" + POTUS.G.era; POTUS.renderLoadedScreen(); POTUS.SCREEN = "game"; }
      catch (e) { alert("导入失败：" + e.message); }
    };
    r.readAsText(f);
  };
  inp.click();
};
POTUS.renderLoadedScreen = function () {
  const era = POTUS.reg.era[POTUS.G.era] || { name: POTUS.G.era };
  POTUS.app().innerHTML =
    '<div class="masthead"><div class="title">' + era.name + '</div><div class="meta">' + POTUS.G.year + " 年 " + (POTUS.G.month || 1) + " 月 · " + POTUS.G.name + "</div></div>" +
    POTUS.toolbarHTML() +
    '<div class="grid"><div id="main"><div class="news"><div class="body">已载入存档：' +
    POTUS.G.year + " 年 " + (POTUS.G.month || 1) + " 月。</div>" +
    '<button class="btn primary" style="margin-top:10px" onclick="POTUS.startYear(true)">继续 →</button></div></div>' +
    POTUS.statPanel() + "</div>";
};
