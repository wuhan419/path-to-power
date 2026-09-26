/* ============================================================================
 * CONTENT · i18n/en/events/94-foreign-2.js
 * 中文文件 content/events/94-foreign-2.js 的英文覆盖层（外交线二）。
 * 契约见 docs/I18N.md：原文件不动，只放要覆盖的字段；事件/选项按 id 定位；
 * 结构性键（id/era/base/mods/effects/flags/cost…）受保护，一律不写。
 * 英文按外交题材重写：第二人称、现在时、短句；机构/头衔用真实英文
 * （State Department、Federal Election Commission、counterintelligence）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "for2_trade_trip",
        title: "You're on the state trade mission's roster — dead last",
        body: "The state trade mission — a government-backed trip that opens doors for home-country firms — leaves next week, and your name is on it: last, tagged on after you ran errands for one company. Bags, sign-ins and errands fall to you. Seated dinners have a pecking order; the lobby and the late bus are where cards change hands. They say the embassy's commercial attaché keeps a goodwill purchasing budget he hands out on a whim. The small talk you think is nothing may already sit filed in another briefing.",
        choices: [
          {
            id: "work_room",
            text: "Work the lobby: trade every card, learn every name",
            note: "No naps, no sightseeing. You don't reach the head table by sitting at it — you get there when they recall you handing them the file.",
            outcomes: {
              crit: { body: "At the last-night reception the ambassador actually says your name — three days of passing files for everyone did that. In the group photo you're at the edge, but you're in it. On the flight home, half the cabin has your number." },
              ok: { body: "You trade forty-plus cards and bank two rows of names. Back home, three of the firms start inviting you to their quarterly mixers." },
              meh: { body: "A pocketful of cards, a handful of names held. The lobby air conditioning runs cold and your shoes don't fit." },
              fail: { body: "You introduce an executive to the wrong attaché — the deal dies, and both sides assume you don't know the etiquette." },
              critfail: { body: "A joke of yours at the reception gets mangled in translation and travels home through the industry circuit: the young man was rude over there." }
            }
          },
          {
            id: "do_homework",
            text: "Run errands by day, study by night: learn every member's business and asks",
            note: "No spotlight. Become the best-informed person on the trip. Back home, you decide who can help whom.",
            outcomes: {
              crit: { body: "The private list you keep — who wants what, who has what — ends up on the mission chief's desk at home. Three deals run through your hands in six months; both sides of each thank you." },
              ok: { body: "You become the one people ask for the lay of the land. The name isn't worth much, but it keeps." },
              meh: { body: "You did the homework, but the logic of the deals runs deeper than the spreadsheets. You come home half a notebook full." },
              fail: { body: "You study files at night and fall asleep running errands by day. A sign-in sheet misses a page; the chief remembers your yawn." },
              critfail: { body: "Somehow your list circulates through the group — and an executive you quietly marked difficult to work with reads his own line." }
            }
          },
          {
            id: "quiet_trip",
            text: "Just get the job done: no scene-making, no trouble",
            note: "No bags lost, no one missed at sign-in. An uneventful trip is still a line on a résumé — no one will recall it.",
            outcomes: {
              crit: { body: "You run errands flawlessly, and in the wrap-up the chief thanks the logistics folks by happenstance. One line, but in front of everyone." },
              ok: { body: "The trip ends smoothly. You glance at a couple of the city's landmarks and take a few photos." },
              meh: { body: "You finish two seasons of TV in your hotel room. The jet lag hasn't cleared before the plane lands going home." },
              fail: { body: "You were too quiet. Back home someone asks who was on the mission, and no one recalls you went." },
              critfail: { body: "A case of samples in your care goes missing on a connection. Not your fault — but the case was under your name." }
            }
          }
        ]
      },

      {
        id: "for2_lobbyist_foreign",
        title: "Someone offers to route foreign money into your campaign — through legal channels",
        body: "Your campaign is under two months from broke, and a fixer brought by an old acquaintance offers a totally legal gift: drawn by a local company you've never heard of, for double what's on your books. U.S. law bars foreign governments from funding campaigns — but a U.S. subsidiary or a 'local partner' keeps the paper clean. They say the company registered last year, at a coworking-suite address. What this money carries isn't interest — it's a ledger.",
        choices: [
          {
            id: "take_money",
            text: "Take it: a lawyer cleared the paperwork, the drawer is clean",
            note: "The money is real, the papers are real. What you owe isn't cash — it's the fact that they know you took it. That beats any IOU.",
            outcomes: {
              crit: { body: "The money lands, the campaign rises from the dead, and on election night you thank no one by name. The fixer sends congratulations — still friends. You burn every sticky note. The ledger is theirs; the road is yours." },
              ok: { body: "The cash comes in and the campaign clears its hardest stretch. Your accountant doesn't ask; you don't mention it." },
              meh: { body: "The money arrives, but they start forwarding background material \u201Cfor reference.\u201D You read one brief and regret it." },
              fail: { body: "You're still short — the money comes slower than promised, the conditions earlier. You learn your place in the negotiation." },
              critfail: { body: "Three months after the election a paper follows the local company to an overseas parent. The headline asks one question: how far did this money travel. A Federal Election Commission letter follows." }
            }
          },
          {
            id: "lawyer_route",
            text: "Hire an independent lawyer to trace the source before you decide",
            note: "You trade time and legal fees for certainty. Traced fully you may get nothing — or you may dodge a land mine.",
            outcomes: {
              crit: { body: "Three weeks in, the lawyer writes it up like a detective novel: the money must pass two local-partner hops to reach the surface. You bounce the check and quietly keep one copy of the report. It saves you twice." },
              ok: { body: "The first layer is clean; the second can't be traced. You take only the small verifiable slice and return the bulk. The fixer smiles — what a shame." },
              meh: { body: "The legal fees are spent, the verdict unreadable. You return the money and your books are leaner for it." },
              fail: { body: "Word of the probe leaks. The other side calls you ungrateful; your opponent collects the friendship meant for you." },
              critfail: { body: "Someone screenshots the lawyer's letter. The headline reads: candidate probed over foreign money. The probe is about the cash; the headline leaves out the subject." }
            }
          },
          {
            id: "refuse_report",
            text: "Refuse to their face and report it to the authorities",
            note: "Clean — and a statement. The intelligence side will owe you one. But now you're on lists, on both sides.",
            outcomes: {
              crit: { body: "You compile the documents and the call notes and turn them in. Three months later a counterintelligence agent asks you for coffee: thanks — and if you ever meet another one like him, call this number. You keep that card for years." },
              ok: { body: "You refuse and you report. No one hands you a medal, but no one can touch you on this either." },
              meh: { body: "Your report disappears into a drawer. The fixer changes numbers and keeps working the circuit — just not you." },
              fail: { body: "Your refusal circulates as being hard to work with. Certain money doors close without a sound." },
              critfail: { body: "The person you reported to — you learn later — was in the same crew. Your name moves from the witness line onto a different sheet." }
            }
          }
        ]
      },

      {
        id: "for2_spy_contact",
        title: "A foreign embassy's cultural attaché takes an unusual interest in you",
        body: "The cultural attaché — an embassy officer for cultural exchange, under diplomatic immunity — has bumped into you four times in three months, and today he sits beside you again: the one book you needed in hand, a dinner invite to follow. He never asks for secrets; he talks people and schedules and always leaves a small gift. Old diplomatic joke: nine and a half in ten cultural attachés are intelligence. He remembers your daughter's piano-contest placing — you mentioned it to your wife once, by phone. And whoever watches him for counterintelligence now sees you at his table too.",
        choices: [
          {
            id: "keep_dining",
            text: "Keep dining: he's my window onto that country",
            note: "His intel is usually true, his contacts real. But a third party keeps notes at every meal — and the note-taker isn't at the table.",
            outcomes: {
              crit: { body: "You run the relationship as a window: seven in ten of his tips are solid, and everything you feed him is already in the papers. In six months you know that country better than the unclassified brief — and both sides think they won." },
              ok: { body: "You eat, you talk, you accept a few inexpensive gifts. He's asked nothing out of line, you've said nothing out of line — so far." },
              meh: { body: "He starts asking small favors: introduce someone, pass an industry letter. Each one looks harmless alone." },
              fail: { body: "The local paper's society page runs a photo of you two, captioned lightly: our lawmaker's cultural friendship with a foreign envoy. Light as it is, the clip gets filed." },
              critfail: { body: "The three dates he \u201Chappened\u201D to ask about all go wrong within two weeks. A counterintelligence agent sits across from you in your office and asks one question: who did you tell. You start retracing every meal, and it gets colder." }
            }
          },
          {
            id: "call_fbi",
            text: "Report it: tell counterintelligence about every contact",
            note: "Turn the dark contact into a daylight one. The intelligence side will credit your candor — the cost is homework before and after every meal.",
            outcomes: {
              crit: { body: "The agent hears your rundown and laughs for the first time: you're more interesting than the one in our file. You strike a deal — keep dining, talk for fifteen minutes after each. You become a trusted name on this line. Both sides believe it; that's the beauty." },
              ok: { body: "You report. The agent takes notes and says keep in touch. Every chance meeting now earns you one more email." },
              meh: { body: "You file the report; they say noted. No follow-up, no guidance. You have to gauge the line yourself." },
              fail: { body: "Reporting is more cumbersome than you thought, and the attaché notices your hesitation. He smiles and cuts back the chance meetings — the useful tips go with them." },
              critfail: { body: "You report too often, too finely. In the counterintelligence file you drift from cooperator to frequent contact. The file has its own grammar. You can't read it; others can." }
            }
          },
          {
            id: "cool_off",
            text: "Withdraw politely: a nod at events, never free for private dinners",
            note: "The smoothest path. Others will give him what he wants; all you lose is the window.",
            outcomes: {
              crit: { body: "Over three months you set the distance at the polite mark: greetings at openings, all private dinners declined. He moves on to a more interesting person; your name slides from his routine report down to a footnote." },
              ok: { body: "You drift apart naturally. He seems to understand, and seems not to mind." },
              meh: { body: "After three declines he stops inviting. Now and then you think of that box of tea — and the names he kept." },
              fail: { body: "Your avoidance reads as unfriendly. The next time you lead a delegation out, that embassy drops your reception one grade." },
              critfail: { body: "Before he leaves, he says a loud goodbye at a public reception, warm as a lifelong friend. Half the room clocks that you're close — and every time you explain, it sounds more like explaining." }
            }
          }
        ]
      },

      {
        id: "for2_refugee_vote",
        title: "A refugee resettlement lands in your district",
        body: "The feds have assigned the next refugee wave to your district: eighty to one hundred fifty people, placed through the federal-and-voluntary-agency resettlement system. The agency wants you at the welcome — one sentence from you fills a winter's coat drive. Your voters are already split: half welcome, half who asked us. The number isn't fixed, they say — signal a hardship to the county and some get moved. What decides the votes is the issue, not the real headcount.",
        choices: [
          {
            id: "welcome_loud",
            text: "Take the welcome-rally podium and say it all",
            note: "The humanitarian high ground and the news columns are real; so is the opponents' list — and they remember longer.",
            outcomes: {
              crit: { body: "Your words that night are quoted in two papers and carried by a station: we measure a community by how it opens its door. Three months later the transition housing posts the state's best jobs number — the figures go to your district, the story to you." },
              ok: { body: "The rally goes well, the coats come in, the kids enroll. Your backers are firmer; your opponents start to organize." },
              meh: { body: "You spoke, you clapped, you helped. Small column inches, real goodwill." },
              fail: { body: "Two weeks later a minor incident hits the transition home — nothing to do with locals — but the message board nails it to your podium." },
              critfail: { body: "Your \u201Cwe welcome them\u201D gets cut into an opponent's ad, scored to old footage of district school cuts. In the next poll, culture is your weakest row." }
            }
          },
          {
            id: "quiet_limit",
            text: "Work the process: petition to split the intake over strained resources",
            note: "No slogans; let the paperwork talk. Opponents are pleased, the church and the agency read it clearly — they track people by name lists.",
            outcomes: {
              crit: { body: "Your letter is airtight: not opposition, a request to assess capacity. The number falls three-tenths; each side gets a version to tell its people — and in neither are you the lead." },
              ok: { body: "Half the split is approved. The message board quiets; the church liaison puts on a more official face." },
              meh: { body: "The memo circulates six weeks and the moment it clears the families have arrived. You finished the process and changed nothing — including your position." },
              fail: { body: "The petition is denied. Both sides get their story: opponents say you tried, backers get a copy of your memo." },
              critfail: { body: "The memo leaks to the press, headlined: our lawmaker quietly blocked refugees. You call it process — but process never makes the front page." }
            }
          },
          {
            id: "volunteer_quiet",
            text: "Skip the podium, haul coats: show up as a volunteer",
            note: "Quiet politics: the people on the ground know you, the papers don't. That kind of credit books on the deepest layer.",
            outcomes: {
              crit: { body: "You haul boxes all afternoon and teach a few kids to shoot hoops. No speech, no photos — three months later the site's parents crowd into your constituent-service day. That's harder currency than any endorsement." },
              ok: { body: "You went, you worked, you shook hands. In the church newsletter your name sits mid-list among the volunteers — just right." },
              meh: { body: "You help for half a day. Some recognize you, some don't. The world doesn't shift." },
              fail: { body: "Someone still photographs you moving boxes — the angle makes it look like an inspection. You want to explain, and sense that explaining is worse." },
              critfail: { body: "During the half-day you're there, a child goes missing — found later in the gym. Both sides take what they need from your presence: one says you were there and it didn't help, one asks why you were there." }
            }
          }
        ]
      },

      {
        id: "for2_summit_invite",
        title: "An international forum invites you to speak",
        body: "A prestigious international forum asks you to speak — remarks there are public by default, and 'say a few words on any topic' means anything can get on the record. Your name sits between senators and governors; below the stage are press, ambassadors and people from several think tanks. Your comms lead prepped two drafts: all praise, or sharp. Word is a certain delegation plans an informal contact — diplomat's code for a meeting off the schedule — and you're on the list. In the audience, some wait for you to slip; some wait to hand over a partnership.",
        choices: [
          {
            id: "safe_speech",
            text: "Read the safe script: praise the host, zero opinions",
            note: "No one will recall what you said — that's the point of a safe script and its price. The big names conclude: steady, but not worth more talk.",
            outcomes: {
              crit: { body: "You read it handsomely and two ambassadors approach at the break — precisely because you spent no one's position on stage, so everyone figures you're safe to talk to." },
              ok: { body: "The remarks close smoothly to polite applause. Your name sits on page two of the attendee list." },
              meh: { body: "The moderator catches you with one unprepared question, and you answer like a weather report." },
              fail: { body: "Remarks so safe they're soporific — over lunch a think-tank table jokes in public: today's highlight was dessert." },
              critfail: { body: "In what you thought was the safest line sits a wish for peace on a certain border — those words carry opposite political senses in two languages of that region. You step on a line you didn't know existed." }
            }
          },
          {
            id: "sharp_speech",
            text: "Give the sharp version: put your view out there",
            note: "Sharp remarks get cut three ways by three kinds of people. At least one version makes the news — which one is up to editors you can't control.",
            outcomes: {
              crit: { body: "Your ad-libbed closing becomes the most-quoted line of the whole forum, picked up that night by three international outlets. On the flight home, the ambassador there takes the seat beside you: the President would like to hear this thinking at the right time." },
              ok: { body: "The speech bites without an incident. In the corridor after the breakout sessions, two people catch up with notebooks out." },
              meh: { body: "You delivered it, but the others on your panel were more famous. Your edge lands in the \u201Cother remarks, summarized\u201D column." },
              fail: { body: "One word choice draws an on-the-spot protest from a delegation, and the room freezes for thirty seconds. The hosts smooth it over; the tape doesn't." },
              critfail: { body: "Your ad-lib honest remark gets two headlines in forty-eight hours, from two countries' press: interference and weakness. A State Department note is copied to you. The clip you cut takes you years to finish watching." }
            }
          },
          {
            id: "backchannel",
            text: "Keep remarks short; spend the effort on the informal contact",
            note: "The real table isn't on the stage. One meeting off the schedule can buy a working channel — and a record only a few of you share.",
            outcomes: {
              crit: { body: "Forty minutes on the top floor of the hotel yields something real: a hotline straight to their cabinet office, routed through yours. You're anonymous on stage and high on an invisible list." },
              ok: { body: "The meeting is frank and productive: they agree to examine the cases you raise, you agree to keep the line open. In diplomatic language, that counts as a result." },
              meh: { body: "The meeting happens, tea is drunk, positions restated. You learn at least that their hand is weaker than rumored." },
              fail: { body: "They treat you as a messenger, and you decline. Afterward, papers from their side read half a degree colder through official channels." },
              critfail: { body: "The minutes of that meeting — not your side's — surface three months later in a leaked file. You have no alibi of absence, because you were there." }
            }
          }
        ]
      }
    ]
  }
});
