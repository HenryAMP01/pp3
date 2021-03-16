import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IAuthorityDTO } from '../../dtos/authority/authority.dto';
import { IPageRenderDTO } from '../../dtos/page-render/page-render.dto';
import { IAuthority } from '../../models/authority.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  private urlEndPoint = environment.apiUrl.concat('authorities');

  constructor(private httpCliente: HttpClient) { }

  findById(id: number): Observable<IAuthorityDTO> {
    return this.httpCliente.get<IAuthorityDTO>(`${this.urlEndPoint}/${id}`);
  }

  findAll(): Observable<IAuthorityDTO[]> {
    return this.httpCliente.get<IAuthorityDTO[]>(`${this.urlEndPoint}`);
  }

  findAllPage(page?: number, size?: number): Observable<IPageRenderDTO> {
    return this.httpCliente.get<IPageRenderDTO>(`${this.urlEndPoint}/page?page=${page}&size=${size}`);
  }

  save(authority: IAuthority): Observable<IAuthorityDTO> {
    return this.httpCliente.post<IAuthorityDTO>(this.urlEndPoint, authority);
  }

  updateById(id: number, authority: Partial<IAuthority>): Observable<IAuthorityDTO> {
    return this.httpCliente.put<IAuthorityDTO>(`${this.urlEndPoint}/${id}`, authority);
  }

  deleteById(id: number): Observable<any> {
    return this.httpCliente.delete(`${this.urlEndPoint}/${id}`);
  }
}
