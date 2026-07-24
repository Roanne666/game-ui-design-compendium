const sk = SceneKit;
const root = sk.$("#root");
const hud = sk.$("#hud");
const lane = sk.$("#lane");
const punch = sk.$("#btn-punch");
const SWEET_TOLERANCE = 36;
const TARGET_TRAVEL = 2800;
const SPAWN_GAP = [800, 1300];
let combo = 0, score = 0, best = 0, active = null, nextSpawn = 0;
const icons = ["fire.png", "battle.png", "exclamation.png", "eye.png", "coins.png"];

function sync() {
  sk.setText(sk.$("#combo"), String(combo));
  sk.setText(sk.$("#score"), String(score).padStart(3, "0"));
}

function burst(x, y, text, kind) {
  const el = document.createElement("div");
  el.className = "burst" + (kind ? " " + kind : "");
  el.textContent = text;
  const hudRect = hud.getBoundingClientRect();
  el.style.left = (x - hudRect.left) + "px";
  el.style.top = (y - hudRect.top) + "px";
  hud.appendChild(el);
  setTimeout(() => el.remove(), 640);
}

function shake() {
  root.classList.remove("shake");
  void root.offsetWidth;
  root.classList.add("shake");
  setTimeout(() => root.classList.remove("shake"), 140);
}

function finishActive(outcome, label, kind) {
  if (!active || active.hit) return;
  active.el.classList.add(outcome);
  active.hit = true;
  const rect = active.el.getBoundingClientRect();
  burst(rect.left + rect.width / 2, rect.top, label, kind);
  setTimeout(() => active && active.el.remove(), 260);
  active = null;
}

function fire() {
  punch.classList.add("pressed");
  setTimeout(() => punch.classList.remove("pressed"), 90);
  shake();
  if (!active || active.hit) return;
  const laneRect = lane.getBoundingClientRect();
  const tRect = active.el.getBoundingClientRect();
  const tCenter = tRect.left + tRect.width / 2;
  const sweet = laneRect.left + laneRect.width / 2;
  const dist = Math.abs(tCenter - sweet);
  if (dist <= SWEET_TOLERANCE) {
    const bonus = 1 + Math.floor(combo / 5);
    const gain = 10 * bonus;
    score += gain;
    combo += 1;
    best = Math.max(best, combo);
    finishActive("hit", (combo >= 5 ? "连击！" : "砰！") + "+" + gain, "good");
  } else {
    combo = 0;
    finishActive("miss", tCenter < sweet ? "太早" : "太晚", "bad");
    const v = sk.$("#vignette");
    v.classList.add("on");
    setTimeout(() => v.classList.remove("on"), 200);
  }
  sync();
}

function spawnTarget(now) {
  const el = document.createElement("div");
  el.className = "target";
  const img = document.createElement("img");
  img.src = "../../assets/_shared/rpg-icons/" + icons[Math.floor(Math.random() * icons.length)];
  img.alt = "";
  img.draggable = false;
  el.appendChild(img);
  lane.appendChild(el);
  const startX = -60;
  const endX = lane.clientWidth + 60;
  el.style.left = startX + "px";
  active = { el, hit: false };
  const t0 = now;
  const animate = (ts) => {
    if (!active || active.el !== el || active.hit) return;
    const p = Math.min(1, (ts - t0) / TARGET_TRAVEL);
    el.style.left = (startX + (endX - startX) * p) + "px";
    if (p >= 1) {
      if (active && active.el === el && !active.hit) {
        combo = 0;
        finishActive("miss", "错过", "bad");
        sync();
      }
      return;
    }
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

function loop(ts) {
  if (ts >= nextSpawn && !active) {
    spawnTarget(ts);
    const [lo, hi] = SPAWN_GAP;
    nextSpawn = ts + lo + Math.random() * (hi - lo);
  }
  requestAnimationFrame(loop);
}

sk.on(sk.$("#btn-help"), "click", () => {
  const help = sk.$("#help");
  const open = help.hidden;
  help.hidden = !open;
  sk.$("#btn-help").setAttribute("aria-expanded", String(open));
});

punch.addEventListener("click", fire);
punch.addEventListener("touchstart", (e) => { e.preventDefault(); fire(); }, { passive: false });
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") { e.preventDefault(); fire(); }
});

nextSpawn = 400 + Math.random() * 400;
sync();
requestAnimationFrame(loop);
