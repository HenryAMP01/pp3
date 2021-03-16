import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/core/services/cart/cart.service';

import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/core/services/util/util.service';
import { IBillProductDTO } from 'src/app/core/dtos/bill-product/bill-product.dto';
import { IProductDTO } from 'src/app/core/dtos/product/product.dto';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  billsProductsForm: FormGroup;

  displayedColumns: string[] = ['Product', 'Name', 'Price', 'Amount', 'Choice amount'];
  billsProducts: IBillProductDTO[] = [];

  totalBill = 0;

  constructor(
    private formBuilder: FormBuilder,
    private utilService: UtilService,
    private cartService: CartService
  ) {
    this.billsProductsForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.cartService.userCart$.subscribe(billsProducts => {
      this.billsProducts = [...billsProducts];
      this.billsProducts.forEach(billProduct => this.addBillProductControl(billProduct));
      this.getPriceBill();
    });
  }

  // Public methods

  // Getters forms

  getReactiveControl(controlName: string): AbstractControl {
    return this.billsProductsForm.get(controlName);
  }

  // Events

  onInputFieldAmount(billProduct: IBillProductDTO, control: AbstractControl): void {
    const amountFieldValue = control.value;
    console.log('control: ', control, ', amount: ', amountFieldValue, ', type: ', typeof amountFieldValue);
    billProduct.amount = (isNaN(amountFieldValue) || amountFieldValue < 1) ? 1 : amountFieldValue;
    console.log('depurated amount: ', billProduct.amount);
    this.getPriceBill();
  }

  onClickSpliceBillProduct(index: number, controlName: string): void {
    this.cartService.spliceProductInUserCart(index);
    this.billsProductsForm.removeControl(controlName);
    console.log('Removed control in form bills products, actual controls: ', this.billsProductsForm.controls);
    this.getPriceBill();
  }

  onProductEmited(product: IProductDTO): void{
    this.cartService.addProductInUserCart(product);
    this.getPriceBill();
  }

  // Utils

  checkErrors(control: AbstractControl, errorName: string): boolean {
    return this.utilService.checkErrors(control, errorName);
  }

  getPriceBill(): number{
    this.totalBill = 0;
    this.billsProducts.forEach(billProduct => this.totalBill += billProduct.product.price * billProduct.amount);
    console.log('price bill: ', this.totalBill);
    return this.totalBill;
  }

  // Private Methods

  private addBillProductControl(billProduct: IBillProductDTO) {
    this.billsProductsForm.addControl(
      billProduct.product.code,
      new FormControl(billProduct.amount,
        Validators.compose([Validators.required, Validators.min(1)]))
    );
    console.log('Added control in form bills products: ', this.billsProductsForm.controls);
  }
}
