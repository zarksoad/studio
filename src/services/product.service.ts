import { inject, injectable } from "tsyringe";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../model/product.model";
import { IProduct } from "../interface/product.interface";

@injectable()
export class ProductService {
    constructor(@inject(ProductRepository) private productRepository:ProductRepository) {
        
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.GetAll();
    };

    async getProductById(id: number): Promise<Product | null> {
        return this.productRepository.findById(id);
    };

    async createProduct({name, price, description, stock}: IProduct): Promise<Product> {
        return this.productRepository.create({name, price, description, stock});
    };

    async updateProduct(id: number, {name, price, description, stock}: IProduct): Promise<void> {
        await this.productRepository.updateProduct(id, {name, price, description, stock});
    };

    async deleteProduct(id: number): Promise<void> {
        await this.productRepository.deleteProduct(id);
    };
};