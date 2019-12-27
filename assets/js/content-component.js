import Component from "./component.js";
import store from "./store/index.js";

export default class ContentComponent extends Component {
  constructor() {
    super(store);
    this.anchor = document.getElementById('app');
    this.templateElement = document.getElementById('content-page')
      .content.cloneNode(true);
    this.onInitContent();
  }

  onInitContent() {
    console.log( 'ContentComponent initialized' );
    this.renderContent()
  }

  renderContent() {
    this.anchor.appendChild(this.templateElement);
    console.log( 'ContentComponent rendered' );
  }
}