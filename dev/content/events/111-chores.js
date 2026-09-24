/* ============================================================================
 * CONTENT · events/111-chores.js
 * 日常公务 / 选民服务池（chore 通道）——各级（从志愿者到联邦）每个月都可能撞上的那些"小事"。
 *
 * 它们不进随机卡池（engine/events.js 的 eligible 已挡掉 chore），只经
 *   engine/time.js 的 P.choresSlot() 注入：本月空档时兜底一条、非空时按小概率追加
 *   （开关 balance.choreDynamic）。所以这一池子刻意"轻量、低权重、几乎只涨选民"。
 *
 * 设计：
 *   · tierRaw:true —— 门槛按真实 0..9 层级直写，跟晋升阶梯对齐，不受旧 tierBand 抬档影响。
 *   · 按层级分簇：基层 T0–2、市政 T2–4、州 T4–6、联邦 T6+，让不同位置的人撞上不同的琐事。
 *   · 主吃 voters（warm/diehard↑、oppose↓），辅以一点点 rep；偶有时间代价但都留保底。
 *   · valence 多为 boon：经营选民是"只赚不赔但赚得不多"的日常；引擎会抹平任何负值。
 *   · minYear:1980 —— 本轮随 1980—1990 时间轴一起铺；年代更晚自会把 maxYear 抬上去复用。
 *
 * 铁律：只用「」；每卡至少一个既无 cost 又无 req 的保底选项；五档结果齐全。
 * ==========================================================================*/

