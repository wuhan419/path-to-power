/* ============================================================================
 * CONTENT · i18n/en/reg/30-fillers.js
 * 中文文件 content/30-fillers.js（事件池耗尽时的填充包）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md §3–§4）：
 *   · 原中文文件一个字不动；kind 与中文侧一致 = filler（core.js 注册表里的对象，
 *     键是时代名 "2008_CRASH" 与通配 "*"，两个包都要给全，少一个包就等于那时代没英文）。
 *   · topics / acts 是**纯标量数组 → 整体替换**：条数与中文完全一致（7/5 与 4/4）。
 *   · choices 元素带 id（a/b/c）→ 按 id 对齐；base / mods / effects 是结构性键，不写。
 *
 * 【句式骨架怎么办】I18N.md §4 说 bodyTpl 这类"动词短语 + 名词主题"的拼装不能直译。
 *   框架侧已经给了英文形状（见 i18n/en/view/events.js 的引擎兜底）：
 *     ui.events.fillerAct      = "You are pulled into"   ← 介词收尾、不带标点
 *     ui.events.fillerTopic    = "a local scandal"       ← 小写名词短语
 *     ui.events.fillerBodyTpl  = "{act} {topic}. You must choose under the spotlight."
 *   本分片照同一形状重写：acts 全部是"及物动词/介词短语收尾"，topics 全部是可直接接在
 *   后面的小写名词短语，bodyTpl 与引擎兜底逐字相同，因此任意 act × 任意 topic 都能拼成
 *   一句合法英文。中文里 acts 自带的全角冒号（"你收到线报："）在英文侧一律不带标点。
 *   中文的 critfail/fail/crit 是 good|bad + 固定后缀拼出来的，英文不做拼接：
 *   五个档位每条都写成完整句（少一句就会露出中文后缀）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    filler: {
      "2008_CRASH": {
        topics: [
          "a municipal bond default",
          "a bailout payment nobody can explain",
          "a union walkout",
          "a deleted email",
          "a shell-company merger",
          "a round of regulatory arbitrage",
          "an inflated credit rating report"
        ],
        acts: [
          "You are pulled into",
          "A tip lands about",
          "Your opponent digs up",
          "The press keeps asking about",
          "Your party demands a statement on"
        ],
        bodyTpl: "{act} {topic}. You must choose under the spotlight.",
        choices: [
          {
            id: "a",
            text: "Go public and seize the moral high ground",
            outcomes: {
              crit: { body: "You come through it clean, and not one loose end survives the story." },
              ok: { body: "You come through it clean, with your reputation a little higher." },
              meh: { body: "You scrape through, and leave something behind for later." },
              fail: { body: "You reach for the high ground and miss." },
              critfail: { body: "You reach for the high ground and miss, and the camera catches the whole thing." }
            }
          },
          {
            id: "b",
            text: "Settle it quietly, through connections",
            outcomes: {
              crit: { body: "Your hand shows in the best way, and the praise travels through rooms that matter." },
              ok: { body: "Your hand shows in the best way, and people praise it privately." },
              meh: { body: "You scrape through, and leave something behind for later." },
              fail: { body: "The favors do not cover it." },
              critfail: { body: "The favors do not cover it, and the calls you made get printed." }
            }
          },
          {
            id: "c",
            text: "Hand it to a subordinate and keep yourself clean",
            outcomes: {
              crit: { body: "You walk out spotless, and your team never quite forgives the arithmetic." },
              ok: { body: "You walk out spotless, and your team starts to drift." },
              meh: { body: "You scrape through, and leave something behind for later." },
              fail: { body: "The handoff fails, and people you trust stop answering." },
              critfail: { body: "The handoff fails, and a reporter prints the name of the man you handed it to." }
            }
          }
        ]
      },

      "*": {
        topics: [
          "a local scandal",
          "a payment nobody can explain",
          "a fight over an appointment",
          "a run-in with the press"
        ],
        acts: [
          "You are pulled into",
          "A tip lands about",
          "Your opponent digs up",
          "The press keeps asking about"
        ],
        bodyTpl: "{act} {topic}. You must choose under the spotlight.",
        choices: [
          {
            id: "a",
            text: "Go public and seize the moral high ground",
            outcomes: {
              crit: { body: "You come through it clean, and not one loose end survives the story." },
              ok: { body: "You come through it clean." },
              meh: { body: "You scrape through, and leave something behind for later." },
              fail: { body: "You reach for the high ground and miss." },
              critfail: { body: "You reach for the high ground and miss, and the camera catches the whole thing." }
            }
          },
          {
            id: "b",
            text: "Settle it quietly, through connections",
            outcomes: {
              crit: { body: "Your hand shows in the best way, and the praise travels through rooms that matter." },
              ok: { body: "Your hand shows in the best way." },
              meh: { body: "You scrape through, and leave something behind for later." },
              fail: { body: "The favors do not cover it." },
              critfail: { body: "The favors do not cover it, and the calls you made get printed." }
            }
          }
        ]
      }
    }
  }
});
