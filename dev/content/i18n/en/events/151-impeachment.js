/* 中文文件 content/events/151-impeachment.js 的英文覆盖层 · 契约见 docs/I18N.md
 * 弹劾／逼宫（#21 M3）：白宫月决策通道上的危机卡 · wh_impeachment 一张。 */
POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "wh_impeachment",
        title: "The articles arrive: a third are ready to vote, including your own",
        body: "At midnight the House passes two articles of impeachment, worded more gently than the draft, which makes them cut deeper. The Senate majority leader leaves you one line: he can still count fifty-one votes, but he is not sure how many of the fifty-one will sit beside you on camera. Your approval has sat under the warning line for four straight months, and the investigation is still open. The White House counsel is at your left, the chief of staff at your right, and each is urging the opposite of the other.",
        brief: {
          lede: "The House Judiciary Committee passed the articles before dawn. Your approval has lain under the danger line for four straight months.",
          known: [
            "The Senate needs two-thirds to convict, and four senators of your own party have stopped speaking for you.",
            "Blaming a subordinate buys a few votes, but that man leaves carrying everything he knows.",
            "Resigning is the only path with no vote to humiliate you, and the only one you cannot walk back."
          ],
          unknown: [
            "In the deposition transcripts you never finished reading, whose name is on the last three pages."
          ]
        },
        choices: [
          {
            id: "fight",
            text: "Fight: recast this vote as what it is, a coup by your opponents, and address the nation",
            outcomes: {
              crit: { body: "Your eight-minute speech makes the party's dissenters pull their ads that same night. One more not-guilty vote, and it is cast in public." },
              ok: { body: "The Senate votes along party lines. You keep the office, and you set a precedent: next time they will be better at this." },
              meh: { body: "You win the vote, but two allies flip to abstain at the last minute. The story is that the White House merely failed to collapse on live TV." },
              fail: { body: "A senator of your own party reads page nine of the transcripts on the floor. You hear the tally settle before he is halfway through." },
              critfail: { body: "Beyond conviction, your second is asked at a presser whether the president ever told him to lie. He waits four seconds to answer. Those four seconds outweigh any single vote." }
            }
          },
          {
            id: "cut",
            text: "Cut him loose: hand over the subordinate and the files with him, to buy the swing votes",
            outcomes: {
              crit: { body: "The break is clean. He resigns first, and your lawyer turns over the part he never authorized that same night. The articles sink in committee." },
              ok: { body: "You survive the vote and keep the quiet in the West Wing. The cost: a list of who signed for whom, now only you remember." },
              meh: { body: "He is gone, but he has not shut up. By the second week the story turns to who is covering for whom." },
              fail: { body: "He shows up with a lawyer and lays two memos you signed on the same table. The cut becomes testimony." },
              critfail: { body: "The witness you hand over clears you and teaches the opposition how to ask the next question. The vote ends before sunrise the next day." }
            }
          },
          {
            id: "resign",
            text: "Skip the vote: announce your resignation before the verdict and let the country hear you finish the sentence",
            outcomes: {
              crit: { body: "Your resignation speech runs seven minutes: no defense, no reading of the list. The opposition manages only that we are all grateful." },
              ok: { body: "You leave the White House with dignity, and the vice president is sworn in half an hour after you. The history books will say: he did not wait for the vote." },
              meh: { body: "In the hours after, commentators debate one thing only: why you did not say it sooner." },
              fail: { body: "The line that you always kept a clear conscience is cut to thirty seconds, laid over footage from your own archives." },
              critfail: { body: "On the day you resign, two members hold up a new article on the steps. No one argues the transcripts anymore; all anyone asks is how many boxes of records you carried out." }
            }
          }
        ]
      }
    ]
  }
});
