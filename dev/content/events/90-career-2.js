/* ============================================================================
 * CONTENT · events/90-career-2.js
 * 仕途第二包：师徒、委员会暗战、选区重划、继任者战争、内阁征询、职业倦怠。
 * 与 60-progression.js 的「晋升节点」不同，这六个事件写的是晋升之间的
 * 「人的问题」：你靠谁上去、谁的地盘被动了、你还能撑多久。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 1) car2_mentor_offer：资深政客要收你为徒（T0-T2）
   * ==================================================================== */
  {
    id: "car2_mentor_offer",
    grade: "mid",
    category: "career",
    unique: true,
    valence: "boon", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 0, tierMax: 2,
    notFlags: ["mentor"],
    weight: 12,
    brief: {
      lede: "一位在本州说了三十年话的人，请你喝了这辈子最重要的一杯咖啡。",
      known: [
        "他外号「老板」。他倒下时没一个人反过他。",
        "他看上你是因为你还没欠任何人——他的人太老、太贵了。",
        "收了他的保护你就是「他的人」：投票、站队、提名，先问他。",
        "他给你两周，并且警告：不要跟任何人谈这次会面。"
      ],
      rumor: [
        "他上一个徒弟五年没在公开场合说过一句自己的话。",
        "检察官办公室有一箱写着他会所名字的档案。"
      ],
      unknown: [
        "他能替你挡多大的雨，哪天收回去。",
        "「他的人」三个字撕下来时带走多少皮肉。"
      ],
      terms: [
        { k: "保护伞", v: "资深政客替你挡事给资源，代价是效忠。" }
      ]
    },
    title: "「老板」要收你为徒",
    body: "他说他老了，需要一个「还记得自己为什么进来」的年轻人。翻译过来：他需要一双新的腿，你需要一把旧的伞。",
    choices: [
      {
        id: "accept",
        text: "拜入门下：接过这把伞",
        note: "从此党内有人替你说话，也替你决定。收益是真的，枷锁也是真的——而且锁匠是他。",
        base: 0.6,
        mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "他把你的名字放进了三个房间：拨款、提名、还有初选的电话会议。半年之内，两件你想办的事办成了，一件你反对的事他改了主意——那是他给你的见面礼。", effects: { rep: 1, fac: { establishment: 14 }, flags: ["mentor"] } },
          ok: { body: "保护伞撑开了。党部的电话开始回你，竞选的对账单上有人替你垫了款。他也开始打电话给你——多数在晚上。", effects: { rep: 0.6, fac: { establishment: 10 }, fav: 1, flags: ["mentor"] } },
          meh: { body: "伞是撑开了，但伞下的位置已经站了七个人。你排队等他的注意力，排了很久。", effects: { fac: { establishment: 6 }, flags: ["mentor"] } },
          fail: { body: "他收下了你的效忠，转头却把那个承诺过的位置给了别人。「下次」，他说。你学会了这个词的分量。", effects: { fac: { establishment: 3 }, fav: -1, flags: ["mentor"] } },
          critfail: { body: "你上船的第一个月，他的旧案被媒体重新翻起。你什么都没做——但你的名字第一次上报，是作为「他的人」。", effects: { rep: -0.8, fac: { establishment: -6, press: -4 }, flags: ["mentor", "scandal_1"] } }
        }
      },
      {
        id: "negotiate",
        text: "谈条件：只要指点，不要项圈",
        note: "硬气的中间路线。他这种人敬佩敢谈的人，也记住每一个敢谈的人。成败全看他那天的心情。",
        base: 0.4,
        mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "你把条件摊在桌上：指教要，命令不要。他盯了你半分钟，笑了。「像年轻时候的我。」你拿到了指点，没交出缰绳。", effects: { rep: 0.8, fac: { establishment: 8, base: 4 }, attr: { INT: 1, CUN: 1 }, contact: { fixer: 6 } } },
          ok: { body: "他没全答应，也没拒绝。你们的关系停在「他欣赏你」这一格——比项圈松，比路人近。", effects: { rep: 0.4, fac: { establishment: 5 }, attr: { CUN: 1 } } },
          meh: { body: "谈判变成了一场漫长的试探。你得到了一些含糊的善意，和一句「你还年轻」。", effects: { fac: { establishment: 3 } } },
          fail: { body: "「跟我谈条件的人，」他说，「一般还没挨过打。」会面提前结束。你出了门，雨还在下。", effects: { fac: { establishment: -4 } } },
          critfail: { body: "他把你的「不」讲成了故事，在三个饭局上讲了三遍：有个年轻人，以为自己是例外。你的傲慢成了他的谈资。", effects: { rep: -0.6, fac: { establishment: -8, base: -3 } } }
        }
      },
      {
        id: "decline",
        text: "谢绝：自己的名字自己挣",
        note: "干净，但慢。他不会报复你——他只会记住你，并且等。政治圈对说不的人有很好的记性。",
        base: 0.7,
        mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你的拒绝传开了。两个原本观望的基层组织主动找上你——他们等一个不肯拜码头的人等了很久。", effects: { rep: 0.6, fac: { base: 10, press: 4 }, attr: { INTG: 2 } } },
          ok: { body: "你守住了自己的名字。路会慢一点，但签名页上只有你。", effects: { fac: { base: 6 }, attr: { INTG: 1 } } },
          meh: { body: "没有人报复你，也没有人再约你喝咖啡。安静得像什么都没发生过。", effects: { fac: { base: 2 } } },
          fail: { body: "你注意到，党部的活动你开始收不到邀请了。没有通知，就是通知。", effects: { fac: { establishment: -5, base: 2 } } },
          critfail: { body: "三个月后，你的第一个法案在委员会被无声掐死。没有人承认跟他有关——也不需要承认。", effects: { rep: -0.4, fac: { establishment: -8, base: -2 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2) car2_committee_seat：委员会席位分配的暗战（T2+，minTenure 12）
   * ==================================================================== */
  {
    id: "car2_committee_seat",
    grade: "mid",
    category: "career",
    unique: true,
    valence: "boon", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 2, tierMax: 4,
    minTenure: 12,
    weight: 10,
    brief: {
      lede: "委员会名单下周定稿。你的名字还在铅笔那一栏。",
      known: [
        "法案在委员会出生也在委员会死，全体表决只是盖章。",
        "你在议会第一年没得罪任何人——这意味着谁都可以先得罪你。",
        "名单由党团领袖用铅笔写。橡皮在谁手里，全议会都知道。"
      ],
      rumor: [
        "金融委员会要空一位，头名正被罢免联署缠住。",
        "领袖想把流放地席位留给一个交易对象。"
      ],
      unknown: [
        "你走廊说的话，早传到领袖桌上了。",
        "冷板凳坐热要几年，对手这几年在干什么。"
      ]
    },
    title: "委员会名单下周定稿，你的名字还在铅笔那一栏",
    body: "权力机关的第一课：你的名字值多少，取决于别人愿意用橡皮擦掉谁。分配季开始了。",
    choices: [
      {
        id: "lobby_hard",
        text: "全力活动：把名字写进黄金席位",
        note: "去敲门、去表态、去许诺。他们会记住你的胃口——好的委员会喜欢有野心的人，也提防有野心的人。",
        base: 0.4,
        mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "establishment", w: 0.3 }],
        outcomes: {
          crit: { body: "你在最后一晚敲对了那扇门：金融委员会。两天后名单公布，铅笔字成了钢笔字，你的名字在第三行。捐款人的电话比贺电来得还快。", effects: { rep: 2, fac: { establishment: 12, commercial: 8 }, fav: 2 } },
          ok: { body: "你进了金融委员会——最末一位。末位意味着最脏的活和最少的镜头，但也意味着你的脚进了门。", effects: { rep: 1.25, fac: { establishment: 8, commercial: 4 } } },
          meh: { body: "你活动了一整周，换到一个不好不坏的席位。有人提醒你：知道分寸的人走得更远。", effects: { rep: 0.6, fac: { establishment: 4 } } },
          fail: { body: "你的活动被人记下了账。名单公布，你在流放地——公用事业委员会。文件从那里过。", effects: { rep: -0.6, fac: { establishment: -4 } } },
          critfail: { body: "你为那个席位许的诺，被对手一字不差地捅给了报纸：「新科议员上岗一周，交易清单先到」。你在名单公布前就被除名了。", effects: { rep: -1.5, fac: { establishment: -8, press: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "take_exile",
        text: "主动去接没人要的冷板凳",
        note: "流放地里没有敌人，只有等待。把没人肯碰的听证和文件做透——三年后，全议会只有你懂那一块。",
        base: 0.65,
        mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你在公用事业委员会埋头十个月，写出一份全州第一份像样的费率报告。听证会上，连对方党的人都引用你的数字。领袖在走廊里拍你的肩：明年有你的位置。", effects: { rep: 1.5, fac: { establishment: 8, press: 6 }, attr: { INT: 2 } } },
          ok: { body: "冷板凳坐住了。你成了那摊烂账唯一看得懂的人——无聊，但没人能绕开你。", effects: { rep: 0.8, fac: { establishment: 4 }, attr: { INT: 1 } } },
          meh: { body: "你把冷板凳坐出了温度，可惜观众不多。政治里最难熬的就是这种正确。", effects: { rep: 0.4, attr: { INT: 1 } } },
          fail: { body: "你埋头苦干了一年，年底重排名单——你的席位原封未动。你懂了那摊事，但没人因此需要你。", effects: { rep: -0.4 } },
          critfail: { body: "你接手的那个委员会，正埋着一笔没人想被粘上的旧账。你翻文件的第五个月，审计署进驻了——查的就是你签字经手的部分。", effects: { rep: -1.25, fac: { establishment: -4 }, flags: ["investigation_open"] } }
        }
      },
      {
        id: "defer",
        text: "公开表态：一切听党团安排",
        note: "把分配权原样奉还给领袖。这一年你什么都要不到，但下一年的名单上，领袖的铅笔会先想起谁。",
        base: 0.7,
        mods: [{ src: "fac", key: "establishment", w: 0.4 }],
        outcomes: {
          crit: { body: "你的「听安排」在党团会议上被领袖当众表扬。名单公布，你拿到一个中游席位，外加一句走廊里的承诺：下次优先。", effects: { rep: 0.8, fac: { establishment: 12 }, fav: 1 } },
          ok: { body: "你拿到一个中游席位，不好不坏。领袖的办公室记住了你的号码。", effects: { fac: { establishment: 7 } } },
          meh: { body: "「懂事」的奖赏是一个更冷的冷板凳。至少没人对你有意见——包括对你没有任何印象。", effects: { fac: { establishment: 3 } } },
          fail: { body: "你把姿态放得太低。分配季结束时，连你自己党的新人都在会上打断你发言。", effects: { rep: -0.6, fac: { establishment: -3, base: -3 } } },
          critfail: { body: "你的顺从被写进一篇著名的专栏：「议会里最安静的一批人，正在替所有人做决定——通过不反对」。你成了文中的一个匿名例子，所有人都猜得出是谁。", effects: { rep: -1, fac: { press: -6, base: -5 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 3) car2_redistrict：选区重划动了你的地盘（T3+，voters 池）
   * ==================================================================== */
  {
    id: "car2_redistrict",
    grade: "major",
    category: "career",
    unique: true,
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 3, tierMax: 5,
    weight: 11,
    brief: {
      lede: "新选区地图挂上墙的那一刻，你十年的地盘被一条曲线切走了三分之一。",
      known: [
        "重划不是地图作业，是战争：画笔在谁手里，下个十年就归谁。",
        "你最铁的三个县被划进三个不同选区——这叫被「蟹切」。",
        "地图委员会里坐着你党的人。他们知道这一刀切在你身上。",
        "你两条路：州最高法院申诉，或公民公投推翻。都要钱和时间。"
      ],
      rumor: [
        "这一版地图是给某个家族二代清场用的，你只是挡路。",
        "对面有个年轻红人本来要硬碰你，现在他的团队在庆祝。"
      ],
      unknown: [
        "铁杆选民被切走后还认不认你的名字。",
        "投这票的人，当初在谁饭桌上坐过。"
      ]
    },
    title: "他们把你的地盘画没了",
    body: "新的选区地图公示了。你花了十年织起来的票仓，被一条曲线从中间剪开。选民池会自动重算——在那之前，你还有一个窗口期可以反应。",
    choices: [
      {
        id: "fight",
        text: "公开开战：把这个案子打到法院和公投",
        note: "把地图变成新闻：谁是受害者、谁画的线。赢了你的地盘回来，输了你的名字会跟「输」绑很久。选民池会跟着判决翻动。",
        base: 0.4,
        mods: [{ src: "attr", key: "INT", w: 0.3 }, { src: "fac", key: "press", w: 0.3 }, { src: "attr", key: "INTG", w: 0.2 }],
        outcomes: {
          crit: { body: "你的团队找到了画图公司的邮件：有人白纸黑字写着「把他的三个县切开」。法院采纳，地图作废重画。你拿回了地盘，还多拿了一个全国性的名声。", effects: { rep: 1.5, fac: { press: 10, base: 8, establishment: -6 }, voters: { diehard: 2500, warm: 4000 }, flags: ["car2_map_foe"], count: { wrath_establishment: 12, wrath_opposition: 8 } } },
          ok: { body: "判决下来：部分重画。两个县回来了，第三个永远留在了别的选区。够了——你的席位保住了。", effects: { rep: 0.9, fac: { press: 6, base: 4 }, voters: { diehard: 800, warm: 1500 }, count: { wrath_establishment: 8 } } },
          meh: { body: "法院不受理，公投联署差了一截。但你把「被切的在任者」打成了悲情牌，一部分被切走的选民反而更死心塌地。", effects: { rep: 0.4, voters: { diehard: 600, warm: -800 } } },
          fail: { body: "诉讼拖过了登记截止日，公投钱烧完了。地图生效。你的选民在新地图里醒来，发现彼此不再是一家人。", effects: { rep: -0.7, fac: { base: -6 }, voters: { diehard: -1200, warm: -3000 }, flags: ["car2_map_foe"] } },
          critfail: { body: "你的申诉材料里混进了一份来源不干净的内部文件。案子没输在地图上，输在了你的程序上——地图生效，你还搭上了「不择手段」的名声。", effects: { rep: -1.25, fac: { press: -8, establishment: -8 }, voters: { diehard: -800, warm: -3500, oppose: 1500 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "submit",
        text: "吞下这口气：在新地图里重新竞选",
        note: "地图是十年期的，怒气是三个月期的。认清边界、搬动办公室、重新挨家敲门——狼狈，但活着。",
        base: 0.7,
        mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "fac", key: "establishment", w: 0.2 }],
        outcomes: {
          crit: { body: "你用了六个月跑遍新划进来的每一个县。选举日夜里，新选民给你的票比老选民还多——他们第一次被认真对待，就记住了你。", effects: { rep: 0.9, fac: { establishment: 6, base: 4 }, voters: { diehard: 1000, warm: 3500 } } },
          ok: { body: "你赢了，但赢得辛苦。新的选区认识了你，代价是老选区的人觉得你变了。", effects: { rep: 0.6, voters: { diehard: -400, warm: 2000 } } },
          meh: { body: "你保住了席位。把愤怒咽下去的那口气，至今还在胃里。", effects: { rep: 0.2, voters: { diehard: -600, warm: 800 } } },
          fail: { body: "新地图就是新地图：陌生的县、陌生的机器、陌生的对手。你险胜，得票从来没这么难看过。", effects: { rep: -0.4, voters: { diehard: -900, warm: -1200 } } },
          critfail: { body: "你在新选区的第一场竞选就输了。败选夜你对着旧地图坐了很久——那上面你的名字还写着三个县。", effects: { rep: -1, fac: { base: -8 }, voters: { diehard: -1500, warm: -4000, oppose: 1000 } } }
        }
      },
      {
        id: "deal",
        text: "去交易：用选民的县，换委员会的椅子",
        note: "最政治的一个选项：地图改不了，就把它变成筹码。你会得到实权，也会永远失去那些替你敲过门的县。选民池会记住被卖掉的每一个人。",
        base: 0.5,
        mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "fac", key: "establishment", w: 0.3 }],
        outcomes: {
          crit: { body: "你跟地图委员会的人关起门谈了两个小时。地图照旧，你拿到了拨款委员会的一个席位和一笔未来的竞选承诺。离开房间时，双方都没笑。", effects: { rep: 0.7, fac: { establishment: 14, commercial: 6 }, fav: 2, voters: { diehard: -600, warm: -2000 }, flags: ["car2_map_deal"] } },
          ok: { body: "交易成了：地图不动，你的位子换成一个像样的委员会。老选民在报纸上问你怎么不吭声——你没回。", effects: { rep: 0.2, fac: { establishment: 10 }, voters: { diehard: -800, warm: -2500 }, flags: ["car2_map_deal"] } },
          meh: { body: "他们要的价比你预想的高。你拿到了一半的承诺，付出的是全部的沉默。", effects: { fac: { establishment: 6 }, fav: -1, voters: { diehard: -1000, warm: -2000 } } },
          fail: { body: "你以为在交易，其实在被清场。地图生效，承诺的委员会给了别人——「名单还没最终定」，他们说。", effects: { rep: -0.7, fac: { establishment: -6, base: -5 }, voters: { diehard: -1000, warm: -3000 } } },
          critfail: { body: "饭局上有人带了录音。三个月后，那段「用三个县换一把椅子」的对话出现在调查记者的播客里，一句没删。", effects: { rep: -1.5, fac: { establishment: -10, base: -10, press: -8 }, voters: { diehard: -2000, warm: -4000, oppose: 2500 }, flags: ["scandal_3", "car2_map_deal"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 4) car2_succession：老板宣布退休——继任者战争（flags: mentor）
   * ==================================================================== */
  {
    id: "car2_succession",
    grade: "major",
    category: "career",
    unique: true,
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 1, tierMax: 4,
    flags: ["mentor"],
    weight: 10,
     brief: {
      lede: "「老板」要退了，你是两个继任人选之一——他叫你来是看你怎么做。",
      known: [
        "他的机器只剩一口气：人脉、名单、席位，同一周全交。",
        "两个候选人：你，和一个更老、更听话的人。他还没选。",
        "三天内你接的电话全是试探：你争、等、还是让。",
        "他还在位。逼太紧，他随时可以让两个人都拿不到。"
      ],
      rumor: [
        "他的体检比公开的严重，「退休」可能是体面说法。",
        "另一人手里有份名单——这些年进出他门口的人和钱。"
      ],
      unknown: [
        "他要的是机器延续还是体面解散。",
        "你打的电话明天以什么版本回到他耳朵里。"
      ],
      terms: [
        { k: "机器", v: "以大佬为中心的组织网络，可继承也可解体。" }
      ]
    },
    title: "老板要退休了，你是两个继任人选里的一个",
    body: "他要退了，而你是他两个答案里的一个。这一周你怎么做，决定你是继承机器、辅佐机器，还是目送机器拆掉你的梯子。",
    choices: [
      {
        id: "claim",
        text: "争：这个席位我要了",
        note: "最像他年轻时的一次表态——他欣赏野心，也最清楚野心的味道。风险是另一个候选人手里的那份名单，和你自己台阶上踩过的每一道印。",
        base: 0.4,
        mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你没有等。你在他宣布的当晚就打了三十七个电话，天亮前山头过半站到你身后。他听完汇报只说了一个字：「快。」名单交到了你手上。", effects: { tier: 1, rep: 1.25, fac: { establishment: 14 }, fav: 2, flags: ["car2_heir"], forget: [] } },
          ok: { body: "你赢了席位，但赢得不算漂亮：他交出名单时只交了一半，另一半跟另一派做了告别人情。", effects: { tier: 1, rep: 0.9, fac: { establishment: 10 } } },
          meh: { body: "你坐上了那个位置，可机器的老人看你的眼神变了：从前你是「他的人」，现在你是「那个抢位置的人」。", effects: { tier: 1, rep: 0.4, fac: { establishment: 5, base: -4 } } },
          fail: { body: "你出手快，但对方出手准。名单上你的那一栏——那笔你以为没人记得的旧账——出现在了投票前夜。", effects: { rep: -0.7, fac: { establishment: -8 }, flags: ["scandal_2"] } },
          critfail: { body: "你逼得太紧，他临时改了主意：谁都不给。他退选声明里那句「我最遗憾的，是有人把等待当成了妨碍」——全州都读得懂。", effects: { rep: -1, fac: { establishment: -12, base: -6, press: -4 } } }
        }
      },
      {
        id: "back_heir",
        text: "让：辅佐另一个人，保住机器",
        note: "把席位让出去，把机器留下来。辅臣的位置更安全、更长久——前提是你辅佐的人记得你为什么让。",
        base: 0.65,
        mods: [{ src: "fac", key: "establishment", w: 0.3 }, { src: "attr", key: "CUN", w: 0.2 }],
        outcomes: {
          crit: { body: "你退后一步的姿势漂亮极了。新主坐上席位，你接过机器的日常——名单、电话、和每周四的早餐。三个月后所有人都明白：谁真正在管事。", effects: { rep: 0.7, fac: { establishment: 12 }, fav: 3, flags: ["car2_heir"] } },
          ok: { body: "机器完整地交了班，你是交接仪式上站在新主旁边的那个人。老人们谢了你。", effects: { rep: 0.3, fac: { establishment: 9 }, fav: 1 } },
          meh: { body: "你辅佐的人赢了，可他带来的自己人一周比一周多。你的电话还能打通，只是越来越没人回。", effects: { fac: { establishment: 4 } } },
          fail: { body: "新主上任第一百天，把你的办公室换到了走廊尽头。让位的账，没人打算认。", effects: { rep: -0.4, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "他在当选后启动了「机器现代化」：名单数字化、关系扁平化、老人退休化。翻译过来就是——你退休化。", effects: { rep: -0.9, fac: { establishment: -10, base: -6 }, flags: ["fallen"] } }
        }
      },
      {
        id: "ask_him",
        text: "先去问他：您到底想要什么",
        note: "三十七个电话都不如这一趟。三十年来没人这么问过他——所有人都只问他要东西。",
        base: 0.55,
        mods: [{ src: "attr", key: "INTG", w: 0.3 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "那个下午他讲了三个小时：哪些钱不能碰，哪些人只能用一次，哪个选区他欠了三十年的债。最后他说：「名单给你。别学我——学我走不到你那一步。」", effects: { rep: 1, fac: { establishment: 12, base: 4 }, attr: { CUN: 1, INTG: 1 }, flags: ["car2_heir"] } },
          ok: { body: "他没直接给答案，但给了一句足够的话：「争的人我见过太多，问到点子上的，你是第一个。」名单最后还是给了你——连同他没说完的那半句忠告。", effects: { rep: 0.7, fac: { establishment: 8 }, flags: ["car2_heir"] } },
          meh: { body: "谈话很愉快，结论很含糊。他祝你好运——像对所有告别的人那样。", effects: { rep: 0.2 } },
          fail: { body: "「我想要什么？」他冷笑，「我想要你们俩都滚，好让我看看这个山头离了我会怎样。」你空手出了门。", effects: { fac: { establishment: -4 } } },
          critfail: { body: "你的探望被对手讲成了「逼宫探病」。报纸标题：《老人还在医院，门口已开始排队》。他的病房从此不再接待你。", effects: { rep: -0.9, fac: { establishment: -10, press: -5 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 5) car2_cabinet_call：内阁任命征询（T3+）+ 余波幕 car2_cabinet_after
   * ==================================================================== */
  {
    id: "car2_cabinet_call",
    grade: "major",
    category: "career",
    unique: true,
    valence: "boon", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 3, tierMax: 5,
    minTenure: 24,
    weight: 9,
    brief: {
      lede: "过渡团队来电：当选人想跟你聊一个部。",
      known: [
        "征询不等于任命——他们同时在聊四个人。",
        "两个部在桌上：一个管钱上镜，一个管档案陵园。",
        "冷衙门没人盯预算，反而可以安静做成事。",
        "进入名单当天，你的党、选区、捐款人全部会打来。"
      ],
      rumor: [
        "热衙门已有内定，你是凑数的。",
        "冷衙门上一任靠档案当上了多数党领袖。"
      ],
      unknown: [
        "六个月后任命是政绩还是无人记得。",
        "接受就意味着离开选区，交接给外人。"
      ],
      terms: [
        { k: "冷衙门", v: "媒体关注度和预算权限都极低的部门。" }
      ]
    },
    title: "他们在物色部长：你的电话响了",
    body: "新政府的过渡团队在筛人。桌上有两个部：一个烫手，一个冷清。任命轨道的高光时刻——也可能是被礼貌地放进陈列柜的时刻。",
    choices: [
      {
        id: "hot_seat",
        text: "争取那个烫手的部",
        note: "聚光灯、预算、和每一天的战场。这种位置造就部长，也烧掉部长——取决于头一百天。",
        base: 0.4,
        mods: [{ src: "attr", key: "INT", w: 0.3 }, { src: "fac", key: "establishment", w: 0.3 }, { src: "attr", key: "CUN", w: 0.2 }],
        outcomes: {
          crit: { body: "你进了那个部。宣布那天，你的名字进了全国每一份报纸的第二段——第一段永远是当选人的。六个月的实况，留给时间去写。", effects: { tier: 1, rep: 1.5, fac: { establishment: 12, press: 8 }, flags: ["car2_cabinet_hot"] } },
          ok: { body: "任命宣布：你接下那个烫手的部。祝贺电话从下午两点响到深夜十一点。", effects: { tier: 1, rep: 1, fac: { establishment: 10 } } },
          meh: { body: "你拿到了任命——副的。正部长是平衡各方的人选，你是「专业保障」。也好：功劳轮不到你，锅也轮不到你。", effects: { rep: 0.6, fac: { establishment: 6 } } },
          fail: { body: "征询了三轮，最后电话还是打给了别人。官方说法是「时机」。你的名字在名单上待了十九天——什么也没换来。", effects: { rep: -0.4, fac: { establishment: -5 } } },
          critfail: { body: "征询期间，你选区的桩脚把你的「要走」传成了「已定」，选区服务瘫痪了两周。任命没来，报纸先写了你的空房子。", effects: { rep: -0.9, fac: { establishment: -6, base: -8 }, voters: { warm: -1500 } } }
        }
      },
      {
        id: "cold_seat",
        text: "要那个冷衙门：没人盯的地方",
        note: "所有人都以为这是被流放。档案、人事、预算的暗线都在冷衙门里——前提是你熬得住没人记得你的那几年。",
        base: 0.6,
        mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你要了那个所有人都同情的部。当选人在电话里沉默了两秒：「有意思的选择。」——后来你才知道，就是这两秒让他决定信任你。", effects: { tier: 1, rep: 0.9, fac: { establishment: 8 }, attr: { INT: 3 }, flags: ["car2_cabinet_cold"] } },
          ok: { body: "冷衙门的任命没人抗议，因为没人在乎。你搬进那间办公室，档案柜比人多。", effects: { tier: 1, rep: 0.4, fac: { establishment: 5 }, attr: { INT: 2 }, flags: ["car2_cabinet_cold"] } },
          meh: { body: "你上任了。报纸用了七个字介绍你的新职务，其中三个是标点。", effects: { rep: 0.2, flags: ["car2_cabinet_cold"] } },
          fail: { body: "你要冷衙门的消息走漏，被对手写成了「此人已无野心」。还没上任，你的政治讣告先写好了。", effects: { rep: -0.3, fac: { establishment: -4, base: -3 } } },
          critfail: { body: "冷衙门也不干净：你接手的第三个月，发现上一任埋着一笔消失的专项款。现在它是你的了——问题也是。", effects: { rep: -0.9, flags: ["investigation_open", "car2_cabinet_cold"] } }
        }
      },
      {
        id: "decline",
        text: "婉拒：留在自己的一亩三分地",
        note: "任命是别人给的，选区是自己的。拒绝会让一部分人永远不再打给你——也会让另一部分人永远记住你。",
        base: 0.7,
        mods: [{ src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你拒绝了，理由只有一句：「我的选区刚经历一场灾难/一场选举，我不能此刻走。」这段话后来被当选人在演讲里引用——作为「什么是责任感」的例子。", effects: { rep: 0.9, fac: { base: 10, press: 4 }, attr: { INTG: 2 } } },
          ok: { body: "你留在了原地。选区的人知道了你拒绝过什么——这种事瞒不住，也不必瞒。", effects: { rep: 0.4, fac: { base: 7 }, voters: { diehard: 400, warm: 800 } } },
          meh: { body: "电话那头说「理解」，语气里没有理解。你回到自己的办公室，一切照旧。", effects: { fac: { base: 3 } } },
          fail: { body: "婉拒的第二天，你的两个法案在委员会停摆。理由没说，理由也不用说。", effects: { rep: -0.4, fac: { establishment: -8 } } },
          critfail: { body: "你的拒绝被写成了姿态，你的留任被写成了天花板。四年后你想起这个电话，是在另一个更冷的职位上。", effects: { rep: -0.7, fac: { establishment: -10, base: -4 } } }
        }
      }
    ]
  },

  {
    id: "car2_cabinet_after",
    grade: "minor",
    category: "career",
    unique: true,
    valence: "boon", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 3, tierMax: 5,
    weight: 8,
    after: { id: "car2_cabinet_call", minMonthsAfter: 6, maxMonthsAfter: 18 },
    any: [{ flags: ["car2_cabinet_hot"] }, { flags: ["car2_cabinet_cold"] }],
    brief: {
      lede: "任命的蜜月期是六个月。今天是第七个月的第一天。",
      known: [
        "新鲜感过了，该出实绩，否则你的名字进「待优化」。",
        "这份工作实况：日程表、僚属、当选人记得你的方式。",
        "选区事务在堆积，桩脚只来聊过一次天气。"
      ],
      rumor: [
        "改组名单上有你的部门——要合并。",
        "当选人私下问了两次：「那个人在干什么？」"
      ],
      unknown: [
        "这份任命最终是动词还是注脚。",
        "你的选区还给你留着多宽的路。"
      ]
    },
    title: "任命过了半年，到了清账的时候",
    body: "半年前的那通电话把你带到了这里。现在是清账的日子：这份工作比你以为的好，还是比你以为的冷。",
    choices: [
      {
        id: "double_down",
        text: "加码：把这份差事做成自己的山头",
        note: "蜜月期之后才见真章：熬过第七个月的人，才轮得到谈「政绩」两个字。",
        base: 0.55,
        mods: [{ src: "attr", key: "INT", w: 0.3 }, { src: "fac", key: "establishment", w: 0.2 }],
        outcomes: {
          crit: { body: "你用一个谁都没在意的试点项目做出了全州瞩目的结果。冷板凳定律再次生效：没人盯的地方，做成事全是你的。", effects: { rep: 5, fac: { establishment: 8, press: 6 } } },
          ok: { body: "你把部门理顺了，上面记下了你的名字——不是聚光灯式的记，是「可靠」的记。", effects: { rep: 2.5, fac: { establishment: 6 } } },
          meh: { body: "又一年平稳。平稳在部长任期里算优点，在野心词典里算病。", effects: { rep: 0.8 } },
          fail: { body: "你推的方案被预算办公室砍了一半。你的部还在，你的方案没了。", effects: { rep: -1.5, fac: { establishment: -3 } } },
          critfail: { body: "第七个月的听证会成了你的滑铁卢：你没答上来的三个数字，第二天上了三个版面。", effects: { rep: -4, fac: { press: -8, establishment: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "eye_exit",
        text: "铺后路：盯住选区那条退路",
        note: "任命是租来的，选区是买断的。每两周回去一次，桩脚的咖啡比部里的咖啡重要。",
        base: 0.7,
        mods: [{ src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你把回家的航班排成了惯例。部里笑你「通勤部长」，直到选举年大家才发现：唯一在选区还活着的名字是你。", effects: { rep: 2.5, fac: { base: 8 }, voters: { diehard: 500, warm: 1200 } } },
          ok: { body: "选区的桩脚重新热络起来。你两边跑，两边都还在。", effects: { rep: 1.25, fac: { base: 5 }, voters: { warm: 600 } } },
          meh: { body: "回家的频率维持住了，仅此而已。选区的人客气，客气得让人心慌。", effects: { fac: { base: 2 } } },
          fail: { body: "部里的会议不放你走，选区的酒会等不到你来。两头都开始有人摇头。", effects: { rep: -1.5, fac: { base: -5, establishment: -3 } } },
          critfail: { body: "你「人在心不在」的实况被僚属捅给了记者：《部长先生的下一份工作》。当选人看完只问了一句：他想走？", effects: { rep: -3, fac: { establishment: -8, press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 6) car2_burnout：职业倦怠（cond: hp < 40）
   * ==================================================================== */
  {
    id: "car2_burnout",
    grade: "mid",
    category: "career",
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 0, tierMax: 5,
    cond: function (G) { return G.hp < 40; },
    weight: 12,
    brief: {
      lede: "今天你在停车场坐了四十分钟，因为想不起为什么要下车。",
      known: [
        "连续几个月每天睡四小时，靠咖啡和惯性运转。",
        "身体替你决定：手抖、走神、叫错捐款人的名字。",
        "未来三十天的日程没有一个空格留给「没有别人」。",
        "这圈子里「累」没人同情：一百人排队想替你累。"
      ],
      rumor: [
        "某前任偷偷住过两次疗养院，保密级国务。",
        "对手注意到你在会场外深呼吸——没有同情只有日程。"
      ],
      unknown: [
        "你的身体哪天以什么方式替你按停。",
        "退半步让出去的东西被保管还是被分掉。"
      ]
    },
    title: "你累到在停车场坐了四十分钟不想下车",
    body: "你的身体先于你的日程表提出了动议。是硬撑，是退半步，还是把这件事交给一个可以信任的人——必须选一个。",
    choices: [
      {
        id: "push",
        text: "硬撑：谁不是这么过来的",
        note: "不认。日程照旧，咖啡加倍。撑过去它是传说，撑不过去它是病历——你的身体会替你选。",
        base: 0.5,
        mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你撑住了。某个疲惫到极点的深夜，你居然思路空前地清晰，谈成了一件搁置半年的事。政治机器里真的有人是铁打的。", effects: { rep: 1.25, fac: { establishment: 5 } } },
          ok: { body: "你撑过去了这一季。代价是体检报告上多了两个向上的箭头。", effects: { rep: 0.4 } },
          meh: { body: "撑着，仅仅撑着。所有事都在做，没有一件事做得像样。", effects: { rep: -0.2 } },
          fail: { body: "你在一次直播连线里有一秒钟完全空白。一秒钟够剪辑，不够上新闻——但你的团队都看见了。", effects: { rep: -0.8, fac: { press: -3 } } },
          critfail: { body: "你在全体会议上当众晕倒。醒来时病房里有两束花、一份声明草稿，和一个已经在代理你职务的人。", effects: { rep: -2, fac: { establishment: -6, press: -4 } } }
        }
      },
      {
        id: "step_back",
        text: "退半步：以「家庭原因」减少露面半年",
        note: "公开的说法永远得是家庭原因。你让出来的台面会被别人占——半年后回来，位置和体重都会不一样。",
        base: 0.7,
        mods: [{ src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "半年后你回来了。睡了整觉的人看事情的清晰度，是熬夜的人假装有的那种清晰度的三倍。有人开始说：他好像换了一个人——好的那种。", effects: { rep: 0.4, fac: { base: 4 }, attr: { INT: 1 }, flags: ["car2_step_back"] } },
          ok: { body: "你休息了，喘匀了。位置还在，虽然边上多了两张新面孔。", effects: { rep: -0.2, flags: ["car2_step_back"] } },
          meh: { body: "这半年安静得可怕。没有坏消息，也没有消息。", effects: { fac: { base: -3 }, flags: ["car2_step_back"] } },
          fail: { body: "你让出来的摊子被分得干干净净。回来那天，你的办公室搬到了小的一间。", effects: { rep: -1, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "「家庭原因」的半年里，你的选区被对手跑了一遍，你的捐款人被同行拜访了一遍。你回来了，回的是一个空座位。", effects: { rep: -1.5, fac: { base: -8, establishment: -6 }, voters: { warm: -1200 }, flags: ["car2_step_back"] } }
        }
      },
      {
        id: "confide",
        text: "告诉一个人：把重量分出去一点",
        note: "一个真正的同盟——家人、老友、或你的搭档。不算退，只是不再独自扛。说出口的那一刻，事情就轻了一半。",
        base: 0.6,
        mods: [{ src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "那个晚上你把所有事都说了。对方没给建议——只是听完了，然后把你的部分日程悄悄接了过去。你睡了七个月来第一个整觉。", effects: { rep: 0.2, fac: { base: 3 }, contact: { brother: 6 } } },
          ok: { body: "说出来了。事情没有变，但扛事情的姿势对了。", effects: {} },
          meh: { body: "对方很同情，也很为难——他自己也是自身难保的那种忙。", effects: {} },
          fail: { body: "你的坦白被当成了脆弱的信号。一周之内，两个盟友的态度微妙地变了。", effects: { rep: -0.6, fac: { establishment: -4 } } },
          critfail: { body: "你说的话变成了别处的谈资。走廊里的笑声在你走近时停住——那是你从政以来最冷的一天。", effects: { rep: -1.25, fac: { press: -4, establishment: -5 } } }
        }
      }
    ]
  },

  /* ================= 低层晋升链的「日常」（可重复、跨时代、不换级） =================
   * 这些不是 prog_* 那种一次性的换级 gate，而是把 T0–3 那几段“从党务干部到民选公职”的空档填满的
   * 纹理：每段都有事发生、都有代价，且靠 flavor 占位符换真面孔。只给小额声誉/派系/人情/属性，绝不写 tier。 */
  {
    id: "car3_first_hearing",
    grade: "mid", category: "career", unique: false,
    valence: "risk", dyn: true, tierRaw: true, tierMin: 1, tierMax: 2, weight: 8,
    brief: {
      lede: "第一次坐在主持席上，你才知道「让一群人闭嘴听完」有多难。",
      known: [
        "厂里几十号家庭指着这张牌照吃饭，环保与隔壁商户又指着它关门。",
        "议事规则你只背了个大概，什么时候敲锤、谁先发言，全靠临场。",
        "背后有人想看你能不能把事办成，也有人在等你出丑。"
      ],
      rumor: [
        "有人说这厂早该因污染关掉，只是老板跟镇上关系硬。",
        "也有人说批牌照的另一头，连着下一届选举的捐款。"
      ],
      unknown: [
        "这是你第一块招牌，还是第一道疤。"
      ],
      terms: [{ k: "地方听证", v: "就某事公开听取民意的程序，基层练手台。" }]
    },
    title: "你第一次主持一场像样的听证",
    body: "党把一场关于本地工厂要不要续牌的小听证交到你手上主持。{PUB}派了个记者来，到场的人不多，却每一个都攒着饭碗或钱袋。",
    choices: [
      {
        id: "fair", text: "秉公主持：让该说完的人都说完，再按规矩表决",
        note: "最考分寸：撑得住就是「办得成事」，撑不住就是当众失控。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你在{CITY}把一场剑拔弩张的听证主持得井井有条，本地报夸你「比一些干了十年的还稳」。", effects: { rep: 1.1, fac: { establishment: 4, base: 4 }, attr: { INT: 1 } } },
          ok: { body: "流程走得规矩，表决如期出来，没人挑出毛病。", effects: { rep: 0.5 } },
          meh: { body: "你把会开完了，平平无奇，像没开过。", effects: {} },
          fail: { body: "场面一度失控，你叫不住拍桌子的人，主席锤敲了个寂寞。", effects: { rep: -0.7, fac: { base: -4 } } },
          critfail: { body: "听证乱成一锅粥，第二天的社会版标题是「他管不住一间屋子」。", effects: { rep: -1.4, fac: { press: -5 } } }
        }
      },
      {
        id: "deliver", text: "替厂方把结果「引导」过去，换来商界支持",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "牌照顺理成章地批了，商界欠你一个大人情，你的名帖从此递得进本地俱乐部的门。", effects: { rep: 0.4, fac: { commercial: 8, establishment: 4 } } },
          ok: { body: "事办成了，可有人看出了你在台上的那点小心思。", effects: { rep: -0.3, fac: { commercial: 6, base: -3 } } },
          meh: { body: "引导得太生硬，两边都不太买账。", effects: { rep: -0.4 } },
          fail: { body: "记者把你在会前和老板吃午餐的事写进了稿子。", effects: { rep: -0.9, fac: { base: -5 }, flags: ["scandal_1"] } },
          critfail: { body: "「谁给他塞的钱」被逐字点出，这块牌子成了挂在你会场门口的招牌。", effects: { rep: -1.6, fac: { press: -5, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "defer", text: "不遭能：把决定推给整个委员会集体表决",
        base: 0.65, mods: [{ src: "attr", key: "INT", w: 0.25 }],
        outcomes: {
          crit: { body: "你把自己摘得干净，谁都没法把锅扣在你头上。", effects: { rep: 0.3, fac: { establishment: 2 } } },
          ok: { body: "没揽功也没担责，平平过了。", effects: { rep: 0.1 } },
          meh: { body: "你挂了个名，什么也没推动，也没出错。", effects: {} },
          fail: { body: "“不敢拍板”的印象，悄悄留在了同僚心里。", effects: { rep: -0.4 } },
          critfail: { body: "会开砸了，人人都在找“今天坐主持席的是谁”。", effects: { rep: -0.8, fac: { press: -3 } } }
        }
      }
    ]
  },

  {
    id: "car3_party_errand",
    grade: "mid", category: "career", unique: false,
    valence: "risk", dyn: true, tierRaw: true, tierMin: 1, tierMax: 3, weight: 8,
    brief: {
      lede: "机器给糖的方式，往往是先给你一件不好办、又不好推的差事。",
      known: [
        "这事没有文件、没有授权，只有一句「你懂的」。",
        "你若应下，等于把自己记进这条不写在明面上的账。",
        "若推掉，下次党要出力推你上位时，也会想起你今天的推。"
      ],
      rumor: [
        "有人说这提案本就是党放出来试水温的，本来就要黄。",
        "也有人说挡它的人另有私心，只是想看看谁听话。"
      ],
      unknown: [
        "机器会记你「靠得住」还是「好用」。"
      ],
      terms: [{ k: "党内引路人", v: "关键场合肯替你开口的隐形资本。" }]
    },
    title: "党机器递来一件不方便留名的差事",
    body: "一位党内前辈（{ORG}）托你出面，替一个不方便让建制派露脸的场合「说句话」，或挡下一项提案。办成了，你在机器里的坐标前进一格；办砸了，脏的是你的手，功劳是别人的。",
    choices: [
      {
        id: "run_it", text: "接下来替党办：欠这个人情，也进这扇门",
        note: "一步踏入快车道，也把自己记进一本不能公开的账。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "fac", key: "establishment", w: 0.2 }],
        outcomes: {
          crit: { body: "你办得漂亮又不留痕，前辈在核心场合点了你的名，党机器开始把你当“自己人”。", effects: { rep: 0.5, lev: 1, fac: { establishment: 9 } } },
          ok: { body: "你接下了这差，换到一条暗线和党内实权，也背上了一份不能见光的账。", effects: { rep: 0.2, lev: 1, fac: { establishment: 6 } } },
          meh: { body: "你办了，可整个过程让你心里发毛。", effects: { rep: -0.2, fac: { establishment: 3 } } },
          fail: { body: "事没办成，你的名字却出现在了“中间人”的名单上。", effects: { rep: -0.7, fac: { establishment: -3, press: -2 }, flags: ["compromised"] } },
          critfail: { body: "你被推出去顶在前面，成了唯一没有官方掩护的人。", effects: { rep: -1.5, fac: { press: -5, establishment: -4 }, flags: ["compromised", "scandal_1"] } }
        }
      },
      {
        id: "half", text: "打折办：姿态做到，绝不亲手脏在最脏那一下",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你既没把事办砸，也没把自己搭进去，两边都觉得你“懂事”。", effects: { rep: 0.6, fac: { establishment: 4, base: 2 }, attr: { INT: 1 } } },
          ok: { body: "你留了三分余地，交得了差，也不至于脏手。", effects: { rep: 0.2 } },
          meh: { body: "你骑在墙上，两头都没落到好。", effects: {} },
          fail: { body: "“既不帮忙也不拒绝”被两边都看穿了。", effects: { rep: -0.6, fac: { establishment: -3 } } },
          critfail: { body: "你想留一手，结果被当成“不靠谱”，机器从此不托付事给你。", effects: { rep: -1.2, fac: { establishment: -5 } } }
        }
      },
      {
        id: "refuse", text: "婉拒：这种不留名的账我不记",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你守住了干净，多年后“他从不替人跑不留名的腿”成了你清白的注脚。", effects: { rep: 0.8, fac: { base: 5, church: 3 } } },
          ok: { body: "你没沾这摊浑水。短期可能得罪几个人，但账上干净。", effects: { rep: 0.3 } },
          meh: { body: "你拒了，风平浪静，没人记得你拒过。", effects: {} },
          fail: { body: "你拒得太直白，传到了正想借这条路上位的人耳朵里。", effects: { rep: -0.6, fac: { establishment: -6 } } },
          critfail: { body: "你不仅拒了，还差点喂出去。从此关键场合不再叫你。", effects: { rep: -1.2, fac: { establishment: -9 } } }
        }
      }
    ]
  },

  {
    id: "car3_profile",
    grade: "minor", category: "career", unique: false,
    valence: "boon", dyn: true, tierRaw: true, tierMin: 0, tierMax: 2, weight: 8,
    brief: {
      lede: "第一次有人认真地想把你写成一个「人物」——这是台阶，也是靶纸。",
      known: [
        "本地报的笔能把你抬成明日之星，也能把你写成不知深浅的新手。",
        "跟随采访意味着你每一句话都可能被引用。",
        "党里有人乐见，也有人酸你「出风头」。"
      ],
      rumor: [
        "有人说记者与你对手也走得很近。",
        "有人说他急需一篇能上州里的稿子，你正好撞上来。"
      ],
      unknown: [
        "是你名声的起点，还是日后的黑材料。"
      ],
      terms: [{ k: "人物侧写", v: "跟随采访写就，靠细节与引语塑造印象。" }]
    },
    title: "本地报给你登了一篇「新星」人物侧写",
    body: "{PUB}的记者要跟了你一整天：从{MEET}到傍晚在餐馆里喝冷掉的咖啡，只为写一篇「本地新面孔」。稿子怎么写，一半在他笔里，一半在你这一天的言行里。",
    choices: [
      {
        id: "open", text: "敞开来：讲真话、讲{CITY}的故事，把软肋也亮一点",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }],
        outcomes: {
          crit: { body: "你讲的那段家乡故事打动了人，见报那天，“跟我们一样的那一个”成了你的标签。", effects: { rep: 1.2, fac: { base: 6, press: 4 }, voters: { warm: 250 } } },
          ok: { body: "报道正面，本地开始有人认得你这张脸。", effects: { rep: 0.6, fac: { press: 2 } } },
          meh: { body: "稿子平平，夸了两句就翻篇了。", effects: { rep: 0.1 } },
          fail: { body: "你说得太满，记者顺手记下了一两句日后能被重翻的话。", effects: { rep: -0.5, fac: { press: -3 } } },
          critfail: { body: "一篇“新星到底干了什么”的反面侧写上了头版，你的软肋被当作了标题。", effects: { rep: -1.3, fac: { press: -5, base: -3 } } }
        }
      },
      {
        id: "spin", text: "全程打官腔：每句都滴水不漏，也毫无记忆点",
        base: 0.68, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你没给记者一句能拆的话，稿子安全，却也没人记得。", effects: { rep: 0.5, fac: { establishment: 3 } } },
          ok: { body: "一篇挑不出错也记不住的稿子。", effects: { rep: 0.2 } },
          meh: { body: "记者写得很累，因为实在没东西可写。", effects: {} },
          fail: { body: "一嘴的官腔被记者听出了味，字里行间带着嘲。", effects: { rep: -0.3, fac: { press: -2 } } },
          critfail: { body: "你的套话被当作“空洞”的证据，配着照片成了一则笑话。", effects: { rep: -0.9, fac: { press: -4 } } }
        }
      },
      {
        id: "decline", text: "躲开这篇稿：婉拒跟随采访",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.25 }],
        outcomes: {
          crit: { body: "你没上这个当，记者反倒写了个“他不让写”，意外地替你立了个低调、清醒的人设。", effects: { rep: 0.2, attr: { INTG: 1 } } },
          ok: { body: "稿子黄了。你省下了被逐字重翻的风险，也守住了不被镜头推着走的那点分寸。", effects: { attr: { INTG: 1 } } },
          meh: { body: "记者有点恼，但也没真怎么写你。", effects: { rep: -0.1 } },
          fail: { body: "拒绝采访被记成了一笔，报道里多了一句耐人寻味。", effects: { rep: -0.4, fac: { press: -2 } } },
          critfail: { body: "记者照写不误，标题是「他不让写」。", effects: { rep: -0.8, fac: { press: -3 } } }
        }
      }
    ]
  }

]);

/* --------------------------------------------------------------------------*/
