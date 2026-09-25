/* ============================================================================
 * CONTENT · i18n/en/lines/124-line-2007-10.js
 * 中文文件 content/events/124-line-2007-10.js 的英文覆盖层（B5 年带 · 连续时间轴）。
 *
 * 契约同 i18n/en/events/106-era-1990.js（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的文案字段。
 *   · 事件按 id 定位；choices 按 id 对齐；terms 无 id，按下标对齐。
 *   · known / rumor / unknown 是纯字符串数组 → 整体替换，必须整条给全。
 *   · 结构性键（id / era / minYear / tierMin / weight / base / mods / effects /
 *     flags / req / cost …）由引擎保护，这里一条都不写。
 *   · 经济字段是系数，不涉及文案，不用管。
 *   · worldline 的 brief / outlets 同样在英文层整体改写（年份键与中文一一对应）；
 *     pressure 是数值，不写。
 *
 * 英文写法：重写而非直译。第二人称、现在时、短句；引语用破折号而不是引号；
 * 机构名用真实英文（CNN、Fox News、Wall Street Journal、Lehman Brothers、AIG）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        /* 2007-04 · 校园枪击 */
        id: "ln07_vt",
        title: "Thirty-two names need somebody to read them out loud",
        body: "Gunfire in a dormitory and in an engineering building before eight in the morning. By noon the names are posted\n" +
          "online — thirty-two of them, the youngest nineteen. By two o'clock the memorial has a seat chart, and the local\n" +
          "station points a mic at every elected official who walks in. The community mental health clinic in your county lost half its staff in last year's state budget.",
        brief: {
          lede: "A room full of dead students and one camera that stays on. Too much feeling looks like selling them; too little looks like nothing.",
          known: [
            "The university seated local officials to speak. It does not want the word legislation in the room.",
            "The county mental health clinic lost half its staff in last year's cuts.",
            "You voted for that cut. The roll call is public.",
            "The governor's office already said no: the mental health law does not reopen this year."
          ],
          rumor: [
            "Some say the shooter's old outpatient file is still sitting in a school district drawer.",
            "Some say your party wants you to cry and say nothing. No guns, no money."
          ],
          unknown: [
            "What kind of law, if any, comes out of this.",
            "Which file today's sentence ends up in."
          ],
          terms: [
            { k: "Civil commitment", v: "A court orders a seriously ill person into treatment." }
          ]
        },
        choices: [
          {
            id: "memorial",
            text: "Go read the names. Grief only — no bills, no budgets",
            note: "You bet the eulogy is enough on its own. Risk: nothing moves, and the bill is still on the table.",
            outcomes: {
              crit: { body: "You read the names one at a time and never once raise your voice. Next morning the county paper runs those names as its headline, not you." },
              ok: { body: "You say the right things. Nobody finds a crack in it, and nobody pretends the business is finished." },
              meh: { body: "You get through a few names. The mic is too loud; you cannot hear yourself either." },
              fail: { body: "Your eulogy sounds like a prepared statement. On the way out, two people do not take your hand." },
              critfail: { body: "You get one detail wrong. A local blog loops that clip all week — he never even checked the number." }
            }
          },
          {
            id: "law",
            text: "Ride the moment: put the cut counseling budget back on the table",
            note: "You bet the outrage is still hot. Risk: you burn favors and the bill winters in committee.",
            outcomes: {
              crit: { body: "You turn the hearing into the first national one, and two months later the state reopens the money. Your name is in the footnote of the bill." },
              ok: { body: "The measure lives. Only a fraction of the money comes back, but the state is arguing about it out loud now." },
              meh: { body: "Your proposal reaches committee. It winters there quietly." },
              fail: { body: "The party says the timing is wrong; the papers say you are cashing in. The budget does not move one word." },
              critfail: { body: "A reporter digs up your vote from last year and writes the headline himself — he cut it first, now he is saving it. The hearing turns into your trial." }
            }
          },
          {
            id: "blame",
            text: "Call a press conference: the day the money was cut, the gun was loaded",
            note: "You bet public anger can be borrowed. Risk: establishment money and introductions start routing around you.",
            outcomes: {
              crit: { body: "Your sentence runs all night on cable. Block calls flood the party office, and every one of them wants to speak for you." },
              ok: { body: "You say it plainly. The base remembers your name; the state party writes you into a different ledger." },
              meh: { body: "You finish and nobody picks it up. There was other news that day." },
              fail: { body: "The state pushes the blame down to the county; the county calls you loud-mouthed. Both papers are ugly." },
              critfail: { body: "Someone presses your somebody-already-knew line for a second sentence: who. You have nothing, and only your face on camera." }
            }
          }
        ]
      },

      {
        /* 2007-08 · 次贷裂缝 */
        id: "ln07_subprime",
        title: "Two funds freeze shut, and the county pension still sits in that bank",
        body: "In one week of August, two hedge funds that lived on mortgage bonds stop honoring redemptions, and subprime lending\n" +
          "reaches network television for the first time.\nThe news that lands closer is yours: the bank holding the county teachers' pension is the bank that wrote those loans. Your finance director knocks with a spreadsheet — pull it or leave it. The branch president says run first, and you are the one who stamps it flat.",
        brief: {
          lede: "Nobody knows yet whether this is a crack or a collapse. All you can decide is when other people's money moves.",
          known: [
            "The bank holding the county pension also originated the loans that are defaulting.",
            "Moving the money takes a board vote, and the only reason you may state is prudence.",
            "Stay and the branch promises not to recall local construction loans. Leave and the builders bleed first.",
            "Last year you took campaign money from this bank's branch office."
          ],
          rumor: [
            "Some say the state already arranged a rescue and is not saying so.",
            "Some say headquarters already drained this branch. The balance is a photograph."
          ],
          unknown: [
            "Whether it falls far enough to touch deposit insurance.",
            "Whether the first one out the door was smart or a traitor."
          ],
          terms: [
            { k: "Subprime mortgage", v: "A home loan made to a borrower who cannot really qualify. Defaults run high." }
          ]
        },
        choices: [
          {
            id: "pull",
            text: "Call a board vote and move the pension money out first",
            note: "You bet the bank really is finished. Risk: the local builders disown you on the spot.",
            outcomes: {
              crit: { body: "A month later federal regulators seize the parent bank, and yours is the only county money that moved beforehand. For the first time the teachers' union calls you and asks about other issues." },
              ok: { body: "The money is safe. Local contractors call you a coward, and the ledger says you were the one who was right." },
              meh: { body: "You spend the whole summer on it. The money sits in a different account. Nothing happens." },
              fail: { body: "The bank is fine. Two local builders, cut off from credit, stop two hundred houses. They bill you for it." },
              critfail: { body: "The transfer gets picked apart and somebody notices you called a friend first. The paper uses the word insider twice." }
            }
          },
          {
            id: "stay",
            text: "Sit still: the money stays where it is, and you say everything is in order",
            note: "You bet the bank holds. Risk: if it falls, you are the one who never warned anybody.",
            outcomes: {
              crit: { body: "The disclosure file you asked for turns out to be the first evidence the state uses. Nobody thanked you then, and nobody blamed you." },
              ok: { body: "You did nothing wrong. Same money in the account, same businesses in town." },
              meh: { body: "You did nothing all summer, and nothing went wrong because of it." },
              fail: { body: "At back-to-school night a parent asks: did you people know already. Nobody answers for you." },
              critfail: { body: "The money is frozen for three months after all. At the board table somebody reads out the no vote you cast." }
            }
          },
          {
            id: "rescue",
            text: "Broker it privately: the bank keeps lending locally, and you take a piece",
            note: "You bet this one lands soft. Risk: your money and your name go in together.",
            outcomes: {
              crit: { body: "The credit line holds and two hundred local houses get roofs. On settlement day your name appears on two shareholder lists — both of them here in town." },
              ok: { body: "The jobs survive. A little money comes back to you, and a much larger favor is owed." },
              meh: { body: "You fronted cash and half the loans got recalled anyway. Nobody remembers the errand." },
              fail: { body: "The builder collapses regardless. Your money went in and did not come out, and the laid-off men recognize you on the list." },
              critfail: { body: "The bankruptcy trustee finds the brokerage: public money unrecovered, your own money inside first. The state attorney's office calls." }
            }
          },
          {
            id: "calm_queue",
            text: "Stand at the bank door and talk people down: no stampede for withdrawals, go home and wait",
            outcomes: {
              crit: { body: "You persuaded the first dozen households in line that day to go home. Next morning's bank-run story skipped this branch, and the town's savings held another week." },
              ok: { body: "You stood there all afternoon and walked back whoever you could. No thanks printed; the queue did loosen a little." },
              meh: { body: "You talked; they queued. Nobody knew anybody." },
              fail: { body: "The day after you talked people out of withdrawing, the branch posted its shut-down notice. Your words get retold backwards." },
              critfail: { body: "Somebody swears you knew the doors would close and told depositors to wait anyway. One honest sentence, delivered on the worst possible day." }
            }
          },
          {
            id: "disclose",
            text: "Convene a public inquiry of the branch: local loan exposure and capital position, laid on the table",
            note: "Public accounting earns the most hatred and the most 'meticulous' credit. Every phone in the room is recording; one wrong word runs away with you.",
            outcomes: {
              crit: { body: "Under a forest of raised phones the branch president opened those few pages of numbers. You reported the riskiest piece to the state — and your inquiry sits in the appendix of the eventual seizure order." },
              ok: { body: "Two hours of inquiry, thirty minutes of diplomatic filler from the president — but the two figures you shook out ran in the local paper." },
              meh: { body: "The meeting produced one sentence: fully compliant. You knew that's how you'd be brushed off." },
              fail: { body: "The bank's lawyers fire back a letter accusing your inquiry of 'engineering a run.' Local business starts walking around you." },
              critfail: { body: "A week after your meeting the branch is seized — and every depositor's panic gets billed to you: 'He's the one who scared us.'" }
            }
          },
          {
            id: "senate_inquiry",
            text: "Send the interrogation to the federal level: demand hearings on the mortgage-securitization chain and the rating agencies",
            note: "Naming two funds is only the start; naming the whole chain is the decision. Wrong, you're just the man who doesn't understand finance.",
            outcomes: {
              crit: { body: "Your question — who certified these bonds as safe — pins itself onto the national agenda. Months later the federal subpoenas land, on the issuers and the raters the same day." },
              ok: { body: "The case is filed; the hearings calendar runs into next year. You make the 'understands this business' short list, and Wall Street's blacklist." },
              meh: { body: "Your demand gets filed under 'pre-election theater,' and the hearing date slides indefinitely." },
              fail: { body: "Your donors pull their lines in a body. Pundits laugh: he called two funds a crisis. The contribution list thins by a full column." },
              critfail: { body: "One page of asset data you quoted is disproven on the spot. 'He reads tabloids, not annual reports' leads the business section." }
            }
          }
        ]
      },

      {
        /* 2008-11 · 大选夜 */
        id: "ln08_election",
        title: "Election night: the first Black candidate walks into the White House",
        body: "Every poll points one way. If he wins tonight he is the first Black man to sit in that chair. The line outside the school\n" +
          "gym turns the corner; somebody is crying in a parked car.\nTwo local camps come to you the same day. One wants your campaign machine folded into his tonight. The other reminds you that the tide goes out faster than it comes in, and you still have to shake hands on these streets next year.",
        brief: {
          lede: "An election that ties your name to a banner. Tie it early or tie it wrong — both are hard to untie.",
          known: [
            "On the last night both parties are grabbing polling places, and there are never enough volunteers.",
            "Your party's state establishment has not picked a side. The money is waiting for a signal.",
            "Your opponent already hung the national ticket's banner on his photo wall.",
            "Party data: this county lost by two thousand votes last time."
          ],
          rumor: [
            "Some say this wave runs eight years. Do not stand on the wrong bank.",
            "Some say the establishment is ready to sell its own people and keep only the new winner."
          ],
          unknown: [
            "Whether this wind brings local jobs or carries them away.",
            "How many years your stance tonight gets remembered for."
          ],
          terms: [
            { k: "Precinct", v: "Where a neighborhood votes and counts. The local party chair runs it." }
          ]
        },
        choices: [
          {
            id: "ride",
            text: "Fold the local machine into the wave and introduce him on stage",
            note: "You bet the tide does not go out. Risk: next year you explain yourself on these streets alone.",
            outcomes: {
              crit: { body: "Your two minutes in front of the gym run on the cable networks all night. After the count, the party puts your name on the state's next-round list." },
              ok: { body: "You spoke, and you said the right name. The wind lifts you a little — not much, enough for the next race." },
              meh: { body: "You campaigned. The mic was crowded with louder names. Nobody keeps what you said." },
              fail: { body: "The county still loses two points. In the post-mortem the party notes that some people can chant and cannot turn out votes." },
              critfail: { body: "He won the country, you lost the county. Your picture is the front of your opponent's flyer — he speaks for outsiders." }
            }
          },
          {
            id: "distance",
            text: "Take nobody's side: work local issues, say nothing about the national race",
            note: "You bet the county ledger outlasts a national wind. Risk: neither camp counts you as theirs.",
            outcomes: {
              crit: { body: "After the tide drains, both parties notice you are still standing on the local thing. People who need something done start calling you first." },
              ok: { body: "You said nothing wrong, and nothing got remembered." },
              meh: { body: "The night has nothing to do with you. You watch the returns in the office and then drive home." },
              fail: { body: "There were fewer people celebrating with your name in it, and fewer people to blame when the bill came." },
              critfail: { body: "Neither party's lists have you on them. History turned the page and you never touched the margin." }
            }
          },
          {
            id: "scoff",
            text: "Bet he loses your state: move your money and people to the other tent first",
            note: "You bet the polls are lying to everyone. Risk: guess wrong and you stand facing the winner.",
            outcomes: {
              crit: { body: "The state really flips. You are one of the few who stood correctly in advance, and the new administration's first round of local appointments is waiting for your call." },
              ok: { body: "You kept your standing in the state. Old partners call you an opportunist; the new winners still need you." },
              meh: { body: "Nobody claims the side you bet on. The money is spent and neither camp mentions you." },
              fail: { body: "The wind is stronger than you thought. Your local relationships shield you for a while, then blow away with you." },
              critfail: { body: "The winner checked who flipped in the final week here. Your name is on it, and your donors cut first." }
            }
          }
        ]
      },

      {
        /* 2008-12 · 三大车企救助 */
        id: "ln08_auto",
        title: "Washington moves to save the Big Three, and the bill lands in your county",
        body: "In December Washington argues over an emergency loan: drag General Motors and Chrysler back from the bankruptcy\n" +
          "line, on the condition that they cut jobs and shutter plants.\nYour county has one parts plant and one finished-car rail line. Five thousand paychecks hang on that order book. The plant hands you a joint letter and asks you to say a good word in Washington; the union is already waiting at the party door for you to speak.",
        brief: {
          lede: "A rescue the whole country curses. Landed here it is five thousand paychecks: take it or not.",
          known: [
            "Five thousand plant jobs ride on the automakers' orders. The company wants you to speak for it.",
            "The union is waiting at the door for you to denounce capital.",
            "The federal terms are fixed: loans in exchange for closures and wage cuts.",
            "You took a contribution from that parts plant last year."
          ],
          rumor: [
            "Some say the plant already moved its orders to the next state.",
            "Some say this deal collapses before summer."
          ],
          unknown: [
            "Whether what gets saved is the car company or the debt.",
            "How many years this vote follows you."
          ],
          terms: [
            { k: "Rescue loan", v: "Public money in, equity and terms out. Washington used it to save the automakers." }
          ]
        },
        choices: [
          {
            id: "local",
            text: "Say nothing national: run a local job fair, protect the paychecks on hand",
            note: "You bet you can dodge a national shouting match. Risk: the jobs go anyway, and they bill you.",
            outcomes: {
              crit: { body: "You make the job fair the only room in town still handing out paychecks. The automakers fall anyway, but through the worst half-year these five thousand know whose door to knock on." },
              ok: { body: "You talk only local and add nothing. Some call it thin. Nobody can call it the wrong side." },
              meh: { body: "You touch none of the national fight. Life goes on." },
              fail: { body: "The plant lays off two thousand anyway. Somebody asks what you were doing." },
              critfail: { body: "He never said one word for us gets printed on the union's own flyer and passed out at the gate." }
            }
          },
          {
            id: "back",
            text: "Lobby Washington for the plant: catch this rescue loan",
            note: "You bet local paychecks outrank national opinion. Risk: donors and union both resent you.",
            outcomes: {
              crit: { body: "The loan clears and the parts plant's orders run the year after next. People in Washington remember you get things done; local workers remember you spoke for capital." },
              ok: { body: "Most of the plant survives. Your name goes onto the town's list of economic heroes and onto its list of villains." },
              meh: { body: "You make the trip to Washington. Nothing changes, and nobody recalls the trip." },
              fail: { body: "The plant falls regardless. The clip of you arguing for capital loops on local news, and the union and the street put it on your tab together." },
              critfail: { body: "Someone digs up your joint letter and your contribution: he took the money first, then defended it. The audit envelope opens." }
            }
          },
          {
            id: "claw",
            text: "Call a press conference: recover the executives' money first, don't bail out capital with taxes",
            note: "You bet public anger can be borrowed. Risk: the plant owner never takes your call again.",
            outcomes: {
              crit: { body: "Your line about clawing back the executives runs on cable that night. The company files you under unwelcome; the blocks write your name on the banner for the next rally." },
              ok: { body: "You said it hard. The base feels seen; the parts plant and the money above it start routing around you." },
              meh: { body: "Your hard words get buried under a louder voice, and by the next day nobody repeats them." },
              fail: { body: "One clause of the loan demands local wage cuts first. You cursed capital and your own district curses you back." },
              critfail: { body: "The company leaks your mail with the union and calls you two-faced. Both sides turn at once, and the establishment puts you in the dock." }
            }
          },
          {
            /* #21 M4：总统视角支（controlled_bust） */
            id: "controlled_bust",
            text: "Decide it yourself: the money goes out, but through a managed bankruptcy first - cut jobs, kill the truck subsidies, clear out the boards",
            note: "Betting the country hates the process but hates unemployment more. Risk: you end up owning both the rescue of capital and the beating you give it.",
            outcomes: {
              crit: { body: "The plants restart in late spring with half the jobs but still as going concerns. Two sets of people who denounced you issued the statements in the same week, and a governor says out loud what nobody else will: at least somebody made a decision." },
              ok: { body: "The credit line opens and the conditions actually bind. The carmakers survive, the union thinks you ruthless, Wall Street thinks you meddlesome - you are no one's man." },
              meh: { body: "The procedure runs exactly as you wrote it; the market runs as it likes. Two of three plants stand, the third falls anyway." },
              fail: { body: "The president cutting jobs for capital is cut into a forty-second package that runs on loop in your own districts." },
              critfail: { body: "The bankruptcy trustee posts the outgoing board's bonus schedule next to the federal terms. Everyone asks the same question: did the person who signed them know." }
            }
          }
        ]
      },

      {
        /* 2009-02 · 复苏与刺激方案 */
        id: "ln09_stimulus",
        title: "Washington signs a seven-hundred-billion check, and it must pass through your county",
        body: "The day the bill is signed, commentators nationwide argue whether it amounts to anything. What is on your desk is more\n" +
          "concrete: a bridge drawing twenty years old, a leaking school gym, a queue of projects waiting to be built.\nThe state's allocation formula arrives two weeks later. That same day two contractors each slide you a letter of interest. Both of them say we have done this before.",
        brief: {
          lede: "Opportunity does not wait. Somebody gets this money. The only question is whose name goes on the project first.",
          known: [
            "Projects file with the state; locally you need a matching share and an environmental review first.",
            "Your county's bridge and school buildings are both on the list. They have been queuing ten years.",
            "Both camps are filing now: one knows how to build, the other knows how to deliver.",
            "The award list is public. Whoever takes the first dollar is remembered for four years."
          ],
          rumor: [
            "Some say the state already reserved the work for its own county.",
            "Some say the real door is held by whoever carries the envelope in."
          ],
          unknown: [
            "Whether this money turns into next year's employment number.",
            "Whether what you grab is a project or a debt."
          ],
          terms: [
            { k: "Shovel-ready", v: "Plans and permits complete. Break ground the day the money lands." }
          ]
        },
        choices: [
          {
            id: "apply",
            text: "File by the book: send up the bridge drawing that waited ten years",
            note: "You bet the process still rewards a clean file. Risk: someone is faster, and the slot is gone.",
            outcomes: {
              crit: { body: "Your form is the cleanest one they receive, and the state circulates it as the example. The bridge money is not large, but it is first in line, and your name is in the signature block." },
              ok: { body: "The money arrives, somebody else's leftovers. But the bridge really is getting built." },
              meh: { body: "Your application shows as received in the state system. That is the whole story." },
              fail: { body: "The slot goes to the next county. You broke no rule; you were one week slow." },
              critfail: { body: "Your file comes back — one page of environmental review missing. By the time you patch it, the money is allocated." }
            }
          },
          {
            id: "wire",
            text: "Have the fixer slip your project into the state's package deal",
            note: "You bet somebody will carry your word upstairs. Risk: favors get paid back with votes.",
            outcomes: {
              crit: { body: "Your bridge rides inside the big state package, twelve other counties in the same bundle. When the list is read aloud, you are the only local name anybody hears." },
              ok: { body: "Your name is on the list, mid-page, and it is genuinely yours." },
              meh: { body: "The lobbyist takes your file and tells you to wait in line." },
              fail: { body: "Your item is not in the state package. You did not lose on the merits; you lost because nobody spoke for you." },
              critfail: { body: "When the package list goes public, every other county wrote its own application. Yours lists that lobbying firm." }
            }
          },
          {
            id: "shovel",
            text: "Front the local match yourself and turn the drawing into a real site",
            note: "You bet Washington really reimburses. Risk: the money you front is county debt.",
            outcomes: {
              crit: { body: "The federal approval lands four months late and your bridge is already being poured. The union presents the first hard hat to the county, and the local cameras stand at the trench." },
              ok: { body: "The reimbursement comes, the advance is repaid, and thirty local men stay on the job." },
              meh: { body: "Your advanced money sits on the books a full quarter before the approval memo arrives." },
              fail: { body: "The approval is still under review when your advance goes into an audit envelope. No bridge moved; interest did." },
              critfail: { body: "In the end Washington moves this money to another state. Your county ledger now carries a debt and a fight over who pays." }
            }
          }
        ]
      },

      {
        /* 2009-03 · AIG 奖金风波 */
        id: "ln09_aig",
        title: "The rescue money arrives. The bonus list reaches TV first",
        body: "To keep the system from folding, Washington pumps hundreds of billions into that insurance giant. One week in March the\n" +
          "Wall Street Journal prints its list of executive bonuses — one hundred sixty-five million dollars — and cable television\n" +
          "reads it aloud for six days straight.\nThe country is furious. So is your party, because your campaign account took three contributions from this company's local office last year. The call comes in: before tonight, are you going to say something or not?",
        brief: {
          lede: "Anger is a ready-made weapon and a ready-made trap. Whoever lifts it first is the one people study.",
          known: [
            "You took three contributions from this company's local office last year.",
            "The bonuses are legal. The contracts were signed before the rescue.",
            "Your party wants you to denounce them; your money wants you to say nothing.",
            "The local office still employs eleven hundred people in this county."
          ],
          rumor: [
            "Some say headquarters leaked the list to reporters to force the resignations.",
            "Some say giving the money back is theatre. Not a dollar returns."
          ],
          unknown: [
            "Whom this anger is still burning when it finishes.",
            "How far the one sentence you say will travel."
          ],
          terms: [
            { k: "Bailout", v: "Public money in, equity out. Washington did it to stop the chain of failures." }
          ]
        },
        choices: [
          {
            id: "jobs",
            text: "Refuse the bait: hold a jobs fair in the county and talk about work",
            note: "You bet the anger finds another face. Risk: the contribution record sits right there.",
            outcomes: {
              crit: { body: "Two weeks later the national headline is the unemployment number. Your room full of job seekers is the only good news local television still has." },
              ok: { body: "You stayed off the fight list, and nobody stood up for you either. Life goes on." },
              meh: { body: "You said nothing all week, and it was quiet in a way that made the story bigger." },
              fail: { body: "The county paper brings up your three contributions on page six. The headline has no name in it; the photo has your face." },
              critfail: { body: "He never said a word gets printed on a flyer handed out at the plant gate. The shouting turns toward you." }
            }
          },
          {
            id: "names",
            text: "Call a press conference and read out the local names on the bonus list",
            note: "You bet the anger is on your side. Risk: donors and jobs turn their faces at once.",
            outcomes: {
              crit: { body: "Those five names are read aloud on the cable networks that night. Headquarters calls to ask who this is, and your phone will not stop — every caller is cheering for you." },
              ok: { body: "You got through the whole list. The base feels seen, and the company stops answering your calls." },
              meh: { body: "Two reporters come. The names land in the last paragraph." },
              fail: { body: "One man on that list has lived here twenty years and teaches Sunday school. From tomorrow, the crowd is outside your door." },
              critfail: { body: "Someone digs up your three contributions: he took the money first, then sold the list. The state attorney's office thinks so too." }
            }
          },
          {
            id: "defend",
            text: "Go on television and defend the system: scold it, but do not pull the money",
            note: "You bet the reasoning crowd still exists. Risk: you personally hold back a national rage.",
            outcomes: {
              crit: { body: "Your segment gets quoted for weeks, and he says the unfashionable thing becomes your label. People in finance start treating you as one of their own." },
              ok: { body: "You made one thing clear, and the cost was three days of no invitations. After that, money and introductions start coming your way." },
              meh: { body: "Your argument was never wrong. Nobody wants to hear it in an angry year." },
              fail: { body: "After you leave the set the host asks the audience what they think, and the tally starts scrolling beneath your name." },
              critfail: { body: "Your clip ends up in your opponent's national ad. The title card is four words: he understands this." }
            }
          }
        ]
      },

      {
        /* 2009-04 · H1N1 疫情 */
        id: "ln09_h1n1",
        title: "A new flu walks into the schools, and somebody has to sign the closure",
        body: "In late April a small town far away shuts its classrooms after a few children run high fevers. Days later your state reports\n" +
          "its first case, and the test kits are made to confirm the sick, not to find them.\nThe superintendent of schools calls: two weeks closed — whose signature goes on the order. The county hospital says eight observation beds remain. May brings the state exam, graduation, and two weeks of utility temp workers who do not get paid.",
        brief: {
          lede: "Deciding is not the hard part. Paying is: the children, the wages, or your name.",
          known: [
            "Not enough test kits. Most local cases will never be counted as ones.",
            "Closing schools takes both the district and the county, and names go on the order.",
            "Eight observation beds left at the county hospital. Intensive care goes to the city.",
            "The state exam is in May, and two-income families have nobody with the children."
          ],
          rumor: [
            "Some say the state is sitting on numbers to protect the tourist season.",
            "Some say this comes back in September, and harder."
          ],
          unknown: [
            "How heavy this illness turns out to be. In late April nobody knows.",
            "Whether the word closed saves you or ends you."
          ],
          terms: [
            { k: "Novel influenza A", v: "A new flu strain that began spreading worldwide that spring." }
          ]
        },
        choices: [
          {
            id: "defer",
            text: "Follow the state line: forward the guidance, sign nothing for the district",
            note: "You bet higher up takes the blame first. Risk: you are the one who did nothing.",
            outcomes: {
              crit: { body: "In mid-May the state issues the order itself. Nothing about you goes in anyone's file, and the hospital corridor does not get longer." },
              ok: { body: "You forwarded every document by the book. Some call it thin. Nobody can call it wrong." },
              meh: { body: "In those two weeks you sent one email and copied twelve people." },
              fail: { body: "A class of children falls ill at graduation, and at the parents' meeting somebody asks what the county was doing those weeks." },
              critfail: { body: "All he said was to follow the state — the parents print that sentence themselves, on their own flyer." }
            }
          },
          {
            id: "close",
            text: "Do not wait for the state: close local schools for two weeks",
            note: "You bet the outbreak really comes. Risk: money and safety both yell at you.",
            outcomes: {
              crit: { body: "The state's second case appears on the ninth day after you closed. The hospital does not fill up, and the next county copies your wording onto its own order." },
              ok: { body: "Schools shut, illness stays mild. Parents thank you, shopkeepers complain, and both counts stand." },
              meh: { body: "You signed ahead of the state, and then nothing at all happened." },
              fail: { body: "Two weeks of class are gone and the state exam runs anyway. Teachers, parents and restaurateurs hand you one bill." },
              critfail: { body: "The state education commissioner rules that localities cannot close schools. Your order is rescinded, and an inquiry opens instead." }
            }
          },
          {
            id: "trace",
            text: "Pay the hospital to triage, and publish the real numbers every day",
            note: "You bet data buys trust. Risk: an ugly number stays ugly in print.",
            outcomes: {
              crit: { body: "Your daily tally sits as a corner graphic on local news for six weeks. When vaccine ships in August, your county's allocation is near the front of the line." },
              ok: { body: "Triage runs. The numbers are small enough to reassure people, and small enough that nobody notices." },
              meh: { body: "You posted the table for six weeks and the readership fell each week." },
              fail: { body: "The published count jumps one notch and panic arrives before the virus. The state health office says you exceeded your authority." },
              critfail: { body: "One figure was wrong. It got reported, printed, and became proof that the county hid it. The inquiry starts in your office." }
            }
          }
        ]
      },

      {
        /* 2009-11 · 胡德堡枪击 */
        id: "ln09_forthood",
        title: "Thirteen dead at the Army post. Now the fight is what to call it",
        body: "On a morning in November a gun speaks in a clinic at a large Army post in Texas. Thirteen people do not walk out. The\n" +
          "shooter is an Army psychiatrist, and someone in the room heard Arabic.\nBy that evening the national argument has moved from why to what do we call it: terrorism, or something else. Your county has families from that post. It also has a mosque a newspaper just named in print.",
        brief: {
          lede: "Two words of framing decide whether your neighbors get a knock on the door tomorrow.",
          known: [
            "The post's recruiting office sits inside a local high school. Families will come to you and ask.",
            "The military inquiry has issued no finding. Your party wants a statement first.",
            "There is a mosque in this county. A paper named it last week.",
            "Your subcommittee holds the budget for the state counter-terrorism liaison office."
          ],
          rumor: [
            "Some say colleagues reported this shooter more than once and nothing came of it.",
            "Some say the label exists so nobody has to investigate the Army's own side."
          ],
          unknown: [
            "Whether this gets written into the history of the wars.",
            "Whom your choice of words protects, and whom it breaks."
          ],
          terms: [
            { k: "Insider threat", v: "An attack carried out by someone inside the organization. The military's term." }
          ]
        },
        choices: [
          {
            id: "families",
            text: "Do the work: bring families in, arrange visits, say nothing about the label",
            note: "You bet the practical thing stands on its own. Risk: besides procedure, nobody is comforted.",
            outcomes: {
              crit: { body: "You get the buses, the lodging and the visiting hours right down to the last detail. Three months later a memorial booklet for the dead carries a page thanking this county." },
              ok: { body: "Everything that needed doing got done. Nobody praises it, nobody finds a fault." },
              meh: { body: "You stood in the arrivals hall two nights running. Almost nobody who came needed a word from you." },
              fail: { body: "One family cannot find a room for their child, and the phrase nobody here helped us goes viral on video." },
              critfail: { body: "The visiting-expense money you coordinated turns up with duplicate receipts. Thirteen people are dead and you are explaining paperwork." }
            }
          },
          {
            id: "name",
            text: "Say the word publicly: this was a terrorist attack, stop dressing it up",
            note: "You bet the public wants one hard sentence. Risk: the Army and the local community both come at you.",
            outcomes: {
              crit: { body: "Three national outlets quote your stop renaming it. Two weeks later the military changes its wording." },
              ok: { body: "You said the hard thing. People on the street nod. People at the post stop nodding at you." },
              meh: { body: "Your framing gets buried under a louder one, and by the next day nobody repeats it." },
              fail: { body: "The official finding never changes, and the military puts your sentence into its rebuttal paragraph. You get sick along with it." },
              critfail: { body: "Someone throws a brick through the recruiting office window at the high school. Everybody turns around to see who shouted first." }
            }
          },
          {
            id: "protect",
            text: "Go first to the mosque and to the bereaved, and refuse the label",
            note: "You bet the county does not explode first. Risk: the national shouting lands on you.",
            outcomes: {
              crit: { body: "The lights stayed on at the mosque that week, and a bereaved family said somebody here shook their hand. Two years later a federal report concedes the internal review was overdue." },
              ok: { body: "You held both sides. The national anger comes at you; nobody local talks back." },
              meh: { body: "Your careful words get neither shared nor attacked. The month passes." },
              fail: { body: "He skipped the families and went to the mosque gets cut to fifteen seconds and run on cable for three days." },
              critfail: { body: "A second shooting happens in another state and somebody strings your name onto the causal chain. Now there is a formal demand to look into you." }
            }
          }
        ]
      },

      {
        /* 2010-04 · 墨西哥湾漏油 */
        id: "ln10_oil",
        title: "The rig blows up. Nobody says whose shore the oil reaches",
        body: "One night in April a drilling platform in the Gulf of Mexico catches fire and comes apart. Eleven men do not come back.\n" +
          "Two days later oil shows on the water, and the company's first release says responsibility does not stop with us.\nYou run three coastal counties: thirty-three hundred fishing licenses, two vacation motels, one summer. The state wants to sue Washington; the counties want bodies on the beach first. The fishing association asks you one question: who keeps our books.",
        brief: {
          lede: "Nothing shows on the surface yet and the bill is already walking. Somebody has to take the signing seat first.",
          known: [
            "Claims run through the company's own claims window, and you file the paperwork yourself.",
            "The state attorney general has a class action drafted. It lacks local endorsements.",
            "Both local motels lost every season deposit this month.",
            "The platform's onshore contractor gave you money last year."
          ],
          rumor: [
            "Some say the company is quietly buying settlement papers, one household at a time.",
            "Some say nobody has actually tried a fix. They are buying time."
          ],
          unknown: [
            "When the oil makes land. The current decides, not you.",
            "This seat you take gets settled in four years."
          ],
          terms: [
            { k: "Claims window", v: "The desk a company opens for mass claims. Sign first, get paid first." }
          ]
        },
        choices: [
          {
            id: "watch",
            text: "Wait for the federal finding: issue a statement about close monitoring",
            note: "You bet somebody competent is in charge. Risk: local people remember only that you did not come.",
            outcomes: {
              crit: { body: "The oil curves around your shoreline. Your restrained statement, read afterward, counts as not making it worse." },
              ok: { body: "You spoke by the book. You gained nothing and lost nothing." },
              meh: { body: "Your statement lands in the back pages. The column at sea is still leaking." },
              fail: { body: "The season closes twice. Fishermen burn their own gear at the dock, and your name goes on the fire." },
              critfail: { body: "Those four words about monitoring get printed on a memorial flag for the eleven, and it hangs outside your office." }
            }
          },
          {
            id: "claims",
            text: "Move the claims desk onto local ground and file household by household",
            note: "You bet the money actually arrives. Risk: one word non-compliant and the work was for nothing.",
            outcomes: {
              crit: { body: "You run a filing table in the high school gym for three months, send off twelve hundred packets, and the first checks land in autumn. At the association, people start saying your name for the chair." },
              ok: { body: "Half the money arrives; the other half is under review. People remember that you went." },
              meh: { body: "The table is set up. People fill in two forms and leave: the payments are not open yet." },
              fail: { body: "The company's window returns your packets — wrong format. Fishermen do not hear format; they hear nobody pays." },
              critfail: { body: "It comes out that the desk took a sponsor fee from the platform's onshore subcontractor. Now both lawsuits come looking for you." }
            }
          },
          {
            id: "hearing",
            text: "Convene a hearing and hold the contractor's owner and the state environmental chief at the table",
            note: "You bet the national cameras follow. Risk: establishment money routes around you from now on.",
            outcomes: {
              crit: { body: "That owner says at your table — we still do not know how bad it is. The next day the sentence runs all day on four national outlets." },
              ok: { body: "The hearing happens. The testimony is anodyne, but the procedure stays in your hands." },
              meh: { body: "The commissioner reads a statement, the owner reads one, and the reporters came for a fight. Nobody fights." },
              fail: { body: "The party says you put an ally in the witness chair. Next time you need money, nobody picks up." },
              critfail: { body: "The contractor's lawyers find the contribution from your district, and the hearing turns around into an audit of you." }
            }
          }
        ]
      },

      {
        /* 2010-07 · 维基解密 */
        id: "ln10_wikileaks",
        title: "Tens of thousands of war logs online overnight, and a local name is in them",
        body: "In late July a website spreads the raw Afghan war logs out all at once: casualty lists, agent code names, and one entry\n" +
          "naming your state. In August a far larger batch is on its way.\nThe State Department calls it a security problem. Two people you know telephone you the same day: the editor of the county weekly, who says he intends to print it, and a man in the National Guard, who says somebody has already been asking about your name.",
        brief: {
          lede: "For the first time, publishing the truth and somebody dying for it are two ends of one sentence.",
          known: [
            "The county weekly is waiting on one sentence from you: print it or not.",
            "An old acquaintance of yours is in the Guard, and the leaked list carries place names.",
            "Your party wants you to demand accountability; the newspaper business wants you to defend the pressroom.",
            "The line on leaks is set by the Justice Department. Locally nobody gets a vote."
          ],
          rumor: [
            "Some say the people named on that list were moved out long ago.",
            "Some say these files were screened before anyone published them."
          ],
          unknown: [
            "Whether this ends as a press-freedom case or a spy case.",
            "Which of your sentences gets quoted for two years."
          ],
          terms: [
            { k: "War logs", v: "Raw field reports from the front, published without authorization." }
          ]
        },
        choices: [
          {
            id: "ask",
            text: "Ask only one question: does anybody on that list die for it",
            note: "You bet nobody can answer it. Risk: both sides say you are dodging.",
            outcomes: {
              crit: { body: "Your question gets picked up by two national weeklies and becomes the line people reach for whenever this is argued." },
              ok: { body: "You put the question on the table and answered it for nobody." },
              meh: { body: "Your question was small. The news that day was very large." },
              fail: { body: "Both sides file the same story: he declined to take a position." },
              critfail: { body: "After the October tranche comes out, somebody finds your question from July — he already knew." }
            }
          },
          {
            id: "pursue",
            text: "Co-sign the letter demanding a counter-intelligence hunt for the source",
            note: "You bet the military and the establishment want the gesture. Risk: the press corps files you under enemy.",
            outcomes: {
              crit: { body: "Your letter is attached as an exhibit to a congressional hearing. An old Guard acquaintance asks you to dinner, and people from the agencies learn this county's name." },
              ok: { body: "Your name is thirtieth on it. The direction is right and the credit belongs to someone else." },
              meh: { body: "The letter goes in, like mail through a building with no slot." },
              fail: { body: "The wave of releases keeps rising, and your letter gets read as a demand to shut mouths." },
              critfail: { body: "The weekly answers on its front page: he wants to prosecute the people who talk. Local subscriptions fall that month." }
            }
          },
          {
            id: "shield",
            text: "Speak for the newsroom and the leaker: keep the word traitor off the table first",
            note: "You bet opinion swings toward press freedom. Risk: you may invite the investigation yourself.",
            outcomes: {
              crit: { body: "In October the biggest tranche lands and the whole country is asking the question you asked in April. A weeklies reprint your old lines." },
              ok: { body: "You took one night of fire for the newsroom. When the party calls, the editor speaks up for you." },
              meh: { body: "Your statement shares page two with the local news." },
              fail: { body: "A source is reported dead because of the files. Overnight your position becomes the charge." },
              critfail: { body: "Federal investigators telephone your office. What they want is the correspondence between you and that editor." }
            }
          }
        ]
      }
    ],

    /* 世界线 · 2007—2010 英文覆盖（outlets 均为当年真实存在的美国媒体，条数与中文一致）。 */
    worldline: {
      brief: {
        "2007": "Paper wealth keeps rising while the foundations of the houses are already cracking. Everyone senses that something is wrong, and no one can put it into words.",
        "2008": "A corner of the order collapses in public, and names that never stood before appear on the ballot. The mood of the year is: so it really does break.",
        "2009": "The money goes out to rescue somebody else, and the bill arrives at your own house. People in the street start saying the word \"government\" with less respect.",
        "2010": "The oil on the water gets gathered up; the accounts under it do not close. Anger moves from the plaza into the polling station."
      },
      outlets: {
        "2007": ["The Wall Street Journal", "The New York Times", "CNN", "USA Today", "The Huffington Post"],
        "2008": ["The Wall Street Journal", "The Washington Post", "CNN", "The Huffington Post", "BuzzFeed", "Twitter"],
        "2009": ["The New York Times", "CNN", "USA Today", "BuzzFeed", "Twitter", "NBC"],
        "2010": ["The Wall Street Journal", "The Washington Post", "CNN", "Fox News", "Breitbart News", "Twitter"]
      }
    }
  }
});
