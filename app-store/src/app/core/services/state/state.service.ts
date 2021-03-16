import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPageRenderDTO } from '../../dtos/page-render/page-render.dto';
import { IStateDTO } from '../../dtos/state/state.dto';
import { IState } from '../../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private urlEndPoint = environment.apiUrl.concat('states');

  constructor(private httpCliente: HttpClient) { }

  findById(id: number): Observable<IStateDTO> {
    return this.httpCliente.get<IStateDTO>(`${this.urlEndPoint}/${id}`);
  }

  findAll(): Observable<IStateDTO[]> {
    return this.httpCliente.get<IStateDTO[]>(this.urlEndPoint);
  }

  findAllPage(page?: number, size?: number): Observable<IPageRenderDTO> {
    return this.httpCliente.get<IPageRenderDTO>(`${this.urlEndPoint}/page?page=${page}&size=${size}`);
  }

  save(state: IState): Observable<IStateDTO> {
    return this.httpCliente.post<IStateDTO>(this.urlEndPoint, state);
  }

  updateById(id: number, state: Partial<IState>): Observable<IStateDTO> {
    return this.httpCliente.put<IStateDTO>(`${this.urlEndPoint}/${id}`, state);
  }

  deleteById(id: number): Observable<any> {
    return this.httpCliente.delete(`${this.urlEndPoint}/${id}`);
  }
}
