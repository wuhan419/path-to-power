#!/usr/bin/env node
/* ============================================================================
 * POTUS · tools/i18n-coverage.js
 * 逐屏语言探针 —— 回答「这一屏到底是英文还是中文」，不靠猜。
 *
 * 用法：
 *   node tools/i18n-coverage.js                 # 默认 --lang=en，打印每屏中文占比
 *   node tools/i18n-coverage.js --lang=zh       # 基线（中文屏应当接近全中文）
 *   node tools/i18n-coverage.js --only=game     # 只看名字含 game 的屏
 *   node tools/i18n-coverage.js --samples       # 附中文片段，便于定位是哪句没提取
 *
 * 判据：剥掉 HTML 标签后，分别数 CJK 字符数与拉丁词数。
 *   「中文占比」= CJK 字符 / (CJK 字符 + 拉丁词)。
 *   一个屏若已完全本地化，英文侧该值应接近 0；接近 100% 说明整屏没提取。
 * 退出码：有任何一屏中文占比 > 5% 时退出 1（可当门禁挂进 merge-worker.sh）。
 * ==========================================================================*/
"use strict";
const fs = require("fs");
const path = require("path");

/* ---------- 宿主 stub（与 validate.js 同款，但 #app 是持久元素） ---------- */
function makeEl() {
  return {
    innerHTML: "", className: "", textContent: "", disabled: false, value: "", style: {}, outerHTML: "",
    appendChild() { }, append() { }, remove() { }, setAttribute() { }, insertBefore() { }, closest() { return null; },
    querySelector() { return makeEl(); }, onclick: null, oninput: null, onchange: null
  };
}
const ELEMS = {};                     // 按选择器缓存：#app / #main / #statusbox 都得是持久元素，
                                      // 否则引擎写进去的 HTML 下一秒就丢了，屏会被误判成「空屏」
function el(key) { return ELEMS[key] || (ELEMS[key] = makeEl()); }
global.document = {
  querySelector: (s) => el(s),
  querySelectorAll: () => [],
  getElementById: (id) => el("#" + id),
  createElement: () => makeEl(),
  documentElement: { lang: "" },
  body: { className: "", appendChild() { } },
  addEventListener() { }, title: ""
};
const APP = el("#app");
const _store = {};
global.localStorage = {
  getItem: (k) => (k in _store ? _store[k] : null),
  setItem: (k, v) => { _store[k] = String(v); },
  removeItem: (k) => { delete _store[k]; },
  key: (i) => Object.keys(_store)[i] ?? null,
  get length() { return Object.keys(_store).length; }
};
global.getComputedStyle = () => ({ getPropertyValue: () => "" });
global.alert = () => { }; global.confirm = () => true; global.prompt = () => "x";
global.setTimeout = (f) => { try { if (typeof f === "function") f(); } catch (e) { } return 0; };
global.setInterval = () => 1; global.clearInterval = () => { }; global.clearTimeout = () => { };
global.URL = { createObjectURL: () => "", revokeObjectURL: () => { } };
global.Blob = function () { }; global.FileReader = function () { };
global.window = global;

const argv = process.argv.slice(2);
const arg = (n, d) => { const m = argv.find(a => a.startsWith("--" + n + "=")); return m ? m.split("=").slice(1).join("=") : d; };
const has = (n) => argv.includes("--" + n);
const LANG = (arg("lang", "en") || "en").trim().toLowerCase();
const ONLY = arg("only", null);

_store.potus_lang = LANG;                   // 必须在 boot 之前塞好（i18n.readStored 会读它）

/* ---------- 装载（清单来源 = index.html，与游戏一致） ---------- */
const ROOT = path.resolve(__dirname, "..");
const srcs = [...fs.readFileSync(path.join(ROOT, "index.html"), "utf8")
  .replace(/<!--[\s\S]*?-->/g, "")
  .matchAll(/<script\s+src="([^"]+)"><\/script>/g)].map(m => m[1]);
const code = srcs.map(s => fs.readFileSync(path.join(ROOT, s), "utf8")).join("\n;\n");
const P = new Function(code + "\n;POTUS.boot();\n;return POTUS;")();

/* ---------- 度量 ---------- */
/* 语言开关的选项名（简体中文 / English）用各自的母语书写是刻意约定，不是漏翻：
   带 data-i18n-native="1" 的按钮（title.js langBar / topbar.js langSwitchHTML）在量残留前剔掉，
   否则光一个「中」字就能把整屏顶过 5% 阈值。 */
