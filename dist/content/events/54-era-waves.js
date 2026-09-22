/* ============================================================================
 * CONTENT · events/54-era-waves.js
 * 时代浪潮：真实历史事件按「主角当时的位置」分化成不同版本。
 *
 * 写法核心（区别于普通事件）：
 *   同一个历史时刻，T0 的人在征兵队列里，T3 的人在投票席上 —— 所以同一个
 *   历史节点写成两条独立事件，各带各的 tierMin/tierMax，引擎自动按层级分流。
 *
 * 「投入浪潮」：没有政府背景的人（低 tier / ngo / outsider）可以选择站进
 *   浪潮里 —— 用时间换政治资本（rep/基层/工会好感），拿到 wave_* 标记，
 *   后续事件认这些标记给更高的起点（政治资本兑现）。
 *
 * 恶性结局挂钩：时代大事件的 critfail 在「已有调查」时直接 hardEnd（入狱/
 *   身败名裂），或 fall（下野，还能东山再起）—— 对应 40-endings.js 的新规则。
 *
 * 写作注意（老规矩）：
 *   ① 字符串里只用「」，不用 ASCII/全角弯引号
 *   ② 每个事件必须有保底选项（无 cost 无 req）
 *   ③ brief 四段齐全，日期钉在真实历史锚点上
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 1960 时代 · 越战征兵 —— 同一场战争的两张脸
   * ==================================================================== */

  {
    id: "wave_draft_low",
    grade: "major", valence: "bane", dyn: true, unique: true, category: "foreign", era: ["1960_CAMELOT"],
    tierMin: 0, tierMax: 1, fromYear: 1965, toYear: 1972, weight: 22,
    brief: {
      lede: "那封信在信箱里躺着，像一颗拆不掉的雷。",
      known: [
        "征兵通知写得很客气：「您已被选中为美国武装部队服役」。落款是你们县的征兵委员会——委员会成员你都认识，其中一位是你父亲的老工友。",
        "电视里每晚都在放西贡的画面。数字在涨：派驻的人数、每周的伤亡。征兵配额也在涨，去年还在说「打完就回家」。",
        "你认识的人里，有人已经去了，有人考进研究生院缓征了，有人直接去了加拿大。三条路都有人走，每条路都有代价。"
      ],
      rumor: [
        "有人说委员会的名单是可以「调一调」的——只要有人肯说话，医生也能开出你没想到的病。",
        "有人说这场仗明年就要谈判了，现在去的人纯属赶上最后一拨倒霉。",
        "还有人说什么都不做最好：逃避服役的记录会跟你一辈子，从政尤其如此。"
      ],
      unknown: [
        "这场战争还要打八年，最后以撤离告终——此刻没有任何人知道，包括下令的人。",
        "你此刻的选择，二十年后竞选时会被对手翻出来逐字审读。服役记录是勋章，「逃避」两个字是刀。"
      ],
      terms: [
        { k: "征兵", v: "义务兵役制。18-26 岁男性登记在册，按出生日期抽签决定先后。大学生可缓征——这条规则改变了整整一代人的命运分布。" },
        { k: "逃兵役", v: "不去报到的人。有人坐牢，有人流亡加拿大，有人靠家庭医生的一纸诊断豁免。这个污点在政治生涯里格外致命。" }
      ]
    },
    title: "征兵通知信寄到了你家信箱",
    body: "县征兵委员会的信躺在你的信箱里。战争在电视上，现在也在你的信箱里。你还年轻，政治生涯还没开始——或者说，此刻的选择将决定它怎么开始。",
    choices: [
      {
        id: "serve", text: "应征入伍，把服役变成将来的勋章",
        note: "两年军旅会耽误爬台阶的时间，但「服役过」三个字在往后的每一次竞选中都值钱——尤其在你这一代人里，太多人没去过。",
        base: 0.6, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "你在军队里干得漂亮，带了一枚勋章和一口流利的履历回来。社区把你当英雄。", effects: { rep: 1.5, fac: { base: 12, military: 10 }, flags: ["wave_veteran"], hp: -0.9 } },
          ok: { body: "两年后你完整地回来了。没立大功，也没缺零件——这在那个年代已经算好结果。", effects: { rep: 0.9, fac: { base: 8, military: 6 }, flags: ["wave_veteran"], hp: -1.25 } },
          meh: { body: "你回来了，但带回了失眠和一点不敢碰的东西。人们谢你，你不知道怎么接。", effects: { rep: 0.6, fac: { base: 5, military: 4 }, flags: ["wave_veteran"], hp: -2 } },
          fail: { body: "东南亚的两年把你磨掉了半层。回来那天没有人接机，报纸头版在登别的事。", effects: { rep: 0.2, hp: -3, fac: { base: 3 } } },
          critfail: { body: "你躺在野战医院里过了三个月。回国后体检委员会给你定了伤残等级——和一生的雨天关节痛。", effects: { rep: 0.4, hp: -4.5, fac: { base: 5, military: 3 }, flags: ["wave_veteran"] } }
        }
      },
      {
        id: "defer", text: "读研缓征，把战争让给别人",
        note: "法学院三年，出来就是律师。「缓征」合法，但在酒吧里说起时要看气氛。",
        base: 0.7, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你以顶尖成绩毕业，律所的录用函在手，征兵委员会再也没来找过你。", effects: { attr: { INT: 4 }, fun: 1, rep: 0.2, flags: ["wave_deferred"] } },
          ok: { body: "文凭到手，兵役躲过。有些酒局里你会被问「你那时候在哪」，你学会了一句话带过。", effects: { attr: { INT: 3 }, fun: 0.5, flags: ["wave_deferred"] } },
          meh: { body: "读是读完了，但成绩平平。你总觉得那三年是在别人的人生里躲雨。", effects: { attr: { INT: 1 }, flags: ["wave_deferred"], fac: { base: -3 } } },
          fail: { body: "毕业那年政策收紧，缓征被取消。你还是去了，只是比别人晚、且更愤怒。", effects: { hp: -1.75, rep: 0.3, flags: ["wave_veteran"] } },
          critfail: { body: "伪造缓征材料的传闻在县里传开了。没有证据，但从那以后征兵委员会的人见了你不点头。", effects: { rep: -0.7, fac: { base: -8 }, flags: ["wave_deferred", "scandal_1"] } }
        }
      },
      {
        id: "resist", text: "公开反战，站到游行队伍的前排",
        note: "把征兵令当演讲素材。左翼学生和牧师会记住你，征兵委员会和退伍军人协会也会。",
        base: 0.45, mods: [{ src: "attr", key: "CHA", w: 0.5 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你的发言被地区报纸整版刊登。一夜之间，全县的反战青年都有了名字喊。", effects: { rep: 1.25, fac: { base: 15, press: 8, military: -15 }, flags: ["wave_antiwar"] } },
          ok: { body: "你成了本地反战圈子的联络人。名单在你手里越滚越长。", effects: { rep: 0.8, fac: { base: 10, military: -10 }, flags: ["wave_antiwar"] } },
          meh: { body: "游行上电视了，镜头扫过你的脸只有一秒半。 FBI 的档案里那一秒可能更长。", effects: { rep: 0.4, fac: { base: 6, military: -8, agency: -5 }, flags: ["wave_antiwar"] } },
          fail: { body: "游行被冲散，你被拘留了一夜。父亲来保你的时候没有说话。", effects: { rep: 0.1, fac: { base: 4, military: -12, agency: -8 }, flags: ["wave_antiwar", "scandal_1"] } },
          critfail: { body: "你被拍了照：站在烧征兵卡的人群最前面。那张照片后来被用了二十年。", effects: { rep: -0.4, fac: { base: 5, military: -18, agency: -10, church: -8 }, flags: ["wave_antiwar", "scandal_2"] } }
        }
      }
    ]
  },

  {
    id: "wave_draft_high",
    grade: "major", valence: "bane", dyn: true, unique: true, category: "foreign", era: ["1960_CAMELOT"],
    tierMin: 2, tierMax: 5, fromYear: 1965, toYear: 1973, weight: 20,
    brief: {
      lede: "表决之夜。走廊里挤满了人，每一双眼睛都在算票。",
      known: [
        "白宫的追加战争拨款今天表决。你在报纸上能背出支持与反对的票数估算——差距很小。",
        "选区的信箱两种声音各占一半：「支持总统」和「把孩子们带回来」。上周末的市政厅会议差点打起来。",
        "党的领导层暗示：投反对票的人，下一届的委员会任命就不要想了。"
      ],
      rumor: [
        "有人说白宫手里有每个议员的民意内参，你选区的数字比你想的更反对战争。",
        "有人说反对派正在凑一份「负责任的反对者」名单，附在名单上的人将来竞选时有靠山。"
      ],
      unknown: [
        "这场战争最终会烂掉，支持它的投票记录会成为一代人的负资产——现在知道的人还很少。",
        "「你现在怎么投」的档案，未来二十年每次竞选都会被对手调出来。"
      ],
      terms: [
        { k: "战争拨款", v: "国会授权的军费。反对拨款是议员手里最硬的反战工具，也是最得罪本党总统的工具。" }
      ]
    },
    title: "你要表决要不要继续给越战拨款",
    body: "你已经有投票权了——这正是麻烦所在。走廊里游说的人分成两拨，都在等你表态。这一票怎么投，你的选区会记一辈子。",
    choices: [
      {
        id: "vote_yes", text: "支持拨款：军队已经在那里，不能断了补给",
        note: "跟党和总统走，建制派满意，委员会的位置稳。战争若赢了你是先见之明，若输了你是同谋。",
        base: 0.65, mods: [{ src: "fac", key: "establishment", w: 0.3 }, { src: "fac", key: "military", w: 0.2 }],
        outcomes: {
          crit: { body: "拨款通过。总统在你的州提到「负责任的年轻议员」，党务系统把你的名字往上提了一格。", effects: { fac: { establishment: 12, military: 10, base: -6 }, rep: 0.6 } },
          ok: { body: "你投了支持票。领导层记住了，选区的反战信件也记住了。", effects: { fac: { establishment: 8, military: 6, base: -4 } } },
          meh: { body: "票投了，但你在演说里加了「深表忧虑」的定语。两边都觉得你不够意思。", effects: { fac: { establishment: 4, base: -2 } } },
          fail: { body: "拨款通过，战争继续，你的选区开始有人举着你的名字抗议——不是支持你，是要求你下台。", effects: { fac: { establishment: 5, base: -10, press: -4 } } },
          critfail: { body: "几年后战争败局已定，你当初的发言被剪进纪录片，标题是「他们当时都知道些什么」。", effects: { rep: -0.9, fac: { base: -15, press: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "vote_no", text: "反对拨款：这场战争不该继续",
        note: "顶住本党压力投反对票。选区的年轻选民和反战派从此是你的铁票，但党内的位置大概率没了。",
        base: 0.4, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你的反对演说被三大电视网转播。一夜之间，全国的和平派都知道了你的名字。", effects: { rep: 1.5, fac: { base: 15, press: 10, establishment: -10, military: -12 }, flags: ["wave_antiwar"] } },
          ok: { body: "你投了反对票，成了党内「负责任的反对者」名单上最年轻的名字。", effects: { rep: 0.9, fac: { base: 10, establishment: -8, military: -8 }, flags: ["wave_antiwar"] } },
          meh: { body: "反对票没挡住拨款，但你的选区办公室收到了七百封感谢信。", effects: { rep: 0.4, fac: { base: 8, establishment: -6, military: -6 } } },
          fail: { body: "领导层兑现了威胁：你的委员会任命没了，办公室的预算也被砍到骨头。", effects: { rep: 0.3, fac: { base: 6, establishment: -12, military: -6 } } },
          critfail: { body: "反对票让你被扣上了「不爱国」的帽子。下次退伍军人协会的活动，你是被点名的那一个。", effects: { rep: -0.6, fac: { base: 5, military: -18, establishment: -10 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "abstain", text: "缺席表决，躲开这一票",
        note: "不投就不会被记录。但「缺席」本身也会被记录——两边都不会感谢你。",
        base: 0.75,
        outcomes: {
          crit: { body: "你「恰好」在外地处理选区急务。报纸只给了三行的版面——三行已经太多。", effects: { fac: { base: -2, establishment: -2 } } },
          ok: { body: "没人追究你的缺席。你把这理解为宽容，也可能是无足轻重。", effects: {} },
          meh: { body: "对手的竞选团队记下了：关键表决之夜，你在哪？", effects: { fac: { base: -3, establishment: -3 } } },
          fail: { body: "「胆小鬼」的说法在选区传开了。你解释了三次，越解释越像。", effects: { rep: -0.4, fac: { base: -6 } } },
          critfail: { body: "你缺席的照片（当晚在一家餐厅）被人拍了，寄给了报社。", effects: { rep: -0.8, fac: { base: -10, press: -6 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1960 时代 · 伯明翰与三月向华盛顿 —— 民权的两种入场方式
   * ==================================================================== */

  {
    id: "wave_civil_street",
    grade: "mid", valence: "risk", dyn: true, unique: true, category: "civil", era: ["1960_CAMELOT"],
    tierMin: 0, tierMax: 2, fromYear: 1963, toYear: 1968, weight: 18,
    brief: {
      lede: "电视里，消防水柱把孩子们的衬衫打得贴在身上。",
      known: [
        "伯明翰的画面传遍了全国：警犬、水柱、以及一排排手无寸铁的学童。你所在的教堂牧师上周日讲道时说：这不是南方的问题，这是所有人的问题。",
        "三月向华盛顿的组织者正在各地招募人手：需要能坐大巴的人、能登记选民的人、能写信的人。",
        "你的邻居里有人开始不跟你说话了——因为你在考虑去。"
      ],
      rumor: [
        "有人说 FBI 把去的人都记了档案，名单将来会用在哪里没人知道。",
        "有人说组织内部也有派系：温和派要的是法案，激进派要的是更多。跟错人，代价不同。"
      ],
      unknown: [
        "民权法案会通过，投票权法案也会。此刻站进去的人，十年后会成为这个国家新的政治阶层——「我在那儿」四个字值一个仕途。",
        "你也可能只是档案里的一个名字。"
      ],
      terms: [
        { k: "三月向华盛顿", v: "1963 年 8 月的全国大游行，马丁·路德·金在林肯纪念堂前发表《我有一个梦想》。参加者约 25 万人。" }
      ]
    },
    title: "教会大巴要开往民权大游行，问你去不去",
    body: "教会的大巴要去华盛顿。你手里有一张票——不是买来的，是你在登记站做了三个周末志愿换来的。上不上车？",
    choices: [
      {
        id: "go", text: "上车。去华盛顿，站进历史里",
        note: "「我在那儿」是将来从政最硬的信用。代价：档案上的名字、邻居的冷眼、和一整年的周末。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "attr", key: "INTG", w: 0.3 }],
        outcomes: {
          crit: { body: "你在人群里听完了那篇演讲。回程的大巴上，有人提议你竞选当地的学区委员会——全场鼓掌。", effects: { rep: 2.75, fac: { base: 14, church: 6, agency: -4 }, flags: ["wave_civil60"] } },
          ok: { body: "你去了，你站了一天，你的嗓子哑了。回来的那个星期，登记站的志愿者翻了三倍。", effects: { rep: 1.5, fac: { base: 10, church: 4 }, flags: ["wave_civil60"] } },
          meh: { body: "你在人群的外围。听得不太清，但电视转播补上了。你参与了一个数字：二十五万分之一。", effects: { rep: 0.8, fac: { base: 6 }, flags: ["wave_civil60"] } },
          fail: { body: "大巴在州界被拦了三个小时，你们到的时候人群已经散了。你只赶上了垃圾和标语。", effects: { rep: 0.2, fac: { base: 3, agency: -3 }, flags: ["wave_civil60"] } },
          critfail: { body: "回程的大巴在南方某镇被围了半夜。没死人，但你答应自己不再谈那天的事。", effects: { hp: -2, fac: { base: 5, agency: -8 }, flags: ["wave_civil60"] } }
        }
      },
      {
        id: "stay", text: "留下守登记站：前线的后方也是前线",
        note: "去华盛顿的人有镜头，守登记站的人有名单。名单在政治里的保质期比镜头长。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "游行那天你登记了两百个新选民。三个月后，这批人成了本地选举的变量——一个属于你的变量。", effects: { rep: 2, fac: { base: 12, labor: 4 }, attr: { INT: 2 }, flags: ["wave_civil60"] } },
          ok: { body: "登记站的日子平静而具体：表格、铅笔、和一个个第一次写下自己名字的人。", effects: { rep: 1.25, fac: { base: 8 }, flags: ["wave_civil60"] } },
          meh: { body: "登记的进度慢得让人绝望。你开始理解为什么有人等不及要上街。", effects: { rep: 0.6, fac: { base: 5 } } },
          fail: { body: "登记站被砸了两次。第三次你把表格搬回了自己家。", effects: { rep: 0.4, fac: { base: 6, agency: -5 }, hp: -1 } },
          critfail: { body: "你收到一封装着弹壳的信。你把登记站挪进了教堂地下室，也把这件事告诉了警方——没有下文。", effects: { hp: -1.5, fac: { base: 4, agency: -8 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "watch", text: "看电视。这不是你的战场——暂时",
        note: "明哲保身。战场会记住谁没来，但暂时没人来问。",
        base: 0.85,
        outcomes: {
          crit: { body: "你在电视上看完了全程。半个月后的教区茶会上，你婉转地表达过「同情」。", effects: { fac: { base: 2 } } },
          ok: { body: "你看了新闻，然后关了电视。第二天照常上班。", effects: {} },
          meh: { body: "有人问起你对游行的看法，你答得滴水不漏。对方笑笑，没再问。", effects: { fac: { base: -2 } } },
          fail: { body: "你错过了什么，你说不清，但多年后填履历表时你确实少了一行。", effects: { fac: { base: -4 } } },
          critfail: { body: "你在信箱里看到邀请函的复印件——全县都收到了，只有你假装没看见。这话后来传到了牧师耳朵里。", effects: { fac: { base: -8, church: -8 }, rep: -0.6 } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1974 时代 · 石油危机的加油队 —— 通胀年代的政治学
   * ==================================================================== */

  {
    id: "wave_gasline_low",
    grade: "mid", valence: "bane", dyn: true, unique: true, category: "crisis", era: ["1974_WATERGATE"],
    tierMin: 0, tierMax: 2, fromYear: 1974, toYear: 1979, weight: 18,
    brief: {
      lede: "加油站绕街三圈的队，比任何演讲都更能改变一个人的政治立场。",
      known: [
        "石油禁运结束了，但油价没有回落。加油站按车牌单双号限售，队伍绕街区三圈，有人在队伍里过夜。",
        "你选区的加油站老板们组了个互助会，托你出面协调：他们想要一个「公平分配方案」，也想让县里知道他们的难处。",
        "本地报纸正在连载「通货膨胀受害者」的读者来信，编辑暗示他缺一个能「把事情串起来」的人。"
      ],
      rumor: [
        "有人说有加油站在夜里给熟人开小灶——名单可能在谁的手里。",
        "有人说州里的能源办公室有一批应急配额，会哭的孩子有奶吃。"
      ],
      unknown: [
        "这场通胀会持续整整十年，杀死一个总统的政治生命，也把「愤怒的郊区选民」变成一支全新的政治力量——谁能组织他们，谁就拥有未来。",
        "你在队伍里拍的照片，将来会是竞选广告的素材。"
      ],
      terms: [
        { k: "石油禁运", v: "1973 年阿拉伯产油国对美禁运，油价翻了两番。加油站限购、通胀飞起、取暖账单成了政治议题。" }
      ]
    },
    title: "石油危机让选区的加油站排起长队",
    body: "选区的加油站排起了长队。愤怒在队伍里发酵——你可以绕开，也可以走过去，跟排在前两百位的人聊一聊。",
    choices: [
      {
        id: "organize", text: "组织排队互助：登记、轮班、照顾老人",
        note: "无聊、琐碎、有效。每一个你登记过名字的人，都是一个会记住你的人。",
        base: 0.6, mods: [{ src: "attr", key: "CHA", w: 0.3 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你的互助名单成了一个微型组织：三百个家庭，每一家都欠你一个人情。地方报纸给了你一个外号：「排队律师」。", effects: { rep: 2.5, fac: { base: 15, labor: 6 }, flags: ["wave_gasline"] } },
          ok: { body: "互助运转起来了。老人们不再凌晨排队，你的名字在队伍里被口口相传。", effects: { rep: 1.5, fac: { base: 10 }, flags: ["wave_gasline"] } },
          meh: { body: "互助搞了两周就散了——油够用了。但你认识的那些人还在。", effects: { rep: 0.8, fac: { base: 6 }, flags: ["wave_gasline"] } },
          fail: { body: "有人指控你插队给自己的车加油。是误会，但误会传得比澄清快。", effects: { rep: -0.4, fac: { base: -4 } } },
          critfail: { body: "协调现场吵起来，推搡中一位老人摔倒住院。你陪着去的医院，付了账单，但报纸标题只写了前半句。", effects: { rep: -1.25, fac: { base: -8, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "media", text: "把队伍拍下来，写给报纸",
        note: "镜头是你的。愤怒的队伍是现成的版面——把别人的苦日子变成你的名字。",
        base: 0.5, mods: [{ src: "attr", key: "INT", w: 0.3 }, { src: "fac", key: "press", w: 0.2 }],
        outcomes: {
          crit: { body: "你的读者来信被登成专栏，配了你拍的队尾照片。编辑问你要不要写系列。", effects: { rep: 2, fac: { press: 12, base: 6 }, flags: ["wave_gasline"] } },
          ok: { body: "来信登了，署名带职业。加油站的人说：写得像。", effects: { rep: 1.25, fac: { press: 8, base: 4 } } },
          meh: { body: "登在读者来信版的中缝，标题被编辑改小了两号。", effects: { rep: 0.6, fac: { press: 4 } } },
          fail: { body: "没有被刊登。你收到一封标准格式的退稿信。", effects: { fac: { press: 2 } } },
          critfail: { body: "照片里一辆车的牌照被放大见报，车主被邻居怀疑「占了便宜」，砸了他家窗户。你登门道歉，对方没开门。", effects: { rep: -1, fac: { press: 4, base: -10 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "hustle", text: "帮加油站老板们跟县里要配额",
        note: "灰色的中间人活：事情办成大家都受益，办事的手续没人细看。",
        base: 0.45, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "配额批下来了。老板们凑了一笔「感谢费」——你收了一张加油卡，其余的让他们捐给了教会。", effects: { fun: 2.25, fac: { commercial: 10, base: 4, church: 3 }, lev: 1 } },
          ok: { body: "配额批了一半，老板们还是谢你。你留了个印象：这个年轻人能办事。", effects: { fun: 0.8, fac: { commercial: 8 } } },
          meh: { body: "配额没批下来，但你认识了县能源办公室的科长。以后有用。", effects: { fac: { commercial: 3 }, contact: { fixer: 6 } } },
          fail: { body: "事情黄了，老板们的话也变了：「早知道他自己家有油」。", effects: { fac: { commercial: -6, base: -3 } } },
          critfail: { body: "你递交的申请材料里有一处「优化过」的数据，被审计员圈了出来。事情不大，但存了档。", effects: { fac: { commercial: -8 }, flags: ["scandal_2", "investigation_open"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1974 时代 · 泄密链 —— 水门之后的「深喉」经济学
   * ==================================================================== */

  {
    id: "wave_leak_offer",
    grade: "major", valence: "bane", dyn: true, unique: true, category: "scandal", era: ["1974_WATERGATE"],
    tierMin: 1, tierMax: 5, fromYear: 1974, toYear: 1980, weight: 16,
    brief: {
      lede: "停车场。不着车牌的车。副驾驶车窗降下三寸。",
      known: [
        "水门教会了整个华盛顿一件事：文件会说话。从那以后，每个办公室的复印机旁都多了一个心眼。",
        "车里的人是某个委员会的中层职员。他递给你一个牛皮纸袋：「他们压下来的证词。你们要审的就是这个。」",
        "你现在有职务在身——可能是助理，可能是委员。泄密是重罪，但泄出去的文件会改变一场听证的方向。"
      ],
      rumor: [
        "有人说这个人是替某位大人物来的，袋子是投名状，收了就是入伙。",
        "有人说袋子里的东西是假的——栽赃给某个挡了别人路的人。"
      ],
      unknown: [
        "袋子里的东西是真的，但给你的人有自己的时间表——你不是终点站，你是传送带。",
        "这个十年结束时，几乎所有经手过「文件」的人都得选边：吹哨人，或者泄密嫌疑人。中间地带会被清理掉。"
      ],
      terms: [
        { k: "深喉", v: "水门事件中向记者提供线索的匿名线人（后来的 FBI 二号人物马克·费尔特）。地下停车场交接成为此后所有「爆料」的标准意象。" }
      ]
    },
    title: "有人在停车场塞给你一份泄密文件",
    body: "有人要把一份不该给你的东西给你。华盛顿的新游戏：文件即武器，收件人即共犯。你可以收、可以报、可以走开——但车窗已经在降了。",
    choices: [
      {
        id: "take", text: "收下。文件会用得上",
        note: "拿到的是武器，也是把柄——给你的人知道你收了。用它的时机决定你是吹哨人还是同案。",
        base: 0.55, mods: [{ src: "attr", key: "CUN", w: 0.4 }],
        outcomes: {
          crit: { body: "你在听证的关键时刻把文件摊在桌上。全场哗然。报纸叫你「那一代人的深喉接收端」——措辞复杂，但意思是英雄。", effects: { rep: 1.75, fac: { press: 14, base: 8, establishment: -12 }, lev: 2, flags: ["leaker_hero"] } },
          ok: { body: "文件换到了你想要的东西：一次提名、一张票、一个位子。没人知道代价是什么，包括你。", effects: { rep: 0.6, lev: 2, fac: { establishment: 6, press: 3 } } },
          meh: { body: "文件你收了，但迟迟没敢用。它躺在你的保险柜里，像一块慢慢升温的铁。", effects: { lev: 1, fac: { agency: -3 } } },
          fail: { body: "交接被人看见了。没有证据，但从那以后，某些会议你不再被通知。", effects: { fac: { establishment: -8, agency: -6 }, flags: ["leaker_suspect"] } },
          critfail: { body: "事情炸了，而且方向不对：调查顺着文件查到了你。联邦检察官对你提出了指控。", effects: { rep: -1.25, fac: { press: -10, establishment: -14, agency: -10 }, hardEnd: "prison" } }
        }
      },
      {
        id: "report", text: "上交：把袋子交给委员会主席",
        note: "干净。主席会记得你的可靠——还有袋子本来要给你的那件事。",
        base: 0.7, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "主席收下袋子，第二天公开表扬了「一位不愿透露姓名的年轻同事」。你在体制内的信用存折开了户。", effects: { rep: 0.7, fac: { establishment: 12, agency: 6 } } },
          ok: { body: "袋子上交了。主席点了点头，没多说。你猜它进了碎纸机——但至少不是你的碎纸机。", effects: { fac: { establishment: 8 } } },
          meh: { body: "主席收下了袋子，也记下了：谁接近过他的委员会的机密。你从此在他眼里多了一个维度。", effects: { fac: { establishment: 4, agency: 3 } } },
          fail: { body: "袋子被「遗失」了。三周后其中一页出现在小报上，附了一句「本刊获得」。你什么都不知道，也没人问你。", effects: { fac: { establishment: 3, press: -3 } } },
          critfail: { body: "主席把泄密的嫌疑引到了你身上——毕竟袋子在你手里待过十分钟。澄清花了一年。", effects: { rep: -0.9, fac: { establishment: -8, agency: -6 }, flags: ["leaker_suspect", "investigation_open"] } }
        }
      },
      {
        id: "walk", text: "摇上车窗，走开",
        note: "不沾。华盛顿尊重不沾的人——直到某个时刻，不沾变成了不上桌。",
        base: 0.8,
        outcomes: {
          crit: { body: "你转身走了。那晚之后，那个停车场你再也没有去过。有些故事不需要你。", effects: { attr: { INTG: 2 } } },
          ok: { body: "车窗升上去了。你回家，洗了手，睡得很好。", effects: {} },
          meh: { body: "你走开了。事情后来还是见报了——署名是别人。你松了口气，也若有所失。", effects: { fac: { press: -2 } } },
          fail: { body: "拒绝被记住了。某些「文件时代」的局，从此没人叫你。", effects: { fac: { establishment: -5, press: -4 } } },
          critfail: { body: "你的拒绝被当成了表态——「他知道了，而且他站在那边」。两边你都说不清了。", effects: { rep: -0.4, fac: { establishment: -8, press: -6 }, flags: ["leaker_suspect"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2008 时代 · 占领华尔街 —— 帐篷里的政治资本
   * ==================================================================== */

  {
    id: "wave_occupy_low",
    grade: "mid", valence: "risk", dyn: true, unique: true, category: "civil", era: ["2008_CRASH"],
    tierMin: 0, tierMax: 2, fromYear: 2011, toYear: 2012, month: 9, weight: 20,
    brief: {
      lede: "公园里的帐篷城。图书馆、厨房、和一条人人都在等的推特。",
      known: [
        "祖科蒂公园被帐篷占满了。他们管自己叫「百分之九十九」——这个标签两周内上了所有媒体。",
        "组织是松散的：没有领袖、没有纲领、人人可发言。这既是它的魅力，也是它的病。",
        "你的同学、你的同事、你教区牧师的女儿都在里面。也有职业活动家，和几个一看就不是来抗议的人。"
      ],
      rumor: [
        "有人说市政已经定了清场的日期，就等天冷。",
        "有人说两党的战略家都在盯着：这股劲儿会流向哪一边的选票池。",
        "有人说里面有便衣——拍面孔、记名字，和五十年前一模一样。"
      ],
      unknown: [
        "运动不会有具体的政治成果，但「百分之九十九」这个词会改变此后十年的政治语言——贫富差距从禁忌话题变成核心议题。",
        "帐篷里认识的某些人，十年后会在国会山或州议会工作。「我们是占领时认识的」是新政治阶层的接头暗号。"
      ],
      terms: [
        { k: "占领华尔街", v: "2011 年 9 月 17 日起在纽约祖科蒂公园开始的露营抗议，蔓延全球。没有领袖与正式诉求，以「我们是 99%」直指贫富分化。" }
      ]
    },
    title: "占领华尔街的帐篷城请你去做对外沟通",
    body: "公园里的帐篷没有减少的迹象。你去送过一次咖啡，现在他们问你：要不要留下来帮他们做「对外沟通」——你有一张会说话的嘴。",
    choices: [
      {
        id: "join", text: "住进帐篷：成为他们的一员",
        note: "把生活搬进去。「亲历者」三个字在未来的选举里对抗任何精英履历。代价：档案、时间和接下来的每个冬天。",
        base: 0.55, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你成了帐篷城的声音之一：镜头找你，捐款经你，警方的档案也给你立了页。冬天来之前，你已经把运动里认识的两百个人存进了自己的通讯录。", effects: { rep: 3, fac: { base: 16, labor: 8, commercial: -10, agency: -6 }, flags: ["wave_occupy"] } },
          ok: { body: "你在帐篷里过了六个星期。清场那天你被抬走的样子上了地区新闻——没有名字，但你的选区都看见了。", effects: { rep: 1.75, fac: { base: 12, commercial: -6, agency: -4 }, flags: ["wave_occupy"] } },
          meh: { body: "你参与了，也看清了：一群好人、无领袖、和无限延长的大会。你带着笔记本离开。", effects: { rep: 1, fac: { base: 8, commercial: -4 }, attr: { INT: 2 }, flags: ["wave_occupy"] } },
          fail: { body: "清场那晚你不在。第二天你去收拾东西，公园已经冲洗干净，像什么都没发生过。", effects: { rep: 0.4, fac: { base: 4 } } },
          critfail: { body: "一段你的发言视频被剪了：掐头去尾之后，你像在号召冲击银行。原视频三千播放，剪辑版三十万。", effects: { rep: -1.5, fac: { base: 6, press: -10, commercial: -12 }, flags: ["scandal_2", "wave_occupy"] } }
        }
      },
      {
        id: "bridge", text: "做桥梁：替工会跟帐篷城牵线",
        note: "不上帐篷也不旁观：把组织资源（工会、教会）和街头热情连起来。两边都讨好，两边都怀疑你。",
        base: 0.5, mods: [{ src: "attr", key: "CUN", w: 0.3 }, { src: "fac", key: "labor", w: 0.3 }],
        outcomes: {
          crit: { body: "工会的大巴开进了公园：食物、热水、和几百个有编制的抗议者。两个月的松散运动第一次有了后勤。所有人都记住了是谁牵的线。", effects: { rep: 2, fac: { base: 8, labor: 14 }, flags: ["wave_occupy"] } },
          ok: { body: "牵线成功了一半：工会出了声援声明，但没出大巴。已经比大多数「联盟」走得远。", effects: { rep: 1.25, fac: { labor: 9, base: 4 } } },
          meh: { body: "工会的人听完说「有意思」，然后去开了别的会。你学会了听懂「有意思」。", effects: { fac: { labor: 3 } } },
          fail: { body: "帐篷城里有人指你是「工会的特务」，工会那边则嫌你太出风头。两头不是人。", effects: { fac: { labor: -4, base: -4 } } },
          critfail: { body: "你安排的会面照片流出：标题写的是「工会高层密会占领领袖」。双方的公关部门同时找你谈话。", effects: { rep: -1, fac: { labor: -8, base: -6, press: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "observe", text: "在 Twitter 上支持，人不去",
        note: "转发的成本是零，收益也是零——但至少档案上不会有你的帐篷编号。",
        base: 0.8,
        outcomes: {
          crit: { body: "你的几条推文在小圈子里转了转。有个帐篷里的人回复：下次来现场。你回了个拳头。", effects: { fac: { base: 3 } } },
          ok: { body: "你关注了这件事，偶尔转发。像大多数人一样。", effects: { fac: { base: 1 } } },
          meh: { body: "转发被同事的领导看到了。周一的会议上气氛微妙。", effects: { fac: { base: 2, commercial: -2 } } },
          fail: { body: "你的时间线安静地滑过去了。后来别人讲起那个秋天，你只能点头。", effects: {} },
          critfail: { body: "你转的那条「占领」口号来自一个后来被证实是假账号的帖子。截图留下了。", effects: { rep: -0.6, fac: { press: -4 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2008 时代 · 茶党 —— 另一边的浪潮
   * ==================================================================== */

  {
    id: "wave_tea_rally",
    grade: "mid", valence: "risk", dyn: true, unique: true, category: "civil", era: ["2008_CRASH"],
    tierMin: 0, tierMax: 3, fromYear: 2009, toYear: 2012, month: 4, weight: 18,
    brief: {
      lede: "科赫兄弟的账单、两条创始人的推文、和一个雨天的市政厅。",
      known: [
        "救市通过之后，一段电视记者破口大骂的视频点燃了另一边的怒火：「我们要开一个茶党」。全美的市政厅会议开始出现愤怒的人群。",
        "你们选区的市政厅下周开会，议题是规划中的某项联邦项目。组织者们在电台里号召「把会议室坐满」。",
        "人群是真的愤怒：账单、房贷、和「我们的钱救了他们」的账。愤怒背后也有钱——但你暂时看不见。"
      ],
      rumor: [
        "有人说这些集会是有资金网络的：智库、电台、和几个家族基金会的钱在底下流。",
        "有人说建制派正在紧张地计算：这股力量可以收编吗，还是必须扑灭？"
      ],
      unknown: [
        "茶党会在一年内拿下多个席位、改写一个政党。任何在 2009 年站对位置的无名之辈，都可能顺着这股浪直接进国会。",
        "浪也会退。退潮时，浪尖上的人会挂在滩上。"
      ],
      terms: [
        { k: "茶党", v: "2009 年兴起的右翼民粹运动，名字借自波士顿倾茶事件。反税、反救市、反大政府。无统一组织，靠电台与后来的社交媒体串联。" }
      ]
    },
    title: "茶党要坐满市政厅会议，逼你表态",
    body: "选区的市政厅要讨论联邦项目，组织者号召「坐满会议室」。你收到了两份邀请：一份来自愤怒的人群，一份来自吓得想让你去「灭火」的商会。",
    choices: [
      {
        id: "ride", text: "站上讲台，把这股怒气接住",
        note: "替人群说话，人群就会把你抬起来。茶党的浪最高的时候，浪尖上连无名之辈都能起飞。",
        base: 0.5, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "stance", key: "outsider", w: 0.2 }],
        outcomes: {
          crit: { body: "你的三分钟发言被拍了竖屏，一周五十万播放。三个月后，你被邀请在州级集会上压轴。", effects: { rep: 2.75, fac: { base: 14, commercial: -6, establishment: -10 }, flags: ["wave_tea"] } },
          ok: { body: "会议室的人站起来为你鼓掌。商会的邀请函第二天被撤回了。", effects: { rep: 1.5, fac: { base: 10, establishment: -6, commercial: -4 }, flags: ["wave_tea"] } },
          meh: { body: "你讲得不错。人群激动的原因你理解了七成——剩下三成你不敢深想。", effects: { rep: 0.8, fac: { base: 6, establishment: -3 } } },
          fail: { body: "你被起哄了：人群要的是怒吼，你给的是分析。有人喊「下一个」。", effects: { rep: -0.4, fac: { base: -4 } } },
          critfail: { body: "你引用的一组数据被当场戳穿是错的。竖屏照样传了五十万——配的标题是「精英的傲慢」。", effects: { rep: -1.75, fac: { base: -8, press: -8 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "cool", text: "应商会之请去「灭火」",
        note: "把怒气引回会议室的程序里。商会记得你的靠谱，人群记得你是谁的人。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.3 }, { src: "fac", key: "commercial", w: 0.3 }],
        outcomes: {
          crit: { body: "你把会议主持住了：怒气没有消失，但议程走完了。商会当场决定支持你「更进一步」。", effects: { rep: 1, fac: { commercial: 12, establishment: 8 }, fun: 2.75 } },
          ok: { body: "会议没出事。商会的人跟你握手时说了三个字：「有前途」。", effects: { fac: { commercial: 8, establishment: 5 } } },
          meh: { body: "你讲道理，人群讲分贝。会议延期了。双方都怪你。", effects: { fac: { commercial: 3, base: -6 } } },
          fail: { body: "「灭火」的照片传开了：你站在台上，台下全是愤怒的手指。标题替你选了边。", effects: { rep: -1, fac: { commercial: 5, base: -10, press: -4 } } },
          critfail: { body: "你私下跟商会说的「这帮人迟早散」被人录了音。录音在人群的邮件列表里转了一个月。", effects: { rep: -2, fac: { base: -14, commercial: 4, press: -6 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "document", text: "去做田野：把每个人名字都记下来",
        note: "不站队，做记录。名单是民主政治里最古老的本钱——无论浪往哪边打。",
        base: 0.6, mods: [{ src: "attr", key: "INT", w: 0.3 }],
        outcomes: {
          crit: { body: "你收了两百份问卷和一百多个联系方式。半年后，无论哪边参选的人，都来问你要过名单。", effects: { rep: 1.25, fac: { base: 6, commercial: 4, press: 4 }, contact: { fixer: 8 }, flags: ["wave_tea"] } },
          ok: { body: "名单攒起来了。做记录的人不会被骂，也很少被记得——暂时。", effects: { rep: 0.6, fac: { base: 3, press: 3 } } },
          meh: { body: "两百份问卷，一半是愤怒的涂抹。你学到的是：愤怒有语法。", effects: { attr: { INT: 2 }, rep: 0.4 } },
          fail: { body: "举着写字板的人在人群里格外显眼。有人抢过你的板子摔了。", effects: { fac: { base: -4 }, hp: -0.5 } },
          critfail: { body: "你的名单被怀疑是「给谁做的」。无论你怎么解释，板子上那两百个名字看起来都像情报。", effects: { rep: -0.8, fac: { base: -6, agency: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2008 时代 · 底特律听证 —— 一座城的生死的会场版
   * ==================================================================== */

  {
    id: "wave_detroit_high",
    grade: "major", valence: "bane", dyn: true, unique: true, category: "crisis", era: ["2008_CRASH"],
    tierMin: 3, tierMax: 5, fromYear: 2008, toYear: 2010, month: 12, weight: 18,
    brief: {
      lede: "三家汽车公司的老板坐着公司的商务机来要钱——报纸标题自己会写。",
      known: [
        "底特律三家巨头在国会作证：账上撑不过几个月，要几百亿的救援贷款。上次华尔街拿了七千亿，这次轮到有工会的工作。",
        "你来听证的路上经过了马里兰的一家零件厂：停车场上草已经长了半尺。",
        "投票的算术很冷：救，几百亿纳税人的钱；不救，几十万岗位在圣诞节前清零。两边的广告预算都已到账。"
      ],
      rumor: [
        "有人说三家其实有一家有救，另外两家是搭车的。",
        "有人说白宫倾向于「有条件的救」——条件里塞着他们想要很久的东西。"
      ],
      unknown: [
        "救助会通过，附带严格的重组条件。两年后通用会重新上市，账面上「赚了」——但付出的那些岗位和退休金再也回不来。",
        "你怎么投的这一票，会成为密歇根等地此后二十年政治版图的注脚。"
      ],
      terms: [
        { k: "汽车业救助", v: "2008 年底对通用、克莱斯勒、福特的纾困案。前两家接受破产重组与政府贷款，福特自行渡过。附带条件包括工会让步与管理层更换。" }
      ]
    },
    title: "国会要表决一笔几百亿的汽车业救援",
    body: "听证会开了两天，全美国都在看那些坐着商务机来要钱的老板。现在轮到你表态：几百亿，救还是不救——圣诞节的新闻标题已经排好两个版本。",
    choices: [
      {
        id: "save", text: "投救援：几十万岗位不能在圣诞节清零",
        note: "保住岗位是真实的，救援的骂名也是真实的。工会会记住你，茶党的广告也会。",
        base: 0.55, mods: [{ src: "fac", key: "labor", w: 0.4 }],
        outcomes: {
          crit: { body: "救援案通过，条件里你塞进了工人退休金的保护条款。工会的通讯把你的照片印在了头版。", effects: { rep: 1.25, fac: { labor: 16, base: 8, commercial: -4 } } },
          ok: { body: "你投了支持。密歇根的报纸谢了你，别州的社论问你「下一个是谁」。", effects: { rep: 0.6, fac: { labor: 10, base: 4, commercial: -2 } } },
          meh: { body: "票投了，案过了，条件把你原本想要的条款稀释成了一句「原则性关切」。", effects: { fac: { labor: 6, base: 2 } } },
          fail: { body: "救援通过了，但一年后工厂还是关了两条线。工会怪条件太松，报纸怪你太软。", effects: { rep: -0.4, fac: { labor: 2, base: -6 } } },
          critfail: { body: "你在听证上替高管辩护的那段话，被剪进了茶党的全国广告：「你的钱，他的商务机」。", effects: { rep: -1.25, fac: { labor: -6, base: -14, press: -8 }, flags: ["scandal_3"] } }
        }
      },
      {
        id: "no", text: "投反对：不能纳税人救所有犯错的巨无霸",
        note: "财政鹰派和茶党的掌声真实存在，工会的怒火也是。这一票在工业州是负债，在阳光地带是资产。",
        base: 0.5, mods: [{ src: "attr", key: "INTG", w: 0.3 }, { src: "fac", key: "commercial", w: 0.2 }],
        outcomes: {
          crit: { body: "你的反对演说逻辑严整，被财政鹰派奉为「那一年最好的一段」。三个州的筹款邀请飞来。", effects: { rep: 1, fac: { base: 8, commercial: 8, labor: -14 }, fun: 1.25 } },
          ok: { body: "你投了反对。案还是过了，但你的立场清晰得可以印在传单上。", effects: { rep: 0.4, fac: { base: 6, commercial: 5, labor: -10 } } },
          meh: { body: "反对票没挡住什么，只表达了什么。表达在政治里也算工作。", effects: { fac: { base: 3, labor: -6 } } },
          fail: { body: "选区的工会把你的画像贴在了本地会议的门口——靶心的位置。", effects: { rep: -0.6, fac: { labor: -16, base: -6 } } },
          critfail: { body: "你反对救助的第二天，你选区最大的零件厂宣布关门。新闻发布会你被问了十一次「现在呢」。", effects: { rep: -1.25, fac: { labor: -18, base: -12 }, flags: ["scandal_2"], fall: 1 } }
        }
      },
      {
        id: "condition", text: "有条件支持：把救援改造成「重组计划」",
        note: "中间路线：救，但要换管理层、要还钱、要时间表。做成了是艺术，做不成是两边挨打。",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.5 }],
        outcomes: {
          crit: { body: "你牵头拟的修正案成了最终版本：钱分批、条件带钩、政府持股。报纸说这是「教科书式的中间路线」。", effects: { rep: 1.5, fac: { labor: 8, commercial: 6, base: 6, establishment: 8 }, attr: { INT: 2 } } },
          ok: { body: "修正案采纳了大半。救援带上了缰绳——缰绳握多紧，以后见分晓。", effects: { rep: 0.7, fac: { labor: 5, commercial: 4, establishment: 5 } } },
          meh: { body: "条件加了，但执行条款被删了。你知道那才是牙齿。", effects: { rep: 0.2, fac: { labor: 3, commercial: 2 } } },
          fail: { body: "两边都拒绝了你：一方说太少，一方说太多。中间派的地盘比想象的窄。", effects: { fac: { labor: -4, commercial: -4, base: -3 } } },
          critfail: { body: "你的方案被《华尔街日报》和工会报纸同一天骂——两边用的词几乎一样：天真。", effects: { rep: -0.8, fac: { labor: -8, commercial: -6, press: -6, establishment: -5 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 1974 时代 · 校车与社区 —— 种族政治在最微观的地方
   * ==================================================================== */

  {
    id: "wave_busing",
    grade: "mid", valence: "risk", dyn: true, unique: true, category: "civil", era: ["1974_WATERGATE"],
    tierMin: 0, tierMax: 3, fromYear: 1974, toYear: 1979, weight: 16,
    brief: {
      lede: "校车路线图重新画了，一条线穿过整座城的历史。",
      known: [
        "法院命令学区用校车实现种族平衡。新路线图公布那天，家长会在体育馆开了四个小时。",
        "你住的街区一半孩子被划去了城另一头的学校。愤怒不分肤色——但表达愤怒的方式分。",
        "市议员席位明年改选。所有人的眼睛都在看：谁替他们说话。"
      ],
      rumor: [
        "有人说学区的数据是可以挑战的——已经有家庭联合请了律师。",
        "有人说真正的博弈在州议会：一条修正案就能让整个命令失效。"
      ],
      unknown: [
        "校车之争会撕裂北部城市整整十年，把无数「温和派」逼成单议题选民——这股情绪将来会改名换姓，改写两党的版图。",
        "你此刻站的位置，决定十年后你的政党在你这座城市还剩什么。"
      ],
      terms: [
        { k: "校车政策", v: "busing：法院命令用校车跨区接送学生以实现学校种族平衡。北方城市的白人中产阶级激烈反弹，成为七十年代最烫手的种族议题。" }
      ]
    },
    title: "法院要派校车跨区接送，你的街区被切开",
    body: "路线图把你的街区切成了两半，把两所学校的孩子互换了地址。体育馆的家长会吵到深夜，现在他们看着你。",
    choices: [
      {
        id: "support_order", text: "支持法院命令：这是法律，也是欠账",
        note: "法律与道德的制高点，也是选区票仓的火药桶。黑人社区会记住谁站在他们一边。",
        base: 0.45, mods: [{ src: "attr", key: "INTG", w: 0.4 }, { src: "fac", key: "base", w: 0.2 }],
        outcomes: {
          crit: { body: "你在体育馆说了那句被人记住的话：「法律不公平的时候，我们改法律；法律公平而我们不做的时候，我们改的是自己。」人群分裂成掌声和跺脚。", effects: { rep: 2.5, fac: { base: 12, church: 4 }, flags: ["wave_busing"] } },
          ok: { body: "你支持了命令，也组织了家长陪护队让开学那天平安过去。", effects: { rep: 1.5, fac: { base: 8 }, flags: ["wave_busing"] } },
          meh: { body: "你支持的姿势被双方批评：一方嫌太冷，一方嫌太热。", effects: { rep: 0.6, fac: { base: 4, church: -2 } } },
          fail: { body: "你为此失去了一次地方选举。你的签名桌被掀了一张。", effects: { rep: -0.6, fac: { base: 5, church: -6 } } },
          critfail: { body: "你被画进了对手的漫画：西装革履，把孩子塞进校车。漫画贴满了选区。", effects: { rep: -1.75, fac: { base: -8, church: -8, press: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "challenge", text: "组织家长挑战路线：程序上还有得打",
        note: "不碰种族议题本身，只打「程序与数据」。技术上成立，政治上所有人都知道你在替谁说话。",
        base: 0.55, mods: [{ src: "attr", key: "INT", w: 0.4 }],
        outcomes: {
          crit: { body: "你的数据质询让学区退了半步：两条线路重画，你的街区回到步行范围。家长们叫你「街区的律师」。", effects: { rep: 2, fac: { base: 8, church: 6 }, fun: 1.5 } },
          ok: { body: "挑战部分成功：低年级不跨区了。够开庆功会，不够平息愤怒。", effects: { rep: 1.25, fac: { base: 6, church: 4 } } },
          meh: { body: "官司排队排到了明年。家长的热钱先冷了一半。", effects: { rep: 0.6, fac: { base: 3 } } },
          fail: { body: "法院驳回了。你的街坊觉得被你带着白忙了一场。", effects: { rep: -0.8, fac: { base: -6 } } },
          critfail: { body: "媒体翻出了挑战案的捐款名单——头几名来自学区的地产商。你的「程序之战」变成了「利益之战」。", effects: { rep: -2, fac: { base: -10, press: -8, commercial: 4 }, flags: ["scandal_2"] } }
        }
      },
      {
        id: "mediator", text: "两边走：组织跨街区的家长联席会",
        note: "最累的路：让愤怒的人和愤怒的人坐在一起。成了是传奇，败了是天真——但名单和信任都归你。",
        base: 0.4, mods: [{ src: "attr", key: "CHA", w: 0.5 }],
        outcomes: {
          crit: { body: "联席会开了六次，吵了六次，第七次达成了一份双方都签的过渡方案。市报的专栏说这座城市欠你一个人情。", effects: { rep: 2.75, fac: { base: 10, church: 4, press: 6, establishment: 5 }, flags: ["wave_busing"] } },
          ok: { body: "会议没有奇迹，但两边家长第一次知道对方也叫孩子的小名。你攒下的东西比协议值钱。", effects: { rep: 1.25, fac: { base: 6, press: 3 } } },
          meh: { body: "联席会开了三次就停了：一边的代表接到「别去了」的电话。", effects: { rep: 0.6, fac: { base: 3 } } },
          fail: { body: "两边都嫌你和气：调解人收到的感谢通常在十年后，如果有的话。", effects: { rep: 0.2 } },
          critfail: { body: "一次会议在肢体冲突中结束，镜头拍到你站在中间张着手——照片很戏剧化，对谁都不利。", effects: { rep: -1.25, fac: { base: -6, press: -6, church: -4 }, flags: ["scandal_1"] } }
        }
      }
    ]
  }

]);
