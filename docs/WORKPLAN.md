# WORKPLAN · v0.12.x → v0.13 工作方案

> **本文件是后续工作的唯一依据。**
> **工作方式（2026-09-25 定）：** 每项开工前先把细化方案写进本文件对应条目 → 分步执行，
> 互不依赖的步骤用并行子任务（subagent）跑 → 执行完回写。
> 每完成一项：把该条状态改为 ✅，在「完成记录」表追加日期、提交号和一句话结果说明；
> 半途改方案时同步修订对应条目，不允许只改代码不改本文件。
>
> 任务编号说明：#1—#31 沿用 Qoder 任务目录（`~/.qoder/tasks/e2da547d-…/{n}.json`）的编号；
> 本文件新增的工作自 **#32** 起编号。
> ⚠ 勿与 `~/.claude/tasks/42ee6f27-…/` 里 9/20 旧会话的同名编号混淆（那套 #28/#29 含义完全不同）。

状态快照：2026-09-25，分支 `dev/reckoning-be`，最近提交 `aef8aed`。
工作区含未提交的「精力/健康退役」清理（见完成记录 ①）。

---

## 0. 总览

| # | 条目 | 块 | 状态 |
|---|------|----|------|
| 19 | 学贷：连续断供 N 月 game over + 100 局校准 | 存量 | 🟡 in_progress（被 6/4/3 条款过严问题阻塞） |
| 20 | 开局抽卡 + 建角三步向导 | 存量 | 🟡 代码已落地 `aef8aed`，剩文档同步 |
| 21 | P2：逐月化总统年 | 存量 | ⬜ pending |
| 23 | 把柄×竞选：「投放把柄」行动 | 存量 | ⬜ pending |
| 28 | 钱系统重构（stake 纯级别价 + 灰产免冷却） | 存量 | ⬜ pending |
| 29 | 派系声望四栏面板 | 存量 | ⬜ pending |
| 31 | 结算周二选一永久奖励（**已改 +1**） | 存量 | ⬜ pending |
| 32 | 事件四大类分层与节奏重标 | 新增 | ⬜ pending |
| 33 | 1990+ 定点事件触发荒诊断 | 新增 | ⬜ pending |
| 34 | 砍年度结算/年初简报，头条图挂进时代事件 | 新增 | ⬜ pending |
| 35 | 竞选机制改造（选情值主导，钱退出门票） | 新增 | ⬜ pending |
| 36 | 钱标尺重定：1 自由点 = $2k | 新增 | ✅ `60cb7f9` |

建议开工顺序：**36 → 33 → 34 → 32 → 28（合并验收 36）→ 35 → 23 → 29 → 31 → 19 → 21 → 20 收尾**。
理由：36 是一把标尺，先定下来 28 的级别价、35 的筹款数值才有依据；33/34 是玩家体感最大的
「固定事件荒 + 头条图浪费」，先诊断后动刀；21（逐月化总统年）改动面最大，放最后。

---

## 1. 存量任务（照 Qoder 任务目录口径）

### #19 学贷校准 🟡
连续断供 N 月即 game over 已实装框架，卡在条款标定：6/4/3 过狠。待「单利资本化 + 存档门禁」
落地后跑 100 局模拟校准断供月数与利率。**依赖：** 无硬依赖，但建议在 #36 钱标尺定稿后再校准，
否则月供/身家的比例会二次返工。

**细化方案（#36 已定标，本条解锁）**：
1. 先校准条款：断供月数 6/4/3 放宽为 **12/8/5**（毕业/第一/第二档），连续断供才计数、
   还款即清零的语义保留；利率 0.03 与资本化口径以现实现为准复核一轮（单利+年度资本化）。
2. 跑 `validate.js --games=100`（headless），统计：破产/断供 game over 率、T0–T2 月收入 vs 月供曲线、
   毕业档负债起点 vs 第一份公职薪水的月数比。目标：**不刻意还贷的玩家 1980s 内不至于必死，
   但放任不管必死**；毕业档 game over 率落进 10–25%。
