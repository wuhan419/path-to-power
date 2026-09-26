/* ============================================================================
 * CONTENT · i18n/en/lines/125-line-2011-14.js
 * 英文覆盖层：content/events/125-line-2011-14.js（Track-B · 2011—2014 十张定点卡）。
 *
 * 契约同 i18n/en/events/106-era-1990.js（见 docs/I18N.md）：
 *   · 中文原文件一个字不动，这里只放要覆盖的文案字段。
 *   · 事件按 id 定位，choices 按 id 对齐，terms 按数组下标对齐。
 *   · 结构性键（era / minYear / tierMin / weight / base / mods / effects / flags /
 *     req / cost …）由引擎保护，写了会触发 validate 报错，所以这里一律不写。
 *   · worldline 的 brief / outlets 同样在这里整体改写，年份键与中文一一对应；
 *     pressure 是数值，不写。
 *   · 英文按英语重写：第二人称、现在时、短句；机构用真实英文名
 *     （CNN、Standard & Poor's、NSA、FEMA、Wall Street Journal）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ---------------- 2011-05 · bin Laden killed ---------------- */
      {
        id: "ln11_binladen",
        title: "Late at night, the President announces: Bin Laden is dead",
        body: "At 10:34 p.m. the President walks into the Oval Office and says one sentence that closes a decade. Two thousand, nine hundred and seventy-seven deaths,\n" +
          "trillions of dollars, and it all lands in an eleven-minute taped statement. Your town honks through the night.\n" +
          "By morning the questions are local: nothing is being withdrawn from Afghanistan, and the veterans' files are still stacked on your desk.\n" +
          "The affiliate wants a reaction — two sentences, anyone could say them. Some say the intel arrived weeks ago and the date was chosen.\n" +
          "How long this lift survives the news cycle, nobody will tell you tonight.",
        choices: [
          {
            id: "vision",
            text: "Move the subject from revenge to what comes after the war",
            note: "Betting the country can bear one longer thought tonight. Risk: nobody wants the bill on a night like this.",
            outcomes: {
              crit: { body: "You spend your slot talking withdrawal, VA funding and the debt. By Friday two national outlets cite you as the one officeholder who discussed tomorrow." },
              ok: { body: "Someone writes your line down. It is not overreach and it is not cheerleading." },
              meh: { body: "Your interview is cut to one word — important — while the anchors replay the commando footage." },
              fail: { body: "You offer analysis; the host asks whether you are happy. You blink twice on camera." },
              critfail: { body: "Your draft gets dug up with the headline 'While He Celebrated, He Counted'. Nothing sticks, but people now know your face in that corridor." }
            }
          },
          {
            id: "honor",
            text: "Talk only about the troops and their families: memorial, then casework",
            note: "Betting the military community keeps a ledger of who showed up. Risk: everyone else hears routine.",
            outcomes: {
              crit: { body: "You read the names at the gate on the base's behalf. The military, the unions and the churches all note it, and the resettlement money clears." },
              ok: { body: "You run paperwork for families. The installation and the ward leaders both owe you one." },
              meh: { body: "You show up, say little, shake a great many hands." },
              fail: { body: "The memorial starts to look like a ribbon-cutting, and one veteran says so on live radio." },
              critfail: { body: "The funding stalls in procedure. The families remember what you promised. Nothing breaks — the debt just opens in your name." }
            }
          },
          {
            id: "no_headline",
            text: "Say nothing national; offer one local line of tribute",
            outcomes: {
              crit: { body: "You do not grab the microphone. At a small church service you read one name. Later someone says of you: he didn't use it." },
              ok: { body: "You say the right short thing. Nobody remembers, nobody objects." },
              meh: { body: "You turn the page cleanly. By the next morning nobody recalls you in this story." },
              fail: { body: "You are quiet enough that a talk-radio host asks where you were." },
              critfail: { body: "'He hid' becomes a local joke. That is all it becomes." }
            }
          }
        ]
      },

      /* ---------------- 2011-08 · debt ceiling / downgrade ---------------- */
      {
        id: "ln11_debt",
        title: "Ten days into the debt standoff, America loses its AAA rating",
        body: "Two parties spend eight weeks arguing over the debt ceiling — the borrowing limit Congress sets for itself — and on a Friday after the close Standard & Poor's takes one notch off the United States.\n" +
          "Cable calls it the end of the world. Your switchboard is local: a lumber yard, a dentist, two retirees whose pension is a bond index, and two lenders already tightening credit lines and asking about layoffs.\n" +
          "The rating is cut; the dollar has not broken, and markets may recover by Monday. The Treasury says the checks still clear. Congress says it is the other side's fault. The camera asks you one question: who pays.\n" +
          "The party wants you for a responsible plan. Your ward wants you against any deal. Some say the cut list was written around one contractor's spread — and whatever you say tonight gets replayed in the primary.",
        choices: [
          {
            id: "fiscal_deal",
            text: "Back the cut-for-headroom deal, on the record, as damage control",
            note: "Betting the establishment and the markets remember who stopped the bleeding. Risk: your base files you under 'cleaned up after Wall Street'.",
            outcomes: {
              crit: { body: "The bill passes and the business page calls you a local voice willing to be responsible. Bankers and caucus staff reach for you at the same time." },
              ok: { body: "You pick the winning side. A door inside the party opens a crack. On your block they start calling you one of them." },
              meh: { body: "You spoke for a measure nobody can name. Neither side keeps you." },
              fail: { body: "Rates and fuel climb the week it passes. Your district remembers only whose vote it was." },
              critfail: { body: "The automatic trigger lands, and the first thing cut in your district is a veterans' clinic. The paper runs your quote: there was no choice." }
            }
          },
          {
            id: "refuse_ceiling",
            text: "Refuse everything; reframe the standoff as a verdict on waste",
            note: "Betting the anger holds your side. Risk: on the day of actual default, you are the one who forced it.",
            outcomes: {
              crit: { body: "Someone else blinks. You never softened once. The street prints your line on a sign, and for the first time money arrives from outside the county." },
              ok: { body: "You held the line. The ward is delighted; the party stops returning your calls." },
              meh: { body: "You shout loudly into a news cycle that has already moved to another name." },
              fail: { body: "Benefit checks arrive a week late. Your district discovers that no-compromise has a price." },
              critfail: { body: "A technical default happens and the rating falls again. The hearing invites you because you were the loudest man on the stage." }
            }
          },
          {
            id: "quiet_work",
            text: "Pick no side; work the district's loans and pension questions",
            note: "Boring, cheap and deniable. Risk: in a national fight, being unreadable looks like being absent.",
            outcomes: {
              crit: { body: "While the country argues you broker two bridge loans. It works, and nobody writes you into either version of the story." },
              ok: { body: "You handle small facts and touch no slogans." },
              meh: { body: "These weeks pass without anyone thinking of you. You think of no one either." },
              fail: { body: "Both camps ask which side you are on. Your answer sounds like: neither." },
              critfail: { body: "A reporter files a piece with one line about your district: while the country stood at the cliff, their representative was finishing paperwork." }
            }
          }
        ]
      },

      /* ---------------- 2012-09 · Benghazi ---------------- */
      {
        id: "ln12_benghazi",
        title: "The consulate in Benghazi is attacked; four Americans are dead",
        body: "At 10:30 at night a rocket lands in an aging compound on the desert's edge, and then nine hours of gunfire and of calls for help that do not arrive.\n" +
          "The ambassador dies. By the next morning the official account blames a protest video — though this same compound had been hit before, and its request for more security had been declined. That approval chain can be read out, one declined paper at a time.\n" +
          "Cable asks the same question all week: in those nine hours, who called whom. It is six weeks before the election, and anything you call procedure will be replayed nightly.\n" +
          "Some say a quick-reaction element was in range in the first hours. Decide whether you want the facts or the team.",
        choices: [
          {
            id: "demand_probe",
            text: "Demand an independent inquiry, minute by minute",
            note: "Betting the record eventually vindicates you. Risk: if nothing surfaces, you are the one who made noise over dead people.",
            outcomes: {
              crit: { body: "Months later the hearing record is released, and your first letter is the earliest document in it. Somebody inside the intelligence committee admits: at least someone was watching." },
              ok: { body: "You pin the question to the agenda. The party resents you; the papers print your letter." },
              meh: { body: "Your statement is filed politely and stops being a story in two weeks." },
              fail: { body: "The inquiry fizzles, and you are written up as someone who uses the dead." },
              critfail: { body: "The emails you asked to be released are cut into an advertisement, and the families are hired as the backdrop." }
            }
          },
          {
            id: "steady",
            text: "Ask for facts before heads: don't assign blame while people are still being rescued",
            note: "Betting that steadiness reads as judgment later. Risk: composure sounds like covering.",
            outcomes: {
              crit: { body: "In hindsight you were one of the few who did not shout. A door in the establishment stays open for a year." },
              ok: { body: "You say the calm thing, get cursed at from both directions for a day, and settle into ordinary." },
              meh: { body: "Nobody notices your restraint. Nobody disputes it either." },
              fail: { body: "Your opponent writes your line for you: he is defending the people who gave the orders." },
              critfail: { body: "The released cables show the calls were in fact dropped — and you had said on camera that nothing was delayed." }
            }
          },
          {
            id: "family_first",
            text: "Say nothing about blame; handle the funerals and the paperwork for the families",
            outcomes: {
              crit: { body: "You personally clear the transport paperwork for one family. Months later, in the local paper, that spouse names only you." },
              ok: { body: "You do the small correct things and join no argument." },
              meh: { body: "You attend, stand at the back, and draw no attention." },
              fail: { body: "Someone asks at the door why you are only ever photographed here and never on the record." },
              critfail: { body: "A picture of you at the dinner table after the service starts circulating with one line under it." }
            }
          },
          {
            id: "say_very_little",
            text: "Release one line of condolence and never say the word accountability",
            note: "Betting this is not your fight. Risk: silence is a position too, and nobody keeps notes for you.",
            outcomes: {
              crit: { body: "The wording is careful and a family secretary sends back one thank-you. The county paper puts your name in the fourth paragraph." },
              ok: { body: "The statement goes out and a bigger headline covers it the same day. Nobody comes back for more." },
              meh: { body: "Nobody quotes you. Nobody challenges you either. The month passes." },
              fail: { body: "A reporter waits at your office until dark and prints 'declined to respond'." },
              critfail: { body: "The call log from those nine hours is released, and one number in it is one you once saved. You never explain a word." }
            }
          },
          {
            id: "hold_session",
            text: "Hold a public hearing at home and read the security approval chain out, one declined request at a time",
            note: "Betting the procedure speaks for you. Risk: whoever you read out remembers you.",
            outcomes: {
              crit: { body: "The transcript is online the same day. By the seventh declined request, cable finally has footage it can run." },
              ok: { body: "The procedure is completed and the file is archived. The party says you jumped the gun; the paper says you did the reading." },
              meh: { body: "Eleven people come. Next morning's front page is the ballgame." },
              fail: { body: "A witness reverses on the stand, and your hearing is written up as a funeral you staged for yourself." },
              critfail: { body: "Your witness turns out to be tied to the contractor's lobbying shop. The whole session becomes their fundraising mailer." }
            }
          },
          {
            id: "sign_subpoena",
            text: "Sign the subpoena: the minute-by-minute record of those nine hours, produced by a deadline",
            note: "Betting your procedural power actually opens the executive's door. Risk: if it does not, you overreached on camera.",
            outcomes: {
              crit: { body: "The subpoena is served and the log arrives two weeks later. You read the first minute of those nine hours out loud on national television." },
              ok: { body: "Part of it is produced — enough for three stories. You become the standing voice for the word accountability." },
              meh: { body: "The subpoena turns into a scheduling fight, and the court sets it after the election." },
              fail: { body: "A court voids it on jurisdiction. Your opponent prints the ruling ten thousand times." },
              critfail: { body: "The subpoena is ruled a partisan act, your committee seat is suspended first, and the inquiry turns around and walks into your own office." }
            }
          }
        ]
      },

      /* ---------------- 2012-10 · Hurricane Sandy ---------------- */
      {
        id: "ln12_sandy",
        title: "Hurricane Sandy floods the shore districts and blows the transformers",
        body: "The surge goes into the tunnel and the basements. Seven boroughs lose power, heating oil cannot get across the bridges, and people queue all night at a pump that is dry.\n" +
          "Somebody keeps insulin in a cooler with a flashlight on it. It is one week before the election.\n" +
          "Relief money has to pass a federal disaster declaration — the state files it, Washington approves it, and only then does cash move — which means weeks, not days. The grid here is private: restoration follows contract, not need.\n" +
          "The camera wants mud on your shoes. Some say the power gets fixed wherever the money is. Who the rebuilding money finally reaches is not visible yet.",
        choices: [
          {
            id: "frontline",
            text: "Be everywhere: open the office, move ice and fuel, get on camera",
            note: "Betting visible labor converts straight into trust. Risk: the wrong sentence is broadcast with the mud still on you.",
            outcomes: {
              crit: { body: "Four days beside a generator. The county paper's front page is your photograph, and the block remembers it for the rest of your career." },
              ok: { body: "You moved boxes and made calls, and people know they were looked after." },
              meh: { body: "You were there; the cameras mostly found the governor and the National Guard." },
              fail: { body: "You tell a line of people waiting for fuel that procedure has to be followed. That clip runs for three days." },
              critfail: { body: "On the third night without heat someone is hurt, and the reporter has your earlier quote about overreaction." }
            }
          },
          {
            id: "push_fed",
            text: "Escalate: force the state to file for a federal declaration",
            note: "Betting real money beats real sympathy. Risk: the party machine dislikes whoever grabs the microphone.",
            outcomes: {
              crit: { body: "The declaration comes through and the first rebuilding tranche follows the list you wrote. The party admits you can move something." },
              ok: { body: "You win the slot. It is still slow, but the money is in motion." },
              meh: { body: "Your filing is received. The answer is that it is under evaluation." },
              fail: { body: "The request comes back once, and the refiling misses the window. Your district waits six more weeks." },
              critfail: { body: "The loss schedule you submitted turns out to be padded, and the federal auditor wants the page with your signature." }
            }
          },
          {
            id: "keep_shelter",
            text: "Hold your own patch: run shelters, stay out of the politics",
            outcomes: {
              crit: { body: "Your shelter is the only light in that neighborhood all week. The church puts your name in the memorial booklet." },
              ok: { body: "You opened what needed opening and filed what needed filing." },
              meh: { body: "You kept your small square running. Nobody tells you what happened outside it." },
              fail: { body: "One family stands two hours at your door before someone lets them in, and a radio host sees it." },
              critfail: { body: "A photo of the shelter's missing blankets goes up online with three words: this door was closed." }
            }
          }
        ]
      },

      /* ---------------- 2012-11 · Election night ---------------- */
      {
        id: "ln12_election",
        title: "Election night ends early, and the winner starts lining up the next term",
        body: "The count is done by two in the morning. The incumbent keeps a second term; the loser's phone is not answered.\n" +
          "Your party settles two questions in one night: who stays, and who is blamed. Patronage and committee posts reset from tonight.\n" +
          "Local television wants to know what this means for the district — a district whose returns did not match the national direction. Both factions are recruiting, and both lists are due Friday.\n" +
          "Some say a seat has already been kept for you on the transition team, the incoming president's staff before inauguration. Where tonight's choice puts you in five years is the only question worth answering.",
        choices: [
          {
            id: "bandwagon",
            text: "Call the winner before the crowd does, and pitch district business",
            note: "Betting you get into the first round of the new list. Risk: the old team files you under first to run.",
            outcomes: {
              crit: { body: "Two weeks later the transition calls, and your project lands on a priority list. You are now the person who can talk to both rooms." },
              ok: { body: "Your name goes on page one of the new list. Former colleagues cross the hallway to avoid you." },
              meh: { body: "Your congratulations are noted, and nothing follows." },
              fail: { body: "You get written up as the swiftest turncoat in the state, and neither side fully trusts you." },
              critfail: { body: "The recording of that call leaks. On it you explain the district's own loss to the winner. The old guard reads it as a sale." }
            }
          },
          {
            id: "hold_base",
            text: "Make no calls; go home and carry the ward's anger into the city",
            note: "Betting the fury becomes leverage by spring. Risk: nobody in the new circle learns your name.",
            outcomes: {
              crit: { body: "You turn the ward's rage into a written platform, and it is your document on the table at the February caucus." },
              ok: { body: "You become the only courier between the block and the new machine. Not dignified; not skippable." },
              meh: { body: "You hold three meetings. Your name is not on the city's list." },
              fail: { body: "You spoke for angry people, and the new party starts asking about your other relationships." },
              critfail: { body: "You are used as the loss's sample case, and the county paper reaches for a word: agitator." }
            }
          },
          {
            id: "host_night",
            text: "Throw your own results night and put both camps in one room",
            note: "Betting a good party makes you independent of both sides. Risk: a failed party is a public failure.",
            outcomes: {
              crit: { body: "Everyone in town comes, and you stand at the door welcoming them. Next morning both lists carry your name." },
              ok: { body: "The night works, the money is visible, and you have a reputation: the one who assembles a room." },
              meh: { body: "Few people come, the bill is real, and only you know what it cost." },
              fail: { body: "The microphone feeds back, there is not enough to drink, the winner never appears. Local pages run it as a joke." },
              critfail: { body: "Somebody finds the invoices routed through a contractor, and the filing does not match the reporting." }
            }
          },
          {
            id: "local_only",
            text: "Make no national judgment tonight; keep the district running",
            note: "Boring, deniable. Risk: in a night of alignment, showing no color eventually becomes a color.",
            outcomes: {
              crit: { body: "You spend the night at a pumping station signing forms. Two weeks on, the incoming team asks for the one officeholder who was still at work." },
              ok: { body: "You appear on neither list, and the work gets done anyway." },
              meh: { body: "This night is not about you, and neither is tomorrow's agenda." },
              fail: { body: "Both sides ask the same question: what were you doing that night. It lands like an accusation." },
              critfail: { body: "He took no side is printed as a charge, and both camps use the same sentence." }
            }
          }
        ]
      },

      /* ---------------- 2012-12 · Sandy Hook ---------------- */
      {
        id: "ln12_hookes",
        title: "A Connecticut elementary school is shot into; twenty children are dead",
        body: "On a Friday morning a rural school spends two hours under gunfire. Twenty children and six adults.\n" +
          "By afternoon the country has moved from shock to the next thing: which law gets changed. Parents gather in a church that can only hold half of them,\n" +
          "and the names being read aloud belong to a town in another state. Your party is split before the candles go out.\n" +
          "Schools in your district reopen tomorrow and there are not enough counselors or guards. A bill requiring a background check — mandatory screening of a buyer before a purchase — is already being drafted at the capitol, while gun voters still decide the next election in your party's math.\n" +
          "Some say it will be amended down to symbolism. You get one public sentence.",
        choices: [
          {
            id: "push_laws",
            text: "Co-sponsor the restrictions immediately, first name on the list",
            note: "Betting the public wave outruns the party. Risk: the state machine keeps a record of your name.",
            outcomes: {
              crit: { body: "The bill clears the state's upper chamber and national morning shows introduce you as the one who led it. Suburban women start opening their own doors." },
              ok: { body: "You said it first. The party's calls turn cold; the newspapers write you kindly." },
              meh: { body: "You signed. The bill sits in committee until summer, and nobody recalls the signatures." },
              fail: { body: "The bill dies on procedure, and your few names get the blame distributed." },
              critfail: { body: "The other side prints a flyer — he wants to take your guns — and puts your name at the top of it in every precinct." }
            }
          },
          {
            id: "fund_local",
            text: "Skip the legislation; pay for counseling and school entry security now",
            note: "Betting small concrete work outlasts a national argument. Risk: being accused of dodging the question.",
            outcomes: {
              crit: { body: "On the day before school reopens, every classroom has a trained adult. A neighboring county copies your template, and the parents know whose money it was." },
              ok: { body: "The money lands and something real is built. Nobody mentions you in the national debate." },
              meh: { body: "The appropriation clears; the money arrives next spring." },
              fail: { body: "Someone asks why, after children died, all you will do is sign a check." },
              critfail: { body: "Two vendors on the purchase list match your donor file, and somebody holds both sheets up at a press conference." }
            }
          },
          {
            id: "grieve_only",
            text: "Attend the vigils; say not one word about policy",
            outcomes: {
              crit: { body: "At the candlelit gathering you read names and never once mention legislation. Afterwards a parent says: he was the only one who wasn't talking about himself." },
              ok: { body: "You show up, you stand there, you don't misspeak." },
              meh: { body: "You are in the crowd, unnoticed and unaccused." },
              fail: { body: "A father asks on the way out whether you intend to change anything. You don't answer." },
              critfail: { body: "A cropped photo of you glancing at your watch at the vigil starts to travel." }
            }
          }
        ]
      },

      /* ---------------- 2013-04 · Boston Marathon ---------------- */
      {
        id: "ln13_boston",
        title: "Two blasts at the marathon finish line; three dead, hundreds injured",
        body: "At 2:49 in the afternoon two homemade pressure cookers go off on both sides of the finish line. Seventeen hours later a police officer is killed,\n" +
          "and a shelter-in-place order keeps the whole city indoors: shops shut, transit stopped. By day three, strangers on the internet are naming suspects —\n" +
          "including one dead man who had nothing to do with it. Your phone stops asking about casualties and starts asking who we can believe.\n" +
          "The leads are real and the released portion is tiny, and the outlets hate a blank. Two minority-owned storefronts nearby have already been treated as targets.\n" +
          "Whether a second cell is still outside, nobody will say tonight.",
        choices: [
          {
            id: "surge",
            text: "Throw every body into the sweep and the cordon; stand in the command post",
            note: "Betting speed and force read as competence. Risk: you sign for the wrong door kicked in.",
            outcomes: {
              crit: { body: "The cordon holds with no disorder, and those days in the command post get written into the city's account of itself. Law enforcement remembers your name." },
              ok: { body: "You commit everything and things hold — except for a couple of shops searched on a guess." },
              meh: { body: "You attend. The incident command does not need an extra body." },
              fail: { body: "The orders contradict each other, and for two hours no one knows whether to open or shut." },
              critfail: { body: "A bad search gets filmed and uploaded. Your signature is on the warrant on that door." }
            }
          },
          {
            id: "fund_tips",
            text: "Pay for the plumbing: hotlines, interpreters, compensation for wrongly hit shops",
            note: "Betting service outlives statement. Risk: money looks like a purchase of quiet.",
            outcomes: {
              crit: { body: "Two lines and a roster of interpreters keep the sweep from dying on a language barrier, and the searched shops get made whole. The community keeps this ledger." },
              ok: { body: "You spend where it is visible. Nobody is left standing outside." },
              meh: { body: "The budget is approved; it lands in summer." },
              fail: { body: "Someone asks who set the standard for compensation, and the answer sounds improvised." },
              critfail: { body: "Three names on the payout list match your donors, and the headline writes itself." }
            }
          },
          {
            id: "calm_facts",
            text: "Publish one line: no naming anyone, wait for the official release",
            outcomes: {
              crit: { body: "In those two days of online accusation you are among the few locals who name nobody. The shopkeeper who was falsely targeted comes and shakes your hand." },
              ok: { body: "You add no noise and leave no mark." },
              meh: { body: "Your statement is short. Nobody forwards it." },
              fail: { body: "Some decide your silence is protecting somebody, and their reason is that you said nothing." },
              critfail: { body: "'Why won't he talk' becomes a standing question on the local drive-time shows." }
            }
          }
        ]
      },

      /* ---------------- 2013-06 · Snowden / surveillance ---------------- */
      {
        id: "ln13_snowden",
        title: "A contractor's documents expose bulk phone and internet collection",
        body: "In the first week of June two newspapers publish court orders: bulk telephone records, and internet data pulled at the switch. Within a month,\n" +
          "how many calls did you make is a national refrain. The programs were approved by the FISA court, the secret bench that signs surveillance orders, and how much gets disclosed is the executive's call.\n" +
          "The agencies say it is lawful and has saved lives. Two local firms report stalled contracts, and your own office runs its phones and files on subcontracted cloud services.\n" +
          "Your local lawyers have one question: when a client talks to me, are you listening. Some say far more was collected than was reported.",
        choices: [
          {
            id: "oversee",
            text: "Demand the standing orders be unsealed, with audits and a sunset clause",
            note: "Betting middle-class and tech anger outlasts the cycle. Risk: law enforcement counts you as opposition.",
            outcomes: {
              crit: { body: "Your amendment clears committee, and the technology press names you one of the few politicians who actually reads the filings." },
              ok: { body: "You fix the question onto the agenda. Insiders begin treating you as someone worth negotiating with." },
              meh: { body: "Your bill is filed for another election." },
              fail: { body: "A foiled plot is invoked against you, and your reform becomes the thing that ties our hands." },
              critfail: { body: "At the hearing somebody produces an old photograph of you beside a foreign foundation's banner, and the question stops being oversight and becomes whose side you are on." }
            }
          },
          {
            id: "back_agency",
            text: "Stand with the agencies: lawful, effective, and we do not disarm ourselves on camera",
            note: "Betting fear outlasts fury. Risk: when opinion turns you are standing in yesterday's spot.",
            outcomes: {
              crit: { body: "You are handed a seat at the intelligence committee's first briefing. The agencies start counting you as one of their own." },
              ok: { body: "You say the hard thing in a closed room. Your side keeps the score; the other side has one line about you." },
              meh: { body: "Your statement earns one line on the security page." },
              fail: { body: "A small business owner whose file was pulled comes to ask what your sentence was worth to him." },
              critfail: { body: "The records show a local group really was on the list — and you had said on television that nobody was targeted." }
            }
          },
          {
            id: "local_rights",
            text: "Skip the national argument; audit your own county's files and wire authority",
            note: "Low, boring and defensible. Risk: on a night of grand accusations, housekeeping reads as evasion.",
            outcomes: {
              crit: { body: "You find two devices the sheriff's office ran without an order, clean it up quietly, and keep it off the national feed. The bar association writes you a letter." },
              ok: { body: "You tidy your own paperwork. Nobody notices; nobody is harmed." },
              meh: { body: "You read a few hundred pages of local contracts and find nothing." },
              fail: { body: "While looking into other people's authorizations, somebody looks into yours." },
              critfail: { body: "He signed one himself goes in the last sentence of the article." }
            }
          },
          {
            id: "own_wires",
            text: "Say nothing; move your own office's phones and files onto a vendor that does not answer that court",
            note: "Betting this ends as a nuisance rather than a scandal. Risk: staying clean is not the same as being safe.",
            outcomes: {
              crit: { body: "Two weeks after the switch a bulk request does land in your county, and none of your lines are in it. Staff start saying 'he keeps records' as a compliment." },
              ok: { body: "You change vendors, the bill goes up a little, and nothing lands on you." },
              meh: { body: "You spend a month on it and nobody knows you spent it." },
              fail: { body: "The switching invoice surfaces locally, under the headline 'what is he afraid of'." },
              critfail: { body: "Your new vendor is named in the same week. The man dodging the story becomes the man with something to hide." }
            }
          },
          {
            id: "write_position",
            text: "Publish a six-page memo: which orders should be public, which statute should change",
            note: "Betting paper outlasts slogans. Risk: whoever writes it clearly gets questioned line by line.",
            outcomes: {
              crit: { body: "Two national papers run your memo and the tech crowd prints it as a handbook. From now on the debate quotes your categories." },
              ok: { body: "The memo is read seriously for two days. Your name goes on the list of people who do the work." },
              meh: { body: "The file sits on your site with eight downloads." },
              fail: { body: "A security-desk reporter finds two amateur sentences, and the tone moves from competent to reaching." },
              critfail: { body: "You wrote that none of this touches domestic numbers. New documents appear the next day. That sentence follows you." }
            }
          },
          {
            id: "vote_sunsets",
            text: "Put your own authority on the ballot: the clause lapses unless a public vote renews it",
            note: "Betting you will trade your procedural seat for one national decision. Risk: if the vote fails, you are the one who let the collection go.",
            outcomes: {
              crit: { body: "The clause goes to a forced reauthorization debate. You spend three minutes on national television explaining why a government must ask permission to read your records, and people quote those three minutes for years." },
              ok: { body: "Renewal comes attached to a public reporting duty. Small, but now it is on the record." },
              meh: { body: "Your amendment is parked in procedure, leaving only a number." },
              fail: { body: "A foiled attack ends the debate that night. Your vote becomes the thing done to us at a time like this." },
              critfail: { body: "The reauthorization fails, and it surfaces that your office took money from a technology contractor before the vote. Both sides start calling you a traitor." }
            }
          }
        ]
      },

      /* ---------------- 2013-10 · Government shutdown ---------------- */
      {
        id: "ln13_shutdown",
        title: "The healthcare funding standoff shuts the federal government for seventeen days",
        body: "A shutdown means non-essential agencies stop the day funding lapses. Federal employees who cannot be paid are sent home. Park gates are chained, visa queues double, inspections stop.\n" +
          "A year before the midterms, your phone is half questions about park access and half about whether a small-business loan can close — hundreds of local shops live on federal contracts.\n" +
          "The same seventeen days have two descriptions: holding a principle, or using somebody's paycheck as a hostage.\n" +
          "Both parties' approval is falling and voters are looking for somebody to blame; a continuing resolution only buys until December. Somebody is already drafting the statement that blames the other side.",
        choices: [
          {
            id: "pressure",
            text: "Call it a repeal by other means; demand the checks be cashed first",
            note: "Betting that independents hate gridlock more than they hate the law. Risk: you absorb all of the ward's fury.",
            outcomes: {
              crit: { body: "The seventeenth-day deal is written in your phrasing, and your line runs all autumn on the morning shows." },
              ok: { body: "You shout effectively. The party dislikes you; the local chamber of commerce starts speaking for you." },
              meh: { body: "Your statement is one of forty identical statements." },
              fail: { body: "The resolution ends in a compromise anyway, and you become the one who scattered the troops." },
              critfail: { body: "Every closed park and skipped inspection for those weeks gets billed publicly to your sentence about not negotiating." }
            }
          },
          {
            id: "bridge",
            text: "Run between both sides: advance local money yourself, open a temporary window",
            note: "Betting service inoculates you against both camps' abuse. Risk: the money you front never comes back.",
            outcomes: {
              crit: { body: "Reserve money from your office keeps two food banks and a stack of loan applications alive, and both sides start inviting you to meetings." },
              ok: { body: "You work, pay, and keep quiet. People are grateful and so is your accountant." },
              meh: { body: "The window opens, the money goes out, the outcome is neither big nor small." },
              fail: { body: "Somebody calls your advance the purchase of a good word with other people's money." },
              critfail: { body: "The assistance roster gets compared against the contribution file, and seven names line up." }
            }
          },
          {
            id: "keep_running",
            text: "Stay out of the standoff and keep every local service open",
            outcomes: {
              crit: { body: "For those seventeen days you come to work and make calls about loans. Nobody files a story about you, but the people in line know you were there." },
              ok: { body: "You keep your own small desk running. That is all, and that is it." },
              meh: { body: "Those seventeen days pass as if they never happened." },
              fail: { body: "Someone asks which side you are on and you cannot produce an answer." },
              critfail: { body: "He did nothing at the worst moment goes into an opponent's standing pitch." }
            }
          }
        ]
      },

      /* ---------------- 2014-08 · Ferguson ---------------- */
      {
        id: "ln14_ferguson",
        title: "A young man is shot by an officer, and one street burns for ten days",
        body: "After the midday gunfire, that street becomes two countries inside ten days: one carrying his name in a march, the other a line of armored vehicles and flash-bangs.\n" +
          "The National Guard is called in, reporters are detained. The autopsy and the ballistics exist, but the file is sealed to everyone except the grand jury, the citizen panel that decides whether to indict — and it will not decide until autumn.\n" +
          "Your phone is one side saying he was unarmed, and the other side saying: dare not to trust the police. The force's makeup does not resemble the population it patrols.\n" +
          "Some say the officer had complaints nobody processed. Either verdict costs a street, and that is true of your words too.",
        choices: [
          {
            id: "march",
            text: "Walk the whole stretch of that street with the marchers",
            note: "Betting the street's energy becomes your vote next year. Risk: the officers' families and the shopkeepers stop inviting you.",
            outcomes: {
              crit: { body: "You walk at the front and are photographed helping up someone who fainted. National uses three seconds; the local paper uses the whole front page." },
              ok: { body: "You walk all of it. Radicals start taking your calls; the officers' association issues a very cold statement." },
              meh: { body: "You go, stand in the middle, and belong to nobody." },
              fail: { body: "Two shops are broken that night, and the owners ask what you actually did while you were out there." },
              critfail: { body: "The picture of you in that crowd runs under the headline Patron of the Mobs, in every precinct." }
            }
          },
          {
            id: "back_police",
            text: "Stand with the officers publicly: read the file before you convict anyone",
            note: "Betting that fear of disorder outruns outrage, and that the merchant money follows. Risk: a no-bill decision makes you the man who spoke for the weapon.",
            outcomes: {
              crit: { body: "The officers' association gives you its only public thank-you, and the chamber's money comes to you for the first time without being asked." },
              ok: { body: "You hold the law-and-order side. Their doors are open; the block's are shut." },
              meh: { body: "You make a procedural remark. Nobody adds a grievance and nobody forgives one." },
              fail: { body: "The no-bill announcement comes that night, and one of your windows does not survive it." },
              critfail: { body: "Audio leaks from a closed merchant lunch where you said the boy had his own problems. It plays in your district for a month." }
            }
          },
          {
            id: "roundtable",
            text: "Pull both sides back to a table: joint council, open data, independent review",
            note: "Betting you can be everybody's opponent and still keep the meeting. Risk: when it collapses, both sides blame the host.",
            outcomes: {
              crit: { body: "The council produces the county's first published use-of-force table, and national reporters come to copy your format." },
              ok: { body: "Three hours at a table; both sides insult you on the way out, but the spreadsheet survives." },
              meh: { body: "The meeting is held, the minutes are written, nothing follows." },
              fail: { body: "One faction walks, and the morning paper's headline is that he cannot set a table." },
              critfail: { body: "The departing side releases the private concessions you offered them, and both camps declare you are not the interlocutor." }
            }
          },
          {
            id: "records_only",
            text: "Say nothing; just push the procedure that opens the file and the complaint records",
            note: "Low, slow, deniable. Risk: while a street is burning, process can read as abstention.",
            outcomes: {
              crit: { body: "The complaint-disclosure form you pushed takes effect in the autumn, and is cited in a different case two months later. Nobody thanks you, but the road is open." },
              ok: { body: "You move only procedure. Both sides are unhappy and neither can fault you." },
              meh: { body: "You file the request and wait for an answer." },
              fail: { body: "A reporter asks how you feel about the indictment and you say you are waiting on procedure. Both camps use that quote." },
              critfail: { body: "He is waiting on procedure gets printed on the back of a protest sign." }
            }
          }
        ]
      }
    ],

    /* 世界线 · 2011—2014 英文覆盖（outlets 均为当年真实存在的美国媒体）。 */
    worldline: {
      brief: {
        "2011": "The decade of war gets a full stop, and the wallet is cut open in public: people begin to wonder who the word \"recovery\" is actually meant for.",
        "2012": "Election year. Every disaster lands one week before the vote, and every word of comfort is converted into ballots.",
        "2013": "People are busy checking their own call records while finding out the government cannot even issue paychecks — anger and embarrassment mix into one thing.",
        "2014": "On one street people hold up names and dodge flash-bangs; who polices, and whom policing serves, start to look like two different questions."
      },
      outlets: {
        "2011": ["CNN", "USA Today", "The Huffington Post", "Salon", "Breitbart News", "Politico"],
        "2012": ["CNN", "The New York Times", "USA Today", "Politico", "The Daily Beast", "The Huffington Post"],
        "2013": ["CNN", "USA Today", "The Washington Post", "Slate", "Twitter", "Breitbart News"],
        "2014": ["CNN", "Vox", "The Intercept", "USA Today", "The New York Times", "Breitbart News"]
      }
    }
  }
});
