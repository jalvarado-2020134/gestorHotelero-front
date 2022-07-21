import { Component, OnInit } from "@angular/core";
import { RoomRestService } from "src/app/services/roomRest/room-rest.service";
import { ActivatedRoute } from "@angular/router";
import { HotelRestService } from "src/app/services/hotelRest/hotel-res.service";
import { ReservationRestService } from "src/app/services/reservationRest/reservation-rest.service";
import { Router } from "@angular/router";
import { ReservationModel } from "src/app/models/reservation.model";
import Swal from "sweetalert2";
import { ServiceRestService } from "src/app/services/serviceRest/service-rest.service";

 @Component({
    selector: 'app-reservation-client',
    templateUrl: './reservation-client.component.html',
    styleUrls: ['./reservation-client.component.css']
 })

 export class ReservationUserComponent implements OnInit{
    roomGetId: any;
    reservation: ReservationModel;
    reservations: any;
    idReservation: any;
    reservationGetId: any;
    idHotel: any;
    rooms: any;
    services: any;
    newPrices: any;
    
    constructor(
        private serviceRest: ServiceRestService,
        private reservationRest: ReservationRestService,
        private roomRest: RoomRestService,
        private activateRoute: ActivatedRoute,
        private router: Router
    ){
        this.reservation = new ReservationModel('','',0,'','',);
    }

    ngOnInit(): void {
        this.activateRoute.paramMap.subscribe((idRuta)=>{
            this.idHotel = idRuta.get('idHotel');
        });

        this.getRoomsAvailable();
        this.getRoomByHotel();
        this.getServices();
        this.myReservations();
    }

    getServices(){
        this.serviceRest.getServices().subscribe({
            next:(res:any)=>{
                this.services = res.services;
                var arrayPrices = [];
                for(var key=0; key<this.services.lenght; key++){
                    var actualPrice = this.services[key].price;
                    var stringPrices = actualPrice.toString();
                    var checkPrice = stringPrices.includes(".")
                    if(checkPrice == true){
                        arrayPrices.push(stringPrices);
                    }
                    else if (checkPrice == false){

                        var newPrice = stringPrices+'.00'
                        arrayPrices.push(newPrice);
                    }
                }
                this.newPrices = arrayPrices;
            },
            error: (err)=> console.log(err)
        })
    }

    myReservations(){
        this.reservationRest.myReservations(this.idHotel).subscribe({
            next:(res:any)=> this.reservations = res.reservations,
            error:(err)=> console.log(err)
        })
    }

    getRoomsAvailable(){
        this.roomRest.getRoomsAvailable(this.idHotel).subscribe({
            next:(res:any)=> this.roomGetId = res.rooms,
            error:(err)=> console.log(err.error.message)
        })
    }

    getRoomByHotel(){
        this.roomRest.getRoomsByHotel(this.idHotel).subscribe({
            next: (res:any)=> this.roomGetId = res.rooms,
            error: (err) => console.log(err)
        })
    }

    

    makeReservation(newReservationForm: any){
        this.reservationRest.makeReservation(this.idHotel, this.reservation).subscribe({
            next: (res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message
                });
                this.myReservations();
                newReservationForm.reset();
            },
            error:(err:any)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error
                });
                newReservationForm.reset();
            },
        })
    }

    

    getReservation(id: string){
        this.reservationRest.getReservation(this.idHotel, id).subscribe({
            next:(res:any)=> this.reservationGetId = res.reservation,

            error:(err)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error,
                })
            }
        })
    }

    cancelReservation(idReservation:string){
        this.reservationRest.cancelReservation(this.idHotel, idReservation).subscribe({
            next: (res:any)=>{
                console.log(this.reservationGetId._id),
                Swal.fire({
                    title: res.message,
                    icon: 'success'
                });
                this.myReservations();
            },

            error:(err:any)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error
                })
            }
        })
    }
 }