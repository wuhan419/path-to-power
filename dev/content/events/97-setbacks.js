/* ============================================================================
 * CONTENT · events/97-setbacks.js
 * 【挫折包】仕途不会一帆风顺——落选、背刺、围攻、健康、家庭。
 *
 * 真实原型（写法参考）：
 *   setback_loss         —— 竞选失败原型：老布什 1964/1970 两次参议员落选后再起；
 *                            爱德华兹、罗姆尼都输过初选后转型
 *   setback_primary_upset —— 被无名新人掀翻原型：2014 埃里克·坎托（众议院多数党领袖）
 *                            初选输给无名教授戴夫·布拉特——建制派的噩梦
 *   setback_party_purge  —— 被本党抛弃原型：投票弹劾本党总统的丽兹·切尼被开除党籍
 *   setback_press_pile   —— 媒体围攻原型：加里·哈特 1987「跟踪我啊」48小时葬送竞选
 *   setback_health       —— 健康危机原型：保罗·韦利斯通、约翰·麦凯恩的脑瘤时刻
 *   setback_family       —— 家庭危机原型：竞选毁掉婚姻是华盛顿最老的故事
 *
 * 设计原则：挫折要真实但留出路——每次跌倒都埋着一条起来的路（余波幕）。
 * ==========================================================================*/

