# itch.io 开发日志发布稿（中英双语）

一条版本一篇。`docs/DEVLOG.md` 是底账（为什么这么改、数字怎么量出来的、哪条结论后来被推翻），
**这一份是给玩家看的发布稿**—— itch.io 后台 New post 时，把下面「英文正文」整段贴进 body，
标题栏用给出的标题；中文接在英文下面、用 `---` 分隔即可（itch 的 markdown 支持 `##` 与粗体）。

放在 `promo/` 而不是 `docs/`：`package.sh` 只把 `docs/` 镜像进 `dist/`，发布稿不该被烤进玩家下载的包里。

---

## v0.12.3 · 2026-09-28

**英文标题**
`v0.12.3 — your politics is what you walked, and a faster (deadlier) ladder`

**中文标题**
`v0.12.3 —— 底色是你一路走出来的，梯子也快了（也更致命）`

### 英文正文

Two years of climbing used to have exactly one tempo: grind the polls, month after month.
**v0.12.3 gives you a second road — and takes away a question nobody liked answering at character creation.**

#### Your stance isn't a setting anymore

You no longer pick an ideology when you start. **Establishment, Populist, Progressive, Conservative** is now
something you *build*: every choice you make writes a mark on that ledger, and once one lane has clearly pulled
ahead of the others, people start calling you by that name. Nobody accumulates anything? Then you're the
Establishment — the party machine's own person, standing for nothing in particular. You can switch sides later.
The coloured bar in the top bar follows you, and the dice remember: the same event can cost you points when it
runs against the flag you're carrying.

#### The fast lane is real, and it is priced

At the top three tiers there are now **nine demagogic options** — naming the party machine out loud on stage,
screaming "witch hunt", torching a banker's career, a purge speech, going for the throat in a debate, closing a
rally on an accusation, bypassing your own whip during a shutdown, stealing a challenger's fire in a re-election,
turning a midterm campaign into a grievance trial.

They are *easy* to win. Success pays out immediately, big, in momentum and hardened voters. The bill arrives in
the enemy column instead. Measured over 200 runs: the odds of dying on the 9th / 18th / 27th / 36th provocation are
**17.5% → 40.5% → 58.5% → 77.5%**, and the first reckoning lands around the 7th ignition on average. Compare that
with 0.5% for a career that backs off at the warning shot on schedule. Nothing here is free — the slope is just
finally visible.

#### Numbers that were lying to you

- **100 was never the attribute cap.** It's the cap on points you spend at character creation. Card bonuses and
  in-game growth no longer get silently clamped back down, so the wizard's preview and the actual number are the
  same number. Quiet months now grow you up to 100 instead of stalling at 88.
- **Maxed reputation still pays.** Reputation sitting at 100 used to eat every positive roll thrown at it — 18.2%
  of all reputation gains in a long, lucky run. Overflow is now converted into warm voters and the settlement bar
  shows it right next to "Reputation +6". We deliberately did **not** raise the 100 ceiling: it would have meant
  re-tuning every election curve in the game. Instead the overflow buys you a headwind, and the monthly
  mean-reversion takes it back.
- **Student loans are $65k on all three loan-carrying difficulties.** In v0.12.2 we made Hard $90k and Brutal
  $115k. Direction right, magnitude wrong: measured on the same seeds, bankruptcy went 47% → 70% → 73%, and
  "retired on top" / "kingmaker" endings stopped happening entirely at 85k. At $65k the median run is already
  missing default by one month, so there was no headroom left on that axis — difficulty now comes from how many
  talent cards you may draw (Brutal 1 / Hard 2 / Normal 3) and from your family background, not from debt.

#### English is the default now

The first screen a new player sees is English; 简体中文 is one click away on the title screen and in the top bar,
and the game remembers your choice. **Default ≠ primary language** — the Chinese text is still the original, and
nothing about it changed.

#### Save files

