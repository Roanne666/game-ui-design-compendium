document.getElementById("help-btn").addEventListener("click", () => {
  const h = document.getElementById("help");
  if (h.hasAttribute("hidden")) h.removeAttribute("hidden");
  else h.setAttribute("hidden", "");
});
document.getElementById("act").addEventListener("click", () => {
  if (window.SceneKit && SceneKit.toast) SceneKit.toast("已执行主操作", "ok");
});
