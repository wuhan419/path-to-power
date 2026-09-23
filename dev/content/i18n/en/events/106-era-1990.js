/* ============================================================================
 * CONTENT · i18n/en/events/106-era-1990.js
 * 中文文件 content/events/106-era-1990.js 的英文覆盖层（样板分片）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices / terms 里带 id 的按 id 对齐，不带 id 的对象按数组下标对齐。
 *   · 纯字符串数组（known / rumor / unknown / texts）是**整体替换**，必须整条给全，
 *     少给一条就少一条 —— 不合并。
 *   · 结构性键（id / era / minYear / tierMin / weight / base / mods / effects /
 *     flags / req / cost …）由引擎保护，写了也不会生效，validate 会直接报错。
 *   · 缺译的字段自动留中文，所以可以一张一张补。
 *   · 经济字段是系数，不涉及文案，不用管。
 *
 * 英文写法：按英语重写，不是逐字翻。第二人称、现在时、短句；
 * 「」在英文里用引号或斜体；年份/机构名用真实英文（CNN、Wall Street Journal）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "gulf91_storm",
        title: "Missiles streak the night sky, and the whole world is watching",
        body: "Months after Iraq swallowed Kuwait, the coalition starts firing. Cable crews set their cameras on hotel windows,\n" +
          "and for the first time an airstrike plays live in every living room. For or against — overnight that became\n" +
          "a question pressed onto every elected official in the country. Your Arab shopkeepers are waiting to hear how you open your mouth.",
        brief: {
          lede: "A war that is short, and filmed. Ride the patriotic wave, or say something for the few.",
          known: [
            "The local council wants your resolution to state whether you back the troops; against the war means un-American.",
            "The UN set a deadline. Most Americans approve of force, and approval is at a record high.",
            "Arab families in your district became suspects overnight; your shopkeepers' phones will not stop ringing."
          ],
          rumor: [
            "Some say this is about oil, not liberation — said quietly, and never to a reporter.",
            "Some say the decision was made long ago and the UN deadline was only procedure."
          ],
          unknown: [
            "Whether this quick victory hardens into an overseas burden nobody can put down.",
            "Whether the words you spend on a minority become your protection or your noose."
          ],
          terms: [
            { k: "Desert Storm", v: "The coalition's war on Iraq — the first war televised live." }
          ]
        },
        choices: [
          {
            id: "patriot",
            text: "Back the war: vote for the troops, ride the patriotic wave",
            note: "Safest while approval peaks — but once the war drags and the body counts arrive, the spotlight turns on you.",
            outcomes: {
              crit: { body: "Your stand runs front page in the county paper, and everyone wants a photo with you at the send-off. For now, the halo of the quick victory is yours." },
              ok: { body: "You ride the wave: safe, likable. The Arab shopkeepers close their doors to you for good." },
              meh: { body: "You backed the war, but bigger names took the airtime. You are one of a thousand votes to support the troops." },
              fail: { body: "You set the pitch too high. When the first names of the dead arrive, the district starts asking who shouted loudest." },
              critfail: { body: "Your most hawkish clip is cut into an ad — he wanted this war. Not even a quick victory rescues the image of a man who seemed eager for it." }
            }
          },
          {
            id: "caution",
            text: "Ask one careful question: how long, and what after",
            note: "Not opposing the war, only asking about the peace. Technical doubt gets beaten from both sides.",
            outcomes: {
              crit: { body: "After the swift win, your question — and then what? — is quoted back at you as foresight. Scolded then, praised after." },
              ok: { body: "You raised the aftermath carefully enough that nobody could label you, and it reads as weight." },
              meh: { body: "Your worry is drowned out by the flags. You are right, and nobody wants to hear it." },
              fail: { body: "Asking why we fight, when everyone is for it, edits neatly into: he is closer to Saddam's side." },
              critfail: { body: "Your caution gets branded traitor and indecisive in the same breath. Both words go in the ad." }
            }
          },
          {
            id: "protect",
            text: "Tend the home front: speak publicly for the shopkeepers under suspicion",
            outcomes: {
              crit: { body: "In a patriotic tide where everyone fears being next, you said the shopkeepers' names out loud. Their gratitude is lifelong, and it becomes votes at the next election." },
              ok: { body: "You shielded the local shops and they remember it. Mainstream opinion mutters about you a little." },
              meh: { body: "You said the fair thing. The shopkeepers are grateful; you were too busy to change anything." },
              fail: { body: "Speaking for the suspected turns into your doubting America. The logic loops once and the filth lands back on you." },
              critfail: { body: "Your statement is printed as a leaflet — he does not back the troops — and handed out where the veterans live." }
            }
          }
        ]
      }
    ]
  }
});
