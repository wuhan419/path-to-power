#!/usr/bin/env node
/* ============================================================================
 * POTUS · tools/i18n-events.js
 * 逐卡语言缺口探针 —— 回答「哪些内容还带着没翻的中文」，不靠估。
 *
 * 用法：
 *   node tools/i18n-events.js                    # 全量：按类汇总 + 最差的前 20 个条目
 *   node tools/i18n-events.js --only=event       # 只看名字含 event 的注册表
 *   node tools/i18n-events.js --top=60           # 列 60 条缺口
 *   node tools/i18n-events.js --file=121-line-1995-98.js   # 只看某个内容文件里的卡
 *   node tools/i18n-events.js --json             # 机器可读输出
 *
 * 判据：同一条内容在 zh 与 en 两次 boot 后逐叶子比对。
 *   值不同 → 覆盖层翻过了；值相同且含 CJK → 这条还是中文（缺译）。
 *   值相同且不含 CJK（id、flag、效果键、纯英文专有名词）→ 不算缺口。
 * 所以本工具不需要知道英文分片叫什么、放在哪，也不会被分片命名骗到。
 *
 * 退出码：event / fixed / ending 三类里任何一类缺译率 > --max（默认 5%）时退出 1。
 * ==========================================================================*/
"use strict";
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const argv = process.argv.slice(2);
const arg = (n, d) => { const m = argv.find(a => a.startsWith("--" + n + "=")); return m ? m.split("=").slice(1).join("=") : d; };
const has = (n) => argv.includes("--" + n);
const ROOT = path.resolve(__dirname, "..");

/* ---------- 子进程：boot 一次，把整张内容注册表打成叶子表 ---------- */
const DUMP = arg("dump", null);
if (DUMP) {
  const LANG = DUMP;
  /* 宿主 stub 与 tools/i18n-coverage.js 同款：DOM 元素必须按选择器缓存成持久对象，
     否则引擎「查到就 remove」的清理循环在假 DOM 下永远查得到，boot 直接卡死。 */
  const stub = `
    function makeEl(){return{innerHTML:"",className:"",textContent:"",disabled:false,value:"",style:{},outerHTML:"",
      appendChild(){},append(){},remove(){},setAttribute(){},insertBefore(){},closest(){return null;},
      querySelector(){return makeEl();},onclick:null,oninput:null,onchange:null};}
    var ELEMS={};
    function el(k){return ELEMS[k]||(ELEMS[k]=makeEl());}
    global.document={querySelector:function(s){return el(s);},querySelectorAll:function(){return [];},
      getElementById:function(id){return el("#"+id);},createElement:function(){return makeEl();},
      documentElement:{lang:""},body:{className:"",appendChild:function(){}},addEventListener:function(){},title:""};
    var _store={potus_lang:${JSON.stringify(LANG)}};
    global.localStorage={getItem:function(k){return k in _store?_store[k]:null;},
      setItem:function(k,v){_store[k]=String(v);},removeItem:function(k){delete _store[k];},
      key:function(i){return Object.keys(_store)[i]||null;},get length(){return Object.keys(_store).length;}};
    global.getComputedStyle=function(){return{getPropertyValue:function(){return"";}};};
    global.alert=function(){};global.confirm=function(){return true;};global.prompt=function(){return"x";};
    global.setTimeout=function(f){try{if(typeof f==="function")f();}catch(e){}return 0;};
    global.setInterval=function(){return 1;};global.clearInterval=function(){};global.clearTimeout=function(){};
    global.URL={createObjectURL:function(){return"";},revokeObjectURL:function(){}};
    global.Blob=function(){};global.FileReader=function(){};
    global.window=global;`;
  const srcs = [...fs.readFileSync(path.join(ROOT, "index.html"), "utf8")
    .replace(/<!--[\s\S]*?-->/g, "")
    .matchAll(/<script\s+src="([^"]+)"><\/script>/g)].map(m => m[1]);
  const code = srcs.map(s => fs.readFileSync(path.join(ROOT, s), "utf8")).join("\n;\n");
  const P = new Function(stub + "\n" + code + "\nPOTUS.boot();\nreturn POTUS;")();
  /* 走文件而不是 stdout：整表 JSON 上百 KB，管道缓冲在 Windows 上会 ENOBUFS。 */
  fs.writeFileSync(arg("out"), JSON.stringify(collect(P)));
  process.exit(0);
}

const CJK = /[㐀-䶿一-鿿豈-﫿぀-ヿ]/;
function leafMap(v, pre, out) {
  if (Array.isArray(v)) { for (let i = 0; i < v.length; i++) leafMap(v[i], pre + "/" + i, out); return out; }
  if (v && typeof v === "object") { for (const k of Object.keys(v)) leafMap(v[k], pre + "/" + k, out); return out; }
  if (typeof v === "string") out[pre] = v;
  return out;
}
/* 每个条目 = 一个可独立覆盖的语言单位（一张事件卡 / 一个派系 / 一个结局…） */
function collect(P) {
  const out = {};
  const put = (kind, key, node) => {
    const leaves = leafMap(node, "", {});
    out[kind] = out[kind] || {};
    out[kind][key] = { leaves };
  };
  for (const ev of P.events) put("event", ev.id || "(无 id)", ev);
  for (const kind of Object.keys(P.reg)) {
    const v = P.reg[kind];
    if (Array.isArray(v)) v.forEach((x, i) => put("reg." + kind, (x && x.id) || "#" + i, x));
    else if (v && typeof v === "object") for (const k of Object.keys(v)) put("reg." + kind, k, v[k]);
  }
  return out;
}

