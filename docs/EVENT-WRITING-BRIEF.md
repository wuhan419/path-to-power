# 事件包写作规范（并发批次专用 · 必读）

> 本页是 POTUS 文档体系的一部分。项目总览见仓库根 [`README.md`](../README.md)；字段级契约见 [`CONTENT-SCHEMA.md`](./CONTENT-SCHEMA.md)。

你要为一个美国政治生涯模拟游戏写一批事件 JS 文件。写完的文件会被直接加载进游戏。

## 必读文件（按顺序）
1. `docs/CONTENT-SCHEMA.md` 的 §11.6 设计原则（六条，全部是玩家实测反馈换来的铁律）
2. `dev/content/events/80-shady.js` 的开头注释 + `shady_union`/`shady_union_collect` 两个事件（标准范例：前因后果 + after 余波链 + 保底选项 + 经济诚实）
3. `dev/content/events/62-crossroads.js` 的任意一个事件（note 字段范例）

## 文件模板（严格遵守）
```js
/* ============================================================================
 * CONTENT · events/XX-<主题>.js
 * <一句话说明这个包讲什么>
 * ==========================================================================*/

POTUS.define("event", [
  {
    id: "<包名前缀>_<事件名>",          // 唯一，英文
    grade: "minor"|"mid"|"major",        // 小事/中事件/大事件
    category: "<你的类型>",              // 见下面分派
    era: ["2008_CRASH","1960_CAMELOT","1974_WATERGATE"],  // 全时代通用写全三个
    tierMin: 0, tierMax: 5,              // 适用的权力层级
    weight: 8-14,                        // 抽取权重
    // unique: true,                     // 一局一次（major 默认就是）
    // month: 3, day: 15,                // 有真实历史锚点才钉日期
    // after: { id: "前事件id", minMonthsAfter: 6, maxMonthsAfter: 36 },  // 余波
    // flags: ["xxx"], notFlags: ["yyy"], // 触发门槛（标记）
    brief: {
      lede: "一句话张力。",
      known: [                            // 3-5 条；第一条必须交代【为什么是我、为什么是现在】
        "……"
      ],
      rumor: [ "传闻，可真可假，不许用语气暗示真假" ],
      unknown: [ "点出信息差的位置（不是剧透后果）" ],
      terms: [ { k: "名词", v: "解释，不解释剧情" } ]   // 2-3 个
    },
    title: "标题",
    body: "正文 2-4 句。",
    choices: [
      {
        id: "xxx", text: "选项（动词开头）",
        note: "这条路意味着什么/谁会记得/风险在哪（1-2 句，折叠显示）",
        base: 0.4-0.7,                    // 基础胜算
        mods: [ { src: "attr", key: "CHA|INT|CUN|INTG", w: 0.2-0.5 }, { src: "fac", key: "派系", w: 0.2-0.4 } ],
        // cost: { fun: 100000, ap: 1, fav: 1, lev: 1 },   // 有代价才写
        // stake: { fun: true, ap: true, fav: true },       // 可投注才写
        outcomes: {
          crit:     { body: "大成功叙事", effects: { rep: 8-16, fac: { base: 10 }, voters: { diehard: 300 } } },
          ok:       { body: "成功叙事",   effects: { rep: 4-8 } },
          meh:      { body: "勉强叙事",   effects: { rep: 1-3 } },
          fail:     { body: "失败叙事",   effects: { rep: -4--8 } },
          critfail: { body: "大失败叙事", effects: { rep: -10--16, flags: ["scandal_2"] } }
        }
      },
      // …… 2-4 个选项；【必须有一个无 cost 无 req 的保底选项】
    ]
  }
]);
```

## 六条铁律（违反会被校验器拦下）
1. **经济诚实**：投资型回报用 `funMul`（比例，如 funMul: 0.8 = 赚 80%）；消费型支出的 ok 档必须有 rep≥5 或派系净变动≥5 或 contact/flag。投入≥$50k 的选项会被逐个审。
2. **门槛匹配身份**：大资金选项不对低地位穷人开放（要么 req.fun 挡，要么给出力不出钱的变体选项）。
3. **前因后果**：known 第一条必须回答"为什么这件事找上你"。重要事件（major）尽量带 after 余波幕。
4. **身份驱动收益**：rep/fac 量级配 tier（T0-T1 事件 rep 2-6，T3+ 事件 rep 8-16）。
5. **中文名词**：正文用「」不用 ASCII 引号；不用 emoji；不写"T2"这种代号。
6. **保底选项**：每个事件至少一个选项无 cost 无 req。

## 可用效果键
`attr:{CHA,INT,CUN,INTG}` `fac:{base,establishment,commercial,labor,press,military,church,agency,foreign,tech,criminal}` `fun` `rep` `hp` `ap` `fav` `lev` `tier(±1)` `score` `flags:[...]` `notFlags:[...]` `contact:{人id}` `forget:[人id]` `voters:{warm,diehard,oppose}` `funMul` `fall:1|2`（下野） `hardEnd:"prison"|"disgrace"`（硬结局，慎用） `setTrack` `setStance`

已登记人脉 id：`brother`(家里人) `fixer`(老雷·掮客) `shark`(放贷人) `doctor`(诊所医生) `union_boss`(工会头目) `pastor`(牧师) `columnist`(专栏作家) `producer`(电视制作人) `lobbyist`(游说客) `agent`(联邦探员)

已登记状态标记（flags 可直接用）：mentor/party_traitor/compromised/whistleblower/vulture/bought/shell/affair_secret/affair_stain/leaker_hero/investigation_open/divorce_pending/tape_out/crisis_2008/cuba_crisis/bridge/constitutional_crisis/president/kingmaker/owns_media/saw_crisis/leaker_suspect/burn_seen/shady_start/owes_shark/black_money/union_backing/street_army/bought_editor/enclave_base/civil_win/street_patrol/fallen/cross_staffer/cross_runner/cross_ngo/cross_insider/cross_senate_road/cross_federal_road/cross_wh_road/cross_gov_road/wave_occupy/wave_tea/wave_antiwar/wave_civil60/wave_busing/wave_gasline/wave_veteran/wave_deferred

## 新标记要登记
引入新 flag（上面列表没有的）时，在文件末尾加：
```js
POTUS.define("balance", { tagNames: { <你的flag>: { name: "中文名", desc: "是什么", effect: "游戏影响" } } });
```

## 完成后自检（必须全过再交付）
```bash
cd dev && node tools/validate.js
```
报错涉及本次交付的文件时，修到全过。
