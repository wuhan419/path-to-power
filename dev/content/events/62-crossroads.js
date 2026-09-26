/* ============================================================================
 * CONTENT · events/62-crossroads.js
 * 路线抉择：政治生涯的分岔口。参选还是给人打下手、NGO 还是体制内、
 * 州参议院还是联邦众议院、进竞选团队还是自己选州长。
 *
 * 这些事件的选项用 setTrack / setStance 效果键直接改轨道，用 flags
 * （cross_*）给后续 identityBias 倾斜 —— 抉择之后，你会遇到的世界不一样。
 *
 * 写作注意：每个事件必须有保底选项（无 cost 无 req）；标题 + 正文 ≤250 字。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 分岔一（T0，入行第一年）：自己上，还是给人抬轿子
   * ==================================================================== */
  {
    id: "cross_first_fork",
    grade: "major", unique: true, category: "career",
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 0, tierMax: 1, minTenure: 8, weight: 24,
    title: "第一道分岔：选票还是工牌",
    body: "入行快一年，两条路同时开了口。学区委员会（美国最基层的民选职位，管学校预算）空出一个席位：" +
      "门槛低，但每一票都要用腿去磨。一位州参议员的团队在招地区组织者——跑地方的竞选干员，盯志愿者和投票率，" +
      "薪水一般，但你天天见得到机器里的人。两件事不能同时做：竞选季是七乘二十四。你可以把自己的名字印上选票，" +
      "也可以先学会怎么让别人赢。你只能选一条。五年里你会遇到谁、欠谁人情，都由今天这一条决定。",
    choices: [
      {
        id: "run", text: "自己参选学区委员会",
        note: "选举轨道：名字是自己的，输赢也是自己的。双脚和周末都会被磨掉一层。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.5 }],
        outcomes: {
          crit: { body: "你赢了一个没人想到你会赢的席位。当选夜你站在小学体育馆的讲台上，第一次尝到「当选人」三个字的重量。", effects: { setTrack: "electoral", tier: 1, rep: 0.9, fac: { base: 10 }, flags: ["cross_runner"] } },
          ok: { body: "你赢了。差距不大，但赢了。你的名字第一次出现在官方文件上。", effects: { setTrack: "electoral", tier: 1, rep: 0.6, fac: { base: 7 }, flags: ["cross_runner"] } },
          meh: { body: "你惜败，但拿到的票数让本地党的执行委员记下了你的名字。", effects: { setTrack: "electoral", rep: 0.3, fac: { base: 5, establishment: 3 }, flags: ["cross_runner"] } },
          fail: { body: "你输得干净。敲门敲了四千扇，回来的教训比票值钱。", effects: { setTrack: "electoral", rep: 0.1, fac: { base: 3 }, attr: { CHA: 1 } } },
          critfail: { body: "竞选暴露了你所有的短板：怕镜头、不会要钱、临场忘词。你输了，而且输得难看。", effects: { rep: -0.3, fac: { base: -5, press: -4 }, attr: { CHA: 1 } } }
        }
      },
      {
        id: "staff", text: "进州参议员的竞选团队",
        note: "幕僚轨道：学会的是机器怎么转。赢的不是你，但分东西的时候你在桌上。",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "大选夜你们赢了十一个点。庆功宴上参议员敬酒时叫出了你的名字。两周后，你在州首府有了办公桌。", effects: { setTrack: "operative", rep: 0.4, fac: { establishment: 12 }, contact: { fixer: 8 }, flags: ["cross_staffer"] } },
          ok: { body: "你们赢了。你负责的选区投票率全州第三——这个数字进了你的简历第一行。", effects: { setTrack: "operative", rep: 0.2, fac: { establishment: 8 }, flags: ["cross_staffer"] } },
          meh: { body: "赢了，但胜果和你关系不大。你学到的东西比拿到的东西多。", effects: { setTrack: "operative", fac: { establishment: 5 }, attr: { CUN: 2 }, flags: ["cross_staffer"] } },
          fail: { body: "参议员输了。团队三个月解散，但你通讯录里的两百个名字留了下来。", effects: { setTrack: "operative", fac: { establishment: 3 }, attr: { CUN: 1 } } },
          critfail: { body: "竞选半路，你负责的选区爆出了志愿者登记造假的丑闻。参议员当众骂了你，虽然责任并不全在你。", effects: { rep: -0.6, fac: { establishment: -8, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "both_slow", text: "都先不选：把志愿做好，再等一年",
        note: "不着急。代价是看着别人先上桌——但你的日程是自由的。",
        base: 0.8,
        outcomes: {
          crit: { body: "你把两边的课都旁听了：帮竞选做过周末志愿者，也帮学区做过听证陈述。两边都觉得你「靠得住」。", effects: { rep: 0.3, fac: { base: 4, establishment: 4 }, attr: { INT: 1 } } },
          ok: { body: "又一年按部就班。你不是没成长，只是没上镜。", effects: { rep: 0.1 } },
          meh: { body: "一年很快过去了。当初开口的两条路，一条已经有人走了。", effects: {} },
          fail: { body: "等你再想上桌的时候，桌边坐满了人，而你还是那句话：我是做志愿的。", effects: { fac: { base: -3, establishment: -3 } } },
          critfail: { body: "两边的负责人都觉得你「态度暧昧」。政治圈对观望者的记忆比对对手还刻薄。", effects: { rep: -0.3, fac: { base: -5, establishment: -5 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 分岔二（T1-T2）：NGO 的清白，还是体制内的位置
   * ==================================================================== */
  {
    id: "cross_ngo_machine",
    grade: "mid", unique: true, category: "political",
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 1, tierMax: 2, minTenure: 12, weight: 18,
    title: "议题组织的名字，还是党组织的位置",
    body: "你在 NGO 的招牌下做成了两件本地实事，理事会开始谈扩大。党机器（政党的常设组织：" +
      "职位、背书、资金的网）也在向你招手：一个有薪职位，管三个县，条件是听「协调」。联合创始人说得很直白：" +
      "你去，他不拦，但签名页会少一个名字。理想给你清白，体制给你杠杆。你得决定把自己安放在哪里。" +
      "有人说，机器递过来的从来不是一个职位，是一整套坐标系。",
    choices: [
      {
        id: "stay_ngo", text: "留在 NGO：把议题做成山头",
        note: "基层与议题派系的信用继续涨；党内机器的大门缓缓合上。清白是一种资产，也是一种上限。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你们把议题推上了州议程：一场听证、两个法案、和一批把你的名字挂在嘴边的志愿者。", effects: { rep: 1.5, fac: { base: 12, press: 6, establishment: -3 }, flags: ["cross_ngo"] } },
          ok: { body: "组织又壮大一圈。你的名字和议题绑在了一起——这是资产，也是标签。", effects: { rep: 1, fac: { base: 8, establishment: -2 }, flags: ["cross_ngo"] } },
          meh: { body: "日子照旧：写报告、见议员、等回电。理想主义的折旧比你想的快。", effects: { rep: 0.4, fac: { base: 4 } } },
          fail: { body: "基金会的拨款改了方向，你们的项目砍了一半。你在裁员名单上划掉了别人的名字，从此组织里有人觉得你欠他们一句话。", effects: { rep: 0.2, fac: { base: 3, press: -2 }, fav: -1 } },
          critfail: { body: "一篇调查报道指出你们的理事会里坐着一家有利益的公司。你不知情——但签名页上有你。", effects: { rep: -1.25, fac: { base: -8, press: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "join_machine", text: "入党机器：三个县的组织位置",
        note: "坐标系换到党内。资源和纪律同来，老战友的签名页少一个名字。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "fac", key: "establishment", w: 0.3 }],
        outcomes: {
          crit: { body: "你把三个县的党组织织成了一张网。两年后的初选夜，三个县同时亮你的灯——州党部的走廊开始给你让路。", effects: { fac: { establishment: 14, base: 4 }, fun: 2.25, flags: ["cross_insider"] } },
          ok: { body: "位置坐稳了。党内的通讯录、例会和「协调」你都上手了。", effects: { fac: { establishment: 10 }, fun: 1.75, flags: ["cross_insider"] } },
          meh: { body: "你学会了党的语言：什么话在会上说，什么话在走廊说，什么话永远不说。", effects: { fac: { establishment: 6 }, attr: { CUN: 2 }, flags: ["cross_insider"] } },
          fail: { body: "「协调」的意思原来是：你的议题往后排。你提醒自己这是暂时的。", effects: { fac: { establishment: 4, base: -6 } } },
          critfail: { body: "一次「协调」让你在老战友的听证会上沉默了。报道写的是：他曾经的同伴如今坐在对面。", effects: { rep: -1, fac: { establishment: 5, base: -12, press: -5 } } }
        }
      },
      {
        id: "halfway", text: "做个「党外的党内人」：保持独立但定期合作",
        note: "两头都留着门。政治圈管这个叫狡猾，也叫成熟——取决于你后来成功了没有。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "establishment", w: 0.2 }],
        outcomes: {
          crit: { body: "你成了两边的翻译官：党需要议题的正当性，组织需要党的通道。两边都给你留了椅子——连那些两边都够不着的人，也开始把你当门路。", effects: { rep: 1.25, fac: { base: 6, establishment: 6, press: 3 }, contact: { fixer: 8 }, fav: 2 } },
          ok: { body: "合作关系维持住了。你没有全部的杠杆，但也没有全部的枷锁；顺带认识了几个哪边都办得成事的人。", effects: { rep: 0.6, fac: { base: 4, establishment: 4 }, contact: { fixer: 6 }, fav: 1 } },
          meh: { body: "两边客气地把你当成「需要的时候再找」的人。你倒是攒下了几个还肯接你电话的中间人。", effects: { fac: { base: 2, establishment: 2 }, contact: { fixer: 3 } } },
          fail: { body: "一次关键投票你两边都没讨到好：党说你拆台，组织说你投诚。连帮忙牵线的人也开始躲你。", effects: { rep: -0.6, fac: { base: -5, establishment: -5 }, fav: -1 } },
          critfail: { body: "你的「中间人」身份被写进了对手的攻击广告：两头下注，两头都不是自己人。", effects: { rep: -1.25, fac: { base: -8, establishment: -8, press: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 分岔三（T2→T3）：州参议员，还是联邦众议员
   * ==================================================================== */
  {
    id: "cross_state_federal",
    grade: "major", unique: true, category: "career",
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 2, tierMax: 3, minTenure: 24, weight: 20,
    tracks: ["electoral", "appointment"],
    title: "州府的席位，还是华盛顿的席位",
    body: "两个席位同时空出来。州参议院一位老议员退休：选区你熟，赢面实在，但报纸的版面到州界就停。" +
      "联邦众议院被人口重划（每十年按人口普查重画一次选区边界）裂出一个开放席位：全国目光，全国献金，" +
      "而众议员两年一任，你永远在竞选连任。顾问说得很直白：一个是大鱼小池塘，一个是小鱼大海。" +
      "有人说，那个刚裂开的口子本来就是留给金主自己人的。你爬到了必须选边的位置——而这个选择会定义你之后十年遇到的所有事。",
    choices: [
      {
        id: "state", text: "选州参议员：深耕州府",
        note: "稳、快、有实权。州级权力是棋盘：预算和选区地图都在这里画。",
        base: 0.65, mods: [{ src: "fac", key: "base", w: 0.3 }, { src: "attr", key: "CHA", w: 0.2 }],
        outcomes: {
          crit: { body: "你大胜进州府，第一年就拿到了一个关键委员会的席位。本党的总统候选人来你州筹款，先来拜你的码头。", effects: { tier: 1, rep: 1, fac: { base: 10, establishment: 8 }, flags: ["cross_senate_road"] } },
          ok: { body: "你赢了。州议会的大厅认得你了。", effects: { tier: 1, rep: 0.7, fac: { base: 7, establishment: 5 }, flags: ["cross_senate_road"] } },
          meh: { body: "赢了，但优势比预估薄。你欠下的竞选债要一个一个还。", effects: { tier: 1, rep: 0.3, fac: { base: 4, commercial: 3 }, fav: -2 } },
          fail: { body: "你输了初选。机器扶了别人。你站在宴会厅后面听完结果。", effects: { rep: 0.2, fac: { base: 4, establishment: -4 } } },
          critfail: { body: "败选夜的演讲你准备了赢的版本。临时改成体面的版本时，你听见台下有人说：他还年轻。这句话最难听。", effects: { rep: -0.4, fac: { base: -6, establishment: -6 } } }
        }
      },
      {
        id: "federal", text: "选联邦众议员：去华盛顿",
        note: "全国舞台、全国献金、两年一选的绞肉机。上限更高，地板也更冷。",
        base: 0.45, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "重划的口子真为你留的：全国性献金涌进来，你一波打进华盛顿。宣誓那天你给州里的老朋友们寄了明信片。", effects: { tier: 1, rep: 1.5, fac: { press: 8, commercial: 6, base: 4 }, flags: ["cross_federal_road"] } },
          ok: { body: "你赢下一个开放席位。华盛顿的公寓比想象的小，名字比想象的响。", effects: { tier: 1, rep: 1, fac: { press: 6, base: 3 }, flags: ["cross_federal_road"] } },
          meh: { body: "赢了，但花了三倍预算。国会山的第一个会期，你有一半时间在还人情。", effects: { tier: 1, rep: 0.6, fun: -1.75, fav: -2 } },
          fail: { body: "全国的钱来得快，走得也快——翻盘那年对面砸了双倍。你回了家。", effects: { rep: 0.3, fac: { press: 3 } } },
          critfail: { body: "你输给了本党初选里一个谁都没听说过的人。事后复盘：你出门太早、回家太少。", effects: { rep: -0.6, fac: { base: -8, establishment: -6 } } }
        }
      },
      {
        id: "wait_next", text: "这轮都不选：等两年后的双开放",
        note: "贪心，但有算盘：两年后州参议院与国会可能同时开放，届时的你是资深。风险是两年后可能什么都没有。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "两年后，两个席位真的同时开放了，而你是唯一等在原地的资深者。机器找了你。", effects: { rep: 0.7, fac: { establishment: 8, base: 4 }, attr: { INT: 1 } } },
          ok: { body: "你等到了一个：另一个席位被占住了八年。也不算输。", effects: { rep: 0.3, fac: { establishment: 4 } } },
          meh: { body: "两年后席位没有开放。你继续在现位置上，多了一圈年轮和一句「他稳」。", effects: { rep: 0.1 } },
          fail: { body: "你等来的不是开放，是初选中杀出来的两个新人把版图重新切了。你的「等待」变成了「错过」。", effects: { fac: { base: -4, establishment: -4 } } },
          critfail: { body: "「他稳」在政治语境里还有下半句：稳得不想动。这话传开后，机会开始绕开你。", effects: { rep: -0.4, fac: { base: -6, establishment: -6 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 分岔四（T3→T4）：进总统竞选团队，还是自己选州长
   * ==================================================================== */
  {
    id: "cross_wh_governor",
    grade: "major", unique: true, category: "career",
    valence: "risk", dyn: true,
    era: ["2008_CRASH"],
    tierMin: 3, tierMax: 4, minTenure: 24, weight: 18,
    tracks: ["electoral", "appointment", "operative"],
    title: "跟人上天，还是自立为王",
    body: "有望拿到提名的总统候选人请你进全国团队：高职，随行，赌上两年——他要的提名，" +
      "得一个州一个州把初选跑出来。同一周，你州的州长席位将开放：民调里你排第二，第一是现任的继承人，" +
      "据说党内背书已经给了他，他的数字却连跌了三个月。竞选经理把两页纸拍在桌上：一页写着「跟人」，" +
      "一页写着「自立」。跟人，是换一张进入权力核心的单程票；自立，是你的名字做主，输赢自负。",
    choices: [
      {
        id: "join_wh", text: "进竞选团队：跟这个人去华盛顿",
        note: "委任/幕僚的快车道。赢了大赢，输了裸泳——你的州不会替你保留位置。",
        base: 0.5, mods: [{ src: "fac", key: "establishment", w: 0.3 }, { src: "attr", key: "INT", w: 0.2 }],
        outcomes: {
          crit: { body: "你们赢了。胜选夜的舞台灯光里你站在第二排。一月二十日之后，你的工牌能开西翼的门。", effects: { setTrack: "appointment", tier: 1, rep: 1.5, fac: { establishment: 14, press: 6 }, flags: ["cross_wh_road"] } },
          ok: { body: "你们赢了。你在政府里分到一个实务位置——不是聚光灯下的，但离决策桌三米。", effects: { setTrack: "appointment", tier: 1, rep: 0.9, fac: { establishment: 10 }, flags: ["cross_wh_road"] } },
          meh: { body: "赢了，但分果子的时候你在外地出差。你的位置「考虑中」。", effects: { setTrack: "appointment", rep: 0.4, fac: { establishment: 6 } } },
          fail: { body: "你们输了。飞机落地那天，团队解散的邮件已经在服务器上排好了队。", effects: { rep: 0.2, fac: { establishment: 3 } } },
          critfail: { body: "竞选半途爆出候选人的旧账，票仓崩了。你作为「当时的团队核心」陪绑进每一篇复盘文章。", effects: { rep: -0.9, fac: { establishment: -8, press: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "run_gov", text: "自己选州长：把名字放在最上面",
        note: "选举轨道的终极考验：全州竞选。赢了是一方之主，输了几乎耗尽所有。",
        base: 0.4, mods: [{ src: "attr", key: "CHA", w: 0.5 }, { src: "fac", key: "base", w: 0.3 }],
        cost: { fun: 4 },
        outcomes: {
          crit: { body: "你在辩论夜一句「这个州的账我来算」被剪成广告循环了一个月。当选夜，全州的地图一色是你的颜色。", effects: { tier: 1, rep: 2, fac: { base: 14, establishment: 6 }, flags: ["cross_gov_road"] } },
          ok: { body: "你赢了州长官邸。钥匙交接那天，前任握着你的手说：现在你懂了。", effects: { tier: 1, rep: 1.25, fac: { base: 10 }, flags: ["cross_gov_road"] } },
          meh: { body: "险胜。一半的州投了你，另一半会提醒你四年。", effects: { tier: 1, rep: 0.9, fac: { base: 6 }, fav: -2 } },
          fail: { body: "你输了。竞选债是实的，教训是虚的，两者都要时间消化。", effects: { rep: 0.3, fac: { base: 4 }, fav: -3 } },
          critfail: { body: "大选前两周，一段你三年前的私下讲话录音流出。你输得很惨，而且是被自己说倒的。", effects: { rep: -1, fac: { base: -10, press: -8 }, flags: ["scandal_3"], fall: 1 } }
        }
      },
      {
        id: "both_hedge", text: "名义上「协助」竞选，实际自备州长竞选",
        note: "脚踩两条船：不出全力跟人，也不公开自立。玩好了两头都有，玩砸了两头都知。",
        base: 0.35, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        outcomes: {
          crit: { body: "你两头周旋得天衣无缝：候选人谢你「鼎力相助」，州里的桩脚也在替你热身。只有你的日程表知道真相。", effects: { rep: 0.9, fac: { establishment: 6, base: 6 }, attr: { CUN: 2 } } },
          ok: { body: "两边都半信半疑，两边都还用你。你的平衡术暂时成立。", effects: { rep: 0.4, fac: { establishment: 3, base: 3 } } },
          meh: { body: "「协助」的意思最后变成你在两间办公室之间来回跑腿，两边的人情都替你贴进去不少。", effects: { rep: 0.2, fav: -1 } },
          fail: { body: "候选人团队发现你的献金名单里一半是州长桩脚。你被礼貌地请出了电话会。", effects: { rep: -0.4, fac: { establishment: -8 } } },
          critfail: { body: "两边同时收到对方给你的承诺书复印件。华盛顿的不再理你，州里的要求你「给个说法」。", effects: { rep: -0.9, fac: { establishment: -10, base: -8 }, flags: ["scandal_2"] } }
        }
      }
    ]
  }

]);
