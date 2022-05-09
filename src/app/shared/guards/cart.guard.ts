import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl('auth');
      return true;
    }
  }
}
