import { SubInterface } from './SubInterface';
export interface ClientInterface {
  id?: number;
  name?: string;
  nit?: string;
  email?: string;
  phone?: string;
  image?: string;
  subscription?: SubInterface;
}
