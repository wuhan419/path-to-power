/* ============================================================================
 * CONTENT · i18n/en/events/50-era-2008.js
 * 中文文件 content/events/50-era-2008.js 的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices / terms 里带 id 的按 id 对齐，不带 id 的对象按数组下标对齐。
 *   · 结构性键（id / era / minYear / tierMin / weight / base / mods / effects /
 *     flags / req / cost …）由引擎保护，写了也不会生效，validate 会直接报错。
 *   · 缺译的字段自动留中文，所以可以一张一张补。
 *   · 经济字段是系数，不涉及文案，不用管。
 *
 * 英文写法：按英语重写，不是逐字翻。第二人称、现在时、短句；
 * 「」在英文里用引号或改写掉；机构名用真实英文（Lehman Brothers、TARP、IRS）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "2008_crash_offer",
        title: "The Treasury wants you on TV to defend the bailout",
        body: "Lehman fell two weeks ago, and the government has sent a $700 billion bailout — public money propping up failing banks, codenamed TARP — to Congress.\n" +
          "A Treasury aide you met only last week calls after midnight: the plan needs voices from outside to vouch for it. Sign, and you get airtime.\n" +
          "A list of signers is already at the back of the file, and a few names you know only from the news. A lawyer friend says the bill hides authorization clauses nobody can verify. The ones you cannot read will turn on you someday.",
        choices: [
          {
            id: "sign",
            text: "Sign on and take your national screen time",
            outcomes: {
              crit: { body: "You become the calm, level-headed young voice. The country learns your name. The Treasury Secretary says privately: we owe you one." },
              ok: { body: "The endorsement clears. The media gives you thirty seconds. The establishment remembers." },
              meh: { body: "You signed, but bloggers dig up the fine print. A bought label sticks to you." },
              fail: { body: "Your lines are cut into an ad: he speaks for Wall Street. Social media piles on." },
              critfail: { body: "You misread a number on live television. Late-night hosts have a field day." }
            }
          },
          {
            id: "refuse",
            text: "Refuse, and call the bailout unjust in a statement",
            outcomes: {
              crit: { body: "Your statement runs in full. The voice of the people — now that is your brand." },
              ok: { body: "You win the base. You make an enemy of the Treasury." },
              meh: { body: "The statement sinks without a trace. But you sleep well." },
              fail: { body: "Nobody bites. The word is that you wanted attention." },
              critfail: { body: "You quote the wrong statute. Experts pile on; your credibility hits zero." }
            }
          },
          {
            id: "leak",
            text: "Leak the briefing to a reporter and buy exposure",
            outcomes: {
              crit: { body: "You become the whistleblower. Someone important writes your name down." },
              ok: { body: "The story runs. You are described as a source with direct knowledge." },
              meh: { body: "A small story. You now owe a reporter one." },
              fail: { body: "The chain breaks before it holds. Now they think you made it up." },
              critfail: { body: "You leak the wrong version and become the leak scandal's main character. An inquiry opens." }
            }
          },
          {
            id: "shop_floor",
            text: "Ignore the cameras: bring the foreclosed families into your office and log their cases one by one",
            outcomes: {
              crit: { body: "One evening, thirty-odd households on your list. When you carry it to the town office, the clerk stands for the paper before the man." },
              ok: { body: "You filled out every form you could for them. Nobody thanks you publicly; next year a few more familiar faces shake your hand." },
              meh: { body: "Most who came only wanted someone to explain what the television meant. You couldn't, so you sat with them instead." },
              fail: { body: "Someone recognizes you from the signed list and asks not about the bailout, but which bank keeps your own money." },
              critfail: { body: "Your intake list gets copied and carried off, printed under the header: He was keeping score of these losses too. Your kindness becomes the evidence." }
            }
          },
          {
            id: "amend_terms",
            text: "Take the TV slot, but endorse only the version with homeowner relief written in",
            note: "Take the microphone, name your price. The Treasury may bend to it — or simply find another mouth.",
            outcomes: {
              crit: { body: "Your thirty seconds runs on the evening news; 'save the banks, save the house first' becomes the quoted line. The committee folds it into the amendment." },
              ok: { body: "You went on air and set terms. Only a few lines survived; they use your phrasing." },
              meh: { body: "Your endorsement played as static. Not one amendment passed." },
              fail: { body: "The Treasury hands your 'but' straight back: the clauses stand unchanged, and your signature was filed anyway." },
              critfail: { body: "The foreclosure figure you quoted is disproven on air. Overnight you go from 'the man with terms' to 'the man who can't count.'" }
            }
          },
          {
            id: "floor_vote",
            text: "Trade the endorsement for your vote: read your conditions aloud, yes or no riding on the tally",
            note: "The whole country is watching this one vote of yours. You set the price, or you eat the loss.",
            outcomes: {
              crit: { body: "Line by line, the changes you read make it into the re-voted text; the whole bill rearranges around your price. By nightfall both parties are calling you." },
              ok: { body: "You traded in one condition; the rest got cut. Your name goes on the page marked 'knows how to negotiate.'" },
              meh: { body: "Your conditions were absorbed into the floor debate record. Nobody recalls who read them." },
              fail: { body: "Through the twenty-four hours the first vote lay defeated, the country's cameras found the haggling class. You were frame one." },
              critfail: { body: "The exception you won turns out to have been rewritten for one patron bank. The subpoena and your primary arrive in the same week." }
            }
          }
        ]
      },
      {
        id: "2008_tea_party",
        title: "Tea Party taxpayers pack the hall and demand an answer on the banks",
        body: "Tax day, and a high-school gym is wall-to-wall with people calling themselves the tea party — a grassroots revolt against taxes and government spending.\n" +
          "What they hate is one thing: public money saving banks while their own homes go into foreclosure. The organizers give you fifteen minutes and one demand — pick a side.\n" +
          "Tonight's words will be cut into an ad within a few years.",
        choices: [
          {
            id: "fire",
            text: "Roar with them and damn Washington",
            outcomes: {
              crit: { body: "One line sets the room on fire. The video passes a million plays." },
              ok: { body: "You get the cheers. The establishment pins a populist label on you." },
              meh: { body: "Decent applause. Someone holds up a sign calling you a showboater." },
              fail: { body: "A retired teacher corners you with questions until you stop answering." },
              critfail: { body: "One blurted sentence becomes a He Scorns the Poor clip. The whole internet rises." }
            }
          },
          {
            id: "calm",
            text: "Talk them down with data",
            outcomes: {
              crit: { body: "One chart silences the room. Pundits call you a rare voice of reason." },
              ok: { body: "The room cools. You are judged short on fire." },
              meh: { body: "Half the room leaves. Half take notes." },
              fail: { body: "Your numbers are called fake. You lose the room, and your face." },
              critfail: { body: "The source you cited is disproven the same day. Your academic credibility takes a heavy hit." }
            }
          }
        ]
      },
      {
        id: "2008_short",
        title: "A fund friend slides you data and a way to bet against housing",
        body: "A hedge-fund friend hands over a dataset: delinquency in the pools rated prime is climbing in a way the historical models say cannot happen.\n" +
          "He says he is not the only one looking — a few funds are already building positions quietly. Two moves are on the table: short it through credit default swaps, insurance-style contracts against mortgage paper, or publish the data.\n" +
          "You know the direction. You do not know the day it breaks — and before the crash, your own position may kill you first.",
        choices: [
          {
            id: "short",
            text: "Bet your whole fortune and short the market",
            outcomes: {
              crit: { body: "The crash arrives on schedule. You collect — and you saw the rot in the system before most." },
              ok: { body: "You make money. You did not bet heavy enough." },
              meh: { body: "You profit. People call it profiteering from other people's ruin." },
              fail: { body: "Bad timing. You cut your losses and walk out badly wounded." },
              critfail: { body: "The leverage turns on you. Near bankruptcy, owing favors to everyone." }
            }
          },
          {
            id: "expose",
            text: "Go public with the warning and take no position",
            outcomes: {
              crit: { body: "You become the one who warned early. Your moral standing soars." },
              ok: { body: "The press credits your conscience. The money stays in someone else's pocket." },
              meh: { body: "Nobody listens. You miss a fortune." },
              fail: { body: "You are laughed off as a worrywart." },
              critfail: { body: "The firm you warned about turns around and sues you for disrupting the market." }
            }
          }
        ]
      },
      {
        id: "2008_donor",
        title: "A dinner given by an oil magnate",
        body: "He wants someone who listens. One check would fund your entire campaign and still pay your staff —\n" +
          "for the right vote on the Energy Committee. He gave another lawmaker more two years ago, and that man returned the favor.\n" +
          "They say he keeps recordings, to maintain stability in relationships.",
        choices: [
          {
            id: "take",
            text: "Take it, and note the debt",
            outcomes: {
              crit: { body: "You take the money and somehow stay untied to the chair. A masterful touch." },
              ok: { body: "Campaign money solved. But people now know your price." },
              meh: { body: "The money lands. It comes with a speech you did not want to give." },
              fail: { body: "He records the exchange as insurance. Now someone else holds the leash." },
              critfail: { body: "An undercover reporter films the deal. The scandal detonates." }
            }
          },
          {
            id: "decline",
            text: "Decline politely and stay clean",
            outcomes: {
              crit: { body: "Your refusal becomes a story people tell each other. Small donations pour in instead." },
              ok: { body: "You hold the line. Money is tight, but you sleep." },
              meh: { body: "One check short. Nothing hurt." },
              fail: { body: "Opponents smile and call your purity bad strategy." },
              critfail: { body: "You refuse so arrogantly that you offend the entire chamber of commerce." }
            }
          }
        ]
      },
      {
        id: "2008_affair",
        title: "A colleague's aide messages you at midnight",
        body: "An assistant to one of your colleagues messages you at 1:17 a.m. You have been drinking, and your marriage is in the phase nobody likes to mention.\n" +
          "You know what this means — and you know a photograph would end everything. But you know one more thing:\n" +
          "his schedule, his calls, his dinners all pass across her pillow — pillow intelligence, fresher than any briefing.\n" +
          "One thing you cannot see: whether a third person has already read this message.",
        choices: [
          {
            id: "go",
            text: "Go",
            note: "The payoff is real: pillow intelligence (leverage), one fiercely loyal inside source, and a closeness nobody touches. The risk is real too: photographs, blackmail, and a jilted man's political revenge. High risk, high reward, priced in the open.",
            outcomes: {
              crit: { body: "She is more than tender. She is talkative. Before dawn you learn three things: who paid the down payment on your colleague's house, which lobbying firm holds his consulting contract, and what he keeps locked in his desk drawer.\n" +
                "She rests her head on your shoulder: I've told no one else this.\n" +
                "You now have one fiercely loyal inside source — and an accomplice you cannot untie." },
              ok: { body: "A night nobody ever learns of. At the door she kisses your cheek: His calendar changes three times next month. Want to hear?\n" +
                "You have your first piece of intelligence, and someone willing to keep talking." },
              meh: { body: "She is more clear-headed than you expected. The next day brings a proper message: Last night ends last night. Then a postscript — something your colleague plans next week.\n" +
                "Kindness, and a token of allegiance. You leave a weakness behind and take a card with you." },
              fail: { body: "The hallway cameras were not for decoration. The photograph never leaks — but it exists on someone's hard drive." },
              critfail: { body: "The photograph sells to a tabloid. Your marriage and your career detonate at once. The cruel irony: the outlet that runs it is a media friend of her boss." }
            }
          },
          {
            id: "stop",
            text: "Stop, and go home",
            note: "Zero risk, zero payoff? No. A clear-headed morning makes your name for reliability worth more. On the credibility track, this compounds.",
            outcomes: {
              crit: { body: "You switch the phone off. By morning you are trusted more." },
              ok: { body: "You did the right thing." },
              meh: { body: "A little dull. But harmless." },
              fail: { body: "You passed on a connection you might have needed." },
              critfail: { body: "You refuse so bluntly that people start calling you a sanctimonious fraud." }
            }
          }
        ]
      },
      {
        id: "2008_affair_collect",
        title: "The secret your lover told you can now swing a vote",
        body: "Two of the three things she whispered from his pillow have come true — the colleague did plant one of his own.\n" +
          "A decisive vote is coming. He is the deciding vote, and only you hold what can bury him. Her newest message is one line: he will be fragile next week.\n" +
          "How will you use it? They say she tells the same things to others; intelligence never sells to one buyer only.\n" +
          "And every use invites the same question: how did you know that?",
        choices: [
          {
            id: "media",
            text: "Feed it to the press: let his secret detonate on its own",
            note: "Fastest and dirtiest. He is out, your vote is safe — but the question of who your source was follows you for years.",
            outcomes: {
              crit: { body: "The story lands at the perfect hour. He quits public life overnight to spend time with his family. Your vote passes in your direction, and your name appears nowhere." },
              ok: { body: "He steps down; you win the vote. Reporters keep asking who fed them. You practice a very innocent face." },
              meh: { body: "The story runs, but he denies everything and it drags into a standoff. The vote squeaks through." },
              fail: { body: "He weathers it and starts hunting the leak. Before he reaches her — he reaches you." },
              critfail: { body: "The chain is reconstructed end to end: her — you — the reporter. Her career ends. You gain the nickname the politician who kills with pillow talk, and it never comes off." }
            }
          },
          {
            id: "warn",
            text: "Warn him privately: abstain, or the details go public",
            note: "Intelligence traded for a favor. He owes you a large one — and now knows how you operate. A controlled transaction.",
            outcomes: {
              crit: { body: "He listens, says nothing for a long time, then asks: what do you want? From then on he is your shadow on the committee." },
              ok: { body: "On the day of the vote he is out sick. After the session he nods to you once in the corridor. The nod is slow." },
              meh: { body: "He abstains. But his eyes tell you this favor will be repaid in the way you like least." },
              fail: { body: "He chooses mutual destruction: confesses half of it first, then pins the spying by a political rival story on you." },
              critfail: { body: "The conversation was recorded. Next day a story runs about a lawmaker blackmailing with private lives. Your name is absent. The description is not." }
            }
          },
          {
            id: "sit",
            text: "Do nothing: keep the weight on your own shoulders",
            note: "The safest play is never to play. Intelligence goes stale — but she will remember that you held it. That itself is a relationship.",
            outcomes: {
              crit: { body: "The vote goes as it would have. The world goes on. But you notice people looking at you differently — and in her eyes there is a new respect." },
              ok: { body: "You bury those few sentences. They will rot in the ground. Most secrets do." },
              meh: { body: "Months later the colleague is exposed anyway, without you. You feel relief, and a faint regret." },
              fail: { body: "She waits a long time for a follow-up. Gradually, the messages stop coming." },
              critfail: { body: "She sells the intelligence to someone else. It detonates all the same — and you carried the risk for months for nothing." }
            }
          }
        ]
      },
      {
        id: "2008_affair_burn",
        title: "Your opponent has the photograph. Voting is in three weeks",
        body: "Your campaign manager pushes a photograph across the desk: that night, date and location printed on the back. Voting is in three weeks.\n" +
          "The sender is anonymous, but the timing is precise — the primary is three weeks out. Neither your wife nor the voters know. Both learn in the same week.\n" +
          "In your hand the picture weighs almost nothing. In voters' eyes it will weigh a great deal.\n" +
          "They say the opponent bought it from a private investigator for six figures. Where she is now, and what she will say, is entirely outside your control.",
        choices: [
          {
            id: "confess",
            text: "Get ahead of it: admit it on television, with your wife beside you",
            note: "Highest risk, highest return. Done well you are an honest man who erred; done badly, a double funeral. Right now your integrity is a real attribute.",
            outcomes: {
              crit: { body: "On the night the interview airs, you tell the truth and your wife holds your hand. Next day the poll goes up, not down. At least he is not pretending, people say." },
              ok: { body: "You admitted it and took the beating for two weeks. Then the news moved on to bigger things. You survived, with scars." },
              meh: { body: "The apology runs. The poll drops eight points and neither recovers nor collapses. The campaign goes on." },
              fail: { body: "Your apology is panned as too well-rehearsed. Beyond the photograph, reporters dig up three more phone logs." },
              critfail: { body: "In the interview, your wife speaks first — she has known for a while and was waiting for you to say it. The cameras catch her back as she walks out. That photograph wins a Pulitzer that week. Everything else loses." }
            }
          },
          {
            id: "deny",
            text: "Deny everything: call it a fake, a political smear",
            note: "A bet on the evidence chain and on doubt about technology. In this era the word synthetic carries no weight yet — the earlier the year, the harder this road.",
            outcomes: {
              crit: { body: "Your team works all night on an explainer about photo forensics. The tech press buys it first. The photograph's origin becomes the other side's scandal." },
              ok: { body: "The denial holds for three weeks. On election day you win by two points. Nobody mentions the photograph — for now." },
              meh: { body: "Believers and doubters split the room exactly in half. The election turns into a referendum on one photograph." },
              fail: { body: "A second photograph arrives, dated, with a witness. Your first denial is now the evidence." },
              critfail: { body: "Every word of your denial is disproven one by one. The campaign melts within a week; the party disavows you. You become the man who lied to the end." }
            }
          },
          {
            id: "buy_silence",
            text: "Pay for it: make the photograph disappear",
            note: "A six-figure hush payment. You can buy the print, but not the people who know it exists. And the payment itself is new leverage.",
            outcomes: {
              crit: { body: "The fixer takes the money. The negatives are destroyed in front of you. As if it never happened — except for you and your accountant." },
              ok: { body: "The photograph is pulled. But the other side kept a copy. All you bought was time." },
              meh: { body: "You pay and the story goes on hold. Three months later it surfaces on a tabloid's inside page. Nobody reads it. You still break into a cold sweat." },
              fail: { body: "The payment itself was recorded. Now you have two secrets: the photograph, and the transfer that buried it." },
              critfail: { body: "Candidate Paid to Destroy Evidence runs ten times louder than the photograph ever could. Every dollar you spent is now exhibit A." }
            }
          }
        ]
      },
      {
        id: "2008_debate",
        title: "The trap in the live debate",
        body: "This is live, and nine in ten viewers are studying you seriously for the first time. Your opponent throws a question you never prepared for —\n" +
          "a loaded one, with an unproven premise buried inside: answer it and you have accepted it.\n" +
          "You have ninety seconds to respond and thirty-five are gone. The room waits. What these seconds get cut into, you find out tomorrow.",
        choices: [
          {
            id: "attack",
            text: "Strike back at your opponent's past",
            outcomes: {
              crit: { body: "A killing blow. He never recovers that night. Your numbers jump." },
              ok: { body: "You did not lose. You call it even." },
              meh: { body: "You land the hits, but you sound cruel." },
              fail: { body: "Your facts are debunked live, on the spot." },
              critfail: { body: "You attack the wrong man and your own record comes out instead. A debate-night embarrassment history remembers." }
            }
          },
          {
            id: "pivot",
            text: "Steer the question to ground you own",
            outcomes: {
              crit: { body: "Textbook control of the stage. The commentators applaud." },
              ok: { body: "You held steady." },
              meh: { body: "You sidestepped — and were called evasive." },
              fail: { body: "The hard turn draws laughter from the room." },
              critfail: { body: "You stall for a full ten seconds. It becomes a meme." }
            }
          }
        ]
      },
      {
        id: "2008_foundation",
        title: "Found a foundation in your own name",
        body: "A foundation in your own name is standard practice for politicians: a nonprofit that raises money, hires people and buys goodwill.\n" +
          "Have an accounting firm audit the books and the details stay legally private. It can launder a reputation — and it can become tomorrow's evidence, because self-dealing is a felony.\n" +
          "They say one lawmaker keeps eight no-show advisers on his own foundation's payroll. Someday a reporter will read through your receipts.",
        choices: [
          {
            id: "found",
            text: "Found it, and do real work",
            outcomes: {
              crit: { body: "The foundation earns real praise. You become the doer with ideals." },
              ok: { body: "It runs steadily." },
              meh: { body: "It runs, but the overhead invites questions." },
              fail: { body: "Someone starts watching how the donations are spent." },
              critfail: { body: "Evidence of self-dealing surfaces. The foundation becomes a byword for scandal." }
            }
          },
          {
            id: "sham",
            text: "Found it as a shell for laundering",
            outcomes: {
              crit: { body: "Flawless. The money comes out clean and nobody notices." },
              ok: { body: "The money lands. The trail is mostly gone." },
              meh: { body: "You profit — but your partner is getting unstable." },
              fail: { body: "The accountant kept a copy. You are called in to answer questions." },
              critfail: { body: "The IRS comes to your door. A money-laundering charge is now a live possibility." }
            }
          }
        ]
      },
      {
        id: "2008_social",
        title: "A tweet out of control",
        body: "The late-night jab you tossed off on a whim is now reposted twenty thousand times by big accounts, screenshots captioned with a verdict.\n" +
          "Your team says: deleting looks guilty; leaving it means the morning shows quote it. You know that without that one word the line was harmless.\n" +
          "Here any statement can be captured, filed and kept forever. This one waits for the day you most need to look decent.",
        choices: [
          {
            id: "double",
            text: "Post again and pour oil on the fire",
            outcomes: {
              crit: { body: "You turn it around and the joke becomes legend. Your following explodes." },
              ok: { body: "Still hot, but you did not crash." },
              meh: { body: "You got the attention. Some call it frivolous." },
              fail: { body: "Each explanation makes it worse." },
              critfail: { body: "You insulted a group you should not have. Boycott, across the board." }
            }
          },
          {
            id: "delete",
            text: "Delete it now and play dead",
            outcomes: {
              crit: { body: "Deleted cleanly. Even the screenshot crowd finds nothing." },
              ok: { body: "The fuss dies down." },
              meh: { body: "Someone saved the image. Nothing comes of it." },
              fail: { body: "Deleting confirms exactly what they said." },
              critfail: { body: "You accidentally delete a different, important post. The slip is your own." }
            }
          }
        ]
      },
      {
        id: "2008_lobby",
        title: "A lobbyist calls on behalf of a trade group",
        body: "A call from K Street — where Washington's lobbying firms cluster, a byword for the whole industry:\n" +
          "'We would like your future committee to understand our position.' Translated: donations, consulting contracts, phone calls rounding up votes for you.\n" +
          "He is clear about the alternative — if you will not take it, he goes to your opponent. What you do not know is whether he has a recording of this call.",
        choices: [
          {
            id: "broker",
            text: "Broker the deal and take a cut",
            outcomes: {
              crit: { body: "You close a big deal. Everyone upstairs and downstairs remembers who helped." },
              ok: { body: "The cut lands. The network gets denser." },
              meh: { body: "It closes, but one side thinks you took too much." },
              fail: { body: "You please nobody and get left outside the room." },
              critfail: { body: "The deal carries a bribe. A recording surfaces. You become the fall guy." }
            }
          },
          {
            id: "reform",
            text: "Turn around and push lobbying reform",
            outcomes: {
              crit: { body: "You flip the table on the unwritten rules and are hailed as the clean current." },
              ok: { body: "You set your brand — and make an enemy of K Street." },
              meh: { body: "Much thunder, little rain." },
              fail: { body: "The reform draft gets smothered in caucus." },
              critfail: { body: "You touched the wrong cheese. The retaliation smear lands hard." }
            }
          }
        ]
      },
      {
        id: "2008_primary",
        title: "The party chose someone else. Do you flip the table?",
        body: "The party establishment has thrown in with another candidate. A primary is an intra-party election for the nomination,\n" +
          "and it is won with delegate seats, not grassroots enthusiasm — the machine and the whole fundraising network sit with the other man.\n" +
          "Concede without a fight, or overturn the table: challenging costs you party trust, submitting costs you your own time.\n" +
          "Your supporters are already organizing and raising money on their own. How the party treats you after you flip the table, nobody says in advance.",
        choices: [
          {
            id: "challenge",
            text: "Upset the establishment candidate in the primary",
            outcomes: {
              crit: { body: "The dark horse wins, and the whole country starts seeing you differently." },
              ok: { body: "An ugly victory. But you won." },
              meh: { body: "You won. The price: your party now files you under traitor." },
              fail: { body: "You lose, but your name gets bigger." },
              critfail: { body: "A lopsided loss, your old debts aired for everyone. You will not recover quickly." }
            }
          },
          {
            id: "comply",
            text: "Fall in line and wait for your turn",
            outcomes: {
              crit: { body: "The party bosses note your good sense. A good seat is promised." },
              ok: { body: "You pass unharmed." },
              meh: { body: "You are handed a sinecure." },
              fail: { body: "They forget you." },
              critfail: { body: "You bowed too low. The grassroots write you off completely." }
            }
          }
        ]
      }
    ]
  }
});
