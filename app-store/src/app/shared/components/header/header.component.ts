import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { SecurityService } from 'src/app/core/services/security/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalProductsInUserCart$: Observable<number>;
  isLogin: boolean;


  constructor(private cartService: CartService, private securityService: SecurityService) {
    this.totalProductsInUserCart$ = this.cartService.userCart$.pipe(
      map(products => products.length)
    );
    this.securityService.getAuthenticationState().subscribe(
      () => this.isLogin = this.securityService.isAuthenticated()
    );
    console.log(this.isLogin);

  }

  ngOnInit(): void { }

  logout(): void {
    this.securityService.logout();
  }

}
