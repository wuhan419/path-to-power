/* ============================================================================
 * CONTENT · events/147-whitehouse.js
 * 白宫事务池（#21 M1）——入主白宫之后，一个月一决策的那八件事。
 *
 * 这条池子不进随机卡池（engine/events.js 的 eligible 已挡掉 wh:true），只经
 *   engine/presidency.js 的 P.whiteHouseSlot() 注入：四族（危机/立法/外交/人事）轮转，
 *   每月一条，同族绝不连刷三个月。所以「这个月的桌上是什么」看得见规律。
 *
 * M1 只有 8 张（四族各 2）——它验证的是管线，不是内容量：8 张撑 8 个月的重复周期
 *   （balance.presidency.repeatMonths=8）刚好不断流，M2 要扩到 ≥24 张并把周期抬回 18。
 *
 * 写法纪律：
 *   · wh:true + whFamily:四族之一 —— 强制通道的入场券。
 *   · tierRaw:true, tierMin:9, tierMax:9 —— 只有总统看得到（tierMax 就是总统）。
 *   · unique:false —— 任期 96 个月，一次性卡撑不起逐月；同卡由月份冷却把关，不靠 doneIds。
 *   · dyn:true —— rep/fun/hp 写系数（1.0 = T2 基准人物的标准份量），总统的薪资标尺会把钱换算对。
 *   · appr 不折算：支持率是 0-100 的刻度，不随职级膨胀（engine/scale.js 的 SCALE_KEYS 里没有它）。
 *   · 每卡至少一个选项挂 mods:[{src:"approval"}] —— 支持率必须真的会改变胜算，否则它是装饰。
 *   · category 复用既有键（crisis/political/foreign/career）→ 配图映射零改动。
 *   · 铁律：只用「」；每卡至少一个既无 cost 又无 req 的保底选项；五档结果齐全。
 *   · id 避开 demo_2am_call（「凌晨两点来电」已按用户要求永久删除；这里是总统视角的另一张卡）。
 * ==========================================================================*/

