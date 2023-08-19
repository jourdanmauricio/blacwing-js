let prestamos = [];
let plazoInput = document.getElementById('plazoInput');
let montoInput = document.getElementById('montoInput');
let tipoPrestamoSelect = document.getElementById('tipoPrestamoSelect');
let ingresosMensuales = document.getElementById('ingresosMensuales');
let prestamoSeleccionado;

function actualizarCamposFormulario() {
  for (tipoPrestamo of prestamos) {
    let option = document.createElement('option');
    option.id = tipoPrestamo.id;
    option.text = tipoPrestamo.tipo;
    tipoPrestamoSelect.add(option);
  }
}

function cargarDatos() {
  fetch('https://64d00b45ffcda80aff526076.mockapi.io/prestamos')
    .then((response) => response.json())
    .then((jsonData) => {
      prestamos = jsonData;
      localStorage.setItem('prestamos', JSON.stringify(prestamos));
      actualizarCamposFormulario();
      plazoInput.max = prestamos[0].cantMaxCoutas;
      montoInput.max = prestamos[0].montoMax;
      prestamoSeleccionado = prestamos[0];
    })
    .catch((error) => console.error('Error al cargar los datos:', error));
}

function changeTipoPrestamo(e) {
  prestamoSeleccionado = prestamos.find(
    (prestamo) => prestamo.tipo === e.target.value
  );
  plazoInput.value = 0;
  montoInput.value = 0;
  plazoInput.max = prestamoSeleccionado.cantMaxCoutas;
  montoInput.max = prestamoSeleccionado.montoMax;
}

function calcularCuota() {
  const interesMensual = prestamoSeleccionado.tasa / 100 / 12;
  const plazo = parseInt(plazoInput.value);
  const monto = parseInt(montoInput.value);
  const cuota = (monto * interesMensual) / (1 - Math.pow(1 + interesMensual, -plazo));
  return cuota.toFixed(2);
}

function validarIngresos(cuota) {
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

  try {
    const response = await fetch(
      'https://64d00b45ffcda80aff526076.mockapi.io/solicitudes',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
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
        footer: `<p><strong>Inténtalo nuevamente!</strong></p>`,
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error enviado el formulario',
      footer: `<p><strong>Inténtalo nuevamente</strong></p>`,
    });
  }
}

window.onload = function () {
  cargarDatos();
  
  const storedPrestamos = localStorage.getItem('prestamos');
  if (storedPrestamos) {
    prestamos = JSON.parse(storedPrestamos);
    actualizarCamposFormulario();
  }
  
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
