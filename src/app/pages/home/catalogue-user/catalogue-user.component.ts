import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/interfaces/UserInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue-user',
  templateUrl: './catalogue-user.component.html',
  styleUrls: ['./catalogue-user.component.scss']
})
export class CatalogueUserComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService,
    private route: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.readUser().subscribe(
      response => {
        this.users = response;
      }, error => {
        alert(error.message);
      }
    )
  }

  updateUser(id: number) {
    this.route.navigateByUrl('/home/catalogue/user/update/' + id);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      response => {
        this.getUsers();
      }, error => {
        alert("Error al eliminar el usuario");
      }
    )
  }

}
