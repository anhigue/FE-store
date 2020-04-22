import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SaleInterface } from '../../../interfaces/SaleInterface';
import { DialogService } from '../../services/dialog/dialog.service';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';
import { SalesService } from '../../services/sales/sales.service';
import { SalesDialogComponent } from '../sales-dialog/sales-dialog.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-sale',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SaleComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'date',
    'total',
    'client',
    'status',
    'list',
    'options',
  ];
  sales: SaleInterface[] = [];
  dataSource: MatTableDataSource<SaleInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _SALE_SERVICE: SalesService
  ) {}

  ngOnInit() {
    this.getSales();
  }

  private getSales(): void {
    try {
      this._SALE_SERVICE.readSale().subscribe((value: SaleInterface[]) => {
        if (value) {
          this.sales = value;
          this.dataSource = new MatTableDataSource<SaleInterface>(this.sales);
          this.dataSource.paginator = this.paginator;
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener los datos de las ordenes de ventas.'
      );
    }
  }

  wantUpdate(sale: SaleInterface, message: string, idState: number): void {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Actualizar',
        message,
        data: {},
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: SaleInterface) => {
          if (value) {
            this.updateSale(sale, idState);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar el estado de la orden.'
      );
    }
  }

  private updateSale(sale: SaleInterface, idState: number) {
    try {
      this._SALE_SERVICE
        .updateStateSale(sale, idState)
        .subscribe((value: any) => {
          if (value) {
            this._DIALOG_SERVICE.shareData = {
              title: 'Exitoso',
              message: 'Se ha actualizado el estado de la orden.',
              data: {},
            };
            this._DIALOG_SERVICE.openDialog(DialogCustomComponent);
            this.getSales();
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar el estado de la orden.'
      );
    }
  }
}
