import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FactoryInterface } from '../../../interfaces/FactoryInterface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-factory-dialog',
  templateUrl: './factory-dialog.component.html',
  styleUrls: ['./factory-dialog.component.scss']
})
export class FactoryDialogComponent implements OnInit {

  public factoryUpdate: FactoryInterface;
  formGroupFactory: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FactoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FactoryInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.factoryUpdate = this.data;
    this.formGroupFactory = this._FORM_BUILDER.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      ip: ['', Validators.required],
      password: ['', Validators.required],
      lastConsult: ['', Validators.required],
    });
  }
}
