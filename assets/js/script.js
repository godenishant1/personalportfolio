'use strict';



// element toggle function
const elementToggleFunc = function (elem) {
  if (!elem) return;
  elem.classList.toggle("active");
}


// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (!modalContainer || !overlay) return;
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}
// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
testimonialsItem[i].addEventListener("click", function () {
  const t = this.querySelector("[data-testimonials-title]");
  const tx = this.querySelector("[data-testimonials-text]");

  if (!t || !tx || !modalTitle || !modalText) return;

  modalTitle.innerHTML = t.innerHTML;
  modalText.innerHTML = tx.innerHTML;
  testimonialsModalFunc();
});

// close modal


}

// add click event to modal close button
if (modalCloseBtn && overlay && modalContainer) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}




// add event in all select items
if (select && selectItems.length && selectValue) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
if (filterBtn.length && selectValue) {
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {

      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;

    });
  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formBtn && formInputs.length) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}

// theme toggle
const themeToggleBtn = document.getElementById("themeToggle");
const themeStorageKey = "theme";

if (themeToggleBtn) {

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.setAttribute("data-theme", "light");
      themeToggleBtn.textContent = "☀️";
      localStorage.setItem(themeStorageKey, "light");
    } else {
      document.body.removeAttribute("data-theme");
      themeToggleBtn.textContent = "🌙";
      localStorage.setItem(themeStorageKey, "dark");
    }
  }

const savedTheme = localStorage.getItem(themeStorageKey);
if (savedTheme === "light" || savedTheme === "dark") {
  applyTheme(savedTheme);
} else {
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(prefersLight ? "light" : "dark");
}

  themeToggleBtn.addEventListener("click", function () {
    const isLight = document.body.getAttribute("data-theme") === "light";
    applyTheme(isLight ? "dark" : "light");
  });
}

themeToggleBtn.addEventListener("click", function () {
  console.log("toggle clicked");
  console.log("before:", document.body.getAttribute("data-theme"));
  const isLight = document.body.getAttribute("data-theme") === "light";
  applyTheme(isLight ? "dark" : "light");
  console.log("after:", document.body.getAttribute("data-theme"));
});
