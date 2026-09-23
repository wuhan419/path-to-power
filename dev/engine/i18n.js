/* ============================================================================
 * POTUS ENGINE · i18n.js
 * 多语言层：语言状态 + 界面文案查表 + 内容覆盖层。
 *
 * 两类文本，两条路：
 *   ① 引擎里硬编码的界面串 → P.t("ui.topbar.date", "{y}年{m}月", {y, m})
 *      第二个参数就是中文原文，所以 zh 不需要任何词典文件；某条 key 缺英文，
 *      自动回落成中文原文（分层回补，不必一次翻完）。
 *   ② 内容包（事件卡 / 注册表标签）→ 独立覆盖层，原中文文件一个字都不改：
 *        POTUS.define("l10n", { lang: "en", content: {
 *          event: [ { id: "gulf91_storm", title: "…",
 *                     choices: [ { id: "patriot", text: "…" } ] } ] } });
 *      按 id 定位、按字段名合并；无 id 的对象数组按下标对齐；
 *      纯标量数组（known / rumor / unknown / texts）整体替换 —— 必须整条给全。
 *
 * 切语言 = 写 localStorage 后整页重载：boot 时把覆盖层一次性并进注册表，
 * 不做"还原"，因此不需要快照，也不会踩到引擎各处缓存的 reg 子对象引用。
 *
 * 【顺序】必须排在 engine/core.js 之后、engine/view/shell.js 与所有 content/ 之前。
 * ==========================================================================*/
"use strict";
var POTUS = window.POTUS = window.POTUS || {};

