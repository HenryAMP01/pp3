import { IBillWithUserDTO } from '../bill/bill-with-user.dto';

export interface IPayuDTO {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ApiKey: string;
    signature: string;
    merchantId: string;
    accountId: string;
    description: string;
    tax: string;
    taxReturnBase: string;
    amount: string;
    referenceCode: string;
    currency: string;
    buyerEmail: string;
    test: string;
    confirmationUrl: string;
    responseUrl: string;
    bill: IBillWithUserDTO;
}
