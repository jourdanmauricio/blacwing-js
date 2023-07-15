// app.js

// Obtener elementos del DOM
const input = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const list = document.getElementById('taskList');

// Función para agregar una nueva tarea a la lista
function agregarTarea() {
  const tareaTexto = input.value.trim();

  if (tareaTexto !== '') {
    const elementoLista = document.createElement('li');
    elementoLista.textContent = tareaTexto;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => {
      list.removeChild(elementoLista);
      guardarTareasEnStorage(); // Actualizamos el almacenamiento local al eliminar una tarea
    });

    elementoLista.appendChild(botonEliminar);
    list.appendChild(elementoLista);
    input.value = '';
    guardarTareasEnStorage(); // Actualizamos el almacenamiento local al agregar una tarea
  }
}

// Agregar evento al botón para agregar tarea
addButton.addEventListener('click', agregarTarea);

// Función para cargar las tareas desde el almacenamiento local
function cargarTareasDesdeStorage() {
  const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareas.forEach(tarea => {
    const elementoLista = document.createElement('li');
    elementoLista.textContent = tarea;

    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.addEventListener('click', () => {
      list.removeChild(elementoLista);
      guardarTareasEnStorage(); // Actualizamos el almacenamiento local al eliminar una tarea
    });

    elementoLista.appendChild(botonEliminar);
    list.appendChild(elementoLista);
  });
}

// Función para guardar las tareas en el almacenamiento local
function guardarTareasEnStorage() {
  const tareas = Array.from(list.children).map(li => li.textContent);
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Cargar tareas desde el almacenamiento local al cargar la página
window.addEventListener('load', cargarTareasDesdeStorage);
