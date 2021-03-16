import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAddressDTO } from 'src/app/core/dtos/address/address.dto';
import { IBillProductDTO } from 'src/app/core/dtos/bill-product/bill-product.dto';
import { IPaymentDTO } from 'src/app/core/dtos/payment/payment.dto';
import { IProductDTO } from 'src/app/core/dtos/product/product.dto';
import { IStateDTO } from 'src/app/core/dtos/state/state.dto';
import { Address, IAddress } from 'src/app/core/models/address.model';
import { BillProduct, IBillProduct } from 'src/app/core/models/bill-product.model';
import { Bill, IBill } from 'src/app/core/models/bill.model';
import { IPayment } from 'src/app/core/models/payment.model';
import { IState } from 'src/app/core/models/state.model';
import { IUser } from 'src/app/core/models/user.model';
import { AddressService } from 'src/app/core/services/address/address.service';
import { BillProductService } from 'src/app/core/services/bill-product/bill-product.service';
import { BillService } from 'src/app/core/services/bill/bill.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { SecurityService } from 'src/app/core/services/security/security.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hide = true;
  form: FormGroup;
  addressForm: FormGroup;
  addresses: IAddressDTO[] = [];
  user: IUser;

  displayedColumns: string[] = ['Product', 'Name', 'Price', 'Amount', 'Choice amount'];
  hideCreateAddress = true;

  formBill: FormGroup;
  billsProductsForm: FormGroup;
  createAddress: FormControl;

  paymentOptions: IPaymentDTO[] = [];
  productOptions: IProductDTO[] = [];
  billsProducts: IBillProductDTO[] = [];

  payment: IPayment;
  state: IState;
  address: IAddress;

  priceBill = 0;

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private userService: UserService,
    private securityService: SecurityService,
    private addressService: AddressService,
    private snackBar: MatSnackBar,
    private router: Router,
    private paymentService: PaymentService,
    private billService: BillService,
    private billProductService: BillProductService,
    private cartService: CartService) {

    this.formBill = this.fb.group({
      user: this.fb.control([]),
      payment: this.fb.control([], Validators.compose([Validators.required])),
      address: this.fb.control([], Validators.compose([Validators.required])),
    });

    this.billsProductsForm = this.fb.group({});

    this.createAddress = this.fb.control([], Validators.compose([Validators.minLength(5), Validators.maxLength(150)]));

    this.form = this.fb.group({
      email: this.fb.control([],
        Validators.compose([Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(255)])
      ),
      fullname: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])),
      password: this.fb.control([], Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(255)])),
    });

    this.addressForm = this.fb.group({});

  }

  ngOnInit(): void {

    this.cartService.userCart$.subscribe(
      billsProducts => {
        this.billsProducts = [...billsProducts];
        this.billsProducts.forEach(bp => this.addBillProductControl(bp));
        this.getPriceBill();
      });

    this.paymentService.findAll().subscribe(
      payments => {
        this.paymentOptions = [...payments];
        console.log('payments: ', payments);
      });

    this.securityService.getAuthenticationState().subscribe(
      account => {
        console.log(account);
        if(account !== null){
          this.userService.findByEmail(account.subject).subscribe(
            user => {
              this.user = user;
              this.form.patchValue({
                email: this.user.email,
                fullname: this.user.fullname,
              });
              this.addressService.findByUserId(this.user.id).subscribe(
                addresses => {
                  this.addresses = [...addresses];
                  this.addresses.forEach(address => this.addAddressControl(address));
                });
            });
        }
      });
  }

  // Events

  hidePassword(event: Event): void {
    this.hide = !this.hide;
    event.preventDefault();
  }

  onInputEmail(): void {
    this.user.email = this.getEmail().value;
  }

  onInputFullname(): void {
    this.user.fullname = this.getFullname().value;
  }

  onInputPassword(): void {
    this.user.password = this.getPassword().value;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      console.log(this.user);
      this.userService.updateById(this.user.id, this.user).subscribe(
        () => {
          this.snackBar.open('User updated!, reload your credentials', 'close', { duration: 3500 });
          this.securityService.logout();
        }
      );
    } else {
      alert('invalid form');
    }
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
    this.cartService.spliceProductInUserCart(index);
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
      this.cartService.addProductInUserCart(product);
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
        this.addresses = [...this.addresses, addressResult];
        this.addAddressControl(addressResult);
        this.getCreateAddress().setValue('');
        this.hideCreateAddress = true;
      }
    );
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

  getReactiveControlBillsProducts(controlName: string): AbstractControl {
    return this.billsProductsForm.get(controlName);
  }

  getReactiveControlAddresses(controlName: string): AbstractControl {
    return this.addressForm.get(controlName);
  }

  // utils

  getPriceBill(): number {
    this.priceBill = 0;
    this.billsProducts.forEach(billProduct => this.priceBill += billProduct.product.price * billProduct.amount);
    console.log('price bill: ', this.priceBill);
    return this.priceBill;
  }

  generateBill(): void {
    const bill = this.newBill();
    this.billService.save(bill).subscribe(
      result => {

        console.log(result);

        this.billsProducts.forEach(
          (billProduct: IBillProduct) => {
            billProduct.bill = result;
          });

        this.billProductService.saveAllByBill(this.billsProducts).subscribe();

        this.snackBar.open('Bill generated!', 'close', { duration: 3500 });
        this.cartService.removeAllPoductsInUserCart();
      }
    );
  }

  // Fetch

  deleteAddressById(index: number, addressId: number): void {
    this.addressService.deleteById(addressId).subscribe(
      () => {
        this.addresses = [...this.addresses];
        this.addresses.splice(index, 1);
        this.snackBar.open('Address deleted!', 'close', { duration: 3500 });
      });
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
    return new Bill(this.user, this.payment, false, null, this.address.homeAddress, this.getPriceBill());
  }

  private newAddress(): IBill {
    return new Address(this.getCreateAddress().value, this.user);
  }

  // Form settings

  private addAddressControl(address: IAddressDTO) {
    this.addressForm.addControl(
      address.id.toString(10),
      new FormControl(address.homeAddress,
        Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(255)]))
    );
    console.log('Added control in form address: ', this.addressForm.controls);
  }



}
