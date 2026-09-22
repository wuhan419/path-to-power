/* ============================================================================
 * POTUS · tools/choice-audit.js
 * 选项取舍探测器（终端报告）。回答用户的核心痛点：
 *   “现在选项充斥着闭着眼都知道怎么选的选项，没有需要权衡和抉择的感觉。”
 *
 * 判据（全部在【同一事件内跨选项相对比】，不跨事件比绝对值）：
 *   ① 占优（dominance）：选项 X 若【每一根资源轴都不低于 Y】且【至少一轴严格更高】，
 *      并且【不比 Y 更冒险（base ≥ Y）】→ Y 是“必被跳过”的诱饵，X 无脑选。
 *   ② 过平（flat）：各选项 base 挤在一起（风险无差异）且各轴收益彼此差距都很小 →
 *      闭眼点哪个都一样，没有“风险×回报×取向”的错位权衡。
 *   ③ 同轴单调（same-axis）：所有选项的收益都压在同一根轴上、且无风险补偿
 *      （钱多的那条把握度还不低）→ 正是 “A+$500k B+$300k C+$100k 谁都知道选 A”。
 *
 * 用法：
 *   node tools/choice-audit.js            → 三段报告 + 摘要
 *   node tools/choice-audit.js --json     → 追加机器可读摘要
 *   node tools/choice-audit.js --only=ev  → 只打印被标记的事件明细
 * ==========================================================================*/
"use strict";
const fs = require("fs");
const path = require("path");

/* ---------- 宿主环境 stub（与 validate.js / audit.js 同款） ---------- */
function makeEl() {
  return {
    innerHTML: "", className: "", textContent: "", disabled: false, value: "", style: {}, outerHTML: "",
    appendChild() { }, append() { }, remove() { }, setAttribute() { }, insertBefore() { }, closest() { return null; },
    querySelector() { return makeEl(); }, onclick: null, oninput: null, onchange: null
  };
}
global.document = { querySelector: () => makeEl(), querySelectorAll: () => [], getElementById: () => makeEl(), createElement: () => makeEl(), body: { className: "" }, addEventListener() { } };
const _store = {};
global.localStorage = {
  getItem: (k) => (k in _store ? _store[k] : null), setItem: (k, v) => { _store[k] = String(v); },
  removeItem: (k) => { delete _store[k]; }, key: (i) => Object.keys(_store)[i] ?? null,
  get length() { return Object.keys(_store).length; }
};
global.getComputedStyle = () => ({ getPropertyValue: () => "" });
global.alert = () => { }; global.confirm = () => true; global.prompt = () => "x";
global.setTimeout = () => 0; global.setInterval = () => 1; global.clearInterval = () => { };
global.URL = { createObjectURL: () => "", revokeObjectURL: () => { } };
global.Blob = function () { }; global.FileReader = function () { };
global.window = global;

const ROOT = path.resolve(__dirname, "..");
const srcs = [...fs.readFileSync(path.join(ROOT, "index.html"), "utf8").replace(/<!--[\s\S]*?-->/g, "")
  .matchAll(/<script\s+src="([^"]+)"><\/script>/g)].map(m => m[1]);
const code = srcs.map(s => fs.readFileSync(path.join(ROOT, s), "utf8")).join("\n;\n");
const P = new Function(code + "\n;POTUS.boot();\n;return POTUS;")();

/* ---------- T2 基准世界（dyn 卡 realize 展开需要坐标系） ---------- */
const firstEra = Object.keys(P.reg.era)[0];
P.CSEL = { era: firstEra, origin: Object.keys(P.reg.origin)[0], talent: Object.keys(P.reg.talent)[0], entry: Object.keys(P.reg.entry)[0], party: Object.keys(P.reg.party)[0], stance: Object.keys(P.reg.stance)[0], name: "选项审计" };
P.confirmCreate();
P.G.tier = 2; P.G.track = "electoral"; P.G.attr = { CHA: 50, INT: 50, CUN: 50, INTG: 50 };

const TIERS = ["crit", "ok", "meh", "fail", "critfail"];
/* 玩家可感的“收益轴”。把柄 lev / 代价 cost 是负债，单独计（不并进收益向量）。 */
const AXES = ["money", "people", "rep", "voters", "attr"];