POTUS.define("event", [

  /* ================= 危机族 ================= */
  {
    id: "wh_crisis_desk", grade: "major", category: "crisis", valence: "bane",
    wh: true, whFamily: "crisis", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "internet"],
    brief: {
      lede: "凌晨的紧急电话线把你叫醒：一场大飓风还有十八小时登陆，而联邦预警系统刚刚卡壳。",
      known: [
        "州长们已经在媒体上等着你的第一句话，而不是你的第一份文件。",
        "联邦应急体系的按钮很多，但能一次按对的组合只有两三种。",
        "此刻任何一次犹豫都会被剪成「总统不在状态」的那三十秒。"
      ]
    },
    title: "飓风、卡壳的预警网，和十八小时",
    body: "国家安全顾问站在你的床边，话说得很快：飓风比预报提前了，东岸三个州进入紧急状态，而联邦预警的自动拨号系统凌晨升级失败。州长们在电视上说「我们需要白宫」。距离登陆还有十八小时，你的第一句话会在半小时后传遍全网。",
    choices: [
      {
        id: "allin", text: "把联邦机器全压上去：军队待命、三州统一调度、你亲自开记者会",
        base: 0.42, mods: [{ src: "approval", w: 0.30 }, { src: "attr", key: "INT", w: 0.2 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "登陆那夜你站在应急指挥中心，画面比任何讲话都有说服力。三州疏散创纪录，伤亡远低于模型。人们说：这才是总统在干的事。", effects: { rep: 0.9, appr: 6, fac: { establishment: 8 }, voters: { warm: 2000, oppose: -800 } } },
          ok: { body: "调度基本顺畅，漏洞被人力堵上了。你没抢到头条，但你保住了人。", effects: { rep: 0.5, appr: 3, voters: { warm: 900 } } },
          meh: { body: "机器太大了，转到第三天才有实效。批评声说反应慢，数字至少没难看。", effects: { rep: 0.15, appr: -1 } },
          fail: { body: "两个州的疏散路线在你宣布之后互相打架，电视直播了堵死的高速。", effects: { rep: -0.4, appr: -6, fac: { establishment: -6 } } },
          critfail: { body: "预警网在你开发布会时仍未恢复，登陆后三小时你接到十一州的死亡清单。头版只有一句话：总统知道得太晚。", effects: { rep: -0.9, appr: -11, hp: -0.5, flags: ["crisis_desk_fail"] } }
        }
      },
      {
        id: "states", text: "把主导权留给州长，联邦只做后援——不抢功，也不背全锅",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.25 }],
        outcomes: {
          crit: { body: "州长们得到实打实的后援又没被抢走话筒，公开替你说话：白宫是我们见过最会协调的。", effects: { rep: 0.35, appr: 2, fac: { base: 5 } } },
          ok: { body: "灾难控制住了，新闻里主角是三位州长。你安静地赢了一半。", effects: { rep: 0.2, appr: 0.5 } },
          meh: { body: "有一州自己乱了阵脚，人们事后才明白：白宫本来可以早点伸手。", effects: { rep: 0, appr: -2 } },
          fail: { body: "一位州长在电视上直接说：我们等总统等了三小时。", effects: { rep: -0.25, appr: -5, fac: { base: -4 } } },
          critfail: { body: "灾后第十九小时，联邦救援车队在警戒线外晒太阳的照片全网刷屏。标题：白宫在观望。", effects: { rep: -0.6, appr: -9, flags: ["crisis_desk_fail"] } }
        }
      },
      {
        id: "speech", text: "先讲话稳住市场与民心，具体调度交给副总统和一个下午就能补上的方案",
        base: 0.66, mods: [{ src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你那段没有提词器的讲话被循环播放，期货市场当天回稳。人们听出了安慰里带着办法。", effects: { rep: 0.45, appr: 4, voters: { warm: 700 } } },
          ok: { body: "讲话得体，市场安静下来。调度文件当晚也补齐了。", effects: { rep: 0.25, appr: 2 } },
          meh: { body: "话说得很漂亮，灾后清单出来后有人问：所以你那天到底做了什么。", effects: { rep: 0.1, appr: -1 } },
          fail: { body: "你把一个州的县名念错了，当地议员当晚要求你道歉。", effects: { rep: -0.15, appr: -4 } },
          critfail: { body: "讲话播出四小时后堤段溃决，那句「一切都在掌控中」成了全年最响的引号。", effects: { rep: -0.5, appr: -8, hp: -0.3 } }
        }
      }
    ]
  },

  {
    id: "wh_recall", grade: "mid", category: "crisis", valence: "risk",
    wh: true, whFamily: "crisis", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "internet"],
    brief: {
      lede: "一批冷冻食品查出致病菌，两家厂供着全国十九个州的货架。",
      known: [
        "全面召回要白宫自己掏钱补市场，代价当场可见。",
        "只限受影响州能少赔，但一旦外溢，责任就变成你知情不报。",
        "实验室还有一项复核没出结果——等三天是最省钱也最危险的一条路。"
      ]
    },
    title: "十九个州的货架，和一份没复核完的化验单",
    body: "食品监管局局长把两份草案放在你桌上：全国召回，或者仅限已发病的四个州。三家代理商已经请律师放话要告到底；两家报纸嗅到了味道，正在问为什么现在才说。实验室最后一项复核要三天。",
    choices: [
      {
        id: "full", text: "全国召回，并让你上电视说明为什么这么贵也要做",
        base: 0.5, mods: [{ src: "approval", w: 0.25 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "没有第二个病例。反对派想说的「过度反应」说不出口——你在镜头里把那条推演讲完了。", effects: { rep: 0.5, appr: 4, fac: { base: 6 } } },
          ok: { body: "货架清空，赔偿诉讼照来，但没人能在国会指着病例数说话。", effects: { rep: 0.3, appr: 2 } },
          meh: { body: "行业骂你过界，公众记不住这件事。一周后没人再提。", effects: { rep: 0.05, appr: -0.5 } },
          fail: { body: "召回执行乱了两个州，超市老板在地方台说：白宫连表都发不齐。", effects: { rep: -0.2, appr: -3 } },
          critfail: { body: "复核结果证明这批货是安全的。你为一条误报赔了整季预算，还教会对手一句新台词。", effects: { rep: -0.4, appr: -6 } }
        }
      },
      {
        id: "narrow", text: "只召回已发病四州，联邦监管资源投向那两条产线",
        base: 0.66, mods: [{ src: "attr", key: "INT", w: 0.25 }],
        outcomes: {
          crit: { body: "外溢被堵住了。十五个州的消费者不知道自己躲过了什么，你也不需要他们知道。", effects: { rep: 0.25, appr: 1.5 } },
          ok: { body: "范围控制住了，钱也省下了。只有两位众议员坚持要一份完整评估。", effects: { rep: 0.15, appr: 0.5 } },
          meh: { body: "两周后第五个州报告病例。数字很小，但正好砸在「你当时为什么不扩」的问句上。", effects: { rep: -0.05, appr: -2 } },
          fail: { body: "第六、第七个州同时报告。地方官员接受采访：我们向白宫反映过。", effects: { rep: -0.3, appr: -5, flags: ["recall_held"] } },
          critfail: { body: "一位母亲在听证会上出示你四州决定的备忘录复印件。你全程起立听着，一句辩解都没能说出口。", effects: { rep: -0.6, appr: -8, hp: -0.4, flags: ["recall_held"] } }
        }
      },
      {
        id: "wait", text: "等三天复核结果，期间不宣布任何事",
        base: 0.7, mods: [{ src: "attr", key: "CUN", w: 0.2 }],
        outcomes: {
          crit: { body: "复核证明误报，两家厂保住一整季订单。老板们记得是谁让他们少开一次记者会。", effects: { rep: 0.15, appr: 1, fac: { commercial: 6 } } },
          ok: { body: "三天后你按结果办事，程序上无可指摘。没人觉得这是你的功劳。", effects: { rep: 0.05, appr: 0 } },
          meh: { body: "复核期间又多了一例。人们开始问这三天你在等什么。", effects: { rep: -0.05, appr: -2 } },
          fail: { body: "报纸拿到了实验室的初报。标题问：总统知道的那三天。", effects: { rep: -0.25, appr: -4, flags: ["recall_held"] } },
          critfail: { body: "三天里死了两个人，而初报早就写清是同一批次。这句话以后会在每一个你需要的场合被念出来。", effects: { rep: -0.5, appr: -7, hp: -0.3, flags: ["recall_held"] } }
        }
      }
    ]
  },

  /* ================= 立法族 ================= */
  {
    id: "wh_bill", grade: "major", category: "political", valence: "risk",
    wh: true, whFamily: "legislation", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "cable"],
    brief: {
      lede: "你的旗舰法案卡在参院，差七票。多数党领袖说：只有你亲自去谈才谈得动。",
      known: [
        "逐人谈判要总统本人出席，一次两小时，七个人要一整个月。",
        "让领袖代谈更快，但条款会被他改成他的版本。",
        "走行政令绕开国会立刻见效，代价是此后每一任都被拿它跟你比。"
      ]
    },
    title: "差七票：一整个月的晚餐，或者一份别人起草的妥协",
    body: "法案在委员会过了，参院还差七票。多数党领袖给了三条路：你在玫瑰园请那七位参议员一个个吃饭；他替你谈，条款归他定；或者你签行政令，把这件事先做起来，让国会以后自己追。记者已经在猜第一条路你会不会走。",
    choices: [
      {
        id: "handshake", text: "一个个谈：七场晚餐，每一场让一步，你亲自签字的那份版本",
        base: 0.4, mods: [{ src: "approval", w: 0.35 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "七票全到，而且有一位是公开替你数落自己党内反对派的。法案带着你的名字过了。", effects: { rep: 0.9, appr: 6, fac: { establishment: 10 }, score: 0.4 } },
          ok: { body: "六票到手，第七票在最后关头倒过来。条款软了三分之一，但它是活的。", effects: { rep: 0.55, appr: 3, fac: { establishment: 5 } } },
          meh: { body: "一个月过去，只有四个人愿签。你把剩下的留给下一年会期。", effects: { rep: 0.1, appr: -1.5 } },
          fail: { body: "一位参议员把你们的晚餐内容讲给了电台，还讲了你愿意交换的那部分。", effects: { rep: -0.35, appr: -5, fac: { establishment: -5 } } },
          critfail: { body: "七场晚餐换来六份拒绝，其中一份上了报纸头条：总统在私下求我。你的立法年结束了。", effects: { rep: -0.75, appr: -9, hp: -0.4 } }
        }
      },
      {
        id: "leader", text: "交给多数党领袖去谈，你要通过就行，不管通过的是哪一版",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.25 }],
        outcomes: {
          crit: { body: "领袖比你还想要这场胜利，条款改动都朝你有利的方向来。", effects: { rep: 0.4, appr: 2.5, fac: { establishment: 8 } } },
          ok: { body: "法案过了，名字还在，只是有三条核心条款换成了他的笔迹。", effects: { rep: 0.25, appr: 1, fac: { establishment: 5 } } },
          meh: { body: "过了一个空壳。签字仪式上你念的那段，有一半是对手写的。", effects: { rep: 0.05, appr: -1 } },
          fail: { body: "领袖要价太高，最后他把责任推给你：是总统不肯让步。", effects: { rep: -0.25, appr: -4, fac: { establishment: -8 } } },
          critfail: { body: "他的版本被自己党内否了，两党同时说：白宫连自己人都指挥不动。", effects: { rep: -0.5, appr: -7 } }
        }
      },
      {
        id: "order", text: "不吵了，明天签行政令先把事做起来",
        base: 0.58, mods: [{ src: "approval", w: 0.2 }],
        outcomes: {
          crit: { body: "钱当季度就下去了，国会追在后面补立法。以后人们只记得是你先干成的。", effects: { rep: 0.6, appr: 4, voters: { warm: 800 } } },
          ok: { body: "事情启动了，律师团也启动了。至少一半条款守得住。", effects: { rep: 0.3, appr: 1.5 } },
          meh: { body: "法院发出禁令，行政令停在纸上。你说这叫过渡，记者说这叫越权。", effects: { rep: 0, appr: -2 } },
          fail: { body: "两党罕见地在同一份声明里联手，指控你把立法权搬进了椭圆办公室。", effects: { rep: -0.3, appr: -5, fac: { establishment: -6 } } },
          critfail: { body: "禁令之外，参院开始用程序卡你所有任命。此后两年你只签得动备忘录。", effects: { rep: -0.55, appr: -8, flags: ["order_backlash"] } }
        }
      }
    ]
  },

  {
    id: "wh_shutdown", grade: "mid", category: "political", valence: "bane",
    wh: true, whFamily: "legislation", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "cable"],
    brief: {
      lede: "预算授权到期只剩三十六小时，两党都觉得自己不会先眨眼。",
      known: [
        "接受对方那笔附加条款，政府开门，但那笔钱以后年年要还。",
        "硬扛关门会省下这笔钱，代价由国家公园和联邦雇员替你付。",
        "让幕僚长连夜去谈是唯一可能两头都不赔的路——也是最容易谈崩的路。"
      ]
    },
    title: "预算到期夜：三十六小时和三份草稿",
    body: "拨款法案在众院过了，参院按自己的版本退了回来，两版之间只差那一笔附加条款。预算授权三十六小时后到期。国家动物园的饲养员已经在问下个月工资从哪儿发，而两党党鞭都说：先眨眼的是你们。",
    choices: [
      {
        id: "sign", text: "接受那笔附加条款，先把门打开",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.25 }],
        outcomes: {
          crit: { body: "门开了，条款被你重新解释成自己的胜利。第二天没有一篇报道说白宫让步了。", effects: { rep: 0.35, appr: 2 } },
          ok: { body: "签字之后你说这是「为联邦雇员负责」，多数人就信了。条款留在法条里。", effects: { rep: 0.2, appr: 0.5 } },
          meh: { body: "开门了，也挨了自家党的骂。他们说：明年这笔要还两遍。", effects: { rep: 0, appr: -2 } },
          fail: { body: "对手把条款原文做成六页广告。你自己党内开始有人念那六页。", effects: { rep: -0.2, appr: -4, fac: { establishment: -5 } } },
          critfail: { body: "附加条款第二年被写进对手的连任广告，而你已经没有第二次机会解释。关门成了你的标签。", effects: { rep: -0.4, appr: -6, flags: ["shutdown_blamed"] } }
        }
      },
      {
        id: "hold", text: "不签。让关门发生，让全国看见是谁把门关上",
        base: 0.35, mods: [{ src: "approval", w: -0.3 }],
        outcomes: {
          crit: { body: "关门十一天，对手党内先撑不住。回来说「我们重新谈谈那笔条款」——是他们的电话。", effects: { rep: 0.6, appr: 3, fac: { base: 5 } } },
          ok: { body: "关门三天后双方各让半步，条款删了一半。你说这叫守住了原则。", effects: { rep: 0.25, appr: 0.5 } },
          meh: { body: "关门七天。公园关着，士兵照常执勤领不到钱，照片上你站在白宫阳台上。", effects: { rep: -0.1, appr: -4 } },
          fail: { body: "关门十九天，联邦承包商开始上门讨薪。两台摄像机在白宫门口等你的车。", effects: { rep: -0.35, appr: -7, hp: -0.3, flags: ["shutdown_blamed"] } },
          critfail: { body: "关门三十一天，一位护士在听证会上把「总统说这是必要的代价」念了三遍。你的支持率从此没回过中线。", effects: { rep: -0.7, appr: -11, flags: ["shutdown_blamed"] } }
        }
      },
      {
        id: "chief", text: "把幕僚长叫醒，让他在国务院宴会厅的灯光下谈一整夜",
        base: 0.55, mods: [{ src: "approval", w: 0.2 }, { src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "天亮时谈成一份双方都能对自己人宣布胜利的草稿。附加条款换成一个五年后自动失效的窗口。", effects: { rep: 0.5, appr: 4, fac: { establishment: 6 } } },
          ok: { body: "半夜三点谈成一半，天亮前补齐。开门，没人觉得白宫丢脸。", effects: { rep: 0.3, appr: 2 } },
          meh: { body: "谈了十小时只剩一份「继续谈」的联合声明。期限到了，门还是关上两天。", effects: { rep: 0, appr: -2.5 } },
          fail: { body: "幕僚长和党鞭在镜头前吵了起来，第二天新闻讲的是白宫不会说话。", effects: { rep: -0.25, appr: -5 } },
          critfail: { body: "谈崩了，而崩的那一段被走廊话筒录了下来。关门一个月，录音完整版在每一个候选人的广告里。", effects: { rep: -0.55, appr: -9, hp: -0.3, flags: ["shutdown_blamed"] } }
        }
      }
    ]
  },

  /* ================= 外交族 ================= */
  {
    id: "wh_hotline", grade: "major", category: "foreign", valence: "bane",
    wh: true, whFamily: "foreign", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "cable"],
    brief: {
      lede: "对手国家的核潜艇离开母港，没有按惯例通报。热线在你手上。",
      known: [
        "直接通话最快，但一次误判的通话比一次沉默更贵。",
        "先要情报核实会多花六小时，也可能错过那六小时。",
        "公开谴责能让盟友安心，也把对方逼到必须公开回答。"
      ]
    },
    title: "没有通报的核潜艇，和一条热线",
    body: "凌晨两点四十，国防部长报告：对方一支弹道导弹潜艇编队离港，未走通报渠道。卫星图像有两种解释——例行轮换，或者一次前推。参联会建议把戒备升一级；情报局长建议再等六小时；而莫斯科那条红色的线就在你桌上，接通要三分钟。",
    choices: [
      {
        id: "call", text: "接通：你要在十分钟内跟对方元首本人说话",
        base: 0.4, mods: [{ src: "approval", w: 0.3 }],
        outcomes: {
          crit: { body: "对方用带着睡意的声音告诉你那是轮换，随后主动报出舷号。七天后的联合通报让全世界都松了口气。", effects: { rep: 0.8, appr: 6, fac: { establishment: 6 }, voters: { warm: 1200 } } },
          ok: { body: "通话没有解决问题，但双方都听见了彼此的声音。升级被推迟了三天，够了。", effects: { rep: 0.4, appr: 2.5 } },
          meh: { body: "对方只肯让外交部长接。你得到的回答像新闻稿，谁也没让步。", effects: { rep: 0.1, appr: -1 } },
          fail: { body: "你在镜头之外说了重话，第二天对方把原话念了出来。全世界看到两位元首在吵架。", effects: { rep: -0.4, appr: -6, flags: ["hotline_leak"] } },
          critfail: { body: "通话进行到第八分钟，对方的雷达上出现了我方一架偏离航线的巡逻机。那十六分钟没有人睡得着——事后查明是虚警。", effects: { rep: -0.7, appr: -9, hp: -0.5, flags: ["hotline_leak"] } }
        }
      },
      {
        id: "intel", text: "先等六小时把图像核清楚——不为一支可能回家的潜艇赌上全局",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "六小时后确认是轮换。你用这份核实过的判断压住了升级声，参联会照你的口径发声明。", effects: { rep: 0.45, appr: 3, fac: { establishment: 5 } } },
          ok: { body: "确认是训练调整，虚惊一场。只是那六小时你几乎没坐。", effects: { rep: 0.25, appr: 1 } },
          meh: { body: "六小时里市场跌了一格，媒体开始问白宫知不知道。你选了沉默。", effects: { rep: 0, appr: -2.5 } },
          fail: { body: "第八小时对方做了一次公开试射。人们问：那六小时你在等什么。", effects: { rep: -0.3, appr: -5 } },
          critfail: { body: "核清楚的结果来得太晚：那支编队已在对方境内。升级却已经启动，两个航母战斗群按老规矩进了射程。", effects: { rep: -0.6, appr: -8, hp: -0.4 } }
        }
      },
      {
        id: "public", text: "公开喊话：48 小时内不解释，就把这件事写进联合国发言稿",
        base: 0.5, mods: [{ src: "approval", w: 0.25 }],
        outcomes: {
          crit: { body: "对方为避免摊牌，二十四小时内自己发了通报。盟友在记者会上感谢你「把话说明白」。", effects: { rep: 0.5, appr: 4, fac: { base: 5 } } },
          ok: { body: "通报来了，语气难看，但事情过去了。国内说你的强硬起了作用。", effects: { rep: 0.3, appr: 2 } },
          meh: { body: "对方不接。你的发言稿也发出去了，事情从此挂着。", effects: { rep: 0.05, appr: -1.5 } },
          fail: { body: "对方在联合国当场反驳你的措辞，盟友代表在走廊里问：这个稿子谁给你们看的。", effects: { rep: -0.25, appr: -4 } },
          critfail: { body: "公开对抗换来对方一周的沉默与一次更远的推进。市场跌了两天，你被自己人要求「解释战略」。", effects: { rep: -0.5, appr: -7, flags: ["hotline_public"] } }
        }
      }
    ]
  },

  {
    id: "wh_summit", grade: "mid", category: "foreign", valence: "boon",
    wh: true, whFamily: "foreign", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "internet"],
    brief: {
      lede: "首次外访：红毯已经铺好，而真正谈的事还没谈完。",
      known: [
        "签一份象征性联合声明，红毯照片立刻有了，实质留给下次。",
        "顶住礼宾节奏谈实质条款，可能当天带不回任何东西。",
        "去一趟当地的学校或医院，舆论收益最快，也最容易被说成作秀。"
      ]
    },
    title: "红毯之外，还有一张没谈完的渔业协定",
    body: "专机落地时礼兵已经列队。东道国的外交部长私下提醒你：谈判桌上还剩两条硬条款，主人希望你先出席已公布的仪式。你的行程表上有三个空格，而国内媒体只在等一句「成果」。",
    choices: [
      {
        id: "substance", text: "把仪式推迟一小时，先坐下来把那两条谈完",
        base: 0.45, mods: [{ src: "approval", w: 0.3 }, { src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "两条里谈定一条半，联合声明的措辞因此硬了三分。回国听证会上，两党都承认这是几年里最实的一次外访。", effects: { rep: 0.7, appr: 5, fac: { establishment: 6 }, score: 0.3 } },
          ok: { body: "你带回一份带附件的协议。红毯照片少了半小时，没人抱怨。", effects: { rep: 0.4, appr: 2.5 } },
          meh: { body: "谈了很久，只谈出一份「继续磋商」。主人礼貌，记者无题。", effects: { rep: 0.1, appr: 0 } },
          fail: { body: "推迟一小时让主人当众丢了面子，联合声明里那句话被删了。", effects: { rep: -0.15, appr: -2 } },
          critfail: { body: "谈崩了。你带回来的只有一句「双方坦率交换了意见」，而这句话在本国意思是：什么也没谈成。", effects: { rep: -0.3, appr: -4 } }
        }
      },
      {
        id: "symbol", text: "按礼宾走完，签那份象征性联合声明——先让同盟看起来结实",
        base: 0.68, mods: [{ src: "approval", w: 0.2 }],
        outcomes: {
          crit: { body: "声明措辞温和，但两张并肩的照片值回整个行程。国内社论第一次用了「稳」。", effects: { rep: 0.4, appr: 3.5, voters: { warm: 600 } } },
          ok: { body: "仪式顺利，新闻里有你也有主人。实质条款留到下次。", effects: { rep: 0.25, appr: 2 } },
          meh: { body: "照片很美，内容很薄。一周后人们开始问：所以你到底谈成了什么。", effects: { rep: 0.1, appr: 0 } },
          fail: { body: "有记者翻出声明里被删掉的那段，问题变成：你为什么同意删。", effects: { rep: 0, appr: -1.5 } },
          critfail: { body: "签字仪式后两小时，对方国内反转了声明里唯一那句实质承诺。你的照片变成了笑话的那半页。", effects: { rep: -0.25, appr: -3.5 } }
        }
      },
      {
        id: "visit", text: "行程里插一站当地的儿童医院，让孩子讲话比你长",
        base: 0.7, mods: [{ src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "那段视频里你没有说话，只是听着。回国后它在竞选中被引用了很多次。", effects: { rep: 0.45, appr: 4, fac: { base: 5 }, voters: { warm: 800 } } },
          ok: { body: "访问温暖、体面、没有争议。东道国也乐意让人看见这一幕。", effects: { rep: 0.3, appr: 2 } },
          meh: { body: "场面很好，只是人们看完就忘了这是哪一天。", effects: { rep: 0.15, appr: 0.5 } },
          fail: { body: "礼宾临时清了场，你到的时候只剩一群工作人员。镜头把那一刻拍得很清楚。", effects: { rep: 0, appr: -1.5 } },
          critfail: { body: "随行记者问了一个孩子的问题：「你在国内为什么不做同样的事？」这段剪成了三十秒。", effects: { rep: -0.15, appr: -3 } }
        }
      }
    ]
  },

  /* ================= 人事族 ================= */
  {
    id: "wh_cabinet", grade: "mid", category: "career", valence: "risk",
    wh: true, whFamily: "personnel", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "internet"],
    brief: {
      lede: "国防部长突然辞职，四十八小时内你要给出一个名字。",
      known: [
        "提自己人：他听你的，但听证会上他的每一次口误都算你的。",
        "提一位老将：建制满意，代价是他此后有自己的票仓。",
        "让幕僚长先拖着——省一次决定，也省不掉那把空椅子。"
      ]
    },
    title: "四十八小时和一个名字",
    body: "辞呈只有一行字，理由写「个人原因」，而新闻已经猜到是上周那场预算争吵。参院军事委员会主席打电话来问：明天上午能不能听到名字？你桌上有两个人选：一位是跟着你八年的竞选幕僚长，从没进过五角大楼；一位是退役四星上将，党内人人都尊敬他。",
    choices: [
      {
        id: "loyal", text: "提自己人：这个位置必须听得懂你在说什么",
        base: 0.4, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "听证会上他答不上技术题，却把「文官控制军队」那段讲得让两位老参议员点了头。", effects: { rep: 0.4, appr: 3, fac: { establishment: 4 } } },
          ok: { body: "以微弱多数过了。此后两年他从不自己在外面拿主意。", effects: { rep: 0.2, appr: 1.5 } },
          meh: { body: "过了，但五角大楼的将军们学会绕过他直接找白宫办公厅。", effects: { rep: 0, appr: -1 } },
          fail: { body: "他在听证会上把一次演说的规模说错两个数量级，视频循环播放。你撤回了提名。", effects: { rep: -0.35, appr: -5 } },
          critfail: { body: "委员会罕见地 unanimous 反对。你连着丢了两个人事，报纸说白宫的忠诚成本正在上升。", effects: { rep: -0.6, appr: -8, flags: ["cabinet_stall"] } }
        }
      },
      {
        id: "general", text: "提那位老将：让建制满意，让军队闭嘴",
        base: 0.65, mods: [{ src: "approval", w: 0.2 }],
        outcomes: {
          crit: { body: "听证会像一场授勋仪式。他在第一次国安会上就替你压住了一个难缠的盟友。", effects: { rep: 0.5, appr: 3.5, fac: { establishment: 10 } } },
          ok: { body: "轻松过关，五角大楼安静下来。只是他的意见从此有了自己的听众。", effects: { rep: 0.3, appr: 2, fac: { establishment: 6 } } },
          meh: { body: "过了。三个月后他在电视上公开不同意你的一项政策，语气很客气。", effects: { rep: 0.1, appr: -1.5, fac: { establishment: 3 } } },
          fail: { body: "一次听证会上的旧账被翻出来：他任内的两场审计。他的支持者们开始保持距离。", effects: { rep: -0.25, appr: -4 } },
          critfail: { body: "他过不了关，还顺手在记者会上说：有些决定不该由白宫来做。你被自己提名的人公开告了一状。", effects: { rep: -0.55, appr: -7, flags: ["cabinet_stall"] } }
        }
      },
      {
        id: "delay", text: "先让副手代理，名字推到国情咨文之后再定",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "代理的人稳住了预算与演训，人们几周后就不再讨论这件事。", effects: { rep: 0.15, appr: 1 } },
          ok: { body: "空缺被程序填满，没有人出大事。只是每个记者都记住了「还没定」。", effects: { rep: 0.05, appr: 0 } },
          meh: { body: "两个月后还在代理。一位参议员公开问：总统是不敢定，还是没定。", effects: { rep: -0.05, appr: -2 } },
          fail: { body: "一次边境事件里代理者没有授权，四十八小时没人拍板。新闻里那把空椅子比任何讲话都响。", effects: { rep: -0.3, appr: -5, flags: ["cabinet_stall"] } },
          critfail: { body: "两次误判之后，军方开始直接找国会要指引。报纸的标题写：白宫没有国防部长已经一百二十天。", effects: { rep: -0.5, appr: -7, flags: ["cabinet_stall"] } }
        }
      }
    ]
  },

  {
    id: "wh_scoop", grade: "mid", category: "career", valence: "bane",
    wh: true, whFamily: "personnel", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "cable"],
    brief: {
      lede: "大报总编约你在深夜的俱乐部喝茶：他要一段关于你班底的独家。",
      known: [
        "冻结接触最安全，但「总统拒绝回应」本身就是一种答案。",
        "上自己的节目摊牌能把节奏抓回来，也把家里那点事公开。",
        "递一份替罪的草稿能灭火一周，代价是诚信账上的那一笔。"
      ]
    },
    title: "总编约你喝茶，桌上是一份你见过的名单",
    body: "他推过来一杯茶，然后说：我们有一个人的名字，他承认了拿总统府的关系谈过两笔生意；稿子下周三见报。他想要的不是许可，是一段你的话——你可以说「我不认识这个人」，也可以说别的。窗外两位摄影记者已经在等你的车出来。",
    choices: [
      {
        id: "deny", text: "不回应，也不许任何人事前知道这件事",
        base: 0.38, mods: [{ src: "approval", w: -0.25 }],
        outcomes: {
          crit: { body: "稿子发出来时没有新料，只有一句「白宫拒绝回应」。三天后人们谈的是别的事。", effects: { rep: 0.2, appr: 1 } },
          ok: { body: "稿子按流程发了，白得没有水分。你的沉默被写成「无可奉告的稳妥」。", effects: { rep: 0.05, appr: -1 } },
          meh: { body: "稿子发出，第二周还有第二篇：因为你什么也没说，编辑部认为还有东西。", effects: { rep: -0.1, appr: -3 } },
          fail: { body: "第二篇里有你当夜进俱乐部的时间戳。「拒绝回应」变成了「他在场」。", effects: { rep: -0.35, appr: -6, flags: ["scoop_denied"] } },
          critfail: { body: "他们把两份材料并排印在同一版：你说从未谈过这件事，而总编的记事本上有那杯茶的时间。此后半年每一次发布会都有人念这句话。", effects: { rep: -0.65, appr: -9, flags: ["scoop_denied", "press_enemy"] } }
        }
      },
      {
        id: "onside", text: "自己上节目讲清楚：名字、事实、你处理到哪一步",
        base: 0.42, mods: [{ src: "approval", w: 0.3 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "你把已知的说完，也把还不知道的说完。第二天没有一家报纸能印出比你更多的信息。", effects: { rep: 0.55, appr: 5, fac: { base: 5, press: -3 } } },
          ok: { body: "节目收视很高，故事被你带走了。总编当晚同意第二天只写「总统已说明」。", effects: { rep: 0.3, appr: 2.5, fac: { press: -2 } } },
          meh: { body: "你讲了两千天，记者们只剪出你说「我不知道」的那八秒。", effects: { rep: 0.05, appr: -1.5 } },
          fail: { body: "主播在你自己的节目上追问出一个你没准备好的细节。第二天细节成了标题。", effects: { rep: -0.3, appr: -5 } },
          critfail: { body: "直播里你答错了两个人名与两个日期，事后每条都被事实核查列出来。报纸仍然发了稿，而它现在有了你的口误做引子。", effects: { rep: -0.55, appr: -8, hp: -0.3, flags: ["scoop_livefail"] } }
        }
      },
      {
        id: "sacrifice", text: "让那位幕僚先走，并「恰好」有人向报社解释是谁的决定",
        base: 0.66, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "稿子当晚改写成一份人事新闻。总编得到他要的名字，你保住你要的那一周。", effects: { rep: 0.2, appr: 2, fac: { press: 4 } } },
          ok: { body: "火压下去了。跟了你八年的人第二天上了飞机，没有来告别。", effects: { rep: 0.05, appr: 0.5, flags: ["used_fuse"] } },
          meh: { body: "一周内没人再提，两周后有人在听证会上把那个名字又念了一遍：是你让他走的吗。", effects: { rep: -0.05, appr: -2 } },
          fail: { body: "被送走的人在离开前接受了采访，讲了三个你也在场的细节。", effects: { rep: -0.3, appr: -5, flags: ["used_fuse"] } },
          critfail: { body: "他带着录音来了。报纸把「白宫需要一个替罪的人」这句话印在头版，署他的名。", effects: { rep: -0.6, appr: -8, flags: ["used_fuse", "press_enemy"] } }
        }
      }
    ]
  }
]);
