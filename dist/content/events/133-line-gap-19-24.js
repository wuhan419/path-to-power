/* ============================================================================
 * CONTENT · events/133-line-gap-19-24.js
 * 连续时间轴 · 2019—2024 定点大事「补薄」（Track B 第二轮补漏，worker w59）。
 *
 *   本文件只做三张定点大事的补薄卡（气候与工业新政决议 / 前总统被联邦与州检方起诉 /
 *   最高法院就总统官方行为豁免作出裁定 + 同月选举年换人）。
 *
 *   · 不写 era —— 一律 minYear/maxYear + scoped；到点必发靠本文件末尾的 fixed。
 *   · 世界线（pressure/brief/outlets）的 2019 / 2023 / 2024 已由 127 / 128 年带 owner 写过，
 *     本文件不重复，只钉自己的三处 fixed，避免同年带串味。
 *   · 近十年题材：事实骨架（日期、票数、程序）从史，立场与后果留给虚构的「你怎么选」；
 *     不写真人姓名，一律职务称谓（前总统 / 在任者 / 副手 / 众院某集团）。
 *   · 经济字段全部写系数（dyn:true）。引号只用「」。每卡恰一个无 cost 无 req 的保守保底。
 *   · photo 只用 assets/events 里存在的文件名：era-2019.jpg 存在，era-2023/2024 不存在，
 *     故后两卡省略 photo，回落类别程序化配图（与 128-line-2022-24.js 同法）。
 * ==========================================================================*/

