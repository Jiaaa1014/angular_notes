import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent {

  user: { name: string } = { name: 'Johnny' }
  changeProperty() {
    this.user.name = 'Sam'
  }
  changeObject() {
    this.user = { name: 'Tom' }
  }
}
