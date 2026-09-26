# 方案 · #41 事件卡瘦身：砍掉背景卡，一张卡只剩「标题 + 内容 + 头条图」

**提出**：2026-09-26，用户裁定。
**分支**：`dev/reckoning-be`（v0.12 长支）。**前置**：#40（HEAD `abfa740`，main 已同步到 `d5da21c` 并 push）。

## 一、用户的四条裁定（本方案唯一依据）

1. **事件背景不要了，不再展示。**
2. **把背景和时间说明融合，压缩文字，尽量缩短展示内容 —— 250 个汉字以内。**
   一张事件只有：一个标题 + 一个内容 + 一张头条图片。
3. **顺手一起压事件栏高度**：删掉斜体导语行（standfirst）、压缩档案行的三枚 chip。
4. **`brief` 数据彻底删掉**（不留"只隐藏"的尾巴）：中文 360 张 + 英文覆盖层同步清空。
   注：`era` / `worldline` / `vignettes` / `campaigns` 各自的 `brief`/`lede` 是**另一套东西**
   （年度简报数据，#34 已下线展示），不在本单范围内。

## 二、为什么要砍（口径，不是执行细节）

背景卡是为"别把玩家丢进他看不懂的局面"（DEVELOPMENT-GUIDE §5.2）造的，但它长成了**第二篇正文**：
实测均 172 字，是正文（均 90 字）的近两倍，且默认展开 —— 抽一张卡的阅读成本被它决定。
静态 HTML5 + itch 首发的场景下，第一屏的**节奏感**比**信息完整度**更值钱：
看得懂局面是底线，铺陈历史不是。所以砍掉展示层，把"决策必需的那点事实"折回正文，
剩下的（认知边界、传闻、名词）随数据一起删 —— 不留一份永远不再被读的稿子。

## 三、新的篇幅尺（替换 §11.7 的 brief 那一整段）

| 项 | 新尺 | 现值（360 张实测） |
|---|---|---|
| 标题 | 保持现状，≤28 字 | 均 15.9 |
| **标题 + 正文** | **≤250 字**（硬闸） | 现均 105.9，最长 212 —— 未融合前 0 张超 |
| 正文 | 不再单设 200 字上限，由上式统一管 | 均 90.1 |
| 背景 | **不存在** | 均 172（全部删除） |

英文侧同一把尺：`unit()` 折算（CJK 按字符，拉丁按词 ×0.5），所以中英预算天然对齐。

## 四、融合取舍（worker 的唯一写作规范）

按优先级取，装不下就丢后面的：

1. **决策必需的事实** —— 玩家不知道就判断不了选项的那个数字 / 人物 / 文件 / 时限（原 `known` 的精华，通常只有一条）。
2. **时代名词** —— 必须解释才能懂的名词（救市 / TARP / 初选 / 弹劾条款），用括号或同位语**一句话**带过，不另起段落（原 `terms`）。
3. **信息差钩子** —— 原 `unknown` 里最锋利的一句，压在正文**末尾**，保留"这里还有你不知道的东西"，**不许剧透**。
4. **传闻** —— 原 `rumor` 最多留一句，「有人说…」语气，不标注真假。
5. **丢弃** —— 历史科普、前因后果铺陈、多条 known 罗列、复述标题的句子。

**允许正文一字不改**：minor / 公务卡里背景纯属加料的那批，直接删 `brief` 就合规 —— 不要为了"融合"而注水。

**不许动**：任何结构键（`id / era / minYear / maxYear / tierMin / tierMax / grade / category / valence / dyn /
weight / unique / pace / chore / flags / tracks / parties / req / cost / effects / mods / outcomes`）、
`month` / `day`、以及**全部选项文本**（选项是判断入口；若压缩后选项里的名词失去出处，把那个名词的解释挪进正文，别改选项）。
只动 `title`（尽量不动）与 `body`，删掉整块 `brief`。

**视角纪律**：正文是"主角此刻发生了什么"，第二人称、现在时、短句；不许写成上帝视角历史总结（那正是原 `known` 的老毛病）。

## 五、里程碑

