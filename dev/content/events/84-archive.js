/* ============================================================================
 * CONTENT · 84-archive.js
 * 【四幕事件链】一份档案：拿到 → 被反噬 → 摊牌 → 了结。
 *
 * 这是「事件链」这个机制的样板文件。和普通事件的区别只有一条：
 *
 *   ev.after = { id: "前一幕的 id", minMonthsAfter: 3, maxMonthsAfter: 30 }
 *
 * 引擎会自动做到三件事（见 engine/events.js 的 P.eligible）：
 *   1) 前一幕没演过 → 这一幕根本不会被抽到（gap == null 直接 false）；
 *   2) 间隔不在窗口内 → 也不会被抽到（太早不像故事，太晚像巧合）；
 *   3) 一旦前一幕演过，这一幕的权重会乘上 balance.chainWeightMul（默认 9 倍），
 *      所以它几乎一定会来，只是隔几个月才来。
 * 界面上会给玩家一条「承前」小条，写着上一幕的标题和相隔几个月 ——
 * 让玩家知道这不是一堆随机事件，而是一件还没完的事。
 *
 * 写链的三个坑：
 *   1) 每一幕都必须 unique: true。否则同一幕会重复出现，链条就穿帮了。
 *   2) 晚一幕要声明 flags（或什么都不声明），不要把「前情」当成必然发生。
 *      本文件第一幕有两条路都会把档案带走（都打 archive_taken 标记），
 *      第三条路（原样放回去）不打标记 —— 那条路之后就没有然后了。
 *   3) 最后一幕用 req.flag 分支：前面怎么选，结尾就怎么读。
 *      所以每一幕的每一个选择、每一档结果，都要打上同一个标记。
 * ==========================================================================*/

const ARCH_ERAS = Object.keys(POTUS.reg.era);

function aOut(body, effects) { return { body: body, effects: effects || {} }; }

