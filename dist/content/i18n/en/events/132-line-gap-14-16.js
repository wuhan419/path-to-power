/* ============================================================================
 * CONTENT · i18n/en/events/132-line-gap-14-16.js
 * 中文文件 content/events/132-line-gap-14-16.js 的英文覆盖层（2014—2016 补薄）。
 *
 * 契约（与样板分片 i18n/en/lines/126-line-2015-18.js 一致，详见 docs/I18N.md §3/§4）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices 按 id 对齐，terms 不带 id 按下标对齐。
 *   · 结构性键（id / minYear / maxYear / tierMin / weight / base / mods / effects /
 *     flags / req / cost / month / grade …）由引擎保护，这里一个都不写。
 *   · 英文标题 sentence case（Senate 等专名保留大写）；正文不点真人姓名，
 *     只用职务称谓（the president / the opposition leader / the nominee /
 *     the majority leader / the lobbyists）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ============================================================
       * 2014-11 · the midterm wave
       * ========================================================== */
      {
        id: "ln14_wave",
        title: "Midterm wave hands the Senate to the opposition; the president enters veto mode",
        body: "On count night the agricultural states and the South flip block by block: nine net seats gone in the Senate, " +
          "the majority gavel crosses the aisle, and the House gap widens on the same night. Reporters already call the president's " +
          "remaining two years the veto era — nominees frozen, appropriations rewritten, every cabinet secretary starting a sentence with the word bipartisan.\n" +
          "Your phone answers on two lines: one wing wants your verdict on the course, the other wants your silence. Committee chairs are up for grabs in the reshuffle.\n" +
          "Some say the new majority caucus is keeping a list of who said what, when. Silence has a price this week too.",
        choices: [
          {
            id: "hold_local",
            text: "Judge nothing, back nobody; keep running the local agenda already filed",
            outcomes: {
              crit: { body: "The party war trades people by the crate while you stay on the ground delivering local business. Both sides notice during the reshuffle: they have to work with you." },
              ok: { body: "You praised no one and condemned no one, and nobody finds a sentence of yours to quote." },
              meh: { body: "For those weeks nobody thought of you, and that counted as safety." },
              fail: { body: "Both camps read your quiet as service to the other side, and the papers start printing your name with a question mark." },
              critfail: { body: "Silence is filed as loyalty to nobody, and the reshuffled roster puts you at the bottom." }
            }
          },
          {
            id: "sign_pivot",
            text: "Circle a memo of colleagues demanding the White House change course",
            note: "Bet that voters resent the losing more than the direction. Risk: the White House and the caucus both keep the bill.",
            outcomes: {
              crit: { body: "The memo is quoted in national papers; reform money and cable invitations arrive together. When the caucus meets, you are the one they must invite." },
              ok: { body: "The signatures came in and the pivot is on the table. Somebody upstairs drew a red line under your name." },
              meh: { body: "The memo was delivered, like a letter dropped into a drawer." },
              fail: { body: "The pivot becomes somebody else's slogan, and the White House introduces you in public as the rebel of the week." },
              critfail: { body: "In the post-mortem you are first in line: chair assignments, endorsements, dinner seats all revoked, and the machine tells everyone you led it." }
            }
          },
          {
            id: "defend_record",
            text: "Pay out of pocket for ads defending what is left of the government's record",
            note: "Bet that loyalty is the currency of the reshuffle. Risk: in two years this tape is yours.",
            outcomes: {
              crit: { body: "In its ugliest hour the government remembers who paid. A bigger chair lands for you, and the donor list puts your name on line one." },
              ok: { body: "You defended the administration. Upstairs credits you; the neighborhood's anger has nowhere else to go." },
              meh: { body: "The ads ran for two weeks and nobody remembers who bought them." },
              fail: { body: "The wind keeps falling, and your defense is cut into the other side's ad, scored against the losing night." },
              critfail: { body: "Every graceless compromise of the government's last stretch is billed to you, and donors ask to your face whether it was worth it." }
            }
          },
          {
            id: "fund_newcomers",
            text: "Fund a post-defeat forum for new faces and sign them to your ledger",
            note: "Bet the next wave of seats comes from this batch. Risk: money and people both grow legs.",
            outcomes: {
              crit: { body: "The forum becomes the underground headquarters of the party's self-audit, and two newcomers call you mentor out loud. On the roster two years from now, one column is yours." },
              ok: { body: "You bought yourself a lane: the money is spent and your name is on the door." },
              meh: { body: "They came, they thanked you, they went home." },
              fail: { body: "The newcomers call you a man who treated them as assets; the veterans smile at the horse you backed." },
              critfail: { body: "The forum's books get pulled apart in public, the kingmaker becomes the defendant, and the machine displays you as the sample loss." }
            }
          }
        ]
      },

      /* ============================================================
       * 2014-08–10 · the double panic
       * ========================================================== */
      {
        id: "ln14_panic",
        title: "An execution video and the first imported case land in one panic season",
        body: "In mid-August a foreign militia puts a video of our own journalist's execution online, and within forty-eight hours it loops " +
          "on every screen in the country. The first imported case — infected abroad, diagnosed after arrival — reaches a southern hospital in late September; by early October " +
          "the patient is dead and two local nurses have tested positive, and emergency screening, ban petitions and safety bills fill the calendar at once. " +
          "Congress wants a vote before the midterms; everyone has to look tough.\n" +
          "You hold one card: inside this week you owe one sentence about each of two things nobody understands yet. Neither story is settled; both wait on a local figure to speak first, and your emergency room's screening shortfall sits on your desk as a list.\n" +
          "After the ebb, who will look like he used the dead — nobody warns you in advance.",
        choices: [
          {
            id: "run_drill",
            text: "Coordinate hospital drills and a public briefing; guess nothing, shout nothing",
            outcomes: {
              crit: { body: "The drills run on schedule and the briefing room hears it all without finding one mistake in you. The hospital people notice: that week he never grabbed the camera." },
              ok: { body: "You scheduled drills and briefings, said nothing wrong, made no headline." },
              meh: { body: "You did the work; the national cameras pointed elsewhere." },
              fail: { body: "Someone asks in public whether he does not feel he should say something. The quiet becomes the charge." },
              critfail: { body: "Your low profile is cut into a clip of a man who hid, and both panics burn on you at once." }
            }
          },
          {
            id: "back_crackdown",
            text: "Sign the ban petition and sell both events as one threat",
            note: "Bet fear outsells questions. Risk: at the ebb your name shares a poster with the dead.",
            outcomes: {
              crit: { body: "You make the language of security the local consensus; military circles and hawk radio call you a man who gets things done, and the petition passes ten thousand by morning." },
              ok: { body: "You stood on the hard side. The applause comes from outside; the hospital's phones get harder to reach." },
              meh: { body: "You signed; a hundred people signed before you." },
              fail: { body: "Screening experts take your sentences apart on television, and your own medics say in public that you sell panic." },
              critfail: { body: "When the panic recedes, leaflets at every door print your name under the line about buying votes with corpses." }
            }
          },
          {
            id: "push_facts",
            text: "Publish the screening process and the numbers; oppose panic legislation",
            note: "Bet facts outrun fear. Risk: the experts do not thank you and the press finds you dull.",
            outcomes: {
              crit: { body: "You turn the process into a chart every voter can read; the medics stand beside you on camera, and the regulators start quoting your chart." },
              ok: { body: "You talked the panic down a notch. Upstairs resents the cold water; the block remembers the favor." },
              meh: { body: "You offered data. That week nobody wanted data." },
              fail: { body: "A second case is confirmed while your don't-panic line is still warm, and the papers file you under the man who talked big." },
              critfail: { body: "The bill passes anyway and you are cast as the one who spoke for the danger; regulators and establishment both close their doors." }
            }
          },
          {
            id: "fund_beds",
            text: "Pay to equip local emergency rooms with screening gear and isolation beds",
            note: "Spending on work is the sturdiest answer. Risk: the ledger and the camera both come back to ask.",
            outcomes: {
              crit: { body: "The gear arrives in a week, the isolation beds become the district's showcase, and a neighboring state sends staff to copy your plan. Medics shout your name when they see you." },
              ok: { body: "The beds are made and the queue is orderly; the money bought a visible half-job." },
              meh: { body: "The equipment sits in storage; the scare has passed; nobody reads your invoices." },
              fail: { body: "Someone audits the spending: he built his own monument while people were scared. The money buys no thanks." },
              critfail: { body: "A vendor link surfaces in the purchase orders, you become the locust everyone grabs after the panic, and prosecutors return your calls." }
            }
          }
        ]
      },

      /* ============================================================
       * 2015-07 · the nuclear framework
       * ========================================================== */
      {
        id: "ln15_iran",
        title: "The nuclear framework deal is signed; rivals pledge to tear it up",
        body: "In July the great powers and Tehran sign a framework: verification in exchange for phased sanctions relief, " +
          "with technical annexes thicker than a phone book. The opposition leader and several senior colleagues write directly " +
          "to the other side's supreme leader and call a treaty ally of this country evil out loud. Primary season opens, " +
          "and tearing up the deal becomes the standard clause in every speech.\n" +
          "Lobby budgets and donations split into two poles overnight, and both sides are booking your calendar. Every primary debate will ask about the deal; you cannot dodge the question for a year.\n" +
          "Almost nobody has read the annexes, so what is left is mood — some say the letter itself was written for cameras. Which of your sentences gets played back against you two years from now?",
        choices: [
          {
            id: "ask_brief",
            text: "Demand the technical brief and the full annexes; take no position",
            outcomes: {
              crit: { body: "You skip every fight and ask only inspection questions fine enough to matter. Committee staff start mailing you the material first." },
              ok: { body: "You talk clauses, verification, procedure. You offend nobody and make no headline." },
              meh: { body: "Your technical questions drop into a deep well." },
              fail: { body: "Both camps are annoyed you dodged the point: today he dared not speak plain." },
              critfail: { body: "Your procedure-only stance is read by both sides as blocking for the other, and trust falls one notch everywhere." }
            }
          },
          {
            id: "sign_letter",
            text: "Add your name to the letter and promise primary voters you will tear it up",
            note: "Bet your base reads the deal as betrayal. Risk: in a few years this tape is yours.",
            outcomes: {
              crit: { body: "Your signature loops on party radio; tearing it up enters every candidate's script, and primary money flows toward you for the first time." },
              ok: { body: "You stood on the hard line; the grassroots credit you, the old caucuses start routing around you." },
              meh: { body: "The list carries dozens of names; nobody counts yours." },
              fail: { body: "The wind shifts to who actually read the agreement, and your letter gets printed as the counterexample." },
              critfail: { body: "The deal proves to hold clause by clause, and you remain the man who signed his anger; donations and endorsements come back for the refund." }
            }
          },
          {
            id: "back_deal",
            text: "Back the inspection regime in public and distance yourself from your party",
            note: "Bet the establishment and the allies remember who stood up. Risk: the primary machine treats you as soft meat.",
            outcomes: {
              crit: { body: "You are the first at your rank to back the inspections out loud; columns and embassies quote your paragraph, and a door inside the party gets narrower." },
              ok: { body: "You defended the deal; upstairs and the press note it; the grassroots donation line went cold for a week." },
              meh: { body: "You said support; louder names covered the sound." },
              fail: { body: "Your own party's fundraising letter uses you as the sample: he will not speak for us." },
              critfail: { body: "You are written into a primary-cleanup list: local office, dinner seat, outside endorsement, all withdrawn." }
            }
          },
          {
            id: "run_forum",
            text: "Fund your own forum on the inspection clauses and become the one who knows",
            note: "Expertise is slow money; both sides want to use you. Risk: both sides also wish you would not speak.",
            outcomes: {
              crit: { body: "Your handbook becomes the one file local papers can actually quote; inspection delegations and agencies ask you to brief them. You are now the one who read the annexes." },
              ok: { body: "The forum ran, the handbook printed; your name is filed under expert." },
              meh: { body: "The money went out; the audience was already on your side." },
              fail: { body: "Lobbyists on both sides complain at the same dinner: he turned our arguments into his credit." },
              critfail: { body: "Someone pulls your sponsor list and reads it as the other side's classroom; prosecutors return your calls." }
            }
          }
        ]
      },

      /* ============================================================
       * 2016-02 · the vacant seat
       * ========================================================== */
      {
        id: "ln16_seat",
        title: "A senior liberal justice dies in an election year; the seat stays empty",
        body: "In February a liberal justice decades into the bench dies. The White House delivers a moderate nominee inside a week, " +
          "and the name stops outside the Senate judiciary committee door: the majority leader announces that an election year brings " +
          "no hearings, no vote, and the seat belongs to the next president. The chair sits empty for a year, and a generation's " +
          "direction of the court becomes campaign material.\n" +
          "Phones come in from both sides at once, and both want your verdict this week. The local bar association and the churches each have an open letter drafted, waiting for the first name under yours.\n" +
          "Whether the election-year custom — no high-court vote in an election year — holds, nobody guarantees. But this year's ballot decides who fills the chair.",
        choices: [
          {
            id: "stay_quiet",
            text: "Stay out of the chair fight; run your own hearings and caseload",
            outcomes: {
              crit: { body: "The empty seat is argued about for a year; half your own docket got finished. Both sides noticed later: in those months he added no fuel." },
              ok: { body: "You entered no argument that season and left no sentence worth clipping." },
              meh: { body: "There was no line for you in that play, and no blame either." },
              fail: { body: "People ask: the court is in a crisis and he is doing paperwork? The quiet becomes a quote." },
              critfail: { body: "Both camps read your dodge as guilt, and in the fall your opponent's ad opens on your silence." }
            }
          },
          {
            id: "force_hearing",
            text: "Demand a committee hearing and a floor vote on the nominee",
            note: "Bet procedure plays across party lines. Risk: the majority's machine treats you as a nail.",
            outcomes: {
              crit: { body: "You turn the question why-no-vote into the national question; bar associations and two editorial pages cite you, and your own side now both clears the road and guards the gate." },
              ok: { body: "You forced the hearing question onto the table. The audience buys it; one party door closes quietly behind you." },
              meh: { body: "You demanded a vote; twenty people demanded it before you." },
              fail: { body: "Your demand is recut as a maneuver to bypass the voters, and your party's mail keeps playing the clip." },
              critfail: { body: "You are filed as the insubordinate one: when committee chairs are re-ranked, your name moves to the last row." }
            }
          },
          {
            id: "back_freeze",
            text: "Back the election-year rule in public and deliver the hard line to your base",
            note: "Bet your party only needs you not to blink. Risk: history notes who froze a seat.",
            outcomes: {
              crit: { body: "You turn letting the next president decide into a doctrine people can quote; your lines loop on party radio and your face sits under the donate button." },
              ok: { body: "You held the party line; the money came to your account first; swing voters added you to their doubt list." },
              meh: { body: "You repeated a safe sentence; nobody praised it, nobody remembered it." },
              fail: { body: "The long vacancy turns into a scandal of its own, and your photo runs under the headline about the frozen chair." },
              critfail: { body: "After the court changes direction, the stall is re-counted as precedent, and your name appears in every post-mortem." }
            }
          },
          {
            id: "build_issue",
            text: "Make the court's direction your own campaign issue and register new voters",
            note: "Bet the issue outlives the people. Risk: buying an abacus that both sides refuse to use.",
            outcomes: {
              crit: { body: "You narrate an empty chair as one generation's question; registration tables line the block, and two advocacy groups fold your script into their training." },
              ok: { body: "The issue held, new names entered the rolls, and your ledger shows what it cost." },
              meh: { body: "The money went out; the voters stirred; none of the stirring was for you." },
              fail: { body: "Both sides charge you with campaigning on a court, and your ad becomes the common target." },
              critfail: { body: "Your funders turn out to overlap with the stalled nominee's backers; the message seller becomes the story." }
            }
          }
        ]
      }
    ]
  }
});
