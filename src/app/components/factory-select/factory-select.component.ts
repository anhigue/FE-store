import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogService } from '../../services/dialog/dialog.service';
import { FactoryService } from '../../services/factory/factory.service';
import { MatPaginator } from '@angular/material/paginator';
import { FactoryInterface } from '../../../interfaces/FactoryInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-factory-select',
  templateUrl: './factory-select.component.html',
  styleUrls: ['./factory-select.component.scss']
})
export class FactorySelectComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'ip', 'lastDateConsult', 'options'];
  factory: FactoryInterface[] = [];
  dataSource: MatTableDataSource<FactoryInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
      this._FACTORY_SERVICE.readFactory().subscribe( (value: FactoryInterface[]) => {
        if (value) {
          this.factory = value;
          this.dataSource = new MatTableDataSource<FactoryInterface>(this.factory);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
      this.factory.push({
        id: 1,
        name: 'BOSH',
        ip: '190.113.91.36',
        lastDateHistoryConsult: new Date(),
        passwordService: ''
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
}
