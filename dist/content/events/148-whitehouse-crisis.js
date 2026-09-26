/* ============================================================================
 * CONTENT · events/148-whitehouse-crisis.js
 * 本文件是 147-whitehouse.js 的扩池第 4 片，覆盖危机族（whFamily: "crisis"），共 4 张卡。
 * 其中 wh_pardon 为次任专属（flags: ["pres_two_terms"]）。
 * ==========================================================================*/

POTUS.define("event", [
  {
    id: "wh_fuel", grade: "major", category: "crisis", valence: "risk",
    wh: true, whFamily: "crisis", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "internet"],
    title: "管道正午破裂，三个州的加油站开始发号",
    body: "工程兵团报告：破裂点已定位，最快也要十天才能重启，内陆三州的成品油库存只够两周。三州州长今早已开过一场电话会议，每人开场白都是夸本州贡献了多少油、又拿走了多少；能源部长请你在今晚记者会前定个调子；两家报纸的头条已经在问，白宫是不是还要说「市场会自己修好」。只是战略储备这张牌只有一次可打：开了库，等于承认供应链断了。",
    choices: [
      {
        id: "reserve", text: "释放战略储备，宣布全国燃油配给方案",
        base: 0.5, mods: [{ src: "approval", w: 0.25 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "储备油七十二小时内进管，重灾两州的车队先散。你在加油站镜头前讲了十分钟没有稿子的解释，当晚所有频道都在重播。", effects: { rep: 0.5, appr: 5, fac: { agency: 4 }, flags: ["fuel_rationing"] } },
          ok: { body: "配让招来抱怨，但油确实到了。三州州长联名感谢联邦及时出手。", effects: { rep: 0.25, appr: 2, fav: -1 } },
          meh: { body: "分配不功不过，公众的印象只停留在油价停了一周没涨。", effects: { rep: -0.05, appr: -0.5 } },
          fail: { body: "两个州的油罐车排错了调度表，加油站老板在地方台说配给就是给有关系的人多放油。储备库你动了，支持率也跟着动了。", effects: { rep: -0.2, appr: -3, fav: -1 } },
          critfail: { body: "重启再拖一周，配给方案又泄露出「选区照顾」四个字。两党同时要求解释，州长电话会当场变成控诉大会——管道修好了，也没人愿意再提它。", effects: { rep: -0.5, appr: -8, fac: { agency: -4 } } }
        }
      },
      {
        id: "priority", text: "只给联邦运输优先权，不碰配给",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.25 }],
        outcomes: {
          crit: { body: "优先权把长途油车在最坏的一天之前调顺了。周日访谈节目里，能源部长把你的做法称作专业主义，三州排队明显缩短。", effects: { rep: 0.35, appr: 3 } },
          ok: { body: "市场松动，油价回落到线上，只有三州州长还在天天打电话抱怨你不够意思。", effects: { rep: 0.15, appr: 1 } },
          meh: { body: "短缺多维持了两周，但没人因此受伤，也没人记得谢你。", effects: { rep: 0, appr: -0.5 } },
          fail: { body: "优先权被两家大运输公司钻了空子，小加油站照样断油。报纸顺手挖出这些公司股东和你的筹款晚宴合过影。", effects: { rep: -0.2, appr: -3 } },
          critfail: { body: "一座区域教学医院的备用油车也堵在路上，电视循环播放三天的画面是发电机、车队和空着没人回答问题的记者台。", effects: { rep: -0.45, appr: -7, fac: { labor: -3 }, hp: -0.25 } }
        }
      },
      {
        id: "market", text: "什么都不宣布，让价格信号自己把油引来",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.2 }],
        outcomes: {
          crit: { body: "高油利引来沿海炼厂的两拨油车，短缺在你不必开口之前自己消退。专栏把这叫教科书，虽然没人写教科书是哪一页。", effects: { rep: 0.2, appr: 1 } },
          ok: { body: "油贵但管够，你没花一分政治资本。", effects: { rep: 0.05, appr: 0 } },
          meh: { body: "白宫在燃油问题上消失了三周，新闻周期自己翻篇了。", effects: { rep: -0.05, appr: -1 } },
          fail: { body: "三州州长联名来信，说联邦的沉默是第二场灾害。加油站的限购牌被反对党拍进了他们的竞选背景板。", effects: { rep: -0.2, appr: -3 } },
          critfail: { body: "限购升级成加油站歇业和推搡，一家教堂门口加油队的画面在全国所有辩论厅里播了一遍。你的第一反应是等市场——市场这次没让你等到台阶。", effects: { rep: -0.5, appr: -6, hp: -0.25, voters: { oppose: 600 } } }
        }
      }
    ]
  },
  {
    id: "wh_shooting", grade: "major", category: "crisis", valence: "risk",
    wh: true, whFamily: "crisis", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "radio", "internet"],
    title: "第三天，全国在等你第二句话",
    body: "十天的下半旗已经排进了仪式表；参议院多数党领袖说票数没有、三周内也不会有；那座城市的市长对每个愿意听的人说，联邦的行动不能只是「换一种格式的慰问电」；两位遗属代表今天下午到白宫，她们和幕僚长的会谈纪要已经有人在楼下递给记者。坐在旁计席上的家属，既可以是你的证人，也可以是你的陪审团。",
    choices: [
      {
        id: "bill", text: "连夜逼一部联邦法案，把家属请进白宫看计票",
        base: 0.4, mods: [{ src: "approval", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "法案在第四十九小时过线，计票时家属就坐在你斜后方。当晚民调跳了一格，连惯常反对你的评论员都承认，第三天白宫说的是动词不是形容词。", effects: { rep: 0.6, appr: 6, score: 0.4, fac: { base: -4 }, flags: ["capitol_hill_vigil"] } },
          ok: { body: "只过了一半条款，但那是二十年来第一部签得上字的法案。你累坏了，全国也是。", effects: { rep: 0.3, appr: 3, hp: -0.25 } },
          meh: { body: "法案卡在参议院委员会，家属在台阶上站了两个钟头合影。事情算发生过，仅此而已。", effects: { rep: -0.05, appr: -1 } },
          fail: { body: "最后五票没凑齐。第二天头版是家属离开的背影，标题不需要记者补充主语。", effects: { rep: -0.3, appr: -4, fac: { establishment: -3 } } },
          critfail: { body: "计票前两个小时，党内有人把草案全文泄露了出去，附了一句「白宫在起草时没打算问过国会」。法案死了，家属在电视上说她们本可以早点得到通知——现在全世界都知道谁没通知她们。", effects: { rep: -0.6, appr: -9, voters: { oppose: 1200 }, hp: -0.5 } }
        }
      },
      {
        id: "speech", text: "直接去那座城市的追思会，你自己上台讲",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你念完了每一个名字，没有一句政策术语。有个牧师对记者说，这是三年来第一件像样正事。", effects: { rep: 0.4, appr: 4, voters: { warm: 800 } } },
          ok: { body: "讲话被现场拍了下来，掌声盖住了零星嘘声。你陪了几位家属很久，镜头都在。", effects: { rep: 0.2, appr: 2 } },
          meh: { body: "一场合格而安全的讲话，悼词写满、名字念对，第二天就没人逐句复述了。", effects: { rep: 0, appr: 0 } },
          fail: { body: "讲到一半有人站起来喊话，保安扑上去的画面比你的名字传得更快。你在镜头前多站了十秒，那十秒被剪进了所有对手的片子。", effects: { rep: -0.25, appr: -4 } },
          critfail: { body: "致辞里你念错了一位死难者的名字，又在本该停下来的一页继续往下念。这座城市花了一个星期决定原不原谅你，另一个星期发现决定不了。", effects: { rep: -0.5, appr: -7, fac: { church: -4 }, hp: -0.25 } }
        }
      },
      {
        id: "committee", text: "只下令降半旗，委托一个全国委员会去研究",
        base: 0.65, mods: [{ src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "委员会里有两个真正的行家，六周后就争议条款给出了可执行的共识，你照单签署。沉默被解释成稳重。", effects: { rep: 0.15, appr: 1 } },
          ok: { body: "旗帜降了，仪式办了，没人抓到错处。电视一周后换了主题。", effects: { rep: 0, appr: -0.5 } },
          meh: { body: "委员会的报告要等两年。所有人都知道这一点，包括委员会本身。", effects: { rep: -0.1, appr: -1 } },
          fail: { body: "市长把那封请柬裱了起来：白宫只回了半旗。市议会给全城免费放那场追思会的录像，配的字幕是联邦的日程表。", effects: { rep: -0.2, appr: -3, voters: { oppose: 500 } } },
          critfail: { body: "委员会首批人选名单里出现了两家行业协会的说客，家属在白宫铁栅栏外把名单举过了头。第二天起，全国都在问这个委员会到底要研究谁。", effects: { rep: -0.45, appr: -6, fac: { establishment: -3 } } }
        }
      }
    ]
  },
  {
    id: "wh_blackout", grade: "mid", category: "crisis", valence: "risk",
    wh: true, whFamily: "crisis", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["internet", "radio"],
    title: "停电第三周，医院的柴油刻度在走",
    body: "情报部门和能源部的初步评估指向同一个方向，但全文还不到能拿出去对质的程度；停电区一家电力公司总裁请求授权夜间拉闸非民用负荷，卫生部门警告三家医院的发电机柴油只够十天；财长已经两次派人来问「境外入侵」这四个字对盘面影响几何；在野党那位参议员正在家里排练周日的节目，问题只有一个——总统什么时候知道的。而私下渠道一旦见光，你公开说过的每个字都会变成欠条。",
    choices: [
      {
        id: "expose", text: "公开点名那个国家，召回大使",
        base: 0.42, mods: [{ src: "approval", w: 0.25 }],
        outcomes: {
          crit: { body: "点名后的第四天，对面的傀儡渠道递来复电：攻击脚本的钥匙交了出来，电网按小时恢复。你在讲台上只说了一句话：他们看到了我们看到了什么。", effects: { rep: 0.45, appr: 4, fac: { military: 5 }, flags: ["ambassador_recall"] } },
          ok: { body: "市场绿了一天，但外交机器全面开动，对方在第三周掐掉了中继服务器。停电结束，代价是两国外交降了半格温。", effects: { rep: 0.2, appr: 2, fac: { foreign: -3 } } },
          meh: { body: "召回的大使在机场拍了照，对方否认一切，电网维修照旧。强硬姿态被记住了，也被消化了。", effects: { rep: -0.05, appr: 0.5 } },
          fail: { body: "点名之后对方变本加厉，第二个变电站当晚上演了同样的剧本。报社开始用「惹怒了一个不会接电话的国家」做标题。", effects: { rep: -0.25, appr: -4, fac: { military: -2 } } },
          critfail: { body: "被点名国拿出了一份你自己的情报摘要做反证，证明白宫三周前就知情却选择沉默。电还是没来，全世界先等来了一场关于你撒没撒谎的听证会。", effects: { rep: -0.6, appr: -10, hp: -0.5, voters: { oppose: 1500 } } }
        }
      },
      {
        id: "quiet", text: "私下渠道施压，同时悄悄调拨柴油补给医院",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.25 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "后门渠道一周内见效，对方以「技术故障」为名关掉了攻击节点；柴油一辆车一辆车开进医院后门。全国只知道电回来了，不知道为什么，而你知道。", effects: { rep: 0.25, appr: 2, fac: { agency: 3 } } },
          ok: { body: "医院没停过一天发电机，谈判在没人看见的地方推进。三周后电网合闸，你的支持率几乎没受伤。", effects: { rep: 0.1, appr: 1 } },
          meh: { body: "柴油按时送到，攻击却没停，只是变慢了。这场安静的仗打得很安静，安静到没人觉得你打过。", effects: { rep: -0.05, appr: -0.5 } },
          fail: { body: "一家报纸通过送油车队顺藤摸瓜，挖出了整条私下渠道。「白宫在跟谁谈」比停电本身多霸占了九天头条。", effects: { rep: -0.3, appr: -4 } },
          critfail: { body: "施压照会全文外流，对方把它连同你三周前的公开安抚一起登了出来。医院撑到了柴油到的那天，你的信誉没有。", effects: { rep: -0.5, appr: -7, fac: { agency: -4, press: -3 } } }
        }
      },
      {
        id: "bury", text: "把网络攻击的真相按下不表，让官方口径停在设备老化",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "「设备老化」的说法撑到了电网修复，期货盘连跌都没跌。等技师们的传言发酵成调查，事件已经归了档。", effects: { rep: 0.15, appr: 1 } },
          ok: { body: "市场平稳度过三周，没人追问停电原因。你保住了盘面，欠下的是一个迟早要还的解释。", effects: { rep: -0.05, appr: 0 } },
          meh: { body: "官方口径和电力公司内部的会议记录差着三条街，暂时没人在意。暂时。", effects: { rep: -0.1, appr: -1 } },
          fail: { body: "一名电网工程师把评估摘要寄给了周刊，标题里「老化」两个字被打了引号。你不得不让财长上节目，去解释一个越解释越不像话的口径。", effects: { rep: -0.3, appr: -4, fac: { press: -3 } } },
          critfail: { body: "医院柴油见底那晚的抢救画面和「设备老化」的通稿被排在了同一条新闻里。第三周，全国学会了一个新词，比停电更难熬——白宫版停电。", effects: { rep: -0.55, appr: -8, flags: ["grid_cover_up"] } }
        }
      }
    ]
  },
  {
    id: "wh_pardon", grade: "major", category: "crisis", valence: "risk",
    wh: true, whFamily: "crisis", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    flags: ["pres_two_terms"],
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "cable", "internet"],
    title: "他档案里有你签字的那几页",
    body: "判决最快本月底宣读，他的律师确认他到死都不会和检方合作；白宫法律顾问办公室理出了一张清单——涉案十九份文件里，三份是你还在州里时签的字。特赦一签，等于承认你当年知情，特别检察官明天就多出整整一章。党主席上周来串门，笑着说老板你不再选下一次了，想想还想要什么；他的太太托当年那位老门卫递进来一封手写信，信封上只写了「给你本人」。",
    choices: [
      {
        id: "pardon", text: "签发特赦，让他不必受审",
        base: 0.45, mods: [{ src: "approval", w: -0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "签字前你开了记者会，把十九份文件里你签过的三份逐条念给对方听，然后承认其余的你不知情。忠诚与坦白难得同框，连周刊封面都软了半格。", effects: { rep: 0.3, appr: 2, fac: { base: 6 }, flags: ["loyalty_first"] } },
          ok: { body: "特赦生效。骂声很大，但你没有回避，党内老人说这是你身上为数不多没被华盛顿洗掉的东西。", effects: { rep: -0.1, appr: -1, fac: { base: 4, establishment: -3 } } },
          meh: { body: "文件签了，风暴也来了，但两周就被下一条新闻盖过去。只有历史课的助教会把这天记进讲义。", effects: { rep: -0.2, appr: -2 } },
          fail: { body: "司法部一位司局级官员辞职以示抗议，辞职信被全文刊登。你在椭圆办公室签的不是特赦令，在他们手里那是一张收据。", effects: { rep: -0.4, appr: -5, fac: { agency: -4 } } },
          critfail: { body: "特赦第二天，检方把三份你签字的文件放进了起诉补充清单——你的签字成了他们的新证据，特赦成了你的新动机。不再竞选的你第一次发现，有些代价不靠选票讨回来。", effects: { rep: -0.7, appr: -11, hp: -0.5, voters: { oppose: 2000 }, flags: ["pardon_backlash"] } }
        }
      },
      {
        id: "cut", text: "拒绝特赦，公开声明与他切割",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你的声明只有三段，每段都没提他的名字，但每段都讲清了规矩对旧人也不例外。第二天，编辑部社论第一次用「制度」而不是「恩怨」来写这件事。", effects: { rep: 0.35, appr: 3, fac: { establishment: 4 } } },
          ok: { body: "切割干净利落，媒体找不到钩子。只有你读那封信的次数，比承认的多。", effects: { rep: 0.1, appr: 1 } },
          meh: { body: "你没签，他也被判了。党内饭局上，给你留的位子还在，只是坐得越来越散。", effects: { rep: -0.05, appr: -0.5, fac: { base: -3 } } },
          fail: { body: "声明发出当晚，他接受采访说了一句「我不怪他，我以为他也会被人这样救」。这句话播了整整一周，比任何起诉书都长。", effects: { rep: -0.3, appr: -4, fac: { base: -5 } } },
          critfail: { body: "旁听宣判的旧部照片流了出来：一屋子从州里跟你出来的人，都在看你留下的那个空位。一周之内，三位州级掌门退党，口号是「连自己人都出卖的白宫」。", effects: { rep: -0.5, appr: -7, fac: { base: -7 }, voters: { oppose: 1200 } } }
        }
      },
      {
        id: "delay", text: "不签也不拒，把决定拖到任期结束交给下一任",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "判决、上诉、卷宗归档，全都赶在了交接清单上。你零动作零失分，只把那道题原封不动塞进了别人的箱子。", effects: { rep: 0.1, appr: 1 } },
          ok: { body: "你什么都没做，所以谁都没抓到什么。只剩媒体在猜，猜本身就是罚。", effects: { rep: -0.1, appr: -1 } },
          meh: { body: "任期结束那天，申请还压在抽屉底层，连驳回都免了。下一任会在就职第三周打开它。", effects: { rep: -0.15, appr: -1 } },
          fail: { body: "你的法律顾问拒绝替沉默背书，辞职信抄送全员。晚报把这版不叫拖延，叫「白宫学会了不回话」。", effects: { rep: -0.3, appr: -4, fac: { agency: -3 } } },
          critfail: { body: "他的身体在等待里垮了，狱中医护记录和你办公室的日历摆上了同一块展板。不再需要连任的你，第一次发现有些问题虽然不投票，却照样有任期——在你自己心里。", effects: { rep: -0.55, appr: -6, hp: -0.5, flags: ["the_long_silence"] } }
        }
      }
    ]
  }
]);
