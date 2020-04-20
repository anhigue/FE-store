import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { DialogService } from '../services/dialog/dialog.service';
import { DialogCustomComponent } from '../components/dialog-custom/dialog-custom.component';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {

  constructor(
    private _USER_SERVICE: UserService,
    private _DIALOG_SERVICE: DialogService
  ) {}

  canActivate(): boolean {
    try {
      const user = this._USER_SERVICE.getUser();
      if (user.rol.id === 2 || user.rol.id === 1) {
        return true;
      } else {
        this._DIALOG_SERVICE.shareData = {
          title: 'No autorizado',
          message: 'No cuentas con permiso para ingresar a esta modulo.',
          data: {},
        };
        this._DIALOG_SERVICE.openDialog(DialogCustomComponent);
        return false;
      }
    } catch (error) {
      this._DIALOG_SERVICE.errorMessage(
        error,
        'Error',
        'Error al autorizar acceso'
      );
    }
  }

}
