/* ============================================================================
 * POTUS · tools/migrate-scale.js
 * 一次性迁移辅助脚本：为全库事件生成「dyn 系数草稿 + 三值性预判」。
 *
 * 用法：
 *   node tools/migrate-scale.js                 → 全部文件，只出草稿
 *   node tools/migrate-scale.js 100-era         → 只报告文件名含该串的文件
 *   node tools/migrate-scale.js 100-era --write → 就地改写该批文件（git 可回滚）
 * 输出：tools/out/scale-draft.txt（人读草稿，改内容时逐卡审查用；不是产物）
 *
 * --write 的就地改写规则（保守、可重复运行）：
 *   只在「事件区域」（事件 id 到下一个事件 id 之间）内动手，不碰文件头/尾部 define；
 *   缩放 rep/hp/fun 的 ≥1 整数字面量（已在 0.x 系数态的跳过；lev/fav/ap 不自动处
 *   理——小整数既是绝对值也是常见系数，需人工判断）；mods 的 res.fun 门槛 min 同步缩放；
 *   已有 dyn/valence 的事件整卡跳过（人工优先）；在 era: 行前插 valence+dyn。
 *
 * 方法：
 *   系数草稿 = 旧绝对值 ÷ T2 基准标尺（P.ruler：tier=2、全属性 50），
 *   再吸附到易读刻度（≤1 走 0.1 步进、≤3 走 0.25、更大走 0.5）。
 *   1.0 语义 = "T2 基准人物在该量级的标准份量" → 吸附后 T2 体验近似不变。
 *   valence 预判（按每选项五档净值）：
 *     boon  = 存在正收益档 且 全部档净值 ≥ -0.05
 *     bane  = 存在净损档（≤ -0.3）且某选项 crit 净值 ≥ 0.15（有翻盘路）
 *     risk  = 其余（含"有规避路 + 有搏"的双选结构）
 *   预判只是草稿 —— 叙事意图最终以人工审查为准。
 * ==========================================================================*/
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");

/* ---------- 宿主环境 stub（与 validate.js 同款） ---------- */
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
global.getComputedStyle = () => ({ getPropertyValue: () => "" });
global.alert = () => { }; global.confirm = () => true; global.prompt = () => "x";
global.setTimeout = () => 0; global.setInterval = () => 1; global.clearInterval = () => { };
global.URL = { createObjectURL: () => "", revokeObjectURL: () => { } };
global.Blob = function () { }; global.FileReader = function () { };
global.window = global;

/* ---------- 加载引擎 + 内容（与运行时同一份清单） ---------- */
const htmlRaw = fs.readFileSync(INDEX, "utf8");
const html = htmlRaw.replace(/<!--[\s\S]*?-->/g, "");
const srcs = [...html.matchAll(/<script\s+src="([^"]+)"><\/script>/g)].map(m => m[1]);
const code = srcs.map(s => fs.readFileSync(path.join(ROOT, s), "utf8")).join("\n;\n");
const P = new Function(code + "\n;POTUS.boot();\n;return POTUS;")();

/* 事件 → 源文件（报告按文件分组，方便分批审查） */
const fileOf = {};
for (const s of srcs) {
  if (s.indexOf("content/") !== 0) continue;
  const txt = fs.readFileSync(path.join(ROOT, s), "utf8");
  for (const ev of P.events) {
    if (fileOf[ev.id]) continue;
    const hit = new RegExp('"?id"?\\s*:\\s*"' + ev.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + '"').test(txt);
    if (hit) fileOf[ev.id] = s;
  }
}

/* ---------- T2 基准世界 ---------- */
const firstEra = Object.keys(P.reg.era)[0];
P.CSEL = { era: firstEra, origin: Object.keys(P.reg.origin)[0], talent: Object.keys(P.reg.talent)[0], entry: Object.keys(P.reg.entry)[0], party: Object.keys(P.reg.party)[0], stance: Object.keys(P.reg.stance)[0], name: "迁移" };
P.confirmCreate();
const G = P.G;
G.tier = 2; G.track = "electoral"; G.attr = { CHA: 50, INT: 50, CUN: 50, INTG: 50 };

const TIERS = ["crit", "ok", "meh", "fail", "critfail"];
const SCALE = { fun: 1, rep: 1, hp: 1, lev: 1, fav: 1, ap: 1 };
const FILTER = process.argv.slice(2).find(a => a[0] !== "-");   /* 忽略 --write/--reval 等旗标 */

