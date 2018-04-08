import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {
  @Input() message: string
  @Input() index: number
  @Output() messageDeleted: EventEmitter<number> = new EventEmitter()

  delete() {
    this.messageDeleted.emit(this.index)
  }
}
