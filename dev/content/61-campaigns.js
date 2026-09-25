/* ============================================================================
 * CONTENT · 61-campaigns.js
 * 「竞选链」—— 每一次民选晋升都不是一锤子买卖，而是一连串事件。
 *
 * 引擎在 engine/campaign.js（单场制、一幕幕强制推进、选情跌破即崩盘、tier 只末幕授）。
 * 字段契约见 docs/CONTENT-SCHEMA.md 的"campaign"节。
 *
 * ---------- 一条竞选链长什么样 ----------
 *   office    这一场在选什么（界面显示）
 *   lede      一句话点题
 *   tier      目标级 = 末幕要抵达的那一级（= 起跳级 + 1）。末幕 prog_* 负责授级。
 *   gate      谁能开打这一场。用统一的 P.when 词汇（和事件门槛同一套）。
 *             ★ 竞选链按 tier+tenure 门控，**不锁 track** —— 各级民选台阶是所有轨道
 *               共用的晋升阶梯（委任/操盘/名人/财富轨道的自己那条里程碑另有 prog_*，
 *               不是选举，故不套竞选链）。
 *   meters    选情表。**momentum 的写法变了（#35①）：它不再是初值，而是这一场的"起步天花板"——
 *             真实初值由 engine 的 P.seedMomentum() 按身位/声望/基本盘/派系好感现算（起手 12—35），
             再与这里的声明值取小。想压低某场竞选的开局声势就调小它。
 *             warchest=竞选金库（仍是初值）：它只决定买不买得动广告，**不参与判负**。
 *   stages[]  一幕一幕。**每一幕都必须演出来**（不像主线可以跳幕）：
 *               event       这一幕的事件（末幕复用 60-progression.js 的 prog_*）
 *               final:true  标记投票日：演完这一场就按 tier 是否抵达目标判胜/败
 *               maxMonths   这一幕的窗口；窗口内始终没演出来 = 竞选拖垮 = 崩盘（LOST）
 *               metersDelta 演完这一幕后选情表的保底增减（代表"推进竞选本身的惯性"）
 *               abortBelow  这一幕结束时的闸门；**只写 momentum**（#35⑤：金库见底不判负，
 *                           钱退出胜负手）跌破即当场败选（区别于末幕掷骰落败）
 *   设计取向：**选情主要靠各幕事件自己的 outcomes 撬动**（事件里写 effects.camp）。
 *   这里只给一点惯性位移与少量崩盘闸，避免新手在第一场就 mid-campaign 出局。
 *
 * ---------- 规模随职级缩放（越往上、竞选越漫长）----------
 *   基层(council/city)  3 幕：宣布 → 基层动员 → 投票日
 *   州级(state/upper/stwide)  4 幕：宣布 → 初选 → 造势 → 投票日
 *   联邦/大位(federal/senate/vp)  5 幕：宣布 → 初选 → 筹款/辩论 → 摇摆 → 投票日
 *   总统(president)  6 幕：宣布 → 初选 → 提名 → 辩论 → 摇摆州 → 投票日
 * ==========================================================================*/
