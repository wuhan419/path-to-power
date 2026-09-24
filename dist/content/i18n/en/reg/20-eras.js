/* ============================================================================
 * CONTENT · i18n/en/reg/20-eras.js
 * 中文文件 content/20-eras.js（时代卡 / 黑天鹅）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md §3–§4）：
 *   · 原中文文件一个字不动，本文件只翻展示字段。
 *   · kind 与中文侧一致：era（并入 P.reg.era）、blackswan（并入 P.reg.blackswan）。
 *   · era id（"2008_CRASH" / "1980_REAGAN" …）与 brief 的年份键（"2008" / "*"）
 *     被存档与按年查表引用，一律不动；只翻值。
 *   · startYear / diff / electionCycle / pressure / scheduled 与 blackswan 的
 *     effects 都是结构/逻辑键（PROTECT），不写。
 *   · outlets 是**纯标量数组** → 整体替换，条数必须与中文一一对应；
 *     按 §4 专有名词回译（CNN / The Wall Street Journal / Breitbart…），不逐字译。
 *   · blackswan 在 reg 里是数组（挂在 era id 下）：覆盖层按 **id** 定位，顺序无关。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    era: {
      "2008_CRASH": {
        name: "The Big Short (2008)",
        intro: "The week Lehman fell, you walked out of school. The whole system was bleeding, and the opportunity lay buried in the wreckage.",
        outlets: ["The New York Times", "The Wall Street Journal", "Fox News", "The Huffington Post"],
        brief: {
          "2008": "The subprime crisis erupts in full; two of the three big investment banks vanish. Washington scrambles a bailout, and public fury splits in two directions.",
          "2009": "The Tea Party rises at town halls nationwide; Occupy Wall Street takes Zuccotti Park by year's end.",
          "2010": "Republicans sweep the midterms; Dodd-Frank passes and regulation tightens.",
          "2012": "Election year. The economy recovers slowly, and the wealth gap becomes the central issue.",
          "2016": "A populist wave hits both parties at once. An election no one saw coming.",
          "*": "The post-crisis world is still shaking; opportunity and trap grow side by side."
        }
      },
      "1980_REAGAN": {
        name: "Conservative Resurgence (1980)",
        intro: "Tax cuts, an arms buildup, and one line: 'Government is not the solution.' The last stretch of the Cold War—and the re-concentration of wealth.",
        outlets: ["The Wall Street Journal", "Time", "The Fox", "ABC News"],
        brief: {
          "1980": "Election year. Stagflation and the Iran hostage crisis crush the incumbent.",
          "1981": "Tax cuts and deregulation; unions and the industrial belt begin to bleed.",
          "1987": "Black Monday—the Dow drops 20% in a day, and regulators are caught flat-footed.",
          "*": "An upbeat narrative and a widening gulf between rich and poor grow side by side."
        }
      },
      "1990_GULF": {
        name: "The Gulf & the End of the Cold War (1990)",
        intro: "A wall came down, and a war began. You stand in the fading warmth of 'the end of history,' not knowing the next attack is a decade away.",
        outlets: ["The New York Times", "CNN", "The Washington Post", "Newsweek"],
        brief: {
          "1990": "Iraq marches into Kuwait; the U.N. sets a deadline and oil prices spike.",
          "1991": "Desert Storm. War goes live on TV, and public opinion is steered in real time on the screen.",
          "1992": "Election year. The economy sags, and the incumbent is the butt of every joke.",
          "*": "The brief confidence of a unipolar moment, with a dark thread of new threats running through it."
        }
      },
      "2001_WARONTERROR": {
        name: "The War on Terror (2001)",
        intro: "Two planes rewrote every rule. The Patriot Act, the color-coded alert, and a war with no end—all of it begins today.",
        outlets: ["The New York Times", "Fox News", "The Washington Post", "CNN"],
        brief: {
          "2001": "September 11. Congress authorizes the use of force, and homeland security is redefined.",
          "2003": "The invasion of Iraq. The WMD rationale is later overturned.",
          "*": "Fear becomes a political resource; every election asks the same question—who can keep you safer."
        }
      },
      "2016_SOCIAL": {
        name: "Social-Media Anti-Establishment (2016)",
        intro: "One tweet outweighs a speech. The old machines fail—whoever masters attention can flip the table.",
        outlets: ["Twitter", "Fox News", "Breitbart", "The New York Times"],
        brief: {
          "2016": "Election year. Populism hits both parties, and the polls miss across the board.",
          "2018": "Short video and algorithms become the main battleground; fact-checking can't outrun the retweet.",
          "2020": "A pandemic-year election. Mail-in ballots and count disputes tear trust open again.",
          "*": "Attention turns into currency: you don't have to be right, only shared."
        }
      }
    },
    blackswan: {
      "2008_CRASH": [
        { id: "lehman", title: "The Lehman Moment",
          body: "You stare at the TV as a bank you assumed was 'too big to fail' collapses before midnight. The market freezes in an instant." },
        { id: "tape", title: "An Anonymous Tape",
          body: "An old recording is mailed, unattributed, to a newsroom. On it is a 'private' promise you once made." },
        { id: "opponent_quit", title: "Rival Quits the Race",
          body: "Your biggest campaign opponent suddenly withdraws over health, and the battlefield falls empty." }
      ]
    }
  }
});
