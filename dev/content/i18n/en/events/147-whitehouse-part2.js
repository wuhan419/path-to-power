/* ============================================================================
 * CONTENT · i18n/en/events/147-whitehouse-part2.js
 * 中文文件 content/events/147-whitehouse.js 的英文覆盖层（白宫事务池 · 后半片）。
 * 范围：按 id: 出现顺序的后 4 张卡 —— wh_hotline / wh_summit（外交族）
 *   与 wh_cabinet / wh_scoop（人事族）。前 4 张（wh_crisis_desk / wh_recall /
 *   wh_bill / wh_shutdown）归 147-whitehouse-part1 分片，本片不碰。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices 里带 id 的按 id 对齐；outcomes 按五档名对齐。
 *   · 结构性键（id / grade / category / valence / wh / whFamily / dyn / tierMin /
 *     tierMax / weight / minYear / maxYear / medium / base / mods / cost / effects /
 *     flags）受引擎保护，写了会记 protectedHits，故一律不写。
 *   · 标题 sentence case（AP 体）；「」在英文里化进句子；本池无模板占位符。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      /* ================= 外交族 ================= */
      {
        id: "wh_hotline",
        title: "Submarines that never reported in, and one hotline",
        body: "At 2:40 in the morning the secretary of defense briefs you: a hostile nation's ballistic-missile submarine squadron has sailed without using the notification channel. The satellite imagery takes two readings - routine rotation, or a move forward. The Joint Chiefs want alert one level higher; the intelligence director wants six more hours, and waiting may cost you those six. The red line to Moscow sits on your desk. It takes three minutes to get through - but a call built on a misreading costs more than silence.",
        choices: [
          {
            id: "call",
            text: "Get through: you want the other leader's own voice inside ten minutes",
            outcomes: {
              crit: { body: "A voice still thick with sleep tells you it is a rotation, then volunteers the hull numbers on its own. A joint notice seven days later lets the world exhale." },
              ok: { body: "The call settles nothing, but both sides hear a human voice. Escalation slips three days. That is enough." },
              meh: { body: "They will only give you the foreign minister. His answers read like a press release, and neither side gives ground." },
              fail: { body: "You speak sharply where no camera is running. Next morning the other side reads your words back aloud, and the world watches two leaders quarrel." },
              critfail: { body: "Eight minutes into the call, their radar picks up one of our patrol planes off its filed course. Nobody sleeps for those sixteen minutes; afterward it is ruled a false alarm." }
            }
          },
          {
            id: "intel",
            text: "Give the imagery six hours to resolve - you will not stake everything on submarines that may be homeward bound",
            outcomes: {
              crit: { body: "At six hours the rotation is confirmed. Your verified reading shuts down the escalation talk, and the Joint Chiefs issue your wording." },
              ok: { body: "A training adjustment; a false alarm. Only you barely sat down during those six hours." },
              meh: { body: "Markets slip a notch while you wait, and the press begins asking whether the White House knows. You chose silence." },
              fail: { body: "At hour eight the other side conducts a public missile test. People ask what you were waiting for." },
              critfail: { body: "The clear answer comes too late: the squadron is already inside their own waters. Escalation has begun, and two carrier groups have moved into range by the old playbook." }
            }
          },
          {
            id: "public",
            text: "Say it out loud: no explanation inside 48 hours and this goes into the speech at the United Nations",
            outcomes: {
              crit: { body: "To avoid a public showdown they file the notice themselves inside twenty-four hours. Allies thank you at their press conferences for saying the quiet thing out loud." },
              ok: { body: "The notice arrives, ugly in tone, and the moment passes. At home people say your hardness is what did it." },
              meh: { body: "They do not take the bait. Your speech text goes out anyway, and the affair hangs there unfinished." },
              fail: { body: "The other side answers your wording on the floor, point by point, and an ally's delegate asks in the corridor who showed you that draft." },
              critfail: { body: "Public confrontation buys a week of silence and one more advance. Markets fall for two days, and your own people ask you to explain the strategy." }
            }
          }
        ]
      },

      {
        id: "wh_summit",
        title: "Past the red carpet, a fisheries deal nobody finished",
        body: "The honor guard is formed before your wheels stop rolling. The host foreign minister warns you privately: two hard clauses are still open on the table, and your host would like you at the announced ceremony first. Pushing the ceremony aside for substance may leave you nothing to bring home that day. Your itinerary has three blank slots - a stop at a local school or hospital plays fastest with voters and is easiest to call a stunt - and the press back home is waiting for a single word: results.",
        choices: [
          {
            id: "substance",
            text: "Push the ceremony back an hour and sit down until those two clauses are finished",
            outcomes: {
              crit: { body: "You close one of the two and half of the other, and the joint statement is the harder for it. At the return hearing both parties concede this is the most substantive trip abroad in years." },
              ok: { body: "You bring home an agreement with annexes. The red-carpet photos run half an hour short and nobody complains." },
              meh: { body: "A long session ends in an agreement to keep talking. Your hosts stay gracious; the reporters have no headline." },
              fail: { body: "The pushed-back hour costs your host face in front of his own press, and the line comes out of the joint statement." },
              critfail: { body: "It collapses. You bring home only that the two sides exchanged views frankly, which at home means: nothing was settled." }
            }
          },
          {
            id: "symbol",
            text: "Walk the protocol as written and sign the symbolic statement - make the alliance look solid first",
            outcomes: {
              crit: { body: "The language is mild, but two photographs shoulder to shoulder pay for the whole trip. A domestic editorial reaches for a word it has not used about you: steady." },
              ok: { body: "The ceremony runs clean; the coverage shows you and your host. The hard clauses wait for next time." },
              meh: { body: "Beautiful pictures, thin content. A week later people begin asking what you actually settled." },
              fail: { body: "A reporter digs up the paragraph cut from the statement, and the question becomes why you agreed to the cut." },
              critfail: { body: "Two hours after the signing, the other capital reverses the single substantive promise in the statement. Your photograph lands on the joke page." }
            }
          },
          {
            id: "visit",
            text: "Slip a children's hospital into the schedule and let the kids talk longer than you do",
            outcomes: {
              crit: { body: "In the clip you never speak; you just listen. Once you are home the campaign quotes that footage many times." },
              ok: { body: "Warm, decent, uncontroversial - and your hosts are glad to be seen in it." },
              meh: { body: "A fine scene that people forget before they work out which day it was." },
              fail: { body: "Protocol clears the ward without notice; you arrive to a room of staff. The cameras record the moment plainly." },
              critfail: { body: "A reporter on the plane relays a child's question: why will you not do this at home? The clip cuts to thirty seconds." }
            }
          }
        ]
      },

      /* ================= 人事族 ================= */
      {
        id: "wh_cabinet",
        title: "Forty-eight hours and one name",
        body: "The resignation runs to one line and cites personal reasons, and the press has already guessed it was last week's budget fight. The chair of the Senate Armed Services Committee calls to ask whether a name might reach him by tomorrow morning. Two candidates sit on your desk: a campaign chief of staff of eight years who has never set foot in the Pentagon - he hears you out, but every stumble at the hearing is billed to you - and a retired four-star general whom everyone in the party respects, which means the establishment approves and afterward he answers to his own base.",
        choices: [
          {
            id: "loyal",
            text: "Nominate your own people: whoever holds that chair has to follow what you are saying",
            outcomes: {
              crit: { body: "He cannot answer the technical questions at the hearing, yet what he says about civilian control of the military has two old senators nodding." },
              ok: { body: "Confirmed by a thin margin. For the next two years he never forms an opinion outside the building." },
              meh: { body: "Confirmed - but the Pentagon's generals learn to go around him and call the White House chief of staff." },
              fail: { body: "At the hearing he misstates the size of an exercise by two orders of magnitude, and the clip runs on loop. You pull the nomination." },
              critfail: { body: "The committee reports him out unanimously, which it almost never does. Two nominations lost back to back, and the papers start counting the price of White House loyalty." }
            }
          },
          {
            id: "general",
            text: "Nominate the old soldier: satisfy the establishment, shut the officers up",
            outcomes: {
              crit: { body: "The hearing plays like a medal ceremony. At your first meeting of the National Security Council he buries an unruly ally for you." },
              ok: { body: "Easily confirmed, and the Pentagon settles down. It is only that his opinions now have listeners of their own." },
              meh: { body: "Confirmed. Three months later he disagrees with one of your policies on television, in very courteous terms." },
              fail: { body: "Old accounts are opened at the hearing: two audits from his command. His backers begin to keep their distance." },
              critfail: { body: "He fails to confirm, and at the press conference after he adds that some decisions ought not be made at the White House. Your own nominee testifies against you in public." }
            }
          },
          {
            id: "delay",
            text: "Let the deputy hold the seal, and settle the name after the State of the Union",
            outcomes: {
              crit: { body: "The acting secretary keeps the budget and the exercises steady, and within a few weeks the story stops arguing with itself." },
              ok: { body: "Procedure fills the vacancy and nothing burns. Every reporter writes down the same two words: not yet named." },
              meh: { body: "Still acting two months on. One senator asks in public whether the president is afraid to decide or has simply not decided." },
              fail: { body: "A border incident finds the acting man without authority, and forty-eight hours pass with no one signing off. On the news that empty chair carries farther than any address." },
              critfail: { body: "After two misjudgments the military starts asking Congress for guidance directly. The headline reads: no defense secretary in the White House for one hundred and twenty days." }
            }
          }
        ]
      },

      {
        id: "wh_scoop",
        title: "The editor wants tea, and there is a list you recognize on the table",
        body: "He pushes the cup toward you and then says it plainly: the paper has a name, and the man has admitted using his White House connection on two deals. The story runs Wednesday. What he wants is not permission but a line from you - you can say you have never known the man, or you can say something else. And remember, the president declines to comment is itself a sentence they can print. Outside, two photographers are waiting for your car to come out.",
        choices: [
          {
            id: "deny",
            text: "Answer nothing, and let nobody in the building know about this in advance",
            outcomes: {
              crit: { body: "The piece prints without a scrap of new reporting and one line: the White House declined to comment. Three days later people are discussing something else." },
              ok: { body: "It runs on schedule and bone dry. Your silence gets characterized as the caution of a man with nothing to hide." },
              meh: { body: "It runs, and the second week brings a second story: because you said nothing, the desk concluded there was more." },
              fail: { body: "The second story carries the timestamp of you entering the club that night. Declined to comment becomes he was in the room." },
              critfail: { body: "They print both versions side by side on one page: your statement that this was never discussed, and the editor's notebook with the time of that tea. For half a year every briefing has someone reading your own sentence back to you." }
            }
          },
          {
            id: "onside",
            text: "Go on the programs yourself and say it straight: the name, the facts, how far you have taken it",
            outcomes: {
              crit: { body: "You say all of what you know and all of what you do not. Next morning no paper in the country can print more than you did." },
              ok: { body: "The ratings are high and the story leaves with you. That night the editor agrees that tomorrow's paper can say only: the president has explained." },
              meh: { body: "You talk for what sounds like two thousand days, and the clip keeps the eight seconds in which you say you don't know." },
              fail: { body: "An anchor presses one detail you had not prepared, on your own program. Next day the detail is the headline." },
              critfail: { body: "Live on air you get two names and two dates wrong, and the fact-checkers list each one afterward. The paper still runs its story, with your slips as the lead." }
            }
          },
          {
            id: "sacrifice",
            text: "Let the aide go first, and let someone happen to explain to the paper whose decision it was",
            outcomes: {
              crit: { body: "By that evening the story has been rewritten as a personnel item. The editor gets the name he came for, and you keep the week you needed." },
              ok: { body: "The fire goes down. The man of eight years is on a plane the next morning and does not come say goodbye." },
              meh: { body: "No one mentions it for a week. Two weeks later somebody reads the name out loud at a hearing: did you make him go?" },
              fail: { body: "The one pushed out gives an interview before he leaves, and supplies three details that put you in the room." },
              critfail: { body: "He brings tape. The front page runs the sentence that the White House needed someone to blame, printed over his own name." }
            }
          }
        ]
      }
    ]
  }
});
