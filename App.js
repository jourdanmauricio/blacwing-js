/*/ Define la función principal que se ejecutará al cargar la página
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
*/

let prestamos = []; // Variable para almacenar los datos del JSON
let plazoInput = document.getElementById('plazoInput');
let montoInput = document.getElementById('montoInput');
let tipoPrestamoSelect = document.getElementById('tipoPrestamoSelect');
let ingresosMensuales = document.getElementById('ingresosMensuales');
let prestamoSeleccionado;

// Función para actualizar los campos del formulario con los datos del préstamo seleccionado
function actualizarCamposFormulario() {
  // const tipoPrestamoSelect = document.getElementById('tipoPrestamoSelect');

  // <select> Agregamos opciones desde el Json al tipo de prestamo
  for (tipoPrestamo of prestamos) {
    console.log('value', tipoPrestamo);
    let option = document.createElement('option');
    option.id = tipoPrestamo.id;
    option.text = tipoPrestamo.tipo;
    tipoPrestamoSelect.add(option);
  }
}

// Función para cargar los datos desde API
function cargarDatos() {
  fetch('https://64d00b45ffcda80aff526076.mockapi.io/prestamos')
    .then((response) => response.json())
    .then((jsonData) => {
      prestamos = jsonData; // Guardar los datos en la variable data
      actualizarCamposFormulario(); // Llamar a esta función para inicializar los campos del formulario

      console.log('Data Inicial', prestamos);
      // El select se encuentra inicializado con la primera opción -> estacemos los valores máximos
      plazoInput.max = prestamos[0].cantMaxCoutas;
      montoInput.max = prestamos[0].montoMax;
      prestamoSeleccionado = prestamos[0];
    })
    .catch((error) => console.error('Error al cargar los datos:', error));
}

function changeTipoPrestamo(e) {
  console.log('Data', e.target.value);
  // Busco el tipo de prestamo en array de prestamos
  prestamoSeleccionado = prestamos.find(
    (prestamo) => prestamo.tipo === e.target.value
  );

  //////////////////////////////////
  // Reestablecer los valores a 0 //
  //////////////////////////////////
  plazoInput.value = 0;
  montoInput.value = 0;

  ////////////////////////////////////////////////////////////////////////
  // Establecer los valores máximos considerando prestamo seleccionado  //
  ////////////////////////////////////////////////////////////////////////
  plazoInput.max = prestamoSeleccionado.cantMaxCoutas;
  montoInput.max = prestamoSeleccionado.montoMax;
}

// Función para calcular la cuota del préstamo
function calcularCuota() {
  const interesMensual = prestamoSeleccionado.tasa / 100 / 12;
  const plazo = parseInt(plazoInput.value);
  const monto = parseInt(montoInput.value);

  console.log('plazoInput', plazo);
  const cuota =
    (monto * interesMensual) / (1 - Math.pow(1 + interesMensual, -plazo));
  return cuota.toFixed(2);
}

function validarIngresos(cuota) {
  // Validamos que el valor de la cuota no supere el 30% de los ingresos mensuales
  const maxIngresosAfectados = (parseInt(ingresosMensuales.value) * 30) / 100;
  if (maxIngresosAfectados < cuota) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'El valor de la cuota no puede superar el 30% de los ingresos',
      footer: `<ul><li>Valor de la cuota: $${cuota}</li><li>Ingreso máximo afectado (30%): ${maxIngresosAfectados}</li><p><strong>Incremente la cantidad de cuotas o disminuya el monto solicitado</strong></p>`,
    });
  } else {
    Swal.fire(`La cuota mensual es de: $${cuota}`);
  }
}

function procesarFormulario(e) {
  e.preventDefault();
  const cuota = calcularCuota();

  validarIngresos(cuota);
}

async function procesarSolicitud(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const data = Object.fromEntries(formData.entries());
  console.log('data', data);

  try {
    const response = await fetch(
      'https://64d00b45ffcda80aff526076.mockapi.io/solicitudes',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        // body: data,
      }
    );

    if (response.ok) {
      Swal.fire(
        'Formulario enviado con éxito. En breve nos pondremos en contacto!'
      );
      e.target.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error enviado el formulario',
        footer: `<p><strong>Intentalo nuevamente!!!!!!!!!!</strong></p>`,
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error enviado el formulario',
      footer: `<p><strong>Intentalo nuevamente</strong></p>`,
    });
  }
}

// Define la función principal que se ejecutará al cargar la página
window.onload = function () {
  cargarDatos(); // Llamar a cargarDatos al cargar la página para obtener los datos del JSON
  document
    .getElementById('tipoPrestamoSelect')
    .addEventListener('change', changeTipoPrestamo);

  document
    .getElementById('formulario')
    .addEventListener('submit', procesarFormulario);

  document
    .getElementById('formularioSolicitar')
    .addEventListener('submit', procesarSolicitud);
};
