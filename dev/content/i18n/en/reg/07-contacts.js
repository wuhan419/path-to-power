/* ============================================================================
 * CONTENT · i18n/en/reg/07-contacts.js
 * 中文文件 content/07-contacts.js（人脉登记表）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · kind 与中文侧一致：contact（P.reg.contact）。
 *   · 对象键（brother / fixer / oneill …）是事件 req / effects / forget 的
 *     引用锚点，一律不动；只翻展示字段 name / role / tag / note。
 *   · 三位 1980 年代真实人物用英文原名（Tip O'Neill / Jesse Jackson / Lee Atwater）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    contact: {
      brother: {
        name: "the Brother", role: "Mechanic · union fringe", tag: "Family",
        note: "Blood is the one relation you cannot return. He lends without asking what for - and he remembers."
      },
      fixer: {
        name: "the Fixer", role: "The man with doors to open", tag: "Connection",
        note: "Nobody can say who he really works for. He does not solve problems; he introduces you to whoever does."
      },
      shark: {
        name: "the Moneylender", role: "The neighborhood bank", tag: "Money",
        note: "As long as you pay on time, he is far politer than any bank. The interest is written out loud, never on paper."
      },
      doctor: {
        name: "the Clinic Doctor", role: "Chinatown health center", tag: "Gray",
        note: "His signature can keep a man sick for three days - or make a record look like it never existed."
      },
      union_boss: {
        name: "the Union Boss", role: "Local labor council", tag: "Street",
        note: "One word from him and eight thousand people stay home. He does not need votes; he decides where they go."
      },
      preacher: {
        name: "the Preacher", role: "Southside Baptist", tag: "Community",
        note: "He owns a neighborhood's Sunday morning. What you say from his pulpit counts more than anything on TV."
      },
      columnist: {
        name: "the Columnist", role: "Page seven of the metro paper", tag: "Opinion",
        note: "One pen, four short sentences. He can build you or bury you, and both come off the same nib."
      },
      producer: {
        name: "the TV Producer", role: "Local station newsroom", tag: "Media",
        note: "Airtime is power. What he sells is not a camera slot - it is permission to look the part."
      },
      lobbyist: {
        name: "the Lobbyist", role: "The building across from the statehouse", tag: "Capital",
        note: "He knows every legislator's price - and which ones have never been offered one. Those cost more."
      },
      fed: {
        name: "the Fed", role: "Field agent for this district", tag: "Risk",
        note: "He keeps a drawer full of men like you. He decides the order they go in."
      },
      oneill: {
        name: "Tip O'Neill", role: "Speaker of the House (Boston)", tag: "Mentor",
        note: "Every door in the House swings past him. He will teach you the rules - and expect you to owe him for it. Nobody lets his debts rot."
      },
      jackson: {
        name: "Jesse Jackson", role: "Civil-rights leader · Rainbow Coalition", tag: "Grassroots",
        note: "He can turn a block nobody registered into a voting machine. He does not want your money - he wants you knocking on every kitchen door yourself."
      },
      atwater: {
        name: "Lee Atwater", role: "National operative", tag: "Fixing",
        note: "He breaks an election into the one thing your opponent dreads being known. He never tells you to get dirty - he just shows you the job someone has to do."
      }
    }
  }
});
