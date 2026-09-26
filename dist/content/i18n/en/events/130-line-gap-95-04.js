/* ============================================================================
 * CONTENT · i18n/en/events/130-line-gap-95-04.js
 * 英文覆盖层 · content/events/130-line-gap-95-04.js（1995—2004 定点补薄 4 张）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的文案字段。
 *   · 事件按 id 定位；choices / terms 按 id / 下标对齐。
 *   · 结构性键（minYear / tierMin / weight / base / mods / cost / req / stake /
 *     effects / flags / grade / category / valence / photo / month …）由引擎保护，写了会报 validate 错。
 *   · 英文按英语重写，不逐字翻：第二人称、现在时、短句；「」改英文引号；
 *     英文标题 sentence case（只首词与专名大写）。本文件不覆盖 worldline（补薄卡不写世界线）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "ln95_shutdown",
        title: "The federal government shuts down twice in a budget standoff",
        body: "To force steep cuts to Medicare and education spending, Congress and the White House let the budget talks collapse. A shutdown — agencies halt operations when no budget passes — took the federal government dark again in mid-December, for over three weeks.\n" +
          "National museums closed, passport and immigration services stopped, hundreds of thousands of workers went home unpaid. Both sides bet the other would blink first — and that bill would not come due until next year's ballots.\n" +
          "Some say the White House is quietly drafting a way to concede.",
        choices: [
          {
            id: "holdline",
            text: "Hold the line: let the government stay shut rather than yield on Medicare or schools",
            note: "Betting that outlasting forces a signature. Risk: a long shutdown, and voters bill the ones who called for it.",
            outcomes: {
              crit: { body: "The White House signs on your terms. The machine and the money men file you under 'says what he means,' and the donation calls don't stop." },
              ok: { body: "You resisted the compromise. Upper tiers owe you one; locally, the people who live off federal paychecks start keeping a grudge." },
              meh: { body: "Too many were tough that winter. Yours was one more voice." },
              fail: { body: "The shutdown runs through Christmas, the polls turn, and editorials point at you on 'whoever closed the museums.'" },
              critfail: { body: "Unpaid workers picket your door with the sign 'He'd rather we go without.' The inquiry letter follows." }
            }
          },
          {
            id: "broker",
            text: "Broker a deal: reopen the government now, leave the cuts to a committee",
            note: "Betting the exhausted middle hates the shutdown. Risk: both sides note who blinked first, and you take credit and blame alike.",
            outcomes: {
              crit: { body: "The lights come back on through your wrangling. Two papers run you as 'the one who reopened it,' and even opponents have to concede the favor." },
              ok: { body: "The doors open, everyone gives a little. Each side breathes easier — and each marks you down half a notch for softness." },
              meh: { body: "A deal was reached. It wasn't signed with your name." },
              fail: { body: "The deal collapses, and both camps turn around to say you reneged last-minute. You become the scapegoat for round two." },
              critfail: { body: "Your draft text leaks verbatim. Nobody wins, and the scandal cap is sewn onto your head alone." }
            }
          },
          {
            id: "helpworkers",
            text: "Back no side: run errands for unpaid workers and residents stuck without documents",
            note: "Betting work outlasts posturing. Risk: when both sides demand a stance, silence reads as a crime too.",
            outcomes: {
              crit: { body: "The emergency loan fund and expedited desk you set up saved hundreds of families. Afterward, the one measure nobody complained about was yours." },
              ok: { body: "You did what needed doing and dodged what needed dodging. Steady." },
              meh: { body: "You helped with a lot of small, concrete things. No one remembers it." },
              fail: { body: "A party spokesman says: at a time like this, all he'll do is hand out bread, never say a word about the problem." },
              critfail: { body: "One muddled relief payment gets dragged through the paper. Small and annoying — the headline used the word 'stunt.'" }
            }
          }
        ]
      },
      {
        id: "ln97_tobacco",
        title: "Tobacco industry files go public as lawsuits and settlements close in",
        body: "Forced by litigation, decades of the tobacco industry's internal memos and testimony — its own sealed secrets, opened by court order — were released in batches: in black and white, they had engineered addiction.\n" +
          "The federal government had already sued; the states followed. A settlement too large for anyone to say aloud was being negotiated on and off. Trial lawyers, health insurers and deficit-starved state treasuries all crowded the table, waiting for a cut.\n" +
          "Some say the industry means to buy immunity with the payout. In five years this settlement reads as triumph or as IOU — it will be priced by the money you take and the words you say now.",
        choices: [
          {
            id: "prosecute",
            text: "Side with the suit: take the whole concealment chain to trial",
            note: "Betting the exposure story keeps rising. Risk: industry lawyers bite back, and donors blacklists you.",
            outcomes: {
              crit: { body: "The documents nail the case. Your call to 'take them to court' becomes the national refrain, and the press and the base both log you as the one who dared touch a giant." },
              ok: { body: "You gave the anger an address and a name. The business clubs start setting the dinner table without your place card." },
              meh: { body: "Many cried accountability. You ranked in the middle." },
              fail: { body: "The case stalls on procedure; the industry's hired experts rebut your wording, and the paper calls you an amateur prosecutor." },
              critfail: { body: "A document you cited is challenged as improperly obtained, and a countersuit lands on your desk. Scandal label: affixed." }
            }
          },
          {
            id: "settle",
            text: "Pragmatic cash: win your state a big payout to plug the Medicaid hole",
            note: "Betting a bird in the hand is worth it. Risk: later, people say you put a price on addiction.",
            outcomes: {
              crit: { body: "On the day the settlement lands you hold a press conference over the incoming money, the Medicaid gap fills a little, and the machine files you as 'the one who gets paid for his state.'" },
              ok: { body: "The money came in, the job got done. Only the churches and the anti-smoking groups look at you differently now." },
              meh: { body: "Settlement, shmettlement — your slice didn't amount to much." },
              fail: { body: "The terms get reread aloud: 'pricing addiction for a budget line,' with your smiling photo on top." },
              critfail: { body: "Records show you dined with the industry before you ever negotiated. The word 'bought' sticks." }
            }
          },
          {
            id: "quitcare",
            text: "Touch none of the money: just build quit-help and patient care in your district",
            note: "Betting you can score without picking a side. Risk: the spotlight goes to those suing and those cashing out; you just show up.",
            outcomes: {
              crit: { body: "Two years on, the cleanest position was yours: no money taken, no side spoke for, quitline books spotless." },
              ok: { body: "You did the real work and got none of the words that would have to be replayed." },
              meh: { body: "You did what needed doing. No one praised it; no one faulted it." },
              fail: { body: "Both camps come asking your view on the case; you answer neither, and each hands you the same nickname: mushy." },
              critfail: { body: "One small mishandled care payment gets swept into the settlement-money fight. It clears, eventually; the label stays." }
            }
          }
        ]
      },
      {
        id: "ln02_sniper",
        title: "A sniper terrorizes the commuter highways around the capital",
        body: "Along several interstate highways around the capital, gunfire rang out again and again over three weeks: ten dead, many more wounded, the targets seemingly random commuters.\n" +
          "Federal agents poured in, schools closed one after another, state troopers set checkpoints on the highways; the hunt has already narrowed to two gunmen drifting across jurisdictions. Everyone rolled up windows and drove around the gas stations. Soon the panic became a political question: who can keep you safe?\n" +
          "When the case breaks — and whether that will already be too late — nobody hands out dates.",
        choices: [
          {
            id: "securitize",
            text: "Escalate security: shut down highways, extend curfews and closures, demand federal resources",
            note: "Betting force steadies the panic. Risk: if they're never caught, the martial look draws more fire than the case.",
            outcomes: {
              crit: { body: "The heavy patrols and joint checkpoints force a break; the night the gunmen fall, you turn 'I said get tougher' into the town's footnote on safety." },
              ok: { body: "You shouted 'more boots' loudest. Law enforcement is well disposed to you, even though the case stays open." },
              meh: { body: "Too many demanded tougher security. Yours sat mid-list." },
              fail: { body: "The lockdown intensified without bringing safety; an abusive stop makes news — and you were on record praising exactly that approach." },
              critfail: { body: "An innocent man is tackled as the suspect. The complaint list lands in front of you with 'he pushed hardest' laminated on top." }
            }
          },
          {
            id: "coordel",
            text: "Run a joint task force: shared intelligence across jurisdictions instead of everyone hunting alone",
            note: "Betting coordination beats noise. Risk: when jurisdictions squabble, the man who called for it gets blamed first.",
            outcomes: {
              crit: { body: "The cross-jurisdiction line you built assembled scattered clues into a picture. The closing report singled out that mechanism — the press lists you among the early clearheads." },
              ok: { body: "The machinery went up, agencies shared data with bad grace, and reporters thought you'd found the real lever." },
              meh: { body: "Your plan jammed on jurisdictional turf. Hearings happened; the task force didn't." },
              fail: { body: "A preventable gap gets blamed on failed coordination — and you're the titular coordinator." },
              critfail: { body: "The shared platform leaks case details; the agencies turn on you for overreach, and the inquiry shifts to you." }
            }
          },
          {
            id: "watch",
            text: "Don't seize the safety podium: organize block watches, escort school runs, debunk rumors",
            note: "Betting reassurance outlasts posturing. Risk: when accountability rises, the quiet ones are read as absent.",
            outcomes: {
              crit: { body: "While everyone else shouted to shut roads down, your escort convoy and tip-verification hotline kept one community from hysteria. In hindsight, that calm was logged as a win." },
              ok: { body: "You did the grassroots reassurance work. No front page, no blacklist." },
              meh: { body: "You did some things, on lists nobody publishes." },
              fail: { body: "Someone mutters he won't even mention the case — just poses at elementary-school gates." },
              critfail: { body: "A preventable incident gets pinned on you: why didn't the watch see it? 'He was there and missed it' spreads." }
            }
          }
        ]
      },
      {
        id: "ln04_report",
        title: "A bipartisan commission blames the 9/11 attacks on failures inside the government",
        body: "After nearly twenty months of hearings, a bipartisan investigative commission — an independent, cross-party body probing the attacks' causes — delivered its final report, attributing 9/11 to a chain of failures that 'could have been stopped': agencies that wouldn't share intelligence, and a threat-grading system in name only.\n" +
          "Six weeks before the election, the report owned the front pages; both parties' commissioners signed it, so no one could wave it off as an opposition paper. The White House's first move was to fight back: overstated, misleading. At your level, three outlets have booked tomorrow morning's question: how do you read this report?\n" +
          "Accountability or campaign fuel — nobody has played that card openly yet, and the line you set tonight comes due in six weeks.",
        choices: [
          {
            id: "account",
            text: "Follow through on the report: push intelligence-sharing and threat-grading reform",
            note: "Betting the reform story survives hindsight. Risk: the White House brands you misleading, and that federal line shuts on you.",
            outcomes: {
              crit: { body: "Reform legislation lands soon after, citing your hearing question. Both the press and the security world log you as 'the one who took the report seriously.'" },
              ok: { body: "You seized on 'stop talking past each other.' The direction was right; the White House line hasn't budged." },
              meh: { body: "Your reform cry drowned in the two parties' election noise." },
              fail: { body: "Reform stalls in an institutional tug-of-war, and the counterattack 'smearing the security team for an election' names you." },
              critfail: { body: "One piece of testimony you cited is judged inaccurate; the counter-inquiry turns on you, and the label is affixed." }
            }
          },
          {
            id: "ammunition",
            text: "Turn the report into ammunition: press the White House 'misled us' line, full volume for six weeks",
            note: "Betting accountability converts to votes. Risk: after the election, whoever spent the report gets spent back.",
            outcomes: {
              crit: { body: "Your 'they misled us' clip runs on loop in the opposition's ads; the base and war-weary voters claim you as the one who gets angry for them." },
              ok: { body: "You gave the anger a target and grabbed the air. The establishment side noted it in its ledger." },
              meh: { body: "Too many surfed this wave; your line ranked mid-pack." },
              fail: { body: "The election passes, the reckoning over 'exploiting 9/11' begins, and your loudest sentence gets re-dubbed." },
              critfail: { body: "The 'misled' charge you made is disproven; the paper flips the headline to 'who's misleading,' and it bites back on you." }
            }
          },
          {
            id: "localfix",
            text: "Don't campaign on it: implement the report's emergency and intel-liaison checklist in your own jurisdiction",
            note: "Betting the work is more durable than the podium. Risk: the noise belongs to those shouting for accountability or for blood.",
            outcomes: {
              crit: { body: "While both parties traded barbs over the report, you quietly filled in the local emergency-liaison gaps. Two years later, during a scare, yours was the only jurisdiction that didn't drop the ball." },
              ok: { body: "You did the untraceable, unforgettable work. Steady." },
              meh: { body: "You implemented your checklist. No one came to audit it; no one came to thank you." },
              fail: { body: "Both sides ask the same day for your take on the report; you answer 'I'm busy working,' and the story calls it evasion." },
              critfail: { body: "One emergency purchase gets swept into the partisan fight. Small and annoying — the headline carries your name." }
            }
          }
        ]
      }
    ]
  }
});
