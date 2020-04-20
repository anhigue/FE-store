import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CreditSaleInterface } from '../../../interfaces/SaleInterface';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../../services/dialog/dialog.service';
import { SalesService } from '../../services/sales/sales.service';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';

@Component({
  selector: 'app-credit-sale',
  templateUrl: './credit-sale.component.html',
  styleUrls: ['./credit-sale.component.scss'],
})
export class CreditSaleComponent implements OnInit {
  creditSale: CreditSaleInterface[] = [];
  dataSourceCreditSale: MatTableDataSource<CreditSaleInterface>;
  displayedColumnsCreditSale: string[] = [
    'position',
    'client',
    'sale',
    'state',
    'options',
  ];

  /* table components */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _SALE_SERVICE: SalesService
  ) {}

  ngOnInit() {
    this.getCreditSale();
  }

  private getCreditSale(): void {
    try {
      this._SALE_SERVICE.readCreditSales().subscribe( (value: CreditSaleInterface[]) => {
        if (value) {
          this.creditSale = value;
          this.dataSourceCreditSale = new MatTableDataSource<CreditSaleInterface>(this.creditSale);
          this.dataSourceCreditSale.paginator = this.paginator;
          this.dataSourceCreditSale.sort = this.sort;
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener las ventas al credito.'
      );
    }
  }

  private editCreditSale(creditSale: CreditSaleInterface): void {
    try {
      this._SALE_SERVICE.payCreditSale(creditSale).subscribe( (value: any) => {
        if (value) {
          this._DIALOG_SERVICE.shareData = {
            title: 'Exitoso',
            message: 'Se a cancelado el credito de la orden.',
            data: {},
          };
          this._DIALOG_SERVICE.openDialog(DialogCustomComponent);
          this.getCreditSale();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar el estado de la venta al credito.'
      );
    }
  }

  wantEdit(creditSale: CreditSaleInterface): void {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Cancelar credito',
        message: 'Estas seguro que quieres cancelar el credito de esta orden.',
        data: {},
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe( (value: any) => {
          if (value) {
            this.editCreditSale(creditSale);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar el estado de la venta al credito.'
      );
    }
  }
}
