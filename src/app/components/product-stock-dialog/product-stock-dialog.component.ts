import { Component, OnInit, Inject } from '@angular/core';
import { ProductInterface } from '../../../interfaces/ProductInterface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-stock-dialog',
  templateUrl: './product-stock-dialog.component.html',
  styleUrls: ['./product-stock-dialog.component.scss']
})
export class ProductStockDialogComponent implements OnInit {
  public partUpdate: ProductInterface;
  formGroupProduct: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProductStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.partUpdate = this.data;
    this.formGroupProduct = this._FORM_BUILDER.group({
      stock: ['', Validators.required]
    });
  }
}
