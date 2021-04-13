# 포트폴리오 사이트

<br>

## ❗️ 프로젝트 소개

<br>

- 저만의 포트폴리오 사이트가 필요하다고 생각되어 만들게 되었습니다.

<br>

---

<br>

## ❗️ 프로젝트 기간

<br>

- 2020.04.01 ~ 04.13

<br>

## ❗️ 사용된 기술

<br>

- html, css
- javascript

<br>

---

<br>

## ❗️ 프로젝트 구현

<br>

### 1. 시멘틱태그를 이용한 마크업

- section과 article 태그를 적절히 섞어 div의 남발을 최대한 줄이기 위해 노력했습니다.

```html
<!-- 프로젝트 영역 -->
<section class="projects white">
  <div class="content__container">
    <h1>프로젝트</h1>
    <div class="article__tab">
      <span class="tab__number active">1</span>
      <span class="tab__number">2</span>
      <span class="tab__number">3</span>
      <span class="tab__number">4</span>
      <span class="tab__number">5</span>
    </div>
    <div class="projects__container">
      <article class="projects__item active">
        <div class="article__header">
          <h2>Purples</h2>
          .... ...
        </div>
      </article>
    </div>
  </div>
</section>
```

<br>

### 2. 탭, 메뉴 슬라이드 구현

- css와 javascript를 이용하여 탭 기능과 메뉴의 슬라이드를 구현했습니다.

```js
// projects 탭 기능: 클릭한 번호를 가져와서 배열로 저장한 탭에 active 클래스를 추가

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
```

```js
// menu 이동: 저장되었던 영역의 top값으로 이동

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
menuSection.addEventListener("click", moveToSection);
```

<br>

### 3. 스크롤, 인터렉티브 효과

- 각 영역의 위치(top)와 높이(height)를 저장해서 스크롤과 인터렉티브 효과에 이용했습니다.

```js
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
resetSection();
// 디바이스별로 높이가 다르기 때문에 reset이 될 때마다 호출
window.addEventListener("resize", resetSection);
```

<br>

- 저장된 값들을 이용하여 인터렉티브한 효과를 주었습니다.

```js
let scrollRatio = getScrollRatio(currentScene);

// 씬별로 인터렉티브 효과
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
```

<br>

### 4. 스로틀 적용

- 스로틀을 이용하여 스크롤 이벤트를 일정시간 단위로 호출되도록 했습니다.

```js
window.addEventListener("scroll", throttle(checkScene, 100));
```

<br>

### 5. 모바일을 신경쓴 반응형 사이트

- 모바일도 신경써서 작업했습니다.

<br>

<img src="/pp-site-figma.png" width="500">

<br>

---

## ❗️ 링크

<br>

<a href="https://jellybrown.github.io/portfolio-site/" target="_blank">구경하러가기</a>

<br>

---

<br>

## ❗️ 프로젝트 결과화면

<br>

<img src="https://github.com/jellybrown/portfolio-site/blob/master/port.gif" width="700">

<br>

---

<br>

## ❗️ 만들면서 힘들었던 점

<br>

### 스크롤 구현

사실 스크롤 %에 따라 opacity를 조절하여 부드럽게 변경하고 싶었는데, <br>
구현은 성공했지만 영역을 빠르게 지나치면 이벤트가 부자연스러운 것을 발견했습니다.<br>
지금으로서는 빠른 시일내에 완성이 목적이였기 때문에 애니메이션처럼 보이는 효과로 변경했습니다.<br>
이 부분은 스크롤 이벤트 구현에 대해 더 공부해야 할 것 같습니다.
