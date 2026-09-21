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

  console.log("\n== 标题 → 建角 ==");
  check(text().indexOf("开始新游戏") >= 0, "标题屏渲染出「开始新游戏」");
  w.document.querySelector("button.primary").click();
  check(text().indexOf("创建角色") >= 0, "点击后进入建角屏");
  const opts = w.document.querySelectorAll(".opt");
  check(opts.length >= 20, "建角选项被注册表自动生成（" + opts.length + " 个）");
  for (const k of ["era", "origin", "talent", "entry", "party", "stance", "state"]) {
    w.document.querySelector('.opt[onclick*="\'' + k + '\'"]').click();
  }
  /* v0.5：还要掷一次骰，建角才算齐 */
  w.document.getElementById("rollBtn").click();
  check(!!P.CSEL.rolled, "掷骰完成（CSEL.rolled）");
  P.CSEL.name = "测试者";
  const goBtn = btn("进入");
  check(!!goBtn && !goBtn.disabled, "选满 6 项后「进入」按钮解禁");
  goBtn.click();
  check(!!P.G && P.G.name === "测试者", "开局成功，P.G 已建立");
  check(w.document.body.className.indexOf("era-") === 0, "时代皮肤已应用到 body");
  check(Array.isArray(P.G.monthPlan) && Array.isArray(P.G.doneIds), "存档结构已切到月回合（monthPlan / doneIds）");

  /* ---------- 年卡 → 月历卡 → 档期 ---------- */
  console.log("\n== 年卡 → 月历卡 → 档期 ==");
  check(text().indexOf("时代简报") >= 0, "开局显示时代简报");
  check(/时代压力/.test(text()), "年卡上标出时代压力");
  check(/此刻存在的媒介/.test(text()), "年卡上列出本年存在的媒介");
  const yBtn = btn("进入 1 月");
  check(!!yBtn, "年卡上有「进入 1 月 →」按钮");
  yBtn.click();
  check(!!w.document.querySelector(".mstrip"), "点击后进入月历卡（含月历条）");
  check(!!w.document.querySelector(".mlabel.now"), "月历条标出本月");
  check(P.G.month >= 1 && P.G.month <= 12, "月份落在 1-12：" + P.G.month);
  check(/\d{4} 年 \d+ 月/.test(w.document.querySelector(".masthead .meta").textContent),
    "报头显示当前年月：" + w.document.querySelector(".masthead .meta").textContent.split("　")[0]);
  check(!!w.document.querySelector(".topstat") && /\d+ 年 \d+ 月/.test(w.document.querySelector(".topstat").textContent), "顶部状态条显示当前日期");
  const sBtn = btn("继续");
  check(!!sBtn, "年卡上有「继续 →」按钮");
  sBtn.click();
  /* v0.5.2：1 月可能有事（选项）也可能平静（月卡）——两条路都合法 */
  check(w.document.querySelectorAll(".choice").length > 0 || !!w.document.querySelector(".quietcard") || !!w.document.querySelector(".mstrip"),
    "继续后进入 1 月：有事的月历卡或平静的月卡（渲染出了当月界面）");

  /* ---------- 日期 + 量级 / 类型 / 媒介徽章 ---------- */
  console.log("\n== 日期 / 量级 / 类型 / 媒介 ==");
  const crash = P.events.find(e => e.id === "2008_crash_offer");
  check(!!crash, "找到 2008 救市事件");
  P.G.year = 2008;
  P.G.month = 9;                     // 救市事件钉在 9 月 24 日
  P.presentEvent(crash, { grade: "major" });
  const dt = w.document.querySelector(".dateline .dt");
  check(!!dt && dt.textContent === "2008 年 9 月 24 日", "事件卡顶部显示精确日期：" + (dt && dt.textContent));
  check(!!w.document.querySelector(".dateline .gchip.g-major"), "事件卡标出量级徽章「大事件」");
  check(/危机/.test(w.document.querySelector(".dateline").textContent), "事件卡标出类型「危机」");
  check(!!w.document.querySelector(".topstat") && w.document.querySelector(".topstat").textContent.indexOf("2008 年 9 月") >= 0, "顶部状态条同步当前日期");
  P.setMonth({ month: 3, day: 12 });
  check(P.G.month === 9, "更早的月份不应让时间回退（当前月仍为 9）");

  /* 媒介徽章：短视频事件在 2025 年可发生，在 1960 年不可 */
  const clip = P.events.find(e => e.id === "media_viral_clip");
  P.G.year = 2025;
  check(P.mediumOK(clip), "2025 年短视频事件可发生");
  P.presentEvent(clip, { grade: "major" });
  check(/短视频/.test(w.document.querySelector(".dateline").textContent), "媒介徽章显示「短视频」");
  P.G.year = 1960;
  check(!P.mediumOK(clip), "1960 年短视频事件不可发生（媒介门控生效）");
  P.G.year = 2008;

  /* ---------- 事件配图：照片层 + 缺图退 SVG ---------- */
  console.log("\n== 事件配图（照片 / 程序化 SVG 降级） ==");
  P.G.month = 9;
  P.presentEvent(crash, { grade: "major" });     // crash 是「危机」类型，有照片
  const fig = w.document.querySelector(".news .art.art-photo");
  check(!!fig, "有照片的类型在事件卡上渲染成照片卡（.art-photo）");
  const pimg = fig && fig.querySelector("img");
  check(!!pimg, "照片卡里有 <img>");
  check(!!pimg && pimg.getAttribute("src").indexOf("assets/events/crisis.jpg") >= 0,
    "照片指向登记的文件：" + (pimg && pimg.getAttribute("src")));
  check(!!pimg && /art-photo-broken/.test(pimg.getAttribute("onerror") || ""),
    "照片挂了加载失败的降级钩子（onerror）");
  const tag = fig && fig.querySelector(".art-tag");
  check(!!tag && tag.textContent === "危机", "照片角标写着类型名：" + (tag && tag.textContent));
  const back = fig && fig.querySelector(".art-back");
  check(!!back && !!back.querySelector("svg"), "照片底下垫着同类型的程序化 SVG（缺图时顶上）");
  /* 真的把加载失败演一遍：派发 error 事件，卡片应切到「破图态」 */
  if (pimg) {
    try { pimg.dispatchEvent(new w.Event("error")); } catch (e) { /* jsdom 不编译内联处理器时跳过 */ }
    const broke = fig.classList.contains("art-photo-broken");
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
    check(!w.document.querySelector(".news .art-photo"), "没照片的类型（" + npEv.category + "）不渲染照片卡");
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
  P.G.fun = 50000;                       // 手动压到穷状态（基础盘 startFun 已是 1 万，这里独立设置）
  P.presentEvent(gala, { grade: "minor" });
  const chBtns = [...w.document.querySelectorAll(".choice")];
  check(chBtns.length === gala.choices.length, "渲染出全部选项");
  const floorBtn = chBtns[0];
  check(floorBtn.disabled, "$750k 的选项在只有 $50k 时被禁用");
  check(floorBtn.textContent.indexOf("缺少资金") >= 0, "并给出「缺少资金」提示");
  check(chBtns[1].textContent.indexOf("代价：资金 $120k") >= 0, "付得起的选项显示代价标签：代价：资金 $120k");
  check(chBtns[1].textContent.indexOf("可投入资源") >= 0, "带 stake 的选项标注「可投入资源」");

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
  check(!!w.document.getElementById("stFunPlus") && !!w.document.getElementById("stApPlus") && !!w.document.getElementById("stFav"),
    "面板列出 资金 / 精力 / 人情 三种投入方式");
  check(w.document.getElementById("choices").style.display === "none", "投注时选项列表被收起来");
  const target0 = parseInt(w.document.querySelector(".check-preview b").textContent, 10);
  w.document.getElementById("stFunPlus").click();
  w.document.getElementById("stFunPlus").click();
  w.document.getElementById("stApPlus").click();
  w.document.getElementById("stFav").click();
  const target1 = parseInt(w.document.querySelector(".check-preview b").textContent, 10);
  check(target1 > target0, "加码后判定目标值上升：" + target0 + " → " + target1);
  check(w.document.querySelector(".check-preview").textContent.indexOf("投入") >= 0, "预览区列出「投入·…」明细");

  /* ---------- 投注上限护栏（玩家反馈的 bug） ---------- */
  console.log("\n== 投注上限护栏 ==");
  const rowOf = (lbl) => [...w.document.querySelectorAll(".stake-row")].find(r => r.querySelector("b").textContent === lbl);
  const valOf = (lbl) => parseInt(rowOf(lbl).querySelector(".stake-val").textContent.replace(/[^0-9]/g, ""), 10);
  const openStake = () => { w.document.querySelectorAll(".choice")[idx].click(); };

  /* 精力：每点 +3%、上限 +9% → 只能投 3 点。过去能一路 + 到 12 点，第 4 点起纯属白花。 */
  w.document.getElementById("stBack").click();
  P.G.fun = 3000000; P.G.ap = 12; P.G.fav = 3;
  openStake();
  check(P.stakeMax("ap", allIn) === 3, "精力上限 = cap÷w = 3 点（身上有 12 点也一样）");
  for (let i = 0; i < 8; i++) { const b = w.document.getElementById("stApPlus"); if (b && !b.disabled) b.click(); }
  check(valOf("精力") === 3, "连按 8 次 ＋ 后仍停在 3 点（实际 " + valOf("精力") + "）");
  check(w.document.getElementById("stApPlus").disabled, "到顶后 ＋ 按钮被置灰（不再是「点了没反应」的活按钮）");
  check(rowOf("精力").textContent.indexOf("已达上限") >= 0, "并说明原因：已达上限 +9%（最多 3 点）");
  const apOver = P.stakeInfo(allIn, { fun: 0, ap: 99 });
  check(apOver.cost.ap === 3, "即便参数被灌成 99，也只扣 3 点精力（实际 " + apOver.cost.ap + "）");

  /* 资金：一档都投不起时，过去是"点了没反应" —— 现在置灰 + 说明原因 */
  w.document.getElementById("stBack").click();
  P.G.fun = 1000;
  openStake();
  check(P.stakeMax("fun", allIn) === 0, "钱不够一档（$250k）时资金上限为 0");
  check(w.document.getElementById("stFunPlus").disabled, "资金 ＋ 被置灰");
  check(rowOf("资金").textContent.indexOf("资金不足") >= 0, "并说明原因：资金不足，每档需 $250k");
  check(valOf("资金") === 0, "未投入任何资金");

  /* 资金：够钱时上限也被 cap÷w 夹住，不会花光全部家当买 0 收益 */
  w.document.getElementById("stBack").click();
  P.G.fun = 500000000;
  openStake();
  const richMax = P.stakeMax("fun", allIn);
  for (let i = 0; i < 40; i++) { const b = w.document.getElementById("stFunPlus"); if (b && !b.disabled) b.click(); }
  check(valOf("资金") === richMax * 250, "连按 40 次 ＋ 后停在 " + (richMax * 250) + "k（= " + richMax + " 档 × $250k），而不是全部家当");
  check(w.document.getElementById("stFunPlus").disabled, "资金到顶后 ＋ 同样置灰");
  check(P.stakeInfo(allIn, { fun: 40 }).bonus <= 0.3000001, "资金加成不超过上限 +30%");

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
  console.log("\n== 确认判定 → 掷骰 → D&D 明细 ==");
  w.document.querySelectorAll(".choice")[idx].click();
  w.document.getElementById("stFunPlus").click();
  w.document.getElementById("stFav").click();
  const funBefore2 = P.G.fun, apBefore2 = P.G.ap, favBefore2 = P.G.fav;
  w.document.getElementById("stGo").click();
  await sleep(900);
  const checkBox = w.document.querySelector(".check");
  check(!!checkBox, "出现 D&D 判定明细卡");
  const checkTxt = checkBox.textContent.replace(/\s+/g, " ");
  check(/d100 = \d+.*／ 目标 \d+/.test(checkTxt), "明细含「d100 = X ／ 目标 Y」：" + checkTxt.split("／")[0].trim());
  check(/重投 \d+ \/ \d+ 取优/.test(checkTxt), "重投时同时展示两次骰值（取优）");
  check(checkBox.textContent.indexOf("重投") >= 0, "投入人情后显示「重投（取优）」");
  check(checkBox.querySelector(".mods").textContent.indexOf("基础") === 0, "明细列出修饰符拆分（基础/属性/派系/投入）");
  check(!!w.document.querySelector(".paid"), "明细列出已消耗资源");
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
  P.G.contacts = { columnist: 34, fixer: -25 };

  const showdown = P.events.find(e => e.id === "archive_showdown");
  check(!!showdown, "档案链第三幕（摊牌）已注册");
  P.presentEvent(showdown, { grade: "major" });

  /* 状态面板：把柄份数 + 人脉（用登记表里的名字，不是 id） */
  const panelTxt = w.document.querySelector(".panel").textContent;
  check(panelTxt.indexOf("把柄 2 份") >= 0, "状态面板显示把柄份数：" + (panelTxt.match(/把柄 \d+ 份/) || [""])[0]);
  check(panelTxt.indexOf("专栏作家") >= 0 && panelTxt.indexOf("老雷") >= 0, "人脉列表用登记表里的名字（专栏作家 / 老雷）");
  check(panelTxt.indexOf("人脉") >= 0, "状态面板有「人脉」一节");
  check(panelTxt.indexOf("在位") >= 0, "状态面板显示当前层级的在位月数");

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
  check(chain.textContent.indexOf("地下室里没有编号的那一格") >= 0, "承前条写出上一幕的标题");
  check(chain.textContent.indexOf("4 个月前") >= 0, "承前条写出相隔多久：" + (chain.textContent.match(/\d+ 个月前/) || [""])[0]);
  /* 没有前情的事件不该长出承前条 */
  P.presentEvent(kill, { grade: "mid" });
  check(!w.document.querySelector(".chain"), "没有 after 的事件不渲染承前条");

  /* ---------- 静好岁月：平静的月份也要有日子可看、有人可长 --------------
   * 这里不靠随机数：直接给出"已经结算好的" quietLog（含成长明细），
   * 断言的是渲染逻辑本身 —— 随机那一部分由 validate.js 的 300 局模拟覆盖。 */
  console.log("\n== 静好岁月（逐月出卡：这个月做了什么 + 这个月的账） ==");
  /* v0.5.2：平静月单独出卡（renderQuietMonthCard），旧的合并渲染仍保留给月历卡用 */
  P.G.year = 2010; P.G.month = 3; P.G.vigYear = 2010; P.G.vigMonth = 0;
  P.G.quietMonths = [1, 2];
  P.G.quietLog = [
    { year: 2010, month: 1, text: "一月。雪下了一场又一场，早上先铲出车道才能出门。", gain: { attr: { CHA: 1 }, hp: 0, rep: 1, contact: 0, fun: 0, ap: 0, fav: 0 } },
    { year: 2010, month: 2, text: "二月，残冬。你把手头的事一件一件地做完。", gain: { attr: { CHA: 1, INT: 1 }, hp: 0, rep: 0, contact: 0, fun: 0, ap: 0, fav: 0 } }
  ];
  /* 平静月的月卡：具体工作 + 账目（工资/开销/结余） + 逐月继续按钮 */
  P.G.month = 1;
  const funB4 = P.G.fun;
  P.renderQuietMonthCard();
  check(!!w.document.querySelector(".quietcard"), "平静月渲染出独立的月卡（.quietcard）");
  check(!!w.document.querySelector(".quietwork"), "月卡上有「这个月」工作行");
  const qwTxt = w.document.querySelector(".qw-text").textContent;
  check(qwTxt.length >= 10, "工作行是具体的一件事：" + qwTxt.slice(0, 30) + "…");
  check(!!w.document.querySelector(".gainbox"), "月卡上有「这个月的账」");
  const acctTxt = w.document.querySelector(".gainbox").textContent;
  check(acctTxt.indexOf("工资") >= 0 && acctTxt.indexOf("开销") >= 0 && acctTxt.indexOf("结余") >= 0,
    "账目含 工资/开销/结余：" + acctTxt.replace(/\s+/g, " ").slice(0, 60));
  check(P.G.fun !== funB4, "工资-开销当场入账（$" + (funB4 / 1000).toFixed(0) + "k → $" + (P.G.fun / 1000).toFixed(0) + "k）");
  check(!!btn("继续"), "平静月也有「继续 →」（逐月手动推进）");
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

  /* ---------- 大模型：不接也完全能玩；接上之后失败也必须保住原文 ---------- */
  console.log("\n== 大模型（可选，不接也能玩） ==");
  P.llm.clearConfig();
  P.G.vigMonth = 0; P.G.quietLog = [{ year: 2010, month: 1, text: "一月。这是引擎原本拼好的文字。", gain: {} }];
  P.renderMonthCard([1]);
  let aiBtn = [...w.document.querySelectorAll(".vig-act button")].find(function (b) { return b.textContent.indexOf("接入大模型") >= 0; });
  check(!!aiBtn, "没接大模型时，卡片上给的是「接入大模型来润色」入口");
  if (aiBtn) aiBtn.click();
  const aiModal = w.document.querySelector(".modal");
  check(!!aiModal && /接入大模型/.test(aiModal.textContent), "点击后弹出设置面板");
  check(!!aiModal && /跨域/.test(aiModal.textContent), "面板里讲清了 file:// 打开时的跨域限制");
  w.document.getElementById("aiOn").checked = true;
  w.document.getElementById("aiEp").value = "https://example.invalid/v1/chat/completions";
  w.document.getElementById("aiModel").value = "smoke-model";
  w.document.getElementById("aiKey").value = "sk-smoke-test";
  w.document.getElementById("aiSave").click();
  check(P.llm.ready() === true, "保存后适配层进入「已配置」状态");
  check(/已接/.test(w.document.querySelector(".toolbar .btn.ai").textContent), "工具条上的 AI 按钮同步成「已接」");
  const aiClose = w.document.getElementById("aiClose"); if (aiClose) aiClose.click();
  P.renderMonthCard([1]);
  aiBtn = [...w.document.querySelectorAll(".vig-act button")].find(function (b) { return b.textContent.indexOf("让 AI 润色") >= 0; });
  check(!!aiBtn, "接上之后卡片上出现「让 AI 润色」");
  if (aiBtn) aiBtn.click();
  check(w.document.querySelector(".vig-body").textContent.indexOf("这是引擎原本拼好的文字") >= 0,
    "请求未回/失败时，正文仍是引擎拼好的那一段（离线优先）");
  check(!!w.document.querySelector(".vig-status"), "给出进行中/失败的状态提示，而不是静默卡住");
  P.llm.clearConfig();
  check(P.llm.ready() === false, "清空配置后回到未配置状态（游戏本身不依赖网络）");

  /* ---------- v0.5：掷骰建角 / VIP / 州选择 / 收益面板 / 选项说明 / 下野 ---------- */
  console.log("\n== v0.5 掷骰建角 / VIP / 州 / 收益面板 / 下野 ==");
  w.document.querySelector("button").click();                       // 回标题（退出按钮在工具条最左？不——直接重开）
  P.renderTitle();
  w.document.querySelectorAll("button");                            // 触发一次渲染
  P.startCreate();
  check(text().indexOf("出生州") >= 0, "建角屏出现「出生州」选择组");
  check(text().indexOf("定命一掷") >= 0, "建角屏出现「定命一掷」掷骰块");
  /* 州选项 */
  const stateOpts = [...w.document.querySelectorAll('.opt[onclick*="\'state\'"]')];
  check(stateOpts.length >= 5, "州选项被注册表自动生成（" + stateOpts.length + " 个）");
  check(stateOpts.some(o => o.textContent.indexOf("摇摆州") >= 0 || o.textContent.indexOf("民主党地盘") >= 0 || o.textContent.indexOf("共和党地盘") >= 0),
    "州选项标注了政治倾向");
  stateOpts[0].click();
  check(P.CSEL.state !== null, "州被选中");
  /* 掷骰块 */
  const rollBtn = w.document.getElementById("rollBtn");
  check(!!rollBtn, "掷骰按钮存在");
  rollBtn.click();
  check(!!P.CSEL.rolled && ["CHA", "INT", "CUN", "INTG"].every(k => typeof P.CSEL.rolled[k] === "number"),
    "掷出四属性");
  check(w.document.querySelectorAll(".rattr").length === 4, "四张属性牌渲染出来");
  check(!!w.document.getElementById("vipcode"), "掷骰块里出现 VIP 充值码输入");
  /* 加点按钮真实可点 */
  const plusBtn = w.document.querySelector("[data-spend=\"CHA,1\"]");
  check(!!plusBtn && !plusBtn.disabled, "魅力 ＋ 按钮可点");
  if (plusBtn) { const before = P.CSEL.rolled.CHA + (P.CSEL.spent.CHA || 0); plusBtn.click(); const after = P.CSEL.rolled.CHA + (P.CSEL.spent.CHA || 0); check(after === before + 1, "点击 ＋ 后魅力加 1 点（" + before + "→" + after + "）"); }
  const minusBtn = w.document.querySelector("[data-spend=\"CHA,-1\"]");
  if (minusBtn) minusBtn.click();
  /* VIP 码：测试阶段无限用 */
  w.localStorage.removeItem("potus_vip_used");
  const vipInput = w.document.getElementById("vipcode");
  const vipBtn = w.document.getElementById("vipBtn");
  check(!!vipInput && !!vipBtn, "充值码输入框与兑换按钮存在");
  const freeBefore = P.CSEL.freeExtra || 0;
  if (vipInput && vipBtn) {
    vipInput.value = "VIP5";
    vipBtn.click();
    check((P.CSEL.freeExtra || 0) === freeBefore + 5, "兑换 VIP5 后自由点 +5（" + freeBefore + "→" + P.CSEL.freeExtra + "）");
    check(text().indexOf("VIP +5") >= 0, "界面显示「含 VIP +5」");
    /* 第二次兑换：renderCreate 会重建 DOM，必须重新取输入框再填再点 */
    const vipInput2 = w.document.getElementById("vipcode");
    const vipBtn2 = w.document.getElementById("vipBtn");
    vipInput2.value = "VIP5";
    vipBtn2.click();                                               // 测试阶段同码可无限用
    check((P.CSEL.freeExtra || 0) === freeBefore + 10, "测试阶段同一个码可无限重复兑换（" + freeBefore + "→+" + ((P.CSEL.freeExtra || 0) - freeBefore) + "）");
  }
  /* 建角走完整流程 */
  for (const k of ["era", "origin", "talent", "entry", "party", "stance", "state"]) {
    const o = w.document.querySelector(".opt[onclick*=\"" + k + "\"]");
    if (o) o.click();
  }
  P.CSEL.name = "掷骰测试者";
  const goBtn2 = btn("进入");
  check(!!goBtn2 && !goBtn2.disabled, "掷骰+选州+选满后「进入」按钮解禁");
  goBtn2.click();
  check(!!P.G && P.G.state !== "", "开局成功且记录了出生州");
  check(!!w.document.querySelector(".topstat") && /\d+ 年 \d+ 月/.test(w.document.querySelector(".topstat").textContent), "顶部状态条显示日期");
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
  /* 事件卡主次顺序：正文 body 在插画 art 之前 */
  const newsEl = w.document.querySelector(".news");
  const bodyEl = newsEl && newsEl.querySelector(".body");
  const artEl = newsEl && newsEl.querySelector(".art");
  if (bodyEl && artEl) {
    check(bodyEl.compareDocumentPosition(artEl) & w.document.defaultView.Node.DOCUMENT_POSITION_FOLLOWING,
      "事件卡顺序：正文在配图之前（描述→图→选项）");
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
  const checkDet = w.document.querySelector("details.check");
  check(!!checkDet, "判定明细改成折叠（details.check）");
  check(!!checkDet && !checkDet.open, "判定明细默认收起");
  check(!!checkDet && checkDet.querySelector("summary").textContent.indexOf("判定明细") >= 0,
    "摘要行直接可见 d100 与目标");

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

  console.log("\n" + (fail === 0 ? "=== UI 冒烟全部通过 ===" : "=== UI 冒烟 " + fail + " 项失败 ==="));
  w.close();
  process.exit(fail === 0 ? 0 : 1);
})().catch(e => { console.error("× UI 冒烟崩溃：" + e.message + "\n" + (e.stack || "").split("\n").slice(1, 5).join("\n")); process.exit(1); });
