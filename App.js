// Archivo JavaScript

// Define la función principal que se ejecutará al cargar la página
window.onload = function () {
  // Agregar eventos a los elementos del DOM
  // Aquí puedes asignar funciones a botones, inputs, etc.
  // Por ejemplo:
  document.getElementById('calcularBtn').addEventListener('click', calcularPrestamo);
};

// Función para cargar los datos simulados desde data.json utilizando AJAX y JSON
function cargarDatos() {
  // Aquí realizarías la carga de datos utilizando fetch o XMLHttpRequest
  // Por simplicidad, puedes cargar los datos directamente si no tienes acceso a una API
  return fetch('data.json')
    .then(response => response.json())
    .catch(error => console.error('Error al cargar los datos:', error));
}

// Función para calcular la cuota del préstamo
function calcularCuota(monto, tasa, plazo) {
  // Aquí realizarías los cálculos para obtener la cuota del préstamo
  // Por ejemplo:
  const interesMensual = (tasa / 100) / 12;
  const cuota = (monto * interesMensual) / (1 - Math.pow(1 + interesMensual, -plazo));
  return cuota.toFixed(2); // Redondeamos a 2 decimales
}

// Función para mostrar el resultado en el DOM
function mostrarResultado(nombrePrestamo, cuota) {
  // Aquí manipularías el DOM para mostrar el resultado de la simulación
  // Puedes crear elementos HTML dinámicamente y agregarlos al DOM
  // Por ejemplo:
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `<p>Para el préstamo "${nombrePrestamo}", la cuota mensual es: $${cuota}</p>`;
}

// Función principal para calcular el préstamo y mostrar el resultado
function calcularPrestamo() {
  cargarDatos()
    .then(data => {
      // Aquí obtendrías los datos simulados de los préstamos
      // Por ejemplo, data sería un array de objetos JSON con los préstamos

      // Obtener los valores ingresados por el usuario (puedes usar document.getElementById o querySelector)
      const monto = parseFloat(document.getElementById('montoInput').value);
      const plazo = parseInt(document.getElementById('plazoInput').value);
      const tipoPrestamo = document.getElementById('tipoPrestamoSelect').value;

      // Buscar el préstamo seleccionado en los datos cargados
      const prestamoSeleccionado = data.find(prestamo => prestamo.nombre === tipoPrestamo);

      if (prestamoSeleccionado) {
        const cuota = calcularCuota(monto, prestamoSeleccionado.tasa, plazo);
        mostrarResultado(prestamoSeleccionado.nombre, cuota);
      } else {
        alert('El préstamo seleccionado no existe en los datos.');
      }
    })
    .catch(error => console.error('Error al calcular el préstamo:', error));
}
