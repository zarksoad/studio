import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import productRouter from "./product.routes";
import salesRouter from "./sale.routes";

const router = Router();

router.use('/users', userRoutes);
router.use('/login', authRoutes);
router.use('/products', productRouter);
router.use('/sales', salesRouter);


export default router;