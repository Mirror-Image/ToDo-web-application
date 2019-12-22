import {routerConfig} from "./router-config.js";

export default class Router {
  constructor(anchor) {
    this.anchor = anchor;

    window.addEventListener('popstate', event => {
      this.changeRoute(event.state.route)
    })
  }

  changeRoute(route) {
    const conf = routerConfig[route];

    if (!conf) return;
    if (this.component) {
      console.log( this.component );
      this.component.clearDOM(this.anchor);
    }
    window.history.pushState(conf.data, '', conf.url);

    // console.log( conf.component );

    this.component = new conf.component(this.anchor, conf.settings);

    // this.component.render();

  }
}