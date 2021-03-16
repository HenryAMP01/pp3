import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SecurityService } from '../core/services/security/security.service';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private router: Router, private securityService: SecurityService, private snackBar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(e => {

        const status: number = e.status;
        const trace: string = e.error.trace;

        if ([401, 403].includes(status)) {
          this.securityService.logout();
          this.snackBar.open('Acceso denegado o no se encuentra autorizado!', 'close', { duration: 3500 });
        }

        if([500].includes(status) && trace && trace.startsWith('io.jsonwebtoken.JwtException') ){
          console.log(e.error.message);
          this.securityService.logout();
          this.snackBar.open(`${e.error.message}`, 'close', { duration: 3500 });
        }

        //const error = e.error.message || e.statusText;
        return throwError(e);
      }));
  }
}
