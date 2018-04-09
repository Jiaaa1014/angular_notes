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
ngOnChanges()
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

#### CanActivate

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

#### CanDeactivate

`confirmation.guard.ts`設置
```js
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// 送去message-list.component.ts實作
interface CanComponentDeactivate {
  confirm(): boolean
}
@Injectable()
export class ComfirmatioGuard implements CanDeactivate<CanComponentDeactivate>  {
  canDeactivate(
    component: CanComponentDeactivate,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.confirm()
  }
}
```
`message-list.component.ts`也要設置
```js
export class MessageListComponent implements CanComponentDeactivate{
 confirm() {
    return confirm('想烙跑？')
  }
}
```
`app-routing.module.ts`
```js
const appRoutes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: ':userId', component: UserDetailsComponent },
      // { path: '', component: PlaceholderComponent }
    ]
  },
  { path: 'messages', component: MessageListComponent, canDeactivate: [ConfirmationGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
]
```
在根部多一個頁面`messages`，如果要離開此頁或切換的話它就會跑出`confirm()`警告

#### Resolve
`users-resolve.guard.ts`，哀這裡也不太清楚

```js
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../../interfaces/user';
import { UserService } from '../../services/user/user.service'

@Injectable()
export class UsersResolveGuard implements Resolve<IUser[]> {
  constructor(private userService: UserService) { }
  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): IUser[] {
    return this.userService.getUsers()
  }
}
```
`app-routing.module.ts`
```js
{
  path: 'users',
  component: UsersComponent,
  // 關乎於能不能看到資訊
  canActivateChild: [AuthGuard],
  // resolve消失，整個users列表也消失
  // 改成usersss也沒人管你，只是user.component.ts要對應成data.usersss
  // UsersResolveGuard回傳this.userService.getUsers()
  resolve: {
    users: UsersResolveGuard
  },
  children: [
    { path: ':userId', component: UserDetailsComponent },
    // { path: '', component: PlaceholderComponent }
  ]
},
```
`users.component.ts`

簡單來說它把原本this.users=this.userService.getUsers()的事情交代給上面的檔案去做，在這個檔案的職責就僅是將`activatedRoute`的資訊傳給class內的變數囉。
```js
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

import { IUser } from '../../interfaces/user'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: Array<IUser>

  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    // 在app-routing.module.ts幫這裡得到回傳的資料，activatedRoute又是個大object裡面有許多要用到的東西
    this.activatedRoute.data.forEach(data => { this.users = data.users })
  }
}
```

## Injector and Provider

`Injector`暴露APIs以供我們建立依賴實例
`Provider`可以當作是食譜，這個依賴有哪些食材，最後map這些到函式工廠建立物件