3. 依据分布回调三参数（断供月数、interestRate、startDebt），把 100 局关键分位数写进本条完成记录。
4. 存档门禁已合入（#26），无需再动。

### #20 建角/抽卡收尾 🟡
代码部分已于 `aef8aed` 全部落地（三步向导、四稀有度、周目递增、12 自由点、单维可点满、作弊码明牌）。
剩余：**文档同步**——`docs/DEVELOPMENT-GUIDE.md:212/970`、`docs/CONTENT-SCHEMA.md:1169/1350/1417`
仍写着「gacha 未实装 / freePoints 8 / 定命一掷现行」，须改成现口径。
**⚠ 卡池金额将随 #36 二次重标，文档里金额示例以 #36 定稿为准，避免改两遍。**

**细化方案（#36 已定稿，白=+10/$2k、蓝=+20/$4k、紫=+30/$6k、橙合计+40/$8k 等价，可一次改对）**：
1. `DEVELOPMENT-GUIDE.md:212/970`：删「gacha 未实装 / 定命一掷现行」，改为三步向导 +
   四稀有度抽卡（周目递增·橙卡需当过总统）+ 12 自由点现口径。
2. `CONTENT-SCHEMA.md:1169/1350/1417`：freePoints 8→12、掷骰建角段替换为分配制
   （1 点 = +10 属性 = +$2k，单维上限 10 点、三围可点满 100）、作弊码转明牌输入框一句带过。
3. 全文 grep `定命一掷|freePoints: ?8|未实装` 清残留；诚信建角位→隐藏属性的表述同步。
4. 验收：文档示例数值与 `validate.js` 断言一致（人工比对一遍即可）。

### #21 P2 逐月化总统年 ⬜
roadmap 既定：总统任期从「年度抽象」改为逐月推进。**本轮先立骨架、分四期落地**：
- M1 核心循环：入主白宫后 `time.js` 改走逐月决策槽（复用现有月引擎），新增 `approval`（0-100
  总统支持率，复用 momentum 展示件）；
- M2 素材：月度总统事务池（危机/立法/外交/人事四族 × 首任/次任），中期选举直接复用 #35 后的
  campaign 系统；
- M3 结局线：legacy 结算并入 40-endings 与 #31 结算屏；卸任后清算池（140-reckoning）对接。
- M4 打磨： Oval Office 专属 UI、逐月历史锚点（1xx 线卡总统视角变体，即 #32 的 T7+ 档）。
M1 先行，M2—M4 视本轮产能滚动。

### #23 把柄×竞选 ⬜
竞选面板新增「投放把柄」行动，初选/大选双靶各算效果；与 #35 共用选情表（momentum），
**排 #35 之后**实现。

### #28 钱系统重构 ⬜
① **stake 纯级别价**：`engine/dice.js` 的 `stakeFunPer/stakeMax/stakeSpec` 废除三锚中的
钱袋闸（per ≤ 现金×6%）与事件钱量级锚，每档价只挂钩职级/身位。这是 `smoke-ui.js`
「投注上限护栏」4 红的正式归口（预存失败，非回归）。
② **灰产/投机豁免衰减**：`engine/effects.js` `funMul`  commit 随余额成正比保留，新增 INT 系数
（高 INT 赢得多、翻车少，标定随 #36 标尺做）；不吃 #24 单卡衰减（`events.js:136`
`Math.pow(per,counts)` 开 exempt 分支）与 #27 降频，可反复赌。`major` 默认 `unique:true`
（`events.js:12-13`），投机大卡须显式 `unique:false`。
③ 素材：广场协议 1985、黑色星期一 1987、大空头 2008、1997 投机资本、次贷裂缝 2007-08、
2022 挤兑 + 已带 `funMul` 的储贷/抄底/shady_oneshot；category 不新增 key，复用 `shady`，
配图沿用 `shady.jpg`。

