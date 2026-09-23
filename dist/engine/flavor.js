/* ============================================================================
 * POTUS ENGINE · flavor.js
 * 「时代风味词典 + 占位符替换」——让可重复发生的事件每次都换一副真实面孔。
 * --------------------------------------------------------------------------
 * 痛点：低层级可及的事件池太薄，同一张 minor 卡（如 boon1980_grassroots）窗口一
 *   滑过就原样重演，玩家连续两次看到一模一样的描述，体验极差。
 * 解法：源卡里把"组织名 / 地点 / 说法 / 报刊"等可替换细节写成 {大写} 占位符，
 *   抽取时按当年从 content/09-flavor.js 登记的词典里挑一个真实名词填进去。
 *   同一张卡多演几次 → 换城市、换组织、换口径，不再撞脸。
 *
 * 契约（engine 只认这套）：
 *   · 词典结构  reg.flavor[TOKEN] = [ {minYear, maxYear, text}, ... ]（见 define("flavor",…)）
 *   · 占位符    {TOKEN}，TOKEN = 大写字母开头，后接大写字母/数字/下划线；如 {ORG} {PLACE} {MEET} {PUB}
 *   · 内置词    {HOME}/{STATE}/{CITY}/{DISTRICT} 直接取主角家乡（见 content/12-states.js）
 *   · 只在**副本**上替换，绝不含占位符的原卡与源对象一律原样返回（防污染）
 *   · 同一事件实例内同名 token 复现同一个值（{PLACE} 出现两次 → 同一个城市）
 *   · token 里可再嵌 token（如 {MEET} 的候选文本含 {PLACE}），有限深度展开
 *
 * 挂钩：engine/events.js 的 drawEvent 在 P.realize(...) 之后统一调 P.flavorFill(...)，
 *   dyn 与非 dyn 卡、随机与定点/竞选/公务通道全覆盖；只改文本，绝不碰 effects。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;

  const TOKEN_RE = /\{([A-Z][A-Z0-9_]*)\}/g;
  const MAX_DEPTH = 3;

  /* 结算逻辑字段：这些键下的子树不参与占位符替换（里面的 {..} 若有也不是文案）。
     其余字段（title/body/standfirst/brief/choices.text/note/outcomes.body…）才是要"变脸"的文案。 */
  const SKIP = {
    effects: 1, req: 1, cost: 1, mods: 1, flags: 1, notFlags: 1,
    contact: 1, contacts: 1, id: 1, attrKey: 1, category: 1, grade: 1,
    valence: 1, era: 1, states: 1, month: 1, weight: 1, tierMin: 1, tierMax: 1,
    fromYear: 1, toYear: 1, minYear: 1, maxYear: 1, base: 1, dyn: 1, unique: 1,
    track: 1, stance: 1, party: 1, after: 1, art: 1, artKey: 1, photo: 1,
    once: 1, cond: 1, tier: 1, tierRaw: 1, setTrack: 1, voters: 1, chore: 1
  };

  /* 主角家乡的内置词。州定义可带 city / district（见 content/12-states.js）；
     没有就退回州名，再没有退回中性词，保证永不出现裸 {HOME}。 */
  function builtin(tok) {
    const G = P.G;
    const def = (G && G.state && P.stateDef) ? P.stateDef(G.state) : null;
    const st = (def && def.name) || (G && G.state) || "";
    switch (tok) {
      case "STATE": return st || "本州";
      case "CITY": return (def && def.city) || st || "本市";
      case "DISTRICT": return (def && def.district) || (def && def.districtName) || "本选区";
      case "HOME": {
        const city = (def && def.city) || "";
        if (city && st) return city + "，" + st;
        return city || st || "家乡";
      }
      default: return null;
    }
  }

  /* 解析一个 token，返回它应替换成的（已就地展开嵌套 token 的）文本；无法解析返回 null。 */
  function resolve(tok, ctx) {
    if (Object.prototype.hasOwnProperty.call(ctx.cache, tok)) return ctx.cache[tok];
    if (ctx.depth >= MAX_DEPTH) return null;

    let val = null;
    const bi = builtin(tok);
    if (bi != null) {
      val = bi;
    } else {
      const list = P.reg.flavor && P.reg.flavor[tok];
      if (list && list.length) {
        const cands = [];
        for (let i = 0; i < list.length; i++) {
          const c = list[i];
          if (!c) continue;
          if (typeof c === "string") { cands.push(c); continue; }
          if (c.minYear != null && ctx.year < c.minYear) continue;
          if (c.maxYear != null && ctx.year > c.maxYear) continue;
          if (c.text) cands.push(c.text);
        }
        if (cands.length) val = P.pick(cands);
      }
    }
    if (val == null) { ctx.cache[tok] = null; return null; }   // 未知 token：原样保留

    /* 候选文本自身可能再含 token —— 用同一份 cache 递归展开，保证一致且不发散。 */
    ctx.depth++;
    const filled = fillString(val, ctx);
    ctx.depth--;
    ctx.cache[tok] = filled;
    return filled;
  }

  function fillString(s, ctx) {
    if (s.indexOf("{") < 0) return s;
    return s.replace(TOKEN_RE, function (m, tok) {
      const r = resolve(tok, ctx);
      return r == null ? m : r;                     // 解析不到 → 保留原占位符（校验期可见）
    });
  }

  /* 写时复制遍历：某子树没被改动就返回原引用，改动过才新建容器 —— 于是"无占位符"的卡零分配、
     原封不动返回，"有占位符"的卡也只复制被改到的那几层，绝不触碰源卡。 */
  function walk(node, ctx) {
    if (typeof node === "string") return fillString(node, ctx);
    if (Array.isArray(node)) {
      let out = null;
      for (let i = 0; i < node.length; i++) {
        const r = walk(node[i], ctx);
        if (r !== node[i]) { if (!out) out = node.slice(); out[i] = r; }
      }
      return out || node;
    }
    if (node && typeof node === "object") {
      let out = null;
      for (const k in node) {
        if (SKIP[k]) continue;
        const r = walk(node[k], ctx);
        if (r !== node[k]) { if (!out) out = Object.assign({}, node); out[k] = r; }
      }
      return out || node;
    }
    return node;
  }

  /* ---------- 对外入口 ----------
   * 抽中事件、realize 展开之后调一次。无 '{' 的卡（绝大多数固定大事件）直接原样返回，
   * 零开销；有占位符的卡在副本上填词。 */
  P.flavorFill = function (ev) {
    if (!ev || typeof ev !== "object") return ev;
    if (!hasBrace(ev)) return ev;                   // 快速预筛：整卡没有 '{' → 不用走一遍遍历
    const G = P.G;
    const ctx = {
      year: (G && G.year) || 0,
      cache: {},
      depth: 0
    };
    return walk(ev, ctx);
  };

  /* 轻量探测：结构里是否至少有一个字符串含 '{'。SKIP 里的键不下探。 */
  function hasBrace(node) {
    if (typeof node === "string") return node.indexOf("{") >= 0;
    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i++) if (hasBrace(node[i])) return true;
      return false;
    }
    if (node && typeof node === "object") {
      for (const k in node) { if (SKIP[k]) continue; if (hasBrace(node[k])) return true; }
      return false;
    }
    return false;
  }
})();
