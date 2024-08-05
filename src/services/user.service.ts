import { inject, injectable } from "tsyringe";
import { UserReppository } from "../repositories/user.repository";
import { User } from "../model/user.model";
import { Iuser, ProductsByUser } from "../interface/user.interface";

@injectable()
export class UserService {
  constructor(
    @inject(UserReppository) private userReppository: UserReppository
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userReppository.getAll();
  };

  async getUserById(id: number): Promise<User | null> {
    return await this.userReppository.getUserById(id);
  };

  async createUser({ email, password }: Iuser): Promise<User> {
    return await this.userReppository.createUser({email, password});
  };

  async findByEmail(email:string): Promise<User | null> {
    return await this.userReppository.getUserByEmail(email);
  };

  async deleteUser (id: number): Promise<void> {
    return await this.userReppository.deleteUser(id)
  };

  async updateUser (id: number, user: Iuser): Promise<void> {
    return await this.userReppository.updateUser(id, user)
  };

  async getProductsByUser(id: number): Promise<ProductsByUser | null> {
    console.log(typeof(this.userReppository.getProductsByUser(id)));
    return await this.userReppository.getProductsByUser(id);
  };
}
