/* ============================================================================
 * CONTENT · events/126-line-2015-18.js
 * 连续时间轴 · 2015—2018 定点大事（Track B · B7 波段）。
 *
 * 形制（见 docs/PARALLEL-CONTENT-WORK.md §4.3 与 docs/CONTENT-SCHEMA.md §1.5/§1.6/§11.7）：
 *   · 新卡不写 era —— 一律 minYear/maxYear + scoped，绝对年窗走 when.js。
 *   · 到点必发 —— 九张新卡与三张存量卡（soc16_election / soc17_fakenews / soc18_data
 *     只 pin 不重写）全部钉进文件末尾的 POTUS.define("fixed", …)。
 *   · 每卡一个「保底」选项：无 cost、无 req、高地板低天花板、不埋负面 flag（§6.1）。
 *   · 冒险项支出↔把握↔天花板三者错位，收益至少铺两根轴（§6.2）。
 *   · 枪击 / 族裔 / 执法这类敏感题材只写政治处境：你怎么表态、怎么算账，不写血腥细节，
 *     不点真人姓名，一律用职务称谓。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2015-06 · 同性婚姻全国合法 —— 一纸裁定把措辞权交到你手上
   * ==================================================================== */
  {
    id: "ln15_marriage", photo: "era-2015.jpg", grade: "major", category: "civil",
    valence: "risk", dyn: true,
    minYear: 2015, maxYear: 2015, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 13, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 6,
    title: "最高法院裁定同性婚姻全国合法，各州禁令一夜作废",
    body: "六月末的一个早晨，九位大法官以五比四写下结论：婚姻权不因性别而两样。南方几个县的法院门口当天排起两队人——领证的，和举标语的。\n" +
      "你选区里有一对相识二十年的伴侣，也有把你党部门槛踩热的教会执事。电话在同一个下午全打了进来。",
    brief: {
      lede: "结果已经注定，此刻只欠一个本地人说出台词。",
      known: [
        "裁定已生效，两拨人都要你在四十八小时内定性。",
        "选区的年轻选民正盯着你第一句话。",
        "教会的执事已经在你的会议室里坐着。",
        "你能改的只有措辞，不是结论。"
      ],
      rumor: [
        "有人说教会已另立政治议程，钱到位。",
        "有人说对手盼你把道德议题吵大，好转移话题。"
      ],
      unknown: [
        "这道题会在初选里被反复追问。",
        "哪一笔捐款因你的措辞改道。"
      ],
      terms: [{ k: "宗教豁免", v: "以信仰为由拒绝执行平等规则的主张。" }]
    },
    choices: [
      {
        id: "register", text: "只把发证流程办得不偏不倚，公开不谈对错",
        base: 0.64, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "登记处那天秩序井然，两边都挑不出你一句毛病。上级办事的人记住了：这个人接得住麻烦事。", effects: { rep: 0.8, fac: { establishment: 4, commercial: 3 } } },
          ok: { body: "你没站任何一边，也没让本地乱一天。这本身就是成绩。", effects: { rep: 0.3 } },
          meh: { body: "你说了几句程序与守法，谁都没往心里去。", effects: { rep: 0.05 } },
          fail: { body: "「不表态」被两头同读成心虚，街面上有人开始喊你的名字加问号。", effects: { rep: -0.5, fac: { base: -3 } } },
          critfail: { body: "你想两边都不沾，结果两边都把你当成对方的暗桩。", effects: { rep: -0.9, fac: { press: -4 } } }
        }
      },
      {
        id: "celebrate", text: "公开庆贺：把裁定讲成平等权的胜利",
        note: "赌浪潮站在你这边。风险：本党的教会线当场翻脸。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你那几句庆贺被反复转发，年轻选民第一次把你的脸和「站对了边」放在一起。教会的电话从此不再接你。", effects: { rep: 1.5, fac: { base: 12, church: -8 }, voters: { warm: 400 }, flags: ["equal_voice"] } },
          ok: { body: "你顺应了大势，新支持者记你一份，老支持者悄悄把捐款转走。", effects: { rep: 0.6, fac: { base: 7, church: -6 } } },
          meh: { body: "你说了祝贺，声音被更大的名字盖过去。", effects: { rep: 0.1, fac: { church: -3 } } },
          fail: { body: "在信仰浓的地区你高谈平权，教会把你写成「上门教训我们的人」。", effects: { rep: -1.4, fac: { base: -3, church: -12 } } },
          critfail: { body: "你的庆贺词被剪进对手的广告，教区主日讲道直接点了你的名。", effects: { rep: -2.2, fac: { church: -16, press: -6, establishment: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "faith", text: "替教会说话：主打宗教豁免，明说裁定越权",
        note: "赌宗教右翼的怒气能换成背书。风险：中间选民记住这句话。",
        base: 0.45, mods: [{ src: "fac", key: "church", w: 0.4 }, { src: "attr", key: "CUN", w: 0.25 }],
        outcomes: {
          crit: { body: "你把「良心自由」讲成一套能被引用的方案，教会网络把你当成自己人，党内的话筒开始交到你手里。", effects: { rep: 1.0, fac: { church: 16, establishment: 6, base: -8 }, flags: ["church_champion"] } },
          ok: { body: "你护住了教会那一边，上层满意；城里那些新登记的家庭从此对你冷淡。", effects: { rep: 0.4, fac: { church: 9, establishment: 3, base: -6 } } },
          meh: { body: "你讲了一句老话，谁都没觉得新鲜。", effects: { rep: -0.1, fac: { church: 3, base: -3 } } },
          fail: { body: "你反对的表态被写成「他不给邻居办证」，基层动员当夜起火。", effects: { rep: -1.5, fac: { base: -12, press: -6 } } },
          critfail: { body: "你替豁免权说的那句狠话被逐字回放，本地小企业开始公开和你切割。", effects: { rep: -2.4, fac: { base: -16, press: -8, establishment: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "roundtable", text: "自掏腰包办圆桌：把教会与商户按到一张桌上",
        note: "钱能把两拨人按在椅子上一次。风险：谁都不领情，账记你头上。",
        base: 0.42, mods: [{ src: "attr", key: "INT", w: 0.35 }, { src: "fac", key: "commercial", w: 0.25 }],
        cost: { fun: 0.6 }, stake: { fun: true },
        outcomes: {
          crit: { body: "一桌人谈成了本地不成文的边界：证照发、人不动员。商人觉得你懂行，教会觉得你给了台阶。", effects: { rep: 1.2, fun: 0.6, fac: { commercial: 10, establishment: 6, church: 4 }, attr: { INT: 2 } } },
          ok: { body: "会开得不难看，摩擦降了一格。钱花了，两边各记你半份好。", effects: { rep: 0.35, fac: { commercial: 6, establishment: 3 }, flags: ["bridge_builder"] } },
          meh: { body: "该来的人来了，该吵的照吵。你只换来一句「他还挺热心」。", effects: { rep: 0, fac: { commercial: 2 } } },
          fail: { body: "圆桌散场后两边都骂你「和稀泥」，钱没换来一句好话。", effects: { rep: -1.2, fun: -0.5, fac: { commercial: -5, church: -4 } } },
          critfail: { body: "这场宴请被人拍成「拿商户的钱买教会沉默」，两头一起跟你翻脸。", effects: { rep: -2.0, fun: -1.0, fac: { establishment: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2015-07 · 查尔斯顿教堂枪击与降邦联旗 —— 哀悼还没散，旗子先成题
   * ==================================================================== */
  {
    id: "ln15_charleston", photo: "era-2015.jpg", grade: "mid", category: "civil",
    valence: "bane", dyn: true,
    minYear: 2015, maxYear: 2015, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 7,
    title: "教堂枪击案后，邦联旗从州议会屋顶被取下",
    body: "一场晚间祷告会被人打断，多名会众死在自家教堂里。凶手最爱拍那张旗子，照片当天挂遍全网。\n" +
      "哀悼还没散，旗子该不该从议会屋顶降下来，成了州里最响的一道题。你开口前的第一秒，两边都在录音。",
    brief: {
      lede: "死者刚刚下葬，活人已经开始为一块布算账。",
      known: [
        "撤旗要走程序，也可拖；程序在你手上。",
        "州里两党领袖都在等本地人物先开口。",
        "你选区的老兵家庭与新生族群各有票。"
      ],
      rumor: [
        "有人说上面已内定撤旗，只找人背锅。",
        "有人说护旗的那批是被捐款推上台的。"
      ],
      unknown: [
        "这块布会在初选里被反复拿来问。",
        "你的措辞两年后被谁剪进广告。"
      ],
      terms: [{ k: "邦联旗", v: "南方联邦军队的战旗，被视为种族象征。" }]
    },
    choices: [
      {
        id: "mourn", text: "只出席葬礼与募捐，不对旗子表态",
        base: 0.63, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "你在每一场葬礼上站到最后一刻，没讲一句主张。教会与两家社群都说：那种时候他没借人。", effects: { rep: 0.9, fac: { church: 5, base: 4 } } },
          ok: { body: "你送了慰问、募了款，没说错话，也没留下立场。", effects: { rep: 0.3 } },
          meh: { body: "你来了、鞠了躬、走了。谁也没记住你在那儿。", effects: { rep: 0.05 } },
          fail: { body: "有人质问：连旗子都不敢讲，你还有什么敢讲。", effects: { rep: -0.5, fac: { press: -3 } } },
          critfail: { body: "你的沉默被写成「他躲着那九家人的眼睛」。", effects: { rep: -1.0, fac: { base: -5, press: -4 } } }
        }
      },
      {
        id: "remove", text: "带头要求把旗子从议会屋顶撤下",
        note: "赌哀悼能压过祖产叙事。风险：军属与老兵社群记你一辈子。",
        base: 0.5, mods: [{ src: "fac", key: "establishment", w: 0.3 }, { src: "attr", key: "CUN", w: 0.3 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "旗子在你发声后一周内被取下，商业组织与党上层把你算进「懂事的那批人」，本地商会第一次给你开门。", effects: { rep: 1.5, fun: 0.5, fac: { establishment: 10, commercial: 8, military: -6, base: 4 } } },
          ok: { body: "你押对了时间：企业开始施压，上面顺水推舟。老兵聚会上有人当场离席。", effects: { rep: 0.7, fac: { establishment: 6, commercial: 4, military: -4 } } },
          meh: { body: "你喊了撤旗，动作被别人完成，功劳与你无关。", effects: { rep: 0.1, fac: { military: -3 } } },
          fail: { body: "旗子没动，火却烧到你身上：「他恨我们的祖辈」。", effects: { rep: -1.6, fac: { base: -10, military: -8 } } },
          critfail: { body: "撤旗最终由别人完成，而你成了唯一的靶子。军属的抗议直接堵在你办公室门口。", effects: { rep: -2.5, fac: { base: -14, press: -6, military: -10 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "heritage", text: "守住旗子：把历史讲成不可让步的东西",
        note: "赌基本盘的怒气能换成提名。风险：全国媒体把你做成标本。",
        base: 0.44, mods: [{ src: "fac", key: "base", w: 0.4 }, { src: "attr", key: "CUN", w: 0.25 }],
        outcomes: {
          crit: { body: "你把「祖辈的旗」讲成一套本地人爱听的道理，小镇的捐款一笔笔汇进来，党内的老派系把你收进名册。", effects: { rep: 1.1, fun: 0.9, fac: { base: 14, establishment: -4 }, flags: ["flag_defender"] } },
          ok: { body: "你护住了旗子也护住了人气：本党的捐款当天到账，外地的笔却齐转向你。", effects: { rep: 0.4, fun: 0.45, fac: { base: 8, press: -4 } } },
          meh: { body: "你讲了老话，热度已经过了，没人接。", effects: { rep: -0.1, fac: { press: -3 } } },
          fail: { body: "在举国哀悼的空气里你替旗子辩护，报纸把你和凶手并排印在版面上。", effects: { rep: -1.5, fac: { press: -10, commercial: -6 } } },
          critfail: { body: "那句话跟你一辈子。本地企业联名要求你退党团，捐款账户一夜清零。", effects: { rep: -2.4, fac: { press: -12, commercial: -8, establishment: -5 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "fund", text: "掏钱办悼念基金与背景审查听证",
        note: "钱能把话题从旗子挪到办事上。风险：两头都说你在买安静。",
        base: 0.48, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "fac", key: "church", w: 0.25 }],
        cost: { fun: 0.7 },
        outcomes: {
          crit: { body: "基金真的开到了账，听证会也在本州第一开。受害家庭当众念了你的名字——不是作为政客，是作为出钱办事的人。", effects: { rep: 1.6, fac: { church: 12, press: 6, base: 5 }, voters: { warm: 300 } } },
          ok: { body: "你把事办成了一半，媒体给了你一天的好版面。", effects: { rep: 0.8, fac: { church: 6, press: 3 } } },
          meh: { body: "钱出了，会开了，第二天头版仍是那面旗子。", effects: { rep: 0.1, fac: { church: 2 } } },
          fail: { body: "有人查了你的账：「他在给自己买哀悼的样子。」", effects: { rep: -1.4, fun: -0.5, fac: { press: -5 } } },
          critfail: { body: "基金的账目与你的合影被贴在一起，家属公开请你别再用自己的名字。", effects: { rep: -2.2, fun: -1.0, fac: { press: -8, church: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2016-01 · 弗林特水危机 —— 数据在手，解释在州里，怒气在街头
   * ==================================================================== */
  {
    id: "ln16_flint", photo: "era-2016.jpg", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2016, maxYear: 2016, scoped: true, tierRaw: true, tierMin: 0, tierMax: 4, weight: 12, unique: true,
    medium: ["print", "tv", "internet", "social"], month: 1,
    title: "换了水源之后自来水变褐，孩子的检测单开始发红",
    body: "为了省下一笔钱，城里的水改从河上取，防腐处理没跟上，管垢里的铅顺着水龙头进了家家户户。\n" +
      "州里的口径是「符合标准」，县医院的化验单却一张张往上走。你的电话一半是愤怒的家长，一半是怕砸了工厂的官员。",
    brief: {
      lede: "数据在你手上，解释在州里，怒气在街头。",
      known: [
        "州府的检测报告显示铅含量偏高。",
        "联邦口径含糊，宣告紧急状态要政治决心。",
        "水厂与两家工厂是本镇就业支柱。",
        "要公开哪批数据，此刻由你决定。"
      ],
      rumor: [
        "有人说上面早知道，只是没人签字。",
        "有人说换水源是给一笔工程让路。"
      ],
      unknown: [
        "这口水会追你多久。",
        "谁先说出口，谁就定了调。"
      ],
      terms: [{ k: "紧急状态", v: "宣告后可调用联邦资源与资金。" }]
    },
    choices: [
      {
        id: "bottle", text: "组织志愿者挨家送瓶装水，不抢镜头",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        outcomes: {
          crit: { body: "车不够就用自己的腿，几周下来街区认得你的车。没人给你发稿，可也没人敢说你不在。", effects: { rep: 0.8, fac: { base: 6, church: 3 } } },
          ok: { body: "水送到了该送的人手上，你没说一句州长的坏话。", effects: { rep: 0.35, fac: { base: 2 } } },
          meh: { body: "你送了水，也仅此而已。", effects: { rep: 0.05 } },
          fail: { body: "有人说光送水就是替上面打掩护，家长堵在你车前。", effects: { rep: -0.6, fac: { base: -3 } } },
          critfail: { body: "你的车队照片被配上一句「他送水，他们喝水」。", effects: { rep: -1.1, fac: { press: -4, base: -4 } } }
        }
      },
      {
        id: "release", text: "公开检测数据，逼州里承认紧急状态",
        note: "赌真相比程序跑得更快。风险：建制的门对你关上。",
        base: 0.48, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "press", w: 0.25 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "数据上网络当晚全国记者开来转播车，上级不得不改口径。执法与监管机构记住你是谁报的信。", effects: { rep: 1.6, attr: { INT: 2 }, fac: { press: 10, base: 8, agency: -8 } } },
          ok: { body: "你点着了火，上面勉强派了人来查。你的党职从此变成阻力。", effects: { rep: 0.7, fac: { press: 5, base: 4, agency: -4 } } },
          meh: { body: "你公开了数字，可没人看得懂，媒体嫌它不够吓人。", effects: { rep: 0 } },
          fail: { body: "你的数据被指为「取样不规范」，州里反过来查你的办公室。", effects: { rep: -1.6, fac: { agency: -10, establishment: -8 } } },
          critfail: { body: "调查方向调了头：不是你查他们，是他们查你。档案袋上写着你的名字。", effects: { rep: -2.6, fac: { establishment: -14, agency: -10 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "jobs", text: "护住口径：强调铅来自旧管，先保住工厂",
        note: "赌镇上人更怕失业而不是怕水。风险：家长会把这句话贴到你门上。",
        base: 0.45, mods: [{ src: "fac", key: "commercial", w: 0.4 }, { src: "fac", key: "establishment", w: 0.25 }],
        outcomes: {
          crit: { body: "厂子没关门，企业主联名感谢你，党里的钱袋子第一次把你写进名单。", effects: { rep: 1.0, fun: 0.6, fac: { commercial: 12, establishment: 8, base: -10 } } },
          ok: { body: "工作保住了，街区的怒气转了个方向——朝你来。", effects: { rep: 0.3, fac: { commercial: 7, establishment: 4, base: -6 } } },
          meh: { body: "你说了企业想听的话，也仅此而已。", effects: { rep: -0.2, fac: { commercial: 2 } } },
          fail: { body: "一位母亲带着化验单闯进你的集会，那张照片比任何社论都有力。", effects: { rep: -1.7, fac: { base: -12, press: -8 } } },
          critfail: { body: "后来证实你早看过内部报告。「他知道」三个字跟你进下一场选举。", effects: { rep: -2.5, fac: { base: -16, press: -10 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "audit", text: "花钱外请团队做管网普查与换管方案",
        note: "把事办成是最稳的答案。风险：慢，而且账全在你名下。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "fac", key: "establishment", w: 0.3 }],
        cost: { fun: 0.8 },
        outcomes: {
          crit: { body: "普查报告成了州里唯一能用的技术文件，监管方与建制都要你来解释它。你成了「懂水的那个」。", effects: { rep: 1.3, fun: 0.7, fac: { establishment: 10, commercial: 6, agency: 4 }, attr: { INT: 2 } } },
          ok: { body: "报告排上了议程，钱换来了程序位置。", effects: { rep: 0.4, fac: { establishment: 6, commercial: 3 } } },
          meh: { body: "报告躺在抽屉里，水还是褐的。", effects: { rep: 0, fac: { commercial: 2 } } },
          fail: { body: "外州公司拿了钱干得慢，镇上一句「他做买卖」传开。", effects: { rep: -1.4, fun: -0.6, fac: { press: -6 } } },
          critfail: { body: "合同被扒出与你有关联，水没换，人先换了——你成了被换的那个。", effects: { rep: -2.2, fun: -1.0, fac: { press: -9, establishment: -5 }, flags: ["scandal_2"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2016-06 · 奥兰多夜店枪击 —— 一夜死难，三方同时来认领
   * ==================================================================== */
  {
    id: "ln16_orlando", photo: "era-2016.jpg", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2016, maxYear: 2016, scoped: true, tierRaw: true, tierMin: 1, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "social", "internet"], month: 6,
    title: "夜俱乐部发生大规模枪击，哀悼与拥枪集会同时上门",
    body: "城里的夜店在一夜之间成了全国守夜的地方，那家把很多人当家人的铺子再没开门。同一周，州府的拥枪队伍也如期上路。\n" +
      "反恐、仇恨、枪的口径、社群的安危——四道题在同一个星期问你：你打算怎么说。",
    brief: {
      lede: "一夜的死，被三方同时拿去当自己的论据。",
      known: [
        "动机与极端关联仍在查，口径未定。",
        "本党要你谈仇恨，另一批人要你谈安全。",
        "本地夜店与社区组织在等你的电话。"
      ],
      rumor: [
        "有人说对手早备好稿子，等你踩雷。",
        "有人说州里要借这周通过扩权法案。"
      ],
      unknown: [
        "这场表态会写进秋天的动员广告。",
        "哪一根神经才是本区真正的痛处。"
      ],
      terms: [{ k: "半旗", v: "为重大死难致哀的官方礼遇。" }]
    },
    choices: [
      {
        id: "aftercare", text: "只办后事与援助，不上全国辩论台",
        base: 0.63, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你把灵车、翻译、赔偿与保安一桩桩办完，社区里有人说：那种时候他没去演。", effects: { rep: 0.85, fac: { base: 5, church: 4 } } },
          ok: { body: "你安静地办了实事，没抢到镜头，也没说错话。", effects: { rep: 0.35, fac: { base: 2 } } },
          meh: { body: "你在场，做了该做的，全国那台戏里没你的台词。", effects: { rep: 0.05 } },
          fail: { body: "有人问：难道他不觉得该说点什么？沉默成了话。", effects: { rep: -0.6, fac: { base: -3 } } },
          critfail: { body: "你的低调被人剪成「他那天哪儿也没去」的画面。", effects: { rep: -1.2, fac: { press: -5 } } }
        }
      },
      {
        id: "security", text: "把议题定为恐袭，喊更强硬的安保与审查",
        note: "赌恐惧比悲伤更好卖。风险：社群觉得你在利用死者。",
        base: 0.49, mods: [{ src: "fac", key: "military", w: 0.35 }, { src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你把安全语言讲成了本地共识，鹰派与军界把你当会办事的人，扩权法案顺路通过。", effects: { rep: 1.4, fac: { military: 10, establishment: 6, base: -8 } } },
          ok: { body: "你站了强硬一边，掌声来自外面，嘘声来自家里。", effects: { rep: 0.6, fac: { military: 6, establishment: 3, base: -5 } } },
          meh: { body: "你喊了口号，可那周没人想要新法案。", effects: { rep: 0, fac: { military: 2 } } },
          fail: { body: "被点名社区的商家联合发信：请他别再拿我们当例子。", effects: { rep: -1.5, fac: { base: -10, church: -6 } } },
          critfail: { body: "你的名字与「借死者立法」印在同一张传单上，发到每一家门口。", effects: { rep: -2.4, fac: { base: -14, church: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "access", text: "直言这是枪支可及性问题，推动背景审查",
        note: "赌死难能压过选票。风险：拥枪县把你钉上广告牌。",
        base: 0.45, mods: [{ src: "fac", key: "base", w: 0.35 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你在追悼周讲出该讲的那句，年轻选民与新登记的户数一起涨；党机器却开始另找人说话。", effects: { rep: 1.5, voters: { warm: 400 }, fac: { base: 12, establishment: -6 } } },
          ok: { body: "你说了控枪，城里鼓掌，乡下摇头。", effects: { rep: 0.7, voters: { warm: 150 }, fac: { base: 7, establishment: -4 } } },
          meh: { body: "你提了审查，可它已被更响的声音盖过去。", effects: { rep: 0.1 } },
          fail: { body: "拥枪的县把你的名字和「要收我们的枪」拼在一起，集会直接开到你门口。", effects: { rep: -1.8, fac: { base: -12, military: -8 } } },
          critfail: { body: "你的表态成了对手筹款的头版广告，本党出钱买下半个州的广播时段骂你。", effects: { rep: -2.6, fac: { military: -12, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "vigil", text: "出钱办守夜、选民登记与安全护送",
        note: "钱能把悲伤变成组织。风险：有人说你在办自己的庆典。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "fac", key: "base", w: 0.25 }],
        cost: { fun: 0.6 }, stake: { fun: true },
        outcomes: {
          crit: { body: "守夜井井有条，登记桌排到街口，几百个新名字进了名册——都记得是谁办的这一夜。", effects: { rep: 1.6, voters: { warm: 500, diehard: 120 }, fac: { base: 10, press: 5, church: 4 } } },
          ok: { body: "人多、秩序好、表格也没白印。你花了一笔，换来一支小队伍。", effects: { rep: 0.7, voters: { warm: 180 }, fac: { base: 5 } } },
          meh: { body: "会办了，队伍没成形，钱像水一样流过去。", effects: { rep: 0.1, fun: -0.1 } },
          fail: { body: "有人算你的账：守夜的开销最后进了你自己的竞选。", effects: { rep: -1.5, fun: -0.7, fac: { press: -5 } } },
          critfail: { body: "死难者家属联名拒绝你的钱，报纸的标题是「他办了自己的庆典」。", effects: { rep: -2.3, fun: -1.1, fac: { press: -7, base: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2017-05 · 联邦调查局局长被解职 —— 一个位置被清空，人人问你该谁坐
   * ==================================================================== */
  {
    id: "ln17_comey", photo: "era-2017.jpg", grade: "major", category: "scandal",
    valence: "risk", dyn: true,
    minYear: 2017, maxYear: 2017, scoped: true, tierRaw: true, tierMin: 2, tierMax: 6, weight: 13, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 5,
    title: "联邦调查局局长被突然解职，旧调查成了街头议题",
    body: "一封信、不到半天，局长在海外出差时被免了职。原本压在底下的那桩对外调查，一夜之间变成广场上的口号与电视台的辩论。\n" +
      "你的党部要你别添火，你的基层要你别闭嘴。镜头在等你选一个词：交接、干预，还是清洗。",
    brief: {
      lede: "一个位置被清空，所有人来问你该由谁坐着。",
      known: [
        "免职理由前后不一致，文件尚未公布。",
        "议会的委员会已在酝酿传召现任官员。",
        "两党基层都盯着你今晚用哪个词。"
      ],
      rumor: [
        "有人说换人是为了让调查自然降温。",
        "有人说调查早有结论，只是没写下来。"
      ],
      unknown: [
        "这个窟窿会不会长成一个独立调查。",
        "你的一句话将成为传票或背书。"
      ],
      terms: [{ k: "特别顾问", v: "独立于司法部、专办一案的检察官。" }]
    },
    choices: [
      {
        id: "paper", text: "不谈人事，只要求公开文件与预算",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你避开全部口水，只把程序问题问得极细。委员会幕僚开始主动把材料寄给你。", effects: { rep: 0.9, attr: { INT: 1 }, fac: { establishment: 4, press: 3 } } },
          ok: { body: "你讲文件、讲预算、讲流程。不得罪人，也不上头条。", effects: { rep: 0.3 } },
          meh: { body: "你的技术性提问像投进深井的石子。", effects: { rep: 0.05 } },
          fail: { body: "两头都嫌你绕开要害：这人今天不敢说人话。", effects: { rep: -0.5, fac: { base: -3 } } },
          critfail: { body: "你的「只谈程序」被当成替谁挡了一下，两边的信任同时降了一格。", effects: { rep: -1.0, fac: { press: -4 } } }
        }
      },
      {
        id: "counsel", text: "公开要求独立调查，与建制保持距离",
        note: "赌程序正义比党的忠诚更值钱。风险：党内资源绕着你走。",
        base: 0.47, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你是同级别里第一个讲「独立」的人。集会喊你的名字，律师与评论圈把你当自己人；党里的门开始变窄。", effects: { rep: 1.7, attr: { INTG: 2 }, fac: { base: 12, press: 8, establishment: -10 } } },
          ok: { body: "你喊了独立调查，舆论买账，党部把你标成不可靠的人。", effects: { rep: 0.7, fac: { base: 6, press: 4, establishment: -5 } } },
          meh: { body: "你说了这句话，全国已有二十个人说过。", effects: { rep: 0 } },
          fail: { body: "风向变了：你的要求被剪成「他先想动摇调查」。", effects: { rep: -1.8, fac: { establishment: -12, base: -4 } } },
          critfail: { body: "你成了本党名单上的第一个代价：募款晚宴、党内职务、地方背书一并收回。", effects: { rep: -2.7, fac: { establishment: -16, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "loyal", text: "替这个决定说好：早该换人",
        note: "赌掌权者记得谁在最难的时候站台。风险：媒体拿你当样本。",
        base: 0.44, mods: [{ src: "fac", key: "establishment", w: 0.35 }, { src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你在最吵的一天替白宫说了完整的一段，那里的内线开始主动向你透消息，党内的募款名单也把你挪到第一行。", effects: { rep: 1.2, fun: 0.8, lev: 1, fac: { establishment: 14, agency: -6, base: -6 } } },
          ok: { body: "你站了队，上面记你一功：党内的小额捐款当天涌进来，老主顾却开始把支票转给别人。", effects: { rep: 0.4, fun: 0.4, fac: { establishment: 8, base: -5 } } },
          meh: { body: "你替人说了话，可说这话的人太多，不值钱。", effects: { rep: -0.1, fac: { press: -2 } } },
          fail: { body: "调查反过来证明你的口径站不住，报上把你写成「替拆台找理由的人」。", effects: { rep: -1.6, fac: { press: -8, agency: -6 } } },
          critfail: { body: "你站台那天的每句话都被引用成妨碍调查的注脚，执法界把你划进不可信名单。", effects: { rep: -2.5, fac: { press: -10, agency: -8, establishment: -4 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "callround", text: "动用人脉摸清调查边界，先给自己留一手",
        note: "人情换的是位置，不是清白。风险：欠下的账要还。",
        base: 0.5, mods: [{ src: "fac", key: "agency", w: 0.3 }, { src: "attr", key: "CUN", w: 0.4 }],
        cost: { fav: 2 }, stake: { fav: true },
        outcomes: {
          crit: { body: "你从执法界的老关系里摸到了一条清楚的界线，也知道哪些文件将来会落在谁桌上。这份先手，值一整届。", effects: { rep: 1.0, lev: 1, attr: { INT: 2 }, fac: { agency: 8 } } },
          ok: { body: "你知道了别人还不知道的一半。不多，但足够你不踩线。", effects: { rep: 0.5, fac: { agency: 4 } } },
          meh: { body: "人情花了，回你的是几句不痛不痒的官话。", effects: { rep: 0 } },
          fail: { body: "你打听的事被人记下：他在替谁问话？两边都开始防你。", effects: { rep: -1.4, fac: { agency: -6, press: -4 } } },
          critfail: { body: "你的一次「随便问问」被写成试图接触办案人员，传票在路上。", effects: { rep: -2.2, fac: { press: -8, agency: -6 }, flags: ["scandal_1", "investigation_open"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2017-08 · 夏洛茨维尔 —— 一句措辞的宽窄，比一支警察队伍更要紧
   * ==================================================================== */
  {
    id: "ln17_charlottesville", photo: "era-2017.jpg", grade: "major", category: "civil",
    valence: "bane", dyn: true,
    minYear: 2017, maxYear: 2017, scoped: true, tierRaw: true, tierMin: 1, tierMax: 6, weight: 13, unique: true,
    medium: ["tv", "cable", "social", "internet"], month: 8,
    title: "白人至上者持火炬夜行，州府一夜冲突后措辞不改",
    body: "一场「统一派」集会把火炬与呐喊带进大学城的夜晚，次日有人开车冲进人群。全国等一句定性，等来的是「两边都有错」。\n" +
      "你的捐款人催你谈暴力的来源，你的党部催你别谈；本地的会堂与教堂在同一天给你写信。",
    brief: {
      lede: "一句措辞的宽窄，此刻比一支警察队伍还要紧。",
      known: [
        "集会要许可，镇上的治安归你协调。",
        "全国口径已定，地方只能跟或先跑。",
        "两家金主同时问你要不要上电视。"
      ],
      rumor: [
        "有人说对手备好了旧照片，等你失态。",
        "有人说州里已在考虑取消下次许可。"
      ],
      unknown: [
        "这句话会写进明年秋天的选票。",
        "哪一方会因你的措辞捐款改道。"
      ],
      terms: [{ k: "火炬夜行", v: "白人至上组织的游行表演形式。" }]
    },
    choices: [
      {
        id: "protect", text: "只谈治安与许可：护住镇子，不上全国电视",
        base: 0.63, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "两边的队伍都被你规在两条街外，一天没流血。事后连对手也承认：那几天他没失职。", effects: { rep: 0.85, fac: { establishment: 4, base: 3 } } },
          ok: { body: "你把许可、路线与警力安排妥当，没讲一句立场。", effects: { rep: 0.3 } },
          meh: { body: "你忙了整整一周，全国那台戏与你无关。", effects: { rep: 0.05 } },
          fail: { body: "有人在广场上当众问：你昨晚为什么不敢说他们在喊什么。", effects: { rep: -0.5, fac: { press: -3 } } },
          critfail: { body: "你把「维持秩序」讲成「两边都有权利」，两家社群同时与你绝交。", effects: { rep: -1.0, fac: { base: -4, press: -4 } } }
        }
      },
      {
        id: "name", text: "点名白人至上主义，公开批评全国口径",
        note: "赌良知能换来跨党的声望。风险：党机器把你当内奸。",
        base: 0.46, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你的定性被全国引用，企业组织与教会一起给你写信。党内有人开始问：还留他做啥。", effects: { rep: 1.8, fac: { base: 12, press: 8, church: 5, establishment: -10 } } },
          ok: { body: "你说了那句该说的话，声望越过本党边界，捐款电话却少了几通。", effects: { rep: 0.7, fac: { base: 6, press: 4, establishment: -5 } } },
          meh: { body: "你跟着讲了，讲得比许多人晚一天。", effects: { rep: 0 } },
          fail: { body: "本党募款信直接拿你当反面样本，「他不为我们说话」。", effects: { rep: -1.8, fac: { establishment: -12, base: -5 } } },
          critfail: { body: "你被写进一份清洗名单：地方党职、初选背书、晚宴座位一并撤下。", effects: { rep: -2.8, fac: { establishment: -16, base: -6, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "both", text: "跟着「两边都有错」走，先稳住自己那派",
        note: "赌本党不爱听定性。风险：全国把你当冷血的样板。",
        base: 0.44, mods: [{ src: "fac", key: "establishment", w: 0.35 }, { src: "attr", key: "CUN", w: 0.3 }],
        outcomes: {
          crit: { body: "你的一句「都有责任」被本党电台循环播放，募款邮件把你的名字配在捐款按钮上；上层把你当成关键时刻靠得住的人。", effects: { rep: 1.2, fun: 0.9, fac: { establishment: 14, commercial: 6, base: -10 }, flags: ["party_first"] } },
          ok: { body: "你守住了自己那一派，党内的钱先进了你的账户；外面那些眼神你挡不住。", effects: { rep: 0.4, fun: 0.4, fac: { establishment: 8, base: -7 } } },
          meh: { body: "你重复了一句安全的话，无人称赞也无人记得。", effects: { rep: -0.1 } },
          fail: { body: "本地受害者家庭在记者面前问：他是不是觉得被车撞的人也有错。", effects: { rep: -1.7, fac: { base: -12, press: -8 } } },
          critfail: { body: "你那句话被写进对手的募款广告，本地的少数族裔组织从此不接你电话。", effects: { rep: -2.6, fac: { base: -16, press: -10, church: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "townhall", text: "自己出钱办跨族群镇厅会议，把两边按上桌",
        note: "花钱买一次对话，也买一个不站队的位子。风险：两头骂你作秀。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "fac", key: "church", w: 0.25 }],
        cost: { fun: 0.7 },
        outcomes: {
          crit: { body: "一屋子人吵了三小时却没摔门，第二天的报道标题第一次不是火炬。你成了本地「能把人请进屋」的那个人。", effects: { rep: 1.6, voters: { warm: 300 }, fac: { church: 10, base: 8, press: 5, commercial: 4 } } },
          ok: { body: "会开了，人来了，火没灭但没再烧起来。", effects: { rep: 0.7, fac: { church: 5, press: 3 } } },
          meh: { body: "钱花了，来的人都是本来就认同你的。", effects: { rep: 0.1 } },
          fail: { body: "两边都退席，报上写「他的圆桌只坐了自己人」。", effects: { rep: -1.5, fun: -0.6, fac: { press: -5 } } },
          critfail: { body: "你的会议被批成「拿公共情绪办私人庆典」，两家教堂同日发信切割。", effects: { rep: -2.4, fun: -1.0, fac: { press: -8, base: -5 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2017-09 · 哈维 / 玛丽亚飓风季 —— 风停了，决定生死的是签字与调度
   * ==================================================================== */
  {
    id: "ln17_harvey", photo: "era-2017.jpg", grade: "mid", category: "crisis",
    valence: "bane", dyn: true,
    minYear: 2017, maxYear: 2017, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 12, unique: true,
    medium: ["tv", "cable", "radio", "social"], month: 9,
    title: "两场飓风前后压境，联邦与地方的救灾链条一起断裂",
    body: "一场雨下了一整周，一座城的水位过了屋顶；两周后另一场风把海岛刮回柴油发电机的时代。\n" +
      "救援电话排到几百人，安置点缺床，物资在机场压着不放。上面说程序在走，灾民问你昨天去了哪里。",
    brief: {
      lede: "风停了，真正决定生死的是调度、签字与镜头。",
      known: [
        "物资已到，分配与放行卡在上级程序。",
        "警卫队能出动车，但要地方请求。",
        "你选区的收容点已超员，教堂在收人。"
      ],
      rumor: [
        "有人说重建合同已批给外州公司。",
        "有人说上面的口径是别让坏消息上电视。"
      ],
      unknown: [
        "重建的钱会在两年后被选民记起。",
        "谁先喊救灾失灵，谁定这一局的是非。"
      ],
      terms: [{ k: "重大灾害宣告", v: "州申请、联邦核准，才开资金与调度。" }]
    },
    choices: [
      {
        id: "shelter", text: "开放本地房舍当收容点，不喊话也不甩锅",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "学校、教堂与商会仓库一夜之间全开门，灾民记住的是床位不是口号。", effects: { rep: 0.9, fac: { base: 5, church: 4 } } },
          ok: { body: "你开了门、铺了床，没上电视，也没出错。", effects: { rep: 0.3, fac: { base: 2 } } },
          meh: { body: "你做了该做的事，全国的镜头里没有你。", effects: { rep: 0.05 } },
          fail: { body: "有人说他只顾自己的收容点，从没问别人缺什么。", effects: { rep: -0.6, fac: { base: -3 } } },
          critfail: { body: "你的收容点被拍到缺床缺药，照片配文「他开了门，然后走了」。", effects: { rep: -1.1, fac: { press: -4, church: -3 } } }
        }
      },
      {
        id: "demand", text: "公开催上级宣告灾害，点名救灾失灵",
        note: "赌镜头爱一个本地喊话的人。风险：钱与程序都可能绕开你。",
        base: 0.46, mods: [{ src: "attr", key: "CUN", w: 0.35 }, { src: "fac", key: "press", w: 0.3 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你在停机坪上那段话全国重播，三天后宣告下来了。上面记住了是谁逼的，本地记住了是谁办的。", effects: { rep: 1.7, fun: 0.6, fac: { press: 10, base: 8, establishment: -10 } } },
          ok: { body: "你把话挑明，钱开始流进来；上级从此把你列进要防的人。", effects: { rep: 0.7, fac: { press: 5, base: 4, establishment: -5 } } },
          meh: { body: "你喊了，宣告照旧慢，谁都没算你的账。", effects: { rep: 0 } },
          fail: { body: "你的批评被回敬成「他连自己的排水都没管好」，上面顺手卡了你的项目。", effects: { rep: -1.7, fac: { establishment: -12, base: -3 } } },
          critfail: { body: "你成了不听话的那个：重建分配名单上，你的名字被划到最下面。", effects: { rep: -2.6, fun: -0.8, fac: { establishment: -16, press: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "deploy", text: "不吵：拿人情换警卫队与邻州的设备",
        note: "把关系变现是最快的救援。风险：人情见底，事也办砸。",
        base: 0.52, mods: [{ src: "fac", key: "military", w: 0.35 }, { src: "attr", key: "INT", w: 0.3 }],
        cost: { fav: 2 },
        outcomes: {
          crit: { body: "几个电话换来油料、舟艇与两州支援，桥在第三天重新通车。军界与建制都说：这人平时真的在处关系。", effects: { rep: 1.4, fun: 0.8, fac: { military: 12, establishment: 5, base: 3 } } },
          ok: { body: "设备到了，人活了。没人知道是谁打的电话。", effects: { rep: 0.6, fac: { military: 6, establishment: 3 } } },
          meh: { body: "你打了电话，对面也在等别人的电话。", effects: { rep: 0 } },
          fail: { body: "你欠了人情却调不来车，被问：平时结交原来是白吃饭。", effects: { rep: -1.4, fac: { military: -6, establishment: -4 } } },
          critfail: { body: "支援没到，灾民堵在县政府门口；你的名字与「只会打电话」一起上了报。", effects: { rep: -2.2, fun: -0.5, fac: { military: -9, press: -6, establishment: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "contracts", text: "把重建合同分给本地关系户，先稳自己阵营",
        note: "赌灾后的钱不会被细看。风险：查账的人从不看你的初衷。",
        base: 0.45, mods: [{ src: "fac", key: "commercial", w: 0.35 }, { src: "attr", key: "CUN", w: 0.4 }],
        stake: { fun: true },
        outcomes: {
          crit: { body: "钱流进本地口袋，机器全速替你运转；你第一次体会到灾后重建是一种权力。", effects: { rep: 1.1, fun: 1.4, fac: { commercial: 12, establishment: 5 } } },
          ok: { body: "名单分完，阵营稳了，账也留下了。", effects: { rep: 0.2, fun: 0.7, fac: { commercial: 6 } } },
          meh: { body: "合同给了人，人情却欠得比想象大。", effects: { rep: -0.2, fun: 0.2 } },
          fail: { body: "有记者把合同价与临时报价并排一放，标题只有两个字：暴利。", effects: { rep: -1.6, fun: -0.5, fac: { press: -8 } } },
          critfail: { body: "特别小组进驻，你的账户与电话记录一份不少。这一次不是训诫了事。", effects: { rep: -2.6, fun: -1.0, fac: { press: -12, establishment: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2018-02 · 帕克兰枪击与学生游行 —— 议题设置权落到没投过票的人手上
   * ==================================================================== */
  {
    id: "ln18_parkland", photo: "era-2018.jpg", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2018, maxYear: 2018, scoped: true, tierRaw: true, tierMin: 1, tierMax: 6, weight: 12, unique: true,
    medium: ["tv", "cable", "social", "internet"], month: 2,
    title: "校园枪击后学生抬标语进议会，三月全国上街",
    body: "一所在职员工与警长互相推责的中学，一夜之间成了全国少年游行的起点；三月那几天，几十座城市同时停课。\n" +
      "立法窗口只剩几周：拥枪的县、要退出的捐款人、你手机上那条要你「做点什么」的视频，同时在催你。",
    brief: {
      lede: "一群没投过票的年轻人，突然成了议题设置者。",
      known: [
        "州议会会期只剩六周，票还没算过。",
        "你区里拥枪家庭与家长的怒气各半。",
        "学生组织者已约好见你的时间。"
      ],
      rumor: [
        "有人说对手在给学生发交通与标语。",
        "有人说党部已内定不做任何动作。"
      ],
      unknown: [
        "这批新登记的选民会站哪边。",
        "你今天开的会，明年是广告还是背书。"
      ],
      terms: [{ k: "升龄售购", v: "把购枪年龄从十八提到二十一。" }]
    },
    choices: [
      {
        id: "schoolfirst", text: "不碰枪：只推校园心理卫生与警报演练",
        base: 0.62, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "预算排得极细，家长与校董都觉得你至少办了事；两边也没抓着你把柄。", effects: { rep: 0.9, fac: { establishment: 4, church: 3 } } },
          ok: { body: "你躲开意识形态，做了技术活。安全，也算有用。", effects: { rep: 0.3 } },
          meh: { body: "你的演练方案被当成一份表格，谁都没细看。", effects: { rep: 0.05 } },
          fail: { body: "学生当众问：为什么不谈枪？你说「先谈能谈的」，掌声没响。", effects: { rep: -0.5, fac: { base: -3 } } },
          critfail: { body: "你的绕行被剪成「他在躲开问题」，镜头里你一路小跑。", effects: { rep: -1.0, fac: { press: -4 } } }
        }
      },
      {
        id: "hear", text: "开一场公开听证，让学生当面问你",
        note: "赌你能在镜头前被审住而不塌。风险：一次失态可以播一年。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "press", w: 0.25 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你被一个十六岁的孩子问得答不上来，却老实说了「我不知道，但我可以去做」。那段视频比任何广告都管用。", effects: { rep: 1.6, voters: { warm: 400 }, fac: { press: 10, base: 6, establishment: -5 } } },
          ok: { body: "你扛住了整场听证，新选民记你一份，老选民觉得你太软。", effects: { rep: 0.6, voters: { warm: 150 }, fac: { press: 5, base: 3 } } },
          meh: { body: "会开了，问题问了，什么都没留下。", effects: { rep: 0 } },
          fail: { body: "你一句「我们也在哀悼」被反复回放，网上给你配上了死者的照片。", effects: { rep: -1.6, fac: { press: -8, base: -4 } } },
          critfail: { body: "你在听证上被问崩，失态的那一分钟成了明年对手的开场广告。", effects: { rep: -2.5, fac: { press: -10, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "backbill", text: "背书背景审查与升龄售购，冲一次本党议程",
        note: "赌全国气候能压过本区清单。风险：拥枪县把你换成靶子。",
        base: 0.45, mods: [{ src: "attr", key: "INTG", w: 0.35 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "法案在你这一票上过关，全国组织把你列进「敢做的人」。你区里那家枪店门口开始有人替你拉横幅。", effects: { rep: 1.7, voters: { warm: 250 }, fac: { base: 12, establishment: -8 }, flags: ["gun_reform"] } },
          ok: { body: "你站了改革一边，年轻的捐款涌进来，党内的老金主开始问你下一次去哪。", effects: { rep: 0.7, fac: { base: 6, establishment: -5 } } },
          meh: { body: "你支持了，可党团已准备好把你的名字藏在中间。", effects: { rep: 0 } },
          fail: { body: "法案死在委员会，拥枪一方把你的话做成广播稿，整周轮播。", effects: { rep: -1.8, fac: { establishment: -10, base: -8 } } },
          critfail: { body: "你被党内清洗程序盯上：初选对手、外部资金、一份「他反对第二修正案」的统一材料。", effects: { rep: -2.8, fac: { establishment: -14, base: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "recruit", text: "出钱建队伍，把这批新面孔签进自己帐下",
        note: "把运动变组织，也把自己变成组织的主人。风险：花钱买一副算盘。",
        base: 0.47, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "commercial", w: 0.25 }],
        cost: { fun: 0.8 }, stake: { fun: true },
        outcomes: {
          crit: { body: "登记表、电话志愿者与两个年轻候选人全挂在你机器上。两年后他们提到入行那一天，说的都是你。", effects: { rep: 1.4, fun: 1.0, fac: { commercial: 12, establishment: 8, base: 5 } } },
          ok: { body: "你买到了一支小队伍和一段好故事，账面也说得过去。", effects: { rep: 0.5, fac: { commercial: 6, establishment: 4 } } },
          meh: { body: "钱下去了，年轻人道了谢，然后继续走自己的路。", effects: { rep: -0.1 } },
          fail: { body: "被指「把学生的怒气拿去做自己的竞选」，两个组织者公开与你切割。", effects: { rep: -1.5, fun: -0.7, fac: { base: -6, press: -4 } } },
          critfail: { body: "捐款来源被扒出与军火供应链有关，你从操盘手变成被告。", effects: { rep: -2.3, fun: -1.1, fac: { press: -10, establishment: -5 }, flags: ["scandal_2", "investigation_open"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2018-11 · 中期选举「粉色浪潮」 —— 一张选票同时改写两党的面孔
   * ==================================================================== */
  {
    id: "ln18_midterm", photo: "era-2018.jpg", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2018, maxYear: 2018, scoped: true, tierRaw: true, tierMin: 2, tierMax: 6, weight: 12, unique: true,
    medium: ["tv", "cable", "internet", "social", "shortvideo"], month: 11,
    title: "中期选举：大批女性参政，「粉色浪潮」重画本党名单",
    body: "今年报名参选的人数创下几十年纪录，其中相当一部分是第一次参政的教师、护士与少数族裔女性。一张选票同时改写着两党的面孔。\n" +
      "党部要你替新面孔站台，老同僚要你守住位置；捐款人只想知道：你的钱和时间花在哪一边。",
    brief: {
      lede: "一场不属于你的浪潮，正在改写你所在党的名单。",
      known: [
        "本党地方名单一夜多出十几张新面孔。",
        "动员机器按人分配，先表态的先挑。",
        "你的位子安全，但党内位次在重排。"
      ],
      rumor: [
        "有人说上面要把几个老资格换成新人。",
        "有人说这股风撑不过一轮初选。"
      ],
      unknown: [
        "这两年的面孔会定你下届的位次。",
        "你抬的人会不会反过来抬你。"
      ],
      terms: [{ k: "粉色浪潮", v: "以女性候选人为标志的参政浪潮。" }]
    },
    choices: [
      {
        id: "ownrace", text: "谁也不帮：守住自己的位子，只谈本地议题",
        base: 0.62, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "浪潮退去后你还在原地，两边都发现还得跟你共事。位次不靠前，但名单上有你。", effects: { rep: 0.85, fac: { base: 4, establishment: 3 } } },
          ok: { body: "你谁也没帮、谁也没得罪，安静守住自己那块地。", effects: { rep: 0.3 } },
          meh: { body: "这场选举里没你的声音，也没人黑你。", effects: { rep: 0.05 } },
          fail: { body: "两拨人都记着：关键时刻他没出力。", effects: { rep: -0.5, fac: { establishment: -3 } } },
          critfail: { body: "洗牌之后你被算成「谁的人都不是」，分席时排在末尾。", effects: { rep: -1.0, fac: { base: -4 } } }
        }
      },
      {
        id: "wave", text: "押上新面孔：替这股浪潮全国站台",
        note: "赌风还能再吹两年。风险：机器记住你当初跳得最快。",
        base: 0.48, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        stake: { fav: true },
        outcomes: {
          crit: { body: "你替最出挑的那几个新人跑完全州，胜选之夜她们在台上第一个谢你。新党的名册里，你的名字在第一页。", effects: { rep: 1.6, tier: 1, fac: { base: 12, press: 5, establishment: -6 } } },
          ok: { body: "你蹭上了这股风，新人记你的力，老人对你多了几分提防。", effects: { rep: 0.6, fac: { base: 7, press: 3 } } },
          meh: { body: "你站了台，风头却全被更年轻的脸占去。", effects: { rep: 0 } },
          fail: { body: "风没吹到本区，你替她们说过的话被老同僚逐条念回来。", effects: { rep: -1.5, fac: { establishment: -8, base: -4 } } },
          critfail: { body: "你捧的人全落选了，机器把你当成「带头拆自家台的人」。", effects: { rep: -2.4, fac: { establishment: -12, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "machine", text: "护住老机器：把钱与人情押给老牌候选人",
        note: "赌党的位次比街头的浪潮持久。风险：新势力的账记到你头上。",
        base: 0.45, mods: [{ src: "fac", key: "establishment", w: 0.4 }, { src: "attr", key: "CUN", w: 0.2 }],
        cost: { fun: 0.6 },
        outcomes: {
          crit: { body: "老资格们保住了位子，党团里给你留了一把常坐的椅子。你的招牌在机器圈里等于可靠。", effects: { rep: 1.2, fac: { establishment: 16, commercial: 6, base: -8 }, flags: ["party_loyal"] } },
          ok: { body: "你替老机器出了力，上面记得；刚冒头的那批人开始绕着你走。", effects: { rep: 0.4, fac: { establishment: 8, commercial: 3 } } },
          meh: { body: "钱花了，人也赢了，可没人把这算成你的功劳。", effects: { rep: 0 } },
          fail: { body: "老候选人在最关键一州输了，机器反咬：是他押的方向。", effects: { rep: -1.6, fun: -0.5, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "败选清算时你被端出来当「旧机器」的样本，连当初替你说话的人也别过脸。", effects: { rep: -2.5, fun: -1.0, fac: { establishment: -10, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "sponsor", text: "自出资建一支队，把新人签进自己帐下",
        note: "做浪潮的股东，而不是观众。风险：钱与人都可能自己长腿。",
        base: 0.42, mods: [{ src: "attr", key: "CUN", w: 0.45 }, { src: "fac", key: "commercial", w: 0.3 }],
        cost: { fun: 1.0 }, stake: { fun: true },
        outcomes: {
          crit: { body: "三个新人胜选，两个是替你站过台的；党的新名单上，你是能分席位的那个人。", effects: { rep: 1.8, fun: 1.0, lev: 1, fac: { commercial: 12, establishment: 8, base: 5 } } },
          ok: { body: "你买到了一条自己的线，账上也有了新伙伴。", effects: { rep: 0.5, fac: { commercial: 6, establishment: 4 } } },
          meh: { body: "钱到位，人拿了钱去投别人。", effects: { rep: -0.1 } },
          fail: { body: "你签的人转头骂你「把我们当资产」，新组织当场散伙。", effects: { rep: -1.8, fun: -0.9, fac: { base: -6, press: -4 } } },
          critfail: { body: "资金来源被扒了个干净，你从推手变成了被调查对象。", effects: { rep: -2.8, fun: -1.5, fac: { press: -10, establishment: -6 }, flags: ["scandal_2", "investigation_open"] } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * 世界线 · 2015—2018（按年键控；core.js 逐字段深合并，不动 21-worldline.js）
 *   · pressure 0—6：2015 中位动荡；2016 大选年顶格；2017 调查与灾季叠加；2018 中期。
 *   · brief 一句话写这一年的全国情绪，不罗列事件。
 *   · outlets 全部为当年确实存在的媒体（Vox 2014、Breitbart 2007、赫芬顿邮报 2005…）。
 * ==========================================================================*/
POTUS.define("worldline", {
  pressure: {
    "2015": 3,   // 教堂枪击、裁定、邦联旗、初选前哨战
    "2016": 5,   // 大选年：奥兰多、执法冲突、邮寄与民调失灵、两面反转
    "2017": 5,   // 解职与调查、夏洛茨维尔、双飓风与救灾失灵
    "2018": 4    // 校园枪击与学生游行、中期选举重画名单
  },
  brief: {
    "2015": "一年之内，法院、教堂与议会屋顶各自塌了一块共识；人们开始习惯在手机上旁听自己的国家。",
    "2016": "愤怒不再挑招牌，只挑谁肯替它吼一嗓子。所有预测表在这一年当众失灵，连报数的人也开始怀疑自己。",
    "2017": "调查、火炬与飓风在同一年排队上门，每个人都发现自己城市的救急链条比想象中更细。",
    "2018": "枪、席位与面孔同时被搬上桌：一批从没参过政的人走进投票站，也走进候选名单。"
  },
  outlets: {
    "2015": ["有线电视新闻网", "福克斯新闻", "纽约时报", "今日美国", "赫芬顿邮报", "布赖特巴特"],
    "2016": ["有线电视新闻网", "福克斯新闻", "纽约时报", "推特", "脸书", "布赖特巴特"],
    "2017": ["有线电视新闻网", "福克斯新闻", "纽约时报", "华盛顿邮报", "政客网", "赫芬顿邮报"],
    "2018": ["有线电视新闻网", "福克斯新闻", "纽约时报", "今日美国", "华盛顿邮报", "推特"]
  }
});

/* ============================================================================
 * 定点表 fixed · 2015—2018（12 个锚点，major 4 个 ≈1/3）
 *   · 九张新卡 + 三张存量卡（108-era-2016 的 soc16_election / soc17_fakenews /
 *     soc18_data 只 pin 不重写，年月按卡片自身窗口核对）。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln15_marriage", year: 2015, month: 6, grade: "major" },
  { event: "ln15_charleston", year: 2015, month: 7, grade: "mid" },
  { event: "ln16_flint", year: 2016, month: 1, grade: "mid" },
  { event: "ln16_orlando", year: 2016, month: 6, grade: "mid" },
  /* —— 存量卡：只 pin —— */
  { event: "soc16_election", year: 2016, month: 11, grade: "major" },
  { event: "ln17_comey", year: 2017, month: 5, grade: "major" },
  { event: "ln17_charlottesville", year: 2017, month: 8, grade: "major" },
  { event: "ln17_harvey", year: 2017, month: 9, grade: "mid" },
  { event: "soc17_fakenews", year: 2017, month: 12, grade: "mid" },
  { event: "ln18_parkland", year: 2018, month: 2, grade: "mid" },
  /* 剑桥分析：曝光于 2018 年 3 月（卡内窗口为泛「数据画像」交易，取曝光当月） */
  { event: "soc18_data", year: 2018, month: 3, grade: "mid" },
  { event: "ln18_midterm", year: 2018, month: 11, grade: "mid" }
]);
