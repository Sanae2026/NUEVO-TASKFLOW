// Variables
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const priority = document.getElementById("task-priority");
const searchInput = document.getElementById("search");

let tasks = [];

// Helpers
function isDuplicateTask(text) {
    const normalizedText = text.toLowerCase();
    return tasks.some(task => task.text.toLowerCase() === normalizedText);
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(taskArray){
    taskList.innerHTML = "";

    taskArray.forEach(task => {
        createTask(task, false);
    });
}
// Cargar tareas guardadas al iniciar
function loadTasks(){
    const savedTasks = localStorage.getItem("tasks");

    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => createTask(task, false)); // false: no duplicar en storage
    }
}
document.addEventListener("DOMContentLoaded", loadTasks);

// Añadir tarea
form.addEventListener("submit", function(e){
    e.preventDefault();

    const taskText = taskInput.value.trim();
    const priorityValue = priority.value;

    // Validaciones básicas
    if(taskText === ""){
        alert("Por favor, ingresa una tarea.");
        taskInput.focus();
        return;
    }

    if(taskText.length < 3){
        alert("La tarea debe tener al menos 3 caracteres.");
        taskInput.focus();
        return;
    }

    if(!priorityValue){
        alert("Por favor, selecciona una prioridad.");
        priority.focus();
        return;
    }

    if(isDuplicateTask(taskText)){
        alert("Esta tarea ya existe.");
        taskInput.focus();
        return;
    }

    const task = {
        text: taskText,
        priority: priorityValue
    };

    createTask(task); // guarda automáticamente en tasks y storage
    form.reset();
    taskInput.focus();
});

// Crear tarea en el DOM
function createTask(task, saveToStorage = true){
    const li = document.createElement("li");
    li.classList.add(task.priority);

    const span = document.createElement("span");
    span.textContent = task.text + " (" + task.priority + ")";

    const checkbox = document.createElement("input");
checkbox.type = "checkbox";

checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
        span.style.textDecoration = "line-through";
    } else {
        span.style.textDecoration = "none";
    }
});

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    deleteBtn.addEventListener("click", function(){
        li.remove();
        tasks = tasks.filter(t => t.text !== task.text);
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    taskList.appendChild(li);

    if(saveToStorage){
        tasks.push(task);
        saveTasks();
    }
}

// Búsqueda de tareas
searchInput.addEventListener("input", function() {
    const searchTerm = searchInput.value.trim().toLowerCase();



    // Filtrar tareas
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchTerm));

    renderTasks(filteredTasks);

   
});

// function that filters completed tasks from an array

/**
 * Filters completed tasks from an array.
 * A completed task is identified by the property 'completed' set to true.
 *
 * @param {Array} taskArray - Array of task objects.
 * @returns {Array} Array of completed task objects.
 */
function filterCompletedTasks(taskArray) {
    return taskArray.filter(task => task.completed === true);
}