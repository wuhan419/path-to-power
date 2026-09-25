/* ============================================================================
 * CONTENT · events/127-line-2019-21.js
 * 连续时间轴 · 2019—2021 定点大事（Track B · B8 波段，见 docs/PARALLEL-CONTENT-WORK.md §4.2）。
 *
 *   · 不写 era —— 一律 minYear/maxYear + scoped；到点必发靠本文件末尾的 fixed。
 *   · 存量卡 soc20_mailin（2020 邮寄票信任危机，源文件 108-era-2016.js）按 §4.2 归本带：
 *     只做 pin（2020-11，与卡内 month:11 窗口同步），不重写。
 *   · 弹劾两幕成串：ln19_impeach（众院通过）→ ln20_acquit（参院宣判），
 *     后幕靠 after 续接；前幕没演则后幕静默跳过（可断裂的串）。
 *   · 近十年题材：事实骨架（日期、程序、人数）从史，立场与后果留给虚构的「你怎么选」；
 *     不写真人姓名，一律职务称谓。
 *   · 经济字段全部写系数（dyn:true）。引号只用「」。每卡恰一个无 cost 无 req 的保底。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2019-12 · 第一次弹劾（前幕）—— 众院通过两条弹劾条款（12-18）
   * ==================================================================== */
  {
    id: "ln19_impeach", photo: "era-2019.jpg", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 2019, maxYear: 2019, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 14, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 12, day: 18,
    title: "众议院通过弹劾条款，全国沿党界线裂成两半",
    body: "因那通要求乌克兰总统「查一查对手党领选的前副总统」的电话与冻结的军援，9 月众议院启动调查；12 月 18 日，两条弹劾条款沿党派线表决通过，在任总统成了史上第三个被众院弹劾的人。\n" +
      "白宫称这是政变，反对党说是宪政自救，审判将移师参议院。本地报纸要你今晚就表态，两党的电话都在响——你知道：这一站不是法律问题，是 2020 大选的预演。",
    brief: {
      lede: "弹劾没有中间地带：一句表态就是一次站队，而且会跟着你整个选举年。",
      known: [
        "两条条款是滥权与挡国会，表决几乎完全按党派划线。",
        "参院审判归多数党领袖安排，结局被普遍认为已写好。",
        "你十二月的姿态，会被放进初选的价码里重新称量。"
      ],
      rumor: [
        "有人说真正目标是今年秋天的参院选战，审判只是布景。",
        "有人说开春人们就只谈另一种病毒了。"
      ],
      unknown: [
        "你今晚说的每句话，明年会被反复重播。",
        "这一页会被更大的风暴匆匆翻掉。"
      ],
      terms: [{ k: "众院弹劾", v: "众院定罪、参院审判；不等于罢免。" }]
    },
    choices: [
      {
        id: "back_proc", text: "支持程序走完：要求参院传证人，别草草收场",
        note: "赌选民在乎规则多于在乎党。输了，两边都记得你替谁说过话。",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.5 }],
        outcomes: {
          crit: { body: "你一句「审判连证人都不要，算什么审判」被全国性媒体引用，「讲规则的人」的招牌立住了。", effects: { rep: 1.4, attr: { INT: 2 }, fac: { press: 9, establishment: 5, base: -4 } } },
          ok: { body: "你呼吁走完全程，听起来得体又不得罪死任何一边。只是没人靠这句话赢票。", effects: { rep: 0.6, fac: { press: 4, establishment: 2 } } },
          meh: { body: "你的表态不冷不热，党机器和改革派都把你归到「另册」里。", effects: { rep: -0.1, fac: { establishment: -2 } } },
          fail: { body: "两边都嫌你话多：本党骂你墙头草，改革派嫌你挤牙膏。", effects: { rep: -1.5, fac: { base: -5, press: -4 } } },
          critfail: { body: "你的一条旧往来被翻出来，正好与你自己喊的「程序正义」对打。「他只在对自己有利时讲规则」上了标题。", effects: { rep: -2.5, fac: { press: -7, establishment: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "defend", text: "替总统挡弹劾：咬定这是党派政变",
        note: "花人情入局，赌基层要的就是这句硬话。赌错，你成了「明知有罪仍护主的人」。",
        base: 0.4, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "base", w: 0.25 }],
        cost: { fav: 1 }, stake: { fav: true },
        outcomes: {
          crit: { body: "你在电视上替白宫挡得滴水不漏，总统亲自转发你的画面。基层把你当自己人，党内通道向你敞开。", effects: { rep: 1.5, voters: { warm: 600 }, fac: { base: 10, establishment: 6, press: -6 }, flags: ["impeach_defender"] } },
          ok: { body: "你喊了政变，自己这边解了气，对面记了账。位置没动，标签贴上了。", effects: { rep: 0.6, voters: { warm: 200 }, fac: { base: 5, press: -4 } } },
          meh: { body: "你跟着骂了两句，没人接茬——这个剧本里轮不到你念台词。", effects: { rep: 0, fac: { press: -2 } } },
          fail: { body: "条款文本一条条摊在电视上，你「无罪」的话显得越来越难说出口。", effects: { rep: -1.75, fac: { press: -8, establishment: -4 } } },
          critfail: { body: "白宫法律顾问的信纸经你手流出，你和这条「挡国会」的链条被写进同一篇报道。", effects: { rep: -2.75, fac: { press: -10, base: -6, establishment: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "local", text: "不碰弹劾：只做选区的开年实事",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "全国吵弹劾，你在破水管前拍了照。开年评鉴里，本地媒体罕见地把「干了实事」四个字给了你。", effects: { rep: 0.9, attr: { INTG: 1 }, fac: { base: 5, church: 4 } } },
          ok: { body: "你一句弹劾没接，把该办的事办了。没人夸，也没人抓你把柄。", effects: { rep: 0.35, fac: { church: 2 } } },
          meh: { body: "你躲过了这轮口水，也躲过了所有人的记忆。", effects: { rep: 0.05 } },
          fail: { body: "两拨人挤在同一场镇厅会议上，都问你「你到底站在哪边」。你的回避被记成心虚。", effects: { rep: -0.5 } },
          critfail: { body: "你的沉默被两边同时讲成「他知道那件事不占理」。这顶帽子比表态更难摘。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2020-02 · 第一次弹劾（后幕）—— 参院宣判无罪（02-05），接 ln19_impeach
   * ==================================================================== */
  {
    id: "ln20_acquit", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2020, maxYear: 2020, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "social"], month: 2, day: 5,
    after: { id: "ln19_impeach", minMonthsAfter: 1 },
    title: "参议院判无罪：弹劾一页翻过，大选机器开动",
    body: "12 月送到参议院的条款，2 月 5 日原样掷回：两条都未过三分之二，证人一个没传。白宫开起了庆祝会，众议院议长说「历史会记住这次掩盖」。\n" +
      "国家没翻页，只是把这页塞进了投票箱。初选季已经进账，各路人马都在重算：去冬你的姿态，今春值多少钱。",
    brief: {
      lede: "判决已定，账单未结。你现在怎么说话，就是怎么押注。",
      known: [
        "赦免早在剧本里：议事规则归参院多数党领袖定。",
        "只有一位同党参议员倒戈了一瞬，媒体还在找他同款。",
        "初选本月开锣，你必须比基层更早定调。"
      ],
      rumor: [
        "有人说赦免的谈判已谈到下一任，有人把你归了档。"
      ],
      unknown: [
        "你今晚得罪的人，一年半后都在选票上。",
        "程序战成了先例，下一次谁来用没人说得准。"
      ],
      terms: [{ k: "党派划线表决", v: "唱名表决几乎完全按党派分边。" }]
    },
    choices: [
      {
        id: "move_on", text: "翻篇：闭嘴谈民生，把议程换回餐桌",
        base: 0.52, mods: [{ src: "attr", key: "CHA", w: 0.4 }],
        outcomes: {
          crit: { body: "你的「别再审了，看看油价与药价」在本地晚间新闻里被反复引用，两拨疲于党争的人都把你当出口。", effects: { rep: 1.2, fac: { base: 8, establishment: 4 } } },
          ok: { body: "你成功把话题引开，谁都没抓住你站哪边。安全，但也没攒下火力。", effects: { rep: 0.5, fac: { base: 3 } } },
          meh: { body: "党争的噪音太大，你的「翻篇」像往井里丢石子。", effects: { rep: 0.1 } },
          fail: { body: "两党的机器同时嫌你「和稀泥」：一边说你变相定罪，一边说你假装没事。", effects: { rep: -1.25, fac: { base: -5, press: -3 } } },
          critfail: { body: "一场地方辩论里你被两边夹击：「弹劾你到底支持不支持」你答了十分钟，答案没被记住，窘态被剪进了广告。", effects: { rep: -2.25, fac: { base: -4, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "keep_fight", text: "把「宪政被踩」当成初选主线喊到底",
        note: "押上全部注意力赌愤怒的复利。赌对是新阵营的旗帜，赌错是没人要的旧新闻。",
        base: 0.42, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你成了这一代「规则守护者」里最响亮的地方名字，捐款与场次一起涌来，党机器开始认真排你的位置。", effects: { rep: 1.6, voters: { warm: 500 }, fac: { base: 10, establishment: -4 } } },
          ok: { body: "你的持续炮火稳住了基本盘，建制嫌你吵，但没人敢当面说你错。", effects: { rep: 0.6, fac: { base: 5, establishment: -3 } } },
          meh: { body: "你喊了两个月，观众席越坐越空——大家都累了。", effects: { rep: -0.25, fac: { establishment: -3 } } },
          fail: { body: "一场疫情正在赶来的路上，你的弹劾台词一夜之间成了时代错误。", effects: { rep: -1.75, fac: { establishment: -8, press: -5 } } },
          critfail: { body: "你攻击「叛徒参议员」的话被对方阵营反手做成广告，连本党都急着与你切割。", effects: { rep: -2.75, fac: { base: -8, establishment: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "machine", text: "不广播立场：闷头建党的基层票站",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "大喇叭们互相轰的时候，你的票站名单一年里翻了一倍。选后复盘，「最不起眼却最有用的人」写的是你。", effects: { rep: 0.8, attr: { INT: 1 }, fac: { establishment: 7, base: 4 } } },
          ok: { body: "你没沾口水账，攒下了真机器。两头都挑不出你的错。", effects: { rep: 0.3, fac: { establishment: 3 } } },
          meh: { body: "你安静如常，既没加分也没减分。", effects: { rep: 0.05 } },
          fail: { body: "不表态也有成本：两边都把你划进「不是我们的人」。", effects: { rep: -0.5 } },
          critfail: { body: "你躲过了这场仗，却躲不过下一场——没人在乎一个「从来不吭声的人」。", effects: { rep: -1, fac: { establishment: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2019-08 · 埃尔帕索与代顿枪击（08-03 / 08-04，24 小时内 33 死）
   * ==================================================================== */
  {
    id: "ln19_shooting", photo: "era-2019.jpg", grade: "mid", category: "civil",
    valence: "bane", dyn: true,
    minYear: 2019, maxYear: 2019, scoped: true, tierRaw: true, tierMin: 0, tierMax: 3, weight: 12, unique: true,
    medium: ["tv", "cable", "social", "shortvideo"], month: 8,
    title: "二十四小时里，两座城市在超市和主街见了血",
    body: "周六，边境城市的沃尔玛死了 23 人，网上留着一篇斥「入侵者」的宣言，枪手开了几百公里只为挑这家店。周日，俄亥俄州代顿的酒吧街又响起枪声：10 死，凶手 30 秒内被击毙。\n" +
      "全国第三次为同一件事点蜡烛。守夜会的蜡烛还没吹灭，你选区两拨人已经排开：一方说语言带血，一方说枪保命。镇厅明晚开会，议程已经炸了。",
    brief: {
      lede: "全国都在喊「够了」，而两派抢着定义这个「够」字是什么意思。",
      known: [
        "埃尔帕索死 23 人，代顿死 10 人，间隔不到一天。",
        "宣言里的用词与华盛顿日常话术押韵，两党都在引用。",
        "你选区的拥枪户与幸存者家属都要你明晚到场，各占半场。"
      ],
      rumor: [
        "有人说发帖平台早看过那份宣言却压着没删。",
        "有人说本州的枪展照旧，报名挤满了八月。"
      ],
      unknown: [
        "联邦层面的法案会搁置很多年。",
        "你明晚的词，会被「语言变子弹」逐字引用。"
      ],
      terms: [{ k: "红旗法", v: "临时收走高危者持枪权的司法程序。" }]
    },
    choices: [
      {
        id: "words", text: "点破语言：先问哪些话在给这场血势头上浇油",
        note: "动口不动法案，赌的是体面话比枪规更少人敢接。输了会被两面包夹。",
        base: 0.46, mods: [{ src: "attr", key: "CHA", w: 0.45 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "你在守夜会上没念稿，只念了三十二岁以下的死者名字。全国转播台切了你的画面，「会说话的人」立住了。", effects: { rep: 1.4, attr: { CHA: 2 }, fac: { press: 8, base: 6, establishment: -4 } } },
          ok: { body: "你谈了克制与哀悼，没碰法案。体面到手，实质没动。", effects: { rep: 0.6, fac: { press: 3, base: 2 } } },
          meh: { body: "你的悼词淹没在两派的对骂里，谁都没把你归到自己这边。", effects: { rep: 0.1 } },
          fail: { body: "拥枪的选民把你「语言带血」四个字听成「枪无罪我有罪」，枪店门口贴了你的照片。", effects: { rep: -1.5, fac: { base: -6, establishment: -4 } } },
          critfail: { body: "两派各挖到你旧账里的矛盾：你收过枪协捐款，也说过「持枪权神圣」。两边同版批斗，你哪边都不是。", effects: { rep: -2.5, fac: { base: -8, press: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "redflag", text: "推动州级红旗法与背景审查扩围",
        note: "花人情换议题上桌。成了是实绩，砸了两头骂你「拿死者做官」。",
        base: 0.4, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "base", w: 0.25 }],
        cost: { fav: 1 }, stake: { fav: true },
        outcomes: {
          crit: { body: "案文过了委会，两党各有一人上了你的台。幸存者家属把你当「那个真去推门的人」。", effects: { rep: 1.6, fac: { base: 8, press: 5, establishment: -6 }, voters: { warm: 300 }, flags: ["redflag_side"] } },
          ok: { body: "你把议题钉进了本州议程，条文没过关，但名单上有你的名字。", effects: { rep: 0.7, fac: { base: 5, establishment: -3 } } },
          meh: { body: "你把人情花了，议题却排进了「下个会期再说」。", effects: { rep: 0.1, fac: { press: -2 } } },
          fail: { body: "案文被钉死在委会，枪协的反击广告打到你选区循环播。", effects: { rep: -1.75, fac: { establishment: -6, base: -5 } } },
          critfail: { body: "你的募捐邮件把两城死者当广告使，被家属公开处刑。「拿死人换钱」的标题跟你一整年。", effects: { rep: -2.75, fac: { base: -8, press: -8, church: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "relief", text: "不谈法案：办守夜、设基金、陪家属跑完葬礼",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "基金真的发到了四十户人家手里，两位母亲替你说了话。不碰立法的人，反而最没争议。", effects: { rep: 0.9, fac: { base: 5, church: 4 } } },
          ok: { body: "你把守夜与募捐办得妥妥帖帖，人人点头，人人不提名。", effects: { rep: 0.4, fac: { church: 2 } } },
          meh: { body: "你去了每一场葬礼，只是那种时候人人都在。", effects: { rep: 0.1 } },
          fail: { body: "有家属在镜头前问：基金是你办的？你说过什么要改？你两头没答上。", effects: { rep: -0.5 } },
          critfail: { body: "你的「只做实事」被两边读成「谁也不敢帮」，下一场危机没人再找你。", effects: { rep: -1, fac: { base: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2020-03 · 新冠疫情美国应对（本带最高优先级·多重抉择·分层卡）
   *   03-11 WHO 宣布大流行；03-13 联邦紧急状态；测试滞后、呼吸机缺口、熔断
   *   底（0-3）旁观自救 · 中（4-6）表态执行 · 高（7-9）决策担当
   * ==================================================================== */
  {
    id: "ln20_covid", photo: "era-2020.jpg", grade: "major", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2020, maxYear: 2020, scoped: true, tierRaw: true, tierMin: 0, weight: 15, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 3, day: 11,
    title: "大流行落在美国本土，而每一级政府都在打太极",
    body: "3 月 11 日，世卫宣布大流行；白宫当晚还在说「风险很低」，两天后联邦紧急状态，股指两周内第四次熔断。测试严重不足，口罩靠医院自制，而复活节彩蛋游行没几个人宣布取消。\n" +
      "你选区的医院在逐台清点呼吸机，州里说「自己想办法」。你还有一个多星期——在感染潮撞上门之前，决定先吓谁：是经济，还是人命。",
    brief: {
      lede: "决策窗口按周计：说早了吓崩生意，说晚了数错人命。",
      known: [
        "检测严重滞后，真实感染数没人知道，包括官员自己。",
        "本地床位与呼吸机缺口，比预测峰值还差着一截。",
        "联邦说各州自理，州说地方自理，没人肯认账。"
      ],
      rumor: [
        "有人说邻州把一城的口罩库存买断了。",
        "有人说每日通报的数先被「协调」过。"
      ],
      unknown: [
        "你现在开口，一个月后是先知还是恐慌贩子。",
        "这题没有正确答案，只有谁肯付账。"
      ],
      terms: [
        { k: "熔断", v: "股市跌足阈值自动暂停交易。" },
        { k: "联邦紧急状态", v: "解锁联邦应急资金与调配权。" }
      ]
    },
    choices: [
      {
        id: "act_first", text: "抢在上级之前停聚集：关影院、停庆典、学校转网课",
        note: "赌曲线在你门口之前压平。赌对了是先知，赌错了是「砸人饭碗的越权者」。",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        base: 0.47, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "base", w: 0.2 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "三周后你的县曲线平了，邻县在数病床。全国访谈都在问「那个提前动手的小地方出了什么事」，你的名字挂在「清醒的人」那一栏。", effects: { rep: 1.5, attr: { INT: 2 }, fac: { base: 8, church: 6, establishment: -4 }, flags: ["pandemic_guard"] } },
          ok: { body: "你提前关了门，曲线软了半格。商户骂你，家长谢你，两笔账都记在你名下。", effects: { rep: 0.7, fac: { base: 4, commercial: -4 } } },
          meh: { body: "你抢跑了，疫情却没冲你来。白关的门，白得罪的人。", effects: { rep: 0, fac: { commercial: -3 } } },
          fail: { body: "疫情照旧冲进来，「关了也没用」成了商户的悼词。你的越权令被人挂到法院。", effects: { rep: -1.5, fac: { commercial: -8, base: -4 } } },
          critfail: { body: "禁令与一场本地葬礼的冲突上了全国新闻，你被剪成「连妈都不让人送终的官僚」。", effects: { rep: -2.5, fac: { base: -6, commercial: -10, church: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "keep_open", text: "保住店门：不搞一刀切，只发「自愿保持距离」指引",
        note: "拿钱换「理性」人设。赌病毒比你慢，也赌选民只记得谁让他们丢了工。",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        base: 0.44, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "fac", key: "commercial", w: 0.3 }],
        cost: { fun: 1 }, stake: { fun: true },
        outcomes: {
          crit: { body: "第一波与你擦肩而过，你的「不瞎关」救活满街铺面。商会把你当恩人，联邦夸你「懂经济」。", effects: { rep: 1.3, fun: 2, fac: { commercial: 10, establishment: 6, church: -4 } } },
          ok: { body: "店门保住了大半，感染也保住了几例。双方各给你记一笔账。", effects: { rep: 0.5, fun: 1, fac: { commercial: 5, base: -2 } } },
          meh: { body: "你开了门也发了指引，最后什么也没保住，什么也没得罪死。", effects: { rep: -0.2, fun: -0.5 } },
          fail: { body: "一桩聚集性感染从你家常去的餐馆扩散，流调名单被人捅给了报纸。", effects: { rep: -1.75, fac: { church: -6, base: -8 } } },
          critfail: { body: "临时停尸间的冷柜照片与你的「自愿距离」令同屏播出。你成了全国版面上的那个赞助商。", effects: { rep: -3, fun: -1.5, fac: { base: -10, press: -8, church: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "federal_line", text: "跟联邦口径走：上面说风险低，你只说可控",
        note: "把身家押在白宫的鼓点上。顺风时你是红人，退潮时你是那个「跟着喊的人」。",
        when: { tierRaw: true, tierMin: 7 },
        base: 0.5, mods: [{ src: "fac", key: "establishment", w: 0.4 }, { src: "attr", key: "CUN", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "你的口径与白宫分毫不差，全国幕僚的简报里第一次出现你的名字。党内金主圈给你留了位子。", effects: { rep: 1.2, fac: { establishment: 10, base: 3 }, flags: ["loyal_line"] } },
          ok: { body: "你没出头也没掉队，风头里活得像个隐形人。", effects: { rep: 0.4, fac: { establishment: 4 } } },
          meh: { body: "你的复读没人听——那几周，全国都在直接听原版。", effects: { rep: 0 } },
          fail: { body: "联邦口径一周三改，你跟着改口的录像被剪成连播。医疗界公开点名你「误导公众」。", effects: { rep: -2, fac: { press: -8, base: -6 } } },
          critfail: { body: "你转发过的一句「很快就会好起来」出现在悼念墙正上方。有人把你每句口径裱进了灵堂。", effects: { rep: -3, fac: { base: -8, press: -10, church: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "prepare", text: "只备而不宣：清点床位、囤口罩、扩救济粮站",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        base: 0.58, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "潮水真来的时候，只有你这摊事先备好。没上过头条的人，成了医院感谢名单的第一行。", effects: { rep: 0.9, attr: { INT: 2 }, fac: { establishment: 4, base: 3 } } },
          ok: { body: "你悄悄把该备的备了。不上电视，不欠人情，账上干净。", effects: { rep: 0.4, fac: { base: 2 } } },
          meh: { body: "物资备下大半，潮水绕着走。你像个对着晴天修地窖的人。", effects: { rep: 0.1 } },
          fail: { body: "囤的口罩过期、床位没理顺，「他忙了一通，忙错了」的闲话在医院里飘。", effects: { rep: -0.4 } },
          critfail: { body: "一车没验收的检测耗材砸在手里，「他拿疫情做存货生意」的说法第一次有人笑着讲。", effects: { rep: -0.9, fac: { press: -3 } } }
        }
      },
      {
        id: "shop_notice", text: "只管自家门口：给店铺贴告示、给老人送菜、不接全国的话",
        note: "赌你能把自己那条街看住。风险：病毒不看行政边界，也不看你的告示。",
        when: { tierRaw: true, tierMin: 0, tierMax: 3 },
        base: 0.68, mods: [{ src: "attr", key: "INTG", w: 0.3 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你挨家把告示贴了一遍，顺手替三位老人买了两周的菜。这条街后来只记得你干过这件事。", effects: { rep: 0.5, fac: { base: 4, church: 2 } } },
          ok: { body: "告示贴上了，志愿名单上多了七个人。事情很小，但都是能办成的。", effects: { rep: 0.3, fac: { base: 2 } } },
          meh: { body: "你跑了两天，多数人已经在自己想办法了。", effects: { rep: 0.05 } },
          fail: { body: "有人拍你贴告示的手，配文是「上面不管，他也只管贴纸」。", effects: { rep: -0.4, fac: { press: -3, base: -2 } } },
          critfail: { body: "你劝大家别聚集的那条街，两周后自己出了聚集性感染。有人问你贴纸时知不知道。", effects: { rep: -0.7, fac: { press: -4, base: -4 } } }
        }
      },
      {
        id: "push_state", text: "把州里逼到台面上：公开要求统一检测口径与床位调度",
        note: "赌公开信比私下求更有分量。风险：州里一旦回绝，你就成了那个不配合的人。",
        when: { tierRaw: true, tierMin: 4, tierMax: 6 },
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "州长在记者追问下当场答应给你所在的县单列调度。你的公开信被本地报整版登出。", effects: { rep: 1.4, fac: { press: 8, base: 6, establishment: -6 } } },
          ok: { body: "州里给了句官样答复，但口径统一了两周。够医院排班了。", effects: { rep: 0.7, fac: { press: 4, establishment: -3 } } },
          meh: { body: "信寄出去，石沉大海。你把同一封信又寄了一遍。", effects: { rep: 0.1 } },
          fail: { body: "州里反手公布你县的低遵守率数据，媒体的标题变成「先管管你自己」。", effects: { rep: -1.3, fac: { establishment: -8, press: -6 } } },
          critfail: { body: "你要求调度的那批床位被查出根本不存在。你替一个空头数字向全州的医护发了声。", effects: { rep: -2.3, fac: { press: -10, establishment: -8, base: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "fed_power", text: "动用自己的权限：征用本地产能、跨区调货、把联邦资金一次性申请到底",
        note: "赌程序权限能在市场之前把货拿到手。风险：越界的那一步，将来由你一个人站出来说明。",
        when: { tierRaw: true, tierMin: 7 },
        base: 0.46, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "commercial", w: 0.2 }],
        outcomes: {
          crit: { body: "两条产线在十天内转产，呼吸机先落进你的州。全国的医院协会公开谢了这一次调配，也公开提了你的名字。", effects: { rep: 2.2, attr: { INT: 2 }, voters: { warm: 400 }, fac: { base: 10, commercial: 8, establishment: 5, press: 6 } } },
          ok: { body: "货拿到了，价谈崩了。你为一次调配得罪了两家厂商，但也救回了一批床位。", effects: { rep: 1.3, fac: { base: 5, commercial: -5, establishment: 3 } } },
          meh: { body: "你的授权签下去了，执行却排在别人的货之后。", effects: { rep: 0.3, fac: { commercial: -2 } } },
          fail: { body: "征用令被人告到法院，程序暂停的那三周恰好是最缺货的三周。", effects: { rep: -1.9, fun: -0.8, fac: { commercial: -12, establishment: -8, base: -4 } } },
          critfail: { body: "被征用的那家厂本已接到别的州更高的出价。你被写成「拿紧急权做地方交易」，听证会反过来审你。", effects: { rep: -3, fun: -1.2, fac: { commercial: -16, establishment: -10, press: -10, base: -6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2020-05/06 · 弗洛伊德之死与那个夏天（最高优先级）
   * ==================================================================== */
  {
    id: "ln20_summer", photo: "era-2020.jpg", grade: "major", category: "civil",
    valence: "risk", dyn: true,
    minYear: 2020, maxYear: 2020, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 15, unique: true,
    medium: ["tv", "cable", "social", "shortvideo"], month: 6,
    title: "一次跪压命案点燃全国，整个夏天站在追问上",
    body: "5 月下旬，明尼阿波利斯，一名黑人男子被警察跪压近九分钟后再没起来。视频三天传遍全国，四名涉事警察当天即被解职。数百座城市走上街头，多数和平，少数几条街在烧。国民警卫队进城，宵禁一道接一道。\n" +
      "你所在城市的街面同样紧绷：年轻人要你同跪，商户要你「周五前恢复秩序」。这个夏天的每个选择，都会被记进明年选战的底稿。",
    brief: {
      lede: "这个夏天只有两道题：看不看见愤怒，秩序等于什么。",
      known: [
        "视频已全国公开，四警解职，联邦民权调查介入。",
        "抗议多数是和平的，但几条街的火占满每晚头条。",
        "市议会报名挤爆，两拨人只要你「站在我们这边」。"
      ],
      rumor: [
        "有人说外来「煽动者」已经进了队伍。",
        "有人说警察工会在串联集体怠工。"
      ],
      unknown: [
        "这火要么烧进议程，要么烧掉你的选情。",
        "你站哪头，另一头会记住你。"
      ],
      terms: [{ k: "下跪抗议", v: "源自 NFL 球员的静默抗议姿势。" }]
    },
    choices: [
      {
        id: "march", text: "走到游行最前面：同跪、推警察履责条例",
        note: "押上全部招牌赌这场运动不退潮。赌对了是新阵营的门面，赌错了是「跪得太快的人」。",
        base: 0.44, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你跪在队伍最前面那张照片传遍全国，本地条例真过了委会。年轻人头一回把你当「自己人」。", effects: { rep: 1.6, voters: { warm: 600 }, fac: { base: 10, press: 5, establishment: -6 }, flags: ["reform_side"] } },
          ok: { body: "你站到了街对面，条例还没影，但名单上有了你。老支持者觉得你太急。", effects: { rep: 0.7, voters: { warm: 200 }, fac: { base: 6, establishment: -3 } } },
          meh: { body: "你跪了，镜头没找到你。运动不需要多一个跪着的人。", effects: { rep: 0.1, fac: { establishment: -2 } } },
          fail: { body: "几场失控的游行把你的镜头剪成「鼓动暴乱」。郊区业主开始给对手捐款。", effects: { rep: -1.75, fac: { military: -6, establishment: -5, base: -4 } } },
          critfail: { body: "你所在街区也失了火，而你上午刚在火上浇过话。两边同一天把你上了通缉级的骂。", effects: { rep: -2.75, fac: { base: -6, press: -8, establishment: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "order", text: "站在治安一边：挺警察、限期清场、支持宵禁",
        note: "赌沉默的多数受够了浓烟。赌对是「秩序大人」，赌错是被整个夏天写在墙上的名字。",
        base: 0.46, mods: [{ src: "fac", key: "military", w: 0.35 }, { src: "attr", key: "CUN", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "宵禁生效那晚街道真静了，商户联名登报道谢。警员协会把你当成「敢说我们也是受害者的人」。", effects: { rep: 1.5, voters: { warm: 400 }, fac: { military: 10, establishment: 6, base: -8 } } },
          ok: { body: "你守住了商户与老主顾，年轻人从此不再进你的门。", effects: { rep: 0.6, fac: { military: 5, base: -4 } } },
          meh: { body: "你喊了秩序，街面自己凉了。功劳轮不到你，骂名倒是先挂上了。", effects: { rep: -0.2, fac: { base: -3 } } },
          fail: { body: "清场中有人受伤，画面比你那句「恢复秩序」传得快十倍。", effects: { rep: -2, fac: { base: -8, press: -6 } } },
          critfail: { body: "你协调来的镇暴支援与一张警棍特写同屏滚动。你的选区办公室第一次被人围住讨说法。", effects: { rep: -3, fac: { base: -10, press: -8, church: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "bargain", text: "坐到谈判桌上：用一揽子社区投资换街面降温",
        note: "两头开价两头接。成了是「能办事的人」，砸了就是两边眼里的投机商。",
        base: 0.4, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "labor", w: 0.2 }],
        cost: { fun: 1.5 },
        outcomes: {
          crit: { body: "真金白银换来了和平委员会的签字照：问责条款、社区投入、警力试点，各取所需还都能交代。你被夸成这个夏天唯一做成交易的人。", effects: { rep: 1.8, attr: { INT: 3 }, fun: 1, fac: { base: 8, labor: 5, establishment: 4 } } },
          ok: { body: "打包方案半生不熟地过了，街面降温，两头都说「还不够」，但至少都谢了你。", effects: { rep: 0.5, fac: { base: 3, establishment: 2 } } },
          meh: { body: "谈判拖了整个六月，钱花了几笔，协议一个字没签。", effects: { rep: -0.2, fun: -1 } },
          fail: { body: "两头都觉得被卖了：青年说你「花钱买闭嘴」，商会说你「拿公款喂抗议」。", effects: { rep: -2.25, fun: -1.5, fac: { base: -6, establishment: -4 } } },
          critfail: { body: "预算明细被人一行行念上直播，「运动资金流向己方项目」的标题替你出圈。", effects: { rep: -3.5, fun: -2, fac: { press: -10, base: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "listen", text: "不选边：开听证会，让两拨人都把话说完",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "三小时不插话的听证被本地报夸成「这个月唯一正常的场合」。两拨人都挑不出你的错。", effects: { rep: 0.9, attr: { INTG: 1 }, fac: { church: 5, base: 3 } } },
          ok: { body: "你让人把话说完，谁也没沾光，谁也没受气。安稳。", effects: { rep: 0.35, fac: { church: 2 } } },
          meh: { body: "听证会开到一半人就散了。你的中立既不解气也不顶事。", effects: { rep: 0.1 } },
          fail: { body: "两拨人都嫌你只搭台不表态，「中间」成最挤不下的位置。", effects: { rep: -0.5 } },
          critfail: { body: "会后两派在台阶上推搡，标题是「在他搭的台子前打的架」。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2020-11 · 大选与计票争议（邮寄票由 soc20_mailin 承接，本卡管正当性）
   * ==================================================================== */
  {
    id: "ln20_election", photo: "era-2020.jpg", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 2020, maxYear: 2020, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 15, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 11, day: 3,
    title: "票还没数完，胜负已经被抢先宣布",
    body: "疫情年投票率冲上一百多年来的高点，几千万张邮寄票要数上好几天。选前民调几乎一边倒，可开票夜的「领先」随拆箱顺序反复翻转；未及多数媒体作决，在任总统已宣布自己赢了，并指控「舞弊」。数十宗诉讼在法院排队，计票官员收到威胁。\n" +
      "两党的电话同时打给你。今年这一题已不只是谁赢，而是输了的人认不认。",
    brief: {
      lede: "数票还没完，话先出了口。这些天你说的每句都会被拿去当证据。",
      known: [
        "邮寄票按州法后点是常规，不是异常。",
        "多个关键州领先不到一个百分点，重算可能。",
        "两边都在动员，说错话的地方选官被人肉上门。"
      ],
      rumor: [
        "有人说某县的计票服务器当晚「恰好」宕机。",
        "有人说诉讼团队连夜把数字早就写好了。"
      ],
      unknown: [
        "这批诉讼会一宗一宗被州法院清场。",
        "你今晚站哪队，一月就替谁挡刀。"
      ],
      terms: [
        { k: "摇摆州", v: "归属难料、谁赢拿全部选举人票的州。" },
        { k: "重新计票", v: "依州法重数选票的程序。" }
      ]
    },
    choices: [
      {
        id: "rules_first", text: "先讲规则：请大家等数完，结果就是正当的",
        note: "赌制度还值钱。赌对了是定海神针，赌错了一边把你当帮凶。",
        base: 0.48, mods: [{ src: "attr", key: "INTG", w: 0.45 }],
        outcomes: {
          crit: { body: "计票风暴里你这段「等数完再说」被反复转播，两党温和派难得同版夸人。你的名字进了「稳局者」名单。", effects: { rep: 1.5, fac: { establishment: 8, press: 6, base: -6 }, flags: ["institutionalist"] } },
          ok: { body: "你讲了几遍程序与正当性，信的人稳了，怒的人记你一笔。", effects: { rep: 0.7, fac: { establishment: 3, base: -2 } } },
          meh: { body: "你的理性像往海里丢沙，谁也没听见。", effects: { rep: 0.1 } },
          fail: { body: "一边最终没认输，你的「等数完」被剪成「替对手拖时间」。基本盘调头骂你。", effects: { rep: -1.75, fac: { base: -8, press: 2 } } },
          critfail: { body: "结果揭晓那天你的选区爆发了对峙，两边都指着你说「你当初该硬」。你谁也没护住。", effects: { rep: -2.75, fac: { base: -10, establishment: -6 } } }
        }
      },
      {
        id: "contest", text: "押「推翻」：要求重算与审计，跟着舞弊口号走",
        note: "赌的是「只要不停，就没输」。赢一票通吃，输就是下一场风暴的被告席。",
        base: 0.38, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "fac", key: "base", w: 0.3 }],
        cost: { fun: 1.5 }, stake: { fav: true },
        outcomes: {
          crit: { body: "一宗重算真翻了几百票，你在台上喊「我们看到机器修好了」。全国反建制的群像把你当本地英雄。", effects: { rep: 1.3, voters: { warm: 600 }, fac: { base: 12, establishment: -10, press: -6 }, flags: ["denier"] } },
          ok: { body: "你把声量拉满，官司一宗没赢，但你这边的人只记得你「战斗过」。", effects: { rep: 0.4, voters: { warm: 200 }, fac: { base: 6, establishment: -5 } } },
          meh: { body: "你跟着喊了停数，法庭与计票中心都没理你。", effects: { rep: 0, fac: { press: -4 } } },
          fail: { body: "一宗接一宗诉讼被驳回，其中几宗的签名栏里写着你的名字。", effects: { rep: -2.25, fun: -1, fac: { establishment: -10, press: -8 } } },
          critfail: { body: "各州清点完毕、联邦法院把最后那宗也驳回。你组织的「选票监票」名单被人整版登在报上，传票在路上。", effects: { rep: -3.5, fun: -1.5, fac: { establishment: -12, press: -10, base: -4 }, flags: ["denier", "investigation_open"] } }
        }
      },
      {
        id: "count_only", text: "守好自己那箱票：把数字数完，一个字不多说",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "连轴三夜你守完自己那几箱票，数字分毫不差。风平浪静后有人翻记录：那一夜他没添过一把柴。", effects: { rep: 0.9, fac: { press: 4, establishment: 3 } } },
          ok: { body: "票数完了，你没说过一句越界的话。平淡就是这个月的勋章。", effects: { rep: 0.4 } },
          meh: { body: "你闷头数完了票，像什么都没发生。", effects: { rep: 0.05 } },
          fail: { body: "两边都觉得你「在场却不出声」是替对方打掩护。不说话也是话。", effects: { rep: -0.5, fac: { base: -3 } } },
          critfail: { body: "事后问责翻旧账，「他当时在场却一声不吭」成了一句迟到的罪状。", effects: { rep: -1, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2021-01 · 国会山冲击（01-06，最高优先级）
   * ==================================================================== */
  {
    id: "ln21_capitol", photo: "era-2020.jpg", grade: "major", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2021, maxYear: 2021, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 15, unique: true,
    medium: ["tv", "cable", "social", "shortvideo"], month: 1, day: 6,
    title: "人群涌上国会山台阶，认证程序当场中断",
    body: "1 月 6 日，两院集会点算选举人票，现任副总统到场主持。下午，总统的集会变成冲卡：人群翻过围栏、闯进圆顶，会议中止，两院疏散。当天四人死亡，一名警察次日伤重不治。深夜两院复会，计票在凌晨完成。\n" +
      "直播镜头钻进国会走廊的同时，也钻进了你家客厅。你的话机被打爆：一半人说这是爱国，一半人说这是叛乱——他们都要你说个词。",
    brief: {
      lede: "镜头记录下你每一个用词，而这些用词将在接下来的审判里被引用。",
      known: [
        "选举人票清点中断而未停止，当夜复会。",
        "首都不到一公里的增援，要等两个小时的批。",
        "总统当天那句「我们爱你们」被两派各自转发。"
      ],
      rumor: [
        "有人说场内混进了「对方的人」。",
        "有人手里已经流传出一份议员内应名单。"
      ],
      unknown: [
        "对这场冲击的调查会持续很多年。",
        "你今晚点谁的名，下轮提名就轮到谁点你。"
      ],
      terms: [{ k: "选举人票清点", v: "国会两院联席会议点票，属仪式程序。" }]
    },
    choices: [
      {
        id: "name_it", text: "点名定性：这是叛乱，追责要到总统",
        note: "最响也最烫：赌建制回潮比你家火气先到。赌错，基本盘把你钉在叛徒栏。",
        base: 0.45, mods: [{ src: "attr", key: "INTG", w: 0.45 }, { src: "fac", key: "establishment", w: 0.25 }],
        outcomes: {
          crit: { body: "复会那夜的媒体名单上，你是地方一级第一个把「叛乱」说完整的人。两党温和派与商界的电话一起打过来。", effects: { rep: 1.5, fac: { establishment: 9, press: 8, base: -8 }, flags: ["institutionalist"] } },
          ok: { body: "你用了「暴力」「煽动」这类词，报头满意，自家街区的电话从此不打了。", effects: { rep: 0.7, fac: { press: 4, base: -4 } } },
          meh: { body: "你说得够硬，只是当晚比你硬的人太多，没人记住是你。", effects: { rep: 0.2 } },
          fail: { body: "基层把你钉成「替入侵者讨罪的人」，你办公室的门一礼拜没消停。", effects: { rep: -1.75, fac: { base: -10 } } },
          critfail: { body: "你带头联名要求撤职，两周后风向翻转，签过的名字被逐行读成了卖身契。", effects: { rep: -2.75, fac: { base: -12, establishment: -4 } } }
        }
      },
      {
        id: "both_sides", text: "含糊降温：痛恨暴力，但也要听「爱国者」的委屈",
        note: "两边各递一杯水。小心端法——洒了，两身都湿。",
        base: 0.4, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        cost: { fav: 1 }, stake: { fun: true },
        outcomes: {
          crit: { body: "你的「谴责冲击，也谴责清场过当」竟然两头都吃了：基层觉得你撑腰，报界懒得与你为难。", effects: { rep: 1.3, voters: { warm: 500 }, fac: { base: 10, establishment: -8, press: -6 } } },
          ok: { body: "你两边各打五十大板，两边都没把你当靶子。滑过去了。", effects: { rep: 0.35, fac: { base: 4, establishment: -3 } } },
          meh: { body: "你的平衡木走得无声无息，两拨人都嫌你话少。", effects: { rep: -0.3, fac: { press: -3 } } },
          fail: { body: "「两边都有错」被做成十五秒的鬼畜，一边用来笑你，一边用来骂你。", effects: { rep: -2.25, fac: { press: -8, establishment: -8 } } },
          critfail: { body: "你派去「观队」的班车报名表被人捅了出来，你的签名在列。调查电话打进来的时候，你正在镜头前。", effects: { rep: -3.25, fac: { press: -10, establishment: -10, base: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "calm", text: "只说一句：要求恢复正常运转，反对一切暴力",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "全国在吵定性，你先催两院把班恢复。事后复盘时，这句最不刺激的话被当成最正常的证据。", effects: { rep: 0.9, fac: { church: 4, establishment: 3 } } },
          ok: { body: "你说了不会错的一句话，谁也没法引用你，谁也没法攻你。", effects: { rep: 0.4 } },
          meh: { body: "你的声明混进了当晚几百份声明里，连你自己都懒得再提。", effects: { rep: 0.1 } },
          fail: { body: "「只说程序」被读成「不敢说人话」，两拨人对你的失望同时到货。", effects: { rep: -0.5, fac: { base: -3 } } },
          critfail: { body: "一周后你的沉默被翻成「默认」，被人挂在门口喊话。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2021-03 · 亚特兰大按摩店连环枪击（03-16，8 死 6 为亚裔女性）
   * ==================================================================== */
  {
    id: "ln21_atlanta", grade: "mid", category: "civil",
    valence: "bane", dyn: true,
    minYear: 2021, maxYear: 2021, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 12, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 3, day: 16,
    title: "三家按摩店一夜三场枪击，八条人命",
    body: "3 月 16 日夜，亚特兰大近郊三家按摩店接连响起枪声：8 人死亡，其中 6 名是亚裔女性。枪手次日落网，对警员说「我有性成瘾，我只是想结束诱惑」。当地警长第一时间定性「心理健康问题，非仇恨犯罪」，联邦按仇恨罪方向介入调查。\n" +
      "被疫情污名折腾了一整年的亚裔商户，这次把请愿信直接递到你案头。你的信箱同时收到另一封金主的提醒：别把这桩事「政治化」。",
    brief: {
      lede: "定性之争决定一个社区的安全感，也决定你欠哪边的账。",
      known: [
        "警方确认死者中六人为亚裔女性，多为移民。",
        "警长坚持非仇恨定性，联邦民权部门已介入。",
        "本地亚裔商铺过去一年因疫情关了三成。"
      ],
      rumor: [
        "有人说枪手案发前常年在三家店一带转悠。",
        "有人说警长办公室与店主之间有长期的「默契费」。"
      ],
      unknown: [
        "仇恨罪的统计口径会扯皮很多年。",
        "你陪哪边的灵，那边记你很久。"
      ],
      terms: [{ k: "仇恨犯罪", v: "因偏见动机行凶，量刑与统计单列。" }]
    },
    choices: [
      {
        id: "hate_crime", text: "按仇恨罪定性：推地方仇恨案件数据单列与立法",
        note: "赌这场愤怒会沉淀成选票。得罪的是警界「不贴标签」的老规矩。",
        base: 0.46, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "base", w: 0.25 }],
        outcomes: {
          crit: { body: "你的口径被社区译成三种语言贴满店门，州里的仇恨罪统计案真挂上了你名字。这个社区第一次觉得被当人看。", effects: { rep: 1.5, attr: { INTG: 2 }, fac: { base: 8, press: 6, establishment: -4 }, flags: ["hate_crime_side"] } },
          ok: { body: "你说了那个词，也递了案文。社区领情，警界记你一账。", effects: { rep: 0.6, fac: { base: 5, press: 3 } } },
          meh: { body: "你用了那个词，但没推动任何东西。词很快就不值钱了。", effects: { rep: 0.15 } },
          fail: { body: "警长公开反驳「别贴标签」，警员协会的广告砸进你的选区。", effects: { rep: -1.75, fac: { agency: -6, establishment: -5 } } },
          critfail: { body: "你按「仇恨」起草的文件被人改成「撕裂社区」的矛头，两派同时拿你开刀。", effects: { rep: -2.5, fac: { agency: -8, press: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "mental_health", text: "顺「心理健康」叙事：推危机响应与治安分流",
        note: "不碰身份战争，只修那台没拦住枪的系统。两头都说你避重就轻。",
        base: 0.42, mods: [{ src: "attr", key: "INT", w: 0.45 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "危机响应试点真落到你县，警界与州府都把你当「不添乱还能交差的人」。只是社区那边，你的名字淡了。", effects: { rep: 1.3, attr: { INT: 2 }, fac: { agency: 12, establishment: 6, base: -4 } } },
          ok: { body: "你把议题从标签战里捞出来做成技术活，安全，但也不解气。", effects: { rep: 0.5, fac: { agency: 6, military: 4 } } },
          meh: { body: "你的技术方案排进了「研究阶段」，谁也没等来结果。", effects: { rep: 0 } },
          fail: { body: "社区代表在你办公室门口举着 8 张照片：「先说她们是不是亚裔」。你被拍进自己的回避里。", effects: { rep: -2, fac: { base: -8, press: -4 } } },
          critfail: { body: "你替警方「非仇恨」定性背书的话被逐字播出，一年排外情绪积下的怒全泼到你身上。", effects: { rep: -3, fac: { base: -10, press: -8, church: -5 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "vigil", text: "不做定性：陪完每场灵，再组织商街联防",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "三种语言的守夜蜡烛里你都到了，联防排班表头一页是你的字。定性之争还在吵，店门先开了。", effects: { rep: 0.9, fac: { church: 5, base: 4 } } },
          ok: { body: "你每场都到、少说多做，社区记住了你的脸，没记住你的话。", effects: { rep: 0.4, fac: { base: 2 } } },
          meh: { body: "你来了，站了一会儿。那种场合来的人太多。", effects: { rep: 0.1 } },
          fail: { body: "有家属在镜头前问：你到底要说什么？你没答，第二天这话还在循环。", effects: { rep: -0.5 } },
          critfail: { body: "你的「陪伴」被两边各读出一层意思，两边都失望。", effects: { rep: -1, fac: { press: -3, base: -2 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2021-08 · 阿富汗撤军与喀布尔陷落（08-15 陷落 / 08-26 机场外爆炸 / 08-31 终）
   * ==================================================================== */
  {
    id: "ln21_afghan", grade: "major", category: "foreign",
    valence: "risk", dyn: true,
    minYear: 2021, maxYear: 2021, scoped: true, tierRaw: true, tierMin: 2, tierMax: 6, weight: 15, unique: true,
    medium: ["tv", "cable", "internet", "social", "shortvideo"], month: 8,
    title: "二十年战争，在喀布尔陷落的一天里收场",
    body: "撤军期限定死在 8 月 31 日；盟友政府十天内崩盘，总统携巨款出逃，8 月 15 日喀布尔易手，几乎没打巷战。机场闸口外几千人追着舱门；26 日门外自杀式爆炸，13 名美军与逾百阿富汗人丧生；30 日最后一架运输机起飞。\n" +
      "你所在州有替美军当过翻译的难民家庭，签证卡在安检那一侧。老兵组织分两拨找你：一拨要你把人接出来，一拨要华盛顿为此负责。",
    brief: {
      lede: "撤离是按小时计的，你打过招呼的翻译家能不能上飞机，是按关系计的。",
      known: [
        "机场由军方管制，使馆已暂停本地雇员放行。",
        "你选区登计的翻译家属十余口，材料卡在安检。",
        "本地驻军有阵亡，退伍军人协会两派对立。"
      ],
      rumor: [
        "有人说情报圈一周前就判了「政府会掉」。",
        "有人说待撤本地雇员的数字被报小了数倍。"
      ],
      unknown: [
        "这些画面会被今后每一次撤军论引用。",
        "你救下谁、漏下谁，他们的孩子会讲。"
      ],
      terms: [{ k: "本地雇员", v: "为美军使馆工作者，撤后面临清算。" }]
    },
    choices: [
      {
        id: "rescue", text: "动用人脉硬推名单：把他们送上出境航班",
        note: "赌程序追不上人情。成了是救命恩，砸了是「私批签证」的被告。",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "agency", w: 0.2 }],
        cost: { fav: 2 },
        outcomes: {
          crit: { body: "名单在闸口封死前一刻被放行。一年后那家人在你所在的街区开了间餐厅，开业那天门口挂的是两国旗。", effects: { rep: 1.6, fac: { base: 8, church: 6, foreign: 5 }, flags: ["refugee_backer"] } },
          ok: { body: "你挤上去大半人，漏了两三个名字。那家人进门的时候，先给你们家送了礼物。", effects: { rep: 0.7, fac: { base: 4, church: 2 } } },
          meh: { body: "名单递上去没有回音，闸口封了。你只落下一身汗。", effects: { rep: 0 } },
          fail: { body: "你绕过流程的那页纸被人翻出来，「他凭什么批别人的命」。安全部门第一次对你设防。", effects: { rep: -1.75, fac: { agency: -6, establishment: -5 } } },
          critfail: { body: "一宗未遂袭击的嫌疑人被扒出与你当年推的名单沾亲。听证会还没开，标题已经定了。", effects: { rep: -2.75, fac: { agency: -8, press: -8, base: -4 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "account", text: "公开问责：限期怎么定的、情报怎么判的，要个说法",
        note: "对军队与情报系统开炮，赌全民都在看这段烂尾。小心 13 个名字，他们也在看你。",
        base: 0.42, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "press", w: 0.25 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你连问三题：谁定的期限、谁判的「不会快」、谁在闸口外被落下。全国的追问都引你的原话，军界恨得牙痒，舆论给你立了牌坊。", effects: { rep: 1.5, attr: { INT: 2 }, fac: { press: 8, base: 5, military: -10, establishment: -6 } } },
          ok: { body: "你把话钉在桌上，听证排上了队。军方礼节性地回了一页纸，谁也没解渴。", effects: { rep: 0.5, fac: { press: 4, military: -4 } } },
          meh: { body: "你的问责被更大的头条盖住了，连你自己的选民都没等到下文。", effects: { rep: 0.1 } },
          fail: { body: "阵亡士兵的母亲们先站出来谢了华盛顿，再问是谁在拿死者打选战。", effects: { rep: -2, fac: { military: -8, base: -6 } } },
          critfail: { body: "你引用的「内部评估」被证伪，指控调头变成你的笑话，军方发言人念着你的名字松了口气。", effects: { rep: -3, fac: { press: -10, military: -10 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "home_first", text: "先接自己的：为十三名阵亡者与本地难民办到底",
        note: "不谈国运只办丧与安顿。钱要真掏，事要真办，头条轮不到你。",
        base: 0.5, mods: [{ src: "fac", key: "military", w: 0.35 }, { src: "attr", key: "INTG", w: 0.25 }],
        cost: { fun: 0.8 },
        outcomes: {
          crit: { body: "灵柩到镇那天的仪仗是你盯着办的，难民家庭的安家款也是你从县级账上抠出来的。两边的讣告上都谢了同一个名字。", effects: { rep: 1.3, fun: -0.5, fac: { military: 10, church: 5, base: 4 } } },
          ok: { body: "你该陪的灵陪了，该跑的事跑了。没上全国版面，本地账都平了。", effects: { rep: 0.5, fac: { military: 4, church: 2 } } },
          meh: { body: "钱花了，仪式也办了，两头都觉得理所当然。", effects: { rep: 0.1, fun: -0.8 } },
          fail: { body: "安置款卡在一道审计里，家属在电话里问：钱到底去哪了。你答不出。", effects: { rep: -1.5, fun: -1, fac: { base: -4 } } },
          critfail: { body: "一笔「难民交通补贴」被翻出账目瑕疵，「拿阵亡者的钱做秀」的标题第一次落到你头上。", effects: { rep: -2.5, fun: -1.5, fac: { military: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "quiet_help", text: "不预测对错：先把本地收容所的接待能力扩出来",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "第一批安顿家庭落地时，只有你这条线的床位与翻译是现成的。没人采访你，但每个家庭都收到了你那本通讯录。", effects: { rep: 0.9, attr: { INT: 1 }, fac: { church: 4, labor: 3 } } },
          ok: { body: "你悄悄把该备的备了，没上任何版面，也没得罪任何人。", effects: { rep: 0.4, fac: { church: 2 } } },
          meh: { body: "床位备下了，来的人不多。你的先见之明无处兑现。", effects: { rep: 0.1 } },
          fail: { body: "「战争都塌了他还在管床位」——这句玩笑在你背后传了一圈。", effects: { rep: -0.4 } },
          critfail: { body: "一笔临时开支被审计挂住，「借难民花钱」的说法第一次有人在饭局上讲。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2021-10 · 供应链断裂与通胀回头（9 月 CPI +5.4%，13 年新高；双港 24 小时运转）
   * ==================================================================== */
  {
    id: "ln21_inflation", grade: "mid", category: "finance",
    valence: "risk", dyn: true,
    minYear: 2021, maxYear: 2021, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "print", "internet", "social"], month: 10,
    title: "货架开始空，价格每天早上都在涨",
    body: "集装箱船在外海排队两周，洛杉矶与长滩港头一回宣布 24 小时运转，货还是动不了。9 月消费者物价同比涨 5.4%，十三年来最高；卡车司机与仓管成了最抢手的人。圣诞玩具与感恩火鸡，新闻管这叫「供应链」，店铺的账本管这叫「缺货」。\n" +
      "选区老板们催你给句话。反对党已经磨好了一个词：「都是你们搞的」。",
    brief: {
      lede: "涨价每多拖一个月，你那句「暂时的」就越像笑话——或者越像远见。",
      known: [
        "港口压柜、用工缺口、需求集中回弹，三头一起。",
        "美联储仍称「暂时性」，财长发言逐字复述。",
        "本地最大仓储在缩时，小零售先断货。"
      ],
      rumor: [
        "有人说航运巨头故意停船抬运价。",
        "有人说某巨头买空了一半圣诞货架。"
      ],
      unknown: [
        "工资与物价的螺旋已经转到哪一圈。",
        "谁先把这词叫对，2022 的话语权就属谁。"
      ],
      terms: [{ k: "CPI", v: "消费物价指数，通胀的主指标。" }]
    },
    choices: [
      {
        id: "accuse", text: "上电视点名：带头开「物价听证」，锅递回华盛顿",
        note: "顺着选民的账单打最省票。风险是账单一续涨，你点名的底气就续薄。",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "base", w: 0.25 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "你的听证请到了断货的店主与排队加油的司机，全国版面上你是「最早算总账的地方人」。对手党的广告词被你抢先用顺了。", effects: { rep: 1.5, voters: { warm: 400 }, fac: { base: 8, press: 5, establishment: -8 } } },
          ok: { body: "你开了几场好听的听证，账没少，气出顺了。", effects: { rep: 0.6, fac: { base: 4, establishment: -3 } } },
          meh: { body: "你的点名被更响的点名盖过去了。通胀不听话筒。", effects: { rep: 0.1 } },
          fail: { body: "本地那家最大雇主点名反咬：「他问我们涨价前问了吗」。你两头话没对上。", effects: { rep: -1.75, fac: { commercial: -8, establishment: -4 } } },
          critfail: { body: "你痛批「囤货抬价」的那家仓店，查出有你的旧股。听证变审判，标题只用了八个字。", effects: { rep: -2.75, fac: { press: -8, commercial: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "fix_local", text: "掏钱修本地：租仓、补贴司机培训、开市政货运通道",
        note: "把钱花在自己街区的货架上。见效慢、账目显眼，做好了是「能办事」的招牌。",
        base: 0.4, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "fac", key: "labor", w: 0.2 }],
        cost: { fun: 2.5 },
        outcomes: {
          crit: { body: "圣诞前你这条街的货架是满的，卡车司机培训结业那天的合影上了本地晚报头版。「别处喊话，此地补货」成了你的标签。", effects: { rep: 1.4, fun: 2, attr: { INT: 2 }, fac: { commercial: 8, labor: 6, base: 4 } } },
          ok: { body: "你补上了一段货，培训出了几十号司机。钱花得见得到底。", effects: { rep: 0.6, fun: 0.5, fac: { labor: 4 } } },
          meh: { body: "钱投下去了，货架照旧。你的方案只证明了一件事：瓶颈不在本地。", effects: { rep: -0.2, fun: -2 } },
          fail: { body: "市政货运通道成了本地最大的烂尾工地，两头骂你把钱砸进了水泥。", effects: { rep: -2.25, fun: -2.5, fac: { commercial: -6, base: -4 } } },
          critfail: { body: "那家拿到仓租合同的承包商，账上写着老熟人的名字。「危机里发财」的投诉信抄送全州。", effects: { rep: -3.25, fun: -2.5, fac: { press: -8, base: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "household", text: "不预测不甩锅：开应急粮站，公开自家账本",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你把自家每月菜钱摊在社媒上，附粮站排班表。「不装懂也不装穷」这句好评，是本地老板娘们说的。", effects: { rep: 0.9, attr: { INTG: 1 }, fac: { base: 5, church: 3 } } },
          ok: { body: "粮站开了，账本公开了，没人夸也没人骂。淡季里，这就算赢。", effects: { rep: 0.4, fac: { base: 2 } } },
          meh: { body: "你的粮站开了半仓，来的都是熟面孔。", effects: { rep: 0.1 } },
          fail: { body: "有人说你拿纳税人的钱开自家门面的面子工程，你张了嘴又没辩。", effects: { rep: -0.4 } },
          critfail: { body: "公开账本里一笔「伙食采买」被人放大对质，「装穷」与「装懂」各一顶帽子同时落下。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 世界线 · 2019—2021：按年压力 / 年初简报 / 媒介景观
 *   2020 为全曲线峰值（5，存量内容基线压力封顶惯例；6 会吞掉活跃度加成）：
 *   大流行 + 衰退 + 大选 + 全国抗议四头对冲。
 *   outlets 均为当年确实存在的媒体（Substack/TikTok 之类平台不列；GB News 非美国且 2021-06 才开播）。
 * ==========================================================================*/
POTUS.define("worldline", {
  pressure: {
    "2019": 3,   // 弹劾沿党界撕裂、两起大型枪击；经济面尚稳
    "2020": 5,   // 大流行 + 经济停摆 + 全国抗议 + 大选正当性之争（全曲线峰值；
                 //   注：6 会把 pressure() 直接顶到引擎上限、吞掉活跃度加成（validate 单调性断言），
                 //   存量内容最高只写到 5（见 20-eras.js 2008/2016 带），故峰值取 5）
    "2021": 4    // 国会山冲击、阿富汗终局、供应链与通胀回头
  },
  brief: {
    "2019": "弹劾案卷回来了，枪声没停过。表面繁荣盖不住政治的裂口，所有制度都像在等一件事发生。",
    "2020": "病毒、封锁、街头的夏天与一场被质疑结果的选举把国家推入数十年来最割裂的一年。新闻的节奏决定了人们如何呼吸。",
    "2021": "国会山与喀布尔为这一年画下动荡的开篇与终章。疫情未止、物价开始咬人，人人都在等另一只靴子落地。"
  },
  outlets: {
    "2019": ["纽约时报", "华盛顿邮报", "华尔街日报", "有线电视新闻网", "福克斯新闻"],
    "2020": ["有线电视新闻网", "福克斯新闻", "纽约时报", "今日美国", "大西洋月刊"],
    "2021": ["华盛顿邮报", "有线电视新闻网", "福克斯新闻", "纽约时报", "今日美国", "公共电视网新闻时刻"]
  }
});

/* ============================================================================
 * fixed · 本带定点表（≥11 个锚点；major ≈ 1/2）
 *   · soc20_mailin 为存量卡（108-era-2016.js），§4.2 归 B8 所有：只 pin 不重写，
 *     2020-11 与卡内 month:11 的史实窗口同步（邮寄票信任危机在计票夜爆开）。
 *   · ln20_acquit 靠 after 续接 ln19_impeach：前幕未演则静默跳过，串可断裂。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln19_shooting", year: 2019, month: 8, grade: "mid" },
  { event: "ln19_impeach", year: 2019, month: 12, grade: "major" },
  { event: "ln20_acquit", year: 2020, month: 2, grade: "mid" },
  { event: "ln20_covid", year: 2020, month: 3, grade: "major" },
  { event: "ln20_summer", year: 2020, month: 6, grade: "major" },
  { event: "soc20_mailin", year: 2020, month: 11, grade: "mid" },
  { event: "ln20_election", year: 2020, month: 11, grade: "major" },
  { event: "ln21_capitol", year: 2021, month: 1, grade: "major" },
  { event: "ln21_atlanta", year: 2021, month: 3, grade: "mid" },
  { event: "ln21_afghan", year: 2021, month: 8, grade: "major" },
  { event: "ln21_inflation", year: 2021, month: 10, grade: "mid" }
]);
