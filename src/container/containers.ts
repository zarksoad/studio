import { container } from "tsyringe";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { UserReppository } from "../repositories/user.repository";
import { AuthController } from "../controllers/auth.controller";
import { AuthServices } from "../services/auth.service";
import { ProductService } from "../services/product.service";
import { ProductController } from "../controllers/product.controller";
import { ProductRepository } from "../repositories/product.repository";
import { SaleService } from "../services/sales.service";
import { SalesRepository } from "../repositories/sales.repository";
import { SaleController } from "../controllers/sale.controller";

container.register(UserService, { useClass: UserService });
container.register(UserController, { useClass: UserController });
container.register(UserReppository, { useClass: UserReppository });

container.register(AuthController, { useClass: AuthController });
container.register(AuthServices, { useClass: AuthServices });

container.register(ProductService, { useClass: ProductService });
container.register(ProductController, { useClass: ProductController });
container.register(ProductRepository, { useClass: ProductRepository });

container.register(SaleService, { useClass: SaleService });
container.register(SaleController, { useClass: SaleController });
container.register(SalesRepository, { useClass: SalesRepository });
