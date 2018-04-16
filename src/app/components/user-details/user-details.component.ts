import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { IUser } from '../../interfaces/user'
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
  // user: <IUser>
  // 這種寫法，當route有參數id時會出現_co.user is undefined
  user: any = {}
  posts: any
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.activatedRoute.params
      // .toPromise().then(user => this.user = <IUser>user)
      .subscribe(params => {
        this.userService.getUserByIdViaREST(+params.userId).subscribe(
          user => this.user = user,
          err => console.log(err),
          () => console.log('Fetch of UserDetails Completed.')
        )
      })
  }
  createUser() {
    this.user.id = null
    this.userService.createUser(this.user).subscribe(
      user => alert(`建立一個使用者，id為${user.id}`),
      err => alert(err),
      () => console.log('Created.')
    )
  }
  updateUser() {
    this.user.name = 'Sam Kolder'
    this.user.email = 'Sam@gmail.com'
    this.userService.updateUser(this.user).subscribe(
      user => alert(`更新一個使用者`),
      err => alert(`get an error ${err}`),
      () => console.log('Updated')
    )
  }
  deleteUser() {
    this.userService.deleteUser(this.user.id).subscribe(
      user => alert(`刪除使用者`),
      err => alert(err),
      () => console.log('Deleted.')
    )
  }

  getUserPosts() {
    this.posts = this.userService.getUserPosts(this.user.id)
  }
}

/*
  params.userId要放上"+"以便將string轉為number
  this.user = this.userService.getUserById(+params.userId)
*/
/*
  /users/7?userName=mary&age=31，console問號之後的物件
  this.activatedRoute.queryParams.subscribe((qs) => console.log('Go to ther Qs as', qs))
*/
