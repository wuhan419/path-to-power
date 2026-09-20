/* ============================================================================
 * POTUS ENGINE · progression.js
 * 终局判定（声明式规则，内容可增删）+ 结局页渲染。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* 是否选举年（周期可被 balance 覆盖） */
  P.electionYear = function () {
    const b = P.balance(), era = P.reg.era[P.G.era] || { startYear: P.G.year };
    const cycle = era.electionCycle || b.midtermCycle || 2;
    return (P.G.year - era.startYear) % cycle === 0;
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
    return { title: "中场", grade: "C", body: "故事仍在继续，但这一局到此为止。" };
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
    const rule = P.evaluateEnding(reason);
    const s = P.scores();
    const era = P.reg.era[P.G.era] || { name: P.G.era };
    const track = P.reg.track[P.G.track] || { name: P.G.track };
    const party = P.reg.party[P.G.party] || { name: P.G.party };
    const stance = P.reg.stance[P.G.stance] || { name: P.G.stance };
    let body = rule.body || "";
    if (typeof body === "function") body = body(P.G, P);
    body = String(body).replace("{age}", P.G.age).replace("{tier}", P.G.tier).replace("{track}", track.name);
    const bio = P.makeNews("生涯终章：" + rule.title);
    P.G.history.push(bio);
    P.app().innerHTML =
      '<div class="ending fade">' +
      "<h1>" + rule.title + "</h1>" +
      '<div class="grade">' + (rule.grade || "C") + "</div>" +
      '<div class="news"><div class="dateline">史学家评语</div><div class="body">' + body + "</div></div>" +
      '<div class="news"><div class="dateline">评分</div><div class="body">权力分数 ' + s.power + " ｜ 道德分数 " + s.moral + "<br>" +
      "最高层级 T" + P.G.tier + "（" + track.name + "）｜ " + party.name + "/" + stance.name + "<br>" +
      "终局年龄 " + P.G.age + " ｜ 净资产 $" + (P.G.fun / 1000).toFixed(0) + "k ｜ 丑闻等级 " + P.scandalLevel() + "</div></div>" +
      '<div class="center" style="margin-top:14px">' +
      '<button class="btn primary" onclick="POTUS.renderTitle()">回到标题</button> ' +
      '<button class="btn" onclick="POTUS.exportSave()">导出本局</button></div>' +
      '<p class="hintline">引擎 v' + P.VERSION + "。内容包可继续扩充，引擎无需改动。</p></div>";
    P.pushLog("终局：" + rule.title + " (" + (rule.grade || "C") + ")");
  };
})();
