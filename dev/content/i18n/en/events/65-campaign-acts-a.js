/* ============================================================================
 * CONTENT · i18n/en/events/65-campaign-acts-a.js
 * 中文文件 content/events/65-campaign-acts.js 的英文覆盖层（前半 · w22）。
 * 范围：按 id: 出现顺序的前 55 个 id —— camp_council_announce 至 camp_federal_primary
 * （含该卡 title/body/brief 与 defend / ideology 两个选项；steady_defend 及之后
 * 归 65-campaign-acts-b 分片）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices 里带 id 的按 id 对齐。
 *   · 纯字符串数组（known / unknown）是**整体替换**，条数与中文逐字一致（known 3 / unknown 1）。
 *   · 结构性键（id / era / tierMin / weight / base / mods / effects / cost …）不写。
 *   · 英文按英语重写：第二人称、现在时、短句；「」融进句子。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "camp_council_announce",
        title: "The announcement: put your name on the ballot",
        body: "Filing to run means a deposit, valid signatures, and a public financial disclosure. Either take the step officially, or size up the water before you jump.",
        brief: {
          lede: "Your first race ever: pay the filing fee, gather signatures, disclose your finances.",
          known: [
            "Nobody knows your name yet. In a district this small, being recognized wins ground.",
            "Miss the signature quota and your name never reaches the ballot.",
            "A loud launch bets on popularity; a quiet canvass bets on groundwork."
          ],
          unknown: [
            "A sloppy start brands you a filler candidate."
          ]
        },
        choices: [
          {
            id: "go_public",
            text: "Announce officially at a community rally",
            outcomes: {
              crit: { body: "The crowd nods along with every line. You gather the signatures that same day, and neighbors start remembering your name." },
              ok: { body: "The announcement goes smoothly, and the paperwork is filed." },
              meh: { body: "A handful of people show up. The applause is thin, but you did what had to be done." },
              fail: { body: "The room stays nearly empty, and you are still short of signatures." },
              critfail: { body: "You stumble over your lines, and someone challenges your financial disclosure on the spot." }
            }
          },
          {
            id: "quiet_start",
            text: "Sound out neighbors door by door, quietly",
            outcomes: {
              crit: { body: "You walk half the block in silence and learn who backs you and who won't. Solid footing." },
              ok: { body: "You collect honest opinions and lay real groundwork before the official start." },
              meh: { body: "Some are polite, some shut the door. You are still probing." },
              fail: { body: "Neighbors eye you warily: what exactly is it you want?" },
              critfail: { body: "The secret canvass leaks out. Critics call it back-room vote gathering." }
            }
          }
        ]
      },
      {
        id: "camp_council_grassroots",
        title: "Door to Door",
        body: "Turnout in local elections is shockingly low. A small, motivated crowd decides the result. Right now your campaign runs on foot.",
        brief: {
          lede: "Local turnout is tiny. Elbow grease alone can decide this race.",
          known: [
            "A few thousand mobilized voters settle the outcome.",
            "You have time and strong legs. What you lack is exposure and money.",
            "Churches and civic clubs put a roomful of voters in front of you at once."
          ],
          unknown: [
            "Play only defense and momentum quietly drains away."
          ]
        },
        choices: [
          {
            id: "doorknock",
            text: "Knock all week, one home at a time",
            outcomes: {
              crit: { body: "You befriend an entire street. Voters at the door promise to recruit their neighbors for you." },
              ok: { body: "Supporters pile up slowly. Your name no longer belongs to a stranger." },
              meh: { body: "Many doors stay shut, but you did meet voters." },
              fail: { body: "You go hoarse talking and have almost nothing to show for it." },
              critfail: { body: "You burn out — and residents file complaints about being harassed." }
            }
          },
          {
            id: "church_group",
            text: "Speak at churches and civic clubs",
            outcomes: {
              crit: { body: "Community leaders endorse you on the spot. The whole room becomes your base." },
              ok: { body: "You become a familiar face in several circles." },
              meh: { body: "People listen. Nobody commits." },
              fail: { body: "Your remarks do not land well in this crowd." },
              critfail: { body: "You say the wrong thing in the wrong room. The clubs turn cold, all at once." }
            }
          },
          {
            id: "hold_steady",
            text: "No gambles; hold the supporters you have",
            outcomes: {
              crit: { body: "You take no risks and still keep every voter you needed." },
              ok: { body: "Steady footing. The race holds, neither hot nor cold." },
              meh: { body: "No progress. No damage either." },
              fail: { body: "Too passive. Warmth slips away on its own." },
              critfail: { body: "So safe that you barely seem to be running. Support dips." }
            }
          }
        ]
      },

      /* ========================= 等级2：市议员（city）========================= */
      {
        id: "camp_city_announce",
        title: "Signing the Papers",
        body: "This time you are not helping out. You are contesting a real seat — against a fixture whose name everyone already knows.",
        brief: {
          lede: "You are running for a real seat now. The rival is a familiar face.",
          known: [
            "The incumbent has served for years. Everyone knows the name.",
            "A head-on challenge bets on reputation; a coalition first bets on roots.",
            "Waiting dodges the blades — and may surrender the initiative."
          ],
          unknown: [
            "Show your hand too early and a veteran opponent reads it."
          ]
        },
        choices: [
          {
            id: "challenge",
            text: "Challenge the incumbent head-on",
            outcomes: {
              crit: { body: "You press the incumbent's weakest issue without mercy. The local paper starts printing your name beside theirs." },
              ok: { body: "You settle firmly into the role of serious challenger." },
              meh: { body: "You are not a big name yet, but nobody underestimates you." },
              fail: { body: "One casual block from the incumbent exposes how green you are." },
              critfail: { body: "Your attack is turned against you. You look immature, not tough." }
            }
          },
          {
            id: "coalition",
            text: "Build the campaign team and coalition first",
            outcomes: {
              crit: { body: "Prominent locals join in open daylight. Overnight your campaign looks like a real operation." },
              ok: { body: "The team assembles. The machine starts to turn." },
              meh: { body: "Staffing is barely filled, and the gears still grind." },
              fail: { body: "Everyone you asked declines politely. The team stays thin." },
              critfail: { body: "Your core people defect to the opponent before the first vote." }
            }
          },
          {
            id: "test_water",
            text: "Keep your cards close; watch the incumbent",
            outcomes: {
              crit: { body: "You hold your nerve, learn the rival's habits, and gain a little ground." },
              ok: { body: "You stay put and hold your base steady." },
              meh: { body: "No move made, no weakness shown." },
              fail: { body: "Too passive. You lose the first half of the momentum battle." },
              critfail: { body: "Your hesitation reads as doubt. Support slips a touch." }
            }
          }
        ]
      },
      {
        id: "camp_city_townhall",
        title: "Town Hall Debate",
        body: "Your first time under one roof with the opponent, facing the same voters. Question and answer — nowhere to hide, nothing to duck.",
        brief: {
          lede: "First stage with your opponent. Question and answer, with nothing to hide behind.",
          known: [
            "The room is full of the people who can actually vote.",
            "Policy is the safe ground, attacks the risky one, silence the even keel.",
            "You are greener than the opponent — and fresher."
          ],
          unknown: [
            "One slip will be quoted back at you all campaign."
          ]
        },
        choices: [
          {
            id: "substance",
            text: "Answer head-on with concrete policy",
            outcomes: {
              crit: { body: "You break down the budget and zoning until it clicks for everyone. The applause says the rest." },
              ok: { body: "You handle every question well. The room files you under: the one who knows." },
              meh: { body: "Lukewarm. Nobody catches you out; nobody remembers you either." },
              fail: { body: "One sharp question stumps you, and you mumble past it." },
              critfail: { body: "A factual error gets called out live. The clip is already spreading." }
            }
          },
          {
            id: "attack",
            text: "Go hard on the opponent's record",
            outcomes: {
              crit: { body: "You drop a document your rival never wanted read. The whole room shifts on its axis." },
              ok: { body: "You keep the opponent on pure defense." },
              meh: { body: "The hits land without hurting. It reads as routine, not menace." },
              fail: { body: "Voters frown. All they hear now is mudslinging." },
              critfail: { body: "Your charges are disproven on the spot. Your credibility craters." }
            }
          },
          {
            id: "listen_more",
            text: "Talk less, listen more, offend no one",
            outcomes: {
              crit: { body: "The posture of genuine listening wins more goodwill than any line could." },
              ok: { body: "You answer steadily and leave nothing to grab hold of." },
              meh: { body: "Unremarkable, but safe." },
              fail: { body: "Too smooth. Voters decide you stand for nothing." },
              critfail: { body: "You dodge every question until the room turns cold." }
            }
          }
        ]
      },

      /* ========================= 等级3：州众议员（state）========================= */
      {
        id: "camp_state_announce",
        title: "Announcing for the State House",
        body: "Your district just grew from one street to a whole county. For the first time you need a real campaign machine — and a decent sum to start it.",
        brief: {
          lede: "The district grows from one street to an entire county.",
          known: [
            "You need a real campaign machine and seed money.",
            "A loud kickoff grabs the story; banking cash first steadies the floor.",
            "At this level, name recognition and money become hard requirements."
          ],
          unknown: [
            "A big machine with an empty account just idles."
          ]
        },
        choices: [
          {
            id: "big_bang",
            text: "Hold a press conference and launch loud",
            outcomes: {
              crit: { body: "Front page of the local paper, party heavyweights at your shoulder. You are suddenly in view." },
              ok: { body: "The announcement lands. The machine starts recruiting volunteers." },
              meh: { body: "A sparsely attended event, but one message got out: you are running." },
              fail: { body: "The launch is so quiet it might never have happened." },
              critfail: { body: "The event falls apart, and reporters write it up as a joke." }
            }
          },
          {
            id: "ground_first",
            text: "Bank the money and the people before announcing",
            outcomes: {
              crit: { body: "You stock the supply lines in silence. When you finally launch, you fire on everything." },
              ok: { body: "You show your face only once the seed money and the staff are in hand." },
              meh: { body: "Preparation runs long, but the foundation holds." },
              fail: { body: "The money never quite closes. The announcement keeps slipping." },
              critfail: { body: "The delay gets read one way only: too scared to run." }
            }
          }
        ]
      },
      {
        id: "camp_state_primary",
        title: "The Party Primary",
        body: "The first real fight is inside your own party. Win the nomination, or your name never reaches the general-election ballot.",
        brief: {
          lede: "The first hard fight is intra-party. Win the nomination or there is no general election.",
          known: [
            "Without your party's nomination, you cannot appear on the ballot at all.",
            "Mobilizing the base bets on fervor; courting the establishment bets on resources.",
            "Staying unaligned offends no one — and may please no one either."
          ],
          unknown: [
            "Back the wrong faction and you owe the party a debt after the vote."
          ]
        },
        choices: [
          {
            id: "base_vote",
            text: "Turn out your base",
            outcomes: {
              crit: { body: "You twist your supporters into one rope. The primary is settled in a single blow." },
              ok: { body: "You win the primary and take the nomination." },
              meh: { body: "A narrow win, and the party is not united behind you." },
              fail: { body: "The primary is a brawl. You nearly lose the nomination." },
              critfail: { body: "A brutal defeat. The party machine files you under expendable." }
            }
          },
          {
            id: "win_elites",
            text: "Win endorsements from the party establishment",
            outcomes: {
              crit: { body: "The party boss appears at your side. Your primary rivals decide not to try." },
              ok: { body: "The key endorsements land in your column." },
              meh: { body: "The establishment watches from the fence. You fight on your own." },
              fail: { body: "The party declines to help. You are left out in the cold." },
              critfail: { body: "The party quietly backs someone else — over your corpse, if needed." }
            }
          },
          {
            id: "stay_neutral",
            text: "Take no side; tend only your own base",
            outcomes: {
              crit: { body: "By staying out of the faction fight, you pull your own people in tighter." },
              ok: { body: "You offend no faction and walk through the primary." },
              meh: { body: "Nothing gained, nothing lost. The temperature holds." },
              fail: { body: "Without a clear stance, your presence dilutes." },
              critfail: { body: "Neither side buys what you are selling. Support dips." }
            }
          }
        ]
      },
      {
        id: "camp_state_rally",
        title: "The final campaign push",
        body: "The last sprint before the general election. Ads, rallies, handshakes — every scrap of attention has to be seized.",
        brief: {
          lede: "The last sprint before the election. Fight for every ounce of attention.",
          known: [
            "Ads burn money for exposure; canvassing burns energy for hearts.",
            "The war chest is finite. Dividing it is a math problem of its own.",
            "Moderate energy neither overdraws the account nor breaks through."
          ],
          unknown: [
            "Overspend or pinch too hard, and momentum leaks out of the race."
          ]
        },
        choices: [
          {
            id: "air_war",
            text: "Buy ads and fight the air war",
            outcomes: {
              crit: { body: "The spots hit with precision. Your name becomes a catchphrase in this district." },
              ok: { body: "Exposure climbs steadily. The bill comes due hourly." },
              meh: { body: "The ads run. The splash is small." },
              fail: { body: "Money spent. Voters unconvinced." },
              critfail: { body: "The spot flops — and the opponent re-cuts it into an attack ad against you." }
            }
          },
          {
            id: "boots",
            text: "Skip the ads; run it all on the ground",
            outcomes: {
              crit: { body: "You touch every mill town in the district. Voters start calling you one of their own." },
              ok: { body: "Step by step, the race trends your way." },
              meh: { body: "Exhausting but effective. Warmth accrues slowly." },
              fail: { body: "You win the pavement and lose the airwaves to the opponent." },
              critfail: { body: "One rally collapses — and the worst footage becomes the story." }
            }
          },
          {
            id: "measured",
            text: "A few events within budget; no burnout, no burn",
            outcomes: {
              crit: { body: "Perfect pacing. The team arrives at the finish line fresh." },
              ok: { body: "A steady drumbeat. Attention holds." },
              meh: { body: "Neither hot nor cold. A safe close." },
              fail: { body: "Your volume is modest. The opponent's is louder." },
              critfail: { body: "So cautious that the final sprint barely makes a sound." }
            }
          }
        ]
      },

      /* ========================= 等级4：州参议员（upper）========================= */
      {
        id: "camp_upper_announce",
        title: "Eyeing the State Senate seat",
        body: "The upper chamber: fewer seats, bigger stakes. An incumbent is leaving, and you are not the only one circling the opening.",
        brief: {
          lede: "The upper chamber has fewer seats and bigger stakes. One is opening.",
          known: [
            "An outgoing incumbent — and every ambitious name watching the seat.",
            "Declaring first seizes the narrative; waiting bets on stamina.",
            "Rivals at this level all carry more weight."
          ],
          unknown: [
            "Move too slowly and someone else claims the lane first."
          ]
        },
        choices: [
          {
            id: "early_mover",
            text: "Declare first and claim the story",
            outcomes: {
              crit: { body: "You beat everyone to the punch. Suddenly you are the default choice for the seat." },
              ok: { body: "The opening move is yours. The issue now belongs to you." },
              meh: { body: "An early declaration — and an early burn." },
              fail: { body: "Getting out front just makes you everyone's target." },
              critfail: { body: "You strayed too far ahead of the pack. They gun for you together." }
            }
          },
          {
            id: "wait_read",
            text: "Hang back; make the rivals show their hand",
            outcomes: {
              crit: { body: "You keep your nerve, wait for the crack in a rival's armor, then strike once — clean." },
              ok: { body: "Late but aimed. You enter on an angle of your choosing." },
              meh: { body: "Waiting clarified the field — and cost you a beat." },
              fail: { body: "You wait too long. The ground you wanted gets claimed without you." },
              critfail: { body: "All campaign long, you chase other people's story." }
            }
          }
        ]
      },
      {
        id: "camp_upper_primary",
        title: "Primary Showdown",
        body: "A same-party rival with deeper tenure wants this seat too. The primary will be a fistfight.",
        brief: {
          lede: "A senior party rival wants the same seat you do.",
          known: [
            "A primary is brute force inside your own party.",
            "The new-generation card bets on change; the résumé card bets on steadiness.",
            "A direct clash wounds the party; evasion decides nothing."
          ],
          unknown: [
            "A sibling fight inside the party — hard to end after election night."
          ]
        },
        choices: [
          {
            id: "contrast",
            text: "Run the new-generation contrast",
            outcomes: {
              crit: { body: "You make change sound personal. Young voters tilt your way." },
              ok: { body: "The contrast is sharp. You scrape through." },
              meh: { body: "You held your base. You grew nothing." },
              fail: { body: "The new-generation card lands badly. You look hasty, not fresh." },
              critfail: { body: "You lose the primary. The senior rival has the last laugh." }
            }
          },
          {
            id: "establish",
            text: "Emphasize your tenure and steadiness",
            outcomes: {
              crit: { body: "The party elders all back the safe pair of hands. You march into the general." },
              ok: { body: "You persuade primary voters that nothing breaks on your watch." },
              meh: { body: "Square and steady. No color, no errors." },
              fail: { body: "Tenure starts sounding like stagnation. You fall behind." },
              critfail: { body: "The special-interest label gets nailed to your back." }
            }
          },
          {
            id: "avoid_clash",
            text: "Refuse the brawl; protect your party image",
            outcomes: {
              crit: { body: "You sidestep the trade of punches with grace — and look the bigger person for it." },
              ok: { body: "You offend no one and glide through the primary." },
              meh: { body: "You win no affection. You lose none either." },
              fail: { body: "The soft approach deflates your base a little." },
              critfail: { body: "You dodge until the primary barely remembers your name." }
            }
          }
        ]
      },
      {
        id: "camp_upper_rally",
        title: "The Stump Tour",
        body: "One loop of the whole state — eastern factory towns to western suburbs. Your stamina and your message both get tested.",
        brief: {
          lede: "A full loop of the state: factory towns in the east, suburbs in the west.",
          known: [
            "A packed tour bets on stamina and volume; target counties bet on efficiency.",
            "Both your body and your news cycle are under strain.",
            "You cannot visit everywhere. Choosing where is the whole choice."
          ],
          unknown: [
            "Split your focus and the regions you skip notice the cold."
          ]
        },
        choices: [
          {
            id: "grind",
            text: "Packed tour: five events a day",
            outcomes: {
              crit: { body: "The work ethic becomes the story. Local stations take turns covering you." },
              ok: { body: "You cover every corner of the district. Support trends up." },
              meh: { body: "Brutally tiring, fairly invisible." },
              fail: { body: "The schedule is overstuffed. You visibly falter at two events." },
              critfail: { body: "You collapse on the road — and miss a crucial debate." }
            }
          },
          {
            id: "targeted",
            text: "Hit only the counties that matter",
            outcomes: {
              crit: { body: "Every resource poured into the swing counties. The efficiency is startling." },
              ok: { body: "Breakthrough where you chose it. You build margins in the counties that count." },
              meh: { body: "Careful choices, but a narrow map." },
              fail: { body: "You bet on the wrong counties and neglected the ground you needed." },
              critfail: { body: "Every target county slips away. The race free-falls." }
            }
          }
        ]
      },

      /* ========================= 等级5：全州公职（stwide）========================= */
      {
        id: "camp_stwide_announce",
        title: "Introducing yourself to the whole state",
        body: "Your first self-introduction to an entire state. Most voters have never heard of you. By November, your name has to ring like a household word.",
        brief: {
          lede: "Your first introduction to a whole state. Most voters do not know you.",
          known: [
            "Most voters have never heard your name.",
            "A tour declares loudly; an endorsement chain builds quietly.",
            "A slow build saves resources — and may start too late."
          ],
          unknown: [
            "If the name does not carry, the race has not started."
          ]
        },
        choices: [
          {
            id: "state_tour",
            text: "Tour three cities and declare formally",
            outcomes: {
              crit: { body: "Three cities in one week. Overnight you become a name the state repeats." },
              ok: { body: "The declaration lands. Recognition spreads." },
              meh: { body: "Only your own party now knows you are running." },
              fail: { body: "The tour makes too little noise. The state remains a stranger to you." },
              critfail: { body: "You announce to an echoing room. Nobody answers." }
            }
          },
          {
            id: "endorse_chain",
            text: "Stack local endorsements before appearing",
            outcomes: {
              crit: { body: "Mayors and county chairs line up behind you. Your announcement carries real weight." },
              ok: { body: "The endorsement chain takes shape. Your voice steadies." },
              meh: { body: "You gathered a few notable faces." },
              fail: { body: "Everyone willing to endorse is nobody." },
              critfail: { body: "Building the chain takes so long that the window closes." }
            }
          },
          {
            id: "slow_burn",
            text: "Don't spread thin; deepen what you already hold",
            outcomes: {
              crit: { body: "You ignore the buzz and pack your base solid." },
              ok: { body: "Steady work. Recognition accumulates." },
              meh: { body: "No big volume, no mess either." },
              fail: { body: "A statewide race runs on volume. You are too quiet." },
              critfail: { body: "Not enough presence. Support slips a touch." }
            }
          }
        ]
      },
      {
        id: "camp_stwide_convention",
        title: "The state party convention",
        body: "The party decides its nomination inside this hall. Every vote here rests on trust you brokered days ago.",
        brief: {
          lede: "At the convention, the party hands out its nomination.",
          known: [
            "Every vote in the hall rests on trust struck days earlier.",
            "Working delegates one by one bets on arithmetic; a floor surge bets on noise.",
            "Waiting is cheap — and hands the outcome to someone else."
          ],
          unknown: [
            "Delegates unworked before the gavel mean a cold podium after."
          ]
        },
        choices: [
          {
            id: "work_room",
            text: "Negotiate delegate by delegate; lock the nomination",
            outcomes: {
              crit: { body: "You close enough deals in the corridors to win the nomination on the first ballot." },
              ok: { body: "You outlast the floor and come home with the nomination." },
              meh: { body: "The nomination arrives — along with a stack of promises you made for it." },
              fail: { body: "The hall swings to another name. You nearly go under." },
              critfail: { body: "Your bloc is flipped on the floor. The nomination goes to your rival." }
            }
          },
          {
            id: "floor_fight",
            text: "Rally the grassroots delegates and storm the floor",
            outcomes: {
              crit: { body: "Young delegates lift you to the nomination. The establishment is left speechless." },
              ok: { body: "The grassroots wave carries you — barely — over the line." },
              meh: { body: "A loud, colorful show. The nomination still comes down to deals." },
              fail: { body: "The party reads your surge as disorder. It recoils on you." },
              critfail: { body: "The machine unites and strangles your little revolt." }
            }
          },
          {
            id: "play_safe",
            text: "Don't muddy the water; wait for the count",
            outcomes: {
              crit: { body: "You cross no one, so every faction leaves you a door open." },
              ok: { body: "You come through the convention with your dignity intact." },
              meh: { body: "The nomination passes you by — and so does the damage." },
              fail: { body: "So passive that the hall forgets you have a voice." },
              critfail: { body: "You become the one nobody counts. Support dips." }
            }
          }
        ]
      },
      {
        id: "camp_stwide_media",
        title: "Becoming a household name",
        body: "A statewide race is a war for attention. If you are not on local TV and the front page, you might as well not be running.",
        brief: {
          lede: "A statewide race is an attention war. No coverage, no candidate.",
          known: [
            "State TV and the front page are battlegrounds you must occupy.",
            "Buying ads bets on money; making news bets on free coverage.",
            "Bare-minimum exposure gets you slowly forgotten."
          ],
          unknown: [
            "An invisible name carries no votes."
          ]
        },
        choices: [
          {
            id: "media_buy",
            text: "Spend heavily on prime-time ads",
            outcomes: {
              crit: { body: "The spots drill in. Strangers across the state hum your campaign jingle." },
              ok: { body: "Name recognition climbs — and the war chest shows daylight at the bottom." },
              meh: { body: "Money burned. Modest splash." },
              fail: { body: "Your spots drown under the opponent's heavier barrage." },
              critfail: { body: "The ad bombs. Comedians across the state have a field day with it." }
            }
          },
          {
            id: "earned_news",
            text: "Set the agenda and take the free coverage",
            outcomes: {
              crit: { body: "The issue you throw onto the airwaves makes the statewide front page — without buying a single spot." },
              ok: { body: "Reporters start calling you. Good coverage at no charge." },
              meh: { body: "A few scattered mentions. No trend." },
              fail: { body: "The story never catches. Reporters pass." },
              critfail: { body: "The gimmick you started gets hijacked and turned on you. The whole internet laughs." }
            }
          },
          {
            id: "steady_presence",
            text: "Buy nothing, hype nothing, stay minimally visible",
            outcomes: {
              crit: { body: "Solid local coverage accumulates bit by bit. Steady work." },
              ok: { body: "No burn, no losses. Coverage flat." },
              meh: { body: "Not much sound. Nothing broke either." },
              fail: { body: "In an attention war, you chose absence." },
              critfail: { body: "A statewide race in full swing, and nobody sees you. Support dips." }
            }
          }
        ]
      },

      /* ========================= 等级6：联邦众议员（federal · ★胜利线）========================= */
      {
        id: "camp_federal_announce",
        title: "Announcing for Congress",
        body: "From the statehouse to Congress is a real leap. You need a national fundraising network — and a story Washington wants to hear.",
        brief: {
          lede: "Statehouse to Capitol: the leap that changes what you are.",
          known: [
            "You need a national fundraising network and a Washington-scale story.",
            "A high-production launch bets on reach; hometown groundwork bets on hearts.",
            "Congressional issues are heavier. A state résumé may not carry."
          ],
          unknown: [
            "If the story fails, the congressional dream stalls halfway."
          ]
        },
        choices: [
          {
            id: "national_launch",
            text: "Launch big and speak to national issues",
            outcomes: {
              crit: { body: "National political reporters cover your launch. Your fundraising emails light up." },
              ok: { body: "The launch lands. You are inside the national frame now." },
              meh: { body: "No headlines — but steady, unglamorous progress." },
              fail: { body: "A national race reveals just how unknown you are." },
              critfail: { body: "Old baggage breaks the day you launch. The opponent takes the story and runs with it." }
            }
          },
          {
            id: "local_roots",
            text: "Stay home; become the district's voice",
            outcomes: {
              crit: { body: "You run the hometown-champion card flawlessly. The district is yours, ironclad." },
              ok: { body: "Your roots in the district hold like bedrock." },
              meh: { body: "The hometown card is safe — and a little small." },
              fail: { body: "Hometown talk alone cannot fill a congressional frame." },
              critfail: { body: "The label sticks: too small for the job." }
            }
          },
          {
            id: "steady_start",
            text: "No fanfare; secure the base first",
            outcomes: {
              crit: { body: "You quietly make the district rock solid. A slow start on deep footing." },
              ok: { body: "You start without a sound and keep every supporter you had." },
              meh: { body: "Little noise. No real mistakes either." },
              fail: { body: "Congressional races need volume. Your opening is mute." },
              critfail: { body: "Nowhere on the national map. Support slips a touch." }
            }
          }
        ]
      },
      {
        id: "camp_federal_primary",
        title: "The Congressional Primary",
        body: "A challenger from your own party — one who never flinches at spending — has targeted your seat. Lose the primary, and Congress stops existing.",
        brief: {
          lede: "A same-party challenger who burns money without blinking wants your seat.",
          known: [
            "Lose the primary and the Congress talk is moot.",
            "Hold with the incumbent's advantages, or play the ideology card to the base.",
            "Not attacking saves effort — and cedes the rival free terrain."
          ],
          unknown: [
            "Underestimate a rival from inside your party and they end you there."
          ]
        },
        choices: [
          {
            id: "defend",
            text: "Steady the race with the incumbent's advantages",
            outcomes: {
              crit: { body: "You put the machine to work and flatten the challenger. A wide primary win." },
              ok: { body: "You take the primary — closer than you will ever admit." },
              meh: { body: "You win, but the fight drains you before the general." },
              fail: { body: "The challenger bites at your heels. You survive by inches." },
              critfail: { body: "You lose the primary. The congressional dream dies at a party member's hands." }
            }
          },
          {
            id: "ideology",
            text: "Move toward the base and run on ideology",
            outcomes: {
              crit: { body: "You say out loud what the base has been thinking. The primary turns into a rout." },
              ok: { body: "The party's ideological wings fall in behind you." },
              meh: { body: "You win the primary, and the moderates start drifting away." },
              fail: { body: "The hard-line talk rebounds. Moderates lean toward the challenger." },
              critfail: { body: "The party establishment and the middle abandon you in the same week." }
            }
          }
        ]
      }
    ]
  }
});
