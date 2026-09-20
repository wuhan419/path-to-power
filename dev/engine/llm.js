/* ============================================================================
 * POTUS ENGINE · llm.js
 * 可选的大模型适配层 —— 「让 AI 去润色，或者另写一段」。
 *
 * 三条铁律（这个文件存在的全部理由）：
 *
 *   1) 【离线优先】游戏本身永远不依赖网络。引擎先用模板把文字拼出来、先渲染给
 *      玩家看；模型回来了才替换。模型不回、超时、报错、被墙 —— 玩家看到的仍是
 *      一段完整的话，只是没有被润色。
 *
 *   2) 【绝不抛错、绝不阻塞】所有失败都在内部消化成一句提示，界面照常走。
 *      这个游戏要能双击 file:// 直接玩，网络是"锦上添花"，不是"必需品"。
 *
 *   3) 【密钥不进代码】endpoint / model / apiKey 全部存在浏览器 localStorage 里，
 *      由玩家自己在设置里填。仓库里不存任何凭据，也不会把密钥写进 prompt。
 *
 * 接口：OpenAI 兼容的 /chat/completions 为主，另外兼容几种常见的返回形状
 *      （见 extractText），并提供"自定义请求头"应付别的网关。
 *
 * 关于 file:// 与跨域：浏览器的 fetch 会带上 Origin，多数厂商的接口不会给它放行，
 * 所以直接用 file:// 双击打开时，很可能被 CORS 拦下。这不是本文件的 bug。
 * 解决办法（任选）：用 python3 -m http.server 起个本地服务；或者填一个你自己
 * 搭的转发地址。设置面板里会把这句话原样告诉玩家。
 * ==========================================================================*/
