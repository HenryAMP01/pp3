export interface IAuthority {
    name?: string;
    id?: number;
    createAt?: Date;
    updateAt?: Date;
}

export class Authority implements IAuthority{
    constructor(
        public name: string,
        public id?: number,
        public createAt?: Date,
        public updateAt?: Date
    ) { }
}
