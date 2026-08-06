# web-todo-manager

Aplicación web para la gestión de tareas (Crear, Listar, Editar y Eliminar) utilizando frameworks de javascript como NestJS para la creación de un API y Angular para la creación de la web UI y utilizando PostgreSQL para la persistencia de los datos

## 📦 Requerimientos

Instalaciones necesarias:

- Git (>= v2.43.0)
- Node.js (>= v24.15.0)
- Nestjs (>= 11.0.24)
- Pnpm (>= 11.20.0)
- Docker (>= 29.5.1)
- Angular CLI (>= 22.0.4)

## 🔧 Instalación

Clonar repositorio base:
```bash
git clone https://github.com/sebasGZA/web-todo-manager.git
cd web-todo-manager
```

clonar repositorios de manera independiente:

```bash
git clone https://github.com/sebasGZA/backend-todo-list.git
cd backend-todo-list
pnpm install
```

```bash
git clone https://github.com/sebasGZA/frontend-todo-list.git
cd frontend-todo-list
pnpm install
```

## ⚙️ Variables de entorno

* Crear un archivo en el backend .env y agrega las variables de entorno basadas .env.template
* Crear en el frontend los archivos `environment.ts` y `environment.prod.ts` dentro de la carpeta `environments` basado en el archivo ``environment.template.ts y agrega las variables requeridas segun el entorno 

## 🐳 Docker 
Instalar docker https://docs.docker.com/engine/install
### Crear contenedor de base de datos

Dentro del proyecto de backend correr el siguiente comando
```bash
docker compose up -d
```

## ▶️ Correr el proyecto backend
```bash
pnpm run migration:run
pnpm run start:dev
```

## ▶️ Correr el proyecto frontend

```bash
ng serve
```

## Swagger
http://localhost:3000/docs

## Aplicación web
http://localhost:4200/

## Explicación de la arquitectura:

* Se implementó arquitectura hexagonal que esta basado en la inversión de dependencias y con el patrón de puerto/adaptadores para la separar por capas y la lógica de negoció de agentes externos

* Se implemento una estrategia de auth con token basico para agregar seguridad a las peticiones que se van a generar.

* Decidi utilizar scss y no un framework de diseño para no generar dependencias dentro de la aplicación. Igualmente los mensajes o alertas que se generan en la aplicación creando un componente propio y un servicio para la propagación de estas.

## Estructura de carpetas del backend

Gracias al framework de NestJS se maneja una estructura modular y se separa cada modulo por 3 carpetas principales como domain, application e infrastructure

## Estructura de carpetas del frontend

Se realizo una estructura simple en el manejo de carpetas separando el modelo, los servicios y los interceptores, utilizando la estrategia standalone debido a que es un proyecto pequeño.

## Funcionalidades implementadas (incluyendo puntos extra si aplica)
- Mensajes de confirmación antes de eliminar
- Mensajes de éxito/error amigables al usuario
- Variables de entorno (.env) para configuración (puerto, URL base API)
- Uso de modales para crear/editar tareas
- Tests unitarios (backend: controladores/servicios o frontend: componentes/servicios)
- Autenticación básica (mock token o simple validación en headers)
- UI/UX cuidada y responsive (CSS, Bootstrap, Tailwind, etc)
- Documentación de API con ejemplos (Swagger o comentarios detallados)
- Persistencia de datos (base de datos relacional, Firebase, etc)

## Posibles mejoras futuras (qué harías diferente con más tiempo)

Mejoraria la manera en la que se esta generando la autenticación y autorización, pero para esto se requiere el manejo de usuarios para implementar una estrategia como JWT