import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SecurityService } from '../services/security/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private securityService: SecurityService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const authorities = route.data.authorities;
    console.log('authorities en guard: ', authorities);

    return this.checkLogin(authorities, state.url);
  }


  checkLogin(authorities: string[], url: string): Observable<boolean> {
    return this.securityService.identity().pipe(
      map(account => {
        console.log('credentials in cache account por identitiy: ', account);
        if (!authorities || authorities.length === 0) {
          console.log('no hay authorities auntado al guard entre, acceso concedido');
          return true;
        }
        if (account) {
          const hasAnyAuthority = this.securityService.hasAnyAuthority(authorities);
          console.log('has any authority in guard: ', hasAnyAuthority);
          if (hasAnyAuthority) {
            return true;
          }
          console.log('redirigio porque no tiene autoridad');
          this.router.navigate(['/user/profile']); // cambiar ruta para una pagina de acceso denegado
          return false;
        }
        this.router.navigate(['/security/login']);
        return false;
      })
    );
  }




}
