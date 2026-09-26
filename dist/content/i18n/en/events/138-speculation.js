/* ============================================================================
 * CONTENT · i18n/en/events/138-speculation.js
 * 英文覆盖层：对应 content/events/138-speculation.js（投机包 · 庄家生意，六张卡）。
 *
 * 契约（详见 docs/I18N.md §3/§4 与 engine/i18n.js）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的文本字段；事件按 id 定位，选项按 id 定位。
 *   · 结构性键（id / base / mods / cost / req / stake / effects / flags / grade /
 *     category / weight / minYear / photo / unique / pace …）由引擎保护，
 *     除定位用的 id 外本文件一概不写。
 *   · 「」不直译，英文句内改用直式单引号；全文件字符串零汉字（注释除外，从 137 覆盖层先例）。
 *   · 英文按第二人称、现在时、短句重写，语气干而带刺；标题一律 sentence case。
 *   · 金融口径：funMul 是对押入本金的比例倍数；req.fun 是入场费（账上必须有这么多钱），
 *     不是单价——一档多少钱只看身位；数字一律不改。
 *   · sp22 为 2020s 卡，中文原稿刻意不写真实姓名（只用职务称谓），英文侧同样不写。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* 1985 · 广场协议之后 —— 换汇那一夜 */
      {
        id: "sp85_plaza",
        title: "The weekend the communique came out, you were holding a pile of dollars",
        body: "Word that five finance ministers had pinned the dollar arrives Saturday night. The bank counters stay shut until Monday, and the broker is in your living room tonight.\n" +
          "His pitch is plain: everyone will buy yen and marks. Move first and you are the one buying cheap. A month late, the same money buys half.\n" +
          "The communique is already signed in five names; the rate moves whether anyone wants it to. The broker needs your money in a form he can move first — his channel fee is paid up front, nothing back after — and your cash sits in a time deposit at the local bank; breaking it early costs the interest. Some say a man inside the treasury heard of this communique two weeks early. If the yen does not rise, who eats the loss — you, or the man who passed you the word?",
        choices: [
          {
            id: "all_in",
            text: "Convert every movable dollar into foreign currency (principal on the line)",
            note: "A bet that the policy keeps running. Your whole cash position, and someone else pulls the trigger.",
            outcomes: {
              crit: { body: "Three months later the rate is back to half of what you paid. You consulted nobody, and your name is on no filing. People in the district start calling you 'the one who understands money.'" },
              ok: { body: "What comes back buys twice what went out. You did not get rich; you just did not miss it." },
              meh: { body: "The counter's spread ate most of the profit. One round trip later: a stack of foreign banknotes and a fee receipt." },
              fail: { body: "After the communique the dollar falls two weeks, then bounces back. You cut at the low." },
              critfail: { body: "The broker disappears with your money, leaving one receipt with the wrong figures. The uglier part: the local paper finds out you emptied a time deposit to buy foreign currency." }
            }
          },
          {
            id: "hedge",
            text: "Convert only a small slice — enough to test how deep the channel runs",
            note: "Cheap tuition: no big money in it, but you learn how this business books its flows.",
            outcomes: {
              crit: { body: "The small gain stays small, but you understood something large: when policy moves, the world's money queues up again. That eye is worth far more later." },
              ok: { body: "What comes back covers the fees with a little spare. You remember two names; you will need them later." },
              meh: { body: "The spread does not cover the costs. You paid for a class." },
              fail: { body: "You traded two days early; by the time you return the board has stopped moving. The odd amounts are gone." },
              critfail: { body: "Even small sums fill out forms. Your first foreign-currency trade goes into an internal memo at the local bank, where anyone can pull it out and take a look later." }
            }
          },
          {
            id: "stay",
            text: "Do nothing. The money stays in the local bank",
            note: "No position, so no leverage on you. The price of this road is others earning while you do not.",
            outcomes: {
              crit: { body: "After the currency rush the local bank actually keeps its depositors. The president names you at the anniversary dinner: the sort of man who left his money here at a time like that." },
              ok: { body: "The deposit interest arrives as always. Nothing happens. You skipped one trip into trouble." },
              meh: { body: "Inflation eats half the interest. You lost nothing; you just let a year sit." },
              fail: { body: "Watching others earn while you did not, you get lectured at your own dinner table for a month." },
              critfail: { body: "Not trading is not safety: a small local bank is drained of deposits in the rush, your account is folded into another one, and withdrawals now take a written request." }
            }
          }
        ]
      },

      /* 1987 · 黑色星期一 —— 没人接电话的那天 */
      {
        id: "sp87_monday",
        title: "The index falls twenty percent in a day, and your broker calls seventeen times",
        body: "Twenty minutes after the open, the numbers on the tape stop looking real. Everyone you know sits in the same state: holding cash, not knowing how to spend it.\n" +
          "At two in the afternoon a contact from institutional clearing calls: some trusts are dumping well-collateralized positions at thirty cents, and unless someone takes them before noon tomorrow, they get liquidated — margin falls short, holdings get sold, price has nothing to do with value.\n" +
          "The collateral is real; nobody simply dares take it. Your cash could swallow one of these blocks — and once swallowed, it does not come back out. Some say the Federal Reserve will promise liquidity tonight. Whether this is the bottom or the opening of a larger liquidation, nobody can say; and a bargain picked up today may later be booked as getting rich off other people's disaster.",
        choices: [
          {
            id: "buy_dip",
            text: "Take those trust positions at thirty cents",
            note: "A bet that liquidity returns by morning. All your cash, wagered on somebody else's forced sale.",
            outcomes: {
              crit: { body: "On the third day, in the afternoon, prices bounce forty percent. You did nothing illegal — you simply had cash that day. A line starts circulating about you: the man still standing when it crashed." },
              ok: { body: "The rebound is not pretty, but it proves the thirty cents were real. You write this trade into one respectable sentence: long-term investing." },
              meh: { body: "What you bought lies flat for half a year before you break even. The money survives; you gray doing it." },
              fail: { body: "The next day falls another ten percent. Your own margin notice teaches you: after thirty cents there is still twenty." },
              critfail: { body: "One of those trusts has the local pension's money among its beneficiaries. The paper does not ask about price; it asks about dates: why, on the day depositors queued for their money, did you buy their collateral." }
            }
          },
          {
            id: "wait",
            text: "Hold the cash and watch for two days first",
            note: "Not moving is also a bet: on your own nerve, and on the bottom not being in yet.",
            outcomes: {
              crit: { body: "Two days later you confirm the bottom and enter with half the position. You make less than others, but every dollar sits inside what you can see." },
              ok: { body: "You miss the fattest leg of the bounce and never catch the deepest cut. Cash is still cash." },
              meh: { body: "You wait for a better price. It never appears again." },
              fail: { body: "By the time you finally move, prices are back before the crash. You paid for a full round of hesitation." },
              critfail: { body: "You wait until day three and receive a notice: your broker used your margin. The crash makes one thing clear — cash in your hand and cash in someone else's hand are two different things." }
            }
          },
          {
            id: "calm",
            text: "Go out and speak: tell people not to sell inside a panic",
            note: "Treat this month as politics, not business. No money in it, but after you talk some people do not run for the exits.",
            outcomes: {
              crit: { body: "You speak ten minutes on the steps of the town bank. Next morning several old-timers do not join the queue. The local paper sets your line under the front page: do not sell yet." },
              ok: { body: "Some listen, some call you an economic illiterate. But you leave behind the phrase: he was there the day it crashed." },
              meh: { body: "Your words read as another kind of panic: even the politicians are shouting, so it must really be bad." },
              fail: { body: "You say 'two days and it is over.' The third day falls again. This line gets read back to you in every campaign from now on." },
              critfail: { body: "A reporter digs up a buy order from that same afternoon: you were buying while telling others not to sell. Both stories share one page. No commentary needed." }
            }
          }
        ]
      },

      /* 1997 · 投机资本狙击本币 —— 站在哪一边 */
      {
        id: "sp97_currency",
        title: "Someone is selling at the edges, daring you to spend the reserves dry",
        body: "The business channels use a polite phrase: 'international speculative capital.' The version you hear is blunter — several funds are hammering one currency on the exchange market, day after day, betting your officials will not hold.\n" +
          "Your seat sits exactly between two forces: one says let the rate go, the other says hold it. And you personally have money you could move.\n" +
          "The central bank's dollar reserves dropped hard in two weeks and keep draining; the companies here borrowed in foreign currency, so every fall in your own money grows their debt by itself. Holding the rate burns the reserves; abandoning it writes the loss into those companies — which bill is bigger, nobody dares compute. And pointing at 'foreign speculators': is that analysis, or a shield?",
        choices: [
          {
            id: "ride_short",
            text: "Move with the wind: exchange your money out and wait for the fall",
            note: "A bet against your own country. Right, and you are a genius; wrong, and you are 'that kind of person.'",
            outcomes: {
              crit: { body: "The currency breaks on Friday. By Monday morning your position is half again its size. People around town start looking at you with new eyes: clear-sighted, and not on their side." },
              ok: { body: "You made money, and not too quickly — small enough to dodge the naming, large enough for the talking." },
              meh: { body: "The central bank holds. Your exchanged money lies in another name for three months, and by the time it returns the rate never moved." },
              fail: { body: "You had the direction wrong: the currency does not fall, but rates get dragged to the sky. On money you borrowed to exchange, the interest alone eats the profit." },
              critfail: { body: "The audit prints one page with 'the state spent its reserves to hold the rate' beside 'you sold in that same market.' The hearing asks one question: when did you know it would fall." }
            }
          },
          {
            id: "defend",
            text: "Stand with the holders: keep your money local, urge others to keep theirs",
            note: "A bet that your own side can hold. Lose and you lose too; win and the line is 'he did not run.'",
            outcomes: {
              crit: { body: "It holds. At least to a decent floor. The central bank governor says one line at a closed meeting: the people who did not run in the crisis — we remember them." },
              ok: { body: "The devaluation comes anyway, milder than you feared. The money you stayed with shrank; the reputation did not." },
              meh: { body: "Nothing changes and you gain nothing. Only the money left at home keeps lying there." },
              fail: { body: "You urge others to stay while your own account hedges. One reporter finds both facts in a single afternoon." },
              critfail: { body: "The currency loses thirty percent overnight, and your local money turns into a stack of IOUs. People remember you telling them not to run. They also remember you on stage when you said it." }
            }
          },
          {
            id: "blame",
            text: "Tell the story that outsiders did this",
            note: "Populism is the cheapest political language. It goes out fast and comes back slow.",
            outcomes: {
              crit: { body: "One line tops that night's news, and next day people queue at your office door to shake your hand. Those funds' head offices are on the far side of the planet; your voters do not need the finer detail." },
              ok: { body: "The scolding works, and that is all it does. The rate is still the rate." },
              meh: { body: "Local media supplies the line you missed: then explain your own foreign-currency account." },
              fail: { body: "An economist explains the attack mechanics on television for three minutes, then asks whether speculation simply means 'making money I do not understand.'" },
              critfail: { body: "The foreign firm you singled out retains a lawyer, and the lawyer arrives with public records of your own accounts. Next day's headline has a new subject." }
            }
          }
        ]
      },

      /* 2007 · 次贷裂缝 —— 分红还在发 */
      {
        id: "sp07_cracks",
        title: "Two mortgage companies folded, and your dividend still arrived on time",
        body: "The first-quarter check comes at the old number, drawn on a management company you have never seen.\n" +
          "Your money was sold to you as 'a little more yield than Treasuries.' Now you turn to page eight of the prospectus and read one line: the credit quality of the underlying assets — unwrap this security and home mortgages sit at the back, one by one — is not re-reviewed.\n" +
          "Your product mixes in loans those two failed lenders wrote, and nobody will give the exact share. Your account manager advises you not to move: selling now means the lowest price. But selling now also admits you never read those eight pages.",
        choices: [
          {
            id: "exit",
            text: "Cut out: sell now and accept the lowest bid",
            note: "Pay for clarity: you learn how much you have left, and everyone else learns how to tell the story.",
            outcomes: {
              crit: { body: "Three months later the product liquidates at zero. You left at a price that barely looked fair, but your hands are clean: the money stands, and your name is on no complaint." },
              ok: { body: "What you sold for is enough to negotiate another deal. You learned one lesson: paying on time is not the same as being safe." },
              meh: { body: "You came out thirty percent below where you went in, then the price ticked back up. Anyone can do this math; nobody likes the answer." },
              fail: { body: "Your sell order just sits with no bid. The market for this product no longer exists — you now only know what you were holding." },
              critfail: { body: "You cut before the top and at your district's ugliest hour: a local bank is seized over that same pool of loans, and the day before, you sold your piece into its rival." }
            }
          },
          {
            id: "hedge",
            text: "Do not sell — pay for a policy of insurance instead (a default swap)",
            note: "Hedging costs one fixed sum. If nothing happens, that sum is pure expense.",
            outcomes: {
              crit: { body: "The default is declared, and the cover pays face value. You did not get rich — you simply stood on the paying side of an industry where everyone loses money to each other." },
              ok: { body: "The payout patches the hole on the books. When people ask how you have been, you say: fine, hedged." },
              meh: { body: "The cover renews each year; the product never defaults, it just sits. Every year you pay for a story that does not happen." },
              fail: { body: "The seller changes the definition the day you sign: this does not count as a trigger event." },
              critfail: { body: "The shop that sold the cover fails too. Your hedge becomes one sentence in an email no one will ever answer again." }
            }
          },
          {
            id: "keep",
            text: "Do nothing and wait for the dividend to keep arriving",
            note: "A loss you do not book is a loss you do not have — the costliest kind of comfort.",
            outcomes: {
              crit: { body: "By year end the price is back at par and the rating slipped only one notch. You became the person who did nothing and was right — the most annoying kind at a dinner table." },
              ok: { body: "The book value stands. The dividend pauses one quarter, then resumes. You tell yourself: this is what long-term means." },
              meh: { body: "The dividend stops; the book value pretends otherwise. You start sliding that statement under other files." },
              fail: { body: "Under the page-five line about no re-review sits another: all losses are borne by the holders." },
              critfail: { body: "The liquidation notice runs one page and states that ninety-seven percent of what you put in no longer exists. Worse: at a district meeting you had just called this investment 'very solid.'" }
            }
          }
        ]
      },

      /* 2008 · 流动性冻结 —— 有现金的人定价一切 */
      {
        id: "sp08_liquidity",
        title: "Interbank lending stops, and the people asking you for money line up at the door",
        body: "The banks cut off the money they used to lend each other. The best hardware store on the street, the contractor who feeds the schools, and a print shop forty years open all come to you in the same week.\n" +
          "They are not asking for investment; they need ninety bridge days — short money, betting the borrower lasts until the next raise. You can write the rate yourself: the official channels shut on everyone this week, even the best credit on the street, and few enough can put money on the table now.\n" +
          "Among the callers are old voters of yours, and supporters of a rival you once ran against. Some say a local rich man has already offered four times the bank rate. How many of these signs still stand after ninety days decides whether you are a benefactor or a creditor.",
        choices: [
          {
            id: "predatory",
            text: "Lend: at the price they must accept right now",
            note: "The highest bracket of return, and the one that writes everyone's name into the same document.",
            outcomes: {
              crit: { body: "All of it comes back inside ninety days, and the interest would buy two blocks of storefronts. Nobody complains — they signed with their own hands. But now, some people look down when they see you coming." },
              ok: { body: "Most of the money returns, and the interest stays handsome. Two cannot pay; you take their equipment." },
              meh: { body: "Collection drags for half a year; after the lawyers you break even. One lesson learned: people who sign in panic do not remember what they signed." },
              fail: { body: "Three fail at once. The collateral is a pile of inventory nobody will buy and an IOU with a name on it." },
              critfail: { body: "One takes your money and fails anyway. The bankruptcy lawyer attaches your loan contract to page three of the petition, under the heading: lending terms of a local officeholder during the crisis." }
            }
          },
          {
            id: "community",
            text: "Lend: at cost, picking only the ones who can truly live",
            note: "Earn less in trade for one line: 'that winter, he did not rob the fire.' Provided you judged right.",
            outcomes: {
              crit: { body: "Five of the six you picked survive. At next year's chamber dinner they present you to the room — not by your office, but as 'the one who helped us.'" },
              ok: { body: "The repayments are average; every favor gets logged. This kind of account is not kept in interest." },
              meh: { body: "A tenth of what you lent never comes back, and nobody knows what price you charged. The good deed turns into a blurred ledger." },
              fail: { body: "Two take the money and fail anyway, and one of them was your old voter. Their line: if you are that kind of person, why not help more at the time." },
              critfail: { body: "Somebody leaks the list of who paid cost and who paid the going rate. The firms that got nothing march in the street, and the banner carries your name." }
            }
          },
          {
            id: "hold",
            text: "Do not lend. Keep the money on the books and winter it",
            note: "Zero risk, zero return, zero story. The one benefit: nobody can find you in a document.",
            outcomes: {
              crit: { body: "Half a year later you still hold cash and most of the street does not. When someone starts lending again, you are the one who can nod." },
              ok: { body: "The money is fine. Two firms close their doors. You began to wonder what if, then stopped." },
              meh: { body: "Nothing happens. In a year full of stories you stood outside the story." },
              fail: { body: "A boss who could have lived adds one line for you before he locks up: he did not lack money; he was only waiting for us to die." },
              critfail: { body: "Two firms fall on the street next to yours. The local paper runs photos of the seals on their doors, and the headline names the year 'he had money and did nothing.'" }
            }
          }
        ]
      },

      /* 2022 · 手机上的挤兑 —— 二十八小时 */
      {
        id: "sp22_run",
        title: "A post is shared ten thousand times in two hours, and one of your banks starts shedding deposits",
        body: "This bank is not failing. It simply holds bonds nobody wants — unrealized until sold, yet the market realizes them for you at any hour. At nine in the morning a finance account runs the numbers; by three in the afternoon, customers are queuing on their phones to move money out. A run needs nobody at the door now.\n" +
          "You have deposits here, and people you know work here. You now have about one day to decide which kind of person you are.\n" +
          "The regulators know about the paper loss and are still negotiating a bridge plan. Deposit insurance covers up to a limit; above it, you wait — and your balance sits just above that limit, two minutes from gone. What is it worth to stay and say 'I trust this bank'? What is it worth if you say it late?",
        choices: [
          {
            id: "first_out",
            text: "Move first. Take the part above the insured limit too",
            note: "The fastest, smartest and least reversible step: screenshots are forever.",
            outcomes: {
              crit: { body: "Next morning the bank announces it is in receivership. Your money is whole, because you were half a day ahead of almost everyone. This kind of victory does not get said out loud, and nobody wants to hear it." },
              ok: { body: "The money lands safe on the other side; the fee went to another bank. You earn a little less and sleep fine." },
              meh: { body: "The bank weathers the week. You moved your money out and cannot move it back — the rates have already changed." },
              fail: { body: "The bridge plan closes on the very day you withdrew. Next day someone mentions you standing in the lobby taking photos, your account balance clearly visible in them." },
              critfail: { body: "The regulators later pull the transfer timeline, and your wire sits in the 'clustered withdrawals' column. Two questions: how did you know that day, and why did you tell everyone there was nothing to fear." }
            }
          },
          {
            id: "public_stay",
            text: "Stay — and say in public: my money is not moving",
            note: "A hedge paid in reputation: stop the panic and you are the one; fail to, and you are the fool.",
            outcomes: {
              crit: { body: "Your line leads the local news, and that afternoon nobody presses the ticket machine at this branch. The plan gets signed overnight. Next year the bank invites you to give the opening words to its new hires." },
              ok: { body: "The outflow slows, but does not stop. Your words at least carried some people until the plan landed." },
              meh: { body: "You stop nothing. You effectively locked your own money away for a year, for free." },
              fail: { body: "The bank goes under anyway. What people remember is not that you told them not to withdraw — it is that you were standing in the lobby too." },
              critfail: { body: "The receivership list comes out, and the part of your balance above the insured limit will wait three years. The local station's headline: he told everyone not to panic; his own money was in there." }
            }
          },
          {
            id: "quiet_info",
            text: "Neither move nor shout — first make one call and ask how it looks inside",
            note: "One phone call, one answer nobody should give you. On this road neither the gain nor the risk is money.",
            outcomes: {
              crit: { body: "A person from the regulator gives you half a sentence: the plan is in talks, stay off television before the weekend. You stayed off, and you kept others off too. That half sentence turns out worth a great deal later — not the money kind of a great deal." },
              ok: { body: "You get a vague 'it is being handled.' Not enough to use, but you know the direction before the people outside do." },
              meh: { body: "The voice says: I cannot tell you that. You have just registered your curiosity in somebody's little notebook." },
              fail: { body: "The person you called is himself under interview. Next day your name appears on a list of who has been asking around." },
              critfail: { body: "Your call goes into the after-action report, filed as one example of 'individual depositors receiving nonpublic information early.' The hearing needs only one name, and yours happens to be on the list." }
            }
          }
        ]
      }
    ]
  }
});