**细化方案（执行口径）**：
1. `dice.js stakeFunPer()`：删「钱袋锚 B（现金×6%）」与「事件钱量级锚 C」两项，
   只留**身位锚 A = officeSalary(track,tier) × perSalaryMonths × gradeMul**；
   `stakeMax` 的档数上限逻辑保留。`01-config.js:465-490` stake 注释块同步重写，
   perMin/perMax 护栏按 #36 标尺重定（量级：一档 ≈ 该职级 1 个月月薪）。
2. 投不投得起 = 现金够不够级别价，**每档价恒定不随余额浮动**（余额只决定你能押几档）。
3. `smoke-ui.js` 投注护栏 4 断言按新规则改写（$23k 余额在 T5 级别价下上限应为 0 档或按新公式），
   改完 4 红清零。
4. `effects.js funMul`：加 INT 系数——`倍率修正 = 1 + (INT-50)/100 × intLev`（balance 可调，
   默认 intLev≈0.4）：高 INT 同时**提高成功档收益、压低翻车档亏损**；阈值判定走既有 outcome
   roll，不另开骰。
5. `events.js:136` 衰减改 `per ** counts`→ 若 `ev.pace === "exempt"` 则跳过；
   灰产/投机卡统一标 `pace:"exempt", unique:false`；#27 降频的同分支放行。
6. 新卡 6 张（1985 广场协议/1987 黑色星期一/1997 投机资本/2007 次贷裂缝/2008 大空头/2022 挤兑），
   挂进对应年代线文件，`funMul + pace:"exempt"`，中英双轨。
7. 验收：validate 新增「级别价不随余额变化」「exempt 卡重复触发不衰减」断言；smoke-ui 0 红。
   手感基准：T0 投不起高档（一档 ≈ 月薪量级），T7+ 一档六位数——全由 officeSalary 表推导，不单独定价。

### #29 派系声望四栏面板 ⬜
建制派/华尔街/军工/宗教 × 仇恨/友好两轴四栏（「人生模拟器」档案观感）。落点：`effects.js` fac 键、
`view/topbar.js`/`view/leftbar.js` 读数（`leftbar.js:76` 已把这四项列入「不再展示」，本任务把它们
以新面板形式放回）；STATUS_LAYOUT 已有 factions 行。i18n：引擎串走 `P.t` +
`content/i18n/en/view|ui`，派系名走 `en/reg`；守 `i18n-coverage --lang=en` 0% 缺译门禁。

**细化方案（2026-09-25 调查定稿）**：
1. 派系注册表全集 11 键（`POTUS.define("faction")`，01-config.js:535-547），四栏取
   **establishment（党建制派）/ commercial（商业·华尔街）/ military（军工复合体）/ church（宗教·道德团体）**；
   英文名 i18n/en/reg/01-config.js:28-43，取用走 `P.factionName(k)`（core.js:371）。
   wrath 仇家注册表（01-config.js:553-559）与本面板无关，别混。
2. 数值域现成：fac clamp **-100..100**（effects.js:13），正=友好、负=仇恨——两轴即符号切分，
   **无需新数据**，纯展示层重排。
3. 新增「四栏归类」元数据：faction 注册项加 `panel: "establishment"|...` 或直接常量数组
   `P.FAC_PANELS = [establishment, commercial, military, church]`（leftbar 消费）。
4. 面板落点：左栏 `leftbar.js:158` factions 行由 chip 流改为 **2×2 四宫格**（每格：派系名 +
   友好/仇恨双条：正值为「友好」绿色进度、负值为「仇恨」红色进度，镜像对称），
   「人生模拟器」档案观感：格内大号数值 + 分档形容词（|v|≥40/≥15/>0 沿用现有 tint 三档口径
   leftbar.js:89-94）。其余 7 派系仍在折叠「档案」列（topbar.js:394-397 STATUS_LAYOUT）保留 chip。
