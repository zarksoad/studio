import "reflect-metadata";
import Express from "express";
import router from "./routes/Router";
import sequelize from "./config/db";
import { authMiddleware } from "./middlewares/auth.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import corsOptions from "./config/cors";
import cors from "cors";

const app = Express();

app.use(Express.json());
app.use(cors(corsOptions));
router.use(authMiddleware);
app.use("/api", router);
router.use(errorHandler);

const start = (): void => {
  try {
    sequelize.authenticate();
    console.log("Connected to the database");
    sequelize.sync();
    // sequelize.sync({force: true});
    // sequelize.sync({alter: true});
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    throw new Error("Error connecting to the database");
  }
};

start();
