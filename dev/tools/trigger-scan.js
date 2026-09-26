/* ============================================================================
 * tools/trigger-scan.js —— #33/#32 钉卡密度与触发门禁（结构口径）
 * 对开局年—balance.endYear 逐年、取低/中/高三档层级（tier 0/4/8），把每一条钉卡
 * （reg.fixed ∪ 任一 era.scheduled）拿引擎真实的 P.eligible() 过一遍闸：
 *   · 先复现 time.js normalizePins 的效果（钉卡 tierMax 抬到「总统以下」= tierTop()-1；
 *     卡上写了总统决策档的那几张才放到顶层 —— 所以本扫描的三档最高取 tier 8，正落在放行侧），
 *   · 逐卡分类失败原因：noEvent / tierMin / tierMax / yearWin / era / when / ok。
 * 「tierMin 挡掉」按设计不计入荒（底层玩家还没资格卷入高层专属卡）。
 * 两条验收线：
 *   ① #33：1991—2024 的钉卡在 tier8 档位结构可发率 ≥80%；死引用（noEvent）为零。
 *   ② #32：每个历史年 ≥--min-per-year（默认 2）条钉卡 —— 固定历史事件是玩家最看重的
 *      一类，"到点必演"不能靠运气。随机限流（pace.yearRandomMax）把节奏空档让出来之后，
 *      必须由钉卡填上，否则多年会真的空白。
 * 用法：node dev/tools/trigger-scan.js [--root=dist] [--verbose] [--min-per-year=2]
 * ==========================================================================*/
"use strict";
const fs = require("fs");
const path = require("path");
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

