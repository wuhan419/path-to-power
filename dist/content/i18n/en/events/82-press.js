/* ============================================================================
 * CONTENT · i18n/en/events/82-press.js
 * 中文文件 content/events/82-press.js 的英文覆盖层（媒体即武器 prensa 线）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动；事件按 id 定位，choices 按 id 对齐。
 *   · 结构性/引用键（id/era/tierMin/weight/base/mods/cost/req/stake/effects/flags …）受保护，
 *     写了会记 protectedHits，故一律不写；pOut 里的 body 才是要覆盖的正文。
 *   · 「」在英文里化进句子；媒体/机构用真实英文泛称。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      /* ============ 1) 借笔 ============ */
      {
        id: "press_columnist",
        title: "At dinner you are introduced to the city paper's column editor",
        body: "The city paper's seventh page runs a column three times a week, six hundred words a turn. The man who writes it is fifty-one and has spent twenty-two years on that page. The same pen that lifts someone up buries them, and he has never seen the difference.\n" +
          "At dinner someone introduces you. He is sizing you up as he shakes your hand, like he is gauging a story's length.\n" +
          "He takes no money - he can spot a man who has, and then he writes it. What he lacks is a scoop; three months now he has been rewriting other people's stories. " +
          "That column is the one thing in this town people still read word for word, and his memory is long: something you say tonight may surface in print eight years on.",
        choices: [
          {
            id: "feed",
            text: "Give him a real story: one thing only you know",
            outcomes: {
              crit: { body: "He turns to a fresh page in his notebook on the spot. Three weeks later your name is in the column four times, and every time in the first half of the sentence." },
              ok: { body: "He writes it down, and he writes it up. The wording is measured - so measured you wonder if he is holding something back for you." },
              meh: { body: "He uses your story, but it is not about you. Your name sits in a parenthetical in the sixth paragraph." },
              fail: { body: "You fed the story to the wrong man. He checks for three days, proves one detail of yours wrong, and writes that into the column." },
              critfail: { body: "Your story touches a person you are not ready to cross. The day after it prints, that person remembers this for you." }
            }
          },
          {
            id: "dinner",
            text: "Take him to his old place for a drink and ask for nothing",
            outcomes: {
              crit: { body: "You drink till eleven. He tells you about the election he lost. On the way out he says you are more interesting than they are. That is not a story, but it is worth more than one." },
              ok: { body: "A meal, and a line: come find me when you need something. Neither of you asks what he means by something." },
              meh: { body: "He comes, eats, trades thirty years of political gossip, and leaves. You pick up the tab for the night." },
              fail: { body: "He reads you the second he sits down: you did not ask me here to hear me talk. He eats half and leaves." },
              critfail: { body: "Someone sees you at this restaurant. By tomorrow a line is going around: that fellow is already buying reporters drinks." }
            }
          },
          {
            id: "wait",
            text: "Make no move. Let him write you on his own.",
            outcomes: {
              crit: { body: "You do nothing, and he comes anyway. His headline names you the man who has not spoken yet. It is the best six hundred words he has written in twenty-two years." },
              ok: { body: "He writes you later, neither good nor bad, like an obituary he practiced too early." },
              meh: { body: "He does not write you. The seventh page keeps printing other names." },
              fail: { body: "This week he writes your opponent. The piece's last line notes that another young man also seeks the seat but did not respond." },
              critfail: { body: "Three months on you learn the dinner had been arranged for someone else. You simply sat in the empty chair." }
            }
          }
        ]
      },

      /* ============ 2) 挡笔 ============ */
      {
        id: "press_blackout",
        title: "A story exposing you runs next Thursday",
        body: "You learn what the story will say three days before readers do.\n" +
          "A reporter who has covered City Hall for seventeen years stitched three things together: money you took last March, something you said in a council corridor, and a person you have never explained.\n" +
          "The story is with the editor now. It prints Thursday. You have three days.\n" +
          "The reporter has never retracted a line in twenty years, but the kill-or-print call is the editor-in-chief's, not his. That same editor has a son in private school at sixty thousand a year. " +
          "They say the third of the three items was handed to the reporter by someone. A killed story leaves no mark on paper.",
        choices: [
          {
            id: "preempt",
            text: "Strike first: settle the money before the newsstands open",
            outcomes: {
              crit: { body: "Wednesday afternoon you hold a twenty-minute news conference and read out the bills, the dates, the payees. Thursday's story runs, and it reads like old news." },
              ok: { body: "You speak first. The story still runs, but it hurts half as much, because readers heard it elsewhere already." },
              meh: { body: "You speak a day after the story. Side by side, you look like you are plugging holes." },
              fail: { body: "At the conference you add two lines you did not need. Thursday's headline is built on them." },
              critfail: { body: "The money you disclosed drags up a name you never expected. You did the story's job for it, the job it could not do alone." }
            }
          },
          {
            id: "money",
            text: "See the editor: his son's tuition, you can help with that too",
            outcomes: {
              crit: { body: "The story never runs. Three days later a short piece on your free legal clinics appears in the third column of that same page, bylined another reporter. The editor said nothing; so did you." },
              ok: { body: "The story shrinks to four hundred words on page fourteen, its headline not even naming you." },
              meh: { body: "The money is taken, the story is held a week, and then it runs anyway. You bought seven days." },
              fail: { body: "The editor pushes the envelope back, and from that day puts that reporter on your beat full time." },
              critfail: { body: "At the table when you passed the envelope, an intern from the other paper sat next to you. Two months later the story surfaced in another form." }
            }
          },
          {
            id: "lev",
            text: "Use a piece of leverage: get someone inside the paper to call it off",
            outcomes: {
              crit: { body: "One call. You do not mention the story, only a file number and an afternoon a year ago. Next morning the editor pulls it off the page himself and reassigns the reporter's beat." },
              ok: { body: "The story is killed. Killed so abruptly the desk talks for three days, but no one knows who called." },
              meh: { body: "The story is held two weeks and runs after all, under a different byline. You spent one piece of leverage to buy two weeks." },
              fail: { body: "The person you leaned on is no longer who you thought. He repeats your call, word for word, to the reporter." },
              critfail: { body: "You thought you were threatening a man; you were training one. Now he knows exactly how afraid you are of being written about. He keeps that ledger for years." }
            }
          },
          {
            id: "endure",
            text: "Do nothing. Let it print.",
            outcomes: {
              crit: { body: "It prints, gentler than you feared. To be fair it had to note the two things you did afterward. That week your name was held in three kinds of memory at once for the first time." },
              ok: { body: "It printed. It stung for two weeks, then the desk turned to someone else. You learn one thing: the news moves on by itself." },
              meh: { body: "It printed. Three old backers called to ask. You explained one by one; by the third you were sick of it yourself." },
              fail: { body: "It printed, and the three items were proven cleanly. You spent four months and moved nothing." },
              critfail: { body: "It printed. That morning a stranger stopped you in a convenience store for the first time. You felt no anger, only a plain question: will this man vote for you again." }
            }
          }
        ]
      },

      /* ============ 3) 用笔 ============ */
      {
        id: "press_kill",
        title: "Someone begs you to kill a true story about your ally",
        body: "This time someone comes to you.\n" +
          "The story is not about you, it is about a man who promised you his votes. Every line is true, every line checks out. And once it prints, the strongest beam you have in this district snaps.\n" +
          "The other side does not want money. He wants one sentence, a word from you that means let it go, from inside his own trade.\n" +
          "The one moving is not your rival; it is a paper that simply thinks this is a good story, and in it you are listed as a friend of the councilman. " +
          "Burying a true story costs nothing up front and everything later; swapping means feeding them bigger news, because the space is finite. The managing editor is already cutting two people off the desk next month.",
        choices: [
          {
            id: "swap",
            text: "Hand them bigger news and take up the space",
            outcomes: {
              crit: { body: "You release early a thing you meant to save for fall. The editor reshuffles the front page on the spot and offers you a signed analysis; he thinks you are one of his." },
              ok: { body: "The space goes to another story. Yours is pushed to next week, then next month, then it is gone." },
              meh: { body: "The tip you gave was not big enough. Both stories run, and readers remember only the one about the person." },
              fail: { body: "You said a thing you should not have said yet. Next day it is in seven papers, and the person you meant to shield gets written anyway." },
              critfail: { body: "The tip you fed turns out to be false. The paper apologizes for it, and promotes the story about the person to page one." }
            }
          },
          {
            id: "buy",
            text: "Buy the space: let him write it, where he least wants to",
            outcomes: {
              crit: { body: "You buy an entire season of ad slots. The editor cuts the story himself into an eight-hundred-word local brief, parked on Saturday. No one reads the paper on Saturday." },
              ok: { body: "It runs, but thin: three paragraphs, not one quote. Money cannot buy silence; it buys column inches." },
              meh: { body: "You bought the ads and the story ran anyway. The editor took from both sides and owes neither." },
              fail: { body: "Ad sales take your money; the newsroom prints regardless, and adds a line noting the paper filed an internal disclosure about advertising taken from the councilman." },
              critfail: { body: "The reporter writes down the whole deal and puts it in his book two years later. Your name is in chapter five." }
            }
          },
          {
            id: "lev",
            text: "Give one reason they cannot refuse (spend a piece of leverage)",
            outcomes: {
              crit: { body: "You reach a man who never writes a word. He listens and says only: understood. Next day the story is flagged within the desk as unverified. Unverified things never print." },
              ok: { body: "Buried. Buried so cleanly the reporter still believes his own pitch was cut." },
              meh: { body: "The story is gone, but the reporter is moved to the statehouse beat, a longer line, one that can follow you forever." },
              fail: { body: "The man you leaned on agreed, then sold the whole thing to someone else as his own chip. Now four people know you are burying stories." },
              critfail: { body: "You killed one story but let the other side see something: you do not want even this truth seen. The paper files you from now on under people to watch." }
            }
          },
          {
            id: "letit",
            text: "Do not touch it. If he is to be written, let him be written.",
            outcomes: {
              crit: { body: "It runs, and the man stands up and owns it himself. He does not fall; instead some start calling him someone who admits what he did. This teaches you: the beam you worried about is sturdier than you." },
              ok: { body: "It ran. The man took a scratch and recovered in two months. You lost nothing; his calls just take a little longer to return now." },
              meh: { body: "It ran. The man never takes your call again. You lost a friend and gained a clean name." },
              fail: { body: "It ran. The man blames you; he believes you had a way to stop it. People in the district start calling you unreliable." },
              critfail: { body: "It ran, and it dragged up a chain of old accounts, and every one was charged to you. No one remembers who got caught; they only remember who let it happen." }
            }
          }
        ]
      },

      /* ============ 4) 拥有笔 ============ */
      {
        id: "press_own_outlet",
        title: "You consider buying the whole local paper",
        body: "The outlet is for sale.\n" +
          "Not closing - the owner is old, neither son wants it, and the asking price is a third under real value.\n" +
          "Your accountant lays three pages in front of you. The last line on the third reads: at the current price you will lose two hundred thousand a year after you buy it, and what you get cannot be entered on the books.\n" +
          "Second in local circulation, first in the reputation that no one dares lie on its pages. Put the deed in your name and you are a media proprietor, and the party turns wary the same week. " +
          "Editorial independence is the lever: keep more of it and the paper stays useful, keep less and it obeys. They say it is being squeezed into selling - its biggest local advertiser just pulled out.",
        choices: [
          {
            id: "buy",
            text: "Buy the whole thing, the printing presses included",
            outcomes: {
              crit: { body: "The day of closing you walk into the newsroom and say one line: the pages are still yours to decide. No one resigns. Six months on, circulation is up a tenth. You became the owner people genuinely want to keep." },
              ok: { body: "You became the owner. First morning you read on your own page three a story that did not entirely flatter you, and you did not call anyone. That is exactly what you wanted." },
              meh: { body: "You bought it. Two reporters quit in the first month. The two who replace them write less well but say yes more easily; you got what you meant to buy, and lost the reason you bought it." },
              fail: { body: "You bought it, and then the money started leaking. The second year's loss is double what the accountant projected, and now your opponent says on the air that the gentleman has taken a sudden interest in a free press." },
              critfail: { body: "Only after you bought it do you learn the real reason it loses money: an old lawsuit still open, and the seller tucked those pages into the middle of the due-diligence file. You bought the lawsuit too." }
            }
          },
          {
            id: "influence",
            text: "Skip ownership; just buy the fact that the editor answers your call",
            outcomes: {
              crit: { body: "You did not buy it. You became its biggest advertiser, and the coffee the editor takes Tuesday afternoons. In this country real control of the media was never on a deed." },
              ok: { body: "From then on, before the paper writes a story about you it places a call first. It is not that they dare not write; they write more accurately." },
              meh: { body: "The money went out, the effect is middling. The editor takes your call, and other people's too." },
              fail: { body: "The editor returns the money and writes a short column titled that this publication takes no paid placement." },
              critfail: { body: "You got only a promise, and you had already let your name out in two dinners. Three months later your opponent buys the outlet, and it remembers that once you wanted to buy it." }
            }
          },
          {
            id: "pass",
            text: "Do not buy. Keep the money for votes.",
            outcomes: {
              crit: { body: "You put the money into offices in three wards. Six months on you hold no editor's phone number, but forty people who will drive in the rain. Which of the two mattered more, historians are still arguing." },
              ok: { body: "You did not buy it. The money is still there, and the trouble is less. The outlet goes on writing about you however it likes." },
              meh: { body: "You did not buy it; someone else did. It did not turn worse against you, only better toward whoever bought it." },
              fail: { body: "Your opponent bought it. The lead editorial's headline is a question mark, but the whole piece leaves you room at only one mark: the period at the end." },
              critfail: { body: "You neither bought it nor had an ally buy it. Three months later it folded; two old reporters lost their jobs; and local news had one paper left, owned by a relative of your opponent." }
            }
          }
        ]
      }
    ]
  }
});
