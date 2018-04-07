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




## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

