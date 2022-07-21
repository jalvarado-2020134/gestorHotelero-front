import { Component, OnInit } from "@angular/core";
import { HotelRestService } from "src/app/services/hotelRest/hotel-res.service";
import { HotelModel } from "src/app/models/hotel.model";
import { UserRestService } from "src/app/services/userRest/user-rest.service";
import { ReservationRestService } from "src/app/services/reservationRest/reservation-rest.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-reservation-manager',
    templateUrl: './reservation-manager.component.html',
    styleUrls: ['./reservation-manager.component.css']
})

export class ReservationManagerComponent implements OnInit{
    token: any;
    identity: any;
    role: any;
    hotels: any;
    hotelUpdate: any;
    reservations: any;
    hotel: HotelModel;

    constructor(
        private hotelRest: HotelRestService,
        private reservationRest: ReservationRestService,
        private userRest: UserRestService,

    ){
        this.hotel = new HotelModel('','','','',0,'');
    }

    ngOnInit(): void {
        this.getHotels();
        this.token = this.userRest.getToken();
        this.identity = this.userRest.getIdentity();
        this.role = this.userRest.getIdentity().role;
    }

    getHotels(){
        this.hotelRest.getHotels().subscribe({
            next:(res:any)=>{
                this.hotels = res.hotels,
                console.log(res.hotels);
            },
            error: (err)=> console.log(err)
        })
    }

    getHotel(id:string){
        this.hotelRest.getHotel(id).subscribe({
            next: (res: any)=>{
                this.hotelUpdate = res.hotel;
            },
            error: (err) =>{alert(err.error.message)}
        })
    }

    getReservations(id:string){
        this.reservationRest.getReservations(id).subscribe({
            next: (res:any)=> this.reservations = res.reservations,
            error: (err)=> console.log(err)
        })
    }
}