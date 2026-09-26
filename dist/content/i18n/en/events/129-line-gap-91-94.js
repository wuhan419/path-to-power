/* ============================================================================
 * CONTENT · i18n/en/events/129-line-gap-91-94.js
 * 中文文件 content/events/129-line-gap-91-94.js 的英文覆盖层（w55 / 1991—1994 补薄）。
 *
 * 契约（同 i18n/en/lines/120-line-1991-94.js）：
 *   · 事件按 id 定位；choices / terms 按 id 对齐。
 *   · 结构性键由引擎保护，本文件一个不写。
 *   · 英文按习语重写：第二人称、现在时、短句；机构名用真实英文。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "ln91_hearings",
        title: "A Supreme Court nominee is accused to his face by a former aide, live on television",
        body: "The Supreme Court nominee sits before the cameras and trades charges with a former aide of his, now a law professor: " +
          "she says he pestered her, again and again; he calls the proceeding a high-tech lynching. The committee sends the " +
          "nomination to the floor, seven to five. Fifty-two to forty-eight: confirmed.\n" +
          "Two voting blocs — women and Black voters — split down the middle in front of you. The churches, unions, and women's " +
          "groups in your state are all waiting for your first sentence. None of them can be unsaid.\n" +
          "Some say two more former aides have testimony ready. Nobody confirms it, and nobody denies it.",
        choices: [
          {
            id: "reopen",
            text: "Demand the hearings reopen and more witnesses be called. Stand with the accuser",
            note: "The bet: women's votes and the churches both keep this ledger. The risk: the caucus files you under unmanageable.",
            outcomes: {
              crit: { body: "Your motion for more witnesses catches on across the state. Women's organizations carry your name down the street. From this day on, people call you the one who listens to testimony." },
              ok: { body: "You speak up for reopening the hearings. The opinion pages quote you; the women's league phones in its thanks." },
              meh: { body: "Your request is stacked with a hundred identical letters at the committee. Neither approved nor denied." },
              fail: { body: "No witness is called. The caucus slots you on its list of unreliable members, and next year's fundraising calls come noticeably less often." },
              critfail: { body: "Your words outside the hearing rooms are cut into a trial-by-media exhibit. Complaint letters fall like snow. Your name is famous now; your standing is a question mark." }
            }
          },
          {
            id: "vouch",
            text: "Vouch for the nominee on camera: process first, rumor convicts no one",
            note: "The bet: swing voters do not swallow live television whole. The risk: the women's bloc closes its door on you on the spot.",
            outcomes: {
              crit: { body: "Your process-first line runs in conservative columns nationwide. The caucus keeps the next doable seat warm for you. Dinner invitations stack up." },
              ok: { body: "You stand on the side of caution. The establishment nods; the columnists cannot be bothered to scold you. That is enough." },
              meh: { body: "Your statement reads like a press release. The establishment does not feel helped; the public feels nothing." },
              fail: { body: "The vote passes and you add that there is nothing left to say. The rallies replay that sentence to you, over and over." },
              critfail: { body: "Somebody leaks the clever line you dropped at a private dinner. Wherever you go now, the tape follows. Donors route around you; reporters start asking for sit-downs to explain yourself." }
            }
          },
          {
            id: "listen",
            text: "Say nothing: go home and host a watch-the-hearing-together discussion",
            note: "The steady move: borrow no wind, block no fire. No big score, no blindside hit.",
            outcomes: {
              crit: { body: "The discussion runs late, and both camps feel heard. The evening paper runs a small photo: one calm room." },
              ok: { body: "You pour coffee, you greet everyone, you state no position. The district remembers you showed up." },
              meh: { body: "A dozen people come. The hearing is on everyone's television, not in your hall." },
              fail: { body: "At the door someone asks in front of everyone: so which side are you on? You say you are on the side of the facts. Somebody laughs." },
              critfail: { body: "You please no one, and both camps' lists now carry you: the one who would not say. It does not hurt. But it sticks." }
            }
          }
        ]
      },
      {
        id: "ln92_election",
        title: "The challenger wins on the economy, and twelve years of one party's White House end in one night",
        body: "The challenger turns it's the economy into a national catchphrase and wins the White House on count night. Twelve years " +
          "of one party holding the presidency, settled in one evening. A third-party candidate scoops nearly a fifth of the " +
          "popular vote and pushes the incumbent out of states decided by one or two points.\n" +
          "The same night, the new president's party takes the Senate and the House together — a one-party sweep this country " +
          "has not seen in forty years. In the new administration's first hundred days, every local appointment list gets reshuffled.\n" +
          "The wave is already rolling. If you are not on the crest, the wave will eat you — and whether tonight's winners list " +
          "carries your name, nobody on the transition team will say.",
        choices: [
          {
            id: "bandwagon",
            text: "Send the first congratulatory wire before dawn; queue with the new majority for local seats",
            note: "The bet: first in line gets the seats. The risk: far more people in line than there are seats.",
            outcomes: {
              crit: { body: "The transition team remembers the first one to congratulate. The state vacancy is not even posted yet, but your name has already crossed the desk." },
              ok: { body: "You squeeze into the front row of the victory photo. The caption omits your name, but you were standing in the right place." },
              meh: { body: "Thousands of wires came in. Yours is filed closest to the window." },
              fail: { body: "The transition crew logs you under eager and too early. Nobody says it out loud; the smiles are just thinner now." },
              critfail: { body: "Your wire gets leaked to a tipster dressed up as somebody else's forward. The joke runs for a week, and your name rides along for a week." }
            }
          },
          {
            id: "rebuild",
            text: "Do not chase the wind: rebuild the local party from the new voting blocs up",
            note: "The bet: the wave can be converted into a voter roll. The risk: the knife of the reshuffle cuts you first.",
            outcomes: {
              crit: { body: "The redistricting becomes real work in your hands. Next year's list of women running for office queues up to borrow your name; you are among the first credited for the year of the woman." },
              ok: { body: "The reorganization finishes. The party rolls gain two thousand names. Everyone is celebrating; nobody notices you did the work." },
              meh: { body: "Half the reshuffle is done. The other half waits for the line-drawing desk to quiet down." },
              fail: { body: "You surrender your own seat in the order of things you are redrawing, in exchange for the good of the whole. The people you carried in still call you the boss." },
              critfail: { body: "The reshuffle blows up. The party paper prints an apology. It names nobody; the whole county knows which line to read." }
            }
          },
          {
            id: "porch",
            text: "Guess no wind direction: keep your schedule, go home and knock on doors",
            note: "Whichever way it blows, it blows across your district first. No queue, no wager.",
            outcomes: {
              crit: { body: "While everyone else surges toward the capital, you stay on the porches and lift turnout two more points. The local editor calls you a constant." },
              ok: { body: "You knock on more doors on election night than anyone. The neighbors remember: you stand on neither side. You stand at the doorstep." },
              meh: { body: "The wave is in the newspapers; you are on the street. Each of you minds your own business." },
              fail: { body: "Everyone is talking about the new president; nobody picks up your agenda. No matter. The doors still got knocked." },
              critfail: { body: "One household answers through the chain lock: even you have changed flags. You say the flag did not change; the weather did. He does not shut the door on you. That is the whole of it." }
            }
          }
        ]
      },
      {
        id: "ln93_brady",
        title: "The federal gun background-check bill is signed. Gun owners call it the end of law enforcement",
        body: "The federal background-check and waiting-period bill is signed in November. Its interim provisions take force next " +
          "spring, and every gun-store counter now carries a form no one can skip. The gun-rights camp calls this day the end " +
          "of law enforcement — tens of thousands marched on the capital with their rifles this past spring, and the permit for " +
          "next spring's lawn rally is already filed.\n" +
          "In your office, the retailers' petition and the sheriffs' joint letter sit in one stack. Both are waiting for your first sentence. The rule is narrow: a licensed dealer must verify a buyer's eligibility before the sale.\n" +
          "Some say the waiting period cannot be enforced and the stores will close row by row. Whether the enforcement money or the blame reaches you first, nobody has ranked it for you.",
        choices: [
          {
            id: "campaign",
            text: "Stand up for the bill: go on local television and name the cases the waiting period stopped",
            note: "The bet: sheriffs and parents owe you more than the stores' donations do. The risk: the lawn crowd memorizes your face.",
            outcomes: {
              crit: { body: "Your list of names the waiting period stopped runs on local television on repeat. The police families' association sends a banner; from this day a notice in the gun-store windows says you are not welcome. Both camps have you on file." },
              ok: { body: "You speak for the waiting period. The polls split down the middle; the sheriffs remember you." },
              meh: { body: "Your public-service spot airs at six in the morning, to nobody. No letters back." },
              fail: { body: "The merchants' association pulls its donations; the hunting club returns your dinner invitations. Your name moves to page one of the opposition list." },
              critfail: { body: "The data you quoted from the podium turns out to be fabricated. The label trading truth for slogans sticks for two election cycles, and reporters have started auditing your old accounts." }
            }
          },
          {
            id: "rally",
            text: "Side with the gun owners: speak at the shooting expo and call the waiting period a bureaucratic insult",
            note: "The bet: rural voters' anger is pure enough to carry you. The risk: the city media keep you as their exhibit A.",
            outcomes: {
              crit: { body: "The expo floor packs so tight you cannot finish a speech. Handshakes and checks queue up past the storefront. The organizers of next spring's rally put your name in their script." },
              ok: { body: "You say the hard words for the gun owners. The store owners pool money for your ad time; the opinion pages run one more column against you." },
              meh: { body: "You speak at the hunting club. Neither the applause nor the booing crosses the line." },
              fail: { body: "A shooting happens during somebody's waiting period, and your bureaucratic-insult line is thrown back at you, quote by quote." },
              critfail: { body: "A camera catches you lifting an illegal firearm at a booth. The anchor chuckles reading the item. Donors start hedging both ways, and the tabloid frames you for its front page." }
            }
          },
          {
            id: "brief",
            text: "Stay off the floor: hand the local stores a Justice Department answer booklet",
            note: "Answer a moral question as a paperwork question. No side taken — only process run.",
            outcomes: {
              crit: { body: "Lawyers on both sides call to say your office explains the rules best. Nobody thanks you; nobody curses you. That is passing." },
              ok: { body: "The booklet arrives; the stores file their forms. You finished one thing." },
              meh: { body: "The booklet still lies face-down on the counter. The owner says politely: leave it there for now." },
              fail: { body: "One store misses business over a botched form and blames your FAQ for not speaking human." },
              critfail: { body: "Both sides complain at once: one calls you soft, the other calls you hard. Stuck in the middle, your name appears on two lists." }
            }
          }
        ]
      },
      {
        id: "ln94_crime",
        title: "The federal crime bill becomes law: 100,000 new officers and a ten-year assault weapons ban",
        body: "The three-hundred-page federal crime bill is signed in September: 100,000 new police over ten years, " +
          "community-policing grants pushed down to the precincts, federal appeals tightened. For the first time an assault " +
          "weapons ban enters federal law — with a ten-year sunset clause attached to its tail.\n" +
          "The homicide curve is still riding high, the midterms are two months out, and tough on crime has become the sharpest " +
          "microphone in the country. Everyone is scrambling to claim the phrase; everyone fears the soft label. Your local " +
          "sheriff is already asking you for a community-policing allotment.\n" +
          "Some say the grant slots were reserved for insiders months ago. A sunset clause expires on schedule — and today's " +
          "label gets stuck back on somebody's face in four years.",
        choices: [
          {
            id: "call",
            text: "Grab the tough-on-crime microphone: hold a town hall and land the new-officer slots",
            note: "The bet: voters believe the siren at night. The risk: when the crime rate turns, you become the man who sold panic.",
            outcomes: {
              crit: { body: "The town hall overflows, and your local hiring budget clears before the capital's does. Endorsement letters from the police union go out to every precinct office. The sign reading he gets things done for the police is yours." },
              ok: { body: "The officer slots land. The precinct's duty roster gains one extra line: thank you." },
              meh: { body: "Your budget request is still on the signing desk in the capital, waiting its turn." },
              fail: { body: "A case of police overreach opens its trial right after your town hall. The cameras cut from your podium straight to the defendant's table." },
              critfail: { body: "You get nailed to a peddler-of-panic sign. Civil-liberties groups slip your town-hall script into the election board's hearing exhibits." }
            }
          },
          {
            id: "quote",
            text: "Speak against the wind: self-fund a booklet on prevention being cheaper than prison",
            note: "The bet: the tide turns in three years. The risk: come November you star in the soft-on-crime ad.",
            outcomes: {
              crit: { body: "Three years on, youth crime falls back, and your little booklet gets pulled out of drawers and read as prophecy. The first one to say prevention — the academies and the pulpits put your name on it together." },
              ok: { body: "Two columns cite the white paper. The party chair calls with regards — and to confirm you are still a member." },
              meh: { body: "The booklets are printed and mailed. The post office returns two of them." },
              fail: { body: "During debate season somebody shoves a microphone in your face: do criminals deserve sympathy? Your expression gets cut into an ad and played on a loop." },
              critfail: { body: "Sympathizing with criminals becomes a titled asset in your name. That year, even your own party's candidates avoid sharing a frame with you." }
            }
          },
          {
            id: "hold",
            text: "Leave the microphone alone: straighten out the precinct's overtime pay and dispatch forms",
            note: "Let whoever wants the microphone have it. When the sheriff cannot staff a shift, you are still the first call.",
            outcomes: {
              crit: { body: "Overtime clears, the rotations turn, and dispatch logs stop stacking on the counter. The sheriff puts your photo on the duty-room wall — and the next day, laughing, swaps it back." },
              ok: { body: "You did the small work behind one big law. No coverage. No shouting in the street." },
              meh: { body: "You are checking forms while the microphone lives in other hands. Each of you busy." },
              fail: { body: "The overtime pay is still stuck by year's end. The union grumbles: he could not even get this done." },
              critfail: { body: "An auditor finds one misfiled voucher and labels it unclear grant priorities. A small wound. An ugly one." }
            }
          }
        ]
      }
    ]
  }
});
