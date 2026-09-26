/* ============================================================================
 * CONTENT · events/149-whitehouse-3.js
 * 白宫事务池扩片（第三片）——147 那八张之外的新货：外交族 4 张 + 人事族 4 张。
 *
 * 为什么还要拆片：
 *   · 147 只有四族各 2 张，撑的是 repeatMonths=8 的周期；M2 要把池子抬到每族 ≥4，
 *     一次全塞进 147 会让一个文件长出二十张卡，分工与逐条校核都对不上。
 *   · 于是按族切给不同的人写：148 是危机/立法两片，本文件是外交/人事两片，
 *     三个文件互不重叠、也不与 147 的主题撞车（同族不同事）。
 *   · 拆片不改管线：这些卡照旧 wh:true + whFamily，只经 P.whiteHouseSlot() 的
 *     四族轮转入场（engine/presidency.js），永不进随机卡池。
 *
 * 写法纪律（与 147 逐条一致）：
 *   · tierRaw:true, tierMin:9, tierMax:9 —— 只有总统看得到。
 *   · unique:false —— 任期 96 月，靠月份冷却把关，不靠 doneIds。
 *   · dyn:true —— rep/hp 写系数，appr 是 0-100 的刻度不折算。
 *   · category 复用既有键：外交族走 foreign，人事族走 career → 配图映射零改动。
 *   · 每卡至少一个选项吃支持率（mods 里的 approval），至少一个既无 cost 又无 req 的保底。
 *   · 铁律：只用「」；每卡五档结果齐全；不写 camp/fun/attr/tier/hardEnd。
 *   · 次任专属：每族恰好一张在事件自身挂 flags:["pres_two_terms"]（whEligible 走
 *     P.when 读它），只有连任成功进第二届才可能出现在桌上——剧情也就写那种
 *     「没有下一次当选」才有的处境。
 * ==========================================================================*/

