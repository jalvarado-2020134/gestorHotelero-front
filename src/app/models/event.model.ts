export class EventModel{
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public date: string,
        public typeEvent: string,
        public hotel: string
    ){}
}