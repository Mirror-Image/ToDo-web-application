import store from "./store/index.js";

export default class Component {
  constructor(store, anchor) {
    this.anchor = anchor;
    //
    this.render = this.render.bind(this);
    store.events.subscribe('change', this.render);
    //
  }

  clearDOM(anchor, app) {
    //
    this.anchor.innerHTML = ''; // очищаем
    store.events.unsubscribe('change', this.render);
    //
    console.log( 'DOM clear' );
    // console.log( this.anchor );
    document.getElementById('app').innerHTML = ''; // очищаем
  }
}