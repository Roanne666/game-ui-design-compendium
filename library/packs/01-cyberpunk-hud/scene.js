(function () {
  const weapons = [
    { name: "团结", cur: 24, res: 120, mag: 24, dmg: 35 },
    { name: "DB-2 沙塔拉", cur: 6, res: 24, mag: 6, dmg: 90 },
    { name: "悟", cur: 1, res: 1, mag: 1, dmg: 120, melee: true },
  ];
  const jobs = [
    { main: "在来世与中间人接头", sub: "入口 · 240米" },
    { main: "幽灵掉安保摄像头", sub: "设备 · 22米" },
    { main: "可选：放倒卫兵", sub: "敌对 · 18米" },
  ];

  const dialects = ["neo", "matrix", "amber", "noir"];
  const dialectLabel = {
    neo: "新军国主义",
    matrix: "矩阵终端",
    amber: "琥珀义体",
    noir: "霓虹黑色电影",
  };

  const state = {
    hp: 620, hpMax: 1000,
    st: 100, ar: 40,
    ram: 6, ramMax: 6,
    w: 0,
    scan: false,
    lock: null,
    focus: null,
    lookX: 0, lookY: 0,
    keys: {},
    sprint: false,
    journal: false,
    shard: false,
    doorOpen: false,
    dialect: "neo",
    pocketTouched: false,
  };

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const world = $("#world");

  function setDialect(id) {
    if (!dialects.includes(id)) return;
    state.dialect = id;
    document.body.dataset.dialect = id;
    $$("#dialect-bar button").forEach((b) => b.classList.toggle("on", b.dataset.d === id));
    const hud = $("#hud");
    hud.classList.remove("dialect-flash");
    void hud.offsetWidth;
    hud.classList.add("dialect-flash");
    feed("方言 · " + dialectLabel[id]);
  }

  function feed(msg) {
    const el = document.createElement("div");
    el.textContent = msg;
    $("#feed").prepend(el);
    setTimeout(() => el.remove(), 2200);
  }

  function renderRamTicks() {
    const row = $("#ram-ticks");
    row.innerHTML = "";
    for (let i = 0; i < state.ramMax; i++) {
      const t = document.createElement("div");
      t.className = "tick" + (i < state.ram ? " on" : "");
      row.appendChild(t);
    }
  }

  function sync() {
    const w = weapons[state.w];
    $("#hp-fill").style.width = (state.hp / state.hpMax) * 100 + "%";
    $("#st-fill").style.width = state.st + "%";
    $("#hp-num").textContent = String(Math.round(state.hp));
    $("#ammo-cur").textContent = String(w.cur);
    $("#ammo-res").textContent = String(w.res);
    renderRamTicks();
    $$(".pockets .pocket[data-w]").forEach((s) => {
      const i = Number(s.dataset.w);
      s.classList.toggle("on", i === state.w);
    });
    document.body.classList.toggle("scan-on", state.scan);
    $("#scan-flag").textContent = state.scan ? "扫描开" : "扫描关";
    $("#scan-flag").classList.toggle("on", state.scan);
    $("#scan-flag").classList.toggle("off", !state.scan);
    $("#btn-scan").classList.toggle("on", state.scan);
    $("#crosshair").classList.toggle("hack", !!state.lock);
    $("#ram-menu").classList.toggle("show", !!state.lock);
    $("#journal").classList.toggle("open", state.journal);
    $("#stamina").classList.toggle("show", state.sprint || state.st < 99);
    $$(".entity").forEach((ent) => {
      const markable = ent.dataset.type === "hostile" || ent.dataset.type === "device";
      ent.classList.toggle("scan-dim", !state.scan && markable);
      ent.classList.toggle("marked", state.scan && markable && !ent.hidden);
    });
  }

  function setFocus(ent) {
    state.focus = ent;
    const prompt = $("#prompt");
    const hackBtn = $("#btn-hack");
    if (!ent) {
      prompt.classList.remove("show");
      hackBtn.setAttribute("aria-label", "黑客");
      hackBtn.disabled = true;
      return;
    }
    const type = ent.dataset.type;
    let key = "●", text = "点选 · " + ent.dataset.name;
    let act = "互动";
    if (type === "hostile") { key = "◆"; text = "黑客 · " + ent.dataset.name; act = "黑客"; }
    if (type === "loot") { key = "●"; text = "拾取 · " + ent.dataset.name; act = "拾取"; }
    if (type === "door") { key = "●"; text = state.doorOpen ? "进入 · 来世" : "开门 · 需要芯片"; act = "开门"; }
    if (type === "device") { key = "◆"; text = "入侵 · " + ent.dataset.name; act = "黑客"; }
    if (type === "neutral") { key = "○"; text = "平民 · " + ent.dataset.name; act = "观察"; }
    $("#prompt-key").textContent = key;
    $("#prompt-text").textContent = text;
    prompt.classList.add("show");
    hackBtn.setAttribute("aria-label", act);
    hackBtn.disabled = false;
  }

  function nearestEntity(clientX, clientY) {
    let best = null, bestD = 56;
    $$(".entity").forEach((ent) => {
      if (ent.hidden) return;
      const r = ent.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.55;
      const d = Math.hypot(clientX - cx, clientY - cy);
      if (d < bestD) { bestD = d; best = ent; }
    });
    return best;
  }

  function hurt(amount) {
    let dmg = amount;
    if (state.ar > 0) {
      const absorb = Math.min(state.ar, dmg * 0.5);
      state.ar -= absorb;
      dmg -= absorb;
    }
    state.hp = Math.max(0, state.hp - dmg);
    $("#hurt").classList.add("on");
    setTimeout(() => $("#hurt").classList.remove("on"), 280);
    feed(state.hp <= 0 ? "脑死亡 // 危急" : "损伤 −" + Math.round(amount));
    sync();
  }

  function reload() {
    const w = weapons[state.w];
    if (w.melee) return;
    const need = w.mag - w.cur;
    const take = Math.min(need, w.res);
    w.cur += take;
    w.res -= take;
    feed(take ? "已换弹 · " + w.name : "备弹不足");
    sync();
  }

  function useFocus() {
    const ent = state.focus;
    if (!ent) return;
    const type = ent.dataset.type;
    if (type === "loot") {
      state.shard = true;
      ent.hidden = true;
      setFocus(null);
      feed("获得 · 数据芯片");
      $("#q-sub").textContent = "门已开 · 6米";
    } else if (type === "door") {
      if (state.shard || state.doorOpen) {
        state.doorOpen = true;
        feed("门已开 · 来世");
        $("#q-main").textContent = "进入来世";
        $("#q-sub").textContent = "握手就绪";
      } else {
        feed("锁定 · 需要数据芯片");
        hurt(15);
      }
    } else if (type === "hostile" || type === "device") {
      lockEntity(ent);
    } else if (type === "neutral") {
      feed("无威胁 · 平民");
    }
  }

  function lockEntity(ent) {
    const markable = ent.dataset.type === "hostile" || ent.dataset.type === "device";
    if (markable && !state.scan) {
      feed("先开启扫描再标记目标");
      return;
    }
    $$(".entity").forEach((e) => e.classList.remove("locked"));
    if (state.lock === ent) {
      state.lock = null;
      sync();
      return;
    }
    state.lock = ent;
    ent.classList.add("locked");
    if (!ent.dataset.hp) ent.dataset.hp = ent.dataset.type === "hostile" ? "100" : "40";
    feed("标记 · " + ent.dataset.name);
    sync();
  }

  const hackName = {
    ping: "侦测",
    distract: "干扰",
    breach: "突破",
    suicide: "系统重置",
  };

  function hack(id, cost) {
    if (!state.lock) return;
    if (state.ram < cost) { feed("运算力不足"); return; }
    state.ram -= cost;
    const target = state.lock;
    feed("黑客 · " + (hackName[id] || id) + " · " + target.dataset.name);
    if (id === "distract" && target.dataset.type === "hostile") {
      feed("卫兵已被干扰");
    }
    if (id === "breach" && target.dataset.type === "device") {
      target.hidden = true;
      state.lock = null;
      feed("摄像头离线 · 已幽灵");
      $("#q-main").textContent = jobs[1].main;
      $("#q-sub").textContent = "完成";
    }
    if (id === "suicide" && target.dataset.type === "hostile") {
      target.hidden = true;
      state.lock = null;
      feed("系统重置 · 目标倒下");
    }
    if (id === "ping") {
      document.body.classList.add("scan-on");
      state.scan = true;
      feed("侦测 · 网络已揭示");
    }
    sync();
  }

  function applyLook() {
    world.style.transform = `translate(${-state.lookX}px, ${-state.lookY}px)`;
  }

  function fire() {
    if (state.journal) return;
    if (!state.scan) {
      feed("扫描离线 · 无法精确交火");
      return;
    }
    const w = weapons[state.w];
    if (!w.melee && w.cur <= 0) { feed("空仓 · 点换弹"); return; }
    if (!w.melee) w.cur -= 1;
    sync();
    if (state.lock && state.lock.dataset.type === "hostile") {
      const hp = Number(state.lock.dataset.hp || 100) - w.dmg;
      state.lock.dataset.hp = String(hp);
      feed("命中 · " + state.lock.dataset.name + " · " + Math.max(0, Math.round(hp)));
      if (hp <= 0) {
        feed("已放倒 · " + state.lock.dataset.name);
        state.lock.hidden = true;
        state.lock = null;
        setFocus(null);
      }
    } else {
      feed(state.lock ? (w.melee ? "挥砍" : "射击") : "未标记目标 · 弹药已耗");
    }
  }

  function doHackOrInteract() {
    const ent = state.focus;
    if (!ent) return;
    const type = ent.dataset.type;
    if (type === "hostile" || type === "device") {
      if (state.lock === ent) {
        /* already locked — ram menu visible */
        feed("选择快速黑客");
      } else {
        lockEntity(ent);
      }
    } else {
      useFocus();
    }
  }

  // —— Touch / pointer (mobile primary) ——
  const vp = $("#viewport");
  let drag = null;

  function onPointerDown(e) {
    if (e.target.closest(".hit") || e.target.closest("#journal") || e.target.closest(".ram")) return;
    if (e.target.closest(".entity")) {
      const ent = e.target.closest(".entity");
      setFocus(ent);
      if (ent.dataset.type === "hostile" || ent.dataset.type === "device") lockEntity(ent);
      return;
    }
    drag = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      moved: false,
      lookX: state.lookX,
      lookY: state.lookY,
    };
    try { vp.setPointerCapture(e.pointerId); } catch (_) {}
  }

  function onPointerMove(e) {
    if (!drag || drag.id !== e.pointerId) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (Math.hypot(dx, dy) > 8) drag.moved = true;
    state.lookX = Math.max(-28, Math.min(28, drag.lookX - dx * 0.08));
    state.lookY = Math.max(-16, Math.min(16, drag.lookY - dy * 0.08));
    applyLook();
  }

  function onPointerUp(e) {
    if (!drag || drag.id !== e.pointerId) return;
    if (!drag.moved) {
      const ent = nearestEntity(e.clientX, e.clientY);
      if (ent) setFocus(ent);
    }
    drag = null;
  }

  vp.addEventListener("pointerdown", onPointerDown);
  vp.addEventListener("pointermove", onPointerMove);
  vp.addEventListener("pointerup", onPointerUp);
  vp.addEventListener("pointercancel", () => { drag = null; });
  vp.addEventListener("contextmenu", (e) => e.preventDefault());

  $("#btn-fire").addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    fire();
  });
  $("#btn-hack").addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    doHackOrInteract();
  });
  $("#btn-reload").addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    reload();
  });
  $("#btn-scan").addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    state.scan = !state.scan;
    if (!state.scan && state.lock) {
      state.lock = null;
      $$(".entity").forEach((x) => x.classList.remove("locked"));
    }
    feed(state.scan ? "扫描仪在线 · 可标记目标" : "扫描仪离线");
    sync();
  });
  $("#btn-journal").addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    state.journal = !state.journal;
    sync();
  });
  const sprintBtn = $("#btn-sprint");
  function sprintStart(e) {
    e.preventDefault();
    e.stopPropagation();
    state.sprint = true;
    sprintBtn.classList.add("pressed");
    sync();
  }
  function sprintEnd(e) {
    e.preventDefault();
    e.stopPropagation();
    state.sprint = false;
    sprintBtn.classList.remove("pressed");
    sync();
  }
  sprintBtn.addEventListener("pointerdown", sprintStart);
  sprintBtn.addEventListener("pointerup", sprintEnd);
  sprintBtn.addEventListener("pointerleave", sprintEnd);
  sprintBtn.addEventListener("pointercancel", sprintEnd);

  $$("#dialect-bar button").forEach((b) => {
    b.addEventListener("click", () => setDialect(b.dataset.d));
  });
  $$(".pockets .pocket[data-w]").forEach((s) => {
    s.addEventListener("click", () => {
      state.w = Number(s.dataset.w);
      state.pocketTouched = true;
      feed("已装备 · " + weapons[state.w].name);
      sync();
    });
  });
  $$("#ram-menu button").forEach((b) => {
    b.addEventListener("click", () => hack(b.dataset.hack, Number(b.dataset.cost)));
  });
  $$("#journal .job").forEach((j) => {
    j.addEventListener("click", () => {
      $$("#journal .job").forEach((x) => x.classList.remove("active"));
      j.classList.add("active");
      const job = jobs[Number(j.dataset.job)];
      $("#q-main").textContent = job.main;
      $("#q-sub").textContent = job.sub;
      feed("已钉选委托 · " + job.main);
      state.journal = false;
      sync();
    });
  });

  // Desktop debug only (not shown in help)
  window.addEventListener("keydown", (e) => {
    if (e.code === "BracketLeft" || e.code === "BracketRight") {
      const i = dialects.indexOf(state.dialect);
      const next = e.code === "BracketRight"
        ? dialects[(i + 1) % dialects.length]
        : dialects[(i - 1 + dialects.length) % dialects.length];
      setDialect(next);
    }
    if (e.code === "Escape") {
      if (state.lock) {
        state.lock = null;
        $$(".entity").forEach((x) => x.classList.remove("locked"));
      }
      state.journal = false;
      sync();
    }
    if (e.code === "KeyH") {
      const help = $("#help");
      help.hidden = !help.hidden;
      document.body.classList.toggle("help-open", !help.hidden);
    }
  });

  const helpEl = $("#help");
  $("#btn-help").addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const open = helpEl.hidden;
    helpEl.hidden = !open;
    document.body.classList.toggle("help-open", open);
  });

  // Ambient loop
  let t = 0;
  setInterval(() => {
    t += 1;
    const now = new Date();
    $("#clock").textContent = now.toTimeString().slice(0, 8);
    if (state.sprint) state.st = Math.max(0, state.st - 1.2);
    else state.st = Math.min(100, state.st + 0.4);
    if (state.ram < state.ramMax && t % 40 === 0) state.ram += 1;
    if (t % 120 === 0 && !state.journal && Math.random() < 0.35) {
      feed("附近有枪声");
      if (Math.random() < 0.4) hurt(25 + Math.random() * 40);
    }
    const ang = (t / 20) % 360;
    $("#mm-player").style.transform = `translate(-50%,-50%) rotate(${ang}deg)`;
    sync();
  }, 100);

  feed("链路已建立 · 先开扫描再标记");
  setFocus(null);
  sync();
})();
