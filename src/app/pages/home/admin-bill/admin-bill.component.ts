import { Component, OnInit, ViewChild } from '@angular/core';
import { BillService } from '../../../services/bill/bill.service';
import { DialogService } from '../../../services/dialog/dialog.service';
import { MatPaginator } from '@angular/material/paginator';
import { BillInterface } from 'src/interfaces/BillInterface';
import { MatTableDataSource } from '@angular/material/table';
import { BillComponent } from '../../../components/bill/bill.component';
import { DialogCustomComponent } from '../../../components/dialog-custom/dialog-custom.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-bill',
  templateUrl: './admin-bill.component.html',
  styleUrls: ['./admin-bill.component.scss']
})
export class AdminBillComponent implements OnInit {
  formGroupClient: FormGroup;

  displayedColumns: string[] = [
    'position',
    'client',
    'date',
    'total',
    'options'
  ];
  bills: BillInterface[] = [];
  dataSource: MatTableDataSource<BillInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _BILL_SERVICE: BillService,
    private _FORM_BUILD: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getBills();
    this.validateClient();
  }

  validateClient(): void {
    try {
      this.formGroupClient = this._FORM_BUILD.group({
        client: ['', Validators.required]
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(error, 'Error', 'Error interno.');
    }
  }

  getBills(): void {
    try {
      /* this._BILL_SERVICE.readBill().subscribe( (value: any) => {
        if (value) {
          this.bills = value;
          this.dataSource = new MatTableDataSource<BillInterface>(this.bills);
          this.dataSource.paginator = this.paginator;
        }
      }); */
      this.bills.push({
        id: 1,
        date: new Date(),
        total: 500,
        discount: 0.25,
        client: {
          name: 'Andres Higueros'
        },
        sales: {}
      });
      this.dataSource = new MatTableDataSource<BillInterface>(this.bills);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al traer la informacion de las facturas'
      );
    }
  }

  wantUpdate(bill: BillInterface) {
    try {
      this._DIALOG_SERVICE.shareData = bill;
      this._DIALOG_SERVICE
        .openDialog(BillComponent)
        .beforeClosed()
        .subscribe((value: BillInterface) => {
          if (value) {
            this.updateRol(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar la factura.'
      );
    }
  }

  private updateRol(bill: BillInterface) {
    try {
      this._BILL_SERVICE.updateBill(bill).subscribe((value: any) => {
        if (value) {
          /* message update here */
          this.getBills();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar la factura.'
      );
    }
  }

  wantDelete(bill: BillInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar la factura',
        message: 'Estas seguro que quieres eliminar esta factura.',
        data: {}
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteBill(bill);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar la factura.'
      );
    }
  }

  private deleteBill(bill: BillInterface) {
    try {
      this._BILL_SERVICE.deleteBill(bill).subscribe((value: any) => {
        if (value) {
          /* message delete here */
          this.getBills();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar la factura.'
      );
    }
  }
}
