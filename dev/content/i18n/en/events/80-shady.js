/* ============================================================================
 * CONTENT · i18n/en/events/80-shady.js
 * 中文文件 content/events/80-shady.js 的英文覆盖层（灰产线，7 张卡）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices / terms 里带 id 的按 id 对齐，不带 id 的对象按数组下标对齐。
 *   · 纯字符串数组（known / rumor / unknown / texts）是**整体替换**，必须整条给全，
 *     少给一条就少一条 —— 不合并。
 *   · 结构性键（id / era / minYear / tierMin / weight / base / mods / effects /
 *     flags / req / cost …）由引擎保护，写了也不会生效，validate 会直接报错。
 *   · 缺译的字段自动留中文，所以可以一张一张补。
 *
 * 英文写法：这条线是美式政治惊悚片的行话——leverage、the book、get-out、
 * hush money。按语气重写，不逐字翻；第二人称、现在时、短句。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      /* ---------------------------------------------------------------- 1 */
      {
        id: "shady_oneshot",
        title: "You find a fast score that only ever works once",
        body: "Two afternoons of asking around tells you everything: every kid in this town who wants out is missing the same thing, and nobody sells it. You found a source.\n" +
          "The catch: a run like this works once. Do it twice and you stop being the guy who happened to know a guy — you become the guy who does this.",
        brief: {
          lede: "There is a road only one person can walk, and only once. After that, you take a different street.",
          known: [
            "You know which schools have kids whose parents pay without asking — and who holds the product.",
            "You have one afternoon, a borrowed car, and stake money that isn't really yours.",
            "The middleman will move product for you, cash first. He doesn't trust new faces.",
            "Around here, few people recognize your face yet. That is your only edge."
          ],
          rumor: [
            "Some say a kid ran this exact play last month. The school kept his name.",
            "Some say the money isn't in the product. It's in knowing who needs it."
          ],
          unknown: [
            "The day somebody starts asking how you pull this off.",
            "Whether the road ends at a drink or a subpoena."
          ],
          terms: [
            { k: "One-time score", v: "Once, clean, no traces. Twice, it stops working." },
            { k: "Stake", v: "You front the cash. Gray business has no invoices, no terms." }
          ]
        },
        choices: [
          {
            id: "push",
            text: "Run the whole score before anyone else wakes up — every dollar you have",
            outcomes: {
              crit: { body: "One afternoon, triple your money back. On the way out you pocket the receipt with the students' names on it — not to use. Just in case." },
              ok: { body: "The cash lands — more than you figured. Your hands shake while you count. Not from fear. From speed." },
              meh: { body: "Half the product moved. The other half is on your hands. No money lost, no sleep either." },
              fail: { body: "One guy took the goods, skipped the payment, and walked off with your name. Your stake went under." },
              critfail: { body: "Campus security logged the plates. Nobody charged you — but the car is registered to your brother. The product and the money are gone together." }
            }
          },
          {
            id: "small",
            text: "Run it small. Test the water first",
            outcomes: {
              crit: { body: "Small batches, every one clean. You didn't become that guy — just a guy with connections." },
              ok: { body: "You made a little. Learned more than you made. You know who to find next time." },
              meh: { body: "Three days of running, beer money out of it. But now you know where the door is." },
              fail: { body: "Nobody wants the small stuff. Rich kids won't bother; the poor kids still can't pay." },
              critfail: { body: "You picked the wrong guy. He took your sample, copied the whole play, and moved faster than you did." }
            }
          },
          {
            id: "pass",
            text: "Skip it. Get an honest job",
            outcomes: {
              crit: { body: "By summer's end you have honest money and a working map of the town — which church has the fattest coffers, which store pays whom. All of it stores up." },
              ok: { body: "Four weeks' pay, not a cent short. No fast money — but no debts to anyone either." },
              meh: { body: "The foreman sat on your paycheck for two weeks. Lesson one: honest men get stiffed too." },
              fail: { body: "A month of work. Your body wrecked, your pocket nearly empty." },
              critfail: { body: "You hurt your hand on the line. You pay the doctor yourself. The foreman says that was your fault." }
            }
          }
        ]
      },

      /* ---------------------------------------------------------------- 2 */
      {
        id: "shady_shark",
        title: "You borrow from the money man in the neighborhood",
        body: "There's a guy on your block who deals in leather goods and, quietly, in loans. No contracts — around here a man's name and his face are the paperwork, and fewer men run than sign.\n" +
          "You need cash, so you go to him. He doesn't look up. Two questions: how much, when do I see it back. There is no third question, and nothing polite fits between the first two.",
        brief: {
          lede: "The interest is spoken, not written. That's why the moment you say yes is the expensive part.",
          known: [
            "He only lends inside the neighborhood, and he never hustles a friend of the family.",
            "His rate crushes the bank's — but he's faster, and far quieter.",
            "His memory is terrifying. He can tell you who paid what, on which afternoon, ten years back.",
            "He also knows people you don't. That's the other, more useful service."
          ],
          rumor: [
            "Some say the money isn't his. A layer above him is the one actually lending.",
            "Borrowing from him is bowing your head in front of a man who never forgets."
          ],
          unknown: [
            "Who he really holds this book for.",
            "If you can't pay — does he come for you first, or for your brother?"
          ],
          terms: [
            { k: "Short money", v: "Weeks, not months. The shorter the run, the higher the take." },
            { k: "Face collateral", v: "No property. One person willing to vouch for your name." }
          ]
        },
        choices: [
          {
            id: "borrow_big",
            text: "Borrow big — enough to carry the whole year",
            outcomes: {
              crit: { body: "He slides the cash over, then adds a fifth on top: \"I've had my eye on you a long time. You're worth the extra.\" First time you learn that being trusted has a price." },
              ok: { body: "Money in hand, repayment set for fall. A handshake, and that's the contract." },
              meh: { body: "You get the cash, minus a fifth. \"You're not worth that number yet.\" That sentence stays with you a long time." },
              fail: { body: "He declines with a smile: \"I lend to sure things. You don't look like one.\" You leave his shop feeling two inches shorter." },
              critfail: { body: "He lends — thumbprint on the receipt, witnesses in the room. Now you're the man on this street with a book entry against his name." }
            }
          },
          {
            id: "borrow_small",
            text: "Borrow just the change you need. Same-day, clean",
            outcomes: {
              crit: { body: "Paid back the same day, with something extra on top. He nods: \"A man of rules.\" In this neighborhood, three words like that are currency." },
              ok: { body: "You borrow, you repay, nobody says much. You have a first line in his book." },
              meh: { body: "Two sleepless nights scraping the money together. You paid him back. You came apart." },
              fail: { body: "You're a day late. He says nothing. He changes the number." },
              critfail: { body: "The cash didn't come and you asked for air. He gave it — and the whole neighborhood heard about it." }
            }
          },
          {
            id: "refuse",
            text: "Don't borrow. Slower is safer",
            outcomes: {
              crit: { body: "You walk out of that shop empty-handed, and lighter for it. Later you learn: had you taken the money, three months on you'd have done something you wouldn't recognize as yourself." },
              ok: { body: "You didn't borrow. The months are tight, and every dollar is yours." },
              meh: { body: "Short on cash, you skipped the thing you meant to do. No disaster. Just another door closing by itself." },
              fail: { body: "Being broke botched a small thing, and somebody said the word \"poor\" to your face." },
              critfail: { body: "The money you didn't have cost you the chance you should have taken. You sit in the empty apartment and seriously consider that loan for the first time." }
            }
          }
        ]
      },

      /* ---------------------------------------------------------------- 3 */
      {
        id: "shady_file",
        title: "Somebody presses a file into your hands that could end a man",
        body: "A man presses a manila envelope into your hands and walks. No name. Inside: a photocopied personnel record. An official now in office signed one document, three years ago,\n" +
          "that would keep him, his family, and the two men who bankrolled him awake at night.\n" +
          "You are holding the thing that makes one man do what you say.",
        brief: {
          lede: "Leverage isn't a weapon. It's a loan — you're holding his safety now, and interest comes due later.",
          known: [
            "The record is real. You can read the file numbers and the signature block. It was never meant to leave that vault.",
            "The man in it still holds office — and he sits exactly on the door you need opened.",
            "The courier left no name. He wants this used, not filed.",
            "Holding it isn't the crime. Using it is. Whether you get caught depends on how you spend it."
          ],
          rumor: [
            "Some say a second copy exists, in a drawer at a newspaper.",
            "Some say he didn't sign for himself — he took the fall for someone else."
          ],
          unknown: [
            "What the courier expects to get out of this.",
            "If you do nothing: whether the paper is worth anything in five years."
          ],
          terms: [
            { k: "Leverage", v: "What keeps a man off balance. Cashable only for silence." },
            { k: "Shelf life", v: "Leverage rides on the man. He loses office, or dies, and the paper goes blank." }
          ]
        },
        choices: [
          {
            id: "keep",
            text: "In the drawer. Do nothing. Just remember it",
            outcomes: {
              crit: { body: "You put the envelope at the bottom of the drawer and spend three weeks working out why it landed in your hands. By the time you know, you read this city better than before." },
              ok: { body: "It's away. Now and then you think about it. You never open it a second time." },
              meh: { body: "You hide it well enough to forget which drawer. Three months to find it again." },
              fail: { body: "You hid it — but the landlord went through your room once. She took nothing. You never feel easy there again." },
              critfail: { body: "You hid it. But your fingerprints were on that manila envelope, and the next morning it sat on somebody else's desk." }
            }
          },
          {
            id: "use",
            text: "Spend it now — go knock on that door",
            outcomes: {
              crit: { body: "You say three sentences. One of them is the file number. He asks you to sit, pours the water, and gives you the thing you came for — plus one you didn't ask for." },
              ok: { body: "It's done. You never said a threatening word. But you both heard the part that stayed unsaid." },
              meh: { body: "He agrees fast — so fast you suspect this costs him nothing at all." },
              fail: { body: "He listens, then laughs. He apologized for it three years ago and paid what he owed. In his eyes, your paper has expired." },
              critfail: { body: "He rings his bell before you finish. When security walks in, he pushes the envelope across to you: \"This is yours, sir.\" Not one threat out loud — and everyone in the room understood." }
            }
          },
          {
            id: "burn",
            text: "Burn it. You never saw it",
            outcomes: {
              crit: { body: "You burn it in a barrel out back and stir the ashes. You lost an opportunity — and whatever was going to come knocking at midnight for you. You sleep like a stone that night." },
              ok: { body: "Ashes. You got nothing. You also owe nothing." },
              meh: { body: "Burned it. But you memorized the file number, and it lives in your head for years." },
              fail: { body: "You burned it. The courier found out. He never came back to you." },
              critfail: { body: "Halfway through the burning, a neighbor watches from her balcony for a while. After that, people start asking about the young man who burns things in his yard." }
            }
          }
        ]
      },

      /* ---------------------------------------------------------------- 4 */
      {
        id: "shady_doctor",
        title: "You get the clinic doctor in the old neighborhood to sign a lie",
        body: "There's a clinic in the old neighborhood with a sign in two languages. Before you sit down, you make clear you're not here to bring trouble.\n" +
          "What you need is a signature — a doctor's note that lets you disappear, legally, for a few days. The doctor is careful. One thing matters to him: after you walk out, does the sign over his door still hold up?",
        brief: {
          lede: "You need a few days off the map. The man who signs the date away stakes his license on your word.",
          known: [
            "The clinic's best earner isn't medicine. It's time.",
            "What the doctor dreads isn't the fine. It's becoming the man who rattled on his own people.",
            "One signature costs him nothing in money. The risk is the entire bill.",
            "He has a daughter still in school. That makes him easy to convince — and cornered, dangerous."
          ],
          rumor: [
            "Some say health inspectors came through the door last month and asked questions.",
            "Some say he keeps a ledger of everyone who has ever made him sign."
          ],
          unknown: [
            "Where he writes this one down, and for how long.",
            "Whether his daughter ever learns what paid her tuition."
          ],
          terms: [
            { k: "The note", v: "A doctor's slip that buys you a few days, legal on paper." },
            { k: "The ledger", v: "The copy the signer keeps. Leverage on you — and a noose on him." }
          ]
        },
        choices: [
          {
            id: "press",
            text: "Lean on him — talk until he's afraid to say no",
            outcomes: {
              crit: { body: "He doesn't dare ask questions, and to cover himself he slips you a second record, a different one entirely. His hand shakes as you leave — and you know you can come back." },
              ok: { body: "He signs. You never said a harsh word, but both of you know exactly what just happened." },
              meh: { body: "He half signs, then starts stringing you out. You get the paper. He has your face." },
              fail: { body: "He's scared — scared past the point where that helps him. \"Go ahead, call the police. I'll shut the doors tomorrow.\" No signature, and a new enemy." },
              critfail: { body: "He takes it to the elders of his hometown association. Three months later, every shop in the old district knows exactly what kind of man you are." }
            }
          },
          {
            id: "deal",
            text: "Make it business — pay him, and let him see the math works",
            outcomes: {
              crit: { body: "You pay, and you run his numbers for him: your volume keeps his rent easy for months. From that day on, you are a client to him." },
              ok: { body: "Cash on the table, signature in hand, both of you very polite. The cleanest kind of dirty." },
              meh: { body: "He takes the money, signs two, and tells you not to come back in daylight." },
              fail: { body: "He hands the cash back: \"I'd rather earn less than see you through that door again.\"" },
              critfail: { body: "He takes the money. Next day he returns everything — to your rival, with your name attached." }
            }
          },
          {
            id: "honest",
            text: "No note. Carry it yourself",
            outcomes: {
              crit: { body: "You go see the people you owe, and tell them straight. A long silence, then: \"At least you didn't lie to me.\" That honesty pays you back later, when you least expect it." },
              ok: { body: "You carry it on your own back. Tired, but owing nobody." },
              meh: { body: "You white-knuckle it, and both ends of the rope come away frayed." },
              fail: { body: "No signature, no cleanup. The whole thing just rots where it stands." },
              critfail: { body: "Your honest way of carrying it was to lie. Called out on the spot — now you can't even walk into a clinic." }
            }
          }
        ]
      },

      /* ---------------------------------------------------------------- 5 */
      {
        id: "shady_union",
        title: "You ask the union boss to stump for you",
        body: "The meeting room in the union hall smells like burnt coffee and old carpet. The boss hears you out for ten minutes, then asks one question: \"What do you want my people to do?\"\n" +
          "Get that answer wrong, and for the rest of your life you never walk back into this building.",
        brief: {
          lede: "His own vote is worthless. He decides where everyone else's go. Those two things cost very different money.",
          known: [
            "During the strike vote you held the registration table for three straight nights. The members know who you are.",
            "Eight thousand members. On primary day, they watch which way he walks first.",
            "He doesn't want money. He wants: don't sell us down the river in the next contract.",
            "Bargaining with the company broke down last month. He's holding fire, and he's cutting everything short."
          ],
          rumor: [
            "Some say there's a layer above him — and that man is paid in a different currency.",
            "Some say he's planning to step down and is picking his successor. That matters more than any contract."
          ],
          unknown: [
            "Whether you'd actually keep the promise he's asking for.",
            "If he cuts a deal with your rival first, whether you have a second road."
          ],
          terms: [
            { k: "Endorsement", v: "A one-page statement. The value isn't the words — it's who said them." },
            { k: "Get-out", v: "Turning a mailing list into bodies on Election Day." }
          ]
        },
        choices: [
          {
            id: "promise",
            text: "Promise it straight: my hand signs that contract",
            outcomes: {
              crit: { body: "He stands, shakes your hand, then calls three men in. \"From now on, this man's business is ours.\" What you walk out with is the entire roster." },
              ok: { body: "He doesn't say support. He says: \"We can talk about it.\" From a union man, that is a heavy sentence." },
              meh: { body: "He agrees to \"think it over\" and walks you to the elevator. You know what thinking it over means." },
              fail: { body: "He sees the empty check right through you: \"You can't get past your own primary. What's your signature worth to me?\"" },
              critfail: { body: "You promised too much, and he happened to need someone the members could rip publicly. His people start recognizing your name in the Sunday paper — under his byline." }
            }
          },
          {
            id: "listen",
            text: "No terms yet. Sit down and hear them out for two hours",
            outcomes: {
              crit: { body: "Two hours later you have seventeen names and the three questions they actually care about. At the door he says: \"You're the first one who ever asked about the temperature on our floor.\"" },
              ok: { body: "You listened to all of it. No endorsement — but a phone number, and one piece of advice off the record." },
              meh: { body: "Two hours of listening, mostly griping. Half of it true. The other half is habit." },
              fail: { body: "At minute twenty, you checked your watch. He saw it." },
              critfail: { body: "You took a phone call mid-meeting. He waited for you to hang up. \"Looks like someone is more important than me.\" That ended the meeting." }
            }
          },
          {
            id: "decline",
            text: "Don't go in. Safer among the suits",
            outcomes: {
              crit: { body: "You take the other road, and you walk it steady. You do the math later: the union road was shorter — but those two hours are spent, and no ledger gives them back." },
              ok: { body: "You skipped the union hall. A fewer kind of people behind you — and a fewer kind of trouble in front." },
              meh: { body: "You thought you'd stay square with both sides. Now neither side quite trusts you." },
              fail: { body: "Your rival got there first. When his photo at the plant gate runs in the paper, you learn what you missed." },
              critfail: { body: "You didn't go — but your people carried a word for you: \"The boss looks down on unions.\" By the time it reaches the man himself, it isn't your word anymore." }
            }
          }
        ]
      },

      /* -------------------------------------------------------------- 5b */
      {
        id: "shady_union_collect",
        title: "The union comes to collect the promise you made two years ago",
        body: "The council votes next week on an outsourcing contract. The phone rings — it's the boss himself.\n" +
          "\"Two years ago you said the hand that signs is one of ours,\" he says. \"Next week, let's see how that hand votes.\"\n" +
          "This time he doesn't want a promise. He wants your actual vote — and your favor is coming due.",
        brief: {
          lede: "An endorsement isn't a gift. It's a loan. Two years, no interest. It matures today.",
          known: [
            "Next week: the city's outsourcing vote. Eight thousand union jobs ride on it.",
            "You're the man in the frame now. How this one vote goes is what the whole building will watch.",
            "That line — the hand that signs is ours — neither side forgot. Nor did the papers."
          ],
          rumor: [
            "They say he recorded your conversation and keeps it in the second desk drawer.",
            "They say your rival has upped the ante: a no-layoff guarantee, in writing."
          ],
          unknown: [
            "After this vote, how many allies and how many enemies the union counts. They remember.",
            "Whether that tape exists, nobody knows. But you start choosing your words."
          ],
          terms: [
            { k: "City outsourcing", v: "Public work handed to private firms. Cheaper on paper; the jobs walk out with it." }
          ]
        },
        choices: [
          {
            id: "deliver",
            text: "Honor the debt: vote no and kill the contract",
            note: "You pay the favor back. Union trust runs long — but the commercial bloc and the budget hawks will remember that you are expensive.",
            outcomes: {
              crit: { body: "Your speech buries the contract in committee. That night the lights at the union hall burn late — they're writing thank-you letters. Eight thousand of them." },
              ok: { body: "You voted; the measure died. His message is four words: \"We'll talk again.\" That is his thank-you speech." },
              meh: { body: "You cast the no; the bill passed anyway. The union knows you gave it everything. These days, giving it everything counts." },
              fail: { body: "Your no becomes the ad: he cost the taxpayers for his union friends." },
              critfail: { body: "The night before the vote, the story runs about the perks you \"promised the union.\" The contract passes, the favor dies, and your name comes away dirty." }
            }
          },
          {
            id: "renegotiate",
            text: "Stay off both sides: trade for a written no-layoff guarantee",
            note: "No straight no-vote — you make the company sign instead. Done well, it's statesmanship. Done badly, you're holding two grudges instead of one.",
            outcomes: {
              crit: { body: "Union votes in one hand, company money in the other, you pry a written amendment loose: three years, no layoffs. For once, the headline in both papers is kind." },
              ok: { body: "The guarantee gets signed, fuzzy wording and all. He takes it: \"Better than the man before you.\"" },
              meh: { body: "The company gives you words only. He hears what you carried back and says one thing: \"At least you came yourself.\"" },
              fail: { body: "Both sides think you sat on the fence: weak, says the union; meddlesome, says the company." },
              critfail: { body: "The thing you said in confidence to the company — the union would swallow layoffs, really — gets repeated to his face. This building is closed to you. For good." }
            }
          },
          {
            id: "refuse",
            text: "Let the contract pass. He never heard that promise",
            note: "Stiff him. The commercial bloc is delighted — and the union's memory outlasts any PAC.",
            outcomes: {
              crit: { body: "The contract sails through, the budget breathes easier, and the commercial people slide you the check for next time. From the union side — you set your phone to silent." },
              ok: { body: "You voted; the measure passed. Afterward you meet him in the corridor, and both of you study your phones." },
              meh: { body: "The contract passed. The union's silence is worse than their shouting." },
              fail: { body: "You cast the yes, and your rival turns betrayal of labor into an ad buy. The poster hangs at every plant gate in your district." },
              critfail: { body: "Vote day: the union reprints twenty thousand of the old flyer — he made us a promise — and rains it over your district. That's your own handwriting at the bottom." }
            }
          }
        ]
      },

      /* ---------------------------------------------------------------- 6 */
      {
        id: "shady_launder",
        title: "Someone wants to hand you a pile of money that can never be seen",
        body: "Someone is offering money too big to refuse, with one condition: don't ask where it came from.\n" +
          "The accountant sits across from you and draws, in pencil, three routes for washing it. Under each route he writes the same line: once it's in, there is no clean way out.",
        brief: {
          lede: "Some money, once you take it, is your name signed on someone else's books.",
          known: [
            "Through legal channels, four people would know where this came from inside three days.",
            "Through other channels, it becomes small donations, consulting fees, speech honoraria.",
            "The accountant isn't afraid of the job. He's afraid that some afternoon you'll hand him over.",
            "The regulators are busy this year. Their eyes are on money much bigger than yours."
          ],
          rumor: [
            "They say whoever this money really belongs to has also met with your rival.",
            "They say the same structure ran last year. It became an indictment."
          ],
          unknown: [
            "What the man behind this money means to buy, in the end.",
            "If one day they ask you to cough it up — whether you can."
          ],
          terms: [
            { k: "Laundering", v: "Cleaning dirty money is the easy half. Keeping its secret is forever." },
            { k: "Disclosure", v: "Report the source to the regulators. Put it on paper, hand over leverage." }
          ]
        },
        choices: [
          {
            id: "wash",
            text: "Take it. Let the accountant split it into a thousand small donations",
            outcomes: {
              crit: { body: "A thousand small donations, and every one survives an audit. For the first time, your campaign team spends without counting. You wake once in the night — then sleep again." },
              ok: { body: "The money comes in, laundered. The accountant locks the working papers somewhere he won't name. \"For your protection,\" he says. You choose to believe him." },
              meh: { body: "The money is in — but it takes half a year to spread thin, and a fifth of it never lands. Neither clean nor fast." },
              fail: { body: "Not thin enough. A small bank matches a few transfers, freezes them four months, and your campaign calendar falls apart." },
              critfail: { body: "The accountant takes the working papers home. Three months later they turn up as an attachment to a subpoena." }
            }
          },
          {
            id: "report",
            text: "Take it — and disclose exactly where it came from",
            outcomes: {
              crit: { body: "You write the whole thing into the public record. Reporters dig for three days and print it anyway: this one is actually clean. That line is worth more than the money." },
              ok: { body: "Disclosed. The money shrank and so did the trouble. You sleep well." },
              meh: { body: "You disclosed — but the man who owns this money hates seeing it on paper. He pulls the check and tells people you don't know the score." },
              fail: { body: "You thought disclosure ended it. The regulators follow the paper for three months anyway. They find nothing. You get nothing done either." },
              critfail: { body: "Buried in the disclosure is one old entry whose trail you can't explain. You meant to come clean. You pried open a much older seam." }
            }
          },
          {
            id: "refuse",
            text: "Send it back. Not this one",
            outcomes: {
              crit: { body: "You return the check with a line of your own: \"Next time, come through the front door.\" And he does come back — on the level. Some donors respect only a man who has turned them down once." },
              ok: { body: "Sent back. Your accounts are spotless. Your campaign is ugly." },
              meh: { body: "Sent back — but the decision leaves a crack in your team. Two senior people have one shouting match and both quit." },
              fail: { body: "You made the refusal too graceful to watch — a slap in public. The other money he'd hinted at never existed." },
              critfail: { body: "You returned it. Your rival took it. Three months later you find you are short of both money and people." }
            }
          }
        ]
      }
    ]
  }
});
