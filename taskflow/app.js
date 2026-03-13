// Variables
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const priority = document.getElementById("task-priority");
const searchInput = document.getElementById("search");
const filterPriority = document.getElementById("filter-priority");
const sortButton = document.getElementById("sort-tasks");

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

// Cargar tareas guardadas
function loadTasks(){
    const savedTasks = localStorage.getItem("tasks");

    if(savedTasks){
        tasks = JSON.parse(savedTasks);
        renderTasks(tasks);
    }
}

document.addEventListener("DOMContentLoaded", loadTasks);

// Añadir tarea
form.addEventListener("submit", function(e){

    e.preventDefault();

    const taskText = taskInput.value.trim();
    const priorityValue = priority.value;

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
        alert("Selecciona una prioridad.");
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

    createTask(task);
    form.reset();
    taskInput.focus();

});

// Crear tarea
function createTask(task, saveToStorage = true){

    const li = document.createElement("li");
    li.classList.add(task.priority);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = task.text + " (" + task.priority + ")";

    checkbox.addEventListener("change", function(){

        if(checkbox.checked){
            span.style.textDecoration = "line-through";
        }else{
            span.style.textDecoration = "none";
        }

    });

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

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    if(saveToStorage){
        tasks.push(task);
        saveTasks();
    }

}

// Búsqueda
searchInput.addEventListener("input", function(){

    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(searchTerm)
    );

    renderTasks(filteredTasks);

});

// Filtrar por prioridad
filterPriority.addEventListener("change", function(){

    const value = filterPriority.value;

    if(value === "all"){
        renderTasks(tasks);
    }else{
        const filtered = tasks.filter(task => task.priority === value);
        renderTasks(filtered);
    }

});

// Ordenar por prioridad
sortButton.addEventListener("click", function(){

    const order = {
        alta: 1,
        media: 2,
        baja: 3
    };

    tasks.sort((a,b) => order[a.priority] - order[b.priority]);

    renderTasks(tasks);

});

// Filtrar tareas completadas

/**
 * Filters completed tasks from an array
 * @param {Array} taskArray
 * @returns {Array}
 */
function filterCompletedTasks(taskArray){
    return taskArray.filter(task => task.completed === true);
}