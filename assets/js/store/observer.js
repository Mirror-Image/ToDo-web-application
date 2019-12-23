export default class Observer {
  constructor() {
    // храним объект с массивами
    this.subscribers = {}; // может  реагировать на различные ивенты
    // ключем выступает название ивента, значением - массив подписчиков на конкретный ивент
  }

  subscribe(event, callback) {
    console.log( this.subscribers );
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback); // под каждым различным ивентом хранится массив подписок
  }

  unsubscribe(event, callback) {
    if (this.subscribers[event]) {
      this.subscribers[event] = this.subscribers[event]
        .filter(cb => cb !== callback);
    }
  }

  next(event, payload) { // передаем название ивента и payload (полезная нагрузка)
    if (!this.subscribers[event]) {
      console.warn( 'Event not supported', event );
      return;
    }
    this.subscribers[event].forEach(cb => cb(payload));
  }
}