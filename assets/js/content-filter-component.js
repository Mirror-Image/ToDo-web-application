import ContentCounterComponent from "./content-counter-component.js";

export default class ContentFilterComponent extends ContentCounterComponent {
  constructor() {
    super();
    this.filterAnchor = document.querySelector('.content__main-results-filters');
    this.listElement = document.querySelector('.content__main-results-list');
    this.onInitFilter();
  }

  onInitFilter() {
    console.log('ContentCounterComponent initialized');
    this.renderFilter();
    this.setupListenersFilter();
  }

  doneFilter() {
    if (!this.listElement.hasAttribute('done-filter')) {

      this.listElement.removeAttribute('in-progress-filter');
      this.listElement.removeAttribute('all-filter');

      this.filterAnchor.removeAttribute('in-progress-filter');
      this.filterAnchor.removeAttribute('all-filter');
    }
    this.listElement.toggleAttribute('done-filter');
    this.filterAnchor.toggleAttribute('done-filter');

    this.renderList();
    this.onInitButtons();
  }

  inProgressFilter() {
    if (!this.listElement.hasAttribute('in-progress-filter')) {

      this.listElement.removeAttribute('done-filter');
      this.listElement.removeAttribute('all-filter');

      this.filterAnchor.removeAttribute('done-filter');
      this.filterAnchor.removeAttribute('all-filter');
    }
    this.listElement.toggleAttribute('in-progress-filter');
    this.filterAnchor.toggleAttribute('in-progress-filter');

    this.renderList();
    this.onInitButtons();
  }

  allFilter() {
    if (!this.listElement.hasAttribute('all-filter')) {

      this.listElement.removeAttribute('in-progress-filter');
      this.listElement.removeAttribute('done-filter');

      this.filterAnchor.removeAttribute('in-progress-filter');
      this.filterAnchor.removeAttribute('done-filter');
    }
    this.listElement.toggleAttribute('all-filter');
    this.filterAnchor.toggleAttribute('all-filter');

    this.renderList();
    this.onInitButtons();
  }

  renderFilter() {
    this.filterAnchor.innerHTML = `
      <a class="content__main-results-filters-done">Done</a>
      <a class="content__main-results-filters-inprogress">In progress</a>
      <a class="content__main-results-filters-all">All</a>
    `;
    console.log('ContentCounterComponent rendered');
  }

  setupListenersFilter() {
    const doneFilterButton = this.filterAnchor
      .querySelector('.content__main-results-filters-done');
    const inProgressFilter = this.filterAnchor
      .querySelector('.content__main-results-filters-inprogress');
    const allFilterButton = this.filterAnchor
      .querySelector('.content__main-results-filters-all');

    doneFilterButton.addEventListener('click', this.doneFilter.bind(this));

    inProgressFilter.addEventListener('click', this.inProgressFilter.bind(this));

    allFilterButton.addEventListener('click', this.allFilter.bind(this));
  }
}