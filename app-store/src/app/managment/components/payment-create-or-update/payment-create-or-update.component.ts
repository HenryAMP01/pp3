import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPayment, Payment } from 'src/app/core/models/payment.model';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-payment-create-or-update',
  templateUrl: './payment-create-or-update.component.html',
  styleUrls: ['./payment-create-or-update.component.css']
})
export class PaymentCreateOrUpdateComponent implements OnInit {

  // Variables

  form: FormGroup;
  payment: IPayment;

  constructor(
    public matDialogRef: MatDialogRef<PaymentCreateOrUpdateComponent>,
    private fb: FormBuilder,
    private utilService: UtilService,
    private paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: IPayment
  ) {

    this.payment = JSON.parse(JSON.stringify(data));
    this.buildForm();
  }

  ngOnInit(): void { }

  // Events

  onSubmit(event: Event): void {

    event.preventDefault();

    if (this.form.valid) {

      const payment = this.newPayment();

      if(this.payment){
        this.updateById(payment);
      }else{
        this.save(payment);
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
      name: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])),
    });

    if (this.payment) {
      this.initForm();
    }
  }

  private initForm(): void {
    this.form.patchValue({
      name: this.payment.name,
    });
  }

  // Create Payment

  private newPayment(): IPayment {
    return new Payment(this.getName().value);
  }

  // Fetch

  private save(payment: IPayment): void {
    this.paymentService.save(payment).subscribe(
      result => this.matDialogRef.close(result)
    );
  }

  private updateById(payment: IPayment): void {
    this.paymentService.updateById(this.payment.id, payment).subscribe(
      result => this.matDialogRef.close(result)
    );
  }

}
