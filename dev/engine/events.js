/* ============================================================================
 * POTUS ENGINE · events.js
 * 事件筛选、抽取、填充、新闻生成。全部基于注册表，新增事件无需改引擎。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  function inArr(list, v) { return !list || list.indexOf(v) >= 0; }

  P.gradeOf = function (ev) { return ev.grade || "minor"; };
  /* unique 默认：大事件一局只演一次；其他事件靠 recentIds 去重 */
  P.isUnique = function (ev) { return ev.unique == null ? P.gradeOf(ev) === "major" : !!ev.unique; };

  /* ---------- #32 事件四大类（kind）：全部从已有声明派生，内容零迁移 ----------
   *   campaign 竞选事件 —— category:"campaign" 或挂在某个竞选的幕表上（引擎一幕幕强制推进）
   *   fixed    固定历史 —— 钉在 reg.fixed / era.scheduled 上，或年月窗口收成一天
   *   career   职业事件 —— chore:true（日常公务），或 category∈{career 仕途, govt 政务}
   *   random   随机事件 —— 其余氛围卡（含 civil 民权运动；shady 灰产走独立额度）
   * 判定顺序即优先级：一张竞选幕卡也可能同时写了 chore，历史锚点也可能落在 career 类。
   * #21 M1 加了**第五类** whitehouse：白宫事务既不占随机额度，也绝不该被算进
   * "职业事件"那一格去参与「固定 ≥ 职业 ≥ 随机」的年均比较 —— 它是当选后才开启的
   * 一条独立通道，混进四大类会让那个耦合指标在总统局里失真（kindHit 里单列）。 */
  let _pinSet = null, _pinKey = "";
  P.pinIds = function () {
    const key = (P.reg.fixed || []).length + ":" + Object.keys(P.reg.era || {}).length;
    if (_pinSet && _pinKey === key) return _pinSet;
    _pinSet = {};
    const take = function (list) { (list || []).forEach(function (s) { if (s.event) _pinSet[s.event] = 1; }); };
    take(P.reg.fixed);
    for (const id in (P.reg.era || {})) take(P.reg.era[id].scheduled);
    _pinKey = key;
    return _pinSet;
  };
  P.eventKind = function (ev) {
    if (!ev) return "random";
    if (ev.category === "campaign" || (P.isCampaignActEvent && P.isCampaignActEvent(ev.id))) return "campaign";
    if (P.pinIds()[ev.id] || (ev.minYear != null && ev.minYear === ev.maxYear)) return "fixed";
    if (ev.wh) return "whitehouse";
    if (ev.chore || ev.category === "career" || ev.category === "govt") return "career";
    return "random";
  };
  /* ---------- #32 随机类年度限流 ----------
   * 设计目标：氛围性随机事件 1—2 件/年。刷太快会让属性和钱白手起家、后期十拿九稳。
   * 固定历史、职业、竞选三类不吃这个额度 —— 它们是"到点必演"和"该干的活"。
   * 灰产投机（category:"shady"）算随机类，但走**独立**额度（#28 的豁免通道：
   * 留给反复赌的人），所以它既不挤占正常随机事件的名额，也不会被正常额度误杀。
   * 计数按自然年自动翻页（yearKindsYear 与 G.year 对不上就清零），
   * 于是读档、模拟器快进、跨年结算都不需要谁记得手动重置。 */
  P.paceCfg = function () {
    const p = P.balance().pace || {};
    return {
      enabled: p.enabled !== false,
      yearRandomMax: fnum(p.yearRandomMax, 2),
      grayMax: fnum(p.grayMax, 4)
    };
  };
  P.yearKinds = function () {
    const G = P.G;
    if (!G) return null;
    if (!G.yearKinds || G.yearKindsYear !== G.year) {
      G.yearKinds = { fixed: 0, campaign: 0, career: 0, random: 0, shady: 0 };
      G.yearKindsYear = G.year;
    }
    return G.yearKinds;
  };
  /* ---------- #28② 投机/灰产豁免通道（ev.pace === "exempt"）----------
   * 灰色生意的设计前提是**可以反复赌**：同一笔庄家生意这局做三次不荒谬，
   * 一次家庭葬礼演三次才荒谬。所以这类卡跳过 #24 的单卡衰减与 #27 的硬冷却，
   * 但仍吃**灰产年度额度**（grayMax）—— 豁免的是"同卡重复"，不是"无限量供应"。
   * 内容侧配套：必须显式 `unique:false`（major 卡默认一局一次，见 P.isUnique）。 */
  P.paceExempt = function (ev) { return !!(ev && ev.pace === "exempt"); };

  /* 这张卡走哪个额度桶：random+shady → shady，其余同名 */
  function paceBucket(ev) {
    const k = P.eventKind(ev);
    return (k === "random" && (ev.category === "shady" || P.paceExempt(ev))) ? "shady" : k;
  }
  P.paceBlocked = function (ev) {
    const p = P.paceCfg();
    if (!p.enabled || !ev) return false;
    if (P.eventKind(ev) !== "random") return false;
    const k = P.yearKinds();
    if (!k) return false;
    const bucket = paceBucket(ev);
    return (k[bucket] || 0) >= (bucket === "shady" ? p.grayMax : p.yearRandomMax);
  };
  /* 灰产额度里「此刻真有货」的部分：全库灰产卡只有个位数，各自还吃着 unique 与
     24 个月硬冷却，额度用不满是常态。把空额度也排成档期，抽卡时池子是空的，
     整月就只能喂填充器（实测填充率飙到 28%）——所以先探一张有没有货。 */
  P.grayRoom = function (snap) {
    const p = P.paceCfg();
    if (!p.enabled) return Infinity;
    const k = P.yearKinds();
    if (!k) return Infinity;
    const left = Math.max(0, p.grayMax - (k.shady || 0));
    if (left <= 0) return 0;
    const s = snap || P.snap();
    const hasStock = (P.events || []).some(function (e) {
      return e.category === "shady" && P.eligible(e, true, s);
    });
    return hasStock ? left : 0;
  };
  /* 本年还能排几条随机档期（time.js 排月计划用；额度满了就该让这一月静下去） */
  P.randomRoom = function () {
    const p = P.paceCfg();
    if (!p.enabled) return Infinity;
    const k = P.yearKinds();
    if (!k) return Infinity;
    return Math.max(0, p.yearRandomMax - (k.random || 0)) + P.grayRoom();
  };


  /* 事件是否可触发。
   * 状态类条件（时代/轨道/党派/起点/出身/层级/资源/标记/人脉/在位数/前情/cond）
   * 全部交给统一的 P.when()（engine/when.js）—— 引擎里只有那一套"什么时候成立"的词汇。
   * 这里只管三件 when 管不了的事：年份窗口、媒介、以及事件自身的自洽性。
   *
   * snap 可以传一张预先造好的玩家快照（drawEvent 会造一次往下传），
   * 免得一次抽取里为 61 个事件各造一张 —— 300 局模拟能省下几千万次分配。
   * ignoreRecent = true 时忽略「近期演过」的去重窗口——预留给最后一级兜底，
   * 让事件池很薄时宁可重复演一个真实事件，也不要整月都出填充器。 */
  P.eligible = function (ev, ignoreRecent, snap) {
    const G = P.G;
    /* 日常公务事件（chore）不进随机卡池，只经 time.js 的 choresSlot 注入通道出现 */
    if (ev.chore) return false;
    /* #21 M1：白宫事务（wh）同上，只经 whiteHouseSlot 强制档期出现 ——
       它们不该在地方官员的月份里被随机抽到（tierMin 9 也挡着，但通道纪律要写死）。 */
    if (ev.wh) return false;
    if (!P.when(ev, snap)) return false;
    /* 时代适配：年份窗口 + 媒介（这条事件要靠的"说话方式"此刻存不存在） */
    if (!P.yearOK(ev)) return false;
    if (!P.mediumOK(ev)) return false;
    /* 事件对自己的一致性声明：这条事件只允许出现在这几个量级上（一般不用写） */
    if (ev.grades && ev.grades.indexOf(P.gradeOf(ev)) < 0) return false;
    if (P.isUnique(ev) && G.doneIds.indexOf(ev.id) >= 0) return false;   // 一局一次
    if (!ignoreRecent && P.recentIds.indexOf(ev.id) >= 0) return false;
    /* #32：随机类本年额度已满 —— 这类卡从卡池里剔除（固定/职业/竞选不受影响）。
       静默剔除即可：planMonth 已经按剩余额度少排档期，这里只兜住"灰产与正常随机
       各自满各自的额度"这层区分。 */
    if (P.paceBlocked(ev)) return false;
    /* 单卡硬冷却（v0.12 事件节奏）：演过一次的卡，N 个月内连 pass3（放开 recentIds 的最后兜底）
       都不再入选 —— 和「本月已演」同级的硬闸。探针实测：只有权重衰减（idRepeatMul）时，
       薄池组合会一路掉进 pass3 重抽同一张卡（dyn 卡单局被抽 147 次），刷屏照旧。
       豁免：仅 prog_* 晋升卡 —— 失败后每年重试是设计。链幕不吃豁免：续幕「首演」时
       自身 doneSeq 为空、冷却根本不拦它，而没写 unique 的续幕（如 med2_profile_after）
       恰恰最需要这道闸（探针曾量到单局 81 次）。
       debuff 续燃卡（rereq 满足）走更短的窗口而不是全豁免 —— 「麻烦的家人」可以回来，
       但不能变成年报。
       #28② 豁免：pace:"exempt" 的投机/灰产卡不吃这道闸（同一笔庄家生意反复做是设计），
       它们仍由 paceBucket 走 grayMax 年度额度封顶。 */
    if (String(ev.id).indexOf("prog_") !== 0 && !P.paceExempt(ev) && G.doneSeq && G.doneSeq[ev.id] != null) {
      const bl = P.balance();
      const armed = ev.rereq && P.when(ev.rereq, snap || P.snap());
      const win = fnum(armed ? bl.idRepelRereqMonths : bl.idRepelMonths, armed ? 12 : 24);
      if (win > 0 && P.monthSeq() - G.doneSeq[ev.id] < win) return false;
    }
    /* 竞选幕事件锁定：属于某个竞选流程的事件（宣战/初选/辩论/投票日…），
       只有当它正是当前幕时才允许出现 —— 否则不能从普通卡池里被随机抽走。
       （当前幕由 campaign.js 经 planMonth 以 eventId 定点档期强制推出，不经这里。） */
    if (P.campaignLockedOut && P.campaignLockedOut(ev)) return false;
    return true;
  };

  /* ---------- #32⑤ 选项级分层：同一个史实，三种身份视角 ----------
   * 一条选项可以写 ch.when（统一 P.when 词汇，engine/when.js）——不成立就**整条不出现**，
   * 而不是灰着：底层玩家不该看见「下令动武」这种与他无关的按钮。
   * 于是旗舰历史事件一张卡就能写完底（T0-3 旁观自救）/ 中（T4-6 表态执行）/
   * 高（T7+ 决策担当）三档选择支，不必拆成三张变体卡（省掉近 2/3 的内容量）。
   * 保底：全部选项都被挡住时，先退回"没写 when"的那些，再不行退回原表 ——
   * 宁可不分层，也不能让玩家面对一张没有按钮的事件卡。 */
  P.visibleChoices = function (ev) {
    const chs = (ev && ev.choices) || [];
    if (!chs.length) return chs;
    const snap = P.snap();
    const ok = chs.filter(function (ch) { return !ch.when || P.when(ch.when, snap); });
    if (ok.length) return ok;
    const loose = chs.filter(function (ch) { return !ch.when; });
    return loose.length ? loose : chs;
  };

  /* 事件链的「前情」：给界面显示上一幕的标题，让玩家知道自己接的是哪条线 */
  P.prevEventOf = function (ev) {
    if (!ev || !ev.after || !ev.after.id) return null;
    for (let i = 0; i < P.events.length; i++) if (P.events[i].id === ev.after.id) return P.events[i];
    return null;
  };

  /* 季节性优先：先要"就是本月"的，再要"今年晚些时候"的，最后才允许补早季的 */
  P._seasonal = function (pool) {
    const m = P.G.month || 1;
    const exact = pool.filter(function (e) { return e.month == null || e.month === m; });
    if (exact.length) return exact;
    const later = pool.filter(function (e) { return e.month > m; });
    if (later.length) return later;
    return pool;
  };

  /* ==========================================================================
   * 权重管线：一条事件"轮到"的相对机会
   * --------------------------------------------------------------------------
   *   w = 基础权重 × 时代专属 × 续集 × 倾斜(tilt)
   *
   * tilt 是"玩家处境造成的倾斜"，由四个因子相乘而来：
   *   身份（identity）× 资源（resource）× 主线（arc）× 重复（repeat）
   *
   * 为什么要把管线切成"两段"而不是一律相乘：
   *   · 时代倍数（×3）和续集倍数（×9）是**全局平衡旋钮**，写在 balance 里，
   *     300 局模拟盯着它们的实际效果（续集占比应 ≈ chainWeightMul/(chainWeightMul+1)）。
   *     它们**不参与夹取** —— 否则把 chainWeightMul 调成 9 会被夹成 3，整条链就散了。
   *   · 倾斜因子是**按玩家逐条算出来的**，必须夹取 + 封顶。否则 5 个身份维度各 ×2
   *     就是 ×32，再叠上续集 ×9 就是 ×1000 —— 一条事件能把整个池子吃干净。
   *
   * 封顶是**双向**的：向上防刷屏，向下防"某类玩家被彻底饿死"。
   * 少了向下那一半，"gate 写太窄 → 一局只剩填充器"会静默发生。
   * ========================================================================== */

  function fnum(v, dft) { return (typeof v === "number" && isFinite(v)) ? v : dft; }

  /* 单个因子夹取：不让任何一条规则把相对差距拉到病态 */
  function clampF(v) {
    const b = P.balance();
    return P.clamp(fnum(v, 1), fnum(b.weightFactorMin, 0.4), fnum(b.weightFactorMax, 3));
  }
  /* 整条倾斜的封顶 */
  function clampTilt(t) {
    const b = P.balance(), cap = fnum(b.weightTiltCap, 8);
    return P.clamp(t, 1 / cap, cap);
  }

  /* 声明式倾向表求值。
   * 规则形状：{ when: 条件, ids: {事件id: 倍数}, cats: {类型: 倍数}, tags: {标签: 倍数}, mul: 通用倍数, off: true }
   *   · when —— 用统一的 P.when() 词汇（engine/when.js），不命中就整条跳过
   *   · ids / cats / tags —— **命中才有**的定向倍数（不在名单里 = ×1，不惩罚）
   *   · mul —— **无条件**的通用倍数，一般别写（会波及所有事件）
   * 命中多条规则就相乘，最后由调用方整体夹取。 */
  P.biasMul = function (rules, ev, snap) {
    if (!rules || !rules.length || !ev) return 1;
    let m = 1;
    for (let i = 0; i < rules.length; i++) {
      const r = rules[i];
      if (!r || r.off) continue;
      if (r.when != null && !P.when(r.when, snap)) continue;
      if (r.ids && ev.id != null && r.ids[ev.id] != null) m *= r.ids[ev.id];
      if (r.cats && ev.category != null && r.cats[ev.category] != null) m *= r.cats[ev.category];
      if (r.tags && ev.tags) {
        const tg = [].concat(ev.tags);
        for (let j = 0; j < tg.length; j++) if (r.tags[tg[j]] != null) m *= r.tags[tg[j]];
      }
      if (r.mul != null) m *= r.mul;
    }
    return m;
  };

  /* 重复惩罚：同一个类型在"近期演过"的窗口里出现越多，就越压低它 —— 防止一类刷屏。
   * **默认关闭**（balance.repeatBias = 1）。打开会把类型分布明显拉平，但它同时会改变
   * 内容构成，从而牵动死亡 / 晋升曲线 —— 改完必须重跑 300 局（和 vignette.hpChance 同一个道理）。 */
  function repeatFactor(ev, counts) {
    const per = P.balance().repeatBias;
    if (per == null || per >= 1) return 1;
    return Math.pow(per, (counts && counts[ev.category]) || 0);
  }

  /* ---------- 单卡终身衰减（v0.12 · 用户「同一事件反复出现不现实」） ----------
   * 一张卡这局只要演过一次（doneSeq 里有它的月份），再被抽到时整条权重乘 idRepeatMul
   * （默认 0.15 = 砍掉 85%）。它和 repeatFactor 是两回事：
   *   · repeatFactor = 按「类型」在近期窗口内拉平，防某一大类刷屏，可关；
   *   · idRepeatFactor = 按「具体这张卡」终身降权，防同一张卡反复演 —— 正是玩家投诉的那个。
   * 与 era/chain 同级：是全局平衡旋钮，**不吃 clampF**（否则 0.15 会被下限 0.4 夹掉，形同虚设）。
   *
   * 例外（重新解锁）：事件可声明 ev.rereq（统一 when 词汇，见 docs §4.16）。
   *   当前状态命中 rereq → 这一张豁免衰减（返回 ev.rereqMul，默认 1）。
   *   用于「麻烦的家人」这类 debuff 续燃：只要家属还在惹祸的 flag 在手，保释电话就还会来。
   * unique 事件（一局一次）在 eligible 已被挡死，走不到这里；返回 0 只是防御性兜底。
   * #28② 例外：pace:"exempt" 的投机卡不衰减（见文件头的豁免通道）。 */
  function idRepeatFactor(ev, snap) {
    const G = P.G;
    if (!G || !G.doneSeq || G.doneSeq[ev.id] == null) return 1;      // 这局还没演过
    if (P.paceExempt(ev)) return 1;                                   // 生意可以重复做
    if (P.isUnique(ev)) return 0;
    if (ev.rereq && P.when(ev.rereq, snap || P.snap())) return fnum(ev.rereqMul, 1);
    return fnum(P.balance().idRepeatMul, 0.15);
  }
  P.idRepeatFactor = idRepeatFactor;

  /* 快取：事件 id → 事件对象。drawEvent 与诊断都会反复按 id 找事件。 */
  let _evIdx = null, _evIdxN = -1;
  P.evById = function (id) {
    if (_evIdx == null || _evIdxN !== P.events.length) {
      _evIdx = {}; _evIdxN = P.events.length;
      for (let i = 0; i < P.events.length; i++) _evIdx[P.events[i].id] = P.events[i];
    }
    return _evIdx[id] || null;
  };

  /* 近窗口里各类事件各演了几次（重复惩罚用）。从 P.recentIds 现算 ——
     不新增需要跟着重置的全局状态，少一个"忘了重置"的坑。 */
  P.recentCatCounts = function () {
    const m = {};
    for (let i = 0; i < P.recentIds.length; i++) {
      const e = P.evById(P.recentIds[i]);
      const c = (e && e.category) || "general";
      m[c] = (m[c] || 0) + 1;
    }
    return m;
  };

  /* 只要倾斜的数值（抽取热路径用，不分配对象） */
  function tiltOf(ev, snap, counts) {
    const b = P.balance();
    /* 主线 arc 已停用（玩法大改造：多支路主线砍掉），arc 因子恒为 1。 */
    const t = clampF(P.biasMul(b.identityBias, ev, snap)) *
      clampF(P.biasMul(b.resourceBias, ev, snap)) *
      clampF(repeatFactor(ev, counts));
    return clampTilt(t);
  }

  /* "分期专属"判定：窄 era 标签，或显式 scoped:true（去时代化后按年份窗口的时代事件用这个标记）。
     这类事件只在本分期能被抽到，给一份权重倍数，免得被常青通用事件淹没（沿用 eraWeightMul）。 */
  function periodScoped(e, eraCount) {
    const eraNarrow = e.era && e.era.length && e.era.length < eraCount;
    return eraNarrow || !!e.scoped;
  }

  /* 完整的权重拆解 —— 抽取用它，诊断矩阵与界面"为什么这件事找上你"也用它 */
  P.weightBreakdown = function (ev, snap, opts) {
    const b = P.balance(), o = opts || {};
    snap = snap || P.snap();
    const eraCount = Object.keys(P.reg.era).length;
    const d = {
      base: fnum(ev.weight, 10),
      era: periodScoped(ev, eraCount) ? fnum(b.eraWeightMul, 3) : 1,
      chain: ev.after ? fnum(b.chainWeightMul, 9) : 1,
      idRepeat: idRepeatFactor(ev, snap),
      identity: clampF(P.biasMul(b.identityBias, ev, snap)),
      resource: clampF(P.biasMul(b.resourceBias, ev, snap)),
      arc: 1,   /* 主线 arc 已停用：诊断里保留键位但恒为 1 */
      repeat: clampF(repeatFactor(ev, o.counts))
    };
    d.tilt = clampTilt(d.identity * d.resource * d.arc * d.repeat);
    d.total = d.base * d.era * d.chain * d.idRepeat * d.tilt;
    return d;
  };

  /* 有效权重（抽取用）。snap / counts 由 drawEvent 造一次往下传 ——
     一次抽取里为 61 个事件各造一遍会让 300 局模拟多花几千万次分配。 */
  function effWeight(e, snap, counts) {
    const b = P.balance();
    let w = fnum(e.weight, 10);
    const eraCount = Object.keys(P.reg.era).length;
    if (periodScoped(e, eraCount)) w *= fnum(b.eraWeightMul, 3);
    if (e.after) w *= fnum(b.chainWeightMul, 9);
    w *= idRepeatFactor(e, snap);          // 单卡终身衰减（全局旋钮，不吃 clamp）
    return w * tiltOf(e, snap, counts);
  }

  /* 线性权重随机。先把权重算进数组，避免 totals 与选取两趟各算一遍。 */
  function weighted(pool, snap, counts) {
    const n = pool.length;
    if (!n) return null;
    const ws = new Array(n);
    let tot = 0;
    for (let i = 0; i < n; i++) { tot += (ws[i] = effWeight(pool[i], snap, counts)); }
    if (!(tot > 0)) return pool[0];                  // 理论上不会发生（倾斜有下限）
    let r = Math.random() * tot;
    for (let i = 0; i < n; i++) { r -= ws[i]; if (r <= 0) return pool[i]; }
    return pool[n - 1];
  }

  /* 记一次"已演过"：unique 事件进 doneIds，全部事件进近期去重窗口。
   * forceOnce=true 用于时代脚本（era.scheduled）——它自带 once 语义，必须记进 doneIds，
   * 否则下一年到点还会再演一次。 */
  P._markDrawn = function (ev, forceOnce) {
    const G = P.G, b = P.balance();
    if ((forceOnce || P.isUnique(ev)) && G.doneIds.indexOf(ev.id) < 0) G.doneIds.push(ev.id);
    P.stamp(ev.id);                       // 记下"这一幕发生在哪个月"，事件链靠它算间隔
    P.recentIds.push(ev.id);
    while (P.recentIds.length > (b.recentCap == null ? 20 : b.recentCap)) P.recentIds.shift();
    /* #32：四大类各自记年度账（随机限流读它，验收报告也读它） */
    const yk = P.yearKinds();
    if (yk) { const bk = paceBucket(ev); yk[bk] = (yk[bk] || 0) + 1; }
    return ev;
  };

  /* ---------- 抽取 ----------
   * slot: {grade:"major"|"mid"|"minor", valence?:"boon"|"risk"|"bane", eventId?}（time.js 排定）
   * - 定点事件：直接给
   * - 否则两段式：先定三值性（档期没带就现场独立掷一个），再在该类的池子里
   *   按量级取；这类池空了按相邻类降级，量级池空了按 gradeFallback 降级。
   * 三值性优先于量级、更优先于月份保真 —— 玩家最先感知的是"找上我的是机遇还是威胁"。
   * 每个档期独立掷 valence，类与类之间互不挤占（有了好事件不挡坏事件）。
   */
  P.drawEvent = function (slot) {
    const G = P.G, b = P.balance();
    slot = slot || { grade: "minor" };
  
    /* 同一自然月内绝不允许同一张卡重演（用户铁律，优先于「避免填充器」）。
       跨月自动清空。它比 recentIds 更高一级：即便走到最后一级兑底（放开近期窗口），
       也不会挑本月已经演过的那张。 */
    const _mk = G.year + ":" + G.month;
    if (P._monthKey !== _mk) { P._monthKey = _mk; P._monthSeen = []; }
  
    /* 玩家快照 + 类型计数：整次抽取共用一份（含所有降级 pass），
       避免为几十个事件各造一遍。 */
    const snap = P.snap();
    const counts = P.recentCatCounts();
  
    if (slot.eventId) {
      const hit = P.evById(slot.eventId);
      if (hit) { P._monthSeen.push(hit.id); return P.flavorFill(P.realize(P._markDrawn(hit, true))); }   // 时代脚本：一局只演一次
    }
  
    const fallback = b.gradeFallback || {};
    const want = slot.grade || "minor";
    const chain = fallback[want] || [want];
    const m = P.G.month;
  
    /* 三值性抽取顺序：本档期掷中的类 → 其余类（中性风险优先当缓冲垫） */
    const wantV = slot.valence || P.pickValence();
    slot.valence = wantV;                        // 写回档期（诊断/界面"为什么是威胁"）
    const vChain = [wantV].concat(P.VAL_CHAIN.filter(function (v) { return v !== wantV; }));
  
    for (let vi = 0; vi < vChain.length; vi++) {
      const wantVal = vChain[vi];
      /* 四级抽取，先严后宽：
       *   0) 就是本月的事件            —— 界面上写的「2008 年 9 月」真对应一个 9 月的事件
       *   1) 没写月份的事件（常青事件）—— 放哪个月都不穿帮
       *   2) 允许月份不符，但避开近期演过的 —— 用 _seasonal 尽量挑离当前月最近的
       *   3) 连去重窗口也放开 —— 事件池薄的时候，宁可重复演一个真事件，也不要整月都是填充器
       * 每降一级，内容质量就低一档，所以填充器只留给「连一个硬条件都不满足」的情况。 */
      for (let pass = 0; pass < 4; pass++) {
        for (let i = 0; i < chain.length; i++) {
          let pool = P.events.filter(function (e) {
            if (!P.eligible(e, pass >= 3, snap) || P.gradeOf(e) !== chain[i]) return false;
            if (P._monthSeen.indexOf(e.id) >= 0) return false;   // 本月已演过：任何降级都不再选它
            if (P.valenceOf(e) !== wantVal) return false;
            if (pass === 0) return e.month === m;
            if (pass === 1) return e.month == null;
            return true;
          });
          if (!pool.length) continue;
          if (pass === 2) pool = P._seasonal(pool);
          if (pool.length) { const chosen = weighted(pool, snap, counts); P._monthSeen.push(chosen.id); return P.flavorFill(P.realize(P._markDrawn(chosen))); }
        }
      }
    }
    /* 全部量级都没货：退到填充器，并把它算作本档期 */
    return P.generateFiller(slot);
  };

  /* 填充器：内容包可提供 函数 或 声明式对象（见 docs/CONTENT-SCHEMA.md）
   * 填充事件永不进 doneIds（unique:false），且会继承档期的量级，保证"大事件"位不会出现空卡。 */
  P.generateFiller = function (slot) {
    const G = P.G;
    const grade = (slot && slot.grade) || "minor";
    const pack = P.reg.filler[P.eraAt(G.year)] || P.reg.filler["*"];
    if (!pack) return P._safetyFiller(grade);
    if (typeof pack === "function") return pack(P, G, grade);
    const topic = P.pick(pack.topics || [P.t("ui.events.fillerTopic", "一桩地方丑闻")]);
    const act = P.pick(pack.acts || [P.t("ui.events.fillerAct", "你被卷进")]);
    const tpl = pack.bodyTpl || P.t("ui.events.fillerBodyTpl", "{act}{topic}。你必须在聚光灯下做出选择。");
    const cats = pack.categories || ["general"];
    return {
      id: "filler_" + Math.random().toString(36).slice(2, 8),
      era: [P.eraAt(G.year)], tierMin: 0, tierMax: 99, weight: 1, filler: true,
      unique: false, grade: grade, category: P.pick(cats), valence: (slot && slot.valence) || "risk",
      title: topic,
      body: tpl.replace("{act}", act).replace("{topic}", topic),
      brief: pack.brief ? {
        known: [].concat(pack.brief.known || []),
        rumor: [].concat(pack.brief.rumor || []),
        unknown: [].concat(pack.brief.unknown || [])
      } : undefined,
      choices: pack.choices || P._safetyFiller(grade).choices
    };
  };

  /* 内容缺失时的兜底，保证引擎不会崩 */
  P._safetyFiller = function (grade) {
    const mk = function (text, attrKey) {
      return {
        id: "safe", text: text, base: 0.5, mods: [{ src: "attr", key: attrKey, w: 0.4 }],
        outcomes: {
          crit: { body: P.t("ui.events.safeCrit", "你处理得很漂亮。"), effects: { rep: 4, fac: { base: 6 } } },
          ok: { body: P.t("ui.events.safeOk", "平稳落地。"), effects: { rep: 2, fac: { base: 3 } } },
          meh: { body: P.t("ui.events.safeMeh", "勉强过关，略有损失。"), effects: { rep: 1, fac: { base: -2 } } },
          fail: { body: P.t("ui.events.safeFail", "事情没成。"), effects: { rep: -2, fac: { base: -4 } } },
          critfail: { body: P.t("ui.events.safeCritfail", "局面失控。"), effects: { rep: -5, fac: { press: -6 }, flags: ["scandal_1"] } }
        }
      };
    };
    return {
      id: "filler_safe_" + Math.random().toString(36).slice(2, 8),
      era: [P.eraAt(P.G.year)], tierMin: 0, tierMax: 99, weight: 1, filler: true,
      unique: false, grade: grade || "minor", category: "general", valence: "risk",
      title: P.t("ui.events.fillerTopic", "一桩地方丑闻"), body: P.t("ui.events.safeBody", "你被卷进一桩地方丑闻。必须在聚光灯下做出选择。"),
      choices: [mk(P.t("ui.events.safeChoiceHi", "高调处理，抢占道德高地"), "CHA"), mk(P.t("ui.events.safeChoiceLow", "低调摆平，用关系解决"), "CUN")]
    };
  };

  /* 新闻标题（离线模板；内容可覆盖 outlets / newsTpl） */
  P.makeNews = function (headline) {
    const era = P.reg.era[P.eraAt(P.G.year)] || {};
    const wl = P.reg.worldline || {};
    const wOut = wl.outlets && (wl.outlets[P.G.year] || wl.outlets["*"]);
    const outlets = wOut || P.reg.newsOutlets[P.eraAt(P.G.year)] || era.outlets || [P.t("ui.events.newsOutlet", "本报")];
    const tpl = wl.newsTpl || era.newsTpl || P.t("ui.events.newsTpl", "【{outlet}】{year}年{month}月｜{name}：{headline}");
    return tpl.replace("{outlet}", P.pick(outlets)).replace("{year}", P.G.year)
      .replace("{month}", P.G.month || 1)
      .replace("{name}", P.G.name).replace("{headline}", headline);
  };
})();
