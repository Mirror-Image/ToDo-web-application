import Component from "./component.js";
import {errorMessage as errorMessage} from "./utilites.js"
import {request} from "./singletones-initialize.js";
import store from "./store/index.js";

export default class LoginSignInComponent extends Component {
  constructor(anchor, settings) {
    super(store);
    this.settings = settings;
    this.anchor = anchor;
    this.templateElement = document.getElementById('sign-in')
      .content.cloneNode(true);
    this.anchor.appendChild(this.templateElement);
    this.onInit();
  }

  onInit() {
    console.log( 'LoginSignInComponent initialized' );
    this.render();
    this.setupListeners();
  }

  handleAuthorization(event) {
    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();

      let login = document.getElementById('login').value.trim();
      let pass = document.getElementById('pass').value.trim();
      let saveLoginData = document.getElementById('login-data');

      if (login && pass) {
        if (saveLoginData.checked) {
          request.loginRequest(login, pass, true, this.settings);
        }

        request.loginRequest(login, pass, false, this.settings);

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
    console.log( 'LoginSignInComponent rendered' );
  }
}