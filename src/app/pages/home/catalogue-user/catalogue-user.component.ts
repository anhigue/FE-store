import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/interfaces/UserInterface';

@Component({
  selector: 'app-catalogue-user',
  templateUrl: './catalogue-user.component.html',
  styleUrls: ['./catalogue-user.component.scss']
})
export class CatalogueUserComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

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

}
