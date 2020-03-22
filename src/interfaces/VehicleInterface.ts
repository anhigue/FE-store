export interface BrandInterface {
  id?: number;
  name?: string;
}

export interface LineInterface {
  id?: number;
  name?: string;
}

export interface VehicleInterface {
  universalCode?: string;
  brand?: string;
  line?: string;
  year?: number;
}
