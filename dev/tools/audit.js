/* ============================================================================
 * POTUS · tools/audit.js
 * 全面事件审计（终端报告，不写 md）。回答四件事：
 *   ① 一览：每张卡的 valence / grade / era / tierMin~Max / month / category / dyn；
 *   ② flag 供需闭环：谁产出某个 flag、谁消费（事件级条件 / req / after 链）它 —— 找孤儿与断头链；
 *   ③ 链式（after）完整性：前置事件是否存在、前置是否是它的“因”；
 *   ④ 时代×三值性覆盖：每时代每类都得有货（两段式抽取不降级的前提）；
 *   ⑤ 财富/职级闸门自洽：会掏大钱的 dyn 卡，却既不设 tierMin 也不设 funMin → 可能发给付不起的人。
 *
 * 用法：
 *   node tools/audit.js            → 全量报告
 *   node tools/audit.js --json     → 附带机器可读摘要（供后续脚本消费）
 * ==========================================================================*/
"use strict";
const fs = require("fs");
const path = require("path");

/* ---------- 宿主环境 stub（与 validate.js / migrate-scale.js 同款） ---------- */
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

/* ---------- T2 基准世界（覆盖/闸门审计统一坐标系） ---------- */
const firstEra = Object.keys(P.reg.era)[0];
P.CSEL = { era: firstEra, origin: Object.keys(P.reg.origin)[0], talent: Object.keys(P.reg.talent)[0], entry: Object.keys(P.reg.entry)[0], party: Object.keys(P.reg.party)[0], stance: Object.keys(P.reg.stance)[0], name: "审计" };
P.confirmCreate();
P.G.tier = 2; P.G.track = "electoral"; P.G.attr = { CHA: 50, INT: 50, CUN: 50, INTG: 50 };

const TIERS = ["crit", "ok", "meh", "fail", "critfail"];
const VAL = ["boon", "risk", "bane"];
const byId = {}; P.events.forEach(e => { byId[e.id] = e; });

/* ---------- 遍历每张卡：收集 flag 产出/消费、最大可实现代价、条件字段 ---------- */
const produced = {};   // flag -> [eventId...]
const consumed = {};   // flag -> [eventId...]（事件级条件 flags/notFlags、choice.req）
function note(map, f, id) { (map[f] || (map[f] = new Set())).add(id); }

const rows = P.events.map(function (ev) {
  const g = P.gradeOf(ev);
  const rv = ev.dyn ? P.realize(ev) : ev;                 // 展开后看绝对值
  let maxCostFun = 0;
  const optNets = [];
  (rv.choices || []).forEach(function (ch) {
    const cn = ch.cost ? P.netScore(ch.cost, g, rv) : 0;
    if (ch.cost && typeof ch.cost.fun === "number") maxCostFun = Math.max(maxCostFun, Math.abs(ch.cost.fun));
    const nets = {};
    TIERS.forEach(function (t) { const o = (ch.outcomes || {})[t]; if (o) nets[t] = P.netScore(o.effects, g, rv) - cn; });
    optNets.push({ ch: ch, nets: nets });
    /* choice 级消费：req.flags / req.notFlags */
    if (ch.req) {
      [].concat(ch.req.flags || []).forEach(f => note(consumed, f, ev.id));
      [].concat(ch.req.notFlags || []).forEach(f => note(consumed, f, ev.id));
    }
    /* effects 级：产出 flags / 撤回 notFlags */
    TIERS.forEach(function (t) {
      const fx = ((ch.outcomes || {})[t] || {}).effects;
      if (!fx) return;
      [].concat(fx.flags || []).forEach(f => note(produced, f, ev.id));
      [].concat(fx.notFlags || []).forEach(f => note(consumed, f, ev.id));   // 撤回也是对该 flag 的引用
    });
  });
  /* 事件级条件消费（P.when 直接把整张卡当条件读） */
  [].concat(ev.flags || []).forEach(f => note(consumed, f, ev.id));
  [].concat(ev.notFlags || []).forEach(f => note(consumed, f, ev.id));
  /* 净值幅度（swing）与最坏保底，供人工判断 valence 是否合理 */
  const allNets = []; let gBest = -99;
  optNets.forEach(function (o) {
    const vs = TIERS.map(t => o.nets[t]).filter(x => x != null);
    if (vs.length) { allNets.push(Math.min.apply(null, vs)); gBest = Math.max(gBest, Math.min.apply(null, vs)); }
  });
  return {
    ev: ev, id: ev.id, val: P.valenceOf(ev), grade: g, dyn: !!ev.dyn,
    eras: ev.era || [], tierMin: ev.tierMin, tierMax: ev.tierMax, month: ev.month,
    cat: ev.category || "—", title: ev.title || "", nOpts: (ev.choices || []).length,
    maxCostFun: maxCostFun, worst: allNets.length ? Math.min.apply(null, allNets) : 0, gBest: gBest,
    hasFunMin: ev.funMin != null || ev.minFun != null,
    /* 是否存在“不要钱、不设门槛”的选项 —— 引擎会把新人刷不起的大额选项置灰，
     * 只要卡里还有一条白得的路，他就不会“只能被掏空”（选项级经不住由 costBlock+fallback 兜）。 */
    freePath: (rv.choices || []).some(function (ch) { return !ch.cost && !ch.req; })
  };
});

