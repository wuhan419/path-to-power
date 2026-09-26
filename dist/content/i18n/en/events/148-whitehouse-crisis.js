/* ============================================================================
 * CONTENT · i18n/en/events/148-whitehouse-crisis.js
 * 中文文件 content/events/148-whitehouse-crisis.js 的英文覆盖层 · 危机族（whFamily: "crisis"）4 张：
 * wh_fuel / wh_shooting / wh_blackout / wh_pardon。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 结构性键（grade / category / weight / tierMin / base / mods / cost / effects /
 *     flags / wh / whFamily / dyn / unique / valence …）受引擎保护，一律不写。
 *   · 模板占位符原样保留（本片无占位符）。
 *   · 「」在英文里化为直引号；标题 sentence case（AP 体）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      /* ================= 危机族 ================= */
      {
        id: "wh_fuel",
        title: "Pipeline breaks at noon, and three states start rationing gas",
        body: "The Army Corps has found the break; reopening it takes ten days at best, and refined-fuel stocks in three inland states cover two weeks. This morning the three governors held a call where each opened by weighing how much fuel their state sends and how much it takes. The energy secretary wants your tone set before tonight's press conference. Two front pages already ask whether the White House still means to say the market will fix itself. The strategic reserve is a card that plays only once: opening it admits the supply chain broke.",
        choices: [
          {
            id: "reserve",
            text: "Release strategic reserve fuel and announce a national rationing plan",
            outcomes: {
              crit: { body: "Reserve crude moves within seventy-two hours, and the queues in the two worst-hit states break first. You give ten unscripted minutes at a gas station camera, and every channel replays it that night." },
              ok: { body: "Rationing draws complaints, but the fuel arrives. Three governors sign one letter thanking the federal government for moving in time." },
              meh: { body: "The allocation is neither a success nor a failure; the public takes away one week of flat pump prices." },
              fail: { body: "Two states' tanker schedules cross wires, and a station owner tells a local channel that rationing means extra fuel for people with connections. You opened the reserve; your approval opened with it." },
              critfail: { body: "Reopening slips another week, and the rationing plan leaks with the words home district favoritism in it. Both parties demand answers at once, and the governors' call turns into a courtroom — the pipeline gets fixed, and no one wants to mention it." }
            }
          },
          {
            id: "priority",
            text: "Grant federal transport priority only, and leave rationing alone",
            outcomes: {
              crit: { body: "Priority moves sort the long-haul tankers before the worst day. On the Sunday shows the energy secretary calls your handling professionalism, and the lines in all three states shrink visibly." },
              ok: { body: "The market loosens and prices fall back to the line; only the three governors keep calling daily to complain you owe them." },
              meh: { body: "The shortage runs two more weeks, but no one is harmed by it and no one remembers to thank you." },
              fail: { body: "Two large trucking firms work the priority rules, and small stations still run dry. A paper digs up that their shareholders posed with you at a fundraising dinner." },
              critfail: { body: "A regional teaching hospital's backup fuel truck stalls in the same queue; three days of television are generators, convoys, and an empty podium no one answers questions at." }
            }
          },
          {
            id: "market",
            text: "Announce nothing and let price signals pull the fuel in on their own",
            outcomes: {
              crit: { body: "High margins draw two convoys from the coastal refineries, and the shortage fades before you have to speak. Columnists call it textbook, though no one says which page." },
              ok: { body: "Fuel runs high but full, and you spend not one unit of political capital." },
              meh: { body: "The White House disappears on fuel for three weeks, and the news cycle turns the page on its own." },
              fail: { body: "Three governors write one letter saying federal silence is the second disaster. The rationing signs at the pumps photograph well, and the opposition puts them on its campaign backdrops." },
              critfail: { body: "Rationing hardens into station closings and shoving, and a fuel line outside a church airs in every debate hall in the country. Your first instinct was to wait for the market; this time the market left no way out." }
            }
          }
        ]
      },
      {
        id: "wh_shooting",
        title: "Day three, and the nation waits for your second sentence",
        body: "Ten days of half-staff already sit on the ceremony calendar. The Senate majority leader says the votes are not there and will not be inside three weeks. The mayor of that city tells anyone who will listen that federal action cannot be another condolence letter in a different format. Two survivors' representatives come to the White House this afternoon, and someone downstairs has already handed reporters the notes from their meeting with your chief of staff. Families counting the votes from the gallery can be your witnesses, or your jury.",
        choices: [
          {
            id: "bill",
            text: "Ram a federal bill through overnight and bring the families to the White House to watch the count",
            outcomes: {
              crit: { body: "The bill clears in the forty-ninth hour with the families seated just behind your shoulder. That night the poll moves a full notch, and even commentators who always oppose you admit the White House used verbs on day three, not adjectives." },
              ok: { body: "Only half the provisions pass, but it is the first bill signed on this in twenty years. You are wrecked; so is the country." },
              meh: { body: "The bill sticks in a Senate committee, and the families stand two hours on the steps for photographs. It happened; that is all it was." },
              fail: { body: "The last five votes never come together. The next morning the front page is the families' retreating backs, and the headline needs no subject from the reporter." },
              critfail: { body: "Two hours before the count, a member of your own party leaks the full draft with one line attached: the White House never meant to ask Congress. The bill dies, and the families say on television they could have been told sooner — now the whole country knows who did not tell them." }
            }
          },
          {
            id: "speech",
            text: "Go straight to the memorial in that city and speak at the podium yourself",
            outcomes: {
              crit: { body: "You read every name aloud and use no policy term once. A clergyman tells reporters it is the first decent thing he has seen in three years." },
              ok: { body: "The speech is filmed in the room, and the applause covers scattered boos. You sit with several families for a long time, and the cameras are there." },
              meh: { body: "A competent, safe address: eulogy full, names right, and no one repeats a line of it the next day." },
              fail: { body: "Someone stands and shouts halfway through, and security lunging is a faster-moving image than your name. You hold ten extra seconds at the podium; those ten seconds cut into every opponent's reel." },
              critfail: { body: "You mispronounce one victim's name in the reading, then keep going on the page where you should have stopped. The city takes a week to decide whether to forgive you and a second week to find it cannot decide." }
            }
          },
          {
            id: "committee",
            text: "Order half-staff only and commission a national committee to study it",
            outcomes: {
              crit: { body: "The committee holds two genuine specialists, and six weeks later they hand you workable consensus on the contested provisions. You sign as written. The silence reads as steadiness." },
              ok: { body: "The flag comes down, the ceremony is held, no one catches an error. Television changes subjects within a week." },
              meh: { body: "The committee's report will take two years. Everyone knows this, including the committee." },
              fail: { body: "The mayor frames the invitation: the White House answered with half-staff. The city council runs the memorial tape for everyone free, subtitled with the federal schedule." },
              critfail: { body: "The committee's first shortlist names lobbyists for two trade associations, and the families hold the list over their heads outside the White House fence. From the next day the whole country asks which side this committee is studying." }
            }
          }
        ]
      },
      {
        id: "wh_blackout",
        title: "Blackout week three, and the hospital diesel gauges are falling",
        body: "The intelligence agencies and the energy department point the same way, but the full read is not yet something you can carry out and confront anyone with. A utility president in the dark zone asks for authority to shed nonessential load at night; health officials warn that three hospitals hold ten days of generator diesel. The treasury secretary has asked twice what the phrase foreign intrusion does to the tape. An opposition senator is rehearsing for Sunday's program with one question: when did the president find out. And if the quiet channel ever sees daylight, every word you said publicly becomes a debt.",
        choices: [
          {
            id: "expose",
            text: "Name that country publicly and recall the ambassador",
            outcomes: {
              crit: { body: "On the fourth day after the naming, a back channel answers: the keys to the attack script handed over, and the grid comes back hour by hour. At the podium you say one sentence: they saw what we saw." },
              ok: { body: "The market closes green for a day, but the diplomatic machinery starts in full, and the other side cuts its relay servers in week three. The blackout ends; the cost is both embassies half a notch colder." },
              meh: { body: "The recalled ambassador poses at the airport, the other side denies everything, and grid repairs run as before. The tough posture is remembered, and digested." },
              fail: { body: "After the naming the other side escalates, and a second substation runs the same script that night. Papers begin reaching for the headline about provoking a country that will not answer the phone." },
              critfail: { body: "The named country produces your own intelligence summary as rebuttal, showing the White House knew three weeks ago and chose silence. The power still does not come; the world first gets a hearing on whether you lied." }
            }
          },
          {
            id: "quiet",
            text: "Apply pressure through private channels while quietly routing diesel to the hospitals",
            outcomes: {
              crit: { body: "The back channel works inside a week; the other side closes its attack node and calls it a technical fault. Diesel trucks enter hospital back doors one at a time. The country only knows the power came back, not why; you know." },
              ok: { body: "No hospital loses a day of generator power, and the negotiation advances where no one is watching. Three weeks later the grid ties back together, and your approval barely takes a mark." },
              meh: { body: "The diesel arrives on time; the attacks do not stop, they only slow. This quiet war stays so quiet no one believes you fought it." },
              fail: { body: "One paper traces the fuel convoys and pulls the whole private channel up by the root. Who is the White House talking to holds the front page nine days longer than the blackout." },
              critfail: { body: "The full text of your pressure note leaks, and the other side prints it beside your own public reassurance from three weeks ago. The hospitals held until the diesel came; your credit did not." }
            }
          },
          {
            id: "bury",
            text: "Sit on the cyberattack story and keep the official line at aging equipment",
            outcomes: {
              crit: { body: "The aging-equipment line holds until the grid is repaired, and the futures tape does not even dip. By the time technician rumors ferment into an inquiry, the file is archived." },
              ok: { body: "The market rides out three weeks calm, and no one presses on the cause of the outage. You kept the tape steady; what you owe is an explanation with a due date." },
              meh: { body: "The official line and the utility's internal minutes differ by a country mile. For now no one minds. For now." },
              fail: { body: "A grid engineer mails an assessment summary to a weekly, and the headline puts quotation marks around the word aging. You have to send the treasury secretary on the shows to explain a line that explains worse the more it talks." },
              critfail: { body: "The resuscitation footage from the night the hospital diesel ran out airs on the same reel as the aging-equipment release. In week three the country learns a new term harder to bear than a blackout: the White House blackout." }
            }
          }
        ]
      },
      {
        id: "wh_pardon",
        title: "His file has pages with your signature on them",
        body: "Sentencing could come by month end, and his lawyer says he will not cooperate with prosecutors to his dying day. The White House counsel's office has built a list: of the nineteen documents in the case, three carry your signature from your state house days. Signing a pardon admits you knew at the time, and the special prosecutor gains a whole chapter by tomorrow. The party chairman came by last week and said, smiling, that you are not running again, so think about what you still want. His wife sent a handwritten letter through the old doorman who served your first office; the envelope says only, to the president himself.",
        choices: [
          {
            id: "pardon",
            text: "Sign the pardon and spare him the trial",
            outcomes: {
              crit: { body: "You take questions before you sign, reading the three documents you signed aloud, one by one, and then say you knew nothing of the rest. Loyalty and candor rarely share a frame; even the weeklies' covers soften half a notch." },
              ok: { body: "The pardon stands. The shouting is loud, but you did not dodge it, and the party's old hands say it is one of the few things on you Washington never washed off." },
              meh: { body: "The papers get signed, the storm arrives, and two weeks later the next story buries it. Only a history section tutor puts the date in a lecture note." },
              fail: { body: "A senior Justice Department official resigns in protest, and the letter runs in full. What you signed in the Oval Office was a pardon; in their telling it is a receipt." },
              critfail: { body: "The day after the pardon, prosecutors move the three signed documents into a superseding indictment — your signature becomes their new evidence, and the pardon your new motive. Not running again, you learn for the first time that some debts are not collected at the ballot." }
            }
          },
          {
            id: "cut",
            text: "Refuse the pardon and publicly announce the break with him",
            outcomes: {
              crit: { body: "Your statement runs three paragraphs, names him in none of them, and makes plain in all three that the rule does not bend for old friends. Next morning the editorials write it as institutions, not as feud." },
              ok: { body: "The cut is clean and the press finds no hook. Only you read the letter more times than you admit." },
              meh: { body: "You did not sign, and he was sentenced anyway. At party dinners your seat is still saved; the table just sits farther and farther apart." },
              fail: { body: "The night your statement goes out, he gives an interview one line long: I do not blame him, I thought people would save him like that too. It plays for a full week, and runs longer than any indictment." },
              critfail: { body: "Photos surface of the old staff at the sentencing: a room of people who left the state with you, all looking at the empty seat you kept. Within a week three state chairmen quit the party under one slogan: a White House that sells out its own." }
            }
          },
          {
            id: "delay",
            text: "Sign nothing and refuse nothing; carry the decision past your term to your successor",
            outcomes: {
              crit: { body: "Sentencing, appeal, and the filing of the record all land on the transition checklist. You spend nothing and lose nothing; you simply put the question, unopened, into someone else's box." },
              ok: { body: "You did nothing, so no one caught anything. All that is left is the press guessing, and the guessing is itself the penalty." },
              meh: { body: "On your last day the application still sits at the bottom of the drawer, not even denied. Your successor opens it in week three." },
              fail: { body: "Your counsel refuses to vouch for the silence and sends the resignation to everyone. The evening news stops calling it delay and starts calling it a White House that has learned not to answer." },
              critfail: { body: "His health gives out in the waiting, and the prison medical log goes on the same exhibit board as your office calendar. No reelection to lose, you find that some questions cast no votes and still run a term — inside you." }
            }
          }
        ]
      }
    ]
  }
});
