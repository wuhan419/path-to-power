/* ============================================================================
 * CONTENT · 15-cards.js
 * v0.12 #20 · 开局天赋卡墙（《人生重开模拟器》式抽卡）。
 *
 * 玩法：开局按难度从卡池里呈现 offer(=12) 张，玩家选 picks 张（brutal 1 / hard 2 /
 *   normal 3 / easy 4 / legendary 5）。难度不再是"出身给多少钱"，而是"能选几张卡"——
 *   所以各档的开局资金全部搬进卡池（见 effects.fun 的钱卡），能不能拿到好牌看脸。
 *
 * 稀有度四档（rarity：白 1 / 蓝 2 / 紫 3 / 橙 4）；逐位独立掷（engine/core.js rollRarity）。
 *   橙卡受周目门槛（#31）：第 2 周目起进池（gacha.orangeLoop），第一周目最多抽到紫。
 *
 * ---- 数值标尺（v0.12 #20 收尾定稿，与建角自由点同一把尺）----
 *   1 单位 = +10 属性 = $2k 金钱（= 1 自由点，见 balance.freeAttrPerPoint / freeFunPerPoint · #36 定标）
 *   白 = 1 单位（+10 / $2k）　蓝 = 2 单位（+20 / $4k）
 *   紫 = 3 单位（+30 / $6k）　橙 = 4 单位（+40 / $8k 等价，多维合计）
 *   派系点、mods / crit / luck / hpDecay / voterDrift / spare 是卡的"风味与被动"，
 *   不占这把尺 —— 重标只动纯数值面（attr / fun），被动原样保留。
 *
 * 卡面字段分三类（消费点见 core.js / dice.js / stage.js / effects.js）：
 *   effects:{...}   入选即一次性结算（走 applyEffects，与事件效果同键：fun/rep/fac/attr/fav/count/flags…）；
 *   聚合字段        mods[]/critMul/critfailBoost/hpDecayMul/luckPct/voterDriftMul —— 持有即持续生效、多卡叠加；
 *   spare:["why"]   免死金牌（顶级橙卡）：命中致命结局理由时豁免一次、卡烧毁、进 G.spentCards 留痕。
 * 展示字段只有 name/desc 会被多语言覆盖（见 i18n/en/reg/15-cards.js）；其余都是结构键，不许翻。
 * ==========================================================================*/

/* ---------- 白（rarity 1）：1 单位 —— +10 属性 / $2k ---------- */
POTUS.define("card", {
  hometown: {
    rarity: 1, name: "老家帮衬", desc: "爸妈把压箱底的钱塞过来：开局资金 +$2k",
    effects: { fun: 2000 }
  },
  softie: {
    rarity: 1, name: "老好人", desc: "谁都念你的好、也信得过你，建制却嫌你耳根软：公信力+10 基层+8 建制-5",
    effects: { attr: { INTG: 10 }, fac: { base: 8, establishment: -5 } }
  },
  loudmouth: {
    rarity: 1, name: "大嘴巴", desc: "敢说敢聊，场面从来冷不了场，只是话越说越没人当真：魅力+10 公信力-10",
    effects: { attr: { CHA: 10, INTG: -10 } }
  },
  nerd: {
    rarity: 1, name: "做题家", desc: "智力检定吃加成，场面话说不利索：智力+10 魅力-10，智力判定小幅加成",
    effects: { attr: { INT: 10, CHA: -10 } }, mods: [{ src: "attr", key: "INT", w: 0.1 }]
  },
  churchkid: {
    rarity: 1, name: "教堂常客", desc: "教友网络稳、口碑正，大家把你的话当数：公信力+10 宗教+10 基层+5",
    effects: { attr: { INTG: 10 }, fac: { church: 10, base: 5 } }
  }
});

