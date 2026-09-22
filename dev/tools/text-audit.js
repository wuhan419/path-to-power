/* ============================================================================
 * POTUS · tools/text-audit.js
 * 事件【文字】审计器（终端报告）。落实用户的编辑规范（见 CONTENT-SCHEMA §11.6 原则五）：
 *   ① 标题（title）必须是一句通顺、完整、一眼看懂「发生了什么」的陈述句；
 *      比喻/留白/意象这类文学性写法应放进 body，不拿它当标题。
 *   ② 正文说明（body）尽量精简，控制在 200 字以内。
 *   ③ 每个事件都要有说明（body）与背景卡（brief）。
 *
 * 本工具【不自动改写】，只做量化与列清单，供人工逐条重塑。可测量 → 可追踪进度。
 *
 * 用法：
 *   node tools/text-audit.js                 → 汇总（多少事件、多少超标）
 *   node tools/text-audit.js --long          → 列出 body 超字的事件（按字数降序）
 *   node tools/text-audit.js --nobrief       → 列出缺 body / 缺 brief 的事件
 *   node tools/text-audit.js --titles        → 逐条打印「文件 | id | 标题 | 标题字数 | 正文字数」供肉眼审视标题
 *   node tools/text-audit.js --limit=160     → 自定义正文字数上限（默认 200）
 *   node tools/text-audit.js --file=80-shady → 只看某个源文件的事件
 * ==========================================================================*/
"use strict";
const fs = require("fs");
const path = require("path");

/* ---------- 宿主环境 stub（与 validate.js / choice-audit.js 同款） ---------- */
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

/* ---------- 命令行参数 ---------- */
const argv = process.argv.slice(2);
const arg = (name, def) => { const m = argv.find(a => a.startsWith("--" + name + "=")); return m ? m.split("=").slice(1).join("=") : def; };
const has = (name) => argv.includes("--" + name);
const LIMIT = parseInt(arg("limit", "200"), 10);
const ONLY_FILE = arg("file", null);

/* ---------- 源文件 → 事件 id 归属映射（编辑时用来定位文件） ---------- */
const EVENTS_DIR = path.join(ROOT, "content", "events");
const fileOfId = {};
(function buildFileMap() {
  const files = [];
  if (fs.existsSync(EVENTS_DIR)) fs.readdirSync(EVENTS_DIR).filter(f => f.endsWith(".js")).forEach(f => files.push(path.join(EVENTS_DIR, f)));
  // 少数事件定义在 content 根（如 61-campaigns.js / 30-fillers.js）—— 一并扫
  fs.readdirSync(path.join(ROOT, "content")).filter(f => f.endsWith(".js")).forEach(f => files.push(path.join(ROOT, "content", f)));
  for (const fp of files) {
    const txt = fs.readFileSync(fp, "utf8");
    const rel = path.relative(ROOT, fp);
    for (const m of txt.matchAll(/["']?id["']?\s*:\s*["']([a-zA-Z0-9_]+)["']/g)) {
      const id = m[1];
      if (!(id in fileOfId)) fileOfId[id] = rel;
    }
  }
})();

/* ---------- 统计口径 ---------- */
/* 「字」= 去掉所有空白后的字符数（中英都按字符计，够用来卡 200 字上限）。 */
function charCount(s) { return (s || "").replace(/\s+/g, "").length; }
function hasBrief(ev) {
  const b = ev.brief;
  if (!b) return false;
  const arrLen = (a) => Array.isArray(a) ? a.length : 0;
  return !!(b.lede || arrLen(b.known) || arrLen(b.rumor) || arrLen(b.unknown) || arrLen(b.terms));
}

/* 把 realized 的 P.events 映射回 authored 文本（title/body/brief 不受 realize 影响）。 */
const events = (P.events || []).slice();
function fileFilter(ev) {
  if (!ONLY_FILE) return true;
  const f = fileOfId[ev.id] || "";
  return f.indexOf(ONLY_FILE) >= 0;
}

const rows = events.filter(fileFilter).map(ev => ({
  file: fileOfId[ev.id] || "(未定位)",
  id: ev.id,
  title: ev.title || "",
  titleLen: charCount(ev.title),
  bodyLen: charCount(ev.body),
  hasBody: !!(ev.body && String(ev.body).trim()),
  hasBrief: hasBrief(ev),
  nChoices: (ev.choices || []).length,
  longBody: charCount(ev.body) > LIMIT
}));

const total = rows.length;
const nLong = rows.filter(r => r.longBody).length;
const nNoBody = rows.filter(r => !r.hasBody).length;
const nNoBrief = rows.filter(r => !r.hasBrief).length;
const nShortTitle = rows.filter(r => r.titleLen > 0 && r.titleLen < 8).length;

/* ---------- 报告 ---------- */
function pad(s, n) { s = String(s); return s.length >= n ? s : s + " ".repeat(n - s.length); }

if (has("long")) {
  console.log("== body 超 " + LIMIT + " 字的事件（降序，共 " + nLong + " 个）==");
  rows.filter(r => r.longBody).sort((a, b) => b.bodyLen - a.bodyLen)
    .forEach(r => console.log("  " + pad(r.bodyLen, 5) + " 字  " + pad(r.file, 34) + "  " + r.id));
} else if (has("nobrief")) {
  console.log("== 缺 body（" + nNoBody + "）/ 缺 brief（" + nNoBrief + "）==");
  rows.filter(r => !r.hasBody || !r.hasBrief).forEach(r =>
    console.log("  " + pad(r.file, 34) + "  " + pad(r.id, 26) + (r.hasBody ? "" : " [无body]") + (r.hasBrief ? "" : " [无brief]")));
} else if (has("titles")) {
  console.log("== 全部标题（" + (ONLY_FILE ? "仅 " + ONLY_FILE : total + " 个事件") + "）供肉眼审视「是否一目了然」==");
  rows.slice().sort((a, b) => a.file.localeCompare(b.file) || a.id.localeCompare(b.id)).forEach(r =>
    console.log("  " + pad(r.file.replace(/^content\//, ""), 30) + "  " + pad("T" + r.titleLen, 4) + " B" + pad(r.bodyLen, 4) + "  " + r.title + "   ⟨" + r.id + "⟩"));
} else {
  console.log("== POTUS 事件文字审计（上限 " + LIMIT + " 字/正文）==");
  console.log("  事件总数        : " + total);
  console.log("  body 超 " + LIMIT + " 字  : " + nLong + "  →  node tools/text-audit.js --long");
  console.log("  缺 body         : " + nNoBody);
  console.log("  缺 brief        : " + nNoBrief + "  →  --nobrief");
  console.log("  标题 <8 字(可疑): " + nShortTitle + "  →  --titles 逐条审视");
  console.log("  （标题是否一目了然需人工判断；--titles 可加 --file=xx 只看一个文件）");
}
