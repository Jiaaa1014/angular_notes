import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

import { IUser } from '../../interfaces/user'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: Array<IUser>

  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.data.forEach(data => { this.users = data.users })
  }
}
