function onSubmit(e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));
  data.url = 'jourdanmauricio.github.io/blacwing-js';

  fetch('https://api.lumau.com.ar/v1/subscribers', {
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
  document
    .getElementById('subscriber-form')
    .addEventListener('submit', onSubmit);
};
