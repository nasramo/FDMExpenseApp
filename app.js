const button = document.getElementById('showMessage');
const message = document.getElementById('message');

button.addEventListener('click', () => {
  message.textContent = 'Your custom SVG icons can go in assets/icons/ and be loaded from JS, CSS, or HTML.';
});
