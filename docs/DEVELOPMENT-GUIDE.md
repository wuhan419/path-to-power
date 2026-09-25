# 开发指南（DEVELOPMENT-GUIDE）

> 面向接手者。目标是：**新人 1 小时内能独立产出可上线的改动**，且**引擎与内容通过注册表解耦、互不阻塞**。
> 本项目当前是**单人串行开发**为主；多人/多代理并行扩内容时的分工与门禁，见 [`PARALLEL-CONTENT-WORK.md`](./PARALLEL-CONTENT-WORK.md)。
> 配套文档：接口字段细节见 [`CONTENT-SCHEMA.md`](./CONTENT-SCHEMA.md)；中英双语契约见 [`I18N.md`](./I18N.md)；设计理念见 [`DESIGN.md`](./DESIGN.md)；项目总览与快速上手见仓库根 [`README.md`](../README.md) 与 [`CONTRIBUTING.md`](../CONTRIBUTING.md)。
> 除特别说明外，本文里的 `engine/`、`content/`、`tools/`、`index.html` 等路径都相对 `dev/`。

---

## 1. 一句话架构

```
        ┌─────────────────────────────────────────────┐
        │  内容（content/）  —— 高频改动、可无限扩       │
        │  事件 / 年代线 / 出身 / 天赋 / 起点 / 州        │
        │  党派 / 派系 / 仇家(清算) / 黑天鹅 / 填充       │
        │  结局规则 / 类型 / 量级 / 媒介 / 世界线+定点    │
        └───────────────────┬─────────────────────────┘
                            │  POTUS.define(kind, payload)    ← 唯一接口
        ┌───────────────────▼─────────────────────────┐
        │  引擎（engine/ + engine/view/）—— 低频改动     │
        │  注册表 / 掷骰 / 效果 / 事件抽取 / 时间推进    │
        │  生涯结算 / 界面视图 / 程序化美术 / 存档 / i18n │
        └─────────────────────────────────────────────┘
```

**核心原则（不可违背）**

1. 引擎只提供**机制**，不含任何剧情与数值。
2. 内容只声明**数据**，不含逻辑分支。
3. 新增内容**永远不需要**修改 `engine/`。
4. 内容需要的新机制，由引擎侧实现为新字段并更新契约，**内容侧不得绕过契约 hack 引擎**。

**时间模型：一个月一回合，一条 1980→2025 的连续生涯线。** 一个档期（slot）= 一次需要玩家决策的事件；
本月有没有档期、有几个、每个是什么量级，全部由「时代压力 + 玩家活跃度」决定。
玩法核心不是"选时代"，而是**一条按绝对年月推进的连续时间轴**：时代压力优先按年读 `worldline.pressure`（该年不在轴上才回落 `era.pressure`），大事件则钉进全局 `fixed` 定点表**到点必发**。
生涯终点是 `balance.endYear: 2025` 硬墙——到点触发 `career_end` 成就结算（**当上总统不再即时结束**，曾任总统靠 `president_done` 标记区分结局）。
内容作者用这条轴控制"哪一年多动荡、哪个月必发生什么"，而不是堆事件数量。
细读 [`CONTENT-SCHEMA.md` §0.5 / §1.5 / §1.6](./CONTENT-SCHEMA.md)。

---

## 1.5 两大核心系统：三值性 & 动态经济（必读）

这是 v0.6 之后最重要的两条设计。写卡前必须理解，否则数值与语义都会写歪。

### 1.5.1 事件三值性（valence）

每张事件卡声明一个 `valence`：

| 值 | UI 徽标 | 语义（引擎强制） |
|---|---|---|
| `boon` | 🟢 机遇 | 净收益下限：最差档也只是"少赚"，绝不转盈为亏。 |
| `risk` | 🟡 风险 | 提供无风险保底选项，或高波动的"博一下"；风险越大幅度越大。 |
| `bane` | 🔴 威胁 | 默认净损，但可被高掷骰 / 高属性 / 花钱规避，甚至变坏为好。 |

**两段式独立抽取**：每个档期先独立掷一类（`P.pickValence()`，权重 `balance.valenceWeights`），再在该类池子里按量级取；该类池空了按相邻类降级（`VAL_CHAIN`，风险优先当缓冲垫）。类与类互不挤占。

**契约在引擎层强制**：三值性的语义由 `engine/scale.js` 的 `shapeByValence()` 在结算瞬间按声明意图兜底（boon 删 cost + 抹平负值；risk 缺保底时注入 `lay_low`）。所以内容侧只需写清"意图 + 系数"，不必逐条手抠负值；但**语义基调要对**：别把纯灾难写成 `boon`。

> ⚠️ **每个时代都得有新人可及（`tierMin≤1`）的机遇卡**，否则那段时代掷中"机遇"会静默降级为"风险"，好运被吞。`node tools/audit.js` 的第④节会逐时代报覆盖缺口（`content/events/109-boon-fill.js` 就是为堵这个缺口补的）。

### 1.5.2 系数制动态经济（卡只存系数）

事件卡的经济字段（`fun` / `rep` / `cost.fun` / 各种 `effects`）**一律写系数，不写绝对金额**，并在事件上标 `dyn: true`。抽中时 `P.realize(ev)` 把系数 × 当前人物的"标尺"（`P.ruler(grade, ev)`）翻译成绝对值：

```
钱   = 系数 × (职位月薪 × funMonths[量级] × 属性系数 × 职级系数)
声望 = 系数 × repBase[量级] × 职级系数(±tierLean/级) × 属性系数
```

- **语义锚**：系数 `1.0` = T2 基准人物（主属性 50）在该量级的标准份量。
- **标尺参数**在 `content/01-config.js` 的 `balance.econ`（`funMonths / repBase / tierLean / attrLean / coefMin / coefMax / coefMaxFun`；`hpBase` 只是退役键的遗留项）。改这些会平移全局经济曲线，**改完必须重跑 `validate.js`**。
- 系数合法区间由 `validate.js` 逐卡核对（`fun` 因天然上百份而单独放宽到 `coefMaxFun`）。
- 健康(`hp`)与精力(`ap`)已于 v0.9 退役，不再是经济字段；残留写法是空操作（见 §5.3）。

**批量迁移**：把旧的绝对金额卡一次性折算成系数 + 标注 `valence`/`dyn`，用 `node tools/migrate-scale.js`（详见工具内注释；产物只是草稿，逐卡人工审查）。

---

## 2. 目录结构

```
项目根/
├── dev/                      ★ 开发区：引擎 + 内容 + 工具（日常一切改动都在这里）
│   ├── index.html            加载器。四个区（行号会漂移，以注释锚点为准）：
│   │                           ① 引擎引入区（engine/**，归引擎改动）
│   │                           ② 内容白名单区（content/ 顶层与早期事件文件，手工维护）
│   │                           ③ BEGIN/END content-auto-manifest 托管区 —— 只能由
│   │                              `node tools/gen-manifest.js` 重写，覆盖 events/120—133 与 140-reckoning，
│   │                              **新增事件文件不要手改 index.html，跑 gen-manifest**
│   │                           ④ BEGIN/END i18n-manifest 托管区 —— 同样由 gen-manifest 全量重写
│   ├── engine/               ★ 引擎：稳定，改动需走契约审查
│   │   ├── style.css         界面样式（含 v0.12 竖屏/移动适配块，见下）
│   │   ├── core.js           注册表 define() / 工具 / 状态 / 存档 / 平衡参数入口
│   │   ├── i18n.js           ★ 本地化地基：P.t(key, 中文原文) + l10n 覆盖层（见 docs/I18N.md）
│   │   ├── when.js           声明式条件判定（era/tier/flags/after/count 门槛… 词汇表）
│   │   ├── dice.js           胜算公式 / 资源投注(stake，级别价：单价只看身位) / 五档掷骰
│   │   ├── effects.js        后果应用（含 count 仇恨计数、funMul 的 INT 修正等可扩展效果键）
│   │   ├── scale.js          ★ 三值性兜底 + 系数制动态经济（人物标尺；投注单价在 dice.js 的 stakeFunPer）
│   │   ├── events.js         事件筛选·抽取·填充·新闻 + identityBias/resourceBias 倾斜表
│   │   ├── flavor.js         ★ 时代风味词典：{ORG}/{PLACE}/{MEET} 占位符按当年填真实面孔
│   │   ├── time.js           ★ 时间推进：年→月→档期、压力、量级抽取、定点命中、choresSlot
│   │   ├── arc.js            主线引擎（保留；多支路主线已砍掉，见 content/11-arcs 停用说明）
│   │   ├── campaign.js       ★ 竞选链子系统：分幕强制推进、选情 meter、跌破即崩盘
│   │   ├── vignette.js       ★ 静好岁月：平静月随笔拼装 + "按部就班"的成长结算
│   │   ├── progression.js    终局判定（声明式规则）+ 生涯结算（career_end / president_done）
│   │   ├── art.js            三级降级的程序化 SVG 插画（事件专属 → 类型默认 → 引擎兜底）
│   │   └── view/             ★ 界面层：原 render.js 按职责拆分为 8 片（shell/title/create/
│   │                            topbar/leftbar/stage/actions/fanfare.js；shell.js 最先加载，定义 P.boot）
│   ├── content/              ☆ 内容：随便加，引擎自动适配
│   │   ├── 01-config.js      平衡参数 / 投注级别价 / 派系 / 仇家(wrath) / 学贷(studentLoan) / 轨道 / 党派 / 姿态 / 词条名 / 静好成长曲线
│   │   ├── 05-categories.js  ★ 事件类型 13 个（每个自带默认配图与配色）+ 量级定义
│   │   ├── 06-media.js       ★ 时代媒介时间轴（报纸/广播/电视/互联网/短视频… 各自起始年）
│   │   ├── 07-contacts.js    ★ 人脉登记表（这一局里能反复出场的那些"人"）
│   │   ├── 08-vignettes.js   ★★ 静好岁月素材库：时令/世相/案头/日常/心绪/收束 六个槽位
│   │   ├── 09-flavor.js      ★ 时代风味词典（配合 engine/flavor.js 的占位符）
│   │   ├── 09-photo-art.js   ★★ 事件配图的照片层（类型 → assets/events/<key>.jpg，13 类全配）
│   │   ├── 10-characters.js  出身 / 天赋 / 起点路径
│   │   ├── 11-arcs.js        多支路主线 —— **已在 index.html 注释停用**（文件保留便于回退）
│   │   ├── 12-states.js      出生州（10 个：倾向 D/R/S、顺风逆风、entryEffects）
│   │   ├── 13-year-tales.js  年终随笔素材库（做了什么/得失/处境 三段人话）
│   │   ├── 14-offices.js     职位名表 + 职位月薪表（状态面板职位卡）
│   │   ├── 20-eras.js        时代锚点（迁移期兼容层，仅存 1980/1990/2001/2008/2016 五个）
│   │   ├── 21-worldline.js   ★★ 连续时间轴基线：1980—1990 的 pressure/brief/outlets + 全局 fixed 定点表
│   │   ├── 30-fillers.js     填充模板（保证事件永不枯竭）
│   │   ├── 40-endings.js     结局规则（声明式：reck_* 清算线 + career_* 生涯结算 + 兜底）
│   │   ├── 61-campaigns.js   ★★ 竞选链：9 条民选晋升链定义（分幕 + gate + meters）
│   │   ├── events/           事件库（42 个文件，按时代/主题/年带分文件）：
│   │   │   ├── 50-era-2008.js · 54-era-waves.js · 55-media-timeline.js · 60-progression.js
│   │   │   ├── 62-crossroads.js · 64-states.js · 65-campaign-acts.js · 70-demo-resources.js
│   │   │   ├── 80-shady.js · 82-press.js · 84-archive.js · 86-enclave.js
│   │   │   ├── 88-finance-2.js · 90-career-2.js · 91-scandal-2.js · 93-media-2.js
│   │   │   ├── 94-foreign-2.js · 95-political-2.js · 96-crisis-2.js · 97-setbacks.js
│   │   │   ├── 105—108-era-*.js（四时代专属）· 109-boon-fill.js · 111-chores.js（chore 池）
│   │   │   ├── 110-line-1980s.js      ★★ 1980—1990 定点大事件与事件串（伊朗门三幕），自带 fixed 表
│   │   │   ├── 120—128-line-*.js      ★★ 1991—2024 逐年带定点大事件（gen-manifest 托管区登记）
│   │   │   ├── 129—133-line-gap-*.js  ★ 补薄轮：回填密度偏薄的年份带
│   │   │   └── 140-reckoning.js       ★★ 清算包：五组仇家的前哨战(恨≥25)与清算(恨≥55)
│   │   └── i18n/             ★ 中英双语：zh.js（中文基线声明）+ en/ 镜像覆盖层
│   │       └── en/           ui.js + view/（16 片，按引擎模块镜像）+ events/（34 片）
│   │                          + lines/（9 片，对应 120—128 年带）+ reg/（16 片，注册表镜像）
│   ├── assets/events/        事件配图的照片（文件名 = 类型 key.jpg，见 §5.12）
│   └── tools/                全部校验/打包/度量脚本（§9.3 工具矩阵）
│       ├── validate.js       ★ 一键校验（默认 20 局），零依赖
│       ├── package.sh        ★ 一键发布：validate(30 局) + 打包 dist/（docs/ 一并进 dist）+ 出 itch.io 上传包
│       ├── gen-manifest.js   ★ 自动登记内容包/i18n 镜像，重写 index.html 两个托管区
│       ├── smoke-ui.js       ★ UI 冒烟（jsdom 真跑点击流程），需 jsdom
│       ├── audit.js          全面事件审计（一览 / flag 闭环 / 链 / 时代×三值性覆盖 / 闸门自洽）
│       ├── choice-audit.js   选项取舍探测器（占优/过平/同轴单调——"闭眼都会选"检测）
│       ├── text-audit.js     文字审计（标题通顺度 / body ≤200 字 / 缺 brief 清单）
│       ├── density-scan.js   年度大事密度（逐年 Σ=fixed+钉年卡，偏薄年份退出码 1）
│       ├── i18n-coverage.js  逐屏语言探针（英文屏中文占比 >5% 退出码 1，可当门禁）
│       ├── i18n-events.js    逐卡缺译探针（zh/en 两次 boot 逐叶子比对）
│       ├── migrate-scale.js  一次性迁移辅助（绝对金额 → dyn 系数草稿）
│       ├── merge-worker.sh   并行 worker 分支串行入库器（合并 + 重跑 gen-manifest + 门禁）
│       ├── preview-photos.html  配图预览页（浏览器打开）
│       └── out/              工具产物目录（草稿/截图，非事实源）
├── dist/                     ★ package.sh 的产物：可分发游戏本体（双击 index.html 即玩）
├── path-to-power-v0.12.zip   ★ package.sh 的产物：itch.io 上传包（index.html 在压缩包根目录，不入库）
├── docs/                     DESIGN / CONTENT-SCHEMA / DEVELOPMENT-GUIDE / I18N / PARALLEL-CONTENT-WORK
├── README.md · CONTRIBUTING.md
└── deprecated/               ★ pre-1980 死内容冻结归档（1912/1929/1941… 时代包与快照，不再加载）
```

**为什么是普通 `<script>` 而不是 ES module**：ES module 在 `file://` 下会被浏览器 CORS 拦截，导致"双击打不开"。用普通 script + 全局注册表，**双击 `index.html` 就能玩**，这也是内容侧最省事的分发方式。

**界面适配**：`engine/style.css` 的响应式断点在 1000 / 820 / 600px，`#app` 最大宽 1600px；L784 起是 v0.12 的**竖屏专区**（`@media(max-width:820px) and (orientation:portrait)`，三区竖排 + 顶栏横滚 + 高度预算），该块必须留在文件最末，否则会被同特异度基础样式级联吃掉。

---

## 3. 十分钟上手

