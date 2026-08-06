# FrontendTodoList

Proyecto Web para la gestión de tareas usando Angular CLI v22.0.4

## 📦 Requerimientos

- Git (>= v2.43.0)
- Node.js (>= v24.15.0)
- pnpm (>= 11.20.0)
- Angular CLI (>= 22.0.4)

## 🔧 Instalación

Clonar repositorio:

```bash
git clone https://github.com/sebasGZA/frontend-todo-list.git
cd frontend-todo-list
pnpm install
```

## ⚙️ Variables de entorno

Crear los archivos `environment.ts` y `environment.prod.ts` dentro de la carpeta `environments` basado en el archivo ``environment.template.ts y agrega las variables requeridas segun el entorno 

## ▶️ Correr el proyecto

```bash
ng serve
```

Una vez el proyecto está corriendo, abre cualquier navegador web e ingresa al link `http://localhost:4200/`.

## Explicación de la arquitectura:
* Se realizo una estructura simple en el manejo de carpetas, pero utilizando la estrategia standalone y separación de pagina por componentes debido a que es un proyecto pequeño.

* Se implemento una estrategia de auth con token basico para agregar seguridad a las peticiones que se van a generar.

* Decidi utilizar scss y no un framework de diseño para no generar dependencias dentro de la aplicación. Igualmente los mensajes o alertas que se generan en la aplicación creando un componente propio y un servicio para la propagación de estas.