/* ============================================================================
 * POTUS ENGINE · vignette.js
 * 「静好岁月」——没有事件发生的月份，主角仍然在过日子。
 *
 * 为什么要有这个文件：
 *   一个月一回合的模型里，一年有 3~5 个月是"平静"的。这些月份原本只在月历上留
 *   一行字（"4 月 · 平静"），玩家什么都看不到。可一个人的一生，大部分时间是
 *   在这样的月份里过去的 —— 升迁、丑闻、竞选只是少数几个瞬间。
 *   于是这里做两件事：
 *     1) 【叙事】把一个平静的月份写成一段文学性的随笔：时令 → 世相 → 案头 →
 *        日常 → 心绪 → 收束。片段来自注册表（content/08-vignettes.js），
 *        引擎按"时代 / 轨道 / 层级 / 月份 / 状态"自动筛选，所以同一段随笔
 *        会随着主角变老、升官、生病、心事变重而变形。
 *     2) 【成长】按部就班地长：平静的月份给你一点属性、一点健康、一点声望、
 *        一点人情。年轻时长得多，年长时长不动 —— 没有事件的日子也不是白过的。
 *
 * 分工（重要）：
 *   settleQuietMonth(m)  —— 时间推进时调用（engine/time.js 的 advanceMonth）。
 *                           在这里把"成长"结掉，并把这一段的文字抽好存进存档。
 *                           放在时间轴上而不是渲染时，有两个好处：
 *                             · 模拟器（validate.js）跑 advanceMonth 就会真的走到这条路径，
 *                               平衡问题能被 300 局模拟发现，而不是等玩家上手才暴露；
 *                             · 存档读回来、界面重渲染，文字与成长都不会变（也不会重复结算）。
 *   renderQuiet(months)  —— 界面层调用，只负责把已经抽好的文字摆出来。
 *
 * 纯机制，不含任何剧情数值。片段与成长曲线都写在 content/ 里。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  /* 一段随笔的槽位顺序。片段声明 slot，引擎每个槽位抽一条，按顺序拼起来。 */
  const SLOTS = ["season", "world", "work", "life", "self", "close"];
  const SLOT_NAME = { season: "时令", world: "世相", work: "案头", life: "日常", self: "心绪", close: "收束" };
  P.VIGNETTE_SLOTS = SLOTS;
  P.vignetteSlotName = function (s) { return SLOT_NAME[s] || s; };

  function inArr(list, v) { return !list || list.indexOf(v) >= 0; }

  /* 片段是否适用于"某一个平静的月份"。
   * month 是那一个月的月号（1-12），因为时令片段是跟着月份走的。
   * 判定交给统一的 P.when()（engine/when.js）—— 把 month 覆盖进快照即可，
   * 因为"这个片段适用的月份"本来就是玩家处境的一部分。 */
  P.vignetteFragOK = function (f, month) {
    if (!f) return false;
    const s = P.snap();
    if (!s) return false;
    if (month != null) s.month = month;
    return P.when(f, s);
  };

  /* 片段还可以带 texts: [多个写法]，引擎随机挑一句 —— 让素材量翻倍而不用翻倍对象 */
  function fragText(f) {
    const t = (f.texts && f.texts.length) ? P.pick(f.texts) : f.text;
    return t || "";
  }

  /* 在某个槽位里按权重抽一条片段（没有可用片段就返回 null） */
  P.pickVignetteFrag = function (slot, month) {
    const list = (P.reg.vignette.fragments || []).filter(function (f) {
      return f.slot === slot && P.vignetteFragOK(f, month);
    });
    if (!list.length) return null;
    let tot = 0;
    list.forEach(function (f) { tot += (f.weight == null ? 1 : f.weight); });
    let r = Math.random() * tot;
    for (let i = 0; i < list.length; i++) {
      r -= (list[i].weight == null ? 1 : list[i].weight);
      if (r <= 0) return list[i];
    }
    return list[list.length - 1];
  };

  /* 拼一个月的随笔：每个槽位抽一条，按顺序接起来。
   *   片段可声明 brk:true → 在它前面断一行（让"日常"和"收束"各自成段）。
   * 返回 { month, text, parts:{slot:fragmentId} }，text 为空说明素材不足。 */
  P.rollVignette = function (month) {
    const parts = {}, segs = [];
    SLOTS.forEach(function (slot) {
      const f = P.pickVignetteFrag(slot, month);
      if (!f) return;
      const t = fragText(f);
      if (!t) return;
      parts[slot] = f.id || slot;
      segs.push({ text: t, brk: !!f.brk });
    });
    let text = "";
    segs.forEach(function (s, i) {
      if (i > 0 && s.brk) text += "\n\n";
      text += s.text;
    });
    return { month: month, text: text.trim(), parts: parts };
  };

  /* ---------- 按部就班地长 ----------
   * 每个平静的月份结算一次。年轻时长得多（attrAgeFade），年长后基本停滞。
   * 所有曲线的数字都在 balance.vignette 里，内容可调。
   * 返回 { notes:[可读的成长清单], n, tally:{attr:{},hp,rep,contact} } */
  P.vignetteGrowth = function (months) {
    const G = P.G, b = P.balance();
    const v = b.vignette || {};
    const n = months || 0;
    const tally = { attr: {}, hp: 0, rep: 0, contact: 0, fun: 0, ap: 0, fav: 0, voters: {} };
    if (v.enabled === false || n <= 0 || !G) return { notes: [], n: n, tally: tally };

    const startAge = b.startAge == null ? 24 : b.startAge;
    const attrCap = v.attrCap == null ? 88 : v.attrCap;
    const attrKeys = v.attrKeys || ["CHA", "INT", "CUN", "INTG"];
    const trackKey = (P.reg.track[G.track] || {}).key;
    /* 按轨道分化：你做的那件事，决定平静的日子里什么在自然生长。
     * 选举的人天天见人（声望）、管钱的人钱在生钱（资金）、幕僚在攒关系（人脉）、
     * 委任的在啃专业（属性）、名人哪怕不做事也有人谈论他（声望）。
     * 数字全部来自 balance.vignette.trackBonus，内容可调；只加正向，不引入新惩罚。 */
    const tb = (v.trackBonus || {})[G.track] || {};

    for (let i = 0; i < n; i++) {
      /* 属性：年轻时吸收得快，年纪上去之后渐渐定型 */
      let pAttr = v.attrChance == null ? 0.30 : v.attrChance;
      if (v.attrAgeFade !== false) {
        const fade = P.clamp(1 - (G.age - startAge) / 60, 0.25, 1);
        pAttr *= fade;
      }
      if (tb.attr) pAttr *= tb.attr;
      /* v0.5.2 年龄曲线（用户要求：随年龄自然增减）：
         青年全面长（attrAgeFade 之上）；
         手腕 CUN 是经验——衰减更慢，中年还在长；
         老年（declineAge 起）CHA/INT 每月有小概率掉 1 点——
         上镜的锐气和熬夜的脑子先走，手腕和城府留到最后；
         INTG 不随年龄变：诚信是选择，不是机能。 */
      if (v.attrDeclineAge != null && G.age >= v.attrDeclineAge && P.chance(v.attrDeclineChance == null ? 0.06 : v.attrDeclineChance)) {
        const pool = ["CHA", "CHA", "INT"];           /* 魅力掉得比智力快 */
        const k = P.pick(pool);
        if (G.attr[k] != null && G.attr[k] > (v.attrFloor == null ? 30 : v.attrFloor)) {
          G.attr[k] -= 1;
          tally.attr[k] = (tally.attr[k] || 0) - 1;
        }
      }
      if (P.chance(pAttr)) {
        /* 主属性（轨道对应的那一项）更容易长 —— 你在做的那件事，你才长本事。
           手腕（CUN）额外吃一口：经验这东西五六十岁还在攒。 */
        const pool = [];
        attrKeys.forEach(function (k) {
          const w = (k === trackKey) ? 3 : (k === "CUN" ? 2 : 1);
          for (let j = 0; j < w; j++) pool.push(k);
        });
        const k = P.pick(pool);
        if (G.attr[k] != null && G.attr[k] < attrCap) {
          G.attr[k] = Math.min(attrCap, G.attr[k] + (v.attrGain == null ? 1 : v.attrGain));
          tally.attr[k] = (tally.attr[k] || 0) + 1;
        }
      }
      /* 健康：安静的月份让你喘口气。这是"平静"最实在的价值。 */
      if (G.hp < 100 && P.chance(v.hpChance == null ? 0.28 : v.hpChance)) {
        const g = v.hpGain == null ? 1 : v.hpGain;
        G.hp = P.clamp(G.hp + g, 0, 100); tally.hp += g;
      }
      /* 声望：常年在基层露面，名字会被记住一点 */
      let pRep = v.repChance == null ? 0.12 : v.repChance;
      if (tb.rep) pRep *= tb.rep;
      if (P.chance(pRep)) {
        const g = v.repGain == null ? 1 : v.repGain;
        G.rep = P.clamp(G.rep + g, 0, 100); tally.rep += g;
      }
      /* 资金：安静的年月里，钱也在慢慢生钱（默认 0，生息统一放在年终结算） */
      const funRate = (v.funRate || 0) + (tb.fun || 0);
      if (funRate && G.fun > 0) G.fun += Math.round(G.fun * funRate);
      /* 人脉：关系是要维护的。平静的月份里你去吃了几顿饭、打了几通电话。 */
      let pCt = v.contactChance || 0;
      if (tb.contact) pCt *= tb.contact;
      if (pCt && P.chance(pCt)) {
        const list = P.myContacts();
        if (list.length) {
          const c = P.pick(list);
          const g = v.contactGain == null ? 1 : v.contactGain;
          if (G.contacts[c.id] != null && G.contacts[c.id] < 100) {
            G.contacts[c.id] = P.clamp(G.contacts[c.id] + g, -100, 100);
            tally.contact += g;
          }
        }
      }
      /* v0.5.2 用户要求：平静的日子也不是完全静止的——
         资金有小额的进出（工资/开销/顺手的生意），人情偶尔攒一点。
         全部小量级 + 双向（资金可正可负），大事仍然只属于事件。
         v0.9：精力(ap) 已退役，平静月不再回精力。 */
      if (v.funChance && P.chance(v.funChance)) {
        const scale = 500 + G.tier * 1500;              /* T0 是几百块的月光，T3 是几千块的周转 */
        const gain = P.chance(v.funGoodChance == null ? 0.55 : v.funGoodChance);
        const amt = P.rint(1, 4) * scale * (gain ? 1 : -1);
        G.fun += amt;
        tally.fun = (tally.fun || 0) + amt;
      }
      if (v.favChance && P.chance(v.favChance)) {
        G.fav = P.clamp(G.fav + 1, 0, 20);
        tally.fav = (tally.fav || 0) + 1;
      }
      /* v0.9：选区选民的自然增减已从"静好成长"里搬出 —— 改由 core.js 的 monthlyLedger
         在时间轴上每月结一次（有事/无事月都动），所以这里不再重复 voterDrift，以免双算。 */
    }

    /* 显示名与状态栏对齐：属性一律中文名（魅力/智力/手腕/诚信），人脉好感不再叫"人情往来" */
    const ATTR_CN = { CHA: "魅力", INT: "智力", CUN: "手腕", INTG: "诚信" };
    const notes = [];
    for (const k in tally.attr) notes.push((ATTR_CN[k] || k) + " +" + tally.attr[k]);
    if (tally.rep) notes.push("声望 +" + tally.rep);
    if (tally.contact) notes.push("人脉好感 +" + tally.contact);
    if (tally.fun) {
      const k = Math.round(tally.fun / 1000);
      if (k !== 0) notes.push("资金 " + (k > 0 ? "+$" : "-$") + Math.abs(k) + "k");
    }
    if (tally.fav) notes.push("人情 +" + tally.fav);
    /* 选民（v0.6）：有变化才写进月卡 —— 让玩家看见"我什么都没干，但选民在动" */
    if (tally.voters) {
      const VCN = { warm: "好感选民", diehard: "死忠", oppose: "反对者" };
      const fmt = P.fmtVoterNum || function (x) { return String(x); };
      ["warm", "diehard", "oppose"].forEach(function (vk) {
        const n = tally.voters[vk];
        if (!n) return;
        notes.push(VCN[vk] + " " + (n > 0 ? "+" : "") + fmt(n));
      });
    }
    return { notes: notes, n: n, tally: tally };
  };

  /* ---------- 结算一个平静的月份（由 engine/time.js 的 advanceMonth 调用） ----------
   * 做两件事：把这个月的成长结掉 + 把这一段的文字抽好存进 quietLog。
   * 幂等：同一个月重复调用只会结算一次（靠 G.vigMonth 水位线）。
   * 之所以放在时间轴上而不是渲染时：模拟器跑 advanceMonth 就能覆盖这条路径。 */
  P.settleQuietMonth = function (m) {
    const G = P.G;
    if (!G || m == null) return null;
    /* 跨年自动翻页：不依赖调用方（render.js / 模拟器）记得重置水位线。
       谁忘了重置，这里也不会把去年的随笔当成今年的。 */
    if (G.vigYear !== G.year) { G.vigYear = G.year; G.vigMonth = 0; G.quietLog = []; }
    if (m <= (G.vigMonth || 0)) return null;
    G.vigMonth = m;
    if (!G.quietLog) G.quietLog = [];
    const g = P.vignetteGrowth(1);
    const roll = P.rollVignette(m);
    const entry = { year: G.year, month: m, text: roll.text, parts: roll.parts || {}, gain: g.tally };
    G.quietLog.push(entry);
    if (g.notes.length) P.pushLog("静好岁月（" + m + " 月）：" + g.notes.join(" · "));
    return entry;
  };

  /* ---------- 渲染：把已经结算好的平静岁月交给界面 ----------
   * months: 这一批"刚刚静悄悄过去"的月号数组（来自 quietMonths）。
   * 只读 quietLog，不抽片段、不结算 —— 所以重复渲染不会变、也不会重复给成长。
   * 返回 { html, months, growth }；没有内容时 html 为空串。 */
  const _store = {};                  // id → 该卡片拼出来的月份/文本（供外部按需读取）
  let _seq = 0;
  P.vignetteStore = function (id) { return _store[id] || null; };

  P.renderQuiet = function (months) {
    const G = P.G, b = P.balance();
    const v = b.vignette || {};
    if (v.enabled === false || !G) return { html: "", months: [], growth: null };
    const want = (months || []).filter(function (m) { return m != null; });
    if (!want.length) return { html: "", months: [], growth: null };

    const log = G.quietLog || [];
    const entries = log.filter(function (e) {
      return (e.year == null || e.year === G.year) && want.indexOf(e.month) >= 0;
    });
    if (!entries.length) return { html: "", months: want, growth: null };

    const maxShown = v.maxShown == null ? 4 : v.maxShown;
    const shown = entries.slice(0, maxShown);
    const leftover = entries.length - shown.length;

    /* 把这一批的成长合并成一行（按类别求和，而不是罗列每个月） */
    const tally = { attr: {}, hp: 0, rep: 0, contact: 0, fun: 0, ap: 0, fav: 0, voters: {} };
    entries.forEach(function (e) {
      const g = e.gain || {};
      for (const k in (g.attr || {})) tally.attr[k] = (tally.attr[k] || 0) + g.attr[k];
      tally.hp += g.hp || 0; tally.rep += g.rep || 0; tally.contact += g.contact || 0;
      tally.fun += g.fun || 0; tally.ap += g.ap || 0; tally.fav += g.fav || 0;
      for (const vk in (g.voters || {})) tally.voters[vk] = (tally.voters[vk] || 0) + g.voters[vk];
    });
    const ATTR_CN2 = { CHA: "魅力", INT: "智力", CUN: "手腕", INTG: "诚信" };
    const notes = [];
    for (const k in tally.attr) notes.push((ATTR_CN2[k] || k) + " +" + tally.attr[k]);
    if (tally.rep) notes.push("声望 +" + tally.rep);
    if (tally.contact) notes.push("人脉好感 +" + tally.contact);
    if (tally.fun) {
      const kf = Math.round(tally.fun / 1000);
      if (kf !== 0) notes.push("资金 " + (kf > 0 ? "+$" : "-$") + Math.abs(kf) + "k");
    }
    if (tally.fav) notes.push("人情 +" + tally.fav);
    /* 选民（v0.6）：把这几个月的选民净变化也报出来 */
    const _VCN2 = { warm: "好感选民", diehard: "死忠", oppose: "反对者" };
    const _fmtV = P.fmtVoterNum || function (x) { return String(x); };
    ["warm", "diehard", "oppose"].forEach(function (vk) {
      const n = tally.voters[vk];
      if (!n) return;
      notes.push(_VCN2[vk] + " " + (n > 0 ? "+" : "") + _fmtV(n));
    });

    const id = "vig" + (++_seq);
    const y = G.year;
    const range = shown.length === 1
      ? (y + " 年 " + shown[0].month + " 月")
      : (y + " 年 " + shown[0].month + " 月 – " + shown[shown.length - 1].month + " 月");

    _store[id] = {
      kind: "vignette",
      year: y, count: entries.length,
      months: shown.map(function (e) { return e.month; }),
      texts: shown.map(function (e) { return { month: e.month, text: e.text }; })
    };

    let body = "";
    if (shown.some(function (e) { return e.text; })) {
      body = shown.filter(function (e) { return e.text; }).map(function (e) {
        return '<p class="vig-p" data-month="' + e.month + '">' + e.text.replace(/\n\n/g, "</p><p class=\"vig-p\">") + "</p>";
      }).join("");
    } else {
      body = '<p class="vig-p muted">这一段日子平静得没有留下什么。</p>';
    }
    if (leftover > 0) body += '<p class="vig-more muted">另有 ' + leftover + " 个月同样无声无息地过去了。</p>";

    const growHTML = notes.length
      ? '<div class="vig-growth"><span class="vig-gtag">按部就班</span>' + notes.join("　·　") + "</div>"
      : "";

    return {
      html: '<div class="vig" id="' + id + '">' +
        '<div class="vig-head"><span class="vig-title">' + (v.title || "静好岁月") + '</span>' +
        '<span class="vig-range">' + range + "</span></div>" +
        '<div class="vig-body">' + body + "</div>" + growHTML + "</div>",
      months: want, growth: { notes: notes, tally: tally }, id: id
    };
  };

  /* 静好岁月完全离线生成：以前这里挂过一段可选的大模型润色入口，已整体下架。 */
})();
