/* ============================================================================
 * CONTENT · events/122-line-1999-02.js
 * 连续时间轴 · 1999—2002 定点大事件（Track B3）。
 *
 * 形制照 events/110-line-1980s.js：
 *   · 不写 era —— 一律绝对年窗 minYear/maxYear + scoped，grade/category/valence/dyn 必填。
 *   · 到点必发 —— 本带新卡与复用的存量卡（wt01_september / wt02_patriot / wt02_alert）
 *     一并钉进文件末尾的 POTUS.define("fixed", …)。
 *   · 世界线 —— 1999—2002 每年的 pressure/brief/outlets 写在本文件（core.js 按字段深合并）。
 *
 * 铁律：字符串只用「」；每卡恰一个既无 cost 又无 req 的保底选项（高地板低天花板、
 *   ok 小额为正、fail 幅度 ≤ 冒险项一半、不埋负面 flag）；冒险项支出↔把握↔天花板错位；
 *   收益至少铺 2 根轴；同卡 base 极差 ≥0.10；经济一律系数（dyn）。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 1999-04 · 科伦拜恩校园枪击 —— 枪口对准了教室（1999 带·开局）
   * ==================================================================== */
  {
    id: "ln99_columbine", grade: "mid", category: "civil",
    valence: "risk", dyn: true,
    minYear: 1999, maxYear: 1999, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 12, unique: true,
    medium: ["tv", "cable", "print", "internet"], month: 4,
    title: "两个在校生端着枪走进了食堂",
    body: "科罗拉多一所高中里，两个学生用手枪和自制炸弹杀了十二名同学和一名教师，随后在图书馆自杀。全国愣住了：凶手不是街头混混，是本地履历干净的孩子。\n" +
      "你所在学区的高中门前点起了蜡烛，家长举着牌子堵在校董会门口。本地电视台连线要你那句「要不要控枪」。",
    brief: {
      lede: "十二个孩子没了，全镇都在等你说：这是谁的错、该拿枪的人怎么办。",
      known: [
        "两个枪手都是本地学生，购枪渠道仍在查。",
        "本地家长的悲愤比哪个议题都响，校董会开会像集会。",
        "拥枪与控枪两拨人都在等你表态：一拨有钱，一拨有票。"
      ],
      rumor: [
        "有人说孩子策划多年，老师早就看出不对。",
        "有人说邻县正在准备一模一样的案子。"
      ],
      unknown: [
        "枪支立场将跟你此后每次选举。",
        "今天通过的条款，几年后可能被推翻。"
      ],
      terms: [{ k: "校园枪击", v: "即此事件，此后成为拥枪辩论的代名词。" }]
    },
    choices: [
      {
        id: "control", text: "趁悲愤推动本地控枪与校园安全方案",
        note: "赌哀悼能转成选票。风险：枪械游说把你列进针对名单。",
        base: 0.46, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        cost: { fun: 1 }, stake: { fun: true },
        outcomes: {
          crit: { body: "你的控枪倡议被家长举着蜡烛转发到全国，本地枪支店主骂你，可选民记得你站在孩子前面。", effects: { rep: 1.6, voters: { warm: 800 }, fac: { base: 10 } } },
          ok: { body: "方案过了，气氛恰好，你顺势立住「敢碰这事」的形象；金主们开始在背后数你的票。", effects: { rep: 0.7, voters: { warm: 300 }, fac: { base: 4, establishment: -4 } } },
          meh: { body: "你提了案，听证会开得不痛不痒，谁都没把你算进任何一边。", effects: { rep: 0.1, fac: { establishment: -3 } } },
          fail: { body: "议案黄了，枪械选区从此见你就问「你什么时候管管孩子玩手机」。", effects: { rep: -1.25, fac: { establishment: -8, base: -4 } } },
          critfail: { body: "你替提案拉来的捐款被翻出来对账，「拿孩子的命做买卖」上了对手的广告牌。", effects: { rep: -2.25, fac: { press: -6, establishment: -10 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "culture", text: "避开枪本身，去办暴力游戏与好莱坞的公听会",
        note: "赌文化战争比枪支好打。风险：两边都看出你在绕题。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "你把话题引向银幕暴力，教会与家庭选民连连点头，全国脱口秀竟真请你去辩论。", effects: { rep: 1.2, attr: { CHA: 2 }, fac: { church: 6, base: 4, press: -4 } } },
          ok: { body: "公听会开了，头条归了你，虽然谁都知道真正的枪还在真正的柜子里。", effects: { rep: 0.5, fac: { church: 4 } } },
          meh: { body: "你的话题新鲜了三天，记者们转头又去问枪。", effects: { rep: -0.1, fac: { press: -3 } } },
          fail: { body: "「他不敢碰枪」四个字上了本地报纸社论版，连替你张罗的人都说这次滑头了。", effects: { rep: -1.1, fac: { press: -6, base: -3 } } },
          critfail: { body: "你被拍到收过游戏商的款，矛头从银幕掉回你自己：「他是在替谁挡镜头」。", effects: { rep: -2, fac: { press: -8, establishment: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "local", text: "不碰枪的立场：只管心理辅导与校内报警演练",
        note: "赌的是谁都不沾染。风险：没人记得你做过什么。",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "顾问与警报器一件件落地，校长在纪念牌前致谢——小，但没人能说错。", effects: { rep: 0.3 } },
          ok: { body: "你做了实事，没站任何一边，两边也都挑不出毛病。", effects: { rep: 0.2 } },
          meh: { body: "预算批了一点，没人再提这件事。", effects: {} },
          fail: { body: "有人嘀咕「十二条命就换来两台警报器」，但也只是嘀咕。", effects: { rep: -0.2 } },
          critfail: { body: "你的低调被剪成「他什么都没做」的一句旁白，说完就过去了。", effects: { rep: -0.3 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1999-05 · 北约轰炸南联盟与误炸中国使馆 —— 78 天与一枚「错误」的弹
   * ==================================================================== */
  {
    id: "ln99_balkans", photo: "era-1999.jpg", grade: "major", category: "foreign",
    valence: "risk", dyn: true,
    minYear: 1999, maxYear: 1999, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "print", "radio"], month: 5,
    title: "轰炸贝尔格莱德七十八天，还错炸了中国使馆",
    body: "为制止对科索沃阿尔巴尼亚族的驱逐，北约绕过联合国安理会，对南联盟轰炸了七十八天；五月初，导弹落在贝尔格莱德的中国使馆，三名记者遇难。「误炸」还是「有意」，CNN 的镜头把两种说法同时送进每个客厅。\n" +
      "你的选区里住着两拨等表态的人：巴尔干移民的后代，和刚在馆舍外点完蜡烛的华侨。",
    brief: {
      lede: "一场没经联合国授权的战争，一次没人能自圆其说的误炸，逼每个地方政客站队。",
      known: [
        "轰炸仍在继续，使馆三人遇难，白宫已口头道歉。",
        "本地塞裔社区里有人亲属还在贝尔格莱德。",
        "华侨社区在领事馆外集会，警方在观察你的态度。"
      ],
      rumor: [
        "有人说目标坐标用的旧图，真是意外。",
        "有人说再炸两周贝尔格莱德就会服软。"
      ],
      unknown: [
        "地面部队将把这场空战拖成泥潭。",
        "你此刻说的话，会烧到意想不到的方向。"
      ],
      terms: [{ k: "北约轰炸南联盟", v: "未经安理会授权的七十八天空袭。" }]
    },
    choices: [
      {
        id: "support", text: "站白宫一边：轰炸必要，使馆之误是战争的悲剧",
        note: "赌主流民意还在你这边。风险：说法日后翻车，你签过字。",
        base: 0.55, mods: [{ src: "fac", key: "establishment", w: 0.35 }, { src: "attr", key: "CUN", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "你的声明被党部通发各州，「关键时刻站得正」记进了上面那本名单，华侨社区的门从此对你关了一半。", effects: { rep: 1.5, tier: 1, fac: { establishment: 10, military: 6 } } },
          ok: { body: "你随主流站了队，电视圈的引荐明显多了，本地华埠的店主开始不接你的握手。", effects: { rep: 0.8, fac: { establishment: 6, military: 4, base: -3 } } },
          meh: { body: "你表了态，声音被更大的人物盖过去，两边都没把你当回事。", effects: { rep: 0.1, fac: { establishment: 2 } } },
          fail: { body: "反战情绪在社区里发酵，你「支持轰炸」的话被印在游行传单背面。", effects: { rep: -1.5, fac: { base: -6, press: -4 } } },
          critfail: { body: "「误炸」的说法被多方证据撕开，你当初的打包票成了本地报纸每周重提的旧账。", effects: { rep: -2.5, fac: { press: -8, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "condemn", text: "要求独立调查使馆遇袭，并当面道歉华埠",
        note: "赌移民社区的良知票。风险：被扣「不同情北约」的帽子。",
        base: 0.45, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        cost: { fun: 1.5 }, stake: { fun: true },
        outcomes: {
          crit: { body: "你替三个死难记者说了话，侨社把锦旗挂进你的办公室，评论界头一回把你当外交议题上的人。", effects: { rep: 1.9, voters: { warm: 600 }, fac: { base: 8, foreign: 10 } } },
          ok: { body: "你要求调查的声音不大不小，侨社领情，建制派皱起了眉。", effects: { rep: 0.8, voters: { warm: 250 }, fac: { foreign: 5, establishment: -4 } } },
          meh: { body: "你的呼声被「轰炸继续」的头条盖掉了，只有本地华人版登了半栏。", effects: { rep: -0.2, fac: { establishment: -4 } } },
          fail: { body: "「他替谁说话」的问题被反复追问，军界与外交圈的人开始绕着你走。", effects: { rep: -1.6, fac: { establishment: -8, military: -5 } } },
          critfail: { body: "你收的侨领捐款被对手贴满街头，一场声援变成一笔「来路不明」的账。", effects: { rep: -2.6, fac: { establishment: -10, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "vigil", text: "不评对错：为难民办募捐，替使馆死者守一场夜",
        note: "赌的是不沾染。风险：两头都觉得你没胆。",
        base: 0.63, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "守夜会上两种语言的人同站一排，照片登在本地报头版下方：「至少他在」。", effects: { rep: 0.3 } },
          ok: { body: "钱募了，夜守了，没人夸你，也没人挑出你的错。", effects: { rep: 0.15 } },
          meh: { body: "你两头抚慰，谁也没把你算进哪一边的名单。", effects: {} },
          fail: { body: "有人嫌你只敢点蜡烛，不敢说一句立场。", effects: { rep: -0.25 } },
          critfail: { body: "你的中立被一句「他连站哪边都不敢说」带了过去，也就这样了。", effects: { rep: -0.3 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1999-11 · 西雅图反 WTO 抗议 —— 弹雨与防暴队之间的选择题
   * ==================================================================== */
  {
    id: "ln99_wto", grade: "mid", category: "civil",
    valence: "risk", dyn: true,
    minYear: 1999, maxYear: 1999, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 12, unique: true,
    medium: ["tv", "cable", "print", "internet", "radio"], month: 11,
    title: "贸易峰会把整座城市变成了催泪瓦斯战场",
    body: "上百个国家的部长聚在城市里谈全球贸易松绑，几万名抗议者跟着来了：工会、环保者、学生，还有一群蒙面的无政府主义者。催泪瓦斯熏了整整一周，国民警卫队上了街，城市实质「戒严」。\n" +
      "工会委员长与商会主席同一晚分别给你打电话，都要你在镜头前先站一边。",
    brief: {
      lede: "催泪瓦斯在教每个政客一道题：全球化的好处，到底轮没轮到街上的这些人。",
      known: [
        "谈判已被街头冲垮，新一轮磋商悬了。",
        "工会游行合法，打砸给了警方动手的借口。",
        "本地商户喊损失，他们不管哪边有理。"
      ],
      rumor: [
        "有人说联邦探员就混在抗议队伍里。",
        "有人说白宫乐见这场乱，好转移议题。"
      ],
      unknown: [
        "这轮散了，下轮会以别的形式回来。",
        "你现在站的一边，日后会被钉住。"
      ],
      terms: [{ k: "WTO 会议", v: "世贸组织部长级会议，因街头抗议无果。" }]
    },
    choices: [
      {
        id: "labor", text: "陪工会合法游行，要求贸易协定加劳工条款",
        note: "赌底层的愤怒是真浪潮。风险：被指「出卖美国岗位」。",
        base: 0.47, mods: [{ src: "fac", key: "labor", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        cost: { fun: 1 }, stake: { fun: true },
        outcomes: {
          crit: { body: "你走在游行队伍侧翼、一句狠话没放却全接住了工会的敬意，「谈判桌上有劳工」的说法第一次不像笑话。", effects: { rep: 1.7, voters: { warm: 700 }, fac: { labor: 12, base: 8 } } },
          ok: { body: "劳工条款进了你的公开信，工会记下了名字，商会把你从晚餐名单挪到了走廊。", effects: { rep: 0.8, voters: { warm: 250 }, fac: { labor: 7, base: 4, commercial: -4 } } },
          meh: { body: "你两头都到了场，劳工条款一个字没提，谁也懒得引用你的话。", effects: { rep: 0.1, fac: { commercial: -3 } } },
          fail: { body: "打砸的画面盖过了游行，你与「烧店的」被剪进同一条新闻里。", effects: { rep: -1.4, fac: { commercial: -9, establishment: -5 } } },
          critfail: { body: "对手把你募的游说款与「煽动暴乱」并排贴上报纸头版，你的机器第一次出现退捐款。", effects: { rep: -2.3, fac: { commercial: -10, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "order", text: "谴责打砸、力挺城市恢复秩序与警权",
        note: "赌多数市民讨厌的是街头。风险：左边的账记你十年。",
        base: 0.56, mods: [{ src: "fac", key: "establishment", w: 0.35 }, { src: "attr", key: "CUN", w: 0.25 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "你替商户喊出了「还我街道」，商会与警员工会联名登报道谢，党机器觉得你稳得住。", effects: { rep: 1.3, fac: { establishment: 9, military: 5 } } },
          ok: { body: "你站了秩序，商户谢你，游行的队伍经过你办公室时多嘘了一声。", effects: { rep: 0.6, fac: { establishment: 5, labor: -5 } } },
          meh: { body: "你的谴责不痛不痒，两天后没人记得你说过什么。", effects: { rep: 0.1 } },
          fail: { body: "警方过度执法的照片登了报，「力挺警权的人」被写进抗议歌曲里。", effects: { rep: -1.2, fac: { base: -7, labor: -5 } } },
          critfail: { body: "你动员的「护街巡逻」被拍到与示威者推搡，一场风波安上了你的名字。", effects: { rep: -2, fac: { base: -9, press: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "listen", text: "不表态：各听一场工人和商户的会，只记不批",
        note: "赌的是不犯错。风险：谁都没把你当自己人。",
        base: 0.63, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "两场会你都坐满了全程，两边的报纸都用了「他在听」——这年头已算好话。", effects: { rep: 0.3 } },
          ok: { body: "你听完两头的苦，什么也没承诺，也没得罪。", effects: { rep: 0.15 } },
          meh: { body: "你在会场里做了记录，风浪与你无关。", effects: {} },
          fail: { body: "「他听完就走了」成了两边共用的抱怨。", effects: { rep: -0.2 } },
          critfail: { body: "你的沉默被一句「两边都不敢碰」轻轻带过，也就这样了。", effects: { rep: -0.3 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2000-10 · 科勒号驱逐舰遇袭 —— 大选前夜的海上火柱
   * ==================================================================== */
  {
    id: "ln00_cole", grade: "mid", category: "foreign",
    valence: "bane", dyn: true,
    minYear: 2000, maxYear: 2000, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 12, unique: true,
    medium: ["tv", "cable", "radio", "print"], month: 10,
    title: "一艘小艇在亚丁港撞进驱逐舰，十七名水兵死了",
    body: "补给间隙，一艘装满炸药的小艇撞上正在加油的美军驱逐舰，船体被撕开一个大洞，十七名水兵当场死亡。袭击赶在大选前一周，「谁在替我们的船负责」突然成了辩论季的题目。\n" +
      "选区里有一处海军征兵站，两户人家刚接到电报。电视台想知道：这算战争行为吗，而现在说狠话的人，凭什么是你。",
    brief: {
      lede: "十七条人命上了每晚的新闻片头，竞选季立刻变成安全能力的考试。",
      known: [
        "两名袭击者，船在加油，当日警戒等级在查。",
        "联邦两家情报机构对线索的说法不一致。",
        "本地海军协会要追悼日，也要你到场。"
      ],
      rumor: [
        "有人说预警几天前就报了，没人理。",
        "有人说这只是开场，还有一下更大的。"
      ],
      unknown: [
        "对这艘船的回应，已在别处酝酿。",
        "你的安全狠话是担当，还是吃丧财。"
      ],
      terms: [{ k: "科勒号事件", v: "亚丁港美军驱逐舰自杀式袭击。" }]
    },
    choices: [
      {
        id: "retaliate", text: "喊强硬回应：「美国不会被人堵在港口打」",
        note: "赌安全焦虑能换成支持。风险：下次失手算你的。",
        base: 0.5, mods: [{ src: "fac", key: "military", w: 0.35 }, { src: "fac", key: "establishment", w: 0.2 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "你的话在退伍军人俱乐部被齐声念完，军界第一次记住这个「不绕弯子」的地方人物。", effects: { rep: 1.4, fac: { military: 9, establishment: 5 } } },
          ok: { body: "你喊了强硬，军属点头，报馆把这句话排进了大选特刊。", effects: { rep: 0.75, fac: { military: 5, base: 4 } } },
          meh: { body: "你表了态，全国比你狠的声音太多，你没被分到一起。", effects: { rep: -0.2 } },
          fail: { body: "调查迟迟不出结果，有人反问：喊得最响的那位，你当时在管什么。", effects: { rep: -1.3, fac: { press: -6, base: -4 } } },
          critfail: { body: "又一起未遂袭击见报，「强硬只会说在嘴上」的社论点名点了整整一版。", effects: { rep: -2.2, fac: { press: -8, military: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "review", text: "追问审查：预警到底送到了谁的桌上",
        note: "赌公众更恨失守而非敌人。风险：被骂「丧期查自己人」。",
        base: 0.44, mods: [{ src: "attr", key: "INT", w: 0.45 }],
        cost: { fun: 1.5 },
        outcomes: {
          crit: { body: "你把程序漏洞一条条理出来，评论版开始称你「会盯文件的人」，两家联邦机构都把你挂上了警惕名单。", effects: { rep: 1.6, attr: { INT: 3 }, fac: { press: 8 } } },
          ok: { body: "你坚持要查，声音不大但立住了；联邦圈子开始叫你「麻烦的那个人」。", effects: { rep: 0.7, attr: { INT: 1 }, fac: { press: 5 } } },
          meh: { body: "你的质询信发了，回函永远在「审查中」。", effects: { rep: -0.3, fac: { agency: -4 } } },
          fail: { body: "在举国哀悼里追问官僚责任，你被剪成「拿水兵的死去争镜头」。", effects: { rep: -1.5, fac: { agency: -8, establishment: -5 } } },
          critfail: { body: "你的追问碰了保密红线，一封律师函连着一次「配合调查」的约谈，同时寄到你办公室。", effects: { rep: -2.5, fac: { establishment: -8, press: -5 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "vigil", text: "战略之争再说：先把追悼会和十七个家庭做实",
        note: "赌的是不沾染。风险：没人记得你选了什么边。",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "十七个名字你一个个念完，没说一句外交立场——军属社区认这种笨办法。", effects: { rep: 0.3 } },
          ok: { body: "你陪家属走完了流程，得体安静，谁也没挑出话柄。", effects: { rep: 0.2 } },
          meh: { body: "你到了场，帮上了小忙，第二天新闻换了题目。", effects: {} },
          fail: { body: "有人小声说：这时候也只有他肯来，可他也仅止于肯来。", effects: { rep: -0.25 } },
          critfail: { body: "你的低调被一句「他只敢出席」带过，没溅起更大水花。", effects: { rep: -0.3 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2000-11 · 大选计票僵局 —— 几百张票悬着一顶王冠
   * ==================================================================== */
  {
    id: "ln00_hang", photo: "era-2000.jpg", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 2000, maxYear: 2000, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 14, unique: true,
    medium: ["tv", "cable", "print", "internet", "radio"], month: 11,
    title: "开票三天，全国还不知道总统是谁",
    body: "选举夜「过于接近」，随后更接近到只有几百票：一个州开始人工重算，两边的律师连夜进场，全国盯着打孔卡与蝴蝶票，等最高法院落槌。\n" +
      "你党的总部要你替「我们的人」呐喊；本地社论版也在问：你还信不信计票机器。两个问题同一个价码——对面若赢了，你还得与答案共处四年。",
    brief: {
      lede: "总统没定，但你的站队已经被写进两边的记账本。",
      known: [
        "重算官司在打，两边都已宣布胜选。",
        "党机器要你去「要求清点每一票」的集会上台。",
        "街坊已经分裂：有人认定对方当选即非法。"
      ],
      rumor: [
        "有人说某县的票箱会在天亮前「出差」。",
        "有人说输了的那边不会认账很久。"
      ],
      unknown: [
        "法院将定总统，定不了争吵。",
        "你押的边，你要替它圆四年。"
      ],
      terms: [{ k: "重新计票", v: "关键州人工计票争议，官司打到终审。" }]
    },
    choices: [
      {
        id: "partisan", text: "把招牌绑上本党：清点每一票，一县不让",
        note: "赌自己人最终赢下全部。风险：输了你就是闹事者。",
        base: 0.48, mods: [{ src: "fac", key: "establishment", w: 0.3 }, { src: "attr", key: "CUN", w: 0.3 }],
        cost: { fun: 1.5 }, stake: { fun: true },
        outcomes: {
          crit: { body: "浪潮兑现了，你在集会上的镜头被剪进胜选感谢名单；党的资源从此优先过你这站。", effects: { rep: 1.7, tier: 1, fac: { establishment: 10, base: 5 } } },
          ok: { body: "你喊得卖力，赢了功劳未必有你，但机器记了这份力。", effects: { rep: 0.7, fac: { establishment: 6 } } },
          meh: { body: "僵局照旧，你的呐喊没人转播，两边都嫌你喊得不够准。", effects: { rep: -0.2, fac: { establishment: -2 } } },
          fail: { body: "终审落槌那天，「煽动不认结果」的帽子扣在你头上摘不下来。", effects: { rep: -1.5, fac: { press: -6, establishment: -6 } } },
          critfail: { body: "你操盘的地方「公民监督计票队」被两党共同指控骚扰票站，名字上了联邦听证附录。", effects: { rep: -2.5, fac: { press: -8, base: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "institutions", text: "喊尊重程序：每票依法清点，结果出来就接受",
        note: "赌风暴后人们记得谁冷静。风险：本党先骂你叛徒。",
        base: 0.56, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "在人人红了眼的十几天里，你那段「按法律来」的谈话被社论反复引用，媒体圈给你立了个「清醒」的档。", effects: { rep: 1.3, attr: { INTG: 2 }, fac: { press: 8 } } },
          ok: { body: "你主张尊重程序，两边都不算满意，但都承认你没发疯。", effects: { rep: 0.6, fac: { press: 4 } } },
          meh: { body: "你的声音在呐喊潮里几乎听不见，至少你没喊错。", effects: { rep: 0.1 } },
          fail: { body: "败局定后，你党认定你「关键时刻替对方说话」，冷板凳先给你坐。", effects: { rep: -1.2, fac: { base: -6, establishment: -5 } } },
          critfail: { body: "你被逐出本党核心圈，「背党者」成了介绍你时的固定从句。", effects: { rep: -2, fac: { base: -8, establishment: -6 }, flags: ["party_traitor"] } }
        }
      },
      {
        id: "staylocal", text: "不碰计票之争：回选区做自己的选民服务",
        note: "赌的是不沾染。风险：没人记得你有过表态。",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "风暴里你一根电线杆一扇门地走着，无论谁当总统，选区事务没耽误。", effects: { rep: 0.3 } },
          ok: { body: "你保持安静，两边都懒得记录一个没发声的人。", effects: { rep: 0.15 } },
          meh: { body: "那十几天你仿佛不存在，也没人想起你。", effects: {} },
          fail: { body: "风波过后有人问：那几天你去哪了？你答得平庸，效果也平庸。", effects: { rep: -0.2 } },
          critfail: { body: "「装死」两个字被一个失意同僚随口说出，没掀起什么浪。", effects: { rep: -0.3 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2001-10 · 炭疽邮件 —— 世贸废墟未冷，信箱里来了看不见的敌人
   * ==================================================================== */
  {
    id: "ln01_anthrax", grade: "major", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2001, maxYear: 2001, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 13, unique: true,
    medium: ["tv", "cable", "print", "radio", "internet"], month: 10,
    title: "装着炭疽孢子的信寄进了报社和参议院",
    body: "双子塔倒塌的烟尘还没落定，掺了炭疽芽孢的信件开始经邮局流向媒体办公室与两名参议员：五人死了，十七人感染。全国学着用颤抖的手打开每一封信，分拣中心停业，国民警卫队被征用。\n" +
      "你的选区有一处邮件分拣枢纽、一所应急预案刚凑合成形的医院，和一群追着问「包裹还能不能收」的居民。",
    brief: {
      lede: "九月的恐惧还没散，十月又来了一个肉眼看不见的敌人。",
      known: [
        "孢子随信件传播，死者里有参议员，源头未明。",
        "本地分拣站工人已集体请假，医院没有检测设备。",
        "联邦今夜可能宣布比细菌更吓人的东西。"
      ],
      rumor: [
        "有人说菌种出自国内军方库存。",
        "有人说整场戏排得太巧，是自家演的。"
      ],
      unknown: [
        "源头追查会拖很多年而无结论。",
        "你今天支持的应急权，日后成判例。"
      ],
      terms: [{ k: "炭疽邮件", v: "寄往媒体与议员的含孢子信，五人死。" }]
    },
    choices: [
      {
        id: "hardline", text: "推动全面应急：大筛查、扩拘留权、来一部更狠的法案",
        note: "赌恐慌中人肯换自由换安心。风险：账日后算到你头上。",
        /* 结果文案写的是「联邦把你的方案抄进全国指引」——地方样板口吻，在位总统不该点它 */
        when: { tierRaw: true, tierMax: 8 },
        base: 0.45, mods: [{ src: "fac", key: "agency", w: 0.35 }, { src: "fac", key: "military", w: 0.25 }],
        cost: { fun: 1.5 }, stake: { fun: true },
        outcomes: {
          crit: { body: "你的「宁可备而不用」撞上全民心跳，联邦把你的方案抄进全国指引，你成了反恐条款的地方样板。", effects: { rep: 1.7, fac: { agency: 10, military: 6, establishment: 5 } } },
          ok: { body: "应急预算批了，联邦点名夸你「行动快」，民权律师开始抄你的名字。", effects: { rep: 0.75, fac: { agency: 6, military: 3 } } },
          meh: { body: "你的扩权案在委员会里搁着，恐慌已换了话题。", effects: { rep: -0.3, fac: { base: -3 } } },
          fail: { body: "筛查设备到货那天假警报闹了个通宵，「就是他吓出来的」传遍居民区。", effects: { rep: -1.5, fac: { base: -6, press: -5 }, flags: ["scandal_1"] } },
          critfail: { body: "强检条例误伤了本族裔商户，「恐慌立法」的清算名单里你名字排在最前。", effects: { rep: -2.5, fac: { press: -8, base: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "truth", text: "逼联邦交底：公开真实风险，本地先组织医院演练",
        note: "赌人不恨说真话的人。风险：恐慌会被算到你头上。",
        /* 「逼联邦交底」的主语不能是在任总统 */
        when: { tierRaw: true, tierMax: 8 },
        base: 0.53, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "你手里那份「实情加演练」的方案救了分拣站的复工，记者圈传你「越乱话越准」。", effects: { rep: 1.3, attr: { INT: 2 }, fac: { press: 8, base: 6 } } },
          ok: { body: "你说清了风险，演练排上了日历；联邦嫌你多嘴，本地谢你说人话。", effects: { rep: 0.65, fac: { press: 5, base: 3 } } },
          meh: { body: "你的透明呼吁两边不讨好：联邦不回，民众照慌。", effects: { rep: -0.2, fac: { agency: -3 } } },
          fail: { body: "你引用的风险评估后来被证伪，「他说的实话」成了笑话的固定主语。", effects: { rep: -1.3, fac: { agency: -8, establishment: -5 } } },
          critfail: { body: "你从联邦渠道要来的内部通报被媒体整版刊出，追查泄源的名单第二天就到了。", effects: { rep: -2.2, fac: { establishment: -8, agency: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        /* 不分档：这支是本卡唯一无 cost 无 req 的保底，总统档也要有一个不冒险的按钮可点 */
        id: "prep", text: "不喊口号：给邮递员配防护装备，排好分发点",
        note: "赌的是不沾染。风险：做完了没人知道是你。",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "分拣站成了全县最规矩的一处，工会与卫生局都点头，没人知道你起的作用。", effects: { rep: 0.3 } },
          ok: { body: "口罩与分发点都就位了，社区安静地过了这一波。", effects: { rep: 0.2 } },
          meh: { body: "你做的都是不显眼的事，恐慌也没往你这里来。", effects: {} },
          fail: { body: "有人嫌装备发得慢，骂完也还想不起骂谁。", effects: { rep: -0.2 } },
          critfail: { body: "一单虚惊过后，「早该多备」的闲话飘了两天就散了。", effects: { rep: -0.3 } }
        }
      },
      /* #21 M4：总统视角 —— 全国只有你一个人能对着一亿封信说话。
         卡级 tierMax 由 time.js 的钉卡抬闸放到 9，认的就是这一支决策档；
         上面两支地方口吻的已挡在 8 级以下，保底那支留在所有档位。 */
      {
        id: "situation_room", text: "把它接成自己的仗：停掉全国邮路、启动疫苗储备，你本人上电视讲细菌",
        note: "赌全国在恐慌里只认总统一张脸。风险：防疫的每一起失误从此都归你。",
        when: { tierRaw: true, tierMin: 9 },
        base: 0.5, mods: [{ src: "approval", w: 0.3 }, { src: "attr", key: "INT", w: 0.25 }],
        cost: { fun: 3 }, stake: { fun: true },
        outcomes: {
          crit: { body: "你在椭圆办公室念完那篇讲细菌的稿子，当晚邮局复工、各州照着联邦指引排好了检测。半年后听证会上，你的名字和「没失控」写在同一页。", effects: { rep: 2.4, appr: 5, fac: { agency: 10, military: 6, establishment: 6, base: 4 } } },
          ok: { body: "全国生物防御的预算从这一夜起翻倍。你成了那个「处理过炭疽」的总统，历史把这四年写得很挤。", effects: { rep: 1.2, appr: 3, fac: { agency: 6, establishment: 4 } } },
          meh: { body: "停邮两天，经济损失摆上桌面，你把口令改回「分级恢复」。没出事，也没人记得你做过决定。", effects: { rep: -0.3, appr: -1, fac: { commercial: -4 } } },
          fail: { body: "又一封带孢子的信在你们自己管控不力的邮路里寄到了。记者不再问细菌从哪来，改问总统什么时候知道的。", effects: { rep: -1.8, appr: -5, fac: { press: -8, agency: -6 }, flags: ["scandal_1"] } },
          critfail: { body: "两起感染都发生在联邦宣布「已受控」之后，你的简报被逐句反着念。国会开始讨论罢免一个会传染的政府。", effects: { rep: -3, appr: -9, fac: { press: -10, establishment: -8, base: -6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2001-12／2002-01 · 安然崩塌 —— 「最具创新力」的公司一个季度清零
   * ==================================================================== */
  {
    id: "ln02_enron", grade: "mid", category: "finance",
    valence: "risk", dyn: true,
    minYear: 2001, maxYear: 2002, scoped: true, tierRaw: true, tierMin: 1, tierMax: 6, weight: 12, unique: true,
    medium: ["print", "tv", "internet"], month: 12,
    title: "能源巨头申请破产，把退休金一并拖了进去",
    body: "连续六年被评为「美国最具创新力」的能源公司申请了史上最大破产，百年审计所随之塌掉；数千名员工在破产前一天还被困着不许卖出自家股票的退休金账户。\n" +
      "同类「加州式电力松绑」正在别州推行，那家公司的游说客上季度刚在你的委员会作过证。选区退休职工每周来办公室问一次：我们的账，谁来看。",
    brief: {
      lede: "大公司的账本被翻开时，请客吃饭名单上的人名也在被翻。",
      known: [
        "退休金被套在锁定期，高位卖不掉。",
        "本地退休职工每周来要一个说法。",
        "它吹过的电力交易模型还在三州运行。"
      ],
      rumor: [
        "有人说审计所昨夜烧了一整柜文件。",
        "有人说国会早拿到数字，只等和解。"
      ],
      unknown: [
        "此后的新规则将定义公司披露十年。",
        "你是切割、跟查还是收尾，都在记账。"
      ],
      terms: [{ k: "401(k)", v: "雇主退休金账户，常重仓自家公司。" }]
    },
    choices: [
      {
        id: "hearings", text: "顺势问责：开本地听证，传询能源交易商",
        note: "赌愤怒是最安全的票。风险：金主的钱流向对手。",
        base: 0.46, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "press", w: 0.25 }],
        cost: { fun: 1.5 },
        outcomes: {
          crit: { body: "你的听证把三州的交易模型问出了裂缝，全国调查记者把你列为「本地敢开第一枪的」。", effects: { rep: 1.7, attr: { INT: 2 }, fac: { press: 8, base: 6, commercial: -8 } } },
          ok: { body: "听证开了，证词吵得热闹，你的问责立住了，晚宴请柬也少了一半。", effects: { rep: 0.75, fac: { press: 5, commercial: -4 } } },
          meh: { body: "听证会成了互相甩锅大会，没问出新东西。", effects: { rep: 0.1 } },
          fail: { body: "被你传询的商行反手撤了本地公益基金的钱，受助者先来问你赔。", effects: { rep: -1.5, fac: { commercial: -8, establishment: -5 } } },
          critfail: { body: "你的听证被定为「毁掉投资信心」的样本，能源游说团集体出面挺你的对手。", effects: { rep: -2.4, fac: { commercial: -10, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "settle", text: "悄悄收尾：先请律师与托管人到桌前，替退休金争回一部分",
        note: "赌退休票只看拿回多少。风险：暗箱字样贴你墙上。",
        base: 0.56, mods: [{ src: "attr", key: "INT", w: 0.3 }, { src: "attr", key: "CUN", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "和解条款里本地名字排在前列，托管律师私下说「这人懂怎么在沉船上分钱」，退休职工的名单记住了你。", effects: { fun: 3, rep: 0.9, fac: { base: 8, establishment: 4 } } },
          ok: { body: "你争回一小块，钱到账的时候没人再追问过程。", effects: { fun: 1.5, rep: 0.35, fac: { base: 5 } } },
          meh: { body: "谈判漫长，你垫的功夫只换成一小笔象征性补偿。", effects: { fun: 0.5, rep: 0.05 } },
          fail: { body: "和解黄了，受助者回头打听「你到底收了谁的好处」。", effects: { rep: -1.1, fac: { base: -5, press: -4 } } },
          critfail: { body: "你与律所的往来邮件被全文登报，「暗箱」两个字从此跟着你。", effects: { rep: -2, fac: { press: -6, base: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "audit", text: "只查自家账：核一遍选区基金持仓，其余不表态",
        note: "赌的是不沾染。风险：白忙一场没人看见。",
        base: 0.63, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "持仓核得干干净净，你在质询会上「自家账先说得清」一句被主持人记了终身。", effects: { rep: 0.3 } },
          ok: { body: "账面没问题，你躲过了所有站队的坑。", effects: { rep: 0.15 } },
          meh: { body: "查完没人问结果，风波与你无关。", effects: {} },
          fail: { body: "「查自己当然查不出事」，一句闲话，没掀起什么。", effects: { rep: -0.2 } },
          critfail: { body: "你的沉默被一句「他不敢碰那本大账」带了过去。", effects: { rep: -0.3 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2002-11 · 中期选举 —— 借国旗的年景（本带唯一的机遇卡）
   * ==================================================================== */
  {
    id: "ln02_midterms", grade: "mid", category: "political",
    valence: "boon", dyn: true,
    minYear: 2002, maxYear: 2002, scoped: true, tierRaw: true, tierMin: 0, tierMax: 6, weight: 12, unique: true,
    medium: ["tv", "cable", "print", "radio", "internet"], month: 11,
    title: "战后第一次中期选举，人人都想借那件外套",
    body: "两件事改变了中期选举：废墟与战争。在任总统的支持率挂在历史高位，「支持反恐」的浪潮涌进每一场地方选举；对面连反对一句都要排练半天。经济却在悄悄发软。\n" +
      "党部信封寄到你名下：要不要吃全国机器的助选资源。旗子这一年好使，嫌它碍事的还没几个敢开口。",
    brief: {
      lede: "顺风年：几乎人人都会赢一点，问题是你借到多少。",
      known: [
        "战时中期历来偏向在任党一方。",
        "本地「支持部队」委员会邀你同台。",
        "对手已先把国旗别在了自己胸前。"
      ],
      rumor: [
        "有人说伤亡名单一长风就转向。",
        "有人说钱正流向对面，只是没人敢认。"
      ],
      unknown: [
        "借来的光环要还，通常带利息。",
        "你这次赢下的席位未必下次还是你的。"
      ],
      terms: [{ k: "中期选举", v: "总统任期第两年的国会改选。" }]
    },
    choices: [
      {
        id: "wave", text: "站到旗子旁边：吃全国背书，整场选战讲反恐",
        note: "赌顺风能吹到地方票。风险：风转时你站最前。",
        base: 0.68, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "establishment", w: 0.25 }],
        req: { tier: 1 },
        outcomes: {
          crit: { body: "全国广告末尾滚过你的名字，地方机器全速开动——这一年你只要不犯错，票会自己走进来。", effects: { rep: 1.8, voters: { warm: 900 }, fac: { establishment: 10, military: 6 } } },
          ok: { body: "你顺着浪潮走完选战，赢了该赢的，党部清单上你的名字往上挪了一格。", effects: { rep: 0.8, voters: { warm: 300 }, fac: { establishment: 4 } } },
          meh: { body: "背书是给了，机器照转，你没占到便宜也没吃亏。", effects: { rep: 0.2 } },
          fail: { body: "你跟着浪潮游，寸进没有——至少一年里什么都没失去。", effects: { rep: 0.05 } },
          critfail: { body: "风在终点线前小了一档，你只是没能借上力，账面上仍是平的。", effects: {} }
        }
      },
      {
        id: "bread", text: "逆着浪谈过日子：医保药价与裁员一起讲",
        note: "赌热闹散去还要看钱包。风险：这一年显得不合时宜。",
        base: 0.5, mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        req: { fac: "base", min: 20 },
        outcomes: {
          crit: { body: "你把药房账单与裁员信钉在同一块看板上，旗子的喧嚣里，一小股「先顾日子」的火种算在你名下。", effects: { rep: 1.5, attr: { INT: 3 }, voters: { warm: 600 }, fac: { base: 10, labor: 6 } } },
          ok: { body: "你的民生调子低却不缺席，基层选民记住你没跟着喊打。", effects: { rep: 0.6, attr: { INT: 1 }, voters: { warm: 200 }, fac: { base: 5 } } },
          meh: { body: "你的议题被浪潮盖住，声音没丢，也没人听见。", effects: { rep: 0.2 } },
          fail: { body: "这一年的选民只想听旗子的事，你的钱包论述落了空——但也没沾一身腥。", effects: { rep: 0.05 } },
          critfail: { body: "浪潮大得容不下任何别的声音，你只是白跑了一趟。", effects: {} }
        }
      },
      {
        id: "ownrace", text: "不借全国的旗：只办自家选区的水电与校董事会",
        note: "赌的是不沾染。风险：赢输都只算自己的。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "两桩本地小事办结，街坊票仓稳稳的——风大风小都不关你的选区。", effects: { rep: 0.4, voters: { warm: 500 } } },
          ok: { body: "你把自己的赛道扫干净了，没借光，也没欠债。", effects: { rep: 0.2, voters: { warm: 400 } } },
          meh: { body: "一场安静而完整的本地选战，赢了该赢的三四个议题。", effects: { rep: 0.1 } },
          fail: { body: "全国浪潮里没人注意本地，你也只是路过。", effects: {} },
          critfail: { body: "你没借上光也没做错事，这一页干干净净。", effects: {} }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 世界线 · 1999—2002：本带每一年的压力 / 年初情绪 / 当年真实存在的媒体。
 *   core.js 按字段深合并，与 21-worldline.js（1980—1990）互不覆盖。
 * ==========================================================================*/
POTUS.define("worldline", {
  pressure: {
    "1999": 3,   // 科伦拜恩、巴尔干战火与误炸、西雅图街头；经济却是最热的一年
    "2000": 4,   // 大选年 + 科勒号 + 历史上最难看的计票僵局
    "2001": 6,   // 本带峰值：9/11、炭疽、安全状态整体改向
    "2002": 4    // 中期选举年 + 炭疽余波 + 安然账单铺开
  },
  brief: {
    "1999": "「最好的年代」的尾巴：繁荣让人松弛，枪声、炸弹与街头抗议又轮流把人摇醒——没人相信好日子有尽头。",
    "2000": "选举夜数出来的总统悬了几百票，也把这个国家心里那点互相的不信任，第一次摆上了台面。",
    "2001": "九月的烟还没散尽，一整年的情绪就从富足的倦怠坠进哀恸与愤怒——安全从此压过自由，成了新的日常口音。",
    "2002": "恐惧成了生活方式：人们排队把权利交给能许诺安全的任何人，顺便怀疑那些不肯说「放心」的人。"
  },
  outlets: {
    "1999": ["纽约时报", "华尔街日报", "今日美国", "有线电视新闻网", "德拉吉报道"],
    "2000": ["纽约时报", "华盛顿邮报", "今日美国", "有线电视新闻网", "福克斯新闻频道"],
    "2001": ["纽约时报", "华尔街日报", "今日美国", "有线电视新闻网", "全国公共广播电台"],
    "2002": ["纽约时报", "今日美国", "有线电视新闻网", "福克斯新闻频道", "石板杂志网络版"]
  }
});

/* ============================================================================
 * 全局定点表 fixed · 1999—2002：本带 8 张新卡 + 复用存量卡钉锚。
 *   · 9/11 与爱国者法不重写，只钉 wt01_september / wt02_patriot / wt02_alert。
 *   · 定点仍要过普通触发条件（tier 等）——够不着的人被静默跳过。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln99_columbine", year: 1999, month: 4, grade: "mid" },
  { event: "ln99_balkans", year: 1999, month: 5, grade: "major" },
  { event: "ln99_wto", year: 1999, month: 11, grade: "mid" },
  { event: "ln00_cole", year: 2000, month: 10, grade: "mid" },
  { event: "ln00_hang", year: 2000, month: 11, grade: "major" },
  /* —— 存量卡只钉不写（旧 era 写法保留原样） —— */
  { event: "wt01_september", year: 2001, month: 9, grade: "major" },
  { event: "wt02_patriot", year: 2001, month: 10, grade: "mid" },
  { event: "ln01_anthrax", year: 2001, month: 10, grade: "major" },
  { event: "ln02_enron", year: 2001, month: 12, grade: "mid" },
  { event: "wt02_alert", year: 2002, month: 8, grade: "minor" },
  { event: "ln02_midterms", year: 2002, month: 11, grade: "mid" }
]);
