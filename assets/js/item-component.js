import store from "./store/index.js";
import {request} from "./network.js";
import ButtonsComponent from "./buttons-component.js";

export default class ItemComponent extends ButtonsComponent {
  constructor() {
    super();

    this.itemAnchor = document
      .querySelector('.content__main-results-list');


  }

  onInitItem(item, value) {
    console.log( 'ItemComponent initialized' );
    this.render(item, value);
    this.setupListeners(item);
  }

  /*
    TODO: найти причину и исправить ошибку
    (описание): после срабатывания 3го раза продряд условия if, консоль выдает
    ошибку, окно редактора не открывается, если завершать редктирование (менять
    значение элемента), то ошибка не всплывает.
  */
  // Подставляет в элемент списка форму для редактирования
  onReadyToEditItem(item, value) {
    const list = document.querySelector('.content__main-results-list');
    let editingItem = list.getElementsByClassName('edit-list-form');
    console.log( editingItem );

    /*
      Условие If срабатывает тогда, когда у нас уже один элемент открыт в режиме
      редактирования но мы хотим незавершая его переключиться на редактирование
      другого элемента
    */
    if (editingItem.length) {
      let anchor = editingItem[0].parentElement;
      let value = editingItem[0].firstElementChild.getAttribute('value');
      // console.log( anchor );
      // console.log( value );
      this.renderList(value, anchor);
      this.renderButtons(anchor);
      this.render(anchor.lastElementChild);

    } else  {
      this.onInitItem(item, value);
      console.log( item, value );
    }
  }

  async applyEditingItem(event) {
    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();

      let item = document.querySelector('#edit-item-input');
      let value = item.value.trim();
      let anchor = item.parentElement.parentElement;
      let id = item.parentElement.parentElement.id;

      if (value.length >= 5) {

        this.value = '';
        await request.updateItemRequest(id, false, value);

        this.renderList(value, anchor);
        this.onInitButtons();

        request.readSingleTodoRequest(id).then(obj => {
          store.dispatch('addItem', {
            createDate: obj.createDate,
            completed: obj.completed,
            completedAt: obj.completedAt,
            id: obj._id,
            text: obj.text,
            creator: obj.creator,
          });
        });
      } else {
        // TODO: rework it!
        alert('5 characters minimum');
        this.form.focus();
      }
    }
  };

  render(item, value) {
    console.log( value, item );
    if (item && value) {
      console.log( value, item.parentElement );
      item.parentElement.innerHTML = `
        <form class="content__main-header-form-block edit-list-form">
          <input id="edit-item-input" class="content__main-header-form-block-input" 
            type="text" placeholder="Type your note" value="${value}">
          <a id="edit-item-button" 
            class="content__main-header-form-block-button">Add</a>
        </form>
      `;
      console.log( 'ItemComponent rendered' );
    }
  }

  setupListeners(value) {
    if (value) {
      const form = this.itemAnchor.querySelector('.content__main-header-form-block');
      const editButton = document.getElementById('edit-item-button');

      form.addEventListener('keydown', this.applyEditingItem.bind(this));
      editButton.addEventListener('click', this.applyEditingItem.bind(this));
    }

    // Добавляем событие на кнопку списка, которое открывает редактор элемента
    // (кнопка доступна только на мобильных устройствах)
    this.itemAnchor.querySelectorAll('.edit-button')
      .forEach((listItem, id) => {
        let itemText = listItem.parentElement.previousElementSibling.innerText;
        let editedItem = listItem.parentElement;

        listItem.addEventListener('click', () => {
          store.dispatch('editItem', {id});
          this.onReadyToEditItem(editedItem, itemText);
        })
      });

    // Добавляем событие на элемент списка, которое открывает редактор элемента
    this.itemAnchor.querySelectorAll('.content__main-results-list-item-text')
      .forEach((listItem, id) => {
        let itemText = listItem.innerText;

        listItem.addEventListener('click', () => {
          store.dispatch('editItem', {id});
          this.onReadyToEditItem(listItem, itemText);
        })
      });
  }
}