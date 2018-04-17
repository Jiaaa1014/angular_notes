import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html'
})
export class OneComponent implements OnInit {

  prop: string

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.prop = this.userService.getProps()
  }
  changeProp() {
    this.userService.setProps('bar')
  }

}
