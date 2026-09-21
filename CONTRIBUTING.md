# 参与贡献

> 本页是 POTUS 文档体系的一部分。项目总览与快速上手见仓库根 [`README.md`](README.md)。

感谢你想为 **POTUS · 美国政治生涯模拟器** 贡献一份力量！本文说明如何上手、贡献什么、以及提交前的硬性要求。

在动手前，请先花几分钟读：

- [`docs/DEVELOPMENT-GUIDE.md`](docs/DEVELOPMENT-GUIDE.md) —— 架构、目录、双团队分工、常见任务操作步骤。
- [`docs/CONTENT-SCHEMA.md`](docs/CONTENT-SCHEMA.md) —— 字段级契约（写内容时的"字典"）。
- [`docs/EVENT-WRITING-BRIEF.md`](docs/EVENT-WRITING-BRIEF.md) —— 事件写作铁律。

---

## 一句话架构

**引擎与内容彻底分离**：

- 引擎（`dev/engine/`）只提供**机制**，不含任何剧情与数值。
- 内容（`dev/content/`）只声明**数据**，不含任何逻辑分支。
- 唯一接口是 `POTUS.define(kind, payload)`——加内容永远不需要改引擎。

理解这一点，就理解了本项目为什么欢迎大规模并行贡献。

---

## 可以贡献什么

### 🟢 写事件卡（最推荐，零引擎门槛）

项目当前有 173 张事件卡，但"一个月一回合"的节奏下内容消耗很快，**加事件永远是性价比最高的贡献**。

一张事件卡需要：

- **三值性 `valence`**：机遇 `boon` / 风险 `risk` / 威胁 `bane` 之一。
- **量级 `grade`** + **类型 `category`**（决定分量与默认配图）。
- **背景卡 `brief`**：以主角此刻的认知边界分层叙述（确知 / 传闻 / 未知）。
- **至少 2 个选项**，其中**必须有一个既无 `cost` 又无 `req` 的保底选项**。
- **五档结果齐全**：`crit / ok / meh / fail / critfail`。
- 经济一律用**系数**（配合 `dyn: true`），不要写绝对金额。

照着 `dev/content/events/50-era-2008.js`（普通事件）、`dev/content/events/84-archive.js`（四幕事件链）、`dev/content/events/109-boon-fill.js`（机遇卡）抄格式即可。

**按 `时代 × 类型` 切片**，不同的人可以并行写互不重叠的文件。

### 🟡 美术 / 数值 / 平衡

- 换某类型的配图：改 `dev/content/05-categories.js`；写真照片：见 `dev/content/09-photo-art.js`。
- 调平衡参数（权重、汇率、经济标尺）：改 `dev/content/01-config.js`，**改完必须重跑 `validate.js` 看结局分布**。

### 🔴 引擎机制

需要新增机制字段时，**先提 issue 说清场景与期望的字段形状**，由维护者在契约（`CONTENT-SCHEMA.md`）中定稿后再实现。不要在内容里 hack 临时逻辑。

---

## 环境要求

**零依赖、零构建**。只需要：

- 一个现代浏览器（玩）。
- 一个 Node.js（跑校验工具，仅用命令行，无 npm 依赖）。

```bash
# 开玩
open dev/index.html          # macOS；或直接双击

# 自检（提交前必跑）
node dev/tools/validate.js   # 退出码 0 = 全部通过

# 结构审计（可选，看覆盖率/关联健康度）
node dev/tools/audit.js
```

---

## 提交前检查清单

- [ ] `node dev/tools/validate.js` **全部通过**（退出码非 0 会被拒绝）。
- [ ] 新增事件：五档结果齐全、`id` 全局唯一、`era` 键存在。
- [ ] 新增事件：写了 `grade` + `category` + `valence` + `brief`。
- [ ] 每个事件都有**保底选项**（无 `cost` 且无 `req`）。
- [ ] 经济字段是**系数**（配 `dyn: true`），没有硬编码绝对金额。
- [ ] 引用的人脉 / 派系 / flag 都在对应注册表里存在。
- [ ] 写事件链（`after`）→ 每一幕 `unique: true`，且续集自己声明 `flags`。
- [ ] 新建了内容文件 → 已在 `dev/index.html` 的内容清单登记 `<script src>`。

---

## 提交流程

1. Fork 本仓库，新建分支（`feat/xxx`、`content/era-1929-boon` 等）。
2. 做出改动，本地跑 `node dev/tools/validate.js` 通过。
3. 提交，commit message 用一句话说清"改了什么、为什么"。
4. 开 Pull Request，说明覆盖的时代/类型/三值性，附上 `validate.js` 的输出。

---

## 行为准则

请保持友善、尊重。这是一个关于**历史与政治**的模拟作品——它描绘的是机制与处境，不代表对任何真实人物或群体的立场评判。讨论请对事不对人。
