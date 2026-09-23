/* ============================================================================
 * CONTENT · i18n/en/view/topbar.js
 * 顶部状态条（engine/view/topbar.js）界面串的英文分片。
 * key 与调用点内联的中文原文一一对应；未登记的 key 自动回落中文。
 * 术语对齐 i18n/en/ui.js：魅力=Charm / 智力=Wit / 手腕=Guile / 诚信=Integrity。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    /* 日期 / 身份（dateText 走 i18n.js 的 P.dateLabel 原语：英文 "Sep 2008"） */
    "ui.topbar.age": "Age {n}",
    "ui.topbar.tierLevel": "Level {n}",

    /* 晋升就绪度 */
    "ui.topbar.tipMax": "You have reached the summit of power.",
    "ui.topbar.tip": "{note}. Promotion readiness {pct} = time in office 40% + reputation 25% + voter strength 20% + party ties 15%; at 60 you enter the opportunity window, but promotion still waits for an opening.",
    "ui.topbar.peak": "Pinnacle of Power",
    "ui.topbar.promoCap": "Promotion",
    "ui.topbar.noteAtMax": "Already at the top",
    "ui.topbar.noteReady": "Opportunity window — waiting for an opening ({n})",
    "ui.topbar.noteNext": "Not yet time (next rung: {n})",

    /* 职位兜底名（内容缺失时展示） */
    "ui.topbar.fbNobody": "Nobody",
    "ui.topbar.fbInsider": "Insider",
    "ui.topbar.fbLocal": "Local Official",
    "ui.topbar.fbLocalVet": "Local Veteran",
    "ui.topbar.fbStateNew": "State Newcomer",
    "ui.topbar.fbStateFig": "State Figure",
    "ui.topbar.fbFed": "Federal Official",
    "ui.topbar.fbNational": "National Figure",
    "ui.topbar.fbHeavy": "Heavyweight",

    /* 职位卡：光谱 / 在位 / 选区基本盘 */
    "ui.topbar.noParty": "Independent",
    "ui.topbar.wingOutsider": " (anti-establishment)",
    "ui.topbar.wingShort": " · Anti-Est.",
    "ui.topbar.mTea": " · Tea Party roots",
    "ui.topbar.mOccupy": " · Occupy roots",
    "ui.topbar.mAntiwar": " · Antiwar badge",
    "ui.topbar.mMachine": " · The machine's own",
    "ui.topbar.mFallen": " · Down but not out",
    "ui.topbar.sTea": "Tea Party",
    "ui.topbar.sOccupy": "Occupy",
    "ui.topbar.sAntiwar": "Antiwar",
    "ui.topbar.sMachine": "Machine",
    "ui.topbar.sFallen": "Fallen",
    "ui.topbar.tenureYears": "(in office {n} yr)",
    "ui.topbar.tenureYearsRest": "(in office {n}+ yr)",
    "ui.topbar.tenureMonths": "(in office {n} mo)",
    "ui.topbar.district": "Electorate {n}",
    /* 中文的 亿/万/千 换算成英文量级（与 view/stage.js 的 numWan/numKilo 同一口径） */
    "ui.topbar.numYi": "{n} ×100M",
    "ui.topbar.numWan": "{n} ×10K",
    "ui.topbar.numKilo": "{n}K",
    "ui.topbar.spectrumTip": "Electorate size: the higher the office, the bigger the pool. Spectrum = party base + stance shift + era marks; it decides which events and factions are friendly to you — and which treat you as an outlier.",
    "ui.topbar.vtDie": "Loyal",
    "ui.topbar.vtWarm": "Warm",
    "ui.topbar.vtOppose": "Opposed",
    "ui.topbar.vtPower": "Strength",
    "ui.topbar.powerTip": "Election strength: a 0-100 composite of the three voter pools.",
    "ui.topbar.voterTip": "Loyal = votes you almost always get; Warm = winnable votes that track your performance; Opposed = the rival's votes. Election checks lean mostly on Loyal, then Warm. Strength runs 0-100.",
    "ui.topbar.baseTip": "Base mix (loyal / warm / opposed share of the electorate): {pct} — {d} / {w} / {o} ({t} total).",
    "ui.topbar.baseTitle": "Voter Base",

    /* 日期 chip 与资源瓷贴 */
    "ui.topbar.dateLab": "Date",
    "ui.topbar.yearNth": "Year {n}",
    "ui.topbar.resRep": "Rep",
    "ui.topbar.resFun": "Cash",
    "ui.topbar.resFav": "Favors",
    "ui.topbar.resLev": "Dirt",
    "ui.topbar.tipRep": "Standing and exposure, press tone and scandals included. Event gates, faction attitudes and promotions all watch it; too low and nobody takes you seriously.",
    "ui.topbar.tipFun": "Money for campaigning and back-room work. Most key actions burn cash, and so does raising the stakes; at zero you can barely move.",
    "ui.topbar.tipFav": "Connections banked and owed. Call in favors for help — or get called in by old debts.",
    "ui.topbar.tipLev": "Secrets others cannot afford to surface, counted in pieces. Hold them and you can force concessions at the worst possible moment — but they expire once the person falls or the story dies down.",

    /* 竞选条 */
    "ui.topbar.campLeft": "{n} month(s) left in this act",
    "ui.topbar.campTag": "Campaign live",
    "ui.topbar.campStage": "Act {s} / {t} · {title}",

    /* 档案折叠钮 */
    "ui.topbar.chipsClose": "Hide ▴",
    "ui.topbar.chipsOpen": "Dossier ▸",

    /* 顶栏语言切换（对局内入口；中/EN 是语言自称，英文侧照写不译） */
    "ui.topbar.langTip": "Switch UI language (takes effect after the page reloads)",
    "ui.topbar.langZh": "中",
    "ui.topbar.langEn": "EN"
  }
});
