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
  const tPer = P.stakeSpec(tChoice).fun.per;      /* v0.7：每档金额是动态的，从引擎取 */
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

  /* 余额不足 → 投注被夹到可用余额 */
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
  const per = P.stakeSpec(funCh).fun.per;         /* v0.7：每档金额按 身位 × 事件钱量级 动态算 */
  console.log("  资金：每档 " + P.fmtUsd(per) + " → +4%、上限 +30%");
  P.G.fun = 999999999;
  const funMaxRich = P.stakeMax("fun", funCh);
  console.log("  资金：每档 +4%、上限 +30% → 最多 " + funMaxRich + " 档");
  check(Math.abs(funMaxRich * 0.04 - 0.30) < 0.05, "资金满档应能吃到接近 +30% 的上限，实际 +" + (funMaxRich * 0.04 * 100).toFixed(0) + "%");
  check(P.stakeInfo(funCh, { fun: 999 }).cost.fun <= funMaxRich * per, "资金扣款不该超过上限允许的档数");

  /* 余额是第二道闸：钱只够 5 档时就该被夹到 5 档 */
  P.G.fun = per * 5;
  check(P.stakeMax("fun", funCh) === 5, "钱只够 5 档时应被余额夹到 5，实际 " + P.stakeMax("fun", funCh));
  check(P.stakeInfo(funCh, { fun: 5 }).cost.fun === per * 5, "扣款应等于档数×汇率");

  /* 一档都投不起 → 上限必须是 0（界面据此把 ＋ 置灰并说明原因，而不是"点了没反应"） */
  P.G.fun = per - 1; P.G.fav = 0;
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

/* ---------- 动态投注汇率（v0.7） ----------
 * 用户实测反馈的 bug：过去每档固定 $250k，于是
 *   ① 社区小兵（T0 月薪 $1k、家底 $10k）永远投不进第一档 —— 资金这一栏形同虚设；
 *   ② "收益只有 $50k 的事件让你花 $250k 搏" —— 价码与事情的钱量级脱钩。
 * 现在 per = min(√(身位锚 × 事件锚), 事件锚)，身位锚 = 职位月薪 × 3 × gradeMul，
 * 事件锚 = 事件钱量级 × 0.25（同时是总投入硬顶：8 档 ≤ 2× 事件钱量级）。 */
