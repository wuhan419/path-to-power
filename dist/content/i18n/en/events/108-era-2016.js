/* ============================================================================
 * CONTENT · i18n/en/events/108-era-2016.js
 * 中文文件 content/events/108-era-2016.js 的英文覆盖层（社交媒体时代：
 * soc16_election / soc17_fakenews / soc18_data / soc20_mailin）。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 事件按 id 定位；choices / terms 里带 id 的按 id 对齐，不带 id 的对象按数组下标对齐。
 *   · 纯字符串数组（known / rumor / unknown / texts）是**整体替换**，必须整条给全，
 *     少给一条就少一条 —— 不合并。
 *   · 结构性键（id / era / minYear / tierMin / weight / base / mods / effects /
 *     flags / req / cost …）由引擎保护，写了也不会生效，validate 会直接报错。
 *   · 缺译的字段自动留中文，所以可以一张一张补。
 *   · 经济字段是系数，不涉及文案，不用管。
 *
 * 英文写法：按英语重写，不是逐字翻。第二人称、现在时、短句；
 * 「」在英文里用引号或改写掉；专有名词用真实英文（Twitter、Facebook、
 * vote-by-mail、Cambridge Analytica），并带英语媒体的语感（fake news、echo chamber、platform）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "soc16_election",
        title: "Every poll says it's in the bag. Nobody measured the fire in the phones",
        body: "Every respectable forecast points the same way; not one model breaks rank. But the rage on Twitter,\n" +
          "the shares on Facebook, and the roar at the rallies never entered a single poll. On count night, the\n" +
          "red states turn red early, one after another, and the anchors' voices go tight. For the first time\n" +
          "the old machine finds itself out of order.",
        brief: {
          lede: "Attention has replaced organization. Whether this new current sweeps you away or lifts you up depends on what you believe tonight.",
          known: [
            "It comes to you because both camps can reach you locally; each has come asking for a statement.",
            "The party bosses still wait for the sure win, reading the old script. The populism in the phones no longer cares what the sign says.",
            "Whoever wins, most voters on the other side will feel those people are unfit to govern."
          ],
          rumor: [
            "The opponent's viral posts came from a foreign farm — or, about our own hits, from the other side.",
            "Some say the old papers and TV networks picked a winner early. They just won't admit it."
          ],
          unknown: [
            "Whether tonight's failure was an accident or the new normal for every election from here.",
            "The side you back tonight may be the table you want flipped in four years."
          ],
          terms: [
            { k: "Attention politics", v: "Winning by seizing public attention and going around the party machine." }
          ]
        },
        choices: [
          {
            id: "ride",
            text: "Bet on the wave: embrace the anti-establishment mood, keep your distance from the old machine",
            note: "The bet is that the wind has changed, not that this is a passing gust. Right, you are the new court favorite; wrong, you belong to neither side.",
            outcomes: {
              crit: { body: "You see that this is not a tantrum that blows over, and you are first to call yourself someone who hears ordinary voters. The machine calls you opportunist; the new wave carries you to the front." },
              ok: { body: "You speak with the grain of the mood. Grassroots voters like that you don't pose. The upper floors watch you closer, but your seat feels steadier." },
              meh: { body: "You hedge both sides, shallow on each. The base finds you not tough enough, the establishment finds you not loyal; nobody claims you as one of their own." },
              fail: { body: "You reached for the wave, and it passed you by. You lost the machine's backing and never got the populists' applause." },
              critfail: { body: "You vouched for the worst line of the campaign; later it is lifted out alone as proof of what he stirred up. The tide retreats; you are left standing where the sun hits." }
            }
          },
          {
            id: "hold",
            text: "Hold the machine: discipline, seniority, and we cannot let a madman in",
            note: "The last hard word for the old establishment. It may keep your decency — or sweep you away as an elite who never met a voter.",
            outcomes: {
              crit: { body: "In a night of memes mocking the old rules, you make one complete case for procedure and decency. You are a meme by morning; years later someone digs it up as one of the few clear voices of the night." },
              ok: { body: "You hold the party's face; the bosses mark your steadiness. Only the base feels a pane of glass between your words and their days." },
              meh: { body: "You recite the old rules to nobody listening. On a phone-lit shouting night, decency is the least sellable thing there is." },
              fail: { body: "You speak for the machine while the machine collapses. You are tied to the confident experts who were all wrong, and you fall in trust with them." },
              critfail: { body: "Your line about who is fit to govern is cut to fifteen seconds and looped: an elite, despising voters in his own words. That clip follows you for life." }
            }
          },
          {
            id: "wait",
            text: "No side: hold the local ground, wait to read the wind",
            note: "The least glamorous and most survivable play. The bet: leave no handle for either side.",
            outcomes: {
              crit: { body: "You help nobody and offend nobody, quietly finishing the local business. Once the wind settles, the winning side actually comes to you to talk cooperation." },
              ok: { body: "You stay neutral and bet against nothing. In a storm, having no handle on you is the biggest asset." },
              meh: { body: "You offend no one, and no one remembers you. Tonight you were transparent." },
              fail: { body: "Both camps read your silence as guilt. On a night that forces everyone to pick, neutrality is also a pick." },
              critfail: { body: "You watch from both fences, and each side decides you are the other's plant. Whoever wins wants you replaced." }
            }
          }
        ]
      },
      {
        id: "soc17_fakenews",
        title: "A fabricated story about you tops 100,000 shares in three hours",
        body: "Someone manufactures an insider scoop about you: plausible details, strong emotion, sources close to\n" +
          "the matter. By the time your team checks it out, half the internet has shared it. A rebuttal takes\n" +
          "three days to write, and in three days nobody remembers what was rebutted. The platform answers: this\n" +
          "does not violate our community guidelines.",
        brief: {
          lede: "While the truth is putting on its shoes, the lie has already crossed the town. Your opponent no longer needs to prove you wrong — only to make enough people not bother checking.",
          known: [
            "The fake aims at the nerve your swing voters feel most. You are on a target list.",
            "A point-by-point rebuttal amplifies the lie; a shrug reads as agreement.",
            "Platforms have no editor and no accountable party. Finding who to even complain to is your first problem."
          ],
          rumor: [
            "Was this your rival's op, or just a content farm chasing traffic?",
            "Some say the platform knew it was spreading. Anger is what keeps users."
          ],
          unknown: [
            "Whether poison-first-clean-up-later becomes standard equipment for every election.",
            "Whether the money you spend debunking will be squeezed by the same machine tomorrow."
          ],
          terms: [
            { k: "Content farm", v: "Sites that mass-produce sensational posts for traffic, true and false mixed." }
          ]
        },
        choices: [
          {
            id: "fight",
            text: "Hard debunking: press conference, a timeline, demand the platform label it",
            note: "Chase every lie back to its source. You have the facts — and you are racing a machine that does not care about facts.",
            outcomes: {
              crit: { body: "You lay out evidence point by point and nail the fabrication chain in public. Being smeared this hard and still standing straight wins back more trust than you lost." },
              ok: { body: "The debunking lands; the core voters hold. Scraps of the lie linger, but it never drags you under." },
              meh: { body: "You spend real effort, but the sober never outruns the sensational. Nobody reads the rebuttal; the rumor keeps spreading." },
              fail: { body: "The more you explain, the more those lies get repeated. You kept the story alive three extra days by yourself." },
              critfail: { body: "A small slip in your own rebuttal gets found and framed: he lies even while debunking. The mud only gets deeper." }
            }
          },
          {
            id: "mock",
            text: "Don't rebut — turn the fake story into a running joke",
            note: "Beat magic with magic: nobody reads evidence, so out-funny them. The risk is cheapening yourself.",
            outcomes: {
              crit: { body: "You mock the solemn-looking fabrication into a running internet joke; the makers dare not claim it anymore. Laughter is the best disinfectant." },
              ok: { body: "You win the joke and look half a head above everyone. Only some of your voters wanted more seriousness." },
              meh: { body: "You reach for funny; the joke falls flat. The lie survives, and you look like you are winking at the air." },
              fail: { body: "Your joke is clipped out of context and becomes a fresh handle. You meant to put out the fire and stacked a second story on your own roof." },
              critfail: { body: "You laughed at the wrong thing — the fake story turns out to be a real local tragedy. Your joke dies, cold, in public." }
            }
          },
          {
            id: "ignore",
            text: "Starve it: say nothing and let the heat pass",
            outcomes: {
              crit: { body: "You answer with zero words. Given no scene partner, the story dies in three days. The money and hours go into real work instead." },
              ok: { body: "You give it no oxygen, and it sinks slowly. Only for a stretch you plainly looked unable to defend yourself." },
              meh: { body: "You wait for it to cool; it cools by inches. You walk these days wearing mud you never got to wash off." },
              fail: { body: "The more silent you are, the more it looks like agreement. By the time you answer, the lie has become many people's fact." },
              critfail: { body: "Your silence reads as hit-and-scared. The story rolls into a real crisis, and your own party starts distancing from you." }
            }
          }
        ]
      },
      {
        id: "soc18_data",
        title: "We can target the mood of every swing household",
        body: "A data firm comes calling. It claims a psychographic profile on every voter in your district — from\n" +
          "shopping habits to what they scroll at midnight. It quotes a consulting fee and promises ads for every\n" +
          "pair of eyes: fear to the frightened, anger to the angry. And it wants part of your voter file to\n" +
          "calibrate the model.",
        brief: {
          lede: "Attention can be bought; emotion can be modeled. Spend it right and it is a masterstroke; spend past the line and it is your next scandal.",
          known: [
            "It comes to you because you sign the campaign budget. Word inside the party: next door's results were frightening.",
            "Micro-targeting works — but the calibration asks for personal voter data.",
            "If a privacy-for-victories operation ever surfaces, the backlash will be worse than never buying."
          ],
          rumor: [
            "Some say the data was siphoned off the social platforms through a gray API.",
            "Some say your campaign is not the only buyer of your voters' profiles."
          ],
          unknown: [
            "Whether these manipulation tools will one day turn and aim at you.",
            "Whether it gets exposed comes down to who tells the story first."
          ],
          terms: [
            { k: "Psychographic targeting", v: "Ads aimed at emotional weak points inferred from personal data." }
          ]
        },
        choices: [
          {
            id: "allin",
            text: "Buy it all: pay the fee in full, hand over the file for calibration",
            note: "Maximum mobilization now. But you are giving a third party your voters' privacy and your own leverage in one envelope.",
            outcomes: {
              crit: { body: "The machine is uncanny — you seem to read every swing household, and every dollar hits. The firm takes you on as a flagship case. Only sometimes you wonder: who still holds that data?" },
              ok: { body: "The targeting works; your turnout runs a notch sharper than the rival's. The money roughly returns. But the moment you handed over the file, something dropped in your stomach." },
              meh: { body: "Big money, small result — half the profiles you bought were stale. The cash floats away, and the file went with it." },
              fail: { body: "The ads make no splash, and the firm blows up. The voter file you gave it becomes overnight proof: he sold our data to a black box." },
              critfail: { body: "A national probe takes the firm down — the next Cambridge Analytica headline has your name in it. Your emails, informed and agreeable about voter privacy, are published one by one. Textbook case." }
            }
          },
          {
            id: "partial",
            text: "Buy the service, not the handshake: aggregate numbers, never personal data",
            note: "Take the tool, leave the handle. The risk you save is the knife someone will later use on you.",
            outcomes: {
              crit: { body: "You use only the anonymous half. Somewhat weaker, but clean enough to audit. Years later your peers fall one by one and you are still standing — praised for having left something on the table." },
              ok: { body: "You buy the capability and hold the line. Turnout ticks up; you leave no handle behind." },
              meh: { body: "Without the file, the model goes half-blind. Half the money, a fraction of the effect." },
              fail: { body: "Neither side is pleased: the firm resents your caution and sells you a half plan; your rival still says you use the black box too." },
              critfail: { body: "You kept it as clean as you could — and the firm still borrowed data in your name. Now you are the man who cannot say whether he knew." }
            }
          },
          {
            id: "refuse",
            text: "Decline it all: put that effort into knocking on doors",
            note: "The dumbest and cleanest play: no data given, no money burned. Only your own shoes.",
            outcomes: {
              crit: { body: "You bought no model and spent people and hours on doors. In the age of algorithm campaigns, the dumbest method gives you what rivals cannot buy: real contact." },
              ok: { body: "You take the oldest road. Solid results, no fireworks, no landmines." },
              meh: { body: "Two legs, door to door — but when algorithms hold the attention, the hard way feels thankless." },
              fail: { body: "You make refusing data a moral platform; the rival smiles: he couldn't afford it, so he plays pure." },
              critfail: { body: "You denounce the field's use of data — then someone digs up your own old trial of a similar little tool. Hypocrite, nailed shut." }
            }
          }
        ]
      },
      {
        id: "soc20_mailin",
        title: "On count night, the lead melts by itself",
        body: "In the pandemic year, tens of millions vote by mail. The rules are clear: nothing counts until it is\n" +
          "counted, and counting takes days. So the picture arrives before the whole country: the map turns red,\n" +
          "then blue, and your district posts a strange overnight flip. Someone is already shouting fraud. In\n" +
          "your hands: a few cases of unopened envelopes, and a crowd one match from igniting.",
        brief: {
          lede: "Nothing broke. It is only slow. But to a machine fed by anger, slow is the same as guilty.",
          known: [
            "You coordinate the local count, and both camps are watching the unopened cases on your table.",
            "Delayed mail-in tallies are routine, spelled out in the rules — and they run tonight's result backwards.",
            "One wrong word now becomes proof of what they were doing in secret."
          ],
          rumor: [
            "Some say these late-arriving cases were tampered with — or the claim is only an excuse."
          ],
          unknown: [
            "Don't trust the results is a seed; planted once, it sprouts every year after."
          ],
          terms: [
            { k: "Blue shift", v: "As delayed mail ballots are counted, the early leader is overtaken — by design, not by fraud." }
          ]
        },
        choices: [
          {
            id: "explain",
            text: "Talk procedure all night: livestream the opening, explain slow to everyone",
            note: "Reasoning on a night nobody wants reasons. You hold the process; few may thank you for it.",
            outcomes: {
              crit: { body: "You livestream every case as it opens and repeat the rules until they are boring. Win or lose the flip, you are known as the one who held this count." },
              ok: { body: "You explain the procedure honestly, and the people who follow it believe you. The angry half is another matter." },
              meh: { body: "You said a great deal; nobody truly listened. You kept watch over the boxes and the rules. That is all." },
              fail: { body: "The more you insist all is normal, the more it sounds like cover. Normal procedure lost to an abnormal air of distrust." },
              critfail: { body: "A small clerical slip in one case you ran is enlarged into smoking-gun fraud. Your explanations cannot catch the viral post." }
            }
          },
          {
            id: "hype",
            text: "Ride the fire: shout stop the count, investigate fraud — steady your own side first",
            outcomes: {
              crit: { body: "You shout stop before anyone else, and the group chat makes you one of them. Popularity spikes — and you are aboard a vehicle with no known destination." },
              ok: { body: "You shout a few lines and steady your side's temper. The legal and dignified parts, you quietly pull back a little." },
              meh: { body: "You try to borrow the fire; it does not light your face. You shouted, and banked little." },
              fail: { body: "You led the doubt; the finished count shows nothing wrong. The next day's headline: he couldn't say what he was upset about." },
              critfail: { body: "The fire you lit runs into a scene you cannot cover. In the later reckoning, your shout plays back word for word." }
            }
          },
          {
            id: "quiet",
            text: "Say little: count every vote to the end; that is all you can do",
            outcomes: {
              crit: { body: "You chase no wave of heat; you silently count to the bottom. When the wind settles, people notice: that night, he never added fuel." },
              ok: { body: "You do the job out of the spotlight. No brilliance, no trouble." },
              meh: { body: "You said nothing, and almost nothing about you is remembered. On such a night, that counts as safe." },
              fail: { body: "Both camps misread your silence: one takes it as agreement, one as guilt. Not speaking is also speaking." },
              critfail: { body: "You bent over the ballots and finished. But he was there and said nothing arrives late as a charge." }
            }
          }
        ]
      }
    ]
  }
});
