import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FactoryInterface } from '../../../interfaces/FactoryInterface';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog/dialog.service';
import { FactoryService } from '../../services/factory/factory.service';
import { FactoryDialogComponent } from '../factory-dialog/factory-dialog.component';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss']
})
export class FactoryComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'ip', 'lastDateConsult', 'options'];
  factory: FactoryInterface[] = [];
  dataSource: MatTableDataSource<FactoryInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _FACTORY_SERVICE: FactoryService
  ) {}

  ngOnInit() {
    this.getFactory();
  }

  private getFactory(): void {
    try {
      /* descomenta estas lineas cuando termines de agregar las rutas */
      /* this._FACTORY_SERVICE.readFactory().subscribe( (value: FactoryInterface[]) => {
        if (value) {
          this.factory = value;
          this.dataSource = new MatTableDataSource<FactoryInterface>(this.factory);
          this.dataSource.paginator = this.paginator;
        }
      }); */
      this.factory.push({
        id: 1,
        name: 'BOSH',
        ip: '190.113.91.36',
        lastDateHistoryConsult: new Date()
      });
      this.dataSource = new MatTableDataSource<FactoryInterface>(this.factory);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener las fabricas de repuestos.'
      );
    }
  }

  public wantCreate() {
    try {
      this._DIALOG_SERVICE.shareData = {};
      this._DIALOG_SERVICE
        .openDialog(FactoryDialogComponent)
        .beforeClosed()
        .subscribe((value: FactoryInterface) => {
          if (value) {
            this.createFactory(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(error, 'Error', 'Error al crear una fabrica.');
    }
  }

  private createFactory(factory: FactoryInterface) {
    try {
      this._FACTORY_SERVICE.newFactory(factory).subscribe((value: any) => {
        if (value) {
          /* message success show here */
          this.getFactory();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al crear una fabrica.'
      );
    }
  }

  wantUpdate(factory: FactoryInterface) {
    try {
      this._DIALOG_SERVICE.shareData = factory;
      this._DIALOG_SERVICE
        .openDialog(FactoryDialogComponent)
        .beforeClosed()
        .subscribe((value: FactoryInterface) => {
          if (value) {
            this.updateFactory(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar una fabrica.'
      );
    }
  }

  private updateFactory(factory: FactoryInterface) {
    try {
      this._FACTORY_SERVICE.updateFactory(factory).subscribe((value: any) => {
        if (value) {
          /* message update here */
          this.getFactory();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar una fabrica.'
      );
    }
  }

  wantDelete(factory: FactoryInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar una Fabrica',
        message: 'Estas seguro que quieres eliminar esta fabrica.',
        data: {}
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteFactory(factory);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar una fabrica.'
      );
    }
  }

  private deleteFactory(factory: FactoryInterface) {
    try {
      this._FACTORY_SERVICE.deleteFactory(factory).subscribe((value: any) => {
        if (value) {
          /* message delete here */
          this.getFactory();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar una fabrica.'
      );
    }
  }
}
