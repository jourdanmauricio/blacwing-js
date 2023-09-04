function onSubmit(e) {
  e.preventDefault();

  console.log('submit', e);
  const data = Object.fromEntries(new FormData(e.target));
  console.log('data', data);
  data.url = 'https://jourdanmauricio.github.io/blacwing-js';

  fetch('https://api.labranzas.store/v1/subscribers', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((jsonData) => {
      console.log('Response', jsonData);
    })
    .catch((error) => console.error('Error al cargar los datos:', error));
}

window.onload = function () {
  console.log('HOLAS ');

  document
    .getElementById('subscriber-form')
    .addEventListener('submit', onSubmit);
};