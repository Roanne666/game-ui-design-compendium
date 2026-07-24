const sk = SceneKit;
const state = { heroHp: 72, heroHpMax: 72, heroMp: 22, heroMpMax: 40, foeHp: 40, foeHpMax: 40, busy: false, potions: 2 };

function whisper(msg) {
  const el = sk.$("#whisper");
  sk.setText(el, msg);
  clearTimeout(whisper._t);
  whisper._t = setTimeout(() => sk.setText(el, ""), 1600);
}

function syncBars() {
  sk.$("#hero-hp-fill").style.width = ((state.heroHp / state.heroHpMax) * 100) + "%";
  sk.setText(sk.$("#hero-hp-val"), String(state.heroHp));
  sk.$("#hero-mp-fill").style.width = ((state.heroMp / state.heroMpMax) * 100) + "%";
  sk.setText(sk.$("#hero-mp-val"), String(state.heroMp));
  sk.$("#foe-hp-fill").style.width = ((state.foeHp / state.foeHpMax) * 100) + "%";
}
function setLog(msg) { sk.setText(sk.$("#battle-log"), msg); }
function setBusy(on) {
  state.busy = on;
  sk.$all(".cmd").forEach((c) => { c.disabled = on; });
}

function enterBattle() {
  Object.assign(state, { heroHp: 72, heroMp: 22, foeHp: 40, potions: 2, busy: false });
  sk.$("#menu-root").hidden = true;
  sk.$("#battle-layer").hidden = false;
  setBusy(false);
  syncBars();
  setLog("遭遇影狼！选择指令");
}
function returnMenu(msg) {
  sk.$("#battle-layer").hidden = true;
  sk.$("#menu-root").hidden = false;
  setBusy(false);
  if (msg) whisper(msg);
}
function foeTurn() {
  if (state.foeHp <= 0) return;
  const dmg = 6 + Math.floor(Math.random() * 5);
  state.heroHp = Math.max(0, state.heroHp - dmg);
  syncBars();
  setLog("影狼反击 −" + dmg);
  sk.$("#vignette").classList.add("on");
  setTimeout(() => sk.$("#vignette").classList.remove("on"), 280);
  if (state.heroHp <= 0) {
    setBusy(true);
    setLog("幻影倒下了…");
    setTimeout(() => returnMenu("战斗失败，回到标题"), 700);
  } else setBusy(false);
}
function afterPlayerAct(msg) {
  setLog(msg); syncBars();
  if (state.foeHp <= 0) {
    setBusy(true);
    setLog("影狼倒下！胜利");
    setTimeout(() => returnMenu("章节继续…"), 800);
    return;
  }
  setTimeout(foeTurn, 420);
}

sk.on(sk.$("#btn-help"), "click", () => {
  const help = sk.$("#help");
  const open = help.hidden;
  help.hidden = !open;
  sk.$("#btn-help").setAttribute("aria-expanded", String(open));
});

sk.on(sk.$("#cmd-atk"), "click", () => {
  if (state.busy || sk.$("#battle-layer").hidden) return;
  setBusy(true);
  const dmg = 9 + Math.floor(Math.random() * 6);
  state.foeHp = Math.max(0, state.foeHp - dmg);
  sk.pulse(sk.$("#foe-card"));
  afterPlayerAct("攻击命中 −" + dmg);
});
sk.on(sk.$("#cmd-skill"), "click", () => {
  if (state.busy || sk.$("#battle-layer").hidden) return;
  if (state.heroMp < 8) { whisper("技力不足"); return; }
  setBusy(true); state.heroMp -= 8;
  const dmg = 16 + Math.floor(Math.random() * 5);
  state.foeHp = Math.max(0, state.foeHp - dmg);
  sk.pulse(sk.$("#foe-card"));
  afterPlayerAct("幻影斩 −" + dmg);
});
sk.on(sk.$("#cmd-item"), "click", () => {
  if (state.busy || sk.$("#battle-layer").hidden) return;
  if (state.potions <= 0) { whisper("没有恢复药"); return; }
  setBusy(true); state.potions -= 1;
  state.heroHp = Math.min(state.heroHpMax, state.heroHp + 18);
  afterPlayerAct("使用恢复药 +18（剩 " + state.potions + "）");
});
sk.on(sk.$("#cmd-run"), "click", () => {
  if (state.busy || sk.$("#battle-layer").hidden) return;
  if (Math.random() < 0.55) returnMenu("成功逃跑");
  else { setBusy(true); setLog("逃跑失败！"); setTimeout(foeTurn, 380); }
});

sk.on(sk.$("#btn-config"), "click", () => { sk.$("#config-panel").hidden = false; });
sk.on(sk.$("#config-close"), "click", () => { sk.$("#config-panel").hidden = true; });
sk.$all("[data-toggle]").forEach((btn) => {
  sk.on(btn, "click", () => {
    const on = btn.dataset.on !== "true";
    btn.dataset.on = String(on);
    btn.textContent = on ? "开" : "关";
    btn.classList.toggle("on", on);
  });
});
sk.on(sk.$("#btn-load"), "click", () => { sk.$("#load-overlay").hidden = false; });
sk.on(sk.$("#load-close"), "click", () => { sk.$("#load-overlay").hidden = true; });
sk.$all("[data-slot]").forEach((btn) => {
  sk.on(btn, "click", () => {
    sk.$("#load-overlay").hidden = true;
    if (btn.dataset.slot === "2") whisper("空槽位");
    else enterBattle();
  });
});
sk.on(sk.$("#btn-start"), "click", () => {
  const overlay = sk.$("#loading-overlay");
  const bar = sk.$("#load-bar");
  overlay.hidden = false;
  let pct = 0;
  bar.style.width = "0%";
  const tick = setInterval(() => {
    pct += 10 + Math.floor(Math.random() * 8);
    if (pct >= 100) {
      clearInterval(tick);
      bar.style.width = "100%";
      overlay.hidden = true;
      enterBattle();
    } else bar.style.width = pct + "%";
  }, 100);
});
sk.on(sk.$("#btn-exit"), "click", () => {
  sk.modal({ title: "退出游戏？", body: "未保存进度将会丢失。", onConfirm: () => whisper("感谢游玩！") });
});
