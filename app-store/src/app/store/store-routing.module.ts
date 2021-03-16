import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './components/cart/cart.component';
import { PayuResponseComponent } from './components/payu-response/payu-response.component';
import { ProductAllPageComponent } from './components/product-all-page/product-all-page.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


const routes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'products/all-page', component: ProductAllPageComponent},
  {path: 'products/detail/:id', component: ProductDetailComponent},
  {path: 'payu-response', component: PayuResponseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
