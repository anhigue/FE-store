import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/interfaces/UserInterface';
import { Observable } from 'rxjs';
import { RolService } from 'src/app/services/rol/rol.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { RolInterface } from 'src/interfaces/RolInterface';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  id: string;
  @Input()
  firstname: string;
  @Input()
  lastname: string;
  @Input()
  username: string;
  @Input()
  rol: number;

  rols: RolInterface[];

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private _DIALOG_SERVICE: DialogService,
      private _ROL_SERVICE: RolService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadUser();
    this.getRol();
  }

  loadUser() {
    var id = +this.id;
    this.userService.readUserById(id).subscribe(
      response => {
        this.firstname = response.firstName;
        this.lastname = response.lastName;
        this.username = response.username;
        this.rol = response.rol.id;
        console.log(response);
      }, error => {
        alert("Error obteniento la información del usuario!");
        this.router.navigateByUrl('/home/catalogue/user');
      }
    )
  }

  updateUser(f: NgForm) {
    var updateUser = new User();
    updateUser.id = +this.id
    updateUser.firstName = f.value.firstname;
    updateUser.lastName = f.value.lastname;
    updateUser.username = f.value.username;
    updateUser.password = f.value.password;
    updateUser.rolId = f.value.rol;

    this.userService.updateUser(updateUser).subscribe(
      response => {
        this.router.navigateByUrl('/home/catalogue/user');
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
