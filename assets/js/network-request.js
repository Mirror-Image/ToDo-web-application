import {Link as link, errorMessage} from "./utilites.js"
import store from "./store/index.js";

export default class NetworkRequest {
  constructor(settings) {
    if (NetworkRequest.instance) {
      return NetworkRequest.instance
    }
    NetworkRequest.instance = this;

    this.settings = settings;
    this.sessionAuthorizationData = null;
    this.serverURL = new URL('https://todo-app-back.herokuapp.com/')
  }

  checkAuthorizationRequest(settings) {
    if (localStorage.getItem('token' )) {
      fetch(`${new URL('me', this.serverURL)}`, {
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

          link(settings.redirect);
        }
      }).catch(error => console.log(error));
    }
  }

  loginRequest(login, pass, settings) {
    fetch(`${new URL('login', this.serverURL)}`, {
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

  async readAllTodosRequest() {
    let res;
    await fetch(`${new URL('todos', this.serverURL)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token' )}`
      }
    })
      .then(response => response.json())
      .then(obj => res = obj);

    return res;
  }

  async readSingleTodoRequest(id) {
    let res;
    await fetch(`${new URL(`todos/${id}`, this.serverURL)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token' )}`
      }
    })
      .then(response => response.json())
      .then(obj => res = obj);

    return res;
  }

  deleteItemRequest(id) {
    fetch(`${new URL(`todos/${id}`, this.serverURL)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token' )}`
      }
    }).then(resolved => {console.log( 'deleteItem' )})
      .catch(err => console.log( err ));

    return 'ready';
  }

  async createItemRequest(text, date, executionStatus) {
    await fetch(`${new URL('todos', this.serverURL)}`, {
      method: 'POST',
      body:
        JSON.stringify({
          "text": `${text}`,
          "createDate": `${date}`,
          "completed": `${executionStatus}`,
        }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token' )}`
      }
    }).then(resolved => {console.log( 'createItem' )})
      .catch(err => console.log( err ));

    return 'ready';
  }

  async updateItemRequest(id, boolean, text) {
    await fetch(`${new URL(`todos/${id}`, this.serverURL)}`, {
      method: 'PUT',
      body:
        JSON.stringify({
          text: `${text}`,
          completed: `${boolean}`,
        }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token' )}`
      }
    }).then(resolved => {console.log( 'ItemUpdated' )})
      .catch(err => console.log( err ));
  }

  async markDoneItemRequest(id, boolean) {
    await fetch(`${new URL(`todos/${id}`, this.serverURL)}`, {
      method: 'PUT',
      body:
        JSON.stringify({
          completed: `${boolean}`,
        }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token' )}`
      }
    }).then(resolved => {console.log( 'ItemUpdated' )})
      .catch(err => console.log( err ));
  }
}