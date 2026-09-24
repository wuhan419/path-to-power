/* ============================================================================
 * CONTENT · i18n/en/lines/128-line-2022-24.js
 * English overlay for content/events/128-line-2022-24.js (2022—2024 pins).
 *
 * Contract (docs/I18N.md, sample: en/events/106-era-1990.js):
 *   · The zh source file is untouched; this file carries only text fields.
 *   · Events and choices align by id; terms align by index.
 *   · known / rumor / unknown are WHOLE-ARRAY replacements — give every entry.
 *   · Structural keys (id/era/minYear/tierMin/weight/base/mods/effects/flags/
 *     req/cost …) are engine-protected; writing them fails validate.
 *   · worldline brief / outlets are overlaid here too, one key per year that the
 *     zh side has. pressure is numeric and stays untouched.
 *   · English is rewritten, not translated: 2nd person, present tense, short
 *     sentences. Real institutions (the Fed, the Supreme Court, the FDIC).
 *     No full names of real people — offices only.
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "ln22_robles",
        title: "Gunfire at a Texas elementary school; nineteen children never come home",
        body: "Uvalde, Texas, a Wednesday morning: a man with a rifle walks into a third-grade classroom. Nineteen children and two teachers never leave the building — while heavily armed officers wait outside the corridor for more than an hour before breaching.\n" +
          "Tonight your district holds a candlelight vigil. Local TV wants your first sentence; your party says: don't talk politics yet. Candles burn out in a week. The question won't.",
        brief: {
          lede: "Every word you say after the guns will be weighed against the faces of the dead.",
          known: [
            "Twenty-one dead: nineteen children, two teachers. The shooter was killed inside.",
            "Armed officers held in the corridor over seventy minutes; the chain of command collapsed on the spot.",
            "Gun rights run deep in this state; the lobby's office is next door to the legislature."
          ],
          rumor: [
            "Some say response bills are already drafted at the capitol, waiting for someone to clap first.",
            "Some say this week's statements from Washington are being written straight into the donor ledger."
          ],
          unknown: [
            "The inquiry will drag the chain of command into daylight.",
            "Which bill you back is the first mark the whip keeps on you."
          ],
          terms: [{ k: "The gun lobby", v: "The most powerful gun-rights lobbying group in the country." }]
        },
        choices: [
          {
            id: "hold",
            text: "Stay with the families: funerals, counseling, no gun talk",
            note: "The bet: grief can tell respect from showmanship. Risk: you become the silent accomplice.",
            outcomes: {
              crit: { body: "You keep watch at family doorsteps for a week and never utter a slogan. Someone pins a post to the local trend: he did the quiet work." },
              ok: { body: "You walk the families through compensation and referrals. Nobody faults you; nobody quotes you." },
              meh: { body: "You attend the vigil and stand at the back. Nobody notices you came." },
              fail: { body: "Someone holds up a dead child's photo and asks what you will do today. Your answer sounds like a press release." },
              critfail: { body: "A photo of you calling funeral homes leaks with one caption: he needs these bodies. You never knew obituaries could turn into flyers." }
            }
          },
          {
            id: "ban",
            text: "Ride local anger: force an assault-weapons ban onto the agenda",
            note: "The bet: the candles light a national wave. Risk: in a gun state your name goes on a list.",
            outcomes: {
              crit: { body: "Your name is read aloud beside the children's. The streets name the legislative wave after them, and you ride inside it." },
              ok: { body: "You give the street's rage an outlet. The other side starts printing you as its cautionary example." },
              meh: { body: "You gave the speech. The bill stays stuck in the Senate. Anger evaporates faster than gasoline." },
              fail: { body: "Party operators complain out loud that he is digging graves for the deep south. Your donor list starts to leak." },
              critfail: { body: "A clipped soundbite returns: the children will have their guns taken next. You never said the second half, and nobody heard it." }
            }
          },
          {
            id: "secur",
            text: "Fly to the capital: school-security and counselor money, around the gun itself",
            note: "The bet: small things done beat big fights won. Risk: both flanks call you a dodge.",
            outcomes: {
              crit: { body: "You bundle lock budgets with school therapists and get it signed; the governor says your name at the pen. Parents thank you, both flanks call you slippery — the doors lock and the kids are safer." },
              ok: { body: "The bill passes: small money, your name on it. The caucus marks a point for the gun you did not touch." },
              meh: { body: "You grind out hearing money. The news finds no place for you." },
              fail: { body: "The security money gets chained to a poison rider and dies. They say you bought a fig leaf and got nothing." },
              critfail: { body: "Photos surface from your lobbyist dinner, the lobby's biggest backer in the background. The seventy minutes in the corridor get compared with your evening." }
            }
          }
        ]
      },
      {
        id: "ln22_dobbs",
        title: "The Supreme Court overturns a fifty-year precedent",
        body: "A leaked draft in May exposed the balance among the nine; in late June the ruling lands: nearly fifty years of federal constitutional protection ends, and trigger bans in a dozen southern states snap into effect the same day.\n" +
          "Your district has a women's clinic decades old. Both camps' cameras are set and waiting: celebrate life or defend choice — one sentence prices your whole ballot.",
        brief: {
          lede: "One ruling splits the country into two sets of rules; one half never plans to concede.",
          known: [
            "Federal constitutional protection is over; each state now decides by its own laws.",
            "Trigger bans are live in a dozen-plus states; clinics begin transferring patients overnight.",
            "The party calls twice a day: the midterms will be mobilized on this question."
          ],
          rumor: [
            "Some say the White House is prepping executive orders to route around state bans.",
            "Some say the chief justice wanted a narrower ruling; the leak wrecked it."
          ],
          unknown: [
            "How long the gray channel of mail-order pills and telehealth will hold.",
            "November's turnout will be dragged upward a full notch by this issue."
          ],
          terms: [{ k: "Roe v. Wade", v: "The 1973 ruling that created federal abortion-rights protection." }]
        },
        choices: [
          {
            id: "narrow",
            text: "Give a personal position, then turn to local maternal-health funding",
            note: "The bet: in a flood, patience outlasts hot takes. Risk: both camps remember you as slippery.",
            outcomes: {
              crit: { body: "You refuse the trial script, and the budget still lands. Neither camp is happy; both clinics still take your calls." },
              ok: { body: "You cool the hottest question of the decade into a line item. No points gained, none lost." },
              meh: { body: "The country argues; you sit in meetings. The news has no slot for you." },
              fail: { body: "Both sides cut your non-answer into evidence. He dares not say it becomes a free attack line." },
              critfail: { body: "You privately ask a donor not to buy abortion ads; the recording goes to the other camp. Both sides, you learn, were wearing wires." }
            }
          },
          {
            id: "welcome",
            text: "Publicly welcome the ruling; take the religious right's applause",
            note: "The bet: this issue is the base's first priority. Risk: suburban swing voters keep a tab until November.",
            outcomes: {
              crit: { body: "On ruling day you are already on the capitol steps. The church network treats you as one of its own; the party list carries your name for the first time." },
              ok: { body: "You picked the right team for now. The applause is real; so are the suburban donation refunds." },
              meh: { body: "You welcome the decision; slicker slogans bury the welcome." },
              fail: { body: "The list of closing clinics runs in the local paper, your celebrate life printed beside it." },
              critfail: { body: "Protecting mothers was your promise that night; ten months on it is still words. The local paper loops the promise as an ad." }
            }
          },
          {
            id: "codify",
            text: "Make the reversal your plot: codify federally, mobilize the young",
            note: "The bet: the anger tide floods past the midterms. Risk: if it never comes, you were the loudest one there.",
            outcomes: {
              crit: { body: "Your slogan becomes this year's line at the polls: young voters queue over a court ruling. The stories on who lit it include your name." },
              ok: { body: "You sign the mobilization. The issue chases you — and lifts you." },
              meh: { body: "You call for codification; Senate rules block the road first. The street clears faster than it gathered." },
              fail: { body: "Rivals blame your radical pose for the collapse; the machine quietly moves your name down the slate." },
              critfail: { body: "A memo from your office to activist groups goes public. The church network keeps you in a jar labeled never again." }
            }
          }
        ]
      },
      {
        id: "ln22_cpi",
        title: "Inflation hits a forty-year high; the Fed slams the brakes",
        body: "June CPI, released July 13: up 9.1 percent year over year, the highest in four decades. Gas breaks five dollars; mortgage rates jump with every hammer blow from the Fed. The White House says the peak has passed. The pump on Main Street has not heard that.\n" +
          "The town hall is packed with people doing arithmetic until they are angry. They don't ask you what inflation is. They ask whose fault it is, and what you intend to do.",
        brief: {
          lede: "For every family the price is the election; whoever defines the pain first wins it.",
          known: [
            "June CPI rose 9.1 percent, a forty-year record; wages never caught up.",
            "The Fed has hiked again and again; mortgage rates roughly doubled inside a year.",
            "The White House signals the peak is past; gasoline and rent keep climbing."
          ],
          rumor: [
            "Some say the Fed chair has privately softened, easing gears by fall.",
            "Some say reserve oil will be released before November to push the pumps down."
          ],
          unknown: [
            "The cost of hiking arrives when the job market pays, early next year.",
            "Whichever side you take becomes a comparison ad."
          ],
          terms: [{ k: "Basis point", v: "One hundredth of a percent; 75 bps means a 0.75-point hike." }]
        },
        choices: [
          {
            id: "listen",
            text: "Host the town hall, hear the bills out loud, then land local energy aid",
            note: "The bet: listening reads as leadership. Risk: ears without deliveries age badly.",
            outcomes: {
              crit: { body: "You actually move heating assistance and food-bank money. The cameras' verdict: he at least lets people finish their sentences." },
              ok: { body: "You let every household finish their anger. You fix nothing and add nothing." },
              meh: { body: "Three hours of meeting; you become the wallpaper." },
              fail: { body: "Someone asks so what? You answer in talking points." },
              critfail: { body: "At the door someone presses an eviction notice into your hand. The photo is more honest than any statement you made." }
            }
          },
          {
            id: "gouge",
            text: "Aim the anger at refiners: back an excess-profits tax",
            note: "The bet: gas-line fury outweighs ballot-box math. Risk: donors and your expert reputation burn together.",
            outcomes: {
              crit: { body: "State after state picks up the tax idea; you become the one who dared speak to oil. The base and the unions log whose hand wrote it." },
              ok: { body: "You curse for the people in the fuel line. Energy stocks begin running you in their cautionary ad." },
              meh: { body: "You blasted the oil firms; the tax dies unborn. Nobody took you seriously." },
              fail: { body: "Scorecards say the tax would raise your own state's prices. You go from their voice to the guy who doesn't get economics." },
              critfail: { body: "The donors dig up your old energy money: and he talks about profit?" }
            }
          },
          {
            id: "fed",
            text: "Back the Fed all the way: pain now beats inflation forever",
            note: "The bet: voters will thank the one who drained the blood. Risk: in a recession year your line hangs on their doors.",
            outcomes: {
              crit: { body: "Prices peak and fall that winter. One pain beats aching forever becomes your calling card; the establishment and Wall Street note your clarity." },
              ok: { body: "You took the abuse and backed the right curve. The base thinks you sit with the banks." },
              meh: { body: "You said the correct, unpopular thing. Neither side caught it." },
              fail: { body: "Rates crush the local housing market; voters remember who cheered for the hikes." },
              critfail: { body: "In the layoff wave your short-pain line is printed on every opposition flyer. Your name shares a mailbox with the unemployment office." }
            }
          }
        ]
      },
      {
        id: "ln22_midterm",
        title: "Midterms: the expected red wave stops at the ankles",
        body: "November 8. The exit polls were supposed to tell a wave story. Instead: the president's party adds Senate seats, the House changes hands by a whisper, and Georgia waits for a December runoff to decide the chamber.\n" +
          "Everyone who bet on the tide is re-reading the charts tonight: a loss that didn't lose, a win that didn't win. The rest of the bill belongs to you.",
        brief: {
          lede: "On a night the wave fails, the purge is harsher than a plain defeat.",
          known: [
            "No wave. The Senate splits fifty-fifty and hangs on Georgia's December runoff.",
            "Committee chairs are not dealt until the new Congress sits in January.",
            "Both parties' data teams re-live the night; whoever finds the lesion first steers."
          ],
          rumor: [
            "Some say the youth vote rose two full points on one court ruling.",
            "Some say counting rules shifted again; the winner waits on a state court."
          ],
          unknown: [
            "This reading will define both 2024 primary paths.",
            "Your position tonight is next round's opening bid."
          ],
          terms: [{ k: "Midterm election", v: "The congressional vote at the president's halfway mark." }]
        },
        choices: [
          {
            id: "ownlane",
            text: "Skip the national post-mortem; keep delivering local promises",
            note: "The bet: a local ledger is harder currency than national mood. Risk: nobody vouches for you at the reshuffle.",
            outcomes: {
              crit: { body: "While the purge argues on TV you finish three local jobs. Two years later, whoever audits the record finds your name under the column get-it-done." },
              ok: { body: "You neither rode the wave nor wore its blame. On nights like this, invisibility is an asset." },
              meh: { body: "The returns crawl past without you. You went to bed early." },
              fail: { body: "Someone notes that with results like these he stays silent — what is he hiding?" },
              critfail: { body: "You tried to offend nobody; both camps quietly delete you from their promising lists." }
            }
          },
          {
            id: "carry",
            text: "Send money and your name into every county for the national tide",
            note: "The bet: even a ripple lifts you. Risk: the tide never comes and you paid for the raft.",
            outcomes: {
              crit: { body: "He showed up even in defeat becomes your brand. The only operator the party machine cannot bear to cut is you." },
              ok: { body: "Your roadshow changed nothing national; every receipt went into the party file." },
              meh: { body: "The money is spent; the wave never arrives. The thank-you note is two lines long." },
              fail: { body: "The post-mortem asks first: who campaigned for these candidates? Your name goes on the list." },
              critfail: { body: "He bet on the losers goes straight into the opposition's fundraise email. You paid dearly for a negative asset." }
            }
          },
          {
            id: "hedge",
            text: "Keep one back door open across the aisle; burn no bridges",
            note: "The bet: Georgia and 2026 are both unsettled. Risk: both sides remember your two faces.",
            outcomes: {
              crit: { body: "On count night someone vouches for you in both rooms. In the gray list of the handover, your square is set early." },
              ok: { body: "Quietly you keep two lines warm. For now nobody needs them, and nobody uses them against you." },
              meh: { body: "You greet both sides; neither files it." },
              fail: { body: "Your eat-with-both reputation arrives before you do. Your own party starts auditing your money." },
              critfail: { body: "A private outreach text leaks to friendly media. Now you are nobody's, on a list labeled unreliable." }
            }
          }
        ]
      },
      {
        id: "ln23_svbu",
        title: "A tech industry's house bank collapses in forty-eight hours",
        body: "Wednesday the parent company announces an asset sale; Thursday customers withdraw some one hundred billion dollars in a single day; Friday the state regulator and the FDIC walk in and take the sixteenth-largest bank in America. Another bank falls the following weekend; a day later the Treasury and the Fed declare a systemic risk exception — every deposit backstopped.\n" +
          "A founder in your district's tech town calls: which account should payroll sit in? The deposits moved to five-percent money funds months ago. This time nobody keeps pretending.",
        brief: {
          lede: "When the bank that cannot fail fails, the smart money leaves first.",
          known: [
            "It ranks sixteenth in America; over ninety percent of its deposits are uninsured.",
            "Some one hundred billion withdrawn in a day; regulators seize it the next.",
            "All deposits are backstopped; a second bank closes the same weekend."
          ],
          rumor: [
            "Some say two or three more names sit on a watchlist; each night the list differs.",
            "Some say the backstop authority will be unwound by a congressional audit."
          ],
          unknown: [
            "Credit tightening pushes the layoffs one quarter out.",
            "Whose deposits you steadied will be remembered a long time."
          ],
          terms: [{ k: "Systemic risk exception", v: "The emergency justification for insuring every deposit, insured or not." }]
        },
        choices: [
          {
            id: "steady",
            text: "Stand at the branch door and reassure: deposits are insured, ignore the rumors",
            note: "The bet: you can be the most believable person in town. Risk: if calm fails, you are the rumor.",
            outcomes: {
              crit: { body: "You hold a press conference at the roped-off branch, every figure checked, and the town does not run. The bank examiner's thanks are rare and real." },
              ok: { body: "Your reassurance holds; the queue outside actually thins." },
              meh: { body: "You show up and say nothing decisive. Next day the money runs anyway." },
              fail: { body: "You promise under the insured limit is fine; that night a company finds payroll above it." },
              critfail: { body: "Your branch-door photo turns up in a class action: he guaranteed it. Join the suit." }
            }
          },
          {
            id: "move",
            text: "Route local firms' cash to a safer harbor: the big bank you vouch for",
            note: "The bet: whoever moves money owes favors on both shores. Risk: when it sours, you knew which wind.",
            outcomes: {
              crit: { body: "You move the whole street's accounts into banks you vouch for; the funds and the lenders both list your name." },
              ok: { body: "The money is safe. The commission and the goodwill are just as real." },
              meh: { body: "A few firms move; the rest don't trust you. You spent favors for split results." },
              fail: { body: "The moved cash stalls in new-account review; payroll bounces. Founders start asking what you got paid." },
              critfail: { body: "The referral fee surfaces: you gathered deposits for yourself in the panic. The tech scene remembers grudges longer than favors." }
            }
          },
          {
            id: "audit",
            text: "Chase the deregulation paper trail: who let a bank gamble on long bonds",
            note: "The bet: expertise becomes a courtroom. Risk: the agencies remember the names you call.",
            outcomes: {
              crit: { body: "You turn five-percent rates and long-duration bonds into an auditable crime. The investigating chair invites you to the witness table; the media saves you a standing seat." },
              ok: { body: "Your accountability letter becomes a morning headline; the regulators' tone loosens an inch." },
              meh: { body: "You cite chapter and verse; the hearing is scheduled for next year." },
              fail: { body: "You lump two healthy banks onto one list; the lawyer letters carry your face to national news." },
              critfail: { body: "They find you vouched for one of the acquirers. The questioner becomes the questioned." }
            }
          }
        ]
      },
      {
        id: "ln23_debt",
        title: "The Treasury counts the days: June runs out of money",
        body: "The ceiling is already hit; the extraordinary measures enter countdown, and a rating agency has warned of a downgrade. The House speaker chains the increase to two years of spending caps; the White House says no negotiations on conditions, and the government's civil war broadcasts itself.\n" +
          "Your district eats federal: the base, clinic reimbursements, farm loans. If the country actually defaults, their cash stops first. Washington watches who blinks; your county watches whether you speak.",
        brief: {
          lede: "The national ledger is taken hostage; every bettor waits for the first blink.",
          known: [
            "The Treasury warns: the first possible default date is early June.",
            "The speaker, pushed by the hardliners, ties the ceiling to a two-year spending cap.",
            "The White House refuses to negotiate on terms, but the late-night calls keep ringing."
          ],
          rumor: [
            "Some say the Treasury is quietly testing the legality of a one-trillion-dollar coin.",
            "Some say the speaker has already counted a majority; he is only waiting for the pen."
          ],
          unknown: [
            "Default risk wounds the rating; the markets flinch first.",
            "Whoever loses, the middlemen detour next time."
          ],
          terms: [{ k: "Debt ceiling", v: "The borrowing limit Congress sets; hitting it risks a national default." }]
        },
        choices: [
          {
            id: "prep",
            text: "Ignore the standoff; run a local supply-cutoff drill",
            note: "The bet: crises always resolve; hunger doesn't wait. Risk: both flanks call you a coward with spreadsheets.",
            outcomes: {
              crit: { body: "Federal paychecks really arrive two weeks late; only your county has posted a queue schedule. The base and the clinics sign one thank-you letter." },
              ok: { body: "You did the homework. Nobody starves, nobody credits you. In a crisis year that breaks even." },
              meh: { body: "Your contingency plan sits in a drawer; the standoff ends before you need it." },
              fail: { body: "No default comes, and your panic drill becomes a waste-of-taxpayer-money story." },
              critfail: { body: "You promised on TV that the feds won't stop. They stopped for two days — your county had nothing, and your word went under with them." }
            }
          },
          {
            id: "hawk",
            text: "Back cut-first-raise-later; stand with the hardliners",
            note: "The bet: fiscal pain gets credited to nerve. Risk: the knife lands on voters through you.",
            outcomes: {
              crit: { body: "The deal is signed in your language. Primary donors call you a man who does what he says; your standing inside the party rewrites overnight." },
              ok: { body: "Fiscal muscle wins you screen time; nobody reads the budget's fine print." },
              meh: { body: "You joined the line; the headline had other names." },
              fail: { body: "The final deal lacks every cut you promised; you end the night recognized by neither side." },
              critfail: { body: "The list you defended reaches the local clinic. On camera a doctor reads your speeches aloud, one line at a time." }
            }
          },
          {
            id: "clean",
            text: "Refuse any hostage rider; demand a clean up-or-down vote",
            note: "The bet: dignity outlasts arithmetic. Risk: both machines file your refusal.",
            outcomes: {
              crit: { body: "Your no-deal becomes the night's clean-water story in the commentary lanes, and your fundraise page doubles." },
              ok: { body: "You refuse cleanly — and write yourself off the distribution list." },
              meh: { body: "Your principle is expensive; nobody bids that price." },
              fail: { body: "The whip books your no; the committee rota moves you ten slots back." },
              critfail: { body: "The standoff runs to the last hour, and the media finds its scapegoat: this is the crew that made default risk real." }
            }
          }
        ]
      },
      {
        id: "ln23_oct7",
        title: "A cross-border massacre; the argument reaches campus within the month",
        body: "On October 7 Hamas fighters cross the border and kill some twelve hundred people in southern Israel, taking more than two hundred hostages; Israel answers with air power over Gaza, and the humanitarian toll worsens by the day. Within the month the faraway war climbs the walls of your local campuses and synagogues.\n" +
          "Your donor ledger and your block's prayers both reach for you. Both sides use one word against each other: hate. The university is scheduling hearings, and you know names on the board of trustees.",
        brief: {
          lede: "Someone else's war, your town's exam: one sentence and you stand in one camp.",
          known: [
            "The death and hostage counts are verified; the captives' families are on camera.",
            "Gaza's dead and displaced numbers refresh daily; both local communities heat up with them.",
            "Blood drives, vigils and protests share one calendar in one city."
          ],
          rumor: [
            "Some say the northern front may light next, and the war spills over.",
            "Some say the White House is privately pressing for an aid corridor."
          ],
          unknown: [
            "Testimony at the campus hearing will detonate the national donor boards.",
            "Tonight's wording gets cut into two versions, one per side."
          ],
          terms: [{ k: "Flash protest", v: "An unpermitted rally summoned overnight on social media." }]
        },
        choices: [
          {
            id: "heal",
            text: "Visit both communities once each; refuse the scoreboard",
            note: "The bet: the wound hurts identically on both sides. Risk: both call you mush.",
            outcomes: {
              crit: { body: "You say one sentence in a synagogue and a mosque. In the angriest month, nothing bad happened here — it gets logged to you." },
              ok: { body: "Both sides still take your call. That is a narrow gate; you are among the few who walked it." },
              meh: { body: "A month of comforting words. No headline." },
              fail: { body: "A scuffle breaks up a vigil, and someone says you grieve for neither side." },
              critfail: { body: "Both camps denounce you the same day: friend of terrorists; accomplice of occupation. One sign, two slaps." }
            }
          },
          {
            id: "stand",
            text: "Speak at the solidarity rally: affirm the right to respond, name the campus encampments",
            note: "The bet: this issue ignites donors and primaries at once. Risk: the other crowd on campus never forgives.",
            outcomes: {
              crit: { body: "Beneath the hostage banners your speech runs national; the caucus and the giving network add your name to a new list." },
              ok: { body: "You said the safest, loudest thing. Across town, a door swings shut on you." },
              meh: { body: "Your statement drowns inside louder slogans." },
              fail: { body: "Night footage from Gaza takes the broadcast, and your firm support sounds like asking people not to watch." },
              critfail: { body: "Muslim shopkeepers unsubscribe from your events in a joint letter. Your words get printed on protest banners outside a mosque." }
            }
          },
          {
            id: "ceasefire",
            text: "Call for a ceasefire and humanitarian corridors; keep pace with the young",
            note: "The bet: moral outrage converts into turnout. Risk: the establishment and the donor web file you across the aisle.",
            outcomes: {
              crit: { body: "The ceasefire and aid chants march out of the campus into downtown. You sit in the column who dared first; young money enters your ledger for the first time." },
              ok: { body: "You took to the street on one side, and permanently took a seat in the party's defendant box." },
              meh: { body: "Your call gets drowned by the next vigil." },
              fail: { body: "One attack makes your slogan look naive for twenty-four hours; the caucus starts calling names." },
              critfail: { body: "Photos of you at the encampment land in every member's inbox. The host swaps out your place card at the fundraise banquet." }
            }
          }
        ]
      },
      {
        id: "ln24_shooting",
        title: "Gunfire at a rally; the former president raises a bloodied fist",
        body: "A steel town in Pennsylvania, an open-air rally for the former president who leads his party's ticket: shots, the Secret Service surges the stage — he stands with blood on his ear and fist raised; in the bleachers one man never rises again; a sharpshooter kills the gunman on the spot.\n" +
          "The nation completes its camp assignment within hours: some shout unity, some audit security, some first count how this blood rewrites the polls. Your phone is ringing too.",
        brief: {
          lede: "After one shot, the country has hours to decide again whether it is one people.",
          known: [
            "One spectator dead, two critically wounded; the shooter was killed off the grounds.",
            "Why the Secret Service was late becomes an issue both parties want to own.",
            "The event puts strongman and stability on the table at once."
          ],
          rumor: [
            "Some say a lone wolf; the shopping list and old posts will surface fast.",
            "Some say the rival camp's rallies drew threats too; nobody aired them."
          ],
          unknown: [
            "A rally-around-the-flag lift in the polls starts immediately.",
            "In two weeks your side replaces its candidate; tonight's words get recut."
          ],
          terms: [{ k: "Rally-around-the-flag", v: "The short-term approval spike after a shock attack." }]
        },
        choices: [
          {
            id: "mourn",
            text: "Mourn the dead, condemn political violence; one line for each side",
            note: "The bet: most families are as scared as you are. Risk: the poles punish you for having no side.",
            outcomes: {
              crit: { body: "Anchors on both networks quote your sentence. This summer, acting like an adult is the scarce commodity." },
              ok: { body: "You spoke correctly at the right hour and offended nobody's dinner table." },
              meh: { body: "The national mood runs faster than you; you are steady, not loud." },
              fail: { body: "He talks decorum during a live blood feed becomes the opposition's ad script." },
              critfail: { body: "Your condolence letter is cut in half and used by both camps. He never knew who he was mourning." }
            }
          },
          {
            id: "surge",
            text: "Plant your flag: weld iron and order onto your own sign",
            note: "The bet: fear buys a two-week lead. Risk: it reads as disaster profiteering, and fast.",
            outcomes: {
              crit: { body: "You are cut into the montage of the same kind of tough; donations and polls lift together. The machine opens a new account for you." },
              ok: { body: "You caught the surge and were seen eating. Your name starts searching beside the word gunshots." },
              meh: { body: "The wave is too big; you are not its crest." },
              fail: { body: "One slip replays word by word: he would use a gunshot. The moderates unsubscribe." },
              critfail: { body: "Your iron short video posts the day the victim's family buries him. The screenshot needs no commentary." }
            }
          },
          {
            id: "protect",
            text: "Talk mechanics, not politics: demand a full audit of the security failure",
            note: "The bet: move the cameras from slogans to procedure. Risk: law enforcement remembers the name that barked.",
            outcomes: {
              crit: { body: "Why was there no outer cordon becomes a hearing title; the professional world logs you as someone who knows the work." },
              ok: { body: "You asked the right question and insulted every doorman in sight." },
              meh: { body: "Too technical. The country wants slogans." },
              fail: { body: "The report slaps you: the gap you pointed at already had a protocol." },
              critfail: { body: "Your failure-of-duty hat is disproven on camera. The agency and the press convict you together of blackening for effect." }
            }
          }
        ]
      },
      {
        id: "ln24_election",
        title: "November 5: a return, a flip, and an orderly handover",
        body: "A summer withdrawal, the vice president taking the baton, a debate, AI-faked audio — and finally the count: the former president returns; the Senate flips; the House counts until dawn. The losing party's autopsy is not yet scheduled; the winning party's feast has started seating.\n" +
          "Everything depends on which table you sit at tonight — and whether there is still a table.",
        brief: {
          lede: "Election night, two parallel realities collide on the tally screen — and the procedure still runs.",
          known: [
            "The White House changes hands; the Senate flips; House counts drag past midnight.",
            "On the losing side someone says respect the result before sunrise.",
            "The transition begins with phone calls, then committees, then personnel lists."
          ],
          rumor: [
            "Some say the incoming roster is already vetted; only the signatures are missing.",
            "Some say a primary coup is brewing inside the losing party."
          ],
          unknown: [
            "The midterms two years out become the new government's report card.",
            "Every side you chose tonight is itemized and audited years later."
          ],
          terms: [{ k: "Transition of power", v: "The procedural handover of security briefings and federal resources." }]
        },
        choices: [
          {
            id: "unity",
            text: "Accept the result, speak unity, archive your files for the successors",
            note: "The bet: procedure is still worth something. Risk: both camps treat you as old furniture.",
            outcomes: {
              crit: { body: "The other network quotes your unity line, and your side's dignity is kept by you. When the new administration recruits you, they talk terms, not charity." },
              ok: { body: "You keep your face and hand over faceless ledgers. Books clean, market cold." },
              meh: { body: "The country changes the channel; you are an old commercial." },
              fail: { body: "Both camps translate your unity as either kneeling or weakness." },
              critfail: { body: "A welcome-aboard note gets cut into an early-capitulation clip. The losing side believes it." }
            }
          },
          {
            id: "cross",
            text: "Cross the aisle and audition: bet on a place inside the new government",
            note: "The bet: the new team needs a live map of old ground. Risk: your old crew makes an example of you.",
            outcomes: {
              crit: { body: "The transition team calls your name, and the donors behind the new administration open their web to you too. You walk into a new office carrying keys to an old precinct." },
              ok: { body: "You enter the can-talk list and the cannot-trust list simultaneously." },
              meh: { body: "Your audition letter sinks. New teams hire their own." },
              fail: { body: "Your old side publishes the call logs first. You get no seat at either table." },
              critfail: { body: "Infighting in the new camp throws you out as the offering: that traitor. Both parties teach on you." }
            }
          },
          {
            id: "rebuild",
            text: "Bet on rebuilding the losing party: four years on one comeback",
            note: "The bet: the closer the loss, the higher the price of repairs. Risk: the civil war over direction uses you for target practice.",
            outcomes: {
              crit: { body: "Your autopsy memo circulates as a pamphlet. Two years later, every race passes your table." },
              ok: { body: "You claim the shipwright's title; the ship may not know it is yours." },
              meh: { body: "Nobody finishes reading your memo. The reckoning comes earlier than you thought." },
              fail: { body: "The loss war starts, and you are filed under the wrong faction." },
              critfail: { body: "The convention you self-funded becomes a public knife fight. The receipts and the recordings leak together." }
            }
          }
        ]
      }
    ],

    /* Worldline 2022—2024 · English overlay (outlets: real US media of those years). */
    worldline: {
      brief: {
        "2022": "Prices run ahead of pay, and the Supreme Court tears up fifty years of settled rules. Both halves are sure the country is being ruined by the wrong people, and the midterms are argued that way.",
        "2023": "Banks fall one after another on the news, and Washington treats the nation's credit like a bomb with a countdown on it. People are tired enough to ask only for no new bad news — until autumn, when a distant war reaches the local campus.",
        "2024": "Gunshots, a swapped-in candidate and two realities fed by algorithms, counted on the same night: the country uses one ballot to ask whether everyone still lives in the same country."
      },
      outlets: {
        "2022": ["The New York Times", "CNN", "Fox News", "USA Today", "Twitter"],
        "2023": ["CNN", "Fox News", "X (formerly Twitter)", "Substack newsletters", "AI-generated content accounts"],
        "2024": ["CNN", "Fox News", "X (formerly Twitter)", "Short-video platforms", "AI voice cloning and generated accounts"]
      }
    }
  }
});
