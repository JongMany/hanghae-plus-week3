const publisher = {
  state: null,
  subscribers: new Map(),
  alert(prop) {
    console.log("subscriber", this.subscribers);
    this.subscribers[prop]?.forEach((fn) => {
      fn();
    });
  },
};

let currentCallback = null;
export const 구독 = (fn) => {
  currentCallback = fn;
  fn();
};

export const 발행기관 = (initState) => {
  publisher.subscribers = Object.keys(initState).reduce((map, key) => {
    map[key] = new Set();
    return map;
  }, {});

  publisher.state = new Proxy(initState, {
    get: (obj, prop) => {
      if (currentCallback) {
        publisher.subscribers[prop].add(currentCallback);
      }

      return obj[prop];
    },
    set: (obj, prop, value) => {
      if (obj[prop] === value) return true;
      if (JSON.stringify(obj[prop]) === JSON.stringify(value)) return true;
      console.log(obj, prop, value);
      obj[prop] = value;
      publisher.alert(prop);
      return true;
    },
  });
  currentCallback = null;
  return publisher.state;
};
