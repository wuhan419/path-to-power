/* ============================================================================
 * CONTENT · i18n/en/reg/10-characters.js
 * 中文文件 content/10-characters.js（建角内容：出身 / 天赋 / 起点路径）的
 * 英文覆盖层。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · kind 与中文侧一致：origin / talent / entry（各自并 P.reg.origin 等）。
 *   · 对象键（dynasty / orator / insider …）被事件条件 origins/talents/entries
 *     与存档引用，一律不动；只翻展示字段 name / desc。
 *   · effects / mods / tier / track_suggest / special / critMul … 是结构键，
 *     不写（写了即 protectedHits，validate 直接判失败）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    origin: {
      dynasty: {
        name: "Political Dynasty",
        desc: "Connections +30 · Reputation +8 · Favors +2; the father's shadow - always asked if you ride the name (starting cash now comes from the card pool)"
      },
      immigrant: {
        name: "Second-Gen Immigrant",
        desc: "Grit: Grassroots +20 · Energy +10; self-made, Establishment -20"
      },
      labor: {
        name: "Blue-Collar",
        desc: "Unions +40 · Grassroots +15 · Health +10 · Favors +1; not a spare dollar, Business -25"
      },
      elite: {
        name: "Ivy Elite",
        desc: "Intellect +15 · Business +30; Grassroots trust -15 (starting cash now comes from the card pool)"
      }
    },
    talent: {
      orator: { name: "Born Orator", desc: "Charisma checks +15%" },
      quant: { name: "Numbers Brain", desc: "Intellect checks +15%; smell a crisis early" },
      radar: { name: "People Radar", desc: "See NPCs' true-intent tags" },
      palace: { name: "Memory Palace", desc: "Outcome hints run truer; harder to fool" },
      stomach: { name: "Iron Stomach", desc: "Health decays half as fast" },
      gambler: { name: "Gambler's Instinct", desc: "Crit odds doubled - and so are epic-fail odds" }
    },
    entry: {
      insider: {
        name: "Start Inside",
        desc: "Volunteer, then aide; every rung of the party ladder is visible - slow but sure"
      },
      pro: {
        name: "The Professional",
        desc: "Lawyer / professor / retired officer / doctor - can drop into statewide races, but no party base"
      },
      celebrity: {
        name: "Celebrity",
        desc: "Actor / influencer / best-seller: famous, low trust, cold establishment - the Trump-style shortcut"
      },
      ngo: {
        name: "Activist",
        desc: "Rights / green / union / think-tank: issue capital plus a grassroots network, Favors +1; poor on purpose (Cash +0)"
      },
      business: {
        name: "Businessman",
        desc: "Founder / finance / real estate: cash explodes; integrity and grassroots trust take the hit"
      },
      operative: {
        name: "Operative",
        desc: "Campaign manager / lobbyist / party staffer - you never run; you run the one who does"
      }
    }
  }
});
