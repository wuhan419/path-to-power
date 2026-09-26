/* ============================================================================
 * POTUS · tools/text-audit.js
 * 事件【文字】审计器（终端报告）。落实用户的编辑规范（见 CONTENT-SCHEMA §11.6 原则五、§11.7）：
 *   ① 标题（title）必须是一句通顺、完整、一眼看懂「发生了什么」的陈述句；
 *      比喻/留白/意象这类文学性写法应放进 body，不拿它当标题。
 *   ② #41：一张事件卡只剩「标题 + 正文 + 头条图」—— 背景卡（brief）连同数据一起下线，
 *      斜体导语行（standfirst）也从版式删了。所以正文要自己交代清楚局面，
 *      但预算封顶：标题 + 正文 ≤250 字（硬闸，超尺退出码 1）。
 *   ③ 背景卡不许回来：全库扫 known / rumor / unknown 三个「事件背景卡独有键」的残留。
 *
 * 本工具【不自动改写】，只做量化与列清单，供人工逐条重塑。可测量 → 可追踪进度。
 *
 * 用法：
 *   node tools/text-audit.js                 → 汇总 + 硬闸（超尺 / 缺正文 / 背景卡残留，任一为红退出码 1）
 *   node tools/text-audit.js --trim          → 同上，逐条列出超尺的卡（并行写作时每路自查用）
 *   node tools/text-audit.js --trim --file=80-shady
 *                                            → 只审一个文件：超尺 + 该文件残留键，任一红即退出码 1
 *   node tools/text-audit.js --titles        → 逐条打印「文件 | id | 标题 | 标题字数 | 正文字数」供肉眼审视标题
 *   node tools/text-audit.js --tcase         → 英文标题写成 Title Case 的清单（规范是 sentence case）
 *   node tools/text-audit.js --cap=200       → 临时改卡面预算做实验（默认 250）
 *   node tools/text-audit.js --file=80-shady → 只看某个源文件的事件
 *   node tools/text-audit.js --lang=en       → 按英文覆盖层量篇幅（--file 此时匹配 i18n/en/ 分片）
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

/* ---------- 命令行参数（boot 之前解：--lang 决定用哪种语言量篇幅） ---------- */
const argv = process.argv.slice(2);
const arg = (name, def) => { const m = argv.find(a => a.startsWith("--" + name + "=")); return m ? m.split("=").slice(1).join("=") : def; };
const has = (name) => argv.includes("--" + name);
/* #41 的卡面预算：一张卡只有「标题 + 正文 + 头条图」，标题+正文 合起来 ≤CAP 字。
   正文不再单设上限（旧的 --limit=200 随背景卡一起作废）。--cap= 可临时改尺做实验。 */
const CAP = parseInt(arg("cap", "250"), 10);
const ONLY_FILE = arg("file", null);
const LANG = (arg("lang", "zh") || "zh").trim().toLowerCase();

const ROOT = path.resolve(__dirname, "..");
if (LANG === "en") _store.potus_lang = "en";
const srcs = [...fs.readFileSync(path.join(ROOT, "index.html"), "utf8").replace(/<!--[\s\S]*?-->/g, "")
  .matchAll(/<script\s+src="([^"]+)"><\/script>/g)].map(m => m[1]);
const code = srcs.map(s => fs.readFileSync(path.join(ROOT, s), "utf8")).join("\n;\n");
const P = new Function(code + "\n;POTUS.boot();\n;return POTUS;")();

/* ---------- 源文件 → 事件 id 归属映射（编辑时用来定位文件） ---------- */
const EVENTS_DIR = path.join(ROOT, "content", "events");
const EN_DIR = path.join(ROOT, "content", "i18n", "en");
const fileOfId = {};
(function buildFileMap() {
  const files = [];
  /* --lang=en 时先扫英文覆盖层并让它赢：否则 `--file=121-line-1995-98` 这类分片段
     永远匹配不到（英文串挂在中文源文件名下），worker 就没法自查英文篇幅。 */
  if (LANG === "en" && fs.existsSync(EN_DIR)) (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (p.endsWith(".js")) files.push(p);
    }
  })(EN_DIR);
  if (fs.existsSync(EVENTS_DIR)) fs.readdirSync(EVENTS_DIR).filter(f => f.endsWith(".js")).forEach(f => files.push(path.join(EVENTS_DIR, f)));
  // 少数事件定义在 content 根（如 61-campaigns.js / 30-fillers.js）—— 一并扫
  fs.readdirSync(path.join(ROOT, "content")).filter(f => f.endsWith(".js")).forEach(f => files.push(path.join(ROOT, "content", f)));
  for (const fp of files) {
    const txt = fs.readFileSync(fp, "utf8");
    const rel = path.relative(ROOT, fp);
    for (const m of txt.matchAll(/["']?id["']?\s*:\s*["']([a-zA-Z0-9_]+)["']/g)) {
      const id = m[1];
      if (!(id in fileOfId) || (LANG === "en" && fileOfId[id].indexOf(path.join("i18n", "en")) < 0)) fileOfId[id] = rel;
    }
  }
})();

