import Router from "./router.js";

const router = new Router(document.getElementById('app'));

window.addEventListener('changeRoute', event => router
  .changeRoute(event.detail.route));

window.dispatchEvent(new CustomEvent('changeRoute',
  { detail: { route: 'login' }}));








/*
import {LoginPage} from './login.js'
import {ContentPage} from './content.js'

const routerConfig = {
  'login': {
    data: { route: 'login' },
    url: '',
    component: LoginPage,
  },
  'content': {
    data: { route: 'content' },
    url: 'content',
    component: ContentPage,
  }
};

class Router {
  constructor(anchor) {
    this.anchor = anchor;

    window.addEventListener('popstate', event => {
      this.changeRoute(event.state.route);
    });
  }

  // TODO: переписать changeRote под анимацию перехода страниц
  changeRoute(route) {
    const conf = routerConfig[route];

    if (!conf) return;

    window.history.pushState(conf.data, '', conf.url);

    const component = new conf.component();

    component.onInit(); // тут может быть какой-то запрос на сервер
    const dom = component.dom;
    
    if (this.currentDomComponent) {
      this.anchor.innerHTML = '';
      this.anchor.appendChild(dom);
    } else {
      this.anchor.appendChild(dom);
    }

    this.currentDomComponent = dom;
  }
}

const router = new Router(document.body);

window.addEventListener('changeRoute', event => {
  router.changeRoute(event.detail.route);
});

window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'login' } }));


// TODO: the shadow DOM elements
/!*
class Login extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  render() {
    this.shadowRoot.appendChild(temp);
  }

  connectedCallback() {
    this.render()
  }
}
*!/
*/