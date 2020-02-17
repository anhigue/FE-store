import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/interfaces/UserInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue-user',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService,
    private route: Router) { }

  ngOnInit() {
  }

  createUser(f: NgForm) {
    this.user.firstName = f.value.firstname;
    this.user.lastName = f.value.lastname;
    this.user.username = f.value.username;
    this.user.password = f.value.password;
    this.user.rolId = 1;

    this.userService.createUser(this.user).subscribe(
      response => {
        this.route.navigateByUrl('/home/catalogue/user');
      }, error => {
        alert(error.message);
      }
    );
  }

}
