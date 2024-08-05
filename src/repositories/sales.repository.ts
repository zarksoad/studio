import { injectable } from "tsyringe";
import { Sale } from "../model/sale.model";
import { ISale } from "../interface/sale.interface";

@injectable()
export class SalesRepository {
  async saveSales({ productId, description, userId }: ISale): Promise<Sale> {
    return await Sale.create({ productId, description, userId });
  }
}
