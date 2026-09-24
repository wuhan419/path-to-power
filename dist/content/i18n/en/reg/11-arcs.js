/* ============================================================================
 * CONTENT · i18n/en/reg/11-arcs.js
 * 中文文件 content/11-arcs.js（主线剧情线）的英文覆盖层。
 *
 * ⚠ 现状：index.html 里 `content/11-arcs.js` 已被注释停用（"玩法大改造——多支路
 *   主线砍掉"），boot 时 P.reg.arc 是空表。若无脑并进，覆盖层会在注册表里凭空
 *   造出 8 条"只有英文名、没有 stages"的幽灵主线（validate 记 36 处 missed）。
 *   因此本分片**自带对齐守卫**：只并 reg.arc 里真实存在、且 stages 条数与本层
 *   完全一致的条目；一条不满足就整条跳过。将来 11-arcs.js 回装进清单，本层
 *   自动生效，无需改动。
 *
 * 契约（详见 docs/I18N.md §3）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的展示字段**：name / lede /
 *     stages[].title（"风向"面板与 engine/arc.js 的 stepTitle 读这三处）。
 *   · arc 在 reg 里是「arc id → 定义」的对象：按 id 深合并。
 *   · stages 是无 id 的对象数组 → **按数组下标对齐**：条数与顺序和原文完全一致，
 *     每条只覆盖 title，不碰 events / maxMonths。
 *   · priority / gate / cats / endWhen / onEnd 是逻辑（gate、events 受 PROTECT
 *     保护），本层绝不出现。源文件的大段设计注释不是玩家可见文案，不译。
 *
 * 英文写法：线名像回忆书名，lede 像题记，幕题像一章的小标题——短句、克制。
 * ==========================================================================*/
(function () {
  const A = (POTUS.reg && POTUS.reg.arc) || {};

  const EN = {
    arc_ladder: {
      name: "Rung by Rung",
      lede: "No patron, no nemesis. You have only this: one rung, then the next.",
      stages: [
        { title: "Your name goes on a ballot for the first time" },
        { title: "A seat on the city council" },
        { title: "A state assembly seat opens up" },
        { title: "The state senate calls" },
        { title: "Expanding the map statewide" },
        { title: "The Congress opening" },
        { title: "Senator or governor: choose one" },
        { title: "The vice presidency calls" },
        { title: "The presidential race: you decide to run" }
      ]
    },
    arc_quiet: {
      name: "The Storyless Years",
      lede: "You stopped making headlines. The days keep coming; fewer people are watching.",
      stages: [
        { title: "Nobody calls anymore" },
        { title: "Business at the corner" }
      ]
    },
    arc_street: {
      name: "The Street Came First",
      lede: "The district was drawn later. The people were always there.",
      stages: [
        { title: "First seven people, then a street" },
        { title: "Between the pulpit and the polling place" },
        { title: "They decide to put one of their own forward" },
        { title: "Put yourself on the ballot" }
      ]
    },
    arc_money: {
      name: "The Money Arrives First",
      lede: "Some get famous, then rich. You had it the other way around.",
      stages: [
        { title: "The seating chart with names on it" },
        { title: "The money needs somewhere to go" },
        { title: "Buying a voice of your own" },
        { title: "The Super PAC" }
      ]
    },
    arc_spotlight: {
      name: "The Spotlight Arrives First",
      lede: "The office isn't yours yet, but the name already travels. Dangerous — and worth a fortune.",
      stages: [
        { title: "First words into a microphone" },
        { title: "Who photographs well, who doesn't" },
        { title: "Fifteen seconds can make or ruin a man" },
        { title: "The clip that isn't you" },
        { title: "Better to own the outlet" }
      ]
    },
    arc_shadow: {
      name: "The Side Cameras Never See",
      lede: "Half your life is off the record. Keeping it that way outranks climbing.",
      stages: [
        { title: "The money lender on the block" },
        { title: "A file that should not exist" },
        { title: "Once the money is in, it never comes out clean" },
        { title: "The unnumbered box in the basement" }
      ]
    },
    arc_anointed: {
      name: "The Party Has Its Eye on You",
      lede: "You don't seek the office; the office seeks you. The price: a few promises, first.",
      stages: [
        { title: "A conversation in the corridor" },
        { title: "The candidate in your pocket" },
        { title: "A subpoena for the hearing" },
        { title: "The presidential race: you decide to run" }
      ]
    },
    arc_archive: {
      name: "The Box in the Basement",
      lede: "You had forgotten that story. The story had not forgotten you.",
      stages: [
        { title: "The unnumbered box" },
        { title: "Someone is asking about you" },
        { title: "Two hours behind that door" },
        { title: "The receipt" }
      ]
    }
  };

  /* 守卫：id 必须在场，stages 条数必须一致（对不齐宁可整条不并，不做幽灵写入） */
  const content = {};
  for (const id in EN) {
    const def = A[id];
    if (!def || !Array.isArray(def.stages)) continue;
    if (def.stages.length !== EN[id].stages.length) continue;
    content[id] = EN[id];
  }
  if (Object.keys(content).length) POTUS.define("l10n", { lang: "en", content: { arc: content } });
})();
