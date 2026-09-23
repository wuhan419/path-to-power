/* ============================================================================
 * CONTENT · i18n/en/reg/08-vignettes.js
 * 中文文件 content/08-vignettes.js（静好岁月素材）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md §3）：
 *   · 原中文文件一个字不动；kind 用同名 "vignette" 并进活注册表 reg.vignette。
 *   · fragments 里每条带 id → 按 id 对齐；texts 是纯字符串数组 → 整体替换，
 *     条数与中文逐条一致（每个片段各 2 个写法），不许增删、不许换序。
 *   · slot / months / era / tracks / tiers / minAge / weight / brk / cond 等
 *     结构与条件键由引擎保护，本层一概不写（值留在原注册表上）。
 *
 * 英文写法：像日记，不像翻译。第二人称、现在时、短句；「」改成英文引号或改写掉；
 * 量词位置按英文语序重排。长度按 §11.7 折算预算（每段随笔 ≈ 中文 40 字以内）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    vignette: {
      title: "Quiet Months",
      lede: "A month with nothing much happening.",
      fragments: [

        /* ---------- 时令 season ---------- */
        { id: "se01", texts: [
          "January. The wind rattles the window frame, the heat is humming, and you finally reach the last chapter of a book you bought last year.",
          "January, and the dark comes at four. The office lamp goes on early, over a room full of paper nobody has caught up with."
        ] },
        { id: "se02", texts: [
          "February. Snow after snow; you shovel the driveway just to leave the house, hands too cold to grip the handle.",
          "February is the longest, dullest month of the year. The sky is lead-gray and so are the people. Everyone is just waiting it out."
        ] },
        { id: "se03", texts: [
          "March. The snow is going earlier than usual; the mud takes your shoe with every step, and the wind smells of wet earth.",
          "March. The trees are still bare, but it is a different bareness now — you can feel something moving under it."
        ] },
        { id: "se04", texts: [
          "April, rain on rain, and the trees on the corner all went green overnight.",
          "The April wind is soft. Walking, you notice it has been a long time since you walked this slowly."
        ] },
        { id: "se05", texts: [
          "May. The daylight is outrageous — still bright at eight, and the chairs on the street have moved outside.",
          "May is the best month of the year, best enough to make you nervous — as if you ought to do something while it lasts."
        ] },
        { id: "se06", texts: [
          "June, the heat up. The office window stands open, and the air coming through smells of asphalt going soft.",
          "June, long days, short nights. You drive home while it is still light, and sometimes you take the long way on purpose."
        ] },
        { id: "se07", texts: [
          "July. Too hot to move. The fan runs all night and blows out air as warm as the day.",
          "July. Half the city has left. You stayed — August is keeping something for you."
        ] },
        { id: "se08", texts: [
          "August. The heat is at its end; you can hear crickets at dusk. Two weeks of leave, and you came back a different person.",
          "August. The shade under the tree is the only cool place left. You stand in it and turn the whole thing over again."
        ] },
        { id: "se09", texts: [
          "September. The sky suddenly sits higher. School is back, and the streets fill up again.",
          "September, mornings turning cool. You dig out last year's coat — there is still an unused ticket in the pocket."
        ] },
        { id: "se10", texts: [
          "October. The leaves yellow and drop. You walk the street of plane trees, and it crackles underfoot the whole way.",
          "October — harvest, and reckoning. You run this year's accounts in your head, one by one."
        ] },
        { id: "se11", texts: [
          "November. The leaves are gone, and the rain is cold, drumming on the umbrella like small stones.",
          "November, gray for half the month. You start wishing for snow — snow, at least, is bright."
        ] },
        { id: "se12", texts: [
          "December. The shop windows light up, and the radio plays the same handful of songs as every year.",
          "December. The year-end reports pile up on your desk while the lights outside come on, street by street — another year gone."
        ] },

        /* ---------- 世相 world ---------- */
        { id: "wo08a", texts: [
          " The phone will not stop. Email is faster than mail, and more of it — a hundred replies a day, and you remember none of them.",
          " The bank on the corner changed its sign. The papers run the same word every day; after a while you stop seeing it."
        ] },
        { id: "wo08b", texts: [
          " The blogs and forums carry everything now. What once could be buried for good goes across the country in one night.",
          " Gas prices move by the hour, and so do mortgage rates. Everyone says something is coming. Nobody says when."
        ] },
        { id: "wo08c", texts: [
          " At night the cable business channel stays on. The anchor talks faster and faster, until finally he stops smiling too.",
          " At the office people quit talking about stocks and started asking whose house holds on till spring."
        ] },
        { id: "wogen", texts: [
          " The corridors of city hall always smell of old paper. The line at the counter moves slower than the clock on the wall.",
          " The street keeps its routine: the paper boy, the hot-dog cart, the shoeshine stand. Whatever the world does, they are still there."
        ] },
        { id: "wogen2", texts: [
          " Church, union, VFW post, chamber of commerce — those people may not vote for you, but they decide who the others vote for.",
          " In this town the rules get written at the dinner table, not in the bylaws. Who ate with whom counts for more than who signed what."
        ] },

        /* ---------- 案头 work ---------- */
        { id: "wk_el_lo", texts: [
          " You spend the morning in the district office with whoever walks in — a dozen by noon, most of them people nobody speaks for.",
          " Another buffet tonight. By the eightieth handshake you have stopped tracking whose hand it is."
        ] },
        { id: "wk_el_lo2", texts: [
          " You work every church hall, union local, and VFW post in the county. It teaches you one thing: to find the people, show up where they are.",
          " The voter-registration roll spreads across your desk, page by patient page. No one ever sees this work. It decides who wins anyway."
        ] },
        { id: "wk_el_mid", texts: [
          " A morning on the floor, three hearings deep. You start to see what power looks like: someone reading a report no one listens to.",
          " You walk the corridor office by office for one amendment. It takes until the fifth door for someone to let you finish a sentence."
        ] },
        { id: "wk_el_hi", texts: [
          " Your staff fills the day in fifteen-minute blocks. The only hour that belongs to you is the ten minutes in the car.",
          " There are always too many people waiting to see you. From this seat, the scarcest thing is not money. It is time."
        ] },
        { id: "wk_ap_lo", texts: [
          " Your days are memos with no end. Exactly three people will read what you write, and not one word of it may be wrong.",
          " Two phones sit on your desk. When one rings, the other is usually about to."
        ] },
        { id: "wk_ap_mid", texts: [
          " The budget hearing runs all day, and every number in the booklet is yours to defend.",
          " The staff trusts you more every month — you remember everyone's name, and you remember what each of them asked you for last time."
        ] },
        { id: "wk_ap_hi", texts: [
          " The files waiting for your signature stack higher than you are. You read the first paragraph; the rest runs on trust.",
          " Thousands work for you and you know none of their names — yet every decision of yours rearranges their days."
        ] },
        { id: "wk_ce_lo", texts: [
          " A local radio station gives you fifteen minutes a week. You use it to train your voice — and your nerve.",
          " Your name starts showing up in the column. The first time you see it in print, you keep that copy of the paper."
        ] },
        { id: "wk_ce_mid", texts: [
          " A national program invites you on for one segment. Before air, the producer gives you a single tip: don't talk too long.",
          " Strangers start recognizing you. In restaurants someone crosses the room to say: I have heard you speak."
        ] },
        { id: "wk_ce_hi", texts: [
          " You say one line and thirty papers quote it tomorrow. You start weighing your words — carefully, and after a while, safely.",
          " The name becomes capital in itself. Some people do not want what your office can do for them. They want your name."
        ] },
        { id: "wk_op_lo", texts: [
          " You run elections for other people: the target lists, the turnout math, counting polling-place chairs. Nobody thanks you for any of it.",
          " The county party room is so smoky you cannot see across it. A few pushed-together tables — that is a campaign, all of it."
        ] },
        { id: "wk_op_mid", texts: [
          " The list in your hand decides who gets what, and the pen is yours. You try to keep the writing even.",
          " Every faction comes to see you. You listen, you nod, you promise nothing and refuse nothing — the cheapest way to stay useful."
        ] },
        { id: "wk_op_hi", texts: [
          " You do not run for office; you decide who does. Several names you have dealt with this past while later made the front page.",
          " In this job the best position is the one nobody knows you are in. You pulled it off."
        ] },
        { id: "wk_we_lo", texts: [
          " You read the shop's own books: what came in, what is owed — you could recite it with your eyes shut.",
          " You employ seven people, and you know a little of each family's story, because that is where you came from."
        ] },
        { id: "wk_we_mid", texts: [
          " Board meetings run longer than a legislature. There you learn one thing: money does not talk, but everyone listens to it.",
          " You paid whom you should pay and wined whom you should wine. You dislike the word. It is still called an investment."
        ] },
        { id: "wk_we_hi", texts: [
          " You stopped counting money; you count people now. Every name on the list is one thing that can get done — or blocked.",
          " People come to you not for your opinion but for your phone. And your phone is expensive."
        ] },
        { id: "wk_gen", texts: [
          " Meetings in the morning, people all afternoon, one more event tonight. Maybe ten useful words in the whole day.",
          " There is always a stack on the desk you have not read. You finish the first pages; the rest waits for tomorrow's you."
        ] },

        /* ---------- 日常 life ---------- */
        { id: "lf_young", texts: [
          " Dinner at home, eaten fast, because you are going back to the office after it.",
          " Your wife asks which night this week you can come home early. You think about it. You cannot name one."
        ] },
        { id: "lf_young2", texts: [
          " A few old friends come over on the weekend. Some drinks, no talk of work, and it is late when the door finally closes.",
          " The books in your rental keep multiplying; most stop being read at page twenty. Sooner or later, you tell yourself."
        ] },
        { id: "lf_mid", texts: [
          " The kids grow faster than you meant to notice. Last time your child asked why you are never home; this time the question stopped.",
          " Your parents are getting old. On the phone it is always \"we're fine\" — and you can hear the parts they skip."
        ] },
        { id: "lf_mid2", texts: [
          " The house is bought, the mortgage has a decade and more to run. Some nights you wonder if you should have bought bigger.",
          " You and your wife hardly argue now. You cannot say whether that is a good thing, or something else."
        ] },
        { id: "lf_old", texts: [
          " The house has gone quiet. The kids have their own lives; the call comes once a month, and once the news is said, so is the call.",
          " The obituaries come one after another now. You read them closely, and you sit for a while after."
        ] },
        { id: "lf_old2", texts: [
          " The doctor says less salt, less grease. You agree — and eat out again the same week.",
          " You sleep badly. You wake at three or four and lie there running twenty years of it back through."
        ] },
        { id: "lf_poor", texts: [
          " The month-end bills sit on the table. You turn them face down, as if that made them gone.",
          " The car is in the shop again. The mechanic says it is time to replace it. Next year, you say."
        ] },
        { id: "lf_rich", texts: [
          " Money stopped being a question a while ago. The hard part is remembering why you wanted this much of it.",
          " Someone else tends the numbers now. You look at the reports twice a year, and each time you cannot recall where the money went."
        ] },
        { id: "lf_gen", texts: [
          " The days go fast and square: up, out, back, asleep — each one thin as a sheet of paper.",
          " Nothing to report. It has been years since you had \"nothing to report\" — and you notice."
        ] },

        /* ---------- 心绪 self ---------- */
        { id: "sf_sick", texts: [
          " You wake coughing again. You sit in the dark listening to your own breathing; it sounds like a stranger's.",
          " Your body is trying to tell you something. You talk over it — the schedule will not wait for your body."
        ] },
        { id: "sf_lev", texts: [
          " Some nights you think of that file. The office is empty; you take it out, glance at it once, put it back.",
          " You are holding something that belongs to someone else. In the corridor, you find yourself not looking at certain faces."
        ] },
        { id: "sf_scan", texts: [
          " Someone is looking into you. You know, because the calls that should come are not coming.",
          " You start editing yourself mid-sentence. Some words you turn over, then trade for blander ones."
        ] },
        { id: "sf_scandal", texts: [
          " A stranger on the street recognizes you, looks, and looks away. You replay that look for a week.",
          " The story in the papers has passed — but you know it has not gone anywhere. It is only waiting to be used again."
        ] },
        { id: "sf_social", texts: [
          " The phone rings from morning to night, and every call is someone else's problem. Not one of them is for you.",
          " You know more people every month, and fewer of them are worth the truth."
        ] },
        { id: "sf_famous", texts: [
          " At dinner someone crosses the room to shake your hand — he grew up watching you on the news. You smile, and cannot place him.",
          " You start choosing where you eat, and whom you are seen with. That used to sound ridiculous to you."
        ] },
        { id: "sf_aging", texts: [
          " There is a band of white in your hair now, in the mirror. You leave it.",
          " You do the arithmetic: fewer years ahead than behind. It keeps you quiet for a while."
        ] },
        { id: "sf_young", texts: [
          " One rude remark still keeps you angry all day. You know it is a flaw. It will not be fixed this year.",
          " Some days you feel like you are living an older man's life on credit, waiting for his experience to arrive."
        ] },
        { id: "sf_calm", texts: [
          " For a stretch you want nothing. The light on the table crawls from one end to the other; you do not move.",
          " You finish what is in hand, one thing after another. No ideas, no ambition. Just finished."
        ] },
        { id: "sf_outsider", texts: [
          " You sit in the same room as always. The people in it have stopped counting you as one of theirs.",
          " You chose not to play their game. The price is that every single thing now has to be pushed alone."
        ] },

        /* ---------- 收束 close ---------- */
        { id: "cl_young", texts: [
          " Days like this burn one off the candle — and you still have so many left.",
          " Take it slow, you tell yourself. You have been saying \"take it slow\" for years now."
        ] },
        { id: "cl_mid", texts: [
          " A month with nothing happening is still your life.",
          " This is how the days actually go — not in what you got done, but in the stretches when you did nothing."
        ] },
        { id: "cl_old", texts: [
          " A whole life, most of the time, is spent exactly like this.",
          " You think: if it ended like this, it would not be so bad."
        ] },
        { id: "cl_gen", texts: [
          " Nothing worth remembering this month — which is, itself, something worth having.",
          " Time moves on; you move with it. This is not bad."
        ] },
        { id: "cl_scan", texts: [
          " You set the feeling down and get on with the month. Some things can only ripen on their own.",
          " Nothing has moved out there yet. You know \"not yet\" and \"never\" are not the same phrase."
        ] }
      ]
    }
  }
});
