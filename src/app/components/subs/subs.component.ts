import { SubInterface } from './../../../interfaces/SubInterface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog/dialog.service';
import { SubsService } from '../../services/subs/subs.service';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';
import { SubsDialogComponent } from '../subs-dialog/subs-dialog.component';

@Component({
  selector: 'app-subs',
  templateUrl: './subs.component.html',
  styleUrls: ['./subs.component.scss']
})
export class SubsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'discount', 'options'];
  subs: SubInterface[] = [];
  dataSource: MatTableDataSource<SubInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _SUB_SERVICE: SubsService
  ) {}

  ngOnInit() {
    this.getSubs();
  }

  private getSubs(): void {
    try {
      this._SUB_SERVICE.readSub().subscribe( (value: SubInterface[]) => {
        if (value) {
          this.subs = value;
          this.dataSource = new MatTableDataSource<SubInterface>(this.subs);
          this.dataSource.paginator = this.paginator;
        }
      });
      this.subs.push({
        id: 1,
        name: 'Taller de reparacion'
      });
      this.dataSource = new MatTableDataSource<SubInterface>(this.subs);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al obtener los datos de las subscripciones.'
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
        .openDialog(SubsDialogComponent)
        .beforeClosed()
        .subscribe((value: SubInterface) => {
          if (value) {
            this.createSub(value);
          }
        });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al crear');
    }
  }

  private createSub(sub: SubInterface) {
    try {
      this._SUB_SERVICE.newSub(sub).subscribe((value: any) => {
        if (value) {
          /* message success show here */
          this.getSubs();
        }
      });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al crear un tipo de subscripcion'
      );
    }
  }

  wantUpdate(sub: SubInterface) {
    try {
      this._DIALOG_SERVICE.shareData = sub;
      this._DIALOG_SERVICE
        .openDialog(SubsDialogComponent)
        .beforeClosed()
        .subscribe((value: SubInterface) => {
          if (value) {
            this.updateSub(value);
          }
        });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al actualizar un tipo de subscripcion'
      );
    }
  }

  private updateSub(Sub: SubInterface) {
    try {
      this._SUB_SERVICE.updateSub(Sub).subscribe((value: any) => {
        if (value) {
          /* message update here */
          this.getSubs();
        }
      });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al actualizar un tipo de subscripcion'
      );
    }
  }

  wantDelete(sub: SubInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar un tipo de suscripcion',
        message: 'Estas seguro que quieres eliminar un tipo de suscripcion.',
        data: {}
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteSub(sub);
          }
        });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al eliminar un tipo de subscripcion'
      );
    }
  }

  private deleteSub(sub: SubInterface) {
    try {
      this._SUB_SERVICE.deleteSub(sub).subscribe((value: any) => {
        if (value) {
          /* message delete here */
          this.getSubs();
        }
      });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al eliminar un tipo de subscripcion'
      );
    }
  }
}
