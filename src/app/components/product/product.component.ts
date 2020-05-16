import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { ProductInterface } from '../../../interfaces/ProductInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog/dialog.service';
import { ProductService } from '../../services/product/product.service';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ProductStockDialogComponent } from '../product-stock-dialog/product-stock-dialog.component';
import { ProductVehicleDialogComponent } from '../product-vehicle-dialog/product-vehicle-dialog.component';
import { ActionVehicleProductInterface } from '../../../interfaces/ActionVehicleProductInterface';

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
    'factory',
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
      this._PRODUCT_SERVICE.readProduct().subscribe( (value: ProductInterface[]) => {
        if (value) {
          this.products = value;
          this.dataSource = new MatTableDataSource<ProductInterface>(this.products);
          this.dataSource.paginator = this.paginator;
        }
      });
      this.dataSource = new MatTableDataSource<ProductInterface>(this.products);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al obtener los datos de los repuesto.'
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
            value.fabricId = value.fabric.id;
            value.fabric = null;
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
      this.errorMessage(error, 'Error', 'Error al crear un repuesto.');
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
            value.fabricId = value.fabric.id;
            value.fabric = null;
            this.updateProduct(value);
          }
        });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al actualizar un repuesto.');
    }
  }

  private updateProduct(product: ProductInterface) {
    try {
      product.vehicles = null;
      this._PRODUCT_SERVICE.updateProduct(product).subscribe((value: any) => {
        if (value) {
          /* message update here */
          this.getProduct();
        }
      });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al actualizar un repuesto.');
    }
  }

  wantDelete(product: ProductInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar un Producto',
        message: 'Estas seguro que quieres eliminar este repuesto.',
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
      this.errorMessage(error, 'Error', 'Error al eliminar un repuesto.');
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
      this.errorMessage(error, 'Error', 'Error al eliminar un repuesto.');
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
      this.errorMessage(
        error,
        'Error',
        'Error al actualizar el stock del repuesto.'
      );
    }
  }

  private updateStockProduct(product: ProductInterface) {
    try {
      product.vehicles = null;
      this._PRODUCT_SERVICE
        .updateStockProduct(product)
        .subscribe((value: any) => {
          if (value) {
            /* message update here */
            this.getProduct();
          }
        });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al actualizar un repuesto.');
    }
  }

  wantUpdateVehicles(product: ProductInterface) {
    try {
      this._DIALOG_SERVICE.shareData = product;
      this._DIALOG_SERVICE
        .openDialog(ProductVehicleDialogComponent)
        .beforeClosed()
        .subscribe((value: ActionVehicleProductInterface) => {
          if (value.type === 'delete') {
            const deleteVehicle = {
              id: product.id,
              universalCode: value.data.universalCode,
              fabricId: null
            };
            this.UnAssignVehicle(deleteVehicle);
          } else if (value.type === 'assign') {
            const assignVehicle = {
              id: product.id,
              universalCode: value.data.universalCode,
              fabricId: null
            };
            this.assignVehicle(assignVehicle);
          }
        });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al interactuar con los vehiculos del repuesto.'
      );
    }
  }

  private assignVehicle(product: ProductInterface) {
    try {
      this._PRODUCT_SERVICE
        .assignVehicleProduct(product)
        .subscribe((value: any) => {
          if (value) {
            /* message success here */
            this.getProduct();
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al asignar un vehiculo al repuesto.'
      );
    }
  }

  private UnAssignVehicle(product: ProductInterface) {
    try {
      this._PRODUCT_SERVICE
        .unAssignVehicleProduct(product)
        .subscribe((value: any) => {
          if (value) {
            /* message success here */
            this.getProduct();
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al borrar un vehiculo al repuesto.'
      );
    }
  }
}
