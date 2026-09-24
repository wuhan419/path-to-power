/* ============================================================================
 * CONTENT · i18n/en/events/90-career-2.js
 * 中文文件 content/events/90-career-2.js 的英文覆盖层（仕途第二包 + car3 日常）。
 *
 * 契约（详见 docs/I18N.md §3–§5）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的字段。
 *   · 事件/选项按 id 对齐；terms 按数组下标对齐。
 *   · 纯字符串数组（known / rumor / unknown）整体替换，条数与中文一致。
 *   · 结构性键（id / era / tierMin / weight / base / mods / effects / flags …）受保护，不写。
 *   · 英文按重写处理：第二人称、现在时、短句；「」化进引号或句子；机构用真实英文名。
 *   · 占位符 {PUB} / {CITY} / {MEET} / {ORG} 保留原样，由引擎 flavor 池替换。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      /* ====================================================================
       * 1) car2_mentor_offer — a senior politician offers to take you on
       * ================================================================== */
      {
        id: "car2_mentor_offer",
        title: "The Boss Wants to Take You On",
        body: "He says he is old now and needs a young man who still remembers why he entered politics. Translated: he needs new legs. You need an umbrella that has survived thirty years of rain.",
        brief: {
          lede: "A man who has run this state's conversations for thirty years buys you the most important coffee of your life.",
          known: [
            "His nickname is the Boss. When he falls, not one of his people talks back.",
            "He picked you because you owe no one yet. His own men are too old, too expensive.",
            "Take his protection and you are one of his: votes, alliances, nominations — you ask him first.",
            "He gives you two weeks, with one warning: tell no one about this meeting."
          ],
          rumor: [
            "His last protégé did not say one sentence of his own in public for five years.",
            "The prosecutor's office keeps a box of files labeled with the name of his club."
          ],
          unknown: [
            "How much rain he can hold off for you — and when he folds the umbrella back up.",
            "How much skin comes off when you peel the label one of his off your back."
          ],
          terms: [
            { k: "Patron", v: "A senior politician who shields you and feeds you resources. The price is loyalty." }
          ]
        },
        choices: [
          {
            id: "accept",
            text: "Join him: take the umbrella",
            note: "From now on someone in the party speaks for you — and decides for you. The gains are real and so is the collar, and the locksmith is him.",
            outcomes: {
              crit: { body: "He puts your name in three rooms: appropriations, nominations, and the primary-season conference calls. Within half a year, two things you wanted get done. One thing you opposed he drops himself — his housewarming gift to you." },
              ok: { body: "The umbrella opens. Party HQ starts returning your calls. Someone fronts the money on your campaign's invoices. And he starts calling you — most of the time after dark." },
              meh: { body: "The umbrella opens, but seven people already stand under it. You wait in line for his attention. The line is long." },
              fail: { body: "He accepts your loyalty, then hands the seat he promised you to someone else. Next time, he says. You learn what that phrase weighs." },
              critfail: { body: "In your first month aboard, the press reopens his old cases. You did nothing — but your name makes print for the first time as one of his." }
            }
          },
          {
            id: "negotiate",
            text: "Negotiate: guidance, not a collar",
            note: "The proud middle road. His kind admires people who bargain — and remembers every one who does. It all rides on his mood that day.",
            outcomes: {
              crit: { body: "You lay terms on the table: counsel, not commands. He studies you for half a minute, then smiles. You sound like me at your age. You get the guidance and keep the reins." },
              ok: { body: "He neither agrees to everything nor refuses. The relationship parks in the slot marked he likes you — looser than a collar, closer than a stranger." },
              meh: { body: "The negotiation turns into a long mutual probe. You collect a few vague kindnesses and one line: you are still young." },
              fail: { body: "The people who negotiate with me, he says, usually have not been beaten up yet. The meeting ends early. You walk out into the same rain." },
              critfail: { body: "He turns your no into an anecdote, told three times at three dinners: a young man who thought he was an exception. Your arrogance becomes his table talk." }
            }
          },
          {
            id: "decline",
            text: "Decline: earn your own name",
            note: "Clean, but slow. He will not punish you. He will simply remember you — and wait. This town has excellent memories for people who said no.",
            outcomes: {
              crit: { body: "Your refusal gets around. Two grassroots groups that had been watching come to you — they have waited a long time for a man who will not bow to a boss." },
              ok: { body: "You keep your name your own. The road is slower, but yours is the only signature on the page." },
              meh: { body: "No one punishes you. No one invites you for coffee either. Quiet, as if nothing happened." },
              fail: { body: "You notice you stop receiving invitations to party events. No notice is the notice." },
              critfail: { body: "Three months on, your first bill dies quietly in committee. Nobody admits his fingerprints on it. Nobody needs to." }
            }
          }
        ]
      },

      /* ====================================================================
       * 2) car2_committee_seat — the quiet war over committee assignments
       * ================================================================== */
      {
        id: "car2_committee_seat",
        title: "The committee list goes final next week, and your name is still in pencil",
        body: "First lesson of a governing chamber: your name is worth whatever someone else is willing to erase. Assignment season has begun.",
        brief: {
          lede: "The committee list goes final next week. Your name is still written in pencil.",
          known: [
            "Bills are born in committee and die in committee. The full chamber only stamps.",
            "In your first year you offended no one. That means anyone may offend you first.",
            "The caucus leader writes the list in pencil. Everyone in the chamber knows who holds the eraser."
          ],
          rumor: [
            "A finance committee seat is opening — the first pick is caught in a recall petition.",
            "The leader wants to reserve an exile seat for a trading partner."
          ],
          unknown: [
            "What you say in the corridor already reached the leader's desk.",
            "How many years it takes to warm a cold seat — and what rivals do in that time."
          ]
        },
        choices: [
          {
            id: "lobby_hard",
            text: "Lobby hard: write your name into a golden seat",
            note: "Knock on doors, declare yourself, make promises. They will remember your appetite — good committees like ambition and watch it just as closely.",
            outcomes: {
              crit: { body: "On the last night you knock on the right door: the finance committee. When the list is posted two days later, the pencil has turned to ink, and your name sits on line three. Donor calls arrive faster than congratulations." },
              ok: { body: "You get onto the finance committee — bottom slot. Bottom means the dirtiest work and the fewest cameras. But your foot is in the door." },
              meh: { body: "A week of lobbying earns you a seat that is neither good nor bad. Someone reminds you: those who know their place go farther." },
              fail: { body: "Your lobbying gets entered in someone's ledger. The list drops, and you are in exile — the utilities committee. Files pass through there, and nothing else." },
              critfail: { body: "A rival hands your promises for that seat to the newspaper, word for word: new member, first week, a list of deals. Before the list is even posted, you are off it." }
            }
          },
          {
            id: "take_exile",
            text: "Take the cold seat nobody wants",
            note: "Exile has no enemies, only waiting. Work the forgotten hearings until they are yours, and in three years you are the only person in the chamber who understands that file.",
            outcomes: {
              crit: { body: "You go quiet on the utilities committee for ten months and write the first rate report this state has ever dignified with a footnote. At the hearing, even the opposing party cites your numbers. In the corridor the leader claps your shoulder: next year, there is a seat for you." },
              ok: { body: "The cold seat holds. You become the only person who can read that mess of accounts — dull, but impossible to route around." },
              meh: { body: "You warm the cold seat. Pity the audience is small. This kind of correct is the hardest thing to endure in politics." },
              fail: { body: "A year of grinding, and when the list is redrawn your seat does not move. You understand the file now. Nobody needs you for it." },
              critfail: { body: "The committee you inherited buries an old debt nobody wants to touch. In month five of reading files, the state auditor moves in — auditing exactly the papers that carry your signature." }
            }
          },
          {
            id: "defer",
            text: "Declare publicly: the caucus leader decides",
            note: "Hand the whole allocation back to the leader. This year you get nothing. Next year, whose name does his pencil think of first?",
            outcomes: {
              crit: { body: "Your willing obedience gets praised by name at the caucus meeting when the leader speaks. The list drops: a mid-tier seat, plus a promise made in the corridor — next round, you go first." },
              ok: { body: "You land a mid-tier seat, neither good nor bad. The leader's office logs your phone number." },
              meh: { body: "The reward for good sense is a colder bench. At least nobody has anything against you — including people who have no impression of you at all." },
              fail: { body: "You set yourself too low. By the end of assignment season, even first-terms from your own party talk over you in meetings." },
              critfail: { body: "Your obedience earns a famous column: the quietest members now make every decision — by not objecting. You become an unnamed example in it, and everyone can guess who." }
            }
          }
        ]
      },

      /* ====================================================================
       * 3) car2_redistrict — the map redraws your territory away
       * ================================================================== */
      {
        id: "car2_redistrict",
        title: "They Redrew Your District Out of Existence",
        body: "The new map is public now. The ten-year voting base you wove together is cut down the middle by one curved line. The voter pool will be recalculated on its own — until then, you have a window. Use it.",
        brief: {
          lede: "The moment the new map goes up, one third of your ten-year territory is cut away by a single curve.",
          known: [
            "Redistricting is not cartography. It is war: whoever holds the pen owns the next decade.",
            "Your three truest counties land in three different districts. They call that crab slicing.",
            "Your own party sits on the map commission. They know exactly whose district this knife cuts.",
            "Two paths to fight back: appeal to the state supreme court, or a citizen referendum to void the map. Both cost money and time."
          ],
          rumor: [
            "This map clears the road for some political family's heir. You are just in the way.",
            "A rising rival was about to hit you head-on. His team is celebrating tonight."
          ],
          unknown: [
            "Whether the voters sliced away still know your name.",
            "Whose table the new neighbors once ate at."
          ]
        },
        choices: [
          {
            id: "fight",
            text: "Fight publicly: take the map to the courts and the ballot",
            note: "Turn the map into a story: who is the victim, who drew the line. Win and your territory comes back. Lose and your name stays tied to the word lost for years. The voter pool moves with the ruling.",
            outcomes: {
              crit: { body: "Your team gets the mapping firm's emails: in black and white, split his three counties apart. The court takes them in, the map is void, redraw it. Your territory comes back — and you pick up a national reputation with it." },
              ok: { body: "The ruling: partial redraw. Two counties come back. The third stays in another district forever. Enough — your seat holds." },
              meh: { body: "The court declines the case; the referendum petitions fall short. But the carved-up incumbent plays as a pity card, and some of the voters you lost dig in harder than before." },
              fail: { body: "The suit runs past the registration deadline; the referendum money burns out. The map takes effect. Your voters wake up inside a new district and find they are no longer neighbors." },
              critfail: { body: "Your court filing includes one internal document with a dirty source. The case is lost not on the map but on your conduct. The map stands — and you collect the anything-for-power label." }
            }
          },
          {
            id: "submit",
            text: "Swallow it: run again inside the new map",
            note: "Maps last ten years; anger lasts three months. Accept the borders, move the offices, knock on brand-new doors. Ugly — but you live.",
            outcomes: {
              crit: { body: "You spend six months working every county the map added to you. On election night the new voters give you more than the old ones ever did — they were taken seriously for the first time, and they remember who did it." },
              ok: { body: "You win, but it is hard. The new district learns your name. The old one decides you changed." },
              meh: { body: "You keep the seat. The breath you used to swallow the anger still sits in your stomach." },
              fail: { body: "A new map is a new map: unfamiliar counties, unfamiliar machines, unfamiliar opponents. You win narrowly, with the ugliest margins of your career." },
              critfail: { body: "You lose your first race in the new district. On the concession night you sit a long time staring at the old map — where your name still covers three counties." }
            }
          },
          {
            id: "deal",
            text: "Trade it: counties of voters for chairs on committees",
            note: "The most political choice there is: if the map cannot be changed, make it a chip. You will gain real power — and lose, permanently, the counties that knocked doors for you. The voter pool remembers everyone sold.",
            outcomes: {
              crit: { body: "Two hours behind a closed door with the commission people. The map stands. You come out with a seat on the appropriations committee and a future campaign commitment. On the way out, neither side smiles." },
              ok: { body: "The deal closes: the map does not move, your seat trades up to a real committee. Old voters ask in the letters column why you stopped talking. You never answer." },
              meh: { body: "Their price is higher than you figured. You collect half a promise and pay in full silence." },
              fail: { body: "You thought you were trading. You were being cleared out. The map takes effect; the promised committee goes to someone else. The list is not final, they say." },
              critfail: { body: "Someone brought a recorder to the dinner. Three months later the conversation about three counties for one chair runs on an investigative podcast. Not one word cut." }
            }
          }
        ]
      },

      /* ====================================================================
       * 4) car2_succession — the boss retires; the heir war begins
       * ================================================================== */
      {
        id: "car2_succession",
        title: "The Boss Is Retiring, and You Are One of the Two Heirs",
        body: "He is stepping down, and you are one of his two answers. How you carry yourself this week decides whether you inherit the machine, run underneath the machine, or watch it dismantle the ladder you stand on.",
        brief: {
          lede: "The Boss is retiring, and you are one of the two heirs. He called you in to watch how you behave.",
          known: [
            "His machine has one breath left: the network, the lists, the seats — all handed over in the same week.",
            "Two candidates: you, and an older, more obedient man. He has not chosen.",
            "Every call you took in the last three days was a probe: will you fight, wait, or yield?",
            "He is still in office. Push too hard and he can deny the seat to both of you."
          ],
          rumor: [
            "His medical report is worse than the released one. Retirement may be the polite word.",
            "The other man holds a list — everyone and everything that passed through the Boss's door these years."
          ],
          unknown: [
            "Whether he wants the machine continued or honorably dissolved.",
            "What version of your phone calls reaches his ears tomorrow."
          ],
          terms: [
            { k: "The Machine", v: "A boss-centered network of favors and lists. It can be inherited — or dismantled." }
          ]
        },
        choices: [
          {
            id: "claim",
            text: "Claim it: this seat is mine",
            note: "The most Boss-like thing you could say — he admires ambition and knows exactly what it tastes like. The risk: the rival's list, and every footprint you left on the stairs yourself.",
            outcomes: {
              crit: { body: "You do not wait. The night of the announcement you make thirty-seven calls; by dawn a majority of the hill stands behind you. He hears the report and says one word: Fast. The list goes to your hands." },
              ok: { body: "You win the seat, but not gracefully: when he hands over the list, half of it stays behind — spent on the rival faction as a farewell favor." },
              meh: { body: "You take the seat, but the old guard looks at you differently. You used to be one of his. Now you are the one who grabbed it." },
              fail: { body: "You moved fast. He moved precisely. Your line on the list — the old debt you thought nobody remembered — surfaces on the eve of the vote." },
              critfail: { body: "You push too hard and he changes his mind on the spot: nobody gets it. His retirement statement has one line — what I regret most is that some men mistook waiting for obstruction — and the whole state reads it." }
            }
          },
          {
            id: "back_heir",
            text: "Yield: back the other man and keep the machine",
            note: "Give up the seat, keep the machine. The kingmaker's chair is safer and lasts longer — provided the man you elevate remembers why you stepped aside.",
            outcomes: {
              crit: { body: "You step back beautifully. The new boss takes the seat; you take the daily machinery — the lists, the calls, the Thursday breakfasts. Three months later everyone understands who actually runs things." },
              ok: { body: "The machine transfers intact. At the handover ceremony you are the man standing beside the new boss. The elders thank you." },
              meh: { body: "The man you backed wins, but his own people multiply week by week. Your calls still connect. Fewer and fewer get returned." },
              fail: { body: "On the new boss's hundredth day, your office moves to the far end of the corridor. The debt of your yielding is not on anyone's books." },
              critfail: { body: "After the win he launches a modernization of the machine: lists digitized, relationships flattened, elders retired. Translated: you are the one retired." }
            }
          },
          {
            id: "ask_him",
            text: "Ask him first: what do you actually want",
            note: "Worth more than thirty-seven calls. In thirty years nobody has asked him that — everyone only asked him for things.",
            outcomes: {
              crit: { body: "That afternoon he talks for three hours: which money not to touch, which people good for one use only, which county he has owed for thirty years. At the end: the list is yours. Do not learn from me — learn from the part I could not reach." },
              ok: { body: "He gives no answer, but gives one line worth having: I have seen hundreds fight for it. You are the first to ask the right question. The list ends up yours — along with the half of the warning he never finished." },
              meh: { body: "A pleasant talk, a vague conclusion. He wishes you luck — the way he does for everyone saying goodbye." },
              fail: { body: "What do I want? He sneers. I want you both gone, so I can see what this hill looks like without me. You leave empty-handed." },
              critfail: { body: "Your visit gets spun by the rival as a coup staged at a sickbed. The headline: the old man is still in hospital, and the line outside the door has already formed. The ward stops receiving you." }
            }
          }
        ]
      },

      /* ====================================================================
       * 5) car2_cabinet_call — the call about a department
       * ================================================================== */
      {
        id: "car2_cabinet_call",
        title: "They are shopping for a department head, and your phone rang",
        body: "The incoming administration's transition team is screening names. Two departments are on the table: one burns in the hand, one gathers dust. The highlight of the appointment track — or the moment you get politely placed in a display case.",
        brief: {
          lede: "A call from the transition team: the president-elect wants to talk to you about a department.",
          known: [
            "An interview is not an appointment — they are talking to four people at once.",
            "Two departments on the table: one holds the money and the cameras, one holds the archives and the cemeteries.",
            "Nobody watches a cold desk's budget. Which is exactly how you get things done quietly.",
            "The day your name enters the list, your party, your district and your donors all call."
          ],
          rumor: [
            "The hot desk already has a chosen name. You are there for the record.",
            "The last cold-desk secretary used the archives to become majority leader."
          ],
          unknown: [
            "Whether in six months the appointment reads as an achievement or a nobody-remembers.",
            "Accepting means leaving the district — handed to a stranger."
          ],
          terms: [
            { k: "Cold Desk", v: "A department with almost no press attention or budget power." }
          ]
        },
        choices: [
          {
            id: "hot_seat",
            text: "Go after the hot department",
            note: "Spotlights, budgets, and a battlefield every single day. Positions like this make cabinet secretaries — or burn them. It depends on the first hundred days.",
            outcomes: {
              crit: { body: "You enter the department. On announcement day your name lands in the second paragraph of every newspaper in the country — the first paragraph is always the president-elect's. The next six months air live. Time writes them." },
              ok: { body: "The appointment is announced: you take the hot desk. Congratulations calls ring from two in the afternoon until eleven at night." },
              meh: { body: "You got an appointment — the deputy one. The secretary is the coalition-balancing pick; you are the professional guarantee. Well: the credit rarely reaches you, and neither does the blame." },
              fail: { body: "Three rounds of interviews, and the final call goes to someone else. The official word is timing. Your name sat on the list for nineteen days and traded for nothing." },
              critfail: { body: "During the interviews your precinct captains turn you might leave into it is decided, and district service stalls for two weeks. The appointment never comes. The newspaper gets there first, and writes about your empty office." }
            }
          },
          {
            id: "cold_seat",
            text: "Take the cold desk: the place nobody watches",
            note: "Everyone assumes it is an exile. Records, personnel, the budget's side doors — they all run through the cold desks. Provided you can endure the years nobody remembers you.",
            outcomes: {
              crit: { body: "You take the department everyone pities. The president-elect goes silent for two seconds on the phone: an interesting choice. You learn later that those two seconds are when he decided to trust you." },
              ok: { body: "A cold-desk appointment draws no protest, because nobody cares. You move into the office. There are more filing cabinets than people." },
              meh: { body: "You are sworn in. The paper describes your new post in seven words, three of them punctuation." },
              fail: { body: "Word leaks that you asked for the cold desk, and the rivals write it up as proof of a man with no ambition left. You are not even in yet, and the political obituary is drafted." },
              critfail: { body: "Even the cold desk is not clean. In your third month you find it: a disappeared program fund the last secretary buried. It is yours now. So is the problem." }
            }
          },
          {
            id: "decline",
            text: "Decline: stay in your own corner",
            note: "Appointments are given by other people. The district is yours. Refusing means some will never call you again — and others will never forget you.",
            outcomes: {
              crit: { body: "You decline, with one reason: my district came through a disaster and an election. I cannot leave it now. Years later the president-elect quotes that line in a speech — as the example of what responsibility means." },
              ok: { body: "You stay where you are. The district learns what you turned down — that kind of thing cannot be kept quiet, and there is no reason to try." },
              meh: { body: "The voice on the phone says understood, and the tone holds none of it. You go back to your office. Everything is as it was." },
              fail: { body: "The day after your polite no, two of your bills stall in committee. No reason given. No reason needed." },
              critfail: { body: "Your refusal is written up as a posture; your staying, as a ceiling. Four years later you remember that phone call — from an even colder office." }
            }
          }
        ]
      },

      /* ====================================================================
       * 6) car2_cabinet_after — month seven of the appointment
       * ================================================================== */
      {
        id: "car2_cabinet_after",
        title: "Six months in, the appointment comes up for reckoning",
        body: "That phone call half a year ago put you here. Now the accounts settle: is this job better than you thought, or colder?",
        brief: {
          lede: "The honeymoon of an appointment lasts six months. Today is the first day of month seven.",
          known: [
            "The novelty is over. Produce results, or your name moves into the to-be-optimized column.",
            "The job as it actually airs: calendars, staffers, and how the president-elect chooses to remember you.",
            "District business keeps piling up. Your precinct captains stopped by exactly once — to talk about the weather."
          ],
          rumor: [
            "Your department appears on a reorganization list — slated for a merger.",
            "The president-elect has asked twice, privately: what is that person actually doing?"
          ],
          unknown: [
            "Whether this appointment ends up a verb or a footnote.",
            "How wide the road home through your district still is."
          ]
        },
        choices: [
          {
            id: "double_down",
            text: "Double down: make this department your own hill",
            note: "The real test starts after the honeymoon. Only people who survive month seven get to say the word record.",
            outcomes: {
              crit: { body: "A pilot project nobody noticed produces results the whole state watches. The cold-desk law holds again: where nobody looks, every win is yours." },
              ok: { body: "You get the department running straight. Upstairs, your name goes down — not the spotlight kind of note. The reliable kind." },
              meh: { body: "Another even year. Evenness counts as a virtue in a tenure and as an illness in an ambition." },
              fail: { body: "The budget office cuts your proposal in half. The department is still yours. The proposal is not." },
              critfail: { body: "The month-seven hearing is your Waterloo: three numbers you could not answer make three different pages the next morning." }
            }
          },
          {
            id: "eye_exit",
            text: "Pave the way out: keep the district road open",
            note: "Appointments are rented; districts are owned. Fly home every two weeks. The captains' coffee matters more than the department's.",
            outcomes: {
              crit: { body: "You make the flight home a routine. The department mocks you as the commuting secretary — until the election year, when everyone notices the only name still alive in the district is yours." },
              ok: { body: "The precinct captains warm right up. You run both ends, and neither end has closed on you." },
              meh: { body: "The visits home keep up. Barely. The district stays polite — politely enough to unnerve you." },
              fail: { body: "Department meetings will not release you; district fundraisers cannot wait for you. Head-shaking starts on both sides." },
              critfail: { body: "A staffer leaks your present-in-body, absent-in-spirit routine to the press: The Secretary's Next Job. The president-elect reads it and asks one question: he wants to leave?" }
            }
          }
        ]
      },

      /* ====================================================================
       * 7) car2_burnout — the body files a motion first
       * ================================================================== */
      {
        id: "car2_burnout",
        title: "You sat in the parking lot forty minutes, unable to make yourself get out",
        body: "Your body has filed a motion ahead of your calendar. Push through, step back for half a pace, or hand it to one person you trust. You have to pick one.",
        brief: {
          lede: "Today you sat in the parking lot for forty minutes because you could not remember why to get out of the car.",
          known: [
            "Four hours of sleep a night, months running. The engine is coffee and momentum.",
            "The body now decides things: the hand shakes, the mind slips, you call a donor by the wrong name.",
            "The next thirty days of calendar hold no open slot for anyone with no one else in the room.",
            "Nobody pities tired in this circle. A hundred people line up to be tired for you."
          ],
          rumor: [
            "Some former office-holder checked into a sanitarium twice. Kept secret as state business.",
            "A rival watched you breathing hard outside a venue. No sympathy in the note — just a calendar."
          ],
          unknown: [
            "The day your body presses stop for you, and what shape it takes.",
            "Whether what you set down is stored for you or divided up."
          ]
        },
        choices: [
          {
            id: "push",
            text: "Push through: everyone suffers this way",
            note: "You will not admit it. Same calendar, double coffee. Survive it and this becomes legend; lose it and it becomes a medical chart. Your body will make the choice.",
            outcomes: {
              crit: { body: "You held. Somewhere in the exhausted dark your mind goes startlingly clear, and you close a deal that sat shelved for half a year. There really are iron men inside the machine." },
              ok: { body: "You get through the season. The price is two more upward arrows on the physical report." },
              meh: { body: "Holding, only holding. Everything gets done; nothing gets done well." },
              fail: { body: "For one second on a live call you go completely blank. One second is enough for a clip and not enough for the news — but your team saw it." },
              critfail: { body: "You collapse in front of a full chamber. When you wake, the hospital room holds two flower baskets, a draft statement, and a man already acting in your place." }
            }
          },
          {
            id: "step_back",
            text: "Step back: six months off the front, officially for family",
            note: "The public reason must always be family. The space you leave gets taken. When you return, both the seat and the scale will read differently.",
            outcomes: {
              crit: { body: "You come back after half a year. A man who has slept a full night sees things three times as clearly as the clarity the exhausted fake. People start saying it: he is a different man — in the good way." },
              ok: { body: "You rested. The breath came back. The position holds, though two new faces now stand beside it." },
              meh: { body: "Those months are quiet in the frightening way. No bad news. No news." },
              fail: { body: "The ground you gave up was divided up clean. On your first day back, your office is the smaller one." },
              critfail: { body: "Across your half year of family reasons, a rival worked your district and a peer canvassed your donors. You came back — to an empty chair." }
            }
          },
          {
            id: "confide",
            text: "Tell one person: share the weight",
            note: "One real ally — family, an old friend, your chief of staff. Not a retreat. Just no longer carrying it alone. The moment it leaves your mouth, it is half as heavy.",
            outcomes: {
              crit: { body: "That night you say all of it. No advice comes back — just someone listening, and then quietly taking part of your calendar onto their own plate. You sleep a full night for the first time in seven months." },
              ok: { body: "You said it out loud. Nothing about the job changed. But you are carrying it in the right posture now." },
              meh: { body: "The listener is sympathetic and just as stuck — buried under a load of their own." },
              fail: { body: "Your confession gets read as a weakness signal. Within a week, two allies' attitudes shift in ways you can feel but cannot name." },
              critfail: { body: "What you said becomes table talk somewhere else. Corridor laughter stops when you come near. It is the coldest day since you entered politics." }
            }
          }
        ]
      },

      /* ====================================================================
       * 8) car3_first_hearing — the first time you hold the gavel
       * ================================================================== */
      {
        id: "car3_first_hearing",
        title: "You Preside Over Your First Real Hearing",
        body: "The party hands you the chair for a small hearing: whether the local plant keeps its license. {PUB} sends one reporter. The room is not full, and every person in it is carrying a livelihood or a wallet.",
        brief: {
          lede: "Your first time in the chair teaches you how hard it is to get a room to shut up and listen.",
          known: [
            "The plant employs dozens of local families who eat from that license; the shops across the street want it revoked.",
            "You memorized roughly half the procedure. When to bang the gavel, who speaks first — improvise.",
            "Someone behind you wants to see if you can land the plane. Someone else is waiting for the crash."
          ],
          rumor: [
            "Word is the plant should have closed for pollution long ago — the owner is just tight with the town.",
            "Word is the far end of that license connects to next cycle's donations."
          ],
          unknown: [
            "Whether this is your first signpost or your first scar."
          ],
          terms: [
            { k: "Local Hearing", v: "A public session where an agency takes comment. The grassroots training ring." }
          ]
        },
        choices: [
          {
            id: "fair",
            text: "Run it fair: everyone finishes, then vote by the rules",
            note: "The truest test of touch. Hold the room and you are a fixer; lose it and you lose it in public.",
            outcomes: {
              crit: { body: "You run a hair-trigger hearing in {CITY} so cleanly that the local paper writes you are steadier than some who have done this ten years." },
              ok: { body: "Procedure by the book, the vote on schedule. Nobody finds a fault." },
              meh: { body: "You got the meeting finished. Unremarkable — like it never happened." },
              fail: { body: "The room spun out of control. You could not stop the man slamming his table, and your gavel banged at nothing." },
              critfail: { body: "The hearing turns into a stew. Next day the society page runs the headline: He Cannot Run a Room." }
            }
          },
          {
            id: "deliver",
            text: "Deliver the result for the plant and bank the business backing",
            outcomes: {
              crit: { body: "The license renews as if it were the natural order. Business owes you a real favor, and your card now gets past the door of the town club." },
              ok: { body: "The job gets done — but someone caught the little you did up at the chair." },
              meh: { body: "The steering was clumsy. Neither side buys it." },
              fail: { body: "The reporter writes your pre-meeting lunch with the owner right into the story." },
              critfail: { body: "Who put money in his pocket gets named to the letter. That plant's sign becomes the placard held up at every event you attend." }
            }
          },
          {
            id: "defer",
            text: "Stay clean: push the decision to a full-committee vote",
            outcomes: {
              crit: { body: "You extract yourself spotless. Nobody can hang the blame on your coat." },
              ok: { body: "Took no credit, carried no blame. A quiet pass." },
              meh: { body: "You lent your name to the chair, moved nothing, broke nothing." },
              fail: { body: "The impression of a man who will not pull the trigger settles quietly into your colleagues' minds." },
              critfail: { body: "The meeting crashes, and everyone goes around asking: who sat in the chair today?" }
            }
          }
        ]
      },

      /* ====================================================================
       * 9) car3_party_errand — a favor the machine cannot put in writing
       * ================================================================== */
      {
        id: "car3_party_errand",
        title: "The Machine Hands You an Errand That Leaves No Name",
        body: "A party elder ({ORG}) asks you to say the word — or kill one bill — in a room the establishment cannot be seen in. Land it and your coordinates inside the machine move one notch. Botch it and your hands take the dirt while the credit goes elsewhere.",
        brief: {
          lede: "The way machines hand out candy is often to hand you an errand first — awkward to do, awkward to refuse.",
          known: [
            "No paperwork, no authorization. Just one phrase: you know how it is.",
            "Take it and you enter yourself into a ledger nothing is ever written in.",
            "Refuse, and next time the party weighs pushing you up, it remembers today's no."
          ],
          rumor: [
            "Word is the bill was floated to test the water and was always meant to die.",
            "Word is whoever blocks it has a private reason — just counting who obeys."
          ],
          unknown: [
            "Whether the machine files you as dependable or as useful."
          ],
          terms: [
            { k: "Inside Sponsor", v: "Hidden capital: someone who speaks for you in the rooms that count." }
          ]
        },
        choices: [
          {
            id: "run_it",
            text: "Run it for the party: owe the favor, enter the room",
            note: "One step onto the fast lane — and one line in a ledger that can never be disclosed.",
            outcomes: {
              crit: { body: "You pull it off clean, no tracks. The elder names you in a room that matters, and the machine starts treating you as one of its own." },
              ok: { body: "You take the errand. You earn a back channel and real standing in the party — and one ledger that cannot see daylight." },
              meh: { body: "It gets done. The doing of it makes your skin crawl." },
              fail: { body: "The job falls through, but your name shows up on the list of middle men." },
              critfail: { body: "They push you out front as the shield — the only man standing there with no official cover." }
            }
          },
          {
            id: "half",
            text: "Half-run it: strike the pose, never touch the dirtiest part",
            outcomes: {
              crit: { body: "You neither botched the job nor sacrificed yourself. Both sides file you under someone who understands." },
              ok: { body: "You kept three-tenths in reserve. The job is deliverable and the hands stay dry." },
              meh: { body: "You sat on the wall. Neither side handed you anything." },
              fail: { body: "Neither helping nor refusing — both sides read right through you." },
              critfail: { body: "You tried to hold cards and got stamped unreliable. The machine stops entrusting you with things." }
            }
          },
          {
            id: "refuse",
            text: "Refuse: I do not keep ledgers that leave no names",
            outcomes: {
              crit: { body: "You stay clean. Years later, the line that he never ran unnamed errands becomes the footnote to your record." },
              ok: { body: "You did not touch the water. You may owe a few grudges tonight; the books stay clean." },
              meh: { body: "You refused. The water is flat. Nobody remembers the refusal." },
              fail: { body: "You said no too bluntly, and it reached the ears of a man still hoping to use that ladder." },
              critfail: { body: "You not only refused — you nearly talked your way out. Now the rooms that count stop calling you." }
            }
          }
        ]
      },

      /* ====================================================================
       * 10) car3_profile — the local paper wants a day with you
       * ================================================================== */
      {
        id: "car3_profile",
        title: "The Local Paper Runs a Rising-Star Profile of You",
        body: "A reporter from {PUB} rides with you all day — from a {MEET} to cold coffee at a diner in the evening — to write one story: a new local face. Half of how it reads is in his pen. The other half was your day.",
        brief: {
          lede: "For the first time someone seriously wants to write you up as a character. A step up — and a target painted.",
          known: [
            "The same local pen can lift you into a tomorrow star or write you as a rookie in over his head.",
            "A ride-along means every sentence you say is a sentence they can quote.",
            "Some in the party like this. Some mutter the word showing off."
          ],
          rumor: [
            "Word is the reporter walks close with your rival too.",
            "Word is he needs one piece that can travel to the state capital. You walked into it."
          ],
          unknown: [
            "Whether this is the start of your name or future opposition research."
          ],
          terms: [
            { k: "Profile Piece", v: "Ride-along reportage: an impression built from details and quotes." }
          ]
        },
        choices: [
          {
            id: "open",
            text: "Open up: tell the truth, tell {CITY}'s story, show a soft spot",
            outcomes: {
              crit: { body: "The hometown story you tell moves people. On the day it runs, the label that sticks is one of us." },
              ok: { body: "The piece is fair and warm. People around town start knowing your face." },
              meh: { body: "An even piece — two compliments, then he turned the page." },
              fail: { body: "You oversold. The reporter noted down one or two lines that can be replayed against you later." },
              critfail: { body: "The reversal — rising star, but what has he actually done? — runs up front. Your soft spot is the headline." }
            }
          },
          {
            id: "spin",
            text: "Stay on message: watertight answers, zero memory points",
            outcomes: {
              crit: { body: "You give the reporter nothing he can break. The story is safe. Forgettable, but safe." },
              ok: { body: "A piece nobody can fault — or remember." },
              meh: { body: "The reporter writes tiredly. There is simply nothing to write." },
              fail: { body: "He hears the polish through every quote, and the copy carries a smirk between the lines." },
              critfail: { body: "Your talking points get cited as exhibit A for hollow. Photo and all, it plays as a joke." }
            }
          },
          {
            id: "decline",
            text: "Dodge the piece: decline the ride-along",
            outcomes: {
              crit: { body: "You refuse the setup. The reporter ends up writing the man who would not be written — which quietly builds you a low-profile, clear-headed brand." },
              ok: { body: "The piece dies. You save yourself the verbatim risk and keep the habit of not being pushed by a camera." },
              meh: { body: "The reporter is a little annoyed, but he does not really write about you." },
              fail: { body: "Declining the interview is itself noted down. The piece gains one loaded sentence." },
              critfail: { body: "He writes it anyway. The headline: He Does Not Want This Written." }
            }
          }
        ]
      }
    ]
  }
});
