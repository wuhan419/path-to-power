#!/usr/bin/env node
/* ============================================================================
 * POTUS · tools/validate.js
 * 一键校验：语法 → 加载 → 数据完整性 → 掷骰分布 → 生涯模拟（默认 20 局，--games 可调）→ 引擎/内容契约
 *
 * 用法：  node tools/validate.js            （快速档，每次提交跑这个）
 *         node tools/validate.js --games=300 --seed=20260921   （全量 A/B 平衡口径）
 * 特点：  自动读取 index.html 的内容清单，不会因为加了新内容包而失效。
 * 退出码：0 通过；1 有失败（可直接用于 CI / pre-commit）
 * ==========================================================================*/
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");

/* ---------- 宿主环境 stub（让引擎能在 Node 里跑） ---------- */
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
  getItem: (k) => (k in _store ? _store[k] : null),
  setItem: (k, v) => { _store[k] = String(v); },
  removeItem: (k) => { delete _store[k]; },
  key: (i) => Object.keys(_store)[i] ?? null,
  get length() { return Object.keys(_store).length; }
};
/* --lang=en：把语言预置进存根 localStorage，boot 时 engine/i18n.js 会套用英文覆盖层，
   于是同一套断言可以在两种语言下各跑一遍。 */
const L10N_LANG = ((process.argv.find(a => /^--lang=/.test(a)) || "").split("=")[1] || "").trim();
if (L10N_LANG) _store.potus_lang = L10N_LANG;
global.getComputedStyle = () => ({ getPropertyValue: () => "" });global.alert = () => { }; global.confirm = () => true; global.prompt = () => "x";
global.setTimeout = () => 0; global.setInterval = () => 1; global.clearInterval = () => { };
/* URL/Blob/FileReader 桩：必须是可实例化的函数（不能是普通对象）——
   node 的 fs shim 会对 path 做 `instanceof URL` 判定，RHS 不可调用会直接 TypeError。 */
global.URL = function URL() { }; global.URL.createObjectURL = () => ""; global.URL.revokeObjectURL = () => { };
global.Blob = function () { }; global.FileReader = function () { };
global.window = global;

/* ---------- 从 index.html 读取文件清单（保证与运行时一致） ---------- */
const htmlRaw = fs.readFileSync(INDEX, "utf8");
const html = htmlRaw.replace(/<!--[\s\S]*?-->/g, "");   // 先去掉 HTML 注释，避免匹配到注释里的示例
const srcs = [...html.matchAll(/<script\s+src="([^"]+)"><\/script>/g)].map(m => m[1]);
if (!srcs.length) { console.error("× index.html 里没有找到任何 <script src>"); process.exit(1); }

/* 语法预检：逐文件 node --check 等价物（用 new Function 解析） */
let syntaxFail = 0;
for (const s of srcs) {
  const p = path.join(ROOT, s);
  if (!fs.existsSync(p)) { console.error("× 缺少文件：" + s); syntaxFail++; continue; }
  try { new Function(fs.readFileSync(p, "utf8")); }
  catch (e) { console.error("× 语法错误 " + s + "：" + e.message); syntaxFail++; }
}
if (syntaxFail) { console.error("\n=== 语法检查失败 ==="); process.exit(1); }

/* ---------- 拼接并执行 ---------- */
const code = srcs.map(s => fs.readFileSync(path.join(ROOT, s), "utf8")).join("\n;\n");
let P;
try {
  P = new Function(code + "\n;POTUS.boot();\n;return POTUS;")();
} catch (e) {
  console.error("× 加载内容包时崩溃：" + e.message + "\n" + e.stack.split("\n").slice(1, 4).join("\n"));
  process.exit(1);
}

/* #19 校准专用覆盖：--late-cap=N 把各难度 lateLimit 一次性钉到 N，
   测"不设防"下的真实断供分布（N 取大值=永不破产）；只影响本次读数，不改平衡表。 */
{
  const capArg = process.argv.find(a => /^--late-cap=/.test(a));
  if (capArg) {
    const N = Math.max(1, Math.round(Number(capArg.split("=")[1])));
    const ll = (P.reg.balance.studentLoan || {});
    if (ll.lateLimit) Object.keys(ll.lateLimit).forEach(d => { ll.lateLimit[d] = N; });
    console.log("⚠ --late-cap=" + N + "：lateLimit 已临时覆盖为全难度 " + N + "（仅校准读数用）");
  }
}

let fail = 0;
const check = (c, m) => { if (!c) { console.log("  ✗ " + m); fail++; } };
/* 断言"界面有没有交代某件事"时按中文措辞取串：引擎串提取成 P.t(key, "中文") 之后，
   --lang=en 下渲染的是英文，硬编码中文的断言会假红。行为断言与被测语言无关。
   注意：取串的那一句要写进 ZH(() => …) 里，在外面算好的字符串已经翻过了。 */
const ZH = P.i18n.withZh;

/* ---------- 多语言覆盖层自检（content/i18n/，契约见 docs/I18N.md） ---------- */
(function l10nSelfCheck() {
  const I = P.i18n;
  if (!I) { check(false, "engine/i18n.js 没有加载（index.html 里缺 <script>）"); return; }
  const R = I.report;
  const prot = Object.keys(R.protectedHits);
  check(prot.length === 0, "覆盖层改写了结构性键（会断事件链与存档）：" +
    prot.map(k => k + "×" + R.protectedHits[k]).join(", "));
  check(R.missed.length === 0, "覆盖层指向不存在的目标（id 拼错 / 字段路径不对 / 数组没对齐）：" +
    R.missed.slice(0, 8).join(", ") + (R.missed.length > 8 ? " …共 " + R.missed.length + " 处" : ""));
  check(R.unknownKind.length === 0, "覆盖层用了注册表里不存在的类别：" + R.unknownKind.join(", "));
  console.log("  多语言层：当前语言 " + P.locale.lang + " ｜ 界面串 " + Object.keys(P.locale.ui).length +
    " 条 ｜ 内容覆盖 en " + (R.applied.en || 0) + " 条" + (L10N_LANG === "en" ? "（已套用）" : "（本次未套用）"));
  if (L10N_LANG === "en") {
    const enTitles = P.events.filter(e => {
      const t = String(e.title || "");
      return !/[一-鿿]/.test(t) && /[A-Za-z]{4}/.test(t);
    }).length;
    check(enTitles > 0, "--lang=en 下没有任何一张卡变成英文，覆盖层大概率没生效");
    console.log("  英文标题命中 " + enTitles + " / " + P.events.length + " 张卡（其余缺译回落中文，属预期）");
  }
})();
/* 可被 cost / req 消耗的资源。lev（把柄）在 v0.4 加入 ——
 * 它和 fav 一样是"份数"资源：cost.lev = 1 表示花掉一份把柄。 */
const RES_KEYS = ["fun", "fav", "ap", "rep", "hp", "lev"];
const STAKE_KEYS = ["fun", "ap", "fav"];

console.log("== 加载 ==");
console.log("  引擎 v" + P.VERSION);
console.log("  时代 " + Object.keys(P.reg.era).length + " ｜ 出身 " + Object.keys(P.reg.origin).length +
  " ｜ 天赋 " + Object.keys(P.reg.talent).length + " ｜ 起点 " + Object.keys(P.reg.entry).length +
  " ｜ 轨道 " + Object.keys(P.reg.track).length + " ｜ 党派 " + Object.keys(P.reg.party).length +
  " ｜ 派系 " + Object.keys(P.reg.faction).length);
console.log("  事件 " + P.events.length + " ｜ 结局规则 " + P.reg.ending.length + " ｜ 填充包 " + Object.keys(P.reg.filler).length);
console.log("  事件类型 " + Object.keys(P.reg.category).length + " ｜ 量级 " + Object.keys(P.reg.grade).length +
  " ｜ 时代媒介 " + Object.keys(P.reg.medium).length);

/* ---------- 引用完整性 ---------- */
console.log("\n== 引用完整性 ==");
const TIERS = ["crit", "ok", "meh", "fail", "critfail"];
const ids = new Set();
for (const ev of P.events) {
  check(ev.id, "事件缺 id");
  check(!ids.has(ev.id), "事件 id 重复：" + ev.id);
  ids.add(ev.id);
  check(ev.title && ev.body, "事件缺 title/body：" + ev.id);
 /* 分期标签：去"时代"化改造后，一条事件合法地"属于某段年月"有三种写法——
     旧的 era 标签、新的绝对年窗（minYear/maxYear 走 when、fromYear/toYear/years 走 yearOK）、
     或显式 scoped（分期专属、走 eraWeightMul 加权）。晋升脊柱（tierRaw）跨年代通用，豁免。 */
  if (!ev.tierRaw) check(
    (ev.era && ev.era.length) || ev.scoped ||
    ev.minYear != null || ev.maxYear != null ||
    ev.fromYear != null || ev.toYear != null || ev.years,
    "事件缺分期标签（era / 年窗 minYear·maxYear·fromYear·toYear·years / scoped）：" + ev.id);
  /* 事件类型 / 量级 / 媒介：统一填充格式的三件套。
     要求每个事件都显式声明，这样"按类型把内容派给不同的人写"才对齐得上。 */
  check(!!ev.category, "事件缺 category（事件类型）：" + ev.id);
  if (ev.category) check(P.reg.category[ev.category], "事件 category 不在注册表里：" + ev.id + " = " + ev.category);
  check(!!ev.grade, "事件缺 grade（量级 major/mid/minor）：" + ev.id);
  if (ev.grade) check(P.reg.grade[ev.grade], "事件 grade 非法：" + ev.id + " = " + ev.grade);
  [].concat(ev.medium || []).forEach(mk => check(P.reg.medium[mk], "事件 medium 不在媒介时间轴里：" + ev.id + " = " + mk));
  if (ev.fromYear != null && ev.toYear != null) check(ev.fromYear <= ev.toYear, "事件 fromYear > toYear：" + ev.id);
  if (ev.years) check(Array.isArray(ev.years) && ev.years.length === 2 && ev.years[0] <= ev.years[1],
    "事件 years 必须是 [起, 止]：" + ev.id);
  (ev.era || []).forEach(e => check(P.reg.era[e], "事件 " + ev.id + " 引用了不存在的 era：" + e));
  (ev.tracks || []).forEach(t => check(P.reg.track[t], "事件 " + ev.id + " 引用了不存在的 track：" + t));
  (ev.parties || []).forEach(t => check(P.reg.party[t], "事件 " + ev.id + " 引用了不存在的 party：" + t));
  (ev.entries || []).forEach(t => check(P.reg.entry[t], "事件 " + ev.id + " 引用了不存在的 entry：" + t));
  (ev.origins || []).forEach(t => check(P.reg.origin[t], "事件 " + ev.id + " 引用了不存在的 origin：" + t));
  if (ev.tierMin != null && ev.tierMax != null) check(ev.tierMin <= ev.tierMax, "事件 " + ev.id + " tierMin>tierMax");
  check(ev.choices && ev.choices.length >= 2, "事件选项 <2：" + ev.id);
  for (const ch of ev.choices || []) {
    check(ch.id && ch.text, "选项缺 id/text：" + ev.id);
    check(typeof ch.base === "number" && ch.base > 0 && ch.base < 1, "选项 base 非法：" + ev.id + "/" + ch.id + " = " + ch.base);
    for (const t of TIERS) check(ch.outcomes && ch.outcomes[t], "缺结果档 " + t + "：" + ev.id + "/" + ch.id);
    const r = ch.req;
    if (r) {
      if (r.track) check(P.reg.track[r.track], "req.track 不存在：" + ev.id + "/" + ch.id);
      if (r.party) check(P.reg.party[r.party], "req.party 不存在：" + ev.id + "/" + ch.id);
      if (r.fac) check(P.reg.faction[r.fac], "req.fac 不存在：" + ev.id + "/" + ch.id);
    }
    /* 资源代价 cost：键必须在 RES_KEYS 内，数值必须 > 0 */
    if (ch.cost) {
      check(typeof ch.cost === "object", "cost 必须是对象：" + ev.id + "/" + ch.id);
      for (const k in ch.cost) {
        check(RES_KEYS.indexOf(k) >= 0, "cost 未知资源键 " + k + "：" + ev.id + "/" + ch.id);
        check(typeof ch.cost[k] === "number" && ch.cost[k] > 0, "cost 数值必须 >0：" + ev.id + "/" + ch.id + "/" + k);
      }
    }
    /* 投注 stake：键必须是 fun/fav（ap 已退役但作为休眠字段仍容忍）；值可以是 true 或 {per,w,cap} */
    if (ch.stake) {
      check(typeof ch.stake === "object", "stake 必须是对象：" + ev.id + "/" + ch.id);
      for (const k in ch.stake) {
        check(STAKE_KEYS.indexOf(k) >= 0, "stake 未知资源键 " + k + "：" + ev.id + "/" + ch.id);
        const v = ch.stake[k];
        check(v === true || typeof v === "object", "stake." + k + " 必须是 true 或对象：" + ev.id + "/" + ch.id);
        if (v && typeof v === "object" && (k === "fun" || k === "fav")) check(P.stakeSpec(ch), "stake 声明了 " + k + " 但 stakeSpec 解析失败：" + ev.id + "/" + ch.id);
      }
      /* v0.9：精力(ap) 退役。若一个选项的 stake 只声明了已退役的 ap（休眠字段），
         引擎正确地不弹投注面板（stakeSpec→null），不强求非空；
         只要还声明了 fun/fav 之一，就必须能解析出投注规格。 */
      const liveStake = Object.keys(ch.stake).some(function (k) { return k === "fun" || k === "fav"; });
      if (liveStake) check(!!P.stakeSpec(ch), "stake 声明了 fun/fav 但 stakeSpec 返回 null：" + ev.id + "/" + ch.id);
      /* 汇率自洽：cap ÷ w 必须至少给得出 1 档，否则第一档就是"花钱买 0 收益" */
      const sp = P.stakeSpec(ch);
      if (sp) {
        ["fun"].forEach(function (k) {
          if (!sp[k]) return;
          const s = sp[k];
          const w = s.w || 0.04, cap = s.cap || 0.30;
          check(w > 0 && cap > 0, "stake." + k + " 的 w/cap 必须为正：" + ev.id + "/" + ch.id);
          check(cap / w >= 1 - 1e-9, "stake." + k + " 的上限(" + cap + ")还不到一档加成(" + w + ")，投注必然白花：" + ev.id + "/" + ch.id);
        });
      }
    }
    /* 日期：month 1-12 / day 1-31（都可选；缺省由引擎按 beat 进度自动分摊到月份） */
    if (ev.month != null) check(Number.isInteger(ev.month) && ev.month >= 1 && ev.month <= 12, "month 必须为 1-12：" + ev.id + " = " + ev.month);
    if (ev.day != null) check(Number.isInteger(ev.day) && ev.day >= 1 && ev.day <= 31, "day 必须为 1-31：" + ev.id + " = " + ev.day);
    if (ev.day != null && ev.month == null) check(false, "声明了 day 却没声明 month：" + ev.id);
    /* 背景卡 brief：主角视角的认知边界 */
    if (ev.brief) {
      const b = ev.brief;
      check(typeof b === "object", "brief 必须是对象：" + ev.id);
      ["known", "rumor", "unknown"].forEach(k => {
        if (b[k] == null) return;
        check(Array.isArray(b[k]), "brief." + k + " 必须是数组：" + ev.id);
        (b[k] || []).forEach(x => check(typeof x === "string" && x.length > 0, "brief." + k + " 的元素必须是非空字符串：" + ev.id));
      });
      check((b.known || []).length + (b.rumor || []).length + (b.unknown || []).length > 0,
        "brief 至少要有 known/rumor/unknown 之一且非空：" + ev.id);
      (b.terms || []).forEach(t => {
        check(t && typeof t.k === "string" && typeof t.v === "string" && t.k && t.v, "brief.terms 需要 {k,v} 两个非空字符串：" + ev.id);
      });
      if (b.terms) check(Array.isArray(b.terms), "brief.terms 必须是数组：" + ev.id);
    }
  }
}

/* ---------- 保底选项：每个事件都得留一条不要钱、不设门槛的路 ----------
 * 否则玩家资源见底时会撞上"所有选项都点不动"的死局。
 * 引擎有兜底（render.js 的 P.fallbackIndex 会强行放行一个），但那是保险丝，
 * 不该日常跳闸 —— 内容侧的正确做法才是主路。 */
const noFallback = P.events.filter(ev => !(ev.choices || []).some(ch => !ch.cost && !ch.req));
check(!noFallback.length, "以下事件没有保底选项（无 cost 且无 req），玩家资源见底时会卡死：" +
  noFallback.map(e => e.id + "《" + e.title + "》").join("、"));

/* 媒介时间轴自身的完整性 */
for (const mk in P.reg.medium) {
  const m = P.reg.medium[mk];
  check(typeof m.from === "number", "媒介 " + mk + " 缺 from 年份");
  if (m.to != null) check(m.from <= m.to, "媒介 " + mk + " 的 from > to");
  check(!!m.note, "媒介 " + mk + " 缺 note（界面会把它讲给玩家听）");
}
/* 每个媒介都要有"存在的年份"和不存在的年份——否则这条门控形同虚设 */
for (const mk in P.reg.medium) {
  const m = P.reg.medium[mk];
  check(P.reg.medium[mk].from > 1000, "媒介 " + mk + " 的 from 年份可疑");
}
for (const eraId in P.reg.filler) check(eraId === "*" || P.reg.era[eraId], "填充包引用了不存在的 era：" + eraId);
for (const eraId in P.reg.blackswan) check(P.reg.era[eraId], "黑天鹅引用了不存在的 era：" + eraId);
for (const o in P.reg.entry) { const e = P.reg.entry[o]; if (e.track_suggest) check(P.reg.track[e.track_suggest], "entry " + o + " 的 track_suggest 不存在：" + e.track_suggest); }
check(P.reg.ending.some(r => !r.when || !Object.keys(r.when).length), "结局规则缺少兜底规则（when:{}）");
const rc = P.balance().recentCap;
check(rc < P.events.length, "balance.recentCap(" + rc + ") 必须小于事件总数(" + P.events.length + ")，否则事件会退化成填充");

/* ---------- 背景卡 / 时间 ---------- */
console.log("\n== 背景卡 / 时间 ==");
{
  const withBrief = P.events.filter(e => e.brief);
  const withDate = P.events.filter(e => e.month);
  console.log("  带背景卡 " + withBrief.length + "/" + P.events.length +
    " ｜ 带日期 " + withDate.length + "/" + P.events.length);
  check(withBrief.length > 0, "没有任何事件带背景卡（brief）");
  for (const eraId in P.reg.era) {
    const evs = P.events.filter(e => (e.era || []).indexOf(eraId) >= 0);
    if (!evs.length) continue;
    const n = evs.filter(e => e.brief).length;
    check(n > 0, "时代 " + eraId + " 的 " + evs.length + " 个事件里，带背景卡的为 0");
  }

  P.CSEL = {
    era: Object.keys(P.reg.era)[0], origin: Object.keys(P.reg.origin)[0], talent: Object.keys(P.reg.talent)[0],
    entry: Object.keys(P.reg.entry)[0], party: Object.keys(P.reg.party)[0], stance: Object.keys(P.reg.stance)[0],
    name: "时间测试"
  };
  P.confirmCreate();
  P.G.year = 2008; P.G.month = 9;
  /* 日期串按中文措辞比对：topbar 的 dateText 提取成 P.t 后，英文下渲染 "Sep 2008"，
     这里要锁的是"取当前月 / 拼日期 / 支持 year 覆盖"这三条行为，不是月份用什么语言写。 */
  check(ZH(() => P.dateText({})) === "2008 年 9 月", "dateText 缺省应用当前月：" + P.dateText({}));
  check(ZH(() => P.dateText({ day: 24 })) === "2008 年 9 月 24 日", "dateText 应拼接日：" + P.dateText({ day: 24 }));
  P.G.month = 5;
  check(ZH(() => P.dateText({ year: 1974, day: 9 })) === "1974 年 5 月 9 日", "dateText 应支持 year 覆盖：" + P.dateText({ year: 1974, day: 9 }));
  /* setMonth：月份更晚 → 推进；更早 → 保持在当前月不回退 */
  P.G.month = 1; P.setMonth({ month: 3 });
  check(P.G.month === 3, "setMonth 应把当前月推进到事件月份");
  P.setMonth(9);
  check(P.G.month === 9, "setMonth 应继续向后推进");
  P.setMonth(2);
  check(P.G.month === 9, "更早的月份不应让时间回退（当前月仍为 9）");

  const ev = withBrief[0];
  const h = ZH(() => P.briefHTML(ev));
  check(h.indexOf("你确知的") >= 0 && h.indexOf("你尚不知道的") >= 0, "briefHTML 应渲染出三段认知边界");
  check(h.indexOf("brief-head") >= 0 && h.indexOf("toggleBrief") >= 0, "briefHTML 应带可折叠的按钮");
  check(P.briefHTML({ id: "x" }) === "", "无 brief 的事件不应渲染背景卡");
}

/* ---------- 三值性（valence）与动态系数（dyn） ----------
 * 语义按「T2 基准人物（属性 50）」评估；dyn 卡先按同一基准展开成绝对值。
 * 只对已声明 valence / dyn 的卡硬断言（迁移中的旧卡只计入覆盖度报告），
 * --val-strict 模式下要求全库声明（内容迁移完成后的验收开关）。 */
console.log("\n== 三值性与动态系数 ==");
{
  const VAL = ["boon", "risk", "bane"];
  const SCALE = { fun: 1, rep: 1, hp: 1, lev: 1, fav: 1, ap: 1 };
  const eband = P.balance().econ || {};
  const cmin = eband.coefMin == null ? -6 : eband.coefMin;
  const cmax = eband.coefMax == null ? 6 : eband.coefMax;
  /* money 单独放宽：旧内容的大额现金流（贿金/竞选款）与实际量级无关，
     换标尺后系数天然偏大；断言只防“绝对值忘除”（十万级），不防风格性偏大 */
  const fmax = eband.coefMaxFun == null ? 40 : eband.coefMaxFun;
  const inBand = function (k, v) {
    if (typeof v !== "number") return true;
    return k === "fun" ? (v >= -fmax && v <= fmax) : (v >= cmin && v <= cmax);
  };
  const badVal = [], badCoef = [], badSem = [];
  const declared = {};
  /* 基准快照：T2、全属性 50 —— 评估坐标系只有一套 */
  const Gv = P.G, saved = { tier: Gv.tier, attr: Gv.attr, track: Gv.track };
  Gv.tier = 2; Gv.attr = { CHA: 50, INT: 50, CUN: 50, INTG: 50 };
  if (!Gv.track) Gv.track = "electoral";

  for (const ev of P.events) {
    if (ev.valence != null && VAL.indexOf(ev.valence) < 0) badVal.push(ev.id + "=" + ev.valence);
    /* dyn 卡：系数必须在合法区间（绝对值忘除会直接撞上限） */
    if (ev.dyn) {
      (ev.choices || []).forEach(function (ch) {
        for (const k in (ch.cost || {})) {
          if (SCALE[k] && !inBand(k, ch.cost[k])) badCoef.push(ev.id + "/" + ch.id + " cost." + k + "=" + ch.cost[k]);
        }
        ["crit", "ok", "meh", "fail", "critfail"].forEach(function (t) {
          const fx = ((ch.outcomes || {})[t] || {}).effects || {};
          for (const k in fx) {
            if (SCALE[k] && !inBand(k, fx[k])) badCoef.push(ev.id + "/" + ch.id + "@" + t + " " + k + "=" + fx[k]);
          }
        });
      });
    }
    /* 三值性语义断言（按 T2 基准；dyn 卡先展开） */
    if (ev.valence && VAL.indexOf(ev.valence) >= 0) {
      declared[ev.valence] = (declared[ev.valence] || 0) + 1;
      const grade = P.gradeOf(ev);
      const rv = ev.dyn ? P.realize(ev) : ev;
      const optNets = (rv.choices || []).map(function (ch) {
        const cn = ch.cost ? P.netScore(ch.cost, grade, rv) : 0;
        const nets = {};
        TIERS.forEach(function (t) {
          const o = (ch.outcomes || {})[t];
          if (o) nets[t] = P.netScore(o.effects, grade, rv) - cn;
        });
        return { ch: ch, nets: nets };
      });
      const allNets = [];
      optNets.forEach(function (o) { TIERS.forEach(function (t) { if (o.nets[t] != null) allNets.push(o.nets[t]); }); });
      if (ev.valence === "boon") {
        /* 机遇：再糟的处理也不亏（容忍 ±0.05 份的四舍五入噪声）；且成功确有肉 */
        const worst = Math.min.apply(null, allNets.concat([0]));
        if (worst < -0.05) badSem.push("boon 存在净损档（" + worst.toFixed(2) +  " 份）：" + ev.id);
        const okBest = Math.max.apply(null, optNets.map(function (o) { return o.nets.ok == null ? -99 : o.nets.ok; }));
        if (okBest < 0.15) badSem.push("boon 的 ok 档没有实质收益（最肥的 ok 只有 " + okBest.toFixed(2) + " 份）：" + ev.id);
      }
      if (ev.valence === "risk") {
        /* 风险：必须有一条“规避”路 —— 无 cost 无 req 且五档净值近乎中性 */
        const safe = optNets.some(function (o) {
          if (o.ch.cost || o.ch.req) return false;
          return TIERS.every(function (t) { return o.nets[t] == null || Math.abs(o.nets[t]) <= 0.35; });
        });
        if (!safe) badSem.push("risk 缺『规避选项』（无cost无req且五档净值≈ 0）：" + ev.id);
        /* 也得真有搏：存在振幅（最好档 - 最坏档）≥ 0.8 份的选项 */
        const swing = Math.max.apply(null, optNets.map(function (o) {
          const vs = TIERS.map(function (t) { return o.nets[t]; }).filter(function (x) { return x != null; });
          return vs.length ? Math.max.apply(null, vs) - Math.min.apply(null, vs) : 0;
        }));
        if (swing < 0.8) badSem.push("risk 没有风险振幅（最大摆幅 " + swing.toFixed(2) + " 份）：" + ev.id);
      }
      if (ev.valence === "bane") {
        /* 威胁：伤害真实存在（存在净损 ≤ -0.3 的档），且有翻盘路（某选项 crit 净 ≥ 0.15） */
        const hurt = allNets.some(function (n) { return n <= -0.3; });
        const flip = optNets.some(function (o) { return o.nets.crit != null && o.nets.crit >= 0.15; });
        if (!hurt) badSem.push("bane 没有真实伤害档（所有档净值 > -0.3 份）：" + ev.id);
        if (!flip) badSem.push("bane 没有翻盘路（没有任何选项 crit 净 ≥ 0.15 份）：" + ev.id);
      }
      /* base 概率带：机遇不该难接。注意：威胁的“规避路”本就应高成功率
         （需求 1：“base 与属性 mods 设计成高能力者可规避”），故不对 bane 的 base 上限做断言。 */
      (rv.choices || []).forEach(function (ch) {
        if (ch.base != null) {
          if (ev.valence === "boon" && ch.base < 0.45) badSem.push("boon 选项 base 过低（" + ch.base + "）：" + ev.id + "/" + ch.id);
        }
      });
    }
  }
  Gv.tier = saved.tier; Gv.attr = saved.attr; Gv.track = saved.track;

  const undeclared = P.events.filter(function (e) { return !e.valence; }).length;
  const dynCount = P.events.filter(function (e) { return e.dyn; }).length;
  console.log("  已标 valence " + (P.events.length - undeclared) + "/" + P.events.length +
    "（boon " + (declared.boon || 0) + " ／ risk " + (declared.risk || 0) + " ／ bane " + (declared.bane || 0) + "）" +
    " ｜ dyn 系数卡 " + dynCount + "/" + P.events.length);
  check(!badVal.length, "valence 非法值：" + badVal.join("、"));
  check(!badCoef.length, "dyn 卡系数超出合法区间（rep/hp/小资源 [" + cmin + "," + cmax + "]，money ±" + fmax + "）（疑似绝对值忘除）：" + badCoef.slice(0, 8).join("、") + (badCoef.length > 8 ? " …共" + badCoef.length + "处" : ""));
  /* 语义违规：常态只报清单不判死（逐卡打磨是个过程）；--val-strict 下硬判。 */
  if (badSem.length) {
    console.log("  三值性语义待修 " + badSem.length + " 条：\n    " + badSem.slice(0, 12).join("\n    ") + (badSem.length > 12 ? "\n    …共 " + badSem.length + " 条" : ""));
    if (process.argv.includes("--val-strict")) fail += badSem.length;
  }
  if (process.argv.includes("--val-strict")) {
    check(undeclared === 0, "仍有 " + undeclared + " 张卡未声明 valence");
    check(dynCount === P.events.length, "仍有 " + (P.events.length - dynCount) + " 张卡未转 dyn 系数制");
    /* 时代×三值性覆盖：每个时代的可及池里三类都得有货（两段式抽取不降级的前提） */
    for (const eraId in P.reg.era) {
      VAL.forEach(function (v) {
        const pool = P.events.filter(function (e) {
          return P.valenceOf(e) === v && ((e.era || []).indexOf(eraId) >= 0 || !(e.era && e.era.length)) && (e.tierMin == null || e.tierMin <= 1);
        });
        check(pool.length >= 1, "时代 " + eraId + " 的「" + v + "」池是空的（抽取必然降级）");
      });
    }
  } else if (undeclared) {
    console.log("  （迁移模式：未声明 valence 的 " + undeclared + " 张卡按兜底类处理；全部完成后跑 --val-strict）");
  }
}

