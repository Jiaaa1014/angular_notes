import { Component } from '@angular/core';
import { MessageComponent } from './components/message/message.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  title: string = '從app component給 app-message的文字'
}
