import { IBill } from './bill.model';
import { IProduct } from './product.model';

export interface IBillProduct{
    product?: IProduct;
    amount?: number;
    bill?: IBill;
    id?: number;
}

export class BillProduct implements IBillProduct{
    constructor(
        public product: IProduct,
        public amount: number,
        public bill?: IBill,
        public id?: number,
    ){}
}
