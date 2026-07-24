const sk = SceneKit;
const vol = { master: 70, music: 80, sfx: 90 };
const ROUND_SEC = 20;
let best = 0, score = 0, combo = 0, left = ROUND_SEC;
let playing = false, orbX = -50, orbSpeed = 3.2, raf = 0, tickTimer = 0;

function syncVol(key) { sk.setText(sk.$("#vol-" + key), String(vol[key])); }
function fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

function showLayer(name) {
  sk.$("#title-layer").hidden = name !== "title";
  sk.$("#play-layer").hidden = name !== "play";
  sk.$("#over-layer").hidden = name !== "over";
}

function resetOrb() {
  const orb = sk.$("#orb");
  orb.classList.remove("hit");
  orbX = -60;
  orbSpeed = 2.8 + Math.random() * 2.4;
  orb.style.left = orbX + "px";
}

function endRound() {
  playing = false;
  cancelAnimationFrame(raf);
  clearInterval(tickTimer);
  if (score > best) {
    best = score;
    sk.setText(sk.$("#your-score"), fmt(best).padStart(7, "0"));
  }
  sk.setText(sk.$("#final-score"), fmt(score));
  showLayer("over");
}

function frame() {
  if (!playing) return;
  const lane = sk.$("#lane");
  const orb = sk.$("#orb");
  const w = lane.clientWidth;
  orbX += orbSpeed;
  orb.style.left = orbX + "px";
  if (orbX > w + 40) {
    combo = 0;
    sk.setText(sk.$("#run-combo"), "0");
    resetOrb();
  }
  raf = requestAnimationFrame(frame);
}

function startRound() {
  score = 0; combo = 0; left = ROUND_SEC; playing = true;
  sk.setText(sk.$("#run-score"), "0");
  sk.setText(sk.$("#run-combo"), "0");
  sk.setText(sk.$("#run-time"), String(left));
  showLayer("play");
  sk.closePanel("#scores-panel");
  sk.closePanel("#options-panel");
  resetOrb();
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(frame);
  clearInterval(tickTimer);
  tickTimer = setInterval(() => {
    if (!playing) return;
    left -= 1;
    sk.setText(sk.$("#run-time"), String(Math.max(0, left)));
    if (left <= 0) endRound();
  }, 1000);
}

sk.on(sk.$("#btn-help"), "click", () => {
  const help = sk.$("#help");
  const open = help.hidden;
  help.hidden = !open;
  sk.$("#btn-help").setAttribute("aria-expanded", String(open));
});

sk.on(sk.$("#btn-tap"), "click", () => {
  if (!playing) return;
  const lane = sk.$("#lane");
  const center = lane.clientWidth / 2;
  const dist = Math.abs(orbX + 20 - center);
  const orb = sk.$("#orb");
  if (dist < 40) {
    combo += 1;
    const gain = 100 + combo * 25;
    score += gain;
    sk.setText(sk.$("#run-score"), fmt(score));
    sk.setText(sk.$("#run-combo"), String(combo));
    orb.classList.add("hit");
    sk.pulse(sk.$("#btn-tap"));
    setTimeout(resetOrb, 110);
  } else {
    combo = 0;
    sk.setText(sk.$("#run-combo"), "0");
    sk.$("#vignette").classList.add("on");
    setTimeout(() => sk.$("#vignette").classList.remove("on"), 160);
  }
});

sk.on(sk.$("#btn-start"), "click", () => {
  const wrap = sk.$("#loading-bar-wrap");
  wrap.classList.add("visible");
  sk.setText(sk.$("#load-label"), "加载中…");
  let pct = 0;
  const bar = sk.$("#title-load-bar");
  const timer = setInterval(() => {
    pct += 8 + Math.floor(Math.random() * 8);
    if (pct >= 100) {
      clearInterval(timer);
      sk.setFill(bar, 100);
      sk.setText(sk.$("#load-label"), "就绪");
      startRound();
    } else sk.setFill(bar, pct);
  }, 60);
});

sk.on(sk.$("#btn-again"), "click", () => startRound());
sk.on(sk.$("#btn-title"), "click", () => {
  showLayer("title");
  sk.setText(sk.$("#load-label"), "投币中");
  sk.$("#loading-bar-wrap").classList.remove("visible");
  sk.setFill(sk.$("#title-load-bar"), 0);
});

sk.on(sk.$("#btn-scores"), "click", () => { sk.closePanel("#options-panel"); sk.togglePanel("#scores-panel"); });
sk.on(sk.$("#scores-close"), "click", () => sk.closePanel("#scores-panel"));
sk.on(sk.$("#btn-options"), "click", () => { sk.closePanel("#scores-panel"); sk.togglePanel("#options-panel"); });
sk.on(sk.$("#options-close"), "click", () => sk.closePanel("#options-panel"));

sk.$all("[data-vol]").forEach((btn) => {
  if (!btn.dataset.delta) return;
  sk.on(btn, "click", () => {
    const key = btn.dataset.vol;
    vol[key] = Math.max(0, Math.min(100, vol[key] + parseInt(btn.dataset.delta, 10)));
    syncVol(key);
  });
});

sk.on(sk.$("#btn-quit"), "click", () => {
  sk.modal({ title: "退出？", body: "高分已本地保存。", onConfirm: () => sk.toast("网格上再见！", "warning") });
});

Object.keys(vol).forEach(syncVol);