/* 把一份 effects（或 cost）拆成各轴的标量收益。 */
function axisVec(fx) {
  const a = { money: 0, people: 0, rep: 0, voters: 0, attr: 0 };
  if (!fx) return a;
  if (typeof fx.fun === "number") a.money += fx.fun;
  if (typeof fx.funMul === "number") a.money += fx.funMul;      // 回报率也进钱轴（本金相关，粗略并入）
  if (fx.fac) for (const k in fx.fac) a.people += Number(fx.fac[k]) || 0;
  if (fx.contact) for (const k in fx.contact) a.people += Number(fx.contact[k]) || 0;
  if (typeof fx.rep === "number") a.rep += fx.rep;
  if (fx.voters) a.voters += (Number(fx.voters.diehard) || 0) + (Number(fx.voters.warm) || 0) - (Number(fx.voters.oppose) || 0) * 0;
  if (fx.voters && fx.voters.oppose != null) a.voters += -(Number(fx.voters.oppose) || 0); // 压低反对 = 收益
  if (fx.attr) for (const k in fx.attr) a.attr += Number(fx.attr[k]) || 0;
  return a;
}
function subVec(x, y) { const r = {}; for (const k of AXES) r[k] = (x[k] || 0) - (y[k] || 0); return r; }
function negScalar(v) { let s = 0; for (const k of AXES) if (v[k] < 0) s += v[k]; return s; }
function posScalar(v) { let s = 0; for (const k of AXES) if (v[k] > 0) s += v[k]; return s; }
/* 负债强度：cost 与 lev 的合计（越大越“要命”）。 */
function liability(ch, okFx) {
  let L = 0;
  if (ch.cost) for (const k in ch.cost) if (k !== "attr") L += Math.abs(Number(ch.cost[k]) || 0);
  if (okFx && okFx.lev) L += Number(okFx.lev) || 0;
  return L;
}

/* 逐选项：取“典型成功(ok)”的收益向量作代表，附 jackpot(crit)、downside(最差档 netScore)、把握度 base。 */
/* 尾部负债：下行档（meh/fail/critfail）里新埋的 flag / 把柄 / fall / hardEnd 都算“要命”
 * —— 一个“看着净赚但会招来调查/丑闻/下野”的贪婪项，不该被当成无脑最优。 */
function tailDanger(oc) {
  let flags = 0, lev = 0, hard = 0;
  ["meh", "fail", "critfail"].forEach(function (t) {
    const fx = (oc[t] || {}).effects; if (!fx) return;
    flags += [].concat(fx.flags || []).length;
    [].concat(fx.notFlags || []); // 撤回不算负债
    if (typeof fx.lev === "number" && fx.lev > 0) lev += fx.lev;
    if (fx.hardEnd != null || fx.fall != null) hard += 5;
  });
  return { flags: flags, lev: lev, hard: hard };
}
function scanEvent(rv, g) {
  return (rv.choices || []).map(function (ch) {
    const oc = ch.outcomes || {};
    const cost = axisVec(ch.cost);
    const ok = subVec(axisVec((oc.ok || {}).effects), cost);
    const crit = subVec(axisVec((oc.crit || {}).effects), cost);
    const downsideNets = ["meh", "fail", "critfail"].map(function (t) {
      const o = oc[t]; return o ? P.netScore(o.effects, g, rv) - (ch.cost ? P.netScore(ch.cost, g, rv) : 0) : null;
    }).filter(function (x) { return x != null; });
    const netOK = P.netScore((oc.ok || {}).effects, g, rv) - (ch.cost ? P.netScore(ch.cost, g, rv) : 0);
    const worst = downsideNets.length ? Math.min.apply(null, downsideNets) : 0;
    const td = tailDanger(oc);
    const lev = liability(ch, (oc.critfail || oc.fail || {}).effects);
    /* 综合危险度：越低越“安全”。占优者必须在安全上也不吃亏。 */
    const danger = worst - 2 * td.flags - td.hard - td.lev - lev;
    return {
      id: ch.id || "?",
      text: (ch.text || "").slice(0, 24),
      base: (typeof ch.base === "number" ? ch.base : NaN),
      ok: ok, crit: crit, netOK: netOK, worst: worst, lev: lev, danger: danger,
      tailFlags: td.flags + (td.hard ? 1 : 0)
    };
  });
}

