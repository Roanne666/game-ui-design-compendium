const sk = SceneKit;
let hp = 72;
let selectedSlot = null;
const SEGMENTS = 10;

function feed(msg) {
  const el = document.createElement("div");
  el.textContent = msg;
  sk.$("#feed").prepend(el);
  setTimeout(() => el.remove(), 2400);
}

function flashVignette() {
  const v = sk.$("#vignette");
  v.classList.add("on");
  setTimeout(() => v.classList.remove("on"), 400);
}

function renderSpine() {
  const bar = sk.$("#spine-bar");
  bar.innerHTML = "";
  const lit = Math.round((hp / 100) * SEGMENTS);
  for (let i = 0; i < SEGMENTS; i++) {
    const seg = document.createElement("div");
    seg.className = "spine-seg";
    if (i < lit) {
      if (hp <= 25) seg.classList.add("danger");
      else if (hp <= 50) seg.classList.add("warn");
      else seg.classList.add("on");
    }
    bar.appendChild(seg);
  }
  sk.setText(sk.$("#hp-label"), hp + "%");
  sk.$("#bag-dot").hidden = hp > 35;
}

function openBag() {
  sk.$("#inv-modal").hidden = false;
  sk.$("#ctx").classList.remove("show");
  renderSpine();
}

function closeBag() {
  sk.$("#inv-modal").hidden = true;
  selectedSlot = null;
  sk.$all(".slot").forEach((s) => s.classList.remove("selected"));
  sk.setText(sk.$("#sel-name"), "—");
  sk.$("#ctx").classList.add("show");
}

function tryDoor() {
  const hasKey = sk.$('.slot[data-item="key"].has');
  if (hasKey) {
    feed("锁芯转动了");
    sk.$("#exit-note").hidden = false;
  } else {
    feed("上锁 — 需要黄铜钥匙");
    flashVignette();
  }
}

sk.on(sk.$("#btn-help"), "click", () => {
  const help = sk.$("#help");
  const open = help.hidden;
  help.hidden = !open;
  sk.$("#btn-help").setAttribute("aria-expanded", String(open));
});

sk.on(sk.$("#btn-bag"), "click", openBag);
sk.on(sk.$("#btn-close-bag"), "click", closeBag);
sk.on(sk.$("#inv-modal"), "click", (e) => {
  if (e.target === sk.$("#inv-modal")) closeBag();
});
sk.on(sk.$("#btn-world-door"), "click", tryDoor);
sk.on(sk.$("#btn-exit-ok"), "click", () => {
  sk.$("#exit-note").hidden = true;
  feed("检查点已写入");
});

sk.bindSlots("#inv", (slot) => {
  sk.$all(".slot").forEach((s) => s.classList.remove("selected"));
  if (!slot.classList.contains("has")) {
    sk.setText(sk.$("#sel-name"), "空槽位");
    selectedSlot = null;
    return;
  }
  slot.classList.add("selected");
  selectedSlot = slot;
  sk.setText(sk.$("#sel-name"), slot.dataset.label + (slot.dataset.qty ? " ×" + slot.dataset.qty : ""));
});

function consumeOne(slot) {
  let q = parseInt(slot.dataset.qty || "1", 10);
  q -= 1;
  if (q <= 0) {
    slot.classList.remove("has", "selected");
    slot.innerHTML = "";
    slot.removeAttribute("data-item");
    slot.removeAttribute("data-qty");
    slot.removeAttribute("data-label");
    selectedSlot = null;
    sk.setText(sk.$("#sel-name"), "—");
  } else {
    slot.dataset.qty = String(q);
    const qtyEl = slot.querySelector(".qty");
    if (qtyEl) qtyEl.textContent = "×" + q;
  }
}

sk.on(sk.$("#btn-use"), "click", () => {
  if (!selectedSlot || !selectedSlot.dataset.item) { feed("先选一格"); return; }
  if (selectedSlot.dataset.item === "med") {
    hp = Math.min(100, hp + 18);
    renderSpine();
    consumeOne(selectedSlot);
    feed("包扎 +18");
    sk.pulse(sk.$("#spine-bar"));
  } else if (selectedSlot.dataset.item === "key") {
    feed("钥匙留着开门用");
  } else {
    feed("现在用不了");
  }
});

sk.on(sk.$("#btn-door"), "click", tryDoor);

sk.on(sk.$("#btn-hurt"), "click", () => {
  hp = Math.max(0, hp - 15);
  renderSpine();
  flashVignette();
  feed(hp <= 0 ? "生命体征衰竭" : "剧痛 −15%");
});

renderSpine();
