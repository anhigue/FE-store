import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/interfaces/UserInterface';
import { Observable } from 'rxjs';

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

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loadUser();
  }

  loadUser() {
    var id = +this.id;
    this.userService.readUserById(id).subscribe(
      response => {
        this.firstname = response.firstName;
        this.lastname = response.lastName;
        this.username = response.username;
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
    updateUser.rolId = 1;

    this.userService.updateUser(updateUser).subscribe(
      response => {
        this.router.navigateByUrl('/home/catalogue/user');
      }, error => {
        alert(error.message);
      }
    );
  }

}
