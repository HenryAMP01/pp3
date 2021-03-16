export interface IState {
    code?: string;
    name?: string;
    id?: number;
    createAt?: Date;
    updateAt?: Date;
}

export class State implements IState {
    constructor(
        public code: string,
        public name: string,
        public id?: number,
        public createAt?: Date,
        public updateAt?: Date
    ) { }
}
