/* ============================================================================
 * CONTENT · i18n/en/events/93-media-2.js
 * 中文文件 content/events/93-media-2.js 的英文覆盖层（7 张媒体/舆论卡）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices / terms 里带 id 的按 id 对齐，不带 id 的对象按数组下标对齐。
 *   · 结构性键由引擎保护，本文件只写 title / body / text / note / outcome body。
 *
 * 媒体题材写法：用真实英文媒体语汇（profile piece、fact-check desk、above the fold、
 * junk mail、press corps、the tape），不直译中文报刊俚语。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ---- 1) The profile piece ---- */
      {
        id: "med2_profile",
        title: "A national magazine wants an 8,000-word profile of you",
        body: "A reporter from a national magazine has come to write the full-length profile —\n" +
          "not what you stand for but what you are: positions can be clarified, a persona cannot.\n" +
          "He shadows you for three days: two events, one dinner, one car ride. He does not do Q-and-A; he reconstructs —\n" +
          "the way you came in late, the look in your aide's eye. Every question politely asked —\n" +
          "polite enough that you almost forget: not one of those eight thousand words will need your approval.\n" +
          "Whether he has settled on his headline, you learn on publication day.",
        choices: [
          {
            id: "open",
            text: "Open every door: show him the real you, unflattering parts included",
            note: "Pretense is what this breed of reporter hates most. Openness may buy a portrait of a living man — or an autopsy.",
            outcomes: {
              crit: { body: "On publication day you cannot make yourself read it first. When you do: he wrote the you that you never managed to say out loud. Your team prints it as page one of the campaign handbook." },
              ok: { body: "Eight thousand words about a man more interesting than his rumors. Not perfect. It stands up." },
              meh: { body: "The piece reads like a passport photo. You were not hurt. You were not really seen, either." },
              fail: { body: "He wrote up the time you were late, the two times you cut someone off, the joke in the backseat. The man those details assemble is not easy to look at." },
              critfail: { body: "You opened all the way and named something only three people know. On publication day, one of the other two sends a four-word message: 'Why did you talk.'" }
            }
          },
          {
            id: "control",
            text: "Run it tight: rehearsed answers only, schedule timed to the minute",
            note: "A media-trained interview never crashes, and never breathes. This kind of reporter has very little tolerance for being spoon-fed.",
            outcomes: {
              crit: { body: "Every answer watertight — and he assembles a different story from the seams: 'a man who drafts himself over dinner.' The piece is about your discipline. The readers buy it." },
              ok: { body: "A clean article, a résumé in magazine format. You land safe. The cost: nobody will remember it." },
              meh: { body: "He writes it politely, politely enough for a press release. The editor cuts a third of the spread." },
              fail: { body: "By day three he is bored. His third paragraph reads: 'For the next two days, I watched the most standard answer machine in American politics.'" },
              critfail: { body: "Your staff slips him a sheet of talking points. He prints it word for word at the top, under one line: 'This is the man they want you to meet.'" }
            }
          },
          {
            id: "decline",
            text: "Decline the sit-down. It is not the right time",
            note: "Not playing costs nothing. But 'he won't sit for an interview' is itself a sentence, and that one gets printed.",
            outcomes: {
              crit: { body: "He skips you and writes a devastatingly fair piece about your opponent. Six months later he is back — this time with good news." },
              ok: { body: "The story dies. 'He's picky these days' circulates through the press corps. Cannot be called an insult." },
              meh: { body: "Nothing happens. The magazine gives the page to somebody else." },
              fail: { body: "'Declined to be interviewed by this magazine' runs at the end of someone else's story. One line. Many readers." },
              critfail: { body: "The refusal becomes the story itself: 'He is hiding.' For three months people keep asking whether something is wrong with you." }
            }
          }
        ]
      },

      /* ---- 1a) The profile, after print ---- */
      {
        id: "med2_profile_after",
        title: "Opponents keep quoting your profile out of context",
        body: "The piece hit newsstands a while ago, and it has not gone quietly into the file —\n" +
          "search your name and the profile is the first thing anyone finds.\n" +
          "Strangers introduce you with its sentences. Your opponents loop three of its paragraphs out of context.\n" +
          "And one complication: a rival magazine wants a response piece, and it is asking your staff for access.\n" +
          "Word is your opponent has been feeding that magazine old dirt on you.\n" +
          "After print, the byline is yours; the article belongs to the magazine.\n" +
          "Say nothing — do those three clipped sentences become your label?",
        choices: [
          {
            id: "own_it",
            text: "Own the article: for better or worse, that is you",
            note: "Owning an imperfect profile tells every writer: he can take the truth. With high credibility, this is an asset.",
            outcomes: {
              crit: { body: "At a public event you quote the piece's meanest passage yourself and answer it line by line. Someone in the room laughs — then believes you. The author becomes your most careful ally." },
              ok: { body: "You own it, and you fill in the context. The clips still circulate, but anyone who reads the whole thing shakes their head." },
              meh: { body: "You claim it, awkwardly. Neither camp buys it all the way." },
              fail: { body: "Your owning-it becomes fresh material: 'He finally responds to the profile.' The response gets clipped too." },
              critfail: { body: "The one line you chose to own is the passage readers doubted most. You confirmed the doubt with your own mouth." }
            }
          },
          {
            id: "counter",
            text: "Sit for the response piece and settle every clipped line",
            note: "Walking into the next magazine turns one story into two on purpose. You are betting on your charm and the magazine's decency.",
            outcomes: {
              crit: { body: "The response grows into a fuller portrait of you. The two magazines spar in print for a month. You collect a full cycle of free coverage in the middle." },
              ok: { body: "The three clipped sentences go back into their paragraphs. The bleeding stops. The scar stays." },
              meh: { body: "The new piece is lukewarm. Given two articles, readers remember the meaner one." },
              fail: { body: "You explained one thing too many. Now there are two articles to quote out of context." },
              critfail: { body: "The response writer never meant to respond. He meant to sew both pieces into one bigger story. He did." }
            }
          },
          {
            id: "let_fade",
            text: "Do nothing. Let the story age out",
            note: "News dies faster than it looks from the newsroom. You are betting there is no second wave.",
            outcomes: {
              crit: { body: "A month later a real national story takes every headline in the country. The profile files itself quietly away." },
              ok: { body: "The heat dies on its own. The clips stay in your opponents' hands, but a dull knife does not cut." },
              meh: { body: "Every few weeks someone quotes one line again. It does not hurt. It does not end." },
              fail: { body: "At a debate your opponent reads the clipped sentence aloud. You fail to correct it on stage. The clip travels." },
              critfail: { body: "Every silent day, 'he won't respond' grows. By autumn the profile is the standard opener for any story about you." }
            }
          }
        ]
      },

      /* ---- 2) Fact-check ---- */
      {
        id: "med2_fact_check",
        title: "A number you have used for two years just failed a fact-check",
        body: "The number you lean on in every speech — the one that draws applause —\n" +
          "got checked by a fact-check desk. Their verdict is blunt: it traces to a three-year-old estimate,\n" +
          "and even the estimate's author says it was misused. You quoted it in over a dozen settings; the tapes exist.\n" +
          "The rating publishes tomorrow. The headline is set. The tone is hard. Your staff is waiting for your call.\n" +
          "An admission must be paid in full — half-admitting gets you hit from both sides.\n" +
          "In two years, will people remember the bad number, or the correction?",
        choices: [
          {
            id: "deny",
            text: "Deny everything: it's a liberal fact-check outfit pushing a narrative",
            note: "Attacking the checker tightens your core. The cost: credibility leaks quietly, and the press files you in a new column.",
            outcomes: {
              crit: { body: "You call the desk 'an agenda machine,' and your voters cheer. Within three days the rating has vanished from their feeds." },
              ok: { body: "Two weeks of squabbling, no verdict. Your base holds. The middle voters frown once and move on." },
              meh: { body: "You swung, but nothing landed. The check circulates anyway." },
              fail: { body: "The same afternoon, the estimate's author goes public — standing with the check, point by point. Now the story is 'He won't stand by his own source.'" },
              critfail: { body: "Someone on your staff admits to a reporter: 'We knew the number was bad.' Every word you spat at the desk gets cut into one newscast." }
            }
          },
          {
            id: "own",
            text: "Correct the record publicly: issue the fix, give the new number",
            note: "An admission is a bill paid once. With high credibility it is money well spent. With low, it reads as weakness.",
            outcomes: {
              crit: { body: "Your correction is clean, and you pivot into the new data. The author vouches for you: 'The last politician who owned a mistake? I have to go back ten years.' That quote outruns the check itself." },
              ok: { body: "You fess up. The story lasts one cycle. Some call you soft. More people note: he owns it." },
              meh: { body: "You admitted it, clumsily. The headline reads 'Lawmaker Apologizes for Figure.' Neither ugly nor graceful." },
              fail: { body: "The correction presser happens; the opposition cuts your admission into an ad. Your apology becomes their ammo." },
              critfail: { body: "You owned this number. Overnight the desk checked the rest of them. Three days later, a second rating publishes." }
            }
          },
          {
            id: "swap",
            text: "Fight nothing: quietly swap in a fresh number and keep talking",
            note: "No admission, no fight, the speech moves on. It only works if the new number is genuinely harder.",
            outcomes: {
              crit: { body: "Your staff finds a fresher, harder number with bulletproof sourcing. The swap is seamless by the next speech. It even earns extra applause." },
              ok: { body: "The new number slots in. Someone notices the change. Nobody follows up." },
              meh: { body: "The replacement is forgettable; the applause drops by half. You kept face and lost your line." },
              fail: { body: "A reporter compares notes: 'Last week it was seventy percent. This week, sixty-two. No explanation.' The unexplained change becomes the story." },
              critfail: { body: "A week in, the new number gets checked — stale source this time. After the one-two punch, every speech of yours gets weighed before it starts." }
            }
          },
          {
            id: "quiet",
            text: "Say nothing; use that number less from now on",
            note: "The cheapest road. You are betting that nobody notices.",
            outcomes: {
              crit: { body: "The rating lands on a Tuesday nobody watches. It is right, and nobody sees that it is right." },
              ok: { body: "No response, no follow-up. The number slips quietly out of your remarks." },
              meh: { body: "You lost a line. The paragraph missing that number always reads half a breath short." },
              fail: { body: "Someone in the crowd raises a hand: 'The number you used — the checkers say it's wrong.' You mumble something. It makes the next day's briefings." },
              critfail: { body: "Silence reads as consent. A month later, 'fake number, wouldn't own it' is line one of your opponent's first attack ad." }
            }
          }
        ]
      },

      /* ---- 3) Debate camp ---- */
      {
        id: "med2_debate_prep",
        title: "Three weeks to the debate. Your team needs your style",
        body: "Election year. The debate is three weeks out — likely your largest single audience of the year.\n" +
          "Opponent, moderator's habits, the rumored question range — your team has taped it all to the wall.\n" +
          "One thing is missing from the board: which version of you walks on stage.\n" +
          "The opponent has one famous weakness and a rehearsed counter-punch.\n" +
          "The moderator punishes dodgers, and the third follow-up is the one the audience remembers.\n" +
          "Six past debates: every winner made one point; every loser tried to make all of them.\n" +
          "The rehearsal room is booked.",
        choices: [
          {
            id: "attack",
            text: "Run offense: make the opponent's weakness the night's refrain",
            note: "High risk, high reward: crowds love a kill shot; a miss looks like bullying. The next-day story will be your harshest line, nothing else.",
            outcomes: {
              crit: { body: "You touch the weakness three times. On the third, the opponent comes apart. The clip loops all night. A week later, polls have labeled you 'strong.'" },
              ok: { body: "The hits land; nobody falls. Voters see a sharp blade — and see that you did not follow through." },
              meh: { body: "You throw punches; the opponent absorbs every one. An even night. Nobody talks about the debate tomorrow." },
              fail: { body: "The opponent came armed and recites three of your own votes back at you. Your attack becomes his setup. The fight changes direction on stage." },
              critfail: { body: "You press too far, and the opponent answers with a family grief. The audience sees a man kicking someone when they are down. That moment follows you for four years." }
            }
          },
          {
            id: "defend",
            text: "Run defense: land every answer on your one issue",
            note: "Standing still rarely loses a debate. It rarely wins one either. You are betting the opponent blinks first.",
            outcomes: {
              crit: { body: "The opponent loses patience and swings at you; you park every question back on your own plank. The moderator writes later that one adult shared that stage." },
              ok: { body: "A watertight night. Voters find you credible. No spikes, no bruises." },
              meh: { body: "You are steady to the point of stuck. Voters remember the opponent's one zinger — and your one line: 'Let me return to our plan.'" },
              fail: { body: "The opponent takes every offensive rebound. You stand there like furniture. 'He was there, and he wasn't,' says the commentary." },
              critfail: { body: "On the third dodge the moderator slows his voice: 'You simply will not answer the question, is that right?' The audience laughs. At you." }
            }
          },
          {
            id: "story",
            text: "Run the storyline: put one voter's name in the script",
            note: "Stories are the most remembered and the most checkable. The name must be real; every detail must be exact.",
            outcomes: {
              crit: { body: "You tell the voter's story. Halfway through, the room goes quiet. The opponent's slides stop mattering. That voter later appears in your ad — on purpose." },
              ok: { body: "The story holds. The takeaway line: 'The data was his opponent's. The people were his.'" },
              meh: { body: "It runs long; the moderator cuts you off politely. Half a story is no story." },
              fail: { body: "The opposition finds the voter overnight; her version differs from yours in three places. The morning headline: 'A Borrowed Name.'" },
              critfail: { body: "It surfaces that you lifted the story secondhand and polished it. From then on, every true story of yours gets doubted first." }
            }
          },
          {
            id: "gut",
            text: "No rehearsal. Trust your instincts",
            note: "Some people were born for a stage. Some only think they were.",
            outcomes: {
              crit: { body: "You sleep well and take the stage without a page of notes. Three moments that night become your classic clips. Your own staff watches with their mouths open." },
              ok: { body: "You draw even and win on naturalness. Nobody on staff dares push you into rehearsal again." },
              meh: { body: "No rehearsal, no surprise either. You spent the most expensive night of the three weeks." },
              fail: { body: "The opponent quotes a vote of yours from three years ago; the details escape you live. The blank look gets replayed for a week." },
              critfail: { body: "A number you invent on the spot gets corrected live by the moderator's researcher. The silence in the room is louder than any boo." }
            }
          }
        ]
      },

      /* ---- 4) Dark flyers ---- */
      {
        id: "med2_dark_poster",
        title: "Anonymous attack flyers about you go up overnight",
        body: "Someone papered the town between midnight and dawn. All about you: three half-true facts,\n" +
          "one number inflated four times, and a handwritten hint, cold as a draft under a door.\n" +
          "Each half-truth sits on a real shell: slow to verify, and a denial sounds like an excuse.\n" +
          "Your staff peeled one off a polling-place door, one off a grocery bulletin board, one from under a wiper blade.\n" +
          "Print can be traced — paper stock, ink, the shop. And you have been rising; nobody wastes glue on a nobody.\n" +
          "Who paid and who pasted are often not the same hand.",
        choices: [
          {
            id: "trace",
            text: "Spend people and money on the source: paper, accounts, the print shop",
            note: "A found source is a gun you can point back. A missed one means you fed the river your money and your time.",
            outcomes: {
              crit: { body: "Paper weight leads to a small print shop; the shop leads to one invoice. You say nothing. You only let the other side know you hold the receipt. The flyers stop for good." },
              ok: { body: "You trace the circle: not the opponent's campaign, a few self-appointed volunteers. You spread the word. Far less paper appears." },
              meh: { body: "Two weeks of digging ends at a deleted account. Money spent, nothing found." },
              fail: { body: "Your hiring of a tracer gets leaked to the press under a clean headline: 'He Is Not Denying It. He Is Hunting People.'" },
              critfail: { body: "You chase the wrong shop and corner an innocent owner on his own doorstep. He calls the police. The next day's paper doubles the first." }
            }
          },
          {
            id: "counterattack",
            text: "Answer in kind: let some paper about him start circulating too",
            note: "Mutually assured destruction. The odds of winning are decent; afterwards you are also a person who does this.",
            outcomes: {
              crit: { body: "Your paper is uglier and better printed. The opponent goes first to explain the claims, then to explain the source. Nobody remembers the originals." },
              ok: { body: "The two piles of paper cancel each other out. Voters catch on and treat both as junk mail." },
              meh: { body: "Yours barely circulates. The money became waste paper." },
              fail: { body: "Your printer gets picked up and turns over the money trail. Now only one side's hands are dirty. Yours." },
              critfail: { body: "The opponent's people unwind your whole operation and read the payment record on television. That night you say 'I had no knowledge of this.' Nobody on your team looks up." }
            }
          },
          {
            id: "ignore",
            text: "Ignore it. Run every public event brighter and fuller",
            note: "The silent answer is the most expensive kind of answer. It costs exactly what your credibility can hold up.",
            outcomes: {
              crit: { body: "You never mention it. Three straight weeks, every event standing room only. The more people who know you face to face, the more the paper looks like a joke. Someone tears one down to your face." },
              ok: { body: "The paper runs its course and stops. Nobody died. But a few voters keep one particular look saved for you." },
              meh: { body: "A low fever: not fatal, and it stays. Your schedule does not move." },
              fail: { body: "Silence gives paper time to grow. The claims harden into local common sense. By the time you answer, the answer is late." },
              critfail: { body: "Four days before the election, a polished edition of the flyer reappears — with a fake citation attached. The precincts where it bloomed match the votes you lost." }
            }
          }
        ]
      },

      /* ---- 5) The reporter who tails you ---- */
      {
        id: "med2_press_enemy",
        title: "A reporter gives you notice: two years following your every move",
        body: "The reporter asks you to a coffee shop and starts without preamble.\n" +
          "'I plan to follow your story for the next two years. Not on orders. On my own.'\n" +
          "He pushes his card across the table: 'I am telling you first because a man I warned\n" +
          "cannot later call me unfair.' Your recent trouble gave him the reason. He knows it. So do you.\n" +
          "He can run one story for five years — few pieces, every one lands.\n" +
          "He cannot be bought and will not be snubbed. Where he starts digging, you cannot say —\n" +
          "you keep a do-not-dig list too.",
        choices: [
          {
            id: "open_door",
            text: "Give him an open door: quarterly sit-downs, documents to his inbox",
            note: "You feed the dog that can eat you — but a fed watchdog does not bark. You buy first moves and cushion; you pay in clean hands.",
            outcomes: {
              crit: { body: "Two years, six pieces: three kind, two neutral, one brutal — written only after he called you first. Insiders start calling you one of the few who knows how to handle the press." },
              ok: { body: "His first year on you is restrained. You know it is not mercy. It is the observation phase." },
              meh: { body: "He prints your briefings and writes the hard things anyway. You bought tempo, not direction." },
              fail: { body: "Once you keep him waiting forty minutes — on the exact day his draft was leaning your way. The piece turns. Your door stays half-open from then on." },
              critfail: { body: "One lead you fed him turns out to be planted. He writes that fact into a story of its own: 'a source who waters down his own feed.' Since then, every statement of yours gets verified three times." }
            }
          },
          {
            id: "stonewall",
            text: "Close the door: everything official, nothing off the record",
            note: "Do not feed it, and it hunts for itself. Clean — but he will go looking for what you buried.",
            outcomes: {
              crit: { body: "You give up no ground — and your record is so clean he spends six months with nothing. He honored his own warning: everything he printed squared with the facts, including the piece about a man with no cracks." },
              ok: { body: "Half a year, a few tepid pieces. The war has not started; both sides are still digging in." },
              meh: { body: "Your silence becomes paragraph one of every story: 'This office did not respond to repeated requests for comment.'" },
              fail: { body: "The tighter the door, the deeper he digs. He turns up a debt from three years ago, reads it down the phone at you, and asks if you would like to comment." },
              critfail: { body: "Shut out, he becomes the enemy. 'Covering you' upgrades to 'studying you': he starts calling everyone you worked with twenty years ago." }
            }
          },
          {
            id: "dig_back",
            text: "Make it even: have friends dig into the reporter's own past",
            note: "The first move of a symmetric information war. From here on you each hold the other. Neither wins; neither can stop.",
            outcomes: {
              crit: { body: "A story he never checked, ten years back, surfaces — two witnesses willing to talk. His editor pulls him off your line. You won. The whole press corps is watching who did it." },
              ok: { body: "You find his soft spot and pass word through a middleman. He stays on the story, but the cadence of pieces drops visibly. An understanding, unspoken." },
              meh: { body: "The digging comes back empty: his record is cleaner than you hoped. The money burned; the nerves did not." },
              fail: { body: "He finds out that you were digging on him. The next story carries its own title: 'The Man Being Watched Starts Watching Back.'" },
              critfail: { body: "Your people work dirty, and it blows backward: the reporter stands, you fall first. The press corps closes ranks around one of its own." }
            }
          },
          {
            id: "respect",
            text: "No armor, no feeding: tell him 'you write it, I do it'",
            note: "The hardest road, and the one that tests your foundation. Only credibility earns the right to say that sentence.",
            outcomes: {
              crit: { body: "He listens, then takes his card back: 'Fair enough. We both stand on our own.' His pieces on you stay unsentimental, and not one can be called a partisan twist. This is the best ending this game offers." },
              ok: { body: "He shrugs and leaves. The war begins on schedule; at least nobody is lying to anybody." },
              meh: { body: "He thinks you are posing. The pieces run anyway, now with a thin layer of irony: he believes he is clean." },
              fail: { body: "The clean act holds three months, then he finds one thing you genuinely did. The gap between image and fact gets paid back double." },
              critfail: { body: "He prints your sentence word for word at the end of the first long piece: 'You write yours, I do mine — what he did, read on.' That article runs fourteen thousand words." }
            }
          }
        ]
      },

      /* ---- 5a) The book ---- */
      {
        id: "med2_press_enemy_after",
        title: "The reporter who shadowed you for two years is writing a book",
        body: "Two years on, the reporter following you is part of your life.\n" +
          "Your staff reads his byline before anyone else's; your lawyer weighs every sentence you say;\n" +
          "last month he ran a timeline of everything you did in three years — every entry true,\n" +
          "and you cannot sue the facts. Now the invitation: he is writing a book, and he wants one final interview with you.\n" +
          "Whatever the book says about you will outlast the book.\n" +
          "Whether the chapter on you is titled with a noun or a verb — publication day will tell.",
        choices: [
          {
            id: "sit",
            text: "Sit down: the final interview, your version, told whole",
            note: "History remembers who spoke up. It also remembers which half of it got quoted.",
            outcomes: {
              crit: { body: "The book lands. The chapter on you carries a title you never expected: 'He Was Listening.' His last line: 'I set out to write a villain and ended up writing a witness.' The book becomes the spine of your biography." },
              ok: { body: "The book lands. Your part is fair without being kind. Your name sits beside 'controversy' — and beside 'cooperative.'" },
              meh: { body: "You give six hours; he uses one paragraph. It is the line you said when you were most tired." },
              fail: { body: "To explain one thing you mention another. In print, the two passages sit side by side. Reviews call the chapter 'the most revealing.'" },
              critfail: { body: "One sentence you said, he spent three years verifying — then it closes his book. You will never know whether that forgotten line would have just passed, had he never written it." }
            }
          },
          {
            id: "refuse_book",
            text: "Refuse the interview. He writes his; you do yours",
            note: "You hand over the final draft. But readers discount a book written by your enemy — one way of losing slowly.",
            outcomes: {
              crit: { body: "The book lands. Your part is built entirely on public record and other men's telling — he is too good a reporter to invent a hook you never gave him. Reviews call the chapter 'cool, almost to respect.'" },
              ok: { body: "The book, the storm. In it you are a silent figure who would not explain. Some read arrogance. Some read spine." },
              meh: { body: "The book lands; it sells middling. Your name appears on page two hundred." },
              fail: { body: "His main source is the one person you never wanted in this story. The 'you' in the book is someone you do not recognize. The readers do." },
              critfail: { body: "The book is a bestseller. His timeline gets cited by dozens of articles until it becomes the standard story of you. Ever since, every denial of yours quotes his book." }
            }
          },
          {
            id: "preempt",
            text: "Beat him to print: publish your memoir first, seize the narrative",
            note: "Your version takes the shelf space. Expensive — and a long war: the two books will sit side by side forever.",
            outcomes: {
              crit: { body: "Yours runs three months early, honest, and sells past expectations. When his arrives, every review reads it against yours. Yours is the benchmark." },
              ok: { body: "Yours lands first. Two books, two audiences. At minimum, the narrative splits." },
              meh: { body: "The book is out; it goes quiet. But for months the coverage discusses your version." },
              fail: { body: "The rushed book carries three memory errors. His arrives six months later and 'corrects' each of yours — with sources." },
              critfail: { body: "One defensive sentence in your memoir becomes an investigative lead. The week the book goes to its second printing, the subpoena arrives." }
            }
          },
          {
            id: "walk_away",
            text: "One last drink together. No talk of the book. A toast to two years",
            note: "Costs nothing, asks nothing. Some wars can only be won by admitting the other man is a person too.",
            outcomes: {
              crit: { body: "Two hours, not a word about the book. At the check he says: 'There was a chapter called Prey. I retitled it last month.' On publication day you open to it. The title reads: 'Opponent.'" },
              ok: { body: "A decent drink. The book comes anyway; his afterword has one line: 'He never once lied to me — rarer in my trade than in his.'" },
              meh: { body: "You drank; you said your piece. He left not one word out of the book." },
              fail: { body: "He accepts the drink and uses it. The book: 'Even before leaving office, he was working his last angle — the flawless earnestness.'" },
              critfail: { body: "Your café photo ends up inside the dust jacket, captioned: 'He is always in the right frame at the right time.' You became his copy, drink and all." }
            }
          }
        ]
      }
    ]
  }
});
