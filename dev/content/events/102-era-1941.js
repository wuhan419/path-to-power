/* ============================================================================
 * CONTENT · events/102-era-1941.js
 * 时代：1941 世界大战 —— 参战、征兵、配给、战时债券、军工城市的罢工与骚乱。
 * 铁律见 docs/EVENT-WRITING-BRIEF.md。
 * ==========================================================================*/

POTUS.define("event", [

  /* ------------------------------------------------------------------------
   * 1) 珍珠港之后 —— 宣战（大事件，史实锚点 12/7）
   * ---------------------------------------------------------------------- */
  {
    id: "ww41_pearl", grade: "major", category: "crisis",
    valence: "bane", dyn: true,
    era: ["1941_WORLDWAR"], tierMin: 0, tierMax: 5, weight: 13, unique: true,
    month: 12, day: 7,
    title: "广播里说，这是一个遗臭万年的日子",
    body: "电台中午断了常规节目。珍珠港被袭，舰队损失惨重，总统要在夜里对全国讲话。\n" +
      "孤立主义一夜之间没了市场。本郡的征兵站门口，天没亮就排起了队——上一次他们躲着走。",
    brief: {
      lede: "一场你一直以为打不到家门口的战争，一夜之间变成了你不得不替它张罗的事。",
      known: [
        "之所以轮到你出面，是因为你是本地说得上话的人，征兵站和捐款委员会都缺一个「肯站台的名字」。",
        "昨天还被骂「鹰派」的主战声音，今天成了电台里的爱国常识。",
        "你选区里有刚成年的男孩，也有把儿子送去过一戰、如今死活不肯签字的母亲。",
        "宣战案要到国会表决，但地方的活儿——募兵、债券、配给——今晚就开始落到你头上。"
      ],
      rumor: [
        "有人说海军的损失被严重低估了，也有人说被夸大了好逼国会开战。",
        "有人说本地那家日裔开的杂货铺，明天就不会再开门了。"
      ],
      unknown: [
        "这场仗会打几年、会不会把你自己的儿子也卷进去。",
        "今晚你站得越前，将来若战争变得不得人心，你就被钉得越死。"
      ],
      terms: [
        { k: "孤立主义", v: "主张美国不卷入欧洲与亚洲战事的传统，珍珠港之后基本瓦解。" },
        { k: "战争债券", v: "政府向民众卖债筹军费，买债券在战时是爱国的公开表演。" }
      ]
    },
    choices: [
      {
        id: "rally", text: "连夜办募兵与债券晚会，把本地绑上战车",
        note: "把自己彻底交给这场战争。办成是战争英雄式的组织者，办砸或仗打久了就是「最积极送别人家孩子去死的人」。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.5 }, { src: "fac", key: "base", w: 0.3 }],
        stake: { ap: true, fav: true },
        outcomes: {
          crit: { body: "一晚招满两个连、卖出破纪录的债券。你成了战争动员的样板人物，华盛顿的都听说了这个郡的名字。",
            effects: { rep: 1.75, tier: 1, fac: { establishment: 12, base: 10, military: 10 }, flags: ["war_organizer"] } },
          ok: { body: "晚会很成功，年轻人一批批报名。你的名字和这场爱国热潮绑在了一起。",
            effects: { rep: 0.9, fac: { base: 8, establishment: 6, military: 6 } } },
          meh: { body: "来的人不少，报名的不多。你尽力张罗了，落一句「他挺热心」。",
            effects: { rep: 0.3, hp: -0.4, fac: { base: 3 } } },
          fail: { body: "你把调子起太高，一台晚会把本地有儿子的家庭全得罪了。报名没几个，怨气倒攒了一堆。",
            effects: { rep: -0.6, fac: { base: -8, military: -4 } } },
          critfail: { body: "晚会当晚空袭警报误响，人群踩踏伤了人。一夜之间，「某某的爱国晚会」成了本地最刺耳的短语。",
            effects: { rep: -1.25, hp: -0.6, fac: { base: -12, establishment: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "conscientious", text: "主战，但坚持替「良心拒服者」留一条活路",
        note: "既不当逃兵的同谋，也不当把人往死里送的推手。两头不讨好，但守住了一条线。",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.55 }],
        outcomes: {
          crit: { body: "你在一片「不报名就是叛国」的空气里，硬是把一条替教友和良心者开的口子写进了地方规章。人们恨不起来，也开始敬你三分。",
            effects: { rep: 1, fac: { church: 14, base: 6, military: -6 }, flags: ["conscience_keeper"] } },
          ok: { body: "你为不愿拿枪的人说上了话。骂声有，可教会和一批家庭记下了你的公道。",
            effects: { rep: 0.6, fac: { church: 8, military: -4 } } },
          meh: { body: "你提了「良心拒服」，被爱国声浪盖过去一半。做了一点，没做成。",
            effects: { rep: 0.2, fac: { church: 3, military: -2 } } },
          fail: { body: "在举国同仇的时刻你讲宽容，被贴上了「替懦夫说话」的标签。",
            effects: { rep: -0.6, fac: { base: -6, military: -8 }, flags: ["scandal_1"] } },
          critfail: { body: "有人把你「替拒服者开门」翻译成「他不支持打仗」。战时的这句话，足够毁掉一个人。",
            effects: { rep: -1, fac: { establishment: -10, military: -12, base: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "wait", text: "不冲在最前，也不拖后腿，先把眼前事办稳",
        base: 0.72, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你没抢着上电台，却把伤兵安置、军属帮扶这些不起眼的实事悄悄铺好了。仗打完，人们才想起谁一直在做事。",
            effects: { rep: 0.6, fac: { base: 6, military: 4 } } },
          ok: { body: "你既没当出头鸟，也没掉链子。稳过这一波。",
            effects: { rep: 0.2 } },
          meh: { body: "你保持低调，既没人夸你，也没人记你。",
            effects: { rep: 0.1 } },
          fail: { body: "在人人表忠心的时刻你太安静，被对手抓住做文章：「开战了他连个面都不露。」",
            effects: { rep: -0.4, fac: { establishment: -6, base: -3 } } },
          critfail: { body: "你的低调被解读成「等着看笑话」。本地报纸点名问你「这几天你在哪」，你没一个好答案。",
            effects: { rep: -0.7, fac: { base: -6, military: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 2) 军工订单与罢工 —— 后方也着火（1943，劳工/危机）
   * ---------------------------------------------------------------------- */
  {
    id: "ww43_plant", grade: "mid", category: "civil",
    valence: "risk", dyn: true,
    era: ["1941_WORLDWAR"], tierMin: 1, tierMax: 4, weight: 11,
    medium: ["print", "radio"],
    title: "造炮弹的厂子停了工",
    body: "军工厂的流水线停了一整天，前线等着这批零件。厂方说是「赤色分子捣乱」，工会说是「连轴转累死人」。\n" +
      "华盛顿来电：这场罢工绝不能过夜，你是本地唯一还能让两边都听两句的人。",
    brief: {
      lede: "战时罢工既是劳资纠纷，也是「通敌」的嫌疑——一句话就能把你两边都点着。",
      known: [
        "联邦来找你，是因为去年债券晚会你在这儿攒下的脸，工会和厂方都还认。",
        "厂方拿「国防生产法」压人，工会拿「工人也是人」顶回去，两边都有道理，也都有人等着给对方扣帽子。",
        "停产一天，前线的账就往本地人头上算一分。",
        "这厂里有大量新招的女工和黑人工人，他们要的东西和老技工不完全一样。"
      ],
      rumor: [
        "有人说厂里真有搞破坏的，也有人说厂方编这个来吓退工会。",
        "有人说上面已经打算派兵「接管」工厂，谈判只是走个过场。"
      ],
      unknown: [
        "帮哪边都会让另一边恨你，而不帮就是「战时袖手」。哪条路将来最贵，此刻看不清。",
        "这批停工会不会让某个「谁最能保障生产」的位置空出来。"
      ],
      terms: [
        { k: "国防生产法", v: "战时授权联邦管制工业与劳工关系的法律，用它可强制工厂满负荷生产。" }
      ]
    },
    choices: [
      {
        id: "settle", text: "居中斡旋：逼厂方让步，换工会立刻复工",
        note: "既不得罪生产，也不把人往死里逼。办成是调停者，两头都觉得被卖就是双输。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "labor", w: 0.35 }],
        cost: { ap: 2 }, stake: { fav: true },
        outcomes: {
          crit: { body: "你把加班上限、女工同工和「不轻易开除」写进备忘录，工会当天复了工。厂方不情愿，前线没断供，你成了罕见的「两边都欠他情」的人。",
            effects: { rep: 2, fav: 2, fac: { labor: 14, commercial: 6, base: 6 }, contact: { union_boss: 12 }, flags: ["shop_steward"] } },
          ok: { body: "谈成了个能接受的折中，机器重新转了起来。厂里认你「说了话算数」。",
            effects: { rep: 1.25, fac: { labor: 8, commercial: 3 } } },
          meh: { body: "你劝回了一半人，另一半磨了两天才复工。勉强算你斡旋有效。",
            effects: { rep: 0.4, hp: -0.8, fac: { labor: 3 } } },
          fail: { body: "你两头劝两头不落实，罢工多拖了三天。厂方怪你软弱，工会怪你偏袒，前线怪本地。",
            effects: { rep: -1.25, fac: { labor: -8, commercial: -8 }, flags: ["scandal_1"] } },
          critfail: { body: "你递出去的一份「工会保证复工」的书面承诺被人当成你「逼工会低头」的把柄，两边合伙把你卖了。",
            effects: { rep: -2, fac: { labor: -14, commercial: -6, base: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "harden", text: "站生产一边：施压工会立即复工，别让前线断货",
        note: "对上「保障生产」的胃口最灵。但战时对工人强硬，等于替「赤色」指控抬轿。",
        base: 0.6, mods: [{ src: "fac", key: "establishment", w: 0.4 }, { src: "fac", key: "military", w: 0.3 }],
        outcomes: {
          crit: { body: "你一句「战时不容停产」镇住了局面，流水线连夜重启。华盛顿记下了你这个「靠得住」的地方人。",
            effects: { rep: 1.25, tier: 1, fac: { establishment: 12, military: 8, labor: -12 } } },
          ok: { body: "你逼着工会先复工「回头再谈」。厂子转了，工人在心里给你记了一笔。",
            effects: { rep: 0.6, fac: { establishment: 8, military: 4, labor: -8 } } },
          meh: { body: "你说了硬话，可工人半信半疑地回了岗，暗地里还在骂。",
            effects: { fac: { establishment: 4, labor: -5 } } },
          fail: { body: "你替厂方压人，工人根本不理，罢工拖成了本地丑闻，报上说你「替资本当打手」。",
            effects: { rep: -1.25, fac: { labor: -14, base: -6 } } },
          critfail: { body: "复工的当天出了「事故」，有人在车间留下了写着你名字的字条。「破坏分子」的帽子满天飞，你也成了靶子。",
            effects: { rep: -2, hp: -0.8, fac: { labor: -16, base: -8 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "worker", text: "站工人一边：先争安全与加班上限，再谈复工",
        base: 0.48, mods: [{ src: "fac", key: "labor", w: 0.45 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你带着工会的条件直接顶到厂方，还真争下了安全条款。工人把你当「自己人」，这份情在街头能存很多年。",
            effects: { rep: 1.5, fac: { labor: 16, base: 8, commercial: -10 }, contact: { union_boss: 10 } } },
          ok: { body: "你先替工人争了两句，复工顺理成章。工会领你的情，厂方记你的账。",
            effects: { rep: 0.8, fac: { labor: 10, commercial: -6 } } },
          meh: { body: "你替工人说了话，条件却只落了一半。两头都说你尽力，但都不满意。",
            effects: { rep: 0.2, fac: { labor: 4, commercial: -3 } } },
          fail: { body: "你在战时替罢工说话，被扣上「不爱国」的帽子，联邦的来电变成了质问。",
            effects: { rep: -1, fac: { establishment: -10, military: -6, labor: 6 } } },
          critfail: { body: "你替工人站台的照片被印上「煽动停产」的传单，对手把这张照片寄遍了每一个军属家庭。",
            effects: { rep: -1.75, fac: { establishment: -12, military: -10, base: -4 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 3) 征兵委员会 —— 谁的名字进名单（伦理/仕途）
   * ---------------------------------------------------------------------- */
  {
    id: "ww42_draft", grade: "mid", category: "career",
    valence: "bane", dyn: true,
    era: ["1941_WORLDWAR"], tierMin: 1, tierMax: 5, weight: 10,
    medium: ["print", "radio"],
    title: "你的笔，决定谁上船",
    body: "征兵委员会要给本地名额定缓免名单：谁家独子可以暂缓，谁家的孩子必须走。名单最后一栏签的是你。\n" +
      "桌上摊着两份材料：一位选区大户的求情信，和一个工头家四个儿子的档案——已经走了三个。",
    brief: {
      lede: "和平年代的偏心只是偏心，战年代的偏心是要用别人的命来还的。",
      known: [
        "让你签，是因为你在委员会里资历够，也因为出了事上面需要一个「本地人负责」的名字。",
        "缓免名额有限，签了谁、没签谁，都会在这条街上被传一辈子。",
        "大户的捐资助过你的选战，工头的儿子已经在名单上走了三个。"
      ],
      rumor: [
        "有人说大户家的小子其实身体有隐疾，缓免名正言顺。",
        "有人说委员会里早有人靠卖缓免条子发财，只是没人查。"
      ],
      unknown: [
        "今天被你勾掉的这个名字，会不会在某个将来帮过你的关键时刻。",
        "你签下去的这份名单，将来是「公正」的证据，还是「偏心」的罪证。"
      ],
      terms: [
        { k: "缓免", v: "因独子、身体、关键岗位等原因推迟或免除征兵。名额有限，谁得谁失极具争议。" }
      ]
    },
    choices: [
      {
        id: "fair", text: "定一套公开规矩：独子、身体、抽签，一视同仁",
        note: "把人情关在门外，也把自己关在了规矩里。机器会嫌你不懂事，但你的记录最干净。",
        base: 0.55, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你把规矩贴上了墙，大户的求情和穷人的眼泪走的是同一道门。名单没人满意，可没人挑得出你的错。",
            effects: { rep: 1.5, fac: { base: 8, military: 6, establishment: -6 }, flags: ["draft_fair"] } },
          ok: { body: "你按规矩签了，得罪了想走后门的人，但换来了「这人办名单不偏」的评价。",
            effects: { rep: 0.8, fac: { base: 4, military: 4, establishment: -3 } } },
          meh: { body: "规矩是立了，可执行里总有缝。你勉强维持了个「大体能看」。",
            effects: { rep: 0.2 } },
          fail: { body: "你硬按规矩办，把关键金主和上层全得罪了。名单公道，你的位子却开始晃。",
            effects: { rep: -0.6, fac: { establishment: -10, commercial: -8 } } },
          critfail: { body: "你的「一视同仁」被两边合起来咬：大户说你不懂事，军属说你把她们儿子往火里推。你成了这场不受欢迎战争的人肉挡板。",
            effects: { rep: -1.5, fac: { establishment: -10, base: -8, military: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "trade", text: "给大户留条子，工头家的份照送——战时也要有人脉",
        note: "现实政治：签一份不体面的名单，换一笔实打实的资源。代价是良心账和被发现的把柄。",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你巧妙地把人情藏进「身体原因」的措辞里，大户满意、拨款到位，工头家虽怨却没抓到你的实锤。",
            effects: { fun: 3.5, rep: 0.6, lev: 1, fac: { commercial: 10, establishment: 6 } } },
          ok: { body: "名单照大户的意思调了，献金也照来了。你既没落把柄，也没落骂名，只是夜里偶尔想起那个工头。",
            effects: { fun: 2.25, fac: { commercial: 6 } } },
          meh: { body: "你帮大户递了条子，可对方翻脸不认账，你白担了风险。",
            effects: { rep: -0.2, fac: { commercial: 2 } } },
          fail: { body: "工头在征兵站门口念出了他四个儿子的名字，问「凭什么是我家去」。所有人都知道你的签名。",
            effects: { rep: -1.25, fac: { base: -10, labor: -8 }, flags: ["scandal_1"] } },
          critfail: { body: "那份「身体原因」的假证明被翻了出来。战时替富户躲兵役，这是最容易让人上头的罪状。",
            effects: { rep: -2.25, fac: { base: -14, press: -8 }, flags: ["scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "recuse", text: "不签这份名单，把笔推给委员会另一个人",
        base: 0.66, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你把签名权推了出去，躲开了这摊浑水。名单照样有人签，锅照样有人背，而你没沾上。",
            effects: { rep: 0.6, hp: -0.5, fac: { establishment: 3 } } },
          ok: { body: "你没签。事情有人接手，你也就不用夜里想那四个儿子。",
            effects: { rep: 0.2 } },
          meh: { body: "你推了笔，可上面觉得你「关键时刻撂挑子」。这份名单没写你名字，你的档案里写了这一笔。",
            effects: { rep: -0.2, fac: { establishment: -4 } } },
          fail: { body: "你拒签被当成「摆架子」，委员会绕过你把事办了，出了乱子又回头怪你当初不担责。",
            effects: { rep: -0.8, fac: { establishment: -6, military: -4 } } },
          critfail: { body: "你撂挑子后名单出了问题没人负责，最后全推到你「当初不该推笔」上。躲了一圈，锅还是你的。",
            effects: { rep: -1.5, fac: { establishment: -8, military: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 4) 配给票与黑市 —— 小事（灰产/金钱）
   * ---------------------------------------------------------------------- */
  {
    id: "ww43_ration", grade: "minor", category: "shady",
    valence: "risk", dyn: true,
    era: ["1941_WORLDWAR"], tierMin: 0, tierMax: 3, weight: 9,
    medium: ["print", "radio"],
    title: "一沓没用完的糖票和肉票",
    body: "配给本发到每个人手上，可有人用不完，有人愿意出高价收。门路就一条：把「省下来」的票，转成钱。\n" +
      "这在本城不算大事——直到管配给的人开始数总数对不上。",
    brief: {
      lede: "战时倒卖配给票，赚的是爱国口号底下的那点差价。风险不在钱，在「被谁看见」。",
      known: [
        "你被卷进来，是因为你经手过一批配给本的发放，谁知道哪几家的票会「用不完」，你最清楚。",
        "倒卖本身有人干，问题是被查出来会被当成「发国难财」。",
        "你的社区里，有人真揭不开锅，也有人只是贪那点差价。"
      ],
      rumor: [
        "有人说配给办自己就在收票，只是不带你玩。",
        "有人说再有一两桩案子要办，正缺一个能交上去的名字。"
      ],
      unknown: [
        "这笔小钱会不会在你将来「清廉」的路上留一道说不清的印子。",
        "如果你不赚，谁赚——会不会是对手赚，然后拿这来查你。"
      ],
      terms: [
        { k: "配给票", v: "战时对糖、肉、汽油等紧缺物资按人头限量发放的凭证，私下买卖违法。" }
      ]
    },
    choices: [
      {
        id: "deal", text: "收几家的余票，转手给饭馆赚差价",
        note: "小额快钱。赚得不多，但一旦被人盯上，就是「发国难财」现成的靶子。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你把余票干净地转了几手，赚了一笔小财，还没碰着查的人。你学会了一件事：战时的漏洞就是钱。",
            effects: { fun: 2, lev: 1, fac: { commercial: 4 } } },
          ok: { body: "票换成了钱。数目不大，但来路不清白，你自己心里有数。",
            effects: { fun: 1, flags: ["shady_start"] } },
          meh: { body: "转了两手砸在手里，票没卖出去，还落了一身说不清。",
            effects: { rep: -0.4 } },
          fail: { body: "配给办数出总数对不上，第一个问的就是发本子的人——也就是你。",
            effects: { rep: -1.5, fac: { base: -6 }, flags: ["scandal_1"] } },
          critfail: { body: "你被单拎出来当成「发国难财」的典型。一张你的照片上了报纸，标题是「战争债券的另一面」。",
            effects: { rep: -3, fac: { base: -10, press: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "report", text: "不赚，把这条黑市线悄悄报给配给办",
        note: "把别人的漏洞换成你的清名和一个人情。",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你递上去的线索破了个案子，配给办记你一功，坊间还传开了「他不沾国难财」。两头都是你的。",
            effects: { rep: 2, fav: 2, fac: { establishment: 6, base: 5 } } },
          ok: { body: "你报了线，自己干净，也得了一句「这人靠得住」。",
            effects: { rep: 1.25, fac: { establishment: 4 } } },
          meh: { body: "你报了，可案子没人真办，你还在倒卖圈里落个「多嘴」的名。",
            effects: { rep: 0.4, fac: { commercial: -3 } } },
          fail: { body: "你报的线被反咬成「你才是最清楚内情的那个」。查黑市的查到了你头上。",
            effects: { rep: -1.5, fac: { base: -5 }, flags: ["scandal_1"] } },
          critfail: { body: "配给办顺着你报的线索倒查，发现你当初也经手过几本。你从举报人变成了嫌疑人。",
            effects: { rep: -2.75, fac: { base: -8, establishment: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "ignore", text: "不碰票，把该发的发下去就完事",
        base: 0.78, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你只管把本子规规矩矩发下去。邻居用不完的票你也不眼热。这份「不经手」的干净，日后救过你一命。",
            effects: { rep: 1.25, fac: { base: 4 } } },
          ok: { body: "你什么都没干，也什么都没惹上。战时里这就够了。",
            effects: { rep: 0.4 } },
          meh: { body: "你规规矩矩发了本子，别人却发了财。说不清是亏是赚。",
            effects: {} },
          fail: { body: "你的「公事公办」让等着走后门的人不痛快，暗地里传你「摆清高」。",
            effects: { fac: { commercial: -4 } } },
          critfail: { body: "你发了本子却没数清,总账对不上时,没人记得你只是经手——他们记得「是本子从他手上过的」。",
            effects: { rep: -2, fac: { establishment: -6, base: -4 } } }
        }
      }
    ]
  }
]);

POTUS.define("balance", {
  tagNames: {
    war_organizer: { name: "战争动员者", desc: "珍珠港后连夜办募兵与债券，冲在最前。", effect: "建制与军方好感大涨，但被绑在战争上，战若失人心你首当其冲。" },
    conscience_keeper: { name: "守良心门", desc: "战时替良心拒服者留了活路。", effect: "教会敬你，军方与鹰派对你有意见。" },
    shop_steward: { name: "车间调解人", desc: "在军工厂罢工里促成了复工与安全条款。", effect: "劳工与资方都欠你一分，是可复用的斡旋资本。" },
    draft_fair: { name: "征兵不偏", desc: "在缓免名单上立了公开规矩。", effect: "公信力与军方认可上升，但得罪了想走后门的金主。" }
  }
});
