/* ============================================================================
 * CONTENT - i18n/en/events/150-whitehouse-fp.js
 * English overlay for content/events/150-whitehouse-fp.js: foreign family
 * (wh_strait / wh_hostage / wh_treaty / wh_appease) plus personnel family
 * (wh_justice / wh_chief / wh_veep / wh_shadow). Contract in docs/I18N.md.
 *   - Source file untouched; this file carries only overwritable leaves.
 *   - Protected/structural keys (grade, category, weight, tierMin, base, mods,
 *     cost, req, effects, flags, wh, whFamily, dyn, unique, valence, ...) omitted.
 *   - No placeholders in this file. Titles in AP sentence case.
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      /* ================= Foreign family ================= */
      {
        id: "wh_strait",
        title: "A mined strait, and a fleet with two ships in port",
        body: "The blockade began last night: two patrol lines, a communique warning that unauthorized ships proceed at their own risk, and forty tankers stalled on both sides of the water. Three allied ambassadors wait at the State Department for one sentence from you. The chief of naval operations keeps it short: two ships can sail; the rest are in dry dock. A third file comes from the energy agency. Crude is up forty percent in seven days, and the lines at the pumps already reach the corner. And across the strait, a release from the reserve that steadies your pumps will read as permission.",
        choices: [
          {
            id: "escort",
            text: "Announce escorts: send the two seaworthy ships to the strait's mouth, and say on camera that this is an international waterway",
            outcomes: {
              crit: { body: "The two-ship formation lines up at the strait's mouth, and the other side's fleet withdraws on its own the next day. You only had to say that one sentence, and oil gives back thirty percent." },
              ok: { body: "No shots fired; the tankers pass one by one alongside your warships. The allies say this is the answer they wanted." },
              meh: { body: "The formation holds one lane and shows your hand: the whole world now knows you have two ships." },
              fail: { body: "A destroyer grazes a hidden reef at the strait's mouth, and that photo reaches your press before your speech does." },
              critfail: { body: "After one accidental exchange of fire, the other side declares the strait open only to its own ships, and you cannot field a second formation." }
            }
          },
          {
            id: "coalition",
            text: "Do not fire: hand the matter to the allies as a group - one joint communique and a joint minesweeping force",
            outcomes: {
              crit: { body: "One meeting produces thirteen signatures and a joint minesweeping fleet. The one blamed for the mining is not you, and not your navy." },
              ok: { body: "The communique is three days late, but it carries thirteen signatures. You do not have to own that sentence alone." },
              meh: { body: "The minesweepers start in their second week, and the smaller allies begin to wonder what White House words weigh." },
              fail: { body: "Two ambassadors speak separately after the meeting, and the joint communique becomes a sheet of paper." },
              critfail: { body: "Thirteen fall back into four camps, and the statement left standing never mentions the strait. The story at home: the president handed the decision to someone else." }
            }
          },
          {
            id: "reserve",
            text: "Mind the pump first: tap the strategic reserve to steady prices, and save the strait speech for next week",
            outcomes: {
              crit: { body: "The release breaks the lines at the pumps within two days. You turn the promise of no price spike into something people can see." },
              ok: { body: "Prices give back a fifth, and for a while people stop thinking about the strait." },
              meh: { body: "The gauges hold, and the editorial pages start asking: so you said nothing about the mining." },
              fail: { body: "The other side wires its capitals that the White House thought about oil prices first, and reads it aloud to the world." },
              critfail: { body: "A third of the reserve goes out, and prices fall for a single day. On day twenty-three of the blockade, factories begin rationing fuel." }
            }
          }
        ]
      },
      {
        id: "wh_hostage",
        title: "Day forty-four: eight helicopters in the desert and a transfer nobody may name",
        body: "Forty-four days ago armed men stormed the embassy, and its eleven diplomats are still alive; each morning the captors mail a recording, the only proof you have. The Joint Chiefs put a rescue plan on your desk: eight helicopters, an eight-hundred-kilometer desert crossing, one chance - no one promises the return trip carries everyone back. In the same drawer lies a second file, the receipt for a transfer moving through a secret channel, and the papers are asking whether the White House has paid. Telling the transfer story yourself also tells the world you paid.",
        choices: [
          {
            id: "rescue",
            text: "Fly in: eight helicopters, one night of desert, and you wait yourself for the first contact report",
            outcomes: {
              crit: { body: "Eight hundred kilometers in six hours; eleven people eat breakfast on their own soil, none missing. Your voice is steady when you read the names." },
              ok: { body: "Nine come out; two stay in the desert. The whole country hears those two names read aloud." },
              meh: { body: "The rescue finds an empty compound. The hostages are still inside, and you have no second plan." },
              fail: { body: "A helicopter is forced down at the second checkpoint; the live feed holds for nineteen minutes, then goes dark." },
              critfail: { body: "One hostage dies in the exchange of fire, and the negotiating channel breaks at the same moment. After that, a new name is read aloud every week." }
            }
          },
          {
            id: "reveal",
            text: "Tell the transfer story yourself: open the secret channel and pull away the other side's reason to demand",
            outcomes: {
              crit: { body: "You hand over the ledger whole and say one line: the money never arrived. That same day, the story at home stops being payment." },
              ok: { body: "In your own telling the transfer becomes a foiled attempt at extortion, and the demand loses half its weight." },
              meh: { body: "The press cares more about who reached for the money first. The hostages are still past day forty-four." },
              fail: { body: "After the disclosure the other side withdraws its negotiators. You spoke freely, and you cut the only line you had." },
              critfail: { body: "The receipt proves the money did move once. In avoiding the word payment, you have confirmed it." }
            }
          },
          {
            id: "talks",
            text: "Do neither: keep the channel talking, buy two more weeks, and say nothing in public",
            outcomes: {
              crit: { body: "On day thirteen three hostages are released as a gesture of goodwill. The papers call it progress, and progress is enough." },
              ok: { body: "The people are alive and the line holds. At home they count the days, but there is no bad news to count." },
              meh: { body: "Two weeks pass and no one comes out. On day forty-nine a photograph climbs onto the front page by itself." },
              fail: { body: "A third country sells the secret channel to a wire service, and they hold the story waiting for you to speak first." },
              critfail: { body: "On day eighty-one a live broadcast reads one name aloud. After that, every time you open your mouth, people first remember the silent weeks." }
            }
          }
        ]
      },
      {
        id: "wh_treaty",
        title: "Three days before expiry, and a verification clause drafted by the other side",
        body: "The treaty lapses in seventy-two hours, and one verification phrase is still unsigned; the version they sent back contains half a sentence we never wrote. State says sign it. Two senior senators say that clause means closing your eyes. The chairman of the Joint Chiefs wants to testify first and say plainly that we are not naive - only, once that testimony is given, it ties the hand that signs. Inside your three hours, two drafts arrive at once, both with a line left for your signature.",
        choices: [
          {
            id: "accept",
            text: "Accept the phrase: keep the treaty alive and leave the rest for the next term",
            outcomes: {
              crit: { body: "You sign, and at the podium you recast the clause as doors they will now open themselves. Nobody argues the text the next day." },
              ok: { body: "The treaty gets five more years. The inspection teams miss two bases, but the list stays in your hand." },
              meh: { body: "No protest the day you sign. Nine months later, the first missed site is discovered." },
              fail: { body: "The opposition turns the five words drafted by the other side into an ad, and your explanation cannot catch it." },
              critfail: { body: "Two years on, the missed site proves to be a new facility. At the hearing they hand you that page and ask you to read it aloud." }
            }
          },
          {
            id: "rewrite",
            text: "Do not accept: change that sentence back to our wording, word by word, inside three days",
            outcomes: {
              crit: { body: "In seventy-two hours you do bend the wording back, and the other side signs rather than carry the blame for the lapse." },
              ok: { body: "Only two words change, and those two are ours. The treaty extends three years." },
              meh: { body: "Talks stop in the final hour; both sides agree to a technical extension of three months." },
              fail: { body: "The deadline passes and the treaty lapses. Both capitals issue statements in the same hour, each blaming the other." },
              critfail: { body: "Ninety days after the lapse, the other side publicly tests the very models the treaty used to limit. Your generals report new numbers every week." }
            }
          },
          {
            id: "testify",
            text: "Neither sign nor rewrite: send the chairman of the Joint Chiefs to testify first, and drag the deadline into a hearing",
            outcomes: {
              crit: { body: "The hearing absorbs three months of grilling for you, and people say the White House is at least not naive. The treaty limps on six more months through the argument." },
              ok: { body: "The testimony is professional and restrained, and the treaty hangs on through the back-and-forth to the last slot on the calendar." },
              meh: { body: "The general says hard things on the Hill, and the next day the phone from the negotiating table does not ring." },
              fail: { body: "The other side quotes your testimony whole as the White House admitting verification is useless, and nobody touches the clause after that." },
              critfail: { body: "The hearing runs six hours and slips out the names of two inspected facilities. The treaty is gone, and the security leaked too." }
            }
          }
        ]
      },
      {
        id: "wh_appease",
        title: "The city you ordered bombed, and the blank word in your speech",
        body: "Now it is a square, a school, and a stone carved with more than three thousand names. A second term has no next election; all you have left is your name. Your host asks for three minutes of remarks. The two senators traveling with you insist the word must not appear in the script - say it, and the veterans' groups at home print traitor on their banners the same day. And the children in the square have already rehearsed one question: Mr. President, did you come to apologize?",
        choices: [
          {
            id: "word",
            text: "Say it: fill the blank in the script and read the word yourself, handing no blame to any predecessor or general",
            outcomes: {
              crit: { body: "You keep it short and share the responsibility with no one. That night the clip travels in two languages, and lines form before the stone." },
              ok: { body: "Both audiences catch the sentence at once: home curses, and here they remember." },
              meh: { body: "The word comes out softly and the microphone misses part of it; half the room thinks you said something else." },
              fail: { body: "The two senators cancel the traveling dinner on the spot, and the photo of the empty chair leads the front pages at home." },
              critfail: { body: "The sentence is cut to twelve seconds and printed on your opponent's ad: the president apologizes to the enemy. Your memoir strikes its tone before you write a page." }
            }
          },
          {
            id: "fund",
            text: "Skip the word: announce a three-year rebuilding account and the first work crew for a hospital",
            outcomes: {
              crit: { body: "Only money, schedules, and the school. At the end the mayor says one line: this is more real than a speech." },
              ok: { body: "The fund lands, and the news cycle follows the budget for a week." },
              meh: { body: "The money is real. But people came to hear one sentence, and they leave without it." },
              fail: { body: "The reporter holds the microphone out again: so is this money meant to stand in for the word?" },
              critfail: { body: "Back home the appropriation stalls in Congress for two years. The paper there prints the money the White House promised beside the photo of the stone." }
            }
          },
          {
            id: "stone",
            text: "Say nothing and give nothing: stand before the stone for four minutes, without a word",
            outcomes: {
              crit: { body: "You stand before the stone for four minutes and say nothing. The photograph later enters the schoolbooks of both countries." },
              ok: { body: "Both sides read the silence as respect, and that is enough." },
              meh: { body: "The photograph is solemn. The next day a column asks: so what exactly did the president mean?" },
              fail: { body: "A relative steps out of the line and presses a list of names into your hand, and every camera looks up at that moment." },
              critfail: { body: "Someone has carved no apology here into the base of the stone, and the photo goes around the world. The second term is remembered for one thing: in those four minutes you said nothing." }
            }
          }
        ]
      },
      /* ================= Personnel family ================= */
      {
        id: "wh_justice",
        title: "Thirty days, two lists, and one empty seat",
        body: "A justice announces his retirement in October, and the Senate says you get thirty days for the whole process. The party's base names the candidate it wants on the conference call: someone who can stand on the two issues. Your two largest donors deliver the same three-name list on the same day, with four pages of reasons. The Justice Department's own list has seniority and no position. Name the base's pick and the donors pull their hands back this quarter; name the donors' pick and someone reminds you whose person he is at every step after. For every point your approval slips, both sides talk a little louder.",
        choices: [
          {
            id: "party",
            text: "Nominate the base's pick: let this seat say one sentence they want to hear",
            outcomes: {
              crit: { body: "He gives up nothing at the committee, and in the end two of your own party vote yes. For once the base feels the White House can hear them." },
              ok: { body: "Confirmation passes. The donors do not pull their money; they only give half of it next quarter." },
              meh: { body: "The hearing runs six months, the seat stays empty, and both sides say at once that the White House cannot execute." },
              fail: { body: "He gets the year of an old ruling wrong, and overnight the opposition cuts a thirty-second spot and runs it for two weeks." },
              critfail: { body: "The nomination is withdrawn, and the vacancy lasts past the midterms. The paper writes: the White House cannot keep even the list it wrote itself." }
            }
          },
          {
            id: "donor",
            text: "Nominate the steadiest name on that list of four: let the process run through in two days",
            outcomes: {
              crit: { body: "The name on the list is young beyond reproach, and both parties praise your restraint. The seat has its justice that same day." },
              ok: { body: "Nine days from hearing to vote, and not one contentious sentence." },
              meh: { body: "It passes. Three months later the ruling comes down, and on your conference call someone asks: whose pick was this?" },
              fail: { body: "The base puts you owe Wall Street a seat into a local party fundraising letter, mailed to every household." },
              critfail: { body: "His first case after taking his seat strikes down your signature policy, and everyone remembers who put him there." }
            }
          },
          {
            id: "merit",
            text: "Use neither list: let the Justice Department draft on seniority and send it forward unchanged",
            outcomes: {
              crit: { body: "Their list names a judge neither party can dent. You send the file up without changing a word, and the process goes so decently nobody has anything to say." },
              ok: { body: "It confirms slowly but surely. Nobody treats it as a White House win, and nobody as a loss." },
              meh: { body: "Both sides reserve judgment: the White House handed the decision to the technocrats." },
              fail: { body: "The judge is challenged on his record by his own side, and the hearing slides all the way toward the next election." },
              critfail: { body: "After the list leaks, both parties team up on the theme of a White House that does not decide. The empty seat and that reputation last into your final year." }
            }
          }
        ]
      },
      {
        id: "wh_chief",
        title: "One list, two sets of three crossed-out names",
        body: "The personnel sheet covers seven posts. The chief of staff crosses off three, with reasons scribbled fast on the back. That evening the first lady's assistant brings a note: three people she believes should go, and two of them are the very two the chief of staff just saved. Both of those staffers have appeared at your kitchen table in the past eight months. This time, only one person signs the list. And if you send the whole thing back to be redrawn, you pay nothing today and double next month.",
        choices: [
          {
            id: "chief",
            text: "Sign the chief of staff's version, and hand the note back in person with your reasons",
            outcomes: {
              crit: { body: "You sign, and you explain. Nobody speaks at dinner that night, and the next day the West Wing is quiet, as if repaired." },
              ok: { body: "The list passes, and the office keeps a single voice." },
              meh: { body: "It is done. For the next three months the two avoid the same room, and the press can smell it." },
              fail: { body: "Each of the three names on the note tells one line to a friend: the White House is no longer one family." },
              critfail: { body: "The first lady leaves one line in the remarks for her own program: some decisions nobody asks me about. Every press conference after that asks the same thing." }
            }
          },
          {
            id: "house",
            text: "Adopt the three names on the note: family business gets settled on the list first",
            outcomes: {
              crit: { body: "Those three were the right cuts. The West Wing's efficiency changes that same day, and nobody dares test a second direction with the list." },
              ok: { body: "The list changes two names to match the note. The chief of staff does not resign that day; they simply stop writing reasons on the back." },
              meh: { body: "It is handled. After that every document gains one extra carbon copy, and the recipient lives upstairs." },
              fail: { body: "The chief of staff puts a resignation on your desk with a single line on it, and a photographer catches the desk." },
              critfail: { body: "Two former aides tell a morning program how your household picks its sides. Your last two years get written up as a domestic drama." }
            }
          },
          {
            id: "return",
            text: "Move no one among the seven: send the whole list back to be redrawn",
            outcomes: {
              crit: { body: "Two days later a new list arrives in which nobody crossed anybody out, and the matter passes." },
              ok: { body: "The vacancies hang there; nobody loses, and nobody owes you." },
              meh: { body: "Three weeks later it is still being redrawn. One of the people left hanging finds a reporter on their own." },
              fail: { body: "Two papers each report the existence of two lists, and the question shifts from who leaves to who runs the place." },
              critfail: { body: "Seven posts sit vacant for eighty days, and two agency directors ask at a hearing plainly: whose orders are we to take?" }
            }
          }
        ]
      },
      {
        id: "wh_veep",
        title: "He carried a primary loss for you. Now he wants thirty seconds",
        body: "In the primary year you sent him into two states to carry the blame for the budget bill, and his name hung in the local papers beside those numbers for six weeks. Now he says: I will campaign for you, twenty rallies, not one skipped. All I want is thirty seconds, not about your policy, about the one thing that is mine. The chief of staff says those thirty seconds become a weekly headline, and you are slipping in three Midwest states. Give them fully and every rally gets clipped and commented on separately; run it without him costs the most, because the president's calendar yields only ten stops a year.",
        choices: [
          {
            id: "free",
            text: "Give him the thirty seconds, not a word changed, and no one feeding him notes from the wings",
            outcomes: {
              crit: { body: "His thirty seconds are about his son in the Navy. The room goes quiet, and the next day two local ball clubs play the clip." },
              ok: { body: "He speaks plainly, and no one takes the thread from him. The rallies deliver, not one skipped." },
              meh: { body: "One line in the thirty seconds reads as a dig at your budget, and each side cuts its own version." },
              fail: { body: "At the seventh rally he departs from the plan and returns to the primary: they made me carry a bill that was not mine." },
              critfail: { body: "He does not show for the last three rallies. The papers print the twenty dates beside the thirty seconds on the day before the vote." }
            }
          },
          {
            id: "script",
            text: "Send him out, but vet the thirty seconds word by word, with your speechwriter holding the final draft",
            outcomes: {
              crit: { body: "The remarks pass your word-by-word review and he changes nothing; twenty clean rallies, and the margin holds in three states." },
              ok: { body: "Twenty rallies delivered exactly as written, with not one extra sentence." },
              meh: { body: "He reads it flat. After every stop a reporter asks what the vice president himself thinks." },
              fail: { body: "In one live appearance he flubs two place names, and the next day the phrase out of touch starts pointing at you." },
              critfail: { body: "An annotated copy of the remarks reaches a paper, under a headline of one line: even these thirty seconds were written by someone else." }
            }
          },
          {
            id: "solo",
            text: "Skip him: trade the twenty rallies for your own tour, one city every two days",
            outcomes: {
              crit: { body: "You speak at all twenty rallies yourself, and the Midwest margin narrows. The vice president appears at the last one to close for you, and the applause counts for him too." },
              ok: { body: "You finish the tour, lose your voice, and hold the votes." },
              meh: { body: "You reach eleven rallies; the other nine become filmed remarks." },
              fail: { body: "One state party chair tells an interviewer: we invited two, and the White House sent one." },
              critfail: { body: "Your twenty rallies end up as one televised address, and three states fall on the same day. Since then, whenever the party hears going it alone, it sounds like a president who will not share the microphone." }
            }
          }
        ]
      },
      {
        id: "wh_shadow",
        title: "Eleven resignations, each with the date left blank",
        body: "Eleven resignations printed in one format, the signatures all real, the dates blank. They say this is no putsch, only that a new term deserves a new team. Your bill has one procedural step left to walk, and a second term has no next election; these people know that the one they face next is your successor. The chief of staff asks from the doorway: how many do we answer this morning? Just know that through the three days of any deferred answer, the papers will pick that person for you.",
        choices: [
          {
            id: "reject",
            text: "Return all eleven unchanged, not a word altered, and let each one hold their own press conference today",
            outcomes: {
              crit: { body: "You send the letters back untouched and put every member in front of their own cameras the same day. The gesture dissolves." },
              ok: { body: "All eleven refused; the meetings resume the next day. Only now every memo keeps one extra layer of drafts." },
              meh: { body: "Refused, but two cabinet members fall ill and miss one key floor vote." },
              fail: { body: "One secretary says at a hearing: we offered our resignations so the president could see clearly." },
              critfail: { body: "Two weeks after the refusals, the most senior member goes on television and names three things from your term you do not want discussed again. Your cabinet starts to leak one door at a time." }
            }
          },
          {
            id: "purge",
            text: "Move on one person first: accept the most useful resignation on the spot",
            outcomes: {
              crit: { body: "The one you replace is exactly the one everyone had long wanted gone. The other ten receive a two-line memo, and from then on it is always two lines." },
              ok: { body: "Three go, the posts fill within two weeks, and the West Wing points in one direction again." },
              meh: { body: "The one who leaves stays polite in the farewell interview, and goes home to start a book." },
              fail: { body: "Both replacements thank their friends in the Senate on television, and thank you neither." },
              critfail: { body: "The purge becomes the second term's label: before every vote someone asks who has not resigned today. Your last two years run efficiently only on personnel." }
            }
          },
          {
            id: "later",
            text: "Answer none of them: say you will talk after the budget is signed, and lock the letters in a drawer",
            outcomes: {
              crit: { body: "For three weeks no report turns this into a story. The drawer stays quiet, and the budget gets signed." },
              ok: { body: "The resignations stay locked up, business goes on, and nobody is backed into a corner." },
              meh: { body: "On day five someone confirms to the press that the dates are blank, and that one line is the day's headline." },
              fail: { body: "Three weeks pass with no answer, and two cabinet members begin discussing their after-life plans with outsiders, separately." },
              critfail: { body: "A paper obtains copies of all eleven letters, every date line empty. The headline asks one question: is the president the last one to know?" }
            }
          }
        ]
      }
    ]
  }
});
