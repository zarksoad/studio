export interface Iuser {
  email: string;
  password: string;
}


interface IProductDetails {
    name: string;
    price: number;
  }
interface ISaleDetails {
  id: number;
  product: IProductDetails;
}

export interface ProductsByUser {
  email: string;
  sales: ISaleDetails[];
}

// Define la interfaz para la estructura del producto
