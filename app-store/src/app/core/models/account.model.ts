export interface IAccount {
    subject: string;
    authorities: string[];
}

export class Account implements IAccount{
    constructor(
        public subject: string,
        public authorities: string[]
    ){}
}
