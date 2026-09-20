/* ============================================================================
 * POTUS ENGINE · arc.js
 * 「主线」—— 一个人这一辈子，主要是在过哪一条命。
 *
 * 和已有机制的分工（别混用）：
 *   · ev.after（事件链）  管"这一幕接的是哪一幕" —— 事件之间的关系，局部、机械。
 *   · 主线 arc            管"这个人活在哪个故事里" —— 全局、由身份和处境决定、**玩家看得见**。
 *   一条主线可以编排若干条已有的事件链；反过来不成立。
 *
 * 三条设计决定（都是刻意的）：
 *   1) 【单线制，但可以换线】同一时刻只有一条活跃主线（balance.arc.maxActive = 1）。
 *      多线并行会让权重叠加失控、面板也没法表达"我同时在两条线上"。
 *      换线是允许的：当前线跑够 switchAfterMonths 个月后，若出现优先级更高的候选就换。
 *   2) 【只加权，不硬塞】主线相关的事件只是**更容易被抽到**（weightMul），
 *      永远不会"到点必定出现"。玩家的选择必须始终决定他遇到什么 ——
 *      硬塞定时事件等于把选择权收走（那是 era.scheduled 的用法，不是主线的）。
 *   3) 【可以无疾而终】超时淡出（faded）、endWhen 从未达成，都是合法结局。
 *      不允许"不了了之"的线会把玩家锁死在一个剧本里。
 *
 * 主线不新写事件，只编排已有事件（stages 里写 event id）。
 * 内容在 content/11-arcs.js，字段契约见 docs/CONTENT-SCHEMA.md §4.16。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  const STATUS = { ACTIVE: "active", DONE: "done", FADED: "faded", DROPPED: "dropped" };
  P.ARC_STATUS = STATUS;


  function fnum(v, d) { return (typeof v === "number" && isFinite(v)) ? v : d; }

  P.arcDef = function (id) { return id ? (P.reg.arc[id] || null) : null; };
  /* 一局里可以进几条主线（默认 1 = 单线制） */
  function maxActive() { return Math.max(1, fnum((P.balance().arc || {}).maxActive, 1)); }

  /* ---------- 当前主线 ----------
   * 返回值刻意做得便宜（抽取热路径会对池子里每个事件调一次），所以带一层按
   * (月序号 / 主线 id / 幕 / 开幕月) 的小记忆。 */
  let _curKey = null, _curVal = null;
  P.arcCurrent = function () {
    const G = P.G;
    if (!G || !G.arc || G.arc.status !== STATUS.ACTIVE) return null;
    const def = P.arcDef(G.arc.id);
    if (!def) return null;
    const key = G.arc.id + "|" + G.arc.stage + "|" + G.arc.since + "|" + G.arc.since0 + "|" + P.monthSeq();
    if (key === _curKey) return _curVal;
    const stages = def.stages || [];
    _curKey = key;
    _curVal = {
      id: G.arc.id, def: def,
      stage: G.arc.stage, stageCount: stages.length,
      step: stages[G.arc.stage] || null,
      stageMonths: P.monthSeq() - (G.arc.since == null ? P.monthSeq() : G.arc.since),
      months: P.monthSeq() - (G.arc.since0 == null ? P.monthSeq() : G.arc.since0)
    };
    return _curVal;
  };

  /* 已经进过的主线（不管什么结局）—— 一局不重进同一条线，除非 def.repeatable */
  function playedBefore(id) {
    const log = P.G.arcLog || [];
    for (let i = 0; i < log.length; i++) {
      if (log[i].id !== id) continue;
      const def = P.arcDef(id);
      if (def && def.repeatable) continue;
      return true;
    }
    return false;
  }
  function exclusiveBlocked(def) {
    if (!def.exclusive || !def.exclusive.length) return false;
    const log = P.G.arcLog || [];
    for (let i = 0; i < log.length; i++) if (def.exclusive.indexOf(log[i].id) >= 0) return true;
    return false;
  }

  /* 一幕可以只写一个事件（st.event），也可以写一串候选（st.events）。
   * 为什么要候选：61 个事件里有 24 个是**时代专属**的（只有 1960 或只有 2008 才有），
   * 只写一个事件 id 的主线换个时代就永远推不动。写成一串候选，这条线就能跨时代。
   * 一幕只要"候选里任意一个演过"就算这一幕过了；加成同时给全部候选。 */
  function stepEvents(step) {
    if (!step) return [];
    if (step.events && step.events.length) return step.events;
    return step.event ? [step.event] : [];
  }
  P.arcStepEvents = stepEvents;
  /* 这一幕演过没有：候选里任意一个在本幕开始之后演过 */
  function stepPlayed(step, since) {
    const ids = stepEvents(step);
    for (let i = 0; i < ids.length; i++) {
      const at = P.G.doneSeq && P.G.doneSeq[ids[i]];
      if (at != null && at >= since) return true;
    }
    return false;
  }

  /* 开局就定死、一局之内**再也不会变**的身份维度。
   * 这些是唯一能拿来"判死一件事件"的字段 —— 其余一切（层级 / 声望 / 把柄 / 健康 /
   * 资金 / 人脉 / 在位时长 / 标记 / 前情 / 月份）都会随时间变，拿它们判死是错的。
   * 依据：全线搜索过，G.track / party / stance / origin / entry / talent 只在建角时赋值，
   * 之后只读不写。 */
  const PERM = ["era", "eras", "notEra", "notEras",
    "tracks", "trackIn", "notTracks", "notTrack",
    "parties", "partyIn", "notParties", "notParty",
    "stances", "notStances", "notStance",
    "origins", "originIn", "notOrigins",
    "entries", "entryIn", "notEntries",
    "talents", "notTalents"];

  /* 事件的身份门槛预先压成一个条件对象，缓存在事件对象上（事件定义是常量）。
   * 不缓存的话，每判一次 deadForever 都要分配一个对象 —— 300 局模拟里那是几千万次分配。 */
  function permCond(ev) {
    if (ev._permCond !== undefined) return ev._permCond;
    let sub = null;
    for (let i = 0; i < PERM.length; i++) {
      if (ev[PERM[i]] != null) { (sub || (sub = {}))[PERM[i]] = ev[PERM[i]]; }
    }
    ev._permCond = sub;
    return sub;
  }

  /* flag → 会设置它的所有事件 id。内容静态分析，全局只算一次。
   * 为什么要它：`ev.flags` 在 when.js 里是**条件**（"玩家必须已有这个标记"），
   * 于是"标记的生产者"就成了一条隐式事件链 —— 生产者死光了，消费者也就永远来不了。 */
  let _flagIdx = null;
  function flagProducers(flag) {
    if (!_flagIdx) {
      _flagIdx = {};
      for (let i = 0; i < P.events.length; i++) {
        const e = P.events[i], cs = e.choices || [];
        for (let j = 0; j < cs.length; j++) {
          const oc = cs[j].outcomes || {};
          for (const t in oc) {
            const fl = (oc[t].effects || {}).flags;
            if (!fl) continue;
            for (let k = 0; k < fl.length; k++) {
              (_flagIdx[fl[k]] || (_flagIdx[fl[k]] = [])).push(e.id);
            }
          }
        }
      }
    }
    return _flagIdx[flag] || null;
  }
  /* 这个标记还有可能被设上吗？
   * 保守规则：**没有任何事件会设置它时，一律当作还有可能** —— 标记也可能由引擎、
   * 建角效果或将来新增的机制设置（例如 dynasty 出身直接给的 mentor），
   * 引擎这里看不到全貌，宁可漏判也不能错杀。 */
  function flagReachable(flag, snap, depth) {
    if (snap.flags && snap.flags.indexOf(flag) >= 0) return true;
    const prods = flagProducers(flag);
    if (!prods || !prods.length) return true;
    for (let i = 0; i < prods.length; i++) {
      const ev = P.evById(prods[i]);
      if (ev && !deadForever(ev, snap, (depth || 0) + 1)) return true;
    }
    return false;
  }

  /* 这件事件"这辈子都不可能再出现了"吗？只认七种**不可逆**的情况：
   *   ① 一局只演一次、且已经演过   —— unique 事件永不重演
   *   ② 时代不符                    —— 一局之内时代不会变
   *   ③ 它要的媒介这个时代没有      —— mediaAvail 也随时代固定
   *   ④ 你已经爬过了这扇门          —— 事件的 tierMax 是它的天花板（"第一次把名字放上
   *      选票"这种给新人的事件），你比天花板还高就再也抽不到了。
   *   ⑤ 身份维度对不上              —— 事件写 tracks:["appointment"] 而你在 electoral 上，
   *      党派/姿态/出身/起点/天赋同理，全是建角时定死的。
   *   ⑥ 它接的那一幕永远演不到了    —— after 前情链断了（前情已永久死亡，或窗口 maxMonthsAfter 已过）。
   *   ⑦ 它要的标记永远没人发了      —— ev.flags 是"玩家必须已有这个标记"，而所有会产生这个
   *      标记的事件都已经死透（典型：archive_bite 要 archive_taken，只有 archive_get 会发，
   *      而 archive_get 一局只能演一次 —— 玩家当初选了"合上，原样放回去"，这条链就到此为止）。
   *
   * 判"永远不可能"必须保守：月份不对、层级**还不够**、在位时长不够、链式前情**还没到**、
   * 标记还不存在但**还能拿到**，都是下个月就可能成立的，绝不能算死 —— 否则"地下室的那一格"
   * 会在第一幕就判死自己。④⑤⑥⑦ 是仅有的四个推断，理由都一样：**别让"已经爬过 / 走的不是
   * 这条路 / 前情链已断 / 标记再也拿不到"的人，在一幕上白等好几年**。⑤⑦ 直接复用 P.when
   * 和事件自己的 outcomes，所以词汇永远跟内容包一致。
   *
   * 实测教训（三个坑，都真实发生过）：
   *   · prog_* 系列全部带 tracks 锁 + minTenure —— 就是⑤要挡的那一类。没有⑤，一条把五个
   *     轨道的事件混写在一幕里的主线，对每个人只有五分之一候选可用。
   *   · archive_bite 的 `flags:["archive_taken"]` 会被 when.js 当成**条件**（要玩家已有这个
   *     标记），而不是当成"这条事件会设置这个标记"。所以它必须等 archive_get 演完才可选；
   *     而 archive_get 是 unique、会在正常轮转里被提前抽走 —— 没有⑥，主线就会挑一个
   *     "第一幕已死、后面全接不上"的断链开跑，白占着最高优先级然后淡出。 */
  /* 这件事件有没有**任何一条**能判死它的途径？没有的话，deadForever 可以直接返回 false。
   * 这是个纯粹的性能开关：引擎每个月要为每条主线的每一幕算一遍死没死（300 局模拟里上千万次），
   * 而大多数事件只有 era/weight/grade 这些**不会判死**的字段 —— 早点出局能省掉绝大部分开销。 */
  function everDies(ev) {
    if (ev._everDies === undefined) {
      ev._everDies = !!(P.isUnique(ev) || (ev.era && ev.era.length) || ev.medium ||
        ev.tierMax != null || ev.flags || ev.after || permCond(ev));
    }
    return ev._everDies;
  }

  function deadForever(ev, snap, depth) {
    if (!ev) return false;                                            // id 写错是校验器的事，不是"死"
    if (!everDies(ev)) return false;                                  // 快速出局：没有任何判死途径
    if (P.isUnique(ev) && P.G.doneIds.indexOf(ev.id) >= 0) return true;
    if (ev.era && ev.era.length && ev.era.indexOf(snap.era) < 0) return true;
    if (!P.mediumOK(ev)) return true;
    if (ev.tierMax != null && snap.tier > ev.tierMax) return true;
    const sub = permCond(ev);
    if (sub && !P.when(sub, snap)) return true;
    /* ⑦ 需要的标记还有没有人会发 */
    if (ev.flags) {
      const need = [].concat(ev.flags);
      for (let i = 0; i < need.length; i++) {
        if (!flagReachable(need[i], snap, (depth || 0) + 1)) return true;
      }
    }
    /* ⑥ 前情链：断了就是断了 */
    const af = ev.after;
    if (af) {
      const prevId = typeof af === "string" ? af : af.id;
      if (prevId) {
        const gap = P.monthsSince ? P.monthsSince(prevId) : null;
        if (gap == null) {
          const prev = P.evById(prevId);
          if (!prev) return true;                                     // 前情 id 写错 = 这条链断了
          /* 递归有深度上限：内容写错了（互相 after）也不会把引擎转死。 */
          if ((depth || 0) < 4 && deadForever(prev, snap, (depth || 0) + 1)) return true;
        } else if (af.maxMonthsAfter != null && gap > af.maxMonthsAfter) {
          return true;                                                // 接续窗口已经关了
        }
      }
    }
    return false;
  }
  /* 这一幕的候选是不是**全都**已经死透了 —— 是就立刻跳过，不必白等一个窗口。
   * 典型场景：主线写了一串跨时代的候选，结果换个时代开局，只剩 1960 的那两件可用。 */
  function stageDead(step, snap) {
    const ids = stepEvents(step);
    if (!ids.length) return false;
    for (let i = 0; i < ids.length; i++) {
      const ev = P.evById(ids[i]);
      if (ev && !deadForever(ev, snap)) return false;
    }
    return true;
  }
  P.arcStageDead = stageDead;

  /* 整条线一幕都推不动吗？（每一幕的候选都死透了）—— 这种线**根本不该开始**，
   * 开始了也只是几个月后淡出，中间还把"让位"的代价付了。 */
  function allStagesDead(def, snap) {
    const stages = def.stages || [];
    if (!stages.length) return true;
    for (let i = 0; i < stages.length; i++) if (!stageDead(stages[i], snap)) return false;
    return true;
  }  /* 有资格换掉当前这条吗？两个条件缺一不可：
   *   · 优先级要**明显**更高（高出一整个 switchMargin 档），不是高一点就换 ——
   *     否则两条同档的线会互相顶来顶去，一辈子都在开场。
   *   · 新线的第一幕得真的推得动。为一条推不动的线让位，是纯亏。 */
  function canDisplace(def, curPriority, snap) {
    const m = fnum((P.balance().arc || {}).switchMargin, 12);
    if (fnum(def.priority, 0) < curPriority + m) return false;
    const first = (def.stages || [])[0];
    if (first && stageDead(first, snap)) return false;
    return true;
  }

  /* 候选：gate 命中 且 本局没进过 且 不与已走过的线互斥 且 **不是生下来就死的**。
   *
   * "生下来就死"才是主线最容易踩的坑，所以在这里一次挡掉两个：
   *   ① endWhen 现在就已经成立 —— 比如 arc_shadow 的 endWhen 是"升到 T4"，
   *      一个已经是 T4 的人进这条线，第一秒就该收场了。加了这一条，"开场即收场"
   *      的循环（每个月换一条线、一辈子走八条）就不可能发生。
   *   ② 每一幕的候选都已经死透（时代/媒介/已演过/已越过天花板）—— 这条线只剩壳，
   *      让它开始只会白付一次"让位"。
   * 两条都是"内容+当前局面"共同决定的，所以只能在这里判，不能写死在内容里。 */
  /* 结果带一层记忆。为什么要：这里每个候选都要跑 allStagesDead（8 条线 × 若干幕 × 若干事件
   * × P.when），一次 tick 里最多问两遍（换线判断 + 起步选择），而 300 局模拟会问几十万次。
   * 记忆键必须覆盖**所有会影响结果的输入**，漏一个就会出现"条件已经变了但还返回旧结果"。
   * 做法：把 snap 的全部标量 + 会变的容器长度拼成一个字符串。这不优雅，但它是可审计的 ——
   * 新增一个能被 gate/endWhen 读到的字段时，必须同步加进这个签名（构造函数下面有一行断言兜底）。 */
  let _candKey = null, _candVal = null, _candLog = null;
  function candSig(snap) {
    const G = P.G || {};
    return snap.era + "|" + snap.year + "|" + snap.month + "|" + snap.age + "|" +
      snap.track + "|" + snap.party + "|" + snap.stance + "|" + snap.origin + "|" +
      snap.entry + "|" + snap.talent + "|" + snap.tier + "|" + snap.rep + "|" +
      snap.hp + "|" + snap.fun + "|" + snap.fav + "|" + snap.lev + "|" +
      snap.contactN + "|" + snap.scandal + "|" + snap.tenure + "|" +
      (snap.flags ? snap.flags.length : 0) + "|" + snap.reason + "|" +
      (G.doneIds ? G.doneIds.length : 0) + "|" + (G.arcLog ? G.arcLog.length : 0) + "|" +
      (G.arc ? G.arc.id : "-") + "|" + (P.recentIds ? P.recentIds.length : 0);
  }
  P.arcCandidates = function (snap, minPriority) {
    snap = snap || P.snap();
    const G = P.G;
    /* 换了一局（arcLog 是每局新建的数组）→ 记忆作废。用数组身份判断，比拼进签名更省 */
    if (_candLog !== G.arcLog) { _candLog = G.arcLog; _candKey = null; }
    const floor = fnum(minPriority, -Infinity);
    const sig = floor + "@" + candSig(snap);
    if (sig === _candKey) return _candVal;
    const out = [];
    const ids = Object.keys(P.reg.arc || {});
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i], def = P.reg.arc[id];
      if (!def || def.off) continue;
      /* 优先级地板：换线判断只关心"明显比我高的那几条"，先按优先级筛掉大部分，
         省掉它们的 gate / endWhen / 全幕判死 —— 300 局模拟里这是数量级差别。 */
      if (fnum(def.priority, 0) < floor) continue;
      if (playedBefore(id) || exclusiveBlocked(def)) continue;
      if (!P.when(def.gate, snap)) continue;
      if (def.endWhen && P.when(def.endWhen, snap)) continue;      // ① 生下来就完成
      if (allStagesDead(def, snap)) continue;                      // ② 一幕都推不动
      out.push({ id: id, def: def, priority: fnum(def.priority, 0) });
    }
    /* 优先级降序；同分保持注册顺序（= 文件里的书写顺序），所以结果是确定的 */
    out.sort(function (a, b) { return b.priority - a.priority; });
    _candKey = sig; _candVal = out;
    return out;
  };

  /* 签名完整性自检：逐字段改一个值，看签名会不会跟着变。忘了补字段 = 记忆返回过期结果，
   * 而且**不会报错**，只会表现为"某条线该开始时没开始"—— 所以让它在加载期就炸出来。 */
  (function () {
    const base = {
      era: "e0", year: 1, month: 1, age: 1, track: "t0", party: "p0", stance: "s0",
      origin: "o0", entry: "n0", talent: "l0", tier: 1, rep: 1, hp: 1, fun: 1,
      fav: 1, lev: 1, contactN: 1, scandal: 1, tenure: 1, flags: [], reason: "r0"
    };
    const b = candSig(base);
    for (const k in base) {
      if (k === "flags") continue;                     // 只拼长度，单独验
      const alt = Object.assign({}, base);
      alt[k] = (typeof base[k] === "number") ? base[k] + 7 : base[k] + "X";
      if (candSig(alt) === b) console.warn("[POTUS] arc.js：candSig 漏了快照字段 " + k + "，记忆会返回过期结果");
    }
    if (candSig(Object.assign({}, base, { flags: ["a"] })) === b) {
      console.warn("[POTUS] arc.js：candSig 没把 flags 长度算进去");
    }
  })();

  function start(id, snap) {
    const G = P.G, seq = P.monthSeq();
    /* played 数"真正演成了几幕"。为什么要它：一幕没演到也可以被窗口跳过，
     * 全跳完的线其实什么都没发生 —— 那叫淡出，不叫走完（见下面 ③ 的处理）。 */
    G.arc = { id: id, stage: 0, since: seq, since0: seq, played: 0, swLast: -1e9, status: STATUS.ACTIVE };
    if (!G.arcLog) G.arcLog = [];
    G.arcLog.push({ id: id, from: seq, to: null, status: STATUS.ACTIVE });
    _curKey = null; _candKey = null;
    const def = P.arcDef(id);
    if (def && def.onStart) P.applyEffects(def.onStart);
    P.pushLog("主线开始：" + ((def && def.name) || id));
    return G.arc;
  }

  /* 收束。status: done（走完）/ faded（超时淡出）/ dropped（被换掉） */
  function finish(status) {
    const G = P.G;
    if (!G.arc) return null;
    const def = P.arcDef(G.arc.id);
    G.arc.status = status;
    const log = G.arcLog || [];
    for (let i = log.length - 1; i >= 0; i--) {
      if (log[i].id === G.arc.id && log[i].to == null) {
        log[i].to = P.monthSeq(); log[i].status = status; break;
      }
    }
    _candKey = null;              // arcLog 的状态变了，候选记忆立刻作废（保险起见）
    if (status === STATUS.DONE && def && def.onEnd) P.applyEffects(def.onEnd);
    P.pushLog("主线" + (status === STATUS.DONE ? "走完" : status === STATUS.FADED ? "淡出" : "让位") +
      "：" + ((def && def.name) || G.arc.id));
    /* 走完 / 淡出之后要**空一段**再开下一条（balance.arc.cooldownMonths）。
     * 为什么需要：不空的话，线一走完当月的 tick 就会立刻接上一条，一辈子读起来
     * 像一份连续的主线清单，而不是"人生有过几段"。空窗期的那些月份由
     * 「静好岁月」（vignette）接管 —— 它本来就是干这个的。
     * "让位"（dropped）**不设空窗**：那是当场换成更贴身的那条，中间插一段空白反而怪。 */
    if (status !== STATUS.DROPPED) {
      const cd = fnum((P.balance().arc || {}).cooldownMonths, 18);
      G.arcCool = P.monthSeq() + cd;
    }
    _curKey = null;
    return G.arc;
  }

  /* 一条主线的最长寿命：显式 maxMonths，或者各幕窗口之和 + 一段宽限 */
  function lifespan(def) {
    if (def.maxMonths != null) return def.maxMonths;
    let s = 0;
    (def.stages || []).forEach(function (st) { s += fnum(st.maxMonths, 36) + fnum(st.minMonths, 0); });
    return Math.max(36, s + 24);
  }

  /* ---------- 每月推一次（挂在时间轴上，见 engine/time.js 的 advanceMonth）----------
   * 放在时间轴上而不是渲染时：300 局模拟才会真的走到这条路径，
   * "某条主线永远推不动""多条线互相打架"这类问题才能在模拟里被抓到。 */
  P.arcTick = function (month) {
    const G = P.G;
    if (!G) return;
    if (!G.arcLog) G.arcLog = [];
    if (P.reg.arc == null) return;
    const snap = P.snap();

    /* 今年（本月）有没有一条线已经结束 → 清掉 */
    if (G.arc && G.arc.status !== STATUS.ACTIVE) G.arc = null;

    if (G.arc) {
      const def = P.arcDef(G.arc.id);
      if (!def) { G.arc = null; }
      else {
        /* ① 收束条件先看：达成了就体面收场，不拖。
           **但要求这一幕线至少真演成过一幕**（played > 0）——
           否则会出现最要命的那种循环：一个已经 T4 的人进了一条 endWhen 是"升到 T4"的线，
           下个月 tick 立刻判定完成、收场、再开下一条，一个月换一条线。
           没演过任何一幕的线，只能靠"幕都过完了"或超时来结束，不能靠 endWhen。 */
        if (def.endWhen && G.arc.played > 0 && P.when(def.endWhen, snap)) { finish(STATUS.DONE); G.arc = null; }
        /* ② 超时：整条线活太久了，淡出（这只是"这条线没走完"，不是失败） */
        else if (P.monthSeq() - G.arc.since0 > lifespan(def)) { finish(STATUS.FADED); G.arc = null; }
        else {
          /* ③ 推幕：当前幕的事件已经演过（且是在本幕开始之后演的）→ 进下一幕；
             或者这一幕的窗口已经过了 → 跳过它，别让整条线卡在一幕上。
             用 while 是因为一次 tick 可能连跳几幕（模拟里月份是连续推进的）。 */
          let guard = 0;
          while (guard++ < 40) {
            const stages = def.stages || [];
            /* 幕都过完了：演成过至少一幕 → 走完；一幕都没演成 → 只是淡出。 */
            if (G.arc.stage >= stages.length) {
              finish(G.arc.played > 0 ? STATUS.DONE : STATUS.FADED); G.arc = null; break;
            }
            const step = stages[G.arc.stage];
            /* 【顺序很重要】**先问"演过没有"，再问"还有没有可能"。**
             * 反过来的话会踩一个很隐蔽的坑：一幕的事件刚刚被演掉，它如果是 unique，
             * 就立刻进入 doneIds、于是 deadForever 判它"已经演过 = 不可能再演" ——
             * 这一幕会被当成"死幕"跳掉，**played 不加**。结果整条线明明一步步演完了，
             * 却报 played=0，最后以"淡出"收场（实测：arc_ladder 0/72 走完、
             * arc_archive 0/52，就是被这一行顺序坑掉的）。
             * done 优先还带来一个好处：同一 tick 里"演过 + 连跳几幕"的语义更自然。 */
            const done = stepPlayed(step, G.arc.since);
            const elapsed = P.monthSeq() - G.arc.since;
            if (done) { G.arc.stage++; G.arc.since = P.monthSeq(); G.arc.played++; continue; }
            /* dead：没演过，而且候选全部这辈子不可能出现 → 跳过，不浪费窗口时间。
               注意 dead 的跳过**不算演成过**（played 不加）—— 这条线其实什么都没发生。 */
            if (stageDead(step, snap)) { G.arc.stage++; G.arc.since = P.monthSeq(); continue; }
            /* gap：这一幕的窗口已经用完 → 跳过，别让整条线卡死在一幕上。
               注意 st.maxMonths == null 表示"不设窗口"，此时只有 done 能推进。 */
            if (step.maxMonths != null && elapsed > step.maxMonths) {
              G.arc.stage++; G.arc.since = P.monthSeq(); continue;
            }
            break;
          }
          /* ④ 换线：跑够 switchAfterMonths 之后，若出现**明显更贴身**的候选，就让位。
             没有这条，"先撞上哪条线就一辈子哪条线"，身份变化不会带来新的故事。
             门槛见 canDisplace（要高一整个 switchMargin 档，且新线第一幕真推得动）。
             为了省算力：① 只扫优先级足够高的那几条（优先级地板）② 每 switchScanMonths
             个月才扫一次 —— 换线本来就不需要按月精确，晚几个月读到新章节完全没影响。 */
          if (G.arc) {
            const arcB = P.balance().arc || {};
            const sw = fnum(arcB.switchAfterMonths, 24);
            const elapsedArc = P.monthSeq() - G.arc.since0;
            if (elapsedArc >= sw) {
              const scan = fnum(arcB.switchScanMonths, 6);
              /* 扫描节流记在**这一条线自己身上**（G.arc.swLast），不能用模块级变量：
                 月序号在一局之内单调，但换一局会回到更小的值 —— 模块级变量会让新一局
                 头几十年都判定"还没到下一次扫描时间"，换线直接失效（踩过：换线率 0.53→0.01）。 */
              const last = fnum(G.arc.swLast, -1e9);
              if (P.monthSeq() - last >= scan) {
                G.arc.swLast = P.monthSeq();
                const margin = fnum(arcB.switchMargin, 12);
                const cands = P.arcCandidates(snap, fnum(def.priority, 0) + margin);
                for (let i = 0; i < cands.length; i++) {
                  if (cands[i].id === G.arc.id) continue;
                  if (canDisplace(cands[i].def, fnum(def.priority, 0), snap)) {
                    finish(STATUS.DROPPED); G.arc = null;
                  }
                  break;                       // 只跟"当前最强的那条"比，不比整张表
                }
              }
            }
          }
        }
      }
    }

    /* 没有活跃线 → 选一条。单线制下最多只有一条，但 maxActive 允许内容方放开。
     * 空窗期（G.arcCool）内不开新线 —— 那段时间交给「静好岁月」。
     * maxPerLife 是硬上限：一辈子走过多少条线是有数的，人不是清单。 */
    if (!G.arc || G.arc.status !== STATUS.ACTIVE) {
      const maxLife = fnum((P.balance().arc || {}).maxPerLife, 4);
      const cool = fnum(G.arcCool, 0);
      if (P.monthSeq() >= cool && (G.arcLog ? G.arcLog.length : 0) < maxLife) {
        const cands = P.arcCandidates(snap);
        if (cands.length) start(cands[0].id, snap);
      }
    }
    return G.arc;
  };

  /* ---------- 加权：主线给"自己的事件"加成（抽取热路径）----------
   * 只做两件事，且**分两档**（语义必须清楚，不然调不出平衡）：
   *   · weightMul（默认 2.5）—— "现在这一幕"：st.events 里的候选事件。强，因为这是主线的高潮点。
   *   · tagMul（默认 1.5）—— "这条线里的常客"：def.ids / def.cats / def.tags 命中的事件。弱，
   *     负责铺气氛（灰产线让灰产类都更容易出现），不负责推进剧情。
   * 反向压制（"这条线里不该出现的"）**不在这里做** —— 交给 identityBias / resourceBias 的表。
   * 主线只负责把自己推上来，这样"为什么这件事找上我"永远能追溯到一条明确的规则。 */
  P.arcBoost = function (ev, snap) {
    const cur = P.arcCurrent();
    if (!cur || !cur.def || !ev) return 1;
    const d = cur.def;
    const ids = stepEvents(cur.step);
    if (ids.length && ids.indexOf(ev.id) >= 0) return fnum(d.weightMul, 2.5);
    if (d.ids && d.ids.indexOf(ev.id) >= 0) return fnum(d.tagMul, 1.5);
    if (d.cats && ev.category && d.cats.indexOf(ev.category) >= 0) return fnum(d.tagMul, 1.5);
    if (d.tags && ev.tags) {
      const tg = [].concat(ev.tags);
      for (let i = 0; i < tg.length; i++) if (d.tags.indexOf(tg[i]) >= 0) return fnum(d.tagMul, 1.5);
    }
    return 1;
  };

  /* 这一幕在玩家眼里叫什么：优先幕自己的标题，其次候选里**当前时代能演的那一件**的标题。
   * （候选是跨时代的，所以取标题时必须挑"这个时代真的抽得到的那一件"，否则
   *  1960 年的局会显示 2008 年那件事件的名字。） */
  function stepTitle(step) {
    if (!step) return "";
    if (step.title) return step.title;
    const ids = stepEvents(step);
    const snap = P.snap();
    for (let i = 0; i < ids.length; i++) {
      const ev = P.evById(ids[i]);
      if (!ev) continue;
      if (snap && !P.eligible(ev, true, snap)) continue;   // 只看这个时代真抽得到的那一件
      return ev.title || ids[i];
    }
    /* 全部候选都和当前时代不合（理论上不该发生）：退回第一个候选的标题，至少不是空串 */
    const ev0 = ids.length ? P.evById(ids[0]) : null;
    return ev0 ? (ev0.title || ids[0]) : (ids[0] || "");
  }
  P.arcStepTitle = stepTitle;

  /* ---------- 给界面用 ---------- */
  /* 当前主线（单线制下就是那一条），没有就返回 null */
  P.arcPanel = function () {
    const cur = P.arcCurrent();
    if (!cur) return null;
    const stages = cur.def.stages || [];
    return {
      id: cur.id,
      name: cur.def.name || cur.id,
      lede: cur.def.lede || "",
      /* 面板上写的是"第 2/4 幕"，所以 stage 用人读的从 1 开始 */
      stage: cur.stage + 1,
      stageCount: stages.length,
      stageMonths: cur.stageMonths,
      months: cur.months,
      stepTitle: stepTitle(cur.step),
      /* 这一幕还差多少个月就作废（null = 不设窗口） */
      stepWindow: cur.step && cur.step.maxMonths != null ? cur.step.maxMonths : null,
      stepLeft: (cur.step && cur.step.maxMonths != null)
        ? Math.max(0, cur.step.maxMonths - cur.stageMonths) : null,
      /* 这条线已经真演成了几幕（0 = 目前还只是气氛） */
      played: (P.G.arc && P.G.arc.played) || 0,
      why: P.arcWhy()
    };
  };
  /* 这一局走过的主线（结局页 / 传记用） */
  P.arcHistory = function () {
    const G = P.G;
    if (!G || !G.arcLog) return [];
    return G.arcLog.map(function (x) {
      const d = P.arcDef(x.id) || {};
      return { id: x.id, name: d.name || x.id, status: x.status, from: x.from, to: x.to };
    });
  };
  /* 为什么是这条线：把 gate 里命中的身份维度翻译成人话（界面"风向"用） */
  P.arcWhy = function () {
    const cur = P.arcCurrent();
    if (!cur) return [];
    const out = [], g = cur.def.gate || {};
    const NAME = { tracks: "轨道", parties: "党派", stances: "姿态", origins: "出身", entries: "起点", talents: "天赋", tiers: "层级" };
    for (const k in NAME) {
      if (g[k] == null) continue;
      const v = [].concat(g[k])[0];
      const def = P.reg[{ tracks: "track", parties: "party", stances: "stance", origins: "origin", entries: "entry", talents: "talent", tiers: null }[k]];
      out.push(NAME[k] + "：" + (def && def[v] ? def[v].name : v));
    }
    if (g.minTier != null) out.push("层级 ≥ T" + g.minTier);
    if (g.minRep != null) out.push("声望 ≥ " + g.minRep);
    if (g.minLev != null) out.push("把柄 ≥ " + g.minLev);
    if (g.minFun != null) out.push("资金 ≥ " + g.minFun);
    if (g.flags) out.push("已有标记 " + [].concat(g.flags).join("/"));
    return out;
  };
})();
