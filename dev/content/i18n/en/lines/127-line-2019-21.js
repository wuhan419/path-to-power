/* ============================================================================
 * CONTENT · i18n/en/lines/127-line-2019-21.js
 * 英文覆盖层：对应 content/events/127-line-2019-21.js（2019—2021 定点大事）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的字段；事件按 id 定位。
 *   · known / rumor / unknown 为纯字符串数组，整体替换，必须整条给全。
 *   · 结构性键（id / base / mods / cost / stake / effects / flags …）由引擎保护。
 *   · 英文按第二人称、现在时、短句重写；「」不直译，改英文引号或句式。
 *   · worldline 的 brief / outlets 同步覆盖（outlets 用真实英文媒体名）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* 2019-12 · 弹劾前幕：众院通过两条条款 */
      {
        id: "ln19_impeach",
        title: "The House impeaches, and the country splits along party lines",
        body: "A phone call demanding Ukraine 'look into' the rival party's likely front-runner, plus a frozen military aid package: the House opened its inquiry in September. On December 18, two articles of impeachment passed straight down party lines — the third president in history impeached by the House.\n" +
          "The White House calls it a coup. The opposition calls it constitutional self-defense. The trial moves to the Senate. The local paper wants your position tonight; both party hotlines are ringing. You know this stop is not a legal question — it is the dress rehearsal for 2020.",
        brief: {
          lede: "Impeachment has no middle ground: one sentence is one side chosen, and it follows you through the whole election year.",
          known: [
            "Two articles — abuse of power and obstruction of Congress — voted almost entirely along party lines.",
            "The Senate trial is run by the majority leader; most observers think the ending is already written.",
            "Your December posture will be reweighed on the primary-season scale."
          ],
          rumor: [
            "Some say the real target is this fall's Senate races and the trial is just scenery.",
            "Some say by spring nobody will be talking about anything but another virus."
          ],
          unknown: [
            "Every word you say tonight will be replayed next year.",
            "This page will be flipped fast by a bigger storm."
          ],
          terms: [{ k: "House impeachment", v: "The House charges, the Senate tries; impeachment is not removal." }]
        },
        choices: [
          {
            id: "back_proc",
            text: "Defend the process: demand Senate witnesses, no rushed verdict",
            note: "A bet that voters care about rules more than party. Lose, and both sides remember whose errand you ran.",
            outcomes: {
              crit: { body: "Your line — a trial with no witnesses, what do you call it? — gets quoted by national media. The 'person who talks rules' sign is hung above your door." },
              ok: { body: "You call for the full process. It sounds decent and kills nothing outright. Nobody wins votes on it either." },
              meh: { body: "Your statement is lukewarm. Both the party machine and the reform camp file you under 'other'." },
              fail: { body: "Both sides think you talk too much: your party calls you a fence-sitter, the reformers say you drip words one at a time." },
              critfail: { body: "An old favor of yours surfaces — the very opposite of the 'fair process' you preach. He only believes in rules that help him hits the headline." }
            }
          },
          {
            id: "defend",
            text: "Shield the president: call the whole thing a partisan coup",
            note: "You spend favors to enter the bet, wagering the base craves exactly this hard line. Guess wrong and you are the man who defended a known crime.",
            outcomes: {
              crit: { body: "You take every hit for the White House on live TV; the president reposts you personally. The base claims you as one of its own; the party corridors open." },
              ok: { body: "You cried coup. Your side feels avenged, the other side keeps a ledger. Your standing did not move; the label stuck." },
              meh: { body: "You cursed along twice and nobody picked it up — this script has no lines for you." },
              fail: { body: "The articles are read aloud on TV one clause at a time, and your 'innocent' gets harder to say each night." },
              critfail: { body: "White House counsel letterhead passed through your hands; a single story ties you to the obstruction chain." }
            }
          },
          {
            id: "local",
            text: "Touch none of it: work your district into the new year",
            outcomes: {
              crit: { body: "While the country screams about impeachment, you pose in front of a burst water main. The new-year review gives the phrase 'got work done' — to you, of all people." },
              ok: { body: "You dodged every impeachment question and handled what needed handling. No praise, no leverage on you." },
              meh: { body: "You sidestepped the shouting match — and everyone's memory of you." },
              fail: { body: "Both camps pack the same town-hall room and ask which side you are on. Your dodge is logged as guilt." },
              critfail: { body: "Both sides spin your silence the same way: he knows he has no case. That hat is harder to take off than any position." }
            }
          }
        ]
      },

      /* 2020-02 · 弹劾后幕：参院宣判无罪 */
      {
        id: "ln20_acquit",
        title: "Acquitted: the impeachment page turns, the election machine starts",
        body: "The articles reached the Senate in December; on February 5 they bounce back unchanged — both short of two-thirds, no witness called. The White House throws a party; the House speaker says history will remember this cover-up.\n" +
          "The country did not turn the page; it slipped the page into the ballot box. The primaries are already in the ledger, and everyone is recalculating: what was your posture last winter worth this spring?",
        brief: {
          lede: "The verdict is in; the bill is not. How you speak now is how you bet.",
          known: [
            "Acquittal was in the script: the rules belong to the Senate majority leader.",
            "One senator from the president's own party crossed for a single moment; pundits are still hunting his clones.",
            "The primaries open this month — you must set your tone before the base does."
          ],
          rumor: [
            "Some say quiet deals over the next nomination are already running, and someone filed your name."
          ],
          unknown: [
            "Everyone you offend tonight is on the ballot a year and a half from now.",
            "The procedural workaround is precedent now. Who uses it next, nobody says."
          ],
          terms: [{ k: "Party-line vote", v: "Roll call splits almost perfectly by party." }]
        },
        choices: [
          {
            id: "move_on",
            text: "Turn the page: shut up about it, talk kitchen-table again",
            outcomes: {
              crit: { body: "Your 'enough trials — look at gas and drug prices' loops on local evening news. Both camps, exhausted by the fight, treat you as the exit." },
              ok: { body: "You steer the subject off. Nobody catches you on a side. Safe — and no ammunition banked." },
              meh: { body: "The noise is so loud your 'let's move on' is a pebble down a well." },
              fail: { body: "Both machines call you mush at once: one side hears a backhanded conviction, the other a pretending nothing happened." },
              critfail: { body: "Pincushioned at a local debate — do you support impeachment or not, ten minutes of answers, only the squirm gets cut into the ad." }
            }
          },
          {
            id: "keep_fight",
            text: "Make 'the Constitution was trampled' your primary slogan",
            note: "All attention on the compound interest of rage. Right, you flag a new camp. Wrong, you are last season's news nobody wants.",
            outcomes: {
              crit: { body: "You become the loudest local name among this generation's rule-keepers. Money and invites flood in; the machine starts seating you on purpose." },
              ok: { body: "Your steady fire holds the base. The establishment finds you noisy; nobody says you were wrong to their face." },
              meh: { body: "Two months of shouting to an emptying room — everyone is tired." },
              fail: { body: "A pandemic is on its way, and overnight your impeachment lines become the wrong century." },
              critfail: { body: "Your attack on the 'traitor senator' is cut into an ad by the other camp, and your own party rushes to cut you loose." }
            }
          },
          {
            id: "machine",
            text: "Broadcast no position: build precinct offices quietly instead",
            outcomes: {
              crit: { body: "While the loudspeakers blast each other, your precinct list doubles in a year. The post-mortem names 'the least visible, most useful person' — you." },
              ok: { body: "You keep your hands clean of the shouting match and build a real machine. Neither side finds fault." },
              meh: { body: "You stay as quiet as ever. No points gained, none lost." },
              fail: { body: "Even saying nothing costs: both sides mark you 'not one of ours'." },
              critfail: { body: "You sat this fight out and lose the next one — nobody cares about a man who never says anything." }
            }
          }
        ]
      },

      /* 2019-08 · 埃尔帕索与代顿枪击 */
      {
        id: "ln19_shooting",
        title: "Twenty-four hours, two cities: blood at the superstore and on the bar street",
        body: "Saturday: 23 dead at a border-city Walmart, an online 'invader' manifesto left behind, the shooter driving hundreds of miles just to pick that store. Sunday: gunfire on a bar street in Dayton, Ohio — 10 dead, the killer down within 30 seconds.\n" +
          "The nation lights candles for the same thing a third time. The vigil wax is not cold before two camps in your district line up: one says words carry blood, one says guns keep you alive. Town hall is tomorrow and the agenda has blown up.",
        brief: {
          lede: "The whole country is shouting 'enough' — and both sides are fighting over what the word means.",
          known: [
            "23 dead in El Paso, 10 in Dayton, less than a day apart.",
            "The manifesto's vocabulary rhymes with Washington's daily speech; both parties quote it.",
            "Gun owners and survivors' families both demand you at tomorrow's meeting — each side holding half the room."
          ],
          rumor: [
            "Some say the hosting platform saw the manifesto early and sat on it.",
            "Some say this state's gun shows go on as scheduled, August full of signups."
          ],
          unknown: [
            "Federal bills will lie shelved for years.",
            "Tomorrow's words of yours will be quoted verbatim under 'when speech becomes a bullet'."
          ],
          terms: [{ k: "Red-flag law", v: "A court process that temporarily removes a high-risk person's guns." }]
        },
        choices: [
          {
            id: "words",
            text: "Name the language: ask first which words fan the flames",
            note: "Words only, no bills — a bet that decent speech is the one thing fewer people will touch. Lose and both flanks box you in.",
            outcomes: {
              crit: { body: "At the vigil you skip the script and read only the names of the dead under 32. Networks cut to your feed; 'the one who can speak' is settled." },
              ok: { body: "You talk restraint and grief, touch no bills. Decency acquired; substance unmoved." },
              meh: { body: "Your eulogy drowns in the mutual screaming; neither camp claims you." },
              fail: { body: "Gun-owning voters hear 'words carry blood' as 'guns are innocent, you are not'. Your photo goes up on the gun-shop window." },
              critfail: { body: "Each side digs one of your old contradictions: NRA money taken, 'the right to bear arms is sacred' said. Tried in one broadsheet column — you are nobody's side." }
            }
          },
          {
            id: "redflag",
            text: "Push a state red-flag law and wider background checks",
            note: "Spend favors to put the issue on the table. Land it and it is a record; crash and both sides call you a dead-body opportunist.",
            outcomes: {
              crit: { body: "The bill clears committee with one member from each side on your stage. The survivors' families call you 'the one who actually pushed the door'." },
              ok: { body: "You nail the issue to the state agenda. The text fails; your name stays on the record." },
              meh: { body: "You spent the favor; the bill lands in 'next session, please'." },
              fail: { body: "The bill is pinned in committee, and the gun lobby's counter-ads loop inside your district." },
              critfail: { body: "Your fundraising mail uses the two cities' dead as ad copy; the families put you in the pillory on camera. 'Trading corpses for cash' dogged you for a full year." }
            }
          },
          {
            id: "relief",
            text: "No bills: hold vigils, set up the fund, walk the funerals with families",
            outcomes: {
              crit: { body: "The fund actually reaches forty households, and two mothers speak up for you. The man who touched no legislation ends up the least controversial." },
              ok: { body: "Vigils and donations run seamless. Everyone nods; nobody nominates you." },
              meh: { body: "You came to every funeral — but in seasons like that, everyone comes." },
              fail: { body: "A family asks on camera: the fund was yours? what did you say you'd change? You answer neither half." },
              critfail: { body: "Both camps read your 'just work' as 'afraid of nobody'. Next crisis, nobody calls you." }
            }
          }
        ]
      },

      /* 2020-03 · 新冠疫情美国应对 */
      {
        id: "ln20_covid",
        title: "The pandemic lands on America, and every government passes the buck",
        body: "March 11: the WHO declares a pandemic. The White House still says 'low risk' that night; two days later a federal emergency, and the index halts trading for the fourth time in two weeks. Tests are scarce, hospitals sew their own masks, and hardly any Easter parade has been called off.\n" +
          "Your district's hospital is counting ventilators one machine at a time. The state says 'every locality for itself'. You have a little over a week — before the wave reaches your door, decide who gets scared first: the economy or the living.",
        brief: {
          lede: "The decision window is measured in weeks: speak early and spook the till, speak late and miscount the dead.",
          known: [
            "Testing is far behind; nobody knows the real case count, officials included.",
            "Local beds and ventilators fall short of even the predicted peak.",
            "Federal says states handle it, states say locals handle it — nobody owns the bill."
          ],
          rumor: [
            "Some say the next state bought out a whole city's mask stock.",
            "Some say the daily numbers get 'coordinated' before release."
          ],
          unknown: [
            "Speak now: in a month you are either the prophet or a panic peddler.",
            "There is no right answer — only whoever pays."
          ],
          terms: [
            { k: "Circuit breaker", v: "Trading halts automatically once a drop crosses the threshold." },
            { k: "Federal emergency", v: "Unlocks federal disaster funds and allocation powers." }
          ]
        },
        choices: [
          {
            id: "act_first",
            text: "Move before your superiors do: close theaters, halt festivals, switch schools online",
            note: "A bet that the curve flattens before your doorstep. Right, you are the prophet. Wrong, the overreaching job-killer.",
            outcomes: {
              crit: { body: "Three weeks later your county's curve is flat while the next county counts beds. National interviews keep asking what happened in that small town that moved early; your name sits in the column labeled clear-headed." },
              ok: { body: "You shut doors early; the curve bends half a notch. Shops curse you, parents thank you — both tabs in your name." },
              meh: { body: "You got the jump; the outbreak took another road. Doors closed for nothing, favors spent for nothing." },
              fail: { body: "The wave arrives anyway, and 'closing did no good' becomes the shopkeepers' eulogy. Your order hangs in court on overreach." },
              critfail: { body: "Your order collides with a local funeral, on national news. You are cut as the bureaucrat who would not let a man bury his mother." }
            }
          },
          {
            id: "keep_open",
            text: "Keep the shops open: no blanket orders, only 'voluntary distancing' guidance",
            note: "Money buys your 'reasonable man' suit. Bet the virus is slower than you — and that voters only remember who took their jobs.",
            outcomes: {
              crit: { body: "The first wave brushes past you; your 'no blind closures' saved a whole street of storefronts. The chamber of commerce treats you as its benefactor; the feds praise your sense of economics." },
              ok: { body: "Most doors stayed open; so did a few cases. Both sides note a debt to you." },
              meh: { body: "You opened doors and issued guidance. In the end you saved nothing and mortally offended nobody." },
              fail: { body: "A cluster leaks out of the restaurant you frequent; someone tips the contact list to the paper." },
              critfail: { body: "Freezer photos from the temporary morgue run beside your 'voluntary distance' order on every screen. You are the sponsor on the national page." }
            }
          },
          {
            id: "federal_line",
            text: "Echo the federal line: they say low risk, you say manageable",
            note: "Your fortune rides the White House drumbeat. Fair wind, you are the rising star; ebb tide, you are 'the guy who repeated it'.",
            outcomes: {
              crit: { body: "Your numbers match the White House word for word; national staff mention your name in a brief for the first time. The donor circuit keeps a seat warm." },
              ok: { body: "You neither led nor fell behind. In that wind you thrived like an invisible man." },
              meh: { body: "Nobody listened to your rebroadcast — those weeks the country took the original feed." },
              fail: { body: "The federal line changed three times a week; your own reversals, looped on tape. The medical camp names you publicly for misleading the public." },
              critfail: { body: "A line you retweeted — it will be fine soon — hangs directly above a memorial wall. Someone frames every number you gave, one by one, in a funeral hall." }
            }
          },
          {
            id: "prepare",
            text: "Prepare in silence: count beds, bank masks, expand food relief",
            outcomes: {
              crit: { body: "When the tide actually came, only your desk was ready. The man who never made the front page is the first line on the hospital's thank-you." },
              ok: { body: "You quietly readied what needed readying. No cameras, no debts, clean books." },
              meh: { body: "Stocks half-bought; the tide walked around you. Like a man digging his cellar under a clear sky." },
              fail: { body: "The masks expired in the crate and the beds never got sequenced. 'He was busy — busy at the wrong thing' drifts through the hospital." },
              critfail: { body: "An unvalidated shipment of test supplies dies on your hands. Somebody says it, half laughing: he made an inventory business of the plague." }
            }
          },
          {
            id: "shop_notice",
            text: "Watch your own block: post notices in shop windows, carry groceries for the old, take no national position",
            note: "Betting you can hold one street. Risk: the virus reads no boundaries, yours or anybody's.",
            outcomes: {
              crit: { body: "You post the notices yourself and buy two weeks of groceries for three old households. Later, this street remembers only that you did this." },
              ok: { body: "The notices go up and seven names join the volunteer list. Small things, every one of them doable." },
              meh: { body: "You run around for two days. Most people were already managing on their own." },
              fail: { body: "Someone photographs you posting notices, captioned: the government is absent, and so is he, only with paper." },
              critfail: { body: "The block you told to stay home has its own cluster two weeks later. People ask whether you knew something when you put the paper up." }
            }
          },
          {
            id: "push_state",
            text: "Force the state to answer in public: one testing standard, one bed-allocation desk",
            note: "Betting an open letter outweighs a private request. Risk: once the state refuses, you become the one who would not cooperate.",
            outcomes: {
              crit: { body: "Under pressure the governor carves your county out for separate allocation, on camera. The local paper prints your letter in full." },
              ok: { body: "The state answers in bureaucratic prose, but the standard holds for two weeks. Enough for a hospital to schedule against." },
              meh: { body: "The letter goes out and nothing comes back. You mail the same letter again." },
              fail: { body: "The state publishes your county's compliance figures instead. The headline becomes 'start with yourself'." },
              critfail: { body: "The beds you demanded be reallocated turn out not to exist. You spoke for a phantom number, in front of every nurse in the state." }
            }
          },
          {
            id: "fed_power",
            text: "Use the authority you actually hold: requisition local output, reroute freight, apply for federal money in one go",
            note: "Betting procedure beats the market to the goods. Risk: the step over the line is one you explain alone, later.",
            outcomes: {
              crit: { body: "Two lines convert inside ten days and the ventilators land in your state first. The hospital association thanks the allocation publicly and says your name while doing it." },
              ok: { body: "You get the goods and lose the price argument. Two manufacturers resent you; a ward of beds came back." },
              meh: { body: "Your authorization is signed, then queued behind somebody else's freight." },
              fail: { body: "The requisition is enjoined, and the three weeks of pause happen to be the three weeks you needed." },
              critfail: { body: "The plant you seized had a higher bid from another state. You are written up as trading emergency powers for local favors, and the hearing turns around to examine you." }
            }
          }
        ]
      },

      /* 2020-05/06 · 弗洛伊德与那个夏天 */
      {
        id: "ln20_summer",
        title: "A knee, a nation on fire: the whole summer stands on one question",
        body: "Late May, Minneapolis: a Black man pinned under an officer's knee for nearly nine minutes and never up again. The tape reached the whole country in three days; all four officers fired that same day. Hundreds of cities took to the streets — most peaceful, a few blocks burning. The Guard rolls in; curfew after curfew.\n" +
          "Your own city's streets are just as taut: the young want you to kneel with them, shopkeepers want 'order by Friday'. Every choice this summer goes into next year's campaign file.",
        brief: {
          lede: "This summer asks two questions only: do you see the rage — and what is order, exactly.",
          known: [
            "The video is public nationwide; four officers dismissed; a federal civil-rights probe is open.",
            "Most protests are peaceful, but a few burning blocks own every night's front page.",
            "Council sign-ups are jammed; both camps want only one thing from you — on our side."
          ],
          rumor: [
            "Some say outside 'agitators' have joined the marches.",
            "Some say the police union is coordinating a slow-down."
          ],
          unknown: [
            "Either this fire burns into the agenda or it burns your campaign.",
            "Whichever end you stand on, the other end remembers."
          ],
          terms: [{ k: "Taking a knee", v: "The silent protest pose started by an NFL player." }]
        },
        choices: [
          {
            id: "march",
            text: "At the front of the march: kneel with them, push officer-accountability rules",
            note: "Your whole signage wagered on the movement not receding. Right, you are the new camp's face. Wrong, the man who knelt too fast.",
            outcomes: {
              crit: { body: "The photo of you at the march's front edge runs the country, and the local ordinance really clears committee. For once, the young count you as one of theirs." },
              ok: { body: "You crossed the street; the ordinance is nowhere yet, but your name is on the list. Old backers think you moved too fast." },
              meh: { body: "You knelt; the cameras passed you by. The movement needs no more kneeling bodies." },
              fail: { body: "A few runaway marches cut your footage into 'incited a riot'. Suburban homeowners start donating to your rival." },
              critfail: { body: "Your own block caught fire the same week you poured words on the flame. By nightfall both camps have put your name on their hate lists." }
            }
          },
          {
            id: "order",
            text: "Stand with the police: back the force, clear the streets, keep the curfew",
            note: "A bet that the silent majority is sick of smoke. Right, you are the law-and-order adult. Wrong, your name is chalked on every wall of the summer.",
            outcomes: {
              crit: { body: "The curfew night came and the streets really went quiet; shopkeepers signed a printed thanks. The officers' association found 'the one who says we are victims too'." },
              ok: { body: "You held the merchants and the old regulars. The young stop walking through your door." },
              meh: { body: "You called for order; the streets cooled on their own. The credit skips you; the blame arrives first." },
              fail: { body: "Someone gets hurt in the clearance, and that footage outruns your 'restore order' ten to one." },
              critfail: { body: "Riot-support you coordinated plays beside a baton close-up, all night long. For the first time, your district office gets surrounded by people demanding answers." }
            }
          },
          {
            id: "bargain",
            text: "Sit at the table: trade a package of community investment for quiet streets",
            note: "You bid to both sides and shake both hands. Land it, 'the fixer'. Drop it, a speculator in both pairs of eyes.",
            outcomes: {
              crit: { body: "Real money bought a signed peace commission: accountability clauses, community spend, a policing pilot — each side took something home and each can explain it. They call you the only person who closed a deal all summer." },
              ok: { body: "The package half-sailed; the streets cooled. Both camps say 'not enough' — and both at least thanked you." },
              meh: { body: "Talks dragged all of June, a little spent, the agreement unsigned down to the first word." },
              fail: { body: "Both sides feel sold: the young call it 'cash for silence', the merchants 'public money to feed the protest'." },
              critfail: { body: "The budget lines get read out, one by one, live. The headline carries you past your own district: movement money flowed to his own projects." }
            }
          },
          {
            id: "listen",
            text: "Pick no side: hold hearings, let both camps finish speaking",
            outcomes: {
              crit: { body: "The three-hour hearing without one interruption got the local paper's praise as 'the only normal venue this month'. Neither camp finds a fault in you." },
              ok: { body: "You let people finish. Nobody gained, nobody got burned. Steady." },
              meh: { body: "Half the room left before the hearing closed. Your neutrality satisfies nothing and vents nothing." },
              fail: { body: "Both camps say you only build stages, never stand. 'Middle' turns out to be the one seat nobody fits into." },
              critfail: { body: "After the session both factions shove each other on your steps. The photo caption: a fight on the stage he built." }
            }
          }
        ]
      },

      /* 2020-11 · 大选与计票争议 */
      {
        id: "ln20_election",
        title: "The votes are still in the box when victory is claimed",
        body: "Turnout in a plague year hits its highest in more than a century, and tens of millions of mailed ballots will take days to count. Polls leaned almost one way, yet election-night 'leads' flip with each tranche opened; before most outlets call it, the incumbent declares himself the winner and cries fraud. Dozens of suits queue in the courts; election clerks get threats.\n" +
          "Both parties are ringing you at once. This year the question is no longer only who wins — it is whether the loser admits it.",
        brief: {
          lede: "The count is unfinished when the words are already out. Everything you say these days becomes evidence later.",
          known: [
            "Mail ballots counted late are state law as written — routine, not anomaly.",
            "Several key states lead by under a point; recounts are live options.",
            "Both sides are mobilizing; an election official who misspeaks gets doxxed at his door."
          ],
          rumor: [
            "Some say a county's counting server 'happened' to crash that night.",
            "Some say the lawsuit team had its numbers written days earlier."
          ],
          unknown: [
            "These suits will be cleared out of state courts one by one.",
            "Whichever line you take tonight, in January you take the knives for them."
          ],
          terms: [
            { k: "Swing state", v: "Unpredictable outcome; winner takes all its electoral votes." },
            { k: "Recount", v: "Re-tallying ballots as state law provides." }
          ]
        },
        choices: [
          {
            id: "rules_first",
            text: "Rules first: wait for the count, and the result is legitimate",
            note: "A bet that the system is still worth something. Right, you are the anchor. Wrong, one side owns you as accomplice.",
            outcomes: {
              crit: { body: "In the counting storm your 'wait for the count' loops everywhere; both parties' moderates praise a man in the same column for once. Your name enters the stabilizers' list." },
              ok: { body: "You repeat procedure and legitimacy. The persuaded steady; the furious note one more line." },
              meh: { body: "Your reason is sand thrown at the sea; nobody hears it." },
              fail: { body: "One side never concedes, and your 'wait for the count' is cut as stalling for the opponent. The base turns on you." },
              critfail: { body: "On results day your district erupts into a standoff, both flanks pointing at you: you should have been harder. You protected nobody." }
            }
          },
          {
            id: "contest",
            text: "Bet on overturn: demand recounts and audits, march with the fraud chant",
            note: "The wager: as long as we do not stop, we did not lose. One vote ahead, you take it all; behind, the defendant's bench in the next storm.",
            outcomes: {
              crit: { body: "One recount really flips a few hundred votes. From the podium you shout 'we watched the machine fix itself'. The anti-establishment montage makes you its local hero." },
              ok: { body: "You redline the volume; not one suit wins. Your people remember only that you 'fought'." },
              meh: { body: "You chanted stop-the-count. Court and counting center alike ignored you." },
              fail: { body: "Suit after suit dismissed — a few with your signature in the filing block." },
              critfail: { body: "Every state certifies; the last appeal dies in the courts. Your hand-picked 'ballot watchers' list runs full-page in the paper, and summonses are in the mail." }
            }
          },
          {
            id: "count_only",
            text: "Guard your own box: finish the count, say not one word more",
            outcomes: {
              crit: { body: "Three nights running you sat your own crates through to the last digit, exact to the unit. Afterward someone pulls the record: that night, he added no fuel." },
              ok: { body: "The count is done; you never crossed a line with your mouth. Quiet was this month's medal." },
              meh: { body: "You kept your head down and counted, as if nothing happened." },
              fail: { body: "Both sides read 'present but silent' as cover for the other. Silence is a sentence too." },
              critfail: { body: "In the later reckoning a line surfaces, late but damning: he was there, and said nothing." }
            }
          }
        ]
      },

      /* 2021-01 · 国会山冲击 */
      {
        id: "ln21_capitol",
        title: "A mob on the Capitol steps; the count stops mid-sentence",
        body: "January 6: both chambers assemble to count the electoral votes, the sitting vice president presiding. By afternoon the president's rally becomes a breach — fencing climbed, the Rotunda entered, the session cut off, both chambers evacuated. Four people die that day; an officer dies of wounds the next. Late that night both chambers reconvene and finish the count before dawn.\n" +
          "Live cameras thread the Capitol corridors and your living room at the same time. Your phone lines melt: half the callers say this is patriotism, half say insurrection — both demand one word from you.",
        brief: {
          lede: "Cameras logged every word you chose; those words get read back in the trials to come.",
          known: [
            "The electoral count was interrupted, not stopped; both houses sat again that night.",
            "Reinforcements staged less than a kilometer from the Capitol waited two hours for approval.",
            "The president's 'we love you' that day was shared by both camps, each reading it its own way."
          ],
          rumor: [
            "Some say 'the other side's people' were inside the crowd.",
            "Some say a list of friendly lawmakers already circulates privately."
          ],
          unknown: [
            "Investigations of the breach will run for years.",
            "Whoever you name tonight, at the next convention it is your turn to be named."
          ],
          terms: [{ k: "Electoral count", v: "The joint-session tally is a ceremonial duty." }]
        },
        choices: [
          {
            id: "name_it",
            text: "Say the word: insurrection — and accountability up to the president",
            note: "Loudest and hottest: bet the establishment turns back faster than your district's anger. Wrong, the base nails you in the traitor column.",
            outcomes: {
              crit: { body: "On the reconvene night, the press list shows you first among local officeholders to say 'insurrection' whole. Calls come in at once from both parties' moderates and from the business world." },
              ok: { body: "You used 'violence', 'incitement'. The editorial pages are satisfied; the phone stops ringing on your own block." },
              meh: { body: "You spoke hard enough — that night too many did. Nobody clocks it as yours." },
              fail: { body: "The base pins you as 'the one demanding charges for invaders'. Your office door is a week of shouting." },
              critfail: { body: "You led the letter to remove him; two weeks later the wind flips, and the signatures are read out line by line as deeds of sale." }
            }
          },
          {
            id: "both_sides",
            text: "Blur it cool: condemn the violence, but hear the 'patriots'' grievance too",
            note: "One glass of water to each side. Carry them carefully — spill, and both shirts are wet.",
            outcomes: {
              crit: { body: "Somehow your 'condemn the breach, condemn heavy-handed clearance too' lands on both sides: the base hears backing, the press cannot be bothered with you." },
              ok: { body: "Fifty-fifty, and neither side bothers aiming at you. Slipped through." },
              meh: { body: "You walked the beam in silence; both camps wish you would say something." },
              fail: { body: "'Wrong on both sides' becomes a fifteen-second meme — one camp uses it to laugh, one to curse." },
              critfail: { body: "A signup sheet from the bus you sent 'to observe' leaks out; your name heads it. The investigators' call comes through while you are on camera." }
            }
          },
          {
            id: "calm",
            text: "One sentence only: restore the session; oppose all violence",
            outcomes: {
              crit: { body: "While the country argues labels, you pressed both houses to simply resume. In the after-action, the least exciting sentence in town reads as the proof of a normal man." },
              ok: { body: "You said the unarguable line. Nobody can quote you; nobody can attack you." },
              meh: { body: "Your statement joins the night's hundreds; you cannot be bothered to mention it again either." },
              fail: { body: "'Only procedure' reads as 'afraid to speak plain', and both camps' disappointment arrives the same day." },
              critfail: { body: "A week later your silence is refiled as consent, shouted at from across your own doorway." }
            }
          }
        ]
      },

      /* 2021-03 · 亚特兰大按摩店枪击 */
      {
        id: "ln21_atlanta",
        title: "Three spas, one night: eight dead",
        body: "Night of March 16, outside Atlanta: gunfire through three spas — 8 dead, 6 of them Asian women. The shooter was taken the next day, telling officers 'I have a sex addiction, I was eliminating temptation'. The local sheriff ruled it early: 'a mental-health issue, not a hate crime'. Federal investigators move in on the hate-crime track.\n" +
          "Asian shopkeepers, stigmatized for a full pandemic year, hand the petition to your desk directly. The same week, a donor's memo warns you: do not 'politicize' this.",
        brief: {
          lede: "The fight over the label decides one community's safety — and which side you owe.",
          known: [
            "Police confirm six of the dead were Asian women, most of them immigrants.",
            "The sheriff holds the non-hate line; the federal civil-rights arm is in.",
            "Local Asian storefronts lost three in ten to the pandemic year alone."
          ],
          rumor: [
            "Some say the shooter circled all three blocks for a long time beforehand.",
            "Some say the sheriff's office and spa owners had a standing 'courtesy fee'."
          ],
          unknown: [
            "Hate-crime counting rules will be wrangled for years.",
            "Whichever vigil you keep, that side remembers you long."
          ],
          terms: [{ k: "Hate crime", v: "Bias-motivated violence; separately sentenced and separately tallied." }]
        },
        choices: [
          {
            id: "hate_crime",
            text: "Call it what it is: push local bias-crime data and legislation",
            note: "A bet that this anger settles into votes. You cross the old police rule: never label.",
            outcomes: {
              crit: { body: "Community groups translate your words into three languages and paper the storefronts; the state bias-statute bill carries your name on the docket. For once a community feels treated as human." },
              ok: { body: "You said the word and filed the text. The community thanks you; law enforcement keeps a tab." },
              meh: { body: "You used the word but pushed nothing. Words cheapen fast." },
              fail: { body: "The sheriff rebuts publicly — 'stop the labels' — and union ads rain into your district." },
              critfail: { body: "Your hate-motived draft gets edited into a spear aimed at 'tearing the community apart'. Both camps carve with it at once." }
            }
          },
          {
            id: "mental_health",
            text: "Ride the 'mental health' frame: push crisis response and police diversion",
            note: "Skip the identity war; fix the system that failed to stop the gun. Both sides call it dodging the point.",
            outcomes: {
              crit: { body: "The crisis-response pilot lands in your county. Police and the state file you under 'helpful, never noisy'. In the community, though, your name fades." },
              ok: { body: "You lifted the issue out of the label war into a technical fix. Safe — and unsatisfying." },
              meh: { body: "Your plan parks in 'study phase'. Nobody gets a result." },
              fail: { body: "Community reps hold eight photos at your door: 'first say whether they were Asian.' You are filmed inside your own dodge." },
              critfail: { body: "Your endorsement of the sheriff's 'not hate' finding airs verbatim, and a full year of pent-up rage over anti-Asian attacks pours onto you alone." }
            }
          },
          {
            id: "vigil",
            text: "Refuse the framing: sit every vigil, then organize the merchant watch",
            outcomes: {
              crit: { body: "You lit candles in all three languages, and your handwriting tops the watch schedule. The label fight rages on; the shops reopen first." },
              ok: { body: "You came to each one, spoke little. The community knows your face, not your lines." },
              meh: { body: "You came, stood a while. Nights like that draw too many." },
              fail: { body: "On camera a family asks: so what will you actually say? You did not answer, and the clip loops the next day too." },
              critfail: { body: "Both camps read a different meaning into your 'presence'. Both are let down." }
            }
          }
        ]
      },

      /* 2021-08 · 阿富汗撤军与喀布尔陷落 */
      {
        id: "ln21_afghan",
        title: "Twenty years of war end in a day: Kabul falls",
        body: "The pullout deadline was nailed to August 31. The allied government collapsed inside ten days; the president fled with the money. On August 15 Kabul changed hands with almost no street fighting. Thousands chased the gate at the airport; on the 26th a suicide blast outside it killed 13 Americans and more than a hundred Afghans; on the 30th the last transport lifted.\n" +
          "In your state sit refugee families who translated for the U.S. military — their visas stuck on the far side of a checkpoint. The veterans split when they come to you: one camp wants you to get the people out; the other wants Washington made to answer for it.",
        brief: {
          lede: "Evacuation is counted in hours; whether the translator family you vouched for makes the flight is counted in favors.",
          known: [
            "The military runs the airport; the embassy has paused local-employee escorts.",
            "A dozen-plus translator family members are on your district's list, papers stuck at screening.",
            "Your state has its dead; the veterans' association splits into two camps."
          ],
          rumor: [
            "Some say the intelligence community wrote 'the government will fall' a week early.",
            "Some say the number of waiting local staff was reported many times short."
          ],
          unknown: [
            "These images will be quoted in every future pullout debate.",
            "Who you saved and who you missed — their children will tell it."
          ],
          terms: [{ k: "Local hires", v: "Afghans who worked for U.S. forces and the embassy; settlement awaits them." }]
        },
        choices: [
          {
            id: "rescue",
            text: "Spent contacts to shove names through: get them on an outbound flight",
            note: "A bet that paper cannot outrun favor. Right, you saved lives. Wrong, you are the man who 'hand-approved visas'.",
            outcomes: {
              crit: { body: "The list cleared a moment before the gate sealed shut. A year later that family opens a restaurant on your street, two flags hung at the door on opening day." },
              ok: { body: "You squeezed most of them through and lost two or three names. When the family came in, they brought gifts for your house first." },
              meh: { body: "The list went up and heard nothing back; the gate closed. All you carry off is sweat." },
              fail: { body: "The page where you skipped the queue surfaces: by what right did he approve whose life? For the first time, security agencies hold you at a distance." },
              critfail: { body: "A foiled-attack suspect traces back to a name you once pushed. The hearing has not met; the headline is set." }
            }
          },
          {
            id: "account",
            text: "Open accountability: who fixed the deadline, who called the intelligence — answers",
            note: "Fire on the military and the spies, betting everyone is watching this botched ending. Careful — thirteen names are also watching you.",
            outcomes: {
              crit: { body: "Three questions, unblinking: who set the date, who said not this fast, who was left outside the gate. National follow-ups quote your lines; the brass gnaw teeth; the court of opinion erects you an arch." },
              ok: { body: "You nailed the questions to the table; hearings queue up. The military returns one ceremonial page. Nobody is quenched." },
              meh: { body: "Your accountability gets buried by a bigger front page; even your own voters never got the sequel." },
              fail: { body: "The grieving mothers thank Washington first — then ask who is campaigning on their dead." },
              critfail: { body: "The 'internal assessment' you quoted is disproved. The indictment turns into your own joke; the military spokesman reads your name and exhales." }
            }
          },
          {
            id: "home_first",
            text: "Own your people first: see through the thirteen arrivals home and the refugees settled",
            note: "No talk of national fate; only funerals and settling newcomers done. Real money, real work; the front page is not yours.",
            outcomes: {
              crit: { body: "You stood watch over every detail of the flag-draped arrival, and scraped the refugee families' resettlement money out of the county ledger. Both sets of acknowledgements thank the same name." },
              ok: { body: "You sat the vigils due and ran the errands due. No national page; every local tab squared." },
              meh: { body: "Money spent, ceremonies held; both sides found it obvious." },
              fail: { body: "The resettlement fund snags in an audit; a family asks on the phone where the money actually went. You have no answer." },
              critfail: { body: "A 'refugee transport stipend' shows blemish on the books. 'Performing with the dead's money' — the phrase lands on you for the first time." }
            }
          },
          {
            id: "quiet_help",
            text: "Predict nothing, judge nothing: expand what the local shelter can receive",
            outcomes: {
              crit: { body: "When the first resettled families landed, only your line had beds and interpreters ready. Nobody interviews you; every family gets your address book." },
              ok: { body: "You quietly readied what needed readying — no coverage, no offense." },
              meh: { body: "Beds set; few came. Your foresight has nowhere to cash in." },
              fail: { body: "'The war collapsed and he is still fussing over beds' — the joke makes a round behind your back." },
              critfail: { body: "An emergency line item snags the auditors. Somebody says it over dinner first: he spent refugee money." }
            }
          }
        ]
      },

      /* 2021-10 · 供应链与通胀 */
      {
        id: "ln21_inflation",
        title: "The shelves thin out; prices move every morning",
        body: "Container ships anchor for two weeks offshore; Los Angeles and Long Beach run around the clock for the first time ever, and cargo still crawls. September CPI ran 5.4 percent on the year, the highest in thirteen; truckers and warehouse hands are the scarcest hires in town. Christmas toys, Thanksgiving birds — the news calls it 'supply chains'; the shop ledger calls it 'out of stock'.\n" +
          "District bosses press you for a line. The opposition has already honed one phrase: your people did this.",
        brief: {
          lede: "Every month prices keep climbing, your 'temporary' reads more like a joke — or more like foresight.",
          known: [
            "Port congestion, labor gaps, pent-up demand snapping back — all three at once.",
            "The Fed still says transitory; the Treasury repeats it verbatim.",
            "The county's biggest warehouse is cutting hours; small retail stocks out first."
          ],
          rumor: [
            "Some say the shipping giants idle ships on purpose to lift freight rates.",
            "Some say one giant bought out half the Christmas stock already."
          ],
          unknown: [
            "Which loop of the wage-price spiral you are standing in.",
            "Whoever names this thing right first owns the 2022 story."
          ],
          terms: [{ k: "CPI", v: "The consumer price index; the headline inflation gauge." }]
        },
        choices: [
          {
            id: "accuse",
            text: "Go on TV and point: lead off a price hearing, send the blame back to Washington",
            note: "Easiest votes are counted on the shopper's receipt. Risk: every month the receipt grows, your certainty thins with it.",
            outcomes: {
              crit: { body: "Your hearing seats empty-shelf shopkeepers and queueing drivers; nationally you are tagged 'the local who did the arithmetic first'. The opposition's slogan — you already say it better than they do." },
              ok: { body: "You ran some satisfying hearings. Receipts unchanged; tempers eased." },
              meh: { body: "Your naming got drowned by louder namers. Inflation takes no notes from a microphone." },
              fail: { body: "The county's biggest employer bites back by name: did he ask us before prices rose? Your two stories do not match." },
              critfail: { body: "The warehouse chain you blasted for hoarding turns out to hold your old shares. Hearing becomes trial; the headline spends only eight words." }
            }
          },
          {
            id: "fix_local",
            text: "Spend on your own block: lease warehousing, train drivers, open a municipal freight lane",
            note: "Money into your street's shelves. Slow, visible books; done well it is your 'gets things done' sign.",
            outcomes: {
              crit: { body: "Before Christmas your street's shelves are full, and the driver-training graduation photo leads the evening paper. Everyone else shouts; this block restocks — that is the tag now." },
              ok: { body: "You closed part of the gap and graduated dozens of drivers. Money spent where the eye can find it." },
              meh: { body: "Funds in, shelves same. Your plan proved one thing: the bottleneck was never local." },
              fail: { body: "The municipal freight lane becomes the town's proudest half-built site; both ends curse your concrete." },
              critfail: { body: "The contractor who won the warehouse lease lists an old friend on its books. Complaints of 'crisis profit' copy every office in the state." }
            }
          },
          {
            id: "household",
            text: "Predict nothing, blame no one: open the emergency pantry, publish your own budget",
            outcomes: {
              crit: { body: "You post your household grocery bill each month beside the pantry rota. The best review — neither faking knowing nor faking poor — comes from the shop wives of your district." },
              ok: { body: "Pantry open, books public: no praise, no blame. In an off season that counts as a win." },
              meh: { body: "The pantry half-fills; the faces are all familiar." },
              fail: { body: "Someone calls it a taxpayer-funded vanity storefront; you opened your mouth and then did not argue." },
              critfail: { body: "One 'grocery' line in your open books gets cross-examined in blowup size. Two hats — faking poor, faking expert — land together." }
            }
          }
        ]
      }
    ],

    /* 世界线 · 2019—2021 英文覆盖（outlets 均为当年真实存在的美国媒体） */
    worldline: {
      brief: {
        "2019": "The impeachment file came back and the gunshots never stopped. A booming surface cannot cover the political seams; every institution looks like it is waiting for something to happen.",
        "2020": "Virus, lockdown, the summer in the streets and an election whose result was challenged drove the country into its most torn year in decades. The news cycle set the pace of breathing.",
        "2021": "The Capitol and Kabul marked this year's turbulent opening and close. The plague has not ended, prices have started to bite, and everyone is waiting for the other boot to drop."
      },
      outlets: {
        "2019": ["The New York Times", "The Washington Post", "The Wall Street Journal", "CNN", "Fox News"],
        "2020": ["CNN", "Fox News", "The New York Times", "USA Today", "The Atlantic"],
        "2021": ["The Washington Post", "CNN", "Fox News", "The New York Times", "USA Today", "PBS NewsHour"]
      }
    }
  }
});
