/* ============================================================================
 * CONTENT · i18n/en/lines/120-line-1991-94.js
 * 中文文件 content/events/120-line-1991-94.js 的英文覆盖层（w01 / B1 带）。
 *
 * 契约（同 i18n/en/events/106-era-1990.js）：
 *   · 事件按 id 定位；choices / terms 按 id 对齐。
 *   · 纯字符串数组（known / rumor / unknown / terms）为整体替换，必须整条给全。
 *   · 结构性键由引擎保护，本文件一个不写。
 *   · 英文按习语重写：第二人称、现在时、短句；机构名用真实英文。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "ln91_ussr",
        title: "The red flag comes down over the Kremlin",
        body: "Gorbachev resigns on television. In one document the Soviet Union stops existing. Forty years of standoff,\n" +
          "closed out overnight — the end of history is on every magazine cover.\n" +
          "But the line at the local gas station has not moved, and the plants keep shipping out. Cable crews are hunting\n" +
          "across the country for a face to say what victory means. The Eastern European neighborhood wants a thanksgiving rally — they all thought of you.",
        brief: {
          lede: "History rarely presses a tailwind like this into your hands. The trick is saying it plainly, and being remembered for it.",
          known: [
            "The Soviet Union has formally ceased to exist. The warheads remain, but no government claims them.",
            "The local Eastern European neighborhood is planning a thanksgiving rally. They need a man with a title on the platform.",
            "Cable crews are booking local officials everywhere: reaction shots, what does victory mean?"
          ],
          rumor: [
            "Some say the hardliners in Moscow could reverse all of this any day.",
            "Some say the cut defense budget lands in your district this fiscal year."
          ],
          unknown: [
            "Whether this check still clears in five years.",
            "The empty seat across from you will not stay empty forever."
          ],
          terms: [
            { k: "USSR dissolved", v: "December 1991: the Soviet Union formally ceases to exist." }
          ]
        },
        choices: [
          {
            id: "victory",
            text: "Take every camera. Deliver a national address: freedom won",
            note: "The bet: the victory story shelters you for years. The risk: say it all, and every future mess counts as something you predicted.",
            outcomes: {
              crit: { body: "Your speech is cut into the year-end review — the great moment and your face, side by side. When a bigger seat opens a year later, your name is the first one mentioned." },
              ok: { body: "You say it well, and it sticks. Pundits start calling you a man for the big moment." },
              meh: { body: "The whole country watches the same victory line. Yours disappears inside it." },
              fail: { body: "Columnists call your speech smug. But the wind is at your back — nobody really minds." },
              critfail: { body: "You turn the celebration into a ledger of your own merits. Someone mutters: what has he actually done? Nobody picks it up. Not this week." }
            }
          },
          {
            id: "dividend",
            text: "Chase the peace dividend: trade tanks for local schools and jobs",
            note: "The bet: the dividend wins hearts. The risk: say it too early and the arms contractors collect principal plus interest.",
            outcomes: {
              crit: { body: "You make the enemy is gone, the bill is not street consensus. The base and the unions endorse you together." },
              ok: { body: "The dividend framing catches on because you said it. Voters nod; the defense firms frown." },
              meh: { body: "You raised the dividend. Everyone is still celebrating. Nobody noticed the money." },
              fail: { body: "The contractors' lobbyists file you under unfriendly. The moment is too bright for it to matter." },
              critfail: { body: "The county paper mocks your cuts as disbanding the victory. It stings. That is all." }
            }
          },
          {
            id: "vigil",
            text: "Go only to the neighborhood vigil. Read the names of their families aloud",
            note: "The steady move: no cameras grabbed, no judgment gambled. The community remembers you came.",
            outcomes: {
              crit: { body: "Midway through the list you stop and repeat one line in their language. The church and the neighborhood remember that detail." },
              ok: { body: "You stand there until the end. Decorous. Enough." },
              meh: { body: "You came. The crowd is too full; nobody picks you out." },
              fail: { body: "You look out of step among the mourners. Nobody faults you. Nobody notices you either." },
              critfail: { body: "A quiet night. A vigil like this cannot go wrong." }
            }
          }
        ]
      },
      {
        id: "ln92_riots",
        title: "The officers who beat Rodney King walk free. Los Angeles burns for six days",
        body: "Four officers, caught on tape beating a black motorist, are found not guilty. Hours after the verdict Los Angeles erupts.\n" +
          "Six days. More than fifty dead. A billion dollars in flames. National Guard armored vehicles roll down the boulevards.\n" +
          "Live television feeds a burning city into every living room. Your city is not burning. But on every street people are waiting for a word — yours.",
        brief: {
          lede: "Once the fires start, silence is a statement and so is speech. Both get recorded.",
          known: [
            "The beating ran nationwide a thousand times. The verdict: not guilty on all counts.",
            "Looting and arson, day after day. Fire crews now roll with police escorts.",
            "The black churches and the merchants' association in your district are both waiting for your first sentence."
          ],
          rumor: [
            "Shop owners have already formed their own patrols.",
            "The fires were set by looters, not by the verdict."
          ],
          unknown: [
            "Whichever way the anger on these streets flows.",
            "What your statement today is worth in votes."
          ],
          terms: [
            { k: "LA riots", v: "Six days of unrest after the Rodney King acquittals." }
          ]
        },
        choices: [
          {
            id: "march",
            text: "Condemn the verdict publicly. Stand with the angry neighborhood, on the street",
            note: "The bet: the streets trust you personally. The risk: if it gets out of hand, the fire turns on you.",
            outcomes: {
              crit: { body: "You stand before the crowd and say what they cannot. The anger does not come for the cameras. Among the white faces that dared to come, they remember yours." },
              ok: { body: "You showed up and spoke. The community takes the point. The mainstream mutters." },
              meh: { body: "You said the fair thing. The crowd is too loud; your words travel ten yards." },
              fail: { body: "A store burns the night you appear. Someone points: he stirred this up." },
              critfail: { body: "One line of yours, filmed before the flames, is cut into an incitement sample. Federal investigators start taking appointments." }
            }
          },
          {
            id: "order",
            text: "Back order first: the shopkeepers and the Guard. Extinguish the fires, then discuss the verdict",
            note: "The bet: voters fear chaos more than injustice. The risk: the community's door closes on you for good.",
            outcomes: {
              crit: { body: "You give voice to frightened shopkeepers. The chamber of commerce and the suburbs make you one of theirs. The donation calls queue up." },
              ok: { body: "You take the order side. Merchants relax; the streets brand you the man who only sees burnt shops." },
              meh: { body: "Your statement pleases no one. Both sides think you missed the point." },
              fail: { body: "While people are still coming out of burning buildings, you worried about stores. The churches write that sentence down." },
              critfail: { body: "Your recording urging the army to clear the streets runs all week on black radio. Local politics files you that night." }
            }
          },
          {
            id: "relief",
            text: "Say nothing about the verdict or the arson. Just run mutual aid and rebuilding for the neighborhood",
            note: "The path that lands on no side: the work gets done; the cameras find someone else.",
            outcomes: {
              crit: { body: "Your relief desk runs six straight days. The out-of-stock get supply, the roofless get beds. Neither side finds a fault in you." },
              ok: { body: "You did the work. The volunteers by the fire line remember you carrying cases of water." },
              meh: { body: "You are busy handing out supplies. The big historic words do not need you. You do not care." },
              fail: { body: "Rebuilding money arrives too slow. Someone curses: all blankets, no justice." },
              critfail: { body: "A glitch at the distribution point. The paper calls it all work, no leadership. That is all." }
            }
          }
        ]
      },
      {
        id: "ln93_wtc",
        title: "A yellow truck blows a hole in the base of the World Trade Center",
        body: "A rented yellow truck loaded with explosives drives into the World Trade Center's underground garage and detonates on schedule.\n" +
          "Floor slabs punch downward. Six dead, over a thousand in hospitals, Manhattan dust in everyone's throat.\n" +
          "Terrorism has touched the heart of American commerce for the first time. The country is stunned. And in your town the Arab and South Asian shopkeepers are suddenly the suspects — they want to see whether you will speak.",
        brief: {
          lede: "A warning shot nobody treats as one yet. You may say unprecedented. No one dares say there will not be a next time.",
          known: [
            "The towers themselves were the target. The plotters wanted collapse; they got a hole in the foundation.",
            "Suspects are still at large, with a federal bounty. Rental records are being pulled nationwide.",
            "Middle Eastern shops in your district face a boycott and hard stares. The merchants signed a letter asking you to appear."
          ],
          rumor: [
            "A second van full of explosives is somewhere outside the city.",
            "The feds actually know nothing."
          ],
          unknown: [
            "Whether this warning shot was the last one.",
            "The bill for playing the safety card comes later."
          ],
          terms: [
            { k: "WTC bombing", v: "February 1993: a car bomb in the north tower's garage." }
          ]
        },
        choices: [
          {
            id: "harden",
            text: "Play safety: demand broader police powers. Watch the suspicious communities",
            note: "The bet: fear delivers votes. The risk: someday someone totals up the categories you made.",
            outcomes: {
              crit: { body: "Your zero-tolerance line tops the local paper. Washington starts treating you as a man who understands security. The invitations and the nominations are on the road." },
              ok: { body: "You speak tough into the anxiety. Most nod. A few memorize your face." },
              meh: { body: "The security chorus is too crowded. Your voice gets drowned by louder ones." },
              fail: { body: "One name on your watch list was a local shopkeeper, proven a pure mistake. He carried your name to a hearing room that national television covered." },
              critfail: { body: "Your words are cut into an ad: he backed racial listings. Even the establishment hurries to cut you loose." }
            }
          },
          {
            id: "shield",
            text: "Stand up for the suspected community. Hold a solidarity gathering, end the boycott",
            note: "The bet: people remember who shielded them. The risk: this gets recut as him doubting America.",
            outcomes: {
              crit: { body: "At the gathering the shopkeepers surround you to give thanks. The photo runs on the evening paper's front page: this is what an American town looks like." },
              ok: { body: "You protect the local shops; they owe you for it. Mainstream opinion adds one murmur about you." },
              meh: { body: "The meeting happened. The tea got cold. Nobody lost anything." },
              fail: { body: "Speaking for the suspected gets reversed into: who is he speaking for? Letters from the veterans arrive at your office." },
              critfail: { body: "The group photo becomes a leaflet: friend of the terrorists. Your phones are tied up for two weeks." }
            }
          },
          {
            id: "drill",
            text: "Take neither side. Push local emergency drills and port inspections",
            note: "Move the subject from identity to technique. Working is the steadiest step — and earns nobody's memory.",
            outcomes: {
              crit: { body: "The state copies your who-came-in-through-which-door plan. In expert circles people start saying there is an official who knows the field." },
              ok: { body: "You got the drills and the patrols going. Not a headline. Not a watch list." },
              meh: { body: "Your report lies quietly in a cabinet. The world keeps being tense." },
              fail: { body: "No more blasts, no more news. People call it tax money spent being scared." },
              critfail: { body: "The budget audit pokes at the drill contracts. Someone asks where the money went. It does not hurt. But it is dirty." }
            }
          }
        ]
      },
      {
        id: "ln93_waco",
        title: "The Waco compound burns to white ash before dawn",
        body: "Fifty-one days of standoff between a Texas religious compound and federal agents. A gunfight, tear gas, failed talks —\n" +
          "then before dawn on April 19 the fire takes everything: seventy-plus bodies, more than twenty of them children.\n" +
          "The talk shows fight about it for two weeks. Justice Department hearings are calendared. Every elected official is asked the same question: a tragedy of law enforcement, or a crime of government?",
        brief: {
          lede: "The ash is still warm and the argument is already burning. Who gave the order? Who should have blocked it?",
          known: [
            "Agents died and were wounded in the first raid. The final assault came at five in the morning.",
            "Survivor testimony and the official account do not match. The files are not public.",
            "The memorial service and the pro-law-enforcement rally are booked in the same week. Both invited you."
          ],
          rumor: [
            "The compound's weapons cache was reported before anyone checked it.",
            "The sect set the fire itself. Not the government's fault."
          ],
          unknown: [
            "This spark will smolder, to burn somewhere else later.",
            "The metal of the side you pick today."
          ],
          terms: [
            { k: "Waco siege", v: "The compound burned after a 51-day standoff." }
          ]
        },
        choices: [
          {
            id: "probe",
            text: "Demand an independent investigation. Name every link in the enforcement chain",
            note: "The bet: the public already thinks the government pulled too hard. The risk: from now on you are the man against his own police.",
            outcomes: {
              crit: { body: "Your line-by-line questioning is broadcast nationwide. The one who asks the questions becomes your label. A seat on the commission is kept warm." },
              ok: { body: "You make procedural questions loud. Justice hates you. The press likes you." },
              meh: { body: "Your request for an inquiry is filed with the rest, for presence. Unread." },
              fail: { body: "The department nails your questioning down as amateur smear of law enforcement. Colleagues start crossing the street." },
              critfail: { body: "One document you cited is disproved. The questioner becomes the questioned." }
            }
          },
          {
            id: "shield",
            text: "Stand firm: the sect destroyed itself. Federal officers are not on trial",
            note: "The bet: the establishment and the police world pay back. The risk: vouching for a fire that still smokes.",
            outcomes: {
              crit: { body: "At the hearing you take the microphones away from the agencies' critics. Inside the departments your name goes into the one-of-us memo." },
              ok: { body: "You backed the agencies. The upper floors are pleased. The angry public puts you on the comparison poster." },
              meh: { body: "Your defense reads like a press release. The agencies do not notice; the public gets tired first." },
              fail: { body: "New photographs are released. Your firm stance lands on the ugliest timestamp." },
              critfail: { body: "While the children burned he applauded — the line follows you into the next polling place." }
            }
          },
          {
            id: "mourn",
            text: "Not one word about institutions. Speak only for the departed, at the memorial",
            note: "The steadiest way not to answer the question: no mistakes, nothing saved up either.",
            outcomes: {
              crit: { body: "You read the children's names at the memorial and touched no blame. Both sides call you decent." },
              ok: { body: "You sent the wreath and gave the eulogy. You pass quietly." },
              meh: { body: "You attend, you leave. Your face never appears on the tape." },
              fail: { body: "Someone says that reading names at a time like this is the same as doing nothing." },
              critfail: { body: "Your mourning looks like canvassing. The families ask you to leave the front row. An hour of shame, no wound." }
            }
          }
        ]
      },
      {
        id: "ln93_somalia",
        title: "Two Black Hawks go down on the streets of Mogadishu",
        body: "A raid to seize one warlord's aides becomes a night of street battle: two Black Hawks shot down by rocket-propelled grenades,\n" +
          "troops carrying their dead out through gunfire. On television worldwide, an American soldier is dragged through the sand. Eighteen young men did not come home.\n" +
          "A year ago everyone asked: if we do not act, where is the line? Today everyone asks: why did they die there? These questions are landing on every elected official.",
        brief: {
          lede: "A short battle becomes a long film. The public wants someone accountable; the families want someone back.",
          known: [
            "The target was a few aides of one warlord. The cost was one night of battle and the footage.",
            "The White House is already discussing withdrawal. The European peacekeepers waver with it.",
            "Two military families in your district, and the recruiting office, took calls in the night."
          ],
          rumor: [
            "Some prisoners are still alive, being traded.",
            "The real target was the money behind the embassy bombings."
          ],
          unknown: [
            "It will be forgotten quickly. Until the next attack.",
            "What you say today will be quoted tomorrow."
          ],
          terms: [
            { k: "Black Hawk Down", v: "October 1993: the Mogadishu raid goes wrong on camera." }
          ]
        },
        choices: [
          {
            id: "bring",
            text: "Demand full withdrawal now. End the business called nation-building",
            note: "The bet: war-weariness is your vote. The risk: next time something happens, the account for not fighting includes you.",
            outcomes: {
              crit: { body: "Bring our boys home becomes the slogan of the anti-intervention camp. The military families and the neighborhood's votes come in together." },
              ok: { body: "You argue for withdrawal, and argue it earnestly. The doves are content; the hawks open a tab in your name." },
              meh: { body: "You shouted withdrawal. The policy was already sliding that way. No credit for you." },
              fail: { body: "Your opponent cuts it into: talking surrender over the bodies. The veterans' groups turn against you in public for the first time." },
              critfail: { body: "Mid-debate another squad is ambushed. The public needs a scapegoat. You win it." }
            }
          },
          {
            id: "hold",
            text: "Hold the mission. Pulling out says they died for nothing",
            note: "The bet: never show weakness is old grammar that still works. The risk: the polls say it no longer does.",
            outcomes: {
              crit: { body: "Amid the withdrawal noise you hold your line. The hawks and the Pentagon register your name among the usable." },
              ok: { body: "You take the hard side. The upper floors nod; the television audience boos." },
              meh: { body: "You talk tough. The country is done listening to anything about Somalia." },
              fail: { body: "The public wants out; your stand reads as spending other men's sons on your own image." },
              critfail: { body: "Another soldier goes up the ramp of the returning transport, cameras fixed on your refusal to leave." }
            }
          },
          {
            id: "home",
            text: "Do not debate grand strategy. Fix the two military families' business in your district first",
            note: "Answer a national question with a private one: no error, no courage either.",
            outcomes: {
              crit: { body: "You spend the week on funerals, compensation, and the children's tuition. At the memorial those two families shake hands for you." },
              ok: { body: "You appeared where you should and did what you could. The military community notes it." },
              meh: { body: "You are doing work. The cameras are on someone else. All quiet." },
              fail: { body: "One family thinks you came too late. The line spreads: he only mourns the ones who voted." },
              critfail: { body: "The compensation file sticks in some bureaucratic drawer. The family names you in the paper. Unfair, and it stings." }
            }
          }
        ]
      },
      {
        id: "ln94_northridge",
        title: "At four in the morning, a freeway overpass falls across Los Angeles",
        body: "A 6.7 quake splits the Northridge area on a Monday before dawn: whole spans of overpass on the ground, hospital walls cracked,\n" +
          "fifty-plus dead, damage running toward tens of billions. Afterward the insurance industry simply withdraws earthquake coverage from the state.\n" +
          "Relief money, the hole insurance left, and the warning that the big one is still coming — all of it lands on the table at once.",
        brief: {
          lede: "Quakes do not respect election years. The rebuilding money and the blame, in the end, are settled by the living.",
          known: [
            "Federal relief is being approved. The process is long. Your shelters cannot wait.",
            "Insurers stop selling earthquake policies statewide. Homeowners queue for nothing.",
            "Under your watch: shelters short of people, of water, of engineering crews."
          ],
          rumor: [
            "The relief money is already allotted. Whoever shouts loudest gets paid first.",
            "This was only the foreshock. The main one has not come."
          ],
          unknown: [
            "Your relief record cashes in at the next election, with interest.",
            "Whether the insurance hole bites your funders or you."
          ],
          terms: [
            { k: "Northridge quake", v: "January 1994: a strong quake hits the Los Angeles metro area." }
          ]
        },
        choices: [
          {
            id: "build",
            text: "Grab the rebuild. Run the emergency contracts yourself. Put the jobs back in the district",
            note: "The bet: money spent where voters can see it. The risk: somebody will read the contract ledgers out loud.",
            outcomes: {
              crit: { body: "The fallen bridge rises before anyone remembers it fell. On the ribbon-cutting stage you are the man who gets things done. Contractor money and name, both." },
              ok: { body: "The money flows to your people. Local jobs; voters watch work being done. You spent a dollar and got seventy cents back." },
              meh: { body: "You ran front and back; the appropriation stuck at the state capitol. Your expenses sank with it." },
              fail: { body: "A contractor leaks your dinner with the rebuilding firms to the paper. Profiting from disaster is hung around your name for the first time." },
              critfail: { body: "Prosecutors pull the emergency contracts. Your name is circled in the first batch." }
            }
          },
          {
            id: "insure",
            text: "Fight the legislation. Force the insurers back. A state earthquake fund",
            note: "The bet: homeowners' rage is big enough. The risk: the funders' checks get bigger in the opposite direction.",
            outcomes: {
              crit: { body: "Your fund draft becomes the legislative template. The man who slammed the table at the insurance companies goes statewide." },
              ok: { body: "The bill clears first reading. The industry hires lobbyists to watch you." },
              meh: { body: "Your draft sits in a committee drawer. Nobody opposes it. Nobody moves it." },
              fail: { body: "The insurance lobby brands you a populist who does not understand economics. Even your own party's funders give you a hollow laugh." },
              critfail: { body: "The fund draft is found to contain a design with other implications. Both sides say you took the other side's money." }
            }
          },
          {
            id: "helper",
            text: "Neither money nor insurance. Send volunteer crews straight into the shelters",
            note: "Bet your record on sweat: steady, and the ceiling sits right above your head.",
            outcomes: {
              crit: { body: "Your volunteers carry the camp through the worst first week. In the tabloid photograph you queue for coffee with the evacuees." },
              ok: { body: "Tents, blankets, interpreters. You assembled them one by one." },
              meh: { body: "You gave the labor. It leaves no trace. So be it." },
              fail: { body: "A volunteer is hurt on site. Someone asks whether you carried insurance. You did not." },
              critfail: { body: "A sanitation accident at the camp. The paper's word for you: enthusiasm instead of expertise." }
            }
          }
        ]
      },
      {
        id: "ln94_rwanda",
        title: "Rwanda's hundred days: the cables carry lists, the word is never said",
        body: "After one president's plane is shot down, Rwanda kills nearly a million Tutsi and moderate Hutu in a hundred days — mostly with machetes.\n" +
          "The footage sits in every network's edit bay while the White House debates whether it may say the word genocide.\n" +
          "Under Somalia's shadow nobody will send another soldier. In your town, relief groups and refugee families knock on your door. They want you to say one sentence for people without passports.",
        brief: {
          lede: "The horror of this question is its transparency. You know the cost. You can see the lists.",
          known: [
            "The television footage and the refugee testimony in your district corroborate each other.",
            "The United Nations is cutting its force. Nobody utters the word intervention.",
            "The relief groups bring a petition: sign it, stop the slaughter."
          ],
          rumor: [
            "The killing lists are public. Accounts settled name by name.",
            "Speaking now changes nothing anyway."
          ],
          unknown: [
            "The word will not be released until the very end.",
            "History will check your signature later."
          ],
          terms: [
            { k: "Genocide", v: "The deliberate destruction of a people — defined in international law." }
          ]
        },
        choices: [
          {
            id: "word",
            text: "Say the word in public. This is genocide. Demand intervention",
            note: "The bet: history is on your side. The risk: the political bill is handed to you on the spot.",
            outcomes: {
              crit: { body: "You are one of the few who put the word on the record. Parishes and campuses pass you around as the example. Years later, this page is your medal." },
              ok: { body: "You used the word, and took the not-a-diplomat cap with it. Both sides scold, one half each." },
              meh: { body: "Your statement runs on an inside page. The policy circle does not move." },
              fail: { body: "We are not out of Somalia and you want to send troops to Africa? Your opponent writes that question into an ad script." },
              critfail: { body: "The sanctions bill you pushed hits your port's jobs. Your name in the headline: wrecking American paychecks for foreign corpses." }
            }
          },
          {
            id: "relief",
            text: "Humanity without troops: donate, resettle, do everything short of that",
            note: "Spend favors to save people. Not the whole country — one town. On paper, you owe nobody either way.",
            outcomes: {
              crit: { body: "The money you raised and the visas you vouched for save one town's people. In church and charity circles you are the one who answers when it matters." },
              ok: { body: "The resettlement desk opens. Half the money arrives. Half the parties praise you." },
              meh: { body: "You worked the rooms. The donation bag jingles. Not much, not too little." },
              fail: { body: "Refugee placement jams locally. The favors you spent please neither side." },
              critfail: { body: "One resettled man surfaces in an old case. Your kindness gets rewritten as letting wolves in." }
            }
          },
          {
            id: "silent",
            text: "Send a mildly-worded letter of condolence. Touch nothing else",
            note: "The cheapest card to play. Silence is also a decision — one nobody will record for you.",
            outcomes: {
              crit: { body: "The church prints your letter. The wording is exactly right. Nothing happens; nothing is damaged." },
              ok: { body: "The letter goes out, gets filed, and is never mentioned." },
              meh: { body: "You never finish the letter. Nobody is chasing it." },
              fail: { body: "The refugee groups wanted one harder sentence. Your mildness is confronted to your face." },
              critfail: { body: "A reporter totals your records for these months: blank. The headline: what was he doing then?" }
            }
          }
        ]
      },
      {
        id: "ln94_contract",
        title: "Contract with America: the midterms change the House overnight",
        body: "The opposition binds its hundred-day agenda into a booklet called the Contract with America, and rides tax rage and scandal through the midterms:\n" +
          "the party that held the House for decades loses its majority in one night. The Senate flips too.\n" +
          "The wave either hands you a chair or buries you under a new majority's agenda. Your name is printed on the same ballot.",
        brief: {
          lede: "The wave is here. Two choices: get on it, or get out of the way. Neither is free.",
          known: [
            "Referendum anger at the White House is at a record high.",
            "The Contract lists term limits and a rollback agenda, clause by clause.",
            "Your own race rides in the same ballot box as the wave."
          ],
          rumor: [
            "This wave is one-time only. The new majority will not fit through the door.",
            "Party elders are already ranking seats. The edges get cut first."
          ],
          unknown: [
            "If the contract men fail, the bill swings back.",
            "Whether the wave lifts you or buries you."
          ],
          terms: [
            { k: "GOP Revolution", v: "The 1994 midterms: Republicans take both chambers." }
          ]
        },
        choices: [
          {
            id: "ride",
            text: "Sign the Contract publicly. Campaign for the new majority",
            note: "The bet: the wave leaves people standing on it. The risk: when it drains, the man on the crest dies of thirst first.",
            outcomes: {
              crit: { body: "Your name is on the new majority's list. At the victory party you sit in the front row. When the next round of seats is dealt, someone saved you one." },
              ok: { body: "You joined the wave in time. The new team remembers your signature." },
              meh: { body: "Too many signatures. Your name blurs into a hundred-page list." },
              fail: { body: "The wave crashes locally. Your signed promise is framed in an ad. Old colleagues laugh: lost the bet and paid for it." },
              critfail: { body: "The new majority passes nothing in a hundred days. Your signature becomes the proof of following the wind. Both sides mark you." }
            }
          },
          {
            id: "hold",
            text: "Turn around: stand with those being swept away. Shield your colleagues and your team",
            note: "The bet: the losers remember who did not run. The risk: you back the side this street is currently losing.",
            outcomes: {
              crit: { body: "You did not let go in the defeat. The survivors and the precinct workers file you under the one who stayed. On reckoning day, your name is not on the list." },
              ok: { body: "You held the team together, though the team is getting smaller." },
              meh: { body: "You stayed. Nobody thanks you to your face. Nobody remembers you stayed." },
              fail: { body: "You backed the losers. Resources route around you now. Even your old precinct changes the channel." },
              critfail: { body: "The wave takes you with it: keeping faith with the losing side satisfies nobody. Your seat is reformed first." }
            }
          },
          {
            id: "fund",
            text: "Bet on neither side. Fund a local machine that answers to you alone",
            note: "Money opens doors; even an outsider gets a seat at the table. The risk: the money runs out and no cup is poured for you.",
            outcomes: {
              crit: { body: "Cleanup crews from both camps come courting instead — your independent machine is now the broker nobody can route around." },
              ok: { body: "The machine is built. The bidders start queuing. You spent a dollar and bought half a seat." },
              meh: { body: "The committee has a sign on the door. More phone calls, fewer checks." },
              fail: { body: "You bet both ways and belong to neither. The money burns out. The winners cannot be bothered to thank you." },
              critfail: { body: "Your committee's books become the scandal piece about independent machines. Both sides step on you at once." }
            }
          },
          {
            id: "local",
            text: "No national bet. Guard your own patch's agenda",
            note: "Waves are weather elsewhere. Do small work, bank small credit.",
            outcomes: {
              crit: { body: "When the tide drains you are still on the beach: the local work is done, item by item. Whoever is in charge has to deal with you." },
              ok: { body: "You caught no wind and swallowed no spray. One steady year." },
              meh: { body: "The capital changes hands. You are fixing an irrigation ditch. Nobody thinks of you." },
              fail: { body: "The new majority lists a local project as a specimen of waste. Your name gets read out. Nobody really minds." },
              critfail: { body: "You neither stood nor did. After the wind passes, both lists forget you at the bottom." }
            }
          }
        ]
      }
    ]
  }
});
