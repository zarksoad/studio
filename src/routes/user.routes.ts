import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", UserController.getAllUsers);
userRoutes.get("/:id", UserController.getUserById);
userRoutes.post("/", UserController.createUser);
userRoutes.delete("/:id", UserController.deleteUser);
userRoutes.put("/:id", UserController.updateUser);
userRoutes.get("/:id/products", UserController.getProductByUSer)



export default userRoutes;
