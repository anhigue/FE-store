import { SaleInterface } from './SaleInterface';
export interface BillInterface {
  id?: number;
  date?: Date;
  total?: number;
  discount?: number;
  client?: any;
  sales?: SaleInterface;
}