/* ---------- 统计口径 ---------- */
/* 「字」= 去掉所有空白后的字符数。
   英文不能套这个上限：同一句话英文约 5 个字母 = 1 个汉字，直接按字符计会全线爆表。
   所以统一折算成"中文等价字"：CJK 串按字符，纯拉丁串按词 ×0.5（≈250 字 ↔ 125 词）。
   阈值表本身不用动，只动这一把尺子。见 docs/I18N.md 的长度预算。 */
const CJK_RE = /[　-〿㐀-䶿一-鿿぀-ヿ＀-￯]/;
function charCount(s) { return (s || "").replace(/\s+/g, "").length; }
function unit(s) {
  const t = (s == null ? "" : String(s)).trim();
  if (!t) return 0;
  if (CJK_RE.test(t)) return charCount(t);
  return t.split(/\s+/).length * 0.5;
}
/* 背景卡残留扫描：直接扫源文件文本，不读注册表 —— en boot 下未覆盖的字段会回落成中文，
   注册表读数失真。判据只认 known / rumor / unknown 这三个「只有事件背景卡才有」的键：
   era / worldline / vignettes / campaigns 各自的 brief 是另一套数据（按年简报，#34 起
   已无展示），#41 明确不碰 —— 用 "brief|lede" 做正则会把它们误算成残留。 */
function residualKeys(onlyFile) {
  const hits = [];
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (/\.js$/.test(e.name) && (!onlyFile || e.name.indexOf(onlyFile) >= 0)) {
        const n = (fs.readFileSync(p, "utf8").match(/"(?:known|rumor|unknown)"\s*:|(?:known|rumor|unknown)\s*:/g) || []).length;
        if (n) hits.push([p.replace(ROOT + "/", ""), n]);
      }
    }
  })(path.join(ROOT, "content"));
  hits.sort((a, b) => b[1] - a[1]);
  return hits;
}

/* 把 realized 的 P.events 映射回 authored 文本（title/body 不受 realize 影响）。 */
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
  titleLen: unit(ev.title),
  titleWords: String(ev.title || "").trim().split(/\s+/).filter(Boolean).length,
  bodyLen: unit(ev.body),
  hasBody: !!(ev.body && String(ev.body).trim()),
  cardLen: unit(ev.title) + unit(ev.body),
  nChoices: (ev.choices || []).length
}));

const total = rows.length;
const nNoBody = rows.filter(r => !r.hasBody).length;
/* 标题过短：中文看字数，英文看词数（"A Change in the Air" 才 4 个英文词但绝不短） */
const nShortTitle = rows.filter(r => r.titleLen > 0 && r.titleLen < 8 && r.titleWords < 4).length;

/* 英文标题体例：规范是 sentence case（docs/I18N.md §4），即只首词与专有名词大写。
   并行分片各写各的，Title Case 会悄悄混进来，肉眼扫一遍不值当，所以量化：
   4 词以上、且除首词外 ≥60% 的单词以大写字母开头 ⇒ 判成 Title Case。
   误判方向是漏判（专有名词多的句子不算），不会冤枉 sentence case 的正常标题。 */
function isTitleCase(s) {
  const w = String(s || "").trim().split(/\s+/).filter(Boolean);
  if (w.length < 4) return false;
  const rest = w.slice(1);
  return rest.filter(x => /^[A-Z]/.test(x)).length / rest.length >= 0.6;
}
const titleCaseRows = LANG === "en" ? rows.filter(r => isTitleCase(r.title)) : [];

/* ---------- 报告 ---------- */
function pad(s, n) { s = String(s); return s.length >= n ? s : s + " ".repeat(n - s.length); }

