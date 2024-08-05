import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Product } from "./product.model";
import { User } from "./user.model";

@Table({
  tableName: "sales",
  timestamps: true,
})
export class Sale extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  productId!: number;
  @BelongsTo(() => Product)
  product!: Product;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;
  @BelongsTo(() => User)
  user!: User;

  @Column(DataType.STRING)
  description!: string;
}
