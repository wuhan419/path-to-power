# 并行内容作业规范（PARALLEL-CONTENT-WORK）

> 目的：让 N 个 worker（人或代理线程）**同时**改这个仓库而互不踩踏、互不等待、
> 合并时零手工和解。本文件是 worker 的唯一作业说明书——开工前完整读一遍，
>  disagreements 一律以本文为准；本文与 `docs/CONTENT-SCHEMA.md` 冲突时，
> 事件卡的**结构/字段**看 CONTENT-SCHEMA，**分工/门禁/提交**看本文。

配套文档：
- `docs/CONTENT-SCHEMA.md` —— 事件卡字段、三值性、动态经济、brief 篇幅上限（§11.7）
- `docs/I18N.md` —— 中英双语契约（`P.t` + `l10n` 覆盖层）
- `CONTRIBUTING.md` —— 通用约定

---

## 0. 为什么现在可以并发（三个坑已经填掉）

| 曾经的瓶颈 | 症状 | 现状 |
|---|---|---|
| `dev/index.html` 的 `<script>` 清单 | 每加一个内容文件都要改它 → 必冲突 | `tools/gen-manifest.js` 托管两段区域（`content-auto-manifest` / `i18n-manifest`），worker **不手写** `<script>` |
| `POTUS.define("worldline", …)` 浅合并 | 第二个文件把第一个文件的 `pressure` 整表顶掉 | `core.js` 已改成**按字段深合并**（`pressure/brief/outlets/blackswan` 逐年份叠加） |
| 全量校验慢（20～300 局生涯模拟） | 每个 worker 每轮等几分钟 | `--games=1` 快线（≈60s，只跑结构断言，统计断言在 `STAT_MIN=8` 下自动跳过并打印提示） |

---

## 1. 硬规则：文件所有权

### 1.1 红名单（worker **绝对不许**改；合并方独占）

```
dev/engine/**                 # 引擎全部
dev/index.html                # 只能由 gen-manifest 重写托管区
dev/content/01-config.js      # 全局配置/平衡
dev/content/05-categories.js  # 类别表
dev/content/20-eras.js        # era 兼容层
dev/content/21-worldline.js   # 全局世界线基线（1980—1990）
dev/content/10-characters.js  # 人物表（人脉/姓名唯一权威源）
dev/content/12-states.js      # 州表
dev/content/14-offices.js      # 职位轨道表
dev/content/40-endings.js     # 结局规则
dev/tools/**                  # 门禁脚本
docs/**                       # 规范本身
```

需要动红名单里的任何东西 → **停下来上报**，不要改。尤其：
> 想加新人物/新州/新职位：先用现有的（`P.reg.contacts` 里挑角色相近的），
> 或在卡片里用**泛称**（「一位州党部主管」）。人物表是跨卡复用的资产，
> 并行往里塞名字必然重名、必然冲突。

**唯一例外（Track A 本地化）**：`dev/engine/view/*.js` 与 `engine/*.js` 允许被
**§5.1 指派到该文件的唯一一个 worker** 修改，且**只允许**把中文字符串换成
`P.t("ui.{file}.{key}", "中文原文", params)` 取用——不许改逻辑、不许重构、不许动函数签名。
该 worker 的合并门禁因此上调为 `--games=20` 全量（见 §7）。红名单里的 `content/` 各项
（01-config / 20-eras / 21-worldline / 10-characters / 14-offices / 40-endings…）**没有任何例外**。

### 1.2 绿名单（worker 一人一份，互不重叠）

- Track B：**一条年代带一个文件**，见 §4 分配表。
- Track A：**一个引擎视图文件**或**一个英文覆盖分片**，见 §5。

### 1.3 世界线数据写在**自己的**卡片文件里

不再需要改 `21-worldline.js`。每个年代带文件末尾自带：

```js
POTUS.define("worldline", {
  pressure: { "1995": 3, "1996": 3, /* …本带年份 */ },
  brief:    { "1995": "……", /* 年初播报，一句话世界大势 */ },
  outlets:  { "1995": ["有线电视新闻网", "今日美国", /* 4—6 家，当年真实存在的媒体 */] }
});

POTUS.define("fixed", [
  { event: "ln95_okc", year: 1995, month: 4, grade: "major" }
]);
```

