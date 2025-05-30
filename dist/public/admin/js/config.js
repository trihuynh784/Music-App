// Sider Collapsed
// Onblur Collapsed
document.addEventListener("click", function (e) {
  const buttonCollapsed = document.querySelector("[button-collapsed]");
  if (buttonCollapsed.contains(e.target)) return;
  
  const sider = document.querySelector("sider");
  if (sider && !sider.contains(e.target)) {
    const body = document.querySelector("body");
    if (!body.classList.contains("collapsed")) {
      body.classList.add("collapsed");
      body.classList.add("show");
    }
  }
});

const buttonCollapsed = document.querySelector("[button-collapsed]");
if (buttonCollapsed) {
  buttonCollapsed.addEventListener("click", () => {
    const body = document.querySelector("body");

    body.classList.toggle("collapsed");
    body.classList.toggle("show");
  });
}

const secondLevel = (elementToggle, elementAddClass) => {
  elementToggle.addEventListener("click", () => {
    const secondLevel = document.querySelector(elementAddClass);
    secondLevel.classList.toggle("show");
  });
};

// Sider nav second level
const sidebarEcommerce = document.querySelector("[data-item='ecommerce']");
if (sidebarEcommerce) {
  secondLevel(sidebarEcommerce, "#sidebarEcommerce");
}

const sidebarAccount = document.querySelector('[data-item="account"]');
if (sidebarAccount) {
  secondLevel(sidebarAccount, "#sidebarAccount");
}

const sidebarMaps = document.querySelector('[data-item="maps"]');
if (sidebarMaps) {
  secondLevel(sidebarMaps, "#sidebarMaps");
}
// End Sider Collapsed

// Responsive
function toggleCollapseClass() {
  const element = document.querySelector("body");
  if (window.innerWidth < 991.98) {
    element.classList.add("collapsed");
    element.classList.add("show");
  } else {
    element.classList.remove("collapsed");
    element.classList.remove("show");
  }
}

// Gọi khi load trang
toggleCollapseClass();

// Gọi khi resize
window.addEventListener("resize", toggleCollapseClass);
// End Responsive
