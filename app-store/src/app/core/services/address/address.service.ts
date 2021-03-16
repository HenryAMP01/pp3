import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddressDTO } from '../../dtos/address/address.dto';
import { IAddress } from '../../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private urlEndPoint = environment.apiUrl.concat('addresses');

  constructor(private httpCliente: HttpClient) { }

  findById(id: number): Observable<IAddressDTO> {
    return this.httpCliente.get<IAddressDTO>(`${this.urlEndPoint}/${id}`);
  }

  findByUserId(id: number): Observable<IAddressDTO[]> {
    return this.httpCliente.get<IAddressDTO[]>(`${this.urlEndPoint}/user/${id}`);
  }

  save(address: IAddress): Observable<IAddressDTO> {
    return this.httpCliente.post<IAddressDTO>(this.urlEndPoint, address);
  }

  updateById(id: number, address: Partial<IAddress>): Observable<IAddressDTO> {
    return this.httpCliente.put<IAddressDTO>(`${this.urlEndPoint}/${id}`, address);
  }

  deleteById(id: number): Observable<any> {
    return this.httpCliente.delete(`${this.urlEndPoint}/${id}`);
  }
}
