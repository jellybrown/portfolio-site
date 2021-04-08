"use strict";

export class Scene {
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
}
