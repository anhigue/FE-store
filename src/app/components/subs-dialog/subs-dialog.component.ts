import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubInterface } from 'src/interfaces/SubInterface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-subs-dialog',
  templateUrl: './subs-dialog.component.html',
  styleUrls: ['./subs-dialog.component.scss']
})
export class SubsDialogComponent implements OnInit {

  public subUpdate: SubInterface;
  formGroupSub: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SubsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.subUpdate = this.data;
    this.formGroupSub = this._FORM_BUILDER.group({
      name: ['', Validators.required],
    });
  }

}
