/* ============================================================================
 * CONTENT · i18n/en/reg/06-media.js
 * 中文文件 content/06-media.js（时代媒介时间轴）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · kind 与中文侧一致：medium（core.js define 的浅合并只发生在装载期；
 *     覆盖层走 engine/i18n.js 的按键深合并，boot 时并进 P.reg.medium）。
 *   · 只翻展示字段 name / note；from / to 是时代窗口，结构性，不写。
 *   · 事件卡引用媒介用的是对象键（tv / internet …），键名一律不动。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    medium: {
      print: {
        name: "Newspapers",
        note: "Party sheets and local dailies own the city's opinion; one letter in print can ruin a man."
      },
      radio: {
        name: "Radio",
        note: "A voice walks straight into the living room. One man can address the nation without a rally."
      },
      tv: {
        name: "Television",
        note: "Image beats text. Looking telegenic — and daring to go live — starts deciding elections."
      },
      cable: {
        name: "Cable News",
        note: "Twenty-four-hour channels and partisan talk hosts split public opinion into two worlds."
      },
      internet: {
        name: "the Internet",
        note: "Leaks, archives, anonymity. Information skips the newsroom now — and no one checks it."
      },
      social: {
        name: "Social Media",
        note: "Everyone is a publisher. One 140-character burst of feeling can travel farther than a speech."
      },
      shortvideo: {
        name: "Short Video",
        note: "Fifteen seconds decide life or death. The algorithm's reach is the new party whip."
      },
      deepfake: {
        name: "Synthetic Video",
        note: "Seeing is no longer believing. To deny the tape, you must first prove it isn't you."
      }
    }
  }
});
