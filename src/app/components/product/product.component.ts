import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductInterface } from '../../../interfaces/ProductInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog/dialog.service';
import { ProductService } from '../../services/product/product.service';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductStockDialogComponent } from '../product-stock-dialog/product-stock-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
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
  dataSource: MatTableDataSource<ProductInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _PRODUCT_SERVICE: ProductService
  ) {}

  ngOnInit() {
    this.getProduct();
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
        name: 'Anibal Higueros'
      });
      this.dataSource = new MatTableDataSource<ProductInterface>(this.products);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al obtener los datos de los productos.'
      );
    }
  }

  private errorMessage(error: any, title: string, message: string) {
    this._DIALOG_SERVICE.shareData = {
      title,
      message,
      data: error
    };
    this._DIALOG_SERVICE.openDialog(DialogCustomComponent);
  }

  public wantCreate() {
    try {
      this._DIALOG_SERVICE.shareData = {};
      this._DIALOG_SERVICE
        .openDialog(ProductDialogComponent)
        .beforeClosed()
        .subscribe((value: ProductInterface) => {
          if (value) {
            this.createProduct(value);
          }
        });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al crear');
    }
  }

  private createProduct(product: ProductInterface) {
    try {
      this._PRODUCT_SERVICE.newProduct(product).subscribe((value: any) => {
        if (value) {
          /* message success show here */
          this.getProduct();
        }
      });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al crear un producto.');
    }
  }

  wantUpdate(product: ProductInterface) {
    try {
      this._DIALOG_SERVICE.shareData = product;
      this._DIALOG_SERVICE
        .openDialog(ProductDialogComponent)
        .beforeClosed()
        .subscribe((value: ProductInterface) => {
          if (value) {
            this.updateProduct(value);
          }
        });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al actualizar un producto.');
    }
  }

  private updateProduct(product: ProductInterface) {
    try {
      this._PRODUCT_SERVICE.updateProduct(product).subscribe((value: any) => {
        if (value) {
          /* message update here */
          this.getProduct();
        }
      });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al actualizar un producto.');
    }
  }

  wantDelete(product: ProductInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar un Producto',
        message: 'Estas seguro que quieres eliminar este producto.',
        data: {}
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteProduct(product);
          }
        });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al eliminar un producto.');
    }
  }

  private deleteProduct(product: ProductInterface) {
    try {
      this._PRODUCT_SERVICE.deleteProduct(product).subscribe((value: any) => {
        if (value) {
          /* message delete here */
          this.getProduct();
        }
      });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al eliminar un producto.');
    }
  }

  wantUpdateStock(product: ProductInterface) {
    try {
      this._DIALOG_SERVICE.shareData = product;
      this._DIALOG_SERVICE
        .openDialog(ProductStockDialogComponent)
        .beforeClosed()
        .subscribe((value: ProductInterface) => {
          if (value) {
            this.updateStockProduct(value);
          }
        });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al actualizar el stock del producto.');
    }
  }

  private updateStockProduct(product: ProductInterface) {
    try {
      this._PRODUCT_SERVICE.updateStockProduct(product).subscribe((value: any) => {
        if (value) {
          /* message update here */
          this.getProduct();
        }
      });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al actualizar un producto.');
    }
  }

}
