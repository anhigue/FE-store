import { Component, OnInit, ViewChild } from '@angular/core';
import { StateInterface } from '../../../interfaces/StateInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog/dialog.service';
import { StateRequestService } from '../../services/state/state-request.service';
import { StateDialogComponent } from '../state-dialog/state-dialog.component';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';

@Component({
  selector: 'app-state-request',
  templateUrl: './state-request.component.html',
  styleUrls: ['./state-request.component.scss']
})
export class StateRequestComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'options'];
  states: StateInterface[] = [];
  dataSource: MatTableDataSource<StateInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _STATE_SERVICE: StateRequestService
  ) {}

  ngOnInit() {
    this.getState();
  }

  private getState(): void {
    try {
      /* descomenta estas lineas cuando termines de agregar las rutas */
      /* this._STATE_SERVICE.readStateRequest().subscribe( (value: StateInterface[]) => {
        if (value) {
          this.states = value;
          this.dataSource = new MatTableDataSource<StateInterface>(this.states);
          this.dataSource.paginator = this.paginator;
        }
      }); */
      this.states.push({
        id: 1,
        name: 'Terminado'
      });
      this.dataSource = new MatTableDataSource<StateInterface>(this.states);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener los datos de los estados de pedido.'
      );
    }
  }

  public wantCreate() {
    try {
      this._DIALOG_SERVICE.shareData = {};
      this._DIALOG_SERVICE
        .openDialog(StateDialogComponent)
        .beforeClosed()
        .subscribe((value: StateInterface) => {
          if (value) {
            this.createState(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(error, 'Error', 'Error al crear un estado de pedido.');
    }
  }

  private createState(state: StateInterface) {
    try {
      this._STATE_SERVICE.newStateRequest(state).subscribe((value: any) => {
        if (value) {
          /* message success show here */
          this.getState();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al crear un estado de pedido.'
      );
    }
  }

  wantUpdate(state: StateInterface) {
    try {
      this._DIALOG_SERVICE.shareData = state;
      this._DIALOG_SERVICE
        .openDialog(StateDialogComponent)
        .beforeClosed()
        .subscribe((value: StateInterface) => {
          if (value) {
            this.updateState(value);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar un estado de pedido.'
      );
    }
  }

  private updateState(state: StateInterface) {
    try {
      this._STATE_SERVICE.updateStateRequest(state).subscribe((value: any) => {
        if (value) {
          /* message update here */
          this.getState();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar un estado de pedido.'
      );
    }
  }

  wantDelete(state: StateInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar un estado de orden',
        message: 'Estas seguro que quieres eliminar un estado de pedido.',
        data: {}
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteState(state);
          }
        });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar un estado de pedido.'
      );
    }
  }

  private deleteState(state: StateInterface) {
    try {
      this._STATE_SERVICE.deleteStateRequest(state).subscribe((value: any) => {
        if (value) {
          /* message delete here */
          this.getState();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar un estado de pedido.'
      );
    }
  }
}