/* 吸附到易读刻度 */
function snap(x) {
  const a = Math.abs(x), s = x < 0 ? -1 : 1;
  const step = a <= 1 ? 0.1 : a <= 3 ? 0.25 : 0.5;
  return +(s * Math.max(step, Math.round(a / step) * step)).toFixed(2);
}
function coef(v, unit, raw) {
  const x = v / unit;
  const n = +(v).toFixed(0);
  return snap(x) + "   (旧" + n.toLocaleString() + " → " + (n / unit).toFixed(3) + " 份)";
}

/* 净值（cost 记为负） */
function optNets(ch, grade, ruler) {
  const fake = { __ruler: ruler };
  const cost = ch.cost ? P.netScore(ch.cost, grade, fake) : 0;
  const nets = {};
  TIERS.forEach(t => {
    const o = (ch.outcomes || {})[t];
    if (o) nets[t] = P.netScore(o.effects, grade, fake) - cost;
  });
  return nets;
}

function suggestValence(ev, perOpt) {
  const all = [];
  perOpt.forEach(o => TIERS.forEach(t => { if (o.nets[t] != null) all.push(o.nets[t]); }));
  if (!all.length) return "risk";
  const worst = Math.min.apply(null, all), best = Math.max.apply(null, all);
  const hurt = all.some(n => n <= -0.3);
  const flip = perOpt.some(o => o.nets.crit != null && o.nets.crit >= 0.15);
  if (worst >= -0.05 && best >= 0.15) return "boon";
  if (hurt && flip) return "bane";
  return "risk";
}

/* ---------- 逐卡报告 ---------- */
const out = [];
const W = (s) => out.push(s);
W("== dyn 系数草稿（T2 基准标尺 · 吸附刻度 0.1/0.25/0.5）==");
W("系数语义：1.0 = T2 基准人物在该量级的标准份量。改写时：给卡加 dyn:true + valence，");
W("数值键(fun/rep/hp/lev/fav/ap)按草稿换掉；attr/fac/contact/tier/flags/funMul 等非数值键原样保留。");
W("");

let count = 0;
const byFile = {};
for (const ev of P.events) {
  const f = fileOf[ev.id] || "(未知文件)";
  (byFile[f] || (byFile[f] = [])).push(ev);
}
for (const f of Object.keys(byFile).sort()) {
  if (FILTER && f.indexOf(FILTER) < 0) continue;
  W("################ " + f + "（" + byFile[f].length + " 张） ################");
  for (const ev of byFile[f]) {
    count++;
    const grade = P.gradeOf(ev);
    const r = P.ruler(grade, ev);
    W("");
    W("── " + ev.id + " 《" + ev.title + "》 [" + grade + "]  lean:" + r.attrKey +
      "  标尺 fun=" + Math.round(r.fun).toLocaleString() + " rep=" + r.rep.toFixed(1) +
      " hp=" + r.hp.toFixed(1) + " small=" + r.small);
    const perOpt = [];
    for (const ch of ev.choices || []) {
      const nets = optNets(ch, grade, r);
      perOpt.push({ ch: ch, nets: nets });
      const parts = [];
      if (ch.cost) for (const k in ch.cost) {
        if (SCALE[k]) parts.push("cost." + k + ": " + coef(ch.cost[k], r[k === "fun" ? "fun" : k === "rep" ? "rep" : k === "hp" ? "hp" : "small"]));
        else parts.push("cost." + k + ": " + ch.cost[k] + "（不折算）");
      }
      W("   ○ " + ch.id + (parts.length ? "  " + parts.join(" ｜ ") : ""));
      W("     净值 " + TIERS.map(t => t[0] + t[1] + ":" + (nets[t] == null ? "—" : nets[t].toFixed(2))).join(" "));
    }
    /* 每个五档 effects 的换算草稿（只打印非零数值键） */
    for (const ch of ev.choices || []) {
      const lines = [];
      TIERS.forEach(function (t) {
        const fx = ((ch.outcomes || {})[t] || {}).effects || {};
        const seg = [];
        for (const k in fx) {
          if (SCALE[k] && fx[k]) {
            const unit = (k === "fun" ? r.fun : k === "rep" ? r.rep : k === "hp" ? r.hp : r.small);
            seg.push(k + ":" + coef(fx[k], unit));
          }
        }
        if (seg.length) lines.push("       " + t.padEnd(8) + ch.id + "  " + seg.join(" ｜ "));
      });
      lines.forEach(W);
    }
    W("   ▶ valence 建议: " + suggestValence(ev, perOpt));
  }
  W("");
}

