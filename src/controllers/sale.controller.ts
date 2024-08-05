import { container, injectable } from "tsyringe";
import { Sale } from "../model/sale.model";
import { SaleService } from "../services/sales.service";
import { Request, Response } from "express";


@injectable()
export class SaleController {

    static async saveSale(req: Request, res: Response){
       try {
        const sale = req.body
        const saleService = container.resolve(SaleService);
        const newSale = await saleService.createSale(sale);
        res.status(201).json({
            status: 201,
            data: newSale,
            message: "Sale saved successfully."
        });
       } catch (error) {
        if(error instanceof Error){
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
       }
    };
};