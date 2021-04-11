"use strict";

export class Scene {
  obj = {};
  currentRatio = 0;
  constructor(top, height) {
    this._top = top;
    this._height = height;
  }
  get top() {
    return this._top;
  }
  set top(value) {
    if (value < 0) throw new Error("top 값이 0보다 작습니다.");
    this._top = value;
  }
  get height() {
    return this._height;
  }
  set height(value) {
    if (value < 0) throw new Error("height 값이 0보다 작습니다.");
    this._height = value;
  }
  addObj(saveName, selectorName) {
    if (this.obj[saveName]) throw new Error("이미 생성하려는 값이 있습니다.");
    this.obj[saveName] = document.querySelector(selectorName);
  }
  addManyObj(saveName, selectorName) {
    if (this.obj[saveName]) throw new Error("이미 생성하려는 값이 있습니다.");
    this.obj[saveName] = document.querySelectorAll(selectorName);
  }
  setRatio(ratio) {
    if (ratio > 1) this.currentRatio = 1;
    if (ratio < 0) this.currentRatio = 0;
    if (ratio > 0 && ratio < 1) this.currentRatio = ratio;
  }
}