```bash
# 1. 直接玩：双击 dev/index.html（或 dist/index.html；无需构建、无需 npm install）
#    要分发给别人玩：bash dev/tools/package.sh 之后把 dist/ 整个文件夹发出去
#    要传 itch.io：同一条命令顺手在项目根产出 path-to-power-v0.12.zip（解压即 index.html，不套文件夹）

# 2. 改完自检（数据 / 逻辑 / 生涯模拟 / 引擎-内容契约）
cd dev && node tools/validate.js            # 默认 20 局快速档；发布口径 package.sh 会跑 30 局
cd dev && node tools/validate.js --games=300 --seed=N   # 全量平衡口径（A/B 对比必须同 games 同 seed）

# 3.（可选）UI 冒烟：真的用 DOM 跑一遍"快速开局→事件→投注→掷骰→结算"
#     需要 jsdom，只装一次（引擎本身零依赖）：
#     cd ~/.workbuddy/binaries/node/workspace && npm install jsdom
cd dev && NODE_PATH=~/.workbuddy/binaries/node/workspace/node_modules node tools/smoke-ui.js
```

改一行看效果的最短路径：

1. 打开 `content/events/50-era-2008.js`
2. 找一个事件，把 `title` 改掉（若玩的是英文界面，同步改 `content/i18n/en/events/50-era-2008.js` 覆盖层）
3. 刷新浏览器（`index.html`），新开一局（快速开局：选难度 + 姓名）—— 新标题就会出现
4. 跑 `node tools/validate.js`，确认"全部通过"

**不需要**重新构建、不需要重启服务、不需要改引擎。

### 先看哪个文件

| 你想写什么 | 先读哪个文件 |
|---|---|
| 机制（资源、投注、判定明细）长什么样 | `content/events/70-demo-resources.js` —— 官方演示包：代价含多种资源 / 缺钱变灰 / 资金下注 + 人情换重投。**写普通事件时抄它**（里面个别 `ap` 代价是退役前的遗留，新卡别照抄）。 |
| **一件事跨越好几个月的那种故事** | `content/events/84-archive.js` —— 四幕事件链（拿到 → 被反噬 → 摊牌 → 了结），最后一幕按 `req.flag` 读出四种完全不同的收尾。**这是"事件太短"这个问题的标准解法。** |
| **一个反复出场的人** | `content/07-contacts.js`（登记表）+ `content/events/86-enclave.js`（用 `req.contact` / `effects.contact` 挂人） |
| **灰色路线 / 把柄怎么用** | `content/events/80-shady.js` —— 把柄的"得到"与"花掉"、单次生效（`unique`）、以及"把柄不能囤"的写法 |
| **树敌与报复（清算线）怎么写** | `content/events/140-reckoning.js` —— `count` 效果攒恨、`countMin` 门槛触发、fail/critfail 即死的黑色幽默写法 |
| **按年钉死的历史大事件** | `content/events/110-line-1980s.js`（含伊朗门三幕串）与 120—133 各年带 |
| **让玩家别那么快爬到顶** | `content/events/60-progression.js` —— 每个晋升事件都带 `minTenure`（在位时长门槛）；每一次民选晋升现已展开成一条 `campaign` 竞选链（见 §5.13） |

### 3.1 快速开局与产品定位（当前版本，v0.12）

接手者要先知道当前产品的边界，它决定了引擎里哪些字段真正在跑：

- **建角 = 三步向导**（`engine/view/create.js`，v0.12 #20 → #37② 收口）：
  ① **难度 + 姓名** —— 五档难度（传奇/简单/普通/困难/炼狱）绑**出身**与**可选卡数**，年份锁 1980、党派随机、家乡默认俄亥俄（扬斯敦，摇摆州锚点）；**难度不再发属性也不发开局资金**（#37②/#36），`DIFFS[*].bonus` 只剩 声望/人情/派系；
  ② **天赋抽卡** —— 四档稀有度（白/蓝/紫/橙 = 1/2/3/4），每个卡位独立掷档，权重随**周目**递增，**橙卡从第 2 周目才进池**（`gacha.orangeLoop: 2`，首局绝无橙卡；`woshishabiN` 作弊码就是把周目抬到 N+1 的口径，明牌输入框在这一页），本步允许**刷新一次**；
  ③ **自由点分配 + 开始游戏** —— 额度 = `freePoints(12) +（当前周目 − 1）× loopFreeBonus(1)`，**1 点 = +10 属性 = +$2k**（`freeFunPerPoint`，#36 的统一钱标尺），单维最多 `freeCapPerAttr(10)` 点（随周目按 `freeCapGrow` 微涨），属性本身 0—100 硬顶。第 3 步的表把**所有**来源摊开：`startAttr 打底 + 自由点 + 已选卡`，卡给的属性另挂 `卡+N` 角标。
  **属性从此只有两条门：自由点 + 天赋卡池**（后天再涨只走事件卡，且同卡只首次生效）——出身/起点/州/难度都不再写 `attr`，见 §5.5 与 CONTENT-SCHEMA §6 的属性纪律。
  旧的"定命一掷"（四属性各掷 35—55 + 全量重分配）已**整条删除**：`create.js` 不再掷骰，
  `balance.rollAttrs / vipCodes` 两个键随之从引擎与内容里摘干净（validate 现在反向断言它们**不存在**）。
- **10 级权力阶梯**：引擎内部 `tier 0..9`，界面显示"等级 1..10"。旧的 `tierBand`（0/2/4/5/7/9 六档近似映射）仅用于**没标 `tierRaw`** 的普通事件；**2026 年后的新内容一律 `tierRaw: true` 按真实 0..9 直写**。
- **胜利线 = 联邦众议员（tier 6）**：第一次踏入全国政治中心是一枚明确里程碑；游戏不在此收束。
- **生涯线 1980→2025**：`balance.endYear: 2025` 是硬墙（挂点在 `engine/view/stage.js`）。到点触发 `career_end` 成就结算，`content/40-endings.js` 按终局层级/曾任总统（`president_done`）给 7 条 `career_*` 结局。**当上总统不再即时结束游戏**，死亡/入狱/清算等仍可提前收口。
- **清算线（wrath→reckoning）与学贷螺旋**是当前版本的两条 BE 压力线（见 §10 与 §10.5）。
- **竞选链是玩法核心之一**：每一次民选晋升都被拆成一串强制推进的幕（见 §5.13）。

---

## 4. 分工与文件所有权

**主流程是单人串行**：一个人（或一个代理会话）按 §5/§6 的任务清单顺序改，改完跑 §8 的清单。
多人/多代理**并行扩内容**时才需要额外的作业规范——文件号段划分、worker 红名单、合并门禁，全部以 [`PARALLEL-CONTENT-WORK.md`](./PARALLEL-CONTENT-WORK.md) 为准（含 `tools/merge-worker.sh` 入库器）。本节只讲所有权，不与那份文档冲突。

| 目录/文件 | 谁能改 | 说明 |
|---|---|---|
| `engine/**` | **引擎改动**（红名单） | 内容改动只读；机制需求先改契约再实现 |
| `docs/CONTENT-SCHEMA.md` | 引擎改动（双方评审） | 契约唯一来源 |
| `docs/I18N.md` | i18n 契约改动 | 双语机制契约 |
| `dev/index.html` 引擎引入区 | **引擎改动** | 加/删引擎模块时改 |
| `dev/index.html` 内容白名单区 | **内容改动** | 现存 50—111 号文件手工维护 |
| `dev/index.html` 两个托管区（content-auto / i18n） | **只有 `tools/gen-manifest.js`** | 手工编辑无效且制造冲突；新增事件/i18n 文件一律跑 `node tools/gen-manifest.js` |
| `content/events/**`、`content/08/13` 等素材库 | **内容改动** | 高频区；新卡必须配 EN 镜像（见 §5.14） |
| `content/01-config.js` / `20-eras.js` / `21-worldline.js` / `40-endings.js` / `10/12/14` 表 | **全局配置改动**（并行的红名单，合并方独占） | 动平衡参数必跑全量 validate |
| `content/i18n/**` | **i18n 改动** | 与 CN 内容同步落，路径镜像 |
| `tools/**`、`dist/**` | **门禁/构建脚本** | `dist/` 只能由 `package.sh` 生成，禁止手改 |
| `deprecated/**` | **冻结** | 只进不出，不再加载 |

### 两侧职责

**引擎侧**
- 维护注册表、掷骰模型、效果系统、主循环、视图层（`engine/view/`）、存档、i18n 地基
- 保证**向后兼容**：新增字段不能破坏已有内容
- 提供内容需要的机制（收到需求 → 设计字段 → 更新契约 → 实现 → 通告）
- 维护 `tools/validate.js` 的校验项，确保内容错误在提交前被拦住

**内容侧**
- 写事件、年代线、清算包、人物线、结局、数值、静好素材、英文镜像
- 只依赖 `docs/CONTENT-SCHEMA.md` 里写明的字段
- 提交前必须跑 `node tools/validate.js` 并通过；新增文件跑 `gen-manifest.js` 登记
- 需要新机制时**提需求**，不自行改引擎

---

## 5. 内容侧：常见任务清单

### 5.1 加一个事件（最高频）

1. 选一个已有文件（如 `content/events/50-era-2008.js`）或新建 `events/<序号>-<分类>.js`（年带内容用 120—149 号段，规则见 `PARALLEL-CONTENT-WORK.md`）
2. 追加到 `POTUS.define("event", [ ... ])` 数组里。**新内容用绝对年窗，不写 `era`**（era 只是兼容层）：

```js
{
  id: "line95_demo",                 // 全局唯一，建议加文件前缀
  grade: "mid",                      // ← 必填：major / mid / minor
  category: "scandal",               // ← 必填：事件类型（13 类之一），决定默认配图
  valence: "risk",                   // ← 必填：boon 机遇 / risk 风险 / bane 威胁（§1.5.1）
  dyn: true,                         // ← 必填：经济字段按系数写，结算时 × 人物标尺（§1.5.2）
  minYear: 1995, maxYear: 1997,      // ← 绝对年窗（新内容的"时代"就是年份）
  scoped: true,                      // ← 年带/定点内容标 scoped
  tierRaw: true, tierMin: 1, tierMax: 5,   // ← 10 级直写（§3.1 硬规矩）
  medium: ["tv", "social"],          // ← 可选：这件事靠哪种"说话方式"
  title: "标题",
  brief: {                           // ← 背景卡：主角此刻知道多少
    lede: "折叠时显示的一行",
    known:   ["他读到的数字、他认识的人、他手上的文件……"],
    rumor:   ["有人说…（真假不明）"],
    unknown: ["他不知道的事——点出后果的位置，不要点出后果"],
    terms:   [{ k: "救市", v: "名词解释" }]
  },
  body: "事件正文……（≤200 字，规范见 tools/text-audit.js）",
  weight: 10,                        // 越大越容易被抽到（默认 10）
  choices: [
    { id: "a", text: "选项文案", base: 0.5,
      mods: [{ src: "attr", key: "CUN", w: 0.5 }],
      outcomes: {
        crit:     { body: "大成功文本", effects: { rep: 1.5 } },
        ok:       { body: "成功文本",   effects: { rep: 0.8 } },
        meh:      { body: "勉强文本",   effects: { rep: 0.2 } },
        fail:     { body: "失败文本",   effects: { rep: -0.4 } },
        critfail: { body: "大失败文本", effects: { rep: -1.2, flags: ["scandal_2"] } }
      }
    }
    // ……至少 2 个选项，其中必有一个既无 cost 又无 req 的保底
  ]
}
```

3. **新建文件的话不要手改 `index.html`**：跑 `node tools/gen-manifest.js`，它会把文件追加进 content-auto 托管区（白名单区没提到的新文件才会被登记；文件头写 `@manifest: skip` 可永久跳过）。
4. **给英文覆盖层落同一批卡**：在 `content/i18n/en/events/`（或 `lines/`）按镜像路径补 `POTUS.define("l10n", …)`，见 §5.14 与 `docs/I18N.md`。
5. `node tools/validate.js`

**必须遵守**：五档结果 `crit/ok/meh/fail/critfail` 一个都不能少；`valence` + `dyn` 必填；`dyn` 卡里的 `fun/rep` 与 `cost.fun` 等经济字段是**系数**（不是绝对金额，见 §1.5.2）；新内容 `tierRaw: true`；每个选项的 `outcomes` 用**多行格式**写，不要压成一行手数括号（详见 §7）。

### 5.2 写背景卡与日期：别把玩家丢进一个他看不懂的局面

这是踩过的最实在的一个坑。原来的"救市"事件全文是这样：

> **一份'救市'内部简报**
> 财政部的人深夜来电：救市方案需要'民间声音'背书。签名就能上电视，但条款里藏着一笔会让你未来的对手抓住的把柄。

测试者的第一反应是：**"什么是救市？为什么要救市？谁发动的？背后是什么情况？"** ——三个选项摆在面前，一个都判断不了。这不是玩家的问题，是内容的问题。

**修法是两块，缺一不可：**

**（1）给出精确日期。** 事件卡顶部显示 `2008 年 9 月 24 日`。日期不是装饰——**它是给"懂历史的玩家"的信息通道**。主角不知道四天后会发生什么，但玩家知道。
如今带日期的内容已经不是稀罕物：全库 300 余张卡里约 **131 张带日期**（2026-09-24 快照，准确数以 `validate.js` 输出为准），大头就是钉在 exact 年月上的定点大事件。现行口径是：

| 你要什么 | 写法 |
|---|---|
| 史实锚点（真实钉在某一天） | 事件上直接写 `month`（+`day`），如 `2008_crash_offer`（2008-09-24，雷曼已倒、TARP 拉锯） |
| 到点必发的年代大事 | **`POTUS.define("fixed", [...])` 定点表**（§5.4.4）：如黑周一 `rg87_monday`（1987-10）、伊朗门三幕串、清算包各幕 |
| 虚构但"就是这年的这个月" | 同上，钉进 `fixed`；事件本身保持通用性 |

> 旧文档说的 `era.scheduled` 只剩 2008 时代三场（`2008_crash_offer / 2008_tea_party / 2008_primary`）作为兼容层保留，引擎把它与 `fixed` **合并生效**。新内容一律走 `fixed`，别往 era 里加。

**（2）给出主角视角的背景卡。** 三层，折叠可展开，默认展开、折叠状态被记住：

- **你确知的** —— 主角**真的能看到**的东西：他手上的文件、他认识的人、报纸上印着的数字。**不是上帝视角的历史总结。**
- **你听到的 · 真假不明** —— 传闻。用「有人说…」「有律师朋友在饭局上压低声音说…」。其中可以有真话，也可以是别人故意放出来的假消息，**不要用语气暗示真假**。
- **你尚不知道的** —— **这一层是灵魂**。它明确告诉玩家"这里有信息差，你可以占便宜"。写法是点出**后果的位置**，不是点出后果本身：
  - ✅ `你读不懂的那几条授权条款，将来会成为对手手里的刀。`
  - ❌ `两个月后国会会否决这个法案，你会因此丢掉席位。`（这是剧透，不是信息差）
- **名词**（可选）—— 只解释名词（救市 / TARP / 初选 / 弹劾条款），**不解释剧情**。让不熟悉这段历史的玩家也能跟上。

写完自检一句话：**这份背景卡里，有没有主角此刻不可能知道的事？有就删掉或挪进 `unknown`。** 标题/正文的编辑规范（标题一句看懂、body ≤200 字）用 `node tools/text-audit.js` 量化。

当前全库事件 **全部**配齐了背景卡、量级、类型、三值性（迁移完成后可开 `validate.js --val-strict` 硬验收）。写新事件时直接抄 `content/events/50-era-2008.js` 里的 `2008_crash_offer`；定点大事件抄 `110-line-1980s.js`。

### 5.3 用资源做设计：代价（cost）与投注（stake）

这是本作最核心的"手感"机制——**资源不是装饰，是玩家下注的筹码**。完整字段说明见 `CONTENT-SCHEMA.md` §4.3 / §4.4，这里只讲"什么时候用哪个"。

