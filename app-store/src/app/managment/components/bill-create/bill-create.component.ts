import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAddressDTO } from 'src/app/core/dtos/address/address.dto';
import { IBillProductDTO } from 'src/app/core/dtos/bill-product/bill-product.dto';
import { IPaymentDTO } from 'src/app/core/dtos/payment/payment.dto';
import { IProductDTO } from 'src/app/core/dtos/product/product.dto';
import { IStateDTO } from 'src/app/core/dtos/state/state.dto';
import { IUserDTO } from 'src/app/core/dtos/user/user.dto';
import { Address, IAddress } from 'src/app/core/models/address.model';
import { BillProduct, IBillProduct } from 'src/app/core/models/bill-product.model';
import { Bill, IBill } from 'src/app/core/models/bill.model';
import { IPayment } from 'src/app/core/models/payment.model';
import { IState } from 'src/app/core/models/state.model';
import { IUser } from 'src/app/core/models/user.model';
import { AddressService } from 'src/app/core/services/address/address.service';
import { BillProductService } from 'src/app/core/services/bill-product/bill-product.service';
import { BillService } from 'src/app/core/services/bill/bill.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-bill-create-or-update',
  templateUrl: './bill-create.component.html',
  styleUrls: ['./bill-create.component.css']
})
export class BillCreateComponent implements OnInit {

  // Variables

  displayedColumns: string[] = ['Product', 'Name', 'Price', 'Amount', 'Choice amount'];
  hideCreateAddress = true;

  formBill: FormGroup;
  billsProductsForm: FormGroup;
  createAddress: FormControl;

  userOptions: IUserDTO[] = [];
  paymentOptions: IPaymentDTO[] = [];
  stateOptions: IStateDTO[] = [];
  addressOptions: IAddressDTO[] = [];
  paidOutOptions: boolean[] = [false, true];
  productOptions: IProductDTO[] = [];
  billsProducts: IBillProductDTO[] = [];

  user: IUser;
  payment: IPayment;
  state: IState;
  address: IAddress;

  priceBill = 0;

  constructor(
    private fb: FormBuilder,
    private userSevice: UserService,
    private paymentService: PaymentService,
    private stateService: StateService,
    private addressService: AddressService,
    private utilService: UtilService,
    private billService: BillService,
    private billProductService: BillProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formBill = this.fb.group({
      user: this.fb.control([]),
      payment: this.fb.control([], Validators.compose([Validators.required])),
      paidOut: this.fb.control(false, Validators.compose([Validators.required])),
      state: this.fb.control([], Validators.compose([Validators.required])),
      address: this.fb.control([], Validators.compose([Validators.required])),
    });
    this.billsProductsForm = this.fb.group({});
    this.createAddress = this.fb.control([], Validators.compose([Validators.minLength(5), Validators.maxLength(150)]));
  }

  ngOnInit(): void {

    this.paymentService.findAll().subscribe(
      payments => this.paymentOptions = [...payments]
    );

    this.stateService.findAll().subscribe(
      states => this.stateOptions = [...states]
    );

  }

  // Getters y setters

  getUser(): AbstractControl {
    return this.formBill.get('user');
  }

  getPayment(): AbstractControl {
    return this.formBill.get('payment');
  }

  getPaidOut(): AbstractControl {
    return this.formBill.get('paidOut');
  }

  getState(): AbstractControl {
    return this.formBill.get('state');
  }

  getAddress(): AbstractControl {
    return this.formBill.get('address');
  }

  getCreateAddress(): AbstractControl {
    return this.createAddress;
  }

  getReactiveControl(controlName: string): AbstractControl {
    return this.billsProductsForm.get(controlName);
  }


  // Events

  onInputUser(): void {
    let result: string = this.getUser().value;
    result = result.trim();
    if (result !== null && result !== '') {
      console.log('find user: ', result);
      this.userSevice.findByEmailContainingAndAuthoritiesId(result).subscribe(
        users => this.userOptions = [...users]
      );
    }
  }

