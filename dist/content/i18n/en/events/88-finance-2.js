/* ============================================================================
 * CONTENT · i18n/en/events/88-finance-2.js
 * 中文文件 content/events/88-finance-2.js 的英文覆盖层（金钱线：横财 / 审计 / 地产 / PAC / 资金链 / 学贷）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件 / choice 按 id 定位；terms 不带 id，按数组下标对齐。
 *   · 纯字符串数组（known / rumor / unknown）整体替换，条数与中文完全一致。
 *   · 结构性键（id / era / tierMin / weight / base / mods / cost / req / effects /
 *     flags …）由引擎保护，本文件一律不写。
 *   · 金融术语用真实英文（windfall, estate, audit, Leadership PAC, bridge loan,
 *     collections, credit report）；金额与叙事数字不改。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      /* ================= 1) fin2_windfall 意外之财 ================= */
      {
        id: "fin2_windfall",
        title: "A distant great-aunt leaves you money you cannot ask about",
        body: "The law-firm envelope is thick. Inside, one page:\n" +
          "a distant great-aunt you barely remember has left you a sum — big enough to plug every hole you have, modest enough not to make the news.\n" +
          "The executor adds one line: \"The client wishes you not to inquire how this money is invested.\"",
        brief: {
          lede: "Money out of the sky always lands with someone else's fingerprints on it.",
          known: [
            "You are the only one in the family in politics — the name is usable.",
            "The inheritance is legal. What is missing is the history of the assets before they turn into cash.",
            "Your account is short exactly this kind of sum to get through the second half of the year."
          ],
          rumor: [
            "Some say the great-aunt's money ties back to a trading firm that closed years ago.",
            "Some say a second letter, with different terms, went to another relative."
          ],
          unknown: [
            "Once you spend it, does anyone still remember where it came from?",
            "Is \"do not ask\" a condition — or some living person's habit?"
          ],
          terms: [
            { k: "Asset composition", v: "What the money was before it turned into cash: stock, property, or old debt." }
          ]
        },
        choices: [
          {
            id: "take_all",
            text: "Take it all. The holes matter; the origin can wait",
            note: "Cash saves you now. But \"I never asked\" stays with you for life — and someone else may remember it too.",
            outcomes: {
              crit: { body: "The money lands. That same day you read the closing papers cover to cover and keep a copy. When a reporter comes sniffing six months later, you are the only one in the family who can explain it." },
              ok: { body: "The money clears your holes. You fold the \"do not ask\" note and lock it in the bottom drawer." },
              meh: { body: "Twenty percent less arrives than promised — \"fees and expenses\". You have no one to ask, and stop trying." },
              fail: { body: "Closing drags on four months. You spend the second half of the year chasing calls. The money comes — it just comes late." },
              critfail: { body: "Three weeks after it lands, the liquidator of an old trading firm shows up: part of the estate is \"a claim pending confirmation\". You did not get rich. You got a lawyer." }
            }
          },
          {
            id: "ask",
            text: "Trace the money first, then decide whether to take it",
            note: "Slow — but you will sleep every time you spend this money. The digging itself teaches you to read a ledger.",
            outcomes: {
              crit: { body: "Three weeks later you have rebuilt thirty years of this asset's history. It is not clean, but it is explainable. You take only the explainable half and donate the rest to the church the great-aunt attended. The papers give you a kind little line." },
              ok: { body: "The answer: old-fashioned, slow, boring money — forty years of rent and interest. You take it with a clear conscience." },
              meh: { body: "You understand half of what you find. You take the money and leave one drawer unlocked inside yourself." },
              fail: { body: "The more you dig, the murkier it gets. The executor loses patience: \"Sign, or walk away.\" You sign under pressure." },
              critfail: { body: "The half you uncover is exactly the old ledger nobody wants touched. The envelope is not even open before someone sends word to \"know your limits\"." }
            }
          },
          {
            id: "refuse",
            text: "Renounce the inheritance. Not a cent",
            note: "The cleanest road. The price is that you stay broke — but money is all you are missing.",
            outcomes: {
              crit: { body: "You sign the renunciation. Three years later a rival's people dig into this \"mystery inheritance\" and find only your signature page. Your cleanliness gets a price that day — and it is a high one." },
              ok: { body: "You give it up. Money stays tight, but you can sleep without checking your account." },
              meh: { body: "You give it up. Some relatives call you a fool; others call it a pose. Both voices stay quiet." },
              fail: { body: "Only after refusing do you hear the money went to another relative — who put it to uses you refuse to think about." },
              critfail: { body: "The renunciation jams halfway. The money hangs in your name for six months. No cash, no clean record, and a pile of explaining to do." }
            }
          }
        ]
      },

      /* ============ 1b) fin2_windfall_collect 意外之财的余波 ============ */
      {
        id: "fin2_windfall_collect",
        title: "A man comes to collect on the inheritance from two years ago",
        body: "A man who calls himself an \"asset manager\" picks a quiet restaurant.\n" +
          "He slides a copy across the table — the last page of your estate closing, with one annotation you have never seen.\n" +
          "\"The client had a side arrangement back then,\" he says. \"It comes due now.\"",
        brief: {
          lede: "The question you never asked has come to your door, two years late.",
          known: [
            "He dares to come because you never asked about the asset mix the day you took the money.",
            "He wants two things: a \"management fee\", and you keeping things exactly as they are in committee.",
            "The closing papers and the annotation are both genuine. That is the dangerous part."
          ],
          rumor: [
            "He holds annotated copies for more than you — he \"manages\" the whole block.",
            "The client behind him died years ago; he is only collecting ownerless bills."
          ],
          unknown: [
            "Does the annotation even stand in law? He bets you dare not check.",
            "If this page goes to the right office, who burns first?"
          ],
          terms: [
            { k: "Side arrangement", v: "A private note kept beside the will. Its legal force is fuzzy." }
          ]
        },
        choices: [
          {
            id: "pay",
            text: "Pay the \"management fee\" and buy his permanent absence",
            note: "Money for quiet. But a man who has paid once reads, to the other side, as a man who will pay twice.",
            outcomes: {
              crit: { body: "You pay — and make him sign a receipt stating you are square. Where the calm came from, you never knew. He takes it, and truly never reappears." },
              ok: { body: "The money goes out. The man leaves. You sit in the parking lot for half an hour before the engine turns over." },
              meh: { body: "He calls it too little. You add a second sum before the matter is done." },
              fail: { body: "You pay. Three months later a \"new asset manager\" arrives to handle \"the same arrangement\"." },
              critfail: { body: "The payment record becomes the new handle on you. Now it is not an old will holding you — it is one of your own expenses." }
            }
          },
          {
            id: "go_public",
            text: "Hand the page to the committee and to the press",
            note: "Exposing yourself is cheaper than being exposed. It will hurt for a while, but hands freed from a leash are worth more than the pain.",
            outcomes: {
              crit: { body: "You hold the press conference first, then file the papers. The story flips from \"politician on the take\" to \"extortionist working off a dead woman's will\". The manager is taken in for questioning that month." },
              ok: { body: "An inquiry opens. You eat a few days of abuse. But \"being held\" became \"voluntarily disclosed\", and that door is shut for good." },
              meh: { body: "The committee takes the file. Then silence. You showed your hand and got no answer back." },
              fail: { body: "The reporter leads with your \"unexplained inheritance\"; the extortion sits down in paragraph seven. It hurts for a full quarter." },
              critfail: { body: "The papers leak the day after you file them, and the leaked version keeps only the half where you took the money. The manager walks. You become the block's joke." }
            }
          },
          {
            id: "stall",
            text: "Pay nothing, file nothing. Wait and see if he flips the table",
            note: "A bet that the annotation cannot stand. Win, and it dies. Lose, and two fronts open at once.",
            outcomes: {
              crit: { body: "You reply with one line: \"Have your lawyer call my lawyer.\" Two months later the annotation is dated as a later addition. He lost the bet — and the block's whole business with it." },
              ok: { body: "You stall. Waiting costs him more than it costs you. Half a year later he fades away on his own." },
              meh: { body: "A standoff. No deal, no end. The affair becomes a note on your calendar you cannot delete." },
              fail: { body: "He mails copies of the annotation to three papers, with your name attached. None of them verify. All three \"have heard\"." },
              critfail: { body: "He flips the table: the closing papers, the annotation, and your own signature noting you \"did not ask\" — all out at once." }
            }
          }
        ]
      },

      /* ================= 2) fin2_taxreturn 税务审计 ================= */
      {
        id: "fin2_taxreturn",
        title: "Tax auditors ask to see your filings for the last three years",
        body: "The notice is two paragraphs: the tax office, \"acting under law\", pulls your returns for three years.\n" +
          "In the reason box: \"Significant variance between lifestyle reported and income declared.\"\n" +
          "Your accountant is silent for a long time on the phone. Then: \"Sir, we need to talk about the expenses that never went on the books.\"",
        brief: {
          lede: "What a politician fears is not a bribery charge. It is one line of numbers that does not match.",
          known: [
            "You were picked because your public calendar holds too many scenes your declared income cannot afford.",
            "Eleven expenses ran in cash over three years. You cannot explain three of them.",
            "An audit is not a charge. It can end in back taxes — or a file forwarded to prosecutors."
          ],
          rumor: [
            "Two more names sit on the audit list, both more famous than yours.",
            "Your accountant keeps a \"real ledger\" somewhere, purely for self-defense."
          ],
          unknown: [
            "Which wakes first over those three cash payments: the tax office, or the press?",
            "Whose drawer are the accountant's workpapers in right now?"
          ],
          terms: [
            { k: "Lifestyle audit", v: "They read your life, not your books: car, house and trips out-honest the filings." }
          ]
        },
        choices: [
          {
            id: "full_coop",
            text: "Total cooperation: pay back taxes, hand over files, face the press",
            note: "The most painful and the cleanest. You pay money, and buy back the sentence: at least he did not hide.",
            outcomes: {
              crit: { body: "You pay the back taxes and the penalty, then publish three years of full returns. At the press conference you close with: \"Where the numbers did not match, the fault is mine.\" People quote that line for years." },
              ok: { body: "Back taxes, penalty, case closed. No press conference, no headline. For an audit, that is the best ending there is." },
              meh: { body: "The case closes, but \"was once audited\" enters the file. Now every similar story drags your name up one more time." },
              fail: { body: "You cooperate, but the process takes a year. For that year every event you attend sits under one sentence: he is under audit." },
              critfail: { body: "One date in the files you submitted yourself does not line up. You handed it over. The inquiry escalates and the file moves to another division." }
            }
          },
          {
            id: "lawyer_up",
            text: "Hire the dearest tax counsel and fight it inch by inch",
            note: "A procedural war can stall and can win. But \"hired a sky-priced lawyer\" is itself a news line.",
            outcomes: {
              crit: { body: "Your counsel's team gives every cash expense a documented story and a receipt. The closing letter reads like a commendation. The money bought back a complete clean record." },
              ok: { body: "Eight months of motion practice. Small back taxes, no penalty. It hurt to pay, and it is over." },
              meh: { body: "You win half the procedure: taxes owed, penalty trimmed. You won a discount, not a verdict." },
              fail: { body: "Reporters obtain every letter your lawyers send. Six placements in eight months, and none of the copy is yours." },
              critfail: { body: "Someone on the legal team sells your workpapers for very good money. You paid for a bill of indictment." }
            }
          },
          {
            id: "blame_accountant",
            text: "Blame the accountant: it was his failure",
            note: "The fastest way out — and the easiest way to leave an enemy with a long memory behind your head.",
            outcomes: {
              crit: { body: "You fire him, say \"bookkeeping failure\" in public, and quietly pay his retraining costs. He signs a non-disclosure agreement and has kept his mouth shut to this day." },
              ok: { body: "The accountant owns a \"work error\". The audit closes with corrective notes. You sit ten extra minutes in the office before the next meeting." },
              meh: { body: "He takes the fall, but resentfully. You can tell: this story has a second part coming." },
              fail: { body: "He refuses. He tells a reporter that the workpapers exist — not the contents, just the existence. Now everyone knows there is a real ledger." },
              critfail: { body: "He turns state's evidence. The man you pushed out comes back holding the case file and an immunity deal." }
            }
          },
          {
            id: "quiet_fix",
            text: "Do nothing for now, and watch which way the wind blows",
            note: "The safe play. You spend nothing and stake no one. You bet the machine slows down on its own — and forfeit the chance to strike back if you lose.",
            outcomes: {
              crit: { body: "The process jams on its own scheduling queue — they really are that busy. Nine months later a bland inquiry letter finds you, and you answer it at ease." },
              ok: { body: "Nothing happens, and nothing is solved. The file travels between two agencies." },
              meh: { body: "Silence reads as guilt. The first \"why won't he answer\" piece runs." },
              fail: { body: "The deadline passes. Non-response becomes a fact on record, and fines and rumors rise together." },
              critfail: { body: "Your silence hands the opposition a full quarter. By the time the subpoena lands, the public has long since rendered its verdict." }
            }
          }
        ]
      },

      /* ================= 3) fin2_realestate 地产投资 ================= */
      {
        id: "fin2_realestate",
        title: "Insiders want you to buy the far bank before the bridge is announced",
        body: "The broker who introduced you is blunt: once the cross-river bridge clears approval, the warehouse district becomes the next downtown.\n" +
          "\"The announcement is closer than you think,\" he lowers his voice. \"Buy or pass — it must be settled this week.\"\n" +
          "You know the game: a politician flipping land earns on information gaps — and the gap is exactly where they watch you.",
        brief: {
          lede: "Insiders do not profit on luck. They profit on knowing a bridge's location three weeks early.",
          known: [
            "The developer needs early buyers with weight — like you — to hold the book up.",
            "The planning map is still a draft, but the draft carries signatures you have met in your own committee.",
            "Land now costs a third of the post-approval estimate. That spread is the whole temptation."
          ],
          rumor: [
            "There is a second route for the bridge. On that one, the warehouse district is marsh.",
            "The broker told this exact story about another parcel last year. That parcel still sits empty."
          ],
          unknown: [
            "Will the signatures on the draft survive the final round of changes?",
            "If it leaks, does your money fall first, or your seat?"
          ],
          terms: [
            { k: "Information gap", v: "The three weeks you know before the public does." }
          ]
        },
        choices: [
          {
            id: "big_buy",
            text: "Go heavy: put every dollar you can move on the table",
            note: "Win and it doubles; lose and it halves; and the exposure comes with both. The cash you stake rides the same multiplier.",
            outcomes: {
              crit: { body: "On approval day your land is worth three and a half times what you paid. You filed the exit paperwork two months early — took the money and walked, not one step too far." },
              ok: { body: "The bridge is approved and the price flies. You sell in tranches at the top and bank it." },
              meh: { body: "Approval drags on a year and a half. The land neither falls nor rises. Your money takes a nap in the mud." },
              fail: { body: "The second route wins — the warehouse district stays warehouses. You cut your losses. The broker's number never connects again." },
              critfail: { body: "Your timing was too perfect. A reporter checks your closing date against the draft's signing date. Four days apart. The story needs no more material." }
            }
          },
          {
            id: "small_buy",
            text: "Test the water: buy one warehouse's worth",
            note: "Room to press or retreat. The upside is capped, but you can say \"ordinary investment\" and mean it.",
            outcomes: {
              crit: { body: "A small position, a fast exit, a clean book. You pocket a tidy gain on approval day — and make the acquaintance of two owners across the river. They return a big favor later." },
              ok: { body: "One warehouse's return, one clean closing record. Not much. Solid." },
              meh: { body: "A profit of small change. It covers the entertaining this deal cost you." },
              fail: { body: "Approval dies. Small position, small loss — but you at least mapped the line." },
              critfail: { body: "Even one warehouse lands in the local paper's real-estate column. In the headline, your office is louder than the amount." }
            }
          },
          {
            id: "decline_watch",
            text: "Do not buy — but keep the district's owner list",
            note: "The safe play. Touch no money; collect people instead. Favor across the river pays out at redistricting.",
            outcomes: {
              crit: { body: "You never spend a dollar, but you spend a month making the far-bank owners personal friends. Two years on, redistricting hands you the newest ward — and your steadiest block of votes." },
              ok: { body: "You pass, and leave a good impression behind. When the next deal floats by, the broker asks you first — whether to \"touch\" it, not whether to buy." },
              meh: { body: "You walk away. The land later goes up four times over. You book that against yourself once, then turn the page." },
              fail: { body: "Your walk-away travels as \"he looks down on our side of the river\". The owners' club never sends a second invitation." },
              critfail: { body: "The broker decides you \"took the information and gave nothing back\", and tells everyone how you hesitated. You have done nothing, and your name already means \"slick\"." }
            }
          }
        ]
      },

      /* ================= 4) fin2_pac_game 领导型 PAC ================= */
      {
        id: "fin2_pac_game",
        title: "Lobbyists pitch you your own leadership PAC",
        body: "Two lobbyists spread the plan across your desk: a Leadership PAC operating in your name.\n" +
          "\"Contribution limits cover money given to candidates,\" one of them smiles. \"Not money given to committees.\"\n" +
          "\"From today, you stop asking for money. You start deciding other people's races.\"",
        brief: {
          lede: "When others give you money, it is an investment. When you give it, it is power.",
          known: [
            "Your name already carries weight inside the belt — nobody without weight stands up a committee.",
            "The committee raises without limits, but it cannot give directly to your own campaign.",
            "Filings, bylaws, a compliance officer — all off the shelf. The lobbyists even have the first donor picked out."
          ],
          rumor: [
            "The real hand behind the first donation wants to launder an old relationship through your book.",
            "The party bosses are already watching this committee."
          ],
          unknown: [
            "Will the winners you fund still take your call four years from now?",
            "Once the machine is big — do you use it, or does it use you?"
          ],
          terms: [
            { k: "Leadership PAC", v: "A fundraising arm in a politician's name, legally separate from any campaign." }
          ]
        },
        choices: [
          {
            id: "go_big",
            text: "Go big: keep a full-time staff, spend the money like a movement",
            note: "The fastest route from cash to influence. The bigger the book, the more eyes on it.",
            outcomes: {
              crit: { body: "Six months on, your committee is the sharpest blade in the party — five of the seven candidates it backed won. Nobody inside treats you as a bit player again." },
              ok: { body: "The book stands up. Two races in, a split result: the one it won, it won cleanly; the one it lost, it lost decently. Money starts coming to you instead of from you." },
              meh: { body: "Open for business. Fundraising barely feeds the staff. For now it is a signboard, not a blade." },
              fail: { body: "A reporter traces the first donation, vine by vine, to a name you never wanted near you. The book is still cold and you are already putting out fires." },
              critfail: { body: "One email punctures the \"independence\": your campaign manager and the committee director talk every Wednesday, same hour. The charter is revoked. Your name sits in the title of the case file." }
            }
          },
          {
            id: "go_small",
            text: "Start low-key: hang the sign, run only the money lane",
            note: "A small book is a small target. Test how deep the water is before deciding to swim.",
            outcomes: {
              crit: { body: "The little operation runs surprisingly well: clean money, clear books, and every endorsement picked right. Three years on, this humble start looks steadier than any big swing." },
              ok: { body: "The sign hangs. The lane works. In year one it moved money for three local races — and banked three favors for you." },
              meh: { body: "Flat fundraising. The committee becomes one line on a business card. Better than nothing." },
              fail: { body: "Low-key is not the same as safe — the first filing mis-scores a line. Fine, corrective order, and dust on the sign." },
              critfail: { body: "One lobbyist runs money for three clients at once, and your \"clean lane\" gets tangled in his reconciliation fight. You cut early and walk out whole, but the sign does not survive." }
            }
          },
          {
            id: "sell_access",
            text: "Turn the committee into a ticket: bigger checks, sooner meetings",
            note: "The fastest money — and the closest to the kind of person you denounced in textbooks. The press never loses its appetite for this story.",
            outcomes: {
              crit: { body: "Money pours in like water. You set the rules: meet only, promise nothing, never in writing. In half a year you see more people than the party bosses, and every step grazes the line without crossing it." },
              ok: { body: "The ticket business hums. You face a room full of people who want something, and you remember what each face wants. Those become cards later." },
              meh: { body: "Money in, hands shaken. But the phrase \"the price of a meeting\" starts floating around the belt." },
              fail: { body: "A large donor wins a contract three days after his meeting with you. The timeline is too pretty — a reporter draws it as a chart." },
              critfail: { body: "Someone taped the access price list. It ran on television for a week and circulates online for a year. Your face is now the illustration for \"for sale\"." }
            }
          },
          {
            id: "refuse_pac",
            text: "No committee of your own: keep borrowing the party machine",
            note: "The safe play. Money and trouble stay outside the door together. The price: you keep waiting in line.",
            outcomes: {
              crit: { body: "You decline. A party boss hears about it and asks you to dinner alone — not everyone dares push away a knife pressed into their hand. Your seat quietly moves half a step forward." },
              ok: { body: "No new committee; the machine still runs for you. One weapon fewer, and no ledger to watch every day." },
              meh: { body: "You decline. The lobbyists turn around and sell the plan to your colleague. Three months later that blade stands up — edge pointed your way." },
              fail: { body: "Without a book of your own, your voice inside the party starts at a discount. The machine serves whoever makes the machine richer." },
              critfail: { body: "Your refusal travels as \"he looks down on the money people\". Half the fundraising belt closes its door on you, and every month suddenly feels tight." }
            }
          }
        ]
      },

      /* ================= 5) fin2_bankruptcy 资金链断裂 ================= */
      {
        id: "fin2_bankruptcy",
        title: "The campaign account runs dry and payroll is next",
        body: "The finance director pushes over the last page of the report. One boxed number — two digits below what you thought you could stretch to.\n" +
          "\"Rent is due next week. The print shop wants cash on delivery. And two payrolls,\" she reads, line by line.\n" +
          "\"Sir, this is not bad management. We simply have no money. Those are two different things.\"",
        brief: {
          lede: "Bankruptcy is not doing something wrong. It is money that should have arrived, not arriving.",
          known: [
            "Three promised donations fell through at once. The creditors do not know the number yet.",
            "Missed payrolls make the news — and the news makes donations even harder to raise.",
            "By next Friday the staff needs one number from you. Any number."
          ],
          rumor: [
            "The opposition is feeding out \"he is about to fold\". Donors are only waiting to be frightened.",
            "A lender specializes in exactly this moment. His price is more than interest."
          ],
          unknown: [
            "How many on the staff already updated their résumés?",
            "After you lay the numbers on the table: shared hardship, or a group exit?"
          ]
        },
        choices: [
          {
            id: "confess",
            text: "Put the real number in front of the whole staff and ask them to ride it out",
            note: "Spends nothing; bets on people. Staff can accept a poor campaign. They cannot accept a lied-to one.",
            outcomes: {
              crit: { body: "You project the report on the wall and read it number by number. Nobody resigns at the end. Three staffers volunteer to defer next month's pay; your campaign manager wires in his own savings. The office lights stay on late that night, and nobody is working overtime." },
              ok: { body: "They accept the deferral. No applause, no exits. The team holds — which is the bankroll for a comeback." },
              meh: { body: "Some walk out on the spot without a word. The rest stay, but something shifts in how each of them looks at you." },
              fail: { body: "By tomorrow the story is online — the one who left took it with them. \"Campaign cannot make payroll\" outperforms any attack ad." },
              critfail: { body: "You held the meeting and watched half the team dissolve within forty-eight hours; the other half starts looking for its own exits. You are not bankrupt. You just lost the people who could have pulled you back." }
            }
          },
          {
            id: "bridge_loan",
            text: "Call the lender: take a bridge loan",
            note: "Fast, no questions, and priced. Everyone who has signed one of these remembers how heavy the pen was.",
            outcomes: {
              crit: { body: "The money lands the same day, without one extra word. You repay principal and interest inside three months. He shakes your hand: \"I like borrowers who pay on time.\" On this one he meant to make no extra profit." },
              ok: { body: "The bridge money comes; you cross. The interest is frightening, but you reach the far side on your feet." },
              meh: { body: "He funds you — and takes first refusal on three offices your campaign will ever endorse. You sign." },
              fail: { body: "Interest, penalties, cross-collateral — each clause meaner than the last. You got the money, and you handed over the reins." },
              critfail: { body: "He does come calling — two lawyers and a contract that hands him the debt if you miss. Five days after the account bottomed out, your campaign has a real boss." }
            }
          },
          {
            id: "shrink",
            text: "Cut deep: lay off half the staff, save the core",
            note: "Surgery paid in staff, not cash. The team halves, but the books balance the same week.",
            outcomes: {
              crit: { body: "You do the firing yourself, one by one. Severance is generous; every reference letter is written. The twelve who stay are closer than ever. Years later they still call those two weeks \"our winter\"." },
              ok: { body: "Half the staff leaves. The books balance. The campaign slows down, but it does not die." },
              meh: { body: "The cuts go clumsy, and two people you needed walk out. The books balance; the formation does not." },
              fail: { body: "Among the laid-off is the one who tells stories. His version runs in three outlets. The savings convert straight into a hole in your name." },
              critfail: { body: "The layoff list gets read as \"he cut the loyal and kept the flatterers\". You were saving costs; the whole town heard a purge. The core team survives. Your credit with them does not." }
            }
          },
          {
            id: "gamble_event",
            text: "One last throw: a free-admission rally, and bet the hall fills",
            note: "The safe play in cash — it spends your voice instead. Win, the campaign comes back to life. Lose, the room empties and the story empties with it.",
            outcomes: {
              crit: { body: "You talk for forty minutes in a borrowed hall — about money, about the hole, about why to keep going. At the end the donation buckets overflow. Next morning's local headline reads: \"He Said It Plainly Himself.\"" },
              ok: { body: "Seats three-quarters full. The take covers two and a half months. You will tell this day to every hardship you meet from now on." },
              meh: { body: "A thin room, and donations that cover exactly the hall fee. At least you learned who really shows up." },
              fail: { body: "Half the seats sit empty and the opposition sends photographers. Their caption: \"His Time Is Over.\"" },
              critfail: { body: "You talk until your voice cracks, to a scattering of chairs. The next day's story is one sentence: at the gentleman's rally, the journalists outnumbered the supporters." }
            }
          }
        ]
      },

      /* ================= 6) fin2_loan_default 学贷长期违约 ================= */
      {
        id: "fin2_loan_default",
        title: "A student loan you never paid off is dug back up",
        body: "A local outlet calls. Polite voice, impolite question: a candidate who \"speaks for ordinary people\" still carries a student loan years overdue, now in collections.\n" +
          "\"Did you forget it — or do you simply not care?\"\n" +
          "You stare at the number on the screen. The interest compounds harder than any speech you give.",
        brief: {
          lede: "This is not about having no money. It is about failing to pay what is owed — and now everyone can see it.",
          known: [
            "The delinquency has reached credit-report level. There is no hiding it.",
            "The reporter holds public records. Your only choice is how the story gets told.",
            "One large payment stops collections — but that money has to be dug out of another hole."
          ],
          rumor: [
            "The opposition team has pasted this onto their issues list, waiting to see whether you cry first or swing first.",
            "Some say a delinquent loan is not even a blip in campaign season."
          ],
          unknown: [
            "Tell it as your voters' own story — does it gather people or backfire?",
            "Silence may ride out this news cycle, but the interest keeps compounding."
          ]
        },
        choices: [
          {
            id: "own_it",
            text: "Own it: lay the old debt open in daylight",
            note: "The free, safe play — a bet on people. Admit it, and tell it as the same squeeze your voters live under.",
            outcomes: {
              crit: { body: "You invite that outlet in and spread the statements, the rates, and every payment, page by page. \"It took me years, and I still have not finished paying this. That is the real life of the person you are being asked to elect.\" The line reposted most the next day: \"At least he is not pretending.\"" },
              ok: { body: "You do not dodge, and the story demotes itself from scandal to incident. Some buy it, some do not, but nobody can call you dishonest." },
              meh: { body: "You tell it — and they hear the self-pity in your voice. Voters do not hate people who owe money. They hate candidates who cast themselves as victims." },
              fail: { body: "You wanted a moving story; the reporter wanted one number. Your \"candor\" gets cut into a three-minute special: can he actually pay it back?" },
              critfail: { body: "Every explanation opens a new hole. In the end, the loan becomes the question no event lets you leave unanswered." }
            }
          },
          {
            id: "settle",
            text: "Scrape the money together and clear the loan in one payment",
            note: "Spend to make it stop. Collections halt the same day — but the money came out of somewhere else, and somewhere else notices.",
            outcomes: {
              crit: { body: "You scrape it together and clear principal and interest at once. Collections stop that day. You even have room to post the paid-in-full record in plain sight: \"Handled. Next question.\"" },
              ok: { body: "The money moves, the loan clears, the collectors shut up. Only there is a new hole in the account, and the next few months go belt-tightening." },
              meh: { body: "The scramble was ugly — you borrowed from friends until you ran out of friends. It got paid, and so a new line spread: he borrowed all over town to pay one loan." },
              fail: { body: "The check cleared, but the speed looked like cover. \"Why could he suddenly find that much?\" The questions move from the loan to the money's origin." },
              critfail: { body: "You took on new debt to retire old debt, and everyone saw right through it. The loan is gone. The label \"robbing Peter to pay Paul\" stays on you for good." }
            }
          },
          {
            id: "stall",
            text: "Say nothing. Let the lawyers handle them",
            note: "Free. No spectacle today — at the price of compounding interest and one mine still primed under you.",
            outcomes: {
              crit: { body: "Your lawyer runs beautiful procedure. The wave passes before the story breaks. You won the bet — for now." },
              ok: { body: "No reply. The story cools faster than you feared. Only the loan keeps compounding in the dark." },
              meh: { body: "Silence reads as consent. The opposition fires no shot: \"He refuses to answer for his own debt\" — and lets the voters imagine the rest." },
              fail: { body: "You thought it passed. Two weeks later comes part two, headlined \"He Chose Not to Answer.\" The dodge itself became the story." },
              critfail: { body: "The lender sues, and lawsuits are public record: a candidate sued by his own creditor. Everything you dodged comes back doubled." }
            }
          }
        ]
      }
    ]
  }
});
