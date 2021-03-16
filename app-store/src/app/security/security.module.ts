import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { SendRestorePasswordComponent } from './components/send-restore-password/send-restore-password.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, SendRestorePasswordComponent, RestorePasswordComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class SecurityModule { }
