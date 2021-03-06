import { map,take } from 'rxjs/operators';
import { UserService } from './../core/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class NoAuthGuard implements CanActivate {

  constructor(private userService:UserService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    return  this.userService.isAuthenticated.pipe(take(1), map(isAuth => {
      if(isAuth)  this.router.navigate(['/login']);
      return !isAuth;
    })); 

  }
  
}
