
import { IPaymentDTO } from '../payment/payment.dto';
import { IStateDTO } from '../state/state.dto';

export interface IBillDTO{
    id: number;
    total: number;
    address: string;
    paidOut: boolean;
    payment: IPaymentDTO;
    state: IStateDTO;
    createAt: Date;
    updateAt: Date;
}