  optionSelectedUser(event: MatAutocompleteSelectedEvent) {
    this.user = event.option.value;
    console.log('user selected: ', this.user);
    this.addressService.findByUserId(this.user.id).subscribe(
      addresses => this.addressOptions = [...addresses]
    );
    this.getUser().setValue('');
  }

  optionSelectedPayment(event: IPaymentDTO) {
    this.payment = event;
    console.log('payment selected: ', this.payment);
  }

  optionSelectedState(event: IStateDTO) {
    this.state = event;
    console.log('state selected: ', this.state);
  }

  optionSelectedAddress(event: IAddressDTO) {
    this.address = event;
    console.log('address selected: ', this.address);
  }

  onClickSpliceBillProduct(index: number, controlName: string): void {
    this.billsProducts = [...this.billsProducts];
    this.billsProducts.splice(index, 1);
    this.billsProductsForm.removeControl(controlName);
    console.log('product bill removed, actual bills products: ', this.billsProducts);
    console.log('Removed control in form bills products, actual controls: ', this.billsProductsForm.controls);
    this.getPriceBill();
  }

  onInputFieldAmount(billProduct: IBillProductDTO, control: AbstractControl): void {
    const amountFieldValue = control.value;
    console.log('control: ', control, ', amount: ', amountFieldValue, ', type: ', typeof amountFieldValue);
    billProduct.amount = (isNaN(amountFieldValue) || amountFieldValue < 1) ? 1 : amountFieldValue;
    console.log('depurated amount: ', billProduct.amount);
    this.getPriceBill();
  }

  onProductEmited(product: IProductDTO): void {
    if (!this.billsProducts.find(bp => bp.product.id === product.id)) {
      const billProduct = new BillProduct(product, 1) as IBillProductDTO;
      this.billsProducts = [...this.billsProducts, billProduct];
      this.addBillProductControl(billProduct);
      this.getPriceBill();
    }
  }

  public onClickCreateAddress(): void {
    const address = this.newAddress();
    console.log('address created: ', address);
    this.addressService.save(address).subscribe(
      addressResult => {
        this.snackBar.open('Addres create! review the select address', 'close', { duration: 3500 });
        this.addressOptions = [...this.addressOptions, addressResult];
        this.getCreateAddress().setValue('');
        this.hideCreateAddress = true;
      }
    );
  }

  // Utils

  checkErrors(control: AbstractControl, error: string): boolean {
    return this.utilService.checkErrors(control, error);
  }


  getPriceBill(): number {
    this.priceBill = 0;
    this.billsProducts.forEach(billProduct => this.priceBill += billProduct.product.price * billProduct.amount);
    console.log('price bill: ', this.priceBill);
    return this.priceBill;
  }

  // Fetch

  generateBill(): void {
    const bill = this.newBill();
    this.billService.saveAdmin(bill).subscribe(
      result => {

        console.log(result);

        this.billsProducts.forEach(
          (billProduct: IBillProduct) => {
            billProduct.bill = result;
          });

        this.billProductService.saveAllByBill(this.billsProducts).subscribe();

        this.snackBar.open('Bill generated!', 'close', { duration: 3500 });
        this.router.navigate(['/managment/bills/all-page']);
      }
    );
  }

  // Form settings

  private addBillProductControl(billProduct: IBillProductDTO) {
    this.billsProductsForm.addControl(
      billProduct.product.code,
      new FormControl([billProduct.amount],
        Validators.compose([Validators.required, Validators.min(1)]))
    );
  }

  // Create objects

  private newBill(): IBill {
    return new Bill(this.user, this.payment, this.getPaidOut().value, this.state, this.address.homeAddress, this.getPriceBill());
  }

  private newAddress(): IBill {
    return new Address(this.getCreateAddress().value, this.user);
  }

}
