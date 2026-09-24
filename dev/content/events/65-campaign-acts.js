/* ============================================================================
 * CONTENT · events/65-campaign-acts.js
 * 「竞选各幕」—— 61-campaigns.js 的竞选链里、投票日之前那一幕一幕的事件。
 *
 * 每张卡都是竞选流程里的一环：宣布 → 初选 → 造势/筹款/辩论 → 摇摆 →（末幕复用
 * 60-progression.js 的 prog_* 作为投票日）。这些卡**不作为普通卡池被随机抽到**——
 * 引擎 campaign.js 把它们锁定，只在它们正是"当前幕"时强制演出（见 engine/campaign.js）。
 *
 * 选情撬动：outcomes.effects 里写 `camp:{momentum:±x, warchest:±y}`，把这一幕的成败
 * 直接落到当前竞选的选情表上；campaignTick 的 abortBelow 闸据此判"中途崩盘"。
 * 与三值性契约：这些都是 risk（有输有赢、可搞砸）；量级 mid（比小事有分量，不是大事件）。
 * tierRaw + tierMin/tierMax 钉在本场竞选的起跳级上（与对应 prog_* 同调）。
 * ==========================================================================*/

POTUS.define("event", [

  /* ========================= 等级1：地方公职（council）========================= */
  {
    id: "camp_council_announce", brief: { lede: "第一次参选：交押金、凑签名、也要公开申报。", known: ["你还没什么名气，但选区小，认脸就能拉开差距。", "报名要够有效签名，漏一项就上不了选票。", "高调宣布赌人气，挨家摸底赌稳妥。"], unknown: ["开场若草率，会被当成凑数的候选人。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 0, tierMax: 0, weight: 1,
    title: "宣布：把名字放上选票",
    body: "报名要交押金、要凑够有效签名、要公开财务申报。你要么正式迈出这一步，要么先摸清水有多深。",
    choices: [
      {
        id: "go_public", text: "在社区集会上正式宣布参选", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.5 }],
        outcomes: {
          crit: { body: "你讲得台下直点头，签名当天就凑够了，邻居开始记住你的名字。", effects: { rep: 2, fac: { base: 6 }, camp: { momentum: 12 } } },
          ok: { body: "宣布顺利，报名表交了上去。", effects: { rep: 1, camp: { momentum: 7 } } },
          meh: { body: "来了几个人，掌声不多，但你把该办的手续办了。", effects: { camp: { momentum: 2 } } },
          fail: { body: "到场的人寥寥，签名还差一截。", effects: { rep: -1, camp: { momentum: -6 } } },
          critfail: { body: "你结结巴巴，还有人当场质疑你的财务申报。", effects: { rep: -2, fac: { base: -6 }, camp: { momentum: -12 } } }
        }
      },
      {
        id: "quiet_start", text: "先挨家挨户摸底，暂不声张", base: 0.55,
        mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你悄悄走访了半条街，摸清了谁支持谁反对，底子扎实。", effects: { rep: 1, fac: { base: 4 }, camp: { momentum: 9 } } },
          ok: { body: "你收集了不少真实意见，为正式开跑打好了底。", effects: { camp: { momentum: 6 } } },
          meh: { body: "有人客套，有人关门，你还在试探。", effects: { camp: { momentum: 2 } } },
          fail: { body: "邻居们警惕地问你'你到底想干嘛'。", effects: { camp: { momentum: -4 } } },
          critfail: { body: "摸底的事传了出去，被说成'鬼鬼祟祟拉票'。", effects: { rep: -1.5, camp: { momentum: -9 } } }
        }
      }
    ]
  },
  {
    id: "camp_council_grassroots", brief: { lede: "地方选举投票率极低，跑腿就能定胜负。", known: ["几千张被动员的票就够决定结果。", "你有时间和双腿，缺的是曝光和钱。", "教会社团的场子能一次见一批人。"], unknown: ["只守不攻，热度会悄悄流失。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 0, tierMax: 0, weight: 1,
    title: "挨家挨户",
    body: "地方选举投票率低得惊人，一小撮被动员起来的人就能决定结果。你的竞选现在靠双腿。",
    choices: [
      {
        id: "doorknock", text: "整周敲门，一家一家聊", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.5 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你把一条街都聊成了朋友，义举上门的选民答应帮你拉票。", effects: { rep: 2, fac: { base: 8 }, camp: { momentum: 14 } } },
          ok: { body: "支持者慢慢攒起来了，你的名字不再是陌生人。", effects: { rep: 1, fac: { base: 4 }, camp: { momentum: 8 } } },
          meh: { body: "吃了很多闭门羹，但总算见了人。", effects: { camp: { momentum: 3 } } },
          fail: { body: "嗓子喊哑，收效寥寥。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "你累垮了，还被投诉骚扰住户。", effects: { rep: -1.5, camp: { momentum: -12 } } }
        }
      },
      {
        id: "church_group", text: "借教会和社团的场子讲话", base: 0.5,
        mods: [{ src: "fac", key: "base", w: 0.5 }],
        outcomes: {
          crit: { body: "社群领袖当场为你背书，一屋子人成了你的票仓。", effects: { rep: 2, fac: { base: 10 }, camp: { momentum: 13 } } },
          ok: { body: "你在几个场合混了个脸熟。", effects: { fac: { base: 4 }, camp: { momentum: 7 } } },
          meh: { body: "有人听，没人表态。", effects: { camp: { momentum: 2 } } },
          fail: { body: "你说的话不讨这个圈子喜欢。", effects: { fac: { base: -4 }, camp: { momentum: -6 } } },
          critfail: { body: "你在错误的场合说错了话，社团集体冷脸。", effects: { rep: -2, fac: { base: -10 }, camp: { momentum: -12 } } }
        }
      },
      {
        id: "hold_steady", text: "不贪功，稳住现有支持者就好", base: 0.6,
        outcomes: {
          crit: { body: "你没冒险，却把该守住的人都守住了。", effects: { camp: { momentum: 5 } } },
          ok: { body: "阵脚稳当，选情不温不火地托住了。", effects: { camp: { momentum: 3 } } },
          meh: { body: "没进展，也没出事。", effects: { camp: { momentum: 1 } } },
          fail: { body: "太保守了，热度悄悄降了一点。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "四平八稳到近乎没存在感，选情小跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },

  /* ========================= 等级2：市议员（city）========================= */
  {
    id: "camp_city_announce", brief: { lede: "你要争一个真席位，对手是张老面孔。", known: ["现任干了多年，名字人人认识。", "正面硬碰赌声望，先组联盟赌根基。", "静观能避锋芒，却也可能错失先机。"], unknown: ["底牌亮太早，会被资深对手摸清。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 1, tierMax: 1, weight: 1,
    title: "签下参选表格",
    body: "这一次不是帮忙，是竞争一个真正的席位。对手可能干了很多年，名字人人认识。",
    choices: [
      {
        id: "challenge", text: "正面挑战现任者", base: 0.45,
        mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "你抓现任者一个薄弱议题穷追猛打，媒体开始把你们并列报道。", effects: { rep: 2, camp: { momentum: 12 } } },
          ok: { body: "你站稳了'认真的挑战者'这个位置。", effects: { rep: 1, camp: { momentum: 7 } } },
          meh: { body: "你还不够响，但没人敢小看你。", effects: { camp: { momentum: 3 } } },
          fail: { body: "现任者轻轻一挡，你就显出了资历的浅。", effects: { rep: -1, camp: { momentum: -6 } } },
          critfail: { body: "你的攻击被反将一军，倒显得你不成熟。", effects: { rep: -2, camp: { momentum: -12 } } }
        }
      },
      {
        id: "coalition", text: "先组建竞选团队与联盟", base: 0.55,
        mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "一批有头脸的人公开加入，你的竞选一夜之间像模像样。", effects: { rep: 2, fac: { base: 8 }, camp: { momentum: 12 } } },
          ok: { body: "团队搭起来了，机器开始转动。", effects: { camp: { momentum: 7 } } },
          meh: { body: "人手勉强凑齐，磨合还在继续。", effects: { camp: { momentum: 2 } } },
          fail: { body: "想请的人纷纷婉拒，团队单薄。", effects: { camp: { momentum: -5 } } },
          critfail: { body: "核心成员临阵倒戈去了对手那边。", effects: { rep: -1.5, fac: { base: -6 }, camp: { momentum: -11 } } }
        }
      },
      {
        id: "test_water", text: "先不亮底牌，静观对手动向", base: 0.6,
        outcomes: {
          crit: { body: "你沉住气，摸清了对方的路数，选情小涨。", effects: { camp: { momentum: 5 } } },
          ok: { body: "你按兵不动，稳住了基本盘。", effects: { camp: { momentum: 3 } } },
          meh: { body: "既没出手，也没露怯。", effects: { camp: { momentum: 1 } } },
          fail: { body: "太被动了，气势上先输半筹。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "你的犹豫被解读为心虚，选情微跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_city_townhall", brief: { lede: "第一次和对手同场，一问一答藏不住。", known: ["台下就是能投票的那批选民。", "讲政策求稳，抓把柄偏险，沉默无功无过。", "你比对手生涩，但也更显得新鲜。"], unknown: ["一句失言会被反复提起整场选战。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 1, tierMax: 1, weight: 1,
    title: "市政厅辩论会",
    body: "第一次和对手站在同一个屋檐下，面对同样一批选民。一问一答，藏不住也躲不掉。",
    choices: [
      {
        id: "substance", text: "用具体政策正面接招", base: 0.5,
        mods: [{ src: "attr", key: "INT", w: 0.55 }],
        outcomes: {
          crit: { body: "你把预算和分区讲得清清楚楚，现场掌声说明了一切。", effects: { rep: 2.5, camp: { momentum: 14 } } },
          ok: { body: "你应对得体，观众记住了你是'懂行的那个'。", effects: { rep: 1, camp: { momentum: 8 } } },
          meh: { body: "不温不火，没人挑你的错，也没人记住你。", effects: { camp: { momentum: 2 } } },
          fail: { body: "一个尖锐问题把你问住了，你含糊带过。", effects: { rep: -1, camp: { momentum: -6 } } },
          critfail: { body: "你被当场戳出一个事实错误，视频剪了出去。", effects: { rep: -2, camp: { momentum: -12 } } }
        }
      },
      {
        id: "attack", text: "抓对手的记录猛攻", base: 0.45,
        mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "你甩出一份对手不愿面对的材料，全场风向为之一变。", effects: { rep: 1.5, attr: { CUN: 2 }, camp: { momentum: 12 } } },
          ok: { body: "你打得对手连连招架。", effects: { attr: { CUN: 1 }, camp: { momentum: 7 } } },
          meh: { body: "攻击没打疼对方，也只显得公事公办。", effects: { camp: { momentum: 2 } } },
          fail: { body: "选民觉得你只会抹黑，皱起了眉头。", effects: { rep: -1.5, camp: { momentum: -7 } } },
          critfail: { body: "你的攻击被当场证伪，信誉扫地。", effects: { rep: -2.5, fac: { base: -6 }, camp: { momentum: -13 } } }
        }
      },
      {
        id: "listen_more", text: "少说多听，谁也不得罪", base: 0.6,
        outcomes: {
          crit: { body: "你虚心倾听的姿态反而赢得好感。", effects: { camp: { momentum: 5 } } },
          ok: { body: "你稳健应答，没留任何把柄。", effects: { camp: { momentum: 3 } } },
          meh: { body: "平庸但安全地过关。", effects: { camp: { momentum: 1 } } },
          fail: { body: "太圆滑，选民觉得你没立场。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "你全程打太极，现场气氛冷却。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },

  /* ========================= 等级3：州众议员（state）========================= */
  {
    id: "camp_state_announce", brief: { lede: "选区从一条街扩大到一个县。", known: ["你需要一台真正的竞选机器和启动资金。", "高调开跑抢话题，先攒钱稳底盘。", "名气和钱，这时开始变成硬门槛。"], unknown: ["摊子铺太大又没钱，机器会空转。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 2, tierMax: 2, weight: 1,
    title: "宣布竞选州议会",
    body: "选区从一条街扩大到一个县。你第一次需要一台真正的竞选机器，和一笔像样的启动资金。",
    choices: [
      {
        id: "big_bang", text: "召开发布会，高调开跑", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.5 }],
        outcomes: {
          crit: { body: "地方报纸头版，党内重量级人物站台，你一举进入视野。", effects: { rep: 2.5, camp: { momentum: 12 } } },
          ok: { body: "宣布到位，机器开始招募志愿者。", effects: { rep: 1, camp: { momentum: 7 } } },
          meh: { body: "发布会不算热闹，但把'我要选'这件事讲清楚了。", effects: { camp: { momentum: 3 } } },
          fail: { body: "宣布声量太小，像没发生过。", effects: { camp: { momentum: -5 } } },
          critfail: { body: "发布会出了岔子，记者写成了笑话。", effects: { rep: -2, camp: { momentum: -11 } } }
        }
      },
      {
        id: "ground_first", text: "先攒够钱和人再宣布", base: 0.55,
        mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你低调备好粮草，一宣布就火力全开。", effects: { camp: { momentum: 10, warchest: 8 } } },
          ok: { body: "启动资金和团队都齐了才露面。", effects: { camp: { momentum: 6, warchest: 4 } } },
          meh: { body: "筹备拖了些时间，但底子还行。", effects: { camp: { momentum: 2 } } },
          fail: { body: "钱没凑够，宣布一延再延。", effects: { camp: { momentum: -5, warchest: -4 } } },
          critfail: { body: "迟迟不宣布，被解读为'没胆参选'。", effects: { rep: -1.5, camp: { momentum: -10 } } }
        }
      }
    ]
  },
  {
    id: "camp_state_primary", brief: { lede: "第一场硬仗在党内，赢提名才有大选。", known: ["拿不到本党提名，你根本上不了选票。", "动员基本盘赌人气，争取建制赌资源。", "不站队能两边不得罪，也可能两头不讨好。"], unknown: ["站错队，选后要在党内还债。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 2, tierMax: 2, weight: 1,
    title: "党内初选",
    body: "真正的第一场硬仗在自己党内。赢得提名，才有资格出现在大选的选票上。",
    choices: [
      {
        id: "base_vote", text: "动员基本盘投票", base: 0.5,
        mods: [{ src: "fac", key: "base", w: 0.5 }, { src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你把支持者拧成一股绳，初选一役定音。", effects: { rep: 2, fac: { base: 8 }, camp: { momentum: 14 } } },
          ok: { body: "你在初选里胜出，拿下提名。", effects: { rep: 1, camp: { momentum: 8 } } },
          meh: { body: "你险胜，党内并不团结。", effects: { camp: { momentum: 3 } } },
          fail: { body: "初选打得很吃力，你几乎丢掉提名。", effects: { fac: { base: -5 }, camp: { momentum: -7 } } },
          critfail: { body: "初选惨败，党内机器把你划成了'可牺牲的那个'。", effects: { rep: -2, fac: { base: -10 }, camp: { momentum: -14 } } }
        }
      },
      {
        id: "win_elites", text: "争取党内建制背书", base: 0.45,
        mods: [{ src: "fac", key: "establishment", w: 0.5 }],
        outcomes: {
          crit: { body: "党魁公开为你站台，初选对手知难而退。", effects: { rep: 1.5, fac: { establishment: 8 }, camp: { momentum: 12 } } },
          ok: { body: "你拿到了关键背书。", effects: { fac: { establishment: 4 }, camp: { momentum: 7 } } },
          meh: { body: "建制观望，你得自己拼。", effects: { camp: { momentum: 2 } } },
          fail: { body: "党不打算帮你，你被晾在一边。", effects: { fac: { establishment: -4 }, camp: { momentum: -6 } } },
          critfail: { body: "党宁可不推你，暗中扶持了别人。", effects: { fac: { establishment: -8 }, camp: { momentum: -12 } } }
        }
      },
      {
        id: "stay_neutral", text: "不站队，专心守住自己的基本盘", base: 0.6,
        outcomes: {
          crit: { body: "你不卷入派系斗争，反而把自家人凝聚得更紧。", effects: { camp: { momentum: 5 } } },
          ok: { body: "你不得罪任何一方，稳过初选。", effects: { camp: { momentum: 3 } } },
          meh: { body: "无功无过，热度维持原样。", effects: { camp: { momentum: 1 } } },
          fail: { body: "缺乏鲜明的姿态，存在感被稀释。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "两边都不买你的账，选情小跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_state_rally", brief: { lede: "大选前最后冲刺，每分注意力都要抢。", known: ["广告烧钱换曝光，拜票跑腿换人心。", "金库有限，火力怎么分是一笔账。", "适度造势能不透支，也不至于烧穿。"], unknown: ["透支或省过头，都会把势头漏掉。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 2, tierMax: 2, weight: 1,
    title: "选战造势",
    body: "大选前的最后冲刺。广告、集会、拜票——每一分注意力都要抢。",
    choices: [
      {
        id: "air_war", text: "买广告、打空中战", base: 0.5,
        mods: [{ src: "attr", key: "INT", w: 0.4 }],
        cost: { fun: 8000 },
        outcomes: {
          crit: { body: "广告精准打击，你的名字成了本选区的口头禅。", effects: { rep: 2, camp: { momentum: 13, warchest: -4 } } },
          ok: { body: "曝光稳步上涨，只是烧钱。", effects: { camp: { momentum: 7, warchest: -5 } } },
          meh: { body: "广告投出去了，水花不大。", effects: { camp: { momentum: 2, warchest: -6 } } },
          fail: { body: "钱花了，选民却没买账。", effects: { camp: { momentum: -5, warchest: -8 } } },
          critfail: { body: "广告拍砸了，反被对手拿来做反面素材。", effects: { rep: -2, camp: { momentum: -11, warchest: -10 } } }
        }
      },
      {
        id: "boots", text: "不搞广告，全靠地面拜票", base: 0.55,
        mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你走遍了每个集镇，选民觉得你是'自己人'。", effects: { rep: 1.5, fac: { base: 6 }, camp: { momentum: 11 } } },
          ok: { body: "一步一个脚印，选情稳步向好。", effects: { camp: { momentum: 7 } } },
          meh: { body: "累但有效，热度慢慢攒起来。", effects: { camp: { momentum: 3 } } },
          fail: { body: "地面太拼，空中声量却被对手压住。", effects: { camp: { momentum: -5 } } },
          critfail: { body: "一场集会办砸，反被拍成负面话题。", effects: { rep: -1.5, camp: { momentum: -10 } } }
        }
      },
      {
        id: "measured", text: "量力办几场，不透支也不烧钱", base: 0.6,
        outcomes: {
          crit: { body: "节奏拿捏得当，队伍养足了精神。", effects: { camp: { momentum: 5 } } },
          ok: { body: "稳扎稳打，热度稳步托住。", effects: { camp: { momentum: 3 } } },
          meh: { body: "不温不火，安全收尾。", effects: { camp: { momentum: 1 } } },
          fail: { body: "声势偏保守，被对手的声量压过。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "太谨慎了，冲刺期几乎没动静。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },

  /* ========================= 等级4：州参议员（upper）========================= */
  {
    id: "camp_upper_announce", brief: { lede: "上院席位更少、盘子更大，位子将空。", known: ["一个现任即将离任，空位人人盯着。", "抢先定调赌先手，静观其变赌后劲。", "这一级的对手都更有分量。"], unknown: ["动作太慢，好位置会被别人先占。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 3, tierMax: 3, weight: 1,
    title: "瞄准参议院席位",
    body: "上半院席位更少、盘子更大。一个现任者即将离任，觊觎这个位置的人不止你一个。",
    choices: [
      {
        id: "early_mover", text: "抢先宣布，占住话题", base: 0.5,
        mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "你抢在所有人前面，成了'这个席位的默认人选'。", effects: { rep: 2, camp: { momentum: 12 } } },
          ok: { body: "先声夺人，你把议题定成了自己的。", effects: { rep: 1, camp: { momentum: 7 } } },
          meh: { body: "宣布得早，但也烧得早。", effects: { camp: { momentum: 3 } } },
          fail: { body: "抢先反而成了别人的靶子。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "你冲得太靠前，被集体围剿。", effects: { rep: -2, camp: { momentum: -12 } } }
        }
      },
      {
        id: "wait_read", text: "观望，等对手先亮牌", base: 0.55,
        mods: [{ src: "attr", key: "INT", w: 0.45 }],
        outcomes: {
          crit: { body: "你沉住气，等对手露出破绽才出手，一击到位。", effects: { rep: 1.5, camp: { momentum: 10 } } },
          ok: { body: "你后发制人，选好了角度再入场。", effects: { camp: { momentum: 6 } } },
          meh: { body: "等待让你看清了局势，却也慢了半拍。", effects: { camp: { momentum: 2 } } },
          fail: { body: "你等太久，好位置被抢先填满。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "整场竞选你都在追别人的议程。", effects: { rep: -1.5, camp: { momentum: -11 } } }
        }
      }
    ]
  },
  {
    id: "camp_upper_primary", brief: { lede: "一位资历更深的同党也想要这个席位。", known: ["初选是党内硬碰硬的对决。", "打新一代赌变革，讲资历赌稳妥。", "正面冲突伤和气，回避又难分高下。"], unknown: ["同党内耗，选后两边都难收场。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 3, tierMax: 3, weight: 1,
    title: "初选对决",
    body: "一位资历更深的同党也想要这个席位。初选是场硬碰硬。",
    choices: [
      {
        id: "contrast", text: "打出'新一代'的对比", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.5 }],
        outcomes: {
          crit: { body: "你把'变革'讲得动人，年轻选民倒向你。", effects: { rep: 2, camp: { momentum: 13 } } },
          ok: { body: "对比鲜明，你惊险出线。", effects: { camp: { momentum: 7 } } },
          meh: { body: "你守住了基本盘，代价是没扩大。", effects: { camp: { momentum: 3 } } },
          fail: { body: "'新一代'的牌没打好，反显你毛躁。", effects: { rep: -1, camp: { momentum: -7 } } },
          critfail: { body: "初选落败，资历深的对手笑到最后。", effects: { rep: -2, fac: { base: -6 }, camp: { momentum: -13 } } }
        }
      },
      {
        id: "establish", text: "强调资历与稳固", base: 0.5,
        mods: [{ src: "fac", key: "establishment", w: 0.5 }],
        outcomes: {
          crit: { body: "党内大佬齐挺'可靠的那个'，你稳进大选。", effects: { rep: 1.5, fac: { establishment: 6 }, camp: { momentum: 11 } } },
          ok: { body: "你以'不会出事'说服了初选选民。", effects: { camp: { momentum: 7 } } },
          meh: { body: "四平八稳，不出彩也不出错。", effects: { camp: { momentum: 2 } } },
          fail: { body: "喊资历听起来像守旧，你落后了。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "你被贴上了'既得利益'的标签。", effects: { rep: -2, fac: { establishment: -6 }, camp: { momentum: -12 } } }
        }
      },
      {
        id: "avoid_clash", text: "不正面冲突，稳住党内形象", base: 0.6,
        outcomes: {
          crit: { body: "你体面地回避了对轰，反显得更有格局。", effects: { camp: { momentum: 5 } } },
          ok: { body: "你不得罪人，平稳穿过初选。", effects: { camp: { momentum: 3 } } },
          meh: { body: "没打赢印象分，也没输。", effects: { camp: { momentum: 1 } } },
          fail: { body: "太软的打法让基本盘有点泄气。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "全程回避，你几乎从初选话题里消失。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_upper_rally", brief: { lede: "全州跑一圈，从东边工厂到西边郊区。", known: ["密集巡回赌体力与声量，打关键县赌效率。", "体能和消息传播都在考验你。", "全跑一遍不现实，选哪里就是选择。"], unknown: ["顾此失彼，会凉掉没去到的那一片。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 3, tierMax: 3, weight: 1,
    title: "巡回拉票",
    body: "全州跑一圈，从东部的工厂城镇到西部的郊区。体能和消息，都在考验你。",
    choices: [
      {
        id: "grind", text: "密集巡回，一天五场", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.4 }],
        outcomes: {
          crit: { body: "你的拼劲传为佳话，各地媒体轮着报道你。", effects: { rep: 2, camp: { momentum: 12 } } },
          ok: { body: "你跑遍了选区，选情稳步走高。", effects: { camp: { momentum: 7 } } },
          meh: { body: "累得够呛，效果平平。", effects: { camp: { momentum: 3 } } },
          fail: { body: "行程太满，你在两场活动里状态失守。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "你累倒在旅途中，缺席了关键一场辩论。", effects: { rep: -2, camp: { momentum: -12 } } }
        }
      },
      {
        id: "targeted", text: "只打关键县，好钢用在刀刃", base: 0.55,
        mods: [{ src: "attr", key: "INT", w: 0.5 }],
        outcomes: {
          crit: { body: "你把资源全砸在摇摆县，效率惊人。", effects: { rep: 1.5, camp: { momentum: 11 } } },
          ok: { body: "重点突破，你在关键地区拉开差距。", effects: { camp: { momentum: 7 } } },
          meh: { body: "取舍谨慎，但覆盖略窄。", effects: { camp: { momentum: 3 } } },
          fail: { body: "你押错了县，冷落了真正该守的地方。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "关键县全丢，选情急转直下。", effects: { rep: -1.5, camp: { momentum: -11 } } }
        }
      }
    ]
  },

  /* ========================= 等级5：全州公职（stwide）========================= */
  {
    id: "camp_stwide_announce", brief: { lede: "第一次向全州自我介绍，多数人还不认识你。", known: ["大多数选民没听过你的名字。", "巡回宣告赌曝光，攒背书赌根基。", "慢经营省资源，却可能起量太迟。"], unknown: ["名字还不够响，等于没进入竞选。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 4, tierMax: 4, weight: 1,
    title: "全州性宣告",
    body: "第一次向整个州自我介绍。大多数选民根本不认识你，你的名字要和'另一个州'的州名一样响。",
    choices: [
      {
        id: "state_tour", text: "巡回三城，正式宣告", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.5 }],
        outcomes: {
          crit: { body: "三城联动，你一夜之间成了全州都听过的名字。", effects: { rep: 2.5, camp: { momentum: 12 } } },
          ok: { body: "宣告到位，知名度铺开了。", effects: { rep: 1.5, camp: { momentum: 7 } } },
          meh: { body: "只有本党的人知道了你要选。", effects: { camp: { momentum: 3 } } },
          fail: { body: "巡回声势不够，全州还是不认识你。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "宣告成了自说自话，没人接。", effects: { rep: -1.5, camp: { momentum: -11 } } }
        }
      },
      {
        id: "endorse_chain", text: "先攒一串地方背书再露面", base: 0.55,
        mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "fac", key: "establishment", w: 0.3 }],
        outcomes: {
          crit: { body: "一堆市长县党部集体站台，你的宣告分量十足。", effects: { rep: 1.5, fac: { base: 6, establishment: 4 }, camp: { momentum: 11 } } },
          ok: { body: "背书链慢慢成形，你底气足了。", effects: { camp: { momentum: 6 } } },
          meh: { body: "凑到了几张有分量的脸。", effects: { camp: { momentum: 2 } } },
          fail: { body: "愿意背书的人都不够响。", effects: { camp: { momentum: -5 } } },
          critfail: { body: "攒背书拖太久，错过最佳窗口。", effects: { camp: { momentum: -10 } } }
        }
      },
      {
        id: "slow_burn", text: "不急着铺开，先把现有阵地经营好", base: 0.6,
        outcomes: {
          crit: { body: "你不追热度，反而把基本盘经营得板实。", effects: { camp: { momentum: 5 } } },
          ok: { body: "稳扎稳打，知名度慢慢积累。", effects: { camp: { momentum: 3 } } },
          meh: { body: "没做大声量，也没出乱子。", effects: { camp: { momentum: 1 } } },
          fail: { body: "全州选举拼的是声量，你太安静了。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "存在感不够，选情微跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_stwide_convention", brief: { lede: "党在大会上决定提名给谁。", known: ["会场每一票都靠你几天前谈好的信任。", "逐名谈判赌精算，发动基层赌声浪。", "安静等待省事，但被动把结果交给别人。"], unknown: ["会前没谈够，台上就会冷场。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 4, tierMax: 4, weight: 1,
    title: "州党代表大会",
    body: "党在大会上决定把提名给谁。会场里的每一张票，都得靠你几天前就谈好的信任。",
    choices: [
      {
        id: "work_room", text: "逐名代表谈判，锁定提名", base: 0.5,
        mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "fac", key: "establishment", w: 0.3 }],
        outcomes: {
          crit: { body: "你在走廊里谈下足够票数，第一轮就拿下提名。", effects: { rep: 2, fac: { establishment: 6 }, camp: { momentum: 13 } } },
          ok: { body: "你笑到了大会最后，握住提名。", effects: { camp: { momentum: 8 } } },
          meh: { body: "提名到手，但你答应了不少事。", effects: { camp: { momentum: 3 }, fav: -1 } },
          fail: { body: "大会转向另一个名字，你险些出局。", effects: { fac: { establishment: -5 }, camp: { momentum: -7 } } },
          critfail: { body: "你被当场掀翻，提名给了对手。", effects: { rep: -2, fac: { establishment: -8 }, camp: { momentum: -14 } } }
        }
      },
      {
        id: "floor_fight", text: "发动基层代表冲击会场", base: 0.45,
        mods: [{ src: "fac", key: "base", w: 0.5 }],
        outcomes: {
          crit: { body: "年轻代表把你抬上了提名，建制派目瞪口呆。", effects: { rep: 1.5, fac: { base: 8 }, camp: { momentum: 11 } } },
          ok: { body: "草根声浪帮你涉险过关。", effects: { fac: { base: 4 }, camp: { momentum: 6 } } },
          meh: { body: "热闹一场，提名还得靠交易。", effects: { camp: { momentum: 2 } } },
          fail: { body: "冲击会场被党视为失序，反噬你。", effects: { fac: { establishment: -5 }, camp: { momentum: -7 } } },
          critfail: { body: "党机器联合绞杀了你这场'造反'。", effects: { rep: -2, fac: { establishment: -8, base: -4 }, camp: { momentum: -13 } } }
        }
      },
      {
        id: "play_safe", text: "不搅浑水，安静等结果", base: 0.6,
        outcomes: {
          crit: { body: "你不得罪任何一方，各方反而都愿意给你留条路。", effects: { camp: { momentum: 5 } } },
          ok: { body: "你体面地熬过了大会。", effects: { camp: { momentum: 3 } } },
          meh: { body: "提名与你无关，但你没受伤。", effects: { camp: { momentum: 1 } } },
          fail: { body: "太被动，你在大会里几乎没声音。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "你成了被人忽略的那个，选情小跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_stwide_media", brief: { lede: "全州选举是注意力战争，上不了版面等于不存在。", known: ["州内电视和头版是你必须出现的战场。", "砸广告赌钱，造话题赌免费版面。", "只维持最低曝光，会慢慢被人忘掉。"], unknown: ["没有存在感，名字就带不起票。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 4, tierMax: 4, weight: 1,
    title: "打响全州知名度",
    body: "一场全州选举，是一场注意力战争。上不了州内的电视和头版，你就等于不存在。",
    choices: [
      {
        id: "media_buy", text: "砸钱上黄金时段广告", base: 0.5,
        cost: { fun: 20000 },
        mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "洗脑式广告让全州都会哼你的竞选口号。", effects: { rep: 2, camp: { momentum: 13, warchest: -6 } } },
          ok: { body: "知名度稳步上扬，金库也见到底。", effects: { rep: 1, camp: { momentum: 7, warchest: -8 } } },
          meh: { body: "钱烧了，水花一般。", effects: { camp: { momentum: 2, warchest: -10 } } },
          fail: { body: "广告淹没在对手更猛的炮火里。", effects: { camp: { momentum: -5, warchest: -12 } } },
          critfail: { body: "广告拍砸，成了全州的笑柄。", effects: { rep: -2, camp: { momentum: -11, warchest: -12 } } }
        }
      },
      {
        id: "earned_news", text: "制造话题，靠免费版面", base: 0.5,
        mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "你抛出的议题上了全州头条，一分钱广告没花。", effects: { rep: 2, camp: { momentum: 12 } } },
          ok: { body: "媒体主动来采访你，曝光划算。", effects: { camp: { momentum: 7 } } },
          meh: { body: "零星上了几次版，不成气候。", effects: { camp: { momentum: 3 } } },
          fail: { body: "话题没炒热，记者不买账。", effects: { camp: { momentum: -5 } } },
          critfail: { body: "你造的梗反被对手玩坏，全网嘲。", effects: { rep: -2, camp: { momentum: -11 } } }
        }
      },
      {
        id: "steady_presence", text: "不买不炒，维持最低曝光", base: 0.6,
        outcomes: {
          crit: { body: "你靠扎实的地方新闻慢慢刷脸，稳当。", effects: { camp: { momentum: 5 } } },
          ok: { body: "不烧钱也不丢分，曝光持平。", effects: { camp: { momentum: 3 } } },
          meh: { body: "没什么声响，但也没出错。", effects: { camp: { momentum: 1 } } },
          fail: { body: "注意力战里你选择了缺席。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "全州选战开打却看不见你，选情小跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },

  /* ========================= 等级6：联邦众议员（federal · ★胜利线）========================= */
  {
    id: "camp_federal_announce", brief: { lede: "从州议会到国会，是一次真正的跃迁。", known: ["你需要全国性筹款网络和一个华府故事。", "高规格启动赌声量，深耕本土赌人心。", "国会议题更硬，地方资历未必够用。"], unknown: ["故事讲不动，国会梦会停在半路。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 5, tierMax: 5, weight: 1,
    title: "宣布角逐国会席位",
    body: "从州议会到国会，是一次真正的跃迁。你需要全国性的筹款网络，和一个能打动华盛顿的故事。",
    choices: [
      {
        id: "national_launch", text: "高规格启动，直取国会议题", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.5 }],
        outcomes: {
          crit: { body: "你的启动吸引了全国政治记者，筹款邮件爆量。", effects: { rep: 2.5, camp: { momentum: 12, warchest: 8 } } },
          ok: { body: "启动到位，你进入了全国视野。", effects: { rep: 1, camp: { momentum: 7, warchest: 4 } } },
          meh: { body: "雷声不大，雨点不小。", effects: { camp: { momentum: 3 } } },
          fail: { body: "全国性选举你才发现自己多无名。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "启动当天爆出旧账，对手立刻接手话题。", effects: { rep: -2, camp: { momentum: -12 } } }
        }
      },
      {
        id: "local_roots", text: "深耕本土，守住选区人心", base: 0.55,
        mods: [{ src: "fac", key: "base", w: 0.5 }],
        outcomes: {
          crit: { body: "你把'本土代言人'的牌打熚，选区铁了心跟你。", effects: { rep: 1.5, fac: { base: 8 }, camp: { momentum: 11 } } },
          ok: { body: "选区根基稳如盘石。", effects: { camp: { momentum: 6 } } },
          meh: { body: "本土牌安全，但缺了点想象空间。", effects: { camp: { momentum: 2 } } },
          fail: { body: "光谈本土，撑不起国会格局。", effects: { camp: { momentum: -5 } } },
          critfail: { body: "你被贴上'格局太小'的标签。", effects: { rep: -1.5, camp: { momentum: -10 } } }
        }
      },
      {
        id: "steady_start", text: "不急于高调，先把基本盘稳住", base: 0.6,
        outcomes: {
          crit: { body: "你闷声把选区经营稳当，起步虽慢却根底牢。", effects: { camp: { momentum: 5 } } },
          ok: { body: "你低调开跑，稳住了现有支持者。", effects: { camp: { momentum: 3 } } },
          meh: { body: "声势不大，也没出大错。", effects: { camp: { momentum: 1 } } },
          fail: { body: "国会选举需要声量，你开局太闷。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "全国无人知晓你，选情微跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_federal_primary", brief: { lede: "一个花钱不眨眼的同党盯上了你的席位。", known: ["初选若输，国会更无从谈起。", "以在位优势稳住，或向基本盘打意识形态牌。", "不主动出击省事，却给了对手空间。"], unknown: ["轻敌不回应，会被自己人翻盘。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 5, tierMax: 5, weight: 1,
    title: "国会初选",
    body: "一个花钱不眨眼的同党挑战者盯上了你的席位。初选若输，国会更无从谈起。",
    choices: [
      {
        id: "defend", text: "以在位优势稳住局面", base: 0.55,
        mods: [{ src: "fac", key: "establishment", w: 0.5 }],
        outcomes: {
          crit: { body: "你动用机器把挑战者压了下去，初选大胜。", effects: { rep: 2, fac: { establishment: 6 }, camp: { momentum: 13 } } },
          ok: { body: "你涉险拿下初选。", effects: { camp: { momentum: 8 } } },
          meh: { body: "赢了，但你被这场初选耗去不少元气。", effects: { camp: { momentum: 3 } } },
          fail: { body: "挑战者咬得很紧，你勉强过关。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "初选失利，国会梦碎在同党手里。", effects: { rep: -2.5, fac: { establishment: -6 }, camp: { momentum: -14 } } }
        }
      },
      {
        id: "ideology", text: "向基本盘靠，打意识形态牌", base: 0.45,
        mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你喊出了基本盘的心声，初选一边倒。", effects: { fac: { base: 8 }, camp: { momentum: 11 } } },
          ok: { body: "保守/进步派集合在你身后。", effects: { camp: { momentum: 7 } } },
          meh: { body: "初选赢了，但中间选民开始远离。", effects: { camp: { momentum: 2 }, fac: { establishment: -3 } } },
          fail: { body: "极端化言论反噬，温和派倒向对手。", effects: { fac: { establishment: -5 }, camp: { momentum: -7 } } },
          critfail: { body: "你被党内建制和中间选民双双抛弃。", effects: { rep: -2, fac: { establishment: -8 }, camp: { momentum: -13 } } }
        }
      },
      {
        id: "steady_defend", text: "不主动出击，守住现有优势", base: 0.6,
        outcomes: {
          crit: { body: "你不犯错，靠稳健守住了在位优势。", effects: { camp: { momentum: 5 } } },
          ok: { body: "初选波澜不惊地过去。", effects: { camp: { momentum: 3 } } },
          meh: { body: "没拉开差距，也没被拉近。", effects: { camp: { momentum: 1 } } },
          fail: { body: "过于保守，对手抢走了话题。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "你几乎没应战，选情小跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_federal_money", brief: { lede: "国会竞选烧钱如水，金主的条件从不免费。", known: ["接下大额捐款能补金库，但欠下人情。", "走小额众筹慢而干净，钱来得费劲。", "维持现状，既不得罪金主也不缺钱。"], unknown: ["拿谁的钱，将来就可能替谁说话。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 5, tierMax: 5, weight: 1,
    title: "筹款与金主",
    body: "国会竞选烧钱如水。金主愿意开仓，但他们的条件也从不免费。",
    choices: [
      {
        id: "take_money", text: "接下金主的大额捐款", base: 0.55,
        mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "金主火力全开，你的广告库存瞬间拉满。", effects: { camp: { momentum: 10, warchest: 18 } } },
          ok: { body: "款项到账，竞选机器马力十足。", effects: { camp: { momentum: 6, warchest: 12 } } },
          meh: { body: "钱到位了，你也默默接下了几笔人情。", effects: { camp: { momentum: 3, warchest: 8 }, fav: -1 } },
          fail: { body: "金主临阵变卦，你的账户青黄不接。", effects: { camp: { momentum: -5, warchest: -8 } } },
          critfail: { body: "一笔脏捐款被媒体曝光，你成了对手的靶子。", effects: { rep: -2.5, camp: { momentum: -12, warchest: -6 } } }
        }
      },
      {
        id: "small_dollar", text: "拒绝金主，走小额众筹", base: 0.45,
        mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "'不拿金主一分钱'成了你最响的招牌，小额捐款潮涌。", effects: { rep: 4.5, camp: { momentum: 13, warchest: 6 } } },
          ok: { body: "草根筹款稳健，你干净又有底气。", effects: { rep: 1, camp: { momentum: 7, warchest: 3 } } },
          meh: { body: "钱不多，但每一分都干净。", effects: { camp: { momentum: 2, warchest: 1 } } },
          fail: { body: "小额筹款填不上广告的窟隆。", effects: { camp: { momentum: -5, warchest: -6 } } },
          critfail: { body: "清高换不来曝光，你被金主支持的对手淹没。", effects: { camp: { momentum: -10, warchest: -10 } } }
        }
      },
      {
        id: "moderate_raise", text: "不接大额也不众筹，维持现状", base: 0.6,
        outcomes: {
          crit: { body: "你量入为出，竞选机器转得平稳。", effects: { camp: { momentum: 5 } } },
          ok: { body: "不欠金主人情，钱也够用。", effects: { camp: { momentum: 3 } } },
          meh: { body: "没发也没伤，维持原状。", effects: { camp: { momentum: 1 } } },
          fail: { body: "国会竞选烧钱如水，你抠抠搜搜。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "既无大钱也无声势，选情小跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_federal_swing", brief: { lede: "票数胶着，胜负定在最后几个郊区。", known: ["这一周你会把一切押上去。", "地毯拜票赌体力，全力动员赌投票率。", "摇摆选民没定见，一句宣传就可能倒向。"], unknown: ["最后押错地方，整场选战付诸东流。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 5, tierMax: 5, weight: 1,
    title: "摇摆选区的最后一周",
    body: "票数胶着，胜负就定在最后几个郊区。这一周你会把一切押上去。",
    choices: [
      {
        id: "floor_push", text: "最后一周地毯式拜票", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你把郊区敲了个遍，选情在最后一刻翻起。", effects: { rep: 2, fac: { base: 6 }, camp: { momentum: 14 } } },
          ok: { body: "最后一周的拼劲稳住了关键人群。", effects: { camp: { momentum: 8 } } },
          meh: { body: "你累到脱形，选情持平。", effects: { camp: { momentum: 3 } } },
          fail: { body: "郊区不买账，你白跑一趟。", effects: { camp: { momentum: -7 } } },
          critfail: { body: "最后一周连环失言，选情雪崩。", effects: { rep: -2, camp: { momentum: -14 } } }
        }
      },
      {
        id: "get_out_vote", text: "全力动员投票率", base: 0.55,
        mods: [{ src: "fac", key: "base", w: 0.5 }],
        outcomes: {
          crit: { body: "你把支持者一个个拉去了投票站，选情大涨。", effects: { fac: { base: 8 }, camp: { momentum: 13 } } },
          ok: { body: "动员机器高效运转。", effects: { camp: { momentum: 8 } } },
          meh: { body: "拉了些人，但不够拉开差距。", effects: { camp: { momentum: 3 } } },
          fail: { body: "支持者反应惰性，动员不及预期。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "投票日下雨，你的基本盘没出门。", effects: { camp: { momentum: -12 } } }
        }
      }
    ]
  },

  /* ========================= 等级7：联邦参议员 / 州长（senate）========================= */
  {
    id: "camp_senate_announce", brief: { lede: "覆盖全州的选战：要么全国人物，要么什么都不是。", known: ["对手多半已是叫得出名字的人。", "大片开场赌声量，白皮书开局赌深度。", "稳健入场不出错，却也难一鸣惊人。"], unknown: ["开场哑火，全州会把你当小角色。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 6, tierMax: 6, weight: 1,
    title: "宣布竞逐大位",
    body: "一场覆盖全州的选举。你要么现在就是一个全国性人物，要么什么都不是。",
    choices: [
      {
        id: "pro_clip", text: "发一支电影级宣传片开跑", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.5 }],
        outcomes: {
          crit: { body: "宣传片刷屏，你一夜之间成了全州话题。", effects: { rep: 2.5, camp: { momentum: 12 } } },
          ok: { body: "开跑声势浩大。", effects: { rep: 1, camp: { momentum: 7 } } },
          meh: { body: "片了不错，看的人不算多。", effects: { camp: { momentum: 3 } } },
          fail: { body: "宣传片被指空洞，没打动任何人。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "宣传片被逐帧挘错，成了全网鬼畜。", effects: { rep: -2, camp: { momentum: -12 } } }
        }
      },
      {
        id: "policy_paper", text: "用一份重磅政策白皮书开场", base: 0.5,
        mods: [{ src: "attr", key: "INT", w: 0.55 }],
        outcomes: {
          crit: { body: "白皮书被媒体逐条引用，你立住了'serious'人设。", effects: { rep: 2, attr: { INT: 2 }, camp: { momentum: 11 } } },
          ok: { body: "政策开局，专业形象加分。", effects: { attr: { INT: 1 }, camp: { momentum: 6 } } },
          meh: { body: "写得专业，但传不开。", effects: { camp: { momentum: 2 } } },
          fail: { body: "白皮书没人读，声势没起来。", effects: { camp: { momentum: -5 } } },
          critfail: { body: "白皮书里的数据被驳了个底朝天。", effects: { rep: -2, camp: { momentum: -11 } } }
        }
      },
      {
        id: "quiet_entry", text: "不高调也不试探，稳守基本盘", base: 0.6,
        outcomes: {
          crit: { body: "你不抢头条，却把自家阵地经营得稳稳的。", effects: { camp: { momentum: 5 } } },
          ok: { body: "不功不过地开了局。", effects: { camp: { momentum: 3 } } },
          meh: { body: "声势平平，但没出错。", effects: { camp: { momentum: 1 } } },
          fail: { body: "大位选举需要气势，你开局太温。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "全国选战里你几乎没发声，选情小跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_senate_primary", brief: { lede: "党内强敌环伺，初选比谁先露破绽。", known: ["初选不只比票多，也比谁先被抓到弱点。", "走中间赌最大公约数，点燃基本盘赌热情。", "你的记录会被自己人先审一遍。"], unknown: ["被拍到软肋，初选都撑不过。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 6, tierMax: 6, weight: 1,
    title: "全州初选",
    body: "党内强敌环伺。初选不仅要比谁票多，还要比谁先被拍到弱点。",
    choices: [
      {
        id: "win_over", text: "走中间路线争取最大公约数", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "establishment", w: 0.3 }],
        outcomes: {
          crit: { body: "温和形象让你横扫初选，党内再无对手。", effects: { rep: 2, camp: { momentum: 13 } } },
          ok: { body: "你稳拿初选提名。", effects: { camp: { momentum: 8 } } },
          meh: { body: "赢了初选，但没树起鲜明标签。", effects: { camp: { momentum: 3 } } },
          fail: { body: "中间路线两边不讨好，初选惊险过关。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "初选失利，你被更强的人顶替。", effects: { rep: -2, camp: { momentum: -13 } } }
        }
      },
      {
        id: "fire_base", text: "点燃初选基本盘", base: 0.5,
        mods: [{ src: "fac", key: "base", w: 0.5 }],
        outcomes: {
          crit: { body: "基本盘为你赴汤蹈火，初选大胜。", effects: { fac: { base: 8 }, camp: { momentum: 11 } } },
          ok: { body: "热情选民把你抬过了终点。", effects: { camp: { momentum: 7 } } },
          meh: { body: "赢了初选，却把大选中心丢了。", effects: { camp: { momentum: 2 }, fac: { establishment: -3 } } },
          fail: { body: "初选打法太极端，大选包袱背上身。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "初选赢了人，丢了大选中间派。", effects: { fac: { establishment: -8 }, camp: { momentum: -12 } } }
        }
      }
    ]
  },
  {
    id: "camp_senate_debate", brief: { lede: "一场直播，百万双眼睛，一句话顶半月广告。", known: ["辩论台上的表现会被反复播放。", "稳阵脚赌气度，抓破绽赌杀伤。", "不搏命不失态，稳妥却也难出彩。"], unknown: ["一句失态，会成为对手整季的素材。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 6, tierMax: 6, weight: 1,
    title: "电视辩论",
    body: "一场直播，百万双眼睛。辩论台上一句话，能顶半个月广告。",
    choices: [
      {
        id: "command", text: "稳住阵脚，展现领袖气象", base: 0.5,
        mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你镇定、具体、有同理心，民调立跳。", effects: { rep: 2.5, camp: { momentum: 14 } } },
          ok: { body: "你表现稳健，没给对手可乘之机。", effects: { camp: { momentum: 7 } } },
          meh: { body: "不功不过，没人因为辩论改变主意。", effects: { camp: { momentum: 2 } } },
          fail: { body: "你紧张、回避，被指'不像当大位的料'。", effects: { rep: -1, camp: { momentum: -7 } } },
          critfail: { body: "你在直播中失态，剪辑版全天循环。", effects: { rep: -2.5, camp: { momentum: -14 } } }
        }
      },
      {
        id: "go_for_kill", text: "抓住对手破绽穷追猛打", base: 0.45,
        mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "你一句关键追问把对手问到语塞，全场倒戈。", effects: { rep: 1.5, attr: { CUN: 2 }, camp: { momentum: 12 } } },
          ok: { body: "你打得对手招架不住。", effects: { attr: { CUN: 1 }, camp: { momentum: 7 } } },
          meh: { body: "你够凶，但选民觉得你'过了'。", effects: { camp: { momentum: 1 } } },
          fail: { body: "你攻击过度，选民开始同情对手。", effects: { rep: -1.5, camp: { momentum: -7 } } },
          critfail: { body: "你的猛攻被当场反转，自己下不了台。", effects: { rep: -2.5, camp: { momentum: -13 } } }
        }
      },
      {
        id: "steady_hand", text: "不搏命也不失态，稳稳健健答完", base: 0.6,
        outcomes: {
          crit: { body: "你不抢戏也不犯错，稳健得反而加分。", effects: { camp: { momentum: 5 } } },
          ok: { body: "你平稳地过了这场辩论。", effects: { camp: { momentum: 3 } } },
          meh: { body: "没人记住你，也没人拓你。", effects: { camp: { momentum: 1 } } },
          fail: { body: "太平淡，选民觉得你缺点火候。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "你全程无存在感，选情小跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_senate_swing", brief: { lede: "全州胜负缩到几个摇摆县，钱和人得堆上去。", known: ["摇摆县决定整个州的归属。", "全面包围赌资源，派盟友出征赌火力。", "守住现有带稳妥，却难有增量。"], unknown: ["资源撒得太薄，哪个县都打不穿。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 6, tierMax: 6, weight: 1,
    title: "争夺摇摆地区",
    body: "全州的胜负缩到了几个摇摆县。钱和人，都得堆到那几块地皮上。",
    choices: [
      {
        id: "blanket", text: "广告加人海，全面包围摇摆县", base: 0.5,
        cost: { fun: 30000 },
        mods: [{ src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你把摇摆县打成了自己的颜色。", effects: { rep: 4, camp: { momentum: 14, warchest: -8 } } },
          ok: { body: "关键县选情稳步向好。", effects: { camp: { momentum: 8, warchest: -10 } } },
          meh: { body: "投入巨大，收效一般。", effects: { camp: { momentum: 3, warchest: -12 } } },
          fail: { body: "钱堆进了无底洞，摇摆县仍冷。", effects: { camp: { momentum: -6, warchest: -14 } } },
          critfail: { body: "金库见底，摇摆县还是丢了。", effects: { rep: -3.5, camp: { momentum: -12, warchest: -16 } } }
        }
      },
      {
        id: "surrogate", text: "派重量级盟友替你出征", base: 0.55,
        mods: [{ src: "fac", key: "establishment", w: 0.4 }],
        outcomes: {
          crit: { body: "明星盟友替你拉动了摇摆选民。", effects: { fac: { establishment: 4 }, camp: { momentum: 12 } } },
          ok: { body: "盟友巡回帮你在关键县补位。", effects: { camp: { momentum: 7 } } },
          meh: { body: "盟友来了，效果不好不坏。", effects: { camp: { momentum: 2 } } },
          fail: { body: "盟友说错话，反帮你上了热搜。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "盟友的丑闻连带把你拖下水。", effects: { rep: -2, fac: { establishment: -6 }, camp: { momentum: -12 } } }
        }
      },
      {
        id: "hold_swing", text: "不押注不蛮干，守住现有摇摆带", base: 0.6,
        outcomes: {
          crit: { body: "你精准地把该守的县守住了。", effects: { camp: { momentum: 5 } } },
          ok: { body: "摇摆带选情被你稳住了。", effects: { camp: { momentum: 3 } } },
          meh: { body: "没拉开也没丢地。", effects: { camp: { momentum: 1 } } },
          fail: { body: "不够拼，摇摆县被对手挖走一角。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "你未全力投入，关键县小失，选情微跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },

  /* ========================= 等级8：副总统 / 总统候选人（vp）========================= */
  {
    id: "camp_vp_announce", brief: { lede: "你不再只为自己竞选，党魁开始考虑你。", known: ["党魁在权衡把你放上那张全国海报。", "全国议题发声赌能见度，表忠心赌信任。", "你的名字需要开始配得上全国舞台。"], unknown: ["只刷脸不表态，会被当成局外人。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 7, tierMax: 7, weight: 1,
    title: "进入候选视野",
    body: "你不再是为自己一个人竞选。党魁开始考虑把你放上那张全国海报。",
    choices: [
      {
        id: "make_name", text: "在全国议题上发声，刷存在", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.5 }],
        outcomes: {
          crit: { body: "你一次次恰到好处地发声，成了'副手热门'。", effects: { rep: 2.5, camp: { momentum: 12 } } },
          ok: { body: "你的名字开始出现在候选名单上。", effects: { rep: 1, camp: { momentum: 7 } } },
          meh: { body: "有点印象，但还不够响。", effects: { camp: { momentum: 3 } } },
          fail: { body: "全国舞台还记不住你。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "一次错错的表态把你从名单上划掉。", effects: { rep: -2, camp: { momentum: -12 } } }
        }
      },
      {
        id: "prove_loyal", text: "为党魁鞍前马后，表忠心", base: 0.55,
        mods: [{ src: "fac", key: "establishment", w: 0.5 }],
        outcomes: {
          crit: { body: "你成了党内最可靠的人，候选席为你敞开。", effects: { fac: { establishment: 8 }, camp: { momentum: 11 } } },
          ok: { body: "党魁记住了你的功劳。", effects: { fac: { establishment: 4 }, camp: { momentum: 6 } } },
          meh: { body: "你勤快，但存在感不强。", effects: { camp: { momentum: 2 } } },
          fail: { body: "忠诚换不来提名，你只是个好帮手。", effects: { camp: { momentum: -5 } } },
          critfail: { body: "你被当成随叫随到的工具人。", effects: { rep: -1.5, camp: { momentum: -10 } } }
        }
      }
    ]
  },
  {
    id: "camp_vp_vetting", brief: { lede: "团队把你前半生翻了个底朝天。", known: ["他们找的不是你多好，而是会不会爆雷。", "全盘托出赌干净，提前包装赌稳妥。", "任何隐瞒一旦被挖出都是致命伤。"], unknown: ["藏着的旧事若被翻出，提名瞬间蒸发。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 7, tierMax: 7, weight: 1,
    title: "背景审查与试探",
    body: "团队把你的前半生翻了个底朝天。他们想找的不是你有多好，而是你会不会哪天爆雷。",
    choices: [
      {
        id: "open_book", text: "全盘托出，经得起查", base: 0.55,
        mods: [{ src: "attr", key: "INTG", w: 0.5 }],
        outcomes: {
          crit: { body: "审查干净利落，他们更信任你了。", effects: { rep: 2, camp: { momentum: 12 } } },
          ok: { body: "你过关了，没有致命黑点。", effects: { camp: { momentum: 7 } } },
          meh: { body: "查出点陈年旧账，但无伤大雅。", effects: { camp: { momentum: 2 } } },
          fail: { body: "审查翻出你不愿提的事。", effects: { camp: { momentum: -7 } } },
          critfail: { body: "审查挖出一枚定时炸弹，他们开始犹豫。", effects: { rep: -2, camp: { momentum: -13 } } }
        }
      },
      {
        id: "spin", text: "提前包装、回避敏感区", base: 0.45,
        mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "你滴水不漏，审查团队挑不出错。", effects: { camp: { momentum: 9 } } },
          ok: { body: "你熚过了大部分质询。", effects: { camp: { momentum: 5 } } },
          meh: { body: "含含糊糊，蒙混过关。", effects: { camp: { momentum: 1 } } },
          fail: { body: "你的回避反显得有问题。", effects: { camp: { momentum: -7 } } },
          critfail: { body: "被人抓住你说过谎，信任崩塔。", effects: { rep: -2.5, camp: { momentum: -14 } } }
        }
      },
      {
        id: "measured_book", text: "不包袋也不全抛，坦然应对审查", base: 0.6,
        outcomes: {
          crit: { body: "你既不遮掩也不乱说，审查反而信任你。", effects: { camp: { momentum: 5 } } },
          ok: { body: "你平平地过了这一关。", effects: { camp: { momentum: 3 } } },
          meh: { body: "无功无过，没留下把柄。", effects: { camp: { momentum: 1 } } },
          fail: { body: "回答不够坦荡，惹得对方多疑。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "你含含糊糊，印象分小跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_vp_convention", brief: { lede: "提名在这一刻揭晓，全看数月谈下的信任。", known: ["能否站上讲台取决于过去谈好的每一笔。", "锁定代表赌精算，先修裂痕赌团结。", "静观其变省事，却把结果交给别人。"], unknown: ["票没数够，台上就不是你的位置。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 7, tierMax: 7, weight: 1,
    title: "全国代表大会",
    body: "提名在这一刻揭晓。你能不能站上那个讲台，取决于过去几个月谈好的每一笔信任。",
    choices: [
      {
        id: "seal_it", text: "锁定提名，走上讲台", base: 0.5,
        mods: [{ src: "fac", key: "establishment", w: 0.5 }],
        outcomes: {
          crit: { body: "大会主席念出你的名字，全场起立。", effects: { rep: 3, fac: { establishment: 8 }, camp: { momentum: 15 } } },
          ok: { body: "你拿到了提名。", effects: { rep: 1.5, camp: { momentum: 9 } } },
          meh: { body: "提名到手，但党内仍有人观望。", effects: { camp: { momentum: 4 } } },
          fail: { body: "提名旁落，你白站了半年。", effects: { rep: -1.5, fac: { establishment: -6 }, camp: { momentum: -8 } } },
          critfail: { body: "大会现场被对手翻盘，你并并无名的成了配角。", effects: { rep: -2.5, camp: { momentum: -14 } } }
        }
      },
      {
        id: "unity_speech", text: "先修好党内裂痕再上位", base: 0.55,
        mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "一篇演讲把两派拢到一起，你众望所归。", effects: { rep: 2, fac: { base: 6 }, camp: { momentum: 12 } } },
          ok: { body: "党内裂痕被你缝上了大半。", effects: { camp: { momentum: 7 } } },
          meh: { body: "表面团了，底下仍有暗流。", effects: { camp: { momentum: 2 } } },
          fail: { body: "裂痕没补上，大会上你坐立难安。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "大会当场吵翻，裂痕全算在你头上。", effects: { rep: -2, camp: { momentum: -12 } } }
        }
      },
      {
        id: "steady_nervous", text: "不强推也不火上浇油，静观大会", base: 0.6,
        outcomes: {
          crit: { body: "你不刺激任何一方，反而被看作能团人的入选。", effects: { camp: { momentum: 5 } } },
          ok: { body: "平稳地度过了大会。", effects: { camp: { momentum: 3 } } },
          meh: { body: "没推动也没出事。", effects: { camp: { momentum: 1 } } },
          fail: { body: "你在大会上几乎隐形。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "机会窗口错过，选情小跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_vp_campaign", brief: { lede: "你四处替本党站台，攒人脉也怕说错话。", known: ["助选帮你攒下全国人脉，也放大你的每句话。", "走遍各州赌体力，只打关键选战赌效率。", "说多错多，沉默又可能失掉曝光。"], unknown: ["一句失言会把功劳变成别人的弹药。"] }, grade: "mid", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 7, tierMax: 7, weight: 1,
    title: "为全国助选奔走",
    body: "你四处替本党候选人站台，一边攒下全国人脉，一边担心自己说多错多。",
    choices: [
      {
        id: "tireless", text: "马不停蹄，走遍各州", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你成了全国最有号召力的助选人，人脉铺满各州。", effects: { rep: 2, fac: { base: 8 }, camp: { momentum: 13 } } },
          ok: { body: "你刷足了全国存在感。", effects: { rep: 1, camp: { momentum: 7 } } },
          meh: { body: "跑了多少场，平平。", effects: { camp: { momentum: 3 } } },
          fail: { body: "行程压垮了你，好几场状态失守。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "你连轴转下错话，帮了倒忙。", effects: { rep: -2, camp: { momentum: -12 } } }
        }
      },
      {
        id: "strategic", text: "只打关键选战，保存实力", base: 0.55,
        mods: [{ src: "attr", key: "INT", w: 0.5 }],
        outcomes: {
          crit: { body: "你把力气花在刀刃上，关键选区因你翻红。", effects: { rep: 1.5, camp: { momentum: 11 } } },
          ok: { body: "你选对了几场硬仗。", effects: { camp: { momentum: 6 } } },
          meh: { body: "你省了体力，也少了曝光。", effects: { camp: { momentum: 2 } } },
          fail: { body: "你太谨慎，错过丁关键选战。", effects: { camp: { momentum: -5 } } },
          critfail: { body: "保存实力被解读为'不够拼'。", effects: { camp: { momentum: -10 } } }
        }
      }
    ]
  },

  /* ========================= 等级9：总统（president · 火箭线破格才可及）========================= */
  {
    id: "camp_pres_announce", brief: { lede: "世界上最长最烧钱的竞选，从这一步开始。", known: ["你的每一步都会被全国放大审视。", "家乡宏大演说赌格局，社媒素人风暴赌热度。", "搭稳班子不出彩，却最抗风浪。"], unknown: ["开场定调失败，整场竞选一路补课。"] }, grade: "major", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 8, tierMax: 8, weight: 1,
    title: "宣布竞选总统",
    body: "世界上最漫长、最烧钱的一场竞选。从这一刻起，你的每一步都会被全国放大。",
    choices: [
      {
        id: "grand", text: "在家乡小镇发表宏大开幕演说", base: 0.5,
        mods: [{ src: "attr", key: "CHA", w: 0.5 }],
        outcomes: {
          crit: { body: "演说传遍全国，你的民调一夜跳升。", effects: { rep: 5.5, camp: { momentum: 13, warchest: 8 } } },
          ok: { body: "开幕有力，全国开始认真对待你。", effects: { rep: 1.5, camp: { momentum: 8 } } },
          meh: { body: "地方新闻报了，全国还在观望。", effects: { camp: { momentum: 3 } } },
          fail: { body: "开幕平淡，全国没几个把你当回事。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "演说被指空洞，开局即被视为陪跑。", effects: { rep: -3.5, camp: { momentum: -12 } } }
        }
      },
      {
        id: "digital", text: "用社交媒体发动素人风暴", base: 0.5,
        mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "一场素人刷屏把你顶上热搜，小额捐款如潮。", effects: { rep: 2, fac: { base: 6 }, camp: { momentum: 12, warchest: 6 } } },
          ok: { body: "线上声势起来了。", effects: { camp: { momentum: 7 } } },
          meh: { body: "热闹一阵，转化一般。", effects: { camp: { momentum: 3 } } },
          fail: { body: "网络热度没接住线下。", effects: { camp: { momentum: -5 } } },
          critfail: { body: "一条旧推文被挖出，风暴反噬。", effects: { rep: -2, camp: { momentum: -11 } } }
        }
      },
      {
        id: "steady_open", text: "不高调不博眼球，先把班子搭稳", base: 0.6,
        outcomes: {
          crit: { body: "你不抢镜却把开局打理得并有条。", effects: { camp: { momentum: 5 } } },
          ok: { body: "开局平稳，团队就位。", effects: { camp: { momentum: 3 } } },
          meh: { body: "没声量也没乱子。", effects: { camp: { momentum: 1 } } },
          fail: { body: "总统选举需要气势，你开局太闷。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "全国没儿把你当回事，选情小跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_pres_primary", brief: { lede: "一场初选接一场，早期州决定你是势头还是泥潭。", known: ["早期州连胜能滚出不可逆的势头。", "全押早期赌爆发，拼代表数赌长线。", "一州一州的消耗会先耗垮钱包。"], unknown: ["久攻不下，退选的声音会党内先起。"] }, grade: "major", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 8, tierMax: 8, weight: 1,
    title: "各州初选连胜",
    body: "一场初选接着一场。你要么在早期州连胜打出势头，要么在泥潭里被磨尽。",
    choices: [
      {
        id: "early_wins", text: "全押早期州，赌连胜势头", base: 0.45,
        mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "你在首场州连胜，势头不可阻挡。", effects: { rep: 5, camp: { momentum: 14 } } },
          ok: { body: "早期州你拿下了关键几场。", effects: { camp: { momentum: 8 } } },
          meh: { body: "赢得磕磕绊绊，势头一般。", effects: { camp: { momentum: 3 } } },
          fail: { body: "首场州输了，资金开始动摇。", effects: { camp: { momentum: -7, warchest: -5 } } },
          critfail: { body: "初选连败，金主集体倒戈。", effects: { rep: -3.5, camp: { momentum: -14, warchest: -10 } } }
        }
      },
      {
        id: "long_game", text: "不争一州，拼代表人数盘", base: 0.55,
        mods: [{ src: "attr", key: "INT", w: 0.5 }],
        outcomes: {
          crit: { body: "你稳扎稳打，代表人数悄悄领跑。", effects: { camp: { momentum: 11 } } },
          ok: { body: "不抢风头，你慢慢累积胜势。", effects: { camp: { momentum: 6 } } },
          meh: { body: "盘而不动，时机未到。", effects: { camp: { momentum: 2 } } },
          fail: { body: "缺乏连胜，媒体忘了你。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "你的'长线'被当成'没戏'。", effects: { camp: { momentum: -11 } } }
        }
      }
    ]
  },
  {
    id: "camp_pres_nomination", brief: { lede: "代表大会：你需要过半代表票。", known: ["最后一批摇摆代表正在打量你值不值。", "逐派交易赌精算，基层浪潮赌声势。", "安静数票稳妥，却可能差最后几票。"], unknown: ["差一票过半，提名就旁落他人。"] }, grade: "major", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 8, tierMax: 8, weight: 1,
    title: "锁定党内提名",
    body: "党代表大会。你需要过半代表票，而最后一批摇摆代表正在看你值不值得。",
    choices: [
      {
        id: "deal_make", text: "逐派交易，凑定提名票数", base: 0.5,
        mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "establishment", w: 0.4 }],
        outcomes: {
          crit: { body: "你在后台谈拢了最后一批票，提名板上钉钉。", effects: { rep: 2.5, fac: { establishment: 8 }, camp: { momentum: 15 } } },
          ok: { body: "你拿下了提名。", effects: { rep: 1.5, camp: { momentum: 9 } } },
          meh: { body: "提名到手，但党被你切了无数块蛋糕。", effects: { camp: { momentum: 4 }, fav: -1 } },
          fail: { body: "票数差临门一脚，党内对你生疑。", effects: { fac: { establishment: -5 }, camp: { momentum: -8 } } },
          critfail: { body: "一场反常的'第2轮投票'把你拉下马。", effects: { rep: -2.5, fac: { establishment: -8 }, camp: { momentum: -15 } } }
        }
      },
      {
        id: "grass_surge", text: "靠基层浪潮压倒建制观望", base: 0.45,
        mods: [{ src: "fac", key: "base", w: 0.5 }],
        outcomes: {
          crit: { body: "基层浪潮卷起代表席，你历史性提名。", effects: { fac: { base: 10 }, camp: { momentum: 13 } } },
          ok: { body: "浪潮帮你冲过了终点。", effects: { fac: { base: 5 }, camp: { momentum: 7 } } },
          meh: { body: "浪潮够大，却没能完全压住建制。", effects: { camp: { momentum: 2 } } },
          fail: { body: "建制联手挡了浪潮，你并未能登顶。", effects: { fac: { establishment: -5 }, camp: { momentum: -7 } } },
          critfail: { body: "机器绞杀了浪潮，也绞杀了你。", effects: { rep: -2, fac: { establishment: -8 }, camp: { momentum: -13 } } }
        }
      },
      {
        id: "patient_count", text: "不搞交易也不造反，安静数代表票", base: 0.6,
        outcomes: {
          crit: { body: "你不声不响地累积票数，笑到最后。", effects: { camp: { momentum: 5 } } },
          ok: { body: "你稳稳地待在提名竞争里。", effects: { camp: { momentum: 3 } } },
          meh: { body: "没拉票也没丢票。", effects: { camp: { momentum: 1 } } },
          fail: { body: "提名靠的是主动交易，你太被动。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "你在大会后台被人遗忘，选情小跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  },
  {
    id: "camp_pres_debate", brief: { lede: "亿万人在看，一句失言能断送大位。", known: ["这是全国级别的正面交锋。", "展格局赌稳重，钉对手赌杀伤。", "不失态也不搏命，稳却未必抢眼。"], unknown: ["一句口误会被循环播放到投票日。"] }, grade: "major", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 8, tierMax: 8, weight: 1,
    title: "总统电视辩论",
    body: "亿万人在看。一句失言可能直接断送人主之位。",
    choices: [
      {
        id: "presidential", text: "展现总统格局，稳若磐石", base: 0.5,
        mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你从容、具体、具领袖魅力，民调飙升。", effects: { rep: 5.5, camp: { momentum: 15 } } },
          ok: { body: "你稳住了，没人能拿你怎样。", effects: { camp: { momentum: 8 } } },
          meh: { body: "不功不过，中间选民无动于衷。", effects: { camp: { momentum: 3 } } },
          fail: { body: "你显得紧张、防御，'不像总统'。", effects: { rep: -1.5, camp: { momentum: -8 } } },
          critfail: { body: "你在全球直播中卡壳，选情雪崩。", effects: { rep: -4, camp: { momentum: -15 } } }
        }
      },
      {
        id: "attack_opponent", text: "把对手钉在耻辱柱上", base: 0.45,
        mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "你一句致命追问令对手哑口，全场倒向你。", effects: { rep: 2, attr: { CUN: 2 }, camp: { momentum: 13 } } },
          ok: { body: "你掌控了辩论的攻击节奏。", effects: { attr: { CUN: 1 }, camp: { momentum: 7 } } },
          meh: { body: "你够狠，但选民怕你'过头'。", effects: { camp: { momentum: 1 } } },
          fail: { body: "你显得偏刻薄，选民同情对手。", effects: { rep: -1.5, camp: { momentum: -8 } } },
          critfail: { body: "你的攻击被反转，自己成了靶心。", effects: { rep: -3, camp: { momentum: -14 } } }
        }
      }
    ]
  },
  {
    id: "camp_pres_swing", brief: { lede: "选举人团游戏缩到几个摇摆州，最后七天。", known: ["赢下摇摆州才赢下整个大选。", "金库全开赌火力，亲赴集会赌人心。", "按节奏跑完关键州，稳而不猛。"], unknown: ["押错州，领先全国普选票也坐不上大位。"] }, grade: "major", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 8, tierMax: 8, weight: 1,
    title: "摇摆州的最后冲刺",
    body: "选举人团的游戏缩到了几个摇摆州。最后七天，你把一切押上去。",
    choices: [
      {
        id: "swing_blanket", text: "金库全开，轰炸摇摆州", base: 0.5,
        cost: { fun: 60000 },
        mods: [{ src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你把摇摆州刷成了自己的颜色，基本盘被彻底点燃。", effects: { rep: 2.5, fac: { base: 8 }, camp: { momentum: 15, warchest: -12 } } },
          ok: { body: "关键州选情被你拉了起来，支持者重新兴奋起来。", effects: { fac: { base: 6 }, camp: { momentum: 9, warchest: -14 } } },
          meh: { body: "金库见底，收效平平。", effects: { camp: { momentum: 3, warchest: -18 } } },
          fail: { body: "钱堆不出胜势，摇摆州仍胶着。", effects: { camp: { momentum: -7, warchest: -20 } } },
          critfail: { body: "金库打空，摇摆州一个没拿住。", effects: { rep: -2, camp: { momentum: -14, warchest: -24 } } }
        }
      },
      {
        id: "rally_tour", text: "亲自奔赴每一场集会", base: 0.55,
        mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.4 }],
        outcomes: {
          crit: { body: "你一场接一场的集会点燃摇摆州。", effects: { fac: { base: 8 }, camp: { momentum: 14 } } },
          ok: { body: "你拼到最后一刻，关键州回暖。", effects: { camp: { momentum: 8 } } },
          meh: { body: "你跑断了腿，选情持平。", effects: { camp: { momentum: 3 } } },
          fail: { body: "人力难回天，身体也亮红灯。", effects: { camp: { momentum: -6 } } },
          critfail: { body: "冲刺途中你病倒，选情失控。", effects: { rep: -2, camp: { momentum: -14 } } }
        }
      },
      {
        id: "even_push", text: "不均势不蛮干，按节奏跑完关键州", base: 0.6,
        outcomes: {
          crit: { body: "你保留了体力又没错过关键州，节奏完美。", effects: { camp: { momentum: 5 } } },
          ok: { body: "你稳步走完最后一周。", effects: { camp: { momentum: 3 } } },
          meh: { body: "没发力也没失控。", effects: { camp: { momentum: 1 } } },
          fail: { body: "最后七天不温不火，被对手抢了势头。", effects: { camp: { momentum: -1 } } },
          critfail: { body: "你未全力冲刺，关键州小失，选情微跌。", effects: { camp: { momentum: -2 } } }
        }
      }
    ]
  }
]);
