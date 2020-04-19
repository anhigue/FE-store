import {
  VehicleInterface,
  BrandInterface,
  LineInterface,
} from './../../../interfaces/VehicleInterface';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineService } from '../../services/line/line.service';
import { BrandService } from '../../services/brand/brand.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  brand: BrandInterface[];
  line: LineInterface[];

  public vehicleUpdate: VehicleInterface;
  formGroupVehicle: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<VehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleInterface,
    private _LINE_SERVICE: LineService,
    private _BRAND_SERVICE: BrandService,
    private _FORM_BUILDER: FormBuilder,
    private _DIALOG_SERVICE: DialogService
  ) {}

  ngOnInit() {
    this.vehicleUpdate = this.data;
    this.validateForm();
    this.getBrand();
    this.getLine();
  }

  validateForm(): void {
    try {
      this.formGroupVehicle = this._FORM_BUILDER.group({
        universalCode: ['', Validators.required],
        brand: ['', Validators.required],
        line: ['', Validators.required],
        year: ['', Validators.required],
      });
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al validar el formulario.'
      );
    }
  }

  getBrand(): void {
    try {
      this._BRAND_SERVICE.readBrand().subscribe( (value: BrandInterface[]) => {
        if (value) {
          this.brand = value;
        }
      })
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
      this._LINE_SERVICE.readLine().subscribe( (value: LineInterface[]) => {
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

}
