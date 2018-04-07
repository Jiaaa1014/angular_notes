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

```js
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
```

在`header.component.ts`把`href`改成`routerLink`，在改變元素時就不需要reload



```js
{
  path: 'users', component: UsersComponent, pathMatch:'prefix', children: [
    { path: ':userId', component: UserDetailsComponent },
    { path: '', component: PlaceholderComponent }
  ]
},
`prefix`是default值，意即將`users`作為前綴，`userId`為接下來的路徑，若改為`full`，則輸入了`user/userId`會當作不合乎`user`關係因此轉回首頁。

在`full`值下將`users`改為`users/2`，代表這個路徑指向`users`，但看不到`userId`為2的人的資訊喔。
```



## Guard

`auth.guard.ts`將兩種都設置為回傳false

```js
export class AuthGuard implements CanActivate, CanActivateChild {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return false;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return false
  }
}
```


`app-routing.module.ts`
```js
const appRoutes = [
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  {
    path: 'users', component: UsersComponent, canActivateChild: [AuthGuard], children: [
      { path: ':userId', component: UserDetailsComponent },
      // { path: '', component: PlaceholderComponent }
    ]
  },

  { path: '**', redirectTo: 'home', pathMatch: 'full' }
]
```
這樣設定後，部落格頁面不能點選，而使用者頁面可以點選，但個別的(Child部分)點不了

