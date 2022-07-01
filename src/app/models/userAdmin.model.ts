export class UserAdminModel{
    constructor(
        public id: string,
        public name: string,
        public username: string,
        public email: string,
        public password: string,
        public phone: string,
        public role: string,
    ){}
}