import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductInterface } from '../../../interfaces/ProductInterface';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product/product.service';
import { DialogService } from '../../services/dialog/dialog.service';

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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
      /* this._PRODUCT_SERVICE.readProduct().subscribe( (value: ProductInterface[]) => {
        if (value) {
          this.products = value;
          this.dataSource = new MatTableDataSource<ProductInterface>(this.products);
          this.dataSource.paginator = this.paginator;
        }
      }); */
      this.products.push({
        id: 1,
        name: 'Anibal Higueros',
        price: 200,
        vehicles: [
          {
            universalCode: 'AADDSSkS',
            brand: 'Ford',
            line: 'Escape',
            year: 2002
          }
        ]
      });
      this.dataSource = new MatTableDataSource<ProductInterface>(this.products);
      this.dataSource.paginator = this.paginator;
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

}
