"use strict";

import { scenes } from "./scene.js";

// projects 탭 기능
const tabSection = document.querySelector(".article__tab");
const tabItems = document.querySelectorAll(".projects__item");
const tabNumbers = document.querySelectorAll(".tab__number");
const changeTab = (e) => {
  const number = parseInt(e.target.textContent); //클릭한 탭번호
  for (let i = 0; i < tabNumbers.length; i++) {
    tabNumbers[i].classList.remove("active");
    tabItems[i].classList.remove("active");
  }
  tabNumbers[number - 1].classList.add("active");
  tabItems[number - 1].classList.add("active");
};
tabSection.addEventListener("click", changeTab);

// menu 슬라이드 기능
// black__backgrond, 닫기 누르면 menu 들어감
const blackBg = document.querySelector(".black__backgrond");
const menuSection = document.querySelector(".menu");
const body = document.querySelector("body");
const toggleBar = document.querySelector(".toggle__bar");
blackBg.addEventListener("click", () => {
  body.classList.remove("black");
  blackBg.classList.remove("on");
  menuSection.classList.remove("on");
  toggleBar.classList.remove("close");
});
toggleBar.addEventListener("click", () => {
  if (toggleBar.classList.contains("close")) {
    body.classList.remove("black");
    blackBg.classList.remove("on");
    menuSection.classList.remove("on");
    toggleBar.classList.remove("close");
  } else {
    body.classList.add("black");
    blackBg.classList.add("on");
    menuSection.classList.add("on");
    toggleBar.classList.add("close");
  }
});

// menu 이동
const moveToSection = (e) => {
  if (e.target.parentNode.nodeName === "LI") {
    const clicked = e.target.parentNode.dataset.id;
    const willMove = scenes[clicked - 1].top;
    window.scrollTo(0, willMove);
    body.classList.remove("black");
    blackBg.classList.remove("on");
    menuSection.classList.remove("on");
    toggleBar.classList.remove("close");
  }
};

menuSection.addEventListener("click", moveToSection);