**三个字段的分工：**

| 想要的效果 | 用哪个 | 玩家看到什么 |
|---|---|---|
| 没资格，压根选不了 | `req` | 按钮灰掉 +「需要 T3 以上」/「需要先认识「掮客」」 |
| 能选，但要先付钱/人情/把柄 | `cost` | 按钮上「代价：资金 …」/「代价：把柄 1」 |
| 可押可不押，玩家自己赌 | `stake` | 点开后弹投注面板，自己拖档数 |
| 给「人情」这个资源找独特价值 | `stake: { fav: true }` | 「花 1 点，获得重投（取优）」 |

**可当代价的资源（写事件时的直觉）**——现行可展示/可消耗的资源只剩 **`fun / fav / rep / lev` 四根**：

| 资源 | 性格 | 什么时候用它当代价 |
|---|---|---|
| `fun` 资金 | 可再生的、最不值钱的 | 每天都在流失，随便花；它是"耐心"的度量（开局还可能背着学贷，见 §10.5） |
| `fav` 人情 | 借来的，要还 | 表达"我要求人了"；稀缺，别乱用 |
| `lev` **把柄** | **易腐、会招祸、不可再生** | 表达"我要用一次别人不敢说的东西"——**用它的时候，剧情应该往前走一大步** |
| `rep` 声望 | 一旦掉下去很难回来 | 只在"这件事真的伤到你的名声"时才用 |

> ⚠️ **精力(`ap`)、健康(`hp`) 已于 v0.9 退役**：展示与消耗只剩上面四根；`ap` 效果在 `effects.js` 里是**显式空操作**，`cost:{ap}` / `stake:{ap}` 同样无效。**写新事件不要再使用这两个键**（旧演示包里的残留只是历史样板）。

**一个写得好的事件通常长这样**（抄 `content/events/70-demo-resources.js`；`dyn` 卡里 `cost.fun` 写的是**系数**，$ 金额是抽中时按人物标尺折出来的）：

```js
choices: [
  { id: "all_in",  text: "亲自出庭，把能押的都押上", base: 0.42,
    stake: { fun: true, fav: true } },                              // 免费但风险高 → 让玩家自己下注
  { id: "lawyers", text: "重金请顶级律师团", base: 0.72,
    cost: { fun: 11 } },                                            // 花钱买确定性（系数 11 ≈ 基准人物该量级的标准手笔 ×11）
  { id: "favor",   text: "托人推迟议程（花 1 点人情）", base: 0.62,
    cost: { fav: 1 } },                                             // 钱买不到的路子
  { id: "bigshot", text: "动用参议院的老关系", base: 0.82,
    req: { tier: 3 } },                                             // 资历门槛（tierRaw 语境下是真实 0..9）
  { id: "sick",    text: "病假缺席，什么都不花", base: 0.45 }        // ← 保底选项：无 cost、无 req
]
```

五种选项凑在一个事件里（免费高风险 / 花钱买稳 / 消耗人情 / 资历门槛 / 保底），玩家的每一次点击都是一次真实取舍。

> **最后那条 `sick` 不能省。** 前四种都带 `cost` 或 `req`，玩家破产时会被全部置灰——没有它，这个事件就是死局。
> 保底选项要写得像个真实选择（"病假缺席"本身就有风险：可能被拍到在高尔夫球场），而不是敷衍的"什么都不做"。

**数值设计的四条经验（别踩坑）：**

1. **代价要肉疼但不致命**。重代价选项一个事件最多 1~2 个；`fun` 允许负债（到谷底触发 `debtFloor` 家人接济的戏剧点），但别把 `rep` 当常规代价用——容易造成死亡螺旋。
2. **花了钱就必须更稳**。参考锚点：免费 `base ≈ 0.40~0.50`，重代价买确定性应给到 `0.70+`，消耗 1 点人情给 `0.60~0.65`。
3. **`stake` 只给"赌注该由玩家决定"的选项**。固定代价的选项别加 `stake`，否则玩家要操作两遍同样的东西。
4. **投注上限 +30%（`cap`），每档 +4%（`w`）→ 恒为 8 档**，总目标值封顶 95%——别指望"投注"能救回一个 `base 0.2` 的选项。低 `base` 就该配高风险高回报的五档结果。

**投注的现行公式（#28①，级别价：单价只看身位）**——`engine/dice.js` 的 `stakeFunPer` 现在只有一个锚：

```
每档价码 per = clamp( 职位月薪 officeSalary(track,tier) × perSalaryMonths(1) × gradeMul[量级], perMin, perMax )，再抹零
  · 月薪 = 平静月工资同一个 P.officeSalary()：身位定钱、级别定价，口径只有一个
  · gradeMul {minor .6, mid 1, major 1.8}；perMin 500 / perMax 500000（content/01-config.js 的 stakeRates.fun）
档数 = min( ceil(cap ÷ w) = 8 档, floor(现金 ÷ per) )        —— 余额只决定你押得起几档，不改单价
```

- **余额彻底不参与单价**：v0.12 的钱袋闸 `cashStakeShare`（单档 ≤ 现金×6%）与事件钱量级锚 `potShare` **已删除**，`P.stakePot()` 函数也不存在了——旧公式 `per = min(∛(A×X×G), G)` 让玩家实测出「同一件事，穷时便宜富时贵」，价码成了第二次随机。历史演进全录在 `DESIGN.md` 核心系统四。
- 旧的「两锚 √ 公式」「8 档总投入 ≤ 2×pot」「单档 ≤ 资金×6%×量级系数」三条不变量**全部退役**，validate 里已无这些断言；现行钉的是**同一身位下单价恒定**（见 §9.1）。
- 手感基准（`officeSalary` 表值 × 抹零向下）：T0 志愿者月薪 $1k → 小事一档 $500、大事 $1.5k（投得起第一档，押不满 8 档）；T7 联邦参议员/州长 $17k → 一档 $10k—$30k；财富轨 T7 超级富豪 $80k → 大事一档 $140k。
- 投注只剩两轴：**资金**（按上面价码逐档买 +4%）与**人情**（1 点换一次重投取优）。
- **改全局价码**：`content/01-config.js` 的 `balance.stakeRates`，全局生效；单个选项要特例就在 `stake` 里写 `{ per, w, cap }` 覆盖（写死 `per` = 关闭级别价换算，汇率来源标 `source:"content"`）。**改 `perSalaryMonths` / 工资表等于改投注曲线**——月薪与日常收入同源，改完跑 `--games=300` 看层级/结局分布有没有被推歪。

### 5.4 铺一段年代的内容（连续时间轴 · 主推）

玩法核心不是"选时代"，而是**一条按绝对年月推进的连续时间轴**。1980—1990 基线在 `21-worldline.js` + `110-line-1980s.js`；**1991—2024 由 120—128 九个年带铺开、129—133 五个补薄包回填密度**。铺一段新年代（或补薄旧年代）按下面三步走，**不碰 `engine/`**：

1. **铺世界线**：往 `content/21-worldline.js`（或自己新建的年带文件）的 `pressure` / `brief` / `outlets` 里按**绝对年份**补这一段
   - **`pressure` 是这一年最重要的一个数字**（0—6）：它决定这一年有多忙、大事件多不多。危机年多写 `5`，长期平稳写 `2`。
   - **不要写 `"*"` 兜底键**：留空即让未覆盖年份整体回落 era，避免半新半旧串味（见 `CONTENT-SCHEMA.md` §1.5）。`worldline` 的 define 是**按年深合并**的，多个文件各铺各的年份互不顶掉。
2. **写大事件 + 钉进定点表**：新建 `content/events/12x-line-<range>.js`（号段与文件所有权见 `PARALLEL-CONTENT-WORK.md`），每张事件用 `minYear`/`maxYear` + `scoped:true` + **`tierRaw:true`** 写绝对年窗与 10 级门槛（详见 §5.4.4），再把关键节点 `POTUS.define("fixed", [...])` 到点必发。
3. **登记**：跑 `node tools/gen-manifest.js` 重写 index.html 托管区（**不要手改清单**）→ `node tools/validate.js` → `node tools/density-scan.js`（逐年 Σ=A+B 不得低于 1980—1988 基准均值，偏薄年份退出码 1）。

> ⚠ **`tierRaw:true` 是硬规矩**：不加它，`tierMin/tierMax` 会被当旧 6 档经 `LEGACY_TIER_BAND=[0,2,4,5,7,9]` 映射（`tierMin:2` 会被偷偷抬成 raw 4）。新内容一律按 10 级直写并带 `tierRaw:true`。

### 5.4-era 迁移期：仍存在的 era 定义（旧机制，勿新增）

`content/20-eras.js` 只剩 **5 个时代**（1980_REAGAN / 1990_GULF / 2001_WARONTERROR / 2008_CRASH / 2016_SOCIAL），作为 worldline 未覆盖年份的**兼容层** + `content/30-fillers.js` 的兜底填充包；pre-1980 的死时代已整体清理进仓库根 `deprecated/`（冻结归档，不再加载）。引擎读点**优先按年读 worldline，读不到才整体回落 era**。给旧时代补内容时才认识这套；能改用 `worldline`/`fixed` 的就别往 era 里加。

一个年份的**密度是否够玩**不再靠拍脑袋：`node tools/density-scan.js` 按引擎真实口径逐年数定点事件（A = fixed + era.scheduled 到点必发；B = `minYear==maxYear` 的钉年卡），低于 1980—1988 基准均值就退出码 1。随机池深度、填充占比、日期自洽率仍以 `validate.js` 的输出为准。

### 5.4.1 加一个事件类型（category）

只改 `content/05-categories.js`（现行 13 类：general/career/campaign/political/govt/media/scandal/finance/romance/civil/crisis/foreign/shady）：

```js
POTUS.define("category", {
  "labor": {
    name: "劳工", ink: "#4a5a2a", base: "#e6e9d6",
    art: function (ev, P, ctx) {
      return P.artFrame('<rect .../>' + ctx.caption(ev, ctx.ink), ctx.ink, ctx.base);
    }
  }
});
```

之后任何事件写 `category: "labor"` 就能用上这套配色和默认配图。
**每个类型只需要画一张图，之后所有该类型的事件都免费有图**；个别事件想特殊，自己写 `art` 覆盖即可。
新类型记得同步两件事：`09-photo-art.js` 想给照片就登记一行（§5.12）、`i18n/en/reg/05-categories.js` 补英文覆盖层（§5.14）。

### 5.4.2 加一个时代媒介（medium）

只改 `content/06-media.js`：

```js
POTUS.define("medium", {
  "podcast": { name: "播客", from: 2014, note: "长谈重新变得有市场……" }
});
```

之后事件写 `medium: "podcast"`，引擎就会自动挡在 2014 年之前。
**这是"让内容按年代生效"最省事的办法**——不用写任何逻辑，也不用在事件里堆 `fromYear`。

### 5.4.3 把内容派给不同的人写（分工与并发）

因为每个事件都必须声明 `grade` + `category`，内容可以切片派活：

| 方式 | 适合 | 交付物 |
|---|---|---|
| 按「年带」切片（主推） | 铺连续时间轴 | `content/events/12x-line-<range>.js`，自带 fixed 表 |
| 按「主题包」切片 | 一条机制线吃透 | 如 `140-reckoning.js`（清算）、`88-finance-2.js`（金钱） |
| 按「类型」切片 | 一个人专精一条线，跨时代写 | `content/events/5x-<类型>.js`（范例：`55-media-timeline.js`） |

**交付格式就是 §5.1 那一块，复制填完即可。** 单人串行时直接改 main 即可；**多人/多代理并发时以 [`PARALLEL-CONTENT-WORK.md`](./PARALLEL-CONTENT-WORK.md) 为准**——它规定了文件号段预留（如 130—149 补薄段）、worker 红名单（engine/、01-config、21-worldline 等只能由合并方动）、以及 `tools/merge-worker.sh` 串行入库 + 门禁（合并后统一重跑 gen-manifest 与全量 validate，托管区**以重生成为准、不手工和解**）。
`validate.js` 支持 `--games=1` 快线（只跑结构断言），worker 每轮自检用它，全量口径留给门禁。

### 5.4.4 加一条按年触发的固定事件 / 固定事件串

这是当前的**主推写法**（范例：`content/events/110-line-1980s.js` 与 120—133 各年带）。分两步：

**第一步：写事件本体**（`POTUS.define("event", […])`）——一张历史大事件卡至少满足：

```js
{
  id: "rg87_monday", grade: "major", category: "crisis",
  valence: "risk", dyn: true,
  minYear: 1987, maxYear: 1987, scoped: true,       // 绝对年窗（新内容不再写 era）
  tierRaw: true, tierMin: 0, tierMax: 5,             // 10 级直写；tierMin≤2 保证低层级有落点
  unique: true,
  title: "…", body: "…",
  choices: [
    { /* …一个既无 cost 又无 req 的保底选项（三值性硬约束）… */ },
    { /* …带下行面：critfail 挂 scandal_* / investigation_open / fall / hardEnd… */ }
  ]
}
```

- **低层级有落点**：每条至少一个 `tierMin:0–2`，让 T0/T1/T2 玩家也能撞上时代。
- **下行面必写**：错选/坏运要能滑向深渊（`scandal_*`/`investigation_open`/`fall`/`hardEnd`/`count` 攒恨），不能只给机会。

**第二步：钉进定点表**（同文件末尾 `POTUS.define("fixed", […])`）——到点必发：

```js
POTUS.define("fixed", [
  { event: "rg87_monday", year: 1987, month: 10, grade: "major" }
]);
```

- 字段同旧 `era.scheduled`（`event/year/month/fromYear/toYear/fromMonth/grade/once/cond/flags`），`fixed` 只负责"到点必发"，**事件自己**（年窗/tier/flag）负责"够不够格发"，不满足就静默跳过。
- **固定事件串**（前奏→爆发→余波 2~3 幕）不复活 `arc.js`：把每幕各自钉进 `fixed`，后幕靠事件自带的 `after:{id,minMonthsAfter}` / `flags` 续接——**前幕没演则后幕的 `after` 不成立即静默跳过**，是一条"可断裂"的串（见 `110-line-1980s.js` 的伊朗门三幕）。可多次 `define("fixed", […])`，自动累加（全库定点规模以 validate/density-scan 输出为准）。

### 5.4.5 加日常公务 / 选民服务池（chore）

日常公务是**填充平静月、给在任者"选民经营"手感**的低权重小事件池（范例：`content/events/111-chores.js`）。它**不进随机池**，只经 `time.js` 的 `P.choresSlot()` 兜底注入。

**写一张 chore 卡**（`POTUS.define("event", […])`）的关键字段：

```js
{
  id: "chore_eulogy", grade: "minor", category: "govt",
  valence: "boon", dyn: true,
  chore: true,                       // ★ 被 eligible 挡出随机池，仅经 choresSlot 注入
  tierRaw: true, tierMin: 0, tierMax: 2, weight: 7,   // 按层级分簇（基层/市政/州/联邦）
  minYear: 1980, maxYear: 1999,
  title: "…", body: "…",
  choices: [ /* 主吃 voters（warm/diehard↑、oppose↓）+ 少量 rep，量级 minor */ ]
}
```

- **范围 = 选举轨在任者（`tier>0`）**：`tier<=0` 时 `choresSlot` 直接返回 `null`，不给无职位的人塞公务。
- **频率 = 加权随机 0–1 + 空月保底 1**：本月若已被 `fixed`/`campaignForceSlot` 占满则不注入；否则按 `emptyFillChance` 保底 1 条、空闲档按 `chance` 概率补 1 条。
- **开关**：`balance.choreDynamic = { enabled, chance, emptyFillChance }`；`enabled:false` 即完全回到现状。删掉 `111-chores.js` 并跑 gen-manifest 重生成（或从白名单移除）也可整体回退。

### 5.5 加派系 / 仇家 / 轨道 / 党派 / 姿态 / 出身 / 天赋 / 起点

