import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/interfaces/UserInterface';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { RolService } from 'src/app/services/rol/rol.service';
import { RolInterface } from 'src/interfaces/RolInterface';

@Component({
  selector: 'app-catalogue-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  user: User = new User();
  rols: RolInterface[];

  constructor(private userService: UserService,
    private route: Router,
    private _DIALOG_SERVICE: DialogService,
      private _ROL_SERVICE: RolService) { }


  ngOnInit() {
    this.getRol();
  }

  createUser(f: NgForm) {
    console.log(f.value);
    this.user.firstName = f.value.firstname;
    this.user.lastName = f.value.lastname;
    this.user.username = f.value.username;
    this.user.password = f.value.password;
    this.user.rolId = f.value.rol;

    this.userService.createUser(this.user).subscribe(
      response => {
        this.route.navigateByUrl('/home/catalogue/user');
      }, error => {
        alert(error.message);
      }
    );
  }

  private getRol(): void {
    try {
      this._ROL_SERVICE.readRol().subscribe( (value: RolInterface[]) => {
        if (value) {
          this.rols = value;
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
