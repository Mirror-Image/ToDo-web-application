import {Link as link, errorMessage} from "./utilites.js"
import store from "./store/index.js";

export default class NetworkRequest {
  constructor(settings) {
    this.settings = settings;
    this.sessionAuthorizationData = null;
  }

  checkAuthorizationRequest(settings) {
    if (localStorage.getItem('token' )) {
      fetch('https://todo-app-back.herokuapp.com/me', {
        method: 'GET',
        headers: {
          'Authorization': `${localStorage.getItem('token' )}`
        }
      })
      .then(response => response.json())
      .then(obj => {
        this.sessionAuthorizationData = obj;
        console.log( this.sessionAuthorizationData );
        if (!this.sessionAuthorizationData.error) {
          store.dispatch('login', this.sessionAuthorizationData);

          localStorage.setItem('id', this.sessionAuthorizationData.id);
          localStorage.setItem('token', this.sessionAuthorizationData.token);

          console.log( localStorage.getItem('token' ) );
          console.log( localStorage.getItem('id' ) );

          console.log( store );
          link(settings.redirect)
        }
      }).catch(error => console.log(error));
    }
  }

  loginRequest(login, pass, settings) {
    fetch('https://todo-app-back.herokuapp.com/login', {
      method: 'POST',
      body:
        JSON.stringify({
          email: login,
          password: pass
        }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.ok ? res : Promise.reject(res))
    .then(response => response.json())
    .then(obj => {
      console.log( obj.id );
      this.sessionAuthorizationData = obj;
      console.log( this.sessionAuthorizationData );
      if (!this.sessionAuthorizationData.error) {
        store.dispatch('login', this.sessionAuthorizationData);

        localStorage.setItem('id', this.sessionAuthorizationData.id);
        localStorage.setItem('token', this.sessionAuthorizationData.token);

        console.log( localStorage.getItem('token' ) );

        console.log( store );
        link(settings.redirect)
      }
    })
    .catch(error => error.json())
    .then(objError => {
      if (objError.error === 'User does not exist') {
        console.log( 'WOW!' );
        errorMessage('Please enter a correct login or create a new account for free.');

      } else if (objError.error === 'Wrong password') {
        errorMessage('Please enter a correct password.');
        console.log( 'WOW! WOW!' );
      }
    });
  }

  async readTodosRequest() {
    await fetch('https://todo-app-back.herokuapp.com/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token' )}`
      }
    })
    .then(response => response.json())
    .then(obj => {
      store.props = obj;
    });

    return store.props;
  }
}