/* ============================================================================
 * CONTENT · i18n/en/reg/01-config.js
 * 中文文件 content/01-config.js（全局配置：派系 / 轨道 / 党派 / 姿态 / 状态词条）
 * 的英文覆盖层。原中文文件是红名单，一个字不动。
 *
 * 契约（详见 docs/I18N.md §3）：
 *   · kind 与中文侧的 POTUS.define 名一致：faction / track / party / stance /
 *     balance —— 分别并进 P.reg.faction、P.reg.track、P.reg.party、
 *     P.reg.stance、P.reg.balance（deep merge，只写要覆盖的字段）。
 *   · 对象键（fac.base / fac.press / D / R / electoral …）被事件 effects.fac、
 *     存档、req.fac、leftbar 到处引用，**一个都不改**；只翻展示值字段
 *     name / desc / effect（tagNames 的 effect 在悬停说明里出现）。
 *   · track 的 key（主属性引用）、balance 的一切数值/权重/条件（identityBias、
 *     econ、voterDynamic…）都是结构键，一律不写。
 *   · 纯标量数组整体替换：fuzzLabels 给全 6 条；quietWorks 按数组下标对齐，
 *     给全 7 组、每组 texts 条数与中文完全一致（5/5/5/4/4/4/5，共 32 条）。
 *   · 属性名（CHA/INT/CUN/INTG）不走注册表：引擎取 ui.attr.*（P.t），
 *     英文已在 content/i18n/en/ui.js 落地，本分片不重复。
 *   · 派系未知兜底名 reg.factionUnknown（"其他"）是 core.js 装载期标量常量，
 *     覆盖层对它只能整体当 kind 挂（mergeNode 要求对象目标），写进去必记
 *     missed —— 需引擎侧改走 P.t，本分片不覆盖，见 w41 回报。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    /* ---------- 派系（好感度条）：name 上左栏/结算面板，desc 留悬停用 ---------- */
    faction: {
      base: {
        name: "Grassroots",
        desc: "How the ward clubs, union locals and church groups feel about you — machine goodwill, not voter counts (voters live in the voter pool)."
      },
      establishment: { name: "Party Establishment", desc: "Chairs, governors and big donors — the people who hand out nominations." },
      commercial: { name: "Business & Wall Street", desc: "Corporate boards and the markets. They fund friends and punish threats." },
      labor: { name: "Labor & Unions", desc: "Union halls and their members: endorsements, strike funds, ground crews." },
      press: { name: "Press", desc: "The newsrooms that decide which stories survive the cycle." },
      military: { name: "Military-Industrial Complex", desc: "Defense contractors, the Pentagon, and the bases parked in their districts." },
      church: { name: "Faith & Values Groups", desc: "Congregations and moral-advocacy networks. They trade blessings for policy." },
      agency: { name: "Intelligence & Law Enforcement", desc: "The agencies and their career staff — secrets, surveillance, and the rule of law." },
      foreign: { name: "Foreign Interests", desc: "Foreign governments and their lobbies. Friendship here is leverage there." },
      tech: { name: "Big Tech", desc: "Platform owners and their fortunes — reach, data, and campaign air cover." },
      criminal: { name: "Underworld", desc: "Organized crime and the gray economy. Easy money, expensive favors." }
    },

    /* ---------- 晋升轨道（key 是主属性引用，不动） ---------- */
    track: {
      electoral: { name: "Electoral Track", desc: "Run for office yourself; climb the party ladder." },
      appointment: { name: "Appointed Track", desc: "Get appointed through expertise, connections or donations." },
      celebrity: { name: "Celebrity Track", desc: "Cash fame in for votes — bypass the party machine." },
      operative: { name: "Operative Track", desc: "Never win yourself; make others win (kingmaker)." },
      wealth: { name: "Wealth Track", desc: "Buy influence with money." }
    },

    /* ---------- 党派 ---------- */
    party: {
      D: { name: "Democrats" },
      R: { name: "Republicans" },
      I: { name: "Independent" }
    },

    /* ---------- 姿态 ---------- */
    stance: {
      establishment: { name: "Establishment", desc: "Back the party line and collect its endorsements and resources — on its orders." },
      outsider: { name: "Outsider", desc: "Fight the party setup: high autonomy, high hostility, a base on fire." }
    },

    /* ---------- 全局配置里的玩家可见词条 ----------
       tagNames：状态词条（状态面板 + 悬停说明；effect 由引擎模板「游戏影响：」包起）。
       fuzzLabels：模糊胜算档位，掷骰界面整体取用 —— 标量数组必须整条给全。
       quietWorks：平静月「这个月做了什么」叙事，引擎按 reg 现读，整体替换 texts；
         组对象只写 texts 一个键，minTier/maxTier/tracks 等筛选条件留在中文侧。 */
    balance: {
      fuzzLabels: ["Long Shot", "Unlikely", "Toss-Up", "Favored", "Near Lock", "Almost Certain"],
      tagNames: {
        investigation_open: { name: "Under Investigation", desc: "A formal inquiry is running against you", effect: "Calendar packs out (activity +0.8); nasty events come likelier" },
        prison: { name: "In Prison", desc: "You landed in the federal system", effect: "Career over (final tally)" },
        president: { name: "President", desc: "You reached the office", effect: "Endgame scores run on the presidency line" },
        president_done: { name: "Ex-President", desc: "Your term has ended", effect: "Retirement ending graded by your presidency" },
        fallen: { name: "Fell Once", desc: "You were knocked off the stage", effect: "Climbing back to T3+ before retiring = the comeback ending; otherwise the rock-bottom one. The topbar spectrum keeps a 'fall' mark" },
        owns_media: { name: "Media Owner", desc: "A pen answers to you", effect: "Unlocks the 'Owner of the Fourth Estate' retirement ending" },
        mentor: { name: "Has a Mentor", desc: "Someone guides you and speaks for you in the room", effect: "Unlocks mentor-only follow-up events (key party moments)" },
        shady_start: { name: "Dirty Start", desc: "Your first fortune wasn't clean", effect: "Unlocks the gray-trade chain — dirty money pulls you deeper" },
        union_backing: { name: "Union Backing", desc: "Organized labor stands behind you", effect: "Unlocks union-backing events; betray it and eat the backlash" },
        archive_taken: { name: "Holds the Files", desc: "That basement filing cabinet is in your hands now", effect: "Unlocks the whole file chain (blackmail / bargain / showdown / closure)" },
        cross_insider: { name: "Joined the Machine", desc: "You took a seat in the party machine", effect: "Party & career events weighted; topbar spectrum keeps a 'machine' mark" },
        cross_runner: { name: "Chose to Run", desc: "At the first fork you printed your name on a ballot", effect: "Career & civil-rights events weighted" },
        cross_staffer: { name: "Chose the Staff", desc: "At the first fork you chose to carry others", effect: "Party & gray-trade events weighted" },
        cross_ngo: { name: "Held the NGO Line", desc: "When the machine came calling, you stayed with the issue group", effect: "Civil-rights events weighted" },
        wave_occupy: { name: "Occupy Veteran", desc: "You spent time in the tents", effect: "Civil-rights events weighted; topbar spectrum keeps an 'occupy' tint" },
        wave_tea: { name: "Tea Party Veteran", desc: "You stood at the town-hall mic", effect: "Civil-rights events weighted; topbar spectrum keeps a 'tea party' tint" },
        wave_antiwar: { name: "Antiwar Veteran", desc: "You marched in the front rows", effect: "Civil-rights events weighted; topbar spectrum keeps an 'antiwar' mark" },
        wave_civil60: { name: "Civil Rights Veteran", desc: "You were there in Washington that August", effect: "Civil-rights events weighted" }
      },
      quietWorks: [
        { texts: [
          "You sorted three hundred constituent calls for the office and filed them one by one: leaking roofs, unpaid bills, a boy bullied at school. You can recite eleven of the callback statuses from memory.",
          "Saturday: four hours gripping hands at the supermarket door with the candidate. The last old lady held on tight — 'You people actually have to do what you say.'",
          "You wrote this month's district newsletter: five hundred words, four rewrites. The editor cut the line you were proudest of.",
          "You took stock of the campaign warehouse: two thousand yard signs, six rolls of banners, one printer that jams on principle.",
          "You covered a zoning hearing for an absent colleague and took seven pages of notes. Three of them were worth something."
        ] },
        { texts: [
          "Two town halls. Forty people at the first, and all they asked about were potholes. Twelve at the second, and all they asked was when you're running again.",
          "Morning: forty minutes of medicare questions at the senior center. Afternoon: forty minutes of tax questions at the chamber of commerce. The two rooms want opposite things.",
          "You rode along on a public-works walk-through of the district's drainage. Nobody covered it. Come a wet November, somebody will remember.",
          "You sent seventeen letters to the district kids graduating high school this year. No return on that — except one ballot, twenty years out.",
          "A casework file: a veteran's benefit had been cut off. You made nine phone calls. The seventh did the trick."
        ] },
        { texts: [
          "This week's meetings: budget, personnel, and one ninety-minute meeting with no agenda. Your memo ran three pages. Half a page of it survived.",
          "You read the whole stack of legislative briefings and wrote the summaries. Two of those lines will be tomorrow's headlines. Right now, you're the only one who knows.",
          "You sat in for the boss at a hearing to take notes. On the ride back you turned the holes in the testimony into a single page. The boss said one word: 'Keep.'",
          "You rewrote a speech past midnight. The version read aloud was draft seven. Draft three was the best one.",
          "Lunch with two staffers from other offices; you came away with three tips. The output of that kind of lunch never shows up in any report."
        ] },
        { texts: [
          "Twenty minutes on a local panel show. Three sentences you said were cut into the teaser — conveniently, the three sharpest you had.",
          "Column deadline. This week you wrote the thing everyone knows and nobody says out loud. The editor didn't change a word.",
          "A charity gala, a ribbon cutting, a commencement speech. Smile held in place the whole time; you stopped counting the handshakes.",
          "Ninety minutes taking listener calls on the radio. One man rang in just to curse you out — you let him finish. That clip got shared the most."
        ] },
        { texts: [
          "You went over two quarters of the books. Some numbers you are still learning to read for what they imply.",
          "Two fundraising dinners: at one you paid, at the other others paid. The conversations at the two tables did not overlap.",
          "You looked over the plans for a property. The broker called it 'a politician's location.' You knew exactly what he meant.",
          "You and the lawyer traced the compliance line on donations again. The gap between legal generosity and buying a person is thinner than you'd thought."
        ] },
        { texts: [
          "Legislative scheduling: two items from your office got on the docket this week, one got pushed off. The sponsor of the pushed-off one is still calling you.",
          "You met two governors, an ambassador, and an old classmate who came to raise money. The calendar describes your position better than any speech.",
          "You walked the annual budget through committee. The three numbers you circled will become three news stories next year.",
          "One appearance on a Sunday national show. Your prepared killer line landed — and so did the prepared blow aimed at you."
        ] },
        { texts: [
          "You finished the backlog of mail. Ninety percent were form letters. You signed every one.",
          "You dropped by the firehouse's anniversary open day, ate two hot dogs, and talked district business with the chief for twenty minutes.",
          "You joined the volunteers for a community cleanup. Two hours of picking up litter surfaced more intelligence than a week in the office.",
          "A four-hour delay at the airport. You finally finished the report you'd been meaning to read for months.",
          "Rain. You cleared every appointment and spent the day in the office thinking the next quarter through."
        ] }
      ]
    }
  }
});
