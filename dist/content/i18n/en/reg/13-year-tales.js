/* ============================================================================
 * CONTENT · i18n/en/reg/13-year-tales.js
 * 中文文件 content/13-year-tales.js（年终随笔素材库）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md §3）：
 *   · kind 用同名 "yeartale"，并进活注册表 reg.yeartale（对象，键 = 条目 id）。
 *   · 只覆盖 texts；kind / when / cond 是保护键或结构键，一概不写，留在原条目上。
 *   · texts 是纯字符串数组 → **整体替换**：每个 id 的条数与中文逐条一致
 *     （did 3/3/2/2 ｜ gain 2/2/1/2/2 ｜ now 2/2/2/2/2，共 14 条素材 27 个写法）。
 *   · 模板占位符 {year} {name} {state} {tier} 由 stage.js 的 pickTale 用
 *     String.replace 填充，原样保留；英文语序自己调整（州名不再嵌在中文量词结构里，
 *     一律放介词后：in {state} / the streets of {state}）。
 *
 * 写作口径同 08-vignettes.js 与 docs/I18N.md §4：像报纸补白/回忆录，不像直译；
 * 「」改成英文引号或改写掉；散文不写精确数字。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    yeartale: {

      /* ---------- 这一年你做了什么 did ---------- */
      yt_did_busy: {
        texts: [
          "{year} was a year crammed full of calls, calendars, and surprises. Later all you kept were a few fragments: a call in the middle of the night, a conference room the smoke never left, a page your hand hovered over before the signature. The other days drowned each other, like rain falling into a river.",
          "Hardly a month to breathe. When people summed up your {year}, the verbs they reached for were all motion — attended, vetoed, brokered, denied. Only you know how many sleepless nights sat between one act and the next.",
          "The calendar of {year} turned faster than any year before it. You looked up, and the trees had gone green and then gold. You got a great deal done and offended a great many people — in politics, those are often the same sentence."
        ]
      },
      yt_did_quiet: {
        texts: [
          "Almost nothing happened in {year}. No crisis, no opening, and even the opposition could not be bothered with your name. A year like that is worth one line in the memoirs — but it was the year you got your breath back.",
          "A quiet {year}. You finished the stack of books that had waited two years by the bed, and sat through a few unbroken dinners with your family. The papers had no room for you — some nights you wondered whether that was a kind of failure. Later you understood it as savings.",
          "{year} passed without a sound. Most years of a political life pass like this: no stage, only rehearsal. You were waiting for a decade that had not arrived yet."
        ]
      },
      yt_did_normal: {
        texts: [
          "{year} had its ups and downs, nothing storm enough to matter. You did the work in order, made the papers once in a while, went unforgotten once in a while. Most of political life is written in this middle register.",
          "The year ran like a familiar commute: a detour some days, every light green on others. {name}'s {year} fills barely a few lines when it is written down."
        ]
      },
      yt_did_headlines: {
        texts: [
          "You were above the fold too many times in {year} — and not all of it flattering. The scrapbook grew a finger thicker, and you began to understand that the front page is rented, and the rent comes due.",
          "It was a year defined by other people's headlines. Not one of the adjectives the editors chose for your {year} was yours — but you learned, this year, not to argue with the papers."
        ]
      },

      /* ---------- 你得到/失去了什么 gain ---------- */
      yt_gain_up: {
        texts: [
          "By the books, the year paid: a little more of a name, a little higher a seat, a little thicker a wallet. You read your rise in the year-end ledger — and read what it charged you in the mirror, the lines at the corners of the eyes.",
          "You climbed a stretch. Some people began saying your title with respect; others began checking your history out of sight. The things you gain have many names. What you lose has one: ease."
        ]
      },
      yt_gain_down: {
        texts: [
          "This was a year that walked backward. Reputation, position, or savings — something leaked out of your hand. Which one, the ledger will tell you; the feeling of sinking, you knew without opening it.",
          "You lost a good deal. The mail from supporters came thinner; the invitations read colder. For one moment you considered another line of work — and then it wore off: this is the only thing you actually know how to do."
        ]
      },
      yt_gain_health: {
        texts: [
          "Your body filed its report before the ledger did. This year's physical came back with more arrows pointing down than last year's; you folded it and put it in the drawer, on top of everything marked \"later\"."
        ]
      },
      yt_gain_flat: {
        texts: [
          "A year that gained nothing and lost nothing — or nothing at the size a book keeps. The same chips in hand as ever, only a year the older.",
          "No big win, no big loss. You held your ground the way you hold a levee: no paper prints the news that the river did not break through, but you know what it means."
        ]
      },
      yt_gain_fallen: {
        texts: [
          "This year you fell from office. You do not care to relive the process; the conclusion belongs to everyone. People assumed the story ends here — you have decided not to write it that way.",
          "The first months out of power, the phone was quiet in a way you had never heard. Then you learned to treat the quiet as a resource: at last, time to find out which of your things do not fall."
        ]
      },

      /* ---------- 你现在站在哪 now ---------- */
      yt_now_low: {
        texts: [
          "You are standing on the lowest steps now, in {state}. Nobody owes you a favor and nobody fears you — the two of them will change together one day, or not change together ever.",
          "You are still on the ground floor of {state} politics. You hand a card across the table; nine people in ten read it twice before they place your name. Politics is still somebody else's game to you — but your own bet is already on the table: on yourself."
        ]
      },
      yt_now_mid: {
        texts: [
          "You are one of the people who get listened to in {state} now. Some come out specifically to ask your opinion; others spend their time bracing for it. These middle steps are the widest and the most crowded — above, below, on either side, hands reaching to shake and feet reaching to trip.",
          "From the {tier} seat you can already see the threshold of power — and the groove worn smooth across it: how many go in this way, how many go out."
        ]
      },
      yt_now_high: {
        texts: [
          "Where you stand now, the view is fine and the wind is high. {state} has outgrown your name: every sentence of yours is read three ways, through three channels, at once. Above you is the last step — and the drop.",
          "As {tier}, you finally see what the top of this game looks like: not more power — fewer exits. Someone is always filming your steps."
        ]
      },
      yt_now_fallen: {
        texts: [
          "Since you came down, the streets of {state} have not changed. Some people dodge your eyes; some grip your hand a beat harder. You have taken note of both kinds.",
          "Now you stand in the crowd instead of on the stage, and the angle on everything has shifted. Had you seen it once from this angle years ago, you might not have fallen."
        ]
      },
      yt_now_default: {
        texts: [
          "At the turn of the year you stand at the office window. Below, the lights of {state} come on one by one, and under every one of them is a voter of yours, a creditor of yours, or an enemy of yours. You count for a while. Then you turn off your own light and go home.",
          "On the last day of {year} you put the cap back on the pen. Whatever this year was, it is over — and the first lesson politics ever taught you stands: as long as you are still at the table, the next hand has not been dealt."
        ]
      }
    }
  }
});
