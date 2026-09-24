/* ============================================================================
 * CONTENT · i18n/en/reg/14-offices.js
 * 中文文件 content/14-offices.js（官职名表 / 泛称兜底）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md §3）：
 *   · 原中文文件一个字不动，本文件只翻展示字段。
 *   · kind 与中文侧一致：office（并入 P.reg.office）、balance（并入 P.reg.balance）。
 *   · office 的**对象键**（"electoral_3" / "appointment_9" / "*_5" …）被状态面板与
 *     晋升线查表引用，一律不动；只翻值。值的形状照抄中文：中文是裸字符串的这里给裸字符串，
 *     中文是 { name: … } 的这里给 { name: … }，否则 P.officeName 取不到。
 *   · balance.officeFallback 是**纯标量数组** → 整体替换，必须整条 10 项给全，条数与中文一致。
 *   · officeSalary 全表是**数值**（薪资平衡口径，engine 单调校验），不写、不覆盖。
 *
 * 英文写法：真实美国官职名（State Senator、Deputy Chief of Staff、Kingmaker…），别直译生造。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    office: {
      /* ---------- 选举轨道 ---------- */
      "electoral_0": "Community Campaign Volunteer",
      "electoral_1": "County Party Chair · School Board",
      "electoral_2": "City Council Member",
      "electoral_3": { name: "State Representative" },
      "electoral_4": { name: "State Senator" },
      "electoral_5": { name: "Statewide Office · Attorney General" },
      "electoral_6": { name: "U.S. Representative" },
      "electoral_7": { name: "U.S. Senator / Governor" },
      "electoral_8": { name: "Vice President / Presidential Nominee" },
      "electoral_9": { name: "President" },

      /* ---------- 委任轨道 ---------- */
      "appointment_0": "Junior Agency Clerk",
      "appointment_1": "Policy Analyst",
      "appointment_2": "Committee Chief of Staff",
      "appointment_3": { name: "State Agency Director" },
      "appointment_4": { name: "State Cabinet Member" },
      "appointment_5": { name: "Federal Agency Head" },
      "appointment_6": { name: "Cabinet Secretary" },
      "appointment_7": { name: "White House Chief of Staff / National Security Advisor" },
      "appointment_8": { name: "Vice President" },
      "appointment_9": { name: "President" },

      /* ---------- 名人轨道 ---------- */
      "celebrity_0": "Local Radio Regular",
      "celebrity_1": "Community Voice",
      "celebrity_2": "Newspaper Columnist",
      "celebrity_3": { name: "Local Media Personality" },
      "celebrity_4": { name: "National Commentator" },
      "celebrity_5": { name: "Household Name" },
      "celebrity_6": { name: "Agenda-Setting Pundit" },
      "celebrity_7": { name: "Political Outsider Star" },
      "celebrity_8": { name: "General-Election Candidate" },
      "celebrity_9": { name: "President" },

      /* ---------- 操盘轨道 ---------- */
      "operative_0": "Unknown Campaign Volunteer",
      "operative_1": "Campaign Aide",
      "operative_2": "Local Party Machine Operator",
      "operative_3": { name: "Campaign Manager" },
      "operative_4": { name: "State Party Executive Director" },
      "operative_5": { name: "National Campaign Strategist" },
      "operative_6": { name: "Presidential Campaign General Consultant" },
      "operative_7": { name: "Senior White House Adviser" },
      "operative_8": { name: "Party Elder · Kingmaker" },
      "operative_9": { name: "Power Behind the Throne" },

      /* ---------- 财富轨道 ---------- */
      "wealth_0": "Small-Town Shop Owner",
      "wealth_1": "Local Business Owner",
      "wealth_2": "Trade Association Head",
      "wealth_3": { name: "Statewide Entrepreneur" },
      "wealth_4": { name: "National Business Rising Star" },
      "wealth_5": { name: "Business Leader" },
      "wealth_6": { name: "Finance / Real Estate Tycoon" },
      "wealth_7": { name: "Billionaire" },
      "wealth_8": { name: "Capital Magnate" },
      "wealth_9": { name: "The Man Who Owns the Board" },

      /* ---------- 通配（只看层级） ---------- */
      "*_0": "Nobody",
      "*_1": "Insider",
      "*_2": "Local Official",
      "*_3": { name: "Local Veteran" },
      "*_4": { name: "Statewide Newcomer" },
      "*_5": { name: "Statewide Figure" },
      "*_6": { name: "Federal Official" },
      "*_7": { name: "National Figure" },
      "*_8": { name: "Heavyweight" },
      "*_9": { name: "The Apex of Power" }
    },
    balance: {
      /* 泛称兜底：纯标量数组，整体替换，10 项与中文一一对应 */
      officeFallback: [
        "Nobody", "Insider", "Local Official", "Local Veteran", "Statewide Newcomer",
        "Statewide Figure", "Federal Official", "National Figure", "Heavyweight", "The Apex of Power"
      ]
    }
  }
});
