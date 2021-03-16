export interface IPayment {
    name?: string;
    id?: number;
    createAt?: Date;
    updateAt?: Date;
}

export class Payment implements IPayment {
    constructor(
        public name: string,
        public id?: number,
        public createAt?: Date,
        public updateAt?: Date
    ) { }
}