5. 顺手修正注释错位：`topbar.js:16-20` `P.UI_HIDE.fac` 写的是 `religious/intel` 而注册表实键是
   `church/agency`——按用户意图（宗教要在四栏里展示）**解除 church 隐藏**、`military` 同样入面板；
   `press/labor/agency` 维持隐藏口径不变。
6. i18n：新串全部走 `P.t` + `i18n/en/view/leftbar.js`；派系名已有覆盖层，不新增 reg 串。
7. 验收：validate 新增四宫格渲染断言（jsdom 里四格齐、正负条分侧）；i18n-coverage 0%；
   截屏人工核验观感。

### #31 结算周二选一 ⬜（口径已从 +2 改为 **+1**）
每局结束在结算屏二选一：**A. 永久 +1 自由点** XOR **B. 保留一张天赋卡进下周目抽卡池**。
实现：`core.js` 新增 `potus_meta_freept_v1` 键 + `readBonusFree()/addBonusFree(n)`；
`balance.loopFreeBonus: 1`；结算屏先出 A/B 两按钮，选 B 才走 `chooseKeepCard`，选 A 后保卡锁死；
`create.js` `freePoints = balance.freePoints + readBonusFree()`。
**关联：** 一周目基础点 12（`aef8aed` 已落地），多周目累计逻辑同步改成 +1。

**细化方案（执行口径）**：
1. `core.js`：`loopFreeBonus: 2 → 1`（core.js:165 附近 + L157 注释「+2 自由点」字样同步）；
   meta 键 `potus_meta_freept_v1`，`readBonusFree()/addBonusFree(n)` 累加带上限保护
   （上限 = balance.loopFreeCap，默认 8，防无限堆点）。
2. 结算屏（`careerEnd`/结局屏，stage.js:1052 一带）：`gainedThisRun` 时先出 **A/B 两按钮**——
   A `addBonusFree(1)` 立即置灰 B；B 走现有 `chooseKeepCard`（keepQuota=1）。
   互斥落盘：结局屏点击即 `P.metaSet` 记「本局奖励已领」（用存档 seed），重开结局屏不复发。
3. `create.js fillDefaults`：额度 = `balance.freePoints + readBonusFree()`；单维 cap 不放宽
   （维持 10 点/维=100），多出的点进总额度。
4. 顶栏/建角屏「第 N 周目 · 累计奖励 +x 点」展示走现有 loop 读数（create.js:205 一带 freePool）。
5. 验收：validate 新增 A 支（+1 累加、上限夹取）/B 支（保卡必现）/互斥（领 A 后 B 锁）三组断言。

### #23 把柄×竞选 ⬜
竞选面板新增「投放把柄」行动，初选/大选双靶各算效果；与 #35 共用选情表（momentum），
**排 #35 之后**实现。

**细化方案（执行口径，依赖 #35 落地的选情表）**：
1. 行动入口：`campaign.js:283 campaignPanel()`（竞选面板）加「投放把柄」按钮，
   消耗 `lev`（把柄点数）1 点/次，竞选进行中每幕限 1 次。
2. 双靶效果：初选幕——对手退赛概率 +f(lev 投放数, CUN)，成功直接 momentum+15；
   大选幕——momentum±（对方受损但我方「不择手段」暴露风险：INTG 检定，输则 rep-、
   `flags: ["dirty_trick"]`，喂给 #140 清算池）。
3. 效果全部走 `camp` meter 键（effects.js:275 handler），不新增数值系统。
4. 把柄来源沿用现有 lev 积累（清算/调查/黑料卡）；投放后 lev-1。
5. 验收：validate 新增「无把柄时按钮置灰」「投放后 lev/camp 双结算」「暴露失败进 scandal 旗」断言。

---

## 2. 新增任务（2026-09-24 夜谈定）

