/* ============================================================================
 * CONTENT · 14-offices.js
 * 职位名表：状态面板"职位卡"用（engine/render.js 的 P.officeName 查这里）。
 * 键 = "track_tier"；查不到就退到 "*_tier"，再查不到用 officeFallback。
 *
 * 晋升线共 10 级（tier 0..9，界面显示「等级 1..10」）。职位名参考真实政治人物履历：
 *   选举轨道：志愿者 → 地方党职/学区 → 市议员 → 州众 → 州参 → 全州公职 → 联邦众议员
 *             →（胜利线，1988 前）联邦参议员/州长 → 副总统/总统候选人 → 总统
 *   委任轨道：文员 → 分析师 → 幕僚长 → 州厅局 → 联邦机构 → 内阁 → 白宫高层 → 顶点
 *   名人轨道：地方熟脸 → 专栏 → 全国评论员 → 家喻户晓 → 素人新星 → 候选人 → 总统
 *   操盘轨道：志愿者 → 竞选助理 → 操盘手 → 竞选经理 → 全国操盘 → 造王者 → 幕后顶点
 *   财富轨道：店主 → 企业主 → 州级企业家 → 商界领袖 → 大鳄 → 资本巨擘 → 买下棋盘的人
 * ==========================================================================*/
POTUS.define("balance", {
  officeFallback: [
    "无名之辈", "圈内人", "地方官员", "地方资深", "州级新人",
    "州级人物", "联邦官员", "全国性人物", "重量级人物", "权力顶点"
  ]
});

/* ---------- 职位月薪表（美元/月）----------
 * 参考真实数字换算成月（服务游戏平衡）：
 *   联邦众议员/参议员年薪 $174k ≈ $14.5k/月；州长 $12-20k/月；总统 $400k/年 ≈ $33k/月；
 *   州议员 $3-10k/月；市议员多为兼职津贴；幕僚/委任按对应级别打折（是他们雇的人）。
 * 名人/财富线的"工资"是版税与分红，波动大（另走 funChance）。T0 志愿者 $1k——靠信念活着。
 * 每轨道严格单调不降（engine 投注汇率按身位单调校验，见 validate.js）。 */
POTUS.define("officeSalary", {
  /* 选举轨道 */
  electoral_0: 1000, electoral_1: 1500, electoral_2: 2500, electoral_3: 4000, electoral_4: 6000,
  electoral_5: 8000, electoral_6: 14500, electoral_7: 17000, electoral_8: 25000, electoral_9: 33000,
  /* 委任轨道（官僚薪级） */
  appointment_0: 1500, appointment_1: 2500, appointment_2: 4000, appointment_3: 7000, appointment_4: 10000,
  appointment_5: 14000, appointment_6: 17000, appointment_7: 20000, appointment_8: 25000, appointment_9: 33000,
  /* 名人轨道：曝光折现 */
  celebrity_0: 1000, celebrity_1: 2500, celebrity_2: 5000, celebrity_3: 10000, celebrity_4: 18000,
  celebrity_5: 30000, celebrity_6: 45000, celebrity_7: 60000, celebrity_8: 80000, celebrity_9: 100000,
  /* 操盘轨道：别人赢了你才有肉吃 */
  operative_0: 1200, operative_1: 2000, operative_2: 3500, operative_3: 6000, operative_4: 9000,
  operative_5: 13000, operative_6: 18000, operative_7: 24000, operative_8: 30000, operative_9: 40000,
  /* 财富轨道：月薪是零花钱，真正的钱在生意里（funChance/利息） */
  wealth_0: 1500, wealth_1: 3000, wealth_2: 6000, wealth_3: 12000, wealth_4: 20000,
  wealth_5: 35000, wealth_6: 55000, wealth_7: 80000, wealth_8: 120000, wealth_9: 200000,
  /* 通配（miss 时） */
  "*_0": 1200, "*_1": 2000, "*_2": 3500, "*_3": 7000, "*_4": 12000,
  "*_5": 16000, "*_6": 20000, "*_7": 26000, "*_8": 33000, "*_9": 45000
});
POTUS.define("office", {
  /* ---------- 选举轨道：经典台阶 ---------- */
  "electoral_0": "社区竞选办志愿者",
  "electoral_1": "地方党务干部 · 学区委员",
  "electoral_2": "市议员",
  "electoral_3": { name: "州众议员" },
  "electoral_4": { name: "州参议员" },
  "electoral_5": { name: "全州公职 · 州检察官" },
  "electoral_6": { name: "联邦众议员" },
  "electoral_7": { name: "联邦参议员 / 州长" },
  "electoral_8": { name: "副总统 / 总统候选人" },
  "electoral_9": { name: "总统" },

  /* ---------- 委任轨道：专业官僚 ---------- */
  "appointment_0": "机构初级文员",
  "appointment_1": "政策分析师",
  "appointment_2": "委员会幕僚长",
  "appointment_3": { name: "州厅局长" },
  "appointment_4": { name: "州内阁成员" },
  "appointment_5": { name: "联邦机构主管" },
  "appointment_6": { name: "内阁部长" },
  "appointment_7": { name: "白宫幕僚长 / 国家安全顾问" },
  "appointment_8": { name: "副总统" },
  "appointment_9": { name: "总统" },

  /* ---------- 名人轨道：名气即选票 ---------- */
  "celebrity_0": "地方电台的熟脸",
  "celebrity_1": "社区意见领袖",
  "celebrity_2": "报刊专栏作者",
  "celebrity_3": { name: "地方媒体名嘴" },
  "celebrity_4": { name: "全国性评论员" },
  "celebrity_5": { name: "家喻户晓的名人" },
  "celebrity_6": { name: "舆论领袖" },
  "celebrity_7": { name: "政治素人新星" },
  "celebrity_8": { name: "大选候选人" },
  "celebrity_9": { name: "总统" },

  /* ---------- 操盘轨道：让别人赢的人 ---------- */
  "operative_0": "无名竞选志愿者",
  "operative_1": "竞选团队助理",
  "operative_2": "地方党机器操盘手",
  "operative_3": { name: "竞选经理" },
  "operative_4": { name: "州党执行主任" },
  "operative_5": { name: "全国竞选操盘" },
  "operative_6": { name: "总统竞选总顾问" },
  "operative_7": { name: "白宫高层幕僚" },
  "operative_8": { name: "党内大老 · 造王者" },
  "operative_9": { name: "幕后权力顶点" },

  /* ---------- 财富轨道：用钱说话 ---------- */
  "wealth_0": "小镇店主",
  "wealth_1": "地方企业主",
  "wealth_2": "行业协会头面",
  "wealth_3": { name: "州级企业家" },
  "wealth_4": { name: "全国商界新星" },
  "wealth_5": { name: "商界领袖" },
  "wealth_6": { name: "金融 / 地产大鳄" },
  "wealth_7": { name: "超级富豪" },
  "wealth_8": { name: "资本巨擘" },
  "wealth_9": { name: "买下棋盘的人" },

  /* ---------- 通配：只看层级（track 表没覆盖时用） ---------- */
  "*_0": "无名之辈",
  "*_1": "圈内人",
  "*_2": "地方官员",
  "*_3": { name: "地方资深" },
  "*_4": { name: "州级新人" },
  "*_5": { name: "州级人物" },
  "*_6": { name: "联邦官员" },
  "*_7": { name: "全国性人物" },
  "*_8": { name: "重量级人物" },
  "*_9": { name: "权力顶点" }
});
