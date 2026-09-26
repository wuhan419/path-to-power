/* ============================================================================
 * CONTENT · events/151-impeachment.js
 * 弹劾／逼宫（#21 M3）——白宫月决策通道上唯一一张"不看轮转"的卡。
 *
 * 为什么它单独一个文件：它不属于四族轮转的"内容"，而是引擎主动敲的那扇门。
 *   · 开闸在 engine/presidency.js 的 P.impeachmentDue()：支持率连续 pressureMonths 月
 *     低于 pressureBelow，且（丑闻 ≥2 级 或 调查未结）才成立；演过一次插 impeached 旗，
 *     retryMonths 之内不再敲同一扇门。
 *   · whiteHouseSlot 把它排在轮转之前 —— 真到那一步，这个月的桌上只有这一件事，
 *     但占的还是"每月恰 1 条"那个名额，所以弹完照原节奏继续轮（不推游标）。
 *   · 这张卡自带 cond: P.impeachmentDue()，于是即便有人把它当普通卡抽，也只有该演的
 *     那个月抽得到；validate 的池子容量公式按 id 把它排除（它不计入危机族的可用张数）。
 *
 * 三条出路的分岔（引擎不判死，胜负是卡自己的骰子）：
 *   硬扛到底 → 参院判无罪，但支持率与党内好感都要付账；
 *   主动切割 → 交人换票，保住位子也保住"总统还在做事"的表象，代价记在诚信与新闻界；
 *   宣布辞职 → 直接 fall:1 下野（复用既有软 BE：降层级、摔声望、留 fallen 旗），
 *               连任战与第二届自然一同消失——这比 hardEnd 更像真实的收场。
 * 定罪分支同样只写 fall:1：#35 定下的纪律是"竞选不再由引擎掷赌骰判死"，
 * 弹劾是同一族问题，所以这里也不动 hardEnd。
 *
 * 卸任清算：走出白宫之后 presExitSettle 会因为 impeached 旗往 wrath_agency 记一笔，
 * 那正是 content/events/140-reckoning.js 的入口——弹劾过的人退休后真的有账要还。
 * ==========================================================================*/

