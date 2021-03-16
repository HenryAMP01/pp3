import { IAddress } from './address.model';
import { IPayment } from './payment.model';
import { IState } from './state.model';
import { IUser } from './user.model';

export interface IBill{
    user?: IUser;
    payment?: IPayment;
    paidOut?: boolean;
    state?: IState;
    address?: string;
    total?: number;
    id?: number;
    createAt?: Date;
    updateAt?: Date;
}

export class Bill implements IBill{
    constructor(
        public user: IUser,
        public payment: IPayment,
        public paidOut: boolean,
        public state: IState,
        public address: string,
        public total: number,
        public id?: number,
        public createAt?: Date,
        public updateAt?: Date
    ){}
}
