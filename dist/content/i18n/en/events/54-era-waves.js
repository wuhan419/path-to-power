/* ============================================================================
 * CONTENT · i18n/en/events/54-era-waves.js
 * 中文文件 content/events/54-era-waves.js 的英文覆盖层（时代浪潮：2008 时代）。
 * 契约见 docs/I18N.md：原文件不动，只放要覆盖的字段；事件/选项按 id 定位，
 * known/rumor/unknown 纯串数组整体替换、条数与中文一致，terms 按下标对齐；
 * 结构性键（id/era/tierMin/weight/base/mods/effects/flags/cost/photo…）受保护，一律不写。
 * 浪潮题材：机构/专有名词用真实英文（Zuccotti Park, the 99%, Occupy Wall Street,
 * Tea Party, Koch brothers, Big Three, Wall Street Journal, City Hall）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "wave_occupy_low",
        title: "Occupy Wall Street's tent city asks you to handle its messaging",
        body: "The tents in the park show no sign of thinning. You brought coffee once; now they ask if you'll stay on to handle their messaging — you've got a way with words.",
        brief: {
          lede: "A tent city in the park. A library, a kitchen, and a tweet everyone's waiting on.",
          known: [
            "Zuccotti Park is full of tents; \u201Cthe 99%\u201D has led every news cycle for two weeks.",
            "No leaders, no platform, anyone can speak: that's the magnetism and the sickness.",
            "People you know are inside, along with career activists and a few nobody-sourced ones."
          ],
          rumor: [
            "They say City Hall has set a sweep date and is only waiting for the cold.",
            "They say both parties track where this energy flows — and there are plainclothes cops inside."
          ],
          unknown: [
            "This phrase will reshape political language for a decade.",
            "Someone you meet in a tent may be on Capitol Hill in ten years."
          ],
          terms: [
            { k: "Occupy Wall Street", v: "The 2011 New York encampment protest over inequality." }
          ]
        },
        choices: [
          {
            id: "join",
            text: "Move into the tent: become one of them",
            note: "Move your life in. \u201CWitness\u201D outweighs any elite résumé in a future election. The price: a file, your time, and every winter after.",
            outcomes: {
              crit: { body: "You become one of the tent city's voices: cameras seek you, donations run through you, the police open a page on you. Before winter you've saved two hundred people from the movement into your contacts." },
              ok: { body: "You spend six weeks in the tents. On sweep day, regional news shows them carrying you out — no name, but your whole district saw it." },
              meh: { body: "You joined and saw clearly: good people, no leaders, and a general assembly that runs forever. You leave with a notebook." },
              fail: { body: "You weren't there the night of the sweep. Next morning you go for your things and the park is hosed clean, as if nothing happened." },
              critfail: { body: "A clip of you speaking is edited — head and tail cut — and now you seem to call for storming a bank. The raw clip gets three thousand views; the cut one, three hundred thousand." }
            }
          },
          {
            id: "bridge",
            text: "Be the bridge: connect the unions to the tent city",
            note: "Not in the tents, not watching from outside: link organized muscle — unions, churches — to street energy. You please both sides, and both sides distrust you.",
            outcomes: {
              crit: { body: "Union buses roll into the park: food, hot water, hundreds of card-carrying protesters. For the first time in two loose months the movement has logistics. Everyone remembers who made the introduction." },
              ok: { body: "The bridge half-holds: the unions issue a statement of solidarity but no buses. Already further than most coalitions go." },
              meh: { body: "The union folks hear it out, say interesting, then leave for another meeting. You learn to hear what interesting means." },
              fail: { body: "In the tents someone calls you a union plant; the unions think you're too visible. Wrong on both sides." },
              critfail: { body: "A photo of the meeting you set leaks, headlined: union brass meet secretly with Occupy leaders. Both sides' comms call you in at once." }
            }
          },
          {
            id: "observe",
            text: "Back it on Twitter, don't show up",
            note: "Retweeting costs nothing and earns nothing — but at least your tent number never lands in a file.",
            outcomes: {
              crit: { body: "A few of your posts circulate in a small circle. Someone in the tents replies: come out next time. You answer with a raised fist." },
              ok: { body: "You follow it, retweet now and then. Like most people." },
              meh: { body: "A colleague's boss sees your retweets. Monday's meeting has an odd air." },
              fail: { body: "Your timeline slides by quietly. Later, when people talk about that fall, you can only nod." },
              critfail: { body: "The Occupy slogan you retweeted came from a post later proven to be from a fake account. The screenshot stays." }
            }
          }
        ]
      },

      {
        id: "wave_tea_rally",
        title: "The Tea Party wants to pack a town hall — and force you to pick a side",
        body: "A town hall in your district will debate a federal program, and organizers call for a full room. You hold two invitations: one from an angry crowd, one from a chamber of commerce scared enough to want you there to put out the fire.",
        brief: {
          lede: "The Koch brothers' money, two founder tweets, and a rainy-night town hall.",
          known: [
            "After the bailouts a cable host's on-air rage lights the other side's fury; town halls run packed.",
            "Your district's town hall meets next week; organizers tout it on radio: fill the room.",
            "The anger is real — bills, mortgages, our money bailed them out. The money behind it is real too."
          ],
          rumor: [
            "They say a funding network stands behind the rallies: think tanks, radio, family foundations.",
            "They say the establishment is running the math: co-opt this force or crush it."
          ],
          unknown: [
            "Within a year the Tea Party will rewrite one of the two parties.",
            "Waves recede too. At low tide, whoever rode the crest is left stranded on the sand."
          ],
          terms: [
            { k: "Tea Party", v: "Right-wing populist movement: anti-tax, anti-bailout, anti-big-government." }
          ]
        },
        choices: [
          {
            id: "ride",
            text: "Take the stage and catch the anger",
            note: "Speak for the crowd and the crowd lifts you. At the Tea Party crest, even nobodies take off from the top of the wave.",
            outcomes: {
              crit: { body: "Someone films your three minutes vertical; it pulls five hundred thousand views in a week. Three months later you're asked to close a state rally." },
              ok: { body: "The room stands and applauds you. The chamber's invitation is withdrawn the next day." },
              meh: { body: "You speak well. You understand seven-tenths of why the crowd is fired up — the other three you don't examine." },
              fail: { body: "They turn on you: the crowd wanted a roar, you gave analysis. Someone shouts, next speaker." },
              critfail: { body: "A figure you cite is debunked on the spot. The vertical clip still spreads five hundred thousand times — captioned: elite arrogance." }
            }
          },
          {
            id: "cool",
            text: "Answer the chamber's call and put out the fire",
            note: "Steer the fury back into town-hall procedure. The chamber remembers you as dependable; the crowd remembers whose side you're on.",
            outcomes: {
              crit: { body: "You keep the meeting: the anger doesn't vanish, but the agenda gets through. That night the chamber decides to back you to the next level." },
              ok: { body: "The meeting is uneventful. A chamber person shakes your hand and says three words: future material." },
              meh: { body: "You bring reason, the crowd brings volume. The meeting is postponed. Both sides blame you." },
              fail: { body: "The firefighter photos spread: you at the podium, a forest of angry fingers below. The caption picks your side for you." },
              critfail: { body: "Someone records what you said privately to the chamber — these people will scatter soon. The tape circulates on the crowd's email lists for a month." }
            }
          },
          {
            id: "document",
            text: "Do the groundwork: write down every name",
            note: "Take no side; keep the record. A name list is the oldest capital in democratic politics — whichever way the wave breaks.",
            outcomes: {
              crit: { body: "You collect two hundred surveys and a hundred-plus contacts. Within six months every candidate, left or right, has come to you for the list." },
              ok: { body: "The list grows. The person keeping records doesn't get flamed, and rarely gets remembered — yet." },
              meh: { body: "Two hundred surveys, half of them angry scribbles. What you learn: rage has a grammar." },
              fail: { body: "A man with a clipboard stands out in a crowd. Someone snatches it from you and breaks it." },
              critfail: { body: "People ask who your list is for. However you explain it, two hundred names on a clipboard look like intelligence." }
            }
          }
        ]
      },

      {
        id: "wave_detroit_high",
        title: "Congress votes on a tens-of-billions auto bailout",
        body: "The hearings ran two days and all of America watched the executives who flew in on corporate jets to ask for money. Now it's your turn to say: tens of billions, save them or not. Both Christmas-headline versions are already written.",
        brief: {
          lede: "The Big Three's bosses fly in on company jets to beg for cash — the papers will write their own headlines.",
          known: [
            "Detroit's Big Three plead poverty on Capitol Hill, asking billions in rescue loans. Wall Street's turn last time.",
            "On the way to the hearing you pass a parts plant; the lot grass is knee-high.",
            "The arithmetic is cold: a bailout costs billions, no bailout zeroes hundreds of thousands of jobs before Christmas."
          ],
          rumor: [
            "Some say one of the three can be saved and the other two just rode along.",
            "They say the White House leans toward a conditional rescue — with riders tucked into the conditions."
          ],
          unknown: [
            "The bailout passes — but the jobs and pensions never come back.",
            "This vote will footnote Michigan's map for twenty years."
          ],
          terms: [
            { k: "Auto bailout", v: "The 2008 rescue of the three automakers, tied to restructuring terms." }
          ]
        },
        choices: [
          {
            id: "save",
            text: "Vote the bailout: hundreds of thousands of jobs can't zero out by Christmas",
            note: "Saving jobs is real; the backlash for a bailout is real too. The unions remember you — and so do the Tea Party ads.",
            outcomes: {
              crit: { body: "The bailout passes, and in its terms you slip in protections for workers' pensions. A union newsletter runs your photo on the front page." },
              ok: { body: "You vote yes. Michigan papers thank you; out-of-state editorials ask who's next." },
              meh: { body: "You voted, the bill passed, and the terms diluted the clause you wanted down to a statement of principle." },
              fail: { body: "The bailout clears, but a year later the plants still close two lines. Unions blame loose terms; the papers blame your softness." },
              critfail: { body: "Your defense of the executives at the hearing gets cut into a national Tea Party ad: your money, his corporate jet." }
            }
          },
          {
            id: "no",
            text: "Vote no: taxpayers can't rescue every big mistake",
            note: "The applause from fiscal hawks and the Tea Party is real, and so is the unions' fury. This vote is a liability in factory states, an asset in the Sun Belt.",
            outcomes: {
              crit: { body: "Your no-speech is airtight logic, hailed by fiscal hawks as the best case made all year. Fundraising invites fly in from three states." },
              ok: { body: "You vote no. The bill passes anyway, but your stance is clean enough to print on a flyer." },
              meh: { body: "The no vote stopped nothing; it only expressed something. In politics, expression counts as work." },
              fail: { body: "The local union tapes your face by the door of its meetings — right where the target goes." },
              critfail: { body: "The day after you vote against the rescue, your district's largest parts plant announces it's shutting. At the press conference you're asked, and now?, eleven times." }
            }
          },
          {
            id: "condition",
            text: "Yes, with conditions: turn the rescue into a restructuring plan",
            note: "The middle path: save them, but management must go, money must be repaid, on a timetable. Done well it's art; done poorly you get hit from both sides.",
            outcomes: {
              crit: { body: "The amendment you drafted becomes the final version: money in tranches, conditions with teeth, equity for the government. Papers call it a textbook middle path." },
              ok: { body: "Most of the amendment is adopted. The bailout gets a rein — how tight, time will tell." },
              meh: { body: "Conditions were added, but the enforcement clause was stripped. You know that was the teeth." },
              fail: { body: "Both sides reject you: one says too little, one says too much. The middle is narrower than you thought." },
              critfail: { body: "The Wall Street Journal and the union papers pan your plan the same day — both reach for nearly the same word: naive." }
            }
          }
        ]
      }
    ]
  }
});
