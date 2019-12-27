import ContentFormComponent from "./content-form-component.js";

export default class ContentCounterComponent extends ContentFormComponent{
  constructor() {
    super();
    this.counterAnchor = document
      .querySelector('.content__main-header-statistics');
  }

  onInitCounter(value) {
    console.log('ContentCounterComponent initialized');
    let all = this.counterAll(value);
    let done = this.counterDone(value);
    let inProgress = this.counterInProgress(value);
    this.renderCounter(all, done, inProgress);
  }

  counterAll(value) {
    return value.length;
  }

  counterDone(value) {
    let counter = 0;

    for (let item of value) {
      if (item.completed) {
        counter += 1;
      }
    }
    return counter;
  }

  counterInProgress(value) {
    let counter = 0;

    for (let item of value) {
      if (!item.completed) {
        counter += 1;
      }
    }
    return counter;
  }

  renderCounter(all, done, inProgress) {
    this.counterAnchor.innerHTML = `
      <p id="counter-all">All:<span>${all}</span></p>
      <p id="counter-done">Done:<span>${done}</span></p>
      <p id="counter-in-progress">In progress:<span>${inProgress}</span></p>
    `;

    console.log('ContentCounterComponent rendered');
  }
}