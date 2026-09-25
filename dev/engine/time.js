/* ============================================================================
 * POTUS ENGINE · time.js
 * 时间轴的唯一权威：年 → 月 → 档期（slot）→ 事件。
 *
 * 核心模型：
 *   1. 一个月 = 一个回合。
 *   2. 不是每个月都有事件。平静的月份会被自动跳过，只在月历上留一行记录。
 *   3. 每个"档期"有一个量级（grade）：major 大事件 / mid 中事件 / minor 普通事件。
 *   4. 时代压力（era.pressure）+ 玩家活跃度（丑闻/调查/选举年/层级）决定：
 *        这个月有没有档期 → 有几个 → 量级偏高还是偏低。
 *   5. 时代可以写"定点事件"（era.scheduled）：到了某年某月必定发生。
 *
 * 纯机制，不含任何剧情数值。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  const GRADES = ["major", "mid", "minor"];

  /* ---------- 时代压力：0-5，越高越动荡 ---------- */
  P.pressure = function () {
    const G = P.G, w = P.reg.worldline || {};
    const era = P.reg.era[P.eraAt(G.year)] || {};
    const y = String(G.year);
    /* 优先按绝对年读全局时间轴的世界线压力；时间轴没铺到的年份整体回落 era
       （渐进迁移、可回退：未迁移的 2008 等年代照旧走当年 era 的 pressure）。 */
    const wm = (w.pressure && typeof w.pressure === "object") ? w.pressure : null;
    const raw = (wm && wm[y] != null) ? wm[y] : era.pressure;
    let v = 1;
    if (typeof raw === "function") v = Number(raw(G, P)) || 0;
    else if (typeof raw === "number") v = raw;
    else if (raw && typeof raw === "object") {
      const y = String(G.year);
      if (raw[y] != null) v = raw[y];
      else if (raw["*"] != null) v = raw["*"];
    }
    return P.clamp(v + P.bonusPressure(), 0, 6);
  };

  /* 玩家自身造成的"活跃度"——麻烦缠身、选举年、身居高位，都会让日程变密。
     各项权重写在 balance.bonusPressure 里，内容可调。
     注意「把柄」这一项：手里攥着别人的秘密，你自己也会变成别人的目标，
     所以把柄越多、日程越密——这条是"脏"的代价，不是奖励。 */
  P.bonusPressure = function () {
    const G = P.G;
    const w = P.balance().bonusPressure || {};
    let v = 0;
    if (P.scandalLevel() > 0) v += (w.scandal == null ? 0.8 : w.scandal);
    if (P.hasFlag("investigation_open")) v += (w.investigation == null ? 0.8 : w.investigation);
    if (P.electionYear()) v += (w.election == null ? 0.6 : w.election);
    if (G.tier >= (w.tierHighAt == null ? 4 : w.tierHighAt)) v += (w.tierHigh == null ? 0.5 : w.tierHigh);
    if ((G.lev || 0) >= (w.leverageAt == null ? 3 : w.leverageAt)) v += (w.leverage == null ? 0.4 : w.leverage);
    return v;
  };
  /* 当前活跃度由什么顶起来的（界面用） */
  P.bonusReason = function () {
    const G = P.G, w = P.balance().bonusPressure || {}, out = [];
    if (P.scandalLevel() > 0) out.push(P.t("ui.time.reason.scandal", "丑闻缠身"));
    if (P.hasFlag("investigation_open")) out.push(P.t("ui.time.reason.investigation", "正被调查"));
    if (P.electionYear()) out.push(P.t("ui.time.reason.election", "选举年"));
    if (G.tier >= (w.tierHighAt == null ? 4 : w.tierHighAt)) out.push(P.t("ui.time.reason.tierHigh", "身居高位"));
    if ((G.lev || 0) >= (w.leverageAt == null ? 3 : w.leverageAt)) out.push(P.t("ui.time.reason.leverage", "把柄在手"));
    return out;
  };

  /* 按月给出可读的压力描述（界面用） */
  P.pressureLabel = function (v) {
    if (v == null) v = P.pressure();
    if (v < 1.6) return { text: P.t("ui.time.pressure.calm", "平静"), cls: "calm" };
    if (v < 2.6) return { text: P.t("ui.time.pressure.uneasy", "常有波澜"), cls: "uneasy" };
    if (v < 3.6) return { text: P.t("ui.time.pressure.tense", "多事之秋"), cls: "tense" };
    if (v < 4.6) return { text: P.t("ui.time.pressure.storm", "动荡"), cls: "storm" };
    return { text: P.t("ui.time.pressure.abyss", "断层边缘"), cls: "abyss" };
  };

  /* ---------- 按压力抽一个量级 ---------- */
  P.pickGrade = function (pressure) {
    const w = P.balance().gradeWeights || {};
    const keys = GRADES.filter(function (g) { return w[g]; });
    if (!keys.length) return "minor";
    let tot = 0;
    const vals = keys.map(function (g) {
      const v = P.clamp((w[g].base == null ? 1 : w[g].base) + (w[g].perPressure || 0) * pressure, 0.05, 99);
      tot += v; return v;
    });
    let r = Math.random() * tot;
    for (let i = 0; i < keys.length; i++) { r -= vals[i]; if (r <= 0) return keys[i]; }
    return keys[keys.length - 1];
  };

  /* ---------- 定点事件：时代脚本 ----------
   * era.scheduled: [{ event:"2008_crash_offer", year:2008, month:9, grade:"major", once:true }]
   * 命中条件：年份/月份落在窗口内、（once 时）本局没演过、事件自身条件也满足。
   * 注意：定点事件仍然要过一遍 P.eligible()——tier / flag / era 不满足就跳过，
   *       所以「给低层级玩家写的定点事件」不会硬塞给还没爬到那个位置的人。
   */
  /* ---------- #33 钉卡规范化（一次性）----------
   * 凡出现在 reg.fixed / 任一 era.scheduled 里的卡 = 世界事实，到点必发：
   * tierMax 一律抬到 9（当年写死的顶层闸会把爬到中高层的玩家整年挡在史实之外——
   * 1990 后「事件荒」六成根因）。tierMin 保留：底层玩家还没资格卷入高层专属卡。 */
  function normalizePins() {
    if (P._pinsNormalized) return;
    P._pinsNormalized = 1;
    const ids = {};
    const take = (l) => (l || []).forEach((s) => { if (s.event) ids[s.event] = 1; });
    take(P.reg.fixed);
    for (const id in P.reg.era) take(P.reg.era[id].scheduled);
    let n = 0;
    P.events.forEach(function (ev) {
      if (ids[ev.id] && ev.tierMax != null && ev.tierMax < 9) { ev.tierMax = 9; n++; }
    });
    P.pinCount = n;
  }

  function scheduledHits(month) {
    normalizePins();
    const G = P.G, era = P.reg.era[P.eraAt(G.year)] || {};
    /* 全局定点事件表 fixed（按绝对年月）+ 迁移期兼容的 era.scheduled，两路合并 */
    const lists = [];
    if (P.reg.fixed && P.reg.fixed.length) lists.push(P.reg.fixed);
    if (era.scheduled && era.scheduled.length) lists.push(era.scheduled);
    if (!lists.length) return [];
    const out = [], seen = {};
    lists.forEach(function (list) {
      list.forEach(function (s) {
        if (s.year != null && s.year !== G.year) return;
        if (s.month != null && s.month !== month) return;
        if (s.fromYear != null && G.year < s.fromYear) return;
        if (s.toYear != null && G.year > s.toYear) return;
        if (s.fromMonth != null && (s.fromYear == null || G.year === s.fromYear) && month < s.fromMonth) return;
        if (s.cond && !s.cond(G, P)) return;
        if (s.flags && !s.flags.every(P.hasFlag)) return;
        if (s.event && seen[s.event]) return;            // 同一事件两条路只演一次
        const once = s.once !== false;
        if (once && s.event && G.doneIds.indexOf(s.event) >= 0) return;
        const ev = s.event && P.evById(s.event);
        if (s.event && !ev) return;
        if (ev && !P.eligible(ev)) {
          /* #33：静默丢弃变响——记下为什么没发出去，供 trigger-scan / 完成记录诊断 */
          let why = "gate";
          if (ev.tierMin != null && G.tier < ev.tierMin) why = "tierMin";
          else if (ev.tierMax != null && G.tier > ev.tierMax) why = "tierMax";
          (G.pinMiss = G.pinMiss || []).push({ y: G.year, id: s.event, why: why });
          if (G.pinMiss.length > 500) G.pinMiss.shift();
          return;
        }
        if (s.event) seen[s.event] = 1;
        out.push({ eventId: s.event, grade: s.grade || P.gradeOf(ev) || "major",
          valence: ev ? P.valenceOf(ev) : "risk", scheduled: true });
      });
    });
    return out;
  }

  /* ---------- 日常公务（选民服务）注入通道 ----------
     只在"轻量"层面出现：从带 chore:true 的事件里挑一条当前层级/年份合适的，
     作为本月的一条 minor 档期。它们不在随机卡池里（eligible 已挡），只走这里。
     层级把关交给事件自身的 tierMin/tierMax（choreEligible 里的 P.when）——
     志愿者（tier 0）也有基层琐事（致悼词/剪彩/夜巡/调解邻里，见 events/111-chores.js 的 T0–2 簇），
     所以这里不再对 tier<=0 一刀切封死。 */
  function choreEligible(e, snap) {
    if (!e.chore) return false;
    if (!P.when(e, snap)) return false;         // tierMin/tierMax/tracks/flags/minYear… 走统一词汇
    if (!P.yearOK(e) || !P.mediumOK(e)) return false;
    const G = P.G;
    if (P.isUnique(e) && G.doneIds.indexOf(e.id) >= 0) return false;
    if (P.recentIds.indexOf(e.id) >= 0) return false;
    return true;
  }
  P.choresSlot = function (isEmptyMonth) {
    const G = P.G, b = P.balance(), d = b.choreDynamic || {};
    if (d.enabled === false) return null;
    if (!G) return null;                                    // 层级门槛由 choreEligible 逐条把关（含志愿者 tier 0）
    const p = isEmptyMonth
      ? (d.emptyFillChance == null ? 0.7 : d.emptyFillChance)
      : (d.chance == null ? 0 : d.chance);
    if (!(p > 0) || !P.chance(p)) return null;
    const snap = P.snap();
    const pool = P.events.filter(function (e) { return choreEligible(e, snap); });
    if (!pool.length) return null;
    /* 权重随机（chore 事件自带 weight 表达"这类事务多常见"） */
    let tot = 0;
    const ws = pool.map(function (e) { const w = Number(e.weight) || 10; tot += w; return w; });
    let r = Math.random() * tot, hitEv = pool[0];
    for (let i = 0; i < pool.length; i++) { r -= ws[i]; if (r <= 0) { hitEv = pool[i]; break; } }
    return { eventId: hitEv.id, grade: P.gradeOf(hitEv) || "minor",
      valence: P.valenceOf(hitEv) || "boon", chore: true };
  };

  /* ---------- 排定某个月的档期 ----------
   * 返回 [{grade, eventId?, scheduled?}]，空数组 = 平静的一个月
   */
  P.planMonth = function (month) {
    const G = P.G, b = P.balance();
    const out = scheduledHits(month);
    if (month == null) month = G.month;

    /* 竞选进行中：把“当前那一幕”排成本月必出的定点档期。
       保证幕在它的窗口内一定演得出来（不像普通事件那样看运气）——
       这就是 campaign 与已停用的主线 arc 的根本区别：流程必须一幕幕推下去。 */
    if (P.campaignForceSlot) {
      const cs = P.campaignForceSlot();
      if (cs) out.unshift(cs);
    }

    /* 日常公务注入：本月已有 fixed/竞选档期时按小概率追加一条（默认 0），
       空转月按 emptyFillChance 兜底一条。balance.choreDynamic.enabled=false 即完全关闭。 */
    if (P.choresSlot) {
      const ch = P.choresSlot(out.length === 0);
      if (ch) out.push(ch);
    }

    const pressure = P.pressure();
    const bonus = P.bonusPressure();
    let pActive = (b.activeChance == null ? 0.4 : b.activeChance)
      + pressure * (b.activePressureMul == null ? 0.1 : b.activePressureMul)
      + bonus * (b.activeBonusMul == null ? 0.06 : b.activeBonusMul);
    pActive = P.clamp(pActive, b.activeMin == null ? 0.08 : b.activeMin, b.activeMax == null ? 0.95 : b.activeMax);

    const hasSomething = out.length > 0;
    if (!hasSomething && !P.chance(pActive)) return [];

    const variance = P.rint(0, b.slotsVariance == null ? 1 : b.slotsVariance);
    let n = (hasSomething ? 0 : (b.slotsBase == null ? 1 : b.slotsBase))
      + (pressure >= (b.slotsPressureAt == null ? 4 : b.slotsPressureAt) ? 1 : 0)
      + (bonus >= (b.slotsBonusAt == null ? 2 : b.slotsBonusAt) ? 1 : 0)
      + variance;
    n = P.clamp(n, 1, b.slotsMax == null ? 3 : b.slotsMax);
    /* 每个档期独立掷三值性（机遇/风险/威胁）：类与类之间互不挤占、
       与本月初生无关 —— 坏事件不会因为本月已有好事件就不来。 */
    while (out.length < n) out.push({ grade: P.pickGrade(pressure), valence: P.pickValence(pressure) });
    return out;
  };

  /* ---------- 推进：月 → 月 → 年 ---------- */
  P.monthLabel = function (m) { return P.t("ui.time.monthLabel", "{M} 月", { M: (m == null ? P.G.month : m) }); };

  /* 从当前月开始向前推进，跳过平静的月份；遇到有档期的月份就停下并返回 true。
     注意 month = 0 是"年初、还没进过任何月份"的哨兵值，不是"1 月"——
     所以这里必须用 `month == null ? 0 : month`，不能用 `month || 1`（0 会被当成假值）。 */
  /* opts.skipQuiet = true：平静月不停留直接跳过（年终收尾/模拟器快进用）。
     v0.5.2 起默认逐月停留 —— 每一个平静月也要出一张月卡给玩家看、手动点继续，
     工资/开销/小惊喜都在这张卡上结算（用户明确要求：不许把两个月合并成一段）。 */
  P.advanceMonth = function (opts) {
    const G = P.G;
    const skipQuiet = !!(opts && opts.skipQuiet);
    const maxM = P.balance().monthsPerYear || 12;
    let m = (G.month == null ? 0 : G.month) + 1;
    while (m <= maxM) {
      G.month = m;
      /* 竞选链：每月推一次（推幕 / 选情流失 / 崩盘判定）。主线 arc 已停用，这里只推竞选。 */
      if (P.campaignTick) P.campaignTick(m);
      /* v0.9：每月经手结一次"上班的账"（工资-开销 / 学贷 / 选民增减），有事无事都算，
         这样收益才跟着身位走 —— 幂等记入 G.ledger，界面只读不再重复扣钱。 */
      if (P.monthlyLedger) P.monthlyLedger(m);
      const plan = P.planMonth(m);
      if (plan.length) {
        G.monthPlan = plan;
        G.slotIndex = 0;
        G.slotCount = plan.length;
        return "event";         // 停在这个月，让主循环出事件
      }
      G.quietMonths.push(m);    // 平静的月份只留一行记录
      /* 静好岁月：把这个月"过掉"——结算按部就班的成长，并把这一段的文字抽好存进存档。
         放在时间轴上（而不是渲染时），是为了让模拟器也真的走这条路径。 */
      if (P.settleQuietMonth) P.settleQuietMonth(m);
      if (!skipQuiet) return "quiet";   // v0.5.2：平静月也停留，出一张月卡
      m++;
    }
    return false;               // 本年结束
  };

  /* 开一个新月的档期（不推进月份，只装载计划） */
  P.loadMonth = function (month) {
    const G = P.G;
    G.month = month;
    const plan = P.planMonth(month);
    G.monthPlan = plan;
    G.slotIndex = 0;
    G.slotCount = plan.length;
    return plan;
  };

  /* 本月第几个档期（界面用）：1 / 2 */
  P.slotLabel = function () {
    const G = P.G;
    if (!G.slotCount) return "";
    return P.t("ui.time.slotLabel", "本月第 {N}/{T} 件事",
      { N: Math.min(G.slotIndex, G.slotCount), T: G.slotCount });
  };

  /* 当月量级概览（界面用）：{major:1, mid:0, minor:2} */
  P.monthGradeCount = function () {
    const c = { major: 0, mid: 0, minor: 0 };
    (P.G.monthPlan || []).forEach(function (s) { c[s.grade] = (c[s.grade] || 0) + 1; });
    return c;
  };
})();
