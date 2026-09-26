/* ============================================================================
 * CONTENT · events/153-incumbent-reelect.js
 * #21 M2 在任总统连任战 · 链 camp_reelect 的四幕竞选幕卡：
 * 宣布寻求连任 → 党内的挑战者 → 第二次电视辩论 → 投票日连任（末幕）。
 * 判胜靠末幕主战选项盖上的连任旗（引擎按 winKind retain 收口）；
 * 层级闸一律 9/9，在任者由链的档期强制演出，本文件不挂任何选项修正项。
 * ==========================================================================*/

POTUS.define("event", [

  /* ── 第一幕 · 宣布寻求连任（窗口 3 个月）────────────────────────────── */
  {
    id: "camp_re_announce",
    grade: "major", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 9, tierMax: 9, weight: 1,
    title: "宣布寻求连任",
    body: "登记还没截止，机器已经开动。你还没说「我要选」，党内已经有人在排你走之后的座次。站到话筒前，说出那句「我打算寻求连任」——说完这一句，真正的仗才开始。宣布的调门定高了，往后三个月的每一件事都会被拿来跟它比。",
    choices: [
      {
        id: "early_tour", text: "一辆小车跑遍早期州，从餐馆后厨握起手", base: 0.55,
        cost: { funLevel: 2 },
        outcomes: {
          crit: { body: "你的车队在早期州跑出一条火线：地方报纸头版全是你握手照片，党内数席位的人默默把名单撤了回去。", effects: { rep: 2, camp: { momentum: 14, warchest: -8 } } },
          ok: { body: "你踩到了该踩的点，地方党组织重新热了起来。", effects: { camp: { momentum: 8, warchest: -6 } } },
          meh: { body: "车钱花了，掌声也有，只是媒体更关心你为什么要这么急着上路。", effects: { camp: { momentum: 2, warchest: -10 } } },
          fail: { body: "两站行程被你讲成了例行述职，当地记者替选民打了个哈欠。", effects: { camp: { momentum: -6, warchest: -12 } } },
          critfail: { body: "你在小镇餐馆被当面追问没兑现的承诺，视频传遍全国——这不像宣布，像在逃。", effects: { rep: -2, camp: { momentum: -13, warchest: -14 } } }
        }
      },
      {
        id: "second_new_deal", text: "把宣布稿写成第二份新政：不谈过去，只开价下一个四年", base: 0.45,
        outcomes: {
          crit: { body: "一份野心藏不住的纲领抢回了议程：人们不再讨论你的前几年，只讨论你敢不敢再要四年。", effects: { rep: 4, camp: { momentum: 13 }, score: 0.3 } },
          ok: { body: "蓝图立住了，至少这一局是你先出题。", effects: { rep: 1.5, camp: { momentum: 7 } } },
          meh: { body: "许诺很大，落点很轻——听完的人只记住你打算把字签得更大。", effects: { camp: { momentum: 1 } } },
          fail: { body: "报纸把你第一任期没办完的清单排印在新纲领旁边，两栏严丝合缝。", effects: { rep: -1.5, camp: { momentum: -7 } } },
          critfail: { body: "第二份新政成了全国笑柄：连你自己党内的政策主管都公开说「先把第一份收尾」。", effects: { rep: -3, camp: { momentum: -14 }, count: { wrath_press: 8 } } }
        }
      },
      {
        id: "member_letter", text: "不登台：只在白宫发一封写给全体党员的信", base: 0.62,
        outcomes: {
          crit: { body: "一封克制的信反倒被逐字转发，党内老资格说：这才是坐在椭圆形办公室里该有的样子。", effects: { camp: { momentum: 5 } } },
          ok: { body: "该暖的人都暖到了，该闭的嘴也没人找到话头。", effects: { camp: { momentum: 3 } } },
          meh: { body: "信发了，水花不大，选情不涨不掉。", effects: { camp: { momentum: 1 } } },
          fail: { body: "对手阵营把信里一句空话剪出来，循环播了整整一周。", effects: { camp: { momentum: -2 } } },
          critfail: { body: "一封不痛不痒的信被解读成心虚：全国评论都在问，堂堂在任者为什么不敢露面宣布。", effects: { rep: -1, camp: { momentum: -6 } } }
        }
      }
    ]
  },

  /* ── 第二幕 · 党内的挑战者（可投放把柄打党内对手）───────────────────── */
  {
    id: "camp_re_primary",
    grade: "major", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 9, tierMax: 9, weight: 1,
    title: "党内的挑战者",
    body: "初选里最锋利的刀不在对岸。一位不到四十岁的挑战者挤进了初选，他没有施政记录可打，全部的选情押在一句话上——他攻击的不是你的政策，是时间：「那已经是上一代人的事了。」你这些年攒下的那些牌，用不用，看你想在党内留下什么。真把他碾死了，代表大会上第一个过来跟你握手的，还会是他那一派。",
    choices: [
      {
        id: "crush", text: "亲自下场，开一场初选辩论，把他打到退选", base: 0.45,
        outcomes: {
          crit: { body: "你在初选辩论台上用一桩桩实事压他，他连你一件旧案都接不住，退选呼声先在他自己的阵营响起。", effects: { attr: { CUN: 1 }, camp: { momentum: 15 } } },
          ok: { body: "你正面赢下了这场自家人打自家人的仗，他还在选票上，但已经没人听他讲话了。", effects: { camp: { momentum: 9 } } },
          meh: { body: "你没打死他，可全国舞台是他白捡的——他借你的光混熟了脸。", effects: { camp: { momentum: 2 } } },
          fail: { body: "你在台上失了风度，指着他喊「你懂什么治国」——选民替年轻人恼了。", effects: { rep: -2, camp: { momentum: -6 } } },
          critfail: { body: "你对自家人下狠手的每一幕都被剪成一支广告：初选你赢了场面，党内你输了人。", effects: { rep: -2.5, camp: { momentum: -13 }, count: { wrath_establishment: 10 } } }
        }
      },
      {
        id: "party_machine", text: "不出面：让党机器用连署和规则把他挡在提名之外", base: 0.5,
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "连署门槛、辩论资格、代表席位一圈算下，他根本进不了最后那轮——你一句话没说过。", effects: { fac: { establishment: 8 }, camp: { momentum: 12 } } },
          ok: { body: "规则替你做完了脏活，党机器记你一功，也让你欠了它一程。", effects: { camp: { momentum: 7 } } },
          meh: { body: "他被挡在门槛外，但他站在门槛内的照片登上了所有头版。", effects: { camp: { momentum: 2 } } },
          fail: { body: "机器转得太响，全国都听见了。中间选民问：这还是一个让普通人说话党吗？", effects: { rep: -1.5, camp: { momentum: -5 }, fac: { establishment: -6 } } },
          critfail: { body: "改规则的纸条被人原样复印登报：你亲手把党机器坐成了自己的靶子，建制派开始私下物色后任。", effects: { rep: -3, camp: { momentum: -12 }, count: { wrath_establishment: 14 } } }
        }
      },
      {
        id: "only_general", text: "不接招：日程一个字不改，火力全对着对岸", base: 0.6,
        outcomes: {
          crit: { body: "你全程只谈对岸那位，年轻挑战者追着打你却打到一面墙——三个月后没人再提他的名字。", effects: { camp: { momentum: 5 } } },
          ok: { body: "你不给他对手戏，他就不成为对手。", effects: { camp: { momentum: 3 } } },
          meh: { body: "你躲过了这一拳，也错过了把党内人心拢回来的机会。", effects: { camp: { momentum: 1 } } },
          fail: { body: "你不接招被读成不敢接招，他的筹款纪录创了党龄纪录。", effects: { camp: { momentum: -3 } } },
          critfail: { body: "「他连自家挑战者都不敢正面回答」成了党代表休息室里流传最广的一句话。", effects: { camp: { momentum: -7 } } }
        }
      }
    ]
  },

  /* ── 第三幕 · 第二次电视辩论（可投放把柄打对手阵营）─────────────────── */
  {
    id: "camp_re_debate",
    grade: "major", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 9, tierMax: 9, weight: 1,
    title: "第二次总统电视辩论",
    body: "台下还是几亿双眼睛，台上的布景和几年前一模一样。对面站着的新面孔开口第一句就是：「总统先生，我们来谈谈这几年。」他不是来辩政策的，是来替这几年跟你结账的。观众记住的往往不是你的政绩，是那一道你没答上来的追问。",
    choices: [
      {
        id: "incumbent_calm", text: "以在任者的稳重压人：国事就是我的底气", base: 0.52,
        outcomes: {
          crit: { body: "你讲话带着坐过那把椅子的人才有的从容，对面越急你越稳——结束后评论只剩一句：这才是总统。", effects: { rep: 3, camp: { momentum: 13 } } },
          ok: { body: "你全程没有一处失态，对手的每一次进攻都撞在你身上弹了回去。", effects: { camp: { momentum: 7 } } },
          meh: { body: "你稳如常，却也淡如水——没人挑出错，也没人记住你说过的任何一句。", effects: { camp: { momentum: 2 } } },
          fail: { body: "你的从容被剪成了傲慢：「他连正面回答新人的耐心都没有。」", effects: { rep: -1.5, camp: { momentum: -6 } } },
          critfail: { body: "你在被连续追问同一件旧事后沉了脸，那一分钟的沉默被循环播到了第二天早间新闻。", effects: { rep: -2.5, camp: { momentum: -13 } } }
        }
      },
      {
        id: "open_ledger", text: "主打「我干的这些事比你大」：把账本当场摊开", base: 0.45,
        outcomes: {
          crit: { body: "你一件一件把这几年的事摆到台面上，摆到对手插不进一句嘴——散场时主持人念的是你的清单。", effects: { rep: 2, camp: { momentum: 15 } } },
          ok: { body: "账本压住了新面孔的口号：原来他质疑的每一件，后面都挂着一个签了字的结果。", effects: { camp: { momentum: 8 } } },
          meh: { body: "账本很厚，观众的耐心很短。你赢了内容，输了收视率。", effects: { camp: { momentum: 1 } } },
          fail: { body: "你摊开的账本里恰好夹着一页没办完的，被对手当场翻了出来。", effects: { rep: -1.5, camp: { momentum: -7 } } },
          critfail: { body: "你亲手点名炫耀的那几案，当晚成了对岸挖料组的目标清单——辩后一周，新料比你的旧账更能上头条。", effects: { rep: -2, camp: { momentum: -14 }, count: { wrath_press: 12 } } }
        }
      },
      {
        id: "read_script", text: "照稿念，一字不接战", base: 0.6,
        outcomes: {
          crit: { body: "你把稿子念得不温不火，对手的每次挑衅都落空——赛后没人兴奋，但也没人记得他赢在哪。", effects: { camp: { momentum: 4 } } },
          ok: { body: "不失态，不接火，九十分钟安全落地。", effects: { camp: { momentum: 2 } } },
          meh: { body: "你念完就退场了，像完成一项公务。", effects: { camp: { momentum: 1 } } },
          fail: { body: "对面在台上四处点火，你在台上照本宣科——观众第一次觉得你们一个是候选人一个是官员。", effects: { camp: { momentum: -5 } } },
          critfail: { body: "一场双方都在念稿的辩论没人记得内容，可所有评论都在说：在任者眼里已经没有火光了。", effects: { rep: -1, camp: { momentum: -12 } } }
        }
      }
    ]
  },

  /* ── 末幕 · 投票日连任（final：主战选项盖连任旗，败选两支落 fall）──── */
  {
    id: "prog_reelect",
    grade: "major", category: "campaign", unique: false,
    /* minTenure：在白宫蹲满两年才配把自己再交一次给选民（连任档期本身开在第 36 月，
       这条闸拦的是"破格火箭直达 tier 9 就立刻要连任"那种一局速通）。 */
    minTenure: 24,
    valence: "risk", tierRaw: true, tierMin: 9, tierMax: 9, weight: 1,
    title: "投票日 · 连任",
    body: "投票站的队在天亮前就排了起来。今晚，选民替你的这几年结账——要么盖章续期，要么当面清账。在任者赢连任，靠的从来不是气势，是没被翻出来的那几页。",
    choices: [
      {
        id: "run", text: "全力选到底：把我的这几年交给选民核", base: 0.45, ballot: true,
        req: { voterShare: 0.12 },
        outcomes: {
          crit: { body: "开票夜过半，大局已定：你的这几年被选民盖了章，连任的旗重新插回白宫草坪。", effects: { rep: 6, camp: { momentum: 15 }, flags: ["pres_re_elected"] } },
          ok: { body: "你在深夜的讲台上赢得险而干净——账核完了，选民说：再过四年。", effects: { rep: 2, camp: { momentum: 9 }, flags: ["pres_re_elected"] } },
          meh: { body: "赢得不好看，票差薄得能透光，但选举人团最终站在你这边。", effects: { score: 0.2, camp: { momentum: 5 }, flags: ["pres_re_elected"] } },
          fail: { body: "几个关键州在黎明前翻红。你站上讲台，念完那份早就写好的承认败选演说。", effects: { rep: -3, camp: { momentum: -10 }, count: { wrath_opposition: 8 }, fall: 1 } },
          critfail: { body: "普选票与选举人票双双失守，你这几年被一夜逐项反着念完。清算的账，今晚开始记。", effects: { rep: -4, camp: { momentum: -15 }, count: { wrath_press: 10, wrath_opposition: 12 }, fall: 1 } }
        }
      },
      {
        id: "local_issues", text: "把选票押在地方议题上：只谈锅碗，不谈自己", base: 0.5,
        outcomes: {
          crit: { body: "你把自己藏进柴米油盐之后，摇摆郡的主妇们替你说了所有该说的话——票仓悄悄换色。", effects: { fac: { base: 8 }, camp: { momentum: 12 } } },
          ok: { body: "不谈自己的选战谈成了地方议题公投，投票方向没歪，只是人数平平。", effects: { camp: { momentum: 7 } } },
          meh: { body: "地方议题炒热了，可选民心里清楚：投的还是一张信任你的票，而你没来讲。", effects: { camp: { momentum: 2 } } },
          fail: { body: "「他不敢谈自己」的说法比任何地方议题都跑得快。", effects: { rep: -1, camp: { momentum: -6 } } },
          critfail: { body: "转移话题被当场戳穿，最后一周全国只剩一个议题：他为什么躲。", effects: { rep: -2, camp: { momentum: -13 } } }
        }
      },
      {
        id: "step_aside", text: "不寻求连任：站上台，公开支持党内那位新人", base: 0.5,
        outcomes: {
          crit: { body: "你发表了一场被历史系反复引用的让位演说。全国起立，党内每一派都欠下这一份让位的情。", effects: { rep: 5.5, fac: { establishment: 12 }, score: 0.4 } },
          ok: { body: "体面交棒：你的遗产从今天开始由别人替你续讲，党内好感实实在在。", effects: { rep: 3, fac: { establishment: 8 } } },
          meh: { body: "让位成了新闻，但只热了三天——新政府上台后按自己的路走，你的分量留给史书去评。", effects: { rep: 1, score: 0.1 } },
          fail: { body: "你想体面收场，各方却一致解读为你被逼走：遗产没攒下，先攒了一肚子猜疑。", effects: { rep: -1.5, fac: { establishment: -5 } } },
          critfail: { body: "让位宣言被继任之争抢了头条，你的最后一个新闻发布厅只剩一个问题：是谁把他挤下去的。", effects: { rep: -3.5, camp: { momentum: -1 } } }
        }
      }
    ]
  }

]);
