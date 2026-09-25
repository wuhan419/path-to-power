/* ============================================================================
 * POTUS ENGINE · campaign.js
 * 「竞选」—— 每一次民选晋升都不是一锤子买卖，而是一连串事件。
 *
 * 和主线（arc.js）的分工（别混用）：
 *   · 主线 arc   管"这个人活在哪个故事里"——只加权、不硬塞、可换线、可淡出。
 *   · 竞选 campaign 管"这一次选举怎么打下来"——**一幕一幕强制推进**，
 *     当前幕的事件近乎必出，未到的幕事件谁也抽不到，中途崩盘即告失败。
 *   两者相反不是巧合：主线讲"境遇"，竞选讲"流程"。流程就该有起点、有节点、有投票日。
 *
 * 三条设计决定（都是刻意的）：
 *   1) 【一幕不落】竞选不像主线可以跳幕。某一幕在窗口内始终没能演出来 = 整场竞选崩盘
 *      （LOST），而不是"略过继续"。一场真实的竞选不会因为错过一场辩论就白给你提名。
 *   2) 【只到投票日给位子】tier 只在**最后一幕**（复用现有 prog_*）授予；前面的宣战/
 *      初选/筹款/辩论幕只改选情表与涨跌士气，绝不提前把人挪上台阶。
 *      末幕的胜率也不是写死的赌骰：它由**选情**推出（见 P.ballotBase），
 *      钱买不到选票，只能在前几幕买来声势。
 *   3) 【选情是活的】campaign 带一张小选情表（momentum / warchest）。momentum 开局
 *      按人物身位、声望、基本盘、派系好感播种（P.seedMomentum，刻意低于旧写死的 45），
 *      平静月缓慢流失、每幕按结果增减；**只有 momentum 跌破 abortBelow 才判崩盘**，
 *      金库见底只是"大钱手段不可用"，绝不判负（#35：钱退出胜负手）。
 *
 * 竞选不新写"授级"逻辑，末幕直接复用 content/events/60-progression.js 的 prog_*；
 * 内容在 content/61-campaigns.js，幕事件在 content/events/65-campaign-acts.js。
 * 字段契约见 docs/CONTENT-SCHEMA.md 的"campaign"节。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  const STATUS = { ACTIVE: "active", WON: "won", LOST: "lost", DROPPED: "dropped" };
  P.CAMPAIGN_STATUS = STATUS;

  function fnum(v, d) { return (typeof v === "number" && isFinite(v)) ? v : d; }
  function cbal() { return P.balance().campaign || {}; }

  P.campaignDef = function (id) { return id ? (P.reg.campaign[id] || null) : null; };

  /* ---------- #35① 选情开局播种 ----------
   * 旧口径：每条竞选链的 def.meters.momentum 一律写死 45 —— 一个刚替人跑腿的志愿者
   * 第一场比赛就"选情过半"，投票日那 0.5 的胜率是白送的。
   * 新口径：选情由这个人的**身位 + 声望 + 基本盘 + 派系好感**推出来，起手 12—35，
   * 差额必须一幕一幕自己去挣。系数全在 balance.campaign.seed 里，内容侧可标定。 */
  P.seedMomentum = function () {
    const G = P.G;
    if (!G) return 12;
    const s = Object.assign({ floor: 12, ceil: 35, perTier: 2, perRep: 0.4, perShare: 15, perFac: 0.1 }, cbal().seed || {});
    const share = P.baseShare ? P.baseShare() : 0;
    let sum = 0, n = 0;
    const fac = G.faction || {};
    for (const k in fac) { sum += Number(fac[k]) || 0; n++; }
    const raw = 10 + (G.tier || 0) * s.perTier + (G.rep || 0) * s.perRep +
      share * s.perShare + (n ? sum / n : 0) * s.perFac;
    return Math.round(P.clamp(raw, s.floor, s.ceil));
  };

  /* ---------- #35③ 投票日 = 选情的函数 ----------
   * 末幕 prog_* 的参选选项在内容里标 `ballot: true`：它的 base 不再当写死的赌骰用，
   * 而是按当前竞选的 momentum 现推 —— 默认 momentum 20→0.26 / 50→0.50 / 80→0.74，
   * 夹在 [0.10, 0.85]。派系/魅力/基本盘仍走各选项自己的 mods，超额身位也仍在 mods 里，
   * 于是"钱"在投票日这一掷上彻底没有位置（它能买的只有前几幕的声势）。
   * 没有活跃竞选时（校验器/诊断直接掷 prog_* 卡）回落到内容声明的 base。 */
  P.ballotBase = function (declared) {
    const b = Object.assign({ floor: 0.10, ceil: 0.85, perMomentum: 0.008 }, cbal().ballot || {});
    const cur = P.campaignCurrent();
    if (!cur || !cur.meters) return declared;
    return P.clamp(b.floor + (Number(cur.meters.momentum) || 0) * b.perMomentum, b.floor, b.ceil);
  };

  /* ---------- 当前竞选 ----------
   * 便宜到可以对池子里每个事件调一次（锁定判断走热路径），带一层按月的小记忆。 */
  let _curKey = null, _curVal = null;
  P.campaignCurrent = function () {
    const G = P.G;
    if (!G || !G.campaign || G.campaign.status !== STATUS.ACTIVE) return null;
    const def = P.campaignDef(G.campaign.id);
    if (!def) return null;
    const stages = def.stages || [];
    const key = G.campaign.id + "|" + G.campaign.stageIdx + "|" + G.campaign.since + "|" + P.monthSeq();
    if (key === _curKey) return _curVal;
    _curKey = key;
    _curVal = {
      id: G.campaign.id, def: def,
      stageIdx: G.campaign.stageIdx, stageCount: stages.length,
      step: stages[G.campaign.stageIdx] || null,
      stageMonths: P.monthSeq() - (G.campaign.since == null ? P.monthSeq() : G.campaign.since),
      months: P.monthSeq() - (G.campaign.since0 == null ? P.monthSeq() : G.campaign.since0),
      meters: G.campaign.meters || {}
    };
    return _curVal;
  };

  /* 这一幕演过没有：本幕开始（G.campaign.since）之后，它的末幕/代表事件被演到过。 */
  function stepPlayed(step, since) {
    if (!step || !step.event) return false;
    const at = P.G.doneSeq && P.G.doneSeq[step.event];
    return at != null && at >= since;
  }

  /* ---------- 所有竞选的幕事件 id 总表（懒建 + 按事件数失效）----------
   * 用于两件事：① 把这些事件从"自由抽取"里永久锁定（只能作为当前幕被强制演出）；
   *            ② 让界面/校验知道哪些事件属于竞选流程而非普通卡池。 */
  let _actSet = null, _actN = -1, _actEvN = -1;
  function actIds() {
    const n = Object.keys(P.reg.campaign || {}).length;
    if (_actSet && _actN === n && _actEvN === P.events.length) return _actSet;
    _actSet = {}; _actN = n; _actEvN = P.events.length;
    const camps = P.reg.campaign || {};
    for (const cid in camps) {
      const stages = (camps[cid] || {}).stages || [];
      for (let i = 0; i < stages.length; i++) if (stages[i].event) _actSet[stages[i].event] = cid;
    }
    return _actSet;
  }
  P.isCampaignActEvent = function (id) { return actIds()[id] != null; };

  /* 这个事件此刻是否被竞选锁定（= 不作为当前幕就不许被随机抽到）。
   * 供 events.js 的 eligible 调用。非竞选事件一律 false（放行）。 */
  P.campaignLockedOut = function (ev) {
    if (!ev) return false;
    const cid = actIds()[ev.id];
    if (cid == null) return false;                 // 不是竞选事件
    const cur = P.campaignCurrent();
    if (cur && cur.id === cid && cur.step && cur.step.event === ev.id) return false; // 正是当前幕
    return true;                                    // 是竞选事件但还没轮到 —— 挡住
  };

  /* ---------- 强制当前幕 ----------
   * 供 time.js 的 planMonth 调用：返回一个 eventId 档期，让当前幕这一月必出。
   * 平静月也返回（保证窗口内一定演得出这一幕，绝不错过）；无活跃竞选返回 null。 */
  P.campaignForceSlot = function () {
    const cur = P.campaignCurrent();
    if (!cur || !cur.step || !cur.step.event) return null;
    const ev = P.evById(cur.step.event);
    return {
      eventId: cur.step.event,
      grade: cur.step.grade || P.gradeOf(ev) || (cur.stageIdx === cur.stageCount - 1 ? "major" : "mid"),
      campaign: true
    };
  };

  /* ---------- 结束 ---------- */
  function end(status, note) {
    const G = P.G;
    if (!G.campaign) return null;
    const def = P.campaignDef(G.campaign.id);
    G.campaign.status = status;
    const log = G.campaignLog || [];
    for (let i = log.length - 1; i >= 0; i--) {
      if (log[i].id === G.campaign.id && log[i].to == null) {
        log[i].to = P.monthSeq(); log[i].status = status; break;
      }
    }
    if (status === STATUS.WON && def && def.onWin) P.applyEffects(def.onWin);
    if (status === STATUS.LOST && def && def.onFail) P.applyEffects(def.onFail);
    if (note) P.pushLog(note);
    // 败选后设一段冷却，免得当月就重开同一场（重开要靠下次候选匹配）
    if (status === STATUS.LOST) G.campaignCool = P.monthSeq() + fnum(cbal().retryCooldown, 18);
    _curKey = null; _candKey = null;
    return G.campaign;
  }

  /* ---------- 候选：找到当前该打的那一场 ----------
   * gate 命中 + 本局没打过（可重试的除外）+ 目标级正好是"再往上一级"。
   * 单线制：一局同一时刻只有一场活跃竞选；候选按目标级降序取最高一场。 */
  let _candKey = null, _candVal = null;
  function playedBefore(id) {
    const log = P.G.campaignLog || [];
    const def = P.campaignDef(id);
    for (let i = 0; i < log.length; i++) {
      if (log[i].id !== id) continue;
      if (def && def.retryable && log[i].status === STATUS.LOST) continue; // 败过还能再战
      return true;
    }
    return false;
  }
  P.campaignCandidates = function (snap) {
    snap = snap || P.snap();
    const G = P.G;
    if (_candLog !== G.campaignLog) { _candLog = G.campaignLog; _candKey = null; }
    const sig = snap.tier + "|" + snap.tenure + "|" + snap.track + "|" + P.monthSeq() + "|" +
      (G.campaignLog ? G.campaignLog.length : 0) + "|" + (G.doneIds ? G.doneIds.length : 0);
    if (sig === _candKey) return _candVal;
    const out = [];
    const camps = P.reg.campaign || {};
    for (const id in camps) {
      const def = camps[id];
      if (!def || def.off) continue;
      if (playedBefore(id)) continue;
      if (!P.when(def.gate, snap)) continue;
      // 目标级：竞选末幕要抵达的那一级 = 当前级 + 1（不做跨级竞选）
      const target = fnum(def.tier, (snap.tier || 0) + 1);
      if (target !== (snap.tier || 0) + 1) continue;
      out.push({ id: id, def: def, tier: target });
    }
    out.sort(function (a, b) { return b.tier - a.tier; });
    _candKey = sig; _candVal = out;
    return out;
  };
  let _candLog = null;

  function start(id) {
    const G = P.G, seq = P.monthSeq(), def = P.campaignDef(id);
    const meters = {};
    const src = (def && def.meters) || {};
    for (const k in src) meters[k] = src[k];
    /* momentum 一律由人物状态播种；def.meters.momentum 降级为**这一场的起步天花板**
       （想压低某场竞选的开局声势，改小它即可，不再是初值）。 */
    const ceil = fnum(src.momentum, 1e9);
    meters.momentum = Math.min(ceil, P.seedMomentum());
    G.campaign = { id: id, stageIdx: 0, since: seq, since0: seq, played: 0, meters: meters, status: STATUS.ACTIVE };
    if (!G.campaignLog) G.campaignLog = [];
    G.campaignLog.push({ id: id, from: seq, to: null, status: STATUS.ACTIVE });
    _curKey = null; _candKey = null;
    if (def && def.onStart) P.applyEffects(def.onStart);
    P.pushLog(P.t("ui.campaign.start", "竞选开打：{office} —— 你把自己的名字放上了选票。", { office: ((def && def.office) || id) }));
    return G.campaign;
  }

  /* ---------- 每月推一次（挂在时间轴上，见 engine/time.js 的 advanceMonth）---------- */
  P.campaignTick = function (month) {
    const G = P.G;
    if (!G) return;
    if (!G.campaignLog) G.campaignLog = [];
    if (P.reg.campaign == null || !Object.keys(P.reg.campaign).length) return;
    const snap = P.snap();
    const b = cbal();

    if (G.campaign && G.campaign.status !== STATUS.ACTIVE) G.campaign = null;

    if (G.campaign) {
      const def = P.campaignDef(G.campaign.id);
      if (!def) { G.campaign = null; }
      else {
        const stages = def.stages || [];
        /* 已经爬到/越过目标级（破格跳级等）→ 这场竞选失去意义，体面收掉，不占位。 */
        if (G.tier >= fnum(def.tier, 1e9)) { end(STATUS.DROPPED); G.campaign = null; }
        else {
          /* 选情自然流失（平静月也在掉）：注意力、金钱、士气不续费就往下走。 */
          const drift = fnum(b.meterDrift, 0.8);
          const mtr = G.campaign.meters || {};
          for (const k in mtr) mtr[k] = Math.max(0, mtr[k] - drift);
          /* 幕间闸门：任一表跌破当前幕或全局的 abortBelow → 当场败选。 */
          if (checkAbort(def, stages[G.campaign.stageIdx], mtr, b)) {
            end(STATUS.LOST, P.t("ui.campaign.abortLost", "选情崩了：{office} 竞选就此夭折。", { office: ((def && def.office) || G.campaign.id) }));
            G.campaign = null;
          } else {
            /* 推幕：当前幕已演出 → 结算该幕选情增减 → 进下一幕（可连跳）。 */
            let guard = 0;
            while (guard++ < 40) {
              if (G.campaign.stageIdx >= stages.length) {
                // 链走完 = 投票日已演。真正的胜负看 tier 是否抵达目标级（末幕掷骰可能落败）。
                if (G.tier >= fnum(def.tier, 1e9)) {
                  end(STATUS.WON, P.t("ui.campaign.won", "你赢下了这场选举：{office}。", { office: ((def && def.office) || def.name || G.campaign.id) }));
                } else {
                  end(STATUS.LOST, P.t("ui.campaign.ballotLost", "票开箱了，但你没能拿下：{office} 落败。", { office: ((def && def.office) || G.campaign.id) }));
                }
                G.campaign = null; break;
              }
              const step = stages[G.campaign.stageIdx];
              const elapsed = P.monthSeq() - G.campaign.since;
              if (stepPlayed(step, G.campaign.since)) {
                // 该幕的选情增减（metersDelta）与"演完就进下一幕"
                const delta = step.metersDelta || {};
                for (const k in delta) mtr[k] = fnum(mtr[k], 0) + delta[k];
                G.campaign.stageIdx++; G.campaign.since = P.monthSeq(); G.campaign.played++;
                // 进入新幕先过一次 abort（防止 delta 反而把自己推进了败局）
                if (checkAbort(def, stages[G.campaign.stageIdx], mtr, b)) {
                  end(STATUS.LOST, P.t("ui.campaign.abortLost", "选情崩了：{office} 竞选就此夭折。", { office: ((def && def.office) || G.campaign.id) }));
                  G.campaign = null; break;
                }
                continue;
              }
              // 窗口内始终没演出来 = 竞选不能干等 —— 直接崩盘（区别于主线的"跳幕"）。
              if (step.maxMonths != null && elapsed > step.maxMonths) {
                end(STATUS.LOST, P.t("ui.campaign.paceLost", "竞选节奏拖垮了你：{office} 无功而返。", { office: ((def && def.office) || G.campaign.id) }));
                G.campaign = null; break;
              }
              break;
            }
          }
        }
      }
    }

    /* 没有活跃竞选 → 到点自动开打下一场（有冷却期，败选后隔一段才允许卷土重来）。 */
    if (!G.campaign) {
      const cool = fnum(G.campaignCool, 0);
      if (P.monthSeq() >= cool) {
        const cands = P.campaignCandidates(snap);
        if (cands.length) start(cands[0].id);
      }
    }
    return G.campaign;
  };

  /* 任一选情表跌破门槛即为败局。看两道闸：全局 abortBelow + 当前幕自己的 abortBelow。 */
  function checkAbort(def, step, mtr, b) {
    if (!mtr) return false;
    const gates = [def.abortBelow, (step && step.abortBelow), b.abortBelow];
    for (let gi = 0; gi < gates.length; gi++) {
      const g = gates[gi];
      if (!g) continue;
      for (const k in g) { if (fnum(mtr[k], 0) < g[k]) return true; }
    }
    return false;
  }

  /* ---------- 选情效果键 ----------
   * 供幕事件在 outcomes.effects 里写：{ camp: { momentum: 8, warchest: -5 } }。
   * 把事件成败的swing 落到当前竞选的选情表上（下限 0，无硬上限）。
   * abortBelow 闸（在 campaignTick 里）据此判崩盘 —— 于是“某一幕搞砸了”真的会断送整场竞选。
   * 没有活跃竞选时静默忽略（该事件被当普通卡抽到时不至于报错）。 */
  P.effect("camp", function (v, G) {
    if (!v || !G.campaign || G.campaign.status !== STATUS.ACTIVE) return;
    if (!G.campaign.meters) G.campaign.meters = {};
    const m = G.campaign.meters;
    for (const k in v) m[k] = Math.max(0, fnum(m[k], 0) + fnum(v[k], 0));
  });

  /* ---------- #23 投放把柄：竞选面板上那条当场花掉 lev 的黑料行动 ----------
   * 把柄（lev）过去只有一条被动去路（被反噬、过期），这里给它一条主动去路：
   * 把手里的料喂给记者，换这一幕的选情。双靶两本账——
   *   primary（初选/提名幕，打党内同僚）：掷一次「对手退赛」，概率随累计投放次数与 CUN 上升；
   *     退赛 = momentum 一笔到位，没退也多少捡到声量。
   *   general（大选幕，打对手阵营）：momentum 增益更稳，但要过一次 INTG 检定 ——
   *     不择手段会被翻出来：rep 掉、插 dirty_trick 旗、往 wrath_oppo 攒恨（喂 140-reckoning 清算管线）。
   * 一次 1 点把柄、每幕限一次；效果全部走既有键（camp / rep / flags / count），不新增数值系统。 */
  function dropCfg() {
    return Object.assign({
      cost: 1, primaryWin: 15, primaryFail: 4, generalWin: 9, generalBack: 3,
      generalExpose: 0.45, exposePerIntg: 0.5, dropoutPerCun: 0.25, dropoutPerDrop: 0.10,
      repBack: -1.2, wrathBack: 12
    }, cbal().levDrop || {});
  }

  /* 按钮的可用性 + 提示语（界面与校验共用同一个口径，免得 UI 与引擎各判一次） */
  P.levDropInfo = function () {
    const G = P.G, cur = P.campaignCurrent(), b = dropCfg();
    const no = function (key, dflt) { return { can: false, why: P.t(key, dflt), cfg: b }; };
    if (!cur || !cur.step) return no("ui.campaign.dropNone", "没有进行中的竞选");
    const kind = cur.step.drop;
    if (!kind) return no("ui.campaign.dropNoStage", "这一幕没有可投放的对象");
    if ((G.lev || 0) < b.cost) return no("ui.campaign.dropNoLev", "手上没有把柄");
    if (G.campaign.dropStage && G.campaign.dropStage[cur.stageIdx]) return no("ui.campaign.dropUsed", "这一幕已经投放过一次了");
    const attr = G.attr || {};
    const primary = kind === "primary";
    const p = primary
      ? P.clamp(0.15 + (G.campaign.dropN || 0) * b.dropoutPerDrop + ((attr.CUN || 50) - 50) / 100 * b.dropoutPerCun, 0.05, 0.6)
      : P.clamp(b.generalExpose - ((attr.INTG || 50) - 50) / 100 * b.exposePerIntg, 0.05, 0.8);
    return {
      can: true, kind: kind, cost: b.cost, stageIdx: cur.stageIdx, cfg: b,
      gain: primary ? b.primaryWin : b.generalWin, p: p,
      label: primary
        ? P.t("ui.campaign.dropPrimary", "投放把柄：做实对手的黑料（对手退赛 {p}%）", { p: Math.round(p * 100) })
        : P.t("ui.campaign.dropGeneral", "投放把柄：把料喂给记者（选情 +{g} · 反噬 {p}%）", { g: b.generalWin, p: Math.round(p * 100) })
    };
  };

  /* 真的放出去一次：扣把柄 → 记幕 → 结算选情与反噬。返回结果供界面提示，不可用时返回 null。 */
  P.levDrop = function () {
    const G = P.G, cur = P.campaignCurrent(), info = P.levDropInfo();
    if (!cur || !info.can) return null;
    const b = info.cfg;
    G.lev = Math.max(0, (G.lev || 0) - b.cost);
    G.campaign.dropStage = G.campaign.dropStage || {};
    G.campaign.dropStage[info.stageIdx] = true;
    G.campaign.dropN = (G.campaign.dropN || 0) + 1;
    const mtrBefore = Math.round(fnum(cur.meters.momentum, 0));
    let out;
    if (info.kind === "primary") {
      const win = P.rint(1, 100) <= Math.round(info.p * 100);
      P.applyEffects({ camp: { momentum: win ? b.primaryWin : b.primaryFail } });
      out = { hit: win, momentum: win ? b.primaryWin : b.primaryFail };
      P.pushLog(win
        ? P.t("ui.campaign.dropWinLog", "你放出的那条料在初选阵营里炸开：对手的竞选经理当晚辞职，隔天他也宣布退选。")
        : P.t("ui.campaign.dropFailLog", "料放出去了，水花不大——对手骂了一句「绝望的招数」，然后继续募款。"));
    } else {
      const back = P.rint(1, 100) <= Math.round(info.p * 100);
      const gain = back ? b.generalBack : b.generalWin;
      const eff = { camp: { momentum: gain } };
      if (back) { eff.rep = b.repBack; eff.flags = ["dirty_trick"]; eff.count = { wrath_oppo: b.wrathBack }; }
      P.applyEffects(eff);
      out = { hit: !back, momentum: gain, back: back };
      P.pushLog(back
        ? P.t("ui.campaign.dropBackLog", "黑料是见了报，可线头一路查到了你的竞选办。第二天头版换了标题：「{who} 竞选办的脏活」。", { who: G.name || cur.def.office || "" })
        : P.t("ui.campaign.dropGeneralLog", "料上了版面，对手连着三天在自辩。你的选情趁这几天悄悄爬了上去。"));
    }
    out.from = mtrBefore;      /* 结算前的选情读数，供界面显示涨跌 */
    return out;
  };

  /* ---------- 给界面用 ---------- */
  P.campaignPanel = function () {
    const cur = P.campaignCurrent();
    if (!cur) return null;
    const stages = cur.def.stages || [];
    const meters = [];
    const mt = P.G.campaign.meters || {};
    const names = (P.balance().campaign && P.balance().campaign.meterNames) || {};
    for (const k in mt) meters.push({ key: k, name: names[k] || k, value: Math.round(mt[k]) });
    return {
      id: cur.id,
      office: cur.def.office || cur.id,
      lede: cur.def.lede || "",
      stage: cur.stageIdx + 1,
      stageCount: stages.length,
      stageTitle: cur.step ? (cur.step.title || (P.evById(cur.step.event) || {}).title || "") : "",
      stepLeft: (cur.step && cur.step.maxMonths != null) ? Math.max(0, cur.step.maxMonths - cur.stageMonths) : null,
      months: cur.months,
      meters: meters
    };
  };
  /* 这一局打过的竞选（结局页 / 传记用） */
  P.campaignHistory = function () {
    const G = P.G;
    if (!G || !G.campaignLog) return [];
    return G.campaignLog.map(function (x) {
      const d = P.campaignDef(x.id) || {};
      return { id: x.id, office: d.office || x.id, status: x.status, from: x.from, to: x.to };
    });
  };
})();
