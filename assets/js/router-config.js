import LoginComponent from "./login-component.js";
import ContentItemComponent from "./content-item-component.js";
import LoginSignInComponent from "./login-sign-in-component.js";
import LoginSignUpComponent from "./login-sing-up-component.js";

export let routerConfig = {
  'login': {
    data: { route: 'login' },
    url: 'login.html',
    component: LoginComponent,
    settings: {
      redirect: ['content', 'sign-in', 'sign-up'],
    }
  },
  'sign-in': {
    data: { route: 'sign-in' },
    url: 'login-sign-in.html',
    component: LoginSignInComponent,
    settings: {
      redirect: 'content',
    }
  },
  'sign-up': {
    data: { route: 'sign-up' },
    url: 'login-sign-up.html',
    component: LoginSignUpComponent,
    settings: {
      redirect: 'content',
    }
  },
  'content': {
    data: { route: 'content' },
    url: 'content.html',
    component: ContentItemComponent,
    settings: {}
  }
};