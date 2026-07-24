(function () {
  const WEAPON_MIN = 20;
  const CIRC = 289;
  const pwr = { engines: 42, shields: 33, weapons: 25 };
  const modes = ["超巡航", "巡航", "手动"];
  let modeIdx = 0;
  let hull = 88;
  let locked = false;
  let lockPct = 0;

  const $ = (s) => document.querySelector(s);
  const reticle = $("#reticle");
  const fireBtn = $("#btn-fire");
  const badge = $("#target-badge");
  const lockLabel = $("#lock-label");
  const lockArc = $("#lock-arc");
  const fireHint = $("#fire-hint");
  const feed = $("#feed");
  const hurt = $("#hurt");

  function toast(msg, cls) {
    const line = document.createElement("div");
    line.className = "line" + (cls ? " " + cls : "");
    line.textContent = msg;
    feed.prepend(line);
    while (feed.children.length > 4) feed.lastChild.remove();
  }

  function syncPwrUI() {
    ["engines", "shields", "weapons"].forEach((k) => {
      $("#pwr-" + k).textContent = String(pwr[k]);
      $("#rng-" + k).value = String(pwr[k]);
    });
    $("#pwr-total").textContent = String(pwr.engines + pwr.shields + pwr.weapons);
    updateFireGate();
  }

  function setPwr(key, newVal) {
    newVal = Math.max(0, Math.min(100, newVal));
    const others = Object.keys(pwr).filter((k) => k !== key);
    const otherSum = others.reduce((s, k) => s + pwr[k], 0);
    const maxFor = 100 - otherSum;
    if (newVal > maxFor) newVal = maxFor;
    pwr[key] = newVal;
    let total = pwr.engines + pwr.shields + pwr.weapons;
    if (total < 100) {
      pwr[others[0]] = Math.min(100, pwr[others[0]] + (100 - total));
    }
    syncPwrUI();
  }

  function canFire() {
    return locked && pwr.weapons >= WEAPON_MIN && hull > 0;
  }

  function updateFireGate() {
    const ok = canFire();
    fireBtn.classList.toggle("show", locked);
    fireBtn.disabled = !ok;
    if (!locked) {
      fireHint.className = "warn";
      fireHint.textContent = "射击需武器 ≥" + WEAPON_MIN + " 且锁定";
    } else if (pwr.weapons < WEAPON_MIN) {
      fireHint.className = "need";
      fireHint.textContent = "武器能量不足 · 请上调";
    } else {
      fireHint.className = "ok";
      fireHint.textContent = "武器就绪 · 可射击";
    }
  }

  function setLockVisual() {
    const dash = (lockPct / 100) * CIRC;
    lockArc.setAttribute("stroke-dasharray", dash + " " + CIRC);
    lockLabel.textContent = locked ? "已锁定" : ("锁定 " + lockPct + "%");
    reticle.classList.toggle("locked", locked);
    badge.classList.toggle("hot", locked);
    badge.textContent = locked
      ? "目标 · 已锁定 · 检查武器能量"
      : (lockPct > 0 ? "目标 · 锁定中 " + lockPct + "%" : "目标 · 12.4 公里 · 未锁定");
    updateFireGate();
  }

  function progressLock() {
    if (locked) {
      locked = false;
      lockPct = 0;
      setLockVisual();
      toast("锁定已解除");
      return;
    }
    lockPct = Math.min(100, lockPct + 25);
    if (lockPct >= 100) {
      locked = true;
      toast("目标已锁定", "ok");
    } else {
      toast("锁定进度 " + lockPct + "%");
    }
    setLockVisual();
  }

  function fire() {
    if (!canFire()) {
      toast(pwr.weapons < WEAPON_MIN ? "武器能量不足" : "未锁定", "warn");
      return;
    }
    const dmg = 6 + Math.floor(pwr.weapons / 8);
    toast("命中 · 伤害 " + dmg, "ok");
    if (Math.random() < 0.4) {
      const ret = Math.max(3, 12 - Math.floor(pwr.shields / 12));
      hull = Math.max(0, hull - ret);
      $("#hull-n").textContent = hull + "%";
      hurt.classList.add("on");
      setTimeout(() => hurt.classList.remove("on"), 320);
      toast(hull <= 0 ? "船体破裂" : "敌方回击 −" + ret + "%", hull <= 25 ? "danger" : "warn");
      updateFireGate();
    }
  }

  function setMode(i) {
    modeIdx = i;
    const m = modes[modeIdx];
    $("#nav-mode").textContent = m;
    $("#slate-mode").textContent = m;
    toast("驱动：" + m);
  }

  document.querySelectorAll(".pwr-row").forEach((row) => {
    const key = row.dataset.sys;
    const input = row.querySelector("input");
    input.addEventListener("input", () => setPwr(key, parseInt(input.value, 10)));
    row.querySelectorAll("[data-delta]").forEach((btn) => {
      btn.addEventListener("click", () => setPwr(key, pwr[key] + parseInt(btn.dataset.delta, 10)));
    });
  });

  reticle.addEventListener("click", progressLock);
  $("#target").addEventListener("click", (e) => {
    e.stopPropagation();
    progressLock();
  });
  fireBtn.addEventListener("click", fire);

  $("#btn-nav").addEventListener("click", () => $("#nav-slate").classList.toggle("open"));
  $("#slate-close").addEventListener("click", () => $("#nav-slate").classList.remove("open"));
  $("#btn-mode").addEventListener("click", () => setMode((modeIdx + 1) % modes.length));
  $("#slate-mode-btn").addEventListener("click", () => setMode((modeIdx + 1) % modes.length));
  $("#btn-help").addEventListener("click", () => {
    const h = $("#help");
    if (h.hasAttribute("hidden")) h.removeAttribute("hidden");
    else h.setAttribute("hidden", "");
  });

  syncPwrUI();
  setLockVisual();
})();
