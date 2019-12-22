import {request} from "./network.js";
import store from "./store/index.js";
import ContentComponent from "./content.js";

export default class FormComponent extends ContentComponent {
  constructor() {
    super();
    this.anchorForm = document
      .querySelector('.content__main-header-form');

    this.onInitForm();
  }

  onInitForm() {
    console.log( 'FormComponent initialized' );
    this.renderForm();
    this.form = document.getElementById('add-item-input');
    this.submitButton = document.getElementById('add-item-button');
    this.setupListenersForm();
  }

  renderForm() {
    this.anchorForm.innerHTML = `
      <form class="content__main-header-form-block">
        <input id="add-item-input" class="content__main-header-form-block-input" 
          type="text" placeholder="Type your note">
        <a id="add-item-button" 
          class="content__main-header-form-block-button">Add</a>
      </form>
    `;
    console.log( 'FormComponent rendered' );
  }

  async addItemComponent(event) {
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
        await request.createItem(value, date, false);
        this.onInitList();

      } else {
        // TODO: rework it!
        alert('5 characters minimum');
        this.form.focus();
      }
    }
  };

  setupListenersForm() {
    this.form.addEventListener('keydown', this.addItemComponent.bind(this));
    this.submitButton.addEventListener('click', this.addItemComponent.bind(this));
  }
}

