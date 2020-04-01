import { StateInterface } from './StateInterface';
import { ClientInterface } from './ClientInterface';
import { ProductInterface } from './ProductInterface';
import { FactoryInterface } from './FactoryInterface';

/* interface to order */
export interface OrderProductInterface {
  id?: number;
  stockOrder?: number;
  productId?: number;
  product?: ProductInterface;
}

/* interface to order */
export interface OrderInterface {
  id?: number;
  factoryId?: number;
  statusId?: number;
  timeCreate?: Date;
  status?: StateInterface;
  factory?: FactoryInterface;
  product?: OrderProductInterface[];
}

/* interface to sale */
export interface SaleProductInterface {
  id?: number;
  productId?: number;
  orderId?: number;
  priceSale?: number;
  stockSale?: number;
  product?: ProductInterface;
}

/* interface to sale */
export interface SaleInterface {
  id?: number;
  date?: Date;
  total?: number;
  clientId?: number;
  statusId?: number;
  orderId?: number;
  status?: StateInterface;
  client?: ClientInterface;
  productOrder?: SaleProductInterface[];
  order?: OrderInterface;
}

