import store from "./store/index.js";

export default class Component {
  constructor(store, anchor) {
    this.anchor = anchor;
    //
    this.render = this.render.bind(this);
    console.log( store );
    store.events.subscribe('change', this.render);
    //
  }

  clearDOM(anchor) {
    //
    store.events.unsubscribe('change', this.render);
    //
    anchor.innerHTML = ''; // очищаем
  }
}