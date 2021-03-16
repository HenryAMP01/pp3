import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAuthorityDTO } from 'src/app/core/dtos/authority/authority.dto';
import { IAuthority } from 'src/app/core/models/authority.model';
import { IUser, User } from 'src/app/core/models/user.model';
import { AuthorityService } from 'src/app/core/services/authority/authority.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-user-create-or-update',
  templateUrl: './user-create-or-update.component.html',
  styleUrls: ['./user-create-or-update.component.css']
})
export class UserCreateOrUpdateComponent implements OnInit {

  // Variables

  form: FormGroup;
  user: IUser;
  authorityOptions: IAuthorityDTO[] = [];
  enabledOptions: boolean[] = [false, true];
  authorities: IAuthority[] = [];

  constructor(
    public matDialogRef: MatDialogRef<UserCreateOrUpdateComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private authorityService: AuthorityService,
    private utilService: UtilService,
    @Inject(MAT_DIALOG_DATA) public data: IUser
  ) {

    this.user = JSON.parse(JSON.stringify(data));

    this.buildForm();
  }

  ngOnInit(): void {
    this.authorityService.findAll().subscribe(
      authorities => this.authorityOptions = authorities
    );
  }

  // Events

  onChangeAuthority(event: any){
    if(!this.authorities.find(authority => event.id === authority.id)){
      this.authorities = [...this.authorities, event];
    }
  }

  onClickCancelAuthority(index: number){
    this.authorities = [...this.authorities];
    this.authorities.splice(index,1);
  }

  onSubmit(event: Event): void {

    event.preventDefault();

    if (this.form.valid) {
      const user = this.newUser();
      if (this.user) {
        this.adminUpdateById(user);
      } else {
        this.adminSave(user);
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

  getEmail(): AbstractControl {
    return this.form.get('email');
  }

  getFullname(): AbstractControl {
    return this.form.get('fullname');
  }

  getAuthority(): AbstractControl{
    return this.form.get('authority');
  }

  getEnabled(): AbstractControl {
    return this.form.get('enabled');
  }


  // Create product

  private newUser(): IUser {
    const product: IUser = new User(
      this.getEmail().value,
      this.getFullname().value,
      'FAKE PASSWORD',
      this.getEnabled().value,
      this.authorities,
    );
    return product;
  }

  // Form settings

  private buildForm(): void {
    this.form = this.fb.group({
      email: this.fb.control([],
        Validators.compose([Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(255)])
      ),
      fullname: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])),
      authority: this.fb.control([], Validators.compose([Validators.required])),
      enabled: this.fb.control([], Validators.compose([Validators.required])),
    });

    if (this.user) {
      this.initForm();
      this.authorities = [...this.user.authorities];
    }

  }

  private initForm(): void {
    this.form.patchValue({
      email: this.user.email,
      fullname: this.user.fullname,
      authority: this.user.authorities[0],
      enabled: this.user.enabled
    });
  }

  // Fetch

  private adminSave(user: IUser): void {
    this.userService.adminSave(user).subscribe(
      result => this.matDialogRef.close(result)
    );
  }

  private adminUpdateById(user: IUser): void {
    this.userService.adminUpdateById(this.user.id, user).subscribe(
      result => this.matDialogRef.close(result)
    );
  }

}