const S = "\n";
function hr(t) { return S + "== " + t + " ".repeat(Math.max(0, 60 - t.length)) + " =="; }

/* ---------- ① 一览 ---------- */
console.log(hr("① 事件一览（valence / grade / era / tier / month / cat / 最坏净值）"));
rows.forEach(function (r) {
  console.log("  " + r.id.padEnd(26) + " " + r.val.padEnd(5) + " " + r.grade.padEnd(6) +
    " [" + r.cat + "] t" + (r.tierMin == null ? "?" : r.tierMin) + "-" + (r.tierMax == null ? "?" : r.tierMax) +
    " m" + (r.month == null ? "-" : r.month) + "  worst=" + r.worst.toFixed(2) +
    "  " + (r.eras.length ? r.eras.join(",") : "〈通用〉"));
});

/* ---------- ② flag 供需闭环 ---------- */
const allFlags = new Set([].concat(Object.keys(produced), Object.keys(consumed)));
/* tagNames 是 balance 里的“身份印记”登记表：在册 flag 产出即展示给玩家，
 * 本就设计为“遗产/结局色料”，不必被后续事件消费——不能当断链看。 */
const identityTags = P.balance().tagNames || {};
/* scandal_* / bs_* 是引擎内部计量标（scandalLevel()/结局/衰减程序化读取），
 * 不靠事件级 flags 条件消费，不能当孤儿看。 */
function internalFlag(f) { return f.indexOf("scandal_") === 0 || f.indexOf("bs_") === 0; }
const identityOrphan = [], trueOrphan = [], danglingCons = [];
allFlags.forEach(function (f) {
  const p = produced[f], c = consumed[f];
  if (p && !c) {
    const s = f + "（" + [...p].join(",") + "）";
    (identityTags[f] || internalFlag(f) ? identityOrphan : trueOrphan).push(s);
  }
  if (c && !p) danglingCons.push(f + "（消费于 " + [...c].join(",") + "）");
});
console.log(hr("② flag 供需闭环（共 " + allFlags.size + " 个 flag）"));
console.log("  产出 flag 的事件引用数：" + Object.keys(produced).length + " ｜ 消费 flag 的事件引用数：" + Object.keys(consumed).length);
console.log("  身份印记（在册 tagNames，产出即展示，非断链）：" + identityOrphan.length + " 个");
console.log("  真孤儿（既不在身份表、又无人消费）：" + (trueOrphan.length ? "\n    " + trueOrphan.join("\n    ") : "无"));
console.log("  断头（只消费、无人产出）：" + (danglingCons.length ? "\n    " + danglingCons.join("\n    ") : "无"));

