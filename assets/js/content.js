import Component from "./component.js";
import store from "./store/index.js";

export default class ContentComponent extends Component {
  constructor() {
    super(store); // TODO: что такое store? Проверить нужен ли он тут!
    this.anchor = document.getElementById('app');
    this.templateElement = document.getElementById('content-page')
      .content.cloneNode(true);
    this.onInitContent();
  }

  onInitContent() {
    console.log( 'ContentComponent initialized' );
    this.renderContent()
  }

  renderContent() {
    this.anchor.appendChild(this.templateElement);
    console.log( 'ContentComponent rendered' );
  }
}



/*
const content = `
  <!--<style>
    .content {
      /!*height: calc(var(&#45;&#45;vh, 1vh) * 100);*!/
      height: 100vh;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background-size: cover;
      background-position: center;
      background-image: url("assets/img/bg-content.jpg");
    }
    
    .content__main {
      margin-top: 50px;
      width: 90%;
    
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border: none;
      border-radius: 0;
      background-color: transparent;
    }
    
    .content__main-header {
      margin-bottom: 15px;
      width: 60%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -ms-flex-pack: distribute;
      justify-content: space-around;
    }
    
    .content__main-header-form {
      width: 80%;
    }
    
    .content__main-header-form-block {
      padding: 0;
      width: 80%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border: 3px solid #dadce0;
      border-radius: 7px;
    }
    
    .content__main-header-form-block-input {
      padding: 10px;
      height: 30px;
      margin-bottom: 0;
      width: 90%;
      border: none;
      border-right: 3px solid #dadce0;
      border-radius: 3px 0 0 3px;
      font-weight: bold;
    }
    
    .content__main-header-form-block-button {
      padding: 15px;
      width: 10%;
      text-align: center;
      border-radius: 0 3px 3px 0;
      font-family: 'Open Sans', sans-serif;
      font-size: 1.3em;
      font-weight: bold;
      letter-spacing: 0;
      color: #fcfcfc;
      background-color: #1c79ff;
    }
    
    .content__main-header-form-block-button:hover {
      cursor: pointer;
      background-color: #2a8eff;
    }
    
    .content__main-header-statistics {
      padding: 15px;
      height: 11%;
      width: 20%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-align: end;
      -ms-flex-align: end;
      align-items: flex-end;
      border-radius: 7px;
      background-color: rgba(252, 252, 252, 0.8);
    }
    
    .content__main-results {
      width: 75%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
    
    .content__main-results-filters {
      margin-bottom: 40px;
    }
    
    .content__main-results-filters a {
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      margin-right: 40px;
      padding: 10px;
      border: 3px solid #fcfcfc;
      border-radius: 7px;
      font-family: 'Open Sans', sans-serif;
      font-size: 1.1em;
      font-weight: bold;
      letter-spacing: 0;
      color: #fcfcfc;
      cursor: pointer;
    }
    
    .content__main-results-filters a:last-of-type {
      margin-right: 0;
    }
    
    .content__main-results-filters-done {
      background-color: #57c532;
    }
    
    .content__main-results-filters-done:hover {
      background-color: #74eb5e;
    }
    
    .content__main-results-filters-inprogress {
      background-color: #f75f51;
    }
    
    .content__main-results-filters-inprogress:hover {
      background-color: #f79174;
    }
    
    .content__main-results-filters-all {
      background-color: #ddba22;
    }
    
    .content__main-results-filters-all:hover {
      background-color: #ddd658;
    }
    
    .content__main-results-list {
      width: 80%;
    }
    
    .content__main-results-list-item {
      margin: 0 auto 15px;
      padding: 15px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border: 3px solid #dadce0;
      border-radius: 7px;
      background-color: rgba(252, 252, 252, 0.8);
    }
    
    .content__main-results-list-item:hover a {
      visibility: visible;
    }
    
    .content__main-results-list-item:hover a:last-of-type {
      display: none;
    }
    
    .content__main-results-list-item-text {
      font-family: 'Open Sans', sans-serif;
      font-size: 1.2em;
      font-weight: bold;
    }
    
    .content__main-results-list-item-buttons a {
      margin-right: 15px;
      display: inline-block;
      height: 30px;
      width: 30px;
      font-size: 0.5em;
      border-radius: 50%;
      cursor: pointer;
      visibility: hidden;
      border: 3px solid #fcfcfc;
    }
    
    .content__main-results-list-item-buttons a:last-of-type {
      margin-right: 0;
    }
    
    .content__main-results-list-item-buttons-done {
      background: #57c532 url("assets/img/check-solid.svg") center center no-repeat;
    }
    
    .content__main-results-list-item-buttons-done:hover {
      background-color: #74eb5e;
    }
    
    .content__main-results-list-item-buttons-delete {
      background: #f75f51 url("assets/img/times-solid.svg") center center no-repeat;
    }
    
    .content__main-results-list-item-buttons-delete:hover {
      background-color: #f79174;
    }
    
    .content__main-results-list-item-buttons-edit {
      display: none;
      background: #ddba22 url("assets/img/pen-solid.svg") center center no-repeat;
    }
    
    .content__main-results-list-item-buttons-edit:hover {
      background-color: #ddd658;
    }
    
    @media (max-width: 1199px) {
      .content__main-header {
        width: 100%;
      }
      .content__main-header-form-block-button {
        width: 12%;
        padding: 17px 12px;
        font-size: 1em;
      }
      .content__main-results {
        width: 100%;
      }
      .content__main-results-filters a {
        font-size: 1.4em;
      }
      .content__main-results-list {
        width: 100%;
      }
    }
    
    @media (max-width: 991px) {
      .content__main {
        width: 95%;
      }
    }
    
    @media (max-width: 767px) {
      .content__main {
        width: 90%;
      }
      .content__main-header {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
      .content__main-header-form {
        width: 100%;
      }
      .content__main-header-form-block {
        margin-bottom: 15px;
        width: 100%;
      }
      .content__main-header-statistics {
        padding-left: 0;
        padding-right: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
        -ms-flex-pack: distribute;
        justify-content: space-around;
        margin-bottom: 15px;
        width: 100%;
      }
      .content__main-results-list-item:hover a:last-of-type {
        display: inline-block;
      }
      .content__main-results-list-item-buttons a {
        margin-right: 10px;
        visibility: visible;
      }
      .content__main-results-list-item-buttons-edit {
        display: inline-block;
      }
    }
    
    @media (max-width: 400px) {
      .content__main {
        margin-top: 15px;
      }
      .content__main-results-filters {
        margin-bottom: 20px;
      }
      .content__main-results-filters a {
        margin-right: 15px;
        font-size: 1.2em;
      }
      .content__main-results-list-item {
        padding: 5px;
      }
      .content__main-results-list-item-buttons a {
        margin-right: 5px;
        height: 20px;
        width: 20px;
      }
    }
  </style>-->
  <div class="content">
    <div class="content__main">
      <div class="content__main-header">
        <div class="content__main-header-form">
          <form class="content__main-header-form-block">
            <input class="content__main-header-form-block-input" type="text" placeholder="Type your note"><a class="content__main-header-form-block-button">Add</a>
          </form>
        </div>
        <div class="content__main-header-statistics">
          <p>All:<span> XXX</span></p>
          <p>Done:<span> XXX</span></p>
          <p>In progress:<span> XXX</span></p>
        </div>
      </div>
      <div class="content__main-results">
        <div class="content__main-results-filters"><a class="content__main-results-filters-done">Done</a><a class="content__main-results-filters-inprogress">In progress</a><a class="content__main-results-filters-all">All</a></div>
        <div class="content__main-results-list">
          <ul>
            <li class="content__main-results-list-item">
              <p class="content__main-results-list-item-text">Some text 1</p>
              <div class="content__main-results-list-item-buttons"><a class="content__main-results-list-item-buttons-done"></a><a class="content__main-results-list-item-buttons-delete"></a><a class="content__main-results-list-item-buttons-edit"></a></div>
            </li>
            <li class="content__main-results-list-item">
              <p class="content__main-results-list-item-text">Some text 2</p>
              <div class="content__main-results-list-item-buttons"><a class="content__main-results-list-item-buttons-done"></a><a class="content__main-results-list-item-buttons-delete"></a><a class="content__main-results-list-item-buttons-edit"></a></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>`;

class ContentComponent {
  get dom() {
    this.anchor.innerHTML = this.render();
    this.setupListeners();
    return this.anchor;
  }
}

export class ContentPage extends ContentComponent{
  constructor(anchor) {
    super();
    this.anchor = document.getElementById('app');
  }

  onInit() {
    console.log('ContentComponent init')
  }

  render() {
    return content;
  }

  setupListeners() {

  }
}*/