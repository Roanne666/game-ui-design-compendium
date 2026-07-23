/**
 * Shared interaction helpers for genre-bound demo scenes.
 * Vanilla JS, no build step.
 */
(function (global) {
  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $all(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }
  function on(el, ev, fn) {
    if (!el) return;
    el.addEventListener(ev, fn);
  }

  function ensureToastHost() {
    let host = $("#sk-toast-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "sk-toast-host";
      host.style.cssText =
        "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;";
      document.body.appendChild(host);
    }
    return host;
  }

  function toast(msg, tone) {
    const host = ensureToastHost();
    const el = document.createElement("div");
    el.className = "alert" + (tone ? " " + tone : "");
    el.textContent = msg;
    el.style.pointerEvents = "auto";
    el.style.minWidth = "220px";
    host.appendChild(el);
    setTimeout(() => el.remove(), 2200);
  }

  function setFill(el, pct) {
    if (!el) return;
    const p = Math.max(0, Math.min(100, pct));
    el.style.width = p + "%";
    el.style.height = el.style.height; // keep arc-fill if used via height
    if (el.classList.contains("arc-fill") || el.dataset.mode === "height") {
      el.style.height = p + "%";
      el.style.width = "";
    }
  }

  function setText(el, text) {
    if (el) el.textContent = text;
  }

  function openPanel(sel) {
    const el = typeof sel === "string" ? $(sel) : sel;
    if (!el) return;
    el.hidden = false;
    el.classList.add("is-open");
  }

  function closePanel(sel) {
    const el = typeof sel === "string" ? $(sel) : sel;
    if (!el) return;
    el.hidden = true;
    el.classList.remove("is-open");
  }

  function togglePanel(sel) {
    const el = typeof sel === "string" ? $(sel) : sel;
    if (!el) return;
    if (el.hidden || !el.classList.contains("is-open")) openPanel(el);
    else closePanel(el);
  }

  function bindSlots(container, onSelect) {
    const root = typeof container === "string" ? $(container) : container;
    if (!root) return;
    $all(".slot", root).forEach((slot) => {
      on(slot, "click", () => {
        $all(".slot", root).forEach((s) => s.classList.remove("selected"));
        slot.classList.add("selected");
        if (onSelect) onSelect(slot, slot.dataset);
      });
    });
  }

  function modal(opts) {
    const existing = $("#sk-modal");
    if (existing) existing.remove();
    const wrap = document.createElement("div");
    wrap.id = "sk-modal";
    wrap.style.cssText =
      "position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:10000;";
    wrap.innerHTML =
      '<div class="panel" style="min-width:280px;max-width:420px">' +
      '<div class="panel-title"></div><div class="panel-body" style="margin:12px 0"></div>' +
      '<div style="display:flex;gap:8px;justify-content:flex-end">' +
      '<button type="button" class="btn" data-sk="cancel">Cancel</button>' +
      '<button type="button" class="btn btn-primary" data-sk="ok">OK</button></div></div>';
    wrap.querySelector(".panel-title").textContent = opts.title || "Confirm";
    wrap.querySelector(".panel-body").textContent = opts.body || "";
    document.body.appendChild(wrap);
    function close() {
      wrap.remove();
    }
    on(wrap.querySelector('[data-sk="cancel"]'), "click", close);
    on(wrap.querySelector('[data-sk="ok"]'), "click", () => {
      if (opts.onConfirm) opts.onConfirm();
      close();
    });
    on(wrap, "click", (e) => {
      if (e.target === wrap) close();
    });
  }

  function pulse(el) {
    if (!el) return;
    el.animate(
      [
        { transform: "scale(1)", filter: "brightness(1)" },
        { transform: "scale(1.04)", filter: "brightness(1.35)" },
        { transform: "scale(1)", filter: "brightness(1)" },
      ],
      { duration: 320, easing: "ease-out" }
    );
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const m = $("#sk-modal");
      if (m) m.remove();
      $all("[data-sk-panel].is-open").forEach(closePanel);
    }
  });

  global.SceneKit = {
    $,
    $all,
    on,
    toast,
    setFill,
    setText,
    openPanel,
    closePanel,
    togglePanel,
    bindSlots,
    modal,
    pulse,
  };
})(window);
