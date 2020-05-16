import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductInterface } from '../../../interfaces/ProductInterface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FactoryService } from 'src/app/services/factory/factory.service';
import { FactoryInterface } from 'src/interfaces/FactoryInterface';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  public partUpdate: ProductInterface;
  formGroupProduct: FormGroup;
  fabrics: FactoryInterface[];

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductInterface,
    private _FORM_BUILDER: FormBuilder,
    private _DIALOG_SERVICE: DialogService,
    private _FACTORY_SERVICE: FactoryService
  ) {}

  ngOnInit() {
    this.partUpdate = this.data;
    console.log(this.partUpdate);
    this.formGroupProduct = this._FORM_BUILDER.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      partNo: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      fabric: ['', Validators.required]
    });
    
    this.getFabric();
    if (this.partUpdate.fabric == null) {
      this.partUpdate.fabric = {
        ip: null
      };
    }
  }

  getFabric(): void {
    try {
      this._FACTORY_SERVICE.readFactory().subscribe((value: FactoryInterface[]) => {
        if (value) {
          this.fabrics = value;
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
