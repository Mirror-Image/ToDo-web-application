import ContentListComponent from "./content-list-component.js";
import store from "./store/index.js";
import {request} from "./singletones-initialize.js";

export default class ContentButtonsComponent extends ContentListComponent{
  constructor() {
    super();
    this.itemsArray = document
      .getElementsByClassName('content__main-results-list-item-buttons');
  }

  onInitButtons() {
    console.log('ContentButtonsComponent initialized');
    this.renderButtons();
    this.setupListenersButtons(this.anchor);
    this.onInitItem();
  }

  markedDone(id) {
    document.getElementById(`${id}`).style.backgroundColor = '#57c532';
    request.markDoneItemRequest(id, true).then( () => {
      request.readSingleTodoRequest(id).then(obj => {
        store.dispatch('addItem', {
          createDate: obj.createDate,
          completed: obj.completed,
          completedAt: obj.completedAt,
          _id: obj._id,
          text: obj.text,
          creator: obj.creator,
        });

        this.onInitList();
      });
    });
  }

  renderButtons(value) {
    // вызывается когда нужно отрисовать кнопки только для одиного конкретного элемента
    if (value) {
      value.lastElementChild.innerHTML = `
        <a class="content__main-results-list-item-buttons-done done-button"></a>
        <a class="content__main-results-list-item-buttons-delete delete-button"></a>
        <a class="content__main-results-list-item-buttons-edit edit-button"></a>
      `;
      this.setupListenersButtons(value);

    } else {
      Array.prototype.forEach.call(this.itemsArray, item => item.innerHTML = `
        <a class="content__main-results-list-item-buttons-done done-button"></a>
        <a class="content__main-results-list-item-buttons-delete delete-button"></a>
        <a class="content__main-results-list-item-buttons-edit edit-button"></a>
      `);
    }
    console.log( 'ContentButtonsComponent rendered' );
  }

  setupListenersButtons(value) {
    value.querySelectorAll('.delete-button')
      .forEach((button, id) => {
        let idNumber = button.parentElement.parentElement.id;
        button.addEventListener('click', async () => {
          store.dispatch('removeItem', {id});
          request.deleteItemRequest(idNumber)
            .then(response => response)
            .catch(err => console.log(err))
            .finally(() => {
              this.onInitList();
            });
        })
      });

    value.querySelectorAll('.done-button')
      .forEach((button, id) => {
        let idNumber = button.parentElement.parentElement.id;
        button.addEventListener('click', async () => {
          store.dispatch('editItem', {id});
          this.markedDone(idNumber);
        })
      });
  }
}