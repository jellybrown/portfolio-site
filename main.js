"use strict";

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