/* ---------- 月度回合 / 事件量级 / 媒介时间轴 ---------- */
console.log("\n== 月度回合 / 事件量级 / 媒介时间轴 ==");
{
  const KEYS = (o) => Object.keys(o);
  const e0 = KEYS(P.reg.era)[0], o0 = KEYS(P.reg.origin)[0], t0 = KEYS(P.reg.talent)[0],
    n0 = KEYS(P.reg.entry)[0], p0 = KEYS(P.reg.party)[0], s0 = KEYS(P.reg.stance)[0];
  P.CSEL = { era: e0, origin: o0, talent: t0, entry: n0, party: p0, stance: s0, name: "时间轴测试" };
  P.confirmCreate();
  const G = P.G;
  G.flags = []; G.tier = 0;

  /* --- #33：era 按日历解 + 钉卡全层通行（在 __T 测试时代注册前校验真实时代表） ---
     G.era 自时代选择器下线后恒为 1980_REAGAN；「这条事件属于哪个时代」一律由
     P.eraAt(year) 落在哪个 era 区间决定，且凡 fixed/scheduled 钉卡 tierMax 抬到 9。 */
  check(P.eraAt(1985) === "1980_REAGAN" && P.eraAt(1995) !== "1980_REAGAN" &&
    P.eraAt(2009) === "2008_CRASH" && P.eraAt(2020) === P.eraAt(2016), "eraAt：年份应落进正确的时代区间");
  G.year = 2008;
  check(P.snap().era === "2008_CRASH", "snap().era 应按日历解，不再读 G.era");
  G.year = 1985;
  P.G.doneIds = []; P.recentIds = []; G.month = 0;
  P.planMonth(9);                                   // 触发一次钉卡规范化（normalizePins）
  P.G.doneIds = []; P.recentIds = [];
  const pinIds2008 = [];
  (P.reg.era["2008_CRASH"].scheduled || []).forEach(s => { if (s.event) pinIds2008.push(s.event); });
  (P.reg.fixed || []).forEach(s => { if (s.event && s.year === 2008) pinIds2008.push(s.event); });
  check(pinIds2008.length > 0, "2008 年应有钉卡（scheduled/fixed 任一源）");
  check(pinIds2008.every(id => { const e = P.evById(id); return e && (e.tierMax == null || e.tierMax >= 9); }),
    "钉卡规范化后 tierMax 应全层通行（#33 触发荒主闸）");

  /* --- #33 触发荒回归守卫：钉卡必须真发得出去 ---
     两个历史主闸（钉卡 tierMax 天花板 / G.era 写死的时代白名单）已分别由
     normalizePins 与 P.eraAt 拆掉；这里取时代表第二档的首个钉卡年，按 planSlots 天花板
     连跑 12 个月 × 200 次，统计因 eligible 失败被静默丢弃的钉卡比例（time.js 的 G.pinMiss）。
     身份白名单（tracks/parties/…）按通配身份测 —— 那是设计而非荒，逐条核查交给 trigger-scan。 */
  {
    const eraIds = KEYS(P.reg.era);
    const era2 = P.reg.era[eraIds[1]] || P.reg.era[eraIds[0]];
    const pinY = (era2.scheduled || []).map(s => s.year).sort(function (a, b) { return a - b; })[0] || 1991;
    const b33 = P.balance();
    let slots33 = 0, drop33 = 0;
    G.year = pinY; G.tier = 4; G.month = 0;
    G.track = "*"; G.party = "*"; G.stance = "*"; G.origin = "*"; G.entry = "*"; G.talent = "*"; G.state = "*";
    G.rep = 50; G.fav = 10; G.lev = 0; G.hp = 70; G.fun = 500; G.flags = [];
    for (let run33 = 0; run33 < 200; run33++) {
      P._pinsNormalized = false;                 // 每轮重跑一遍 normalizePins，模拟新开局
      for (let m = 1; m <= 12; m++) {
        G.month = m; G.pinMiss = [];
        P.planMonth(b33.slotsMax);
        slots33 += b33.slotsMax;
        drop33 += (G.pinMiss || []).length;
        G.doneIds = []; P.recentIds = [];        // 排除单局冷却，只看结构性可发
      }
    }
    const ratio33 = slots33 ? drop33 / slots33 : 0;
    console.log("  " + pinY + " 钉卡可发率 " + ((1 - ratio33) * 100).toFixed(1) +
      "%（档期 " + slots33 + " 个 · eligible 丢弃钉卡 " + drop33 + " 张）");
    check(ratio33 < 0.5, "钉卡丢弃率应 < 50%（#33 触发荒回归守卫，实际 " + (ratio33 * 100).toFixed(1) + "%）");
    if (ratio33 >= 0.25) {                       // 只在可疑时甩原因分布，省得定位要改代码
      const why33 = {};
      (G.pinMiss || []).forEach(x => { why33[x.why] = (why33[x.why] || 0) + 1; });
      console.log("  ⚠ 丢弃原因分布（顶格 500 条样本）：" +
        Object.keys(why33).map(k => k + "×" + why33[k]).join(" ｜ "));
    }
    G.year = 1985;
  }

  /* --- #33 触发荒回归守卫（真实时代表口径）---
     1991 年（时代表第二档）按 balance.planSlots 的天花板跑 12 个月 × 200 次：
     钉卡因 eligible 失败被静默丢弃的比例 must < 50%。
     两个历史主闸都已由 eraAt / normalizePins 拆掉 —— 身份白名单（tracks/parties/…）
     是设计而非荒，这里按 pick 人群口径（track="*"）测。 */
  {
    const era2 = KEYS(P.reg.era)[1] || KEYS(P.reg.era)[0];
    const pinY = (P.reg.era[era2].scheduled || []).map(s => s.year).sort()[0] || 1991;
    const b33 = P.balance();
    let slots33 = 0, drop33 = 0;
    G.year = pinY; G.tier = 4; G.track = "*"; G.party = "*"; G.stance = "*";
    G.origin = o0; G.entry = n0; G.talent = t0; G.state = "";
    G.rep = 50; G.fav = 10; G.lev = 0; G.hp = 70; G.fun = 500; G.flags = [];
    for (let run = 0; run < 200; run++) {
      P._pinsNormalized = false;                 // 每次重跑一遍 normalizePins，模拟新开局
      P.G.doneIds = []; P.recentIds = []; G.pinMiss = [];
      for (let m = 1; m <= 12; m++) {
        G.month = m - 1;
        const plan = P.planMonth(b33.slotsMax);
        slots33 += b33.slotsMax;
        drop33 += (G.pinMiss || []).length;
        P.G.doneIds = []; P.recentIds = [];      // 排除单局冷却，只看结构性可发
      }
    }
    const ratio33 = slots33 ? drop33 / slots33 : 0;
    console.log("  " + pinY + " 钉卡可发率 " + ((1 - ratio33) * 100).toFixed(1) +
      "%（档期 " + slots33 + " 个 · eligible 丢弃钉卡 " + drop33 + " 张）");
    check(ratio33 < 0.5, "钉卡丢弃率应 < 50%（#33 触发荒回归守卫，实际 " + (ratio33 * 100).toFixed(1) + "%）");
    if (ratio33 >= 0.25) {                       // 只在可疑时甩原因分布，省得定位要改代码
      const why = {};
      (G.pinMiss || []).forEach(x => { why[x.why] = (why[x.why] || 0) + 1; });
      console.log("  ⚠ 丢弃原因分布（顶格 500 条样本）：" +
        Object.keys(why).map(k => k + "×" + why[k]).join(" ｜ "));
    }
    G.year = 1985; G.track = (P.reg.track[n0] || {}).track_suggest || e0;
  }

  /* 时代压力：危机年 > 常态年；丑闻再把活跃度顶上去 */
  G.year = 2008; const pCrisis = P.pressure();
  G.year = 2025; const pCalm = P.pressure();
  check(pCrisis > pCalm, "危机年的时代压力应高于常态年（" + pCrisis + " vs " + pCalm + "）");
  G.flags = ["scandal_2"];
  check(P.pressure() > pCalm, "丑闻缠身应把活跃度顶上去（" + P.pressure() + " vs " + pCalm + "）");
  G.flags = [];
  check(typeof P.pressureLabel().text === "string" && !!P.pressureLabel().cls, "pressureLabel 应返回文案与配色类名");

  /* 量级分布：压力越高，大事件越多、小事越少 */
  const sample = (pr, n) => { const c = { major: 0, mid: 0, minor: 0 }; for (let i = 0; i < n; i++) c[P.pickGrade(pr)]++; return c; };
  const SN = 30000, lo = sample(0, SN), hi = sample(5, SN);
  const pct = (v) => (v / SN * 100).toFixed(1);
  console.log("  压力 0 → 大 " + pct(lo.major) + "% ／ 中 " + pct(lo.mid) + "% ／ 小 " + pct(lo.minor) + "%");
  console.log("  压力 5 → 大 " + pct(hi.major) + "% ／ 中 " + pct(hi.mid) + "% ／ 小 " + pct(hi.minor) + "%");
  check(hi.major / SN > lo.major / SN * 2, "高压力下大事件占比应明显更高");
  check(lo.minor / SN > hi.minor / SN, "低压力下小事占比应更高");

  /* 时代脚本：2008 年 9 月必定是「救市」 */
  G.year = 2008; G.month = 8; G.flags = []; G.doneIds = []; P.recentIds = [];
  const sep = P.planMonth(9);
  check(sep.length >= 1, "2008 年 9 月应有档期");
  check(sep.some(s => s.eventId === "2008_crash_offer"), "2008 年 9 月应命中定点事件 2008_crash_offer");
  check(sep[0].scheduled === true, "定点事件应排在当月第一位");
  const crash = P.events.find(e => e.id === "2008_crash_offer");
  const drawn = P.drawEvent({ eventId: "2008_crash_offer", grade: "major" });
  /* dyn 卡抽中时 realize 成绝对值副本（不同人物各自按标尺展开），
     故不能比对象同一 —— 校 id + 副本回指原卡 + 已脱离系数态 */
  check(drawn && drawn.id === "2008_crash_offer" &&
    (crash.dyn ? (drawn.__raw === crash && drawn.__realized === true) : drawn === crash),
    "定点档期应直接给出该事件（dyn 卡返回展开副本）");
  check(G.doneIds.indexOf("2008_crash_offer") >= 0, "定点事件演完后应进 doneIds（一局只演一次）");

  /* 平静的月份：低压力年份应能抽到「没事发生」的月 */
  G.doneIds = []; P.recentIds = [];
  G.year = 2035;                                    // 远离所有定点年份
  let quiet = 0; const tries = 400;
  for (let i = 0; i < tries; i++) { G.month = 3; if (!P.planMonth(4).length) quiet++; }
  check(quiet > 0, "低压力年份应能抽到「平静的月份」（" + quiet + "/" + tries + "）");

  /* 走一遍月历：从 1 月推到年终，看一年到底有多少事 */
  G.doneIds = []; P.recentIds = [];
  G.year = 2008; G.month = 0; G.quietMonths = [];
  let months = 0, eventMonths = 0, slots = 0, guard = 0;
  /* v0.5.2：advanceMonth 对平静月也返回 "quiet"（逐月停留）——
     测试循环要区分：停留是因为有事（出档期）还是平静（继续推） */
  while (++guard < 40) {
    const r = P.advanceMonth();
    if (!r) break;
    months++;
    if (r === "event") { eventMonths++; slots += G.monthPlan.length; }
  }
  console.log("  2008 年（压力 5）：走过的月份 " + months + " 个（有事 " + eventMonths + "）／ 档期 " + slots +
    " 个 ／ 平静 " + G.quietMonths.length + " 个月");
  check(months === 12, "逐月停留模型下一年应走满 12 个月：" + months);
  check(eventMonths >= 2 && eventMonths <= 12, "一年里「有事发生」的月份数应落在 2-12：" + eventMonths);
  check(slots >= eventMonths && slots <= 48, "一年的事件档期数应落在合理区间：" + slots);
  check(G.quietMonths.length === 12 - eventMonths, "平静月份数应与有事月份数互补");

  /* 日期自洽率：抽取时优先给"就是本月"或"没有月份"的事件。
     剩下一小部分是池子太薄时的降级（引擎会先放开月份、再放开去重窗口）。
     这个比例会随着事件池变大而自然下降 —— 它是内容量的指标，不是引擎 bug。 */
  G.doneIds = []; P.recentIds = [];
  let mismatch = 0, drawn0 = 0;
  for (let i = 0; i < 2000; i++) {
    G.month = P.rint(1, 12);
    const ev = P.drawEvent({ grade: P.pickGrade(P.pressure()) });
    drawn0++;
    if (ev.month != null && ev.month !== G.month) mismatch++;
  }
  console.log("  日期自洽率 " + (100 - mismatch / drawn0 * 100).toFixed(1) + "%（" + mismatch + "/" + drawn0 + " 因事件池太薄而降级）");
  check(mismatch / drawn0 < 0.30, "月份不符的降级比例过高（" + (mismatch / drawn0 * 100).toFixed(1) + "%），事件池太薄");

  /* 媒介时间轴：同一件事，年代不对就不该发生。
     用一个合成 tv 探针（只声明 medium），专测「媒介→年份」放行与 eligible 联动，
     不绑定任何具体时代事件（pre-1980 演示包已清理）。*/
  const tvEv = { id: "__tv_probe", medium: "tv" };
  const shortEv = P.events.find(e => e.id === "media_viral_clip");
  const fakeEv = P.events.find(e => e.id === "media_deepfake");
  const blogEv = P.events.find(e => e.id === "media_blog_drop");
  check(!!shortEv && !!fakeEv && !!blogEv, "媒介时间轴演示包应已注册");
  G.era = "2008_CRASH"; G.flags = []; G.tier = 0; G.doneIds = []; P.recentIds = [];
  G.year = 1700;
  check(!P.mediumOK(tvEv), "1700 年不应放行「电视」事件");
  check(!P.mediumOK(blogEv), "1700 年不应放行「互联网」事件");
  check(!P.eligible(tvEv), "1700 年电视事件不应可触发（eligible 联动）");
  G.year = 1960;
  check(P.mediumOK(tvEv), "1960 年应放行「电视」事件");
  check(P.eligible(tvEv), "1960 年电视事件应可触发（eligible 联动）");
  check(!P.mediumOK(shortEv), "1960 年不应放行「短视频」事件");
  check(!P.mediumOK(fakeEv), "1960 年不应放行「合成影像」事件");
  G.year = 2010;
  check(P.mediumOK(blogEv), "2010 年应放行「互联网」事件");
  check(!P.mediumOK(shortEv), "2010 年不应放行「短视频」事件（2018 才有）");
  G.year = 2020;
  check(!P.mediumOK(fakeEv), "2020 年不应放行「合成影像」事件（2022 才有）");
  G.year = 2025;
  check(P.mediumOK(shortEv), "2025 年应放行「短视频」事件");
  check(P.mediumOK(fakeEv), "2025 年应放行「合成影像」事件");

  /* 多渠道声明 = 「有其一即可」 */
  const either = { medium: ["tv", "internet"] };
  G.year = 1700; check(!P.mediumOK(either), "多渠道声明：两个都不存在时不应放行");
  G.year = 1960; check(P.mediumOK(either), "多渠道声明：只要有一个存在就放行");

  /* 年份窗口（fromYear / toYear / years） */
  G.year = 1960;
  check(P.yearOK({}), "没写年份窗口的事件任何年份都成立");
  check(!P.yearOK({ fromYear: 1990 }), "fromYear 之后才成立的事件在 1960 年不成立");
  check(!P.yearOK({ toYear: 1900 }), "toYear 之前才成立的事件在 1960 年不成立");
  check(P.yearOK({ years: [1950, 1970] }), "years 区间内应成立");
  check(!P.yearOK({ years: [1980, 1990] }), "years 区间外不应成立");

  /* 界面用的「本年媒介清单」 */
  G.year = 1960;
  const meds = P.mediaNow().map(m => m.key);
  check(meds.indexOf("radio") >= 0 && meds.indexOf("tv") >= 0, "1960 年应有广播与电视");
  check(meds.indexOf("internet") < 0 && meds.indexOf("shortvideo") < 0, "1960 年不该有互联网 / 短视频");
  G.year = 2025;
  const meds2 = P.mediaNow().map(m => m.key);
  check(meds2.indexOf("shortvideo") >= 0 && meds2.indexOf("deepfake") >= 0, "2025 年应有短视频与合成影像");
}

/* ---------- 掷骰分布 ---------- */
console.log("\n== 掷骰分布 (P=0.5, 10000 次) ==");
const firstEra = Object.keys(P.reg.era)[0], firstOrigin = Object.keys(P.reg.origin)[0],
  firstTalent = Object.keys(P.reg.talent)[0], firstEntry = Object.keys(P.reg.entry)[0],
  firstParty = Object.keys(P.reg.party)[0], firstStance = Object.keys(P.reg.stance)[0];
P.CSEL = { era: firstEra, origin: firstOrigin, talent: firstTalent, entry: firstEntry, party: firstParty, stance: firstStance, name: "测试" };
P.confirmCreate();
P.G.talent = "__none__"; P.G.attr = { CHA: 50, INT: 50, CUN: 50, INTG: 50 }; P.G.faction = {};
const dist = { crit: 0, ok: 0, meh: 0, fail: 0, critfail: 0 };
for (let i = 0; i < 10000; i++) dist[P.rollTier(0.5).tier]++;
for (const k in dist) console.log("  " + k + ": " + (dist[k] / 100).toFixed(1) + "%");
check(Math.abs(dist.crit / 10000 - 0.15) < 0.03, "crit 概率应约 15%");
check(Math.abs(dist.critfail / 10000 - 0.03) < 0.02, "critfail 概率应约 3%");

/* ---------- 资源经济 & D&D 投注 ---------- */
console.log("\n== 资源经济 / 投注 ==");
{
  P.CSEL = { era: firstEra, origin: firstOrigin, talent: firstTalent, entry: firstEntry, party: firstParty, stance: firstStance, name: "资源测试" };
  P.confirmCreate();
  const tChoice = {
    id: "__res", text: "t", base: 0.4, cost: { fun: 100000 },
    stake: { fun: true, fav: true }, outcomes: {}
  };
  P.G.fun = 2000000; P.G.fav = 2;
  const noStake = P.computeP(tChoice).P;
  const tPer = P.stakeSpec(tChoice).fun.per;      /* 级别价由引擎算，探针不写死金额 */
  const st = P.stakeInfo(tChoice, { fun: 2, fav: 1 });
  const withStake = P.computeP(tChoice, st);
  check(withStake.P > noStake, "投注资金/人情后胜算应提高（" + noStake + " → " + withStake.P + "）");
  check(st.cost.fun === 2 * tPer && st.cost.fav === 1, "投注花费计算错误：" + JSON.stringify(st.cost));
  check(st.reroll === true, "投入人情应获得重投（advantage）");
  check(ZH(() => P.computeP(tChoice, st).breakdown.some(b => b.label.indexOf("投入") === 0)), "判定明细应包含『投入·』条目");
  check(withStake.target === Math.round(withStake.P * 100), "target 应与胜算一致");

  /* 上限：狂投也不能突破 0.95 */
  P.G.fun = 999999999;
  const capSt = P.stakeInfo(tChoice, { fun: 999999, fav: 1 });
  check(P.computeP(tChoice, capSt).P <= 0.95, "投注后胜算不应超过 0.95");

  /* 余额不足 → 投注被夹到可用余额（单价恒定，档数看家底） */
  P.G.fun = 100000; P.G.fav = 0;
  const poor = P.stakeInfo(tChoice, { fun: 5, fav: 1 });
  check(poor.cost.fun <= 100000 && poor.cost.fav === 0,
    "余额不足时投注花费应被夹到可用余额：" + JSON.stringify(poor.cost));

  /* advantage：分布应显著优于单次（大成功率上升、大失败率下降） */
  const adv = P.rollTierAdv(0.5, true);
  check(adv.rerolled === true && Array.isArray(adv.rolls) && adv.rolls.length === 2, "rollTierAdv 应返回两次骰值与 rerolled 标记");
  const N = 20000;
  let dAdv = { crit: 0, ok: 0, meh: 0, fail: 0, critfail: 0 }, dOne = { crit: 0, ok: 0, meh: 0, fail: 0, critfail: 0 };
  for (let i = 0; i < N; i++) {
    dAdv[P.rollTierAdv(0.5, true).tier]++;
    dOne[P.rollTier(0.5).tier]++;
  }
  const meanRank = (d) => (d.critfail * 0 + d.fail * 1 + d.meh * 2 + d.ok * 3 + d.crit * 4) / N;
  check(dAdv.crit / N > dOne.crit / N, "advantage 的大成功率应高于单次（" + (dAdv.crit / N * 100).toFixed(1) + "% vs " + (dOne.crit / N * 100).toFixed(1) + "%）");
  check(dAdv.critfail / N <= dOne.critfail / N, "advantage 的大失败率不应高于单次");
  check(meanRank(dAdv) > meanRank(dOne) + 0.1, "advantage 的平均档位应明显优于单次（" + meanRank(dAdv).toFixed(2) + " vs " + meanRank(dOne).toFixed(2) + "）");

  /* 无 stake 声明的选项不应开启投注面板 */
  check(P.stakeSpec({ base: 0.5 }) === null, "未声明 stake 的选项不应返回投注规格");
}

/* ---------- 投注档位上限 / 死局保护 ---------- */
console.log("\n== 投注档位上限 / 死局保护 ==");
{
  P.CSEL = { era: firstEra, origin: firstOrigin, talent: firstTalent, entry: firstEntry, party: firstParty, stance: firstStance, name: "上限测试" };
  P.confirmCreate();

  /* 精力(ap) 已于 v0.9 退役，不再是投注加码轴；投注只剩资金(fun) + 人情(fav)。 */

  /* 资金：每档 +4%、上限 +30% → 吃满上限需要 8 档（档数由 cap÷w 决定，与每档金额无关） */
  const funCh = { id: "__fun", text: "t", base: 0.4, stake: { fun: true }, outcomes: {} };
  const per = P.stakeSpec(funCh).fun.per;         /* 级别价：一档 ≈ 该职级月薪 */
  console.log("  资金：每档 " + P.fmtUsd(per) + " → +4%、上限 +30%");
  P.G.fun = 999999999;
  const funMaxRich = P.stakeMax("fun", funCh);
  console.log("  资金：每档 +4%、上限 +30% → 最多 " + funMaxRich + " 档");
  check(Math.abs(funMaxRich * 0.04 - 0.30) < 0.05, "资金满档应能吃到接近 +30% 的上限，实际 +" + (funMaxRich * 0.04 * 100).toFixed(0) + "%");
  check(P.stakeInfo(funCh, { fun: 999 }).cost.fun <= P.G.fun, "资金扣款不得超过现有资金");

  /* #28① 之后余额只夹档数：家底只够 5 档，单价一分不改 */
  P.G.fun = per * 5;
  {
    const p2 = P.stakeSpec(funCh).fun.per;         // 级别价与余额无关
    const max2 = P.stakeMax("fun", funCh);
    check(p2 === per, "余额变少不许改动单价（" + P.fmtUsd(per) + " → " + P.fmtUsd(p2) + "）");
    check(max2 * p2 <= P.G.fun, "钱只够几档就该被夹在几档内（" + max2 + " 档 × " + P.fmtUsd(p2) + " > " + P.fmtUsd(P.G.fun) + "）");
    check(P.stakeInfo(funCh, { fun: max2 + 9 }).cost.fun === max2 * p2, "扣款应等于档数×汇率，实际 " + P.stakeInfo(funCh, { fun: max2 + 9 }).cost.fun);
  }

  /* 一档都投不起 → 上限必须是 0（界面据此把 ＋ 置灰并说明原因，而不是"点了没反应"） */
  P.G.fun = 300; P.G.fav = 0;                     // 低于 perMin：单价夹在地板之上
  const favCh = { id: "__fav", text: "t", base: 0.4, stake: { fav: true }, outcomes: {} };
  check(P.stakeMax("fun", funCh) === 0, "钱不够一档时资金上限应为 0（正是『资金＋点了没用』的成因）");
  check(P.stakeMax("fav", favCh) === 0, "没人情时人情上限应为 0");

  /* 单调性 & 硬上限：档数变多，加成只增不减，且永远不越过 cap */
  P.G.fun = 999999999;
  let prevB = -1, mono = true;
  for (let n = 0; n <= 20; n++) {
    const b = P.stakeInfo(funCh, { fun: n }).bonus;
    if (b < prevB - 1e-9 || b > 0.30 + 1e-9) mono = false;
    prevB = b;
  }
  check(mono, "资金投注加成必须单调不减，且永不超过 +30%");
  check(P.stakeMax("fav", favCh) === 1 || P.G.fav === 0, "有人情时人情应可投 1 点");
}

/* ---------- 投注级别价（#28①：单价只看身位，不看钱包） ----------
 * 演进：v0.6 全游戏写死 $250k（T0 永远投不进第一档）→ v0.7 补"事件钱量级"锚 →
 * v0.12 再补"钱袋闸"（单价随余额涨 —— 玩家投诉"同一件事，穷时便宜富时贵"）→
 * #28① 三条锚删到只剩身位锚：per = officeSalary(track,tier) × perSalaryMonths × gradeMul，
 * 夹进 [perMin, perMax] 后抹零。**余额唯一的作用是决定你押得起几档**（见 stakeMax）。 */
