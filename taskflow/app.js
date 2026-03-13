// Variables
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const priority = document.getElementById("task-priority");
const searchInput = document.getElementById("search");

let tasks = [];

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
    if(taskText === "") return;

    const task = {
        text: taskText,
        priority: priority.value
    };

    createTask(task); // guarda automáticamente en tasks y storage
    input.value = "";
});

// Crear tarea en el DOM
function createTask(task, saveToStorage = true){
    const li = document.createElement("li");
    li.classList.add(task.priority);

    const span = document.createElement("span");
    span.textContent = task.text + " (" + task.priority + ")";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";

    editBtn.addEventListener("click", function(){

    const newText = prompt("Editar tarea:", task.text);

    if(newText && newText.trim() !== ""){
        task.text = newText.trim();
        span.textContent = task.text + " (" + task.priority + ")";
        saveTasks();
    }

});

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    deleteBtn.addEventListener("click", function(){
        li.remove();
        tasks = tasks.filter(t => t.text !== task.text);
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
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

    // Limpiar la lista
    taskList.innerHTML = "";

    // Filtrar tareas
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchTerm));

    // Renderizar tareas filtradas
    filteredTasks.forEach(task => createTask(task, false));
});