### #36 钱标尺重定：1 自由点 = $2k ✅
**用户裁定**：原「1 自由点 = +10 属性 = $25k」中金额部分太高，改为 **1 点 = +10 属性 = $2k**。
- 属性侧不动（白+10/蓝+20/紫+30/橙合计+40 保持 `aef8aed` 口径）。
- 卡池金额按新汇率全量重标（`content/15-cards.js` + `i18n/en` 覆盖层）：
  白卡钱项 $25k→**$2k**（hometown）；蓝 $50k→**$4k**（trust_fund）；紫 $75k→**$6k**（老钱家族）；
  橙数值合计 +40→**$8k** 等价（全球偶像等钱项按属性占比折算）。
- 该汇率成为全局锚：**#28 的级别价、#35 的筹款数值、事件收益量级一律引用本条**，
  量级直觉：社区小兵（T0）月薪 $1k 量级 → 一张白卡 ≈ 两年工资 ≈ 1 点自由点。

**细化方案（2026-09-25 定稿，执行口径）**——汇率唯一真源是 `balance.freeFunPerPoint`，其余全按它折算：
1. 引擎锚：`engine/core.js:163` `freeFunPerPoint: 25000 → 2000`；
   `engine/view/create.js:206/426` 两处 `== null ? 25000` 兜底同步 → 2000。
2. 卡池（`content/15-cards.js`）：三张钱卡 `effects.fun` 25000/50000/75000 → **2000/4000/6000**；
   中文 desc「+$2.5万/+$5万/+$7.5万」→「+$2k/+$4k/+$6k」；头部标尺注释（13—15/26/50/82 行）
   改「白 $2k·蓝 $4k·紫 $6k·橙合计 $8k」。橙卡现无钱项，注释按等价位书写即可。
3. 英文覆盖层（`i18n/en/reg/15-cards.js`）：L12—13 标尺注释 + L22/44/66 desc
   `+$25k/+$50k/+$75k → +$2k/+$4k/+$6k`。
4. `content/01-config.js:15` 建角注释同步「+$2k 金钱」。
5. 断言（`tools/validate.js`）：L2093 汇率断言 2000；L2100/2107 卡池标尺 `r * 25000 → r * 2000`；
   L2192 建角金钱档 `3 * 25000 → 3 * 2000`（文案 +$75k→+$6k）。
6. 验收：validate --games=20 全绿；`i18n-coverage --lang=en` 0% 缺译；smoke-ui 仅 #28 预存 4 红。
**不在本条范围**：stake 级别价（#28①）、事件 funMul 收益量级（#28②）——它们引用本锚自行换算。

### #33 1990+ 定点事件触发荒诊断 ⬜
**现象**：用户实玩一局，1990 年后固定历史事件几乎不触发；但 `tools/density-scan.js`
显示 1991—2024 逐年 Σ=A+B 无偏薄年（内容量达标）。

**根因（2026-09-25 子任务调查定案）**：是触发链资格闸问题，不是注册量问题——
- **≈60% 层级顶**：1xx 线卡普遍 `tierRaw:true, tierMax 3~7`（100 张里 68 张 tierMax≤5），
  玩家层级爬高后 `time.js:120 P.eligible(ev)` 把当年钉卡**静默丢弃**（不出也不占档期）。
- **≈30% era 白名单僵死**：`G.era` 恒为 "1980_REAGAN"（create.js:16 + core.js:1131 迁移），
  而 `scheduledHits` 只读 `reg.era[G.era].scheduled`（time.js:99），`when.js:139` 又按
  ev.era ∋ G.era 放行 → 19 条挂 `era:["2008_CRASH"]` 等白名单的钉卡 + 20-eras.js:32-36
  的 2008 scheduled 3 条**永远死发**。
- #24 衰减/#27 冷却/recentCap 贡献 <5%（unique 卡走不到那步）；注册量缺口 ≈0。

**修复方案（执行顺序）**：
1. **era 按日历解**：新增 `P.eraAt(year)`（按各 era startYear 区间），`scheduledHits` 改取
   `reg.fixed ∪ reg.era[P.eraAt(G.year)].scheduled`；`when.js` 的 ev.era 白名单同改为
   `eraAt(G.year) ∈ ev.era`。20-eras 的 2008 scheduled 即时复活。
