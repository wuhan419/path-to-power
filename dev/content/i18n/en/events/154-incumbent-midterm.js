/* ============================================================================
 * CONTENT · i18n/en/events/154-incumbent-midterm.js
 * 中文文件 content/events/154-incumbent-midterm.js 的英文覆盖层 · 契约见 docs/I18N.md
 * #21 M2 在任总统中期选举链三幕：camp_mt_agenda / camp_mt_rally / prog_midterm。
 * 只写覆盖字段；受保护键（grade/category/weight/tierMin/base/mods/cost/req/
 * effects/flags/valence/cond/when 等）一律不写；纯标量数组整条给全。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      /* ================= 幕一：党团交代 ================= */
      {
        id: "camp_mt_agenda",
        title: "The caucus wants an accounting",
        body: "The party's annual caucus meeting lays two years of books on the table. Onstage, people smile and ask when you will visit. Offstage, they are working out what your name is still worth in votes. Local candidates want money and turnout, not a photo op with you. And skip one appearance, and you have conceded the last two years were not worth defending.",
        choices: [
          {
            id: "all_in",
            text: "Bind yourself to the whole party ticket, stumping for candidate after candidate",
            outcomes: {
              crit: { body: "Your name becomes the party's brand; county committees rush to print you on their posters." },
              ok: { body: "You hold the room; the party ticket is willing to follow you for a stretch." },
              meh: { body: "A few stump speeches, polite applause. Locally, everyone still runs their own race." },
              fail: { body: "A candidate breaks with you on the spot, saying he cannot carry your two-year record." },
              critfail: { body: "The whole ticket keeps its distance onstage; your name becomes the one to route around." }
            }
          },
          {
            id: "home_state",
            text: "Go home to your own state and shore up your base first",
            outcomes: {
              crit: { body: "Your home state walls itself around you; local races swing upward on your pull alone." },
              ok: { body: "You grip your base firmly. Nothing flashy, but no one finds a gap in you either." },
              meh: { body: "You hold your own corner. The holes elsewhere are still there." },
              fail: { body: "The party chairman calls to ask: are you one of us, or only a householder?" },
              critfail: { body: "The national race collapses, and even your own state cannot patch someone else's hole." }
            }
          },
          {
            id: "hand_off",
            text: "Hand the party chairman's fundraiser off to the vice president",
            outcomes: {
              crit: { body: "The vice president works the whole room for you. The money lands, and you never face the audit." },
              ok: { body: "The money comes in; the man does not show. The caucus grumbles, then settles the bill." },
              meh: { body: "The fundraiser closes quietly. Your name neither appears nor gets mentioned." },
              fail: { body: "The vice president's room cannot save yours. The caucus understands what your absence meant." },
              critfail: { body: "A line is going around the party: the White House has given up on this ticket." }
            }
          }
        ]
      },
      /* ================= 幕二：全国助选 ================= */
      {
        id: "camp_mt_rally",
        title: "A national campaign tour",
        body: "The plane takes off and lands in six states in seventy-two hours. You are onstage endorsing someone else; the cameras are waiting on how you will answer the old story that has not gone away - local stations never ask about national issues, they ask about your own old ledger. And whose head the splash lands on depends on whose you aim at first.",
        choices: [
          {
            id: "head_on",
            text: "Go head-to-head at every stop: endorse, and lay out the opposition's old ledger too",
            outcomes: {
              crit: { body: "You bat the old story down in a line, nail the opposition's scandal to the front page, and six states run you on the evening news." },
              ok: { body: "You lose nothing in the shoving; local candidates dare to grab your hand onstage now." },
              meh: { body: "Both sides throw water; the audience remembers only two silhouettes in the spray." },
              fail: { body: "You toss the scandal out; the cameras cut your old story into the night's opening block." },
              critfail: { body: "Two question sessions collapse back to back, and the opposition turns your old story into a national ad and runs it for you." }
            }
          },
          {
            id: "safe_states",
            text: "Visit only the safe states and press down your base's votes first",
            outcomes: {
              crit: { body: "The safe-state halls pack out bigger each time; you fire up base turnout in person." },
              ok: { body: "You stamp your own territory hard; no one steals anything from here." },
              meh: { body: "Your own people applaud to themselves; the swing places never hear a word from you." },
              fail: { body: "The safe states do not need you, and the old story follows your motorcade the whole way." },
              critfail: { body: "You speak only in your own yard and hand the national news hour over to the opposition outright." }
            }
          },
          {
            id: "record_launch",
            text: "Hold a launch event on your own record; take no local questions",
            outcomes: {
              crit: { body: "You turn the two years into a report card worth running; local parties print flyers from it." },
              ok: { body: "The event passes smoothly. No one pushes the old story, and you leave the opposition no thread." },
              meh: { body: "Nobody forwards the report card; the campaigns in the states still fight their own wars." },
              fail: { body: "Refusing questions becomes the story itself: what is he hiding?" },
              critfail: { body: "All that survives is one clip of you declining to answer, looping until the night before the election." }
            }
          }
        ]
      },
      /* ================= 幕三：投票日 ================= */
      {
        id: "prog_midterm",
        title: "Election day: the midterms",
        body: "The count. Seats in both chambers of Congress report together tonight, and your name sits at the top of the ballot. Every question of your two years gets graded by someone else's vote. The whole party bets on holding the majority, riding on how many people will still turn out for you; and retreat to the White House now, and the agenda is safe - only the caucus keeps that bill until you leave office.",
        choices: [
          {
            id: "hold",
            text: "Stake your own name; throw the whole party in to hold Congress",
            outcomes: {
              crit: { body: "The majority holds and grows, in your hands. Tonight your name is the party's asset." },
              ok: { body: "A narrow win: the chamber holds, seats slip slightly. The caucus exhales; your account is settled, this once." },
              meh: { body: "An anodyne night; the majority slides through your fingers. You held the White House, not Congress." },
              fail: { body: "A chamber lost. Tonight the caucus's call is not condolence; it is counting who takes the blame." },
              critfail: { body: "Both chambers gone, and a few people you personally carried down with them. The next two years, you spend in the minority." }
            }
          },
          {
            id: "retreat",
            text: "Withdraw to the White House and guard your agenda; no stump speeches for candidates",
            outcomes: {
              crit: { body: "You stay cleanly behind your agenda and pick up a few legislative wins fit for the memoirs." },
              ok: { body: "The White House calendar is saved. Win or lose in Congress, no one mentions your name anymore." },
              meh: { body: "Nothing lost anywhere, nothing won. The caucus notes that you were not there tonight." },
              fail: { body: "You keep your agenda and get a caucus that lost a chamber; now everything takes a negotiation." },
              critfail: { body: "On collapse night you are in the study reading briefings. The party's bill, the money's bill, history's bill, all booked to you until you leave." }
            }
          },
          {
            id: "swing_allin",
            text: "Pivot overnight to the swing districts and spend the war chest dry",
            outcomes: {
              crit: { body: "The last night's money lands in three districts; you keep the majority by a whisker, and the vault by the bottom." },
              ok: { body: "Every dollar hits the edge; the seat count barely holds; the ledger holds nothing." },
              meh: { body: "You scatter the whole fund across swing districts, and the scatter makes no sound. The majority slips anyway." },
              fail: { body: "You burn the last dollar, lose the chamber, and donors start asking who to back next." },
              critfail: { body: "Money burned, chamber lost, and someone inside the party is already saying \"what do we do with the last two years\"." }
            }
          }
        ]
      }
    ]
  }
});
