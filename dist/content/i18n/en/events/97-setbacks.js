/* ============================================================================
 * CONTENT · i18n/en/events/97-setbacks.js
 * 中文文件 content/events/97-setbacks.js 的英文覆盖层（下野/挫败线）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices 里带 id 的按 id 对齐。
 *   · 结构性键（id / era / tierMin / weight / base / mods / effects / flags / req / cost …）
 *     由引擎保护，写了不会生效，validate 直接报错。
 *   · 缺译的字段自动留中文，所以可以一张一张补。
 *
 * 英文写法：按英语重写，不是逐字翻。第二人称、现在时、短句；「」用引号或化进句子。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* 1. 落选之夜 */
      {
        id: "setback_loss",
        title: "You lose on election night, and your backers are still waiting for you on stage",
        body: "The count closes and you are four points short — the kind of loss people swear two more weeks would have flipped, which stings worse than a rout. In the ballroom your supporters are still standing, waiting for the stage; the speech on the podium exists only in its winning version.\n" +
          "What you say tonight decides whether this loss is a period or a comma. Unmentioned but waiting: the campaign account still owes the printer, the ad buys, and the money you fronted yourself. Some say the party is already talking about running someone younger next time — and they mean you. Who in tonight's ballroom comes back first next time: two years will tell.",
        choices: [
          {
            id: "gracious",
            text: "Concede with grace: deliver the speech nobody finished writing",
            note: "A good concession speech paves your next run. The price: swallowing this, now.",
            outcomes: {
              crit: { body: "You speak four minutes, blame no one, and call your rival's win the wisdom of voters. Next morning two editorials praise you — the kind reserved for gracious losers." },
              ok: { body: "You concede cleanly. As the room empties, someone holds your hand and says: we run again." },
              meh: { body: "The speech stumbles, but the point lands. At least nobody cuts a clip to mock you." },
              fail: { body: "You stall three times on stage and manage only a thank you. The awkwardness travels farther than the loss itself." },
              critfail: { body: "You can't help yourself and mutter that some votes shouldn't have been cast. Next day the line runs beside your defeat on the front page." }
            }
          },
          {
            id: "audit",
            text: "Skip the stage: go back and sort out the campaign debt",
            note: "Grace is for the crowd; the ledger is for you. Settle it well and you keep credit for next time.",
            outcomes: {
              crit: { body: "You audit every line, cut three you shouldn't have paid, and set up two payment plans. Leaving at four, you know exactly what your next run will cost." },
              ok: { body: "The debt is sorted, payments pushed into next year. Blunt up front, the vendors respect you for it." },
              meh: { body: "You own the bills and pay them. You catch only the tail of the ballroom applause." },
              fail: { body: "The printer turns hostile and threatens legal action. Your last hour on loss night goes to the phone with creditors." },
              critfail: { body: "Someone buried an unexplained expense in the books, and the auditors spot it. A perfect footnote to a bad night." }
            }
          },
          {
            id: "staff_first",
            text: "Rally the team: thank them first tonight",
            note: "The safe bet. Winning and losing are the candidate's; volunteers do the running. Whether they remember you decides who shows up in two years.",
            outcomes: {
              crit: { body: "You turn the ballroom into a thank-you dinner, naming volunteers one by one. When you come back in two years, tonight's crew is first through the door." },
              ok: { body: "You take the last round with them. Some cry, some curse, nobody leaves." },
              meh: { body: "You work the room with pleasantries and talk of meeting again. No one is sure they mean it." },
              fail: { body: "You hide backstage for an hour. When you come out, most have already gone." },
              critfail: { body: "Your campaign manager quits in front of everyone and walks off with a box of files. Tonight's loss gets an ugly face." }
            }
          }
        ]
      },

      /* 2. 掀翻 */
      {
        id: "setback_primary_upset",
        title: "An unknown high-school teacher challenges you in your party's primary",
        body: "A primary opponent appears: a local high-school teacher, one issue, zero name recognition, raising less than a tenth of your war chest. Your polls lead by thirty points. The advisers say: don't engage.\n" +
          "His whole campaign is the vote you cast with party leadership — the base despises it. The real question isn't whether you win — it's how, and how not to lose.\n" +
          "And they say two more votes in your record touch his issue; he hasn't found them yet. Nobody has ever measured how fragile a thirty-point lead is in a single-issue primary.",
        choices: [
          {
            id: "ignore",
            text: "Trust the advisers: ignore him, run to the general-election tempo",
            note: "History is blunt about underestimating a nobody. But fighting him hard just raises his profile. No clean answer.",
            outcomes: {
              crit: { body: "He never catches fire — two news stories in ten weeks. You win the primary by twenty-eight. A scare for nothing." },
              ok: { body: "You never take the bait, so he never blows up. You win, quietly." },
              meh: { body: "In the last two weeks he surges — you win by twelve, half your margin. Insiders start muttering that your foundation is cracking." },
              fail: { body: "You lose by two thousand votes. A teacher, armed with one ten-year-old vote of yours, sends you home." },
              critfail: { body: "You lose — and lose a town you thought safe, where the paper ran him a full-page ad a week out, funding untraceable. The party tells you to exit gracefully." }
            }
          },
          {
            id: "engage",
            text: "Meet him head-on: debates, door-knocking, treat him as a real opponent",
            note: "Respects voters and the opponent alike — but overkill will look like crushing a child.",
            outcomes: {
              crit: { body: "You share a stage with him three times in his own district and win each one. The real win is voters who saw you take every vote seriously. A landslide on primary night." },
              ok: { body: "You fight hard and win soundly. A party memo holds up your crisis handling as a model." },
              meh: { body: "You win, but spend enough to fight half a general. Your advisers' I-told-you-so echoes down the hall." },
              fail: { body: "Engaging hands him a stage: three debates, and the press finally has a reason to cover him. You claw a narrow win." },
              critfail: { body: "On debate night you call him naive. Next day that clipped word loops on every lawn in the district. You lose — to your own arrogance." }
            }
          },
          {
            id: "countermessage",
            text: "Never mention him: talk only about what you've delivered for the district",
            note: "The safe bet. Pull the fight onto your ground — record, casework, attendance. Not glamorous, but solid.",
            outcomes: {
              crit: { body: "You hold twenty-one town halls in ten weeks, each one only on drainage, health care and VA benefits. You win the primary by nineteen — you stole his issue." },
              ok: { body: "You hold your ground. He waves his issue and finds nowhere to plant it." },
              meh: { body: "You win, but at every town hall the most-asked question is still his one issue." },
              fail: { body: "Your record on delivery crumbles before an angry single issue. A rout." },
              critfail: { body: "The proudest item on your delivery list turns out to have enriched one of your donors. He nails you to it." }
            }
          }
        ]
      },

      /* 3. 被本党抛弃 */
      {
        id: "setback_party_purge",
        title: "The party wants to replace you, and summons you to a talk at nine tomorrow",
        body: "The vote you cast against the party now has a price: state funding cut, your name off the joint gala list, and your district chair saying out loud that the next primary gets one of theirs.\n" +
          "National media call you a person of backbone — worth nothing inside the party. The 9 a.m. meeting decides whether you bow, walk, or go to war.\n" +
          "Word arrived: toe the line on the next vote and all of this can be forgotten. But the party can strip your post — it cannot strip what your voters know about you. Think that through before you walk in.",
        choices: [
          {
            id: "bow",
            text: "Bow: vote the party line next time",
            note: "The road back to resources and the nomination. The price: your backbone brand collapses on the spot.",
            outcomes: {
              crit: { body: "In the nine o'clock meeting you apologize and keep your dignity. On the next key vote you see the light in time. Funding returns — but the press now files you under pragmatic." },
              ok: { body: "You soften your words; the party cracks the faucet open again. Everyone quietly understands." },
              meh: { body: "You bow, they accept — but everyone knows you'll be asked to bow again." },
              fail: { body: "Footage of your bowing leaks to the press. The party gets your apology; the public gets your humiliation." },
              critfail: { body: "You hand in your loyalty pledge, and the party runs someone else anyway — all they ever wanted was to see you bend in public." }
            }
          },
          {
            id: "war",
            text: "Fight: go around the party machine straight to voters",
            note: "The cautionary tale and the model for this road are the same person. The bet: your voters know you, not the party.",
            outcomes: {
              crit: { body: "You turn the 9 a.m. summons into a live broadcast: three sentences to the cameras on the way out. Within 48 hours small-dollar donations break your record — the party can withhold money, but it can neither grant nor revoke public support." },
              ok: { body: "You start your own kitchen: your own donor file, your own volunteers. Slow, but every vote answers to your name." },
              meh: { body: "The war begins, but the front is longer than you feared. Your calendar now holds two things only: the job, and survival." },
              fail: { body: "Without the party machine, turnout in a rainy primary collapses where you're weakest. You lose to the young candidate they fielded." },
              critfail: { body: "You become the man who wrecked his own party's odds in the national news. The party expels you swiftly and neatly, and your voters never understood what you were fighting for." }
            }
          },
          {
            id: "quiet_work",
            text: "Say nothing: go home, work, let the record speak",
            note: "The safe bet. Quietest move in the eye of the storm — the party wants face; you give it time.",
            outcomes: {
              crit: { body: "In six months you run district service to perfection: four hundred casework files, two local appropriations landed. On the party's shortlist your name is back at the top — they need a winner." },
              ok: { body: "You out-work the story until it goes stale. The nomination is half-saved — you rank second, but you're still on the list." },
              meh: { body: "You keep working, the seat still hangs. Being unresolved is itself wearing you down." },
              fail: { body: "Over six months of silence, three party envoys come to suggest you try a different district. You have no district left." },
              critfail: { body: "The record doesn't speak, because the party controls who gets to hear it. Your silence reads as a guilty plea." }
            }
          }
        ]
      },

      /* 4. 媒体围攻 */
      {
        id: "setback_press_pile",
        title: "Three reporters call at once",
        body: "Something you thought was buried surfaces — and two more outlets are chasing it. Forty-eight hours, three outlets. Your next public appearance is the day after tomorrow, and canceling draws more eyes than showing up.\n" +
          "The team wrote three response plans overnight, and they contradict each other. Your first sentence becomes the headline for the whole thing.\n" +
          "They say your rival bought the timing — the story is real, the release engineered — and that a harder second piece sits with an editor, waiting on your first move. Whether ignoring it once worked or now kills depends on your era's media memory.",
        choices: [
          {
            id: "front",
            text: "Call your own press conference: say it once, answer everything",
            note: "Transparency against a news cycle. Say it clean and it's behind you; muddle it and you hand editors the ammo yourself.",
            outcomes: {
              crit: { body: "You talk forty minutes — context, detail, what you learned — then stand for a half-hour of questions. That night's headlines shift from scandal to candor. You end the crisis yourself." },
              ok: { body: "You held the conference and took the questions. It takes half the fire out of the coverage; time has to carry the rest." },
              meh: { body: "The conference ends evenly, but one of your dates doesn't match the record. Reporters politely don't press it — and politely write it in." },
              fail: { body: "You lose patience on the third question, and three seconds of a cold face become the photo above every story." },
              critfail: { body: "Two hours later a document refutes your version line by line. Now the story isn't the old matter — it's what you lied about today." }
            }
          },
          {
            id: "silence",
            text: "Go quiet: say nothing and nail the speech the day after tomorrow",
            note: "Hart's lesson was to taunt the press; but plain silence had room to breathe in the print era. The bet is your era's media memory.",
            outcomes: {
              crit: { body: "You say nothing, and your speech two days out is all bread and butter. A week later the newsroom's attention has moved — the news cycle turned the page for you." },
              ok: { body: "Not answering didn't help, but it didn't hurt. The stories got written and wrapped." },
              meh: { body: "Your silence gets framed as refusing to respond. Not fatal — but it's there every time someone searches your name." },
              fail: { body: "The second story lands right on cue, its headline quoting your silence. The matter escalates from old news to cover-up." },
              critfail: { body: "On the third day of silence, someone speaks for you — an exclusive from someone who knows. Now it's their version of the story, and your name is just one prop in it." }
            }
          },
          {
            id: "counter_leak",
            text: "Counter: feed a friendly reporter the rival's own old dirt",
            note: "Mutually-assured-destruction deterrence. You need real ammo and fast hands — otherwise it's an empty holster.",
            outcomes: {
              crit: { body: "Your dirt is worse than theirs. Next day two outlets each get a story, and the editors decide to handle them together — nobody dares run one alone. A ceasefire." },
              ok: { body: "The rival's story runs too, splitting the fire in half. The battlefield turns from your solo act into an exchange." },
              meh: { body: "You fed your dirt too late — their story already cleared. Yours reads as a response; theirs as reporting." },
              fail: { body: "Your leak gets traced. The original story doesn't die — it grows a new one: he tried to fight dirt with dirt." },
              critfail: { body: "Your dirt can't survive fact-checking — half true, half fabricated. Answering a real story with fake dirt amounts to a public confession." }
            }
          },
          {
            id: "family_first",
            text: "Tell your family the truth first, then decide what to say publicly",
            note: "The safe bet. However it's written outside, the meal at home is the appearance you truly can't dodge.",
            outcomes: {
              crit: { body: "The dinner runs three hours. Next day the calm you face reporters with isn't acted — the hardest room was already behind you. That calm can't fool anyone, and can't be faked." },
              ok: { body: "Your family learns the truth and stays. The storm outside suddenly looks smaller." },
              meh: { body: "You said it, and the table goes quiet as a hearing. Some accounts get settled later." },
              fail: { body: "That dinner is harder than any press conference. Your spouse asks one question: what else am I about to read in the paper." },
              critfail: { body: "Confession earns no understanding — only a closed door and a partner who has already called a lawyer. Your private life becomes a public matter." }
            }
          }
        ]
      },

      /* 5. 健康红灯 */
      {
        id: "setback_health",
        title: "Your physical comes back a red flag, and the doctor tells you to slow down",
        body: "The doctor speaks softly and means heavily: keep this up and your body resigns before your career does. The problem is the calendar itself — six events a week, cross-country redeye flights, meals eaten in the car.\n" +
          "The follow-up is four months away, and no rule says you must disclose anything now. What you fear isn't the illness; it is how they look at you once they know. Washington's habit, they say, is to treat small ills like emergencies and vote through big ones — and the reverse happens too.\n" +
          "But nobody can tell you: rest six months — is the seat still there? Politics has no pause button.",
        choices: [
          {
            id: "rest",
            text: "Actually rest: cut half your calendar, hand work off",
            note: "Your body is the capital behind all other capital. The price is six months off the radar.",
            outcomes: {
              crit: { body: "You drop three painful tasks and protect two vital ones. At the six-month checkup the arrow points back to normal. The seat is still yours — whoever you handed off to did worse, which only proved how essential you are." },
              ok: { body: "You cut the calendar and sleep. Your name appears in far less paper for six months, and your body is grateful." },
              meh: { body: "You rest, but the phone never stops. Half-vacation, half-office — the arrow drops halfway." },
              fail: { body: "In your six months off the front line, your rival chews away a layer of the district. When you return, the flashbulbs aren't waiting." },
              critfail: { body: "The talk that his health is done travels faster than your recovery. The party's meeting to find a replacement happens before your follow-up." }
            }
          },
          {
            id: "push_through",
            text: "Push through: lock the report in a drawer, cut nothing",
            note: "The Wilson road. Short-term political safety, paid from your body's long-term account.",
            outcomes: {
              crit: { body: "You make it six months and the follow-up numbers scrape by. Nobody notices anything. You eat 174 more meals in the car." },
              ok: { body: "Business as usual. Your body protests, you work overtime. On the surface, nothing changes." },
              meh: { body: "Backstage at an event your vision grays out and you sit two minutes to stand again. Your aide sees it and says nothing." },
              fail: { body: "You have one public lapse — asleep on your feet for two seconds. The rumor reaches the party before the diagnosis does." },
              critfail: { body: "Your body decides for you: you collapse in the car on the way to an event, and the story owns the afternoon news cycle. Your health stops being a secret and becomes a public issue." }
            }
          },
          {
            id: "go_public",
            text: "Go public: turn the report into an issue",
            note: "Trade disclosure for sympathy. The bet: voters see you as a person, not a tool.",
            outcomes: {
              crit: { body: "You release a statement, hold a conference, and turn health transparency in public life into a small national issue. Constituents' replies stuff the mailbox. Your health becomes a strength." },
              ok: { body: "You go public. Most react with grace; the party exhales — at least they're not guessing anymore." },
              meh: { body: "You release the statement. Nothing stirs. Health transparency doesn't become an issue — just a footnote." },
              fail: { body: "Can he finish the term becomes the standing question at donor dinners. You lose not your seat but the word future." },
              critfail: { body: "Your disclosure lands during a crisis — your illness becomes a footnote in your rival's case against the government's handling. You become an adjective in someone else's story." }
            }
          }
        ]
      },

      /* 6. 家里的账单 */
      {
        id: "setback_family",
        title: "On your wedding anniversary you skip your kid's game for the campaign",
        body: "The kid's game, the anniversary, a three-county itinerary — you can be present at one. This is the seventh family plan your spouse has called off; the last real family dinner was your re-election night, and that was a working meal.\n" +
          "There has been no fight — worse than a fight: \"I just want to know how much longer.\" The household runs on your spouse's income; a public salary cannot cover the gap your absence leaves.\n" +
          "This question has been on the table since you announced. Today it comes due. In ten years, how your kid tells this part is the final grade.",
        choices: [
          {
            id: "family",
            text: "Cancel the event, go home",
            note: "Missing an event has a specific cost — one county holds a grudge. Missing the game has one you can't measure.",
            outcomes: {
              crit: { body: "You lose your voice on the bleachers. When your kid scores, a finger points to the stand — worth more than any election-night gesture. At next week's make-up event you speak with real ease." },
              ok: { body: "You go back. The game is lost, but you were there. Nobody works on a phone at dinner." },
              meh: { body: "You show up but the calls don't stop. Your kid calls you the one who answers the phone." },
              fail: { body: "In the county you skipped, a poorly-attended event surfaces — a photo circulates in the party. Family first becomes a demerit in someone else's report." },
              critfail: { body: "You get back late — the highway is shut down, the game over. A local paper photographs the empty seat in the stands. Family and image, a loss on both sides, nothing to show for it." }
            }
          },
          {
            id: "work",
            text: "Run the schedule: all three counties, none skipped",
            note: "Dedication, sure. At home, the ledger just turns another page.",
            outcomes: {
              crit: { body: "All three counties go well; a regional paper gives you half a page. You get home to a sleeping kid and stand a moment in the doorway." },
              ok: { body: "The events run tight. The house lights go out before you're home." },
              meh: { body: "You finish the schedule. Your spouse doesn't ask where you've been — not asking is worse." },
              fail: { body: "The third county's event cancels at the last minute — a wasted trip. You skipped the game for an empty wait. Nobody wins." },
              critfail: { body: "Your rival builds an ad on your empty seat at the game: won't even go to his own kid's game. Family becomes campaign ammunition — and the betrayal cuts both ways." }
            }
          },
          {
            id: "talk",
            text: "Bring the family to the event: all of you on one stage",
            note: "The safe bet. Stitch the two worlds together — if it holds it's a family portrait; if not, both sides cringe.",
            outcomes: {
              crit: { body: "Your kid grabs the microphone and announces that your parents always work late. The room roars, and the weekend headline is warmer than any release you could have bought." },
              ok: { body: "The whole family on stage, smiling well. Voters like the picture, and you really do feel relief." },
              meh: { body: "You share a stage, then silence in the car home. The picture is real; so is the mood." },
              fail: { body: "Your spouse's stage smile lasts exactly as long as the cameras. On the drive home you have the worst fight since you ran." },
              critfail: { body: "Someone at the event photographs your kid asleep from boredom, captioned: another family sacrificed to politics. You brought them onto the battlefield — and it becomes the call you regret longest." }
            }
          }
        ]
      }

    ]
  }
});