/* ---------- 主进程：两次 boot 对照 ---------- */
function dump(lang) {
  const f = path.join(require("os").tmpdir(), "i18n-events-" + lang + "-" + process.pid + ".json");
  execFileSync(process.execPath, [__filename, "--dump=" + lang, "--out=" + f], { cwd: ROOT, stdio: "inherit" });
  const j = JSON.parse(fs.readFileSync(f, "utf8"));
  fs.unlinkSync(f);
  return j;
}
const ZH = dump("zh"), EN = dump("en");

const ONLY = arg("only", null);
const TOP = parseInt(arg("top", "20"), 10);
const MAX = parseFloat(arg("max", "5"));
const FILE = arg("file", null);

/* 条目 → 所属内容文件：卡片在源文件里以 id: "xxx" 声明，扫一遍建索引，
   缺口报告就能指回「该改哪个文件」。覆盖层目录跳过（那不是中文源）。 */
const SRC = (() => {
  const idx = {};
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.name === "i18n") continue;
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (p.endsWith(".js")) {
        const rel = path.relative(ROOT, p).replace(/\\/g, "/");
        for (const m of fs.readFileSync(p, "utf8").matchAll(/\bid:\s*"([^"]+)"/g))
          if (!(m[1] in idx)) idx[m[1]] = rel;
      }
    }
  })(path.join(ROOT, "content"));
  return idx;
})();

const rows = [];
for (const kind of Object.keys(ZH)) {
  if (ONLY && kind.toLowerCase().indexOf(String(ONLY).toLowerCase()) < 0) continue;
  const enKind = EN[kind] || {};
  let total = 0, missing = 0;
  const items = [];
  for (const id of Object.keys(ZH[kind])) {
    const zhLeaves = ZH[kind][id].leaves;
    const enEntry = enKind[id];
    const enLeaves = (enEntry && enEntry.leaves) || {};
    const miss = [];
    for (const p of Object.keys(zhLeaves)) {
      const v = zhLeaves[p];
      if (!CJK.test(v)) continue;
      if (enLeaves[p] === v) miss.push(p);
    }
    total += Object.keys(zhLeaves).length;
    missing += miss.length;
    if (miss.length) items.push({ id, miss: miss.length, paths: miss, src: SRC[id] || "" });
  }
  items.sort((a, b) => b.miss - a.miss);
  rows.push({ kind, entries: Object.keys(ZH[kind]).length, total, missing, items });
}

/* --file= 过滤：只保留该内容文件里的条目（事件卡按 __src 归属，注册表类没有 src 就全留） */
if (FILE) for (const r of rows) r.items = r.items.filter(x => !x.src || x.src.indexOf(FILE) >= 0);

if (has("json")) {
  console.log(JSON.stringify(rows.map(r => ({
    kind: r.kind, entries: r.entries, total: r.total, missing: r.missing,
    pct: r.total ? Math.round(r.missing / r.total * 1000) / 10 : 0,
    items: r.items.map(x => ({ id: x.id, miss: x.miss, paths: x.paths.slice(0, 40), src: x.src }))
  })), null, 2));
  process.exit(0);
}

const pad = (s, n) => { s = String(s); return s.length >= n ? s : s + " ".repeat(n - s.length); };
console.log("内容语言缺口（zh boot × en boot 逐叶子对照）\n");
console.log("  " + pad("注册表", 22) + pad("条目", 8) + pad("中文串", 9) + pad("缺译", 8) + pad("缺译率", 9) + "干净条目");
let worst = 0;
for (const r of rows) {
  const pct = r.total ? Math.round(r.missing / r.total * 1000) / 10 : 0;
  const clean = r.entries - r.items.length;
  console.log("  " + pad(r.kind, 24) + pad(r.entries, 8) + pad(r.total, 9) + pad(r.missing, 8) +
    pad(pct + "%", 9) + clean + "/" + r.entries);
  if (["event", "reg.fixed", "reg.ending"].indexOf(r.kind) >= 0) worst = Math.max(worst, pct);
}
console.log("\n  缺译最多的条目（前 " + TOP + "）：");
const flat = [];
for (const r of rows) for (const x of r.items) flat.push({ kind: r.kind, ...x });
flat.sort((a, b) => b.miss - a.miss);
for (const x of flat.slice(0, TOP)) {
  console.log("    " + pad(x.kind, 16) + pad(x.id, 26) + "缺 " + x.miss + " 处" +
    (x.src ? "  ← " + x.src : "") + "\n        " + x.paths.slice(0, 6).join(" / ") + (x.miss > 6 ? " …" : ""));
}
if (!flat.length) console.log("    （没有缺口）");
console.log("\n  三类主内容缺译率上限 " + MAX + "%：" + (worst > MAX ? "✗ 未达标" : "✓ 达标"));
process.exit(worst > MAX ? 1 : 0);
