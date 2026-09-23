/* ============================================================================
 * CONTENT · 82-press.js
 * 【媒体即武器】把那支笔从"写你的人"变成"你写别人的工具"。
 *
 * 和灰产线的区别：
 *   灰产线赚的是钱和把柄（别人不敢说的事）；
 *   这条线赚的是"说法"——谁先开口、谁定调子、谁的名字不出现在第三版。
 *   钱会花完，把柄会过期，但一个已经定下来的说法能管十年。
 *
 * 四个事件是一条台阶：
 *   press_columnist  借笔      —— 认识那支笔，让他愿意写你
 *   press_blackout   挡笔      —— 别人要写你，你把它挡下来（把柄第一次当武器用）
 *   press_own        用笔      —— 主动让一个故事消失
 *   press_own_outlet 拥有笔    —— 干脆把媒体买下来（一局一次的大事件）
 *
 * 三件写内容时必须留意的事：
 *   1) 舆论事件几乎都声明 medium —— 1960 年没有热搜，1840 年没有电视。
 *      引擎会按年份自动把不该存在的事件挡在时代之外。
 *   2) 媒体派系（fac.press）不爱你也不恨你，它只认"好不好看"。
 *      对 press 一味砸钱没用，得给它料、给它面子、或者给它一个不能拒绝的理由。
 *   3) 每个事件都留一条不要钱、不设门槛的保底路 —— 你可以一辈子不碰媒体，
 *      选举照样打得下去，只是会输得难看一点。
 * ==========================================================================*/

const PRESS_ERAS = Object.keys(POTUS.reg.era);

function pOut(body, effects) { return { body: body, effects: effects || {} }; }

