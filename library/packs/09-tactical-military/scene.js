const sk = SceneKit;
let mag = 24, reserve = 120, stamina = 100, bearing = 274;
let locked = false, lockPct = 0, lockTimer = 0, tgtHp = 3;
const stanceLabels = { STAND: "站立", CROUCH: "蹲伏", PRONE: "卧倒" };
const CIRC = 2 * Math.PI * 35;

function feed(msg) {
  const el = document.createElement("div");
  el.textContent = msg;
  sk.$("#feed").prepend(el);
  setTimeout(() => el.remove(), 2000);
}

function syncAmmo() { sk.setText(sk.$("#ammo-val"), mag + " / " + reserve); }
function syncStamina() {
  sk.setFill(sk.$("#stm-fill"), stamina);
  sk.setText(sk.$("#stm-val"), String(stamina));
  sk.$("#stm-fill").className = "hud-bar-fill " + (stamina > 40 ? "success" : stamina > 15 ? "warning" : "danger");
}
function syncBearing() {
  sk.setText(sk.$("#compass-deg"), bearing + "°");
}
function syncLock() {
  const arc = sk.$("#lock-arc");
  arc.style.strokeDasharray = String(CIRC);
  arc.style.strokeDashoffset = String(CIRC * (1 - lockPct / 100));
  sk.$("#reticle").classList.toggle("hot", locked || lockPct > 0);
  sk.$("#tgt").classList.toggle("locked", locked);
}

function clearLock() {
  locked = false;
  lockPct = 0;
  clearInterval(lockTimer);
  lockTimer = 0;
  syncLock();
}

sk.on(sk.$("#btn-help"), "click", () => {
  const help = sk.$("#help");
  const open = help.hidden;
  help.hidden = !open;
  sk.$("#btn-help").setAttribute("aria-expanded", String(open));
});

sk.on(sk.$("#tgt"), "click", () => {
  if (sk.$("#tgt").classList.contains("down")) return;
  if (locked) { feed("目标已锁定"); return; }
  clearInterval(lockTimer);
  lockPct = 0;
  const stance = sk.$("[data-stance].active").dataset.stance;
  const speed = stance === "PRONE" ? 14 : stance === "CROUCH" ? 10 : 7;
  sk.setText(sk.$("#short-msg"), "锁定中…");
  lockTimer = setInterval(() => {
    lockPct = Math.min(100, lockPct + speed);
    syncLock();
    if (lockPct >= 100) {
      locked = true;
      clearInterval(lockTimer);
      sk.setText(sk.$("#short-msg"), "目标锁定");
      feed("锁定完成");
    }
  }, 120);
});

sk.$all("[data-stance]").forEach((btn) => {
  sk.on(btn, "click", () => {
    sk.$all("[data-stance]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    feed("姿态：" + stanceLabels[btn.dataset.stance]);
    if (lockPct > 0 && !locked) clearLock();
  });
});

sk.on(sk.$("#btn-reload"), "click", () => {
  if (reserve <= 0) { feed("备用弹耗尽"); return; }
  const need = 30 - mag;
  const take = Math.min(need, reserve);
  mag += take; reserve -= take;
  syncAmmo();
  feed("换弹 +" + take);
  sk.pulse(sk.$("#btn-reload"));
});

sk.on(sk.$("#btn-compass"), "click", () => {
  bearing = (bearing + 15) % 360;
  syncBearing();
  sk.setText(sk.$("#short-msg"), "方位 " + bearing + "°");
});

sk.on(sk.$("#btn-sprint"), "click", () => {
  if (stamina < 12) { feed("力竭"); return; }
  stamina = Math.max(0, stamina - 12);
  syncStamina();
  clearLock();
  sk.setText(sk.$("#short-msg"), "机动中");
  feed("冲刺 −12");
});

sk.on(sk.$("#btn-fire"), "click", () => {
  if (mag <= 0) { feed("弹匣空 — 换弹"); return; }
  const burst = Math.min(3, mag);
  mag -= burst;
  syncAmmo();
  const hit = locked ? true : Math.random() < 0.35;
  if (hit) {
    tgtHp -= 1;
    feed("命中 ×" + burst + (locked ? "" : "（盲射）"));
    sk.pulse(sk.$("#tgt"));
    if (tgtHp <= 0) {
      sk.$("#tgt").classList.add("down");
      clearLock();
      sk.setText(sk.$("#short-msg"), "目标失效");
      feed("目标清除");
    }
  } else {
    feed("偏射 ×" + burst);
    sk.$("#vignette").classList.add("on");
    setTimeout(() => sk.$("#vignette").classList.remove("on"), 180);
  }
});

syncAmmo(); syncStamina(); syncBearing(); syncLock();