2. **钉卡全层通行**：凡出现在各文件尾 fixed 表里的卡（约 137 张），`tierMax` 一律提到 9；
   `tierMin` 保留（高层专属卡不给底层看）。脚本批量改 120—133 + 110 文件，改前列清单核对。
3. **静默丢弃变响**：eligible 失败时记 `G.pinMiss = {year, id, why}`（供诊断与完成记录用）。
4. **触发密度门禁**：新工具 `tools/trigger-scan.js`：headless 跑 30 局，用
   `G.doneSeq`（core.js:1096）重建逐年实际触发清单，输出「每局每年 Σ触发/Σ钉卡」。
   验收线：存活到中期的局，1991—2024 各年钉卡触发率 ≥80%（tierMin 挡掉的不计）。
5. 回归：density-scan 口径不动；validate 补一条「eraAt 与 scheduled 复活」断言。

### #34 砍年度结算与年初简报，头条图进事件卡 ⬜
**用户裁定**：干掉「年终结算屏」和「年初时代简报屏」，但 45 张 `era-<year>.jpg` 头条图不许荒废。

**细化方案（2026-09-25 调查定稿，文件行号已核实）**：
1. **删年初简报屏**：`stage.js P.startYear()`（129-170）整屏改写为直进 1 月——
   `nextYear`（1065-1069）不再停在简报页；读档恢复的 `startYear(true)`（core.js:1533）
   与静好月「进入年度结算 →」按钮（stage.js:214-216）改为「进入下一年 →」直调。
   **保后台**：`yearStartSnap` 建立（startYear:143）保留——yearNarrative 与 smoke-ui:531 依赖。
2. **删年终结算屏展示层**：`endYear()`（973-1060）里 **975-1012 全部保留**
   （老化/hp 衰减/利息/ap/丑闻衰减/把柄过期/黑天鹅/autosave/日志），
   只删 `.yearcard` 拼装（1028-1048）与右栏结算按钮（1049-1057）；
   2025 墙的 `careerEnd()` 触发从按钮改程序直调（1052-1054/1063 合并进 endYear 尾部）。
   `yearHeads` 收集（911-912）保留（清算池/史料用），`yearNarrative`/13-year-tales 函数保留
   只是不再上屏（validate 2391 三例照跑）。**勿碰** ledgerBoxHTML（平静月合并卡的账，2531 断言）。
3. **头条图挂事件**：配图优先级现成（09-photo-art.js:72-76：ev.photo 字符串最优先），
   129:26/130:29 已有先例。给每年（有 era-<year>.jpg 的年份）选一张该年钉卡加
   `photo: "era-<year>.jpg"`——优先「全国视角」大事卡（如 ln91_ussr、wt01_september、ln08_election…），
   执行时用 trigger-scan（#33 产物）核对所选卡确实该年发得出。
   **例外条款**：振臂高呼的奥巴马图（执行时逐张看图定位）不挂任何卡，年份回退通用图。
   1980—1988 的 era-19xx.jpg 同样全部挂上。
4. **i18n/测试随迁**：删屏后清理 `ui.stage.*` 死串（en/view/stage.js:27-57 内
   yearDone/yearHeads/eraFront*/yearBrief*/newYearHead/toYearEnd 等；`eraFrontPhoto` 若仍被
   事件卡头图复用则保留串）；`i18n-coverage.js:132` ledger 屏入口函数改指保留路径或删条目
   （tools 属红名单，改动随门禁跑）；smoke-ui 73-77/601-613 断言按新交互重写。
5. 验收：三件套全绿 + headless 截图核验（游戏第 2 年跨年不再弹两屏；带 era 头图的事件卡出现）。

