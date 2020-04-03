import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientInterface } from '../../../interfaces/ClientInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '../../services/dialog/dialog.service';
import { ClientService } from '../../services/client/client.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-client-select',
  templateUrl: './client-select.component.html',
  styleUrls: ['./client-select.component.scss']
})
export class ClientSelectOrderComponent implements OnInit {
  clients: ClientInterface[] = [];
  dataSource: MatTableDataSource<ClientInterface>;
  displayedColumns: string[] = ['name', 'nit', 'email', 'phone', 'options'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _DIALOG_SERVIE: DialogService,
    private _CLIENT_SERVICE: ClientService,
  ) {}

  ngOnInit() {
    this.getClient();
  }

  private getClient(): void {
    try {
      this._CLIENT_SERVICE.readClient().subscribe((value: any[]) => {
        if (value) {
          this.clients = value;
          this.dataSource = new MatTableDataSource<ClientInterface>(
            this.clients
          );
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
      this.clients.push({
        id: 1,
        name: 'Andres Higueros',
        email: 'Higueros71@gmail.com',
        image: '',
        nit: '99405636',
        phone: '33363042',
        subscription: {
          id: 1,
          name: 'Mayorista',
          discount: 20
        }
      });
      this.dataSource = new MatTableDataSource<ClientInterface>(
        this.clients
      );
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } catch (error) {
      this._DIALOG_SERVIE.errorMessage(
        JSON.stringify(error.name),
        'Error',
        'Error al obtener a los clientes.'
      );
    }
  }
}
