export class RoomModel{
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public price: string,
        public state: boolean,
        public dateAvailable: string,
        public hotel: string,
    ){}
}