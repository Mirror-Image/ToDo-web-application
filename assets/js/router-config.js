// import ContentComponent from "./content.js";
import LoginComponent from "./login.js";
import ContentItemsComponent from "./content-items.js"

export let routerConfig = {
  'login': {
    data: { route: 'login' },
    url: 'login',
    component: LoginComponent,
    settings: {
      redirect: 'content'
      // handleLogIn: () => store.dispatch('login')
    }
  },

  'content': {
    data: { route: 'content' },
    url: 'content',
    component: ContentItemsComponent,
    settings: {

    }
  }
};