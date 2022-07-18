import { Component,OnInit } from "@angular/core";
import { UserRestService } from "src/app/services/userRest/user-rest.service";
import { RoomModel } from "src/app/models/room.model";
import { RoomRestService } from "src/app/services/roomRest/room-rest.service";
import { HotelRestService } from "src/app/services/hotelRest/hotel-res.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-rooms',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit{
    token:any;
    identity:any;
    role:any;
    rooms: any;
    room: RoomModel;
    search: any;
    hotel: any;
    hotels: any;
    roomUpdate:any

    constructor(
        private roomRest: RoomRestService,
        private userRest: UserRestService,
        public hotelRest: HotelRestService,

    ){
        this.room = new RoomModel('','','',true,'','');
    }

    ngOnInit(): void {
        this.getHotels();
        this.getRooms();
        this.token = this.userRest.getToken();
        this.identity = this.userRest.getIdentity();
        this.role = this.userRest.getIdentity().role;
    }

    getRooms(){
        this.roomRest.getRooms().subscribe({
            next:(res:any)=>{
                this.rooms = res.rooms,
                console.log(res.rooms);
            },
            error:(err)=>console.log(err)
        })
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

    newRoom(newRoomForm:any){
        this.roomRest.newRoom(this.room).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonColor: '#28B464'
                });
                this.getRooms();
                newRoomForm.reset();
            },
            error:(err:any)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error
                });
                newRoomForm.reset();
            }
        })
    }

    getRoom(id:string){
        this.roomRest.getRoom(id).subscribe({
            next:(res:any)=>{
                this.roomUpdate = res.room
            },
            error:(err)=>{alert(err.error.message)}
        })
    }

    updateRoom(){
        this.roomRest.updateRoom(this.roomUpdate._id,this.roomUpdate).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonColor: '#E74C3C'
                });
                this.getRooms();
            },
            error:(err)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error,
                });
            },
        })
    }

    deleteRoom(id:string){
        Swal.fire({
            title: 'Are you sure you want to delete this room?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: 'Cancel',
            confirmButtonColor: '#DC3311',
            denyButtonColor: '#118CDC'
        }).then((result)=>{
            if(result.isConfirmed){
                this.roomRest.deleteRoom(id).subscribe({
                    next:(res:any)=>{
                        Swal.fire({
                            icon: 'success',
                            title: res.message + '  ' + res.deleteRoom.name + ' has been deleted ',
                            position: 'center',
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.getRooms();
                    },
                    error:(err)=>{
                        Swal.fire({
                            icon: 'error',
                            title: err.error.message
                        })
                        this.getRooms();
                    }
                })
            }
        })
    }
}