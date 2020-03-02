import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public shareData?: any;
  public height?: string;
  public width?: string;

  constructor(private dialog: MatDialog) {}

  openDialog(comp: ComponentType<unknown>): MatDialogRef<unknown> {
    const dialogRef = this.dialog.open(comp, {
      width: this.width,
      height: this.height,
      data: this.shareData
    });

    return dialogRef;
  }
}
