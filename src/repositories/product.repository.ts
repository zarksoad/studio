import { injectable } from "tsyringe";
import { IProduct } from "../interface/product.interface";
import { Product } from "../model/product.model";


@injectable()
export class ProductRepository {
    async GetAll(): Promise<Product[]> {
        return await Product.findAll()
    };

    async findById(id: number): Promise<Product|null>{
        return await Product.findByPk(id);
    };

    async create({name, price, description, stock}: IProduct): Promise<Product>{
        return await Product.create({name, price, description, stock});
    };

    async updateProduct(id: number,{ name, price, description, stock }: IProduct): Promise<void> {
       await Product.update({ name, price, description, stock }, { where: { id } });
    };

    async deleteProduct(id: number): Promise<void> {
        await Product.destroy({ where: { id } });
    };

}