console.log("\n== 动态投注汇率（身位 × 事件金额）==");
{
  P.CSEL = { era: firstEra, origin: firstOrigin, talent: firstTalent, entry: firstEntry, party: firstParty, stance: firstStance, name: "汇率测试" };
  P.confirmCreate();
  const CL = (cost, oc) => ({ id: "__r", text: "t", base: 0.4, cost: cost, stake: { fun: true }, outcomes: oc || {} });
  const smallCh = CL({ fun: 400000 });                       // 有钱量级
  const nomoneyCh = CL({ rep: 1 });                           // 没有钱量级
  const tinyCh = CL({ rep: 1 }, { ok: { effects: { fun: 50000 } } });

  /* ① 身位轴：同一个选项，职位越高每档越贵 */
  const byTier = [];
  for (let t = 0; t <= P.balance().tierMax; t++) {
    P.G.tier = t; P.G.track = "electoral";
    byTier.push(P.stakeFunPer(smallCh).per);
  }
  console.log("  同一个选项各身位每档价码：" + byTier.map((v, i) => "T" + i + " " + P.fmtUsd(v)).join(" / "));
  check(byTier.every((v, i) => i === 0 || v >= byTier[i - 1]), "每档金额必须随身位单调不降");
  check(byTier[byTier.length - 1] > byTier[0], "最高身位的价码必须显著高于最低身位（" + P.fmtUsd(byTier[0]) + " → " + P.fmtUsd(byTier[byTier.length - 1]) + "）");
  check(P.stakeSpec(smallCh).fun.per === byTier[P.G.tier], "stakeSpec 必须把动态价码写进 spec.fun.per");

  /* ② 事件轴：事件的钱量级越大，每档越贵 */
  P.G.tier = 3; P.G.track = "electoral";
  const perOf = (c) => P.stakeFunPer(c).per;
  check(perOf(tinyCh) < perOf(smallCh), "事件钱量级越大，每档应越贵（" + P.fmtUsd(perOf(tinyCh)) + " < " + P.fmtUsd(perOf(smallCh)) + "）");
  check(perOf(nomoneyCh) > 0, "没写钱的选项也必须给出价码（退回身位锚）");
  check(P.stakePot(nomoneyCh) === 0 && P.stakePot(smallCh) === 400000, "stakePot 应认出选项的钱量级");
  check(P.stakePot(CL({ fun: 30000 }, { ok: { effects: { funMul: 2 } } })) === 60000, "funMul 应折算回美元（$30k × 2.0 = $60k）");

  /* ③ 硬顶：8 档总投入 ≤ 2 × 事件钱量级 —— 杜绝"花 $250k 搏 $50k" */
  let worstRatio = 0;
  for (const c of [tinyCh, smallCh, CL({ fun: 2000000 })]) {
    for (const t of [0, 3, P.balance().tierMax]) {
      P.G.tier = t; P.G.track = "wealth";
      const pot = P.stakePot(c), per = P.stakeFunPer(c).per;
      worstRatio = Math.max(worstRatio, per * 8 / pot);
    }
  }
  console.log("  8 档总投入 ÷ 事件钱量级 的最坏比值：" + worstRatio.toFixed(2) + "×");
  check(worstRatio <= 2 + 1e-9, "8 档总投入永远不得超过事件钱量级的 2 倍，实际 " + worstRatio.toFixed(2) + "×");

  /* ④ 用户报的核心 bug 已修：小兵也投得起第一档 */
  P.G.tier = 0; P.G.track = "electoral"; P.G.fun = 10000;    // 开局家底
  check(P.stakeMax("fun", nomoneyCh) >= 1, "T0 家底 $10k 至少要投得起 1 档（旧版恒为 0）");
  P.G.fun = 3000;
  check(P.stakeMax("fun", CL({ fun: 14000 })) >= 0, "极小钱量级的事件不该报错");

  /* ⑤ 内容写死 per 时以内容为准（不参与动态换算） */
  const fixedCh = { id: "__f", text: "t", base: 0.4, cost: { fun: 400000 }, stake: { fun: { per: 777000, w: 0.05, cap: 0.25 } }, outcomes: {} };
  const fixedSpec = P.stakeSpec(fixedCh);
  check(fixedSpec.fun.per === 777000, "写死的 per 必须原样保留，实际 " + fixedSpec.fun.per);
  check(fixedSpec.fun.__rate.source === "content", "写死 per 的汇率来源应标为 content");

  /* ⑥ 抹零与边界：每档金额是好读的整数，且仍落在事件锚之下 */
  P.G.tier = 2;
  const rp = P.stakeFunPer(smallCh);
  check(rp.per % 500 === 0, "每档金额应是 500 的整数倍（" + rp.per + "）");
  check(rp.per >= (P.balance().stakeRates.fun.perMin) && rp.per <= P.balance().stakeRates.fun.perMax, "每档金额应落在 [perMin, perMax] 内");
  check(rp.per <= rp.ceiling + 1e-9, "抹零不得把价码抬到事件锚之上");

  /* ⑦ 界面文案必须说得清价码来源（动态汇率不能是新的黑箱） */
  const note = ZH(() => P.stakeRateNote(smallCh, "mid"));
  check(note.indexOf("月薪") >= 0 && note.indexOf("钱量级") >= 0, "汇率说明应同时交代身位与事件金额：" + note);
  check(ZH(() => P.stakeRateNote(nomoneyCh, "mid")).indexOf("没写钱") >= 0, "没写钱的事件应说明『只按身位算』");
  check(ZH(() => P.stakeRateNote(fixedCh, "mid")).indexOf("剧情写定") >= 0, "写死 per 的事件应说明『价码由剧情写定』");
  check(P.fmtUsd(400) === "$400" && P.fmtUsd(250000) === "$250k" && P.fmtUsd(1500000) === "$1.5M",
    "金额格式化：$400 / $250k / $1.5M，实际 " + [400, 250000, 1500000].map(P.fmtUsd).join(" / "));

  /* ⑧ 工资与投注同源：officeSalary 是唯一口径 */
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
    P.G.debt = 0; P.G.loanLate = 0;
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
for (let r = 0; r < games; r++) {
  let runCur = 0, runWorst = 0, demoTier = null;
  try {
    P.CSEL = { era: eras[r % eras.length], origin: origins[r % origins.length], talent: talents[r % talents.length], entry: entries[r % entries.length], party: parties[r % parties.length], stance: stances[r % stances.length], name: "N" + r };
    P.confirmCreate();
    const G = P.G, b = P.balance();
    let done = false;
    for (let y = 0; y < 55 && !done; y++) {
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
        if (r !== "event") continue;          /* 平静月：成长已在 settleQuietMonth 结掉 */
        months++;
        const _mset = new Set();                 // 本月已出现的真实卡 id —— 侦测「同月重复」回归
        for (let i = 0; i < G.monthPlan.length && !done; i++) {
          const slot = G.monthPlan[i];
          const ev = P.drawEvent(slot);
          if (!ev || !ev.choices || !ev.choices.length) throw new Error("drawEvent 返回空事件");
          draws++; yearSlots++;
          if (!ev.filler) { if (_mset.has(ev.id)) monthRepeat++; else _mset.add(ev.id); }
          gradeHit[P.gradeOf(ev)] = (gradeHit[P.gradeOf(ev)] || 0) + 1;
          if (ev.filler) fillers++;
          catHit[ev.category || "—"] = (catHit[ev.category || "—"] || 0) + 1;
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
    if (P.G.hp > 0) { const rule = P.evaluateEnding("retire"); endings[rule.id] = (endings[rule.id] || 0) + 1; }
    tiers["T" + P.G.tier] = (tiers["T" + P.G.tier] || 0) + 1;
    if (demoTier == null) demoTier = P.G.tier;          // 8 年内就出局（死亡）→ 用终局层级
    demoTiers["T" + demoTier] = (demoTiers["T" + demoTier] || 0) + 1;
    /* 单局体验收尾：连环崩盘 / 下野经历 / 终局家底 */
    if (runWorst >= 4) streakBadGames++;
    if ((P.G.fallenCount || 0) > 0) fallenGames++;
    endFun += P.G.fun || 0;
  } catch (e) { errs.push(e.message); if (errs.length > 5) break; }
}
const avgSlots = slotsPerYear.reduce((a, b) => a + b, 0) / Math.max(1, slotsPerYear.length);
Math.random = _realRandom;                       // 模拟结束，恢复真随机（不影响后续任何东西）
return {
  tiers: tiers, demoTiers: demoTiers, endings: endings, errs: errs, draws: draws, games: games_, fillers: fillers, gradeHit: gradeHit,
  stakeEvents: stakeEvents, stakeFunSpent: stakeFunSpent, stakeFunTiers: stakeFunTiers,
  monthHist: monthHist, catHit: catHit, medHit: medHit, dateDrift: dateDrift,
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
console.log("  每年档期 平均 " + avgSlots.toFixed(1) + " 个 ｜ 每年有事发生的月数分布 " + JSON.stringify(monthHist));
console.log("  每局平均事件 " + (draws / Math.max(1, games)).toFixed(0) + " 个 ｜ 量级 " + JSON.stringify(gradeHit) +
  " ｜ 填充 " + (fillers / Math.max(1, draws) * 100).toFixed(1) + "%" +
  " ｜ 月份降级 " + (dateDrift / Math.max(1, draws) * 100).toFixed(1) + "%");
console.log("  类型分布: " + JSON.stringify(catHit));
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
check(thinSample || avgSlots <= 12, "每年档期数均值应 ≤12（当前 " + avgSlots.toFixed(1) + "）——超出说明月度节奏失调");
check(draws / Math.max(1, games) >= 20, "每局平均事件数过少（" + (draws / Math.max(1, games)).toFixed(1) + "），月度节奏没生效");
check(thinSample || gradeHit.major > 0, "模拟中从未出现大事件");
check(fillers / Math.max(1, draws) < 0.3, "填充事件占比过高，说明事件池太薄：" + (fillers / Math.max(1, draws) * 100).toFixed(1) + "%");
check(medHit.gated === 0, "模拟中出现了媒介门控失效的事件：" + medHit.gated);
check(Object.keys(catHit).length >= 5, "事件类型过于单一，只有 " + Object.keys(catHit).length + " 种");
check(eraSpecific / Math.max(1, draws) >= 0.15,
  "时代专属事件占比过低（" + (eraSpecific / Math.max(1, draws) * 100).toFixed(1) + "%）——通用事件淹没了时代内容，考虑调高 eraWeightMul 或给该时代加内容");
check(vigCount > 0, "模拟里一段「静好岁月」都没结算——平静月的成长/叙事路径没被走到");
check(vigEmpty === 0, "有 " + vigEmpty + " 段随笔抽不出文字（素材库在某种状态下缺槽位）");

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
    P.G.era = "2008_CRASH";
    P.G.tier = 3; P.G.lev = 0; P.G.doneIds = []; P.recentIds = []; P.G.flags = []; P.G.contacts = { columnist: 10 };
    P.G.year = 2010; P.G.month = 6; P.G.doneSeq = {};
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
    P.G.era = "__T";                                 // 还原，后面的合成事件都挂在 __T 下
  }

  /* --- 续集加权：已解锁的续集必须明显更容易被抽到 ---
   * 这是"一条故事线能不能被玩家看见"的关键。做法是拿两个权重相同的
   * 合成事件对抽 2000 次，看续集的胜率是否接近 chainWeightMul/(chainWeightMul+1)。 */
  const mkEv = function (id, after) {
    const e = { id: id, era: ["__T"], tierMin: 0, tierMax: 5, weight: 1, grade: "mid", category: "general", title: id, body: id };
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
         否则同月去重硬闸（_monthSeen）会把已抽中的续集在本月内永久排除，胜率失真。 */
      P._monthSeen = []; P._monthKey = null;
      const picked = P.drawEvent({ grade: "mid" });
      if (picked.id === "__chain_next") next++; else if (picked.id === "__chain_plain") plain++;
    }
    const rate = next / Math.max(1, next + plain);
    const want = b.chainWeightMul / (b.chainWeightMul + 1);
    console.log("  续集加权：抽取 " + (next + plain) + " 次里续集占 " + (rate * 100).toFixed(1) +
      "%（权重倍数 " + b.chainWeightMul + " → 理论 " + (want * 100).toFixed(1) + "%）");
    check(Math.abs(rate - want) < 0.08, "已解锁的续集应被 chainWeightMul 明显加权（实测 " + (rate * 100).toFixed(1) + "% vs 理论 " + (want * 100).toFixed(1) + "%）");
  }

  /* --- 在位时长（minTenure）：晋升要熬够月份 --- */
  const badTenure = P.events.filter(function (e) { return e.minTenure != null && !(Number.isInteger(e.minTenure) && e.minTenure >= 0); });
  check(!badTenure.length, "minTenure 必须是非负整数：" + badTenure.map(function (e) { return e.id; }).join("、"));
  const progGate = P.events.filter(function (e) { return e.id.indexOf("prog_") === 0; });
  check(progGate.length && progGate.every(function (e) { return e.minTenure != null; }),
    "所有晋升事件（prog_*）都应声明 minTenure —— 否则十年就能爬到顶，一局太短");
  P.define("event", [{ id: "__tenure", era: ["__T"], tierMin: 0, tierMax: 5, weight: 1, grade: "minor", minTenure: 12, title: "t", body: "t" }]);
  const tv = P.events.find(function (e) { return e.id === "__tenure"; });
  P.G.tierSince = P.monthSeq();
  check(P.monthsAtTier() === 0 && !P.eligible(tv), "刚晋级时，要求在位 12 个月的事件不该可触发");
  P.G.tierSince = P.monthSeq() - 12;
  check(P.monthsAtTier() === 12, "monthsAtTier 应为 12，实际 " + P.monthsAtTier());
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
  {
    const bStart = P.balance();
    check(bStart.startFun <= 20000, "基础盘资金应压在 $20k 以内（刚毕业的穷小子），当前 $" + bStart.startFun);
    check(bStart.startRep === 0, "基础盘声望应为 0（声望由出身/起点加出来），当前 " + bStart.startRep);
    const combos = [];
    for (const o in P.reg.origin) for (const e in P.reg.entry) {
      P.CSEL = { era: K(P.reg.era)[0], origin: o, talent: K(P.reg.talent)[0], entry: e, party: K(P.reg.party)[0], stance: K(P.reg.stance)[0], state: states[0], name: "平衡测试", rolled: { CHA: 45, INT: 45, CUN: 45, INTG: 45 }, spent: {}, rerolled: {}, freeExtra: 0 };
      P.confirmCreate();
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

  /* --- 掷骰建角：范围 / 自由点 / 上限 --- */
  const b5 = P.balance();
  const rr = b5.rollAttrs || {};
  check(rr.min != null && rr.max != null && rr.min < rr.max, "rollAttrs.min/max 必须配置且 min<max");
  check(typeof b5.freePoints === "number" && b5.freePoints >= 0 && b5.freePoints <= 30, "freePoints 应在 0-30（合理的初始自由点）：" + b5.freePoints);
  check(typeof b5.freeCapPerAttr === "number" && b5.freeCapPerAttr >= 1 && b5.freeCapPerAttr <= 30, "freeCapPerAttr 应为 1-30：" + b5.freeCapPerAttr);
  /* rollAttrs() 的产出在范围内 */
  P.startCreate();
  P.rollAttrs();
  ["CHA", "INT", "CUN", "INTG"].forEach(function (k) {
    const v = P.CSEL.rolled[k];
    check(v >= rr.min && v <= rr.max, "掷出的 " + k + " 应在 [" + rr.min + "," + rr.max + "]：" + v);
  });
  /* 加点：狂点 ＋ 不超总额；VIP 追加后不超单属性上限；减点不为负（spendAttr 是步进 API） */
  const total5 = b5.freePoints;
  const cap5 = b5.freeCapPerAttr;
  for (let i = 0; i < 99; i++) P.spendAttr("CHA", 1);
  check(P.CSEL.spent.CHA === total5, "加点总额应被 freePoints 夹住（" + total5 + "），实际 " + P.CSEL.spent.CHA);
  /* 模拟 VIP 加点后：单属性上限生效 */
  P.CSEL.freeExtra = cap5 + 10;
  P.CSEL.spent = {};
  for (let i = 0; i < 99; i++) P.spendAttr("INT", 1);
  check(P.CSEL.spent.INT === cap5, "加点应被单属性上限夹住（" + cap5 + "），实际 " + P.CSEL.spent.INT);
  const used5 = ["CHA", "INT", "CUN", "INTG"].reduce(function (a, x) { return a + (P.CSEL.spent[x] || 0); }, 0);
  check(used5 <= total5 + cap5 + 10, "加点总额不应超过 含VIP 的总点数");
  for (let i = 0; i < 99; i++) P.spendAttr("INT", -1);
  check(P.CSEL.spent.INT >= 0, "减点不应为负");
  P.CSEL.freeExtra = 0;
  /* confirmCreate 吃掷骰结果 */
  P.CSEL = { era: K(P.reg.era)[0], origin: K(P.reg.origin)[0], talent: K(P.reg.talent)[0], entry: K(P.reg.entry)[0], party: K(P.reg.party)[0], stance: K(P.reg.stance)[0], state: states[0], name: "掷骰测试", rolled: { CHA: 50, INT: 40, CUN: 45, INTG: 55 }, spent: { CHA: 5 }, rerolled: {}, freeExtra: 0 };
  P.confirmCreate();
  check(P.G.attr.CHA === 55 && P.G.attr.INTG === 55, "confirmCreate 应采用 掷骰+加点 的属性（CHA " + P.G.attr.CHA + " / INTG " + P.G.attr.INTG + "）");
  check(P.G.state === states[0], "confirmCreate 应记住出生州");
  const stDef = P.reg.state[states[0]];
  const wind = P.stateWindFor(states[0], K(P.reg.party)[0]);
  if (wind > 0) check(P.G.faction.establishment > 0, "顺风州开局应给建制派加成");
  if (wind < 0) check(P.G.faction.base > 0, "逆风州开局应给基层加成（少数派的同情）");

  /* --- VIP 码：码表合法 + 一码一用 --- */
  const codes = b5.vipCodes || {};
  check(Object.keys(codes).length >= 3, "VIP 码表至少 3 个测试码");
  for (const c in codes) check(typeof codes[c] === "number" && codes[c] > 0 && codes[c] <= 100, "VIP 码 " + c + " 的点数应为 1-100：" + codes[c]);
  const firstCode = Object.keys(codes)[0];
  localStorage.removeItem("potus_vip_used");
  check(P.vipActivate(firstCode) === null, "码应激活成功");
  /* v0.5.2 起测试阶段无限用：同一个码可以反复激活（正式运营前把 vipInfinite 置 false） */
  check(P.vipInfinite === true && P.vipActivate(firstCode) === null, "测试阶段同一个码可无限重复使用");
  P.vipInfinite = false;
  P.vipActivate(firstCode);                                   // 消耗掉这个码
  check(P.vipActivate(firstCode) !== null, "关掉无限用后，同一个码第二次激活应被拒绝（正式运营的行为）");
  check(P.vipActivate("NO_SUCH_CODE") !== null, "不存在的码应报错");
  check(P.vipActivate("") !== null, "空码应报错");
  P.vipInfinite = true;

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
  /* 结局规则：disgrace / 东山再起 / 从谷底收场 都已注册 */
  check(P.reg.ending.some(function (r) { return r.id === "disgrace"; }), "结局规则应注册 disgrace（身败名裂）");
  check(P.reg.ending.some(function (r) { return r.id === "retire_comeback"; }), "结局规则应注册 retire_comeback（东山再起）");
  /* 东山再起的门槛：fallen 且 tier>=3 —— 优先级高于普通 retire */
  /* 东山再起的门槛（旧档 tier>=3）经 when.js tierBand 抬进新空间；测试要站在映射后的真实档位上 */
  P.G.flags = ["fallen"]; P.G.tier = P.tierBand(3); P.G.endingReason = "retire";
  const comeback = P.evaluateEnding("retire");
  check(comeback.id === "retire_comeback", "下野后爬回 T3 的退休结局应是东山再起（实际 " + comeback.id + "）");

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
