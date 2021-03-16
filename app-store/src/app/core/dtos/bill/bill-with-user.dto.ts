import { IPaymentDTO } from '../payment/payment.dto';
import { IStateDTO } from '../state/state.dto';
import { IUserDTO } from '../user/user.dto';

export interface IBillWithUserDTO{
    id: number;
    total: number;
    address: string;
    paidOut: boolean;
    payment: IPaymentDTO;
    state: IStateDTO;
    user: IUserDTO;
    createAt: Date;
    updateAt: Date;
}
