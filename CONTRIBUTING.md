# 参与贡献

感谢你想为 **《权力之路》· 美国政治生涯模拟器** 贡献力量。**零依赖、零构建**：用浏览器双击 `dev/index.html` 即玩，用 Node 跑校验（无 npm 依赖）；改内容通常连引擎目录都不用打开。

动手前先读：[`docs/CONTENT-SCHEMA.md`](docs/CONTENT-SCHEMA.md)（写内容的"字典"：字段契约、事件写作铁律 §11、竞选链契约 §14）；流程与分工细节见 [`docs/DEVELOPMENT-GUIDE.md`](docs/DEVELOPMENT-GUIDE.md)；英文覆盖层见 [`docs/I18N.md`](docs/I18N.md)；多人并行灌内容的分片纪律见 [`docs/PARALLEL-CONTENT-WORK.md`](docs/PARALLEL-CONTENT-WORK.md)。

## 怎么贡献

- **写事件卡 / 竞选链**（最推荐，零引擎门槛）：照着 `dev/content/events/50-era-2008.js` 抄格式；加链改 `dev/content/61-campaigns.js` + `dev/content/events/65-campaign-acts.js`。要点：每张卡有保底选项（无 `cost` 无 `req`）、五档结果齐全、经济只写系数不写绝对金额。**新卡不写 `era`**——用绝对年窗 `minYear`/`maxYear`（见 SCHEMA §1.5）。
- **新增内容文件**：不要手改 `dev/index.html` 的 `<script src>` 清单——跑 `node dev/tools/gen-manifest.js`，它会把新文件追加进**生成器托管区**（托管区勿手工编辑）。
- **引擎机制**：先提 Issue 说清场景与期望的字段形状，由维护者在契约中定稿后再实现；不要在内容里 hack 临时逻辑。

## 提交前五连自检（全部退出码 0 才提 PR）

```bash
node dev/tools/validate.js                  # 语法/引用/契约/蒙特卡洛模拟（默认 20 局）
node dev/tools/text-audit.js                # 标题陈述句、正文篇幅等文字规范
node dev/tools/choice-audit.js              # 选项取舍：揪出闭眼可选的诱饵
node dev/tools/i18n-events.js               # 逐卡英文缺口——新卡必须自带英文覆盖层（I18N_MISS=0 硬门禁）
node dev/tools/text-audit.js --lang=en      # 英文侧体例：标题 sentence case，不许混进 Title Case
```

## 提交流程

Fork → 新建分支（`feat/xxx`、`content/line-1995-boon` 等）→ 上述自检全过 → commit message 一句话说清"改了什么、为什么" → 开 PR（附 `validate.js` 输出，说明覆盖的年代区间/类型/三值性）。

## 行为准则

请保持友善、尊重。这是一个关于**历史与政治**的模拟作品——它描绘的是机制与处境，不代表对任何真实人物或群体的立场评判。讨论请对事不对人。
