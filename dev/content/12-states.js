/* ============================================================================
 * CONTENT · 12-states.js
 * 出生州：当地选民有自己的政治倾向。
 *
 * 字段：
 *   lean       "D"（民主党地盘）/ "R"（共和党地盘）/ "S"（摇摆州）
 *   strength   1-3：略偏 / 明显倾向 / 铁票仓
 *   entryEffects  建角时应用的通用派系效果（与党派无关的"这个地方给你的人脉底色"）
 *
 * 州与党派的联动（引擎 confirmCreate 里算）：
 *   顺风（州倾向=你的党，且非摇摆）→ 建制派好感 +strength×5：党内机器认你
 *   逆风（州倾向≠你的党，且非摇摆）→ 建制派 -|wind|×4，基层 +|wind|×3：
 *     本党在这个州是少数派，机器帮不上你，但"少数派的同情"让你在基层更好使
 *   摇摆州 → 谁都不顺风：竞争最激烈（两党都往这里砸钱），但赢一次就是全国的焦点
 *
 * "反其道行之"的打法是内容侧的（identityBias + 事件）：
 *   深州逆风党 → civil/media 加权（反对者叙事自带版面）
 *   摇摆州     → 选举年事件波动大（事件侧写）
 * ==========================================================================*/

POTUS.define("state", {
  /* ---- 摇摆州：风险与聚光灯 ---- */
  OH: {
    name: "俄亥俄", lean: "S", strength: 0,
    desc: "谁赢俄亥俄谁赢白宫——两党都往这里砸钱，竞争最狠，赢一次全国瞩目",
    entryEffects: { rep: 3 }
  },
  FL: {
    name: "佛罗里达", lean: "S", strength: 0,
    desc: "退休社区与古巴移民与迪士尼：每一次选举都是一场飓风",
    entryEffects: { fac: { press: 5 } }
  },
  PA: {
    name: "宾夕法尼亚", lean: "S", strength: 0,
    desc: "费城的街头与阿巴拉契亚的河谷说着两种语言，你得当两种人都听得懂",
    entryEffects: { fac: { labor: 5 } }
  },

  /* ---- 深红：共和党的铁票仓 ---- */
  TX: {
    name: "得克萨斯", lean: "R", strength: 3,
    desc: "石油、牧场与一切都要大一号的自尊心；民主党在这里是长期的少数派",
    entryEffects: { fac: { commercial: 8, church: 5 } }
  },
  AL: {
    name: "亚拉巴马", lean: "R", strength: 3,
    desc: "圣经地带的心脏。星期天的讲坛比星期二的选票更有力量",
    entryEffects: { fac: { church: 10, base: 3 } }
  },

  /* ---- 深蓝：民主党的根据地 ---- */
  NY: {
    name: "纽约", lean: "D", strength: 3,
    desc: "华尔街与布朗克斯在同一座岛上互相需要；共和党在这里是长期的少数派",
    entryEffects: { fac: { commercial: 8, press: 5 } }
  },
  MA: {
    name: "马萨诸塞", lean: "D", strength: 3,
    desc: "宪法之前就有的政治传统；学院、律师与改良主义者的大本营",
    entryEffects: { attr: { INT: 3 }, fac: { establishment: 5 } }
  },
  CA: {
    name: "加利福尼亚", lean: "D", strength: 2,
    desc: "从旧金山到橙县，一条州际公路串起两个美国；民主党占优但内部各有山头",
    entryEffects: { fac: { tech: 8, base: 3 } }
  },

  /* ---- 温和倾向：可以翻盘的地方 ---- */
  GA: {
    name: "佐治亚", lean: "R", strength: 1,
    desc: "亚特兰大在长大，乡下的规矩没变；谁都说不好下一次选举它是什么颜色",
    entryEffects: { fac: { base: 5, church: 3 } }
  },
  MI: {
    name: "密歇根", lean: "D", strength: 1,
    desc: "汽车工会的故乡：流水线教会了这里的人怎么组织，也教会了他们什么叫被抛弃",
    entryEffects: { fac: { labor: 10 } }
  }
});
