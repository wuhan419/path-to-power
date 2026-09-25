/* ============================================================================
 * CONTENT · events/121-line-1995-98.js
 * 连续时间轴 · 1995—1998 定点大事（w02 带）。
 *
 * 覆盖主题（每卡一条，均按史实年月钉进本文件末尾 fixed）：
 *   1995-04 俄克拉荷马城爆炸 / 1995-10 世纪审判宣判 / 1996-07 客机坠海与百年公园爆炸
 *   1996-08 福利改革签法 / 1996-11 大选连任 / 1997-10 亚洲金融危机冲击美股
 *   1998-08 驻肯、坦两国使馆爆炸 / 1998-12 弹劾条款表决
 *
 * 写法铁律（见 docs/PARALLEL-CONTENT-WORK.md §4 与 CONTENT-SCHEMA §11.7）：
 *   · 不写 era —— 一律 minYear/maxYear + scoped；dyn:true，经济数值全写系数。
 *   · 每卡一个保底选项：无 cost 无 req、高地板低天花板，fail 不超过冒险项一半。
 *   · 五档结局 crit/ok/meh/fail/critfail 全写；字符串只用「」。
 *   · 正文不出现总统/候选人以外的真人姓名：爆炸案凶手、那位橄榄球明星被告、
 *     实习生的名字都以泛称处理。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 1995-04 · 俄克拉荷马城 —— 一辆卡车把联邦大楼炸开了一条街
   * ==================================================================== */
  {
    id: "ln95_okc", grade: "major", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 1995, maxYear: 1995, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 4,
    title: "一辆卡车在联邦大楼前炸开了整条街",
    body: "上午九点零二分，一辆租来的卡车在一座联邦大楼门口起爆，半条街塌成了灰白色的坑。九点刚过，孩子校车的位置上没有人。\n" +
      "全国第一个小时就锁定了嫌疑人——一个对政府憋着火的退伍军人。电视24小时轮播废墟里的婴儿床单。你在本地，话筒已经递到手边。",
    brief: {
      lede: "本土最大的爆炸案后的头几天，全国的愤怒和恐惧同时在找出口。",
      known: [
        "伤亡还在上升，联邦调查人员已经控制了现场。",
        "本地电视台要你此刻对「是不是报复」表态。",
        "镇上本就有一群对联邦执法积怨很深的住户。"
      ],
      rumor: [
        "有人说境外势力也掺了一手，正在被往下压。",
        "有人说本地极端组织里有人认识嫌疑人。"
      ],
      unknown: [
        "凶手会判死刑还是熬死狱中，没人说得准。",
        "你今晚站哪边，会被记很多年。"
      ],
      terms: [{ k: "联邦大楼", v: "联邦机构的地方办事处，常成袭击靶子。" }]
    },
    choices: [
      {
        id: "harden", text: "高调声讨恐怖主义，力挺联邦全面清剿极端组织",
        note: "赌的是举国同仇。风险：清剿过头出了滥权新闻，火烧回替你叫好的人。",
        base: 0.42, stake: { fun: true }, cost: { fun: 1.5 },
        mods: [{ src: "fac", key: "agency", w: 0.4 }, { src: "attr", key: "CUN", w: 0.25 }],
        outcomes: {
          crit: { body: "你的强硬成了本地反恐怖叙事的旗帜，执法系统与党建制同时记住你的名字，捐款电话响个不停。",
            effects: { rep: 1.5, fac: { agency: 12, establishment: 8 }, voters: { warm: 400 } } },
          ok: { body: "你顺着大气球喊了最响的一句话，安全部门对你印象不错。",
            effects: { rep: 0.5, fac: { agency: 6, establishment: 3 } } },
          meh: { body: "强硬表态的人太多，你这一句没溅起水花。",
            effects: { rep: 0.1 } },
          fail: { body: "一场滥权搜查上了全国新闻，而你此前正替这种做法大声背书。",
            effects: { rep: -1.75, fac: { base: -5, press: -4 } } },
          critfail: { body: "误伤无辜的诉讼清单被排到你面前，标题写着「他早就喊过要清剿」。",
            effects: { rep: -2.5, fac: { establishment: -6, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "mindgap", text: "警告别把火撒向所有持枪反政府的邻居",
        note: "赌的是舆论转向克制。风险：两天后若又爆出阴谋论，你成了替凶手说话的人。",
        base: 0.5,
        mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "press", w: 0.25 }],
        outcomes: {
          crit: { body: "在一片喊打里你说了「别先烧自己人」，几周后舆论回头，评论版把你列为早清醒的那几个。",
            effects: { rep: 1.3, attr: { INT: 3 }, fac: { press: 8, agency: -3 }, voters: { warm: 300 } } },
          ok: { body: "你提醒了过头的执法，本地持枪户没把你当敌人，媒体也觉得你有分寸。",
            effects: { rep: 0.4, attr: { INT: 2 }, fac: { press: 5 } } },
          meh: { body: "没人理你的降温话，都在气头上。",
            effects: { rep: -0.2 } },
          fail: { body: "「爆炸案发生第三天，他替极端分子讲公道话」——标题是这么写的。",
            effects: { rep: -1.5, fac: { establishment: -6, press: -4 } } },
          critfail: { body: "又被查出嫌疑人曾出现在你出席过的集会名单上，你百口莫辩。",
            effects: { rep: -2.3, fac: { base: -6, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "vigil", text: "不抢镜头，只在本地守夜烛光里陪着幸存者",
        note: "赌的是哀而不争。风险：什么也不说，两头都可能觉得你不够意思。",
        base: 0.6,
        mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "照片上你扶着遇难者家属，一句话没说。两份报纸把这个画面放在头版，说这才叫体面。",
            effects: { rep: 1.0, fac: { church: 7, base: 6 } } },
          ok: { body: "你在守夜的人群里站了两个小时，没人挑你的错，也没人多说什么。",
            effects: { rep: 0.55, fac: { church: 4, base: 3 } } },
          meh: { body: "你来了，点了根蜡烛，走了。",
            effects: { rep: 0.1 } },
          fail: { body: "有人说你连追思会都只露个脸，敷衍。",
            effects: { rep: -0.6, fac: { base: -3 } } },
          critfail: { body: "你缺席第二天的大规模悼念被镜头抓了个正着：照片里别人都在。",
            effects: { rep: -1.1, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1995-10 · 世纪审判 —— 无罪释放，全国当场裂成两种愤怒
   * ==================================================================== */
  {
    id: "ln95_verdict", grade: "mid", category: "civil",
    valence: "risk", dyn: true,
    minYear: 1995, maxYear: 1995, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 12, unique: true,
    medium: ["tv", "cable", "print"], month: 10,
    title: "世纪审判宣判：无罪释放，全国分成两种愤怒",
    body: "全美直播了大半年的那桩杀妻案宣判了：那位橄榄球明星被告无罪。判决念完的一秒，屏幕把国家劈成两半——一半看到正义破产，一半看到种族双标。\n" +
      "你所在的城，两种人都占了街区。本地报馆约你明天上午交一份「民选者怎么看」。",
    brief: {
      lede: "一纸判决成了身份测试题：怎么答都比案子本身更像站队。",
      known: [
        "民事赔偿官司还在后面，热度不会退。",
        "本地黑人教会与郊区住户反应完全相反。",
        "你的每一句解释都会被当成站队。"
      ],
      rumor: [
        "有人说陪审团已被证据之外的东西说服。",
        "有人说电视直播本身就在绑架判决。"
      ],
      unknown: [
        "这场愤怒会沉下去还是炸开来。",
        "你选的话题会不会反过来选中你。"
      ],
      terms: [{ k: "世纪审判", v: "全程电视直播的杀妻刑案，无罪开释。" }]
    },
    choices: [
      {
        id: "bridge", text: "不谈判决对错，只讲司法与种族信任都该修补",
        note: "赌的是中间多数想听安抚。风险：两头都觉得你滑头，热度过去无人记得。",
        base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.25 }],
        outcomes: {
          crit: { body: "你在教会和商会两个场合说了两段几乎相反却都真诚的话，本地专栏称你是「还在试着把两块地缝起来的人」。",
            effects: { rep: 1.3, fac: { base: 8, church: 7, press: 4 }, voters: { warm: 300 } } },
          ok: { body: "两边的气都在往下走，两边也都没把你当自己人——但没当敌人。",
            effects: { rep: 0.4, fac: { base: 5, church: 4 }, voters: { warm: 150 } } },
          meh: { body: "你的话温和而空，像社论模板。",
            effects: { rep: 0.05 } },
          fail: { body: "两个社区在同一天各自宣布对你「失望」，方向恰好相反。",
            effects: { rep: -1.5, fac: { base: -6, church: -4 } } },
          critfail: { body: "有录音露出你对两边讲的分量不一样的话，「两面人」的帽子当晚就织好了。",
            effects: { rep: -2.4, fac: { press: -6, base: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "laworder", text: "顺着郊区愤怒，把议题定成司法失控与陪审团改革",
        note: "赌的是「法律与秩序」情绪能带票。风险：城里人与教会记住你踩了哪边。",
        base: 0.44, stake: { fun: true }, cost: { fun: 1 },
        mods: [{ src: "fac", key: "establishment", w: 0.4 }, { src: "attr", key: "CUN", w: 0.2 }],
        outcomes: {
          crit: { body: "你的改革方案被州里采纳推进，党机器和商会都把你当这次情绪浪潮里可用的名字。",
            effects: { rep: 1.5, fac: { establishment: 9, commercial: 5, base: -6 }, voters: { warm: 350 } } },
          ok: { body: "你喊出了郊区的声音，他们记下是你先说的；城里人把这笔账也记下了。",
            effects: { rep: 0.35, fac: { establishment: 6, base: -4 } } },
          meh: { body: "这个议题本地根本炒不起来。",
            effects: { rep: -0.2 } },
          fail: { body: "改革提案在州议会惨死，两边各骂你一句：多事的和作秀的。",
            effects: { rep: -1.6, fac: { base: -8, church: -5 } } },
          critfail: { body: "你的竞选资金被扒出和推动改革的游说集团纠缠不清，丑闻标签坐实。",
            effects: { rep: -2.6, fac: { press: -6, base: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "noside", text: "公开拒答题：「这不是我该表态的那种判决」",
        note: "赌的是不沾水不出错。风险：被解读成怯懦，或者暗站了一边。",
        base: 0.6,
        mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你的拒绝被专栏认真讨论为「知道刑案表态有多廉价」，反而立住了清醒的名声。",
            effects: { rep: 1.0, attr: { INT: 2 }, fac: { press: 4, establishment: 3 } } },
          ok: { body: "你没给任何 headline，也没给任何人把柄。",
            effects: { rep: 0.5 } },
          meh: { body: "记者追问了两句，你走了。",
            effects: { rep: 0.1 } },
          fail: { body: "「不敢说」成了对手现成的形容词。",
            effects: { rep: -0.7, fac: { base: -3 } } },
          critfail: { body: "你被拍到宣判当晚和案中一方共进晚餐——你说你从不评论此案。",
            effects: { rep: -1.2, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1996-07 · 三周之内 —— 客机坠海，百年奥运公园又响了炸弹
   * ==================================================================== */
  {
    id: "ln96_twa", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 1996, maxYear: 1996, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 12, unique: true,
    medium: ["tv", "cable", "radio"], month: 7,
    title: "客机坠海一周后，奥运公园又响了炸弹",
    body: "长岛外海，一架波音747在起飞后几分钟解体入水，230人。全国还盯着海面捞残骸，百年奥运的公园夜里又一声炸响，四人死亡、上百人受伤。\n" +
      "一个月里两件事，夏天被疑心过上了：调查口径一会儿像机械故障，一会儿像炸弹。地方上有人开始点名「该有人负责」。",
    brief: {
      lede: "两份国丧叠着一个夏天，焦虑在找一根可以拽的线头。",
      known: [
        "空难调查与公园爆炸分属两套班子在查。",
        "本地有亲人在空难名单里的户数家可查。",
        "舆论正在从哀悼滑向追责。"
      ],
      rumor: [
        "有人说空难是恐怖袭击，证据马上会被放出。",
        "有人说机场安检外包早该被国会翻旧账。"
      ],
      unknown: [
        "真凶会不会抓到，两条线都悬着。",
        "你抢跑追责会不会追上错的那条线。"
      ],
      terms: [{ k: "调查双轨", v: "刑案与航空事故调查并行，口径常打架。" }]
    },
    choices: [
      {
        id: "probe", text: "咬住「要真相」：推动航空与安保双线彻查到底",
        note: "赌的是最后真查出问题。风险：查了个寂寞，你得罪两家的调查机构。",
        base: 0.5,
        mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "技术证据最终指向结构性安全漏洞，你引用过的那份内部备忘录被媒体翻出来：你最早喊对的人。",
            effects: { rep: 1.3, attr: { INT: 3 }, fac: { press: 9, establishment: -4 } } },
          ok: { body: "听证会开了，名单公布了，没有一条指向大人物——但你盯查的姿态留在了版面上。",
            effects: { rep: 0.4, attr: { INT: 1 }, fac: { press: 6 } } },
          meh: { body: "案子还在查，热度已换。",
            effects: { rep: -0.1 } },
          fail: { body: "你点名的机构用一叠反驳材料把你将了一军，说你外行指导调查。",
            effects: { rep: -1.4, fac: { establishment: -6, commercial: -5 } } },
          critfail: { body: "你的「线索」被证实是伪造的爆料件，你在发布会上低头念了澄清稿。",
            effects: { rep: -2.3, fac: { press: -6, establishment: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "securocrat", text: "把两件事收进同一个框架：国家安全体系要大改",
        note: "赌的是合并叙事更吓人也更值钱。风险：两案定性很快分道，你的框架成了笑话。",
        base: 0.42, stake: { fun: true }, cost: { fun: 1.5 },
        mods: [{ src: "fac", key: "agency", w: 0.4 }, { src: "fac", key: "military", w: 0.2 }],
        outcomes: {
          crit: { body: "两案后来都往「体系失灵」上靠，你的大改方案被州里拿去当真，安全系统的采购名单里有了你的名字。",
            effects: { rep: 1.45, fac: { agency: 10, establishment: 6, military: 5 }, voters: { warm: 400 } } },
          ok: { body: "框架喊出来了，预算跟着你的口号动了一格。",
            effects: { rep: 0.35, fac: { agency: 6, establishment: 3 } } },
          meh: { body: "没人反驳你，也没人接话。",
            effects: { rep: 0.05 } },
          fail: { body: "空难结论改回机械原因，你的「袭击叙事」被社论点名消费死者。",
            effects: { rep: -1.75, fac: { base: -6, press: -5 } } },
          critfail: { body: "你推动扩权的机构随后爆出滥用丑闻，每一条都被拿来问：当初是谁喊的？",
            effects: { rep: -2.6, fac: { establishment: -6, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "grieve", text: "不谈定性，先把悼念和伤者募捐做实",
        note: "赌的是做事比喊话耐看。风险：秋天问责潮来了，安静的人会被当成缺位。",
        base: 0.6,
        mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你办的募捐基金账目干净、全部到账，两家报纸在问责声浪里写：这个夏天他只做了这一件事，做成了。",
            effects: { rep: 1.0, fac: { base: 6, church: 4 } } },
          ok: { body: "悼念活动办得妥帖，没上头条，也没上黑名单。",
            effects: { rep: 0.5, fac: { base: 4, church: 3 } } },
          meh: { body: "事情做了，人没被记住。",
            effects: { rep: 0.1 } },
          fail: { body: "有遇难者家属抱怨你「只肯做事，不肯说话」。",
            effects: { rep: -0.6, fac: { base: -3 } } },
          critfail: { body: "基金一笔支出被翻出来上小报，虽然查无实据，数字已经进过标题。",
            effects: { rep: -1.1, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1996-08 · 福利改革 —— 总统要签字，两党都在逼你表态
   * ==================================================================== */
  {
    id: "ln96_welfare", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 1996, maxYear: 1996, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 12, unique: true,
    medium: ["print", "tv", "cable"], month: 8,
    title: "总统要签福利改革法，两党都在逼你表态",
    body: "共和党国会把那场谈了几十年的福利改革推到了签字桌前，而总统——当年喊过「福利改革要终结的是我们所知的福利」的人——决定签。\n" +
      "党内两拨人同时给你打电话：一拨要你替新法背书，一拨说这是对本党六十年的背叛。你的立场只有一份纸的空间。",
    brief: {
      lede: "一部跨党派签下的法律：站哪边都合法理，站哪边都伤自己人。",
      known: [
        "新法设领取时限并下放给州执行。",
        "本地靠福利合同吃饭的机构数以百计。",
        "总统签了，反对的声音会显成对着党门开火。"
      ],
      rumor: [
        "有人说州里已备好一份规避时限的豁免清单。",
        "有人说法案生效前还会塞进一笔过渡拨款。"
      ],
      unknown: [
        "几年后这法算政绩还是负债，此刻无人能证。",
        "你押的边输了，位置还在不在。"
      ],
      terms: [{ k: "福利改革", v: "限时领取、责任下放到州的综合改革法。" }]
    },
    choices: [
      {
        id: "backbill", text: "公开背书新法，替签字的一方守住这个回合",
        note: "赌的是改革叙事最终占上风。风险：基层与服务机构会先记住你的翻脸。",
        base: 0.44, stake: { fav: true }, cost: { fav: 1 },
        mods: [{ src: "fac", key: "establishment", w: 0.4 }, { src: "fac", key: "commercial", w: 0.2 }],
        outcomes: {
          crit: { body: "新法头两年申领人数大跌，你的背书文被全国报纸转载，党机器认定你是能顶事的人。",
            effects: { rep: 1.25, fac: { establishment: 12, commercial: 6, base: -4 }, voters: { warm: 250 } } },
          ok: { body: "表态合上了赢面，上层记你一功；只是本地福利机构开始约对手开会。",
            effects: { rep: 0.3, fac: { establishment: 7, commercial: 4, base: -6 } } },
          meh: { body: "背书发出去，转载寥寥。",
            effects: { rep: 0.05 } },
          fail: { body: "新法在州里执行得一塌糊涂，媒体回头问你当初为什么要替它说话。",
            effects: { rep: -1.6, fac: { base: -9, labor: -5 } } },
          critfail: { body: "试点丑闻爆出的那天，你那份背书信被人举到听证会上逐字朗读。",
            effects: { rep: -2.5, fac: { establishment: -6, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "amend", text: "支持大方向，但牵头给本州版本加装安全阀",
        note: "赌的是能在两股风里缝出一条缝。风险：两头都嫌你话多，文本未必容你插笔。",
        base: 0.5,
        mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "labor", w: 0.25 }],
        outcomes: {
          crit: { body: "你争来的过渡条款写进了州实施方案，两边的报纸各夸了半句——合起来正好是一句好话。",
            effects: { rep: 1.15, attr: { INT: 3 }, fac: { labor: 10, church: 5, establishment: -2 }, voters: { warm: 300 } } },
          ok: { body: "安全阀条款挂上了尾巴，工界和教会领你的情，党部觉得你多事。",
            effects: { rep: 0.4, attr: { INT: 2 }, fac: { labor: 6, church: 3, establishment: -3 } } },
          meh: { body: "你的修正案死在委员会，表态倒是都做了。",
            effects: { rep: -0.2 } },
          fail: { body: "两边都否认要过你的条款，你成了自作主张的那个人。",
            effects: { rep: -1.5, fac: { establishment: -5, labor: -4 } } },
          critfail: { body: "你办公室被曝在条款里塞了指定承包方，调查函到了。",
            effects: { rep: -2.3, fac: { press: -6, labor: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "vague", text: "只说「该改，但要改得护住最弱的」，不押任何一边",
        note: "赌的是废话也是话术。风险：选举年一过，没人记得你支持过什么。",
        base: 0.6,
        mods: [{ src: "attr", key: "CHA", w: 0.35 }],
        outcomes: {
          crit: { body: "你那句两头都能听出好话的句子被各自引用，两边都以为你站在自己一边。",
            effects: { rep: 0.9, fac: { establishment: 3, base: 3 } } },
          ok: { body: "滴水不漏的一段话。谁也没法用它打你，也没人用它捧你。",
            effects: { rep: 0.55, fac: { establishment: 2, base: 2 } } },
          meh: { body: "你的表态短到新闻编辑没处下剪。",
            effects: { rep: 0.1 } },
          fail: { body: "两党发言人同一天被问到你的立场，同一天说「他在回避」。",
            effects: { rep: -0.6 } },
          critfail: { body: "一份旧文件把你写成「两头收好处」，虽然文件本身站不住，标签站住了。",
            effects: { rep: -1.2, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1996-11 · 大选年 —— 连任之夜，顺风怎么乘
   * ==================================================================== */
  {
    id: "ln96_election", photo: "era-1996.jpg", grade: "major", category: "political",
    valence: "boon", dyn: true,
    minYear: 1996, maxYear: 1996, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "internet", "print"], month: 11,
    title: "大选夜：挑战者输了不止一场，你的党要分功劳",
    body: "克林顿守住白宫，还顺手把两院往自己这边推了一格。共和党挑战者输掉了四年前就该输的第二次机会，几年前那份激进议程被选民用沉默退了货。\n" +
      "胜选的浪头一层层拍到地方：开票未终，你已经有三份「庆祝性露面」的邀请，和一份「赶紧切割过去」的劝告。",
    brief: {
      lede: "顺风年：几乎每个选择都是往上走，区别只是借谁的势。",
      known: [
        "总统票数压过本选区，跟着他赢的名单都好使。",
        "党机器按惯例清点「顺风里出过力的人」。",
        "新兴的选举网站第一次成了计功对象。"
      ],
      rumor: [
        "有人说白宫二期要开中间路线的招商会。",
        "有人说你党内那位对手准备借败选重新上位。"
      ],
      unknown: [
        "这波顺风会吹到你身上多久。",
        "今天蹭的每一次镜头各自的价码。"
      ],
      terms: [{ k: "顺风票", v: "大选头牌带动的同党当选者。" }]
    },
    choices: [
      {
        id: "wave", text: "把胜利讲成本地战役：挨个谢过帮忙的人",
        note: "赌的是基层记得你。风险：功劳分太满，党机器觉得你抢了全国的势。",
        base: 0.62,
        mods: [{ src: "fac", key: "base", w: 0.35 }, { src: "attr", key: "CHA", w: 0.25 }],
        outcomes: {
          crit: { body: "你的庆功名单从志愿者排到教堂厨房，党部民调里「本地最有号召力」一栏第一次写你的名字。",
            effects: { rep: 1.3, voters: { warm: 500, diehard: 150 }, fac: { base: 8, establishment: 4 } } },
          ok: { body: "谢票谢到了人，你的地方班底厚了一层。",
            effects: { rep: 0.5, voters: { warm: 250 } } },
          meh: { body: "庆功宴办了两场，来的人差不多。",
            effects: { rep: 0.25 } },
          fail: { body: "名单漏了几家出力的人，抱怨声比祝酒词响。",
            effects: { rep: 0.15, fac: { base: -2 } } },
          critfail: { body: "有人把你的捐款人回执做成对比图传阅，说你谢错了人——也就是牢骚。",
            effects: { rep: 0.1 } }
        }
      },
      {
        id: "net", text: "押新媒介：把胜选夜的数据与感言全搬上网",
        note: "赌的是网络选战才起步、先占坑就是先赢。风险：此刻还轮不到网民当主角。",
        base: 0.55,
        mods: [{ src: "fac", key: "tech", w: 0.4 }, { src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "你的夜间接连更新被全国站点引用，科技版面第一次把地方政客当消息源——这一行的早期红利是你的。",
            effects: { rep: 1.45, fac: { tech: 10, press: 4 }, attr: { INT: 2 }, voters: { warm: 300 } } },
          ok: { body: "网上你比别人快、比别人全，关注数涨了一格。",
            effects: { rep: 0.35, fac: { tech: 6 } } },
          meh: { body: "更新发了，转发的是自己人。",
            effects: { rep: 0.2 } },
          fail: { body: "一场服务器事故让你的直播掉线半小时，同行都笑这个新玩意儿。",
            effects: { rep: 0.1, fac: { tech: -2 } } },
          critfail: { body: "有人扒出你网上引用的民调口径有问题，订正声明发了，看的人反而多了。",
            effects: { rep: 0.1 } }
        }
      },
      {
        id: "local", text: "不蹭全国热度，只把胜选夜用来给本地议题拉横幅",
        note: "稳：浪是别人的，事是自己的。风险：党里没人记得你今晚在哪。",
        base: 0.72,
        mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "庆功夜的横幅下你谈的全是桥、学校和诊所。两周后当地报纸评：唯一一个在狂欢里干正事的。",
            effects: { rep: 1.0, fac: { base: 6, establishment: 3 } } },
          ok: { body: "你安静地做了自己的事，稳当。",
            effects: { rep: 0.55, fac: { base: 4 } } },
          meh: { body: "热闹是他们的，桥还是那座桥。",
            effects: { rep: 0.2 } },
          fail: { body: "党部例行感谢名单里没有你——那本来就是给热闹人准备的。",
            effects: { rep: 0.1 } },
          critfail: { body: "你连党庆都没露面，闲话只有一句：这人没有同党可言。",
            effects: { rep: 0.1 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1997-10 · 亚洲金融危机 —— 货币连环贬值，全球股市一天吓出一身冷汗
   * ==================================================================== */
  {
    id: "ln97_asia", grade: "mid", category: "finance",
    valence: "risk", dyn: true,
    minYear: 1997, maxYear: 1997, scoped: true, tierRaw: true, tierMin: 1, tierMax: 6, weight: 12, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 10,
    title: "亚洲货币连环崩盘，全球股市一天吓出一身冷汗",
    body: "泰铢倒下之后，货币像多米诺一样往地里扎。指数一夜跳水，对冲基金喊出了「传染」这个词，第二次大恐慌的类比登上了所有头版。\n" +
      "你的选区夹在中间：出口订单和养老金账户在同一份晨报里被吓。商会要你安抚，工会要有人给华尔街定罪。",
    brief: {
      lede: "恐慌跨境流动的年代，本地人第一次听说「新兴市场」这个词。",
      known: [
        "股市单日巨震，但就业数据还没塌。",
        "本地有厂子已经收到亚洲订单取消函。",
        "养老金账户跟着指数一起抖。"
      ],
      rumor: [
        "有人说某只对冲基金已经提前跑光。",
        "有人说央行正在商量非常规救市。"
      ],
      unknown: [
        "这是亚洲局部火灾还是全球第一张骨牌。",
        "你骂华尔街和护华尔街各值多少票。"
      ],
      terms: [{ k: "货币传染", v: "一国贬值引发邻国连锁被抛售。" }]
    },
    choices: [
      {
        id: "blame", text: "把话挑明：替远炒近亏的投机资本定罪",
        note: "赌的是愤怒找对了门牌号。风险：金融与商会从此把你列进不可谈话名单。",
        base: 0.5,
        mods: [{ src: "fac", key: "base", w: 0.35 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "工厂裁员潮随后爆发，你的「定罪」演讲成了本地民怨的官方文本，工会开门迎接你。",
            effects: { rep: 1.35, fac: { base: 12, labor: 8, commercial: -10 }, voters: { warm: 600 } } },
          ok: { body: "街头气顺了，票仓动了；商会会长在晚宴上当着人喊你「民粹先生」。",
            effects: { rep: 0.45, fac: { base: 8, labor: 5, commercial: -8 }, voters: { warm: 250 } } },
          meh: { body: "骂声淹没在股评噪音里。",
            effects: { rep: 0.05 } },
          fail: { body: "市场两个月就爬了回来，报纸复盘标题：「谁在恐慌时喊打」。",
            effects: { rep: -1.5, fun: -0.8, fac: { commercial: -8 } } },
          critfail: { body: "你的发言被剪成煽动样本在全国财经台播放，本地基金撤回了对你关联项目的全部授信。",
            effects: { rep: -2.4, fac: { commercial: -9, establishment: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "steady", text: "反着来：上电视讲基本面，劝散户别砍在坑底",
        note: "赌的是市场自我修复。风险：若真崩了，你就是替纸面财富喊话的那个人。",
        base: 0.44, stake: { fun: true }, cost: { fun: 1 },
        mods: [{ src: "fac", key: "commercial", w: 0.4 }, { src: "fac", key: "establishment", w: 0.2 }],
        outcomes: {
          crit: { body: "市场果然大难不死，年底还创了新高，财经版把你封成「本地最冷定的声音」，企业圈的门为你开了。",
            effects: { rep: 1.45, fun: 1.5, fac: { commercial: 9, establishment: 6 } } },
          ok: { body: "你稳住了该稳的人，商界开始把你当自己人。",
            effects: { rep: 0.35, fac: { commercial: 6, establishment: 4 } } },
          meh: { body: "安抚稿念了，没人接。",
            effects: { rep: 0.05 } },
          fail: { body: "股灾式的下跌继续，你的「基本面」三个字做成了讽刺漫画。",
            effects: { rep: -1.6, fac: { base: -6, press: -4 } } },
          critfail: { body: "更糟：有人查出你的家属账户在你喊话当天低位吸筹。",
            effects: { rep: -2.5, fac: { press: -7, base: -6 }, flags: ["scandal_1", "investigation_open"] } }
        }
      },
      {
        id: "quiet", text: "不谈宏观，只把本地救济窗口加班开起来",
        note: "赌的是做事比预测安全。风险：两头都要你给个说法时，沉默也要交税。",
        base: 0.6,
        mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "危机没有演变成本地失业潮，回头盘点，你加班开的救济窗口成了唯一没人抱怨的措施。",
            effects: { rep: 1.0, fac: { base: 5, establishment: 3 } } },
          ok: { body: "该办的事办了，该躲的话躲开了。",
            effects: { rep: 0.5, fac: { establishment: 2, base: 2 } } },
          meh: { body: "窗口开了，没什么人来。",
            effects: { rep: 0.1 } },
          fail: { body: "两份社论同一天说：别的政客都表态了，只有他在装忙。",
            effects: { rep: -0.6 } },
          critfail: { body: "救济窗口一笔糊涂账被翻出来说事，虽小而烦人。",
            effects: { rep: -1.2, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1998-08 · 使馆爆炸 —— 内罗毕与达累斯萨拉姆同时升起烟柱
   * ==================================================================== */
  {
    id: "ln98_embassy", grade: "mid", category: "foreign",
    valence: "bane", dyn: true,
    minYear: 1998, maxYear: 1998, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "radio", "internet"], month: 8,
    title: "内罗毕与达累斯萨拉姆的美国使馆同时被炸",
    body: "上午十点，东非两座美国使馆在几分钟内先后被卡车炸弹掀掉立面，两百多人遇难，其中十二名美国人。电视里肯尼亚人抱着烧伤的孩子跑过泥街。\n" +
      "悬赏两千万美元的公告当晚发出，一个流亡富商的名字进了嫌疑名单。军方在等授权，情报系统在翻旧账。地方上，话筒又一次递到你手边。",
    brief: {
      lede: "本土之外的战争第一次在清晨新闻里进了美国家庭的客厅。",
      known: [
        "两国使馆同刻起爆，指向有组织的境外网络。",
        "报复选项已摆上台面，目标清单正在拟。",
        "本地有东非裔社群与阵亡外交人员的家属。"
      ],
      rumor: [
        "有人说情报早已预警，被层层压了下来。",
        "有人说报复打击的方案是拿旧地图改的。"
      ],
      unknown: [
        "这一拳打出去，下一拳从哪来。",
        "你此刻的定性会不会被后续证据推翻。"
      ],
      terms: [{ k: "使馆爆炸", v: "对外交设施的自杀式汽车炸弹袭击。" }]
    },
    choices: [
      {
        id: "retaliate", text: "力挺跨境报复：巡航导弹就是最清楚的语言",
        note: "赌的是硬话就是赢话。风险：导弹落地若没抓到正主，你等于公开预支了血。",
        base: 0.42, stake: { fun: true }, cost: { fun: 1.5 },
        mods: [{ src: "fac", key: "military", w: 0.4 }, { src: "fac", key: "establishment", w: 0.2 }],
        outcomes: {
          crit: { body: "导弹命中目标画面全国循环，军方口径与你完全一致，军工与安全拨款渠道都记住了你。",
            effects: { rep: 1.5, fac: { military: 10, establishment: 7 }, voters: { warm: 400 } } },
          ok: { body: "你替鹰派说了最顺嘴的话，他们领了情，尽管这话谁都会说。",
            effects: { rep: 0.35, fac: { military: 6, establishment: 4 } } },
          meh: { body: "表态淹没在几十条相似声明里。",
            effects: { rep: 0.05 } },
          fail: { body: "打击没抓到主嫌，反而炸塌了别的墙。追问「当初谁催得最急」的报道开始找你。",
            effects: { rep: -1.75, fac: { church: -5, base: -5 } } },
          critfail: { body: "误伤平民的现场照片流出，你当初的「不用道歉」原话被裱进每一篇追问稿。",
            effects: { rep: -2.5, fac: { church: -7, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "askwhy", text: "先问为什么：追查预警为什么没有变成行动",
        note: "赌的是体制内问题比境外敌人更快查实。风险：情报机构反咬时没有中间派会替你挡。",
        base: 0.5,
        mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "预警链条果然烂在中间层，你的追问上了全国深度报道署名栏，媒体圈把你登记成「敢碰机构的人」。",
            effects: { rep: 1.3, attr: { INT: 3 }, fac: { press: 8 } } },
          ok: { body: "你问对了方向，虽然结论还没落地，记者已经把你当成可用的线人。",
            effects: { rep: 0.4, attr: { INT: 2 }, fac: { press: 5, agency: -3 } } },
          meh: { body: "这个问题此刻没人想听。",
            effects: { rep: -0.2 } },
          fail: { body: "军方与情报系统罕见地一起出来说话：「外行添乱」。鹰派选民听得进去。",
            effects: { rep: -1.5, fac: { military: -6, establishment: -4 } } },
          critfail: { body: "你引用的「内部预警」被证实来自违规泄露，你被要求配合问询，agency 从此盯着你。",
            effects: { rep: -2.35, fac: { agency: -6, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "mourn", text: "只做事：为遇难外交人员家属与东非裔社区奔走",
        note: "赌的是悲情之外仍有活可干。风险：战争话题升温时，做事的人容易被读成不敢站队。",
        base: 0.6,
        mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你办的追思与家属对接成了本地唯一零差评的动作，两家教会和移民社区同时把你当自己人。",
            effects: { rep: 1.0, fac: { church: 6, base: 4 } } },
          ok: { body: "该跑的地方都跑了，没人挑得出话。",
            effects: { rep: 0.5, fac: { church: 4, base: 3 } } },
          meh: { body: "你在名单上做了一些事，不在任何版面上。",
            effects: { rep: 0.1 } },
          fail: { body: "有议员公开问：都什么时候了，他还在张罗鲜花？",
            effects: { rep: -0.6 } },
          critfail: { body: "一笔家属捐助的经手出了纰漏，小报标题用了「发国难财」三个字，事后证明是误传。",
            effects: { rep: -1.1, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1998-12 · 弹劾 —— 众议院把总统私德送上审判席
   * ==================================================================== */
  {
    id: "ln98_impeach", photo: "era-1998.jpg", grade: "major", category: "scandal",
    valence: "risk", dyn: true,
    minYear: 1998, maxYear: 1998, scoped: true, tierRaw: true, tierMin: 1, tierMax: 7, weight: 13, unique: true,
    medium: ["tv", "cable", "internet", "print"], month: 12,
    title: "众议院表决弹劾条款，把总统私德送上审判席",
    body: "拉链门拖了一整个秋天，年末众议院表决通过弹劾条款：伪证与妨碍司法。参议院审判定在新年，而总统支持率纹丝不动地钉在高处。\n" +
      "你的党第一次面临一道没有标准答案的题：把自家总统送下台，还是保住位子再保人。两拨人都在等你的圣诞声明。",
    brief: {
      lede: "宪政程序撞上了民意现实：按流程走的人和按选票走的人都在看你。",
      known: [
        "条款已过众院，参院定罪需要多数。",
        "总统民意支撑罕见地没有塌。",
        "本地教会与党内保守派催得最紧。"
      ],
      rumor: [
        "有人说参院票数早就数过，定罪到不了。",
        "有人说党机器想借这案子换掉整个领导层。"
      ],
      unknown: [
        "定不定得了罪，以及赌对的人分到什么。",
        "你的立场会被当成多久之前的。"
      ],
      terms: [{ k: "弹劾条款", v: "众院指控文书，定罪权在参院。" }]
    },
    choices: [
      {
        id: "defend", text: "替总统说话：罪不至此，别为私德废掉一届政府",
        note: "赌的是民意站在总统一边。风险：若参院真定罪，你就是保过罪人的那一个。",
        base: 0.5,
        mods: [{ src: "fac", key: "base", w: 0.35 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "参院如期无罪，总统支持率依旧高企，你的「别翻旧账」成了本党来年选战的官方调门——你是最早喊出来的人。",
            effects: { rep: 1.4, voters: { warm: 550 }, fac: { base: 8, establishment: 6 }, attr: { INT: 2 } } },
          ok: { body: "你顶住了党内追问，替中间选民说了话；教会那边把这笔账记下了。",
            effects: { rep: 0.4, voters: { warm: 300 }, fac: { base: 5, establishment: 3 } } },
          meh: { body: "保总派的话太多，你这句排在中间。",
            effects: { rep: 0.1 } },
          fail: { body: "新披露的材料难看得超出想象，你的「罪不至此」被重新剪了一遍音。",
            effects: { rep: -1.5, fac: { church: -6, establishment: -5 } } },
          critfail: { body: "审判余波里「明知伪证仍作保」的追问点名到你，标签贴上了。",
            effects: { rep: -2.4, fac: { church: -6, press: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "push", text: "顺势推弹劾：程序走到底，道德账要有人结",
        note: "赌的是定罪叙事能烧穿民意。风险：民意反着走时，激进党的账本上你排第一行。",
        base: 0.44, stake: { fav: true }, cost: { fav: 1 },
        mods: [{ src: "fac", key: "church", w: 0.4 }, { src: "fac", key: "establishment", w: 0.2 }],
        outcomes: {
          crit: { body: "审判虽未果，但弹劾派守住了初选版图，党机器清点了「说硬话的人」，你的名字在前排。",
            effects: { rep: 1.5, fac: { church: 10, establishment: 7, base: -8 }, voters: { warm: 350 } } },
          ok: { body: "你替道德选民用足了劲，他们记着你；温和派也记着。",
            effects: { rep: 0.3, fac: { church: 7, establishment: 5, base: -6 } } },
          meh: { body: "喊了，但这一浪没推起来。",
            effects: { rep: -0.1 } },
          fail: { body: "参院无罪、总统支持率不掉，中间选民回头清算谁把国会拖了这个秋天。",
            effects: { rep: -1.75, fac: { base: -7, press: -4 } } },
          critfail: { body: "你推动的委员会被曝选择性取证，「政治审判」的标题里全是你。",
            effects: { rep: -2.7, fac: { press: -7, establishment: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "clean", text: "两个都不同情：只讲制度——该走完走完，该翻篇翻篇",
        note: "赌的是超然人设值钱。风险：两边成交战时，都不是你的客人。",
        base: 0.6,
        mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "你的「程序与体面」声明被两报同版引用，被评论圈登记成本党少见的「不像党派人的党派人物」。",
            effects: { rep: 1.0, fac: { press: 5, establishment: 3 } } },
          ok: { body: "你说了一段没人能反对也没人传诵的话。稳。",
            effects: { rep: 0.5, fac: { press: 3, establishment: 2 } } },
          meh: { body: "超然在热闹季节是隐形的。",
            effects: { rep: 0.1 } },
          fail: { body: "两边同一天骂你：一个说冷血，一个说骑墙。",
            effects: { rep: -0.6 } },
          critfail: { body: "被挖出你和涉案一方早年有一笔说不清的往来——小，但在这个季节足够小报吃一周。",
            effects: { rep: -1.15, fac: { press: -4 } } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 世界线 · 1995—1998 按年条目（pressure / brief / outlets；逐年深合并进全局表）
 *   · pressure 0—6：1996 大选年顶到 4；1998 弹劾+使馆爆炸双事叠加回 4。
 *   · brief 一句话写全年情绪，不罗列事件。
 *   · outlets 只放当年确实已存在的媒体（互联网媒体自 1995 起，Drudge 1996 才进表）。
 * ==========================================================================*/
POTUS.define("worldline", {
  pressure: {
    "1995": 4,   // 俄城爆炸、世纪审判、联邦停摆、预算对决
    "1996": 4,   // 大选年 + 环球TWA800 + 百年公园爆炸 + 福利改革签法
    "1997": 3,   // 亚洲金融危机冲击美股，表面繁荣下的惊出一汗
    "1998": 4    // 驻肯/坦使馆爆炸 + 拉链门 + 弹劾表决，一年双头案
  },
  brief: {
    "1995": "繁荣回来了，天真没有。本土第一辆汽车炸弹和一场全国直播的宣判，让这个国家当着镜头吵自己是哪一种美国。",
    "1996": "奥运年、大选年、空难与爆炸凑在一个夏天。恐慌很响，日子很好，在位者顺手把福利改革签了——人人觉得历史站在自己这边。",
    "1997": "华尔街连着新高，亚洲的货币却一夜夜往下塌。第一次有人认真讨论：远方的崩盘会不会顺着网线游进你的养老金账户。",
    "1998": "东非两座使馆的烟柱和华盛顿一条拉链同一年刷屏。世界又硬又碎，而国会山在为总统的晚餐名单走宪政程序。"
  },
  outlets: {
    "1995": ["纽约时报", "华盛顿邮报", "今日美国", "有线电视新闻网", "新闻周刊"],
    "1996": ["纽约时报", "今日美国", "有线电视新闻网", "福克斯新闻", "德拉吉报道网"],
    "1997": ["华尔街日报", "今日美国", "有线电视新闻网", "微软全国广播公司", "德拉吉报道网"],
    "1998": ["纽约时报", "华尔街日报", "华盛顿邮报", "有线电视新闻网", "微软全国广播公司", "德拉吉报道网"]
  }
});

/* ============================================================================
 * 定点锚 · 1995—1998 的 fixed 表：本带 8 张新卡全钉 + 1 张存量卡补钉。
 *   共 9 锚（≈1.9/年），major 3 张（恰 1/3）。
 *   media_cable_show（55-media-timeline.js 存量卡，mid 级）补钉 1997-03：
 *   二十四小时有线新闻的午夜靶子节目，正是这一届媒体景观的注脚（grade 随卡）。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln95_okc",        year: 1995, month: 4,  grade: "major" },
  { event: "ln95_verdict",    year: 1995, month: 10, grade: "mid" },
  { event: "ln96_twa",        year: 1996, month: 7,  grade: "mid" },
  { event: "ln96_welfare",    year: 1996, month: 8,  grade: "mid" },
  { event: "ln96_election",   year: 1996, month: 11, grade: "major" },
  { event: "media_cable_show", year: 1997, month: 3, grade: "mid" },
  { event: "ln97_asia",       year: 1997, month: 10, grade: "mid" },
  { event: "ln98_embassy",    year: 1998, month: 8,  grade: "mid" },
  { event: "ln98_impeach",    year: 1998, month: 12, grade: "major" }
]);
