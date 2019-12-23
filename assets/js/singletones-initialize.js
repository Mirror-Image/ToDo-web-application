import NetworkRequest from "./network-request.js";
import CounterComponent from "./counter-component.js";
import FilterComponent from "./filter-component.js";

export const request = new NetworkRequest();
export const counter = new CounterComponent();
export const filter = new FilterComponent(document.querySelector('.content__main-results-filters'));