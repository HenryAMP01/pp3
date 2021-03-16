import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPageRenderDTO } from '../../dtos/page-render/page-render.dto';

import { IProductDTO } from '../../dtos/product/product.dto';
import { IProduct } from '../../models/product.model';

import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private urlEndPoint = environment.apiUrl.concat('products');

  constructor(private httpCliente: HttpClient) { }

  findById(id: number): Observable<IProductDTO> {
    return this.httpCliente.get<IProductDTO>(`${this.urlEndPoint}/${id}`);
  }

  findByNameContaining(name: string): Observable<IProductDTO[]> {
    return this.httpCliente.get<IProductDTO[]>(`${this.urlEndPoint}/containing/${name}`);
  }

  findAllPage(page?: number, size?: number): Observable<IPageRenderDTO> {
    return this.httpCliente.get<IPageRenderDTO>(`${this.urlEndPoint}/page?page=${page}&size=${size}`);
  }

  save(product: IProduct): Observable<IProductDTO> {
    return this.httpCliente.post<IProductDTO>(this.urlEndPoint, product);
  }

  updateById(id: number, product: Partial<IProduct>): Observable<IProductDTO> {
    return this.httpCliente.put<IProductDTO>(`${this.urlEndPoint}/${id}`, product);
  }

  deleteById(id: number): Observable<any> {
    return this.httpCliente.delete(`${this.urlEndPoint}/${id}`);
  }

}