`core.js` 按字段合并，两个文件写不同年份互不影响；**同一带文件**内的年份只能由该带 owner 写。

---

## 2. 编号段与 id 前缀（防重号）

### 2.1 文件编号段

| 段 | 归属 | 说明 |
|---|---|---|
| `events/105—111` | 存量，冻结 | 1980s/1990s/2001/2016 时代卡、事件串、家务卡 |
| `events/120—129` | **Track B 新串**（1991—2024 定点大事） | 4 年一带，见 §4 |
| `events/130—149` | Track B 预留第二轮 | 补密度/补漏 |
| `events/150—179` | 空闲 | 未来主题包（不并发） |
| `events/5x, 6x, 8x, 9x` | 存量，冻结 | 机制类/补充类 |
| `content/i18n/en/lines/` | **Track A 英文覆盖**（Track B 新卡） | 与卡片同名：一分片对一卡片文件 |
| `content/i18n/en/events/` | **Track A 英文覆盖**（存量卡） | 与存量源文件同名 |
| `content/i18n/en/view/` | **Track A** 引擎 UI 串 | 一视图文件对一分片（`content/i18n/en/ui.js` 是总入口样板） |

### 2.2 事件 id 前缀

新卡一律 `ln{YY}_{slug}`（**ln** = line，`YY` = 锚定年份后两位）：

```
ln91_ussr      1991 年苏联解体
ln95_okc       1995 年俄克拉荷马城爆炸
ln05katrina    → 写作 ln05_katrina（2005 年卡特里娜）
```

年份带互斥 ⇒ 前缀天然不撞。禁止使用 `rg / gulf / wt / soc / sca / boon / prog / chore / enc / camp` 这些已有前缀。
choice id 在**同一事件内**唯一即可，建议 `{动词}_{名词}`（`back_bill` / `attack_leader`），不要用 `a/b/c`。

> 存量卡里已有 `2008_crash_offer` 这种**年份前缀**写法，是历史遗留，不作为新卡范例。

---

## 3. Worktree 工作流（我串行合并）

主库固定在 `D:\workspace\path2power`（分支 `main`），worker 库放 `D:\workspace\ptp-w\w{NN}`
（D 盘 1.5T 可用；C 盘只剩 14G，**不要**在 C 盘建 worktree）。

```bash
# 合并方开一个 worker 库
cd /d/workspace/path2power
git worktree add -b content/w01-1991-94 /d/workspace/ptp-w/w01 main

# worker 干活（在自己的库里）
cd /d/workspace/ptp-w/w01
node dev/tools/gen-manifest.js            # 注册你的新文件（只动托管区）
node dev/tools/validate.js --games=1 --lang=zh   # 快线
node dev/tools/text-audit.js --file=120-line-1991-94
node dev/tools/choice-audit.js --json     # 只认你新增的 id
git commit -am "content(w01): 1991—1994 定点大事 6 张 + 世界线按年条目"
git push origin content/w01-1991-94       # 或：告知合并方分支名，由本地合并

# 合并方（串行，一次一个分支）
cd /d/workspace/path2power
git merge --no-ff content/w01-1991-94
node dev/tools/gen-manifest.js            # 重新生成清单（吞掉 index.html 冲突）
git add dev/index.html && git commit --no-edit  # 若产生新提交
node dev/tools/validate.js --games=20 --lang=zh
node dev/tools/validate.js --games=1 --lang=en
```

约定：
1. **每轮 rebase 自由，push 到 main 由合并方做**。worker 不对 `main` 直接 push。
2. `dev/index.html` 冲突**一律不和解**：合并方重跑 `gen-manifest.js` 覆盖托管区。
3. 一个 worker 一个分支，只碰自己 §4/§5 名下文件。分支名 `content/w{NN}-{band}`。
4. 提交信息前缀：`content(wNN): …` / `i18n(wNN): …`。

---

## 4. Track B：1991—2024 定点大事分配表

### 4.1 密度基准（照抄 1980—1990 的真实节奏）