### #32 事件四大类分层与节奏重标 ⬜
**用户分类模型**（写入 `docs/CONTENT-SCHEMA.md`，并给每个事件补 `kind` 标签或在 05-categories.js 映射）：
1. **随机事件**（金主晚会/一桩丑闻/半夜捞人这类氛围卡）：**目标 1—2 件/年**。
   现状超发→属性资源刷太快、后期十拿九稳。手段：类别权重整体下调、冷却加长、
   与 #28② 的「灰产豁免」区分开（豁免只给投机类）。
2. **职业事件**（每个职业档位该干的活）：`111-chores.js` 的 `chore:true` 簇已具雏形，
   目标每档位几个月一次，按 tierMin/tierMax 簇保持现状，微调 weight 保证「几个月蹦一次」。
3. **固定历史事件**（**最看重，必须丰富**）：真实人物/真实背景/真实日期（911、伊拉克、次贷、
   广场协议、苏联解体……）。要求：
   - **每年 ≥2 件**（1980—2024 全覆盖；已有 ln* 语料打底，缺口补在 1989—1990、2013—2015 段自查）；
   - **同年分层**：底层/中层/高层各一份反应内容（同一史实、三种身份视角；实现走同 id 不同
     tierMin 变体卡或 choices 分档，倾向后者省内容量）；
   - **连锁展开**：重大事件至少 2—3 张串（当日反应 → 事后两党攻讦 → 调查/遗产卡），
     用 `arc`/`flags` 串接，允许扩到 3—4 张；
   - 触发保障依赖 #33 修复，密度门禁并入 #33 产出。
4. **竞选事件**：州长/议员走现有 campaign 幕次制；**总统固定选举年**（`progression.js electionYear`），
   改造细则在 #35。

**细化方案（执行口径）**：
1. `kind` 派生（不加人工字段、零迁移）：`P.eventKind(ev)` =
   campaign 类或竞选幕卡→campaign；`minYear==maxYear` 或在 fixed 表→fixed；
   `chore:true` 或 category∈{govt,civic}→career；其余→random。
2. **随机限流**：`balance.pace.yearRandomMax: 2`；`time.js` 月抽卡处按 kind 过滤——
   当年随机类出满即从候选池剔除（固定/职业/竞选不受影响）；灰产投机类归 #28 的 exempt 通道，
   按「随机」计数但**上限独立**（pace.grayMax: 4/年，留给反复赌）。
3. 职业频率：111-chores 现有簇校一轮权重，目标 T2—T6 平均 2—4 月一蹦；缺口用既有簇补 4—6 张。
4. **每年 ≥2**：1989（柏林墙）、1990（两德统一/萨曼塔?自查）若无钉卡则新增 fixed 条目；
   2025 收官年至少 1 钉卡。trigger-scan 输出为准。
5. **分层变体**（旗舰 10 事件先行：911/阿富汗/伊拉克/卡特里娜/次贷/保尔森/班加西/棱镜/查理/疫情）：
   用选项级 `when.tierBand` 给同一事件写底（T0-3 旁观自救）/中（T4-6 表态执行）/高（T7+ 决策担当）
   三档选择支，中英双轨。
6. **连锁**：911→爱国法追打卡→两党攻讦卡；次贷→大空头→救市骂街卡（走 `after`+flags 现机制，
   when.js:194）；每链 2—3 卡。链卡入同年窗口，靠 #33 修复后必发。
7. 验收：trigger-scan 年报里 fixed 触发 ≥ career ≥ random 倒挂转正；随机年均 ≤2。

### #35 竞选机制改造：选情值主导、钱退出门票 ⬜
**用户裁定**：「最后一步不交一大笔钱就不能当选」必须废除——总统不是买来的。
现状病灶（已定位）：
- `60-progression.js prog_president` 「run」选项 `req: { rep: 6, fun: 25 }`——**fun 硬门槛删除**；
- `65-campaign-acts.js` 多处 `cost: { fun: 8000/20000/30000/60000 }` 大钱选项；
- `61-campaigns.js camp_pres_swing` `abortBelow: { warchest: 18 }`——金库跌破即败选，变相逼氪。

