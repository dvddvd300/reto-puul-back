
## Description

Este proyecto es un ejemplo de una api rest con nestjs, en el cual se pueden crear usuarios, tareas y asignar tareas a usuarios, ademas de poder ver las tareas asignadas a un usuario en especifico.

## Project setup

ocupamos para iniciar el proyecto una base de datos en este caso postgresql, y instalar las dependencias de node

```bash
$ npm install
```

- usuarios
```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) UNIQUE NOT NULL,
    rol VARCHAR(50) CHECK (rol IN ('miembro', 'administrador')) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- tareas
```sql
CREATE TABLE tareas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    estimacion_horas INTEGER CHECK (estimacion_horas >= 0),
    fecha_vencimiento TIMESTAMP,
    estado VARCHAR(50) CHECK (estado IN ('activa', 'terminada')) NOT NULL,
    costo NUMERIC(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- asignaciones_usuarios_tareas
```sql
CREATE TABLE asignaciones_usuarios_tareas (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
    tarea_id INT REFERENCES tareas(id) ON DELETE CASCADE
);
```

la configuracion del orm esta en el archivo src\app.module.ts

## Arrancar el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
