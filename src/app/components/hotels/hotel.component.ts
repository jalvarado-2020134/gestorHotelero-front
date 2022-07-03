import { Component,OnInit } from "@angular/core";
import { UserRestService } from "src/app/services/userRest/user-rest.service";
import {HotelRestService} from 'src/app/services/hotelRest/hotel-res.service';
import { UserAdminRestService } from "src/app/services/userAdminRest/user-admin-rest";
import { HotelModel } from "src/app/models/hotel.model";
import Swal from "sweetalert2";

@Component({
    selector: 'app-hotel',
    templateUrl: './hotel.component.html',
    styleUrls: ['./hotel.component.css']
})

export class HotelComponent implements OnInit{
    token: any;
    identity: any;
    role: any;
    hotels: any;
    hotel: HotelModel;
    search: string = '';
    users: any;


    constructor(
        private userRest: UserAdminRestService,
        private hotelRest: HotelRestService,
    ){

    this.hotel = new HotelModel('','','','',0,'');

    }

    ngOnInit(): void {
        this.getHotels();
        this.getUsers();
        
    }

    getHotels(){
        this.hotels = [];
        this.hotelRest.getHotels().subscribe({
            next:(res:any)=>{
                this.hotels = res.hotels,
                console.log(res);
            },
            error: (err)=> console.log(err)
        })
    }

    getUsers(){
        this.userRest.getUsers().subscribe({
            next:(res:any)=>{
                this.users = res.user,
                console.log(this.users);
            },
            error: (err)=> console.log(err)
        })
    }

    newHotel(newHotelForm: any){
        this.hotelRest.newHotel(this.hotel).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonColor: '#28B463'
                });
                this.getHotels();
                newHotelForm.reset();
            },
            error: (err: any)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error,
                    confirmButtonColor: '#E74C3C'
                });
                newHotelForm.reset();
            }
        })
    }
}