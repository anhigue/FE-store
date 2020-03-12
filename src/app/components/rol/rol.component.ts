import { Component, OnInit, ViewChild } from '@angular/core';
import { RolInterface } from '../../../interfaces/RolInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog/dialog.service';
import { RolService } from '../../services/rol/rol.service';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';
import { RolDialogComponent } from '../rol-dialog/rol-dialog.component';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'options'];
  rol: RolInterface[] = [];
  dataSource: MatTableDataSource<RolInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _ROL_SERVICE: RolService
  ) {}

  ngOnInit() {
    this.getRol();
  }

  private getRol(): void {
    try {
      /* descomenta estas lineas cuando termines de agregar las rutas */
      /* this._ROL_SERVICE.readRol().subscribe( (value: RolInterface[]) => {
        if (value) {
          this.rol = value;
          this.dataSource = new MatTableDataSource<RolInterface>(this.rol);
          this.dataSource.paginator = this.paginator;
        }
      }); */
      this.rol.push({
        id: 1,
        name: 'Cliente mayorista'
      });
      this.dataSource = new MatTableDataSource<RolInterface>(this.rol);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al obtener los datos de los tipos de usuario.'
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
        .openDialog(RolDialogComponent)
        .beforeClosed()
        .subscribe((value: RolInterface) => {
          if (value) {
            this.createRol(value);
          }
        });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al crear');
    }
  }

  private createRol(rol: RolInterface) {
    try {
      this._ROL_SERVICE.newRol(rol).subscribe((value: any) => {
        if (value) {
          /* message success show here */
          this.getRol();
        }
      });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al crear un tipo de usuario.'
      );
    }
  }

  wantUpdate(sub: RolInterface) {
    try {
      this._DIALOG_SERVICE.shareData = sub;
      this._DIALOG_SERVICE
        .openDialog(RolDialogComponent)
        .beforeClosed()
        .subscribe((value: RolInterface) => {
          if (value) {
            this.updateRol(value);
          }
        });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al actualizar un tipo de usuario.'
      );
    }
  }

  private updateRol(rol: RolInterface) {
    try {
      this._ROL_SERVICE.updateRol(rol).subscribe((value: any) => {
        if (value) {
          /* message update here */
          this.getRol();
        }
      });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al actualizar un tipo de usuario.'
      );
    }
  }

  wantDelete(sub: RolInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar un tipo de usuario',
        message: 'Estas seguro que quieres eliminar un tipo de usuario.',
        data: {}
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteRol(sub);
          }
        });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al eliminar un tipo de usuario.'
      );
    }
  }

  private deleteRol(rol: RolInterface) {
    try {
      this._ROL_SERVICE.deleteRol(rol).subscribe((value: any) => {
        if (value) {
          /* message delete here */
          this.getRol();
        }
      });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al eliminar un tipo de usuario.'
      );
    }
  }
}