POTUS.define("event", [

  /* ==========================================================================
   * 第一幕 · 拿到
   * ======================================================================== */
  {
    id: "archive_get", era: ARCH_ERAS, tierMin: 1, tierMax: 5, weight: 10,
    grade: "mid", valence: "bane", dyn: true, category: "scandal", unique: true,
    title: "地下室里没有编号的那一格",
    body: "你以为自己在查一件小事：一笔十年前被记错的土地交易。\n" +
      "归档员去吃饭了，钥匙挂在墙上。你在第三排最里面找到一个标着「杂项」的纸箱，\n" +
      "里面有一份没有编号的卷宗。它被人从正式的序列里拿出来过。\n" +
      "卷宗第一页只有一个名字和一行字。那个名字你认识，他上个月刚刚在一次晚宴上拍过你的肩。",
    brief: {
      lede: "你可以现在合上它。合上之后你还是那个什么都不知道的人。",
      known: [
        "这份卷宗不在正式序列里，也就是说：档案室自己的账上也查不到它。",
        "它被人为地抽出来过 —— 抽它的人想让它留在系统里，但不想让人顺着查。",
        "卷宗里有三个签名，其中一个是你所在党内的一位老人。",
        "归档员两点半回来。你还有一小时零十分钟。"
      ],
      rumor: [
        "有人说这条街上有两个人一直在等这份东西被翻出来。",
        "有人说它之所以没被销毁，是因为销毁它的人自己也需要留一份。"
      ],
      unknown: [
        "这上面的签字到底能不能证明什么。",
        "第一个翻到它的人，最后是什么下场。"
      ],
      terms: [
        { k: "无编号卷宗", v: "存在，但不进入检索序列。它的作用是「有人需要它的时候找得到」。" },
        { k: "复印", v: "带复印件出门就是把风险从一个机构转到你自己身上。纸在你手上，账在你头上。" }
      ]
    },
    choices: [
      {
        id: "copy", text: "整份复印，装进西装内袋带走",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "attr", key: "INT", w: 0.25 }],
        cost: { fun: 0.1, ap: 1 }, stake: { ap: true },
        outcomes: {
          crit: aOut("你在复印机上过了两遍，第二遍是为了对准页码。走的时候你还把原件按原来的折痕放了回去。你出门的时间是两点二十七。",
            { lev: 1, fac: { agency: 4 }, flags: ["archive_taken"] }),
          ok: aOut("复印机响了很久。你把它夹进一份普通的预算报告里，从正门走出去。",
            { lev: 1, flags: ["archive_taken"] }),
          meh: aOut("复印到一半机器卡纸。你抽出来的那页缺了右下角，正好是日期。",
            { lev: 1, hp: -0.8, flags: ["archive_taken"] }),
          fail: aOut("你只来得及复印前半份。后半份里有什么，你以后会一直想知道。",
            { lev: 1, hp: -1, flags: ["archive_taken"] }),
          critfail: aOut("归档员提前回来了。你说你在找洗手间，他信了。但复印机的计数器上多了一个数字。",
            { lev: 1, hp: -1.25, fac: { agency: -6 }, flags: ["archive_taken", "archive_seen"] })
        }
      },
      {
        id: "memo", text: "只抄下编号、日期和那三个签名",
        base: 0.72, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "attr", key: "CUN", w: 0.2 }],
        cost: { ap: 1 },
        outcomes: {
          crit: aOut("你用铅笔在车票背面抄完全部信息，然后把车票折好放进口袋。你什么都没带走，但从这一刻起你知道该去找谁。",
            { lev: 1, contact: { fixer: 10 }, flags: ["archive_taken"] }),
          ok: aOut("抄完了。你没有纸质的把柄，但你有三个名字、两个日期和一个卷宗号。",
            { lev: 1, flags: ["archive_taken"] }),
          meh: aOut("你抄漏了一个签名。三个月后你花了两周去补那一个名字。",
            { lev: 1, hp: -0.5, flags: ["archive_taken"] }),
          fail: aOut("你抄到一半有人进来找东西。你合上本子，陪他聊了四分钟，然后忘了两个日期。",
            { lev: 1, hp: -1, flags: ["archive_taken"] }),
          critfail: aOut("你在本子上写了太多。归档员第二天在桌上捡到一张写着三个名字的便条，他不认识那些名字，但他记住了你的字。",
            { lev: 1, rep: -0.6, fac: { agency: -8 }, flags: ["archive_taken", "archive_seen"] })
        }
      },
      {
        id: "return", text: "合上，按原样放回去，走出这栋楼",
        base: 0.74, mods: [{ src: "attr", key: "INTG", w: 0.5 }],
        outcomes: {
          crit: aOut("你把卷宗按原折痕放好，还把纸箱推回原来的位置。两年后这份东西被另一个记者翻了出来，那一次没有你。你活了下来，而且什么都没欠。",
            { rep: 0.6, fac: { base: 5, agency: 4 } }),
          ok: aOut("你合上了它。走出地下室的时候楼梯间的灯一盏一盏在你身后亮起来。",
            { rep: 0.4, fac: { base: 3 } }),
          meh: aOut("你合上了它，但那三个名字你已经看见了。它们会在你脑子里待很多年。",
            { rep: 0.2, hp: -0.5 }),
          fail: aOut("你放回去了，但你把顺序弄乱了。归档员后来花了三天重排那一箱东西。",
            { rep: -0.2, fac: { agency: -3 } }),
          critfail: aOut("你在里面站得太久。有人报告说地下室的灯亮过整个午休时段。这件小事以后会在某个不合适的时候被想起来。",
            { rep: -0.4, fac: { agency: -5 }, flags: ["archive_seen"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 第二幕 · 被反噬（前情必须演过、而且你确实把东西带走了）
   * ======================================================================== */
  {
    id: "archive_bite", era: ARCH_ERAS, tierMin: 1, tierMax: 5, weight: 11,
    grade: "mid", valence: "bane", dyn: true, category: "scandal", unique: true,
    flags: ["archive_taken"],
    after: { id: "archive_get", minMonthsAfter: 3, maxMonthsAfter: 30 },
    title: "有人在打听你上个月去了哪里",
    body: "最开始是一通打错的电话。第二周有人在你的车位对面坐了四十分钟。\n" +
      "第三周，一位自称在做「行业调查」的女士约你喝咖啡，\n" +
      "她问了七个问题，其中六个是关于城市的交通规划，第七个是：\n" +
      "「您对档案保管这件事有什么看法？」\n" +
      "你那份复印件还锁在抽屉里，一次都没用过。",
    brief: {
      lede: "把柄的第一个代价不是用它，而是拿着它。",
      known: [
        "她不是记者 —— 记者的本子会摊开，她的本子是合着的。",
        "她问的那个问题里没有主语，所以她也不知道具体是哪一份。她只知道你翻过东西。",
        "归档员两年前丢过一次工作，他非常需要现在这份工作。",
        "你手上那份复印件至今没有第三个人看过，这是你唯一的筹码。"
      ],
      rumor: [
        "有人说这位女士上一个约谈的对象，三个月后主动辞去了公职。",
        "有人说档案室那台复印机的计数记录，每个季度会被调一次。"
      ],
      unknown: [
        "她背后是谁：是那个名字的主人，还是另一个也在找这份东西的人。",
        "如果她其实什么都不确定，她会不会就等你先动。"
      ],
      terms: [
        { k: "被反噬", v: "你查别人的时候，别人也在查「谁在查」。这一层永远比你想的薄。" },
        { k: "冷处理", v: "把东西收起来、暂停一切动作。在大多数真实案例里，这是唯一有效的办法。" }
      ]
    },
    choices: [
      {
        id: "counter", text: "反过来查她：她上周三在哪辆车上",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "fac", key: "agency", w: 0.3 }],
        cost: { fun: 1, ap: 2 }, stake: { fun: true, ap: true },
        outcomes: {
          crit: aOut("三天后你手里有了一份车牌、一个办公地址和一个不该出现的人名。你把这三样东西装进信封，寄到了她的办公地址。她没有再出现。",
            { lev: 1, rep: 0.6, contact: { fed: 8 }, fac: { agency: 8 }, flags: ["archive_hunter"] }),
          ok: aOut("你弄清楚了她是替谁办事的，也让她知道你弄清楚了。咖啡没有第二杯。",
            { contact: { fed: 4 }, fac: { agency: 5 }, flags: ["archive_hunter"] }),
          meh: aOut("你花了四千块和一个星期，只查到她在一家没有门牌的事务所上班。",
            { hp: -1, fac: { agency: 2 } }),
          fail: aOut("你派去的人被她认出来了。她从那天起换了车，也换了一个更有耐心的做法。",
            { rep: -0.6, hp: -1, fac: { agency: -8 }, flags: ["archive_seen"] }),
          critfail: aOut("你查她的动作，比你翻档案的动作更清楚地说明了一件事：那份东西是真的，而且你很在乎。",
            { rep: -1, hp: -1.25, fac: { agency: -12 }, flags: ["archive_seen", "investigation_open"] })
        }
      },
      {
        id: "leak", text: "先下手：把材料交给一个你信得过的写字的人",
        base: 0.58, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "press", w: 0.35 }],
        cost: { ap: 1 }, req: { contact: "columnist" },
        outcomes: {
          crit: aOut("他没有立刻写。他把复印件的每一页都做了编号，然后当着你的面锁进了保险箱。「等他们先动，」他说。这个人比你想的老练得多。",
            { rep: 0.8, contact: { columnist: 14 }, fac: { press: 12 }, flags: ["archive_leak", "archive_hunter"] }),
          ok: aOut("材料有了第二个持有人。从这一刻起，你不能被单独处理了 —— 这就是你要的。",
            { rep: 0.4, contact: { columnist: 8 }, fac: { press: 8 }, flags: ["archive_leak"] }),
          meh: aOut("他收下了复印件，然后劝你忘掉这件事。你分不清这是在保护你，还是在保护他自己将来那篇稿子。",
            { contact: { columnist: 3 }, fac: { press: 3 }, flags: ["archive_leak"] }),
          fail: aOut("他把材料退了回来：「我现在不碰这个。」你多一个人知道了这件事，却没多一个帮手。",
            { rep: -0.4, contact: { columnist: -6 }, fac: { press: -4 }, flags: ["archive_leak"] }),
          critfail: aOut("他收下了。两周后你才知道他那张报纸的另一位股东，就是卷宗上第二个名字的姐夫。",
            { rep: -1, contact: { columnist: -12 }, fac: { press: -10 }, flags: ["archive_leak", "archive_seen"] })
        }
      },
      {
        id: "cold", text: "冷处理：停手，把复印件锁进银行保险箱",
        base: 0.66, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "INTG", w: 0.25 }],
        cost: { fun: 0.1 },
        outcomes: {
          crit: aOut("你把复印件存进银行，然后把这件事从日程上彻底划掉。四个月后，那位女士去约谈了别人 —— 她从来不缺目标，只缺目标里面的耐心。",
            { rep: 0.6, hp: -0.5, fac: { agency: 6 } }),
          ok: aOut("你停手了。那通电话、那个车位，都在一个月后消失了。",
            { hp: -0.8, fac: { agency: 3 } }),
          meh: aOut("你停手了，但你有半年时间一上车就先看后视镜。这半年你什么正事都没做成。",
            { hp: -1.5, rep: -0.2 }),
          fail: aOut("你停手了，可是你弟弟知道你去了档案室。他喝多了的时候跟人提过一次。",
            { hp: -1, rep: -0.4, flags: ["archive_seen"] }),
          critfail: aOut("你停手的动作太大了 —— 忽然取消三场行程、换掉电话号码。这个动作本身说明了很多。",
            { hp: -1.25, rep: -0.6, fac: { agency: -8 }, flags: ["archive_seen"] })
        }
      },
      {
        id: "nothing", text: "什么都不做，按原计划过完这个月",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "attr", key: "INTG", w: 0.2 }],
        outcomes: {
          crit: aOut("你照常打了四场高尔夫、去了两次教堂、在一场婚礼上讲了话。你的日程表比任何辩解都更能证明你不在乎。她放弃了。",
            { rep: 0.6, fac: { agency: 4, base: 4 } }),
          ok: aOut("你什么都没做。她约了第二次，你去了，还是那七个问题。第三次就没再联系。",
            { rep: 0.2, fac: { base: 2 } }),
          meh: aOut("你什么都没做，也没有人来第二次。你至今不确定她是放弃了，还是在等你先动。",
            { hp: -0.8 }),
          fail: aOut("你什么都没做，而你的合伙人在这个月里替你做了点什么。你不知道他做了什么。",
            { rep: -0.6, fac: { base: -4 } }),
          critfail: aOut("你什么都没做，但这件事在你心里发酵了七个月。你在一次无关的场合说了不该说的一句半。",
            { rep: -0.8, hp: -1, flags: ["archive_seen"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 第三幕 · 摊牌（大事件，一局一次）
   * ======================================================================== */
  {
    id: "archive_showdown", era: ARCH_ERAS, tierMin: 1, tierMax: 5, weight: 10,
    grade: "major", valence: "bane", dyn: true, category: "scandal", unique: true,
    after: { id: "archive_bite", minMonthsAfter: 2, maxMonthsAfter: 24 },
    title: "那扇门后面的两个小时",
    body: "他请你去他的办公室，时间是周日下午，楼里没有别人。\n" +
      "他自己倒了两杯水，然后说：「你想要的，我不问你从哪拿到的。\n" +
      "我只问你一句：你想要什么。」\n" +
      "两个小时后你从楼里出来，天还没黑。\n" +
      "你手里那份复印件在西装内袋里，还是热的。",
    brief: {
      lede: "这份东西最多能换一样东西。选定之后，它就没有第二次了。",
      known: [
        "他不是一个会被吓住的人 —— 他这一生见过比这份卷宗更糟的东西。",
        "但他有一个真正在意的东西：他儿子明年要竞选同一个位子。",
        "他有能力给你的东西有三种：一个位置、一笔钱、或者从此不再为难你。",
        "这份卷宗一旦公开，牵连的不只是他。那三个名字里有两个还在位。"
      ],
      rumor: [
        "有人说他其实一直知道这份东西在哪，他在等谁先动手。",
        "有人说他准备了两个信封，一个给你，一个给律师。"
      ],
      unknown: [
        "如果你什么都不要，他会不会认为你在留后手。",
        "那两个还在位的名字，将来会不会替你把这件事按下去 —— 或者替你把它翻出来。"
      ],
      terms: [
        { k: "摊牌", v: "让双方都明白对方手里有什么。它结束的是猜测，不是冲突。" },
        { k: "一次机会", v: "把柄换来的让步没有第二次。所以你想要什么，必须在这一次说清楚。" }
      ]
    },
    choices: [
      {
        id: "deal", text: "换一个位置：把这件事换成我下一步的台阶",
        base: 0.56, mods: [{ src: "attr", key: "CUN", w: 0.5 }, { src: "attr", key: "CHA", w: 0.25 }],
        cost: { lev: 1 }, stake: { fav: true },
        outcomes: {
          crit: aOut("他站起来，走到窗边，说了一个日期和一个人名。「那天你去见这个人，什么都不用带。」三周后你在一份任命名单上看到了自己的名字。",
            { tier: 1, rep: 1, fac: { establishment: 16, agency: 6 }, flags: ["archive_deal", "compromised"] }),
          ok: aOut("他打了一个电话，说了四句话。你得到了那个位置，也得到了一个你永远不会忘记的沉默。",
            { tier: 1, rep: 0.7, fac: { establishment: 12 }, flags: ["archive_deal", "compromised"] }),
          meh: aOut("他给了你一个次级的位置，还附带一句「先在那里做两年」。你听懂了这句话的另一半意思。",
            { rep: 0.3, fac: { establishment: 6 }, flags: ["archive_deal"] }),
          fail: aOut("他答应了，然后什么都没做。三个月后你才明白，他要的只是知道你会开什么价。",
            { rep: -0.4, fac: { establishment: -8 }, flags: ["archive_deal"] }),
          critfail: aOut("他把整段对话录了下来，而且没有剪掉你开口的那一句。这段录音从此躺在某个抽屉里，和你的卷宗放在一起。",
            { rep: -1, fac: { establishment: -14, press: -8 }, flags: ["archive_deal", "compromised", "scandal_3"] })
        }
      },
      {
        id: "expose", text: "公开：让它离开我的抽屉，变成所有人的事",
        base: 0.48, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "press", w: 0.3 }],
        cost: { ap: 2, rep: 0.4 },
        outcomes: {
          crit: aOut("你把全套材料交给了三家不同的机构，同一天。三个月后有一个委员会成立，一年后有一份报告。你的名字在报告的第一段，作为「材料来源」。你失去了很多朋友，得到了一个不会过期的东西。",
            { rep: 1.75, fac: { press: 20, base: 10, agency: -12, establishment: -14 }, flags: ["archive_expose", "whistleblower"] }),
          ok: aOut("它登出来了。你成了那个捅出事情的人 —— 有人从此不再跟你握手，也有人从此开始给你打电话。",
            { rep: 1, fac: { press: 14, base: 6, establishment: -10 }, flags: ["archive_expose", "whistleblower"] }),
          meh: aOut("它登了出来，但被做成了一桩「土地纠纷」。三个月后没有人记得。你付出了代价，什么都没换来。",
            { rep: 0.3, fac: { press: 6, establishment: -8, base: -4 }, flags: ["archive_expose"] }),
          fail: aOut("公开之前有人替你「校订」了材料，三个名字变成了一个。你成了被引导的那只手。",
            { rep: -0.3, fac: { press: -8, establishment: -6 }, flags: ["archive_expose"] }),
          critfail: aOut("材料是真的，但你的动机被写成了另一回事：为了那个位子。整件事最后变成了关于你的一场审查。",
            { rep: -0.9, fac: { press: -14, base: -10, establishment: -12 }, flags: ["archive_expose", "scandal_3", "investigation_open"] })
        }
      },
      {
        id: "hold", text: "留着不用：什么都不要，把牌扣在手里",
        base: 0.62, mods: [{ src: "attr", key: "CUN", w: 0.55 }],
        outcomes: {
          crit: aOut("你什么都没要，只说「我今天来是想认识您」。他送你到电梯口，握了很久的手。这张牌没打出去，但它从此每天都在替你说话。",
            { lev: 2, rep: 0.7, fac: { establishment: 10 }, flags: ["archive_hold"] }),
          ok: aOut("你把它扣住了。他会一直记得你手上有什么 —— 这比一次性的交换有用得多。",
            { lev: 1, rep: 0.3, fac: { establishment: 6 }, flags: ["archive_hold"] }),
          meh: aOut("你扣住了它。他从此不再为难你，也不再帮你。你换到的是「谁也不欠谁」。",
            { lev: 1, rep: 0.1, flags: ["archive_hold"] }),
          fail: aOut("你说「我什么都不要」的时候笑了一下。他看懂了那个笑。从那天起他开始准备第二份材料。",
            { lev: 1, rep: -0.4, fac: { establishment: -10 }, flags: ["archive_hold"] }),
          critfail: aOut("你把牌扣在手里，还四处暗示你手上有牌。一张没有打出去却被所有人看见的牌，等于没有牌 —— 只剩风险。",
            { rep: -0.7, fac: { establishment: -12, press: -8 }, flags: ["archive_hold", "scandal_2"] })
        }
      },
      {
        id: "burn", text: "烧掉：当着面把它烧了，从此两清",
        base: 0.68, mods: [{ src: "attr", key: "INTG", w: 0.55 }],
        outcomes: {
          crit: aOut("你就着他的烟灰缸把复印件点着了，然后把灰搅开。他看了很久，说：「你是我这十年里见过的第二个这么做的人。」他后来真的成了你的长辈。",
            { rep: 1, lev: -1, fac: { establishment: 14, base: 8 }, flags: ["archive_burn"] }),
          ok: aOut("烧了。他点了点头，没有说谢谢。你们两个人那天都轻松了一点。",
            { rep: 0.6, lev: -1, fac: { establishment: 8 }, flags: ["archive_burn"] }),
          meh: aOut("你烧了复印件。原件还在档案馆里 —— 你们都清楚这一点，他也没说破。",
            { rep: 0.3, lev: -1, fac: { establishment: 4 }, flags: ["archive_burn"] }),
          fail: aOut("你烧得太快了，反而显得像在演。他送你出门的时候，眼神里有一点同情。",
            { rep: -0.1, fac: { establishment: -2 }, flags: ["archive_burn"] }),
          critfail: aOut("你烧的是复印件。原件被另一个知道你翻过档案的人取走了，而你在这一晚亲手放弃了自己唯一的筹码。",
            { rep: -0.7, lev: -1, fac: { establishment: -8 }, flags: ["archive_burn", "archive_seen"] })
        }
      }
    ]
  },

  /* ==========================================================================
   * 第四幕 · 了结（用 req.flag 分支：前面怎么选，结尾就怎么读）
   * ======================================================================== */
  {
    id: "archive_settle", era: ARCH_ERAS, tierMin: 0, tierMax: 5, weight: 12,
    grade: "mid", valence: "bane", dyn: true, category: "scandal", unique: true,
    after: { id: "archive_showdown", minMonthsAfter: 4, maxMonthsAfter: 48 },
    title: "那件事的回执",
    body: "你以为已经结掉的事情，回来给了你一张回执。\n" +
      "它不问你后不后悔，它只是把账单放在桌上：\n" +
      "有人升了，有人退了，有人搬走了，有人还在原来的位置上，还记得你的名字。\n" +
      "你现在要做的事只有一件：决定往后怎么带着这件事过日子。",
    brief: {
      lede: "事情做完之后剩下的那部分，才叫做后果。",
      known: [
        "这世界上没有「用过之后把牌放回牌堆」这种事。",
        "有些人已经知道了你曾经手上有过什么。他们不会问，但他们会记住。",
        "这件事以后还会有人提起，只是提起的方式会变。"
      ],
      rumor: [
        "有人说那份卷宗的原件还在，只是换了一格抽屉。",
        "有人说你当年见过的那个人，正在写一本回忆录。"
      ],
      unknown: [
        "十年后别人提起这件事的时候，会用哪一个版本。",
        "这件事最后会算在你的哪一个身份上。"
      ]
    },
    choices: [
      {
        id: "after_deal", text: "当年那笔交换，现在该由我来说它是什么了",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.45 }], req: { flag: "archive_deal" },
        outcomes: {
          crit: aOut("你抢在所有人之前，在一次公开的场合把那段往事讲成了「两个人各退一步的故事」。没有人能反驳，因为版本是你先给的。",
            { rep: 1.5, fac: { establishment: 10, press: 8 }, flags: ["archive_owned"] }),
          ok: aOut("你找了个合适的机会把它摆平：一句轻描淡写的解释，一顿有见证人的饭。它从此变成了一件旧事。",
            { rep: 0.8, fac: { establishment: 6 }, flags: ["archive_owned"] }),
          meh: aOut("你没有主动处理。它就这样悬在那里，偶尔被人在背后提一句，永远没有一个说法。",
            { rep: -0.2, fac: { establishment: 2 } }),
          fail: aOut("你解释得太用力了。本来没人问的事，被你自己翻了出来。",
            { rep: -0.8, fac: { press: -8, establishment: -6 }, flags: ["scandal_1"] }),
          critfail: aOut("你当年拿到那个位置的方式，被人在一份小报的地方版上拼了出来。细节有错，但在政治上，有错不重要。",
            { rep: -1.5, fac: { press: -12, establishment: -12, base: -6 }, flags: ["scandal_3", "investigation_open"] })
        }
      },
      {
        id: "after_expose", text: "站到证人席上，把它讲完",
        base: 0.55, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "attr", key: "CHA", w: 0.25 }], req: { flag: "archive_expose" },
        outcomes: {
          crit: aOut("你在听证会上讲了三个小时，一个字都没有夸张。那天下午之后，你在两个阵营里同时失去了位置，也在整整一代人那里得到了一个名字。",
            { rep: 2.75, fac: { press: 16, civil: 12, base: 10, establishment: -16 }, flags: ["whistleblower", "archive_owned"] }),
          ok: aOut("你出庭了，说得比材料本身少。这样也好 —— 少的那部分，别人会替你说。",
            { rep: 1.5, fac: { press: 10, base: 5, establishment: -10 } }),
          meh: aOut("你出庭了，然后那件事被并进了另一桩更大的案子。你的部分只占了两页。",
            { rep: 0.6, fac: { press: 5, establishment: -6 }, hp: -1 }),
          fail: aOut("有人在你之前出庭，讲了一个和你完全不同的版本。你成了那个「说法比较多」的证人。",
            { rep: -0.8, fac: { press: -8, base: -6 } }),
          critfail: aOut("交叉询问的时候，对方只用了二十分钟，就把你的动机拆成了「没拿到那个位置的人」。这句话后来跟着你很久。",
            { rep: -1.75, hp: -1.5, fac: { press: -12, base: -10, establishment: -10 }, flags: ["scandal_3"] })
        }
      },
      {
        id: "after_hold", text: "扣着的那张牌，现在只剩风险了",
        base: 0.58, mods: [{ src: "attr", key: "CUN", w: 0.5 }], req: { flag: "archive_hold" },
        outcomes: {
          crit: aOut("你找了个合适的人，把它送走了 —— 送给了当年卷宗上第一个名字的孙子，并且没有要任何回报。有些牌的正确用法是交给别人保管。",
            { rep: 1.5, lev: -1, fac: { establishment: 10, base: 6 }, flags: ["archive_owned"] }),
          ok: aOut("你没再用它。它慢慢变成了一份没有价值的旧纸 —— 而这正是你保住它的方式。",
            { rep: 0.6, lev: -1, fac: { establishment: 4 }, flags: ["archive_owned"] }),
          meh: aOut("你继续扣着它。你得开始算一件事：这份东西每多存在一年，你的风险就多一分。",
            { rep: 0.2, hp: -0.8 }),
          fail: aOut("有人知道你手上有东西。他没有来要，他只是在你每一次需要支持的时候迟疑一下。",
            { rep: -0.6, fac: { establishment: -8 } }),
          critfail: aOut("你扣着的东西被人拿走了 —— 不是偷，是他知道放在哪，而且他认为自己比你更有资格用它。",
            { rep: -1.5, lev: -1, fac: { establishment: -12 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "after_burn", text: "当年烧了纸，但事情本身还在别人手里",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.45 }], req: { flag: "archive_burn" },
        outcomes: {
          crit: aOut("你烧掉的那一份成了一桩传闻，而传闻里你是个守规矩的人。他后来在一次私人聚会上替你说了两句话，值很多年的功夫。",
            { rep: 1.5, fac: { establishment: 12, base: 6 }, flags: ["archive_owned"] }),
          ok: aOut("没有人再提过那件事。你偶尔会想，如果当年留下了会怎么样，然后就不想了。",
            { rep: 0.8, fac: { establishment: 5 }, flags: ["archive_owned"] }),
          meh: aOut("你想起了那份原件还在档案馆里 —— 也就是说这件事的开关现在在别人手上。你什么都做不了。",
            { rep: 0.2, hp: -0.5 }),
          fail: aOut("有人拿着一份复印件去找了你当年的对手。他没用，但他把这件事记在了一个你永远看不到的地方。",
            { rep: -0.6, fac: { establishment: -6 } }),
          critfail: aOut("你烧掉的只是自己那份。剩下的那一份在三年后的某一天出现在一份传票的附件里，而上面有你的签字。",
            { rep: -1.5, hp: -1, fac: { establishment: -10, press: -8 }, flags: ["scandal_3", "investigation_open"] })
        }
      },
      {
        id: "quiet", text: "不再提它。让它自己老掉",
        base: 0.66, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: aOut("七年之后，在一个完全无关的场合，有人提起了那件事，用的说法是「那年那件谁也没搞清楚的事」。没人接话。它真的老了。",
            { rep: 1, fac: { base: 5, establishment: 4 } }),
          ok: aOut("你不再提它。它以一个不重要的小道消息的形式活了下去，最后谁都不记得细节。",
            { rep: 0.4, fac: { base: 3 } }),
          meh: aOut("你不再提它，但你自己每年会想起那么两次。这两次都不在你最忙的时候。",
            { hp: -0.8 }),
          fail: aOut("你不再提它，但你开始回避某些场合、某些人、某几条街。你的日程表慢慢变得比你想的小。",
            { rep: -0.4, hp: -0.8, fac: { base: -3 } }),
          critfail: aOut("你以为它老了，但一直有人在替它续命 —— 每隔几年就有人把那份材料复印一遍。它不会老，它只是在等。",
            { rep: -1, hp: -1, fac: { agency: -6 }, flags: ["scandal_2"] })
        }
      }
    ]
  }
]);
