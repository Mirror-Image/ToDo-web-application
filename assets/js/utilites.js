export function Link(route) {
  window.dispatchEvent(new CustomEvent('changeRoute',
    { detail: { route } }));
}

export function errorMessage(text) {
  const errorMessage = document.getElementById('error_message');
  return errorMessage.innerText = text;
}