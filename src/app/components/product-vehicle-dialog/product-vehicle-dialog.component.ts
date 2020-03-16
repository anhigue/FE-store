import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ProductInterface } from '../../../interfaces/ProductInterface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { VehicleInterface } from '../../../interfaces/VehicleInterface';
import { DialogService } from '../../services/dialog/dialog.service';
import { VehicleService } from '../../services/vehicle/vehicle.service';
import { MatPaginator } from '@angular/material/paginator';
import { ActionVehicleProductInterface } from '../../../interfaces/ActionVehicleProductInterface';

@Component({
  selector: 'app-product-vehicle-dialog',
  templateUrl: './product-vehicle-dialog.component.html',
  styleUrls: ['./product-vehicle-dialog.component.scss']
})
export class ProductVehicleDialogComponent implements OnInit {
  public partUpdate: ActionVehicleProductInterface;
  formGroupProduct: FormGroup;

  displayedColumns: string[] = [
    'universalCode',
    'brand',
    'line',
    'year',
    'options'
  ];

  vehicles: VehicleInterface[] = [];
  vehicleProducts: VehicleInterface[] = [];
  dataSource: MatTableDataSource<VehicleInterface>;
  vehicleSelect: VehicleInterface;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<ProductVehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductInterface,
    private _FORM_BUILDER: FormBuilder,
    private _DIALOG_SERVICE: DialogService,
    private _VEHICLE_SERVICE: VehicleService
  ) {}

  ngOnInit() {
    this.validateActions();
    this.getVehicles();
    this.setVehiclesProduct();
  }

  validateActions(): void  {
    this.formGroupProduct = this._FORM_BUILDER.group({
      vehicle: ['', Validators.required],
    });
  }

  private getVehicles() {
    try {
      /* Descomenta esta parte para que cargue los vehiculos */
      /* this._VEHICLE_SERVICE.readVehicle().subscribe( (value: VehicleInterface[]) => {
        if (value) {
          this.vehicles = value;
        }
      }); */
    } catch (error) {
      console.log(error);
    }
  }

  public setVehiclesProduct() {
    try {
      this.vehicleProducts = this.data.vehicles;
      this.dataSource = new MatTableDataSource<VehicleInterface>(this.vehicleProducts);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(error, 'Error', 'Error al cargar los vehiculos del repuesto.');
    }
  }

  public setDataReturn(type: string, data: any): ActionVehicleProductInterface {
    try {
      this.partUpdate = {
        type,
        data
      };
      return this.partUpdate;
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(error, 'Error', 'Error interno.');
      console.log(error);
    }
  }

}
