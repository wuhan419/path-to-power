#!/usr/bin/env node
/* ============================================================================
 * POTUS · tools/smoke-ui.js
 * 真·DOM 冒烟测试（jsdom）：把 index.html 真的跑起来，点一遍 UI。
 * 覆盖：标题 → 建角 → 年卡 → 月历卡 → 档期事件
 *       → 量级 / 类型 / 媒介 徽章 → 日期 → 背景卡（折叠展开）
 *       → 代价标签 / 资源不足变灰 → 投注面板 → 掷骰 → D&D 判定明细 → 结算
 *
 * 用法：  node tools/smoke-ui.js
 * 依赖：  jsdom（已装在 ~/.workbuddy/binaries/node/workspace）
 * 运行：  NODE_PATH=~/.workbuddy/binaries/node/workspace/node_modules node tools/smoke-ui.js
 * 退出码：0 通过；1 有失败
 * ==========================================================================*/
"use strict";
const fs = require("fs");
const path = require("path");
let JSDOM;
try {
  ({ JSDOM } = require("jsdom"));
} catch (e) {
  console.error("× 需要 jsdom（UI 冒烟测试专用，引擎本身零依赖）。安装并运行：");
  console.error("    cd ~/.workbuddy/binaries/node/workspace && npm install jsdom");
  console.error("    cd <game> && NODE_PATH=~/.workbuddy/binaries/node/workspace/node_modules node tools/smoke-ui.js");
  process.exit(1);
}

const ROOT = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
const srcs = [...html.replace(/<!--[\s\S]*?-->/g, "").matchAll(/<script\s+src="([^"]+)"><\/script>/g)].map(m => m[1]);

const dom = new JSDOM("<!DOCTYPE html><html><body><div id='app'></div></body></html>", {
  url: "http://localhost/", runScripts: "dangerously", pretendToBeVisual: true
});
const w = dom.window;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

let fail = 0;
const check = (c, m) => { if (!c) { console.log("  ✗ " + m); fail++; } else { console.log("  ✓ " + m); } };
const text = () => w.document.getElementById("app").textContent;
const btn = (prefix) => [...w.document.querySelectorAll("button")].find(b => b.textContent.indexOf(prefix) === 0);

