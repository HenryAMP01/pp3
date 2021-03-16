import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoginGuard } from '../core/guards/is-login.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';

const routes: Routes = [

  {path: 'register', component: RegisterComponent, canActivate: [IsLoginGuard]},

  {path: 'login', component: LoginComponent, canActivate: [IsLoginGuard]},

  {path: 'restore-password/:code', component: RestorePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
