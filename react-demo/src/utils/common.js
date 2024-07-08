import { useEffect, useRef, useState } from 'react';

function rafThrottle(fn) {
  let lock = false;
  return function (_this, ...args) {
    if (lock) return;
    lock = true;
    window.requestAnimationFrame(() => {
      fn.apply(_this, args);
      lock = false;
    });
  };
}

function debounce(fn, delay = 300) {
  let timer = null;
  return function (_this, ...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, delay);
  };
}

// 节流
function throttle(fn, delay){
  let timer = null;
  return function() {
    let context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      fn.apply(context, arguments);
    }, delay);
  }
}
 
function useNextTick() {
  const callbacks = useRef([]);
 
  useEffect(() => {
    callbacks.current = callbacks.current.filter(cb => cb);
  });
 
  const flushCallbacks = () => {
    const copies = callbacks.current.slice();
    callbacks.current = [];
    copies.forEach(cb => cb());
  };
 
  return nextTick;
}
 

export { rafThrottle, debounce, throttle };