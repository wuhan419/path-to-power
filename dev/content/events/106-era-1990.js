/* ============================================================================
 * CONTENT · events/106-era-1990.js
 * 时代：1990 海湾与冷战终结 —— 直播战争、经济疲软与「第三党」戏言、历史终结的余温。
 * 铁律见 docs/CONTENT-SCHEMA.md §11。人脉只用已登记的 8 个。
 * ==========================================================================*/

POTUS.define("event", [

  /* ------------------------------------------------------------------------
   * 1) 沙漠风暴 —— 第一场被直播的战争（大事件，锚点 1 月）
   * ---------------------------------------------------------------------- */
  {
    id: "gulf91_storm", grade: "major", category: "foreign",
    valence: "risk", dyn: true,
    era: ["1990_GULF"], tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["print", "radio", "tv", "cable"], month: 1,
    title: "导弹拖着光尾划过夜空，全世界都在看",
    body: "伊拉克吞并科威特数月后，联军开打。电缆新闻网把摄像头架在酒店窗口，\n" +
      "空袭画面第一次实时传进每一间客厅。支持还是反对，一夜之间变成一道压在每个民选官员头上的题。\n" +
      "你本地的阿拉伯裔商户，正等着看你怎么开口。",
    brief: {
      lede: "一场打得很快、看得很真的战争。你可以顺着爱国浪潮走，也可以替少数的人说句话。",
      known: [
        "这事砸到你手上，是因为你有份决议要在本地议会被拿来表态「挺不挺部队」；反对被等同于反战，反战被等同于不爱国。",
        "联合国给了最后期限，多数美国人这次支持动武，支持率冲到历史高点。",
        "你选区里的阿拉伯裔家庭一夜之间成了怀疑对象，商户电话被打爆。"
      ],
      rumor: [
        "有人说这场仗是为了石油，跟「解放」没多大关系，只是没人敢说。",
        "有人说上面早决定要打，联合国期限只是走个程序。"
      ],
      unknown: [
        "这场「速胜」会不会变成一个再也甩不掉的海外包袱。",
        "此刻你为少数族裔说的那句公道话，将来是护身符还是催命符。"
      ],
      terms: [
        { k: "沙漠风暴", v: "1991 年联军以空中打击为主、地面战极短的伊拉克战争，史上首场被电视全程直播的战争。" }
      ]
    },
    choices: [
      {
        id: "patriot", text: "坚定挺战：投票支持部队，站上爱国的浪头",
        note: "骑在最高的支持率上最安全，可一旦战争拖长、伤亡传来，这份高调会反噬。",
        base: 0.62, mods: [{ src: "fac", key: "military", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你挺战的表态被本地报纸登在头版，慰问部队时人人抢着和你合影。速胜的光环暂时全归了你。",
            effects: { rep: 1, tier: 1, fac: { military: 12, establishment: 8, base: 5 } } },
          ok: { body: "你顺着爱国浪潮走，安全又讨喜。只是阿拉伯裔商户从此对你关上了门。",
            effects: { rep: 0.6, fac: { military: 8, establishment: 4, base: -4 } } },
          meh: { body: "你挺了战，可风头全被更大的名字抢走，你只是千百个「支持部队」里的一个。",
            effects: { rep: 0.2, fac: { military: 4 } } },
          fail: { body: "你调子起太高，等首批阵亡名单传来，选区开始有人问「当初是谁喊得最响」。",
            effects: { rep: -0.4, fac: { base: -6, military: 3 } } },
          critfail: { body: "你挺战最力的录像被对手剪成「他要打仗」的竞选广告。速胜也救不了你被放大的好战形象。",
            effects: { rep: -0.9, fac: { base: -10, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "caution", text: "谨慎问一句：仗要打多久，之后怎么办",
        note: "不当阻战派，只提「战后」。这种技术性质疑最容易被两头各打五十大板。",
        base: 0.52, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "attr", key: "INTG", w: 0.25 }],
        outcomes: {
          crit: { body: "你一句「胜利之后呢」在速胜后被反复引用，成了「有远见的少数人」。当时被骂，事后被夸。",
            effects: { rep: 0.8, fac: { press: 6, establishment: 4, base: 4 } } },
          ok: { body: "你提了战后问题，措辞谨慎没被扣帽子，反而显出分量。",
            effects: { rep: 0.3, fac: { establishment: 4 } } },
          meh: { body: "你的担忧被爱国声浪盖了过去。你说得对，但没人当时愿意听。",
            effects: { rep: 0.1, fac: { military: -3 } } },
          fail: { body: "在人人挺战的时候你问「为什么打」，被剪辑成「他更像站在萨达姆一边」。",
            effects: { rep: -0.6, fac: { military: -8, base: -6 }, flags: ["scandal_1"] } },
          critfail: { body: "你的谨慎被同时打成「通敌」和「优柔」，两个词一起上了对手的广告。",
            effects: { rep: -1, fac: { military: -10, establishment: -6, base: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "protect", text: "先顾家里：公开为被怀疑的阿拉伯裔商户说话",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.5 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "在人人自危的爱国潮里，你公开替被泼脏水的商户说了话。他们社区的感激是终身的，且会在下一次选举里变成实打实的票。",
            effects: { rep: 0.9, fac: { base: 10, church: 8, civil: 6, establishment: -4 }, flags: ["minority_guard"] } },
          ok: { body: "你护住了本地商户，他们记你的情。主流那边对你多了几分嘀咕。",
            effects: { rep: 0.4, fac: { base: 6, church: 4 } } },
          meh: { body: "你说了公道话，商户感激，但风头上的你没能改变什么。",
            effects: { rep: 0.2, fac: { base: 3 } } },
          fail: { body: "你替「被怀疑的人」说话，被反咬成「你怀疑美国」。逻辑绕了一圈，脏水泼回你身上。",
            effects: { rep: -0.6, fac: { military: -6, base: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "你护商户的声明被做成「他不挺部队」的传单，在退伍军人聚集的社区广为流传。",
            effects: { rep: -0.9, fac: { military: -10, base: -6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 2) 「别投第三党」——1992 经济与投机候选人（仕途/党务）
   * ---------------------------------------------------------------------- */
  {
    id: "gulf92_economy", grade: "mid", category: "career",
    valence: "risk", dyn: true,
    era: ["1990_GULF"], tierMin: 1, tierMax: 5, weight: 11,
    medium: ["print", "radio", "tv", "cable"],
    title: "战争赢了，可加油站门口的队伍在变长",
    body: "仗打完了，油价回落，可国内经济却蔫了：工厂外迁、失业上升、税改承诺被自己人打破。\n" +
      "一个嗓门很大的亿万富翁开始认真张罗第三党，把两党的候选人一起骂。民调显示他真能抢走一大票。\n" +
      "党部给你打电话：你得想办法让本党的人「别跑去看那个富翁」。",
    brief: {
      lede: "胜利救不了钱包。一个搅局的富豪出现时，各党的第一反应是堵漏，不是反思。",
      known: [
        "党部来找你，是因为你在本地既说得上话又懂怎么劝退摇摆者，任务明确：把想跑的人拉回来。",
        "经济疲软让在位者支持率跳水，第三党的投机正好卡在这个缝里。",
        "「不开除第三名」是当年的流行调侃——意思是他虽赢不了，却能把水搅浑。",
        "你可以正面打，也可以悄悄把话说回你自己的选区。两条路的账不一样。"
      ],
      rumor: [
        "有人说那位富翁只是想要一张更大的牌桌，谈妥了就撤。",
        "有人说真正危险的不是他当选，是他把关键议题整个带跑偏。"
      ],
      unknown: [
        "第三党会不会就此把两党结构撬开一条长期的缝。",
        "你这次替机器堵漏，机器会记住，还是用完就忘。"
      ],
      terms: [
        { k: "第三党", v: "在两党之外参选的政党或投机候选人，常靠经济不满与媒体曝光搅局。" }
      ]
    },
    choices: [
      {
        id: "attack", text: "正面开打：把这个富翁打成「分裂者的闹剧」",
        note: "为机器挡子弹的脏活。挡住是忠臣，挡歪了反衬得你也没底气。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "establishment", w: 0.35 }],
        stake: { fun: true, fav: true },
        outcomes: {
          crit: { body: "你一套组合拳把第三党的热度打了下来，本党选民归心。党魁在闭门会上当着众人的面点了你的名。",
            effects: { rep: 1.5, tier: 1, fav: 2, fac: { establishment: 12, base: 5 } } },
          ok: { body: "你替本党稳住了阵脚。那位富翁没掀起大浪，你也没被记成主角，但机器认你的力。",
            effects: { rep: 0.8, fac: { establishment: 8 } } },
          meh: { body: "你打了，可富翁自己会打自己，用不着你。你成了背景板。",
            effects: { rep: 0.2, fac: { establishment: 3 } } },
          fail: { body: "你越骂富翁，富翁越火——你替他做了免费广告。本党选民反而觉得你站错了边。",
            effects: { rep: -1, fac: { establishment: -6, base: -5 }, flags: ["scandal_1"] } },
          critfail: { body: "你替机器打的黑料反被富翁原样甩回你身上，还附了实据。你成了那场闹剧里最狼狈的配角。",
            effects: { rep: -1.75, fac: { establishment: -8, press: -8, base: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "absorb", text: "不打人，抢议题：把选民不满的经济话替他们说出来",
        note: "釜底抽薪：把第三党靠的那股气接过来，风险是显得你对本党「不够忠诚」。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.35 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "你抢先把「工作、工厂、加油站」挂在嘴边，选民觉得「要说的话你说了」，第三党的由头一下小了一半。",
            effects: { rep: 1.75, fac: { base: 12, labor: 6, establishment: -4 } } },
          ok: { body: "你借了选民的气，议题被你带回来了。第三党降温，你也长了分量。",
            effects: { rep: 1, fac: { base: 8 } } },
          meh: { body: "你想抢议题，抢得不太顺。选民各信各的。",
            effects: { rep: 0.4 } },
          fail: { body: "你替选民说狠话，被本党当成「学对手拆自己台」。两头都不落好。",
            effects: { rep: -0.8, fac: { establishment: -8, base: 3 } } },
          critfail: { body: "你的「亲民经济话」被本党定性为「里应外合」，机器开始找你的替补。",
            effects: { rep: -1.5, fac: { establishment: -12, base: 4 }, flags: ["party_traitor"] } }
        }
      },
      {
        id: "watch", text: "不掺和：让大人物去打，我守好我这一亩三分地",
        base: 0.68, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你袖手旁观，让全国机器去打那场乱仗。你既没得罪富翁的支持者，也没折损在败选里——稳。",
            effects: { rep: 0.6, fac: { base: 3 } } },
          ok: { body: "你没掺和。党魁或许有点失望，但你没把自己耗在一场不属于你的战争里。",
            effects: { rep: 0.2 } },
          meh: { body: "你袖手，机器却记着「关键时刻他没出力」。",
            effects: { rep: -0.2, fac: { establishment: -3 } } },
          fail: { body: "你没帮忙，选后清算时「你当时在哪」成了顶到你头上的问题。",
            effects: { rep: -0.6, fac: { establishment: -5 } } },
          critfail: { body: "你想两头不得罪，结果两边都觉得你没站对。你躲过了大战，却输给了秋后算账。",
            effects: { rep: -1.25, fac: { establishment: -6, base: -3 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 3) 历史终结的余温 —— 和平红利去哪（外交/金钱）
   * ---------------------------------------------------------------------- */
  {
    id: "gulf91_peace", grade: "mid", category: "foreign",
    valence: "boon", dyn: true,
    era: ["1990_GULF"], tierMin: 2, tierMax: 5, weight: 10,
    medium: ["print", "radio", "tv"],
    title: "墙倒了，军费还在，有人说该把钱花回国内",
    body: "苏联解体，冷战结束。有人开始喊「和平红利」：把军费省下来修桥、办学校、还国债。\n" +
      "也有人警告别自作聪明：一个没了对手的霸权，比从前更需要肌肉。你手上一份「砍还是留」的表决正卡着。",
    brief: {
      lede: "一个时代的结束，意味着一批人的饭碗和一整笔钱的去向都要重新洗牌。",
      known: [
        "这份表决落到你手上，是因为你的选区里既有吃军工饭的工厂，也有等钱修路建校的选民——两头都是你的票。",
        "军工承包商正密集游说，主打「不能自废武功」。",
        "财政鹰派则盯着赤字，想把省下的军费拿去还债或投国内。"
      ],
      rumor: [
        "有人说真正的威胁没了，剩下的军费全是承包商自家人在分。",
        "也有人说旧对手散了，新的麻烦正在中东冒头，千万别急着砍。"
      ],
      unknown: [
        "十年后会不会冒出一个新敌人，让你今天砍的每一笔军费都变成把柄。",
        "把钱投向国内的那份政绩，够不够撑到你下次连任。"
      ],
      terms: [
        { k: "和平红利", v: "冷战结束后把军费转向国内民生与还债的主张；「红利」能否兑现，是当年最大分歧。" }
      ]
    },
    choices: [
      {
        id: "dividend", text: "砍军费投国内：把这笔钱拿回来修桥建校",
        note: "回应「后冷战」的乐观情绪，赌新威胁短期不会冒头。承包商与军方会跟你算账。",
        base: 0.52, mods: [{ src: "attr", key: "INTG", w: 0.35 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你把一笔军费转成了本地的学校与公路。剪彩那天你成了「和平带来实惠」的活证据，承包商的眼刀你没躲开。",
            effects: { rep: 1.75, fac: { base: 10, labor: 6, military: -10, commercial: -6 }, flags: ["peace_dividend"] } },
          ok: { body: "你砍了军费投了国内，选民得了实惠，军工记了仇。",
            effects: { rep: 1, fac: { base: 6, military: -6 } } },
          meh: { body: "你砍了，可省下的大多被拿去还债，本地没见着几块砖。实惠说不清，仇倒是结结实实。",
            effects: { rep: 0.2, fac: { military: -5 } } },
          fail: { body: "你砍军费的当口，海外突然冒出一场新危机。你从「有远见」一夜之间变成「自废武功的人」。",
            effects: { rep: -1.25, fac: { military: -12, establishment: -6 }, flags: ["scandal_1"] } },
          critfail: { body: "你主导的裁军遇上新威胁，一笔原本该建的工厂也黄了。军工和失业工人第一次联手把你写进同一期负面报道。",
            effects: { rep: -2, fac: { military: -12, labor: -8, base: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "muscle", text: "保住军费：一个没有对手的霸权更需要肌肉",
        note: "顺着承包商与军方走。眼下稳，代价是把「和平红利」那份民意拱手让给对手。",
        base: 0.6, mods: [{ src: "fac", key: "military", w: 0.4 }, { src: "fac", key: "commercial", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你力保军费，承包商的工厂保住了，献金也照来了。你成了「懂国防更懂经济」的自己人。",
            effects: { rep: 1, fun: 3.5, fac: { military: 10, commercial: 10, establishment: 6 } } },
          ok: { body: "军费保住了，本地工厂没裁员。军工满意，等学校翻新的选民有点失望。",
            effects: { rep: 0.4, fac: { military: 6, commercial: 6, base: -4 } } },
          meh: { body: "你保了军费，可这理由在「仗打完了」的空气里听着别扭。落个「维护旧机器」。",
            effects: { fac: { military: 4, base: -3 } } },
          fail: { body: "在举国喊「和平红利」的时刻你死保军费，被贴上了「战争红利维护者」的标签。",
            effects: { rep: -1, fac: { base: -8, commercial: 4 }, flags: ["scandal_1"] } },
          critfail: { body: "你保军费的照片和承包商晚宴被连在一起登了报。「谁的钱，谁受益」——标题写得清清楚楚。",
            effects: { rep: -1.75, fac: { base: -10, press: -8 }, flags: ["bought", "scandal_2"] } }
        }
      },
      {
        id: "trim", text: "折中：小幅裁减、承诺把钱留一部分在本地",
        base: 0.64, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你玩了一手漂亮的技术活：既报了「和平红利」的名，又把关键的几笔留在了本地工厂。两头都不得罪。",
            effects: { rep: 1, fac: { base: 4, military: 3, commercial: 3 } } },
          ok: { body: "你小裁一点、留一点，各方都觉得「他至少没裁到我头上」。",
            effects: { rep: 0.4, fac: { base: 2 } } },
          meh: { body: "你的折中谁都不满意，可谁也不至于翻脸。中庸的代价是存在感低。",
            effects: { rep: 0.2 } },
          fail: { body: "你想两头讨好，结果两头都觉得你藏了私心。",
            effects: { rep: -0.6, fac: { military: -4, base: -3 } } },
          critfail: { body: "你的折中被两头各挑一半出来骂：军工说你要拆工厂，改革派说你在替军工挡刀。",
            effects: { rep: -1.25, fac: { military: -6, base: -5 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 4) 谈话电台的深夜来电 —— 小事（舆论/八卦）
   * ---------------------------------------------------------------------- */
  {
    id: "gulf93_talkradio", grade: "minor", category: "media",
    valence: "risk", dyn: true,
    era: ["1990_GULF"], tierMin: 0, tierMax: 3, weight: 10,
    medium: ["radio", "cable", "tv"],
    title: "一档火辣的谈话电台邀你连线",
    body: "一个靠激愤起家的电台主播点名要「请某某上台对线」。他的节目不讲道理，只讲情绪，\n" +
      "而且专挑政治人物的软肋下手。连上去痛快，可话筒那头，剪辑的剪刀早就磨好了。",
    brief: {
      lede: "这类电台不怕你骂它，就怕你不来；而你一来，输赢就不由你说什么定了。",
      known: [
        "主播点你的名，是因为你之前拒绝过一次采访，被他做成了「心虚不敢来」的话题。这次你被将军了。",
        "这类节目的受众忠诚度极高，一段被抓拍的失态能播一整年。",
        "你的对手正在监听这场节目，等着你自己说错话。"
      ],
      rumor: [
        "有人说主播和某个竞选团队私下有交易，专门给对手挖坑。",
        "也有人说这类节目其实最能圈粉——敢上、敢顶，反而一夜涨粉。"
      ],
      unknown: [
        "你今晚是被剪成笑话，还是被捧成「敢跟媒体叫板的硬汉」。",
        "这段音频会流传多久。"
      ],
      terms: [
        { k: "谈话电台", v: "1980-90 年代崛起的以主持人与来电者交锋为主、情绪大于事实的广播形态。" }
      ]
    },
    choices: [
      {
        id: "go", text: "接招上节目，用他的规则打他",
        note: "高风险高回报：顶得住圈粉，破防了就是全国笑柄。",
        base: 0.48, mods: [{ src: "attr", key: "CHA", w: 0.5 }, { src: "attr", key: "CUN", w: 0.3 }],
        stake: { ap: true },
        outcomes: {
          crit: { body: "你在直播间里谈笑自若，反将了主播一军。当晚本地话题全是你，「这人敢上、还会说」一夜传开。",
            effects: { rep: 2.75, fac: { base: 8, press: 4 } } },
          ok: { body: "你顶住了主播的挑衅，还抢了几句好话。没大获全胜，也没输。",
            effects: { rep: 1.25, fac: { base: 3 } } },
          meh: { body: "你被主播牵着走了一晚上，勉强全身而退，没留下什么好片段。",
            effects: { rep: -0.4, hp: -1 } },
          fail: { body: "你被主播连环追问逼到语塞，那句「我……这个嘛」被剪成了当晚片花。",
            effects: { rep: -2, fac: { press: -6, base: -3 }, flags: ["scandal_1"] } },
          critfail: { body: "你恼羞成怒在直播里说了句没退路的话，这段录音在你下次竞选时以完整版重播。",
            effects: { rep: -3, fac: { press: -10, base: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "refuse", text: "不接：公开说「我不参加这种秀」",
        note: "避开陷阱，却也坐实了主播那句「他不敢来」。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你一句「我不陪跑这种噱头」说得云淡风轻，反倒显得你比他高一个段位。他没钓着你，还失了分寸。",
            effects: { rep: 1.5, fac: { establishment: 5, base: 2 } } },
          ok: { body: "你优雅地躲开了坑。主播有点扫兴，但你没失态。",
            effects: { rep: 0.8 } },
          meh: { body: "你拒了，主播立刻把「他不敢来」挂上了节目。你什么都没做错，却总差一口气。",
            effects: { rep: -0.4, fac: { base: -2 } } },
          fail: { body: "你的拒绝被反复播报成「他怕了」，这种软刀子不致命，却一直割你。",
            effects: { rep: -1.25, fac: { base: -4 } } },
          critfail: { body: "你不仅拒了还放了句狠话，结果狠话被主播拿去当开场白，一整周都拿你开涮。",
            effects: { rep: -2.5, fac: { press: -6, base: -4 } } }
        }
      },
      {
        id: "pivot", text: "把话筒推回去：反问他「你收了谁的钱这么卖力」",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        outcomes: {
          crit: { body: "你一句话把焦点从你身上转到他的金主身上，主播难得语塞。「谁付他钱」的话题第一次反过来缠上了他。",
            effects: { rep: 2, fac: { base: 5, press: -2 } } },
          ok: { body: "你反将一军，让攻防至少短暂地倒了过来。没大获全胜，但扳回一局。",
            effects: { rep: 0.8, fac: { base: 3 } } },
          meh: { body: "你反问了一句，可这是他的地盘，他一笑就把话头绕了过去。",
            effects: { rep: -0.4 } },
          fail: { body: "你反咬他的金主，却没拿出证据，倒显得你气急败坏。他乐得把你钉成「输不起」。",
            effects: { rep: -2, fac: { press: -5, base: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "你的指控被人当场拆穿，你在直播里的失态被做成了对手竞选广告的原型镜头。",
            effects: { rep: -3.5, fac: { press: -8, base: -6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  }
]);
