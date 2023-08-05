// Define la función principal que se ejecutará al cargar la página
window.onload = function () {
  document.getElementById('calcularBtn').addEventListener('click', calcularPrestamo);
  document.getElementById('tipoPrestamoSelect').addEventListener('change', actualizarCamposFormulario);
  cargarDatos(); // Llamar a cargarDatos al cargar la página para obtener los datos del JSON
};

let data = null; // Variable para almacenar los datos del JSON

// Función para cargar los datos simulados desde data.json utilizando AJAX y JSON
function cargarDatos() {
  fetch('../data.json')
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData; // Guardar los datos en la variable data
      actualizarCamposFormulario(); // Llamar a esta función para inicializar los campos del formulario
    })
    .catch(error => console.error('Error al cargar los datos:', error));
}

// Función para calcular la cuota del préstamo
function calcularCuota(monto, tasa, plazo) {
  const interesMensual = (tasa / 100) / 12;
  const cuota = (monto * interesMensual) / (1 - Math.pow(1 + interesMensual, -plazo));
  return cuota.toFixed(2);
}

// Función para mostrar el resultado en el DOM
function mostrarResultado(nombrePrestamo, cuota) {
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `<p>Para el préstamo "${nombrePrestamo}", la cuota mensual es: $${cuota}</p>`;

  // Usando SweetAlert para mostrar el mensaje de resultado
  Swal.fire({
    icon: 'success',
    title: 'Resultado',
    text: `Para el préstamo "${nombrePrestamo}", la cuota mensual es: $${cuota}`,
  });
}


// Función para actualizar los campos del formulario con los datos del préstamo seleccionado
function actualizarCamposFormulario() {
  const tipoPrestamoSelect = document.getElementById('tipoPrestamoSelect');
  const montoInput = document.getElementById('montoInput');
  const plazoInput = document.getElementById('plazoInput');

  const tipoPrestamo = tipoPrestamoSelect.value; // Obtener el valor seleccionado del <option>

  const prestamoSeleccionado = data.find(prestamo => prestamo.nombre === tipoPrestamo);

  if (prestamoSeleccionado) {
    montoInput.value = prestamoSeleccionado.monto;
    plazoInput.value = prestamoSeleccionado.plazo;
  }
}

// Función principal para calcular el préstamo y mostrar el resultado
function calcularPrestamo() {
  const tipoPrestamoSelect = document.getElementById('tipoPrestamoSelect');
  const montoInput = document.getElementById('montoInput');
  const plazoInput = document.getElementById('plazoInput');

  const monto = parseFloat(montoInput.value);
  const plazo = parseInt(plazoInput.value);
  const tipoPrestamo = tipoPrestamoSelect.value; // Obtener el valor seleccionado del <option>

  const prestamoSeleccionado = data.find(prestamo => prestamo.nombre === tipoPrestamo);

  if (prestamoSeleccionado) {
    const cuota = calcularCuota(monto, prestamoSeleccionado.tasa, plazo);
    mostrarResultado(prestamoSeleccionado.nombre, cuota);
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El préstamo seleccionado no existe en los datos.',
    });
  }
}