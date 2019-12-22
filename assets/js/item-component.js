import ListComponent from "./list-component.js";
import store from "./store/index.js";
import {request} from "./network.js";

export default class ItemComponent extends ListComponent {
  constructor() {
    super();
    this.itemsArray= document
      .getElementsByClassName('content__main-results-list-item-buttons');

    this.itemAnchor = document
      .querySelector('.content__main-results-list');


  }

  onInit() {
    console.log( 'ItemComponent initialized' );
    this.render();

  }

  editItem() {

  }

  render() {
    console.log( 'ItemComponent rendered' );
    // console.log( this.anchorItem );
    Array.prototype.forEach.call(this.itemsArray, item => item.innerHTML = `
      <a class="content__main-results-list-item-buttons-done done-button"></a>
      <a class="content__main-results-list-item-buttons-delete delete-button"></a>
      <a class="content__main-results-list-item-buttons-edit edit-button"></a>
    `);
    this.setupListeners()
  }

  setupListeners() {
    this.anchor.querySelectorAll('.delete-button').forEach((button, id) => {
      let idNumber = button.parentElement.parentElement.id;
        button.addEventListener('click', async () => {
          store.dispatch('removeItem', {id});
          await request.deleteItem(idNumber);

          this.renderList();
        })
    }

    )
    // this.anchor.querySelectorAll('.delete-button').forEach
    // console.log( this.anchor.getElementsByClassName('delete-button')  );
    // Array.prototype.forEach.call(this.anchor.getElementsByClassName('delete-button'), (button, id) => {
    //
    //   let a = button.parentElement.parentElement.id;
    //
    //   button.addEventListener('click', (function(){
    //     store.dispatch('removeItem', {id});
    //     // console.log( button.parentElement.parentElement.id );
    //
    //     console.log( a );
    //
    //     request.deleteItem(a);
    //     this.renderList();
    //
    //   }).bind(this)
    //   )
    //
    //   }
    //
    //
    // )
  }
}