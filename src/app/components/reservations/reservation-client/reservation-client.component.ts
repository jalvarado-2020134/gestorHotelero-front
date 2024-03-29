import { Component, OnInit } from "@angular/core";
import { RoomRestService } from "src/app/services/roomRest/room-rest.service";
import { ActivatedRoute } from "@angular/router";
import { HotelRestService } from "src/app/services/hotelRest/hotel-res.service";
import { ReservationRestService } from "src/app/services/reservationRest/reservation-rest.service";
import { Router } from "@angular/router";
import {BillModel} from 'src/app/models/bill.model'
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
    billId: any;
    bill: BillModel;
    rooms: any;
    services: any;
    newPrices: any;
    newStartDate:any;
    endDate:any;
    
    constructor(
        private serviceRest: ServiceRestService,
        private reservationRest: ReservationRestService,
        private roomRest: RoomRestService,
        private activateRoute: ActivatedRoute,
        private router: Router
    ){
        this.reservation = new ReservationModel('','',0,'','','');
        this.bill = new BillModel('','','','','','','');
    }

    ngOnInit(): void {
        this.activateRoute.paramMap.subscribe((idRuta)=>{
            this.idHotel = idRuta.get('idHotel');
        });

        this.getRoomsAvailable();
        this.getRoomByHotel();
        this.getServicesByHotel();
        this.myReservations();
    }

    getServicesByHotel(){
        this.serviceRest.getServicesByHotel(this.idHotel).subscribe({
            next:(res:any)=> this.services = res.services,
            error:(err)=> console.log(err)
        })
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
        console.log(this.reservation.startDate);
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
            next:(res:any)=> {
            this.reservationGetId = res.reservation;
            let date1 = this.reservation.startDate.split("T")
            this.newStartDate = date1[0]
            let date2 = this.reservation.endDate.split("T")
            this.endDate = date2[0]
            },
            error:(err)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error,
                })
            }
        })
    }

    createBill(newBillForm:any){
        this.reservationRest.createBill(this.reservationGetId._id, this.bill).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    title: res.message,
                    icon: 'success'
                });
                this.myReservations();
                newBillForm.reset();
                this.router.navigate(['/bill' + this.reservationGetId._id]);
            },

            error:(err:any)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error
                });
                newBillForm.reset()
            }
        })
    }

    cancelReservation(idReservation:string){
        this.reservationRest.cancelReservation(this.idHotel, idReservation).subscribe({
            next: (res:any)=>{
                console.log(this.reservationGetId._id),
                Swal.fire({
                    icon: 'success',
                    title: res.message,

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