口径要按**整个注册表**量，不能只数某一个分片，否则会把年代池卡和钉年卡漏掉。
度量把「年度大事」拆成两类，逐年取并集：

- **A 到点必发**：`POTUS.reg.fixed` 里 `minYear<=y<=maxYear` 的条目 + 各时代 `scheduled[]`
- **B 钉年卡**：`minYear === maxYear === y` 的事件卡（A、B 会重叠，重叠只计一次）
- C 年代池（`minYear<=y<=maxYear` 的可抽卡）只作背景，不算年度大事

1980—1988 实测：**A 2.00 + B 1.56 = 3.56 个/年**（21 个定点 ÷ 9 年是早先只看
`21-worldline.js` + `110-line-1980s.js` 两个分片的口径，偏低，别再用）。
⇒ 1991—2024 的目标是**逐年 Σ=A+B 不低于 3.56**，而不是某个总数。

**2026-09-24 达标实测**：1991—2024 平均 **6.47 个/年**（A 3.62 + B 2.85），
逐年 Σ 最低 4，**无偏薄年份**。每轮补薄后要重逐年表复核，别拿均值充数。

`grade` 用法：`major` = 改变国家情绪/权力格局的年份级事件；`mid` = 显著但仍可绕开；
`minor` = 地方性或风味锚点（每带最多 1 个，别把串灌满）。

### 4.2 波段分配（每带 = 一个 worker = 一个文件）

**卡数下限 8，上限 10**（同一历史年里可合并同主题的两件事）。
**每张存量卡只允许一个年带钉它**，按事件年份归属；跨带重复 `fixed` 会导致同一事件一局演两次。
存量卡归属：`gulf91/92/93_*`→B1；`soc16_election`/`soc17_fakenews`/`soc18_data`→B7；
`soc20_mailin`→B8；`wt01_september`/`wt02_patriot`/`wt02_alert`→B3；`wt03_wmd`→B4；
`2008_*`/`2008_tea_party`→B5；`wave_occupy_low`/`wave_detroit_high`→B6，`wave_tea_rally`→B5。

| w | 年份带 | 文件 | 卡数 | 该带**必须覆盖**的大事（不得漏） |
|---|---|---|---|---|
| B1 | 1991—1994 | `events/120-line-1991-94.js` | 8 | 海湾地面战与停战、苏联解体、洛杉矶暴动、摩加迪沙黑鹰、克林顿当选、世贸中心爆炸、韦科惨案、中期选举「共和党革命」、北岭地震、辛普森案 |
| B2 | 1995—1998 | `events/121-line-1995-98.js` | 8 | 俄克拉荷马城爆炸、福利改革、网络商业化/网景上市、TWA800 与百年公园爆炸、克林顿连任、驻肯/坦使馆爆炸、拉链门与弹劾、《美国电话法》/互联网免税 |
| B3 | 1999—2002 | `events/122-line-1999-02.js` | 8 | 科伦拜恩、北约轰炸与误炸中国使馆、西雅图反 WTO、2000 计票僵局、科勒号、9/11（存量 `wt01_september` **只做 pin**）、炭疽邮件、安然崩塌、爱国者法（存量 `wt02_patriot` pin）、2002 中期选举 |
| B4 | 2003—2006 | `events/123-line-2003-06.js` | 8 | 伊拉克开战、无 WMD 结论、加州罢免、东北大停电、阿布格莱布、萨达姆被捕、2004 大选、卡特里娜（**该带最高优先级**）、2006 中期选举民主党翻盘 |
| B5 | 2007—2010 | `events/124-line-2007-10.js` | 8 | 弗吉尼亚理工、次贷裂缝、雷曼与 TARP（存量 `2008_*` **只 pin 不重写**）、2008 大选（存量若无则补）、刺激方案与 AIG 奖金、H1N1、胡德堡、维基解密、墨西哥湾漏油、2010 茶党浪潮（`wave_tea_rally` pin） |
| B6 | 2011—2014 | `events/125-line-2011-14.js` | 9 | 图森枪击案、本·拉丹被击毙、债务上限与评级下调、占领华尔街（`wave_occupy_low` pin）、桑迪·胡克、班加西、飓风桑迪、2012 大选、波士顿爆炸、斯诺登、政府停摆、弗格森 |
| B7 | 2015—2018 | `events/126-line-2015-18.js` | 9 | 同婚合法化、查尔斯顿教堂枪击、圣贝纳迪诺、2016 大选（`soc16_election` **只 pin**）、奥兰多、弗林特水危机、科米被解职、夏洛茨维尔、哈维/玛丽亚飓风季、拉斯维加斯枪击、帕克兰与拥枪游行、2018 中期选举 |
| B8 | 2019—2021 | `events/127-line-2019-21.js` | 9 | 第一次弹劾、埃尔帕索/代顿、新冠疫情（**该带最高优先级**）、弗洛伊德与夏天、2020 大选（`soc20_mailin` pin，不足则补卡）、国会山、阿富汗撤军、亚特兰大枪击、供应链与通胀起 |
| B9 | 2022—2024 | `events/128-line-2022-24.js` | 8 | 多布斯推翻罗伊、CPI 峰值、罗伯小学枪击、2022 中期选举、硅谷银行与存款搬家、债务上限边缘、毛伊野火、10·7 与校园对立、特朗普遇刺未遂、2024 大选 |

