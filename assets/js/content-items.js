import {request} from "./network.js";
import store from "./store/index.js";
import ContentComponent from "./content.js";

 export default class ContentItemsComponent extends ContentComponent {
  constructor() {
    super();
    this.anchor = document.querySelector('.content__main-results-list');
    // console.log( this.anchor );

    this.form = document.getElementById('add-item-input');
    const submit = document.getElementById('add-item-button');

    submit.addEventListener('click', this.addItem.bind(this));
    this.form.addEventListener('keydown', this.addItem.bind(this));
  }


  onInit() {
    console.log( 'ContentItemsComponent initialized' );
    this.data = request.readTodosRequest();
  }

   addItem(event) {
     if (event.key === 'Enter' || event.type === 'click') {
       event.preventDefault();
       let value = this.form.value.trim();
       let date = Date.now();
       if (value.length >= 5) {
         store.dispatch('addItem', {
           text: value,
           createDate: date,
           completed: false
         });
         this.form.focus();
         this.form.value = '';
         request.createItem(value, date, false);
       } else {
         // TODO: rework it!
         alert('5 characters minimum');
         this.form.focus();
       }
     }
   };

  set data(value) {
    value.then(obj => {
      store.props = obj;
      console.log( store.props );
      this.render(store.props);
    });

  }

  render(value) {
    console.log( 'ContentItemsComponent rendered' );
    if (value.length === 0) {
      this.anchor.innerHTML = `
        <li class="content__main-results-list-item">
          <p class="content__main-results-list-item-text content--clear">No todos</p>
        </li>
      `;
    }

    let listItems = `
      <ul>
        ${
          value.map(todoItem => `
            <li class="content__main-results-list-item" id="${todoItem._id}" executionStatus="${todoItem.completed}">
              <p class="content__main-results-list-item-text">${todoItem.text}</p>
              <div class="content__main-results-list-item-buttons">
                <a class="content__main-results-list-item-buttons-done done-button"></a>
                <a class="content__main-results-list-item-buttons-delete delete-button"></a>
                <a class="content__main-results-list-item-buttons-edit edit-button"></a>
              </div>
            </li>
          `).join('')
        }
      </ul>
    `;
    this.anchor.innerHTML = `${listItems}`;
    this.setupListeners();
  }

  setupListeners() {
    this.anchor.querySelectorAll('.delete-button').forEach((button, id) =>
      button.addEventListener('click', () => {
          store.dispatch('removeItem', {id});
          console.log( button.parentElement.parentElement.id );
          request.deleteItem(button.parentElement.parentElement.id);
      })
    )
  }
}

