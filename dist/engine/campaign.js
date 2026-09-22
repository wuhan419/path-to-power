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
 *   3) 【选情是活的】campaign 带一张小选情表（momentum / warchest），平静月缓慢流失、
 *      每幕按结果增减；任一表跌破 abortBelow 门槛即当场败选。
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
    G.campaign = { id: id, stageIdx: 0, since: seq, since0: seq, played: 0, meters: meters, status: STATUS.ACTIVE };
    if (!G.campaignLog) G.campaignLog = [];
    G.campaignLog.push({ id: id, from: seq, to: null, status: STATUS.ACTIVE });
    _curKey = null; _candKey = null;
    if (def && def.onStart) P.applyEffects(def.onStart);
    P.pushLog("竞选开打：" + ((def && def.office) || id) + " —— 你把自己的名字放上了选票。");
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
            end(STATUS.LOST, "选情崩了：" + ((def && def.office) || G.campaign.id) + " 竞选就此夭折。");
            G.campaign = null;
          } else {
            /* 推幕：当前幕已演出 → 结算该幕选情增减 → 进下一幕（可连跳）。 */
            let guard = 0;
            while (guard++ < 40) {
              if (G.campaign.stageIdx >= stages.length) {
                // 链走完 = 投票日已演。真正的胜负看 tier 是否抵达目标级（末幕掷骰可能落败）。
                if (G.tier >= fnum(def.tier, 1e9)) {
                  end(STATUS.WON, "你赢下了这场选举：" + ((def && def.office) || def.name || G.campaign.id) + "。");
                } else {
                  end(STATUS.LOST, "票开箱了，但你没能拿下：" + ((def && def.office) || G.campaign.id) + " 落败。");
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
                  end(STATUS.LOST, "选情崩了：" + ((def && def.office) || G.campaign.id) + " 竞选就此夭折。");
                  G.campaign = null; break;
                }
                continue;
              }
              // 窗口内始终没演出来 = 竞选不能干等 —— 直接崩盘（区别于主线的"跳幕"）。
              if (step.maxMonths != null && elapsed > step.maxMonths) {
                end(STATUS.LOST, "竞选节奏拖垮了你：" + ((def && def.office) || G.campaign.id) + " 无功而返。");
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
