import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBillWithUserDTO } from '../../dtos/bill/bill-with-user.dto';
import { IBillDTO } from '../../dtos/bill/bill.dto';
import { IPageRenderDTO } from '../../dtos/page-render/page-render.dto';
import { IPayuDTO } from '../../dtos/payu/payu.dto';
import { IBill } from '../../models/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private urlEndPoint = environment.apiUrl.concat('bills');

  constructor(private httpCliente: HttpClient) { }

  findById(id: number): Observable<IBillDTO> {
    return this.httpCliente.get<IBillDTO>(`${this.urlEndPoint}/${id}`);
  }

  findByIdWithUser(id: number): Observable<IBillWithUserDTO> {
    return this.httpCliente.get<IBillWithUserDTO>(`${this.urlEndPoint}/${id}/with-user`);
  }

  findAllPageWithUser(page?: number, size?: number): Observable<IPageRenderDTO> {
    return this.httpCliente.get<IPageRenderDTO>(`${this.urlEndPoint}/page-with-user?page=${page}&size=${size}`);
  }

  findAllPageByUserEmail(userEmail: string, page?: number, size?: number): Observable<IPageRenderDTO> {
    return this.httpCliente.get<IPageRenderDTO>(`${this.urlEndPoint}/user-email/${userEmail}?page=${page}&size=${size}`);
  }

  save(bill: IBill): Observable<IBillDTO> {
    return this.httpCliente.post<IBillDTO>(this.urlEndPoint, bill);
  }

  update(bill: IBill): Observable<IBillWithUserDTO> {
    return this.httpCliente.put<IBillWithUserDTO>(this.urlEndPoint, bill);
  }

  saveAdmin(bill: IBill): Observable<IBillWithUserDTO> {
    return this.httpCliente.post<IBillWithUserDTO>(`${this.urlEndPoint}/admin`, bill);
  }

  deleteById(id: number): Observable<any> {
    return this.httpCliente.delete(`${this.urlEndPoint}/${id}`);
  }

}
