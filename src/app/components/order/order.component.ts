import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderInterface } from '../../../interfaces/SaleInterface';
import { SalesService } from '../../services/sales/sales.service';
import { DialogService } from '../../services/dialog/dialog.service';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: OrderInterface[] = [];
  dataSourceOrder: MatTableDataSource<OrderInterface>;
  displayedColumns: string[] = [
    'position',
    'factory',
    'status',
    'timeCreate',
    'options',
  ];

  /* table components */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _SALE_SERVICE: SalesService
  ) { }

  ngOnInit() {
    this.getOrders();
  }

  private getOrders(): void {
    try {
      this._SALE_SERVICE.readOrder().subscribe( (value: OrderInterface[]) => {
        if (value) {
          this.order = value;
          this.dataSourceOrder = new MatTableDataSource<OrderInterface>(this.order);
          this.dataSourceOrder.paginator = this.paginator;
          this.dataSourceOrder.sort = this.sort;
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener los pedidos.'
      );
    }
  }

  private editOrder(order: OrderInterface, idState: number): void {
    if (idState === 2) {
      try {
        this._SALE_SERVICE.receibeRequest(order, idState).subscribe( (value: any) => {
          this._DIALOG_SERVICE.shareData = {
            title: 'Exitoso',
            message: 'Se ha actualizado el estado del pedido.',
            data: {},
          };
          this._DIALOG_SERVICE.openDialog(DialogCustomComponent);
          this.getOrders();
        });
      } catch (error) {
        this._DIALOG_SERVICE.errorMessage(
          error,
          'Error',
          'Error al cambiar el estado del pedido.'
        );
      }
    } else {
      try {
        this._SALE_SERVICE.cancelRequest(order, idState).subscribe( (value: any) => {
          this._DIALOG_SERVICE.shareData = {
            title: 'Exitoso',
            message: 'Se ha cancelado el pedido.',
            data: {},
          };
          this._DIALOG_SERVICE.openDialog(DialogCustomComponent);
          this.getOrders();
        });
      } catch (error) {
        this._DIALOG_SERVICE.errorMessage(
          error,
          'Error',
          'Error al cancelar el pedido.'
        );
      }
    }
  }

  wantEdit(order: OrderInterface, idState: number, message: string): void {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Actualizar estado',
        message,
        data: {},
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe( (value: any) => {
          if (value) {
            this.editOrder(order, idState);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al cambiar el estado del pedido.'
      );
    }
  }

}
