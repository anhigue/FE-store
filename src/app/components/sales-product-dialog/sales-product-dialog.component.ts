import { VehicleInterface } from './../../../interfaces/VehicleInterface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductInterface } from '../../../interfaces/ProductInterface';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product/product.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sales-product-dialog',
  templateUrl: './sales-product-dialog.component.html',
  styleUrls: ['./sales-product-dialog.component.scss'],
})
export class SalesProductDialogComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'partNo',
    'price',
    'stock',
    'options',
  ];
  products: ProductInterface[] = [];
  productsFabric: ProductInterface[] = [];
  dataSource: MatTableDataSource<ProductInterface>;
  dataSourceFabric: MatTableDataSource<ProductInterface>;
  cars = ELEMENT_DATA_VEHICLES;

  vehicleSelected: VehicleInterface;
  partsFound: ProductInterface[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _PRODUCT_SERVICE: ProductService
  ) {}

  ngOnInit() {
    this.getProduct();
    this.getProductFabric();
  }

  private getProduct(): void {
    try {
      /* descomenta estas lineas cuando termines de agregar las rutas */
      this._PRODUCT_SERVICE
        .readProduct()
        .subscribe((value: ProductInterface[]) => {
          if (value) {
            this.products = value;
            this.dataSource = new MatTableDataSource<ProductInterface>(
              this.products
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        });
      this.products.push({
        id: 1,
        name: 'Bujia',
        price: 200,
        stock: 40,
        vehicles: [
          {
            universalCode: 'AADDS',
            brand: {
              id: 1,
              name: 'Hyundai',
            },
            line: {
              id: 1,
              name: 'Assent',
            },
            year: 2020,
            brandId: 1,
            lineId: 1,
          },
        ],
      });
      this.products.push({
        id: 2,
        name: 'Punta de flecha',
        price: 2000,
        vehicles: [
          {
            universalCode: 'AADDSSkS',
            brand: {
              id: 1,
              name: 'Ford',
            },
            line: {
              id: 1,
              name: 'Escape',
            },
            year: 2002,
            brandId: 1,
            lineId: 1,
          },
        ],
        stock: 4,
      });
      this.dataSource = new MatTableDataSource<ProductInterface>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.products);
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener los datos de los repuesto.'
      );
    }
  }

  private getProductFabric(): void {
    try {
      this.dataSourceFabric = new MatTableDataSource<ProductInterface>(
        this.productsFabric
      );
      this.dataSourceFabric.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener los datos de los repuesto de las fabricas.'
      );
    }
  }

  applyFilterNameValuePrice(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceFabric.filter = filterValue.trim().toLowerCase();
  }

  applyDataFilter(data: ProductInterface[]) {
    this.dataSource = new MatTableDataSource<ProductInterface>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyDataFilterFabric(data: ProductInterface[]) {
    this.dataSourceFabric = new MatTableDataSource<ProductInterface>(data);
    this.dataSourceFabric.paginator = this.paginator;
    this.dataSourceFabric.sort = this.sort;
  }
  applyFilterVehicle(event: any) {
    try {
      if (event.value != null) {
        let partFound: any[] = [];

        this.products.forEach((part: ProductInterface) => {
          let found = [];
          part.vehicles.forEach((vehicle) => {
            if (vehicle.universalCode === event.value.universalCode) {
              found.push(vehicle);
            }
          });

          if (found.length > 0) {
            partFound.push(part);
          }
        });

        this.applyDataFilter(partFound);
      } else {
        this.getProduct();
      }
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al filtrar por vehiculo'
      );
    }
  }

  applyFilterVehicleFactory(event: any) {
    try {
      if (event.value != null) {
        let partFound: any[] = [];

        this.productsFabric.forEach((part: ProductInterface) => {
          let found = [];
          part.vehicles.forEach((vehicle) => {
            if (vehicle.universalCode === event.value.universalCode) {
              found.push(vehicle);
            }
          });

          if (found.length > 0) {
            partFound.push(part);
          }
        });

        this.applyDataFilterFabric(partFound);
      } else {
        this.getProductFabric();
      }
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al filtrar por vehiculo'
      );
    }
  }
}

const ELEMENT_DATA_VEHICLES = [
  {
    universalCode: 'AADDSSkS',
    brand: {
      id: 1,
      name: 'Ford',
    },
    line: {
      id: 1,
      name: 'Escape',
    },
    year: 2002,
    brandId: 1,
    lineId: 1,
  },
  {
    universalCode: 'AADDS',
    brand: {
      id: 1,
      name: 'Hyundai',
    },
    line: {
      id: 1,
      name: 'Assent',
    },
    year: 2020,
    brandId: 1,
    lineId: 1,
  },
];
