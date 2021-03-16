import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IState, State } from 'src/app/core/models/state.model';
import { StateService } from 'src/app/core/services/state/state.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-state-create-or-update',
  templateUrl: './state-create-or-update.component.html',
  styleUrls: ['./state-create-or-update.component.css']
})
export class StateCreateOrUpdateComponent implements OnInit {

  // Variables

  form: FormGroup;
  state: IState;

  constructor(
    public matDialogRef: MatDialogRef<StateCreateOrUpdateComponent>,
    private fb: FormBuilder,
    private utilService: UtilService,
    private stateService: StateService,
    @Inject(MAT_DIALOG_DATA) public data: IState
  ) {

    this.state = JSON.parse(JSON.stringify(data));
    this.buildForm();
  }

  ngOnInit(): void { }

  // Events

  onSubmit(event: Event): void {

    event.preventDefault();

    if (this.form.valid) {

      const state = this.newState();

      if (this.state) {
        this.updateById(state);
      } else {
        this.save(state);
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

  getCode(): AbstractControl {
    return this.form.get('code');
  }

  getName(): AbstractControl {
    return this.form.get('name');
  }

  // Form settings

  private buildForm(): void {

    this.form = this.fb.group({
      code: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])),
      name: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])),
    });

    if (this.state) {
      this.initForm();
    }
  }

  private initForm(): void {
    this.form.patchValue({
      code: this.state.code,
      name: this.state.name,
    });
  }

  // Create State

  private newState(): IState {
    return new State(this.getCode().value, this.getName().value);
  }

  // Fetch

  private save(state: IState): void {
    this.stateService.save(state).subscribe(
      result => this.matDialogRef.close(result)
    );
  }

  private updateById(state: IState): void {
    this.stateService.updateById(this.state.id, state).subscribe(
      result => this.matDialogRef.close(result)
    );
  }


}
