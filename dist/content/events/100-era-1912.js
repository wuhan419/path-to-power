/* ============================================================================
 * CONTENT · events/100-era-1912.js
 * 时代：1912 进步时代 —— 反垄断的怒火、托拉斯、工人、妇女选举权、机式政治。
 * 结构契约见 docs/CONTENT-SCHEMA.md；写作铁律见 docs/EVENT-WRITING-BRIEF.md。
 * 经济：投资型用 funMul；消费型 ok 档必须给看得见的非钱回报；每个事件留保底选项。
 * ==========================================================================*/

POTUS.define("event", [

  /* ------------------------------------------------------------------------
   * 1) 三党决裂 —— 1912 大选的历史级事件（旧共和党内讧，进步派另立门户）
   * ---------------------------------------------------------------------- */
  {
    id: "p1912_split", grade: "major", category: "political",
    era: ["1912_PROGRESSIVE"], tierMin: 1, tierMax: 5, weight: 12, unique: true,
    month: 8, day: 5,   // 1912 年 8 月 5 日 老罗斯福在芝加哥宣告接受进步党提名
    title: "老罗斯福另立了一棵树",
    body: "共和党的全国代表大会把提名判给了在位的总统。老罗斯福的支持者当场退场，\n" +
      "有人在台下喊：「我们自带一只摩尔。」新党要在几周内拼出一张全国选票。\n" +
      "他们来找你——因为你在本郡的登记表上还有人脉。",
    brief: {
      lede: "党内机器判你输，你就自己搭一台机器。问题是新牌桌没有椅子。",
      known: [
        "你能进进步党这场会，是因为罢工调解那半年你在选区攒下了「敢说硬话」的名声，党部书记员主动打了电话。",
        "老罗斯福要竞选，但许多州的党机器握在建制派手里——新党在很多州根本挤不上选票。",
        "你手上有一批还认你的基层登记者，和一个肯替你垫印刷费的印务商。",
        "建制的共和党有党徽和钱；进步党只有名字和一股火。"
      ],
      rumor: [
        "有人说老罗斯福其实不打算真选，只是要逼建制派在初选让路。",
        "有人说分裂只会把大选送给民主党——你们是在替对手清场。"
      ],
      unknown: [
        "分裂会不会让你「背叛本党」的标签跟你一整辈子。",
        "如果新党垮了，建制派的党机器会不会重新接纳你。"
      ],
      terms: [
        { k: "摩尔", v: "1912 年进步党的标志是一只公摩尔，用来在 ballot 上给不识字的选民指认。" },
        { k: "选票准入", v: "一个新政党要在每州单独凑够签名才能印上选票， machinery 被老党垄断时极难。" }
      ]
    },
    choices: [
      {
        id: "allin", text: "把本郡的登记表全部押给新党",
        note: "赌的是「分裂能长成新秩序」。押上你多年攒下的基层人脉，一输就两头不是人。",
        base: 0.45, mods: [{ src: "fac", key: "base", w: 0.45 }, { src: "attr", key: "CUN", w: 0.3 }],
        cost: { fav: 2 }, stake: { ap: true },
        outcomes: {
          crit: { body: "你的登记员把新党的摩尔送进了半个州的票站。老罗斯福在这里赢了，你成了新秩序里「最早信他的人」。",
            effects: { rep: 14, tier: 1, fac: { base: 16, establishment: -10 }, flags: ["progressive_soul"] } },
          ok: { body: "新党在本郡站住了脚。你没到大红大紫，但基层从此认你这条敢换旗的汉子。",
            effects: { rep: 7, fav: 1, fac: { base: 10, establishment: -6 } } },
          meh: { body: "你换了旗，选票却没跟着换。进步党在本郡拿了个不痛不痒的第三名。",
            effects: { rep: 2, fac: { base: 3, establishment: -4 } } },
          fail: { body: "老罗斯福输了，建制派重新合拢。你被本党当成「那个分裂的人」，机器开始绕着你转。",
            effects: { rep: -6, fac: { establishment: -16, base: -4 } } },
          critfail: { body: "你押得太满，本党输了大选，报纸把你写成「替对手清场的叛徒」。两党都不再要你的人。",
            effects: { rep: -12, fav: -2, fac: { establishment: -22, base: -8 }, flags: ["party_traitor"] } }
        }
      },
      {
        id: "hedge", text: "人往新党去，钱和机器留在老党",
        note: "两头下注。名声上落不到好处，但无论谁赢你都还有退路。",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "大选后你两头都能说上话：新党记得你站台的情，老党没丢你上供的账。你升了一级，谁都没恨你。",
            effects: { rep: 5, tier: 1, fac: { base: 5, establishment: 5 } } },
          ok: { body: "你赌对了格局没赌对边。没大涨，但没塌，退路一条不少。",
            effects: { rep: 3, fac: { base: 3 } } },
          meh: { body: "两头都觉得你不够意思，又都懒得跟你计较。你成了个「谁也不得罪也谁不信」的人。",
            effects: { rep: -1 } },
          fail: { body: "两边事后都对上了账，发现你两头递话。谁都没赢，你两头失信。",
            effects: { rep: -4, fac: { establishment: -6, base: -5 } } },
          critfail: { body: "你的骑墙被两家报纸同时写了出来。「机会主义」这四个字第一次和你的名字印在一起。",
            effects: { rep: -8, fac: { establishment: -10, base: -10 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "stay", text: "不换旗。守住本党这块牌子",
        base: 0.72, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "分裂潮退去后，机器记着「这人没跑」。党魁在闭门名单里替你留了位子。",
            effects: { rep: 4, fac: { establishment: 10, base: 4 } } },
          ok: { body: "你没换旗。这年头没落好处，但党内你的位子稳着。",
            effects: { rep: 2, fac: { establishment: 6 } } },
          meh: { body: "你守着本党，看着新党把话题全抢走。稳是稳，就是没人再提你。",
            effects: { rep: 1 } },
          fail: { body: "党机器把分裂的账算到「不够热心」的人头上，你被划进去了。",
            effects: { rep: -3, fac: { establishment: -8 } } },
          critfail: { body: "你留下替本党说话，反被进步派报纸当成「托拉斯的看门狗」点名。两头都唾你。",
            effects: { rep: -6, fac: { base: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 2) 扒粪记者的敲门 —— 黑幕揭载时代（消费型：请律师压稿 vs 顺势揭黑）
   * ---------------------------------------------------------------------- */
  {
    id: "p1912_muck", grade: "mid", category: "media",
    era: ["1912_PROGRESSIVE"], tierMin: 0, tierMax: 4, weight: 11,
    medium: "print",
    title: "一份杂志在写这座城市的污水",
    body: "一个城外的杂志记者进了城，挨家问工厂的工时和童工。他手上有一沓你不想见到的收据。\n" +
      "他在稿子见刊前先来「给你个回应的机会」——这句话在任何年代都只有一个意思。",
    brief: {
      lede: "要么你替他把稿子捅得更大，要么你想办法让它变小。两条路的价钱不一样。",
      known: [
        "你之所以被找上，是因为去年你在这几家的厂门口露过面、替他们说过一句「情况没那么糟」。",
        "他手上的收据有一部分是真的，有一部分是从旧账里翻出来的。",
        "这份杂志的销量靠的就是这种稿子——他不缺发表的地方。",
        "厂方还没请律师。谁先动，谁就定了这件事的调子。"
      ],
      rumor: [
        "有人说记者的线人其实是被厂里开除的一名工头。",
        "有人说厂方准备反告他诽谤，让他自己先怂。"
      ],
      unknown: [
        "如果你顺着他揭，最后被烧到的是厂方还是你这个说过话的人。",
        "那些收据里到底有没有哪一张写着你的名字。"
      ],
      terms: [
        { k: "扒粪", v: "进步时代记者专揭企业与政界黑幕的报道风潮，因一句「光鲜表面下的粪堆」得名。" }
      ]
    },
    choices: [
      {
        id: "ride", text: "借他的火：公开声援调查，逼厂方整改",
        note: "把揭黑变成自己的政绩。厂方与建制会记仇，但基层与舆论会记住你站对了边。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.35 }],
        outcomes: {
          crit: { body: "你在厂门口念出了那份工时表。杂志加印一期，你的名字和「敢说话」印在了一起，工会第一次主动来要你的电话。",
            effects: { rep: 9, fac: { base: 12, press: 10, commercial: -10 }, contact: { columnist: 10 }, flags: ["muckrider"] } },
          ok: { body: "你顺势成了「要求透明的人」。厂方恼火，但报纸站在你这边。",
            effects: { rep: 5, fac: { base: 7, press: 6, commercial: -6 } } },
          meh: { body: "你跟着喊了整改，稿子照发，厂方照旧。你既没借到火，也没真挡着。",
            effects: { rep: 2, fac: { commercial: -3 } } },
          fail: { body: "记者转头写了一篇「连某某议员都在替厂方打掩护」，把你顺带钉进了稿子里。",
            effects: { rep: -5, fac: { press: -8, base: -4 } } },
          critfail: { body: "那些收据里有一张牵到你的旧捐款。报道的标题从工厂改成了你。",
            effects: { rep: -10, fac: { press: -12, commercial: -8 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "bury", text: "花钱请律师，把这期稿子压下去",
        note: "消费型：$45k 买沉默。压得住是你赢，压不住就变成「他心虚要封口」的头条。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "res", key: "fun", min: 60000, w: 0.2 }],
        cost: { fun: 45000 }, req: { fun: 45000 },
        outcomes: {
          crit: { body: "律师抓住了两处硬伤，杂志主动撤了稿。厂方把你当「能平事的人」，下一笔政治捐款打到了你的池子。",
            effects: { rep: 5, fac: { commercial: 12, establishment: 6 }, fun: 30000 } },
          ok: { body: "稿子被压了半版，改成了不痛不痒的「双方各执一词」。你没出名，但厂方欠你一份人情。",
            effects: { rep: 5, fav: 2, fac: { commercial: 8 } } },
          meh: { body: "钱花了，稿子还是照发，只是晚了一周。你买了个「尽力过」。",
            effects: { rep: 1, fac: { commercial: 3 } } },
          fail: { body: "律师的信被记者当成了新料，标题变成「有人出钱堵我的嘴」。你反而送了他一个更好的故事。",
            effects: { rep: -6, fac: { press: -10, commercial: -6 }, flags: ["scandal_1"] } },
          critfail: { body: "封口不成，还留下白纸黑字的付款凭证。这不再是工厂的事，是你的事。",
            effects: { rep: -12, fac: { press: -14, base: -8 }, flags: ["scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "dodge", text: "不压不捧，只回应一句「相信程序」",
        base: 0.68, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你一句克制的回应让记者没抓到爆点，稿子发了但你干净离场。有人开始觉得你「分寸拿得住」。",
            effects: { rep: 4, fac: { establishment: 5, press: 3 } } },
          ok: { body: "稿子发了，你的名字出现在中段，不痛不痒。你什么都没赌，也什么都没丢。",
            effects: { rep: 1 } },
          meh: { body: "你的场面话被剪成一段「他什么也没说」。不算坏事，只是没用。",
            effects: { rep: -1 } },
          fail: { body: "记者追着要你对童工表态，你含糊了三次，第四次念出「程序」时记者笑了。",
            effects: { rep: -3, fac: { base: -4, press: -4 } } },
          critfail: { body: "你躲过了这场，可下期的封面把「逃避追问」做成了整版。躲，本身成了新闻。",
            effects: { rep: -6, fac: { press: -8, base: -5 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 3) 妇女选举权的游行 —— 站台还是挡道（身份驱动：低层级可投入浪潮）
   * ---------------------------------------------------------------------- */
  {
    id: "p1912_suffrage", grade: "mid", category: "civil",
    era: ["1912_PROGRESSIVE"], tierMin: 0, tierMax: 3, weight: 10,
    medium: "print",
    title: "第七大道上要过一支游行",
    body: "妇女选举权的队伍要从你选区的主街走过。党部来函：这类「激进妇女」的事，你最好别露脸。\n" +
      "但街上有一半人是选民，她们问的只有一句：到时候你站在哪一边？",
    brief: {
      lede: "一件还没被历史判定的事，逼你现在选边。",
      known: [
        "你能收到这封党部来函，是因为你是登记在册的党员，机器默认你会照办。",
        "游行是合法的，但本党上层把它当「给对手送票的乱局」。",
        "你的选区里有不少女性户主，她们虽还不能投票，却替全家管着钱袋子和舆论。",
        "另一边的对手已经在盘算：如果党员出来站台，能把多少人拉进未来的选民册。"
      ],
      rumor: [
        "有人说游行队伍里会有一批来砸场的爱尔兰码头工。",
        "有人说党部真正怕的不是选举权，是给工人投票权会稀释他们手上的票。"
      ],
      unknown: [
        "几年后会不会真有一条修正案让这事变成你「早看对了」的凭证。",
        "如果你此刻挡道，那些户主要记多久。"
      ],
      terms: [
        { k: "选举权修正案", v: "让女性获得联邦投票权的宪法修正案，本时代仍在街头争取，尚未过关。" }
      ]
    },
    choices: [
      {
        id: "march", text: "站到队伍前面去，替她们念一段",
        note: "把「激进」接下来变成「先知」。上层会冷脸，但未来的选民册会记得你。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.45 }, { src: "fac", key: "base", w: 0.3 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "你的念词被报纸整版转载，另一城的选举权协会来函邀你当名誉理事。你上了一个「敢替无声者说话」的档位。",
            effects: { rep: 8, fac: { base: 12, press: 8, establishment: -8 }, flags: ["suffrage_friend"] } },
          ok: { body: "你站了台，码头上果然有人起哄，但你没退。街上的户主记住了这张脸。",
            effects: { rep: 5, fac: { base: 8, establishment: -5 } } },
          meh: { body: "你去了，话说到一半被一阵口哨盖过去。姿态摆了，效果一般。",
            effects: { rep: 2, fac: { base: 3, establishment: -3 } } },
          fail: { body: "党部把你站台的照片寄给了本党的金主，附了一句「他疯了」。",
            effects: { rep: -4, fac: { establishment: -10, commercial: -6 } } },
          critfail: { body: "游行被砸场，你在推搡里摔了一跤，报纸拍到你坐在地上扶着一名游行者。标题是「议员的狼狈」。",
            effects: { rep: -7, hp: -3, fac: { establishment: -8, base: -3 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "quiet", text: "不站台，但私下替她们递一封陈情书",
        note: "出力不出头。风险低，回报也低，可两头都说你「还算公道」。",
        base: 0.66, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你那封措辞得体的陈情书被递进了州议会，成了首次听证桌上少见的「来自党内的声音」。没人给你登报，但办事的人记住了你。",
            effects: { rep: 5, fav: 1, fac: { base: 6, establishment: 4 } } },
          ok: { body: "信递到了，不痛不痒地排进了程序。你既没得罪上层，也没白站街。",
            effects: { rep: 2, fac: { base: 4 } } },
          meh: { body: "信压在某个抽屉里没人动。你两头都落不着，但至少两头都没唾你。",
            effects: { rep: 1 } },
          fail: { body: "游行者觉得你比挡道的还气人——「有胆量就别只写封信」。",
            effects: { rep: -3, fac: { base: -6 } } },
          critfail: { body: "那封没署名的信被对手挖出来，两边传成「他其实两头递话」。你的分寸成了你的把柄。",
            effects: { rep: -5, fac: { establishment: -6, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "block", text: "照党部办：帮机器「维持秩序」",
        base: 0.6, mods: [{ src: "fac", key: "establishment", w: 0.4 }],
        outcomes: {
          crit: { body: "你替党部稳住了场面，上层在闭门名单里给你记了一功。街上的户主从此看你别扭，但你升得比谁都快。",
            effects: { rep: 4, tier: 1, fac: { establishment: 12, base: -8 } } },
          ok: { body: "你按机器办的，机器办事也认你。党内的路顺了，选区里的气氛冷了。",
            effects: { rep: 2, fac: { establishment: 8, base: -6 } } },
          meh: { body: "你挡了道，谁都没落好：上层觉得理所当然，下层觉得你不过如此。",
            effects: { fac: { establishment: 3, base: -4 } } },
          fail: { body: "你替机器挡游行，被记者拍下「议员替谁堵路」。这句话成了对手的现成台词。",
            effects: { rep: -5, fac: { base: -8, press: -6 } } },
          critfail: { body: "冲突升级，有游行者受伤，伤口算到了你的「维持秩序」上。你成了这桩事的招牌罪人。",
            effects: { rep: -9, fac: { base: -12, press: -8, establishment: 6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 4) 托拉斯的一顿晚宴 —— 灰色收编（低地位不该被大钱选项开放）
   * ---------------------------------------------------------------------- */
  {
    id: "p1912_trust", grade: "minor", category: "finance",
    era: ["1912_PROGRESSIVE"], tierMin: 2, tierMax: 5, weight: 9,
    medium: "print",
    title: "钢铁大亨请你在私人车厢吃饭",
    body: "一列不属于任何时刻表的火车停在侧线，车厢里铺着地毯。主人不谈钢铁，只谈「稳定」。\n" +
      "他要的不是你的钱，是你将来在某次表决里的一次沉默。这顿饭很贵，贵在你吃完就得回答。",
    brief: {
      lede: "他们不buy你的票，他们buy你的不说话。",
      known: [
        "你被请上车，是因为下个月你所在的那场表决，可能卡住他的一笔铁路并购。",
        "桌上没有合同、没有信封，只有几句「我们都希望别惹麻烦」的话——这样才安全。",
        "你到了这个位子，钱不是问题，问题是这笔钱和这句话将来能不能被洗清。"
      ],
      rumor: [
        "有人说上个月那辆车上也坐过一位，那人后来选得顺极了。",
        "也有人说那位是在替大亨白干活，账全记在人家本子上。"
      ],
      unknown: [
        "你点的那道菜，将来会不会出现在某份调查笔录里。",
        "同一节车厢里，还有谁在替对手听你说话。"
      ],
      terms: [
        { k: "托拉斯", v: "把多家同业公司并进一家控股、实质垄断一个行业的组织，进步时代反垄断的头号靶子。" }
      ]
    },
    choices: [
      {
        id: "accept", text: "收下这份「诚意」：接受资助、下次表决沉默",
        note: "钱和把柄一起来。拿了这笔，你就上了他的账，将来他想什么时候提醒你都行。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        req: { tier: 2 }, stake: { fun: true, fav: true },
        outcomes: {
          crit: { body: "你既拿了钱，又在这次并购里演得像个真中立的人。大亨满意，账上的钱和你的把柄同时变多。",
            effects: { fun: 400000, rep: 4, lev: 1, fac: { commercial: 12, establishment: 6 } } },
          ok: { body: "钱进了你背后的池子，你下次表决「恰好缺席」。谁都没抓到什么。",
            effects: { fun: 250000, lev: 1, fac: { commercial: 8 } } },
          meh: { body: "钱是拿了，可你心里没底，下次表决反而露了怯，两头都没落稳。",
            effects: { fun: 120000, rep: -2, fac: { commercial: 3 } } },
          fail: { body: "大亨觉得你「收了钱还不办事」。这笔钱变成了你欠他、且他随时会讨的东西。",
            effects: { fun: 200000, rep: -5, flags: ["compromised"] } },
          critfail: { body: "车厢里有人记着你说的每一句。三个月后，一份记录你「用沉默换了多少钱」的草稿开始在小圈子流传。",
            effects: { fun: 150000, rep: -10, fac: { press: -10, base: -8 }, flags: ["black_money", "scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "counter", text: "不接他的钱，反手把这场饭局讲给记者",
        note: "消费不了的钱变成名声。风险是他有的是办法让一个证人不体面地消失。",
        base: 0.45, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "press", w: 0.3 }],
        outcomes: {
          crit: { body: "你把这顿饭连人带菜端上了报纸。大亨的并购在舆论里黄了，你成了「托拉斯啃不动的人」。",
            effects: { rep: 12, fac: { base: 12, press: 12, commercial: -14 }, flags: ["trustslayer"] } },
          ok: { body: "报道出来了，大亨不太疼，但你挣到了「不收这份钱」的名声。",
            effects: { rep: 6, fac: { base: 8, press: 6, commercial: -8 } } },
          meh: { body: "记者信你但不敢写。你手里多了一段好故事，暂时换不成别的。",
            effects: { rep: 2, contact: { columnist: 6 } } },
          fail: { body: "大亨一句「他疯了，在编故事」就把你打发了。你既丢了钱途，又被当成不稳定的人。",
            effects: { rep: -4, fac: { commercial: -10, establishment: -6 } } },
          critfail: { body: "你反咬一口，可他先放出了你上一次私下求他的记录。谁更脏，报纸有了新答案。",
            effects: { rep: -9, fac: { press: -8, commercial: -12 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "walk", text: "不吃这顿饭，下车走人",
        base: 0.74, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你淡淡起身离开。大亨反而高看你一眼，日后有笔干净的钱正大光明地给了你——有些人只尊重拒绝过他的人。",
            effects: { rep: 5, fac: { base: 6, commercial: 4 } } },
          ok: { body: "你下了车。这顿没吃成，但也没吃坏。你的记录还是干净的。",
            effects: { rep: 2 } },
          meh: { body: "你走了，可心里一直在想那桌上到底谈了什么。什么都没得，也什么都没丢。",
            effects: { rep: 1, hp: -2 } },
          fail: { body: "你的「不给面子」传开了，本城的钱从此绕着你走。清白的代价是穷。",
            effects: { rep: -2, fac: { commercial: -8 } } },
          critfail: { body: "你下车太急，第二天的报道说「某某议员被大亨拒之门外」——清白没证成，倒像你没资格上桌。",
            effects: { rep: -5, fac: { commercial: -8, establishment: -4 } } }
        }
      }
    ]
  }
]);

/* 本包引入的新状态标记登记 */
POTUS.define("balance", {
  tagNames: {
    progressive_soul: { name: "进步派元勋", desc: "在 1912 分裂中押了新秩序，被视为进步灵魂人物。", effect: "基层与舆论长期加成，但建制派对你冷淡。" },
    muckrider: { name: "借火扒粪", desc: "顺着揭黑报道把自己塑造成了透明派。", effect: "舆论好感上升，商业派系警惕。" },
    suffrage_friend: { name: "选举权之友", desc: "在妇女还投不了票时就替她们站过台。", effect: "未来选民册扩大时你有一笔旧情可收。" },
    trustslayer: { name: "托拉斯克星", desc: "把大亨的饭局端上了报纸。", effect: "基层与舆论大涨，商业献金几乎断流。" }
  }
});