if (has("trim")) {
  /* ---------- #41 融合自检口：一张卡只剩 标题 + 正文（+头条图），标题+正文 ≤CAP 字 ---------- */
  /* 并行重写时每个 worker 只动自己那几个文件，所以必须能按文件自查两项：
     ① 超尺（标题+正文 >CAP）② 本文件还留着 brief 块没删干净。任一为红退出码 1。
     尺子就是本文件那把 unit()：中文按去空白字符数，英文按词 ×0.5 —— 两种语言同一个预算。 */
  const over = rows.filter(r => r.titleLen + r.bodyLen > CAP)
    .sort((a, b) => (b.titleLen + b.bodyLen) - (a.titleLen + a.bodyLen));
  console.log("== #41 融合自检（" + (ONLY_FILE ? "仅 " + ONLY_FILE : "全库") + " · 语言 " + LANG +
    " · 尺：标题+正文 ≤" + CAP + "）：卡数 " + rows.length + " ｜ 超尺 " + over.length + " ==");
  over.forEach(r => console.log("  ✗ 超尺 " + pad(r.titleLen + r.bodyLen, 4) + "（标 " + pad(r.titleLen, 3) + "+正 " +
    pad(r.bodyLen, 4) + "）" + pad(r.id, 26) + r.title));
  const hits = residualKeys(ONLY_FILE);
  console.log("  背景卡残留 known/rumor/unknown 键：" + hits.reduce((s, h) => s + h[1], 0) + " 处 / " + hits.length + " 个文件");
  hits.forEach(h => console.log("  ✗ 残留 " + pad(h[1], 4) + "  " + h[0]));
  const red = over.length + hits.length;
  console.log(red ? "  ✗ " + red + " 项待修" : "  ✓ " + (ONLY_FILE ? "本批全部合规" : "全库合规"));
  process.exit(red ? 1 : 0);
} else if (has("titles")) {
  console.log("== 全部标题（" + (ONLY_FILE ? "仅 " + ONLY_FILE : total + " 个事件") + "）供肉眼审视「是否一目了然」==");
  rows.slice().sort((a, b) => a.file.localeCompare(b.file) || a.id.localeCompare(b.id)).forEach(r =>
    console.log("  " + pad(r.file.replace(/^content\//, ""), 30) + "  " + pad("T" + r.titleLen, 4) + " B" + pad(r.bodyLen, 4) + "  " + r.title + "   ⟨" + r.id + "⟩"));
} else if (has("tcase")) {
  console.log("== 英文标题写成 Title Case 的（应为 sentence case，共 " + titleCaseRows.length + " 个）==");
  titleCaseRows.sort((a, b) => a.file.localeCompare(b.file) || a.id.localeCompare(b.id)).forEach(r =>
    console.log("  " + pad(r.file.replace(/^content\//, ""), 32) + "  " + pad(r.id, 24) + "  " + r.title));
} else {
  /* ---------- 默认口径（#41）：一张卡只剩 标题 + 正文，标题+正文 ≤CAP ---------- */
  const over = rows.filter(r => r.cardLen > CAP).sort((a, b) => b.cardLen - a.cardLen);
  const hits = residualKeys(null);
  const avg = (xs) => xs.length ? Math.round(xs.reduce((s, x) => s + x, 0) / xs.length * 10) / 10 : 0;
  console.log("== POTUS 事件文字审计（语言 " + (P.locale ? P.locale.lang : LANG) +
    " · 尺：标题+正文 ≤" + CAP + "）==");
  console.log("  事件总数            : " + total);
  console.log("  标题均 / 正文均 / 卡均: " + avg(rows.map(r => r.titleLen)) + " / " +
    avg(rows.map(r => r.bodyLen)) + " / " + avg(rows.map(r => r.cardLen)));
  console.log("  标题+正文 超 " + CAP + "  : " + over.length + (over.length ? "  →  --trim 逐条列（并按文件自查 --file=xx）" : ""));
  console.log("  缺正文              : " + nNoBody);
  console.log("  背景卡残留 known/rumor/unknown 键: " + hits.reduce((s, h) => s + h[1], 0) + " 处 / " + hits.length + " 个文件");
  console.log("  标题 <8 字(可疑)     : " + nShortTitle + "  →  --titles 逐条审视");
  if (LANG === "en") console.log("  标题 Title Case      : " + titleCaseRows.length + "  →  --tcase（规范是 sentence case，见 docs/I18N.md §4）");
  const red = over.length + nNoBody + hits.length;
  console.log(red ? "  ✗ " + red + " 项待修" : "  ✓ 全库合规");
  process.exit(red ? 1 : 0);
}
