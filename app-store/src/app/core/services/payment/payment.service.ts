import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPageRenderDTO } from '../../dtos/page-render/page-render.dto';
import { IPaymentDTO } from '../../dtos/payment/payment.dto';
import { IPayment } from '../../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private urlEndPoint = environment.apiUrl.concat('payments');

  constructor(private httpCliente: HttpClient) { }

  findById(id: number): Observable<IPaymentDTO> {
    return this.httpCliente.get<IPaymentDTO>(`${this.urlEndPoint}/${id}`);
  }

  findAll(): Observable<IPaymentDTO[]> {
    return this.httpCliente.get<IPaymentDTO[]>(this.urlEndPoint);
  }

  findAllPage(page?: number, size?: number): Observable<IPageRenderDTO> {
    return this.httpCliente.get<IPageRenderDTO>(`${this.urlEndPoint}/page?page=${page}&size=${size}`);
  }

  save(payment: IPayment): Observable<IPaymentDTO> {
    return this.httpCliente.post<IPaymentDTO>(this.urlEndPoint, payment);
  }

  updateById(id: number, payment: Partial<IPayment>): Observable<IPaymentDTO> {
    return this.httpCliente.put<IPaymentDTO>(`${this.urlEndPoint}/${id}`, payment);
  }

  deleteById(id: number): Observable<any> {
    return this.httpCliente.delete(`${this.urlEndPoint}/${id}`);
  }

}
