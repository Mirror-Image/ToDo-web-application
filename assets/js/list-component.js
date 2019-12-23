import store from "./store/index.js";
import FormComponent from "./form-component.js";
import {request, counter} from "./singletones-initialize.js";

export default class ListComponent extends FormComponent {
  constructor() {
    super();
    this.anchorList = document
      .querySelector('.content__main-results-list');

    this.onInitList();
  }

  onInitList() {
    console.log( 'ListComponent initialized' );
    this.data = request.readAllTodosRequest();
  }

  set data(value) {
    value.then(obj => {
      store.props = obj;
      this.renderList();
      counter.onInitCounter(store.props);
      this.onInitButtons();
    });
  }

  renderList(anchor, value) {
    if (store.props.length === 0) {
      this.anchorList.innerHTML = `
        <ul>
          <li class="content__main-results-list-item list--clear">
          <p class="content__main-results-list-item-text content--clear">
          No todos. You are free for today!</p>
          </li>
        </ul>
      `;
    } else if (anchor && value) {
      anchor.innerHTML = `
        <p class="content__main-results-list-item-text">${value}</p>
        <div class="content__main-results-list-item-buttons"></div>
      `;
    } else {
      this.anchorList.innerHTML = `
      <ul>
        ${store.props.map(todoItem => `
          <li class="content__main-results-list-item" id="${todoItem._id}" 
            executionStatus="${todoItem.completed}" markedDone="${todoItem.completed}">
            <p class="content__main-results-list-item-text">${todoItem.text}</p>
            <div class="content__main-results-list-item-buttons"></div>
          </li>
        `).join('')}
      </ul>
    `;
      this.render();
    }
    console.log( 'ListComponent rendered' );
  }
}