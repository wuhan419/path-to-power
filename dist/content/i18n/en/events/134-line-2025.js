/* ============================================================================
 * CONTENT · i18n/en/events/134-line-2025.js
 * 英文覆盖层：对应 content/events/134-line-2025.js（2025 收官年两张定点）。
 *
 * 契约（详见 docs/I18N.md §3/§4）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的字段；事件按 id 定位。
 *   · known / rumor / unknown 为纯字符串数组，整体替换，元素个数必须与中文严格一致
 *     （两卡均 3/2/2）；terms 为 {k,v} 数组，按下标对齐（两卡均 2 条）。
 *   · 结构性键（id / base / mods / cost / stake / effects / flags …）由引擎保护，本文件不写。
 *   · 英文按第二人称、现在时、短句重写；「」不直译，改英文引号或句式。
 *   · 标题一律 sentence case：只首词与专有名词（House / Supreme Court）大写。
 *   · 本文件无 worldline：2025 年带无人认领，本文件只有两张事件卡。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* 2025-01 · 新政府开局两周的行政令潮 */
      {
        id: "ln25_inaugural",
        title: "A new administration signs a wall of executive orders in two weeks",
        body: "The inaugural address has barely faded when the orders start landing one after another: a federal hiring freeze, agencies renamed and merged, foreign aid halted, border and tariff directives reissued. They bypass Congress and drop straight into the forms on a clerk's desk.\n" +
          "The calls reach your level the same day: one voice demands you endorse it at once, another demands you denounce an overreach. In your office, the inbox of things needing an answer is longer than a normal year.",
        brief: {
          lede: "The opening fortnight sets the price: every word said now gets quoted for four years.",
          known: [
            "An executive order needs no legislative route — and lands far faster than a bill.",
            "The freeze and the mergers hit federal jobs in your own district directly.",
            "The party caucus has a script ready; you may also write your own."
          ],
          rumor: [
            "Some say several of these orders will be blocked by a federal court within days.",
            "Some say the real design sits in departmental memos, off the printed page."
          ],
          unknown: [
            "How you name this tonight gets quoted back at your next hearing.",
            "Whether anyone you know is on the freeze list — that is published tomorrow."
          ],
          terms: [
            { k: "Executive order", v: "A presidential directive to the agencies; no vote needed, and a court may void it." },
            { k: "Hiring freeze", v: "An order pausing outside recruitment and backfilling." }
          ]
        },
        choices: [
          {
            id: "ride",
            text: "Get out in front of the caucus and endorse: sell the orders as promises kept",
            note: "A bet that the new wind's dividend spills into local votes. Wrong, and a court voids it — leaving you the man who defended the overreach.",
            outcomes: {
              crit: { body: "You are the first at your level to argue the 'delivering on promises' line convincingly, and the cable channels cut your words into a promo. The new administration remembers your name; the party asks you first when it seats people." },
              ok: { body: "You stood in the front row: your base feels avenged, the new force keeps a tab." },
              meh: { body: "You shouted too, but the cameras stayed on louder people; nobody weighs your words." },
              fail: { body: "Order after order is stayed in court, and 'promises kept' plays verbatim against you in a single news cycle." },
              critfail: { body: "An internal memo leaks showing your office got an early exemption from the freeze. He only believes in the rules when they help him hits the headline." }
            }
          },
          {
            id: "block",
            text: "Call it overreach: turn the mergers and the freeze into an attack on local livelihoods",
            note: "A bet that district federal employees and contractors are angry enough to vote. Wrong, and you are the first one the opening wind blows over.",
            outcomes: {
              crit: { body: "You translate the orders line by line into who gets laid off and which plant stops; the local station runs it three nights running. Unions and the employees' association decide, for once, that you are one of theirs." },
              ok: { body: "You got on television and held the word 'overreach' steady: your side nodded, the other side took notes." },
              meh: { body: "Your protest drowns in the ten releases a day; nobody files it." },
              fail: { body: "District polling favors the orders, and your high tone reads as 'not speaking for us'." },
              critfail: { body: "A staffer of yours is caught slipping names onto the freeze list. You lecture on overreach while your own people pick who falls." }
            }
          },
          {
            id: "local_first",
            text: "Rule nothing, back no side: hold a hearing on what the freeze actually cuts here",
            outcomes: {
              crit: { body: "While the country argues constitutionality, you only lay out which posts and which grants would be severed in your district. The new-year review gives you the rare words: 'actually listened'." },
              ok: { body: "You touched no framing question and asked what needed asking. No praise, no leverage on you." },
              meh: { body: "Your hearing runs lukewarm; both camps file you under 'other'." },
              fail: { body: "Both camps pack the same town hall and demand a statement. Your dodge logs as guilt." },
              critfail: { body: "Both sides spin your silence the same way: he knew who would be cut and dared not say. That hat is harder to take off than any position." }
            }
          }
        ]
      },

      /* 2025-04 · 对等关税休克与九十日暂停 */
      {
        id: "ln25_tariff",
        title: "'Reciprocal' tariffs land, and fourteen days later the markets roll half of them back",
        body: "On a Thursday evening a comprehensive reciprocal tariff schedule, tiered by country, is announced in the rose garden — even the duty-free de minimis parcel is folded in. Over the sessions that follow: markets fall like clockwork, Treasuries are dumped, the currency index sinks to a six-month low, and importers treat 'effective in April' as a death sentence on the phone.\n" +
          "Two weeks later, all but a few counterparties get a ninety-day pause. Markets give back most of the drop — but the supply chains, warehouse receipts and deposits have already burned a row of firms, and nobody is going to reprint the quotations for the companies in your district that priced them in.",
        brief: {
          lede: "Policy can be paused; the book cannot. Whoever sees that first inside ninety days owns this year's pricing.",
          known: [
            "The tiers are published by country, took effect, then were paused ninety days by one announcement.",
            "Equities, bonds and the currency falling in the same direction usually means confidence broke.",
            "Importers, retailers and farm operations have already paid on this month's inventory."
          ],
          rumor: [
            "Some say the pause was dragged out of the bond market and the plan was always divided labour.",
            "Some say ninety days is a negotiating window and the rates that actually land get recomputed."
          ],
          unknown: [
            "Which plant in your district cannot survive to autumn on these warehouse receipts.",
            "Whether the next tier falls straight on your largest employer."
          ],
          terms: [
            { k: "Reciprocal tariff", v: "A blanket schedule whose rates are back-solved from the trade deficit, tiered by country." },
            { k: "Ninety-day pause", v: "A period after announcement in which enforcement is suspended, leaving room to negotiate." }
          ]
        },
        choices: [
          {
            id: "defend",
            text: "Sell the tariffs as a necessary hard fight: short pain to bring manufacturing home",
            note: "A bet that the 'reshoring' story outlasts this year's prices. Wrong, and you are the name read off the grocery receipt.",
            outcomes: {
              crit: { body: "You recast a shock as 'the price of taking our jobs back', and blue-collar voters buy it; the unions put you on a podium. The donors, though, start costing their own goods." },
              ok: { body: "You absorbed a round of questions for the hard line: your side held, and the retailers filed a debt against you." },
              meh: { body: "You chanted the slogan, and the wind went to people with more authority." },
              fail: { body: "Shelf labels change daily, and a reporter parks the invoice in front of your office door." },
              critfail: { body: "An importer you hold stock in dumped its warehouse receipts the night before the pause; the timestamps are plain. He knew first hits the headline." }
            }
          },
          {
            id: "relief",
            text: "Fight for local patches: exemptions and a transition for your importers and farms",
            note: "Money spent on the practical. Land it and you own the 'fixer' sign; bungle it and both sides call you a nuisance.",
            outcomes: {
              crit: { body: "You talk a district list into a supplemental notice: some components deferred, some warehouses released first. The 'gets it landed' sign hangs on your door from now on — even the other side concedes you are thorough." },
              ok: { body: "You won a batch of interim exemptions; the list is short, but every line has a name on it." },
              meh: { body: "A few rounds of haggling land only in 'review after ninety days' — the cargo still rots at the pier." },
              fail: { body: "The supplemental notice carries no name of yours, yet the press files you under the local members who only complain." },
              critfail: { body: "The customs broker you wired for exemptions lists an old friend on its books. What you won for the district gets described as what you won for yourself." }
            }
          },
          {
            id: "wait_out",
            text: "Bet nothing either way: run a cost hearing for local firms and households, then let the ninety days speak",
            outcomes: {
              crit: { body: "While the country argues whether to tariff at all, you only keep one table of how many dollars a case now costs. By autumn it is the only evidence anyone in the district has." },
              ok: { body: "You took no position and recorded what needed recording. No praise, no leverage on you." },
              meh: { body: "You slipped past this wind — and past everyone's memory of you." },
              fail: { body: "Business owners who lost money pack the same hearing, each wanting one sentence from you. Your dodge logs as guilt." },
              critfail: { body: "Both sides spin your silence the same way: he knew prices would jump and dared not say. That hat is harder to take off than any position." }
            }
          }
        ]
      }
    ]
  }
});
