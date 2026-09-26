/* ============================================================================
 * CONTENT · i18n/en/events/91-scandal-2.js
 * 中文文件 content/events/91-scandal-2.js 的英文覆盖层（丑闻线·第二包）。
 *
 * 契约（详见 docs/I18N.md §1–§5、§7）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的字段。
 *   · 事件按 id 定位；choices 按 id 对齐；terms 无 id，按下标对齐，顺序/条数与中文一致。
 *   · 结构性键（id / era / minYear / tierMin / weight / base / mods / cost / stake /
 *     req / flags / notFlags / after / outcomes 里的引用键 …）由引擎保护，一律不写。
 *
 * 英文写法：按英语重写，不逐字翻。第二人称、现在时、短句；「」用引号或改写掉。
 * 本线大量泛称（对手 / 某议员 / 专栏作家 / 中间人）不落成具体真人姓名；
 * 破第四面墙处也保持泛称，不引入现实公司/真人专名（中文原文亦未点名）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ---- 1) 挖坟队盯上了你的大学时代 ---- */
      {
        id: "sca2_opposition_research",
        title: "Someone is digging through your college yearbook",
        body: "An intern on staff finds out someone pulled your file at the alumni office.\n" +
          "Not a reporter — reporters call first. A dig team: a firm the other side pays by the page,\n" +
          "yearbook to class list. Your college years have a few pages that play badly in a headline —\n" +
          "not crimes, just quotable. Even if they strike gold, they will wait for your weakest week.\n" +
          "Whether they hold a rumor or a photocopy — only they know.",
        choices: [
          {
            id: "confess",
            text: "Get ahead of it: tell the old story yourself in an interview",
            note: "The bet: voters hate being surprised more than the thing itself. Say it first and it is candor; let them find it and it is a scandal. Risk: if they had no real proof, you just handed them the map.",
            outcomes: {
              crit: { body: "At the end of an education interview you mention the old thing, lightly. The host blanks for two seconds, then laughs. Three months later the dig report lands on your rival's desk with one line in the margin: 'No longer useful — he told it first.'" },
              ok: { body: "You tell it. A local paper runs two paragraphs, no follow-up. The old story fizzles before it becomes a weapon." },
              meh: { body: "You tell it, but vaguely. A reporter follows the vagueness for two more weeks and finds nothing — yet your vagueness goes into the record." },
              fail: { body: "Your confession hands the other side a direction. They had rumors; now they know which building to check." },
              critfail: { body: "Your version differs from the campus-paper archive in three details. Both run the next day. Now the scandal is not the old thing — it is why you lied." }
            }
          },
          {
            id: "preempt",
            text: "Turn the dig back on them: make the digging their scandal",
            note: "Once you find who hired them you can expose him or send a quiet word to stop. Find the line and you hold the initiative; miss and you spent tens of thousands showing how rattled you are.",
            outcomes: {
              crit: { body: "A week later you hold a copy of a payment receipt: the client is an adviser on your rival's committee. You say nothing public. You just let a columnist 'happen' to learn it. Nobody digs again." },
              ok: { body: "You find the line, only as far as the middleman. Enough. You pass a word through someone, and the file-request log at the alumni office goes permanently 'lost.'" },
              meh: { body: "You spend twenty thousand and trace the firm to a law office that handles half the city. The trail ends there." },
              fail: { body: "The man you sent to ask questions gets recognized. Overnight your rival moves the file from 'backup' to 'main attack.'" },
              critfail: { body: "Your counter-dig becomes its own dossier: 'Candidate Hires Detectives to Watch Rival.' To them, that file reads far better than your college pages." }
            }
          },
          {
            id: "pray",
            text: "Do nothing and live your life",
            note: "The bet: most dig reports die in a drawer. The other side is busy fighting the race, not your college mess. But if they did find something, you have no answer ready in any version.",
            outcomes: {
              crit: { body: "Two months later the primary ends, your rival loses, and the report dissolves with the committee. You never learn what they found." },
              ok: { body: "Nothing follows. Maybe they found nothing; maybe they saved it. You cross these pages out of your head." },
              meh: { body: "Nothing follows, but now you rehearse your college timeline before every interview. That is not living. It is only not dying." },
              fail: { body: "Late in the campaign a small story quotes 'a person familiar with the matter.' No name — enough for those who know to know." },
              critfail: { body: "Eleven days before the vote the whole file is bound and mailed to three papers. You never prepared a single version of an answer — you can't even say 'no comment' without stammering." }
            }
          }
        ]
      },

      /* ---- 2) 私下场合的话被录了音 ---- */
      {
        id: "sca2_leak_pod",
        title: "Someone recorded what you said in private and is selling it back",
        body: "It was a study in a friend's house. Everyone there you knew.\n" +
          "You said a thing — about voters, about money, about how you really saw it. It felt good to say.\n" +
          "Now someone has packed that feeling into an object and mailed it to you:\n" +
          "no signature, one line — 'What do you think it's worth?'\n" +
          "Alone, the clip is a fragment, stripped of its context. With the lines before and after, it is fatal.\n" +
          "Only three others were in that room, and one of them taped it.\n" +
          "Money, leverage, or a long leash — you will not know which before you pay the first dollar.",
        choices: [
          {
            id: "ownit",
            text: "Release it first: put the tape and its full context out yourself",
            note: "Self-defusing a mine — you take the bomber's fun in setting it off and turn the fragment back into the whole sentence. The bet: your people still stand with you once they hear the rest.",
            outcomes: {
              crit: { body: "At a press conference you play the full tape, then answer the ugliest lines yourself, one by one. That night's verdict: 'Messy, but clean.' The blackmailer's leverage turns to scrap plastic overnight." },
              ok: { body: "You release the tape yourself. Ten days of scolding, then the news finds something juicier. You survive, with a nickname that sticks." },
              meh: { body: "You release it, but a cut version ran a week ahead. Nobody hears your full one — they only remember the headline." },
              fail: { body: "The full tape holds a second, worse thing you had forgotten. You reload their gun by hand." },
              critfail: { body: "Answering, you say 'privately, yes, I really think that' — cut out alone, ten times deadlier than the tape. Your honesty becomes your confession." }
            }
          },
          {
            id: "buy",
            text: "Buy it back: pay, and take the tape",
            note: "You can buy this tape, not the memory of it. And the payment itself — money with no clean description — is the seed of the next scandal.",
            outcomes: {
              crit: { body: "The middleman takes the cash, hands over the tape, demagnetizes it in front of you, smooth as a man who has done it a hundred times. You stay politely alert around every appliance in every study from now on." },
              ok: { body: "You get the master. You lock it in a safe, then start waiting — for the second letter, or for it never to come." },
              meh: { body: "You pay, you get the tape — a dub. Who holds the master, they didn't say." },
              fail: { body: "The payment gets logged. Now you keep two secrets: the thing you said, and the transfer made to bury it." },
              critfail: { body: "'Candidate Pays Hush Money to an Unidentified Person' — a headline ten times bigger than the tape, and the financial disclosure carries your signature. You bought yourself a larger scandal." }
            }
          },
          {
            id: "deny",
            text: "Go cold: no answer, no admission, keep every public appearance",
            note: "A blackmailer's currency is your panic. A full calendar says more than any statement: this tape is not important.",
            outcomes: {
              crit: { body: "You cut ribbons as usual, dine as usual, talk policy on TV as usual. Three weeks on the blackmailer loses patience and gifts the tape to a tabloid — the editor hears it, calls it 'not enough,' and drawers it." },
              ok: { body: "Nothing follows. Maybe it is waiting for a better moment. But this month is not it." },
              meh: { body: "You act unbothered, but every time you enter a room with people in it you scan for the speaker. This way of living is expensive." },
              fail: { body: "The tape leaks, cut to forty seconds. Your silence reads as consent." },
              critfail: { body: "During your three silent weeks your rival turns it into an ad and runs it in three districts. When you finally speak, the first question is: why now?" }
            }
          }
        ]
      },

      /* ---- 3) 家人惹祸 ---- */
      {
        id: "sca2_family_member",
        title: "A bail bond call at two in the morning",
        body: "Your brother got pulled over out in the suburbs. Drunk driving, and a donor's son rode with him —\n" +
          "a donor whose checks are reaching you right now.\n" +
          "By the book he'll be out on bail before dawn. By the book this is in tomorrow's local paper too.\n" +
          "On the phone he said one line: 'Please don't tell Mom.'\n" +
          "You hold the receiver and remember every rally he worked for you, every sign he held.\n" +
          "This is not the first time. Save him, cut him loose, or stand beside him —\n" +
          "whether he thanks you or decides you owe him, that is the part nobody can tell you.",
        choices: [
          {
            id: "fix",
            text: "Pull strings overnight: find a middleman to bury this before dawn",
            note: "Money and favors move a police department, but not its duty log. What you push down doesn't vanish — it comes back later, with interest.",
            outcomes: {
              crit: { body: "Before dawn the stop becomes a 'verbal warning.' The local reporter sleeps well. The middleman says only: 'Last time — I mean your calls, not his.'" },
              ok: { body: "Buried. No name in the paper, just a 'suburban stop' brief. What your brother owes you starts being counted a new way today." },
              meh: { body: "The name held, the process didn't: ninety days off his license, and you gain a middleman who now knows everything about you." },
              fail: { body: "Somebody tips the paper that 'the candidate's brother got special handling.' The story shifts from drunk driving to privilege." },
              critfail: { body: "The move to bury the stop becomes the crime itself. The district attorney opens a case not on the driving but on obstruction — and the person under investigation is you." }
            }
          },
          {
            id: "cut",
            text: "Issue a distancing statement: he's an adult, he answers for himself",
            note: "The most 'leadership' option, and the coldest. Voters will nod. Your mother won't.",
            outcomes: {
              crit: { body: "The statement is clean: he's an adult, he answers for himself, you love him but won't touch the process. Pundits praise your line between public and private. The donor's check arrives on time." },
              ok: { body: "The notice runs, the fuss passes in two days. Your seat at the family table changes too — from 'the pride of the family' to 'the hard one.'" },
              meh: { body: "You issue it. No one praises, no one scolds — people just remember your brother sat in a squad car, and that you didn't save him." },
              fail: { body: "You cut too fast. The photo of him walking out of the station alone, next to your statement, plays like a joke online for a week." },
              critfail: { body: "He takes a radio interview and tells the family's other version — including who took the beating for whom as kids. The one who cut loose gets cut back, and he does it with tears." }
            }
          },
          {
            id: "stand",
            text: "Go to court with him and face the cameras together",
            note: "Treat him as family, not as trouble. Half the voters will be moved. The other half will write down your plate number.",
            outcomes: {
              crit: { body: "Beside him you own it, pay the fine, and say 'my family carries its own.' The brothers-together photo leads page one the next day, with a caption surprisingly kind." },
              ok: { body: "You walk the process with him. Some call it a show; more just see a man standing next to his brother." },
              meh: { body: "You stood by him, and it's still the news. He murmurs thanks in court, and you figure it was worth it." },
              fail: { body: "The together photo nails you and 'drunk driving' to one page for a whole week. The donor's check does not come." },
              critfail: { body: "At the hearing the other county's old record comes up — never sealed after all. 'Repeat' plus 'family privilege' now both burn up to you." }
            }
          }
        ]
      },

      /* ---- 4) 旧账清算日 ---- */
      {
        id: "sca2_old_receipt",
        title: "Someone is blackmailing you over your dirty start-up money",
        body: "In the envelope a photocopy: a ten-year-old check stub, an account you had nearly forgotten,\n" +
          "and one number circled in red — the dirty start-up money you took back then.\n" +
          "The sender is no reporter, no prosecutor. He is the middleman from that deal —\n" +
          "the money man is dead; the ledger sits with him.\n" +
          "He adds one line: 'What we agreed to then — that wasn't this price.' Two things he wants:\n" +
          "a storage fee, and you still telling the old cover story — the agreed line, now the crack in it.\n" +
          "How many other copies are already in play, you cannot ask.",
        choices: [
          {
            id: "pay",
            text: "Pay the storage fee and keep the old story",
            note: "Buy the page back and ratify the line. You keep your origin; the price is that every word he says you now obey — and you become the new guarantor of the cover story.",
            outcomes: {
              crit: { body: "You pay, you ratify the story. He keeps faith like a banker: the stub is yours, and the page with your name in the ledger is now blank. Burning the stub, you think this is the only decent ending this trade allows." },
              ok: { body: "Done. You bought back the page and a permanent owner. When he says 'talk again,' it sounds like booking a round of golf." },
              meh: { body: "You pay; he won't give the stub — only a written note that 'the copies were destroyed.' If that paper is a lie, you don't even have the evidence." },
              fail: { body: "He takes the money and sells the stub to a reporter — one fish, two meals, the tradition here. Now you've lost both the cash and the page." },
              critfail: { body: "'Candidate Paid a Witness for Silence and to Coordinate Testimony' — that's how the indictment reads. Every hush dollar is now new evidence." }
            }
          },
          {
            id: "flip",
            text: "Hand him and the ledger over to the prosecutors",
            note: "Turn the old debt into a confession. You give up your origin to buy a star witness's ticket — one degree lighter, but 'the guy who told it all' follows you for life.",
            outcomes: {
              crit: { body: "You walk into the federal building with a lawyer and hand over everything you know. Three years on he's in prison for extortion and obstruction; you — first to talk — get a non-prosecution deal. Your old debt becomes history; your testimony becomes case law." },
              ok: { body: "You turned it in. He went in; you went into a long stretch of 'cooperating with the investigation.' Coming out, your district is still there — some even waited to hear you tell the whole thing." },
              meh: { body: "You turned it in, but the prosecutors want a bigger fish: they need you to wear a wire back to him. You now live a double agent's every day." },
              fail: { body: "The ledger is a fake — he forged it to bait you. Your 'confession' is the only real evidence in it. You handed your origin to a prosecutor by hand." },
              critfail: { body: "One lie in your statement gets caught — just one. The whole deal collapses; you go from star witness back to suspect, and the one who lied." }
            }
          },
          {
            id: "ride",
            text: "Ignore him: let him mail it, see who dies first",
            note: "The page in his hand burns you and everyone ever entered in that ledger — including far heavier names than yours. The bet: those people want the ledger gone more than you do.",
            outcomes: {
              crit: { body: "You do nothing. Two weeks later he dies of a 'heart attack' in a motel, and the ledger's whereabouts go unknown. You don't ask; no one tells. That night you sit a while longer, pour yourself one, then wash the dishes." },
              ok: { body: "You sit still and no one comes. Three months on, word is the ledger is 'lost' — plainly the other names in it were worth more than yours." },
              meh: { body: "Stalemate. The stub never surfaces and the man never disappears. Two men both holding guns, and from now on neither can blink first." },
              fail: { body: "He really does mail it. A reporter pulls the thread, and your origin is written out across three full pages." },
              critfail: { body: "The ledger reaches a prosecutor — all of it. Your page is the least notable there, but 'your page' becomes the first exhibit that starts the whole case." }
            }
          },
          {
            id: "clean",
            text: "Pay the money back with interest — to the people it truly harmed",
            note: "Only someone who actually took that patron's money sees this road: don't return it to him, return it to the people the money first hurt. The one path that owes no one.",
            outcomes: {
              crit: { body: "You spend three months tracing who the money first scraped off, then return it anonymous through a trust — principal plus ten years of interest. The stub is still in his hand. But when a reporter later gets it and asks you, you put the trust record on the table. The story runs under a headline about redemption." },
              ok: { body: "You pay it back. The money reaches who it should, and you sleep at night again. The stub becomes a page of waste — what wave can a debt you've already cleared raise?" },
              meh: { body: "You pay it back, but you're never fully sure the 'victims' you found were the right ones. You did your best — believing those four words yourself is enough." },
              fail: { body: "The repayment transfer gets traced: a large, unclear payment to a payee who won't explain. You didn't launder the old debt, you just gave it a new footnote." },
              critfail: { body: "Your supposed 'victims' were a play he staged — the money goes round and back into his pocket, plus one voucher showing you paid voluntarily. Your conscience gets sold a second time, at a posted price." }
            }
          }
        ]
      },

      /* ---- 5) 丑闻应对的十字路口 ---- */
      {
        id: "sca2_coverup_choice",
        title: "The story won't stay down. Forty-eight hours to pick a line",
        body: "It won't stay buried. The editor has already set the page, your lawyer's phone buzzes on the desk,\n" +
          "your campaign manager stands at the window, back to you, and asks the question you must now answer:\n" +
          "'Which road do we actually take?'\n" +
          "The thing did not happen today; it came due today. The denial window runs until the evidence chain closes.\n" +
          "The cutting math is honest: the head you throw must be big, or you only bought time.\n" +
          "Countersuing can flip it and can double it — your own file enters the same judge's drawer first.\n" +
          "Word is the editor holds half the material, betting you supply the rest. The missing link — whose hands, right now?",
        choices: [
          {
            id: "hold",
            text: "Stonewall: deny, stall, wait for them to err first",
            note: "Not one step back. The bet is that the evidence chain snaps at the key link. Men who stonewalled and won built iron walls. The ones who lost never even got to apologize.",
            outcomes: {
              crit: { body: "You clamp to 'no such thing,' four words, and show up to work every day. Three weeks later their 'key witness' is found to have taken money from both camps; the whole story is retracted. Your iron wall was cast in this one stand." },
              ok: { body: "You ride it out. No retraction, no proof — the thing hangs in the third paragraph of your wiki page as 'disputed,' but your term does not break." },
              meh: { body: "It becomes a tug-of-war. A new claim each week; your agenda shrinks to this one thing." },
              fail: { body: "The window shut: the document you bet didn't exist shows up in a second reporter's inbox. Your first denial is now the first charge." },
              critfail: { body: "The night the chain closes, your party issues an overnight statement 'monitoring developments.' You weren't brought down by the accusation — you were brought down by your own first denial." }
            }
          },
          {
            id: "cut",
            text: "Cut someone loose: assign the blame to the responsible party, public and total, today",
            note: "Make the story belong to someone else. You hand over a big enough name to get yours off the headline. The cost: he now knows everything about you, and he hates you.",
            outcomes: {
              crit: { body: "That day you hold a press conference, lay out the timeline, the signatures, the blame layer by layer, and end: 'The fault is in his duties; the fault is in my trust.' Next day the lead changes names. You lost a ten-year aide and kept everything else." },
              ok: { body: "You cut. The story did change names, but every reporter on the beat remembers the person you dropped sat ten steps from your desk." },
              meh: { body: "You cut, too small. The story's still about you, now with a 'has resigned' footnote. You threw away a stand-in for nothing." },
              fail: { body: "He won't take the deal. Inside forty-eight hours he is on TV with his own lawyer and his own timeline — now it is two people accusing, and you've added 'passing the buck' to the list." },
              critfail: { body: "The cut-loose email traffic leaks in full: even the resignation's wording was drafted by your office. 'Directed a fake resignation' becomes the last headline that buries you." }
            }
          },
          {
            id: "counter",
            text: "Countersue: drag the leaker and the rival into court together",
            note: "The riskiest of gambits. Offense is the best defense — provided your case is cleaner than theirs. While you open their file, yours lands in the same judge's drawer.",
            outcomes: {
              crit: { body: "Your lawyer unearths, in discovery, the transfers between them and the campaign committee. The suit flips into a new scandal — someone else's. The photo of you reading a statement on the courthouse steps is used for a whole term." },
              ok: { body: "The case is filed. Heat moves from 'your scandal' to 'two families at war.' You didn't win, but you turned the scaffold into a ring." },
              meh: { body: "The case drags, the heat drags, so do your legal bills. A year on, it settles, all sides confidential. Your books read clean; what isn't on them is still there." },
              fail: { body: "The judge throws out most of your claims and folds your file into their evidence. Countersuit becomes self-prosecution: in open court you complete your own chain of evidence by hand." },
              critfail: { body: "The document you accused them of forging is authenticated as real. Countersuit, perjury, obstruction — all three filed. You didn't just lose the original case; you added time to its sentence." }
            }
          }
        ]
      },

      /* ---- 5b) 十字路口的余波（req.flag 分支，只覆盖文案） ---- */
      {
        id: "sca2_coverup_after",
        title: "The road you chose has mailed you the bill",
        body: "The old thing got an ending — or rather a first draft of one. A first draft is never the final one.\n" +
          "You thought the account was settled. Today's mail is the interest — a buried story charges upkeep, every few years.\n" +
          "The senders differ, but every bill is addressed to the same line:\n" +
          "the road you chose in those forty-eight hours.\n" +
          "What you decide now is not the old thing. It is which version you tell from here on —\n" +
          "and whether that version holds one line you did not expect.",
        choices: [
          {
            id: "after_hold",
            text: "Tell the version you held then as a stance you never left",
            outcomes: {
              crit: { body: "In your memoir you give the whole forty-eight hours a chapter — day by day, hour by hour, not one word changed. Even the people who didn't believe you then admit: real or not, that steadiness is itself a political asset." },
              ok: { body: "You tell that version again, and it wears smooth. An old story with no new version slowly cools." },
              meh: { body: "The version hasn't changed, but each retelling needs two more holes patched. You've done the math: at this rate, ten more years and you can't patch them." },
              fail: { body: "Someone finally supplies the missing link. You have no new version to tell — because you talked the old one to death." },
              critfail: { body: "An internal recording shows you said privately, back then, that 'the thing is true.' The public denial, the private admission, the printed stance — three versions, page one, same day." }
            }
          },
          {
            id: "after_cut",
            text: "Go see the person you cut loose",
            outcomes: {
              crit: { body: "You meet him at a quiet diner and lay out the decision then, one sentence at a time, ending: 'There was only this road, but I picked it, and the debt is mine.' He is silent a long while, then asks them to box the steak he didn't finish. The next year, his testimony saves you once." },
              ok: { body: "One meeting, not deep. He takes your apology and takes the new job too — you both know which of the two is worth more." },
              meh: { body: "He agrees to see you and records the whole thing. Every pleasantry you say he keeps — not to use, but so you know he keeps them." },
              fail: { body: "He won't see you. He sends word back: 'Just tell him I remember who wrote the resignation letter.' That line starts circulating inside your own party." },
              critfail: { body: "He writes a book. Chapter nine is you: every text, every call at two in the morning. The book itself doesn't matter; what matters is the promo tour lands right on your re-election." }
            }
          },
          {
            id: "after_counter",
            text: "The countersuit's case reaches its real verdict day",
            outcomes: {
              crit: { body: "On verdict day you win — not just the suit; the judge writes in the opinion that 'plaintiff's claims are substantiated.' Your team frames that line and hangs it in the office. The old gambit is now your hardest shield." },
              ok: { body: "It settles, terms confidential. Out loud you can say 'I won.' In here you know it's called 'bought back.' Fine." },
              meh: { body: "The case peters out on 'insufficient evidence.' No winner — the money you spent and the time they spent cancel out." },
              fail: { body: "The verdict goes against you. The material you handed over in the countersuit is now the seed of a second investigation — your file is still in that judge's drawer, only a different man reads it." },
              critfail: { body: "They counter-punch inside your suit and land: you're found to have sued maliciously and pay all costs. Worse, the ruling enters the textbooks — every law student now learns 'the risk of hiding a scandal behind a countersuit,' under your name." }
            }
          },
          {
            id: "silence",
            text: "Tell no version anymore. Let it live only in other people's memory",
            note: "Stop paying the renewal. A story without an owner grows on its own — however it grows is no longer your affair.",
            outcomes: {
              crit: { body: "From now on you never take the question, not once. Five years later, at a hearing with nothing to do with this, someone brings it up; the chair bangs the gavel: 'Out of scope.' You don't say a word, and it ages out on its own." },
              ok: { body: "You don't tell it, and after a while people stop asking. It becomes an old story with no verdict — and no verdict is sometimes the best verdict." },
              meh: { body: "You don't speak of it, but once or twice a year it drifts back on its own, then drifts off. Like an old wound that aches when the weather turns." },
              fail: { body: "Your silence reads as consent. Your rival's ad doesn't need your version — the silence is the version they wanted." },
              critfail: { body: "A documentary tells the story for you: two hours, thirty-seven witnesses, none of them you. Over the credits your silence gets one caption line: 'We invited him. He declined.'" }
            }
          }
        ]
      }
    ]
  }
});
