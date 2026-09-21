"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");
function makeEl() {
  return { innerHTML: "", className: "", textContent: "", disabled: false, value: "", style: {}, outerHTML: "",
    appendChild() { }, append() { }, remove() { }, setAttribute() { }, insertBefore() { }, closest() { return null; },
    querySelector() { return makeEl(); }, onclick: null, oninput: null, onchange: null };
}
global.document = { querySelector: () => makeEl(), querySelectorAll: () => [], getElementById: () => makeEl(), createElement: () => makeEl(), body: { className: "" }, addEventListener() { } };
const _store = {};
global.localStorage = { getItem: (k) => (k in _store ? _store[k] : null), setItem: (k, v) => { _store[k] = String(v); }, removeItem: (k) => { delete _store[k]; }, key: (i) => Object.keys(_store)[i] ?? null, get length() { return Object.keys(_store).length; } };
global.getComputedStyle = () => ({ getPropertyValue: () => "" });
global.alert = () => { }; global.confirm = () => true; global.prompt = () => "x";
global.setTimeout = () => 0; global.setInterval = () => 1; global.clearInterval = () => { };
global.URL = { createObjectURL: () => "", revokeObjectURL: () => { } };
global.Blob = function () { }; global.FileReader = function () { };
global.window = global;
const htmlRaw = fs.readFileSync(INDEX, "utf8");
const html = htmlRaw.replace(/<!--[\s\S]*?-->/g, "");
const srcs = [...html.matchAll(/<script\s+src="([^"]+)"><\/script>/g)].map(m => m[1]);
const code = srcs.map(s => fs.readFileSync(path.join(ROOT, s), "utf8")).join("\n;\n");
const P = new Function(code + "\n;POTUS.boot();\n;return POTUS;")();

const era = process.argv[2] || "2016_SOCIAL";
let draws = 0;
for (let r = 0; r < 40; r++) {
  P.CSEL = { era, origin: Object.keys(P.reg.origin)[r % 4], talent: Object.keys(P.reg.talent)[r % 6], entry: Object.keys(P.reg.entry)[r % 6], party: Object.keys(P.reg.party)[r % 3], stance: Object.keys(P.reg.stance)[0], name: "N" + r };
  P.confirmCreate();
  const G = P.G, b = P.balance();
  let done = false;
  for (let y = 0; y < 55 && !done; y++) {
    G.ap = P.clamp((b.apBase == null ? 6 : b.apBase) + Math.floor(G.hp / (b.apHealthDiv || 25)), b.apMin || 1, b.apMax || 12);
    G.month = 0; G.quietMonths = []; G.monthPlan = []; G.slotIndex = 0; G.slotCount = 0;
    let yearMonths = 0, guard = 0;
    while (!done && ++guard < 60 && yearMonths < 12) {
      const rr = P.advanceMonth();
      if (!rr) break;
      yearMonths++;
      if (rr !== "event") continue;
      for (let i = 0; i < G.monthPlan.length && !done; i++) {
        const slot = G.monthPlan[i];
        const ev = P.drawEvent(slot);
        draws++;
        process.stderr.write("r=" + r + " y=" + G.year + " m=" + G.month + " slot=" + slot.grade + " ev=" + (ev && ev.id) + "\n");
        if (!ev || !ev.choices || !ev.choices.length) throw new Error("drawEvent 返回空事件 " + JSON.stringify(slot));
        const pay = (c) => !c.cost || Object.keys(c.cost).every(k => (G[k] || 0) >= c.cost[k]);
        const pool = ev.choices.filter(pay);
        const usable = pool.length ? pool : [ev.choices[0]];
        const ch = usable[Math.floor(Math.random() * usable.length)];
        let stake = null;
        const spec = P.stakeSpec(ch);
        if (spec) {
          const s = { fun: 0, ap: 0, fav: 0 };
          if (spec.fun && G.fun >= (spec.fun.per || 250000)) s.fun = P.rint(0, 2);
          if (spec.ap && G.ap >= 1) s.ap = P.rint(0, 2);
          if (spec.fav && G.fav >= 1) s.fav = P.chance(0.5) ? 1 : 0;
          const info = P.stakeInfo(ch, s);
          for (const k in info.cost) G[k] = (G[k] || 0) - info.cost[k];
          stake = info;
        }
        if (ch.cost) for (const k in ch.cost) G[k] = (G[k] || 0) - ch.cost[k];
        G.fav = P.clamp(G.fav, 0, 20); G.ap = P.clamp(G.ap, 0, 99);
        const rp = P.computeP(ch, stake).P;
        const t = P.rollTierAdv(rp, !!(stake && stake.reroll)).tier;
        const out = ch.outcomes[t] || ch.outcomes.ok;
        P.applyEffects(out.effects);
        if (G.hp <= 0) done = true;
      }
    }
    G.year++; G.age++; G.hp = P.clamp(G.hp, 0, 100);
    if (G.hp <= 0) done = true;
  }
}
console.log("draws=" + draws);