function stripHtml(h) {
  return String(h || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<button[^>]*data-i18n-native[^>]*>[\s\S]*?<\/button>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|#([0-9a-f]{6}|[0-9a-f]{3})/gi, " ");
}
function measure(html) {
  const t = stripHtml(html);
  const cjk = (t.match(/[㐀-䶿一-鿿豈-﫿぀-ヿ가-힯]/g) || []).length;
  const words = (t.match(/[A-Za-z][A-Za-z'’-]*/g) || []).length;
  const den = cjk + words;
  return { cjk, words, pct: den ? Math.round(cjk / den * 100) : 0, plain: t.replace(/\s+/g, " ").trim() };
}

/* ---------- 逐屏渲染 ---------- */
function render(fn) {
  for (const k in ELEMS) ELEMS[k].innerHTML = "";     // 清空所有持久元素，才分得清是这次渲染写的
  try {
    const r = fn();
    if (typeof r === "string" && !APP.innerHTML) APP.innerHTML = r;
    let html = "";
    for (const k in ELEMS) html += "\n" + ELEMS[k].innerHTML;   // #app + #main + 各插槽一起算
    return { html, err: null };
  }
  catch (e) { return { html: APP.innerHTML, err: String(e && e.message || e) }; }
}

/* 先开一局：顶栏/状态面板/简报这些屏要求 P.G 已存在，否则渲染出空壳会被误判成「已本地化」 */
function bootstrapGame() {
  try {
    P.startCreate();
    const C = P.CSEL || (P.CSEL = {});
    if (!C.era) C.era = Object.keys(P.reg.era)[0];
    if (!C.party) C.party = Object.keys(P.reg.party || {})[0] || "D";
    if (!C.entry) C.entry = Object.keys(P.reg.entry || {})[0];
    if (!C.difficulty) C.difficulty = Object.keys(P.reg.difficulty || {})[0];
    P.confirmCreate();
    return true;
  } catch (e) { return String(e && e.message || e); }
}
const BOOT_ERR = bootstrapGame();

const SCREENS = [
  { name: "title 标题屏", fn: () => P.renderTitle() },
  { name: "create 建角屏", fn: () => P.renderCreate() },
  { name: "game 对局主屏", fn: () => P.resumeMonth && P.resumeMonth() },
  { name: "event 事件卡", fn: () => { const ev = P.events[0]; return P.presentEvent(P.realize ? P.realize(ev) : ev); } },
  { name: "toolbar 操作栏", fn: () => P.toolbarHTML() },
  { name: "topbar 顶栏", fn: () => P.topbarHTML() },
  { name: "status 状态面板", fn: () => P.statusPanel() },
  { name: "identity 身份条", fn: () => P.identityHTML() },
  { name: "brief 时代简报", fn: () => P.briefHTML(P.realize ? P.realize(P.events[0]) : P.events[0]) },
  { name: "ledger 年终结算", fn: () => P.endYear && P.endYear() }
];

const rows = [];
for (const s of SCREENS) {
  if (ONLY && s.name.toLowerCase().indexOf(String(ONLY).toLowerCase()) < 0) continue;
  const r = render(s.fn);
  const m = measure(r.html);
  rows.push({ name: s.name, ...m, err: r.err });
}

/* ---------- 报告 ---------- */
const loc = P.locale || {};
console.log("语言：" + (loc.lang || LANG) + " ｜ 界面 key 已登记 " + Object.keys(loc.ui || {}).length +
  " 条 ｜ 内容覆盖 " + (((P.i18n || {}).report || {}).applied || {})[loc.lang || LANG] + " 叶子" +
  (BOOT_ERR === true ? "" : " ｜ 开局失败：" + BOOT_ERR));
const pad = (s, n) => { s = String(s); return s.length >= n ? s : s + " ".repeat(n - s.length); };
console.log("");
console.log("  " + pad("屏", 22) + pad("中文占比", 10) + pad("CJK", 7) + pad("EN词", 7) + " 判定");
let worst = 0;
for (const r of rows) {
  const empty = !r.plain;
  if (!empty) worst = Math.max(worst, r.pct);
  const verdict = r.err ? "渲染抛错：" + r.err
    : empty ? "· 空屏（该入口在 headless 下没产出，别当已本地化）"
    : r.pct <= 5 ? "✓ 已本地化" : r.pct >= 80 ? "✗ 整屏未提取" : "△ 部分";
  console.log("  " + pad(r.name, 24) + pad(empty ? "-" : r.pct + "%", 10) + pad(r.cjk, 7) + pad(r.words, 7) + " " + verdict);
  if (has("samples") && r.cjk > 0) {
    const snips = (r.plain.match(/[^ ]*[㐀-䶿一-鿿]{2,}[^ ]*/g) || []).slice(0, 8);
    console.log("      未提取片段：" + snips.join(" / "));
  }
}
console.log("");
const untranslatedEngine = (P.i18n && P.i18n.report && P.i18n.report.missed || []).length;
if (untranslatedEngine) console.log("  覆盖层未命中（写错路径/字段）：" + untranslatedEngine + " 处");
console.log(rows.length ? "  最高屏中文占比：" + worst + "%" : "  没有匹配 --only 的屏");
process.exit(worst > 5 && LANG === "en" ? 1 : 0);
