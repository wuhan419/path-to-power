/* ============================================================================
 * POTUS ENGINE · view/stage.js
 * 主循环与中/右栏呈现：年 → 月 → 档期；背景卡、月历卡、平静月、事件出题、
 * 选项代价与保底、收益结算、掷骰结算、下野、年终结算。
 * 本区内私有辅助（reqBlock/costBlock/payCost/resText、pickTale、gainBoxHTML、
 * actClear/actAppend/actInsert/mainInsert 等）只在文件内部使用，不外泄。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* ---------------- 背景卡（折叠 / 展开） ---------------- */
  /* 主角视角的认知边界：他确知什么、他听到什么（真假不明）、他不可能知道什么。
     第三块是留给"懂历史的玩家"的钩子——知道那里有信息差，才能做出更有利的选择。 */
  P.briefCollapsed = function () {
    try { return localStorage.getItem("potus_brief_collapsed") === "1"; } catch (e) { return false; }
  };
  P.toggleBrief = function () {
    const el = P.$("#brief"); if (!el) return;
    const now = el.classList.toggle("collapsed");
    try { localStorage.setItem("potus_brief_collapsed", now ? "1" : "0"); } catch (e) { }
  };
  P.briefHTML = function (ev) {
    const b = ev.brief;
    if (!b) return "";
    const sec = function (cls, title, arr) {
      if (!arr || !arr.length) return "";
      return '<div class="brief-sec ' + cls + '"><h4>' + title + "</h4><ul>" +
        arr.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div>";
    };
    const terms = (b.terms && b.terms.length)
      ? '<div class="brief-sec terms"><h4>名词</h4>' + b.terms.map(function (t) {
        return '<div class="term"><b>' + t.k + "</b>" + t.v + "</div>";
      }).join("") + "</div>"
      : "";
    return '<div class="brief' + (P.briefCollapsed() ? " collapsed" : "") + '" id="brief">' +
      '<button class="brief-head" onclick="POTUS.toggleBrief()">' +
      '<span class="caret"></span><span class="brief-title">背景 · 你此刻知道多少</span>' +
      (b.lede ? '<span class="brief-lede">' + b.lede + "</span>" : "") + "</button>" +
      '<div class="brief-body">' +
      sec("known", "你确知的", b.known) +
      sec("rumor", "你听到的 · 真假不明", b.rumor) +
      sec("unknown", "你尚不知道的", b.unknown) +
      terms + "</div></div>";
  };

  /* ---------------- 主循环：年 → 月 → 档期 ----------------
   * 一个月 = 一个回合。一个「档期」= 一次需要玩家决策的事件。
   * 平静的月份不进 monthPlan，只在月历卡上留一行「平静」。
   * 本月的档期有几个、每个是什么量级（大/中/小），由 engine/time.js 按时代压力抽定。
   * 于是「一年只有几个事件」变成了「一整条月历」，而大事件会往压力高的年份聚。 */

  /* ---------------- 年终随笔：把这一年写成三段人话 ----------------
   * 数字让存档去记。这里回答三个问题：这一年你做了什么、你得到/失去了什么、你现在站在哪。
   * 句子来自 content/13-year-tales.js（reg.yeartale），引擎按条件挑、按顺序拼。 */
  function pickTale(kind, ctx) {
    const tales = P.reg.yeartale || {};
    const cands = [];
    for (const id in tales) {
      const t = tales[id];
      if (t.kind !== kind) continue;
      if (t.when && !P.when(t.when, ctx)) continue;
      cands.push(t);
    }
    if (!cands.length) return "";
    const t = P.pick(cands);
    const s = (t.texts && t.texts.length) ? P.pick(t.texts) : t.text;
    if (!s) return "";
    return s.replace(/\{name\}/g, P.G.name)
      .replace(/\{year\}/g, P.G.year)
      .replace(/\{age\}/g, P.G.age)
      .replace(/\{state\}/g, P.stateName(P.G.state) || "你的州")
      .replace(/\{dRep\}/g, ctx.dRep).replace(/\{dFun\}/g, ctx.dFunTxt)
      .replace(/\{dHp\}/g, ctx.dHp).replace(/\{tier\}/g, P.tierName(P.G.tier));
  }
  P.yearNarrative = function () {
    const G = P.G;
    const snap0 = G.yearStartSnap || { rep: G.rep, fun: G.fun, hp: G.hp, lev: G.lev || 0, tier: G.tier };
    const dRep = G.rep - snap0.rep;
    const dFun = G.fun - snap0.fun;
    const dHp = G.hp - snap0.hp;
    const dLev = (G.lev || 0) - (snap0.lev || 0);
    const dTier = G.tier - snap0.tier;
    const kFun = Math.round(dFun / 1000);
    const ctx = {
      era: G.era, year: G.year, month: 12, age: G.age, track: G.track, party: G.party, stance: G.stance,
      origin: G.origin, entry: G.entry, talent: G.talent, state: G.state, tier: G.tier,
      rep: G.rep, hp: G.hp, fun: G.fun, fav: G.fav, lev: G.lev || 0,
      contactN: P.myContacts().length, knownIds: G.contacts || {},
      scandal: P.scandalLevel(), tenure: P.monthsAtTier(), flags: G.flags || [],
      /* 给句子模板用的差值 */
      dRep: (dRep > 0 ? "+" : "") + dRep, dFunTxt: (kFun > 0 ? "+$" : (kFun < 0 ? "-$" : "$")) + Math.abs(kFun) + "k",
      dHp: (dHp > 0 ? "+" : "") + dHp, dLev: dLev, dTier: dTier,
      upRep: dRep >= 5, downRep: dRep <= -5,
      upFun: kFun >= 150, downFun: kFun <= -150,
      upHp: dHp > 0, downHp: dHp <= -4,
      upTier: dTier > 0, downTier: dTier < 0,
      busyYear: (G.quietMonths || []).length <= 3,
      quietYear: (G.quietMonths || []).length >= 8,
      heads: (G.yearHeads || []).length,
      fallen: G.flags.indexOf("fallen") >= 0
    };
    /* 三段：做了什么 → 得到/失去 → 现在在哪 */
    const did = pickTale("did", ctx);
    const gain = pickTale("gain", ctx);
    const now = pickTale("now", ctx);
    const segs = [];
    if (did) segs.push(did);
    if (gain) segs.push(gain);
    if (now) segs.push(now);
    return segs.join("\n\n");
  };

  P.startYear = function (resume) {
    P.SCREEN = "game";
    const G = P.G, era = P.reg.era[G.era] || { name: G.era, brief: {} };
    const brief = (era.brief && (era.brief[G.year] || era.brief["*"])) || (G.year + "年，风暴仍在继续。");
    if (!resume) G.month = 0;                 // 0 → advanceMonth 会从 1 月开始
    G.monthPlan = []; G.slotIndex = 0; G.slotCount = 0;
    G.quietMonths = []; G.yearHeads = [];
    G.vigMonth = 0; G.quietLog = [];           // 新的一年：静好岁月的结算水位与随笔记录归零
    /* 年初快照：年终叙事要对比"这一年你得到/失去了什么"，差值从这里来 */
    G.yearStartSnap = { rep: G.rep, fun: G.fun, hp: G.hp, lev: G.lev || 0, tier: G.tier };
    const pl = P.pressureLabel();
    const media = P.mediaNow().map(function (m) { return m.name; }).join(" · ");
    P.app().innerHTML =
      '<div class="topstat">' + P.topStatus() + '</div>' +
      '<div class="grid"><aside class="col-left">' + P.statPanel() + '</aside><div id="main"><div class="news fade"><div class="dateline">' + era.name +
      " · " + G.year + ' 年的世界</div><h2>' + G.year + "：时代简报</h2>" +
      '<div class="body">' + brief + "</div>" +
      '<div class="yearbar">' +
      "<div>时代压力：<b class=\"" + pl.cls + '">' + pl.text + "</b>（" + P.pressure().toFixed(1) + "／6）　·　压力越高，风波越多、越大。</div>" +
      (media ? "<div>此刻存在的媒介：" + media + "</div>" : "") +
      "</div>" +
      '</div></div>' +
      '<aside class="col-right" id="actbar">' +
      '<div class="opsbar">' + P.opsButtons() + '</div>' +
      '<div id="actbody"></div></aside></div>';
    // v0.5.4：年度简报「进入 N 月 →」继续按钮进右栏 #actbar（与事件流一致，操作不滚动中栏）
    actAppend('<div class="acthead">进入新的一年</div><button class="btn primary actbtn" onclick="POTUS.' +
      (resume ? "resumeMonth" : "nextMonth") + '()">' +
      (resume ? "回到 " + (G.month || 1) + " 月 →" : "进入 1 月 →") + "</button>");
    P.tickDate();
  };

  /* 从存档恢复：重建"当月"档期，不重头演这一年 */
  P.resumeMonth = function () {
    const G = P.G;
    const plan = (G.monthPlan && G.monthPlan.length) ? G.monthPlan : P.loadMonth(G.month || 1);
    if (!plan.length) { P.nextMonth(); return; }
    P.renderMonthCard([]);
  };

  /* 出一个档期：抽事件 → 出题。本月档期出完就推进月份。 */
  P.nextSlot = function () {
    const G = P.G;
    if (G.monthPlan && G.slotIndex < G.slotCount) {
      const slot = G.monthPlan[G.slotIndex];
      G.slotIndex++;
      P.presentEvent(P.drawEvent(slot), slot);
      return;
    }
    P.nextMonth();
  };

  /* 推进到下一个月；平静月也出一张卡（逐月手动点继续），一年到头就年终结算 */
  P.nextMonth = function () {
    const G = P.G;
    const before = G.quietMonths.length;
    const ok = P.advanceMonth();
    const skipped = G.quietMonths.slice(before);
    if (ok === "quiet") { P.renderQuietMonthCard(); return; }   // v0.5.2：平静月逐月出卡
    if (!ok) { P.endYear(); return; }
    P.renderMonthCard(skipped);
  };

  /* ---------------- 平静月的月卡：一个月一个月地过 ----------------
   * 用户 v0.5.2 的要求：连续平静月不许合并——每个月单独一张卡，手动点继续。
   * 卡上交代：这个月做了什么（具体工作，素材按轨道/层级筛选）+ 这个月的账
   * （工资进、开销出、顺手攒的人情/人脉）+ 引擎结算的成长。 */
  P.renderQuietMonthCard = function () {
    const G = P.G;
    const box = P.$("#main");
    if (!box) return;
    const m = G.month;
    /* 这个月的静好结算已经由 advanceMonth→settleQuietMonth 做掉了，这里只读 */
    const entry = (G.quietLog || []).filter(function (e) { return e.year === G.year && e.month === m; })[0];
    const gain = (entry && entry.gain) || {};
    const workLine = P.quietWorkLine(m);            /* 具体做了什么（content/08 的素材） */
    /* 账目行：工资/开销（引擎按职位与年代实算） + 静好结算的成长 */
    const acct = P.quietAccount(m, gain);
    const pl = P.pressureLabel();
    box.innerHTML = '<div class="news fade monthcard quietcard">' +
      '<div class="dateline"><span class="dt">' + G.year + " 年 " + m + " 月</span> · 平静的一个月</div>" +
      "<h2>" + G.year + " 年 " + m + " 月</h2>" +
      '<div class="mstrip"><div class="mlabel now quiet"><b>' + m + " 月</b><span>平静</span></div></div>" +
      '<div class="quietwork"><span class="qw-tag">这个月</span><span class="qw-text">' + workLine + "</span></div>" +
      (acct.html || "") +
      (entry && entry.text ? '<div class="vig"><div class="vig-body">' +
        entry.text.split(/\n\n+/).map(function (p) { return '<p class="vig-p">' + p + "</p>"; }).join("") +
        "</div></div>" : "") +
      '<div class="yearbar"><div>时代压力：<b class="' + pl.cls + '">' + pl.text + "</b></div></div></div>";
    /* 继续按钮 → 右栏 */
    actClear();
    actAppend('<div class="acthead">这个月过完了</div><button class="btn primary actbtn" onclick="POTUS.nextMonth()">继续 →</button>');
    P.tickDate();
    P.refreshPanel();
  };

  /* 平静月的"这个月做了什么"：从素材表里按 轨道×层级 抽一条具体工作。
   * 素材在 content/08-vignettes.js 的 quietWorks；引擎只管筛选和拼接。 */
  P.quietWorkLine = function (m) {
    const G = P.G;
    const list = (P.balance().quietWorks) || [];
    const snap = P.snap();
    if (snap && snap.month == null) snap.month = m;
    const ok = list.filter(function (w) {
      return (!w.tracks || w.tracks.indexOf(G.track) >= 0) &&
        (w.minTier == null || G.tier >= w.minTier) && (w.maxTier == null || G.tier <= w.maxTier) &&
        (!w.months || w.months.indexOf(m) >= 0) &&
        (!w.when || P.when(w.when, snap));
    });
    if (!ok.length) return "按部就班地处理手头的事务。";
    const w = P.pick(ok);
    return (w.texts && w.texts.length) ? P.pick(w.texts) : (w.text || "");
  };

  /* 平静月的账目：工资按【职位】实算（reg.officeSalary 可给具体职位定月薪，
     miss 才退到 tier 公式）- 开销（体面成本）+ 静好成长合并成一行筹码。
     用户的原则：身份直接决定日常收益——市议员和联邦参议员的工资差一个数量级。 */
  P.quietAccount = function (m, gain) {
    const G = P.G, b = P.balance();
    const q = b.quietAccount || {};
    /* 工资只从 P.officeSalary() 取（reg.officeSalary → "*_tier" → 公式）。
       v0.7 起投注的资金汇率也走同一个口径 —— "身份决定钱"只有一个来源。 */
    const salary = P.officeSalary();
    const living = P.rint((q.livingMin == null ? 800 : q.livingMin), (q.livingMax == null ? 2200 : q.livingMax)) * (1 + G.tier * 0.6);
    const net = salary - Math.round(living);
    G.fun += net;                                    /* 账当场入存档（平静月出卡即结算） */
    const items = [];
    items.push({ k: "工资", v: "+$" + (salary / 1000).toFixed(1) + "k", sign: 1 });
    items.push({ k: "开销", v: "-$" + (living / 1000).toFixed(1) + "k", sign: -1 });
    items.push({ k: "结余", v: (net >= 0 ? "+$" : "-$") + Math.abs(net / 1000).toFixed(1) + "k", sign: net >= 0 ? 1 : -1 });
    const ATTR_CN = { CHA: "魅力", INT: "智力", CUN: "手腕", INTG: "诚信" };
    for (const k in (gain.attr || {})) items.push({ k: ATTR_CN[k] || k, v: "+" + gain.attr[k], sign: 1 });
    if (gain.hp) items.push({ k: "健康", v: "+" + gain.hp, sign: 1 });
    if (gain.rep) items.push({ k: "声望", v: "+" + gain.rep, sign: 1 });
    if (gain.contact) items.push({ k: "人脉好感", v: "+" + gain.contact, sign: 1 });
    if (gain.fav) items.push({ k: "人情", v: "+" + gain.fav, sign: 1 });
    if (gain.ap) items.push({ k: "精力", v: "+" + gain.ap, sign: 1 });
    if (gain.fun) items.push({ k: "额外进账", v: (gain.fun > 0 ? "+$" : "-$") + Math.abs(gain.fun / 1000).toFixed(1) + "k", sign: gain.fun > 0 ? 1 : -1 });
    return {
      net: net,
      html: '<div class="gainbox"><span class="gtag">这个月的账</span>' +
        items.map(function (x) {
          const cls = x.sign > 0 ? "good" : x.sign < 0 ? "bad" : "";
          return '<span class="gchip2 ' + cls + '">' + x.k + " " + x.v + "</span>";
        }).join("") + "</div>"
    };
  };

  /* 月历卡：把刚刚「静悄悄过去」的月份一次交代清楚，并把本月要发生什么亮出来 */
  P.renderMonthCard = function (skipped) {
    const G = P.G;
    const box = P.$("#main");
    if (!box) return;
    const gc = P.monthGradeCount();
    const chips = ["major", "mid", "minor"].filter(function (g) { return gc[g]; })
      .map(function (g) {
        const d = P.reg.grade[g] || {};
        return '<span class="gchip ' + (d.cls || "") + '">' + P.gradeName(g) + " ×" + gc[g] + "</span>";
      }).join("");
    let strip = "";
    (skipped || []).forEach(function (m) {
      strip += '<div class="mlabel quiet"><b>' + m + ' 月</b><span class="muted">平静</span></div>';
    });
    strip += '<div class="mlabel now"><b>' + G.month + " 月</b><span>有事发生</span>" + chips + "</div>";
    const pl = P.pressureLabel();
    const media = P.mediaNow().map(function (m) { return m.name; }).join(" · ");
    /* 静好岁月：刚刚静悄悄过去的月份，不只是一行"平静"——写成一段日子给玩家看，
       同时把"按部就班"的那点成长结算掉（同一个月只结算一次）。 */
    const quiet = P.renderQuiet(skipped);
    box.innerHTML = '<div class="news fade monthcard">' +
      '<div class="dateline"><span class="dt">' + G.year + " 年 " + G.month + " 月</span> · 月历</div>" +
      "<h2>" + G.year + " 年 " + G.month + " 月</h2>" +
      '<div class="mstrip">' + strip + "</div>" +
      (quiet.html || "") +
      '<div class="yearbar"><div>时代压力：<b class="' + pl.cls + '">' + pl.text + "</b>" +
      (media ? "　·　媒介：" + media : "") + "</div></div></div>";
    /* 继续按钮 → 右栏 */
    actClear();
    actAppend('<div class="acthead">本月</div><button class="btn primary actbtn" onclick="POTUS.nextSlot()">继续 →</button>');
    P.tickDate();
    P.refreshPanel();
  };

  /* 选项前置条件：返回 null 表示满足，否则返回提示文本 */
  function reqBlock(ch) {
    const G = P.G, r = ch.req;
    if (!r) return null;
    if (r.fun != null && G.fun < r.fun) return "需要资金 ≥ $" + r.fun.toLocaleString();
    if (r.lev != null && (G.lev || 0) < r.lev) return "需要把柄 ≥ " + r.lev;
    if (r.rep != null && G.rep < r.rep) return "需要声望 ≥ " + r.rep;
    if (r.tier != null && G.tier < r.tier) return "需要身居 " + P.tierName(r.tier) + " 或以上";
    if (r.track && G.track !== r.track) return "需要「" + ((P.reg.track[r.track] || {}).name || r.track) + "」";
    if (r.party && G.party !== r.party) return "需要「" + ((P.reg.party[r.party] || {}).name || r.party) + "」";
    if (r.fac && (G.faction[r.fac] || 0) < (r.min || 0)) return "需要" + P.factionName(r.fac) + "好感 ≥ " + (r.min || 0);
    if (r.contact && !P.hasContact(r.contact)) return "需要先认识「" + P.contactName(r.contact) + "」";
    if (r.flag && !P.hasFlag(r.flag)) return "需要状态：" + r.flag;
    return null;
  }

  /* 资源盘点：选项代价 + 当前余额 */
  const RES_LABEL = { fun: "资金", fav: "人情", ap: "精力", rep: "声望", hp: "健康", lev: "把柄" };
  function resText(cost) {
    return Object.keys(cost).map(function (k) {
      const v = cost[k];
      if (k === "fun") return "资金 " + (v < 0 ? "-$" : "$") + (Math.abs(v) / 1000).toFixed(0) + "k";
      return RES_LABEL[k] + " " + v;
    }).join(" · ");
  }
  function costBlock(ch) {
    if (!ch.cost) return null;
    const G = P.G, lack = [];
    for (const k in ch.cost) if (k === "fun" ? G.fun < ch.cost[k] : (G[k] || 0) < ch.cost[k]) lack.push(RES_LABEL[k] || k);
    return lack.length ? ("缺少" + lack.join("、")) : null;
  }
  function payCost(ch, extra) {
    const G = P.G, paid = {};
    [ch.cost, extra].forEach(function (c) {
      if (!c) return;
      for (const k in c) { if (!c[k]) continue; G[k] = (G[k] || 0) - c[k]; paid[k] = (paid[k] || 0) + c[k]; }
    });
    if (G.fun < 0) G.fun = G.fun;              // 允许负债（保留戏剧性）
    G.fav = P.clamp(G.fav, 0, 20); G.ap = P.clamp(G.ap, 0, 99); G.hp = P.clamp(G.hp, 0, 100);
    G.lev = Math.max(0, G.lev || 0);           // 把柄是"份"，花掉就没了，不能欠
    return paid;
  }

  /* 保底选项的选择（纯函数，便于单测）：
   *   本来就有能选的 → -1（不用干预）
   *   全被堵死 → 优先放行「只是资源不够」的那个（剧情走向仍成立，只是硬撑），
   *              其次第一个，返回它的下标。
   * 内容侧的正确做法是每个事件都留一个"不要钱、不设门槛"的选项；
   * 这里只是保险丝，防止内容写漏把玩家关死在一个事件里。 */
  P.fallbackIndex = function (chs) {
    if (!chs || !chs.length) return -1;
    const reqs = chs.map(reqBlock), costs = chs.map(costBlock);
    for (let i = 0; i < chs.length; i++) if (!reqs[i] && !costs[i]) return -1;
    for (let i = 0; i < chs.length; i++) if (!reqs[i]) return i;
    return 0;
  };

  /* ---------------- 收益结算：把 effects 翻译成玩家语言 ----------------
   * 数字是给存档看的，这一栏是给玩家看的：声望、钱、人情、派系、状态，
   * 正负分色，一眼看清"这一手你得到了什么、赔了什么"。 */
  function fmtVoterNum(n) {
    const abs = Math.abs(n);
    if (abs >= 10000) return (n / 10000).toFixed(1) + " 万";
    if (abs >= 1000) return (n / 1000).toFixed(1) + " 千";
    return String(n);
  }
  P.fmtVoterNum = fmtVoterNum;      /* v0.6：月卡（vignette.js）也要按同样口径显示选民变化 */
  P.gainSummary = function (eff) {
    const P_ = window.POTUS, G = P_.G;
    const out = [];
    if (!eff) return out;
    if (eff.rep != null) out.push({ k: "声望", v: eff.rep, sign: eff.rep });
    if (eff.fun != null) {
      const k = Math.round(eff.fun / 1000);
      out.push({ k: "资金", v: (k >= 0 ? "+$" : "-$") + Math.abs(k) + "k", sign: eff.fun });
    }
    if (eff.funMul != null) {
      const pct = Math.round(eff.funMul * 100);
      const base = (P.G.__stakeBase != null && P.G.__stakeBase > 0) ? P.G.__stakeBase : null;
      const amt = base != null ? Math.round(base * eff.funMul / 1000) : null;
      out.push({
        k: "资金",
        v: (pct >= 0 ? "+" : "") + pct + "%（本金）" + (amt != null ? (amt >= 0 ? " ≈+$" : " ≈-$") + Math.abs(amt) + "k" : ""),
        sign: eff.funMul
      });
    }
    if (eff.fav != null) out.push({ k: "人情", v: eff.fav, sign: eff.fav });
    if (eff.ap != null) out.push({ k: "精力", v: eff.ap, sign: eff.ap });
    if (eff.hp != null) out.push({ k: "健康", v: eff.hp, sign: eff.hp });
    if (eff.lev != null) out.push({ k: "把柄", v: eff.lev, sign: eff.lev });
    if (eff.tier != null && eff.tier !== 0) out.push({ k: "层级", v: (eff.tier > 0 ? "T↑" : "T↓"), sign: eff.tier });
    if (eff.attr) for (const a in eff.attr) out.push({ k: { CHA: "魅力", INT: "智力", CUN: "手腕", INTG: "诚信" }[a] || a, v: eff.attr[a], sign: eff.attr[a] });
    if (eff.fac) for (const f in eff.fac) out.push({ k: P_.factionName(f), v: eff.fac[f], sign: eff.fac[f] });
    if (eff.contact) for (const c in eff.contact) out.push({ k: P_.contactName(c), v: eff.contact[c], sign: eff.contact[c] });
    /* 状态词条：只在 tagNames 里登记过的才翻译（scandal_n 这类内部标记不翻） */
    const tagNames = P_.balance().tagNames || {};
    if (eff.flags) [].concat(eff.flags).forEach(function (f) {
      if (f.indexOf("scandal_") === 0 || f.indexOf("bs_") === 0) return;
      const ti = P.tagInfo(f);
      if (!ti.name || ti.name === f) return;        // 没登记的 key 不显示（宁缺毋滥）
      out.push({ k: "状态", v: ti.name, sign: 1, flag: true, tip: P.tagTooltip(f) });
    });
    if (eff.notFlags) [].concat(eff.notFlags).forEach(function (f) {
      const ti = P.tagInfo(f);
      if (ti.name && ti.name !== f) out.push({ k: "解除", v: ti.name, sign: 1, flag: true, tip: P.tagTooltip(f) });
    });
    if (eff.voters) {
      const VCN = { warm: "好感选民", diehard: "死忠", oppose: "反对者" };
      for (const vk in eff.voters) {
        const n = eff.voters[vk];
        out.push({ k: VCN[vk] || vk, v: (n > 0 ? "+" : "") + fmtVoterNum(n), sign: vk === "oppose" ? -n : n });
      }
    }
    if (eff.fall) out.push({ k: "下野", v: eff.fall >= 2 ? "重挫" : "跌落", sign: -1, flag: true });
    if (eff.hardEnd) out.push({ k: "终局", v: eff.hardEnd === "prison" ? "入狱" : "身败名裂", sign: -1, flag: true });
    return out;
  };
  function gainBoxHTML(eff) {
    const items = P.gainSummary(eff);
    if (!items.length) return "";
    return '<div class="gainbox"><span class="gtag">这一手</span>' +
      items.map(function (x) {
        const cls = x.flag ? "gflag" : (x.sign > 0 ? "good" : x.sign < 0 ? "bad" : "");
        const tip = x.tip ? ' class="' + cls + ' hastip" data-tip="' + String(x.tip).replace(/"/g, "&quot;") + '"' : ' class="' + cls + '"';
        return '<span class="gchip2 ' + (tip ? tip + '"' : cls + '"') + ">" + x.k + " " + (x.v > 0 && !x.flag ? "+" : "") + x.v + "</span>";
      }).join("") + "</div>";
  }

  /* ---------------- 选项回报预览（掷骰前的区间式预览） ----------------
   * 把五个判定档位（crit/ok/meh/fail/critfail）的 effects 同类项聚合成「最小~最大」
   * 区间，让玩家点之前看清这条路最好 / 最坏能摆动多少（决策信息对称），但不透露
   * 具体落在哪档（保留掷骰悬念）。稀有终局（下野 / 入狱）只用不写细节的角标点一下。
   * 注意：ev 已由 P.drawEvent→P.realize 展开成绝对数值，这里直接读即可；
   *       唯 funMul（投资按比例回报）本金未定，只给百分比区间；flags/状态一律不预览（避免剧透）。 */
  const REW_SCAL = { rep: "声望", fun: "资金", ap: "精力", fav: "人情", hp: "健康", lev: "把柄" };
  const REW_ATTR = { CHA: "魅力", INT: "智力", CUN: "手腕", INTG: "诚信" };
  const REW_INLINE = 6;                 // 常驻一行最多几枚筹码，其余折进「回报明细」
  function _rmin(a) { return Math.min.apply(null, a); }
  function _rmax(a) { return Math.max.apply(null, a); }
  function _rwSigned(v) { return (v > 0 ? "+" : "") + v; }
  function _rwUsd(v) { return (v < 0 ? "-" : "+") + "$" + (Math.abs(v) / 1000).toFixed(0) + "k"; }
  function _rwVoter(v) { return (v > 0 ? "+" : "") + fmtVoterNum(v); }
  function _rwPct(v) { return (v > 0 ? "+" : "") + Math.round(v) + "%"; }
  function _rwChip(k, lo, hi, fmt, flip) {
    let sign = (lo >= 0 && hi >= 0) ? 1 : (hi <= 0 && lo <= 0) ? -1 : 0;
    if (flip) sign = -sign;
    const cls = sign > 0 ? "good" : sign < 0 ? "bad" : "";
    return { k: k, v: (lo === hi) ? fmt(lo) : fmt(lo) + "~" + fmt(hi), cls: cls };
  }
  P.rewardPreview = function (ch) {
    const outs = (ch && ch.outcomes) || {};
    const tiers = ["crit", "ok", "meh", "fail", "critfail"];
    const scal = {}, voters = { diehard: [], warm: [], oppose: [] }, fac = {}, attr = {};
    const funMul = [];
    let hasFall = false, hasEnd = false, up = false, down = false;
    tiers.forEach(function (t) {
      const e = outs[t] && outs[t].effects;
      if (!e) return;
      for (const k in REW_SCAL) if (typeof e[k] === "number") (scal[k] = scal[k] || []).push(e[k]);
      if (typeof e.funMul === "number") funMul.push(e.funMul);
      if (e.voters) for (const vk in voters) if (typeof e.voters[vk] === "number") voters[vk].push(e.voters[vk]);
      if (e.fac) for (const f in e.fac) (fac[f] = fac[f] || []).push(e.fac[f]);
      if (e.attr) for (const a in e.attr) (attr[a] = attr[a] || []).push(e.attr[a]);
      if (e.fall) hasFall = true;
      if (e.hardEnd) hasEnd = true;
      if (e.tier > 0) up = true;
      if (e.tier < 0) down = true;
    });
    const chips = [];
    if (scal.rep) chips.push(_rwChip("声望", _rmin(scal.rep), _rmax(scal.rep), _rwSigned));
    if (scal.fun) chips.push(_rwChip("资金", _rmin(scal.fun), _rmax(scal.fun), _rwUsd));
    if (funMul.length) chips.push(_rwChip("本金", _rmin(funMul) * 100, _rmax(funMul) * 100, _rwPct));
    if (voters.diehard.length) chips.push(_rwChip("死忠", _rmin(voters.diehard), _rmax(voters.diehard), _rwVoter));
    if (voters.warm.length) chips.push(_rwChip("好感选民", _rmin(voters.warm), _rmax(voters.warm), _rwVoter));
    if (voters.oppose.length) chips.push(_rwChip("反对者", _rmin(voters.oppose), _rmax(voters.oppose), _rwVoter, true));
    if (up || down) chips.push({ k: "层级", v: (up && down) ? "↑↓" : (up ? "↑" : "↓"), cls: (down && !up) ? "bad" : "gflag" });
    ["ap", "fav", "hp", "lev"].forEach(function (k) { if (scal[k]) chips.push(_rwChip(REW_SCAL[k], _rmin(scal[k]), _rmax(scal[k]), _rwSigned)); });
    Object.keys(fac).map(function (f) { return { f: f, s: Math.abs(_rmin(fac[f])) + Math.abs(_rmax(fac[f])) }; })
      .sort(function (a, b) { return b.s - a.s; }).slice(0, 2).forEach(function (x) {
        chips.push(_rwChip(P.factionName(x.f), _rmin(fac[x.f]), _rmax(fac[x.f]), _rwSigned));
      });
    Object.keys(attr).forEach(function (a) { chips.push(_rwChip(REW_ATTR[a] || a, _rmin(attr[a]), _rmax(attr[a]), _rwSigned)); });
    const risk = [];
    if (hasEnd) risk.push("入狱");
    if (hasFall) risk.push("下野");
    return { chips: chips, risk: risk };
  };
  function rewChipHTML(c) { return '<span class="gchip2 ' + c.cls + '">' + c.k + " " + c.v + "</span>"; }
  function rewLineHTML(rew) {
    if (!rew.chips.length && !rew.risk.length) return "";
    const show = rew.chips.slice(0, REW_INLINE), more = rew.chips.slice(REW_INLINE);
    return '<span class="rewline"><span class="gtag">回报</span>' +
      show.map(rewChipHTML).join("") +
      (more.length ? '<span class="gchip2 rew-more">＋' + more.length + ' 项</span>' : "") +
      (rew.risk.length ? '<span class="rew-risk">⚠ 有' + rew.risk.join("/") + '风险</span>' : "") +
      "</span>";
  }

  P.presentEvent = function (ev, slot) {
    P.tickDate();
    const grade = (slot && slot.grade) || P.gradeOf(ev);
    /* v0.6：把本次量级记在状态上，结算时（resolveChoice）算"事件自动选民增减"要用 */
    P.G.__curGrade = grade;
    const gdef = P.reg.grade[grade] || {};
    const catName = ev.category ? P.categoryName(ev.category) : "";
    const medName = ev.medium ? [].concat(ev.medium).map(P.mediumName).join(" / ") : "";
    /* 事件链的「前情」：让玩家知道自己接的是哪条线、上一幕是多久以前 */
    let chainHTML = "";
    if (ev.after && ev.after.id) {
      const prev = P.prevEventOf(ev);
      const gap = P.monthsSince(ev.after.id);
      const gapText = gap == null ? "" : (gap <= 0 ? "就在本月" : gap + " 个月前");
      chainHTML = '<div class="chain"><span class="chain-tag">承 前</span>' +
        '<span class="chain-body">' + (prev ? prev.title : ev.after.id) +
        (gapText ? '　·　' + gapText : "") + "</span></div>";
    }
    const box = P.$("#main");
    /* 三值性徽标：机遇/风险/威胁 —— 玩家第一眼就知道找上我的是哪种事 */
    const val = P.valenceOf(ev);
    const vchip = '<span class="vchip ' + val + '" title="' +
      (val === "boon" ? "机会：再糟的处理也不会亏" : val === "bane" ? "威胁：不处理必有代价，处理得好能翻盘" : "风险：搏与不搏都是路") + '">'
      + (P.VAL_LABEL[val] || val) + "</span>";
    /* 主次顺序：标题 → 承前 → 正文（主角视角发生了什么）→ 插画 → 背景卡（折叠）→ 选项 */
    box.innerHTML =
      '<div class="news fade"><div class="dateline"><span class="dt">' + P.dateText(ev) + "</span>" +
      vchip +
      (gdef.name ? ' <span class="gchip ' + (gdef.cls || "") + '">' + gdef.name + "</span>" : "") +
      (catName ? ' <span class="cchip">' + catName + "</span>" : "") +
      (medName ? ' <span class="cchip medium">' + medName + "</span>" : "") +
      (ev.type ? " · " + ev.type : "") + "</div>" +
      chainHTML +
      "<h2>" + (ev.title || "") + "</h2>" +
      '<div class="body">' + (ev.body || "") + "</div>" +
      P.artSVG(ev) +
      '</div>' +
      /* 背景卡在事件框下面（中栏底部）：想细看的人展开，不挡任何东西 */
      '<div class="brief-slot">' + P.briefHTML(ev) + "</div>";
    /* v0.5.3 三栏布局：选项进右栏（#actbar），与掷骰/结算/继续按钮同栏 */
    const cbox = document.getElementById("actbody");
    let choicesHost = null;
    if (cbox) {
      choicesHost = document.createElement("div");
      choicesHost.className = "choices act-choices";
      choicesHost.id = "choices";
      cbox.innerHTML = '<div class="acthead">你的选择</div>';
      cbox.appendChild(choicesHost);
    }
    const cTarget = choicesHost || P.$("#choices");
    const chs = ev.choices || [];
    /* 保底机制：如果所有选项都被堵死（没钱 / 没声望 / 没层级），放行一个，
       免得玩家卡在一个点不动的事件上。正常情况下不该触发（校验器强制每个事件
       都有保底选项），这里只是兜底。 */
    const forced = P.fallbackIndex(chs);
    chs.forEach(function (ch, i) {
      const blockedReq = reqBlock(ch);
      const blockedCost = costBlock(ch);
      const isForced = i === forced;
      const blocked = isForced ? null : (blockedReq || blockedCost);
      const stakeSpec = P.stakeSpec(ch);
      const rew = P.rewardPreview(ch);
      const btn = document.createElement("button");
      btn.className = "choice" + (isForced ? " forced" : "");
      btn.disabled = !!blocked;
      /* 掷骰对用户隐藏：不再显示胜算百分比。玩家只需知道「有风险、能投入资源搏一把、
         结果有得有失」——风险的量由事件三值性徽标与下面的回报区间来传达。 */
      const hint = stakeSpec ? '<span class="hint">可投入资源，搏更大把握</span>' : "";
      btn.innerHTML = ch.text + hint +
        (ch.cost ? '<span class="costtag">代价：' + resText(ch.cost) + "</span>" : "") +
        rewLineHTML(rew) +
        (blocked ? '<span class="req">✕ ' + (blockedReq || blockedCost) + "</span>" : "") +
        (isForced ? '<span class="req forced-tag">⚠ 保底选项：' + (blockedCost || blockedReq) + "，硬撑一次（资源会被扣到见底）</span>" : "");
      /* 选项说明：折叠展开（默认收起）—— 把"这条路意味着什么"留给愿意细看的玩家 */
      if (ch.note) {
        const det = document.createElement("details");
        det.className = "chnote";
        det.innerHTML = "<summary>说明</summary><div>" + ch.note + "</div>";
        btn.appendChild(det);
      }
      /* 回报溢出的完整区间：超出一行的筹码折进「回报明细」（同样靠 closest('.chnote') 不误触选择） */
      if (rew.chips.length > REW_INLINE) {
        const rdet = document.createElement("details");
        rdet.className = "chnote";
        rdet.innerHTML = "<summary>回报明细</summary><div>" + rew.chips.map(rewChipHTML).join(" ") + "</div>";
        btn.appendChild(rdet);
      }
      btn.onclick = function (e) {
        if (e && e.target && e.target.closest && e.target.closest(".chnote")) return;  // 点说明不选选项
        P.choose(ev, ch);
      };
      cTarget.appendChild(btn);
    });
    /* 状态面板同步当前日期（否则要等到本次结算后才会刷新） */
    P.refreshPanel();
  };

  /* funMul 的本金基数（investment base）：
     结算前写入，applyEffects 用，结算完清零。 */
  function G_stakeBase(v) { P.G.__stakeBase = v; }

  /* 右栏（#actbar）的两个 HTML 快捷操作 */
  function actClear() { const bar = document.getElementById("actbody"); if (bar) bar.innerHTML = ""; }
  function actAppend(html) { const bar = document.getElementById("actbody"); if (bar) { const d = document.createElement("div"); d.innerHTML = html; while (d.firstChild) bar.appendChild(d.firstChild); } }

  /* 操作元素（选项/掷骰/结算/继续按钮）的归宿：右栏 #actbar。
     没有右栏的页面（标题/建角/年终）退回 #main 尾部——单栏兼容。 */
  function actInsert(el) {
    const bar = document.getElementById("actbody");
    if (bar) { bar.appendChild(el); return; }
    const main = P.$("#main");
    if (main) main.appendChild(el);
  }
  /* 旧名兼容（投注面板等历史调用点） */
  function mainInsert(el) { actInsert(el); }

  /* ---------------- 判定与结算 ---------------- */
  P.resolveChoice = function (ev, ch, st) {
    const info = st ? P.stakeInfo(ch, st) : null;
    const r = P.computeP(ch, info);
    const res = P.rollTierAdv(r.P, !!(info && info.reroll));
    const out = ch.outcomes[res.tier] || ch.outcomes.ok || {};
    /* v0.6 选民动态：所有事件的成败都自动给选民增减（量级 × 判定档位 × 事件类型），
       内容显式写了 effects.voters / 或本次改变身位的，以内容为准。
       合成一个 effFinal 给「应用到状态」和「收益结算显示」共用——账面上写的和实际扣的一致。 */
    const effFinal = P.withEventVoters
      ? P.withEventVoters(out.effects, ev, ch, out, res.tier)
      : (out.effects || {});
    /* 投资本金基数：选项 cost + 投注的资金 —— funMul 按它算回报（不是总余额） */
    G_stakeBase((ch.cost && ch.cost.fun ? ch.cost.fun : 0) + (info && info.cost ? (info.cost.fun || 0) : 0));
    const paid = payCost(ch, info && info.cost);
    const cbox = P.$("#choices"); if (cbox) cbox.style.display = "none";
    /* 掷骰在后台完成（rollTier 已算出 res.tier），界面上不再演骰子、不报点数、
       不列目标值与加值明细。玩家看到的只有：结果档位（大成功/成功/勉强/失败/大失败）
       ＋ 叙事正文 ＋ 收益结算。判定过程依旧确定可复算，只是不作为噪声呈现。 */
    P.applyEffects(effFinal);
    P.G.__stakeBase = 0;                       // 用完即清：后续事件不再吃旧本金
    const label = P.TIER_LABEL[res.tier] || res.tier;
    const div = document.createElement("div");
    div.className = "result " + res.tier + " fade";
    div.innerHTML = "<b>" + label + "</b><br>" + (out.body || "");
    mainInsert(div);
    const gainHTML = gainBoxHTML(effFinal);
    if (gainHTML) {
      const gb = document.createElement("div");
      gb.className = "fade";
      gb.innerHTML = gainHTML;
      mainInsert(gb);
    }
    const eff = effFinal || {};
    const newScandal = (eff.flags || []).some(function (f) { return f.indexOf("scandal_") === 0; });
    if (newScandal || out.news) {
      const headline = P.makeNews(out.news || ("陷入争议：" + String(out.body || "").slice(0, 24)));
      P.G.history.push(headline);
      (P.G.yearHeads = P.G.yearHeads || []).push(headline);
      P.pushLog("头条：" + headline);
      const nv = document.createElement("div"); nv.className = "news fade";
      nv.innerHTML = '<div class="dateline">突发</div><div class="body">' + headline + "</div>";
      mainInsert(nv);
    }
    P.pushLog("[" + (ev.title || "") + "] " + label);
    const btn = document.createElement("button");
    btn.className = "btn primary"; btn.style.marginTop = "10px"; btn.textContent = "继续 →";
    btn.onclick = function () { P.afterEvent(); };
    mainInsert(btn);
    P.refreshPanel();
    P.autosave();
  };

  P.afterEvent = function () {
    const b = P.balance(), G = P.G;
    if (G.hp <= 0) return P.ending("death_health");
    /* 硬 BE：事件效果键 hardEnd 已写入 pendingHardEnd（入狱/身败名裂）—— 政治生命就此终结 */
    if (G.pendingHardEnd) {
      const why = G.pendingHardEnd;
      G.pendingHardEnd = null;
      return P.ending(why);
    }
    if (P.hasFlag("prison") || P.hasFlag("scandal_5")) return P.ending("prison");
    if (G.age >= b.retireAge) return P.ending("retire");
    if (G.tier >= b.tierMax && !P.hasFlag("president_done")) { P.addFlag("president_done"); return P.ending("president"); }
    /* 软 BE「下野」：fall 效果已把层级/声望/标记处理完。这里单独出一页交代卡，
       玩家点「继续」才推进 —— 不然 nextSlot 会立刻把这一页冲掉。游戏继续，东山再起留给后面。 */
    if (G.fallenThisTurn) {
      G.fallenThisTurn = false;
      const main = P.$("#main");
      if (main) {
        const fb = document.createElement("div");
        fb.className = "bs fade";
        fb.innerHTML = '<div class="dateline" style="color:#7a1f1f">下野</div><h2>你从台上走了下来</h2>' +
          '<div class="body">办公室的灯还亮着，但已经不是为你亮的了。你交出钥匙、名单和那些「回头再说」的承诺，' +
          "从台阶上退了下来。支持你的人散了一半，记得你的人却一个没少。\n\n" +
          "这不是结局。这个国家见过太多从谷底爬回来的人 —— 只要政治生命还在，台阶就还在。</div>";
        mainInsert(fb);
        const cbtn = document.createElement("button");
        cbtn.className = "btn primary"; cbtn.style.marginTop = "10px"; cbtn.textContent = "继续 →";
        cbtn.onclick = function () { P.nextSlot(); };
        mainInsert(cbtn);
        P.refreshPanel();
        P.autosave();
        return;
      }
    }
    P.nextSlot();
  };

  /* 年终结算：把这一年发生过的事收成一页，再进下一年 */
  P.endYear = function () {
    const b = P.balance(), G = P.G;
    G.age++;
    const tal = P.reg.talent[G.talent] || {};
    const decay = tal.hpDecayMul == null ? 1 : tal.hpDecayMul;
    G.hp = P.clamp(G.hp - Math.round(P.rint(b.hpDecayMin, b.hpDecayMax) * decay), 0, 100);
    if (G.fun > 0) G.fun = Math.round(G.fun * (1 + b.interestRate));
    // 精力按健康恢复：健康是"精力上限"的来源，健康差 → 每年可投入的资源变少
    const apBase = b.apBase == null ? 6 : b.apBase, apDiv = b.apHealthDiv || 25;
    G.ap = P.clamp(apBase + Math.floor(G.hp / apDiv), b.apMin || 1, b.apMax || 12);
    for (let i = 5; i >= 1; i--) {
      const f = "scandal_" + i;
      if (P.hasFlag(f) && P.chance(b.scandalDecayChance)) { P.delFlag(f); if (i > 1) P.addFlag("scandal_" + (i - 1)); }
    }
    /* 把柄会过期：当事人下台、死了，或者事情被时间冲淡了。
       所以"囤把柄"不是稳健策略 —— 留到需要用的时候用。 */
    let levGone = 0;
    if ((G.lev || 0) > 0) {
      for (let i = 0; i < G.lev; i++) if (P.chance(b.leverageDecayChance == null ? 0.34 : b.leverageDecayChance)) levGone++;
      G.lev = Math.max(0, G.lev - levGone);
    }
    if (levGone) P.pushLog("时效：有 " + levGone + " 份把柄失去了价值（当事人下台或事情过去了）。");
    P.pushLog("年度结算：" + G.age + "岁，声望" + G.rep + "，资金$" + (G.fun / 1000).toFixed(0) + "k，健康" + G.hp + "。");

    let bsHTML = "";
    if (P.chance(b.blackswanChance)) {
      const list = P.reg.blackswan[G.era] || [];
      if (list.length) {
        const bs = P.pick(list);
        P.addFlag("bs_" + (bs.id || bs.title));
        P.applyEffects(bs.effects);
        bsHTML = '<div class="bs"><div class="dateline" style="color:#9c2b2b">黑天鹅</div>' +
          "<h2>" + bs.title + '</h2><div class="body">' + bs.body + "</div></div>";
        P.pushLog("黑天鹅：" + bs.title);
      }
    }
    P.autosave();

    const main = P.$("#main");
    if (!main) return;
    const sc = P.scandalLevel();
    const heads = (G.yearHeads || []).slice(-5).map(function (h) { return "<li>" + h + "</li>"; }).join("");
    const quiet = (G.quietMonths || []).length;
    /* v0.5.2：平静月已逐月出卡，年终不再重复整段文字（tailVig 保留给旧存档渲染） */
    const tailVig = { html: "" };
    /* 年终随笔：三段人话（做了什么/得失/处境）放在数字条上方 —— 文学为主，数字为辅 */
    const taleText = P.yearNarrative();
    const tales = taleText
      ? '<div class="ytales">' + taleText.split(/\n\n+/).map(function (p) {
        return '<p class="ytale-p">' + p + "</p>";
      }).join("") + "</div>"
      : "";
    main.innerHTML = '<div class="news fade yearcard">' +
      '<div class="dateline"><span class="dt">' + G.year + " 年</span> · 年度结算</div>" +
      "<h2>" + G.year + " 年走完了</h2>" +
      tales +
      '<div class="yearbar">' +
      "<div>" + G.age + " 岁　·　" + P.officeName() + "（在位 " + P.monthsAtTier() + " 个月）　·　" +
      (sc ? "丑闻 Lv" + sc : "无丑闻") + "　·　平静的月份 " + quiet + " 个</div>" +
      "<div>声望 " + G.rep + "　·　资金 $" + (G.fun / 1000).toFixed(0) + "k　·　健康 " + G.hp + "　·　精力 " + G.ap +
      "　·　把柄 " + (G.lev || 0) + " 份</div>" +
      "<div>人脉 " + P.myContacts().length + " 人" +
      (G.state ? "　·　" + P.stateName(G.state) : "") +
      (levGone ? "　·　" + levGone + " 份把柄在本年失效" : "") + "</div>" +
      "</div>" +
      (tailVig.html || "") +
      (heads ? '<h3 class="sechead">这一年的头条</h3><ul class="heads">' + heads + "</ul>" : "") +
      bsHTML +
      '</div>';
    // v0.5.4：年终「进入 N 年 →」继续按钮进右栏 #actbar（清理上一事件残留结算，操作不滚动中栏）
    actClear();
    actAppend('<button class="btn primary actbtn" onclick="POTUS.nextYear()">进入 ' + (G.year + 1) + " 年 →</button>");
    P.tickDate();
    P.refreshPanel();
  };

  P.nextYear = function () { P.G.year++; P.startYear(); };
})();
