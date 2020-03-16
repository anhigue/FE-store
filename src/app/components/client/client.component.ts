import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientInterface } from '../../../interfaces/ClientInterface';
import { DialogService } from '../../services/dialog/dialog.service';
import { ClientService } from '../../services/client/client.service';
import { DialogCustomComponent } from '../dialog-custom/dialog-custom.component';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'nit', 'email', 'phone', 'subscription', 'options'];
  clients: ClientInterface[] = [];
  dataSource: MatTableDataSource<ClientInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _DIALOG_SERVICE: DialogService,
    private _CLIENT_SERVICE: ClientService
  ) {}

  ngOnInit() {
    this.getClient();
  }

  private getClient(): void {
    try {
      this._CLIENT_SERVICE.readClient().subscribe( (value: ClientInterface[]) => {
        if (value) {
          this.clients = value;
          this.dataSource = new MatTableDataSource<ClientInterface>(this.clients);
          this.dataSource.paginator = this.paginator;
        }
      });
      this.dataSource = new MatTableDataSource<ClientInterface>(this.clients);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al obtener los datos de los clientes.'
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
      this._DIALOG_SERVICE.shareData = {
        name: '',
        nit: '',
        email: '',
        phone: '',
        image: '',
        subscription: {
          id: 0,
          name: ''
        }
      };
      this._DIALOG_SERVICE
        .openDialog(ClientDialogComponent)
        .beforeClosed()
        .subscribe((value: ClientInterface) => {
          if (value) {
            value.subscription = null;
            this.createClient(value);
          }
        });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al crear');
    }
  }

  private createClient(client: ClientInterface) {
    try {
      this._CLIENT_SERVICE.newClient(client).subscribe((value: any) => {
        if (value) {
          /* message success show here */
          this.getClient();
        }
      });
    } catch (error) {
      this.errorMessage(error, 'Error', 'Error al crear un cliente.');
    }
  }

  wantUpdate(sub: ClientInterface) {
    try {
      sub.subscriptionId = sub.subscription.id + "";
      this._DIALOG_SERVICE.shareData = sub;
      this._DIALOG_SERVICE
        .openDialog(ClientDialogComponent)
        .beforeClosed()
        .subscribe((value: ClientInterface) => {
          if (value) {
            value.subscription = null;
            this.updateClient(value);
          }
        });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al actualizar un cliente.'
      );
    }
  }

  private updateClient(rol: ClientInterface) {
    try {
      this._CLIENT_SERVICE.updateClient(rol).subscribe((value: any) => {
        if (value) {
          /* message update here */
          this.getClient();
        }
      });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al actualizar un cliente.'
      );
    }
  }

  wantDelete(sub: ClientInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar un cliente',
        message: 'Estas seguro que quieres eliminar este cliente.',
        data: {}
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteClient(sub);
          }
        });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al eliminar un cliente.'
      );
    }
  }

  private deleteClient(rol: ClientInterface) {
    try {
      this._CLIENT_SERVICE.deleteClient(rol).subscribe((value: any) => {
        if (value) {
          /* message delete here */
          this.getClient();
        }
      });
    } catch (error) {
      this.errorMessage(
        error,
        'Error',
        'Error al eliminar un cliente.'
      );
    }
  }
}