const arg = (name, dft) => { const m = process.argv.find((a) => a.startsWith("--" + name + "=")); return m ? m.split("=")[1] : dft; };
const ROOT = path.resolve(__dirname, "..", arg("root", "."));
const srcs = [...fs.readFileSync(path.join(ROOT, "index.html"), "utf8").replace(/<!--[\s\S]*?-->/g, "")
  .matchAll(/<script\s+src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const P = new Function(srcs.map((s) => fs.readFileSync(path.join(ROOT, s), "utf8")).join("\n;\n") + "\n;POTUS.boot();\n;return POTUS;")();

/* 1) 收集钉卡：year → [eventId]（fixed 全局表 + 各 era.scheduled，与 scheduledHits 同路） */
const pinsByYear = new Map();
const allPins = new Set();
function take(list) {
  for (const s of (list || [])) {
    if (!s.event) continue;
    const ys = [];
    if (s.year != null) ys.push(s.year);
    else if (s.fromYear != null) for (let y = s.fromYear; y <= (s.toYear ?? s.fromYear); y++) ys.push(y);
    for (const y of ys) {
      if (!pinsByYear.has(y)) pinsByYear.set(y, []);
      if (!pinsByYear.get(y).includes(s.event)) pinsByYear.get(y).push(s.event);
      allPins.add(s.event);
    }
  }
}
take(P.reg.fixed);
for (const id in (P.reg.era || {})) take(P.reg.era[id].scheduled);

/* 2) 复现 normalizePins：钉卡 tierMax 抬到「总统以下」；写了总统决策档的才到顶层
   （判据与 time.js 共用 P.pinPresidentView / P.tierTop，别再各写各的 9） */
let raised = 0, presOpen = 0;
const TOP = P.tierTop();
for (const ev of P.events) {
  if (!allPins.has(ev.id)) continue;
  const cap = P.pinPresidentView(ev) ? TOP : TOP - 1;
  if (cap === TOP) presOpen++;
  if (ev.tierMax == null && cap === TOP) continue;
  if (ev.tierMax === cap) continue;
  ev.tierMax = cap; raised++;
}

/* 3) 结构可发性：假 G + 快照走真实 P.when / yearOK / mediumOK。
 *    钉卡常按身份圈定（tracks/parties/stances/…）——这是设计而非荒，
 *    所以闸失败时逐维换身份重试：只要存在一种身份发得出来就算可发。
 *    --strict-chains：续幕（after 前卡）一律记 chain、不计入可发（链条体检用）。 */
const strictChains = process.argv.includes("--strict-chains");
const DIMS = [
  ["track", "tracks", "trackIn"], ["party", "parties", "partyIn"],
  ["stance", "stances"], ["origin", "origins", "originIn"],
  ["entry", "entries", "entryIn"], ["talent", "talents"], ["state", "states"]
];
function hasDim(ev, dim) {
  for (const k of DIMS[dim]) if (ev[k] != null) return true;
  return false;
}
function fireOnce(ev, year, tier, idn) {
  const G = {
    era: "1980_REAGAN", year: year, month: 1, age: 30 + tier * 4, tier: tier,
    track: idn.track, party: idn.party, stance: idn.stance, origin: idn.origin,
    entry: idn.entry, talent: idn.talent, state: idn.state,
    rep: 50, hp: 70, fun: 500, fav: 10, lev: 0, ap: 0, attr: {},
    flags: [], contacts: {}, counters: {}, doneIds: [], doneSeq: {}, quietMonths: []
  };
  P.G = G;
  const snap = {
    era: P.eraAt(year), year: year, month: 1, age: G.age, track: G.track, party: G.party,
    stance: G.stance, origin: G.origin, entry: G.entry, talent: G.talent, state: G.state,
    tier: tier, rep: 50, hp: 70, fun: 500, fav: 10, lev: 0, contactN: 0, knownIds: {},
    scandal: 0, tenure: 9999, flags: [], counters: {}, reason: null,
    /* 结构口径默认「链条前情已满足」：注入一个巨大 gap，让 after 闸不吃假失败。
       要核查链条真实连通性用 --strict-chains（撤掉注入，after 挡下的记为 chain）。 */
    gaps: strictChains ? undefined : { "*": 9999 }
  };
  if (!strictChains && ev.after) {
    const prevId = typeof ev.after === "string" ? ev.after : ev.after.id;
    snap.gaps = {}; snap.gaps[prevId] = Math.max(9999, (ev.after.minMonthsAfter || 0) + 999);
  }
  try {
    if (ev.tierMin != null && tier < ev.tierMin) return "tierMin";
    if (ev.tierMax != null && tier > ev.tierMax) return "tierMax";
    /* 严格口径：先按「前卡没演过」判续幕 —— 结构扫描无从判断链条连通性 */
    if (strictChains && ev.after) return "chain";
    if (!P.when(ev, snap)) return "when";
    if (!P.yearOK(ev)) return "yearWin";
    if (!P.mediumOK(ev)) return "medium";
    /* 宽松口径（默认）：after 前情经 gaps 注入视为已满足，续幕按可发计 */
    return "ok";
  } catch (e) {
    return "error:" + e.message;
  } finally {
    P.G = null;
  }
}
function classify(ev, year, tier) {
  if (!ev) return "noEvent";
  const base = { track: "*", party: "*", stance: "*", origin: "*", entry: "*", talent: "*", state: "*" };
  let r = fireOnce(ev, year, tier, base);
  if (r === "ok" || r === "tierMin" || r === "tierMax" || r === "noEvent") return r;
  /* 换身份重试：对卡上出现的每一维，逐候选值试 */
  for (let d = 0; d < DIMS.length; d++) {
    if (!hasDim(ev, d)) continue;
    const reg = P.reg[DIMS[d][0]] || {};
    for (const k in reg) {
      const idn = Object.assign({}, base); idn[DIMS[d][0]] = k;
      const rr = fireOnce(ev, year, tier, idn);
      if (rr === "ok" || rr === "chain") return rr;
      if (rr === "tierMin") return "tierMin";
    }
  }
  return r;
}

/* ok 算可发；tierMin / chain 是按设计的不发，不计入荒 */
const DESIGNED_BLOCK = ["tierMin", "chain"];

const TIERS = [0, 4, 8];
const byId = {};
for (const ev of P.events) byId[ev.id] = ev;
const verbose = process.argv.includes("--verbose");
const MIN_PER_YEAR = Number(arg("min-per-year", 2));
const END_YEAR = Number(((P.balance() || {}).endYear) || 2024);
const deadRefs = [];
const deadPins = [];   // 三档全被非 tierMin 闸挡死
const thinYears = [];  // #32：钉卡不足 MIN_PER_YEAR 条的年份
let totalPins91 = 0, fireT8_91 = 0, excl91 = 0;

console.log("boot：" + path.relative(path.resolve(__dirname, "..", ".."), ROOT) + "/index.html" +
  " ｜ 钉卡年份条目 " + [...pinsByYear.values()].reduce((s, l) => s + l.length, 0) +
  " ｜ 规范化改 tierMax " + raised + " 张（放行到总统级 " + presOpen + " 张）｜ 年窗 1980—" + END_YEAR +
  " ｜ 密度验收线 每年 ≥" + MIN_PER_YEAR + " 条");

for (let y = 1980; y <= END_YEAR; y++) {
  const list = pinsByYear.get(y) || [];
  if (list.length < MIN_PER_YEAR) thinYears.push(y + "→" + list.length);
  if (!list.length) continue;
  const stats = {};
  for (const t of TIERS) stats[t] = { ok: 0, excl: 0, other: {} };
  for (const id of list) {
    const ev = byId[id];
    if (!ev && !deadRefs.includes(id)) deadRefs.push(id);
    for (const t of TIERS) {
      const r = classify(ev, y, t);
      if (r === "ok") stats[t].ok++;
      else if (DESIGNED_BLOCK.indexOf(r) >= 0) stats[t].excl++;
      else stats[t].other[r] = (stats[t].other[r] || 0) + 1;
    }
  }
  const blocked = TIERS.map((t) => {
    const s = stats[t];
    const o = Object.entries(s.other).map(([k, v]) => k + "×" + v).join(",");
    return "T" + t + " " + s.ok + "/" + list.length + (s.excl ? " (设计挡" + s.excl + ")" : "") + (o ? " ✗" + o : "");
  });
  console.log("  " + y + " 钉" + String(list.length).padStart(2) + "  " + blocked.join("  "));
  if (verbose) for (const id of list) {
    const r = classify(byId[id], y, 8);
    if (r !== "ok" && DESIGNED_BLOCK.indexOf(r) < 0) console.log("      ✗ " + id + " ← " + r);
  }
  if (stats[8].ok === 0 && list.length) {
    const whyAll = list.map((id) => id + ":" + classify(byId[id], y, 8));
    const onlyDesigned = whyAll.every((w) => DESIGNED_BLOCK.indexOf(w.split(":").pop()) >= 0);
    if (!onlyDesigned) deadPins.push(y + " " + whyAll.join(" "));
  }
  if (y >= 1991) {
    for (const id of list) {
      totalPins91++;
      const r = classify(byId[id], y, 8);
      if (r === "ok") fireT8_91++;
      else if (DESIGNED_BLOCK.indexOf(r) >= 0) excl91++;
    }
  }
}

const rate = (totalPins91 - excl91) ? fireT8_91 / (totalPins91 - excl91) : 1;
console.log("\n1991—2024 钉卡 " + totalPins91 + " 条 ｜ tier8 结构可发 " + fireT8_91 +
  " ｜ 按设计排除(tierMin/chain) " + excl91 + " ｜ 触发率 " + (rate * 100).toFixed(1) + "% （验收线 ≥80%）" +
  (strictChains ? " 【严格链条口径】" : ""));
if (deadRefs.length) console.log("✗ 死引用（fixed/scheduled 指向不存在的事件）：" + deadRefs.join(" "));
if (thinYears.length) console.log("✗ 钉卡不足 " + MIN_PER_YEAR + " 条的年份（#32 要求每个历史年 ≥" + MIN_PER_YEAR + "）：" + thinYears.join(" "));
if (deadPins.length) {
  console.log("✗ 三档全挡死的年份（非设计原因）：");
  deadPins.forEach((s) => console.log("   " + s));
}
if (rate < 0.8 || deadRefs.length || thinYears.length) { process.exitCode = 1; console.log("FAIL"); }
else console.log("PASS");
