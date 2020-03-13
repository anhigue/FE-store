import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductInterface } from '../../../interfaces/ProductInterface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  public partUpdate: ProductInterface;
  formGroupProduct: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.partUpdate = this.data;
    this.formGroupProduct = this._FORM_BUILDER.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      partNo: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }
}