W("");
W("== 共 " + count + " 张卡 ==");
const OUT_DIR = path.join(__dirname, "out");
fs.mkdirSync(OUT_DIR, { recursive: true });
const OUT = path.join(OUT_DIR, "scale-draft.txt");
fs.writeFileSync(OUT, out.join("\n") + "\n");
console.log("草稿已写入 " + OUT + "（" + count + " 张卡）");

/* ---------- --reval：按叙事意图重标三值性（只改 valence，不重缩系数） ----------
 * 自动净值启发几乎全判为 bane（旧内容清一色“带下探的赌局”）。三值性是叙事意图：
 *   bane（威胁）——事情发生在你头上、默认挨打：危机/丑闻/健康/袭击/下野/征兵。
 *   boon（机遇）——白送的好处/邀约/拨款：接受基本只“赚多赚少”。
 *   risk（中性）——其余皆抉择：可回避（引擎 realize 会补“静观其变”保底）。
 * 语义形状（boon 抹平下行 / risk 补保底）由 engine/scale.js 的 shapeByValence 强制。 */
const BANE = new Set([
  /* crisis 全量 */ "2008_crash_offer", "wave_gasline_low", "wave_detroit_high", "media_deepfake",
  "cri2_flood", "cri2_plant_closure", "cri2_plant_after", "cri2_epidemic", "cri2_grid_failure", "cri2_bank_run",
  "dep1929_crash", "ww41_pearl", "wg73_saturday", "wt01_september", "soc20_mailin",
  /* scandal 全量 */ "2008_foundation", "1960_fbi", "1974_hearings", "1974_leak", "1974_tape", "wave_leak_offer",
  "archive_get", "archive_bite", "archive_showdown", "archive_settle", "sca2_opposition_research", "sca2_leak_pod",
  "sca2_family_member", "sca2_old_receipt", "sca2_coverup_choice", "sca2_coverup_after", "mcc54_hear", "wg72_breakin",
  /* 下野 / 健康 / 袭击 / 家变 */ "setback_loss", "setback_primary_upset", "setback_party_purge", "setback_press_pile",
  "setback_health", "setback_family", "2008_affair_burn",
  /* 媒体围剿 / 黑料 */ "2008_social", "med2_dark_poster", "med2_press_enemy", "med2_press_enemy_after", "press_blackout",
  /* 钱袋见底 / 被翻旧账 */ "1974_pension", "fin2_bankruptcy", "fin2_taxreturn", "fin2_windfall_collect",
  /* 战争 / 征兵 / 监控压力 */ "wave_draft_low", "wave_draft_high", "ww42_draft", "for2_spy_contact", "wt02_alert", "wt03_wmd", "wg72_hush",
  "rg81_patco"
]);
const BOON = new Set([
  "for2_summit_invite", "gulf91_peace", "pol2_endorsement_tree",
  "car2_mentor_offer", "car2_committee_seat", "car2_cabinet_call", "car2_cabinet_after",
  "prog_appoint", "prog_star"
]);
function intentValence(id) { return BANE.has(id) ? "bane" : BOON.has(id) ? "boon" : "risk"; }

