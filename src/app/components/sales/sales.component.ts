import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SaleInterface } from '../../../interfaces/SaleInterface';
import { DialogService } from '../../services/dialog/dialog.service';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';
import { SalesService } from '../../services/sales/sales.service';
import { SalesDialogComponent } from '../sales-dialog/sales-dialog.component';

@Component({
  selector: 'app-sale',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SaleComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'date',
    'total',
    'client',
    'options'
  ];
  sales: SaleInterface[] = [];
  dataSource: MatTableDataSource<SaleInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _SALE_SERVICE: SalesService
  ) {}

  ngOnInit() {
    this.getSales();
  }

  private getSales(): void {
    try {
      /* this._SALE_SERVICE.readSale().subscribe( (value: SaleInterface[]) => {
        if (value) {
          this.rol = value;
          this.dataSource = new MatTableDataSource<SaleInterface>(this.rol);
          this.dataSource.paginator = this.paginator;
        }
      }); */
      this.sales.push({
        id: 1,
        client: {
          id: 1,
          name: 'Javier Alvarez',
          email: 'Higueros71@gmail.com'
        },
        total: 200,
      });
      this.dataSource = new MatTableDataSource<SaleInterface>(this.sales);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener los datos de las ordenes de ventas.'
      );
    }
  }
  wantUpdate(sale: SaleInterface) {
    try {
      this._DIALOG_SERVICE.shareData = sale;
      this._DIALOG_SERVICE
        .openDialog(SalesDialogComponent)
        .beforeClosed()
        .subscribe((value: SaleInterface) => {
          if (value) {
            this.updateSale(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar una orden de venta de repuesto.'
      );
    }
  }

  private updateSale(sale: SaleInterface) {
    try {
      this._SALE_SERVICE.updateSale(sale).subscribe((value: any) => {
        if (value) {
          /* message update here */
          this.getSales();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar una orden de venta de repuesto.'
      );
    }
  }

  wantDelete(sale: SaleInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar una orden de venta de repuesto',
        message: 'Estas seguro que quieres eliminar una orden de venta de repuesto.',
        data: {}
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteSale(sale);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar un tipo de usuario.'
      );
    }
  }

  private deleteSale(sale: SaleInterface) {
    try {
      this._SALE_SERVICE.deleteSale(sale).subscribe((value: any) => {
        if (value) {
          /* message delete here */
          this.getSales();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar una orden de venta de repuesto.'
      );
    }
  }

}
