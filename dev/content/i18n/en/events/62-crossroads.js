/* ============================================================================
 * CONTENT · i18n/en/events/62-crossroads.js
 * 中文文件 content/events/62-crossroads.js 的英文覆盖层（人生岔路：
 * cross_first_fork / cross_ngo_machine / cross_state_federal / cross_wh_governor）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices 按 id 对齐；terms 不带 id，按数组下标对齐。
 *   · 结构性键（id / era / tracks / tierMin / weight / base / mods / effects /
 *     flags / cost …）受保护，本文件一个都不写。setTrack 在 effects 里，不动。
 *
 * 英文写法：第二人称、现在时、短句；美国政治实词（school board、precinct、
 * party machine、redistricting、open seat、delegate slate、the mansion、
 * West Wing、spoils、general election / primary）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ------------------------------------------------------------
       * 分岔一：选票还是工牌
       * ---------------------------------------------------------- */
      {
        id: "cross_first_fork",
        title: "The first fork: your name on a ballot, or a badge on someone else's ticket",
        body: "A year in, two doors open at once. A school board seat is empty — the most local elected office " +
          "in America, and it sets school budgets: a low rung, but every vote is walked door to door. A state " +
          "senator's team is hiring a regional organizer, a field operative working volunteers and turnout: modest " +
          "pay, but you see the machine's people daily. You cannot do both — campaign season runs twenty-four " +
          "seven. Print your own name on a ballot, or learn how someone else wins. Pick one. Whichever road you " +
          "take decides who you meet and whose favors you owe for five years.",
        choices: [
          {
            id: "run",
            text: "Run for the school board yourself",
            note: "The electoral track: the name is yours, and so is the win or the loss. Expect to wear down " +
              "your shoes and your weekends.",
            outcomes: {
              crit: { body: "You win a seat nobody picked you to win. On election night, in an elementary-school " +
                "gym, you feel for the first time what it weighs to be elected." },
              ok: { body: "You win. Not by much, but you win. Your name appears on an official document for the " +
                "first time." },
              meh: { body: "You lose close — close enough that a local party executive writes your name down." },
              fail: { body: "You lose clean. Four thousand doors knocked, and the lessons pay better than the votes did." },
              critfail: { body: "The campaign lays bare every weakness: camera-shy, can't ask for money, blanks " +
                "on stage. You lose, and you lose ugly." }
            }
          },
          {
            id: "staff",
            text: "Join the state senator's campaign staff",
            note: "The operative track: you learn how the machine runs. The winner isn't you — but when the " +
              "spoils get handed out, you're at the table.",
            outcomes: {
              crit: { body: "Election night wins by eleven points. At the party the senator toasts you by name. " +
                "Two weeks later you have a desk at the state capital." },
              ok: { body: "You win. Your territory posts the third-highest turnout in the state — that number " +
                "leads your résumé now." },
              meh: { body: "A win, and little of the victory rubs off on you. You learn more than you collect." },
              fail: { body: "The senator loses. The team dissolves in three months, but the two hundred names in " +
                "your phone stay." },
              critfail: { body: "Mid-campaign, fake voter-registration paperwork breaks in the territory you run. " +
                "The senator chews you out in front of everyone, though it isn't all on you." }
            }
          },
          {
            id: "both_slow",
            text: "Neither yet: keep volunteering and wait another year",
            note: "No rush. The cost is watching others take seats first — but your calendar stays your own.",
            outcomes: {
              crit: { body: "You audit both classrooms: weekend shifts for the campaign, testimony for the school " +
                "district. Both camps file you under 'reliable.'" },
              ok: { body: "Another steady year. You aren't stagnating. You're just unseen." },
              meh: { body: "The year goes fast. Of the two open doors, someone has already walked through one." },
              fail: { body: "By the time you reach for a seat, the table is full, and your line is still: I'm " +
                "just a volunteer." },
              critfail: { body: "Both camp leaders quietly decide you 'play both sides.' Political memory is " +
                "crueler to watchers than to enemies." }
            }
          }
        ]
      },

      /* ------------------------------------------------------------
       * 分岔二：NGO 还是党机器
       * ---------------------------------------------------------- */
      {
        id: "cross_ngo_machine",
        title: "The issue group's name, or a slot inside the party",
        body: "The issue group you run has delivered two local wins, and the board has started talking expansion. " +
          "The state party machine — a party's permanent organization, its jobs, endorsements and money — offers " +
          "an olive branch: a paid post over three counties, on condition of \"coordination.\" The co-founder says " +
          "it straight: go, she won't stop you, but the signature page loses a name. Conviction buys clean hands; " +
          "the system buys leverage. Decide where to place yourself. What the machine hands you is not a post. " +
          "It is a coordinate system.",
        choices: [
          {
            id: "stay_ngo",
            text: "Stay with the group: turn the issue into your turf",
            note: "Grassroots and issue-side credit keeps compounding; the machine's door swings slowly shut. " +
              "Clean hands are an asset — and a ceiling.",
            outcomes: {
              crit: { body: "You force the issue onto the state agenda: one hearing, two bills, and a brigade of " +
                "volunteers who say your name like it's theirs." },
              ok: { body: "The group grows another ring. Your name is tied to the issue now — an asset, and a label." },
              meh: { body: "Same days: reports written, members seen, callbacks awaited. Idealism depreciates " +
                "faster than you think." },
              fail: { body: "The foundation's grant shifts direction and half your programs get cut. You cross " +
                "other people's names off the layoff list — now some colleagues think you owe them a word." },
              critfail: { body: "An investigative piece finds a conflicted company sitting on your board. You " +
                "didn't know. But your name is on the signature page." }
            }
          },
          {
            id: "join_machine",
            text: "Join the machine: run party operations in three counties",
            note: "Reset your coordinates to inside the party. Resources arrive in the same crate as discipline, " +
              "and the old comrades' signature page loses a name.",
            outcomes: {
              crit: { body: "You weave three counties' party organizations into one net. Two years on, primary " +
                "night lights your lamps in all three at once — state headquarters corridors start parting for you." },
              ok: { body: "The seat settles around you. The internal phone list, the weekly meetings, the " +
                "'coordination' — you've got the hang of all of it." },
              meh: { body: "You learn the party's language: what gets said on the floor, what gets said in the " +
                "hallway, and what never gets said at all." },
              fail: { body: "'Coordination' turns out to mean: your issue waits its turn. You remind yourself " +
                "it's temporary." },
              critfail: { body: "One 'coordination' keeps you silent at your old allies' hearing. The coverage " +
                "runs one line: the former companion, now sitting across the room." }
            }
          },
          {
            id: "halfway",
            text: "Be the outsider-insider: stay independent, cooperate on schedule",
            note: "Both doors left open. Politics calls this cunning, or calls it mature — depending on whether " +
              "you win later.",
            outcomes: {
              crit: { body: "You become the translator both sides need: the party wants the issue's legitimacy; " +
                "the group wants the party's access. Both keep a chair for you — and people who can reach neither " +
                "start treating you as the corridor." },
              ok: { body: "The arrangement holds. You lack full leverage but carry none of the chains — and " +
                "you've met a few people who get things done on either side." },
              meh: { body: "Both camps treat you politely as a 'call-if-desperate' contact. You do bank a few " +
                "brokers who still pick up when you call." },
              fail: { body: "On one key vote you please no one: the party calls you a wrecker, the group calls " +
                "you a turncoat. Even the matchmakers start dodging you." },
              critfail: { body: "Your 'broker' act lands in an opponent's attack ad: playing both sides, " +
                "belonging to neither." }
            }
          }
        ]
      },

      /* ------------------------------------------------------------
       * 分岔三：州参议院还是联邦众议院
       * ---------------------------------------------------------- */
      {
        id: "cross_state_federal",
        title: "A seat at the state capital, or a seat in Washington",
        body: "Two seats open at once. A veteran state senator retires: a district you know, a real shot, and " +
          "coverage that stops at the state line. Redistricting — the once-a-decade redraw of district lines from " +
          "the census — cracks open a U.S. House seat: national eyes, national money, a two-year term that keeps " +
          "you in permanent campaign. Your advisers put it plain: big fish, small pond, or small fish, big water. " +
          "Word is the new map left that door open on purpose, for a donor's own person in Washington. You've " +
          "climbed to the place where you must choose — and this choice defines everything you'll meet for a decade.",
        choices: [
          {
            id: "state",
            text: "Run for state senate: build power at the capital",
            note: "Steady, fast, real. State power is the chessboard — budgets and district maps get drawn here.",
            outcomes: {
              crit: { body: "You roll into the capital in a landslide and take a key committee seat in year one. " +
                "When your party's presidential candidate comes to raise money, he calls on you first." },
              ok: { body: "You win. The statehouse lobby knows your face now." },
              meh: { body: "Won, but by a thinner margin than predicted. Your campaign debts get paid one name " +
                "at a time." },
              fail: { body: "You lose the primary. The machine backed someone else, and you hear the count from " +
                "the back of the banquet hall." },
              critfail: { body: "You wrote your election-night speech for a win. Improvising the graceful version " +
                "at the podium, you hear someone murmur: he's still young. That's the cruelest line there is." }
            }
          },
          {
            id: "federal",
            text: "Run for Congress: go to Washington",
            note: "The national stage, national money, a two-year cycle that grinds you. Higher ceiling, colder floor.",
            outcomes: {
              crit: { body: "The map's open door was really left for you: national money pours in and you ride " +
                "it straight to Washington. On swearing-in day you mail postcards to old friends back home." },
              ok: { body: "You take an open seat. The D.C. apartment is smaller than you imagined; the name " +
                "travels louder than you did." },
              meh: { body: "Won, at triple the projected budget. Through your first session on Capitol Hill you " +
                "spend half your time repaying favors." },
              fail: { body: "National money came fast and left faster — the other side doubled your spend in " +
                "the wave year. You go home." },
              critfail: { body: "You lose the primary to someone nobody had ever heard of. The post-mortem " +
                "writes itself: too long in far-off rooms, too little on your own porches." }
            }
          },
          {
            id: "wait_next",
            text: "Skip this round: wait two years, when both seats might open",
            note: "Greedy, but with an abacus: in two years the state senate and the House may open together, " +
              "and you'll be the senior hand. The risk is two years of nothing.",
            outcomes: {
              crit: { body: "Two years on, both seats really do open — and you're the only senior who waited in " +
                "place. The machine comes looking for you." },
              ok: { body: "One of the two comes open; the other got locked up for eight years. Not a loss." },
              meh: { body: "No seat opens in two years. You keep your current post, one ring older, with a new " +
                "reputation: 'he's steady.'" },
              fail: { body: "What opens isn't a seat but two hungry newcomers in the primary who re-cut the " +
                "board. Your 'patience' becomes your 'miss.'" },
              critfail: { body: "'He's steady' has a second half in politics: steady to the point of never " +
                "moving. Once that circulates, opportunity starts routing around you." }
            }
          }
        ]
      },

      /* ------------------------------------------------------------
       * 分岔四：总统竞选团队还是自己选州长
       * ---------------------------------------------------------- */
      {
        id: "cross_wh_governor",
        title: "Board the jet for the presidential race, or run for governor in your own name",
        body: "The likely presidential nominee wants you on his national team — a senior title, a seat on the " +
          "plane, two years bet; his nomination still has to be won state by state in the primaries. The same week " +
          "your state's governor's seat opens: you poll second, and first is the incumbent's heir, who holds the " +
          "party endorsements and has bled support for three straight months. The campaign manager slaps two pages " +
          "on the table: one says \"lend yourself,\" one says \"bet yourself.\" Lending buys a one-way ticket into " +
          "the inner circle; betting puts your name on top, the win and the loss all yours.",
        choices: [
          {
            id: "join_wh",
            text: "Join the campaign: follow this man to Washington",
            note: "The express lane on the appointment track. Win and you cash big; lose and you're in the water " +
              "in your swim trunks — your state won't hold your seat.",
            outcomes: {
              crit: { body: "You win. On election night you stand in the second row of the stage lights. After " +
                "January 20th, your badge opens West Wing doors." },
              ok: { body: "You win. You draw a working post in the administration — not under the lights, but " +
                "three meters from the decision table." },
              meh: { body: "A win, but you're out of town when the spoils get carved. Your post is 'under " +
                "consideration.'" },
              fail: { body: "You lose. By the time the plane lands back home, the team-disbanding email is " +
                "already queued on the server." },
              critfail: { body: "Mid-campaign, the candidate's old skeletons break loose and the base collapses. " +
                "As 'core team back then,' you ride along in every post-mortem piece." }
            }
          },
          {
            id: "run_gov",
            text: "Run for governor: put your own name on top of the ballot",
            note: "The electoral track's final exam: a statewide race. Win and you run a state; lose and you " +
              "spend nearly everything you have.",
            outcomes: {
              crit: { body: "One line of yours at the debate — 'I'll audit this state's books' — gets cut into " +
                "an ad that loops for a month. On election night the whole state map turns your color." },
              ok: { body: "You win the governor's mansion. On key-handover day the outgoing governor grips your " +
                "hand: 'Now you'll understand.'" },
              meh: { body: "A razor-thin win. Half the state voted for you; the other half will remind you of " +
                "it for four years." },
              fail: { body: "You lose. The campaign debt is real and the lessons are not; both take time to digest." },
              critfail: { body: "Two weeks before the election, a private recording of you from three years ago " +
                "leaks. You lose badly — knocked out by your own mouth." }
            }
          },
          {
            id: "both_hedge",
            text: "'Assist' the campaign on paper while quietly prepping your own",
            note: "Two boats, one pair of feet: no all-in following, no open break. Play it right and both doors " +
              "hold; play it wrong and both sides know.",
            outcomes: {
              crit: { body: "You work both ends flawlessly: the candidate thanks you for 'tireless help,' and " +
                "your state's precinct captains are warming up for you. Only your calendar knows the truth." },
              ok: { body: "Both sides half-doubt you, and both still use you. Your balancing act holds — for now." },
              meh: { body: "'Assistance' ends up as running messages between two offices, spending your own " +
                "favors on both sides' errands." },
              fail: { body: "The candidate's team notices that half your donor list is staff for a governor's " +
                "race of your own. You're politely dropped from the conference call." },
              critfail: { body: "Both camps receive copies of the written commitments you gave the other. " +
                "Washington stops taking your calls; back home they demand 'an explanation.'" }
            }
          }
        ]
      }
    ]
  }
});
