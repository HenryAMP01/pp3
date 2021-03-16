import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user.model';
import { SecurityService } from 'src/app/core/services/security/security.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {

  user: IUser;
  form: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private securityService: SecurityService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      password: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(255)])),
    });
  }

  ngOnInit(): void {
    const code = this.activatedRoute.snapshot.params.code;
    this.userService.findByRestorePassword(code).subscribe(
      user => this.user = user
    );
  }

  // Events

  onSubmit(event: Event): void {

    event.preventDefault();

    if (this.form.valid) {
      this.restorePassword();
    } else {
      window.alert('Invalid form!');
    }
  }

  onInputPassword(): void{
    this.user.password = this.getPassword().value;
    console.log(this.user.password);
  }

  // Utils

  checkErrors(control: AbstractControl, error: string): boolean {
    return this.utilService.checkErrors(control, error);
  }

  hidePassword(event: Event): void {
    this.hide = !this.hide;
    event.preventDefault();
  }

  // Getters y setters

  getPassword(): AbstractControl {
    return this.form.get('password');
  }


  // Fetch

  private restorePassword(): void {
    this.securityService.restorePassword(this.user).subscribe(
      () => {
        this.router.navigate(['/security/login']);
        this.snackBar.open('password updated!', 'close', { duration: 3500 });
      });
  }

}
