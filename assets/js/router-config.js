import LoginComponent from "./login.js";
import ContentItemsComponent from "./content-items.js"
import store from "./store/index.js";

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
    component: ContentItemsComponent,
    settings: {}
  }
};