import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthorityService } from 'src/app/core/services/authority/authority.service';
import { UtilService } from 'src/app/core/services/util/util.service';

import { Authority, IAuthority } from 'src/app/core/models/authority.model';

@Component({
  selector: 'app-authority-create-or-update',
  templateUrl: './authority-create-or-update.component.html',
  styleUrls: ['./authority-create-or-update.component.css']
})
export class AuthorityCreateOrUpdateComponent implements OnInit {

  // Variables

  form: FormGroup;
  authority: IAuthority;

  constructor(
    public matDialogRef: MatDialogRef<AuthorityCreateOrUpdateComponent>,
    private fb: FormBuilder,
    private utilService: UtilService,
    private authorityService: AuthorityService,
    @Inject(MAT_DIALOG_DATA) public data: IAuthority
  ) {

    this.authority = JSON.parse(JSON.stringify(data));
    this.buildForm();
  }

  ngOnInit(): void { }

  // Events

  onSubmit(event: Event): void {

    event.preventDefault();

    if (this.form.valid) {

      const authority = this.newAuthority();

      if(this.authority){
        this.updateById(authority);
      }else{
        this.save(authority);
      }

    } else {

      window.alert('Invalid form!');

    }
  }

  // Utils

  checkErrors(control: AbstractControl, error: string): boolean {
    return this.utilService.checkErrors(control, error);
  }

  // Getters y setters

  getName(): AbstractControl {
    return this.form.get('name');
  }

  // Form settings

  private buildForm(): void {

    this.form = this.fb.group({
      name: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])),
    });

    if (this.authority) {
      this.initForm();
    }
  }

  private initForm(): void {
    this.form.patchValue({
      name: this.authority.name,
    });
  }

  // Create Authority

  private newAuthority(): IAuthority {
    return new Authority(this.getName().value);
  }

  // Fetch

  private save(authority: IAuthority): void {
    this.authorityService.save(authority).subscribe(
      result => this.matDialogRef.close(result)
    );
  }

  private updateById(authority: IAuthority): void {
    this.authorityService.updateById(this.authority.id, authority).subscribe(
      result => this.matDialogRef.close(result)
    );
  }

}

