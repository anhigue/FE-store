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
  styleUrls: ['./sales-product-dialog.component.scss']
})
export class SalesProductDialogComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'partNo',
    'price',
    'stock',
    'options'
  ];
  products: ProductInterface[] = [];
  productsFabric: ProductInterface[] = [];
  dataSource: MatTableDataSource<ProductInterface>;
  dataSourceFabric: MatTableDataSource<ProductInterface>;
  cars = ELEMENT_DATA_VEHICLES;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _PRODUCT_SERVICE: ProductService
  ) { }

  ngOnInit() {
    this.getProduct();
    this.getProductFabric();
  }

  private getProduct(): void {
    try {
      /* descomenta estas lineas cuando termines de agregar las rutas */
      this._PRODUCT_SERVICE.readProduct().subscribe( (value: ProductInterface[]) => {
        if (value) {
          this.products = value;
          this.dataSource = new MatTableDataSource<ProductInterface>(this.products);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
      this.products.push({
        id: 1,
        name: 'Bujia',
        price: 200,
        stock: 40,
        vehicles: []
      });
      this.products.push({
        id: 2,
        name: 'Punta de flecha',
        price: 2000,
        vehicles: [
          {
            universalCode: 'AADDSSkS',
            brand: {},
            line: {},
            year: 2002,
            brandId: 1,
            lineId: 1
          }
        ],
        stock: 4
      });
      this.dataSource = new MatTableDataSource<ProductInterface>(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
      this.dataSourceFabric = new MatTableDataSource<ProductInterface>(this.productsFabric);
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

  applyFilterVehicle(event: Event) {
    const filterValue = (event.target as HTMLSelectElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceFabric.filter = filterValue.trim().toLowerCase();
  }
}

const ELEMENT_DATA_VEHICLES = [
  {
    universalCode: 'AADDSSkS',
    brand: 'Ford',
    line: 'Escape',
    year: 2002
  }
]
