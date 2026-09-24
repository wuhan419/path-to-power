/* ============================================================================
 * CONTENT · i18n/en/events/84-archive.js
 * 中文文件 content/events/84-archive.js 的英文覆盖层（档案/黑材料四幕链）。
 *
 * 契约（详见 docs/I18N.md §3–§5）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件/选项按 id 定位；terms 按下标对齐；known/rumor/unknown 整体替换、条数给全。
 *   · 结构性键（id / era / after / flags / req / base / mods / cost / stake /
 *     effects …）受引擎保护，本文件一律不写。
 *   · 本链无 choices[].note、无 tag/label 字段，故不覆盖。
 *
 * 英文写法：第二人称、现在时、短句；「」化为英文引号或直接并进句子。
 * 四幕链跨全时代，措辞保持时代中性（卷宗/复印机/银行保险箱）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ---------- 第一幕 · 拿到 ---------- */
      {
        id: "archive_get",
        title: "You find an unnumbered file in the archives basement",
        body: "You think you are chasing a small thing: a land deal misfiled ten years ago.\n" +
          "The records clerk is at lunch; a spare key hangs on the wall. Far down the third aisle sits a box marked Miscellaneous. Inside: one file, no number. " +
          "Someone pulled it out of the official series.\n" +
          "Page one holds a name and one line. You know that name. At a dinner last month, he clapped you on the shoulder.",
        brief: {
          lede: "You can close it right now. Close it, and you are still the man who knows nothing.",
          known: [
            "The file is not in the official series — the archive's own catalog cannot find it.",
            "Someone pulled it out on purpose: kept it in the system, but off the trail.",
            "Three signatures inside. One belongs to an elder of your own party.",
            "The clerk returns at 2:30. You have one hour and ten minutes."
          ],
          rumor: [
            "They say two men on this street have been waiting for someone to open this file.",
            "They say it survives because whoever was meant to destroy it wanted a copy."
          ],
          unknown: [
            "Whether these signatures can actually prove anything.",
            "What became of the first person who opened this file."
          ],
          terms: [
            { k: "Unnumbered file", v: "Exists, but off the catalog — findable only by whoever needs it." },
            { k: "Photocopy", v: "Paper in your hand, liability on your head." }
          ]
        },
        choices: [
          {
            id: "copy",
            text: "Photocopy the whole file and take it inside your jacket",
            outcomes: {
              crit: { body: "You run the pages twice, the second pass just to keep the order. The original goes back on its old crease. You walk out at 2:27." },
              ok: { body: "The copier hums for a long time. You slip the copies into an ordinary budget report and leave by the front door." },
              meh: { body: "A paper jam halfway through. The page you rescue is missing its lower right corner — the date." },
              fail: { body: "You copy only the first half. What the second half says will nag you ever after." },
              critfail: { body: "The clerk is back early. You say you were looking for the restroom; he believes you. But the copier's counter now reads one higher." }
            }
          },
          {
            id: "memo",
            text: "Copy down only the file number, the dates, and the three signatures",
            outcomes: {
              crit: { body: "Your pencil fills the back of a bus ticket with everything, and you pocket the ticket. You carry nothing out — yet from this minute you know exactly whom to approach." },
              ok: { body: "Done. No paper to hold against you — but three names, two dates, and one file number." },
              meh: { body: "You miss one signature. Three months later you spend two weeks chasing that single name." },
              fail: { body: "Someone comes in mid-copy. You close the notebook, make small talk for four minutes — and lose two dates." },
              critfail: { body: "You write far too much in that notebook. Next day the clerk finds a scrap bearing three names. He knows none of them — but he has memorized your handwriting." }
            }
          },
          {
            id: "return",
            text: "Close it, put it back exactly as it was, and walk out",
            outcomes: {
              crit: { body: "You refold it on the old crease and push the box back into place. Two years later another reporter pulls this file. Your name is nowhere in it. You survived, and you owe no one." },
              ok: { body: "You close it. On the way out, the stairwell lights switch themselves on behind you, one by one." },
              meh: { body: "You closed it — but you saw the three names. They will live in your head for years." },
              fail: { body: "You put it back, but out of order. The clerk spends three days re-sorting that whole box." },
              critfail: { body: "You stood down there too long. Someone reports the basement light on through the entire lunch hour. A small thing — until it is remembered at exactly the wrong moment." }
            }
          }
        ]
      },

      /* ---------- 第二幕 · 被反噬 ---------- */
      {
        id: "archive_bite",
        title: "Someone is asking where you went last month",
        body: "It starts with a wrong-number call. In week two, a car parks across from your space and someone sits in it for forty minutes.\n" +
          "In week three, a woman running an \"industry survey\" asks you over coffee. Seven questions — six about the city's transit plans. The seventh:\n" +
          "\"What is your view on how records should be kept?\"\n" +
          "Your photocopy is still locked in a drawer. You have never used it.",
        brief: {
          lede: "The first cost of leverage is not using it. It is carrying it.",
          known: [
            "She is no reporter — reporters leave their notebooks open. Hers stays closed.",
            "Her questions have no subject. She knows you touched something, not which one.",
            "The clerk lost a job two years ago. He badly needs this one.",
            "No third person has seen your copy. That is your only chip."
          ],
          rumor: [
            "They say her last interview target resigned from public office three months later.",
            "They say the copier's counter is read once a quarter."
          ],
          unknown: [
            "Who stands behind her — or if she is just another hunter.",
            "If she knows nothing yet, will she wait for you to move first?"
          ],
          terms: [
            { k: "Bite back", v: "While you dig into them, someone digs into who has been digging." },
            { k: "Go cold", v: "Put it away, pause every move. Often the strongest play." }
          ]
        },
        choices: [
          {
            id: "counter",
            text: "Turn the hunt on her: which car was she in last Wednesday",
            outcomes: {
              crit: { body: "Three days later you hold a plate number, an office address, and a name that should not appear. You seal all three in an envelope and mail it to her office. She never shows up again." },
              ok: { body: "You learn who pays her, and you let her know you learned. There is no second coffee." },
              meh: { body: "Four thousand dollars and one week's work buy you a single fact: she works at an office with no sign on the door." },
              fail: { body: "The man you put on her sees through it. From that day she changes cars — and switches to a more patient method." },
              critfail: { body: "Hunting her proves one thing more clearly than any file ever could: the material is real, and you care about it." }
            }
          },
          {
            id: "leak",
            text: "Strike first: hand the material to a writer you trust",
            outcomes: {
              crit: { body: "He does not write at once. He numbers every page of your copy and locks them in a safe in front of you. \"Let them move first,\" he says. He is far more careful than you assumed." },
              ok: { body: "The material now has a second holder. From this minute, you can no longer be handled quietly. That was the point." },
              meh: { body: "He takes the copy and tells you to forget the whole thing. You cannot tell whether he is protecting you — or a future story of his." },
              fail: { body: "He pushes it back: \"Not through my paper.\" One more person knows — and you gained no ally." },
              critfail: { body: "He takes it. Two weeks later you learn the other part-owner of his paper is brother-in-law to the second name on the file." }
            }
          },
          {
            id: "cold",
            text: "Go cold: stop everything and lock the copy in a bank vault",
            outcomes: {
              crit: { body: "The copy enters a vault; the affair comes off your calendar for good. Four months later the woman takes her coffee to someone else — she never lacked targets, only patient ones." },
              ok: { body: "You stop. The phone calls, the car across the street — all of it fades within a month." },
              meh: { body: "You stop, but for half a year you check the rear-view mirror before pulling out. That half year, you got nothing real done." },
              fail: { body: "You stop — but your brother knows you went down to the archives. Once, half drunk, he mentioned it to someone." },
              critfail: { body: "Your going quiet is too loud: three trips canceled at once, a new phone number. Silence like that explains a great deal." }
            }
          },
          {
            id: "nothing",
            text: "Do nothing. Live this month exactly as planned",
            outcomes: {
              crit: { body: "You play four rounds of golf, attend two church services, give a wedding toast. Your calendar argues your indifference better than any denial. She gives up." },
              ok: { body: "You do nothing. She asks for a second coffee; you go; same seven questions. There is no third." },
              meh: { body: "You do nothing, and no second call comes. To this day you cannot say whether she quit — or is waiting on you." },
              fail: { body: "You do nothing. Your partner, though, did something this month. You do not know what." },
              critfail: { body: "You do nothing — and it ferments inside you for seven months. One unrelated evening, a sentence and a half slips out." }
            }
          }
        ]
      },

      /* ---------- 第三幕 · 摊牌 ---------- */
      {
        id: "archive_showdown",
        title: "The old man on the file summons you to his office to show your cards",
        body: "He asks you to come on a Sunday afternoon, when the building is empty.\n" +
          "He pours two glasses of water himself, then says: \"What you want — I won't ask where you got it.\n" +
          "I ask only one thing: what do you want?\"\n" +
          "You leave two hours later. It is still daylight.\n" +
          "The photocopy inside your jacket is still warm.",
        brief: {
          lede: "This file can buy one thing, once. Name your price — there is no second trade.",
          known: [
            "He cannot be scared — he has seen worse papers than this in one lifetime.",
            "One thing he truly guards: his son is running for the same seat next year.",
            "He can offer three things: a seat, money, or to leave you alone.",
            "Published, the file burns more than him. Two of the three names still hold office."
          ],
          rumor: [
            "They say he always knew where the file sat, and waited for someone to move first.",
            "They say he has two envelopes ready: one for you, one for his lawyer."
          ],
          unknown: [
            "If you ask for nothing, will he think you kept a card up your sleeve?",
            "The two names still in office: will they press this down or dig it up?"
          ],
          terms: [
            { k: "Showdown", v: "Both sides turn their cards face up. Ends the guessing, not the fight." },
            { k: "One-shot trade", v: "Leverage buys one concession, once. Say it clearly now." }
          ]
        },
        choices: [
          {
            id: "deal",
            text: "Trade for a seat: turn this file into your next step up",
            outcomes: {
              crit: { body: "He stands, walks to the window, and gives you a date and a name. \"Go see this man that day. Bring nothing.\" Three weeks later your own name sits on an appointment list." },
              ok: { body: "He makes one phone call and says four sentences. You get the seat — and a silence you will never forget." },
              meh: { body: "He offers a lesser post, with one note: \"Serve two years there first.\" You hear the other half of that sentence." },
              fail: { body: "He agrees — and then delivers nothing. Months later you understand: he only wanted to hear your price out loud." },
              critfail: { body: "He recorded the whole conversation — and kept the part where you spoke first. The tape now rests in a drawer, filed beside your document." }
            }
          },
          {
            id: "expose",
            text: "Publish it: let it leave your drawer and become everyone's problem",
            outcomes: {
              crit: { body: "You hand the full set to three different institutions on the same day. In three months a committee forms; in a year, a report. Your name stands in its first paragraph: source of the material. You lose many friends and gain something that never expires." },
              ok: { body: "It runs. You are the one who broke it open — some will not shake your hand now, and others start calling." },
              meh: { body: "It runs, but gets flattened into \"a land dispute.\" Three months on, nobody remembers. You paid the price and bought nothing." },
              fail: { body: "Before publication, someone \"edits\" the material for you: three names become one. Your hand was the guided one." },
              critfail: { body: "The documents check out, but your motive gets rewritten: you wanted the seat. The whole affair ends as a review of you." }
            }
          },
          {
            id: "hold",
            text: "Keep it unplayed: ask for nothing, leave the card face down",
            outcomes: {
              crit: { body: "You ask for nothing — only say, \"I came today to make your acquaintance.\" He walks you to the elevator and holds your hand a long time. The card never gets played, yet from that day it speaks for you." },
              ok: { body: "You keep it covered. He will always remember what you hold — worth far more than any one-time trade." },
              meh: { body: "You hold it. He stops coming after you — and stops helping you. What you bought is an even ledger." },
              fail: { body: "You say \"I want nothing\" — and smile as you say it. He reads the smile. From that day he starts assembling a second file." },
              critfail: { body: "You keep the card face down — and let everyone know you hold one. A card seen by all but never played is no card at all. Only the risk stays." }
            }
          },
          {
            id: "burn",
            text: "Burn it: torch the copy in front of him, and start even",
            outcomes: {
              crit: { body: "You light the copy at his ashtray and stir the ashes. He watches a long while, then says: \"You're the second person in ten years to do that.\" He later really does become the elder you needed." },
              ok: { body: "It burns. He nods, says no thanks. Both of you leave lighter that day." },
              meh: { body: "You burn the copy. The original is still in the archive — you both know it, and neither of you says so." },
              fail: { body: "You burn too fast; it reads like theater. At the door, there is a hint of pity in his eyes." },
              critfail: { body: "You burned only the copy. The original was taken that very week by someone else who knows you entered the vault — and tonight you gave away your last chip by hand." }
            }
          }
        ]
      },

      /* ---------- 第四幕 · 了结 ---------- */
      {
        id: "archive_settle",
        title: "The archive affair comes back for its verdict",
        body: "What you thought was closed returns with a receipt.\n" +
          "It asks nothing about regret. It only sets the bill on the table:\n" +
          "one man rose, one retired, one moved away, one still sits in the same chair — and remembers your name.\n" +
          "One decision is left: how you carry this from here.",
        brief: {
          lede: "What remains after the deed is done — that part is called the consequence.",
          known: [
            "There is no such thing as playing a card and putting it back in the deck.",
            "People already know what you handled. They do not ask. They remember.",
            "This will be raised again someday — only the way it is raised will change."
          ],
          rumor: [
            "They say the original file still exists — it just changed drawers.",
            "They say the man you met back then is writing his memoirs."
          ],
          unknown: [
            "Whose version the story will use in ten years.",
            "Which of your identities this ends up charging."
          ]
        },
        choices: [
          {
            id: "after_deal",
            text: "That old trade — now you get to say what it was",
            outcomes: {
              crit: { body: "Before anyone else can, you tell it in public as \"a story of two men who each stepped back.\" Nobody can contradict it: you gave the world the version first." },
              ok: { body: "You settle it at the right moment: one light explanation, one dinner with witnesses. From then on it is simply an old story." },
              meh: { body: "You never touch it. It hangs there — mentioned now and then behind your back, never once given a settled meaning." },
              fail: { body: "You explain too hard. A matter nobody had asked about gets dug up by your own hands." },
              critfail: { body: "Someone pieces together, on a tabloid back page, exactly how you got that seat. The details are wrong — and in politics, wrong details never mattered." }
            }
          },
          {
            id: "after_expose",
            text: "Take the stand and finish the story",
            outcomes: {
              crit: { body: "You speak at the hearing for three hours without a single embellishment. By that afternoon you have lost your place in both camps — and gained a name with a whole generation." },
              ok: { body: "You testify, saying less than the documents do. That is fine — the missing parts, others will say for you." },
              meh: { body: "You testify, and your affair is folded into a bigger case. Your share takes up two pages." },
              fail: { body: "Someone testifies before you, with a version that contradicts yours. You become the witness \"with several stories.\"" },
              critfail: { body: "In cross-examination the other side spends twenty minutes reducing your motive to \"a man who never got the seat.\" That sentence follows you for years." }
            }
          },
          {
            id: "after_hold",
            text: "The card you kept is only risk now",
            outcomes: {
              crit: { body: "You find the right courier: the material goes to the grandson of the first name on it, no price asked. Sometimes the correct play is letting another hand keep the cards." },
              ok: { body: "You never use it again. Slowly it rots into worthless old paper — which is exactly how you kept it safe." },
              meh: { body: "You keep holding it. Start doing the arithmetic: every year this thing exists, your risk grows with it." },
              fail: { body: "Someone knows you still hold something. He never asks. He only hesitates — a half beat — every time you need his support." },
              critfail: { body: "What you held gets taken — not stolen. He knew where it sat, and he decided he deserved to use it more than you." }
            }
          },
          {
            id: "after_burn",
            text: "You burned the paper. The matter stayed in other hands",
            outcomes: {
              crit: { body: "Your burned copy became a rumor — and in the rumor, you come out as a man who plays clean. Later, at a private dinner, he puts in two good words for you. They are worth years of lobbying." },
              ok: { body: "Nobody raises it again. Now and then you wonder what holding on would have meant — then you stop wondering." },
              meh: { body: "You remember the original still sits in the archive. The switch is in someone else's hands now, and there is nothing you can do." },
              fail: { body: "A copy turns up in the hands of your old rival. He never uses it — he just files the matter somewhere you will never see." },
              critfail: { body: "You burned only your own copy. Three years on, the other one surfaces as an exhibit to a subpoena — and it carries your signature." }
            }
          },
          {
            id: "quiet",
            text: "Never mention it again. Let it age on its own",
            outcomes: {
              crit: { body: "Seven years later, in a room where it fits nowhere, someone refers to \"that old thing nobody ever figured out.\" Nobody picks it up. It really has grown old." },
              ok: { body: "You stop mentioning it. It survives as a minor piece of gossip until, in the end, nobody remembers the details." },
              meh: { body: "You stop mentioning it — but twice a year it comes to you on its own. Never during a busy week." },
              fail: { body: "You stop mentioning it, but you start avoiding certain rooms, certain people, certain streets. Your calendar quietly shrinks smaller than you admit." },
              critfail: { body: "You thought it aged. Someone kept renewing it — every few years, that material passes through a copier again. It does not age. It waits." }
            }
          }
        ]
      }
    ]
  }
});
