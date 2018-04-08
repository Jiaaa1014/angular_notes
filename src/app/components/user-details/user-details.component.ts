import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { IUser } from '../../interfaces/user'
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

  user: any
  users: Array<IUser> = [
    {
      'id': 1,
      'name': 'Leanne Graham',
      'email': 'Sincere@april.biz',
    },
    {
      'id': 2,
      'name': 'Ervin Howell',
      'email': 'Shanna@melissa.tv',
    },
    {
      'id': 3,
      'name': 'Clementine Bauch',
      'email': 'Nathan@yesenia.net',
    },
    {
      'id': 4,
      'name': 'Patricia Lebsack',
      'email': 'Julianne.OConner@kory.org',
    },
    {
      'id': 5,
      'name': 'Chelsey Dietrich',
      'email': 'Lucio_Hettinger@annie.ca',
    },
    {
      'id': 6,
      'name': 'Mrs. Dennis Schulist',
      'email': 'Karley_Dach@jasper.info',
    },
    {
      'id': 7,
      'name': 'Kurtis Weissnat',
      'email': 'Telly.Hoeger@billy.biz',
    },
    {
      'id': 8,
      'name': 'Nicholas Runolfsdottir V',
      'email': 'Sherwood@rosamond.me',
    },
    {
      'id': 9,
      'name': 'Glenna Reichert',
      'email': 'Chaim_McDermott@dana.io',
    },
    {
      'id': 10,
      'name': 'Clementina DuBuque',
      'email': 'Rey.Padberg@karina.biz',
    }
  ]

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers()
    this.activatedRoute.params.subscribe((params) => {
      console.log(this.activatedRoute.params)
      // params.userId要放上"+"以便將string轉為number
      this.user = this.users.filter(user => user.id === +params.userId)[0]
    })
    // /users/7?userName=mary&age=31，console問號之後的物件
    /*
    qs為
      {
        "userName": "mary",
        "age": "31"
      }
  */
    this.activatedRoute.queryParams.subscribe((qs) => console.log('Go to ther Qs as', qs))
  }

}
