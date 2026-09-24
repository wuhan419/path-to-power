/* ============================================================================
 * CONTENT · i18n/en/events/110-line-1980s.js
 * 中文文件 content/events/110-line-1980s.js 的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices / terms 里带 id 的按 id 对齐，不带 id 的对象按数组下标对齐。
 *   · 纯字符串数组（known / rumor / unknown）是**整体替换**，必须整条给全：
 *     本文件每张卡均为 known×3 / rumor×2 / unknown×2 / terms×1，与原文一一对应。
 *   · 结构性键（id / era / minYear / tierMin / weight / base / mods / effects /
 *     flags / req / cost / after …）由引擎保护，写了也不会生效，validate 会直接报错。
 *     只有 id 作为定位符出现。
 *   · 文件尾的 POTUS.define("fixed", …) 锚点表与 worldline 数据不含玩家可见文案，
 *     无需翻译。
 *   · 经济字段是系数，不涉及文案，不用管。
 *
 * 英文写法：按英语重写，不是逐字翻。第二人称、现在时、短句；
 * 「」在英文里用引号或改写掉；专有名词用真实英文（Challenger、Iran-Contra、
 * Black Monday、Plaza Accord、Reagan、Dukakis、O'Neill、Hinckley、McAuliffe）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* -------------------------------------------------- 1981-03 里根遇刺 */
      {
        id: "rg81_shooting",
        title: "Gunshots on live TV: President Reagan goes down",
        body: "The motorcade has barely stopped when six shots crack out of the crowd. The signal cuts into regular\n" +
          "programming — the nation watches an assassination attempt live for the first time.\n" +
          "Hinckley is pinned under police. Reagan is hit and rushed to hospital. And your phone starts ringing:\n" +
          "the local station wants your first words.",
        brief: {
          lede: "In the shocked hours while the whole country waits, every word you say is taped — and replayed for decades.",
          known: [
            "Reagan's condition is unclear, the White House briefing is a mess, and succession talk has already started.",
            "The live hookup is right in front of you: they want an instant reaction from a local official.",
            "You know this camera can be a stepping stone — or the end of your political career."
          ],
          rumor: [
            "Some say the gunman was chasing actress Jodie Foster, with no political motive at all.",
            "Some say this is a slap at spineless Washington. In private, some are applauding."
          ],
          unknown: [
            "No one expects Reagan to survive — or that his prestige will rise.",
            "Your words tonight will be replayed verbatim twenty years from now."
          ],
          terms: [{ k: "Live Hit", v: "TV cutting a local politician into a breaking story in real time." }]
        },
        choices: [
          {
            id: "unity",
            text: "Use the camera to call for unity and pray for the president — feed no conspiracy",
            note: "Safest, and the hardest to nail: measured reads as statesmanship, overdone reads as showboat.",
            outcomes: {
              crit: { body: "Your few composed words are quoted all week. People remember you kept your head at a moment like that." },
              ok: { body: "You say the proper prayer and call for unity. No one faults you; no one especially notices you." },
              meh: { body: "Your answer is flat. The anchor politely cuts you away." },
              fail: { body: "You sound like you are reading a script, and the camera catches your darting eyes. The local joke book has new material by nightfall." },
              critfail: { body: "Nerves get you: \"he should have long ago...\" Half a sentence, looped forever." }
            }
          },
          {
            id: "strike",
            text: "Seize the moment: call this scene a verdict on the regime",
            note: "You are betting the president falls and the public's fury catches fire. Lose, and you are the man biting inside the gunshots.",
            outcomes: {
              crit: { body: "You name the street's mood before anyone else dares. Radicals call you the man who says it out loud; the streets start passing your clip." },
              ok: { body: "You voice part of the rage. Another part of the city remembers your face." },
              meh: { body: "No one takes your bait. Right now the country only wants the president to live." },
              fail: { body: "You sing counterpoint in a nation at prayer. The papers write you up as \"the opportunist.\"" },
              critfail: { body: "The day Reagan comes back, healed, your line is still circulating. Everyone remembers what you said when the shots rang out." }
            }
          },
          {
            id: "silent",
            text: "Say nothing. Give the airtime back to the doctors and the family.",
            outcomes: {
              crit: { body: "Your restraint is praised afterward: not hogging the frame at a moment like that reads as reliability. The establishment and the churches both take note." },
              ok: { body: "You said nothing wrong and left nothing behind. That is its own achievement." },
              meh: { body: "Reporters chase you for a statement. You shake your head and keep walking. By tomorrow no one recalls you were in this story." },
              fail: { body: "Opponents read your silence as \"he dares not take a side.\"" },
              critfail: { body: "You dodge the cameras but not the tabloid photo: \"On the day the president was shot, he went golfing.\"" }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1982-11 失业潮 */
      {
        id: "rg82_unemp",
        title: "The biggest plant in district slaps seals on its doors",
        body: "Interest rates are pinned to the sky; orders evaporate at once. The oldest plant in the district closes. Hundreds\n" +
          "of people you shook hands with on election night stand in the unemployment line in the cold wind overnight.\n" +
          "National joblessness hits its postwar peak. The local paper wants someone to speak for them; City Hall wants\n" +
          "someone who will not make a scene.",
        brief: {
          lede: "When hunger knocks, moderate words sound like buck-passing — and bold action may smash the rice bowls.",
          known: [
            "The plant says it could not survive and left; the bank says it was just the market. Only the few hundred workers get no explanation.",
            "Unemployment checks take weeks to approve. In between, these families eat empty tables.",
            "The party fears a riot on the evening news; your voters just want to see you stand in that line."
          ],
          rumor: [
            "Some say the plant was drained on purpose — the owner moved the equipment out first.",
            "Some say a quiet bailout already exists. The only condition: no scene."
          ],
          unknown: [
            "How long this recession runs, and whether it forces the rates loose.",
            "Whether you cry on camera or kick in a plant door — ten years from now you will know which was right."
          ],
          terms: [{ k: "The Unemployment Line", v: "Where you file for benefits; the checks crawl." }]
        },
        choices: [
          {
            id: "rally",
            text: "Stand at the head of the line: run relief, aim the anger at the plant and the bank",
            note: "Grassroots fury burns hottest and you must be its chimney — but you will not control everything it sets on fire.",
            outcomes: {
              crit: { body: "You march your people to emergency relief and become the local name for \"the guy who stood in front.\" The union and the blocks remember." },
              ok: { body: "You force the matter onto the table. The money is thin; the people appreciate it anyway." },
              meh: { body: "You showed up. Photo ops aside, nothing moved." },
              fail: { body: "You lead a blockade of the plant gate — shutting out the workers who just want their jobs back. Their resentment turns on you." },
              critfail: { body: "A peaceful rally turns to breaking windows, and you are named the agitator. The warrant is coming; your photo is already printed." }
            }
          },
          {
            id: "broker",
            text: "Shut the door and deal: pull in a developer, win tax breaks, save jobs — no headlines",
            note: "If it works, it is a quiet win; if it fails, both sides curse you — and none of it can see daylight.",
            outcomes: {
              crit: { body: "You quietly claw back a batch of temp jobs. When the gates reopen, people assume the market healed itself. The developer logs your favor on the next project." },
              ok: { body: "You win a small cushion — not much, but not nothing. The money keeps your line open: you get things done." },
              meh: { body: "You run between both sides. Neither thanks you. No deal, and the money is spent." },
              fail: { body: "The talks collapse. The laid-off learn later you took the developer's dinner. \"Plays both sides\" starts whispering around town." },
              critfail: { body: "You are photographed chummy with plant management while workers' names sit on the layoff list. Your name runs in small print at the bottom of the local front page." }
            }
          },
          {
            id: "hold",
            text: "Do not feed the fire: preach calm and confidence, tell people not to smash their own pots",
            outcomes: {
              crit: { body: "Your restraint keeps the town from exploding. Afterward it counts as the quarter that saved local credit." },
              ok: { body: "You did not pour oil on the fire. The streets are unhappy; the people upstairs remember you caused no trouble." },
              meh: { body: "You tell everyone to have faith. Faith does not eat. No one takes it seriously." },
              fail: { body: "Preach calm in a hungry neighborhood and you become the living proof of a politician who never eats real food." },
              critfail: { body: "The tape airs — \"they should figure it out themselves.\" That door to the grassroots closes on you for good." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1983-10 贝鲁特 */
      {
        id: "rg83_beirut",
        title: "Before dawn, a truck drives into the barracks",
        body: "A truck stuffed with explosives caves in the multinational barracks in Beirut. Hundreds of young soldiers lie\n" +
          "under the rubble. Coffins come home one by one on television, crawling endlessly across the screen.\n" +
          "One name on the list is a child of this state. His mother speaks to reporters at the church door: what did he\n" +
          "die for? Then the camera turns to you.",
        brief: {
          lede: "Deaths no one can explain are turning into an exam question: what do you support?",
          known: [
            "The peacekeeping mission has become a target; the Pentagon cannot state the troops' orders.",
            "One of the dead is from your district — an ordinary working family; he enlisted for the tuition.",
            "Both the anti-war camp and the pro-war camp want one sentence from you."
          ],
          rumor: [
            "Some say the White House knew the barracks could not be held; no one dared order the pullout.",
            "Some say this is the first of a string of blasts, and worse is coming."
          ],
          unknown: [
            "This bombing will drive the Americans out of Lebanon.",
            "How you answer that mother — both sides will keep the transcript."
          ],
          terms: [{ k: "Multinational Force", v: "The peacekeeping contingent in Lebanon, pulled out after the blast." }]
        },
        choices: [
          {
            id: "withdraw",
            text: "Demand a review of the mandate — bring the kids home",
            note: "You side with the mother and the anti-war mood — and wear the label of surrendering over the bodies of your own soldiers.",
            outcomes: {
              crit: { body: "You become the man who asked that mother's question out loud. The grassroots and military families remember your candor." },
              ok: { body: "You urge withdrawal, and you say it with feeling. The doves are satisfied; the hawks open a tab with your name on it." },
              meh: { body: "You shout withdrawal, but the story swamps it. No one quite files you under any side." },
              fail: { body: "Opponents cut your \"bring them home\" into \"he backs surrender.\"" },
              critfail: { body: "The day of your loud pullout speech, a new attack lands. No one asks about causes. They ask only: did men like you sap the troops' will?" }
            }
          },
          {
            id: "resolve",
            text: "Call for strength and retaliation: they did not die for nothing",
            note: "You ride the grief and the hawks — the most cathartic move tonight; the risk is that no one can say where to point this anger.",
            outcomes: {
              crit: { body: "Your line — answer with strength — loops on conservative radio. For the first time the military and the establishment count you as one of their own." },
              ok: { body: "You stand on the hard line. The upper floors approve; the anti-war streets boo." },
              meh: { body: "You say harsh words. Nobody redeploys an army over one man's harsh words." },
              fail: { body: "The dead soldier's mother writes the paper: \"He is using my son's death for attention.\"" },
              critfail: { body: "Retaliation escalates. Another unit ships out and does not come back. A poster pairs your name with \"send more kids to die.\"" }
            }
          },
          {
            id: "grieve",
            text: "Talk no strategy. Just help that family bury their son.",
            outcomes: {
              crit: { body: "You preach nothing. You stand at the church door to the very last moment. The local paper photographs it." },
              ok: { body: "You send the wreath and give a measured eulogy." },
              meh: { body: "You attend, stand a while, then leave. No one says anything; no one remembers anything." },
              fail: { body: "A camera catches you checking your watch at the funeral. \"In a hurry\" is in the paper by tomorrow." },
              critfail: { body: "You wanted the borrowed dignity of the moment. The family throws you out on the spot. Nothing washes off worse than that picture." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1985-09 广场协议 */
      {
        id: "rg85_plaza",
        title: "Five finance ministers shut the door and push the dollar down",
        body: "At the Plaza Hotel, the major industrial nations agree in secret to joint intervention: the dollar will fall hard\n" +
          "against the yen and the mark, to plug America's trade hole. The moment the news breaks, currency and export\n" +
          "boards flip upside down.\n" +
          "Local manufacturers and farmers each run their own arithmetic: some pray a weak dollar revives exports,\n" +
          "some fear imports will sweep their storefronts clean. They are all coming to knock on your door.",
        brief: {
          lede: "An exchange-rate pivot decided behind a door in a foreign hotel — the bill and the bonus both land in your district's shops and fields.",
          known: [
            "The dollar falls. Exports should gain — but the imported inputs on hand get dearer too.",
            "The big local exporters want you on their platform; the small import shops fear being squeezed out.",
            "Washington calls this \"orderly adjustment.\" The street calls it \"America no longer calls the shots.\""
          ],
          rumor: [
            "This is only the first check written to Japan — next it must buy the Treasury bonds.",
            "Currency traders smelled it months ago; the money was made before the word \"Plaza\" reached town."
          ],
          unknown: [
            "This pivot will inflate Japan's asset bubble.",
            "Whose proxy you carry today — the exchange rate comes collecting in three years."
          ],
          terms: [{ k: "Plaza Accord", v: "Five nations push the dollar down; Japan's bubble follows." }]
        },
        choices: [
          {
            id: "export",
            text: "Back exports and manufacturing: take the big local plants' platform",
            note: "Right, and you \"understand the economy.\" Wrong, and you burned consumers for big business.",
            outcomes: {
              crit: { body: "The devaluation really brings orders; the local plant adds shifts. You book it as proof you can read which way the wind blows." },
              ok: { body: "Exports do recover. You hitch a ride on the updraft." },
              meh: { body: "You made your speech. The currency market neither heard nor cared." },
              fail: { body: "Priced-out imported parts break the small local shops, and they hand you the bill for backing the big plant." },
              critfail: { body: "You took the big factory's money to wave its flag, right as the fury at \"America selling its jobs to the exchange rate\" catches fire. The unions put your name on their list." }
            }
          },
          {
            id: "worker",
            text: "Win a cushion and retraining for the squeezed small shops and import rivals",
            outcomes: {
              crit: { body: "You win retraining money for the small shops hit from both directions. Workers and owners both call it fair." },
              ok: { body: "You speak for the side taking the hit. The money is thin, but the message lands." },
              meh: { body: "You try to cover both ends. Both agree you said the right thing; neither actually got a turn." },
              fail: { body: "The big plants curse you for \"blocking exports\"; your retraining plan is too slow to matter. Everyone has a reason to complain." },
              critfail: { body: "Red tape jams the cushion — nobody gets paid. Workers call you a fraud; the big plants laugh at your incompetence. This time, nobody is right." }
            }
          },
          {
            id: "neutral",
            text: "Refuse to litigate the exchange rate — just \"settle the account for local workers\"",
            outcomes: {
              crit: { body: "You dodge the shouting match over abstractions and turn out one solid local-impact assessment. The press rarely praises: \"he knows the business.\"" },
              ok: { body: "You use technical work to slip the trap of taking sides. Safe, and professional besides." },
              meh: { body: "Nobody reads your report. You land on neither side of anything." },
              fail: { body: "\"No side\" gets read by both sides as \"no stance.\"" },
              critfail: { body: "You offended no one and protected no one. Years later, asked what you did during the Plaza Accord, you have no answer." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1986-01 挑战者号 */
      {
        id: "rg86_challenger",
        title: "Every schoolchild in America watches it lift off",
        body: "Weather delayed the launch once; finally it climbs on a clear morning. Seventy-three seconds later the sky\n" +
          "splits into a streak of white smoke. Aboard is Christa McAuliffe, the schoolteacher — every child in America\n" +
          "was watching her give a live lesson from orbit.\n" +
          "Schools shut down. Parents have no words. Your community's school board wants someone to say something.\n" +
          "They thought of you.",
        brief: {
          lede: "A death staged in front of every child asks every adult the same question: how do you explain it?",
          known: [
            "The cause is unconfirmed, NASA's account is muddled, and talk of an O-ring is already circulating.",
            "Relatives of McAuliffe live in this community; classmates refuse to go back inside.",
            "The school board wants a voice with weight and no mistakes. They thought of you."
          ],
          rumor: [
            "Some say bureaucratic rush caused this — someone had warned, in an email.",
            "Some say the space program gets grounded for years, and the local contractors will bleed."
          ],
          unknown: [
            "The inquiry's findings will shake public trust in government itself.",
            "How you speak to the children now — they carry it for life."
          ],
          terms: [{ k: "Challenger", v: "The shuttle that broke apart 73 seconds after launch, killing all seven aboard." }]
        },
        choices: [
          {
            id: "comfort",
            text: "Go to the schools and help the children talk it through",
            note: "Speaking to children is where the craft shows: too heavy frightens them, too light insults them.",
            outcomes: {
              crit: { body: "What you say in that classroom runs in full in the local paper. People say: he settled those children down that day." },
              ok: { body: "You say the fitting words. The children remember you." },
              meh: { body: "You went, you spoke, the mood eased by degrees. No one especially remembers." },
              fail: { body: "Your \"the program must go on\" gets read as \"some lives count less.\"" },
              critfail: { body: "You try to turn grief into a credential. A parent confronts you on the spot: \"did you come to speak, or to campaign?\"" }
            }
          },
          {
            id: "probe",
            text: "Ask the hard question: did NASA ignore the warnings?",
            note: "Be the one who says \"accountability\" while the country is still weeping — some call you clear-eyed, some call you cold-blooded.",
            outcomes: {
              crit: { body: "You name the schedule pressure before the commission does. The press starts calling you the man who watches the O-ring." },
              ok: { body: "You demand a full inquiry. The argument holds — the timing just looks a shade eager." },
              meh: { body: "You raised accountability. The country wants to cry tonight, not to assign blame." },
              fail: { body: "Talking blame in a funeral mood earns you \"he is making capital of the dead.\"" },
              critfail: { body: "Your inquiry cuts into the local space contractor. They promptly fund your opponent a large donation and whisper that you \"break local rice bowls.\"" }
            }
          },
          {
            id: "lowkey",
            text: "Say almost nothing now: a brief note of condolence; give the microphones back to the families",
            outcomes: {
              crit: { body: "Your restraint is praised: not stepping forward when a nation grieves leaves an impression of steadiness." },
              ok: { body: "You send a quiet condolence. No mistakes; no traces." },
              meh: { body: "You dodged the cameras — and everyone's memory along with them." },
              fail: { body: "Some say you will not step up even for this. A man too careful with himself." },
              critfail: { body: "You keep your head down — then get photographed cutting a mall ribbon the same day. Other people's children watched men fall from the sky; you were holding scissors. The caption writes itself." }
            }
          }
        ]
      },

      /* ---------------------------------------- 1986-11 伊朗门 · 前奏 */
      {
        id: "rg86_iran_open",
        title: "A channel that should not exist lands on your desk",
        body: "Someone is selling weapons in secret to the enemy, to free hostages; the proceeds detour to fund a militia that\n" +
          "Congress never paid for. Every link in this chain is carefully trace-free.\n" +
          "An old colleague sounds you out: is there a route through your territory that does not have to go through the\n" +
          "books? Make it work and you are a founding retainer of the new order; blow it and you are a federal defendant.",
        brief: {
          lede: "An order from above that no one will put in writing. Saying yes signs your name to an unexploded shell.",
          known: [
            "If true, this bypasses Congress's funding ban — it hangs over the edge of illegality on its face.",
            "The colleague gives you a spoken message only. No documents. No signatures.",
            "Take the job, and when it unravels the first man they question is the middleman — you."
          ],
          rumor: [
            "Some say the hostage channel really is moving; it works, quietly.",
            "Some say none of that money ever reached its destination — brokers fattened on it first."
          ],
          unknown: [
            "This grows into an inquiry that shakes the whole West Wing.",
            "The credit is dark. The liability sits in bright light, waiting for auditors."
          ],
          terms: [{ k: "Iran-Contra", v: "The scandal: arms sold secretly to Iran, the proceeds routed to the Nicaraguan Contras." }]
        },
        choices: [
          {
            id: "join",
            text: "Take the line: run one errand that leaves no trace",
            note: "Bet that it works and never traces back to you. Win, and you are the regime's favorite; lose, and you are the scapegoat in the archive.",
            outcomes: {
              crit: { body: "You handle it clean — nobody saw, nobody knows. Word goes up: \"this one is reliable on the unmentionable tasks.\"" },
              ok: { body: "You get the errand done. Real power, a back channel — and a ledger that can never see daylight." },
              meh: { body: "You did it. The whole thing keeps you awake. You already regret touching it." },
              fail: { body: "The chain breaks elsewhere, but your name surfaces on the corner of a \"middlemen list.\" Someone starts watching you." },
              critfail: { body: "You were seen on this run — and you are the only one without official cover. When the inquiry opens, you are first through the door." }
            }
          },
          {
            id: "watch",
            text: "Keep the connection — but never let your own hands touch it",
            outcomes: {
              crit: { body: "You hold the position of \"in the know, not in the soup\": whichever way men fall, you walk — and you keep that back channel in your own fist." },
              ok: { body: "Your hands stay clean and you collect a few scraps of early warning. Enough to read the wind." },
              meh: { body: "You know a little of everything and decide none of it." },
              fail: { body: "Neither help nor a clean refusal — both sides start finding you \"shifty.\"" },
              critfail: { body: "You meant to hold a card and got filed as one who knew and stayed silent. Later, asked what exactly you knew and when, you cannot say." }
            }
          },
          {
            id: "refuse",
            text: "Shut the door: I do not touch this — and I suggest you never mention it near me",
            note: "The cleanest choice — and the one that most offends the men climbing this particular ladder.",
            outcomes: {
              crit: { body: "You sidestep the whole storm. Years on, \"he was out early\" becomes the footnote to your clean hands." },
              ok: { body: "You stay out of the mud. Maybe you offend a few people now; your books stay clean." },
              meh: { body: "You refused. Nothing happened. Nobody remembers you refused." },
              fail: { body: "You refuse too bluntly. It reaches the ears of men who needed this line to rise. You have an enemy in the dark now." },
              critfail: { body: "You not only refused but nearly made a scene of it. The people on the line together write you out of the local inner circle." }
            }
          }
        ]
      },

      /* ---------------------------------------- 1987-07 伊朗门 · 爆发 */
      {
        id: "rg87_iran_hearings",
        title: "On the witness panel, live nationwide: your turn to explain",
        body: "The scandal bursts fully open: the secret arms sales, Congress bypassed, money flowing to a war no one\n" +
          "authorized — each link dragged into the sunlight. The hearings run live on television; the ratings beat football.\n" +
          "Wherever you stood on that chain, however marginal, lawyers and reporters now read it back word by word.\n" +
          "This time you answer in person, on camera.",
        brief: {
          lede: "The ledger that left no trace — now you fill it in, link by link, in front of the cameras.",
          known: [
            "Your name is on the witness list. The press is betting on whether you will come clean or clamp down.",
            "Whatever papers you hold from those days are now either a shield or a noose.",
            "The whole country is watching how a local figure stands under a national scandal."
          ],
          rumor: [
            "Some say the central figures are already pointing at each other; whoever talks first gets the light sentence.",
            "Some say this fizzles out. Survive the cameras and you won."
          ],
          unknown: [
            "The independent counsel will trace the line to the top floors of the West Wing.",
            "One word from you can save a political life, or end one."
          ],
          terms: [{ k: "Televised Hearing", v: "A congressional evidentiary hearing, carried live to the whole country." }]
        },
        choices: [
          {
            id: "fess",
            text: "Come clean: lay out your passive role back then, cooperate fully",
            note: "Bet candor buys leniency and an \"at least he did not lie\" reputation — priced at one permanent page of disgrace.",
            outcomes: {
              crit: { body: "You testify plainly and take only a rebuke. \"He did not lie big\" makes more than one person willing to deal with you again." },
              ok: { body: "You told it all, took a scolding, and kept off the blacklist. The political life survives." },
              meh: { body: "Your confession is bloodless. The press sighs: nothing new here." },
              fail: { body: "You try to shrink the story; pressed, your accounts start contradicting each other. \"He lied\" is tomorrow's banner." },
              critfail: { body: "The more you explain, the worse it looks; perjury sticks. The investigators stop asking \"what did you do\" and start asking \"what else did you lie about?\"" }
            }
          },
          {
            id: "stone",
            text: "Deny everything: I knew nothing — and they never told me",
            note: "Bet no one can nail you to the chain. Win and you walk; lose and it is perjury.",
            outcomes: {
              crit: { body: "Not a crack in you on camera. Some of the national audience is persuaded by sheer calm. The file holds nothing solid on you." },
              ok: { body: "Your story holds. They cannot pin it on you — but \"suspicious\" now lives under your name." },
              meh: { body: "Your denial lands flat and thin. Few believe it; many doubt." },
              fail: { body: "A cable bearing your signature slaps onto the table. The whole country watches you panic live." },
              critfail: { body: "Perjury and obstruction, proven. The lie you told to save yourself is now the charge that puts you away." }
            }
          },
          {
            id: "resign",
            text: "Resign every local post now: cut losses, step out of the blast radius",
            outcomes: {
              crit: { body: "You retreat in order to advance: quitting buys you room as \"a man who knows when to go,\" and a road back later." },
              ok: { body: "You bow out. After the wind passes, a dignified way back is still standing." },
              meh: { body: "You stepped down; the inquiry arrives anyway. The concession bought no exemption." },
              fail: { body: "Your resignation reads as a guilty conscience. You dodged the cameras, not the verdict." },
              critfail: { body: "You thought giving up your seat would end it — but your seat is exactly the one someone else is eager to trade in. You cannot even leave cleanly." }
            }
          }
        ]
      },

      /* ---------------------------------------- 1988-89 伊朗门 · 余波 */
      {
        id: "rg89_iran_after",
        title: "After the storm, the town takes stock of a man who sat before the cameras",
        body: "The hearings closed; convictions and pardons took turns; the scandal is folding into \"one episode of that\n" +
          "era.\" But the local reckoning with you is not over: the town must decide again whether to work with a man\n" +
          "\"who sat before the cameras.\"",
        brief: {
          lede: "The country has moved on; your district has not. This time you knock on the door yourself: is there still a chair for me?",
          known: [
            "The scandal's central figures drew light sentences or mercy; right and wrong have gone blurry in public.",
            "Your marginal role on the chain is an open secret locally — no one will say it first.",
            "The party machine is reshuffling the deck; where you stood then is being spent as price today."
          ],
          rumor: [
            "Some say pardons are queued up; the implicated will be out in public soon.",
            "Some say a marginal man like you has no protector — first one pushed when things break."
          ],
          unknown: [
            "History softens; the local ledger settles now.",
            "You are betting on how fast human memory fails. When it fails, you are clean."
          ],
          terms: [{ k: "Pardon", v: "Presidential forgiveness, before or after conviction." }]
        },
        choices: [
          {
            id: "return",
            text: "Come back loudly: recast the hearing as proof you held the line",
            note: "Bet time is on your side now. Told well, it is resilience; told too soon, it is cheek.",
            outcomes: {
              crit: { body: "You rise before the reckoning fades, turning one awkward page into a story of firmness. More people than you expected buy it." },
              ok: { body: "You find your way back to the table. No one raises old scores to your face." },
              meh: { body: "You returned — but every introduction now ends with \"...you know, about that business...\"" },
              fail: { body: "You came back too soon. People ask what face you are made of; the press reopens the old page." },
              critfail: { body: "The harder you push to turn the page, the guiltier you look. Opponents have the old debt reframed and hung on the wall." }
            }
          },
          {
            id: "layback",
            text: "Lie lower, longer: restart with the humblest party chores, quietly",
            outcomes: {
              crit: { body: "You work with your head down until the dust settles. Years on, people say: \"that business did not crush him — it grounded him.\"" },
              ok: { body: "You outlast the wind and stack trust back up, one chip at a time." },
              meh: { body: "You lie low. Not out; not thought of." },
              fail: { body: "You lie low too long, miss the reshuffle's window, and get left out in the cold entirely." },
              critfail: { body: "You thought hiding was enough. When the machine reorganized, someone crossed your name off the list — no one saved your chair." }
            }
          },
          {
            id: "flip",
            text: "Counterattack: denounce the scandal publicly, sever the past entirely",
            outcomes: {
              crit: { body: "You rewrite yourself from \"a man on the chain\" into \"a man who saw through it\" — and genuinely fool a stretch of the voters. New faces start drifting your way." },
              ok: { body: "You draw a hard line against the old debt. For now, no one raises it with you on the record." },
              meh: { body: "Your denunciation lands thin. Everyone knows you were on that line too." },
              fail: { body: "You bite your old colleagues; the word \"traitor\" appears. Neither end of the circle trusts you now." },
              critfail: { body: "You cut so hard you offend every mouth that knows the story. Someone decides you should explain — at length — what exactly you did back then." }
            }
          },
          {
            id: "mentor",
            text: "Ask O'Neill to vouch for you: \"that one holds the line\"",
            note: "You only know this iron-willed Speaker of the House if you refused the 1980 tide and stayed in your old formation. Eight years ago, your not-running now buys one phone call on your behalf — but his favor is a finite stock: spend one, lose one.",
            outcomes: {
              crit: { body: "Speaker O'Neill places one call. Next day the town's shrewdest wind-reader invites you to dinner: word from above is you are all right. One awkward page, turned gently over by connections." },
              ok: { body: "He put in a word; the reckoning's pitch drops a full note. The favor sits on his book and in your memory." },
              meh: { body: "His word carries some weight still. Not much — enough for the men at the door to be civil." },
              fail: { body: "When a retired Speaker sticks his neck out, people read it as \"still on that chain.\" The borrowed light becomes the evidence pointed at you." },
              critfail: { body: "You reach for old authority to slip the net — but his old account is itself a target now. You both land in one feature: \"the connections of that era.\"" }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1987-10 黑色星期一 */
      {
        id: "rg87_monday",
        title: "The Dow loses a fifth in a day — and no one picks up the phone",
        body: "The opening bell starts an avalanche. Trillions in global wealth vanish before lunch; on the floor men break\n" +
          "down outright. Panic crawls the telephone lines into every district's pension and mutual-fund account.\n" +
          "Your phone will not stop. Voters who have lost half a lifetime of savings ask: you are the one who \"handles\n" +
          "money\" — do you actually know what is happening?",
        brief: {
          lede: "Markets show no mercy and read no résumés. On crash day the public just wants someone who keeps them from storming the counters.",
          known: [
            "The collapse came without warning; the regulators cannot explain the cause themselves.",
            "Half your voters' retirement hopes sit in these funds. This drop beheaded them.",
            "A local brokerage and a bank are both waiting for someone senior to say something that steadies the market."
          ],
          rumor: [
            "Some say this is just a technical correction; it recovers next week.",
            "Some say program trading and the yen did it. The beginning of a second Depression."
          ],
          unknown: [
            "The central bank will flood the market with cash; it firms within days.",
            "Whether you keep your nerve today or lose it — people remember for a long time."
          ],
          terms: [{ k: "Black Monday", v: "The day the world's markets fell a fifth in a single session." }]
        },
        choices: [
          {
            id: "steady",
            text: "Steady the town: do not sell into panic, hold the pensions",
            note: "Bet that you are right and that they believe you. Steady it and you are the anchor; get shown up as a layman and you are the joke.",
            outcomes: {
              crit: { body: "The market does turn in days. Your speech — the man unmoved though mountains crash before him — becomes local legend." },
              ok: { body: "Your nerve holds. No run on the counters. People remember you did not flinch." },
              meh: { body: "You said the steadying things. The market moves anyway. At least you added no noise." },
              fail: { body: "It drops again tomorrow. Your \"don't panic\" becomes a punchline; people say you could not quote a ticker if it bit you." },
              critfail: { body: "The very fund you told people to hold keeps falling. Two retirees lose everything; it makes the paper. \"Amateur playing pro\" is a hat that never comes off." }
            }
          },
          {
            id: "blame",
            text: "Turn the fire on Wall Street: greed and runaway speculation",
            note: "Aim the public fury at the most hated target. Cheap applause — and permanent enemies among your backers.",
            outcomes: {
              crit: { body: "You take a pound of flesh for the voters who lost everything. The grassroots dub you the man who speaks for ordinary people." },
              ok: { body: "You cussed out Wall Street. The poor feel avenged; the donors note the ledger." },
              meh: { body: "You joined in with a few curses. Nobody took it particularly to heart." },
              fail: { body: "The local brokerage and bank bankroll you. Your cursing ruffled your own war chest." },
              critfail: { body: "You posture as Wall Street's scourge; once the backers pull out, your machine stalls outright. Even the grassroots see through it: \"the cursing was theater.\"" }
            }
          },
          {
            id: "quiet",
            text: "Better silent than fake: promise oversight, forecast nothing",
            outcomes: {
              crit: { body: "You admit you are no market man and talk only about oversight. People approve: \"honest, unlike those playing economist.\"" },
              ok: { body: "You say the proper non-committal things. No embarrassment, no luster." },
              meh: { body: "You chose silence. In a storm nobody notices you — sometimes the best answer." },
              fail: { body: "Everyone else is burning and longing to hear a voice but yours. \"Absent when it counted\" goes in the file." },
              critfail: { body: "Your oversight-only stance gets read both ways: cold to the donors, slippery to the voters." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1989-11 柏林墙 */
      {
        id: "rg89_berlin",
        title: "A wall, chipped through by ordinary people in a single night",
        body: "One misannounced regulation packs the crossing with a human tide; the guards have no orders; in the\n" +
          "cheering the wall cracks open. A forty-year division starts to loosen in a single night. Live around the world:\n" +
          "champagne, hammers, strangers embracing.\n" +
          "Suddenly \"how long can the Cold War last\" is the question everyone scrambles to answer. In your community\n" +
          "live the children of Eastern European immigrants — and they are knocking on each other's doors until dawn.",
        brief: {
          lede: "A stage handed down by heaven: one of the rare moments when merely standing there and talking like a human gets you lit by history.",
          known: [
            "The wall is coming down; unification looks irreversible — pace and European reaction are not.",
            "The local Eastern European community is electric; you are the ready-made face of \"the one who gets us.\"",
            "TV stations are hunting reaction shots from everywhere. The opening is laid out in plain sight."
          ],
          rumor: [
            "Some say the Soviets will roll the tanks out like always, and the party turns to blood.",
            "Some say it is all theater; the same men still rule behind the iron curtain."
          ],
          unknown: [
            "The Soviet Union dissolves within two years; the victory story defines a generation.",
            "Whoever says the right thing at this hinge gets welded into the history."
          ],
          terms: [{ k: "Berlin Wall", v: "The barrier between East and West Berlin, opened in 1989." }]
        },
        choices: [
          {
            id: "historic",
            text: "Go to the Eastern European quarter: keep a vigil for freedom and say something worth remembering",
            outcomes: {
              crit: { body: "Your words get cut into the local station's coverage of that night. The great moment and your face share one frame." },
              ok: { body: "You stood the vigil with the community. The air was all hope, and some of the glow landed on you." },
              meh: { body: "You came and said a few timely words. History was too loud; no one could hear yours." },
              fail: { body: "Your remarks drown in the celebrating. By morning nobody recalls you were there that night." },
              critfail: { body: "You came to borrow the light; a heated immigrant challenges you: \"you never took us seriously before.\" The mood freezes." }
            }
          },
          {
            id: "vision",
            text: "Pull the camera back: talk where a Europe without iron curtains should go",
            outcomes: {
              crit: { body: "Your long-view analysis catches the eye of someone senior. The word starts around: this man can see ten years off." },
              ok: { body: "You spoke like a man of vision. Weighty — even if no one picks up the thread yet." },
              meh: { body: "You offered grand plans. The country wants to celebrate, not to take notes." },
              fail: { body: "Coolly discussing \"what next\" while the nation whoops marks you a killjoy." },
              critfail: { body: "Your grand blueprint gets clipped into \"he doubts this will really happen.\" Nobody likes hearing it." }
            }
          },
          {
            id: "simply",
            text: "Just be one of the crowd: raise champagne in the street, say nothing",
            outcomes: {
              crit: { body: "The cameras catch your real joy. People say: \"that looks like an ordinary man facing history.\" Somewhere in the crowd someone starts chanting your name." },
              ok: { body: "You melt into the celebration. You did nothing wrong — and you will remember all of it." },
              meh: { body: "You cheered the night away. The sun rose as usual next day." },
              fail: { body: "You look slightly out of place in the crowd. Someone mutters: \"what is he doing here?\"" },
              critfail: { body: "You angled for a discreet cameo and got photographed looking blank. The evening paper's caption: \"He and his voters, out of step.\"" }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1990-08 海湾危机 */
      {
        id: "rg90_gulf",
        title: "Tanks cross the border; oil prices jump overnight",
        body: "Iraq's war machine swallows Kuwait in a single night; Saddam now holds one of the world's biggest oil\n" +
          "reserves in his fist. Carriers steam into the Persian Gulf; gas-station boards get rewritten three times a day;\n" +
          "every channel runs tanks massing in the sand.\n" +
          "\"Fight or not — and can we afford it\" lands on the whole country. Your district has a recruiting office,\n" +
          "oil-linked jobs, and families just flown back from the Gulf.",
        brief: {
          lede: "A war that may be short — or may drag — waits at the door. Oil, manpower, conscience: all twisted into one question, handed to you.",
          known: [
            "The UN is running a countdown for withdrawal; the White House leans to force; Congress has not voted authorization.",
            "Gas lines form at home; oil panic arrives before the war does.",
            "The anti-war camp and the no-reward-for-aggression camp each hold half the country. Both want to borrow your mouth."
          ],
          rumor: [
            "Some say this one will be quick — in, done, out.",
            "Some say it is the start of another bog that will bleed us."
          ],
          unknown: [
            "The fight itself will be fast; the aftermath bog is only beginning.",
            "Which side you back now — vision, or the crowd?"
          ],
          terms: [{ k: "Gulf Crisis", v: "The crisis after Iraq's 1990 annexation of Kuwait." }]
        },
        choices: [
          {
            id: "authorize",
            text: "Back the hard line: authorize force, steady oil prices and credibility at once",
            note: "Ride the no-looking-weak wave. Quick victory makes you prescient; a hold makes you the one who green-lit the bog.",
            outcomes: {
              crit: { body: "The coalition crumples the invader in days. Your firm refusal to appease becomes your badge of nerve." },
              ok: { body: "You stood hard. The mainstream approves; the anti-war crowd frowns." },
              meh: { body: "You backed force — but in the end bigger hands decided this one." },
              fail: { body: "The war starts and will not end; oil stays dear. People begin asking who urged this in the first place." },
              critfail: { body: "It grinds on; casualties make papers. Your quick-war guarantee replays endlessly. \"The man who blessed a bog\" never washes it off." }
            }
          },
          {
            id: "diplo",
            text: "Give sanctions and diplomacy a chance — do not rush the kids to the front",
            note: "Hold the anti-war, cautious ground — but wear the label \"rewarded aggression.\"",
            outcomes: {
              crit: { body: "After the guns, your \"not so fast\" gets re-evaluated as clear sight. The steady label holds." },
              ok: { body: "You urged diplomacy first. The doves are relieved; the hawks take note." },
              meh: { body: "You said the prudent thing; the war-headline flood buries it fast." },
              fail: { body: "Once the shooting starts, \"manners before aggression\" makes you look out of date." },
              critfail: { body: "\"Saddam holds the oil fields — he holds our windpipe\" wins the argument. Your caution gets called naive, or friendly to the enemy." }
            }
          },
          {
            id: "homefront",
            text: "Skip the war debate; mind oil prices and military families — steady the home side first",
            outcomes: {
              crit: { body: "You stepped around the ideological battlefield and did plain work for the gas lines and the families. Neither side can find a word against it." },
              ok: { body: "You did the useful local chores. Safe, faintly likable." },
              meh: { body: "You minded your own patch. The grand narrative does not remember you." },
              fail: { body: "Talking pump prices while the nation argues about war marks you as a man who cannot tell big from small." },
              critfail: { body: "You wanted clean of both sides; both sides filed you as \"the man who says nothing when it counts.\"" }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1984-11 月亮竞选 */
      {
        id: "rg84_landslide",
        title: "The coattail election: everyone wants to borrow the moon's light",
        body: "The economy warmed, the hostages came home, the opponent keeps tripping over himself. Reagan is headed\n" +
          "for forty-something states, and Republicans are sweeping down-ballot seats behind him — the press calls it an\n" +
          "election that borrows all its light from the moon.\n" +
          "In that tailwind the party drags you onstage to campaign, donors seat you at the table for the spoils, even\n" +
          "opponents are taking inventory. A wave can lift you — or bury you in the sand with everyone who bet wrong.",
        brief: {
          lede: "In a tsunami that is not about you, when and where you stand matters more than who wins.",
          known: [
            "The polls are lopsided; the result is decided. The open count is how many \"on his coattails\" winners the wave drags in.",
            "The party wants you on a rally circuit; upstairs they are already pricing which posts go to the workers.",
            "You know borrowed light is not your own — when the tide goes out, you can see who is swimming naked."
          ],
          rumor: [
            "Some say this wind has two years in it, at most; second-term trouble is already under way.",
            "Some say stake your sign on it now and there will be cake to cut next round."
          ],
          unknown: [
            "In two years this sweep becomes a vacuum.",
            "Your name may end up as the exhibit for winning nothing on your own."
          ],
          terms: [{ k: "Coattails", v: "Riding a national wave into local office — the first washed away when it recedes." }]
        },
        choices: [
          {
            id: "bandwagon",
            text: "Stake the whole sign on the wave: campaign for the winners nationwide",
            note: "Bet the wind keeps blowing. Right, you leap to the top; wrong, you are the exhibit for \"he only ever borrowed light.\"",
            outcomes: {
              crit: { body: "You are the hardest-working drummer of the wind; at the victory banquet they call your name three times. The party records the effort." },
              ok: { body: "You catch the tailwind and show your face plenty. Your name sits mid-list when the seats get divided." },
              meh: { body: "You ran yourself ragged; all the credit went to bigger names overhead. Few count it to you." },
              fail: { body: "The wind dies. Your clips for a locally scandal-tainted candidate get dug up; you cannot back out of them." },
              critfail: { body: "The pickup you grabbed in the wave's name surfaces: \"he made his on that tour.\" Your name is on the settlement list." }
            }
          },
          {
            id: "wait",
            text: "Bet on nobody: talk local issues only, keep a back road for yourself",
            outcomes: {
              crit: { body: "You let the wind blow past and did a few solid local things instead — when the tide went out, you were still on shore." },
              ok: { body: "You kept your distance. Neither warm nor cold; nobody gets a handle on you." },
              meh: { body: "The wave rolls across the country, and you are quiet as if you skipped the election entirely." },
              fail: { body: "No share of either side's wind for you. Some say he cannot even say which side he is on." },
              critfail: { body: "You helped no one. What comes back is not gratitude — both sides quietly filed you as unreliable." }
            }
          },
          {
            id: "host",
            text: "Fund a donor dinner out of your own pocket: bring the national wind to your table",
            note: "The host is always first in the room he hosts — but this meal costs real money. When the funds run short, you can only stand at the door and smile.",
            outcomes: {
              crit: { body: "Everyone at that table later says \"we met at that dinner.\" Your name ties to the wind tighter than anyone's; they ask you first when the seats get carved." },
              ok: { body: "The dinner runs smooth. The party files you as \"the one who gathers people\" — and thinks of you when a seat opens." },
              meh: { body: "The money went out, the food went cold, half the right names never came. All you got was \"he is keen.\"" },
              fail: { body: "The dinner gets called \"gilding himself with the donors' coin.\" Nobody records the favor." },
              critfail: { body: "The bill and the photographs beside the losers surface together. You are now \"the best gilded man of the wave.\"" }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1988-11 大选交接 */
      {
        id: "rg88_election",
        title: "Two terms run out; the succession race splits the party in half",
        body: "The president's time is up, and the race to succeed him tears the party in two: Vice President Bush carries\n" +
          "Reagan's banner and promises continuity, against a challenger promising renewal. On the other side,\n" +
          "Massachusetts governor Michael Dukakis speaks soft and steady.\n" +
          "Your level is forced to choose a side. No Reagan halo shines on this one. Bet wrong and nobody covers you.",
        brief: {
          lede: "The first election after the tide goes out rewards not the loudest voice, but whoever bets right while the wind is still undecided.",
          known: [
            "Reagan remains popular, but who inherits — and whether the line changes — is already a brawl inside the party.",
            "The opposition chants \"peace and prosperity,\" trying to claim eight years of credit wholesale.",
            "At local level nobody rides free anymore. Every vote must be earned by hand."
          ],
          rumor: [
            "Some say this is a generational handoff — hitch on and eat eight more years of wind.",
            "Some say the wind shifts overnight; what you back now is a liability in two years."
          ],
          unknown: [
            "The handoff will leave the country with nothing changed.",
            "Your camp this round — conviction, or copying the crowd?"
          ],
          terms: [{ k: "Succession Struggle", v: "When the incumbent cannot run: the party's fight over who inherits which line." }]
        },
        choices: [
          {
            id: "attack",
            text: "Run the negative playbook for one side: nail the opponent as unfit",
            note: "Dirty work needs doing. Do it well and you are a founding retainer; botch it and the whole party's scandal lands on your head.",
            outcomes: {
              crit: { body: "The negative punches you run land precise and stay clean. After the win, spoils are dealt; your name enters the small circle of men who know how to fight." },
              ok: { body: "The cards you played worked — not pretty, but they took a few key states for the side." },
              meh: { body: "Your negative card pricks nothing; the opponent gathers it up with one line about unity." },
              fail: { body: "One dirt packet you fed gets proven false. The fire burns straight back to you — \"he ordered it.\"" },
              critfail: { body: "The forged dirt and the back-room handling are flipped inside out. You go from \"campaign hero\" to \"target of the investigation.\"" }
            }
          },
          {
            id: "issues",
            text: "Refuse the dirty work: run your own platform, keep your head down",
            outcomes: {
              crit: { body: "In a hall tearing itself apart, your not-taking-the-bait stands out. Some start counting you among \"the ones who can still talk sense.\"" },
              ok: { body: "You stayed out of the fight and lost no ground. You kept your own yard." },
              meh: { body: "No voice of yours in all that noise; no one remembers being smeared by you either." },
              fail: { body: "Both sides finish mauling each other, then complain you \"picked late.\"" },
              critfail: { body: "You would not touch the dirt — and the side you backed filed you as \"won't lift a finger.\" Someone quietly wrote you into the cold palace." }
            }
          },
          {
            id: "callins",
            text: "Call in the favors: ask local and church friends of long standing to stand up for this fight",
            note: "Favors banked are spent at times like these: a few old faces can warm a cold campaign. But favors are a hard account — spend one, lose one. If the account is thin, you cannot even open your mouth.",
            outcomes: {
              crit: { body: "You work through those old phone books one by one. The grassroots and the pews turn out for you — and that unpaid earnestness beats any dirty trick for hearts and minds." },
              ok: { body: "A few favors bought a few honest endorsements. Your side holds its footing." },
              meh: { body: "You asked. Few came. The scene neither collapsed nor turned because of you." },
              fail: { body: "The favors you spent could not hold the room — and you ran up a new debt: \"not there when it counted.\"" },
              critfail: { body: "The other side photographs you begging and captions it: \"his own network runs on borrowed mercy.\" Both your favors and your name hit bottom." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1989-90 储贷余波 */
      {
        id: "rg90_snl_wreck",
        title: "The thrift that lent on anything finally collapsed",
        body: "The deregulation party is over: thrift after thrift goes under; Washington wants the taxpayer to plug the\n" +
          "hole; prosecutors start asking, one by one, who paved the road for this thing back when.\n" +
          "The board seat you lent your name to, that \"professional opinion\" you signed — they sit now in a kraft-paper\n" +
          "file folder with your name on the tab.",
        brief: {
          lede: "The quick money and the loose signature of those years — now you pay back principal and interest, in person.",
          known: [
            "The federal thrift insurance fund is gutted; liquidation and accountability run in full swing.",
            "Your name-lending or advisory paper from those years survives intact — in their files.",
            "Colleagues have already been subpoenaed. Nobody says who is next on the list."
          ],
          rumor: [
            "Some say the powers will knife a few marginal name-lenders to spare the big fish.",
            "Some say pay back the money and it ends there. Nobody actually goes to prison."
          ],
          unknown: [
            "Taxpayers bury the bill; accountability finds whoever gets pushed out first.",
            "Cut loose, stonewall, or pay first — the folder either closes or opens."
          ],
          terms: [{ k: "S&L Crisis", v: "Thrift speculation collapses, with the taxpayer holding the bag." }]
        },
        choices: [
          {
            id: "refund",
            text: "Return the money and cooperate: hand back every cent of the name-lending dividends",
            note: "Lose the cash to dodge the cell; bet that \"knowing your place\" buys non-pursuit.",
            outcomes: {
              crit: { body: "You refund clean and the liquidators cite you as the \"voluntarily cooperative\" model. Your name quietly comes off the accountability list." },
              ok: { body: "You spat out the old gains. The money is gone; the chair is not." },
              meh: { body: "You paid the money back. The liquidators' interest in you barely cooled." },
              fail: { body: "You refund and still get pressed: dividends aside — what exactly did you do for them?" },
              critfail: { body: "Your refund reads as hush money — paying back proves you knew. The money dug the hole deeper." }
            }
          },
          {
            id: "deny",
            text: "Stonewall: I just lent a name. I never knew anything.",
            outcomes: {
              crit: { body: "You stick to the story — and nothing in the file can pin you down. You skate through on a thin edge." },
              ok: { body: "Your line holds. Suspected, but never proven." },
              meh: { body: "Your denial lands bloodless. The people checking on you decide to keep looking." },
              fail: { body: "A letter bearing your signature surfaces. \"I never knew\" stops rolling straight." },
              critfail: { body: "The papers prove you knew and stood behind it anyway. The lie told to escape liability becomes the nail that fastens you down." }
            }
          },
          {
            id: "sacrifice",
            text: "Point the water elsewhere: give up a bigger name in exchange for your own shore",
            note: "Save yourself over someone else — you get out, and you make a death enemy.",
            outcomes: {
              crit: { body: "You name upward, take a light tapping yourself, and the liquidators close your page with satisfaction." },
              ok: { body: "You sold out a teammate to land safe. The case settles; inside the circle nobody trusts you anymore." },
              meh: { body: "You gave names. Your seat was too marginal to purchase much mercy." },
              fail: { body: "You reach for a man to fall with; he bites first. You both enter the file pointing at each other." },
              critfail: { body: "Your fabricated testimony gets picked apart. You are upgraded from suspect to obstructor. That step crosses a prison threshold." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1980-04 鹰爪行动 */
      {
        id: "rg80_eagleclaw",
        title: "The rescue burns in the desert; eight did not come back",
        body: "Six months past the day Tehran started holding Americans. A helicopter and a transport collide and catch\n" +
          "fire at the night staging point in the desert; eight servicemen go into foreign sand — the mission dead before\n" +
          "it ever touched a hostage.\n" +
          "Television loops the burning wreckage. Overnight the country's six-month humiliation catches fire. One\n" +
          "family here has just received a death notice — you can knock on their door, or pretend none of this is happening.",
        brief: {
          lede: "A rescue botched in public puts \"have we lost it all?\" on every living-room coffee table.",
          known: [
            "Fifty-plus Americans are still held in Tehran; after this failure, even negotiating sounds like surrender.",
            "Among the eight dead is a local son; the media is hunting for a voice that \"represents the town.\"",
            "The White House blames dust and machinery. Few swallow it."
          ],
          rumor: [
            "Some say the raid was reckless — jammed in to suit the political calendar.",
            "Some say the weather and coordination flaws were spotted early and hidden for the glory."
          ],
          unknown: [
            "The hostage question will hang over the whole election.",
            "How you posture toward that family — the block remembers for years."
          ],
          terms: [{ k: "Hostage Crisis", v: "Iranian students seize the US embassy; the rescue ends in disaster." }]
        },
        choices: [
          {
            id: "condole",
            text: "Visit the bereaved family, speak to what is real, keep the West Wing out of it",
            note: "Safest: mourning cannot misfire, but it borrows no hard-line light either.",
            outcomes: {
              crit: { body: "You sit in that living room with red eyes and never say a ceremonial word. The town remembers: he actually came." },
              ok: { body: "You pay your respects properly and help quietly. The family notes it." },
              meh: { body: "You went, said a little. Nobody especially remembers." },
              fail: { body: "Your condolence starts to look like retail politics, and the family asks face to face: \"are you here for him, or for votes?\"" },
              critfail: { body: "You are seen laughing through a phone call beside the mourning hall. Local paper, front section." }
            }
          },
          {
            id: "hawk",
            text: "Speak through the humiliation: harder — put military options on the table",
            note: "Bet the public loves steel. If the escalation comes and something breaks, every shove you gave is on the ledger.",
            outcomes: {
              crit: { body: "Your line on local radio — \"we cannot be ridden like this\" — gets passed around again and again. The hawks adopt you as one who dares to say it." },
              ok: { body: "You voiced the stifled rage of plenty; another plenty noted your face." },
              meh: { body: "Tonight the country only wants the hostages alive. Your shouting rings hollow." },
              fail: { body: "Beating war-drum while the nation grieves gets you written up as \"warming his hands on soldiers' blood.\"" },
              critfail: { body: "\"Should have bombed the place flat\" replays in your own words. Even the moderates cut the line at you." }
            }
          },
          {
            id: "blame",
            text: "Aim at the confusion in the decision-making: publicly hold this disastrous mission to account",
            outcomes: {
              crit: { body: "You walk the press through the procedural and intelligence gaps, point by point. The local paper calls you one of the few who can state what actually went wrong." },
              ok: { body: "You picked out real flaws. Offending people, but showing weight." },
              meh: { body: "Your technical criticism — nobody has the patience tonight." },
              fail: { body: "You keep hammering the White House until someone asks \"and what would you have done?\" You have no answer." },
              critfail: { body: "You fling an insider charge with no evidence behind it — and get branded the rumor mill instead." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1980-11 里根当选 */
      {
        id: "rg80_election",
        title: "\"Are you better off than you were four years ago?\" — one line redraws the map",
        body: "One plain question walks into living rooms across the country, sweeps forty-some states, hands the\n" +
          "Republicans their first Senate in decades — and \"the silent majority\" is named as a force for the first time.\n" +
          "On the night the tide turns, both camps at home wait on your word: one eager to speak with the new wave, one\n" +
          "demanding you stay in your old formation. Whichever side you stand, the next ten years' resources flow from there to you.",
        brief: {
          lede: "An election about mood, not policy. Read the wave right and you rise with it.",
          known: [
            "Inflation, hostages, a failed rescue — Carter's approval bottomed out long ago.",
            "Reagan sweeps television with an actor's warmth; the conservatives are assembling a new force.",
            "The local machine is split: the establishment wants a hedge, the grassroots want to follow."
          ],
          rumor: [
            "Some say it is just one generation's boredom — four years and it swings back.",
            "Some say the map is truly redrawn now, for twenty years."
          ],
          unknown: [
            "This coalition sets the country's agenda for the next decade.",
            "Your side on this turning night will be the most conspicuous line in your record."
          ],
          terms: [{ k: "Realignment", v: "Reagan's victory fuses conservatives and the religious right into a new coalition." }]
        },
        choices: [
          {
            id: "bandwagon",
            text: "Move toward the new coalition: send word down the rising wave, take your turn in line",
            note: "Bet this wave governs for a decade-plus. Right, you leap to the top; wrong, you are the party's marked \"opportunist.\"",
            outcomes: {
              crit: { body: "You timed the wave exactly. Overnight you go from fringe to \"somebody in the new coalition\" — donations and introductions start flowing along that line." },
              ok: { body: "You crossed in time. The new order has your name." },
              meh: { body: "You sent the word. The wave saved you no seat." },
              fail: { body: "You bet the wrong local book. The new allies think you came late; the old colleagues call you traitor." },
              critfail: { body: "You waved the flag at the wave's head — and the wave lost here, badly. Both doors swing you out together." }
            }
          },
          {
            id: "hold",
            text: "Stay in your old formation: hold the base, be no weather-vane",
            outcomes: {
              crit: { body: "After the tide goes out you are standing where you always stood. The people left in the ruins all remember your not-running. In the wreckage you banked the deepest loyalty there is." },
              ok: { body: "You did not chase the wind. The grassroots mark down your steadiness." },
              meh: { body: "You held the line. The line is scattering." },
              fail: { body: "You held the losing side. From now on the resources route around you." },
              critfail: { body: "Too new for the old guard, too old for the new — both sides decide you are useless." }
            }
          },
          {
            id: "localist",
            text: "Bet no national stake: talk local business; whoever wins, work still gets done",
            outcomes: {
              crit: { body: "You keep out of the national wind and just set right the town's water, power and streets — both camps still need you to get anything done." },
              ok: { body: "You offended nobody and befriended nobody deeply." },
              meh: { body: "You dodged this round of camp-taking. Calm waters." },
              fail: { body: "When the wind swings, your neutrality starts reading as cowardice." },
              critfail: { body: "Whichever team won, neither counted you one of their own — and opportunity started routing around your door." }
            }
          },
          {
            id: "purse",
            text: "Write the big check: take a seat at the coalition's organizing table",
            note: "Money buys an entry ticket: straight to the front rank of the wave. But it is real cash out the door — a thin purse cannot even get through the gate, and you just watch others take their seats.",
            outcomes: {
              crit: { body: "Your donation slams the table first. The list of \"the money behind the new coalition\" takes your name that same hour; national operators start offering you cards." },
              ok: { body: "The check bought the ticket. At the victory banquet you sit at the head table, your name read out properly." },
              meh: { body: "The money spent; the wave saved you no chair. You got a corner of one photograph." },
              fail: { body: "You poured in real money — and the county flipped the other way. The cash drowned, and the old colleagues call you rich and soft-brained." },
              critfail: { body: "One big check bought a reputation as \"he thinks money is a personality.\" After the wind, neither side claims you, and the purse bottom shows." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1986-04 空袭的黎波里 */
      {
        id: "rg86_libya",
        title: "Planes cross the Atlantic; bombs land on Tripoli",
        body: "A bombed Berlin disco, dead American soldiers — Washington points at Gaddafi, then strikes Tripoli and\n" +
          "Benghazi overnight. Gaddafi's adopted daughter dies in the blast. On live television, for the first time,\n" +
          "someone says the word retaliation without flinching.\n" +
          "Congress is in an uproar: can a president fight without declaring war? Local boys are flying from overseas\n" +
          "bases right now. Reporters camp your doorstep for one sentence.",
        brief: {
          lede: "A popular airstrike and a constitutional question — who gets to start a war — land on you in the same hour.",
          known: [
            "Most of the country applauded that night: someone finally stood up.",
            "Critics say it bypasses Congress, sets a dangerous precedent, and puts Americans held abroad at retaliatory risk.",
            "Local kids serve in the units that flew. Their families only want them home."
          ],
          rumor: [
            "Some say the real target was Gaddafi himself — an assassination that came up short.",
            "Some say the flex was for the home audience; domestic politics is the real theater."
          ],
          unknown: [
            "Whether retaliation draws a string of attacks aimed at Americans.",
            "Whichever side you take tonight will be quoted back at you for years."
          ],
          terms: [{ k: "War Powers", v: "The quarrel over who may start a war: Congress declares, the president commands." }]
        },
        choices: [
          {
            id: "back",
            text: "Back the strike openly: a blow answered with a blow",
            outcomes: {
              crit: { body: "Your steel matches the night's mood exactly. People file you under \"he does not flinch.\"" },
              ok: { body: "You lined up with public opinion. The applause is decent." },
              meh: { body: "You said you backed it, flatly. Nobody especially remembers." },
              fail: { body: "Then came the retaliatory attacks on Americans. Someone digs out your earlier \"steel.\"" },
              critfail: { body: "The death list keeps lengthening. An editorial sets your name beside the words \"sending kids off to war.\"" }
            }
          },
          {
            id: "warpowers",
            text: "Question the procedure: no president makes war undeclared",
            outcomes: {
              crit: { body: "While the crowd cheers you hold to the constitution — and turn out to have held the line. Legal and editorial circles take note." },
              ok: { body: "You raised a legitimate procedural case. Out of season, but with spine." },
              meh: { body: "Your procedure talk sounds like a lecture; the patriotism swell runs louder." },
              fail: { body: "Discussing \"process\" while the nation seethes gets you accused of sabotaging our own side." },
              critfail: { body: "You get pinned with \"apologist for the enemy,\" and the opposition frames that quote in their ad." }
            }
          },
          {
            id: "personal",
            text: "Talk only about the local kids deployed: bring them home in one piece",
            outcomes: {
              crit: { body: "You skip the grand talk and think only of the parents waiting for word — and plain feeling wins. The military-community takes you as one of their own." },
              ok: { body: "You turned the camera onto actual people and families. Steady and humane." },
              meh: { body: "You talked neighborhood; no heat from it, no mistake either." },
              fail: { body: "Some say you mind \"only your few families\" — no temperament for the affairs of state." },
              critfail: { body: "Right as you say \"bring them home,\" the next casualty list lands on the town. You could not have timed it worse." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1987-06 勃兰登堡门 */
      {
        id: "rg87_wall",
        title: "Across a wall, the president dares him: tear it down",
        body: "At the Brandenburg Gate the American president names his counterpart on the far side and tells him to\n" +
          "tear down this wall. The world's cameras point at the Cold War's hardest scar; anti-nuclear chants at one\n" +
          "point drown the speech itself.\n" +
          "Arms-control talks are quietly accelerating even now, while the hawks burn at the line. Your local station\n" +
          "wants your sentence: is this courage, or vanity that gambles with peace?",
        brief: {
          lede: "One line puts the Cold War's direction on the table — you may be cheering the endgame, or endorsing a misjudgment.",
          known: [
            "Across the wall a young reformer just took over, and he talks differently from his predecessors.",
            "In the same year, secret talks on cutting Europe's intermediate-range missiles are moving.",
            "The antinuclear movement still floods the streets of whole cities."
          ],
          rumor: [
            "Some say the line was for the home audience — its foreign payoff is doubtful.",
            "Some say if the other side does not yield, the speech becomes the propaganda of a provocation."
          ],
          unknown: [
            "The wall falls by itself in two years. No one believes that now.",
            "Your words today get graded only where history turns."
          ],
          terms: [{ k: "Brandenburg Gate", v: "The Cold War landmark by the Berlin Wall; Reagan's dare was spoken here." }]
        },
        choices: [
          {
            id: "echo",
            text: "Echo it loudly: this is the steel the free world should show",
            outcomes: {
              crit: { body: "You turn the dare into a local chant. The conservative camp unanimously marks you \"standing straight\"; party resources start tilting your way." },
              ok: { body: "You applaud the hardness in season. The hawks credit you." },
              meh: { body: "You seconded the line. Nobody took it to heart." },
              fail: { body: "Détente becomes the tune after all, and your high notes look shrill and dated." },
              critfail: { body: "The day the arms treaty gets signed, someone replays your \"never concede\" tape — as the exhibit of what not to say." }
            }
          },
          {
            id: "caution",
            text: "Throw cold water: a fine mouth — do not corner an enemy with nuclear buttons",
            outcomes: {
              crit: { body: "You say outright that this is mostly home-state theater. The after-the-fact praise calls you farsighted; the commentary pages count you among the sober ones." },
              ok: { body: "You kept three parts cool in one part heat. Out of tide, but you look like a man who thinks." },
              meh: { body: "In all that heat, nobody wants your caution." },
              fail: { body: "The hawks catch you \"making excuses for the other side\" and name you in the local right-wing column." },
              critfail: { body: "The sticker \"soft on communism\" goes up on your campaign literature, and it will not peel off." }
            }
          },
          {
            id: "local",
            text: "Skip the grand narrative: talk about whether the local plant gets the defense order",
            outcomes: {
              crit: { body: "You bring the ideology line down to \"how many jobs in town.\" Both sides buy a practical man." },
              ok: { body: "No borrowed heat; you talk livelihood. Steady." },
              meh: { body: "You talked plant. Nobody picked up the thread." },
              fail: { body: "Order books while history fills the stage — people laugh: \"small horizons.\"" },
              critfail: { body: "Your little defense ledger surfaces with a conflict of interest in it. Word sticks: fighting wars or filling bellies — which were you fighting for?" }
            }
          }
        ]
      }

    ]
  }
});