全部只改 `content/01-config.js` 与 `content/10-characters.js`，**界面会自动多出选项**，不需要动引擎。

```js
// 加一个派系
POTUS.define("faction", { tech: { name: "科技巨头" } });
// 之后任何事件的 effects.fac.tech 和 mods {src:"fac",key:"tech"} 都能用

// 加一组仇家（清算系统的仇恨群体，见 §10.5 与 140-reckoning.js）
POTUS.define("wrath", { lobby: { name: "说客集团", desc: "…" } });
// 仇恨值存 G.counters["wrath_lobby"]：效果写 effects.count，门槛写 when countMin/countMax/countEq
```

```js
// 加一个起点路径
POTUS.define("entry", {
  unionist: { name:"工会干事", desc:"…", tier:0, track_suggest:"electoral",
              effects: { fac:{labor:45, commercial:-20} } }
});
```

> ⚠️ **属性纪律（#37②，validate 硬拦）**：`origin` / `entry` / `state`（`entryEffects`）与难度 `bonus` 的
> `effects` 里**不要写 `attr`**——补偿只能走 声望 `rep` / 人情 `fav` / 派系 `fac` / 判定 `mods`。
> 唯一被批准的写法是起点上的**隐藏诚信负数**（名人 −15、商人 −10，只减不增）。
> 开局属性只能来自 `balance.startAttr` + 自由点 + 天赋卡池，validate 会静态扫内容表，
> 并逐 出身×起点×难度 组合断言"零分配时 `G.attr` 逐维 `=== startAttr`"。

> ⚠️ 注意：加高影响力的派系/身份后，要检查既有事件的 `effects.fac` 是否还平衡；新派系若想进清算线，还要在 140 包给它配"翻脸"的事件。

### 5.6 加一个结局

只改 `content/40-endings.js`，加一条带 `priority` 的规则：

```js
{
  id: "retire_union", priority: 86,
  when: { reason: "retire", entryIn: ["unionist"] },
  title: "工会的传奇", grade: "B",
  body: "你从未离开过那条街。"
}
```

规则按 `priority` 降序取**第一条命中**；确保最后永远有一条 `when: {}` 的兜底规则（校验脚本会检查）。
现行 `reason` 词汇注意三族：**清算线** `assassinated / framed / ruined / purged`、**学贷线** `bankrupt`（连续断供超限，见 §10.5）、**生涯结算** `career_end`（活到 2025 硬墙，按终局 tier + `president_done` 走 7 条 `career_*`）。新结局文案保持全库一致的**黑色幽默成就**口吻。

### 5.7 写一条事件链：让一件事横跨好几个月

**这是"事件和流程太短"的标准解法。** 普通事件是"一个月里的一件事"，事件链是"一件事在几个月里长成另一个样子"。

最小可用的四幕结构（抄 `content/events/84-archive.js`）：

```js
// 第一幕（头）：正常写，必须 unique
{ id: "archive_get", grade: "mid", unique: true, … }

// 第二幕：前情 + 岔路
{ id: "archive_bite", grade: "mid", unique: true,
  flags: ["archive_taken"],                                    // 只在"把东西带走了"这条岔路上继续
  after: { id: "archive_get", minMonthsAfter: 3, maxMonthsAfter: 30 }, … }

// 第三幕：摊牌
{ id: "archive_showdown", grade: "major", unique: true,
  after: { id: "archive_bite", minMonthsAfter: 2, maxMonthsAfter: 24 }, … }

// 第四幕（收尾）：按 req.flag 分支，让结局回到前面的选择上
{ id: "archive_settle", grade: "mid", unique: true,
  after: { id: "archive_showdown", minMonthsAfter: 4, maxMonthsAfter: 48 },
  choices: [
    { id: "after_deal",   req: { flag: "archive_deal" },   … },   // 当年用它换了位置，现在账单来了
    { id: "after_burn",   req: { flag: "archive_burn" },   … },   // 当年烧了纸，但原件还在别人手里
    { id: "quiet",        … }                                     // ← 保底：无 cost、无 req
  ] }
```

**四条硬规矩**（`CONTENT-SCHEMA.md` §4.11 有完整表格）：

1. 链上**每一幕都要 `unique: true`**。`grade: "major"` 默认就是 true，其他量级必须显式写。
2. **用 `after` 表前情，用 `flags` 表岔路**。不要拿 flag 当"前情"——玩家没拿到那个 flag 时链会悄悄断掉。
3. **最后一幕用 `req.flag` 分支**，而且**每个选择、每一档结果都要打上同一个标记**。否则分支读不出来。
4. 分支之外**永远留一条既无 `cost` 又无 `req` 的路**。

写完之后 `validate.js` 会检查：前情是否存在、有没有自环或环、窗口 `min ≤ max`、以及**实测续集加权是否接近 `chainWeightMul/(chainWeightMul+1)`**（默认 ≈ 90%）。
这个 90% 是关键——它保证"玩家真的会看见第二幕"，而不是让故事散落在几百个档期里。

> **窗口怎么定**：`minMonthsAfter` 决定"最早多久以后"，`maxMonthsAfter` 决定"过期时间"。
> 一般 3~30 个月（半年级）最像真实政治；跨度拉太长（>48 个月），玩家会忘了前情。
> 界面上会给你一条「承 前」小条，写着上一幕的标题和相隔几个月——所以哪怕玩家真的忘了，他也能接上。
> **非 unique 的普通卡另有"单卡终身衰减"**（`balance.idRepeatMul: 0.15`）：撞过一次之后权重终身乘 0.15，配合 `recentCap: 40` 的去重窗口把"重复感"压下去；需要"麻烦会回来"的卡用 `rereq`（when 词汇）声明再解锁条件（见 §10.5）。

### 5.8 登记一个人脉：让同一个人反复出场

一个事件里写「你去找他」很容易，难的是让同一个"他"在十年后再次出现，并且记得上次你欠了他什么。

**两步**：

```js
// ① content/07-contacts.js —— 先登记（只写设定，不写年代）
POTUS.define("contact", {
  fixer: { name: "掮客", role: "牵线搭桥的门路", tag: "门路", note: "他不解决问题，他介绍解决问题的人。" }
});

// ② 事件里引用 —— 门槛 / 好感 / 断交
{ id: "ask", text: "让掮客替你牵一根线", req: { contact: "fixer" }, … }   // 不认识就点不动
{ id: "deep", contacts: ["fixer", "lobbyist"], … }                        // 事件级：两个都要认识
effects: { contact: { fixer: 12 } }        // +12（第一次出现即"从此认识"）
effects: { forget: ["fixer"] }             // 彻底断掉（你把他卖了）
```

**三条约定**：
1. **一个人只负责一类资源**。找钱的别来找他要选票，要选票的别来找他借钱。
2. **人物不写死年代**——1960 年的电视制作人与 2008 年的电视制作人是同一个人设。要限定年代就写在**事件**上。
3. **文案里的名字要和 id 对得上**。校验器会把 `ev.contacts` / `req.contact` / `effects.contact` / `effects.forget` 里的每个 id 逐条核对；id 不一致是内容侧最常自己踩的坑。

### 5.9 让晋升变慢：`minTenure`

光有事件不够，**台阶本身也要花时间**。给晋升事件加一个"在位时长"门槛：

```js
{ id: "prog_senate", grade: "major", minTenure: 48, … }   // 在 T3 待满 4 年，才谈得上参议院
```

- 单位是**月**。层级一变，计时自动重置（引擎侧），状态面板会显示「在位 X 个月」。
- 取值：基层 / 州级 18~24；参议院 / 总统 48；任命 / 造王者 / 巨富 18；名人 12。
- **所有 `prog_*` 晋升事件都必须声明 `minTenure`**——校验器会拦。
  确切的数字会直接决定"一局有多长"，所以这是**平衡参数，不是内容参数**：改它之前先想清楚一局想玩多久（一局最长就是 1980→2025，约 540 个月）。
- **民选晋升的 `prog_*` 现在是竞选链的末幕（投票日）**：层级只在末幕授予，前面还有宣布/初选/辩论等幕强制推进（见 §5.13）。改 `minTenure` 会同时影响竞选链 `gate.minTenure`，两处要一起对。

### 5.10 写一段"静好岁月"：让平静的月份也有人味

**为什么需要它**：一个月一回合之后，一年仍有 **约 9 个档期以外的平静月**（密度以 validate 输出为准，2026-09-24 快照为 9 档期/年）。
这些月份不是空白——每月经过 `monthlyLedger`「上班的账」（工资−开销−学贷+选民漂移），无事发生的月份还会渲染成一张「静好岁月」合并卡。
`content/08-vignettes.js` 就是给这些月份写的随笔素材：**一段日子 + 一点按部就班的成长**（现行素材 58 条，2026-09-24 快照）。

**怎么做**：往 `content/08-vignettes.js` 里加片段即可（新文件也行，`fragments` 会累加）。

```js
POTUS.define("vignette", {
  fragments: [
    { id: "se03", slot: "season", months: [3], texts: ["三月。雪化得比往年早。", "三月，树还是光的。"] },
    { id: "wk_el_lo", slot: "work", tracks: ["electoral"], maxTier: 2,
      texts: ["晚上又是一场自助餐。你握到第八十只手的时候，已经分不清谁是谁了。"] },
    { id: "lf_gen", slot: "life", brk: true, texts: ["日子过得很快，也很整齐。"] },
    { id: "sf_lev", slot: "self", minLev: 1, weight: 3,
      texts: ["夜里你会想起那件事。办公室里没有别人，你把那份东西拿出来看了一眼，又放回去。"] }
  ]
});
```

引擎把六个槽位按固定顺序拼成一段：**时令 → 世相 → 案头 →〔断段〕日常 → 心绪 →〔断段〕收束**。
每个槽位抽一条可用片段（条件不满足就跳过），所以同一段文字会随主角**变老、升官、有钱、心事变重**而变形。

**四条硬规矩**（校验器会拦前三条）：
1. **时令必须覆盖 12 个月**；
2. **除时令外，每个槽位至少留一条"无条件片段"**——玩家可能同时穷困、破产、被调查、年迈，条件写满了反而一段都抽不出来；
3. `slot` 只能是上面六个之一，`id` 唯一，`weight` 为正；
4. **不要有转折**。它不是事件，是日子。写成小高潮，就把事件的活儿干了两遍，而且显得平静的月份一点也不平静。

**成长曲线在 `balance.vignette` 里，不在片段里**：详见 `CONTENT-SCHEMA.md` §4.13。
两条变迁别搞混：健康(`hp`)退役后 `hpChance` 已是遗留项（值为 0，勿再按它设计"喘气手感"）；**选民增减自 v0.9 起从静好成长迁到「每月的账」**（`monthlyLedger.voters` 单点结算），成长池只剩属性(CHA/INT/CUN，INTG 不自然成长) / 声望 / 人脉好感。调 `attrChance`/`repChance` 这类曲线后**必须跑 `validate.js --games=300` 看结局分布**。

> （原 §5.11「大模型适配层」已随 `engine/llm.js` 整体下架，编号保留避免交叉引用错位。游戏自始至终不依赖网络。）

### 5.12 给事件配一张照片

事件配图默认是**程序化 SVG**（`content/05-categories.js` 每个类型一套）。要换成真照片，
走**照片层**：`content/09-photo-art.js` 把「类型 → 文件名」登记进注册表，配图时优先出照片。现行 **13 个类型全部配了照片**。

**三步**：

1. 把图丢进 `assets/events/`，命名成 **`<类型 key>.jpg`**（例如 `career.jpg`、`scandal.jpg`）。
   要换图就直接覆盖同名文件，**不用改任何代码**。
2. 在 `content/09-photo-art.js` 的 `files` 里加一行：`career: "career.jpg"`。
3. 跑 `node tools/validate.js` —— 它会**逐个检查这些文件在不在于磁盘上**（这是最容易静默翻车的地方）。

**两条降级保证**（所以照片是"可加可减"的，不会因为少拷文件而白屏）：

- 没登记照片的类型 → 安静退回程序化 SVG。
- 照片加载失败（改名 / 少文件）→ 卡片里预垫的程序化 SVG 会被 `onerror` 翻出来顶上。

**单事件覆盖 / 关闭**：`ev.photo = "my-shot.jpg"` 用指定图；`ev.photo = false` 不要照片。

**尺寸建议**：卡片正文列宽约 636px，图压到**最大边 900px / JPEG q78** 就够（13 张合计约 1 MB 量级）。
画框是 `aspect-ratio:16/9` + `object-fit:cover`，所以原图比例不必统一，但**主体尽量居中**，否则会被裁掉；竖屏下画框仍在事件栏的 44vh 预算内，别指望玩家横过来看图。

**看实际效果**：浏览器打开 `tools/preview-photos.html` —— 它用真的渲染器 + 真的样式表铺出事件卡，
把 13 个类型和"破图态"一次看全，不用真的开局。

### 5.13 加一条竞选链（campaign）：把一次民选晋升拆成多幕

**一次民选晋升不再是一个事件，而是一串强制推进的幕**（宣布 → 初选 → 筹款/辩论 → 摇摆 → 投票日）。字段契约见 `CONTENT-SCHEMA.md` §14，设计理念见 `DESIGN.md` 的"竞选链"。这里只讲怎么加。

引擎完全不用动。要加/改一条链，只碰两个内容文件：

1. **定义链**（`content/61-campaigns.js`）：`POTUS.define("campaign", { camp_xxx: { … } })`。
   - `tier` = 目标级（= 起跳级 + 1）；`gate` 与对应末幕 `prog_*` 的 `tierRaw/tierMin/tierMax/minTenure` **完全对齐**。
   - `stages[]` 一幕一幕，**末幕一律复用 `60-progression.js` 的 `prog_*` 并标 `final: true`**（投票日，只有它授 tier）。
   - 每幕给 `maxMonths`（窗口内演不出来 = 竞选拖垮崩盘）；需要张力就给 `abortBelow`（选情跌破即当场败选）。
2. **写各幕事件**（`content/events/65-campaign-acts.js`）：除末幕外的每一幕一张卡（现行 9 条链 / 30 张幕事件）。
   - 一律 `valence:"risk"`（有输有赢）、`category:"career"`、`tierRaw:true`、`tierMin/tierMax` 钉在本场起跳级；**不锁 track**。
   - 选情靠事件自己的 `effects.camp:{ momentum:±x, warchest:±y }` 撬动（`camp` 键见 `CONTENT-SCHEMA.md` §6）。
   - 遵守三值性 risk 契约：**既要有一个无风险保底选项，又要有一个高波动"博一下"选项**（`validate.js` 会逐条核这两点）。

规模随职级缩放：基层 3 幕、州级 4 幕、联邦/大位 5 幕、总统 6 幕。非民选轨道（任命/操盘手/巨富/名人）**不套竞选链**——它们有自己的 `prog_*` 里程碑。

改完照例 `node tools/validate.js`——它会跑竞选链的推进、崩盘、末幕授级与整局曲线。

### 5.14 给内容配英文（i18n，新内容的硬性交付物）

v0.11 起游戏是**中英双语**。契约全文见 [`I18N.md`](./I18N.md)，这里只讲交付纪律：

- **中文没有词典**：引擎串写成 `P.t(key, "中文原文")`，内容原文件保持中文——**写 CN 内容的方式不变**。
- **英文走镜像覆盖层**：新建 `content/i18n/en/events/<同名>.js`（或 `lines/`、`reg/`）写 `POTUS.define("l10n", {lang:"en", content:{…}})`，原内容文件一个字不改。
- **落完镜像跑** `node tools/gen-manifest.js`（重写 i18n-manifest 托管区），再跑 `node tools/validate.js --lang=en` 与 `node tools/i18n-events.js --file=<文件>` 查缺译。
- **新 CN 内容不配 EN 镜像 = 交付不完整**：并行门禁（`i18n-coverage.js` 逐屏中文占比 >5% 退出码 1）会拦住。

