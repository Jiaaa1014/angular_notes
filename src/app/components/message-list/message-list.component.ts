import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ContentChild, ContentChildren } from '@angular/core';
import { MessageComponent } from '../message/message.component'
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html'
})
export class MessageListComponent implements OnInit, AfterViewInit {

  @ViewChild(MessageComponent) firstMessageComponent: MessageComponent
  @ViewChildren(MessageComponent) allMessageComponents: QueryList<MessageComponent>

  @ContentChild(MessageComponent) firstProjectMessComponent: MessageComponent
  @ContentChild('designedMessage') tempProjectMessComponent: MessageComponent
  @ContentChildren(MessageComponent) allProjectMessComponents: QueryList<MessageComponent>
  messages: Array<string> = [
    'mes 1',
    'mes 2',
    'mes 3',
    'mes 4',
    'mes 5'
  ]
  constructor() {
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
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
}
