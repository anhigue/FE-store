import { Component, OnInit, Inject } from '@angular/core';
import { LineInterface } from '../../../interfaces/VehicleInterface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-line-dialog',
  templateUrl: './line-dialog.component.html',
  styleUrls: ['./line-dialog.component.scss']
})
export class LineDialogComponent implements OnInit {

  public lineUpdate: LineInterface;
  formGroupLine: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LineDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LineInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.lineUpdate = this.data;
    this.formGroupLine = this._FORM_BUILDER.group({
      name: ['', Validators.required],
    });
  }
}
