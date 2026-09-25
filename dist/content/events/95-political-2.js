/* ============================================================================
 * CONTENT · events/95-political-2.js
 * 党务线第二包：党内政治的「记账」本质。
 * 初选内战、数票、党代会代表、背书链条、党内清洗——
 * 每次投票、每份背书、每个席位都记在某人的小本子上。
 * 建制派系好感是这条线的生命线：欠的账要还，卖的账要认。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 初选内战：对手是同党同志
   * ==================================================================== */
  {
    id: "pol2_primary_fight",
    grade: "mid", unique: true, category: "political",
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 1, tierMax: 3, minTenure: 10, weight: 16,
    brief: {
      lede: "真正的敌人不在对面——在你自己党的初选名单上。",
      known: [
        "本党席位开放：党部给两个人留了椅子，你和一个先到一步的同志。",
        "初选规矩是「不互撕」——但两人同印上选票时就化了。",
        "三天里你接的电话全是试探：你争、等、还是让。"
      ],
      rumor: [
        "据说那位同志半年前就跟县党部打过招呼。",
        "据说全国委员会恨本党初选流血——谁先撕谁上黑名单。"
      ],
      unknown: [
        "初选里说的每句话，输家的桩脚都记着。",
        "败者的人脉不会消失：他们会等两年或四年。"
      ],
      terms: [
        { k: "党支部会议", v: "caucus：基层党员开会投票定提名。" }
      ]
    },
    title: "你和同党同志争夺本党初选的提名",
    body: "席位开放了，但机器的初步意向站着你那位同志。初选的规矩人人会背，规矩之外的部分才是胜负。你决定怎么打这场内战。",
    choices: [
      {
        id: "grassroots", text: "走基层：征集签名登上选票，用志愿者淹没会议室",
        note: "拼组织和双腿。机器的名单对不上你敲门敲出来的名单时，中立就成了笑话。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你交上去的签名是法定要求的三倍，党支部会议那晚你的志愿者坐满了前三排。机器「重新评估了中立」。", effects: { rep: 1.75, fac: { base: 12, establishment: 4 }, voters: { diehard: 250 }, flags: ["pol2_prim_won"] } },
          ok: { body: "征签过关，初选打赢。你的同志电话里说了句体面话，他的桩脚们没说。", effects: { rep: 1.25, fac: { base: 8, establishment: -2 }, voters: { diehard: 150 }, flags: ["pol2_prim_won"] } },
          meh: { body: "初选赢了，赢得难看：投票率低，双方的广告互相踩了一个月。大选从内耗那天起就在倒计时。", effects: { rep: 0.6, fac: { base: 5, establishment: -3 } } },
          fail: { body: "机器的名单终究比你的敲门名单长半个选区。你输了初选，保住了体面——和政治生涯。", effects: { rep: 0.2, fac: { base: 4, establishment: -4 } } },
          critfail: { body: "你的征签表被查出两页造假的签名（志愿者干的，账算你头上）。初选没开打，你的名字先上了本党的负面简报。", effects: { rep: -1.25, fac: { base: -6, establishment: -8, press: -4 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "inside", text: "走党内：去代表大会拼代表票，跟机器谈",
        note: "不拼选票拼代表。会议室里的游戏：承诺、交换、和把你的议程折价卖给委员会。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "establishment", w: 0.35 }],
        outcomes: {
          crit: { body: "你一个代表一个代表地谈下来：三个县的党团在代表大会上倒向你。你的同志在第二轮投票前宣布退选——机器最恨流血到第三轮。", effects: { rep: 1.5, fac: { establishment: 12, base: 3 }, flags: ["pol2_prim_won"] } },
          ok: { body: "代表大会第二轮你拿到提名。欠下的代表人情，都在小本子上，都有价钱。", effects: { rep: 1, fac: { establishment: 9 }, fav: -2, flags: ["pol2_prim_won"] } },
          meh: { body: "提名到手，代价是三个承诺：一个委员会席位、两条议题让步、和「以后听协调」。", effects: { rep: 0.6, fac: { establishment: 6, base: -3 } } },
          fail: { body: "代表票数到第三轮停在差十一票。机器把筹码拨给了你的同志——你输在了自己选的战场上。", effects: { rep: -0.4, fac: { establishment: -5 } } },
          critfail: { body: "你在两个县的党团里做了相反的承诺，被人在代表大会现场当众对质。提名没了，「两面派」留下了。", effects: { rep: -1.5, fac: { establishment: -10, base: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "unity", text: "不打了：让给同志，换一个「顾全大局」",
        note: "保底选项：退出初选，公开背书他。你保住了党内的和气与自己的账本——也保住了「下次」这个词。",
        base: 0.75, mods: [{ src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "你的退出声明写得漂亮，他当选后在庆功宴上公开说「这个席位有你的功劳」。六个月后，一个空出的委员会席位到了你名下。", effects: { rep: 0.8, fac: { establishment: 9, base: 3 }, contact: { fixer: 5 } } },
          ok: { body: "「顾全大局」四个字进了党部的会议纪要。人情记在你名下，利息几何没人保证。", effects: { rep: 0.4, fac: { establishment: 6 } } },
          meh: { body: "他赢了，谢词里没提你的名字。你学会了退让的第一课：退让不需要被记得。", effects: { fac: { establishment: 3 } } },
          fail: { body: "他赢了席位，忘了承诺。你的「大局」成了你一个人的大局。", effects: { fac: { base: -2, establishment: 2 } } },
          critfail: { body: "你退选的消息被处理成「不敢战」：党部觉得你软，基层觉得你骑墙。两头各记了一笔。", effects: { rep: -0.8, fac: { base: -5, establishment: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 数票之夜：关键表决里的角色
   * ==================================================================== */
  {
    id: "pol2_whip_count",
    grade: "mid", unique: true, category: "political",
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 2, tierMax: 5, minTenure: 18, weight: 18,
    brief: {
      lede: "一场差距两票以内的表决，你的票和你的眼睛都有价钱。",
      known: [
        "关键表决差距两票，你的名字在「未确定」栏。",
        "领袖的数票人一下午从你门口过了三次。",
        "你的选区对这项表决五五开，所以你还没定。"
      ],
      rumor: [
        "据说对面也开了价：一个对你选区有利的项目。",
        "据说领袖的「未确定」名单只有四人，你排第一。"
      ],
      unknown: [
        "名单上没有「弃权」：不接电话也算一票。",
        "真正决定你前程的那张名单，几年后才兑现。"
      ],
      terms: [
        { k: "数票人", v: "whip：清点本党票数、催票的党内职务。" },
        { k: "党线", v: "政党对某项表决的统一立场。" }
      ]
    },
    title: "差距两票，你的名字在「未确定」栏",
    body: "关键表决前七十二小时，领袖在数你，对面在钓你，选区在淹你。这张票怎么投，决定你今后在这个党里的名字怎么写。",
    choices: [
      {
        id: "count_for_them", text: "接过数票人的活：替领袖去数那两票",
        note: "从被数的人变成数人的人。跑腿的差事，也是党内账本的抄写员——抄写员知道所有欠账。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "fac", key: "establishment", w: 0.4 }],
        outcomes: {
          crit: { body: "你在休息室里替领袖磨回来了两票，表决以一票优势通过。当晚领袖的办公室里，你的名字从「未确定」栏挪进了「自己人」栏——那本小本子的第一页。", effects: { rep: 1.75, fac: { establishment: 14 }, flags: ["pol2_whip_loyal"] } },
          ok: { body: "票数够了，你出了力。领袖在走廊里拍了你的肩膀——这个动作有至少五个人看见。", effects: { rep: 1, fac: { establishment: 10 } } },
          meh: { body: "你数回来的那一票后来又反悔了。领袖没怪你，但名单上你的名字旁边多了一个问号。", effects: { rep: 0.4, fac: { establishment: 4 } } },
          fail: { body: "表决输了。数票人的名单被泄给记者，你的名字在「经手」那一栏。", effects: { rep: -0.6, fac: { establishment: 3, press: -4 } } },
          critfail: { body: "你替领袖去吓唬一个摇摆的同志，被对方当场录音。党内的强压手段上了报纸，你是那只被拍到的手。", effects: { rep: -1.5, fac: { establishment: -4, press: -8, base: -5 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "trade", text: "做交换者：把你的票挂上货架，等两边出价",
        note: "政治市场最古老的行当。卖得好看叫「为选区争取利益」，卖得难看叫什么，取决于事后谁在写回忆录。",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "对面为你的票开出了一个选区项目，领袖为你的票开出了一句「以后提名优先考虑」。你拖到表决前一小时才亮票——两边都觉得自己赢了。", effects: { rep: 1.25, fac: { establishment: 6, commercial: 6, base: 4 }, fun: 3.5, lev: 1 } },
          ok: { body: "你换到了一个给选区的实质项目。领袖记了账：此人的票要用买的。", effects: { rep: 0.8, fac: { establishment: 3, base: 4 }, fun: 1.75 } },
          meh: { body: "两边的出价都寒酸。你最后按党线投了，白当了一回货架上的商品。", effects: { rep: 0.2, fac: { establishment: 2 } } },
          fail: { body: "你拖延亮票的把戏被领袖看穿。表决通过当晚，你的委员会请求在程序环节被搁置——没人解释。", effects: { rep: -0.4, fac: { establishment: -7 } } },
          critfail: { body: "你跟两边的讨价被一位记者拼出了全貌，标题是「一个人的拍卖会」。你的票没卖出去，价钱全美国都看见了。", effects: { rep: -1.75, fac: { establishment: -10, press: -6, base: -4 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "defect", text: "跨线投票：按选区的意思，投反对党那一边",
        note: "选区会爱你，党不会。跨线不是一票，是小本子上单独开一页的那种记账。",
        base: 0.4, mods: [{ src: "attr", key: "INTG", w: 0.5 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你投出了决定性的跨线一票，当晚回选区的机场有人拉了横幅。领袖在记者面前说「党内容得下不同声音」——他手里的名单没这么宽容，但选区的电话排到了下周。", effects: { rep: 2, fac: { base: 12, establishment: -6 }, voters: { warm: 400, diehard: 150 }, count: { wrath_establishment: 12 } } },
          ok: { body: "跨线投了，表决输了一个座位。选区的报纸给了你头版，党团的会议没给你好脸。", effects: { rep: 1.25, fac: { base: 8, establishment: -8 }, voters: { warm: 250 }, count: { wrath_establishment: 10 } } },
          meh: { body: "你的跨线票没能改变结果。两边各记了一笔：对面收下了，本党记住了。", effects: { rep: 0.4, fac: { base: 3, establishment: -5 } } },
          fail: { body: "跨线投票、表决还是通过了。你选区的受益没兑现，党的处分先到了：委员会分配你被调去了最闲的那个。", effects: { rep: -0.2, fac: { base: 2, establishment: -9 } } },
          critfail: { body: "你的跨线成了领袖口中的「叛党样本」，在党团会议上被点了名。基层的掌声传不到议会大厦，你的办公室被换到了地下室。", effects: { rep: -1.5, fac: { establishment: -14, base: 4 }, flags: ["party_traitor"] } }
        }
      },
      {
        id: "absent", text: "请假：表决那天「恰好」回选区处理紧急事务",
        note: "保底选项：躲开这场表决。缺席不上报纸，但数票人的名单上，缺席和跨线写在同一页。",
        base: 0.7,
        outcomes: {
          crit: { body: "你回选区剪了三条彩带、见了四拨选民。表决以两票通过——领袖没空追究一个「没来的人」。", effects: { rep: 0.6, fac: { base: 3 }, voters: { warm: 100 } } },
          ok: { body: "缺席没被计较，也没被感谢。最安全的一票是没投的那票。", effects: { rep: 0.2 } },
          meh: { body: "领袖的助手来电话「确认你恢复健康」。语气里的引号，你也听见了。", effects: { fac: { establishment: -2 } } },
          fail: { body: "表决以一票之差输了——就是你缺席的那一票。党团会议室没人说话，但名单不会漏记。", effects: { rep: -0.6, fac: { establishment: -7 } } },
          critfail: { body: "你「回选区」的照片上了休闲版：剪彩、钓鱼、宴席。表决输了，你的行程成了党内的笑话。", effects: { rep: -1.25, fac: { establishment: -8, press: -3, base: -3 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 党代会代表：耐心的游戏
   * ==================================================================== */
  {
    id: "pol2_party_convention",
    grade: "mid", unique: true, category: "political",
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 1, tierMax: 4, minTenure: 20, weight: 14,
    brief: {
      lede: "全国代表大会的席位不是选出来的，是熬出来的。",
      known: [
        "州党代会代表席位开始报名：无薪、无曝光，四年开一次。",
        "名单按忠诚、出席率和苦活排，不按资历。",
        "县党部书记直说：坐满五年冷板凳，第六年才有椅子。"
      ],
      rumor: [
        "据说有两个名额留给「新一代」，大家都抢。",
        "据说有个老代表席位「可商量」，但得先陪他下完棋。"
      ],
      unknown: [
        "基层代表的真正红利在四年后。",
        "走廊比会场重要，名片决定谁接你电话。"
      ],
      terms: [
        { k: "全国代表大会", v: "四年一次提名总统候选人的全党大会。" },
        { k: "基层代表", v: "县区党团选出、无薪无权的党代会代表。" }
      ]
    },
    title: "你争取一个党代会基层代表的席位",
    body: "党代会的基层代表席位开放报名。没有薪水，没有镜头，只有四年一次的入场券和一条越走越宽的窄门。你决定用什么换。",
    choices: [
      {
        id: "grind_seats", text: "熬资历：把县里每一个党团例会坐满",
        note: "最笨也最稳的路。出席率、苦活、和「他总是在」的名声——基层代表的货币。",
        base: 0.65, mods: [{ src: "attr", key: "INT", w: 0.3 }, { src: "fac", key: "establishment", w: 0.25 }],
        outcomes: {
          crit: { body: "一年零四个月，你出席了辖区里每一个党团例会，包括暴雪那晚只有七个人的那一次。名单公布那天，你的名字排在「新一代」的两个名额里的第一个。", effects: { rep: 1.5, fac: { establishment: 12, base: 3 }, flags: ["pol2_delegate"] } },
          ok: { body: "你坐满了板凳，拿到了席位。党团的书记在名单上给你写了一句：可靠。", effects: { rep: 1, fac: { establishment: 9 }, flags: ["pol2_delegate"] } },
          meh: { body: "席位拿到的是候补。会场你进不去，材料你照收——候补也是名单的一部分。", effects: { rep: 0.4, fac: { establishment: 5 } } },
          fail: { body: "你熬了两年，名单公布那天排在你前面的都是熬了四年的。你学会的不是放弃，是接着熬。", effects: { rep: 0.2, fac: { establishment: 3 } } },
          critfail: { body: "为了出席率你荒了自己的正职，选民服务投诉上了本地报纸。党内名单没上，你的名字上了另一份名单。", effects: { rep: -1, fac: { base: -6, establishment: -3, press: -3 } } }
        }
      },
      {
        id: "old_man_seat", text: "去陪那位老代表下棋：谈他的席位",
        note: "捷径的形态是一次次对弈和听同一段往事。快，但传出去不好听——而且老人要的可能不只是棋友。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "CUN", w: 0.2 }],
        outcomes: {
          crit: { body: "第七盘棋下完，老人说：我的席位给你，条件是你每年党庆替我念一次名单。你答应了他——这个价钱便宜得像捡来的。", effects: { rep: 1.25, fac: { establishment: 8 }, contact: { fixer: 4 }, flags: ["pol2_delegate"] } },
          ok: { body: "老人退了，你在递补顺序上排到了第一。人情记在他名下，由你认领。", effects: { rep: 0.8, fac: { establishment: 6 }, flags: ["pol2_delegate"] } },
          meh: { body: "棋下了一个冬天，老人最后把席位给了自己侄子。你至少学会了下棋。", effects: { fac: { establishment: 2 }, attr: { INT: 1 } } },
          fail: { body: "有人把「探病式拜访」的故事讲成了你「等着抢座位」。老人不悦，党部观感更坏。", effects: { rep: -0.6, fac: { establishment: -5 } } },
          critfail: { body: "你陪下的棋被另一位竞争者拍了下来，配上「算座位的年轻人」的标题在党内邮件组流传。席位没了，名声先到位。", effects: { rep: -1.25, fac: { establishment: -8, base: -3 } } }
        }
      },
      {
        id: "skip_convention", text: "不掺和：把自己的时间留给选区和家人",
        note: "保底选项：代表大会的窄门四年后还开。你错过的可能是椅子，保住的可能是别的。",
        base: 0.75,
        outcomes: {
          crit: { body: "别人在会场走廊交换名片的那一周，你把选区三件拖了两年的事推到了结尾。选民不知道党代会在开，只知道你办了事。", effects: { rep: 1, fac: { base: 6 }, voters: { warm: 200 } } },
          ok: { body: "安静的一季。家里的饭桌和选区的电话，你都接住了。", effects: { rep: 0.4, fac: { base: 3 } } },
          meh: { body: "党代会如期召开，与你无关。新闻里那些名字，有两个去年还向你请教过。", effects: { rep: 0.2 } },
          fail: { body: "党部的书记在电话里说得很客气：名单是「按参与度排的」。你听懂了。", effects: { fac: { base: -2, establishment: -4 } } },
          critfail: { body: "你缺席的这一届党代会改了规则——支持你这类「地方实干者」的那条章程被删掉了。在场的人都没替你说话，因为没人在场认识你。", effects: { rep: -0.8, fac: { establishment: -6, base: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 背书链条
   * ==================================================================== */
  {
    id: "pol2_endorsement_tree",
    grade: "minor", unique: true, category: "political",
    valence: "boon", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 0, tierMax: 5, minTenure: 6, weight: 15,
    brief: {
      lede: "背书是政治里的以物易物：你的名字，换别人的名字。",
      known: [
        "两份请求同到：高你两级的人要你署名，你提携的后辈等你名字。",
        "麻烦在于：他俩分属党内两派，你只能真实地站一边。"
      ],
      rumor: [
        "据说上面那位要的不是支持，是你的沉默。",
        "据说后辈那边放话：被师父卖了，这故事讲十年。"
      ],
      unknown: [
        "今天捧的人，明天可能坐在给你提名的位置。",
        "「不背书」也有价钱：两边都记你的沉默。"
      ],
      terms: [
        { k: "背书", v: "公开支持某候选人的政治表态。" },
        { k: "循环背书", v: "A 捧 B 上位，B 得势后反哺 A。" }
      ]
    },
    title: "上级和后辈同时请你背书，而你只能站一边",
    body: "一上一下两份背书请求，分属党内两派。你的名字是货币，印出去就回不来。链条怎么搭，网络就怎么长。",
    choices: [
      {
        id: "endorse_up", text: "背书上面那位：把名字押在上升期",
        note: "搭快车：高位的注意与提携。代价是你的网络从此向上单线生长，后辈们会各自去找新的伯乐。",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "fac", key: "establishment", w: 0.35 }],
        outcomes: {
          crit: { body: "他赢了，联合声明上你的名字排第二。庆功宴上他把你的肩膀转向众人：「这个位置有他一半功劳。」你的电话从下周起响个不停。", effects: { rep: 2.75, fac: { establishment: 12 }, lev: 1 } },
          ok: { body: "署名换来了他办公室的直线电话。承诺没说出口，小本子都记着。", effects: { rep: 1.5, fac: { establishment: 8 } } },
          meh: { body: "他收下了你的名字，没给回音。你以为的联合声明，最后只是众多署名里的一个。", effects: { rep: 0.4, fac: { establishment: 4, base: -3 } } },
          fail: { body: "他输了。你的名字跟着他的败选广告沉了半年——后辈那边也没人再来找你。", effects: { rep: -0.8, fac: { establishment: -3, base: -4 } } },
          critfail: { body: "他输了，而且输出了丑闻。你的署名被对手做进了「都是一路人」的攻击材料——你替人背书，人把锅背给了你。", effects: { rep: -2.75, fac: { establishment: -8, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "endorse_down", text: "背书后辈：做伯乐，织自己的网",
        note: "低位定投：你提携的人赢得的是职位，你赢得的是「派系源头」的地位。周期长，复利高，见效慢。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你的名字压在他的传单最上面，他赢了十七个点。当选夜他说「这一切从老师的背书开始」——台下四十个志愿者，每个人记住了这句话。", effects: { rep: 2.5, fac: { base: 10 }, voters: { diehard: 150 }, flags: ["pol2_patron"] } },
          ok: { body: "他赢了。你的「伯乐」身份在县党部的闲谈里立住了——网络从你这里发端。", effects: { rep: 1.5, fac: { base: 7 }, flags: ["pol2_patron"] } },
          meh: { body: "他险胜，忙着还自己的竞选债。你收获了一句感谢和一个不确定的未来。", effects: { rep: 0.8, fac: { base: 4 } } },
          fail: { body: "他输了，你的名字陪他沉了一轮。伯乐叙事最怕的开局：马没跑出来。", effects: { rep: -0.4, fac: { base: 2, establishment: -3 } } },
          critfail: { body: "他在选战最后两周爆出丑闻——你「识人不明」的账被上面那位的人翻了出来：看人的眼光，也是政治眼光的一部分。", effects: { rep: -2.5, fac: { base: -5, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "decline_both", text: "两边都不背：让名字休息一季",
        note: "保底选项：沉默。省下了站错队的风险，也付了「谁都不算自己人」的价。",
        base: 0.7,
        outcomes: {
          crit: { body: "你的「专注本职」成了本地报纸一小段正面报道。两边落败者事后都感激你没掺和——沉默偶尔两边讨好。", effects: { rep: 1.25, fac: { base: 3, establishment: 2 } } },
          ok: { body: "谁都没署。这一季你的名字没印在任何纸上——也没欠任何人。", effects: { rep: 0.4 } },
          meh: { body: "两边的电话后来都少了。政治网络的冷漠不是惩罚，是遗忘。", effects: { fac: { base: -2, establishment: -2 } } },
          fail: { body: "上面那位记住了你的含糊，后辈记住了你的沉默。小本子上这一页写的是：此人不可投。", effects: { rep: -0.8, fac: { base: -3, establishment: -4 } } },
          critfail: { body: "两边都输惨了的那天，他们各自的支持者在复盘里把你这种「观望者」骂得最难听：雪崩时没有一片雪花愿意署名。", effects: { rep: -1.5, fac: { base: -5, establishment: -5 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 清洗来了：站队、保人、自保
   * ==================================================================== */
  {
    id: "pol2_purge",
    grade: "major", unique: true, category: "political",
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 2, tierMax: 5, minTenure: 24, weight: 20,
    brief: {
      lede: "一夜之间，你的派系成了党内的脏字。",
      known: [
        "扶你上位的派系在改组中失势，新当权派开始清名单。",
        "你一半人脉、两份背书和第一次升迁，都签着旧派系的名字。",
        "新当权派约你「喝茶」：要的不是检讨，是表态。",
        "最老的盟友今晚来电：「名单第三页有你，我看过。」"
      ],
      rumor: [
        "据说新派手里有旧派这些年的往来记录。",
        "据说清洗的刀只落前两页，第三页是吓人的。"
      ],
      unknown: [
        "清洗里没有旁观席：沉默在两边各记一笔。",
        "今天保的人，是四年后翻盘的自己。"
      ],
      terms: [
        { k: "党内清洗", v: "胜利者对失败者网络的系统性清除。" },
        { k: "投名状", v: "向当权派交出旧关系秘密，以表忠心。" }
      ]
    },
    title: "你所属的派系失势，清洗名单上有你的名字",
    body: "你的盟派系一夜失势，清洗的名单传到第三页——你的名字在上面。当权派要表态，老盟友要援手，你要决定自己是谁的人。",
    choices: [
      {
        id: "stand_with_them", text: "站旧派系：公开拒绝切割",
        note: "最贵的选择：现在就付清所有欠账。当权派的敌意立等可取，旧派系的忠诚复利在四年后——如果你等得到。",
        base: 0.4, mods: [{ src: "attr", key: "INTG", w: 0.45 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你在党团会议上把当权派的传话原样复述了一遍，然后说：「我的背书、我的升迁、我的名字，都是这个派系给的。诸位要切割的各位，请自便。」会场死寂。当晚，旧派系的电话线热到天亮——你在第三页上划掉了自己，写成了封面。", effects: { rep: 1.25, fac: { base: 14, establishment: -10 }, attr: { INTG: 2 }, flags: ["pol2_purge_loyal"] } },
          ok: { body: "你拒签切割声明。委员会的席位没了，旧派系的人脉在你这里成了可以过夜的资产。", effects: { rep: 0.8, fac: { base: 10, establishment: -12 }, flags: ["pol2_purge_loyal"] } },
          meh: { body: "你拒了，声音不大。旧派系领了情，当权派记了账，你两边都欠着点火候。", effects: { rep: 0.3, fac: { base: 5, establishment: -7 } } },
          fail: { body: "拒绝的代价立刻到账：职位、资源、委员会分派，一样样收走。你的立场完整，办公室空了。", effects: { rep: 0.1, fac: { base: 5, establishment: -12 }, fav: -3 } },
          critfail: { body: "你的「拒绝切割」被当权派包装成「派系余孽负隅顽抗」写进了党内通报。旧派系自身难保没人为你说话，你成了清洗的示范案例——杀给第三页上其他人看的那个。", effects: { rep: -1.25, fac: { establishment: -16, base: -4, press: -5 }, fall: 1 } }
        }
      },
      {
        id: "save_one", text: "不站队，只保人：用你的全部资本换一个人上岸",
        note: "不做烈士，也不做刀。把政治资本一次性押在名单上某一个人身上——救得下，旧情记你一辈子；救不下，资本和人都沉。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "attr", key: "CHA", w: 0.2 }],
        cost: { fav: 3 },
        outcomes: {
          crit: { body: "你把攒了六年的人情一次清仓：三个电话、一次拜访、一笔「以后再说」。名单公布那天，那个人的名字不在上面。他从没问过你做了什么——他的沉默就是收据。", effects: { rep: 0.9, fac: { establishment: -4, base: 6 }, contact: { fixer: 6 }, flags: ["pol2_saved_one"] } },
          ok: { body: "人保下来了——代价是你与新当权派之间从此有一笔说清不了的「旧账」。他们容你，但盯着你。", effects: { rep: 0.6, fac: { establishment: -5, base: 4 } } },
          meh: { body: "你保的人从第三页挪到了「观察名单」。没赢，也没全输——人情打了水漂的一半。", effects: { rep: 0.2, fac: { base: 2, establishment: -3 } } },
          fail: { body: "资本花完了，名单没改。你赌上了信用，赌输了一个人的命运——这笔账他自己也在记。", effects: { rep: -0.3, fac: { establishment: -5, base: -3 }, fav: -1 } },
          critfail: { body: "你为他说情的记录被当权派留了档：清洗档案里多了一页「为旧派系活动者奔走的人」。人没保住，你把自己填了进去。", effects: { rep: -1, fac: { establishment: -12, base: -3 }, flags: ["investigation_open"], fall: 1 } }
        }
      },
      {
        id: "flip", text: "切割：去「喝茶」，交出你知道的",
        note: "投名状。当权派的门为你开，旧派系的账本为你翻——「叛徒」这个词在政界的保质期是十年起步。",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "establishment", w: 0.35 }],
        outcomes: {
          crit: { body: "你交出的东西「有价值但不致命」——足够买你的位置，不够害死任何人。当权派收下了你，旧派系里聪明的人看出你留了手。四年后翻盘的那天，有人会想起这一点。", effects: { rep: 0.6, fac: { establishment: 12, base: -6 }, attr: { CUN: 2 }, flags: ["pol2_flipped"] } },
          ok: { body: "切割声明签了，位置保住了。当权派的联络人对你说了三次「向前看」。", effects: { rep: 0.2, fac: { establishment: 9, base: -8 }, flags: ["pol2_flipped"] } },
          meh: { body: "你交了底，他们收了货，没给收据。新主顾的信任是租来的，租金月结。", effects: { fac: { establishment: 5, base: -5 } } },
          fail: { body: "你的切割不够彻底——他们要的是名字，你给的是原则。两边都没吃饱，两边的账本都翻开着。", effects: { rep: -0.4, fac: { establishment: 3, base: -8 }, flags: ["party_traitor"] } },
          critfail: { body: "你交代的东西进了档案，也进了报纸——来源指向你。旧派系视你为仇，当权派拿你当过河的桥，拆桥那天连通报都懒得发。「叛徒」从此印在你的名字前面。", effects: { rep: -1.5, fac: { establishment: 4, base: -12, press: -6 }, flags: ["party_traitor", "scandal_2"], fall: 1 } }
        }
      },
      {
        id: "lay_low", text: "请长假：以「健康原因」消失一个季度",
        note: "保底选项：躲过风暴眼。清洗最激烈的九十天你不在场——回来时名单已定，只是没人记得替你说过话。",
        base: 0.65,
        outcomes: {
          crit: { body: "你的「病假」恰到好处：风暴过去，两边的刀都钝了。回来那天，你的办公室还在，走廊里的人对你点头——像什么都没发生过。", effects: { rep: 0.2, fac: { establishment: 2, base: 2 } } },
          ok: { body: "九十天，报纸换了三轮头条。你的名字没上任何一页——这就是全部的胜利。", effects: { rep: 0.1 } },
          meh: { body: "回来了，桌子还在，电话不响。政治在场性这东西，丢了要慢慢捡。", effects: { fac: { base: -2, establishment: -2 } } },
          fail: { body: "你躲过了刀，没躲过缺席的定价：旧派系记你「跑了」，新当权派记你「没来」。两边的小本子都有你，各记各的。", effects: { rep: -0.3, fac: { base: -5, establishment: -5 } } },
          critfail: { body: "风暴期结束后的第一场党团会议，新当权派把缺席者名单投影在大屏上逐个「确认立场」。你的「健康原因」在第三页——和清洗名单的页码一样。", effects: { rep: -0.9, fac: { establishment: -10, base: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  }

]);
