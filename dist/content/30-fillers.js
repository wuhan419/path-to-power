/* ============================================================================
 * CONTENT · 30-fillers.js
 * 事件池耗尽时的填充模板，保证「事件永不枯竭」。
 * 每个时代一个包；"*" 是所有时代的兜底包。
 * 支持两种写法：① 声明式对象（topics/acts/bodyTpl/choices）
 *              ② 函数 (POTUS, G) => event（完全自由）
 * ==========================================================================*/
(function () {
  /* 本地小工具：快速构造一组通用选项（仅是内容的写法糖，不属于引擎） */
  function C(id, text, attrKey, good, bad) {
    return {
      id: id, text: text, base: 0.5, mods: [{ src: "attr", key: attrKey, w: 0.5 }],
      outcomes: {
        crit: { body: good + "，而且处理得滴水不漏。", effects: { rep: 5, fac: { base: 8 } } },
        ok: { body: good + "。", effects: { rep: 2, fac: { base: 4 } } },
        meh: { body: "勉强过关，但留下了后患。", effects: { rep: 1, fac: { base: -3 } } },
        fail: { body: bad + "。", effects: { rep: -2, fac: { base: -5 } } },
        critfail: { body: bad + "，而且被公开曝光。", effects: { rep: -5, fac: { press: -6 }, flags: ["scandal_1"] } }
      }
    };
  }

  POTUS.define("filler", {
    "2008_CRASH": {
      topics: ["一场市政债违约", "一笔可疑的救助款", "一次工会罢工", "一份被删的邮件", "一场空壳公司并购", "一次监管套利", "一份虚高的评级报告"],
      acts: ["你被卷进", "你收到线报：", "对手挖出：", "媒体追问：", "党内要求你表态："],
      bodyTpl: "{act}{topic}。你必须在聚光灯下做出选择。",
      choices: [
        C("a", "高调处理，抢占道德高地", "CHA", "你化险为夷，声望小涨", "弄巧成拙"),
        C("b", "低调摆布，用关系解决", "CUN", "手腕尽显，暗中被称道", "关系没兜住"),
        C("c", "甩锅给下属，保全自己", "INT", "你干净脱身，但团队离心", "甩锅失败，众叛亲离")
      ]
    },
    /* 1960_CAMELOT / 1974_WATERGATE 填充包已随其 era 定义一并移入 deprecated/snapshots/30-fillers.js（冻结）。 */
    "*": {
      topics: ["一桩地方丑闻", "一笔说不清的款项", "一次人事任命争议", "一场媒体风波"],
      acts: ["你被卷进", "你收到线报：", "对手挖出：", "媒体追问："],
      bodyTpl: "{act}{topic}。你必须在聚光灯下做出选择。",
      choices: [
        C("a", "高调处理，抢占道德高地", "CHA", "你化险为夷", "弄巧成拙"),
        C("b", "低调摆布，用关系解决", "CUN", "手腕尽显", "关系没兜住")
      ]
    }
  });
})();
