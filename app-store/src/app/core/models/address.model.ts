import { IUser } from './user.model';

export interface IAddress {
    homeAddress?: string;
    user?: IUser;
    id?: number;
}

export class Address implements IAddress{
    constructor(
        public homeAddress: string,
        public user: IUser,
        public id?: number,
    ) { }
}
