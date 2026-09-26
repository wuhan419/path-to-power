/* ============================================================================
 * CONTENT · i18n/en/events/55-media-timeline.js
 * 中文文件 content/events/55-media-timeline.js 的英文覆盖层（跨年代媒介时间轴包）。
 *
 * 契约（详见 docs/I18N.md §3–§5）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 结构性键（id / era / medium / grade / category / base / mods / cost /
 *     stake / effects …）受引擎保护，本文件一律不写。
 *   · 本包无 choices[].note、无 tag/label 字段，故不覆盖。
 *
 * 英文写法：第二人称、现在时、短句；「」化为英文引号或直接并进句子。
 * 媒介词严格随年代走：radio=话筒/电波 · tv=黄金时段/广告档 · cable=二十四小时频道
 * （1980s—90s 不说社交媒体）· internet=匿名博客/扫描件（1995+）·
 * shortvideo=算法/平台推荐（2018+）· deepfake=合成/技术鉴定（2022+）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* ---------- 1) 广播时代（radio） ---------- */
      {
        id: "media_fireside",
        title: "A radio station offers you a fixed evening talk show",
        body: "The station wants a weekly evening talk: thirty minutes, one microphone, no pictures. " +
          "Your team calls it wasted time — nobody can see your face, so nobody will remember you. " +
          "Listeners are only half-present, dishes washing, cars driving; a sentence has to stand on its own. " +
          "Taped or live? The station says \"it depends,\" and you never learned what that means. " +
          "Your rival has no show yet — the one field where he trails you. Some say a money group just bought " +
          "stock in the station, and nobody will name it. How many people truly listened, you will never know.",
        choices: [
          {
            id: "fireside",
            text: "Keep it homely: talk politics like you talk to neighbors",
            outcomes: {
              crit: { body: "Your voice becomes the wind-down ritual of millions. People begin to feel they know you." },
              ok: { body: "The numbers hold, and the station renews. You now own a window of your own." },
              meh: { body: "Some listen, some switch away. At least you have learned to speak into thin air." },
              fail: { body: "Your neighborly chat is snipped into bits and played for laughs on another man's show." },
              critfail: { body: "One live slip, replayed until it defines you. You become \"the guy who misspoke.\"" }
            }
          },
          {
            id: "scripted",
            text: "Demand a taping: read word for word, let nothing slip",
            outcomes: {
              crit: { body: "The script has not one crack in it. The station files a copy as its model." },
              ok: { body: "Solid and safe. Nobody praises you; nobody catches you either." },
              meh: { body: "Listeners feel a filing cabinet being read aloud. One paper writes: \"He hardly sounds like a person.\"" },
              fail: { body: "The script leaks, under one headline: \"Needs a Script Just to Chat with Voters.\"" },
              critfail: { body: "The leaked script carries one line in the editor's red pencil: \"You may lie here.\"" }
            }
          }
        ]
      },

      /* ---------- 2) 电视时代（tv） ---------- */
      {
        id: "media_tv_spot",
        title: "You pay a fortune for thirty seconds in prime time",
        body: "The station's ad department gives you a price: thirty seconds, prime time — enough to turn " +
          "one man into a face the whole country recognizes. The price is nearly all your money. The pre-dawn " +
          "bins cost pennies, and almost nobody watches them. Your opponent bought the same hour yesterday, " +
          "a month ahead of you. Viewers forget your words; they keep the face that showed up in their living " +
          "room. The crew shooting your spot made detergent ads the week before. Whether money multiplies into " +
          "seats, nobody has ever been able to prove.",
        choices: [
          {
            id: "prime",
            text: "Bet nearly all your money on prime time",
            outcomes: {
              crit: { body: "People in several states mimic the spot line by line. You really are a nationally known face now." },
              ok: { body: "It airs well. Far more people know who you are." },
              meh: { body: "The spot ran, the money went, the talk stayed flat." },
              fail: { body: "Commentators take the spot apart for laughs. Your money and your face get remembered together." },
              critfail: { body: "On opening night, your opponent buys the very next slot — to mock your ad." }
            }
          },
          {
            id: "late",
            text: "Buy only the pre-dawn bin and test the water small",
            outcomes: {
              crit: { body: "The graveyard slot overperforms: near-zero cost, real result. You found the cheap road." },
              ok: { body: "Small numbers, but people nobody else touches — night-shift workers, mothers awake at 3 a.m., drivers on the early route. They write you letters." },
              meh: { body: "Almost nobody watches. The money is gone; nothing happened." },
              fail: { body: "Your slot gets sold to fill someone's premium-offer ad, and your spot runs truncated." },
              critfail: { body: "Your spot resurfaces as fodder on a late-night comedy hour." }
            }
          },
          {
            id: "earned",
            text: "Spend not a cent: take your face time wherever it is free",
            outcomes: {
              crit: { body: "You chain the free appearances: churches, union halls, county fairs. He buys slots; you buy people. It works just as well." },
              ok: { body: "Free exposure runs slow, but the papers and the local station do start remembering your name." },
              meh: { body: "Half a year on the road, little gain. But you owe no debt, and no favor." },
              fail: { body: "The free slots all sit in dead hours. You came away thinner and no more famous." },
              critfail: { body: "On local live TV you fumble the question this town cares about most. The clip gets laughed over for two months." }
            }
          }
        ]
      },

      /* ---------- 3) 有线电视时代（cable） ---------- */
      {
        id: "media_cable_show",
        title: "A cable news midnight show makes you its target",
        body: "The midnight talk show on the 24-hour news channel has used you for target practice three weeks " +
          "running. Its ratings are small, but its audience is exactly the crowd that turns out for party " +
          "primaries — and it never forgets. Cable must fill twenty-four hours, so taking sides became a program " +
          "of its own. The producer sends word: one appearance kills the story that you dare not show up. You can " +
          "also starve him, and starving is a strategy — if you can stand it. They say the money behind this " +
          "channel is already raising funds for a possible rival of yours. Whatever you say tonight will be recut " +
          "and replayed.",
        choices: [
          {
            id: "go_on",
            text: "Go on the show and hit back to camera",
            outcomes: {
              crit: { body: "You drive the host to lose his composure instead. The clip circulates on the newswires and in the papers." },
              ok: { body: "You hold your ground. The \"he dared not come\" line is dead." },
              meh: { body: "They cut you down to three short sentences, and none of them quite sound like you." },
              fail: { body: "Twenty straight minutes on the defensive. Next morning the papers summarize you themselves." },
              critfail: { body: "One angry sentence plays on endless loop. You become that channel's standing joke." }
            }
          },
          {
            id: "ignore",
            text: "Starve him. Put the hours back into your district",
            outcomes: {
              crit: { body: "You give them nothing at all. The show runs dry of material and moves on to someone else within three weeks." },
              ok: { body: "The heat fades by itself. People at home see the work you kept doing." },
              meh: { body: "The show keeps hitting you and nobody much cares. You gain nothing either." },
              fail: { body: "\"He hides from the show\" becomes a tag, and it slowly glues itself to you." },
              critfail: { body: "When you refuse, they find someone who \"knows how you really operate\" — and put him in your chair." }
            }
          }
        ]
      },

      /* ---------- 4) 互联网时代（internet / blogs） ---------- */
      {
        id: "media_blog_drop",
        title: "An anonymous blog posts three of your internal documents",
        body: "A blog nobody had ever heard of posts scans of three letterhead documents. The scans are real: " +
          "your signature is on them, and the words are yours from a closed meeting three years ago. The blog has " +
          "no byline and no address, only a free mail account — and no more than seven people alive could reach " +
          "those files. Legacy reporters need a second independent source before they follow a leak, and they may " +
          "never follow at all. The blog registered three months ago; its first post was exactly these three. " +
          "Who handed them out, and how many more sit in a queue, you will not learn.",
        choices: [
          {
            id: "own_it",
            text: "Admit you said it — and explain the room it was said in",
            outcomes: {
              crit: { body: "You explain the sentence in full and publish the meeting minutes along with it. Readers start questioning the leaker's motives." },
              ok: { body: "You own it. The story stops climbing." },
              meh: { body: "You explained once, but only a fraction of readers saw it. The raw sentence keeps traveling." },
              fail: { body: "Your explanation gets quoted as proof of \"what he really thinks.\"" },
              critfail: { body: "The more you say, the more sentences they cut and run. By day three you have stopped explaining." }
            }
          },
          {
            id: "find_leaker",
            text: "Find who handed the files out in the first place",
            outcomes: {
              crit: { body: "One glare off a copier's glass plate identifies who photographed the file. You say nothing — but now you know whom to watch, and you hold a counter-move." },
              ok: { body: "The circle narrows to two or three names. You keep your own counsel, and the leaking stops." },
              meh: { body: "You find nothing and spend real money. You are now guarded a fraction more — against empty air." },
              fail: { body: "Your hunt becomes known, and the story flips: \"He's chasing leakers instead of explaining.\"" },
              critfail: { body: "You hunt the wrong man and drive off an old lieutenant. He takes more of the files on his way out." }
            }
          },
          {
            id: "silence",
            text: "Say nothing and wait for it to pass",
            outcomes: {
              crit: { body: "You truly hold. By day four nobody is asking; the next news cycle ate it whole." },
              ok: { body: "The heat drains out slowly." },
              meh: { body: "Silence reads as confession — but nobody pushes further." },
              fail: { body: "\"He won't respond\" becomes the story itself, and reporters queue up round after round." },
              critfail: { body: "On the fourth day of your silence, a fourth document appears." }
            }
          }
        ]
      },

      /* ---------- 5) 短视频时代（shortvideo） ---------- */
      {
        id: "media_viral_clip",
        title: "A fifteen-second clip of you kneeling to a child goes viral",
        body: "Fifteen seconds — passed a hundred million times in forty-eight hours. In the clip, after one " +
          "campaign event, you crouch down to a group of kids and say one thing, very slowly. The shooter is a " +
          "volunteer nobody knows: no edit, no music, no plan. In two days, people who never follow politics are " +
          "saying your name. The platform's recommendation is a black box, and nobody can explain this one clip. " +
          "Someone swears a marketing firm put their hand on it. When the heat turns, and over what, nobody warns " +
          "you beforehand.",
        choices: [
          {
            id: "lean_in",
            text: "Ride the wave: hand yourself over to the machine",
            outcomes: {
              crit: { body: "You become \"the one who kneels down to kids.\" The tag follows you for years — and keeps working." },
              ok: { body: "Views convert into real attention. Your name now lives in a great many phones." },
              meh: { body: "Three more hot days, then the next clip buries you." },
              fail: { body: "Your deliberate follow-up shoot is see-through. The comments start typing one word: \"acting.\"" },
              critfail: { body: "A staged team clip leaks its own script — and people decide the first video was staged too." }
            }
          },
          {
            id: "keep_old",
            text: "Ignore it. Keep working the old way",
            outcomes: {
              crit: { body: "By not chasing the moment, you get written up as \"one of the few who do not perform.\" That is itself a good story." },
              ok: { body: "The wave passes, and your oldest supporters trust you more for not riding it." },
              meh: { body: "Nothing happens. The clip never existed." },
              fail: { body: "People start asking: why does the man everyone shares not say one word himself?" },
              critfail: { body: "You missed the window. Half a year later, a newcomer rides the same trick to the seat that was yours." }
            }
          }
        ]
      },

      /* ---------- 6) 合成影像时代（deepfake） ---------- */
      {
        id: "media_deepfake",
        title: "A deepfake impersonating you circulates overnight",
        body: "A two-minute video moves through the night: you on screen, saying something you never said. " +
          "The lip-sync is close. The voice is close. It takes your team forty minutes to confirm — that is not " +
          "you. One person with one afternoon can build this now; the tells are fine, and nobody inspects frame by " +
          "frame. The platforms say they will \"assess it\" within forty-eight hours. Your denial has been shared " +
          "a hundred times more than it was read — which is how a correction sells the lie for the rumor. The first " +
          "account to post it registered two weeks ago, with this single upload. Whoever made it, you will never find.",
        choices: [
          {
            id: "counter",
            text: "Fight with forensics: technical report plus an airtight timeline",
            outcomes: {
              crit: { body: "The lab report and a frame-by-frame comparison drop at once. Major outlets all run the debunk, and the trail from the posting account leads back to a rival's money." },
              ok: { body: "Several papers of record confirm the forgery and name names. The rumor loses its mainstream amplifier." },
              meh: { body: "The report lands — in the tech corner that already cared. Everyone else still half believes it." },
              fail: { body: "Your expensive forensics get repackaged by the other side: \"a rich man's hired experts certify the rich man.\" It looks worse." },
              critfail: { body: "An internal email leaks during the review, read by everyone as: \"even his own team isn't sure.\"" }
            }
          },
          {
            id: "human",
            text: "Skip the tech: take a camera and re-walk that day, block by block",
            outcomes: {
              crit: { body: "On camera you never mention forensics — you just re-walk the whole street, the whole afternoon. People reach their own conclusion, and voters who have met you start debunking for you." },
              ok: { body: "Footage beats a report. On every block you walk, most of the doubt dissolves." },
              meh: { body: "Some are moved; some call it a performance. Both camps only harden." },
              fail: { body: "The walk gets recut into \"him playing the victim\" — and travels further than the original." },
              critfail: { body: "That same day, someone else shot the same scene from another angle. The two clips got stitched together." }
            }
          }
        ]
      }
    ]
  }
});
