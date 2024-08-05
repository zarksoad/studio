# Paso a paso para iniciar un proyecto Node con TypeScript para una API RESTful

## Página de http cats

https://http.cat/

## Crear el proyecto

1. Crear el directorio del proyecto

```bash
mkdir my-project
cd my-project
```

2. Inicializar el proyecto con npm

```bash
npm init -y
```

3. Instalar TypeScript y otras dependencias necesarias

```bash
npm install typescript ts-node @types/node --save-dev
npm install express @types/express
npm install nodemon --save-dev
npm install mysql2
npm install sequelize
npm install sequelize-typescript
npm install @types/sequelize
npm install dotenv
npm install tsyringe
npm install jsonwebtoken
npm install @types/jsonwebtoken
npm install cors
npm install @types/cors
npm install csv-writter
```

4. Inicializar TypeScript

```bash
npx tsc --init
```

5. Editar el archivo `tsconfig.json` para configurar TypeScript

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

6. Crear la estructura de directorios

```bash
mkdir src
mkdir src/controllers
mkdir src/models
mkdir src/repositories
mkdir src/data-access
mkdir src/routes
mkdir src/interfaces
mkdir src/config
mkdir src/containers
touch src/index.ts
touch .env
```

7. Configurar Nodemon para facilitar el desarrollo
   Crear un archivo `nodemon.json` en la raíz del proyecto con el siguiente contenido:

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}
```

Agregar un script en el `package.json` para iniciar el servidor con Nodemon:

```json
"scripts": {
  "start": "nodemon"
}
```

### Crear el archivo de configuración de variables de entorno `.env`. (Esto es solo si no se utiliza ORM, puesto que sequelize por ejemplo permite agregar estas configuraciones en el db.ts directamente)

```dotenv
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=mydatabase
PORT=3000
```

### Crear el acceso a datos y el pool de conexiones (Esto es solo si no se utiliza ORM, puesto que sequelize por ejemplo permite agregar estas configuraciones en el db.ts directamente)

En `src/config`, crear un archivo `db.ts`:

```typescript
import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
```

### Crear las interfaces

En `src/interfaces`, crear un archivo `user.ts`:

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
}
```

### Crear el controlador

En `src/controllers`, crear un archivo `userController.ts`:

```typescript
import { Request, Response } from "express";
import { User } from "../interfaces/User";
import pool from "../data-access/db";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const createUser = async (req: Request, res: Response) => {
  const newUser: User = req.body;
  try {
    const [result] = await pool.query("INSERT INTO users SET ?", [newUser]);
    res.status(201).json({ id: (result as any).insertId, ...newUser });
  } catch (error) {
    res.status(500).send("Server error");
  }
};
```

### Crear el enrutador

En `src/routes`, crear un archivo `userRoutes.ts`:

```typescript
import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
} from "../controllers/userController";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);

export default router;
```

En `src/routes`, crear un archivo `Router.ts`:

```typescript
import { Router } from "express";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/users", userRoutes);

export default router;
```

### Configurar la vista principal (el archivo `index.ts`)

En `src/index.ts`:

