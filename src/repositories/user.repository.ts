import { injectable } from "tsyringe";
import { User } from "../model/user.model";
import { Iuser, ProductsByUser } from "../interface/user.interface";
import { Sale } from "../model/sale.model";
import { Product } from "../model/product.model";

@injectable()
export class UserReppository {
  async getAll(): Promise<User[]> {
    return User.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  async createUser({ email, password }: Iuser): Promise<User> {
    return User.create({ email, password });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async deleteUser(id: number): Promise<void> {
    await User.destroy({ where: { id } });
  }

  async updateUser(id: number, user: Iuser): Promise<void> {
    await User.update(user, { where: { id } });
  }

  async getProductsByUser(id: number): Promise<ProductsByUser | null> {
    return User.findOne({
      where: { id },
      attributes: ["email"],
      include: [
        {
          model: Sale,
          as: "sales",
          required: true,
          attributes: ["id"],
          include: [
            {
              model: Product,
              as: "product",
              required: true,
              attributes: ["name", "price"],
            },
          ],
        },
      ],
    });
  }
}
