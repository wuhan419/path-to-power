/* ============================================================================
 * CONTENT · i18n/en/events/86-enclave.js
 * 中文文件 content/events/86-enclave.js 的英文覆盖层（5 张卡 / 22 个 id）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件、选项按 id 对齐；terms 不带 id，按数组下标对齐，条数与中文一致。
 *   · known / rumor / unknown 是纯字符串数组，整体替换，条数与中文完全一致。
 *   · 结构性键（id / era / tierMin / weight / base / mods / effects / flags /
 *     req / cost / contacts / minRep …）受引擎保护，本文件一律不写。
 *
 * 英文写法：按英语重写，第二人称、现在时、短句；「」用冒号或间接引语化进句子；
 * 社区机构用英文通名（the guild / the pastors / the association），不造专名。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ---- 1) 讲台上的十分钟 ---- */
      {
        id: "enc_preacher",
        title: "The Pastor Offers You Ten Minutes at the Pulpit",
        body: "Four hundred people fill the South Side Baptist church every Sunday morning. The pastor owns their Sundays — and the week of talk that follows about whoever he mentions. He gives you ten minutes, said very politely: a few words after the hymn. What he does not say: how many eyes are in the room during those ten minutes, and which word the community will use for you when others speak in your place.",
        brief: {
          lede: "In a country that is not yours, the week's most valuable ten minutes are not in a council chamber. They are on a church pulpit.",
          known: [
            "A third of these four hundred will vote, and they will ask the pastor for whom.",
            "He backs no party, only this community. Your words must not cut against his.",
            "He did not offer the ten minutes for your sake. Someone asked him to.",
            "Three elders sit in the third row. They are the ones who keep the community's ledger."
          ],
          rumor: [
            "They say the last man the pastor vouched for had promised to fix the roof.",
            "They say the community is fighting over something, and he can afford to offend neither side."
          ],
          unknown: [
            "Why you — and not someone else.",
            "Which sentence of yours the three elders will remember."
          ],
          terms: [
            { k: "The pulpit", v: "The one place in the community where four hundred hear you at once, free." },
            { k: "The pastor", v: "He does not vote for you. He decides whether others vote for you." }
          ]
        },
        choices: [
          {
            id: "speak",
            text: "Go up. Talk about your own family, not policy",
            outcomes: {
              crit: { body: "You speak six minutes, five of them about your mother's first year in this country. Nobody shakes your hand afterward; they only lay a hand on your shoulder. The community has remembered one thing about you, and it will outlive the rest." },
              ok: { body: "Ten minutes, the right things said, nothing strained. Three people come up afterward; one of them asks for your number." },
              meh: { body: "You speak as neatly as a resume. The congregation listens politely, all the way to the end." },
              fail: { body: "You talk policy for seven minutes. From the fifth minute on, people in the back start drifting out." },
              critfail: { body: "You touch an old argument the community is still having, and take the wrong side of it. After the service, someone waits by the door. Not to shake your hand." }
            }
          },
          {
            id: "money",
            text: "Skip the stage. Pay for the roof instead",
            outcomes: {
              crit: { body: "You never take the pulpit, but you found the roofer, at thirty percent under the going price. On the last day of work the pastor says, in front of three people: this one gets things done. Four words like that are expensive in this community." },
              ok: { body: "The money goes out, the roof is fixed. The pastor notes the favor — and the amount." },
              meh: { body: "The money goes out, but the contractor drags for two months. Every time the pastor looks up at a leaking ceiling, he thinks of you." },
              fail: { body: "The money goes out and the roof is fixed. Then someone asks at a community meeting: what is he buying with that?" },
              critfail: { body: "You paid more than the job cost, and the difference has no traceable destination. Within three weeks the whole South Side knows." }
            }
          },
          {
            id: "pass",
            text: "Neither. Stay home on Sunday",
            outcomes: {
              crit: { body: "You did not go. Half a year later you learn what that service actually decided — and that you were not dragged into it. Sometimes absence is the correct position." },
              ok: { body: "A quiet morning at home. One more room full of people never learns your name." },
              meh: { body: "You did not go, and nobody asks. The community was never waiting for you anyway." },
              fail: { body: "You did not go. Next day the pastor asks, through a mutual friend, whether you think yourself above them. The question gets retold three times." },
              critfail: { body: "You stayed home, and your rival stood in that pulpit. He spoke six minutes. On his way out, someone held the elevator door for him." }
            }
          }
        ]
      },

      /* ---- 2) 商户公所的长老们 ---- */
      {
        id: "enc_elders",
        title: "The Guild's Seven Elders Invite You to Tea",
        body: "The merchants' guild on the old-town street has seven elders. They do not care about your election. They care about who may open a shop on their street, whose rent can still be negotiated, whose child gets a seat at the weekend school. They invite you to tea — old leaves, glass cups worn smooth by other families' hands. Seven men sit across from you. Nobody speaks first. Their rule: the guest talks first.",
        brief: {
          lede: "Eight hundred people live on this street, two hundred of them voters — but what they care about is whether you can get one thing done.",
          known: [
            "The seven run seven trades, and their grudges with each other are older than you.",
            "They poured the tea because some job needs doing, and only an outsider can do it.",
            "They will not say what the job is. You have to draw it out of them.",
            "Their memories are long. One favor done twenty years ago still gets mentioned."
          ],
          rumor: [
            "They say the seven are clashing over a city block-improvement grant.",
            "They say two of the seven have stopped speaking to each other."
          ],
          unknown: [
            "Whether the job they want offends the other half of the street.",
            "If you refuse, whether they simply stop counting you as present."
          ],
          terms: [
            { k: "The guild", v: "No charter, no elections. Its authority is that this is how it has always been done." },
            { k: "The right gift", v: "What the community calls a donation. Not a bribe — an entry fee." }
          ]
        },
        choices: [
          {
            id: "ask",
            text: "Ask first: which job do you need done",
            outcomes: {
              crit: { body: "You asked the right question. What they need is a grant application watched at City Hall for three months. You watch it. By the end, this street has seventy new storefronts." },
              ok: { body: "You draw the job out of them and deliver it. No great thing — but they remember: the man took notes while asking." },
              meh: { body: "You ask. They say it is nothing, we just wanted to meet you. You know it is not true, and you do not press." },
              fail: { body: "You ask too directly. Two of the seven begin packing up the tea things. In their language, that means you have been seen out." },
              critfail: { body: "You promise something you cannot deliver, and promise it loudly, on the spot. Three months later everyone on this street knows your word binds nothing." }
            }
          },
          {
            id: "donate",
            text: "Open your wallet first: fund the guild's tutoring seats",
            outcomes: {
              crit: { body: "As you give, you say one line: if it runs short, come to me again — but keep my name off it. Next month a small line appears on the wooden plaque at the guild door. Your name. The highest courtesy they extend to an outsider." },
              ok: { body: "The money goes in, the tea gets drunk, someone walks you to the door when you leave. That is enough." },
              meh: { body: "The gift is taken, the thanks given, and nothing follows. You start to wonder whether the tutoring school ever saw a cent." },
              fail: { body: "Your amount counts as over-eager here. By the next day people are asking what line of work you are actually in." },
              critfail: { body: "Someone tells a rival association the size of your gift. There, the number gets read as a price tag." }
            }
          },
          {
            id: "tea",
            text: "Just drink the tea. Learn all seven names",
            outcomes: {
              crit: { body: "You go through two pots and hear thirty years of this street's history, including who wronged whom, and why. You promise nothing. But you are the first outsider who ever let them finish." },
              ok: { body: "The tea ends, the small talk ends. You leave with three names, which is more than most manage." },
              meh: { body: "You sit an entire afternoon through two rounds of complaints about nothing that involves money. No gain, no loss." },
              fail: { body: "You listen for two hours and ask for nothing. To them, the man who wants nothing is the most suspect in the room." },
              critfail: { body: "At the table you mention the name of the next street over. Those three words touch something one elder buried thirty years ago." }
            }
          }
        ]
      },

      /* ---- 3) 双语选票 ---- */
      {
        id: "enc_ballot",
        title: "The Elections Office Is Dropping Bilingual Ballots at Three Polling Places",
        body: "This year the elections office will withdraw bilingual ballots from three polling places. The stated reason: low utilization. The counting rule: only voters who asked for the bilingual form at the counter count as users. In those three precincts live seventeen hundred registered voters who never speak English. They do not lack the need. They were never asked to ask.",
        brief: {
          lede: "Seventeen hundred votes do not vanish on their own. They only become people who never learned what happened.",
          known: [
            "The three targeted are Old Town's densest, lowest-turnout precincts.",
            "The elections director is no villain — he was told to press costs down.",
            "No paper has run it yet. Right now it is only an administrative decision.",
            "You have twenty days, then the commission's regular meeting."
          ],
          rumor: [
            "They say the plan came from a candidate's office.",
            "They say two elders are already planning a sit-in on the City Hall steps."
          ],
          unknown: [
            "Whether the papers call this civil rights or a management detail.",
            "How many of the seventeen hundred will remember you."
          ],
          terms: [
            { k: "Bilingual ballot", v: "One sheet of paper that decides who can choose without being translated." },
            { k: "Utilization", v: "A counting rule. Change the rule and the finding flips." }
          ]
        },
        choices: [
          {
            id: "public",
            text: "Go public: make this a story every paper has to run",
            outcomes: {
              crit: { body: "You hold a fifteen-minute press conference on the City Hall steps, all of it numbers. Next day the plan goes back for review. A year later, bilingual-ballot requests at the three precincts have quadrupled — because now somebody asks." },
              ok: { body: "The paper ran it. The plan slips a year; the compromise keeps two precincts and drops one. You cannot win all of it, but the affair now has a paper trail." },
              meh: { body: "Someone wrote it up — small, local desk, no follow-up the next day. The plan proceeds." },
              fail: { body: "You spoke up, but too hotly. Before the commission, the director describes you as a man politicizing an administrative question. The plan passes." },
              critfail: { body: "After you step forward, the story becomes one man agitating for votes. The ballots are cancelled at all three precincts on schedule, and this time nobody raises the subject at all." }
            }
          },
          {
            id: "inside",
            text: "Work the inside: give the director a plan he can sign without losing face",
            outcomes: {
              crit: { body: "You bring a finished alternative: a community foundation absorbs half the cost of the three sites. He signs, and writes in the margin — resolved by community self-funding. All three precincts keep their ballots, and nobody lost." },
              ok: { body: "He agrees to postpone the withdrawal two years. In two years, a patient person can move mountains." },
              meh: { body: "He accepts your materials, and your courtesy. One word changes in the plan: withdraw becomes consolidate into a nearby site." },
              fail: { body: "He tells you, with great polish, that he is only a civil servant. Three days later the plan passes on schedule." },
              critfail: { body: "Word travels up that you visited him. Someone on the commission asks: why see the director first, and the newspaper second?" }
            }
          },
          {
            id: "media",
            text: "Stay quiet: hand it to someone who writes for a living",
            outcomes: {
              crit: { body: "He does not write about an administrative decision. He writes about how seventeen hundred names vanish from a list. Eleven other papers pick it up." },
              ok: { body: "The story runs. Next day the elections office says: not withdrawn, for now. You never stood out front, and it got done." },
              meh: { body: "He wrote it, but slanted: the whole piece is about the department's budget squeeze. The plan is not withdrawn." },
              fail: { body: "He sits on it three weeks, then says the topic already ran this year. You burned the best week of your twenty." },
              critfail: { body: "The story runs, and the very same day the director publishes his own data: four bilingual ballots used at the three precincts last year. The flag you raised gets taken apart as arithmetic." }
            }
          },
          {
            id: "silent",
            text: "Say nothing. This is not your story to tell",
            outcomes: {
              crit: { body: "You kept your mouth shut — and let three elders go sit at City Hall for three days themselves. The plan was withdrawn, and it was withdrawn by them. They file it under what we do ourselves. You are permitted to stand nearby." },
              ok: { body: "Other people got it done. Your position in the affair was not-objection. That counts as a position too." },
              meh: { body: "Nobody speaks. The plan passes. The bilingual ballots at those three precincts never come back." },
              fail: { body: "You say nothing, while people in the community wait for you to. What they remember is not your position. It is your silence." },
              critfail: { body: "You stayed quiet, and your rival spoke in your place — standing on the City Hall steps beside those three elders, and standing exactly right." }
            }
          }
        ]
      },

      /* ---- 4) 街上的规矩 ---- */
      {
        id: "enc_street",
        title: "The Shopkeepers Want to Run Their Own Night Watch",
        body: "Four robberies on this street in three months — all after ten at night, all within eight blocks of a patrol car that never comes. The wait for a response has gone from nine minutes to thirty-seven. The owners of twenty-three shops hold a meeting, and someone proposes a watch of their own. Two men in uniform are sitting in the room. They plainly dislike the idea.",
        brief: {
          lede: "There is no right answer here. Whichever side you choose, you lose the other half's trust. The only difference is how much.",
          known: [
            "Watches work — that is how other cities cut their robbery counts.",
            "But once one forms, within three months someone gets hurt, or someone oversteps.",
            "The police's real worry is not crime. It is who runs this street.",
            "Nine of the twenty-three renew leases next year, and the landlords are locals."
          ],
          rumor: [
            "Some say a few young men on the block are already walking the nights themselves.",
            "Some say this precinct lost seven officers to other assignments this year."
          ],
          unknown: [
            "If something goes badly wrong, whose name gets called first.",
            "Which of these two sides actually turns out to vote next year."
          ],
          terms: [
            { k: "The watch", v: "The community's own night eyes: effective, and uncontrollable." },
            { k: "Patrol allocation", v: "A number on a budget sheet. Move it and response times move with it." }
          ]
        },
        choices: [
          {
            id: "support",
            text: "Back the watch — under the community association's banner",
            outcomes: {
              crit: { body: "You get it anchored. The association charter, the duty roster, the no-carry list — all written to your design. The watch runs eleven months; night crime on the block drops sixty percent, and nothing happens." },
              ok: { body: "The watch forms. Some are unhappy, but by winter the street is visibly quieter." },
              meh: { body: "The watch forms, runs two months, and dissolves over scheduling. Robberies return to their old count." },
              fail: { body: "In its third week, two young watchmen corner a passerby at an alley mouth. Nobody is hurt, but two squad cars arrive." },
              critfail: { body: "Your watch and the police clash in the street, and local news films it. Afterward, both sides write the debt under your name." }
            }
          },
          {
            id: "police",
            text: "No watch. Go get the police back instead",
            outcomes: {
              crit: { body: "At the budget hearing you turn eight blocks of waiting time into one table and read it for three minutes. A month later the street has an assigned night car — permanent." },
              ok: { body: "The department adds two extra tours a week. Small, but people on the street can see the lights." },
              meh: { body: "They listen with great courtesy, then tell you this year's staffing is already set." },
              fail: { body: "You push too hard at the hearing and embarrass a deputy chief on the spot. No cars added; the wait on your street goes to forty-one minutes." },
              critfail: { body: "The twenty-three owners hear that you spoke for the police. They begin to wonder which side you are on — and on this street, that wonder is the worst thing you can earn." }
            }
          },
          {
            id: "both",
            text: "Seat both sides in one room: the watch and the precinct together",
            outcomes: {
              crit: { body: "Three hours, two shouting matches, and one small deal at the end: the watch makes the call, the precinct promises to answer within ten minutes. Sometimes two sides need no trust — only a phone number." },
              ok: { body: "The meeting ends with nobody storming out mid-session. That, by itself, is an outcome." },
              meh: { body: "Four hours, nothing decided. Both sides stay polite to you. Both are sure you were speaking for the other." },
              fail: { body: "The arguing starts at minute thirty, and one owner says the unsayable. Afterward the two men in uniform tell you: from now on, bring things to us directly." },
              critfail: { body: "Someone leaks the minutes. Each side mines them for the sentences that help it — and both conclude that you were the one who released them." }
            }
          },
          {
            id: "away",
            text: "Not your affair. Let them decide it themselves",
            outcomes: {
              crit: { body: "You skip the meeting. Three months later they settle it on their own: the shops pool money for one hired night guard. The street solved its own problem, and you are indebted to neither side." },
              ok: { body: "You stayed away. The meeting happens twice, and the question hangs undecided. The robberies neither rise nor fall." },
              meh: { body: "You stayed away. The street ends up doing nothing at all — and your name moves to the column marked invited, did not come." },
              fail: { body: "You stayed away, and someone at the meeting proposes asking you. Another says you would look down on such things. That second sentence gets remembered a long time." },
              critfail: { body: "In your absence the affair hardens into proof that outsiders only come around for votes. You did nothing wrong. The street files you as an outsider anyway." }
            }
          }
        ]
      },

      /* ---- 5) 你是我们的人（总账，一局一次）---- */
      {
        id: "enc_first",
        title: "The Community Meets to Send One of Its Own Up a Tier",
        body: "Three dozen people, that night, in a borrowed basement. The pastor speaks first, then three elders, then the names start. At the fourth name, somebody says yours — and the room goes quiet for two or three seconds. Those seconds are the whole decision. They need one person to run for the next seat up. They do not lack people. They lack someone who can be accepted outside.",
        brief: {
          lede: "The community is meeting to field one of its own for the next seat up. They have chosen you.",
          known: [
            "This community can turn out four thousand votes. In a local race, that takes a seat.",
            "They do not expect you to win. They expect a familiar face standing at the door on registration day.",
            "Accepting is taking a side: the party will file you as the community's man.",
            "They hate being a stepping stone. If you start acting like a politician, they will notice."
          ],
          rumor: [
            "They say there was a second name until last year; it offended the elders.",
            "They say someone in the party is already asking what was said in that room."
          ],
          unknown: [
            "If you lose, whether they still count you as one of theirs.",
            "If you decline, whether whoever takes it remembers to step aside for you."
          ],
          terms: [
            { k: "To field", v: "A community moving as one: no money, only a name." },
            { k: "Acceptable", v: "Trusted inside the neighborhood, and not read as a threat outside it." }
          ]
        },
        choices: [
          {
            id: "accept",
            text: "Run yourself, in the community's name — it can burn your party ties, or take the seat",
            outcomes: {
              crit: { body: "You stand and say two sentences: I am not moving away. Win or lose, I will be here again next month. Then chairs scrape all at once. They do not just field you — they turn the whole street over. The election has not started, and the other side is already retreating." },
              ok: { body: "You accept. By six the next morning, three people wait at your door for assignments. The race is still yours to run — but this time you do not run it alone." },
              meh: { body: "You accept, but in the meeting you add one line about consolidating resources. The room goes quiet for a beat, and someone changes the subject." },
              fail: { body: "You accept with one condition: your people pick the campaign staff. In that basement, the sentence means: you people do not understand elections." },
              critfail: { body: "You accept, and within two weeks the party hears of it. You have become a man both sides are watching — and neither side likes being watched." }
            }
          },
          {
            id: "broker",
            text: "Field someone else. Your money, your people, your campaign — and the seat answers to you (the kingmaker road, party ties intact)",
            outcomes: {
              crit: { body: "You pick the man who has run a restaurant on this street for nineteen years. He wins. Five years later, before every decision the office makes, one call goes out: what does the guild say? The call comes to you." },
              ok: { body: "He wins; you stand at the back of the crowd. Nobody knows about your money — except the people who need to know." },
              meh: { body: "He loses, and loses badly. Nobody ever mentions what you spent, but you keep that ledger yourself." },
              fail: { body: "He loses, and his concession speech thanks everyone who helped him — except you. On this street, there is no more awkward way to be remembered." },
              critfail: { body: "He wins, and six months later starts pretending he does not know you. Your money, your people, your lists — all of it became someone else's capital. In this trade, that has a very old name." }
            }
          },
          {
            id: "decline",
            text: "Say nothing tonight. Take no endorsement, field no name — stay clear of both sides (keep every option open)",
            outcomes: {
              crit: { body: "You say: if I am still here this time next year, ask me again. Somebody laughs. For three years they ask once a year, and every time, you are still here. That is the most expensive thing you own." },
              ok: { body: "You decline. They do not press, and they keep you for dinner. The community thinks exactly what it thought before; the burden just fell on someone else." },
              meh: { body: "You decline, with reasons that twist a little too much. People in the room begin stacking chairs." },
              fail: { body: "After declining, you add two sentences of explanation. In their ears, those two mean: I think this seat beneath me." },
              critfail: { body: "You decline — then come back three months later asking for support, this time for your own project. They give it. From that day, you sit in a different column of their ledger." }
            }
          }
        ]
      }
    ]
  }
});
