import { VehicleInterface } from './VehicleInterface';
export interface ProductInterface {
  id?: number;
  name?: string;
  description?: string;
  partNo?: string;
  price?: number;
  stock?: number;
  vehicles?: VehicleInterface[];
  vehicleId?: number;
}