---

## 6. 引擎侧：改动的纪律

### 6.1 可以改
- 新增机制字段（如"清算计数""学贷步骤"）——**先改契约，再改实现**
- 修复 bug、优化性能、改进界面（`engine/view/` 八片 + `style.css`）
- 调整 `tools/validate.js` 的校验覆盖

### 6.2 不可破坏的契约（破坏 = 所有内容失效）
1. `POTUS.define(kind, payload)` 的 kind 与 payload 形状（新增 kind 走契约评审）
2. 事件的字段名与语义：`id/title/body/weight/tierMin/tierMax/tracks/parties/flags/notFlags/cond/choices/month/day/brief` + 现行时间/分层字段 `minYear/maxYear/scoped/tierRaw/valence/dyn/unique/after/chore/count*门槛`；`era` 仅作兼容层
3. 选项：`id/text/base/mods/req/cost/stake/note/outcomes`，且 `outcomes` 五档键名固定为 `crit/ok/meh/fail/critfail`
4. `effects` 的键名与取值范围（含 `count` 仇恨计数、`camp` 选情、`fall`、`hardEnd`、`setTrack/setStance`、`contact/forget`）
5. `mods` 的 `src` 枚举与计算公式
6. 结局规则的 `when` 字段与 `priority` 语义；`reason` 词汇（含 `career_end` 与清算/学贷各死因）
7. 存档结构 `POTUS.G` 的字段名（含 `counters` / 学贷组 `debt/debtAccr/loanLate/loanCaps/forbear*/pslf*` / 选民池 / `saveVer` 存档格式戳），存档兼容性依赖它；破坏性变更走 §6.5 的硬零版本门禁（`balance.studentLoan` 参数则归 CONTENT-SCHEMA §10/§15 管）
8. 资源键名固定为 `fun / fav / rep / lev`（`ap` 精力、`hp` 健康为**休眠字段**，效果空操作），投注键名固定为 `fun / fav`（`POTUS.stakeSpec/stakeInfo/computeP` 的入参契约）
9. `brief` 的分段键名固定为 `lede / known / rumor / unknown / terms`；`terms` 元素形状固定为 `{k, v}`
10. `month` 取值 1-12、`day` 取值 1-31；引擎的日期口径 `POTUS.dateText(ev)` 与报头/状态面板同步
11. i18n 契约：`P.t(key, 中文默认值)` 的 key 稳定性——英文覆盖层按 key 合并，**改了 key 等于删了翻译**（`tools/i18n-coverage.js` 会报缺口）

### 6.3 允许的兼容性变更方式
| 想做的事 | 正确做法 |
|---|---|
| 给事件加新字段 | 新增**可选**字段 + 引擎提供默认值 |
| 改某个字段语义 | 新增字段，旧字段保留为别名，标注 deprecated |
| 改效果取值范围 | 不要改；新增独立效果键 |
| 重命名字段 | 引擎同时接受新旧名（过渡期），契约里写迁移说明，下个大版本移除 |
| 必须破坏兼容 | 升 `POTUS.VERSION` 主版本号 + **在 git 提交说明里写迁移指南**（项目没有独立 CHANGELOG 文件，以提交历史为迁移记录）+ 通知内容侧 |

### 6.4 引擎改动后的自检
```bash
node tools/validate.js     # 必须"全部通过"（改了平衡参数再加跑 --games=300）
# 动过 engine/view/* / time.js / dice.js / style.css 的话，再跑一次真 DOM 冒烟：
NODE_PATH=~/.workbuddy/binaries/node/workspace/node_modules node tools/smoke-ui.js
```
校验脚本会自动读取 `index.html` 的清单（含两个托管区），因此新加的文件也会被一并校验。

### 6.5 存档格式版本（v0.12 #26，硬零兼容）
- `core.js` 的 `POTUS.SAVE_FORMAT = 12`：`serialize()` 时盖进 `G.saveVer`；`doLoad` / `importSave` 在 `migrate()` **之前**按 `SAVE_FORMAT_MIN` 硬校验。
- 旧档没有软着陆：读档弹「旧政权」对话框只给**删档 / 开新局**；列表里灰显删除-only；自动档在启动路径静默丢弃。**存档上的破坏性变更不做迁移**。
- 什么时候必须 `SAVE_FORMAT` 与 `SAVE_FORMAT_MIN` 一起 +1（两值恒等 = 硬零策略的体现）：
  - 改已有字段**语义**（例：学贷从按月复利改成单利+年度资本化，v0.12 #25 就是升 12 的那一刀）；删字段；把"字段缺失=另一行为"改成"=再行为"。
  - **只加字段、由 `migrate()` 补默认值 → 不升版本**，旧档照常载入。

---

## 7. 内容写作规范（血泪教训）

### 7.1 多行格式，禁止单行压缩
这是本项目**踩过最大的坑**：早期把整个选项压成一行手写括号，产生了大量隐蔽的括号失衡，`node --check` 报错点还会漂移，排查成本极高。

**正确写法**
```js
choices: [
  { id:"sign", text:"签名背书", base:0.5, mods:[{src:"attr",key:"CHA",w:0.5}],
    outcomes:{
      crit:{ body:"…", effects:{ rep:1.2, fac:{ establishment:15 } } },
      ok:{ body:"…", effects:{ rep:0.6 } },
      meh:{ body:"…", effects:{ rep:0.3, flags:["stain"] } },
      fail:{ body:"…", effects:{ rep:-0.2 } },
      critfail:{ body:"…", effects:{ rep:-1.0, fac:{ press:-15 } } }
    }
  },
  { id:"refuse", /* 第二个选项 */ }
]
```

**判断标准**：每个 `outcomes` 块的闭合括号应当**一眼可见**，不需要数。

### 7.2 其他约定
- 字符串统一用双引号；正文里的中文引号用 `'` `'`，不用转义
- `id` 全局唯一，加前缀（`2008_` / `prog_` / `rg87_` / `reck_` / `chore_`）
- 事件里**不写逻辑**；需要条件用 `cond(G)`，需要门槛用 `req` / `when` 词汇
- 事件里不引用不存在的 `track/party/faction/medium/contact/wrath` 键（校验脚本会报错）
- **标题是一句看懂"发生了什么"的陈述句**，文学性放 body；body ≤200 字（`tools/text-audit.js` 会量）
- **新 CN 内容必须同交付 EN 镜像**（§5.14）

### 7.3 数值设计参考
| 项 | 建议 |
|---|---|
| `base` | 0.35（逆风）～ 0.7（顺风）；纯运气事件用 0.5 |
| `weight` | 主线 14-20，支线 8-12，氛围 5-8 |
| 大成功收益 | ≈ 成功收益 × 2，并可附加 `flags` 解锁后续支线 |
| 失败代价 | 属性小幅下降 + 派系好感 -4~-10；**hp 已退役，别再写扣健康** |
| 大失败 | 引入不可逆状态（`scandal_2+` / `investigation_open` / `fall` / `hardEnd` / 攒恨） |
| 丑闻分级 | 1=流言，3=立案，5=终局（会触发入狱结局） |
| 层级跃迁 | 用 `prog_*` 系列事件的 `effects.tier:1`；失败**不给**层级 |

**平衡红线**：`balance.recentCap` 必须**小于**事件总数，否则事件池会被去重窗口掏空、退化为填充事件，层级永远升不上去（校验脚本会拦这一条）。非 unique 卡另有 `idRepeatMul: 0.15` 终身衰减兜底。

**月度回合带来的一个副作用（务必知道）**：一个月一回合之后，**每局的事件总量比原来"一年几回合"多得多**，
于是层级提升、资源累积都会变快。已经做的几处补偿是：

1. `prog_*` 晋升链全部标记 `unique: true` —— 每个仕途里程碑一局只演一次，晋升速度不再随事件数增长；
2. 机制演示包权重从 30/28/26 降到 6/5/4 —— 演示内容不再淹没正式内容；
3. `balance.eraWeightMul`（默认 3）—— 时代专属事件权重 ×3；
4. **单卡终身衰减 `idRepeatMul: 0.15` + `rereq` 再解锁** —— 撞过一次的事不再年年撞；要"会回来"的麻烦必须显式写再解锁条件。

调平衡时**先跑 `validate.js --games=300 --seed=N` 看层级分布与结局分布**，再看量级/类型分布。如果全量局里有超过一半打到 T5，
说明晋升还是太快，优先调 `prog_*` 的 `weight` 或 `tierMin/tierMax`。至于"事件太多/太吵"，那是另一码事，
**别顺手砍 `activeChance`** ——它几乎不减事件总量，理由见下面 §7.4。

### 7.4 调节奏与成长预算：旋钮各自管什么（#37 实测 → #38 定稿）

**先记住这条反直觉结论**：一个月一旦被判定"有事"，档期就会一路填到**年度额度**为止。
所以 `activeChance` 只决定"有事的月份有几个"，**不决定"事件一共几件"**——
#37 第一轮把 `activeChance` 从 0.08 砍到 0.05，第 1 年事件数只从 14.1 掉到 10.9，就是这个原因。
#38 因此把密度承诺整个搬进额度层：**玩家一年 2—6 件"会刷屏"的事**（非固定四桶合计），全生涯同一条尺。

| 想改什么 | 动哪个键 | 在哪 | 备注 |
|---|---|---|---|
| 事件**总量**（年度上限） | `pace.eventMax`（=6） | `engine/core.js` BALANCE_DEFAULTS | **非固定四桶**（公务＋随机＋灰产＋竞选幕）的年总闸；`fixed` 史实与 `wh` 白宫月决策**不计入也不被拦**，竞选幕记账但不拦（链要演完） |
| 某一条桶的份额 | `pace.careerMax`（=2）／`yearRandomMax`（=1）／`grayMax`（=1） | 同上 | 公务通道在 #38 之前**没有年额度**，只吃概率——它是"月月有会开"的主渠道 |
| 单月**档期数** | `slotsMax`（配 `slotsBase`/`slotsVariance`） | `content/01-config.js` | 现行 2（一个月最多两条） |
| "这个月有没有事" | `activeChance` **＋** `activeMin` | `content/01-config.js` | **必须一起动**：`pActive` 被 `clamp(activeMin, activeMax)`，只降基线会被下限默默吞掉（#37 定稿口径 ⑥）。注意它只管"档期"，总量看上面两行 |
| 日常公务噪声 | `choreDynamic.{chance,emptyFillChance,repeatMonths}` | `content/01-config.js` | 空月兜底 `emptyFillChance` 是开局最吵的一条；年额度另由 `careerMax` 兜 |
| 开局头两年被打扰 | `earlyCalm.{activeMul,choreMul,quotaMul,slotsCap,months}` | `content/01-config.js`（`core.js` 有同值兜底） | #38 起是**轻闸**（0.8/0.6/**0.5**/1）：让开局比全局再薄一档。`quotaMul` 走 `calmQuota` 的 `floor`，只乘在 `eventMax`(6→3) 与 `careerMax`(2→1) 上；**别乘到随机/灰产桶额度**——那两桶只有 1 件名额，floor 之后直接归零而公务没闸，实测开局反而更稠 |
| 平静月的自然成长 | `vignette.attrChance` | `content/01-config.js` | 现行 0.08；`attrCap 88` **刻意低于**自由点硬顶 100 |

**两条"只有两条门"的不变量**（#37 定稿，validate 钉死）：
属性 = 自由点 + 天赋卡池（后天只走事件卡，且 `filterOnceAttr` 让同卡属性只首次生效）；
钱 = 月账（`P.monthlyLedger`）+ 事件卡（生息只在年终结算）。
**任何绕过单一流水、玩家在界面上算不出来的资源入口都按 bug 处理**——静好岁月原先那条
`funChance 0.30` 的资金暗账就是这么被整条删除的（口径 ⑤）。

验收读数：`validate.js` 输出里的「#38 非固定四桶【年均】」（2—6 件/年·p90 ≤ `eventMax`+1·开局两年**吃额度的三桶**不高于全局——四桶总数在开局两年可能被一串竞选幕顶高，那是设计内）、
「#37 开局密度」（第 1 年 5—8 件、单月竞选幕 ≤1）、「#37 开局四维涨幅（8 年）」、
「四大类【年均/局】」（固定 ≥ 职业 ≥ 随机，且三桶各自 ≤ 对应额度）四行。

---

## 8. 协作流程

### 8.1 内容侧提交清单
- [ ] `node tools/validate.js` 全部通过（改了平衡/汇率/曲线 → 加跑 `--games=300`）
- [ ] 新增文件 → 跑 `node tools/gen-manifest.js` 登记（**没有手改 index.html 托管区**）
- [ ] 新增事件：五档结果齐全、`id` 唯一、`grade/category/valence/dyn` 都写了、新内容带 `tierRaw`
- [ ] 新增事件：**`brief` 写了**（玩家不该被丢进看不懂的局面）；标题通顺、body ≤200 字（`tools/text-audit.js`）
- [ ] 写了 `month` 的话，确认它是**史实锚点**（不是"随便挑个季节"）；年代大事走 `fixed` 定点表
- [ ] 依赖某种媒介的事件，写了 `medium`（而不是硬编码 `fromYear`）
- [ ] 补/改年带内容 → `node tools/density-scan.js` 不报偏薄年份
- [ ] **CN 新内容已配 `content/i18n/en/` 镜像**，`--lang=en` 下 validate 通过
- [ ] 数值不越界（`base` 在 0-1、系数在 schema 范围内、不写 `ap`/`hp`）
- [ ] 动到 `lev` / `cost` / `stake` 的话：该事件仍有**保底选项**（无 `cost`、无 `req`）
- [ ] 引用了人脉（`contacts` / `req.contact` / `effects.contact` / `effects.forget`）→ 对应 id **已在 `reg.contact` 登记**（`07-contacts.js`）
- [ ] 用了 `countMin/countMax/countEq`（仇恨/清算）→ 仇家组已在 `POTUS.define("wrath")` 登记
- [ ] 写了事件链（`after`）→ 每一幕 `unique: true`，且晚一幕**自己声明 `flags`**，不把"前情"当必然
- [ ] 写了晋升事件（`prog_*`）→ 带 `minTenure`，且与竞选链 `gate` 对齐
- [ ] 写了「静好岁月」片段 → 时令覆盖 12 个月、每个槽位留一条无条件片段、**没有转折**（见 §5.10）
- [ ] 加了照片 → 文件名**确实在 `assets/events/` 里**、类型 key 在 `reg.category` 里存在、图压过（≈900px/q78）（见 §5.12）
- [ ] 看一眼 `validate.js` 的**填充占比 / 日期自洽率 / 时代专属占比 / 类型分布**等数字是否健康

### 8.2 引擎侧提交清单
- [ ] `node tools/validate.js` 全部通过；动过 UI/机制 → 加跑 `tools/smoke-ui.js`
- [ ] 契约有变化 → 已更新 `docs/CONTENT-SCHEMA.md`（i18n 相关更新 `docs/I18N.md`）
- [ ] 破坏性变更 → 已升 `POTUS.VERSION` 主版本 + 在 git 提交说明写迁移指南
- [ ] 已有内容包**无需修改**即可继续运行（向后兼容自测）
- [ ] 发布 → `bash dev/tools/package.sh`（自检 + 重打 dist/，docs/ 随包进 dist；同时在项目根产出 itch.io 上传包 `path-to-power-<版本>.zip`）

### 8.3 冲突处理
- 内容需要新机制 → 提需求（描述场景 + 期望字段形状）→ 引擎侧设计并更新契约 → 确认后实现
- 不要"先在事件里写个 hack、回头再改" —— 这类临时逻辑会永久留在内容里，成为接手者的地狱
- 并发作业时 `index.html` 托管区**一律以 gen-manifest 重生产为准，不手工和解**（`merge-worker.sh` 会强制重生成）

---

## 9. 自动化校验

### 9.1 `tools/validate.js`（零依赖，必跑）