console.log("\n== 投注级别价（单价随身位·不随钱包）==");
{
  P.CSEL = { era: firstEra, origin: firstOrigin, talent: firstTalent, entry: firstEntry, party: firstParty, stance: firstStance, name: "汇率测试" };
  P.confirmCreate();
  /* 本块的断言都拿 mid 量级当尺子，先把"当前量级"定死：
     前面某块（三值性/节奏探针）present 过 minor 卡的话，G.__curGrade 会残留成 minor，
     级别价就按 0.6× 算，下面的 档数 × 单价 全部对不上。 */
  P.G.__curGrade = "mid";
  const CL = (cost, oc) => ({ id: "__r", text: "t", base: 0.4, cost: cost, stake: { fun: true }, outcomes: oc || {} });
  const bigCh = CL({ fun: 400000 });                          // 事件里写着大钱
  const noMoneyCh = CL({ rep: 1 });                           // 事件里一分钱没写

  /* ① 身位轴：同一个选项，职位越高每档越贵 —— 价码全部由薪资表推导 */
  const byTier = [];
  for (let t = 0; t <= P.balance().tierMax; t++) {
    P.G.tier = t; P.G.track = "electoral";
    byTier.push(P.stakeFunPer().per);
  }
  console.log("  同一选项各身位一档价码：" + byTier.map((v, i) => "T" + i + " " + P.fmtUsd(v)).join(" / "));
  check(byTier.every((v, i) => i === 0 || v >= byTier[i - 1]), "每档金额必须随身位单调不降");
  check(byTier[byTier.length - 1] > byTier[0], "最高身位的价码必须显著高于最低身位（" + P.fmtUsd(byTier[0]) + " → " + P.fmtUsd(byTier[byTier.length - 1]) + "）");
  check(P.stakeSpec(bigCh).fun.per === byTier[P.G.tier], "stakeSpec 必须把级别价写进 spec.fun.per");

  /* ② #36 标尺：一档 ≈ 该职级 perSalaryMonths 个月的月薪（默认 1 个月） */
  P.G.tier = 3; P.G.track = "electoral";
  const months = P.balance().stakeRates.fun.perSalaryMonths;
  check(months === 1, "perSalaryMonths 应为 1（一档 = 一个月月薪），实际 " + months);
  check(P.stakeFunPer("mid").per === P.niceUsd(P.officeSalary()), "mid 量级的一档应正好是月薪抹零，实际 " + P.fmtUsd(P.stakeFunPer("mid").per) + " vs " + P.fmtUsd(P.officeSalary()));

  /* ③ #28① 核心断言：单价与余额、与事件钱量级**彻底脱钩** */
  const unit = P.stakeFunPer("mid").per;
  for (const cash of [3000, 20000, 200000, 5000000, 50000000]) {
    P.G.fun = cash;
    check(P.stakeFunPer("mid").per === unit, "余额 " + P.fmtUsd(cash) + " 不该改动单价（级别价锚已退役钱袋闸）");
  }
  P.G.fun = 20000;
  check(P.stakeFunPer("mid").per === unit, "事件写没写钱都不改单价（钱量级锚已退役）：无钱选项 " + P.fmtUsd(P.stakeFunPer("mid").per) + " vs 有钱选项");
  check(P.stakeSpec(noMoneyCh).fun.per === P.stakeSpec(bigCh).fun.per, "同一身位下，两种钱量级的选项应报同一个单价");
  check(P.stakeFunPer("major").per > P.stakeFunPer("minor").per, "量级系数仍生效：major 一档应比 minor 贵（" + P.fmtUsd(P.stakeFunPer("minor").per) + " → " + P.fmtUsd(P.stakeFunPer("major").per) + "）");

  /* ④ 余额只决定"押得起几档"：大款押得更多，但每档同价 */
  P.G.fun = 20000; const poorNotches = P.stakeMax("fun", bigCh);
  P.G.fun = 2000000; const richNotches = P.stakeMax("fun", bigCh);
  console.log("  同一身位（T3）余额 2 万 → " + poorNotches + " 档，200 万 → " + richNotches + " 档（单价恒为 " + P.fmtUsd(unit) + "）");
  check(richNotches > poorNotches, "钱多只能体现为档数更多（" + poorNotches + " → " + richNotches + "）");
  check(P.stakeMax("fun", bigCh) === Math.min(8, Math.floor(P.G.fun / unit)), "档数上限应 = min(cap÷w 档, floor(余额÷单价))");
  check(P.stakeInfo(bigCh, { fun: 999 }).cost.fun === richNotches * unit, "扣款应等于档数×单价，实际 " + P.stakeInfo(bigCh, { fun: 999 }).cost.fun);

  /* ⑤ 手感基准：T0 志愿者（月薪 $1k）投得起第一档，但押不满 */
  P.G.tier = 0; P.G.track = "electoral"; P.G.fun = 10000;
  check(P.stakeMax("fun", bigCh) >= 1, "T0 家底 $10k 至少要投得起 1 档（旧版写死 $250k 时恒为 0）");
  P.G.fun = 3000;
  check(P.stakeMax("fun", bigCh) >= 0, "极小家底不该报错");

  /* ⑥ 内容写死 per 时以内容为准（不参与级别价换算） */
  const fixedCh = { id: "__f", text: "t", base: 0.4, cost: { fun: 400000 }, stake: { fun: { per: 777000, w: 0.05, cap: 0.25 } }, outcomes: {} };
  const fixedSpec = P.stakeSpec(fixedCh);
  check(fixedSpec.fun.per === 777000, "写死的 per 必须原样保留，实际 " + fixedSpec.fun.per);
  check(fixedSpec.fun.__rate.source === "content", "写死 per 的汇率来源应标为 content");

  /* ⑦ 抹零与边界：每档金额是好读的整数，且落在护栏内 */
  P.G.tier = 2;
  const rp = P.stakeFunPer();
  check(rp.per % 500 === 0, "每档金额应是 500 的整数倍（" + rp.per + "）");
  check(rp.per >= P.balance().stakeRates.fun.perMin && rp.per <= P.balance().stakeRates.fun.perMax, "每档金额应落在 [perMin, perMax] 内");

  /* ⑧ 界面文案必须说得清价码来源（级别价不能是新的黑箱） */
  const note = ZH(() => P.stakeRateNote(bigCh, "mid"));
  check(note.indexOf("月薪") >= 0 && note.indexOf("身位") >= 0, "汇率说明应交代『按身位定价 + 月薪推导』：" + note);
  check(note.indexOf("家底") >= 0 && note.indexOf("单价") >= 0, "汇率说明应讲明余额只决定押得起几档：" + note);
  check(ZH(() => P.stakeRateNote(fixedCh, "mid")).indexOf("剧情写定") >= 0, "写死 per 的事件应说明『价码由剧情写定』");
  check(P.fmtUsd(400) === "$400" && P.fmtUsd(250000) === "$250k" && P.fmtUsd(1500000) === "$1.5M",
    "金额格式化：$400 / $250k / $1.5M，实际 " + [400, 250000, 1500000].map(P.fmtUsd).join(" / "));

  /* ⑨ #28② 投机收益吃 INT：同一条生意，聪明人赚得多、翻车亏得少 */
  {
    const lev = P.balance().funMulIntLev;
    check(lev > 0, "funMulIntLev 应默认开启（#28②），实际 " + lev);
    P.G.__stakeBase = 100000;
    const gain = function (int) {
      P.G.fun = 0; P.G.attr.INT = int;
      P.applyEffects({ funMul: 2 });
      return P.G.fun;
    };
    const dumb = gain(30), mid = gain(50), smart = gain(80);
    check(dumb < mid && mid < smart, "同一笔本金，收益应随 INT 递增（" + dumb + " / " + mid + " / " + smart + "）");
    check(mid === 200000, "INT=50 时倍率不缩放，$100k × 2.0 = $200k，实际 " + mid);
    check(smart === Math.round(100000 * 2 * (1 + 0.3 * lev)), "INT=80 的收益应正好按公式放大，实际 " + smart);
    const loss = function (int) {
      P.G.fun = 1000000; P.G.attr.INT = int;
      P.applyEffects({ funMul: -1 });
      return 1000000 - P.G.fun;
    };
    check(loss(80) < loss(30), "翻车时高 INT 亏得更少（" + loss(30) + " vs " + loss(80) + "）");
    P.G.attr.INT = 50;
    P.G.fun = 0; P.G.__stakeBase = 0;
    P.applyEffects({ funMul: 2 });
    check(P.G.fun === 0, "没有本金声明时 funMul 不许凭空生钱");
  }

  /* ⑩ 工资与投注同源：officeSalary 是唯一口径 */
  P.G.tier = 3; P.G.track = "electoral";
  check(P.officeSalary() === P.reg.officeSalary["electoral_3"], "officeSalary 应取 reg.officeSalary 的表值");
  P.G.track = "__none__";
  check(P.officeSalary() === P.reg.officeSalary["*_3"], "轨道 miss 应退到 *_tier 通配");

  /* ⑨ 学生贷款：难度门 + 计息还款 + 归零锁死 + 不扣负（P.loanStep） */
  {
    const sl = P.balance().studentLoan || {};
    check(sl.enabled === true, "studentLoan 应默认启用");
    check(((sl.startDebt || {}).easy || 0) === 0 && ((sl.startDebt || {}).legendary || 0) === 0, "世家难度（easy/legendary）不应背学贷");
    ["normal", "hard", "brutal"].forEach(function (d) {
      check(((sl.startDebt || {})[d] || 0) > 0, d + " 难度应有开局学贷（>0）");
    });
    /* 无贷 → loanStep 返回 null、余额恒 0 */
    P.G.debt = 0; P.G.fun = 500000; P.G.tier = 2; P.G.track = "electoral";
    check(P.loanStep() === null, "余额为 0 时 loanStep 应返回 null（不产生任何扣款）");
    check(P.G.debt === 0 && P.G.fun === 500000, "无贷时资金与余额都不应被改动");
    /* 有贷 + 现金充足 + 高层：逐月还款，余额单调不升直至归零，绝不为负 */
    /* v0.12 学贷改制后：月份钉死在 6 月、临时关掉 PSLF —— 本块断言的是"还款物理"，
       不该被年度资本化（1 月）和豁免清零（攒满合格月）这两个新机关混进来 */
    P.G.month = 6;
    const pslfKeep9 = sl.pslf; sl.pslf = {};
    P.G.debtAccr = 0;
    P.G.debt = sl.startDebt.normal; P.G.fun = 5000000; P.G.tier = 6; P.G.track = "electoral";
    let prev = P.G.debt, cleared = false, bad = 0;
    for (let i = 0; i < 1200; i++) {
      const r = P.loanStep();
      if (!r) { cleared = true; break; }
      if (!(r.remaining >= 0 && Number.isFinite(r.remaining)) || r.remaining > prev + 1) bad++;
      prev = r.remaining;
    }
    check(bad === 0, "现金充足高层下学贷余额必须单调不升且非负（越界 " + bad + " 次）");
    check(cleared, "联邦高层收入下学贷应在 1200 个月内还清（体现「收入越高越快清零」）");
    check(P.G.debt === 0, "还清后余额应锁死为 0");
    /* 低层 + 现金见底：月供被现金封顶，绝不把 fun 扣成负 */
    P.G.debt = 40000; P.G.fun = 50; P.G.tier = 0; P.G.track = "electoral";
    const lr = P.loanStep();
    check(lr && P.G.fun >= 0, "现金见底时不得把资金扣成负数（本月少还/不还本）");
    check(lr && P.G.debt > 0, "低层只够付息时学贷应仍挂着（还原多年后仍在还）");
    /* 逾期跟踪：连续还不满 → loanLate 逐月累加；一次按时/结清即归零 */
    P.G.debt = 60000; P.G.fun = 0; P.G.tier = 0; P.G.track = "electoral"; P.G.loanLate = 0;
    let lateRun = 0;
    for (let i = 0; i < 6; i++) { const r = P.loanStep(); if (r && r.pay < 1) lateRun++; }
    check(P.G.loanLate >= 5, "现金持续见底、长期还不满时 loanLate 应逐月累加（实际 " + P.G.loanLate + "）");
    check(lateRun >= 5, "无现金月份月供应被现金封顶压到近 0（本月不还本）");
    P.G.fun = 5000000; P.loanStep();
    check(P.G.loanLate === 0, "现金充裕、按时还满后 loanLate 应归零");
    /* debt 效果处理器：一次性抹平贷款并清逾期 */
    P.G.debt = 40000; P.G.loanLate = 20; P.applyEffects({ debt: -999999 });
    check(P.G.debt === 0 && P.G.loanLate === 0, "debt 负值效果应清零余额并把 loanLate 归零");
    /* 违约拖累事件：已注册、量级正确、cond 门控在逾期门槛之上才放行 */
    const lde = P.evById ? P.evById("fin2_loan_default") : null;
    check(!!lde, "应注册 fin2_loan_default（学贷长期违约压力事件）");
    if (lde) {
      check(lde.valence === "bane" && lde.unique === true, "fin2_loan_default 应为 bane + unique");
      const lm = (P.balance().studentLoan || {}).lateMonths || 12;
      P.G.debt = 60000; P.G.loanLate = lm;
      check(lde.cond(P.G) === true, "逾期达门槛时违约事件 cond 应放行");
      P.G.loanLate = 1;
      check(lde.cond(P.G) === false, "未达逾期门槛时违约事件 cond 应挡住");
      P.G.debt = 0; P.G.loanLate = 99;
      check(lde.cond(P.G) === false, "已还清（余额0）时违约事件 cond 应挡住");
    }
    /* 复位，不污染后续校验 */
    sl.pslf = pslfKeep9;
    P.G.debt = 0; P.G.loanLate = 0; P.G.debtAccr = 0; P.G.pendingHardEnd = null;
  }

  /* ⑩ v0.12 学贷改制：单利 + 年度资本化 + 缓交 + PSLF（#25）与存档格式门禁（#26） */
  {
    const s = P.balance().studentLoan || {};
    const G = P.G;
    /* 现场快照，块尾整体还原 */
    const bak = {
      month: G.month, year: G.year, debt: G.debt, debtAccr: G.debtAccr, loanLate: G.loanLate,
      loanCaps: G.loanCaps, forbearUntil: G.forbearUntil, forbearUsed: G.forbearUsed,
      forbearActive: G.forbearActive, pslfMonths: G.pslfMonths, pslfDone: G.pslfDone,
      fun: G.fun, rep: G.rep, tier: G.tier, track: G.track, pendingHardEnd: G.pendingHardEnd,
      flags: (G.flags || []).slice(), log: (G.log || []).slice()
    };
    /* 政策参数入库 */
    check(!!s.forbear && s.forbear.maxMonths === 24 && s.forbear.perMonths === 6 && s.forbear.repCost > 0,
      "forbear 政策参数应入库（终身 24 月 / 单次 6 月 / 恢复扣声望>0）");
    check(!!s.pslf && s.pslf.months === 120 && (s.pslf.minTier || 1) >= 1,
      "pslf 政策参数应入库（120 合格月 / minTier≥1）");

    G.month = 6; G.debtAccr = 0; G.loanCaps = 0; G.forbearUntil = 0; G.forbearUsed = 0;
    G.forbearActive = false; G.pslfMonths = 0; G.pslfDone = false; G.loanLate = 0;
    /* —— 单利不变量：零缴款 12 个月，本金分文不动、月息恒定、欠息全进桶 —— */
    G.debt = 120000; G.fun = 0; G.tier = 0; G.track = "electoral"; G.pendingHardEnd = null;
    const i0 = Math.round(G.debt * s.interestAnnual / 12);
    let siBad = 0;
    for (let i = 0; i < 12; i++) {
      const r = P.loanStep();
      if (!r || r.interest !== i0) siBad++;
      if (G.debt !== 120000) siBad++;
    }
    check(siBad === 0, "单利制：零缴款 12 个月里月息应恒定、本金应分文不增（复利绝迹）");
    check(G.debtAccr === i0 * 12, "单利制：未缴的欠息应全额躺在桶里（" + G.debtAccr + " vs " + i0 * 12 + "）");
    /* —— 年度资本化：1 月桶并入本金，loanCaps+1 —— */
    G.month = 1;
    const cap0 = G.debtAccr, debt0 = G.debt;
    const rc = P.loanStep();
    check(!!rc && rc.capitalized === cap0 && G.debt === debt0 + cap0,
      "1 月资本化：欠息桶应一次性并入本金");
    check(G.loanCaps === 1 && rc.interest === Math.round((debt0 + cap0) * s.interestAnnual / 12),
      "1 月资本化：计息基数换新本金，次数记 1");
    /* —— 缓交：申请 → 冻结三态（不扣钱/不记逾期/欠息照攒）→ 期满资本化+扣声望 —— */
    G.month = 6; G.debt = 60000; G.debtAccr = 0; G.loanCaps = 0; G.fun = 200000; G.tier = 2;
    G.loanLate = 3; G.pendingHardEnd = null; G.pslfMonths = 0; G.pslfDone = false;
    check(P.forbearInfo().canStart === true, "有贷且额度充足时应可申请缓交");
    check(P.startForbear(6) === true, "startForbear(6) 应成功");
    check(G.forbearUsed === 6 && G.forbearUntil === P.monthSeq() + 5,
      "缓交申请：应记终身额度并冻结到「本月起共 6 个月」");
    const funB = G.fun, lateB = G.loanLate;
    const rf = P.loanStep();
    check(!!rf && rf.frozen === true && rf.pay === 0 && G.fun === funB, "冻结期：不还款、不扣资金");
    check(G.loanLate === lateB, "冻结期：逾期计数应暂停（既不累加也不清零）");
    check(rf.bucket === rf.interest && rf.bucket > 0, "冻结期：欠息照常进桶");
    check(P.forbearInfo().active === true && P.forbearInfo().leftMonths === 6, "冻结期：面板应报剩余月数（含当月）");
    G.year += 1;   /* 跳过窗口到恢复月（仍钉在 6 月，避免与年度资本化混叠） */
    const repB = G.rep, debtB = G.debt;
    const rr = P.loanStep();
    check(!!rr && rr.frozen === false && rr.capitalized === rf.bucket, "缓交期满：恢复月应把桶内欠息全部资本化");
    check(G.debt === debtB + rr.capitalized - rr.principal, "缓交期满：本金 = 旧本金 + 资本化 − 当月还本");
    check(G.rep === Math.max(0, repB - s.forbear.repCost), "缓交期满：征信留痕应扣一笔声望");
    check(G.forbearUntil === 0 && G.forbearActive === false, "恢复后冻结标记应清干净");
    /* 无贷不得申请缓交 */
    G.debt = 0; G.debtAccr = 0;
    check(P.forbearInfo().canStart === false, "无贷时不应可申请缓交");
    G.debt = 60000;
    /* —— PSLF：临时把门槛调小验证机关，层级/缓交两种不合格月不计数 —— */
    const pslfKeep = s.pslf;
    s.pslf = { months: 3, minTier: 2 };
    G.month = 6; G.tier = 2; G.fun = 1000000; G.loanLate = 0; G.debtAccr = 0; G.pendingHardEnd = null;
    G.pslfMonths = 0; G.pslfDone = false;
    P.loanStep(); P.loanStep();
    check(G.pslfMonths === 2 && !G.pslfDone, "PSLF：合格月应逐月累加（未达标不豁免）");
    const r3 = P.loanStep();
    check(!!r3 && r3.pslfForgiven === true, "PSLF：攒满合格月应触发豁免");
    check(G.debt === 0 && G.debtAccr === 0 && G.pslfDone === true, "PSLF：豁免应本金+欠息一笔清零");
    check((G.flags || []).indexOf("pslf_forgiven") >= 0, "PSLF：应挂成就 flag（结算屏与档案读它）");
    /* 缓交月不计合格月 */
    s.pslf = { months: 999, minTier: 1 };
    G.debt = 60000; G.debtAccr = 0; G.pslfMonths = 0; G.pslfDone = false; G.flags = [];
    G.forbearUntil = 0; G.forbearActive = false; G.forbearUsed = 0;
    P.startForbear(6);
    const rp = P.loanStep();
    check(!!rp && rp.frozen === true && G.pslfMonths === 0, "PSLF：缓交冻结月不应计合格月");
    /* tier 低于 minTier 不计数 */
    G.year += 1; P.loanStep();          /* 先让缓交期满恢复 */
    G.tier = 0; G.pslfMonths = 0; G.month = 6; G.debt = 60000; G.debtAccr = 0;
    P.loanStep();
    check(G.pslfMonths === 0, "PSLF：层级低于 minTier 的月份不应计合格月");
    s.pslf = pslfKeep;
    /* —— 存档格式门禁（#26）—— */
    check(P.saveIsStale({}) === true && P.saveIsStale({ saveVer: (P.SAVE_FORMAT || 12) - 1 }) === true,
      "无盖 / 旧格式存档应判 stale（硬拒载入）");
    check(P.saveIsStale({ saveVer: P.SAVE_FORMAT }) === false, "当前格式应放行");
    const svBak = G.saveVer;
    G.saveVer = 0;
    check(JSON.parse(P.serialize()).saveVer === P.SAVE_FORMAT, "serialize 应给存档盖当前格式号");
    G.saveVer = svBak;
    /* —— 还原现场 —— */
    G.month = bak.month; G.year = bak.year; G.debt = bak.debt; G.debtAccr = bak.debtAccr;
    G.loanLate = bak.loanLate; G.loanCaps = bak.loanCaps;
    G.forbearUntil = bak.forbearUntil; G.forbearUsed = bak.forbearUsed; G.forbearActive = bak.forbearActive;
    G.pslfMonths = bak.pslfMonths; G.pslfDone = bak.pslfDone;
    G.fun = bak.fun; G.rep = bak.rep; G.tier = bak.tier; G.track = bak.track;
    G.pendingHardEnd = bak.pendingHardEnd;
    G.flags = bak.flags; G.log = bak.log;
  }
}

/* ---------- 死局保护 ---------- */
console.log("\n== 死局保护 ==");
{
  P.G.fun = 0; P.G.rep = 0;
  const dead = [
    { id: "a", text: "A", base: 0.4, req: { fun: 99999999 }, outcomes: {} },
    { id: "b", text: "B", base: 0.4, cost: { fun: 99999999 }, outcomes: {} }
  ];
  const fi = P.fallbackIndex(dead);
  console.log("  死局保护：两个选项都点不动 → 放行第 " + (fi + 1) + " 个");
  check(fi === 1, "全被堵死时应优先放行『只是资源不够』的那个（下标 1），实际 " + fi);
  const forcedBtnIsSelectable = fi >= 0 && fi < dead.length;
  check(forcedBtnIsSelectable, "保底下标必须落在选项范围内");
  check(P.fallbackIndex([
    { id: "x", text: "X", base: 0.4, outcomes: {} },                            // 免费无条件
    { id: "y", text: "Y", base: 0.4, cost: { fun: 9999999 }, outcomes: {} }
  ]) === -1, "本来就有能选的选项时不该干预");
  check(P.fallbackIndex([
    { id: "x", text: "X", base: 0.4, req: { tier: 5 }, outcomes: {} },
    { id: "y", text: "Y", base: 0.4, req: { tier: 5 }, outcomes: {} }
  ]) === 0, "只有『门槛』堵死时也要放行一个（否则彻底卡死）");
  check(P.fallbackIndex([]) === -1, "空选项列表不应崩溃");
}

/* ---------- 模拟对局（走真实的月度主循环） ----------
 * 可复现性：引擎一律用 Math.random()，那让"两次独立跑"必然有随机差异 ——
 * n 大时某个结局 ±10 局完全可能是噪声，A/B 就没法定论。
 * 所以模拟阶段把 Math.random 换成定种 PRNG（mulberry32），A/B 就能在**同一批生涯**上比较，
 * 差异的方差远小于两个独立比例的方差。
 *   node tools/validate.js                       → 默认 20 局快速校验（每次提交跑这个）
 *   node tools/validate.js --games=300 --seed=20260921 → 300 局全量口径（A/B 平衡核验时显式开）
 * 层级/结局分布对比只有在同 --games 同 --seed 下才可比；小样本单格差异是噪声，勿下结论。
 * 只影响本文件的模拟阶段，引擎与其它测试不受影响。 */
