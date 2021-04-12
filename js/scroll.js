"use strict";

// 스로틀: 일정시간 단위로 호출
export const throttle = (fn, wait) => {
  let time = Date.now();
  return () => {
    if (time + wait - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
};
