# POTUS 项目长期记忆

一个「美国政治生涯模拟器」网页游戏（文字驱动，零构建）。`dev/` 是源码，`dist/` 是发布产物。

## 工作流约定

- **Git：每完成一个「稳定小版本」就提交一个 commit**（用户明确要求）。仓库为本地 git，`main` 分支。
  - repo **同时跟踪** `dev/`、`dist/`、`.workbuddy/memory/`（不是只有 dev）。
  - 提交信息用中文，风格参考历史：`v0.5.x: <主标题>` + 分点说明（UI / 内容 / 测试）。
  - 提交前先跑测试（见下），把测试结论写进 commit message。
- **发布流程**：改 `dev/` 后运行 `bash tools/package.sh` → rsync 同步到 `dist/`（排除 tools/docs），并生成 `dist/README.txt`。改完 dev 必须重新 package，否则 dist 是旧的。
- **预览**：零构建，直接打开 `dev/index.html`（或 `dist/index.html`）。

## 测试命令（都需要 NODE_PATH 指向 jsdom 工作区）

```
cd dev
# 内容校验 + 300 局生涯回归（约 3 分钟）
NODE_PATH=/Users/dfiuser/.workbuddy/binaries/node/workspace/node_modules \
  /Users/dfiuser/.workbuddy/binaries/node/versions/22.22.2-3/bin/node tools/validate.js
# jsdom UI 冒烟（约 1 分钟）
NODE_PATH=/Users/dfiuser/.workbuddy/binaries/node/workspace/node_modules \
  /Users/dfiuser/.workbuddy/binaries/node/versions/22.22.2-3/bin/node tools/smoke-ui.js
```

- 两项都退出码 0 才算通过；validate.js / smoke-ui.js 均为「时间较长」，用后台跑。
- 已知预存失败（非 UI 相关，长期存在，勿误判为新回归）：
  1. `validate.js`：**时代专属事件占比过低（~9.4%）** —— 9 个新 era 已注册但尚无专属事件。
  2. `smoke-ui.js`：**付得起的选项显示代价标签（$120k）** —— 内容/测试漂移。
- `tools/validate.js` 用的是极简 fake DOM（`makeEl`），不含真实布局；引擎里若用了真实 DOM API，需同步给 `makeEl` 补桩，**或**在引擎侧做能力探测。
- **引擎代码必须在两套宿主下都能跑**（v0.5.5 踩坑）：`smoke-ui.js` 用 jsdom（真实 DOM），`validate.js` 用 `window = global`（Node 全局对象，**没有 `addEventListener`**）、`document.body` 是无 `appendChild` 的裸对象。
  - 凡绑定全局事件的代码，先用 `tipReady()` 式能力探测（检查 `document.addEventListener` / `document.createElement` / `document.body.appendChild` / `window.addEventListener` 是否都是函数），不满足就整体跳过。
  - 只写 `window.addEventListener(...)` 而不守护 → validate.js 直接 `× 加载内容包时崩溃：window.addEventListener is not a function`，而 smoke-ui 因有真实 DOM 会掩盖该问题。**改引擎后必须两套都跑。**

## 界面架构约定

- **三栏布局（v0.5.4 定型；v0.5.5 修正可行性）**：`.grid` = `.col-left`(状态) + `#main`(中栏事件展示) + `.col-right#actbar`(所有操作+操作反馈)。
  - 定位原则：**左=状态、中=事件展示、右=所有操作与操作反馈**。任何「操作/反馈」元素（选择、掷骰、结算、收益、判定明细、头条、继续按钮）都应进 `#actbar`，不要留在中栏。
  - `.col-left` / `.col-right` 都是 `position:sticky; overflow:auto` 的滚动容器 → **绝对定位的后代气泡/浮层会被裁切**。
  - **`.grid` 必须恰好 3 个子元素，`#actbar` 必须是 `.grid` 的第 3 个子元素**。`#actbar` 只在 `P.startYear` 的模板字符串里创建一次，其余屏幕全走 `actAppend()` 往里塞内容 —— 一旦结构写坏，**所有**屏幕的操作栏都会掉到下面。
  - **头号陷阱（v0.5.5 事故）**：`render.js` 模板字符串里手写 `</div>` 极易多写/少写一个。`startYear` 结尾多 1 个 `</div>` 会让 `.grid` 提前闭合，`#actbar` 变成 `#app` 的子节点（block），整条操作链**掉到中间栏下面**。改模板后务必用 jsdom 断言 `.grid.children.length === 3`。
  - 响应式断点：`≤1000px` 才塌成两栏（`.col-right{grid-column:1/-1}` 掉到下面一行），`≤760px` 单栏。列宽用 `minmax` 可压缩（`minmax(200px,250px) minmax(0,1fr) minmax(280px,320px)`），保证 1280/1366 常见笔记本窗口稳定三栏。**不要把断点调回 1150px**——那会让窗口一缩就复现「操作栏在下面」。
- **插入助手**（render.js，IIFE 顶层函数声明）：`actInsert(el)`/`mainInsert(el)` → 追加进 `#actbar`（无右栏的页面退回 `#main`）；`actAppend(html)`/`actClear()` 操作 `#actbar`。
- **悬浮说明气泡**：`.hastip[data-tip]` 的提示统一由挂在 `<body>` 的 `#tipbox`（`position:fixed; z-index:9999`）渲染，**不要**回到 `::after` 方案（会被边栏 overflow 裁切）。控制器在 render.js：`tipLayer/showTip/hideTip/bindTooltip`，`P.boot()` 里绑定。

## 用户偏好

- 沟通用中文；偏好「先 review 再实现」；代码中的隐含假设要显式列出。
- 文档/README 早期保持概览式（面向接手者，不写开发过程）。
