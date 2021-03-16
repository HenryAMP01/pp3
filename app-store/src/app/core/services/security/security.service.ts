import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJwtResponse } from '../../dtos/jwt/jwt-response.dto';
import { IUserDTO } from '../../dtos/user/user.dto';
import { IJwtRequest } from '../../models/jwt-request.model';
import { IUser } from '../../models/user.model';
import { Account } from '../../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  credentialsCache$?: Observable<Account | null>;
  private userIdentity: Account | null = null;
  private authenticationState = new ReplaySubject<Account | null>(1);



  private urlEndPoint = environment.apiUrl.concat('security');

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(jwtRequest: IJwtRequest): Observable<IJwtResponse> {
    return this.httpClient.post<IJwtResponse>(`${this.urlEndPoint}/login`, jwtRequest).pipe(
      map(jwt => {
        this.setJwt(jwtRequest.rememberme, jwt.jwt);
        return jwt;
      })
    );
  }

  findCredentials(): Observable<Account> {
    const jwt = this.getJwt();
    return this.httpClient.get<Account>(`${this.urlEndPoint}/credentials/${jwt}`);
  }

  senRestorePassword(email: string): Observable<IUserDTO> {
    return this.httpClient.get<IUserDTO>(`${this.urlEndPoint}/send-restore-password/${email}`);
  }

  restorePassword(user: IUser): Observable<any> {
    return this.httpClient.put<any>(`${this.urlEndPoint}/restore-password`, user);
  }


  authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [...authorities];
    }
    console.log('some: ', this.userIdentity.authorities.some((authority: string) => authorities.includes(authority)));
    return this.userIdentity.authorities.some((authority: string) => authorities.includes(authority));
  }

  identity(force?: boolean): Observable<Account | null> {
    if (!this.credentialsCache$ || force || !this.isAuthenticated()) {
      console.log('entre a identitiy porque no hay nada');
      this.credentialsCache$ = this.findCredentials().pipe(
        catchError(() => of(null)),
        tap((account: Account | null) => {
          this.authenticate(account);
        }),
        shareReplay()
      );
    }
    this.credentialsCache$.subscribe();
    return this.credentialsCache$;
  }

  isAuthenticated(): boolean {
    return this.userIdentity !== null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  setJwt(rememberme: boolean, jwt: string): void {
    const key = 'jwt';
    window.localStorage.removeItem(key);
    window.sessionStorage.removeItem(key);
    if (rememberme) {
      window.localStorage.setItem(key, jwt);
    } else {
      window.sessionStorage.setItem(key, jwt);
    }
    //this.isLogin();
  }

  getJwt(): string {
    const jwt = window.localStorage.getItem('jwt') || window.sessionStorage.getItem('jwt');
    if (this.isJwtValid(jwt)) {
      return jwt;
    }
    return '';
  }

  isJwtValid(jwt: string): boolean {
    if (jwt !== null && jwt !== undefined && jwt.split('.').length === 3) {
      return true;
    }
    return false;
  }

  logout() {
    this.router.navigate(['/security/login']);
    this.userIdentity = null;
    this.authenticationState.next(this.userIdentity);
    window.localStorage.removeItem('jwt');
    window.sessionStorage.removeItem('jwt');
  }
}