(function () {
  const P = POTUS;
  const LS_KEY = "potus_lang";
  const LANGS = { zh: "简体中文", en: "English" };

  /* 覆盖层不许改写的键：结构与引用键。改了就断事件链 / 断存档 / 断条件。 */
  const PROTECT = {};
  ("id event after setFlags flags notFlags req era notEra years fromYear toYear " +
    "minYear maxYear month day tier tierMin tierMax tierRaw weight grade category " +
    "valence dyn medium unique chore scoped photo filler once cond when mods cost " +
    "stake slot tracks parties entries origins contacts states stances key dir files " +
    "minRep maxRep minFun maxFun minHp maxHp minAge maxAge minLev maxLev minContacts " +
    "maxContacts minTenure months").split(" ").forEach(k => { PROTECT[k] = 1; });

  const dicts = { zh: {}, en: {} };   /* ① 界面串：flat key → 文本 */
  const srcs = { zh: {}, en: {} };    /* ② 内容覆盖层载荷，boot 时统一套用 */
  const report = { applied: {}, missed: [], protectedHits: {}, unknownKind: [] };

  const isPlain = v => v && typeof v === "object" && !Array.isArray(v);
  const isScalars = a => a.every(v => v === null || typeof v !== "object");

  function byId(arr, id) {
    for (let i = 0; i < arr.length; i++) if (arr[i] && arr[i].id === id) return arr[i];
    return null;
  }

  function mergeArray(tgt, patch, where) {
    if (!Array.isArray(tgt)) { report.missed.push(where); return; }
    if (isScalars(patch)) { tgt.length = 0; patch.forEach(v => tgt.push(v)); return; }
    for (let i = 0; i < patch.length; i++) {
      const pv = patch[i];
      let t = (isPlain(pv) && pv.id !== undefined) ? byId(tgt, pv.id) : null;
      if (!t && tgt[i] !== undefined) t = tgt[i];
      if (!t) { report.missed.push(where + "[" + ((pv && pv.id) || i) + "]"); continue; }
      if (Array.isArray(pv)) mergeArray(t, pv, where + "[" + i + "]");
      else mergeNode(t, pv, where + "[" + ((pv && pv.id) || i) + "]");
    }
  }

  function mergeNode(tgt, patch, where) {
    if (!isPlain(tgt)) { report.missed.push(where); return; }
    for (const k in patch) {
      const pv = patch[k], path = where ? where + "." + k : k;
      /* 结构性键：值与原文一致时放行（id 就是定位用的），改写才记账 */
      if (PROTECT[k]) {
        if (tgt[k] !== pv) report.protectedHits[k] = (report.protectedHits[k] || 0) + 1;
        continue;
      }
      if (isPlain(pv)) {
        if (!isPlain(tgt[k])) tgt[k] = {};
        mergeNode(tgt[k], pv, path);
      } else if (Array.isArray(pv)) {
        if (!Array.isArray(tgt[k])) tgt[k] = [];
        mergeArray(tgt[k], pv, path);
      } else {
        tgt[k] = pv;
      }
    }
  }

  /* 把一份覆盖层并到活注册表上（单向，不还原） */
  function applyLang(lang) {
    if (lang !== "zh" && !LANGS[lang]) lang = "zh";
    const content = srcs[lang] || {}, ui = dicts[lang] || {};
    for (const kind in content) {
      const patch = content[kind];
      if (kind === "event") { mergeArray(P.events, [].concat(patch), "event"); continue; }
      if (P.reg[kind] === undefined) { report.unknownKind.push(kind); continue; }
      /* 注册表里 ending / fixed 是数组，其余是对象 */
      if (Array.isArray(P.reg[kind])) mergeArray(P.reg[kind], [].concat(patch), kind);
      else mergeNode(P.reg[kind], isPlain(patch) ? patch : { "": patch }, kind);
    }
    P.locale.ui = ui;
    P.locale.lang = lang;
    report.applied[lang] = countLeaves(content);
    /* 文档级语言标记与标题（标题里那句中文副题走 t()，缺译即回落原文） */
    try {
      if (typeof document !== "undefined" && document.documentElement) {
        document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
        if (document.title !== undefined) {
          const t = P.t("ui.doc.title", "权力之路 · 一个美国小伙的从政之路");
          if (document.title !== t) document.title = t;
        }
      }
    } catch (e) { }
    return lang;
  }

  function countLeaves(v) {
    if (Array.isArray(v)) return v.reduce((a, x) => a + countLeaves(x), 0);
    if (isPlain(v)) return Object.keys(v).reduce((a, k) => a + countLeaves(v[k]), 0);
    return 1;
  }

  function readStored() {
    const search = (typeof location !== "undefined" && location && location.search) || "";
    const q = (search.match(/[?&]lang=(\w+)/) || [])[1];
    if (q && LANGS[q]) return q;
    try { const v = localStorage.getItem(LS_KEY); if (v && LANGS[v]) return v; } catch (e) { }
    return "zh";
  }

  P.locale = { lang: "zh", ui: {}, langs: LANGS };
  P.i18n = {
    LANGS, report,
    /* 内容加载阶段（boot 之前）只收载荷 */
    ingest(lang, payload) {
      if (payload.ui) Object.assign(dicts[lang], payload.ui);
      if (payload.content) {
        const dst = srcs[lang];
        for (const kind in payload.content) {
          const pv = payload.content[kind];
          if (Array.isArray(pv)) dst[kind] = (dst[kind] || []).concat(pv);
          else if (isPlain(pv)) {
            dst[kind] = dst[kind] || {};
            for (const k in pv) {
              if (isPlain(pv[k])) { dst[kind][k] = Object.assign(dst[kind][k] || {}, pv[k]); }
              else dst[kind][k] = pv[k];
            }
          }
        }
      }
    },
    boot() { return applyLang(readStored()); },
    t(key, def, params) {
      /* P.locale.ui = 当前语言的 UI 表；缺译就回落调用点内联的中文原文 */
      const s = (key in P.locale.ui) ? P.locale.ui[key]
        : (typeof def === "string" ? def : key);
      const p = (def !== null && typeof def === "object") ? def : params;
      return p ? s.replace(/\{(\w+)\}/g, (m, k) => (p[k] !== undefined ? String(p[k]) : m)) : s;
    },
    setLang(lang) {
      if (!LANGS[lang] || lang === P.locale.lang) return;
      try { localStorage.setItem(LS_KEY, lang); } catch (e) { }
      /* 覆盖层是 boot 时一次性并进去的，切语言只能重载 */
      if (typeof location !== "undefined") location.reload();
    },
    applyLang,
    /* 覆盖层里可安全改写的文本键（校验与派活时按这个白名单卡） */
    textKeys: "title body lede known rumor unknown terms name desc text texts bodyTpl " +
      "headline intro note textOk textBad crit ok meh fail critfail tag label hint".split(" ")
  };

  /* 引擎各处一律用 P.t(key, 中文原文, 参数)；t 定义在上面那个对象里 */
  P.t = P.i18n.t;

  /* 数字 / 日期：中文按 万·亿，英文按千分位。引擎各格式化点改走这两个原语。 */
  P.isEn = () => P.locale.lang === "en";
  P.numGroup = n => {
    try { return new Intl.NumberFormat(P.isEn() ? "en-US" : "zh-CN").format(n); }
    catch (e) { return String(n); }
  };
  P.dateLabel = (y, m, d) => P.isEn()
    ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][(m || 1) - 1] + " " + (d || "") + (d ? ", " : "") + y
    : y + " 年 " + m + " 月" + (d ? " " + d + " 日" : "");

  /* 供 t() 在 boot 前后都能取到 UI 表 */
  P.locale.ui = dicts.zh;
})();
