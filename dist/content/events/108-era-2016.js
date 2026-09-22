/* ============================================================================
 * CONTENT · events/108-era-2016.js
 * 时代：2016 社媒反建制 —— 推特治国、假新闻、数据画像、邮寄选票信任危机。
 * 铁律见 docs/CONTENT-SCHEMA.md §11。人脉只用已登记的 8 个。
 * 经济：投资型（买数据/买流量）用 funMul；消费型 ok 档给非钱回报；每事件留保底。
 * 媒介：本时代 social 可用；shortvideo 从 2018 起，只给 2018+ 的事件。
 * ==========================================================================*/

POTUS.define("event", [

  /* ------------------------------------------------------------------------
   * 1) 一条推文顶得过一场演讲 —— 2016 大选（大事件，锚点 11 月）
   * ---------------------------------------------------------------------- */
  {
    id: "soc16_election", grade: "major", category: "political",
    valence: "risk", dyn: true,
    era: ["2016_SOCIAL"], tierMin: 1, tierMax: 5, weight: 13, unique: true,
    medium: ["print", "tv", "cable", "internet", "social"], month: 11,
    title: "民调全说稳了，可手机里那股火没人测得到",
    body: "选前所有正经预测都指向同一个结局，纸面上的模型无一例外。可推特上的愤怒、脸书上的转发、\n" +
      "和集会上一浪高过一浪的吼声，全都没被算进任何一张民调。\n" +
      "开票之夜，「红州」一个一个提前变红，播报员的声音开始发紧。传统机器第一次发现自己失灵了。",
    brief: {
      lede: "注意力取代了组织。谁会被这条新渠冲垮、谁会踩着它上位，取决于你今晚信不信自己看见的。",
      known: [
        "轮到你，是因为你是地方上少数还在两拨人之间都说得上话的人——建制的电话和基层的群都来找你表态。",
        "党魁们还照着老剧本等待「稳妥的胜利」，而手机里的民粹已经不在乎党的招牌叫什么。",
        "此刻无论哪边赢，都会有一大半选民觉得自己被另一方「不配治国」。"
      ],
      rumor: [
        "有人说对手的推文是境外农场批量放的，也有人把自己的爆款甩锅给对方水军。",
        "有人说老牌报纸和电视台早就决定了要捧谁，只是不打算承认。"
      ],
      unknown: [
        "这场「机器失灵」是一次意外，还是此后每一次选举的新常态。",
        "今晚你压的那一边，会不会四年后就成了你想掀翻的另一张牌桌。"
      ],
      terms: [
        { k: "注意力政治", v: "以直接占据公众注意力（推文、集会、话题）取代传统政党机器与广告的政治打法。" }
      ]
    },
    choices: [
      {
        id: "ride", text: "押注浪头：公开拥抱这股反建制情绪，跟老机器保持距离",
        note: "赌的是「风向变了」而不是「一阵风」。赌对是新朝红人，赌错是两边不靠。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.35 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你看穿了这不是闹一阵就散，抢先一步把自己讲成「听得见老百姓声音的人」。老机器骂你投机，新浪潮却把你推到了台前。",
            effects: { rep: 1.25, tier: 1, fac: { base: 12, establishment: -8, press: -4 }, flags: ["attention_player"] } },
          ok: { body: "你顺着这股气说了话，基层觉得你「不装」。上层对你多了几分提防，但你的位置更稳了。",
            effects: { rep: 0.7, fac: { base: 8, establishment: -4 } } },
          meh: { body: "你两头押、两头浅。基层觉得你不够狠，建制觉得你不忠心，谁都没把你当自己人。",
            effects: { rep: 0.2, fac: { establishment: -3 } } },
          fail: { body: "你抢着拥抱浪头，浪却没到你这边来。你既丢了建制的支持，也没捞到民粹的掌声。",
            effects: { rep: -0.6, fac: { establishment: -8, base: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "你替最出格的那句话开了背书，事后它被单独拎出来当成「他煽动了什么」的证据。浪潮退了，你还站在原地被晒。",
            effects: { rep: -1, fac: { press: -10, establishment: -8, base: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "hold", text: "守住机器：照旧讲纪律、讲资历、讲「不能让疯子上台」",
        note: "替老建制说最后一句硬话。可能守住体面，也可能被一波冲成「不懂选民的精英」。",
        base: 0.45, mods: [{ src: "fac", key: "establishment", w: 0.45 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "在全网嘲弄「老一套」的空气里，你替程序与体面说了完整的一段。当晚你被做成表情包，可多年后有人回头翻，说那是少数几个清醒的声音。",
            effects: { rep: 0.9, fac: { establishment: 14, press: 6, base: -4 }, flags: ["institutionalist"] } },
          ok: { body: "你护住了党的门面，上层记你的稳。只是基层觉得你说的话，跟他们的日子隔着一层玻璃。",
            effects: { rep: 0.3, fac: { establishment: 8, base: -3 } } },
          meh: { body: "你讲了老规矩，讲得没人听。在人人刷手机怒吼的夜晚，体面是最不带货的东西。",
            effects: { rep: 0.1, fac: { establishment: 3 } } },
          fail: { body: "你替机器喊话，机器自己却塌了。你被和那批「预测全错 yet 自信满满」的专家捆在一起，一起失了信。",
            effects: { rep: -0.7, fac: { establishment: -6, press: -6, base: -5 }, flags: ["scandal_1"] } },
          critfail: { body: "你那句「他们不配」被剪成十五秒， loop 播放成了「精英亲口鄙视选民」。这句话跟你一辈子。",
            effects: { rep: -1.25, fac: { base: -12, establishment: -6, press: -6 }, flags: ["elite_contempt"] } }
        }
      },
      {
        id: "wait", text: "不站队：先守本地，等看清风向再定调",
        note: "最不性感也最保命的一手。赌的是别在任何一边留下把柄。",
        base: 0.68, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "你谁也没帮、谁也没得罪，安静地把本地该办的事办了。风向明朗后，赢的那边居然还来找你「谈谈合作」。",
            effects: { rep: 0.4, fac: { base: 5, establishment: 3 } } },
          ok: { body: "你守住了中立，没押错任何一边。乱世里没把柄，就是最大的资本。",
            effects: { rep: 0.2, fac: { base: 3 } } },
          meh: { body: "你谁都不得罪，也就谁都没记住你。这个夜晚你成了透明人。",
            effects: {} },
          fail: { body: "你的「不表态」被两边同时读成「心虚」。在逼着所有人站队的夜晚，中立也是一种罪。",
            effects: { rep: -0.3, fac: { establishment: -3, base: -3 } } },
          critfail: { body: "你两头观望，结果两头都当你是「对方派来的」。谁赢了都想把你换掉。",
            effects: { rep: -0.7, fac: { establishment: -5, base: -5 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 2) 假新闻跑得比辟谣快 —— 事实核查的军备竞赛（媒介）
   * ---------------------------------------------------------------------- */
  {
    id: "soc17_fakenews", grade: "mid", category: "media",
    valence: "risk", dyn: true,
    era: ["2016_SOCIAL"], tierMin: 0, tierMax: 5, weight: 11,
    medium: ["internet", "social", "print", "cable"],
    title: "一条编出来的黑料，三小时转发过十万",
    body: "有人捏造了一条关于你的「内幕」：细节逼真、情绪到位、来源「据知情人士」。等你的团队查清，它已经传遍了半个网络。\n" +
      "辟谣稿要三天才能写出来，可三天后没人记得辟了什么。平台回你一句「不违反社区规则」，就把你打发了。",
    brief: {
      lede: "真相还在穿鞋，谣言已经跑遍全城。你的对手不再需要证明你错，只需要让足够多人懒得查证。",
      known: [
        "这事烧到你身上，是因为你是本地少数上了「目标名单」的人——那条假料瞄准的正是你摇摆选民最敏感的那根神经。",
        "越正经地逐条反驳，越像在替它做二次传播；越轻描淡写，越像默认。",
        "平台没有编辑部，也没有责任主体，你连「告谁」都要先想半天。"
      ],
      rumor: [
        "有人说造这条料的是你的对手，也有人说是某家靠流量吃饭的内容农场，跟选举本身没半毛钱关系。",
        "有人说平台内部其实知道它在扩散，只是「愤怒最留得住用户」。"
      ],
      unknown: [
        "这套「先污染后没法治理」的打法，会不会变成此后每场选举的标配。",
        "你今天为了辟谣投入的钱，明天会不会被同样的机器用别的方式再榨一遍。"
      ],
      terms: [
        { k: "内容农场", v: "以批量生产抓眼球内容换取流量分成的站点，真假混发，靠转发量而非公信力盈利。" }
      ]
    },
    choices: [
      {
        id: "fight", text: "硬核辟谣：开記者會、发时间线、要求平台标注",
        note: "把每一句假话都追到出处怼回去。占理，但你在跟一台不讲理的机器比谁更较真。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        cost: { ap: 1, fun: 0.6 },
        outcomes: {
          crit: { body: "你一条条摆证据、把造谣链条公开钉死，反倒显出「被黑成这样还站得直」。这波澄清给你赢回了比掉下去更多的信任。",
            effects: { rep: 1.5, fac: { press: 8, base: 6 }, flags: ["fact_defender"] } },
          ok: { body: "辟谣起了作用，核心选民稳住了。假料没完全清干净，但没能把你带进沟里。",
            effects: { rep: 0.8, fac: { base: 4, press: 3 } } },
          meh: { body: "你花了不少力气，可认真的东西永远跑不过刺激的东西。辟谣稿没人看，谣言还在转。",
            effects: { rep: 0.2, fun: -0.6 } },
          fail: { body: "你越解释，那几条假话越被反复提起——你亲手替它续了三天命。",
            effects: { rep: -1, fac: { press: -4, base: -4 } } },
          critfail: { body: "你辟谣时被抓到一处小口误，反被做成「他连辟谣都在撒谎」。泥潭越陷越深。",
            effects: { rep: -1.75, fac: { press: -8, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "mock", text: "不辟谣，反手把假料做成段子群嘲",
        note: "用魔法打败魔法：既然没人看证据，那就比谁更好笑。风险是掉价。",
        base: 0.52, mods: [{ src: "attr", key: "CHA", w: 0.45 }, { src: "attr", key: "CUN", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你把那条煞有介事的假料嘲成了一个全网梗，造谣的一方反而不敢再认领。笑声是最好的消毒剂。",
            effects: { rep: 1.5, fav: 1, fac: { base: 8, press: 4 } } },
          ok: { body: "你玩梗玩赢了，气度显得比别人高半格。只是也有人选民觉得你「不够严肃」。",
            effects: { rep: 0.8, fac: { base: 5 } } },
          meh: { body: "你想幽默，可梗没爆。假料没被嘲死，你倒像在对空气挤眉弄眼。",
            effects: { rep: 0.2 } },
          fail: { body: "你开的玩笑被断章取义，成了新的把柄。本想灭火，反给自己添了第二条假料。",
            effects: { rep: -1, fac: { press: -6, base: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "你嘲错了对象——那条「假料」竟是本地真出了的事，你的段子当场变成冷血现场。",
            effects: { rep: -2, fac: { base: -10, press: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "ignore", text: "冷处理：不理它，让热度自己过去",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你一个字没回，假料没等到对手戏，三天就自己凉了。省下的钱和精力，被你办成了别的实事。",
            effects: { rep: 0.8, fac: { base: 4 } } },
          ok: { body: "你没给它续热度，它慢慢沉了下去。只是这段时间里，你确实一直「有嘴说不清」。",
            effects: { rep: 0.2 } },
          meh: { body: "你等着它凉，它凉得慢吞吞。这几天你顶着一条没辟清的脏水走路。",
            effects: { rep: -0.2 } },
          fail: { body: "你越沉默，越像默认。等到想起来回应时，那条假话已经成了很多人心里的事实。",
            effects: { rep: -1, fac: { base: -5, press: -3 } } },
          critfail: { body: "你的沉默被解读成「被戳中不敢吭声」，假料滚成了真危机，连本党都想跟你切割。",
            effects: { rep: -1.5, fac: { base: -6, establishment: -6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 3) 买一份选民画像 —— 数据公司（投资型，回报走 funMul，2018）
   * ---------------------------------------------------------------------- */
  {
    id: "soc18_data", grade: "mid", category: "finance",
    valence: "risk", dyn: true,
    era: ["2016_SOCIAL"], tierMin: 2, tierMax: 5, weight: 11,
    medium: ["internet", "social", "cable"],
    title: "「我们能精准到每个摇摆户的心情」",
    body: "一家数据公司找上门，说手里有本地每一位选民的「心理画像」：从消费习惯到半夜刷什么。\n" +
      "它开价一笔顾问费，承诺能做「千人千面」的定向投放——对怕的人讲恐惧，对怒的人讲愤怒。\n" +
      "它要的不只是钱，还想要你手上部分选民名单来「校准模型」。",
    brief: {
      lede: "注意力能被买，情绪能被算。这笔钱花对了是神来之笔，花过了线就是下一个丑闻。",
      known: [
        "轮到你，是因为你是能拍板这笔竞选预算的人，而党内已经在传「隔壁都用了效果吓人」。",
        "定向投放确实能显著提升动员效率；但「校准模型」意味着交出选民的个人级数据。",
        "一旦这类「用隐私换胜选」的操作被曝光，反噬会比不用还惨。"
      ],
      rumor: [
        "有人说这家公司的数据是从一个社交平台的灰色接口「顺」来的，本身就见不得光。",
        "有人说真正买你画像的，未必只有你的竞选团队。"
      ],
      unknown: [
        "这套精准操纵，会不会有一天调转枪口、对着你自己。",
        "曝不曝光，取决于有没有人比你先把它讲成一个坏故事。"
      ],
      terms: [
        { k: "心理画像投放", v: "依据个人数据推断性格与情绪弱点、再据此定制定向政治广告的投放方式。" }
      ]
    },
    choices: [
      {
        id: "allin", text: "全买：顾问费给足、名单也给它「校准」",
        note: "短期动员效率拉满。但你在把选民隐私和自己的把柄一起交给一个第三方。",
        base: 0.48, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "tech", w: 0.35 }],
        cost: { fun: 3.5 },
        stake: { fun: true },
        outcomes: {
          crit: { body: "这套打法神了——你像能读透每个摇摆户的心，钱花在刀刃上，选情被硬生生盘活，公司把你当标杆案例。只是你偶尔会想：那些数据，现在还在谁手里。",
            effects: { funMul: 1.5, rep: 1.25, tier: 1, fac: { tech: 12, establishment: 6 } } },
          ok: { body: "定向投放确实管用，你的动员比对手精准一档。钱基本回了本，只是名单交出去那一下，你心里咯噔过。",
            effects: { funMul: 0.6, rep: 0.6, fac: { tech: 8 } } },
          meh: { body: "花了大钱，效果也就那样——你买的「画像」有一半是过期的。钱打了水漂，还搭上了名单。",
            effects: { funMul: -0.3, rep: -0.4 } },
          fail: { body: "投放没起水花，可那家公司暴雷了。你给它的选民名单，一夜之间成了「他把数据卖给了黑箱」的铁证。",
            effects: { funMul: -0.8, rep: -1.5, fac: { base: -10, press: -8 }, flags: ["data_broker", "scandal_2"] } },
          critfail: { body: "公司在一次全国性调查里被连锅端，你「知情且同意交出选民隐私」的邮件被逐封公开。你成了「用隐私换胜选」的教科书反面案例。",
            effects: { funMul: -1.0, rep: -2.5, fac: { base: -14, press: -12, establishment: -6 }, flags: ["data_broker", "scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "partial", text: "只买服务，不给名单：匿名聚合、绝不交出个人级数据",
        note: "要工具不要把柄。省下的风险，正是别人日后捅你的那一刀。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "INTG", w: 0.25 }],
        cost: { fun: 1.75 },
        outcomes: {
          crit: { body: "你只用了匿名那半套，效果打了点折，却干净得查不出毛病。多年后同行一个个爆雷，你还在，被人称作「居然留了手」。",
            effects: { funMul: 0.9, rep: 1, fac: { tech: 5, base: 4 }, flags: ["data_clean"] } },
          ok: { body: "你买了能力，守住了底线。动员升了一点，把柄一个没留。",
            effects: { funMul: 0.4, rep: 0.4, fac: { tech: 4 } } },
          meh: { body: "不给名单，公司的模型就不那么灵了。钱花了一半，效果只有一点。",
            effects: { funMul: -0.1, rep: 0.2 } },
          fail: { body: "「只要服务不要数据」两头不讨好：公司嫌你小气给半吊子方案，对手还照旧骂你「也用黑箱」。",
            effects: { funMul: -0.5, rep: -0.8, fac: { tech: -4, base: -3 } } },
          critfail: { body: "你已尽量收敛，可公司还是拿你的名义去外面「借」了数据。你成了那个「说不清自己知不知道」的人。",
            effects: { funMul: -0.8, rep: -1.5, fac: { press: -8, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "refuse", text: "不碰：把这番力气拿去做上门拜票",
        note: "最笨也最干净的一手：不交数据、不烧钱，只押自己那双鞋。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你没买模型，把人和时间砸在了挨家挨户上。在这个「算法治国」的年代，最笨的办法反倒让你有了对手没有的真接触。",
            effects: { rep: 1.25, fac: { base: 10, establishment: 3 }, flags: ["ground_game"] } },
          ok: { body: "你走了最传统的路，效果稳当。没爆点，也没雷点。",
            effects: { rep: 0.6, fac: { base: 5 } } },
          meh: { body: "你抬着两条腿挨家挨户，可在这个注意力被算法牵着走的年头，笨办法有点吃力不讨好。",
            effects: { rep: 0.2 } },
          fail: { body: "你把「拒绝用数据」讲成了道德高地，被对手反手笑成「他买不起、只好装清高」。",
            effects: { rep: -0.8, fac: { establishment: -4, tech: -3 } } },
          critfail: { body: "你公开痛批同行用数据，结果被人扒出你早年也用过一个类似的小工具。「伪清高」的帽子扣得死死的。",
            effects: { rep: -1.5, fac: { press: -6, base: -5 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 4) 每一张邮寄选票都是的火药 —— 2020 信任危机（小事，锚点 11 月）
   * ---------------------------------------------------------------------- */
  {
    id: "soc20_mailin", grade: "minor", category: "crisis",
    valence: "bane", dyn: true,
    era: ["2016_SOCIAL"], tierMin: 0, tierMax: 4, weight: 9,
    medium: ["tv", "cable", "social", "internet"], month: 11,
    title: "计票夜，领先会「自己变没」",
    body: "疫情这年，几千万人选了邮寄投票。规则说清点了才算数，可清点要几天。\n" +
      "于是一幅注定出现的画面摆在全国人面前：开票先红后蓝、你的选区「诡异地一夜翻盘」。\n" +
      "有人已经在喊「舞弊」。你手里,只有几箱还没拆完的信封,和一个随时会被点燃的群。",
    brief: {
      lede: "程序没错，只是慢。可在一台靠愤怒运转的机器眼里，「慢」就是「有鬼」。",
      known: [
        "这事压到你头上，是因为本地计票归你这条线协调，两拨人都盯着你手里那几个还没开的箱子。",
        "邮寄票延迟清点会让当夜结果「反着走」，这是制度设计里就写明的事，不是异常。",
        "此刻你哪怕只说错一个字，都可能被解读成「他们在偷偷干点什么」。"
      ],
      rumor: [
        "有人说这几箱「迟到」的信封被动过手脚，也有人说这只是给「先红后蓝」提前找好的说辞。"
      ],
      unknown: [
        "无论这次计票多么干净，「不信结果」这颗种子一旦种下，明年后年都会发芽。"
      ],
      terms: [
        { k: "开票滑坡", v: "因邮寄/迟到选票清点顺序，导致当日领先者在后续计票中被反超的正常现象。" }
      ]
    },
    choices: [
      {
        id: "explain", text: "反复讲程序：透明直播拆箱，把「慢」解释给每个人听",
        note: "在没人想听道理的夜里讲道理。守住程序，但很可能没人领情。",
        base: 0.52, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "你顶着压力把拆箱全程直播、把规则一遍遍讲透。选情翻没翻你都被认作「守住了这场计票的人」。",
            effects: { rep: 2, fac: { establishment: 6, base: 4 }, flags: ["election_steward"] } },
          ok: { body: "你老实讲程序，懂的人信了。只是愤怒的那一半，你没能说服。",
            effects: { rep: 0.8, fac: { establishment: 4 } } },
          meh: { body: "你讲了很多，可没人真在听。你把箱子和规则守好了，仅此而已。",
            effects: { rep: 0.4 } },
          fail: { body: "你越强调「一切正常」，越像在替什么打掩护。正常的程序，输在了不信任的空气里。",
            effects: { rep: -1.5, fac: { base: -5 } } },
          critfail: { body: "你主持的某箱计票出了个操作小差错，被放大成「舞弊实锤」。你解释再多，也追不上那条爆款。",
            effects: { rep: -2.75, fac: { press: -6, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "hype", text: "顺着火：跟着喊「停计票、查舞弊」，先稳住自己这边的人",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你抢在最前面喊「停」，群里瞬间把你当自己人。短期人气爆表，只是你已经上了这辆不知道开向哪的车。",
            effects: { rep: 1.5, fac: { base: 8, establishment: -8 } } },
          ok: { body: "你跟着喊了几句，自己这边的情绪被你稳住了。法理与体面，你悄悄往回收了一点。",
            effects: { rep: 0.8, fac: { base: 5, establishment: -4 } } },
          meh: { body: "你想借火，火却没全朝你这边照。喊也喊了，没落下多少好处。",
            effects: { rep: 0.4, fac: { establishment: -3 } } },
          fail: { body: "你带头质疑计票，最后清点结果却毫无问题。「他自己都说不清在闹什么」写进了第二天的报道。",
            effects: { rep: -2, fac: { establishment: -6, press: -5 } } },
          critfail: { body: "你点的这把火，最后烧到了一场你兜不住的场面。事后追责名单上，你喊的那一嗓子被逐字回放。",
            effects: { rep: -4.5, fac: { establishment: -10, press: -8, base: -4 }, flags: ["denier", "scandal_3"] } }
        }
      },
      {
        id: "quiet", text: "少说话：把票数清完就是我能做的全部",
        base: 0.65, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你没赶任何一波热度，只是沉默地把该数清的票数清到底。风平浪静后，人们才反应过来：那一夜他没添过一把柴。",
            effects: { rep: 1.5, fac: { base: 4, establishment: 4 } } },
          ok: { body: "你低调办完该办的事。没出彩，也没惹祸。",
            effects: { rep: 0.8 } },
          meh: { body: "你什么都没说，也几乎什么都没被记住。在这样一个夜晚，这就算平安。",
            effects: {} },
          fail: { body: "你的沉默被两边同时误读：一边的当默认，另一边的当心虚。不说话，也是一种话。",
            effects: { rep: -1.25, fac: { base: -3, establishment: -3 } } },
          critfail: { body: "你闷头数完了票，可「他当时在场却一声不吭」成了一句迟来的问责。",
            effects: { rep: -2, fac: { press: -4, base: -4 } } }
        }
      }
    ]
  }
]);

POTUS.define("balance", {
  tagNames: {
    attention_player: { name: "会玩注意力", desc: "2016 年就看懂了「手机里的火」比民调管用。", effect: "基层与舆论场吃得开，老建制对你始终存疑。" },
    institutionalist: { name: "守程序的人", desc: "在人人掀桌的夜里替规则说了话。", effect: "当晚不带货，事后却被当成清醒者，上层信得过。" },
    elite_contempt: { name: "「鄙视选民」的话柄", desc: "一句失言被剪成永远的十五秒。", effect: "每次露面都被翻出来的旧账。" },
    fact_defender: { name: "较真的辟谣者", desc: "对假新闻一条条硬碰硬。", effect: "赢了讲理的人，却总在流量上吃亏。" },
    data_broker: { name: "卖过选民数据", desc: "把个人级名单交给了黑箱公司。", effect: "随时可能被翻出的一笔隐私旧账。" },
    data_clean: { name: "用了数据留了手", desc: "买了精准投放却拒交个人数据。", effect: "同行爆雷时，你是少数干净的那个。" },
    ground_game: { name: "笨办法的人", desc: "不买算法，把钱砸在挨家挨户上。", effect: "基层接触扎实，舆论场上却少了点「高科技」。" },
    election_steward: { name: "计票守夜人", desc: "在不信任的夜里守住了程序透明。", effect: "建制与讲理者信你，愤怒的一方嫌你「不作为」。" },
    denier: { name: "点过不信的火", desc: "为稳自己人跟着质疑选举结果。", effect: "一旦风向转变，这把火会连你自己一起烧。" }
  }
});