**默认 20 局**快速档（结构断言与局数无关，统计断言在样本 <8 时自动跳过）。一条命令覆盖下面全部类别：

| 阶段 | 检查内容 |
|---|---|
| 用法 | `node tools/validate.js`（快速档）；`--games=N --seed=N`（全量口径固定种子：`--games=300 --seed=N`）；`--diff=normal\|hard\|brutal`（锁定难度跑模拟，**学贷断供校准面板**用）；`--lang=en`（双语各跑一遍）；`--val-strict`（三值性全库硬验收）；`--tune`（valenceWeights 网格搜索） |
| 语法 | 逐文件解析（等价 `node --check`），文件缺失也报错 |
| 加载 | 按 `index.html` 清单顺序执行，捕获启动崩溃 |
| 引用完整性 | 事件/填充/黑天鹅引用的 track、party、faction、entry、medium 是否存在；event id 是否重复；`grade`/`category` 齐备且在注册表内；`fromYear/toYear/years`/年窗是否自洽；五档结果齐全；`base` 0-1；`cost`/`stake` 键与形状（`cap ÷ w ≥ 1`）；`month/day` 范围；`brief` 四段与 `terms` 形状；`fixed` 引用的事件存在；结局有兜底；`recentCap < 事件总数`；**每个事件都有「无 cost 且无 req」的保底选项** |
| 三值性 / 系数 | 逐卡核对 `valence` 语义与系数区间（`fun` 放宽到 `coefMaxFun`）；语义违规默认只报清单、`--val-strict` 下硬判 |
| 背景卡 / 时间 | 统计 `brief` 与带日期覆盖率（快照口径）；低压力年份能抽到平静月 |
| 月度回合 / 量级 / 媒介 | 压力→档期数与量级分布的单调性；`fixed`（含兼容的 `era.scheduled`）定点必发且约束生效；媒介时间轴门控；每年档期数统计 |
| 掷骰分布 | 1 万次投掷，验证 crit≈15%、critfail≈3% |
| 资源经济 | 投注加值/花费计算、余额夹取、95% 封顶、advantage 分布优于单次；**投注级别价（单价随身位·不随钱包）**（`stakeFunPer` 随层级单调升、同一身位下余额 2 万/200 万与"事件写没写钱"都不改单价、`stakeMax = min(ceil(cap÷w)=8 档, floor(余额÷per))`、major 一档贵过 minor、T0 家底 $10k 投得起第一档、写死 `per` 原样保留且 `source==="content"`、per 是 500 的整数倍且落在 `[perMin,perMax]`、`stakeRateNote` 文案交代「按身位定价 + 家底只决定档数」）；**#28② 的 `funMul` 吃 INT**（收益随 INT 递增、INT50 不缩放、翻车时高 INT 亏得少、无本金声明不许凭空生钱）与事件经济闸（`funMul ∈ [-1,+3]`、每个 `funMul` 选项必须有 `cost.fun`/`req.fun` 本金） |
| 把柄 / 人脉 / 事件链 / 在位时长 | `lev` 可加/可花/不为负、`bonusPressure.leverage`（≥3 份顶活跃度）与年度衰减；人脉引用完整性；`after` 链闭合与窗口门控、续集加权实测 ≈90%；`minTenure` 合法性与 `monthsAtTier` 门控；`count/countMin/countMax/countEq` 仇恨计数闭环（wrath 登记 ↔ 事件引用）；**单卡节奏三道闸**（`idRepeatMul` 终身衰减、`idRepelMonths` 硬冷却、`prog_*` 与定点档期豁免）与 **#28② `pace:"exempt"` 豁免通道**（衰减恒 1、不吃硬冷却、仍被 `pace.grayMax` 拦下；内容纪律：exempt 必须显式 `unique:false`） |
| 学贷 / 生涯结算 | `studentLoan` 各难度开局本金、单利计息/1 月资本化/月供/断供判定、缓交与 PSLF 全生命周期、连续断供超 `lateLimit` → `bankrupt`；存档版本门禁（`saveVer` < `SAVE_FORMAT_MIN` 判旧）；`endYear 2025` → `career_end` 七条 `career_*` 结局与 `president_done` 分支可达 |
| 升职庆典（`view/fanfare.js`） | **入队判定**：`tier:+1` 入队一条、资历闸拦住的**不**入队、`tier:+3` 跳级只入队一条（span=3）且 `served_*` 只记起点级（跳过的中间级留白＝资历债）、`fall` 不入队；**载荷口径**：`size0 < size1`、`die1 > 0`、`promoteCount` 同步 +1；**纯函数 `fanfareHTML`**：10 格阶梯 + `now`/`past`/`skip`、三行对比、非顶点出「下一级」而顶点出专属措辞；**环境容错**：`popFanfare` 在没有 `appendChild` 的 DOM 桩上安静跳过并把队列清空（不抛、不谎报弹成）；**旧档兼容**：`fanfareQ`/`promoteCount` 字段缺失时 `applyEffects` 就地建队、`migrate()` 清空 `fanfareQ` 但保住 `promoteCount` |
| 静好岁月 / 每月的账 | 片段注册完整性、时令 12 月覆盖、槽位兜底、极端处境都拼得出文字；`settleQuietMonth` 幂等、成长不越界且随年龄衰减；**#37③ 成长预算**（`attrChance ≤ 0.10`、`attrCap < 100` 自由点硬顶、`attrKeys` 不含 INTG、`funChance/funRate/trackBonus.*.fun` 必须**不存在**＝资金暗账已删）；`monthlyLedger` 入账与幂等（工资/开销/学贷/选民单点结算） |
| 事件配图（照片层） | 登记类型 key 在 `reg.category` 内；**`fs.existsSync` 逐文件检查照片在磁盘上**；缺图退 SVG；`ev.photo` 覆盖与关闭 |
| i18n | 多语言覆盖层自检：`--lang=en` 下至少有一张卡变英文（覆盖层没生效会响）；l10n 定义形状合法 |
| 模拟对局 | 默认 20 局全自动跑通（**走真实的 `advanceMonth` 月度推进**，每局真实支付 cost、下注、经手学贷），检查运行时错误、层级分布、结局多样性（含清算/破产/career_end）、每年档期数、量级/类型分布、时代专属占比、填充占比；**四大类年均**（#32 额度：随机 ≤ `pace.yearRandomMax`、灰产/豁免 ≤ `pace.grayMax`）、同月重复卡回归。**统计型断言的门槛要卡在观测带中间，不是卡在实测值上**：20 局随机样本连局时长都会变（同码两跑 428 年／530 年），占比类读数有 ±1pp 抖动——#37 因此把「时代专属占比 ≥15%」下调为 ≥12%（实测带 14—15%·1980 时代最低 11.6%），并把「建角最富组合 ≥$1M」反转为「一次性资金 ≤4×`freeFunPerPoint`」 |
| 引擎/内容契约 | 运行期动态注册新 event/effect 键，验证引擎自动接纳 |

### 9.2 `tools/smoke-ui.js`（jsdom，改 UI/机制时跑）

真的起一个 DOM，把「标题 → **建角三步向导（难度+姓名 → 天赋抽卡 → 自由点）** → 年卡 → 事件/平静 → 日期/量级/类型/媒介 → 事件配图（照片 + 缺图退 SVG）→ 背景卡折叠 → 代价标签 → 缺资源变灰 → D&D 投注面板 → 投注上限护栏 → **投注级别价（单价随身位·不随钱包）** → 死局保护 → 确认判定 → 掷骰结算 → **升职庆典弹窗** → 收益面板/职位卡 → 把柄 / 人脉 / 「承前」条 → **上班的账 + 静好岁月合并卡** → 悬浮说明气泡 → 选民动态 → 跨年直进（无年终屏）」整套点击一遍。
（历史上"AI 设置面板/润色按钮"的断言已随 llm.js 下架全部移除；不要把它们加回来。）

其中容易被改坏的断言（节选）：
- **投注级别价**：同一选项 T5 一档贵过 T0、同层级财富轨道不便宜于选举轨道；**余额从 5 万翻到 5000 万，`per` 一分不动**，只体现为档数变多；面板必须渲染出 `.stake-rate` 说明条并写明「按身位定价 / 月薪 / 家底只决定押得起几档」；T0 家底 $10k 至少投得起 1 档（旧版写死 $250k 时恒为 0）。
- **把柄 / 人脉 / 链**：人脉显示姓名不是 id；`cost:{lev}` 不足置灰；`req.contact` 写明要先认识谁；「承前」条写出上一幕标题与间隔。
- **静好 / 每月的账**：合并卡真的报出工资/开销/结余与选民变化；静好成长**不再重复结选民**（voterDrift 已归 monthlyLedger 单点）。
- **升职庆典**：走**真实的 `resolveChoice`**（不是手搓 DOM）——结算页必须仍在庆典窗底下（庆祝不吃叙事）、阶梯画满 10 格且 `now`/`past` 各就各位、大标题是真头衔而不是「等级 N」、三行对比里必须有 `$`、非顶点要预告下一级；**点背景 + 等 1.2 秒都不许关**（唯一出口是「就任 →」）；`afterEvent` 的兜底 flush 要能把漏网的晋升弹出来，而 `fall` 之后队列必须还是空的。
- **版式**：v0.10 头版社论顺序——配图在正文之前（标题→导语→图→正文）；晋升类选项自动吃「选民底气」修正。
- **遗留路径**：旧全量建角（掷骰/VIP/选州）的引擎函数仍须可调用（回退保险），但现行入口是三步向导（`view/create.js`）。
- **建角预览**：第 3 步属性行必须等于 `startAttr + 自由点×10 + 已选卡`，且**零白送**——难度/出身/起点/州都不加三围（#37②，`balance.startAttr` 0/0/0、诚信 50）。

**改了 `engine/view/*`、`engine/time.js`、`engine/vignette.js`、`engine/dice.js`、`engine/art.js`、`engine/style.css` 或 `content/09-photo-art.js` 之后建议跑一次。**

```bash
cd ~/.workbuddy/binaries/node/workspace && npm install jsdom   # 只装一次
cd <game>/dev && NODE_PATH=~/.workbuddy/binaries/node/workspace/node_modules node tools/smoke-ui.js
```

> 引擎本身零依赖；jsdom 只有 UI 冒烟用到，装在隔离工作区，不进游戏目录。

> **要看真像素（截图复核新界面时踩过）**：jsdom 没有布局，量不出宽度。用 headless Chrome 截静态页——
> `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --user-data-dir=$(mktemp -d) --window-size=1440,1100 --virtual-time-budget=4000 --screenshot=shot.png file://<abs>/preview.html`，
> 配 `--dump-dom` 可以在脚本里读 `getBoundingClientRect()` 量出真实盒模型。
> **坑：`--window-size` 的宽度有 500px 下限**（`innerWidth` 会被抬到 500），所以"390px 截图被裁掉"多半是工具的锅而不是 CSS 的锅——先量 `innerWidth` 再下结论。

**接入 CI 建议**：pre-commit 或 CI 里跑 `node tools/validate.js`（退出码非 0 即拒绝）；涉及 UI 的 PR 再加跑 `smoke-ui.js`；并行内容作业的门禁组合（validate + density-scan + i18n-coverage + gen-manifest --check）挂在 `tools/merge-worker.sh` 里。

### 9.3 工具矩阵（tools/ 全家福）

| 工具 | 什么时候跑 | 一句话 |
|---|---|---|
| `validate.js` | 每次提交 | 一键校验 + 生涯模拟（默认 20 局），§9.1 |
| `package.sh` | 发布 | `bash dev/tools/package.sh` = validate 30 局 + 同步 dist/（含把仓库根 docs/ 复制进 dist/docs）+ 在项目根打 itch.io 上传包 `path-to-power-$VERSION.zip`（`VERSION` 常量在脚本顶部，发新版时改）。压缩包**根目录直接是 index.html**（脚本会验条目表，套一层文件夹的包在 itch 上是白屏）；`--full`=300 局深验、`--fast`=只打包、`--check`=只自检、`--no-zip`=不出压缩包。**dist/ 与 zip 都是产物，禁止手改；zip 不入库** |
| `gen-manifest.js` | 新增内容/i18n 文件后 | 重写 index.html 两个托管区；`--check` 可当门禁 |
| `smoke-ui.js` | 动过 UI/机制 | jsdom 真点击，§9.2 |
| `audit.js` | 内容体检 | 五节报告：一览 / flag 供需闭环 / after 链完整性 / 时代×三值性覆盖 / 财富闸门自洽 |
| `choice-audit.js` | 手感体检 | 找"闭眼都会选"的选项：占优 / 过平 / 同轴单调 |
| `text-audit.js` | 文字体检 | 标题通顺度 / body 超 200 字 / 缺 brief 清单 |
| `density-scan.js` | 铺年带后 | 年度大事密度（Σ=fixed+钉年卡 vs 1980—1988 基准），偏薄退出码 1 |
| `i18n-coverage.js` | 双语门禁 | 逐屏中文占比（英文屏 >5% 中文退出码 1） |
| `i18n-events.js` | 补翻译 | 逐卡缺译探针（zh/en 双 boot 逐叶子比对） |
| `migrate-scale.js` | 一次性 | 绝对金额 → dyn 系数草稿 + 三值性预判（产物在 tools/out/，人工审查后落卡） |
| `merge-worker.sh` | 并发合并 | worker 分支串行入库：--no-ff 合并 → 重跑 gen-manifest → 全量门禁 |
| `preview-photos.html` | 配图上 | 浏览器打开看 13 类照片在事件卡里的实际观感 |
| `out/` | — | 工具产物（草稿/截图），非事实源 |

---

## 10. 已知限制与路线图

**规模快照（2026-09-24，易漂移计数一律以 validate/density-scan 输出为准）**：事件约 306 张（events/ 共 42 个文件）、结局规则约 25 条、时代仅 5 个（pre-1980 已冻结进 `deprecated/`）、`fixed` 定点 27 处 define / 约 142 条、带日期事件约 131/306、平均约 9 档期/年、静好素材约 58 条、照片 13 张（13 类全覆盖）、州 10 个、竞选链 9 条 / 幕事件 30 张、事件类型 13 个。

**当前真实限制（v0.12）**
- **内容量已不是主要瓶颈**（306 张卡 + 全年代线），质量瓶颈换成了**选项权衡**与**文字打磨**：`tools/choice-audit.js` 报出的"占优/过平"选项仍是逐卡回炉清单，`tools/text-audit.js` 的长 body 同理。
- **清算线是刻意的roguelike式劝退设计**：仇恨永不衰减、前哨战(≥25)与清算(≥55)两拍、fail/critfail **即死无保底**（assassinated/framed/ruined/purged 四条 BE + 学贷 bankrupt）。新内容引用 `countMin/countMax/countEq` 时要想清楚这条线要不要留活口——目前的答案是"不留，但每条都有泄压阀（低头/交钱/示好可削恨）"。
- **学贷螺旋只有三档难度生效**（normal 65k / hard 42k / brutal 28k；easy/legendary 开局无贷）。v0.12 #25 起为**单利+年度资本化**：月息进欠息桶 `debtAccr`（桶内不再生息）、每年 1 月资本化进本金；断供口径（当月还款 < 当月新息）与 `lateLimit`（#19 定稿：**三档同宽 20/20/20**，旧 6/4/3 会让八成局前期死于学贷）靠 `validate.js --diff=X --games=100` 的校准面板盯着，改曲线必须重新校准。玩家侧有两扇正当门：缓交（`forbear`，声望换月数）与 PSLF（`pslf`，低层公职 120 月豁免）。
- **多支路主线已砍掉**：`engine/arc.js` 与 `content/11-arcs.js` 保留在仓库但**不加载**；要复活需要重新过设计评审。
- **NPC 关系图 / 关系面板还没有**（`reg.npc` 预留未实现），人脉本质仍是"有名字的 NPC + 好感度"。
- **轨道切换（"变节"）只有设计，未实现**。
- **`president` 任期的逐月扮演还没做完**：2025 前当上总统能继续玩，但总统任内的逐月机制是下一个大项（见路线图）。
- **英文覆盖仍在逐卡回补**：`i18n` 托管区已全量登记，但缺译清单看 `node tools/i18n-events.js`；早期时代包（50—9x）里偶有残留中文。
- `POTUS.VERSION` 字符串仍为 "0.4.0"（存档兼容用），**产品阶段以文档口径 v0.12 为准**，别拿它判断引擎新旧。

