/* ============================================================================
 * CONTENT · i18n/en/events/107-era-2001.js
 * 中文文件 content/events/107-era-2001.js 的英文覆盖层（2001 反恐战争时代：
 * wt01_september / wt02_patriot / wt03_wmd / wt02_alert）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices / terms 里带 id 的按 id 对齐，不带 id 的对象按数组下标对齐。
 *   · 结构性键（id / era / minYear / tierMin / weight / base / mods / effects /
 *     flags / req / cost …）由引擎保护，写了也不会生效，validate 会直接报错。
 *   · 缺译的字段自动留中文，所以可以一张一张补。
 *   · 经济字段是系数，不涉及文案，不用管。
 *
 * 英文写法：按英语重写，不是逐字翻。第二人称、现在时、短句；
 * 「」在英文里用引号或改写掉；专有名词用真实英文（9/11、the Patriot Act、WMD）。
 * 恐袭题材克制、具体，不写煽情或血腥。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "wt01_september",
        title: "Two planes hit, live, in every living room",
        body: "The second tower falls before the smoke from the first has cleared. In a few hours, the assumption that home can\n" +
          "never be struck is dead. Both parties in Congress race to do something, and support for force and for\n" +
          "surveillance runs sky-high — saying slow down today looks like self-destruction. An endless war on terror and a\n" +
          "law loosening wiretaps and searches, the Patriot Act, are taking shape at top speed. Flags cover every pickup\n" +
          "truck by nightfall. In your district, neighbors are being questioned without cause while others stand at the\n" +
          "recruiting office. Some say the intelligence clues existed; nobody simply connected them. The surveillance\n" +
          "powers you cheer today — in ten years, whose door do they point at?",
        choices: [
          {
            id: "rally",
            text: "Back everything: force, new powers, not a single vote missed",
            note: "The crest of patriotic polling has never been higher — but it ties you to a war with no end in sight.",
            outcomes: {
              crit: { body: "You stand at the front of the wave: force, funding, surveillance — every vote yes. The country remembers the man who stood tallest in the dark hour." },
              ok: { body: "You ride the national fury: safe, popular. Only now the banner of fighting terror obliges you never to hesitate again." },
              meh: { body: "You backed it all, but louder voices took the airtime. Yours is one of ten thousand ayes." },
              fail: { body: "You rushed to declare. As the first costs of the next war surface, your early firm support is dug back up for air." },
              critfail: { body: "You pushed the new powers hardest. Years on, they are turned against political rivals, and your name sits on the enabler list." }
            }
          },
          {
            id: "balance",
            text: "Back the response, but cut the clauses that have nothing to do with terror",
            note: "Saying but at the worst possible moment. You will be called out of touch — and may hold one line in place.",
            outcomes: {
              crit: { body: "Wearing the un-American label, you still block the most invasive wiretap clauses. The country curses you then; years later a report lists you among those who saw it early." },
              ok: { body: "You trim the fattest powers from the bill. The price: whispers that you are not serious about terror." },
              meh: { body: "You spoke up, but nobody in grief wants details. The clauses pass anyway; you carried the risk for nothing." },
              fail: { body: "In the hour of rights versus safety, choosing rights edits neatly into: he cares more about terrorists." },
              critfail: { body: "Your speech against the powers becomes an ad — he speaks for the enemy. Fear is the sharpest saw in politics." }
            }
          },
          {
            id: "home",
            text: "Skip the foreign, tend the local: shield the questioned neighborhoods, help the military families",
            outcomes: {
              crit: { body: "While everyone stares far away, you back the neighbors questioned without cause and get real help to the families of the deployed. Word of mouth about a man beside you outlasts any national headline." },
              ok: { body: "You look after the people you should — no war cries, no shrug. The neighborhood remembers." },
              meh: { body: "You do quiet, steady work. In fearful times, steadiness is the first thing nobody notices." },
              fail: { body: "Tending home reads as not caring about the country. In such hours, keeping to yourself is also a crime." },
              critfail: { body: "You speak for a suspected community just as a local crime scare breaks; the two stories splice into: he is one of them." }
            }
          },
          {
            id: "volunteer",
            text: "Sign up for the rescue volunteer line: haul stretchers, ladle soup, no slogans",
            outcomes: {
              crit: { body: "You work the volunteer line outside the pile for a week and wear through two pairs of gloves. Nobody interviews you; everyone in the soup line remembers the face." },
              ok: { body: "You went, took the dirtiest job there was, and never mentioned it after. The neighborhood calls you decent." },
              meh: { body: "You signed up and got slotted at the tail of a roster that was already full. You were home by noon." },
              fail: { body: "Someone on the volunteer line recognizes you. The photo lands in the local column on politicians visiting disaster." },
              critfail: { body: "A reporter asks exactly how many cases you carried. You cannot say. \"Collecting on the national grief\" sets in." }
            }
          },
          {
            id: "open_letter",
            text: "Co-sign a letter with local business and churches: back the response, oppose suspecting whole neighborhoods",
            note: "Signing at the worst possible moment to say but. You draft it; the order of names is the attitude.",
            outcomes: {
              crit: { body: "The letter is quoted on the national wires: he wrote 'but' inside the fury. Two ethnic chambers of commerce stand on one platform for you for the first time." },
              ok: { body: "The letter ran, the curses came, and everyone who meant to sign did. You held one square of ground." },
              meh: { body: "Your letter blends into the dozen similar statements that week. Nobody reads it twice." },
              fail: { body: "The party machine calls to ask who drafted it. Before you answer, 'shaky on security' is already on file." },
              critfail: { body: "Someone cuts 'no presumption of guilt' out of context, and \"he won't back this response\" goes straight onto your opponent's flyer." }
            }
          },
          {
            id: "demand_probe",
            text: "Aim above the crowd: publicly demand the warning agencies and airspace control be pulled under one roof",
            note: "Asking during national grief cuts deepest — and holds longest. Wrong, and you are the man who troubles the responders.",
            outcomes: {
              crit: { body: "The merged warning-and-airspace body you pressed for gets drawn up with your wording on its charter, and for the first time a hearing table quotes you by name." },
              ok: { body: "Your proposal reaches the planning memo. The agencies think you talk too much; the press notes you think." },
              meh: { body: "The country is shouting for revenge; your 'merge the warnings first' earns one 'we'll get to it.'" },
              fail: { body: "The intelligence side leaks that you 'sabotage the response.' The donation calls go cold overnight." },
              critfail: { body: "The agencies throw a near-miss timeline at you: 'the days you wanted merged, we were short-staffed.' You carry that accusation for years." }
            }
          }
        ]
      },
      {
        id: "wt02_patriot",
        title: "Federal agents want records from your district",
        body: "The new law lets one signed order — an access order, no judge, no review — take library loans, bank statements,\n" +
          "medical files. This time the order lands in your district, and compliance and budget here both run through your\n" +
          "desk, so your name goes on the signature line. A word comes down from above: don't ask questions, just\n" +
          "cooperate. Cooperating buys federal trust and an anti-terror grant; resisting gets logged as uncooperative. But\n" +
          "the orders sweep wide: today's pulled file may belong to your oldest donor, and some of your voters are wondering\n" +
          "whether it is theirs. The door you open today may be the one walked through to search you.",
        choices: [
          {
            id: "cooperate",
            text: "Cooperate fully, and take the anti-terror grant and the federal goodwill together",
            note: "The biggest short-term gain. But you are paving the road for a machine that may one day turn on you.",
            outcomes: {
              crit: { body: "You handle it fast and obliging. Washington lists you as a reliable partner; an anti-terror grant stays in your name for years. Each time you sign, you almost think twice — and stop yourself." },
              ok: { body: "You cooperate well; the feds are pleased and the money lands. Locals mutter, but nothing comes of it." },
              meh: { body: "You cooperate, and the feds simply take you for granted. The promised benefits never show." },
              fail: { body: "The door you opened leads to your own donors' files. They call it selling out friends for access." },
              critfail: { body: "Years later the record dragnets surface as political pressure, and the list of earliest, most eager local partners starts with your name." }
            }
          },
          {
            id: "guard",
            text: "Cooperate — but log every request and insist on due process",
            note: "Offend nobody in Washington, give voters someone watching the gate. A little on both sides.",
            outcomes: {
              crit: { body: "Your paper trail turns back several plainly overreaching requests. For the first time locals feel someone is watching this pipeline. The feds find you tedious and cannot fault you." },
              ok: { body: "You work by the book: cooperation credit earned, your own line uncrossed." },
              meh: { body: "Your process runs slow; the feds lose patience, and locals never notice the shield." },
              fail: { body: "Your record-keeping reads as distrust. The door of cooperation starts closing on you." },
              critfail: { body: "Your own logs are turned against you: proof you admitted the powers were dangerous — and cooperated anyway. Wrong on both sides." }
            }
          },
          {
            id: "resist",
            text: "Cooperate on the surface, tip off voters in private about what can be pulled",
            outcomes: {
              crit: { body: "You quietly warn the institutions most likely to be watched; their shelves tidy themselves in time. Nobody knows it was you, and this crowd owes you for good." },
              ok: { body: "You hedge both ways: the paperwork is clean, and word reaches your own people." },
              meh: { body: "You try to please both sides and feed neither." },
              fail: { body: "The feds catch on to your tips. You move from reliable partner to person to watch." },
              critfail: { body: "Your quiet obstruction is proven, and failing on terror weighs heavy in the post-9/11 years." }
            }
          }
        ]
      },
      {
        id: "wt03_wmd",
        title: "They ask you to endorse a war that has not started",
        body: "The intelligence brief lies open: weapons of mass destruction possibly hidden, a regime possibly tied to\n" +
          "terrorists. Under every possibly sits the line not yet confirmed. The officers reading it to you shake their\n" +
          "heads privately, but the decision is already counting down. Approval is still at its peak and the cost of\n" +
          "opposing this war is more than anyone here will pay — what they want from your line is one page of local\n" +
          "unanimity. Some say the men who want this war never finished the last one. What you believed today, and who\n" +
          "made you believe it, will be written down somewhere.",
        choices: [
          {
            id: "endorse",
            text: "Endorse: send the local backing, stand in the majority column",
            note: "Follow the loudest voice. If the justification collapses, your early stamp never washes off.",
            outcomes: {
              crit: { body: "Your endorsement is printed in the national campaign material; the decision-makers' dinners keep a seat for you. But every time you say the word weapons, you say it a little softer inside." },
              ok: { body: "You join the tide and look strong for now. Years later, why did you believe becomes a question with no good answer." },
              meh: { body: "You endorsed, but louder names claim the war quickly. You gain little and bank one future liability." },
              fail: { body: "The war sinks into the bog, and your support for it becomes the target on your back." },
              critfail: { body: "The day the weapons never existed is confirmed, the press reads out the earliest endorsers one by one. Your name sits near the top." }
            }
          },
          {
            id: "question",
            text: "Ask for hard proof before stamping anything",
            note: "Keep one ounce of clarity while polling is still high. The cost: a holding-back label from above.",
            outcomes: {
              crit: { body: "Your ask — replace possibly with confirmed — is mocked as naive then, quoted as foresight after the war sours." },
              ok: { body: "You hold the line on evidence: neither defying nor stamping. The bosses note the troublemaker; history notes the clear head." },
              meh: { body: "You made your demand, and the machine kept turning. You are one disagreeable voice in the background." },
              fail: { body: "Demanding proof while the country yells to fight becomes helping the enemy stall." },
              critfail: { body: "Your public doubt is branded contrarian and disloyal, and a local reckoning against insufficient patriots sweeps you up." }
            }
          },
          {
            id: "avoid",
            text: "Dodge the vote: travel, sick leave, anything to be away",
            outcomes: {
              crit: { body: "You are conveniently absent before the vote. When the war bogs down, you are one of the few who neither endorsed nor opposed — neither of the ugly corners is yours." },
              ok: { body: "You slide away. The bosses note that you did not help; history lets you pass." },
              meh: { body: "You dodged the vote, and everyone saw that you dare not stand on either side." },
              fail: { body: "Both camps log your absence as flinching. The bosses find you useless; voters find you shifty." },
              critfail: { body: "You aimed to touch neither side — then it leaks that you privately sent word to both. Not choosing becomes double-dealing." }
            }
          }
        ]
      },
      {
        id: "wt02_alert",
        title: "The threat level goes orange again",
        body: "A five-color threat board — the post-9/11 scale, vague by design — now hangs in every newscast, bouncing between\n" +
          "High and Elevated, never coming back down to blue. Orange means elevated watch: the local airport adds police,\n" +
          "signs ask you to report anything suspicious. Airport security money comes down your line, and every step up the\n" +
          "scale squeezes your budget, while the shops that live off tourism start complaining. Some say the alert carries\n" +
          "no information at all; it only shows a government doing something. Keep crying wolf, and see who believes you next time.",
        choices: [
          {
            id: "alert",
            text: "Escalate: ask Washington for a local orange-level security supplement",
            note: "Ask for resources in fear's name. Comfort and money both land — and you keep the numbing machine running.",
            outcomes: {
              crit: { body: "The extra budget turns the airport into a fortress; local papers praise a leader who takes safety to heart. You know most of the money bought visible theater." },
              ok: { body: "You win extra security for the district. Voters feel safer; Washington thinks you understand the game." },
              meh: { body: "You got the money. The protection cannot be proven, and the show has scared off a few tourists." },
              fail: { body: "You campaigned on orange while no threat came — only shopkeepers complaining. The press calls it buying panic." },
              critfail: { body: "Your orange fund's receipts go missing, and an investigation into wasted public money comes to your door." }
            }
          },
          {
            id: "calm",
            text: "Cool it: warn against color numbness, spend on what actually protects",
            note: "Speak against the grain of fear, betting on a long reputation for judgment.",
            outcomes: {
              crit: { body: "You say out loud what many feel — orange every day equals no orange at all. Washington frowns; clear heads mark you down as sober." },
              ok: { body: "You call for sober spending. Local businesses thank you; the security agencies do not forget your tone." },
              meh: { body: "You try to cool the room. In fearful years, plain truth fights alone." },
              fail: { body: "You tell people to relax — right as a local false scare breaks. He made us careless is a ready-made rap." },
              critfail: { body: "Your calming words are cut into an ad — he barely takes your safety seriously. Fear is the best saw there is." }
            }
          },
          {
            id: "neutral",
            text: "Add nothing, change nothing; do exactly what headquarters says",
            outcomes: {
              crit: { body: "You follow the levels quietly. No blunder from panic, no blame for downplaying. In fearful years, doing nothing is often the cleverest move." },
              ok: { body: "You implement the schedule without comment. Nobody praises you; nobody blames you." },
              meh: { body: "You go by the manual. Locals feel neither safer nor annoyed. You are invisible." },
              fail: { body: "Your silence reads badly to both camps: lukewarm on security. On safety, not taking a side is a side." },
              critfail: { body: "After a false scare, someone asks: as the official in charge, what did you actually do? You have no answer." }
            }
          }
        ]
      }
    ]
  }
});
