import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
import { Sale } from "./sale.model";

@Table({
  tableName: "products",
  timestamps: true,
})
export class Product extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.DECIMAL(10, 2))
  price!: number;

  @AllowNull
  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.INTEGER)
  stock!: number;

  @HasMany(()=> Sale)
  sale!: Sale[];
}
