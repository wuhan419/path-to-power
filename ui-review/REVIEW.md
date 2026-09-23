# UI 评审：状态卡瓷贴对齐 / 资金增长适配（2026-09-23）

> 原型改动在 `/tmp/uishot/proto`（dev/ 未动）。确认后把下列 2 个文件的改动落回 `dev/`。

## 问题清单（对照 before-*.png）

| # | 现象 | 根因 | 位置 |
|---|------|------|------|
| 1 | 声望/资金/人情/把柄 四枚瓷贴高度不齐，「把柄 0 份」在窄栏折成两行 | `.stat` 内容居中 + 瓷贴值带「份」字，窄容器放不下折行 | style.css `.topstat .stat`；topbar.js `resourcesHTML` |
| 2 | 瓷贴内容两侧大片留白 | `justify-content:center` + `flex:1` 等分 | style.css `.topstat .stat` |
| 3 | 「社区竞选办志愿者」下方「等级 1」徽标独占一行、右侧空白 | `.idc-rank` 是 flex column，标题和徽标各占一行 | style.css `.idc-rank` |
| 4 | 选民三档 + 底气一行右端散乱 | `.vt` 固定 margin-right、底气随手排 | style.css `.officecard .ocline/.vt` |
| 5 | 日期单独占一行（与顶栏黑条重复），且**顶栏黑条月份不随月推进**（bug：kicker 只在 startYear 渲染一次） | tickDate 不刷新 kicker | topbar.js `tickDate` |
| 6 | 资金 `$408k` 格式在百万/十亿级会把瓷贴撑爆（如 `$12345k`） | 写死 `toFixed(0)+'k'` | topbar.js `resourcesHTML` |

## 原型改动（dev 侧落点）

**engine/style.css**
1. `.topstat .stat`：`justify-content:center → flex-start`、加 `white-space:nowrap`、padding 收紧（5px 8px 5px 9px）、gap 7→6。
2. `.sval` 16→15px、`.slab` 12.5→12px。
3. `.idc-facts .statgrid`：`@media(max-width:1366px)` 下变 `grid; 1fr 1fr`（2×2）——1280/1366 笔记本单行放不下会截断；≥1440 仍一行。
4. `.idc-rank`：column → row（baseline 对齐），徽标 `align-self:center`，新增 `.idc-rank-date{margin-left:auto}`（日期收进标题行右侧）。
5. `.officecard .ocline`：改 flex，`justify-content:space-between`（三档靠左、底气靠右）；`.vt` 居中改左对齐、去掉 margin-right。

**engine/view/topbar.js**
1. 新增 `P.fmtMoney(n)`：`< $1M → "$408k"`；`≥ $1M → "$1.23M"/"$12.3M"`；`≥ $1B → "$1.23B"`；负数带负号。资源瓷贴「资金」改用它（**资金增长不撑破布局**）。
2. 把柄值去掉「 份」，单位说明移进悬停提示。
3. `rankHTML()` 末尾追加 `.idc-rank-date`（dateText），`statusPanel()` 删掉单独的 `dateChipHTML()` 行。
4. `tickDate()` 里同步刷新 `.kicker-band`（`kb.outerHTML = P.topbarHTML()`），修复顶栏月份停留年初的 bug。

## 验证（无头 Chrome 真实渲染）

- after-1440.png：四瓷贴一行等高、内容左对齐；等级 1 徽标与职务同行；日期靠右；顶栏月份=状态卡月份。
- after-1280.png：2×2 瓷贴无截断；`$408k` 完整。
- after-1280-bigmoney.png：注入 `G.fun=2345678` → 显示 `$2.34M`，不撑破布局。
- 改动纯视图层（CSS + topbar.js 显示函数），引擎数值/判定不动；validate.js / smoke-ui.js 需在落回 dev 后重跑确认（smoke-ui 有 `grid.children.length===3` 等结构断言，本次未动 .grid 结构，预期通过）。

## 后续可选（本轮未做）

- 全站 chip 体系统一（回报粉绿 / 标签蓝黄 / 月份账三种 chip 色板收敛成 3 档语义色）。
- 事件卡顶部「本月账」chip 行与报纸 tag 行的视觉分层。
