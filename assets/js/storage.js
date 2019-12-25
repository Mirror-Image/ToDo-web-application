export default class AuthorizationStorageComponent {
  constructor() {
    if (AuthorizationStorageComponent.instance) {
      return AuthorizationStorageComponent.instance
    }
    AuthorizationStorageComponent.instance = this;
  }

  set id(value) {
    localStorage.setItem('id', value);
  }

  get id() {
    returnlocalStorage.getItem('token' )
  }

  set token(value) {
    localStorage.setItem('token', value);
  }

  get token() {
    return localStorage.getItem('token' )
  }
}