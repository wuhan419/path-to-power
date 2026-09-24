/* ============================================================================
 * POTUS ENGINE · progression.js
 * 终局判定（声明式规则，内容可增删）+ 结局页渲染。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* 是否选举年（周期可被 balance 覆盖） */
  P.electionYear = function () {
    const b = P.balance(), w = P.reg.worldline || {}, era = P.reg.era[P.G.era] || { startYear: P.G.year };
    const base = w.electionBase != null ? w.electionBase : era.startYear;
    const cycle = w.electionCycle || era.electionCycle || b.midtermCycle || 2;
    return (P.G.year - base) % cycle === 0;
  };

  /* 声明式条件求值：直接交给统一的 P.when()（engine/when.js）。
   * 结局规则用的 trackIn / ageMin / repMin / reason 等拼写都被 when.js 认成别名，
   * 所以这里不再自己维护一套词汇 —— 三套老词汇已经合成一套。 */
  function matchWhen(when) {
    if (!when) return true;
    return P.when(when);
  }

  /* 选出最高优先级且命中的结局规则 */
  P.evaluateEnding = function (reason) {
    P.G.endingReason = reason || "default";
    const rules = P.reg.ending.slice().sort(function (a, b) { return (b.priority || 0) - (a.priority || 0); });
    for (let i = 0; i < rules.length; i++) if (matchWhen(rules[i].when)) return rules[i];
    return { title: P.t("ui.progression.endMidpointTitle", "中场"), grade: "C", body: P.t("ui.progression.endMidpointBody", "故事仍在继续，但这一局到此为止。") };
  };

  /* 评分（权重可被 balance.scoreWeights 覆盖） */
  P.scores = function () {
    const w = Object.assign({ tier: 20, rep: 1, intg: 2, scandal: -15, prison: -40 }, P.balance().scoreWeights);
    const sc = P.scandalLevel();
    const prison = P.hasFlag("prison") ? 1 : 0;
    return {
      power: P.G.tier * w.tier + P.G.rep * w.rep,
      moral: P.G.attr.INTG * w.intg + sc * w.scandal + prison * w.prison
    };
  };

  P.ending = function (reason) {
    P.SCREEN = "ending";
    /* 结局屏是单页长文，撤下 body.game 的「整屏固定高度 + 栏内自滚」布局，避免被裁切（保留 era 皮肤） */
    document.body.className = "era-" + P.G.era;
    const rule = P.evaluateEnding(reason);
    const s = P.scores();
    const era = P.reg.era[P.G.era] || { name: P.G.era };
    const track = P.reg.track[P.G.track] || { name: P.G.track };
    const party = P.reg.party[P.G.party] || { name: P.G.party };
    const stance = P.reg.stance[P.G.stance] || { name: P.G.stance };
    /* v0.11 P1 成就结算要素：峰值职位（下野后仍记最高点）、是否曾任总统、生涯跨度 */
    const peak = (P.G.peakTier != null ? P.G.peakTier : P.G.tier);
    const peakOffice = (P.officeNameAt ? P.officeNameAt(peak) : "") || P.t("ui.progression.tierLevel", "等级 {n}", { n: peak + 1 });
    const wasPresident = P.hasFlag("president_done");
    const startYear = era.startYear || (P.G.year - ((P.G.age || 0) - (P.balance().startAge || 24)));
    let body = rule.body || "";
    if (typeof body === "function") body = body(P.G, P);
    body = String(body).replace("{age}", P.G.age).replace("{tier}", P.G.tier).replace("{track}", track.name);
    const bio = P.makeNews(P.t("ui.progression.careerFinal", "生涯终章：{title}", { title: rule.title }));
    P.G.history.push(bio);
    P.app().innerHTML =
      '<div class="ending fade">' +
      "<h1>" + rule.title + "</h1>" +
      '<div class="grade">' + (rule.grade || "C") + "</div>" +
      '<div class="news"><div class="dateline">' + P.t("ui.progression.historian", "史学家评语") + '</div><div class="body">' + body + "</div></div>" +
      '<div class="news"><div class="dateline">' + P.t("ui.progression.scoreTitle", "评分") + '</div><div class="body">' +
      (P.G.endingReason === "career_end"
        ? P.t("ui.progression.careerSpan", "政治生涯 {y0}—{y1}（{n} 年）", { y0: startYear, y1: P.G.year, n: P.G.year - startYear + 1 }) + "<br>"
        : "") +
      P.t("ui.progression.scoreLine", "权力分数 {power} ｜ 道德分数 {moral}", { power: s.power, moral: s.moral }) + "<br>" +
      P.t("ui.progression.rankLine", "最高职务 {office}（等级 {tier}·{track}）｜ {party}/{stance}", { office: peakOffice, tier: peak + 1, track: track.name, party: party.name, stance: stance.name }) +
      "<br>" +
      P.t(wasPresident ? "ui.progression.wasPresident" : "ui.progression.noPresident",
        wasPresident ? "✓ 曾入主白宫" : "— 未入白宫") + "<br>" +
      P.t("ui.progression.finalLine", "终局年龄 {age} ｜ 净资产 ${net}k ｜ 丑闻等级 {scandal}", { age: P.G.age, net: (P.G.fun / 1000).toFixed(0), scandal: P.scandalLevel() }) + "</div></div>" +
      '<div class="center" style="margin-top:14px">' +
      '<button class="btn primary" onclick="POTUS.renderTitle()">' + P.t("ui.progression.backTitle", "回到标题") + '</button> ' +
      '<button class="btn" onclick="POTUS.exportSave()">' + P.t("ui.progression.exportSave", "导出本局") + '</button></div>' +
      '<p class="hintline">' + P.t("ui.progression.engineNote", "引擎 v{v}。内容包可继续扩充，引擎无需改动。", { v: P.VERSION }) + "</p></div>";
    P.pushLog(P.t("ui.progression.endLog", "终局：{title} ({grade})", { title: rule.title, grade: (rule.grade || "C") }));
  };
})();
