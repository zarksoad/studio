import { Router } from "express";
import { ProductController } from "../controllers/product.controller";


const productRouter = Router();

productRouter.get('/', ProductController.getAllProducts);
productRouter.post('/', ProductController.saveProduct);

export default productRouter;

