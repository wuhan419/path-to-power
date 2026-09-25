/* ============================================================================
 * POTUS ENGINE · when.js
 * 统一的声明式条件求值器 —— 全引擎只此一套"什么时候成立"的词汇。
 *
 * 为什么要有这个文件：
 *   在它之前，引擎里其实有三套并行但拼写不同的条件系统：
 *     · events.js   的 P.eligible()     —— 事件能不能出现（tracks / minRep / flags / after …）
 *     · progression.js 的 matchWhen()   —— 结局规则命中（trackIn / ageMin / repMin / reason …）
 *     · vignette.js 的 vignetteFragOK() —— 静好岁月片段适用（tiers / minAge / minHp / minContacts …）
 *   同一件事三种写法（tracks vs trackIn、minAge vs ageMin）。再加上"主线"和"权重因子"
 *   就要出现第四、第五套了 —— 内容团队要学的规则会从 3 套变 5 套。
 *   所以这里把它们合成一套：**一个 P.when(cond, snap)，三处都调它**。
 *
 * 两条设计原则：
 *   1) 纯函数 + 可注入快照。P.when(cond, snap) 的第二个参数就是"玩家此刻的样子"。
 *      不传就从存档现取（P.snap()）。所以测试可以直接塞一个假玩家进去，
 *      不用真的开局 —— validate.js 靠这个跑遍 轨道×层级×资源档 的组合。
 *   2) 只读，不改状态。求值器永远不写存档。
 *
 * 字段全表见 docs/CONTENT-SCHEMA.md §4.16 的"条件词汇表"。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* 标量或数组都收：条件里写 `tracks: "operative"` 与 `tracks: ["operative"]` 等价 */
  function arr(v) { return v == null ? null : (Array.isArray(v) ? v : [v]); }

  /* 白名单语义：条件没写这个字段 = 不限制；写了就必须在名单里 */
  function inList(list, v) { const a = arr(list); return !a || a.indexOf(v) >= 0; }
  /* 黑名单语义：条件没写 = 不限制；写了就必须不在名单里 */
  function notInList(list, v) { const a = arr(list); return !a || a.indexOf(v) < 0; }

  /* 取一组别名的第一个非空值：`pick(c, ["tracks","track","trackIn"])`。
     这样三套老词汇的拼写都能继续用，内容作者不必记新名字。 */
  function pick(c, names) {
    for (let i = 0; i < names.length; i++) if (c[names[i]] != null) return c[names[i]];
    return null;
  }

  /* ---------- 层级档位映射：旧 6 档(0..5) → 新 10 级(0..9) ----------
   * 玩法大改造把晋升线从 6 档拉长到 10 级，但 30+ 内容文件里上百处 tierMin/tierMax/
   * minTier/maxTier/quietWorks 档位……全都按旧的 0..5 语义书写。与其逐处手工重排（易错、
   * 且以后新增内容还得记两套刻度），不如在**唯一收口**（本求值器读档位门槛处）做一次
   * 单调映射：条件里的旧档位值被抬到新空间再与真实 G.tier(0..9) 比较。
   *   · 只映射 0..5（旧空间）；6..9 与通配 99 原样返回 → 新内容可直接按 10 级书写。
   *   · 单调递增，故 tierMin<=tierMax 的自洽校验、事件档位区间顺序全部保持不变。
   * 想要不同的铺档密度，改 balance.tierBand（长度 6 的数组，索引=旧档，值=新级）即可。 */
  const LEGACY_TIER_BAND = [0, 2, 4, 5, 7, 9];
  POTUS.tierBand = function (n) {
    const map = (P.balance && P.balance().tierBand) || LEGACY_TIER_BAND;
    n = Number(n);
    if (!isFinite(n)) return n;
    if (n >= 0 && n < map.length) return map[n];
    return n;                       // 已在(或超出)新空间：原样透传
  };

  /* ---------- #33：era 按日历解 ----------
   * G.era 自时代选择器下线后恒为 1980_REAGAN，不能再当条件闸用——
   * 「这条事件属于哪个时代」一律由年份落在哪个 era 区间决定。 */
  P.eraAt = function (year) {
    let best = null, bs = -1e9;
    for (const id in P.reg.era) {
      const sy = P.reg.era[id].startYear;
      if (sy != null && sy <= year && sy > bs) { bs = sy; best = id; }
    }
    return best || "1980_REAGAN";
  };

  /* ---------- 玩家此刻的样子（条件的求值对象） ----------
   * 只在需要时构造。事件抽取会在一次抽取里构造一次、往下传（见 events.js 的 drawEvent），
   * 所以 300 局模拟里这张快照只被造十几万次，而不是几千万次。 */
  P.snap = function () {
    const G = P.G;
    if (!G) return null;
    const contacts = G.contacts || {};
    let n = 0;
    for (const k in contacts) n++;
    return {
      era: P.eraAt(G.year), year: G.year, month: G.month, age: G.age,
      track: G.track, party: G.party, stance: G.stance,
      origin: G.origin, entry: G.entry, talent: G.talent,
      state: G.state || "",
      tier: G.tier,
      rep: G.rep, hp: G.hp, fun: G.fun, fav: G.fav, lev: G.lev || 0,
      contactN: n, knownIds: contacts,
      scandal: P.scandalLevel ? P.scandalLevel() : 0,
      baseShare: P.baseShare ? P.baseShare() : 0,
      tenure: P.monthsAtTier ? P.monthsAtTier() : 0,
      flags: G.flags || [],
      counters: G.counters || {},
      reason: G.endingReason
    };
  };

  /* 快照字段 ← 条件字段 的映射表。新增一个数值门槛只要加一行。
   * 注意：这里只列**数值门槛**键，且都是不会被事件自身字段占用的名字
   * （反面教材：`month` 在事件里是"史实日期"，绝不能被当成条件 —— 见下面的白名单注释）。 */
  const LOW = [
    ["tierMin", "minTier", "tier"], ["minYear", null, "year"],
    ["minAge", "ageMin", "age"], ["minRep", "repMin", "rep"], ["minHp", null, "hp"],
    ["minFun", "funMin", "fun"], ["minFav", null, "fav"], ["minLev", null, "lev"],
    ["minContacts", null, "contactN"], ["minTenure", null, "tenure"], ["scandalMin", null, "scandal"],
    /* #35：基本盘占比（0..1 的小数，不是百分数） */
    ["minShare", "shareMin", "baseShare"]
  ];
  const HIGH = [
    ["tierMax", "maxTier", "tier"], ["maxYear", null, "year"],
    ["maxAge", "ageMax", "age"], ["maxRep", null, "rep"], ["maxHp", null, "hp"],
    ["maxFun", null, "fun"], ["maxFav", null, "fav"], ["maxLev", null, "lev"],
    ["maxContacts", null, "contactN"], ["maxTenure", null, "tenure"], ["scandalMax", null, "scandal"],
    ["maxShare", "shareMax", "baseShare"]
  ];

  /* 条件里所有会被识别的字段名（给文档、校验器、UI 的"为什么找上你"用） */
  P.WHEN_KEYS = ["not", "any", "all",
    "era", "eras", "notEra", "notEras",
    "tracks", "trackIn", "notTracks", "notTrack",
    "parties", "partyIn", "notParties", "notParty",
    "stances", "notStances", "notStance",
    "origins", "originIn", "notOrigins",
    "entries", "entryIn", "notEntries",
    "talents", "notTalents",
    "states", "notStates",
    "tiers", "months", "notMonths",
    "flags", "notFlags", "contacts", "after", "cond", "reason",
    "countMin", "countMax", "countEq",
    "minTier", "tierMin", "maxTier", "tierMax", "tierRaw",
    "minYear", "maxYear", "minAge", "ageMin", "maxAge", "ageMax",
    "minRep", "repMin", "maxRep", "minHp", "maxHp", "minFun", "funMin", "maxFun",
    "minFav", "maxFav", "minLev", "maxLev", "minContacts", "maxContacts",
    "minTenure", "maxTenure", "scandalMin", "scandalMax",
    "minShare", "maxShare", "shareMin", "shareMax"];

  /* ---------- 主入口 ----------
   * cond = 声明式条件对象（可缺省 = 恒成立）
   * snap = 玩家快照；不传则现取（P.snap()）
   * 返回 true / false。**永不抛错** —— 条件写错只当不成立。 */
  P.when = function (cond, snap) {
    if (cond == null) return true;
    if (typeof cond === "boolean") return cond;
    const s = snap || P.snap();
    if (!s) return false;

    /* ---------- 逻辑组合：先看最外层，短路掉整块 ---------- */
    if (cond.not != null && P.when(cond.not, s)) return false;
    if (cond.any && !cond.any.some(function (x) { return P.when(x, s); })) return false;
    if (cond.all && !cond.all.every(function (x) { return P.when(x, s); })) return false;

    /* ---------- 身份与处境：白名单 ----------
     * 只认"规范名 + 历史上真的用过的别名"。**故意不给 `tier` / `month` 之类的裸名开别名**：
     *   · 事件里的 `month` 是"这件事钉在几月"（史实日期），不是条件 —— 混进来会让
     *     定点事件在非当月的抽取里被静默筛掉（踩过）；
     *   · 事件里的 `tier` 是 effects 里的"升一级"，不是条件。
     * 想加别名，先确认它不会与事件/片段自身的字段名撞车。 */
    if (!inList(cond.era != null ? cond.era : cond.eras, s.era)) return false;
    if (!inList(pick(cond, ["tracks", "trackIn"]), s.track)) return false;
    if (!inList(pick(cond, ["parties", "partyIn"]), s.party)) return false;
    if (!inList(cond.stances, s.stance)) return false;
    if (!inList(pick(cond, ["origins", "originIn"]), s.origin)) return false;
    if (!inList(pick(cond, ["entries", "entryIn"]), s.entry)) return false;
    if (!inList(cond.talents, s.talent)) return false;
    if (!inList(cond.states, s.state)) return false;
    if (!inList((cond.tiers && arr(cond.tiers).map(POTUS.tierBand)) || null, s.tier)) return false;
    if (!inList(cond.months, s.month)) return false;

    /* ---------- 身份与处境：黑名单 ---------- */
    if (!notInList(cond.notEra != null ? cond.notEra : cond.notEras, s.era)) return false;
    if (!notInList(pick(cond, ["notTracks", "notTrack"]), s.track)) return false;
    if (!notInList(pick(cond, ["notParties", "notParty"]), s.party)) return false;
    if (!notInList(cond.notStances != null ? cond.notStances : cond.notStance, s.stance)) return false;
    if (!notInList(cond.notOrigins, s.origin)) return false;
    if (!notInList(cond.notEntries, s.entry)) return false;
    if (!notInList(cond.notTalents, s.talent)) return false;
    if (!notInList(cond.notStates, s.state)) return false;
    if (!notInList(cond.notMonths, s.month)) return false;

    /* ---------- 数值门槛 ---------- */
    let i, v;
    const rawTier = !!cond.tierRaw;
    for (i = 0; i < LOW.length; i++) {
      v = pick(cond, [LOW[i][0], LOW[i][1]]);
      if (v != null && LOW[i][2] === "tier" && !rawTier) v = POTUS.tierBand(v);   // 旧档门槛抬进新空间
      if (v != null && s[LOW[i][2]] < v) return false;
    }
    for (i = 0; i < HIGH.length; i++) {
      v = pick(cond, [HIGH[i][0], HIGH[i][1]]);
      if (v != null && HIGH[i][2] === "tier" && !rawTier) v = POTUS.tierBand(v);
      if (v != null && s[HIGH[i][2]] > v) return false;
    }

    /* ---------- 标记 ---------- */
    const fl = arr(cond.flags);
    if (fl && !fl.every(function (f) { return s.flags.indexOf(f) >= 0; })) return false;
    const nf = arr(cond.notFlags);
    if (nf && nf.some(function (f) { return s.flags.indexOf(f) >= 0; })) return false;

    /* ---------- 隐藏计数器 buff（程度记忆）----------
     * 与 flags 的布尔记忆互补：countMin/countMax/countEq 接 {键: 阈值} 对象，
     * 逐键比较 counters[key]。任一不满足即不成立（缺省计数当 0）。 */
    if (cond.countMin) { for (const k in cond.countMin) { if ((s.counters[k] || 0) < cond.countMin[k]) return false; } }
    if (cond.countMax) { for (const k in cond.countMax) { if ((s.counters[k] || 0) > cond.countMax[k]) return false; } }
    if (cond.countEq) { for (const k in cond.countEq) { if ((s.counters[k] || 0) !== cond.countEq[k]) return false; } }

    /* ---------- 人脉：名单里的人必须都认识 ---------- */
    const ct = arr(cond.contacts);
    if (ct && !ct.every(function (id) { return s.knownIds[id] != null; })) return false;

    /* ---------- 事件链前情：上一幕演过没有、隔了几个月 ----------
     * 快照里可以塞 gaps 覆盖（测试与诊断用），否则查真实的演出记录。 */
    if (cond.after) {
      const prevId = typeof cond.after === "string" ? cond.after : cond.after.id;
      const gap = (s.gaps && prevId in s.gaps) ? s.gaps[prevId]
        : (P.monthsSince ? P.monthsSince(prevId) : null);
      if (gap == null) return false;
      if (cond.after.minMonthsAfter != null && gap < cond.after.minMonthsAfter) return false;
      if (cond.after.maxMonthsAfter != null && gap > cond.after.maxMonthsAfter) return false;
    }

    /* ---------- 终局理由（只有结局规则会用） ---------- */
    if (cond.reason != null && arr(cond.reason).indexOf(s.reason) < 0) return false;

    /* ---------- 最后一道：作者自定义函数 ---------- */
    if (typeof cond.cond === "function" && !cond.cond(P.G, P)) return false;

    return true;
  };

  /* 条件里有没有用到某个字段（UI 的"为什么找上你"要靠它逐条解释） */
  P.whenUses = function (cond, key) {
    if (cond == null || typeof cond !== "object") return false;
    if (cond[key] != null) return true;
    const kids = [].concat(cond.any || [], cond.all || [], cond.not ? [cond.not] : []);
    for (let i = 0; i < kids.length; i++) if (P.whenUses(kids[i], key)) return true;
    return false;
  };
})();
