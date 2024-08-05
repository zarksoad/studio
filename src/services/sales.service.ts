import { inject, injectable } from "tsyringe";
import { SalesRepository } from "../repositories/sales.repository";
import { ISale } from "../interface/sale.interface";
import { Sale } from "../model/sale.model";

@injectable()

export class SaleService {
    constructor(@inject(SalesRepository) private saleRepository: SalesRepository){};

    async createSale(saleData: ISale): Promise<Sale> {
        return await this.saleRepository.saveSales(saleData);
    };
};