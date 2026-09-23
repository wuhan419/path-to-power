#!/usr/bin/env node
/* ============================================================================
 * POTUS · tools/gen-manifest.js
 * 自动登记内容包 —— 消灭"每个 worker 都要改 index.html 同一行"这个冲突热点。
 *
 *   node tools/gen-manifest.js            重写 index.html 的两个托管区
 *   node tools/gen-manifest.js --check    只检查是否需要更新（有差异退出码 1）
 *   node tools/gen-manifest.js --list     打印将被登记/被跳过的文件
 *
 * 规则：
 *   · content/ 与 content/events/ 下的 .js，只要 index.html 里**任何地方**
 *     （包括注释掉的 <script>）没提到过，就追加进 content-auto 托管区。
 *   · content/i18n/ 整棵树由 i18n 托管区全量重写（zh/ 在前，en/ 按路径排序）。
 *   · 文件头 20 行内写 `@manifest: skip` 的文件永不自动登记。
 *   · 两个托管区之外的内容一律不动 —— 老清单里那些人工写的注释保持原样。
 *   · 顺序无关（引擎靠注册表发现），所以追加到区尾即可。
 * ==========================================================================*/
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");           /* dev/ */
const HTML = path.join(ROOT, "index.html");
const CONTENT = "content";

const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const LIST = args.includes("--list");

function walk(dir, out) {
  out = out || [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir).sort()) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".js")) out.push(p);
  }
  return out;
}

function rel(p) { return path.relative(ROOT, p).split(path.sep).join("/"); }

function skipped(file) {
  const head = fs.readFileSync(file, "utf8").split("\n").slice(0, 20).join("\n");
  return /@manifest:\s*skip/.test(head);
}

/* 取文件头注释里第一行非空描述，作为清单行尾注释 */
function describe(file) {
  const lines = fs.readFileSync(file, "utf8").split("\n").slice(0, 14);
  for (const l of lines) {
    const m = l.replace(/^\s*(\/\*+|\*+|\/\/)\s*/, "").trim();
    if (!m || /^=+$/.test(m) || /^CONTENT\b/.test(m) || /\/\*|@\s*\*\/$/.test(m)) continue;
    return m.length > 68 ? m.slice(0, 68) + "…" : m;
  }
  return "";
}

const html = fs.readFileSync(HTML, "utf8");

function region(tag, body) {
  const begin = "<!-- BEGIN " + tag + " -->";
  const end = "<!-- END " + tag + " -->";
  const i = html.indexOf(begin), j = html.indexOf(end);
  if (i < 0 || j < 0) {
    console.error("index.html 缺少托管区 " + tag + "（需要 BEGIN/END 两行标记）");
    process.exit(2);
  }
  return { start: i + begin.length, end: j, current: html.slice(i + begin.length, j) };
}

/* ---------- ① content 自动区：新文件追加登记 ---------- */
const contentFiles = walk(path.join(ROOT, CONTENT))
  .map(p => rel(p))
  .filter(r => !r.startsWith(CONTENT + "/i18n/"))
  .filter(r => !/^content\/(deprecated|tools)\//.test(r))
  .sort();

const auto = region("content-auto-manifest", "");
const i18nReg = region("i18n-manifest", "");
/* 老清单（托管区之外）里提过的文件不重复登记；注释掉的行也算"提过" */
const mentioned = html.slice(0, auto.start) + html.slice(auto.end, i18nReg.start) + html.slice(i18nReg.end);

const toAdd = [], skippedByMark = [];
for (const r of contentFiles) {
  if (mentioned.indexOf(r) >= 0) continue;
  const abs = path.join(ROOT, r);
  if (skipped(abs)) { skippedByMark.push(r); continue; }
  toAdd.push(r);
}

const alreadyManaged = (auto.current.match(/<script src="([^"]+)"/g) || [])
  .map(s => s.replace(/.*content\//, "content/").replace(/".*/, ""));
/* 托管区内已被删掉的文件顺手清理（否则刷新清单会直接崩） */
const surviving = alreadyManaged.filter(r => fs.existsSync(path.join(ROOT, r)));
const dropped = alreadyManaged.filter(r => !surviving.includes(r));
const merged = surviving.concat(toAdd.filter(r => !surviving.includes(r))).sort();
const autoBody = "\n" + merged.map(r =>
  '<script src="' + r + '"></script><!-- auto: ' + (describe(path.join(ROOT, r)) || "—") + " -->"
).join("\n") + "\n";

/* ---------- ② i18n 区：整棵树全量重写 ---------- */
const i18nFiles = walk(path.join(ROOT, CONTENT, "i18n")).map(p => rel(p)).sort();
const zh = i18nFiles.filter(r => /\/i18n\/zh[^/]*\.js$/.test(r) || r.endsWith("/zh.js"));
const rest = i18nFiles.filter(r => !zh.includes(r));
const i18nBody = "\n" + zh.concat(rest).map(r => '<script src="' + r + '"></script>').join("\n") + "\n";

function rebuilt() {
  let out = html.slice(0, i18nReg.start) + i18nBody + html.slice(i18nReg.end);
  out = out.slice(0, auto.start) + autoBody + out.slice(auto.end);
  return out;
}

if (LIST) {
  console.log("自动登记 " + merged.length + " 个 content 文件（本次新增 " + toAdd.length + "）：");
  merged.forEach(r => console.log("  " + r + (toAdd.includes(r) ? "   ← 新增" : "")));
  if (skippedByMark.length) console.log("按 @manifest: skip 跳过：" + skippedByMark.join(", "));
  console.log("i18n 层 " + i18nFiles.length + " 个：" + (i18nFiles.join(", ") || "（空）"));
  process.exit(0);
}

const next = rebuilt();
const dirty = next !== html;

if (CHECK) {
  if (dirty) {
    console.error("index.html 的内容清单已过期，需要跑：node dev/tools/gen-manifest.js");
    if (toAdd.length) console.error("未登记的新文件：\n  " + toAdd.join("\n  "));
    if (dropped.length) console.error("清单里已不存在的文件：" + dropped.join(", "));
    process.exit(1);
  }
  console.log("ok：index.html 清单与 content/ 树一致（" + merged.length + " 个内容文件，i18n 层 " + i18nFiles.length + " 个）");
  process.exit(0);
}

if (!dirty) {
  console.log("index.html 无需改动（content 自动区 " + merged.length + " 项，i18n " + i18nFiles.length + " 项）");
  process.exit(0);
}
fs.writeFileSync(HTML, next, "utf8");
console.log("已重写 index.html 托管区：content " + merged.length + " 项（新增 " + toAdd.length +
  (dropped.length ? "，清理已删除 " + dropped.join(", ") : "") + "），i18n " + i18nFiles.length + " 项");
