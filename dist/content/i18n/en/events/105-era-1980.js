/* ============================================================================
 * CONTENT · i18n/en/events/105-era-1980.js
 * 中文文件 content/events/105-era-1980.js 的英文覆盖层（4 张 1980 年代代际卡）。
 *
 * 契约（详见 docs/I18N.md §3–§5）：
 *   · 原中文文件一个字不动；本文件只放要覆盖的字段，结构键由引擎保护、不写。
 *   · 事件/选项按 id 定位；known / rumor / unknown 是纯字符串数组，整体替换、整条给全
 *     （本文件每张卡均为 known×3 / rumor×2 / unknown×2 / terms×1，与原文一一对应）。
 *   · 英文按语重写：第二人称、现在时、短句；「」化进引号或句子；
 *     1980 年代实物保持时代正确（television、radio、poll、strike），不掺互联网词。
 *   · 长度按 §11.7 同尺复核（拉丁词 ×0.5）：全部字段在预算内。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* -------------------------------------------------- 1980-11 保守回潮浪 */
      {
        id: "rg80_wave",
        title: "Whole States Change Color in a Single Night",
        body: "On television, the former actor sweeps the country in a landslide. Stagflation, the hostages, and one line —\n" +
          "government is not the solution — seat him in the White House and push a whole new vocabulary into the\n" +
          "mainstream. For the first time, a crack opens in your district. The old establishment is still chewing on\n" +
          "the loss while a new label — Reagan Democrat — is already printed on every poll.",
        brief: {
          lede: "A wind has shifted. Stand against it, or borrow its clothes — just do not be seen changing.",
          known: [
            "Your district went for the other team; the party wants an explanation — and is watching whether you change your tune.",
            "Tax cuts, a stronger military, lighter regulation: once the other side's lines, now your own party must handle them carefully.",
            "You hold old-establishment appointments and a restless base. Both sides read your face."
          ],
          rumor: [
            "Word is the bosses want a convert first — and are picking the man who flips early as the sample.",
            "Some say the wave cannot outlast two terms; the economy will swing it back."
          ],
          unknown: [
            "Remembered as a pragmatist or a man without spine — depends who is next in charge.",
            "Whether you are the new court's early friend, or the first one it sells."
          ],
          terms: [
            { k: "Reagan Democrat", v: "Blue-collar Democrats who swung Republican in 1980." }
          ]
        },
        choices: [
          {
            id: "ride",
            text: "Flip first: come out for tax cuts and a strong military, hug the new majority",
            note: "A bet that the new wave runs long. Early looks prescient; clumsy looks like a weather vane — and the new court may not remember your timing.",
            outcomes: {
              crit: { body: "First to say the old words in the new dialect. The incoming crew files you as an enlightened local. Old ties intact, new-wave credit in your pocket." },
              ok: { body: "You turn with the tide and earn the man-who-reads-his-district label. Old colleagues look away; the receipts are real." },
              meh: { body: "You flipped — too nakedly for anyone to buy it. The new guard calls you oily; the old one calls you traitor." },
              fail: { body: "Your embrace of the fresh wind gets filmed one day after you read the old script. The weather-vane label sticks in a single coat." },
              critfail: { body: "You jumped so fast the new forces wrote you off as old machinery that will jump again. Neither camp wants you." }
            }
          },
          {
            id: "hold",
            text: "Hold the old line: relief, labor, and the things government must do",
            note: "Principle against the tide. Possibly obsolete overnight — or, once it recedes, respected again as a man with a spine.",
            outcomes: {
              crit: { body: "In a surrender mood, you state the old case in full. No one answers that night — but the unions and the precincts quietly note that he still said it." },
              ok: { body: "You kept the old words. No short-term profit — but you kept your roots, and your own." },
              meh: { body: "You made a principles speech nobody wants. Your seat held; your voice thinned." },
              fail: { body: "Clutching the old tune while the country craves change — the papers file you under out-of-step relic." },
              critfail: { body: "Your stubbornness becomes one exhibit in the party's postmortem; the loss gets pinned on the men who would not bend, and your name leads the list." }
            }
          },
          {
            id: "pragmatic",
            text: "No isms, just wallets: the local edition of jobs and tax cuts",
            outcomes: {
              crit: { body: "You translate the ideology into local: a smaller bill, jobs that stay. Neither side can pick a fight; voters call you the real one." },
              ok: { body: "You sidestep the isms and talk groceries. Safe, and faintly likable." },
              meh: { body: "You went deep on nothing. A draft through the hall — nobody caught what you said." },
              fail: { body: "Both camps read no ideology as no position. In a fevered election year, that is close to no votes." },
              critfail: { body: "You offended no one and moved no one. The district gets swept away; the party's postmortem lists you under didn't lift a finger." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1981-08 管制员大解雇 */
      {
        id: "rg81_patco",
        title: "A Million Booked Flights, Up in the Air by Morning",
        body: "The air traffic controllers walk off the job. The White House mails every man one line: return by a set hour or\n" +
          "be fired, under the law that bars government employees from striking. Most do not return. Within weeks over\n" +
          "ten thousand are formally dismissed and their union fined into bankruptcy. For the first time the whole\n" +
          "country sees it: the wind has really changed.",
        brief: {
          lede: "A strike picked to make an example of. Stand with the iron fist of the law, or with the workers' paychecks?",
          known: [
            "You handle the local airport's budget; the fired men's families sit on your voter rolls.",
            "The White House means this knife to tell labor nationwide: the good years are over.",
            "Among the fired are ordinary wage earners you once shook hands with, door to door."
          ],
          rumor: [
            "Some say the replacement crews stood ready long ago, come airport chaos.",
            "Some say the strike was goaded on purpose, so the beating would frighten the rest."
          ],
          unknown: [
            "Whether this axe takes down your entire union bloc.",
            "In ten years: the man who read the wind, or one of its helpers."
          ],
          terms: [
            { k: "Strike-Ban Law", v: "The statute barring government employees from striking." }
          ]
        },
        choices: [
          {
            id: "labor",
            text: "Speak for the fired men: this example-making is wrong",
            note: "Against the day's most fashionable iron fist. Labor remembers you for life; the mainstream labels you for life.",
            outcomes: {
              crit: { body: "Against a wall of by-the-book, you speak for the men who lost their pay. Labor adopts you as a rare bold voice — and lends you its shoulders every election since." },
              ok: { body: "You take a few hits for the workers. The upper floors disapprove; labor notes you did not flinch at their worst hour." },
              meh: { body: "You say something soft; nobody gets satisfied. Labor wanted more; the bosses call it meddling." },
              fail: { body: "Your objection to the fist gets rephrased as siding with an illegal strike. The backwash hits you hard." },
              critfail: { body: "You lead the opposition and become target one in the who-is-coddling-the-strikers story. Opposing you becomes its own patriotism." }
            }
          },
          {
            id: "lawful",
            text: "Back the rulebook: government staff cannot strike",
            note: "Ride the hardest wave. Safest and most stylish tonight — the price: a quarrel with the whole labor world.",
            outcomes: {
              crit: { body: "Your open backing of the fist reads as a local with common sense. The new current pulls you closer — the union doors simply close behind you." },
              ok: { body: "You stand on the law. Short-term gains — but workers whose hands you shook start avoiding your eyes." },
              meh: { body: "You mumble shouldn't-strike. The bosses never file you as one of them; the workers never really get angry." },
              fail: { body: "The airports turn to soup, cancellations pile up — and voters bill the by-the-law man: you." },
              critfail: { body: "You bellow for the fist hardest — then reporters find your own office hires on connections. The rule-preacher broke the rules." }
            }
          },
          {
            id: "bridge",
            text: "No verdict on right and wrong: just re-employment and severance for the laid-off",
            outcomes: {
              crit: { body: "You step around the ideology battlefield and quietly wire the fired men to new jobs. Both sides owe you; workers remember real favors most." },
              ok: { body: "No side-taking, one thing done. The laid-off appreciate it; the bosses feel no worse about you." },
              meh: { body: "You try to hold both ends. Both sides reach one verdict: good at chores, absent at the microphone." },
              fail: { body: "Your re-employment plan crawls; workers cannot wait. Using us for a show, they say." },
              critfail: { body: "You courted both ends and the money never arrived. Workers call it a phantom promise; the bosses, a mess you made." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1982 松监管快钱（储贷） */
      {
        id: "rg82_snl",
        title: "A Thrift That Lends on Anything Comes Knocking",
        body: "After the rules loosen, a brood of fresh savings-and-loans starts flinging money everywhere: real estate, oil\n" +
          "fields, anything at all. What they want is a politically savvy name on the board. The offer is civil: put money\n" +
          "in, take the director's chair, collect dividends at year end — assuming the thing does not fold before the dividends do.",
        brief: {
          lede: "After deregulation, fast money covers the floor. It leaves as fast as it came — but a name on the door is slower to come off.",
          known: [
            "They want your seat to clear their licensing path; you want the payout.",
            "At this level money is not the question — whether it is clean, and whether it stands, is.",
            "Thrifts run on depositors' savings under federal insurance. When they break, someone carries."
          ],
          rumor: [
            "Word: their books are a facade — two more years, then the money walks.",
            "A mirror-image thrift next state did exactly that. Its owner is sunning himself in Miami now."
          ],
          unknown: [
            "When the party ends: podium or defendant's bench — where your name stands.",
            "Whether you can leave now whole, or lose your name along with the money."
          ],
          terms: [
            { k: "Savings & Loan", v: "Deposit-taking lender; loose 1980s rules bred its crisis." }
          ]
        },
        choices: [
          {
            id: "invest",
            text: "Put money in, take the director's chair, cash out before it folds",
            note: "A wager of your own principal. Right: pockets full. Wrong: principal and name buried in the same pile of deregulated rubble.",
            outcomes: {
              crit: { body: "You sell at the top of the bubble: dividends clear, directorship resigned the same week. While others rush in, you sit on shore counting." },
              ok: { body: "The payout lands — far better than the bank. You tell yourself to quit while ahead. You actually do." },
              meh: { body: "You earn a little and leave. Nothing lost — but one question gnaws: did I leave too early?" },
              fail: { body: "Greed keeps you one beat too long. The thrift folds overnight; most of your stake drowns — with director on your door." },
              critfail: { body: "The collapse reaches federal ears, and the named directors are made to answer. Deregulated money, taxpayers' loss — every line of the story points at you." }
            }
          },
          {
            id: "advise",
            text: "Invest no money — sell policy advice for a consulting fee",
            note: "No principal for a steady fee: small risk. Still the fingerprints of a man who paved the road for the gamblers.",
            outcomes: {
              crit: { body: "Your report urging looser rules here gets bought at a premium by the thrift. The fee lands steady; your hands hold not one invested dollar." },
              ok: { body: "You take the fee and voice a few professional opinions. Not much money — but it comes in steady." },
              meh: { body: "You advise; they find it barely useful and toss you a token retainer." },
              fail: { body: "The opposition digs up your memo paving the way to collapse — headline: paid to open the door." },
              critfail: { body: "After the crash, investigators hold up your opinion letter: who instructed you to certify this shell game? Nothing you say sounds like defense." }
            }
          },
          {
            id: "walkaway",
            text: "Touch none of this fast money; tell the local institutions to stay off",
            outcomes: {
              crit: { body: "You skip the party — and warn a few local institutions first. Years on, wreckage everywhere; only you and the ones you told stand whole. Reliable is banked that way." },
              ok: { body: "You stayed clean and moved nobody else. Still — your own books read spotless end to end." },
              meh: { body: "You kept clear — while watching others rake it in. The feeling is complicated." },
              fail: { body: "Your stay-out ruins the mood of colleagues sniffing a fast buck. In the club you are now the man who blocks paydays." },
              critfail: { body: "You warned everyone off — then could not say no to a friend, and sneaked a small stake in yourself. The fold took that too, and a new word follows: double standard." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1983 核冻结请愿 */
      {
        id: "rg83_freeze",
        title: "The Campus Starts a Petition to Freeze the Arms Race",
        body: "The arms race heats up; television loops simulations of how few minutes a missile needs. The university town\n" +
          "starts a petition: Washington and Moscow halt new nuclear weapons at the same moment. They gathered several\n" +
          "thousand signatures in your district — and want you on the record. For: naive. Against: warmonger.",
        brief: {
          lede: "A petition about human survival, compressed into a politics question you must answer yes or no.",
          known: [
            "They came to you because you are the local face likeliest to get dragged national by this.",
            "Freeze the arms race sounds harmless — and cuts against this era's whole key.",
            "Among the signers: students, and mothers with sons on aircraft carriers."
          ],
          rumor: [
            "Some say foreign money stands behind the movement, waiting for politicians to bite.",
            "Others say the defense lobby is the one actually spending in local races."
          ],
          unknown: [
            "Whether real arms cuts get signed within a few years.",
            "Which camp holds grudges longer — students or contractors."
          ],
          terms: [
            { k: "Nuclear Freeze", v: "The movement for matching US-Soviet caps on new warheads." }
          ]
        },
        choices: [
          {
            id: "support",
            text: "Sign it; back freezing the arsenal out loud",
            note: "Answer the broadest fear of the day. The weapons industry and the hawks will file you as soft and naive.",
            outcomes: {
              crit: { body: "You sign; the local paper prints it. Young voters and worried parents adopt you as the man who speaks plainly. The defense side opens a tab." },
              ok: { body: "You state the anti-nuclear position. The base sympathizes; the upper floors find you not hard enough." },
              meh: { body: "You signed — then a bigger story swallowed the whole affair. No glory, no beating." },
              fail: { body: "Your support the freeze gets cut into an attack ad: he cannot even be trusted on defense." },
              critfail: { body: "Your signature gets pasted across town inside a fraternizing hint. You spend weeks proving you are not that naive." }
            }
          },
          {
            id: "deter",
            text: "Oppose the freeze: peace rests on strength, not on self-disarmament",
            note: "Feed the military and the hawks. The contractors move closer; the anti-nuke streets come for you.",
            outcomes: {
              crit: { body: "Your strength-brings-peace passage loops on conservative radio; for the first time the defense lobby asks you to dinner." },
              ok: { body: "You stand on the hard side. The upper floors are pleased; the students on the street boo." },
              meh: { body: "You say harsh words. Voters under the nuclear shadow want comfort; your strength convinces few." },
              fail: { body: "Freezers poster your strength argument across campus. Now the town's war-monger has a face." },
              critfail: { body: "Mid-shout for buildup a defense-kickbacks scandal bursts — and your name sits on the receipts. War merchant hangs on your door for the first time." }
            }
          },
          {
            id: "principle",
            text: "Refuse both boxes: talk verification, openness, no arms deals from the public",
            outcomes: {
              crit: { body: "You sidestep the soft-or-tough slogans and talk only verifiable cuts and openness. It sounds neither like surrender nor war cry — a rare, steady maturity lands." },
              ok: { body: "A technical stance dodges the ideology trap. No one can file you across the line." },
              meh: { body: "Your third path makes sense — but nobody wants subcommittee detail in a shouting match." },
              fail: { body: "Both camps read refusing as no spine. On questions like this, the fence is the loudest position there is." },
              critfail: { body: "You aimed to touch neither side; an opponent files you in one line: he will not even say whether he fears nuclear war." }
            }
          }
        ]
      }

    ]
  }
});
