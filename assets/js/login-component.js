import Component from "./component.js";
import store from "./store/index.js";
import {request} from "./singletones-initialize.js";
import {Link} from "./utilites.js";

export default class LoginComponent extends Component {
  constructor(anchor, settings) {
    super(store);
    this.settings = settings;
    this.anchor = anchor;
    this.templateElement = document.getElementById('login-page')
      .content.cloneNode(true);
    this.anchor.appendChild(this.templateElement);
    this.onInit();
  }

  onInit() {
    console.log( 'LoginComponent initialized' );
    request.checkAuthorizationRequest(this.settings);
    this.setupListeners();
  }

  setupListeners() {
    this.anchor.querySelector('.sign-in')
      .addEventListener('click', Link.bind(this, this.settings.redirect[1]));

    this.anchor.querySelector('.sign-up')
      .addEventListener('click', Link.bind(this, this.settings.redirect[2]));
  }

  render() {
    console.log( 'LoginComponent rendered' )
  }
}