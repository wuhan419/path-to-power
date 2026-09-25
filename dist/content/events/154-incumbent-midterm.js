/* ============================================================================
 * CONTENT · events/154-incumbent-midterm.js
 * #21 M2 在任总统的中期选举链（camp_midterm）三幕：党团交代 → 全国助选 → 投票日。
 * 这条链选的是国会，不动总统本人的位势；守院的判胜只看末幕主战选项是否盖上那面旗。
 * ==========================================================================*/

POTUS.define("event", [
  {
    id: "camp_mt_agenda", brief: { lede: "就职满两年，党团要你对这两年交账：候选人愿意挂你的名字，还是希望你别来。", known: ["地方候选人要的是钱和票，不是你的一张合影。", "把自己绑上整张党票，涨得最猛，摔得也最狠。", "只回自家州站台，谁也挑不出错，可也带不动别人。"], unknown: ["你只要一次不出场，就等于认了这两年不值一提。"] },
    grade: "major", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 9, tierMax: 9, weight: 1,
    title: "党团要一个交代",
    body: "两年一次的党团年会，把这两年的账摊在桌上。台上的人笑着问你几时来，台下的人在心里算你的名字还值几票。",
    choices: [
      {
        id: "all_in", text: "把自己绑上整张党票，一场一场去替人站台", base: 0.42,
        mods: [{ src: "attr", key: "CHA", w: 0.5 }],
        outcomes: {
          crit: { body: "你的姓名成了党的招牌，地方党部抢着把你印上海报。", effects: { rep: 5, camp: { momentum: 15 } } },
          ok: { body: "你压住了场子，党票愿意跟着你走一段。", effects: { camp: { momentum: 8 } } },
          meh: { body: "站台几场，掌声客气，地方还是各打各的。", effects: { camp: { momentum: 2 } } },
          fail: { body: "有候选人当场跟你切割，说你这两年的账他背不动。", effects: { rep: -2, camp: { momentum: -7 } } },
          critfail: { body: "整张党票在台上跟你保持距离，你的名字成了要被绕开的那个。", effects: { rep: -4, camp: { momentum: -15 }, fac: { establishment: -12 } } }
        }
      },
      {
        id: "home_state", text: "只回自己的州，先把自家基本盘守住", base: 0.55,
        mods: [{ src: "fac", key: "base", w: 0.35 }],
        outcomes: {
          crit: { body: "自家州把你围成人墙，地方选情反过来被你一手拉动。", effects: { camp: { momentum: 12 }, fav: 1 } },
          ok: { body: "你把基本盘握实了，虽不出色，但没人能从你身上找到缺口。", effects: { camp: { momentum: 6 } } },
          meh: { body: "守住了自己那一隅，别处的窟窿还是在那儿。", effects: { camp: { momentum: 1 } } },
          fail: { body: "党主席在电话里问你：你是我们的人，还是只是一家之主？", effects: { camp: { momentum: -5 }, fac: { establishment: -6 } } },
          critfail: { body: "全国选战塌了，你自己的州也替别人补不上那个洞。", effects: { rep: -1.5, camp: { momentum: -12 }, fac: { establishment: -10 } } }
        }
      },
      {
        id: "hand_off", text: "把党主席的筹款会推给副总统", base: 0.62,
        outcomes: {
          crit: { body: "副总统替你跑完全场，钱到手了，你也不必出来受审。", effects: { camp: { momentum: 13, warchest: 12 } } },
          ok: { body: "钱照收，人不到。党团嘟囔几句，还是把账结了。", effects: { camp: { momentum: 7, warchest: 8 } } },
          meh: { body: "筹款会平平淡淡开完，你的名字没出现，也没被提起。", effects: { camp: { momentum: 3, warchest: 6 } } },
          fail: { body: "副总统的场子救不了你的场子，党团听懂了你没来是什么意思。", effects: { camp: { momentum: -6 }, fac: { establishment: -5 } } },
          critfail: { body: "党里传开一句话：白宫那位已经放弃这张党票了。", effects: { rep: -2.5, camp: { momentum: -12, warchest: -6 }, fac: { establishment: -12 } } }
        }
      }
    ]
  },
  {
    id: "camp_mt_rally", brief: { lede: "七十二小时跑六个州，地方台只想知道你怎么回应那件还没过去的旧事。", known: ["地方台的问题从来不是全国议题，是你自己那笔旧账。", "把对手阵营那件把柄同时放出去，水花会反着涌回来。", "只去稳的州能保住基本盘，却也只保住基本盘。"], unknown: ["这波水花最后会砸在谁的头上，要看你先把矛头对准谁。"] },
    grade: "major", category: "campaign", unique: false,
    valence: "risk", tierRaw: true, tierMin: 9, tierMax: 9, weight: 1,
    title: "全国助选",
    body: "专机七十二小时起降六州。你在台上替人背书，镜头却在等那件还没过去的旧事从你嘴里怎么讲出来。",
    choices: [
      {
        id: "head_on", text: "挨场硬碰，替人背书，顺手把对手的旧账也摊开", base: 0.44,
        mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        cost: { funLevel: 2 },
        outcomes: {
          crit: { body: "你把旧事一句挡回，反手把对手的把柄钉上头条，六个州都在播你。", effects: { rep: 5.5, camp: { momentum: 15 }, fac: { press: 12 } } },
          ok: { body: "硬碰硬你没输，地方候选人在台上敢抓你的手了。", effects: { camp: { momentum: 9 } } },
          meh: { body: "两边互相泼水，观众看完了只记得水里有两个影子。", effects: { camp: { momentum: 3 }, count: { wrath_opposition: 8 } } },
          fail: { body: "你把把柄丢出去，镜头把你那件旧事剪成当晚的开头。", effects: { rep: -2, camp: { momentum: -8 }, count: { wrath_press: 10 } } },
          critfail: { body: "两场答问连着塌，对手把你的旧事做成全国广告，替你播。", effects: { rep: -4, camp: { momentum: -15, warchest: -8 }, count: { wrath_press: 14, wrath_opposition: 12 } } }
        }
      },
      {
        id: "safe_states", text: "只去稳的州，把基本盘那几票先摁住", base: 0.55,
        mods: [{ src: "fac", key: "base", w: 0.4 }],
        outcomes: {
          crit: { body: "稳州的场子一场比一场满，基本盘的投票意愿被你亲自点起来。", effects: { camp: { momentum: 12 }, fac: { base: 14 } } },
          ok: { body: "你把自己的地盘踩得结结实实，没人能从这里偷走什么。", effects: { camp: { momentum: 6 }, fac: { base: 8 } } },
          meh: { body: "自己人鼓掌给自己人听，摇摆的地方一句也没听到你。", effects: { camp: { momentum: 2 } } },
          fail: { body: "稳州不需要你，旧事还是跟着你的车队跑了一路。", effects: { camp: { momentum: -6 }, fac: { press: -6 } } },
          critfail: { body: "你只在自家院子里说话，全国新闻时段整个让给了对手。", effects: { camp: { momentum: -12 }, rep: -1.5, fac: { press: -10 } } }
        }
      },
      {
        id: "record_launch", text: "办一场自己政绩的发布会，不接本地提问", base: 0.6,
        outcomes: {
          crit: { body: "你把这两年讲成一份能拿出手的成绩单，地方党部照着它印传单。", effects: { rep: 4, camp: { momentum: 13 }, score: 0.3 } },
          ok: { body: "发布会平稳过关，旧事没人追问，你也没给对手留话头。", effects: { camp: { momentum: 7 } } },
          meh: { body: "成绩单没人转发，各州的选战还是各自为战。", effects: { camp: { momentum: 2 } } },
          fail: { body: "不接提问这件事本身成了新闻：他在躲什么？", effects: { camp: { momentum: -5 }, fac: { press: -7 } } },
          critfail: { body: "全场只留下一句你拒绝回答的画面，循环播到投票日前夜。", effects: { rep: -3, camp: { momentum: -13 }, count: { wrath_press: 12 } } }
        }
      }
    ]
  },
  {
    id: "prog_midterm", brief: { lede: "投票日：选民不问你下一任想干什么，只问这两年你干成了什么。", known: ["国会两院的席位今晚一起开出来，你的名字在最上面。", "全党押上来守多数，靠的是你还有多少人愿意替你出门投票。", "现在缩回白宫，议程能保住，党团这本账要记到你卸任那天。"], unknown: ["丢了院，党内的清算就从开票夜那通电话开始。"] },
    grade: "major", category: "campaign", unique: false,
    minTenure: 12,               // 中期档期开在第 14 月：这条闸只拦"火箭直达总统就要验货"
    valence: "risk", tierRaw: true, tierMin: 9, tierMax: 9, weight: 1,
    title: "投票日 · 中期",
    body: "计票夜。你这两年的每一道题，都由别人的选票来打分。国会守不守得住，就看今晚你肯把自己押到哪一步。",
    choices: [
      {
        id: "hold", "ballot": true, text: "押上自己的名字，全党压上去守国会", req: { voterShare: 0.10 }, base: 0.42,
        outcomes: {
          crit: { body: "多数保住了，还在你手里扩了席。这一夜你的名字是党的资产。", effects: { rep: 6, camp: { momentum: 15 }, flags: ["pres_midterm_hold"] } },
          ok: { body: "险胜：院守住了，席位小亏。党团松了口气，你的账也就算清了这一回。", effects: { camp: { momentum: 8 }, flags: ["pres_midterm_hold"] } },
          meh: { body: "不痛不痒的一夜，多数从指缝里滑走。你守住了白宫，守不住国会。", effects: { rep: -1.5, camp: { momentum: 1 }, fac: { establishment: -8 } } },
          fail: { body: "丢院。开票夜党团那通电话已经不是慰问，是在算该由谁来担这责。", effects: { rep: -3, camp: { momentum: -6 }, count: { wrath_establishment: 10 } } },
          critfail: { body: "两院全丢，还搭进去几个你亲自保的人。剩下的两年，你要在少数派的位置上过。", effects: { rep: -4, camp: { momentum: -13 }, fac: { establishment: -16 }, count: { wrath_establishment: 15, wrath_money: 10 } } }
        }
      },
      {
        id: "retreat", text: "缩回白宫守自己的议程，不替候选人站台", base: 0.5,
        outcomes: {
          crit: { body: "你干净地躲在议程后面，立法上抢下几件能写进回忆录的事。", effects: { rep: 2, camp: { momentum: 12 }, score: 0.35 } },
          ok: { body: "白宫的日程表保住了，国会那边输多输少没人再提你的名字。", effects: { camp: { momentum: 6 } } },
          meh: { body: "哪儿也没丢，哪儿也没赢。党团记下了你今晚不在。", effects: { camp: { momentum: 2 }, fac: { establishment: -6 } } },
          fail: { body: "你守住了议程，换来一张丢了院的党团，从此每件事都要跟人商量。", effects: { rep: -2, camp: { momentum: -6 }, count: { wrath_establishment: 12 } } },
          critfail: { body: "崩盘夜你在书房里读简报。党的账、钱的账、历史的账，一起记到你卸任那天。", effects: { rep: -4, camp: { momentum: -13 }, fac: { establishment: -18 }, count: { wrath_establishment: 15 } } }
        }
      },
      {
        id: "swing_allin", text: "连夜倒向摇摆选区，把钱花光", base: 0.4,
        cost: { funLevel: 3 },
        outcomes: {
          crit: { body: "最后一夜的钱砸进了三个区，你险险把多数留在手里，库也见了底。", effects: { rep: 3, camp: { momentum: 14, warchest: -6 } } },
          ok: { body: "钱花到了刀口上，席位数勉强撑住，账上什么都没剩下。", effects: { camp: { momentum: 7, warchest: -14 } } },
          meh: { body: "钱全撒进了摇摆区，撒出去连个响都没有。多数还是没守住。", effects: { camp: { momentum: 1, warchest: -20 }, count: { wrath_money: 8 } } },
          fail: { body: "你花光了最后一笔钱，丢了院，金主开始问下一场要投给谁。", effects: { rep: -2.5, camp: { momentum: -7, warchest: -24 }, count: { wrath_money: 13 } } },
          critfail: { body: "钱烧尽、院丢、党内有人已经在讲「后头两年怎么办」。", effects: { rep: -4, camp: { momentum: -12, warchest: -24 }, fac: { commercial: -14 }, count: { wrath_money: 15, wrath_establishment: 10 } } }
        }
      }
    ]
  }
]);
