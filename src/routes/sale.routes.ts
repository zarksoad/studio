import { Router } from "express";
import { SaleController } from "../controllers/sale.controller";


const salesRouter = Router();

salesRouter.post('/', SaleController.saveSale);

export default salesRouter;