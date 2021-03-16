export interface ICategory {
    code?: string;
    name?: string;
    id?: number;
    createAt?: Date;
    updateAt?: Date;
}

export class Category implements ICategory{
    constructor(
        public code: string,
        public name: string,
        public id?: number,
        public createAt?: Date,
        public updateAt?: Date
    ) { }
}
