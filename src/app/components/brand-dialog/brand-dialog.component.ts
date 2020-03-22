import { Component, OnInit, Inject } from '@angular/core';
import { BrandInterface } from '../../../interfaces/VehicleInterface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-brand-dialog',
  templateUrl: './brand-dialog.component.html',
  styleUrls: ['./brand-dialog.component.scss']
})
export class BrandDialogComponent implements OnInit {

  public brandUpdate: BrandInterface;
  formGroupBrand: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BrandDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BrandInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.brandUpdate = this.data;
    this.formGroupBrand = this._FORM_BUILDER.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

}
