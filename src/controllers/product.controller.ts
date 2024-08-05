import { Request, Response } from "express";
import { container, injectable } from "tsyringe";
import { ProductService } from "../services/product.service";

@injectable()
export class ProductController {

    static async getAllProducts(_: Request, res:Response){
        try {
            const productService = container.resolve(ProductService);
            const products = await productService.getAllProducts();
            res.status(200).json({
                status: 200,
                data: products,
                message: "Products retrieved successfully."
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "An error occurred while retrieving products."
            })
        }
    };

    static async saveProduct(req: Request, res: Response){
        try {
            const productService = container.resolve(ProductService);
            const product = await productService.createProduct(req.body);
            res.status(201).json({
                status: 201,
                data: product,
                message: "Product created successfully."
            });
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: "An error occurred while creating product."
            });
            throw new Error('Error in SaveProuct');
        }
    };
}