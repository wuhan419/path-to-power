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
  {
    id: "career_president_great", priority: 95,
    when: { reason: "career_end", flags: ["president_done"], notFlags: ["scandal_4", "scandal_5"] },
    title: "载入史册的总统", grade: "S",
    body: "你把这局棋一路下到了 2025。白宫的几年之后，你没有急着谢幕，而是留在牌桌上看着自己签下的每一条法律、任命的每一个人慢慢改变这个国家。从 1980 走到今天，你的名字早已写进教科书——干净的写进去。"
  },
  {
    id: "career_president", priority: 94,
    when: { reason: "career_end", flags: ["president_done"] },
    title: "留下印记的总统", grade: "A",
    body: "你当过这个国家的总统，也把这一局打到了 2025。任期的功过至今仍在酒吧和社论里吵架，但没人再假装你没来过。从 1980 到收杆这天，权力这座山你翻到了另一面。"
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
