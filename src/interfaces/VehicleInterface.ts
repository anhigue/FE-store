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
  brandId?: number;
  lineId?: number;
  year?: number;
  brand?: BrandInterface;
  line?: LineInterface;
}
