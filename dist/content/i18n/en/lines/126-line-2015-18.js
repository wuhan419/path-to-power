/* ============================================================================
 * CONTENT · i18n/en/lines/126-line-2015-18.js
 * 中文文件 content/events/126-line-2015-18.js 的英文覆盖层（Track B · B7 波段）。
 *
 * 契约（与样板分片 i18n/en/events/106-era-1990.js 一致，详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices 按 id 对齐，terms 不带 id 按下标对齐。
 *   · 纯字符串数组（known / rumor / unknown）是**整体替换**，必须整条给全。
 *   · 结构性键（id / minYear / maxYear / tierMin / weight / base / mods / effects /
 *     flags / req / cost / month / grade …）由引擎保护，这里一个都不写。
 *   · worldline 的 brief / outlets 不在保护名单里，可以在英文层整体改写。
 *
 * 英文写法：按英语重写，不是逐字翻。第二人称、现在时、短句；机构名用真实英文
 * （CNN、Fox News、Politico…）；除 Mueller 一案的「the special counsel」之外不点真人姓名。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ============================================================
       * 2015-01 · Paris newsroom attack and the march
       * ========================================================== */
      {
        id: "ln15_charlie",
        title: "A satirical newsroom in Paris is stormed; four days later the city marches",
        body: "One midday in January, two armed men walk into the offices of a satirical weekly in Paris. Twelve people are killed, among them several cartoonists, a columnist and two police officers. The reason is a strip of drawings published years ago.\n" +
          "Four days later the city fills up: a column of people over a kilometre long, heads of state walking in the front rank. The same afternoon, newsrooms here close their doors to argue one question — do we reprint those drawings. Your phone starts ringing then.",
        brief: {
          lede: "The attack happened in another country. The exam is set on your side: reprint it, march in it, put your name on it.",
          known: [
            "The weekly had been sued over those drawings, and its office had asked for protection.",
            "The march is set for four days out; several governments confirm their principals will walk front.",
            "Half a dozen papers here are meeting behind closed doors about reprinting.",
            "Your district has halal grocers, and a returned foreign-correspondent you once drank with."
          ],
          rumor: [
            "Some say an earlier security memo never reached the newsroom.",
            "Some say the march is a stage being set for next week's bill."
          ],
          unknown: [
            "Whether the line around speech gets redrawn from this week on.",
            "What your wording this January gets used for, five years from now."
          ],
          terms: [
            { k: "Satirical weekly", v: "A paper whose standing content is political cartoon and mockery." },
            { k: "Reprinting", v: "A foreign paper republishing the drawings that brought the attack — itself a position." }
          ]
        },
        choices: [
          {
            id: "window_sign",
            text: "Hang one sheet on your office door and say nothing else",
            note: "Betting this is not your fight. Risk: a piece of paper on a door gets read as a position anyway.",
            outcomes: {
              crit: { body: "The wording is exactly right: mourning, no commentary. The weekly city paper photographs it for an inside-page corner, and nobody finds a fault in it." },
              ok: { body: "You put the sheet up, answer two visitors with the same sentence, and go back inside to work." },
              meh: { body: "The sheet hangs there a week. Nobody stops to read it." },
              fail: { body: "Someone photographs it and asks why you did not write more. You do not answer." },
              critfail: { body: "Somebody changes one word on that sheet, and the altered version circulates your district for a week." }
            }
          },
          {
            id: "small_vigil",
            text: "Hold a twenty-person vigil on the library steps and invite nobody to speak",
            note: "Small, steady, off the national feed. Risk: what nobody remembers is also what nobody defends.",
            outcomes: {
              crit: { body: "Twenty people come, one of them the owner of the halal grocer. Later he tells people that they were asked, that night." },
              ok: { body: "The candles burn an hour and the crowd disperses quietly. Everyone who needed to see, saw." },
              meh: { body: "Eight people come, half of them returning library books." },
              fail: { body: "A counter-poster goes up the next day saying this vigil lights candles for one side only. You never wrote a line." },
              critfail: { body: "The local paper gives it six words: 'no speeches given, ended.' You managed to hold an event that did not happen." }
            }
          },
          {
            id: "republish",
            text: "Have the local chain reprint those drawings, with one editorial attached",
            note: "Betting that respect outlives fear. Risk: the till on your street closes over it today.",
            outcomes: {
              crit: { body: "The drawings run on the front page and the editorial takes one column. Three campus papers ask to license your layout, and the press association puts your name in the first paragraph of its annual statement." },
              ok: { body: "The page goes out; abuse and thanks come in equal halves. At least you have one sentence you can be quoted for." },
              meh: { body: "You paid for the space and the drawings ran on page eleven. Nobody turned that far." },
              fail: { body: "Two advertisers pull on the second day, under a headline about making locals pay for somebody else's cartoons." },
              critfail: { body: "One local congregation reads the reprinted panel as something else entirely, and your party cuts you loose the same day. Somebody starts asking, line by line, what the page cost and who paid." }
            }
          },
          {
            id: "letters_back",
            text: "Write two open letters — to the embassy and to the national press association — and put your position into clauses",
            note: "A statement only pays if it becomes a clause. Risk: clauses get interrogated word by word.",
            outcomes: {
              crit: { body: "The association adopts all three of your clauses and the embassy pins your letter in its hall. Somebody in national print writes 'a local representative of the people notes' before your sentence." },
              ok: { body: "Your letters get a serious reply, and one sentence of yours survives into it. That is enough." },
              meh: { body: "Both letters go out; both come back as templates." },
              fail: { body: "A reporter finds a hole in your second clause, and the association publicly distances itself from your wording." },
              critfail: { body: "Your letter is translated back to you with a copy of this country's own press code attached, marked in pencil: the author of this letter plainly never read it." }
            }
          },
          {
            id: "march_front",
            text: "Fly to Paris, walk in the front rank, and file the bill the day you get home",
            note: "The front rank is a national camera. Risk: afterward you have to answer for that photograph all the way down.",
            outcomes: {
              crit: { body: "The photograph of the shoulder-to-shoulder walk leads every national paper. The bill you file the morning after landing clears its first committee inside two weeks." },
              ok: { body: "You stood where you should stand and said what needed saying. Your party is pleased; a slice of your voters think you went too far." },
              meh: { body: "You are in the thirteenth row and no camera finds you. Somebody asks once about the airfare." },
              fail: { body: "The country's attention moves on the next day and the bill you carried home does not move one word. People start calling the trip a subsidised sightseeing tour." },
              critfail: { body: "The photograph does get used — in your opponent's fundraising appeal, with the itemised cost of your delegation read out underneath." }
            }
          },
          {
            id: "floor_vote",
            text: "Put the vote itself on the table: an open motion, a recorded roll call, nobody allowed to be vague",
            note: "Betting you will turn your own ballot into a public record. Risk: if the direction is wrong, that name follows you ten years.",
            outcomes: {
              crit: { body: "A newsroom later frames that roll-call sheet. You spend three minutes on national television drawing one line about what speech costs a democracy, and people quote those three minutes for years." },
              ok: { body: "Your motion enters the record. It may not pass, but from today anyone taking a position has to cite your clause first." },
              meh: { body: "The motion is scheduled for next session, which is to say into the drawer." },
              fail: { body: "The vote fails, and you are written up as using other people's blood to push your own bill. Your party asks you to slow down." },
              critfail: { body: "Under your name on that roll-call sheet sits a second, harsher provision your own office quietly withdrew the same week. 'One rule for the camera' gets made into a chart." }
            }
          }
        ]
      },

      /* ============================================================
       * 2015-06 · nationwide marriage ruling
       * ========================================================== */
      {
        id: "ln15_marriage",
        title: "The Supreme Court legalizes same-sex marriage; state bans die overnight",
        body: "One morning in late June, five of nine justices write it down: marriage cannot turn on sex. By noon two lines stand outside courthouses in the South —\n" +
          "couples waiting to file papers, and protesters waiting to be seen.\n" +
          "A couple you have known for twenty years is on one side of your phone. The deacons of the church that funds you are on the other. Both call before dinner.",
        brief: {
          lede: "The ruling is finished. All that is left is a local voice to say what it means.",
          known: [
            "The decision already binds every county. Both camps want your verdict within forty-eight hours.",
            "Young voters in your district are waiting on your first sentence.",
            "The church deacons are already sitting in your conference room.",
            "You can edit the wording. You cannot edit the ruling."
          ],
          rumor: [
            "Some say the churches have their own political slate, and the money is already wired.",
            "Some say your opponent wants a moral brawl to cover a story of his own."
          ],
          unknown: [
            "How many times a primary debate will ask you this question.",
            "Which donor checks reroute because of one phrase you chose."
          ],
          terms: [
            { k: "Religious exemption", v: "A claim to skip equal-treatment rules on grounds of faith." }
          ]
        },
        choices: [
          {
            id: "register",
            text: "Run the licensing office even-handedly and say nothing about right or wrong",
            outcomes: {
              crit: { body: "The clerk's office runs an orderly day and neither side finds one word to quote. Somebody upstairs notes that you handle messy problems." },
              ok: { body: "You take no side and the county stays calm for a day. That counts as a result." },
              meh: { body: "You say something about procedure and the rule of law. Nobody files it away." },
              fail: { body: "Both camps read your silence as cowardice. People start saying your name with a question mark." },
              critfail: { body: "You try to touch nothing, and both sides decide you are secretly the other side's asset." }
            }
          },
          {
            id: "celebrate",
            text: "Celebrate in public: call the ruling a win for equal rights",
            note: "Bet that the tide is on your side. Risk: your party's church wing stops speaking to you on the spot.",
            outcomes: {
              crit: { body: "Your lines get clipped and shared all week. Young voters file your face under the right side of history. The church phones stop reaching you." },
              ok: { body: "You move with the tide. New supporters count you in; old ones quietly redirect their checks." },
              meh: { body: "You offer congratulations. Bigger names cover the sound." },
              fail: { body: "In a deep-faith district you talk equality, and the churches describe you as someone who came to lecture them." },
              critfail: { body: "Your celebration is cut into your opponent's ad, and pastors read your name out during the Sunday collection." }
            }
          },
          {
            id: "faith",
            text: "Speak for the church: lead with exemption, call the ruling overreach",
            note: "Bet that the religious right's anger buys you an endorsement. Risk: swing voters memorize the sentence.",
            outcomes: {
              crit: { body: "You turn conscience clauses into a plan people can quote. Church networks treat you as one of their own, and party operatives start handing you the microphone." },
              ok: { body: "You hold the church line and the leadership is pleased. The newly married couples downtown go cold on you." },
              meh: { body: "You recite an old argument. Nobody hears anything new." },
              fail: { body: "Your stance gets rewritten as refusing to issue marriage papers, and the ground war starts that night." },
              critfail: { body: "Your hardest sentence plays back word by word. Local businesses start publishing their distance from you." }
            }
          },
          {
            id: "roundtable",
            text: "Pay for a round table: seat the church and the merchants at one table",
            note: "Money can hold both camps in chairs once. Risk: nobody thanks you and the bill is yours.",
            outcomes: {
              crit: { body: "The table ends with an unwritten local line: papers get issued, nobody mobilizes. Merchants think you understand business; the church thinks you gave them a way down." },
              ok: { body: "The meeting does not turn ugly and friction drops one notch. You pay, and each side owes you half a favor." },
              meh: { body: "Everyone came, everyone argued, and you earn one sentence: he means well." },
              fail: { body: "After the meeting breaks up both sides call you a fence-sitter. The money buys no thanks." },
              critfail: { body: "Someone films the dinner as merchants' money buying church silence. Both camps walk away at once." }
            }
          }
        ]
      },

      /* ============================================================
       * 2015-07 · church shooting and the battle flag
       * ========================================================== */
      {
        id: "ln15_charleston",
        title: "After the church shooting, the battle flag comes down from the statehouse",
        body: "A prayer meeting is interrupted, and parishioners die inside their own church. The gunman loved that flag, and the photograph is all over the internet by morning.\n" +
          "The mourners are barely buried when the state starts shouting about whether the banner should come off the roof. The first second after you open your mouth, both sides are recording.",
        brief: {
          lede: "The dead are barely buried when the living start tallying a piece of cloth.",
          known: [
            "Taking the flag down takes procedure — and procedure can be stalled. You hold the process.",
            "Leaders of both parties in the state are waiting for a local figure to speak first.",
            "Veteran families and newer voters in your district each hold votes."
          ],
          rumor: [
            "Some say the removal is already decided and they only need someone to blame.",
            "Some say the flag defenders were pushed onto the stage by donated money."
          ],
          unknown: [
            "How many times this cloth will be waved at you in a primary.",
            "Who will cut your wording into an ad two years from now."
          ],
          terms: [
            { k: "Confederate battle flag", v: "The Southern army's war banner, widely read as a racial symbol." }
          ]
        },
        choices: [
          {
            id: "mourn",
            text: "Attend the funerals and the fundraisers; say nothing about the flag",
            outcomes: {
              crit: { body: "You stand at every service until the last hymn and argue nothing. Church people and both communities agree on one thing: he did not use them." },
              ok: { body: "You send flowers, you raise money, you say nothing wrong and nothing that sticks." },
              meh: { body: "You came, you bowed, you left. Nobody remembers you in the room." },
              fail: { body: "Someone asks how you could stay quiet about a flag. What else are you afraid to say?" },
              critfail: { body: "Your silence gets written up as avoiding the eyes of the families who buried their own." }
            }
          },
          {
            id: "remove",
            text: "Lead the call to take the flag off the statehouse roof",
            note: "Bet that grief outruns heritage. Risk: military families remember it forever.",
            outcomes: {
              crit: { body: "The flag comes down within a week of your statement. Business groups and party leaders file you under people who know which way the wind blows, and the chamber of commerce opens its door for the first time." },
              ok: { body: "You pick the right week: companies lean in, leadership follows. Someone walks out of the veterans' hall when you arrive." },
              meh: { body: "You call for removal; someone else executes it. The credit is not yours." },
              fail: { body: "The flag stays and the fire lands on you: he hates our grandparents." },
              critfail: { body: "Somebody else takes the flag down, and you are the only target left standing. Families from the armed services block your office door." }
            }
          },
          {
            id: "heritage",
            text: "Defend the flag: treat history as something you do not concede",
            note: "Bet that the base's anger converts into a nomination. Risk: national media mount you as a specimen.",
            outcomes: {
              crit: { body: "You recast the ancestors' banner as a lesson locals like to hear. Money arrives from small towns, and the old factions write your name into the book." },
              ok: { body: "You keep the flag and the crowd, and the party's small donations land the same day; out-of-state money and pens turn against you." },
              meh: { body: "You give the old speech after the news cycle moved on." },
              fail: { body: "You defend the flag while the country is still mourning, and a newspaper lays your face beside the killer's." },
              critfail: { body: "That sentence follows you for life. Local companies sign a letter demanding you leave the caucus, and your donation account empties overnight." }
            }
          },
          {
            id: "fund",
            text: "Fund a memorial trust and a background-check hearing",
            note: "Money can move the story from the flag to the paperwork. Risk: both sides say you bought the quiet.",
            outcomes: {
              crit: { body: "The trust actually opens an account, and the hearing is the first in the state. Families read your name out loud — not as a politician, as the one who paid and showed up." },
              ok: { body: "You get half of it done, and the papers give you one good day." },
              meh: { body: "The money is out, the hearing held, and the flag is still tomorrow's front page." },
              fail: { body: "Somebody checks your books: he is buying the appearance of grief." },
              critfail: { body: "The trust's ledgers get printed next to your photograph, and the families ask you publicly to stop using their names." }
            }
          }
        ]
      },

      /* ============================================================
       * 2016-01 · poisoned tap water
       * ========================================================== */
      {
        id: "ln16_flint",
        title: "The water turns brown after the city switches sources; lab results climb",
        body: "To save money the city starts drawing from the river, nobody keeps up the corrosion treatment, and lead leaves the pipe scale and comes out of kitchen taps.\n" +
          "The state's line is that the water meets standard. The county hospital's numbers keep climbing. Half your calls are furious parents; the other half are officials afraid for the plants.",
        brief: {
          lede: "The data is in your hands, the explanation belongs to the state, the anger is in the street.",
          known: [
            "State lab reports show elevated lead.",
            "The federal line is vague; a declared emergency takes political nerve.",
            "The treatment plant and two factories are the town's payroll.",
            "Which numbers you publish is, right now, your call."
          ],
          rumor: [
            "Some say leadership knew early and simply never signed anything.",
            "Some say the source switch was made to clear room for a contract."
          ],
          unknown: [
            "How long this tap water will chase you.",
            "Whoever speaks first sets the tone for everyone else."
          ],
          terms: [
            { k: "State of emergency", v: "A declaration that unlocks federal resources and money." }
          ]
        },
        choices: [
          {
            id: "bottle",
            text: "Send volunteers door to door with bottled water; do not grab the camera",
            outcomes: {
              crit: { body: "When the trucks run out you use your own legs, and after a few weeks the blocks know your car. Nobody gives you a byline, and nobody can say you were absent." },
              ok: { body: "Water reaches the houses that needed it, and you never say one bad word about the governor." },
              meh: { body: "You handed out water. That is all it was." },
              fail: { body: "Some say handing out bottles only covers for the people upstairs, and parents stand in front of your car." },
              critfail: { body: "Photos of your pallets get one caption: he delivers water, they drink it." }
            }
          },
          {
            id: "release",
            text: "Publish the testing data and force the state to declare an emergency",
            note: "Bet that truth outruns procedure. Risk: the establishment closes its doors on you.",
            outcomes: {
              crit: { body: "Network trucks arrive the same night and the federal line changes under pressure. Regulators and enforcement both note who sounded the alarm." },
              ok: { body: "You light the fire and they finally send someone to look. Your party posts stop being an asset." },
              meh: { body: "You publish the numbers and nobody can read them; the media want something scarier." },
              fail: { body: "Your data is dismissed as bad sampling, and the state opens a review of your office instead." },
              critfail: { body: "The investigation turns around: not you examining them, them examining you. Your name is on the file cover." }
            }
          },
          {
            id: "jobs",
            text: "Protect the official line: blame the old pipes, keep the plants open first",
            note: "Bet the town fears unemployment more than tap water. Risk: parents will tape that sentence to your door.",
            outcomes: {
              crit: { body: "The plants stay open, owners sign a thank-you, and for the first time the party's money men list you as one of theirs." },
              ok: { body: "Jobs hold, and the block's anger changes direction — toward you." },
              meh: { body: "You say what the companies wanted heard. Nothing else happens." },
              fail: { body: "A mother walks into your rally with her child's lab sheet, and that photograph beats any editorial." },
              critfail: { body: "It later surfaces that you saw the internal memo. Three words follow you onto next year's ballot: he knew." }
            }
          },
          {
            id: "audit",
            text: "Pay for an outside survey of the pipe network and a replacement plan",
            note: "Getting it done is the sturdiest answer. Risk: slow, and every dollar is billed to you.",
            outcomes: {
              crit: { body: "Your survey becomes the only technical document the state can use, and regulators and establishment both ask you to explain it. Locally you are now the one who knows water." },
              ok: { body: "The report gets a hearing; the money buys you a seat in the process." },
              meh: { body: "The report sits in a drawer and the water is still brown." },
              fail: { body: "An out-of-state firm takes your money and moves slowly, and the town's phrase for you becomes: he does business." },
              critfail: { body: "Contract ties to your name get dug up. The pipes do not get replaced first — you do." }
            }
          }
        ]
      },

      /* ============================================================
       * 2016-06 · night club shooting
       * ========================================================== */
      {
        id: "ln16_orlando",
        title: "A mass shooting at a night club; the vigil and the gun march come the same week",
        body: "One night the city's club becomes the place where the whole country keeps vigil, and the room that treated a lot of people as family never reopens. The same week, the state's gun march goes out as scheduled.\n" +
          "Counterterrorism, hate, gun rules, a community's safety — four questions ask you in one week: how are you going to say it.",
        brief: {
          lede: "One night of dead, claimed by three camps as evidence for their own case.",
          known: [
            "Motive and any extremist link are still open; the wording is unsettled.",
            "Your party wants you to speak of hate; another camp wants you to speak of safety.",
            "Local clubs and community organizations are waiting for your call."
          ],
          rumor: [
            "Some say your opponent has a draft ready and is waiting for you to step on the line.",
            "Some say the state intends to pass a powers bill in this week's mood."
          ],
          unknown: [
            "Which version of your statement lands in autumn's mobilization ads.",
            "Which nerve is actually this district's."
          ],
          terms: [
            { k: "Half-staff", v: "The official flag lowered in mourning after a mass death." }
          ]
        },
        choices: [
          {
            id: "aftercare",
            text: "Handle the funerals and the aid; stay off the national debate stage",
            outcomes: {
              crit: { body: "You get hearses, interpreters, compensation and escorts sorted one by one, and somebody in the community says it: he did not perform." },
              ok: { body: "You do the quiet work. You do not win the shot and you do not make a mistake." },
              meh: { body: "You were there and did what was needed. The national script has no lines for you." },
              fail: { body: "People ask: does he not think he owes us a word? Silence becomes a statement." },
              critfail: { body: "Your low profile gets cut into a clip that says he went nowhere that week." }
            }
          },
          {
            id: "security",
            text: "Frame it as terrorism and demand harder security and screening",
            note: "Bet that fear sells better than grief. Risk: the community hears you spending their dead.",
            outcomes: {
              crit: { body: "Your security language becomes local consensus; hawks and the defense crowd treat you as someone who gets things through, and the expanded-powers bill rides in behind you." },
              ok: { body: "You take the hard line. The applause comes from outside, the booing from home." },
              meh: { body: "You make your demand; nobody wanted a new bill that week." },
              fail: { body: "Businesses in the named community write a joint letter: please stop using us as your example." },
              critfail: { body: "Your name gets printed on a leaflet beside legislating with the dead, and it goes to every door." }
            }
          },
          {
            id: "access",
            text: "Say plainly this is an access problem and push background checks",
            note: "Bet that the dead outweigh the counties. Risk: gun country nails you to a billboard.",
            outcomes: {
              crit: { body: "You say the right sentence during mourning week, and the counts of young voters and new registrations both rise. The party machine starts looking for someone else to talk to." },
              ok: { body: "You say the gun sentence. The city applauds, the farmland shakes its head." },
              meh: { body: "You raise screening, but a louder voice has already buried it." },
              fail: { body: "Gun counties splice your name with he wants our guns, and the rally is held on your steps." },
              critfail: { body: "Your statement becomes the opposition's fundraising page, and your own party buys half the state's radio time to talk about you." }
            }
          },
          {
            id: "vigil",
            text: "Pay for vigils, voter registration and safe escorts",
            note: "Money can turn grief into an organization. Risk: some say you threw your own party.",
            outcomes: {
              crit: { body: "The vigil runs in order, the registration table stretches to the corner, and hundreds of new names enter the roll — all of them remember whose night it was." },
              ok: { body: "Crowds, order, and forms that were not printed in vain. You spent once and got a small crew." },
              meh: { body: "The event happens, the crew does not, and the money runs off like water." },
              fail: { body: "Somebody works out your ledger: the vigil's costs ended up in your own campaign." },
              critfail: { body: "Families jointly refuse your money, and the headline reads: he held his own celebration." }
            }
          }
        ]
      },

      /* ============================================================
       * 2017-05 · the bureau chief is dismissed
       * ========================================================== */
      {
        id: "ln17_comey",
        title: "The FBI director is dismissed without warning; a buried case hits the street",
        body: "One letter, less than half a day, and the director loses his job while his plane is still overseas. The investigation nobody would discuss is now a chant in squares and a cable argument.\n" +
          "Your party says stop feeding the fire. Your base says stop holding your tongue. The cameras are waiting for one word from you: transition, interference, or purge.",
        brief: {
          lede: "A chair is emptied, and everyone asks who should be sitting in it.",
          known: [
            "The stated reasons keep changing; the documents have not been released.",
            "A committee is already preparing to summon sitting officials.",
            "Both parties' ground floors are waiting on the word you use tonight."
          ],
          rumor: [
            "Some say the replacement is meant to let the investigation cool by itself.",
            "Some say the findings already exist and were simply never written down."
          ],
          unknown: [
            "Whether this hole grows into an independent counsel.",
            "Whether your one sentence becomes a subpoena or an endorsement."
          ],
          terms: [
            { k: "Special counsel", v: "A prosecutor independent of the Justice Department, assigned to one case." }
          ]
        },
        choices: [
          {
            id: "paper",
            text: "Ignore the personnel story; demand only the documents and the budget",
            outcomes: {
              crit: { body: "You dodge every shout and ask the narrowest procedural questions. Committee staff start sending you material first." },
              ok: { body: "You talk files, budgets, process. You offend nobody and make no headline." },
              meh: { body: "Your technical questions drop into a deep well." },
              fail: { body: "Both sides think you stepped around the point: today he would not say the plain thing." },
              critfail: { body: "Your process-only position reads as covering for somebody, and trust falls one notch on both sides." }
            }
          },
          {
            id: "counsel",
            text: "Call publicly for an independent investigation and distance yourself",
            note: "Bet that procedure is worth more than party loyalty. Risk: party resources route around you.",
            outcomes: {
              crit: { body: "You are the first at your level to say the word independent. Crowds chant your name, lawyers and columnists claim you as one of their own, and doors inside your party get narrower." },
              ok: { body: "You demand independence, the public buys it, and your party marks you unreliable." },
              meh: { body: "You say it; twenty people already said it today." },
              fail: { body: "The wind shifts and your demand is cut into: he wanted to destabilize the investigation first." },
              critfail: { body: "You become the first cost on your party's list — the fundraiser, the party post, the local endorsement, all withdrawn." }
            }
          },
          {
            id: "loyal",
            text: "Say the dismissal was right: he should have gone earlier",
            note: "Bet that the people in power remember who stood up for them on the worst day. Risk: media mount you as their sample.",
            outcomes: {
              crit: { body: "On the loudest day you give the White House one full, clean defense. Insiders start feeding you information on their own, and the party's donor lists move you to the first line." },
              ok: { body: "You take the field for them and they credit you. Small donations arrive the same day, while old house money drifts elsewhere." },
              meh: { body: "You said the loyal thing, but so did everybody, and loyalty is cheap this month." },
              fail: { body: "The inquiry proves your framing unsupportable, and the paper calls you a man who excuses obstruction." },
              critfail: { body: "Every sentence of your defense is footnoted as evidence of interference, and law enforcement moves you onto its untrusted list." }
            }
          },
          {
            id: "callround",
            text: "Use your contacts to map the investigation's edges and keep something back",
            note: "Favors buy position, not innocence. Risk: the debt comes due.",
            outcomes: {
              crit: { body: "From old ties inside law enforcement you learn exactly where the line runs and which files will land on which desk. That head start is worth a whole term." },
              ok: { body: "You learn the half of it nobody else knows. Small, but enough to stay off the line." },
              meh: { body: "You spend the favor and get back three sentences of boilerplate." },
              fail: { body: "Somebody writes down what you asked: who sent him? Both camps start guarding their doors." },
              critfail: { body: "One casual question gets reported as an attempt to reach investigators, and a subpoena is on the way." }
            }
          }
        ]
      },

      /* ============================================================
       * 2017-08 · torch march and one sentence
       * ========================================================== */
      {
        id: "ln17_charlottesville",
        title: "Torch marchers cross a college town; the wording does not change",
        body: "A unity rally brings torches and shouting into a college town's night, and the next day a car drives into a crowd. The country waits for one sentence naming it, and gets both sides instead.\n" +
          "Your donors push you to talk about where the violence comes from. Your party pushes you not to. Halls and churches in your district write to you the same day.",
        brief: {
          lede: "How wide you draw one sentence matters tonight more than how many police you send.",
          known: [
            "Rallies need permits, and keeping the peace in this town runs through you.",
            "The national line is already set; locally you can follow it or get ahead of it.",
            "Two donors ask on the same morning whether you will do television."
          ],
          rumor: [
            "Some say your opponent has old photographs ready, waiting for you to lose your head.",
            "Some say the state is already drafting a plan to cancel the next permit."
          ],
          unknown: [
            "Which version of your wording gets printed on next autumn's ballot.",
            "Which side's money reroutes because of how you phrased it."
          ],
          terms: [
            { k: "Torch march", v: "A night parade used by white supremacist groups as theater." }
          ]
        },
        choices: [
          {
            id: "protect",
            text: "Talk only about policing and permits: hold the town, skip the national shows",
            outcomes: {
              crit: { body: "Both columns stay two blocks apart and nobody bleeds all day. Even your opponents concede afterward: on those days he did his job." },
              ok: { body: "You set the permits, the routes and the shifts, and say nothing about the meaning of any of it." },
              meh: { body: "You work a full week; the national play has no scene for you." },
              fail: { body: "Someone asks you in the square: what were they shouting last night, and why did you not say it?" },
              critfail: { body: "You turn keeping order into both sides having equal rights, and two communities cut you off in the same week." }
            }
          },
          {
            id: "name",
            text: "Name white supremacy and criticize the national line out loud",
            note: "Bet that conscience buys reputation beyond your party. Risk: the machine treats you as a turncoat.",
            outcomes: {
              crit: { body: "Your verdict gets quoted nationally; business groups and churches write to you, and inside your party someone starts asking why we keep him." },
              ok: { body: "You say the sentence that needed saying. Your name travels past your party's borders and a couple of donor calls stop coming." },
              meh: { body: "You join in, a day behind most everyone." },
              fail: { body: "A party fundraising letter uses you as the cautionary sample: he will not speak for us." },
              critfail: { body: "Your name appears on a purge list — county post, primary endorsement, and your seat at the dinner, all removed." }
            }
          },
          {
            id: "both",
            text: "Stay with both sides and secure your own camp first",
            note: "Bet your donors hate a verdict more than a shrug. Risk: the country uses you as the cold-blooded example.",
            outcomes: {
              crit: { body: "Your line about shared responsibility runs on loop on party radio, donation emails pair your name with the give button, and the people above decide you are dependable at a bad moment." },
              ok: { body: "You hold your own faction and the party's money lands in your account first. What you cannot hold is the look in everyone else's eye." },
              meh: { body: "You repeat a safe sentence; nobody praises it and nobody remembers it." },
              fail: { body: "A local family whose neighbor died asks reporters: does he think the person hit by the car was also at fault?" },
              critfail: { body: "Your sentence goes into the opposition's fundraising ad, and the county's minority organizations stop taking your calls." }
            }
          },
          {
            id: "townhall",
            text: "Pay for a multiracial town hall and seat both sides in one room",
            note: "Spending buys one conversation and a chair you need not pick a side from. Risk: both sides call it theater.",
            outcomes: {
              crit: { body: "Three hours of shouting and nobody slams a door; the next day's headline is not a torch for once. Locally you are the one who can get people in a room." },
              ok: { body: "The room fills, the fire does not spread." },
              meh: { body: "You paid, and the people who came already agreed with you." },
              fail: { body: "Both sides walk out, and the paper writes that his round table only seated his own people." },
              critfail: { body: "Your event gets trashed as a private celebration staged on public grief, and two churches send their distancing letters on the same day." }
            }
          }
        ]
      },

      /* ============================================================
       * 2017-09 · two hurricanes, one broken chain
       * ========================================================== */
      {
        id: "ln17_harvey",
        title: "Two hurricanes land weeks apart, and the relief chain breaks at both ends",
        body: "One storm drops a week of rain and puts water over rooftops; two weeks later a second one sends an island back to the age of diesel generators.\n" +
          "Rescue calls queue in the hundreds, shelters run short of beds, and pallets sit on an airport apron waiting for a signature. Upstairs says the process is running. Survivors ask where you were yesterday.",
        brief: {
          lede: "After the wind stops, what decides who lives is the dispatch, the signature and the camera.",
          known: [
            "Supplies have arrived; release and distribution are stuck in someone else's process.",
            "The National Guard can move, but only if a local government asks.",
            "Shelters in your district are over capacity and churches are taking people in."
          ],
          rumor: [
            "Some say the rebuilding contracts already went to an out-of-state firm.",
            "Some say the line from above is: keep the bad news off television."
          ],
          unknown: [
            "Whether voters remember the rebuilding money in two years.",
            "Whoever says the relief failed first owns the argument."
          ],
          terms: [
            { k: "Major disaster declaration", v: "The state asks, Washington approves, and only then do money and logistics unlock." }
          ]
        },
        choices: [
          {
            id: "shelter",
            text: "Open local buildings as shelters; no shouting and no blaming",
            outcomes: {
              crit: { body: "Schools, churches and a chamber of commerce warehouse all open in one night. What survivors remember is the bed, not the slogan." },
              ok: { body: "You opened doors and made beds. You were not on television and you made no mistake." },
              meh: { body: "You did the work. The national camera points elsewhere." },
              fail: { body: "Some say he only counts his own shelter and never asks what the next county lacks." },
              critfail: { body: "Photographs of your shelter's missing beds and missing medicine run with one caption: he opened the door, then left." }
            }
          },
          {
            id: "demand",
            text: "Publicly demand a federal declaration and name the failed response",
            note: "Bet the camera loves a local voice with nerve. Risk: money and process both route around you.",
            outcomes: {
              crit: { body: "Your clip from the apron replays nationally, and the declaration lands three days later. Upstairs remembers who pushed; the county remembers who delivered." },
              ok: { body: "You say it out loud and the money starts moving. Leadership adds you to the list of people to manage." },
              meh: { body: "You shouted; the declaration is still slow, and nobody counts you in the delay." },
              fail: { body: "Your criticism comes back as a man who cannot fix his own drainage, and a project of yours stalls upstairs." },
              critfail: { body: "You become the one who does not get along: your name moves to the bottom of the allocation list." }
            }
          },
          {
            id: "deploy",
            text: "Do not fight: spend favors on the Guard and equipment from neighboring states",
            note: "Turning relationships into fuel trucks is the fastest rescue. Risk: the favors run out and the rescue still fails.",
            outcomes: {
              crit: { body: "A few calls buy fuel, boats and two states' help, and the bridge reopens on day three. Military and establishment circles agree: he keeps his relationships warm." },
              ok: { body: "Equipment arrives, people live, and nobody knows who made the calls." },
              meh: { body: "You call in every favor; the men on the other end are waiting on someone else's call." },
              fail: { body: "You spend the favors and still cannot get vehicles, and people ask whether your friendships were only dinners." },
              critfail: { body: "The convoy never arrives, survivors crowd the courthouse steps, and the paper prints your name beside he only makes phone calls." }
            }
          },
          {
            id: "contracts",
            text: "Hand rebuilding contracts to local friends and steady your own camp first",
            note: "Bet that nobody audits money after a disaster. Risk: the people who read ledgers never ask about your intentions.",
            outcomes: {
              crit: { body: "Cash flows into local pockets, your machine runs at full speed, and for the first time you feel that rebuilding is a kind of power." },
              ok: { body: "The list gets divided, the camp holds, and the paper trail stays where it is." },
              meh: { body: "Contracts went out; the favors you now owe are bigger than you thought." },
              fail: { body: "A reporter sets your contract prices beside yesterday's spot quotes, and the headline is one word: profiteering." },
              critfail: { body: "A task force moves in and takes your accounts and your call logs. This time a warning is not on the table." }
            }
          }
        ]
      },

      /* ============================================================
       * 2018-02 · students set the agenda
       * ========================================================== */
      {
        id: "ln18_parkland",
        title: "Students carry signs to the statehouse; in March they walk nationally",
        body: "A high school whose staff and sheriff spent a night blaming each other becomes the starting point of a national student march; in March dozens of cities empty their classrooms.\n" +
          "The legislative window is weeks. Gun counties, donors ready to leave, and a video on your phone telling you to do something — all three are pushing.",
        brief: {
          lede: "A group of young people who cannot vote have just become the people setting the agenda.",
          known: [
            "Six weeks left in session, and nobody has counted the votes.",
            "Your district is half gun-owning families and half furious parents.",
            "The student organizers have already agreed on a time to meet you."
          ],
          rumor: [
            "Some say your opponent is paying for their buses and their signs.",
            "Some say the party has already decided that nothing will move."
          ],
          unknown: [
            "Which way these newly registered voters lean.",
            "Whether the hearing you hold today is an endorsement or an ad next year."
          ],
          terms: [
            { k: "Raise the age", v: "A proposal to lift the legal gun-purchase age from 18 to 21." }
          ]
        },
        choices: [
          {
            id: "schoolfirst",
            text: "Touch nothing about guns: only counseling, drills and alarms",
            outcomes: {
              crit: { body: "The budget is written so narrowly that parents and the school board both admit you did something, and neither side has a clip of you saying the wrong thing." },
              ok: { body: "You step around the ideology and do the technical work. Safe, and maybe useful." },
              meh: { body: "Your drill plan reads like a form. Nobody looks closely." },
              fail: { body: "A student asks in public: why not talk about guns? You say let us talk about what we can move, and the applause does not come." },
              critfail: { body: "Your detour gets cut into he is dodging the question, and the clip shows you walking away fast." }
            }
          },
          {
            id: "hear",
            text: "Hold a public hearing and let students ask you to your face",
            note: "Bet you can be examined on camera without collapsing. Risk: one bad minute runs for a year.",
            outcomes: {
              crit: { body: "A sixteen-year-old asks something you cannot answer, and you say honestly: I do not know, but I can go do it. That clip works harder than any ad you could buy." },
              ok: { body: "You survive the whole hearing. New voters note it; older ones think you got soft." },
              meh: { body: "The hearing happens, the questions get asked, nothing sticks." },
              fail: { body: "Your line about also mourning gets replayed until it means nothing, and someone overlays photographs of the dead." },
              critfail: { body: "You come apart under questioning, and that one minute opens next year's opponent ad." }
            }
          },
          {
            id: "backbill",
            text: "Endorse background checks and a higher purchase age, and spend one fight",
            note: "Bet national weather outweighs your district's lists. Risk: gun counties replace your billboard with a target.",
            outcomes: {
              crit: { body: "The bill passes on your vote, and national groups list you among those who dared. Someone hangs a banner for you outside the gun shop in town." },
              ok: { body: "You take the reform side. Young money arrives; old money asks where you are going next." },
              meh: { body: "You support it, and the caucus already plans to keep your name in the middle of the pack." },
              fail: { body: "The bill dies in committee, and the gun side puts your words on radio for a whole week." },
              critfail: { body: "Party machinery turns on you: a primary opponent, outside cash, and one coordinated message — he is against the Second Amendment." }
            }
          },
          {
            id: "recruit",
            text: "Fund a crew and sign these new faces under your own banner",
            note: "Turn a movement into an organization, and become the owner of it. Risk: buying an abacus with your money.",
            outcomes: {
              crit: { body: "Registration tables, phone volunteers and two young candidates all run on your machine. Two years later, when they describe the day they got into this, the story is about you." },
              ok: { body: "You get a small crew and a good story, and the books still look clean." },
              meh: { body: "The money goes out, the kids thank you, and then they walk their own road." },
              fail: { body: "You are accused of turning student anger into your own campaign, and two organizers cut you off publicly." },
              critfail: { body: "Your donor list turns out to run through the gun supply chain, and the operator becomes the defendant." }
            }
          }
        ]
      },

      /* ============================================================
       * 2018-11 · the wave redraws the roster
       * ========================================================== */
      {
        id: "ln18_midterm",
        title: "Midterms: a record number of women run, and a pink wave redraws the slate",
        body: "The filing numbers this year are the largest in decades, and a large share belong to teachers, nurses and minority women running for the first time. One ballot is redrawing both parties' faces.\n" +
          "The state party wants you on stage with the new faces. Old colleagues want you to hold the line. Your donors only want to know where your money and your weekends are going.",
        brief: {
          lede: "A wave that is not yours is rewriting your party's slate.",
          known: [
            "Your party's local slate gained a dozen new faces overnight.",
            "Field staff and money get allocated per person, and whoever declares first picks.",
            "Your own seat is safe; your rank inside the party is not."
          ],
          rumor: [
            "Some say leadership wants to swap a few senior names for new ones.",
            "Some say this wind will not survive one primary."
          ],
          unknown: [
            "Whether these two years' faces decide your seniority next term.",
            "Whether the people you lift will lift you back."
          ],
          terms: [
            { k: "Pink wave", v: "A candidate surge marked by record numbers of women running for office." }
          ]
        },
        choices: [
          {
            id: "ownrace",
            text: "Help nobody: hold your own seat and talk only local issues",
            outcomes: {
              crit: { body: "After the wave recedes you are still standing there, and both camps discover they still have to work with you. Not near the front of the line — but on the list." },
              ok: { body: "You back no one and offend no one, and quietly hold your patch of ground." },
              meh: { body: "This election has no voice of yours, and nobody smears you either." },
              fail: { body: "Both camps note that he did not show up for the fight." },
              critfail: { body: "After the reshuffle you are counted as nobody's, and you draw the last seats." }
            }
          },
          {
            id: "wave",
            text: "Bet on the new faces: carry this wave on stage nationally",
            note: "Bet the wind holds two more years. Risk: the machine remembers who jumped first.",
            outcomes: {
              crit: { body: "You spend the fall at the podium for the most electable newcomers, and on election night they thank you first from the stage. In the incoming caucus, your name is on page one." },
              ok: { body: "You catch some of the wind. The newcomers credit you; the veterans start guarding their doors." },
              meh: { body: "You stood on stage, and younger faces took all of it." },
              fail: { body: "The wind misses your district, and old colleagues read back, one by one, everything you said about them." },
              critfail: { body: "Everyone you lifted loses, and the machine files you as the man who helped tear his own roof off." }
            }
          },
          {
            id: "machine",
            text: "Protect the old machine: spend money and favors on established candidates",
            note: "Bet that party rank outlasts street weather. Risk: the new factions remember who blocked them.",
            outcomes: {
              crit: { body: "The senior names keep their seats, and the caucus keeps a chair for you near the front. In machine circles your sign means reliable." },
              ok: { body: "You did the work for the old lineup and upstairs remembers. The people just arriving start routing around you." },
              meh: { body: "You paid, they won, and nobody credits you for it." },
              fail: { body: "The incumbent loses the state that mattered, and the machine bites back: he picked this direction." },
              critfail: { body: "In the post-mortem you are served up as the sample of the old machine, and even the people who vouched for you look away." }
            }
          },
          {
            id: "sponsor",
            text: "Fund your own team out of pocket and sign the newcomers to your ledger",
            note: "Be a shareholder in the wave rather than an audience. Risk: money and people both grow legs.",
            outcomes: {
              crit: { body: "Three newcomers win and two of them campaigned for you; on the party's new roster you are the one handing out seats." },
              ok: { body: "You buy yourself a lane of your own, and the ledger has new partners in it." },
              meh: { body: "The money lands, the takers thank you, and then they run for somebody else." },
              fail: { body: "The candidates you signed call you a man who treated them as assets, and the new organization dissolves on the spot." },
              critfail: { body: "Your funding sources get pulled apart in public, and the kingmaker becomes the target of the inquiry." }
            }
          }
        ]
      }
    ],

    /* 世界线英文层：brief / outlets 不在保护名单，可整体改写（pressure 是数字，不动）。 */
    worldline: {
      brief: {
        "2015": "In one year the court, the church and the statehouse roof each lose a piece of agreed truth, and people start watching their own country on a phone.",
        "2016": "Anger stops caring which sign it walks under and only asks who will shout for it. Every prediction table fails in public this year, including the people reading them aloud.",
        "2017": "Investigation, torchlight and hurricanes take their turn in one year, and every city finds its emergency chain thinner than it believed.",
        "2018": "Guns, seats and faces all go on the table at once: people who never considered office walk into polling places, and onto ballots."
      },
      outlets: {
        "2015": ["CNN", "Fox News", "The New York Times", "USA Today", "The Huffington Post", "Breitbart News"],
        "2016": ["CNN", "Fox News", "The New York Times", "Twitter", "Facebook", "Breitbart News"],
        "2017": ["CNN", "Fox News", "The New York Times", "The Washington Post", "Politico", "The Huffington Post"],
        "2018": ["CNN", "Fox News", "The New York Times", "USA Today", "The Washington Post", "Twitter"]
      }
    }
  }
});
