import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.post('/', AuthController.login)


export default authRoutes;
