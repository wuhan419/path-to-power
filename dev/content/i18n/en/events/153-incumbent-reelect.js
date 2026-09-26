/* 中文文件 content/events/153-incumbent-reelect.js 的英文覆盖层 · 契约见 docs/I18N.md
 * 在任总统连任战（#21 M2）· 链 camp_reelect 四幕：
 * camp_re_announce / camp_re_primary / camp_re_debate / prog_reelect。 */
POTUS.define("l10n", {
  lang: "en",
  content: {
    event: [
      {
        id: "camp_re_announce",
        title: "Announcing a run for reelection",
        body: "Filing has not even closed and the machine is already running. You have not said you will run, and inside the party someone is already rearranging the seating for after you. Step to the microphones and say the line, that you intend to seek reelection - only after you say it does the real fight begin. And set the announcement too high, and every move of the next three months gets measured against it.",
        choices: [
          {
            id: "early_tour",
            text: "Ride one bus through the early states, starting with handshakes in diner kitchens",
            outcomes: {
              crit: { body: "Your motorcade lights a fuse across the early states. Local front pages run your handshake photos, and the people counting seats quietly pull their lists back." },
              ok: { body: "You hit every stop you needed to, and the county parties warm up again." },
              meh: { body: "You spent the bus money and got the applause, but the press cares more about why you are in such a hurry to be on the road." },
              fail: { body: "You turn two stops into a routine progress report, and the local reporters yawn for the voters." },
              critfail: { body: "In a small-town diner you are pressed face to face on a promise you never kept, and the clip goes national. This does not look like an announcement; it looks like a flight." }
            }
          },
          {
            id: "second_new_deal",
            text: "Write the speech as a second New Deal: no past, only a price for the next four years",
            outcomes: {
              crit: { body: "A platform too ambitious to hide takes back the agenda. No one talks about your first years now, only whether you dare ask for four more." },
              ok: { body: "The blueprint holds, and at least this round you set the questions first." },
              meh: { body: "Big promises, soft landing: all listeners remember is that you mean to sign bigger." },
              fail: { body: "The papers print your unfinished first-term list beside the new platform, and the two columns line up exactly." },
              critfail: { body: "The second New Deal becomes a national joke: even your own party's policy head says in public, finish the first one." }
            }
          },
          {
            id: "member_letter",
            text: "Skip the stage: send one letter from the White House to every member of the party",
            outcomes: {
              crit: { body: "A restrained letter gets forwarded word for word instead, and the party's elders say: this is how a person in the Oval Office should sound." },
              ok: { body: "Everyone who needed warming is warmed, and no one finds an opening to talk back." },
              meh: { body: "The letter goes out, makes little splash, and the race neither rises nor falls." },
              fail: { body: "The opposing camp clips one hollow line from the letter and loops it for a full week." },
              critfail: { body: "A lukewarm letter reads as guilt: the commentators all ask why a sitting president dares not announce in person." }
            }
          }
        ]
      },
      {
        id: "camp_re_primary",
        title: "A challenger inside your own party",
        body: "The sharpest knife in the primary is not across the aisle. A challenger under forty squeezes into the race, and with no record of his own to defend, his whole campaign rides one line: he does not attack your policies, he attacks the clock - that is already a previous generation's business. The weaknesses you have spent these years collecting come down to one question: whether to use them, and what you want to keep in the party. And even if you crush him, the first people to cross the convention floor to shake your hand will still be his faction.",
        choices: [
          {
            id: "crush",
            text: "Meet him yourself: force a primary debate and beat him until he quits",
            outcomes: {
              crit: { body: "On the debate stage you pile real accomplishments on him until he cannot answer one of your own old bills; calls for him to quit start in his own camp." },
              ok: { body: "You win this family feud head-on. He is still on the ballot, but no one is listening anymore." },
              meh: { body: "You did not finish him, and he got the national stage for free, borrowing your spotlight to become a familiar face." },
              fail: { body: "You lose your grace on stage and shout at him what he knows about governing, and the voters get angry on the young man's behalf." },
              critfail: { body: "Every hard hit on one of your own gets cut into one ad: you win the primary's optics and lose the party's people." }
            }
          },
          {
            id: "party_machine",
            text: "Stay out yourself: let the party machine shut him out with petitions and rules",
            outcomes: {
              crit: { body: "Petition thresholds, debate qualification, delegate counts: run the loop and he never reaches the final round, without you saying a word." },
              ok: { body: "The rules do the dirty work for you. The machine notes the favor, and you owe it one." },
              meh: { body: "You shut him below the threshold, but the photo of him standing above it runs on every front page." },
              fail: { body: "The machine grinds too loudly, and the whole country hears it. Independents ask: is this still the party that lets ordinary people speak?" },
              critfail: { body: "The note changing the rules gets photocopied exactly and printed. With your own hands the machine becomes your target, and the establishment starts shopping privately for a successor." }
            }
          },
          {
            id: "only_general",
            text: "Refuse the fight: change the schedule not a word, keep all your fire across the aisle",
            outcomes: {
              crit: { body: "You talk only about the other side's nominee the whole way; the young challenger swings at you and hits a wall, and in three months no one says his name." },
              ok: { body: "You deny him the part of an opponent, and he never becomes one." },
              meh: { body: "You dodge the blow, and you miss the chance to pull your party's people back." },
              fail: { body: "Your silence reads as fear, and his fundraising sets a record for the party's age." },
              critfail: { body: "The line that he dares not answer even his own challenger becomes the most-repeated sentence in the delegates' lounge." }
            }
          }
        ]
      },
      {
        id: "camp_re_debate",
        title: "The second presidential debate",
        body: "There are still hundreds of millions of eyes on the stage, and the set looks exactly as it did years ago. The new face across from you opens with: Mr. President, let's talk about these past years. He did not come to argue policy; he came to collect on your years. And what the audience remembers is usually not your record, but the follow-up you could not answer.",
        choices: [
          {
            id: "incumbent_calm",
            text: "Lean on the incumbent's steadiness: governing is your confidence",
            outcomes: {
              crit: { body: "You speak with the ease only someone who has sat in that chair has. The more the other man rushes, the steadier you get, and afterward one line remains in the commentary: this is what a president looks like." },
              ok: { body: "You never stumble once, and every attack comes off you like a bounce." },
              meh: { body: "You are steady as always and just as bland; no one finds a mistake, and no one remembers anything you said." },
              fail: { body: "Your ease gets cut as arrogance: he cannot even be bothered to answer the newcomer straight." },
              critfail: { body: "Pressed three times on the same old issue, your face falls. The minute of silence loops through the next morning's shows." }
            }
          },
          {
            id: "open_ledger",
            text: "Argue that what you have done is bigger: spread the record open on stage",
            outcomes: {
              crit: { body: "One by one you lay out these years' work until the opponent cannot get a word in, and at the end the moderator is reading your list." },
              ok: { body: "The record smothers the newcomer's slogans: every thing he questions already has a signature behind it." },
              meh: { body: "The ledger is thick and the audience's patience is short. You win on substance and lose on the ratings." },
              fail: { body: "In the ledger you opened is exactly one unfinished page, and the opponent turns to it right there." },
              critfail: { body: "The cases you pointed to in pride become, that same night, the other side's research target list, and in the week after the new dirt beats your old work on the front pages." }
            }
          },
          {
            id: "read_script",
            text: "Read from the script: do not engage on a single word",
            outcomes: {
              crit: { body: "You read the script at a steady temperature, and every jab misses; no one is thrilled after, but no one remembers how he won it either." },
              ok: { body: "No stumble, no spark taken, ninety minutes landed safely." },
              meh: { body: "You finish the script and leave, like closing out an official duty." },
              fail: { body: "The other man sets the stage on fire and you just read the paper; for the first time the audience sees a candidate and an official." },
              critfail: { body: "No one remembers the words in a debate where both sides read, but every column says the same thing: there is no fire left in the incumbent's eyes." }
            }
          }
        ]
      },
      {
        id: "prog_reelect",
        title: "Election day: reelection",
        body: "The lines at the polls form before dawn. Tonight voters settle the account on your years: either a stamp to renew them, or a reckoning in your face. Incumbents win reelection not with momentum, but with the pages no one dug up.",
        choices: [
          {
            id: "run",
            text: "Run all the way: put my years in front of the voters for an audit",
            outcomes: {
              crit: { body: "By the midnight count the picture is set: the voters have stamped your years, and the reelection flag goes back on the White House lawn." },
              ok: { body: "On the late podium you win a narrow, clean victory; the audit is done, and the voters say four more years." },
              meh: { body: "You do not win well, the margin is thin enough to see through, but the Electoral College lands on your side in the end." },
              fail: { body: "Several key states turn red before dawn. You step to the podium and read the concession speech written long ago." },
              critfail: { body: "You lose the popular vote and the Electoral College in one night, and everything from your years gets read back in reverse. The reckoning's first entries go down tonight." }
            }
          },
          {
            id: "local_issues",
            text: "Bet the ballot on local issues: talk groceries, not yourself",
            outcomes: {
              crit: { body: "You hide behind food and rent, and the housewives of swing counties say every right word for you, and the base quietly changes color." },
              ok: { body: "A campaign about everything but yourself turns into a local-issues referendum; the direction holds, only the turnout is flat." },
              meh: { body: "Local issues heat up, but the voters know the ballot is still a trust vote in you, and you did not come to make it." },
              fail: { body: "The phrase that he dares not talk about himself outruns every local issue." },
              critfail: { body: "The deflection gets called out on the spot, and in the last week the whole country has one issue left: why he ran." }
            }
          },
          {
            id: "step_aside",
            text: "Do not seek reelection: take the stage and back the newcomer in your own party",
            outcomes: {
              crit: { body: "You give a stepping-aside speech that history departments will keep quoting. The country stands, and every faction in the party owes you for the way you left." },
              ok: { body: "A clean handoff: from today someone else keeps telling your legacy, and the party's goodwill is real." },
              meh: { body: "Stepping aside makes news for three days; the new administration goes its own way, and your weight is left for the history books to judge." },
              fail: { body: "You try to exit gracefully, but everyone reads it as you being pushed: no legacy banked, only a storehouse of suspicion." },
              critfail: { body: "The succession fight steals the front page of your farewell, and in your last briefing room only one question is left: who pushed you out." }
            }
          }
        ]
      }
    ]
  }
});