| | 内容 | 落点 |
|---|---|---|
| **M1** | 自检尺先行：`text-audit.js --trim` —— 逐卡 标题+正文 ≤250、按文件扫残留 `brief`/`lede` 键，任一红则退出码 1。并行 worker 靠它自查 | `dev/tools/text-audit.js` ✅ |
| **M2** | **360 张全量融合重写**：按 53 个中文内容文件切批，多路并行；每路同时改 `content/events/<X>.js` 与英文分片 `content/i18n/en/{events,lines}/<X>.js`，逐批改完自查 `--trim --file=<X>` | 内容侧 |
| **M3** | 引擎与版式：`stage.js` 删 `briefCollapsed/toggleBrief/briefHTML` 与 `.brief-slot` 挂载、删 standfirst 斜体行、压缩 `.dossier-head` chips；`events.js` 填充器不再合成 brief；`style.css` 清 `.brief-*`/`.standfirst` 并压卡高；`i18n/en/view/stage.js` 摘 5 个 brief UI 键 | 引擎侧 |
| **M4** | 门禁口径反转：`validate.js`（结构/覆盖率/briefHTML 断言 → **反向断言不存在** + 全库 ≤250 总闸）、`smoke-ui.js`（删 `#brief` DOM 段，改测新卡结构与日期行）、`i18n-coverage.js`（brief 屏摘除）、`text-audit.js`（§11.7 brief 段换成融合尺） | 门禁侧 |
| **M5** | 文档随迁：`CONTENT-SCHEMA`（§4 字段表删 brief 行、§4.7 整节改写、§11.7 重标）、`DEVELOPMENT-GUIDE`（§5.2 改写、卡片顺序、规模快照、里程碑行）、`DESIGN`、`README` | 文档侧 |
| **M6** | 八闸全绿（validate --games=20 / i18n-events / i18n-coverage / density-scan / trigger-scan / text-audit / smoke-ui / gen-manifest）→ `package.sh` 出 dist + itch zip → 完成记录回写本文件 | 发布侧 |

**不做**：不动 `SAVE_FORMAT`（brief 是静态注册表字段，不入档，`migrate()` 里没有它）；不碰 era/worldline/vignettes/campaigns 的 `brief`/`lede`；不改抽到的卡之外的任何版式（三栏、右栏选项、结算页原样）。
`localStorage` 的 `potus_brief_collapsed` 折叠状态键随渲染一起废弃（无害残留，不清）。

## 六、完成记录（2026-09-26 交付）

**结论：六个里程碑全部落地，八道门禁全绿，dist + itch zip 已重出。**
基线 = `dev/reckoning-be` @ `abfa740`。
**发布去向**：提交 `1381f0b`（含 dist 镜像共 242 文件 +4030 / −25166）→ 并入 main = 合并提交 `2cf2d7b`（**零冲突**，
且合并后 `package.sh --fast` 零差异，说明 dev 的 dist 镜像本就同步）→ 两个分支均 fast-forward push 到 origin。

### 1. 体量

| | 数字 |
|---|---|
| 改动 | **122 个文件，+1963 / −12652**（净删 10689 行） |
| 内容侧 | 109 文件 +1710 / −12294 ｜ 引擎 5 文件 +15 / −111 ｜ 门禁工具 4 文件 +130 / −138 ｜ 文档 4 篇 +108 / −110 |
| 覆盖 | 360 张中文卡 **+ 英文覆盖层 360 张**，逐张过尺，无一张漏网 |

### 2. 卡面瘦身效果（实测，`text-audit.js` 全库口径）

| 项 | #41 前 | #41 后 |
|---|---|---|
| 抽一张卡的阅读文字量 | ≈278 字（正文 90 + 背景卡 172 + 斜体导语） | **170.8 字**（标题 15.9 + 正文 154.9） |
| 卡面元素 | 报头 4 枚 chip + 标题 + 导语 + 图 + 正文 + 背景卡折叠区 | **报头 3 枚 chip + 标题 + 图 + 正文** |
| 英文侧 | —— | 卡均 53.5 单位，Title Case 0 |
| 超尺（>250）/ 缺正文 / 残留背景卡键 | —— | **0 / 0 / 0** |

### 3. 各里程碑落点

