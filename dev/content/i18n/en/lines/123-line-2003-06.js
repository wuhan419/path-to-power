/* ============================================================================
 * CONTENT · i18n/en/lines/123-line-2003-06.js
 * 英文覆盖层：content/events/123-line-2003-06.js 的 8 张 2003—2006 时间轴卡。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的字段。
 *   · 事件按 id 定位；choices 按 id 对齐，terms 按下标对齐。
 *   · known / rumor / unknown 是纯字符串数组，整体替换 —— 必须整条给全。
 *   · 结构性键（id / era / minYear / tierMin / weight / base / mods / effects /
 *     flags / req / cost …）由引擎保护，写了 validate 直接报错，故一律不写。
 *
 * 英文写法：重写而非直译。第二人称、现在时、短句；机构用真实英文名
 * （CNN、Wall Street Journal、USA Today、FEMA）；引号用英文引号。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ---------------------------------------------------------------- 2003 */
      {
        id: "ln03_war",
        title: "The president lands on the carrier and declares the mission accomplished",
        body: "Baghdad fell in three weeks. The statue coming down played on loop for a whole week. On May 1 the president " +
          "landed on the carrier deck in flight gear, a MISSION ACCOMPLISHED banner strung behind him. Approval spiked; " +
          "\"the coalition of the willing\" was the respectable phrase of the season.\n" +
          "The party machine wants you at the victory rallies. Local TV is hunting for a winner's face. As for the " +
          "looting and the waterless occupation — those stories cannot yet make the evening news.",
        brief: {
          lede: "Everyone is celebrating; nobody wants to be first to ask \"what next.\" Asking now hurts you and the room.",
          known: [
            "The party wants you on the victory stage, because you helped sell the war early.",
            "Baghdad is occupied with no interim authority in place, and the looting is on TV.",
            "Approval is at its peak. Playing it low tonight is self-harm.",
            "Donors are whispering: the occupation is turning into a budget problem."
          ],
          rumor: [
            "Some say the Pentagon never finished a plan for after the war.",
            "Some say this wind of victory will blow straight into next year's election."
          ],
          unknown: [
            "The insurgency and the bill are waiting down the road, unmentioned.",
            "Whatever posture you strike tonight will follow you for years."
          ],
          terms: [
            { k: "Mission Accomplished", v: "The 2003 declaration that major combat in Iraq had ended." },
            { k: "Coalition of the willing", v: "The multi-country bloc behind the invasion, UN authorization aside." }
          ]
        },
        choices: [
          {
            id: "ride_victory",
            text: "Take the victory stage: write yourself into the winners",
            note: "The bet: victory becomes your ladder. The risk: when the tide turns, the man on stage is the most visible.",
            outcomes: {
              crit: { body: "A line you dropped at the rally gets quoted across the networks. \"He backed this war early\" now reads as foresight, and the military wing and the establishment treat you as one of their own for the first time." },
              ok: { body: "You caught the tailwind, got your face in frame, and nobody found a single fault." },
              meh: { body: "You went, you said the seasonal words. The applause was too loud for anyone to hear you." },
              fail: { body: "The occupation's bills start printing, and your \"victory\" gets replayed beside burning oil wells." },
              critfail: { body: "\"Mission accomplished\" becomes the punchline — and you are standing in the middle of it. \"He pushed for this war\" follows you from now on." }
            }
          },
          {
            id: "ask_after",
            text: "Ask out loud: who runs this city, and who pays",
            note: "The bet: you wake up a year before the country. The risk: nobody likes a wet blanket at a party.",
            outcomes: {
              crit: { body: "Two years on, with reconstruction spinning out of control and the bill exploding, your \"and then what?\" is cut into every retrospective. It is the label of the man who saw it early." },
              ok: { body: "You asked it decently. You took the heat then and banked a reputation for having a head on your shoulders later." },
              meh: { body: "Your question drowned in the cheering. Nobody answered. Nobody remembered." },
              fail: { body: "You sang off-key at the national party. The opposition cuts it into: he wanted this war to lose." },
              critfail: { body: "You kept picking fights with the White House over a postwar plan. The machine settled up: local resources now route around you overnight." }
            }
          },
          {
            id: "toast_troops",
            text: "Thank the troops only; not one word on what comes after",
            note: "The bet: you never touch the words \"and then.\" The risk: both sides dislike a man who says little.",
            outcomes: {
              crit: { body: "Your line — \"first, thanks to the people here tonight\" — circulates through military families. Not grabbing the glory, not kicking the table, reads as reliable." },
              ok: { body: "You said the grateful thing. Nobody found fault; nobody singled you out either." },
              meh: { body: "You gave your thanks. The airtime went to bigger names." },
              fail: { body: "Both camps came asking you to pick a side. You declined both, and both stopped saving you a seat." },
              critfail: { body: "Your even-handed silence got read two ways: guilty to one side, slippery to the other." }
            }
          }
        ]
      },

      {
        id: "ln03_blackout",
        title: "Nine seconds of cascade: the grid fails and 50 million go dark",
        body: "On the afternoon of August 14, from Ontario to New York, the grid tripped its way down in nine seconds. " +
          "Fifty million people lost power: signals dead, elevators stopped between floors, trains stalled in tunnels, airports shut. " +
          "After nightfall people spilled into the streets — some seeing stars for the first time in a city that never had dark.\n" +
          "A federal inquiry will take months to name a culprit. Voters tonight need one phone number that answers. That call is coming to you.",
        brief: {
          lede: "Thirty-eight hours without power is long enough to prove you run things — or to show nobody does.",
          known: [
            "The failure began in a cross-state monitoring system; nobody owns the fault.",
            "Hotline demand at your shelters and water points has already crashed the lines.",
            "Federal and state officials are trading blame; the press is hunting a scapegoat."
          ],
          rumor: [
            "Some say it was a new kind of cyberattack and the feds are sitting on it.",
            "Some say power back in a day, and no one held to account."
          ],
          unknown: [
            "This blackout will force an entire energy bill through Congress.",
            "The one who overstepped tonight — is he credited or censured later?"
          ],
          terms: [
            { k: "Cascade failure", v: "One trip dragging neighboring regions dark, one after another." }
          ]
        },
        choices: [
          {
            id: "command",
            text: "Set up your own command post: shelters, generators, police and fire on one net",
            note: "The bet: you can deliver with nobody's authorization. The risk: every stumble gets replayed.",
            outcomes: {
              crit: { body: "The ad-hoc dispatch net you built held for thirty-eight hours. The paper prints you as \"the person on the phone in the dark,\" and the follow-up hearing invites you as the positive example." },
              ok: { body: "Supplies and people found their slots. It was messy, but your district held." },
              meh: { body: "You ran around all night, and the power came back before you finished — a fire save with no audience." },
              fail: { body: "One double-booked dispatch left two shelters without water. You went from the person in charge to the problem." },
              critfail: { body: "In the dark, an elderly resident never got an ambulance. The inquiry report writes your three phone calls into the timeline." }
            }
          },
          {
            id: "demand_probe",
            text: "Seize the mic: demand a federal audit of grid regulation",
            note: "The bet: the anger is yours to ride. The risk: the feds and the utility both remember your name.",
            outcomes: {
              crit: { body: "Your monologue outside the hearing — \"nine seconds and no one responsible\" — airs on every network. The first page of the energy bill cites you." },
              ok: { body: "You nailed accountability onto the agenda, even if the verdict is far off." },
              meh: { body: "Your criticism was too technical. Nobody heard, nobody picked it up." },
              fail: { body: "The utility is one of your biggest funders, and you just demanded they investigate its regulator. Pulling-support rumors begin." },
              critfail: { body: "Your inquest got branded \"smearing American infrastructure in a crisis.\" The federal door closes on you from today." }
            }
          },
          {
            id: "block_watch",
            text: "Take no position: walk your own street with a flashlight, checking on elders who live alone",
            note: "No bet. The risk: doers stay anonymous; the loud ones harvest the credit.",
            outcomes: {
              crit: { body: "You walked the whole block and reconnected a dozen elders with their families. On this street's ledger, your name sits in the column \"the one who came when it mattered.\"" },
              ok: { body: "You did the neighbor work. Safe, solid, off every front page." },
              meh: { body: "You helped who you could. The lights came back; life went on." },
              fail: { body: "Someone called your street-watch \"small-minded\" — not the behavior of a man destined higher." },
              critfail: { body: "You wanted quiet service; an unattended accident struck your very block. \"He was here and never saw it\" gets around." }
            }
          }
        ]
      },

      {
        id: "ln03_recall",
        title: "California recalls its governor — and picks an action star",
        body: "On October 7, California ran only its second gubernatorial recall ever. One hundred thirty-five names on one ballot, " +
          "and the winner had never held any office — he had only said on television, \"take the government off our backs.\"\n" +
          "The evening editorial asked: farce, or omen? The party's line is \"a one-off.\" But you lay awake half the night: " +
          "if this is a signal, who exactly is it being sent to?",
        brief: {
          lede: "Someone else's circus just pitched its tent at your profession's door. Laugh, or take notes?",
          known: [
            "The recall passed because the budget hole and the power crisis backed people into a corner.",
            "The new governor has zero governing record but a built-in fanbase.",
            "The party has ruled this \"a fluke.\" Openly disagreeing is off-limits."
          ],
          rumor: [
            "Some say radio shock jocks and reality TV built this win.",
            "Some say if a face like his can win a state, so can one like yours."
          ],
          unknown: [
            "Whether celebrity politics is about to invade your lane.",
            "Whether you bank the lesson now, or watch it become common sense in five years."
          ],
          terms: [
            { k: "Recall election", v: "A procedure letting voters remove an elected official before the term ends." }
          ]
        },
        choices: [
          {
            id: "study_style",
            text: "Study the camera playbook seriously and rebuild your own delivery",
            note: "The bet: the audience changed taste. The risk: the party calls it copying the enemy's bad habits.",
            outcomes: {
              crit: { body: "You made the short sentences and the self-mockery genuinely yours. The local station starts calling you \"a television presence\" — this season's highest compliment." },
              ok: { body: "You got the new register working. A few people now remember you for being camera-ready." },
              meh: { body: "You learned it half by half. Old guard found you flip; new guard found you stiff." },
              fail: { body: "Imitation detected. Late-night clips made you the punchline: a knock-off retired before opening." },
              critfail: { body: "For one whole summer the county cartoonists drew you aping the star. \"No talent, only hair\" made the opposition's flyer." }
            }
          },
          {
            id: "mock_farce",
            text: "Call it farce: make the actor-governor your podium joke",
            note: "The bet: the establishment still scorns celebrity politics. The risk: voters hear you mocking their fun.",
            outcomes: {
              crit: { body: "Your bit ran two weeks on local radio. Old guard and party alike crowned you \"the one saying plain sense.\"" },
              ok: { body: "You skewered it well. The party nodded; a few young faces in the room did not laugh." },
              meh: { body: "Your joke stung no one, landed with no one." },
              fail: { body: "Entertainment voters never felt they'd mis-picked a show that entertained them. You mocked; they remembered." },
              critfail: { body: "Branded a man who \"looks down on the audience's taste.\" Your mock-governor tape became their ad, on loop." }
            }
          },
          {
            id: "keep_distance",
            text: "Judge nothing: \"California's business is for Californians\"",
            note: "The bet: this gust dies in three months. The risk: if it doesn't, you have no standing sentence.",
            outcomes: {
              crit: { body: "A year later, California's mess plays out as serial drama. Your one line of \"no comment\" is cited as \"a careful precedent.\"" },
              ok: { body: "You said nothing wrong. In a season when everyone rushed to comment, that counts as a result." },
              meh: { body: "You dodged this round of hot air — and the memory of you too." },
              fail: { body: "Both camps concluded you \"wouldn't open your mouth even for this.\" A timid tag starts sticking." },
              critfail: { body: "You aimed at no side, but a profile piece found one sentence: \"he feels nothing about anything.\"" }
            }
          }
        ]
      },

      {
        id: "ln03_saddam",
        title: "Saddam is dragged out of a hole, and the capture sweeps the nation",
        body: "Late on December 13, the occupation authority confirmed it: captured near his hometown, in a dirt hole, " +
          "unshaven, without a fight. The bunker video circled the globe by morning. Pro-war capitals popped champagne; " +
          "the opposition had no words at all.\n" +
          "It is the biggest candy of this war so far. Local stations tonight are collecting \"local voices react\" — " +
          "you fit the slot, and the window is exactly this evening.",
        brief: {
          lede: "A whole country is looking for someone to applaud the win. Reach out tonight and you catch applause — catch it wrong and you catch the cringe.",
          known: [
            "The capture was US military work; the credit spills downhill to everyone who comments.",
            "Media need a \"local reaction\" tonight; footage for anyone who will grab it.",
            "A slice of voters is still asking: no weapons found, so what was this war for?"
          ],
          rumor: [
            "Some say he'll stand open trial, broadcast worldwide.",
            "Some say catching him was easy; the insurgency starts now."
          ],
          unknown: [
            "Whether this victory card is a step up or an IOU.",
            "How tonight's smile gets re-cut later."
          ],
          terms: [
            { k: "Coalition Provisional Authority", v: "The US-British military administration set up after the invasion." }
          ]
        },
        choices: [
          {
            id: "claim_credit",
            text: "Claim it loudly: \"This is the strategy's victory — we won\"",
            note: "The bet: the victory story runs a few more years. The risk: when it collapses you are standing closest.",
            outcomes: {
              crit: { body: "Your celebration quote runs on the national networks. The \"stood firm for this war\" list puts you near the top — the most valuable queue in town tonight." },
              ok: { body: "You applauded without apology, and the party's phone started ringing that same night." },
              meh: { body: "You offered congratulations; the airtime went to louder men who front for this war." },
              fail: { body: "Your cheering got cut into the opposition's mockery reel, though no word you said was technically wrong." },
              critfail: { body: "\"He applauded this war\" went onto a blacklist. Not that blacklists count yet." }
            }
          },
          {
            id: "pivot_rebuild",
            text: "Pivot to reconstruction: contracts, jobs, the road home",
            note: "The bet: war stock converts into business stock. The risk: both sides see only money in your eyes.",
            outcomes: {
              crit: { body: "You turned \"got him — now what do we build?\" into a rallying letter for local industry. Reconstruction contractors and veteran-hire programs all wrote your name down." },
              ok: { body: "You caught the rebuild wave early; your name reached the local contract table." },
              meh: { body: "You talked shop too soon. Tonight every rundown in America has only one item: the hole." },
              fail: { body: "Your pragmatism earned neither blame nor money — nobody was listening tonight." },
              critfail: { body: "Bigger names intercepted every contract. You came away with one compliment: \"he has good timing.\"" }
            }
          },
          {
            id: "send_congrats",
            text: "One line of congratulations; nothing expanded, nothing predicted",
            note: "No bet. The risk: on a night like this, the quiet aren't attacked — and not recalled either.",
            outcomes: {
              crit: { body: "Your line — \"may this capture buy peace\" — became the only sentence in weeks quoted by both sides." },
              ok: { body: "You congratulated. Safe, decent, no sequel." },
              meh: { body: "You added one sentence to several hundred." },
              fail: { body: "Nobody noticed you tonight — which beats being noticed." },
              critfail: { body: "Your caution scored nothing and cost nothing. History kept no seat for you tonight." }
            }
          }
        ]
      },

      /* ---------------------------------------------------------------- 2004 */
      {
        id: "ln04_abu",
        title: "Abu Ghraib abuse photos hit print, and the country gags",
        body: "The human pyramid, the hood, the naked prisoner wired to a post, the grinning military dog — " +
          "the caption under the photos read: Iraq, Abu Ghraib prison, run by the US military.\n" +
          "The White House called it \"a few bad apples.\" But the whole country can do arithmetic: a few apples " +
          "don't produce hundreds of photos. The only question reporters leave at your door: are you shocked, or unsurprised.",
        brief: {
          lede: "Photos that make the country sick are forcing the one question you have dodged for a year.",
          known: [
            "The photos are authentic; investigations already point at the prison's command.",
            "\"Bad apples\" is the official line: repeating it is safe, questioning it is exposure.",
            "Both your military families and your suspect minority community are waiting on your mouth."
          ],
          rumor: [
            "Some testimony claims certain interrogation methods came from higher up.",
            "Some say this story gets buried inside a week."
          ],
          unknown: [
            "Whether this fire reaches the people who decided.",
            "Tonight's sentence becomes your label."
          ],
          terms: [
            { k: "Abu Ghraib", v: "The prison west of Baghdad, site of the 2004 abuse scandal." }
          ]
        },
        choices: [
          {
            id: "name_it",
            text: "Name it: not bad apples — a broken chain of command",
            note: "The bet: history sits on your side. The risk: right now, \"smearing the troops\" is a heavy hat.",
            outcomes: {
              crit: { body: "Months later, as the hearings climb the ladder, your \"broken chain\" gets quoted into \"the few who said it when it cost something.\" Press, churchgoers, anti-war voters — all kept the receipt." },
              ok: { body: "You said the hard thing, caught the flak, and earned a line on some list of early voices." },
              meh: { body: "Your condemnation dissolved into panel shows. Nobody quoted it; nobody charged you for it." },
              fail: { body: "\"He humiliated his own army this month\" became a flyer, stacked at recruiting-office doors." },
              critfail: { body: "Military-family groups organized against you. Protesters now burn your photo outside your own office." }
            }
          },
          {
            id: "bad_apples",
            text: "Hold the line: punish the individuals, never doubt the mission",
            note: "The bet: the establishment's shield holds. The risk: photos rot; your quoted sentence doesn't.",
            outcomes: {
              crit: { body: "Your phrasing got forwarded as a template across conservative circles. Defense and establishment filed you under \"useful.\"" },
              ok: { body: "You recited the line. Safe, boring, pleasing upward." },
              meh: { body: "Your statement was so balanced that nobody repeated it." },
              fail: { body: "New photos surfaced in summer. Your April \"bad apples\" theory got replayed over fresh images." },
              critfail: { body: "The inquiry pointed to approved policy. Your original \"just individuals\" became exhibit A for \"he whitewashed it knowingly.\"" }
            }
          },
          {
            id: "visit_families",
            text: "Refuse the prompt: go sit with returning troops and their families",
            note: "No bet. The risk: the question you dodge tonight finds you in an election year.",
            outcomes: {
              crit: { body: "Through the worst two weeks of the story you were in wards and family centers. Nobody blamed you for staying off their television." },
              ok: { body: "You did the quiet correct thing. No sentence of yours can be re-aired, because you made none." },
              meh: { body: "You said nothing wrong. You left nothing said." },
              fail: { body: "A reporter pressed for your view; you said \"no comment,\" and the story named you \"the evader.\"" },
              critfail: { body: "Four words of \"no comment,\" magnified by both sides. To this day, your position on the photos is a mystery." }
            }
          }
        ]
      },

      {
        id: "ln04_election",
        title: "Returns past midnight: one country, folded along a red-blue crease",
        body: "War, jobs, values, who looks more presidential — two campaigns plowed the country into two furrows. " +
          "The count ran past midnight; Ohio's county totals came down to a hair. The exit-poll map came up a red-blue " +
          "collage, and both sides declared these four years theirs.\n" +
          "National handlers have arrived in your district. For people at your level the question is never whether to enter " +
          "the ring — refuse, and someone will still carry you in as a prop.",
        brief: {
          lede: "When the country leans, people at your level are the cheapest chips on the table.",
          known: [
            "Both machines have quoted a price: speak for whom, stand for whom.",
            "Iraq is the fault line. Pick a side, eat that side's food.",
            "One thing is clear: you cannot collect both sides' payout."
          ],
          rumor: [
            "Some say a big city's counting dispute decides Ohio.",
            "Some say pick the winning side now and your name surfaces at redistricting."
          ],
          unknown: [
            "A razor-thin win curdles fast into a lame term.",
            "The handlers who bet for you wrote your name in their ledger."
          ],
          terms: [
            { k: "Swing state", v: "A state neither party holds safely, contested vote by vote." },
            { k: "Red state, blue state", v: "States color-coded by Republican or Democratic lean." }
          ]
        },
        choices: [
          {
            id: "all_in",
            text: "Back one side to the wall: buy ads, run the ground game",
            note: "The bet: winners remember who paid early. The risk: money and name hang on the same hook.",
            outcomes: {
              crit: { body: "Your side won — narrowly, and narrow wins itemize every early contribution. Someone from the new team opens doors for you personally." },
              ok: { body: "You bet with the winning herd. Your name sits mid-list at the spoils table." },
              meh: { body: "Money spent, muscle spent. The victory call did not reach your number." },
              fail: { body: "Your side lost, and your donation and stump records got framed in the winners' ads, scored by the losing night." },
              critfail: { body: "In the post-mortem you are the local \"most extreme dollar.\" Centrists in both parties now keep their distance." }
            }
          },
          {
            id: "play_both",
            text: "Bet both horses: a favor each way, owing neither",
            note: "The bet: machines change crews, not ledgers. The risk: when both sides' auditors meet.",
            outcomes: {
              crit: { body: "Neither side won by enough to settle scores, and both kept your half-favor. You are now \"the one who gets things done whichever team's in.\"" },
              ok: { body: "You kept a back door on both sides. You are familiar, and safe." },
              meh: { body: "Both took your money. Neither calls you theirs." },
              fail: { body: "Someone found your two-way record. \"Hedge\" went on the flyer — right opposite the nomination you want." },
              critfail: { body: "Both machines crossed your name off, and each told the other they had." }
            }
          },
          {
            id: "own_race",
            text: "Speak for nobody but yourself: run your own race, quietly",
            note: "No bet on the map. The risk: when the wave moves, the boat has no station for you.",
            outcomes: {
              crit: { body: "While the country scrambled, your own patch got solid. Nobody even bothered to contest your precincts." },
              ok: { body: "You owe no one, and you owe no noise." },
              meh: { body: "The election's fireworks were someone else's. You clocked in the next day." },
              fail: { body: "When the winners handed out thanks, your name appeared on no list of helpers." },
              critfail: { body: "\"Refused to stand when it counted\" reads as disloyalty to both camps. Both, smoothly, cold-shoulder you." }
            }
          }
        ]
      },

      /* ---------------------------------------------------------------- 2005 */
      {
        id: "ln05_katrina",
        title: "Katrina breaks the levees, and New Orleans goes under",
        body: "The eye came ashore before dawn on August 29. By afternoon the levees gave way in sequence and four-fifths " +
          "of the city went underwater. The Superdome and the convention center became the last islands: elders without " +
          "insulin, mothers queueing with infants, residents waiting out rescue buses that did not come, bodies waiting out ice.\n" +
          "The head of FEMA told cameras the system was \"ready,\" then days later admitted \"we got hoisted with our own petard.\" " +
          "Federal, state and city spent a week pushing the blame downhill. Before the water dropped, every network in " +
          "America was waiting for someone in charge — any level will do.",
        brief: {
          lede: "When water reaches the second floor, the only phone number that matters is the one that answers.",
          known: [
            "The levees were the federally promised shield. They failed.",
            "FEMA is moving slow, and local officials are complaining in public.",
            "Thousands of your registered voters are still in shelters or on the road."
          ],
          rumor: [
            "Some say relief supplies sit locked in a warehouse guarded by the National Guard.",
            "Some say engineers warned years ago the levees couldn't hold this storm."
          ],
          unknown: [
            "This failure will become a case study in governance.",
            "Who was managing these days, and who was hiding."
          ],
          terms: [
            { k: "FEMA", v: "The federal agency coordinating disaster relief." },
            { k: "Levees", v: "The engineered embankments holding the river off the city; their breach did the flooding." }
          ]
        },
        choices: [
          {
            id: "confront",
            text: "Name the federal failure on live TV: send troops and resources now",
            note: "The bet: the audience stands with the drowning. The risk: the blame-passers make you next.",
            outcomes: {
              crit: { body: "\"This city needs the military today\" replays all week and becomes the banner of the accountability fight. For once, the seat at the hearing goes to a local." },
              ok: { body: "Your shouting shook loose real resources — and made an enemy of the entire approval chain." },
              meh: { body: "You made it onto television. The camera went first to the water." },
              fail: { body: "Washington re-filed your outburst as \"local officials not cooperating with coordination.\" Now the flow routes around you." },
              critfail: { body: "A directive went out: \"he smeared the federal response during a disaster.\" You are review board Exhibit One." }
            }
          },
          {
            id: "convoy",
            text: "Fund your own convoy: borrow buses and planes across state lines, move people out",
            note: "The bet: results don't need permission. The risk: money and lives ride on one man's judgment.",
            outcomes: {
              crit: { body: "Your convoy ran the routes everyone swore were impassable. In the after-action report your name sits beside \"the ones who moved first.\"" },
              ok: { body: "Most of them got out. The procedure fight can wait for a later hearing." },
              meh: { body: "Your trucks made a few runs and a private fortune in diesel — at a scale nobody noticed." },
              fail: { body: "One dispatch error left a busload stranded at a transfer point for twenty hours. The complaints found your office." },
              critfail: { body: "One busload of elders never reached a hospital. The bill and the subpoenas arrive together." }
            }
          },
          {
            id: "work_channels",
            text: "Not one harsh word: haul resources through appropriations and procedure, all night",
            note: "The bet: the system rewards whoever grinds it. The risk: nobody sees how much you moved.",
            outcomes: {
              crit: { body: "You outlasted three federal case officers and signed placements everyone said were unsignable. When reporters later dug for \"who did good those days,\" they nearly missed you." },
              ok: { body: "Resources seeped in, ounce by ounce. Every debt you built is untraceable and unforgettable." },
              meh: { body: "You ground for a week. The approvals arrived less than the burn rate." },
              fail: { body: "You took public fury for the federal process. Public fury later included you in the category." },
              critfail: { body: "\"He was inside, helping keep a lid on it\" — since day three, that phrase walks a step behind you." }
            }
          },
          {
            id: "hotline",
            text: "Run one phone: a family-reunification line, and temporary beds for neighbors",
            note: "No bet. The risk: you tend to the people in front of you; the shouting matches get the coverage.",
            outcomes: {
              crit: { body: "Your hotline reconnected hundreds of families. The list isn't glamorous — and every name on it votes for you after that." },
              ok: { body: "You ran the bottom-layer wiring. No praise, no fault found." },
              meh: { body: "You took the calls, fixed small concrete kindnesses, and nobody remembered." },
              fail: { body: "The line jammed too often. One family never reached their daughter, and the complaint logged it \"mismanaged.\"" },
              critfail: { body: "\"All he could manage after the flood was answer phones\" became an hour of opposition material." }
            }
          }
        ]
      },

      /* ---------------------------------------------------------------- 2006 */
      {
        id: "ln06_wave",
        title: "2006 midterms: the president's party is buried, and Congress changes hands overnight",
        body: "The war that was promised \"will end\" did not end. Lobbying scandals arrived one busload a week. " +
          "On count night the opposition took the House and netted the Senate; every victory speech carried the same word: change.\n" +
          "The losing side started horse-trading before the confetti settled. Two sets of calls came to you: one counting " +
          "who had warned early, the other offering to present \"speakers who still work\" at the new majority's door — " +
          "the incoming Speaker's office is compiling an outreach list.",
        brief: {
          lede: "The wave came through. The question isn't which side you're on — it's how fast you can flip without looking like a traitor.",
          known: [
            "War and corruption buried the president's party's approval.",
            "The new majority's caucus is taking names; early gets listed first.",
            "Your old camp is still angry, and remembers every word you said."
          ],
          rumor: [
            "Some say the new slate is seated before the first gavel.",
            "Some say this wave is mood only; midterms always swing."
          ],
          unknown: [
            "Whether flipping early reads as vision or as luck.",
            "Both ledgers just added a line with your name in it."
          ],
          terms: [
            { k: "Midterm election", v: "The congressional race at the halfway point of a president's term." },
            { k: "Wave election", v: "A one-direction tide sweeping dozens of seats at once." }
          ]
        },
        choices: [
          {
            id: "early_turn",
            text: "Cut ties on count night: \"this party needs a new course\"",
            note: "The bet: the tide doesn't recede. The risk: the new masters mind that you came late — and fast.",
            outcomes: {
              crit: { body: "You are filed as \"the first of the old camp to see it clearly.\" The new majority opens a door; base voters heard you saying their own words." },
              ok: { body: "You switched flags in time. The old colleagues didn't name you that day; the new ones haven't audited you yet." },
              meh: { body: "You cut loose. Quicker talkers are already at the seating chart for the new posts." },
              fail: { body: "Your old camp wrote down count-night's line; your new camp filed you under \"opportunism.\" Neither is bringing you along." },
              critfail: { body: "Both camps joined hands over your head: a speculator who bet both ways and lost both." }
            }
          },
          {
            id: "stand_loyal",
            text: "Stay with the wreckage: gather the fragments, let them remember your loyalty",
            note: "The bet: losers get their turn back. The risk: if they don't, you drown with them.",
            outcomes: {
              crit: { body: "Your all-night gathering on the losing night kept the crew together. Two years on, at rebuilding time, the first inner circle is made of \"people who didn't leave that night.\"" },
              ok: { body: "You stood the vigil. In the party ledger your name is ringed in red ink." },
              meh: { body: "You stayed loyal. On a losing night loyalty buys nothing." },
              fail: { body: "You defended a leaking hull, and the shore saw only a man going down with it." },
              critfail: { body: "The purge list picked you as \"most loyal tier.\" The new majority used you as the cautionary display piece." }
            }
          },
          {
            id: "local_only",
            text: "Decline the national wave: run your own patch of ground, well",
            note: "No bet. The risk: wave elections reshuffle national chairs — those who stayed out go first.",
            outcomes: {
              crit: { body: "In a year when parties changed like seasons, your \"just gets it done\" sign became the interface both sides could plug into." },
              ok: { body: "You missed the reckoning and missed the bonus. Locally, nothing changed." },
              meh: { body: "Nationally the chairs were rearranged. Nobody thought to ask you." },
              fail: { body: "Both sides assumed you \"belong to nobody.\" Slots that need a man present skipped right past you." },
              critfail: { body: "\"When it counted, he minded only his own doorstep\" — same sentence, same phrasing, in both parties' internal reviews." }
            }
          }
        ]
      }
    ],

    /* 世界线英文层：只覆盖 brief / outlets（pressure 是数值平衡，不碰）。
       outlets 逐年回译成当年真实存在的美国媒体，条数与中文侧严格一致。 */
    worldline: {
      brief: {
        "2003": "A fast victory and a long occupation share the same calendar. The country is about to start its celebration when it gets the faint feeling the party began a little early.",
        "2004": "The country folds along a fault line: red and blue, church and bar, victory and the swamp underneath it. One television set, two realities.",
        "2005": "The water came, the levees gave, the rescue was late. For the first time the country watches live as its government fails to knock on the doors of its own citizens.",
        "2006": "The war's bill comes due, and voters finally find the checkout counter. Overnight, the word \"change\" becomes a valuable coin in both parties' mouths at once."
      },
      outlets: {
        "2003": ["The New York Times", "The Washington Post", "USA Today", "CNN", "CBS", "NBC"],
        "2004": ["The Wall Street Journal", "USA Today", "CNN", "ABC", "Newsweek"],
        "2005": ["The New York Times", "USA Today", "CNN", "CBS", "The Huffington Post"],
        "2006": ["The Wall Street Journal", "The Washington Post", "USA Today", "CNN", "ABC", "The Huffington Post"]
      }
    }
  }
});