```typescript
import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/Router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

### Compilar y ejecutar el proyecto

Compilar el proyecto

```bash
npx tsc
```

Iniciar el servidor con Nodemon

```bash
npm start
```

Con estas mejoras, el proyecto ahora utiliza variables de entorno, tiene una estructura de carpetas organizada con las interfaces separadas, usa un pool de conexiones con MySQL2 y configura las rutas de manera modular.

lista de errores :

Errores Comunes en Aplicaciones con TypeScript

1. Errores de Configuración
   Configuración Incorrecta de TypeScript

Problema: TypeScript puede no compilar correctamente si el archivo tsconfig.json no está bien configurado.
Solución: Asegúrate de que tu archivo tsconfig.json esté configurado correctamente para incluir todas las carpetas y archivos necesarios.
Errores en la Configuración de nodemon

Problema: nodemon puede no observar los archivos correctos o no reiniciar el servidor.
Solución: Verifica que nodemon esté configurado adecuadamente en el archivo nodemon.json o en el script de package.json. 2. Errores en el Código
Errores de Tipado

Problema: Asignar un valor de tipo incorrecto a una variable.
Ejemplo:
typescript
Copy code
let numero: number = "string"; // Error: Type 'string' is not assignable to type 'number'
Solución:
typescript
Copy code
let numero: number = 123; // Correcto
Problemas con Decoradores

Problema: Los decoradores no están configurados o importados correctamente.
Ejemplo:
typescript
Copy code
@injectable
class Servicio {
// ...
}
Solución:
typescript
Copy code
import { injectable } from 'tsyringe';

@injectable()
class Servicio {
// ...
}
Errores en la Inyección de Dependencias

Problema: Dependencias no registradas o no inyectadas correctamente.
Solución: Asegúrate de registrar todas las dependencias en el contenedor tsyringe y de inyectarlas correctamente en los controladores y repositorios. 3. Errores de Rutas y Middleware
Rutas No Encontradas

Problema: Las rutas no están definidas o el enrutador no está configurado correctamente.
Solución: Revisa las definiciones de las rutas y asegúrate de que el Router esté correctamente configurado.
Problemas con el Middleware

Problema: Middleware como cors no está configurado adecuadamente.
Solución: Configura el middleware correctamente para manejar todas las rutas necesarias y verifica que esté aplicado globalmente si es necesario. 4. Problemas de Conexión y Base de Datos
Errores de Conexión con la Base de Datos

Problema: La configuración de conexión a la base de datos es incorrecta o la base de datos no está disponible.
Solución: Verifica los parámetros de conexión y asegúrate de que la base de datos esté en funcionamiento.
Problemas con Consultas

Problema: Consultas mal construidas o manejo incorrecto de errores.
Solución: Revisa y prueba las consultas para asegurarte de que sean correctas y maneja los errores adecuadamente. 5. Problemas de Construcción y Ejecución
Errores en la Transpilación

Problema: Los archivos TypeScript no se transpilan a JavaScript correctamente.
Solución: Verifica la configuración de tsc y asegúrate de que no haya errores de compilación.
Problemas con la Ejecución de Scripts

Problema: Los scripts de inicio en package.json no se ejecutan correctamente.
Solución: Asegúrate de que todos los scripts estén correctamente definidos y funcionen como se espera. 6. Errores de Seguridad
Falta de Sanitización de Entradas

Problema: Las entradas del usuario no están validadas ni saneadas.
Solución: Implementa validación y saneamiento de entradas para prevenir ataques de inyección.
Errores en la Configuración de CORS

Problema: La configuración de CORS permite orígenes no deseados.
Solución: Configura CORS para permitir solo los orígenes autorizados. 7. Problemas de Dependencias
Versiones Incompatibles

Problema: Las versiones de las dependencias pueden ser incompatibles entre sí.
Solución: Verifica que las versiones de tus dependencias sean compatibles y actualiza si es necesario.
Dependencias Faltantes

Problema: Falta alguna dependencia necesaria.
Solución: Asegúrate de que todas las dependencias estén instaladas y correctamente incluidas en tu proyecto. 8. Errores en el Uso de Clases
Errores en la Herencia

Problema: Problemas con la herencia de clases y sus métodos.
Solución: Revisa la definición de clases y la herencia para asegurarte de que se maneje correctamente.
Instanciación Incorrecta

Problema: Las instancias de las clases no se crean correctamente.
Solución: Asegúrate de que las clases se instancien correctamente y se utilicen según lo previsto. 9. Errores en Pruebas
Fallas en Pruebas Unitarias

Problema: Las pruebas unitarias no cubren todos los casos posibles o fallan.
Solución: Asegúrate de que las pruebas unitarias estén completas y cubran todos los escenarios relevantes.
Errores en la Configuración del Entorno de Pruebas

Problema: El entorno de pruebas no está configurado correctamente.
Solución: Verifica la configuración del entorno de pruebas y asegúrate de que simule correctamente las condiciones reales.
