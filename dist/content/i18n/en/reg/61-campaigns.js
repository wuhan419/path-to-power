/* ============================================================================
 * CONTENT · i18n/en/reg/61-campaigns.js
 * 中文文件 content/61-campaigns.js（竞选链）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md §3）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的展示字段**。
 *   · campaign 在 reg 里是「campaign id → 定义」的对象：按 id 深合并，只写要改的字段。
 *   · stages 是无 id 的对象数组 → **按数组下标对齐**：条数与顺序和原文完全一致，
 *     每条只覆盖 title，不碰 event / final / maxMonths / metersDelta / abortBelow。
 *   · gate / tier / retryable / meters 是逻辑，本层绝不出现。
 *   · balance.campaign.meterNames（选情表两条计量条的名字）也是内容侧展示文案，
 *     走 reg.balance 深合并——只给 meterNames，不碰 meterDrift / retryCooldown。
 *
 * 英文写法：幕题像竞选总部的日程表，office 像选票上的职位名，lede 像回忆录章节题记。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    balance: {
      campaign: {
        meterNames: { momentum: "Momentum", warchest: "War Chest" }
      }
    },
    campaign: {
      camp_council: {
        office: "Local Office (Primary)",
        lede: "For the first time, someone says it seriously: put your name on the ballot.",
        stages: [
          { title: "Announcing" },
          { title: "Knocking on Doors" },
          { title: "Election Day" }
        ]
      },
      camp_city: {
        office: "City Council",
        lede: "Between volunteering and holding a real vote sits one real campaign.",
        stages: [
          { title: "Filing the Papers" },
          { title: "Town Hall Debate" },
          { title: "Election Day" }
        ]
      },
      camp_state: {
        office: "State Assembly",
        lede: "The district grows from a street to a county — a campaign needs a machine now.",
        stages: [
          { title: "Announcing for the Legislature" },
          { title: "The Primary" },
          { title: "Filling the War Chest" },
          { title: "Hitting the Trail" },
          { title: "Election Day" }
        ]
      },
      camp_upper: {
        office: "State Senate",
        lede: "The upper chamber: fewer seats, higher stakes.",
        stages: [
          { title: "Eyeing the Senate Seat" },
          { title: "Primary Showdown" },
          { title: "Filling the War Chest" },
          { title: "The County Tour" },
          { title: "Election Day" }
        ]
      },
      camp_stwide: {
        office: "Statewide Office",
        lede: "For the first time, you must introduce yourself to an entire state.",
        stages: [
          { title: "The Statewide Announcement" },
          { title: "State Convention" },
          { title: "Filling the War Chest" },
          { title: "Becoming a Name Statewide" },
          { title: "Election Day" }
        ]
      },
      camp_federal: {
        office: "U.S. House of Representatives",
        lede: "The jump to Congress: a primary, the money, and a map that is finally yours.",
        stages: [
          { title: "Announcing for Congress" },
          { title: "The Congressional Primary" },
          { title: "Money and Backers" },
          { title: "The Last Week in the Swing District" },
          { title: "Election Day · The House Seat" }
        ]
      },
      camp_senate: {
        office: "U.S. Senate / Governor",
        lede: "A statewide election, run by a real campaign machine.",
        stages: [
          { title: "Announcing for Big Office" },
          { title: "The Statewide Primary" },
          { title: "The Debate" },
          { title: "Contesting the Swing Regions" },
          { title: "Election Day" }
        ]
      },
      camp_vp: {
        office: "Vice President / Nominee",
        lede: "You are no longer running for yourself; you are the other half of the ticket.",
        stages: [
          { title: "On the Shortlist" },
          { title: "The Vetting" },
          { title: "The National Convention" },
          { title: "Campaigning for the Ticket" },
          { title: "The Roll Call" }
        ]
      },
      camp_president: {
        office: "President of the United States",
        lede: "The longest campaign in the world.",
        stages: [
          { title: "Announcing for President" },
          { title: "Winning State After State" },
          { title: "Locking the Nomination" },
          { title: "The Presidential Debate" },
          { title: "The Final Sprint in the Swing States" },
          { title: "Election Day · The White House" }
        ]
      },
      /* #21 M2：在任者的两条链。stages 按数组下标对齐中文，顺序不许动。 */
      camp_reelect: {
        office: "Reelection",
        lede: "An incumbent's opponent never lives only on the other side — there is also the bill for these four years.",
        stages: [
          { title: "Announcing a Second Term" },
          { title: "A Challenger From Your Own Party" },
          { title: "The Second Debate" },
          { title: "Election Day · Reelection" }
        ]
      },
      camp_midterm: {
        office: "Midterms (Hold Congress)",
        lede: "Every two years the goods get inspected: voters don't ask what you'll do next term, only what these two years did.",
        stages: [
          { title: "The Caucus Wants an Accounting" },
          { title: "Campaigning Nationwide" },
          { title: "Election Day · Midterms" }
        ]
      }
    }
  }
});
