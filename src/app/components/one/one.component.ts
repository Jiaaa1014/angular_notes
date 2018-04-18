import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html'
})
export class OneComponent implements OnInit {

  prop: string
  subscription: Subscription

  constructor(private userService: UserService) { }


  ngOnInit() {
    this.subscription = this.userService.propChanged.subscribe(
      prop => this.prop = prop,
      err => console.log(err),
      () => console.log('propChanged is completed.')
    )
    console.log(this.subscription)
  }
  changeProp() {
    this.userService.setProp('bar')
  }
  ngOnDestory() { this.subscription.unsubscribe() }
}
