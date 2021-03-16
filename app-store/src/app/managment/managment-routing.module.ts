import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorityAllPageComponent } from './components/authority-all-page/authority-all-page.component';
import { BillAllPageComponent } from './components/bill-all-page/bill-all-page.component';
import { BillCreateComponent } from './components/bill-create/bill-create.component';
import { CategoryAllPageComponent } from './components/category-all-page/category-all-page.component';
import { PaymentAllPageComponent } from './components/payment-all-page/payment-all-page.component';
import { ProductAllPageComponent } from './components/product-all-page/product-all-page.component';
import { StateAllPageComponent } from './components/state-all-page/state-all-page.component';
import { UserAllPageComponent } from './components/user-all-page/user-all-page.component';

const routes: Routes = [

  { path: 'authorities/all-page', component: AuthorityAllPageComponent },

  { path: 'bills/all-page', component: BillAllPageComponent },

  { path: 'bills/create', component: BillCreateComponent },

  { path: 'categories/all-page', component: CategoryAllPageComponent },

  { path: 'payments/all-page', component: PaymentAllPageComponent },

  { path: 'products/all-page', component: ProductAllPageComponent },

  { path: 'users/all-page', component: UserAllPageComponent },

  { path: 'states/all-page', component: StateAllPageComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagmentRoutingModule { }
