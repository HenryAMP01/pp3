import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductAllPageComponent } from './components/product-all-page/product-all-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PayuResponseComponent } from './components/payu-response/payu-response.component';

@NgModule({
  declarations: [
    CartComponent,
    ProductAllPageComponent,
    ProductDetailComponent,
    PayuResponseComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class StoreModule { }
