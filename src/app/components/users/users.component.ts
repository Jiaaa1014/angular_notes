import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service'
import { IUser } from '../../interfaces/user'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: Array<IUser>

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }
  ngOnInit() {
    this.userService.getUsersViaREST().subscribe(
      users => this.users = users
    )
    // this.activatedRoute.data.forEach(data => { this.users = data.users })
    // this.activatedRoute.data.forEach(data => console.log(data, ' from activateRoute function'))
  }
}
