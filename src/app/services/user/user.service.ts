import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IUser } from '../../interfaces/user'

@Injectable()
export class UserService {


  private _rootUrl: string = 'https://jsonplaceholder.typicode.com/users'
  private _rootPostsUrl: string = 'https://jsonplaceholder.typicode.com/posts'
  private _users: IUser[] = [
    {
      'id': 1,
      'name': 'Leanne Graham',
      'email': 'Sincere@april.biz',
    },
    {
      'id': 2,
      'name': 'Ervin Howell',
      'email': 'Shanna@melissa.tv',
    },
    {
      'id': 3,
      'name': 'Clementine Bauch',
      'email': 'Nathan@yesenia.net',
    },
    {
      'id': 4,
      'name': 'Patricia Lebsack',
      'email': 'Julianne.OConner@kory.org',
    },
    {
      'id': 5,
      'name': 'Chelsey Dietrich',
      'email': 'Lucio_Hettinger@annie.ca',
    },
    {
      'id': 6,
      'name': 'Mrs. Dennis Schulist',
      'email': 'Karley_Dach@jasper.info',
    },
    {
      'id': 7,
      'name': 'Kurtis Weissnat',
      'email': 'Telly.Hoeger@billy.biz',
    },
    {
      'id': 8,
      'name': 'Nicholas Runolfsdottir V',
      'email': 'Sherwood@rosamond.me',
    },
    {
      'id': 9,
      'name': 'Glenna Reichert',
      'email': 'Chaim_McDermott@dana.io',
    },
    {
      'id': 10,
      'name': 'Clementina DuBuque',
      'email': 'Rey.Padberg@karina.biz',
    }
  ]

  constructor(private http: HttpClient) { }
  // users-resolve.guard.ts還用的到，先別刪
  getUsers(): IUser[] {
    return this._users
  }

  getUsersViaREST(): Observable<IUser[]> {
    // 自己設定檔頭
    const headers = new HttpHeaders().set('Authorization', 'Bearer your-access-token-here')
    return this.http.get<IUser[]>(this._rootUrl, { headers })
  }

  getUserById(id: number) {
    return this._users.filter(user => user.id === id)[0]
  }

  getUserByIdViaREST(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this._rootUrl}/${id}`)
  }

  // CRUD
  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this._rootUrl, user)
  }
  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this._rootUrl}/${user.id}`, user)
  }
  deleteUser(id: number): Observable<IUser> {
    return this.http.delete<IUser>(`${this._rootUrl}/${id}`)
  }

  getUserPosts(id: number): Observable<any> {
    const params = new HttpParams().set('userId', id.toString())
    return this.http.get(this._rootPostsUrl, { params })
  }
}
