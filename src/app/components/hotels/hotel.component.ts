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
    hotelUpdate: any;


    constructor(
        private userRest: UserAdminRestService,
        private hotelRest: HotelRestService,
        private usersRest: UserRestService
    ){

    this.hotel = new HotelModel('','','','',0,'');

    }

    ngOnInit(): void {
        this.getHotels();
        this.getUsers();
        this.token = this.usersRest.getToken();
        this.identity = this.usersRest.getIdentity();
        this.role = this.usersRest.getIdentity().role;
        
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

    getUsers(){
        this.userRest.getUsers().subscribe({
            next:(res:any)=>{
                this.users = res.user
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

    getHotel(id:string){
        this.hotelRest.getHotel(id).subscribe({
            next: (res: any)=>{
                this.hotelUpdate = res.hotel;
            },
            error: (err) =>{alert(err.error.message)}
        })
    }

    updateHotel(){
        this.hotelRest.updateHotel(this.hotelUpdate._id, this.hotelUpdate).subscribe({
            next: (res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonColor: '#E74C3C'

                });
                this.getHotels();
            },
            error: (err)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error,

                });
            },
        })
    }

    deleteHotel(id:string){
        Swal.fire({
            title: 'Are you sure you want to delete this hotel?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: 'Cancel',
            confirmButtonColor: '#DC3311',
            denyButtonColor: '#118CDC'
        }).then((result)=>{
            if(result.isConfirmed){
                this.hotelRest.deleteHotel(id).subscribe({
                    next:(res:any)=>{
                        Swal.fire({
                            icon: 'success',
                            title: res.message + '  ' + res.deleteHotel.name + ' has been deleted ',
                            position: 'center',
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.getHotels();
                    },
                    error:(err)=>{
                        Swal.fire({
                            icon: 'error',
                            title: err.error.message
                        })
                        this.getHotels();
                    }
                })
            }
        })
    }
}