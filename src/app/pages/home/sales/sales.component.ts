import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../../services/dialog/dialog.service';
import { SalesService } from '../../../services/sales/sales.service';
import { ClientInterface } from '../../../../interfaces/ClientInterface';
import { MatTableDataSource } from '@angular/material/table';
import {
  SaleProductInterface,
  OrderInterface,
  SaleInterface
} from '../../../../interfaces/SaleInterface';
import { MatPaginator } from '@angular/material/paginator';
import { SalesProductDialogComponent } from '../../../components/sales-product-dialog/sales-product-dialog.component';
import { ClientSelectOrderComponent } from '../../../components/client-select/client-select.component';
import { DialogCustomComponent } from 'src/app/components/dialog-custom/dialog-custom.component';
import { FactoryInterface } from '../../../../interfaces/FactoryInterface';
import { FactorySelectComponent } from '../../../components/factory-select/factory-select.component';
import { OrderProductInterface, CreditSaleInterface } from '../../../../interfaces/SaleInterface';
import { MatSort } from '@angular/material/sort';
import { ComponentType } from '@angular/cdk/portal';
import { OrderProductDialogComponent } from '../../../components/order-product-dialog/order-product-dialog.component';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  /* validate client select */
  clientOrderValidate: FormGroup;
  clientOrder: ClientInterface = {
    id: null,
    email: null,
    image: null,
    name: null,
    nit: null,
    phone: null,
    subscription: {
      id: null,
      name: null,
      discount: 0
    },
    subscriptionId: null
  };

  /* validate add product to the new order */
  partOrder: SaleProductInterface[] = [];
  partOrderSelect: SaleProductInterface = {
    id: 0,
    orderId: 1,
    priceSale: 0,
    product: {
      id: null,
      description: null,
      name: null,
      partNo: null,
      price: null,
      stock: null,
      vehicleId: null,
      vehicles: null
    },
    productId: null,
    stockSale: 0
  };
  dataSourcePartOrder: MatTableDataSource<SaleProductInterface>;
  displayedColumnsOrder: string[] = [
    'product',
    'unitCost',
    'howMany',
    'total',
    'options'
  ];

  factoryValidate: FormGroup;
  factoryCreate: FactoryInterface = {
    ip: null,
    lastDateRequest: null,
    id: null,
    name: null,
    servicePassword: null
  };

  /* totals */
  totalCost = 0;
  totalCostDiscount = 0;
  stateCredit = false;
  /* table components */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _FORM_BUILDER: FormBuilder,
    private _DIALOG_SERVICE: DialogService,
    private _SALE_SERVICE: SalesService
  ) {}

  ngOnInit() {
    this.validateClient();
    this.validateFactory();
  }

  /* validate client form group */
  public validateClient(): void {
    this.clientOrderValidate = this._FORM_BUILDER.group({
      name: ['', Validators.required],
      nit: ['', Validators.required],
      phone: ['', Validators.required],
      subscription: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  /* validate factory from group */
  public validateFactory(): void {
    this.factoryValidate = this._FORM_BUILDER.group({
      ip: ['', Validators.required],
      name: ['', Validators.required],
      passwordService: ['', Validators.required]
    });
  }

  /* select client from the list */
  wantSelectClient(): void {
    try {
      this._DIALOG_SERVICE.width = '60%';
      this._DIALOG_SERVICE
        .openDialog(ClientSelectOrderComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.clientOrder = value;
            this.checkAvailable(this.clientOrder.id);
          }
        });
    } catch (error) {
      console.log(error);
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al seleccionar un cliente existente.'
      );
    }
  }

  checkAvailable(clientId: number): void {
    try {
      this._SALE_SERVICE.checkAvailableSale(clientId).subscribe((value: boolean) => {
        if (value) {
          this._DIALOG_SERVICE.shareData = {
            title: 'Ordenes disponibles',
            message:
              'El cliente tiene ordenes disponibles para su entrega.'
          };
          this._DIALOG_SERVICE.openDialog(DialogCustomComponent);
        } 
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al guardar la order.'
      );
    }
  }

  /* want select factory */
  wantSelectFactory(): void {
    try {
      this._DIALOG_SERVICE.width = '60%';
      this._DIALOG_SERVICE
        .openDialog(FactorySelectComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            console.log(value);
            this.factoryCreate = value;
          }
        });
    } catch (error) {
      console.log(error);
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al seleccionar una fabrica existente.'
      );
    }
  }

  /* select product to new order */
  private getPartOrder(): void {
    try {
      this.dataSourcePartOrder = new MatTableDataSource<SaleProductInterface>(
        this.partOrder
      );
      this.dataSourcePartOrder.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al obtener los repuestos de la orden.'
      );
    }
  }

  onChangeParInfo(item: SaleProductInterface): void {
    try {
      const index = this.partOrder.indexOf(item);

      if (index > -1) {
        this.partOrderSelect = {
          id: item.id,
          orderId: item.orderId,
          priceSale: item.priceSale,
          product: item.product,
          productId: item.productId,
          stockSale: item.stockSale
        };
        this.getPartOrder();
      }
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al actualizar un producto de la lista.'
      );
    }
  }

  wantDeletePart(item: any): void {
    try {
      const index = this.partOrder.indexOf(item);
      if (index > -1) {
        this.partOrder.splice(index, 1);
        this.getPartOrder();
      }
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al eliminar un producto de la lista.'
      );
    }
  }

  wantSelectPart(type: number): void {
    try {

      let  comp: ComponentType<unknown>;

      if (type === 1) {
        comp = SalesProductDialogComponent;
        this._DIALOG_SERVICE.shareData = {};
      } else {
        comp = OrderProductDialogComponent;
        this._DIALOG_SERVICE.shareData = this.factoryCreate;
      }

      this._DIALOG_SERVICE
        .openDialog(comp)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.partOrderSelect.product = value;
            this.partOrderSelect.priceSale = value.price;
            this.partOrderSelect.productId = value.id;
            this.partOrderSelect.priceSale = value.price;
            this.partOrder.push(this.partOrderSelect);
            this.partOrderSelect = {
              id: 0,
              orderId: 1,
              priceSale: 0,
              product: {
                id: null,
                description: null,
                name: null,
                partNo: null,
                price: null,
                stock: null,
                vehicleId: null,
                vehicles: null,
                fabricId: null
              },
              productId: null,
              stockSale: 0
            };
            this.getPartOrder();
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al seleccionar un producto existente.'
      );
    }
  }

  /* get some extra information */
  getTotalCostParts(): number {
    return this.partOrder
      .map(t => t.priceSale * t.stockSale)
      .reduce((acc, value) => acc + value, 0);
  }

  /* save sale product */
  private assignProductSale(sale: SaleInterface): void {
    try {
      this.partOrder.forEach(part => {
        part.orderId = sale.id;
        this._SALE_SERVICE.assignProductSale(part);
      });
      this._DIALOG_SERVICE.shareData = {
        title: 'Orden de repuestos creada',
        message:
          'Actualizar las ordenes de repuesto para poder visualizar la nueva orden.'
      };
      this._DIALOG_SERVICE.openDialog(DialogCustomComponent);
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al asignar los productos a una orden de repuestos.'
      );
    }
  }

  /* save order product */
  private assignProductOrder(sale: OrderProductInterface): void {
    try {
      this.partOrder.forEach(part => {
        part.orderId = sale.id;
        this._SALE_SERVICE.assignProductOrder(part);
      });
      this._DIALOG_SERVICE.shareData = {
        title: 'Pedido de repuestos creada',
        message:
          'Actualizar las ordenes de repuesto para poder visualizar los pedidos.'
      };
      this._DIALOG_SERVICE.openDialog(DialogCustomComponent);
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al asignar los productos a un pedido.'
      );
    }
  }
  /* create sale */
  private createSale(sale: SaleInterface): void {
    try {
      this._SALE_SERVICE.newSale(sale).subscribe((value: any) => {
        this._DIALOG_SERVICE.shareData = {
            title: 'Nueva venta',
            message:
              'Se a realizado la orden de venta de repuestos con exito, actualiza el listado de ordenes para poder visualizar la orden.'
          };
          this._DIALOG_SERVICE.openDialog(DialogCustomComponent);
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al guardar la order.'
      );
    }
  }

  /* create order */
  private createOrder(order: OrderInterface): void {
    try {
      this._SALE_SERVICE.newOrder(order).subscribe((value: any) => {
        this._DIALOG_SERVICE.shareData = {
          title: 'Nuevo Pedido',
          message:
            'Se a realizado la orden de venta de repuestos con exito, actualiza el listado de pedidos para poder visualizar el pedido.'
        };
        this._DIALOG_SERVICE.openDialog(DialogCustomComponent);
      }, error => {
        this._DIALOG_SERVICE.errorMessage(
          JSON.stringify(error.name),
          'Error',
          'Error al guardar el pedido.'
        );
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al guardar el pedido.'
      );
    }
  }

  /* save sale order */
  wantSaveSale(): void {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Guardar',
        message: 'Estas seguro de que quieres guardar esta orden',
        data: null
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            const sale: SaleInterface = {
              id: 0,
              client: this.clientOrder,
              clientId: this.clientOrder.id,
              date: new Date(),
              productSale: this.partOrder,
              statusId: 1,
              order: null,
              orderId: 0,
              total: this.totalCostDiscount,
              isCredit: this.stateCredit
            };
            console.log(sale);
            this.createSale(sale);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al guardar la order.'
      );
    }
  }

  /* save order */
  wantSaveOrder(): void {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Guardad',
        message: 'Estas seguro de que quieres guardar este pedido',
        data: null
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            const order: OrderInterface = {
              id: 0,
              factory: this.factoryCreate,
              factoryId: this.factoryCreate.id,
              timeCreate: new Date(),
              product: this.partOrder,
              statusId: 1,
              status: {
                id: 1,
                name: 'Requerido'
              }
            };

            this.createOrder(order);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al guardar la order.'
      );
    }
  }

  validateSub(): boolean {
    try {
      console.log(this.clientOrder);
      if (this.clientOrder.subscription.id === 2) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al validar la subscripcion'
      );
    }
  }

  updateValueCost(): void {
    try {
      const factor = (1 - (this.clientOrder.subscription.discount / 100));
      this.totalCost = this.getTotalCostParts();
      this.totalCostDiscount = this.totalCost * factor;
    } catch (error) {
      console.log(error);
    }
  }

  toggle(event) {
    console.log(event);
    this.stateCredit = event.checked;
  }
}
