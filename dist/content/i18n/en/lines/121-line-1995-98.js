/* ============================================================================
 * CONTENT · i18n/en/lines/121-line-1995-98.js
 * 英文覆盖层 · content/events/121-line-1995-98.js（1995—1998 定点大事 8 张）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的文案字段。
 *   · 事件按 id 定位；choices / terms 按 id 对齐。
 *   · 结构性键（id 之外的 era / minYear / tierMin / weight / base / mods /
 *     effects / flags / req / cost …）由引擎保护，写了会报 validate 错。
 *   · 英文按英语重写，不逐字翻：第二人称、现在时、短句；「」改英文引号；
 *     机构名用真实英文（CNN, Wall Street Journal, Drudge Report）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "ln95_okc",
        title: "A truck bomb tears the federal building — and half the block — apart",
        body: "9:02 a.m. A rental truck detonates outside a federal building. Half a city block collapses into a chalk-white crater.\n" +
          "By noon, school-bus seats that should be full sit empty on live TV. Within the hour, investigators name a suspect: an angry Gulf War vet who hated his own government. You are local, and the microphones are already in your face.\n" +
          "Your town has families who resent federal law enforcement anyway — and some say a local militia group knew the suspect. Which side of tonight you will be remembered for: that runs for years.",
        choices: [
          {
            id: "harden",
            text: "Condemn terrorism loudly, back a full federal crackdown on militias",
            note: "Betting on a united country. Risk: when a raid goes too far, the fire lands on the people who cheered it — you.",
            outcomes: {
              crit: { body: "Your hard line becomes the town's banner against terror. Law enforcement and the party establishment both remember the name, and the donation calls do not stop." },
              ok: { body: "You ride the national mood at full volume. Agents take note. That is about all." },
              meh: { body: "Everyone was tough that week. Yours was one more voice." },
              fail: { body: "An abusive raid makes national news — and you are on record praising exactly that approach." },
              critfail: { body: "The wrongful-arrest list lands in front of you, with your quotes laminated on top. The headline writes itself." }
            }
          },
          {
            id: "mindgap",
            text: "Warn against turning on every gun-owning neighbor who ever muttered about Washington",
            note: "Betting the mood swings back toward restraint. Risk: one new conspiracy theory and you are the man who defended the bomber's crowd.",
            outcomes: {
              crit: { body: "You said 'do not burn our own' while everyone else yelled burn. Weeks later, when the tide turns, opinion pages list you among the early clearheads." },
              ok: { body: "You checked the overreach without excusing anything. Gun owners do not write you off; editors find you measured." },
              meh: { body: "Nobody wants a fire hose while the house is still burning. Your cooling words go nowhere." },
              fail: { body: "Day three, local paper: 'He speaks for the extremists.' That is the whole story." },
              critfail: { body: "Then it surfaces that the suspect once appeared on a list from a rally you attended. You cannot explain it away." }
            }
          },
          {
            id: "vigil",
            text: "Skip the cameras; just stand in the local candlelight with the survivors",
            note: "Betting on grief without theater. Risk: saying nothing reads as not caring enough — to both sides.",
            outcomes: {
              crit: { body: "The photo runs on two front pages: you, arm around a bereaved parent, saying nothing at all. That, people agree afterward, is what decency looked like." },
              ok: { body: "Two hours in the candlelight. Nobody can fault you; nobody writes about you either." },
              meh: { body: "You came, lit a candle, left." },
              fail: { body: "Someone mutters that you showed your face for ten minutes at the memorial and slipped out." },
              critfail: { body: "The next day's mass memorial goes on without you — and a photographer makes sure everyone knows it." }
            }
          }
        ]
      },
      {
        id: "ln95_verdict",
        title: "The verdict of the century: acquitted, and the country splits into two angers",
        body: "After most of a year on live television, the football star is acquitted of murdering his ex-wife. In one second the screen splits the nation: one half sees justice fail, the other sees two standards of law.\n" +
          "Your town has both halves, on opposite sides of the tracks. The daily wants your column by tomorrow morning: how does an elected person read this verdict?\n" +
          "A civil trial still waits in the wings; this will not fade for months. And the issue you pick tonight may end up picking you.",
        choices: [
          {
            id: "bridge",
            text: "Refuse the verdict question; talk only about repair — law and racial trust",
            note: "Betting the exhausted middle wants soothing. Risk: both camps file you as a slick dodger; heat fades, memory follows.",
            outcomes: {
              crit: { body: "At the church and at the chamber of commerce you give two near-opposite speeches, both sincere. The column calls you the one still trying to sew the country back together." },
              ok: { body: "Temperatures drop a degree on both sides. Neither calls you one of them — but neither calls you the enemy." },
              meh: { body: "Your words are gentle and hollow, straight off an editorial template." },
              fail: { body: "On the same day, two communities announce the same verdict about you: disappointment. From opposite directions." },
              critfail: { body: "A recording leaks showing how differently you weighted your promises to each side. The two-faced cap is sewn by nightfall." }
            }
          },
          {
            id: "laworder",
            text: "Ride the suburban anger: out-of-control courts, jury reform, now",
            note: "Betting 'law and order' delivers votes. Risk: the city and the churches remember exactly which side you stepped on.",
            outcomes: {
              crit: { body: "The state adopts your reform push. The machine and the business clubs both mark you down as a usable name from this wave." },
              ok: { body: "You gave the suburbs their voice first — and gave the city its grievance at the same time." },
              meh: { body: "This issue will not catch fire locally. Nothing burns, nothing grows." },
              fail: { body: "The bill dies in the legislature, and each side hands you a different nickname: meddler, or showboat." },
              critfail: { body: "Your campaign money turns out to tangle with the lobby that pushed the reform. Scandal label: affixed." }
            }
          },
          {
            id: "noside",
            text: "Decline publicly: 'This is not the kind of verdict I comment on'",
            note: "Betting that staying dry is its own answer. Risk: silence reads as cowardice — or as a secret endorsement.",
            outcomes: {
              crit: { body: "Your refusal gets argued about as wisdom: he understood how cheap it is to opine on a criminal verdict. The clearheaded brand sticks." },
              ok: { body: "You gave the headlines nothing, and the opponents nothing. That is the whole win." },
              meh: { body: "A reporter asks twice. You walk." },
              fail: { body: "'He didn't dare say' — opponents find the phrase all by themselves." },
              critfail: { body: "Then a photo surfaces: you dining with one side of the case on verdict night. The one you never comment on." }
            }
          }
        ]
      },
      {
        id: "ln96_twa",
        title: "A jet falls into the sea; three weeks later a bomb hits the Olympic park",
        body: "Off Long Island, a 747 breaks apart minutes after takeoff. 230 dead. While the nation still watches the recovery boats,\n" +
          "a pipe bomb rips through Centennial Olympic park at night: 4 dead, over a hundred injured. A summer of mourning turns into a summer of suspicion —\n" +
          "malfunction or bomb, accident or attack; every day the story changes, and people start demanding a name to hold accountable.\n" +
          "The crash and the park bombing are probed by two separate systems whose accounts keep colliding. Head for accountability at your own risk: you may chase the wrong line all summer.",
        choices: [
          {
            id: "probe",
            text: "Keep one word: the truth. Push full probes on both aviation and security",
            note: "Betting the records really hide something. Risk: nothing is found, and you have insulted the two agencies that did the checking.",
            outcomes: {
              crit: { body: "The technical evidence ends up indicting systemic failures — the exact internal memo you quoted resurfaces. You were early, and right, in print." },
              ok: { body: "Hearings happen, lists get published, no giant falls — but your persistence earned its own column inches." },
              meh: { body: "The cases are still open. The news cycle moved on." },
              fail: { body: "The agencies you prodded push back with a binder of rebuttals and a reminder that you are not an expert." },
              critfail: { body: "Your 'smoking document' turns out to be a forgery planted on you. You stand at a podium reading the retraction." }
            }
          },
          {
            id: "securocrat",
            text: "Fold both disasters into one frame: the security state must be rebuilt",
            note: "Betting a scarier story sells better. Risk: the two cases diverge publicly, and your grand frame becomes a punchline.",
            outcomes: {
              crit: { body: "Both investigations end up validating 'systemic failure.' Your overhaul plan gets adopted at the state level, and your name appears near the procurement lists." },
              ok: { body: "You named the monster once, loudly. Budget lines shift a notch in your direction." },
              meh: { body: "Nobody contradicts you. Nobody picks up the thread." },
              fail: { body: "The crash report concludes: mechanical. Editorials ask whether you were busy selling funerals." },
              critfail: { body: "The agencies you expanded then abuse their powers, and every story asks the same question: who pushed hardest? You did." }
            }
          },
          {
            id: "grieve",
            text: "No verdicts, no theory — just memorial and victim relief, done properly",
            note: "Betting that work outlasts words. Risk: when accountability season arrives, the quiet ones get read as absent.",
            outcomes: {
              crit: { body: "Your victim fund is clean and every dollar lands. Weeks later, amid the finger-pointing, one paper runs the line: this summer, one person did the one useful thing." },
              ok: { body: "The memorial was dignified, the fund was sound. No front page, no scandal." },
              meh: { body: "Work done. No name attached." },
              fail: { body: "A victim's family complains publicly: he'll hand out flowers, but he won't say a word." },
              critfail: { body: "One messy fund receipt surfaces in a tabloid. It turns out fine — but the number already ran under a headline." }
            }
          }
        ]
      },
      {
        id: "ln96_welfare",
        title: "The president will sign the welfare law — and both parties demand your position",
        body: "The Republican Congress pushes decades of welfare talk to the signing desk, and the president — the one who vowed to end welfare\n" +
          "as we know it — decides to sign. Both wings of your own coalition call at once: one wants a public endorsement,\n" +
          "the other calls this sixty years of betrayal. You have one page of paper and one week.\n" +
          "The law sets time limits on benefits and hands administration to the states; hundreds of local agencies feed on welfare contracts. Whether it reads as triumph or as debt in five years, nobody can certify for you today.",
        choices: [
          {
            id: "backbill",
            text: "Endorse the law in print, standing behind the signature",
            note: "Betting the reform narrative wins. Risk: the base and the agencies remember which way you flipped.",
            outcomes: {
              crit: { body: "Rolls drop sharply in the first two years; your op-ed gets reprinted nationally. The machine files you under: reliable when it counts." },
              ok: { body: "You sided with the winning ink. The upper tier owes you; locally, the welfare agencies start meeting without you." },
              meh: { body: "The endorsement went out. It traveled nowhere." },
              fail: { body: "State implementation becomes a car crash, and reporters circle back: why did you vouch for this?" },
              critfail: { body: "The day the pilot-program scandal breaks, your endorsement letter is read aloud into the record, verbatim." }
            }
          },
          {
            id: "amend",
            text: "Support the framework — then fight to bolt safety valves onto the state version",
            note: "Betting you can splice a seam in two opposing winds. Risk: both sides shrug; the text may have no room for your pen.",
            outcomes: {
              crit: { body: "Your transition provisions make it into the state plan. Each paper praises half of what you did — and together the halves spell one good review." },
              ok: { body: "The valves get attached at the tail. Labor and the churches thank you; party HQ notes you as fussy." },
              meh: { body: "Your amendment dies in committee. The speech, at least, was made." },
              fail: { body: "Both camps deny ever wanting your clauses. You are the man who wrote checks the wind cannot cash." },
              critfail: { body: "Your office is caught tucking a chosen contractor into the bill text. An inquiry letter arrives." }
            }
          },
          {
            id: "vague",
            text: "Say only: 'It should change — but protect the weakest.' Back no side.",
            note: "Betting that boilerplate is armor. Risk: after election season, nobody recalls what you ever supported.",
            outcomes: {
              crit: { body: "Your sentence is quoted, with equal warmth, by both camps. Each side believes you are standing on its lawn." },
              ok: { body: "Airtight. Nobody can use it against you, and nobody can use it at all." },
              meh: { body: "Your statement is too short for the wire editors to cut." },
              fail: { body: "Two spokespeople, one day, same question: 'He's dodging.'" },
              critfail: { body: "An old document paints you as playing both pockets. It cannot stand up — the label stands up anyway." }
            }
          }
        ]
      },
      {
        id: "ln96_election",
        title: "Election night: the challenger loses again, and your party hands out the credit",
        body: "Clinton holds the White House and nudges both chambers his way. The Republican challenger loses the second race he should have lost four years ago,\n" +
          "and his radical contract gets quietly returned by the voters. The national wave rolls all the way down to the local flatland:\n" +
          "before the networks call it, you already hold three invitations to celebrate, and one memo urging you to cut ties with last year.\n" +
          "The machine is drawing up its list: who helped in the wave. Every camera you hug tonight has its own price tag, posted later.",
        choices: [
          {
            id: "wave",
            text: "Frame the win as a local battle: thank every helper by name",
            note: "Betting the grassroots remember. Risk: if the machine hears you claiming their wave, you outrank your station.",
            outcomes: {
              crit: { body: "Your thank-you list reaches from volunteers down to the church kitchens. In the party's internal poll, the 'most electable locally' slot carries your name for the first time." },
              ok: { body: "The thanks landed where they were owed. Your local bench is one ring deeper." },
              meh: { body: "Two victory parties, one guest list." },
              fail: { body: "A few workhorses got left off the roster. The grumbling outshines the toasts." },
              critfail: { body: "Someone circulates a chart of whom you thanked versus who funded you. Grumbling, nothing more." }
            }
          },
          {
            id: "net",
            text: "Bet the new medium: put the whole night — data and speeches — online",
            note: "Betting the e-campaign is barely begun: first in, first served. Risk: the net vote is still tomorrow's story.",
            outcomes: {
              crit: { body: "National sites cite your live updates through the night. For the first time a tech correspondent quotes a local politician as a source — early tolls on this road are yours." },
              ok: { body: "You were faster and fuller online than anyone nearby. The follower count moved." },
              meh: { body: "The updates posted. Your own volunteers reposted them." },
              fail: { body: "Your stream dies for half an hour in an outage. Rivals joke about the toys." },
              critfail: { body: "A poll you cited turns out to have a broken methodology. The correction gets more readers than the error." }
            }
          },
          {
            id: "local",
            text: "Skip the national glow; use election night to push local issues",
            note: "Steady: their wave, your errands. Risk: no one in the party remembers where you were tonight — which is the point.",
            outcomes: {
              crit: { body: "Under the victory banners, you talked only about bridges, schools and clinics. Two weeks later the paper's verdict: the one who worked while everyone cheered." },
              ok: { body: "You did your quiet thing, undramatically, correctly." },
              meh: { body: "Theirs the revelry; yours still just a bridge." },
              fail: { body: "The machine's gratitude list skipped you. It was printed for noisy names anyway." },
              critfail: { body: "You didn't even show at party headquarters. The only gossip left: this man has no party at all." }
            }
          }
        ]
      },
      {
        id: "ln97_asia",
        title: "Asian currencies fall like dominoes; one jolt shakes Wall Street",
        body: "After the baht goes down, the currencies pile into the dirt one after another. The index drops overnight, the hedge funds\n" +
          "say the word 'contagion,' and every front page asks out loud: is this the end of the boom? Your district sits in the middle:\n" +
          "export orders and pension statements jumped on the same morning edition. The merchants want calm. The unions want a villain.\n" +
          "The employment data has not cracked, but two local factories already hold cancelled Asian orders. A fire in one corner of Asia, or the first domino heading your way — nobody can say.",
        choices: [
          {
            id: "blame",
            text: "Name the villain: speculative money that gambled far and lost here",
            note: "Betting the anger is aimed correctly. Risk: finance and the merchants move you to the do-not-discuss list.",
            outcomes: {
              crit: { body: "When the layoffs do come, your indictment speech becomes the district's official text of the grievance, and the union hall rolls out the welcome mat." },
              ok: { body: "The streets feel heard; the ledgers take note. The chamber president calls you 'Mr. Populist' at the dinner — loudly." },
              meh: { body: "Your anger drowns in financial commentary." },
              fail: { body: "The market climbs back in two months. The week-in-review headline: 'Who Beat the Drums in October?'" },
              critfail: { body: "Your quotes are cut into a national segment as a case study in panic-selling, and local funds pull every credit line they hold on your projects." }
            }
          },
          {
            id: "steady",
            text: "Go the other way: fundamentals are sound — do not sell at the bottom",
            note: "Betting the market heals itself. Risk: if it really collapses, you are the man who talked for paper wealth.",
            outcomes: {
              crit: { body: "The market weaves through the scare and sets a new high by year's end. The business page dubs you the steadiest voice in town. Boardroom doors open." },
              ok: { body: "You held the line where the money sits. The commercial crowd starts filing you as one of their own." },
              meh: { body: "Your reassurance was read aloud. Nobody nodded." },
              fail: { body: "The slide keeps sliding. Your word 'fundamentals' becomes the caption on a cartoon." },
              critfail: { body: "Worse: a filing shows a household account bought the dip the same week you preached calm." }
            }
          },
          {
            id: "quiet",
            text: "Skip the macro. Keep the local relief windows open past closing time",
            note: "Betting work beats forecasting. Risk: when both camps demand a quote, your silence has a price too.",
            outcomes: {
              crit: { body: "The crisis never becomes a local layoff wave. Looking back, your extended service counters were the only measure nobody complained about." },
              ok: { body: "You did what needed doing and dodged what needed dodging." },
              meh: { body: "The windows stayed open. The lines stayed short." },
              fail: { body: "Two editorials, one day, one thought: every other pol took a side; this one pretended to be busy." },
              critfail: { body: "One muddled relief payment gets dragged through the paper. Small, but it sticks for the week." }
            }
          }
        ]
      },
      {
        id: "ln98_embassy",
        title: "Two American embassies blow up within minutes of each other",
        body: "10 a.m.: truck bombs gut the U.S. embassies in Nairobi and Dar es Salaam minutes apart. Over 200 dead, twelve of them Americans.\n" +
          "Kenyan mothers carry burned children through the mud on every channel. By nightfall the United States offers twenty million dollars\n" +
          "for one exiled financier's name. The military waits for orders. The intelligence agencies start rereading their own files. And locally, a microphone finds you again.\n" +
          "A retaliation target list is being drafted; your town holds an East African community and families of dead staffers. Some say the warnings existed and were buried layer by layer — and where the next blow lands, nobody will tell you in advance.",
        choices: [
          {
            id: "retaliate",
            text: "Back the cruise missiles: hard answers are the only language they hear",
            note: "Betting tough words are winning words. Risk: if the missiles miss the mastermind, you pre-spent everyone's blood.",
            outcomes: {
              crit: { body: "The strike footage runs on loop nationwide, and every official line matches yours. The military-industrial funding channels now know your name." },
              ok: { body: "You said the hawkish thing fluently. They appreciated it, even if anyone could have said it." },
              meh: { body: "Your statement dissolved into the pile of similar statements." },
              fail: { body: "The strikes miss the man himself and flatten other walls. Reporters begin asking who urged them loudest." },
              critfail: { body: "Civilian casualty photos surface. Your 'no apologies needed' quote is mounted inside every follow-up story." }
            }
          },
          {
            id: "askwhy",
            text: "Ask the earlier question: why did warnings never become action",
            note: "Betting the failure is inside the system, not just abroad. Risk: when the agencies bite back, centrists shield nobody.",
            outcomes: {
              crit: { body: "The warning chain did rot in the middle. Your question marks lead a national investigative byline, and the press corps registers you: touches institutions, reads English." },
              ok: { body: "You aimed right, even before the conclusion lands. Reporters already treat you as a usable source." },
              meh: { body: "That is not the question anyone wants this week." },
              fail: { body: "The Pentagon and the agencies say the same word about you, together: amateur. Hawkish voters remember it." },
              critfail: { body: "Your 'internal warning' proves to be stolen documents you should never have held. Now they are asking questions about you." }
            }
          },
          {
            id: "mourn",
            text: "Just work: run things for the dead staffers' families and the immigrant community",
            note: "Betting there is work beyond the grief. Risk: when war talk heats up, the doers get read as the timid.",
            outcomes: {
              crit: { body: "Your memorial logistics become the season's only zero-complaint operation. Two churches and the East African families claim you as one of their own." },
              ok: { body: "You ran every errand. Nobody found any words against you." },
              meh: { body: "Some tasks completed, on lists nobody publishes." },
              fail: { body: "A colleague asks aloud: in a week like this, all he does is arrange flowers?" },
              critfail: { body: "One mishandled donation crosses the tabloids with the worst three-word caption. It collapses, eventually. The caption stays posted." }
            }
          }
        ]
      },
      {
        id: "ln98_impeach",
        title: "The House passes impeachment articles over a private affair",
        body: "The sex-and-perjury scandal dragged through the whole autumn; now the House votes on articles: perjury, obstruction.\n" +
          "The Senate trial waits in January — and the president's approval rating sits pinned near record highs, unmoved.\n" +
          "For the first time your party faces a question with no model answer: remove our own president, or defend the seat while defending him. Two phone banks. One holiday.\n" +
          "The articles crossed the House; conviction takes a Senate majority, and the local churches and the party's moral wing are pushing hardest. Some say the whip count was done privately and conviction is dead — what the right bettors collect, nobody will say aloud.",
        choices: [
          {
            id: "defend",
            text: "Stand with the president: not a removal offense, whatever the tapes imply",
            note: "Betting the polls hold. Risk: if he is convicted anyway, you are on the list of men who defended him.",
            outcomes: {
              crit: { body: "Acquittal arrives right on your forecast, his approval never bends, and your 'do not undo an economy over a bedroom' line becomes the party's official key for next year — you said it first." },
              ok: { body: "You weathered the intra-party inquisition and spoke to the soft middle. The churches kept a ledger." },
              meh: { body: "Many defended him. You ranked in the middle of that pack." },
              fail: { body: "New disclosures look far uglier than expected. Your 'not that bad' gets re-aired with different music." },
              critfail: { body: "During the aftermath the question is asked of you directly: knowing he had lied, why did you vouch? A label appears, then stays." }
            }
          },
          {
            id: "push",
            text: "Push the articles through: the process ends where it ends, and morals get settled",
            note: "Betting the conviction wave outruns the polls. Risk: when it breaks on the rocks, the party's ledger lists you on top.",
            outcomes: {
              crit: { body: "The trial ends in nothing, but the impeaching wing holds the primary map. The machine keeps its books, and your name sits in the front row." },
              ok: { body: "You gave the moral voters their best argument and spent your capital spending it. The moderates' ledger grows too." },
              meh: { body: "You pushed. The wave went the other way." },
              fail: { body: "Acquittal, approval intact, and the middle voters want to know who dragged Congress through this autumn. They find names." },
              critfail: { body: "The committee you backed gets caught cherry-picking its evidence. The headline 'Political Trial' runs with your face as the standfirst." }
            }
          },
          {
            id: "clean",
            text: "Sympathy for neither: only the institution — let it finish, then let it close",
            note: "Betting the non-partisan persona compounds. Risk: in wartime neither faction hosts the neutral man.",
            outcomes: {
              crit: { body: "Your 'process and decency' statement runs on page one in two rival papers. The punditry logs you as something rare: a party figure who does not sound like one." },
              ok: { body: "You said a line nobody can oppose and nobody will repeat. Steady as stone." },
              meh: { body: "Height does not photograph well during a brawl." },
              fail: { body: "Both camps, same day: one says cold, the other says fence-sitter." },
              critfail: { body: "An old dealing of yours with one side of the affair digs up. Small, unprovable, and enough for the season." }
            }
          }
        ]
      }
    ],

    /* 世界线英文层：只覆盖 brief / outlets（pressure 是数值平衡，不碰）。
       outlets 逐年回译成当年真实存在的美国媒体，条数与中文侧严格一致。 */
    worldline: {
      brief: {
        "1995": "Prosperity is back; the innocence is not. The first homegrown truck bomb and a verdict the whole country watches being read leave it arguing, on camera, about which kind of America it is.",
        "1996": "An Olympic year, an election year, a jetliner lost at sea and another bomb in a park, all inside one summer. The panic is loud and the times are good; the incumbent signs welfare reform almost in passing, and everyone assumes history is on their side.",
        "1997": "Wall Street keeps printing records while Asian currencies fall night after night. For the first time people ask out loud whether a collapse an ocean away can swim down the wire into your pension account.",
        "1998": "Smoke over two embassies in East Africa and a zipper in Washington fill the same year's screens. The world is hard and coming apart, and Capitol Hill is running constitutional procedure over the president's dinner guests."
      },
      outlets: {
        "1995": ["The New York Times", "The Washington Post", "USA Today", "CNN", "Newsweek"],
        "1996": ["The New York Times", "USA Today", "CNN", "Fox News", "Drudge Report"],
        "1997": ["The Wall Street Journal", "USA Today", "CNN", "MSNBC", "Drudge Report"],
        "1998": ["The New York Times", "The Wall Street Journal", "The Washington Post", "CNN", "MSNBC", "Drudge Report"]
      }
    }
  }
});