**路线图（按引擎/内容拆分）**

| 里程碑 | 引擎侧 | 内容侧 | 状态 |
|---|---|---|---|
| v0.3—v0.4 | 月度回合、量级、媒介、事件链 `after`、把柄、人脉、`minTenure` | 灰产/媒体/档案链、族群飞地、晋升减速 | ✅ |
| v0.5—v0.8 | 出生州 / 掷骰建角 / 下野 / 收益面板 / 年终随笔；三值性 + 系数经济；竞选链（9 链 30 幕）；时代浪潮 | 背景卡全库补齐；dyn 迁移（migrate-scale） | ✅ |
| v0.9 | **报刊风重做**；`ap`/`hp` 退役；「每月的账」`monthlyLedger`（工资/开销/选民单点结算） | tagNames 精简为"身份钥匙"；素材按新资源池改写 | ✅ |
| v0.10 | 头版社论版式（标题→导语→图→正文）；选择反馈、悬浮说明 | 年带迁移：120—128 铺至 2024、129—133 补隙 | ✅ |
| v0.11 | **经济重配**（工资曲线/负债谷底）；**i18n 双语地基**；**1980→2025 生涯线 + `career_end` 结算 7 条成就结局** | `en/` 覆盖层全量落树；1991—2024 密度达标 | ✅ |
| v0.12 | **清算线**（wrath 登记 / `count` 效果 / `count*` 门槛 / fail 即死）；**学贷螺旋**（断供→bankrupt）；~~**投注三锚立方根 + 资金闸**~~（已划到 **#28① 级别价**：单价只看身位、`potShare`/`cashStakeShare`/`stakePot()` 全删）；**#28②** `pace:"exempt"` 豁免通道 + `funMul` 的 INT 修正；单卡终身衰减 + `rereq`；**竖屏/移动适配** | `140-reckoning.js` 清算包（前哨 25/清算 55 两拍、黑色幽默成就文案）；**#28③ `138-speculation.js` 投机包**（6 张 `shady`+`exempt` 的庄家生意） | ✅ 当前 |
| v0.12 #21 | **总统任期逐月化 M1—M4**：`engine/presidency.js`（白宫月决策槽四族轮转 + 支持率 `appr` 与水位 + 届内日历 `raceDue` + `leaveOffice`/`presExitSettle` + `impeachmentDue`）；`campaign.js` 的 `incumbent`/`winKind:"retain"`/`winFlag` 三字段豁免；`dice.js` 的 `src:"approval"`（50% 零点对称）；`stage.js`+`style.css` 的椭圆办公室皮（`P.ovalCls`） | `147—151` 白宫池 24 张轮转（四族各 6，每族 1 张次任专属）+ 弹劾卡；`153/154` 连任与中期两条在任链（7 幕）；`40-endings.js` 遗产三档 S/A/B；5 张 1xx 线卡的总统视角选项；validate 六节断言 + 96 月探针 | ✅ |
| v0.12 升职庆典 | **`engine/view/fanfare.js`**：层级只要往上走就盖一层典礼窗。触发缝在 `effects.js` 的 `tier` handler（唯一写 `G.tier` 处）——晋升/跳级/当选/转轨全自动吃到，资历闸拦住的与 `fall` 下跌不弹；`core.js` 抽出 `salaryAt(tier)`/`electorateAt(tier)` 两个纯查表版本供窗子复用；`G.fanfareQ` 是**一次性 UI 交接件**（`migrate()` 一律清空），`G.promoteCount` 才是账本；两个字段纯 additive，**不升 SAVE_FORMAT** | 新增 `ui.fanfare.*` 13 键 + `ui.effects.promoted`（EN 覆盖同步）；validate 庆典节 + smoke-ui 真点击一屏 | ✅ |
| 下一步 | 政策推进玩法（法案/政策池作载体，`src:"voters"` 目前只是修正钩子）；数值再平衡（`--tune` + 300 局口径复核清算/学贷死亡率） | 缺译回补（`i18n-events` 清零） | ⏳ |

---

## 10.5 现行机制速览（v0.5—v0.12 新接手必读）

**目录四层结构（先记住这个）**：项目根 = `dev/`（开发区，引擎+内容+工具）+ `dist/`（`bash dev/tools/package.sh` 的产物，含随包的 `dist/docs/`）+ `docs/`（文档在仓库根，不在 dev/ 里）+ `deprecated/`（pre-1980 冻结归档）。同一条命令还会在项目根产出 itch.io 上传包 `path-to-power-<版本>.zip`（与 dist 同内容、index.html 在压缩包根目录，`.gitignore` 已排除）。改完代码一条命令：`bash dev/tools/package.sh`（先自检、全部通过后才打包）。

| 机制 | 内容包怎么写 | 引擎在哪 |
|---|---|---|
| 快速开局（现行） | 无需配置：五档难度（传奇/简单/普通/困难/炼狱）+ 姓名；年份锁 1980、党派随机、家乡默认 OH；**难度只发卡数与非属性补偿**（rep/fav/fac），三围一律从 `balance.startAttr`（0/0/0、诚信 50）打底（#37②） | view/create.js `DIFFS`/`fillDefaults` |
| 建角三步向导（v0.12 #20，现行） | ①难度+姓名 → ②天赋抽卡（四稀有度 1/2/3/4，可选张数 = 难度 `picks` 1→5，权重随周目递增，**橙卡第 2 周目起进池**，本步可刷新一次；`woshishabiN` 作弊码输入框也在这一屏）→ ③自由点分配（额度 `freePoints 12 +（周目−1）×1`，**1 点 = +10 属性 = +$2k**，单维 ≤`freeCapPerAttr 10` 点，属性 0—100 硬顶；这一页必须把**全部**剩余来源摊开：`startAttr` + 自由点 + 已选卡） | view/create.js（`gachaHTML`/`allocHTML`）、core.js `freePool/attrCapPerAttr/gachaCfg/rarityWForLoop/orangeUnlocked` |
| ~~定命一掷（旧建角）~~ | **已整条删除**：不再掷骰/重掷，VIP 码不再加自由点；`balance.rollAttrs/vipCodes` 已从引擎与内容移除（validate 反向断言其不存在） | —— |
| 周目（loop）成长（v0.12 #31） | 每局结束周目 +1（无条件），额度与高稀有概率随之上涨；`woshishabiN` 作弊码 = 本局按第 N+1 周目口径建角（不落盘） | core.js `currentLoop/readBonusFree/applyCheat`、结算屏保卡 |
| 生涯线 1980→2025 | 无需配置：`balance.endYear: 2025` 硬墙 → `career_end` 结算 7 条 `career_*`；`president_done` 区分前总统，当总统不再即时结束 | view/stage.js `endYear/nextYear`、progression.js、40-endings.js |
| 清算线（v0.12） | 效果 `count: { wrath_<组>: +n }` 攒恨；门槛 `countMin/countMax/countEq`；仇家登记 `POTUS.define("wrath")`；死因 `hardEnd: "assassinated"\|"framed"\|"ruined"\|"purged"` | core.js `reg.wrath`、effects.js `count`、when.js、140-reckoning.js |
| 学贷螺旋（v0.12，#25 新物理） | 无需配置：`balance.studentLoan`（startDebt 按难度 65k/42k/28k；**单利**月息进欠息桶、1 月资本化；断供=当月还款<当月新息；连续断供 ≥lateLimit 20/20/20 → `bankrupt`；`forbear` 缓交额度、`pslf` 公职豁免门槛）；长期违约压力事件走 flag | core.js `P.loanStep/forbearInfo/startForbear`、topbar 贷款面板、validate `--diff` 校准面板 |
| 投注级别价（#28①） | 一般不用配：一档 = 你这个位子的月薪 × 量级系数（`perSalaryMonths:1` × `gradeMul{.6/1/1.8}`），**与余额无关**；特例 `{ per, w, cap }` 覆盖（写死 per = 剧情定价） | dice.js `stakeFunPer/stakeMax`、view/actions.js `stakeRateNote` |
| 投机收益吃 INT（#28②） | 无需配置：`funMul` 的倍率 × `1+(INT-50)/100×balance.funMulIntLev`（默认 0.4；盈按 k、亏按 1/k）。**必须有本金**（`cost.fun` / `req.fun` / 投注），否则空转告警 | effects.js `funMulIntMul` |
| 投机/灰产豁免通道（#28②） | 卡上写 `pace:"exempt"`（不吃单卡衰减与 24 月硬冷却、走 `pace.grayMax` 额度）**且必须显式 `unique:false`**；范例 `content/events/138-speculation.js` | events.js `paceExempt/paceBucket/idRepeatFactor` |
| ap/hp 退役 | 新内容**不要写** `ap`/`hp`；残留写法空操作 | effects.js 顶注、dice.js |
| 单卡终身衰减 | 无需配置：`idRepeatMul: 0.15`（撞过一次的普通卡权重终身 ×0.15）；"会回来的麻烦"用 `rereq`（when 词汇）声明再解锁 | events.js 权重处 |
| 事件节奏与成长预算（v0.12 #37 → #38） | 无需配置：`balance.pace`（`{yearRandomMax 1, grayMax 1, careerMax 2, eventMax 6}`，**非固定四桶年总闸 = 玩家口径「一年 2—6 件事」**）+ `balance.earlyCalm`（开局 24 月轻闸：`activeMul .8`／`choreMul .6`／`quotaMul .5`／`slotsCap 1`）+ `slotsMax 2`；**属性只有两条门**（自由点 + 卡池），可重复卡的 attr 只首次生效；**钱也只有两条门**（月账 + 事件卡），静好月不再产生资金 | core.js `P.earlyCalm/monthsInRun`、events.js `paceQuota/calmQuota/nonFixedRoom`、time.js `planMonth`、effects.js `filterOnceAttr`、vignette.js；调参口径见 §7.4 |
| 出生州 | `content/12-states.js`：`{name, lean: D/R/S, strength:1-3, entryEffects}`；事件门槛写 `states:[...]`；倾向表 `when.states` | core.js `reg.state`、when.js `states` |
| 下野（软 BE） | 效果键 `fall: 1或2`（降级+声望重挫+fallen 标记+12 月保护期）；tier≥3 退休 → `retire_comeback` | effects.js `fall`、view/stage.js 交代卡 |
| 升职庆典弹窗 | **内容侧零配置**：任何让 `G.tier` 变大的效果都会自动盖一层典礼窗（`tier:+1` 晋升、`tier:+2/+3` 破格跳级、竞选当选、`setTrack` 转轨里程碑）；被 `tierGates` 资历闸拦住的和 `fall` 下跌不弹。要加读数就改 `fanfareHTML`，数据全查既有口径（`salaryAt`/`electorateAt`/`tierGates`） | effects.js `tier`（唯一入队点）、view/fanfare.js（`fanfareHTML`/`popFanfare`）、stage.js 两处 flush、core.js `migrate` 清队列 |
| 硬结局 | 效果键 `hardEnd: "prison"\|"disgrace"\|清算四条\|"bankrupt"` → 终局直接收口 | effects.js `hardEnd`、40-endings.js |
| 路线转向 | 效果键 `setTrack:"operative"` / `setStance:"outsider"` | effects.js |
| 收益面板 / 选项说明 | `resolveChoice` 自动翻译收益（tagNames 登记过的 flag 才翻译）；选项可写 `note:"这条路意味着什么…"` | view/stage.js、view/actions.js |
| 年终随笔 | `content/13-year-tales.js`：`{kind: did/gain/now, when, texts[]}` | view/stage.js `yearNarrative` |
| 每月的账 | 无需配置：工资−开销−学贷+选民漂移，每月经手一次（有事无事都算） | core/time.js `monthlyLedger`、合并卡渲染 |
| 时代风味占位符 | 正文里写 `{ORG}/{PLACE}/{MEET}/{HOME}/{CITY}/{DISTRICT}`，由词典按当年真实面孔替换（词典 `content/09-flavor.js`） | engine/flavor.js |
| 职位卡 | `content/14-offices.js`（轨道×层级 → 职位名 + 月薪表，月薪是经济口径的单一来源） | core.js `reg.office/officeSalary` |
| 静好轨道分化 | `balance.vignette.trackBonus:{electoral:{rep:1.6}, operative:{contact:1.5}, appointment:{attr:1.3}, celebrity:{rep:1.3}}`（只加正向乘子；**不许写 `fun`**，#37③ 后钱只从月账与事件卡进；改完重跑 --games=300） | vignette.js |
| i18n 双语 | `P.t(key, 中文)` + `content/i18n/en/` 覆盖层；语言切换在标题屏 / `?lang=en` | engine/i18n.js、docs/I18N.md |
| 竖屏/移动 | 无需配置；断点 1000/820/600 + 竖屏专区（三区竖排、顶栏横滚），`#app` 上限 1600px | style.css L784+ |

**事件卡现行顺序（v0.10 头版社论版式）**：标题 → 导语 → 配图 → 正文 →（背景卡折叠）→ 选项（note 折叠）。结算顺序：结果叙事 → 收益筹码 → 判定明细（折叠）。

**并行开发的边界**（常被问）：引擎机制改动必须串行（`engine/view/*` 被多个机制共用，并行必冲突）；**内容扩充天然可并行**——不同的人写不同的 `content/events/*.js`（按年带/主题切片），文件互不重叠，靠 `gen-manifest` 托管区 + `merge-worker.sh` 门禁串行入库。边界与号段规则见 [`PARALLEL-CONTENT-WORK.md`](./PARALLEL-CONTENT-WORK.md)。

---

## 11. 排错 FAQ

**Q：双击 `index.html` 是空白页？**
A：打开浏览器控制台看报错。最常见是内容文件里语法错误 → 跑 `node tools/validate.js` 定位。

**Q：新加的事件不出现？**
A：① 新文件跑没跑 `node tools/gen-manifest.js`（白名单区没登记、托管区又没重生成 = 根本没加载）；② `minYear/maxYear` 年窗是否覆盖了这局所处的年份（开局 1980、2025 收线，**已经没有"选时代"这一步**）；③ `tierMin/tierMax` 是否忘了 `tierRaw:true` 被旧映射抬高了门槛；④ `weight` 是否为 0；⑤ **写了 `month` 吗？**写了就只在那个月才可能抽到；⑥ `medium` 依赖的媒介在当年还不存在；⑦ 是不是 `unique` 已演过、或非 unique 卡已撞过（终身衰减 ×0.15）。

**Q：事件出现的月份明显不对（9 月的事件出现在 3 月）？**
A：这是引擎的第三级降级——其余量级在本月都没有「就是本月」或「没写月份」的事件，只能放开月份限制。
根因是事件池太浅，不是 bug。看 `validate.js` 的「日期自洽率」，加内容即可改善。

**Q：玩着玩着全是"一桩地方丑闻"？**
A：事件池被抽空了。看 `validate.js` 的「填充事件占比」。
注意现在的降级链是：本月事件 → 无月份事件 → 放开月份 → **放开去重窗口** → 才轮到填充器，
所以填充占比高只说明**硬条件（年窗 / tier / 媒介 / flags）下真的一个事件都没有**，通常要加内容或放宽 `tierMin/tierMax` 区间。

**Q：历史大事件怎么没按年发生？**
A：大事件不再靠"从池子里碰运气"，而是钉在 `fixed` 定点表上**到点必发**（全库百余条定点，口径以 validate/density-scan 为准；era.scheduled 仅剩 2008 兼容层）。没发生通常是：① 那一局没活到那一年；② **事件自己的**年窗/tier/`flags`/`cond` 不满足——定点只保证"到点尝试发"，不满足会静默跳过；③ `fixed` 引用了不存在的 event id（validate 会报）。密度偏薄另跑 `node tools/density-scan.js` 看哪一年。

