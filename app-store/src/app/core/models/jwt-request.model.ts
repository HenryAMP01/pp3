export interface IJwtRequest{
    email?: string;
    password?: string;
    rememberme?: boolean;
}

export class JwtRequest implements IJwtRequest{
    constructor(
        public email: string,
        public password: string,
        public rememberme: boolean
    ){}
}
