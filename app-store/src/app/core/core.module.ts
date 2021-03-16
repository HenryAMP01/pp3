import { NgModule } from '@angular/core';

import { ProductService } from './services/product/product.service';
import { CartService } from './services/cart/cart.service';
import { CategoryService } from './services/category/category.service';
import { UtilService } from './services/util/util.service';

@NgModule({
  providers: [
    ProductService,
    CategoryService,
    CartService,
    UtilService
  ],
})
export class CoreModule { }