POTUS.define("event", [
  {
    id: "wh_impeachment", grade: "major", category: "crisis", valence: "bane",
    wh: true, whFamily: "crisis", dyn: true, unique: false, tierRaw: true, tierMin: 9, tierMax: 9,
    weight: 10, minYear: 1981, maxYear: 2025, medium: ["tv", "cable"],
    /* 引擎的闸在这里，不在白宫殿：只有 P.impeachmentDue() 成立的那个月才可能存在 */
    cond: function (G, P) { return !!(P.impeachmentDue && P.impeachmentDue()); },
    title: "条款已经送上来：三分之一的人准备投票，包括你自己人",
    body: "众院在午夜通过了两条弹劾条款，措辞比草稿更克制，因此显得更狠。参院的多数党领袖给你留了一句话：他还数得出五十一票，但他不确定五十一票里有几位愿意在电视上坐在你旁边。你的支持率连续四个月低于警戒线，而调查还开着。档案里还有一位替你在文件上签过字的下属，交出去换得来几张摇摆票，但他离开时带着他知道的一切。那卷你没读完的问询纪要，最后三页写着谁的名字。",
    choices: [
      {
        id: "fight", text: "硬扛：把这场投票打成它本来的样子——对手的政变，你全国讲话",
        base: 0.38, mods: [{ src: "approval", w: 0.35 }, { src: "fac", key: "base", w: 0.3 }],
        outcomes: {
          crit: { body: "你那场八分钟的讲话让党内反对者当晚撤了广告。无罪票多出一张，而且是一张公开举起来的。", effects: { rep: 0.6, appr: 5, fac: { base: 12, establishment: -4 }, flags: ["impeached", "acquitted_fight"] } },
          ok: { body: "参院按党派投票，你留下了位子，也留下了一个先例：下次他们可以更熟练。", effects: { rep: 0.15, appr: -2, fac: { establishment: -6 }, flags: ["impeached"] } },
          meh: { body: "你赢了表决，但两位盟友在最后一刻改投了弃权。新闻说白宫只是没有当场倒下。", effects: { rep: -0.1, appr: -5, fac: { establishment: -10 }, flags: ["impeached"] } },
          fail: { body: "一位自己党的参议员在议场上读了那卷纪要的第九页。你听见票数在念到一半时就已经定了。", effects: { rep: -0.6, appr: -10, hp: -0.4, fall: 1, count: { wrath_establishment: 12, wrath_press: 8 }, flags: ["impeached", "removed_office"] } },
          critfail: { body: "定罪之外，你的副手在记者会上被问到「总统是否曾要求你撒谎」，他停顿了四秒才回答。那四秒比任何一票都重。", effects: { rep: -0.95, appr: -14, hp: -0.5, fall: 1, count: { wrath_establishment: 15, wrath_press: 12, wrath_agency: 10 }, flags: ["impeached", "removed_office", "tapes_surface"] } }
        }
      },
      {
        id: "cut", text: "主动切割：把那位下属交出去，档案也一起给，换那几张摇摆票",
        base: 0.52, mods: [{ src: "attr", key: "CUN", w: 0.3 }],
        cost: { fav: 1 },
        outcomes: {
          crit: { body: "切割做得干净：他先一步辞职，你的律师当晚交出他没授权给的那部分。条款在委员会就沉了。", effects: { rep: 0.25, appr: 2, fac: { establishment: 6 }, flags: ["impeached", "fuse_burned"] } },
          ok: { body: "你保住了表决，也保住了总统府的安静。代价是一个人替他签字的那份名单从此只有你记得。", effects: { rep: 0.05, appr: -1, fac: { establishment: 3 }, flags: ["impeached", "fuse_burned"] } },
          meh: { body: "他走了，可他没有闭嘴。第二周开始，报道的角度变成「谁在替谁保密」。", effects: { rep: -0.15, appr: -4, fac: { press: -6 }, count: { wrath_press: 8 }, flags: ["impeached", "fuse_burned"] } },
          fail: { body: "他带着律师出现，把两份你签过字的备忘摆在同一张桌上。切割变成了证词。", effects: { rep: -0.5, appr: -9, hp: -0.3, fall: 1, count: { wrath_press: 10, wrath_agency: 8 }, flags: ["impeached", "fuse_burned", "memos_public"] } },
          critfail: { body: "你交出的人证清了你自己，也教会了反对派该怎么问下一个问题。表决在第二天天亮前结束。", effects: { rep: -0.8, appr: -12, hp: -0.5, fall: 1, count: { wrath_establishment: 12, wrath_press: 12, wrath_agency: 10 }, flags: ["impeached", "fuse_burned", "removed_office"] } }
        }
      },
      {
        id: "resign", text: "不投了：在判决前宣布辞职，让全国听你把那句话说完",
        base: 0.72, mods: [{ src: "attr", key: "CHA", w: 0.2 }],
        /* 辞职走 tier:-1（与引擎 P.leaveOffice 同一效果键：位阶挪回联邦重量级、峰值保留、
           不背 fallen 旗），定罪走 fall:1 —— 自己走的人和被人抬走的人，账上该不一样。 */
        outcomes: {
          crit: { body: "你的辞职讲话只讲了七分钟，没有辩解，也没有念那份名单。对手只来得及说一句「我们都很感激」。", effects: { tier: -1, rep: 0.35, appr: -3, fac: { establishment: 5 }, flags: ["impeached", "resigned"] } },
          ok: { body: "你体面地走出白宫，副总统在你之后半小时宣誓。历史书会写：他没有等到投票。", effects: { tier: -1, rep: 0.1, appr: -6, flags: ["impeached", "resigned"] } },
          meh: { body: "讲话播出时段的评论员只讨论一件事：你为什么不早点说。", effects: { tier: -1, rep: -0.1, appr: -8, flags: ["impeached", "resigned"] } },
          fail: { body: "辞职声明里那句「我始终问心无愧」被剪成三十秒，配着你自己的档案画面。", effects: { tier: -1, rep: -0.3, appr: -10, hp: -0.3, count: { wrath_press: 8 }, flags: ["impeached", "resigned"] } },
          critfail: { body: "你辞职那天，两名议员在台阶上举着一份新条款。人们不再争论那卷纪要，只争论你走时带了几箱文件。", effects: { tier: -1, rep: -0.6, appr: -12, hp: -0.4, count: { wrath_press: 10, wrath_agency: 10 }, flags: ["impeached", "resigned", "boxes_carried"] } }
        }
      }
    ]
  }
]);
