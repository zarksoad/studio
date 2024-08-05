import { Sequelize } from "sequelize-typescript";
import { User } from "../model/user.model";
import dotenv from "dotenv";
import { Product } from "../model/product.model";
import { Sale } from "../model/sale.model";

dotenv.config();

const sequelize: Sequelize = new Sequelize({
  host: process.env.HOST,
  username: "root",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: "mysql",
  models: [User, Product, Sale],
});

export default sequelize;
