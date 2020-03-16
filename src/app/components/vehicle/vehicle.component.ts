import { VehicleInterface } from './../../../interfaces/VehicleInterface';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  public vehicleUpdate: VehicleInterface;
  formGroupVehicle: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<VehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehicleInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.vehicleUpdate = this.data;
    this.formGroupVehicle = this._FORM_BUILDER.group({
      universalCode: ['', Validators.required],
      brand: ['', Validators.required],
      line: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

}
