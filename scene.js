"use strict";

class Scene {
  constructor(top, height) {
    this.top = top;
    this.height = height;
  }
  //   get top() {
  //     return this._top;
  //   }
  //   set top(value) {
  //     this._top = value;
  //   }
  //   get height() {
  //     return this._height;
  //   }
  //   set height(value) {
  //     this._height = value;
  //   }
}
const sections = document.querySelectorAll("section");

export const profile = new Scene(
  sections[0].offsetTop,
  sections[0].offsetHeight
);
export const history = new Scene(
  sections[1].offsetTop,
  sections[1].offsetHeight
);
export const skills = new Scene(
  sections[2].offsetTop,
  sections[2].offsetHeight
);
export const projects = new Scene(
  sections[3].offsetTop,
  sections[3].offsetHeight
);
export const goal = new Scene(sections[4].offsetTop, sections[4].offsetHeight);
export const values = new Scene(
  sections[5].offsetTop,
  sections[5].offsetHeight
);

export const scenes = [profile, history, skills, projects, goal, values];

//

// window.addEventListener("scroll", () => {
//   console.log("history", history.top);
//   console.log("WINDOW", window.pageYOffset);
// });
