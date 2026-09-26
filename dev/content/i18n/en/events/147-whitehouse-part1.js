/* ============================================================================
 * CONTENT · i18n/en/events/147-whitehouse-part1.js
 * 中文文件 content/events/147-whitehouse.js 的英文覆盖层 · 第 1 片（危机族 / 立法族前四张：
 * wh_crisis_desk / wh_recall / wh_bill / wh_shutdown）。后四张（外交族 / 人事族）由另一片补齐。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 结构性键（id / grade / category / weight / minYear / tierMin / base / mods / cost /
 *     effects / flags …）受引擎保护，写了会记 protectedHits，故一律不写。
 *   · 模板占位符原样保留（本片无占位符）。
 *   · 「」在英文里化进句子或用直引号；标题 sentence case（AP 体）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      /* ================= 危机族 ================= */
      {
        id: "wh_crisis_desk",
        title: "A hurricane, a stalled warning net, and eighteen hours",
        body: "The national security advisor stands at your bedside, talking fast: the hurricane has outrun the forecast, three East Coast states have declared emergencies, and the federal warning network's automatic dialing system failed during an overnight upgrade. The governors are on television saying they need the White House. Landfall is eighteen hours away, and your first sentence will be on every feed within half an hour. The emergency machinery has many buttons, and only two or three combinations work on the first try; any hesitation now gets cut into the thirty-second clip of a president not up to the job.",
        choices: [
          {
            id: "allin",
            text: "Commit the whole federal machinery: troops on standby, one command across three states, you take the podium yourself",
            outcomes: {
              crit: { body: "You stand in the emergency operations center the night of landfall; the picture argues better than any speech. The three-state evacuation sets a record, and the casualties come in far under the models. Now this is what a president does, people say." },
              ok: { body: "The coordination mostly holds; people plug the gaps the system left. You do not own the front page, but you keep the living count down." },
              meh: { body: "The machine is so big it takes three days to bite. Critics call the response slow; at least the numbers stay respectable." },
              fail: { body: "Two states' evacuation routes contradict each other after your announcement, and the live cameras find the interstate at a dead stop." },
              critfail: { body: "The warning net is still down when you take the podium; three hours after landfall the death list spans eleven states. The front page needs one line: the president knew too late." }
            }
          },
          {
            id: "states",
            text: "Leave the lead to the governors and run the federal side as backup - no credit grabbed, no full blame carried",
            outcomes: {
              crit: { body: "The governors get real backup without losing the microphone, and say so publicly: the best coordinators they have ever had at the White House." },
              ok: { body: "The disaster is contained, and three governors star in the coverage. You win quietly, and you win half." },
              meh: { body: "One state loses its nerve on its own, and people realize after the fact: the White House could have reached in sooner." },
              fail: { body: "A governor says it live on television: we waited three hours for the president." },
              critfail: { body: "At hour nineteen, photos of federal rescue convoys idling outside the cordon flood every feed. The headline: the White House looks on." }
            }
          },
          {
            id: "speech",
            text: "Address the nation first to steady markets and nerves; leave the logistics to the vice president and a plan you can finish by afternoon",
            outcomes: {
              crit: { body: "Your speech, no teleprompter, loops all day, and the futures markets settle by the close. People hear comfort with a plan inside it." },
              ok: { body: "The address lands well; the markets quiet down. The operations orders catch up that same night." },
              meh: { body: "The words are fine. When the damage list comes out, someone asks: so what did you actually do that day?" },
              fail: { body: "You mispronounce a county in one state, and its members demand an apology before nightfall." },
              critfail: { body: "Four hours after the address airs, a levee section gives way, and 'everything is under control' becomes the loudest quote of the year." }
            }
          }
        ]
      },

      {
        id: "wh_recall",
        title: "Shelves in nineteen states, and a lab result still unconfirmed",
        body: "The food-safety administrator lays two drafts on your desk: recall nationwide, or confine it to the four states where people have fallen ill. A nationwide recall bills the White House the same day; a four-state limit holds until the lot spreads - and then the record says you knew. Three distributors have already retained lawyers and promise to litigate to the end; two papers smell something and are asking why no one said anything sooner. The lab's final confirmation takes three days.",
        choices: [
          {
            id: "full",
            text: "Recall nationwide, and go on television yourself to explain why it is worth the price",
            outcomes: {
              crit: { body: "No second case. The opposition cannot bring itself to say overreaction - you stayed on camera and talked the whole scenario through." },
              ok: { body: "The shelves clear and the lawsuits come anyway, but no one on the Hill can point at a case count." },
              meh: { body: "Industry calls it overreach; the public never learns the story. A week later no one brings it up." },
              fail: { body: "The recall fumbles in two states, and a grocer tells the local station: the White House cannot even hand out a form." },
              critfail: { body: "The confirmation proves the lot was safe. You spend a season's budget on a false alarm and teach the opposition a new line." }
            }
          },
          {
            id: "narrow",
            text: "Recall only the four sick states and point federal inspectors at the two lines in question",
            outcomes: {
              crit: { body: "The spread is contained. Consumers in fifteen states never learn what they dodged, and you have no reason to tell them." },
              ok: { body: "The scope holds and the money stays unspent. Only two representatives keep demanding a full assessment." },
              meh: { body: "Two weeks later a fifth state reports cases. The number is small, and it lands exactly on the question: why didn't you widen it?" },
              fail: { body: "States six and seven report at once. A local official tells the press: we flagged this to the White House." },
              critfail: { body: "At a hearing, a mother holds up a copy of the memo behind your four-state decision. You stand through all of it and not one word of defense comes out." }
            }
          },
          {
            id: "wait",
            text: "Wait three days for the confirmation and announce nothing in the meantime",
            outcomes: {
              crit: { body: "The confirmation shows a false alarm, and both plants keep a season's orders. The owners remember who saved them a press conference." },
              ok: { body: "Three days later you act on the result, by the book. No one counts it as your doing." },
              meh: { body: "One more case appears while you wait. People start asking what you were waiting for." },
              fail: { body: "A paper obtains the lab's initial report. The headline asks: the three days the president knew." },
              critfail: { body: "Two people die in those three days, and the first report had already traced the same lot. That sentence gets read aloud at every occasion you need it not to be." }
            }
          }
        ]
      },

      /* ================= 立法族 ================= */
      {
        id: "wh_bill",
        title: "Seven votes short: a month of dinners, or a compromise someone else drafts",
        body: "The bill cleared committee and sits seven votes short on the Senate floor. The majority leader lays out three paths: you take those seven senators to dinner in the Rose Garden, one by one - two hours apiece, a month of your calendar; he negotiates for you and keeps the pen; or you sign an executive order and start now, letting Congress catch up later, at the price of every later administration being measured against your precedent. Reporters are already betting on whether you will walk the first road.",
        choices: [
          {
            id: "handshake",
            text: "Work them one by one: seven dinners, a concession each, and a version you sign yourself",
            outcomes: {
              crit: { body: "All seven votes come in, and one senator publicly scolds his own party's opposition on your behalf. The bill passes with your name on it." },
              ok: { body: "Six votes secured; the seventh flips at the last minute. The language is a third softer, but it lives." },
              meh: { body: "A month in, only four will sign. You leave the rest for the next session." },
              fail: { body: "One senator describes your dinner to a radio show, including the part about what you were willing to trade." },
              critfail: { body: "Seven dinners buy six refusals, and one of them makes the front page: the president was begging me, privately. Your legislative year is over." }
            }
          },
          {
            id: "leader",
            text: "Hand it to the majority leader: you just want it passed, whichever version it is",
            outcomes: {
              crit: { body: "The leader wants this win even more than you do, and every change to the terms leans your way." },
              ok: { body: "The bill passes and the name is still yours, except three core provisions now read in his handwriting." },
              meh: { body: "A husk passes. Half of what you read at the signing ceremony was written by the other side." },
              fail: { body: "The leader's price keeps climbing; in the end he shifts the blame to you: the president would not bend." },
              critfail: { body: "His own conference votes his version down, and both parties reach the same verdict: the White House cannot manage its own people." }
            }
          },
          {
            id: "order",
            text: "Stop arguing: sign the executive order tomorrow and get it running",
            outcomes: {
              crit: { body: "The money moves that quarter and Congress scrambles to legislate behind you. Afterward people remember only that you got it done first." },
              ok: { body: "The program starts, and so do the lawyers. At least half the provisions survive." },
              meh: { body: "A court injunction freezes the order on paper. You call it a bridge; the press calls it overreach." },
              fail: { body: "Both parties join in one rare statement, accusing you of moving the legislative power into the Oval Office." },
              critfail: { body: "Beyond the injunction, the Senate starts holding every one of your appointments by procedure. For two years after, the only thing you can push through is memos." }
            }
          }
        ]
      },

      {
        id: "wh_shutdown",
        title: "Budget night: thirty-six hours and three drafts",
        body: "The appropriations bill passed the House; the Senate returned its own version, and the two differ only on that one rider. Accept it and the doors stay open, but that money gets repaid every year after; ride out a shutdown and the parks and federal workers pay your bill. Funding lapses in thirty-six hours. Keepers at the national zoo are already asking where next month's paychecks come from, and the whips of both parties say the same thing: the first to blink is you.",
        choices: [
          {
            id: "sign",
            text: "Accept the rider and open the doors first",
            outcomes: {
              crit: { body: "The doors stay open, and you reframe the rider as your own victory. Not one story the next morning calls it a White House retreat." },
              ok: { body: "After signing, you call it being responsible to federal workers, and most people believe you. The rider stays in the law." },
              meh: { body: "Government opens, and your own party spends the week yelling at you: next year this gets paid back twice." },
              fail: { body: "The opposition turns the rider's exact text into a six-page ad, and members of your own party start reading from it." },
              critfail: { body: "In year two the rider is inside the opposition's reelection ad, and you are out of chances to explain it. The shutdown becomes your label." }
            }
          },
          {
            id: "hold",
            text: "Do not sign. Let the shutdown happen and let the country see who closed the doors",
            outcomes: {
              crit: { body: "Eleven days in, the other party breaks first. The call - let's revisit that rider - comes from their side." },
              ok: { body: "After three days both sides give half a step, and the rider loses half its text. You call that holding the line on principle." },
              meh: { body: "Seven days dark. The parks are shut, troops work without pay, and the photo is you on the White House balcony." },
              fail: { body: "Day nineteen: federal contractors start showing up to demand their back pay, and two cameras wait at the gate for your motorcade." },
              critfail: { body: "Thirty-one days in, a nurse reads 'the president says this is a necessary cost' three times at a hearing. Your approval never crosses back over the center line." }
            }
          },
          {
            id: "chief",
            text: "Wake the chief of staff and set him to negotiating all night under the lights at the State Department",
            outcomes: {
              crit: { body: "By dawn there is a draft both sides can sell as a win to their own caucuses. The rider becomes a window that sunsets automatically after five years." },
              ok: { body: "Half a deal at three in the morning, the rest before sunrise. The doors stay open, and no one calls it a White House defeat." },
              meh: { body: "Ten hours produce only a joint statement pledging to keep talking. The deadline passes, and the doors close for two days anyway." },
              fail: { body: "Your chief of staff and a whip get into it in front of the cameras, and the next day's story is about a White House that cannot stay on message." },
              critfail: { body: "The talks collapse, and the hallway microphone catches the collapse. The shutdown runs a month, and the full tape plays in every candidate's ad." }
            }
          }
        ]
      }
    ]
  }
});
