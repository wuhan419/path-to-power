/* ============================================================================
 * CONTENT · i18n/en/events/109-boon-fill.js
 * 中文文件 content/events/109-boon-fill.js 的英文覆盖层（顺境填充包，4 张卡）。
 *
 * 契约（详见 docs/I18N.md §3–§5）：
 *   · 原中文文件一个字不动；本文件只放要覆盖的字段，结构键由引擎保护、不写。
 *   · 事件/选项按 id 定位；known 是纯字符串数组，整体替换、整条给全
 *     （本包每卡 known×2，无 rumor/unknown/terms，与原文一致）。
 *   · 占位符 {CITY} {ORG} {MEET} {PUB} {PLACE} 由 engine/flavor.js 在运行时按
 *     当前语言填词，覆盖层里原样保留、不翻译。
 *   · 1980/1990/2001 三张卡的实物保持时代正确；2016 张才允许社交网络词
 *     （DM、trending、comment section）。
 *   · 长度按 §11.7 同尺复核（拉丁词 ×0.5）：全部字段在预算内。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* -------------------------------------------------- 1980 新兴草根组织 */
      {
        id: "boon1980_grassroots",
        title: "A rising grassroots group wants you to lead the {CITY} movement",
        body: "The organizer pushes a stack of blank signup forms across the table: \"We want one of our own. Want in — let's turn {CITY} upside down together?\"",
        brief: {
          lede: "A new wind is blowing across the country. {CITY} is scrambling for a young face to stand for it — and they found you.",
          known: [
            "The new outfit {ORG} has money and ideas; what it lacks is a trusted local to head things.",
            "They picked you because you \"don't run like the old machine.\" Board the vehicle: take off, or get thrown off."
          ]
        },
        choices: [
          {
            id: "ride_wave",
            text: "Get on board: lead the local new movement",
            note: "Stand on the crest or eat the wave — the bet is voters and a grassroots crew; the stake is your own standing.",
            outcomes: {
              crit: { body: "You {MEET}, turn a local mobilization into the national model — that young face gets written into this wave's history. Donations, volunteers, the county machine: one morning, all answering to you." },
              ok: { body: "You become the name of the local movement. Donations and volunteers keep coming through the door." },
              meh: { body: "You boarded — still in the back seat. The front row belongs to others." },
              fail: { body: "Half a step slow in the surge; the louder radicals take the story, and the establishment leans on a {PUB} editorial to call you an \"agitator.\"" },
              critfail: { body: "The movement crashes and you get tagged as the kid passing out the flyers — young enough, still, to rebuild the stake." }
            }
          },
          {
            id: "keep_own_brand",
            text: "Cooperate without joining: borrow the wind, wager nothing",
            note: "Plant your own post in the gale — the payoff is small, and the loss is smaller.",
            outcomes: {
              crit: { body: "You borrowed the event's machinery without letting anyone's win or loss tie you down. When the wind dropped, you stood where you stood, name clean." },
              ok: { body: "Pleasant collaboration; room to advance or retreat." },
              meh: { body: "Neither profit nor damage." },
              fail: { body: "Neither camp quite trusts the fence-sitter. The spoils come thinner." },
              critfail: { body: "Too careful — you missed this bus. You also dodged the crash that came after it." }
            }
          },
          {
            id: "cash_out",
            text: "Ride the current: turn this wind into personal capital",
            note: "The fattest thing on a windbreak is cashing out. Money in hand — and the \"one of us\" glow starts to fade.",
            outcomes: {
              crit: { body: "You plant yourself between sponsors and organizers and skim a generous layer. Business doors open for you — while the grassroots start murmuring: not one of us." },
              ok: { body: "When the wind dies down, your books read considerably better." },
              meh: { body: "A modest take; not embarrassing." },
              fail: { body: "The wind stops. All that is left is a bundle of connections that owe you nothing." },
              critfail: { body: "Someone photographed the feeding frenzy. \"Vulture\" follows you now — the cash landed; your name and your conscience did not." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 1990 凯旋欢迎仪式 */
      {
        id: "boon1990_homecoming",
        title: "The veterans' association asks you to host a homecoming ceremony",
        body: "An association veteran claps your shoulder at {PLACE}: \"We don't want a politician. We want someone who still believes in all this. You'll do.\"",
        brief: {
          lede: "The whole country is lighting candles for the kids in the desert. The local veterans' association wants a welcome-home ceremony — it needs someone to lead it.",
          known: [
            "An event nobody opposes: decent, and it gets television. The association wants a host.",
            "Their one condition: keep it nonpartisan. Take it, and you borrow the nation's cameras for your own town."
          ]
        },
        choices: [
          {
            id: "host_rally",
            text: "Host the homecoming ceremony",
            note: "In a moment of unity, whoever stands at the center of the crowd is remembered.",
            outcomes: {
              crit: { body: "The ceremony lands solemn and warm; local television carries your \"welcome home.\" For that one minute, you are the face of a city." },
              ok: { body: "The event comes off; the military families and the community both take note." },
              meh: { body: "You pulled it off — barely a ripple." },
              fail: { body: "The sound system dropped, the run order slipped half a beat — but the intent came through." },
              critfail: { body: "One family thought the setup too humble and gave you a scolding to your face. You stood there, listened, did not dodge." }
            }
          },
          {
            id: "behind_scenes",
            text: "Work quietly backstage; hand the microphones to the families",
            note: "The operator who takes no credit banks the longest favors.",
            outcomes: {
              crit: { body: "You gave the stage to the people who earned it. Veterans and families agree, privately: reliable — and asks nothing back." },
              ok: { body: "The humility made the ceremony land harder — and won you solid, grassroots goodwill." },
              meh: { body: "Nobody especially remembers you. Nobody has a complaint either." },
              fail: { body: "Too quiet: the papers never said who organized it." },
              critfail: { body: "You handed out all the credit until it looked like you never came. The veterans, though — they keep their own ledger." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 2001 社区应急牵头 */
      {
        id: "boon2001_firstresponder",
        title: "In the crisis days, the community pushes you to lead relief",
        body: "The firehouse union, the churches and the school principals sit down together: \"We don't know the big shots. We know you get things done. Start this one for us.\"",
        brief: {
          lede: "In the days the sky came down, everyone asked \"what can I do.\" Someone answered: \"Go find him — he's already organizing.\"",
          known: [
            "Local response is a tangle: blood lines, supply drives, missing-persons calls. Someone must sort it.",
            "This is not campaigning; it is rescue. Lift this weight now, and your name bonds to \"reliable.\""
          ]
        },
        choices: [
          {
            id: "coordinate_relief",
            text: "Take up the community's emergency coordination",
            note: "What you get done in a disaster pays back tenfold in peacetime.",
            outcomes: {
              crit: { body: "You sort the tangle into blood drives, supply depots, a hotline for missing families. The town says: those days, you were what held it up." },
              ok: { body: "The coordination grows a shape; every camp takes direction from you." },
              meh: { body: "Amid the chaos, at least nothing collapsed on your watch." },
              fail: { body: "A couple of hand-offs fumbled — but everyone was feeling in the dark those days. Nobody really blamed you." },
              critfail: { body: "One missing-person lead went cold and people questioned you, briefly. You passed no blame and patched the gaps one by one." }
            }
          },
          {
            id: "calm_not_fear",
            text: "Help coordinate — and talk the neighborhood out of panic",
            note: "When fear runs, steadying hearts is harder than moving boxes — and matters more.",
            outcomes: {
              crit: { body: "While you built the relief you smothered the rumors, and the local paper printed your line: \"Fear is normal. Don't let it decide for us.\"" },
              ok: { body: "You became the voice that kept people steady." },
              meh: { body: "You said plenty; it landed at half strength." },
              fail: { body: "Some called it downplaying. More people slept easier because you spoke." },
              critfail: { body: "One reassurance got clipped out of context; it took real effort to walk it back. But everyone remembered you never left the room." }
            }
          }
        ]
      },

      /* -------------------------------------------------- 2016 短视频走红 */
      {
        id: "boon2016_goviral",
        title: "Your unscripted clip explodes overnight",
        body: "The phone does not stop all day. Strangers pour into the messages: \"Finally, someone not reading from the teleprompter.\" The cynics chime in: \"Just wait for the fall.\"",
        brief: {
          lede: "You looked into a camera and said plain things; you woke to it shared hundreds of thousands of times. The algorithm likes you today.",
          known: [
            "In an age of rehearsed lines, plain talk is the scarce thing. That is why it is being shared this hard.",
            "The following is real — so is the scrutiny. Fireworks or seed capital: your call."
          ]
        },
        choices: [
          {
            id: "keep_authentic",
            text: "Keep talking straight; hire no packaging team",
            note: "Realness is the stickiest audience — and the one that survives a collapse least. Provided you do not collapse.",
            outcomes: {
              crit: { body: "Straight talk keeps landing on the same nerve; followers grow by the tens of thousands. In {CITY}, people call you one of them." },
              ok: { body: "The heat held; your grassroots followers turned into volunteers you can actually count." },
              meh: { body: "It flared, cooled, and left you a core of diehards." },
              fail: { body: "Diggers found your old posts; your answer was a shade clumsy — but the real-person brand held you up." },
              critfail: { body: "One plain sentence got cut and twisted onto the trending list. You did not delete it — you clarified all the way down. After the storm, more people believe you." }
            }
          },
          {
            id: "convert_offline",
            text: "Turn the online surge into offline organizing",
            note: "Likes become voters only when the phone heat lands as shoes pounding doorsteps.",
            outcomes: {
              crit: { body: "You called the comment section out to {PLACE} for real door-knocking. While others still count views, you field a volunteer corps." },
              ok: { body: "You caught the online heat and banked it as one offline event after another." },
              meh: { body: "Some converted; most kept it to their eyeballs." },
              fail: { body: "Loud online, empty at the turnout. Mildly humiliating." },
              critfail: { body: "The first event flopped — which made the diehards who stayed all the more precious." }
            }
          }
        ]
      }

    ]
  }
});
