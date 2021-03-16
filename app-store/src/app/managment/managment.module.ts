import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ManagmentRoutingModule } from './managment-routing.module';
import { SharedModule } from '../shared/shared.module';


import { AuthorityAllPageComponent } from './components/authority-all-page/authority-all-page.component';
import { AuthorityCreateOrUpdateComponent } from './components/authority-create-or-update/authority-create-or-update.component';
import { BillAllPageComponent } from './components/bill-all-page/bill-all-page.component';
import { CategoryAllPageComponent } from './components/category-all-page/category-all-page.component';
import { CategoryCreateOrUpdateComponent } from './components/category-create-or-update/category-create-or-update.component';
import { PaymentAllPageComponent } from './components/payment-all-page/payment-all-page.component';
import { PaymentCreateOrUpdateComponent } from './components/payment-create-or-update/payment-create-or-update.component';
import { ProductAllPageComponent } from './components/product-all-page/product-all-page.component';
import { ProductCreateOrUpdateComponent } from './components/product-create-or-update/product-create-or-update.component';
import { UserAllPageComponent } from './components/user-all-page/user-all-page.component';
import { UserCreateOrUpdateComponent } from './components/user-create-or-update/user-create-or-update.component';
import { StateAllPageComponent } from './components/state-all-page/state-all-page.component';
import { StateCreateOrUpdateComponent } from './components/state-create-or-update/state-create-or-update.component';
import { BillCreateComponent } from './components/bill-create/bill-create.component';

@NgModule({
  declarations: [
    AuthorityAllPageComponent,
    AuthorityCreateOrUpdateComponent,
    BillAllPageComponent,
    CategoryAllPageComponent,
    CategoryCreateOrUpdateComponent,
    PaymentAllPageComponent,
    PaymentCreateOrUpdateComponent,
    ProductAllPageComponent,
    ProductCreateOrUpdateComponent,
    UserAllPageComponent,
    UserCreateOrUpdateComponent,
    StateAllPageComponent,
    StateCreateOrUpdateComponent,
    BillCreateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManagmentRoutingModule,
    SharedModule,
  ],
})
export class ManagmentModule { }
