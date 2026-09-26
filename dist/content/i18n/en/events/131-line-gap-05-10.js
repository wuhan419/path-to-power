/* ============================================================================
 * CONTENT · i18n/en/events/131-line-gap-05-10.js
 * 中文文件 content/events/131-line-gap-05-10.js 的英文覆盖层（2005—2010 定点大事补薄 · w57）。
 *
 * 契约同 i18n/en/lines/124-line-2007-10.js（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的文案字段。
 *   · 事件按 id 定位；choices 按 id 对齐；terms 无 id，按下标对齐。
 *   · 结构性键（id / minYear / tierMin / weight / base / mods / effects / flags /
 *     req / cost …）由引擎保护，这里一条都不写。
 *   · 本文件不含 worldline 覆盖：2003—2010 各年条目由 123/124 带的分片负责。
 *
 * 英文写法：重写而非直译。第二人称、现在时、短句；标题 sentence case
 * （Supreme Court、Senate、PAC 等专名保留大写）；机构名用真实英文。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        /* 2005-11 · 首都游说网络被起诉 */
        id: "ln05_lobby",
        title: "The capital's lobbying ring is indicted, and the donation ledger leads back to the contracts",
        body: "In the first week of November federal prosecutors indict a top lobbyist. The same stack of files wires him to the majority\n" +
          "leadership of Congress — raises, contributions, appropriations, contracts, each one priced against the next.\nThere is money from this line in your own state: the contribution your local party banked last year passed through his firm. Reporters are already asking for interviews, and the opposition says next autumn's midterms will be fought on this ledger.\nEvery donor name sits in the files; only a handful will ever be charged. Which list your committee's money is on, nobody has told you.",
        choices: [
          {
            id: "keep_dist",
            text: "Stay clean: touch nothing, say nothing about the case",
            note: "You bet the fire stops before it reaches local ground. Risk: the donation record is still there, and the reporters still come.",
            outcomes: {
              crit: { body: "Two months later the case is still parked at the capital. You answered no questions, and you are not in the story." },
              ok: { body: "You kept away from it all. Some call it cowardice. Nobody finds a thread that leads to you." },
              meh: { body: "That month you simply took your calls more carefully, and life went on." },
              fail: { body: "A reporter traces the account the money passed through, and the county paper runs a one-paragraph sidebar." },
              critfail: { body: "The story's last line reads: the money ended at a local party committee. That sentence carries your name." }
            }
          },
          {
            id: "return_cash",
            text: "Return the tainted money and demand disclosure for the whole trade",
            note: "You bet being clean is worth more than the machine. Risk: the committee treats you as an outsider from now on.",
            outcomes: {
              crit: { body: "Your signature sits at the top of the disclosure bill. The machine calls it showboating; the local evening news calls you the one who gave the money back." },
              ok: { body: "The money goes back, the release goes out. The machine is unhappy, the voters think you did the right thing." },
              meh: { body: "The refund is booked. Not one paper asks why." },
              fail: { body: "The party says you bought your own name with party cash. In the next round of state money, your county is scheduled last." },
              critfail: { body: "A reporter asks: how much did you take in the first place? The number is small, but you are the only one who returned it in public." }
            }
          },
          {
            id: "point_press",
            text: "Face the press: separate the contracts from the cash, name nobody",
            note: "You bet the public wants somebody to settle the accounts. Risk: the whole chain treats you as the enemy.",
            outcomes: {
              crit: { body: "Your line — go check the contracts — becomes the catchphrase of the fall. National papers quote you; lobbying firms stop taking work in your state." },
              ok: { body: "You indicted the system without naming a person. The press buys it; the machine files you under hostile." },
              meh: { body: "Your statement runs. The next morning a bigger indictment buries it." },
              fail: { body: "The prosecutors do not pick up your thread. The party picks up your name, and explains to the papers what loyalty means." },
              critfail: { body: "A former client sues you for defamation the same week. The first item on the discovery list is your committee's contribution ledger." }
            }
          }
        ]
      },

      {
        /* 2006-01 · 大法官确认听证 */
        id: "ln06_alito",
        title: "A Supreme Court confirmation slides toward the threshold, and the filibuster threat is real",
        body: "In late January the confirmation fight reaches its last mile. For the first time the opposition lays filibuster threats on the\n" +
          "table at scale — the minority talks a vote down unless a supermajority stops it — and the rules themselves become the issue: does the motion to end debate survive? It hangs there for three weeks.\nIt ends 58 to 42, confirmed. The phrase judicial philosophy enters bar talk and kitchen talk for the first time. Both parties are collecting your position, and the local paper will print it word for word.\nWhich of your sentences gets quoted back at some future hearing, nobody tells you.",
        choices: [
          {
            id: "do_job",
            text: "Sit it out: run the legal-aid intake, say nothing about the hearing",
            note: "You bet this fight never reaches your lawn. Risk: both sides remember you were absent.",
            outcomes: {
              crit: { body: "The confirmation brawl lasts three weeks and your name appears in none of it. After the vote, lawyers from both sides apply for your clinic's grants." },
              ok: { body: "You said nothing and got nothing. The work is done; nobody mentions you." },
              meh: { body: "This month you signed a stack of legal-aid vouchers, and that was that." },
              fail: { body: "Party headquarters sends a position letter for your signature. You miss the deadline. The chair remembers." },
              critfail: { body: "When both sides tally the year, each one notices: he never said a word. Neither list carries your name next time." }
            }
          },
          {
            id: "oppose",
            text: "Stand with the blockers: grill the record, tighten the vote",
            note: "You bet base enthusiasm is worth more than the machine. Risk: if the nominee survives, the blockers own the loss.",
            outcomes: {
              crit: { body: "Your questioning runs on cable all night. The nominee is confirmed anyway, but your name is stitched onto the opposition's list for the next cycle." },
              ok: { body: "You voted no and said it hard. The base applauds; the bar frowns." },
              meh: { body: "You gave a speech nobody rebroadcast and voted with your caucus." },
              fail: { body: "Fifty-eight to forty-two. The paper writes your state's vote under obstruction. The machine's memory outlasts the roll call." },
              critfail: { body: "The nominee's record turns out spotless. On the day he takes his seat, somebody reads your harsh lines back to you, verbatim." }
            }
          },
          {
            id: "principled_yes",
            text: "Vote to confirm — but publish where you think judicial power ends",
            note: "You bet institutional prestige outlasts a party cycle. Risk: the base reads it as betrayal.",
            outcomes: {
              crit: { body: "Your yes-but op-ed gets reprinted by the national chain. A thank-you arrives from the court. The committee letter never arrives at all." },
              ok: { body: "You voted yes and wrote the caveat. The machine remembers you; the neighborhood starts keeping score." },
              meh: { body: "Your position was too careful. Nobody quotes it." },
              fail: { body: "A primary challenger is already in the field, and your yes vote is the heart of his first ad." },
              critfail: { body: "The establishment praises you, the base curses you, the bar calls it theatre. Three papers give you three different nicknames." }
            }
          }
        ]
      },

      {
        /* 2006-12 · 前政权受审行刑 */
        id: "ln06_saddam",
        title: "The ousted president is hanged, and a phone video of it leaks the same day",
        body: "In December a special tribunal in the occupied country brings its verdict on the ousted president: crimes against humanity — the systematic killing of civilians, the court's heaviest count — death by hanging, carried\n" +
          "out before the new year. On the day itself a shaking phone video from the room is spreading online — the shouting, the bargaining, the last moment.\nThat week the two faiths there kill each other city by city, and the toll doubles. On the evening shows at home they loop the clip, and the question is no longer justice. It is: was it worth it. The veterans' groups have sent word: speak of the dead, not of the video.\nWhether the clip adds to your position or takes away, nobody will run the arithmetic for you.",
        choices: [
          {
            id: "wreaths",
            text: "Touch no verdict: hold the memorial for the town's own dead",
            note: "You bet grief needs no position. Risk: the families have more to say than you do.",
            outcomes: {
              crit: { body: "At the memorial you read one name for every folded flag. Next morning the local section runs that room, not that video." },
              ok: { body: "You appeared where you should and said exactly what you should." },
              meh: { body: "You stood in the hall all evening. Fewer people came than expected." },
              fail: { body: "A mother asks: what number was my son's name on the list. You have no number." },
              critfail: { body: "Three minutes of remarks, and you skipped two names. Families do not read the paper, but they remember." }
            }
          },
          {
            id: "account",
            text: "Chase the video: demand the theater commander explain how a phone got in",
            note: "You bet the public wants an accounting. Risk: the military reads you as throwing its people under a truck.",
            outcomes: {
              crit: { body: "Your question — who carried a phone into that room — is picked up by the national papers. Two weeks later the Pentagon rewrites its visitation rules." },
              ok: { body: "The inquiry makes the local evening news. The commander answers nothing, but the voters heard you ask." },
              meh: { body: "Your letter joins the joint response process, filed with several hundred others." },
              fail: { body: "The Pentagon replies: an investigation is under way, no further questions. You chased a ghost." },
              critfail: { body: "It surfaces that one of the men filming was a kid from your own district. Now the whole county knows your name." }
            }
          },
          {
            id: "worth",
            text: "Say it plainly: this war should go back to the public for a verdict",
            note: "You bet war-weariness has crossed its line. Risk: you become the traitor of the fallen.",
            outcomes: {
              crit: { body: "Your line — let the country settle this account — is caught by the antiwar side. Autumn recruiting falls again, and your phone will not stop ringing." },
              ok: { body: "You said the sentence. Half your district writes to curse you; the other half writes to thank you." },
              meh: { body: "You were late. A dozen people in the capital said it louder first." },
              fail: { body: "A veterans' group prints your words on its memorial-wall program. Next Remembrance Day, that page is your opponent's ammunition." },
              critfail: { body: "Another flag-draped case comes home that week, and the family's first words are about your statement. The paper prints them." }
            }
          }
        ]
      },

      {
        /* 2007-01 · 增兵与拨款时间表 */
        id: "ln07_surge",
        title: "Twenty-one thousand more troops deploy, and the new Senate majority clips a timetable onto the spending bill",
        body: "In early January the commander in chief tells the nation on live television that twenty-one thousand more troops are going to\n" +
          "Baghdad — a surge, a deadline-bounded troop hike meant to reverse an occupation. The Senate has changed hands: within three weeks the war money comes back with a withdrawal timetable clipped to it — a rider, nearly impossible to strip off a must-pass bill — and the White House answers with a veto statement.\nInside the majority caucus, people start re-sitting themselves by this one line. The families of your county's Guard unit, leaving for its second tour, are still waiting for a word from you; and your state's munitions plant runs on war orders, line by line. Which row this vote sits you in, everyone will see.",
        choices: [
          {
            id: "care_units",
            text: "Take neither side: push only rotation and counseling money",
            note: "You bet soldiers' accounts are not partisan. Risk: the strategy vote happens with none of your words in it.",
            outcomes: {
              crit: { body: "You get the rotation bill over the line in two weeks. A returning company commander shows up to thank you in person. You still said nothing about the spending vote." },
              ok: { body: "You talked only about the troops and touched no strategy. Some call it small; nobody calls it the wrong side." },
              meh: { body: "You signed a few visiting and allowance forms, and the month passed." },
              fail: { body: "Nobody told you the send-off for the second draft. The families held it without the offices." },
              critfail: { body: "A squad comes back short, and all you ever said was mind the rotation. Somebody repeats that line at the hall." }
            }
          },
          {
            id: "rider_yes",
            text: "Back the timetable: put a leash on the money, force an exit date",
            note: "You bet war-weariness outranks tradition. Risk: you cut funding mid-deployment.",
            outcomes: {
              crit: { body: "The bill passes, the White House promises the veto, and that night every panel show carries your face under one line: the one who leashed the purse." },
              ok: { body: "You voted with the new majority. The caucus assigns you a different seat; nobody moves at the families' table." },
              meh: { body: "Your vote goes onto the tally sheet, and nobody turns that page again." },
              fail: { body: "The veto threat folds the bill. The money flows, the war goes on. Your colleagues call it showboating." },
              critfail: { body: "The state plant loses a contract and two thousand people get pink slips. The layoff notice carries no name of yours. The town's does." }
            }
          },
          {
            id: "surge_back",
            text: "Stand for the surge publicly: do not cut the legs as troops move up",
            note: "You bet eighteen months can turn it. Risk: if the surge fails, you are one of its faces.",
            outcomes: {
              crit: { body: "The violence numbers really bend downward by autumn. The year-end panel invites the man who backed the surge, and the state plant adds a shift." },
              ok: { body: "You stood with the commander in chief. The machine logged it; the street did not forgive it." },
              meh: { body: "Neither camp quotes your endorsement, and the quarter passes quietly." },
              fail: { body: "The casualty count keeps climbing. Your speech for the surge becomes the spine of your opponent's ad." },
              critfail: { body: "The timetable never attaches and the money clears. That month another coffin comes to your town, and the pallbearers will not look at you." }
            }
          }
        ]
      },

      {
        /* 2010-01 · 竞选出资裁决 */
        id: "ln10_money",
        title: "The Supreme Court lifts the cap on independent spending, and super PACs open for business",
        body: "In late January the Supreme Court decides the case brought by a nonprofit against the Federal Election Commission: government\n" +
          "may not limit independent political spending — ads bought outside any campaign — by corporations or unions. One rule is left standing: no coordination with the candidates.\nWithin months an entity called the super political action committee opens for business, raising without ceiling. The math of fundraising is rewritten overnight: your own committee still lives under the old contribution caps; the people who spend on your behalf do not. The autumn midterms become, exactly as advertised, the most expensive on record.\nWhose money arrives at your door first?",
        choices: [
          {
            id: "keep_books",
            text: "Do not follow: raise money by the old rules, one cent less",
            note: "You bet restraint is still worth something after the flood peaks. Risk: your voice drowns in other people's ads.",
            outcomes: {
              crit: { body: "The autumn ads flood the local channels. In the end the only yard sign still standing is yours, and voters say: at least he never begged for outside money." },
              ok: { body: "You raised inside the old limits and ran the old errands. Nobody finds a fault in it." },
              meh: { body: "You kept the books spotless. Spotless enough that nobody noticed." },
              fail: { body: "The outside ads run three times a month against your one buy. The message gets talked over." },
              critfail: { body: "The post-mortem line on your page reads: he would not even take the money. Somebody reads it aloud at your next rally." }
            }
          },
          {
            id: "super_hook",
            text: "Tap the new pipe: let a super committee happen to speak for you",
            note: "You bet coordination is hard to prove. Risk: the moment the wire is found, it is a scandal.",
            outcomes: {
              crit: { body: "Three ads in your favor run, all of them paid from out of state. You never said a name, and the reporters never found the wire." },
              ok: { body: "The committee fights the fight you wanted and could not order. The machine learns to look past that stretch of road." },
              meh: { body: "The card you sent goes unanswered; the ads praise somebody else." },
              fail: { body: "The coincidence is too neat: the ad copy matches your internal memo word for word. The editorial page asks what you think a coincidence is." },
              critfail: { body: "The committee and your office share a lawyer. The paper has one word for that — coordination — and the complaint is already at the election commission." }
            }
          },
          {
            id: "reform_cry",
            text: "Ride the backlash: make undoing this ruling your campaign issue",
            note: "You bet anger at the money is the one thing money cannot buy out. Risk: you cannot afford the ad war.",
            outcomes: {
              crit: { body: "Your line — this seat is not for sale — becomes the year's most forwarded raise. They spend against you the hardest and lose to you the worst." },
              ok: { body: "You said the sentence at every town hall. The checks did not come; the handshakes did." },
              meh: { body: "Everyone nods at your issue, then turns back to the ads." },
              fail: { body: "Three super PACs flood your state. Your message cannot get out of the church basement." },
              critfail: { body: "You lose more than the seat. The exit poll says the last two weeks of ads decided it, and on the donor list your name sits in the wrong column." }
            }
          }
        ]
      }
    ]
  }
});
