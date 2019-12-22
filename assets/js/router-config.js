import LoginComponent from "./login.js";
// import ContentItemsComponent from "./form-component.js"
import store from "./store/index.js";
import ItemComponent from "./item-component.js";

export let routerConfig = {
  'login': {
    data: { route: 'login' },
    url: 'login.html',
    component: LoginComponent,
    settings: {
      redirect: 'content',
      // handleLogIn: () => store.dispatch('login')
    }
  },

  'content': {
    data: { route: 'content' },
    url: 'content.html',
    component: ItemComponent,
    settings: {}
  }
};