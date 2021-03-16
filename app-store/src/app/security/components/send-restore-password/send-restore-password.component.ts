import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecurityService } from 'src/app/core/services/security/security.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-send-restore-password',
  templateUrl: './send-restore-password.component.html',
  styleUrls: ['./send-restore-password.component.css']
})
export class SendRestorePasswordComponent implements OnInit {

  // Variables

  form: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<SendRestorePasswordComponent>,
    private fb: FormBuilder,
    private utilService: UtilService,
    private securityService: SecurityService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(255)])),
    });
  }

  ngOnInit(): void { }

  // Events

  onSubmit(event: Event): void {

    event.preventDefault();

    if (this.form.valid) {
      this.sendRestorePassword();
      this.matDialogRef.close();
    } else {
      window.alert('Invalid form!');
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


  // Fetch

  private sendRestorePassword(): void {
    this.securityService.senRestorePassword(this.getEmail().value).subscribe(
      () => this.snackBar.open('Restore password sended! check your email', 'close', {duration: 3500})
    );
  }

}
