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
  displayedColumns: string[] = ['position', 'name', 'options'];
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
      /* descomenta estas lineas cuando termines de agregar las rutas */
      /* this._SUB_SERVICE.readSub().subscribe( (value: SubInterface[]) => {
        if (value) {
          this.subs = value;
          this.dataSource = new MatTableDataSource<SubInterface>(this.subs);
          this.dataSource.paginator = this.paginator;
        }
      }); */
      this.subs.push({
        id: 1,
        name: 'Taller de reparacion'
      });
      this.dataSource = new MatTableDataSource<SubInterface>(this.subs);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al obtener los datos de las subscripciones.');
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
        .subscribe((value: SubInterface) => {});
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al crear');
    }
  }

  private createSub(sub: SubInterface) {
    try {
      console.log('');
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al crear un tipo de subscripcion');
    }
  }
}
