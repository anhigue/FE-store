import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolInterface } from '../../../interfaces/RolInterface';

@Component({
  selector: 'app-rol-dialog',
  templateUrl: './rol-dialog.component.html',
  styleUrls: ['./rol-dialog.component.scss']
})
export class RolDialogComponent implements OnInit {

  public rolUpdate: RolInterface;
  formGroupRol: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RolDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RolInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.rolUpdate = this.data;
    this.formGroupRol = this._FORM_BUILDER.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

}
