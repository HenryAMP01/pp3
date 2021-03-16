import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBillProductDTO } from '../../dtos/bill-product/bill-product.dto';
import { IProductDTO } from '../../dtos/product/product.dto';
import { BillProduct} from '../../models/bill-product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private billsProductsUser: IBillProductDTO[] = [];
  private userCart = new BehaviorSubject<IBillProductDTO[]>([]);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  userCart$ = this.userCart.asObservable();

  constructor() { }

  addProductInUserCart(product: IProductDTO): void {
    if (!this.billsProductsUser.find(bp => bp.product.id === product.id)) {
      const billProduct = new BillProduct(product, 1) as IBillProductDTO;
      this.billsProductsUser = [...this.billsProductsUser, billProduct];
      this.userCart.next(this.billsProductsUser);
    }
  }

  spliceProductInUserCart(index: number): void {
    this.billsProductsUser = [...this.billsProductsUser];
    this.billsProductsUser.splice(index, 1);
    this.userCart.next(this.billsProductsUser);
  }

  removeAllPoductsInUserCart(): void{
    this.billsProductsUser = [];
    this.userCart.next(this.billsProductsUser);
  }
}
