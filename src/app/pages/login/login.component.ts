import { Component, OnInit } from '@angular/core';
import { User } from 'src/interfaces/UserInterface';
import {NgForm} from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  doLogin(f: NgForm) {

    this.user.username = f.value.username;
    this.user.password = f.value.password;

    this.router.navigateByUrl('/home');

    /* this.userService.LogIn(this.user).subscribe(
      response => {
        this.user.id = response.id;
        this.user.firstName = response.firstName;
        this.user.lastName = response.lastName;
        this.user.username = response.username;
        this.userService.setLogIn(this.user);
      }, error => {
        console.log(error);
      }
    ); */
  }

}
