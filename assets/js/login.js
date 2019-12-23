import Component from "./component.js";
import {errorMessage as errorMessage} from "./utilites.js"
import store from "./store/index.js";
import {request} from "./singletones-initialize.js";

export default class LoginComponent extends Component{
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

  handleAuthorization(event) {
    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();

      let login = document.getElementById('login').value.trim();
      let pass = document.getElementById('pass').value.trim();

      if (login && pass) {
        request.loginRequest(login, pass, this.settings);

      } else if ((!login && pass) || (login && !pass)) {
        login ? errorMessage('Please enter your password.')
          : errorMessage('Please enter your login.');

      } else if (!login && !pass) {
        errorMessage('Please enter your login and password.');
      }
    }
  }

  setupListeners() {
    this.anchor.querySelector('.login__main-form-submit')
      .addEventListener('click', this.handleAuthorization.bind(this));

    this.anchor.querySelectorAll('.login__main-form-input')
      .forEach(elem => {
        elem.addEventListener('keydown', this.handleAuthorization.bind(this));
      });
  }

  render() {
    console.log( 'LoginComponent rendered' );
  }
}