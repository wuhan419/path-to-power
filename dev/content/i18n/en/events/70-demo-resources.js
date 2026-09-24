/* ============================================================================
 * CONTENT · i18n/en/events/70-demo-resources.js
 * 中文文件 content/events/70-demo-resources.js 的英文覆盖层（cost/stake 机制示范，3 张卡）。
 *
 * 契约（详见 docs/I18N.md §3–§5）：
 *   · 原中文文件一个字不动；本文件只放要覆盖的字段，结构键由引擎保护、不写。
 *   · 事件/选项按 id 定位；known / rumor / unknown 是纯字符串数组，整体替换、
 *     整条给全（三张卡均为 known×4 / rumor×2 / unknown×2 / terms×2，与原文一一对应）。
 *   · 术语与引擎 UI 英文对齐：fun = Funds、fav = Favors、ap = Energy、rep = Reputation
 *     （见 content/i18n/en/view/ 各片）。三张示范卡不限时代，措辞保持时代中性。
 *   · 长度按 §11.7 同尺复核（拉丁词 ×0.5）：全部字段在预算内。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* -------------------------------------------------- 示范 1：代价与投注全景 */
      {
        id: "demo_hearing",
        title: "The Hearing: Do You Put Your Whole Estate on the Table?",
        body: "The subpoena has landed. The committee chair is a vindictive old man, and he means to nail you to his desk on camera.\n" +
          "Your staff laid out the routes — but each one asks you to hand something over first: money, energy, or favors.",
        brief: {
          lede: "One hearing, several roads — and every one of them charges toll before it opens.",
          known: [
            "The subpoena is real: the chair marked you after you embarrassed him on television last month.",
            "The team wrote every route on one sheet: tough it out, pay up, pull strings, play sick.",
            "Three things you can spend: funds, energy, favors.",
            "Toughing it out is cheap but long odds; money buys certainty; some doors money cannot knock."
          ],
          rumor: [
            "Some say the chair never wants a real fight — he just wants the camera.",
            "Whatever you say today gets cut to ten seconds before you leave the building."
          ],
          unknown: [
            "Which route someone digs up as leverage four years from now.",
            "Whether what you spend tonight is what you will need most later."
          ],
          terms: [
            { k: "Funds / Energy / Favors", v: "The three spendable resources: funds, energy, favors." },
            { k: "Stakes", v: "Marked options: you set the wager; it is charged only at judgment." }
          ]
        },
        choices: [
          {
            id: "all_in",
            text: "Take the stand yourself and wager everything you can",
            outcomes: {
              crit: { body: "You turn the hearing into a one-man show. The angrier the chair, the brighter you read. By nightfall your clip runs on all three networks." },
              ok: { body: "You took the hits. No signature moment — no opening for them, either." },
              meh: { body: "You answered by the book. They got the screenshot they came for." },
              fail: { body: "You misspoke on a timeline; under the table, your lawyer's hands were shaking." },
              critfail: { body: "You lost your temper and slammed the table on camera. The clip looped for a full week." }
            }
          },
          {
            id: "lawyers",
            text: "Hire the top defense team ($400k)",
            outcomes: {
              crit: { body: "Your lawyers turn every sentence into a fortress that cannot be pressed. The committee leaves with nothing." },
              ok: { body: "Procedure ground into a maze; the whole thing petered out." },
              meh: { body: "You are safe — but the media did the math on whose dime." },
              fail: { body: "They can see you are buying delay; the public sides with them." },
              critfail: { body: "The defense team's own old case bursts open in the courtroom — and you never get a turn to explain." }
            }
          },
          {
            id: "call_favor",
            text: "Trade a favor to push the chair's agenda back (1 favor)",
            outcomes: {
              crit: { body: "The hearing shelves indefinitely. The favor you owe will be collected later — at a dearer rate." },
              ok: { body: "The date slipped past the election. You breathe." },
              meh: { body: "Two weeks' delay; then it sat exactly as scheduled." },
              fail: { body: "The man you asked told the chair instead. The date held — and you added a fresh liability." },
              critfail: { body: "The call logs of your meddling get released in full. This reads worse than the original charge." }
            }
          },
          {
            id: "big_shot_req",
            text: "Call in your old Senate connection (requires T3 or higher)",
            outcomes: {
              crit: { body: "One phone call and the hearing is simply gone. Nobody asks why." },
              ok: { body: "Your old connection vouched. The storm stayed pinned under paper." },
              meh: { body: "The relationship had depreciated — it bought a little slack, nothing more." },
              fail: { body: "They do not take your calls anymore." },
              critfail: { body: "Your old connection handed over the call log — to save himself." }
            }
          },
          {
            id: "sick",
            text: "Call in sick; spend nothing",
            outcomes: {
              crit: { body: "The doctor's note is airtight. The committee poses before empty chairs all day." },
              ok: { body: "You were absent; the storm resumes next spring." },
              meh: { body: "Someone photographed you at the golf course that same afternoon." },
              fail: { body: "Absence reads as a guilty conscience; the media runs it for three weeks." },
              critfail: { body: "Your illness is traced to a forged note. This hit lands harder than the original charge." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 示范 2：资金门槛变灰 */
      {
        id: "demo_donor_gala",
        title: "The Donors' Dinner",
        body: "Tonight the thirty richest people in the city sit at one table. You are an invited \"prospect\" — you go there to get money, not to spend it.\n" +
          "Of course, holding up the room has its own price.",
        brief: {
          lede: "One invitation. You came to raise money — but every point of polish on display costs some.",
          known: [
            "The invitation says dinner. You know the trade: they bring the money; you bring the future.",
            "Thirty people at the head table decide whether your war chest holds for two years.",
            "The rival outfit across town costs 750k to stage at this grade. You cannot cover it.",
            "You can also walk in empty-handed with one speech. The speech has to hold you up."
          ],
          rumor: [
            "Two of tonight's guests are said to be poaching each other's people as we speak.",
            "Someone left a price tag on a gift last year. They never let him forget it."
          ],
          unknown: [
            "What tonight's money will have to be repaid with.",
            "The day you notice you have been reading someone else's lines."
          ],
          terms: [
            { k: "Insufficient Funds", v: "An unaffordable cost grays out, naming what you lack." },
            { k: "Stakes", v: "Before judgment, wager resources in — never past your balance." }
          ]
        },
        choices: [
          {
            id: "buy_floor",
            text: "Host your own reception; bring them to your floor ($150k venue and catering)",
            note: "You are the host; they are your guests — the whole evening is one display of \"I am worth investing in.\" Reality check: local fundraisers start at five figures; national ones, six.",
            outcomes: {
              crit: { body: "You are the evening's only headline. Three people pledge their checks on the spot." },
              ok: { body: "The staging came off; after dinner, a few new numbers in your pocket." },
              meh: { body: "A fine room, a clean close — except nobody pledged anything. Your card sits in thirty pockets. Time will sort it." },
              fail: { body: "Someone tipped the press that the candidate rented the room with his own money." },
              critfail: { body: "The books did not add up clean — your spending became one thread in a laundering case." }
            }
          },
          {
            id: "gift",
            text: "A proper gift for each guest of honor ($30k) — the way one enters this room",
            outcomes: {
              crit: { body: "Every gift found its mark. Old money nods to itself: he knows how it is done." },
              ok: { body: "They learned your name." },
              meh: { body: "Your gift duplicated somebody else's. Imagination: absent." },
              fail: { body: "One price tag was not scraped off clean." },
              critfail: { body: "The gifting gets relabeled bribery, and prosecutors start asking questions." }
            }
          },
          {
            id: "ideals",
            text: "Go empty-handed and sell only the ideal (stake energy for force of argument)",
            outcomes: {
              crit: { body: "You speak for twenty minutes. The oldest man at the table says: \"Nobody has talked like that at me in thirty years.\"" },
              ok: { body: "Someone was moved — wallets stayed shut, but they were moved." },
              meh: { body: "Polite silence. You find yourself seated at the far end of the long table." },
              fail: { body: "Phones came out before dessert." },
              critfail: { body: "At your swell you cursed one man at the table. The dinner broke up early." }
            }
          },
          {
            id: "bring_press",
            text: "Bring a reporter along (2 energy; courts the press)",
            outcomes: {
              crit: { body: "The story writes itself: he will come for the donors. You spent nothing; your standing doubled." },
              ok: { body: "The press got its story; the donors decided you are dangerous." },
              meh: { body: "The piece ran on page three. Nobody read it." },
              fail: { body: "The reporter led with your table talk — slurred version." },
              critfail: { body: "You annoyed the money and insulted the Fourth Estate. Both opened fire at once." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 示范 3：精力稀缺 + 人情重投 */
      {
        id: "demo_2am_call",
        title: "Two in the Morning — a Call from Someone You Dare Not Hang Up On",
        body: "The voice on the phone is someone you cannot cut off. It needs an answer before eight in the morning.\n" +
          "Energy is not infinite — a night holds only so many hours.",
        brief: {
          lede: "A day holds only so many hours. Tonight you can spend them in exactly one place.",
          known: [
            "The man on the line cannot wait. Some outcome is needed before eight in the morning.",
            "On hand: energy (how much of tonight is left) and favors (who answers the phone at this hour).",
            "Flying out is the surest route — it burns three energy, and your cap tracks your health.",
            "You can also not answer. Silence is a choice too; it bills separately."
          ],
          rumor: [
            "Some say this is not your call to make — the ball was kicked to you on purpose.",
            "Some say what he truly wants to discuss is not what he said it is."
          ],
          unknown: [
            "Whether tonight's spent energy comes back tomorrow.",
            "That call may settle a posting you do not know about yet."
          ],
          terms: [
            { k: "Energy", v: "Recovers each year with your health; capped at 12." },
            { k: "Reroll, Keep Best", v: "Spend 1 favor: roll twice at judgment, take the better." }
          ]
        },
        choices: [
          {
            id: "fly",
            text: "Fly out through the night (3 energy; favors can buy a reroll)",
            outcomes: {
              crit: { body: "You appear at his door at four in the morning. He blanks — then agrees to everything." },
              ok: { body: "It closed. The price: another week alive on coffee." },
              meh: { body: "He saw you. He promised nothing. The flight bought a handshake." },
              fail: { body: "An assistant handled you downstairs." },
              critfail: { body: "Your midnight doorstep visit gets read as intimidation — and written up exactly that way." }
            }
          },
          {
            id: "phone",
            text: "Hold him steady on the telephone (1 energy)",
            outcomes: {
              crit: { body: "Forty minutes later he has argued himself over. You never left the bed." },
              ok: { body: "Bought time. It continues in the morning." },
              meh: { body: "Before hanging up he did not say you were wrong. He did not say you were right, either." },
              fail: { body: "You sounded like you were brushing him off. He hung up." },
              critfail: { body: "You thought the line was dead. It was not. He heard everything you said next." }
            }
          },
          {
            id: "assistant",
            text: "Pay an assistant to run the errand tonight ($60k)",
            outcomes: {
              crit: { body: "The assistant pulled it off. You never learned how — and the not-knowing sits uneasy." },
              ok: { body: "It got done. The assistant quit the next day — leaving you one page on exactly how." },
              meh: { body: "The assistant went. The door stayed shut." },
              fail: { body: "Wrong words at the wrong doorstep — a small matter grew teeth." },
              critfail: { body: "The assistant had been bought on the way. Whatever you sent changed sides." }
            }
          },
          {
            id: "ignore",
            text: "Do not answer; deal with it tomorrow (may stake energy to ride it out)",
            outcomes: {
              crit: { body: "By morning, everything is calm. You bet right." },
              ok: { body: "He found someone else. It got handled around you — and got handled." },
              meh: { body: "You lay half-asleep chewing on it until dawn." },
              fail: { body: "He remembers whose phone rang unanswered that night." },
              critfail: { body: "That call settled one of your postings. By the time you knew, the slate was public." }
            }
          }
        ]
      }

    ]
  }
});
