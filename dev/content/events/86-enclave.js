/* ============================================================================
 * CONTENT · 86-enclave.js
 * 【族群飞地与街头政治】在一个不属于你的国家里，先有社区，才有选票。
 *
 * 这条线的逻辑和"正经政治"完全不同：
 *   - 你不需要在党内排队，你需要先在一个社区里成为「我们的人」；
 *   - 这个社区的权力不在市政厅，在周日早晨的讲台上、在商户公所的长老会里、
 *     在谁能让八千人不来上班的那句话里；
 *   - 你可以一辈子不碰这条线 —— 但那样你就得靠钱、靠党派、靠别人替你
 *     去跟这几十万人解释你是谁。
 *
 * 三代主角在这条线上看到的是同一种东西：
 *   一个社区需要有人替它在市政厅里说话，而这件事的门槛，比选举低得多。
 *
 * 写这条线的三条约定：
 *   1) 社区可以给你的是「到场人数」和「信任」，不是钱。所以这里的收益主要是
 *      fac.base（基层选民）/ fac.civil（民权）/ fac.labor（工会），以及人脉。
 *   2) 社区也会要你付出——时间、面子、以及在某些事上公开站队。
 *      所以这里的成本主要是 rep（声望）与检定风险，很少是 fun（资金）。
 *   3) 每一个事件都留一条不要钱、不设门槛的路。你可以一直是那个
 *      「不掺和他们自己的事」的人。这在一开始完全没有代价。
 * ==========================================================================*/

const ENCL_ERAS = Object.keys(POTUS.reg.era);

function eOut(body, effects) { return { body: body, effects: effects || {} }; }

