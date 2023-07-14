// Declaración de variables y objetos necesarios

const productos = []; // Array para almacenar los productos

// Objeto Producto
function Producto(nombre, categoria, precio) {
  this.nombre = nombre;
  this.categoria = categoria;
  this.precio = precio;
}

// Función para agregar un producto
function agregarProducto() {
  const nombre = prompt("Ingrese el nombre del producto:");
  const categoria = prompt("Ingrese la categoría del producto:");
  const precio = parseFloat(prompt("Ingrese el precio del producto:"));

  const producto = new Producto(nombre, categoria, precio);
  productos.push(producto);

  console.log("¡Producto agregado con éxito!");
}

// Función para buscar un producto por su nombre
function buscarProducto() {
  const nombre = prompt("Ingrese el nombre del producto a buscar:");
  
  const productoEncontrado = productos.find(producto => producto.nombre === nombre);

  if (productoEncontrado) {
    console.log("Producto encontrado:");
    console.log(productoEncontrado);
  } else {
    console.log("No se encontró ningún producto con ese nombre.");
  }
}

// Función para filtrar productos por categoría
function filtrarPorCategoria() {
  const categoria = prompt("Ingrese la categoría para filtrar los productos:");

  const productosFiltrados = productos.filter(producto => producto.categoria === categoria);

  if (productosFiltrados.length > 0) {
    console.log("Productos encontrados:");
    console.log(productosFiltrados);
  } else {
    console.log("No se encontraron productos en esa categoría.");
  }
}

// Ejecución del programa

console.log("Bienvenido al sistema de gestión de productos.");

let opcion;

do {
  opcion = parseInt(prompt(
    "Seleccione una opción:\n" +
    "1. Agregar un producto\n" +
    "2. Buscar un producto por nombre\n" +
    "3. Filtrar productos por categoría\n" +
    "4. Salir"
  ));

  switch (opcion) {
    case 1:
      agregarProducto();
      break;
    case 2:
      buscarProducto();
      break;
    case 3:
      filtrarPorCategoria();
      break;
    default:
      console.log("Opción inválida. Intente nuevamente.");
  }
} while (opcion !== 4);

console.log("¡Hasta luego!");