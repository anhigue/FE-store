import { Component, OnInit, Inject } from '@angular/core';
import { ClientInterface } from '../../../interfaces/ClientInterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  SubInterface
} from '../../../interfaces/SubInterface';
import { SubsService } from 'src/app/services/subs/subs.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.scss']
})
export class ClientDialogComponent implements OnInit {
  public clientUpdate: ClientInterface;
  formGroupClient: FormGroup;
  subscriptions: SubInterface[];

  constructor(
    public dialogRef: MatDialogRef<ClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientInterface,
    private _FORM_BUILDER: FormBuilder,
    private _SUB_SERVICE: SubsService,
    private _DIALOG_SERVICE: DialogService,
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
    this.getSubscriptions();
  }

  getSubscriptions(): void {
    try {
      this._SUB_SERVICE.readSub().subscribe((value: SubInterface[]) => {
        if (value) {
          this.subscriptions = value;
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
