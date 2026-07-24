(function () {
  const state = {
    hp: 620, hpMax: 1000,
    fp: 80, fpMax: 100,
    st: 100, stMax: 100,
    estus: 3, estusMax: 3,
    lock: false,
    nearBonfire: false,
    slate: false,
    enemyHp: 180,
    enemyAlive: true,
    lookX: 0, lookY: 0,
    vitalsUntil: 0,
    iFrames: 0,
  };

  const $ = (s) => document.querySelector(s);
  const world = $("#world");
  const enemy = $("#enemy");
  const loot = $("#loot");

  function feed(msg) {
    const el = document.createElement("div");
    el.textContent = msg;
    $("#feed").prepend(el);
    setTimeout(() => el.remove(), 2200);
  }

  function showVitals() {
    state.vitalsUntil = Date.now() + 2200;
    $("#vitals").classList.add("show");
  }

  function sync() {
    $("#hp-fill").style.width = (state.hp / state.hpMax) * 100 + "%";
    $("#fp-fill").style.width = (state.fp / state.fpMax) * 100 + "%";
    $("#st-fill").style.width = (state.st / state.stMax) * 100 + "%";
    $("#hp-row").classList.toggle("low", state.hp / state.hpMax < 0.28);
    $("#estus-n").textContent = String(state.estus);
    $("#btn-estus").disabled = state.estus <= 0;
    $("#place").classList.toggle("near", state.nearBonfire);
    $("#slate").classList.toggle("open", state.slate);
    enemy.classList.toggle("locked", state.lock && state.enemyAlive);
    enemy.classList.toggle("dead", !state.enemyAlive);
    if (Date.now() < state.vitalsUntil) $("#vitals").classList.add("show");
    else $("#vitals").classList.remove("show");
  }

  function setPrompt(text) {
    const p = $("#prompt");
    if (!text) { p.classList.remove("show"); p.textContent = ""; return; }
    p.textContent = text;
    p.classList.add("show");
  }

  function hurt(amount) {
    if (state.iFrames > 0 || state.slate) return;
    state.hp = Math.max(0, state.hp - amount);
    showVitals();
    $("#hurt").classList.add("on");
    setTimeout(() => $("#hurt").classList.remove("on"), 280);
    feed(state.hp <= 0 ? "死去" : "受伤");
    if (state.hp <= 0) {
      setTimeout(() => {
        state.hp = Math.floor(state.hpMax * 0.4);
        state.st = state.stMax;
        state.estus = Math.max(1, state.estus);
        feed("于废墟中苏醒");
        showVitals();
        sync();
      }, 1600);
    }
    sync();
  }

  function spendStam(n) {
    if (state.st < n) { feed("耐力不足"); return false; }
    state.st -= n;
    showVitals();
    return true;
  }

  function attack() {
    if (state.slate || !state.enemyAlive) return;
    if (!spendStam(18)) return;
    if (state.lock) {
      state.enemyHp -= 35 + Math.random() * 20;
      feed("命中 · " + Math.max(0, Math.round(state.enemyHp)));
      if (state.enemyHp <= 0) {
        state.enemyAlive = false;
        state.lock = false;
        loot.hidden = false;
        feed("敌人倒下 · 光点出现");
      } else if (Math.random() < 0.35) {
        setTimeout(() => hurt(40 + Math.random() * 30), 280);
      }
    } else {
      feed("挥空");
    }
    sync();
  }

  function roll() {
    if (state.slate) return;
    if (!spendStam(28)) return;
    state.iFrames = 8;
    feed("翻滚");
    sync();
  }

  function drinkEstus() {
    if (state.estus <= 0 || state.hp >= state.hpMax) return;
    state.estus -= 1;
    state.hp = Math.min(state.hpMax, state.hp + 280);
    showVitals();
    feed("喝下琥珀露滴");
    sync();
  }

  function useAction() {
    if (state.nearBonfire) {
      state.slate = true;
      setPrompt("");
      sync();
      return;
    }
    if (!loot.hidden) {
      loot.hidden = true;
      state.estus = Math.min(state.estusMax, state.estus + 1);
      feed("拾取 · 露滴残渣");
      sync();
      return;
    }
    if (state.enemyAlive) {
      state.lock = !state.lock;
      feed(state.lock ? "锁定 · 废墟守卫" : "解除锁定");
      sync();
    }
  }

  function rest() {
    state.hp = state.hpMax;
    state.fp = state.fpMax;
    state.st = state.stMax;
    state.estus = state.estusMax;
    state.slate = false;
    state.enemyHp = 180;
    state.enemyAlive = true;
    loot.hidden = true;
    state.lock = false;
    showVitals();
    feed("于篝火旁休息");
    sync();
  }

  function applyLook() {
    world.style.transform = `translate(${-state.lookX}px, ${-state.lookY}px)`;
  }

  function updateNear() {
    const dx = Math.abs(state.lookX);
    const dy = Math.abs(state.lookY + 4);
    state.nearBonfire = dx < 14 && dy < 12;
    if (state.nearBonfire && !state.slate) setPrompt("点篝火 · 休息");
    else if (!loot.hidden) setPrompt("点残渣 · 拾取");
    else if (state.lock) setPrompt("锁定中 · 点按攻击");
    else setPrompt("");
  }

  // Pointer: look / tap
  const vp = $("#viewport");
  let drag = null;

  vp.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".hit") || e.target.closest(".slate")) return;
    drag = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      moved: false,
      lookX: state.lookX,
      lookY: state.lookY,
    };
    try { vp.setPointerCapture(e.pointerId); } catch (_) {}
  });
  vp.addEventListener("pointermove", (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (Math.hypot(dx, dy) > 8) drag.moved = true;
    state.lookX = Math.max(-30, Math.min(30, drag.lookX - dx * 0.08));
    state.lookY = Math.max(-18, Math.min(18, drag.lookY - dy * 0.08));
    applyLook();
    updateNear();
  });
  vp.addEventListener("pointerup", (e) => {
    if (!drag || drag.id !== e.pointerId) return;
    drag = null;
  });
  vp.addEventListener("contextmenu", (e) => e.preventDefault());

  $("#bonfire").addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    state.nearBonfire = true;
    useAction();
  });
  $("#enemy").addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    if (!state.enemyAlive) return;
    state.lock = true;
    feed("锁定 · 废墟守卫");
    sync();
  });
  loot.addEventListener("pointerdown", (e) => {
    e.stopPropagation();
    useAction();
  });

  $("#btn-attack").addEventListener("pointerdown", (e) => {
    e.preventDefault(); e.stopPropagation(); attack();
  });
  $("#btn-roll").addEventListener("pointerdown", (e) => {
    e.preventDefault(); e.stopPropagation(); roll();
  });
  $("#btn-estus").addEventListener("pointerdown", (e) => {
    e.preventDefault(); e.stopPropagation(); drinkEstus();
  });

  const lockBtn = $("#btn-lock");
  function lockStart(e) {
    e.preventDefault(); e.stopPropagation();
    if (!state.enemyAlive) return;
    state.lock = true;
    lockBtn.classList.add("pressed");
    feed("锁定");
    sync();
  }
  function lockEnd(e) {
    e.preventDefault(); e.stopPropagation();
    lockBtn.classList.remove("pressed");
  }
  lockBtn.addEventListener("pointerdown", lockStart);
  lockBtn.addEventListener("pointerup", lockEnd);
  lockBtn.addEventListener("pointerleave", lockEnd);
  lockBtn.addEventListener("pointercancel", lockEnd);

  $("#slate-rest").addEventListener("click", rest);
  $("#slate-leave").addEventListener("click", () => {
    state.slate = false;
    sync();
  });

  const help = $("#help");
  const helpBtn = $("#btn-help");
  helpBtn.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const open = help.hidden;
    help.hidden = !open;
    document.body.classList.toggle("help-open", open);
  });

  setInterval(() => {
    if (state.iFrames > 0) state.iFrames -= 1;
    if (!state.slate) state.st = Math.min(state.stMax, state.st + 1.1);
    if (state.st < state.stMax) showVitals();
    updateNear();
    sync();
  }, 100);

  feed("废墟中回响着篝火的噼啪声");
  showVitals();
  sync();
})();
