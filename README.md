## Change Detection
`child.component.ts`
[這篇寫得很清楚](https://blog.kevinyang.net/2017/01/23/angular2-change-detection/)
[這篇也是，看例子](https://blog.kevinyang.net/2017/08/09/angular-changedetector-markforcheck/)
```js
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChildComponent implements OnInit {
  @Input() user: { name: string }
  constructor(private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.chRef.detectChanges()
  }
}
```
* `changeDetection: ChangeDetectionStrategy.Default`
改變屬性或是改變物件都可以
* `changeDetection: ChangeDetectionStrategy.OnPush`
只能透過改變物件，只關注被標記`@Input`的東西


* `ChangeDetectorRef`只能意會不能言傳

## Lifecycle hook

```
ngOnChanges()：@Input()繫結第一次發生就會觸發
ngOnInit()
ngDoCheck() 
  ngAfterContentInit() 
  ngAfterContentChecked() 
  ngAfterViewInit() 
  ngAfterViewChecked()
ngOnDestory()
```
假想一個狀態：新增一個訊息，然後刪除它，依序週期為：

```js
constructor
 ngOnChanges()
 ngOnInit()
 ngDoCheck()
 ngAfterContentInit()
 ngAfterContentChecked()
 ngAfterViewInit()
 ngAfterViewChecked()
 ngDoCheck()
 ngAfterContentChecked()
 ngAfterViewChecked()
```
* 然後刪除它：
```js
ngDoCheck()
 ngAfterContentChecked()
 ngAfterViewChecked()
 ngDestroy()
```

* 換成修改而不刪除它，ngDoCheck()裡面的四個子週期先忽略：
```js
ngDoCheck()
ngOnChanges()
ngDoCheck()
```

## Routes
`app-routing.module.ts`
```js
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'


import { HomeComponent } from '../components/home/home.component';
import { BlogComponent } from '../components/blog/blog.component';
import { AboutComponent } from '../components/about/about.component';

const appRoutes = [
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'about', component: AboutComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
```

在`header.component.ts`把`href`改成`routerLink`，在改變元素時就不需要reload



```js
{
  path: 'users', component: UsersComponent, pathMatch:'prefix', children: [
    { path: ':userId', component: UserDetailsComponent },
    { path: '', component: PlaceholderComponent }
  ]
},
`prefix`是default值，意即將`users`作為前綴，`userId`為接下來的路徑，若改為`full`，則輸入了`user/userId`會當作不合乎`user`因此轉回首頁。

在`full`值下將`users`改為`users/2`，代表這個路徑指向`users`，看不到`userId`為2的人的資訊喔。












## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

