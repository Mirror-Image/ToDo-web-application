export default class FilterComponent {
  constructor(anchor) {
    if (FilterComponent.instance) {
      return FilterComponent.instance
    }
    FilterComponent.instance = this;

    this.anchor = anchor;
  }

  onInitFilter() {
    console.log('CounterComponent initialized');


    this.setupListenersFilter();
  }

  doneFilter(value) {
    console.log( value );
    let result = [];
    for (let item of value) {
      if (item.completed) {
        result.push(item);
      }
    }
    return result;
  }

  inProgressFilter(value) {
    console.log( value );
    let result = [];
    for (let item of value) {
      if (!item.completed) {
        result.push(item);
      }
    }
    return result;
  }

  AllFilter(value) {
    return value;
  }

  renderFilter(value) {

    console.log('CounterComponent rendered');
  }

  setupListenersFilter() {

  }
}