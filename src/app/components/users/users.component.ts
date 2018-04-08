import { Component, OnInit } from '@angular/core'

import { IUser } from '../../interfaces/user'
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: Array<IUser>

  constructor(private userService: UserService) { }
  ngOnInit() {
    this.users = this.userService.getUsers()
    console.log(this.users)

  }



}