/* 归一化：把同事件内各轴按“该轴跨选项的最大绝对值”缩放到 [-1,1]，便于跨轴比大小。 */
function normalize(opts) {
  const scale = {}; AXES.forEach(function (k) { scale[k] = 0; });
  opts.forEach(function (o) { AXES.forEach(function (k) { scale[k] = Math.max(scale[k], Math.abs(o.ok[k]), Math.abs(o.crit[k])); }); });
  AXES.forEach(function (k) { if (!scale[k]) scale[k] = 1; });
  return function (vec) { const r = {}; AXES.forEach(function (k) { r[k] = vec[k] / scale[k]; }); return r; };
}

/* 主导轴：某选项收益集中在哪根轴（归一后最大）。 */
function dominantAxis(nv) { let best = null, bv = -1; AXES.forEach(function (k) { if (nv[k] > bv) { bv = nv[k]; best = k; } }); return bv > 0.15 ? best : null; }

const EPS = 0.06;      // 归一向量上“算持平”的容差
const FLAT_BASE = 0.06; // base 差小于此 → 风险无差异

/* ---------- 主遍历 ---------- */
const dominated = [];   // {id, reason, sig}
const flat = [];
const sameAxis = [];
const rows = [];

P.events.forEach(function (ev) {
  const rv = ev.dyn ? P.realize(ev) : ev;
  const g = P.gradeOf(ev);
  const opts = scanEvent(rv, g);
  if (opts.length < 2) return;
  const nz = normalize(opts);
  const no = opts.map(function (o) { return Object.assign({}, o, { nok: nz(o.ok), ncrit: nz(o.crit) }); });
  rows.push({ ev: ev, opts: no });

  /* ① 占优：X 压住 Y —— 每一轴 ok 都不差、base 不低、且综合 danger 不更糟（保底/埋雷
   *    都算进去），至少一项严格更优。这样才能排除“安全躺平保底”与“看着赚但埋雷”的误判。 */
  const DTOL = 1.2;   // danger 上“算持平”的容差（净值域）
  const losers = new Set();
  for (const X of no) for (const Y of no) {
    if (X === Y) continue;
    let allGE = true, anyStrict = false;
    for (const k of AXES) {
      /* 两头都要压住：典型成功(ok) 与 jackpot(crit)。否则“低把握高天花板”的
       * 赌注型选项会被误判（它的价值在 crit 不在 ok）。 */
      if (X.nok[k] < Y.nok[k] - EPS || X.ncrit[k] < Y.ncrit[k] - EPS) { allGE = false; break; }
      if (X.nok[k] > Y.nok[k] + EPS || X.ncrit[k] > Y.ncrit[k] + EPS) anyStrict = true;
    }
    if (!allGE) continue;
    const betterOdds = X.base >= Y.base - 0.01;
    const saferOrEq = X.danger >= Y.danger - DTOL;
    if (!betterOdds || !saferOrEq) continue;
    /* 必须是“真金白银的某一轴更高”才算占优；base/danger 只能当附加条件。
     * 且被压项 Y 必须自身有可测收益——否则“奖励走 flag/叙事”的空向量项（纯保底/纯剧情）会被误杀。
     * 这恰好精准命中“A+$500k B+$300k C+$100k”同形状递减的真诱饵。 */
    const Ypaid = (posScalar(Y.nok) + posScalar(Y.ncrit)) > EPS;
    if (anyStrict && Ypaid) losers.add(Y.id);
  }
  if (losers.size) dominated.push({ id: ev.id, cat: ev.category, losers: [...losers], opts: no });

  /* ② 过平：base 挤一起 且 各选项 ok 向量彼此几乎一样 */
  const bases = no.map(o => o.base).filter(b => !isNaN(b));
  const baseSpread = bases.length ? Math.max.apply(null, bases) - Math.min.apply(null, bases) : 0;
  let maxPairGap = 0;
  for (const X of no) for (const Y of no) {
    if (X === Y) continue;
    let gap = 0; for (const k of AXES) gap = Math.max(gap, Math.abs(X.nok[k] - Y.nok[k]));
    maxPairGap = Math.max(maxPairGap, gap);
  }
  const anyJackpot = no.some(o => posScalar(o.ncrit) - posScalar(o.nok) > 0.5); // crit 明显≠ok（有赌注）
  const anyPain = no.some(o => o.worst < -1.5);                                  // 有真实痛感下行
  if (baseSpread <= FLAT_BASE && maxPairGap <= 0.18 && !anyJackpot && !anyPain) {
    flat.push({ id: ev.id, cat: ev.category, baseSpread: baseSpread, gap: maxPairGap, opts: no });
  }

  /* ③ 同轴单调：所有正收益都压同一根轴 且 钱多者 base 不更低（无风险补偿） */
  const doms = no.map(o => dominantAxis(o.nok));
  const shared = doms.every(d => d && d === doms[0]);
  if (shared && doms[0]) {
    const byVal = no.slice().sort((a, b) => a.nok[doms[0]] - b.nok[doms[0]]);
    let monotoneNoRisk = true;
    for (let i = 1; i < byVal.length; i++) if (byVal[i].base > byVal[i - 1].base + 0.01) { monotoneNoRisk = false; break; }
    if (monotoneNoRisk && doms.length >= 2) sameAxis.push({ id: ev.id, cat: ev.category, axis: doms[0], opts: no });
  }
});

