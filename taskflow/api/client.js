const BASE = 'https://taskflow-e7rn-faxe7rtso-sanae2026s-projects.vercel.app/api/v1/tasks';

export async function getTasks() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Error al obtener tareas');
  return res.json();
}

export async function createTask(titulo, prioridad) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, prioridad })
  });
  if (!res.ok) throw new Error('Error al crear tarea');
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(BASE + '/' + id, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar tarea');
}
