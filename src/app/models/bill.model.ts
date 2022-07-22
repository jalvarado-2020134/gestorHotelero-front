export class BillModel{
    constructor(
        public id: string,
        public date: string,
        public serial: string,
        public NIT: string,
        public user: string,
        public name: string,
        public reservation: string
    ){}
}