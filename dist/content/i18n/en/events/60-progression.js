/* ============================================================================
 * CONTENT · i18n/en/events/60-progression.js
 * 中文文件 content/events/60-progression.js（跨时代通用的晋升脊柱）的英文覆盖层。
 * 这一批是玩家每一局都要撞上的"进度条文案"：升到下一级时弹出来的那 13 张卡。
 *
 * 契约（详见 docs/I18N.md §3–§5）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位，choices 按 id 对齐，brief.terms 不带 id → 按下标对齐（顺序不动）。
 *   · 纯标量数组（known / rumor / unknown）整体替换，条数与中文严格一致。
 *   · 结构性与引用性键（grade / category / unique / valence / dyn / tierRaw / tierMin /
 *     tierMax / minTenure / weight / tracks / stake / req / base / mods / effects / flags /
 *     id）由引擎保护，这里一个都不写。
 *
 * 英文写法：第二人称、现在时、短句；官职与机构用真实英文（statehouse、the House、
 * super PAC、Electoral College）；不点真人姓名。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ============================================================
       * Tier 1 -> 2 · first ballot line
       * ========================================================== */
      {
        id: "prog_council",
        title: "The first count: your name is on the ballot",
        body: "The polls close tonight. Every door you knocked and every person you talked to now turns into a number. Either you gain ground you own, or you go back to square one.",
        brief: {
          lede: "The knocking is done and the talking is done. Tonight you only wait for the count.",
          known: [
            "Turnout is low tonight; a few hundred votes decide the seat.",
            "Every door you knocked now converts into a number.",
            "The incumbent's name sits on the ballot too, and that favors him."
          ],
          rumor: [
            "They say two precincts will be slow to report tonight.",
            "They say your opponent has already drafted a concession speech."
          ],
          unknown: [
            "How people treat you once tonight is over.",
            "What the next step upward will cost you."
          ]
        },
        choices: [
          {
            id: "doorknock",
            text: "Turn every vote you walked into a number tonight",
            outcomes: {
              crit: { body: "You talk a whole street into friendship, win big, and now hold ground of your own." },
              ok: { body: "You win. The seat is small, but you are no longer an assistant." },
              meh: { body: "You win, having spent your savings and borrowed against every favor you have." },
              fail: { body: "You fall short. You are better known; the seat is someone else's." },
              critfail: { body: "You lose badly, and your opponent digs up old business of yours." }
            }
          },
          {
            id: "ads",
            text: "Buy one last round of ads and push the undecided",
            outcomes: {
              crit: { body: "The advertising blitz works and you win in a landslide." },
              ok: { body: "The money is well spent. You win." },
              meh: { body: "You win, but critics call it money talking, and your account is thin." },
              fail: { body: "The money went out; the votes never came." },
              critfail: { body: "Your ads are ruled a violation, and the elections board comes calling." }
            }
          }
        ]
      },

      /* ============================================================
       * Tier 3 -> 4 · state house count
       * ========================================================== */
      {
        id: "prog_state",
        title: "The statehouse seat is counted tonight",
        body: "The rally money is spent and the primary rival is behind you. Tonight the ballots get counted: a chair in the statehouse, or the same seat you already hold.",
        brief: {
          lede: "The primary is over and the rallies are spent. Tonight there is only the count.",
          known: [
            "You cleared the primary; tonight only the opponent is left.",
            "The legislature writes the state budget and draws the district lines.",
            "This seat is the standard springboard to Washington."
          ],
          rumor: [
            "They say a few suburban precincts are still uncommitted tonight.",
            "They say the party is watching whether you can actually win."
          ],
          unknown: [
            "What you become once you sit in that chair.",
            "Who you owed tonight, and how much."
          ],
          terms: [
            { k: "Redistricting", v: "Redrawing district lines after each census." }
          ]
        },
        choices: [
          {
            id: "run",
            text: "Stay in and see the night through",
            outcomes: {
              crit: { body: "You take the district cleanly, and the doors of the statehouse open for you." },
              ok: { body: "You win and take a seat in the legislature." },
              meh: { body: "You win, and from now on the party counts you as someone to watch." },
              fail: { body: "You lose, and the statewide coverage makes you better known." },
              critfail: { body: "A heavy loss, and people start calling you a man who overreached." }
            }
          },
          {
            id: "wait",
            text: "Concede tonight and trade it for a party promise",
            outcomes: {
              crit: { body: "Your withdrawal buys a real chair on a committee." },
              ok: { body: "The party leader remembers the favor." },
              meh: { body: "You trade for nothing." },
              fail: { body: "People read you as unambitious and stop inviting you." },
              critfail: { body: "You step aside, and the man who takes the seat pushes you to the margin." }
            }
          }
        ]
      },

      /* ============================================================
       * Tier 6 -> 7 · the House
       * ========================================================== */
      {
        id: "prog_federal",
        title: "The votes for the House are counted tonight",
        body: "The primary is behind you, the donors' checks are spent, and you barely slept through the last week in the suburbs. Tonight the road to Washington runs only through this district.",
        brief: {
          lede: "The primary, the money, the last week in the suburbs: all behind you. Tonight only the count.",
          known: [
            "You won the primary; tonight only the opponent is left.",
            "The donors' money is already spent. Winning starts the repayment.",
            "House terms run two years. Win, and the next race begins."
          ],
          rumor: [
            "They say the donors are already reserving your voting record.",
            "They say the last suburban counties will not report for hours."
          ],
          unknown: [
            "What Washington will make you into.",
            "Whether a two-year campaign cycle drains you dry."
          ],
          terms: [
            { k: "Swing district", v: "Suburban ground either party can flip." }
          ]
        },
        choices: [
          {
            id: "run",
            text: "See the night through and take the seat",
            outcomes: {
              crit: { body: "You enter Congress as the dark horse, and national correspondents start pronouncing your name." },
              ok: { body: "You win and become a member of the House." },
              meh: { body: "You win, and the price is a campaign debt on your back." },
              fail: { body: "You lose, but the country now knows who you are." },
              critfail: { body: "You lose, and rumors of dirty money follow your campaign home." }
            }
          },
          {
            id: "decline",
            text: "Concede tonight and go back to your local ground",
            outcomes: {
              crit: { body: "You become the man local decisions run through, on solid footing." },
              ok: { body: "You hold your base." },
              meh: { body: "You keep your seat, and the ceiling above it." },
              fail: { body: "Some mock you for having no ambition." },
              critfail: { body: "People read the caution as weakness, and supporters start drifting off." }
            }
          }
        ]
      },

      /* ============================================================
       * Tier 7 -> 8 · Senate or governor
       * ========================================================== */
      {
        id: "prog_senate",
        title: "Senate or governor: pick one",
        body: "Two roads, both to the center of national power, at different prices.",
        brief: {
          lede: "The Senate and the governorship both lie open in front of you.",
          known: [
            "Six-year Senate terms with a national platform; a four-year governorship whose signature changes lives the same week.",
            "Both are standard roads to the top office, and neither one walks like the other.",
            "A senator swims in national money; a governor bargains with local interests."
          ],
          rumor: [
            "They say the national committee wants you in the Senate race, though no Senate seat is actually coming open.",
            "They say the governor's road is safer, because your rivals will cut each other first."
          ],
          unknown: [
            "Which road makes an enemy of the people who actually hold the resources.",
            "Whether you end up a legislator or an executive."
          ],
          terms: [
            { k: "Governor", v: "A state's chief executive, holding the budget's pen and the appointments." }
          ]
        },
        choices: [
          {
            id: "senate",
            text: "Run for Senate (the national stage)",
            outcomes: {
              crit: { body: "You win and take a Senate seat. Every camera in the country turns toward you." },
              ok: { body: "You are a senator now, ticket in hand for the inner room." },
              meh: { body: "You win, owing an enormous political debt." },
              fail: { body: "You lose narrowly, but you are a national figure anyway." },
              critfail: { body: "You lose, and an inquiry into your campaign money opens." }
            }
          },
          {
            id: "governor",
            text: "Run for governor (real power at home)",
            outcomes: {
              crit: { body: "You take the statehouse and become a power in your own region." },
              ok: { body: "You are elected governor, with real authority in your hands." },
              meh: { body: "You win the office; the legislature refuses to obey it." },
              fail: { body: "You lose and go back to where you started." },
              critfail: { body: "A heavy loss, and people openly doubt that you could have run anything." }
            }
          },
          {
            id: "shoestring",
            text: "Skip the bankroll: run on volunteers and church basements",
            outcomes: {
              crit: { body: "You visit every county until \"he cannot afford ads and he still came\" becomes the best line in the campaign. You win, and everyone walking in behind you volunteered; nobody was bought." },
              ok: { body: "Volunteers beat a machine on your behalf. You take the seat, but your team is improvised and the debts will take years." },
              meh: { body: "You fall a few points short. You did not win, but everyone remembers the man who would not quit." },
              fail: { body: "Not enough money is simply not enough money. The primary runs over you, your savings are gone, and the volunteers are holding the receipts." },
              critfail: { body: "Your accounts get opened, and the local paper prints that you could not cover the filing fee." }
            }
          }
        ]
      },

      /* ============================================================
       * Tier 9 -> 10 · the presidency
       * ========================================================== */
      {
        id: "prog_president",
        title: "Counting night: the White House is decided tonight",
        body: "The state primaries, the nomination, the debates and the last sprint through the swing states are all behind you. Tonight the map tightens state by state. Very few in history reach this night, and one person sits on the top line.",
        brief: {
          lede: "The polls close state by state tonight, and each one turns a color.",
          known: [
            "What counts is not the popular vote but each state's electors.",
            "The first small states to close set the night's momentum.",
            "If it is close, the count can run into tomorrow."
          ],
          rumor: [
            "They say two big states will be within a hair tonight.",
            "They say your opponent has already scouted a victory venue."
          ],
          unknown: [
            "How much of you this road spends before the end.",
            "What is left standing after a loss."
          ],
          terms: [
            { k: "Electoral College", v: "Voters choose electors; the electors choose the president." }
          ]
        },
        choices: [
          {
            id: "run",
            text: "Go all in for the White House",
            outcomes: {
              crit: { body: "You win. History turns the page, and your name sits at the top of it." },
              ok: { body: "You take the general election and become president of the United States." },
              meh: { body: "You win one term only, and scandal sits over the whole of it." },
              fail: { body: "You lose the general, but you are already written into the record." },
              critfail: { body: "You lose heavily, and the old business from the campaign gets opened all the way." }
            }
          },
          {
            id: "step_aside",
            text: "Stand down tonight and back another horse",
            outcomes: {
              crit: { body: "The candidate you build wins, and you become the kingmaker in fact." },
              ok: { body: "Your person wins, and you get a share." },
              meh: { body: "Your person wins and forgets your name." },
              fail: { body: "You backed the wrong horse." },
              critfail: { body: "The person you elevates spends the victory settling accounts with you." }
            }
          }
        ]
      },

      /* ============================================================
       * Appointment track · the patron's chair
       * ========================================================== */
      {
        id: "prog_appoint",
        title: "An appointed seat is being offered to you",
        body: "The president — or a governor — has a chair to fill: a judgeship, a regulatory board, a deputy secretary. They want someone reliable who will not create work.",
        brief: {
          lede: "A job with no election in it. It needs one person to nod.",
          known: [
            "Appointments need no money and no votes, but they do clear background checks.",
            "It gives you real power and no popular base. When your patron leaves, you are left hanging.",
            "Whoever recommended you stays in your file forever."
          ],
          rumor: [
            "They say the pick is already made and you are running for show.",
            "They say the person backing you is trading you for something."
          ],
          unknown: [
            "Whether you get pulled into business that was never yours.",
            "What your patron will eventually ask for."
          ]
        },
        choices: [
          {
            id: "accept",
            text: "Take the appointment and walk the technocrat's road",
            outcomes: {
              crit: { body: "Confirmed. You hold real power, and never had to campaign for it." },
              ok: { body: "You get the chair." },
              meh: { body: "You rise, owing whoever recommended you one very large favor." },
              fail: { body: "The nomination dies, and you had already counted on it." },
              critfail: { body: "Your qualifications are questioned in public, and the hearing goes badly on the record." }
            }
          },
          {
            id: "refuse",
            text: "Refuse and stay on the electoral road",
            outcomes: {
              crit: { body: "Your indifference to appointed chairs wins the respect of the grassroots." },
              ok: { body: "You stay on the road you chose." },
              meh: { body: "You passed up the shortcut." },
              fail: { body: "Your patron reads the refusal as an insult." },
              critfail: { body: "You offend the whole appointment system, and cabinet rooms close to you for good." }
            }
          }
        ]
      },

      /* ============================================================
       * Operative track · deciding who runs
       * ========================================================== */
      {
        id: "prog_kingmaker",
        title: "You do not run. You decide who gets nominated.",
        body: "You are not going to run. You are going to decide whether other people get to.",
        brief: {
          lede: "You have a man. He does not yet know he is a card.",
          known: [
            "An operator's power comes from information, money and timing, never from votes.",
            "The candidate you pick is not brilliant. That is precisely why the job fell to you.",
            "The stake is judgment. Get it wrong and what you lose is everyone's trust in you."
          ],
          rumor: [
            "Another operator is watching the same man, with more money in hand.",
            "They say the real result is settled by whatever breaks in the final week."
          ],
          unknown: [
            "Whether the person you built will cut you loose.",
            "Whether you will want to stand there yourself."
          ]
        },
        choices: [
          {
            id: "run_it",
            text: "Run a decisive race yourself",
            outcomes: {
              crit: { body: "Your man wins big, and everyone starts lining up for your call." },
              ok: { body: "Your man wins, and your shadow gets longer." },
              meh: { body: "Your man wins, and you become the thing everyone aims at." },
              fail: { body: "You botch it, and your clients leave." },
              critfail: { body: "Your operation becomes the scandal, and the industry closes its doors to you." }
            }
          },
          {
            id: "stay_low",
            text: "Place your pieces and stay off the stage",
            outcomes: {
              crit: { body: "You weave a net in silence, and in a few years everyone is inside it." },
              ok: { body: "Your influence grows quietly and holds." },
              meh: { body: "Slow progress, no exposure." },
              fail: { body: "A younger operator takes your phone calls." },
              critfail: { body: "Someone reads your whole board and turns it against you." }
            }
          }
        ]
      },

      /* ============================================================
       * Wealth track · the super PAC
       * ========================================================== */
      {
        id: "prog_magnate",
        title: "The super PAC play",
        body: "You do not need votes. You need a checkbook. Ten million dollars is enough to make any local race follow your script.",
        brief: {
          lede: "Someone arrives with a sheet of paper: here is how the money could be spent.",
          known: [
            "A super PAC may take nearly unlimited money, so long as it stays independent of the campaign.",
            "It may not coordinate. It may advertise, organize, and say anything it likes.",
            "Donor names are public. Many of them do not mind."
          ],
          rumor: [
            "They say several firms have money parked and are only waiting for someone worth spending on.",
            "They say that once you take this money you stop being one man's candidate."
          ],
          unknown: [
            "What the people behind the money will want later.",
            "Whether new rules close this road behind you."
          ],
          terms: [
            { k: "Super PAC", v: "An independent expenditure committee that may take unlimited donations." }
          ]
        },
        choices: [
          {
            id: "spend",
            text: "Spend heavily and rewrite a race",
            outcomes: {
              crit: { body: "Your money elects the members you want, and Congress starts echoing you." },
              ok: { body: "You bought influence." },
              meh: { body: "The money is spent, the man elected, and he does not remember you." },
              fail: { body: "You back the loser, and the money sinks with him." },
              critfail: { body: "Your funding is traced to illegal sources, and federal agents come in." }
            }
          },
          {
            id: "buy_media",
            text: "Buy a media company instead",
            outcomes: {
              crit: { body: "You own the platform itself. From here, you decide where the news goes." },
              ok: { body: "You buy a dying newspaper, and it starts speaking for you." },
              meh: { body: "The deal closes, and the readers keep leaving." },
              fail: { body: "Trust-busters take an interest in the transaction." },
              critfail: { body: "The acquisition falls through and exposes where your money comes from." }
            }
          },
          {
            id: "handshake",
            text: "Touch none of the money; trade the favors you have for one promise",
            outcomes: {
              crit: { body: "You spend nothing. You put three sides in one room for one evening, and by morning the nominee for that seat has changed." },
              ok: { body: "Favors get a small thing done. Few people know about it, and every one of them matters." },
              meh: { body: "Everyone at the table smiles yes, and after the room empties nobody moves." },
              fail: { body: "You spend every favor and get nothing. Some start saying you only talk." },
              critfail: { body: "What was said that night gets out: you tried to settle an election through connections. Everyone pretends not to have heard it. Everyone remembers." }
            }
          }
        ]
      },

      /* ============================================================
       * Celebrity track · name bigger than office
       * ========================================================== */
      {
        id: "prog_star",
        title: "Your name is bigger than your office",
        body: "Television appearances, a bestselling book, a speaking tour. You hold no real power yet, but you already have a crowd.",
        brief: {
          lede: "Your name now carries further than your title. That is an asset and a trouble at once.",
          known: [
            "Strangers recognize you more often than your office deserves.",
            "Fame converts into votes or into money. The two roads end in different places.",
            "Fame depreciates fastest of all. Stop feeding it and it thins out.",
            "The people around you are splitting into two kinds: those protecting you, those using you."
          ],
          rumor: [
            "They say a bigger arena has noticed you.",
            "They say last month's attention made powerful people uncomfortable."
          ],
          unknown: [
            "Whether the fame is still there when you actually need it.",
            "Whether there comes a day when you do something unlike yourself to keep it."
          ],
          terms: [
            { k: "Celebrity track", v: "Influence that comes from name recognition rather than the party machine." },
            { k: "Brand", v: "The fixed public image of you. Once set, it is hard to move." }
          ]
        },
        choices: [
          {
            id: "ride",
            text: "Ride it: turn fame into political capital",
            outcomes: {
              crit: { body: "Every hall on the tour overflows, and the man-of-the-people image holds." },
              ok: { body: "Your popularity keeps climbing." },
              meh: { body: "You get the heat, and the establishment calls you an entertainer." },
              fail: { body: "Audiences tire, and the heat drops." },
              critfail: { body: "You say the wrong thing live, and the image comes down." }
            }
          },
          {
            id: "cash",
            text: "Cash the fame out first",
            outcomes: {
              crit: { body: "You get rich and nobody thinks less of you for it." },
              ok: { body: "A book deal, endorsements, speaking fees. The wallet gets heavier." },
              meh: { body: "You get paid, and critics accuse you of spending your politics." },
              fail: { body: "The venture fails, and you are accused of fleecing your own followers." },
              critfail: { body: "Your wealth course starts to look like a pyramid scheme, and prosecutors open a file." }
            }
          }
        ]
      },

      /* ============================================================
       * Bridge step · Tier 2 -> 3 · city council
       * ========================================================== */
      {
        id: "prog_city",
        title: "The council seat is counted tonight",
        body: "From party cadre to elected official is one night. You signed the papers and stood in the debate; tonight voters turn all of it into a seat, or into a decent defeat.",
        brief: {
          lede: "You signed the papers and stood in the debate. Tonight the voters settle the account.",
          known: [
            "City business is concrete: police, fire, zoning, garbage.",
            "The party wanted someone who knows the ground; tonight you run for them.",
            "Council pay is small, but it is the first real office."
          ],
          rumor: [
            "They say the mayor is close to developers and his votes are not all in.",
            "They say party donors are waiting on tonight's number."
          ],
          unknown: [
            "Whether your first grip on real power makes you careful or reckless.",
            "How the favors owed tonight get repaid later."
          ],
          terms: [
            { k: "City council", v: "A city's legislature, holding the budget and the local ordinances." },
            { k: "Part-time councilman", v: "A member with a day job, serving on a small stipend and the title." }
          ]
        },
        choices: [
          {
            id: "run",
            text: "Let the machine turn in votes and see what the endorsement is worth",
            outcomes: {
              crit: { body: "The party endorses you without a fight, and you take the seat with room to spare." },
              ok: { body: "You win the seat, and you are an elected official for the first time." },
              meh: { body: "You win narrowly, and you owe the machine one." },
              fail: { body: "You lose, but local politics has seen your face now." },
              critfail: { body: "A bad loss, and the party begins to doubt whether you draw a crowd." }
            }
          },
          {
            id: "selfrun",
            text: "No machine tonight: send your own volunteers to the doors",
            outcomes: {
              crit: { body: "A grassroots miracle: you go around the party machine and walk away with the election." },
              ok: { body: "You win, and from now on the party files you under hard to manage." },
              meh: { body: "You win, but the team dissolves faster than it formed, and every favor comes due one at a time." },
              fail: { body: "A campaign without a machine is too much. You fall short, and the money you advanced is gone." },
              critfail: { body: "You lose, and you lose alone." }
            }
          }
        ]
      },

      /* ============================================================
       * Bridge step · Tier 4 -> 5 · state senate
       * ========================================================== */
      {
        id: "prog_upper",
        title: "Your district's senate votes are counted tonight",
        body: "The district is a full turn bigger than the assembly one, and you spent the whole season on it. Tonight the count: senator for your district, or the same assembly member you were this morning.",
        brief: {
          lede: "You won the primary and finished the circuit. Tonight there is only the count.",
          known: [
            "The senate has fewer seats, and it confirms appointments and money.",
            "The boss spoke for you. Tonight the favor starts coming due.",
            "What you promised to get here counts from this night."
          ],
          rumor: [
            "They say this chair was promised long ago to a man who gives more.",
            "They say two counties will report late tonight."
          ],
          unknown: [
            "How people look at you once you stop being a minor figure.",
            "Whether this chair costs favors you can never repay."
          ],
          terms: [
            { k: "State senate", v: "The legislature's upper chamber: fewer seats, longer terms, confirmations and budget." }
          ]
        },
        choices: [
          {
            id: "run",
            text: "Cash the bosses' endorsement and let the district count tonight",
            outcomes: {
              crit: { body: "The boss speaks for you, the machine runs at full speed, and you walk into the senate." },
              ok: { body: "You are elected to the upper chamber of the state legislature." },
              meh: { body: "You win, but to get the bosses' help you promised a few things that are hard to deliver." },
              fail: { body: "You lose, but you are a named figure in the state now." },
              critfail: { body: "A heavy loss. The party moves on to someone else and stops returning your calls." }
            }
          },
          {
            id: "hold",
            text: "Stand down tonight and go back to banking seniority",
            outcomes: {
              crit: { body: "You become the member who actually knows one subject, and your word starts to carry weight." },
              ok: { body: "You keep stacking seniority, steadily." },
              meh: { body: "You keep your seat, and the ceiling above it." },
              fail: { body: "Some conclude you are comfortable where you are." },
              critfail: { body: "You miss this round, and nobody says when the next one comes." }
            }
          }
        ]
      },

      /* ============================================================
       * Bridge step · Tier 5 -> 6 · statewide office
       * ========================================================== */
      {
        id: "prog_stwide",
        title: "The whole state counts its votes tonight",
        body: "The state convention put you out front, and your name was bought with ads and airfare. Tonight every county counts at once: take it, and you stop belonging to one district.",
        brief: {
          lede: "The convention is over, the statewide ads have run. Tonight is the count.",
          known: [
            "Your name is on every ballot in the state, and they are counted tonight.",
            "The ads and the travel are already spent; that money does not come back.",
            "After tonight you are either a statewide figure or a man who lost one."
          ],
          rumor: [
            "They say the other side has already raised twice what you have.",
            "They say a few suburban counties will not call until the small hours."
          ],
          unknown: [
            "Whether statewide attention is an opening or a target.",
            "Who you borrowed from to run this race."
          ],
          terms: [
            { k: "Statewide office", v: "A post elected by the entire state: the step toward national things." }
          ]
        },
        choices: [
          {
            id: "run",
            text: "Put the whole map up and let the state count tonight",
            outcomes: {
              crit: { body: "Your name is on every ballot in the state, and you carry the state." },
              ok: { body: "You win the statewide post. You are a statewide figure now." },
              meh: { body: "You win, and the campaign debt sits on your chest." },
              fail: { body: "You lose, but the whole state learned your name." },
              critfail: { body: "A heavy loss, and your finances get turned inside out." }
            }
          },
          {
            id: "wait",
            text: "Stand down tonight and bank the seniority instead",
            outcomes: {
              crit: { body: "You dodge a fight you could not have won and keep your strength." },
              ok: { body: "You hold still and wait for a better moment." },
              meh: { body: "Skip one opening, and it may not come again." },
              fail: { body: "Everyone else boards; you are still standing on the platform." },
              critfail: { body: "People conclude you cannot be handed anything large, and the party lifts someone else." }
            }
          }
        ]
      },

      /* ============================================================
       * Bridge step · Tier 8 -> 9 · the ticket
       * ========================================================== */
      {
        id: "prog_vp",
        title: "Roll call: they read your name on the platform",
        body: "The vetting cleared, the convention met, and you spent the season speaking for this ticket. Tonight the chair asks whether you accept. Answer, and you are the other half of the poster; say nothing, and a live audience watches you do it.",
        brief: {
          lede: "The convention floor rolls call tonight, and you have to be standing for it.",
          known: [
            "Vetting and the stump speeches are finished; all that is left is the roll call.",
            "Say yes and you underwrite his platform until election night.",
            "Say nothing on a live feed and the country keeps the clip."
          ],
          rumor: [
            "They say the list is already written, and you are only there to balance one faction.",
            "They say the opposition has a folder of research on you, already printed."
          ],
          unknown: [
            "Whether this stage turns out to be the highest point of your life.",
            "If you decline, whether anyone calls for the next round."
          ],
          terms: [
            { k: "Running mate", v: "The nominee a candidate chooses to balance the ticket and its factions." }
          ]
        },
        choices: [
          {
            id: "accept",
            text: "Answer to your name and take the other half of the poster",
            outcomes: {
              crit: { body: "You are formally nominated, your name printed beside the presidency itself, with the country watching." },
              ok: { body: "You are on the ticket, standing inside the center of power." },
              meh: { body: "You get on the list as the one who will be blamed for other people's mistakes." },
              fail: { body: "You miss the slot, but you have become a national weight anyway." },
              critfail: { body: "You are turned down in the room, in front of people, and the whole country sees it." }
            }
          },
          {
            id: "stay",
            text: "Say nothing on the platform and keep your independence",
            outcomes: {
              crit: { body: "Staying unaligned wins respect, and every side in the party starts courting you." },
              ok: { body: "You refuse to be anyone's second, and your standing gets harder." },
              meh: { body: "You keep your hands clean and miss the fast train." },
              fail: { body: "Neither side counts you as one of theirs anymore." },
              critfail: { body: "What you called independence, people read as arrogance." }
            }
          }
        ]
      }
    ]
  }
});
