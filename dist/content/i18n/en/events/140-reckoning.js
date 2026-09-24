/* ============================================================================
 * CONTENT · i18n/en/events/140-reckoning.js
 * 中文文件 content/events/140-reckoning.js 的英文覆盖层（清算包）。
 *
 * 契约（详见 docs/I18N.md §3–§5）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件/选项按 id 定位；known/rumor/unknown 整体替换、条数给全。
 *   · 结构性键（id / era / tierMin / countMin / grade / category / base / mods /
 *     cost / effects …）受引擎保护，本文件一律不写。
 *   · wrath 群体展示名走 en/reg/01-config.js，这里不重复。
 *
 * 英文写法：第二人称、现在时、短句；「」化为英文引号或直接并进句子。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ==================================================================
       * 一、The Press (wrath_press)
       * ================================================================== */
      {
        id: "reck_press_dossier",
        title: "Two reporters are digging into your past at the same time",
        body: "The calls reach the office. Polite voices, impolite questions.\nYou picked fights with the press too often — now they are assembling a file on you.",
        brief: {
          lede: "Two newspapers that never cooperate are investigating the same old story in the same week. That is not a coincidence.",
          known: [
            "A reporter asked to \"talk about the old days\" — and every question touched something you thought nobody remembered.",
            "The columnist you humiliated in public has suddenly written about you four times this month.",
            "The newsroom is waiting to see how you react this time. The reaction itself is the story."
          ],
          rumor: [
            "Somebody said at a dinner: \"His scandals, collected properly, fill a book.\"",
            "Your former chief of staff has been visited about a \"book deal.\""
          ],
          unknown: [
            "Whether they actually have anything, or just want you to start explaining.",
            "Whether this is a probe — or the opening act of a takedown."
          ]
        },
        choices: [
          {
            id: "appease",
            text: "Feed them: give the star reporter an exclusive, satiate the appetite",
            note: "The relief valve. Muckraking turns into interview; wrath −18. The cost: you handed them the handle of the knife — he can write you again anytime.",
            outcomes: {
              crit: { body: "The interview ran three hours; for once you told the whole story. It ran under the headline \"A Political Life, in His Own Words\" — unflattering, but hard to quote against you." },
              ok: { body: "You gave the exclusive; the pens sheathed themselves. The old hands in the newsroom nodded to each other: he knows the game." },
              meh: { body: "The interview ran, same questions, new wording. You fed them lines; they had no intention of chewing politely." },
              fail: { body: "The exclusive was cut into a hits package, and the worst line was yours, in your own voice. \"He confessed voluntarily\" — more humiliating than being caught." },
              critfail: { body: "The reporter took your \"exclusive\" back and cross-checked it for three months. The story you told with your own mouth became page one of the file." }
            }
          },
          {
            id: "defy",
            text: "Fight in the open: call a press conference and name it a witch hunt",
            note: "A bet that your base is hungrier than the press box. Win and they pull back; lose and wrath +8 paves the road straight to the reckoning.",
            outcomes: {
              crit: { body: "The press conference turned into a prosecution of the press; \"witch hunt\" led the next day's front pages. Assignment letters to the hostile papers halved — they need easier targets." },
              ok: { body: "You let them have it, satisfyingly. The paper replied in careful language, and quieted — for now. Quiet is not the same as forgotten." },
              meh: { body: "A draw: you talked, they talked, nobody caught the other's mistake." },
              fail: { body: "Your \"witch hunt\" charges were refuted point by point — everything they found was real. Covering up for yourself is a better story than the old sins." },
              critfail: { body: "At the podium you said \"follow me.\" Four days later they followed up with something new. That boast will be quoted until you retire." }
            }
          },
          {
            id: "dig",
            text: "Background-check the reporter: see what is in his desk drawers",
            note: "Fight dirty with dirt. If it works the biting stops; if it fails you've confirmed \"suppressing a free press\" — the press's favorite subject.",
            outcomes: {
              crit: { body: "You \"anonymously provided\" the paper's own messy accounts to a rival. The two outlets tore each other apart, and your old story sank in the crossfire." },
              ok: { body: "The editor received a \"reminder,\" and the line of inquiry on you paused. Everyone knew why. Nobody will print why." },
              meh: { body: "Halfway through your digging you found they had been digging too. Each holds the other's dirt — hardly a safe deadlock." },
              fail: { body: "Your opposition research was caught red-handed. Next week's front page writes itself: \"He Sent People After Reporters.\"" },
              critfail: { body: "Your hire was photographed. The headline used few, fatal words: \"PRESS SILENCED.\" Those two words are your label now." }
            }
          }
        ]
      },
      {
        id: "reck_press_crusade",
        title: "The press launches a crusade: a four-week series to finish you",
        body: "This is not one story, it is a campaign: unified layout, unified line, double firepower.\\nThey are not covering you — they are closing you out.",
        brief: {
          lede: "Monday, three front pages, same theme, same day. This was scheduled.",
          known: [
            "A four-part investigative series is already laid out by week. Your name is episode one.",
            "The chain's owner said at a industry party: \"It is time to turn his page.\"",
            "Advertisers have started pulling from your affiliated projects — the money flees faster than the copy runs."
          ],
          rumor: [
            "The final installment is holding a document you have never seen.",
            "Somebody in the newsroom said: this is not reporting, it is an execution."
          ],
          unknown: [
            "Fighting back wins martyrs or confessions — the difference is a few points of luck.",
            "Whether silence can outlast the news cycle. This country never runs short of new stories."
          ]
        },
        choices: [
          {
            id: "fight",
            text: "Answer every installment: rebut piece by piece, knock down each card",
            note: "The gamble. Win = the crusade breaks and your reputation soars; roll a loss = social death, no safety net.",
            outcomes: {
              crit: { body: "Four weeks of point-by-point demolition — by week three they were auditing themselves. The series fizzled, two editorial boards reshuffled in disgrace. You became the press's industry joke and the political class's public hero." },
              ok: { body: "Every rebuttal held. The series lost its rhythm; the editors deflated first. The crusade ended in nothing — in this business, nothing is victory." },
              meh: { body: "A war of attrition. They didn't kill you; you didn't make them bleed. Your face stayed off the front page for one more week — barely a win." },
              fail: { body: "In week three they ran the document. Your rebuttals were pierced by one primary record. \"He lies\" no longer needed reasoning, only a screenshot. Your name moved from the politics section to the metro section — and the metro section never pulls back." },
              critfail: { body: "The document bore your own signature. You denied it three times on national television, and all three were recorded. The finale wrote itself: \"He Lied Until The End.\"" }
            }
          },
          {
            id: "buyout",
            text: "Split the ammo: sell the exclusive to the rival paper, let the industry fight itself",
            note: "Buy your way out. The papers will fall over the prize and the siege becomes an internal war — if you can pay.",
            outcomes: {
              crit: { body: "The two flagship papers went to war over the exclusive — whichever one printed it first lost. The crusade died in a copyright fight. You bought the cheap ending." },
              ok: { body: "The rival took the exclusive; the launcher cancelled the last two installments in a huff. What journalists hate most is never the politician — it is the competitor who beat them to the headline." },
              meh: { body: "The exclusive sold, but the siege only half broke — \"he gave us the material anyway,\" and the other two kept writing." },
              fail: { body: "The paper that took your money ran the exclusive beside a different story: \"He Tried To Buy The Coverage.\" The siege upgraded into a scandal: paying off the press. In this town that word has one spelling." },
              critfail: { body: "The wire record of your payment landed in the very piece they were building. The headline dropped the word \"tried.\"" }
            }
          },
          {
            id: "sitout",
            text: "Outlast: say nothing, ride out the news cycle until they change the subject",
            note: "The floor. The wrath doesn't clear and you shrink first — a bet that their patience is shorter than your support.",
            outcomes: {
              crit: { body: "In week three a bigger scandal broke. The crusade ended without an ending, and you never said a word. The highest win-rate tactic in the political history of silence." },
              ok: { body: "You took all four weeks. Fire with no echo is hardest to sustain — they withdrew first. Your name gathered dust, but the sign still hangs." },
              meh: { body: "The series ran to its finale and you never engaged. Humbled, but alive — in this trade, alive is the credential." },
              fail: { body: "You survived the stories but not the consequences: donors \"paused,\" the party is \"reassessing\" — the press's ammo is spent, and everyone else's is just being loaded." },
              critfail: { body: "Every single day brought new material. On finale day a paper of record wrote the closing editorial for its peers: \"A man like this should never be taken seriously again.\" That sentence follows you the rest of your life." }
            }
          }
        ]
      },

      /* ==================================================================
       * 二、Party Establishment (wrath_establishment)
       * ================================================================== */
      {
        id: "reck_est_summons",
        title: "The party sends you a hearing subpoena",
        body: "The subject line reads \"improper influence,\" the scope has no border, and they set the hour.\\nThe chair's secretary helpfully advises: \"attitude matters more than testimony.\"",
        brief: {
          lede: "At the caucus breakfast the chair mispronounced your name on purpose. Everyone at the table understood.",
          known: [
            "A \"voluntary\" hearing invitation arrived: the topic is your \"improper influence.\"",
            "Two senior members said publicly \"someone should rein him in.\" No names. Everyone knew.",
            "On the next appropriations and endorsements calendar, your seat moved three rows back."
          ],
          rumor: [
            "The hearing isn't about you — it's a message: the party still tolerates you, if you behave.",
            "Somebody has already been scouting where you might \"step down to.\""
          ],
          unknown: [
            "Whether this establishment wants to co-opt you or remove you.",
            "Whether bowing buys a real reinstatement — or just a suspended sentence."
          ]
        },
        choices: [
          {
            id: "heel",
            text: "Toe the line: apologize at the hearing, come back and vote by party memo",
            note: "The relief valve. Wrath −18 buys back your chair — from now on your voting record is not entirely your own.",
            outcomes: {
              crit: { body: "You groveled with textbook precision, confessed like a review meeting, and left with a legislative partnership scheduled before the gavel. The caucus memo upgraded you from \"problem figure\" to \"team player.\"" },
              ok: { body: "You apologized; the party accepted. The committee report read like a mediation settlement — both sides shook hands, the press was disappointed." },
              meh: { body: "You bowed without quite convincing anyone. The chair noticed. The tab stays open — patience is the one thing the establishment never runs out of." },
              fail: { body: "Your apology on the witness stand carried a note of mockery you couldn't hide. The elders exchanged glances faster than you could speak." },
              critfail: { body: "At the closing, the chair asked on camera: \"Do you think none of us understand the rules?\" You answered too fast. That exchange will be replayed for years." }
            }
          },
          {
            id: "ally",
            text: "Find a guarantor: ask party elders to intervene on your behalf",
            note: "Favors are hard currency. Whomever you can call in decides which page of their ledger you get written on.",
            outcomes: {
              crit: { body: "Two elders spoke for you jointly; the hearing became a \"closed-door exchange.\" You owe a large favor, but the chair is still yours." },
              ok: { body: "One elder intervened with exactly the right warmth: the party got the face, you kept the substance." },
              meh: { body: "The intervenor was too junior. The pleading came off as mud-slinging smoothing. The hearing proceeded — slightly softer vocabulary." },
              fail: { body: "The person who spoke for you got disciplined as a side dish. The establishment's signature trick: turning the rescue itself into evidence of your faction." },
              critfail: { body: "Your guarantor listened to the request, went silent for ten seconds, and hung up in your face. In those ten seconds you already had the answer." }
            }
          },
          {
            id: "defy",
            text: "Refuse: publicly decline to cooperate with a \"political show\"",
            note: "The hard line. The base will cheer for you; the machine will keep the bill for you.",
            outcomes: {
              crit: { body: "Your refusal was circulated by the base like a battle cry. After two days of weighing it, the committee retitled the hearing \"a study in procedural optimization.\" The machine flinched first." },
              ok: { body: "You didn't show, and they had no lever — the empty chair became your press conference. The establishment filed this debt in a deeper drawer." },
              meh: { body: "The hearing went ahead with you as the accused instead of the witness. You won half the optics and lost half the process." },
              fail: { body: "Your refusal entered the report as \"disrespect for the institution.\" In party language that line outlasts any scandal." },
              critfail: { body: "On the day you boycotted, the committee released material you had never seen. \"Contempt of procedure plus concealment of fact\" — the two charges testifying for each other. For the first time your toughness looked like fear." }
            }
          }
        ]
      },
      {
        id: "reck_est_blacklist",
        title: "The party establishment puts the uncooperative on a blacklist",
        body: "No memo, no official notice — yet the whole party is circulating the same list.\nThe machine doesn't ignite when it grinds people. It closes valves: money, doors, calendar slots — overnight, all \"in process.\"",
        brief: {
          lede: "A party list is circulating — titled \"people who cannot stay.\" It is not long. You are second.",
          known: [
            "Your office moved from the main building to leased space. All paperwork correct; the reason is \"renovations.\"",
            "Three resources you were negotiating hit \"process hold\" simultaneously. Individually coincidences; together a deployment.",
            "A young \"rising star\" has started \"speaking for\" your district's old constituents."
          ],
          rumor: [
            "The list was built by outside consultants in a slide deck — they call it \"structural realignment.\"",
            "The chair's exact words: \"First let him learn what life looks like without us.\""
          ],
          unknown: [
            "This machine has more patience than you can imagine.",
            "Whether defiance is martyrdom or self-destruction depends on whether your voters still recognize you."
          ]
        },
        choices: [
          {
            id: "break",
            text: "Defy openly: treat the purge as a primary preview — go straight to the voters",
            note: "A life-or-death bet. Whether your bedrock is hard enough is settled today; if it isn't, there is no tomorrow to settle it.",
            outcomes: {
              crit: { body: "You dragged the party's list into the sunlight on a bus that toured the entire state. Grassroots micro-donations relit every flame the machine had snuffed. At next year's election night, the youngster you were \"scheduled to yield to\" lost badly." },
              ok: { body: "The purge broke against your support: two hand-picked \"successors\" withdrew on their own. For the first time the party noticed that the name on the list is harder than the list." },
              meh: { body: "You held your ground, but every win got more expensive: less money, fewer doors, quieter allies. The machine doesn't fight you — the machine outlasts you." },
              fail: { body: "The machine moved first on procedure: redistricting, registration trouble, \"technical\" ballot barriers. Inside the rules you lost the election that nothing outside the rules could save." },
              critfail: { body: "They even chose your charge for you: \"obstructing procedure, blackmailing with public opinion.\" The purge order circulated with sober wording, like the disposal of faulty equipment." }
            }
          },
          {
            id: "submit",
            text: "Rejoin in good order: apologize publicly, accept \"getting back in line\"",
            note: "A way out — the most expensive kind: from now on, every sentence you make is followed by \"but what does the party think?\"",
            outcomes: {
              crit: { body: "Your apology was published \"reviewed and approved personally by the chair.\" Your name was crossed off the list — in pencil, which matters: you know it can be rewritten, and so do they. But today, you are back inside." },
              ok: { body: "The bow was formatted correctly and the process completed. On the day your caucus-lunch badge was restored, nobody mentioned the list — the establishment's memory is filed by subject." },
              meh: { body: "You apologized; your name stayed on the list under \"observation.\" In machine language, observation is a suspended sentence — and suspended is still a sentence." },
              fail: { body: "Your apology was graded \"insincere.\" The party doesn't want your head bowed — it wants your knees. Both sides watched you half-kneel." },
              critfail: { body: "The apology letter leaked, bundled with a recording of you trashing the chair in private — you handed over the white flag while someone opened your dark ledger. Two-way betting: the one thing the machine truly hates." }
            }
          },
          {
            id: "third",
            text: "Find a middleman: have a party boss host a \"reconciliation dinner\"",
            note: "The fence-walker's art. If the dinner happens it is a stepping stone; if it collapses it is the pre-hearing for your trial.",
            outcomes: {
              crit: { body: "The dinner lasted three hours. Coming out, the chair's hand rested on your shoulder for one photograph. It ran in the local paper under the caption \"Unity.\" Nobody mentioned the list again — mentioning it would disrespect two men in that photo." },
              ok: { body: "The middleman rounded the edges: you withdrew half, the party forgot half. Deal struck. For political memory, that volume of trade is a bounty." },
              meh: { body: "The dinner turned into a corporate banquet: nobody raised the list, nobody closed it. You kept your dignity. Nothing else." },
              fail: { body: "The middleman took your gift, then relayed your request to the chair verbatim — with one note of his own. Your \"reconciliation proposal\" became the evidence for the next round." },
              critfail: { body: "It collapsed over dessert. At the door the chair left one sentence: \"The list is only the first draft of the inventory.\" It needs no translation. It will be recalled at every personnel meeting from now on." }
            }
          }
        ]
      },

      /* ==================================================================
       * 三、Big Donors (wrath_money)
       * ================================================================== */
      {
        id: "reck_money_cold",
        title: "The donors go cold on you: no dinner invites, renewals paused",
        body: "The money never said it was leaving you. The money merely started \"reassessing.\"\nIn Washington those are the same sentence.",
        brief: {
          lede: "The fundraising calendar looks clean. Too clean — as if somebody erased it.",
          known: [
            "Three dinners that always invited you sent nothing this year.",
            "The bankers' circle repeats one line: \"his projects need reassessing\" — every one of those three words is a euphemism.",
            "Your PAC's renewal talks now come with a precondition: \"let's see the year-end polls first.\""
          ],
          rumor: [
            "At a dinner one donor said: \"I'm not saying anything against him — I'm choosing not to say anything.\"",
            "Someone is testing the donation pool for \"a steadier option.\" The name on the deck sounds like your successor."
          ],
          unknown: [
            "Whether the money is only holding back — or already loading someone else's gun.",
            "Donors' memory is shorter than voters'. Their patience is longer."
          ]
        },
        choices: [
          {
            id: "makeup",
            text: "Swallow pride: renegotiate \"past offenses\" into \"future cooperation\"",
            note: "The relief valve. Donors want to feel needed. Wrath −18 — but you must sit through an evening of business parables.",
            outcomes: {
              crit: { body: "You flew to three cities, listened to seven hours of founder stories, and nodded twice at macro calls you didn't understand. It worked: the dinner invitations returned, one adding \"bring your spouse next time.\"" },
              ok: { body: "The reconciliation dinner finished. The donors reached a verdict: \"He's changed.\" In donor language, that is the highest praise." },
              meh: { body: "You bowed; the money came back half a step: renewal talks resumed, the guest list still didn't have you." },
              fail: { body: "You flew to three cities and sat in the back row of two other people's product launches. At the handshake line nobody rushed toward you — that not-rushing was the answer." },
              critfail: { body: "A lead donor lectured you in front of a full table: \"Do you know what money's favorite politician looks like? The obedient one.\" Everyone at the table was waiting to see your reply — every reply is wrong." }
            }
          },
          {
            id: "small",
            text: "Stop looking up: pivot to small donors and grassroots fundraising",
            note: "Route around the money bags. Less cash, but clean — the establishment and the donors will read it as a fresh offense.",
            outcomes: {
              crit: { body: "Your small-donor haul beat last years' dinner totals. For the first time the donor list was surnamed \"constituent.\" The money circuit passed your report around with envy — envy means fear." },
              ok: { body: "Grassroots money plugged the hole. It is money with a posture: smaller, but earned standing up." },
              meh: { body: "Small donations cover the lights but not the expansion. Your current runs the bulbs; it won't burn anyone down." },
              fail: { body: "The grassroots ramp was too slow and the dinner was off-limits anyway. Green season meets lean season — the bookkeeper describes this month in the oldest word in the ledger: tight." },
              critfail: { body: "In month three your \"grassroots movement\" couldn't renew the servers. The donors studied your shambolic closing report and confirmed to each other: leaving him was right." }
            }
          },
          {
            id: "pressure",
            text: "Show the wrist: hint that your reelection \"matters a lot\" to them",
            note: "Threatening donors is a knife-edge trade — they have priced too many men to fear your words.",
            outcomes: {
              crit: { body: "Two project files labeled \"only he can deliver\" were accidentally left at the dinner. Three days later the renewal passed in full — the civilized spelling of a threat is a restatement of mutual interest." },
              ok: { body: "The donors understood, and swallowed: smiles at the table, wires from the office. Money noted this. Money's bookkeeping outlasts people." },
              meh: { body: "Your hint got translated into \"a communication-style issue.\" The money didn't cut; the regard thinned." },
              fail: { body: "Their families ran this business for two centuries — you think a lecture scares them? Next morning the last two sponsors still in talks announced a synchronized \"pause.\"" },
              critfail: { body: "You threatened the wrong man — he has family in the regulators. On the interview list that arrived two weeks later, item one read: campaign-finance compliance." }
            }
          }
        ]
      },
      {
        id: "reck_money_bounty",
        title: "The donors bankrolled a ringer, purpose-built to carry you off",
        body: "New campaigner, new reports, new credit line — they didn't stop backing you. They backed your replacement.\nMoney never says goodbye. Money makes a budget. Your career became a budget line.",
        brief: {
          lede: "Someone you have never heard of announced a run. His platform copies yours; his war chest is triple yours.",
          known: [
            "Three lead donors wrote checks in the same quarter, all flowing one direction.",
            "An \"independent research institute\" began issuing reports about you — titles shorter, covers thicker, one release at a time.",
            "The bank extended your rival a \"credit facility,\" and floated your renewal rate up one point."
          ],
          rumor: [
            "At a closed meeting somebody said: \"Whatever he's worth to them, we'll pay it — to buy him off the table.\"",
            "The newcomer's strategist just jumped from your former team."
          ],
          unknown: [
            "Whether this is a hunt — or a severance negotiation.",
            "Money can't buy dignity, but it can buy the wrapping paper."
          ]
        },
        choices: [
          {
            id: "counter",
            text: "Meet the money head-on: rally the base and old allies into a open fight",
            note: "A life-or-death bet. History's winners over money were madmen or geniuses — both kinds must first survive election night.",
            outcomes: {
              crit: { body: "On election night your outspent opponent failed to win a single vote in your own towns — the syndicate miscalculated: some bills are paid before election night, and some voters precast their currency to you. You won the round; the donor world convened at midnight for the postmortem." },
              ok: { body: "Your rival, at triple the budget, lost on half the turnout. For the first time the donors doubted that money is omnipotent — a doubt worth having, because next time they won't use cash to frighten you." },
              meh: { body: "You won — at a cost that hurt: half the donor base sheared off, every borrowed dollar spent. The ledger will not permit another such victory." },
              fail: { body: "Money did everything right: ads, turnout, lawyers, polls. You won every part that could be won; the part you couldn't was called the budget. On primary night, the ringer stepped over you to the nomination." },
              critfail: { body: "You lost — and the audit found a fundraising hole. The donors wrote \"he can't even balance his books\" into the background briefing they handed the press. The certificate of political death is worded professionally: no longer competitive." }
            }
          },
          {
            id: "terms",
            text: "Negotiate a price: let them take a stake instead of liquidating you",
            note: "The indentured way out: surrender veto power over certain issues so the budget keeps flowing.",
            outcomes: {
              crit: { body: "The table is easier to read than the battlefield: you gave up vetoes on two expendable issues, they recalled the ringer. At signing the money man said: \"If we'd done this earlier, think of the campaign costs saved.\"" },
              ok: { body: "Ceasefire. The ringer withdrew \"for personal reasons,\" your renewal came back at list price. Most peace in politics is signed with the phrase \"we'll discuss it later.\"" },
              meh: { body: "Only the gunfire stopped: the money didn't return, the rival left half. You kept your ballot eligibility — and a big TBD." },
              fail: { body: "Your envoys got treated as messengers. The donors wanted a replacement; you brought counter-offers on terms — different motions entirely." },
              critfail: { body: "Your \"concession plan\" became a comparison poster: your promises three years ago on the left, your asking price today on the right. For the first time the ringer out-valued you with a simpler pitch: \"He never even haggled.\"" }
            }
          },
          {
            id: "expose",
            text: "Flip the table: publish the donors' \"buying candidates\" playbook, turn scandal into issue",
            note: "The legal version of mutual destruction. Bet that public fury burns faster than their money.",
            outcomes: {
              crit: { body: "You drew the money chain as a relationship map and captioned it: \"They buy you — I'm suing you.\" Three papers followed within a week; two donors pulled out frantically. You stopped being \"the liquidated one\" and became \"the donors' problem\" — a seat that, once sat in, is sturdier than any candidate's." },
              ok: { body: "The map hit the front page. The donors \"paused\" the ringer — after money's dignity took a public beating, money flinches too." },
              meh: { body: "You made the stab public; the outrage lasted three hours. The money system is thicker than you think: it never answers you. It just lets the next topic bury you." },
              fail: { body: "\"Accusations without proof\" became their new ammo: a week straight of stories previewing a defamation suit against you. Your name now carries a modifier: \"the sore loser.\"" },
              critfail: { body: "The thickest line on your relationship map turned out to run into your own PAC. The table flipped onto your own head, and the donors bought the most expensive PR line in history: \"We, too, are victims.\"" }
            }
          }
        ]
      },

      /* ==================================================================
       * 四、Political Rivals (wrath_opposition)
       * ================================================================== */
      {
        id: "reck_oppo_list",
        title: "Your rivals are assembling a list of ways to deal with you",
        body: "Dark ledgers, surveillance, false-flag bills — the opposition's intelligence service exists, nobody just voted its budget.\nPage one of the list carries a single line: how he falls, and who we pick for it.",
        brief: {
          lede: "Your office got \"routine maintenance\" for the second time. The first was right after you said the hard thing.",
          known: [
            "The rival's chief of staff said it out loud: \"Dealing with him takes unconventional methods.\"",
            "Your aide reports being photographed while parking — two nights running, same car, different angles.",
            "A \"priority targets list\" leaked inside the opposition camp. You're in the top five."
          ],
          rumor: [
            "Beside the list is a column titled \"usable resources\" — every entry an unclean channel.",
            "They hired a fixer infamous for dirty work. His business card only says \"consulting.\""
          ],
          unknown: [
            "How long a framed operation takes to stage — you'd like to know, but not too late.",
            "Whether that list is a threat list or a task list."
          ]
        },
        choices: [
          {
            id: "truce",
            text: "Send word: a private sit-down with the rival, agree to \"fight clean campaigns\"",
            note: "The relief valve. Politics is a game of taking turns — shaking hands today beats being photographed shaking hands tomorrow.",
            outcomes: {
              crit: { body: "The secret lunch ran two hours; both of you came out laughing at how naive the press is. Nobody mentioned the list again. The most synchronized moment in politics is when both sides decide, at once, not to look in each other's drawers." },
              ok: { body: "Terms reached: next election, \"policy only.\" A verbal ceasefire like this stays valid until roughly the next crisis — but today it counts." },
              meh: { body: "Lunch eaten, message delivered — your name is still on the list, its priority just downgraded from A to B." },
              fail: { body: "Your \"overture of peace\" got recorded and cut into an ad: \"He blinked first.\" You wanted a ceasefire; he wanted a prisoner." },
              critfail: { body: "Two hours after the check came the photo of the secret dinner, captioned \"They were always in this together.\" You tried to end the fire and lit both sides." }
            }
          },
          {
            id: "warn",
            text: "Sound the alarm: leak the surveillance photos anonymously, ask aloud \"who does this\"",
            note: "Drag the dark war into the sun. Win and they back off; lose and you've confirmed the \"crying thief\" script.",
            outcomes: {
              crit: { body: "The surveillance car was gone the day after the story ran. Framing fears victims calling the police far less than victims who write copy." },
              ok: { body: "Your \"material\" stirred a round of op-eds. The rivals denied publicly and stood down privately — for one cycle." },
              meh: { body: "The story ran without a splash — tailoring a mark means nothing without a face in the frame." },
              fail: { body: "They beat you to the confession: a press conference denouncing \"professional victims\" and their framing tricks. Preemption is lesson one of the framing syllabus." },
              critfail: { body: "Your leaked photographs got traced back to — your own security consultant. The tails on you and on them were approved by the same office." }
            }
          },
          {
            id: "preempt",
            text: "Counter-dossier: build them a \"usable resources\" list in their own style",
            note: "Darkness against darkness. Each run down this road makes you more like them — wrath +8 and up, no ceiling.",
            outcomes: {
              crit: { body: "Your \"material\" kept the rival camp hunting a mole for three months, burning itself clean. Now they have tasted it: the top slot on the list sits empty — reserved for them." },
              ok: { body: "A ceasefire where each hand holds the other's windpipe is the most reliable kind in this town. Beside your name on the list, someone wrote two words: \"mutual.\"" },
              meh: { body: "Your list wasn't up to their professional standard. They read it, smiled, and kept working." },
              fail: { body: "The operation botched: the courier was caught on the spot. Your \"countermeasure\" became the rival's campaign anthem: \"Look what they did.\"" },
              critfail: { body: "The man you sent carried a real weapon. When that detail was read aloud in court, even your own people in the gallery leaned a half-row back." }
            }
          }
        ]
      },
      {
        id: "reck_oppo_gun",
        title: "An assassination threat reaches the desk: are you still holding the rally?",
        body: "A rally you cannot cancel, a route everybody knows, and the phrase \"credible threat.\"\nPolitical assassination is this country's traditional craft — it only counts as an accident when someone decides to try.",
        brief: {
          lede: "Page three of the security briefing: \"Credible threat received against a public figure.\" Your name is in the appendix.",
          known: [
            "The rally was announced two weeks ago: open venue, public route, guest list compromised.",
            "The security chief asked whether you'd still go — he said \"recommend cancelling\" so softly, as if saying it for you.",
            "Inside the rival camp someone is already discussing \"who takes over if something happens.\" They've even drafted the successor."
          ],
          rumor: [
            "The threat's paper trail reaches one name, then stops after one \"insufficient information.\"",
            "Someone paid, someone passed word, someone bought the ticket — the three may never have met."
          ],
          unknown: [
            "Cancelling buys you once. Going or not decides something larger: whether, from today on, you are afraid.",
            "What happens after the shots depends entirely on who the first one finds."
          ]
        },
        choices: [
          {
            id: "rally",
            text: "Go as planned: same venue, same hour, not one word cut",
            note: "The great gamble. The ones who survive this kind of night win the next ten years; the ones who don't become a textbook footnote.",
            outcomes: {
              crit: { body: "Someone fired — wild, because you'd broken your own route to shake a hand in the back row. Before the echo died, the crowd had the shooter down. Next day's headline: HE DID NOT BACK DOWN. You came back alive — and you brought the whole election back with you." },
              ok: { body: "The rally passed so smoothly it was almost boring — only the \"suspicious package\" in the security van at teardown made everyone chew their nails. The threat was confirmed, and defused: they learned you will stand in the light, and the light has too many angles a gun can't reach." },
              meh: { body: "You delivered the full speech standing. At the end, security placed an extra non-slip mat on the step behind the lectern. Nobody explained. You learned not to ask." },
              fail: { body: "Third row left of the platform: a seat on no invitation list. Your speech had four minutes left. It stopped at 58 seconds. The country had another afternoon punctuated by gunfire." },
              critfail: { body: "Between two shots you heard a third — your own detail firing in the chaos alongside the attacker's, a mess too confused even for a decent eulogy. The history books handled you briskly: one footnote, one photograph." }
            }
          },
          {
            id: "harden",
            text: "Go, but reroute: add plainclothes, seal the flanks — buy your odds up to passing grade",
            note: "Spend money on life. Guns can't hit a defense — but your budget can't hit a bullet either, and a failed roll still draws blood.",
            outcomes: {
              crit: { body: "The shooter appeared at the blind spot of your new route — and found the blind spot already staffed by plainclothes. Two crumpled copies of the program in his pocket. Afterward you told reporters one line: \"It was a big crowd that day.\" The security firm sent you a commemorative banner." },
              ok: { body: "Three layers of screening, a clean rally. The threat never came — or came and couldn't get through. In your ledger those two are equally valuable." },
              meh: { body: "At teardown somebody raised a hand beyond the cordon and was promptly pinned by plainclothes. You heard afterward that your motorcade circled the garage four times before parking." },
              fail: { body: "The bullet entered through the fire corridor nobody sealed — it grazed your ear and shattered the water glass on the lectern. Carried out, you heard two sounds: the echo of gunfire, and your own ringing ears. You live; those two sounds have moved into your head permanently." },
              critfail: { body: "The security plan cost two thousand and its execution skipped two thousand steps — the shooter stood at a post \"sealed\" off yet never checked, because \"the crowd was too large.\" The last invoice your personal detail filed was for the ambulance." }
            }
          },
          {
            id: "cancel",
            text: "Cancel the rally: declare \"we do not yield to violence\" and stay indoors",
            note: "The guaranteed survival. You live — but you pay for it with the word coward, which in a primary can buy your entire future from you.",
            outcomes: {
              crit: { body: "You cancelled the rally and reinvented the appearance instead: a live-streamed \"working as usual.\" The threat lifted next day — they wanted the shot of you afraid; you gave them the shot of you indifferent." },
              ok: { body: "Statement issued, rally cancelled, security upgraded. You stayed quite safe — it's just that from now on the word \"courage\" brings a certain week back to mind." },
              meh: { body: "You skipped one week. The rival camp's polling memo wrote one line about you: \"He flinches.\" That line gets quoted, favorably, in every race for the rest of your career." },
              fail: { body: "The photo of the empty lectern spread everywhere: your statement, one small line reading \"safety first.\" The rival mentioned you by name in a speech. The name he used was \"the man who didn't come.\"" },
              critfail: { body: "You cancelled that rally and dodged that bullet — but the \"too afraid to die\" label stayed on for a full term. Next primary, the opposition built its turnout model off that label, within two points of error." }
            }
          }
        ]
      },

      /* ==================================================================
       * 五、Intelligence & Law Enforcement (wrath_agency)
       * ================================================================== */
      {
        id: "reck_agy_file",
        title: "Somebody wrote your name into an internal file",
        body: "Vetting reopened, phones swapped, ex-staff interviewed — this is not investigation. It is documentation.\nThe system's pen is slower than a rival's knife; but once the sentence is written, the knife has coordinates.",
        brief: {
          lede: "Your security clearance was \"restarted.\" You last passed it before this system had any doubts.",
          known: [
            "A former aide was interviewed by two \"background researchers,\" and came back describing every question verbatim — which is itself alarming.",
            "Your office switchboard was quietly replaced. The work order says \"routine.\"",
            "The vetting form gained a new field: \"external contacts disclosure.\" The box is exactly three lines tall."
          ],
          rumor: [
            "A \"risk figures\" list circulates inside the building. You're on it. The annotation reads four words: exploitable, or destroyable.",
            "An unfamiliar case number is describing your schedule in a report for somebody."
          ],
          unknown: [
            "When the file began to exist matters more than what is in it.",
            "Whether the file was written to protect you or to prepare your ruin — the system can't be bothered to tell those apart."
          ]
        },
        choices: [
          {
            id: "comply",
            text: "Disclose everything: fill the vetting form to page three, \"cooperate fully\"",
            note: "The relief valve. Keep the pen that updates the file in your own hand — wrath −18, at the price of being read on every future appearance.",
            outcomes: {
              crit: { body: "Your disclosure was more meticulous than the audit template. As the reviewing officer closed the folder he said one word: \"Understood.\" Inside the system there is a lazy sort of respect for people who cooperate in good form." },
              ok: { body: "The form went up; the switchboard went back to the old model. For now the system has shelved you under \"transparent.\"" },
              meh: { body: "Disclosure done, vetting ongoing. You became one of those people who get a polite courtesy call every quarter." },
              fail: { body: "One honest line in your form was written slightly too smoothly. It came back circled in red with a two-word note: \"Please clarify.\" The file now has a table of contents." },
              critfail: { body: "On the \"voluntary interview\" day, the case officer slid two photographs across the table: one of you, and one of a time and place you should never appear in. You explained for half an hour; the notes filled half a page." }
            }
          },
          {
            id: "ally_in",
            text: "Find a friend inside: have an old contact refile the dossier — into the drawer nobody bothers to open",
            note: "Guarantor, system edition: the bet is that old faces outlast new enemies.",
            outcomes: {
              crit: { body: "The old contact retitled your file from \"risk\" to \"watch — long term — low priority.\" Only people who have ever written one know what those three words are worth." },
              ok: { body: "Somebody agreed to sign the routing slip on that file. In this system, the signature is the amulet." },
              meh: { body: "Your helper agreed to soften the adjectives but not the classification. Same file; better grammar." },
              fail: { body: "The person who carried your message got interviewed himself. Your file gained a new page: \"social connections.\" The system never documents only one person." },
              critfail: { body: "An internal inquiry opened: who is speaking for him. Your name now appears beside three acquaintances in a brand-new file — the system promoted you: from subject to network." }
            }
          },
          {
            id: "public",
            text: "Take it public: put surveillance and file-abuse oversight on the legislative agenda",
            note: "Turn your private file into a public issue. The system hates being discussed — but people who discuss it usually get discussed back.",
            outcomes: {
              crit: { body: "Your \"file transparency act\" unexpectedly lit the public square. Under pressure the system released a batch of precedents — yours not among them. A file that has seen sunlight fears light most of all: nobody mentions your page again." },
              ok: { body: "The issue stood up. Your file entered \"procedural sequestration\" — the system's politeness: we won't touch you, and you don't come back." },
              meh: { body: "Your bill got amended into \"a study commission.\" Your name isn't on the commission list. It is still on the file list." },
              fail: { body: "At the hearing your wording got too specific — specific as if you were reading your own file aloud. Next day's new review notice gained a line in the title: \"suspected disclosure of internal information.\"" },
              critfail: { body: "The system broke habit and answered your charges publicly: with an excerpt under a declassification stamp. The excerpt was full of things you never said — but the typeface is real, and so is the seal." }
            }
          }
        ]
      },
      {
        id: "reck_agy_frame",
        title: "Somebody drafted a case that never happened and filed it under your name",
        body: "The informant has a number, the details have timestamps, and the file awaits one signature — yours.\nThe highest form of a frame-up is writing \"never happened\" into a shape that passes every procedure.",
        brief: {
          lede: "A draft indictment is circulating in the corridor — case number blank, charges complete.",
          known: [
            "An \"informant\" describes three meetings you never attended, with terrifying precision of detail.",
            "Two staff you know were separately taken in to \"assist the inquiry\" — different rooms, identical questions.",
            "Your travel records have been tabulated: every cell marked \"nothing unusual\"; the whole reads \"highly consistent.\""
          ],
          rumor: [
            "A new electronic case file exists in the records system. The author field says: backfilled.",
            "Somebody fed two reporters an \"unnamed law-enforcement source\" — the charges aren't final, but the coverage is already running."
          ],
          unknown: [
            "Proving a non-event requires not innocence but clearance.",
            "A system's mistakes can be corrected; a system's decisions cannot. Your task is telling which one you're facing."
          ]
        },
        choices: [
          {
            id: "fight",
            text: "Litigate: hire the best counsel and break the fabrication chain link by link",
            note: "A life-or-death bet. Break it = the comeback from the cliff edge. Fail = the file closes, and \"under investigation\" follows your name forever.",
            outcomes: {
              crit: { body: "The prosecution's ironclad timestamp died against a notary office's original log — the fabrication chain broke at its thickest link and kept breaking all the way to the author field. The prosecution dropped every charge before closing arguments. Outside the courthouse you gave the press one sentence that led every bulletin that night: the system can be abused — tonight, it was audited." },
              ok: { body: "Too many holes: the file tripped over itself. \"Improper evidence handling\" — dismissal on procedure. You are clean, precisely clean enough that for the rest of your career you end every speech with \"but you have no idea what I went through.\"" },
              meh: { body: "The case stalls, the charge hangs, the investigation is a dull blade. You're fine — and nobody dares use you. \"Still under review\" is cheaper than \"guilty,\" and far harder to wash off." },
              fail: { body: "Your lawyer was excellent, but the file's \"cross-verification\" was real clearance pointed at fake paper: one of the three meetings did happen; the date doesn't match, yet place, people and motive all \"can be explained.\" And were. The case was filed." },
              critfail: { body: "You won every technical objection and lost the juror box that never needed to prove anything. As the verdict was read, you heard your own name married to the word \"found.\" That phrase is your entire résumé now." }
            }
          },
          {
            id: "leakback",
            text: "Leak back: package the fabrication chain and feed it to a reporter you trust",
            note: "Use the press's blade against the file's blade. Success cracks the lid open; failure is \"obstructing justice.\"",
            outcomes: {
              crit: { body: "The day the story ran, the judiciary committee announced it was \"seizing the matter.\" Nothing frightens the system like being quoted in public. The file was sealed, and you made a magazine cover: HE SPOKE FIRST." },
              ok: { body: "The story kept the questions alive for a week. The case wasn't dropped — but nobody would sign it anymore. It froze in the drawer marked pending evidence. A freeze is its own kind of acquittal." },
              meh: { body: "The piece ran. The heat lasted two days. The system's documents aren't newspapers — they don't need readers. They only need to exist." },
              fail: { body: "Your leak was classified as \"disclosure of investigative direction\" — which translated means obstruction. A second file was opened. It is about this." },
              critfail: { body: "Worse happened: part of the \"fabricated evidence list\" in your own story proved to have genuinely leaked from your office. Prosecutors added a line to your file: suspected access to case records. The case that never happened now has a real section." }
            }
          },
          {
            id: "stand",
            text: "Stand still: no plea, no explanation — keep working in public",
            note: "A bet that timestamps grow mold. The system outlasts memory — you bet yours is shorter than everyone else's.",
            outcomes: {
              crit: { body: "Three months later the framers leaked themselves: the \"informant\" had sold the same testimony in another case — one lie cannot serve two buyers at once. Your file was withdrawn entirely for \"associated fabrication.\" You never uttered a word, and the system issued your acquittal for you." },
              ok: { body: "You worked, spoke, and let the file hang. A year on, nobody remembers \"that case\" — except you. The system doesn't need to convict you; it only needs you to tire first." },
              meh: { body: "The case persists; so does your name — except now every new story adds the rider \"once investigated.\" You will get used to the modifier. You will not." },
              fail: { body: "\"Silence Is Consent\" ran in two major papers. Inside the party, people started forwarding \"why won't he explain.\" Your refusal to answer got transcribed as testimony — the most perfect testimony." },
              critfail: { body: "On day forty of your silence, the file received a voluntary \"supplemental witness\" — from your own office. From that moment silence had a new name: prior evidence of collusion." }
            }
          }
        ]
      }
    ]
  }
});
