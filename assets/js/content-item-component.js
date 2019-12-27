import ContentButtonsComponent from "./content-buttons-component.js";
import store from "./store/index.js";
import {request} from "./singletones-initialize.js";

export default class ContentItemComponent extends ContentButtonsComponent {
  constructor() {
    super();
    this.itemAnchor = document
      .querySelector('.content__main-results-list');
  }

  onInitItem(item, value) {
    console.log( 'ContentItemComponent initialized' );
    this.render(item, value);
    this.setupListeners(item);
  }

  // Хранима состояние последнего элемента на которм был вызван редактор (Якорь)
  set editingItem(value) {
    return this._editingItem = value;
  }

  get editingItem() {
    return this._editingItem;
  }

  // Хранима состояние последнего элемента на которм был вызван редактор (Значение)
  set value(value) {
    return this._value = value;
  }

  get value() {
    return this._value;
  }

  // Подставляет в элемент списка форму для редактирования
  onReadyToEditItem(item, value) {
    /*
      Условие If срабатывает тогда, когда у нас уже один элемент открыт в режиме
      редактирования но мы хотим незавершая первого, переключиться на редактирование
      другого элемента (например, когда случайно вызвали редактор не того элемента)
    */
    if (this.editingItem) {
      console.log(  this.editingItem );

      this.renderList(this.editingItem, this.value);
      this.renderButtons( this.editingItem);

      this.onInitItem(item, value);
      // Сохраняем состояние последующих вызовов
      this.editingItem = item;
      this.value = value;

    } else {
      this.onInitItem(item, value);

      // Сохраняем состояние первого вызова!
      this.editingItem = item;
      this.value = value;
    }
  }

  applyEditingItem(event) {
    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();

      let input = document.querySelector('#edit-item-input');
      let inputValue = input.value.trim();

      // let anchor = this._editingItem;
      let anchor = this.editingItem;
      // let id = this._editingItem.id;
      let id = this.editingItem.id;

      if (inputValue.length >= 5) {

        /*
          Обнуляем состояние предыдущего элемента который был открыт в режиме
          редактирования
        */
        this.editingItem = 0;
        this.value = '';
        request.updateItemRequest(id, false, inputValue);

        this.renderList(anchor, inputValue);
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
        // TODO: rework it! Make PopUp!
        alert('5 characters minimum');
        this.form.focus();
      }
    }
  };

  render(item, value) {
    if (item && value) {
      item.innerHTML = `
        <form class="content__main-header-form-block editor-list-form">
          <input id="edit-item-input" class="content__main-header-form-block-input" 
            type="text" placeholder="Type your note" value="${value}">
          <a id="edit-item-button" 
            class="content__main-header-form-block-button">Edit</a>
        </form>
      `;
      console.log('ContentItemComponent rendered');
    }
  }

  setupListeners(value) {
    if (value) {
      const form = this.itemAnchor
        .querySelector('.content__main-header-form-block');
      const editButton = document.getElementById('edit-item-button');

      form.addEventListener('keydown', this.applyEditingItem.bind(this));
      editButton.addEventListener('click', this.applyEditingItem.bind(this));
    }

    /*
      Добавляем событие на кнопку списка, которое открывает редактор элемента
      (кнопка доступна только на мобильных устройствах)
      (делегирование)
    */
    document.querySelector('.content__main-results-list')
      .addEventListener('click', (event) => {
        let target = event.target;

        if (target.className ===
          'content__main-results-list-item-buttons-edit edit-button') {
          let itemText = target.parentElement.previousElementSibling.innerText;
          let editedItem = target.parentElement.parentElement;
          let id = target.parentElement.parentElement.id;
          console.log( editedItem );

          store.dispatch('editItem', {id});
          this.onReadyToEditItem(editedItem, itemText);

          // установка курсора в конец строки редактора
          let editItemInput = editedItem.querySelector('#edit-item-input');
          editItemInput.focus();
          editItemInput.setSelectionRange(editItemInput.value.length,
            editItemInput.value.length);
        }
      });

    /*
      Добавляем событие на элемент списка, которое открывает редактор элемента
      (делегирование)
    */
    document.querySelector('.content__main-results-list')
      .addEventListener('click', (event) => {
        let target = event.target;

        if (target.className === 'content__main-results-list-item-text') {
          let itemText = target.parentElement.innerText;
          let editedItem = target.parentElement;
          let id = target.parentElement.id;

          store.dispatch('editItem', {id});
          this.onReadyToEditItem(editedItem, itemText);

          // установка курсора в конец строки редактора
          let editItemInput = editedItem.querySelector('#edit-item-input');
          editItemInput.focus();
          editItemInput.setSelectionRange(editItemInput.value.trim().length,
            editItemInput.value.trim().length);
        }
      });
  }
}