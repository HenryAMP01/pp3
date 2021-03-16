import { IAuthority } from './authority.model';

export interface IUser{
    email?: string;
    fullname?: string;
    password?: string;
    enabled?: boolean;
    authorities?: IAuthority[];
    id?: number;
    createAt?: Date;
    updateAt?: Date;
}

export class User implements IUser{
    constructor(
        public email: string,
        public fullname: string,
        public password: string,
        public enabled?: boolean,
        public authorities?: IAuthority[],
        public id?: number,
        public createAt?: Date,
        public updateAt?: Date
    ){}
}
