// Función para calcular el préstamo
function calcularPrestamo(monto, tasaInteres, plazo) {
    const cuota = monto * (tasaInteres / 100) / (1 - Math.pow(1 + tasaInteres / 100, -plazo));
    return cuota.toFixed(2);
  }
  
  // Obtener los datos del usuario
  let montoPrestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));
  let tasaInteresAnual = parseFloat(prompt("Ingrese la tasa de interés anual (%):"));
  let plazoPrestamo = parseInt(prompt("Ingrese el plazo del préstamo en meses:"));
  
  // Calcular la cuota mensual
  let cuotaMensual = calcularPrestamo(montoPrestamo, tasaInteresAnual, plazoPrestamo);
  
  // Imprimir el resultado
  console.log("La cuota mensual es: $" + cuotaMensual);
  
  // Solicitar confirmación para calcular una nueva cuota
  let calcularNuevaCuota = prompt("¿Desea calcular una nueva cuota? (S/N)").toUpperCase();
  
  // Ciclo para calcular nuevas cuotas
  while (calcularNuevaCuota === "S") {
    montoPrestamo = parseFloat(prompt("Ingrese el monto del préstamo:"));
    tasaInteresAnual = parseFloat(prompt("Ingrese la tasa de interés anual (%):"));
    plazoPrestamo = parseInt(prompt("Ingrese el plazo del préstamo en meses:"));
    
    cuotaMensual = calcularPrestamo(montoPrestamo, tasaInteresAnual, plazoPrestamo);
    console.log("La cuota mensual es: $" + cuotaMensual);
    
    calcularNuevaCuota = prompt("¿Desea calcular una nueva cuota? (S/N)").toUpperCase();
  }
  
  console.log("¡Gracias por usar la calculadora de préstamos!");
  