/* ============================================================================
 * CONTENT · i18n/en/events/60-progression.js
 * 中文文件 content/events/60-progression.js（跨时代通用的晋升脊柱）的英文覆盖层。
 * 这一批是玩家每一局都要撞上的"进度条文案"：升到下一级时弹出来的那 13 张卡。
 *
 * 契约（详见 docs/I18N.md §3–§5）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位，choices 按 id 对齐。
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
        body: "The polls close tonight. A local election turns on a few hundred votes. Every door you knocked and every person you talked to now becomes a number. The incumbent's name sits on the ballot too, and that favors him. Either you gain ground you own, or you go back to square one. They say your opponent has already drafted a concession speech; what the next step upward will cost, tonight nobody tells you.",
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
        body: "The rally money is spent and the primary rival is behind you. Tonight the ballots get counted: a chair in the statehouse, or the same seat you hold. The legislature writes the state budget and redraws the district lines after each census, and this seat is the standard springboard to Washington. Vacancies wait for no one, and neither do ballots. They say a few suburban precincts are still uncommitted tonight; who you owed this night, only you will know once you sit down.",
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
        body: "The primary is behind you, the donors' checks are spent, and winning starts the repayment. You barely slept through the last week in the suburbs — swing district ground, the kind either party can flip. Tonight the road to Washington runs only through this district: a seat in the House, or home with a national name. Once inside, remember House terms run two years; win, and the next race begins. They say the donors are already reserving your voting record.",
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
        body: "Two roads, both to the center of national power, at different prices. The Senate gives a six-year term and a national platform, and you swim in national money. The governorship — a state's chief executive, holding the budget's pen and the appointments — runs four years, and its signature changes lives the same week; you bargain with local interests instead. Both are standard roads to the top office. The national committee wants you in the Senate race, but no Senate seat is coming open soon; the governor's road is safer, because your rivals will cut each other first. Which road makes an enemy of the people who actually hold the resources, tonight will not say.",
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
        body: "The state primaries, the nomination, the debates and the last sprint through the swing states are all behind you. What counts tonight is not the popular vote but each state's electors — voters choose electors, the electors choose the president. The first small states to close set the night's momentum, and a close count can run into tomorrow. Very few in history reach this night, and one person sits on the top line. They say two big states will be within a hair tonight; how much this road changes you, only those who finish it will know.",
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
        body: "The president — or a governor — has a chair to fill: a judgeship, a regulatory board, a deputy secretary. They want someone reliable who will not create work. An appointment needs no fundraising and no votes, but it must clear a background check. It gives you real power and no popular base: when the person who recommended you leaves, you are left hanging. They say the pick is already made and you are running for show. Whoever put your name forward stays in your file, and will come collecting.",
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
        body: "You are not going to run. You are going to decide whether other people get to. An operator's power comes from information, money and timing, never from votes. The candidate you picked is not brilliant; that is precisely why the job fell to you. The stake is judgment — get it wrong and you lose everyone's trust in you. They say another operator is watching the same man, with more money in hand. Whether the person you built will cut you loose is still something you do not know.",
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
        body: "You do not need votes. You need a checkbook. Ten million dollars is enough to make any local race follow your script. The mechanism: a super PAC — an independent expenditure committee — may take nearly unlimited donations, but it may not coordinate with a campaign; it advertises, organizes, and says anything it likes. Donor names are public, and many do not mind. They say once you take this money you stop being one man's candidate. What the people behind the money will want later, no ledger shows.",
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
        body: "Television appearances, a bestselling book, a speaking tour. You hold no real power yet, but you already have a crowd. This kind of fame — a brand, a public image once fixed and hard to move — converts into votes or into money, and the two roads end in different places. And fame depreciates fastest of all: stop feeding it new material and it thins out. Whether it is still there when you actually need it, you cannot know in advance.",
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
        body: "From party cadre to elected official is one night. The party wanted someone who knows the ground; tonight you run for them. City business is concrete — police, fire, zoning, garbage — and a part-time council seat pays little, but it is the first real office. You signed the papers and stood in the debate; tonight voters turn all of it into a seat, or into a decent defeat. They say the incumbent is close to developers and his votes are not all in.",
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
        body: "The district is a full turn bigger than the assembly one, and you spent the whole season on it. The state senate is the upper chamber: fewer seats, longer terms, confirmations and the budget — which is why tonight's count is worth it. The boss spoke for you; once the votes are in, that favor starts coming due. Senator for your district, or the same assembly member you were this morning, with a larger name. They say this chair was promised long ago to a man who gives more. Whether the debts you owe this table can ever be repaid, nobody guarantees.",
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
        body: "The state convention put you out front, and your name was bought with ads and airfare; that money does not come back. Tonight every county counts at once: take it, and you stop belonging to one district. A statewide office is a post elected by the whole state — the standard step toward national things. They say the other side has already raised twice what you have. Who you borrowed from to run this race is not on the filings.",
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
        body: "The vetting cleared, the convention met, and you spent the season speaking for this ticket. Tonight the chair asks whether you accept. Answer, and you are the other half of the poster — a running mate, the nominee chosen to balance the ticket and its factions — and you underwrite his platform until election night. Say nothing, and a live audience watches you do it. They say the list was written long ago and you are only there to balance one faction. If you decline, whether anyone calls for the next round, the gavel will not answer.",
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
