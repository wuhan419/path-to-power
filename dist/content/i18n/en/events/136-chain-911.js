/* ============================================================================
 * CONTENT · i18n/en/events/136-chain-911.js
 * 英文覆盖层：对应 content/events/136-chain-911.js（9·11 后话链，两幕）。
 *
 * 契约（详见 docs/I18N.md §3/§4 与 engine/i18n.js）：
 *   · 原中文文件一个字不动，本文件只放要覆盖的文本字段；事件按 id 定位，选项按 id 定位。
 *   · known / rumor / unknown 为纯字符串数组，整体替换，元素个数与中文严格一致
 *     （两幕均为 3/2/2；terms 按下的 {k,v} 与中文对齐：ch911_watch 2 条、ch911_blame 1 条）。
 *   · 结构性键（id / after / base / mods / cost / stake / effects / flags / when …）
 *     由引擎保护，本文件一概不写。
 *   · 英文按第二人称、现在时、短句重写；「」不直译，改英文引号或句式；全文件零汉字。
 *   · 标题一律 sentence case。
 *   · 本链不钉 fixed，故本覆盖层也没有 fixed 载荷。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [

      /* 2002—2004 · 联邦监视名单落到本地机场与警局 */
      {
        id: "ch911_watch",
        title: "The federal watchlist reaches your county's airport and police station",
        body: "A little over a year after the new law passed, the records-power has grown into a machine: no-fly and extra-screening lists now flow from Washington down to the check-in counter, terror-grant riders sit inside the sheriff's budget sheet, and local police collect case numbers from the feds as 'liaison duty.' In the community people have started talking quietly: who got pulled aside at the gate for half an hour, whose license came back after one extra round of review. How you stood on this line in the last act — the feds kept a ledger, and so did the locals. Tonight both ledgers knock on your door.",
        brief: {
          lede: "The law is no longer paper. It is the person held at the gate, and the clause waiting for your signature.",
          known: [
            "The terror grant carries riders; the money needs your signature.",
            "The list lives with the feds; locals only see the results.",
            "On the federal-records line, both sides remember how you acted."
          ],
          rumor: [
            "Some say the list passed a hundred thousand names, most of them wrong.",
            "Some say the sheriff volunteered for the cases to chase the money."
          ],
          unknown: [
            "The access you approve today will read someone's file one day.",
            "Who gets the extra look: the block remembers, the record does not."
          ],
          terms: [
            { k: "No-fly list", v: "Federal aviation watch list; criteria undisclosed." },
            { k: "Terror grant", v: "Federal money conditioned on law-enforcement cooperation." }
          ]
        },
        choices: [
          {
            id: "push",
            text: "Ride the list: claim the terror grant and the liaison post for your county",
            note: "A bet that fear converts into real infrastructure. Wrong, and your name sits on the list machine's side of the desk.",
            outcomes: {
              crit: { body: "The liaison office moves into the county building; the airport opens two more screening lanes; the grant line carries your name. At the chamber dinner they call you 'the one who takes safety seriously' — only the bartender gives you one look too many after the applause dies, and says nothing." },
              ok: { body: "The money comes, the post comes. The feds file you under 'easy to work with'; the community files you under the other column." },
              meh: { body: "You run the rounds for weeks; the grant goes to the next county. The feds thank your 'enthusiastic posture,' and the thank-you is the end of it." },
              fail: { body: "Three months into the new lanes, a shopkeeper of thirty years is pulled for questioning, and the weeklies run his photo on page one — under the clipped text of the clause you signed." },
              critfail: { body: "A federal audit finds contractors tied to you on the grant's payment list. Somebody writes the line for you: 'He does business with fear.' This time you need no opponent's ad — the neighbors repeat it themselves." }
            }
          },
          {
            id: "paper",
            text: "Cooperate, but set a rule: every list query gets filed and cleared by counsel",
            note: "A bet that paper outlasts pressure: someday someone will need a document to answer with. Risk: the feds keep their window shut when you come calling.",
            outcomes: {
              crit: { body: "Your filing form turns aside two plainly overreaching queries. Local lawyers start treating 'clear the county file first' as something they can cite — a rare shield for ordinary people, and your name is on it." },
              ok: { body: "Queries are handled; files are kept. The feds find you fussy, but every page is airtight." },
              meh: { body: "Your forms gather dust in a cabinet. Whoever was going to be checked, was checked; nobody pulls a file." },
              fail: { body: "The feds read your filing as distrust; invitations to the counter-terror briefings thin out. Locals feel safer — but safety never won a reelection." },
              critfail: { body: "A real case's trail leaves the county through a channel that bypasses your file. The report never names you, but the question 'whose rule slowed it down' is already traveling down the corridor." }
            }
          },
          {
            id: "town",
            text: "Open no new door: hold one community night meeting and hear who got the extra look",
            outcomes: {
              crit: { body: "Three hundred people sit in folding chairs at the gym and talk for forty minutes. You say nothing quotable, but starting tomorrow, anyone pulled at the gate knows whose number to call first." },
              ok: { body: "The meeting happens; the grievance gets poured out. Nothing changes, but someone listened all the way through, and that itself is remembered." },
              meh: { body: "Two dozen come; they repeat what everyone already knew. No headline picks it up; no one remembers the meeting." },
              fail: { body: "Both sides read the same meeting opposite ways: the feds call it incitement, the dailies ask 'besides a meeting, what did you do.' Your town hall becomes everyone's none." },
              critfail: { body: "That same night, something real breaks two states over. Someone digs up your meeting's minutes: 'He knew all along, and he held a meeting.'" }
            }
          }
        ]
      },

      /* 2004—2005 · 情报失实的清算，当年的表态变成账单 */
      {
        id: "ch911_blame",
        title: "The weapons were never found, and your old statement becomes a bill",
        body: "The 'hard evidence' that opened the war never landed; review report after review report prints the same sentence: it rested on flawed material. This campaign season, both parties attack from the same podium with the same line: 'Who lied to Congress back then.' The producers found your file — the endorsement you signed, or the hearing record where you asked for proof — and the anchor reads it aloud word for word, the date pinned under the chyron. This time the applause is on the other side. The only choice left is whether you take the light.",
        brief: {
          lede: "The war is in its audit period. The first line of the ledger: what each person said back then.",
          known: [
            "The review is public: the key rationale did not hold.",
            "Your position then has a transcript, a date, your signature.",
            "Your party's staff prepped you: do not explain, do not bite."
          ],
          rumor: [
            "Some say a whole tranche of raw intelligence stays classified.",
            "Some say both attack ads were written by the same hands."
          ],
          unknown: [
            "Whose name lands on the subpoena is still being negotiated.",
            "What you say tonight, next year's hearing reads verbatim."
          ],
          terms: [
            { k: "Review report", v: "Official postwar probe; admits the case for war was flawed." }
          ]
        },
        choices: [
          {
            id: "shift",
            text: "Pass the bill upward: name the officials who shopped the intelligence",
            note: "A bet that there is room for you in the attack wave too. Risk: the ledger your party keeps now records how they taught you this lesson.",
            outcomes: {
              crit: { body: "You put the line — 'they packaged maybes as certainties; we only signed' — into every evening program. The opposition concedes you half a column; the machine wishes you luck on the phone, in a tone that is not luck." },
              ok: { body: "The bill goes up and lands on a senior senator's desk. You breathe the risky breath; you appear on a blacklist's waiting page." },
              meh: { body: "You name names, but a bigger figure falls the same day. The camera crosses your face without stopping." },
              fail: { body: "A man upstairs answers with 'I asked for evidence too,' and the record shows you shut up three months before he did. The messenger fails his own audit." },
              critfail: { body: "Your 'inside, people were shaking their heads' collapses when the man who briefed you produces the originals. Now the liars' roster finally has a local-level name on it." }
            }
          },
          {
            id: "own",
            text: "Own it on the record: I believed what I should have doubted; the fault is not all above me",
            note: "A bet that owning it can itself stand up. Risk: both sides cut the same sentence into two different ads.",
            outcomes: {
              crit: { body: "You say: 'I was persuaded, and I was part of it.' That week you get hit from both sides; years later an oral history quotes this line — he said it out loud, so we could move on." },
              ok: { body: "You own the bill. The base hears a human voice; upstairs hears a breach of etiquette. You are written into both ledgers." },
              meh: { body: "Your confession prints in the same column as everyone else's confessions that week; readers cannot tell which sentence was yours." },
              fail: { body: "The other side cuts your admission into 'he admits he lied to voters' — the subject flips, the sentence is still yours. You spend three days explaining; no one listens to the end." },
              critfail: { body: "Halfway through owning it, someone asks what you personally got out of that material. You cannot answer, and the confession turns into a plea — with you alone at the defendant's table." }
            }
          },
          {
            id: "ledger",
            text: "Do not take the bait: leave the bill on the table and go finish the local work",
            outcomes: {
              crit: { body: "While the country reads your old statement aloud, you read the county budget hearing aloud. A month later the story turns the page, and 'he kept working through it' is the line your neighbors hand the reporter for free." },
              ok: { body: "You add no words and skip no errands. Nobody quotes you; nobody can use you." },
              meh: { body: "This reckoning has no line with your name in it — and this season's memory has none either." },
              fail: { body: "Silence reads as consent to both sides. The question shifts from 'what do you think' to 'did you think it,' and you never answer either form." },
              critfail: { body: "In the end even your silence gets quoted: 'He cannot even say now why he believed it then.' Not your sentence — but you are the face in the chair." }
            }
          }
        ]
      }
    ]
  }
});
