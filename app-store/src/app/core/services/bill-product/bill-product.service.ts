import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IBillProductDTO } from '../../dtos/bill-product/bill-product.dto';
import { IBillProduct } from '../../models/bill-product.model';

@Injectable({
  providedIn: 'root'
})
export class BillProductService {

  private urlEndPoint = environment.apiUrl.concat('bills-products');

  constructor(private httpCliente: HttpClient) { }

  findById(id: number): Observable<IBillProductDTO> {
    return this.httpCliente.get<IBillProductDTO>(`${this.urlEndPoint}/${id}`);
  }

  findByBillId(billdId: number): Observable<IBillProductDTO[]> {
    return this.httpCliente.get<IBillProductDTO[]>(`${this.urlEndPoint}/billId/${billdId}`);
  }

  save(billProduct: IBillProduct): Observable<IBillProductDTO> {
    return this.httpCliente.post<IBillProductDTO>(this.urlEndPoint, billProduct);
  }

  saveAllByBill(billsProducts: IBillProduct[]): Observable<any> {
    return this.httpCliente.post<any>(`${this.urlEndPoint}/save-all-by-bill`, billsProducts);
  }

  updateById(id: number, billProduct: Partial<IBillProduct>): Observable<IBillProductDTO> {
    return this.httpCliente.put<IBillProductDTO>(`${this.urlEndPoint}/${id}`, billProduct);
  }

  deleteById(id: number): Observable<any> {
    return this.httpCliente.delete(`${this.urlEndPoint}/${id}`);
  }

  deleteAllByBill(billsProducts: IBillProduct[]): Observable<any> {
    return this.httpCliente.post<any>(`${this.urlEndPoint}/delete-all-by-bill`, billsProducts);
  }
}