**Q：写了事件链（`after`），但续集从来没出现过？**
A：按顺序排查五点：
① **前一幕没演过** —— `after.id` 写的是上一幕的 `id` 吗？链条必须真实发生过才会解锁；
② **间隔不在窗口内** —— `minMonthsAfter` / `maxMonthsAfter` 是"距上一幕几个月"，太早太晚都不会出（引擎按 `monthsSince(prev)` 判）；
③ **前一幕的 `flags` 没打上** —— 晚一幕如果声明了 `flags:["xxx"]`，而上一幕的**你期望的那条路**没打这个标记，续集就永远不 eligible。别把"前情"当必然（样板见 `84-archive.js` 的第一幕：三条路里只有两条打 `archive_taken`）；
④ **没写 `unique: true`** —— 不写的话同一幕会重复演，链条穿帮；
⑤ **权重被稀释** —— 续集解锁后权重会乘 `balance.chainWeightMul`（默认 9），实测占该池 ≈ 90%，正常不会被压掉；如果确实没出现，先查前四条。
`validate.js` 的「把柄/人脉/事件链/在位时长」一节会报 `after.id` 不存在、自环、成环的写法。

**Q：把柄（`lev`）怎么都攒不上去？/ 人脉面板是空的？**
A：两件事分开放：
- **把柄**只能从灰产线事件（`80-shady.js`）+ 少数事件里赚；杠杆类事件在 `balance.resourceBias` 倾斜表里也有加权（走过灰路的人更容易碰上这类场合）。**它不是"存款"而是"消耗品"**——`bonusPressure.leverage` 只在 `lev ≥ 3` 时才顶活跃度（+0.4 压力，你自己成了靶子），
  且每年有 `balance.leverageDecayChance`（34%）概率掉 1 份——**放着不用会烂**。
- **人脉面板空**说明你还没"认识"任何人。人脉是通过事件里的 `effects.contact:{id:...}` 首次获得（第一次见面即"认识"，初始好感写在 `reg.contact[id].favor`），
  不是开局就有的。想快点点亮面板，去走 `80-shady.js` / `82-press.js` / `86-enclave.js` 里的接触型事件。

**Q：怎么突然就背上 / 还清了学生贷款？**
A：normal/hard/brutal 三档开局带贷（65k/42k/28k）。**单利**：月息进欠息桶（桶不再生息），每年 1 月资本化进本金；每月按职位月薪的 25% 设还款目标、月供盖不过当月新息 = 一次"断供"，**连续断供超 lateLimit（#19 定稿 20/20/20：三档同宽，旧口径越穷越短已废弃）直接 `bankrupt` 收线**。喘气有两条正当路：花声望**申请缓交**（一次 6 个月、全局至多 24，冻结期不记断供），或在低层公职连续按时供款满 120 个月吃 **PSLF 豁免**（本金+欠息一笔勾销，结算屏挂成就）。当官仍是还清贷款的正路——职位月薪是月供的锚。设计动机与校准方法见 §10 与 `engine/core.js` 的 `P.loanStep` 顶注。

**Q：旧存档点开提示「这份存档属于旧政权」，是不是 bug？**
A：不是，是刻意门禁（§6.5）：机制大改（如学贷新物理）会让旧档里的字段语义对不上，带病续档比删档更坑。硬零兼容、不写迁移——删档或开新局，二选一。

**Q：被清算死了，是不是 bug？**
A：不是。大收益选项会往 `wrath_*` 仇恨计数里攒恨，≥25 出前哨战（有泄压阀：低头/交钱/示好可以削恨），≥55 出清算正局；**仇恨永不衰减、清算正局 fail/critfail 即死、无保底**——这是 v0.12 刻意立的 roguelike 张力。不想死就别把每组人都得罪光，或者在 25 那一拍就低头。

**Q：层级升不上去？**
A：三件事都查一下：
① 是否有 `prog_*` 事件覆盖当前 `tierMin/tierMax` 区间，且其成功档位带 `effects.tier`；
② `prog_*` 现在**都带 `minTenure`**（在当前层级坐满 N 个月才放行），刚升上来要等几个月，看 `P.monthsAtTier()`；
③ 该 `prog_*` 是否已经 `unique` 演过（一局只演一次），或民选线正卡在竞选链的某一幕里（层级只在末幕投票日授予）。

**Q：遇到一个事件，所有选项都点不动，卡住了？**
A：内容 bug —— 这个事件的所有选项都带 `cost` 或 `req`，而玩家资源见底。
① 引擎有保险丝：`P.fallbackIndex(chs)` 会强行放行一个（优先"只是资源不够"的那个），
按钮上标「⚠ 保底选项：…，硬撑一次」，所以**正常情况下不会真的卡死**；
② 正确的修法是给这个事件补一个既无 `cost` 也无 `req` 的**保底选项**（见 `CONTENT-SCHEMA.md` §4.3.1）；
③ `validate.js` 现在会直接报出违规事件，跑一次就知道是哪个。
（例外：清算正局的即死是设计，不走保险丝——那个事件本来就该有选项把你打死。）

**Q：投注面板里点了 ＋ 没反应 / 加成早就封顶了还能继续点？**
A：这是同一类 bug：档数上限过去只按"身上有多少资源"算，没按"加成上限"算。
现在统一走 `P.stakeMax(k, choice)`，被两道闸夹住：
① `ceil(cap ÷ w)`——超过部分没有收益（资金 +4%/档、上限 +30% → 恒为 8 档）；
② 手上余额——`floor(现金 ÷ per)`，**而 `per` 是这个身位的级别价，与你有多少钱无关**（#28①）。所以：
- 一档都投不起 → ＋ 置灰并写「资金不足：每档需 …，你现在只有 …」，不会"点了没反应"；
- 投到顶 → ＋ 置灰并写「已经加到这项的上限了」（`view/actions.js` 的 `ui.actions.atMax`）；家底薄只是押的档数少，**同一件事不会因为你有钱就变贵**（旧三锚的钱袋闸正是这个毛病，已退役）。
（投注只剩资金 + 人情两轴；精力已退役，不再是加码轴。）
- `P.stakeInfo()` 在扣款前会再过一遍这个闸，界面就算被改坏也不会多扣资源。
写自定义 `stake` 汇率时记得核对 `cap ÷ w ≥ 1`，校验器会拦 `cap < w` 的写法。

**Q：英文界面怎么有些卡还是中文？**
A：缺译，不是 bug。`node tools/i18n-events.js` 列逐卡缺口、`node tools/i18n-coverage.js` 列逐屏占比（>5% 即门禁红线），对着清单在 `content/i18n/en/` 镜像路径里补覆盖层即可。机制契约见 [`I18N.md`](./I18N.md)。

**Q：改了引擎，别人的内容报错？**
A：说明破坏契约了。回滚，或按 §6.3 用兼容方式改，并更新 `CONTENT-SCHEMA.md`。

**Q：能不用 `file://` 而用本地服务器吗？**
A：可以（`python3 -m http.server`），但**不必要**。设计目标就是免服务器双击可玩。

---

## 12. 术语表

| 术语 | 含义 |
|---|---|
| **事件（event）** | 一次叙事+选择节点 |
| **月（month）** | 一个回合。一个月最多若干"档期"，也可能整月平静 |
| **档期（slot）** | 某个月里的一个事件槽位；本月有几个、什么量级由时代压力决定（快照约 9 个/年） |
| **时代压力（pressure）** | 0-6 的数字，**现行口径按年写在 `worldline.pressure`**（主口径）；`era.pressure` 只是未覆盖年份的回落，era 仅剩 5 个 |
| **活跃度（bonus）** | 丑闻/被调查/选举年/高层级/把柄（`lev≥3`）叠加出的额外压力，让日程变密 |
| **量级（grade）** | 事件的分量：`major` 大事件 / `mid` 中事件 / `minor` 小事 |
| **类型（category）** | 事件的主题分类（13 类：仕途/竞选/党务/政务/舆论/丑闻/金钱/私情/民权/危机/外交/灰产/综合），每个类型自带默认配图与配色（照片层 13 张全覆盖） |
| **媒介（medium）** | 事件依赖的"说话方式"（报纸/电视/互联网/短视频…），按年份自动放行 |
| **定点表（fixed）** | 全局定点事件表：`POTUS.define("fixed", [{event, year, month, …}])`，到点必发；`era.scheduled` 是它的兼容前身 |
| **生涯线 / 2025 硬墙（endYear）** | 一局 = 1980→2025 的一条命。到点触发 `career_end` 成就结算（7 条 `career_*` 结局，`president_done` 区分前总统）；当总统**不再**即时结束游戏 |
| **仇恨值 / 清算（wrath / reckoning）** | 大收益选项用效果 `count:{wrath_<组>:+n}` 攒恨（五组仇家登记在 `POTUS.define("wrath")`）；`when` 词汇 `countMin/countMax/countEq` 出门槛。恨 ≥25 出前哨战（有泄压阀）、≥55 出清算——**fail/critfail 即死无保底、仇恨永不衰减**，死因 `assassinated/framed/ruined/purged` |
| **学贷（studentLoan）/ 断供（bankrupt）** | 普通及以下难度的开局背贷（65k/42k/28k）。**单利**月息进欠息桶、每年 1 月资本化进本金；断供 = 当月还款盖不过当月新息；连续断供超 `lateLimit`（#19 定稿 20/20/20）→ 信用破产 BE。缓交（声望换月数）与 PSLF（低层公职 120 月豁免）是两条正当泄压阀。月供锚在职位月薪上——升官是还债的正路 |
| **投注档（stake step）** | 投注面板里按一次 ＋ 的粒度。**每档价码 = 级别价**：`per = clamp(职位月薪 × perSalaryMonths(1) × 量级系数, perMin 500, perMax 500000)` 抹零 —— 只看身位（`dice.js` 的 `stakeFunPer`），历史演进 v0.6 写死 $250k → v0.7 两锚 √ → v0.12 三锚立方根 + 钱袋闸 → **#28① 只留身位锚**（`potShare`、`cashStakeShare`、`stakePot()` 已随之退役）。档数 = `min(ceil(cap÷w)=8, floor(余额÷per))`：家底只决定押得起几档，不改单价；人情 1 点换一次重投取优 |
| **豁免通道（`pace:"exempt"`）** | 投机/灰产卡的节奏例外（#28②）：不吃单卡终身衰减、不吃 24 个月硬冷却、走 `balance.pace.grayMax` 的灰产年度额度。必须与 `unique:false` 成对声明（major 卡默认一局一次）。见 `CONTENT-SCHEMA.md` §4.21 |
| **单卡终身衰减（`idRepeatMul`）** | 撞过一次的非 unique 卡权重终身 ×0.15（叠加 `recentCap` 去重窗口）；"会回来的麻烦"要用 `rereq`（when 词汇）显式再解锁；生意类卡走 `pace:"exempt"` 豁免 |
| **保底选项（fallback）** | 一个事件里既无 `cost` 也无 `req` 的那个选项。保证玩家资源见底时仍能推进；`validate.js` 强制每个事件都有（清算正局除外——即死是设计） |
| **档位（tier）** | 掷骰结果五档：crit / ok / meh / fail / critfail |
| **层级（Tier T0–T9）** | 权力高度（引擎 `tier 0..9`，界面显示"等级 1..10"）；多轨道在此收敛（T0 无名 → T9 白宫）。旧内容经 `LEGACY_TIER_BAND` 六档近似映射；**新内容一律 `tierRaw:true` 按 0..9 直写**。**胜利线 = T6 联邦众议员**，之后仍可冲参议员/副总统/白宫，直到 2025 收线 |
| **轨道（track）** | 晋升方式：选举 / 委任 / 名人 / 操盘 / 财富 |
| **起点（entry）** | 进入政坛的方式，决定开局资源与建议轨道（快速开局里固定 insider） |
| **姿态（stance）** | 建制派 / 反建制 |
| **标记（flag）** | 状态位，驱动条件与结局（如 `scandal_2`、`investigation_open`、`president_done`） |
| **把柄（leverage / `lev`）** | 用脏手段换来的"胁迫本钱"。可加、可花（`cost:{lev:n}`）、不可为负；持有 ≥3 份时会顶活跃度（`bonusPressure.leverage`），每年有 `leverageDecayChance` 概率烂掉 1 份。**只当消耗品，不当存款** |
| **人脉（contact）** | 有名字、有好感度的常驻 NPC。首次通过 `effects.contact` 认识，好感区间 -100~100；`req.contact` 门控选项、`effects.forget` 断交。注册表在 `content/07-contacts.js` |
| **事件链（chain / `after`）** | 跨月/跨年接续的"一件事"。`after:{id, minMonthsAfter, maxMonthsAfter}` 声明前情；前一幕演过后续集权重 ×`chainWeightMul`（默认 9）。样板见 `84-archive.js` |
| **承前条** | 事件卡顶部的「承 前」小条，显示上一幕标题与相隔几个月，告诉玩家这是链条而非随机事件 |
| **在位时长（`minTenure`）** | 事件附加的门槛：在当前层级坐满 N 个月才可能出现（`P.monthsAtTier()`）。用来给晋升减速、避免同层级被反复刷 |
| **每月的账（monthlyLedger）** | 工资−开销−学贷+选民漂移的月度结算，挂在时间轴上、有事无事都经手一次；平静月的账目并进「静好岁月」合并卡报出 |
| **静好岁月（vignette）** | 没有档期的「平静月」里自动拼出来的一段叙事随笔（六槽位：时令/世相/案头/日常/心绪/收束），让主角在无事发生的时候也按部就班地长大。素材在 `content/08-vignettes.js`，逻辑在 `engine/vignette.js`。**只读渲染、不产生选项、不写数字** |
| **槽位（vignette slot）** | 静好随笔的六个拼装位置之一，按顺序取片段拼成一段文字；时令槽位吃月份，其余槽位吃时代/轨道/层级/心绪条件 |
| **平静月结算（`settleQuietMonth`）** | 平静月的成长与叙事落账点，挂在时间轴（`time.js`）上而非渲染层，保证模拟能覆盖、且重复渲染不会重复加成长 |
| **风味占位符（flavor token）** | 正文里的 `{ORG}/{PLACE}/{MEET}/{HOME}` 等，抽取时由 `engine/flavor.js` 按当年从 `content/09-flavor.js` 词典填真实面孔——可重复事件每次都换脸 |
| **照片层（photo layer）** | 事件配图的真图片层（`content/09-photo-art.js`），挂在 `POTUS.art(fn)` 这个最高优先级的挂载位上。能给照片就给，给不了 `return null` 让给程序化 SVG；照片加载失败时用预垫的 `.art-back` 顶上。表在 `reg.photo` |
| **配图三级降级** | `P.artSVG` 的解析顺序：内容级渲染器（照片层）→ `ev.art` → `category.art` → 引擎兜底。**保证任何时候都有图** |
| **填充（filler）** | 事件池耗尽时的模板兜底，保证事件永不枯竭 |
| **模糊胜算** | 给玩家看的档位提示（渺茫/不利/五五开/有利/稳操胜券） |
| **托管区（manifest 区）** | `index.html` 中 `BEGIN/END content-auto-manifest` 与 `i18n-manifest` 两段：只能由 `tools/gen-manifest.js` 重写，任何手改都会在下次重生成时被覆盖 |
| **l18n 覆盖层** | 英文侧的镜像补丁（`content/i18n/en/…`，`POTUS.define("l10n")`），boot 时按结构并进注册表，CN 原文件不动。契约见 [`I18N.md`](./I18N.md) |
| **deprecated/** | 仓库根的死内容冻结区（pre-1980 时代包等）：不进加载清单、不再修改，只作对照 |
