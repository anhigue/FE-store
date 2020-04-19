import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService } from '../../../services/dialog/dialog.service';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import {
  VehicleInterface,
  LineInterface,
  BrandInterface,
} from '../../../../interfaces/VehicleInterface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VehicleComponent } from 'src/app/components/vehicle/vehicle.component';
import { DialogCustomComponent } from 'src/app/components/dialog-custom/dialog-custom.component';
import { LineService } from '../../../services/line/line.service';
import { BrandService } from '../../../services/brand/brand.service';

@Component({
  selector: 'app-catalogue-cars',
  templateUrl: './catalogue-cars.component.html',
  styleUrls: ['./catalogue-cars.component.scss'],
})
export class CatalogueCarsComponent implements OnInit {
  brand: BrandInterface[];
  line: LineInterface[];

  validateFormVehicle: FormGroup;
  vehicles: VehicleInterface[] = [];

  displayedColumns: string[] = [
    'universalCode',
    'brand',
    'line',
    'year',
    'options',
  ];
  dataSource: MatTableDataSource<VehicleInterface>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private _FORM_BUILDER: FormBuilder,
    private _DIALOG_SERVICE: DialogService,
    private _VEHICLE_SERVICE: VehicleService,
    private _LINE_SERVICE: LineService,
    private _BRAND_SERVICE: BrandService
  ) {}

  ngOnInit() {
    this.validateVehicle();
    this.getVehicle();
    this.getLine();
    this.getBrand();
  }

  private validateVehicle() {
    this.validateFormVehicle = this._FORM_BUILDER.group({
      universalCode: ['', Validators.required],
      brand: ['', Validators.required],
      line: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  getBrand(): void {
    try {
      this._BRAND_SERVICE.readBrand().subscribe((value: BrandInterface[]) => {
        if (value) {
          this.brand = value;
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener la informacion'
      );
    }
  }

  getLine(): void {
    try {
      this._LINE_SERVICE.readLine().subscribe((value: LineInterface[]) => {
        if (value) {
          this.line = value;
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener la informacion'
      );
    }
  }

  public createVehicle(): void {
    try {
      if (this.validateFormVehicle.valid) {
        const creatVehicle = this.validateFormVehicle.value;
        console.log(creatVehicle);
        this._VEHICLE_SERVICE
          .newVehicle(creatVehicle)
          .subscribe((values: any) => {
            if (values) {
              this._DIALOG_SERVICE.shareData = {
                title: 'Exitoso',
                message: 'El vehiculo se ha agregado con exito',
                data: {},
              };
              this._DIALOG_SERVICE.openDialog(DialogCustomComponent);
              this.getVehicle();
              this.validateFormVehicle.reset();
            }
          });
      }
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al crear un nuevo vehiculo'
      );
    }
  }

  public deleteVehicle(vehicle: VehicleInterface): void {
    try {
      this._VEHICLE_SERVICE.deleteVehicle(vehicle).subscribe((value: any) => {
        if (value) {
          this.getVehicle();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar un nuevo vehiculo'
      );
    }
  }

  public getVehicle(): void {
    try {
      this._VEHICLE_SERVICE
        .readVehicle()
        .subscribe((value: VehicleInterface[]) => {
          if (value) {
            this.vehicles = value;
            this.dataSource = new MatTableDataSource<VehicleInterface>(
              this.vehicles
            );
            this.dataSource.paginator = this.paginator;
          }
        });

      this.vehicles.push({
        universalCode: 'AAAA',
        brand: {
          id: 1,
          name: 'Ford'
        },
        line: {
          id: 1,
          name: 'Escape'
        },
        year: 2020,
        brandId: 1,
        lineId: 1,
      });

      this.dataSource = new MatTableDataSource<VehicleInterface>(this.vehicles);
      this.dataSource.paginator = this.paginator;
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al obtener los vehiculos.'
      );
    }
  }

  public updateVehicle(vehicle: VehicleInterface): void {
    try {
      this._VEHICLE_SERVICE.updateVehicle(vehicle).subscribe((value: any) => {
        if (value) {
          this.getVehicle();
        }
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar un nuevo vehiculo'
      );
    }
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
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al actualizar un nuevo vehiculo'
      );
    }
  }

  wantDelete(vehicle: VehicleInterface) {
    try {
      this._DIALOG_SERVICE.shareData = {
        title: 'Eliminar un Vehiculo',
        message: 'Estas seguro que quieres eliminar un vehiculo.',
        data: {},
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
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al eliminar un nuevo vehiculo'
      );
    }
  }
}
