/* ============================================================================
 * CONTENT · 05-categories.js
 * 事件「类型」（category）与「量级」（grade）的定义。
 *
 * 为什么要分类：
 *   1) 每个类型自带一张默认配图 + 一套配色。具体事件可以写 ev.art 出专属图；
 *      没写就用类型的默认图 —— 于是「多写一个事件」不必再多画一张图。
 *   2) 类型是给「分配任务」用的：一个时代、一个类型，可以单独包给一个人去写。
 *      新建事件只要填 category，界面就自动有对应配图和标签。
 *
 * 新增一个类型：在下面 define("category", {...}) 里加一条即可，引擎自动接纳。
 * 新增一个量级：改 define("grade", {...})（一般不需要）。
 *
 * art(ev, P, ctx) 里可用：
 *   ctx.ink / ctx.base     该类型的主色与底色
 *   ctx.caption(ev, ink)   画一条底部标题带（报纸图片说明的样式）
 *   P.artFrame(inner, ink, base)  把任意图形包成 120×120 的 SVG 外框
 *   ev.title / ev.month 等事件字段，可用来做「同一类型不同花样」
 * ==========================================================================*/
(function () {
  const P = POTUS;

  /* 把「画什么」包成「一个类型的 art 函数」：自动套外框 + 底部标题带 */
  function art(draw) {
    return function (ev, PP, ctx) {
      return PP.artFrame(draw(ev, ctx.ink) + ctx.caption(ev, ctx.ink), ctx.ink, ctx.base);
    };
  }
  /* 每个 draw 函数拿到 ink（主色），返回 SVG 片段。图形只占上半部，
     下半部（y>99）留给底部标题带。 */

  POTUS.define("category", {
    /* 综合 / 没分类的事件都落在这里 */
    general: {
      name: "综合", ink: "#3a4a63", base: "#e8e2d2",
      art: art(function (ev, ink) {
        return '<rect x="20" y="26" width="80" height="7" fill="' + ink + '" opacity=".75"/>' +
          '<rect x="20" y="44" width="58" height="4" fill="' + ink + '" opacity=".45"/>' +
          '<rect x="20" y="56" width="70" height="4" fill="' + ink + '" opacity=".32"/>' +
          '<rect x="20" y="68" width="46" height="4" fill="' + ink + '" opacity=".32"/>';
      })
    },

    /* 仕途：晋升、选举、任命 */
    career: {
      name: "仕途", ink: "#2f4f6b", base: "#dde6ef",
      art: art(function (ev, ink) {
        return '<path d="M18 90h22V72h22V54h22V36h18" fill="none" stroke="' + ink + '" stroke-width="4"/>' +
          '<circle cx="102" cy="34" r="7" fill="' + ink + '"/>';
      })
    },

    /* 党务：立法、党内博弈、游说 */
    political: {
      name: "党务", ink: "#6b3a2a", base: "#ece0d6",
      art: art(function (ev, ink) {
        return '<rect x="30" y="30" width="58" height="17" rx="5" fill="' + ink + '" opacity=".85" transform="rotate(-24 60 38)"/>' +
          '<rect x="52" y="54" width="18" height="30" fill="' + ink + '" opacity=".55"/>' +
          '<rect x="28" y="84" width="64" height="9" fill="' + ink + '" opacity=".7"/>';
      })
    },

    /* 政务 / 选民服务：日常公务、选民接待、剪彩致辞、市政厅会议——
       量级小、权重低、主吃 voters（warm/diehard↑、oppose↓）。见 content/events/111-chores.js。 */
    govt: {
      name: "政务", ink: "#4a4a2f", base: "#e9e6d3",
      art: art(function (ev, ink) {
        return '<path d="M22 44L60 24l38 20z" fill="' + ink + '" opacity=".8"/>' +
          '<rect x="26" y="46" width="68" height="4" fill="' + ink + '" opacity=".8"/>' +
          '<rect x="32" y="52" width="6" height="26" fill="' + ink + '" opacity=".55"/>' +
          '<rect x="48" y="52" width="6" height="26" fill="' + ink + '" opacity=".55"/>' +
          '<rect x="66" y="52" width="6" height="26" fill="' + ink + '" opacity=".55"/>' +
          '<rect x="82" y="52" width="6" height="26" fill="' + ink + '" opacity=".55"/>' +
          '<rect x="24" y="80" width="72" height="6" fill="' + ink + '" opacity=".7"/>';
      })
    },

    /* 舆论：媒体、辩论、社交网络 */
    media: {
      name: "舆论", ink: "#255346", base: "#dbe8e1",
      art: art(function (ev, ink) {
        return '<rect x="20" y="26" width="80" height="48" fill="none" stroke="' + ink + '" stroke-width="3"/>' +
          '<rect x="30" y="38" width="58" height="7" fill="' + ink + '" opacity=".55"/>' +
          '<rect x="30" y="52" width="38" height="6" fill="' + ink + '" opacity=".35"/>' +
          '<rect x="56" y="74" width="8" height="10" fill="' + ink + '" opacity=".5"/>' +
          '<rect x="40" y="84" width="40" height="6" fill="' + ink + '" opacity=".7"/>';
      })
    },

    /* 丑闻：调查、传票、曝光 */
    scandal: {
      name: "丑闻", ink: "#7a1f1f", base: "#f1dcdb",
      art: art(function (ev, ink) {
        return '<circle cx="52" cy="52" r="26" fill="none" stroke="' + ink + '" stroke-width="5"/>' +
          '<rect x="74" y="72" width="32" height="8" rx="3" fill="' + ink + '" transform="rotate(45 74 76)"/>' +
          '<path d="M40 52l10-8v14l10-12" fill="none" stroke="' + ink + '" stroke-width="3" opacity=".7"/>';
      })
    },

    /* 金钱：金主、献金、做空、基金会 */
    finance: {
      name: "金钱", ink: "#6b5719", base: "#f0e8cf",
      art: art(function (ev, ink) {
        return '<ellipse cx="50" cy="80" rx="28" ry="9" fill="' + ink + '" opacity=".5"/>' +
          '<ellipse cx="50" cy="68" rx="28" ry="9" fill="' + ink + '" opacity=".68"/>' +
          '<ellipse cx="50" cy="56" rx="28" ry="9" fill="' + ink + '" opacity=".85"/>' +
          '<rect x="48" y="30" width="5" height="20" fill="' + ink + '" opacity=".85"/>';
      })
    },

    /* 私情：越界、家庭、把柄 */
    romance: {
      name: "私情", ink: "#7a2f5f", base: "#efdcea",
      art: art(function (ev, ink) {
        return '<path d="M60 90S24 68 24 47a18 18 0 0 1 36-7 18 18 0 0 1 36 7c0 21-36 43-36 43z" ' +
          'fill="' + ink + '" opacity=".55"/>' +
          '<path d="M94 30l10 10M104 30l-10 10" stroke="' + ink + '" stroke-width="3" opacity=".6"/>';
      })
    },

    /* 民权与社会运动 */
    civil: {
      name: "民权", ink: "#2f6b3a", base: "#dcead8",
      art: art(function (ev, ink) {
        return '<rect x="14" y="82" width="92" height="6" fill="' + ink + '" opacity=".7"/>' +
          '<path d="M28 82V58a32 32 0 0 1 64 0v24" fill="none" stroke="' + ink + '" stroke-width="4"/>' +
          '<rect x="56" y="34" width="8" height="48" fill="' + ink + '" opacity=".55"/>' +
          '<rect x="36" y="46" width="6" height="36" fill="' + ink + '" opacity=".4"/>' +
          '<rect x="78" y="46" width="6" height="36" fill="' + ink + '" opacity=".4"/>';
      })
    },

    /* 危机：时代大事件、崩盘、黑天鹅 */
    crisis: {
      name: "危机", ink: "#1c1c1c", base: "#d9d4c9",
      art: art(function (ev, ink) {
        return '<polyline points="16,32 38,40 52,34 68,62 84,56 100,84" fill="none" stroke="' + ink + '" stroke-width="4"/>' +
          '<path d="M100 84l-16 3 9-14z" fill="' + ink + '"/>' +
          '<path d="M22 88l-8 8M40 90l-8 8" stroke="' + ink + '" stroke-width="3" opacity=".45"/>';
      })
    },

    /* 外交 / 安全 */
    foreign: {
      name: "外交", ink: "#3a3a6b", base: "#dcdcef",
      art: art(function (ev, ink) {
        return '<circle cx="60" cy="58" r="33" fill="none" stroke="' + ink + '" stroke-width="3"/>' +
          '<ellipse cx="60" cy="58" rx="14" ry="33" fill="none" stroke="' + ink + '" stroke-width="2.5"/>' +
          '<rect x="27" y="57" width="66" height="3" fill="' + ink + '" opacity=".8"/>' +
          '<rect x="27" y="40" width="66" height="2" fill="' + ink + '" opacity=".45"/>';
      })
    },

    /* 灰产：灰色生意、把柄、地下交易、族群飞地里的"能办成事的人"。
       主角不是靠党内机器往上走，而是靠"别人不敢说的事"往上走 —— 这类事件都落在这里。 */
    shady: {
      name: "灰产", ink: "#3a2438", base: "#e9e0e6",
      art: art(function (ev, ink) {
        return '<path d="M36 30q24-18 48 0q-24 18-48 0z" fill="none" stroke="' + ink + '" stroke-width="3"/>' +
          '<circle cx="60" cy="30" r="6" fill="' + ink + '"/>' +
          '<rect x="20" y="50" width="80" height="42" fill="none" stroke="' + ink + '" stroke-width="3"/>' +
          '<polyline points="20,50 60,76 100,50" fill="none" stroke="' + ink + '" stroke-width="3"/>' +
          '<circle cx="60" cy="74" r="6" fill="' + ink + '" opacity=".85"/>' +
          '<path d="M28 92h64" stroke="' + ink + '" stroke-width="3" opacity=".4"/>';
      })
    }
  });

  /* ---------- 量级：大事件 / 中事件 / 小事 ----------
     unique 默认：大事件一局只演一次（见 engine/events.js 的 P.isUnique） */
  POTUS.define("grade", {
    major: { name: "大事件", cls: "g-major", weight: 3 },
    mid: { name: "中事件", cls: "g-mid", weight: 2 },
    minor: { name: "小事", cls: "g-minor", weight: 1 }
  });
})();