POTUS.define("event", [

  /* ==========================================================================
   * 1) 借笔 —— 让那支笔第一次写你，而且写的是好话
   * ======================================================================== */
  {
    id: "press_columnist", era: PRESS_ERAS, tierMin: 0, tierMax: 4, weight: 10,
    grade: "minor", valence: "risk", dyn: true, category: "media", medium: "print",
    title: "你在饭局上被介绍给本市报纸的专栏编辑",
    body: "本市报纸的第七版有一个专栏，每周三次，每次六百字。写它的人今年五十一岁，\n" +
      "在这张报纸上写了二十二年。他喜欢一个人和毁掉一个人用的是同一支笔，\n" +
      "而且他自己从来不觉得这两件事有什么区别。\n" +
      "有人在饭局上把你介绍给了他。他跟你握手的时候已经在打量你了 —— 像在估一篇稿子的篇幅。",
    brief: {
      lede: "他不需要你的钱，他需要你的故事。问题是你愿意让他看见哪一部分。",
      known: [
        "他的专栏是这个市镇里唯一还会被逐字读完的东西。",
        "他不收钱 —— 收过钱的人他一眼就看出来，然后写出来。",
        "他真正缺的是独家：最近三个月他都在写别人写过的题目。",
        "他记性极好，你随口说的一句，可能八年后出现在某篇稿子里。"
      ],
      rumor: [
        "有人说他年轻的时候也参选过一次，输得很难看。",
        "有人说他和现在那位市长曾经是朋友，后来不是了。"
      ],
      unknown: [
        "他今天来，是打算写你，还是只是来吃饭。",
        "他想从你身上拿的，是稿子还是立场。"
      ],
      terms: [
        { k: "专栏", v: "固定版面，给的是「被认真对待」的资格。" },
        { k: "独家", v: "只有他有。在这个行业里，独家比真相值钱。" }
      ]
    },
    choices: [
      {
        id: "feed", text: "给他一条真料：一件只有你知道的事",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "CHA", w: 0.35 }],
        cost: { ap: 1 },
        outcomes: {
          crit: pOut("他当场把笔记本翻到新的一页。三周后那篇专栏里你的名字出现了四次，而且每一次都在句子的前半段。",
            { rep: 2.75, contact: { columnist: 18 }, fac: { press: 12, base: 5 } }),
          ok: pOut("他记下了，也写了。措辞很有分寸，分寸得让你怀疑他是不是在替你把话留着。",
            { rep: 1.5, contact: { columnist: 9 }, fac: { press: 7 } }),
          meh: pOut("他用了你那条料，但主角不是你。你的名字出现在第六段的括号里。",
            { rep: 0.4, contact: { columnist: 3 }, fac: { press: 2 } }),
          fail: pOut("你把料喂给了错的人：他查了三天，证明你说错了一个细节，然后把这件事写进了专栏。",
            { rep: -1.25, contact: { columnist: -8 }, fac: { press: -6 } }),
          critfail: pOut("那条料牵扯到一个你还没准备好得罪的人。稿子见报的第二天，那个人替你记住了这件事。",
            { rep: -2, contact: { columnist: -12 }, fac: { press: -8, establishment: -8 }, flags: ["scandal_1"] })
        }
      },
      {
        id: "dinner", text: "请他去老地方喝一顿，什么都不求",
        base: 0.7, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "attr", key: "INTG", w: 0.3 }],
        cost: { fun: 0.3, ap: 1 },
        outcomes: {
          crit: pOut("你们喝到十一点，他讲了他那一次输掉的选举。走的时候他说：「你比他们有意思。」这句话不是稿子，但比稿子有用。",
            { rep: 1.25, contact: { columnist: 14 }, fac: { press: 9 } }),
          ok: pOut("一顿饭，一句「以后有事可以找我」。他说的「有事」是什么意思，你们都没细问。",
            { rep: 0.4, contact: { columnist: 7 }, fac: { press: 4 } }),
          meh: pOut("他来了，吃了，聊了美国政治三十年的八卦，然后走了。你买了一个晚上的单。",
            { contact: { columnist: 2 }, fac: { press: 1 } }),
          fail: pOut("他一坐下就看出来你想干什么。「你请我吃饭不是为了听我说话。」他吃了一半就走了。",
            { contact: { columnist: -6 }, fac: { press: -3 } }),
          critfail: pOut("你在这个馆子里被人看见了。第二天有一句话开始在传：「那个人已经在请记者喝酒了。」",
            { rep: -1.25, contact: { columnist: -8 }, fac: { press: -6, base: -5 } })
        }
      },
      {
        id: "wait", text: "不主动。让他自己来写",
        base: 0.72, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: pOut("你什么都没做，他反而来了。他那篇稿子的标题是「一个还没有开口的人」——这是他二十二年里写得最好的六百字。",
            { rep: 2.5, contact: { columnist: 12 }, fac: { press: 10 } }),
          ok: pOut("他后来还是写了你，写得不好不坏，像一篇提前写好的讣告练笔。",
            { rep: 0.8, contact: { columnist: 4 }, fac: { press: 3 } }),
          meh: pOut("他没写你。那张报纸的第七版继续登着别人的名字。",
            { rep: 0.4 }),
          fail: pOut("那一期他写的是你的对手。整篇稿子的最后一句是：「另有一位年轻人也在争取这个位置，但暂未回应。」",
            { rep: -0.8, fac: { press: -4 } }),
          critfail: pOut("三个月后你才知道，那顿饭本来是有人安排给别人的。你只是恰好坐进了那个位子。",
            { rep: -1.25, fac: { press: -5, establishment: -4 } })
        }
      }
    ]
  },

  /* ==========================================================================
   * 2) 挡笔 —— 有人要在报上写你，而你手上第一次有"不敢被写的东西"
   * ======================================================================== */
  {
    id: "press_blackout", era: PRESS_ERAS, tierMin: 1, tierMax: 5, weight: 11,
    grade: "mid", valence: "bane", dyn: true, category: "media", medium: "print",
    title: "一篇要爆料你的稿子下周四见报",
    body: "你比读者早三天知道那篇稿子要写什么。\n" +
      "一个跑了十七年市政新闻的记者，把三件事拼在了一起：一笔你在去年三月收下的钱、\n" +
      "一次你在市议会走廊里说的话、以及一个你至今没有解释清楚的人。\n" +
      "稿子已经交到编辑手上，下周四见报。你有三天。",
    brief: {
      lede: "你挡不住真相，但你可以决定它什么时候、以什么形状、出现在第几版。",
      known: [
        "写稿的记者二十年没撤过一篇稿，他自己是这一版最硬的骨头。",
        "终审权在总编手上，不在记者手上。",
        "总编有一个正在上私立学校的儿子，学费一年六万。",
        "总编最怕的不是你，是另一家报纸在同一天登出一件比这更大的事。"
      ],
      rumor: [
        "有人说那三件事的第三件，是有人特意递给他的。",
        "有人说总编和你的对手在三年前吃过一次饭。"
      ],
      unknown: [
        "稿子里到底有几句是能证实的。",
        "如果它登出来，你手上还有几张牌能打。"
      ],
      terms: [
        { k: "撤稿", v: "编辑部悄悄拿掉一篇稿子，纸面上不留痕。" },
        { k: "先发制人", v: "抢先自曝小事，用它换掉即将到来的大事。" }
      ]
    },
    choices: [
      {
        id: "preempt", text: "先发制人：在报摊开门之前，把那笔钱说清楚",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "INTG", w: 0.35 }],
        cost: { ap: 2, rep: 0.6 },
        outcomes: {
          crit: pOut("周三下午你开了一场二十分钟的发布会，把账单、日期和收款人全部念了出来。周四那篇稿子登了出来——它读起来像一篇旧闻。",
            { rep: 0.8, fac: { press: 14, base: 6 } }),
          ok: pOut("你先说了。稿子还是登了，但伤害小了一半，因为读者已经在别处听过这件事。",
            { rep: 0.2, fac: { press: 8 } }),
          meh: pOut("你说得比稿子晚了一天。两件事放在一起看，你看起来像在补漏洞。",
            { rep: -0.4, fac: { press: -2 } }),
          fail: pOut("你在发布会上多说了两句——一句本来不需要说的。周四的稿子把这句放进了标题。",
            { rep: -1, fac: { press: -8 } }),
          critfail: pOut("你交代的那笔钱，牵出了一个你没想到的名字。你替那篇稿子做了它自己做不到的事。",
            { rep: -1.5, fac: { press: -10, establishment: -10 }, flags: ["scandal_2", "investigation_open"] })
        }
      },
      {
        id: "money", text: "找总编：他儿子的学费，你也可以出一份",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        cost: { fun: 1.75, ap: 1 }, stake: { fun: true, fav: true },
        outcomes: {
          crit: pOut("稿子没登。三天后同一版的第三栏出现了一篇写你义务法律咨询的短稿，署名是另一个记者。总编什么都没说过，你也什么都没说过。",
            { rep: 0.4, fac: { press: 6, establishment: 4 }, flags: ["bought"] }),
          ok: pOut("那篇稿子变成了四百字，登在第十四版，标题里连你的名字都没有。",
            { rep: 0.6, fac: { press: 3 }, flags: ["bought"] }),
          meh: pOut("钱收了，稿子推迟了一周，然后还是登了。你花的钱只买到七天。",
            { rep: -0.2, fac: { press: -3 } }),
          fail: pOut("总编把信封推了回来，并且从那天起让那个记者专门跟你的线。",
            { rep: -0.6, fun: -1.75, fac: { press: -12 } }),
          critfail: pOut("你递信封的那个中午，隔壁卡座坐着另一家报社的实习生。两个月后，这件事以另一种形式见了报。",
            { fun: -1.75, rep: -1.5, fac: { press: -16 }, flags: ["scandal_2", "investigation_open"] })
        }
      },
      {
        id: "lev", text: "用一份把柄：让这条线里的人自己开口喊停",
        base: 0.66, mods: [{ src: "attr", key: "CUN", w: 0.55 }],
        cost: { lev: 1, ap: 1 },
        outcomes: {
          crit: pOut("你只打了一个电话，没提稿子，只提了一个编号和一年前的一个下午。第二天总编亲自把那篇稿子从版面上拿了下来，还顺手换掉了那个记者的线口。",
            { rep: 0.8, fac: { press: 4, establishment: 8 }, flags: ["compromised"] }),
          ok: pOut("稿子撤了。撤得很突然，编辑部里传了三天闲话，但没有人知道是谁打的电话。",
            { rep: 0.4, fac: { press: -2, establishment: 6 }, flags: ["compromised"] }),
          meh: pOut("稿子压了两周，最后还是登了——只是换了个人署名。你损失了一份把柄，换到两周。",
            { rep: -0.2, fac: { press: -6 }, flags: ["compromised"] }),
          fail: pOut("你找的那个人已经不是你以为的那个人了。他把电话内容原样转述给了那个记者。",
            { rep: -1, fac: { press: -14, establishment: -8 }, flags: ["scandal_2"] }),
          critfail: pOut("你以为你在威胁一个人，其实你在训练一个人：他从此明白了你有多怕被写。这笔账他记了很多年。",
            { rep: -1.5, fac: { press: -12, establishment: -12 }, flags: ["scandal_3", "investigation_open"] })
        }
      },
      {
        id: "endure", text: "什么都不做。让它登",
        base: 0.55, mods: [{ src: "attr", key: "INTG", w: 0.45 }, { src: "attr", key: "CUN", w: 0.2 }],
        outcomes: {
          crit: pOut("稿子登了，比你想的温和。因为它必须公平，而公平意味着它得写下你后来做的那两件事。发表后的那个星期，你的名字第一次被三类人同时记住。",
            { rep: 0.6, fac: { press: 10, base: 4 } }),
          ok: pOut("登了。难看了两个星期，然后这一版开始盯着别人。你学到一件事：新闻会自己往前走。",
            { rep: 0.2, fac: { press: 4 } }),
          meh: pOut("登了。有三个老支持者打电话来问。你一个一个解释，解释到第三个人时你自己都烦了。",
            { rep: -0.4, fac: { base: -3 } }),
          fail: pOut("登了，而且那三件事被证明得非常干净。你花了四个月，什么都没做成。",
            { rep: -1, fac: { base: -6, press: -4 } }),
          critfail: pOut("登了。那天早上你第一次在便利店被人当面质问。你没有生气，你只是忽然明白了一个很实际的问题：这个人下次还会投你吗。",
            { rep: -1.5, fac: { base: -10, establishment: -6 }, flags: ["scandal_2"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 3) 用笔 —— 轮到你决定别人能不能被写
   * ======================================================================== */
  {
    id: "press_kill", era: PRESS_ERAS, tierMin: 2, tierMax: 5, weight: 10,
    grade: "mid", valence: "risk", dyn: true, category: "media", medium: ["print", "radio", "tv"],
    title: "有人来求你压掉一篇写你盟友的真稿子",
    body: "这一次是别人来找你。\n" +
      "稿子写的不是你，是一个把票许给你的人。它全是真的，每一条都能查证，\n" +
      "而且它一旦登出来，你在这个区里最结实的那根梁就断了。\n" +
      "对方要的也不是钱。他要一句话 —— 他自己那一行里的一句「算了」。",
    brief: {
      lede: "你现在知道了为什么有人会花二十年去认识一堆写字的和说话的人。",
      known: [
        "稿子是真的，你在里面是「那位议员的朋友」。",
        "动手的不是对手，是一份只觉得故事好的报纸。",
        "主编正发愁：报道团队下月要缩编两个人。",
        "你手上有三样东西可以交换，而那篇稿子只有一次机会。"
      ],
      rumor: [
        "有人说写这篇稿子的人，两年后想去华盛顿跑线。",
        "据说作者和对手上过同一所大学的校友会。"
      ],
      unknown: [
        "压下去之后，写它的人会不会再写一次。",
        "把票许给你的人，知不知道自己马上要被写。"
      ],
      terms: [
        { k: "压稿", v: "让真稿子不发：办法多，代价都在你身上。" },
        { k: "换料", v: "用更大的新闻占掉版面。版面有限。" }
      ]
    },
    choices: [
      {
        id: "swap", text: "给他一条更大的新闻，把版面占掉",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "attr", key: "CUN", w: 0.3 }],
        cost: { ap: 2 }, req: { contact: "columnist" },
        outcomes: {
          crit: pOut("你把一件本来打算留到秋天的东西提前放了出去。主编当场把版换了，还给你加了一篇署名的分析稿——他以为你是自己人。",
            { rep: 1, contact: { columnist: 12 }, fac: { press: 14, establishment: 6 } }),
          ok: pOut("版面被另一件事占掉了。那篇稿子被推到「下周」，然后是下个月，然后没有了。",
            { rep: 0.4, contact: { columnist: 6 }, fac: { press: 8 } }),
          meh: pOut("你给的料不够大。两篇稿子一起登了，读者只记住了那篇写人的。",
            { rep: -0.4, contact: { columnist: -3 }, fac: { press: -5 } }),
          fail: pOut("你把一件不该现在说的事说出去了。它第二天出现在七家报纸上，而你要护的那个人还是被写了。",
            { rep: -1, contact: { columnist: -10 }, fac: { press: -8, establishment: -8 } }),
          critfail: pOut("你给的那条料，最后被查证是错的。那张报纸为它道了歉，同时把那篇写人的稿子提到了头版。",
            { rep: -1.5, contact: { columnist: -16 }, fac: { press: -16 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "buy", text: "买版面：让他写，但写在他最不想写的地方",
        base: 0.58, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "commercial", w: 0.3 }],
        cost: { fun: 7 }, stake: { fun: true, fav: true },
        outcomes: {
          crit: pOut("你买了整整一季的广告位。总编自己动手把那篇稿子改成了八百字的地方版短讯，登在周六。周六没人看报纸。",
            { rep: 0.6, attr: { CUN: 2 }, fac: { press: 8, commercial: 6 }, flags: ["bought"] }),
          ok: pOut("稿子登了，但变得很薄：三个段落，没有一句引语。钱能买到的不是沉默，是篇幅。",
            { rep: 0.4, attr: { CUN: 1 }, fac: { press: 4 }, flags: ["bought"] }),
          meh: pOut("你买了广告，也登了稿子。总编两边都收了，两边都没欠你。",
            { rep: -0.2, fac: { press: -2 } }),
          fail: pOut("广告部收了钱，编辑部照登不误，而且顺手在稿子里写了一句「本报曾就该议员接受广告投放一事作过内部报备」。",
            { fun: -7, rep: -1, fac: { press: -14 } }),
          critfail: pOut("那个写稿的记者把整个交易过程记了下来，两年后写进了他的书里。你的名字在第五章。",
            { fun: -7, rep: -1.5, fac: { press: -18 }, flags: ["scandal_2", "investigation_open"] })
        }
      },
      {
        id: "lev", text: "用一个不能拒绝的理由（消耗一份把柄）",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.6 }],
        cost: { lev: 1 },
        outcomes: {
          crit: pOut("你找的是一个从来不写稿的人。他听完之后只说了一句「我知道了」。第二天，那篇稿子在编辑部内部被标成了「待核」。待核的东西永远不会登。",
            { rep: 0.8, fac: { establishment: 10 }, flags: ["compromised"] }),
          ok: pOut("压下去了。压得非常干净，干净到那个记者至今以为是自己的选题被砍了。",
            { rep: 0.4, fac: { establishment: 7 }, flags: ["compromised"] }),
          meh: pOut("稿子没了，但那个记者调去了州议会线——一条更长的线，一条能一直跟着你的线。",
            { rep: 0.2, fac: { press: -6 }, flags: ["compromised"] }),
          fail: pOut("你找的人答应了你，然后把这件事当作筹码转手卖给了别人。现在有四个人知道你在压稿。",
            { rep: -1, fac: { press: -12, establishment: -8 }, flags: ["scandal_2"] }),
          critfail: pOut("你压掉了一篇稿子，却让对方看清楚了一件事：你连这种真话都不想让人看见。那张报纸从此把你归到了「需要盯住的人」那一栏。",
            { rep: -1.5, fac: { press: -16, base: -6 }, flags: ["scandal_3", "investigation_open"] })
        }
      },
      {
        id: "letit", text: "不插手。他该被写就被写",
        base: 0.66, mods: [{ src: "attr", key: "INTG", w: 0.5 }],
        outcomes: {
          crit: pOut("稿子登了，那个人自己站出来认了。他没有倒下，反而有人开始说他是个敢认账的人。这件事让你明白：你担心的那根梁其实比你结实。",
            { rep: 1, fac: { press: 10, base: 5 } }),
          ok: pOut("登了。那人受了一场小伤，两个月后恢复了。你什么都没损失，只是他的电话以后回得慢了一点。",
            { rep: 0.4, fac: { press: 4 } }),
          meh: pOut("登了。那人从此不再接你的电话。你少了一个朋友，多了一个干净的名声。",
            { rep: 0.4, fac: { press: 3, establishment: -4 } }),
          fail: pOut("登了。那人迁怒于你——他认为你手里明明有办法。这个区里的人开始觉得你「靠不住」。",
            { rep: -0.6, fac: { base: -10, establishment: -6 } }),
          critfail: pOut("登了，而且那件事牵出了一串旧账，一笔一笔都算在了你头上。人们不记得是谁被抓的，只记得是谁没管。",
            { rep: -1.5, fac: { base: -14, labor: -8 }, flags: ["scandal_2"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 4) 拥有笔 —— 从"被写的人"变成"决定写谁的人"（一局一次）
   * ======================================================================== */
  {
    id: "press_own_outlet", era: PRESS_ERAS, tierMin: 2, tierMax: 5, weight: 9,
    grade: "major", valence: "risk", dyn: true, category: "media", unique: true,
    title: "你考虑把整家本地报纸买下来",
    body: "那家媒体要卖了。\n" +
      "不是关门，是老板老了，两个儿子都不想接，报价开得比实际价值低三成。\n" +
      "你的会计把三页纸放在你面前。第三页的最后一行写着：\n" +
      "「按当前报价，买下之后你每年要亏二十万。你会得到的东西没有办法记在账上。」",
    brief: {
      lede: "买一杆枪和买一把雨伞的会计方法是一样的，但它们对你的意义完全不一样。",
      known: [
        "发行量本地第二，「没人敢在它版面撒谎」的名声第一。",
        "老板的两个儿子只想快点拿到钱，不在乎买家是谁。",
        "买下后你成「媒体老板」，党内立刻警惕你。",
        "你也可以不当老板，只当一个能让主编接电话的人。便宜得多。"
      ],
      rumor: [
        "有人说它是被挤到要卖的：本地最大的广告主最近撤了。",
        "据说真正想买的是对手，出价更高但要先裁记者。"
      ],
      unknown: [
        "你买下它之后，还写得出原来那些话吗。",
        "若有人拿你自己的报纸查你，你怎么办。"
      ],
      "terms": [
        { k: "编辑独立", v: "保留多少：留越多越有用，留越少越听话。" },
        { k: "沉没成本", v: "每年往里填的钱，买的是「没人敢反驳你」。" }
      ]
    },
    choices: [
      {
        id: "buy", text: "整家买下来，连印刷机一起",
        base: 0.55, mods: [{ src: "fac", key: "commercial", w: 0.35 }, { src: "attr", key: "CUN", w: 0.3 }],
        cost: { fun: 12.5 }, stake: { fun: true, fav: true },
        outcomes: {
          crit: pOut("交割那天你走进编辑部，只说了一句话：「版面的事，以后还是你们定。」没有人辞职，六个月后发行量涨了一成。你成了那些人真心愿意守着的老板。",
            { fun: -12.5, rep: 1.5, fac: { press: 22, establishment: 8, commercial: 8 }, flags: ["owns_media"] }),
          ok: pOut("你成了老板。第一天早上你在自己报纸的第三版上看到一篇不完全顺着你的报道，你没有打电话。这就是你要的。",
            { fun: -12.5, rep: 1, fac: { press: 14 }, flags: ["owns_media"] }),
          meh: pOut("买下来了。第一个月就有两个记者辞职。新来的两个写得没那么好，但更好说话——你换到了你想换的东西，也失去了你买它的理由。",
            { fun: -12.5, rep: 0.2, fac: { press: -6 }, flags: ["owns_media"] }),
          fail: pOut("买下来了，然后钱开始漏。第二年的亏损比会计算的多一倍，而你的对手开始在广播里说「那位先生最近很关心新闻自由」。",
            { fun: -18.5, rep: -0.7, fac: { press: -12, establishment: -8 }, flags: ["owns_media", "scandal_1"] }),
          critfail: pOut("买下来之后你才发现，它亏损的真正原因是：它手上有一桩还没了结的老官司，而卖方在尽调文件里把那三页夹在了中间。你连它一起买了。",
            { fun: -21.5, rep: -1, fac: { press: -16, commercial: -12 }, flags: ["owns_media", "scandal_2", "investigation_open"] })
        }
      },
      {
        id: "influence", text: "不当老板，只买下「主编会接电话」这件事",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        cost: { fun: 2 },
        outcomes: {
          crit: pOut("你没有买它，你只是成了它最大的广告主，以及主编每周二下午的那杯咖啡。这个国家里真正有效的媒体控制，从来不在产权证上。",
            { rep: 0.7, attr: { CUN: 2 }, fac: { press: 12, commercial: 6 } }),
          ok: pOut("从那以后，那家报纸写你的稿子会先打个电话。他们不是不敢写，只是写得更准了。",
            { rep: 0.3, attr: { CUN: 1 }, fac: { press: 7 } }),
          meh: pOut("钱花出去了，效果一般。主编接了你的电话，但他同时也接别人的。",
            { rep: -0.1, fac: { press: 1 } }),
          fail: pOut("主编把钱退了回来，还写了一篇短评，题目叫「本刊不接受任何形式的版面赞助」。",
            { fun: -2, rep: -0.4, fac: { press: -12 } }),
          critfail: pOut("你只拿到了一个许诺，却已经在两顿饭里把名字说出去了。三个月后那家媒体被你的对手买走，而它记得你曾经想买它。",
            { fun: -2, rep: -0.6, fac: { press: -10, establishment: -6 }, flags: ["scandal_1"] })
        }
      },
      {
        id: "pass", text: "不买。这笔钱留给选票",
        base: 0.7, mods: [{ src: "attr", key: "INTG", w: 0.45 }],
        outcomes: {
          crit: pOut("你把钱投进了三个街区的办事处。半年后你手里没有一个编辑的电话，但有四十个能在雨天把车开出来的人。这两样东西最后哪一样更有用，历史学家还在吵。",
            { rep: 0.7, fac: { base: 12, labor: 6, press: 4 } }),
          ok: pOut("没买。钱还在，麻烦也少。那家媒体继续按自己的意思写你。",
            { rep: 0.3, fac: { base: 4, press: 3 } }),
          meh: pOut("你没买，别人买了。它没有变得对你更坏，只是变得对买它的人更好。",
            { rep: 0.1, fac: { base: 2 } }),
          fail: pOut("你的对手买下了它。第一期的社论标题是问号，但整篇文章只有一个句号的位置留给你。",
            { rep: -0.6, fac: { press: -14, base: -6 } }),
          critfail: pOut("你没买，也没找人买。三个月后它停刊了，两个老记者失业，而本地的新闻只剩下一家——那家是你的对手的亲戚开的。",
            { rep: -0.7, fac: { press: -12, base: -8, civil: -6 }, flags: ["scandal_1"] })
        }
      }
    ]
  }
]);
