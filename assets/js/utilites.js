export function Link(route) {
  window.dispatchEvent(new CustomEvent('changeRoute',
    { detail: { route } }));
}