**开工前必做**（避免重复造卡）：

```bash
grep -rnE '^\s*"?id"?\s*:\s*"[a-z0-9_]+"' dev/content/events/ | grep -iE 'gulf|2008|wt0|soc|wave_' | head -50
grep -rn 'year: 19' dev/content/21-worldline.js dev/content/events/110-line-1980s.js   # 已钉死的锚点长这样
```
> 存量已覆盖的年份（1990—1993 海湾、2001—2003、2008、2016、2020 部分）**优先复用**：
> 往 `fixed` 追加 `{ event: "已存在的id", year, month, grade }` 即完成一个锚点，
> 不必重写卡。你的**新卡**数量按上表「卡数」列计（约 65）。

### 4.3 每张卡的硬性内容要求

1. `minYear/maxYear` + `scoped`（新卡**不写 `era`**）；`grade/category/valence/dyn:true` 必填。
2. `brief` 五段齐（`lede/known/rumor/unknown/terms`），篇幅守 CONTENT-SCHEMA §11.7。
3. ≥2 个选项，**必有一个「保底」**（§6）。
4. 五个结局层 `crit/ok/meh/fail/critfail` 全写，不允许只写 `ok/fail`。
5. 经济数值写**系数**（`dyn:true` + `scale.js` 口径），不写死绝对金额。
6. 引号只用 `「」`；正文不出现真实总统/候选人**姓名**以外的真人姓名（可用史实职务称谓）。
7. 每张卡至少 1 个 `after` 或 `flags` 钩子可选，但**不许**依赖他人卡片里的 flag（跨带引用会造成隐式耦合）。

### 4.4 世界线按年条目要求

每个年代带文件必须为本带**每一年**补齐：
- `pressure`：0—6，参照真实动荡度（大选年 ≥3；战争/危机峰值年 5—6）。
- `brief`：一句话，写「这一年的全国情绪」，不要罗列事件清单。
- `outlets`：4—6 家当年**确实存在**的媒体（注意创刊/停刊年份：《今日美国》1982 起，
  彭博电视 1994，Drudge 1995，Salon 1995，HuffPost 2005，BuzzFeed 2006，Vox 2014，
  Substack 2017 等）。用中文词条（与存量一致），英文由 `l10n` 覆盖层负责。

---

## 5. Track A：本地化分片分配

细节契约看 `docs/I18N.md`；这里只分地。

### 5.1 引擎 UI 串提取（`P.t`）

一个 worker 一个文件，改完在 `content/i18n/en/view/{file}.js` 写英文：

| 优先级 | 文件 | 待提取串（约） |
|---|---|---|
| ✅已完成 | `view/title.js`、`view/leftbar.js` | — |
| A1 | `view/stage.js` | 123 |
| A2 | `core.js` | 70 |
| A3 | `view/topbar.js` | 51 |
| A4 | `view/create.js` | 34 |
| A5 | `view/actions.js` | ~30 |
| A6 | `view/vignette.js` | ~25 |
| A7 | `engine/events.js` | ~25 |
| A8 | `engine/dice.js`、`engine/time.js` | ~20 |
| A9 | 其余（`news.js`/`save.js`/`shell.js`…） | ~30 |

