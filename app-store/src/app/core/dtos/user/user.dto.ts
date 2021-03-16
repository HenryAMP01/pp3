import { IAuthorityDTO } from '../authority/authority.dto';
import { IAddressDTO } from '../address/address.dto';

export interface IUserDTO{
    id: number;
    email: string;
    fullname: string;
    address: IAddressDTO[];
    authorities: IAuthorityDTO[];
    enabled: boolean;
}
