import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPageRenderDTO } from '../../dtos/page-render/page-render.dto';
import { IUserDTO } from '../../dtos/user/user.dto';
import { IUser } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlEndPoint = environment.apiUrl.concat('users');

  constructor(private httpCliente: HttpClient) { }

  findById(id: number): Observable<IUserDTO> {
    return this.httpCliente.get<IUserDTO>(`${this.urlEndPoint}/${id}`);
  }

  findByEmail(email: string): Observable<IUserDTO> {
    return this.httpCliente.get<IUserDTO>(`${this.urlEndPoint}/email/${email}`);
  }

  findByRestorePassword(restorePassword: string): Observable<IUserDTO> {
    return this.httpCliente.get<IUserDTO>(`${this.urlEndPoint}/restore-password/${restorePassword}`);
  }

  findAllPage(page?: number, size?: number): Observable<IPageRenderDTO> {
    return this.httpCliente.get<IPageRenderDTO>(`${this.urlEndPoint}/page?page=${page}&size=${size}`);
  }

  findByEmailContainingAndAuthoritiesId(email: string): Observable<IUserDTO[]>{
    return this.httpCliente.get<IUserDTO[]>(`${this.urlEndPoint}/containing/${email}`);
  }

  save(user: IUser): Observable<IUserDTO> {
    return this.httpCliente.post<IUserDTO>(this.urlEndPoint, user);
  }

  adminSave(user: IUser): Observable<IUserDTO> {
    return this.httpCliente.post<IUserDTO>(`${this.urlEndPoint}/admin`, user);
  }

  updateById(id: number, user: Partial<IUser>): Observable<IUserDTO> {
    return this.httpCliente.put<IUserDTO>(`${this.urlEndPoint}/${id}`, user);
  }

  adminUpdateById(id: number, user: Partial<IUser>): Observable<IUserDTO> {
    return this.httpCliente.put<IUserDTO>(`${this.urlEndPoint}/admin/${id}`, user);
  }

  deleteById(id: number): Observable<any> {
    return this.httpCliente.delete(`${this.urlEndPoint}/${id}`);
  }
}
