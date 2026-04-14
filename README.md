# TaskFlow

## Descripcion

Aplicacion de gestion de tareas con frontend en HTML/CSS/JS y backend en Node.js con Express.

## Arquitectura de carpetas

taskflow/
+-- index.html          Frontend principal
+-- style.css           Estilos
+-- api/
¦   +-- client.js       Capa de red del frontend
+-- docs/
¦   +-- backend-api.md  Documentacion de herramientas
+-- server/
    +-- .env                Variables de entorno
    +-- package.json
    +-- src/
        +-- index.js        Punto de entrada del servidor
        +-- config/
        ¦   +-- env.js      Validacion de variables de entorno
        +-- routes/
        ¦   +-- task.routes.js
        +-- controllers/
        ¦   +-- task.controller.js
        +-- services/
            +-- task.service.js

## Como arrancar el proyecto

### Backend

cd server
npm install
npm run dev

El servidor arranca en http://localhost:3000

### Frontend

Abrir index.html con Live Server en VSCode.

## Middlewares

- cors(): Permite que el frontend en un puerto distinto consuma la API sin que el navegador lo bloquee.
- express.json(): Transforma el body de las peticiones HTTP de texto crudo a objeto JavaScript accesible en req.body.
- loggerAcademico: Middleware personalizado que registra en consola el metodo, la ruta, el codigo de respuesta y el tiempo de procesamiento de cada peticion.
- Error handler global: Middleware de 4 parametros que captura todos los errores no controlados. Devuelve 404 si la tarea no existe y 500 para cualquier otro error inesperado.

## Endpoints de la API

### GET /api/v1/tasks
Obtiene todas las tareas.

Respuesta 200:
[
  { id: 1, titulo: 'Estudiar Node', prioridad: 'alta', completada: false }
]

### POST /api/v1/tasks
Crea una nueva tarea.

Body:
{ titulo: 'Estudiar Node', prioridad: 'alta' }

Respuesta 201:
{ id: 1, titulo: 'Estudiar Node', prioridad: 'alta', completada: false }

Respuesta 400 (titulo menor de 3 caracteres):
{ error: 'El titulo debe tener al menos 3 caracteres.' }

### DELETE /api/v1/tasks/:id
Elimina una tarea por ID.

Respuesta 204: sin body
Respuesta 404 (ID no existe):
{ error: 'Tarea no encontrada.' }