规则：
- `P.t("ui.{file}.{key}", "中文原文", params)` —— **中文原文就是兜底**，不建 zh 字典。
- 带标点/模板的整句放进一个 key，不要在英文里拼接中文标点。
- 只改字符串取用，**不许**顺手重构逻辑。

### 5.2 存量卡英文覆盖

`content/i18n/en/events/{源文件名}.js`，一文件一分片，一个 worker 认领 1—2 个源文件。
**存量已清零**：276 张事件卡 + 24 类注册表的英文缺译叶子实测 0（`i18n-events.js` 全表绿），
所以这一节现在只对**新卡**生效——新卡必须自带英文分片，否则 §6.3 的缺译门禁直接拒收。

新卡（Track B）由**同一个 worker 顺手写双语**：卡片写中文，英文放
`content/i18n/en/lines/{同名}.js`。缺英文分片会被 §6.3 的缺译门禁直接拒收，没有待补队列了。

**英文标题一律 sentence case**（只首词与专有名词大写），别写 Title Case——
数得出来：`node dev/tools/text-audit.js --lang=en --tcase`。细则与例外见 [`I18N.md`](I18N.md) §4。

### 5.3 句子模板类内容（已做完，留下口径）

`30-fillers.js`（`bodyTpl` = 动词短语 + 名词主题拼装）与 `13-year-tales.js`（州名插在句中）
是**句式骨架**，直译会碎，当初挂起。现已按「英文整句模板重设计」做完，
做法见 [`I18N.md`](I18N.md) §4；改这两类时必须同时改英文侧模板形状，不能沿用中文槽位顺序。

---

## 6. 选项平衡硬门禁（本次新增，最高优先级）

> 用户要求：「平衡各选项支出和收益和概率，保底留一个保守选项无需任何支出。」

### 6.1 保底选项（每张卡**至少一个**）

- **无 `cost`、无 `req`**（不花钱、不要求属性/派系/flag 门槛），任何状态下都能点。
- 取向 = 高地板、低天花板：`ok` 收益**中等且为正**，`crit` 天花板**明显低于**同卡冒险项，
  `fail` 只掉一点点（幅度 ≤ 冒险项 `fail` 的一半）。
- 保底不是「无收益」：它给稳定小额（如 `rep:+0.2`）＋不埋雷（`flags` 里不写负面 tag）。
- 保底必须在语义上是「保守/不沾染/只做事」的选择，不能是「冒险但数值很稳」。

### 6.2 冒险项的三角约束（支出 ↔ 收益 ↔ 概率）

| 维度 | 规则 |
|---|---|
| 支出 | 花钱/花人情/花信誉的选项，`crit` 天花板必须显著高于不花钱的选项 |
| 概率 | `base`（或 `dyn` 折算后的把握）随风险上升而**下降**：越贵的赌注把握越低 |
| 收益 | 至少铺 **2 根资源轴**（`rep` / `fac`·人脉 / `money` / `voters` / `attr`），别全压 `rep` |
| 错位 | 同卡各选项应代表**不同取向**（原则/交易/回避/豪赌），不是同一取向的三档金额 |

量化底线（`tools/choice-audit.js` 判据留 2 倍余量）：
- **base spread ≥ 0.10**（工具 `FLAT_BASE = 0.06`，低于它判「过平」）
- 任意两选项之间**不得**出现「每轴都不差 + 至少一轴更高 + 把握不更低 + 风险不更高」→ 判「占优」
- 正收益不得全挤同一根轴且「钱多者把握不更低」→ 判「同轴单调」
- 每张多选项卡**至少一个**选项有真实下行（`worst < -1.5`）或明显 jackpot（`crit` 净收益 > `ok` + 0.5）

### 6.3 提交前自检（五绿才算完成）

