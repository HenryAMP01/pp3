import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategoryDTO } from '../../dtos/category/category.dto';
import { IPageRenderDTO } from '../../dtos/page-render/page-render.dto';
import { ICategory } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private urlEndPoint = environment.apiUrl.concat('categories');

  constructor(private httpCliente: HttpClient) { }

  findById(id: number): Observable<ICategoryDTO> {
    return this.httpCliente.get<ICategoryDTO>(`${this.urlEndPoint}/${id}`);
  }

  findAll(): Observable<ICategoryDTO[]> {
    return this.httpCliente.get<ICategoryDTO[]>(this.urlEndPoint);
  }

  findAllPage(page?: number, size?: number): Observable<IPageRenderDTO> {
    return this.httpCliente.get<IPageRenderDTO>(`${this.urlEndPoint}/page?page=${page}&size=${size}`);
  }

  save(category: ICategory): Observable<ICategoryDTO> {
    return this.httpCliente.post<ICategoryDTO>(this.urlEndPoint, category);
  }

  updateById(id: number, category: Partial<ICategory>): Observable<ICategoryDTO> {
    return this.httpCliente.put<ICategoryDTO>(`${this.urlEndPoint}/${id}`, category);
  }

  deleteById(id: number): Observable<any> {
    return this.httpCliente.delete(`${this.urlEndPoint}/${id}`);
  }


}
