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
  profile.addObj("section", ".profile");
  history.addManyObj("cards", ".history .card");
  skills.addManyObj("cards", ".skills .card");
  goal.addManyObj("cards", ".goal .card");
  values.addManyObj("values", ".values__item");
};

// menu 이동
const moveToSection = (e) => {
  if (e.target.parentNode.nodeName === "LI") {
    currentScene = parseInt(e.target.parentNode.dataset.id); // 이동시 currentScene 업데이트

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

// 씬이 바뀔때마다 스크롤 비율(ratio)이 바뀐다. (ratio: 0~1사이의 값)
const getScrollRatio = (sceneNumber) => {
  let gap = window.pageYOffset - scenes[sceneNumber - 1].top;
  let ratio = gap / scenes[sceneNumber - 1].height;

  return ratio;
};

const checkScene = () => {
  let yOffset = window.pageYOffset;

  if (yOffset > profile.top && history.top > yOffset) currentScene = 1;
  if (yOffset > history.top && skills.top > yOffset) currentScene = 2;
  if (yOffset > skills.top && projects.top > yOffset) currentScene = 3;
  if (yOffset > projects.top && goal.top > yOffset) currentScene = 4;
  if (yOffset > goal.top && values.top > yOffset) currentScene = 5;
  if (yOffset > values.top) currentScene = 6;

  let scrollRatio = getScrollRatio(currentScene);
  scenes[currentScene - 1].setRatio(scrollRatio); // 씬별로 마지막 스크롤 위치 저장

  // 씬별로 인터렉티브 효과
  // scene 1: 글자 투명도 변경
  // scene 2,3,5: 카드 올라오기
  // scene 6: 투명도만 진해지기
  switch (currentScene) {
    case 1: // profile
      if (scrollRatio > 0.2) {
        profile.obj["h1"].style.opacity = 1;
        profile.obj["p"].style.opacity = 1;
        profile.obj["h1"].style.transition = "1s";
        profile.obj["p"].style.transition = "1s";
      }
      if (scrollRatio > 0.6) {
        history.obj["cards"].forEach((card) => {
          card.style.opacity = 1;
          card.style.transform = "translateY(0)";
        });
      }
      break;
    case 2: // history
      if (scrollRatio > 0.1) {
        history.obj["cards"].forEach((card) => {
          card.style.opacity = 1;
          card.style.transform = "translateY(0)";
        });
      }
      if (scrollRatio > 0.5) {
        skills.obj["cards"].forEach((card) => {
          card.style.opacity = 1;
          card.style.transform = "translateY(0)";
        });
      }
      break;
    case 3: // skills
      if (scrollRatio > 0.2) {
        skills.obj["cards"].forEach((card) => {
          card.style.opacity = 1;
          card.style.transform = "translateY(0)";
        });
      }
      break;
    case 4: // projects
      if (scrollRatio > 0.5) {
        goal.obj["cards"].forEach((card) => {
          card.style.opacity = 1;
          card.style.transform = "translateY(0)";
        });
      }
      break;
    case 5: // goal
      if (scrollRatio > 0.1) {
        goal.obj["cards"].forEach((card) => {
          card.style.opacity = 1;
          card.style.transform = "translateY(0)";
        });
      }
      if (scrollRatio > 0.6) {
        let delay = 1;
        values.obj["values"].forEach((value) => {
          value.style.opacity = 1;
          value.style.transition = "1s";
          value.style.transitionDelay = `${delay++}s`;
        });
      }

      break;
    case 6: // values
      if (scrollRatio > 0.1) {
        let delay = 1;
        values.obj["values"].forEach((value) => {
          value.style.opacity = 1;
          value.style.transition = "1s";
          value.style.transitionDelay = `${delay++}s`;
        });
      }
    default:
      break;
  }
};
window.addEventListener("scroll", throttle(checkScene, 100));
//window.addEventListener("scroll", checkScene);
