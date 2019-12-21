import Component from "./component.js";
import {errorMessage as errorMessage} from "./utilites.js"
import store from "./store/index.js";
import {request} from "./network.js";

export default class LoginComponent extends Component{
  constructor(anchor, settings) {
    super(store);
    console.log( store );
    this.settings = settings;
    request.checkAuthorizationRequest(this.settings);
    this.anchor = anchor;
    this.templateElement = document.getElementById('login-page')
      .content.cloneNode(true);
    this.anchor.appendChild(this.templateElement);
    this.setupListeners();
  }

  authorizationByEnter(e) {
    if (e.key === 'Enter') {
      return this.handleAuthorization(e);
    }
  }

  handleAuthorization(e) {
    e.preventDefault();

    let login = document.getElementById('login').value.trim();
    let pass = document.getElementById('pass').value.trim();


    if (login && pass) {

      request.loginRequest(login, pass, this.settings);

      console.log( store );
      // console.log( request.sessionAuthorizationData );
      // link(this.settings.redirect)

    } else if ((!login && pass) || (login && !pass)) {
      login ? errorMessage('Please enter your password.')
        : errorMessage('Please enter your login.');

    } else if (!login && !pass) {
      errorMessage('Please enter your login and password.');
    }
  }

  setupListeners() {

    this.anchor.querySelector('.login__main-form-submit')
      .addEventListener('click', this.handleAuthorization.bind(this));

    this.anchor.querySelectorAll('.login__main-form-input')
      .forEach(elem => {
        elem.addEventListener('keydown', this.authorizationByEnter.bind(this));
      });
  }

  render() {
    console.log( 'login render' );
  }
}

/*
const login = `
  <!--<style>
    .login {
      height: calc(var(&#45;&#45;vh, 1vh) * 100);
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
      background-size: cover;
      background-position: center;
      background-image: url("assets/img/bg-login.jpg");
    }
    
    .login-window {
      width: 30%;
      padding: 40px;
      border: 3px solid rgba(28, 121, 255, 0.8);
      border-radius: 7px;
      background-color: rgba(252, 252, 252, 0.8);
    }
    
    .login__header {
      padding: 40px;
      text-align: center;
    }
    
    .login__header-title {
      margin-bottom: 15px;
      font-family: 'Baloo', sans-serif;
      font-weight: 900;
      font-size: 4em;
      letter-spacing: 5px;
    }
    
    .login__header-description{
      font-family: 'NanumPenScript', sans-serif;
      font-size: 1.65em;
      letter-spacing: -1px;
    }
    
    .login__main,
    .content__main {
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
    
    .login__main-signin {
      font-family: 'Open Sans', sans-serif;
      font-size: 1.75em;
      font-weight: 600;
    }
    
    .login__main-form {
      padding: 25px;
    }
    
    .login__main-form-input {
      margin-bottom: 15px;
      padding: 10px;
      width: calc(100% - 24px);
      height: 30px;
      font-weight: 600;
      border: 2px solid #dadce0;
      border-radius: 7px;
    }
    
    .login__main-form-submit {
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      float: right;
      padding: 8px;
      text-align: right;
      color: #fcfcfc;
      font-family: 'Open Sans', sans-serif;
      font-size: 1.5em;
      border-radius: 7px;
      background-color: #1c79ff;
    }
    
    .login__main-form-submit:hover {
      cursor: pointer;
      background-color: #2a8eff;
    }

    @media (max-width: 1199px) {
	    .login-window {
		    width: 60%;
	    }
    }

    @media (max-width: 400px) {
	    .login-window {
		    padding: 20px;
	    }
	
	    .login__header {
		    padding: 0;
		    margin-bottom: 15px;
	    }
	
	    .login__header-title {
		    margin-bottom: 10px;
		    font-size: 3em;
	    }
	
	    .login__main-signin {
		    margin-bottom: 5px;
	    }
	
	    .login__main-form {
		    padding: 0;
	    }
    }
  </style>-->
  <section class="login">
    <div class="login-window">
      <div class="login__header">
        <h1 class="login__header-title">TODO LIST</h1><span class="login__header-description">Don't forget your most important stuff</span>
      </div>
      <div class="login__main">
        <h3 class="login__main-signin">Sign in</h3>
        <form class="login__main-form" method="post">
          <input id="login" class="login__main-form-input" type="text" name="login" placeholder="Login">
          <input id="pass" class="login__main-form-input" type="password" name="password" placeholder="Password">
          <p id="error_message">Invalid login or password. Please enter a correct data.</p>
          <a type="submit" class="login__main-form-submit">Submit</a>
          
        </form>
      </div>
    </div>
  </section>`;


 class LoginComponent {
  get dom() {
    this.anchor.innerHTML = this.render();
    this.setupListeners();
    return this.anchor;
  }
}

export class LoginPage extends LoginComponent {
  constructor(anchor) {
    super();
    this.anchor = document.getElementById('app');
  }

  onInit() {
    console.log('LoginComponent init')
  }

  render() {
    return login;
  }

  authorizationByEnter(e) {
    if (e.keyCode === 13) {
      return this.handleAuthorization(e);
    }
  }

  handleAuthorization(e) {
    e.preventDefault();

    let login = document.getElementById('login').value.trim();
    let pass = document.getElementById('pass').value.trim();
    const errorMessage = document.getElementById('error_message');

    if (login === 'Mirror' && pass === '123321') {
      window.dispatchEvent(new CustomEvent('changeRoute',
        { detail: { route: 'content' } }));

    } else if ((!login && pass) || (login && !pass)) {
      login ? errorMessage.innerText = 'Please enter your password.'
        : errorMessage.innerText = 'Please enter your login.';

      errorMessage.style.visibility = 'visible';

    } else if (!login && !pass ) {
      errorMessage.innerText = 'Please enter your login and password.';
      errorMessage.style.visibility = 'visible';

    } else {
      errorMessage.innerText =
        'Invalid login or password. Please enter a correct data.';
      errorMessage.style.visibility = 'visible';
    }
  }

  setupListeners() {
    this.anchor.querySelector('.login__main-form-submit')
      .addEventListener('click', this.handleAuthorization.bind(this));

    this.anchor.querySelectorAll('.login__main-form-input')
      .forEach(elem => {
        elem.addEventListener('keydown', this.authorizationByEnter.bind(this));
      });
  }
}*/