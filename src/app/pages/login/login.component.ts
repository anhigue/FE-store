import { Component, OnInit } from '@angular/core';
import { User } from 'src/interfaces/UserInterface';
import {NgForm} from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  doLogin(f: NgForm) {
    console.log("Login Called");
    console.log("The username is: " + f.value.username);
    console.log("The password is: "+ f.value.password);

    this.user.username = f.value.username;
    this.user.password = f.value.password;

    this.userService.LogIn(this.user).subscribe(
      response => {
        this.user.id = response.id;
        this.user.firstName = response.firstName;
        this.user.lastName = response.lastName;
        this.user.username = response.username;
        this.userService.setLogIn(this.user);
      }, error => {
        console.log(error);
      }
    )
  }

}
