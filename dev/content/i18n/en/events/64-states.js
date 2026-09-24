/* ============================================================================
 * CONTENT · i18n/en/events/64-states.js
 * 中文文件 content/events/64-states.js 的英文覆盖层（3 张卡 / 13 个 id）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件、选项按 id 对齐；terms 不带 id，按数组下标对齐，条数与中文一致。
 *   · known / rumor / unknown 是纯字符串数组，整体替换，条数与中文完全一致。
 *   · 结构性键（id / era / states / parties / tierMin / weight / base / mods /
 *     effects / flags / cost / electionNote / fromYear / toYear …）受引擎保护，一律不写。
 *
 * 英文写法：按英语重写，第二人称、现在时、短句；「」化进句子或间接引语；
 * 州份用真实英文名（Texas、Alabama、Ohio、Florida、Pennsylvania、New York、
 * Massachusetts），党徽写作 the pin，deep-red / deep-blue 为英文政论通词。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ---- 1) 深红州里的民主党人 ---- */
      {
        id: "state_red_minority",
        title: "You call a meeting in a deep-red state. Seventeen come.",
        body: "Yours is a deep-red state, and your party has been the permanent minority here for a generation. Seventeen people attend the back-room meeting, while the merchants' chamber across the street holds a list that grows longer every year. How does a minority fight?",
        brief: {
          lede: "In this state, your party pin is an open wound.",
          known: [
            "The last statewide your party won, newspapers had no color pages. Registration runs under forty percent.",
            "The county party meets in a restaurant back room. Attendance: seventeen.",
            "The state's largest Latino chamber of commerce has money and a list — it only lacks a face to speak for it."
          ],
          rumor: [
            "They say the national committee once sent money to this state. It was spent somewhere else.",
            "They say the chamber's own chair has ambitions, and lifting you up may be a rung on his ladder."
          ],
          unknown: [
            "By the demographic curve, this minority is a majority in twenty years.",
            "In a deep state, a national convention seat is cheap for the minority party."
          ],
          terms: [
            { k: "Deep-red state", v: "A state reliably Republican. Local offices are still there to be worked." }
          ]
        },
        choices: [
          {
            id: "coalition",
            text: "Ally with the minority communities: turn the chamber's list into the party's list",
            note: "Minority plus minority equals a possible majority. This play cashes a twenty-year demographic curve early.",
            outcomes: {
              crit: { body: "Two years later, the county's registration rolls show your party's numbers doubled. The national committee sends someone to ask: how did you do this?" },
              ok: { body: "The alliance holds. The seventeen-person back room moves up to a slightly larger back room." },
              meh: { body: "The chamber gives you its support — and its agenda. You represent more than your party now." },
              fail: { body: "The coalition dies on bylaw two: who pays, who sets the line. You are back to being one of seventeen." },
              critfail: { body: "Your opponent turns the photos of you speaking for outsiders into a radio ad and runs it for a month. The coalition never formed; you got branded first." }
            }
          },
          {
            id: "maverick",
            text: "Be that kind of Democrat: draw the line against your own party on purpose",
            note: "The other contrarian road: move to the middle and break with the national line in public. Your own activists will hate you, but the other side's votes are real.",
            outcomes: {
              crit: { body: "Your declaration of independence leads the state paper. In the next local race, the crossover votes show up — measurable, and real." },
              ok: { body: "You draw the line and buy some neutrality from the other side. Your own party's calls come less often now." },
              meh: { body: "Both sides use you as a tool: they remember you when they need a Democrat to attack, and forget you when things are handed out." },
              fail: { body: "The break went too far: your party stops sending you volunteer resources, and the other side's votes never arrive. Empty hands on both ends." },
              critfail: { body: "The clip of you insulting your party's leadership runs in a national ad — and not the kind your side paid for. The party file gives you a label: traitor." }
            }
          },
          {
            id: "grind",
            text: "Grind it out: turn the seventeen-person back room into a hundred",
            note: "No surprise attack — just the base. Slow, but every step is real.",
            outcomes: {
              crit: { body: "You work sixty county fundraisers in a year, nineteen people a night. The next year, the back room becomes a proper office." },
              ok: { body: "The organization is growing. Slow as watching grass grow — but it is grass, and it is growing." },
              meh: { body: "You keep showing up. You start to understand: for a minority, simply being present is its biggest asset." },
              fail: { body: "You miss the sixty-first county. Budget and enthusiasm hit bottom in the same week." },
              critfail: { body: "You grind for three years; one shift in the national wind and the party's registration in this state drops another notch. The years buy nothing — except that your name becomes a synonym for staying. Worth no money. Worth some respect." }
            }
          }
        ]
      },

      /* ---- 2) 摇摆州：最后一周 ---- */
      {
        id: "state_swing_final",
        title: "The swing-state race enters its final week",
        body: "All of America's money, planes, and cameras are pointed at your state. Polls inside the margin, a seven-day window, and ammunition for only two of the three wars. How many memoirs this week feeds will depend on how you fight it.",
        brief: {
          lede: "Seven days out, every plane in national politics lands in your state.",
          known: [
            "Your swing state is the national battlefield again: money, surrogates, and ads arriving by the hour.",
            "The poll gap sits inside the margin. How the last seven days spend decides everything.",
            "Three cards on the table: television ads, knockers at the door, and dirt on your opponent."
          ],
          rumor: [
            "They say the national committee's final transfer lands tonight — enough to fund two plays, not three.",
            "They say the other side has studied your record all the way back to your dorm days."
          ],
          unknown: [
            "For these seven days, every small choice of yours magnifies ten thousand times.",
            "Win, and your state banks a four-year premium; lose, and the money moves on to another state."
          ],
          terms: [
            { k: "Swing state", v: "A battleground where both bases are near-equal and every vote has a posted price." },
            { k: "Ground game", v: "Door-knocking turnout work: tedious, and what actually decides states." }
          ]
        },
        choices: [
          {
            id: "air",
            text: "Air war: pour the last of the money into television",
            note: "Maximum volume. Expensive, visible, fast to decay — but the quiet majority of a swing state only believes television.",
            outcomes: {
              crit: { body: "The last ad lands. The opponent's response is hasty and ugly. On election night your state lights up your color by one point." },
              ok: { body: "The ads hold your base. Result: a win, steady — exactly as the commercial promised." },
              meh: { body: "Half the spend sinks without a trace; nobody remembers the other half. You won. The ledger looks bad." },
              fail: { body: "Their counter-ad in the final week hits harder. You lose two points, and spent more than they did." },
              critfail: { body: "A number in your ad is fact-checked wrong, and it hits the news two days before the vote. News beats advertising. On reach." }
            }
          },
          {
            id: "ground",
            text: "Ground war: a hundred thousand knocks in seven days",
            note: "Tedious, cheap by comparison, and lethal. Swing states are decided on porches, never on television.",
            outcomes: {
              crit: { body: "Turnout runs two points above even your own party's model — and every extra vote had been knocked on. That night, an analyst says unprecedented three times." },
              ok: { body: "The ground machine turns over. The margin of victory is one point, carried in door by door." },
              meh: { body: "You organized, and it rained. Turnout flat. Whether you won or lost, the ground game takes neither the blame nor the credit." },
              fail: { body: "Their ground game is bigger. On the final night, the other side offers your volunteers an hourly wage — and some of them take it." },
              critfail: { body: "A batch of deceased voters stays on your turnout-call list. The election was not lost; the joke was — and it is a national one." }
            }
          },
          {
            id: "oppo",
            text: "Opposition research: dump the dirt in the last 72 hours",
            note: "The October surprise. Win big or blow back on yourself — and the dirty label follows you either way, for life.",
            outcomes: {
              crit: { body: "The material is real and the timing is poison. The opponent's last three days are all spent proving his innocence. You win by five points. Four of them were interest on the October surprise." },
              ok: { body: "The dump makes splashes, no tsunami. Enough to wreck his rhythm, not enough to decide the race." },
              meh: { body: "The fact-checkers take a week, and by then the polls have closed. Your October surprise arrives as history." },
              fail: { body: "The material proves half-true. The leak trail ends at your adviser — you knew nothing, and your not-knowing becomes the news." },
              critfail: { body: "The October surprise misfires: the documents are forgeries, made by one of your own volunteers. National outlets spend a month re-litigating it. Every headline has your name." }
            }
          },
          {
            id: "voter_protect",
            text: "Fight nothing: spend the whole week protecting the votes you have",
            note: "The conservative play: no attack — just make sure every vote that belongs to you gets cast and counted. Nobody wins a headline this way, and nobody loses a lawsuit.",
            outcomes: {
              crit: { body: "Your poll watchers catch flawed tallies at three precincts. In counties decided by hundreds of votes, that is the whole ballgame." },
              ok: { body: "Every vote got counted. Whatever the result, you sleep." },
              meh: { body: "A quiet week. Your caution makes no news at all. That was the point of it." },
              fail: { body: "You won the procedure and lost the air; the opponent's ads own every channel." },
              critfail: { body: "Two volunteers on your poll-watch list turn up with old records, and the other side sells it as voter interference. Trivial — but it stinks for a month." }
            }
          }
        ]
      },

      /* ---- 3) 深蓝州的共和党人 ---- */
      {
        id: "state_blue_minority",
        title: "You campaign in a deep-blue state, pin hidden in the inside pocket",
        body: "The minority politics of a deep-blue state: on your own campaign mail, your party's name sits a third smaller than your opponent's. You have to decide what you are — the national version, or this state's exception.",
        brief: {
          lede: "In this state, your party pin gets pressed into the jacket lining.",
          known: [
            "Your party is the minority's minority here: no statewide win in twenty years.",
            "Local races are a different world: voters here choose people, not parties.",
            "The consultants offer two roads: the national line in local dress, or the native moderate."
          ],
          rumor: [
            "They say the national party keeps a list for blue-state moderates — it comes with resources, and with strings.",
            "They say the state's money prefers a conservative who loses cleanly."
          ],
          unknown: [
            "A moderate Republican in a deep-blue state is a scarce asset for the national party.",
            "Scarcity cuts both ways: when the wind turns, scarce assets get spent first."
          ],
          terms: [
            { k: "Deep-blue state", v: "A state reliably Democratic. A Republican can still work the local ground." }
          ]
        },
        choices: [
          {
            id: "moderate",
            text: "Run as this state's moderate: keep every issue local",
            note: "Transit, open space, budget discipline — talk about what voters want and walk around the national platform. It can win, and the national party will lean on you the whole way.",
            outcomes: {
              crit: { body: "You win the seat on crossover votes. Both parties' national channels mention you the same night — one as an asset, the other as raw material for a traitor story." },
              ok: { body: "You won. The party name on the mail is, in fact, a size smaller. Nobody says so. Everybody knows." },
              meh: { body: "The moderate road works — for now. Calls start arriving from headquarters to align your message." },
              fail: { body: "In a wave year, moderation is useless. The tide covers your pin. You lose — decently." },
              critfail: { body: "You moderate so successfully that your own party's purity auditors bite in the primary: which side is he really on? You keep the seat — and lose the next one before it starts." }
            }
          },
          {
            id: "purist",
            text: "Run as the national version: print the pin one size larger",
            note: "Stand with the national line. In this state that is abstaining — but you become the party's proof of existence in the Northeast, and resources and protection come attached.",
            outcomes: {
              crit: { body: "You lose the race and win the national roster: a speaking slot at the convention, a permanent place on cable panels, and a name for putting principle first." },
              ok: { body: "You lose, in a way the national committee approves of. Primary resources for the next round are already on the way." },
              meh: { body: "You held the line and paid tuition. The voters of this state decline your pin, politely." },
              fail: { body: "A drubbing. Nobody cares about a proof of existence — and existence is the precondition." },
              critfail: { body: "A clip of you defending the national line circulates this state — shared by nobody friendly. You have become the recurring villain of the other side's fundraising emails." }
            }
          },
          {
            id: "nonpartisan_office",
            text: "Switch to nonpartisan offices: prosecutor, judge, city manager",
            note: "Put the pin away entirely. No D or R beside district attorney, auditor, or judge — the classic lane of survival for a minority party in deep blue.",
            outcomes: {
              crit: { body: "You take the prosecutor's office as law and order with clean books. The party question? There is no such column on the ballot." },
              ok: { body: "A nonpartisan office, in hand. The career turns a corner somewhere else — but it does not stop." },
              meh: { body: "The office is real; the spotlight is small. The work itself turns out to be honest practice in the use of power." },
              fail: { body: "The opposition digs up a party donation of yours from ten years ago. A nonpartisan ballot does not cover a partisan past." },
              critfail: { body: "Mid-campaign, an old case from your office resurfaces — the convicted man's protest letter runs in the paper. No office won. Your name on the justice page first." }
            }
          }
        ]
      }
    ]
  }
});