POTUS.define("event", [

  /* ================= 基层 T0–2：社区里的人 ================= */
  {
    id: "chore_eulogy", brief: { lede: "老邻居过世，家属请你这个公职人说两句。", known: ["你手里没有稿子，全靠临场。", "讲一件真事最打动人，也最考验分寸。", "只念标准慰问稳，却显得敷衍。"] }, grade: "minor", category: "govt",
    valence: "boon", dyn: true, chore: true, tierRaw: true, tierMin: 0, tierMax: 2, weight: 7,
    minYear: 1980, maxYear: 1999, medium: ["print", "radio"],
    title: "一位老邻居过世，家人请你致悼词",
    body: "{CITY}的殡仪馆坐满了人，大多是你在选举夜握过手的老面孔。家属说「您是本地公共服务的人，说两句吧」。你手里没有稿子。",
    choices: [
      {
        id: "heart", text: "放下稿子，讲一件你记得的、关于他的真事",
        base: 0.68, mods: [{ src: "attr", key: "CHA", w: 0.35 }],
        outcomes: {
          crit: { body: "你讲的那件小事让满堂人红了眼眶，人们记住「那种时候他说的是人话」。", effects: { rep: 0.4, fac: { base: 5, church: 3 }, voters: { warm: 500, diehard: 90 } } },
          ok: { body: "你说得体面又真心，家属握着你的手谢了很久。", effects: { rep: 0.25, fac: { base: 3 }, voters: { warm: 320 } } },
          meh: { body: "你说了几句得体的套话，谁都没记下，谁也没挑出错。", effects: { rep: 0.1, voters: { warm: 120 } } },
          fail: { body: "你把一个名字念错了，全场那一秒的尴尬没人会忘。", effects: { rep: 0, fac: { base: -1 }, voters: { warm: -60 } } },
          critfail: { body: "你临时借来的悼词，原是别人用过的模板——家属认了出来。", effects: { rep: -0.1, fac: { base: -2 }, voters: { oppose: 150 } } }
        }
      },
      {
        id: "brief", text: "只说几句标准慰问，把话筒交给家人",
        base: 0.7, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你的克制得体，家属反倒感激你没把丧事变成你的舞台。", effects: { rep: 0.25, voters: { warm: 260 } } },
          ok: { body: "你简短致意，安安静静坐下，没人觉得被冒犯。", effects: { rep: 0.15, voters: { warm: 140 } } },
          meh: { body: "你说了几句，没人特别注意你来了还是没来。", effects: { rep: 0.05 } },
          fail: { body: "你说得太公事公办，有人小声嘀咕「他是来办事的还是来吊唁的」。", effects: { rep: 0, voters: { warm: -40 } } },
          critfail: { body: "你说完就赶着去下个场，被拍到看表。本地小报配了句刻薄话。", effects: { rep: -0.1, fac: { base: -2 }, voters: { oppose: 120 } } }
        }
      }
    ]
  },

  {
    id: "chore_ribbon", brief: { lede: "翻新图书馆开张，志愿者就差一个剪彩的人。", known: ["他们图的不是你讲话，是你到场。", "顺手帮敲募款的门，能把事办实。", "送花篮缺席省事，却冷了现场的心。"], unknown: ["露面是加分，被拍到敷衍则减分。"] }, grade: "minor", category: "govt",
    valence: "boon", dyn: true, chore: true, tierRaw: true, tierMin: 0, tierMax: 2, weight: 7,
    minYear: 1980, maxYear: 1999, medium: ["print", "tv"],
    title: "社区活动中心翻新剪彩，就差一个剪彩的人",
    body: "在{PLACE}，一座翻新的图书馆侧翼要开张，志愿者举着剪刀等你到场。他们不图你说话，图的是「来了，就说明这事被当回事」。",
    choices: [
      {
        id: "show", text: "到场剪彩，顺便帮志愿者把募款的门挨家敲开",
        base: 0.54, mods: [{ src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你挽起袖子帮着跑了一下午，照片上了本地报，街坊都说「这人实在」。", effects: { rep: 0.35, fac: { base: 5 }, voters: { warm: 450, diehard: 80 } } },
          ok: { body: "你剪了彩、说了几句，帮着敲了两家的门。", effects: { rep: 0.2, voters: { warm: 280 } } },
          meh: { body: "你到场露了面，流程走完就走了。", effects: { rep: 0.1, voters: { warm: 120 } } },
          fail: { body: "你迟到半小时，剪彩早散了，志愿者还得专门给你再拉一次横幅。", effects: { rep: 0, voters: { warm: -50 } } },
          critfail: { body: "你在镜头前把功劳说成了自己的，忘了这项目是居民筹了两年款。有人当场黑脸。", effects: { rep: -0.1, fac: { base: -2 }, voters: { oppose: 140 } } }
        }
      },
      {
        id: "send", text: "实在脱不开身，送一副署名花篮去",
        base: 0.68, mods: [{ src: "attr", key: "INT", w: 0.25 }],
        outcomes: {
          crit: { body: "花篮上的话写得恰到好处，人们记住了你的周到。", effects: { rep: 0.2, voters: { warm: 200 } } },
          ok: { body: "花篮到位，你缺席得还算体面。", effects: { rep: 0.1, voters: { warm: 90 } } },
          meh: { body: "花篮被夸了两句，没人特别在意是谁送的。", effects: { rep: 0.05 } },
          fail: { body: "缺席还是被提了一句：「这种场合他都没来」。", effects: { rep: 0, voters: { warm: -40 } } },
          critfail: { body: "花篮署名卡写错了机构名字，成了本地笑话。", effects: { rep: -0.1, fac: { base: -2 }, voters: { oppose: 110 } } }
        }
      }
    ]
  },

  {
    id: "chore_beat", brief: { lede: "警察工会请你「体验一晚夜班巡逻」。", known: ["名义是了解一线，实为给配合者发奖状。", "真跟一条街能听见巷子里的真话。", "婉谢让给同僚不得罪，也丢了这张脸。"], unknown: ["作秀感若被看穿，反而丢了体面。"] }, grade: "minor", category: "govt",
    valence: "boon", dyn: true, chore: true, tierRaw: true, tierMin: 0, tierMax: 2, weight: 6,
    minYear: 1980, maxYear: 1999, medium: ["print"],
    title: "跟夜班巡警走一条街",
    body: "{CITY}的警察工会照例邀请民意代表「体验一晚巡逻」。理由冠冕：了解一线。实际是工会在给配合它的人发奖状。",
    choices: [
      {
        id: "walk", text: "真跟着走一条街，听巡警讲巷子里的事",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你听了一肚子一线的委屈，回头替警局要来了加人预算，工会记你这份实诚。", effects: { rep: 0.35, fac: { base: 4, military: 2 }, voters: { warm: 420, diehard: 70 } } },
          ok: { body: "你走了一晚，握了不少手，照片上了本地报社会版。", effects: { rep: 0.2, voters: { warm: 260 } } },
          meh: { body: "你跟着转了一圈，什么都没懂，也没说错话。", effects: { rep: 0.1, voters: { warm: 100 } } },
          fail: { body: "遇到一桩家暴警情，你的在场帮了倒忙，巡警心里有气。", effects: { rep: 0, voters: { warm: -50 } } },
          critfail: { body: "你嫌累中途上了自备的车溜了，被巡警当同事吐槽上了本地电台。", effects: { rep: -0.1, fac: { base: -2 }, voters: { oppose: 130 } } }
        }
      },
      {
        id: "decline", text: "婉谢：把这份体面让给更想露脸的同僚",
        base: 0.67, mods: [{ src: "attr", key: "CUN", w: 0.25 }],
        outcomes: {
          crit: { body: "你低调让贤，同领了人情，警界还觉得你「不争」。", effects: { rep: 0.15, fac: { establishment: 2 }, voters: { warm: 120 } } },
          ok: { body: "你客气推了，工会没往心里去。", effects: { rep: 0.05 } },
          meh: { body: "你缺席了这件小事，无人在意。", effects: {} },
          fail: { body: "工会把「连巡逻都不肯来」记进了对你的分类。", effects: { rep: 0, fac: { base: -1 }, voters: { warm: -40 } } },
          critfail: { body: "接替你的同僚在巡逻里出了风头，回头你在他阴影里更显冷清。", effects: { rep: -0.1, voters: { oppose: 100 } } }
        }
      }
    ]
  },

  {
    id: "chore_dispute", brief: { lede: "两家邻居为一堵篱笆吵到你办公室。", known: ["一位是拉过票的老住户，一位是新搬来的。", "泡咖啡劝各退一步赌人情。", "翻地契按规矩断赌法理，却伤情面。"], unknown: ["偏了哪头，那头就记你一账。"] }, grade: "minor", category: "govt",
    valence: "boon", dyn: true, chore: true, tierRaw: true, tierMin: 0, tierMax: 2, weight: 6,
    minYear: 1980, maxYear: 1999,
    title: "两家邻居为一堵篱笆吵到你办公室",
    body: "在{PLACE}，一位是给你拉过票的老住户，一位是刚搬来的年轻家庭。两家人为几寸地界争得脸红脖子粗，都要你「评评理」。",
    choices: [
      {
        id: "mediate", text: "泡两杯咖啡，把两边拉一块儿各退一步",
        base: 0.56, mods: [{ src: "attr", key: "CHA", w: 0.35 }],
        outcomes: {
          crit: { body: "你三言两语把篱笆的事说开，两家握手，邻里都说「还是得找他说理」。", effects: { rep: 0.3, fac: { base: 4 }, voters: { warm: 360, oppose: -150 } } },
          ok: { body: "两边各让了半步，事算平了。", effects: { rep: 0.22, voters: { warm: 200 } } },
          meh: { body: "你劝了半天，两家嘴上应了，回头还在瞪。", effects: { rep: 0.05, voters: { warm: 60 } } },
          fail: { body: "你偏向老住户那一边，年轻家庭觉得这办公室不公道。", effects: { rep: 0, voters: { oppose: 120 } } },
          critfail: { body: "你一句话没说好，两家调转枪口一致怪你「和稀泥和出个偏心」。", effects: { rep: -0.1, fac: { base: -2 }, voters: { oppose: 160 } } }
        }
      },
      {
        id: "rule", text: "翻出地契条文，按规矩给个了断",
        base: 0.66, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你查清界址、依法裁定，输的一方也服气「他讲的是理」。", effects: { rep: 0.25, fac: { establishment: 2 }, voters: { warm: 220 } } },
          ok: { body: "你按规矩断了，虽是硬办法，胜在公道。", effects: { rep: 0.2, voters: { warm: 100 } } },
          meh: { body: "条文念完，两边都不太满意，但都无话可说。", effects: { rep: 0.05 } },
          fail: { body: "你的裁定被其中一家骂「拿着法条压老街坊」。", effects: { rep: 0, voters: { oppose: 110 } } },
          critfail: { body: "你把条文记错了，两家抓住把柄闹到上峰那儿，你里外不是人。", effects: { rep: -0.15, fac: { establishment: -2 }, voters: { oppose: 150 } } }
        }
      }
    ]
  },

  /* ================= 市政 T2–4：坐进市政厅 ================= */
  {
    id: "chore_clinic", brief: { lede: "每周接待日，一屋子人来讨说法。", known: ["不少人不是要解决，是要有人肯听。", "逐个坐下来能真办成几件，最耗神。", "编成办事指南交助手，省事却远了距离。"], unknown: ["敷衍被看穿，善事也办成怨气。"] }, grade: "minor", category: "govt",
    valence: "boon", dyn: true, chore: true, tierRaw: true, tierMin: 2, tierMax: 4, weight: 6,
    minYear: 1980, maxYear: 1999, medium: ["print", "tv"],
    title: "选民服务接待日：一屋子人来讨说法",
    body: "每周的接待日，{CITY}的队伍排到门外：丢了补助的、被税务局缠上的、孩子进不了学区班的。他们不都要你解决问题，要的是「有人肯听」。",
    choices: [
      {
        id: "case", text: "一个个坐下来办：打电话、追进度、把事真办成几件",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你硬是替几户人家讨回了补助，口碑一传十：「这个位子有人办事」。", effects: { rep: 0.4, fac: { base: 5 }, voters: { warm: 500, diehard: 100, oppose: -200 } } },
          ok: { body: "你办成了几件，办不成的也给了明白回话。", effects: { rep: 0.25, voters: { warm: 320 } } },
          meh: { body: "你接待了一整天，真正办成的没几件，但没人觉得被怠慢。", effects: { rep: 0.1, voters: { warm: 140 } } },
          fail: { body: "你把一件要紧的个案记漏了，那家人在报上抱怨「叫天天不应」。", effects: { rep: 0, fac: { press: -2 }, voters: { oppose: 140 } } },
          critfail: { body: "你承诺的追踪石沉大海，被追问的选民撂下一句「下次投票见」。", effects: { rep: -0.15, voters: { oppose: 220 } } }
        }
      },
      {
        id: "refer", text: "把能办的编成一份办事指南，交助手系统跟进",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你把重复的诉求归了档、办了流程，接待日第一次不那么手忙脚乱。", effects: { rep: 0.25, fac: { establishment: 3 }, voters: { warm: 260 } } },
          ok: { body: "你把常办的事理成了清单，效率上来了，人情味稍淡。", effects: { rep: 0.15, voters: { warm: 140 } } },
          meh: { body: "有了手册，可人们还是想亲自见你说一句。", effects: { rep: 0.05 } },
          fail: { body: "助手跟进不力，几份表格石沉大海，抱怨回到了你头上。", effects: { rep: 0, voters: { oppose: 100 } } },
          critfail: { body: "手册成了「踢皮球」的新代名词，有人说你连面都不肯露了。", effects: { rep: -0.15, fac: { base: -2 }, voters: { oppose: 160 } } }
        }
      }
    ]
  },

  {
    id: "chore_budget", brief: { lede: "要不要花钱修西桥，听证会上各有说法。", known: ["到场有货运工会、沿河商户和桥下住户。", "让每方说完再逐条回应稳，却拖。", "亮方案强推痛快，也得罪慢的人。"], unknown: ["压不住场，一场听证能吵成站队。"] }, grade: "minor", category: "govt",
    valence: "boon", dyn: true, chore: true, tierRaw: true, tierMin: 2, tierMax: 4, weight: 6,
    minYear: 1980, maxYear: 1999, medium: ["print"],
    title: "一场关于是否修补西桥的预算听证",
    body: "镇上的老桥年年漏、年年修，今年要定一笔钱。来作证的有货运工会、沿河商户，还有一位举着「桥下是我们家」标语的住户。",
    choices: [
      {
        id: "listen", text: "让每一方都说完，你再逐条回应关切",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你耐心听完、逐条回话，几方都觉得被当回事，决议顺理成章。", effects: { rep: 0.3, fac: { base: 4, commercial: 2 }, voters: { warm: 380 } } },
          ok: { body: "你主持得体，各方意见都有了着落。", effects: { rep: 0.22, voters: { warm: 200 } } },
          meh: { body: "听证开了三小时，最后什么也没定，但你没得罪谁。", effects: { rep: 0.05 } },
          fail: { body: "你让一方明显占了上风，落败那方记了你的偏。", effects: { rep: 0, voters: { oppose: 120 } } },
          critfail: { body: "你在自己心虚的地方念错了数字，被商户当场抓住，听证会成了一场公开纠错。", effects: { rep: -0.15, fac: { press: -2 }, voters: { oppose: 160 } } }
        }
      },
      {
        id: "push", text: "亮出方案强推：桥要修，钱这么花",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你力排众议把修桥案推了过去，货运与商户都欠你一个「敢拍板」。", effects: { rep: 0.25, fac: { commercial: 5, establishment: 3 }, voters: { diehard: 90 } } },
          ok: { body: "方案过了，反对声没散，但你办成了事。", effects: { rep: 0.15, fac: { commercial: 3, establishment: 1 }, voters: { diehard: 40 } } },
          meh: { body: "强推过了，可没人觉得被尊重，掌声稀稀拉拉。", effects: { rep: 0.05 } },
          fail: { body: "你硬推的方案在表决中被翻盘，你白站了一回台。", effects: { rep: 0, voters: { oppose: 130 } } },
          critfail: { body: "你强推的桥被查出预算有猫腻，「是谁在替施工方说话」的问号落到了你头上。", effects: { rep: -0.15, fac: { establishment: -2 }, voters: { oppose: 200 } } }
        }
      }
    ]
  },

  {
    id: "chore_school", brief: { lede: "小学读报活动，请你上一堂「公民课」。", known: ["一屋十岁孩子，问什么都有可能。", "认真讲透「政府干什么」最出彩。", "只念故事签书省力，也能出好照片。"], unknown: ["童言直问，一句含糊会被学回家。"] }, grade: "minor", category: "govt",
    valence: "boon", dyn: true, chore: true, tierRaw: true, tierMin: 2, tierMax: 5, weight: 6,
    minYear: 1980, maxYear: 1999, medium: ["print", "tv"],
    title: "小学的读报活动，请你来上一堂「公民课」",
    body: "{CITY}的校报小读者活动，老师把你请进教室，让一群十岁孩子问关于「当官」的一切问题。这活儿没风险，却也藏着一张好照片。",
    choices: [
      {
        id: "teach", text: "认真上一堂，讲清楚「政府到底是干什么的」",
        base: 0.66, mods: [{ src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你讲得孩子眼睛发亮，老师把你那节课留下了教案——家长的群聊里都是你的名字。", effects: { rep: 0.35, fac: { base: 5, church: 2 }, voters: { warm: 400, diehard: 60 } } },
          ok: { body: "一堂轻松的课，孩子喜欢，家长觉得你可亲。", effects: { rep: 0.2, voters: { warm: 240 } } },
          meh: { body: "你讲了，孩子闹，照片拍得还行。", effects: { rep: 0.1, voters: { warm: 100 } } },
          fail: { body: "有家长投诉你在课堂上夹带了政治广告。", effects: { rep: 0, voters: { oppose: 120 } } },
          critfail: { body: "你想借孩子拍照，被一位家长当场指为「把课堂当竞选场」。", effects: { rep: -0.15, fac: { base: -2 }, voters: { oppose: 160 } } }
        }
      },
      {
        id: "read", text: "就念一段故事、签几张书，别的不碰",
        base: 0.68, mods: [{ src: "attr", key: "INTG", w: 0.25 }],
        outcomes: {
          crit: { body: "你亲切念完、耐心签名，简单却讨喜。", effects: { rep: 0.2, voters: { warm: 220 } } },
          ok: { body: "你念了故事、签了书，孩子很开心。", effects: { rep: 0.15, voters: { warm: 120 } } },
          meh: { body: "一堂普通的读书活动，你只是来了、走了。", effects: { rep: 0.05 } },
          fail: { body: "你念得干巴巴，孩子走神，老师客气地谢了场。", effects: { rep: 0 } },
          critfail: { body: "你在孩子面前说错一句话，被童言无忌地复述给家长，格外难听。", effects: { rep: -0.1, fac: { base: -2 }, voters: { oppose: 110 } } }
        }
      }
    ]
  },

  /* ================= 州级 T4–6：全州巡回 ================= */
  {
    id: "chore_state_tour", brief: { lede: "州情咨文后一周地方巡回，一天转三个县。", known: ["媒体要标题，党部要人头，你要别累垮。", "笑走每站铺开声量，最耗体力。", "砍两站深扎一处出内容，却失曝光。"], unknown: ["被拍到呵欠连天，巡回反成负报道。"] }, grade: "minor", category: "govt",
    valence: "boon", dyn: true, chore: true, tierRaw: true, tierMin: 4, tierMax: 6, weight: 5,
    minYear: 1980, maxYear: 1999, medium: ["print", "tv", "radio"],
    title: "州情咨文后的一周地方巡回",
    body: "你的一场演讲要落到地方：一天转三个县，剪彩、午餐、圆桌。{PUB}想要标题，县党部想要人头，你自己只想要一张疲惫的脸别被拍到。",
    choices: [
      {
        id: "grin", text: "笑脸走完每一站，把话说到每个县的痛点上",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.35 }],
        outcomes: {
          crit: { body: "你一天三站滴水不漏，几个县的报纸头版都是你，党部把你当成能扛票的人。", effects: { rep: 0.4, fac: { establishment: 4, base: 3 }, voters: { warm: 520, diehard: 90 } } },
          ok: { body: "巡回顺利，几个县的基层都被你扫了一遍。", effects: { rep: 0.25, voters: { warm: 320 } } },
          meh: { body: "你笑着赶完了场，累得没留下什么印象。", effects: { rep: 0.1, voters: { warm: 140 } } },
          fail: { body: "有一站你明显撑不住，讲了句敷衍的话，地方报把它印了出来。", effects: { rep: 0, fac: { press: -2 }, voters: { oppose: 120 } } },
          critfail: { body: "最后一站你当众呵欠连天被拍下，标题是「他心不在焉」。", effects: { rep: -0.15, fac: { press: -3 }, voters: { oppose: 170 } } }
        }
      },
      {
        id: "deep", text: "砍掉两站，只在一处扎下去认真聊一上午",
        base: 0.64, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你在一处挖出了真问题，回州议会带回了有分量的案子，那地界从此是你的铁票。", effects: { rep: 0.3, fac: { base: 4 }, voters: { diehard: 100, warm: 300 } } },
          ok: { body: "你把一处聊透了，只是曝光少了两站。", effects: { rep: 0.2, voters: { warm: 200 } } },
          meh: { body: "你聊了一上午，州里没人在意少了两个县。", effects: { rep: 0.1 } },
          fail: { body: "被砍掉的两站县党部来电话问「为什么不来」。", effects: { rep: 0, fac: { establishment: -2 }, voters: { oppose: 110 } } },
          critfail: { body: "你厚此薄彼被放大成政治信号，落选的几县联名向党部抱怨。", effects: { rep: -0.15, fac: { establishment: -3 }, voters: { oppose: 160 } } }
        }
      }
    ]
  },

  {
    id: "chore_flood", brief: { lede: "上游泄洪迟了一步，几个镇被泡了。", known: ["人已撤出，损失要有人看、有人表态。", "赶赴现场赌执行力，也赌镜头前失态。", "坐镇后方催补助，钱实却缺了露面人情。"], unknown: ["去不去都可能错：像作秀，或像缺席。"] }, grade: "minor", category: "govt",
    valence: "boon", dyn: true, chore: true, tierRaw: true, tierMin: 4, tierMax: 6, weight: 5,
    minYear: 1980, maxYear: 1999, medium: ["print", "tv"],
    title: "上游泄洪，几个镇被泡了",
    body: "雨下了三天，河道管理处的泄洪通知迟了一步。几个镇进水，人撤出来了，可损失要有人来看着、有人来表态。州里的镜头已上路。",
    choices: [
      {
        id: "response", text: "第一时间赶赴现场，协调救援与联邦补助",
        base: 0.54, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你把救灾与补助跑得漂亮，灾民说「关键时候他真来了」，州里也记下你的执行力。", effects: { rep: 0.4, fac: { establishment: 4, base: 4 }, voters: { warm: 500, diehard: 80 } } },
          ok: { body: "你在现场协调有方，救灾没出乱子。", effects: { rep: 0.25, voters: { warm: 300 } } },
          meh: { body: "你去了，站在边上，帮不上大忙，但至少在场。", effects: { rep: 0.1, voters: { warm: 120 } } },
          fail: { body: "你的调度慢半拍，有镇长当面数落「州里就这效率」。", effects: { rep: 0, fac: { establishment: -2 }, voters: { oppose: 130 } } },
          critfail: { body: "镜头前你被拍到踩泥地却不伸手的模样，灾民的话第二天上了报。", effects: { rep: -0.15, fac: { press: -3, base: -2 }, voters: { oppose: 180 } } }
        }
      },
      {
        id: "fund", text: "坐镇后方，全力催办联邦救灾补助的文书",
        base: 0.65, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你把补助款一笔笔要了回来，钱比人先到，镇上念你的实诚。", effects: { rep: 0.25, fac: { base: 3, agency: 4, establishment: 2 }, voters: { warm: 260 } } },
          ok: { body: "文书跑通，钱陆续到位，只是没见到你的面。", effects: { rep: 0.15, fac: { agency: 2 }, voters: { warm: 160 } } },
          meh: { body: "钱办了，人在后方，存在感低了些。", effects: { rep: 0.1 } },
          fail: { body: "有灾民觉得「他连来都没来一趟」，钱到了人情没到。", effects: { rep: 0, voters: { oppose: 110 } } },
          critfail: { body: "补助迟迟批不下来，你把话放得太满，落空的灾民把账算到你头上。", effects: { rep: -0.15, fac: { press: -2 }, voters: { oppose: 170 } } }
        }
      }
    ]
  },

  /* ================= 联邦 T6+：选区服务的国家机器 ================= */
  {
    id: "chore_casework", brief: { lede: "联邦办公室的求助信堆成了山。", known: ["选区人把你当「在首都说得上话的人」。", "亲自盯最难的几封易办成，也易打包票。", "成立小组出清单治本，慢却像花架子。"], unknown: ["大话放出去却落空，反成对手弹药。"] }, grade: "minor", category: "govt",
    valence: "boon", dyn: true, chore: true, tierRaw: true, tierMin: 6, tierMax: 9, weight: 5,
    minYear: 1980, maxYear: 1999, medium: ["print", "tv", "radio"],
    title: "联邦选区办公室的求助信堆成了山",
    body: "社保断缴、签证卡壳、退伍军人领不到补助——华盛顿的官僚把普通人卡得死去活来，{CITY}的人写信找你这位「在首都说得上话的人」。",
    choices: [
      {
        id: "fix", text: "把最难的几封亲自盯下来，逼联邦部门给答复",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你打通几个死结，受助人专程道谢，本地报把你写成「替选区跟联邦掰腕子的人」。", effects: { rep: 0.4, fac: { base: 5 }, voters: { warm: 520, diehard: 110, oppose: -200 } } },
          ok: { body: "你办成了不少件，联邦那些机器多少领了你的情。", effects: { rep: 0.25, voters: { warm: 340 } } },
          meh: { body: "你盯了一圈，官僚动得慢，但没人觉得你袖手。", effects: { rep: 0.1, voters: { warm: 150 } } },
          fail: { body: "有案子你打包票却办砸了，受助人觉得被辜负。", effects: { rep: 0, fac: { press: -2 }, voters: { oppose: 130 } } },
          critfail: { body: "你越级施压，反被联邦甩回一句「程序问题」，你的大话和落空一起上了报。", effects: { rep: -0.15, fac: { establishment: -2 }, voters: { oppose: 180 } } }
        }
      },
      {
        id: "system", text: "成立专项小组，把常见堵点整理成一份联邦整改清单",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你把零零碎碎的求助汇成一份能推到委员会的清单，治标之外顺带治了点本。", effects: { rep: 0.3, fac: { establishment: 3 }, voters: { warm: 320 } } },
          ok: { body: "小组把杂事理顺了，效率见长。", effects: { rep: 0.2, voters: { warm: 180 } } },
          meh: { body: "清单列好了，可人们还是想有人替他们打一打电话。", effects: { rep: 0.1 } },
          fail: { body: "小组只产出了报告，没产出结果，有人骂「花架子」。", effects: { rep: 0, voters: { oppose: 110 } } },
          critfail: { body: "你的整改清单被官僚系统原样退回，「连自己选区的事都办不动」成了对手的新弹药。", effects: { rep: -0.15, fac: { establishment: -2 }, voters: { oppose: 160 } } }
        }
      }
    ]
  },

  {
    id: "chore_townhall", brief: { lede: "回选区开市民大会，五百人坐满体育馆。", known: ["有人质问，有人只看你还认不认乡音。", "来者不拒逐个答最见坦率，也最易被问倒。", "只讲准备好的三件事稳，却被嫌念稿。"], unknown: ["被本区数字问倒，沉默会被循环播。"] }, grade: "minor", category: "govt",
    valence: "boon", dyn: true, chore: true, tierRaw: true, tierMin: 6, tierMax: 9, weight: 5,
    minYear: 1980, maxYear: 1999, medium: ["tv", "radio", "print"],
    title: "回选区开一场市民大会",
    body: "{DISTRICT}的体育馆里坐了五百人，麦克风在传，有人质问、有人诉苦、有人纯粹来看你这个「去了华盛顿的人」还认不认老家的口音。",
    choices: [
      {
        id: "engage", text: "来者不拒，一个一个把话筒下的问题答完",
        base: 0.58, mods: [{ src: "attr", key: "CHA", w: 0.35 }],
        outcomes: {
          crit: { body: "你答得实在又镇得住场，散会时人们说「他还是本地人」。", effects: { rep: 0.4, fac: { base: 5 }, voters: { warm: 500, diehard: 100 } } },
          ok: { body: "你扛住了几轮追问，气氛有惊无险。", effects: { rep: 0.25, voters: { warm: 300 } } },
          meh: { body: "你答了个把小时，有人满意有人没解气。", effects: { rep: 0.1, voters: { warm: 140 } } },
          fail: { body: "一个刁钻问题把你问僵了，那阵沉默被录了下来。", effects: { rep: 0, fac: { press: -2 }, voters: { oppose: 130 } } },
          critfail: { body: "你被一个本区的具体数字问倒，脱口「回头查」，哄堂的笑声第二天在电台循环。", effects: { rep: -0.15, fac: { press: -3 }, voters: { oppose: 190 } } }
        }
      },
      {
        id: "prepared", text: "把话讲在准备好的三件事上，稳住框架不上当",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你滴水不漏地把话题按在成绩上，一场大会变成一次漂亮的述职。", effects: { rep: 0.3, fac: { establishment: 3 }, voters: { warm: 300 } } },
          ok: { body: "你稳稳讲完，没给对手留话柄。", effects: { rep: 0.2, voters: { warm: 160 } } },
          meh: { body: "你背熟了稿子，人们礼貌地听完。", effects: { rep: 0.1 } },
          fail: { body: "有人喊「别念稿」，你越回避越显得心虚。", effects: { rep: 0, voters: { oppose: 110 } } },
          critfail: { body: "你反复打太极，台下有人起头鼓掌把你轰下台，本地电视台全播了出去。", effects: { rep: -0.15, fac: { press: -3 }, voters: { oppose: 170 } } }
        }
      }
    ]
  },

  {
    id: "chore_vetvisit", brief: { lede: "退伍军人医院请你「英雄日」露个面。", known: ["他们要联邦的一双耳朵，你要一张握手照。", "真听并带回补助案，赢「靠得住」。", "只讲得体致敬稳，却像走过场。"], unknown: ["当拍照背景被老兵当场说穿，最伤。"] }, grade: "minor", category: "govt",
    valence: "boon", dyn: true, chore: true, tierRaw: true, tierMin: 6, tierMax: 9, weight: 5,
    minYear: 1980, maxYear: 1999, medium: ["print", "tv"],
    title: "退伍军人医院的一次例行探访",
    body: "退伍军人医院邀请你在「英雄日」露个面。他们要的是联邦层面的一双耳朵，你要的是这张与老兵握手、听他们讲话的照片。",
    choices: [
      {
        id: "honor", text: "认真听几个老兵讲完，替他们把难办的补助带回华盛顿",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你记下了几个人的编号，回国会真的把案子递了上去，老兵组织把「靠得住」记在了你名下。", effects: { rep: 0.35, fac: { base: 5, military: 4 }, voters: { warm: 440, diehard: 90 } } },
          ok: { body: "你听得认真，也带回了话，没做成大事实。", effects: { rep: 0.2, voters: { warm: 260 } } },
          meh: { body: "你露了面、握了手、拍了照，流程走完。", effects: { rep: 0.1, voters: { warm: 120 } } },
          fail: { body: "你把带回的案子丢在了桌上，老兵协会的电话打到了你办公室。", effects: { rep: 0, fac: { military: -2 }, voters: { oppose: 120 } } },
          critfail: { body: "你把这场探访纯粹当成拍照背景，被一位拄拐的老兵当面说穿。", effects: { rep: -0.15, fac: { press: -3, military: -3 }, voters: { oppose: 170 } } }
        }
      },
      {
        id: "brief", text: "只讲一段得体的致敬，不打扰病人的安静",
        base: 0.66, mods: [{ src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你话不多却暖心，医院和家属都觉得你分寸好。", effects: { rep: 0.25, voters: { warm: 240 } } },
          ok: { body: "你简短致敬，得体收场。", effects: { rep: 0.15, voters: { warm: 120 } } },
          meh: { body: "你念完悼词式的一段话就走了，没出错。", effects: { rep: 0.05 } },
          fail: { body: "有人说你「来了又走，什么也没留下」。", effects: { rep: 0, voters: { oppose: 90 } } },
          critfail: { body: "你把致敬讲得浮夸，与病房里的真实苦难相形见绌，照片配文格外刺眼。", effects: { rep: -0.15, fac: { press: -2 }, voters: { oppose: 150 } } }
        }
      }
    ]
  }
]);
