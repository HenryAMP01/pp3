import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser, User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Variables

  image = 'assets/statics/welcome1.jpg';
  hide = true;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) {
    this.buildForm();
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
      const user = this.newUser();
      this.register(user);
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

  getFullname(): AbstractControl {
    return this.form.get('fullname');
  }

  getPassword(): AbstractControl {
    return this.form.get('password');
  }

  // Form settings

  private buildForm(): void {
    this.form = this.fb.group({
      email: this.fb.control([],
        Validators.compose([Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(255)])
      ),
      fullname: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])),
      password: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(255)])),
    });
  }

  // Create User

  private newUser(): IUser {
    return new User(this.getEmail().value, this.getFullname().value, this.getPassword().value);
  }

  // Fetch

  private register(user: IUser): void {
    this.userService.save(user).subscribe(
      () => {
        this.snackBar.open('User created!, please check your account', 'close', { duration: 3500 });
        this.router.navigate(['/security/login']);
      });
  }


}
