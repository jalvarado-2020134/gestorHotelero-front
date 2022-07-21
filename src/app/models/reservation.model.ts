export class ReservationModel{
    constructor (
        public startDate: string,
        public endDate: string,
        public totalPrice: Number,
        public user: String,
        public room: String,
    ){}
}