```bash
node dev/tools/validate.js --games=1 --lang=zh   # 结构/死局/三值性
node dev/tools/text-audit.js --file=120-line-1991-94   # 篇幅与引号（--file 只匹配文件名片段）
node dev/tools/choice-audit.js --json            # flagged 里不得出现你的新 id
node dev/tools/i18n-events.js --only=event       # 缺译：新卡必须自带英文覆盖层
node dev/tools/text-audit.js --lang=en --tcase   # 英文标题体例：你写的标题不得是 Title Case
```

`choice-audit` 的基线（合并方核对用）：**多选项事件 296 ｜ 占优 0 ｜ 过平 0 ｜ 同轴 3**。
存量 3 个同轴事件是**反面教材，不是模板**：`sca2_coverup_after`、`rg81_patco`、`boon2016_goviral`。
> 合并方规则：合并后 `flagged` 集合必须是基线集合的**超集不变**（即只允许 3 → 3）。
> 新增一个 id 出现在 flagged 里 ⇒ 退回 worker 重塑取舍，不得合并。

> **别为「每年档期 ≤12」挪史实**。`validate` 尾部的这条上限是统计均值，单条生涯噪声极大
> （同一份内容 `--games=1` 能跑出 8.7 也能跑出 12.1），所以它在 `STAT_MIN=8` 下和结局数、
> 投注数一样自动跳过，只在合并方的 `--games=20` 这一侧硬判。快通道若因它报警，
> 那是快线该跳过的项，不是你的卡排错了月份——**不要**为了凑绿把事件挪到别的月份。

> **本地化走同一条规矩**：新卡没有英文覆盖层，就等于给 `i18n-events` 的缺译榜添一条；
> 合并门禁的基线现在是**硬零**（276 张卡已全部英文化），任何一条缺译都直接退回。写中文卡的同时把
> `content/i18n/en/**` 对应那一份一起写完，别留给"以后统一补"。
> 同理，`text-audit --lang=en --tcase` 的合并基线也是**硬零**：英文标题从第一个字就写 sentence case，
> 别指望合并方替你洗。
> 两个坑：① `text-audit.js --file=` 只映射 `content/events/` 的中文源，**对英文分片是空转**，
> 英文侧篇幅要用一次性 boot(en) 脚本读实卡自测、交稿前删掉；② 覆盖层里 `known/rumor/unknown/terms`
> 这类纯字符串数组是**整体替换**，元素个数必须与中文严格一致，多一个少一个都会被 `validate` 判失败。

---

## 7. 并发规模（按本机实测）

本机：**i9-12900H，20 逻辑核，31.7GB 内存**；D 盘可用 1.5TB，C 盘仅剩 14GB。

单 worker 一轮校验 ≈ 60—90s 纯 CPU（`--games=1`），`choice-audit` 全树扫描 ≈ 40s，
每局内存占用 <300MB。门禁是 CPU 密集而非 IO 密集。

**实测口径（2026-09-23 第一波）**：门禁是**单线程** JS，14 个 worker 并发时每个校验轮次
拉长到约 2—3 倍，但没有正确性问题；瓶颈实际是**合并队列**而不是 CPU。

- **同时最多 14 个 worker**（Track B 9 个年带 + Track A 界面/覆盖 5 个），
  再往上 CPU 排队与我的串行合并会同时成为瓶颈。
- worker 只跑 `--games=1` 快线；`--games=20` 全量**只在合并方**跑，
  并且**每合并 3—4 个分支跑一次**（批次内任一分支炸了能定位到批次）。
- 动过 `dev/engine/**` 的分支（Track A）单独一批合并：批内不掺 Track B，
  这样全量校验失败时能立刻判定是引擎串提取还是内容数据的问题。

## 8. 交付物清单（worker 每次上报必须附）

```
分支：content/wNN-1991-94
文件：dev/content/events/120-line-1991-94.js（新，8 张卡）
      dev/content/i18n/en/lines/120-line-1991-94.js（新，英文覆盖 312 叶子）
锚点：fixed +8（major 3 / mid 5）
年份：pressure/brief/outlets 各 4 条
自检：validate zh 0 / validate en 0 / text-audit 0 / choice-audit 新 id flagged 0
遗留：ln94_simpson 的 rumor 段偏长（§11.7 超 8%），需裁；已标 TODO
```

任何一项缺失 ⇒ 视为未完成，不进入合并队列。
