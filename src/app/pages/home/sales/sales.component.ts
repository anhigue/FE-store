import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../../services/dialog/dialog.service';
import { SaleInterface } from '../../../../interfaces/SaleInterface';
import { SalesService } from '../../../services/sales/sales.service';
import { ProductInterface } from '../../../../interfaces/ProductInterface';
import { ClientService } from '../../../services/client/client.service';
import { ClientInterface } from '../../../../interfaces/ClientInterface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SalesProductDialogComponent } from '../../../components/sales-product-dialog/sales-product-dialog.component';
import { DialogCustomComponent } from '../../../components/dialog-custom/dialog-custom.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  client: ClientInterface[] = [];
  formGroupClient: FormGroup;
  formGroupProduct: FormGroup;

  filter: any = { name: '' };

  displayedColumns: string[] = [
    'name',
    'description',
    'partNo',
    'price',
    'options'
  ];
  products: ProductInterface[] = [];
  dataSource: MatTableDataSource<ProductInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _FORM_BUILDER: FormBuilder,
    private _DIALOG_SERVICE: DialogService,
    private _SALE_SERVICE: SalesService,
    private _CLIENT_SERVICE: ClientService
  ) {}

  ngOnInit() {
    this.validateFormGroupClient();
    this.getClients();
  }

  validateFormGroupClient() {
    try {
      this.formGroupClient = this._FORM_BUILDER.group({
        client: ['', Validators.required]
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(error, 'Error', 'Error interno.');
    }
  }

  private assignProductSale(sale: SaleInterface, product: ProductInterface) {
    try {
      this._SALE_SERVICE
        .assignProductSale(sale, product)
        .subscribe((value: any) => {
          if (value) {
            /* message create here */
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al asignar un producto a una orden de compra'
      );
    }
  }

  public getClients(): void {
    try {
      this._CLIENT_SERVICE.readClient().subscribe((value: any[]) => {
        if (value) {
          this.client = value;
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener los clientes.'
      );
    }
  }

  wantAddProductList() {
    try {
      this._DIALOG_SERVICE.width = '60%';
      this._DIALOG_SERVICE
        .openDialog(SalesProductDialogComponent)
        .beforeClosed()
        .subscribe((value: ProductInterface) => {
          if (value) {
            this.addProductList(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al asignar un producto a la orden.'
      );
    }
  }

  getProductList(): void {
    try {
      this.dataSource = new MatTableDataSource<ProductInterface>(this.products);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener un producto a la orden.'
      );
    }
  }

  getTotalCost() {
    return this.products.map(t => t.price).reduce((acc, value) => acc + value, 0);
  }

  private addProductList(product: ProductInterface): void {
    try {
      this.products.push(product);
      this.getProductList();
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al asignar un producto a la orden.'
      );
    }
  }

  public removeProductList(product: ProductInterface): void {
    try {
      const indexProduct = this.products.indexOf(product);
      if (indexProduct > -1) {
        this.products.splice(indexProduct, 1);
        this.getProductList();
      }
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar un producto a la orden.'
      );
    }
  }

  /* check if the functions is correct */
  saveSale(): void {
    try {
      const sale: SaleInterface = {
        date: new Date(),
        total: this.getTotalCost(),
        client: this.formGroupClient.get('client').value.id
      };
      /* check the function if is not ok */
      this._SALE_SERVICE.newSale(sale).subscribe((value: any) => {
        if (value) {
          this.saveProductsSale(value);
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al guardar la orden de compra.'
      );
    }
  }

  private saveProductsSale(sale: SaleInterface): void {
    try {
      this.products.forEach(product => {
        if (product) {
          this.assignProductSale(sale, product);
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al guardar los productos.'
      );
    }
  }

  wantSave() {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Guardar la orden de venta de repuesto',
        message:
          'Estas seguro que quieres guardar una orden de venta de repuesto.',
        data: {}
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.saveSale();
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al querer la orden de compra de repuestos.'
      );
    }
  }
}
