/* ============================================================================
 * CONTENT · events/104-era-1972.js
 * 时代：1972 水门全程 —— 闯空门、封口费、深夜解职、年轻记者的追问。
 * 与 1974 时代（52-era-1974.js）是不同 era id；本包 id 统一用 wg72_ 前缀避免冲突。
 * ==========================================================================*/

POTUS.define("event", [

  /* ------------------------------------------------------------------------
   * 1) 水门闯空门 —— 五个「蹩脚窃贼」被抓（大事件，史实锚点 6/17）
   * ---------------------------------------------------------------------- */
  {
    id: "wg72_breakin", grade: "major", category: "scandal",
    valence: "bane", dyn: true,
    era: ["1972_WATERGATE"], tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["print", "radio", "tv"], month: 6, day: 17,
    title: "大厦保安按住了一个「前中情局」的人",
    body: "竞选总部所在的大厦夜里响了警报，五个人因为「胶带堵锁眼」被按在地上。\n" +
      "警方在他们身上搜出现金和一台相机。白宫当晚的说法是「一桩三流的 burglary」。\n" +
      "你和其中一个人的名字，出现在同一份竞选连任委员会的捐款记录边上。",
    brief: {
      lede: "所有人都说这是小事。越说它是小事的人，越不像在说真话。",
      known: [
        "你被牵上，是因为那家「为安全筹款」的委员会收过你所在选区一笔捐款，账上出现了你的名字。",
        "被抓的人里有自称情报界的，钱包里还有古巴裔的联系人——这不像普通毛贼。",
        "白宫新闻秘书把它说成「蹩脚 burglary」，主流媒体第一天多半也跟着笑。",
        "你手上那笔捐款的原始凭证，此刻还在不在，取决于你自己。"
      ],
      rumor: [
        "有人说这不是偷文件，是去装窃听器，目标根本不在这一层。",
        "有人说委员会主席早知会出事，正在连夜销毁电话记录。"
      ],
      unknown: [
        "这笔钱的来路，会不会在一年多后变成让你必须回答的一个问题。",
        "如果这真是「小事」，为什么有那么多人急着让它别被深挖。"
      ],
      terms: [
        { k: "水门", v: "华盛顿的水门综合大厦，1972 年民主党总部设于此，闯空门案最终牵出总统辞职。" },
        { k: "竞选连任委员会", v: "为总统连任筹款的官方机构，其资金往来是本案最深的一条线索。" }
      ]
    },
    choices: [
      {
        id: "distance", text: "连夜撇清：把这笔捐款的经手记录主动交出去",
        note: "先下手为强，把自己写成「也只是被骗的捐款人」。交出去也意味着从此你不再有可退的墙。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "attr", key: "INT", w: 0.3 }],
        cost: { ap: 1 }, stake: { fav: true },
        outcomes: {
          crit: { body: "你抢在调查前把经手记录交得一干二净，把自己稳稳放在了「捐款人」而非「知情人」那一栏。风浪过去，你几乎没湿鞋。",
            effects: { rep: 0.9, lev: 1, fac: { establishment: 6, base: 5 } } },
          ok: { body: "你及时交了底，成了「配合的人」。委员会塌的时候，你不在承重墙那一列。",
            effects: { rep: 0.4, fac: { establishment: 4 } } },
          meh: { body: "你交得及时，可里面本就没你的名字，你白紧张一场，也没换来多少信任。",
            effects: { rep: 0.1 } },
          fail: { body: "你交出的记录反倒帮调查者串起了资金链，你成了那个「提供关键一笔」的人。",
            effects: { rep: -0.7, fac: { establishment: -8 }, flags: ["scandal_1", "investigation_open"] } },
          critfail: { body: "你想撇清，交出的东西却正好证明你不止捐了钱、还知情。撇清变成了自首。",
            effects: { rep: -1.25, fac: { establishment: -10, press: -8 }, flags: ["scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "loyal", text: "挺住不说话：白宫说是小事，那就是小事",
        note: "忠于机器，替它扛住最初的追问。扛得住是「可靠」，扛不住你就是那颗被牺牲的棋子。",
        base: 0.5, mods: [{ src: "fac", key: "establishment", w: 0.45 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你一口咬定「就是 burglary」，替上层顶住了整波追问。白宫记下了你的可靠，一笔「辛苦费」不动声色地到了你背后。",
            effects: { rep: 0.3, fun: 1, lev: 1, fac: { establishment: 14 } } },
          ok: { body: "你守了口，上层认你这个「懂事的人」。风头暂时没到你身上。",
            effects: { fac: { establishment: 10 }, fun: 0.5 } },
          meh: { body: "你什么都没说，可也没人特别记得你守过口。灰溜溜扛了一阵。",
            effects: { rep: -0.1 } },
          fail: { body: "你死守沉默，记者却挖出你和那家委员会的关系。「他为什么不说」比「他说了什么」更难回答。",
            effects: { rep: -0.6, fac: { press: -8, base: -5 }, flags: ["leaker_suspect"] } },
          critfail: { body: "你替人扛雷，扛到最后一刻才发现被扛的人早已安排好了「出错就推给下属」。你的名字成了那期的头条。",
            effects: { rep: -1.5, fun: -0.4, fac: { establishment: -16, press: -10 }, flags: ["bought", "scandal_3"] } }
        }
      },
      {
        id: "tip", text: "悄悄给记者递一句「去查查那笔捐款」",
        base: 0.42, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你匿名点的一根线，让记者顺着资金链挖出了更深的东西。多年后真相大白，历史给「最早透风的人」留了一个位置——虽然没人知道是你。",
            effects: { rep: 0.7, lev: 1, fac: { press: 6, base: 6 }, flags: ["deep_throat"] } },
          ok: { body: "记者记下了你的暗示，调查有了新方向。你既推动了真相，又暂时藏住了自己。",
            effects: { rep: 0.3, fac: { press: 4 } } },
          meh: { body: "你递了话，记者将信将疑。你等于什么都没说，也没把自己搭进去。",
            effects: { rep: 0.1 } },
          fail: { body: "记者查到了你头上，你从爆料人变成了被查人。「谁在泄密」名单里多了你的名字。",
            effects: { rep: -0.6, fac: { establishment: -8 }, flags: ["leaker_suspect", "scandal_1"] } },
          critfail: { body: "你的匿名爆料被顺藤摸瓜反查出来，白宫把你的名字从「内部人」改成了「叛徒」。这一份，够你喝一壶。",
            effects: { rep: -1, fac: { establishment: -14, press: 4 }, flags: ["whistleblower", "investigation_open"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 2) 封口费的信封 —— 灰色资金链（把柄/金钱）
   * ---------------------------------------------------------------------- */
  {
    id: "wg72_hush", grade: "mid", category: "shady",
    valence: "bane", dyn: true,
    era: ["1972_WATERGATE"], tierMin: 2, tierMax: 5, weight: 11,
    medium: ["print", "tv"],
    title: "有人送来一个不能问总数的信封",
    body: "一个中间人把信封放在你 office 的角落，说「各位的律师费大家凑一凑」，没提金额，也没提谁签的字。\n" +
      "你一旦收下、分发，你就成了这条链上的一环；一旦拒收，你就成了「不可靠的人」。",
    brief: {
      lede: "封口费最贵的不是钱，是收下它的那一刻你就上了同一条船。",
      known: [
        "信封送到你这，是因为你在委员会里管过那笔钱的分发，是「大家信得过、又够不着决策层」的那个位置。",
        "这些钱要发给几个「不会乱说」的涉案下属。发钱的人，等于替他们记住这笔账。",
        "拒收是表态，收下是共谋——两者都有代价。"
      ],
      rumor: [
        "有人说这笔钱其实来自一笔更脏的海外捐款。",
        "有人说中间人手上有一张每个收钱人签字的清单，那是他保命的东西。"
      ],
      unknown: [
        "多年后这笔分发记录会不会成为指向你的一页起诉书。",
        "如果你先一步把这一切交代出来，能不能换一个「最早的证人」的位置。"
      ],
      terms: [
        { k: "封口费", v: "付钱让涉案者保持沉默或离开。分发它的人往往比收钱的人更容易被锁定为共谋。" }
      ]
    },
    choices: [
      {
        id: "distribute", text: "接下这活，替大家把钱分下去",
        note: "把自己钉死在资金链的一环上。上层安全，将来出事时你也最安全——除非有人想找个替罪羊。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        stake: { fun: true, fav: true },
        outcomes: {
          crit: { body: "你把钱分发得干干净净，谁都没多拿谁都没少拿。上层把你当「能守口如瓶的自己人」，一份额外的活动经费长期挂在你的口子下。",
            effects: { fun: 5.5, lev: 1, fac: { establishment: 10, commercial: 6 }, flags: ["black_money", "hush_man"] } },
          ok: { body: "钱分下去了，没人乱说。你成了链条上沉默的一环，也成别人眼里「懂事」的一环。",
            effects: { fun: 2.75, fac: { establishment: 6 }, flags: ["hush_man"] } },
          meh: { body: "你分了钱，可拿钱的人里有一个不太安分。你白担了风险，还多了个隐患。",
            effects: { rep: -0.4, flags: ["hush_man", "leaker_suspect"] } },
          fail: { body: "收到钱的人里有一个转头做了证人，把你这份分发记录一并交了上去。链条上的名字，第一个是你。",
            effects: { rep: -1.5, fac: { establishment: -10, press: -6 }, flags: ["scandal_3", "investigation_open"] } },
          critfail: { body: "分发的账被完整起获，你被定性为「封口费的实际经手人」。上层脱了身，你替整条链背了锅。",
            effects: { rep: -2.75, fav: -2, fac: { establishment: -16, base: -10 }, flags: ["scandal_4", "investigation_open"] } }
        }
      },
      {
        id: "refuse", text: "不接。把信封原封退回去，并记下时间",
        note: "拒收就是划清界限，也把自己变成了「知情的不可靠者」——上层会记住你没上船。",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.5 }],
        outcomes: {
          crit: { body: "你退回信封，还留了个时间记号。当整座船开始下沉，你是少数几个「当初就没上船」的人——这份清白比金子值钱。",
            effects: { rep: 1.5, fac: { base: 8, press: 6, establishment: -6 }, flags: ["clean_hands"] } },
          ok: { body: "你退了钱，划了线。上层对你冷了，可你自己那页账是干净的。",
            effects: { rep: 0.8, fac: { establishment: -6, base: 4 } } },
          meh: { body: "你退了，但没留证据。将来谁说得清你到底是「退过」还是「本来就没碰」。",
            effects: { rep: 0.2, fac: { establishment: -3 } } },
          fail: { body: "你退回信封被当成了「不忠诚」的信号，机器开始绕开你、也监视你。",
            effects: { rep: -0.6, fac: { establishment: -10 }, flags: ["leaker_suspect"] } },
          critfail: { body: "你拒收还声张，成了「到处说我见过这个信封」的不安定因素。他们决定一起把你做成那个乱说话的人。",
            effects: { rep: -1.5, fac: { establishment: -14, commercial: -6 }, flags: ["compromised", "investigation_open"] } }
        }
      },
      {
        id: "expose", text: "收下当证据，然后把它交给特别检察官",
        base: 0.4, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "attr", key: "INTG", w: 0.45 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你带着信封走进了调查组，成了最早「从里面反水」的证人。案子因你这份实物而钉死，你的名字进了「说清真相的人」那一栏。",
            effects: { rep: 2, fac: { press: 10, base: 8, establishment: -12 }, flags: ["whistleblower"] } },
          ok: { body: "你把信封交了上去，做了一回吹哨人。上层恨你入骨，可你守住了更大的一头。",
            effects: { rep: 1, fac: { press: 6, establishment: -10 }, flags: ["whistleblower"] } },
          meh: { body: "你交了，可调查组嫌你来路暧昧——「你怎么拿到这个信封的？」你反而要多解释自己。",
            effects: { rep: 0.2, flags: ["leaker_suspect"] } },
          fail: { body: "你收下了，却没来得及交出去，半路被人截了胡。你既脏了手，又没做成吹哨人。",
            effects: { rep: -1.25, fac: { establishment: -8, press: -4 }, flags: ["scandal_2"] } },
          critfail: { body: "你想反水，可对方手里也有你「曾参与分发」的记录。两个人各执一词，被起诉的那一个偏偏是你。",
            effects: { rep: -2.5, fac: { establishment: -12, base: -8 }, flags: ["scandal_3", "investigation_open"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 3) 星期六夜晚的大清洗 —— 总统下令解职特别检察官（危机/仕途，锚点 10 月）
   * ---------------------------------------------------------------------- */
  {
    id: "wg73_saturday", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    era: ["1972_WATERGATE"], tierMin: 2, tierMax: 5, weight: 10,
    medium: ["print", "radio", "tv"], month: 10,
    title: "一晚上，司法部长辞职了两次",
    body: "白宫打电话来，要你所在那条线的人「劝劝」那位不肯就范的特别检察官。上面的意思是：把他换掉。\n" +
      "前两位司法部长宁可辞职也没执行这道令，全国的电话交换机当晚被打爆。轮到你表态了。",
    brief: {
      lede: "有人让你去解雇一个依法查你的人。照做是效忠，拒绝是原则——两者都可能毁掉你。",
      known: [
        "这道压力落到你头上，是因为你是这条线上「够格传话又还想要前程」的那一个。",
        "特别检察官手里有录音带，正一步步往最上面逼近。",
        "已经有人为拒绝这道令丢了官，你亲眼看着他们走出那扇门。",
        "此刻无论支持还是反对，都会被全国记住你选了哪边。"
      ],
      rumor: [
        "有人说白宫已经准备好了替身，谁不签就换谁签，直到有人肯签为止。",
        "有人说国会被激怒，正在酝酿弹劾条款。"
      ],
      unknown: [
        "总统还剩几个月的位子，而你还得在这条路上走几十年。",
        "今晚你站的这一边，是不是历史很快就会公认的那一边。"
      ],
      terms: [
        { k: "特别检察官", v: "被授权独立调查行政分支的高级别检察官，因不受白宫直接节制而成了本案最大的威胁。" }
      ]
    },
    choices: [
      {
        id: "resign", text: "拒绝执行这道令，宁可辞职",
        note: "把前程押在宪政的一边。辞了可能一夜成名，也可能从此被机器边缘化。",
        base: 0.52, mods: [{ src: "attr", key: "INTG", w: 0.55 }, { src: "fac", key: "base", w: 0.3 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你公开拒绝、当场辞职，成了「那晚守住底线的人」之一。国会山的掌声和全国的电报一起寄到了你的办公室。",
            effects: { rep: 2.5, tier: 1, fac: { base: 12, press: 12, establishment: -10 }, flags: ["constitutionalist"] } },
          ok: { body: "你顶住了没签字，辞了职。眼下失去了位子，可你的名字进了「可靠」那一栏。",
            effects: { rep: 1.5, fac: { base: 8, press: 6, establishment: -6 } } },
          meh: { body: "你婉拒了，姿态摆得不太响，也不算难看。一个中不溜秋的原则时刻。",
            effects: { rep: 0.4 } },
          fail: { body: "你拒绝执行，却被上层反咬成「越权抗命」。辞职没辞成，还背了个抗上的记录。",
            effects: { rep: -0.8, fac: { establishment: -10, base: 3 }, flags: ["scandal_1"] } },
          critfail: { body: "你硬顶到底，可机器早有准备，把你描成「挟案自重、不肯交权」。原则被说成了私心。",
            effects: { rep: -1.5, fac: { establishment: -12, base: -6 }, flags: ["compromised"] } }
        }
      },
      {
        id: "comply", text: "执行命令：替白宫去把检察官换掉",
        note: "升迁最快的路，也是最容易被历史钉住的路。",
        base: 0.6, mods: [{ src: "fac", key: "establishment", w: 0.45 }, { src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你干净利落地办了一件别人不敢办的事，白宫把最烫的差事交给了你。可你心里清楚：风一变，第一个被拿出来平息众怒的就是执行者。",
            effects: { rep: 0.6, tier: 1, lev: 1, fac: { establishment: 14, base: -8, press: -10 } } },
          ok: { body: "你签了字、办了事，短期内平步青云。全国都在骂「听话的那只手」，而那只手是你的。",
            effects: { rep: -0.4, fac: { establishment: 10, base: -6, press: -8 } } },
          meh: { body: "你办了这件脏活，可上面转头又找了别人分担责任，脏水洒了你一身。",
            effects: { rep: -0.8, fac: { establishment: 3, press: -6 } } },
          fail: { body: "你刚动手，国会的抗议和街头的电话就压了过来。命令撤了，你的把柄留了下来。",
            effects: { rep: -1.5, fac: { establishment: -6, press: -10, base: -6 }, flags: ["scandal_2"] } },
          critfail: { body: "你成了那个「深夜去送解职信的人」。这事后来被反复拍成片子，每一次都在提醒选民：你干过什么。",
            effects: { rep: -2.5, fac: { establishment: -10, press: -14, base: -10 }, flags: ["bought", "scandal_3"] } }
        }
      },
      {
        id: "leak", text: "不办，也不辞——先把这道命令捅给媒体",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你把这道「深夜解职令」原原本本送上了头版。白宫焦头烂额，你匿名居功，调查因这股民意又续了命。",
            effects: { rep: 1.5, fac: { press: 8, base: 8, establishment: -12 }, flags: ["deep_throat"] } },
          ok: { body: "消息捅出去，舆论炸了锅。你没落名义，却实实在在拖住了那只黑手。",
            effects: { rep: 0.8, fac: { press: 5, establishment: -8 } } },
          meh: { body: "你放了出去，可没激起多大水花。你既违了上意，又没能改变什么。",
            effects: { rep: 0.2, fac: { establishment: -5 } } },
          fail: { body: "泄密被反查到你头上。你从吹哨人变成了「泄密嫌疑人」，两头受审。",
            effects: { rep: -1.25, fac: { establishment: -10 }, flags: ["leaker_suspect", "investigation_open"] } },
          critfail: { body: "白宫抢先把你塑造成「心怀不满、伪造命令」的内鬼。你越辩解，越像那么回事。",
            effects: { rep: -2.25, fac: { establishment: -12, press: -8, base: -6 }, flags: ["compromised", "scandal_2"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 4) 两个年轻记者 —— 小事（舆论，给追与躲的分量）
   * ---------------------------------------------------------------------- */
  {
    id: "wg72_reporters", grade: "minor", category: "media",
    valence: "risk", dyn: true,
    era: ["1972_WATERGATE"], tierMin: 0, tierMax: 3, weight: 10,
    medium: ["print", "tv"],
    title: "报纸上来了两个不达目的不罢休的记者",
    body: "两个还不太有名的记者，在市政厅后门堵你，问的都是同一串：谁捐的钱、钱从哪来、你知不知道。\n" +
      "他们的编辑都不太信这条稿子能发。可他们显然打算一直问下去。",
    brief: {
      lede: "对一桩「小事」，越是急着撇清的人越像心里有鬼，越是不耐烦的人越像被问中了。",
      known: [
        "他们来堵你，是因为你在捐款记录里是唯一还愿意被当面问到、又够不到核心层的名字。",
        "你手上没有他们想要的大料，但你有一件他们不知道的东西：这钱的「过手人」是谁。",
        "你既可以一句话打发他们，也可以把他们往那个对的方向轻推一下。"
      ],
      rumor: [
        "有人说这俩记者是被上头故意放出来试探谁慌的。",
        "有人说他们的稿子已经交了三次，总编压着不肯上。"
      ],
      unknown: [
        "你今天怎么对他们，决定了他们稿子里你是「挡路的人」还是「说真话的人」。",
        "他们到底能挖到多深，还是很快就会放弃。"
      ],
      terms: [
        { k: "事实核查", v: "记者发稿前反复验证信源，是调查报道里最耗人也最要命的一环。" }
      ]
    },
    choices: [
      {
        id: "spinning", text: "官方口径：「这就是一桩三流的案子，别再闹了」",
        note: "标准辟谣话术。稳当，但「别闹了」这三个字在调查记者耳朵里往往是反向路标。",
        base: 0.6, mods: [{ src: "attr", key: "CHA", w: 0.35 }],
        outcomes: {
          crit: { body: "你的「别闹了」被原话引用登了报，配上你不耐烦的表情，反倒让读者觉得「这里果然有文章」。可你确实把火压了一段时间。",
            effects: { rep: 0.8, fac: { establishment: 5, press: -5 } } },
          ok: { body: "你用一句官话挡住了这一波。记者暂时没词了。",
            effects: { rep: 0.4, fac: { establishment: 3 } } },
          meh: { body: "你的表态平淡得谁都没记住，记者讨了个没趣。",
            effects: {} },
          fail: { body: "你的傲慢被写成了「他与那桩案子一样让人不舒服」。反而给稿子添了把火。",
            effects: { rep: -1.5, fac: { press: -6, base: -3 } } },
          critfail: { body: "你当着记者的面撒谎，被录了音。第二天，那句「绝无此事」成了最有力的反证。",
            effects: { rep: -3, fac: { press: -10, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "nudge", text: "半推半就：不承认什么，但暗示他们「去查捐款过手的账户」",
        note: "匿名点个方向，既不背叛谁，也给将来留一手。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "你一句「我劝你们别只盯着那五个人」帮两个记者打开了新线索。他们不知道你是谁，可这条线你救了。",
            effects: { rep: 1.5, fac: { press: 5, base: 3 }, flags: ["deep_throat"] } },
          ok: { body: "你轻推了一把，没留名。调查换了方向，你深藏功与名。",
            effects: { rep: 0.8, fac: { press: 3 } } },
          meh: { body: "你暗示了，记者没接住。你这番心，白费了一半。",
            effects: { rep: 0.4 } },
          fail: { body: "你「给方向」被听成了「你果然知情」。他们反过来把你也写进了调查对象。",
            effects: { rep: -1.5, fac: { press: -6 }, flags: ["leaker_suspect"] } },
          critfail: { body: "你想两头下注，结果上层察觉你在放风。你从「配合的人」一夜之间变成了「内鬼」。",
            effects: { rep: -3, fac: { establishment: -10 }, flags: ["leaker_suspect", "scandal_2"] } }
        }
      },
      {
        id: "brush", text: "礼貌地一句话打发：「谢谢，没什么可说的」",
        base: 0.74, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你滴水不漏又不伤人和，礼貌地脱身。记者尊重你，上层也放心你。",
            effects: { rep: 0.8, fac: { establishment: 3 } } },
          ok: { body: "你客气地挡了回去。没添乱，也没惹事。",
            effects: { rep: 0.4 } },
          meh: { body: "你一句话结束了采访，可那两名记者显然不会只来堵你一次。",
            effects: {} },
          fail: { body: "你的「无可奉告」被印成大字标题——在选举年，这就是「默认」。",
            effects: { rep: -1.25, fac: { base: -4, press: -3 } } },
          critfail: { body: "你想息事宁人，可你越客气越显得心虚。他们把「他什么都不敢说」写成了导语。",
            effects: { rep: -2, fac: { press: -6 } } }
        }
      }
    ]
  }
]);
