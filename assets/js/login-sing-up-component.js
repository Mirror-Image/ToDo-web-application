import Component from "./component.js";
import store from "./store/index.js";
import {request} from "./singletones-initialize.js";
import {errorMessage} from "./utilites.js";

export default class LoginSignUpComponent extends Component {
  constructor(anchor, settings) {
    super(store);
    this.settings = settings;
    this.anchor = anchor;
    this.templateElement = document.getElementById('sign-up')
      .content.cloneNode(true);
    this.anchor.appendChild(this.templateElement);
    this.onInit();
  }

  onInit() {
    console.log( 'LoginSignUpComponent initialized' );
    this.setupListeners();
  }

  register(event) {
    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();

      let email = document.getElementById('sign-up-email').value.trim();
      let login = document.getElementById('sign-up-login').value.trim();
      let pass = document.getElementById('sign-up-pass').value.trim();

      if (email && login && pass) {

        request.registerRequest(email, login, pass);

      } else if ((!email && login && pass) || (email && !login && pass)
        || (email && login && !pass)) {
        !email ? errorMessage('Please enter your email.')
          : !login ? errorMessage('Please enter your login.')
            : errorMessage('Please enter your password.')

      } else {
        errorMessage('Please type all inputs of the form.');
      }
    }
  }

  setupListeners() {
    this.anchor.querySelector('.login__main-form-submit')
      .addEventListener('click', this.register.bind(this));

    this.anchor.querySelectorAll('.login__main-form-input')
      .forEach(elem => {
        elem.addEventListener('keydown', this.register.bind(this));
      });
  }

  render() {
    console.log( 'LoginSignUpComponent rendered' );
  }
}