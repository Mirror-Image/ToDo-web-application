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
          <input id="pass" class="login__main-form-input" type="password" name="password" placeholder="Password"><a type="submit" class="login__main-form-submit">Submit</a>
          <span id="error_message"></span>
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

  handleAuthorization(e) {
    e.preventDefault();

    let login = document.getElementById('login').value.trim();
    let pass = document.getElementById('pass').value.trim();

    if (login === 'Mirror' && pass === '123321') {
      window.dispatchEvent(new CustomEvent('changeRoute',
        { detail: { route: 'content' } }));
    } else {
      // TODO: вывести сообщение о не правильном логине или пароле!
      document.querySelector('.login__main-form')
        .innerHTML = 'invalid login or password. Please enter a correct data';
    }
  }

  setupListeners() {
    this.anchor.querySelector('.login__main-form-submit')
      .addEventListener('click', this.handleAuthorization.bind(this));
  }
}