`SAVE_FORMAT` is unchanged (13): saves from v0.12, v0.12.1 and v0.12.2 load and continue normally. An old save
that picked the "Outsider" flag is folded into Populist on load.

Download the attached `path-to-power-v0.12.3.zip`, unzip it, open `index.html` — or just play it in the browser
right here.

---

### 中文正文

往上爬原本只有一种节奏：一个月一个月地磨民调。**v0.12.3 给了你第二条路，也顺手删掉了建角时没人愿意回答的那个问题。**

#### 底色不再是选项

开局不用选立场了。**建制派 / 民粹派 / 进步派 / 保守派**现在是你一路走出来的：每一次抉择都在这本账上记一笔，
哪一条路明显甩开其他几条，人们就开始按那个名字称呼你。谁都没攒起来？那你就是建制派——党务机器自己的人，
哪股风都不站。中途可以改换门庭，顶栏那条彩色光谱跟着你变，骰子也记得：同一件事，撞在你不戴的那顶帽子上会**扣分**。

#### 快线是真的，价格也是真的

最上面三级现在有 **九处煽动选项**——台上点名党机器、张嘴就是"猎巫"、把某个银行家的生涯烧给你看、清算演说、
辩论往死里打、集会压轴来一场控诉、政府停摆时绕开自家党鞭、连任时抢走挑战者的火、把中期助选开成控诉大会。

它们**特别容易成功**，成功当场就把选情和铁杆票仓给你，账单全部记在仇家那一栏。200 局的量法：第 9 / 18 / 27 / 36
次点火的死局率是 **17.5% → 40.5% → 58.5% → 77.5%**，平均第 7.8 次点火就挨第一次清算；对照那种在前哨战按时低头泄压的局，
死局率 **0.5%**。没有白拿的东西——只是坡度终于看得见。

#### 三处一直在骗你的数字

- **100 从来不是属性上限。** 它是建角加点的上限。卡面加成与局内成长不再被悄悄夹回去，向导里预览到的数字和
  落地后的数字从此是同一个数字；平静月的被动成长线也从 88 抬到 100。
- **声望满了照样有用。** 声望卡在 100 时，掷到的正向声望会被上限静默吃掉——一局长线顺风生涯里这类损失占全部
  正向声望的 18.2%。现在溢出会折成好感选民，结算条就写在"声望 +6"旁边。我们**故意没有抬那个 100 的顶**：
  抬它等于重标游戏里每一条选举曲线。溢出换来的是**一段顺风**，之后会被每月的均值回归收回去。
- **三档贷款难度的本金一律 $65k。** v0.12.2 我们把困难抬到 $90k、炼狱抬到 $115k，方向对、幅度错：同种子实测破产率
  65k → 47%、85k → 70%、105k → 73%，而 85k 起「功成身退」「造王者」这类生涯结局**整批不再发生**。$65k 那一档，
  中位数已经只差一个月就破产——这根轴没有余量了。所以"越难越苦"改由天赋卡张数（炼狱 1 / 困难 2 / 普通 3）和出身承担，
  不再靠加债。

#### 默认语言改成英文

新玩家第一眼是英文；简体中文在标题屏和顶栏各有一枚开关，点一下切过去并记住偏好。**「默认」不等于「主语言」**——
中文仍是内容原文，一个字没动。

#### 存档

存档格式没变（`SAVE_FORMAT` 13）：v0.12 / v0.12.1 / v0.12.2 的旧档直接续玩。旧档里当年选的"局外人"会在载入时并入"民粹派"。

下载附件 `path-to-power-v0.12.3.zip`，解压后双击 `index.html` 就玩；或者直接在网页里点 Play。

---

## 上一条：v0.12.2 · 2026-09-27

发布页 <https://github.com/wuhan419/path-to-power/releases/tag/v0.12.2>（干满两届当场收官 ＋ 手机竖屏重做）。
itch 上已发的那篇正文见 Release 页；**注意**：那一版把困难/炼狱学贷抬到 $90k / $115k，本版已撤回为三档 $65k。
