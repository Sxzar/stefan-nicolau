const toggleBtn = document.getElementById("menu-toggle");
const drawer = document.getElementById("mobile-drawer");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("drawer-close");

function openDrawer() {
  drawer.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");
  toggleBtn.setAttribute("aria-expanded", "true");
  overlay.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  drawer.classList.add("translate-x-full");
  overlay.classList.add("hidden");
  toggleBtn.setAttribute("aria-expanded", "false");
  overlay.setAttribute("aria-hidden", "true");
}

toggleBtn.addEventListener("click", openDrawer);
closeBtn.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);

// Close on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});
