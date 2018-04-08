import { CanComponentDeactivate } from '../../guards/confirmation/confirmation.guard'
import { Component } from '@angular/core';
// import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ContentChild, ContentChildren } from '@angular/core';
// import { MessageComponent } from '../message/message.component'
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html'
})
export class MessageListComponent implements CanComponentDeactivate/* OnInit, AfterViewInit*/ {

  /*   @ViewChild(MessageComponent) firstMessageComponent: MessageComponent
    @ViewChildren(MessageComponent) allMessageComponents: QueryList<MessageComponent>

    @ContentChild(MessageComponent) firstProjectMessComponent: MessageComponent
    @ContentChild('designedMessage') tempProjectMessComponent: MessageComponent
    @ContentChildren(MessageComponent) allProjectMessComponents: QueryList<MessageComponent>
  */
  messages: Array<{ message: string }> = []
  message: string = ''

  addMessage() {
    if (!this.message) { return }
    this.messages.push({ message: this.message })
    this.message = ''
  }

  onMessageDelete($event) {
    this.messages.splice($event, 1)
  }
  changeFirstMessage() {
    this.messages[0].message = '改囉'
  }

  confirm() {
    return confirm('想烙跑？')
  }
  /*   ngAfterViewInit() {
      // this.firstMessageComponent.message = '使用週期鉤子ngAfterViewInit改變第一個message @ViewChild'
      this.allMessageComponents.toArray().forEach(message => {
        message.message = '使用週期鉤子ngAfterViewInit改變所有message @ViewChildren'
      })
      // this.firstProjectMessComponent.message = '被ng-contnet標示的內容也可以透過@ContentChild改變'
      // this.allProjectMessComponents.toArray().forEach(content => {
      //   content.message = '被ng-contnet標示的內容也可以透過@ContentChildren改變'
      // })
      this.tempProjectMessComponent.message = '透過命名ElementRef改變元素內容'
    }
  */
}
