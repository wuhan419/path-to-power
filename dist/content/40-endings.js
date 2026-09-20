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
  {
    id: "default", priority: 0,
    when: {},
    title: "中场", grade: "C",
    body: "故事仍在继续，但这一局到此为止。"
  }
]);