/* ---------- 蓝（rarity 2）：2 单位 —— +20 属性 / $4k ---------- */
POTUS.define("card", {
  orator_card: {
    rarity: 2, name: "天生演说家", desc: "魅力+20，魅力检定 +15%",
    effects: { attr: { CHA: 20 } }, mods: [{ src: "attr", key: "CHA", w: 0.15 }]
  },
  quant_card: {
    rarity: 2, name: "数字大脑", desc: "智力+20，智力检定 +15%，能提前察觉危机",
    effects: { attr: { INT: 20 } }, mods: [{ src: "attr", key: "INT", w: 0.15 }]
  },
  trust_fund: {
    rarity: 2, name: "信托基金", desc: "开局资金 +$4k，代价是浑身铜味、承诺越来越没人信：公信力-10",
    effects: { fun: 4000, attr: { INTG: -10 } }
  },
  union_kin: {
    rarity: 2, name: "工会世家", desc: "工会+20 基层+10 人情+1：一代人的动员底盘",
    effects: { fac: { labor: 20, base: 10 }, fav: 1 }
  },
  press_buddy: {
    rarity: 2, name: "记者缘", desc: "媒体好感高，报道总给你留面子：媒体+20，且吃媒体派系加成",
    effects: { fac: { press: 20 } }, mods: [{ src: "fac", key: "press", w: 0.25 }]
  },
  iron_stomach: {
    rarity: 2, name: "铁胃", desc: "健康衰减放缓，熬得住连轴转",
    hpDecayMul: 0.6
  },
  backroom: {
    rarity: 2, name: "幕后学徒", desc: "手腕老练，只是手段不太见光、台面话没人敢信：手腕+20 公信力-10，手腕判定小幅加成",
    effects: { attr: { CUN: 20, INTG: -10 } }, mods: [{ src: "attr", key: "CUN", w: 0.12 }]
  }
});

/* ---------- 紫（rarity 3）：3 单位 —— +30 属性 / $6k ---------- */
POTUS.define("card", {
  gambler_card: {
    rarity: 3, name: "赌徒直觉", desc: "大成功概率翻倍，大失败概率也翻倍",
    critMul: 2, critfailBoost: 2
  },
  koi: {
    rarity: 3, name: "锦鲤体", desc: "所有判定 Luck +5%：运气也是一种实力",
    luckPct: 5
  },
  old_money: {
    rarity: 3, name: "老钱家族", desc: "开局资金 +$6k，建制与华尔街同时为你开门（基层-10）",
    effects: { fun: 6000, fac: { establishment: 20, commercial: 15, base: -10 } }
  },
  silver_tongue: {
    rarity: 3, name: "魅力神选", desc: "魅力近乎拉满，起手声望就领先：魅力+30 声望+12",
    effects: { attr: { CHA: 30 }, rep: 12 }
  },
  magnetic: {
    rarity: 3, name: "草根磁石", desc: "选民黏着你、好感几乎不流失：基层+15 声望+5，选民漂移放缓",
    effects: { fac: { base: 15 }, rep: 5 }, voterDriftMul: -0.35
  }
});

/* ---------- 橙（rarity 4）：4 单位（多维合计 +40）—— 命卡，第 2 周目起进池 ---------- */
POTUS.define("card", {
  global_icon: {
    rarity: 4, name: "全球偶像", desc: "施瓦辛格／特朗普式：自带全国知名度，魅力+40 声望+45，建制却防着你",
    effects: { rep: 45, attr: { CHA: 40 }, fac: { base: 20, press: 15, establishment: -15 } }
  },
  half_god: {
    rarity: 4, name: "半神之躯", desc: "几样本事齐飞、连带人信誉都拉满，身体还不老：魅力/智力/手腕/公信力各+10，健康衰减极低",
    effects: { attr: { CHA: 10, INT: 10, CUN: 10, INTG: 10 } }, hpDecayMul: 0.25
  },
  destiny: {
    rarity: 4, name: "天命所归", desc: "运气＋实力＋贵人的顶配开局：Luck+10%、大成功率×1.5、人情+3、三属性各+10",
    luckPct: 10, critMul: 1.5, effects: { fav: 3, attr: { CHA: 10, INT: 10, CUN: 10 } }
  },
  immortal: {
    rarity: 4, name: "不死传奇", desc: "免死金牌：一次致命终局替你挡下（入狱/身败名裂/被封杀/被清洗/遇刺/被构陷/信用破产），随后这张卡烧毁",
    spare: ["prison", "disgrace", "ruined", "purged", "assassinated", "framed", "bankrupt"]
  }
});