POTUS.define("event", [

  /* ================= 外交族 ================= */
  {
    id: "wh_strait", grade: "major", category: "foreign", valence: "bane",
    wh: true, whFamily: "foreign", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "cable"],
    title: "布雷的海峡，和只有两艘在港的舰队",
    body: "封锁是昨夜开始的：两道巡逻线，一份「未经许可的船只后果自负」的公报，还有停在水两边的四十条油轮。三位盟国大使在国务院排队，他们要一句表态。海军作战部长把话说得很短：能动的是两艘，其余在船坞。第三份文件来自能源署——原油七天涨四成，加油站的队已经排到街角。只是放了储备油压住自家油表，海峡对面会把这份沉默读成许可。",
    choices: [
      {
        id: "escort", text: "宣布护航：把两艘能动的顶到海峡口，你在镜头前说清这是国际水道",
        base: 0.4, mods: [{ src: "approval", w: 0.3 }, { src: "fac", key: "military", w: 0.2 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "两艘编队在海峡口排成一线，对方的船队第二天自己退了。你只说了那句话，油价跌回七成。", effects: { rep: 0.85, appr: 6, fac: { establishment: 6, military: 10 }, voters: { warm: 2000, oppose: -600 }, score: 0.4 } },
          ok: { body: "没有开火，油轮一艘一艘从军舰旁边过去了。盟国说：这就是他们要的答案。", effects: { rep: 0.45, appr: 3, fac: { military: 6 }, voters: { warm: 800 } } },
          meh: { body: "编队挡住了第一条航线，也把自己的底牌露光了：全世界都知道你只有两艘。", effects: { rep: 0.1, appr: -1 } },
          fail: { body: "一艘驱逐舰在海峡口擦上暗礁，那张照片比你讲话先到国内。", effects: { rep: -0.4, appr: -6, fac: { military: -5 } } },
          critfail: { body: "一次擦枪走火之后，对方宣布海峡只对「自己的船」开放，而你派不出第二支编队。", effects: { rep: -0.9, appr: -11, hp: -0.4, fac: { foreign: -8 }, flags: ["strait_closed"] } }
        }
      },
      {
        id: "coalition", text: "不开枪：把这件事交给盟国集体，一次联合声明加一支联合扫雷队",
        base: 0.58, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "一次会议就凑出十三国的签名与联合扫雷。被指责布雷的不是你，也不是你的舰队。", effects: { rep: 0.4, appr: 2.5, fac: { establishment: 5, foreign: 8 } } },
          ok: { body: "声明晚了三天，可上面有十三个签名。你不必独自承担那句话。", effects: { rep: 0.2, appr: 1, fac: { foreign: 4 } } },
          meh: { body: "联合扫雷排到第二周才开工，小盟国开始怀疑白宫讲话的分量。", effects: { rep: 0, appr: -2 } },
          fail: { body: "两位大使会后各自单独表态，联合声明成了一张纸。", effects: { rep: -0.25, appr: -4, fac: { foreign: -5 } } },
          critfail: { body: "十三国散成四个，剩下那份里没有一处提到海峡。国内的说法变成：总统把决定交给了别人。", effects: { rep: -0.55, appr: -8, flags: ["coalition_fell"] } }
        }
      },
      {
        id: "reserve", text: "先顾自家油表：动用战略储备平抑油价，海峡的话押到下周再说",
        base: 0.66, mods: [{ src: "approval", w: 0.2 }],
        outcomes: {
          crit: { body: "储备一放，加油站门口两天的队就散了。你把「不会涨」这句变成了看得见的事实。", effects: { rep: 0.3, appr: 4, fac: { base: 5, commercial: 4 }, voters: { warm: 700 } } },
          ok: { body: "油价压回两成，人们暂时不去想海峡。", effects: { rep: 0.15, appr: 2 } },
          meh: { body: "油表稳住了，报馆开始问：所以对布雷这件事你什么也没说。", effects: { rep: 0, appr: -1.5 } },
          fail: { body: "对方把「白宫先想到油价」这句写进自己的通报，念给全世界听。", effects: { rep: -0.2, appr: -3.5 } },
          critfail: { body: "储备放出三分之一，油价只跌了一天。封锁第二十三天，工厂开始配给燃料。", effects: { rep: -0.45, appr: -7, flags: ["strait_quiet"] } }
        }
      }
    ]
  },

  {
    id: "wh_hostage", grade: "major", category: "foreign", valence: "bane",
    wh: true, whFamily: "foreign", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "cable"],
    title: "第四十四天：沙漠里的八架直升机，和一笔不能提的汇款",
    body: "四十四天前一群武装者冲进使馆，十一名外交官至今活着——对方每天早上寄一段录音来，那是唯一的证据。军方把营救方案放在你桌上：八架直升机，穿越八百公里沙漠，只有一次机会，回程带不带得回来没人保证。同一只抽屉里是第二份文件：秘密渠道上那笔汇款的底单，而报馆已经在问白宫是不是付了钱——把汇款自己讲成新闻，也就等于告诉世界你付过。",
    choices: [
      {
        id: "rescue", text: "飞进去：八架直升机、一夜沙漠，你亲自等第一份战报",
        base: 0.38, mods: [{ src: "approval", w: 0.3 }, { src: "fac", key: "military", w: 0.25 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "六小时飞完八百公里，十一个人一个不少地在自己土地上吃了早餐。你念出名单时声音是稳的。", effects: { rep: 0.9, appr: 6, fac: { military: 12, establishment: 6 }, voters: { diehard: 2200 }, score: 0.45 } },
          ok: { body: "九个人出来了，两个人留在沙漠里。全国听见了那两句名字。", effects: { rep: 0.5, appr: 3, hp: -0.2, fac: { military: 5 }, flags: ["hostages_partial"] } },
          meh: { body: "营救扑空。人还在里面，而你已经没有第二个方案。", effects: { rep: 0.05, appr: -3, hp: -0.2 } },
          fail: { body: "直升机在第二处检查站被迫降落，画面活了十九分钟，然后黑掉。", effects: { rep: -0.5, appr: -7, hp: -0.4, flags: ["rescue_failed"] } },
          critfail: { body: "一名人质在交火中死亡，谈判渠道同时断掉。此后每周都有一个新名字被念出来。", effects: { rep: -0.95, appr: -12, hp: -0.5, fac: { military: -8, foreign: -6 }, flags: ["rescue_failed"] } }
        }
      },
      {
        id: "reveal", text: "把那笔汇款自己讲出来：公开秘密渠道，撤掉对方要价的理由",
        base: 0.52, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你把账本一并交出去，只说明一句「钱没有到」。当天国内谈的已经不是付款。", effects: { rep: 0.4, appr: 3, fac: { press: 4, foreign: 3 } } },
          ok: { body: "汇款被你自己讲成一次未遂的骗局，对方的要价一下轻了一半。", effects: { rep: 0.2, appr: 1.5, flags: ["payment_exposed"] } },
          meh: { body: "报界更感兴趣的是「谁先动的那笔钱」。人质还在第四十四天以后。", effects: { rep: 0, appr: -2 } },
          fail: { body: "公开之后对方撤走谈判代表。你说破了嘴，也说断了唯一那条线。", effects: { rep: -0.3, appr: -5, flags: ["payment_exposed"] } },
          critfail: { body: "底单证明那笔钱确实走过一次。你为了躲「付款」这个字，把它坐实了。", effects: { rep: -0.6, appr: -9, hp: -0.3, flags: ["payment_admitted"] } }
        }
      },
      {
        id: "talks", text: "两样都不做：让渠道继续谈，再撑两周，对外一个字不讲",
        base: 0.65, mods: [{ src: "attr", key: "INT", w: 0.25 }],
        outcomes: {
          crit: { body: "第十三天放出三个人，说是「示好」。报纸把这叫做进展，进展就够用了。", effects: { rep: 0.25, appr: 2.5 } },
          ok: { body: "人还活着，线还在。国内每天数日子，但没有坏消息可数。", effects: { rep: 0.1, appr: 0 } },
          meh: { body: "两周过去没有任何人出来。第四十九天，一张照片自己爬上了头版。", effects: { rep: -0.05, appr: -2.5 } },
          fail: { body: "秘密渠道被第三国卖给了一家通讯社，他们留着稿，等你自己开口。", effects: { rep: -0.3, appr: -5, flags: ["channel_leaked"] } },
          critfail: { body: "第八十一天，一段直播里有人念出一个名字。此后你每一次开口，人们先想起那几十天的沉默。", effects: { rep: -0.7, appr: -10, hp: -0.4, flags: ["channel_leaked"] } }
        }
      }
    ]
  },

  {
    id: "wh_treaty", grade: "mid", category: "foreign", valence: "risk",
    wh: true, whFamily: "foreign", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "internet"],
    title: "到期前三天，和一句由对方起草的核查条款",
    body: "条约七十二小时后失效，桌上只剩那一条核查措辞没谈定——而对方送来的版本里，有半句是我们自己没想到的。国务院说签了吧，参院两位资深议员说这一句等于把眼睛闭上，参联会主席则要求先在听证会上讲清楚「我们不天真」。你的三小时里，两份草稿同时送来，都写着你的签名位置。只是那句证词说完，也会绑住你签字的手。",
    choices: [
      {
        id: "accept", text: "接受那句措辞：条约续下去，其余留到下一个任期再说",
        base: 0.6, mods: [{ src: "approval", w: 0.2 }],
        outcomes: {
          crit: { body: "你签了，还在记者会上把那句话解释成「门换由他们自己开」。第二天没人争论条文。", effects: { rep: 0.35, appr: 2.5, fac: { establishment: 4, foreign: 6 } } },
          ok: { body: "条约续了五年。核查队少进两处基地，可清单还握在你手里。", effects: { rep: 0.2, appr: 1 } },
          meh: { body: "签字当天没有抗议。九个月后，第一处漏检被发现。", effects: { rep: 0.05, appr: -1.5, flags: ["verification_gap"] } },
          fail: { body: "反对党把「由对方起草」这五个字做成广告，你的解释追不上它。", effects: { rep: -0.25, appr: -4 } },
          critfail: { body: "两年后证实那处漏检是一座新设施。听证会上他们把那一页递给你，请你当众念出来。", effects: { rep: -0.5, appr: -7, hp: -0.3, flags: ["verification_gap"] } }
        }
      },
      {
        id: "rewrite", text: "不接受：把那句话一个字一个字改回我们的口径，三天之内",
        base: 0.4, mods: [{ src: "approval", w: 0.3 }, { src: "attr", key: "INT", w: 0.2 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "七十二小时里你真把措辞扳了回来，对方为了避免背失效的锅签了字。", effects: { rep: 0.6, appr: 4, fac: { establishment: 6 }, score: 0.3 } },
          ok: { body: "只改动两个词，可那两个词是我们的。条约延长三年。", effects: { rep: 0.35, appr: 2.5 } },
          meh: { body: "谈到最后一个小时停住，双方同意「技术性延期」三个月。", effects: { rep: 0.1, appr: 0 } },
          fail: { body: "期限过了，条约失效。两国的声明同时发出，各自指着对方。", effects: { rep: -0.35, appr: -5, fac: { foreign: -5 }, flags: ["treaty_scrapped"] } },
          critfail: { body: "失效后九十天，对方公开试射那些原本受限的型号。你的将军们每星期报一次新数字。", effects: { rep: -0.65, appr: -9, flags: ["treaty_scrapped"] } }
        }
      },
      {
        id: "testify", text: "既不签也不改：让参联会主席先去作证，把期限拖进听证会",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.25 }],
        outcomes: {
          crit: { body: "那场听证会替你挡掉三个月的追问，人们说白宫至少不天真。条约在争议里又拖了半年。", effects: { rep: 0.2, appr: 2, fac: { military: 4 } } },
          ok: { body: "证词专业克制，条约在拉锯里撑到最后一格。", effects: { rep: 0.1, appr: 0.5 } },
          meh: { body: "将军在国会说了重话，第二天谈判桌上的电话没有再来。", effects: { rep: 0, appr: -2 } },
          fail: { body: "证词被对方整段引用为「白宫自己承认核查无用」，那条款从此没人再谈。", effects: { rep: -0.25, appr: -4, flags: ["treaty_scrapped"] } },
          critfail: { body: "听证会开了六小时，顺带说漏了两处被核查设施的名字。条约没了，安全也漏了。", effects: { rep: -0.5, appr: -7, hp: -0.3, flags: ["hearing_leak"] } }
        }
      }
    ]
  },

  {
    id: "wh_appease", grade: "mid", category: "foreign", valence: "risk",
    wh: true, whFamily: "foreign", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "internet"],
    flags: ["pres_two_terms"],
    title: "你下令炸过的城市，和讲稿里空着的那个词",
    body: "如今那里是广场、一所学校，和一块刻着三千余人名字的石头。第二任期没有下一次当选，你剩下的只有名声这一件事。主人请你讲三分钟；随行的两位参议员坚持稿子里不能出现那个词——念出它，国内的退伍军人组织当天就把「叛徒」印上横幅；不念，广场上的孩子已经练好一句提问：「总统先生，你是来道歉的吗？」",
    choices: [
      {
        id: "word", text: "讲出来：稿子里填上那个词，你亲自念，不推给任何前任或将军",
        base: 0.4, mods: [{ src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你说得很短，也没有把责任分给任何人。当晚那段视频传遍两种语言，石头前面排起了队。", effects: { rep: 0.55, appr: 4, fac: { base: 6, foreign: 10 }, voters: { warm: 1500 }, score: 0.35, flags: ["apology_spoken"] } },
          ok: { body: "两种反应同时接住这句话：国内骂，这里记住。", effects: { rep: 0.3, appr: 1, fac: { foreign: 6 }, flags: ["apology_spoken"] } },
          meh: { body: "那个词说得很轻，话筒收得不够，一半人以为你说的是别的东西。", effects: { rep: 0.1, appr: -1 } },
          fail: { body: "两位参议员当场退掉随行的晚餐，那张空椅子的照片上了国内头版。", effects: { rep: -0.2, appr: -4, fac: { establishment: -5 } } },
          critfail: { body: "那句话被截成十二秒，印在你对手的广告上，标题写着「总统向敌人道歉」。你的回忆录还没动笔就定了调。", effects: { rep: -0.5, appr: -7, flags: ["apology_spoken", "legacy_word"] } }
        }
      },
      {
        id: "fund", text: "不谈那个词：宣布三年重建账目与一所医院的开工",
        base: 0.62, mods: [{ src: "approval", w: 0.2 }],
        outcomes: {
          crit: { body: "只讲钱、讲工期、讲那所学校。市长结束时说了一句：这比讲话实在。", effects: { rep: 0.4, appr: 3, fac: { foreign: 8, establishment: 3 } } },
          ok: { body: "基金落地，新闻按预算走了一周。", effects: { rep: 0.25, appr: 2 } },
          meh: { body: "钱是真的。可人们来是为了听那一句，听完就走了。", effects: { rep: 0.1, appr: 0 } },
          fail: { body: "那位记者把话筒又递回来一次：所以这笔钱是代替那个词的吗。", effects: { rep: -0.15, appr: -2.5, flags: ["word_unsaid"] } },
          critfail: { body: "款项回国后卡在国会两年。那里的报纸把「白宫说过的那笔钱」和那块石头印在同一版。", effects: { rep: -0.4, appr: -5, flags: ["word_unsaid"] } }
        }
      },
      {
        id: "stone", text: "不讲也不给：只到那块石头前站着，四分钟，一句话不说",
        base: 0.66, mods: [{ src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "你在石头前站了四分钟，什么也没说。这张照片后来进了两个国家的课本。", effects: { rep: 0.35, appr: 3, fac: { foreign: 5 }, voters: { warm: 600 } } },
          ok: { body: "沉默被两边都读成了尊重，这就够了。", effects: { rep: 0.2, appr: 1.5 } },
          meh: { body: "照片很庄重。第二天有评论问：所以总统的意思究竟是什么。", effects: { rep: 0.05, appr: -1 } },
          fail: { body: "一位家属从队列里走出来，把名字清单塞进你手里——所有镜头都在那一刻抬头。", effects: { rep: -0.2, appr: -3 } },
          critfail: { body: "石头底座上有人刻了一句「这里没有道歉」，照片传遍世界。第二任期人人记得的只有一件事：那四分钟你什么都没讲。", effects: { rep: -0.45, appr: -6, flags: ["word_unsaid"] } }
        }
      }
    ]
  },

  /* ================= 人事族 ================= */
  {
    id: "wh_justice", grade: "major", category: "career", valence: "risk",
    wh: true, whFamily: "personnel", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "cable"],
    title: "三十天，两份名单，一个空座位",
    body: "一位大法官在十月宣布退休，参院说只给你们三十天走完全部程序。党的基层在电话会上点名要一个「在那两件事上站得住的人」；两位最大的捐款人同一天送来同一份三人名单，理由写了四页。司法部自己那份只有资历，没有立场。提基层点的那位，金主当季就把手收回去；提金主名单上那位，此后每一步都有人提醒你是谁的人。你的支持率每掉一格，这两边说话的音量就高一分。",
    choices: [
      {
        id: "party", text: "提基层要的那位：让这个座位替你说一句他们想听的话",
        base: 0.42, mods: [{ src: "approval", w: 0.3 }],
        outcomes: {
          crit: { body: "他在委员会上一句没让步，最后有两位自家党的人投了赞成。基层第一次觉得白宫听得见他们。", effects: { rep: 0.55, appr: 4, fac: { base: 10, establishment: -3 }, voters: { diehard: 2000 }, score: 0.3 } },
          ok: { body: "确认过了。金主没有撤钱，只在下一个季度少了一半。", effects: { rep: 0.3, appr: 2, fac: { base: 6 } } },
          meh: { body: "听证会开成六个月，座位空着，两边同时说白宫没本事。", effects: { rep: 0, appr: -2 } },
          fail: { body: "他把一份旧判决的年份说错了，反对党当晚剪出三十秒，循环放了两周。", effects: { rep: -0.3, appr: -5 } },
          critfail: { body: "提名撤回，空位一直留到中期选举之后。报纸写：白宫连自己写的名单都保不住。", effects: { rep: -0.6, appr: -8, flags: ["seat_empty"] } }
        }
      },
      {
        id: "donor", text: "提那份四人名单里最稳的一位：让程序两天走完",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "名单里那位年轻到无懈可击，两党都夸你克制。座位当天就有名字了。", effects: { rep: 0.4, appr: 3, fac: { establishment: 8, commercial: 8 } } },
          ok: { body: "九天通过，全场没有一句争议。", effects: { rep: 0.25, appr: 1.5, fac: { commercial: 5 } } },
          meh: { body: "过了。三个月后那份判决出来，你的电话会上有人问：这是谁选的人。", effects: { rep: 0.05, appr: -1.5 } },
          fail: { body: "基层把「你欠华尔街一个座位」写进地方党的筹款函，寄给每一户。", effects: { rep: -0.25, appr: -4, fac: { base: -6 } } },
          critfail: { body: "他上任后第一案就否掉你的核心政策，而所有人都记得是谁把他放进去的。", effects: { rep: -0.45, appr: -6, fac: { base: -8 }, flags: ["court_debt"] } }
        }
      },
      {
        id: "merit", text: "谁的名单都不用：让司法部按资历自拟，原样送出",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.25 }],
        outcomes: {
          crit: { body: "那份名单上是一位两党都挑不出毛病的法官，你一个字没改地送出去，程序体面到没人有话说。", effects: { rep: 0.35, appr: 2.5, fac: { establishment: 5 } } },
          ok: { body: "通过得慢但稳，没有人觉得这是白宫的胜利，也没有人觉得是失败。", effects: { rep: 0.2, appr: 1 } },
          meh: { body: "两边各自保留评价：白宫把决定交给了技术官僚。", effects: { rep: 0.05, appr: -1 } },
          fail: { body: "那位法官被自己人质疑立场，听证会一路拖到下一次选举。", effects: { rep: -0.2, appr: -3.5, flags: ["seat_empty"] } },
          critfail: { body: "名单泄露之后两党合起来打「白宫不做决定」。空座位和这份名声一起留到最后一年。", effects: { rep: -0.5, appr: -7, flags: ["seat_empty"] } }
        }
      }
    ]
  },

  {
    id: "wh_chief", grade: "mid", category: "career", valence: "bane",
    wh: true, whFamily: "personnel", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "internet"],
    title: "同一份名单，两个划掉的三行",
    body: "名单上有七个职位。幕僚长划掉三个，理由写在背面，字迹很急。当天晚上，第一夫人的助理送来一张便条，上面是她认为该换掉的三个人——其中两个正是幕僚长保住的那两个。这两个人过去八个月分别在你的厨房桌边出现过，而这一次只有一个人能在名单上签字。也可以把名单整个退回重拟——那是今天不付钱、下个月双倍付的那条路。",
    choices: [
      {
        id: "chief", text: "按幕僚长的版本签，并把便条当面交还，说清为什么",
        base: 0.58, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你签了，也解释了。当晚家里没人说话，第二天西翼安静得像修好了。", effects: { rep: 0.35, appr: 2, fac: { establishment: 6 } } },
          ok: { body: "名单过了，办公室只剩一个声音。", effects: { rep: 0.2, appr: 1 } },
          meh: { body: "事办完了。此后三个月那两位不再同处一室，记者闻得出来。", effects: { rep: 0, appr: -1.5, flags: ["chief_won"] } },
          fail: { body: "便条上那三个人各自对朋友讲了一句：白宫里已经不是一家人了。", effects: { rep: -0.25, appr: -4 } },
          critfail: { body: "第一夫人在自己的节目讲话里留下一句「有些决定没人问我」。此后每场发布会都在问同一件事。", effects: { rep: -0.55, appr: -8, flags: ["house_divided"] } }
        }
      },
      {
        id: "house", text: "采纳便条上那三个人：家里的事，先在名单上解决",
        base: 0.42, mods: [{ src: "approval", w: -0.25 }],
        outcomes: {
          crit: { body: "那三个确实是最该换的。西翼的效率当天就变了，也没人敢再拿名单试第二个方向。", effects: { rep: 0.4, appr: 3, fac: { base: 4 } } },
          ok: { body: "名单按便条改了两人。幕僚长当天没有辞职，只是从此不再在背面写理由。", effects: { rep: 0.15, appr: 1 } },
          meh: { body: "事情办了。之后每份文件都多一次抄送，收信人在楼上。", effects: { rep: 0, appr: -2 } },
          fail: { body: "幕僚长把辞呈放在你桌上，纸上只有一行字——而摄影师拍到了那张桌子。", effects: { rep: -0.35, appr: -5, flags: ["chief_resigns"] } },
          critfail: { body: "两位前任在同一个节目上讲了你家里怎么分人。你的最后两年被写成一部家务剧。", effects: { rep: -0.7, appr: -10, hp: -0.3, flags: ["house_divided"] } }
        }
      },
      {
        id: "return", text: "七个人都不动，把整份名单退回重拟",
        base: 0.65, mods: [{ src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "两天后送来一份谁也没划掉谁的新名单，这件事就这样过去了。", effects: { rep: 0.15, appr: 1 } },
          ok: { body: "空缺挂着，没有人输，也没人欠你。", effects: { rep: 0.05, appr: 0 } },
          meh: { body: "三周后还在重拟。一位被挂着的人自己找了记者。", effects: { rep: -0.1, appr: -2.5 } },
          fail: { body: "两家报纸分别报道了「两份名单」的存在，问题从谁走变成谁在管事。", effects: { rep: -0.3, appr: -5, flags: ["list_leaked"] } },
          critfail: { body: "七个职位空缺八十天，两位局长在听证会上直接问：我们到底该听谁的。", effects: { rep: -0.5, appr: -7, flags: ["list_leaked"] } }
        }
      }
    ]
  },

  {
    id: "wh_veep", grade: "mid", category: "career", valence: "risk",
    wh: true, whFamily: "personnel", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "cable"],
    title: "他替你输过一次初选，现在他要那三十秒",
    body: "初选那年，你在两个州把他推出去背了那笔预算账，他的名字和那串数字一起挂在地方报纸上整整六周。现在他说：我替你站台，二十场，一场不退；要的只有三十秒，不谈你的政策，只谈他自己那件事。幕僚长说那三十秒每场都会被单独剪出来，变成每周的头条，而你在三个中西部州正在往下掉。总统的日程表一年只空得出十场——二十场全靠自己跑，是另一回事。",
    choices: [
      {
        id: "free", text: "给他那三十秒，一字不改，也不许人在台下递条子",
        base: 0.45, mods: [{ src: "approval", w: 0.3 }],
        outcomes: {
          crit: { body: "那三十秒讲的是他在海军的儿子。现场安静下来，第二天两支地方球队都在放这段视频。", effects: { rep: 0.45, appr: 4, fac: { base: 6, military: 3 }, voters: { warm: 1200 }, score: 0.25 } },
          ok: { body: "他讲得平常，也没有人接他的话头。票照拉，一场不退。", effects: { rep: 0.25, appr: 2, voters: { warm: 500 } } },
          meh: { body: "三十秒里有一句被读成暗指你的预算，两边各剪各的版本。", effects: { rep: 0, appr: -1.5 } },
          fail: { body: "他在第七场自由发挥，讲回初选那段：有人让我背过不属于我的账。", effects: { rep: -0.3, appr: -5, flags: ["veep_free"] } },
          critfail: { body: "最后三场他没有来。报纸把二十场和那三十秒并排印在投票日前最后一天。", effects: { rep: -0.55, appr: -8, flags: ["veep_grudge"] } }
        }
      },
      {
        id: "script", text: "让他出门，但那三十秒逐字审，讲稿由你的写手定稿",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.25 }],
        outcomes: {
          crit: { body: "稿子逐字过，他没有改一句，二十场干净收工——而且真把三个州的差距压住了。", effects: { rep: 0.35, appr: 3, fac: { establishment: 5 } } },
          ok: { body: "二十场按稿子走完，没有一句多出。", effects: { rep: 0.2, appr: 1.5 } },
          meh: { body: "他念得很平。每场结束后都有记者问：副总统自己怎么想。", effects: { rep: 0.05, appr: -1 } },
          fail: { body: "一场直播里他念错两处地名，第二天「不在状态」这个说法开始往你身上转。", effects: { rep: -0.2, appr: -3.5, flags: ["veep_leashed"] } },
          critfail: { body: "一份稿子的批注版被送进报馆，标题只有一行：连这三十秒都是别人写的。", effects: { rep: -0.45, appr: -6, flags: ["veep_leashed"] } }
        }
      },
      {
        id: "solo", text: "不用他：把那二十场换成自己的巡回，两天一城",
        base: 0.38, mods: [{ src: "approval", w: 0.25 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "二十场你全都自己讲了，中西部差距收窄。副总统在最后一场出现，替你收尾，掌声也算他的。", effects: { rep: 0.5, appr: 4, voters: { warm: 900 }, score: 0.3 } },
          ok: { body: "你跑完了，嗓子坏了，票保住了。", effects: { rep: 0.25, appr: 2, hp: -0.2 } },
          meh: { body: "只跑到十一场，剩下九场改成视频讲话。", effects: { rep: 0.05, appr: -1 } },
          fail: { body: "一位州党主席接受采访：我们邀请的是两位，白宫只来一位。", effects: { rep: -0.2, appr: -3.5 } },
          critfail: { body: "那二十场最后被你换成一场电视讲话，三个州同日失守。从此党内一提「一个人跑」就像在说你不肯分话筒。", effects: { rep: -0.5, appr: -7, flags: ["solo_tour"] } }
        }
      }
    ]
  },

  {
    id: "wh_shadow", grade: "major", category: "career", valence: "bane",
    wh: true, whFamily: "personnel", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "cable"],
    flags: ["pres_two_terms"],
    title: "十一份辞呈，日期一栏空着",
    body: "十一份辞呈按同一份格式打印，签名都是真的，只有日期空着。他们说这不是逼宫，只是「一届新任期该有新的团队」。你的立法只剩最后一格程序要走，而第二任期没有下一次当选——这些人都清楚，他们下一步要面对的是你之后的那个人。幕僚长在门口问：今天上午回几个。你知道，拖到「稍后答复」的那三天里，报馆会替你选出先动谁。",
    choices: [
      {
        id: "reject", text: "十一份原样退回，一个字不改，让每个人当天照常开发布会",
        base: 0.55, mods: [{ src: "approval", w: 0.25 }],
        outcomes: {
          crit: { body: "你把辞呈退回，一个字没动，还让每个人当天出现在自己的镜头前。姿态散了。", effects: { rep: 0.55, appr: 4, fac: { establishment: 8 } } },
          ok: { body: "全部驳回，第二天照常开会。只是此后每份备忘录都多留一层底。", effects: { rep: 0.25, appr: 1.5 } },
          meh: { body: "驳回了，但两位部长「身体不适」，缺席了一次关键表决。", effects: { rep: 0.05, appr: -1.5 } },
          fail: { body: "一位部长在听证会上说：我们提出辞呈，是为了让总统自己看清楚。", effects: { rep: -0.3, appr: -5, flags: ["cabinet_standoff"] } },
          critfail: { body: "驳回两周后，资历最老的那位在电视上讲了他任内三件你不想再谈的事。你的内阁开始一处一处地漏。", effects: { rep: -0.6, appr: -9, hp: -0.3, flags: ["cabinet_leaks"] } }
        }
      },
      {
        id: "purge", text: "先动一个人：把最合适的那份辞呈当场签掉",
        base: 0.4, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "fac", key: "establishment", w: 0.2 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "你换掉的那位正好是所有人早就想换的。剩下的十个人收到一份两行的新备忘录，从此只有两行。", effects: { rep: 0.6, appr: 4.5, fac: { establishment: 6, base: 4 }, score: 0.3 } },
          ok: { body: "三个人走，位置两周内补上，西翼重新只剩一个方向。", effects: { rep: 0.35, appr: 2, fac: { establishment: 4 } } },
          meh: { body: "走的那位在告别采访里保持礼貌，回去开始写书。", effects: { rep: 0.05, appr: -2 } },
          fail: { body: "补上来的两位各自在电视讲话上感谢「参议院的朋友」，而没有谢你。", effects: { rep: -0.3, appr: -5, fac: { establishment: -6 }, flags: ["cabinet_purge"] } },
          critfail: { body: "清洗成了第二届的标签：每次表决前都有人问「今天谁还没交辞呈」。你的最后两年只在人事上有效率。", effects: { rep: -0.7, appr: -11, hp: -0.4, flags: ["cabinet_purge"] } }
        }
      },
      {
        id: "later", text: "一份也不答复：说「等预算签完再谈」，把辞呈锁进抽屉",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "三周之内没有一篇报道把这件事讲成一个故事。抽屉很安静，预算也签完了。", effects: { rep: 0.2, appr: 1.5 } },
          ok: { body: "辞呈锁着，事情照常办，谁也没有被逼到墙角。", effects: { rep: 0.1, appr: 0.5 } },
          meh: { body: "第五天有人向报馆确认「日期是空着的」，这一句成了当天的标题。", effects: { rep: -0.05, appr: -2 } },
          fail: { body: "三周过去你仍没答复，两位部长开始各自对外谈「后任计划」。", effects: { rep: -0.3, appr: -5, flags: ["cabinet_standoff"] } },
          critfail: { body: "报馆拿到那十一份复印件，日期栏全空。标题只问一句：总统是不是最后一位知道的人。", effects: { rep: -0.55, appr: -8, flags: ["resignations_leaked"] } }
        }
      }
    ]
  }
]);
