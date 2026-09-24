/* ============================================================================
 * CONTENT · i18n/en/events/106-era-1990.js
 * 中文文件 content/events/106-era-1990.js 的英文覆盖层（1990 海湾年代 4 张卡，已全量覆盖）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices / terms 里带 id 的按 id 对齐，不带 id 的对象按数组下标对齐。
 *   · 纯字符串数组（known / rumor / unknown / texts）是**整体替换**，必须整条给全，
 *     少给一条就少一条 —— 不合并。本文件四张卡均为
 *     gulf91_storm / gulf91_peace / gulf93_talkradio：known×3 rumor×2 unknown×2 terms×1；
 *     gulf92_economy：known×4 rumor×2 unknown×2 terms×1。与原文逐条一一对应。
 *   · 选项 note 只在原文有 note 的地方给（gulf91_peace 的 trim、gulf92_economy 的 watch、
 *     gulf93_talkradio 的 pivot 原文无 note，英文也不补）。
 *   · 结构性键（id / era / minYear / tierMin / weight / base / mods / effects /
 *     flags / req / cost …）由引擎保护，写了也不会生效，validate 会直接报错。
 *   · 缺译的字段自动留中文，所以可以一张一张补。
 *   · 经济字段是系数，不涉及文案，不用管。
 *
 * 英文写法：按英语重写，不是逐字翻。第二人称、现在时、短句；
 * 「」在英文里用引号或斜体；年份/机构名用真实英文（CNN、Wall Street Journal）。
 * 长度按 §11.7 同尺复核（拉丁词 ×0.5），全部字段在预算内。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "gulf91_storm",
        title: "Missiles streak the night sky, and the whole world is watching",
        body: "Months after Iraq swallowed Kuwait, the coalition starts firing. Cable crews set their cameras on hotel windows,\n" +
          "and for the first time an airstrike plays live in every living room. For or against — overnight that became\n" +
          "a question pressed onto every elected official in the country. Your Arab shopkeepers are waiting to hear how you open your mouth.",
        brief: {
          lede: "A war that is short, and filmed. Ride the patriotic wave, or say something for the few.",
          known: [
            "The local council wants your resolution to state whether you back the troops; against the war means un-American.",
            "The UN set a deadline. Most Americans approve of force, and approval is at a record high.",
            "Arab families in your district became suspects overnight; your shopkeepers' phones will not stop ringing."
          ],
          rumor: [
            "Some say this is about oil, not liberation — said quietly, and never to a reporter.",
            "Some say the decision was made long ago and the UN deadline was only procedure."
          ],
          unknown: [
            "Whether this quick victory hardens into an overseas burden nobody can put down.",
            "Whether the words you spend on a minority become your protection or your noose."
          ],
          terms: [
            { k: "Desert Storm", v: "The coalition's war on Iraq — the first war televised live." }
          ]
        },
        choices: [
          {
            id: "patriot",
            text: "Back the war: vote for the troops, ride the patriotic wave",
            note: "Safest while approval peaks — but once the war drags and the body counts arrive, the spotlight turns on you.",
            outcomes: {
              crit: { body: "Your stand runs front page in the county paper, and everyone wants a photo with you at the send-off. For now, the halo of the quick victory is yours." },
              ok: { body: "You ride the wave: safe, likable. The Arab shopkeepers close their doors to you for good." },
              meh: { body: "You backed the war, but bigger names took the airtime. You are one of a thousand votes to support the troops." },
              fail: { body: "You set the pitch too high. When the first names of the dead arrive, the district starts asking who shouted loudest." },
              critfail: { body: "Your most hawkish clip is cut into an ad — he wanted this war. Not even a quick victory rescues the image of a man who seemed eager for it." }
            }
          },
          {
            id: "caution",
            text: "Ask one careful question: how long, and what after",
            note: "Not opposing the war, only asking about the peace. Technical doubt gets beaten from both sides.",
            outcomes: {
              crit: { body: "After the swift win, your question — and then what? — is quoted back at you as foresight. Scolded then, praised after." },
              ok: { body: "You raised the aftermath carefully enough that nobody could label you, and it reads as weight." },
              meh: { body: "Your worry is drowned out by the flags. You are right, and nobody wants to hear it." },
              fail: { body: "Asking why we fight, when everyone is for it, edits neatly into: he is closer to Saddam's side." },
              critfail: { body: "Your caution gets branded traitor and indecisive in the same breath. Both words go in the ad." }
            }
          },
          {
            id: "protect",
            text: "Tend the home front: speak publicly for the shopkeepers under suspicion",
            outcomes: {
              crit: { body: "In a patriotic tide where everyone fears being next, you said the shopkeepers' names out loud. Their gratitude is lifelong, and it becomes votes at the next election." },
              ok: { body: "You shielded the local shops and they remember it. Mainstream opinion mutters about you a little." },
              meh: { body: "You said the fair thing. The shopkeepers are grateful; you were too busy to change anything." },
              fail: { body: "Speaking for the suspected turns into your doubting America. The logic loops once and the filth lands back on you." },
              critfail: { body: "Your statement is printed as a leaflet — he does not back the troops — and handed out where the veterans live." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1992 经济与投机候选人 */
      {
        id: "gulf92_economy",
        title: "The War Is Won. The Line at the Gas Station Is Not",
        body: "The war ends and oil comes back down, but the economy at home goes limp: plants moving off, layoffs\n" +
          "climbing, and a no-new-taxes promise broken by the man who made it. A loud billionaire starts a real\n" +
          "third-party run and curses both fields at once. The polls say he can take a big chunk of the vote.\n" +
          "The state committee calls: keep our people from going to watch that rich man.",
        brief: {
          lede: "Victory does not fix a wallet. When a wealthy spoiler shows up, a party's first instinct is to plug the hole, not examine itself.",
          known: [
            "The committee calls you because you can talk locally, and you know how to talk a swing voter out of a third-party run.",
            "The weak economy is sinking incumbents everywhere, and the third party fits exactly into that gap.",
            "The joke of the year: nobody votes the third-place man out. He cannot win, but he can muddy the water.",
            "Hit him head-on, or pull the talk back to your own district. The two bills come due differently."
          ],
          rumor: [
            "Some say the billionaire only wants a bigger table, and he folds once he is bought.",
            "Some say the danger is not him winning — it is him dragging the whole agenda sideways."
          ],
          unknown: [
            "Whether a third party pries a lasting crack into the two-party structure.",
            "Whether the machine remembers the man who plugged its leak, or forgets by fall."
          ],
          terms: [
            { k: "Third Party", v: "An opportunistic run outside the two parties, fed by economic anger." }
          ]
        },
        choices: [
          {
            id: "attack",
            text: "Hit him head-on: make the billionaire a spoiler's farce",
            note: "The dirty work of taking bullets for the machine. Hold the line and you are loyal; miss and it reads as your own doubt.",
            outcomes: {
              crit: { body: "You take a full swing and the third party's heat comes down; your voters come home. In a closed room, the bosses name you out loud." },
              ok: { body: "You steady your party. The billionaire never breaks out and you never become the story — but the machine logged the work." },
              meh: { body: "You took swings, but the billionaire beats himself up without help. You end up background scenery." },
              fail: { body: "The more you hit him, the bigger he gets — you became his free advertising. Your own voters start wondering which side you are on." },
              critfail: { body: "The oppo you carried for the machine comes back at you with receipts attached. You are the most bruised supporting actor in the farce." }
            }
          },
          {
            id: "absorb",
            text: "Skip the man, take the issue: say the economy voters are angry about",
            note: "Draw the water out from under him. The risk is looking not loyal enough to your own side.",
            outcomes: {
              crit: { body: "You say jobs, plants, and the pump first, and voters think someone finally said theirs. The spoiler's reason for existing halves overnight." },
              ok: { body: "You borrow the anger and bring the issue home. The third party cools, and you carry more weight." },
              meh: { body: "You reach for the issue and come up short. Voters believe whichever version they heard first." },
              fail: { body: "Your hard words for voters get filed at home as learning the opponent's script. Neither side is grateful." },
              critfail: { body: "Your populist economy talk gets ruled inside work, outside help. The machine starts looking around for your replacement." }
            }
          },
          {
            id: "watch",
            text: "Stay out: let the big names fight, I will hold my own ground",
            outcomes: {
              crit: { body: "You sit it out and let the national machine fight that mess. You offend none of the billionaire's fans and lose nothing in the wreckage. Steady." },
              ok: { body: "You stayed out. The bosses may be a little disappointed; you did not spend yourself on a war that was not yours." },
              meh: { body: "You kept your hands clean. The machine kept a different note: when it counted, he was not there." },
              fail: { body: "You did not help, and in the after-election inquest, where were you becomes the question pressed onto your chest." },
              critfail: { body: "You try to offend nobody and both camps decide you failed to stand. You dodged the war and lost the settlement." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1991 和平红利去哪 */
      {
        id: "gulf91_peace",
        title: "The Wall Came Down, the Budget Did Not",
        body: "The Soviet Union breaks up and the Cold War is over. People start saying peace dividend: take the military\n" +
          "money and rebuild the bridges, the schools, the national debt. Others warn against getting soft — a power\n" +
          "with no rival left needs its muscles more than ever. A cut-or-keep vote is sitting on your desk, stuck.",
        brief: {
          lede: "An era ends, and with it the paychecks of one crowd and the destination of a very large pile of money.",
          known: [
            "The vote lands on you: your district holds defense plants, and voters waiting on a road to be fixed.",
            "Defense contractors are lobbying hard on one line — do not disarm yourself.",
            "Fiscal hawks are watching the deficit and want the savings put on debt or spent at home."
          ],
          rumor: [
            "Some say the real threat is gone and the rest of the budget is only contractors splitting a haul.",
            "Some say the old rival is gone but new trouble is rising in the Gulf — do not cut yet."
          ],
          unknown: [
            "If a new enemy appears, every cut you voted for becomes the record against you.",
            "Whether a built-at-home record lasts until your next election."
          ],
          terms: [
            { k: "Peace Dividend", v: "Spending Cold War military money on domestic needs and the debt." }
          ]
        },
        choices: [
          {
            id: "dividend",
            text: "Cut and build at home: bring the money back for bridges and schools",
            note: "A bet on post-Cold War optimism, that no new threat arrives soon. The contractors and the generals will keep the score.",
            outcomes: {
              crit: { body: "You turn a chunk of the defense budget into local schools and roads. At the ribbon-cutting you are proof peace pays — and you do not escape the contractors' glare." },
              ok: { body: "You cut and spend at home. Voters get something real; the defense industry notes the debt." },
              meh: { body: "You cut, but most of the savings go to the debt and not one brick shows locally. The benefit is arguable; the grudge is not." },
              fail: { body: "The week you cut, a new crisis breaks overseas. Overnight you go from the far-sighted one to the man who disarmed America." },
              critfail: { body: "Your drawdown meets a new threat, and a plant that was supposed to open dies anyway. Defense and idle workers combine for the same story about you." }
            }
          },
          {
            id: "muscle",
            text: "Protect the budget: a power with no rival needs its muscles more",
            note: "Go with the contractors and the generals. Steady tonight — the price is handing the peace-dividend crowd to your opponent.",
            outcomes: {
              crit: { body: "You fight for the budget, the plants stay open, and the contributions arrive on schedule. One of us — good at defense and better at the economy." },
              ok: { body: "The budget holds and nobody at the plant gets laid off. Defense is content; the voters waiting on a new school are not." },
              meh: { body: "You saved the budget, but the argument sounds strange in a country that just finished its war. All you land is: keeping the old machine running." },
              fail: { body: "You cling to the budget while the whole country says peace dividend. The war-profit-defender label goes on you clean." },
              critfail: { body: "Your vote-to-protect photo runs right beside the contractor dinner pictures. Whose money, whose benefit — the headline spells it out." }
            }
          },
          {
            id: "trim",
            text: "Split it: trim a little, promise to keep some of it local",
            outcomes: {
              crit: { body: "A clean piece of mechanics: you claim the peace-dividend credit and still keep the key contracts at the local plant. Nobody takes offense." },
              ok: { body: "You trim a little and keep a little. Every camp concludes he did not cut into mine." },
              meh: { body: "Your compromise satisfies nobody and offends nobody badly enough to fight. The price of the middle is being forgotten." },
              fail: { body: "You try to please both sides; both decide you hid something for yourself." },
              critfail: { body: "Both sides pick half your deal to attack: defense says you want the plants shut, reformers say you are shielding defense." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1993 谈话电台的深夜来电 */
      {
        id: "gulf93_talkradio",
        title: "A Combative Talk-Radio Host Wants You On Air",
        body: "A host who built his ratings on rage calls you out for a showdown. His show does not trade in arguments, only\n" +
          "in feeling, and he hunts the soft spot under every politician's collar. Picking up the line is fun — but on\n" +
          "the other end of it, the editing scissors have been sharpened for a while.",
        brief: {
          lede: "This kind of show is not afraid you will attack it, only that you will stay away. Once you are in, what you say stops deciding who wins.",
          known: [
            "You refused an interview once and he ran it as guilt. This time he calls you out by name.",
            "His audience is fanatically loyal. One caught slip of yours can play all year.",
            "Your opponent is listening in, waiting for you to say the wrong thing out loud."
          ],
          rumor: [
            "Some say the host has a private arrangement with a campaign and digs holes for the opponent.",
            "Some say no show makes fans faster: go on, push back, gain a following by morning."
          ],
          unknown: [
            "Whether tonight you are the joke or the man who would take the hit.",
            "How long the tape of you keeps circulating."
          ],
          terms: [
            { k: "Talk Radio", v: "Call-in radio where the host's heat outruns the facts." }
          ]
        },
        choices: [
          {
            id: "go",
            text: "Take the call: play him by his own rules",
            note: "High risk, high payout. Hold the line and you win fans; crack once and you belong to everybody else's jokes.",
            outcomes: {
              crit: { body: "You sit relaxed in the chair and turn his best shot back on him. Every local conversation that night is you: he shows up, and he can talk." },
              ok: { body: "You absorb the baiting and land a few good lines of your own. Not a rout either way." },
              meh: { body: "He leads you around the whole hour. You get out standing, with nothing worth re-airing." },
              fail: { body: "His questions come in a chain and you run out of words. That uh, well becomes tonight's promo." },
              critfail: { body: "Angry, you say something live with no way back. Your next campaign hears the unedited version." }
            }
          },
          {
            id: "refuse",
            text: "Decline in public: I do not do that show",
            note: "You dodge the trap and prove his line for him: he dared not come.",
            outcomes: {
              crit: { body: "You turn down that kind of stunt in one flat sentence, and it reads a class above him. He missed the fish and lost his manners doing it." },
              ok: { body: "You step around the hole gracefully. The host is a little disappointed; you stay clean." },
              meh: { body: "You decline, and he puts he would not come straight on the show. You did nothing wrong and it still costs you air." },
              fail: { body: "Your refusal gets replayed as he is scared. Not a fatal cut, but it keeps opening." },
              critfail: { body: "You refuse and throw a threat back at him. He takes it as his opening line and eats on it all week." }
            }
          },
          {
            id: "pivot",
            text: "Push the mic back: ask who is paying him to work this hard",
            outcomes: {
              crit: { body: "In one sentence the story stops being you and becomes his money. The host has no answer, and who-pays-him turns on him for once." },
              ok: { body: "You turn it back on him and the attack flips, briefly. No rout, but you take a hole." },
              meh: { body: "You ask your question. It is his show, and he laughs the thread over to something else." },
              fail: { body: "You snap at his funders with nothing to show for it and look panicked instead. He happily pins the can't-take-a-hit label on you." },
              critfail: { body: "Your accusation gets taken apart live on the air, and the clip becomes raw footage for your opponent's next ad." }
            }
          }
        ]
      }
    ]
  }
});
