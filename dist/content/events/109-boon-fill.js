/* ============================================================================
 * CONTENT · events/109-boon-fill.js
 * 新人机遇补给包：为「1980/1990/2001/2016」这 4 个
 * 原本新人可及 boon 池为空的时代，各补一张 tierMin:0 的时代风味机遇卡。
 * （pre-1980 死时代的 boon 卡已随时代一并清理。）
 *
 * 为什么要它们：两段式抽取里，某时代某量级若抽不到 boon，会静默降级到 risk
 * （见 engine/events.js 的 VAL_CHAIN）——玩家掷中「机遇」却拿到「风险」，
 * 好运气被吞掉。每张时代至少要有新人够得着的机遇，才谈得上「该发生就能发生」。
 *
 * 三值性铁律：boon 卡基调正面即可——engine/scale.js 的 shapeByValence 会在结算时
 * 抹平任何下行（删 cost、负值归零），所以这里放心写小便宜、小引荐、小好运。
 * 经济：dyn:true，fun 一律写成系数（结算时 × 人物标尺），不写绝对金额。
 * ==========================================================================*/

POTUS.define("event", [

  /* ------------------------------------------------------------------------
   * 6) 1980 里根浪潮 —— 新兴草根组织急着找张年轻的脸
   * ---------------------------------------------------------------------- */
  {
    id: "boon1980_grassroots", grade: "minor", category: "career",
    valence: "boon", dyn: true,
    era: ["1980_REAGAN"], tierMin: 0, tierMax: 2, weight: 10,
    brief: {
      lede: "一股新风吹遍全国,急着在每个小镇找一张能代表它的年轻面孔——他们找上了你。",
      known: [
        "一个刚成型的税改/基层动员组织,有钱有新想法,唯独缺一个本地信得过的人来牵头。",
        "他们看中的是你「不是老党建那套」。搭上这班车,你要么被吹起来,要么被甩下去。"
      ]
    },
    title: "一个新崛起的草根组织请你来牵头本地运动",
    body: "组织者把一叠空白活动申请表推给你:「我们要的是自己人。你要不要,和我们一起把这座城翻个个儿?」",
    choices: [
      {
        id: "ride_wave",
        text: "上车：牵头本地的新运动", note: "站到浪尖或摔下浪头——赌的是选民和草根班底，押上的是身家。",
        base: 0.42,
        mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "attr", key: "CUN", w: 0.2 }],
        outcomes: {
          crit: { body: "你把一场地方动员办成全国样板,年轻的脸被写进这波浪潮的史书——捐款、志愿者、地方党部一夜之间全归你调度。", effects: { rep: 1.4, fac: { base: 14 }, voters: { warm: 600, diehard: 120 }, fun: 0.4, attr: { CHA: 2 } } },
          ok: { body: "你成了本地新运动的名字,捐款和志愿者源源而来。", effects: { rep: 0.8, fac: { base: 9 }, voters: { warm: 300 } } },
          meh: { body: "上了车,但还在后座,前排是别人的。", effects: { fac: { base: 4 }, voters: { warm: 60 } } },
          fail: { body: "热潮里你慢了半拍,风头被更激进的人抢走,建制派趁机说你「煽动」。", effects: { rep: -0.5, fac: { establishment: -3 }, voters: { oppose: 200 } } },
          critfail: { body: "运动翻车,你被贴上手递贴子的标签——不过年轻,重来的本钱还有。", effects: { rep: -1.2, fac: { base: -4, establishment: -4 }, voters: { oppose: 500 }, attr: { CUN: -2 } } }
        }
      },
      {
        id: "keep_own_brand",
        text: "合作但不入伙：借势,不押身家", note: "风口上站稳自己的桩——回报不大,但几乎不会输。",
        base: 0.80,
        mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "你借到了活动的资源,却没被任何一方的胜负绑住。风过后,你还站在原地,名字干干净净。", effects: { rep: 0.9, fac: { establishment: 3 }, attr: { CUN: 2 } } },
          ok: { body: "合作愉快,进退自如。", effects: { rep: 0.5, fac: { base: 5 } } },
          meh: { body: "你既没大赚也没受损。", effects: { fac: { base: 2 } } },
          fail: { body: "两头都不太信你「骑墙」,好处少了点。", effects: { fac: { establishment: -1 } } },
          critfail: { body: "太谨慎让你错过了一班车,可也躲过了后来的翻车。", effects: { attr: { CUN: 1 }, rep: -0.2 } }
        }
      },
      {
        id: "cash_out",
        text: "顺水推舟：把这场风变成自己的本钱", note: "风口最肥的是变现。钱到手了,「自己人」的光环也就淡了。",
        base: 0.58,
        mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "你把自己摆在赞助人和组织者中间,抽成了厚厚一层。商界的门从此为你而开——只是草根开始嘀咕你「不是自己人」。", effects: { fun: 1.6, fac: { commercial: 8, base: -2 }, rep: 0.3 } },
          ok: { body: "一场风下来,账面好看了不少。", effects: { fun: 0.9, fac: { commercial: 5 } } },
          meh: { body: "小捞一笔,不算丢人。", effects: { fun: 0.3 } },
          fail: { body: "风停了,只剩你手里一堆没人承情的关系。", effects: { fun: 0.1, fac: { base: -3, establishment: -2 }, voters: { oppose: 120 } } },
          critfail: { body: "吃相被人拍了下来,「趁火打劫」四个字跟着你——现金到手,名声和良心一起掉了。", effects: { fun: 0.2, rep: -1.0, fac: { base: -6, establishment: -3 }, attr: { INTG: -2 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 7) 1990 海湾战争 —— 团结氛围里,退伍军人组织请你主事
   * ---------------------------------------------------------------------- */
  {
    id: "boon1990_homecoming", grade: "minor", category: "general",
    valence: "boon", dyn: true,
    era: ["1990_GULF"], tierMin: 0, tierMax: 2, weight: 10,
    brief: {
      lede: "全国都在给沙漠里的子弟兵点烛。本地退伍军人协会想办一场欢迎仪式，缺个牵头人。",
      known: [
        "这是一场「谁都不反对」的活动:团结、体面、还上电视。协会想把这么一顶帽子戴在一个新人头上。",
        "他们挑人的标准是「别把它办成党派活动」。你若接,就把全国的镜头借到本地一分钟。"
      ]
    },
    title: "退伍军人协会请你主办一场欢迎凯旋军人的仪式",
    body: "协会老兵拍你肩膀:「我们不想要政客,想要个还相信这套的人。就你吧。」",
    choices: [
      {
        id: "host_rally",
        text: "主办这场凯旋仪式",
        note: "团结的时刻,站在人群中央的人会被记住。",
        base: 0.7,
        mods: [{ src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "仪式办得庄重又热烈,本地电视转播了你那句「欢迎回家」。那一分钟,你是一座城的脸。", effects: { rep: 1.3, fac: { base: 11, press: 4 }, attr: { CHA: 2 } } },
          ok: { body: "活动圆满,军属和社区都记你的情。", effects: { rep: 0.7, fac: { base: 8 } } },
          meh: { body: "办成了,只是没出什么水花。", effects: { fac: { base: 4 } } },
          fail: { body: "音响坏了一下,流程乱了半拍,但心意到了。", effects: { fac: { base: 3 } } },
          critfail: { body: "有家属嫌规格太简,当面数落了你——但你没躲,站在那听完了。", effects: { attr: { CHA: 1, INTG: 1 } } }
        }
      },
      {
        id: "behind_scenes",
        text: "低调张罗,把话筒让给军人家属",
        note: "不抢功的操盘手,往往攒的是最长的人情。",
        base: 0.72,
        mods: [{ src: "attr", key: "INTG", w: 0.3 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "你把舞台让给了真正该站上去的人。老兵和家属们私下认定:「这人靠得住,不图自己。」", effects: { rep: 0.9, fac: { base: 13 }, attr: { INTG: 2 } } },
          ok: { body: "仪式因这份谦逊更动人,你也收获了实打实的基层好感。", effects: { rep: 0.5, fac: { base: 8 } } },
          meh: { body: "没人特别记得你,但也没人有怨言。", effects: { fac: { base: 4 } } },
          fail: { body: "低调过头,媒体几乎没提组织者是谁。", effects: { fac: { base: 3 } } },
          critfail: { body: "你把功劳全让了出去,自己像没来过——可老兵们心里记着账。", effects: { attr: { INTG: 2 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 8) 2001 反恐时代 —— 国难当头,社区推你协调互助
   * ---------------------------------------------------------------------- */
  {
    id: "boon2001_firstresponder", grade: "minor", category: "general",
    valence: "boon", dyn: true,
    era: ["2001_WARONTERROR"], tierMin: 0, tierMax: 2, weight: 10,
    brief: {
      lede: "天塌下来的那几天,人人都在问「我能做点什么」。有人回答:「去找他,他在张罗。」",
      known: [
        "本地应急协调乱成一团:献血、捐物、找失联亲属、安抚恐慌。社区缺一个愿意站出来把事理顺的人。",
        "这不是竞选,是救灾。谁在这种时候扛起担子,谁的名字就和「靠得住」绑一辈子。"
      ]
    },
    title: "危机那几天，社区推你出来牵头应急互助",
    body: "消防工会、教堂、学校校长,几个人凑到一起说:「我们不认得大人物,只认得你会办事。这摊,你带个头。」",
    choices: [
      {
        id: "coordinate_relief",
        text: "牵头社区应急协调",
        note: "灾难里办成的事,和平年代十倍偿还。",
        base: 0.68,
        mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "attr", key: "INTG", w: 0.2 }],
        outcomes: {
          crit: { body: "你把一团乱麻理成了献血队、物资站、寻亲热线。镇上的人说,那几天是你在撑着。", effects: { rep: 1.4, fac: { base: 12 }, attr: { CHA: 2 } } },
          ok: { body: "协调有模有样,各方都服你调度。", effects: { rep: 0.8, fac: { base: 8 } } },
          meh: { body: "乱归乱,你总算没让事崩了。", effects: { fac: { base: 5 } } },
          fail: { body: "有一两处衔接出了岔,可那几天谁都在摸黑,没人真怪你。", effects: { fac: { base: 4 } } },
          critfail: { body: "一条寻亲线索断了,你被短暂地质疑——但你没推责,一件件补了回来。", effects: { attr: { INTG: 2 } } }
        }
      },
      {
        id: "calm_not_fear",
        text: "帮忙协调,还顺手劝大家别恐慌",
        note: "在恐惧蔓延时,稳住人心比搬箱子更难也更要紧。",
        base: 0.66,
        mods: [{ src: "attr", key: "CHA", w: 0.4 }],
        outcomes: {
          crit: { body: "你一边张罗互助一边压住谣言,本地报上登了你的话:「害怕是正常的,但别让它替我们做决定。」", effects: { rep: 1.2, fac: { base: 10, press: 5 }, attr: { CHA: 2 } } },
          ok: { body: "你成了那个让人安心的声音。", effects: { rep: 0.7, fac: { base: 7 } } },
          meh: { body: "话说了不少,效果一般。", effects: { fac: { base: 4 } } },
          fail: { body: "有人嫌你「轻描淡写」,可更多人因你而定了心。", effects: { fac: { base: 4 } } },
          critfail: { body: "一句安抚被人断章取义,你花了点工夫澄清——但大家记得你一直在场。", effects: { attr: { CHA: 1 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 9) 2016 社交媒体时代 —— 一条朴素视频意外走红
   * ---------------------------------------------------------------------- */
  {
    id: "boon2016_goviral", grade: "minor", category: "media",
    valence: "boon", dyn: true,
    era: ["2016_SOCIAL"], tierMin: 0, tierMax: 2, weight: 10,
    brief: {
      lede: "你一段对着镜头说大实话的短视频,一觉醒来被转了几十万次。算法今天喜欢你。",
      known: [
        "在这个真假难辨、人人设话术的年代,一句朴素的实话反而成了稀缺品,被疯狂转发。",
        "涨粉是真,盯着你也变多了。这波流量怎么接,决定它是一次性的烟花还是一笔本金。"
      ]
    },
    title: "你说真话的一段短视频突然在网上走红",
    body: "手机从早响到晚,陌生人的私信涌进来:「终于有个不说套话的了。」也有冷笑的:「等着看他翻车。」",
    choices: [
      {
        id: "keep_authentic",
        text: "继续说大实话,不请团队包装",
        note: "真实的受众黏性最高,也最经不起人设崩塌——前提是别崩。",
        base: 0.68,
        mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "attr", key: "INTG", w: 0.2 }],
        outcomes: {
          crit: { body: "你连着几条实话都戳中了,拥趸以万计地涨。人们把你当成「跟我们一样的那一个」。", effects: { rep: 1.2, fac: { base: 13 }, attr: { CHA: 2 } } },
          ok: { body: "热度稳住了,你的基层关注者变成了实打实的志愿者。", effects: { rep: 0.7, fac: { base: 8 } } },
          meh: { body: "火了一阵,慢慢凉下去,但留下了一批死忠。", effects: { fac: { base: 5 } } },
          fail: { body: "有人扒你旧帖,你应对得略显笨拙,但真实人设兜住了你。", effects: { fac: { base: 4 } } },
          critfail: { body: "一句实话被人剪辑曲解上了热搜。你没删,反而澄清到底,风波过后更多人信你。", effects: { attr: { INTG: 2 } } }
        }
      },
      {
        id: "convert_offline",
        text: "把线上流量转成线下基层组织",
        note: "点赞会变选民,前提是你把手机后的热情落到挨家挨户。",
        base: 0.66,
        mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "你把评论区的人喊到了街头扫街拜票。别人还在数播放量,你已经有了一支志愿队。", effects: { rep: 1.0, fac: { base: 14 }, attr: { CUN: 2 }, fun: 0.2 } },
          ok: { body: "线上热度被你接得住,落成了一次次线下活动。", effects: { rep: 0.6, fac: { base: 9 } } },
          meh: { body: "转了一部分,多数还是只看不来。", effects: { fac: { base: 4 } } },
          fail: { body: "线上很热闹,线下没人来,你有点尴尬。", effects: { fac: { base: 3 } } },
          critfail: { body: "第一次线下活动办砸了,但剩下的铁杆因此更显珍贵。", effects: { attr: { CUN: 2 } } }
        }
      }
    ]
  }

]);