- **M1** `text-audit.js --trim --file=X`：并行 worker 的单文件自查口（超尺 + 残留两项，任一红退出码 1）。
- **M2** 全量融合：4 波共 9 路并行写完 53 个中文文件及其英文分片；结构键零churn（`text:/note:/req:` 等全库比对只读出 3 处命中，且全是正文里出现的英文单词 "note:"）。
- **M3** 引擎/版式：`stage.js` 摘 `briefHTML / toggleBrief / briefCollapsed / standfirstOf / medName`；`style.css` 清 `.brief*`、`.cchip.medium`、`.standfirst`（桌面 + `.oval` + 竖屏三处）；`events.js` 的 `generateFiller` 不再合成 `brief`；`i18n/en/view/stage.js` 摘 5 个 `ui.stage.brief*` 键。**`SAVE_FORMAT` 保持 13**（`brief` 是静态注册表字段，从不进 `G`，无需迁移），`potus_brief_collapsed` 就此废弃不清。
- **M4** 门禁反转：`validate.js` 逐卡**禁** `brief`/`standfirst` + 「标题+正文 ≤250」总闸 + 断言三个渲染口不存在；`smoke-ui.js` 换成新卡结构段（并断言 `.cchip.medium` 不再出现）；`i18n-coverage.js` 摘掉 brief 屏；`text-audit.js` 默认模式升格为真闸。
- **M5** 文档随迁：`CONTENT-SCHEMA`（字段表、§4.7 整节改写、§11 原则、§11.7 新尺与样板、§13 骨架、validate 说明）、`DEVELOPMENT-GUIDE`（§5 骨架、§5.2 整节改写、§6.2 契约、作者清单、§9 门禁行与 smoke 点击链、规模快照、卡片顺序、**新增 v0.12 #41 里程碑行**）、`I18N`（覆盖层示例、合并规则表、§5 长度预算 `CAP=250`、自检命令）、`PARALLEL-CONTENT-WORK`（§4.3 第 2 条 + **⚠️ 不许顺手删 `worldline.brief`/`era.brief`** 的边界警告）。`DESIGN`/`README` 复核后无需改（其 `brief` 字样全是 worldline 那套）。
- **M6** 八闸 + 发布物：见下。

### 4. 八道门禁（在最终树上重跑）

`validate.js --games=20` **=== 全部通过 ===**（含「残留背景卡 0/360 ｜ 带日期 136/360 ｜ 标题+正文 >250：0」）｜ `text-audit` 中/英 ✓ ｜ `i18n-events` 缺译率 ✓ ｜ `i18n-coverage --lang=en` 九屏 0% 中文 ｜ `density-scan` ✓ ｜ `trigger-scan` 1991—2024 钉卡触发率 100% PASS ｜ `smoke-ui` UI 冒烟全部通过 ｜ `gen-manifest --check` 26 内容文件 + 91 i18n 层一致。

`package.sh --fast` → `dist/` 306 个文件（`dist/docs/` 同步）、`path-to-power-v0.12.zip` 20M（index.html 在压缩包根）。

⚠️ 一个已知噪声：`--games=1` 快通道末尾两条**多局节奏**断言会因单局方差判红（均 11.0 件 / 开局第 2 年 3.0 件），与结构无关；验收口径是 `--games=20`。

### 5. 执行中新增的三条决定（对原方案的偏离，留档）

1. **`medium` 字段保留为触发门控，只删徽章**：`POTUS.mediumOK` 一行未动，1960 年仍抽不到短视频卡；压缩档案行不牺牲任何引擎行为。
2. **`text-audit.js` 默认模式从"报告"升格为"闸"**：超尺/缺正文/残留任一为红即退出码 1，这样"八闸全绿"里的 text-audit 是真断言而不是读数。
3. **顺手清了内容文件头注释里的旧契约**（50 个英文分片 + 6 个中文源，共 65+ 行）：那些「known/rumor/unknown 整体替换、条数与中文一致」的说明在 #41 之后是**错的**，会把下一个并行 worker 引回去补 `brief`。同时 `i18n.js` 的 `textKeys` 白名单摘掉全库零出现的 `known/rumor/unknown/terms`（`lede` 留下——幕/静好/弧仍在用）。

### 6. 未做 / 遗留

- **没做浏览器实测**：按既定纪律不导航到 dev 源（`SAVE_FORMAT 13` 的存档闸会毁掉正在试玩的那局）；卡面高度与折叠行为以 `smoke-ui` 的 jsdom 断言 + CSS 规则为验收。要看真效果，双击 `dist/index.html` 或 `localhost:8199` 起 dist。
- 本文件与 `docs/` 一起镜像进 `dist/docs/`，回写后需同步那份镜像。
- 上一阶段遗留的开放问题仍在：**#40 金档没有钱卡（$15k 空格），是否补第 5 张金卡**。

