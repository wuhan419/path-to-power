/* 年度大事密度：按引擎真实口径逐年数定点事件，比对 1980—1988 基准与 1991—2024。
   A = fixed 注册表 + era.scheduled（到点必发）
   B = minYear===maxYear 的钉年卡
   C = era 覆盖该年的可抽卡（年代池，只作背景，不算年度大事）
   口径与门禁见 docs/PARALLEL-CONTENT-WORK.md §4.1：逐年 Σ=A+B 不得低于 1980—1988 均值。
   用法：node dev/tools/density-scan.js [--root=dist]   （默认量 dev/） */
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
const POT = new Function(srcs.map((s) => fs.readFileSync(path.join(ROOT, s), "utf8")).join("\n;\n") + "\n;POTUS.boot();\n;return POTUS;")();

const list = POT.events || [];
const eras = POT.reg.era || {};
const fixed = POT.reg.fixed || [];

const starts = Object.entries(eras).map(([id, e]) => ({ id, y: e.startYear })).sort((a, b) => a.y - b.y);
const range = {};
starts.forEach((s, i) => { range[s.id] = [s.y, i + 1 < starts.length ? starts[i + 1].y : 2030]; });

const A = new Map(), B = new Map(), C = new Map(), who = {};
const bump = (m, y) => m.set(y, (m.get(y) || 0) + 1);
const note = (y, s) => { (who[y] = who[y] || []).push(s); };

for (const f of fixed) if (f.year) { bump(A, f.year); note(f.year, "fixed:" + (f.event || f.id)); }
for (const [id, e] of Object.entries(eras)) for (const s of (e.scheduled || [])) { bump(A, s.year); note(s.year, "sched:" + s.event); }
for (const ev of list) {
  if (ev.minYear != null && ev.minYear === ev.maxYear) { bump(B, ev.minYear); note(ev.minYear, "pin:" + ev.id); }
  for (const eid of (ev.era || [])) {
    const r = range[eid]; if (!r) continue;
    for (let y = r[0]; y <= Math.min(r[1] - 1, 2024); y++) bump(C, y);
  }
}
const avg = (a, b, m) => { let s = 0, n = 0; for (let y = a; y <= b; y++) { s += m.get(y) || 0; n++; } return s / n; };
console.log("boot：" + path.relative(path.resolve(__dirname, "..", ".."), ROOT) + "/index.html ｜ 事件卡 " + list.length + " ｜ fixed " + fixed.length + " ｜ era " + Object.keys(eras).length);
console.log("                    1980—1988   1991—2024");
console.log("A 到点必发 /yr  " + avg(1980, 1988, A).toFixed(2).padStart(8) + "   " + avg(1991, 2024, A).toFixed(2).padStart(8));
console.log("B 钉年卡   /yr  " + avg(1980, 1988, B).toFixed(2).padStart(8) + "   " + avg(1991, 2024, B).toFixed(2).padStart(8));
console.log("A+B 年度大事/yr " + (avg(1980, 1988, A) + avg(1980, 1988, B)).toFixed(2).padStart(8) + "   " + (avg(1991, 2024, A) + avg(1991, 2024, B)).toFixed(2).padStart(8));
console.log("C 年代池   /yr  " + avg(1980, 1988, C).toFixed(2).padStart(8) + "   " + avg(1991, 2024, C).toFixed(2).padStart(8));

const base = avg(1980, 1988, A) + avg(1980, 1988, B);
const thin = [];
console.log("\n逐年（A=必发 B=钉年 C=年代池，Σ=A+B）：");
for (let y = 1980; y <= 2024; y++) {
  const a = A.get(y) || 0, b = B.get(y) || 0, c = C.get(y) || 0, t = a + b;
  if (t < base && y >= 1991) thin.push(y + "(" + t + ")");
  console.log("  " + y + "  A" + String(a).padStart(2) + " B" + String(b).padStart(2) + " C" + String(c).padStart(3) + "  Σ" + t + (t < base ? "   ✗ < " + base.toFixed(2) : ""));
}
console.log("\n偏薄年份（1991 之后 Σ < 基准 " + base.toFixed(2) + "）：" + (thin.length ? thin.join(" ") : "无"));
if (thin.length) process.exitCode = 1;

const title = {};
for (const ev of list) title[ev.id] = ev.title;
console.log("\n=== 1991—2024 逐年年度大事（标题）===");
for (let y = 1991; y <= 2024; y++) {
  const seen = new Set();
  const items = [];
  for (const s of (who[y] || [])) {
    const id = s.split(":")[1];
    if (seen.has(id)) continue; seen.add(id);
    items.push((title[id] || "‹" + id + " 无标题›") + "⟨" + id + "⟩");
  }
  console.log("  " + y + " · " + items.join(" ｜ "));
}
