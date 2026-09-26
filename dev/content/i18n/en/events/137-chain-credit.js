/* ============================================================================
 * CONTENT · i18n/en/events/137-chain-credit.js
 * 英文覆盖层：对应 content/events/137-chain-credit.js（次贷后话链，两幕）。
 *
 * 契约（详见 docs/I18N.md §3/§4 与 engine/i18n.js）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的文本字段；事件按 id 定位，选项按 id 定位。
 *   · 结构性键（id / after / base / mods / cost / stake / effects / flags / when …）
 *     由引擎保护，本文件一概不写。
 *   · 英文按第二人称、现在时、短句重写；「」不直译，改英文引号或句式；全文件零汉字（注释除外，从 133 覆盖层先例）。
 *   · 标题一律 sentence case。
 *   · 本链不钉 fixed，故本覆盖层也没有 fixed 载荷。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* 2008—2009 · 大空头赚了钱，打电话来拉你上车 */
      {
        id: "ch08_short",
        title: "The people who shorted housing made their money, and now someone is calling to bring you along",
        body: "What those two funds tripped over last August now has a national name: subprime. In your county, foreclosure notices paper a block a week, and a folding legal-aid table has appeared on the courthouse steps.\n" +
          "The name on last night's caller ID belongs to the branch president, and it is one you cannot forget: two of his clients bet against housing early — shorting wins only when the price falls — their book multiplied several times over, and the fund still has seats open. The warmth on the line carries another layer. Where the county pension goes is a position you took at the board last year; that is the answer he wants, along with the names you can still move.\n" +
          "Some say that number has already been dialed for three other people. The seat you take today goes into tomorrow's disclosure form.",
        choices: [
          {
            id: "ride",
            text: "Get in: move the money you can move into the fund that called it right",
            note: "A bet that you know where to take profit before he does. Risk: money and reputation lock into the same drawer.",
            outcomes: {
              crit: { body: "A month before the crash, you take your own team's advice and cash out. In the circle you circulate as 'the one who saw it clearly'; nobody asks which street the other half of the money was collected off." },
              ok: { body: "You make money — it does not arrive clean and it does not leave quiet. Your accountant finds you a word that can go on paper: hedge." },
              meh: { body: "The fund holds its book; your money sits inside it, stuck. The local paper, meanwhile, prints this trade of yours cover to cover." },
              fail: { body: "You got on at the top of the bus. By the bottom, your shares had exactly covered somebody else's profit. The county committee's regular meeting has a new agenda item for the first time: whether to cut you loose." },
              critfail: { body: "When the plaintiffs' bar turns on that phone call, your deposit timeline becomes page one of the disclosure record. Shorting is no crime — but the line 'what did he know at the time' will need you to testify for it in every debate from now on." }
            }
          },
          {
            id: "warn",
            text: "Refuse the ride, and hold a county-wide mortgage-risk briefing instead",
            note: "A bet that public anger is a lever and a warning is worth money. Risk: you become the one who trades on panic.",
            outcomes: {
              crit: { body: "You spread the default-pool data out on the high-school gym floor, and that same week three neighboring counties copy your meeting. The state attorney general's office calls to ask whether your checklist can serve as a template." },
              ok: { body: "The meeting happens; the warning gets said. Half the room came to thank you, half to call you an alarmist — and both remember who said it." },
              meh: { body: "Forty people attend your briefing. Next day the prices climb anyway; your speech lands like a sermon delivered to an emptied hall." },
              fail: { body: "Housing steadies for a spell before you finish talking. A reader letter — 'he predicts losses to help himself up' — lands on the front page of the chamber newsletter." },
              critfail: { body: "A reporter asks where your data came from — that phone call. You cannot explain why you had it first, and the warner becomes the suspect." }
            }
          },
          {
            id: "desk",
            text: "Take no money, hold no meeting: just keep the county's legal-aid table standing",
            outcomes: {
              crit: { body: "The folding table stands the whole summer; two hundred-odd households' paperwork mails out from it. Nobody puts this table on television, but in the families who kept their house, someone writes your name into a Thanksgiving card." },
              ok: { body: "The table is there, the people are there. You caught no big wind and touched no mess." },
              meh: { body: "The cases get taken; most of the houses are gone anyway. Behind the table sits someone who can blame nobody." },
              fail: { body: "A retired teacher who lost her house asks you at the aid desk: aren't you one of that circle — why can't you help? You have no answer, because you don't know either." },
              critfail: { body: "The aid table finally folds and closes. Someone puts up the donation record you took from the branch last year: his table only opens for his own creditors." }
            }
          }
        ]
      },

      /* 2010—2011 · 国会挑替罪羊，新规矩同时起草 */
      {
        id: "ch10_blame",
        title: "Congress hunts for a scapegoat while the new financial rules get written",
        body: "In Washington this year, bank bosses are called to the witness seat one by one, answering the same question on camera: did you know at the time.\n" +
          "The reform bill trades clause for clause between the parties; the new regulator already has a name, and only lacks the vote to exist. Invitations from two committees reach your desk at plainly different temperatures. The street's anger burns in from both ends at once: one end asks who should go to jail, the other asks who is paying for big government.\n" +
          "There is a folder with your name in it too: the 2008 phone call, the money, the things you said — it is all in the record. You are not in the front row of the accused. But the seat diagonally across from the spotlight happens to be empty. Who wrote the exemption clause in the end? Nobody has read the whole text.",
        choices: [
          {
            id: "gavel",
            text: "Seize the microphone: call the local brokerage boss to the stand and question him point by point",
            note: "A bet that public fury is usable currency and a seat is saved for you. Risk: your own party's money cuts the line on the spot.",
            outcomes: {
              crit: { body: "That boss says one line at your table: I also thought prices were still going up. Four national networks loop it that night; your name ties itself to daring to question big figures. On the phone, the caucus whip goes silent for three seconds — and you understand them." },
              ok: { body: "The hearing happens; the questions land where they were aimed. The rank and file feel avenged; your donors start uninviting you from dinners." },
              meh: { body: "The boss reads a script, you ask pre-cleared questions, and the fight the press came for never happens. Next day's pages go to someone else." },
              fail: { body: "The day he testifies, his lawyer team releases your 2008 deposit records instead. Who is under investigation here — the chair reads the line with a twisted mouth." },
              critfail: { body: "Point by point, your questions are deflected by his lawyers using your own disclosure form. Explain your phone call first, then ask about my board — that sentence becomes your headline for the year." }
            }
          },
          {
            id: "write",
            text: "Join the drafting group: grind the new regulator's charter and its office location into the bill text",
            note: "A bet that rules outlast cameras. Risk: the clause you write is the first one that later fits around your own neck.",
            outcomes: {
              crit: { body: "The bill passes carrying your clause, and your street makes the new regulator's first charter list. Years later an audit note says those few lines proved worth more than the whole agency — about you." },
              ok: { body: "Your wording enters the reviewed draft, mid-document. Your name appears not in the news but in the footnotes — and footnotes live longer." },
              meh: { body: "You burn three weeks in the working group; your clause gets merged into the line filed under someone else's name." },
              fail: { body: "On the last day of trading clauses, your provision gets cut by both parties together. 'Nothing he wanted ever got agreed to' lands in the local paper's settlement column." },
              critfail: { body: "The exemption text you helped write happens to cover a company you know well. The phrase revolving door reaches the national edition with your name on it for the first time." }
            }
          },
          {
            id: "casework",
            text: "Enter no hearing room: hold county office hours on foreclosure stops and pension accounts",
            outcomes: {
              crit: { body: "While the nation's cameras point at the witness table, your desk card reads: bring your loan contract. A year later, both parties' county reviews write the same line — he never took the stage, and never embarrassed himself." },
              ok: { body: "The office hours go on, session after session. Nobody quotes you; nobody can find you in the file either. These days that counts as two kinds of clean." },
              meh: { body: "You sat out this round's wind — and everyone's memory of it along with it." },
              fail: { body: "Both sides come asking: do you back the bill or not. Your office-hour calendar fills up, and not one reporter's question gets answered." },
              critfail: { body: "He can't even say how many houses his own district lost — it isn't your line, but when they count what your desk logged, the numbers genuinely do not add up." }
            }
          }
        ]
      }
    ]
  }
});
