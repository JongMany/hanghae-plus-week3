import { 발행기관 } from "./pubsub";

export class Store {
  #state;
  #mutations;
  #actions;
  state = {};

  constructor({ state, mutations, actions }) {
    // this.#state = state;
    this.#state = 발행기관(state);
    this.#mutations = mutations;
    this.#actions = actions;

    // 내부 값을 복사 (캡슐화를 위함)
    Object.keys(state).forEach((key) => {
      Object.defineProperty(this.state, key, { get: () => this.#state[key] });
    });
  }

  commit(action, payload) {
    // console.log(this.#mutations);
    this.#mutations[action](this.#state, payload);
    // Object.keys(this.state).forEach((key) => {
    //   this.#state[key];
    // });
  }
}
