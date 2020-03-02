import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../../services/dialog/dialog.service';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { VehicleInterface } from '../../../../interfaces/VehicleInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VehicleComponent } from 'src/app/components/vehicle/vehicle.component';
import { DialogCustomComponent } from 'src/app/components/dialog-custom/dialog-custom.component';

@Component({
  selector: 'app-catalogue-cars',
  templateUrl: './catalogue-cars.component.html',
  styleUrls: ['./catalogue-cars.component.scss']
})
export class CatalogueCarsComponent implements OnInit {
  validateFormVehicle: FormGroup;
  vehicles: VehicleInterface[] = [];

  displayedColumns: string[] = [
    'universalCode',
    'brand',
    'line',
    'year',
    'options'
  ];
  dataSource: MatTableDataSource<VehicleInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _FORM_BUILDER: FormBuilder,
    private _DIALOG_SERVICE: DialogService,
    private _VEHICLE_SERVICE: VehicleService
  ) {}

  ngOnInit() {
    this.validateVehicle();
    this.getVehicle();
  }

  private validateVehicle() {
    this.validateFormVehicle = this._FORM_BUILDER.group({
      universalCode: ['', Validators.required],
      brand: ['', Validators.required],
      line: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  public createVehicle(): void {
    try {
      if (this.validateFormVehicle.valid) {
        const creatVehicle = this.validateFormVehicle.value;
        this._VEHICLE_SERVICE
          .newVehicle(creatVehicle)
          .subscribe((values: any) => {
            if (values) {
              this.getVehicle();
            }
          });
      } else {
      }
    } catch (error) {}
  }

  public deleteVehicle(vehicle: VehicleInterface): void {
    try {
      this._VEHICLE_SERVICE.deleteVehicle(vehicle).subscribe((value: any) => {
        if (value) {
          this.getVehicle();
        }
      });
    } catch (error) {}
  }

  public getVehicle(): void {
    try {
      /* Descomenta esta linea para que te aparesca la data de la peticion */
      /* this._VEHICLE_SERVICE.readVehicle().subscribe( (value: VehicleInterface[]) => {
        if (value) {
          this.vehicles = value;
          this.dataSource = new MatTableDataSource<VehicleInterface>(this.vehicles);
          this.dataSource.paginator = this.paginator;
        }
      }); */

      this.vehicles.push({
        universalCode: 'AAAA',
        brand: 'Ford',
        line: 'Escape',
        year: 2020
      });

      this.dataSource = new MatTableDataSource<VehicleInterface>(this.vehicles);
      this.dataSource.paginator = this.paginator;
    } catch (error) {}
  }

  public updateVehicle(vehicle: VehicleInterface): void {
    try {
      this._VEHICLE_SERVICE.updateVehicle(vehicle).subscribe((value: any) => {
        if (value) {
          this.getVehicle();
        }
      });
    } catch (error) {}
  }

  wantEdit(vahicle: any) {
    try {
      this._DIALOG_SERVICE.shareData = vahicle;
      this._DIALOG_SERVICE
        .openDialog(VehicleComponent)
        .beforeClosed()
        .subscribe((value: VehicleInterface) => {
          if (value) {
            this.updateVehicle(value);
          }
        });
    } catch (error) {}
  }

  wantDelete(vehicle: VehicleInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar un Vehiculo',
        message: 'Estas seguro que quieres eliminar un vehiculo.',
        data: {}
      };
      this._DIALOG_SERVICE
        .openDialog(DialogCustomComponent)
        .beforeClosed()
        .subscribe((value: any) => {
          if (value) {
            this.deleteVehicle(vehicle);
          }
        });
    } catch (error) {

    }
  }
}