POTUS.define("event", [

  /* ------------------------------------------------------------------
   * 1. 落选之夜 —— 竞选失败的三种熬法
   * ------------------------------------------------------------------ */
  {
    id: "setback_loss", era: ["2008_CRASH"],
    tierMin: 0, tierMax: 4, weight: 13,
    grade: "major", valence: "bane", dyn: true, unique: true, category: "career",
    cond: function (G, P) { return P.electionYear(); },        // 选举年才有落选
    brief: {
      lede: "计票到 87%，你的名字后面是 47.2%。数学上已经结束了。",
      known: [
        "差四个点，「再多两周就能翻」的输法，这反而更难受。",
        "竞选账户还欠尾款：印刷厂、广告档期、你自己垫的部分。",
        "支持者还聚在宴会厅等你上台说点什么，稿子只写了赢的版本。"
      ],
      rumor: [
        "党内讨论下次让更年轻的人试试——说的就是你。",
        "有人看见你竞选经理在停车场接了别人的电话。"
      ],
      unknown: [
        "败选留下更锋利还是更谨慎，两年后见。",
        "今晚宴会厅里哪些人下次会第一个回来。"
      ]
    },
    title: "你在选举之夜落选，支持者还在等你上台讲话",
    body: "计票结束，你差四个点。宴会厅的支持者还站着，等你上台。\\n这一夜的讲话，会决定这次失败是句号还是逗号。",
    choices: [
      {
        id: "gracious", text: "体面认输：讲那篇没人写好的稿子",
        note: "败选演讲讲得好=给下次竞选铺路（林肯式）。代价：现在咽下这口气。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你讲了四分钟，没有怪任何人，把对手的胜利称作「选民的智慧」。第二天两家报纸的社论都在夸你——败选者得到的那种夸。", effects: { rep: 0.7, attr: { INTG: 2 }, voters: { diehard: 200, warm: 400 }, flags: ["setback_survivor"] } },
          ok: { body: "你体面地认了输。人群散去时，有人握着你的手说：下次还来。", effects: { rep: 0.3, voters: { diehard: 120 } } },
          meh: { body: "稿子磕磕绊绊，但意思到了。至少没人把这一段剪出来笑话你。", effects: { rep: 0.1 } },
          fail: { body: "你在台上停顿了三次，最后只说了句「谢谢大家」。尴尬比失败本身传播得更远。", effects: { rep: -0.3, fac: { press: -3 } } },
          critfail: { body: "你没能忍住，提了一句「有些票不该被投出来」。第二天这句话和你的败选绑在一起上了头条。", effects: { rep: -0.8, fac: { base: -6, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "audit", text: "先不管台面：回办公室把竞选债理清楚",
        note: "体面是给别人看的，账是给自己算的。处理得好，下次还有信用可用。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你逐笔核完，砍掉了三笔不该付的，谈拢了两笔分期。四点走出办公室时，你对下一次竞选的钱心里已经有数了。", effects: { fun: -0.4, attr: { INT: 2 }, fac: { commercial: 6 } } },
          ok: { body: "债理清了，分期排到明年。丑话说在前头，供应商反而敬你。", effects: { fun: -0.7, fac: { commercial: 3 } } },
          meh: { body: "账认了，钱还了。宴会厅那边的掌声你只听到尾巴。", effects: { fun: -0.8 } },
          fail: { body: "印刷厂当场翻脸要走法律程序。败选之夜的最后一小时，你在跟债主通话。", effects: { fun: -1, fac: { commercial: -6 } } },
          critfail: { body: "账目里被人塞了一笔说不清的开销，审计的人盯上了。雪上加霜的完美注脚。", effects: { fun: -0.8, flags: ["launder", "investigation_open"] } }
        }
      },
      {
        id: "staff_first", text: "把团队聚齐：今晚先谢谢他们",
        note: "保底选项。输赢是候选人的，跑断腿的是志愿者——他们记不记得你，决定两年后还有没有人帮你。",
        base: 0.75,
        outcomes: {
          crit: { body: "你把宴会厅变成了一场谢师宴，逐个叫出志愿者的名字。两年后你卷土重来时，第一批到岗的正是今晚这些人。", effects: { rep: 0.4, voters: { diehard: 180, warm: 300 }, contact: { fixer: 6 } } },
          ok: { body: "你和他们喝了最后一轮酒。有人哭，有人骂，没人走。", effects: { rep: 0.2, voters: { diehard: 100 } } },
          meh: { body: "寒暄了一圈，说了些「后会有期」。后不后会有期，大家心里都没底。", effects: { rep: 0.1 } },
          fail: { body: "你在后台躲了一小时。等你出来时，人已经走了大半。", effects: { rep: -0.1 } } ,
          critfail: { body: "竞选经理当众辞职，还带走了一箱文件。今晚的失败有了一副难看的面孔。", effects: { rep: -0.4, fav: -1 } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------
   * 2. 掀翻 —— 你是坎托，台下沉睡着一个无名者（T2+ 民选官员的被挑战）
   * ------------------------------------------------------------------ */
  {
    id: "setback_primary_upset", era: ["2008_CRASH"],
    tierMin: 1, tierMax: 4, weight: 9,
    grade: "major", valence: "bane", dyn: true, unique: true, category: "political",
    tracks: ["electoral"],
    brief: {
      lede: "初选登记截止前三天，一个谁都没听说过的人交了签名。",
      known: [
        "他在本地高中教书，竞选经费不到你的十分之一。",
        "他只有一个议题，而你恰好投了党内领导层——基层恨透了那票。",
        "你的民调还领先三十个点。顾问说：「不用理他。」"
      ],
      rumor: [
        "他背后是某个对你有怨气的大金主——查得到但要花钱。",
        "你的投票记录里还有两票和这议题相关，他还没挖到。"
      ],
      unknown: [
        "三十点领先在单一议题初选里有多脆弱。",
        "他其实不想赢：要的是敢挑战你的名声。"
      ]
    },
    title: "一个无名高中老师在你党的初选里挑战你",
    body: "初选对手出现了：一个高中老师，一个议题，零知名度。你的民调领先三十个点。\\n真正的题目不是能不能赢，是**怎么**赢——以及别输。",
    choices: [
      {
        id: "ignore", text: "顾问是对的：不理他，按大选节奏走",
        note: "轻敌的代价历史上写得很清楚。但认真应战=替他抬轿，两难。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "他果然没能起势——十周里媒体只给了他两篇报道。初选夜你赢了二十八个点，虚惊一场。", effects: { rep: 0.4, fac: { establishment: 5 } } },
          ok: { body: "你没接招，他也就没火起来。赢了，但赢得沉默寡言。", effects: { rep: 0.2 } },
          meh: { body: "最后两周他忽然刷了一波存在感——你赢了十二个点，比预想少了一半。党内开始有人嘀咕你「根基松了」。", effects: { rep: -0.1, fac: { establishment: -3 } } },
          fail: { body: "你输了两千票。一个高中老师，用你十年前的一张投票记录，把你送回了家。", effects: { rep: -0.7, fac: { establishment: -10, base: -6 }, voters: { warm: -800, oppose: 500 }, flags: ["scandal_1"], fall: 1 } },
          critfail: { body: "输了，而且输在了一个你以为是「安全票仓」的镇——那里的报纸在选前一周登了他的整版广告，钱来路不明。党内要你「体面退场」。", effects: { rep: -1, fac: { establishment: -14 }, fall: 1, flags: ["party_traitor"] } }
        }
      },
      {
        id: "engage", text: "亲自应战：辩论、扫街、把他当真对手打",
        note: "尊重选民的智商，也尊重对手——用力过猛会显得欺负人。",
        base: 0.45, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        cost: { ap: 2, fun: 0.8 },
        outcomes: {
          crit: { body: "你在他的学区和他同台三次，赢了每一次——但真正赢的是那些看见你「认真对待每一票」的选民。初选夜大胜。", effects: { rep: 0.9, voters: { diehard: 400, warm: 600 }, fac: { base: 8 } } },
          ok: { body: "你全力应战，赢得扎实。党内通讯把你的「危机处理」列为正面教材。", effects: { rep: 0.6, voters: { diehard: 250 }, fac: { establishment: 4 } } },
          meh: { body: "赢了，但花的钱和精力够打半场大选。顾问的「我早说过」在走廊回荡。", effects: { rep: 0.2 } },
          fail: { body: "你的应战反而给了他舞台：三场辩论，媒体终于有了报道的理由。票数被咬得很紧，你险胜。", effects: { rep: 0, voters: { warm: -200 }, fac: { establishment: -4 } } },
          critfail: { body: "辩论夜你用了「幼稚」这个词形容他。第二天，被剪碎的那句话在他选区的每一块草坪上循环。你输了——输给了自己的傲慢。", effects: { rep: -1, voters: { warm: -1000, oppose: 800 }, fall: 1 } }
        }
      },
      {
        id: "countermessage", text: "不提他一个字：只讲你给选区办成的事",
        note: "保底选项。把战场拉回自己的地面——记录、服务、出席率。不性感，但稳。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "十周里你开了二十一场镇民会，每一场只讲排水、医保和退伍军人补助。初选夜你赢了十九个点——议题被你偷走了。", effects: { rep: 0.7, voters: { diehard: 300, warm: 500 }, attr: { INTG: 1 } } },
          ok: { body: "你守住了自己的地盘。他拿着他的议题，找不到落脚点。", effects: { rep: 0.3, voters: { warm: 250 } } },
          meh: { body: "赢是赢了，但你发现镇民会上被问得最多的，还是他那一个议题。", effects: { rep: 0.1 } },
          fail: { body: "你的「办事记录」在愤怒的议题面前不堪一击。惨败。", effects: { rep: -0.8, voters: { warm: -700 }, fall: 1 } },
          critfail: { body: "你引以为傲的那件「实事」被查出受益方里有你的捐款人。他把这件事钉在了你身上。", effects: { rep: -1.25, flags: ["scandal_2"], fall: 1 } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------
   * 3. 被本党抛弃 —— 切尼时刻（投了违背党意的一票之后）
   * ------------------------------------------------------------------ */
  {
    id: "setback_party_purge", era: ["2008_CRASH"],
    tierMin: 2, tierMax: 5, weight: 9,
    grade: "major", valence: "bane", dyn: true, unique: true, category: "political",
    brief: {
      lede: "党部主席的短信只有六个字：「明早九点，办公室。」",
      known: [
        "你投了违背党领导层的那票，当时认为对，现在党内认为你错。",
        "州党部停止拨经费，你的名字从联合筹款晚宴名单上消失了。",
        "选区党主席公开说「下次初选推自己的人」。",
        "你在全国媒体成了「有骨气的人」——这名声在党内不值钱。"
      ],
      rumor: [
        "领导层已在面试你的继任者，名单上有三个名字。",
        "只要你下次表决「回来」，一切可以当没发生。"
      ],
      unknown: [
        "党能开除你的职位，开除不了你选民的认识。",
        "这次清洗是墓志铭还是立国宣言。"
      ]
    },
    title: "党要推别人取代你，明早九点约你谈话",
    body: "那张没按党意投的票有价目表了：经费停了、名单除了名、你的选区党部在找人。\\n明早九点的谈话，决定你是低头、出走、还是开战。",
    choices: [
      {
        id: "bow", text: "低头：下一次表决按党意来",
        note: "换回资源与提名的路。代价：全国媒体给你的「有骨气」人设当场破产。",
        base: 0.6, mods: [{ src: "attr", key: "CUN", w: 0.35 }],
        outcomes: {
          crit: { body: "你在九点会谈里既道了歉又保住了面子，下一次关键表决你「及时醒悟」。经费恢复了——但你在新闻里的代号变成了「识相的人」。", effects: { fac: { establishment: 14, base: -8 }, fun: 0.7 } },
          ok: { body: "你把话说软了，党把水龙头重新拧开了一点。大家心照不宣。", effects: { fac: { establishment: 9, base: -5 } } },
          meh: { body: "你低了头，他们收了礼——但谁都知道下一次你还会被要求低头。", effects: { fac: { establishment: 5, base: -3 } } },
          fail: { body: "你低头的姿态被泄露给了媒体。党拿了你的道歉，公众看了你的笑话。", effects: { rep: -0.7, fac: { establishment: 4, press: -6, base: -6 }, flags: ["party_traitor"] } },
          critfail: { body: "你交了投名状，党却还是推了别人——他们要的从来只是你当众低头这一下。", effects: { rep: -1, fac: { establishment: -6, base: -10 }, fall: 1, flags: ["party_traitor"] } }
        }
      },
      {
        id: "war", text: "开战：绕开党机器，直接找选民",
        note: "切尼路线的反面教材与正面教材是同一个人。赌你的选民认你不认党。",
        base: 0.35, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "attr", key: "CHA", w: 0.3 }],
        cost: { ap: 2 },
        outcomes: {
          crit: { body: "你把党部的九点会谈变成了直播：走出大门时对镜头说了三句话。48 小时内小额捐款破了你的纪录——党可以不给钱，但给不了也拿不走民意。", effects: { rep: 1.25, attr: { INTG: 3 }, voters: { diehard: 800, warm: 900 }, fac: { establishment: -18, base: 12 }, fun: 2 } },
          ok: { body: "你另起炉灶：自己的筹款名单、自己的志愿者。慢，但每一票都姓你的名。", effects: { rep: 0.8, voters: { diehard: 500 }, fac: { establishment: -12 } } },
          meh: { body: "战争打响了，战线却比想象的漫长。你的日程表上从此只有两件事：本职和生存。", effects: { rep: 0.3, hp: -0.6, fac: { establishment: -8 } } },
          fail: { body: "没有党的机器，雨天的初选投票率打了七折——那正是你的死穴。你输给了党推的年轻人。", effects: { rep: -0.6, voters: { warm: -900 }, fac: { establishment: -10 }, fall: 1 } },
          critfail: { body: "你成了全国新闻里「毁掉本党选情的那个人」。党开除你的手续办得又快又体面，而你的选民到最后也没弄懂你在坚持什么。", effects: { rep: -1.25, fac: { establishment: -20, base: -8 }, fall: 2, flags: ["party_traitor"] } }
        }
      },
      {
        id: "quiet_work", text: "不表态：回选区埋头做事，让记录说话",
        note: "保底选项。风暴眼里最安静的走法——党要面子，你给时间。",
        base: 0.65, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "六个月里你把选区服务做到了极致：四百件个案、两条落地的地方拨款。党部的二次提名名单上，你的名字又回到了第一位——他们需要能赢的人。", effects: { rep: 0.8, voters: { diehard: 350, warm: 600 }, fac: { establishment: 6, base: 4 } } },
          ok: { body: "你用勤勉把风波熬成了旧闻。提名保住了一半——排位第二，但还在名单上。", effects: { rep: 0.4, fac: { establishment: 3 } } },
          meh: { body: "事情还在做，位子还在悬。悬而未决本身就在消耗你。", effects: { rep: 0.1, hp: -0.3 } },
          fail: { body: "你埋头的六个月，党内换了三个人来说服你「换个选区试试」。你没有选区了。", effects: { rep: -0.4, fac: { establishment: -8 }, fall: 1 } },
          critfail: { body: "记录没能说话——因为党控制着让谁听到记录的渠道。你的沉默被解读为默认有罪。", effects: { rep: -0.9, fac: { establishment: -12, press: -5 }, fall: 1 } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------
   * 4. 媒体围攻 —— 加里·哈特时刻（48 小时定向爆破）
   * ------------------------------------------------------------------ */
  {
    id: "setback_press_pile", era: ["2008_CRASH"],
    tierMin: 1, tierMax: 5, weight: 10,
    grade: "mid", valence: "bane", dyn: true, category: "media",
    brief: {
      lede: "三家记者同时约你「聊聊」——都和同一件事有关。",
      known: [
        "一件你以为翻篇的旧事被挖出，另外两家正在跟进。",
        "从第一条稿发出到今天，不到 48 小时。",
        "下一次公开露面是后天：取消比出席更显眼。",
        "团队连夜写了三个版本的应对方案，彼此矛盾。"
      ],
      rumor: [
        "稿的时机是对手买的——稿子真，时机是定制的。",
        "还有第二篇更狠的压在编辑手里，等你的第一反应。"
      ],
      unknown: [
        "你的第一反应会成为后续所有报道的基调。",
        "「不理它」在什么年代有效什么年代致命。"
      ]
    },
    title: "三家记者同时打来",
    body: "旧事重提，48 小时，三家媒体。后天有一场躲不掉的公开露面。\\n你的第一句话，就是整个故事的标题。",
    choices: [
      {
        id: "front", text: "主动开发布会：一次说清，答完所有问题",
        note: "透明对冲时效。说清了就是「过去了」，说不清就是把弹药亲手递给编辑。",
        base: 0.4, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你讲了四十分钟，从背景到细节到教训，然后站了半小时问答。当晚的报道标题从「丑闻」变成了「坦白」。危机在你手里结束了。", effects: { rep: 1.25, attr: { INTG: 3 }, fac: { press: 10, base: 5 }, notFlags: ["affair_stain"] } },
          ok: { body: "会开了，问题答了。报道的火头压下去了一半——剩下的要靠时间。", effects: { rep: 0.4, fac: { press: 5 } } },
          meh: { body: "发布会平稳结束，但你有一处时间和记录对不上——记者们礼貌地没有追问，也礼貌地写进了稿子。", effects: { rep: -0.2 } },
          fail: { body: "你在第三个问题上失去了耐心，那三秒钟的冷脸成了所有报道的配图。", effects: { rep: -1.25, fac: { press: -8 }, flags: ["scandal_2"] } },
          critfail: { body: "你「一次说清」的版本在两小时后被一份文件逐条打脸。现在故事的主角不是旧事，是你今天撒的谎。", effects: { rep: -2.5, fac: { press: -14, base: -8 }, flags: ["scandal_3", "investigation_open"] } }
        }
      },
      {
        id: "silence", text: "冷处理：不回应，把后天的演讲讲好",
        note: "哈特的教训是挑衅记者；但单纯的沉默在纸质媒体年代有活路——赌你所在年代的媒介记忆。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.35 }],
        outcomes: {
          crit: { body: "你一声不吭，后天演讲讲的全是民生。一周后编辑部的注意力转向了别处——新闻周期替你翻了篇。", effects: { rep: 0.4, fac: { press: 2 } } },
          ok: { body: "不回应没有让事情变好，但也没有变坏。稿子写完了，收尾了。", effects: {} },
          meh: { body: "沉默被写成了「拒绝回应」。不致命，但每次搜索你的名字它都在。", effects: { rep: -0.4 } },
          fail: { body: "第二篇稿子如约而至，标题引用了你的沉默。故事从旧事升级成了「掩盖」。", effects: { rep: -1.5, fac: { press: -8 }, flags: ["scandal_2"] } },
          critfail: { body: "沉默的第三天，有人替你开了口——一个知情者的独家采访。现在故事是他们的版本了，而你的名字只是其中的一个道具。", effects: { rep: -2.25, fac: { press: -10, base: -6 }, flags: ["scandal_3"] } }
        }
      },
      {
        id: "counter_leak", text: "反击：把对手同款的旧料递给相熟的记者",
        note: "对等毁灭的威慑。手上得真有货、递得够快——否则是空枪示威。",
        base: 0.3, mods: [{ src: "attr", key: "CUN", w: 0.5 }],
        req: { lev: 1 }, cost: { lev: 1 },
        outcomes: {
          crit: { body: "你的料比他们的狠。第二天两家媒体同时收到两份故事，编辑部决定「一并处理」——最终谁也没敢单发。停火。", effects: { rep: 0.2, attr: { CUN: 4 }, fac: { press: 3 }, notFlags: ["affair_stain"] } },
          ok: { body: "对手的故事也上了版面，火力被分走一半。战场从你的独角戏变成了对轰。", effects: { rep: -0.4, attr: { CUN: 2 }, fac: { press: 2 } } },
          meh: { body: "你的料递晚了——他们的稿已经签发。你的反击成了「回应」，对方的成了「报道」。", effects: { rep: -0.8, flags: ["scandal_2"] } },
          fail: { body: "递料的行为被查到了。原故事没死，还长出了新故事：「他试图用黑料灭火」。", effects: { rep: -1.75, fac: { press: -10 }, flags: ["scandal_3", "leaker_suspect"] } },
          critfail: { body: "你的「料」经不起核查——半个真的半个假的。你用一份假料回应了一个真故事，等于当众自认。", effects: { rep: -2.75, fac: { press: -12, base: -8 }, flags: ["scandal_4", "investigation_open"], fall: 1 } }
        }
      },
      {
        id: "family_first", text: "先跟家人说实话，再决定对外怎么办",
        note: "保底选项。不管外面怎么写，家里那顿饭才是真正躲不掉的场合。",
        base: 0.7, mods: [{ src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "那顿饭吃了三个小时。第二天你面对记者时的平静不是演的——因为最难的一场已经过去了。这种平静骗不了人，也装不出来。", effects: { attr: { INTG: 3 }, rep: 0.6, hp: -0.5, notFlags: ["divorce_pending"] } },
          ok: { body: "家人知道了，也留下了。外面的风暴忽然显得没那么大。", effects: { attr: { INTG: 1 }, hp: -0.5 } },
          meh: { body: "话说了，饭桌安静得像听证会。有些账以后慢慢算。", effects: { hp: -0.8 } },
          fail: { body: "那顿饭比发布会更难。你妻子只问了一句「还有什么是我在报纸上会看到的」。", effects: { hp: -1.25, flags: ["divorce_pending"] } },
          critfail: { body: "坦白没换来理解，换来了一扇关上的门和一位已经约好律师的伴侣。你的私事成了公事。", effects: { rep: -1, hp: -2, flags: ["divorce_pending", "scandal_1"] } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------
   * 5. 健康红灯 —— 身体先于仕途投票
   * ------------------------------------------------------------------ */
  {
    id: "setback_health", era: ["2008_CRASH"],
    tierMin: 1, tierMax: 5, weight: 8,
    grade: "mid", valence: "bane", dyn: true, unique: true, category: "general",
    cond: function (G, P) { return (G.hp || 100) < 55; },
    brief: {
      lede: "体检报告上那个箭头，比任何民调都直接。",
      known: [
        "医生的措辞很职业但你听得懂：再这样身体会先替你辞职。",
        "问题在日程表本身：一周六个活动、跨州红眼、车里吃的那几顿。",
        "中期检查四个月后，没人规定你必须现在公布任何事。",
        "你最怕的不是病，是他们知道你病了之后看你的眼神。"
      ],
      rumor: [
        "华府惯例小病大养大病照常投票——反的也有。",
        "某前辈隐瞒病情任职，任上倒下，追悼会风光。"
      ],
      unknown: [
        "休息半年位子还在吗——政治没暂停键。",
        "公布得到的同情和失去的机会，哪个更多。"
      ]
    },
    title: "你的体检报告显示健康红灯，医生要你放慢节奏",
    body: "医生把话说得很轻，意思很重：这个节奏，身体撑不住。\\n四个月后的中期检查之前，你必须决定怎么对待自己。",
    choices: [
      {
        id: "rest", text: "真的休息：砍掉一半日程，交出去一部分工作",
        note: "身体是本钱的本钱。代价是曝光和存在感的半年空窗。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你交出去了三件不痛的、保住了两件要命的。半年后复诊，那个箭头回来了正常值。位子还在——因为交办的人办得没那么好，显得你更重要了。", effects: { hp: 4.5, rep: 0.4, attr: { INT: 1 } } },
          ok: { body: "你砍了日程，睡足了觉。半年的报纸上少了很多你的名字，你的身体对你心存感激。", effects: { hp: 3.5 } },
          meh: { body: "休息是休息了，但手机没停过。半休息半办公，箭头降了一半。", effects: { hp: 2 } },
          fail: { body: "你退居二线的半年，对手把你的选区啃掉了一层。回来时，欢迎你的不再是镁光灯。", effects: { hp: 2.5, rep: -1, voters: { warm: -300 } } },
          critfail: { body: "「他身体不行了」的说法在圈子里跑得比康复快。党内物色替代者的会议，开得比你的复诊还早。", effects: { hp: 2, rep: -1.5, fac: { establishment: -10 }, fall: 1 } }
        }
      },
      {
        id: "push_through", text: "照旧：把报告锁进抽屉，日程一个不减",
        note: "威尔逊路线。短期的政治安全，用身体的长期账户支付。",
        base: 0.7,
        outcomes: {
          crit: { body: "你挺过了这半年，中期检查的数字勉强及格。没人发现什么。你在车里又吃了 174 顿饭。", effects: { hp: -1.5, rep: 0.6 } },
          ok: { body: "照旧。身体在抗议，你在加班。至少表面上一切如常。", effects: { hp: -2.5 } },
          meh: { body: "你在一次活动后台眼前发黑，坐了两分钟才站起来。助手看见了，什么也没说。", effects: { hp: -3.5, flags: ["burn_seen"] } },
          fail: { body: "你在公开场合失态了一次——站着睡着了两秒。流言比诊断书先一步到了党内。", effects: { hp: -4, rep: -1, flags: ["burn_seen", "scandal_1"] } },
          critfail: { body: "身体替你做了决定：你在去活动的车上倒下了，消息占据了整个下午的新闻周期。你的健康从秘密变成了公共议题。", effects: { hp: -6.5, rep: -1.25, flags: ["burn_seen", "scandal_2"] } }
        }
      },
      {
        id: "go_public", text: "公开病情：把体检报告变成议题",
        note: "主动权换同情心。赌选民把你当人，而不是当工具。",
        base: 0.4, mods: [{ src: "attr", key: "CHA", w: 0.35 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你发了声明、开了发布会，顺手把「从政者的健康透明」提成了一个小小的公共议题。选区回信塞满了信箱。健康问题反而成了你的加分项。", effects: { hp: 2.5, rep: 1.75, attr: { INTG: 2 }, voters: { diehard: 300, warm: 500 } } },
          ok: { body: "公开了。大部分人体面地表示理解，党内松了口气——至少不用他们猜了。", effects: { hp: 2, rep: 0.8 } },
          meh: { body: "声明发了，波澜不惊。健康透明没成为议题，只是成为了档案。", effects: { hp: 1.5, rep: 0.2 } },
          fail: { body: "「他能撑完这届吗」成了金主饭桌上的标准问题。你失去的不是职位，是「未来」这个词。", effects: { hp: 1.5, rep: -0.8, fun: -2.75 } },
          critfail: { body: "公开的时机撞上了一场危机——你的「病」被做成了对手攻击政府应对不力的注脚。你成了别人故事里的形容词。", effects: { hp: 1.25, rep: -1.5, fall: 1 } }
        }
      }
    ]
  },

  /* ------------------------------------------------------------------
   * 6. 家里的账单 —— 竞选毁掉的从来不是候选人一个人
   * ------------------------------------------------------------------ */
  {
    id: "setback_family", era: ["2008_CRASH"],
    tierMin: 0, tierMax: 4, weight: 9,
    grade: "mid", valence: "bane", dyn: true, category: "romance",
    minTenure: 18,
    brief: {
      lede: "结婚纪念日那天你在三个县跑活动。这不是第一次了。",
      known: [
        "你的伴侣把家庭安排取消了七次，这次是孩子的比赛。",
        "家里开销靠另一半收入撑着——公职薪水填不平你缺席的窟隆。",
        "上次全家一起吃饭是上次连任成功那晚——那也是工作餐。",
        "没有争吵。比争吵更糟的是：「我只是想知道这样还要多久。」"
      ],
      rumor: [
        "华府婚姻的半衰期是两届任期——你们已经超过平均了。",
        "你伴侣朋友圈里有人听见过「单亲式婚姻」这个词。"
      ],
      unknown: [
        "这题只有代价：家庭一边，日程表一边。",
        "十年后孩子怎么讲这一段，那才是最终评分。"
      ]
    },
    title: "结婚纪念日那天，你为竞选错过了孩子的比赛",
    body: "孩子的比赛、结婚纪念日、三个县的日程——你只能选一个在场。\\n这道题从你宣布参选那天就在桌上，今天它到期了。",
    choices: [
      {
        id: "family", text: "推掉活动，回家",
        note: "缺一场活动的代价是具体的（某个县记仇）；缺一次比赛的代价是说不清的。",
        base: 0.7, mods: [{ src: "attr", key: "INTG", w: 0.35 }],
        cost: { ap: 1 },
        outcomes: {
          crit: { body: "你在看台上喊哑了嗓子。孩子进球后朝看台指了一下——那个手指的方向，比任何当选夜的手势都值。下周的补场活动你讲得格外有底气。", effects: { hp: 1.5, attr: { INTG: 2 }, rep: 0.2, notFlags: ["divorce_pending"], contact: { brother: 6 } } },
          ok: { body: "你回去了。比赛输了，但你在了。晚饭时没人在手机上工作。", effects: { hp: 1, notFlags: ["divorce_pending"] } },
          meh: { body: "你人到了，电话没停。孩子管你叫「接电话的那位」。", effects: { hp: 0.5 } },
          fail: { body: "你缺席的那个县办了一场没到齐人的活动，照片传到了党内。你的「家庭优先」成了别人汇报里的减分项。", effects: { rep: -0.6, fac: { establishment: -4 } } },
          critfail: { body: "你回去晚了——高速封路，比赛散场。你看台上那个空位被本地记者拍进了背景。家庭和形象，两头的亏都没吃出价值。", effects: { rep: -0.8, hp: -0.8, fac: { press: -3 } } }
        }
      },
      {
        id: "work", text: "按日程走：三个县一个不落",
        note: "敬业是敬业。家里那本账，往后翻了一页又一页。",
        base: 0.7,
        outcomes: {
          crit: { body: "三个县都宾主尽欢，地区的党报给了你半个版面。回家时孩子睡了，你在门口站了一会儿。", effects: { rep: 0.8, fac: { base: 4 }, hp: -0.5 } },
          ok: { body: "活动办完了，效率很高。家里的灯在你到家前就关了。", effects: { rep: 0.4, hp: -0.5 } },
          meh: { body: "日程走完了。伴侣没问你去哪了——不问，比问严重。", effects: { hp: -0.8, flags: ["divorce_pending"] } },
          fail: { body: "第三个县的活动临时取消了——白跑。你错过比赛换来的是一段空等。双输。", effects: { rep: -0.4, hp: -1, flags: ["divorce_pending"] } },
          critfail: { body: "你缺席比赛的照片被对手做成了一版负面广告：「他连自己孩子的比赛都不去」。家庭事务成了选战弹药——这是双重的背叛感。", effects: { rep: -1.5, fac: { base: -6, press: -4 }, voters: { warm: -400 }, flags: ["divorce_pending", "scandal_1"] } }
        }
      },
      {
        id: "talk", text: "把孩子和伴侣请到活动里来：一家人同台",
        note: "保底选项。把两个世界拼在一起——拼得拢是全家福，拼不拢两边都尴尬。",
        base: 0.45, mods: [{ src: "attr", key: "CHA", w: 0.4 }],
        outcomes: {
          crit: { body: "你的孩子在台上抢了话筒说「我爸妈老是加班」。全场大笑，报纸的标题温暖了整个周末——比任何通稿都好使。", effects: { rep: 1.5, voters: { warm: 500, diehard: 200 }, hp: 1, notFlags: ["divorce_pending"] } },
          ok: { body: "全家同台，笑得体面。选民喜欢这种画面，你也确实松了口气。", effects: { rep: 0.8, voters: { warm: 250 }, hp: 0.5 } },
          meh: { body: "同台是同台了，回家的车上没人说话。画面是真的，气氛也是真的。", effects: { rep: 0.4 } },
          fail: { body: "伴侣在台上的微笑只维持了拍照的时长。回去的路上你们吵了从政以来最凶的一次。", effects: { rep: 0.2, flags: ["divorce_pending"] } },
          critfail: { body: "活动被对手的人拍到孩子无聊到睡着的照片，配文是「又一个被政治牺牲的家庭」。你把家人带进了战场——这是你后悔得最久的一个决定。", effects: { rep: -1.25, fac: { press: -4 }, flags: ["divorce_pending", "scandal_1"] } }
        }
      }
    ]
  }

]);