POTUS.define("event", [

  /* ======================================================================
   * 2019-02 · 十年期气候与工业新政决议在众院被提出（净零 + 公共投资 + 再培训捆绑）
   * ==================================================================== */
  {
    id: "ln19_gnd", photo: "era-2019.jpg", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2019, maxYear: 2019, scoped: true, tierRaw: true, tierMin: 1, tierMax: 6, weight: 12, unique: true,
    medium: ["tv", "cable", "internet", "social"], month: 2, day: 5,
    title: "一份十年期气候与工业新政决议在众院提出",
    body: "二月，一份十年期「气候与工业动员」共同决议（只表达立场、不进表决、不送行政签署）被摆上众院案头：电力侧近零碳、基建与再培训捆绑拨款。它不是能过关的法案，却先把党切成两截——沿海新人抢着联署，靠化石能源吃饭的州议员夹在连串电话与听证之间。一个刚成军、只占几席的小集团，一夜之间既是盟友，也是标靶。\n" +
      "联署要趁早：慢一步，小集团就把你记进对面。你还没认全他们的脸——他们已经记住你了。",
    choices: [
      {
        id: "back_plan", text: "联署背书：和小集团一起把十年动员举成主线",
        note: "赌这场路线清洗会把你抬上新阵营门口。赌错，能源州先把你挂上黑名单。",
        base: 0.40, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "base", w: 0.25 }],
        cost: { fav: 1 }, stake: { fav: true },
        outcomes: {
          crit: { body: "你把「一场代际的动员」喊上了全国版面，年轻选民与环保捐款一起涌进来。小集团把你当门面，党机器开始认真排你的位置。", effects: { rep: 1.6, voters: { warm: 500 }, fac: { base: 10, press: 6, establishment: -6, commercial: -5 }, flags: ["gnd_champion"] } },
          ok: { body: "你署了名、上了台，解了自家基本盘的气，也替金主记下一笔账。位置没挪，标签贴上。", effects: { rep: 0.6, voters: { warm: 150 }, fac: { base: 5, establishment: -3 } } },
          meh: { body: "你联了署，风头却全被更响的新人抢走，没人把功劳分到你名下。", effects: { rep: -0.1, fac: { establishment: -2 } } },
          fail: { body: "能源州的反扑广告打到你选区循环播，「他砸大家的饭碗」被逐字重播。", effects: { rep: -1.75, fac: { commercial: -8, establishment: -5 } } },
          critfail: { body: "你一处旧石油股被翻出，和「告别化石燃料」的口号对打。「只在作秀时才讲气候」上了标题。", effects: { rep: -2.75, fac: { commercial: -10, press: -6, base: -4 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "negotiate", text: "把条款改成自家账：要电网韧性、要工厂与再培训岗落地",
        note: "花钱换「能办事」招牌。两头开价，成了两边都欠你，砸了两边都嫌你滑。",
        base: 0.44, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "labor", w: 0.2 }],
        cost: { fun: 1.5 },
        outcomes: {
          crit: { body: "你把「转型别落下这座城」谈进附款，工会与商会各给你留了座位。媒体封你为「会做交易的人」，两拨人都得认账。", effects: { rep: 1.4, attr: { INT: 2 }, fun: 1, fac: { establishment: 7, labor: 6, commercial: 4, base: -3 } } },
          ok: { body: "你争到一笔试点拨款，条款没大改，但你这条街的名字进了清单。", effects: { rep: 0.6, fun: 0.5, fac: { establishment: 4, labor: 3 } } },
          meh: { body: "你磨了几轮，只落进「下个会期再议」，钱和条款都没跑出来。", effects: { rep: 0, fun: -1 } },
          fail: { body: "两头都觉得被耍了：进步派骂你稀释决议，厂矿嫌你引狼入室。", effects: { rep: -1.75, fun: -1.5, fac: { base: -5, establishment: -4 } } },
          critfail: { body: "你为「再培训」牵线的那家承包商，账上挂着老熟人。危机里发财的说法第一次有人笑着讲。", effects: { rep: -2.75, fun: -2, fac: { press: -8, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "listen_local", text: "不表态站队：只开一场本地电网与就业听证，一个字不押",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "全国在吵路线，你只把本地电价与岗位摊开听完。开年评鉴里，「认真听了话」四个字罕见地给了你。", effects: { rep: 0.9, attr: { INTG: 1 }, fac: { base: 5, church: 4 } } },
          ok: { body: "你一句路线没接，把该听的听完了。没人夸，也没人抓你把柄。", effects: { rep: 0.35, fac: { church: 2 } } },
          meh: { body: "你的听证不冷不热，两拨人都把你归进「另册」。", effects: { rep: 0.05 } },
          fail: { body: "两拨人挤满同一场镇厅会，都问「你到底挺不挺」。你的回避被记成心虚。", effects: { rep: -0.5 } },
          critfail: { body: "你的沉默被两边同讲成「他知道自己理亏」。这顶帽子比表态更难摘。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2023-08 · 一位前总统先后被联邦与州检方起诉（文件案 + 选举干预案）
   * ==================================================================== */
  {
    id: "ln23_indict", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2023, maxYear: 2023, scoped: true, tierRaw: true, tierMin: 1, tierMax: 7, weight: 12, unique: true,
    medium: ["cable", "tv", "internet", "social", "shortvideo"], month: 8, day: 1,
    title: "一位前总统先后被联邦与州检方起诉",
    body: "入夏到入秋，一位前总统先被联邦特别检察官（独立于常规检察线的起诉人）起诉，随后又被一州检方以干预选举另案起诉：文件、密件、选票，数十项罪名与竞选集会同档期出现。本党喊「迫害」，对手喊「问责」。第十四条第三款——参与叛乱者不得任公职——头一回被当成初选资格问题摆上台面，而这条款能不能套用，学界此刻两边都有人背书。\n" +
      "两案各走各的程序。你怎么给它们命名，法庭文件里就会怎么引用你。",
    choices: [
      {
        id: "defend", text: "替前总统挡：咬定两案都是政治迫害",
        note: "赌基层要的就是这句硬话。赌错，你成了「明知有罪仍护主的人」。",
        base: 0.40, mods: [{ src: "attr", key: "CUN", w: 0.4 }, { src: "fac", key: "base", w: 0.3 }],
        cost: { fav: 1 }, stake: { fav: true },
        outcomes: {
          crit: { body: "你在电视上替前总统挡得滴水不漏，集会现场喊你的名字。基层把你当自己人，党内通道向你敞开。", effects: { rep: 1.5, voters: { warm: 500 }, fac: { base: 10, establishment: 6, press: -6 }, flags: ["persecution_defender"] } },
          ok: { body: "你喊了迫害，自己这边解了气，对面记了账。位置没动，标签贴上了。", effects: { rep: 0.6, voters: { warm: 150 }, fac: { base: 5, press: -4 } } },
          meh: { body: "你跟着骂了两句，没人接茬——这场戏里轮不到你念台词。", effects: { rep: 0, fac: { press: -2 } } },
          fail: { body: "起诉书一条条摊在电视上，你「无罪」的话越来越难说出口。", effects: { rep: -1.75, fac: { press: -8, establishment: -4 } } },
          critfail: { body: "一宗旧往来被翻出来，正好打在你喊的「政治操弄」上。「他只在对自己有利时讲法治」上了标题。", effects: { rep: -2.75, fac: { press: -10, establishment: -6, base: -5 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "eligibility", text: "接住对手框架：推动把资格条款交出去裁断",
        note: "赌「宪政守门」这顶帽子值钱。对旧主开炮，风险是被本党钉成内奸。",
        base: 0.43, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "establishment", w: 0.25 }],
        cost: { fun: 1 },
        outcomes: {
          crit: { body: "你把「能不能参选」摆成一道宪政题，全国评论圈把你立成「敢讲规则的人」。建制与报界难得同版夸你。", effects: { rep: 1.5, attr: { INT: 2 }, fac: { establishment: 9, press: 6, base: -8 }, flags: ["institutionalist"] } },
          ok: { body: "你递了问责信，议题钉上了听证桌。本党嫌你吵，但没人当面说你错。", effects: { rep: 0.6, fac: { establishment: 4, press: 3, base: -4 } } },
          meh: { body: "你引经据典，听证排到了选后。谁也没等来结果。", effects: { rep: -0.1 } },
          fail: { body: "本党把「资格」听成「投敌」，你的捐款名单开始漏风。", effects: { rep: -1.75, fac: { base: -8, establishment: -4 } } },
          critfail: { body: "你替州检方「说句话」的记录被人捅出，问责者成了被问责的。「里通对手」的帽子扣上头。", effects: { rep: -2.75, fun: -1.5, fac: { base: -10, press: -8 }, flags: ["scandal_2", "investigation_open"] } }
        }
      },
      {
        id: "casework", text: "不接定性话：只把选区的实事办下去",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "全国在吵起诉书，你在破水管前拍了照。本地报罕见地把「干了实事」四个字给了你。", effects: { rep: 0.9, attr: { INTG: 1 }, fac: { base: 5, church: 4 } } },
          ok: { body: "你一句定性没接，把该办的事办了。没人夸，也没人抓你把柄。", effects: { rep: 0.35, fac: { church: 2 } } },
          meh: { body: "你躲过了这轮口水，也躲过了所有人的记忆。", effects: { rep: 0.05 } },
          fail: { body: "两拨人挤在同一场镇厅会，都问「你到底站哪边」。你的回避被记成心虚。", effects: { rep: -0.5 } },
          critfail: { body: "你的沉默被两边同讲成「他知道那事不占理」。这顶帽子比表态更难摘。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  },

  /* ======================================================================
   * 2024-07 · 最高法院裁定总统官方行为豁免 + 同月执政党选举年换人
   * ==================================================================== */
  {
    id: "ln24_immune", grade: "mid", category: "political",
    valence: "risk", dyn: true,
    minYear: 2024, maxYear: 2024, scoped: true, tierRaw: true, tierMin: 1, tierMax: 7, weight: 12, unique: true,
    medium: ["tv", "cable", "social", "shortvideo", "deepfake"], month: 7, day: 1,
    title: "最高法院为总统官方行为划下豁免界线",
    body: "七月，最高法院以六比三裁定：总统的官方行为（以总统职权所为，区别于私人行为）享有刑事追诉豁免，核心部分绝对豁免、其余可查——能不能起诉，要按下级法院对「官方还是私人」的划线重来，案发回重审（上级退回下级另作认定），赶不赶得上选前开庭没人打包票。同月，执政党发生罕见的选举年换人：在任者退选、副手接棒，而新提名要到八月党代会才正式定死。\n" +
      "有人说接棒者的班底名单已在私下过筛。你今天对裁定挑的用词，秋天会被反着引用。",
    choices: [
      {
        id: "ride_change", text: "押新政：替接棒的副手把「更新」喊成主线",
        note: "赌换人能带来捐款与士气的复利。赌错，你押的是一架还没坐稳的梯子。",
        base: 0.42, mods: [{ src: "attr", key: "CHA", w: 0.4 }, { src: "fac", key: "establishment", w: 0.25 }],
        cost: { fav: 1 }, stake: { fav: true },
        outcomes: {
          crit: { body: "你把「翻开的新一页」喊进全国版面，换人抬起的势头把你一并托上浪尖。新班底的人事清单里有你的名字。", effects: { rep: 1.5, voters: { warm: 400 }, fac: { establishment: 9, base: 5, press: 4 }, flags: ["new_ticket"] } },
          ok: { body: "你上了「可培养」名单，也上了「见风转舵」名单——两边同时。", effects: { rep: 0.6, fac: { establishment: 5, base: -3 } } },
          meh: { body: "你跟着喊了新，风头全被真正的主角抢走，没人记得你的口号。", effects: { rep: -0.1, fac: { establishment: -2 } } },
          fail: { body: "势头来得快去得也快，你的「押早了」被人剪成对比广告循环播。", effects: { rep: -1.75, fac: { establishment: -6, base: -4 } } },
          critfail: { body: "换人后新班底内斗，把你当旧线索的投名状抛出来：「那个墙头草」。两党共同的反面教材。", effects: { rep: -2.75, fac: { establishment: -10, base: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "attack_immunity", text: "痛批豁免裁定：把它说成「给总统一人开脱」",
        note: "赌制度焦虑会转成投票率。对法院开炮，风险是把建制与执法都推到对面。",
        base: 0.45, mods: [{ src: "attr", key: "INT", w: 0.4 }, { src: "fac", key: "press", w: 0.2 }],
        cost: { fun: 1 },
        outcomes: {
          crit: { body: "你的「没人能凌驾于法律之上」被全国转播台反复引用，「制度守门人」的招牌立住了。", effects: { rep: 1.5, attr: { INT: 2 }, voters: { warm: 300 }, fac: { press: 8, base: 5, establishment: -6 }, flags: ["institutionalist"] } },
          ok: { body: "你痛批了裁定，稳住了自家士气，也替对手记了一笔。", effects: { rep: 0.6, fac: { press: 4, base: 3, establishment: -4 } } },
          meh: { body: "你喊了一礼拜，被同月的换人大戏盖得严严实实。", effects: { rep: -0.1 } },
          fail: { body: "对法院开炮的话被人指成「不懂宪法」，法律圈联名声讨，报界也嫌你过火。", effects: { rep: -1.75, fun: -1, fac: { establishment: -6, press: -5 } } },
          critfail: { body: "你引用的裁定段落被人证伪，指控调头成了你的笑话。发言人念着你的名字松了口气。", effects: { rep: -2.75, fun: -1.5, fac: { press: -10, establishment: -6 }, flags: ["scandal_1"] } }
        }
      },
      {
        id: "quiet_prep", text: "不裁断不站队：安静准备交接、把本地实事办下去",
        base: 0.58, mods: [{ src: "attr", key: "INTG", w: 0.4 }],
        outcomes: {
          crit: { body: "全国在吵豁免与换人，你只把该归档的归档、该跑的实事跑完。风平浪静后，「稳当」二字写进了复盘。", effects: { rep: 0.9, attr: { INTG: 1 }, fac: { base: 5, establishment: 2 } } },
          ok: { body: "你一句定性没接，把该办的事办了。没人夸，也没人抓你把柄。", effects: { rep: 0.35, fac: { church: 2 } } },
          meh: { body: "你躲过了这轮风口，也躲过了所有人的记忆。", effects: { rep: 0.05 } },
          fail: { body: "两拨人挤在同一场镇厅会，都要你表个态。你的回避被记成心虚。", effects: { rep: -0.5 } },
          critfail: { body: "你的沉默被两边同讲成「他早知结局不敢说」。这顶帽子比表态更难摘。", effects: { rep: -1, fac: { press: -3 } } }
        }
      }
    ]
  }
]);

/* ============================================================================
 * fixed · 本带定点表（三处，均为新卡自钉；不重复 127/128 已写的年份世界线）
 *   · 月日按史实窗口：gnd 决议 2019-02 提出；indict 联邦首案 2023-08；immune 裁定 2024-07-01。
 * ==========================================================================*/
POTUS.define("fixed", [
  { event: "ln19_gnd", year: 2019, month: 2, grade: "mid" },
  { event: "ln23_indict", year: 2023, month: 8, grade: "mid" },
  { event: "ln24_immune", year: 2024, month: 7, grade: "mid" }
]);
