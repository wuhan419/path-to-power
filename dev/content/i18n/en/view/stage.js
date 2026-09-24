/* ============================================================================
 * CONTENT · i18n/en/view/stage.js
 * 主循环视图（engine/view/stage.js）界面串的英文分片。
 *
 * 引擎侧一律写成 P.t("ui.stage.xxx", "中文原文"[, 参数])：
 *   · 中文原文就是默认值，中文侧不需要这个文件；
 *   · 这里没登记的 key 在英文界面回落中文；本分片覆盖 stage.js 的全部 key。
 * 术语与 i18n/en/ui.js 对齐：魅力 Charm ｜ 智力 Wit ｜ 手腕 Guile ｜ 诚信 Integrity，
 * 声望 Reputation ｜ 资金 Cash ｜ 人情 Favors ｜ 把柄 Blackmail ｜ 派系 Factions。
 * {占位符} 名字与中文侧一一对应，不许改名。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  ui: {
    /* ---------------- 背景卡（briefHTML） ---------------- */
    "ui.stage.briefTitle": "Background · What you know right now",
    "ui.stage.briefTerms": "Terms",
    "ui.stage.briefKnown": "What you know for sure",
    "ui.stage.briefRumor": "What you've heard · unverified",
    "ui.stage.briefUnknown": "What you don't know yet",

    /* ---------------- 年终随笔 / 年终结算 ---------------- */
    "ui.stage.yourState": "your state",
    "ui.stage.yearSettleLog": "Year in review: age {age}, reputation {rep}, cash ${fun}k.",
    "ui.stage.yearN": "{y}",
    "ui.stage.yearEndTag": " · Year in review",
    "ui.stage.yearDone": "{y} is over",
    "ui.stage.sumAge": "Age {n}",
    "ui.stage.sumOffice": "({n} months in seat)",
    "ui.stage.sumScandal": "Scandal Lv",
    "ui.stage.noScandal": "No scandal",
    "ui.stage.sumQuiet": "{n} quiet months",
    "ui.stage.sumRep": "Reputation {v}",
    "ui.stage.sumCash": "Cash ${v}k",
    "ui.stage.sumLev": "Blackmail {n}",
    "ui.stage.sumContacts": "Contacts {n}",
    "ui.stage.sumLevLost": "{n} blackmail files went stale this year",
    "ui.stage.yearHeads": "Headlines of the year",
    "ui.stage.enterYear": "Enter {y} →",
    "ui.stage.wideSep": " · ",

    /* ---------------- 时代头版照 / 年初播报 ---------------- */
    "ui.stage.eraFrontAlt": "{year} era briefing, front page",
    "ui.stage.eraFrontTag": "Era front page",
    "ui.stage.eraFrontNum": "File {year}",
    "ui.stage.yearBrief": "{year}: the storms keep coming.",
    "ui.stage.yearWorld": "The world in {year}",
    "ui.stage.yearBriefHead": "{year}: era briefing",
    "ui.stage.pressureLabel": "Era pressure: ",
    "ui.stage.pressureNote": "({v}/6) · The higher the pressure, the more trouble — and the bigger it is.",
    "ui.stage.mediaNow": "Media of the day: ",
    "ui.stage.newYearHead": "A new year begins",
    "ui.stage.backToMonth": "Back to month {m} →",
    "ui.stage.enterJan": "Enter January →",
    "ui.stage.continue": "Continue →",
    "ui.stage.toYearEnd": "Year in review →",

    /* ---------------- 平静月 ---------------- */
    "ui.stage.quietDefault": "You handled the work in front of you.",
    "ui.stage.monthN": "M{m}",
    "ui.stage.quiet": "Quiet",
    "ui.stage.qwThisMonth": "This month",
    "ui.stage.qwTheseMonths": "These months",
    "ui.stage.qwSummary": "Steady routine — nothing worth its own entry.",
    "ui.stage.rangeOne": "{y}, month {m}",
    "ui.stage.rangeRun": "{y}, months {m1}–{m2}",
    "ui.stage.quietOne": "A quiet month",
    "ui.stage.quietRun": "{n} quiet months pass",
    "ui.stage.overOne": "This month is over",
    "ui.stage.overRun": "Those months are over",

    /* ---------------- 上班账（ledgerBoxHTML） ---------------- */
    "ui.stage.monthLedger": "This month's ledger",
    "ui.stage.monthsLedger": "{n}-month ledger",
    "ui.stage.ledgerSalary": "Salary",
    "ui.stage.ledgerLiving": "Expenses",
    "ui.stage.ledgerNet": "Net",
    "ui.stage.ledgerLoan": "Loan",
    "ui.stage.loanBalance": "Loan balance ${amt}k",
    "ui.stage.loanAccr": " + ${amt}k interest",
    "ui.stage.loanFrozen": " · forbearance",
    "ui.stage.loanLate": " · {late} months late",
    "ui.stage.loanDoom": "（credit collapse in {left} months）",
    "ui.stage.loanCleared": "✓ Loans paid off",
    "ui.stage.monthSettle": "This month · Standing",

    /* ---------------- 选项门槛与代价（reqBlock / costBlock / resText） ---------------- */
    "ui.stage.reqFun": "Needs cash ≥ ${v}",
    "ui.stage.reqLev": "Needs blackmail ≥ {v}",
    "ui.stage.reqRep": "Needs reputation ≥ {v}",
    "ui.stage.reqTier": "Needs {t} or higher",
    "ui.stage.reqNamed": "Needs \"{name}\"",
    "ui.stage.reqFac": "Needs {name} favor ≥ {v}",
    "ui.stage.reqContact": "Must know \"{name}\" first",
    "ui.stage.reqFlag": "Needs status: {flag}",
    "ui.stage.lack": "Short of {v}",
    "ui.stage.listSep": ", ",
    "ui.stage.costTag": "Cost: ",
    "ui.stage.costFun": "Cash {amt}",
    "ui.stage.forcedNote": "⚠ Last resort: {why} — one forced attempt (resources drained to the floor)",

    /* ---------------- 资源 / 属性 / 选民名（查表默认值在引擎侧） ---------------- */
    "ui.stage.res.fun": "Cash",
    "ui.stage.res.fav": "Favors",
    "ui.stage.res.rep": "Reputation",
    "ui.stage.res.lev": "Blackmail",
    "ui.stage.attr.CHA": "Charm",
    "ui.stage.attr.INT": "Wit",
    "ui.stage.attr.CUN": "Guile",
    "ui.stage.attr.INTG": "Integrity",
    "ui.stage.voterWarm": "Supporters",
    "ui.stage.voterDiehard": "Die-hards",
    "ui.stage.voterOppose": "Opponents",
    "ui.stage.numWan": "{n} ×10K",
    "ui.stage.numKilo": "{n}K",

    /* ---------------- 收益结算（gainSummary / gainBoxHTML） ---------------- */
    "ui.stage.thisMove": "This move",
    "ui.stage.funMulPct": "{pct}% of principal",
    "ui.stage.funMulGain": "payout ${v} (principal ${b} + {p}%)",
    "ui.stage.funMulLoss": "payout ${v} (principal ${b} lost {l}%)",
    "ui.stage.stakeTip": "The principal is paid up front when you pick this; the percentage is the return ON TOP of it: +80% means $5k in pays $9k back, -60% pays $2k.",
    "ui.stage.principal": "Principal return",
    "ui.stage.tierLabel": "Tier",
    /* 单档专属角标：仅{t} */
    "ui.stage.onlyTier": "{t} only",
    "ui.stage.tierName.crit": "critical",
    "ui.stage.tierName.ok": "success",
    "ui.stage.tierName.meh": "scraping through",
    "ui.stage.tierName.fail": "failure",
    "ui.stage.tierName.critfail": "critical failure",
    "ui.stage.statusTag": "Status",
    "ui.stage.clearedTag": "Cleared",
    "ui.stage.fallen": "Downfall",
    "ui.stage.fallHard": "Crash",
    "ui.stage.fallSoft": "Slide",
    "ui.stage.endgame": "Career end",
    "ui.stage.prison": "Prison",
    "ui.stage.disgraced": "Disgraced",
    "ui.stage.bankrupt": "Credit Ruin",
    "ui.stage.doomed": "Death",
    "ui.stage.wrath": "Enmity",

    /* ---------------- 回报预览（rewardPreview / rewLineHTML） ---------------- */
    "ui.stage.rewardTag": "Reward",
    "ui.stage.rewardDetail": "Reward details",
    "ui.stage.moreItems": "+{n}",
    "ui.stage.riskNote": "⚠ Risk of {r}",
    "ui.stage.feudNote": "⚠ Feud: {f}",

    /* ---------------- 成功把握档位 ---------------- */
    "ui.stage.odds.l5": "In the bag",
    "ui.stage.odds.l4": "Heavy favorite",
    "ui.stage.odds.l3": "Slight edge",
    "ui.stage.odds.l2": "Coin flip",
    "ui.stage.odds.l1": "Long odds",
    "ui.stage.odds.l0": "Slim chance",
    "ui.stage.oddsTip": "Your odds on this move: the option itself, your talent and your voters' depth all feed it. Spending cash pushes them higher, but every call still leaves room for luck.",

    /* ---------------- 事件卡头（presentEvent） ---------------- */
    "ui.stage.stamp": "FILE",
    "ui.stage.chainTag": "Previously",
    "ui.stage.thisMonth": "this very month",
    "ui.stage.monthsAgo": "{n} months ago",
    "ui.stage.valBoon": "Boon: even handled badly, it won't cost you.",
    "ui.stage.valBane": "Threat: ignore it and you pay; play it well and it turns around.",
    "ui.stage.valRisk": "Risk: bet or don't — both are choices.",
    /* 三值性徽标（P.VAL_LABEL 为加载期常量，取用点现翻：ui.stage.valLabel.<val>） */
    "ui.stage.valLabel.boon": "Opportunity",
    "ui.stage.valLabel.risk": "Risk",
    "ui.stage.valLabel.bane": "Threat",
    "ui.stage.yourChoices": "Your choices",
    "ui.stage.pickHint": "The bigger the upside, the harder the downside may bite.",
    "ui.stage.stakeHint": "Invest resources for better odds",
    "ui.stage.noteTag": "Note",

    /* 判定五档徽章（P.TIER_LABEL 为加载期常量，取用点现翻：ui.stage.tierBadge.<tier>） */
    "ui.stage.tierBadge.crit": "★ Critical success",
    "ui.stage.tierBadge.ok": "✓ Success",
    "ui.stage.tierBadge.meh": "~ Scraped through",
    "ui.stage.tierBadge.fail": "✗ Failure",
    "ui.stage.tierBadge.critfail": "☠ Critical failure",

    /* ---------------- 结算与头条（resolveChoice / afterEvent） ---------------- */
    "ui.stage.newsLead": "In controversy: {t}",
    "ui.stage.logHeadline": "Headline: {h}",
    "ui.stage.breaking": "Breaking",
    "ui.stage.fallenHead": "You walked down from the podium",
    "ui.stage.fallenBody": "The office lights are still on, but none of them are on for you now. You hand over the keys, " +
      "the list, and the promises to \"talk later,\" and come down the steps. Half the people who backed you have " +
      "gone; not one of the people who remembers you has.\n\n" +
      "This is not the end. This country has watched plenty of people climb back from the bottom — while your " +
      "political life holds, the steps are still there.",

    /* ---------------- 年终结算日志（endYear） ---------------- */
    "ui.stage.settleCareer": "View career summary →",
    "ui.stage.levDecay": "Time passes: {n} blackmail files lost their edge — the principals left, or the story did.",
    "ui.stage.blackswan": "Black swan",
    "ui.stage.blackswanLog": "Black swan: {t}"
  }
});