if (process.argv.includes("--reval")) {
  let rvWritten = 0;
  for (const f of Object.keys(byFile).sort()) {
    if (f === "(未知文件)" || (FILTER && f.indexOf(FILTER) < 0)) continue;
    const fp = path.join(ROOT, f);
    let txt = fs.readFileSync(fp, "utf8");
    const findDef = (t, id) => { let at = t.indexOf('id: "' + id + '"'); if (at < 0) at = t.indexOf('"id": "' + id + '"'); return at; };
    const evs = byFile[f].map(ev => ({ ev: ev, at: findDef(txt, ev.id) })).filter(x => x.at >= 0).sort((a, b) => a.at - b.at);
    const edits = [];
    for (let i = 0; i < evs.length; i++) {
      const start = evs[i].at, end = i + 1 < evs.length ? evs[i + 1].at : txt.length;
      const region = txt.slice(start, end);
      const target = intentValence(evs[i].ev.id);
      const reg2 = region.replace(/("?)valence("?)\s*:\s*("?)(boon|risk|bane)\3/g, (m0, q1, q2, qq) => q1 + "valence" + q2 + ": " + qq + target + qq);
      if (reg2 !== region) { edits.push({ start, end, text: reg2 }); rvWritten++; }
    }
    for (let i = edits.length - 1; i >= 0; i--) txt = txt.slice(0, edits[i].start) + edits[i].text + txt.slice(edits[i].end);
    if (edits.length) fs.writeFileSync(fp, txt);
  }
  console.log("--reval 完成：重标 " + rvWritten + " 张卡的 valence（意图映射：bane " + BANE.size + " ／ boon " + BOON.size + " ／ 其余 risk）。请跑 validate 验证。");
  process.exit(0);
}


/* ---------- --write：就地改写（系数控 + valence 预判） ---------- */
if (!process.argv.includes("--write")) process.exit(0);

let written = 0, skipped = 0;
for (const f of Object.keys(byFile).sort()) {
  if (f === "(未知文件)" || (FILTER && f.indexOf(FILTER) < 0)) continue;
  const fp = path.join(ROOT, f);
  let txt = fs.readFileSync(fp, "utf8");
  /* 按事件定义定位卡区（只认 `id: "xxx"` / `"id": "xxx"` 形态，避开 after: 引用） */
  const findDef = (txt, id) => {
    let at = txt.indexOf('id: "' + id + '"');
    if (at < 0) at = txt.indexOf('"id": "' + id + '"');
    return at;
  };
  const evs = byFile[f].map(ev => ({ ev: ev, at: findDef(txt, ev.id) })).filter(x => x.at >= 0).sort((a, b) => a.at - b.at);
  if (!evs.length) continue;
  const edits = [];
  for (let i = 0; i < evs.length; i++) {
    const ev = evs[i].ev;
    const start = evs[i].at;
    const end = i + 1 < evs.length ? evs[i + 1].at : txt.length;
    const region = txt.slice(start, end);
    if (/\bdyn:\s*true/.test(region)) { skipped++; continue; }   // 人工已接管的卡不碰
    const grade = P.gradeOf(ev);
    const r = P.ruler(grade, ev);
    const sc = (v, unit) => { const c = snap(v / unit); return c === 0 ? v : c; };
    /* 键可能是 JS 裸写法 `rep:` 或 JSON 写法 `"rep":` —— 用回引用 \1 让引号成对匹配 */
    const rplKey = (name, min, unit) => function (m0, q, n) {
      const v = Number(n);
      if (Math.abs(v) < min) return m0;
      return q + name + q + ": " + sc(v, unit);
    };
    let reg2 = region
      .replace(/("?)rep\1\s*:\s*(-?\d+(?:\.\d+)?)/g, rplKey("rep", 1, r.rep))
      .replace(/("?)hp\1\s*:\s*(-?\d+(?:\.\d+)?)/g, rplKey("hp", 1, r.hp))
      .replace(/("?)fun\1\s*:\s*(-?\d+(?:\.\d+)?)/g, rplKey("fun", 100, r.fun))
      .replace(/("key"?\s*:\s*"fun"\s*,\s*"?min"?\s*:\s*)(\d+)/g, (m0, pre, n) => pre + sc(Number(n), r.fun));
    /* valence + dyn 声明：插到本卡 era 行前（兼容裸/带引号两种写法） */
    const perOpt = (ev.choices || []).map(ch => ({ ch: ch, nets: optNets(ch, grade, r) }));
    const vz = suggestValence(ev, perOpt);
    const eraAt = reg2.search(/\n\s*"?era"?\s*:\s*\[/);
    if (eraAt >= 0) reg2 = reg2.slice(0, eraAt) + "\n    valence: \"" + vz + "\", dyn: true," + reg2.slice(eraAt);
    else reg2 = reg2.replace(/("?grade"?\s*:\s*"(?:major|mid|minor)",)/, "$1 valence: \"" + vz + "\", dyn: true,");
    edits.push({ start: start, end: end, text: reg2 });
    written++;
  }
  for (let i = edits.length - 1; i >= 0; i--) txt = txt.slice(0, edits[i].start) + edits[i].text + txt.slice(edits[i].end);
  fs.writeFileSync(fp, txt);
  console.log("已改写 " + f + "（区域 " + edits.length + "）");
}
console.log("--write 完成：改写 " + written + " 张，跳过已人工处理 " + skipped + " 张。请跑 node tools/validate.js 验证。");
