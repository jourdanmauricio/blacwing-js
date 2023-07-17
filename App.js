// app.js

// Obtener elementos del DOM
const input = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const list = document.getElementById('taskList');
let tasksList = [];

// Función para guardar las tareas en el almacenamiento local
function saveLocalStorage() {
  localStorage.setItem('tareas', JSON.stringify(tasksList));
}

// Función para elminar una tarea
function removeTask(taskId) {
  tasksList = tasksList.filter((task) => task.id !== parseInt(taskId));
  document.getElementById(taskId).remove();
  saveLocalStorage();
}

// Función para mostrar una tarea
function showTask(task) {
  const listItem = document.createElement('li');
  listItem.textContent = task.description;
  listItem.setAttribute('id', task.id);
  const delBtn = document.createElement('button');
  delBtn.textContent = 'Eliminar';
  delBtn.addEventListener('click', (e) => {
    const taskId = e.target.closest('li').id;
    removeTask(taskId);
  });
  listItem.appendChild(delBtn);
  list.appendChild(listItem);
}

// Función para agregar una tarea
function addTask() {
  const taskText = input.value.trim();

  let task = {
    id: new Date().getTime(),
    description: taskText,
  };
  tasksList.push(task);

  saveLocalStorage();

  showTask(task);
}

function loadLocalStorage() {
  const tasksList = JSON.parse(localStorage.getItem('tareas')) || [];
  tasksList.forEach((task) => showTask(task));
}

// Agregar evento al botón para agregar tarea
addButton.addEventListener('click', addTask);

// Cargar tareas desde el almacenamiento local al cargar la página
window.addEventListener('load', loadLocalStorage);
