import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { DialogCustomComponent } from '../../components/dialog-custom/dialog-custom.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public shareData?: any;
  public height?: string;
  public width?: string;

  constructor(private dialog: MatDialog) {}

  public openDialog(comp: ComponentType<unknown>): MatDialogRef<unknown> {
    const dialogRef = this.dialog.open(comp, {
      width: this.width,
      height: this.height,
      data: this.shareData
    });
    return dialogRef;
  }

  public errorMessage(error: any, title: string, message: string) {
    this.shareData = {
      title,
      message,
      data: error
    };
    this.openDialog(DialogCustomComponent);
  }
}
