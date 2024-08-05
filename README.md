Paso a Paso para Iniciar un Proyecto Node con TypeScript para una API RESTful
Página de http cats
https://http.cat/

Crear el Proyecto
Crear el Directorio del Proyecto

bash
Copy code
mkdir my-project
cd my-project
Inicializar el Proyecto con npm

bash
Copy code
npm init -y
Instalar Dependencias

bash
Copy code
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
npm install csv-writer
Inicializar TypeScript

bash
Copy code
npx tsc --init
Configurar tsconfig.json

json
Copy code
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
Crear la Estructura de Directorios

bash
Copy code
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
Configurar Nodemon
Crear un archivo nodemon.json en la raíz del proyecto con el siguiente contenido:

json
Copy code
{
"watch": ["src"],
"ext": "ts",
"exec": "ts-node src/index.ts"
}
Agregar un script en el package.json:

json
Copy code
"scripts": {
"start": "nodemon"
}
Crear el Archivo de Configuración de Variables de Entorno .env
(Solo si no se utiliza ORM; por ejemplo, Sequelize permite agregar estas configuraciones en el archivo db.ts directamente)
dotenv DB_HOST=localhost DB_USER=root DB_PASSWORD=password DB_NAME=mydatabase PORT=3000

Crear el Acceso a Datos y el Pool de Conexiones
(Solo si no se utiliza ORM; por ejemplo, Sequelize permite agregar estas configuraciones en el archivo db.ts directamente)
En src/config, crear un archivo db.ts:

```typescript
import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

php
Copy code
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

Crear las Interfaces
En src/interfaces, crear un archivo user.ts:
typescript export interface User { id: number; name: string; email: string; }

Crear el Controlador
En src/controllers, crear un archivo userController.ts:

```typescript
import { Request, Response } from "express";
import { User } from "../interfaces/User";
import pool from "../data-access/db";

typescript
Copy code
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

Crear el Enrutador
En src/routes, crear un archivo userRoutes.ts:

```typescript
import { Router } from "express";
import {
getUsers,
getUserById,
createUser,
} from "../controllers/userController";

csharp
Copy code
const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);

export default router;
```

En src/routes, crear un archivo Router.ts:

```typescript
import { Router } from "express";
import userRoutes from "./userRoutes";

javascript
Copy code
const router = Router();

router.use("/users", userRoutes);

export default router;
```

Configurar la Vista Principal (Archivo index.ts)
En src/index.ts:

```typescript
import express from "express";
import dotenv from "dotenv";
import mainRouter from "./routes/Router";

arduino
Copy code
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

Compilar y Ejecutar el Proyecto
Compilar el Proyecto
bash npx tsc

Iniciar el Servidor con Nodemon
bash npm start

Lista de Errores Comunes en Aplicaciones con TypeScript
Errores de Configuración

Configuración Incorrecta de TypeScript
Problema: TypeScript puede no compilar correctamente si el archivo tsconfig.json no está bien configurado.
Solución: Asegúrate de que tu archivo tsconfig.json esté configurado correctamente para incluir todas las carpetas y archivos necesarios.
Errores en la Configuración de Nodemon
Problema: Nodemon puede no observar los archivos correctos o no reiniciar el servidor.
Solución: Verifica que Nodemon esté configurado adecuadamente en el archivo nodemon.json o en el script de package.json.
Errores en el Código

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
Solución: Asegúrate de registrar todas las dependencias en el contenedor tsyringe y de inyectarlas correctamente en los controladores y repositorios.
Errores de Rutas y Middleware

Rutas No Encontradas
Problema: Las rutas no están definidas o el enrutador no está configurado correctamente.
Solución: Revisa las definiciones de las rutas y asegúrate de que el Router esté correctamente configurado.
Problemas con el Middleware
Problema: Middleware como cors no está configurado adecuadamente.
Solución: Configura el middleware correctamente para manejar todas las rutas necesarias y verifica que esté aplicado globalmente si es necesario.
Problemas de Conexión y Base de Datos

Errores de Conexión con la Base de Datos
Problema: No se puede conectar a la base de datos debido a configuraciones incorrectas.
Solución: Verifica las credenciales de la base de datos y la configuración en el archivo de entorno .env.
Errores en Consultas SQL
Problema: Consultas SQL mal formadas o errores en la ejecución de las consultas.
Solución: Asegúrate de que las consultas SQL sean correctas y prueba las consultas en una herramienta de administración de base de datos.

Posible problema de git : git config --global core.autocrlf true
