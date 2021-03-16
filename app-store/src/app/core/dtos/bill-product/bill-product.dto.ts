import { IProductDTO } from '../product/product.dto';

export interface IBillProductDTO{
    id: number;
    product: IProductDTO;
    amount: number;
}

