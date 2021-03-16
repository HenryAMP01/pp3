import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityService } from '../core/services/security/security.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with jwt token if available
    const token = this.securityService.getJwt();
    const isValidToken = this.securityService.isJwtValid(token);
    if (isValidToken) {
      request = request.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
