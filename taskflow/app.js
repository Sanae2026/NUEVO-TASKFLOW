// Variables del DOM
const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const priority = document.getElementById("task-priority");
const searchInput = document.getElementById("search");
const filterPriority = document.getElementById("filter-priority");
const filterStatus = document.getElementById("filter-status");
const sortAlpha = document.getElementById("sort-alpha");
const sortButton = document.getElementById("sort-tasks");
const completeAllBtn = document.getElementById("complete-all");
const deleteCompletedBtn = document.getElementById("delete-completed");

const statsTotal = document.getElementById("stats-total");
const statsPending = document.getElementById("stats-pending");
const statsCompleted = document.getElementById("stats-completed");

// Lista de tareas
let tasks = [];

// Guardar tareas en localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Actualizar estadísticas
function updateStats() {
    const total = tasks.length;
    const pending = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    statsTotal.textContent = "Total: " + total;
    statsPending.textContent = "Pendientes: " + pending;
    statsCompleted.textContent = "Completadas: " + completed;
}

// Cargar tareas desde localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => createTask(task, false));
        updateStats();
    }
}

document.addEventListener("DOMContentLoaded", loadTasks);

// Añadir nueva tarea
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    const task = {
        text,
        priority: priority.value,
        completed: false
    };

    createTask(task);
    taskInput.value = "";
});

// Crear tarea en el DOM
function createTask(task, saveToStorage = true) {
    const li = document.createElement("li");
    li.className = "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded shadow break-words";
    if (task.completed) li.classList.add("opacity-50");

    // Contenedor de texto y prioridad
    const container = document.createElement("div");
    container.className = "flex flex-col break-words";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "text-gray-800 dark:text-white font-medium break-words";

    const label = document.createElement("span");
    label.textContent = task.priority;

    let color = "";
    if (task.priority === "alta") color = "bg-red-500";
    if (task.priority === "media") color = "bg-yellow-400 text-black";
    if (task.priority === "baja") color = "bg-green-500";

    label.className = "text-xs text-white px-2 py-1 rounded w-fit mt-1 " + color;

    container.appendChild(span);
    container.appendChild(label);

    // Botones de acción
    const buttons = document.createElement("div");
    buttons.className = "flex gap-2 flex-wrap";

    // Botón completar
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.className = "bg-blue-500 text-white px-3 py-2 text-sm rounded hover:bg-blue-600";
    completeBtn.addEventListener("click", () => {
        task.completed = !task.completed;
        li.classList.toggle("opacity-50");
        saveTasks();
        updateStats();
    });

    // Botón editar
    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.className = "bg-yellow-500 text-white px-3 py-2 text-sm rounded hover:bg-yellow-600";
    editBtn.addEventListener("click", () => {
        const newText = prompt("Editar tarea:", task.text);
        if (newText && newText.trim() !== "") {
            task.text = newText.trim();
            span.textContent = task.text;
            saveTasks();
            updateStats();
        }
    });

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.className = "bg-red-500 text-white px-3 py-2 text-sm rounded hover:bg-red-600";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        tasks = tasks.filter(t => t !== task);
        saveTasks();
        updateStats();
    });

    buttons.appendChild(completeBtn);
    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);

    li.appendChild(container);
    li.appendChild(buttons);
    taskList.appendChild(li);

    if (saveToStorage) {
        tasks.push(task);
        saveTasks();
        updateStats();
    }
}

// Funciones de filtrado y orden
searchInput.addEventListener("input", applyFilters);
filterPriority.addEventListener("change", applyFilters);
filterStatus.addEventListener("change", applyFilters);
sortAlpha.addEventListener("change", applyFilters);

// Ordenar por prioridad
sortButton.addEventListener("click", () => {
    const order = { alta: 1, media: 2, baja: 3 };
    tasks.sort((a, b) => order[a.priority] - order[b.priority]);
    applyFilters();
});

// Marcar todas como completadas
completeAllBtn.addEventListener("click", () => {
    tasks.forEach(t => t.completed = true);
    saveTasks();
    applyFilters();
    updateStats();
});

// Borrar tareas completadas
deleteCompletedBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    applyFilters();
    updateStats();
});

// Aplicar filtros y orden alfabético
function applyFilters() {
    const term = searchInput.value.toLowerCase();
    const status = filterStatus.value;
    const prio = filterPriority.value;
    const alpha = sortAlpha.value;

    let filtered = tasks.filter(task => {
        let ok = true;
        if (term) ok = task.text.toLowerCase().includes(term);
        if (ok && status !== "all") ok = (status === "pending") ? !task.completed : task.completed;
        if (ok && prio !== "all") ok = task.priority === prio;
        return ok;
    });

    if (alpha === "asc") filtered.sort((a, b) => a.text.localeCompare(b.text));
    if (alpha === "desc") filtered.sort((a, b) => b.text.localeCompare(a.text));

    taskList.innerHTML = "";
    filtered.forEach(task => createTask(task, false));
    updateStats();
}