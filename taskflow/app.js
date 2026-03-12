// Variables
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const priority = document.getElementById("task-priority");
const searchInput = document.getElementById("search");

let tasks = [];

// Helpers
function isDuplicateTask(text) {
    const normalizedText = text.toLowerCase();
    return tasks.some(task => task.text.toLowerCase() === normalizedText);
}

// Cargar tareas guardadas al iniciar
document.addEventListener("DOMContentLoaded", function() {
    const savedTasks = localStorage.getItem("tasks");

    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => createTask(task, false)); // false: no duplicar en storage
    }
});

// Añadir tarea
form.addEventListener("submit", function(e){
    e.preventDefault();

    const taskText = input.value.trim();
    const priorityValue = priority.value;

    // Validaciones básicas
    if(taskText === ""){
        alert("Por favor, ingresa una tarea.");
        input.focus();
        return;
    }

    if(taskText.length < 3){
        alert("La tarea debe tener al menos 3 caracteres.");
        input.focus();
        return;
    }

    if(!priorityValue){
        alert("Por favor, selecciona una prioridad.");
        priority.focus();
        return;
    }

    if(isDuplicateTask(taskText)){
        alert("Esta tarea ya existe.");
        input.focus();
        return;
    }

    const task = {
        text: taskText,
        priority: priorityValue
    };

    createTask(task); // guarda automáticamente en tasks y storage
    form.reset();
    input.focus();
});

// Crear tarea en el DOM
function createTask(task, saveToStorage = true){
    const li = document.createElement("li");
    li.classList.add(task.priority);

    const span = document.createElement("span");
    span.textContent = task.text + " (" + task.priority + ")";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    deleteBtn.addEventListener("click", function(){
        li.remove();
        tasks = tasks.filter(t => t.text !== task.text);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    if(saveToStorage){
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

// Búsqueda de tareas
searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    // Limpiar la lista
    taskList.innerHTML = "";

    // Filtrar tareas
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchTerm));

    // Renderizar tareas filtradas
    filteredTasks.forEach(task => createTask(task, false));
});

// function that filters completed tasks from an array

