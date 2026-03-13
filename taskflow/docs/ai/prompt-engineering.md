# Prompt Engineering

Este documento recoge distintos prompts utilizados para trabajar
con inteligencia artificial durante el desarrollo del proyecto.

Se analizará qué tipos de prompts funcionan mejor para:

- generar código
- refactorizar funciones
- explicar errores
- documentar proyectos

# Prompt Engineering aplicado al desarrollo

En esta sección se experimentó con diferentes técnicas de prompt engineering para mejorar la calidad de las respuestas generadas por modelos de inteligencia artificial durante el desarrollo del proyecto.

## Prompt 1 – Definir un rol

**Prompt**

Actúa como un desarrollador senior de JavaScript. Revisa este código y sugiere mejoras en legibilidad, estructura y buenas prácticas.

**Por qué funciona**

Asignar un rol al modelo ayuda a que genere respuestas más especializadas y centradas en buenas prácticas profesionales.

---

## Prompt 2 – Refactorización de código

**Prompt**

Refactoriza esta función para mejorar su claridad y evitar código duplicado. Explica brevemente los cambios realizados.

**Por qué funciona**

El prompt define claramente el objetivo: refactorizar el código y explicar los cambios, lo que produce respuestas más estructuradas.

---

## Prompt 3 – Generación de documentación

**Prompt**

Genera comentarios JSDoc para la siguiente función de JavaScript.

**Por qué funciona**

Es un prompt específico que guía al modelo a producir documentación estándar utilizada en proyectos reales.

---

## Prompt 4 – Few-shot prompting

**Prompt**

Ejemplo de función documentada:

/**

* Suma dos números
  */
  function add(a,b){
  return a+b
  }

Ahora documenta esta función siguiendo el mismo estilo.

**Por qué funciona**

Mostrar un ejemplo previo ayuda al modelo a entender exactamente el formato esperado en la respuesta.

---

## Prompt 5 – Explicación paso a paso

**Prompt**

Explica paso a paso qué hace esta función JavaScript y cómo funciona cada parte del código.

**Por qué funciona**

Pedir razonamiento paso a paso produce explicaciones más detalladas y fáciles de entender.

---

## Prompt 6 – Restricciones claras

**Prompt**

Explica este código en menos de 5 líneas y usando lenguaje sencillo.

**Por qué funciona**

Las restricciones obligan al modelo a producir respuestas más concisas y centradas.

---

## Prompt 7 – Generación de mejoras

**Prompt**

Analiza este archivo JavaScript y sugiere tres mejoras relacionadas con rendimiento, legibilidad y mantenimiento.

**Por qué funciona**

El prompt define claramente las categorías de mejora que se esperan.

---

## Prompt 8 – Identificación de problemas

**Prompt**

Revisa este código y detecta posibles errores o malas prácticas.

**Por qué funciona**

Permite utilizar la IA como herramienta de revisión de código similar a un code review.

---

## Prompt 9 – Simplificación de código

**Prompt**

Simplifica esta función JavaScript manteniendo exactamente el mismo comportamiento.

**Por qué funciona**

Define una tarea clara con una restricción importante: no cambiar la funcionalidad.

---

## Prompt 10 – Generación de funciones

**Prompt**

Crea una función JavaScript que filtre tareas completadas de un array de objetos.

**Por qué funciona**

Es un prompt claro que especifica lenguaje, objetivo y contexto de uso.
