/* English overlay for content/events/149-whitehouse-legislation.js - deep-merge by id, contract: docs/I18N.md */

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      /* ================= legislation family ================= */
      {
        id: "wh_medicine",
        title: "Day eleven outside the police line, and the four votes the Senate still needs",
        body: "The party whip sets the tally board in front of you: four votes short, stuck on one vulnerable freshman. Drug-industry lobbyists wait outside with substitute language for voluntary price cuts. The mother's sit-in photo has looped on television for seven days, and reporters ask at every motorcade entrance whether you will spare her one look. Your chief of staff murmurs a reminder: the forced vote the caucus locked in is seventy-two hours away.",
        brief: {
          lede: "The drug-price bill cleared the House and needs four Senate votes; a dying patient's mother is on day eleven of a sit-in outside your motorcade.",
          known: [
            "Publishing her record sells the bill, but puts one family's pain on display.",
            "Take the industry's voluntary-cut text and the votes come fast; the loopholes grow later.",
            "Skip the bill, issue executive guidance: cheapest politically, closest to doing nothing."
          ]
        },
        choices: [
          {
            id: "push",
            text: "Publish her medical record with her consent and ram the original bill through the Senate on her story",
            outcomes: {
              crit: { body: "Three of the four votes crack under the phone calls flooding the galleries. The bill passes untouched, and the drug-price curve bends downward for the first time. The mother says one line on camera: he finally looked at me." },
              ok: { body: "The Senate passes a conditioned version through clenched teeth. You keep the bill's spine, and the sit-in gets made into a late-night documentary." },
              meh: { body: "The votes barely close and the bill limps over. Public attention has already moved to the next story; nobody mentions the mother anymore." },
              fail: { body: "Publishing the record is denounced as consuming a dying family for parts. The mother turns on you, saying you sold her pain. The original bill dies in the Senate." },
              critfail: { body: "A privacy clause buried in the record detonates a class action; the bill is sealed up along with your credibility. The drug companies' stock closes higher that day." }
            }
          },
          {
            id: "voluntary",
            text: "Accept the industry-drafted voluntary price-cut version and unlock the four votes in the Senate today",
            outcomes: {
              crit: { body: "You nail two hard levers into the substitute text beyond the sunset clauses. The loopholes lock down for now, and the first prices fall within the year." },
              ok: { body: "The voluntary cuts pass and the numbers look good. The audit language leaves a gap, and you know it will reopen inside three years." },
              meh: { body: "The companies sign with a smile. The cuts stay voluntary, and shelf prices barely move. Congress splits the difference; nobody wins." },
              fail: { body: "The version is exposed as written by the industry itself. Pundits read it aloud on air: the fox guarding the henhouse. Your approval leaks with it." },
              critfail: { body: "Eight months later the cut pledges have evaporated across the board, and a hearing nails you and the industry executives side by side in the witness chairs." }
            }
          },
          {
            id: "guidance",
            text: "Leave the bill alone; issue White House executive guidance and push the problem back to the regulators",
            outcomes: {
              crit: { body: "The guidance slips past the congressional deadlock. Regulators actually land two price-cap actions - not dramatic, but the machinery works." },
              ok: { body: "One sheet of paper gives every side a step down. The Senate exhales, prices hold steady, and nobody presses the point." },
              meh: { body: "The guidance reads like broth with nothing in it. The media forgets it in a day; the bill stays stuck where it was." },
              fail: { body: "Both parties accuse you at once of overreach and incompetence: you crossed an executive line without settling the legislative debt." },
              critfail: { body: "A federal judge freezes the guidance, ruling you did Congress's job for it. The mother ends her sit-in saying you gave her nothing at all." }
            }
          }
        ]
      },
      {
        id: "wh_tax",
        title: "A visible win before the election, and a ten-year deficit curve",
        body: "The caucus chair says it flatly: deliver a visible win before the election, or the midterms will scatter their money and their people. The middle-class tax cut in your draft is what the base named by hand, and it is the exact line that drags the deficit curve ten more years down. Treasury passes over a warily worded unofficial score. Two moderate senators announce that cutting this line has their votes. The signing date the caucus locked in is six weeks away.",
        brief: {
          lede: "Your party wants a visible win before the election; your middle-class tax cut stretches the deficit curve ten years.",
          known: [
            "Sign the party's version and the base is glad; the deficit score becomes the opposition's ammunition.",
            "Cut the promise you campaigned on and bipartisan votes come, along with a broken-oath scar.",
            "Order a Treasury review and stall past the election: no enemies, no prizes."
          ]
        },
        choices: [
          {
            id: "party",
            text: "Sign the party's version as written, the middle-class cut included without one word changed",
            outcomes: {
              crit: { body: "Party morale runs high the day you sign. Middle-income voters swing back in the polls, and you hold an actual win instead of a talking point." },
              ok: { body: "The bill passes and the base buys it, only the deficit figure makes the news, and the opposition starts quietly banking ammunition." },
              meh: { body: "The signing ceremony plays big, but voters still worry about their own bills, and the heat is gone in three days." },
              fail: { body: "The Treasury score leaks and the media set it in banner type: this win bills the next generation for ten years." },
              critfail: { body: "A ratings agency downgrades the outlook. In the post-election autopsy, this cut becomes the party's prime scapegoat." }
            }
          },
          {
            id: "cut",
            text: "Drop the provision you promised on the campaign trail and trade it for a bipartisan tax bill",
            outcomes: {
              crit: { body: "The bipartisan bill passes clean. A Senate opponent praises you at the podium for bending for the bigger picture, and the deficit curve is levered back." },
              ok: { body: "Cross-party signatures make the front page and your establishment ties mend. Back home, someone at a rally starts chanting your old promise." },
              meh: { body: "The bill passes, but the clip of you dropping the promise runs in thirty-second loops. The applause from both sides stays reluctant." },
              fail: { body: "Primary voters take it as betrayal. Turnout slides, and the bipartisan votes never hand you many extra seats." },
              critfail: { body: "An old video of a campaign vow withdrawn in public goes viral. Your own party starts discussing why the president broke his word." }
            }
          },
          {
            id: "delay",
            text: "Order a full Treasury assessment first and push the decision past the election",
            outcomes: {
              crit: { body: "The study lands right after the election as promised, handing you a sharper tax bill. Nobody caught a handle on you before the vote." },
              ok: { body: "The paper goes down into the pile. For now nobody finds a place to strike you, but nobody remembers speaking for you either." },
              meh: { body: "Wait for the study becomes your label for the half-year. The media cannot be bothered to cover it; party regulars grumble off the record." },
              fail: { body: "The opposition reads the delay as refusing to own anything. Through the election year, your silence gets filled with their lines." },
              critfail: { body: "The study leaks with findings hostile to the cut. You neither signed it nor stripped it; all that remains is the mark of having done nothing." }
            }
          }
        ]
      },
      {
        id: "wh_water",
        title: "Year four of the drought, and two governors sue a third state",
        body: "The hydrology map of the Colorado River basin lies spread across your desk: a fourth drought year. Two upstream states grip the old compacts and will not loosen them, and a downstream state's water rights are already in a Supreme Court suit filed jointly by two governors. Farm power subsidy requests and a federal quota draft arrive in the same hour. Midwest farm lobbyists and West Coast environmental groups face off in one corridor. The governors' lawyers have said it out loud: any executive order favoring the other side gets sued the same day.",
        brief: {
          lede: "Fourth drought year in the West; the Colorado basin must re-divide its water, and two governors are suing a third state.",
          known: [
            "A federal quota settles it fast and offends the voters of two states at once.",
            "Subsidize farm power without touching water rights: relief today, the same shortage after.",
            "Leave it to the courts: the most neutral look, with judges and weather deciding flood and drought."
          ]
        },
        choices: [
          {
            id: "quota",
            text: "Use federal authority to impose binding water quotas and give all three states a deadline",
            outcomes: {
              crit: { body: "The quotas hold the basin together through the worst stretch of the dry season. All three states are forced back to the table, and you are the only one in Washington willing to slam a desk." },
              ok: { body: "The quotas get enforced. Upstream calls it federal overreach; downstream draws its water on schedule for the first time in memory. Each party curses about half of it." },
              meh: { body: "The paper quotas come down, and enforcement is left to the states. Quiet over-pumping starts in year one, and nobody really polices it." },
              fail: { body: "The two governors make the forced quota a live constitutional target, and Midwest voters file you under unreliable." },
              critfail: { body: "A federal court freezes the quota order entire. You divided no water, saved no power, and handed the opposition a template for the next lawsuit." }
            }
          },
          {
            id: "power",
            text: "Subsidize agricultural electricity only and route around the dead knot of water rights",
            outcomes: {
              crit: { body: "The subsidy lets farmers invest in their own water-saving equipment. Use efficiency climbs quietly, and the pressure never bursts." },
              ok: { body: "The power gets subsidized and the bills ease a little, but the red line on the hydrology map has not backed off." },
              meh: { body: "The subsidy folds into the routine budget. Nobody mistakes it for an answer to the water fight, and nobody objects either." },
              fail: { body: "Environmental groups point at you and the farmers together: taxpayer money rewarding the worst water users. The lawsuits proceed anyway." },
              critfail: { body: "The drought breaks records, and the subsidy turns out to have encouraged heavier use. That saving becomes the broadcast cautionary tale of the year." }
            }
          },
          {
            id: "court",
            text: "Leave the water-dividing case to the courts and keep the White House publicly neutral",
            outcomes: {
              crit: { body: "The Supreme Court eventually draws a line all sides can barely accept, and you never had to make an enemy of a single state." },
              ok: { body: "The case crawls down the court calendar. One phrase from the White House, respect for the judiciary, deflects every follow-up question." },
              meh: { body: "Neutrality starts to sound like doing nothing. The drought continues, the river keeps thinning. Nobody thanks you; nobody even names you." },
              fail: { body: "The ruling takes two years. A downstream city loses its emergency water supply during the wait, and the accountability chase finally reaches you." },
              critfail: { body: "The court ultimately refuses to act and returns the mess to the White House untouched, by which point you hold no leverage left to make any state yield." }
            }
          }
        ]
      },
      {
        id: "wh_vote",
        title: "A last term, and the rule that stops at sixty votes",
        body: "This is your second term, and the last stretch when voters can still talk to you with a ballot. The voting rights and redistricting bill is trapped in the Senate filibuster, the sixty-vote threshold a gate nobody can lift. The party's young members have started counting who comes next. A senior senator warns you: changing this rule either ruins the institution's dignity or loses you the next election and the Senate with it. You are not running again. All you can still burn is the capital left in your hands, and what you choose to leave behind.",
        brief: {
          lede: "Second term: the voting rights bill is stuck in the Senate filibuster, and rewriting the rule risks the chamber or the next election.",
          known: [
            "Demand the filibuster's end publicly: the doors force open, and history keeps your wrecking name.",
            "Lean privately on two retiring senators to abstain: it works quietly, if no one tapes the talks.",
            "Hand it to the Justice Department to litigate: you exit clean, and the bill drifts past your term."
          ]
        },
        choices: [
          {
            id: "abrogate",
            text: "Name the filibuster publicly and demand its end, as the closing campaign of your second term",
            outcomes: {
              crit: { body: "Public opinion backs the chamber into a corner. The bill gets an exception vote, opens the doors and passes. History files you as the president who dared break a rule for voting rights." },
              ok: { body: "The filibuster is rewritten in a narrow slice and the bill squeezes through. Half the Senate counts you, from that day on, as the one who broke the rules." },
              meh: { body: "Your demand overturns a few days of desks. The rule itself does not move a hair; the bill stays under the sixty-vote gate." },
              fail: { body: "The abolition crusade enrages the old guard of both parties. The Senate answers by freezing the progress of every one of your nominations." },
              critfail: { body: "You become the one who played the Senate rules broken. In the next election your party loses the majority, and the talk of reckoning starts inside your own caucus first." }
            }
          },
          {
            id: "whisper",
            text: "Privately ask two near-retirement senators to abstain on the key procedural votes",
            outcomes: {
              crit: { body: "The two old men let go quietly. The filibuster deflates on its own, the bill passes without a sound, and nobody ever knows what you did." },
              ok: { body: "The abstentions buy the passage. You now owe two favors, and the Senate's dignity stays intact on the surface." },
              meh: { body: "One senator agrees; the other flips at the last hour. The bill misses by a single vote, and your phone diplomacy bought nothing." },
              fail: { body: "The conversations leak. The media run the headline on White House rooms where abstentions were bought, and both parties charge you with engineering the count." },
              critfail: { body: "A recording surfaces. You are painted as a lame-duck president who will do anything; the bill drowns, and the dignity of your two terms is paid in with it." }
            }
          },
          {
            id: "doj",
            text: "Refer the voting rights fight to the Justice Department and let it be won in court",
            outcomes: {
              crit: { body: "The Justice Department wins interim relief in several key counties, the redrawn maps get torn up and restarted, and you never had to hit the Senate head-on." },
              ok: { body: "The case enters the courts. You passed the hot object out of your hands, and the price is that all progress now keeps judicial time." },
              meh: { body: "The litigation runs long and quiet. The bill still lies on the Senate floor, everything is back where it started, except you are finally rid of it." },
              fail: { body: "The opposition mocks you for dressing up a legislative failure as a referral to the courts. Voters wanted a passed law, not a filed complaint." },
              critfail: { body: "The courts refuse the core political question and kick it back to a Congress you can no longer move. Your swan song reduces to one line: the lawyers have it now." }
            }
          }
        ]
      }
    ]
  }
});