POTUS.define("event", [

  /* ==========================================================================
   * 1) 讲台上的十分钟
   * ======================================================================== */
  {
    id: "enc_preacher", era: ENCL_ERAS, tierMin: 0, tierMax: 4, weight: 10,
    grade: "minor", valence: "risk", dyn: true, category: "civil",
    title: "牧师给你教堂讲台上的十分钟",
    body: "南区的浸信会礼拜天早上有四百个人。牧师管着这四百个人的周日早晨，\n" +
      "也管着他们接下来一个星期里会怎么议论一个人。\n" +
      "他给了你十分钟。他说得很客气：「你可以在献诗之后讲几句。」\n" +
      "他没说的是：这十分钟里有多少双眼睛，会决定以后别人替你说话的时候用哪个称呼。\n" +
      "这四百人里会有三分之一去投票，而且他们会问牧师投谁。第三排坐着三位老人，社区真正记账的是他们。" +
      "他给你这十分钟不是因为你想，是有人托了他。",
    choices: [
      {
        id: "speak", text: "上去讲。讲你自己家里的事，不讲政策",
        base: 0.64, mods: [{ src: "attr", key: "CHA", w: 0.45 }, { src: "attr", key: "INTG", w: 0.3 }],
        cost: { rep: 0.4 }, stake: { fav: true },
        outcomes: {
          crit: eOut("你讲了六分钟，其中五分钟在讲你母亲来这个国家的第一年。散场的时候没有人跟你握手，他们只是把手放在你肩膀上。这个社区从此记住了一件关于你的事。",
            { rep: 2.5, contact: { preacher: 18, brother: 6 }, fac: { church: 16, base: 12, civil: 8 }, flags: ["enclave_base"] }),
          ok: eOut("十分钟，讲了该讲的，不咸不淡。散场后有三个人来跟你说话，其中一个问了你的电话。",
            { rep: 1.25, contact: { preacher: 9 }, fac: { church: 8, base: 6 } }),
          meh: eOut("你讲得很得体，得体得像一份简历。台下的人礼貌地听完了。",
            { rep: 0.4, contact: { preacher: 3 }, fac: { church: 3 } }),
          fail: eOut("你讲了七分钟的政策。第五分钟起，后排开始有人走动。",
            { rep: -0.8, contact: { preacher: -6 }, fac: { church: -6, base: -4 } }),
          critfail: eOut("你在讲台上提到了一个这个社区正在吵的旧事，还站错了边。散场之后有人在门口等你，不是为了握手。",
            { rep: -2, contact: { preacher: -14 }, fac: { church: -14, base: -10, civil: -6 }, flags: ["scandal_1"] })
        }
      },
      {
        id: "money", text: "不上台。把修屋顶的钱出了",
        base: 0.7, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        cost: { fun: 0.7 },
        outcomes: {
          crit: eOut("你没有上台，但修屋顶的承包商是你找的，价格比别家低三成。牧师在收工那天当着三个人的面说了一句「这个人办事」。这四个字在这个社区里很贵。",
            { rep: 1.25, contact: { preacher: 12, fixer: 6 }, fac: { church: 10, base: 6 } }),
          ok: eOut("钱出了，屋顶修好了。牧师记下了这件事，也记下了金额。",
            { rep: 0.4, contact: { preacher: 7 }, fac: { church: 6 } }),
          meh: eOut("钱出了，但承包商拖了两个月。牧师每次看到漏水的天花板都会想起你。",
            { contact: { preacher: 2 }, fac: { church: 1 } }),
          fail: eOut("钱出了，屋顶也修了，然后有人在社区会议上问：「他出这钱是想买什么？」",
            { rep: -0.8, contact: { preacher: -4 }, fac: { church: -3, base: -3 } }),
          critfail: eOut("你出的钱比工程实际花的多，多出来的那一部分去向不明。这件事在三个星期里传遍了整个南区。",
            { rep: -2, contact: { preacher: -12 }, fac: { church: -12, base: -8 }, flags: ["scandal_1"] })
        }
      },
      {
        id: "pass", text: "两个都不选。周日在家待着",
        base: 0.74, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: eOut("你没去。半年后你才明白那场礼拜上发生了一件更重要的事，而你没有卷进去 —— 有时候不出现也是一种正确。",
            { rep: 0.8, fac: { base: 3 } }),
          ok: eOut("你在家待了一个上午。这个世界上少了一个不认识你的人数过你的名字。",
            { rep: 0.4 }),
          meh: eOut("你没去，也没人问。这个社区本来就没有等过你。",
            { rep: 0 }),
          fail: eOut("你没去。牧师第二天通过一个共同的朋友问了一句「他是不是看不上我们」。这句话被转述了三次。",
            { rep: -0.8, contact: { preacher: -6 }, fac: { church: -6 } }),
          critfail: eOut("你没去，而那天的讲台上站着你的对手。他讲了六分钟，散场的时候有人替他按住了电梯门。",
            { rep: -1.5, contact: { preacher: -10 }, fac: { church: -10, base: -8 } })
        }
      }
    ]
  },

  /* ==========================================================================
   * 2) 商户公所的长老们
   * ======================================================================== */
  {
    id: "enc_elders", era: ENCL_ERAS, tierMin: 0, tierMax: 5, weight: 9,
    grade: "minor", valence: "risk", dyn: true, category: "civil",
    title: "商户公所的七位长老请你去喝茶",
    body: "旧城区那条街上的商户公所有七位长老。他们不管你选举，他们管这条街上\n" +
      "谁能开张、谁的地租能谈、谁家的小孩可以去那个周末补习班。\n" +
      "他们请你去喝茶。茶叶是很旧的那种，杯子是别人家用过的玻璃杯。\n" +
      "七个人坐在你对面，没有人先开口。这是他们的规矩：让客人先说。\n" +
      "这条街上八百个人、两百张票；他们在乎的不是你站哪边，是你能不能办成一件事。" +
      "他们不会先说那件事是什么，得你问出来。公所没有章程也没有选举，它的权力来自「大家都这么办」。",
    choices: [
      {
        id: "ask", text: "先问：你们要我办哪一件事",
        base: 0.66, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: eOut("你问对了。他们说的是街区改造款的申请材料 —— 一份需要有人去市政厅盯三个月的材料。你真的去盯了。三个月后这条街的门面换了七十扇。",
            { rep: 2.5, contact: { brother: 8, fixer: 10 }, fac: { civil: 14, base: 10, commercial: 6 }, flags: ["enclave_base"] }),
          ok: eOut("你问出来了，也办成了。不是大事，但他们记住了「这个人问问题的时候会记笔记」。",
            { rep: 1.25, contact: { fixer: 6 }, fac: { civil: 8, base: 5 } }),
          meh: eOut("你问了，他们说「没什么事，就是认识一下」。你知道这不是真话，但你没继续追。",
            { rep: 0.4, contact: { fixer: 2 }, fac: { civil: 2 } }),
          fail: eOut("你问得太直接了。七个人里有两个开始收拾茶具 —— 在他们的语言里，这叫送客。",
            { rep: -0.8, fac: { civil: -6, base: -3 } }),
          critfail: eOut("你答应了一件你办不到的事，而且当场说得很满。三个月后这条街上所有人都知道你「说了不算」。",
            { rep: -2, fac: { civil: -14, base: -8, commercial: -6 }, flags: ["scandal_1"] })
        }
      },
      {
        id: "donate", text: "先出钱：给公所的助学名额捐一笔",
        base: 0.68, mods: [{ src: "attr", key: "CUN", w: 0.35 }],
        cost: { fun: 1.75 },
        outcomes: {
          crit: eOut("你捐的时候说了一句话：「钱不够再找我，但别写我的名字。」第二个月，公所门口那块木牌上多了一行小字，是你的名字。这是他们给外面人的最高礼遇。",
            { rep: 2, contact: { fixer: 10, preacher: 6 }, fac: { civil: 12, base: 8 } }),
          ok: eOut("钱进去了，茶喝完了，你走的时候有人送出门。这就够了。",
            { rep: 0.8, contact: { fixer: 6 }, fac: { civil: 7 } }),
          meh: eOut("钱收了，谢谢说了，然后就没有然后。你开始怀疑这笔钱是不是真的到了补习班。",
            { rep: 0.4, fac: { civil: 2 } }),
          fail: eOut("你捐的数目在这个社区里算「太有诚意」。第二天就有人开始打听你是做什么生意的。",
            { rep: -0.8, fac: { civil: -4, base: -3 } }),
          critfail: eOut("有人把你捐款的数额告诉了另一家商会。在他们那里，这个数字被读成了「价码」。",
            { rep: -1.5, fac: { civil: -8, commercial: -8 }, flags: ["bought"] })
        }
      },
      {
        id: "tea", text: "光喝茶。把七个人的名字都记住",
        base: 0.72, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "attr", key: "INT", w: 0.25 }],
        outcomes: {
          crit: eOut("你喝了两壶茶，听到了这条街三十年的历史，包括谁跟谁为什么结了仇。你什么都没承诺，但你是第一个愿意听完的人。",
            { rep: 1.25, contact: { fixer: 8, preacher: 4 }, fac: { civil: 8, base: 5 } }),
          ok: eOut("茶喝完了，寒暄也完了。你记住了三个名字，这就比大多数人做得多。",
            { rep: 0.4, contact: { fixer: 4 }, fac: { civil: 4 } }),
          meh: eOut("你坐了一个下午，听了两场和钱无关的抱怨。收获不大，也没损失。",
            { rep: 0.4, fac: { civil: 2 } }),
          fail: eOut("你听了两个小时，什么都没问。在他们看来，「什么都不要」的人最可疑。",
            { rep: -0.4, fac: { civil: -4 } }),
          critfail: eOut("你在茶桌上提到了隔壁那条街的名字。那三个字触到了某位长老三十年前的事。",
            { rep: -1.25, fac: { civil: -8, base: -4 } })
        }
      }
    ]
  },

  /* ==========================================================================
   * 3) 双语选票
   * ======================================================================== */
  {
    id: "enc_ballot", era: ENCL_ERAS, tierMin: 1, tierMax: 5, weight: 10,
    grade: "mid", valence: "risk", dyn: true, category: "civil", medium: "print",
    title: "选务处要撤掉三个投票站的双语选票",
    body: "选务处今年打算把双语选票从三个投票站撤掉，理由是「使用率不足」。\n" +
      "使用率的算法是这样的：只有在投票站当场要求过双语选票的人，才算使用者。\n" +
      "而在这三个站里，一共有一千七百个从来不说英语的选民。\n" +
      "他们不是不需要，他们是不问。\n" +
      "撤的正是老城最集中、投票率最低的那三个站。你现在还有二十天，之后委员会开例会。" +
      "报纸上还没人写它——它眼下只算一个行政决定。有人说这个方案是某个候选人的办公室递上去的。",
    choices: [
      {
        id: "public", text: "公开站出来：把这件事变成一件所有报纸都会写的事",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.45 }, { src: "fac", key: "civil", w: 0.35 }],
        cost: { rep: 0.6 }, stake: { fav: true },
        outcomes: {
          crit: eOut("你在市政厅门口开了一场十五分钟的记者会，说的全是数据。第二天方案被退回重审。一年后那三个站的双语选票使用率变成了原来的四倍 —— 因为从那天起有人开始问了。",
            { rep: 2.5, contact: { columnist: 12, preacher: 10 }, fac: { civil: 20, base: 14, press: 12, establishment: -10 }, flags: ["enclave_base", "civil_win"] }),
          ok: eOut("报纸写了。方案推迟了一年，第二年用了个折中的办法：两个站保留，一个站撤掉。你没法全赢，但你让这件事变得有档案可查。",
            { rep: 1.5, fac: { civil: 13, base: 8, press: 8, establishment: -6 } }),
          meh: eOut("有人写了。篇幅很小，登在地方版，第二天就没有下文了。方案照旧。",
            { rep: 0.4, fac: { civil: 5, base: 3 } }),
          fail: eOut("你站出来了，但话说得太重。选务处主任在委员会上把你描述成「想把行政问题政治化的人」。方案通过了。",
            { rep: -0.6, fac: { civil: 4, base: 2, establishment: -12, agency: -8 } }),
          critfail: eOut("你站出来之后，这件事变成了「某某人为了选票在闹」。三个站的双语选票如期取消，而且这一次没有人再提。",
            { rep: -1.25, fac: { civil: -6, base: -8, establishment: -12, press: -8 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "inside", text: "走内部：找选务处主任，给他一个不用丢面子的方案",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.45 }, { src: "attr", key: "CUN", w: 0.3 }],
        cost: { fun: 0.6 },
        outcomes: {
          crit: eOut("你带着一份现成的替代方案去见他：把三个站的成本改由社区基金会承担一半。他在文件上签了字，还在备注里写了一句「由社区自筹解决」。那三个站保住了，而且没有人输。",
            { rep: 1.5, contact: { fixer: 8 }, fac: { civil: 12, establishment: 8, base: 8 }, flags: ["civil_win"] }),
          ok: eOut("他答应把撤并推迟两年。两年里你可以做很多事。",
            { rep: 0.8, fac: { civil: 7, establishment: 4 } }),
          meh: eOut("他收下了材料，也收下了你的客气。方案改了一个字：把「撤掉」改成了「并入邻近站点」。",
            { rep: 0, fac: { civil: 2, establishment: 1 } }),
          fail: eOut("他非常有礼貌地告诉你，他只是一名公务员。三天后方案按时通过。",
            { rep: -0.4, fac: { civil: 2, establishment: -4 } }),
          critfail: eOut("你去找他的这件事被人报了上去。委员会里有人问：「为什么有人要先找主任，再上报纸？」",
            { rep: -0.8, fac: { civil: 3, establishment: -10, agency: -6 } })
        }
      },
      {
        id: "media", text: "先不动声色，把这件事交给一个会写的人",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "press", w: 0.3 }],
        cost: {}, req: { contact: "columnist" },
        outcomes: {
          crit: eOut("他没有写行政决定，他写了一千七百个人的名字是怎么从名单上消失的。这篇稿子后来被别的报纸转载了十一次。",
            { rep: 2, contact: { columnist: 14 }, fac: { civil: 16, press: 14, base: 10 }, flags: ["enclave_base", "civil_win"] }),
          ok: eOut("稿子登了，选务处第二天改口说「暂时不撤」。你什么都没站出去，事情就成了。",
            { rep: 1, contact: { columnist: 8 }, fac: { civil: 9, press: 8 } }),
          meh: eOut("他写了，但写偏了：整篇在讲行政部门的预算困境。方案没有被撤回。",
            { rep: 0.2, contact: { columnist: 2 }, fac: { civil: 3, press: 2 } }),
          fail: eOut("他压了三周，最后说「这个题材今年写过了」。你浪费了二十天里最重要的那一周。",
            { rep: -0.4, contact: { columnist: -4 }, fac: { civil: -3, press: -2 } }),
          critfail: eOut("稿子见报的同一天，那位主任公开了另一份数据，证明这三个站去年只用了四张双语选票。你举的那一面旗被拆成了算术题。",
            { rep: -1, contact: { columnist: -8 }, fac: { civil: -8, base: -6, press: -8 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "silent", text: "不表态。这件事不该由你来说",
        base: 0.66, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "attr", key: "INTG", w: 0.25 }],
        outcomes: {
          crit: eOut("你没有开口 —— 你让社区里三位老人自己去市政厅坐了三天。方案撤了，而且是他们撤下来的。他们从此把这件事算在「我们自己」这一类里，而你被允许站在旁边。",
            { rep: 1, contact: { preacher: 8 }, fac: { civil: 10, base: 8 } }),
          ok: eOut("别人把这件事办成了。你在其中的位置是「没有反对」。这也算一种立场。",
            { rep: 0.4, fac: { civil: 4, base: 3 } }),
          meh: eOut("没有人说话，方案通过了。那三个站的双语选票从此没有回来。",
            { rep: 0, fac: { base: -2 } }),
          fail: eOut("你没有说话，而社区里有人在等你说。他们记住的不是你的立场，是你的沉默。",
            { rep: -0.6, fac: { civil: -8, base: -6 } }),
          critfail: eOut("你没说话，但你的对手替你说了 —— 他站在市政厅门口，站在那三位老人旁边，而且他站得很对。",
            { rep: -1.25, contact: { preacher: -8 }, fac: { civil: -12, base: -10, press: -4 } })
        }
      }
    ]
  },

  /* ==========================================================================
   * 4) 街上的规矩
   * ======================================================================== */
  {
    id: "enc_street", era: ENCL_ERAS, tierMin: 0, tierMax: 5, weight: 9,
    grade: "mid", valence: "risk", dyn: true, category: "civil",
    title: "街上商户想自发组织夜间巡逻队",
    body: "三个月里这条街上发生了四起抢劫，都是晚上十点以后，都在离警局八个街区的地方。\n" +
      "报警的等候时间从九分钟变成了三十七分钟。\n" +
      "二十三家店铺的老板开了个会，有人提议自己组织夜间巡逻。\n" +
      "会议室里坐着的还有两位穿制服的先生，他们明显不喜欢这个提议。\n" +
      "别的城的抢劫案就是这么降下来的——可巡逻队一成立，三个月内总要有人受伤或者做过头。" +
      "警局真正在意的不是治安，是谁在管这条街。有人说局里这半年被抽走了七个人，" +
      "而那二十三个老板里有九个明年要续租。",
    choices: [
      {
        id: "support", text: "支持巡逻队，但要求它挂在社区协会名下",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "civil", w: 0.3 }],
        cost: { fav: 1 }, stake: {},
        outcomes: {
          crit: eOut("你让他们挂了靠。协会章程、值班表、禁止携带物品的清单，全是按你的意思写的。巡逻队跑了十一个月，这条街的夜间报案数降了六成，没有出过一件事。",
            { rep: 1.5, contact: { union_boss: 10, preacher: 8 }, fac: { civil: 16, base: 12, labor: 8, agency: -10 }, flags: ["enclave_base", "street_patrol"] }),
          ok: eOut("巡逻队成立了。有人不满意，但到了冬天，街上确实安静了一些。",
            { rep: 0.8, fac: { civil: 10, base: 8, agency: -6 }, flags: ["street_patrol"] }),
          meh: eOut("巡逻队成立了，跑了两个月，然后因为值班排不开而解体。街上的抢劫案回到了原来的样子。",
            { rep: 0.2, fac: { civil: 3, agency: -3 } }),
          fail: eOut("巡逻队成立的第三周，两个年轻人把一个路人堵在了巷口。没有人受伤，但警察来了两辆车。",
            { rep: -1, fac: { civil: 2, base: -4, agency: -14 }, flags: ["scandal_2"] }),
          critfail: eOut("你支持的巡逻队和警方在现场起了冲突，还上了本地新闻。这件事之后，两边的账都记在了你的名字上。",
            { rep: -1.5, fac: { civil: 3, base: -6, agency: -18, press: -8 }, flags: ["scandal_3", "investigation_open"] })
        }
      },
      {
        id: "police", text: "不搞巡逻队，去把警力要回来",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "agency", w: 0.4 }],
        cost: { fun: 0.2 }, req: { fac: "agency", min: 10 },
        outcomes: {
          crit: eOut("你在预算听证会上把八个街区的等候时间做成了一张表，念了三分钟。一个月后这条街多了一个夜间巡逻车组，而且是常驻的。",
            { rep: 1.5, attr: { INT: 2 }, fac: { agency: 16, establishment: 8, base: 8, civil: 6 } }),
          ok: eOut("警局答应每周多加两班车。不多，但街上的人看得见警灯。",
            { rep: 0.8, attr: { INT: 1 }, fac: { agency: 10, base: 5 } }),
          meh: eOut("他们非常客气地听完了，然后说今年的编制已经定了。",
            { rep: 0, fac: { agency: 3, base: -2 } }),
          fail: eOut("你在听证会上说得太直接，让一位副局长当场难堪。车没加，那条街的等候时间变成了四十一分钟。",
            { rep: -0.6, fac: { agency: -8, base: -6 } }),
          critfail: eOut("你替警局说话这件事被那二十三个老板听说了。他们开始怀疑你到底是哪一边的人 —— 这条街上最怕的就是这个怀疑。",
            { rep: -1.25, fac: { civil: -12, base: -10, agency: 4 } })
        }
      },
      {
        id: "both", text: "两边都请来开会：让巡逻队和警局坐进同一个房间",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.5 }, { src: "fac", key: "base", w: 0.3 }],
        cost: { fun: 0.1 },
        outcomes: {
          crit: eOut("三个小时，吵了两次，最后谈成了一件小事：巡逻队负责打电话，警局承诺十分钟内接线。有时候两边不需要互相信任，只需要一个电话号码。",
            { rep: 2, contact: { union_boss: 8, fed: 8 }, fac: { civil: 12, base: 12, agency: 10, establishment: 6 }, flags: ["enclave_base"] }),
          ok: eOut("会开完了，两边都没有当场走人。这本身就是一个结果。",
            { rep: 1, fac: { civil: 7, base: 7, agency: 5 } }),
          meh: eOut("会开了四个小时，最后什么也没定。两边都对你很客气，两边都认为你在替另一边说话。",
            { rep: 0, fac: { civil: 2, base: 2, agency: 2 } }),
          fail: eOut("第三十分钟就吵起来了，一位老板说了不该说的话。会后那两位穿制服的先生对你说：「以后有事直接找我们。」",
            { rep: -0.6, fac: { civil: -6, base: -6, agency: 4 } }),
          critfail: eOut("会议记录被谁传了出去。两边都从里面挑出了对自己有利的句子，然后同时开始怀疑是你放出去的。",
            { rep: -1.5, fac: { civil: -10, base: -8, agency: -8, press: -6 }, flags: ["scandal_2"] })
        }
      },
      {
        id: "away", text: "这不是我的事。让他们自己决定",
        base: 0.68, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: eOut("你没有参加那场会。三个月后他们自己谈成了一个办法：商家出钱雇了一名夜班保安。这条街自己解决了自己的问题，而你没有欠任何一边。",
            { rep: 0.6, fac: { civil: 4, base: 3 } }),
          ok: eOut("你没去。会开了两次，事情悬着。街上的抢劫案没有变多，也没有变少。",
            { rep: 0.2 }),
          meh: eOut("你没去。那条街最后什么都没做，而你在名单上被归为「请了但没来」。",
            { rep: -0.2, fac: { civil: -3, base: -2 } }),
          fail: eOut("你没去，会上有人提议找你，另一个人说「他大概看不上这种事」。这句话被记了很久。",
            { rep: -0.6, fac: { civil: -8, base: -5 } }),
          critfail: eOut("你不在场的时候，这件事变成了「外面来的人只会要票」。你没有做错什么，但这条街从此把你归到了外面。",
            { rep: -1, fac: { civil: -12, base: -10, labor: -6 } })
        }
      }
    ]
  },

  /* ==========================================================================
   * 5) 「你是我们的人」（飞地政治的总账，一局一次）
   * ======================================================================== */
  {
    id: "enc_first", era: ENCL_ERAS, tierMin: 1, tierMax: 4, weight: 10,
    grade: "major", valence: "risk", dyn: true, category: "career", unique: true,
    contacts: ["preacher"], minRep: 20,
    title: "社区开会决定推一个人去选下一级的席位",
    body: "那天晚上去了三十几个人，坐在一间借来的地下室里。\n" +
      "牧师先说了话，然后三位老人说了话，然后大家开始一个一个地念名字。\n" +
      "念到第四个的时候，有人说了你的名字，屋子里安静了两三秒 —— 这两三秒是决定性的。\n" +
      "他们要推出一个人去选下一级的席位。他们不缺人，他们缺一个「能被外面接受」的人。\n" +
      "他们手里大约有四千张票，地方选举里够定一个席位。接了就等于站队：党内当天就会把你归成「社区的人」。" +
      "他们不指望你赢，他们要的是登记那天门口站着一个认识的人。",
    choices: [
      {
        id: "accept", text: "自己上。以社区的名义去选——最坏情况烧掉党内关系，最好情况直接拿下席位",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        cost: { rep: 0.2 }, stake: { fav: true },
        outcomes: {
          crit: eOut("你站起来了，只说了两句话：「我不搬走。不管选上选不上，我下个月还来这儿。」然后你听见椅子响成一片。他们不光推你去选——他们把整条街翻过来了。选举还没开始，对手已经在退。",
            { tier: 1, rep: 1.5, contact: { preacher: 20, brother: 10, union_boss: 10 }, fac: { civil: 22, base: 18, church: 12, establishment: -15 }, flags: ["enclave_base", "enclave_standard"] }),
          ok: eOut("你接下了。第二天早上六点，就有三个人站在你的门口等着派活。选举还是要自己去打——但这次你不是一个人。",
            { rep: 1, contact: { preacher: 14, brother: 6 }, fac: { civil: 15, base: 16, church: 6, establishment: -12 }, flags: ["enclave_base"] }),
          meh: eOut("你接下了，但是你在会上多说了一句关于「资源整合」的话。屋子里安静了一下，然后有人换了个话题。",
            { rep: 0.4, contact: { preacher: 6 }, fac: { civil: 8, base: 6 } }),
          fail: eOut("你接下了，但你提了一个条件：班底要由你的人来选。这句话在这个地下室里等于说「你们不懂竞选」。",
            { rep: -0.3, contact: { preacher: -8 }, fac: { civil: -8, base: -6 } }),
          critfail: eOut("你接下了，然后这件事在两星期内传到了党内。你同时变成了两边都在观察的人 —— 而这两边都不喜欢被观察。",
            { rep: -0.7, contact: { preacher: -10 }, fac: { civil: -10, base: -6, establishment: -14 }, flags: ["scandal_1"] })
        }
      },
      {
        id: "broker", text: "推别人上去，我出钱出人操盘——他赢了以后那个位子听我的（走棋手路线，不破党内关系）",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        cost: { fun: 0.3 },
        outcomes: {
          crit: eOut("你推的是这条街上一个开了十九年餐馆的人。他赢了。五年之后，那个位子上的人做每一个决定之前，都会先打一个电话问一句「公所那边怎么说」。这个电话打给你。",
            { rep: 1, contact: { preacher: 16, fixer: 14, lobbyist: 10 }, fac: { civil: 14, base: 12, establishment: 12 }, flags: ["enclave_base", "kingmaker", "enclave_standard"] }),
          ok: eOut("他赢了，你站在人群后面。没有人知道是你出的钱，但需要知道的人都知道。",
            { rep: 0.7, contact: { preacher: 10, fixer: 8 }, fac: { civil: 9, base: 7, establishment: 6 }, flags: ["kingmaker"] }),
          meh: eOut("他输了，输得很难看。你出的钱没有人提起，但你自己把那笔账记下了。",
            { rep: -0.1, contact: { preacher: 3 }, fac: { civil: 3, base: 2 } }),
          fail: eOut("他输了，而且他在败选演说里提到了所有帮过他的人 —— 除了你。这条街上最尴尬的事就是这样被记住的。",
            { rep: -0.4, contact: { preacher: -6, fixer: -6 }, fac: { civil: -6, base: -4 } }),
          critfail: eOut("他赢了，然后半年后开始装作不认识你。你出的钱、你的人、你的名单，最后培养的是别人的资本。这在这个行业里有个很旧的名字。",
            { rep: -0.7, contact: { preacher: -10 }, fac: { civil: -10, base: -8, establishment: 4 }, flags: ["scandal_1"] })
        }
      },
      {
        id: "decline", text: "今晚不表态。不接背书也不推人——社区、党内两边都不站（保留所有选项）",
        base: 0.66, mods: [{ src: "attr", key: "INTG", w: 0.5 }],
        outcomes: {
          crit: eOut("你说：「明年这时候如果我还没走，你们再问我一次。」屋子里有人笑了。这三年里他们每年都问你一次，而每一次你都还在。这才是最贵的东西。",
            { rep: 0.9, contact: { preacher: 14, brother: 8 }, fac: { civil: 16, base: 10, church: 8 }, flags: ["enclave_base"] }),
          ok: eOut("你谢绝了。他们没有勉强，还留你吃了一顿饭。这个社区对你的看法没有变，只是这件事落到了别人头上。",
            { rep: 0.4, contact: { preacher: 8 }, fac: { civil: 8, base: 5, establishment: 4 } }),
          meh: eOut("你谢绝了，理由说得有点绕。屋子里的人开始收拾椅子。",
            { rep: 0.1, contact: { preacher: 2 }, fac: { civil: 2 } }),
          fail: eOut("你谢绝之后多解释了两句。在他们听来，那两句的意思是「我看不上这个位子」。",
            { rep: -0.4, contact: { preacher: -8 }, fac: { civil: -10, base: -6 } }),
          critfail: eOut("你谢绝了，然后三个月后又去找他们要支持 —— 这次是为了你自己的一个项目。他们给了，但从那天起你在他们的账本上换了一个分类。",
            { rep: -0.8, contact: { preacher: -16 }, fac: { civil: -16, base: -10, church: -8 }, flags: ["scandal_2"] })
        }
      }
    ]
  }
]);
