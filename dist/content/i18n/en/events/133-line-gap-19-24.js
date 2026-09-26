/* ============================================================================
 * CONTENT · i18n/en/events/133-line-gap-19-24.js
 * 英文覆盖层：对应 content/events/133-line-gap-19-24.js（2019—2024 定点大事补薄）。
 *
 * 契约（详见 docs/I18N.md §3/§4）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的字段；事件按 id 定位。
 *   · 结构性键（id / base / mods / cost / stake / effects / flags …）由引擎保护，本文件不写。
 *   · 英文按第二人称、现在时、短句重写；「」不直译，改英文引号或句式。
 *   · 标题一律 sentence case：只首词与专有名词（House / Supreme Court / Congress）大写。
 *   · 本文件无 worldline：2019/2023/2024 年带由 127/128 owner 覆盖，不重复。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* 2019-02 · 十年期气候与工业新政决议在众院提出 */
      {
        id: "ln19_gnd",
        title: "A ten-year climate and industry resolution lands in the House",
        body: "In February a ten-year 'climate and industrial mobilization' joint resolution — a statement of position that never goes to the executive to sign, no vote, it just nails the issue to the agenda — hits the House floor: near-zero-carbon power, infrastructure and job retraining bundled into one appropriation. It is no bill that can pass — yet it cleaves the party in two. Coastal newcomers jostle to co-sponsor; lawmakers from fossil-fuel states get caught between a ringing phone and a hearing room. A brand-new caucus of a handful of seats becomes, overnight, both ally and target.\nCo-sponsor early: hesitate one day and the tiny caucus files you under the other side. You have not learned all their names — they have already learned yours.",
        choices: [
          {
            id: "back_plan",
            text: "Co-sponsor: lift the ten-year mobilization into your main theme with the caucus",
            note: "A bet that this route purge carries you to a new camp's door. Wrong, and the energy states blacklist you first.",
            outcomes: {
              crit: { body: "You shout 'a generational mobilization' onto every national panel; young voters and green money flood in. The caucus treats you as its face; the machine starts seating you on purpose." },
              ok: { body: "You signed and you showed up: your base feels avenged, the donors keep a tab. Standing unchanged; the label stuck." },
              meh: { body: "You co-signed, but the louder newcomers stole the thunder; no credit lands on you." },
              fail: { body: "Energy-state counter-ads loop inside your district; 'he guts our jobs' plays verbatim, night after night." },
              critfail: { body: "An old oil holding of yours surfaces, straight against 'farewell to fossil fuel'. He only believes in climate when he's performing hits the headline." }
            }
          },
          {
            id: "negotiate",
            text: "Rewrite the terms into your own ledger: grid resilience, plants and retraining jobs at home",
            note: "Money buys the 'fixer' sign. Bid to both sides: land it and both owe you, crash and both call you slippery.",
            outcomes: {
              crit: { body: "You talk 'don't leave this town behind' into a rider, and labor and commerce each save you a seat. The press dubs you the man who closes deals; both camps have to admit it." },
              ok: { body: "You clawed a pilot grant; the text barely moved, but your street's name is on the list." },
              meh: { body: "A few rounds of haggling land only in 'next session, please' — no money, no clause." },
              fail: { body: "Both ends feel played: progressives curse you for diluting the plan, factories for letting the wolf in." },
              critfail: { body: "The contractor you wired for 'retraining' lists an old friend on its books. Crisis profit — somebody says it, half laughing, for the first time." }
            }
          },
          {
            id: "listen_local",
            text: "Take no side: hold one local grid-and-jobs hearing, wager not a word",
            outcomes: {
              crit: { body: "While the country argues routes, you only lay out local power rates and jobs and listen to the end. The new-year review gives you the rare words: 'actually listened'." },
              ok: { body: "You touched no route line and handled what needed handling. No praise, no leverage on you." },
              meh: { body: "Your hearing runs lukewarm; both camps file you under 'other'." },
              fail: { body: "Both camps pack the same town hall and ask: do you back it or not. Your dodge logs as guilt." },
              critfail: { body: "Both sides spin your silence the same way: he knows he has no case. That hat is harder to take off than any position." }
            }
          }
        ]
      },

      /* 2023-08 · 一位前总统先后被联邦与州检方起诉 */
      {
        id: "ln23_indict",
        title: "A former president is charged by federal and state prosecutors",
        body: "From midsummer into fall, a former president is indicted first by a federal special counsel — a prosecutor outside the ordinary line — then separately by one state's prosecutors for interfering in an election: documents, classified files, ballots — dozens of counts landing on the same dates as his campaign rallies. His own party cries 'persecution'; the opposition calls it 'accountability'. Article III and Section 3 of the Fourteenth Amendment — the clause that bars anyone who engaged in insurrection from office — are raised, for the first time, as a primary-eligibility question, and scholars are currently backing both answers at once.\nThe two cases run on separate tracks. How you name them now is how the court filings will quote you.",
        choices: [
          {
            id: "defend",
            text: "Shield the former president: insist both cases are political persecution",
            note: "A bet the base craves exactly this hard line. Wrong, and you are the man who defended a known crime.",
            outcomes: {
              crit: { body: "You take every hit for him on live TV; the rally chants your name. The base claims you as one of its own; the party corridors open." },
              ok: { body: "You cried persecution: your side feels avenged, the other keeps a ledger. Standing did not move; the label stuck." },
              meh: { body: "You cursed along twice and nobody picked it up — this script has no lines for you." },
              fail: { body: "The indictments are read aloud on TV count by count, and your 'innocent' gets harder to say each night." },
              critfail: { body: "An old favor of yours surfaces, straight against the 'political witch hunt' you preach. He only believes in rule of law when it helps him hits the headline." }
            }
          },
          {
            id: "eligibility",
            text: "Adopt the rival frame: push to send the eligibility clause to be decided",
            note: "A bet that the 'Constitution's gatekeeper' hat is worth something. Fire on your old boss, and the party nails you as a turncoat.",
            outcomes: {
              crit: { body: "You set 'is he even eligible' as a constitutional question; the commentariat erects you a 'person who talks rules' arch. Establishment and press rarely praise a man in the same column." },
              ok: { body: "You filed the accountability letter; the issue pins onto a hearing docket. Your party finds you noisy; nobody calls you wrong to your face." },
              meh: { body: "You cited chapter and verse; the hearing is scheduled after the election. Nobody gets a result." },
              fail: { body: "The party hears 'eligibility' as 'treason'; your donor list starts to leak." },
              critfail: { body: "A record of you 'putting in a word' for the state prosecutors leaks out — the accountability man is now the one held accountable. Colluding with the enemy lands on your head." }
            }
          },
          {
            id: "casework",
            text: "Refuse the framing: just get your district's work done",
            outcomes: {
              crit: { body: "While the country argues indictments, you pose in front of a burst water main. Local media, of all people, hand you the words 'got work done'." },
              ok: { body: "You dodged every naming question and handled what needed handling. No praise, no leverage on you." },
              meh: { body: "You sidestepped this round of shouting — and everyone's memory of you." },
              fail: { body: "Both camps pack the same town hall and ask which side you're on. Your dodge logs as guilt." },
              critfail: { body: "Both sides spin your silence the same way: he knows he has no case. That hat is harder to take off than any position." }
            }
          }
        ]
      },

      /* 2024-07 · 最高法院裁定总统官方行为豁免 + 同月选举年换人 */
      {
        id: "ln24_immune",
        title: "The Supreme Court draws an immunity line around a president's official acts",
        body: "In July, the Supreme Court rules six to three: a president's official acts — what he does by office, set apart from private conduct — carry criminal-prosecution immunity. The core of official behavior is absolutely immune; the rest is reviewable, and whether he can be charged now turns on a lower court's line between 'official' and 'private' — the case is remanded, sent back down for a new ruling, and nobody guarantees a hearing before the vote. The same month, the governing party suffers a rare election-year switch: the incumbent withdraws, his vice president takes the baton — yet the new nomination is not locked until the August convention.\nSome say the successor's staff list has already been quietly screened. The words you choose for this ruling tonight get quoted in reverse by fall.",
        choices: [
          {
            id: "ride_change",
            text: "Bet the new day: make 'refresh' your theme for the vice president who takes over",
            note: "A bet that the switch brings compound interest in money and morale. Wrong, you rode a ladder not yet steady.",
            outcomes: {
              crit: { body: "You shout 'the turned new page' into every feed; the surge from the switch lifts you onto its crest too. Your name is on the new team's list." },
              ok: { body: "You land on the 'promotable' list and the 'weather-vane' list at once — both sides, same week." },
              meh: { body: "You chanted 'new' along, but the real star stole the wind; nobody recalls your slogan." },
              fail: { body: "The surge comes and goes fast, and your 'backed too early' gets cut into a contrast ad on loop." },
              critfail: { body: "The new team's infighting throws you out as its old-thread sacrificial offering: 'that fence-sitter'. A cautionary tale for both parties at once." }
            }
          },
          {
            id: "attack_immunity",
            text: "Attack the immunity ruling: call it 'a get-out-of-jail card for one man'",
            note: "A bet that institutional dread turns into turnout. Fire on the court, and you push establishment and law enforcement to the far side.",
            outcomes: {
              crit: { body: "Your 'no man is above the law' loops on every network; the 'gatekeeper of the rules' sign hangs above your door." },
              ok: { body: "You blasted the ruling; your own side's morale holds, and the other side notes a debt." },
              meh: { body: "You shouted for a week, then the same month's switch story buried you whole." },
              fail: { body: "Your fire on the court reads as 'ignorant of the Constitution'; the legal guild censures you in unison, the press finds you over the line." },
              critfail: { body: "The passage of the ruling you quoted gets disproved; the indictment swings around into your own joke. A spokesman reads your name and exhales." }
            }
          },
          {
            id: "quiet_prep",
            text: "Rule nothing, back no side: quietly prepare the transition, do the local work",
            outcomes: {
              crit: { body: "While the country argues immunity and the switch, you only file what needs filing and run the errands due. Afterward, 'steady' is the word the review picks for you." },
              ok: { body: "You touched no naming question and handled what needed handling. No praise, no leverage on you." },
              meh: { body: "You slipped past this wind — and past everyone's memory of you." },
              fail: { body: "Both camps pack the same town hall, each wanting a statement. Your dodge logs as guilt." },
              critfail: { body: "Both sides spin your silence the same way: he knew the ending and dared not speak. That hat is harder to take off than any position." }
            }
          }
        ]
      }
    ]
  }
});
