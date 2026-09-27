/* ============================================================================
 * CONTENT · 40-endings.js
 * 结局规则（声明式）。引擎按 priority 从高到低挑第一条命中的规则。
 * when 支持的字段见 docs/CONTENT-SCHEMA.md —— 加结局只需在这里加一条。
 * ==========================================================================*/
POTUS.define("ending", [
  {
    id: "president_great", priority: 100,
    when: { reason: "president", notFlags: ["scandal_4", "scandal_5"] },
    title: "伟大的总统", grade: "S",
    body: "你站上了权力的最顶点。历史会争论你究竟拯救了国家，还是掠夺了它，但没人能否认：你改写了这个国家的走向。"
  },
  {
    id: "president_flawed", priority: 99,
    when: { reason: "president" },
    title: "毁誉参半的总统", grade: "B",
    body: "你入主白宫，却也把丑闻带进了椭圆办公室。历史给你的评价，会和你留下的档案一样厚。"
  },
  {
    id: "prison", priority: 100,
    when: { reason: "prison" },
    title: "联邦监狱的住客", grade: "F",
    body: "所有的阶梯、所有的交易，最终通向一扇铁窗。你在认罪书上签了字，时代的某一页记下了你的名字，前面是'定罪'二字。"
  },
  {
    id: "disgrace", priority: 100,
    when: { reason: "disgrace" },
    title: "身败名裂", grade: "F",
    body: "没有手铐，但也没有葬礼——比手铐更冷。你的名字成了丑闻的同义词，剪报的人把你的照片和标题钉在一起存档。政治生命在某个下午戛然而止，你甚至没来得及告别。"
  },
  {
    id: "death_health", priority: 100,
    when: { reason: "death_health" },
    title: "熄灭的灯", grade: "D",
    body: "过劳与放纵先到了。你在 {age} 岁倒下，权力游戏在你闭眼后照常进行。"
  },
  /* ---- v0.12 清算线 BE（140-reckoning 的 hardEnd 理由）：树敌攒恨 → 55 恨清算 →
   *      roll 输即死。黑色幽默成就文案——越不正确越好玩，但梗全部锚在真实史上。 ---- */
  {
    id: "reck_assassinated", priority: 100,
    when: { reason: "assassinated" },
    title: "你和肯尼迪一样，脑洞大开", grade: "F",
    body: "历史课本将记住三个名字：1865 年的林肯、1963 年的肯尼迪、以及今天注解里字号较小的你。这个国家的传统艺能添了新一代传人——观众席的掌声停了半拍，然后开始为你鼓掌。时尚评论没有说谎：你的发型确实至今无人超越——因为没有人活着敢模仿它。政治暗杀从不暗：它只在有人决定试一试的时候才叫意外。"
  },
  {
    id: "reck_framed", priority: 100,
    when: { reason: "framed" },
    title: "罪名莫须有，刑期铁证如山", grade: "F",
    body: "一桩没发生过的案子最后有了真实部分——就是你服刑的这几年。检察官的胜诉率统计里没有你的清白这一项，因为它根本不在证据清单上。系统从不伪造文件，系统只归档；而归档，从不删除。"
  },
  {
    id: "reck_ruined", priority: 100,
    when: { reason: "ruined" },
    title: "头版自己付的，死亡证明也是", grade: "F",
    body: "报业连投四周的系列终于完结，你成了销量最高的那一集。你的名字从政治版迁到了社会版——那里的版面不撤，那里的订阅终身。新闻界从不做假案，他们只把真事按正确的顺序讲完。"
  },
  {
    id: "reck_purged", priority: 100,
    when: { reason: "purged" },
    title: "被本党程序性注销", grade: "F",
    body: "没有弹劾，没有审判——只有选区重划、登记风波和一个「技术性」提名障碍。尼克松那份著名的敌人名单给你补了个位置：第 21 位——前面 20 个都完了。党处理你的文件措辞严谨，像报废一台故障设备：流程都在，只是没有人签字批准你继续存在。机器碾人不点火，只关闸。"
  },
  /* ---- v0.12 学贷死亡螺旋 BE：月供断供连续到上限 → 信用破产（core.js loanStep）。
   *      {late} 由 progression.js 在渲染时替换为本局最长连续逾期月数。 ---- */
  {
    id: "reck_bankrupt", priority: 100,
    when: { reason: "bankrupt" },
    title: "你的竞选经理带着剩余资金去了巴哈马", grade: "F",
    body: "演讲厅还记得你的名字，催收部门只认账号。连续断供 {late} 个月后，法院受理了你的破产申请——第七章，联邦破产法里人气最高的那一章。法官在裁定书末尾写了一句私人评语：「一个能赢下初选的人，没能赢下每月五百块。」至于你的竞选经理——信用冻结生效当天，他最后的社媒定位拿骚，巴哈马，配文：「终于有一笔竞选经费，可以为自己花了。」"
  },
  {
    id: "retire_kingmaker", priority: 85,
    when: { reason: "retire", trackIn: ["operative"] },
    title: "从不参选的人", grade: "B",
    body: "你从未把自己的名字放上选票，却决定了无数人的输赢。这就是幕后之王的退场方式。"
  },
  {
    id: "retire_magnate", priority: 85,
    when: { reason: "retire", trackIn: ["wealth"] },
    title: "用钱买下半张脸", grade: "B",
    body: "你没有赢得选举，你买下了选举。多年以后，人们才发现谁才是真正的庄家。"
  },
  {
    id: "retire_media", priority: 84,
    when: { reason: "retire", flags: ["owns_media"] },
    title: "话语权的所有者", grade: "B",
    body: "你不再需要说服媒体——你就是媒体。你退场那天，头版是你自己写的。"
  },
  {
    id: "retire_high", priority: 70,
    when: { reason: "retire", tierMin: 4 },
    title: "体面的退场", grade: "B",
    body: "你在权力核心坐了足够久，久到人们开始怀念你。这在华盛顿是罕见的成就。"
  },
  {
    id: "retire_comeback", priority: 88,
    when: { reason: "retire", flags: ["fallen"], tierMin: 3 },
    title: "东山再起", grade: "A",
    body: "你从台上摔下来过——交出钥匙的那天，所有人都以为故事结束了。可你从谷底一级一级爬了回来，最后的位置比摔下去之前还高。这个国家喜欢救赎的故事，而你亲手把自己写成了一个。"
  },
  {
    id: "retire_fallen", priority: 66,
    when: { reason: "retire", flags: ["fallen"] },
    title: "从谷底收场", grade: "C",
    body: "你下野过，此后余生都在和那一段日子讲和。你没爬回原来的高度，但你也没有认输——只是台阶太难爬，而时间不够了。"
  },
  {
    id: "retire_low", priority: 60,
    when: { reason: "retire" },
    title: "无声的退场", grade: "C",
    body: "你在 {age} 岁选择了离开，回到没人认识你的地方。没有总统的桂冠，但你也避开了绞索。"
  },
  /* ---- 生涯结算结局（reason: "career_end"）：一路打到 2025 硬上限后主动查看成就。
   *     做到哪一级 = 终局 tier；曾任总统靠 president_done flag 区分（与当前档位无关）。
   *     tierRaw:true 让下面的 tierMin 按新的 10 级空间原样读，不再走 when.js 的旧档映射。 ---- */
  /* ---- #21 M3：白宫账本进结局分级 ----
   * 逐月化之后"当过总统"不再是一个布尔，而是一份可核对的账：
   *   G.pres.months（在任月数）· G.pres.appr（离任支持率）· G.pres.term（干到第几届）
   *   + impeached / scandal_4·5 这两面羞辱旗。
   * 判据一律走 when.js 的 cond 逃生口（第一个参数是真的 G，不是快照——快照里没有 pres），
   * 于是"遗产分档"不新增任何数值系统：引擎已有的四张账，直接换成四档评语。
   * 反过来也成立：**每一档的文案只说它的判据担保得了的话**。2025 收杆时人可能还坐在白宫里
   * （晚期入主），也可能只干了两届中的头一届 —— 这些账本对不上话的档案一律落最后那条
   * career_president：它只陈述"你当过总统、这局打到了 2025"，两句都担保得了。
   * 那条同时兜**逐月化之前的旧档**：没有白宫账本，就没有资格被分档。 */
  {
    id: "career_president_great", priority: 97,
    when: {
      reason: "career_end", flags: ["president_done"], notFlags: ["scandal_4", "scandal_5", "impeached"],
      /* 两道文案诚实闸：
         · months —— `term >= 2` 只证明赢下过连任，不证明坐满八年。
           #21 M3 补之后干满两届会当场收杆（presidency_end），所以这一档现在主要兜旧引擎留下的档
           —— 届满没结算、人还在 tier 8 继续玩的那种，他们的 months 停在两届全长附近。
         · left —— 「走的时候支持率还在中线以上」需要一个"走的时候"。2025 硬上限会在人还坐在
           白宫里那个月收杆（晚期入主就是这种局），那种档案交给最下面那条通用兜底评。 */
      cond: function (G, P) {
        const p = G.pres; if (!p || p.left == null) return false;
        const c = (P.presCfg && P.presCfg()) || { termMonths: 48 };
        return (p.term || 1) >= 2 && (p.months || 0) >= c.termMonths * 2 - 12 && (p.appr || 0) >= 50;
      }
    },
    title: "干满两届的总统", grade: "S",
    body: "你赢下连任，把白宫的椅子坐满了八年，走的时候支持率还在中线以上——这三件事同时成立的人，两只手数得过来。从 1980 走到 2025，你的名字早就进了教科书，而且是干净地进去的。"
  },
  {
    id: "career_president_adequate", priority: 96,
    when: {
      /* impeached 必须进 notFlags：这句文案当面说了「没有把自己的名字写进弹劾条款」。
         弹劾卡无论定罪还是无罪都插那面旗（151-impeachment.js），所以被审过的人一律让给 B 档。
         months 与 left 两道闸同 S 档：标题写着「守住了四年」，正文写着「任期结束时」——
         2025 收杆时刚入主两年的人两样都没兑现，不能让他顶着这两句话结算。 */
      reason: "career_end", flags: ["president_done"], notFlags: ["scandal_4", "scandal_5", "impeached"],
      cond: function (G, P) {
        const p = G.pres; if (!p || p.left == null) return false;
        const c = (P.presCfg && P.presCfg()) || { termMonths: 48 };
        return (p.months || 0) >= c.termMonths - 6 && (p.appr || 0) >= 42;
      }
    },
    title: "守住了四年的总统", grade: "A",
    body: "你在白宫熬过了最难的两年一验货，没有中途被人抬走，也没有把自己的名字写进弹劾条款。任期结束时你的支持率仍在四成以上——在这个国家，这已经算一场成功的执政。"
  },
  {
    id: "career_president_flawed", priority: 95,
    /* B 档的文案点名了三件事：一路往下的支持率、丑闻、调查。所以它的判据也只能是这三件事
       （外加 S/A 两档用 notFlags 推过来的同一批标记）。之前它只要求"有账本"，于是把一届没干完
       的清白离任者一起骂成了消耗战。判据收紧后，那种人落到下面那条通用兜底 —— 那条只陈述事实。 */
    when: {
      reason: "career_end", flags: ["president_done"],
      cond: function (G, P) {
        const p = G.pres; if (!p) return false;
        return (p.appr || 0) < 42 || P.hasFlag("impeached") || P.hasFlag("scandal_4") ||
          P.hasFlag("scandal_5") || P.hasFlag("investigation_open");
      }
    },
    title: "档案比讲话更厚的总统", grade: "B",
    /* 判据是四个"或"，文案就不许写成"且"：被审过但无罪、支持率却收在 55% 的人没被抬走，
       也没输掉民调，他只是那四年里一直有份档案跟着走。 */
    body: "你确实当过这个国家的总统，也确实没能把这几年过成一场胜利：要么民调一路往下，要么弹劾条款、旧账和调查替你占了去版面。历史没有否定你来过，只是把你的名字排在那些守住了位子的总统后面。"
  },
  {
    id: "career_president", priority: 94,
    when: { reason: "career_end", flags: ["president_done"] },
    title: "留下印记的总统", grade: "A",
    body: "你当过这个国家的总统，也把这一局打到了 2025。任期的功过至今仍在酒吧和社论里吵架，但没人再假装你没来过。从 1980 到收杆这天，权力这座山你翻到了另一面。"
  },
  /* ---- #21 M3 补：干满两届就是终局 ----
   * 修之前：第二届届满只 tier −1，人退回 tier 8 那一格（职位名写着「副总统 / 总统候选人」），
   * 于是"坐满八年"的玩家看到的是"我又去当了副总统"，而且游戏还在继续。宪法能给你的最后一道门
   * 已经走完，再往后只是在余温里空转 —— 所以引擎在届满那月挂 reason:"presidency_end"。
   * 三档判据与 career_president_* 同一把尺（白宫账本 + 两面羞辱旗），只是这里不必再等 2025。
   * 输掉连任、被弹劾下台的人走的仍是「离任 → 清算」那条通道，游戏照旧继续，别把他们算进来。 */
  {
    id: "pres_end_great", priority: 101,
    when: {
      reason: "presidency_end", notFlags: ["scandal_4", "scandal_5", "impeached"],
      cond: function (G) { const p = G.pres; return !!(p && (p.appr || 0) >= 50); }
    },
    title: "站着走出白宫的人", grade: "S",
    body: "八年、两场总统大选，开票夜你一次都没输——最后这道门是别人替你关的，不是你撞上的。离职那天你的支持率还在中线以上，这在美国总统里是能数得出来的成绩。台阶下面停着车队，乐队奏的是你自己挑的那首歌。你签名过的每一份文件都还在生效，而你已经不必再为它们中的任何一个解释第二遍。"
  },
  {
    id: "pres_end_steady", priority: 100,
    when: {
      reason: "presidency_end", notFlags: ["scandal_4", "scandal_5"],
      cond: function (G) { const p = G.pres; return !!(p && (p.appr || 0) >= 42); }
    },
    title: "把两届走完的人", grade: "A",
    body: "你在白宫坐满了八年，中途没被谁抬走——包括没被你自己的党抬走。离任时支持率没过中线，可也没跌破四成：对一个总统来说，「他把事情办完了，而且没搞砸」已经是能求到的第二种好话。回忆录的预付款会在你落笔之前到账，评论会在你落笔之后决定怎么称呼你。"
  },
  {
    id: "pres_end_flawed", priority: 99,
    when: { reason: "presidency_end" },
    title: "第二任的尾声", grade: "B",
    body: "两届任期都走完了——单这一条就已经赢过大多数没能站到终点的人，只是后半程你一直在自己的余温里办事。民调一路往下，报纸开始替你整理旧账，党内有人已经改口叫你「前任」。你把名字签在了这个国家的文件上，文件会替你保留位置，但不会替你辩护。"
  },
  {
    id: "career_heavyweight", priority: 75,
    when: { reason: "career_end", tierRaw: true, tierMin: 7 },
    title: "权倾一方", grade: "A",
    body: "你离白宫始终只差一步，却也从未真正走远。四十五年过去，党内的会、州里的钱、国会的人，没几件大事绕得开你。没当上总统，是这个国家的一个遗憾——但不是你的。"
  },
  {
    id: "career_federal", priority: 72,
    when: { reason: "career_end", tierRaw: true, tierMin: 5 },
    title: "联邦层面的名字", grade: "B",
    body: "你从 1980 一路熬进了联邦这一层，并在华盛顿站稳了脚跟。历史不会专门为你留一页，但无数份文件上盖过你的章。这就是一名为官者能求的体面。"
  },
  {
    id: "career_state", priority: 70,
    when: { reason: "career_end", tierRaw: true, tierMin: 3 },
    title: "州政的常青树", grade: "C",
    body: "全国的大舞台没为你亮过灯，但一州之内你换过几届、熬过几任对手，成了本地政坛绕不开的那棵树。四十五年，你把一个州活成了自己的封地。"
  },
  {
    id: "career_local", priority: 68,
    when: { reason: "career_end", tierRaw: true, tierMin: 1 },
    title: "地方深耕者", grade: "D",
    body: "你没能在更高的地方留下名字，但从 1980 年起，一个县城、一个学区、一张地方选票上始终有你。权力的金字塔上你守住了自己的那一格，直到 2025 收杆。"
  },
  {
    id: "career_quiet", priority: 65,
    when: { reason: "career_end" },
    title: "无声的四十一年", grade: "D",
    body: "从 1980 到 2025，你一直在场边。你投过票、捐过款、为别人的胜选鼓过掌，却始终没轮到自己的名字被念出来。这一局结束了——大多数政治故事本来就是这样，安静地开始，安静地收场。"
  },
  {
    id: "default", priority: 0,
    when: {},
    title: "中场", grade: "C",
    body: "故事仍在继续，但这一局到此为止。"
  }
]);