/* ---------- 输出 ---------- */
const S = "\n";
function hr(t) { return S + "== " + t + " ".repeat(Math.max(0, 58 - t.length)) + " =="; }
function sig(o) {
  return "    · " + (o.id + "  ").padEnd(16) + "base=" + (isNaN(o.base) ? " ?  " : o.base.toFixed(2)) +
    "  [钱" + o.ok.money.toFixed(1) + " 人脉" + o.ok.people.toFixed(1) + " 声望" + o.ok.rep.toFixed(1) +
    " 选民" + o.ok.voters.toFixed(0) + " 属性" + o.ok.attr.toFixed(1) + "]  worst=" + o.worst.toFixed(2) +
    " danger=" + o.danger.toFixed(1) + " 尾雷=" + o.tailFlags;
}
const onlyDetail = process.argv.includes("--only=ev");

console.log(hr("① 占优事件（存在被完全压住的诱饵选项 → 无脑选）"));
if (!dominated.length) console.log("  无");
dominated.forEach(function (d) {
  if (onlyDetail) return;
  console.log("  " + d.id + "  被跳过项: " + d.losers.join(",") + "  [" + d.cat + "]");
  d.opts.forEach(o => console.log(sig(o)));
});
console.log("  小计：" + dominated.length + " / " + rows.length + " 个多选项事件");

console.log(hr("② 过平事件（选项彼此几乎无差 → 闭眼选）"));
if (!flat.length) console.log("  无");
flat.forEach(function (d) {
  if (onlyDetail) return;
  console.log("  " + d.id + "  baseSpread=" + d.baseSpread.toFixed(2) + " 向量最大差=" + d.gap.toFixed(2) + "  [" + d.cat + "]");
  d.opts.forEach(o => console.log(sig(o)));
});
console.log("  小计：" + flat.length);

console.log(hr("③ 同轴单调（收益全挤一根轴且无风险补偿）"));
if (!sameAxis.length) console.log("  无");
sameAxis.forEach(function (d) {
  if (onlyDetail) return;
  console.log("  " + d.id + "  轴=" + d.axis + "  [" + d.cat + "]");
  d.opts.forEach(o => console.log(sig(o)));
});
console.log("  小计：" + sameAxis.length);

console.log(hr("摘要"));
const flagged = new Set([].concat(dominated.map(d => d.id), flat.map(d => d.id), sameAxis.map(d => d.id)));
console.log("  多选项事件 " + rows.length + " ｜ 被标记（需重塑取舍）" + flagged.size +
  " ｜ 占优 " + dominated.length + " / 过平 " + flat.length + " / 同轴 " + sameAxis.length);
if (flagged.size) console.log("  待处理清单：" + [...flagged].join(", "));

if (process.argv.includes("--json")) {
  console.log("\n--JSON--");
  console.log(JSON.stringify({
    multiChoice: rows.length, flagged: [...flagged],
    dominated: dominated.map(d => ({ id: d.id, losers: d.losers })),
    flat: flat.map(d => ({ id: d.id, baseSpread: +d.baseSpread.toFixed(2), gap: +d.gap.toFixed(2) })),
    sameAxis: sameAxis.map(d => ({ id: d.id, axis: d.axis }))
  }));
}
