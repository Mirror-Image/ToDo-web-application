import LoginComponent from "./login.js";
import ItemComponent from "./item-component.js";

export let routerConfig = {
  'login': {
    data: { route: 'login' },
    url: 'login.html',
    component: LoginComponent,
    settings: {
      redirect: 'content',
    }
  },
  'content': {
    data: { route: 'content' },
    url: 'content.html',
    component: ItemComponent,
    settings: {}
  }
};