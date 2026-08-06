<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Backend todo list
Proyecto creado con el framework de nestjs para el manejo de tareas con un CRUD implementando arquitectura hexagonal para separar la logica de negocio de los agentes externos como el orm de base de datos y http, se usa postgresql con la ayuda de docker para levantar una base de datos local

## 📦 Requerimientos

Instalaciones necesarias:

- Node.js (>= 18)
- NestJS
- Pnpm
- Nest.js
- Git
- Docker

## 🔧 Instalación

clonar repositorio:

```bash
git clone https://github.com/sebasGZA/backend-todo-list.git
cd backend-todo-list
pnpm install
```

## ⚙️ Variables de entorno

Crear un archivo .env y agrega las variables de entorno basadas .env.template

## 🐳 Docker 
Instalar docker https://docs.docker.com/engine/install
### Crear contenedor de base de datos
```bash
docker compose up -d
```

## ▶️ Correr el proyecto
```bash
pnpm run migration:run
pnpm run start:dev
```

## Swagger
http://localhost:3000/docs

## Explicación de la arquitectura:

Se implementó arquitectura hexagonal que esta basado en la inversión de dependencias y con el patrón de puerto/adaptadores para la separar por capas y la lógica de negoció de agentes externos

## Estructura de carpetas del backend

Gracias al framework de NestJS se maneja una estructura modular y se separa cada modulo por 3 carpetas principales como domain, application e infrastructure

## Funcionalidades implementadas (incluyendo puntos extra si aplica)
  1. Variables de entorno (.env) para configuración (puerto, URL base API)
  2. Tests unitarios
  3. Autenticación básica
  4. Documentación de API (SWAGGER)
  5. Persistencia de datos (base de datos relacional POSTGRESQL)
## Posibles mejoras futuras (qué harías diferente con más tiempo)

Mejoraria la manera en la que se esta generando la autenticación y autorización, pero para esto se requiere el manejo de usuarios para implementar una estrategia como JWT