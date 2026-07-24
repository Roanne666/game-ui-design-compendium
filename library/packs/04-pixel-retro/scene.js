const sk = SceneKit;
const HP_MAX = 99;
const MP_MAX = 30;
const ASSET = "./assets/";
const FOE_DEFAULTS = [
  { id: "slime", hp: 30, name: "史莱姆", src: ASSET + "foe-slime.png" },
  { id: "bat", hp: 22, name: "蝙蝠", src: ASSET + "foe-bat.png" },
  { id: "orc", hp: 45, name: "兽人", src: ASSET + "foe-orc.png" },
];

let hp = 72;
let mp = 18;
let busy = false;
let over = false;
const logLines = [];

function syncBars() {
  sk.setFill(sk.$("#hp-fill"), (hp / HP_MAX) * 100);
  sk.setText(sk.$("#hp-val"), String(hp));
  sk.setFill(sk.$("#mp-fill"), (mp / MP_MAX) * 100);
  sk.setText(sk.$("#mp-val"), String(mp));
}

function setCmdsEnabled(on) {
  sk.$all(".cmds .cmd").forEach((btn) => {
    btn.disabled = !on;
  });
}

function focusCmd(btn) {
  sk.$all(".cmds .cmd").forEach((c) => c.classList.remove("focus"));
  if (btn) btn.classList.add("focus");
}

function log(msg) {
  logLines.unshift(msg);
  while (logLines.length > 3) logLines.pop();
  const box = sk.$("#battle-log");
  box.innerHTML = "";
  logLines.forEach((line, i) => {
    const span = document.createElement("span");
    span.className = "line" + (i > 0 ? " dim" : "");
    span.textContent = line;
    box.appendChild(span);
  });
}

function floatAt(el, text, kind) {
  if (!el) return;
  const stage = sk.$("#stage");
  const sRect = stage.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  const node = document.createElement("div");
  node.className = "float-dmg" + (kind ? " " + kind : "");
  node.textContent = text;
  node.style.left = (r.left + r.width / 2 - sRect.left) + "px";
  node.style.top = (r.top - sRect.top + 8) + "px";
  sk.$("#floats").appendChild(node);
  setTimeout(() => node.remove(), 720);
}

function flashParty() {
  const p = sk.$("#party");
  p.classList.add("flash");
  setTimeout(() => p.classList.remove("flash"), 120);
}

function flashHurt() {
  const v = sk.$("#vignette");
  v.classList.add("on");
  setTimeout(() => v.classList.remove("on"), 280);
  flashParty();
}

function hitFoe(foe) {
  foe.classList.add("hit");
  setTimeout(() => foe.classList.remove("hit"), 140);
}

function selectedEnemy() {
  return sk.$(".foe.selected:not(.dead)");
}

function aliveFoes() {
  return sk.$all(".foe:not(.dead)");
}

function selectFoe(foe) {
  if (!foe || foe.classList.contains("dead") || over) return;
  sk.$all(".foe").forEach((f) => f.classList.remove("selected"));
  foe.classList.add("selected");
  log("目标 → " + foe.dataset.name);
}

function updateFoeHp(foe) {
  const label = foe.querySelector("[data-hp-label]");
  if (label) label.textContent = foe.dataset.hp;
}

function showEnd(win) {
  over = true;
  busy = true;
  document.body.classList.add("battle-over");
  setCmdsEnabled(false);
  const banner = sk.$("#end-banner");
  const title = sk.$("#end-title");
  banner.hidden = false;
  if (win) {
    title.textContent = "胜利";
    title.classList.remove("lose");
    sk.setText(sk.$("#end-sub"), "敌人全部倒下。获得 50 金币。");
    log("战斗胜利！");
  } else {
    title.textContent = "战败";
    title.classList.add("lose");
    sk.setText(sk.$("#end-sub"), "隆倒下了……");
    log("全灭……");
  }
}

function checkWin() {
  if (aliveFoes().length === 0) {
    showEnd(true);
    return true;
  }
  return false;
}

function checkLose() {
  if (hp <= 0) {
    showEnd(false);
    return true;
  }
  return false;
}

