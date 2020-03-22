import { Component, OnInit, Inject } from '@angular/core';
import { StateInterface } from '../../../interfaces/StateInterface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-state-dialog',
  templateUrl: './state-dialog.component.html',
  styleUrls: ['./state-dialog.component.scss']
})
export class StateDialogComponent implements OnInit {

  public stateUpdate: StateInterface;
  formGroupState: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<StateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StateInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.stateUpdate = this.data;
    this.formGroupState = this._FORM_BUILDER.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

}
