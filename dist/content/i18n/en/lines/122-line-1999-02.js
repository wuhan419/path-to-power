/* ============================================================================
 * CONTENT · i18n/en/lines/122-line-1999-02.js
 * 中文文件 content/events/122-line-1999-02.js 的英文覆盖层（1999—2002 连续时间轴）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices / terms 里带 id 的按 id 对齐，不带 id 的对象按数组下标对齐。
 *   · 纯字符串数组（known / rumor / unknown）是**整体替换**，必须整条给全。
 *   · 结构性键（id / minYear / tierMin / weight / base / mods / effects /
 *     flags / req / cost …）由引擎保护，写了 validate 直接报错。
 *
 * 英文写法：按英语重写，不是逐字翻。第二人称、现在时、短句；
 * 年份/机构名用真实英文（CNN、Wall Street Journal、Drudge Report）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "ln99_columbine",
        title: "Two students walk into the cafeteria with guns",
        body: "At a Colorado high school, two students kill twelve classmates and one teacher with handguns and homemade bombs, then shoot themselves in the library. The country can not accept it: the killers were not street toughs. They were local kids with clean records.\n" +
          "Candles burn in front of your district's high school. Parents block the school board's door with signs. The local station wants your line on live TV: do you control the guns?",
        brief: {
          lede: "Twelve kids are dead. The town waits for you to say whose fault it is and what the guns should answer to.",
          known: [
            "Both shooters were local students; the purchase channel is still under investigation.",
            "Parents' grief drowns every other issue here; school board meetings look like rallies.",
            "Pro-gun and gun-control camps both await your stance: one has money, the other has votes."
          ],
          rumor: [
            "Some say the boys planned for years and a teacher had seen it coming.",
            "Some say a county over is prepping an identical attack."
          ],
          unknown: [
            "Your gun stance will run in every election you fight from here on.",
            "Terms passed today may be reversed within a few years."
          ],
          terms: [
            { k: "school shooting", v: "Columbine — the name every later gun fight is argued under." }
          ]
        },
        choices: [
          {
            id: "control",
            text: "Ride the grief: push local gun control and school safety now",
            note: "Betting mourners turn into voters. Risk: the gun lobby puts you on its target list.",
            outcomes: {
              crit: { body: "Parents carry your proposal, candle in hand, into national coverage. Gun-shop owners curse you — but voters remember you stood in front of the children." },
              ok: { body: "The plan passes and the mood holds; you earn the reputation of someone who touches the third rail. Donors start counting how many votes you cost them." },
              meh: { body: "You filed the bill, the hearing hummed along, and nobody on either side counts you in." },
              fail: { body: "The bill dies. In gun country, every time they see you someone asks when you'll get around to kids and their phones." },
              critfail: { body: "Your proposal's donor list gets aired line by line, and the opposition's billboard reads: he made a business out of children's lives." }
            }
          },
          {
            id: "culture",
            text: "Skewer the culture instead: hold hearings on violent games and Hollywood",
            note: "Betting a culture war is easier than a gun war. Risk: everyone sees you walking around the question.",
            outcomes: {
              crit: { body: "You steer the argument to screen violence; churches and family voters nod along, and a national talk show actually invites you to the debate." },
              ok: { body: "The hearing happens and the headlines are yours, though everyone knows the real guns are still in real closets." },
              meh: { body: "Your topic stays fresh for three days. Reporters go back to asking about the guns." },
              fail: { body: "Four words lead the editorial page: he won't touch guns. Even your own people say this one was slippery." },
              critfail: { body: "A payment from a game publisher surfaces, and the camera turns on you: whose shot are you blocking?" }
            }
          },
          {
            id: "local",
            text: "Touch nothing about guns: fund counselors and alarm drills only",
            note: "Betting on clean hands. Risk: nobody remembers you did anything.",
            outcomes: {
              crit: { body: "Counselors and sirens land one by one; the principal thanks you at the memorial. Small — but nobody can find fault." },
              ok: { body: "You did the work, stood with no one, and no one can fault you either." },
              meh: { body: "A little budget passed. Nobody brings the subject up again." },
              fail: { body: "Somebody mutters: twelve lives bought two alarm boxes. It stays a mutter." },
              critfail: { body: "Your low profile gets cut into one line — he did nothing — and the line moves on." }
            }
          }
        ]
      },
      {
        id: "ln99_balkans",
        title: "Seventy-eight days over Belgrade — and a wrong bomb falls on the Chinese embassy",
        body: "To stop the expulsion of Kosovo's Albanians, NATO goes around the UN Security Council and bombs Yugoslavia for seventy-eight days. In early May missiles land on the Chinese embassy in Belgrade; three journalists die. Accident or intent — CNN feeds both answers into every living room at once.\n" +
          "Two camps in your district are waiting for you to pick: descendants of Balkan immigrants, and Chinese families who just lit candles outside the consulate.",
        brief: {
          lede: "A war without a UN mandate, a bombing nobody can fully explain — every local politician is being pushed to choose a side.",
          known: [
            "The bombing continues; three embassy staff are dead; the White House has apologized verbally.",
            "In the local Serbian community, relatives are still in Belgrade.",
            "Chinese residents hold rallies by the consulate; police are watching how you act."
          ],
          rumor: [
            "Some say the target coordinates came from an old map — a true accident.",
            "Some say two more weeks of bombing and Belgrade will fold."
          ],
          unknown: [
            "Ground troops will drag this air war into mud.",
            "What you say today can burn in directions you did not expect."
          ],
          terms: [
            { k: "NATO bombing of Yugoslavia", v: "Seventy-eight days of airstrikes without Security Council approval." }
          ]
        },
        choices: [
          {
            id: "support",
            text: "Stand with the White House: the bombing was necessary; the embassy was a tragedy of war",
            note: "Betting majority opinion is still yours. Risk: the official story collapses later, and you signed it.",
            outcomes: {
              crit: { body: "Your statement goes out from party headquarters to every state; standing straight at the wrong moment gets written in the book upstairs. Half the doors in Chinatown close to you for good." },
              ok: { body: "You joined the mainstream. TV-land introductions multiply; shopkeepers in the local Chinatown stop taking your handshake." },
              meh: { body: "You spoke, a bigger name drowned you out, and neither side bothers to count you." },
              fail: { body: "Anti-war feeling ferments in the neighborhood; your words for the bombing get printed on the back of march leaflets." },
              critfail: { body: "The accident story splits open under the evidence, and your old guarantee becomes the paper's weekly rerun." }
            }
          },
          {
            id: "condemn",
            text: "Demand an independent inquiry into the embassy strike, and apologize to Chinatown in person",
            note: "Betting on immigrant conscience votes. Risk: you get branded as feeling sorry for the other side.",
            outcomes: {
              crit: { body: "You speak for the three dead journalists; the community hangs silk banners in your office; for once the opinion pages treat you as a foreign-policy voice." },
              ok: { body: "Your call for an inquiry is heard, the community appreciates it, the establishment frowns." },
              meh: { body: "Your cry is buried under the bombing-continues headlines; only the Chinese-language weekly runs half a column." },
              fail: { body: "Who is he speaking for gets asked and asked; military and diplomatic people start routing around you." },
              critfail: { body: "Your community donations get papered across the street by opponents; a rescue speech turns into an unexplained ledger." }
            }
          },
          {
            id: "vigil",
            text: "Judge nothing: raise money for the refugees, keep one night's vigil for the dead",
            note: "Betting on staying clean. Risk: both sides file you under timid.",
            outcomes: {
              crit: { body: "At the vigil, speakers of two languages stand one row; the local front page runs the photo under the fold: at least he was there." },
              ok: { body: "Money raised, night kept. No one praises you; no one finds a fault either." },
              meh: { body: "You comforted both ends and landed on nobody's list." },
              fail: { body: "Some say you only dare light candles, never a stance." },
              critfail: { body: "Your neutrality passes in one sentence: he won't say which side. That's all it costs." }
            }
          }
        ]
      },
      {
        id: "ln99_wto",
        title: "A trade summit turns the whole city into a tear-gas battlefield",
        body: "Ministers from over a hundred countries arrive to loosen global trade; tens of thousands of protesters follow: unions, environmentalists, students, and a bloc of masked anarchists. Tear gas all week, the National Guard on the streets, the city under de facto lockdown.\n" +
          "The labor council president and the chamber of commerce chair call you the same evening. Both want you to pick a side on camera first.",
        brief: {
          lede: "Tear gas teaches every politician the same question: did globalization's gains reach the people on this street?",
          known: [
            "The talks have been stormed out of the building; the next round hangs.",
            "The union march was legal; the property damage gave police their excuse.",
            "Local merchants are screaming about losses and care which side is right."
          ],
          rumor: [
            "Some say federal agents are walking inside the protest lines.",
            "Some say the White House welcomes the chaos to move the story."
          ],
          unknown: [
            "This round scatters; the next one comes back in another form.",
            "The side you pick today will be pinned to you later."
          ],
          terms: [
            { k: "WTO ministerial", v: "The trade summit the streets shut down, talks unfinished." }
          ]
        },
        choices: [
          {
            id: "labor",
            text: "March legally with the unions: demand labor clauses in trade deals",
            note: "Betting the working-class anger is a real wave. Risk: you are tagged as selling out American jobs.",
            outcomes: {
              crit: { body: "You walk the march's flank without one reckless sentence and catch all of labor's respect; labor at the table stops sounding like a joke for the first time." },
              ok: { body: "Labor clauses enter your open letter and the unions file your name; the chamber moves you from the dinner list to the hallway." },
              meh: { body: "You showed up at both ends, said no clause, and nobody quotes you." },
              fail: { body: "Images of burning blocks drown the march; you get cut into the same story as the fire starters." },
              critfail: { body: "Your lobbying money sits beside incitement-to-riot on the front page; for the first time your machine fields refund requests." }
            }
          },
          {
            id: "order",
            text: "Condemn the destruction, back the city's return to order and police powers",
            note: "Betting most residents hate the streets more than the treaty. Risk: the left keeps a tab for ten years.",
            outcomes: {
              crit: { body: "You give merchants their give-us-back-our-streets line; the chamber and the police union thank you in print, and the party machine files you under steady." },
              ok: { body: "You stood for order; shopkeepers thank you, and the march boos once extra as it passes your office." },
              meh: { body: "Your condemnation was forgettable; two days later nobody recalls a word." },
              fail: { body: "Photos of heavy-handed policing hit the papers; a protest song writes in the man who backed the batons." },
              critfail: { body: "Your citizen patrol is filmed shoving demonstrators; the whole flare-up gets your name on it." }
            }
          },
          {
            id: "listen",
            text: "Promise nothing: sit through one workers' meeting and one merchants' meeting, take notes only",
            note: "Betting on making no mistakes. Risk: nobody treats you as one of theirs.",
            outcomes: {
              crit: { body: "You sat the full length of both meetings; papers on both sides ran he was listening — these days that counts as praise." },
              ok: { body: "You heard both sides' grief, promised nothing, offended no one." },
              meh: { body: "You took notes in the hall while the storm broke elsewhere." },
              fail: { body: "He listened and left becomes the complaint both sides share." },
              critfail: { body: "Your silence passes in one shrug: he won't touch either side. That is all." }
            }
          }
        ]
      },
      {
        id: "ln00_cole",
        title: "A small boat rams a destroyer in Aden harbor; seventeen sailors die",
        body: "While taking on fuel, a Navy destroyer is struck by a skiff packed with explosives. A hole opens in the hull; seventeen sailors die on the spot. The attack lands a week before the election, and who is answerable for our ships becomes debate-season fodder.\n" +
          "Your district hosts a Navy recruiting station. Two families just received telegram. The station wants your verdict: is this an act of war — and why are you the one talking tough?",
        brief: {
          lede: "Seventeen names run in every evening newscast's opener; the campaign season turns into a safety exam.",
          known: [
            "Two attackers, the ship refueling; the day's alert level is under review.",
            "Two federal intelligence agencies disagree about the leads.",
            "The local Navy association wants a memorial day — with you on the stage."
          ],
          rumor: [
            "Some say the warning came days earlier and nobody read it.",
            "Some say this was only the opening act; a bigger one follows."
          ],
          unknown: [
            "The response to this ship is already brewing somewhere else.",
            "Your tough words: courage, or funeral profiteering."
          ],
          terms: [
            { k: "USS Cole", v: "Suicide boat attack on a US destroyer in Aden." }
          ]
        },
        choices: [
          {
            id: "retaliate",
            text: "Talk hard: America will not be shot at while docked",
            note: "Betting security anxiety converts to support. Risk: the next miss lands on you.",
            outcomes: {
              crit: { body: "Your line gets read out loud in the veterans' club, and for the first time the military world remembers this local figure who does not weave." },
              ok: { body: "You went tough; military families nodded, and the ran put the quote in its election special." },
              meh: { body: "You spoke up, too many voices nationwide were harsher, and none of them were yours." },
              fail: { body: "The inquiry stalls, and someone asks back: the loudest shouter — what exactly was your job at the time?" },
              critfail: { body: "Another attempted attack hits the wire, and an editorial spends a full column on toughness that only speaks." }
            }
          },
          {
            id: "review",
            text: "Chase the review trail: whose desk did the warning land on",
            note: "Betting the public hates the failure more than the enemy. Risk: you look like you investigate your own side during mourning.",
            outcomes: {
              crit: { body: "You sort the procedure gaps one by one; opinion pages start calling you the man who reads the files, and two federal agencies add you to a watch list." },
              ok: { body: "You forced the question — small voice, firm stance; federal circles start saying the troublesome one." },
              meh: { body: "Your inquiry letters went out; the replies stay under review forever." },
              fail: { body: "Chasing bureaucratic fault during national mourning edits you into the man grabbing cameras off sailors' deaths." },
              critfail: { body: "Your questions touch a classified nerve; a lawyer's letter and a request to cooperate land in your office the same week." }
            }
          },
          {
            id: "vigil",
            text: "Strategy can wait: do the memorial and the seventeen families properly first",
            note: "Betting on clean hands. Risk: nobody recalls which side you chose.",
            outcomes: {
              crit: { body: "You read all seventeen names without one foreign-policy sentence. Military families trust this clumsy way." },
              ok: { body: "You walked the families through the whole protocol — dignified, quiet, no handle to grab." },
              meh: { body: "You showed up, helped with small things, and the next day's news changed topics." },
              fail: { body: "People whisper: at a time like this he at least came — but came is all he did." },
              critfail: { body: "Your low profile passes as he only attended, and nothing bigger splashes." }
            }
          }
        ]
      },
      {
        id: "ln00_hang",
        title: "Three days after the vote, the country still does not know its president",
        body: "Election night called too close to call — then it comes down to a few hundred votes. One state begins a manual recount, lawyers swarm overnight, and the nation stares at punch cards and butterfly ballots waiting for the Supreme Court's gavel.\n" +
          "Your party's headquarters wants you roaring for our side. The local editorial page asks whether you still trust the counting machines. Same price for both questions — if the other side wins, you live with the answer for four years.",
        brief: {
          lede: "The presidency is undetermined, but your side-taking is already written in both camps' ledgers.",
          known: [
            "The recount lawsuits are running; both sides have already declared victory.",
            "The party machine wants you onstage at the count-every-vote rally.",
            "The neighborhood has split: some already hold the other guy's win as illegitimate."
          ],
          rumor: [
            "Some say one county's ballot boxes will go missing before dawn.",
            "Some say whoever loses will not concede for long."
          ],
          unknown: [
            "The court will settle a president; it can not settle the arguing.",
            "You will spend four years defending the side you bet on."
          ],
          terms: [
            { k: "hanging chad", v: "The manual-recount dispute that climbed to the final court." }
          ]
        },
        choices: [
          {
            id: "partisan",
            text: "Bind your sign to the party: count every vote, not one county conceded",
            note: "Betting your side wins it all. Risk: if it loses, you are the agitator.",
            outcomes: {
              crit: { body: "The wave lands; your rally footage plays inside the victory thanks list, and party money now routes through your station first." },
              ok: { body: "You shouted hard. Winning credit may skip you, but the machine logged the effort." },
              meh: { body: "The stalemate grinds on; nobody airs your shouting, and both sides find it off-key." },
              fail: { body: "The day the gavel falls, the cap inciting refusal-to-concede does not come off your head." },
              critfail: { body: "Your citizen poll-watch teams draw complaints from both parties, and your name enters a federal hearing appendix." }
            }
          },
          {
            id: "institutions",
            text: "Call for the rules: count every ballot by law, accept whatever comes",
            note: "Betting people remember the calm one afterward. Risk: your own party names you traitor first.",
            outcomes: {
              crit: { body: "In those red-eyed days your by-the-law segment gets quoted by editorials on repeat; media circles open a file on you labeled sober." },
              ok: { body: "You argued for the process; neither side is pleased, but both admit you did not lose your head." },
              meh: { body: "Your voice nearly drowns in the roaring — at least you never shouted the wrong thing." },
              fail: { body: "After the loss your party decides you spoke for the other side at the crucial hour; the bench goes cold for you." },
              critfail: { body: "You are exiled from the party's inner circle; traitor to your own becomes the fixed clause when anyone introduces you." }
            }
          },
          {
            id: "staylocal",
            text: "Skip the recount fight: go home and run your constituent services",
            note: "Betting on clean hands. Risk: nobody recalls you ever had a position.",
            outcomes: {
              crit: { body: "While the storm raged you walked one doorpost at a time; whoever wins the presidency, district business never slipped." },
              ok: { body: "You stayed quiet; neither side bothers logging a man who said nothing." },
              meh: { body: "For those days you barely existed, and nobody missed you." },
              fail: { body: "Afterward someone asks where you went. Your answer is mediocre; so is the effect." },
              critfail: { body: "A bitter colleague tosses out playing dead; the words make no wave." }
            }
          }
        ]
      },
      {
        id: "ln01_anthrax",
        title: "Letters laced with anthrax spores reach newsrooms and the Senate",
        body: "Before the dust at the towers settles, envelopes carrying anthrax spores move through the mails to media offices and two senators: five dead, seventeen infected. The country learns to open every letter with shaking hands; sorting plants close; the Guard is called up.\n" +
          "Your district holds one mail hub, one hospital whose emergency plan is still held together with string, and residents asking whether packages are still safe to receive.",
        brief: {
          lede: "September's fear has not faded; October brings an enemy no eye can see.",
          known: [
            "Spores travel by letter; a senator is among the dead; the source is unknown.",
            "Hub workers are out sick en masse; the county hospital has no detector.",
            "Tonight the federal government may announce something scarier than the bacteria."
          ],
          rumor: [
            "Some say the strain came from a domestic military stockpile.",
            "Some say this theater is too well timed — ours was staged."
          ],
          unknown: [
            "The source hunt will run for years and never close.",
            "The emergency powers you back today become precedent."
          ],
          terms: [
            { k: "anthrax letters", v: "Spore-laced mail to media and senators; five dead." }
          ]
        },
        choices: [
          {
            id: "hardline",
            text: "Push full emergency response: mass screening, broader detention powers, a harsher bill",
            note: "Betting that frightened people trade freedom for comfort. Risk: the bill arrives at your door later.",
            outcomes: {
              crit: { body: "Your better-safe-than-sorry lands on the national pulse; Washington copies your plan into federal guidance, and you become the local model of the terror clauses." },
              ok: { body: "The emergency budget passes; federal voices thank you by name for acting fast; civil-rights lawyers start copying your name down." },
              meh: { body: "Your expansion bill sits in committee while panic has changed topics." },
              fail: { body: "The screening gear triggers an all-night false alarm, and word runs through the housing blocks: he scared this up." },
              critfail: { body: "The forced-testing rule roughs up your own shopkeepers; in the reckoning list for panic legislation your name sits at the top." }
            }
          },
          {
            id: "truth",
            text: "Force Washington to come clean: publish the real risk, run hospital drills locally",
            note: "Betting people do not resent the one who tells truth. Risk: panic gets billed to you anyway.",
            outcomes: {
              crit: { body: "Your facts-plus-drills plan gets the sorting hub reopened; reporters pass around the line: his words get sharper the messier it is." },
              ok: { body: "You sized the risk honestly and the drills hit the calendar; Washington calls you noisy, Main Street calls you plain-spoken." },
              meh: { body: "Your transparency plea pleases no one: Washington stays mute, the public keeps panicking." },
              fail: { body: "The risk assessment you cited gets disproven; his plain truth becomes the running gag's stock subject." },
              critfail: { body: "The internal bulletin you pulled from federal channels prints full-page, and the leak-trace list arrives the next morning." }
            }
          },
          {
            id: "prep",
            text: "No slogans: get postal workers their gear, map the distribution points",
            note: "Betting on clean hands. Risk: the work finishes and nobody knows whose hands did it.",
            outcomes: {
              crit: { body: "The hub becomes the county's tightest site; union and health board both nod. Neither knows your part in it." },
              ok: { body: "Masks and drop points in place; the community rides out the wave quietly." },
              meh: { body: "You did the invisible work, and the panic did not come your way." },
              fail: { body: "Some grumble the gear came late, then cannot quite recall whom to grumble at." },
              critfail: { body: "One false scare passes; we should have stockpiled drifts for two days and dissolves." }
            }
          },
          {
            /* #21 M4：总统视角支（situation_room） */
            id: "situation_room",
            text: "Take it on yourself: shut the national mail, open the vaccine reserve, and go on television to talk about the bacteria in person",
            note: "Betting that a frightened country will only look at one face. Risk: every failure in the response now belongs to that face.",
            outcomes: {
              crit: { body: "You finish the bacteria speech from the Oval Office; that night the postal lines reopen and every state falls in behind the federal guidance. Six months on, at the hearing, your name appears on the same page as the words it did not spiral." },
              ok: { body: "The national biodefense budget doubles from that night. You become the president who handled anthrax, and history packs those years tight." },
              meh: { body: "Two days off the mail, and the loss estimates reach your desk; you change the order to phased restoration. Nothing happens, and nobody remembers that you decided anything." },
              fail: { body: "Another spore letter arrives on a route the federal government had assured was controlled. Reporters stop asking where the bacteria came from and start asking when the president knew." },
              critfail: { body: "Two infections follow a federal announcement that risk was contained. Your briefings are read back sentence by sentence, and Congress starts discussing how to remove a government that is contagious." }
            }
          }
        ]
      },
      {
        id: "ln02_enron",
        title: "The energy giant files the biggest bankruptcy — and drags the pensions in",
        body: "Voted America's most innovative company six years running, the energy trader files for the largest bankruptcy in history; its century-old auditor collapses with it. Thousands of employees could not sell their own stock — their retirement accounts locked until the day before.\n" +
          "The same California-style power deregulation runs in your sister states; the company's lobbyist testified in your committee last quarter. Retirees stop by weekly with one question: who reads our accounts?",
        brief: {
          lede: "When a giant's ledger opens, the dinner-guest list gets opened too.",
          known: [
            "Pensions sit inside the lockup window; nobody could sell at the top.",
            "Local retirees show up at your office weekly demanding an answer.",
            "Its traded power model still runs in three states."
          ],
          rumor: [
            "Some say the auditor burned a whole file cabinet overnight.",
            "Some say Congress had the numbers early and only waited for the settlement."
          ],
          unknown: [
            "The new disclosure rules written after this will define corporate accounts for a decade.",
            "Cutting, chasing or closing quiet — all of it gets logged."
          ],
          terms: [
            { k: "401(k)", v: "Employer retirement account, often loaded with the employer's own stock." }
          ]
        },
        choices: [
          {
            id: "hearings",
            text: "Follow the anger: hold local hearings, subpoena the power traders",
            note: "Betting fury is the safest vote. Risk: donors re-route their money to your opponent.",
            outcomes: {
              crit: { body: "Your hearing cracks the three-state trading model; national investigative reporters list you as the one who fired the local shot first." },
              ok: { body: "The hearing runs, testimony clashes, your accountability stands — and half your gala invitations quietly stop coming." },
              meh: { body: "The hearing becomes a blame-swapping fair; no new fact surfaces." },
              fail: { body: "The firm you subpoenaed pulls its charity funding overnight, and the nonprofits come to bill you first." },
              critfail: { body: "Your hearing gets cast as the case study in wrecking investor confidence; the energy lobby appears, collectively, behind your opponent." }
            }
          },
          {
            id: "settle",
            text: "Close it quiet: lawyers and the trustee to the table first, claw back part of the pensions",
            note: "Betting retirees vote on what they recovered, not how. Risk: back-room gets painted on your wall.",
            outcomes: {
              crit: { body: "Local claimants sit at the head of the settlement list; the trustee's lawyer says under his breath the man knows how to split money on a sinking ship. The retirees' roll remembers you." },
              ok: { body: "You win back a piece; when the checks land, nobody keeps auditing the route." },
              meh: { body: "The negotiation drags; your work buys one symbolic trickle." },
              fail: { body: "The settlement dies, and the beneficiaries start asking whose favor you were carrying." },
              critfail: { body: "Your mail with the law firm prints in full; from now on two words follow you: back room." }
            }
          },
          {
            id: "audit",
            text: "Audit only your own house: check the district fund's holdings, say nothing else",
            note: "Betting on clean hands. Risk: the busywork goes unnoticed.",
            outcomes: {
              crit: { body: "Your holdings check out spotless; the moderator repeats one of your lines — my own books first — as a standing quote." },
              ok: { body: "The books are clean. You dodged every pit that had people jumping into it." },
              meh: { body: "You finished the check, nobody asked the result, the storm passed elsewhere." },
              fail: { body: "Of course his own audit finds nothing — one mutter, no wave." },
              critfail: { body: "Your silence passes in one shrug: he won't touch the big ledger." }
            }
          }
        ]
      },
      {
        id: "ln02_midterms",
        title: "The first midterms after the war — everyone wants to borrow the flag",
        body: "Two things remade this midterm: the rubble and the war. The sitting president rides historic approval; a say-yes-to-the-troops wave runs into every local race, and challengers rehearse before daring one contrary sentence. The economy, meanwhile, is quietly going soft.\n" +
          "A party envelope arrives in your name: take the national machine's help. This year the flag works; almost no one dares call it in the way.",
        brief: {
          lede: "A tailwind year: nearly everyone wins a little. The question is how much you borrow.",
          known: [
            "Wartime midterms have always leaned to the president's party.",
            "The local support-the-troops committee invites you on its stage.",
            "Your opponent has pinned the flag on first."
          ],
          rumor: [
            "Some say the tide turns the day casualty lists run long.",
            "Some say money is flowing to the other side; nobody dares admit it."
          ],
          unknown: [
            "Borrowed halos get paid back, usually with interest.",
            "The seat you take on this wave may not be yours next time."
          ],
          terms: [
            { k: "midterms", v: "Congress up for election in year two of a president's term." }
          ]
        },
        choices: [
          {
            id: "wave",
            text: "Stand beside the flag: take the national endorsement, fight the whole race on terror",
            note: "Betting the tailwind reaches local ballots. Risk: when it shifts, you stand out front.",
            outcomes: {
              crit: { body: "Your name rolls at the end of national ads, the machine redlines for you — this year, if you avoid mistakes, the votes walk in by themselves." },
              ok: { body: "You rode the wave home, won what was winnable, and the party list moves you up a notch." },
              meh: { body: "Endorsement given, machine turning; you gained nothing and lost nothing." },
              fail: { body: "You swam with the tide and gained an inch — losing, for at least this year, nothing at all." },
              critfail: { body: "The wind drops one notch before the line; you simply failed to borrow it. The books stay flat." }
            }
          },
          {
            id: "bread",
            text: "Swim against the wave: talk medicine prices and layoff letters",
            note: "Betting wallets outlast the noise. Risk: you look out of step all year.",
            outcomes: {
              crit: { body: "You nail the pharmacy bill and the layoff letter to one board; inside the flag's roar, a small pocket of kitchen-table fire belongs to your name." },
              ok: { body: "Your quiet livelihood pitch never misses a beat; base voters remember you did not join the shouting." },
              meh: { body: "The wave covers your issue; the voice held, nobody heard it." },
              fail: { body: "Voters this year want only flags; your wallet argument whiffs — but keeps you clean." },
              critfail: { body: "The wave swallows every other sound; you just ran an empty errand." }
            }
          },
          {
            id: "ownrace",
            text: "Borrow nothing national: run only on water bills and the school board",
            note: "Betting on clean hands. Risk: every win and loss is purely yours.",
            outcomes: {
              crit: { body: "Two small local matters closed out; the neighborhood bank holds firm — high wind or low, none of it touches your district." },
              ok: { body: "You swept your own lane clean: borrowed no light, owe no debt." },
              meh: { body: "A quiet, complete local race; you won the three or four issues that mattered." },
              fail: { body: "Inside a national wave nobody watches local; you were only passing through." },
              critfail: { body: "No borrowed light, nothing done wrong — the page stays clean." }
            }
          }
        ]
      }
    ],

    /* 世界线英文层：只覆盖 brief / outlets（pressure 是数值平衡，不碰）。
       outlets 逐年回译成当年真实存在的美国媒体，条数与中文侧严格一致。 */
    worldline: {
      brief: {
        "1999": "The tail end of the \"best of times\": prosperity makes everyone loose, then gunfire in a cafeteria, bombs falling overseas and protesters in a rainy city take turns shaking them awake. Nobody believes the good years have an end.",
        "2000": "A president decided by a few hundred votes on election night. The quiet distrust this country had been carrying about itself is finally laid on the table where everyone can see it.",
        "2001": "September's smoke is barely cleared when a whole year's mood falls from comfortable fatigue into grief and anger. From here on, safety outweighs freedom as the everyday accent.",
        "2002": "Fear becomes a way of life: people queue up to hand over rights to anyone who promises safety, and they grow suspicious of anyone unwilling to say that everything is fine."
      },
      outlets: {
        "1999": ["The New York Times", "The Wall Street Journal", "USA Today", "CNN", "Drudge Report"],
        "2000": ["The New York Times", "The Washington Post", "USA Today", "CNN", "Fox News"],
        "2001": ["The New York Times", "The Wall Street Journal", "USA Today", "CNN", "NPR"],
        "2002": ["The New York Times", "USA Today", "CNN", "Fox News", "Slate"]
      }
    }
  }
});
