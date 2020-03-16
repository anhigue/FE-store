import { ClientInterface } from './ClientInterface';
import { ProductInterface } from './ProductInterface';
export interface SaleInterface {
  id?: number;
  date?: Date;
  total?: number;
  client?: ClientInterface;
  products?: ProductInterface[];
}

