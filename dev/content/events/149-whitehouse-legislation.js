/* ============================================================================
 * CONTENT · events/149-whitehouse-legislation.js
 * 本文件是 147-whitehouse.js 立法族（whFamily:"legislation"）扩池的一片，
 * 覆盖入主白宫后的立法博弈，共四张卡：药价、税改、分水、冗长辩论。
 * ==========================================================================*/

POTUS.define("event", [
  {
    id: "wh_medicine", grade: "major", category: "political", valence: "risk",
    wh: true, whFamily: "legislation", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "internet"],
    title: "警戒线外的第十一天，和参院还差的那四票",
    body: "党团干事把计票板立在你面前：四票，卡在一位连任不稳的州议员身上。药厂的说客在门外等着递「自愿降价」的替代文本——这版票数来得快，可条款里的漏洞会慢慢长大。那位母亲的静坐照片已经在电视上循环到第七天，记者天天在车队入口问你会不会看她一眼。幕僚长低声提醒你：距离党团定死的强制投票日只剩七十二小时。",
    choices: [
      {
        id: "push", text: "征得她同意后公布那份病历，带着这个故事强推原案过参院",
        base: 0.4, mods: [{ src: "approval", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "那四票里有三票被涌进议会的电话冲垮，原案一字未改地过了，药价曲线第一次往下走。那位母亲在镜头前只说了一句：他终于看了我一眼。", effects: { rep: 0.6, appr: 5, score: 0.4, voters: { warm: 1500 }, fac: { base: 8, labor: 6 }, flags: ["drug_price_law"] } },
          ok: { body: "参院捏着鼻子通过附条件版本，你保住了法案的骨头，代价是那场静坐被拍成了深夜纪录片。", effects: { rep: 0.3, appr: 2, fac: { base: 4 } } },
          meh: { body: "票数勉强凑齐、法案磕绊过关，可公众的注意力已经转向下一件事，没人再提那位母亲。", effects: { rep: 0.1, appr: -0.5 } },
          fail: { body: "公布病历被批成消费绝症家庭，那位母亲反过来指责你出卖了她的痛苦。原案在参院夭折。", effects: { rep: -0.3, appr: -4, fac: { press: -6 } } },
          critfail: { body: "病历里一句被忽略的隐私条款引爆集体诉讼，法案连同你的诚信一起被封存。药厂股价当天上涨。", effects: { rep: -0.6, appr: -8, hp: -0.3, fac: { press: -8, establishment: -4 } } }
        }
      },
      {
        id: "voluntary", text: "接受药厂起草的「自愿降价」版本，换取参院立刻解锁那四票",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.25 }, { src: "fac", key: "commercial", w: 0.25 }],
        outcomes: {
          crit: { body: "你在替代文本里钉进两条落日之外的硬杠杆，漏洞被暂时锁死，首批药价当年就降下来。", effects: { rep: 0.3, appr: 3, fac: { commercial: 4 } } },
          ok: { body: "「自愿降价」过了，数字好看，可审计条款留了口子，你知道三年内它会重新张开。", effects: { rep: 0.15, appr: 1 } },
          meh: { body: "药厂笑着签了字，降价全凭自愿，落到货架上几乎看不出差别。国会各退一步，谁也没赢。", effects: { rep: 0.05, appr: -1 } },
          fail: { body: "版本被揭穿是药厂自己写的，媒体把它念成「让狐狸看守鸡窝」。你的支持率跟着漏水。", effects: { rep: -0.2, appr: -3, fac: { base: -4 } } },
          critfail: { body: "降价承诺在八个月里全线蒸发，一场听证会把你和药厂高管并排钉在证人席上。", effects: { rep: -0.4, appr: -6, fac: { press: -6, base: -5 } } }
        }
      },
      {
        id: "guidance", text: "不动法案，改发一份白宫行政指引，把难题推回给监管机构",
        base: 0.66, mods: [{ src: "approval", w: -0.2 }],
        outcomes: {
          crit: { body: "指引绕开了国会的死结，监管者真落地了两项限价动作，虽不轰动但确实在管事。", effects: { rep: 0.15, appr: 1 } },
          ok: { body: "一纸指引让各方都有台阶下，参院松了口气，药价维持原样，没人追究。", effects: { rep: 0.05, appr: 0 } },
          meh: { body: "指引被当成没下料的汤，媒体一天就忘了，法案仍旧卡在原处。", effects: { rep: 0, appr: -1 } },
          fail: { body: "两党同时指责你越权又无能：越了行政的界，却没解决立法的账。", effects: { rep: -0.1, appr: -3 } },
          critfail: { body: "一位联邦法官把指引冻结，裁定你替国会做了本该由他们做的事。那位母亲结束了静坐，说你什么都没给。", effects: { rep: -0.25, appr: -5, fac: { establishment: -3 } } }
        }
      }
    ]
  },
  {
    id: "wh_tax", grade: "mid", category: "political", valence: "risk",
    wh: true, whFamily: "legislation", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "internet"],
    title: "选年前的一张「看得见的胜利」，和十年的赤字曲线",
    body: "党团主席把话说得很直：选年前必须拿出一张「看得见的胜利」，否则中期的钱和人都要散。你草案里那条中产减税是票仓点名要的，也正是把赤字曲线往下多拖十年的那一条。财政部递来措辞谨慎的非正式测算；两位中间派参议员放话，砍掉这一条他们愿意投票。距离党团定死的签署日只剩六周。",
    choices: [
      {
        id: "party", text: "按党的版本原样签署，把中产减税那条一字不动地写进去",
        base: 0.5, mods: [{ src: "approval", w: 0.25 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "签字那天党内士气高涨，中产选民在民调里回摆，你攥住了一张真正的「胜利」。", effects: { rep: 0.3, appr: 3, voters: { warm: 1000 } } },
          ok: { body: "法案过关，票仓买账，只是赤字数字上了新闻，反对派开始慢慢攒弹药。", effects: { rep: 0.15, appr: 2 } },
          meh: { body: "签署仪式办得很热闹，可选民关心的仍是账单，热度三天就退。", effects: { rep: 0, appr: 0 } },
          fail: { body: "财政部测算被泄露，媒体把它印成大字标题：这张「胜利」要后代还十年。", effects: { rep: -0.15, appr: -3, fac: { establishment: -4 } } },
          critfail: { body: "评级机构下调展望，选后盘点里这条减税成了党内甩锅的头号靶子。", effects: { rep: -0.35, appr: -6, fac: { establishment: -6 } } }
        }
      },
      {
        id: "cut", text: "砍掉自己竞选时承诺的那一条，换取两党联署的税改",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.25 }, { src: "fac", key: "establishment", w: 0.25 }],
        outcomes: {
          crit: { body: "两党税改干净利落地过关，反对派参议员在记者会上夸你「肯为大局让步」，赤字曲线被扳了回来。", effects: { rep: 0.35, appr: 2, score: 0.2, fac: { establishment: 6 }, flags: ["bipartisan_tax"] } },
          ok: { body: "跨党签字上了头条，你的建制派关系修复，只是老选区开始有人在集会上喊那句旧承诺。", effects: { rep: 0.15, appr: 0 } },
          meh: { body: "税改过了，可砍掉承诺的录像被剪成三十秒反复播放，两头的掌声都不情不愿。", effects: { rep: 0, appr: -1 } },
          fail: { body: "初选选民把这当成背叛，投票率下滑，两党票也没多给你几张。", effects: { rep: -0.2, appr: -4, fac: { base: -5 } } },
          critfail: { body: "一句竞选誓言被当众撤回的旧视频全网翻红，党内已经开始讨论你为什么要食言。", effects: { rep: -0.4, appr: -6, fac: { base: -7 } } }
        }
      },
      {
        id: "delay", text: "让财政部先出一份完整评估，把决定拖过选年再说",
        base: 0.66, mods: [{ src: "attr", key: "CUN", w: 0.2 }],
        outcomes: {
          crit: { body: "评估如期在选后出炉，给了你一版更精细的税改，谁也没在选前抓到你的把柄。", effects: { rep: 0.1, appr: 0 } },
          ok: { body: "文件压下去，各方暂时找不到攻击你的落点，但也没人记得替你说话。", effects: { rep: 0, appr: -1 } },
          meh: { body: "「再等等看评估」成了你这半年的标签，媒体懒得写，党人私下抱怨。", effects: { rep: -0.05, appr: -2 } },
          fail: { body: "对手把拖延念成「不敢担责」，选年里你的沉默被填满了别人的台词。", effects: { rep: -0.15, appr: -4 } },
          critfail: { body: "评估泄露出对减税不利的结论，你既没签也没砍，只留下一个「什么都没做成」的印象。", effects: { rep: -0.3, appr: -6, fac: { establishment: -3 } } }
        }
      }
    ]
  },
  {
    id: "wh_water", grade: "mid", category: "political", valence: "risk",
    wh: true, whFamily: "legislation", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "internet"],
    title: "大旱第四年，两个州长告到了第三个州头上",
    body: "科罗拉多河流域的水文图摊在你桌上：第四个干旱之年，上游两州握着老协议不肯松口，下游一个州的水权被两个州长联名告进了最高法院。农业用电补贴申请和联邦配额草案同时压过来。中西部农场主的游说团和西海岸的环保组织在同一条走廊里对峙。州长们的律师已经放话：任何偏向对方的行政令，他们当天就起诉。",
    choices: [
      {
        id: "quota", text: "动用联邦权威下达强制配水额度，要求三州限期执行",
        base: 0.4, mods: [{ src: "approval", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "配额在旱季最险的时候稳住了局面，三州被迫坐回谈判桌，你成了唯一一个敢拍桌子的人。", effects: { rep: 0.4, appr: 4, score: 0.3, flags: ["federal_water_quota"] } },
          ok: { body: "配额被执行，上游州骂你越界，下游州第一次按时放到了水。两党各骂一半。", effects: { rep: 0.2, appr: 1 } },
          meh: { body: "纸面配额下来了，执行靠各州自己，第一年就出现暗地里超采，没人真管。", effects: { rep: 0, appr: -1 } },
          fail: { body: "两个州长把强制配额告成违宪的活靶子，中西部选民把你划进「不靠谱」那一栏。", effects: { rep: -0.25, appr: -4, fac: { labor: -4, establishment: -3 } } },
          critfail: { body: "配额令被联邦法院整体冻结，你既没分到水也没省下电，还替对手备好了一份起诉样本。", effects: { rep: -0.5, appr: -7, hp: -0.2, fac: { establishment: -5 } } }
        }
      },
      {
        id: "power", text: "只给农业用电发补贴、绕开水权这个死结",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.25 }],
        outcomes: {
          crit: { body: "补贴让农场主肯自己投资节水设备，用水效率悄悄抬上去，压力没有爆发。", effects: { rep: 0.2, appr: 2 } },
          ok: { body: "电补下去了，账单轻了一点，可水文图上的红线并没有往回退。", effects: { rep: 0.1, appr: 1 } },
          meh: { body: "补贴被算进常规预算，谁都没觉得这是分水问题的答案，谁也没反对。", effects: { rep: 0, appr: -1 } },
          fail: { body: "环保组织指着你和农场主：拿纳税人的钱奖励浪费水的人。诉讼照旧。", effects: { rep: -0.15, appr: -3 } },
          critfail: { body: "旱情破了纪录，人们发现补贴只让用水更凶，那笔「省钱」成了新闻里的反面教材。", effects: { rep: -0.3, appr: -5, fac: { press: -4 } } }
        }
      },
      {
        id: "court", text: "把这桩分水案留给法院，白宫公开保持中立",
        base: 0.7, mods: [{ src: "approval", w: -0.2 }],
        outcomes: {
          crit: { body: "最高法院最终划出一条各方都能勉强接受的界线，你躲过了开罪任何一州的时刻。", effects: { rep: 0.1, appr: 0 } },
          ok: { body: "案子在法院排期里慢慢走，白宫一句「尊重司法」挡掉了所有追问。", effects: { rep: 0, appr: -1 } },
          meh: { body: "中立听起来像什么都不做，干旱继续，河流继续瘦。没人感谢你也没人提你。", effects: { rep: -0.05, appr: -2 } },
          fail: { body: "判决拖了两年，下游一座城在等待里断了应急水源，问责声才追到你头上。", effects: { rep: -0.15, appr: -4 } },
          critfail: { body: "法院最终拒绝插手，把烂摊子原封退回白宫，此时你已经没有任何筹码去逼三州让步。", effects: { rep: -0.3, appr: -6, fac: { establishment: -3 } } }
        }
      }
    ]
  },
  {
    id: "wh_vote", grade: "major", category: "political", valence: "risk",
    wh: true, whFamily: "legislation", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "internet"],
    flags: ["pres_two_terms"],
    title: "最后一届，和那道拦在六十票门前的规矩",
    body: "这是你的第二段，也是选民还能用票根跟你说话的最后一段时间。投票权与重划选区法案卡在参院的冗长辩论规则里——少数党能凭程序一直霸住议事台，法案因此被拦在六十票门外，像一道永远抬不起来的闸门。党内年轻人已经开始数下一任会是谁，老参议员提醒你：改这条规矩，要么毁掉这个机构的体面，要么让你下一场选举输掉整个参院。你不再连任，唯一还烧得起的，是手里剩下的那点政治资本，和你想在离开前留下什么。只是密室里谈过的事，早晚会被翻出来。",
    choices: [
      {
        id: "abrogate", text: "公开点名要求废除冗长辩论，把这当成你第二任期的收官之战",
        base: 0.4, mods: [{ src: "approval", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "舆论被逼到墙角，法案破例开门表决并通过，历史把你记成一个为了投票权敢砸规矩的人。", effects: { rep: 0.5, appr: 5, score: 0.5, voters: { diehard: 2000 }, fac: { base: 9 }, flags: ["filibuster_broken"] } },
          ok: { body: "冗长辩论被局部修改，法案挤过去了，参院里一半人从此视你为毁规矩的那个人。", effects: { rep: 0.2, appr: 1 } },
          meh: { body: "你的喊话掀了几天桌子，规则却纹丝不动，法案仍停在六十票门下。", effects: { rep: 0, appr: -2 } },
          fail: { body: "废除冗长的主张激怒了两党老派，参院反过来冻结了你所有提名的进度。", effects: { rep: -0.3, appr: -6, fac: { establishment: -7 } } },
          critfail: { body: "你成了把参院规则玩坏的那个人，下一场选举里本党丢掉多数，清算声从党内先起。", effects: { rep: -0.6, appr: -9, hp: -0.3, fac: { establishment: -8, base: -4 } } }
        }
      },
      {
        id: "whisper", text: "私下劝两位快退休的老参议员在关键程序票上弃权",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "fac", key: "establishment", w: 0.2 }],
        outcomes: {
          crit: { body: "两位老人悄悄放手，冗长辩论自己泄了气，法案无声无息地过了，没人知道你做过什么。", effects: { rep: 0.3, appr: 2, score: 0.2, flags: ["quiet_count"] } },
          ok: { body: "弃权换来了通过，你欠下两笔人情，可参院的体面一点没破。", effects: { rep: 0.15, appr: 0 } },
          meh: { body: "一位老人答应了，另一位临阵改口，法案差一票没过，你的电话费白费。", effects: { rep: 0, appr: -1 } },
          fail: { body: "谈话内容被泄露，媒体把「密室劝弃权」做成标题，两党一起指责你操盘。", effects: { rep: -0.2, appr: -4, fac: { press: -5 } } },
          critfail: { body: "录音流出，你被描绘成一个不择手段的跛脚总统，法案泡汤，连任过的体面也赔了进去。", effects: { rep: -0.4, appr: -7, fac: { press: -6, establishment: -5 } } }
        }
      },
      {
        id: "doj", text: "把投票权争议交给司法部去法院打官司",
        base: 0.62, mods: [{ src: "approval", w: -0.2 }],
        outcomes: {
          crit: { body: "司法部在若干关键郡拿到了临时救济，重划地图被推倒重来，你不必在参院硬碰硬。", effects: { rep: 0.15, appr: 1 } },
          ok: { body: "案子进了法院，你把烫手的东西递了出去，代价是进展全看司法节奏。", effects: { rep: 0.05, appr: -1 } },
          meh: { body: "诉讼漫长而安静，法案仍躺在参院，一切回到原点，只有你终于不用再管它。", effects: { rep: 0, appr: -2 } },
          fail: { body: "对手嘲笑你把立法失败说成「交给法庭」，选民要的是通过的法律不是诉状。", effects: { rep: -0.15, appr: -4 } },
          critfail: { body: "法院拒绝受理核心的政治问题，把球踢回一个你已经管不着的国会。你的收官只剩一句「交给律师了」。", effects: { rep: -0.3, appr: -6, fac: { base: -4 } } }
        }
      }
    ]
  }
]);
