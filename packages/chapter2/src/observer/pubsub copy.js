// postal = require('postal');
// let state;
const subscribes = [];

export const 구독 = (fn) => {
  // Object.defineProperty()
  // currentCallback = fn;
  subscribes.push(fn);
  fn();
};

export const 발행기관 = (initState) => {
  // state = obj;
  const state = new Proxy(initState, {
    get: (obj, prop) => {
      return obj[prop];
    },
    set: (obj, prop, value) => {
      // subscribes.forEach((fn) => {
      //   console.log(obj);
      // });
      // console.log(obj, prop, value);
      subscribes.forEach((fn) => {
        console.log(fn());
      });

      return Reflect.set(obj, prop, value);
      // Object.defineProperty(obj, prop, {
      //   value,
      // });
    },
  });
  return state;
};
