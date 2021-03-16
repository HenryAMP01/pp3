import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { flatMap, map } from 'rxjs/operators';
import { IJwtRequest, JwtRequest } from 'src/app/core/models/jwt-request.model';
import { SecurityService } from 'src/app/core/services/security/security.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { SendRestorePasswordComponent } from '../send-restore-password/send-restore-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Variables

  hide = true;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private securityService: SecurityService,
    private snackBar: MatSnackBar,
    private router: Router,
    private matDialog: MatDialog) {
    this.form = this.fb.group({
      email: this.fb.control([],
        Validators.compose([Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(255)])
      ),
      rememberme: this.fb.control(true),
      password: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(255)])),
    });
  }

  ngOnInit(): void { }

  // Events

  hidePassword(event: Event): void {
    this.hide = !this.hide;
    event.preventDefault();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const jwtRequest = this.newJwt();
      this.securityService.login(jwtRequest).pipe(
        map(() => this.securityService.identity(true))
      ).subscribe(
        () => {
          this.snackBar.open('Login success', 'close', {duration: 3500});
          this.router.navigate(['/user/profile']);
        });
    } else {
      alert('invalid form');
    }
  }

  // Utils

  checkErrors(control: AbstractControl, error: string): boolean {
    return this.utilService.checkErrors(control, error);
  }

  // Getters y setters

  getEmail(): AbstractControl {
    return this.form.get('email');
  }

  getPassword(): AbstractControl {
    return this.form.get('password');
  }

  getRememberme(): AbstractControl {
    return this.form.get('rememberme');
  }

  // utils

  openDialogSenRestorePassword(): void {
    const matDialogRef = this.matDialog.open(SendRestorePasswordComponent);
  }

  // Create jwt

  private newJwt(): IJwtRequest {
    return new JwtRequest(this.getEmail().value, this.getPassword().value, this.getRememberme().value);
  }






}
