import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated) {
      this.router.navigateByUrl('cart');
      return false;
    }
    return true;
  }

}