(async function () {
  console.log("== 加载引擎 / 内容 ==");
  for (const s of srcs) w.eval(fs.readFileSync(path.join(ROOT, s), "utf8"));
  w.eval("POTUS.boot()");
  const P = w.POTUS;
  console.log("  引擎 v" + P.VERSION + " ｜ 事件 " + P.events.length + " ｜ 时代 " + Object.keys(P.reg.era).length +
    " ｜ 类型 " + Object.keys(P.reg.category).length + " ｜ 媒介 " + Object.keys(P.reg.medium).length);

  console.log("\n== 标题 → 建角（快速开局·选难度） ==");
  check(text().indexOf("开始新游戏") >= 0, "标题屏渲染出「开始新游戏」");
  w.document.querySelector("button.primary").click();          // 开始新游戏 → startCreate
  check(text().indexOf("选择难度") >= 0, "点击后进入快速开局（选难度）屏");
  const diffs = w.document.querySelectorAll(".opt-diff");
  check(diffs.length >= 3, "难度选项被注册表自动生成（" + diffs.length + " 个）");
  P.CSEL.name = "测试者";                                       // 姓名直接写进 CSEL（不依赖输入框事件）
  const goBtn = btn("开始游戏");
  check(!!goBtn, "建角屏有「开始游戏 →」按钮");
  goBtn.click();                                               // confirmCreate → 进入第一年
  check(!!P.G && P.G.name === "测试者", "开局成功，P.G 已建立");
  check(/era-/.test(w.document.body.className), "时代皮肤已应用到 body");
  check(Array.isArray(P.G.monthPlan) && Array.isArray(P.G.doneIds), "存档结构已切到月回合（monthPlan / doneIds）");

  /* ---------- 年卡 → （有事直接事件 / 平静合并卡） → 档期 ---------- */
  console.log("\n== 年卡 → 事件/平静 → 档期 ==");
  check(text().indexOf("时代简报") >= 0, "开局显示时代简报");
  check(/时代压力/.test(text()), "年卡上标出时代压力");
  check(/此刻存在的媒介/.test(text()), "年卡上列出本年存在的媒介");
  const yBtn = btn("进入 1 月");
  check(!!yBtn, "年卡上有「进入 1 月 →」按钮");
  yBtn.click();
  /* v0.9 需求①：有事的月份不再有月历中间页——直接进事件；平静的月份合并成一张卡 */
  const janEvent = w.document.querySelectorAll(".choice").length > 0 || !!w.document.querySelector(".editorial");
  const janQuiet = !!w.document.querySelector(".quietcard");
  check(janEvent || janQuiet, "点击后进入 1 月：有事→直接事件卡，或平静→平静月卡");
  check(P.G.month >= 1 && P.G.month <= 12, "月份落在 1-12：" + P.G.month);
  /* v0.5.6：原右上角 .masthead .meta 已合并进顶部状态条（去重），报头只留时代名 */
  check(!w.document.querySelector(".masthead .meta"), "右上角信息已合并进顶部状态条（报头不再有 .meta）");
  const tsBar = (w.document.getElementById("statusbox") || {}).textContent || "";
  const ym = (tsBar.match(/\d{4} 年 \d+ 月/) || [])[0];
  check(!!ym, "顶部状态条显示当前年月：" + (ym || "(无)"));
  const sBtn = btn("继续");
  if (sBtn) {
    check(!!w.document.querySelector(".mstrip") && !!w.document.querySelector(".mlabel.now"), "平静月卡带月历条并标出末月");
    sBtn.click();
    check(w.document.querySelectorAll(".choice").length > 0 || !!w.document.querySelector(".quietcard") || !!w.document.querySelector(".editorial"),
      "继续后推进：进入事件的选项或下一张平静卡（渲染出了当月界面）");
  } else {
    check(janEvent, "1 月有事：无中间页直接进事件（没有「继续」按钮，符合需求①）");
  }

  /* ---------- 日期 + 量级 / 类型 / 媒介徽章 ---------- */
  console.log("\n== 日期 / 量级 / 类型 / 媒介 ==");
  const crash = P.events.find(e => e.id === "2008_crash_offer");
  check(!!crash, "找到 2008 救市事件");
  P.G.year = 2008;
  P.G.month = 9;                     // 救市事件钉在 9 月 24 日
  P.presentEvent(crash, { grade: "major" });
  const dt = w.document.querySelector(".dossier-head .dnum");
  check(!!dt && /2008 年 9 月 24 日/.test(dt.textContent), "事件卡顶部显示精确日期：" + (dt && dt.textContent));
  const dmeta = (w.document.querySelector(".dmeta") || {}).textContent || "";
  check(!!w.document.querySelector(".dmeta .gchip") && /大/.test(dmeta), "事件卡标出量级徽章「大事件」");
  check(/危机/.test(dmeta), "事件卡标出类型「危机」");
  const tsAll = (w.document.getElementById("statusbox") || {}).textContent || "";
  check(/2008 年 9 月/.test(tsAll), "顶部状态条同步当前日期");
  P.setMonth({ month: 3, day: 12 });
  check(P.G.month === 9, "更早的月份不应让时间回退（当前月仍为 9）");

  /* 媒介徽章：短视频事件在 2025 年可发生，在 1960 年不可 */
  const clip = P.events.find(e => e.id === "media_viral_clip");
  P.G.year = 2025;
  check(P.mediumOK(clip), "2025 年短视频事件可发生");
  P.presentEvent(clip, { grade: "major" });
  check(/短视频/.test((w.document.querySelector(".dmeta") || {}).textContent || ""), "媒介徽章显示「短视频」");
  P.G.year = 1960;
  check(!P.mediumOK(clip), "1960 年短视频事件不可发生（媒介门控生效）");
  P.G.year = 2008;

  /* ---------- 事件配图：照片层 + 缺图退 SVG ---------- */
  console.log("\n== 事件配图（照片 / 程序化 SVG 降级） ==");
  P.G.month = 9;
  P.presentEvent(crash, { grade: "major" });     // crash 是「危机」类型，有照片
  const fig = w.document.querySelector(".news .art.art-press");   /* 照片层类名：.art-photo → .art-press */
  check(!!fig, "有照片的类型在事件卡上渲染成照片卡（.art-press）");
  const pimg = fig && fig.querySelector("img");
  check(!!pimg, "照片卡里有 <img>");
  check(!!pimg && pimg.getAttribute("src").indexOf("assets/events/crisis.jpg") >= 0,
    "照片指向登记的文件：" + (pimg && pimg.getAttribute("src")));
  check(!!pimg && /art-press-broken/.test(pimg.getAttribute("onerror") || ""),
    "照片挂了加载失败的降级钩子（onerror）");
  const tag = fig && fig.querySelector(".art-ptag");
  check(!!tag && /危机/.test(tag.textContent), "照片角标写着类型名：" + (tag && tag.textContent));
  const back = fig && fig.querySelector(".art-back");
  check(!!back && !!back.querySelector("svg"), "照片底下垫着同类型的程序化 SVG（缺图时顶上）");
  /* 真的把加载失败演一遍：派发 error 事件，卡片应切到「破图态」 */
  if (pimg) {
    try { pimg.dispatchEvent(new w.Event("error")); } catch (e) { /* jsdom 不编译内联处理器时跳过 */ }
    const broke = fig.classList.contains("art-press-broken");
    if (pimg.onerror || broke) {
      check(broke, "图片加载失败后卡片切到破图态（露出兜底 SVG）");
    } else {
      console.log("  · 跳过「派发 error」断言（当前 DOM 实现不编译内联事件处理器）");
    }
  }
  /* 没登记照片的类型必须安静退回 SVG，而不是留一个空壳 */
  const noPhotoCats = Object.keys(P.reg.category).filter(k => !(P.reg.photo.files || {})[k]);
  if (noPhotoCats.length) {
    const npEv = P.events.find(e => noPhotoCats.indexOf(e.category) >= 0) ||
      { title: "无图事件", category: noPhotoCats[0], choices: [] };
    P.presentEvent(npEv, { grade: "mid" });
    check(!w.document.querySelector(".news .art-press"), "没照片的类型（" + npEv.category + "）不渲染照片卡");
    check(!!w.document.querySelector(".news svg.art"), "没照片的类型退回程序化 SVG");
  } else {
    console.log("  · 所有类型都有照片，跳过「缺图退 SVG」断言");
  }
  P.G.year = 2008;

  /* ---------- 背景卡（折叠 / 展开） ---------- */
  console.log("\n== 背景卡 ==");
  P.G.month = 9;
  P.presentEvent(crash, { grade: "major" });
  const brief = w.document.getElementById("brief");
  check(!!brief, "渲染出背景卡 #brief");
  check(!brief.classList.contains("collapsed"), "背景卡默认展开");
  const body0 = brief.querySelector(".brief-body").textContent;
  check(body0.indexOf("你确知的") >= 0, "含「你确知的」一段");
  check(body0.indexOf("你听到的") >= 0, "含「你听到的 · 真假不明」一段");
  check(body0.indexOf("你尚不知道的") >= 0, "含「你尚不知道的」一段（认知边界提示）");
  check(body0.indexOf("雷曼") >= 0, "背景里交代了正在发生的事（雷曼）");
  check(body0.indexOf("救市") >= 0 && body0.indexOf("TARP") >= 0, "名词表解释了「救市 / TARP」");
  check(w.document.querySelector(".brief-head").textContent.indexOf("财政部深夜来电") >= 0, "折叠标题行带一句话 lede");

  w.document.querySelector(".brief-head").click();
  check(w.document.getElementById("brief").classList.contains("collapsed"), "点击后背景卡收起");
  check(w.localStorage.getItem("potus_brief_collapsed") === "1", "折叠状态被记住（localStorage）");
  w.document.querySelector(".brief-head").click();
  check(!w.document.getElementById("brief").classList.contains("collapsed"), "再点一次展开");
  check(w.localStorage.getItem("potus_brief_collapsed") === "0", "展开状态同样被记住");

  /* ---------- 代价标签 + 资源不足变灰 ---------- */
  console.log("\n== 选项代价（cost）==");
  const gala = P.events.find(e => e.id === "demo_donor_gala");
  const hearing = P.events.find(e => e.id === "demo_hearing");
  check(!!gala && !!hearing, "演示包已被引擎自动注册");
  /* v0.7 起代价金额按「身位 × 事件钱量级」动态换算（demo 里 fund 值已很小），
     测试不再写死数字：只验两条规则——「付不起 → 禁用/缺少提示 or 保底放行」「付得起 → 代价：资金 标签」。 */
  const funCosts = gala.choices.map(function (c) { return (c.cost && c.cost.fun) || 0; });
  const dearIdx = funCosts.findIndex(function (v) { return v > 0; });
  const maxFunCost = Math.max.apply(null, funCosts.concat([0]));
  P.G.fun = 0;                              // 压到没钱
  P.presentEvent(gala, { grade: "minor" });
  let chBtns = [...w.document.querySelectorAll(".choice")];
  check(chBtns.length === gala.choices.length, "渲染出全部选项");
  if (dearIdx >= 0) {
    const b = chBtns[dearIdx];
    check(b.disabled || !!w.document.querySelector(".choice.forced"),
      "资金见底时高代价选项被禁用（或走保底放行一条）");
    check(!b.disabled || b.textContent.indexOf("缺少") >= 0, "被禁用的选项说明「缺少…」");
  }
  /* 改到付得起：资金代价项显示「代价：资金」标签（金额随动态汇率，不写死） */
  P.G.fun = maxFunCost + 5000;
  P.presentEvent(gala, { grade: "minor" });
  chBtns = [...w.document.querySelectorAll(".choice")];
  check(dearIdx >= 0 && chBtns[dearIdx].textContent.indexOf("代价：资金") >= 0,
    "付得起的选项显示代价标签「代价：资金 …」");
  const stakeIdx = gala.choices.findIndex(function (c) { return !!c.stake; });
  check(stakeIdx >= 0 && chBtns[stakeIdx].textContent.indexOf("可投入资源") >= 0,
    "带 stake 的选项标注「可投入资源」");

  /* ---------- 投注面板 ---------- */
  console.log("\n== D&D 式投注面板（stake）==");
  P.G.fun = 3000000; P.G.ap = 8; P.G.fav = 3;
  P.presentEvent(hearing, { grade: "mid" });
  const allIn = hearing.choices.find(c => c.id === "all_in");
  const idx = hearing.choices.indexOf(allIn);
  const beforeP = P.computeP(allIn).P;
  w.document.querySelectorAll(".choice")[idx].click();
  const panel = w.document.getElementById("stake");
  check(!!panel, "点击带 stake 的选项后打开了投注面板");
  /* v0.9：精力已退役，投注面板只有 资金（可加减档）与 人情（重投开关） */
  check(!!w.document.getElementById("stFunPlus") && !!w.document.getElementById("stFav"),
    "面板列出 资金 / 人情 两种投入方式");
  check(w.document.getElementById("choices").style.display === "none", "投注时选项列表被收起来");
  check(!w.document.querySelector(".check-preview"), "投注面板不再显示判定目标值/胜率（掷骰对用户隐藏）");
  w.document.getElementById("stFunPlus").click();
  w.document.getElementById("stFunPlus").click();
  w.document.getElementById("stFav").click();
  const pAfter = P.computeP(allIn, P.stakeInfo(allIn, { fun: 2, fav: true })).P;
  check(pAfter > beforeP,
    "后台胜算仍随加码上升（引擎不变，只是不再显示）：" + beforeP.toFixed(3) + " → " + pAfter.toFixed(3));

  /* ---------- 投注上限护栏（玩家反馈的 bug） ---------- */
  console.log("\n== 投注上限护栏 ==");
  const rowOf = (lbl) => [...w.document.querySelectorAll(".stake-row")].find(r => r.querySelector("b").textContent === lbl);
  const valOf = (lbl) => parseInt(rowOf(lbl).querySelector(".stake-val").textContent.replace(/[^0-9]/g, ""), 10);
  /* 面板上的金额既可能是 "$24k" 也可能是 "$1.5M"（v0.7 动态汇率），解析成美元再比 */
  const moneyOf = (lbl) => { const t = rowOf(lbl).querySelector(".stake-val").textContent.trim();
    const m = /^\$([0-9.]+)([kM]?)$/.exec(t);
    return m ? Math.round(parseFloat(m[1]) * (m[2] === "k" ? 1000 : m[2] === "M" ? 1000000 : 1)) : NaN; };
  const openStake = () => { w.document.querySelectorAll(".choice")[idx].click(); };
  const perFun = () => P.stakeSpec(allIn).fun.per;      /* v0.7：每档金额按身位 × 事件钱量级动态算 */

  /* v0.9：精力投注轴退役（不再有 stApPlus / 精力行）。原「精力上限护栏」改验资金轴。 */
  w.document.getElementById("stBack").click();
  P.G.fun = 3000000; P.G.fav = 3;
  openStake();
  check(P.stakeMax("ap", allIn) === 0, "精力已退役：stakeMax(\"ap\") 恒为 0");
  check(!w.document.getElementById("stApPlus"), "投注面板不再渲染精力加减按钮 stApPlus");

  /* 资金：一档都投不起时，过去是"点了没反应" —— 现在置灰 + 说明原因 */
  w.document.getElementById("stBack").click();
  const per0 = perFun();
  P.G.fun = Math.max(0, per0 - 1);
  openStake();
  check(P.stakeMax("fun", allIn) === 0, "钱不够一档（" + P.fmtUsd(per0) + "）时资金上限为 0");
  check(w.document.getElementById("stFunPlus").disabled, "资金 ＋ 被置灰");
  check(rowOf("资金").textContent.indexOf("资金不足") >= 0, "并说明原因：" + rowOf("资金").querySelector(".stake-note").textContent);
  check(moneyOf("资金") === 0, "未投入任何资金");

  /* 资金：够钱时上限也被 cap÷w 夹住，不会花光全部家当买 0 收益 */
  w.document.getElementById("stBack").click();
  P.G.fun = 500000000;
  openStake();
  const richMax = P.stakeMax("fun", allIn);
  for (let i = 0; i < 40; i++) { const b = w.document.getElementById("stFunPlus"); if (b && !b.disabled) b.click(); }
  check(moneyOf("资金") === richMax * per0, "连按 40 次 ＋ 后停在 " + P.fmtUsd(richMax * per0) + "（= " + richMax + " 档 × " + P.fmtUsd(per0) + "），而不是全部家当");
  check(w.document.getElementById("stFunPlus").disabled, "资金到顶后 ＋ 同样置灰");
  check(P.stakeInfo(allIn, { fun: 40 }).bonus <= 0.3000001, "资金加成不超过上限 +30%");

  /* ---------- v0.7 动态汇率：同样的选项，身位不同价码不同，且面板交代得清 ---------- */
  console.log("\n== 动态投注汇率（身位 × 事件钱量级）==");
  const noteOn = () => (w.document.getElementById("stake").querySelector(".stake-rate") || {}).textContent || "";
  const perAt = (track, tier) => { P.G.track = track; P.G.tier = tier; return perFun(); };
  const p0 = perAt("electoral", 0), p5 = perAt("electoral", 5);
  check(p5 > p0, "同一选项：T5 的每档价码高于 T0（" + P.fmtUsd(p0) + " → " + P.fmtUsd(p5) + "）");
  const pWealth = perAt("wealth", 5);
  check(pWealth >= p5, "同层级下财富轨道（月薪更高）不便宜于选举轨道（" + P.fmtUsd(p5) + " vs " + P.fmtUsd(pWealth) + "）");
  P.G.track = "electoral"; P.G.tier = 1; P.G.fun = 3000000;
  w.document.getElementById("stBack").click();
  openStake();
  check(noteOn().indexOf("月薪") >= 0 && noteOn().indexOf("身位基准") >= 0, "面板给出汇率依据：" + noteOn());
  check(!!w.document.querySelector("#stake .stake-rate"), "面板渲染出 .stake-rate 说明条");

  /* 用户报的核心 bug 已修：小兵（家底 $10k）至少投得起一档 */
  P.G.tier = 0; P.G.track = "electoral"; P.G.fun = 10000;
  check(P.stakeMax("fun", allIn) >= 1, "T0 家底 $10k 至少投得起 1 档（旧版固定 $250k 时恒为 0）");

  /* ---------- 死局保护：所有选项都点不动时，必须留一条路 ---------- */
  console.log("\n== 死局保护 ==");
  const deadEv = {
    id: "__smoke_dead", title: "死局演练", body: "每一个选项都要钱，而你的账户已经见底。",
    era: Object.keys(P.reg.era), grade: "minor", category: "general",
    choices: [
      { id: "a", text: "砸钱 A", base: 0.4, req: { fun: 99999999 }, outcomes: {} },
      { id: "b", text: "砸钱 B", base: 0.4, cost: { fun: 99999999 }, outcomes: {} }
    ]
  };
  P.G.fun = 0; P.G.rep = 0;
  P.presentEvent(deadEv, { grade: "minor" });
  const dbtns = [...w.document.querySelectorAll(".choice")];
  check(dbtns.length === 2, "死局事件渲染出 2 个选项");
  check(!dbtns.every(b => b.disabled), "不会出现「全部选项都点不动」");
  check(dbtns.filter(b => !b.disabled).length === 1, "恰好放行 1 个保底选项");
  check(!dbtns[1].disabled && dbtns[0].disabled, "放行的是「只是资源不够」的那个");
  check(dbtns[1].textContent.indexOf("保底选项") >= 0, "并明确标注：保底选项，硬撑一次");
  check(P.fallbackIndex(deadEv.choices) === 1, "fallbackIndex 给出正确的下标");

  /* 恢复正常局面，后续流程继续 */
  w.document.getElementById("stake") && w.document.getElementById("stake").remove();
  P.G.fun = 3000000; P.G.ap = 8; P.G.fav = 3;
  P.presentEvent(hearing, { grade: "mid" });
  openStake();

  /* 返回按钮不消耗任何资源 */
  const funBefore = P.G.fun;
  w.document.getElementById("stBack").click();
  check(!w.document.getElementById("stake"), "返回后投注面板关闭");
  check(P.G.fun === funBefore, "返回不扣除资源");

  /* 真正确认判定 */
  console.log("\n== 确认判定（掷骰隐藏）→ 结算 ==");
  w.document.querySelectorAll(".choice")[idx].click();
  w.document.getElementById("stFunPlus").click();
  w.document.getElementById("stFav").click();
  const funBefore2 = P.G.fun, apBefore2 = P.G.ap, favBefore2 = P.G.fav;
  w.document.getElementById("stGo").click();
  /* 掷骰已搬后台：不再有骰子动画/判定明细卡/点数。结算同步完成，只呈现结果 + 收益。 */
  const diceHidden = ((w.document.getElementById("actbody") || {}).textContent || "").replace(/\s+/g, " ");
  check(!w.document.querySelector(".check"), "结算不再出现「判定明细」卡");
  check(!w.document.querySelector(".dicebar"), "结算不再出现骰子动画/点数条");
  check(!/d100|／ 目标|重投 \d/.test(diceHidden), "操作区不含 d100/目标/骰值等掷骰信息");
  check(P.G.fun < funBefore2, "资金被真实扣除：" + (funBefore2 / 1000) + "k → " + (P.G.fun / 1000) + "k");
  check(!!w.document.querySelector(".result"), "出现结果卡");
  check(w.document.querySelector(".result").textContent.search(/大成功|成功|勉强过关|失败|大失败/) >= 0,
    "结果卡带五档标签：" + w.document.querySelector(".result").textContent.slice(0, 4));
  check(w.document.getElementById("choices").style.display === "none", "结算后选项不再可点");

  /* 继续按钮推进流程：本月还有档期就继续出题，否则跳到下一个月 */
  const cont = btn("继续");
  check(!!cont, "出现「继续 →」按钮");
  P.G.slotIndex = P.G.slotCount;          // 强制走"本月出完 → 推进月份"这条路
  P.G.month = 1;
  cont.click();
  check(!!w.document.querySelector(".mstrip") || w.document.querySelectorAll(".choice").length > 0,
    "继续后进入下一个月或下一个档期");

  /* ---------- v0.4：把柄 / 人脉 / 承前条 ---------- */
  console.log("\n== 把柄 / 人脉 / 事件链（承前条）==");
  P.G.era = "2008_CRASH";
  P.G.tier = 2; P.G.lev = 2; P.G.fun = 3000000; P.G.ap = 8; P.G.fav = 3; P.G.rep = 40;
  P.G.tierSince = P.monthSeq() - 15;                 // 让职位卡显示“在位 1 年余”，验证顶栏在位时长
  P.G.contacts = { columnist: 34, fixer: -25 };

  const showdown = P.events.find(e => e.id === "archive_showdown");
  check(!!showdown, "档案链第三幕（摊牌）已注册");
  P.presentEvent(showdown, { grade: "major" });

  /* 状态卡：把柄瓷贴（v0.9 回归）+ 人脉 chip（用登记表里的名字，不是 id） */
  const sbTxt = (w.document.getElementById("statusbox") || {}).textContent || "";
  check(/把柄/.test(sbTxt) && /2/.test(sbTxt), "状态卡显示把柄（瓷贴）");
  check(sbTxt.indexOf("专栏作家") >= 0 && sbTxt.indexOf("掮客") >= 0, "人脉 chip 用登记表里的名字（专栏作家 / 掮客）");
  check(sbTxt.indexOf("人脉") >= 0, "状态卡有「人脉」一节");
  check(/等级 3/.test(sbTxt), "状态卡人物卡显示等级徽标");
  /* 在位时长不再直接上屏（v0.8），收进晋升条悬浮提示 */
  const progEl = w.document.querySelector(".statusbox .idc-prog");
  check(!!progEl && /在位/.test(progEl.getAttribute("data-tip") || ""), "晋升条悬浮提示含在位/规则说明");

  /* 把柄作为代价：没有把柄 → 置灰 + 说明原因；有把柄 → 显示「代价：把柄 1」 */
  const findBtn = (kw) => [...w.document.querySelectorAll(".choice")].find(b => b.textContent.indexOf(kw) === 0);
  P.G.lev = 0;
  P.presentEvent(showdown, { grade: "major" });
  let dealBtn = findBtn("换一个位置");
  check(!!dealBtn, "渲染出「换一个位置」（花一份把柄换一个台阶）的选项");
  check(dealBtn.disabled, "没有把柄时，花把柄的选项被禁用");
  check(dealBtn.textContent.indexOf("缺少把柄") >= 0, "并说明原因：缺少把柄");
  P.G.lev = 1;
  P.presentEvent(showdown, { grade: "major" });
  dealBtn = findBtn("换一个位置");
  check(!dealBtn.disabled, "有 1 份把柄后同一选项可选");
  check(dealBtn.textContent.indexOf("代价：把柄 1") >= 0, "代价标签显示「代价：把柄 1」");
  /* 把柄是"代价"，不是"投注资源"：它只能被花掉，不能被加码。 */
  const dealSpec = P.stakeSpec(showdown.choices.find(c => c.id === "deal")) || {};
  check(!dealSpec.lev, "stakeSpec 里没有 lev（投注只支持 资金/精力/人情）");
  check(!!dealSpec.fav && !dealSpec.fun, "该选项可投注的资源只有「人情」（把柄不在投注体系里）");

  /* 人脉门槛：不认识就选不了，并说清要认识谁 */
  const kill = P.events.find(e => e.id === "press_kill");
  P.G.contacts = {};
  P.presentEvent(kill, { grade: "mid" });
  let swapBtn = findBtn("给他一条更大的新闻");
  check(!!swapBtn && swapBtn.disabled, "不认识专栏作家时，「换料压稿」选项被禁用");
  check(swapBtn.textContent.indexOf("需要先认识「专栏作家」") >= 0, "并写明需要先认识谁");
  P.G.contacts = { columnist: 20 };
  P.presentEvent(kill, { grade: "mid" });
  swapBtn = findBtn("给他一条更大的新闻");
  check(!swapBtn.disabled, "认识之后同一选项可选");
  check(P.hasContact("columnist") && P.contactFavor("columnist") === 20, "人脉被写进存档（hasContact / contactFavor）");

  /* 事件链：满足前情 + 间隔 + 标记 → 续集可触发，并且卡面顶部有「承前」条 */
  const act2 = P.events.find(e => e.id === "archive_bite");
  P.G.doneIds = []; P.recentIds = []; P.G.flags = []; P.G.doneSeq = {};
  P.G.month = 1; P.G.year = 2010;
  P.stamp("archive_get");                 // 前一幕发生在 2010 年 1 月
  P.G.month = 5;                           // 隔了 4 个月（minMonthsAfter = 3）
  P.addFlag("archive_taken");
  check(P.eligible(act2), "前情 + 间隔 + 标记都满足后续集可触发（引擎侧）");
  P.presentEvent(act2, { grade: "mid" });
  const chain = w.document.querySelector(".chain");
  check(!!chain, "续集事件卡顶部渲染出「承前」条");
  check(chain.textContent.indexOf("承") >= 0, "承前条带「承 前」标签");
  check(chain.textContent.indexOf("没编号的卷宗") >= 0, "承前条写出上一幕的标题");
  check(chain.textContent.indexOf("4 个月前") >= 0, "承前条写出相隔多久：" + (chain.textContent.match(/\d+ 个月前/) || [""])[0]);
  /* 没有前情的事件不该长出承前条 */
  P.presentEvent(kill, { grade: "mid" });
  check(!w.document.querySelector(".chain"), "没有 after 的事件不渲染承前条");

  /* ---------- 上班的账 + 静好岁月 -----------------------------------------
   * v0.9：日常结算（工资-开销/学贷/选民）已搬到时间轴，每月经手一次（有事/无事都算）。
   * 这里不靠随机数：直接断言 monthlyLedger 的入账与幂等，以及合并卡的渲染。 */
  console.log("\n== 上班的账（monthlyLedger） + 平静月合并卡（renderQuietRun） ==");
  P.G.year = 2010; P.G.month = 3; P.G.vigYear = 2010; P.G.vigMonth = 0;
  P.G.ledgerYear = 2010; P.G.ledger = {};
  P.G.quietMonths = [1, 2];
  P.G.quietLog = [
    { year: 2010, month: 1, text: "一月。雪下了一场又一场，早上先铲出车道才能出门。", gain: { attr: { CHA: 1 }, hp: 0, rep: 1, contact: 0, fun: 0, ap: 0, fav: 0 } },
    { year: 2010, month: 2, text: "二月，残冬。你把手头的事一件一件地做完。", gain: { attr: { CHA: 1, INT: 1 }, hp: 0, rep: 0, contact: 0, fun: 0, ap: 0, fav: 0 } }
  ];
  /* monthlyLedger：工资-开销当场入 G.fun，并记进 G.ledger（幂等） */
  const funB4 = P.G.fun;
  const rec1 = P.monthlyLedger(1);
  check(!!rec1 && typeof rec1.net === "number" && typeof rec1.salary === "number", "monthlyLedger 结出这个月的账（结余 " + (rec1 && rec1.net) + "）");
  check(P.G.fun !== funB4 || (rec1 && rec1.net === 0), "工资-开销当场入账（$" + (funB4 / 1000).toFixed(0) + "k → $" + (P.G.fun / 1000).toFixed(0) + "k）");
  check(P.G.ledger[1] === rec1, "同一个月的账记进 G.ledger（供界面只读）");
  const funAfter = P.G.fun;
  P.monthlyLedger(1);
  check(P.G.fun === funAfter, "重复结算同一个月不重复入账（幂等）");
  /* 合并卡（单月）：具体工作 + 账目（工资/开销/结余，读 ledger）+ 静好随笔 + 继续按钮 */
  P.renderQuietRun([1], "POTUS.nextSlot()", "继续 →");
  check(!!w.document.querySelector(".quietcard"), "平静月渲染出合并卡（.quietcard）");
  check(!!w.document.querySelector(".mstrip") && !!w.document.querySelector(".mlabel.now"), "合并卡带月历条并标出末月");
  check(!!w.document.querySelector(".quietwork"), "卡上有「这个月」工作行");
  const qwTxt = w.document.querySelector(".qw-text").textContent;
  check(qwTxt.length >= 10, "工作行是具体的一件事：" + qwTxt.slice(0, 30) + "…");
  check(!!w.document.querySelector(".gainbox"), "卡上有「这个月的账」");
  const acctTxt = w.document.querySelector(".gainbox").textContent;
  check(acctTxt.indexOf("工资") >= 0 && acctTxt.indexOf("开销") >= 0 && acctTxt.indexOf("结余") >= 0,
    "账目含 工资/开销/结余：" + acctTxt.replace(/\s+/g, " ").slice(0, 60));
  check(!!btn("继续"), "平静月也有「继续 →」");
  /* renderQuiet（合并渲染）仍在被年终等场景引用：直接验证其输出 */
  P.G.quietMonths = [1, 2];
  const rq = P.renderQuiet([1, 2]);
  check(rq.html.indexOf("静好岁月") >= 0, "renderQuiet 仍能渲染「静好岁月」卡");
  check(rq.html.indexOf("2010 年 1 月") >= 0 && rq.html.indexOf("2 月") >= 0, "卡片标出平静的月份范围");
  check(rq.html.indexOf("早上先铲出车道") >= 0, "正文写出了那个月的日子");
  check(rq.html.indexOf("魅力 +2") >= 0 && rq.html.indexOf("智力 +1") >= 0, "成长小结用中文名并合起来算");
  /* 平静得太久：只展开 maxShown 段，其余收成一句话 */
  P.G.vigMonth = 0;
  P.G.quietLog = [1, 2, 3, 4, 5, 6].map(function (m) { return { year: 2010, month: m, text: m + " 月的日子。", gain: {} }; });
  const rq2 = P.renderQuiet([1, 2, 3, 4, 5, 6]);
  check(rq2.html.indexOf("另有 2 个月") >= 0, "超过 maxShown 的月份被收成「另有 N 个月」");

  /* ---------- 大模型适配层已整体下架：引擎不再内置任何联网/模型能力，
   * 因此本冒烟不再断言任何 AI 按钮或润色入口（游戏本身自始至终不依赖网络）。 ---------- */

  /* ---------- 建角：demo 已简化为「快速开局」（选难度+姓名）；旧的全量建角（掷骰/选州/VIP）
   * 作为引擎函数保留在本目录（便于回退），只是 renderCreate 不再走它。此处验快速开局 UI + 引擎级函数仍在。 ---------- */
  console.log("\n== 建角（快速开局 UI + 引擎级掷骰/VIP/州函数保留）==");
  P.renderTitle();
  P.startCreate();
  check(text().indexOf("选择难度") >= 0, "建角屏是快速开局：出现「选择难度」");
  check(text().indexOf("姓名") >= 0, "建角屏要求填「姓名」（留空默认汤米）");
  P.pickDifficulty("brutal");
  check(P.CSEL.difficulty === "brutal" && P.CSEL.origin === "labor", "选难度会切换出身（炼狱→蓝领 labor）");
  check(!!w.document.querySelector(".opt-diff.sel"), "当前难度在界面上高亮（.opt-diff.sel）");
  /* 引擎级的定命一掷 / 自由点 / VIP / 州联动函数仍在（旧完整建角保留可回退） */
  P.rollAttrs();
  check(!!P.CSEL.rolled && ["CHA", "INT", "CUN", "INTG"].every(k => typeof P.CSEL.rolled[k] === "number"),
    "rollAttrs() 仍能掷出四属性（引擎保留）");
  P.spendAttr("CHA", 1);
  check((P.CSEL.spent.CHA || 0) === 1, "spendAttr() 仍能把自由点洒到属性上");
  check(typeof P.vipActivate("NOPE_X") === "string", "无效 VIP 码被拒（vipActivate 返回错误原因）");
  check(P.vipActivate("VIP5") === null, "合法 VIP5 码可激活（引擎保留）");
  check(typeof P.stateWindFor === "function" && typeof P.stateWindFor("OH", "D") === "number",
    "stateWindFor() 仍给出州对党派的顺逆风（数值）");
  /* 确认开局：走快速开局，出生州由系统自动填（铁锈带 OH），难度/出身写进存档 */
  P.CSEL.difficulty = "hard"; P.CSEL.origin = "immigrant"; P.CSEL.name = "快速开局测试者";
  P.confirmCreate();
  check(!!P.G && P.G.name === "快速开局测试者" && P.G.difficulty === "hard", "开局成功，记录姓名与难度");
  check(!!P.G.state, "出生州由系统自动填（demo 铁锈带锚点）");
  check(/\d+ 年 \d+ 月/.test((w.document.getElementById("statusbox") || {}).textContent || ""), "顶部状态条显示日期");
  check(!!P.G.yearStartSnap, "年初快照已建立（年终叙事的对比基准）");

  /* ---------- 收益结算面板 + 判定明细折叠 ---------- */
  console.log("\n== 收益结算面板 ==");
  const ev5 = P.events.find(e => e.id === "cross_first_fork") || P.events[0];
  P.G.tier = 1; P.G.doneIds = []; P.recentIds = []; P.G.flags = []; P.G.doneSeq = {};
  P.G.year = 2009; P.G.month = 6; P.G.fun = 2000000; P.G.ap = 8; P.G.fav = 2;
  P.presentEvent(ev5, { grade: "major" });
  /* 选项说明折叠块（cross_first_fork 的选项带 note） */
  const noteDet = w.document.querySelector(".choice .chnote");
  if (ev5.choices.some(c => c.note)) {
    check(!!noteDet, "带 note 的选项渲染出折叠说明（details.chnote）");
    check(!!noteDet && noteDet.querySelector("summary").textContent === "说明", "折叠块默认收起，摘要是「说明」");
    check(!!noteDet && !noteDet.open, "默认未展开");
    /* 点说明不应触发选择 */
    const choicesBefore = w.document.querySelectorAll(".choice").length;
    if (noteDet) { noteDet.querySelector("summary").click(); }
    check(w.document.querySelectorAll(".choice").length === choicesBefore, "点「说明」不触发选项（仍然停在选项列表）");
  } else {
    console.log("  · 该事件无 note，跳过说明折叠断言");
  }
  /* 事件卡主次顺序（v0.10 头版社论版式）：标题→导语→配图→正文，图在正文之前 */
  const newsEl = w.document.querySelector(".news");
  const bodyEl = newsEl && newsEl.querySelector(".body");
  const artEl = newsEl && newsEl.querySelector(".art");
  if (bodyEl && artEl) {
    check(artEl.compareDocumentPosition(bodyEl) & w.document.defaultView.Node.DOCUMENT_POSITION_FOLLOWING,
      "事件卡顺序：配图在正文之前（标题→导语→图→正文）");
  }
  /* 真掷一次骰看结算 */
  const ch0 = ev5.choices[0];
  P.choose(ev5, ch0);
  await sleep(900);
  const gainEl = w.document.querySelector(".gainbox");
  const resEl = w.document.querySelector(".result");
  check(!!resEl, "结算出现结果卡");
  check(!!gainEl, "结算出现「这一手」收益面板");
  if (gainEl && resEl) {
    check(resEl.compareDocumentPosition(gainEl) & w.document.defaultView.Node.DOCUMENT_POSITION_FOLLOWING,
      "收益面板排在结果正文之后（叙事为主，对账为辅）");
  }
  check(!w.document.querySelector("details.check"), "结算不再呈现折叠的「判定明细」（d100/目标/加值已全部隐藏）");

  /* ---------- 下野（软 BE）：afterEvent 补交代，游戏继续 ---------- */
  console.log("\n== 下野（软 BE）与硬结局 ==");
  P.G.tier = 3; P.G.rep = 60; P.G.flags = []; P.G.fallenShieldUntil = 0; P.G.fallenThisTurn = false;
  P.applyEffects({ fall: 1 });
  check(P.G.tier === 2 && P.G.flags.indexOf("fallen") >= 0, "fall 效果生效（T3→T2 + fallen 标记）");
  P.afterEvent();                                                  // 应渲染下野交代而不 ending
  check(P.SCREEN !== "ending", "下野是软 BE：不进终局，游戏继续");
  check(text().indexOf("你从台上走了下来") >= 0 || !!w.document.querySelector(".bs"), "afterEvent 出一页「下野」交代卡");
  /* hardEnd：终局收口 */
  P.G.hp = 100; P.G.pendingHardEnd = "disgrace";
  P.afterEvent();
  check(P.SCREEN === "ending", "hardEnd 直接收口进终局");
  check(text().indexOf("身败名裂") >= 0 || text().indexOf("史学家评语") >= 0, "终局页渲染（disgrace 规则）");

  /* 回到游戏，继续年终部分：重建年卡界面（ending 页把 #main 换掉了） */
  P.SCREEN = "game";
  P.G.endingReason = null; P.G.flags = [];
  P.startYear(true);

  /* 年终结算会顺带处理把柄贬值与人脉统计 */
  console.log("\n== 年终结算 ==");
  P.G.month = 12; P.G.yearHeads = ["【测试报】一条头条"];
  P.G.vigMonth = 0; P.G.quietMonths = [10, 11];
  P.G.quietLog = [10, 11].map(function (m) { return { year: P.G.year, month: m, text: m + " 月，岁末的日子。", gain: { attr: { INT: 1 }, hp: 0, rep: 0, contact: 0 } }; });
  P.endYear();
  check(!!w.document.querySelector(".yearcard"), "月历走完一年后渲染出年终结算卡");
  check(/年度结算/.test(text()), "年终结算卡标出「年度结算」");
  check(/平静的月份/.test(text()), "年终结算卡统计了平静的月份数");
  check(text().indexOf("平静的月份") >= 0, "年终卡统计了平静的月份数（文字已逐月出过，不再重复）");
  check(!!btn("进入"), "年终结算卡上有进入下一年的按钮");

  /* ---------- 两栏布局（v0.8+）：左=事件 #main，右=.col-right（上状态卡 + 下操作栏） ----------
     回归事故记忆（v0.5.5）：模板多写一个 </div> 会把 .grid 提前闭合、右栏掉到 #app 下。
     这里锁住「.grid 直接子元素 = main + col-right」与「.actbar 在右栏内」。 */
  console.log("\n== 两栏布局（左事件 · 右状态+操作） ==");
  const gridEl = w.document.querySelector(".grid");
  check(!!gridEl, "存在两栏容器 .grid");
  const kids = gridEl ? [...gridEl.children] : [];
  check(kids.length === 2, ".grid 恰好 2 个子元素（事件 / 右栏），实际 " + kids.length);
  check(!!gridEl && kids[0] && kids[0].id === "main", ".grid 第 1 列 = #main（事件正文）");
  check(!!gridEl && kids[1] && kids[1].classList.contains("col-right"), ".grid 第 2 列 = .col-right（状态+操作）——在右侧，不会掉到下面");
  const abEl = w.document.querySelector(".grid .col-right .actbar");
  check(!!abEl && kids[1] && abEl.closest(".col-right") === kids[1], ".actbar 在右栏内（操作不掉到栏目外）");
  check(!!w.document.querySelector(".grid #actbody"), "操作容器 #actbody 存在");

  /* ---------- 状态卡（v0.10 组件化）：.idc-flow 流式块 + 选区基本盘 + chips 行 ---------- */
  console.log("\n== 状态卡（组件化流式布局） ==");
  const sbBox = w.document.getElementById("statusbox");
  check(!!sbBox && !!sbBox.querySelector(".idc-flow"), "#statusbox 内有组件化容器 .idc-flow");
  const ocEl = w.document.querySelector(".statusbox .officecard");
  check(!!ocEl, "职位卡 .officecard 在状态卡内");
  check(!w.document.querySelector(".col-event .officecard"), "事件栏内无职位卡");
  check(!!ocEl && /选区 \d/.test(ocEl.textContent), "职位卡含选区规模读数");
  check(!!ocEl && /死忠/.test(ocEl.textContent) && /有好感/.test(ocEl.textContent) && /反对/.test(ocEl.textContent),
    "职位卡含选民三档（死忠/有好感/反对）");
  check(!!sbBox && !!sbBox.querySelector(".idc-chips .sbrow"), "状态卡含 chips 行（标签/派系/人脉）");
  check(!!sbBox && !!sbBox.querySelector(".idc-chip-toggle"), "窄屏折叠开关 .idc-chip-toggle 存在（桌面端由 CSS 隐藏）");
  const kickerEl = w.document.querySelector(".kicker-band");
  check(!!kickerEl && /第 \d+ 个年头/.test(kickerEl.textContent), "顶栏含「第 N 个年头」");
  check(!!kickerEl && !/[（(]\d{4}[）)]/.test(kickerEl.textContent), "时代名不再带年份后缀 (YYYY)");

  /* ---------- 悬浮说明气泡：必须挂在滚动边栏之外，才不会被 overflow:auto 裁切 ---------- */
  console.log("\n== 悬浮说明气泡（不越出边栏 / 不被裁切） ==");
  const tipAnchor = w.document.createElement("span");
  tipAnchor.className = "tag hastip";
  tipAnchor.setAttribute("data-tip", "这是一段足够长的悬浮说明，用来验证气泡既不会越出边栏，也不会被滚动容器裁掉。");
  const colLeft = w.document.querySelector(".col-left") || w.document.getElementById("app");
  colLeft.appendChild(tipAnchor);
  tipAnchor.dispatchEvent(new w.MouseEvent("mouseover", { bubbles: true }));
  const tip = w.document.getElementById("tipbox");
  check(!!tip, "悬停带 data-tip 的词条后创建了气泡 #tipbox");
  check(!!tip && tip.classList.contains("on"), "气泡已显示（.on）");
  check(!!tip && tip.textContent === tipAnchor.getAttribute("data-tip"), "气泡文字取自 data-tip");
  /* 关键回归：气泡必须挂在 <body>（#app 之外），不是 .col-left/.col-right 滚动容器里
     的后代 —— 否则会被 overflow:auto 裁掉（旧 ::after 方案就是栽在这里）。 */
  check(!!tip && tip.parentNode === w.document.body, "气泡挂在 <body> 上（在 #app / 边栏之外）");
  check(!!tip && !(tip.closest && tip.closest(".col-left,.col-right")), "气泡不在任何滚动边栏内（结构上免疫 overflow 裁切）");
  tipAnchor.dispatchEvent(new w.MouseEvent("mouseout", { bubbles: true, relatedTarget: w.document.body }));
  check(!!tip && !tip.classList.contains("on"), "移开后气泡收起");

  /* ---------- 选民动态（v0.6）：会自己动 + 影响晋升，且玩家看得见 ---------- */
  console.log("\n== 选民动态（自然增减 / 影响晋升 / 界面可见） ==");
  const vG = P.G;
  vG.tier = 1;                                     /* 选区 6 万 */
  vG.voters = { warm: 0, diehard: 0, oppose: 0 };
  vG.rep = 30; vG.track = "electoral";
  check(!!w.document.querySelector(".statusbox .officecard"), "职位卡在状态卡内");
  /* 推进若干平静月：选民应当自己长起来（这是"没实装"的直接反证） */
  for (let i = 0; i < 24; i++) P.voterDrift();
  const vpNow = P.voterPools();
  check(vpNow.warm > 0 && vpNow.diehard > 0 && vpNow.oppose > 0,
    "24 个平静月后三档都不再是 0（" + vpNow.warm + "/" + vpNow.diehard + "/" + vpNow.oppose + "）");
  check(vpNow.warm > vpNow.oppose, "「有好感」涨得比「反对」多（自然增长是正收益）");
  P.refreshPanel();
  const ocTxt = (w.document.querySelector(".statusbox .officecard") || {}).textContent || "";
  check(/死忠\s*\d/.test(ocTxt) && /有好感\s*\d/.test(ocTxt) && /反对\s*\d/.test(ocTxt),
    "职位卡把三档人数显示出来了");
  check(/底气 \d+\/100/.test(ocTxt), "职位卡显示底气读数：" + (ocTxt.match(/底气 \d+\/100/) || [""])[0]);
  check(!!w.document.querySelector(".statusbox .vbar"), "基本盘占比条（.vbar）已随三档人数渲染");
  /* chip 幅度底色：派系/人脉按正负 + 幅度分档上淡底（三档封顶） */
  P.G.faction.base = 45; P.refreshPanel();
  check(!!w.document.querySelector('.statusbox .qchip.tint-p3'), "派系 chip 幅度底色分档（|v|≥40 → tint-p3）");
  /* v0.9：选民增减已从「静好成长」迁到「每月的账」——落在 monthlyLedger.voters，由合并卡账目栏报出 */
  P.G.year = 2010; P.G.ledgerYear = 2010; P.G.ledger = {};
  const vrec = P.monthlyLedger(6);
  check(!!vrec && !!vrec.voters && Object.keys(vrec.voters).length > 0,
    "每月的账里含选民变化（monthlyLedger.voters）");
  check(/选民/.test(P.ledgerBoxHTML([vrec])), "合并卡账目栏报出选民变化（好感/死忠/反对在动）");
  check(!P.vignetteGrowth(3).tally.voters || Object.keys(P.vignetteGrowth(3).tally.voters).length === 0,
    "静好成长不再重复结选民（voterDrift 已归 monthlyLedger 单点）");
  /* 晋升类选项吃选民修正（判定明细则在真实结算里显示） */
  const contestCh = { base: 0.5, outcomes: { ok: { effects: { tier: 1 } } } };
  check(P.isContestChoice(contestCh), "晋升类选项被识别（会自动吃选民底气修正）");
  vG.voters = { warm: 60000, diehard: 20000, oppose: 1000 };
  const pHi3 = P.computeP(contestCh);
  vG.voters = { warm: 0, diehard: 0, oppose: 0 };
  const pLo3 = P.computeP(contestCh);
  check(pHi3.P > pLo3.P, "票仓扎实时晋升胜算更高（" + pLo3.P.toFixed(3) + " → " + pHi3.P.toFixed(3) + "）");
  check(pHi3.breakdown.some(b => /选民底气/.test(b.label)), "判定明细含「选民底气」一行");

  console.log("\n" + (fail === 0 ? "=== UI 冒烟全部通过 ===" : "=== UI 冒烟 " + fail + " 项失败 ==="));
  w.close();
  process.exit(fail === 0 ? 0 : 1);
})().catch(e => { console.error("× UI 冒烟崩溃：" + e.message + "\n" + (e.stack || "").split("\n").slice(1, 5).join("\n")); process.exit(1); });
