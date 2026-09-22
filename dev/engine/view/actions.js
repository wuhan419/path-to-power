/* ============================================================================
 * POTUS ENGINE · view/actions.js
 * 资源投注面板（D&D 式加码）：投入资金/精力抬高胜算、花人情换重投取优。
 * 面板落在右栏 #actbody 顶部，与「操作在右栏」的三栏设计一致。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* ---------------- 资源投注面板（D&D 式加码） ---------------- */
  let _stake = null;

  P.choose = function (ev, ch) {
    if (P.stakeSpec(ch)) { P.openStake(ev, ch); return; }
    P.resolveChoice(ev, ch, null);
  };

  P.openStake = function (ev, ch) {
    _stake = { ev: ev, ch: ch, st: { fun: 0, fav: 0, ap: 0 } };
    const c = P.$("#choices"); if (c) c.style.display = "none";
    P.renderStake();
  };

  P.stakeStep = function (k, d) {
    if (!_stake) return;
    /* 上限由引擎统一算：既看加成上限（cap÷w），也看你手上还剩多少 */
    const max = P.stakeMax(k, _stake.ch);
    _stake.st[k] = P.clamp(_stake.st[k] + d, 0, max);
    P.renderStake();
  };
  P.stakeToggleFav = function () {
    if (!_stake) return;
    if (!_stake.st.fav && P.stakeMax("fav", _stake.ch) < 1) return;   // 没人情就点不动
    _stake.st.fav = _stake.st.fav ? 0 : 1;
    P.renderStake();
  };
  P.stakeCancel = function () {
    const box = P.$("#stake"); if (box) box.remove();
    const c = P.$("#choices"); if (c) c.style.display = "flex";
    _stake = null;
  };
  P.stakeConfirm = function () {
    const s = _stake; if (!s) return;
    const box = P.$("#stake"); if (box) box.remove();
    _stake = null;
    P.resolveChoice(s.ev, s.ch, s.st);
  };

  /* 面板上那句话：这个价是怎么来的。
     v0.7 汇率变成动态的（身位 × 事件钱量级），玩家必须看得见依据 ——
     否则"上次同样的选项是 $250k，这次怎么 $6k"就成了新的黑箱。 */
  P.stakeRateNote = function (choice, grade) {
    const d = (P.balance().stakeRates || {}).fun || {};
    const f = (P.stakeSpec(choice, grade) || {}).fun;
    if (!f || !f.__rate) return "";
    const r = f.__rate, per = f.per;
    const g = grade || (P.G && P.G.__curGrade) || "mid";
    if (r.source === "content") return "每档 " + P.fmtUsd(per) + " —— 这一注的价码由剧情写定。";
    const months = d.perSalaryMonths == null ? 3 : d.perSalaryMonths;
    const gm = (d.gradeMul || {})[g];
    const tierSide = "身位基准 " + P.fmtUsd(r.anchor) + "（月薪 " + P.fmtUsd(P.officeSalary()) + " × " + months + " 个月" +
      (gm != null && gm !== 1 ? " × 事件量级 " + gm : "") + "）";
    if (r.pot > 0) {
      const matterSide = "事情价码 " + P.fmtUsd(r.ceiling) + "（事件钱量级 " + P.fmtUsd(r.pot) + " 的 " +
        Math.round((d.potShare == null ? 0.25 : d.potShare) * 100) + "%）";
      return "每档 " + P.fmtUsd(per) + "：" + tierSide + "，" + matterSide +
        (r.source === "pot"
          ? " —— 事情比你的手笔小，价码按事情封顶（投满也花不到这件事的两倍）。"
          : " —— 取两者之间：位子越高越贵，但不会超过这件事本身值多少。");
    }
    return "每档 " + P.fmtUsd(per) + "：" + tierSide + "。这件事没写钱，只按身位算。";
  };

  P.renderStake = function () {
    const s = _stake; if (!s) return;
    const ch = s.ch, st = s.st;
    const spec = P.stakeSpec(ch, s.ev && s.ev.grade);
    const prev = P.$("#stake"); if (prev) prev.remove();
    const rows = [];
    if (spec.fun) {
      const per = Math.max(1, spec.fun.per || 0);
      const mx = P.stakeMax("fun", ch), atMax = st.fun >= mx;
      const note = mx === 0
        ? "资金不足：每档需 " + P.fmtUsd(per) + "，你现在只有 " + P.fmtUsd(P.G.fun)
        : (atMax
          ? "已经加到这项的上限了"
          : "每档 " + P.fmtUsd(per) + "，投得越多把握越大（最多 " + mx + " 档，余额 " + P.fmtUsd(P.G.fun) + "）");
      rows.push('<div class="stake-row' + (mx === 0 ? " off" : "") + '"><b>资金</b>' +
        '<button class="btn" id="stFunMinus"' + (st.fun <= 0 ? " disabled" : "") + '>−</button>' +
        '<span class="stake-val">' + P.fmtUsd(st.fun * per) + "</span>" +
        '<button class="btn" id="stFunPlus"' + (atMax ? " disabled" : "") + '>＋</button>' +
        '<span class="stake-note">' + note + "</span></div>");
    }
    if (spec.ap) {
      const mx = P.stakeMax("ap", ch), atMax = st.ap >= mx;
      const note = mx === 0
        ? "精力已经见底，投不动了"
        : (atMax
          ? "精力已经加到顶了"
          : "每点精力都能再添一把（还可投 " + (mx - st.ap) + " 点，精力 " + P.G.ap + "）");
      rows.push('<div class="stake-row' + (mx === 0 ? " off" : "") + '"><b>精力</b>' +
        '<button class="btn" id="stApMinus"' + (st.ap <= 0 ? " disabled" : "") + '>−</button>' +
        '<span class="stake-val">' + st.ap + "</span>" +
        '<button class="btn" id="stApPlus"' + (atMax ? " disabled" : "") + '>＋</button>' +
        '<span class="stake-note">' + note + "</span></div>");
    }
    if (spec.fav) {
      const canFav = P.stakeMax("fav", ch) >= 1;
      rows.push('<div class="stake-row' + (canFav ? "" : " off") + '"><b>人情</b><label class="stake-check"><input type="checkbox" id="stFav" ' +
        (st.fav ? "checked" : "") + (canFav ? "" : " disabled") + "> 花 1 点，获得<b>重投（取优）</b></label>" +
        '<span class="stake-note">' + (canFav ? "（人情 " + P.G.fav + "）" : "没有人情可以动用") + "</span></div>");
    }
    const rateNote = P.stakeRateNote(ch, s.ev && s.ev.grade);
    const box = document.createElement("div");
    box.className = "stake"; box.id = "stake";
    box.innerHTML = "<h3>投入资源，搏更大把握</h3>" +
      '<div class="stake-note" style="margin:-4px 0 6px;font-size:11.5px;color:var(--muted)">加码只是让这一票更稳，不改变事情本身的回报 —— 量力而行。</div>' + rows.join("") +
      (rateNote ? '<div class="stake-rate">' + rateNote + "</div>" : "") +
      '<div class="stake-actions"><button class="btn primary" id="stGo">确认判定</button>' +
      '<button class="btn" id="stBack">返回</button></div>';
    /* v0.5.x 修正：判定栏（投注面板）归入右栏（#actbar）顶部，与「操作在右栏」的三栏设计一致，
       也满足「判定栏在提示栏（选项胜算）之上」——而不是错误地塞进中栏、落在背景卡下面 */
    const _bar = document.getElementById("actbody");
    if (_bar) _bar.insertBefore(box, _bar.firstChild); else P.$("#main").appendChild(box);
    const wire = function (id, fn) { const el = P.$("#" + id); if (el) el.onclick = fn; };
    wire("stFunPlus", function () { P.stakeStep("fun", 1); });
    wire("stFunMinus", function () { P.stakeStep("fun", -1); });
    wire("stApPlus", function () { P.stakeStep("ap", 1); });
    wire("stApMinus", function () { P.stakeStep("ap", -1); });
    wire("stGo", P.stakeConfirm);
    wire("stBack", P.stakeCancel);
    const fav = P.$("#stFav"); if (fav) fav.onchange = P.stakeToggleFav;
  };
})();
