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
        title: "An Old Neighbor Dies and His Family Asks You to Speak",
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
        title: "A Community-Center Ribbon-Cutting Is Short One Pair of Hands",
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
        title: "Riding One Block with the Night Patrol",
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
        title: "Two Neighbors Drag a Fence Dispute into Your Office",
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
        title: "Constituent Clinic Day: A Room Full of People Seeking Justice",
        body: "Every weekly clinic day the line in {CITY} runs out the door: a lost benefit, a tax notice, a child stuck outside a school zone. Not all of them want it solved. They want proof someone will listen.",
        brief: {
          lede: "It is open-office hour, and the room is full of people demanding answers.",
          known: [
            "Many are not looking for a fix, only for someone to hear them out.",
            "Sitting with each case can close a few, at great cost in energy.",
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
        title: "A Budget Hearing on Whether to Repair the West Bridge",
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
        title: "A School Newspaper Day Asks You to Teach a Civics Lesson",
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
        title: "A One-Week Local Tour After the State of the State",
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
        title: "Upstream Releases Late and Several Towns Go Under",
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
        title: "The Federal Casework Mailbag Piles Up",
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
        title: "Back Home for a Town Hall in Your District",
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
        title: "A Routine Visit to the Veterans' Hospital",
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
      }
    ]
  }
});