function resetBattle() {
  hp = 72;
  mp = 18;
  busy = false;
  over = false;
  document.body.classList.remove("battle-over");
  sk.$("#end-banner").hidden = true;
  sk.$("#floats").innerHTML = "";
  sk.$all(".foe").forEach((foe, i) => {
    const def = FOE_DEFAULTS[i];
    foe.classList.remove("dead", "selected", "hit");
    foe.dataset.hp = String(def.hp);
    foe.dataset.max = String(def.hp);
    foe.dataset.name = def.name;
    foe.dataset.id = def.id;
    foe.setAttribute("aria-label", "选择" + def.name);
    foe.querySelector(".sprite").src = def.src;
    foe.querySelector(".name").textContent = def.name;
    updateFoeHp(foe);
  });
  sk.$all(".foe")[1].classList.add("selected");
  setCmdsEnabled(true);
  focusCmd(sk.$("#cmd-fight"));
  logLines.length = 0;
  log("遭遇战开始。选定目标后下达指令。");
  syncBars();
}

function afterPlayerAction(didAttack) {
  if (over) return;
  if (checkWin()) return;
  if (!didAttack) {
    busy = false;
    setCmdsEnabled(true);
    return;
  }
  const foe = selectedEnemy();
  if (!foe) {
    busy = false;
    setCmdsEnabled(true);
    return;
  }
  setTimeout(() => {
    if (over) return;
    const counter = 4 + Math.floor(Math.random() * 5);
    hp = Math.max(0, hp - counter);
    syncBars();
    flashHurt();
    floatAt(sk.$("#party"), "−" + counter);
    log(foe.dataset.name + " 反击 −" + counter);
    if (checkLose()) return;
    busy = false;
    setCmdsEnabled(true);
  }, 380);
}

function dealToTarget(dmg, label) {
  const foe = selectedEnemy();
  if (!foe) {
    log("无有效目标");
    busy = false;
    setCmdsEnabled(true);
    return;
  }
  let ehp = parseInt(foe.dataset.hp, 10) - dmg;
  foe.dataset.hp = String(Math.max(0, ehp));
  updateFoeHp(foe);
  hitFoe(foe);
  floatAt(foe, "−" + dmg);
  log(label + " · " + foe.dataset.name + " −" + dmg);
  if (parseInt(foe.dataset.hp, 10) <= 0) {
    foe.classList.add("dead");
    foe.classList.remove("selected");
    log(foe.dataset.name + " 倒下了");
    const next = sk.$(".foe:not(.dead)");
    if (next) next.classList.add("selected");
  }
  afterPlayerAction(true);
}

function beginAction() {
  if (busy || over) return false;
  busy = true;
  setCmdsEnabled(false);
  return true;
}

sk.on(sk.$("#btn-help"), "click", () => {
  const help = sk.$("#help");
  const open = help.hidden;
  help.hidden = !open;
  sk.$("#btn-help").setAttribute("aria-expanded", String(open));
});

sk.$all(".foe").forEach((foe) => {
  sk.on(foe, "click", () => {
    if (busy || over) return;
    selectFoe(foe);
  });
});

sk.$all(".cmds .cmd").forEach((btn) => {
  sk.on(btn, "pointerdown", () => {
    if (!btn.disabled) focusCmd(btn);
  });
});

sk.on(sk.$("#cmd-fight"), "click", () => {
  if (!beginAction()) return;
  focusCmd(sk.$("#cmd-fight"));
  dealToTarget(8 + Math.floor(Math.random() * 5), "打击");
});

sk.on(sk.$("#cmd-magic"), "click", () => {
  if (busy || over) return;
  focusCmd(sk.$("#cmd-magic"));
  if (mp < 6) {
    log("魔法不足");
    floatAt(sk.$("#party"), "不足", "miss");
    return;
  }
  if (!beginAction()) return;
  mp -= 6;
  syncBars();
  dealToTarget(14 + Math.floor(Math.random() * 3), "火焰");
});

sk.on(sk.$("#cmd-item"), "click", () => {
  if (!beginAction()) return;
  focusCmd(sk.$("#cmd-item"));
  const heal = 20;
  hp = Math.min(HP_MAX, hp + heal);
  syncBars();
  sk.pulse(sk.$("#hp-fill"));
  floatAt(sk.$("#party"), "+" + heal, "heal");
  log("药水 + " + heal + " 生命");
  setTimeout(() => {
    if (over) return;
    busy = false;
    setCmdsEnabled(true);
  }, 320);
});

sk.on(sk.$("#cmd-run"), "click", () => {
  if (busy || over) return;
  focusCmd(sk.$("#cmd-run"));
  sk.modal({
    title: "逃离战斗？",
    body: "现在逃跑可能丢失 50 金币。",
    onConfirm: () => {
      if (!beginAction()) return;
      if (Math.random() < 0.7) {
        log("成功逃脱！");
        setTimeout(resetBattle, 500);
      } else {
        log("逃跑失败！");
        afterPlayerAction(true);
      }
    },
  });
});

sk.on(sk.$("#btn-again"), "click", () => resetBattle());

syncBars();
