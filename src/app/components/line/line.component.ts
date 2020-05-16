import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LineInterface } from '../../../interfaces/VehicleInterface';
import { DialogService } from '../../services/dialog/dialog.service';
import { LineService } from '../../services/line/line.service';
import { LineDialogComponent } from '../line-dialog/line-dialog.component';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'options'];
  line: LineInterface[] = [];
  dataSource: MatTableDataSource<LineInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _LINE_SERVICE: LineService
  ) {}

  ngOnInit() {
    this.getLine();
  }

  private getLine(): void {
    try {
      this._LINE_SERVICE.readLine().subscribe( (value: LineInterface[]) => {
        if (value) {
          this.line = value;
          this.dataSource = new MatTableDataSource<LineInterface>(this.line);
          this.dataSource.paginator = this.paginator;
        }
      });
      this.dataSource = new MatTableDataSource<LineInterface>(this.line);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener los datos de las lineas de los vehiculos.'
      );
    }
  }

  public wantCreate() {
    try {
      this._DIALOG_SERVICE.shareData = {};
      this._DIALOG_SERVICE
        .openDialog(LineDialogComponent)
        .beforeClosed()
        .subscribe((value: LineInterface) => {
          if (value) {
            this.createLine(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(error, 'Error', 'Error al crear una linea de vehiculo.');
    }
  }

  private createLine(line: LineInterface) {
    try {
      this._LINE_SERVICE.newLine(line).subscribe((value: any) => {
        if (value) {
          /* message success show here */
          this.getLine();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al crear una linea de vehiculo.'
      );
    }
  }

  wantUpdate(line: LineInterface) {
    try {
      this._DIALOG_SERVICE.shareData = line;
      this._DIALOG_SERVICE
        .openDialog(LineDialogComponent)
        .beforeClosed()
        .subscribe((value: LineInterface) => {
          if (value) {
            this.updateLine(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar una linea de vehiculo.'
      );
    }
  }

  private updateLine(line: LineInterface) {
    try {
      this._LINE_SERVICE.updateLine(line).subscribe((value: any) => {
        if (value) {
          /* message update here */
          this.getLine();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar una linea de vehiculo.'
      );
    }
  }

  wantDelete(line: LineInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar una linea de vehiculo',
        message: 'Estas seguro que quieres eliminar esta linea de vehiculo.',
        data: {}
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteLine(line);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar una linea de vehiculo.'
      );
    }
  }

  private deleteLine(line: LineInterface) {
    try {
      this._LINE_SERVICE.deleteLine(line).subscribe((value: any) => {
        if (value) {
          /* message delete here */
          this.getLine();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar una line de vehiculo.'
      );
    }
  }
}