(function () {
  const P = POTUS;

  /* 竞选子系统的可调参数（引擎 campaign.js 读 balance.campaign；这里集中放内容侧数值） */
  POTUS.define("balance", {
    campaign: {
      meterDrift: 0.8,       // 每个平静月选情自然流失（注意力/金钱不续费就往下走）
      retryCooldown: 12,     // 败选后隔这么多个月才允许卷土重来（基层可重试时用）
      meterNames: { momentum: "选情", warchest: "金库" },
      /* #23 投放把柄：一次花几份料、两种靶各给多少甜头、大选靶多容易被翻出来。
         引擎侧（campaign.js dropCfg）有一模一样的兜底默认，这里只是把数值摆到明面。 */
      levDrop: {
        cost: 1,
        primaryWin: 15, primaryFail: 4,                  // 初选靶：对手退赛 / 没退
        generalWin: 9, generalBack: 3,                   // 大选靶：干净 / 被翻出来
        generalExpose: 0.45, exposePerIntg: 0.5,         // 暴露基线 −（INTG−50)/100 × 0.5
        dropoutPerCun: 0.25, dropoutPerDrop: 0.10,       // 退赛率 = 0.15 + 累计次数×0.10 +（CUN−50)/100×0.25
        repBack: -1.2, wrathBack: 12                     // 暴露的代价：声望 + dirty_trick/wrath_opposition 账本
      }
    }
  });

  POTUS.define("campaign", {

    /* ===== 等级1 → 2：第一次把名字放上选票（社区/地方）===== */
    camp_council: {
      office: "地方公职（初选）",
      lede: "第一次有人认真地说：把你的名字印在选票上。",
      tier: 1,
      retryable: true,          // 基层选败了来年可以再战（末幕 prog_council unique:false）
      gate: { tierRaw: true, tierMin: 0, tierMax: 0, minTenure: 8 },
      meters: { momentum: 45 },
      stages: [
        { event: "camp_council_announce", title: "宣布参选", maxMonths: 5, metersDelta: { momentum: 4 } },
        { event: "camp_council_grassroots", title: "挨家挨户", maxMonths: 5, metersDelta: { momentum: 4 } },
        { event: "prog_council", title: "投票日", final: true, maxMonths: 8 }
      ]
    },

    /* ===== 等级2 → 3：第一个真正的公职（市议员）===== */
    camp_city: {
      office: "市议员",
      lede: "从义务帮忙到握有一张实票，中间隔着一场真刀真枪的竞选。",
      tier: 2,
      retryable: true,          // prog_city unique:false，市政席位年年有
      gate: { tierRaw: true, tierMin: 1, tierMax: 1, minTenure: 10 },
      meters: { momentum: 45 },
      stages: [
        { event: "camp_city_announce", title: "签下参选表格", maxMonths: 5, metersDelta: { momentum: 4 } },
        { event: "camp_city_townhall", drop: "general",   /* #23：这一幕可投放把柄（打对手阵营：吃 INTG 反噬检定） */ title: "市政厅辩论会", maxMonths: 5, metersDelta: { momentum: 5 } },
        { event: "prog_city", title: "投票日", final: true, maxMonths: 8 }
      ]
    },

    /* ===== 等级3 → 4：进州议会（州众议员）===== */
    camp_state: {
      office: "州众议员",
      lede: "选区从一条街变成一个县，竞选第一次需要一台机器。",
      tier: 3,
      gate: { tierRaw: true, tierMin: 2, tierMax: 2, minTenure: 12 },
      meters: { momentum: 45 },
      stages: [
        { event: "camp_state_announce", title: "宣布竞选州议会", maxMonths: 5, metersDelta: { momentum: 4 } },
        { event: "camp_state_primary", drop: "primary",   /* #23：这一幕可投放把柄（打党内同僚：掷对手退赛） */ title: "党内初选", maxMonths: 6, metersDelta: { momentum: 5 }, abortBelow: { momentum: 10 }   /* #35①：闸门随低起步种子下移（旧 16/18 是按写死 45 标定的） */ },
        { event: "camp_state_rally", drop: "general",   /* #23：这一幕可投放把柄（打对手阵营：吃 INTG 反噬检定） */ title: "选战造势", maxMonths: 5, metersDelta: { momentum: 5 } },
        { event: "prog_state", title: "投票日", final: true, maxMonths: 8 }
      ]
    },

    /* ===== 等级4 → 5：州参议院 ===== */
    camp_upper: {
      office: "州参议员",
      lede: "州议会的上半院，席位更少，赌注更大。",
      tier: 4,
      gate: { tierRaw: true, tierMin: 3, tierMax: 3, minTenure: 18 },
      meters: { momentum: 45 },
      stages: [
        { event: "camp_upper_announce", title: "瞄准参议院席位", maxMonths: 5, metersDelta: { momentum: 4 } },
        { event: "camp_upper_primary", drop: "primary",   /* #23：这一幕可投放把柄（打党内同僚：掷对手退赛） */ title: "初选对决", maxMonths: 6, metersDelta: { momentum: 5 }, abortBelow: { momentum: 10 }   /* #35①：闸门随低起步种子下移（旧 16/18 是按写死 45 标定的） */ },
        { event: "camp_upper_rally", drop: "general",   /* #23：这一幕可投放把柄（打对手阵营：吃 INTG 反噬检定） */ title: "巡回拉票", maxMonths: 5, metersDelta: { momentum: 5 } },
        { event: "prog_upper", title: "投票日", final: true, maxMonths: 8 }
      ]
    },

    /* ===== 等级5 → 6：全州公职（州级大员）===== */
    camp_stwide: {
      office: "全州公职",
      lede: "第一次要向整个州自我介绍。",
      tier: 5,
      gate: { tierRaw: true, tierMin: 4, tierMax: 4, minTenure: 20 },
      meters: { momentum: 45 },
      stages: [
        { event: "camp_stwide_announce", title: "全州性宣告", maxMonths: 5, metersDelta: { momentum: 4 } },
        { event: "camp_stwide_convention", drop: "primary",   /* #23：这一幕可投放把柄（打党内同僚：掷对手退赛） */ title: "州党代表大会", maxMonths: 6, metersDelta: { momentum: 5 }, abortBelow: { momentum: 10 }   /* #35①：闸门随低起步种子下移（旧 16/18 是按写死 45 标定的） */ },
        { event: "camp_stwide_media", drop: "general",   /* #23：这一幕可投放把柄（打对手阵营：吃 INTG 反噬检定） */ title: "打响 statewide 知名度", maxMonths: 6, metersDelta: { momentum: 5 } },
        { event: "prog_stwide", title: "投票日", final: true, maxMonths: 8 }
      ]
    },

    /* ===== 等级6 → 7：联邦众议员（★ DEMO 胜利线）===== */
    camp_federal: {
      office: "联邦众议员",
      lede: "通往国会的那一跳：初选、金钱、和一块真正属于你的全国版图。",
      tier: 6,
      gate: { tierRaw: true, tierMin: 5, tierMax: 5, minTenure: 24 },
      meters: { momentum: 45, warchest: 30 },
      stages: [
        { event: "camp_federal_announce", title: "宣布角逐国会席位", maxMonths: 5, metersDelta: { momentum: 4 } },
        { event: "camp_federal_primary", drop: "primary",   /* #23：这一幕可投放把柄（打党内同僚：掷对手退赛） */ title: "国会初选", maxMonths: 6, metersDelta: { momentum: 5 }, abortBelow: { momentum: 10 }   /* #35①：闸门随低起步种子下移（旧 16/18 是按写死 45 标定的） */ },
        { event: "camp_federal_money", title: "筹款与金主", maxMonths: 6, metersDelta: { momentum: 4 }, /* #35⑤：金库闸已删——钱见底只是买不动广告，不判败选 */ },
        { event: "camp_federal_swing", drop: "general",   /* #23：这一幕可投放把柄（打对手阵营：吃 INTG 反噬检定） */ title: "摇摆选区的最后一周", maxMonths: 6, metersDelta: { momentum: 6 }, abortBelow: { momentum: 12 } },
        { event: "prog_federal", title: "投票日 · 决战国会", final: true, maxMonths: 8 }
      ]
    },

    /* ===== 等级7 → 8：联邦参议员 / 州长 ===== */
    camp_senate: {
      office: "联邦参议员 / 州长",
      lede: "一场覆盖全州的选举，一支真正的竞选机器。",
      tier: 7,
      gate: { tierRaw: true, tierMin: 6, tierMax: 6, minTenure: 28 },
      meters: { momentum: 45, warchest: 35 },
      stages: [
        { event: "camp_senate_announce", title: "宣布竞逐大位", maxMonths: 5, metersDelta: { momentum: 4 } },
        { event: "camp_senate_primary", drop: "primary",   /* #23：这一幕可投放把柄（打党内同僚：掷对手退赛） */ title: "全州初选", maxMonths: 6, metersDelta: { momentum: 5 }, abortBelow: { momentum: 10 }   /* #35①：闸门随低起步种子下移（旧 16/18 是按写死 45 标定的） */ },
        { event: "camp_senate_debate", drop: "general",   /* #23：这一幕可投放把柄（打对手阵营：吃 INTG 反噬检定） */ title: "电视辩论", maxMonths: 6, metersDelta: { momentum: 5 }, abortBelow: { momentum: 12 } },
        { event: "camp_senate_swing", drop: "general",   /* #23：这一幕可投放把柄（打对手阵营：吃 INTG 反噬检定） */ title: "争夺摇摆地区", maxMonths: 6, metersDelta: { momentum: 6 }, /* #35⑤：同上，只留 momentum 线 */ },
        { event: "prog_senate", title: "投票日", final: true, maxMonths: 8 }
      ]
    },

    /* ===== 等级8 → 9：副总统 / 总统候选人 ===== */
    camp_vp: {
      office: "副总统 / 总统候选人",
      lede: "你不再为自己竞选，你是一整张竞选海报上的另一半。",
      tier: 8,
      gate: { tierRaw: true, tierMin: 7, tierMax: 7, minTenure: 34 },
      meters: { momentum: 45, warchest: 40 },
      stages: [
        { event: "camp_vp_announce", title: "进入候选视野", maxMonths: 5, metersDelta: { momentum: 4 } },
        { event: "camp_vp_vetting", drop: "primary",   /* #23：这一幕可投放把柄（打党内同僚：掷对手退赛） */ title: "背景审查与试探", maxMonths: 6, metersDelta: { momentum: 4 }, abortBelow: { momentum: 10 }   /* #35①：闸门随低起步种子下移（旧 16/18 是按写死 45 标定的） */ },
        { event: "camp_vp_convention", drop: "primary",   /* #23：这一幕可投放把柄（打党内同僚：掷对手退赛） */ title: "全国代表大会", maxMonths: 6, metersDelta: { momentum: 6 }, abortBelow: { momentum: 12 } },
        { event: "camp_vp_campaign", drop: "general",   /* #23：这一幕可投放把柄（打对手阵营：吃 INTG 反噬检定） */ title: "为全国助选奔走", maxMonths: 6, metersDelta: { momentum: 5 } },
        { event: "prog_vp", title: "点名日", final: true, maxMonths: 8 }
      ]
    },

    /* ===== 等级9 → 10：总统（火箭线破格才可在 8 年切片内触及）===== */
    camp_president: {
      office: "总统",
      lede: "世界上最漫长的一场竞选。",
      tier: 9,
      /* M3 一次性门：走出过白宫的人这一局不再回到那张选票上。
         连任在 camp_reelect 里解决；败选/弹劾之后再"东山再起"会绕过 22 修正案，
         也会让 presidency.js 的届数账本（term/termStart）失去意义。 */
      gate: { tierRaw: true, tierMin: 8, tierMax: 8, minTenure: 40, notFlags: ["president_left"] },
      meters: { momentum: 45, warchest: 45 },
      stages: [
        { event: "camp_pres_announce", title: "宣布竞选总统", maxMonths: 5, metersDelta: { momentum: 4 } },
        { event: "camp_pres_primary", drop: "primary",   /* #23：这一幕可投放把柄（打党内同僚：掷对手退赛） */ title: "各州初选连胜", maxMonths: 7, metersDelta: { momentum: 5 }, abortBelow: { momentum: 10 }   /* #35①：闸门随低起步种子下移（旧 16/18 是按写死 45 标定的） */ },
        { event: "camp_pres_nomination", drop: "primary",   /* #23：这一幕可投放把柄（打党内同僚：掷对手退赛） */ title: "锁定党内提名", maxMonths: 6, metersDelta: { momentum: 6 }, abortBelow: { momentum: 12 } },
        { event: "camp_pres_debate", drop: "general",   /* #23：这一幕可投放把柄（打对手阵营：吃 INTG 反噬检定） */ title: "总统电视辩论", maxMonths: 6, metersDelta: { momentum: 5 }, abortBelow: { momentum: 12 } },
        { event: "camp_pres_swing", drop: "general",   /* #23：这一幕可投放把柄（打对手阵营：吃 INTG 反噬检定） */ title: "摇摆州的最后冲刺", maxMonths: 6, metersDelta: { momentum: 6 }, /* #35⑤：同上，只留 momentum 线 */ },
        { event: "prog_president", title: "投票日 · 问鼎白宫", final: true, maxMonths: 8 }
      ]
    },

    /* ===== #21 M2：在任者的两条选举线 ==============================
     * 总统已经在 tierMax，「目标级 = 现级 + 1」这条硬闸对他必然不成立 —— 所以这两条链
     * 不假造第十级，而是声明 incumbent + winKind:"retain"（引擎侧见 campaign.js）：
     *   · 档期由日历外的事定开（presidency.js 按届内月序置 G.pres.raceDue），
     *     gate 的 cond 就只认那一个字，于是"该打这场了"与"你恰好想打"分开表达；
     *   · 胜负不看 tier（人就在顶上），改由末幕胜局 outcome 盖 def.winFlag 那面旗；
     *   · 连任赢 → term++ 进第二届；输 → 末幕自己写 fall:1 下野（复用既有软 BE，不判死）；
     *   · 中期链不动总统本人的位：它选的是国会，账记在派系/支持率/清算池上。
     * 两场的 ctx 按届记（campaign.js incCtx），所以第二届还能再打一次中期。 */
    camp_reelect: {
      office: "总统连任",
      lede: "现任者的对手从来不只在对岸——还有自己这四年的账。",
      tier: 9,
      incumbent: true,
      winKind: "retain",
      winFlag: "pres_re_elected",
      gate: {
        tierRaw: true, tierMin: 9, tierMax: 9,
        cond: function (G) { return !!(G.pres && G.pres.raceDue === "reelect"); }
      },
      meters: { momentum: 45, warchest: 50 },
      stages: [
        { event: "camp_re_announce", title: "宣布寻求连任", maxMonths: 3, metersDelta: { momentum: 4 } },
        { event: "camp_re_primary", drop: "primary",   /* #23：党内挑战者 */ title: "党内的挑战者", maxMonths: 4, metersDelta: { momentum: 5 }, abortBelow: { momentum: 10 } },
        { event: "camp_re_debate", drop: "general",   /* #23：老对手再上一次台 */ title: "第二次电视辩论", maxMonths: 4, metersDelta: { momentum: 5 }, abortBelow: { momentum: 12 } },
        { event: "prog_reelect", title: "投票日 · 连任", final: true, maxMonths: 6 }
      ]
    },

    camp_midterm: {
      office: "中期选举（守住国会）",
      lede: "两年一验货：选民不问你下一任想干什么，只问这两年干成了什么。",
      tier: 9,
      incumbent: true,
      winKind: "retain",
      winFlag: "pres_midterm_hold",
      gate: {
        tierRaw: true, tierMin: 9, tierMax: 9,
        cond: function (G) { return !!(G.pres && G.pres.raceDue === "midterm"); }
      },
      meters: { momentum: 40, warchest: 40 },
      stages: [
        { event: "camp_mt_agenda", title: "党团要一个交代", maxMonths: 3, metersDelta: { momentum: 4 } },
        { event: "camp_mt_rally", drop: "general",   /* #23：把矛头对准谁，决定这波水花 */ title: "全国助选", maxMonths: 4, metersDelta: { momentum: 5 }, abortBelow: { momentum: 10 } },
        { event: "prog_midterm", title: "投票日 · 中期", final: true, maxMonths: 6 }
      ]
    }

  });
})();
