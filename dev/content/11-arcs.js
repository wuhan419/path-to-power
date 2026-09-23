/* ============================================================================
 * CONTENT · 11-arcs.js
 * 「主线」内容包 —— 一个人这一辈子，主要是在过哪一条命。
 *
 * 引擎在 engine/arc.js（单线制、可换线、只加权不硬塞），字段契约见
 * docs/CONTENT-SCHEMA.md §4.16。这里只写八条线，全部编排**已有事件**，不新增事件。
 *
 * ---------- 怎么写一条主线 ----------
 *   name/lede   界面上写的名字与一句话点题（"风向"面板显示）
 *   priority    同时可选的线里，优先级高的赢。**整档阶梯见文件末尾的注释** ——
 *               换线要求"高出一整个 switchMargin(=12) 档"，所以别写 1、2 这种小差距。
 *   gate        什么人才会进这条线。用统一的 P.when 词汇 —— 和事件门槛同一套。
 *               这是"背景/身份/资源决定你面对哪条主线"的**唯一开关**，所以都写在这里。
 *   stages[]    一幕一幕。每幕写：
 *                 events[]  候选事件（跨时代要多写几件，见下）
 *                 maxMonths 这一幕的窗口；过期就跳过，别把整条线卡死
 *                 title     可选，给"风向"面板看的人话
 *   一条线跑完（最后一幕演过）→ 体面收场。窗口全过期、一幕都没演成 → 淡出。
 *   所以 **一条线推不动是合法的**，它只是没在你身上发生。
 *
 * ---------- 为什么每幕都写"候选数组"而不是单个事件 ----------
 *   61 个事件里有 24 个是**时代专属**的（只有 1960 或只有 2008 才有）。
 *   只写一个事件 id，这条线换个时代就永远推不动 —— 1960 年的局抽不到 2008 的事。
 *   写成一串跨时代的候选，同一条线在三个时代都能走；引擎会挑当前时代真抽得到的那件
 *   显示在面板上（engine/arc.js 的 stepTitle），并且在候选**全部死透**时立刻跳幕。
 *
 * ---------- 三条自我约束（照抄引擎的立场，别在这里破例）----------
 *   ① 只编排已有事件。新写事件是内容包的活（content/events/），不是主线的活。
 *   ② 不加 onStart/onEnd 效果，除了极少数叙事上真需要的地方（目前只有 arc_archive
 *      收束时给 +3 声望）。主线一旦动数值，就是在替玩家的选择改命 —— 那是事件该干的事。
 *   ③ 不写 exclusive（互斥）除非两条线真的在讲同一件事。玩家一辈子就该能碰到好几条线，
 *      互相排斥只会让内容看起来比实际少。
 * ==========================================================================*/
