import Observer from "./observer.js";

export default class Store {
  constructor(reducers) {
    // reducers это мапа где ключами выступает название action или его тип, значением - функция редактирования
    this.reducers = reducers;
    this.state = {
      todo: [],
      userData: {}
    };
    // на свойство events подписываются все наши компоненты
    this.events = new Observer();
  }

  dispatch(actionType, payload) { // обновляет state со старого на новый используя какой-то из reducer'ов
    if (this.reducers[actionType]) {
      console.log( this.reducers );
      this.state = this.reducers[actionType](payload, this.state); // в reducer передает payload и старый state и обновим state
      console.log( this.state );
      this.events.next('change', this.state);
    }
  }
}