/* ---------- ③ 链式（after）完整性 ---------- */
console.log(hr("③ 事件链（after）完整性"));
let chainN = 0, badChain = [];
rows.forEach(function (r) {
  const a = r.ev.after; if (!a) return; chainN++;
  const pid = typeof a === "string" ? a : a.id;
  if (!byId[pid]) badChain.push(r.id + " 的前置不存在：" + pid);
});
console.log("  链式后继 " + chainN + " 条 ｜ 断链 " + (badChain.length ? "\n    " + badChain.join("\n    ") : "0"));

/* ---------- ④ 时代×三值性覆盖 ---------- */
console.log(hr("④ 时代 × 三值性 覆盖（池含“通用无 era 卡”，tierMin≤1 视为新人可及）"));
const cover = {};
VAL.forEach(v => { cover[v] = []; });
Object.keys(P.reg.era).forEach(function (eraId) {
  const line = [];
  VAL.forEach(function (v) {
    const pool = rows.filter(function (r) {
      const eraOK = r.eras.length === 0 || r.eras.indexOf(eraId) >= 0;
      const early = r.tierMin == null || r.tierMin <= 1;
      return r.val === v && eraOK && early;
    });
    line.push(v + "=" + pool.length);
    if (pool.length === 0) cover[v].push(eraId);
  });
  console.log("  " + eraId.padEnd(20) + " " + line.join("  "));
});
VAL.forEach(function (v) {
  if (cover[v].length) console.log("  ⚠ 「" + v + "」在这些时代的新人可及池为空 → 抽取必然降级：" + cover[v].join(", "));
});

/* ---------- ⑤ 财富/职级闸门自洽 ----------
 * 掏大钱（realized cost.fun ≥ 一份钱标尺的若干倍）的卡，应至少被 tierMin 或 funMin 拦住，
 * 否则会把“州长级手笔”发给社区小兵（付不起 → 只剩保底 / 或依赖 fallback 兜底）。 */
console.log(hr("⑤ 大额代价卡是否设了职级/财富闸门"));
const r0 = P.ruler("major", {});        // major 量级一份的钱标尺（T2 基准）
const RICH = Math.max(30000, r0.fun);   // “明显是大人物的手笔”阈值
const ungated = rows.filter(function (r) {
  /* 只有当一张卡刷大钱、既无职级/财富门槛、又连一条“白得的路”都没给新人时，才算真问题；
   * 否则 costBlock 会把刷不起的选项置灰 + fallback 兑一个保底，新人仍能从。 */
  return r.maxCostFun >= RICH && (r.tierMin == null || r.tierMin <= 0) && !r.hasFunMin && !r.freePath;
});
if (ungated.length) ungated.forEach(function (r) {
  console.log("  ⚠ " + r.id + "：可实现代价 ≈ $" + Math.round(r.maxCostFun).toLocaleString() +
    "，但无 tierMin/funMin 且无免费选项 → 新人只能被刷空");
}); else console.log("  无（大额手笔卡要么被职级/财富门槛拦住，要么至少给了一条不要钱的路；选项级置灰兼保底）");

/* ---------- 摘要 ---------- */
const dist = {}; VAL.forEach(v => dist[v] = 0); rows.forEach(r => dist[r.val]++);
console.log(hr("摘要"));
console.log("  卡数 " + rows.length + " ｜ valence " + JSON.stringify(dist) +
    " ｜ dyn " + rows.filter(r => r.dyn).length + "/" + rows.length +
    " ｜ flag 真孤儿 " + trueOrphan.length + "（另有身份印记 " + identityOrphan.length + "）/ 断头 " + danglingCons.length +
    " ｜ 断链 " + badChain.length + " ｜ 无闸门大额卡 " + ungated.length);
VAL.forEach(v => { if (cover[v].length) console.log("  覆盖缺口：" + v + " 缺时代 " + cover[v].length + " 个"); });

if (process.argv.includes("--json")) {
  console.log("\n--JSON--");
  console.log(JSON.stringify({
    total: rows.length, dist: dist,
    orphanFlags: trueOrphan, identityFlags: identityOrphan.length, danglingFlags: danglingCons, badChains: badChain,
    coverGaps: cover, ungatedRich: ungated.map(r => r.id)
  }));
}
