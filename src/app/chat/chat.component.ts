import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  stringInterpolation: string = '插值：component傳給DOM'
  stringPropertyBinding: string = '屬性綁定：component傳給DOM'
  stringTwoWayBinding: string = '雙向綁定：DOM互傳component'
  constructor() { }

  ngOnInit() {
  }

  onSubmitClick() {
    alert('事件綁定：DOM傳送給予component')
  }

}