(function () {
  const P = POTUS;

  POTUS.define("arc", {

    /* ======================================================================
     * 1. 一级一级 —— **选举轨道**的那条命：没有靠山，也没有宿敌，只有台阶。
     *    优先级最低（10），所以只要有更贴身的线出现，下一个换线窗口它就自动让位。
     *
     *    为什么 gate 要写 tracks:["electoral"]，而不是像早先那样恒真？
     *    因为五个轨道各有一批**只能自己走**的关键事件（prog_council / prog_appoint /
     *    prog_kingmaker / prog_magnate / prog_star 各自带 tracks 锁），五个轨道的事件
     *    混写进一幕里，对任何一个玩家都只有五分之一候选是真的 —— 剩下的四件他这辈子
     *    都抽不到，整条线因此卡死。**一个轨道一条线**才是诚实的写法，其余四个轨道的
     *    "自己的那条路"分别是 arc_anointed（委任）/ arc_spotlight（名人）/
     *    arc_shadow（操盘）/ arc_money（财富），见各自的段落。
     * ==================================================================== */
    arc_ladder: {
      name: "一级一级",
      lede: "你没有靠山，也没有宿敌。你只有一级一级往上爬的这条命。",
      priority: 10,
      cats: ["career"],
      gate: { tracks: ["electoral"] },
      /* 每一幕的窗口都要**盖得住这件事的在位时长门槛**（prog_* 系列的 minTenure
         是 24 / 48 个月），否则窗口先过期、事件还没资格出现，这一幕永远推不动。
         也别放太宽：一次超时就要吃掉整个窗口，五幕加起来会超过 lifespan，
         整条线就永远走不到"最后一幕演过"的那一天（实测：窗口全放 48-84 时，0/72 走完）。 */
      stages: [
        { title: "第一次把自己的名字放上选票", events: ["prog_council"], maxMonths: 40 },
        { title: "市议会的一个席位", events: ["prog_city"], maxMonths: 40 },
        { title: "州议会的席位空了出来", events: ["prog_state"], maxMonths: 44 },
        { title: "州参议院的召唤", events: ["prog_upper"], maxMonths: 50 },
        { title: "把版图扩大到全州", events: ["prog_stwide"], maxMonths: 52 },
        { title: "联邦众议员的机会", events: ["prog_federal"], maxMonths: 56 },
        { title: "参议员 / 州长：二选一", events: ["prog_senate"], maxMonths: 60 },
        { title: "副总统的召唤", events: ["prog_vp"], maxMonths: 66 },
        { title: "总统大选：你决定参选", events: ["prog_president"], maxMonths: 72 }
      ],
      /* 坐到最高那级，这条路就走到头了 —— 不是"完成"，是"没有再往上的台阶了" */
      endWhen: { minTier: 5 }
    },

    /* ======================================================================
     * 2. 没有故事的那几年 —— 给"台阶停了"的人。优先级 24：比通用线高一档（≥12）
     *    所以它能顶掉"一级一级"，但顶不掉那些真正贴身的故事。
     *
     *    门槛必须同时要"上了年纪"和"确实衰弱了"，否则 T0 刚开局的年轻人
     *    （声望 5、资金 5 万）会被立刻判成"没有故事" —— 那是错的。
     *
     *    "衰弱"用了资金 / 健康 / 人脉三条，**故意不用声望**：声望在这套数值里涨得很快，
     *    拿它当门槛会让这条线几乎永远轮不到（实测：用 maxRep:20 时 300 局 0 次开始）。
     *    人脉反而更准 —— "没人再给你打电话"本来就是人脉散了的说法。
     *    endWhen 也必须跟着改：声望/资金任一回到高位就算"又有故事了"，这条线收场。
     * ==================================================================== */
    arc_quiet: {
      name: "没有故事的那几年",
      lede: "你不再上头条。日子还在过，只是没什么人看了。",
      priority: 24,
      cats: ["career", "civil"],
      gate: {
        all: [
          { minAge: 48 },
          { any: [{ maxFun: 30000 }, { maxHp: 35 }, { maxContacts: 2 }] }
        ]
      },
      stages: [
        { title: "没人再给你打电话", events: ["press_columnist", "enc_elders"], maxMonths: 48 },
        {
          title: "街角那点事",
          events: ["shady_doctor", "2008_foundation"],
          maxMonths: 60
        }
      ],
      /* 又有人在提你的名字、而且手头也宽裕了 → 这条线自然结束，让位给别的故事 */
      endWhen: { all: [{ minRep: 75 }, { minFun: 200000 }] }
    },

    /* ======================================================================
     * 3. 街上先有人 —— 民权/社区/草根出身的那条命。
     *    "选区是后来才有的，人是一直都在的。"
     * ==================================================================== */
    arc_street: {
      name: "街上先有人",
      lede: "选区是后来才划出来的，人是一直都在的。",
      priority: 36,
      cats: ["civil"],
      gate: {
        any: [
          { origins: ["labor", "immigrant"] },
          { stances: ["outsider"] },
          { entries: ["ngo"] },
          { all: [{ tracks: ["electoral"] }, { maxTier: 2 }] }
        ]
      },
      stages: [
        {
          title: "先有七个人，再有一条街",
          events: ["enc_elders", "enc_street"],
          maxMonths: 36
        },
        {
          title: "讲台与投票站之间",
          events: ["enc_preacher", "enc_ballot"],
          maxMonths: 48
        },
        {
          title: "他们决定推出一个人",
          events: ["enc_first"],
          maxMonths: 60
        },
        {
          title: "把你自己放上选票",
          /* prog_council / prog_state 是**选举轨道专属**的：非选举轨道的人在这里只会
             看到 enc_ballot（跨时代、非专属）—— 引擎的"幕已经全推不动就跳过"会处理掉
             剩下那两件，这一幕照样能过去，不会把整条线卡死。 */
          events: ["enc_ballot", "enc_first", "prog_council", "prog_state"],
          maxMonths: 60
        }
      ],
      endWhen: { minTier: 3 }
    },

    /* ======================================================================
     * 4. 钱先到，人后到 —— 用钱买影响力的那条命。
     *    门槛写成"任一命中"而不是叠加：出身（世家/精英）、起点（生意人）、
     *    轨道（财富）都会进来，但进来之后是同一套故事。
     * ==================================================================== */
    arc_money: {
      name: "钱先到，人后到",
      lede: "有些人先有名，再有钱。你先有钱。",
      priority: 44,
      cats: ["finance"],
      gate: {
        any: [
          { minFun: 250000 },
          { entries: ["business"] },
          { tracks: ["wealth"] },
          { origins: ["dynasty", "elite"] }
        ]
      },
      stages: [
        {
          title: "晚宴上那张写着名字的座次表",
          events: ["2008_donor", "demo_donor_gala"],
          maxMonths: 48
        },
        {
          title: "钱要找去处",
          events: ["2008_short", "shady_launder"],
          maxMonths: 48
        },
        {
          title: "把说话的地方买下来",
          events: ["press_own_outlet", "shady_file"],
          maxMonths: 60
        },
        {
          title: "超级政治行动委员会",
          events: ["prog_magnate"],
          maxMonths: 72
        }
      ],
      endWhen: { minTier: 4 }
    },

    /* ======================================================================
     * 5. 聚光灯先来 —— 名气走在了职位前面。
     *    minRep 55 让它**中途也能接管**：一个埋头干了二十年的公务员突然红了，
     *    下个换线窗口这条线就会顶掉"一级一级"。
     * ==================================================================== */
    arc_spotlight: {
      name: "聚光灯先来",
      lede: "位置还没到手，名字已经传出去了。这很危险，也很值钱。",
      priority: 52,
      cats: ["media"],
      gate: {
        any: [
          { tracks: ["celebrity"] },
          { entries: ["celebrity"] },
          { minRep: 55 }
        ]
      },
      stages: [
        {
          title: "第一次对着麦克风说话",
          events: ["media_fireside", "press_columnist"],
          maxMonths: 36
        },
        {
          title: "上镜的人和不上镜的人",
          events: ["media_tv_spot", "media_cable_show", "2008_debate"],
          maxMonths: 48
        },
        {
          title: "十五秒就够毁掉或成就一个人",
          events: ["media_viral_clip", "media_blog_drop", "press_blackout", "2008_social"],
          maxMonths: 48
        },
        {
          title: "那段视频不是你",
          events: ["media_deepfake", "press_kill"],
          maxMonths: 60
        },
        {
          title: "不如自己开一家",
          events: ["press_own_outlet"],
          maxMonths: 72
        }
      ],
      endWhen: { minTier: 4 }
    },

    /* ======================================================================
     * 6. 不能被拍到的那一面 —— 灰产/操盘手的那条命。
     *    最后一幕刻意接回 archive 事件链：**钱洗干净了，旧案就会找上门**，
     *    这条线收了，正好把位子让给"地下室的那一格"。
     * ==================================================================== */
    arc_shadow: {
      name: "不能被拍到的那一面",
      lede: "你有一半的人生没有记录。保住它，比往上爬更要紧。",
      priority: 58,
      cats: ["shady", "scandal"],
      gate: {
        any: [
          { minLev: 2 },
          { tracks: ["operative"] },
          { entries: ["operative"] }
        ]
      },
      stages: [
        {
          title: "社区里的钱庄",
          events: ["shady_shark", "shady_doctor"],
          maxMonths: 36
        },
        {
          title: "一份不该存在的档案",
          events: ["shady_file", "shady_union"],
          maxMonths: 48
        },
        {
          title: "钱进来之后，就洗不干净了",
          events: ["shady_launder"],
          maxMonths: 60
        },
        {
          title: "地下室没有编号的那一格",
          events: ["archive_get"],
          maxMonths: 48
        }
      ],
      endWhen: { minTier: 4 }
    },

    /* ======================================================================
     * 7. 党看上了你 —— 委任轨道的那条命：不是你参选，是别人选中你。
     *    优先级 64，高过 arc_spotlight(52) 与 arc_shadow(58) —— 一个已经在党内机器里的人，
     *    "党看上你"比"你先红了"更贴身。（能顶掉 ladder/spotlight，但顶不掉 archive(78)。）
     *    gate 只在委任轨道 / 体制内起点上开：这条线的第一幕是 prog_appoint（委任轨道专属），
     *    放别的轨道的人进来，只会看到一幕里唯一那一件时代事件 —— 那不是"党看上了你"。
     * ==================================================================== */
    arc_anointed: {
      name: "党看上了你",
      lede: "不是你去找位置，是位置来找你。代价是你得先答应一些事。",
      priority: 64,
      cats: ["political"],
      gate: {
        any: [
          { tracks: ["appointment"] },
          { entries: ["insider", "pro"] }
        ]
      },
      stages: [
        {
          title: "楼道里的一次谈话",
          /* 「轨道事件 + 时代事件」混写：prog_appoint 只有委任轨道抽得到，
             2008_lobby 是 2008 时代的"楼道谈话"，两类人、两种处境都有活的候选。
             （1960/1974 的同类时代事件已随 pre-1980 死内容清理。） */
          events: ["prog_appoint", "2008_lobby"],
          maxMonths: 48
        },
        {
          title: "你手里的候选人",
          events: ["prog_kingmaker", "prog_federal"],
          maxMonths: 60
        },
        {
          title: "听证会的传票",
          events: ["prog_senate"],
          maxMonths: 72
        },
        {
          title: "总统大选：你决定参选",
          events: ["prog_president"],
          maxMonths: 96
        }
      ],
      endWhen: { minTier: 5 }
    },

    /* ======================================================================
     * 8. 地下室的那一格 —— 优先级最高（78）。为什么它最优先：
     *    别的线都是"你想成为什么"，只有这条是"你以前做过什么"。
     *    前者可以等，后者不能 —— 它一旦开始，就该盖过所有野心。
     *    它编排的正好是引擎里现存的那条 archive 事件链，主线只负责把它推上来。
     * ==================================================================== */
    arc_archive: {
      name: "地下室的那一格",
      lede: "你忘了那件事。但那件事没有忘了你。",
      priority: 78,
      cats: ["scandal"],
      /* 门槛三个条件缺一不可：
       *   · 已经是官（archive 链的事件都是 tierMin 1，T0 的人根本抽不到）
       *   · 手里有过不干净的东西（lev ≥ 1，这条线的题材前提）
       *   · **那一格还没被翻开过**（doneIds 里没有 archive_get）
       * 第三条是关键：archive_get 是 unique，会在正常轮转里被提前抽走。如果它已经演过，
       * 这条线的第一幕就永远不可能再演 —— 引擎的"断链判死"会直接把整条线判掉，
       * 但它仍然会占着最高优先级去跟别的线抢一次"让位"，纯亏。所以干脆别当候选。
       * 反过来说：这条线只对"还没翻开那一格、但已经脏了手"的人开放 —— 这正是它要讲的人。 */
      gate: {
        all: [
          { minTier: 1 },
          { minLev: 1 },
          { cond: function (G) { return G.doneIds.indexOf("archive_get") < 0; } }
        ]
      },
      stages: [
        { title: "没有编号的那一格", events: ["archive_get"], maxMonths: 48 },
        { title: "有人在打听你", events: ["archive_bite"], maxMonths: 36 },
        {
          title: "那扇门后面的两个小时",
          events: ["archive_showdown"],
          maxMonths: 36
        },
        { title: "那件事的回执", events: ["archive_settle"], maxMonths: 36 }
      ],
      /* 唯一一处主线改数值：案子尘埃落定，人松一口气。+3 声望不改变任何结局判定，
         但它让"走完一条主线"这件事在数字上也有回响，而不是只写一行日志。 */
      onEnd: { rep: 3 }
    }

  });

  /* ==========================================================================
   * 优先级阶梯（改优先级之前先读这段）
   * --------------------------------------------------------------------------
   * 换线规则（engine/arc.js 的 canDisplace）：
   *   ① 新线优先级必须 ≥ 当前线 + balance.arc.switchMargin（默认 12）
   *      —— 高一点点不算数，否则两条同档的线会互相顶来顶去，一辈子都在开场。
   *   ② 新线的第一幕得真的推得动（不是时代/媒介/天花板都不合的那种）。
   *   ③ 还要跑够 balance.arc.switchAfterMonths（默认 24 个月）才有资格换。
   *
   * 所以下面这串数字要按"档"读，每档差 ≥12 才有意义：
   *    10  一级一级          所有人的底。别的线一来就让位。
   *    24  没有故事的那几年   能顶掉通用线。
   *    36  街上先有人        出身/起点决定的草根路。
   *    44  钱先到，人后到     资源决定的。
   *    52  聚光灯先来        声望决定的（中途成名也能接管）。
   *    58  不能被拍到的那一面 把柄/操盘轨道。
   *    64  党看上了你        委任轨道 / 党内机器，最贴近"体制内上升"。
   *    78  地下室的那一格     最高。过去找上门，盖过一切野心（一局只可能走一次）。
   *
   * 一条线走完 / 淡出之后有 cooldownMonths（默认 18 个月）的空窗，空窗期交给
   * 「静好岁月」。所以一局里能读到的线是**两三条**，不是一串清单。
   * ========================================================================== */
})();
