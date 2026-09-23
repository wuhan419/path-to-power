/* ============================================================================
 * CONTENT · i18n/en/events/96-crisis-2.js
 * 中文文件 content/events/96-crisis-2.js 的英文覆盖层（危机线·二）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件/选项按 id 定位；brief.terms 不带 id，按数组下标对齐。
 *   · 纯字符串数组（known / rumor / unknown）整体替换，条数与中文逐字一致。
 *   · 结构性键（id / era / tierMin / weight / base / mods / effects / flags /
 *     req / cost / stake …）受引擎保护，本文件一律不写。
 *
 * 英文写法：按英语重写，不是逐字翻。第二人称、现在时、短句；
 * 「」在英文里用引号或改写掉；机构名用真实英文名（National Guard、FDIC 口径）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      /* --------------------------------------------------------------------
       * 1) cri2_flood — the flood: show up, resources, or cameras
       * ------------------------------------------------------------------ */
      {
        id: "cri2_flood",
        title: "The Day the River Crossed the Rail Culvert",
        body: "At three in the morning the river swallowed the old rail culvert. Three low blocks of your district are underwater; the church steeple is now the command post.\n" +
          "You stand on dry ground with three roads ahead of you: into the water, into the office, in front of the camera.",
        brief: {
          lede: "The flood cuts the district in two: the half underwater, and the half watching.",
          known: [
            "Three low blocks are flooded. Rescue says noon at the latest — it is six in the morning.",
            "The pastor's message: your people are watching to see if you show up. Those three blocks are yours either way.",
            "Pumps, sandbags and Guard trucks are all being pulled toward the city. Loudest voice gets them first."
          ],
          rumor: [
            "The county emergency director hunts with your rival — the queue order is negotiable.",
            "An out-of-state contractor's advance truck already crossed the county line. Cleanup contract unsigned, crew on site."
          ],
          unknown: [
            "When the water drops, the district remembers who was in it — and who was on camera.",
            "Rebuild contracts go out within two weeks. That is where the next round starts."
          ]
        },
        choices: [
          {
            id: "wade_in",
            text: "Be there before dawn: get in the water first, talk about the rest later",
            note: "Rolled-up cuffs beat any press statement. The pastor and his people will tell this story for ten years — if you really helped, not just got in the way.",
            outcomes: {
              crit: { body: "The county camera finds you knee-deep, carrying the seventh person out. It never gets your face — it gets the old woman on that porch gripping your arm. Everyone in three blocks knows that soaked jacket." },
              ok: { body: "You hold the shelter all day: log names, hand out blankets, call the county to fight for pumps. Nobody films you, but everyone whose name you wrote down remembers your face." },
              meh: { body: "You show up and help for hours, then notice your real job is standing at the curb answering flood victims' insurance questions. You have no answers, but you write the questions down." },
              fail: { body: "You arrive wrong: motorcade, aides, half a morning of posed shots. Someone says behind you, \"He came for the photos.\" That line drains slower than the water." },
              critfail: { body: "You scream at county emergency staff in front of volunteers; the pumps get rerouted to another district. Three blocks sit under two more days of water — and the district files it under your name." }
            }
          },
          {
            id: "resources",
            text: "Work the phones from the office until the pumps roll into the district",
            note: "No hero, just pumps. This is the road for people who hate cameras — pull it off and the pastor shows up for you; fail and you are just another voice saying \"hold, please.\"",
            outcomes: {
              crit: { body: "By noon four pumps, two truckloads of sandbags and a National Guard squad roll into the district on the checklist you circulated. The pastor names you in the evening prayer — not to your face; that is the kind that counts." },
              ok: { body: "Half the resources land: pumps yes, sandbags no. The low blocks drain by day two — the middle ones are still dripping." },
              meh: { body: "A morning of calls earns one sentence: \"You're on the second batch.\" You pass it to the shelter word for word — honest, but nobody wants to hear it." },
              fail: { body: "Another district takes the supplies. Your staffer says on the phone, \"Everyone is in a tough spot.\" Flood victims repeat that line on TV — in a different tone." },
              critfail: { body: "You jump the county's queue and call the state directly. The pumps come; so does the emergency director's enmity — he screens the first rebuild contracts." }
            }
          },
          {
            id: "camera",
            text: "Bring the reporters: make the whole county see these three blocks",
            note: "Cameras are a resource — coverage can force appropriations, or it can bury your name. Just never let anyone catch you looking into the lens.",
            outcomes: {
              crit: { body: "You ride the rescue boat with the press pack, and the evening lead lands on the mother holding her child at a second-floor window. Your voice gets two lines. The federal disaster aid goes to fast track the next day." },
              ok: { body: "The story runs; the county finally sees the district. One flood victim says, \"Someone is speaking for us at last.\" Another studies your boots in the photo, wondering if they are new." },
              meh: { body: "The story lands on an inside page with a photo of a different street. Your name appears once, in the third-to-last paragraph." },
              fail: { body: "The photo runs: you on an inflatable raft — the one six flood victims vacated for you. The letters-to-the-editor column outgrows the story." },
              critfail: { body: "A reporter films your aide shoving rival outlets back — \"exclusive\" becomes the headline on other stations that night. Nobody mentions federal aid anymore. All anyone mentions is you." }
            }
          },
          {
            id: "contract",
            text: "Broker the cleanup contracts: bring in \"the right people\" and take a piece",
            note: "The water is still high and the money is already moving. Fastest cash in a crisis — longest-lasting stain. Who signed, what you got: someone reads the ledger sooner or later.",
            outcomes: {
              crit: { body: "The contractor you introduced has crews on the ground in two days — fastest cleanup in the county, rates just 15 percent over market. Your finder's fee moves through three shell companies. Invisible, for now. For now." },
              ok: { body: "Contract signed; the job is neither elegant nor awful. You take your middleman's cut — decent money, unclear origin." },
              meh: { body: "The contractor is three days late; flood victims curse the ruins for three days. Your cut arrives on time — same amount, plenty of noise." },
              fail: { body: "A local old-line contractor kills the deal — at the hearing he asks one question: \"Who introduced them?\" You get nothing except the start of a reputation." },
              critfail: { body: "The cleanup contracts run sixty percent above the neighboring county's, and the state auditor's first call is to you. The finder's fee becomes exhibit page one." }
            }
          },
          {
            id: "donate",
            text: "Give the shelter a week of your calendar and a month of your salary",
            note: "No cameras grabbed, no resources grabbed — just money and hours. It will never make headlines, but the church ledger will carry one line with your name.",
            outcomes: {
              crit: { body: "The shelter's hot-meal line runs an extra week of shifts. At the monthly dinner the pastor introduces you to the whole parish council — the most useful network in this county." },
              ok: { body: "Money given, shifts staffed. Nobody announces it, but your name sits on page one of the shelter's volunteer list." },
              meh: { body: "Your donation buys blankets and sandwiches. The water drops in three days; leftover blankets pile up in a church corner — the logistics of goodwill never add up." },
              fail: { body: "Two weeks later someone asks in the paper about the shelter's books: on the donor list, your name carries a note — \"(via campaign account).\"" },
              critfail: { body: "The buyer who handled your donation is caught skimming kickbacks. The money wasn't yours — but the donor column has your name. The explanation runs as long as the blame." }
            }
          }
        ]
      },

      /* --------------------------------------------------------------------
       * 2) cri2_plant_closure — the plant shuts down
       * ------------------------------------------------------------------ */
      {
        id: "cri2_plant_closure",
        title: "The Big Employer's Notice Fits on One Page",
        body: "This morning the district's biggest plant taped a notice to the gate: closing in eighteen months, 2,300 jobs.\n" +
          "The union chair phoned your office by noon: \"We need to know whose side you are on.\"\n" +
          "Headquarters is a thousand miles away, and no chair in that boardroom is yours — but your district will watch how you move those chairs.",
        brief: {
          lede: "One page of notice, twenty-three hundred lives, and your entire afternoon.",
          known: [
            "The plant has fed two generations here. Behind its 2,300 jobs sits nearly half the district's votes.",
            "The union chair was blunt: eight hundred members, and right now they need to know what you are doing.",
            "The county's chips are thin: tax breaks, infrastructure, retraining — each one needs someone to carry the expectations."
          ],
          rumor: [
            "Headquarters is still shopping bids from two states. The word \"rescue\" has a price tag.",
            "The plant site was appraised long ago: the waterfront is worth more empty."
          ],
          unknown: [
            "Whether the plant lives or dies, you can nudge but not decide.",
            "In one year the unemployment rate will audit every boast made today."
          ]
        },
        choices: [
          {
            id: "save",
            text: "Lead the rescue: put tax breaks, loans and promises all on the table",
            note: "Win and you are the savior; lose and you are the one who made promises — both lines are long. The rescue money is the taxpayers', and so are the ledgers.",
            outcomes: {
              crit: { body: "The package you stitched together wins a four-year delay plus a written pledge to keep 1,200 jobs. On signing day you stand at the plant gate under a banner the union made itself." },
              ok: { body: "You cannot save the whole plant, but warehousing and logistics stay — four hundred jobs. The union chair's verdict: \"He actually went in to talk.\" In that crowd the line is worth a primary." },
              meh: { body: "The plan goes up; headquarters writes back with a lot of \"careful consideration\" and \"appreciation.\" You read the letter twice. Both times it says the same thing." },
              fail: { body: "The state matching funds die in committee and the rescue package falls apart. You explain \"the process\" three times on the radio; listeners only hear \"failed.\"" },
              critfail: { body: "The tax break you promised rips a hole in the state budget, and legislators from other districts cite you as the cautionary tale. The plant closes, the cuts stand, and your name becomes a byword for money wasted." }
            }
          },
          {
            id: "retrain",
            text: "Accept the closure and bet everything on retraining and new employers",
            note: "You are not saving the plant, you are saving the people next to it. No farewell parade on this road — only the employment rate a year from now. Slow medicine, maybe the only real one.",
            outcomes: {
              crit: { body: "You weld the training center to the community college and personally take three recruiting trips. A year later the new employer's warehouse breaks ground — forty percent the old plant's size, but the first steel rising in this neighborhood in ten years." },
              ok: { body: "The training center opens; six hundred enroll. Whether it works shows in a year — but everyone in that line knows your face now." },
              meh: { body: "Training money approved, classes running — and not one local firm hiring anyone trained. At graduation you clap very, very hard." },
              fail: { body: "\"He went to talk to new plants\" translates at the bar as \"he gave up on our plant.\" Your name is missing from the union bulletin — the absence is the verdict." },
              critfail: { body: "The \"new employer\" you courted collects the relocation grant and leaves eight months later — they even cut the plant's power for unpaid bills. Your name gets nailed to that empty building." }
            }
          },
          {
            id: "walk",
            text: "Let it stand: market decisions are not a politician's to overturn",
            note: "Give the decision back to the market, keep quiet yourself. Fiscal hawks will call you clear-eyed — the plant town will only remember you never came.",
            outcomes: {
              crit: { body: "You release a careful statement about structural change and the long run. The state paper's editorial page calls you honest — sometimes honesty is the cheapest option." },
              ok: { body: "You make no big moves. The notice at the gate fades; your phone goes quiet — quietly enough to be embarrassing." },
              meh: { body: "\"He says this isn't a politician's job\" — the line makes one round of the smokers' corner at the plant gate and comes back half shorter." },
              fail: { body: "The union chair crosses your name off the endorsement list for the primary, with a thicker pen than the one you sign with. For that week in 2,300 households nobody spoke for them — and people remember it." },
              critfail: { body: "The night before closure the gate rally makes national news. The cameras find one handwritten banner: \"WHERE IS OUR REP.\" Your list of reasons not to attend is longer than the banner." }
            }
          }
        ]
      },

      /* --------------------------------------------------------------------
       * 3) cri2_plant_after — one year later, the reckoning
       * ------------------------------------------------------------------ */
      {
        id: "cri2_plant_after",
        title: "A Year After the Closure, District Unemployment Doubles — Front Page",
        body: "The state labor department's quarterly numbers landed, and the local paper put them on page one: district unemployment at 11 percent, double the pre-closure rate.\n" +
          "Beside the figures sit your own words from these eighteen months — sentence by sentence, like a bank statement.",
        brief: {
          lede: "Numbers take no sides, hear no excuses, read only results.",
          known: [
            "Unemployment 11 percent — double the pre-closure level. Your opponent has already checked.",
            "Every word you said at the plant gate, the hearing, the radio is on file.",
            "And twenty-three hundred household mailboxes — some still on the training waitlist."
          ],
          rumor: [
            "The opponent's next ad is already cut: your own promises scored to the rising unemployment line.",
            "The new employer's phase two is genuinely in talks — but the announcement waits until after the election."
          ],
          unknown: [
            "Whether what you planted has sprouted: see next quarter's report.",
            "How the front page answers back — are you defendant or witness?"
          ]
        },
        choices: [
          {
            id: "own_it",
            text: "Own the numbers: lay out the record and your effort together",
            note: "No dodging. Name the unemployment rate, then itemize the training, the recruiting, the waitlist — betting the district can tell \"didn't do it\" from \"didn't manage it.\"",
            outcomes: {
              crit: { body: "At the town hall you put the state data, the training roster and the recruiting record on the screen for a full forty minutes. At the end a few older workers come up to shake your hand — not many, but each one brought family." },
              ok: { body: "You own the numbers and walk through the effort. The headline is ugly but fair: \"BAD NUMBERS, CLEAN BOOKS.\"" },
              meh: { body: "Your \"process explanation\" gets cut by the opponent into a thirty-second excuse reel. You clarify twice; by the third you hear the fatigue in your own voice." },
              fail: { body: "Owning it reads as folding — at least that is how the ads cut it. The district's anger needs a name, and yours fits best." },
              critfail: { body: "One training grant's trail of spending stumps you live in front of a reporter. Those three silent seconds replay all the next day." }
            }
          },
          {
            id: "pivot",
            text: "Point at headquarters and the state: the responsible parties live elsewhere",
            note: "The anger is ready-made; it lacks direction. Give it one — but once the arrow leaves the string you do not choose where it lands.",
            outcomes: {
              crit: { body: "Your press conference at the shuttered plant lights the fuse: within a week a corporate-accountability bill hits the state assembly calendar and you are invited to testify. The anger has a new address — and it favors you." },
              ok: { body: "\"Headquarters' ledger, the state's failure\" — the line spreads through the bars. Unemployment is unchanged, but the shouting at you quiets." },
              meh: { body: "The shots go out; headquarters stays silent — a multinational's PR team has handled bigger. Your arrow sticks into the air." },
              fail: { body: "The opponent strikes back: the rescue package you once brokered goes public — \"two years ago he chased the same headquarters with taxpayers' money too.\" The wind shifts." },
              critfail: { body: "The executive you named replies with an open letter, quoting line by line what you wrote begging them to stay — including \"the district remembers its friends.\" The paper prints it in full." }
            }
          },
          {
            id: "quiet",
            text: "Say less, walk more: fill every day with aid offices and job fairs",
            note: "Do not make the front page; make the waitlist. Help households one by one — slow, and every debt gets recorded on a person, not on paper.",
            outcomes: {
              crit: { body: "Four months, thirty-one job fairs, two hundred-odd people matched with work — not all, but each one a specific name. On primary day, those names show up at the polls." },
              ok: { body: "You become a regular between the aid office and the job fairs. Helped or not, the talk is the same: \"At least he kept showing up.\"" },
              meh: { body: "Lots of walking, fewer wins than you hoped — structural problems do not read your calendar. But the favors you owe run both ways." },
              fail: { body: "The opponent's front-page ad ignores your miles and runs only the red line of unemployment — numbers are louder than footsteps." },
              critfail: { body: "A worker you personally referred to the warehouse is hurt on his third shift. His family does not blame you — but the paper asks the question for them." }
            }
          }
        ]
      },

      /* --------------------------------------------------------------------
       * 4) cri2_epidemic — the hallway wards
       * ------------------------------------------------------------------ */
      {
        id: "cri2_epidemic",
        title: "The County Hospital Turned Its Hallways Into Isolation Wards",
        body: "It crossed over from the next county; now it is yours. The hospital lined its halls with quarantine beds, and half the school-closure notices are already printed.\n" +
          "Clinics post queue rules at the door; pharmacy shelves strip bare by afternoon. Everyone is waiting for someone to speak — and, out of habit, looks toward City Hall. Even the lowest office in it.",
        brief: {
          lede: "The disease is invisible; the panic is not — and panic travels faster.",
          known: [
            "A county hospital doctor is an old friend: wants cooperation on isolation, supplies, someone willing to appear.",
            "Pharmacies ration, churches cancel services, schools meet on emergency tonight. Less information, more rumors.",
            "Panic needs a keeper, order needs a maker, blame needs a carrier — the same deal in every era."
          ],
          rumor: [
            "Some say the outbreak is blown out of proportion — they stock two full medicine cabinets.",
            "County supplies got redirected to the rich county; the manifest sits in some drawer."
          ],
          unknown: [
            "The doctor gives ranges; the number you say is the one people remember.",
            "They will forget the virus. They will not forget what you said."
          ]
        },
        choices: [
          {
            id: "front",
            text: "Stand out front: daily briefings, naming what you know and what you don't",
            note: "Panic hates a vacuum. You fill it — betting honesty buys trust. Lose the bet and one wrong sentence follows you for life.",
            outcomes: {
              crit: { body: "Your daily briefing becomes the county's fixed point: the numbers, the measures, and one standing line — \"here is what we still don't know.\" Afterward, at the memorial, the doctor says: \"Those weeks, he stood between us and the panic.\"" },
              ok: { body: "The briefings run six weeks on plain truth. People grow used to your voice on the four o'clock radio — habit is another name for trust." },
              meh: { body: "Mixed effect: believers believed, skeptics called you a script-reader. But you showed up at four, every day." },
              fail: { body: "A set of numbers you relayed turns out wrong — a source problem, not yours, but your face is on the briefing. Later you strip out every figure; all that remains is \"please stay calm.\"" },
              critfail: { body: "In the week-two briefing you say, \"The worst is past us.\" Week three buries more people than the two weeks before combined. Those four words get carved into every billboard of the next campaign." }
            }
          },
          {
            id: "logistics",
            text: "Burrow into the supply chain: pharmacies, churches, freight — one thread at a time",
            note: "Skip the podium and do the work under it: ration rules, parish delivery routes, pharmacy resupply. Nobody applauds — until the missing medicine box shows up at the right doorstep.",
            outcomes: {
              crit: { body: "You stitch three church delivery networks, the county pharmacy board and one freight firm into a single map: shut-ins get meds and hot soup at the door by next morning. The map keeps working after the epidemic ends — the parish just calls it by your name." },
              ok: { body: "The network goes up and covers two of three blocks. Families receiving meds do not know who coordinated it — the church volunteers do, and they talk." },
              meh: { body: "The net is up but the supplies are not: the waiting list outgrows the medicine. You do the hardest job — decide who goes first — and sign your name to it." },
              fail: { body: "The state's centralized allocation scrambles your lines — your network gets folded into official channels. Credit files to the paperwork; chaos files to you." },
              critfail: { body: "A batch you coordinated gets traced to private clinics paying top dollar. Your runner took the skim; the coordinator on the list is you. You swear you knew nothing — but during a plague \"I didn't know\" is no defense." }
            }
          },
          {
            id: "business",
            text: "Fight for shops and families: grants, rent relief, kept jobs",
            note: "The sickness passes; the bills come monthly. You bet on the other lifeline: businesses that survive until reopening, and families that can still pay rent.",
            outcomes: {
              crit: { body: "You squeeze emergency micro-grants from a crack in the county budget and talk the two biggest landlords into pausing rent without breaking leases. Afterward, Main Street's share of lit storefronts is the county's best. Shopkeepers remember who drew a line through the bills." },
              ok: { body: "The grant portal opens; you helped rewrite the rules overnight to keep them plain. You cannot say how many stores it saves, but the people in line at least have a line." },
              meh: { body: "Grants too small, process too slow — half gratitude, half grievance. You learn to read human temperature off a budget sheet." },
              fail: { body: "The county council guts the grant plan after your numbers went public, turning them into IOUs. Shopkeepers come back with your own flyer, asking where the difference is." },
              critfail: { body: "Two grantees turn out to be tied to you or your donors — legal process and all, but \"legal\" is as useless during a plague as \"I didn't know.\"" }
            }
          },
          {
            id: "wait",
            text: "Say nothing the health department did not say first",
            note: "Leave the expertise to the experts. Safe — unless the official process runs slow and a loquacious rival fills the quiet first.",
            outcomes: {
              crit: { body: "You relay the county health officer's words without adding a syllable. The epidemic passes; nobody remembers what you did — or what you got wrong. In a plague year that counts as a term well served." },
              ok: { body: "You follow procedure, and procedure holds up. A quiet page." },
              meh: { body: "Official notices are always half a beat late — and gossip fills the gap. Every statement you relayed is a day behind the rumor it refutes." },
              fail: { body: "Your rival does not wait for procedure. He hands out self-printed prevention guides at the church door — right or wrong is beside the point; his name is on them." },
              critfail: { body: "\"He vanished for six weeks\" — that is not an attack line; it is a resident's memory, and the opponent printed it verbatim. Memories are harder to rebut than charges." }
            }
          }
        ]
      },

      /* --------------------------------------------------------------------
       * 5) cri2_grid_failure — the blackout, City Hall's Passion day
       * ------------------------------------------------------------------ */
      {
        id: "cri2_grid_failure",
        title: "Four Minutes After the Whole City Went Dark",
        body: "Rush hour, and the city goes black. Traffic lights die, elevators stop, the water plant's backup pumps fail to switch over.\n" +
          "The utility's phone lines are jammed; emergency management waits on you: when will it be fixed, who pays, whose fault is it?\n" +
          "Three questions — get any one wrong and it is a political wreck. And all three are due tonight.",
        brief: {
          lede: "Fix it slow and they curse you; fix it fast and the auditors come. This is City Hall's Passion day.",
          known: [
            "Two pump stations' backups failed to start — and you signed off their maintenance budget last week.",
            "The utility quotes five days plus emergency funding, at 1.8 times its standard rate.",
            "There is already a crowd outside City Hall, phones aimed at the lit window of your office."
          ],
          rumor: [
            "Last year's maintenance budget got siphoned into road repair; your countersignature is on the authorization.",
            "The firm filed a risk report years ago; two administrations shelved it in a row."
          ],
          unknown: [
            "The number you say tonight becomes the official deadline.",
            "The emergency contracts land on the audit table in six months."
          ]
        },
        choices: [
          {
            id: "fast",
            text: "Five days is too long: sign emergency terms, power back in forty-eight hours",
            note: "Light first, accountants later. The city will thank you — the audit board meets in six months, and premium-rate invoices never get forgiven.",
            outcomes: {
              crit: { body: "Forty hours to full restoration — eight ahead of your promise. You speak on the lit steps of City Hall, and nobody asks about the money. Nobody asks yet." },
              ok: { body: "Power back at hour fifty-six. Your \"forty-eight\" missed by eight; nobody quibbles — people in the dark are generous about time." },
              meh: { body: "Day three before the lights return — core blocks first, the edges wait another thirty hours. Your \"forty-eight\" becomes a line in the opponent's binder." },
              fail: { body: "You signed the premium contracts, spent the money, and the outer blocks stay dark until day five. The bill is as long as the blackout — both go down under your name." },
              critfail: { body: "Restoration week, the contract details hit the front page: the largest shareholder of one winning firm is your college roommate. You may genuinely not have known — but the lights are back on, and so are eyes on the newspaper." }
            }
          },
          {
            id: "by_book",
            text: "Run the normal procurement: every step of procedure, until it is fixed",
            note: "Every cent clean. The price is paid in dark evenings — procedural justice gets billed to people's light bulbs.",
            outcomes: {
              crit: { body: "Procurement follows every rule, and the delay is less than you feared — nine days to full restoration. At audit yours is the cleanest ledger in the city, and in an election year, clean itself has value." },
              ok: { body: "Procedure completed, power back on day eleven. The savings are real; so are the two extra dark days — separate ledgers." },
              meh: { body: "The public notice period eats four days. Outside City Hall the protest candles become a vigil — and your friends are not on the vigil roster." },
              fail: { body: "Day eleven's front page: two photos side by side — an apartment block still dark, and a procurement notice posted right on schedule. Nothing wrong with the procedure. The guilty face looks like yours." },
              critfail: { body: "Week two of the blackout, a nursing home with no backup power suffers an incident. The family's lawyer writes into the complaint: \"He had the authority for emergency procurement. He chose the process.\" You cannot rebut that sentence." }
            }
          },
          {
            id: "blame",
            text: "Drag the utility to the microphone: hearings, accountability, refunds",
            note: "The anger needs an address, and the company is the sensible one. The hearing cameras are all yours — as long as nobody pulls up the maintenance budget you signed.",
            outcomes: {
              crit: { body: "At the hearing you chair, the utility's CEO pledges on camera: a one-year rate freeze, no surcharges on the repair crews. The anger finds an address, and you picked it. The paper says the committee found its spine for the first time in years." },
              ok: { body: "The hearing runs; you collect half the promises — repair rates capped, freeze denied. Even half a promise fits on a campaign poster." },
              meh: { body: "Six hours of testimony; the company's lawyer says \"we'll respond in writing\" two hundred times. You swing a fist — into paperwork." },
              fail: { body: "The company's PR team digs up the maintenance-budget cuts — your countersignature in the margin. In one afternoon, plaintiff and defendant trade seats." },
              critfail: { body: "A set of \"insider numbers\" you cite at the hearing turns out to be a misreading. The stock slides, and the board's lawyer letter reaches City Hall the next day. Accountability folds into defamation." }
            }
          },
          {
            id: "streets",
            text: "Hit the streets first: water stations, charging points, patrols block by block",
            note: "Engineers fix the power; the people waiting in the dark are yours. How to live through five black nights is the one answer City Hall can deliver directly.",
            outcomes: {
              crit: { body: "Within forty-eight hours, twenty-seven water and charging stations glow across the city — powered by school generators and church kitchens. During the blackout the only list that stayed lit belongs to City Hall. Voters remember that kind of glow." },
              ok: { body: "Stations cover the major neighborhoods; the welfare list of shut-ins gets walked end to end. The power is not fixed yet, but nobody got forgotten." },
              meh: { body: "Half the stations open; the other half stall on generator rentals. You console yourself: half-done beats none. The consolation barely works." },
              fail: { body: "On night two, looters hit two stations. You call for calm on the morning radio — and as you speak, you hear knocking on your door. The metaphorical kind." },
              critfail: { body: "The volunteer patrol you posted at a station goes wrong: one member gets physical with a resident. The problem you meant to solve never happened; the one you caused made the news." }
            }
          }
        ]
      },

      /* --------------------------------------------------------------------
       * 6) cri2_bank_run — the Friday line (2008)
       * ------------------------------------------------------------------ */
      {
        id: "cri2_bank_run",
        title: "By Friday Dawn the Line at the Bank Had Begun",
        body: "First the business-page rumors, then the parking-lot whispers. At seven Friday morning, two hundred people stand outside the district's bank.\n" +
          "The cash behind the counters will not last past noon. Panic needs no proof — only a starting point, and one morning when nobody in charge shows up.",
        brief: {
          lede: "Banks do not die of insolvency. They die of rumors outrunning their reserves.",
          known: [
            "This bank holds half the district's money: payrolls, the church's books, shop float.",
            "The branch manager is not asking you to save the bank — only for one trusted face to come say \"I keep my money here too.\"",
            "There is a regulatory channel, but it runs slow. Monday is payday, and if the money is not safe by then, panic doubles."
          ],
          rumor: [
            "The bank bet deposits on plunging assets — the story mutates three times a day.",
            "Someone in line swears the manager's wife withdrew money yesterday. That one hurts the most."
          ],
          unknown: [
            "Even the manager is waiting for the books. Panic does not wait for numbers.",
            "Every word you say either thins the line or sets a tombstone."
          ],
          terms: [
            { k: "The Bank Run", v: "When depositors all want their money at once, fear alone can topple a solvent bank." }
          ]
        },
        choices: [
          {
            id: "public_deposit",
            text: "Step up to the counter and make a deposit — in front of everyone",
            note: "Action outruns statements: turn \"I believe in this bank\" into a dated transaction with a receipt. Now your money floats or sinks with theirs — that is both the pitch and the real risk.",
            outcomes: {
              crit: { body: "You hold a $100,000 deposit slip up for the cameras, then sit and talk with the elders in line one by one. By noon the line is half gone. In the casebooks, runs are stopped by exactly this kind of image." },
              ok: { body: "You deposit, then talk at the door for ten minutes. The line slows — it does not break, but it stops growing. On Monday the bank opens." },
              meh: { body: "Your deposit makes the local news and the bar jokes: \"A politician banks money — watch him withdraw it tomorrow.\" The line empties slowly, but it empties." },
              fail: { body: "The deposit reads as theater — the opponent leaks your account opening at another bank last month (campaign-finance compliance, but nobody reads footnotes). The line keeps growing." },
              critfail: { body: "The very day after you deposit, the bad loans are confirmed and the regulator takes over. Your $100,000 goes up in foam; you become \"the politician who vouched for a rotten bank\" — money and name sunk together." }
            }
          },
          {
            id: "organize",
            text: "Work the line: register people, explain deposit insurance, move them in batches",
            note: "Not the hero but the quartermaster: turn a panicking line into an orderly one. Dull, tedious — and the most underrated move in all of crisis politics.",
            outcomes: {
              crit: { body: "You and your volunteers split the line into \"need cash today\" and \"just scared.\" The scared half stay inside with coffee and a brochure on deposit insurance. The counter cash lasts to closing — and Monday brings the regulator's order. Two words start following you: \"the order guy.\"" },
              ok: { body: "The triage works: withdrawal order holds, the bank survives Friday. Nobody writes about you in week one — your column comes two years later." },
              meh: { body: "You set up a registration desk and explain until afternoon. The line remains — it just goes from an angry line to a tired one. That is also a kind of cooling." },
              fail: { body: "Your batching plan gets branded \"stalling for the bank.\" Someone shouts, \"Put him at the back!\" You organize all afternoon and harvest nothing but one loud afternoon." },
              critfail: { body: "At the door you promise \"insurance covers it, the money is there.\" Three days later the payout cap lands at half your word. Dozens of households file the loss quietly under your name — and that ledger carries no ceiling on interest." }
            }
          },
          {
            id: "call_favor",
            text: "Work the wires: regulators and head office on one table before sunrise",
            note: "The front desk needs confidence; the back needs cash. You burn one all-nighter hauling in real rescuers — win and it looks like a miracle; lose and savers and the establishment blame you at once.",
            outcomes: {
              crit: { body: "By Saturday dawn, head office issues the liquidity letter and the regulators' joint statement goes out the same hour. The bank opens on time Monday; all outside is the paperboy. The district never learns about your all-nighter. Head office does, and that kind of connection pays high interest." },
              ok: { body: "The back channel works: approvals finish, funds land Monday. One weekend late, but they land. Your newspaper title is \"coordinator\" — accurate, if not loud." },
              meh: { body: "The table got set, the letter went out — but the wording is so soft it says almost nothing. The line shrinks by a third; the fire still glows under the ash." },
              fail: { body: "The regulator listens politely, hangs up, and follows procedure. Procedure reaches next week. At the bank door someone asks, \"Wasn't it supposed to be fixed?\" You have no answer." },
              critfail: { body: "Your phone remark \"this bank can pay\" leaks, and the paper runs it beside the takeover notice two weeks later. The wire never closed; the quote escaped first. \"Steadying savers or misleading them?\" — now the hearing's very question." }
            }
          },
          {
            id: "vulture_buy",
            text: "Buy the panic: take assets and paper from scared sellers at a discount",
            note: "Other people's fear is your markdown. This is the vulture's feeding window — fastest money, longest stain, and every trade leaves a receipt.",
            outcomes: {
              crit: { body: "At panic pricing — thirty percent off — you take six storefronts along the row and a lien layer at the bank. Prices double in eighteen months. Every layer is clean and legal, and nothing launders the date on the paper." },
              ok: { body: "You learn the buy-low, sell-high lesson well. A few long-memoried people in the district start looking at you a new way — the way one looks at a certain bird." },
              meh: { body: "What you bought neither rises nor falls; it flatlines on the books. You hold the cash hostage and your reputation at a discount — both sides waiting." },
              fail: { body: "The panic was shallower than you thought, the prices harder. You caught the top, and a photographer catches you dining with the branch manager — the meal is real; the excuse no one believes." },
              critfail: { body: "Your hardest-haggled deal comes out of the parish pension — nuns forced to sell storefronts to fund elder care. The trades are legal. The church bulletin runs the story three weeks running. In the fourth, the hearing invitation arrives." }
            }
          },
          {
            id: "stay_out",
            text: "Stay out of it: bank problems go to the bank and the regulator",
            note: "Your own accounts sit in that very bank — which means you judge the people in line wrong. Stay out and the money is safe. Politically, that is another matter.",
            outcomes: {
              crit: { body: "You do nothing. Monday the regulator takes over; deposit insurance catches every saver. The panic burns itself out. No credit, no blame — in politics we call that intact." },
              ok: { body: "It resolves by procedure. The paper credits the regulators, not you. Your inaction dodges the bullets — and the cameras too." },
              meh: { body: "The bank survives, but someone in line remembers: that Friday nobody from the office came out. Not an accusation — just a fact they kept." },
              fail: { body: "The regulators miss a step, and the weekend of locked doors goes national. What the district keeps: an empty front step. A step someone was supposed to be standing on." },
              critfail: { body: "The bank fails, payouts take a month. Seven shops miss payroll and shut — each roll-down door still wears your campaign sticker. At the next council meeting, your first question is about that Friday." }
            }
          }
        ]
      }
    ]
  }
});
