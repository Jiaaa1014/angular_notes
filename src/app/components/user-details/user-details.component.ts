import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { IUser } from '../../interfaces/user'
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

  user: IUser
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // params.userId要放上"+"以便將string轉為number
      this.user = this.userService.getUserById(+params.userId)
    })


    // /users/7?userName=mary&age=31，console問號之後的物件
    // this.activatedRoute.queryParams.subscribe((qs) => console.log('Go to ther Qs as', qs))
  }

}
