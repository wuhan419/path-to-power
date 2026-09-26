/* ============================================================================
 * CONTENT · 55-media-timeline.js
 * 【媒介时间轴演示包】每个事件都声明了 medium，引擎按年份自动放行 ——
 * 于是同一条"舆论线"，会在不同年代以完全不同的形态出现：
 *
 *     广播(1920) → 电视(1948) → 有线(1980) → 互联网(1995) → 社交(2008)
 *     → 短视频(2018) → 合成影像(2022)
 *
 * 换句话说：你 1960 年开局，撞上的是「麦克风」和「上镜」；
 *          你 2008 年开局，撞上的是「博客」和「推文」；
 *          你玩到 2025 年，才会撞上「十五秒」和「假视频」。
 *
 * 想让某个大事件只在某个媒介诞生后才登场：给它较晚的 medium + grade:"major"。
 * 各媒介的起始年份写在 content/06-media.js，可自由调整。
 * ==========================================================================*/

/* 事件对所有已注册时代生效；以后新增时代，本包自动跟着扩。 */
const MEDIA_ERAS = Object.keys(POTUS.reg.era);

/* 写结果的写法糖：五档各一行，读起来像剧本而不是 JSON。 */
function out(body, effects) { return { body: body, effects: effects || {} }; }

POTUS.define("event", [
  /* ------------------------------------------------------------------
   * 1) 广播时代 —— 声音第一次直接进客厅
   * ------------------------------------------------------------------ */
  {
    id: "media_fireside", era: MEDIA_ERAS, tierMin: 0, tierMax: 5, weight: 9,
    grade: "mid", valence: "risk", dyn: true, category: "media", medium: "radio",
    title: "电台请你做一档固定的晚间谈话节目",
    body: "电台请你做一档固定的晚间谈话：三十分钟，一根麦克风，没有画面。听众都只是半个人——" +
      "一边洗碗一边开车，话得自己站得住。台里说录播还是直播「看情况」，你没听懂这句是什么意思。" +
      "你的对手还没有自己的节目，这是他唯一落后你的地方。有人说台里刚被一家财团买了股份，没人肯讲是谁；" +
      "这一档有多少人真的听见了你，你永远不会知道。",
    choices: [
      {
        id: "fireside", text: "做家常口吻的固定谈话，把政治说成聊天",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.5 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: out("你的声音成了几百万人的睡前习惯。人们开始觉得「认识你」。", { rep: 2, fac: { base: 10, press: 6 } }),
          ok: out("收听不差，电台愿意续约。你有了一个属于自己的窗口。", { rep: 1, fac: { base: 5, press: 4 } }),
          meh: out("有人听，也有人换台。你至少练熟了对着空气说话。", { rep: 0.4, fac: { press: 2 } }),
          fail: out("你的家常话被剪成片段，在别人的节目里当笑话放。", { rep: -0.4, fac: { press: -6 } }),
          critfail: out("一次直播口误被反复重播，你成了「那个说错话的人」。", { rep: -1, fac: { press: -10, base: -6 }, flags: ["scandal_1"] })
        }
      },
      {
        id: "scripted", text: "要求改录播，逐字念稿，一个错都不出",
        base: 0.65, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: out("稿子滴水不漏，台里把它当范本留存。", { rep: 1.25, fac: { press: 6 } }),
          ok: out("四平八稳。没人夸你，也没人抓你把柄。", { rep: 0.6, fac: { press: 3 } }),
          meh: out("听众觉得你在念文件。有人在报纸上写「他不像个人」。", { rep: 0.2, fac: { base: -3 } }),
          fail: out("稿子被人泄露，标题是「他连跟选民聊天都要照本宣科」。", { rep: -0.6, fac: { base: -7, press: -4 } }),
          critfail: out("泄露的稿子上，有编辑用红笔写的「这里可以撒谎」。", { rep: -1.25, fac: { press: -12, base: -8 }, flags: ["scandal_2"] })
        }
      }
    ]
  },

  /* ------------------------------------------------------------------
   * 2) 电视时代 —— 形象压过文字
   * ------------------------------------------------------------------ */
  {
    id: "media_tv_spot", era: MEDIA_ERAS, tierMin: 1, tierMax: 5, weight: 10,
    grade: "mid", valence: "risk", dyn: true, category: "media", medium: "tv",
    title: "你花大钱买下电视黄金时段的三十秒",
    body: "电视台的广告部给你报了一个价：三十秒，黄金时段，够把一个人变成一张全国都认得的脸。" +
      "价格是你几乎全部的钱。凌晨档便宜得多，代价是几乎没人看。而你的对手昨天已经在同一时段投过了，比你早了一个月。" +
      "观众记不住你说的话，只记住那张出现在别人家客厅里的脸。拍这条片子的班子上周还在给洗衣粉做广告。" +
      "钱和议席之间到底有没有账可算，没人算得出来。",
    choices: [
      {
        id: "prime", text: "押上几乎全部资金，买黄金时段",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }],
        cost: { fun: 11 }, stake: { fun: true },
        outcomes: {
          crit: out("片子在几个州被人反复模仿。你真的变成了一张全国都认得的脸。", { rep: 2.5, fac: { base: 8, press: 8 } }),
          ok: out("播出效果不错，认识你的人明显变多了。", { rep: 1.5, fac: { base: 5 } }),
          meh: out("片子播了，钱花了，讨论度一般。", { rep: 0.4, fac: { base: 1 } }),
          fail: out("片子被评论人当笑话拆解，你的钱和你的脸一起被人记住。", { rep: -0.6, fac: { base: -6, press: -5 } }),
          critfail: out("播出当晚，你的对手在同一时段买了一条嘲讽你的广告。", { rep: -1.5, fac: { base: -9, press: -8 }, flags: ["scandal_1"] })
        }
      },
      {
        id: "late", text: "只买得起凌晨档，先小规模试水",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        cost: { fun: 2.5 },
        outcomes: {
          crit: out("凌晨档的收视出乎意料，成本极低而效果极好。你找到了一条便宜的路。", { rep: 1.25, fac: { press: 5 } }),
          ok: out("不多，但接触到了一批别人没碰过的人——夜班工人、失眠的母亲、开早班的司机。他们的信写来了。", { rep: 1, fac: { base: 5 } }),
          meh: out("几乎没人看。钱花了，什么也没发生。", { rep: 0.2 }),
          fail: out("凌晨时段被拿去填了别人的赠品广告，你的片子被剪短了。", { rep: -0.2, fac: { press: -3 } }),
          critfail: out("你的片子被放在了一档深夜娱乐节目里当素材。", { rep: -0.8, fac: { press: -8, base: -4 } })
        }
      },
      {
        id: "earned", text: "一个子儿不花，去免费的地方露脸",
        base: 0.45, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: out("你把免费通告排成了一条线——教堂、工会礼堂、县集市。别人买时段，你买人心，效果一样好。", { rep: 1, fac: { base: 7, press: 3 } }),
          ok: out("不花钱的曝光慢，但确实有人在报纸和地方台里记住了你的名字。", { rep: 0.6, fac: { base: 3 } }),
          meh: out("跑了大半年，效果有限。至少没有欠债，也没有欠人情。", { rep: 0.2 }),
          fail: out("免费的通告都排在没人看的时段。你把自己跑瘦了，名气没涨。", { rep: -0.2 }),
          critfail: out("一次地方台的直播里，你答错了当地人最在意的问题。那段被剪出来，笑了两个月。", { rep: -0.6, fac: { base: -6 } })
        }
      }
    ]
  },

  /* ------------------------------------------------------------------
   * 3) 有线电视时代 —— 舆论裂成两个世界
   * ------------------------------------------------------------------ */
  {
    id: "media_cable_show", era: MEDIA_ERAS, tierMin: 1, tierMax: 5, weight: 9,
    grade: "mid", valence: "risk", dyn: true, category: "media", medium: "cable",
    title: "一个有线新闻的午夜节目连拿你当靶子",
    body: "一个二十四小时新闻频道的午夜谈话节目，连着三周拿你当靶子。它的收视率不高，" +
      "但看它的人恰好是最会在党内初选里投票的那批人，而且记仇。制片人递话过来：上一次节目，" +
      "「他不敢来」这个说法就消掉了；你也可以不理他——不理也是一种策略，只要你忍得住。" +
      "有人说这台节目背后的老板正在替你的一个潜在对手筹钱。这一晚你说出口的每句话，都会被人剪成片段拿出来重放。",
    choices: [
      {
        id: "go_on", text: "上节目，正面回击",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "press", w: 0.25 }],
        outcomes: {
          crit: out("你反过来把主持人逼到失态。片段在网上和报纸上被人传抄。", { rep: 1.75, fac: { press: 8, base: 6 } }),
          ok: out("你站住了。至少「他不敢来」这个说法没了。", { rep: 1, fac: { press: 5 } }),
          meh: out("你被剪成了三个短句，每句都不太像你。", { rep: 0.2, fac: { press: -2 } }),
          fail: out("你被连续追问二十分钟，全程防守。第二天报纸替你总结了。", { rep: -0.6, fac: { press: -7, base: -5 } }),
          critfail: out("一句气话被反复重播，你成了那个频道的固定笑料。", { rep: -1.25, fac: { press: -10, base: -6 }, flags: ["scandal_1"] })
        }
      },
      {
        id: "ignore", text: "不理他，把精力放回自己的选区",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: out("你完全不接招，节目失去素材，三周后转向别人。", { rep: 1.25, fac: { base: 6, press: 3 } }),
          ok: out("热度自己退了。你在本地做的事被人看见。", { rep: 0.8, fac: { base: 5 } }),
          meh: out("节目继续骂你，但没什么人关心。你也没赚到名声。", { rep: 0 }),
          fail: out("「他躲着不出现」成了标签，慢慢黏住你。", { rep: -0.6, fac: { press: -6 } }),
          critfail: out("你不去，他们就去找了一个「知道你内情」的人上节目。", { rep: -1, fac: { press: -8, base: -5 }, flags: ["scandal_2"] })
        }
      }
    ]
  },

  /* ------------------------------------------------------------------
   * 4) 互联网时代 —— 信息不再经过编辑部
   * ------------------------------------------------------------------ */
  {
    id: "media_blog_drop", era: MEDIA_ERAS, tierMin: 0, tierMax: 5, weight: 10,
    grade: "major", valence: "risk", dyn: true, category: "media", medium: "internet",
    title: "一个匿名博客贴出了你的三份内部文件",
    body: "一个没人听过名字的博客，贴出了三份盖着抬头的文件扫描件。扫描件是真的：签名是你的，" +
      "内容是你在三年前一次闭门会上说的话。博客没有署名、没有地址，邮箱是免费的；能碰到那批文件的人，" +
      "全加起来不超过七个。传统记者要拿到第二条独立来源才会跟进，也可能根本不跟进。" +
      "这个博客三个月前注册，第一篇帖子就是这三份。谁递出去的、后面还压着几份，你不会知道。",
    choices: [
      {
        id: "own_it", text: "承认那是我说的，并且解释当时的语境",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: out("你完整解释了那句话，还顺手把当时的会议纪要公开。人们开始怀疑泄露者的动机。", { rep: 1, fac: { press: 10, base: 8 } }),
          ok: out("你认了，事情没有再往上走。", { rep: 0.6, fac: { press: 5, base: 3 } }),
          meh: out("你解释了一遍，但只有一小部分人看到。原句还在转。", { rep: 0.1, fac: { press: -2 } }),
          fail: out("你的解释被拿去证明「他心里就是这么想的」。", { rep: -0.4, fac: { base: -6, press: -6 } }),
          critfail: out("你说得越多，被人剪出来的句子越多。三天后你已经不想解释了。", { rep: -0.7, fac: { press: -10, base: -8 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "find_leaker", text: "先查是谁把文件递出去的",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        cost: { fun: 1 },
        outcomes: {
          crit: out("你顺着一处复印的反光锁定了拍文件的人。你没声张——但从此知道该防谁，手里也多了能反将一军的东西。", { rep: 0.7, fac: { agency: 10 }, attr: { CUN: 2 } }),
          ok: out("范围缩小到两三个人。你心里有了数，泄露的势头也停了。", { rep: 0.3, fac: { agency: 6 }, attr: { CUN: 1 } }),
          meh: out("什么都没查出来，还花了钱。你只对空气警惕了几分。", { rep: -0.1, fac: { agency: -2 } }),
          fail: out("你查人的动作被人知道了，标题变成「他忙着抓内鬼，不忙着解释」。", { rep: -0.4, fac: { base: -6, press: -6 } }),
          critfail: out("你查错了人，还把一位老部下逼走了。他带走了更多东西。", { rep: -0.8, fac: { base: -8, press: -8 }, flags: ["scandal_3"] })
        }
      },
      {
        id: "silence", text: "什么都不说，等它自己过去",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: out("你真的撑住了。四天后没人再提，热度被下一条新闻带走。", { rep: 0.4, fac: { base: 4 } }),
          ok: out("热度慢慢退了。", { rep: 0.2 }),
          meh: out("沉默被解读成默认，但也没人再追问。", { rep: 0, fac: { base: -2 } }),
          fail: out("「他不回应」本身成了新闻，记者开始一轮一轮来。", { rep: -0.3, fac: { press: -6 } }),
          critfail: out("沉默四天后，第四份文件出现了。", { rep: -0.7, fac: { press: -9, base: -8 }, flags: ["scandal_3"] })
        }
      }
    ]
  },

  /* ------------------------------------------------------------------
   * 5) 短视频时代 —— 十五秒定生死（媒介更替后才会出现的大事件）
   * ------------------------------------------------------------------ */
  {
    id: "media_viral_clip", era: MEDIA_ERAS, tierMin: 0, tierMax: 5, weight: 12,
    grade: "major", valence: "risk", dyn: true, category: "media", medium: "shortvideo",
    title: "一段你蹲下跟孩子说话的十五秒视频火了",
    body: "一段十五秒的片段，在四十八小时里被播放了上亿次。片段里，你在一次活动结束后，" +
      "对着一群孩子蹲下去，用很慢的语速讲了一句话。拍它的是一个谁都不认识的志愿者，没剪辑，没配乐。" +
      "两天之内，你的名字从一群从不关心政治的人嘴里传开。平台的推荐是个黑箱，没人能解释为什么是这一条。" +
      "有人说某个营销团队在背后推过手。热度会在哪一天、因为哪件事掉头，你永远不会提前知道。",
    choices: [
      {
        id: "lean_in", text: "立刻顺着这波热度，把自己交给这台机器",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.45 }, { src: "fac", key: "base", w: 0.2 }],
        stake: { fun: true },
        outcomes: {
          crit: out("你成了那个「蹲下来跟孩子说话的人」。这个标签跟了你很多年，而且一直好使。", { rep: 1.75, fac: { base: 16, press: 6 } }),
          ok: out("热度变成了真实的关注度。你的名字进了很多人的手机。", { rep: 1, fac: { base: 10 } }),
          meh: out("又热了三天，然后被下一条视频盖过去。", { rep: 0.3, fac: { base: 3 } }),
          fail: out("你刻意跟拍的新视频被看穿了，评论区开始说你「在演」。", { rep: -0.4, fac: { base: -9, press: -5 } }),
          critfail: out("你团队发的一条策划视频被人扒出脚本，连之前那条也被当成了摆拍。", { rep: -0.9, fac: { base: -14, press: -10 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "keep_old", text: "不理会它，继续按老办法做事",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.45 }],
        outcomes: {
          crit: out("你没有追这波热度，反而被写成了「少数不表演的人」。这本身就是个好故事。", { rep: 0.9, fac: { press: 8, base: 5 } }),
          ok: out("热度退了，但你的老支持者更信你了。", { rep: 0.4, fac: { base: 5 } }),
          meh: out("什么都没发生。视频像没出现过一样。", { rep: 0.1 }),
          fail: out("有人开始问：为什么那个人人都在转的人，自己一句话都不说。", { rep: -0.3, fac: { base: -6 } }),
          critfail: out("你错过了这个窗口。半年后一位新人用同样的方式，把属于你的位置拿走了。", { rep: -0.7, fac: { base: -10, establishment: -6 } })
        }
      }
    ]
  },

  /* ------------------------------------------------------------------
   * 6) 合成影像时代 —— "眼见为实"失效
   * ------------------------------------------------------------------ */
  {
    id: "media_deepfake", era: MEDIA_ERAS, tierMin: 1, tierMax: 5, weight: 10,
    grade: "major", valence: "bane", dyn: true, category: "crisis", medium: "deepfake",
    title: "一段冒充你的合成视频在夜里传开",
    body: "一段两分钟的视频在夜里传开：画面里的你，在说一件你绝对没说过的事。嘴型对得很准，声音也很像。" +
      "你的团队花了四十分钟才确认——这不是你。这样的合成片段，一个人花一个下午就能做出来；破绽很细，" +
      "但没人会逐帧去看。平台说要「在四十八小时内评估」。你的否认声明转发量是阅读量的上百倍：" +
      "澄清本身就是在帮它扩散。最早发帖的账号注册于两周前，只发过这一条；做这段片子的人，你永远不会查到。",
    choices: [
      {
        id: "counter", text: "立刻拿出技术鉴定 + 完整时间线硬刚",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.5 }, { src: "fac", key: "press", w: 0.2 }],
        cost: { fun: 1.75 },
        outcomes: {
          crit: out("鉴定报告 + 原件逐帧比对一次性公开，主流媒体集体跟进辟谣，还顺藤摸到造谣账号背后的对手金主。", { rep: 1.75, fac: { press: 12, agency: 8 }, voters: { warm: 400 } }),
          ok: out("几家权威媒体确认了是伪造并点名谴责，谣言失去了主流放大器。", { rep: 1, fac: { press: 9, agency: 5 } }),
          meh: out("报告出来了，但只有关心这件事的技术圈看到；剩下的人还是半信半疑。", { rep: 0.2, fac: { press: 4 } }),
          fail: out("你花大价钱做的鉴定，被对手包装成「有钱人请的专家自证清白」，越描越黑。", { rep: -0.6, fac: { base: -8, press: -5 } }),
          critfail: out("鉴定过程里泄露了一份内部邮件，被解读成「他们自己也不确定」。", { rep: -1, fac: { press: -12, base: -10 }, flags: ["scandal_3"] })
        }
      },
      {
        id: "human", text: "不争技术，只做一件事：带着摄像机去现场走一遍",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: out("你在画面里一句技术都不谈，只是把那天整条街、整个下午重走一遍。人们自己得出了结论，见过你本人的选民开始四处替你辟谣。", { rep: 1.1, voters: { warm: 500, diehard: 100 }, fac: { base: 6 } }),
          ok: out("画面比报告更有说服力。你走过的每一条街，疑虑都消了大半。", { rep: 0.6, voters: { warm: 250 }, fac: { base: 5 } }),
          meh: out("有人被打动，有人觉得你在演戏。两拨人都更坚定了。", { rep: 0.2, voters: { warm: 40 }, fac: { press: -2 } }),
          fail: out("走现场的画面被剪成了「他在卖惨」，反而扩大了传播。", { rep: -0.4, fac: { base: -8, press: -6 } }),
          critfail: out("现场那天恰好有人拍了另一段角度不同的素材，被拼在了一起。", { rep: -1, fac: { press: -13, base: -12 }, flags: ["scandal_4"] })
        }
      }
    ]
  }
]);
