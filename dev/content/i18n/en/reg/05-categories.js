/* ============================================================================
 * CONTENT · i18n/en/reg/05-categories.js
 * 中文文件 content/05-categories.js（事件类型 / 量级标签）的英文覆盖层。
 *
 * 契约（详见 docs/I18N.md）：
 *   · 原中文文件一个字不动，本文件只放**要覆盖的字段**。
 *   · kind 与中文侧一致：category / grade —— 都并进活注册表 P.reg.category、
 *     P.reg.grade；引擎取中文名走 categoryName()/gradeName()，读的就是 .name。
 *   · 只翻展示字段 name。ink / base / art（配色与配图函数）、cls（样式类）、
 *     weight（抽卡权重）都是结构键，一律不写。
 *   · 事件卡引用类型/量级用的是对象键（crisis / major …），键名一律不动。
 *
 * 【关于派系名 未随本分片提交】派系定义并不在 05-categories.js，而在
 *   content/01-config.js（红名单，不许改），本可照 I18N.md §3 的示例以同 kind
 *   （faction → P.reg.faction）在覆盖层补英文，实测机制可行；但
 *   tools/validate.js:1920 的断言 `fac.press 应翻成 媒体-4` 硬编码了**活注册表**
 *   读出的中文名，而内容覆盖层是 applyLang 单向并入、withZh() 只回退 UI 层——
 *   --lang=en 校验必红。tools/ 属红名单不可改，故 faction 覆盖段暂时撤回，
 *   待门禁侧把该断言改成按 P.factionName() 取值后，在本分片补回 faction 段
 *   （英文名单见 w33 回报）。
 * ==========================================================================*/

POTUS.define("l10n", {
  lang: "en",
  content: {
    category: {
      general:    { name: "General" },
      career:     { name: "Career" },
      campaign:   { name: "Campaign" },
      political:  { name: "Party Politics" },
      govt:       { name: "Constituent Work" },
      media:      { name: "Public Opinion" },
      scandal:    { name: "Scandal" },
      finance:    { name: "Money" },
      romance:    { name: "Affairs" },
      civil:      { name: "Civil Rights" },
      crisis:     { name: "Crisis" },
      foreign:    { name: "Foreign & Security" },
      shady:      { name: "Gray Trade" }
    },
    grade: {
      major: { name: "Major Event" },
      mid:   { name: "Medium Event" },
      minor: { name: "Minor Event" }
    }
    /* 注：派系（faction）名不在本分片提交，原因见文件头注释与 w33 回报。 */
  }
});
