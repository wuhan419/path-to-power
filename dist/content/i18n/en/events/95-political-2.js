/* ============================================================================
 * CONTENT · i18n/en/events/95-political-2.js
 * 中文文件 content/events/95-political-2.js 的英文覆盖层（党务线第二包：
 * pol2_primary_fight / pol2_whip_count / pol2_party_convention /
 * pol2_endorsement_tree / pol2_purge）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices 按 id 对齐；terms 不带 id，按数组下标对齐。
 *   · 结构性键（id / era / tierMin / weight / base / mods / effects / flags /
 *     cost …）受保护，本文件一个都不写。
 *
 * 英文写法：第二人称、现在时、短句；「」化为引号或句子；
 * 美国政治实词（caucus、whip count、floor leader、superdelegate、the machine、
 * precinct captain、roll-call、cross the aisle、faction purge）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ------------------------------------------------------------
       * 初选内战
       * ---------------------------------------------------------- */
      {
        id: "pol2_primary_fight",
        title: "You and a fellow party member fight for the nomination in your own primary",
        body: "The seat is open, and the party left two chairs by it: yours, and one taken by a fellow member who " +
          "got there first. The machine leans his way. The primary truce — no attacks — dissolves the moment both " +
          "names print on the same ballot. Fight, wait, or step aside: every call this week is a probe. Word is he " +
          "briefed the county party about this run six months ago. Every word said in a primary is kept by the " +
          "loser's precinct captains — their network doesn't vanish, it waits two years, or four.",
        choices: [
          {
            id: "grassroots",
            text: "Go grassroots: gather signatures for the ballot and flood the caucus rooms with volunteers",
            note: "Organization and shoe leather. When the machine's list can't match the list you knocked into " +
              "existence, staying 'neutral' becomes a joke.",
            outcomes: {
              crit: { body: "You turn in triple the signatures the rules require. On caucus night your volunteers " +
                "fill the first three rows. The machine 'reassesses its neutrality.'" },
              ok: { body: "You clear the signature hurdle and win the primary. Your rival leaves you a gracious " +
                "voicemail. His precinct captains do not." },
              meh: { body: "You win, and it's ugly: low turnout, both sides' ads stomping each other for a month. " +
                "The general election starts counting down from your civil war." },
              fail: { body: "In the end the machine's list runs half a district longer than your knocking list. " +
                "You lose the primary and keep your dignity — and your career." },
              critfail: { body: "Two forged signature pages surface on your petition. A volunteer did it; the bill " +
                "comes to you. The primary hasn't started and your name is already in your own party's hit file." }
            }
          },
          {
            id: "inside",
            text: "Go inside: count delegate votes at the convention and cut a deal with the machine",
            note: "Not votes — delegates. A backroom game of promises, trades, and selling your agenda to a " +
              "committee at a discount.",
            outcomes: {
              crit: { body: "You work it delegate by delegate: three county delegations flip to you at the " +
                "convention. Your rival quits before the second ballot — the machine hates bleeding into round three." },
              ok: { body: "You take the nomination on the second ballot. Every delegate favor is in the little " +
                "book, and every entry has a price." },
              meh: { body: "The nomination comes with three IOUs: a committee seat, two issue concessions, and a " +
                "promise to 'take direction later.'" },
              fail: { body: "The count stalls eleven votes short at round three. The machine moves its chips to " +
                "your rival. You lose on the ground you chose." },
              critfail: { body: "You promised the two county delegations opposite things and get confronted on the " +
                "convention floor. The nomination is gone. 'Two-faced' stays." }
            }
          },
          {
            id: "unity",
            text: "Step aside: give the seat to your rival and take credit for 'putting the party first'",
            note: "Safety play: quit the primary and endorse him openly. You keep the peace and your ledger — and " +
              "you keep the word 'next' alive.",
            outcomes: {
              crit: { body: "Your withdrawal statement is elegant. After he wins, he tells the victory dinner the " +
                "seat 'belongs in part to him.' Six months later an open committee seat lands in your name." },
              ok: { body: "'He put party first' goes into the county committee minutes. The favor is banked in your " +
                "name; nobody guarantees the interest." },
              meh: { body: "He wins and doesn't mention you in the speech. Lesson one of stepping aside: a " +
                "concession doesn't need to be remembered." },
              fail: { body: "He wins the seat and forgets the promise. Your 'big picture' turns out to be a " +
                "picture of one." },
              critfail: { body: "Your withdrawal gets spun as 'he wouldn't fight': soft to the bosses, fence-sitter " +
                "to the base. Both ledgers take a stroke." }
            }
          }
        ]
      },

      /* ------------------------------------------------------------
       * 数票之夜
       * ---------------------------------------------------------- */
      {
        id: "pol2_whip_count",
        title: "The bill is two votes short, and your name sits in the 'unsure' column",
        body: "The must-pass bill is two votes short and your name sits in the leader's 'unsure' column. Your " +
          "district splits fifty-fifty on it — that's why you haven't decided. The deputy whip, the officer who " +
          "counts party votes and leans on members, has walked past your door three times this afternoon. And word " +
          "is the other side has bid too: a project your district badly wants. There is no 'abstain' on that list. " +
          "Not answering the phone counts as a vote.",
        choices: [
          {
            id: "count_for_them",
            text: "Take the whip's job: go count the missing two votes for the leader",
            note: "You stop being counted and start counting. Errand work — but also a clerk's seat at " +
              "the party ledger. The clerk knows every IOU.",
            outcomes: {
              crit: { body: "You lean back two votes for the leader in the cloakroom. The bill passes by one. That " +
                "night, in the leader's office, your name moves from 'unsure' to 'ours' — page one of the little book." },
              ok: { body: "The count comes up, with your hand in it. The leader slaps your shoulder in the corridor " +
                "— at least five people see it." },
              meh: { body: "The vote you brought back flips again later. The leader says nothing, but a question " +
                "mark appears beside your name on the list." },
              fail: { body: "The bill goes down. The whip count leaks to a reporter, and your name is in the " +
                "'handled by' line." },
              critfail: { body: "You lean on a wobbly colleague for the leader, and he records you. Intra-party " +
                "strong-arm tactics hit the papers; yours is the hand in the photo." }
            }
          },
          {
            id: "trade",
            text: "Become the trader: put your vote on the shelf and let both sides bid",
            note: "Politics' oldest trade. Selling well gets called 'bringing benefits home to the district.' " +
              "Selling badly gets called whatever the winner's memoirs say.",
            outcomes: {
              crit: { body: "The other side offers a project for your district; the leader offers 'first in line " +
                "at the next nomination.' You show your hand an hour before the vote — both sides feel like they won." },
              ok: { body: "You land one real project for the district. The leader makes a note: this man's vote " +
                "has to be bought." },
              meh: { body: "Both bids are stingy. You end up voting party line, having wasted a turn as merchandise." },
              fail: { body: "The leader sees through your stall. The night the bill passes, your committee request " +
                "is quietly tabled in procedure. No explanation offered." },
              critfail: { body: "A reporter pieces your haggling with both sides into one story: 'A One-Man " +
                "Auction.' Your vote never sold, but the whole country saw the price." }
            }
          },
          {
            id: "defect",
            text: "Cross the aisle: vote the other side, the way your district wants",
            note: "The district will love you. The party won't. Crossing isn't one vote — it's a whole separate " +
              "page in the little book.",
            outcomes: {
              crit: { body: "Your cross-aisle vote decides the bill; a banner greets you at the home airport. The " +
                "leader tells reporters the party 'has room for dissent.' His list is less generous, but district " +
                "calls queue into next week." },
              ok: { body: "You cross; the bill loses by one seat. The hometown paper gives you page one. The caucus " +
                "meeting gives you a cold shoulder." },
              meh: { body: "Your crossing changes nothing. Both sides note it: the other side welcomes you, your " +
                "own side remembers." },
              fail: { body: "You cross and the bill passes anyway. The district benefit never lands; the party's " +
                "does. Your committee assignment moves to the softest chair in the building." },
              critfail: { body: "The leader holds you up as 'the textbook traitor' at the caucus meeting. Grassroots " +
                "applause doesn't carry to the Capitol. Your office moves to the basement." }
            }
          },
          {
            id: "absent",
            text: "Take the day: 'happen' to be home on urgent district business on vote day",
            note: "Safety play: skip the vote. Absence never makes the papers — but the whip's list writes absence " +
              "on the same page as crossing.",
            outcomes: {
              crit: { body: "You cut three ribbons and meet four groups of voters back home. The bill passes by two " +
                "— the leader has no time to chase a man who simply wasn't there." },
              ok: { body: "Nobody holds the absence against you; nobody thanks you either. The safest vote is the " +
                "one not cast." },
              meh: { body: "A helper from the leader's office phones to 'confirm you're well again.' You hear the " +
                "quotation marks in his tone." },
              fail: { body: "The bill goes down by one — the exact margin of your absence. Nobody speaks in the " +
                "caucus room. The list does." },
              critfail: { body: "Photos of your 'district emergency' land in the society section: ribbon-cuttings, " +
                "fishing, banquet. The bill loses, and your itinerary becomes the party's joke." }
            }
          }
        ]
      },

      /* ------------------------------------------------------------
       * 党代会代表
       * ---------------------------------------------------------- */
      {
        id: "pol2_party_convention",
        title: "You seek a grassroots seat on your state's delegation to the national convention",
        body: "Slots are open for grassroots delegates to the national convention — the party's four-year meeting " +
          "that picks the presidential nominee. No pay, no cameras; the list is built on loyalty, attendance and " +
          "grunt work, not seniority. The county chair says it plainly: five years on a cold bench before you get a " +
          "chair. And word is one old delegate's seat is negotiable — if you finish his chess game first. The real " +
          "dividend pays out four years late, in hallways that matter more than the floor.",
        choices: [
          {
            id: "grind_seats",
            text: "Grind the ranks: never miss a single county committee meeting",
            note: "The dumbest, steadiest road. Attendance, grunt work, and a name for always being there — the " +
              "grassroots delegate's currency.",
            outcomes: {
              crit: { body: "Sixteen months, every meeting in your district — including the blizzard night with " +
                "seven people in the room. When the slate drops, your name is first of the two 'new generation' slots." },
              ok: { body: "You sit every bench and get the seat. A caucus chair writes one word beside your name: " +
                "reliable." },
              meh: { body: "You get an alternate slot. No floor seat for you, but the packets still come — " +
                "alternates are on the list too." },
              fail: { body: "You grind two years, and on list day everyone ranked above you ground four. The " +
                "lesson isn't quit. It's keep grinding." },
              critfail: { body: "You neglect your actual job to protect your attendance. Constituent-service " +
                "complaints run in the local paper. You're not on the party slate — you're on a different list." }
            }
          },
          {
            id: "old_man_seat",
            text: "Play chess with the old delegate: talk him out of his seat",
            note: "The shortcut comes served as games and reruns of one old story. It's fast and it sounds bad — " +
              "and the old man may want more than a chess partner.",
            outcomes: {
              crit: { body: "After the seventh game he says: the seat is yours, if you read my name list at every " +
                "annual dinner for me. You agree. The price is so cheap it feels like found money." },
              ok: { body: "The old man retires and you move to first in the succession. The favor is banked in his " +
                "name and billed to you." },
              meh: { body: "You play all winter. He hands the seat to his nephew anyway. At least you learned chess." },
              fail: { body: "Somebody turns your 'courtesy visits' into a story about a young man waiting to grab " +
                "a chair. The old man takes offense; the county takes worse." },
              critfail: { body: "A rival photographs your chess sessions under the subject line 'the young man " +
                "counting seats,' and it works the party listserv. No seat — the reputation arrives first." }
            }
          },
          {
            id: "skip_convention",
            text: "Sit it out: keep your time for the district and your family",
            note: "Safety play: the convention's narrow door opens again in four years. You may be skipping a " +
              "chair — or sparing yourself something else.",
            outcomes: {
              crit: { body: "While others trade cards in the hallways that week, you close three district cases " +
                "two years overdue. Voters don't know a convention is meeting. They know you got things done." },
              ok: { body: "A quiet season. You show up for the family dinner table and the district calls both." },
              meh: { body: "The convention meets without you. Two of the names on TV asked you for advice last year." },
              fail: { body: "The county chair is very polite on the phone: the slate is 'based on participation.' " +
                "You understand." },
              critfail: { body: "The convention you skipped rewrites the rules — the byline that favored local " +
                "doers like you is deleted. Nobody spoke up, because nobody in the room knew you." }
            }
          }
        ]
      },

      /* ------------------------------------------------------------
       * 背书链条
       * ---------------------------------------------------------- */
      {
        id: "pol2_endorsement_tree",
        title: "Your senior and your protégé both ask for your endorsement, and you can only back one",
        body: "Two endorsement requests land the same day: a superior two rungs up wants your signature, and " +
          "someone you raised is waiting on your name. An endorsement is a public pledge of support — and these " +
          "two stand on opposite wings of the party; you can honestly back only one. Your name is currency, once " +
          "printed it never comes back. Whoever you lift today may sit tomorrow where your own nomination gets " +
          "decided.",
        choices: [
          {
            id: "endorse_up",
            text: "Endorse up: stake your name on the rising side",
            note: "Ride the express — senior attention and patronage. The cost: your network starts growing in " +
              "one direction, up, and your juniors go hunting for new patrons.",
            outcomes: {
              crit: { body: "He wins, and your name sits second on the joint statement. At the victory dinner he " +
                "turns your shoulder to the room: 'Half of this belongs to him.' From next week your phone won't stop." },
              ok: { body: "The signature buys a direct line to his office. No promises are spoken aloud. The " +
                "little book speaks them." },
              meh: { body: "He takes your name and returns no echo. What you pictured as a joint statement ends " +
                "up one signature among many." },
              fail: { body: "He loses. Your name sinks for half a year under his losing ads — and nobody on the " +
                "junior side calls either." },
              critfail: { body: "He loses, and loses ugly, wrapped in scandal. Opponents splice your signature " +
                "into 'they're all the same kind' attack material. You endorsed the man; the man repays you with the blame." }
            }
          },
          {
            id: "endorse_down",
            text: "Endorse the junior: be the kingmaker and grow your own network",
            note: "Dollar-cost averaging at the low rung. What he wins is an office; what you win is standing at " +
              "the source of a faction. Long cycle, high compounding, slow payoff.",
            outcomes: {
              crit: { body: "Your name rides at the top of his mailers and he wins by seventeen points. On " +
                "election night he says, 'This all started with my mentor's endorsement' — and the forty volunteers " +
                "in the room remember it, every one." },
              ok: { body: "He wins. Your standing as a kingmaker sets in around the county committee — a network " +
                "that starts from you." },
              meh: { body: "He squeaks through and is busy paying his own campaign debts. You collect one " +
                "thank-you and an unscheduled future." },
              fail: { body: "He loses and your name goes down one round with him. The kingmaker story fears one " +
                "opening: the horse never ran." },
              critfail: { body: "His scandal breaks with two weeks of election left — and the senior camp digs up " +
                "your 'poor judgment.' Reading people, they note, is part of political judgment." }
            }
          },
          {
            id: "decline_both",
            text: "Endorse nobody: let the name rest this season",
            note: "Safety play: silence. It buys you out of backing the wrong side and charges you 'not one of " +
              "ours' on both ledgers.",
            outcomes: {
              crit: { body: "Your 'heads-down on the day job' earns a small kind notice in the local paper. Both " +
                "losers thank you afterward for staying out — silence occasionally pleases both sides." },
              ok: { body: "No signature given. This season your name prints on nobody's material — and you owe nobody." },
              meh: { body: "The calls from both camps thin out. Coldness in a political network isn't punishment. " +
                "It's forgetting." },
              fail: { body: "The senior one remembers your hedging; the junior remembers your silence. This page " +
                "of the little book reads: not a vote to count on." },
              critfail: { body: "The day both lose badly, their supporters' post-mortems spend their sharpest " +
                "words on watchers like you: in an avalanche, no single flake ever signed its name." }
            }
          }
        ]
      },

      /* ------------------------------------------------------------
       * 党内清洗
       * ---------------------------------------------------------- */
      {
        id: "pol2_purge",
        title: "Your faction falls from power, and your name is on the purge list",
        body: "The faction that raised you lost the reorganization overnight, and the new guard is clearing " +
          "names — a purge: the winners working systematically through the losers' network. Half your contacts, " +
          "two endorsements and your first promotion all carry the old faction's signature. Your oldest ally " +
          "called tonight: 'I saw page three. Your name is on it.' The new guard invites you for coffee — they " +
          "want a declaration, proof of loyalty, not an apology. Word is they hold years of the old faction's " +
          "correspondence. There is no spectator seat in a purge: your silence gets entered on both ledgers.",
        choices: [
          {
            id: "stand_with_them",
            text: "Stand with the old faction: refuse the break, publicly",
            note: "The dearest choice: settle every debt now. The new guard's enmity ships same-day; your " +
              "faction's loyalty compounds over four years — if you live to cash it.",
            outcomes: {
              crit: { body: "At the caucus meeting you repeat the new guard's message word for word, then say: " +
                "'My endorsements, my promotions, my name — this faction gave me all of them. If anyone here must " +
                "cut, cut.' The room dies. That night the old faction's phone lines stay hot till dawn. Page three " +
                "crosses your name out and the cover writes you in." },
              ok: { body: "You refuse to sign the break statement. The committee seat goes. The old faction's " +
                "network becomes an asset you can sleep on." },
              meh: { body: "You refuse, quietly. The old faction banks the thanks; the new guard banks the grudge. " +
                "You owe both sides a little heat." },
              fail: { body: "The refusal is billed immediately: title, resources, committee slots, taken one by " +
                "one. Your position is intact. Your office is empty." },
              critfail: { body: "The new guard papers your refusal as 'faction diehard, still resisting' in a " +
                "party memo. The old faction can't save itself, let alone speak for you. You become the purge's " +
                "teaching case — the one made for page three." }
            }
          },
          {
            id: "save_one",
            text: "No side, one person: spend every chip to pull a single name off the list",
            note: "Not a martyr, not a blade. Bet your whole capital on one person on that list — save him and " +
              "old loyalty owes you for life; fail and the capital and the man sink together.",
            outcomes: {
              crit: { body: "You cash six years of favors in one stroke: three calls, one visit, one 'we'll get " +
                "to it later.' On list day his name is not on it. He never asks what you did. His silence is the receipt." },
              ok: { body: "You save him — at the cost of an old account between you and the new guard that never " +
                "fully squares. They tolerate you. They watch you." },
              meh: { body: "The person you shielded moves from page three to the watch list. Not a win, not a full " +
                "loss — half the favors drowned." },
              fail: { body: "The chips are gone; the list didn't change. You gambled your credit and lost a man's " +
                "fate — and he's keeping score too." },
              critfail: { body: "The new guard files your lobbying: a fresh page in the purge dossier, 'the man " +
                "who ran errands for faction operators.' You didn't save him. You added yourself." }
            }
          },
          {
            id: "flip",
            text: "Cut loose: go to the 'coffee' and hand over what you know",
            note: "Proof of loyalty. The new guard's door opens; the old faction's ledger flips to your page. In " +
              "politics, 'traitor' has a shelf life of ten years, minimum.",
            outcomes: {
              crit: { body: "What you hand over is valuable but not lethal — enough to buy your seat, not enough " +
                "to bury anyone. The new guard takes you; the shrewd ones in the old faction see you kept a card " +
                "back. On comeback day, somebody remembers that." },
              ok: { body: "You sign the break statement and keep your seat. The new guard's liaison says " +
                "'forward-looking' to you three times." },
              meh: { body: "You give up what you know; they take the goods and issue no receipt. The new master's " +
                "trust is rented, billed monthly." },
              fail: { body: "Your break wasn't clean enough — they wanted names, you gave principles. Neither " +
                "side eats full, and both ledgers stay open on you." },
              critfail: { body: "What you disclosed lands in the files and in the paper — sourced to you. The old " +
                "faction marks you enemy; the new guard uses you as a bridge and doesn't issue a memo the day they " +
                "tear it down. 'Traitor' prints itself before your name for good." }
            }
          },
          {
            id: "lay_low",
            text: "Take extended leave: vanish for a quarter on 'health reasons'",
            note: "Safety play: ride out the eye of the storm. You'll be absent for the purge's hottest ninety " +
              "days — by your return the list is set, and nobody remembers speaking for you.",
            outcomes: {
              crit: { body: "Your sick leave lands perfectly: the storm passes and both sides' blades dull. On " +
                "your first day back the office is intact and people nod in the hallway — as if nothing happened." },
              ok: { body: "Ninety days; the papers cycle through three headlines. Your name appears on none of " +
                "them. That is the whole victory." },
              meh: { body: "You return. Desk intact, phones quiet. Presence, once lost in politics, gets picked " +
                "back up grain by grain." },
              fail: { body: "You dodge the blade but not the price of absence: the old faction notes 'he ran,' " +
                "the new guard notes 'he never came.' Both little books carry you, each on its own." },
              critfail: { body: "At the first caucus meeting after the storm, the new guard projects the absentees " +
                "list and 'confirms positions' name by name. Your health reason sits on page three — the same page " +
                "number as the purge list." }
            }
          }
        ]
      }
    ]
  }
});
