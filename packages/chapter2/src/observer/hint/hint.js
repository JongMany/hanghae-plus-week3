let currentCallback = null;
const fn = (callback) => {
  currentCallback = callback;
  callback();
};

let a = 10;
const state = {};

Object.defineProperty(state, "a", {
  get() {
    console.log(currentCallback);
    return a;
  },
});
const fn1 = () => console.log(`state.a = ${state.a}`);
fn(fn1);

a = 20;

fn(fn1);
