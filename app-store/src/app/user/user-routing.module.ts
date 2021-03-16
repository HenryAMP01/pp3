import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillAllPageComponent } from './components/bill-all-page/bill-all-page.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [

  {path: 'profile', component: ProfileComponent},

  {path: 'bills/all-page', component: BillAllPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
