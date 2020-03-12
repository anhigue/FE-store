import { Component, OnInit, Inject } from '@angular/core';
import { ClientInterface } from '../../../interfaces/ClientInterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {
  public clientUpdate: ClientInterface;
  formGroupClient: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientInterface,
    private _FORM_BUILDER: FormBuilder
  ) {}

  ngOnInit() {
    this.clientUpdate = this.data;
    this.formGroupClient = this._FORM_BUILDER.group({
      name: ['', Validators.required],
      nit: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      image: ['', Validators.required],
      subscription: ['', Validators.required]
    });
  }
}