function mulberry32(seed) {
  let s = (seed >>> 0) || 1;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const _argN = (name, dflt) => {
  const hit = process.argv.find(a => a.indexOf("--" + name + "=") === 0);
  return hit ? Number(hit.split("=")[1]) : dflt;
};
const GAMES = Math.max(1, Math.round(_argN("games", 20)));   /* 默认 20 局快速校验；300 局 A/B 用 --games=300 显式开 */
const SEED = Math.round(_argN("seed", 20260921));
/* --diff=normal|hard|brutal|... 锁定难度跑生涯模拟（学贷断供校准用）；缺省 normal */
const SIM_DIFF = (process.argv.find(a => a.indexOf("--diff=") === 0) || "").split("=")[1] || "normal";
const K = (o) => Object.keys(o);
const eras = K(P.reg.era), origins = K(P.reg.origin), talents = K(P.reg.talent),
  entries = K(P.reg.entry), parties = K(P.reg.party), stances = K(P.reg.stance);

/* simulate(games, seed)：走真实月度主循环跑一批生涯，返回全部观测 + 体验指标。
 * 抽成函数是为了 --tune 网格搜索能反复调用同一套模拟。 */
function simulate(games, seed) {
const _realRandom = Math.random;
Math.random = mulberry32(seed);
let tiers = {}, demoTiers = {}, endings = {}, errs = [];
let draws = 0, games_ = 0, fillers = 0, gradeHit = { major: 0, mid: 0, minor: 0 };
/* 投注观测：v0.7 每档金额是动态的，必须能看见"模拟里到底押了多少"，
   否则分布一变就分不清是机制变了还是投注策略变了。 */
let stakeEvents = 0, stakeFunSpent = 0, stakeFunTiers = 0;
let slotsPerYear = [], monthHist = {}, catHit = {}, medHit = { none: 0, gated: 0 }, dateDrift = 0;
/* #32 四大类实际出场账：验收要看两件事 ——
   ① 随机类年均 ≤ pace.yearRandomMax（超发就是刷属性/刷钱）；
   ② 倒挂转正：固定历史 ≥ 职业 ≥ 随机（玩家最看重的是"史实到点必演"，不是巧合）。 */
let kindHit = { fixed: 0, campaign: 0, career: 0, random: 0, shady: 0 }, simYears = 0;
let eraSpecific = 0, eraGeneric = 0;
/* 静好岁月：平静月一共结算了多少段随笔、其中有多少段抽不出文字（说明素材有洞） */
let quietTotal = 0, vigCount = 0, vigEmpty = 0;
/* 按时代拆开的专属/通用计数 —— 只看总数会掩盖"某个时代几乎没有自己的内容"这种问题 */
const eraMix = {};
/* ---- 体验指标（三值性 v2）----
 * valHit：每档期实际抽到的三值性（含降级后的真实类）；
 * net：每次判定动作的净收益（单位：当前人物标尺下的"份"，outcome − cost，不含投注）；
 * streakBadGames：单局里出现"连续 ≥4 次净损≤-0.25 份"的局数（连环崩盘感）；
 * fallenGames：经历过下野的局数；baneNetAvg：威胁事件平均净损（伤害是否真实存在）。 */
let valHit = { boon: 0, risk: 0, bane: 0 }, netSum = 0, netSq = 0, netN = 0;
let streakBadGames = 0, fallenGames = 0, endFun = 0, baneNetSum = 0, baneNetN = 0;
/* 8年 demo 窗口累计：只统计每局开局 8 年（≈1980—88）——玩家 demo 期真正看到的东西，
   不被 55 年全生涯和后期时代稀释。fixed = 走 fixed 表的真实历史定点大事件（slot.eventId 有值，
   上面「时代专属占比」按 ev.era 判、把这批 scoped/绝对年的真事件漏计了）。 */
const demo = { draws: 0, cat: {}, grade: { major: 0, mid: 0, minor: 0 }, val: { boon: 0, risk: 0, bane: 0 }, fixed: 0, slotStats: [] };
let monthRepeat = 0;                              // 同一自然月内同卡重演次数（回归检测，应为 0）
/* 单卡终身衰减（idRepeatMul）的效果面板：每张真实卡相邻两次被抽的间隔（月）。
   衰减做没做对，看两个数就够：间隔 <12 个月的重演占比、单局同卡最多抽几次。 */
let repGaps = [], repWorst = { id: null, n: 0 };
/* 学贷断供面板（--diff 校准用）：每局最长连续逾期、破产局数/次数 */
let loanLateAll = [], loanBankruptGames = 0, loanBankruptEvents = 0;
for (let r = 0; r < games; r++) {
  let runCur = 0, runWorst = 0, demoTier = null, hardEnded = false;
  const idSeq = {};                                // 本局每张真实卡被抽中的 monthSeq 序列
  /* 学贷断供观测（难度校准）：本局最长连续逾期月数 + 是否因此破产 */
  let maxLate = 0, thisBankrupt = 0;
  try {
    P.CSEL = { era: eras[r % eras.length], origin: origins[r % origins.length], talent: talents[r % talents.length], entry: entries[r % entries.length], party: parties[r % parties.length], stance: stances[r % stances.length], name: "N" + r, difficulty: SIM_DIFF };
    P.confirmCreate();
    const G = P.G, b = P.balance();
    let done = false;
    for (let y = 0; y < 55 && !done; y++) {
      simYears++;
      // 每年恢复精力（与 endYear 同口径），保证 ap 类代价有东西可付
      G.ap = P.clamp((b.apBase == null ? 6 : b.apBase) + Math.floor(G.hp / (b.apHealthDiv || 25)), b.apMin || 1, b.apMax || 12);
      G.month = 0; G.quietMonths = []; G.monthPlan = []; G.slotIndex = 0; G.slotCount = 0;
      let yearSlots = 0, months = 0, guard = 0;
      /* 用 time.js 的真实推进：跳过平静的月份，停在有事发生的月份 */
      let yearMonths = 0;
      while (!done && ++guard < 60 && yearMonths < 12) {
        const r = P.advanceMonth();
        if (!r) break;
        yearMonths++;
        maxLate = Math.max(maxLate, G.loanLate || 0);
        /* 账本型 BE（学贷断供在月度结算里挂 pendingHardEnd）：与 stage.js nextMonth 同口径收口 */
        if (G.pendingHardEnd) {
          const rule = P.evaluateEnding(G.pendingHardEnd);
          if (G.pendingHardEnd === "bankrupt") { thisBankrupt++; loanBankruptEvents++; }
          endings[rule.id] = (endings[rule.id] || 0) + 1;
          hardEnded = true; G.pendingHardEnd = null; done = true; break;
        }
        if (r !== "event") continue;          /* 平静月：成长已在 settleQuietMonth 结掉 */
        months++;
        const _mset = new Set();                 // 本月已出现的真实卡 id —— 侦测「同月重复」回归
        for (let i = 0; i < G.monthPlan.length && !done; i++) {
          const slot = G.monthPlan[i];
          const ev = P.drawEvent(slot);
          if (!ev || !ev.choices || !ev.choices.length) throw new Error("drawEvent 返回空事件");
          draws++; yearSlots++;
          if (!ev.filler) { if (_mset.has(ev.id)) monthRepeat++; else _mset.add(ev.id); }
          {                                          // 同卡重演间隔（idRepeatMul 效果面板）
            const seq = (idSeq[ev.id] || (idSeq[ev.id] = []));
            if (seq.length) repGaps.push(P.monthSeq() - seq[seq.length - 1]);
            seq.push(P.monthSeq());
            if (seq.length > repWorst.n) repWorst = { id: ev.id, n: seq.length };
          }
          gradeHit[P.gradeOf(ev)] = (gradeHit[P.gradeOf(ev)] || 0) + 1;
          if (ev.filler) fillers++;
          catHit[ev.category || "—"] = (catHit[ev.category || "—"] || 0) + 1;
          /* #32：真实出场过的四大类（灰产单列，它走独立额度） */
          if (!ev.filler) {
            const bk = (P.eventKind(ev) === "random" && ev.category === "shady") ? "shady" : P.eventKind(ev);
            kindHit[bk] = (kindHit[bk] || 0) + 1;
          }
          {
            const isSp = ev.era && ev.era.length < eras.length;
            if (isSp) eraSpecific++; else eraGeneric++;
            const mm = eraMix[G.era] || (eraMix[G.era] = { sp: 0, gen: 0 });
            if (isSp) mm.sp++; else mm.gen++;
          }
          if (y < 8) {                              // 开局 8 年另计一份不受后期稀释的分布
            demo.draws++;
            const dcat = ev.category || "—"; demo.cat[dcat] = (demo.cat[dcat] || 0) + 1;
            const dg = P.gradeOf(ev); if (demo.grade[dg] != null) demo.grade[dg]++;
            const dv = P.valenceOf(ev); if (demo.val[dv] != null) demo.val[dv]++;
            if (slot && slot.eventId) demo.fixed++;
          }
          if (P.mediumOK(ev)) medHit.none++; else medHit.gated++;
          /* 统计「月份降级」发生率（池子薄时引擎会放开月份限制，不算错误） */
          if (ev.month != null && ev.month !== G.month) dateDrift++;
          /* 只挑「付得起代价」的选项，模拟真实 UI 里被禁用的情况。
             v0.9：精力(ap)/健康(hp) 已退役，代价里一律忽略（与 stage.js 的 costBlock 同口径）。 */
          const pay = (c) => !c.cost || Object.keys(c.cost).every(k => k === "ap" || k === "hp" || (G[k] || 0) >= c.cost[k]);
          const pool = ev.choices.filter(pay);
          const usable = pool.length ? pool : [ev.choices[0]];
          const ch = usable[Math.floor(Math.random() * usable.length)];
          /* 随机投注：只押「押得起、又不伤本」的一注。
             v0.7 起每档金额随身位与事件钱量级浮动（balance.stakeRates.fun），所以判据
             不能是"付得起一档"—— 在动态汇率下那等于"人人每局都押"，A/B 量到的是策略漂移
             而不是机制漂移。改成「家底至少是四档的钱」（一档不超过家底的 1/4），
             对汇率不敏感，也更像一个会算账的玩家。 */
          let stake = null;
          const spec = P.stakeSpec(ch);
          if (spec) {
            const s = { fun: 0, fav: 0 };
            const per = (spec.fun && spec.fun.per) || 0;
            if (spec.fun && per > 0 && G.fun >= per * 4) s.fun = P.rint(1, 2);
            if (spec.fav && G.fav >= 1) s.fav = P.chance(0.5) ? 1 : 0;
            const info = P.stakeInfo(ch, s);
            for (const k in info.cost) G[k] = (G[k] || 0) - info.cost[k];
            if (info.cost.fun > 0) { stakeEvents++; stakeFunSpent += info.cost.fun; stakeFunTiers += s.fun; }
            stake = info;
          }
          if (ch.cost) for (const k in ch.cost) G[k] = (G[k] || 0) - ch.cost[k];
          G.fav = P.clamp(G.fav, 0, 20); G.ap = P.clamp(G.ap, 0, 99);
          if (!Number.isFinite(G.fun)) throw new Error("资金出现非法值：" + G.fun);
          const rp = P.computeP(ch, stake).P;
          if (!(rp >= 0.05 && rp <= 0.95)) throw new Error("胜算越界 " + rp);
          const t = P.rollTierAdv(rp, !!(stake && stake.reroll)).tier;
          const out = ch.outcomes[t] || ch.outcomes.ok;
          if (!out) throw new Error("缺结果档 " + t + " @ " + ev.id);
          /* 体验指标：这次动作的净"份"数 = 收益净值 − 代价净值（投注另计，不混进事件平衡） */
          {
            const gN = P.gradeOf(ev);
            let net = P.netScore(out.effects, gN, ev);
            if (ch.cost) net -= P.netScore(ch.cost, gN, ev);
            netSum += net; netSq += net * net; netN++;
            const vz = P.valenceOf(ev);
            valHit[vz] = (valHit[vz] || 0) + 1;
            if (vz === "bane") { baneNetSum += net; baneNetN++; }
            if (net <= -0.25) { runCur++; if (runCur > runWorst) runWorst = runCur; } else runCur = 0;
          }
          P.applyEffects(out.effects);
          if (G.pendingHardEnd) {
            const rule = P.evaluateEnding(G.pendingHardEnd);
            endings[rule.id] = (endings[rule.id] || 0) + 1;
            hardEnded = true; G.pendingHardEnd = null; done = true;
          }
          if (G.hp <= 0) done = true;
        }
      }
      monthHist[months] = (monthHist[months] || 0) + 1;
      slotsPerYear.push(yearSlots);
      if (y < 8) demo.slotStats.push(yearSlots);
      /* 静好岁月：这一年的平静月应该都被结算成"一段日子"（走的是 advanceMonth 的真实路径） */
      quietTotal += (G.quietMonths || []).length;
      (G.quietLog || []).forEach(function (e) { vigCount++; if (!e.text) vigEmpty++; });
      G.year++; G.age++; G.hp = P.clamp(G.hp, 0, 100);
      /* 8 年 demo 快照：真实玩家一局 demo 大约打 8 年。晋升脊柱的年限闸让 8 年内
         最多摸到「联邦众」(tier6, 累计 92 月≈7.7 年)；参/州长要 120 月、总统要 194 月——
         所以正常爬梯 8 年够不到总统，只有破格跳级(tier+2/+3)的人中龙凤能走捷径。
         这里单独记 8 年那一刻的层级，与「生涯终局」分开看（后者跑满 55 年，是另一码事）。 */
      if (demoTier == null && (y + 1) >= 8) demoTier = G.tier;
      /* 丑闻自然消退（与 endYear 同口径） */
      for (let i = 5; i >= 1; i--) {
        const f = "scandal_" + i;
        if (P.hasFlag(f) && P.chance(b.scandalDecayChance)) { P.delFlag(f); if (i > 1) P.addFlag("scandal_" + (i - 1)); }
      }
      if (G.hp <= 0) { const rule = P.evaluateEnding("death_health"); endings[rule.id] = (endings[rule.id] || 0) + 1; done = true; }
    }
    games_++;
    if (P.G.hp > 0 && !hardEnded) { const rule = P.evaluateEnding("retire"); endings[rule.id] = (endings[rule.id] || 0) + 1; }
    tiers["T" + P.G.tier] = (tiers["T" + P.G.tier] || 0) + 1;
    if (demoTier == null) demoTier = P.G.tier;          // 8 年内就出局（死亡）→ 用终局层级
    demoTiers["T" + demoTier] = (demoTiers["T" + demoTier] || 0) + 1;
    /* 单局体验收尾：连环崩盘 / 下野经历 / 终局家底 */
    if (runWorst >= 4) streakBadGames++;
    if ((P.G.fallenCount || 0) > 0) fallenGames++;
    endFun += P.G.fun || 0;
    loanLateAll.push(maxLate);
    if (thisBankrupt) loanBankruptGames++;
  } catch (e) { errs.push(e.message); if (errs.length > 5) break; }
}
const avgSlots = slotsPerYear.reduce((a, b) => a + b, 0) / Math.max(1, slotsPerYear.length);
Math.random = _realRandom;                       // 模拟结束，恢复真随机（不影响后续任何东西）
return {
  tiers: tiers, demoTiers: demoTiers, endings: endings, errs: errs, draws: draws, games: games_, fillers: fillers, gradeHit: gradeHit,
  stakeEvents: stakeEvents, stakeFunSpent: stakeFunSpent, stakeFunTiers: stakeFunTiers,
  monthHist: monthHist, catHit: catHit, medHit: medHit, dateDrift: dateDrift,
  kindHit: kindHit, simYears: simYears,
  eraSpecific: eraSpecific, eraGeneric: eraGeneric, eraMix: eraMix,
  quietTotal: quietTotal, vigCount: vigCount, vigEmpty: vigEmpty, avgSlots: avgSlots,
  valHit: valHit,
  netAvg: netN ? netSum / netN : 0,
  netStd: netN ? Math.sqrt(Math.max(0, netSq / netN - Math.pow(netSum / netN, 2))) : 0,
  netPerGame: games_ ? netSum / games_ : 0,
  streakBadGames: streakBadGames, fallenGames: fallenGames,
  endFunAvg: games_ ? endFun / games_ : 0,
  baneNetAvg: baneNetN ? baneNetSum / baneNetN : 0,
  monthRepeat: monthRepeat,
  repGaps: repGaps, repWorst: repWorst,
  loanLateAll: loanLateAll, loanBankruptGames: loanBankruptGames, loanBankruptEvents: loanBankruptEvents,
  demo: demo
};
}

/* ---------- --tune：valenceWeights 网格搜索（需求 2「分布反推」） ----------
 * 候选 = boon × bane 网格（risk 吃余量），每个候选用同一颗种子跑一批生涯，
 * 按「成长感为主 + 有张力但不连环崩」的复合评分排名。定案后把胜者写回
 * 01-config.js 的 balance.valenceWeights，再跑全量 validate 终验。
 *   node tools/validate.js --tune [--tune-games=120] [--seed=N] */
if (process.argv.includes("--tune")) {
  const TG = Math.max(30, Math.round(_argN("tune-games", 120)));
  const savedW = Object.assign({}, P.balance().valenceWeights);
  const inBand = (x, lo, hi) => (x >= lo && x <= hi) ? 0 : Math.min(3, Math.abs(x < lo ? lo - x : x - hi) * 100);
  const cands = [];
  [0.30, 0.35, 0.40, 0.45, 0.50].forEach(function (boon) {
    [0.10, 0.15, 0.20, 0.25, 0.30].forEach(function (bane) {
      if (boon + bane > 0.7) return;
      cands.push({ boon: boon, risk: +(1 - boon - bane).toFixed(2), bane: bane });
    });
  });
  const rows = [];
  for (const c of cands) {
    P.balance().valenceWeights = { boon: c.boon, risk: c.risk, bane: c.bane };
    const s = simulate(TG, SEED);
    const dn = Math.max(1, s.draws);
    const boonR = s.valHit.boon / dn, baneR = s.valHit.bane / dn;
    const t5R = (s.tiers["T5"] || 0) / Math.max(1, s.games);
    /* 复合评分：每项越界记 1 分，分越少越好。目标带 =「成长感为主 + 有张力但不连环崩」：
       boon 30-45% ／ bane 15-30% ／ 月均净值 +0.02~+0.25 份 ／ 方差 ≥0.15（有起伏）
       ／ 连环崩盘 ≤10% ／ 下野经历 8-45%（有挫折但不惯常）／ 终局 ≥3 种 ／ T5 ≥3% ／ 填充 <15% */
    const score = inBand(boonR, 0.30, 0.45) + inBand(baneR, 0.15, 0.30)
      + inBand(s.netAvg, 0.02, 0.25) + (s.netStd < 0.15 ? (0.15 - s.netStd) * 10 : 0)
      + inBand(s.streakBadGames / Math.max(1, s.games), 0, 0.10)
      + inBand(s.fallenGames / Math.max(1, s.games), 0.08, 0.45)
      + (Object.keys(s.endings).length >= 3 ? 0 : 1)
      + (t5R < 0.03 ? (0.03 - t5R) * 100 : 0)
      + (s.fillers / dn >= 0.15 ? 2 : 0)
      + (s.errs.length ? 99 : 0);
    rows.push({ c: c, score: score, boonR: boonR, baneR: baneR, netAvg: s.netAvg, netStd: s.netStd,
      streak: s.streakBadGames / Math.max(1, s.games), fallen: s.fallenGames / Math.max(1, s.games),
      t5: t5R, ends: Object.keys(s.endings).length, fill: s.fillers / dn });
  }
  P.balance().valenceWeights = savedW;             // 搜索完恢复默认，不污染后面的常规检查
  rows.sort((a, b) => a.score - b.score);
  console.log("\n== --tune valenceWeights 网格搜索（每候选 " + TG + " 局 · 种子 " + SEED + "） ==");
  console.log("  boon/risk/bane ｜ 越界分 ｜ 实测boon ｜ 实测bane ｜ netAvg ｜ netStd ｜ 连环崩 ｜ 下野率 ｜ T5率 ｜ 结局数 ｜ 填充率");
  rows.forEach(function (x) {
    console.log("  " + x.c.boon.toFixed(2) + "/" + x.c.risk.toFixed(2) + "/" + x.c.bane.toFixed(2) +
      " ｜ " + x.score.toFixed(2) +
      " ｜ " + (x.boonR * 100).toFixed(1) + "% ｜ " + (x.baneR * 100).toFixed(1) + "%" +
      " ｜ " + x.netAvg.toFixed(3) + " ｜ " + x.netStd.toFixed(3) +
      " ｜ " + (x.streak * 100).toFixed(1) + "% ｜ " + (x.fallen * 100).toFixed(1) + "%" +
      " ｜ " + (x.t5 * 100).toFixed(1) + "% ｜ " + x.ends + " ｜ " + (x.fill * 100).toFixed(1) + "%");
  });
  const w = rows[0].c;
  console.log("  ★ 最优分布：valenceWeights = { boon: " + w.boon.toFixed(2) + ", risk: " + w.risk.toFixed(2) + ", bane: " + w.bane.toFixed(2) + " }（越界分 " + rows[0].score.toFixed(2) + "）→ 写回 01-config.js 后跑全量终验");
  process.exit(0);
}

console.log("\n== 生涯模拟 " + GAMES + " 局（月度回合 · 种子 " + SEED + "） ==");
const sim = simulate(GAMES, SEED);
const tiers = sim.tiers, endings = sim.endings, errs = sim.errs;
const draws = sim.draws, games = sim.games, fillers = sim.fillers, gradeHit = sim.gradeHit;
const stakeEvents = sim.stakeEvents, stakeFunSpent = sim.stakeFunSpent, stakeFunTiers = sim.stakeFunTiers;
const monthHist = sim.monthHist, catHit = sim.catHit, medHit = sim.medHit, dateDrift = sim.dateDrift;
const eraSpecific = sim.eraSpecific, eraGeneric = sim.eraGeneric, eraMix = sim.eraMix;
const quietTotal = sim.quietTotal, vigCount = sim.vigCount, vigEmpty = sim.vigEmpty, avgSlots = sim.avgSlots;
const valHit = sim.valHit, netAvg = sim.netAvg, netStd = sim.netStd, netPerGame = sim.netPerGame;
const streakBadGames = sim.streakBadGames, fallenGames = sim.fallenGames, endFunAvg = sim.endFunAvg, baneNetAvg = sim.baneNetAvg;
console.log("  运行时错误: " + (errs.length ? errs.slice(0, 5).join(" | ") : "无"));
console.log("  层级分布【8年demo快照】: " + JSON.stringify(sim.demoTiers) + "   ← 玩家真实视角：多数应到市议员、少数摸联邦众、总统仅异数");
console.log("  层级分布【生涯终局55年】: " + JSON.stringify(tiers) + "   ← 跑满 lifespan，含破格火箭线");
console.log("  结局分布: " + JSON.stringify(endings));
{   /* 学贷断供面板：普通人格（随机选项）下连续逾期的分布与破产率 —— lateLimit 校准的读数 */
  const ll = (sim.loanLateAll || []).slice().sort((a, b) => a - b);
  const q = (p) => ll.length ? ll[Math.min(ll.length - 1, Math.floor(ll.length * p))] : 0;
  const lim = (P.balance().studentLoan || {}).lateLimit || {};
  console.log("  学贷断供【" + SIM_DIFF + "·每局最长连续逾期】: 中位 " + q(0.5) + " ｜ p90 " + q(0.9) + " ｜ 峰值 " + (ll[ll.length - 1] || 0) +
    " ｜ 信用破产 " + sim.loanBankruptGames + "/" + games + " 局（共 " + sim.loanBankruptEvents + " 次） ｜ 现行阈值 " + JSON.stringify(lim));
  /* --late-cap=99 不设防时的换算法：若阈值定为 N，破产率 ≈ 最长连续断供 ≥N 的局数占比
     （近似口径：模拟不会主动用缓交泄压，是破产率的上界）。逐候选值直接给读数，省得换算。 */
  if (ll.length && lim[(Object.keys(lim)[0])] >= 60) {
    console.log("  阈值换算【若 lateLimit=N → 破产局占比】: " +
      [3, 4, 5, 6, 8, 10, 12, 16, 20].map(N => N + "→" + (ll.filter(x => x >= N).length / games * 100).toFixed(0) + "%").join(" ｜ "));
  }
}
console.log("  每年档期 平均 " + avgSlots.toFixed(1) + " 个 ｜ 每年有事发生的月数分布 " + JSON.stringify(monthHist));
console.log("  每局平均事件 " + (draws / Math.max(1, games)).toFixed(0) + " 个 ｜ 量级 " + JSON.stringify(gradeHit) +
  " ｜ 填充 " + (fillers / Math.max(1, draws) * 100).toFixed(1) + "%" +
  " ｜ 月份降级 " + (dateDrift / Math.max(1, draws) * 100).toFixed(1) + "%");
{   /* 同卡重演间隔面板：idRepeatMul（单卡终身衰减）的读数。
     衰减没生效 → <12 个月的重演会明显占比；衰减过猛 → 老卡全躺尸、填充率飙升。 */
  const g = (sim.repGaps || []).slice().sort((a, b) => a - b);
  const qq = (p) => g.length ? g[Math.min(g.length - 1, Math.floor(g.length * p))] : 0;
  const lt12 = g.filter(x => x < 12).length;
  console.log("  同卡重演【间隔/月】: 共 " + g.length + " 次（" + (g.length / Math.max(1, games)).toFixed(1) + " 次/局） ｜ 中位 " + qq(0.5) +
    " ｜ <12 个月 " + (g.length ? (lt12 / g.length * 100).toFixed(1) : "0") + "% ｜ 单局同卡最多 " + sim.repWorst.n + " 次（" + sim.repWorst.id + "）");
}
console.log("  类型分布: " + JSON.stringify(catHit));
{   /* #32 四大类实际节奏：随机类年均 ≤ 额度，且倒挂转正（固定历史 ≥ 职业 ≥ 随机）。 */
  const k = sim.kindHit || {}, Y = Math.max(1, sim.simYears || 1);
  const per = (n) => (n / Y).toFixed(2);
  const rand = (k.random || 0) + (k.shady || 0);
  console.log("  四大类【年均/局】: 固定 " + per(k.fixed) + " ｜ 职业 " + per(k.career) +
    " ｜ 随机 " + per(rand) + "（含灰产 " + per(k.shady) + "） ｜ 竞选 " + per(k.campaign) +
    " ｜ 额度 " + JSON.stringify(P.balance().pace) + " ｜ 样本 " + Y + " 年");
}
console.log("  投注观测：押过钱的判定 " + (stakeEvents / Math.max(1, draws) * 100).toFixed(1) + "% 次" +
  "（平均 " + (stakeFunTiers / Math.max(1, stakeEvents)).toFixed(2) + " 档）" +
  " ｜ 每局押掉 $" + Math.round(stakeFunSpent / Math.max(1, games) / 1000) + "k");
console.log("  静好岁月：平静月 " + (quietTotal / Math.max(1, games)).toFixed(1) + " 个/局 ｜ 结算随笔 " +
  (vigCount / Math.max(1, games)).toFixed(1) + " 段/局 ｜ 抽不出文字的 " + vigEmpty + " 段");
console.log("  时代专属事件占比 " + (eraSpecific / Math.max(1, draws) * 100).toFixed(1) +
  "%（时代专属 " + eraSpecific + " ／ 跨时代通用 " + eraGeneric + "，balance.eraWeightMul=" + P.balance().eraWeightMul + "）");
console.log("    按时代：" + Object.keys(eraMix).map(function (k) {
  const m = eraMix[k], t = m.sp + m.gen;
  return k + " " + (t ? (m.sp / t * 100).toFixed(1) : "0.0") + "%（" + m.sp + "/" + t + "）";
}).join(" ｜ "));
/* ---- 8年 demo 专项口径：开局前 8 年（≈1980-88），与 55 年全生涯分开看，不被高层/后期时代稀释 ---- */
{
  const d = sim.demo, DD = Math.max(1, d.draws), dg2 = Math.max(1, games);
  const pct = (n) => (n / DD * 100).toFixed(1) + "%";
  const dcat = Object.entries(d.cat).sort((a, b) => b[1] - a[1]).map(([k, v]) => (k.slice(0, 2) + " " + (v / dg2).toFixed(1) + "/局")).join("  ");
  const dAvgSlots = d.slotStats.length ? (d.slotStats.reduce((a, b) => a + b, 0) / d.slotStats.length) : 0;
  console.log("== 8年 demo 专项口径（开局≈1980-88·每局）==");
  console.log("  demo 事件 " + (d.draws / dg2).toFixed(1) + " 个/局（每年 " + (d.draws / dg2 / 8).toFixed(1) + "）｜ demo 每年档期 " + dAvgSlots.toFixed(1) + "（全生涯 " + avgSlots.toFixed(1) + "）");
  console.log("  demo 量级: 大 " + pct(d.grade.major) + " 中 " + pct(d.grade.mid) + " 小 " + pct(d.grade.minor) +
    " ｜ demo 三值性: 机 " + pct(d.val.boon) + " 险 " + pct(d.val.risk) + " 危 " + pct(d.val.bane));
  console.log("  demo 真实历史定点大事件: " + (d.fixed / dg2).toFixed(1) + " 个/局（走 fixed 表·占 demo 事件 " + pct(d.fixed) + "，这批不计入上面『时代专属』口径）");
  console.log("  demo 分类: " + dcat);
}
/* ---- 体验指标面板（三值性 v2）：分布 / 净值 / 张力 ----
 * 这些数字是 --tune 网格搜索评分的同款观测；常规模式下打印供人工审读。 */
{
  const dn = Math.max(1, draws), gn = Math.max(1, games);
  console.log("  三值性实抽占比: boon " + (valHit.boon / dn * 100).toFixed(1) + "% ｜ risk " + (valHit.risk / dn * 100).toFixed(1) +
    "% ｜ bane " + (valHit.bane / dn * 100).toFixed(1) + "%（含降级修正）");
  console.log("  净值体验: 平均每动作 " + netAvg.toFixed(3) + " 份（σ " + netStd.toFixed(3) + "）｜ 每局累计 " + netPerGame.toFixed(1) +
    " 份 ｜ 威胁事件均损 " + baneNetAvg.toFixed(3) + " 份");
  console.log("  张力: 连环崩盘局(连续≥4损) " + (streakBadGames / gn * 100).toFixed(1) + "% ｜ 经历过下野 " + (fallenGames / gn * 100).toFixed(1) +
    "% ｜ 终局均家底 $" + Math.round(endFunAvg / 1000) + "k");
  /* 体验断言只在验收模式（--val-strict，即全库改写+分布校准完成后）硬判；
     常态只打印，供迁移过程中人工审读趋势。 */
  if (process.argv.includes("--val-strict")) {
    check(valHit.boon / dn >= 0.15, "机遇(boon)实抽占比过低（" + (valHit.boon / dn * 100).toFixed(1) + "%）——池子太薄导致大量降级，成长感缺失");
    check(streakBadGames / gn <= 0.20, "连环崩盘局占比过高（" + (streakBadGames / gn * 100).toFixed(1) + "%）——体验是挨打不是博弈");
  }
}
console.log("  同月重复卡回归检测: " + sim.monthRepeat + " 次（同一自然月内同卡重演，应为 0）");
check(sim.monthRepeat === 0, "同一自然月内出现了重复卡 " + sim.monthRepeat + " 次——月内去重闸门失效");
check(errs.length === 0, "模拟过程出现运行时错误");
/* 四条统计性断言在小样本下必然假报警（1 局只会有 1 个结局、1 条生涯的年均值噪声极大）。
   它们只在 GAMES >= STAT_MIN 时生效，好让 `--games=1` 成为并行 worker 的秒级结构快通道。 */
const STAT_MIN = 8;
const thinSample = GAMES < STAT_MIN;
if (thinSample) console.log("  · 样本 " + GAMES + " 局 < " + STAT_MIN + "：跳过 " + 4 + " 项统计断言（提交前请用默认 20 局跑全）");
check(thinSample || stakeEvents > 0, GAMES + " 局里应当有人押过钱 —— 否则投注机制在模拟里从未被走到，平衡结论无效");
check(thinSample || Object.keys(endings).length >= 2, "结局过于单一，只有：" + Object.keys(endings).join(","));
check(avgSlots >= 2, "每年档期数低于 2（当前 " + avgSlots.toFixed(1) + "）——月度节奏没跑起来，单局也判得出");
/* 上限 13：gap 填充事件（129/130/131/133）本意就是加密空档年的档期，20 局样本实测 12.3；
   再高才算节奏失调（一年最多 12 个自然月，>13 意味着多卡挤同月的体感变差）。 */
check(thinSample || avgSlots <= 13, "每年档期数均值应 ≤13（当前 " + avgSlots.toFixed(1) + "）——超出说明月度节奏失调");
check(draws / Math.max(1, games) >= 20, "每局平均事件数过少（" + (draws / Math.max(1, games)).toFixed(1) + "），月度节奏没生效");
check(thinSample || gradeHit.major > 0, "模拟中从未出现大事件");
check(fillers / Math.max(1, draws) < 0.3, "填充事件占比过高，说明事件池太薄：" + (fillers / Math.max(1, draws) * 100).toFixed(1) + "%");
check(medHit.gated === 0, "模拟中出现了媒介门控失效的事件：" + medHit.gated);
check(Object.keys(catHit).length >= 5, "事件类型过于单一，只有 " + Object.keys(catHit).length + " 种");
check(eraSpecific / Math.max(1, draws) >= 0.15,
  "时代专属事件占比过低（" + (eraSpecific / Math.max(1, draws) * 100).toFixed(1) + "%）——通用事件淹没了时代内容，考虑调高 eraWeightMul 或给该时代加内容");
check(vigCount > 0, "模拟里一段「静好岁月」都没结算——平静月的成长/叙事路径没被走到");
check(vigEmpty === 0, "有 " + vigEmpty + " 段随笔抽不出文字（素材库在某种状态下缺槽位）");
{   /* ---- #32 事件四大类节奏验收 ----
     年均额度是引擎硬闸，与样本量无关（--games=1 的 worker 也该抓得住回归）；
     「倒挂转正」是分布结论，留给统计样本。 */
  const kk = sim.kindHit || {}, Y = Math.max(1, sim.simYears || 1), pc = P.paceCfg();
  const rate = { fixed: (kk.fixed || 0) / Y, career: (kk.career || 0) / Y, random: (kk.random || 0) / Y, shady: (kk.shady || 0) / Y };
  check(rate.random <= pc.yearRandomMax + 0.05, "随机类年均 " + rate.random.toFixed(2) + " 件，超出 pace.yearRandomMax=" + pc.yearRandomMax + " —— 属性与钱会刷太快");
  check(rate.shady <= pc.grayMax + 0.05, "灰产投机年均 " + rate.shady.toFixed(2) + " 件，超出 pace.grayMax=" + pc.grayMax);
  check(rate.fixed > 0, "四大类里固定历史事件一件没出（kindHit.fixed=0）——钉卡通道断了");
  check(thinSample || rate.fixed >= rate.career, "四大类倒挂未转正：固定历史 " + rate.fixed.toFixed(2) + "/年 < 职业 " + rate.career.toFixed(2) + "/年");
  check(thinSample || rate.career >= rate.random, "四大类倒挂未转正：职业 " + rate.career.toFixed(2) + "/年 < 随机 " + rate.random.toFixed(2) + "/年");
}

/* ---------- 渲染冒烟（无头 DOM） ---------- */
console.log("\n== 渲染冒烟 ==");
{
  P.CSEL = { era: firstEra, origin: firstOrigin, talent: firstTalent, entry: firstEntry, party: firstParty, stance: firstStance, name: "渲染测试" };
  P.confirmCreate();
  const ev = P.events.filter(e => e.id.indexOf("demo_") === 0)[0] || P.events[0];
  const stakedChoice = (ev.choices || []).filter(c => P.stakeSpec(c))[0];
  const costChoice = (ev.choices || []).filter(c => c.cost)[0];
  check(!!stakedChoice, "演示包应包含可投注（stake）的选项：" + ev.id);
  check(!!costChoice, "演示包应包含带代价（cost）的选项：" + ev.id);
  let smokeOK = true, smokeErr = "";
  try {
    P.presentEvent(ev);
    if (stakedChoice) {
      P.choose(ev, stakedChoice);          // 打开投注面板
      P.stakeStep("fun", 1);
      P.stakeToggleFav();
      P.stakeCancel();
    }
    P.statusPanel();
    P.statusDetailHTML();
    P.toolbarHTML();
  } catch (e) { smokeOK = false; smokeErr = e.message; }
  check(smokeOK, "事件渲染 / 投注面板不应抛异常：" + smokeErr);
  /* 投注面板打开后应把所有声明过的资源都列出来 */
  P.G.fun = 3000000; P.G.fav = 3;
  const info = P.stakeInfo(stakedChoice, { fun: 1, fav: 1 });
  check(info.parts.length === Object.keys(P.stakeSpec(stakedChoice)).length,
    "投注明细条目数应等于声明资源数（" + info.parts.length + " vs " + Object.keys(P.stakeSpec(stakedChoice)).length + "）");
}

/* ---------- 引擎 / 内容契约 ---------- */
console.log("\n== 引擎 / 内容契约 ==");
P.define("era", { "__T": { name: "测试时代", startYear: 2020, outlets: ["测试报"], brief: { "*": "测试" } } });
P.define("event", [{
  id: "__t_ev", era: ["__T"], tierMin: 0, tierMax: 5, weight: 1, title: "测试", body: "测试",
  choices: [{ id: "x", text: "测", base: 0.5, mods: [], outcomes: { crit: { body: "a", effects: {} }, ok: { body: "b", effects: {} }, meh: { body: "c", effects: {} }, fail: { body: "d", effects: {} }, critfail: { body: "e", effects: {} } } }]
}]);
P.define("effect", { __t: function (v, G) { G.__t = (G.__t || 0) + v; } });
P.CSEL = { era: "__T", origin: firstOrigin, talent: firstTalent, entry: firstEntry, party: firstParty, stance: firstStance, name: "X" };
P.confirmCreate();
check(P.G.era === "__T", "新增 era 后应能直接开局");
check(P.events.some(e => e.id === "__t_ev"), "新增 event 应自动注册");
P.applyEffects({ __t: 5 });
check(P.G.__t === 5, "自定义效果键应生效");
check(P.generateFiller().choices.length > 0, "无专属填充包时应回退到 '*' 包");
check(!!P.makeNews("测试头条"), "makeNews 应能生成标题");
console.log("  ok：新增 时代 / 事件 / 效果键 均被引擎自动接纳（内容可无限扩，无需改引擎）");

/* ---------- v0.4：把柄 / 人脉 / 事件链 / 在位时长 ----------
 * 这四套机制是"让一局变长"的四根柱子，所以它们必须各自可被独立验证：
 *   把柄   —— 是一种会贬值、不能囤的资源（效果键 lev）
 *   人脉   —— 事件可以挂在具体的人身上（req.contact / effects.contact / forget）
 *   事件链 —— 一幕没演过，下一幕根本不会出现（ev.after）
 *   在位时长 —— 晋升要熬够月份（ev.minTenure）
 */
console.log("\n== 把柄 / 人脉 / 事件链 / 在位时长 ==");
{
  P.CSEL = { era: "__T", origin: firstOrigin, talent: firstTalent, entry: firstEntry, party: firstParty, stance: firstStance, name: "机制测试" };
  P.confirmCreate();
  const G = P.G, b = P.balance();
  G.flags = []; G.doneIds = []; P.recentIds = []; G.tier = 0;

  /* --- 把柄（lev）：能加、能花、不能花成负数 --- */
  check(G.lev === 0, "开局把柄应为 0，实际 " + G.lev);
  P.applyEffects({ lev: 3 });
  check(G.lev === 3, "把柄应能被效果键加上，实际 " + G.lev);
  P.applyEffects({ lev: -1 });
  check(G.lev === 2, "把柄应能被花掉，实际 " + G.lev);
  P.applyEffects({ lev: -99 });
  check(G.lev === 0, "把柄不能被花成负数（下限 0），实际 " + G.lev);
  check(RES_KEYS.indexOf("lev") >= 0, "RES_KEYS 应包含 lev，否则内容无法用 cost/req 消耗把柄");
  /* 把柄不能囤：手里攥着的把柄够多，活跃度会被顶上去（调查、传唤接踵而来） */
  P.G.lev = 0; const prNoLev = P.pressure();
  P.G.lev = (b.bonusPressure.leverageAt == null ? 3 : b.bonusPressure.leverageAt);
  check(P.pressure() > prNoLev, "手中把柄达到 leverageAt 后应抬高活跃度（" + prNoLev + " → " + P.pressure() + "）");
  check(ZH(() => P.bonusReason()).indexOf("把柄在手") >= 0, "活跃度理由里应写明「把柄在手」");
  P.G.lev = 0;

  /* --- 人脉（contacts）：第一次接触即"从此认识"，好感夹在 -100~100 --- */
  P.applyEffects({ contact: { fixer: 12 } });
  check(P.hasContact("fixer"), "effects.contact 第一次出现就代表从此认识这个人");
  check(P.contactFavor("fixer") === 12, "人脉好感应为 12，实际 " + P.contactFavor("fixer"));
  P.applyEffects({ contact: { fixer: 500 } });
  check(P.contactFavor("fixer") === 100, "人脉好感上限应为 100，实际 " + P.contactFavor("fixer"));
  P.applyEffects({ contact: { fixer: -500 } });
  check(P.contactFavor("fixer") === -100, "人脉好感下限应为 -100，实际 " + P.contactFavor("fixer"));
  P.applyEffects({ contact: { columnist: -30 } });
  /* 排序看的是"关系深浅"（好感绝对值），不是数值大小：
     一个欠你 100 的人和帮你 30 的人，都应该排在只有 +5 的人前面。 */
  check(P.myContacts()[0].id === "fixer" && P.myContacts()[1].id === "columnist",
    "人脉面板应按关系深浅排序（绝对值大者在前），实际 " + P.myContacts().map(function (c) { return c.id + ":" + c.favor; }).join("、"));
  check(!!P.contactName("columnist") && P.contactName("columnist") !== "columnist", "人脉应有人名（登记表里有 name）");
  P.applyEffects({ forget: ["fixer"] });
  check(!P.hasContact("fixer"), "effects.forget 应彻底断掉一段关系");
  check(P.myContacts().length === 1, "断掉之后人脉列表应只剩 1 人，实际 " + P.myContacts().length);
  /* 门槛：不认识就选不了 */
  check(P.hasContact("columnist"), "认识的人应通过 hasContact 门槛");

  /* --- 引用完整性：内容里提到的人，登记表里都得有 --- */
  const missCt = [];
  P.events.forEach(function (ev) {
    [].concat(ev.contacts || []).forEach(function (id) { if (!P.contactDef(id)) missCt.push(ev.id + ".contacts:" + id); });
    [].concat(ev.choices || []).forEach(function (ch) {
      if (ch.req && ch.req.contact && !P.contactDef(ch.req.contact)) missCt.push(ev.id + "/" + ch.id + ".req.contact:" + ch.req.contact);
      TIERS.forEach(function (t) {
        const e = (ch.outcomes && ch.outcomes[t] || {}).effects || {};
        if (e.contact) Object.keys(e.contact).forEach(function (id) { if (!P.contactDef(id)) missCt.push(ev.id + "/" + ch.id + "@" + t + ".contact:" + id); });
        [].concat(e.forget || []).forEach(function (id) { if (!P.contactDef(id)) missCt.push(ev.id + "/" + ch.id + "@" + t + ".forget:" + id); });
      });
    });
  });
  check(!missCt.length, "内容引用了未登记的人脉（" + missCt.length + " 处）：" + missCt.slice(0, 6).join("、"));

  /* --- 事件链：闭合性。引用的前情必须存在，且整条链不能成环 --- */
  const chainMiss = [], selfLoop = [];
  P.events.forEach(function (ev) {
    if (!ev.after) return;
    if (!ev.after.id) { chainMiss.push(ev.id + " 的 after 缺 id"); return; }
    if (ev.after.id === ev.id) selfLoop.push(ev.id);
    if (!P.events.some(function (x) { return x.id === ev.after.id; })) chainMiss.push(ev.id + " → " + ev.after.id);
    if (ev.after.minMonthsAfter != null && ev.after.maxMonthsAfter != null && ev.after.minMonthsAfter > ev.after.maxMonthsAfter)
      chainMiss.push(ev.id + " 的 after 窗口 min > max");
    if (ev.after.minMonthsAfter != null && ev.after.minMonthsAfter < 0) chainMiss.push(ev.id + " 的 after 负间隔");
  });
  check(!chainMiss.length, "事件链引用了不存在的前情（" + chainMiss.length + " 处）：" + chainMiss.join("、"));
  check(!selfLoop.length, "事件链不能把自己当成前情：" + selfLoop.join("、"));
  const cyc = [];
  P.events.filter(function (e) { return e.after; }).forEach(function (e) {
    const seen = {}, path = [];
    let cur = e;
    while (cur && cur.after) {
      if (seen[cur.id]) { cyc.push(path.concat(cur.id).join(" → ")); break; }
      seen[cur.id] = 1; path.push(cur.id);
      cur = P.events.find(function (x) { return x.id === cur.after.id; });
    }
  });
  check(!cyc.length, "事件链出现了环（永远演不完）：" + cyc.join("；"));
  const chains = P.events.filter(function (e) { return e.after; });
  console.log("  事件链 " + chains.length + " 幕（" + chains.map(function (e) { return e.id; }).join(" → ") + "）");

  /* --- 事件链：前情没演过 → 续集不该出现；演过了但没带走东西 → 也不该出现 --- */
  const head = P.events.find(function (e) { return e.id === "archive_get"; });
  const act2 = P.events.find(function (e) { return e.id === "archive_bite"; });
  check(!!head && !!act2, "样板事件链 archive_get → archive_bite 应已注册");
  if (head && act2) {
    check(act2.unique === true, "链上的每一幕都必须 unique，否则同一幕会重复演、故事就穿帮了");
    check(P.prevEventOf(act2) === head, "prevEventOf 应能找回上一幕（界面「承前」条用它）");
    check(P.prevEventOf(head) === null, "没有前情的事件不该返回上一幕");
    /* 链上的每一幕都声明了 era: 全部时代，所以这里要先把当前局面挪回一个真实时代，
       否则「不可触发」会因为时代不符而成立 —— 那是假阳性。 */
    P.G.tier = 3; P.G.lev = 0; P.G.doneIds = []; P.recentIds = []; P.G.flags = []; P.G.contacts = { columnist: 10 };
    P.G.year = 2010; P.G.month = 6; P.G.doneSeq = {};  // #33：时代按日历解，2010 落在 2008_CRASH
    check(!P.eligible(act2), "前情没演过时，续集不该可触发");
    P.stamp("archive_get");
    P.G.month = 7;                                   // 间隔 1 个月，还没到 minMonthsAfter = 3
    P.addFlag("archive_taken");
    check(!P.eligible(act2), "间隔不足（1 < 3 个月）时，续集不该出现");
    P.G.month = 9;                                   // 间隔正好 3 个月
    check(P.eligible(act2), "前情 + 标记 + 间隔都满足后，续集应可触发");
    P.G.flags = []; P.delFlag("archive_taken");      // 演过前情，但没把档案带走
    check(!P.eligible(act2), "没拿到档案（缺 flag）时，续集仍不该可触发");
    P.addFlag("archive_taken");
    P.G.year += 5;                                   // 累计 63 个月
    check(!P.eligible(act2), "超过 maxMonthsAfter 之后续集不该再出现（窗口过期）");
    check(P.monthsSince("archive_get") === 63, "monthsSince 应算出 63 个月，实际 " + P.monthsSince("archive_get"));
    check(P.monthsSince("不存在的事件") === null, "没演过的事件 monthsSince 应返回 null");
  }

  /* --- 续集加权：已解锁的续集必须明显更容易被抽到 ---
   * 这是"一条故事线能不能被玩家看见"的关键。做法是拿两个权重相同的
   * 合成事件对抽 2000 次，看续集的胜率是否接近 chainWeightMul/(chainWeightMul+1)。 */
  const mkEv = function (id, after) {
    const e = { id: id, tierMin: 0, tierMax: 5, weight: 1, grade: "mid", category: "general", title: id, body: id };
    if (after) e.after = after;
    return e;
  };
  P.define("event", [mkEv("__chain_head"), mkEv("__chain_next", { id: "__chain_head" }), mkEv("__chain_plain")]);
  check(b.chainWeightMul > 1, "balance.chainWeightMul 应大于 1（默认 9）");
  {
    P.G.tier = 3; P.G.doneIds = []; P.G.flags = []; P.G.doneSeq = {}; P.stamp("__chain_head");
    let next = 0, plain = 0;
    for (let i = 0; i < 2000; i++) {
      P.recentIds = [];
      /* 本测试测的是「续集权重」，不是「去重」：每次抽取都当作一个全新的月份，
         否则同月去重硬闸（_monthSeen）会把已抽中的续集在本月内永久排除，胜率失真。
         单卡硬冷却（idRepelMonths）同理会拦两张合成卡 —— 也逐次抹掉：
         两候选同等抹除，比值口径不变。 */
      P._monthSeen = []; P._monthKey = null;
      delete P.G.doneSeq.__chain_plain; delete P.G.doneSeq.__chain_next;
      /* 每年随机额度（#32②）同理会把合成卡饿死 —— 这里测的是权重比，逐次抹平额度。 */
      P.G.yearKinds = null;
      const picked = P.drawEvent({ grade: "mid" });
      if (picked.id === "__chain_next") next++; else if (picked.id === "__chain_plain") plain++;
    }
    const rate = next / Math.max(1, next + plain);
    const want = b.chainWeightMul / (b.chainWeightMul + 1);
    console.log("  续集加权：抽取 " + (next + plain) + " 次里续集占 " + (rate * 100).toFixed(1) +
      "%（权重倍数 " + b.chainWeightMul + " → 理论 " + (want * 100).toFixed(1) + "%）");
    check(Math.abs(rate - want) < 0.08, "已解锁的续集应被 chainWeightMul 明显加权（实测 " + (rate * 100).toFixed(1) + "% vs 理论 " + (want * 100).toFixed(1) + "%）");
  }

  /* --- 单卡终身衰减（idRepeatMul）：演过一次的事，再找上你的概率要显著下降 ---
   * 用户反馈「记者采访/出书/保释反复出现，不现实」。类别级 repeatBias 管不了单卡，
   * 这里钉死三件事：没演过=不衰减；演过=恰好乘 idRepeatMul；debuff 续燃（rereq 满足）=豁免。 */
  check(b.idRepeatMul != null && b.idRepeatMul > 0 && b.idRepeatMul < 1,
    "balance.idRepeatMul 应在 (0,1)（默认 0.15；1=关闭衰减）");
  {
    P.G.tier = 3; P.G.doneIds = []; P.G.flags = []; P.G.doneSeq = {};
    const plainEv = P.events.find(function (e) { return e.id === "__chain_plain"; });
    check(P.idRepeatFactor(plainEv) === 1, "没演过的卡不该衰减（因子应为 1）");
    P.stamp("__chain_plain");
    check(Math.abs(P.idRepeatFactor(plainEv) - b.idRepeatMul) < 1e-9,
      "演过一次后衰减因子应恰为 idRepeatMul，实际 " + P.idRepeatFactor(plainEv));
    const uniqEv = P.events.find(function (e) { return e.id === "archive_get"; });
    P.stamp(uniqEv.id);
    check(P.idRepeatFactor(uniqEv) === 0, "unique 卡演过后因子应为 0（虽然 eligible 已经拦了，防御性双保险）");

    /* debuff 续燃示范：sca2_family_member 靠 rereq 豁免衰减 */
    const rrEv = P.events.find(function (e) { return e.id === "sca2_family_member"; });
    check(!!rrEv && !!rrEv.rereq, "sca2_family_member 应声明 rereq（麻烦的家人：捞过一次人就会被再次捞）");
    P.stamp("sca2_family_member");
    check(Math.abs(P.idRepeatFactor(rrEv) - b.idRepeatMul) < 1e-9, "rereq 未满足时，该卡照样吃衰减");
    P.addFlag("sca2_family_hidden");
    check(P.idRepeatFactor(rrEv) === 1, "rereq 满足（debuff 在手）时应豁免衰减");
    P.G.flags = [];
  }

  /* --- 职级绑定：小人物没人出书、没人爆料；保释这类事也有层级上限 --- */
  {
    const tierOf = function (id) { return P.events.find(function (e) { return e.id === id; }); };
    const enemy = tierOf("med2_press_enemy");
    check(enemy && enemy.tierMin >= 3, "对等头的报纸爆料不该找上 tier<3 的小人物（med2_press_enemy.tierMin）");
    const columnist = tierOf("press_columnist");
    check(columnist && columnist.tierMin >= 1, "专栏编辑在饭局上不理 tier0 无名者（press_columnist.tierMin）");
    const fam = tierOf("sca2_family_member");
    check(fam && fam.tierMax != null && fam.tierMax <= 4, "家人惹祸是大人物之下的事（sca2_family_member.tierMax≤4）");
  }

  /* --- 硬冷却的作用域（v0.12）：只管随机卡池的单发，重复性系统一律不吃 ---
   * 用户红线：降频别误伤「本来就会发生多次」的竞选幕 / 公务 / 晋升重试。
   * 三道结构性保证，逐条钉死：
   *   1) 竞选幕与时代脚本走 slot.eventId 定点档期 —— drawEvent 直接 return，根本不进 eligible；
   *   2) 日常公务走 time.js 的 choreEligible 独立通道 —— 不经过这里的冷却闸；
   *   3) prog_* 晋升卡在 eligible 里显式豁免 —— 失败后每年重试是设计。 */
  {
    P.G.tier = 3; P.G.doneIds = []; P.G.flags = []; P.G.doneSeq = {}; P.recentIds = [];
    P.G.tierSince = P.monthSeq();                   // prog_repel 挂了 minTenure:0，把在位计时摆正
    P.define("event", [
      { id: "__repel", tierMin: 0, tierMax: 5, weight: 5, grade: "minor", category: "general", title: "t", body: "t" },
      { id: "prog_repel", tierMin: 0, tierMax: 5, weight: 5, grade: "minor", category: "career", minTenure: 0, title: "t", body: "t" }
    ]);
    const rc = P.evById("__repel"), pc = P.evById("prog_repel");
    const _ym = P.G.year * 12 + P.G.month;               // monthSeq 快照，测完好戻
    /* 这里测的是硬冷却的作用域，不是每年随机额度（#32②）：每次断言前抹平额度，
       否则前面探针抽过的卡会把本行余额吃掉，eligible 假阴性。 */
    const noPace = function () { P.G.yearKinds = null; };
    noPace();
    check(P.eligible(rc, true), "没演过的卡当然可抽");
    P.stamp("__repel"); P.stamp("prog_repel");
    noPace();
    check(!P.eligible(rc, true), "普通单发卡演过后，硬冷却窗口内连 pass3（ignoreRecent）都不该放行");
    check(P.eligible(pc, true), "prog_* 晋升卡演过就该立刻可重试 —— 冷却闸不许碰晋升脊柱");
    const forced = P.drawEvent({ eventId: "__repel", grade: "minor" });
    check(forced && forced.id === "__repel", "定点档期（竞选幕/时代脚本/公务）冷却中照样必出 —— 它不经 eligible");
    P.G.month += 24;                                     // 熬过 24 个月窗口
    noPace();
    check(P.eligible(rc, true), "冷却到期后该卡应重回卡池");
    P.G.year = Math.floor(_ym / 12); P.G.month = _ym % 12;  // 还原月份（后面的测试也算 monthSeq）
    /* 公务通道自查：chore 卡演过后 choreEligible 不该拦（冷却闸不许注入通道误伤） */
    P.G.doneSeq = {};
  }

  /* --- #28② 投机/灰产豁免通道：可反复赌，但只免"同卡重复"，不免年度额度 ---
   * 三道闸逐个钉死：衰减豁免、硬冷却豁免、grayMax 仍然拦人。
   * 外加内容纪律：pace:"exempt" 必须显式 unique:false（major 卡默认一局一次，忘了写就永远等不到第二回）。 */
  {
    P.G.tier = 3; P.G.doneIds = []; P.G.flags = []; P.G.doneSeq = {}; P.recentIds = [];
    P.define("event", [
      { id: "__flip", tierMin: 0, tierMax: 5, weight: 5, grade: "mid", category: "shady", unique: false, pace: "exempt", title: "t", body: "t" },
      { id: "__once", tierMin: 0, tierMax: 5, weight: 5, grade: "mid", category: "shady", title: "t", body: "t" }
    ]);
    const fl = P.evById("__flip"), on = P.evById("__once");
    check(P.paceExempt(fl) && !P.paceExempt(on), "P.paceExempt 应只认 pace:\"exempt\"");
    P.stamp("__flip");
    check(P.idRepeatFactor(fl) === 1, "exempt 卡演过一次后权重不该衰减（同一笔庄家生意可以再做一次）");
    check(P.eligible(fl, true), "exempt 卡不该吃 24 个月硬冷却");
    const badPace = P.events.filter(function (e) { return P.paceExempt(e) && e.unique; });
    check(!badPace.length, "pace:\"exempt\" 的卡必须显式 unique:false，否则第一次就绝版：" + badPace.map(function (e) { return e.id; }).join("、"));
    /* 年度灰产额度仍然拦人 */
    P.G.yearKinds = { fixed: 0, campaign: 0, career: 0, random: 0, shady: P.paceCfg().grayMax };
    check(!P.eligible(fl, true), "灰产年度额度（grayMax）满了，exempt 卡也该被挡下 —— 豁免的是重复，不是无限量");
    P.G.yearKinds = null; P.G.doneSeq = {};
  }

  /* --- 在位时长（minTenure）：晋升要熬够月份 --- */
  const badTenure = P.events.filter(function (e) { return e.minTenure != null && !(Number.isInteger(e.minTenure) && e.minTenure >= 0); });
  check(!badTenure.length, "minTenure 必须是非负整数：" + badTenure.map(function (e) { return e.id; }).join("、"));
  const progGate = P.events.filter(function (e) { return e.id.indexOf("prog_") === 0; });
  check(progGate.length && progGate.every(function (e) { return e.minTenure != null; }),
    "所有晋升事件（prog_*）都应声明 minTenure —— 否则十年就能爬到顶，一局太短");
  P.define("event", [{ id: "__tenure", tierMin: 0, tierMax: 5, weight: 1, grade: "minor", minTenure: 12, title: "t", body: "t" }]);
  const tv = P.events.find(function (e) { return e.id === "__tenure"; });
  P.G.tierSince = P.monthSeq();
  P.G.yearKinds = null;                                  // 同上：只看年限闸，不看随机额度
  check(P.monthsAtTier() === 0 && !P.eligible(tv), "刚晋级时，要求在位 12 个月的事件不该可触发");
  P.G.tierSince = P.monthSeq() - 12;
  check(P.monthsAtTier() === 12, "monthsAtTier 应为 12，实际 " + P.monthsAtTier());
  P.G.yearKinds = null;
  check(P.eligible(tv), "熬够 12 个月后，该事件应可触发");
  /* 晋级会重置在位计时（effects.js 的 tier 处理器） */
  P.G.tierSince = P.monthSeq() - 120;          /* v0.5.4 年限闸：先熬够 10 年 */
  P.applyEffects({ tier: 1 });
  check(P.monthsAtTier() === 0, "层级变动后，在位时长应被重置");
  /* 年限闸本身：没熬够时 tier 不动、折声望 */
  P.G.tierSince = P.monthSeq();                 /* 刚升级，在位 0 月 */
  const repBeforeGate = P.G.rep;
  P.applyEffects({ tier: 1 });
  check(P.monthsAtTier() === 0 && P.G.tier >= 1, "年限闸：没熬够时不应再次升级（还在本级）");
  check(P.G.rep >= repBeforeGate, "年限闸：被拦下的晋升折成声望（" + repBeforeGate + "→" + P.G.rep + "）");
  /* 旧存档迁移：v0.4 新增字段必须被补齐 */
  const old = { year: 2008, month: 3, era: firstEra, flags: [], doneIds: [], attr: {}, faction: {}, log: [] };
  const mig = P.migrate(old);
  check(mig.lev === 0 && mig.contacts && mig.doneSeq && mig.tierSince != null,
    "旧存档迁移后应补齐 lev / contacts / doneSeq / tierSince");
  console.log("  ok：把柄（可加/可花/不可负/会顶活跃度）｜ 人脉（认识·好感·断交）｜ 事件链（闭合·窗口·加权）｜ 在位时长（晋升要熬）");
}

/* ---------- v0.4：静好岁月（平静月的叙事与成长） ----------
 * 静好岁月要证明三件事：
 *   1) 素材库是完整的 —— 任何 时代×轨道×层级×月份 的组合都能拼出人话，
 *      而且每个槽位都有兜底，不会因为"玩家此刻很惨"就少一段；
 *   2) 结算是幂等的 —— 同一个平静月只结算一次（存档读回来重渲染也不能重复长属性）；
 *   3) 成长是有界的 —— 属性不破 cap、声望/好感不破 100，年纪大了长得慢。
 */
console.log("\n== 静好岁月 ==");
{
  const frags = P.reg.vignette.fragments || [];
  const firstTrackKey = Object.keys(P.reg.track)[0];
  check(frags.length > 0, "静好岁月应有素材（content/08-vignettes.js）");
  check(!!P.reg.vignette.title, "静好岁月应有标题");

  /* --- 1) 素材注册的完整性（写错一个 slot 就会静默少一段，必须拦住） --- */
  const badSlot = frags.filter(f => P.VIGNETTE_SLOTS.indexOf(f.slot) < 0);
  check(!badSlot.length, "片段的 slot 必须在 " + P.VIGNETTE_SLOTS.join("/") + " 里：" + badSlot.map(f => f.id).join("、"));
  const noText = frags.filter(f => !(f.text || (f.texts && f.texts.length)));
  check(!noText.length, "片段必须写 text 或 texts：" + noText.map(f => f.id).join("、"));
  const badMonth = frags.filter(f => f.months && !f.months.every(m => Number.isInteger(m) && m >= 1 && m <= 12));
  check(!badMonth.length, "片段的 months 必须是 1-12 的整数：" + badMonth.map(f => f.id).join("、"));
  const badEra = frags.filter(f => f.era && !f.era.every(e => P.reg.era[e]));
  check(!badEra.length, "片段引用了不存在的 era：" + badEra.map(f => f.id).join("、"));
  const badTrack = frags.filter(f => f.tracks && !f.tracks.every(t => P.reg.track[t]));
  check(!badTrack.length, "片段引用了不存在的 track：" + badTrack.map(f => f.id).join("、"));
  const badStance = frags.filter(f => f.stances && !f.stances.every(t => P.reg.stance[t]));
  check(!badStance.length, "片段引用了不存在的 stance：" + badStance.map(f => f.id).join("、"));
  const badWeight = frags.filter(f => f.weight != null && !(typeof f.weight === "number" && f.weight > 0));
  check(!badWeight.length, "片段的 weight 应为正数：" + badWeight.map(f => f.id).join("、"));
  const dupId = frags.map(f => f.id).filter((x, i, a) => x && a.indexOf(x) !== i);
  check(!dupId.length, "片段 id 应唯一：" + dupId.join("、"));

  /* --- 2) 时令必须覆盖 12 个月；其余槽位要有一条"无条件片段"兜底 --- */
  const missMonth = [];
  for (let m = 1; m <= 12; m++) if (!frags.some(f => f.slot === "season" && f.months && f.months.indexOf(m) >= 0)) missMonth.push(m);
  check(!missMonth.length, "时令片段应覆盖 12 个月，缺：" + missMonth.join("、") + " 月");
  const bare = function (s) {
    return frags.some(function (f) {
      return f.slot === s && !f.era && !f.tracks && !f.stances && !f.parties && !f.origins && !f.tiers &&
        f.minTier == null && f.maxTier == null && f.minAge == null && f.maxAge == null && !f.months &&
        !f.flags && !f.notFlags && f.minLev == null && f.maxLev == null && f.minRep == null && f.maxRep == null &&
        f.minHp == null && f.maxHp == null && f.minFun == null && f.maxFun == null &&
        f.minContacts == null && f.maxContacts == null && !f.cond;
    });
  };
  const noBare = P.VIGNETTE_SLOTS.filter(s => s !== "season" && !bare(s));
  check(!noBare.length, "除时令外，每个槽位都该有一条无条件片段兜底（否则玩家处境一极端就少一段），缺：" + noBare.join("、"));

  /* --- 3) 全组合可拼：时代 × 轨道 × 层级 × 月份，一段都不能空 --- */
  P.CSEL = { era: firstEra, origin: firstOrigin, talent: firstTalent, entry: firstEntry, party: firstParty, stance: firstStance, name: "静好测试" };
  P.confirmCreate();
  const GV = P.G;
  GV.flags = []; GV.contacts = {}; GV.lev = 0; GV.hp = 100; GV.rep = 5; GV.fun = 50000; GV.age = 34;
  const holes = [];
  for (const e in P.reg.era) {
    GV.era = e;
    for (const tk in P.reg.track) {
      GV.track = tk;
      for (let tier = 0; tier <= 5; tier++) {
        GV.tier = tier;
        for (let m = 1; m <= 12; m++) {
          const r = P.rollVignette(m);
          if (!r.text || r.text.length < 20) holes.push(e + "/" + tk + "/T" + tier + "/" + m);
        }
      }
    }
  }
  check(!holes.length, "有 " + holes.length + " 种 时代×轨道×层级×月份 拼不出随笔（前几个：" + holes.slice(0, 6).join("、") + "）");

  /* --- 4) 极端处境也要能拼出来（素材只在"顺风顺水的中年人"身上成立是不够的） --- */
  const extreme = [
    ["病重", function (g) { g.hp = 12; }],
    ["穷困", function (g) { g.fun = -20000; g.rep = 0; }],
    ["巨富", function (g) { g.fun = 5e8; }],
    ["名声在外", function (g) { g.rep = 100; }],
    ["丑闻在身且被调查", function (g) { g.flags = ["scandal_4", "investigation_open"]; }],
    ["手握把柄", function (g) { g.lev = 6; }],
    ["垂暮", function (g) { g.age = 72; }],
    ["初出茅庐", function (g) { g.age = 24; g.rep = 0; g.fun = 0; }],
    ["人脉众多", function (g) { const c = {}; for (const k in P.reg.contact) c[k] = 40; g.contacts = c; }]
  ];
  const badExtreme = [];
  extreme.forEach(function (x) {
    GV.era = firstEra; GV.track = firstTrackKey; GV.tier = 2; GV.age = 34; GV.hp = 80;
    GV.rep = 30; GV.fun = 100000; GV.lev = 0; GV.flags = []; GV.contacts = {};
    x[1](GV);
    for (let m = 1; m <= 12; m++) {
      const r = P.rollVignette(m);
      if (!r.text || r.text.length < 20) { badExtreme.push(x[0] + "/" + m + "月"); break; }
    }
  });
  check(!badExtreme.length, "极端处境下拼不出随笔：" + badExtreme.join("、"));

  /* --- 5) 结算：幂等 + 跨年翻页 --- */
  GV.era = firstEra; GV.track = firstTrackKey; GV.tier = 2; GV.age = 34;
  GV.hp = 80; GV.rep = 30; GV.fun = 100000; GV.lev = 0; GV.flags = []; GV.contacts = {};
  GV.year = 2000; GV.month = 2; GV.vigYear = 2000; GV.vigMonth = 0; GV.quietLog = [];
  const q1 = P.settleQuietMonth(2);
  check(!!q1 && q1.month === 2 && !!q1.text && q1.year === 2000, "settleQuietMonth 应写入一段（带年份的）随笔");
  check(P.settleQuietMonth(2) === null, "同一个平静月重复结算应被拒绝（幂等），否则读档重渲染会白送属性");
  check(GV.quietLog.length === 1, "重复结算不应新增条目，实际 " + GV.quietLog.length);
  P.settleQuietMonth(3);
  check(GV.quietLog.length === 2, "下一个月应能正常追加，实际 " + GV.quietLog.length);
  check(P.settleQuietMonth(1) === null, "水位线之前的月份不该被回头结算");
  GV.year = 2001;
  P.settleQuietMonth(1);
  check(GV.quietLog.length === 1 && GV.quietLog[0].year === 2001,
    "跨年应自动翻页（只留新年的随笔）——不依赖调用方记得重置");
  check(GV.vigMonth === 1, "跨年后水位线应重置，实际 " + GV.vigMonth);

  /* --- 6) 成长：不越界、年纪大了长得慢 --- */
  const bv = P.balance().vignette;
  const capAttr = bv.attrCap == null ? 88 : bv.attrCap;
  GV.attr = { CHA: capAttr, INT: capAttr, CUN: capAttr, INTG: capAttr };
  GV.age = 25; GV.rep = 100; GV.contacts = { fixer: 100 }; GV.hp = 100;
  for (let i = 0; i < 500; i++) P.vignetteGrowth(1);
  check(GV.attr.CHA <= capAttr && GV.attr.INT <= capAttr && GV.attr.CUN <= capAttr && GV.attr.INTG <= capAttr,
    "属性成长不应突破 attrCap（" + capAttr + "），实际 " + JSON.stringify(GV.attr));
  check(GV.rep <= 100, "声望成长不应突破 100，实际 " + GV.rep);
  check(GV.contacts.fixer <= 100, "人脉好感应夹在 -100~100，实际 " + GV.contacts.fixer);
  const growthOf = function (age, months) {
    /* 起始属性故意压得很低（距 attrCap 留足余量），避免在长窗口里「撞到上限就停止生成成长」
       —— 那会让年轻/年老两条曲线都饱和到同一个上限、抹平本该有的差距（旧版 45 起跳会饱和）。 */
    GV.age = age; GV.attr = { CHA: 15, INT: 15, CUN: 15, INTG: 15 }; GV.rep = 5;
    GV.contacts = { fixer: 10 }; GV.lev = 0; GV.hp = 100; GV.fun = 50000; GV.fav = 0; GV.ap = 0;
    let g = 0;
    for (let i = 0; i < months; i++) {
      const r = ZH(() => P.vignetteGrowth(1));
      /* 只数属性条目（魅力/智力/手腕/诚信开头）——资金/精力/人情与年龄无关 */
      g += r.notes.filter(function (n) { return /[魅力智力手腕诚信]/.test(n.slice(0, 2)); }).length;
    }
    return g;
  };
  const young = growthOf(25, 200), old = growthOf(70, 200);
  check(young > old, "年轻时应该长得更快（attrAgeFade）：25 岁 " + young + " 次属性成长 vs 70 岁 " + old + " 次");
  /* v0.5.2 年龄曲线：老年 CHA/INT 会掉（下限 attrFloor），CUN 靠权重补偿，INTG 不随年龄变 */
  {
    const bAge = P.balance().vignette;
    GV.attr = { CHA: 60, INT: 60, CUN: 45, INTG: 50 }; GV.age = 72;
    GV.contacts = {}; GV.rep = 5; GV.hp = 100; GV.fun = 50000;
    for (let i = 0; i < 400; i++) P.vignetteGrowth(1);
    check(GV.attr.CHA < 60 || GV.attr.INT < 60, "72 岁的 CHA/INT 应有净下降（CHA " + GV.attr.CHA + " / INT " + GV.attr.INT + "）");
    check(GV.attr.CHA >= (bAge.attrFloor || 30) && GV.attr.INT >= (bAge.attrFloor || 30), "下降不应穿破 attrFloor");
    check(GV.attr.INTG === 50, "INTG 不随年龄变（50 → " + GV.attr.INTG + "）");
  }
  /* 关掉开关 → 完全不成长 */
  const keepVig = P.reg.balance.vignette;
  P.reg.balance.vignette = Object.assign({}, keepVig, { enabled: false });
  GV.attr = { CHA: 45, INT: 45, CUN: 45, INTG: 45 }; GV.age = 25; GV.rep = 5; GV.contacts = {}; GV.hp = 100;
  for (let i = 0; i < 200; i++) P.vignetteGrowth(1);
  check(GV.attr.CHA === 45 && GV.rep === 5, "vignette.enabled=false 时不应有任何成长");
  P.reg.balance.vignette = keepVig;

  /* --- 7) 渲染：只读不写（重复渲染不能让属性再长一次） --- */
  GV.year = 2010; GV.month = 6; GV.vigYear = 2010; GV.vigMonth = 0; GV.quietLog = [];
  for (let m = 1; m <= 6; m++) { GV.month = m; P.settleQuietMonth(m); }
  const html = ZH(() => P.renderQuiet([1, 2, 3, 4, 5, 6]));
  check(html.html.indexOf("静好岁月") >= 0, "renderQuiet 应渲染出「静好岁月」卡");
  check(html.html.indexOf("2010 年") >= 0, "卡片上应标出年份");
  check(html.html.indexOf("另有") >= 0, "超过 maxShown 的月份应被收成一句「另有 N 个月」");
  const snap = P.serialize();
  P.renderQuiet([1, 2, 3, 4, 5, 6]);
  P.renderQuiet([2, 3]);
  check(P.serialize() === snap, "重复渲染不应改动任何存档状态（成长不能重复结算）");
  check(P.renderQuiet([]).html === "", "没有平静月时不应渲染卡片");
  check(P.renderQuiet([9]).html === "", "没结算过的月份不该凭空渲染出文字");
  console.log("  素材 " + frags.length + " 条 ｜ 槽位 " + P.VIGNETTE_SLOTS.length + " 个（时令覆盖 12 个月）｜ " +
    "时代×轨道×层级×月份 全组合可拼 ｜ 结算幂等 ｜ 成长有界且随年龄衰减");

  /* 大模型适配层已整体下架：引擎与自检不再依赖任何联网能力，也不内置任何模型配置。 */
}

/* ---------- 事件配图：照片层 + SVG 降级 ---------- */
console.log("\n== 事件配图（照片层 / 程序化 SVG 降级） ==");
{
  const PH = P.reg.photo || { dir: "", files: {} };
  const fileKeys = Object.keys(PH.files || {});
  console.log("  照片 " + fileKeys.length + " 张（" + PH.dir + "）｜ 程序化 SVG 兜底 " +
    (Object.keys(P.reg.category).length - fileKeys.length) + " 个类型");

  /* ① 登记的类型 key 必须真实存在，否则照片永远轮不到 */
  fileKeys.forEach(function (k) {
    check(!!P.reg.category[k], "照片表引用了不存在的事件类型：" + k);
  });

  /* ② 登记的照片文件必须真的在磁盘上 —— 这是「照片层」最容易翻车的地方：
        改了文件名 / 少拷了几个文件，浏览器只会静默显示破图。 */
  const missing = fileKeys.filter(function (k) {
    return !fs.existsSync(path.join(ROOT, PH.dir, PH.files[k]));
  });
  check(missing.length === 0, "照片文件缺失：" + missing.map(function (k) { return PH.dir + PH.files[k]; }).join("、"));

  /* ③ 有照片 → 出 <img>；没照片 → 必须安静退回程序化 SVG，不能出现空壳 */
  const withPhoto = { title: "测试事件", category: fileKeys[0] || "general" };
  const noPhotoKey = Object.keys(P.reg.category).filter(function (k) { return !PH.files[k]; })[0];
  const noPhoto = { title: "测试事件", category: noPhotoKey };
  const hWith = P.artSVG(withPhoto);
  const hNone = P.artSVG(noPhoto);
  check(/class="art art-press"/.test(hWith), "有照片的类型没渲染成照片卡");
  check(/<img /.test(hWith) && hWith.indexOf(PH.dir + PH.files[withPhoto.category]) >= 0,
    "照片卡的 <img src> 没指向登记的文件");
  check(/class="art-back"/.test(hWith) && /<svg /.test(hWith),
    "照片卡没有预置 SVG 垫片（图片加载失败时会露出破图）");
  check(/art-press-broken/.test(hWith), "照片卡没挂 onerror 降级钩子");
  check(!/art-press/.test(hNone) && /<svg /.test(hNone),
    "没登记照片的类型（" + noPhotoKey + "）应退回程序化 SVG，实际：" + hNone.slice(0, 40));

  /* ④ 单个事件可以自带图 / 关掉照片 */
  check(/custom-shot\.jpg/.test(P.artSVG({ title: "x", category: fileKeys[0], photo: "custom-shot.jpg" })),
    "ev.photo 自定义文件名没生效");
  check(!/art-press/.test(P.artSVG({ title: "x", category: fileKeys[0], photo: false })),
    "ev.photo=false 没关掉照片层");

  /* ⑤ 照片层不能改变「画什么类型」之外的任何东西：同一事件两次渲染结果一致 */
  check(P.artSVG(withPhoto) === P.artSVG(withPhoto), "照片层渲染不稳定（同一事件两次结果不同）");

  /* ⑥ 真实事件抽样：每一种有照片的类型都真的能出图 */
  fileKeys.forEach(function (k) {
    const ev = { title: "抽样", category: k };
    check(/<img /.test(P.artSVG(ev)), "类型 " + k + " 出不了照片卡");
  });
  console.log("  ok：照片可用、缺图自动退回 SVG、单事件可覆盖/关闭照片");
}

/* ---------- 权重管线：身份 / 资源 → 谁更容易遇上什么事 ---------- */
console.log("\n== 权重管线（身份 / 资源 → 抽中什么） ==");
{
  const b = P.balance();
  const ID_KEYS = { origins: "origin", tracks: "track", parties: "party", stances: "stance", entries: "entry", talents: "talent" };

  /* ① 倾向表引用的身份 id 必须真实存在（写错一个 id，规则会静默永不命中） */
  const norm = (r) => {
    if (!r || !r.when) return true;
    for (const k in ID_KEYS) {
      const v = r.when[k];
      if (v == null) continue;
      const list = [].concat(v);
      for (const id of list) check(!!P.reg[ID_KEYS[k]][id], "倾向表引用了不存在的 " + ID_KEYS[k] + "：" + id + "（when." + k + "）");
    }
    return true;
  };
  (b.identityBias || []).forEach(norm);
  (b.resourceBias || []).forEach(norm);

  /* ② 条件里不能有引擎不认识的字段（拼错一个字 = 规则永不生效，且毫无报错） */
  const known = new Set(P.WHEN_KEYS);
  const scanKeys = (o, where) => {
    if (!o || typeof o !== "object") return;
    for (const k in o) {
      if (k === "when") { scanKeys(o.when, where); continue; }
      if (k === "any" || k === "all") { [].concat(o[k]).forEach(x => scanKeys(x, where)); continue; }
      if (k === "not") { scanKeys(o[k], where); continue; }
      if (["ids", "cats", "tags", "mul", "off"].indexOf(k) >= 0) continue;
      if (!known.has(k)) check(false, where + " 里出现了引擎不认识的条件字段：" + k);
    }
  };
  (b.identityBias || []).forEach((r, i) => scanKeys(r.when, "identityBias[" + i + "]"));
  (b.resourceBias || []).forEach((r, i) => scanKeys(r.when, "resourceBias[" + i + "]"));

  /* ③ 夹取与封顶必须真的生效（防"一个 ×100 的笔误让整类事件刷屏"） */
  const extreme = { title: "极端", category: "shady", weight: 10 };
  const crazy = { when: {}, cats: { shady: 1000 } };
  const savedId = b.identityBias, savedRes = b.resourceBias;
  const probeSnap = { era: "2008_CRASH", year: 2010, month: 6, age: 40, track: "operative", party: "D",
    stance: "outsider", origin: "labor", entry: "operative", talent: "orator", tier: 2,
    rep: 50, hp: 80, fun: 100000, fav: 0, lev: 0, contactN: 0, knownIds: {}, scandal: 0, tenure: 10, flags: [] };
  b.identityBias = [crazy, crazy, crazy, crazy, crazy];
  let d = P.weightBreakdown(extreme, probeSnap, { counts: {} });
  check(d.identity <= b.weightFactorMax + 1e-9, "单因子应被夹取到 " + b.weightFactorMax + "，实际 " + d.identity);
  check(d.tilt <= b.weightTiltCap + 1e-9, "整条倾斜应封顶在 " + b.weightTiltCap + "，实际 " + d.tilt.toFixed(2));
  b.identityBias = [{ when: {}, cats: { shady: 0.0001 } }, { when: {}, cats: { shady: 0.0001 } },
    { when: {}, cats: { shady: 0.0001 } }, { when: {}, cats: { shady: 0.0001 } }, { when: {}, cats: { shady: 0.0001 } }];
  d = P.weightBreakdown(extreme, probeSnap, { counts: {} });
  check(d.tilt >= 1 / b.weightTiltCap - 1e-9, "倾斜也要向下封顶（否则某类玩家会被饿死到只剩填充器），实际 " + d.tilt.toFixed(3));
  b.identityBias = savedId; b.resourceBias = savedRes;

  /* ④ 严格确定性：同一局面 + 同一事件 → 同一权重（否则诊断矩阵不可信） */
  const d1 = P.weightBreakdown(extreme, probeSnap, { counts: {} });
  const d2 = P.weightBreakdown(extreme, probeSnap, { counts: {} });
  check(d1.total === d2.total, "同一局面下权重不稳定：" + d1.total + " vs " + d2.total);

  /* ---------- 诊断矩阵：换一种人，抽到的内容会变成什么 ---------- */
  const CATS = ["career", "campaign", "political", "media", "scandal", "finance", "romance", "civil", "crisis", "foreign", "shady", "general", "demo"];

  /* 造一个"人"：只改身份与资源，时代/年份固定，这样可比 */
  function mixFor(prof) {
    const G = P.G;
    const save = {};
    for (const k in prof) { save[k] = G[k]; G[k] = prof[k]; }
    const snap = P.snap(), counts = P.recentCatCounts();
    const acc = {}; let tot = 0, pool = 0;
    for (let i = 0; i < P.events.length; i++) {
      const e = P.events[i];
      if (!P.eligible(e, true, snap)) continue;
      const w = P.weightBreakdown(e, snap, { counts: counts }).total;
      acc[e.category || "general"] = (acc[e.category || "general"] || 0) + w;
      tot += w; pool++;
    }
    for (const k in prof) { if (save[k] === undefined) delete G[k]; else G[k] = save[k]; }
    const share = {};
    CATS.forEach(c => { share[c] = tot > 0 ? (acc[c] || 0) / tot : 0; });
    return { share: share, pool: pool, tot: tot };
  }

  const BASE = { era: "2008_CRASH", year: 2012, month: 6, age: 45, flags: [], contacts: {},
    tier: 2, track: "electoral", party: "D", stance: "establishment", origin: "dynasty",
    entry: "insider", talent: "orator", rep: 30, hp: 80, fun: 400000, fav: 0, lev: 0 };
  const PROFILES = [
    { label: "选举轨道 T2", patch: {} },
    { label: "操盘轨道 T2", patch: { track: "operative", entry: "operative" } },
    { label: "名人轨道 T2", patch: { track: "celebrity", entry: "celebrity" } },
    { label: "财富轨道 T2", patch: { track: "wealth", entry: "business" } },
    { label: "委任轨道 T2", patch: { track: "appointment", entry: "pro" } },
    { label: "穷 T0 反建制", patch: { tier: 0, stance: "outsider", fun: 20000, rep: 8, origin: "labor" } },
    { label: "富 T4 把柄 5 财力足", patch: { tier: 4, fun: 5000000, rep: 70, lev: 5, contacts: { a: 1, b: 1, c: 1, d: 1, e: 1, f: 1 } } },
    { label: "病重 hp20 T2", patch: { hp: 20 } }
  ];
  const rows = PROFILES.map(function (p) {
    const prof = Object.assign({}, BASE, p.patch);
    const m = mixFor(prof);
    return { label: p.label, m: m };
  });

  /* 每个"人"都必须有得抽（不能因为倾向表把自己饿死到只剩填充器） */
  rows.forEach(function (r) {
    check(r.m.pool >= 8, r.label + " 可抽事件只剩 " + r.m.pool + " 条（<8（容易整月只剩填充器）");
  });

  const pct = (v) => (v * 100).toFixed(0).padStart(3) + "%";
  const top = (share, n) => CATS.filter(c => share[c] > 0.001)
    .sort((a, c) => share[c] - share[a]).slice(0, n)
    .map(c => P.category(c).name + " " + pct(share[c])).join(" ｜ ");
  console.log("  可抽事件池 " + rows[0].m.pool + " 条 ｜ 每种人的前三类：");
  rows.forEach(function (r) { console.log("    " + r.label.padEnd(18) + top(r.m.share, 3)); });

  /* 单调性：给了"针对某类"的资源和身份，那一类的份额必须上去，而不是靠运气 */
  const A = mixFor(Object.assign({}, BASE));                                     // 选举/建制/有钱
  const B2 = mixFor(Object.assign({}, BASE, { track: "operative", entry: "operative" }));
  check(B2.share.shady > A.share.shady, "操盘轨道应比选举轨道更容易碰上灰产（" +
    pct(A.share.shady) + " → " + pct(B2.share.shady) + "）");
  const C = mixFor(Object.assign({}, BASE, { track: "celebrity", entry: "celebrity" }));
  check(C.share.media > A.share.media, "名人轨道应更容易碰上舆论（" +
    pct(A.share.media) + " → " + pct(C.share.media) + "）");
  const Poor = mixFor(Object.assign({}, BASE, { fun: 20000 }));
  check(Poor.share.finance > A.share.finance, "缺钱的人应更容易被钱的事缠上（" +
    pct(A.share.finance) + " → " + pct(Poor.share.finance) + "）");
  const Lev = mixFor(Object.assign({}, BASE, { lev: 5 }));
  check(Lev.share.shady > A.share.shady, "手上把柄多的人应更容易碰上灰产（" +
    pct(A.share.shady) + " → " + pct(Lev.share.shady) + "）");
  const Sick = mixFor(Object.assign({}, BASE, { hp: 20 }));
  check(Sick.share.career < A.share.career, "病重的人应更少折腾仕途（" +
    pct(A.share.career) + " → " + pct(Sick.share.career) + "）");
  const Big = mixFor(Object.assign({}, BASE, { tier: 4 }));
  check(Big.share.crisis >= A.share.crisis, "高层级应更容易撞上危机（" +
    pct(A.share.crisis) + " → " + pct(Big.share.crisis) + "）");

  /* 时代专属 / 续集的既有倍数不能被倾斜吃掉（回归护栏） */
  const evEra = P.events.filter(e => e.era && e.era.length === 1)[0];
  const evAll = P.events.filter(e => e.era && e.era.length === Object.keys(P.reg.era).length)[0];
  if (evEra && evAll) {
    check(P.weightBreakdown(evEra, probeSnap, { counts: {} }).era === b.eraWeightMul,
      "时代专属倍数被动了（应恒为 " + b.eraWeightMul + "）");
    check(P.weightBreakdown(evAll, probeSnap, { counts: {} }).era === 1,
      "跨时代事件不该吃时代倍数");
  }
  console.log("  ok：倾向表 id/字段合法 ｜ 单因子夹取 ±" + b.weightFactorMax +
    " ｜ 整条倾斜封顶 ±" + b.weightTiltCap + " ｜ 权重确定 ｜ 每种人都有得抽 ｜ 单调性成立");
}

/* ---------- v0.5：出生州 / 掷骰建角 / VIP / 下野与硬结局 / 收益结算 / 年终随笔 ---------- */
console.log("\n== v0.5 出生州 / 掷骰建角 / 下野 / 收益结算 / 年终随笔 ==");
{
  const K = (o) => Object.keys(o);

  /* --- 出生州：注册表完整性 + 事件/倾向表引用的州必须存在 --- */
  const states = K(P.reg.state);
  check(states.length >= 5, "出生州至少要有 5 个（当前 " + states.length + "）");
  for (const sid of states) {
    const s = P.reg.state[sid];
    check(s.name, "州 " + sid + " 缺 name");
    check(["D", "R", "S"].indexOf(s.lean) >= 0, "州 " + sid + " 的 lean 必须是 D/R/S：" + s.lean);
    if (s.lean !== "S") check(Number.isInteger(s.strength) && s.strength >= 1 && s.strength <= 3,
      "州 " + sid + " 的 strength 应为 1-3（摇摆州可不填）：" + s.strength);
  }
  const badStateRef = [];
  P.events.forEach(function (ev) {
    [].concat(ev.states || []).forEach(function (sid) { if (!P.reg.state[sid]) badStateRef.push(ev.id + ".states:" + sid); });
  });
  (P.balance().identityBias || []).forEach(function (r, i) {
    [].concat((r.when || {}).states || []).forEach(function (sid) { if (!P.reg.state[sid]) badStateRef.push("identityBias[" + i + "]:" + sid); });
  });
  check(!badStateRef.length, "引用了不存在的州：" + badStateRef.join("、"));
  const evWithState = P.events.filter(function (e) { return e.states && e.states.length; });
  check(evWithState.length >= 1, "至少要有 1 个州联动事件（ev.states），否则出生州只是数字加成");
  /* 州联动事件必须可被对应州的玩家抽到：states 条件与 snap.state 对上 */
  P.CSEL = { era: K(P.reg.era)[0], origin: K(P.reg.origin)[0], talent: K(P.reg.talent)[0], entry: K(P.reg.entry)[0], party: K(P.reg.party)[0], stance: K(P.reg.stance)[0], name: "州测试" };
  P.confirmCreate();
  const stEv = evWithState[0];
  P.G.state = stEv.states[0];
  /* tierBand：事件里的旧档门槛会被 when.js 单调抬进 10 级空间，测试要站在抬升后的真实档位上 */
  P.G.tier = Math.min(P.balance().tierMax, P.tierBand(stEv.tierMin || 0) + 1); P.G.year = stEv.fromYear || P.G.year; P.G.doneIds = []; P.recentIds = [];
  check(P.eligible(stEv), "州联动事件 " + stEv.id + " 在对应州应可触发");
  const otherState = states.find(function (x) { return stEv.states.indexOf(x) < 0; });
  if (otherState) {
    P.G.state = otherState;
    check(!P.eligible(stEv), "州联动事件不应在其他州触发（" + stEv.id + " / " + otherState + "）");
  }

  /* 顺风/逆风：stateWindFor 的方向 */
  const deepRed = states.find(function (x) { const s = P.reg.state[x]; return s.lean === "R" && s.strength >= 2; });
  if (deepRed) {
    check(P.stateWindFor(deepRed, "R") > 0, "深红州对共和党应顺风为正");
    check(P.stateWindFor(deepRed, "D") < 0, "深红州对民主党应逆风为负");
    check(P.stateWindFor(deepRed, "I") < 0, "深红州对独立参选应为逆风（谁的地盘都不是）");
  }
  check(P.stateWindFor("OH", "D") === 0 && P.stateWindFor("OH", "R") === 0, "摇摆州对谁都应是 0 风");
  check(P.stateName(states[0]) && P.stateName(states[0]) !== states[0], "州应有人名（name）");

  /* --- 初始资源平衡（v0.5.1）：基础盘是穷小子，出身只往上加，任何组合不得开局负债/负声望 --- */
  /* #34：confirmCreate → startYear 现在会把玩家直接放进本年第一个月，而月循环会动钱/属性。
     下面这些断言要的是【建角那一瞬间】的初始盘，所以临时掐掉跨年后的推进。 */
  function createOnly(fn) {
    const nm = P.nextMonth, rm = P.resumeMonth;
    P.nextMonth = function () { }; P.resumeMonth = function () { };
    try { return fn(); } finally { P.nextMonth = nm; P.resumeMonth = rm; }
  }
  {
    const bStart = P.balance();
    check(bStart.startFun <= 20000, "基础盘资金应压在 $20k 以内（刚毕业的穷小子），当前 $" + bStart.startFun);
    check(bStart.startRep === 0, "基础盘声望应为 0（声望由出身/起点加出来），当前 " + bStart.startRep);
    const combos = [];
    for (const o in P.reg.origin) for (const e in P.reg.entry) {
      P.CSEL = { era: K(P.reg.era)[0], origin: o, talent: K(P.reg.talent)[0], entry: e, party: K(P.reg.party)[0], stance: K(P.reg.stance)[0], state: states[0], name: "平衡测试", rolled: { CHA: 45, INT: 45, CUN: 45, INTG: 45 }, spent: {}, rerolled: {}, freeExtra: 0 };
      createOnly(P.confirmCreate);
      combos.push({ o: o, e: e, fun: P.G.fun, rep: P.G.rep, fav: P.G.fav });
    }
    const inDebt = combos.filter(c => c.fun < 0);
    check(!inDebt.length, "任何 出身×起点 组合都不应开局负债：" + inDebt.map(c => c.o + "/" + c.e + "=$" + (c.fun / 1000) + "k").join("、"));
    const negRep = combos.filter(c => c.rep < 0);
    check(!negRep.length, "任何组合都不应开局负声望：" + negRep.map(c => c.o + "/" + c.e).join("、"));
    const funs = combos.map(c => c.fun), reps = combos.map(c => c.rep);
    console.log("  初始资金区间 $" + Math.min.apply(null, funs) / 1000 + "k ~ $" + Math.max.apply(null, funs) / 1000 +
      "k ｜ 初始声望区间 " + Math.min.apply(null, reps) + " ~ " + Math.max.apply(null, reps) +
      " ｜ 人情 0~" + Math.max.apply(null, combos.map(c => c.fav)));
    /* 差距要拉开（出身的意义），但下限是 0：穷出身 = 白手起家，不是生下来就欠债 */
    check(Math.max.apply(null, funs) >= 1000000, "最富组合应到 $1M+（出身的资金差距要拉开）");
    check(Math.min.apply(null, funs) >= 0, "最穷组合下限是 $0（白手起家），不是负数");
  }

  /* --- v0.12 #20 建角自由点模型（定命一掷已删）+ 周目元进度 + 作弊码 --- */
  const b5 = P.balance();
  check(b5.freePoints >= 1 && b5.freePoints <= 60, "freePoints 基础值合理（一周目 12）：" + b5.freePoints);
  check(b5.freeCapPerAttr >= 1 && (b5.freeCapMax == null || b5.freeCapMax >= b5.freeCapPerAttr), "单维软上限：基础 ≤ 封顶");
  check(b5.freeAttrPerPoint === 10, "汇率：1 点 = +10 属性");
  check(b5.freeFunPerPoint === 2000, "汇率：1 点 = +$2k 金钱");
  check(!b5.rollAttrs, "定命一掷已删：balance 不应再有 rollAttrs");
  /* #20 收尾定稿：一周目 12 点；单维上限 = 属性 100 所需的点数（100 / 每点 10 = 10 点） */
  check(b5.freePoints === 12, "一周目池子 = 12 点：" + b5.freePoints);
  check(b5.freeCapPerAttr === Math.floor(100 / b5.freeAttrPerPoint),
    "单维上限 = 点到属性 100 所需点数（" + b5.freeCapPerAttr + " 点）");

  /* 卡池标尺（#20 收尾 · #36 重标）：1 单位 = +10 属性 = $2k，钱卡 = 稀有度 × $2k；
     白/蓝的属性增益严格 = 稀有度 × 10（紫/橙只要求不超过档位，多维合计另算）。
     被动（mods/crit/luck/hpDecay/voterDrift/spare）不占这把尺，不校验。 */
  const CARDS = P.reg.card || {};
  Object.keys(CARDS).forEach(function (id) {
    const c = CARDS[id], r = c.rarity || 1, fx = c.effects || {};
    if (typeof fx.fun === "number" && fx.fun > 0) {
      check(fx.fun === r * 2000, "卡 " + id + "（" + r + " 档）钱 = 稀有度 × $2k：" + fx.fun);
    }
    const av = fx.attr || {};
    const pos = Object.keys(av).map(function (k) { return av[k]; }).filter(function (v) { return v > 0; });
    if (!pos.length) return;
    const mx = Math.max.apply(null, pos);
    check(mx <= r * 10, "卡 " + id + "（" + r + " 档）单维属性增益 ≤ 稀有度 × 10：" + mx);
    if (r <= 2) check(mx === r * 10, "白/蓝卡属性增益严格对齐标尺（" + r + " 档 = +" + (r * 10) + "）：" + id);
  });

  /* 周目 meta（#31：周目数是唯一的成长账本 —— 自由点 = 基础 12 + 已完成周目 × 1） */
  const _loopRaw = (function () { try { const v = localStorage.getItem(P.metaLoopKey); localStorage.removeItem(P.metaLoopKey); return v; } catch (e) { return null; } })();
  const _cselBak = P.CSEL; P.CSEL = null;         // 作弊周目读自 CSEL，测前先把它摘掉
  check(P.completedLoops() === 0 && P.currentLoop() === 1, "无 meta 时应是第 1 周目：" + P.currentLoop());
  check(P.readBonusFree() === 0, "第 1 周目没有周目奖励：" + P.readBonusFree());
  check(P.freePool() === b5.freePoints, "第 1 周目额度 = 基础值：" + P.freePool());
  check(P.freeCap() === b5.freeCapPerAttr, "第 1 周目单维上限 = 基础：" + P.freeCap());
  check(b5.loopFreeBonus === 1, "每完成一个周目送 1 点（口径：基础 12 ＋ 周目数 × 1）：" + b5.loopFreeBonus);
  check(P.freePoolFor(6) === b5.freePoints + 5 * b5.loopFreeBonus, "freePoolFor(6) = 12 + 5：" + P.freePoolFor(6));
  check(P.loopFreeBonus() === b5.loopFreeBonus, "loopFreeBonus 读数口一致");

  /* 分配夹取（spendPoint）：属性吃满前 ① 单维软上限 ② 属性 100 硬顶；金钱档不受 cap、
     吸收剩余额度；总额恒 ≤ 额度；减点不为负。 */
  P.startCreate();
  const ATTR3 = ["CHA", "INT", "CUN"], POOL0 = P.freePool(), CAP0 = P.freeCap();
  for (let i = 0; i < 200; i++) P.spendPoint("CHA", 1);
  check(P.CSEL.spent.CHA <= CAP0, "CHA 分配不超单维软上限 " + CAP0 + "：" + P.CSEL.spent.CHA);
  check((b5.startAttr.CHA + P.CSEL.spent.CHA * b5.freeAttrPerPoint) <= 100, "属性分配不越过 100 硬顶");
  ATTR3.concat(["FUN"]).forEach(function (k) { for (let i = 0; i < 300; i++) P.spendPoint(k, 1); });
  const usedSum = ATTR3.concat(["FUN"]).reduce(function (a, k) { return a + (P.CSEL.spent[k] || 0); }, 0);
  check(usedSum === POOL0, "四格灌满后总分配 = freePool（" + usedSum + "／" + POOL0 + "）");
  /* 单维可一路点到属性 100（=10 点，旧的 6 点封顶已废）：第 1 周目 12 点不够三围全满，
     所以先用作弊码兑一笔周目把额度抬起来，再看多出来的点是否落进不受 cap 的金钱档。 */
  P.CSEL.cheatLoops = 30;
  check(P.currentLoop() === 31 && P.freePool() === POOL0 + 30, "作弊周目直接抬额度：" + P.freePool());
  ATTR3.concat(["FUN"]).forEach(function (k) { for (let i = 0; i < 300; i++) P.spendPoint(k, 1); });
  check(ATTR3.every(function (k) { return (P.CSEL.spent[k] || 0) === 10; }),
    "三围各可点到 10 点 = 属性 100（单维不再 6 点封顶）：" + ATTR3.map(k => k + ":" + P.CSEL.spent[k]).join(" "));
  check(P.CSEL.spent.FUN > 0, "三围全满后多出来的点自动落进金钱档（不受 cap）：" + P.CSEL.spent.FUN);
  P.CSEL.cheatLoops = 0;
  for (let i = 0; i < 300; i++) P.spendPoint("FUN", -1);
  check(P.CSEL.spent.FUN >= 0, "减点不应为负：" + P.CSEL.spent.FUN);

  /* 真实周目（结算记的那笔 +1）同样把额度与单维上限一起抬起来 */
  P.bumpLoop(); P.bumpLoop();
  check(P.currentLoop() === 3, "完成两局后进入第 3 周目：" + P.currentLoop());
  check(P.readBonusFree() === 2 * b5.loopFreeBonus, "两个周目送 " + (2 * b5.loopFreeBonus) + " 点：" + P.readBonusFree());
  check(P.freePool() === b5.freePoints + 2 * b5.loopFreeBonus, "周目奖励后额度：" + P.freePool());
  check(P.freeCap() === Math.min(b5.freeCapMax, b5.freeCapPerAttr + Math.floor(P.readBonusFree() / b5.freeCapGrow)),
    "单维软上限随额度抬升（每 " + b5.freeCapGrow + " 点开 1 点，封顶 " + b5.freeCapMax + "）：" + P.freeCap());
  try { if (_loopRaw == null) localStorage.removeItem(P.metaLoopKey); else localStorage.setItem(P.metaLoopKey, _loopRaw); } catch (e) { }
  P.CSEL = _cselBak;

  /* 作弊码 woshishabiN（#31 起兑的是周目）：1~10、>10 夹到 10、未命中返回 0 */
  check(P.cheatParse("woshishabi1") === 1, "woshishabi1 → +1 周目");
  check(P.cheatParse("woshishabi5") === 5, "woshishabi5 → +5 周目");
  check(P.cheatParse("woshishabi10") === 10, "woshishabi10 → +10 周目");
  check(P.cheatParse("woshishabi11") === 10, "超过 10 一律夹到 10（woshishabi11 → 10）");
  check(P.cheatParse("woshishabi99") === 10, "woshishabi99 → 夹到 10");
  check(P.cheatParse("woshishabi0") === 0, "woshishabi0（不加周目）视为未命中");
  check(P.cheatParse("wjk100") === 0, "旧码形 wjk100 已作废，未命中返回 0");
  check(P.cheatParse("") === 0 && P.cheatParse("hello") === 0, "空 / 乱码静默返回 0，不给提示");
  /* 界面入口 submitCheat()（#31：输入框住在第 2 步天赋页）：
     直接传码 → 累加本局作弊周目 → 周目口径抬高 → 并且给得出中文反馈。 */
  P.startCreate();
  const POOL1 = P.freePool();
  check(P.submitCheat("woshishabi3") === 3, "submitCheat('woshishabi3') → +3 周目");
  check(P.CSEL.cheatLoops === 3, "作弊周目累加进本局建角：" + P.CSEL.cheatLoops);
  check(P.freePool() === POOL1 + 3 * b5.loopFreeBonus, "额度随作弊周目变大：" + P.freePool());
  check(/3/.test(P.CSEL.cheatMsg || ""), "兑换给得出反馈（不再静默）：" + P.CSEL.cheatMsg);
  check(P.submitCheat("nope") === 0 && /不对/.test(P.CSEL.cheatMsg || ""), "错码给出提示且不加分：" + P.CSEL.cheatMsg);
  check(P.CSEL.cheatLoops === 3, "错码不动计数器：" + P.CSEL.cheatLoops);
  /* 连打：woshishabi10 不能被读成 woshishabi1 + 残 0——数字攒着，settle 一次才结算 */
  P.cheatReset();
  "woshishabi1".split("").forEach(function (c) { P.cheatFeed(c); });
  check(P.cheatFeed("0") === 0, "刚敲 1 后立刻再来 0，前一击不该已结算");
  check(P.cheatFeed("", true) === 10, "停手 settle：整串 woshishabi10 结算为 10");
  P.cheatReset();

  /* confirmCreate：属性 = startAttr + 分配点×汇率；诚信不受分配；金钱档并入开局资金。
     用「同一套出身/州」跑两次做差，避开出身/州效果对绝对值的干扰。 */
  const mkCsel = function (spent) {
    return { era: K(P.reg.era)[0], origin: K(P.reg.origin)[0], talent: K(P.reg.talent)[0],
      entry: K(P.reg.entry)[0], party: K(P.reg.party)[0], stance: K(P.reg.stance)[0], state: states[0],
      difficulty: "normal", name: "分配测试", spent: spent, cheatLoops: 0, offer: [], picks: [] };
  };
  P.CSEL = mkCsel({ CHA: 0, INT: 0, CUN: 0, FUN: 0 }); createOnly(P.confirmCreate);
  const baseAttr = Object.assign({}, P.G.attr), baseFun = P.G.fun;
  P.CSEL = mkCsel({ CHA: 2, INT: 0, CUN: 0, FUN: 3 }); createOnly(P.confirmCreate);
  check(P.G.attr.CHA === baseAttr.CHA + 20, "CHA 分配 2 点 = +20 属性（" + baseAttr.CHA + "→" + P.G.attr.CHA + "）");
  check(P.G.attr.INTG === baseAttr.INTG, "诚信不参与建角分配，固定打底：" + P.G.attr.INTG);
  check(P.G.fun === baseFun + 3 * 2000, "金钱档 3 点 = +$6k 开局资金（" + baseFun + "→" + P.G.fun + "）");
  check(P.G.state === states[0], "confirmCreate 应记住出生州");
  const wind = P.stateWindFor(states[0], K(P.reg.party)[0]);
  if (wind > 0) check(P.G.faction.establishment > 0, "顺风州开局应给建制派加成");
  if (wind < 0) check(P.G.faction.base > 0, "逆风州开局应给基层加成（少数派的同情）");

  /* --- 下野（fall）与硬结局（hardEnd）--- */
  P.G.tier = 4; P.G.rep = 70; P.G.flags = ["investigation_open", "scandal_4"]; P.G.fallenShieldUntil = 0;
  const tierBefore = P.G.tier, repBefore = P.G.rep;
  P.applyEffects({ fall: 1 });
  check(P.G.tier === 3, "下野 depth1 应降一级（" + tierBefore + "→" + P.G.tier + "）");
  check(P.G.rep < repBefore, "下野应摔声望（" + repBefore + "→" + P.G.rep + "）");
  check(P.G.flags.indexOf("fallen") >= 0, "下野应打 fallen 标记");
  check(P.G.flags.indexOf("investigation_open") < 0, "下野应了结调查");
  check(P.G.fallenCount === 1, "下野计数应为 1");
  check(P.G.fallenShieldUntil > P.monthSeq(), "下野应有保护期");
  /* 保护期内的第二次 fall 不叠加 */
  const repShield = P.G.rep, tierShield = P.G.tier;
  P.applyEffects({ fall: 2 });
  check(P.G.tier === tierShield && P.G.rep === repShield, "保护期内的下野不应叠加");
  /* 保护期过后：depth2 降两级 + 丑闻降档 */
  P.G.fallenShieldUntil = 0; P.G.tier = 4; P.G.flags = ["fallen", "scandal_4"];
  P.applyEffects({ fall: 2 });
  check(P.G.tier === 2, "下野 depth2 应降两级（4→2，实际 " + P.G.tier + "）");
  check(P.G.flags.some(function (f) { return f === "scandal_2"; }), "下野后丑闻应降两级（scandal_4→scandal_2）");
  /* hardEnd 只写标记，终局由 afterEvent 收口 */
  P.G.pendingHardEnd = null;
  P.applyEffects({ hardEnd: "disgrace" });
  check(P.G.pendingHardEnd === "disgrace", "hardEnd 应写入 pendingHardEnd");
  /* --- v0.12 仇家链路：count(wrath_*) 攒恨 → countMin 门槛 →（清算事件）hardEnd ---
   * 仇恨直接做成 counters（G.counters["wrath_<组>"]）：复用现成的 count 效果键与
   * countMin/countMax/countEq 条件词汇，引擎零新增判定代码。这里把这条链焊死：
   * 任何一环被改坏（比如给 count 加了上限、或 snap 漏了 counters），清算内容会静默失效。 */
  const _svCounters = P.G.counters;
  P.G.counters = {};
  P.applyEffects({ count: { wrath_press: 7 } });
  P.applyEffects({ count: { wrath_press: 5 } });
  check(P.G.counters.wrath_press === 12, "仇恨 counter 应累加（7+5，实际 " + P.G.counters.wrath_press + "）");
  P.applyEffects({ count: { wrath_press: -99 } });
  check(P.G.counters.wrath_press === 0, "仇恨下限 0（安抚可以削恨，不能削成负数）");
  P.applyEffects({ count: { wrath_press: 10 } });
  check(P.when({ countMin: { wrath_press: 10 } }) === true, "攒够仇恨后 countMin 门槛应放行");
  check(P.when({ countMin: { wrath_press: 11 } }) === false, "差一点时 countMin 不应放行");
  /* 内容侧用到的每个 wrath_ 组都必须登记在 reg.wrath（chip 名字/悬停说明的来源） */
  const wrathUsed = {};
  [JSON.stringify(P.events), JSON.stringify(P.reg.ending)].forEach(function (blob) {
    const re = /"wrath_([A-Za-z][A-Za-z0-9_]*)"/g; let mm;
    while ((mm = re.exec(blob))) wrathUsed[mm[1]] = 1;
  });
  Object.keys(wrathUsed).forEach(function (g) {
    check(!!(P.reg.wrath || {})[g], "事件/结局用到未登记的仇家群体 wrath_" + g + "（应写进 01-config.js 的 wrath 表）");
  });
  /* --- v0.12 清算 BE 收口：内容里每个 hardEnd 理由都必须落到一条真结局规则 ---
   * 理由拼错（或忘了加 when:{reason:...} 规则）不会报错——玩家会掉进 default「中场」，
   * 黑色幽默成就静默丢失。这里把 hardEnd→ending 的映射扫死。 */
  const hardReasons = {};
  (function scan(v) {
    if (!v || typeof v !== "object") return;
    if (Array.isArray(v)) { v.forEach(scan); return; }
    for (const k in v) {
      if (k === "hardEnd" && typeof v[k] === "string") hardReasons[v[k]] = 1;
      else scan(v[k]);
    }
  })(P.events.map(function (e) { return { choices: (e.choices || []).map(function (c) { return { outcomes: c.outcomes, cost: c.cost }; }) }; }));
  Object.keys(hardReasons).forEach(function (r) {
    const hit = P.reg.ending.some(function (rule) { return rule.when && rule.when.reason === r; });
    check(hit, "hardEnd 理由「" + r + "」没有对应的结局规则（应在 40-endings.js 注册 when:{reason:...}）");
  });
  /* 引擎侧 BE（学贷断供在 core.js loanStep 里挂 hardEnd，不经内容）同样必须有落点 */
  check(P.reg.ending.some(function (rule) { return rule.when && rule.when.reason === "bankrupt"; }),
    "引擎断供 BE 理由「bankrupt」没有对应的结局规则（40-endings.js）");
  P.G.counters = _svCounters;
  /* 结局规则：disgrace / 东山再起 / 从谷底收场 都已注册 */
  check(P.reg.ending.some(function (r) { return r.id === "disgrace"; }), "结局规则应注册 disgrace（身败名裂）");
  check(P.reg.ending.some(function (r) { return r.id === "retire_comeback"; }), "结局规则应注册 retire_comeback（东山再起）");
  /* 东山再起的门槛：fallen 且 tier>=3 —— 优先级高于普通 retire */
  /* 东山再起的门槛（旧档 tier>=3）经 when.js tierBand 抬进新空间；测试要站在映射后的真实档位上 */
  P.G.flags = ["fallen"]; P.G.tier = P.tierBand(3); P.G.endingReason = "retire";
  const comeback = P.evaluateEnding("retire");
  check(comeback.id === "retire_comeback", "下野后爬回 T3 的退休结局应是东山再起（实际 " + comeback.id + "）");

  /* --- v0.12 #20 开局抽卡 / 天赋卡墙 ---
   * 卡池健全性 + 掷牌不变量（长度/去重/橙卡门槛）+ 难度=选卡数 + 入选结算 + 免死豁免。
   * 本块自建临时 G，测完还原 P.G，不污染后续用例。 */
  (function () {
    const cards = P.reg.card || {};
    const ids = Object.keys(cards);
    check(ids.length >= 15, "卡池至少要有 15 张卡（实际 " + ids.length + "）");
    check(ids.every(id => [1, 2, 3, 4].indexOf(cards[id].rarity || 1) >= 0), "每张卡的 rarity 必须 ∈ {1,2,3,4}");
    check(ids.every(id => cards[id].name && cards[id].desc), "每张卡都要有 name 与 desc（展示字段）");
    /* 每个稀有度都得有卡，否则 rollRarity 抽空、掷牌会退化成白档兜底 */
    [1, 2, 3].forEach(r => check(ids.some(id => (cards[id].rarity || 1) === r), "稀有度 " + r + " 档不能空（否则抽不到）"));
    check(ids.some(id => (cards[id].rarity || 1) === 4), "要有橙卡（命卡档，总统门槛后解锁）");
    /* 免死卡的 spare 理由必须都能落到真结局规则（同 hardEnd 落点纪律） */
    ids.forEach(function (id) {
      (cards[id].spare || []).forEach(function (why) {
        check(P.reg.ending.some(r => r.when && r.when.reason === why),
          "免死卡「" + id + "」的 spare 理由「" + why + "」没有对应结局规则");
      });
    });
    /* 难度 → 选卡数（读 config.gacha.picks） */
    const pk = (P.balance().gacha || {}).picks || {};
    check(P.cardPickCount("brutal") === (pk.brutal == null ? 1 : pk.brutal) &&
      P.cardPickCount("legendary") === (pk.legendary == null ? 5 : pk.legendary), "cardPickCount 应按难度取 picks（炼狱最少 / 传奇最多）");
    check(P.cardPickCount("nope") >= 1, "未知难度应给 1 张保底");
    /* 掷牌不变量：长度=offer、无重复；橙卡受【周目】门槛（#31：第 2 周目起进池） */
    const g = P.gachaCfg();
    const _lkBak = (function () { try { return localStorage.getItem(P.metaLoopKey); } catch (e) { return null; } })();
    const _lCsel = P.CSEL; P.CSEL = null;
    const setLoop = function (n) { try { if (n <= 0) localStorage.removeItem(P.metaLoopKey); else localStorage.setItem(P.metaLoopKey, String(n)); } catch (e) { } };
    setLoop(0);
    check(P.currentLoop() === 1 && !P.orangeUnlocked(), "第 1 周目橙卡不该进池");
    const off = P.rollCardOffer();
    check(off.length === g.offer, "一次掷牌应给 offer 张（期望 " + g.offer + "，实际 " + off.length + "）");
    check(new Set(off).size === off.length, "掷牌不得有重复卡");
    check(off.every(id => (cards[id].rarity || 1) !== g.orangeRarity), "第 1 周目不得掷出橙卡（周目门槛）");
    setLoop(g.orangeLoop - 1);
    check(P.currentLoop() === g.orangeLoop && P.orangeUnlocked(), "第 " + g.orangeLoop + " 周目橙卡应进池：" + P.currentLoop());
    const off2 = P.rollCardOffer();
    check(off2.length === g.offer && new Set(off2).size === off2.length, "解锁后掷牌仍要长度守恒且无重复");
    /* 高周目真掷得出橙卡（权重低，猛掷多次必须至少撞见一次 —— 否则门槛只是纸面的） */
    setLoop(5);
    let sawOrange = false;
    for (let i = 0; i < 400 && !sawOrange; i++) sawOrange = P.rollCardOffer().some(id => (cards[id].rarity || 1) === g.orangeRarity);
    check(sawOrange, "第 6 周目应能掷出橙卡（400 次内至少撞见一次）");
    /* 稀有度权重随周目单调不降（loopRarity 表）：橙档从 0 起抬 */
    check((P.rarityWForLoop(1, (P.balance().gacha || {}))[4] || 0) === 0 &&
      (P.rarityWForLoop(3, (P.balance().gacha || {}))[4] || 0) > 0,
      "loopRarity：一周目橙权重 0、三周目 >0");
    check(P.gachaCfg().rerolls === (((P.balance().gacha || {}).rerolls) == null ? 1 : (P.balance().gacha || {}).rerolls),
      "刷新配额读自 config（每局可刷 " + P.gachaCfg().rerolls + " 次）");
    /* #31 卡墙刷新配额：每局 rerolls 次；用完一次都不动牌面 */
    setLoop(0);
    P.startCreate();
    const quota = P.gachaCfg().rerolls;
    const snap0 = P.CSEL.offer.slice().sort().join(",");
    P.rollOffer();
    check(P.CSEL.rerollsUsed === 1, "换一批应记掉一次配额：" + P.CSEL.rerollsUsed);
    for (let i = 0; i < 5; i++) P.rollOffer();
    check(P.CSEL.rerollsUsed === quota, "配额用尽后不得再记次（" + quota + " 次上限，实际 " + P.CSEL.rerollsUsed + "）");
    check(!!P.CSEL.stepMsg, "配额用尽要给得出提示");
    P.CSEL.rerollsUsed = 0; P.rollOffer();
    check(P.CSEL.offer.length === snap0.split(",").length, "重掷仍给满 offer 张");
    /* #31 结算无条件 +1 周目（与保卡不再二选一），且同一局重复结算不双记 */
    const _loopBak2 = (function () { try { return localStorage.getItem(P.metaLoopKey); } catch (e) { return null; } })();
    setLoop(0);
    const savedG2 = P.G;
    P.G = {
      version: P.VERSION, year: 1996, month: 12, age: 40, tier: 2, peakTier: 2, track: K(P.reg.track)[0],
      party: K(P.reg.party)[0], stance: K(P.reg.stance)[0], origin: K(P.reg.origin)[0], talent: K(P.reg.talent)[0],
      state: K(P.reg.state)[0], fun: 5000, rep: 30, hp: 60, fav: 0, lev: 0, attr: { CHA: 20, INT: 20, CUN: 20, INTG: 50 },
      faction: {}, flags: [], cards: [], spentCards: [], history: [], log: [], contacts: {}, counters: {},
      doneIds: [], debt: 0, debtAccr: 0, loanLate: 0, loanCaps: 0, loopCounted: 0, endingReason: null
    };
    P.ending("retire");
    check(P.completedLoops() === 1 && P.G.loopCounted === 1, "结算应无条件把周目 +1（现在 " + P.completedLoops() + "）");
    P.ending("retire");
    check(P.completedLoops() === 1, "同一局重复结算不得双记周目：" + P.completedLoops());
    P.G = savedG2;
    try { if (_loopBak2 == null) localStorage.removeItem(P.metaLoopKey); else localStorage.setItem(P.metaLoopKey, _loopBak2); } catch (e) { }
    P.CSEL = _lCsel;
    setLoop(_lkBak == null ? 0 : Number(_lkBak) || 0);
    /* 入选结算：钱卡加钱、进卡墙；聚合被动可从 activeCards 读出 */
    const saved = P.G;
    const moneyId = ids.filter(id => cards[id].effects && cards[id].effects.fun > 0)[0];
    const critId = ids.filter(id => cards[id].critMul > 1)[0];
    P.G = { cards: [], spentCards: [], fun: 10000, rep: 50, attr: { CHA: 45, INT: 45, CUN: 45, INTG: 50 }, faction: {}, log: [], flags: [] };
    const pickList = [moneyId, critId].filter(Boolean);
    P.adoptCards(pickList);
    check(pickList.every(id => P.G.cards.indexOf(id) >= 0), "adoptCards 应把选中的卡登记进 G.cards");
    if (moneyId) check(P.G.fun > 10000, "带 fun 效果的卡入选后应立即结算资金（10000 → " + P.G.fun + "）");
    if (critId) check(P.activeCards().some(c => c.critMul > 1), "被动卡应出现在 activeCards 里");
    /* 免死豁免：命中 spare 列表则烧卡 + 清 pendingHardEnd + 扣声望 */
    const spareId = ids.filter(id => (cards[id].spare || []).length)[0];
    if (spareId) {
      const why = cards[spareId].spare[0];
      P.G.cards = [spareId]; P.G.spentCards = []; P.G.rep = 50; P.G.pendingHardEnd = why;
      const repBefore = P.G.rep;
      const savedPen = (P.balance().gacha || {}).spareRepPenalty;
      check(P.spareHardEnd() === true, "spareHardEnd 命中免死卡应返回 true（豁免这次死亡）");
      check(!P.G.pendingHardEnd, "豁免后 pendingHardEnd 应被清空");
      check(P.G.cards.indexOf(spareId) < 0 && P.G.spentCards.indexOf(spareId) >= 0, "免死卡应烧毁并留痕进 spentCards");
      check(P.G.rep < repBefore, "挡下一次致命结局应扣一笔声望（" + repBefore + " → " + P.G.rep + "）");
      /* 无免死卡时：同一致命结局照常被放行到终局判定（返回 false） */
      P.G.cards = []; P.G.pendingHardEnd = why;
      check(P.spareHardEnd() === false, "没有免死卡时 spareHardEnd 应返回 false（照常死亡）");
    }
    P.G = saved;
  })();


  /* --- v0.11 P1：生涯结算（career_end）按终局档位/总统标记分流 ---
   * 结算规则用 tierRaw:true，档位直接按新 10 级空间读，故这里 G.tier 写真实级（0..9）。
   * 本块会覆盖 G.tier/flags/endingReason，测完还原，避免污染后续用例。 */
  const _svTier = P.G.tier, _svFlags = P.G.flags, _svReason = P.G.endingReason;
  const careerAt = function (tier, flags) {
    P.G.tier = tier; P.G.flags = flags || []; return P.evaluateEnding("career_end").id;
  };
  check(["career_president_great","career_president","career_heavyweight","career_federal",
         "career_state","career_local","career_quiet"].every(function (id) {
    return P.reg.ending.some(function (r) { return r.id === id; });
  }), "career_end 成就结局规则应全部注册（7 条）");
  check(careerAt(9, ["president_done"]) === "career_president_great", "任满+清白 的 2025 结算应是载入史册的总统");
  check(careerAt(9, ["president_done","scandal_4"]) === "career_president", "任满+丑闻 的结算应降为留下印记的总统");
  check(careerAt(8, []) === "career_heavyweight", "终局 8 级（无总统）应结算为权倾一方");
  check(careerAt(5, []) === "career_federal", "终局 5 级应结算为联邦层面的名字");
  check(careerAt(3, []) === "career_state", "终局 3 级应结算为州政的常青树");
  check(careerAt(1, []) === "career_local", "终局 1 级应结算为地方深耕者");
  check(careerAt(0, []) === "career_quiet", "终局 0 级应结算为无声的四十一年");
  /* 曾任总统且清白：2025 结算按总统身份收口（不看终局档位）；若带大丑闻则降为印记 */
  check(careerAt(2, ["president_done"]) === "career_president_great", "曾任总统+清白，下野后 2025 仍以总统成就收口");
  P.G.tier = _svTier; P.G.flags = _svFlags; P.G.endingReason = _svReason;

  /* --- 效果键 setTrack / setStance --- */
  const track0 = P.G.track;
  P.applyEffects({ setTrack: "operative" });
  check(P.G.track === "operative", "setTrack 应改轨道（" + track0 + "→operative）");
  P.applyEffects({ setTrack: "不存在的轨道" });
  check(P.G.track === "operative", "setTrack 对不存在的轨道应忽略");
  const stance0 = P.G.stance;
  P.applyEffects({ setStance: K(P.reg.stance).find(function (x) { return x !== stance0; }) });
  check(P.G.stance !== stance0, "setStance 应改姿态");
  P.G.track = track0; P.G.stance = stance0;

  /* --- 收益结算面板：effects → 玩家语言 ---
     词条名取自派系/属性/状态注册表，en 覆盖层一翻就会被当成断言失败，所以整段按中文取词。 */
  const gs = ZH(() => P.gainSummary({ rep: 8, fun: 250000, fav: -1, fac: { base: 6, press: -4 }, flags: ["fallen"], fall: 1 }));
  check(gs.length >= 5, "gainSummary 应把各类效果都翻译出来（实际 " + gs.length + " 条）");
  check(gs.some(function (x) { return x.k === "声望" && x.v === 8 && x.sign > 0; }), "rep 应翻成 声望+8");
  check(gs.some(function (x) { return x.k === "资金" && x.v.indexOf("+$250k") === 0; }), "fun 应翻成 资金+$250k");
  /* 派系名取自活注册表（boot 时已被覆盖层翻掉，ZH() 管不到），所以拿同源的 factionName 比对。 */
  check(gs.some(function (x) { return x.k === P.factionName("press") && x.sign < 0; }), "fac.press 应翻成派系名（媒体/Press）-4");
  check(gs.some(function (x) { return x.flag && x.k === "状态"; }), "flags 应翻成状态词条");
  check(gs.some(function (x) { return x.k === "下野"; }), "fall 应翻成下野");
  const gsScandal = P.gainSummary({ flags: ["scandal_3"] });
  check(gsScandal.length === 0, "内部标记 scandal_n 不应出现在收益面板");

  /* --- 年终随笔：任何处境都能拼出三段 --- */
  check(K(P.reg.yeartale).length >= 8, "年终随笔素材至少 8 条（当前 " + K(P.reg.yeartale).length + "）");
  ["did", "gain", "now"].forEach(function (kind) {
    check(P.reg.yeartale && K(P.reg.yeartale).some(function (id) { return P.reg.yeartale[id].kind === kind; }),
      "年终随笔缺 kind=" + kind + " 的素材");
  });
  const taleCases = [
    ["顺风顺水", function (g) { g.rep = 80; g.fun = 5000000; g.tier = 4; g.yearStartSnap = { rep: 60, fun: 3000000, hp: 90, lev: 0, tier: 3 }; g.quietMonths = [1, 2]; }],
    ["连摔带病", function (g) { g.rep = 10; g.fun = -50000; g.hp = 30; g.tier = 1; g.flags = ["fallen"]; g.yearStartSnap = { rep: 50, fun: 400000, hp: 70, lev: 2, tier: 3 }; g.quietMonths = []; }],
    ["平静之年", function (g) { g.quietMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9]; g.yearStartSnap = { rep: g.rep, fun: g.fun, hp: g.hp, lev: g.lev || 0, tier: g.tier }; }]
  ];
  taleCases.forEach(function (c) {
    P.G.flags = []; P.G.contacts = {}; P.G.quietMonths = []; P.G.yearHeads = []; P.G.state = states[0];
    c[1](P.G);
    const t = P.yearNarrative();
    check(!!t && t.length >= 40, c[0] + " 的年终随笔应能拼出内容（" + (t ? t.length : 0) + " 字）");
  });

  /* --- 选民池与晋升进度（v0.5.2）--- */
  {
    check(typeof P.applyVoters === "function" && typeof P.electionStrength === "function", "选民池 API 应存在");
    P.G.voters = { warm: 0, diehard: 0, oppose: 0 };
    P.G.tier = 2;                                    /* 等级3 选区 */
    P.applyVoters({ warm: 50000, diehard: 8000, oppose: 20000 });
    let vp = P.voterPools();
    check(vp.warm === 50000 && vp.diehard === 8000 && vp.oppose === 20000, "选民池应按具体人数累加");
    P.applyVoters({ oppose: -5000 });
    check(P.voterPools().oppose === 15000, "oppose 负数应拉走反对者（2万→1.5万）");
    P.applyVoters({ warm: 999999999 });
    check(P.voterPools().warm <= P.electorateSize(), "选民人数应被选区规模夹住（" + P.voterPools().warm + " ≤ " + P.electorateSize() + "）");
    const es = P.electionStrength();
    const tier2Electorate = P.balance().voterBase.electorate[2];
    check(es.size === tier2Electorate && es.pct > 0, "等级3 选区应为 " + tier2Electorate + "，选举底气为正（" + es.size + "/" + es.pct + "）");
    /* 升位稀释：等级3→等级4 跨一级，按 carryKeep 锚带走一部分旧死忠（阶梯衰减，跳得越多带得越少） */
    P.G.voters = { warm: 50000, diehard: 8000, oppose: 20000 };
    P.rescaleVoters(2, 3);
    vp = P.voterPools();
    check(vp.diehard > 0 && vp.diehard < 8000, "升位应稀释死忠（8000→" + vp.diehard + "）——地盘换了，人心重新攒");
    /* effects.voters 生效 + tier 联动 rescale + 当选发基本盘 */
    P.G.voters = { warm: 0, diehard: 0, oppose: 0 };
    P.G.tier = 1; P.G.tierSince = P.monthSeq();
    P.applyEffects({ voters: { warm: 1000, diehard: 200 } });
    check(P.voterPools().warm === 1000, "effects.voters 应写入选民池");
    P.G.rep = 30;
    P.G.tierSince = P.monthSeq() - 60;           /* 熬够 5 年，过年限闸 */
    P.applyEffects({ tier: 1 });
    /* v0.5.4：tier+1 = 旧盘×25% + 当选新基本盘。warm = 250(旧盘带走) + 当选蜜月 */
    check(P.voterPools().warm >= 250, "tier+1 应触发选民池重算（≥带走的 25%：" + P.voterPools().warm + "）");
    /* v0.5.4：当选（升位）必须自带基本盘——「市议员选民为 0」是玩家实测 bug */
    const afterWin = P.voterPools();
    check(afterWin.diehard > 0 && afterWin.warm > 0 && afterWin.oppose > 0,
      "升位应发放当选基本盘（死忠 " + afterWin.diehard + " / 好感 " + afterWin.warm + " / 反对 " + afterWin.oppose + "）");
    check(afterWin.warm <= P.electorateSize(), "基本盘不超选区规模");
    /* 晋升进度 */
    const prog = P.promotionProgress();
    check(prog.pct >= 0 && prog.pct <= 100 && typeof prog.note === "string", "晋升进度应有 0-100 读数与提示");
    check(P.promotionProgress().ready === (P.promotionProgress().pct >= 60), "ready 应与 pct≥60 一致");
    console.log("  ok：选民池（三档人数/选区夹取/升位稀释/效果键）｜ 晋升进度（60 机会区间）");

    /* --- v0.6 选民动态：自然增减 / 事件自动增减 / 反噬判定 ---
       * 用户反馈「这套选民系统好像还没有实装」：v0.5.2 只做了数据结构与显示，
       *   除了少数写死 effects.voters 的事件，选民永远静止。这里锁住新加的三件事。 */
    check(typeof P.voterTargets === "function" && typeof P.voterDrift === "function" &&
      typeof P.voterEdge === "function" && typeof P.eventVoterDelta === "function" &&
      typeof P.withEventVoters === "function",
      "选民动态 API 应存在（voterTargets/voterDrift/voterEdge/eventVoterDelta/withEventVoters）");
    const vdyn = P.balance().voterDynamic || {};
    check(vdyn.enabled === true, "balance.voterDynamic 默认开启");

    /* ① 自然增减：从 0 起向目标收敛，且有界 */
    P.G.tier = 1;                                   /* 等级2 选区 */
    P.G.voters = { warm: 0, diehard: 0, oppose: 0 };
    P.G.rep = 30; P.G.track = "electoral";
    const vd0 = P.balance().voterDynamic || {};
    const tgt = P.voterTargets();
    const expectSize = P.balance().voterBase.electorate[1];
    const ew = Math.round(expectSize * (vd0.targetShare == null ? 0.08 : vd0.targetShare));
    const ed = Math.round(expectSize * (vd0.diehardTargetShare == null ? 0.02 : vd0.diehardTargetShare));
    const eo = Math.round(expectSize * (vd0.opposeTargetShare == null ? 0.04 : vd0.opposeTargetShare));
    check(tgt.size === expectSize && tgt.warm === ew && tgt.diehard === ed && tgt.oppose === eo,
      "等级2 目标基本盘按选区规模算（" + tgt.warm + "/" + tgt.diehard + "/" + tgt.oppose + " ｜ 选区 " + expectSize + "）");
    const d0 = P.voterDrift();
    check(!!d0 && d0.warm > 0 && d0.oppose > 0, "首个平静月：好感与反对同时净增（在任就会攒名声也攒怨气）");
    for (let i = 0; i < 400; i++) P.voterDrift();
    const vp0 = P.voterPools();
    check(Math.abs(vp0.warm - tgt.warm) <= tgt.warm * 0.15,
      "长期收敛到目标附近（warm " + vp0.warm + " ≈ " + tgt.warm + "）—— 挂机不会满池");
    check(vp0.warm + vp0.diehard + vp0.oppose <= tgt.size, "三档之和不超过选区规模（有界）");
    P.G.voters = { warm: 20000, diehard: 4000, oppose: 2000 };
    for (let i = 0; i < 24; i++) P.voterDrift();
    check(P.voterPools().warm < 20000,
      "高于目标的超额支持会随时间回落（20000 → " + P.voterPools().warm + "）—— 注意力要续费");

    /* ② 事件成败 → 选民自动增减 */
    P.G.tier = 1; P.G.voters = { warm: 4800, diehard: 1200, oppose: 2400 }; P.G.__curGrade = "major";
    const evX = { id: "vtest", category: "political" };
    const dC = P.eventVoterDelta(evX, {}, { effects: { rep: 5 } }, "crit");
    const dF = P.eventVoterDelta(evX, {}, { effects: { rep: -5 } }, "fail");
    const dCF = P.eventVoterDelta(evX, {}, { effects: { rep: -8 } }, "critfail");
    check(!!dC && dC.warm > 0 && dC.oppose > 0, "大成功：好感↑ 反对↑（" + JSON.stringify(dC) + "）");
    check(!!dF && dF.warm < 0 && dF.oppose > 0, "失败：好感↓ 反对↑（" + JSON.stringify(dF) + "）");
    check(dCF.oppose > dF.oppose, "大失败的反对者涨得比失败多（" + dCF.oppose + " > " + dF.oppose + "）—— 骂声传得远");
    check(P.eventVoterDelta(evX, {}, { effects: { voters: { warm: 999 } } }, "crit") === null,
      "内容显式写 voters 时不再自动附加（作者说了算）");
    check(P.eventVoterDelta(evX, {}, { effects: { tier: 1 } }, "crit") === null,
      "升位类事件不自动附加（当选基本盘单独发，避免重复计一次）");
    const evRom = { id: "vrom", category: "romance" };
    const dRom = P.eventVoterDelta(evRom, {}, { effects: { rep: 5 } }, "crit");
    check(!dRom || !dRom.warm || Math.abs(dRom.warm) < Math.abs(dC.warm),
      "恋爱类事件对选民影响远小于政治类（类型系数生效）");
    const merged2 = P.withEventVoters({ rep: 3 }, evX, {}, { effects: { rep: 5 } }, "crit");
    check(!!merged2.voters && merged2.rep === 3, "withEventVoters 合并选民增减且保留原有其他效果");

    /* ③ 反噬：均衡态修正为 0、有界、单调 */
    const tEq = P.voterTargets();
    P.G.voters = { warm: tEq.warm, diehard: tEq.diehard, oppose: tEq.oppose };
    const esMid = P.electionStrength().pct, eMid2 = P.voterEdge();
    check(Math.abs(eMid2) < 1e-9,
      "自然均衡态（pct=" + esMid + "%）选民修正正好为 0 —— 不推翻既有 300 局平衡");
    P.G.voters = { warm: 0, diehard: 0, oppose: 0 };
    const eLo2 = P.voterEdge();
    P.G.voters = { warm: 30000, diehard: 12000, oppose: 500 };
    const eHi2 = P.voterEdge();
    check(eLo2 < 0 && eHi2 > 0 && eLo2 >= -1 && eHi2 <= 1,
      "选民修正有界且单调（" + eLo2.toFixed(2) + " .. " + eHi2.toFixed(2) + "）");
    const contestC = { base: 0.5, outcomes: { ok: { effects: { tier: 1 } } } };
    check(P.isContestChoice(contestC) === true, "能识别晋升/连任类选项（成功档含 tier+1）");
    check(P.isContestChoice({ base: 0.5, outcomes: { ok: { effects: { rep: 5 } } } }) === false,
      "普通事件不被误判为晋升类");
    P.G.voters = { warm: 30000, diehard: 12000, oppose: 500 };
    /* 整次判定都在中文措辞下算：breakdown 的 label 是玩家可见串，
       只包断言会把已经渲染成英文的 label 拿出来比中文。胜算数值与语言无关。 */
    const pHi2 = ZH(() => P.computeP(contestC));
    P.G.voters = { warm: 0, diehard: 0, oppose: 0 };
    const pLo2 = P.computeP(contestC);
    check(pHi2.P > pLo2.P,
      "票仓扎实时晋升胜算更高（" + pLo2.P.toFixed(3) + " < " + pHi2.P.toFixed(3) + "）");
    check(pHi2.breakdown.some(function (b) { return /选民底气/.test(b.label); }),
      "判定明细里出现「选民底气」一项");
    const policyC = { base: 0.5, mods: [{ src: "voters", w: 0.12 }], outcomes: { ok: { effects: { rep: 3 } } } };
    check(ZH(() => P.computeP(policyC)).breakdown.some(function (b) { return /选民底气/.test(b.label); }),
      "内容可用 mods:[{src:\"voters\"}] 显式为政策推进类选项声明选民修正");

    /* ④ 每月的账要报出选民变化（否则玩家看不见"我什么都没干，但选民在动"）。
       v0.9：选区选民的自然增减已从静好成长（vignetteGrowth）搬到 monthlyLedger ——
       现在有事/无事每月都动，所以断言改在 monthlyLedger 与其显示栏上。 */
    P.G.tier = 1; P.G.voters = { warm: 0, diehard: 0, oppose: 0 }; P.G.rep = 30;
    P.G.year = 2010; P.G.ledgerYear = 2010; P.G.ledger = {};
    const mrec = P.monthlyLedger(7);
    check(!!mrec && !!mrec.voters && Object.keys(mrec.voters).length > 0, "每月的账里含选民变化（monthlyLedger.voters）");
    check(ZH(() => P.ledgerBoxHTML([mrec])).indexOf("选民") >= 0, "结算栏会报出选民变化（好感/反对在动）");
    /* 反向锁：vignetteGrowth 不再重复结选民（已搬走，避免双算） */
    P.G.voters = { warm: 0, diehard: 0, oppose: 0 };
    check(!P.vignetteGrowth(3).tally.voters || Object.keys(P.vignetteGrowth(3).tally.voters).length === 0,
      "静好成长不再重复结选民（voterDrift 已归 monthlyLedger 单点）");
    console.log("  ok：选民动态（自然增减有界/事件自动增减/显式优先/底气修正中心归零）");
  }

  /* --- 事件经济（v0.5.2）：投入≥$50k 的选项，ok 档要么回本 30%+，要么拿非钱资产，要么按比例（funMul） ---
     * 用户实测投诉：押上 700k 只赢回 15k。消费型支出（买广告/律师）回 rep/派系是合理的；
     * 投资型支出必须吃得到倍数。 */
  {
    const badEcon = [];
    /* dyn 卡：断言作用于「按 T2 基准折算后的绝对金额」——系数写的 $50k 份量
       展开后若仍够到高投入线，就必须遵守同样的回报规矩。 */
    const Gx = P.G, saveX = { tier: Gx.tier, attr: Gx.attr, track: Gx.track };
    const chkEconChoice = function (evId, ch) {
      const cost = (ch.cost && ch.cost.fun) || 0;
      if (cost < 50000) return;
      const okFx = ((ch.outcomes || {}).ok || {}).effects || {};
      const okFun = okFx.fun || 0;
      /* 资产的口径：钱性资产（把柄/层级/比例回报）或看得见的无形回报
         （声望≥5 / 派系净变动≥5 / 新人脉 / 状态标记）。消费型支出（买广告、
         请律师、压稿）回的是这些——合法；两个都没有才是真的"花钱打水漂"。 */
      const facSum = okFx.fac ? Object.keys(okFx.fac).reduce(function (a, k) { return a + Math.abs(okFx.fac[k]); }, 0) : 0;
      const asset = okFx.lev != null || okFx.tier != null || okFx.funMul != null ||
        (okFx.contact && Object.keys(okFx.contact).length > 0) ||
        (okFx.flags || []).length > 0 ||
        (okFx.rep || 0) >= 5 || facSum >= 5;
      if (!asset && okFun < cost * 0.3) badEcon.push(evId + "/" + ch.id + "（$" + (cost / 1000) + "k 投入，ok 档只回 $" + (okFun / 1000) + "k）");
    };
    P.events.forEach(function (ev) {
      const rv = ev.dyn ? P.realize(ev) : ev;
      (rv.choices || []).forEach(function (ch) { chkEconChoice(rv.id, ch); });
    });
    Gx.tier = saveX.tier; Gx.attr = saveX.attr; Gx.track = saveX.track;
    check(!badEcon.length, "高投入（≥$50k）选项的 ok 档回报不足或无资产：" + badEcon.join("、"));
    /* funMul 数值合法：投资型倍数在 [-1, +3]（-1=全亏，+3=翻三倍封顶） */
    const badMul = [];
    P.events.forEach(function (ev) {
      (ev.choices || []).forEach(function (ch) {
        ["crit", "ok", "meh", "fail", "critfail"].forEach(function (t) {
          const fx = ((ch.outcomes || {})[t] || {}).effects || {};
          if (fx.funMul != null && !(fx.funMul >= -1 && fx.funMul <= 3)) badMul.push(ev.id + "/" + ch.id + "@" + t + "=" + fx.funMul);
        });
      });
    });
    check(!badMul.length, "funMul 超出 [-1,+3] 合理区间：" + badMul.join("、"));
    /* v0.12 本金声明闸：funMul 必须有本金可乘（cost.fun 或入场费 req.fun）。
       旧语义"没本金按总余额乘"已被引擎废除（家底 $1M 点一下变 $2.2M 的漏洞），
       漏写的卡片现在结算时空转——这里在内容期就把它揪出来。 */
    const noPrincipal = [];
    P.events.forEach(function (ev) {
      const rv = ev.dyn ? P.realize(ev) : ev;
      (rv.choices || []).forEach(function (ch) {
        const hasMul = ["crit", "ok", "meh", "fail", "critfail"].some(function (t) {
          return (((ch.outcomes || {})[t] || {}).effects || {}).funMul != null;
        });
        if (!hasMul) return;
        const principal = Math.abs((ch.cost && ch.cost.fun) || 0) || Math.abs((ch.req && ch.req.fun) || 0);
        if (!principal) noPrincipal.push(ev.id + "/" + ch.id);
      });
    });
    check(!noPrincipal.length, "funMul 选项没有任何本金声明（cost.fun / req.fun 都没有）：" + noPrincipal.join("、"));
    const mulCount = P.events.reduce(function (a, ev) {
      return a + (ev.choices || []).reduce(function (b, ch) {
        return b + ["crit", "ok", "meh", "fail", "critfail"].filter(function (t) {
          return (((ch.outcomes || {})[t] || {}).effects || {}).funMul != null;
        }).length;
      }, 0);
    }, 0);
    console.log("  按比例资金档（funMul）" + mulCount + " 处 ｜ 高投入选项经济断言通过");
  }

  /* --- 选项说明（note）：可选字段，写了必须是字符串 --- */
  const badNote = [];
  P.events.forEach(function (ev) {
    (ev.choices || []).forEach(function (ch) {
      if (ch.note != null && typeof ch.note !== "string") badNote.push(ev.id + "/" + ch.id);
    });
  });
  check(!badNote.length, "选项 note 必须是字符串：" + badNote.join("、"));
  const noteCount = P.events.reduce(function (a, ev) { return a + (ev.choices || []).filter(function (c) { return c.note; }).length; }, 0);
  console.log("  州 " + states.length + " 个 ｜ 州联动事件 " + evWithState.length + " ｜ 带 note 的选项 " + noteCount + " 个 ｜ 年终随笔素材 " + K(P.reg.yeartale).length + " 条");
  console.log("  ok：州注册/引用/顺风逆风 ｜ 掷骰范围/自由点/上限 ｜ VIP 一码一用 ｜ 下野降级+保护期+东山再起 ｜ 收益翻译 ｜ 年终随笔全处境可拼");
}

console.log("\n" + (fail === 0 ? "=== 全部通过 ===" : "=== " + fail + " 项失败 ==="));
process.exit(fail === 0 ? 0 : 1);
