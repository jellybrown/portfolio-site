"use strict";

import { Scene } from "./scene.js";
import { throttle } from "./scroll.js";

// projects 탭 기능
const tabSection = document.querySelector(".article__tab");
const tabItems = document.querySelectorAll(".projects__item");
const tabNumbers = document.querySelectorAll(".tab__number");
const changeTab = (e) => {
  if (e.target.nodeName === "SPAN") {
    const number = parseInt(e.target.textContent); //클릭한 탭번호
    for (let i = 0; i < tabNumbers.length; i++) {
      tabNumbers[i].classList.remove("active");
      tabItems[i].classList.remove("active");
    }
    tabNumbers[number - 1].classList.add("active");
    tabItems[number - 1].classList.add("active");
  }
};
tabSection.addEventListener("click", changeTab);

// menu 나타나는 슬라이드 기능
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

// 영역별 높이 설정,
// 디바이스 별로 높이 다르기 때문에 reset 필요
let sections;
let profile;
let history;
let skills;
let projects;
let goal;
let values;
let scenes;
let currentScene;

const resetSection = () => {
  window.scrollTo(0, 0);
  sections = document.querySelectorAll("section");

  profile = new Scene(sections[0].offsetTop, sections[0].offsetHeight);
  history = new Scene(sections[1].offsetTop, sections[1].offsetHeight);
  skills = new Scene(sections[2].offsetTop, sections[2].offsetHeight);
  projects = new Scene(sections[3].offsetTop, sections[3].offsetHeight);
  goal = new Scene(sections[4].offsetTop, sections[4].offsetHeight);
  values = new Scene(sections[5].offsetTop, sections[5].offsetHeight);

  scenes = [profile, history, skills, projects, goal, values];
  // 섹션별로 인터렉티브 요소들 관리
  profile.addObj("h1", ".profile h1");
  profile.addObj("p", ".profile p");
  history.addManyObj("cards", ".history .card");
  skills.addManyObj("cards", ".skills .card");
  goal.addManyObj("cards", ".goal .card");
};

// menu 이동
const moveToSection = (e) => {
  if (e.target.parentNode.nodeName === "LI") {
    currentScene = parseInt(e.target.parentNode.dataset.id); // 이동시 currentScene 업데이트
    console.log(typeof currentScene);
    const willMove = scenes[currentScene - 1].top;
    window.scrollTo(0, willMove);
    body.classList.remove("black");
    blackBg.classList.remove("on");
    menuSection.classList.remove("on");
    toggleBar.classList.remove("close");
  }
};

resetSection();
window.addEventListener("resize", resetSection);
menuSection.addEventListener("click", moveToSection);

// 현재 스크롤 영역별로 스크롤 이벤트 실행되게 만들기
// 디바이스별로 생각해야함
// 아마도 %구해서 해야할듯

const checkScene = () => {
  let yOffset = window.pageYOffset;

  if (yOffset > profile.top && history.top > yOffset) currentScene = 1;
  if (yOffset > history.top && skills.top > yOffset) currentScene = 2;
  if (yOffset > skills.top && projects.top > yOffset) currentScene = 3;
  if (yOffset > projects.top && goal.top > yOffset) currentScene = 4;
  if (yOffset > goal.top && values.top > yOffset) currentScene = 5;
  if (yOffset > values.top) currentScene = 6;
  console.log(currentScene);

  // 씬별로 인터렉티브 효과
  // scene 1: 색상 변경
  // scene 2,3,5: 카드 올라오기
  // scene 6: 투명도만 진해지기
  switch (currentScene) {
    case 1:
      if (yOffset > scenes[0].height * 0.4) {
        sections[0].style.transition = "3s";

        sections[0].style.backgroundColor = "#fbfbfb";
        profile.obj["h1"].style.color = "#fbfbfb";
        profile.obj["p"].style.color = "#fbfbfb";
      } else {
        sections[0].style.transition = "1.5s";
        sections[0].style.backgroundColor = "#353535";
        profile.obj["p"].style.color = "#9d9d9d";
      }

      if (yOffset > scenes[0].height * 0.6) {
        history.obj["cards"].forEach((card) => {
          card.style.opacity = 1;
          card.style.transform = "translateY(0)";
        });
      }
      break;
    case 2:
      if (yOffset >= scenes[1].top) {
        history.obj["cards"].forEach((card) => {
          card.style.opacity = 1;
          card.style.transform = "translateY(0)";
        });
      }
      if (yOffset > scenes[2].height * 0.8) {
        skills.obj["cards"].forEach((card) => {
          card.style.opacity = 1;
          card.style.transform = "translateY(0)";
        });
      }
      break;
    case 3:
      if (yOffset >= scenes[2].top) {
        skills.obj["cards"].forEach((card) => {
          card.style.opacity = 1;
          card.style.transform = "translateY(0)";
        });
      }
    case 4:
      if (yOffset > scenes[4].height * 0.5) {
        goal.obj["cards"].forEach((card) => {
          card.style.opacity = 1;
          card.style.transform = "translateY(0)";
        });
      }
    default:
      break;
  }
};
window.addEventListener("scroll", throttle(checkScene, 500));
