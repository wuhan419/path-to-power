/* ============================================================================
 * CONTENT · i18n/en/events/65-campaign-acts-b.js
 * 中文文件 content/events/65-campaign-acts.js 后半段（按文件内 id 顺序第 57 个
 * id 起：camp_federal_primary 的 steady_defend 选项 → 至 camp_pres_swing 全卡）
 * 的英文覆盖层。前半段（含 camp_federal_primary 卡级字段）归 65-campaign-acts-a。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 结构性键（id / base / mods / effects / cost …）由引擎保护，一律不写。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "camp_federal_primary",
        choices: [
          {
            id: "steady_defend",
            text: "Do not attack; guard your incumbent edge",
            outcomes: {
              crit: { body: "You commit no errors. Steady play protects the incumbent's edge." },
              ok: { body: "The primary passes without incident." },
              meh: { body: "You neither widen nor close the gap." },
              fail: { body: "Too cautious. Your challenger seizes the storyline." },
              critfail: { body: "You barely answer the challenge. Momentum slips." }
            }
          }
        ]
      },

      /* ---------------- 筹款与金主 ---------------- */
      {
        id: "camp_federal_money",
        title: "Donors open their vaults, and their conditions",
        body: "A congressional campaign burns cash like fuel. The donors will open their vaults — but their terms are never free. Take a man's money today, and someday you speak for him.",
        choices: [
          {
            id: "take_money",
            text: "Accept the donors' big checks",
            outcomes: {
              crit: { body: "The donors go all in. Your ads saturate every market overnight." },
              ok: { body: "The checks clear. The machine runs at full power." },
              meh: { body: "The money lands. So do a few quiet favors." },
              fail: { body: "A donor blinks late. Your accounts come up short." },
              critfail: { body: "A dirty donation leaks to the press. You become the attack ad." }
            }
          },
          {
            id: "small_dollar",
            text: "Refuse the donors; run on small dollars",
            outcomes: {
              crit: { body: "'Not one donor dollar' becomes your loudest slogan. Small checks pour in." },
              ok: { body: "Grassroots money holds. You stay clean and solvent." },
              meh: { body: "Little money — but every dollar is spotless." },
              fail: { body: "Pocket change cannot cover the ad buy." },
              critfail: { body: "Integrity buys no airtime. A donor-backed opponent buries you." }
            }
          },
          {
            id: "moderate_raise",
            text: "No big checks, no crowdfunding, no drama",
            outcomes: {
              crit: { body: "You live within your means. The machine runs smooth." },
              ok: { body: "No donor debts, and the accounts stay solvent." },
              meh: { body: "No windfall, no wound. Nothing changes." },
              fail: { body: "This race drowns in money, and you are counting pennies." },
              critfail: { body: "No war chest, no roar. Momentum slips." }
            }
          }
        ]
      },

      /* ---------------- 摇摆选区的最后一周 ---------------- */
      {
        id: "camp_federal_swing",
        title: "The last week in the swing district",
        body: "The polls are a dead heat, and the race will turn on a handful of suburbs. This week you wager everything. Swing voters hold no firm view — one pitch can tip them — and betting on the wrong ground lets the whole race slip away.",
        choices: [
          {
            id: "floor_push",
            text: "Knock on every door in the final week",
            outcomes: {
              crit: { body: "You work the suburbs block by block. The race turns at the wire." },
              ok: { body: "Your last-week grind holds the key voters." },
              meh: { body: "You drop from exhaustion. The race stays flat." },
              fail: { body: "The suburbs do not bite. Miles walked for nothing." },
              critfail: { body: "Back-to-back gaffes in the final week. The race collapses." }
            }
          },
          {
            id: "get_out_vote",
            text: "Drive turnout at full force",
            outcomes: {
              crit: { body: "You haul your people to the polls one by one. The race jumps." },
              ok: { body: "The turnout machine hums." },
              meh: { body: "You drag out a few — not enough to open a gap." },
              fail: { body: "Your supporters stay home. Turnout falls short." },
              critfail: { body: "It rains on election day. Your base never shows up." }
            }
          }
        ]
      },

      /* ---------------- 宣布竞逐大位 ---------------- */
      {
        id: "camp_senate_announce",
        title: "Statewide: a national figure or a nobody",
        body: "This race covers the whole state. At this level you are a national name now, or you are nothing — and your rivals are already names voters can say out loud. Fizzle at kickoff and the state files you under small.",
        choices: [
          {
            id: "pro_clip",
            text: "Launch with a cinematic ad",
            outcomes: {
              crit: { body: "The ad blankets every screen. Overnight, you are the story — and the donation page crashes that same night." },
              ok: { body: "You launch with force, and the sign-up list turns into a mailing list." },
              meh: { body: "Well made. Not many watched." },
              fail: { body: "Critics call it hollow. It moves no one." },
              critfail: { body: "Every frame gets picked apart online. The state laughs at you." }
            }
          },
          {
            id: "policy_paper",
            text: "Open with a heavyweight policy paper",
            outcomes: {
              crit: { body: "Reporters quote it line by line. You own the 'serious' brand." },
              ok: { body: "A policy launch. Your command of detail registers." },
              meh: { body: "Well written, poorly spread." },
              fail: { body: "Nobody reads the paper. The launch goes quiet." },
              critfail: { body: "Analysts shred the paper's numbers on the record." }
            }
          },
          {
            id: "quiet_entry",
            text: "No splash, no probe; hold your base",
            outcomes: {
              crit: { body: "You skip the headlines and keep your house in order." },
              ok: { body: "A clean, unremarkable start." },
              meh: { body: "A quiet launch, but error-free." },
              fail: { body: "Big seats run on force. You start too softly." },
              critfail: { body: "Barely heard across the state. Momentum slips." }
            }
          }
        ]
      },

      /* ---------------- 全州初选 ---------------- */
      {
        id: "camp_senate_primary",
        title: "A primary where rivals circle",
        body: "Strong rivals inside your own party. The primary counts votes — and exposed soft spots, and your own side audits your record first. A weakness caught on tape may end you before the general.",
        choices: [
          {
            id: "win_over",
            text: "Run the middle for the broadest coalition",
            outcomes: {
              crit: { body: "Your moderate suit sweeps the primary. No rival survives it." },
              ok: { body: "You take the nomination on steady ground." },
              meh: { body: "You win, but define nothing." },
              fail: { body: "The middle pleases no one. You scrape through." },
              critfail: { body: "You lose the primary to a stronger name." }
            }
          },
          {
            id: "fire_base",
            text: "Set your base ablaze",
            outcomes: {
              crit: { body: "Your base storms the field for you. A commanding primary win." },
              ok: { body: "Enthusiastic voters carry you across the line." },
              meh: { body: "You win the primary and start losing the center." },
              fail: { body: "Primary fire becomes a general-election liability." },
              critfail: { body: "You win the votes and lose the swing voters for good." }
            }
          }
        ]
      },

      /* ---------------- 电视辩论 ---------------- */
      {
        id: "camp_senate_debate",
        title: "Live on air before a million eyes",
        body: "One live broadcast, a million watching eyes. On this stage a single line is worth two weeks of ads, and whatever you do onstage loops all week. One stumble becomes your rival's ad for the whole season.",
        choices: [
          {
            id: "command",
            text: "Steady the stage, show a leader's bearing",
            outcomes: {
              crit: { body: "Calm, specific, empathetic. The polls jump, and small donations pour in behind them." },
              ok: { body: "A solid night. You hand your rival nothing — and the money people notice." },
              meh: { body: "Serviceable. Nobody changes their mind." },
              fail: { body: "Tense and evasive — you do not look the part." },
              critfail: { body: "You lose your temper live. The clip runs on a loop." }
            }
          },
          {
            id: "go_for_kill",
            text: "Press every crack until it breaks",
            outcomes: {
              crit: { body: "One question leaves your rival speechless. The room turns." },
              ok: { body: "You keep your rival backing up all night." },
              meh: { body: "Aggressive — but voters think you overdid it." },
              fail: { body: "You hit too hard. Voters start pitying your rival." },
              critfail: { body: "Your attack gets rebutted live. You have no way out." }
            }
          },
          {
            id: "steady_hand",
            text: "No gambles, no gaffes; answer it all levelly",
            outcomes: {
              crit: { body: "You grab no scenes and make no errors; steadiness itself scores." },
              ok: { body: "You get through the debate without incident." },
              meh: { body: "Nobody remembers you. Nobody attacks you." },
              fail: { body: "Too bland. Voters sense something missing." },
              critfail: { body: "You are invisible onstage. Momentum slips." }
            }
          }
        ]
      },

      /* ---------------- 争夺摇摆地区 ---------------- */
      {
        id: "camp_senate_swing",
        title: "The state comes down to a few counties",
        body: "The statewide decision has shrunk to a handful of swing counties — and those counties pick up the entire state. All the money comes out of the war chest and goes there. Spread too thin, and you break through nowhere.",
        choices: [
          {
            id: "blanket",
            text: "Saturate the swing counties with ads and people",
            outcomes: {
              crit: { body: "You paint the swing counties your color." },
              ok: { body: "The key counties drift steadily your way." },
              meh: { body: "Huge spend, modest return." },
              fail: { body: "Money into a hole. The counties stay cold." },
              critfail: { body: "The war chest bottoms out. The counties flip anyway." }
            }
          },
          {
            id: "surrogate",
            text: "Send heavyweight allies to fight for you",
            outcomes: {
              crit: { body: "Star surrogates move swing voters in your name." },
              ok: { body: "Allies' tours plug the counties you cannot reach." },
              meh: { body: "The allies visit. Mixed results." },
              fail: { body: "An ally says the wrong thing — trending under your name." },
              critfail: { body: "Your ally's scandal drags you down with it." }
            }
          },
          {
            id: "hold_swing",
            text: "No bets, no sprints; hold your swing line",
            outcomes: {
              crit: { body: "You defend exactly the counties worth defending." },
              ok: { body: "You steady the battlegrounds." },
              meh: { body: "No gains, no losses." },
              fail: { body: "You did not fight hard enough. A county chips away." },
              critfail: { body: "Halfhearted effort, small counties lost. Momentum dips." }
            }
          }
        ]
      },

      /* ---------------- 进入候选视野 ---------------- */
      {
        id: "camp_vp_announce",
        title: "The party's leaders start saying your name",
        body: "You are no longer campaigning only for yourself. The party's leaders are weighing whether to put you on the national ticket, and your name must start to match that stage. Chase the camera without taking a stand, and you stay an outsider.",
        choices: [
          {
            id: "make_name",
            text: "Own a lane on the national issues",
            outcomes: {
              crit: { body: "Every timely answer lands. You become the front-runner for the slot." },
              ok: { body: "Your name starts appearing on shortlists." },
              meh: { body: "A recognized face. Not yet a loud name." },
              fail: { body: "The national stage still does not know you." },
              critfail: { body: "One badly timed statement crosses you off the list." }
            }
          },
          {
            id: "prove_loyal",
            text: "Serve the party leader without question",
            outcomes: {
              crit: { body: "You become the party's most reliable operator. The slot opens." },
              ok: { body: "The party leader remembers who did the work." },
              meh: { body: "Diligent, but easy to overlook." },
              fail: { body: "Loyalty buys no nomination — just a reputation as a good helper." },
              critfail: { body: "You are filed away as the go-to fixer, not the pick." }
            }
          }
        ]
      },

      /* ---------------- 背景审查与试探 ---------------- */
      {
        id: "camp_vp_vetting",
        title: "They turn over your entire life",
        body: "The vetting team turns your past inside out. They are not asking how good you are — only where you might blow up. Any concealment, once found, is fatal: dig up a buried scandal and the nomination vanishes overnight.",
        choices: [
          {
            id: "open_book",
            text: "Lay it all bare; dare them to check",
            outcomes: {
              crit: { body: "The audit closes spotless. Their trust in you hardens." },
              ok: { body: "You pass. No fatal skeletons." },
              meh: { body: "They find old dust. Nothing disqualifying." },
              fail: { body: "The files surface what you would rather not mention." },
              critfail: { body: "They find a live bomb. Doubt creeps in." }
            }
          },
          {
            id: "spin",
            text: "Package the story; skirt the sharp edges",
            outcomes: {
              crit: { body: "Not a drop leaks. The auditors find nothing to fault." },
              ok: { body: "You glide past most of the questions." },
              meh: { body: "Vague answers. A muddled pass." },
              fail: { body: "Your evasions start to look like evidence." },
              critfail: { body: "Someone catches you in a lie. Trust collapses." }
            }
          },
          {
            id: "measured_book",
            text: "Neither hide-all nor spill-all; meet it levelly",
            outcomes: {
              crit: { body: "No cover-up, no overshare — the auditors trust your candor." },
              ok: { body: "You clear this stage quietly." },
              meh: { body: "Unremarkable. You leave them nothing to hold." },
              fail: { body: "Answers short of candid feed their suspicion." },
              critfail: { body: "You hedge too much. Your standing dips." }
            }
          }
        ]
      },

      /* ---------------- 全国代表大会 ---------------- */
      {
        id: "camp_vp_convention",
        title: "The nomination is decided on the floor",
        body: "The nomination is announced this hour. Whether you stand at that podium depends on every trust you banked these past months. Miscount the votes, and the stage is not yours.",
        choices: [
          {
            id: "seal_it",
            text: "Lock the votes and take the podium",
            outcomes: {
              crit: { body: "The chair speaks your name. The hall rises." },
              ok: { body: "The nomination is yours." },
              meh: { body: "You win the nod; some in the party still hover." },
              fail: { body: "It goes to another name. You stood in the wings for nothing." },
              critfail: { body: "The floor flips to your rival, and you fade to a footnote." }
            }
          },
          {
            id: "unity_speech",
            text: "Stitch the party's rift before you rise",
            outcomes: {
              crit: { body: "One speech welds the factions shut. The choice is obvious." },
              ok: { body: "You close most of the party's cracks." },
              meh: { body: "Unity on the surface; undertow below." },
              fail: { body: "The rift stays open, and the convention is ugly." },
              critfail: { body: "The convention brawls on camera. It is blamed on you." }
            }
          },
          {
            id: "steady_nervous",
            text: "Force nothing, inflame nothing; watch it play",
            outcomes: {
              crit: { body: "Provoke no one, and you read as the one who can unite them." },
              ok: { body: "You ride the convention out without incident." },
              meh: { body: "You pushed nothing. Broke nothing." },
              fail: { body: "Nearly invisible at your own convention." },
              critfail: { body: "The window closes on you. Momentum slips." }
            }
          }
        ]
      },

      /* ---------------- 为全国助选奔走 ---------------- */
      {
        id: "camp_vp_campaign",
        title: "Barnstorming for the ticket",
        body: "You campaign across the country for your party's ticket — banking a national network, and amplifying every word you say. The more you talk, the more can slip; the silent get no coverage. One bad line turns your hard work into your rival's ammo.",
        choices: [
          {
            id: "tireless",
            text: "Barnstorm every state, never stop",
            outcomes: {
              crit: { body: "The most compelling surrogate in the country. Contacts in every state." },
              ok: { body: "National visibility, earned block by block." },
              meh: { body: "Many events. Flat returns." },
              fail: { body: "The schedule breaks you. You falter at several stops." },
              critfail: { body: "Running on empty, you say the wrong thing and hurt the ticket." }
            }
          },
          {
            id: "strategic",
            text: "Pick the hard races; save your strength",
            outcomes: {
              crit: { body: "Effort spent where it counts. Key districts turn because of you." },
              ok: { body: "You chose the right fights." },
              meh: { body: "Stamina saved. Coverage missed." },
              fail: { body: "Too careful — you skipped a race you needed." },
              critfail: { body: "Pacing yourself gets read as phone-it-in laziness." }
            }
          }
        ]
      },

      /* ---------------- 宣布竞选总统 ---------------- */
      {
        id: "camp_pres_announce",
        title: "Declaring your candidacy for president",
        body: "The longest, most expensive campaign on earth begins. From this step on, the whole country magnifies and examines every move you make. Miss the tone at kickoff and you chase the story all year.",
        choices: [
          {
            id: "grand",
            text: "Declare with a soaring speech in your hometown",
            outcomes: {
              crit: { body: "The speech airs on every channel. Your polls jump overnight." },
              ok: { body: "A forceful start. The country begins to take you seriously." },
              meh: { body: "Local news covered it. National media still wait." },
              fail: { body: "A flat launch. Almost no one in the country is watching." },
              critfail: { body: "Pundits call it empty. You start as a footnote." }
            }
          },
          {
            id: "digital",
            text: "Declare with a viral grassroots storm online",
            outcomes: {
              crit: { body: "Ordinary supporters flood the feeds. You trend, and small dollars pour in." },
              ok: { body: "The online wave builds." },
              meh: { body: "Loud for a week. Weak conversion." },
              fail: { body: "The online heat never reaches the ground." },
              critfail: { body: "An old post resurfaces. The storm turns on you." }
            }
          },
          {
            id: "steady_open",
            text: "No fireworks; build a solid operation first",
            outcomes: {
              crit: { body: "You shun the cameras and run an orderly, airtight launch." },
              ok: { body: "Steady beginning. Staff in place." },
              meh: { body: "No roar. No mess." },
              fail: { body: "The presidency needs force. You start too quietly." },
              critfail: { body: "Hardly anyone nationwide takes you seriously yet. A small slide." }
            }
          }
        ]
      },

      /* ---------------- 各州初选连胜 ---------------- */
      {
        id: "camp_pres_primary",
        title: "The grind of state-by-state primaries",
        body: "One primary after another. Early-state wins can snowball past the point of return, while a state-by-state war of attrition drains the wallet first. Fail to break through, and calls for you to quit start inside your own party.",
        choices: [
          {
            id: "early_wins",
            text: "Stake everything on the early states",
            outcomes: {
              crit: { body: "You sweep the first states. Nothing can stop the momentum." },
              ok: { body: "You win the early contests that mattered." },
              meh: { body: "Ugly wins. The buzz stays modest." },
              fail: { body: "You lose early. The money starts to wobble." },
              critfail: { body: "Loss after loss. The donors defect as one." }
            }
          },
          {
            id: "long_game",
            text: "Skip the upsets; build the delegate count",
            outcomes: {
              crit: { body: "You grind state by state and quietly lead on delegates." },
              ok: { body: "No headlines. You stack up wins." },
              meh: { body: "The board sits still. Your moment has not come." },
              fail: { body: "No string of wins, and the press forgets you." },
              critfail: { body: "Your 'long game' is shorthand for 'no path.'" }
            }
          }
        ]
      },

      /* ---------------- 锁定党内提名 ---------------- */
      {
        id: "camp_pres_nomination",
        title: "The convention: a majority of delegates",
        body: "The national convention. You need a majority of delegates, and the last uncommitted ones are deciding whether you are worth their vote. Counting quietly is safe — unless you end up short. One vote shy of a majority, and the nomination goes elsewhere.",
        choices: [
          {
            id: "deal_make",
            text: "Cut deals with every faction for the votes",
            outcomes: {
              crit: { body: "The last blocs close in the back rooms. The nomination is set — and the party hands over the keys to its vault." },
              ok: { body: "You take the nomination, and with it the donors' rolodex." },
              meh: { body: "You win it — having handed out a thousand slices of cake." },
              fail: { body: "Short of the magic number. The party begins to doubt you." },
              critfail: { body: "A surprise second ballot pulls you down." }
            }
          },
          {
            id: "grass_surge",
            text: "Ride a grassroots wave over elite hesitation",
            outcomes: {
              crit: { body: "The wave sweeps the delegations. A historic nomination." },
              ok: { body: "The surge carries you across the line." },
              meh: { body: "A big wave — but it never breaks the establishment." },
              fail: { body: "The establishment joins hands and blocks the wave." },
              critfail: { body: "The machine crushes the wave — and you with it." }
            }
          },
          {
            id: "patient_count",
            text: "No deals, no revolt; count the votes quietly",
            outcomes: {
              crit: { body: "Without a sound, you bank the votes. You outlast them all." },
              ok: { body: "You stay firmly in the count." },
              meh: { body: "Gained no votes, lost none." },
              fail: { body: "Nominations are built, not awaited. Too passive." },
              critfail: { body: "The back rooms forget you. Momentum slips." }
            }
          }
        ]
      },

      /* ---------------- 总统电视辩论 ---------------- */
      {
        id: "camp_pres_debate",
        title: "Millions are watching for one mistake",
        body: "Hundreds of millions are watching a head-to-head at the national level. One slip here could hand away the presidency itself — and any false line loops on every channel until election day.",
        choices: [
          {
            id: "presidential",
            text: "Show presidential stature, rock-steady",
            outcomes: {
              crit: { body: "Commanding, specific, magnetic. Your polls surge." },
              ok: { body: "You stand firm. No one gets a handle on you." },
              meh: { body: "Unremarkable. The persuadable stay put." },
              fail: { body: "Tense, defensive — you do not look presidential." },
              critfail: { body: "You freeze on live global television. The race craters." }
            }
          },
          {
            id: "attack_opponent",
            text: "Nail your rival to the wall on camera",
            outcomes: {
              crit: { body: "One killing question, and your rival has no answer. The room turns." },
              ok: { body: "You set the night's attack pace." },
              meh: { body: "Hard-hitting — but voters worry you overshot." },
              fail: { body: "You look mean. Voters side with your rival." },
              critfail: { body: "Your attack flips midair. You become the target." }
            }
          }
        ]
      },

      /* ---------------- 摇摆州的最后冲刺 ---------------- */
      {
        id: "camp_pres_swing",
        title: "The final seven days in swing states",
        body: "The Electoral College shrinks the race to a few swing states, and only winning them wins the presidency. Seven days left: opening the war chest is on the table, and you wager everything. Bet on the wrong states, win the popular vote anyway — and still lose.",
        choices: [
          {
            id: "swing_blanket",
            text: "Open the vault and saturate the swing states",
            outcomes: {
              crit: { body: "You paint the swing states your color, and your base catches fire." },
              ok: { body: "The key states lift. Your supporters get excited again." },
              meh: { body: "The chest empties. Modest return." },
              fail: { body: "Money cannot buy the edge. The states stay tied." },
              critfail: { body: "The vault rings empty, and not one swing state lands." }
            }
          },
          {
            id: "rally_tour",
            text: "Fly to every rally in person",
            outcomes: {
              crit: { body: "Rally after rally sets the swing states alight." },
              ok: { body: "You fight to the last hour. The key states firm up." },
              meh: { body: "You run yourself ragged. The race stays level." },
              fail: { body: "Cannot muscle the map alone — and your health flashes red." },
              critfail: { body: "You collapse mid-sprint. The race slips out of control." }
            }
          },
          {
            id: "even_push",
            text: "Keep pace; run out the key states evenly",
            outcomes: {
              crit: { body: "Stamina saved, no state missed — flawless pacing." },
              ok: { body: "You run a steady final week." },
              meh: { body: "No surge. No loss of control." },
              fail: { body: "Seven lukewarm days. Your rival takes the momentum." },
              critfail: { body: "No final sprint; small counties lost. A quiet slide." }
            }
          }
        ]
      }
    ]
  }
});
