/* ============================================================================
 * CONTENT · 10-characters.js
 * 建角内容：出身 / 天赋 / 起点路径。
 * 新增一项只需在对应对象里加一条，界面会自动多出一个选项。
 * ==========================================================================*/

/* ---------- 出身 ----------
 * v0.12 #20 起：出身**不再发开局资金**——钱全部搬进天赋卡池（见 content/15-cards.js 的钱卡），
 *   难度改成"能抽几张卡"而不是"家里给多少钱"。出身只负责它最擅长的事：派系、声望、人情、标记。
 * 保留 v0.5.1 的原则：出身不做负数挫败开局；资金下限 0，只能"玩出来"不能"生出来"。
 * 原中文文件里的资金字段被删得只剩展示语（desc）与结构（effects），英文覆盖层同步只翻 name/desc。 */
POTUS.define("origin", {
  dynasty: {
    name: "政治世家", desc: "人脉+30 声望+8 人情+2；父辈阴影 被指靠爹（开局钱改由卡池给）",
    effects: { fac: { establishment: 30 }, rep: 8, fav: 2, flags: ["mentor"] }
  },
  immigrant: {
    name: "移民二代", desc: "韧性 基层+20；白手起家 建制-20",
    effects: { fac: { base: 20, establishment: -20 } }
  },
  labor: {
    name: "蓝领工人", desc: "工会+40 基层+15 人情+1；家无余财 商业-25",
    effects: { fac: { labor: 40, base: 15, commercial: -25 }, fav: 1 }
  },
  elite: {
    name: "商学院/法学院精英", desc: "商业+40 人情+2；基层信任-15（#37②：原「智力+15」换成派系与人情，属性只走自由点和卡池）",
    effects: { fav: 2, fac: { commercial: 40, base: -15 } }
  }
});

/* ---------- 天赋（灵根） ----------
 * mods：全局作用于所有判定的修正（叠加到每个选项上）
 * critMul：大成功概率倍率；critfailBoost：大失败概率倍率；hpDecayMul：健康衰减倍率
 */
POTUS.define("talent", {
  orator: { name: "天生演说家", desc: "魅力检定 +15%", mods: [{ src: "attr", key: "CHA", w: 0.15 }] },
  quant: { name: "数字大脑", desc: "智力检定 +15%，能提前察觉危机", mods: [{ src: "attr", key: "INT", w: 0.15 }] },
  radar: { name: "人心雷达", desc: "可见 NPC 真实意图标签", special: "radar" },
  palace: { name: "记忆宫殿", desc: "后果提示更准确，不易被骗", special: "palace" },
  stomach: { name: "铁胃", desc: "健康衰减减半", hpDecayMul: 0.5 },
  gambler: { name: "赌徒直觉", desc: "大成功概率翻倍，大失败概率也翻倍", critMul: 2, critfailBoost: 2 }
});

/* ---------- 起点路径 ----------
 * tier：开局层级；track_suggest：建议轨道（可在游戏中切换）
 * #37② 属性纪律：出身/起点/州/难度**一律不发魅力/智力/手腕** —— 可见属性只有
 *   两个来路：建角时的自由点（1 点 = +10）与天赋卡池（白+10/蓝+20/紫+30/橙+40）。
 *   旧口径下 normal 难度 = elite 出身 = INT+15、pro 起点再 +10、传奇难度再全属性 +5，
 *   三处都不在向导第 3 步的预览里，玩家把这一跳记成了"四年涨了 35 智力"。
 *   唯一的例外是**隐藏的诚信 INTG**（celebrity -15 / business -10）：它不在自由点
 *   分配位里、面板也不展示（v0.12 #20 撤下），且这两条只减不增 —— 它是"邪路人设"的
 *   代价，不是白送的起点。validate 把这条纪律钉成断言。
 */
POTUS.define("entry", {
  insider: {
    name: "直接入行", desc: "竞选志愿者/议员助理做起，党内台阶清晰，慢但稳",
    tier: 0, effects: { fac: { establishment: 10 } }
  },
  pro: {
    name: "专业起手", desc: "律师/教授/退役军官/医生，可空降州级门槛，缺党内根基；声望+8 人情+1",
    tier: 1, effects: { rep: 8, fav: 1, fac: { establishment: -10 } }
  },
  celebrity: {
    name: "名人起手", desc: "演员/网红/畅销书作者，声望高、诚信与建制低，川普式邪路",
    tier: 1, track_suggest: "celebrity",
    effects: { rep: 45, fac: { establishment: -30, base: 20 }, attr: { INTG: -15 } }
  },
  ngo: {
    name: "NGO 起手", desc: "人权/环保/工会/智库，议题资本+基层网络 人情+1；清贫（资金+0）",
    tier: 0, effects: { fac: { base: 25, labor: 15 }, fav: 1 }
  },
  business: {
    name: "商界起手", desc: "创业/金融/房地产，起手带一笔本金，诚信与基层信任低",
    /* #36 钱标尺（1 自由点 = +10 属性 = $2k）漏网之鱼：这里原本挂着 v0.5.2 时代的
       绝对额 `fun: 1500000` —— 折成新尺是 750 个自由点，够让学贷（65k）与「断供 20 月破产」
       在这一起点面前彻底失效。现按同一把尺收在 **4 单位 = $8k**（= 一张橙卡的钱，
       建角一次性资金的顶），代价仍由 INTG −10 与基层 −10 付。validate 钉住这条上限。 */
    tier: 1, effects: { fun: 8000, fac: { commercial: 25, base: -10 }, attr: { INTG: -10 } }
  },
  operative: {
    name: "幕僚起手", desc: "竞选经理/说客/党工，不直接参选，终点是幕后之王；人情+3 基层+10",
    tier: 0, track_suggest: "operative",
    effects: { fav: 3, fac: { establishment: 15, base: 10 } }
  }
});
