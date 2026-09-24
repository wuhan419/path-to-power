/* ============================================================================
 * CONTENT · i18n/en/reg/15-cards.js
 * 中文文件 content/15-cards.js（开局天赋卡池）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · 只翻展示字段 name / desc；rarity / effects / mods / critMul / critfailBoost /
 *     hpDecayMul / luckPct / voterDriftMul / spare 都是结构键，一律不写
 *     （写了即 protectedHits，validate 直接判失败）。
 *   · kind 与中文侧一致：card（并入 P.reg.card）。卡 id 被 rollRarity/adoptCards/
 *     keepCard 与 spare 消费，保持稳定。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    card: {
      hometown: {
        name: "Family Help",
        desc: "Your parents press their savings into your hands: starting cash +$60k"
      },
      softie: {
        name: "Soft Touch",
        desc: "Everyone trusts your word and remembers you kindly, but the Establishment thinks you're a pushover: Grassroots +8 · Establishment -5"
      },
      loudmouth: {
        name: "Loudmouth",
        desc: "You say the quiet part loud and the room never goes cold - it's just that nobody takes your word seriously anymore: Charisma +5"
      },
      nerd: {
        name: "Test-Taker",
        desc: "Bonus to Intellect checks, hopeless at small talk: Intellect +5 · Charisma -4, +10% Intellect checks",
      },
      churchkid: {
        name: "Church Regular",
        desc: "A steady congregation network and a word people take to the bank: Church +10 · Grassroots +5"
      },
      orator_card: { name: "Born Orator", desc: "Charisma checks +15%" },
      quant_card: { name: "Numbers Brain", desc: "Intellect checks +15%; smell a crisis early" },
      trust_fund: {
        name: "Trust Fund",
        desc: "Starting cash +$400k, at the price of a whiff of money - and promises people quietly doubt"
      },
      union_kin: {
        name: "Union Family",
        desc: "Unions +25 · Grassroots +10 · Favors +1: one generation's organizing base"
      },
      press_buddy: {
        name: "Press Darling",
        desc: "The media likes you and gives you the benefit of the doubt: Press +10, plus Press-faction check bonuses"
      },
      iron_stomach: { name: "Iron Stomach", desc: "Health decays more slowly - you can outlast any schedule" },
      backroom: {
        name: "Backroom Apprentice",
        desc: "Shrewd maneuvering, just a little off the books - and nobody believes your on-the-record word: Cunning +6, +12% Cunning checks"
      },
      gambler_card: {
        name: "Gambler's Instinct",
        desc: "Crit odds doubled - and so are epic-fail odds"
      },
      koi: { name: "Lucky Charms", desc: "Luck +5% on every check - luck is a kind of skill" },
      old_money: {
        name: "Old Money",
        desc: "Starting cash +$800k; Establishment and Wall Street both open their doors (Grassroots -10)"
      },
      silver_tongue: {
        name: "Silver Tongue",
        desc: "Charisma near the ceiling and a head start on reputation: Charisma +18 · Reputation +12"
      },
      magnetic: {
        name: "Grassroots Magnet",
        desc: "Voters cling to you and goodwill barely drifts: Grassroots +15 · Reputation +5, slower voter drift"
      },
      global_icon: {
        name: "Global Icon",
        desc: "The Schwarzenegger / Trump route: nationwide fame from day one, reputation sky-high - and the Establishment wary of you"
      },
      half_god: {
        name: "Half-Divine Physique",
        desc: "Every gift soars and even your word carries - while the body won't age: Charisma / Intellect / Cunning +12 each, health decay near zero"
      },
      destiny: {
        name: "Destiny's Child",
        desc: "The full luxury start - luck, skill and patrons: Luck +10%, crit odds x1.5, Favors +3, three attributes +6 each"
      },
      immortal: {
        name: "Deathproof Legend",
        desc: "Get out of one fatal ending free (prison / disgrace / ruined / purged / assassinated / framed / bankrupt) - then this card burns up"
      }
    }
  }
});
