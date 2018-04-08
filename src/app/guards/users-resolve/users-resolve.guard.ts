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
