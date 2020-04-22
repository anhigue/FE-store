import { VehicleInterface } from './VehicleInterface';
import { FactoryInterface } from './FactoryInterface';
export interface ProductInterface {
  id?: number;
  name?: string;
  description?: string;
  partNo?: string;
  price?: number;
  stock?: number;
  vehicles?: VehicleInterface[];
  vehicleId?: number;
  fabricId: number;
  fabric?: FactoryInterface;
}