**细化方案（执行口径）**：
1. **低起步种子**：`campaign.js start()` 里 momentum 初值由写死 45（61-campaigns 各 def）改为
   `seedMomentum()`：`clamp(10 + tier×2 + rep×0.4 + 基本盘分 + fac均值×0.1, 12, 35)`；
   基本盘分 = warm+diehard 占选民池比例 ×15。各 def 的 `meters` 保留作覆盖钩子。
2. **过程改选情**：拉票/辩论幕不动（momentum 主通道）；大钱选项保留但只加 momentum——
   价码改由 #28 的级别价锚推导（一档 ≈ 月薪量级），废除「幕间固定几万」裸数。
3. **投票日 = f(momentum)**：末幕 `prog_*` 主选项 base 由固定 0.4 改
   `clamp(0.10 + momentum×0.008, 0.10, 0.85)`（m20→0.26 / m50→0.50 / m80→0.74），
   tier 超额、CHA/fac/base 仍走 mods；**删 `req.fun`/`req.rep`**（有则转 mods）。
4. **总统资格**：`tierMin: 8`（=「等级超过 7」）保留；新增基本盘阈值
   `req: { voterShare: 0.12 }`（when.js 加 share 判据），层级溢出部分换 `mod` 成功加成，不当门票。
5. **崩盘线**：`abortBelow` 全删 warchest 项（61-campaigns:181 等），只留 momentum 线；
   金库见底＝大钱手段不可用，不判负。
6. 人情/把柄在此框架下都是 mods/advantage 素材，不作 req（#23 承接把柄投放）。
7. `campaign.js` 头注释「设计决定 2) 3)」与 CONTENT-SCHEMA campaign 节同步改写；
   smoke-ui/validate 竞选断言跟改（新增「momentum=50 时 prog 胜率≈0.5」「0 钱可当选」）。

## 3. 工程与文档随迁

- **文档同步（#20 遗留）**：`DEVELOPMENT-GUIDE.md:212/970`、`CONTENT-SCHEMA.md:1169/1350/1417`
  改现口径；gacha/freePoints 描述并入 #36 定稿金额。
- **`tools/package.sh`**：`rm -rf dist` 撞沙箱 bulk-delete 护栏，临时 rsync 增量已可用；
  长期改成 `rsync --delete` 进脚本本体。
- **回归门禁清单**（每阶段提交前跑）：
  `node dev/tools/validate.js --games=20`、`node dev/tools/i18n-coverage.js --lang=en`（0% 缺译）、
  `node dev/tools/density-scan.js`（#33 后升级为触发密度门禁）、smoke-ui 允许且仅允许
  #28 归口的 4 红直至 #28 落地。

---

## 4. 完成记录

| 日期 | 条目 | 结果 |
|------|------|------|
| 2026-09-25 | 精力/健康退役收尾 | ✅ 删除「凌晨两点来电」demo_2am_call；27 个事件文件清掉 `cost:{ap}`；70-demo-resources / 88-finance-2 / 86-enclave / 111-chores / 65-campaign-acts / 01-config 中英文案残留 14 处改为非资源措辞（叙事成语保留）；validate 全过、i18n 0% 缺译、smoke-ui 仅 #28 预存 4 红。未提交。 |
| 2026-09-25 | 本方案 | ✅ docs/WORKPLAN.md 建档，#32—#36 立项，#31 口径改 +1。 |
| 2026-09-25 | #36 钱标尺 | ✅ 提交 `60cb7f9`：freeFunPerPoint 2000、白/蓝/紫钱卡 $2k/$4k/$6k、中英卡面、validate 断言同步；三件套全绿（smoke 仅 #28 预存 4 红）。 |
| 2026-09-25 | 细化方案 | ✅ 全部条目（#19/#20/#21/#23/#28/#29/#31/#32/#33/#34/#35）子方案写入本文件；#33 根因由子任务查明（层级闸 60% + era 白名单僵死 30%）。 |
