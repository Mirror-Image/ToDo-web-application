import ContentFilterComponent from "./content-filter-component.js";
import store from "./store/index.js";
import {request} from "./singletones-initialize.js";


export default class ContentListComponent extends ContentFilterComponent {
  constructor() {
    super();
    this.anchorList = document
      .querySelector('.content__main-results-list');

    this.onInitList();
  }

  onInitList() {
    console.log( 'ContentListComponent initialized' );
    this.data = request.readAllTodosRequest();
  }

  set data(value) {
    value.then(obj => {
      store.props = obj;
      this.renderList();
      this.onInitCounter(store.props);
      this.onInitButtons();
    });
  }

  renderList(anchor, value) {
    if (store.props.length === 0) {
      this.anchorList.innerHTML = `
        <ul>
          <li class="content__main-results-list-item list--clear">
            <p class="content__main-results-list-item-text content--clear">
              No todos. You are free for today!
            </p>
          </li>
        </ul>
      `;

    /* Вызываем в случаях закрытия режима редактирования без сохранинения
     изменений (возвращаем наш item к первозданному виду), а так же когда
     сохряняем изменения после редактирования элемента (рендерим итем с уже
     новым содержанием)*/
    } else if (anchor && value) {
      anchor.innerHTML = `
        <p class="content__main-results-list-item-text">${value}</p>
        <div class="content__main-results-list-item-buttons"></div>
      `;

    } else { // Если активный фильтр "Done"
      if (this.anchorList.hasAttribute('done-filter')) {
        let filteredArray = store.props.filter(item => item.completed === true);
        this.anchorList.innerHTML = `
          <ul>
            ${filteredArray.map(todoItem => `
              <li class="content__main-results-list-item" id="${todoItem._id}"
                executionStatus="${todoItem.completed}" markedDone="${todoItem.completed}">
                <p class="content__main-results-list-item-text">${todoItem.text}</p>
                <div class="content__main-results-list-item-buttons"></div>
              </li>
            `).join('')}
          </ul>
        `;
      // Если активный фильтр "In progress"
      } else if (this.anchorList.hasAttribute('in-progress-filter')) {
        let filteredArray = store.props.filter(item => item.completed === false);
        this.anchorList.innerHTML = `
          <ul>
            ${filteredArray.map(todoItem => `
              <li class="content__main-results-list-item" id="${todoItem._id}"
                executionStatus="${todoItem.completed}" markedDone="${todoItem.completed}">
                <p class="content__main-results-list-item-text">${todoItem.text}</p>
                <div class="content__main-results-list-item-buttons"></div>
              </li>
            `).join('')}
          </ul>
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
      }
    }
    console.log( 'ContentListComponent rendered' );
  }
}