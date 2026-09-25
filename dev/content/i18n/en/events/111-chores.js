/* ============================================================================
 * CONTENT · i18n/en/events/111-chores.js
 * 中文文件 content/events/111-chores.js 的英文覆盖层（日常公务 / 选民服务 chore 线）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices 里带 id 的按 id 对齐；纯标量数组（known/rumor/unknown）整体替换，
 *     必须整条给全，条数与中文逐字一致。
 *   · 结构性键（id / era / minYear / tierMin / weight / base / mods / effects / flags / req / cost …）
 *     受引擎保护，写了会记 protectedHits，故一律不写。
 *   · 模板占位符（{CITY} / {PLACE} / {PUB} / {DISTRICT}）原样保留，英文语序自行调顺。
 *   · 「」在英文里化进句子；机构/媒体用真实英文泛称。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      /* ================= 基层 T0–2 ================= */
      {
        id: "chore_eulogy",
        title: "An old neighbor dies and his family asks you to speak",
        body: "The funeral home in {CITY} is packed with the faces you shook on election night. The family tells you that as the town's public servant you should say a few words. You have no script.",
        brief: {
          lede: "An old neighbor dies; the family wants the public servant in you to say a word.",
          known: [
            "You have nothing written - you will improvise.",
            "One true story moves a room the most, and tests your touch the most.",
            "A stock condolence is safe, but reads as a brush-off."
          ]
        },
        choices: [
          {
            id: "heart",
            text: "Drop the script and tell one true thing you remember about him",
            outcomes: {
              crit: { body: "The small story you choose brings the room to red eyes. People remember that when it counted, he spoke like a human being." },
              ok: { body: "You speak well and mean it. The family holds your hand and thanks you a long time." },
              meh: { body: "You offer a few polite phrases. No one writes them down; no one finds fault." },
              fail: { body: "You mispronounce a name. No one forgets that one second of silence." },
              critfail: { body: "The eulogy you borrowed turns out to be a recycled template. The family spots it." }
            }
          },
          {
            id: "brief",
            text: "Say a short, standard condolence and hand the mic to the family",
            outcomes: {
              crit: { body: "Your restraint lands well. The family thanks you for not turning a funeral into your stage." },
              ok: { body: "You give a brief nod and sit down quietly. No one feels slighted." },
              meh: { body: "You say a few words. No one notices whether you came or not." },
              fail: { body: "You sound all business. Someone mutters: is he here to work, or to mourn?" },
              critfail: { body: "You check your watch heading to the next stop. A local paper prints it with a snide line." }
            }
          }
        ]
      },

      {
        id: "chore_ribbon",
        title: "A community-center ribbon-cutting is short one pair of hands",
        body: "At {PLACE} a renovated library wing is ready to open. Volunteers hold the scissors and wait for you. They do not want a speech - they want proof the work counts.",
        brief: {
          lede: "A renovated library wing opens, and the volunteers just need someone to cut the ribbon.",
          known: [
            "They want you there, not on the microphone.",
            "Lending a hand at fundraising makes the thing real.",
            "A flower basket and an empty chair save time but chill the room."
          ],
          unknown: ["Showing up adds points; being caught phoning it in takes them back."]
        },
        choices: [
          {
            id: "show",
            text: "Show up, cut the ribbon, then knock on doors for the fundraiser",
            outcomes: {
              crit: { body: "You roll up your sleeves and work the whole afternoon. Your photo runs in the local paper; neighbors call you a genuine one." },
              ok: { body: "You cut the ribbon, say a few words, and knock on two doors." },
              meh: { body: "You make an appearance and leave once the ceremony ends." },
              fail: { body: "You arrive half an hour late. The cutting is done; volunteers unroll a banner just for you." },
              critfail: { body: "On camera you claim credit for a project residents funded for two years. You see faces fall." }
            }
          },
          {
            id: "send",
            text: "You truly cannot get free - send a signed flower basket",
            outcomes: {
              crit: { body: "The note on the basket is perfectly judged. People remember your thoughtfulness." },
              ok: { body: "The basket arrives. Your absence stays dignified." },
              meh: { body: "The basket earns a nice word or two; no one asks who sent it." },
              fail: { body: "Your absence gets one mention: he would not even come to this." },
              critfail: { body: "The card on the basket names the wrong group. It becomes the town joke." }
            }
          }
        ]
      },

      {
        id: "chore_beat",
        title: "Riding the night shift with a patrol officer",
        body: "The police union in {CITY} invites elected officials, as it does every year, to ride a night shift. The stated reason is to see the front line. The real reason: the union hands out awards to those who work it.",
        brief: {
          lede: "The police union invites you to try a night on patrol.",
          known: [
            "It is framed as learning the beat; really it is a medal for the compliant.",
            "Walking one block lets you hear what the alleys actually say.",
            "Declining offends no colleague and forfeits the spotlight."
          ],
          unknown: ["If the stunt reads as a stunt, you lose the dignity you came for."]
        },
        choices: [
          {
            id: "walk",
            text: "Actually walk a block and listen to what the officers see",
            outcomes: {
              crit: { body: "You hear a shift's worth of grievances and go back to win the precinct an added budget line. The union notes your grit." },
              ok: { body: "You walk the night, shake a lot of hands, and land on the local society page." },
              meh: { body: "You tag along, learn nothing, and say nothing wrong." },
              fail: { body: "A domestic call comes in; your presence is more hindrance than help. The officer resents you." },
              critfail: { body: "You get winded, slip into your own car, and drive off. Officers roast you live on local radio." }
            }
          },
          {
            id: "decline",
            text: "Politely decline and give the spotlight to a hungrier colleague",
            outcomes: {
              crit: { body: "You step aside quietly. The union still owes you one, and police see you as one who does not grab." },
              ok: { body: "You decline gracefully; the union does not take it personally." },
              meh: { body: "You skip this small thing. No one notices." },
              fail: { body: "The union files he would not even ride a patrol under how it rates you." },
              critfail: { body: "The colleague who takes your place steals the story; beside him you look even smaller." }
            }
          }
        ]
      },

      {
        id: "chore_dispute",
        title: "Two neighbors drag a fence dispute into your office",
        body: "In {PLACE}, one side is an old hand who turned out votes for you; the other is a young family that just moved in. Both are red-faced over a few inches of ground, and both want you to settle it.",
        brief: {
          lede: "Two neighbors bring a fence dispute all the way to your office.",
          known: [
            "One is a longtime voter; the other a new arrival.",
            "Coffee and a nudge to each side bets on goodwill.",
            "Reading the deed and ruling on the letter bets on law but stings feelings."
          ],
          unknown: ["Take one side and the other keeps a tab on you."]
        },
        choices: [
          {
            id: "mediate",
            text: "Pour two coffees and get them to each step back once",
            outcomes: {
              crit: { body: "A few words and the fence is settled. They shake; neighbors say he is the one to reason with." },
              ok: { body: "Each gives half a step. The matter is closed." },
              meh: { body: "You talk them into agreeing out loud; later they still glare at each other." },
              fail: { body: "You lean toward the old hand. The young family calls your office unfair." },
              critfail: { body: "One wrong word turns them both on you: your smoothing favored one side." }
            }
          },
          {
            id: "rule",
            text: "Pull the deed and settle it by the book",
            outcomes: {
              crit: { body: "You trace the boundary line and rule by law. Even the loser admits he dealt in reason." },
              ok: { body: "You rule by the book. A hard way, but a fair one." },
              meh: { body: "You read the clause. Neither side is happy; neither can argue." },
              fail: { body: "One family calls your ruling a statute used to bully an old neighbor." },
              critfail: { body: "You misquote the clause; both seize on it and escalate above you. Now you are wrong twice." }
            }
          }
        ]
      },

      /* ================= 市政 T2–4 ================= */
      {
        id: "chore_clinic",
        title: "Constituent clinic day: a room full of people seeking justice",
        body: "Every weekly clinic day the line in {CITY} runs out the door: a lost benefit, a tax notice, a child stuck outside a school zone. Not all of them want it solved. They want proof someone will listen.",
        brief: {
          lede: "It is open-office hour, and the room is full of people demanding answers.",
          known: [
            "Many are not looking for a fix, only for someone to hear them out.",
            "Sitting with each case can close a few, though it wears you out.",
            "Turning them into a how-to guide for staff saves time but cuts you off."
          ],
          unknown: ["Get caught brushing them off and even a good deed sours."]
        },
        choices: [
          {
            id: "case",
            text: "Sit with each one: make the calls, chase the file, actually close a few",
            outcomes: {
              crit: { body: "You claw benefits back for several families. Word spreads: someone is working this seat." },
              ok: { body: "You close a few; for the rest you give a straight answer." },
              meh: { body: "You work the whole day and finish little, but no one feels ignored." },
              fail: { body: "You miss one urgent case. The family complains in the paper that no one would hear them." },
              critfail: { body: "The follow-up you promised never comes. A voter you chased cuts it short: see you at the polls." }
            }
          },
          {
            id: "refer",
            text: "Compile the fixable ones into a how-to guide and have staff work it",
            outcomes: {
              crit: { body: "You file the repeated asks and build a process. For once the clinic day is not chaos." },
              ok: { body: "You sort the routine cases into a checklist. Faster now, a little colder." },
              meh: { body: "There is a manual now, but people still want to say it to your face." },
              fail: { body: "Staff drop the ball; a few forms sink without a trace, and the gripes come back to you." },
              critfail: { body: "The guide becomes a new byword for the runaround. People say you will not even show your face." }
            }
          }
        ]
      },

      {
        id: "chore_budget",
        title: "A budget hearing on whether to repair the west bridge",
        body: "The town's old bridge leaks every year and gets patched every year. This year it needs real money. Testifying: a trucking union, the riverfront shopkeepers, and one resident holding a sign reading the bridge is my home.",
        brief: {
          lede: "Should the town spend to fix the west bridge? The hearing has every take but yours.",
          known: [
            "In the room: the trucking union, riverfront businesses, families under the span.",
            "Letting every side finish, then answering point by point is safe but slow.",
            "Unveiling a plan and forcing it feels good and annoys the patient."
          ],
          unknown: ["If you cannot hold the room, one hearing can split into camps."]
        },
        choices: [
          {
            id: "listen",
            text: "Let every side talk, then answer each concern one by one",
            outcomes: {
              crit: { body: "You listen all the way through and answer point by point. Each group feels heard; the vote follows." },
              ok: { body: "You run it well; every view gets its due." },
              meh: { body: "Three hours of hearing, nothing decided, but you offended no one." },
              fail: { body: "One side visibly wins the room. The loser notes your tilt." },
              critfail: { body: "You fumble a number on ground you are unsure of; a shopkeeper catches it live. The hearing turns into a public correction." }
            }
          },
          {
            id: "push",
            text: "Put the plan on the table and force it: the bridge gets fixed",
            outcomes: {
              crit: { body: "You push the repair over the objections. Truckers and merchants owe you one for making the call." },
              ok: { body: "The plan passes. The dissent does not fade, but you got it done." },
              meh: { body: "It goes through by force. No one feels respected; the applause is thin." },
              fail: { body: "Your forced plan gets overturned on the vote. You burned the platform for nothing." },
              critfail: { body: "The bridge you forced is probed and the budget reeks. The question of who is speaking for the contractor lands on you." }
            }
          }
        ]
      },

      {
        id: "chore_school",
        title: "A school newspaper day asks you to teach a civics lesson",
        body: "At a student-newspaper event in {CITY}, a teacher steers you into a room and lets a class of ten-year-olds ask everything they have about being an official. No risk here - and one good photo hiding in it.",
        brief: {
          lede: "A school paper-day event asks you to teach a lesson on civics.",
          known: [
            "A room of ten-year-olds will ask you anything.",
            "Explaining what government is for is where you shine.",
            "Just reading a story and signing books is easy and makes good photos."
          ],
          unknown: ["Children ask plain questions; one mushy answer gets repeated at home."]
        },
        choices: [
          {
            id: "teach",
            text: "Teach for real and explain what government actually does",
            outcomes: {
              crit: { body: "You light up their eyes. The teacher keeps your lesson plan; parents' group chats are all about you." },
              ok: { body: "An easy class. The kids like it; parents find you approachable." },
              meh: { body: "You talk, the kids fidget, and the photo turns out fine." },
              fail: { body: "A parent complains you slipped campaign advertising into the lesson." },
              critfail: { body: "You try to pose with the kids; a parent calls it out on the spot: the classroom is not your campaign stop." }
            }
          },
          {
            id: "read",
            text: "Just read a story, sign a few books, touch nothing else",
            outcomes: {
              crit: { body: "You read warmly and sign patiently. Simple, and it lands." },
              ok: { body: "You read the story and sign books; the kids are delighted." },
              meh: { body: "An ordinary reading day. You came and went." },
              fail: { body: "You read flatly, the kids wander off; the teacher thanks you stiffly." },
              critfail: { body: "You misspeak in front of the kids, and a child repeats it word for word to a parent. It sounds worse than it is." }
            }
          }
        ]
      },

      /* ================= 州级 T4–6 ================= */
      {
        id: "chore_state_tour",
        title: "A one-week local tour after the State of the State",
        body: "Your speech has to land in the counties: three a day, a ribbon, a lunch, a roundtable. {PUB} wants a headline, the county chairs want warm bodies, and you just hope no one photographs how tired you look.",
        brief: {
          lede: "A week of local stops after the State of the State: three counties a day.",
          known: [
            "Press wants a headline, party wants bodies, you want to not collapse.",
            "Grinning through every stop spreads your name but drains you.",
            "Cutting two stops to dig into one yields substance but loses exposure."
          ],
          unknown: ["Get caught yawning and the tour turns into bad press."]
        },
        choices: [
          {
            id: "grin",
            text: "Grin through every stop and hit each county's sore spot",
            outcomes: {
              crit: { body: "You nail three stops in a day. Your face leads the county papers; the chairs count you as one who carries votes." },
              ok: { body: "The tour goes smoothly; you sweep the grassroots of several counties." },
              meh: { body: "You grin through the stops, too tired for any of it to stick." },
              fail: { body: "At one stop you plainly flag, throw out a lazy line, and the local paper prints it." },
              critfail: { body: "At the last stop you yawn on camera. The headline reads he is not really here." }
            }
          },
          {
            id: "deep",
            text: "Cut two stops and sink into one place for a real morning",
            outcomes: {
              crit: { body: "You dig up a real problem at one stop and carry back a weighty bill to the legislature. That ground is yours now." },
              ok: { body: "You work one place thoroughly, at the cost of two stops of exposure." },
              meh: { body: "You talk a whole morning; no one downtown notices the two missing counties." },
              fail: { body: "Party chairs from the two cut counties call to ask why you skipped them." },
              critfail: { body: "Your playing-favorites reads as a signal. The snubbed counties complain to the party together." }
            }
          }
        ]
      },

      {
        id: "chore_flood",
        title: "Upstream releases late and several towns go under",
        body: "It rained three days straight, and the water authority's notice to release the gates came too late. Several towns flood. Everyone got out, but the losses need someone to look and someone to speak. The state cameras are already rolling.",
        brief: {
          lede: "An upstream water release comes too late; several towns are under water.",
          known: [
            "People are safe; the damage needs an eye and a voice.",
            "Rushing to the scene bets on execution and on fumbling on camera.",
            "Holding the rear and pushing aid delivers money but skips the human touch."
          ],
          unknown: ["Go or stay, you can be wrong: a show, or absent."]
        },
        choices: [
          {
            id: "response",
            text: "Get to the scene first and coordinate rescue and federal aid",
            outcomes: {
              crit: { body: "You run rescue and aid flawlessly. Victims say that when it counted he came; the state records your execution." },
              ok: { body: "You coordinate well on the ground; relief avoids chaos." },
              meh: { body: "You go, stand at the edge, help little, but at least you are there." },
              fail: { body: "Your dispatch is half a step slow. A mayor counts it off you: so this is what state efficiency looks like." },
              critfail: { body: "On camera you are caught trudging the mud with hands in pockets. The victims' words run in the paper next day." }
            }
          },
          {
            id: "fund",
            text: "Hold the rear and push the federal disaster-aid paperwork",
            outcomes: {
              crit: { body: "You claw the aid back dollar by dollar. The money beats you there, and the towns note you came through." },
              ok: { body: "The paperwork clears; funds trickle in, but they never see your face." },
              meh: { body: "You get the money; sitting in the rear, you feel smaller." },
              fail: { body: "Some flood victim feels he never even came once. Money arrived; the human touch did not." },
              critfail: { body: "The aid stalls. You promised too much, and victims who got nothing put the bill on you." }
            }
          }
        ]
      },

      /* ================= 联邦 T6+ ================= */
      {
        id: "chore_casework",
        title: "The federal casework mailbag piles up",
        body: "A lapsed social-security check, a visa stuck, a veteran's benefit unpaid - Washington's bureaucracy grinds ordinary people to dust, and folks in {CITY} write to you, the one who can be heard in the capital.",
        brief: {
          lede: "The federal office's help-line mail has piled into a mountain.",
          known: [
            "Your district sees you as the one with an ear in the capital.",
            "Hand-picking the hardest letters often closes them, and often over-promises.",
            "Standing up a task force to fix root causes is slow but can look for show."
          ],
          unknown: ["Blow big and whiff, and you feed the other side's ammo."]
        },
        choices: [
          {
            id: "fix",
            text: "Take the hardest letters yourself and force agencies to answer",
            outcomes: {
              crit: { body: "You break a few deadlocks. Recipients travel to thank you; the local paper calls you the one who arm-wrestles the feds for his district." },
              ok: { body: "You close a good number, and the federal machinery owes you a little." },
              meh: { body: "You chase a round of cases. Bureaucrats move slowly, but no one calls you idle." },
              fail: { body: "You vouch for one case and drop it; the recipient feels betrayed." },
              critfail: { body: "You go over their heads and catch a flat procedural answer back. Your boast and your failure run in the paper together." }
            }
          },
          {
            id: "system",
            text: "Form a task force and turn common logjams into a fix list",
            outcomes: {
              crit: { body: "You gather scattered pleas into a list you can carry to committee, curing a bit of the disease, not just the symptom." },
              ok: { body: "The task force tidies the churn; efficiency climbs." },
              meh: { body: "The list is done, but people still want someone to place the calls for them." },
              fail: { body: "The task force produces a report, not results. Someone calls it a paper tiger." },
              critfail: { body: "The bureaucracy returns your fix list untouched. He cannot move even his own district's business becomes the opposition's new ammo." }
            }
          }
        ]
      },

      {
        id: "chore_townhall",
        title: "Back home for a town hall in your district",
        body: "Five hundred people fill the gym in {DISTRICT}. The microphone passes hand to hand: someone challenges you, someone vents, someone simply came to hear whether you, the one who went to Washington, still talk like home.",
        brief: {
          lede: "A town hall back in the district: five hundred people in a gymnasium.",
          known: [
            "Some come to challenge you; some to hear if you still talk like a local.",
            "Taking every question one by one shows candor and invites stumps.",
            "Sticking to your three prepared points is safe but reads as scripted."
          ],
          unknown: ["Blank on a local number, and your silence loops in replay."]
        },
        choices: [
          {
            id: "engage",
            text: "Take every question and answer each one under the mic",
            outcomes: {
              crit: { body: "You answer plainly and hold the room. When it breaks up, people say he is still one of us." },
              ok: { body: "You weather a few rounds; the tension lands on your side." },
              meh: { body: "You answer an hour; some leave satisfied, some still sore." },
              fail: { body: "One tricky question freezes you; that silence gets recorded." },
              critfail: { body: "A specific local number stumps you; you blurt that you will look into it. The room's laugh loops on the radio by morning." }
            }
          },
          {
            id: "prepared",
            text: "Stay on your three prepared points and keep the frame",
            outcomes: {
              crit: { body: "You clamp every topic back onto results. A town hall becomes a clean report card." },
              ok: { body: "You deliver it steadily; you hand the opposition nothing." },
              meh: { body: "You know the script cold; the room listens politely." },
              fail: { body: "Someone shouts stop reading the script; every dodge makes you look guilty." },
              critfail: { body: "You stonewall so long the crowd starts a clap to boo you off. The local station airs all of it." }
            }
          }
        ]
      },

      {
        id: "chore_vetvisit",
        title: "A routine visit to the veterans' hospital",
        body: "The veterans' hospital invites you to appear on Heroes Day. They want a federal pair of ears; you want the photo of a handshake, of you listening to them.",
        brief: {
          lede: "A veterans' hospital asks you to make an appearance on Heroes Day.",
          known: [
            "They want a federal ear; you want a handshake photo.",
            "Really listening and carrying back a benefits case wins steady.",
            "A decorous salute is safe but feels like a drive-by."
          ],
          unknown: ["Caught using them as a backdrop, a veteran calls it out - the worst kind."]
        },
        choices: [
          {
            id: "honor",
            text: "Hear out a few veterans and carry their hard benefit cases back",
            outcomes: {
              crit: { body: "You write down a few service numbers and file the real bill back in Washington. The veterans' groups mark you reliable." },
              ok: { body: "You listen well and bring back word; no big result, but real." },
              meh: { body: "You appear, shake hands, take the photo; process complete." },
              fail: { body: "The case you promised to carry sits on your desk; the veterans' association calls your office directly." },
              critfail: { body: "You treat the visit as nothing but a photo backdrop, and a veteran on crutches says so to your face." }
            }
          },
          {
            id: "brief",
            text: "Give one decorous tribute and leave the patients their quiet",
            outcomes: {
              crit: { body: "You say little but warmly; the hospital and the families admire your touch." },
              ok: { body: "You give a short tribute and close out with grace." },
              meh: { body: "You read a solemn passage and leave. Nothing wrong." },
              fail: { body: "Someone says you came and went and left nothing behind." },
              critfail: { body: "You overdo the tribute; against the real suffering in the ward the photo caption stings." }
            }
          }
        ]
      },

      /* ================= 年代补位 · 2000s / 2010s / 2020s ================= */
      {
        id: "chore_patrol",
        title: "Walking the block with a neighborhood night watch",
        body: "In {PLACE} the neighbors started their own night watch, pairing off to walk the streets on weekends. The captain asks you, the public servant, to come along for one night. Not for the title - so people can see someone standing with them.",
        brief: {
          lede: "Neighbors run a community night watch and ask you to walk one shift with them.",
          known: [
            "The watch is volunteer neighbors, not police - just people watching out for each other.",
            "Walk the round and you hear complaints no one voices in daylight.",
            "A quick appearance is easy, but the block can tell whether you really walked it."
          ],
          unknown: ["Whether you steady the neighborhood or only pass through shows itself by the end of the night."]
        },
        choices: [
          {
            id: "walk",
            text: "Put on flat shoes and walk the whole block with the crew",
            outcomes: {
              crit: { body: "You walk and take notes on dark streetlights and empty storefronts, then get them fixed one by one. The block calls you the one who really put in the miles." },
              ok: { body: "You finish the round, shake hands, and chat the whole way; your name runs in the community paper." },
              meh: { body: "You walk part of it. Nothing goes wrong, and nothing sticks." },
              fail: { body: "Neighbors see you get into your car after a few steps. The watch cools toward you." },
              critfail: { body: "Someone says it flat out: he cannot walk one alley and still wants to talk about our safety." }
            }
          },
          {
            id: "cheer",
            text: "Stop at the rally point, say a few encouraging words, skip the walk",
            outcomes: {
              crit: { body: "Your few words land just right. The captain writes to thank you for not acting above it." },
              ok: { body: "You say a few words; the mood warms for a moment." },
              meh: { body: "You appear and speak. No one dwells on it." },
              fail: { body: "Someone notes you came, said two sentences, and would not even walk along." },
              critfail: { body: "You cheer them on and turn straight to your car; 'hang in there' rings hollow." }
            }
          }
        ]
      },

      {
        id: "chore_schbudget",
        title: "The district will cut after-school programs; you host a budget meeting",
        body: "The {CITY} school district is short again and is eyeing a cut to after-school care and the music program. Parents are alarmed, and the board asks you, the one who holds the purse, to lay the numbers out in front of everyone.",
        brief: {
          lede: "The school district wants to cut after-school programs; parents want you to explain the money face to face.",
          known: [
            "The shortfall is real; whatever you cut and whatever you keep offends someone.",
            "Spreading the numbers out and taking questions lands better than reading a script.",
            "Letting the principal take the fire keeps you clean, but parents remember that you hid."
          ],
          unknown: ["One meeting can aim the anger at the ledger, or at you."]
        },
        choices: [
          {
            id: "open",
            text: "Put the ledger on the table and answer the parents' questions one by one",
            outcomes: {
              crit: { body: "You show exactly where the money goes. Parents hate the cut but say he did not treat us like outsiders he could fool." },
              ok: { body: "You answer well, and some of the heat goes out of the room." },
              meh: { body: "You read the books for half an hour; nobody is convinced and nobody is angered." },
              fail: { body: "You stall on one number; parents ask on the spot whether you even read the budget." },
              critfail: { body: "You dump the whole shortfall on your predecessor; parents call it buck-passing and file a joint protest." }
            }
          },
          {
            id: "defer",
            text: "Let the principal face the parents alone; you offer one line at the door",
            outcomes: {
              crit: { body: "You neither absorb nor dodge it. The principal owes you one; parents find you level." },
              ok: { body: "You close it out politely; no one holds it against you much." },
              meh: { body: "You slip past the night and leave no impression." },
              fail: { body: "Parents crowd the door asking if the money is cut after all; you cannot get under it." },
              critfail: { body: "'He just walked right out' runs in the local paper the next day." }
            }
          }
        ]
      },

      {
        id: "chore_portvisit",
        title: "The harbor is banked with containers, and local goods are stuck",
        body: "In {CITY} the port stacks containers mountain-high, and goods waiting to clear sit for weeks. Local businesses press you and gripe at once; the city asks you to walk the terminals and, when you are back, say a word for this street.",
        brief: {
          lede: "The harbor is jammed; local merchants wait for you to see the docks and speak up.",
          known: [
            "What sits in the harbor is not only boxes but shops and plants that need to eat.",
            "A walk on the ground finds the choke point no federal form shows.",
            "A press release is easy, but merchants want you to say out loud that this is a local problem."
          ],
          unknown: ["Whichever line you speak at the dock, the chamber of commerce and the port authority will quote it tomorrow."]
        },
        choices: [
          {
            id: "visit",
            text: "Go to the terminals yourself and see the truck lanes and the stacks",
            outcomes: {
              crit: { body: "You find which link is jammed and come back with a push letter that has teeth; merchants say you asked the right question." },
              ok: { body: "You walk it and catch a few links worth pushing on." },
              meh: { body: "You view the flow as scheduled and learn nothing new." },
              fail: { body: "Port officials brush you off with boilerplate; merchants feel you wasted the trip." },
              critfail: { body: "You say something amateurish at the dock; a local paper cites it as proof he does not know the local economy." }
            }
          },
          {
            id: "statement",
            text: "Issue a statement from the office, pressing the feds for the local merchants",
            outcomes: {
              crit: { body: "Your statement hits the sore spot; Washington actually moves a little, and merchants note the favor." },
              ok: { body: "The statement goes out; some noise, but the cargo still sits." },
              meh: { body: "No one dwells on the statement; the boxes stay stacked." },
              fail: { body: "Merchants say you only push paper and will not show your face on site." },
              critfail: { body: "Port officials knock your statement flat in one line; it becomes the town joke." }
            }
          }
        ]
      },

      {
        id: "chore_harbor",
        title: "After the hurricane, you visit the coastal shelters",
        body: "A hurricane tore through, cutting power and pushing water into the towns along {CITY}'s coast. People are sheltering in gymnasiums. The state sends you to walk the shelters and see what is missing; the state cameras are already behind you.",
        brief: {
          lede: "After a hurricane, the state sends you to check what the coastal shelters lack.",
          known: [
            "Getting people into a shelter is only the first step; the days after rest on it.",
            "Walk it yourself and you can call in the missing power and medicine on the spot.",
            "Holding the rear and phoning is easier, but victims never see your face."
          ],
          unknown: ["To victims you are a steady hand and to the camera a candidate; one slip becomes tomorrow's headline."]
        },
        choices: [
          {
            id: "inspect",
            text: "Work the shelters overnight and bring in the missing generators and cots",
            outcomes: {
              crit: { body: "You run several shelters in one night and the supplies arrive before dawn. Victims say that with him here they feel easy." },
              ok: { body: "You coordinate well on the ground; no shelter falls into chaos." },
              meh: { body: "You walk a round; you help little, but you are there." },
              fail: { body: "One shelter lacks medicine; your dispatch is half a step slow and victims count it to your face." },
              critfail: { body: "On camera you boss the shelter around and fix nothing; next day's caption is ugly." }
            }
          },
          {
            id: "rear",
            text: "Hold the rear and call in relief supplies and federal aid one after another",
            outcomes: {
              crit: { body: "You bring the supplies in line by line. The money and cargo beat you there, and the towns note you came through." },
              ok: { body: "The calls clear; goods trickle in, but they never see your face." },
              meh: { body: "You get it done from the rear, where you feel smaller." },
              fail: { body: "Some victim feels he never came once in such a storm; the goods arrived, the human touch did not." },
              critfail: { body: "One shelter sits without power and no one tends it; your rear-desk running becomes the other side's ammo." }
            }
          }
        ]
      },

      {
        id: "chore_dataleak",
        title: "A big company leaks data, and people in your district are in it",
        body: "A company everyone uses is exposed for leaking a flood of personal records, and voters in {CITY} are on the list. Complaint calls and waiting reporters fill your office overnight: does the government do anything about this?",
        brief: {
          lede: "A big company leaked your constituents' personal data; the angry crowd wants you to speak.",
          known: [
            "Most cannot say exactly what they lost; they only want someone to own it.",
            "Calling in the company and the regulator to answer in public puts the focus on you.",
            "Waiting to verify before you speak is safe, but the crowd wants a voice right now."
          ],
          unknown: ["Whether you run this as accountability or as theater, the internet decides by tomorrow."]
        },
        choices: [
          {
            id: "confront",
            text: "Summon the company and the regulators and question them line by line in front of victims",
            outcomes: {
              crit: { body: "You force the company to promise fixes and restitution on the spot. Victims say on television that this one really asked for us." },
              ok: { body: "You get a few hard lines out; the company gives ground." },
              meh: { body: "You question for an hour; the company stonewalls; you neither land it nor lose it." },
              fail: { body: "You get stuck on the technical detail; the hearing turns into the company's PR show." },
              critfail: { body: "Someone digs up your old donations from the firm; the one asking questions becomes the one asked." }
            }
          },
          {
            id: "investigate",
            text: "Hold your fire, trace the leak first, then give the public a firm answer",
            outcomes: {
              crit: { body: "You deliver a hard investigative finding that nails whoever is responsible; even the press calls you steady." },
              ok: { body: "You are not the fastest, but your words hold up." },
              meh: { body: "You are still investigating while the next story buries this one." },
              fail: { body: "The crowd cannot wait; they say you are buying the company time." },
              critfail: { body: "The findings never land, and your 'wait a bit' gets looped as a meme across the network." }
            }
          }
        ]
      },

      {
        id: "chore_tour2",
        title: "The national tour after the State of the Union, cameras from dawn to dark",
        body: "Your speech has to land nationwide: several cities a day, live TV hits, local roundtables, and a short-video clip to record after midnight. {PUB} wants a headline, the party wants bodies, and you only hope the camera does not catch how tired you look.",
        brief: {
          lede: "A grind of a national tour after the State of the Union, serving both the old networks and the new platforms.",
          known: [
            "Cable, the news sites, and social feeds each want a different line from you.",
            "Keeping every stop bright tests your stamina and your delivery most.",
            "Cutting stops to dig into one yields substance but drops the exposure you were owed."
          ],
          unknown: ["A fifteen-second clip of you collapsing on the plane may travel farther than any speech."]
        },
        choices: [
          {
            id: "grin",
            text: "Grin through every stop, TV and livestream, missing none",
            outcomes: {
              crit: { body: "You nail several stops in a day without a crack; every platform relays your floor; the party counts you as one who carries votes." },
              ok: { body: "The tour runs smooth; you sweep the grassroots circuit." },
              meh: { body: "You grin through the stops, too tired for any of it to stick." },
              fail: { body: "At one stop you plainly flag and throw out a lazy line; someone records it." },
              critfail: { body: "You yawn, spent, on camera; that fifteen seconds loops for a whole week." }
            }
          },
          {
            id: "deep",
            text: "Cut several stops and sink into one place for a real morning",
            outcomes: {
              crit: { body: "You dig up a real problem at one stop and carry a weighty bill back to Congress; that ground is yours now." },
              ok: { body: "You work one place thoroughly, at the cost of two stops of exposure." },
              meh: { body: "You talk a whole morning; no one nationwide notices the missing cities." },
              fail: { body: "Party chairs from the cut stops call to ask why you skipped them." },
              critfail: { body: "Your playing favorites reads as a signal; the snubbed regions file complaints together." }
            }
          }
        ]
      },

      /* ================= 基层池加深 · county fair ================= */
      {
        id: "chore_fair",
        title: "The county fair opens, and the main stage needs a local official",
        body: "The {CITY} county fair runs once a year: fried cider, pottery stalls, kids leading livestock around. The committee asks you, the local public servant, to cut a ribbon and say a word - really they want to see whether you still know these old stands.",
        brief: {
          lede: "The county fair opens; the main stage is just short one local official to appear.",
          known: [
            "Every family wandering the midway votes here.",
            "Walking the stands and trading a line with vendors is the most down-to-earth thing you can do.",
            "Reading an opening speech on stage is safe, but no one cares for official tone."
          ],
          unknown: ["One thing you say at the fair travels faster than any TV ad."]
        },
        choices: [
          {
            id: "stroll",
            text: "Skip the stage, walk the stands one by one, trade a line with vendors and parents",
            outcomes: {
              crit: { body: "You stop at the jam stand and talk with the owner for ten minutes. Your photo runs in the fair bulletin; neighbors say he still remembers this place." },
              ok: { body: "You walk the round, shake a lot of hands, kids crowd in to photograph you." },
              meh: { body: "You drift half a circuit with the crowd and neither say nor do anything wrong." },
              fail: { body: "You find it loud and breeze through; vendors feel you look down on the fair." },
              critfail: { body: "You only work the photogenic stands, and an old vendor asks to your face why you never stopped by his." }
            }
          },
          {
            id: "speech",
            text: "Get on stage, read the opening remarks, close it out with dignity",
            outcomes: {
              crit: { body: "Your remarks are short and warm; the crowd actually applauds when you finish." },
              ok: { body: "You read the script and the ceremony runs clean." },
              meh: { body: "You read in official tone; half the crowd is gnawing corn." },
              fail: { body: "Your speech runs long, kids cry, parents leave; the mood scatters." },
              critfail: { body: "You misread a fair figure and someone corrects you from the crowd; you become the one who cannot even get local facts straight." }
            }
          }
        ]
      }
    ]
  }
});
