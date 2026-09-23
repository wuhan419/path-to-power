/* ============================================================================
 * CONTENT · events/103-era-1954.js
 * 时代：1954 冷战麦卡锡 —— 名单文化、忠诚宣誓、听证直播、罢乘起步。
 * 铁律见 docs/CONTENT-SCHEMA.md §11。人脉只用已登记的 8 个。
 * ==========================================================================*/

POTUS.define("event", [

  /* ------------------------------------------------------------------------
   * 1) 军队-麦卡锡听证会直播 —— 电视第一次审判一个参议员（大事件）
   * ---------------------------------------------------------------------- */
  {
    id: "mcc54_hear", grade: "major", category: "scandal",
    valence: "bane", dyn: true,
    era: ["1954_MCCARTHY"], tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["print", "radio", "tv"], month: 6,
    title: "全国都在看电视审判他",
    body: "参议院的听证会第一次被三家电视网实况转播。那个一向让人不敢直视的名字，\n" +
      "如今对着镜头一遍遍说「你们到底有没有一点体面」。观众第一次看见皇帝没穿衣服。\n" +
      "你是他名单上的一个名字，也是此刻最想在镜头前站对位置的人。",
    brief: {
      lede: "一个人正在电视上塌台。你要么递刀，要么趁势而起，要么假装从没上过那份名单。",
      known: [
        "你被牵连，是因为两年前一份「反美活动」的地方听证上，你的名字出现在一份出席名单边上——这就是为什么此刻你被记者堵住。",
        "听证会在电视上放大了他的每一句恫吓，也放大了他的每一次失态。",
        "本党上层正在悄悄改口：风向从「跟着他反共」变成「他过分了」。",
        "现在公开支持他不再安全，公开踩他也仍需胆量——多数人在等别人先动。"
      ],
      rumor: [
        "有人说他手上真有能掀翻半个党部的档案，正打算鱼死网破。",
        "有人说军队律师手里那份关键文件，是他幕僚自己伪造的。"
      ],
      unknown: [
        "这场电视审判会不会真把他钉死，还是让他变成殉道者。",
        "你在名单上的那行字，将来是他倒台后被清除，还是被当成「你也是同伙」的证据。"
      ],
      terms: [
        { k: "名单", v: "麦卡锡宣称掌握的「政府里的共产党员」名单，常拿不出证据，却能毁掉被点名的人。" },
        { k: "听证直播", v: "1954 年军队-麦卡锡听证会被电视实况转播，是媒体形象第一次扳倒一位权势人物。" }
      ]
    },
    choices: [
      {
        id: "denounce", text: "趁势公开要求他「收敛」，跟这艘船保持距离",
        note: "押他一定塌。押对了你是先见之明的一员，押错了你就是他名单上被重点关照的一个。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "establishment", w: 0.35 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你在风向刚变时就站了出来，成为「第一批敢说话的地方人物」。参议院随后通过对他的谴责，你的名字和先见之明挂在了一起。",
            effects: { rep: 1.5, tier: 1, fac: { establishment: 12, press: 10, base: 6 }, flags: ["early_correct"] } },
          ok: { body: "你及时和他切割，党部把你从「名单嫌疑」挪回了「可靠同志」。",
            effects: { rep: 0.8, fac: { establishment: 8, press: 5 } } },
          meh: { body: "你跟着喊了收敛，可没人特别记得你喊过。风是转了，你没捞着功劳。",
            effects: { rep: 0.2, fac: { establishment: 3 } } },
          fail: { body: "你踩早了。他还没倒，先把你钉成了「替共党出头」，本党的机器开始查你。",
            effects: { rep: -0.7, fac: { establishment: -10, base: -5 }, flags: ["scandal_1"] } },
          critfail: { body: "你公开要求他收敛，他反手在电视上把你的名字和「可疑名单」并排念了出来。他倒了，可你的名声陪葬。",
            effects: { rep: -1.25, fac: { establishment: -8, press: -10, base: -8 }, flags: ["compromised", "scandal_2"] } }
        }
      },
      {
        id: "defend", text: "替他说话：反共是大义，别理会电视上的表演",
        note: "把身家押在一件几乎注定要输的事上。忠诚会被极少数人铭记，也会被多数人清算。",
        base: 0.4, mods: [{ src: "attr", key: "INTG", w: 0.3 }, { src: "fac", key: "foreign", w: 0.35 }],
        outcomes: {
          crit: { body: "在一片倒戈声里你替他把话说圆了。他倒了，但保守阵营记住「那种时候还敢说话的人」，日后有人要还这份情。",
            effects: { rep: 0.6, fav: 2, fac: { foreign: 8, establishment: 6, press: -10 }, flags: ["loyal_to_a_loser"] } },
          ok: { body: "你撑了他一把，撑得很难看。核心支持者记你的好，主流舆论给你记了笔账。",
            effects: { rep: -0.1, fac: { establishment: 4, press: -8 } } },
          meh: { body: "你说了几句，既没救着他，也没把自己烧得太狠。灰头土脸。",
            effects: { rep: -0.3, fac: { press: -4 } } },
          fail: { body: "电视上他被越描越黑，你替他说的每一句都被剪成「他居然支持这个」。",
            effects: { rep: -0.8, fac: { base: -8, press: -10, establishment: -4 } } },
          critfail: { body: "他塌台时，你被当成「麦卡锡在地方上的合伙人」一并清算。这份忠诚没换来情分，只换来了黑名单。",
            effects: { rep: -1.5, fac: { establishment: -14, base: -10, press: -12 }, flags: ["party_traitor", "scandal_3"] } }
        }
      },
      {
        id: "silent", text: "一个字都不说，让电视自己去审判",
        base: 0.68, mods: [{ src: "attr", key: "CUN", w: 0.35 }],
        outcomes: {
          crit: { body: "你全程缄默。等他倒台，两边都发现你既没得罪谁也没留下把柄，反而成了「能一起共事的人」。",
            effects: { rep: 0.6, fac: { establishment: 6, base: 4 } } },
          ok: { body: "你什么都没说。风暴过境，你安然无恙，只是谁也没把你当自己人。",
            effects: { rep: 0.2 } },
          meh: { body: "你的沉默被两边各自解读，谁都觉得你含糊。安全，但没朋友。",
            effects: { rep: 0.1, fac: { establishment: -2 } } },
          fail: { body: "在一个人人表態的关头你装哑，被上层记成了「不表态就是不同意」。",
            effects: { rep: -0.3, fac: { establishment: -6 } } },
          critfail: { body: "你的沉默被对手解读成「心里向着他」。清算名单上没有你的名字，可传言里有。",
            effects: { rep: -0.7, fac: { base: -6, press: -6 }, flags: ["leaker_suspect"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 2) 地方忠诚听证 —— 点不点别人的名字（伦理/仕途）
   * ---------------------------------------------------------------------- */
  {
    id: "mcc54_names", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    era: ["1954_MCCARTHY"], tierMin: 0, tierMax: 3, weight: 11,
    medium: ["print", "radio"],
    title: "委员会想让你报几个名字",
    body: "地方的「反美活动」委员会把你单独留下。桌上有一份本地文教圈的人名，他们要你证实谁「去过哪些会」。\n" +
      "只要你点几个名字，你自己那行「曾经出席」的旧记录就可以一笔勾销。",
    brief: {
      lede: "他们要的不是真相，是一份能上新闻的名单。而你手上正好有能填进去的名字。",
      known: [
        "你被留下，是因为你的旧履历里有一行「参加过一次读书会」，他们拿这个拿捏你。",
        "你确实知道谁去过什么会——在这座小城，谁不知道呢。",
        "点了名字，你过关、他们交差；不点，你那行旧记录可能被拿出来示众。"
      ],
      rumor: [
        "有人说委员会早就有了名单，找你只是要一个「有人作证」的形式。",
        "有人说上一个不肯点名字的人，第二个月就丢了教职。"
      ],
      unknown: [
        "你今天点掉的人里，会不会有将来能替你说话的那一个。",
        "这份证词将来是被销毁，还是被某个对手在下次选举时翻出来。"
      ],
      terms: [
        { k: "点名自保", v: "以供出他人为代价换取自己脱身，是麦卡锡时代最折磨人的道德抉择。" }
      ]
    },
    choices: [
      {
        id: "name", text: "点几个无关紧要的名字，把自己摘出去",
        note: "现实的一手。你安全了，但从此你知道自己是什么人，被点的人也知道。",
        base: 0.7, mods: [{ src: "attr", key: "CUN", w: 0.45 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你报了两个早就不在本地的人，既交了差又几乎没伤到自己人。你全身而退，委员会还当你「识相」。",
            effects: { rep: 0.6, fac: { establishment: 8 }, flags: ["named_names"] } },
          ok: { body: "你报了名字，过关了。那行旧记录果然被划掉了，只是你在镜子里认不太出自己。",
            effects: { fac: { establishment: 5 }, flags: ["named_names"] } },
          meh: { body: "你报了，可委员会嫌你报得不够、话里留了情。你没彻底过关，也没彻底清白。",
            effects: { rep: -0.4, flags: ["named_names", "leaker_suspect"] } },
          fail: { body: "你点的人反过来证明你才是常去那些会的人。你想卖人，结果把自己卖了个干净。",
            effects: { rep: -1.25, fac: { establishment: -8, base: -6 }, flags: ["compromised", "named_names"] } },
          critfail: { body: "你点的那位，第二天在报上把你们当年一起出席的往事全抖了出来。「谁先出卖朋友」成了本地头条。",
            effects: { rep: -2.25, fac: { base: -12, press: -8 }, flags: ["named_names", "scandal_2"] } }
        }
      },
      {
        id: "refuse", text: "一个名字都不点，让他们查我自己",
        note: "守住一条线，代价是你自己站到台前去被审。",
        base: 0.42, mods: [{ src: "attr", key: "INTG", w: 0.55 }],
        outcomes: {
          crit: { body: "你一句「我只谈我自己，不谈别人」把委员会噎住了。这份硬气被少数报纸悄悄记下，多年后成了你最值钱的履历。",
            effects: { rep: 1.5, hp: -0.8, fac: { base: 8, press: 6, church: 5 }, flags: ["refused_to_name"] } },
          ok: { body: "你顶住了，没点人。他们悻悻放了你，你那行旧记录也渐渐没人再提。",
            effects: { rep: 0.8, fac: { base: 5 }, flags: ["refused_to_name"] } },
          meh: { body: "你守住了嘴，可也没换来什么，日子照常紧。",
            effects: { rep: 0.2, hp: -0.5 } },
          fail: { body: "你拒不配合，他们把你那行旧记录捅给了报纸。你成了本地一个「有前科还不肯交代」的人。",
            effects: { rep: -1.25, fac: { establishment: -8, base: -4 }, flags: ["scandal_1"] } },
          critfail: { body: "你的「不配合」被坐实成「心里有鬼」。一份「此人拒绝作证」的报告进了档案，从此跟着你的每一次升迁。",
            effects: { rep: -2, fac: { establishment: -12, military: -6 }, flags: ["compromised", "investigation_open"] } }
        }
      },
      {
        id: "fade", text: "打个太极：承认去过一次，别的「想不起来了」",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        outcomes: {
          crit: { body: "你滴水不漏地「记不清」，既没点人也没硬顶。委员会挑不出错，你自己那页也悄悄翻了过去。",
            effects: { rep: 0.6, fac: { establishment: 3, base: 2 } } },
          ok: { body: "你含糊过关。没出卖谁，也没把自己搭进去，就是这姿态不太好看。",
            effects: { rep: 0.2 } },
          meh: { body: "你的「记不清」两头不讨好：委员会觉得你滑头，朋友觉得你差点把他们绕进去。",
            effects: { rep: -0.2, fac: { base: -3 } } },
          fail: { body: "太极打滑了，一句「我记不清」被写成「他显然在隐瞒」。你想要清白，反落了可疑。",
            effects: { rep: -0.8, flags: ["leaker_suspect"] } },
          critfail: { body: "你想蒙混，可他们手头正好有一份写着你名字的记录。当场对质，你的「记不清」成了最难看的一景。",
            effects: { rep: -1.5, fac: { establishment: -8, press: -6 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 3) 巴士上的第三百八十一天 —— 罢乘起步（民权，为后续埋线）
   * ---------------------------------------------------------------------- */
  {
    id: "mcc55_bus", grade: "mid", category: "civil",
    valence: "risk", dyn: true,
    era: ["1954_MCCARTHY"], tierMin: 0, tierMax: 4, weight: 10,
    medium: ["print", "radio", "tv"],
    title: "黑人社区发起抵制巴士运动，要你表态支持",
    body: "南边一座城，一位妇女在巴士上没让座被捕，社区决定集体不坐巴士以示抗议。\n" +
      "这事在「反共」的高压下本该被压下去，可它偏偏是黑人教会组织的。有人想借它生事，也有人怕它真生出事。",
    brief: {
      lede: "一场罢乘，在人人怕被扣红帽子的年代，逼每个旁观的人选一次边。",
      known: [
        "这事找到你，是因为你管着本地的交通与治安预算，罢乘一旦扩大，第一个要开会应对的就是你这条线。",
        "组织者是本地黑人牧师，他要的不是同情，是「你别帮着镇压」。",
        "商会对罢乘恼火（市中心生意受影响），种族主义议员想给它扣「外部煽动」的帽子。"
      ],
      rumor: [
        "有人说这场罢乘其实是北方共党策划的，只等有人把它说实。",
        "有人说商会已经在筹划「免费班车」来瓦解罢乘。"
      ],
      unknown: [
        "这桩小小的罢乘会不会变成一个全国案件的起点。",
        "你今天怎么对它，五年后的法院判决和舆论会不会回头算账。"
      ],
      terms: [
        { k: "罢乘", v: "集体拒绝乘坐种族隔离的巴士，用经济损失迫使隔离政策让步的非暴力抗争方式。" }
      ]
    },
    choices: [
      {
        id: "protect", text: "不镇压：让治安「保持克制」，暗中替牧师挡一把",
        note: "在人人怕被扣红帽子的年代护住一场民权抗争。短期丢上层分，长期攒一笔历史股。",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "你压住了警察动手的冲动，罢乘和平进行，全国媒体拍到的是「克制的本地」而非「暴力镇压」。牧师记下了你，黑人教会从此把你当「可以谈的人」。",
            effects: { rep: 1.75, fac: { base: 10, church: 10, civil: 8, establishment: -6 }, flags: ["civil_ally"] } },
          ok: { body: "你让治安克制了些，事情没闹大。社区记了你的好，上层嫌你「太软」。",
            effects: { rep: 1, fac: { base: 6, church: 6, establishment: -4 } } },
          meh: { body: "你按住了几次小规模冲突，可也没真护住什么。一个各打五十大局的收场。",
            effects: { rep: 0.2, fac: { base: 2 } } },
          fail: { body: "你想护人，手下的警察还是动了手，照片上写着本地警徽。你替别人挡刀，反被当成主谋。",
            effects: { rep: -1, fac: { base: -8, establishment: -6 }, flags: ["scandal_1"] } },
          critfail: { body: "罢乘被暴力镇压，你被同时钉上「镇压者」和「挡不住事的人」两顶帽子。商会更嫌你碍事。",
            effects: { rep: -1.75, fac: { base: -12, commercial: -6, establishment: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "laworder", text: "维护秩序：罢乘就是违法，该抓就抓",
        note: "顺应种族主义议员与焦虑的上层。短期稳，长期是一笔会被历史翻出来的账。",
        base: 0.6, mods: [{ src: "fac", key: "establishment", w: 0.4 }],
        outcomes: {
          crit: { body: "你果断「恢复秩序」，罢乘很快被压下去。上层夸你靠得住，可你也把自己钉在了历史错的那一边。",
            effects: { rep: 0.8, tier: 1, fac: { establishment: 12, commercial: 6, base: -12, civil: -10 } } },
          ok: { body: "你按「违法」处理了罢乘。位子稳了，社区里一些看你的眼神变了。",
            effects: { rep: 0.2, fac: { establishment: 8, base: -8 } } },
          meh: { body: "你抓了几个人，罢乘换个方式继续。你既没镇住，也没落好。",
            effects: { fac: { establishment: 3, base: -5 } } },
          fail: { body: "镇压的镜头上了电视，你成了「南方顽固」的一个小注脚。全国舆论反过来教育你。",
            effects: { rep: -1.25, fac: { press: -10, base: -8 } } },
          critfail: { body: "罢乘领袖在拘押中出事，全国把矛头指向本地。你成了「那场不光彩镇压」的具体责任人。",
            effects: { rep: -2.5, fac: { base: -16, press: -10, civil: -12 }, flags: ["scandal_3"] } }
        }
      },
      {
        id: "neutral", text: "两头不沾，只强调「依法、和平、别给我惹事」",
        base: 0.66, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你一句套话说得四平八稳，谁都没抓住你的把柄。罢乘散了，你全身而退。",
            effects: { rep: 0.4, fac: { establishment: 3 } } },
          ok: { body: "你保持了「官方中立」。没立功，也没惹祸，就是两头都不太记得你的好。",
            effects: { rep: 0.2 } },
          meh: { body: "你的中立被双方各解读成「偏向对方」，你什么都没落着，反倒两边不待见。",
            effects: { rep: -0.4 } },
          fail: { body: "事情闹大了，你的「依法别惹事」被骂成「装没看见」。",
            effects: { rep: -0.8, fac: { base: -5 } } },
          critfail: { body: "你两头和稀泥，结果两边都觉得你碍事。罢乘领袖和种族议员罕见地达成一致：下次把你换掉。",
            effects: { rep: -1.25, fac: { establishment: -6, base: -6 } } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------------
   * 4) 图书馆里的「问题书」—— 小事（舆论/审查）
   * ---------------------------------------------------------------------- */
  {
    id: "mcc53_books", grade: "minor", category: "media",
    valence: "risk", dyn: true,
    era: ["1954_MCCARTHY"], tierMin: 0, tierMax: 2, weight: 9,
    medium: ["print", "radio"],
    title: "有人要求下架图书馆的「红书」",
    body: "一位家长联名要求镇图书馆把一批「有问题的书」撤下书架，理由是里面有「亲共的东西」。\n" +
      "馆长来找你说句话——这本是小事，可在这一年，为几本书说话也能变成一件危险的小事。",
    brief: {
      lede: "烧一本书很容易被人夸，护一本书却可能被人盯——这就是名单年代的荒诞。",
      known: [
        "馆长来找你，是因为你是镇政委员会里唯一公开读过几本书的人，他觉得你或许肯说句公道话。",
        "这批书里有小说、有历史，也确实有一两位作者上了全国的黑名单。",
        "联名的人不多，但个个都认识管学校的委员。"
      ],
      rumor: [
        "有人说联名那几位其实是被更上层的人推出来试水温的。",
        "有人说图书馆里早有人偷偷把书挪去了办公室，免得惹事。"
      ],
      unknown: [
        "为几本书出头，将来会不会被人当成「他思想有问题」的证据。",
        "如果你沉默，这批书会不会成为下一次的靶子，而你成了默认的人。"
      ],
      terms: [
        { k: "黑名单", v: "列有疑似共产主义同情者的名单，上榜者常被雇主与机构主动切割。" }
      ]
    },
    choices: [
      {
        id: "defend", text: "为书说话：下架是审查，我不干这个",
        note: "为几本书出头看似小，代价却可能很大。守住的是公信，惹上的是「可疑」的标签。",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.45 }, { src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你在镇议会上替书说了句「读什么书不该由联名信决定」。一位州议员主动来结识你，说「本地还有明白人」。",
            effects: { rep: 1.5, fac: { base: 5, press: 4, church: 3 }, contact: { lobbyist: 5 }, flags: ["book_defender"] } },
          ok: { body: "书没下架，风波过去了。你替自己攒了个「不跟风」的名声。",
            effects: { rep: 0.8, fac: { base: 3 } } },
          meh: { body: "你说了话，可图书馆还是「自愿」撤了几本。你说不动别人，只证明了自己。",
            effects: { rep: 0.4 } },
          fail: { body: "你替「红书」说话被传了出去。有人开始认真打听你的读书清单。",
            effects: { rep: -1.25, flags: ["leaker_suspect"] } },
          critfail: { body: "你的护书发言被写进了一份地方「可疑人物」的小报，你的名字下面画了线。",
            effects: { rep: -2.5, fac: { establishment: -6, base: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "goalong", text: "随大流：签名支持「保护孩子」下架",
        base: 0.7, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你签得比谁都快，家长和学校委员都把你当「自己人」。你顺风顺水，只是路过图书馆时不太看那个门口。",
            effects: { rep: 0.8, fac: { establishment: 6, base: 2 } } },
          ok: { body: "你跟着签了。没人再找你麻烦，书下架了，日子照过。",
            effects: { rep: 0.4, fac: { establishment: 3 } } },
          meh: { body: "你签了字，可老师看你的眼神变了。你换来安稳，换来一点说不清的别扭。",
            effects: { fac: { establishment: 2, base: -2 } } },
          fail: { body: "下架闹上了外地报纸，「某某镇禁书」成了笑柄，签名的名单也被登了出来。",
            effects: { rep: -1.5, fac: { press: -6 } } },
          critfail: { body: "多年后，这份你签过名的禁书单被人重新翻出，贴在了你某次竞选的门口。",
            effects: { rep: -2.75, fac: { base: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "quiet", text: "不签也不挡，让馆长自己定夺",
        base: 0.72, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你没出面，也没拦着。书的事悄悄了了，你既没上黑名单也没上联名信。",
            effects: { rep: 0.4 } },
          ok: { body: "你保持安静。这本就是件小事，你只是没让自己变成大事。",
            effects: { rep: 0.4 } },
          meh: { body: "你躲过了，可馆长觉得你不够意思，你也不知道下次他还会不会来找你。",
            effects: { rep: -0.4 } },
          fail: { body: "你想两不得罪，结果两边都觉得你不够意思。",
            effects: { rep: -0.8 } },
          critfail: { body: "你的「不表态」被两边都当成偏向对方，一件本可忽略的小事，反倒记住了你。",
            effects: { rep: -1.25, fac: { establishment: -3, base: -3 } } }
        }
      }
    ]
  }
]);