"use strict";
(function () {
  const P = window.POTUS;
  if (!P) return;

  const CFG_KEY = "potus_llm";
  const CACHE_KEY = "potus_llm_cache";
  const CACHE_MAX = 60;                 // 最多缓存多少条润色结果（按写入时间淘汰）

  const DEFAULTS = {
    enabled: false,
    endpoint: "https://api.openai.com/v1/chat/completions",
    model: "gpt-4o-mini",
    apiKey: "",
    temperature: 0.9,
    maxTokens: 600,                      // 260 个汉字在部分分词器下会顶到 400 截断
    timeoutMs: 60000,                    // 散文生成 20-40s 是常态（DeepSeek-V3.2 实测），20s 必超时
    autoPolish: false,                  // 开着的话，静好岁月一渲染就去润色
    extraHeaders: ""                    // JSON 字符串，给特殊网关用（如自定义鉴权头）
  };

  /* 常见服务商预设：选中即填充 地址+模型（key 不自动填——那是你自己的秘密）。
     内容团队可以在自己包里 POTUS.define("llmPreset", {...}) 追加。 */
  const PRESETS = Object.assign({
    siliconflow_ds: { name: "硅基流动 · DeepSeek-V3.2", endpoint: "https://api.siliconflow.cn/v1/chat/completions", model: "deepseek-ai/DeepSeek-V3.2" },
    siliconflow_qwen: { name: "硅基流动 · Qwen2.5-7B（快/便宜）", endpoint: "https://api.siliconflow.cn/v1/chat/completions", model: "Qwen/Qwen2.5-7B-Instruct" },
    deepseek_official: { name: "DeepSeek 官方", endpoint: "https://api.deepseek.com/chat/completions", model: "deepseek-chat" },
    openai: { name: "OpenAI", endpoint: "https://api.openai.com/v1/chat/completions", model: "gpt-4o-mini" },
    custom: { name: "自定义…", endpoint: "", model: "" }
  }, (POTUS.reg && POTUS.reg.llmPreset) || {});

  const L = P.llm = {};
  L.presets = PRESETS;

  /* ---------------- 配置（只存本地） ---------------- */
  L.defaults = DEFAULTS;
  L.config = function () {
    let raw = null;
    try { raw = JSON.parse(localStorage.getItem(CFG_KEY) || "null"); } catch (e) { raw = null; }
    return Object.assign({}, DEFAULTS, raw || {});
  };
  L.setConfig = function (patch) {
    const next = Object.assign(L.config(), patch || {});
    try { localStorage.setItem(CFG_KEY, JSON.stringify(next)); } catch (e) { }
    return next;
  };
  L.clearConfig = function () { try { localStorage.removeItem(CFG_KEY); } catch (e) { } };
  /* 配好了没有：启用 + 填了地址。没配好时调用方一律走本地模板。 */
  L.ready = function () {
    const c = L.config();
    return !!(c.enabled && c.endpoint && String(c.endpoint).indexOf("http") === 0);
  };
  /* 本局已经用掉几次（受 balance.aiCallCap 限制，防止一局把额度烧光） */
  L.used = function () {
    return (P.G && P.G.aiState && P.G.aiState.callsUsed) || 0;
  };
  L.cap = function () { return P.balance().aiCallCap == null ? 80 : P.balance().aiCallCap; };
  L.left = function () { return Math.max(0, L.cap() - L.used()); };

  /* ---------------- 缓存：同样的 prompt 不重复花钱 ---------------- */
  function hash(s) {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }
  L.hash = hash;

  L.readCache = function () {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}") || {}; } catch (e) { return {}; }
  };
  function writeCache(obj) {
    const keys = Object.keys(obj);
    if (keys.length > CACHE_MAX) {
      keys.sort(function (a, b) { return (obj[a].t || 0) - (obj[b].t || 0); });
      while (keys.length > CACHE_MAX) delete obj[keys.shift()];
    }
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(obj)); } catch (e) { }
  }
  L.cached = function (key) {
    const c = L.readCache();
    return c[key] ? c[key].text : null;
  };
  L.cacheSize = function () { return Object.keys(L.readCache()).length; };
  L.clearCache = function () { try { localStorage.removeItem(CACHE_KEY); } catch (e) { } };
  L.CACHE_MAX = CACHE_MAX;
  /* 写一条缓存（超过上限就按写入时间淘汰最旧的）。
     单独暴露出来是为了能在测试里直接验证淘汰行为，不用假装发一次网络请求。 */
  L.putCache = function (key, text) {
    const c = L.readCache();
    c[key] = { t: Date.now(), text: text };
    writeCache(c);
    return Object.keys(c).length;
  };

  /* ---------------- 把游戏状态写成一段"设定"，交给模型 ---------------- */
  L.stateBrief = function (extra) {
    const G = P.G;
    if (!G) return "";
    const era = (P.reg.era[G.era] || {}).name || G.era;
    const track = (P.reg.track[G.track] || {}).name || G.track || "";
    const party = (P.reg.party[G.party] || {}).name || "";
    const stance = (P.reg.stance[G.stance] || {}).name || "";
    const origin = (P.reg.origin[G.origin] || {}).name || "";
    const cts = P.myContacts().slice(0, 6).map(function (c) {
      return c.name + (c.role ? "（" + c.role + "）" : "") + (c.favor >= 20 ? "[关系近]" : c.favor <= -20 ? "[有嫌隙]" : "");
    });
    /* 这个年代"还没有"的媒介，明确列出来，避免模型在 1960 年写出智能手机 */
    const later = [];
    for (const k in P.reg.medium) if (!P.mediaAvail(k)) later.push(P.mediumName(k));
    const now = P.mediaNow().map(function (m) { return m.name; });

    const flags = (G.flags || []).filter(function (f) { return f.indexOf("bs_") !== 0; });
    const tagNames = P.balance().tagNames || {};
    const tagText = flags.slice(0, 8).map(function (f) { return tagNames[f] || f; });

    const lines = [
      "姓名：" + G.name + (origin ? "（" + origin + "出身）" : ""),
      "年代：" + era + "，此刻是 " + G.year + " 年 " + (G.month || 1) + " 月",
      "年龄：" + G.age,
      "身份：" + [track, party + stance].filter(Boolean).join(" " ) + "，权力层级 T" + G.tier,
      "身体与名声：健康 " + G.hp + "／100，声望 " + G.rep + "／100",
      "钱包与筹码：个人资金约 " + Math.round(G.fun / 1000) + " 千美元，手上把柄 " + (G.lev || 0) + " 份",
      "认识的人：" + (cts.length ? cts.join("、") : "还没有什么靠得住的人"),
      "身上的事：" + (tagText.length ? tagText.join("、") : "没有特别的事"),
      "这个年代已有的传播方式：" + (now.length ? now.join("、") : "报纸"),
      "这个年代还不存在（绝对不要出现）：" + (later.length ? later.join("、") : "—")
    ];
    if (extra) lines.push(extra);
    return lines.join("\n");
  };

  /* ---------------- prompt 组装（纯函数，便于单测） ---------------- */
  const STYLE_RULES = [
    "用第二人称「你」来写，像是在替这个人记一段日记。",
    "只写平静的日常：时令天气、手头的事、家里、心里。不要写任何戏剧性事件、冲突、转折、悬念。",
    "不要出现这个年代还不存在的东西。不要出现任何具体数值（钱数、百分比、属性）。",
    "不要用 markdown，不要小标题，不要用引号把整段包起来。"
  ];

  L.buildPrompt = function (kind, ctx) {
    ctx = ctx || {};
    const brief = L.stateBrief(ctx.extra);
    const texts = (ctx.texts || []).map(function (t) { return t.text; }).filter(Boolean).join("\n");
    const months = (ctx.months || []).join("、");

    if (kind === "vignette_polish") {
      return {
        system: "你是一位中文小说家，擅长写克制、有年代感的日常散文。你只做润色，不改变事实。",
        user: "【人物设定】\n" + brief + "\n\n" +
          "【引擎已经按素材拼出的一段草稿，月份：" + (months || "本月") + "】\n" + texts + "\n\n" +
          "【你的任务】在完全不改变其中事实与细节的前提下，把这段草稿润色成更好的中文散文。\n" +
          "要求：\n" + STYLE_RULES.map(function (r, i) { return (i + 1) + ". " + r; }).join("\n") + "\n" +
          "5. 长度 160–260 字，分 2–3 个自然段。"
      };
    }
    if (kind === "vignette_fresh") {
      return {
        system: "你是一位中文小说家，擅长写克制、有年代感的日常散文。",
        user: "【人物设定】\n" + brief + "\n\n" +
          "【你的任务】写一段这个月的「静好岁月」——这个人没有遇到任何大事的一个月，他是怎么过的。\n" +
          "要求：\n" + STYLE_RULES.map(function (r, i) { return (i + 1) + ". " + r; }).join("\n") + "\n" +
          "5. 只写 " + (months || "本月") + " 这一个月，长度 160–260 字，分 2–3 个自然段。\n" +
          "6. 可以从「" + (texts.split("\n")[0] || "时令") + "」这样的具体细节入手，但不要照抄。"
      };
    }
    /* 通用兜底：把 ctx 里的自由文本原样交给模型 */
    return {
      system: "你是一位中文写作者，文字克制、不煽情。",
      user: "【人物设定】\n" + brief + "\n\n【任务】\n" + (ctx.task || "写一段与上述处境相称的短文，200 字以内。") +
        (texts ? "\n\n【参考材料】\n" + texts : "")
    };
  };

  L.cacheKey = function (kind, ctx) {
    return kind + ":" + hash(L.buildPrompt(kind, ctx).user);
  };

  /* ---------------- 请求：一个永远不会抛出去的 fetch ---------------- */
  /* 兼容几种常见的返回形状，省得为了换一家厂商就得改代码 */
  L.extractText = function (data) {
    if (!data) return "";
    if (typeof data === "string") return data.trim();
    if (typeof data.text === "string") return data.text.trim();
    if (typeof data.output_text === "string") return data.output_text.trim();     // Responses API
    if (typeof data.completion === "string") return data.completion.trim();
    if (data.choices && data.choices[0]) {
      const c = data.choices[0];
      if (c.message && typeof c.message.content === "string") return c.message.content.trim();
      if (typeof c.text === "string") return c.text.trim();
    }
    if (data.content && data.content[0] && typeof data.content[0].text === "string") {
      return data.content[0].text.trim();                                        // Anthropic 风格
    }
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {    // Gemini 风格
      const parts = data.candidates[0].content.parts;
      if (parts && parts[0] && typeof parts[0].text === "string") return parts[0].text.trim();
    }
    return "";
  };

  /* 调用模型。cb(text, err)：成功给 text，失败给 err（text 为 null）。
   * 返回 "cache" | "sent" | null，纯为了好测。 */
  L.request = function (kind, ctx, cb) {
    cb = typeof cb === "function" ? cb : function () { };
    const c = L.config();
    if (!L.ready()) { cb(null, "还没配置大模型"); return null; }

    const prompt = L.buildPrompt(kind, ctx);
    const key = L.cacheKey(kind, ctx);
    const hit = L.cached(key);
    if (hit) { cb(hit, null); return "cache"; }                       // 同样的局面，不再花钱

    if (typeof fetch !== "function") { cb(null, "这个环境不支持网络请求"); return null; }
    if (L.left() <= 0) { cb(null, "本局的 AI 调用额度用完了（上限 " + L.cap() + " 次）"); return null; }

    let headers = { "Content-Type": "application/json" };
    if (c.apiKey) headers["Authorization"] = "Bearer " + c.apiKey;
    if (c.extraHeaders) {
      try { Object.assign(headers, JSON.parse(c.extraHeaders)); } catch (e) { /* 写错了就当没写 */ }
    }
    const body = {
      model: c.model,
      messages: [{ role: "system", content: prompt.system }, { role: "user", content: prompt.user }],
      temperature: c.temperature == null ? 0.9 : c.temperature,
      max_tokens: c.maxTokens || 400
    };

    let ctl = null, timer = null;
    try {
      if (typeof AbortController === "function") ctl = new AbortController();
      if (ctl) timer = setTimeout(function () { try { ctl.abort(); } catch (e) { } }, c.timeoutMs || 60000);
    } catch (e) { ctl = null; }

    /* fetch 直接调（不包在 .then 里）——这样"连请求都没发出去"的错误
       （比如地址写错、断网）也走同一条降级路径，而不是变成未处理的 rejection。 */
    let resp;
    try {
      resp = fetch(c.endpoint, {
        method: "POST", headers: headers, body: JSON.stringify(body),
        signal: ctl ? ctl.signal : undefined
      });
    } catch (e) {
      if (timer) clearTimeout(timer);
      cb(null, "请求发不出去：" + ((e && e.message) || e));
      return null;
    }

    Promise.resolve(resp)
      .then(function (r) {
        return r.text().then(function (t) { return { ok: r.ok, status: r.status, text: t }; });
      })
      .then(function (res) {
        if (timer) clearTimeout(timer);
        if (!res.ok) { cb(null, "接口返回 HTTP " + res.status + "（可能是密钥、额度或跨域问题）"); return; }
        let data = null;
        try { data = JSON.parse(res.text); } catch (e) { cb(null, "接口返回的不是 JSON"); return; }
        const text = L.extractText(data);
        if (!text) { cb(null, "接口返回里没有正文"); return; }
        if (P.G && P.G.aiState) P.G.aiState.callsUsed = L.used() + 1;
        L.putCache(key, text);
        cb(text, null);
      })
      .catch(function (err) {
        if (timer) clearTimeout(timer);
        const aborted = err && (err.name === "AbortError");
        cb(null, aborted ? "请求超时（" + ((c.timeoutMs || 60000) / 1000) + " 秒）"
          : ("请求失败：" + ((err && err.message) || err) + "（file:// 打开时多半是跨域）"));
      });
    return "sent";
  };

  /* ---------------- 设置面板 ---------------- */
  L.openSettings = function () {
    const c = L.config();
    const old = document.querySelector(".modal"); if (old) old.remove();
    const m = document.createElement("div");
    m.className = "modal";
    m.onclick = function (e) { if (e.target === m) m.remove(); };
    m.innerHTML =
      '<div class="box" style="max-width:560px">' +
      "<h3>接入大模型（可选）</h3>" +
      '<p class="hintline">游戏本身不需要它。接上之后，「静好岁月」那一段日常可以交给模型润色，或者让它另写一段。<br>' +
      "密钥只存在你这台机器的浏览器里，不会进代码、不会上传别处。</p>" +
      '<label class="airow"><input type="checkbox" id="aiOn"' + (c.enabled ? " checked" : "") + "> 启用</label>" +
      '<label class="airow">服务商预设<select id="aiPreset" style="width:100%;margin-top:3px;font-family:inherit;font-size:14px;padding:6px;border:1px solid var(--line);background:#fff">' +
      Object.keys(PRESETS).map(function (k) {
        return '<option value="' + k + '">' + PRESETS[k].name + "</option>";
      }).join("") + "</select></label>" +
      '<label class="airow">接口地址<input type="text" id="aiEp" value="' + esc(c.endpoint) + '"></label>' +
      '<label class="airow">模型<input type="text" id="aiModel" value="' + esc(c.model) + '"></label>' +
      '<label class="airow">API Key<input type="password" id="aiKey" value="' + esc(c.apiKey) + '" placeholder="sk-..."></label>' +
      '<label class="airow">温度<input type="text" id="aiTemp" value="' + esc(c.temperature) + '" style="max-width:70px"></label>' +
      '<label class="airow">超时（毫秒）<input type="text" id="aiTo" value="' + esc(c.timeoutMs) + '" style="max-width:90px"></label>' +
      '<label class="airow"><input type="checkbox" id="aiAuto"' + (c.autoPolish ? " checked" : "") + "> 自动润色（每次出现静好岁月都去润色）</label>" +
      '<label class="airow">自定义请求头（JSON，多数人用不到）<input type="text" id="aiHdr" value="' + esc(c.extraHeaders) + '" placeholder=\'{}\'></label>' +
      '<p class="hintline">用 file:// 双击打开时，浏览器的跨域限制很可能把请求拦下——这不是游戏的 bug。' +
      "可以改用 <code>python3 -m http.server</code> 打开，或者把接口地址填成你自己搭的转发服务。</p>" +
      '<div class="airow"><span class="muted" id="aiMsg"></span></div>' +
      '<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">' +
      '<button class="btn primary" id="aiSave">保存</button>' +
      '<button class="btn" id="aiTest">测试一次</button>' +
      '<button class="btn" id="aiClear">清空缓存</button>' +
      '<button class="btn" id="aiClose">关闭</button></div>' +
      '<p class="hintline">已用 ' + L.used() + " / " + L.cap() + " 次（本局），缓存 " + L.cacheSize() + " 条。</p>" +
      "</div>";
    document.body.appendChild(m);

    const v = function (id) { const el = document.getElementById(id); return el ? el.value : ""; };
    const ck = function (id) { const el = document.getElementById(id); return !!(el && el.checked); };
    const msg = function (s) { const el = document.getElementById("aiMsg"); if (el) el.textContent = s; };
    const collect = function () {
      return {
        enabled: ck("aiOn"), endpoint: v("aiEp").trim(), model: v("aiModel").trim(),
        apiKey: v("aiKey").trim(), temperature: Number(v("aiTemp")) || 0.9,
        timeoutMs: Number(v("aiTo")) || 60000, autoPolish: ck("aiAuto"),
        extraHeaders: v("aiHdr").trim()
      };
    };
    const sel = document.getElementById("aiPreset");
    if (sel) sel.onchange = function () {
      const pre = PRESETS[sel.value];
      if (!pre) return;
      if (pre.endpoint) { const ep = document.getElementById("aiEp"); if (ep) ep.value = pre.endpoint; }
      const md = document.getElementById("aiModel"); if (md && pre.model) md.value = pre.model;
      const on = document.getElementById("aiOn"); if (on) on.checked = true;
      msg("已填充「" + pre.name + "」——别忘了填 API Key，然后「测试一次」。");
    };
    const save = document.getElementById("aiSave");
    if (save) save.onclick = function () { L.setConfig(collect()); msg("已保存。"); if (P.refreshAIBtn) P.refreshAIBtn(); };
    const close = document.getElementById("aiClose");
    if (close) close.onclick = function () { L.setConfig(collect()); m.remove(); if (P.refreshAIBtn) P.refreshAIBtn(); };
    const clr = document.getElementById("aiClear");
    if (clr) clr.onclick = function () { L.clearCache(); msg("缓存已清空。"); };
    const tst = document.getElementById("aiTest");
    if (tst) tst.onclick = function () {
      L.setConfig(collect());
      msg("正在测试…");
      const before = L.cacheSize();
      L.request("vignette_polish", {
        months: [P.G && P.G.month ? P.G.month : 1],
        texts: [{ text: "三月。这是一个测试。" }],
        extra: "（这是一次连接测试，请随意写一句话。）"
      }, function (text, err) {
        msg(err ? ("失败：" + err) : ("成功（缓存 " + before + " → " + L.cacheSize() + "）：" + String(text).slice(0, 60) + "…"));
      });
    };
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  }
})();
