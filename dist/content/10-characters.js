/* ============================================================================
 * CONTENT · 10-characters.js
 * 建角内容：出身 / 天赋 / 起点路径。
 * 新增一项只需在对应对象里加一条，界面会自动多出一个选项。
 * ==========================================================================*/

/* ---------- 出身 ----------
 * 初始资源原则（v0.5.1 起按用户要求调整）：
 *   基础盘（balance.start*）压到"刚毕业的穷小子"：资金 $10k / 声望 0 / 人情 0。
 *   出身和起点在基础盘上"加出差距"——负数一律取消：穷人就是 0 或接近 0，
 *   不再出现开局负债 $-450k 这种"还没玩就欠一屁股债"的挫败开局。
 *   出身间的资金差距仍然拉开（世家 $1.2M vs 蓝领 $0），但下限是 0。
 * 负债本身仍被引擎允许（渲染层 fun<0 不夹取）——但只能"玩出来"，不能"生出来"。 */
POTUS.define("origin", {
  dynasty: {
    name: "政治世家", desc: "人脉+30 资金+120万 声望+8 人情+2；父辈阴影 被指靠爹",
    effects: { fac: { establishment: 30 }, fun: 1200000, rep: 8, fav: 2, flags: ["mentor"] }
  },
  immigrant: {
    name: "移民二代", desc: "韧性 基层+20 精力+10；白手起家（资金 0）建制-20",
    effects: { fac: { base: 20, establishment: -20 }, ap: 10 }
  },
  labor: {
    name: "蓝领工人", desc: "工会+40 基层+15 健康+10 人情+1；家无余财（资金 0）商业-25",
    effects: { fac: { labor: 40, base: 15, commercial: -25 }, hp: 10, fav: 1 }
  },
  elite: {
    name: "商学院/法学院精英", desc: "智力+15 商业+30 资金+40万；基层信任-15",
    effects: { attr: { INT: 15 }, fac: { commercial: 30, base: -15 }, fun: 400000 }
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
 */
POTUS.define("entry", {
  insider: {
    name: "直接入行", desc: "竞选志愿者/议员助理做起，党内台阶清晰，慢但稳",
    tier: 0, effects: { fac: { establishment: 10 } }
  },
  pro: {
    name: "专业起手", desc: "律师/教授/退役军官/医生，可空降州级门槛，缺党内根基",
    tier: 1, effects: { attr: { INT: 10 }, fac: { establishment: -10 } }
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
    name: "商界起手", desc: "创业/金融/房地产，资金爆炸，诚信与基层信任低",
    tier: 1, effects: { fun: 1500000, fac: { commercial: 25, base: -10 }, attr: { INTG: -10 } }
  },
  operative: {
    name: "幕僚起手", desc: "竞选经理/说客/党工，不直接参选，终点是幕后之王",
    tier: 0, track_suggest: "operative",
    effects: { fac: { establishment: 15 }, attr: { CUN: 10 } }
  }
});
