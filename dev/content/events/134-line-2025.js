/* ============================================================================
 * CONTENT · events/134-line-2025.js
 * 连续时间轴 · 2025 收官年补钉（#32④：每年 ≥2 张钉卡，2025 为 endYear 收官年）。
 *
 *   本文件只写两张 2025 的全国级定点：新政府开局（行政令潮）与「对等关税」休克（四月 announcement → 五月暂停）。
 *
 *   · 不写 era —— 一律 minYear/maxYear + scoped；到点必发靠本文件末尾的 fixed。
 *   · 128 / 133 只写到 2024，2025 年带无人认领，本文件独占，避免串味。
 *   · 近十年题材：事实骨架（日期、程序、机构）从史，立场与后果留给虚构的「你怎么选」；
 *     不写真人姓名，一律职务称谓（总统 / 财政部长 / 贸易顾问 / 联准会主席）。
 *   · 经济字段全部写系数（dyn:true）。引号只用「」。每卡恰一个无 cost 无 req 的保守保底。
 *   · photo 省略：assets/events 里没有 era-2025.jpg，写上去会撞上配图存在性检查，
 *     回落类别程序化配图（与 133-line-gap-19-24.js 的 2023/2024 两卡同法）。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2025-01 · 新总统就职后头两周，行政令一张接一张地签
   * ==================================================================== */
  {
    id: "ln25_inaugural", grade: "major", category: "political",
    valence: "risk", dyn: true,
    minYear: 2025, maxYear: 2025, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 14, unique: true,
    medium: ["tv", "cable", "internet", "social", "shortvideo"], month: 1, day: 27,
    title: "新政府两周签下一串行政令，整个联邦机器连夜改口径",
    body: "就职演讲的余音还没散，行政令就一张接一张地签：联邦用人冻结、机构改名与合并、对外援助暂停、边境与关税指令重发。命令不经国会，直接落到司局一层的表格里。\n" +
      "你这一层当天就接到了电话：有人要你立刻公开背书，有人要你马上出面控诉「越权」。而你的办公室里，等着回话的邮件比往年一个月的量还多。",
    brief: {
      lede: "开局两周是定价窗口：这时说过的每一句话，会被引用四年。",
      known: [
        "行政令不进立法程序，落地却比法案快得多。",
        "用人冻结与机构合并会直接砸进本选区的联邦岗位。",
        "党团已备好一套统一话术，不接也能自己讲。"
      ],
      rumor: [
        "有人说这批命令里有好几条会被联邦法院当场拦下。",
        "有人说真正的设计在部内备忘录里，纸面上看不见。"
      ],
      unknown: [
        "你此刻的定性会被写进下一场听证的主张书。",
        "冻结名单上有没有你认识的人，明天才公布。"
      ],
      terms: [
        { k: "行政令", v: "总统对行政机关的指令，不需国会表决，可被法院撤销。" },
        { k: "用人冻结", v: "暂停对外招聘与补员的行政指令。" }
      ]
    },
    choices: [
      {
        id: "ride", text: "抢在党团前头背书：把这套命令讲成「说到做到」",
        note: "赌新势头的红利会外溢到地方票仓。赌错，法院一撤销，你就成了那个替越权辩护的人。",
        base: 0.40, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "base", w: 0.25 }],
        cost: { fav: 1 }, stake: { fav: true },
        outcomes: {
          crit: { body: "你是同层里第一个把「执行力」讲圆的，全国频道把你的话剪成宣传片。新政府的人记住了你的名字，党部排座次时先问你。", effects: { rep: 1.6, voters: { warm: 500 }, fac: { base: 10, establishment: 6, press: -5 }, flags: ["early_loyalist_25"] } },
          ok: { body: "你站进了第一排，解了自家基本盘的气，也替新势力记下一笔账。", effects: { rep: 0.6, voters: { warm: 150 }, fac: { base: 5, establishment: 3 } } },
          meh: { body: "你也喊了，可镜头都在更响的人身上，没人把你的话当回事。", effects: { rep: -0.1, fac: { establishment: -2 } } },
          fail: { body: "命令一条条被法院拦下，你「说到做到」的说法一天内被逐字重播。", effects: { rep: -1.75, fac: { press: -8, establishment: -5 } } },
          critfail: { body: "一份内部备忘录流出，写着你办公室提前拿到了冻结豁免。「只在对自己有利时讲法治」上了标题。", effects: { rep: -2.75, fac: { press: -10, base: -5, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "block", text: "定调越权：把机构合并与冻结讲成对选区饭碗的攻击",
        note: "赌本地联邦雇员与承包商愤怒。赌错，你成了开局这阵风里最先被吹倒的人。",
        base: 0.38, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "labor", w: 0.2 }],
        cost: { fav: 1 }, stake: { fav: true },
        outcomes: {
          crit: { body: "你把一份命令逐条拆成「谁会被裁、哪家工厂会停摆」，本地台连着播三天。工会与公务员协会第一次把你当自己人。", effects: { rep: 1.5, voters: { warm: 420 }, fac: { labor: 10, base: -6, establishment: 5, press: 5 }, flags: ["decree_skeptic_25"] } },
          ok: { body: "你上了电视，把「越权」两个字说得很稳，对面记了账，自己人点了头。", effects: { rep: 0.6, fac: { labor: 5, press: 3, base: -3 } } },
          meh: { body: "你的控诉淹没在每天十条的通告里，谁也没记住。", effects: { rep: 0 } },
          fail: { body: "民调显示本区多数人挺这批命令，你的高姿态被讲成「不为本地说话」。", effects: { rep: -1.75, fac: { base: -8, press: -4 } } },
          critfail: { body: "你办公室一名助手私下替冻结名单递过条子。你骂别人越权，自己人却在挑人。", effects: { rep: -2.75, fun: -1.5, fac: { press: -10, labor: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "local_first", text: "不裁断不站队：只把冻结与合并落到本区的清单摊开办听证",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "全国在吵合宪不合宪，你只把本区哪些岗位、哪些补助会断摆成一张表。开年评鉴里，「认真听了话」四个字罕见地给了你。", effects: { rep: 0.9, attr: { INTG: 1 }, fac: { base: 5, labor: 4, church: 3 } } },
          ok: { body: "你一句定性没接，把该问的问完了。没人夸，也没人抓你把柄。", effects: { rep: 0.35, fac: { church: 2 } } },
          meh: { body: "你的听证不冷不热，两拨人都把你归进「另册」。", effects: { rep: 0.05 } },
          fail: { body: "同场镇厅会上两拨人都要你表态，你的回避被记成心虚。", effects: { rep: -0.5 } },
          critfail: { body: "你的沉默被两边同讲成「他早知要裁谁却不敢说」。这顶帽子比表态更难摘。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2025-04 · 「对等关税」公布 → 股债汇三杀 → 两周后对多数国家暂停九十日
   * ==================================================================== */
  {
    id: "ln25_tariff", grade: "major", category: "finance",
    valence: "risk", dyn: true,
    minYear: 2025, maxYear: 2025, scoped: true, tierRaw: true, tierMin: 0, tierMax: 5, weight: 14, unique: true,
    medium: ["tv", "cable", "print", "internet", "social"], month: 4, day: 9,
    title: "玫瑰园宣布「对等关税」，十四天后全球市场自行撤诉了一半",
    body: "周四傍晚，一套按国家分档的全面对等关税在玫瑰园公布，连一贯免税的小额包裹也被纳入。接下来几个交易日：股市连续熔断式下挫、国债被抛售、货币指数创下半年新低，进口商在电话里把「四月生效」当成催命符。\n" +
      "两周后，除少数对象外，大部分税档暂停九十日。市场收回了一大半跌幅——可供应链、仓单与订金已经烧掉一批，而你选区里那些报了价的企业，没人会替他们把报价单改回来。",
    brief: {
      lede: "政策可以暂停，账不能。九十天里谁先看清这一点，谁就拿走这一年的定价权。",
      known: [
        "税档按国家分列，生效后又被一纸公告暂停九十日。",
        "股债汇同向下跌的组合，通常只出现在信心出事的时候。",
        "进口商、零售商与农场主的库存账，此刻已经付了钱。"
      ],
      rumor: [
        "有人说暂停是被债市逼出来的，方案本身早有分工。",
        "有人说九十日是谈判窗口，真正落地的税率会另算一套。"
      ],
      unknown: [
        "你的选区哪家厂会因为这批仓单撑不到秋天。",
        "下一轮税档会不会直接落在你最大的雇主头上。"
      ],
      terms: [
        { k: "对等关税", v: "以贸易逆差反推税率、按国家分档的一揽子关税。" },
        { k: "九十日暂停", v: "公告后暂时不执行一段期限，留出谈判窗口。" }
      ]
    },
    choices: [
      {
        id: "defend", text: "把关税讲成必要的硬仗：短期阵痛换制造业回流",
        note: "赌「回流」的叙事能撑过这一年的物价。赌错，你成了物价单上被点名的人。",
        base: 0.40, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "labor", w: 0.25 }],
        cost: { fav: 1 }, stake: { fav: true },
        outcomes: {
          crit: { body: "你把一场休克讲成「把饭碗抢回来的代价」，蓝领选民吃这一套，工会把你请上讲台。捐款人却开始算自己的成本。", effects: { rep: 1.5, voters: { warm: 460 }, fac: { labor: 9, base: 6, commercial: -6, press: -3 }, flags: ["tariff_defender"] } },
          ok: { body: "你替硬仗挡了几轮提问，自己这边稳住了，账面上却欠了零售商一笔。", effects: { rep: 0.6, fac: { labor: 4, base: 3, commercial: -4 } } },
          meh: { body: "你跟着喊了口号，风头全被更权威的人念走。", effects: { rep: -0.1 } },
          fail: { body: "超市价签一天一改，记者把账单拍在你办公室门口。", effects: { rep: -1.75, fac: { base: -6, press: -6, commercial: -5 } } },
          critfail: { body: "你持股的一家进口商在暂停前夜低价甩了仓单，时间戳清清楚楚。「他先知道」上了标题。", effects: { rep: -2.75, fun: -2, fac: { press: -10, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "relief", text: "打局部补丁：为本区的进口商与农场主要豁免、要过渡期",
        note: "花钱做实务。谈成了是「会办事」，谈砸了两边都嫌你添乱。",
        base: 0.44, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "commercial", w: 0.2 }],
        cost: { fun: 1.5 },
        outcomes: {
          crit: { body: "你把一份本区清单谈进补充公告：几类零件延后、几家仓库先放行。「能落地」的招牌从此挂在你名下，连对面也承认你专业。", effects: { rep: 1.4, attr: { INT: 2 }, fun: 1, fac: { commercial: 8, establishment: 6, labor: 3, base: -3 } } },
          ok: { body: "你争到一批临时豁免，清单不大，但每一条都有名字。", effects: { rep: 0.6, fun: 0.5, fac: { commercial: 5, establishment: 3 } } },
          meh: { body: "你磨了几轮，只落进「九十天后再议」，仓单还是烂在码头。", effects: { rep: 0, fun: -1 } },
          fail: { body: "补充公告没有你的名字，媒体却把你归进「只会抱怨的本地议员」。", effects: { rep: -1.75, fun: -1.5, fac: { establishment: -6, commercial: -4 } } },
          critfail: { body: "为你牵线豁免的那家报关行，账上挂着老熟人。你替本区争的豁免，被讲成替自家争的。", effects: { rep: -2.75, fun: -2, fac: { press: -8, commercial: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "wait_out", text: "不裁断不押注：只做本地企业与家庭的成本听证，等九十日见分晓",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "全国在吵要不要关税，你只把「这一箱货涨了几块钱」记成一张表。秋天回看，那份表成了本地唯一的凭据。", effects: { rep: 0.9, attr: { INTG: 1 }, fac: { base: 5, church: 4, commercial: 2 } } },
          ok: { body: "你一句立场没接，把该记的账记完了。没人夸，也没人抓你把柄。", effects: { rep: 0.35, fac: { church: 2 } } },
          meh: { body: "你躲过了这轮风口，也躲过了所有人的记忆。", effects: { rep: 0.05 } },
          fail: { body: "亏钱的企业主挤满同一场听证，都要你给句话。你的回避被记成心虚。", effects: { rep: -0.5 } },
          critfail: { body: "你的沉默被两边同讲成「他知道会涨却不敢说」。这顶帽子比表态更难摘。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * fixed · 本带定点表（两处，2025 收官年 ≥2 张，满足 #32④ 密度门禁）
 *   · 月日按史实窗口：开局行政令潮 2025-01（就职后两周）；对等关税公告 2025-04-02 起、
 *     暂停九十日 2025-04 下旬，本卡取「宣布后两周的休克」这一档期。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln25_inaugural", year: 2025, month: 1, grade: "major" },
  { event: "ln25_tariff", year: 2025, month: 4, grade: "major" }
]);
