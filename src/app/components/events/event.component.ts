import { Component, OnInit } from "@angular/core";
import { UserRestService } from "src/app/services/userRest/user-rest.service";
import { EventModel } from "src/app/models/event.model";
import { EventRestService } from "src/app/services/eventRest/event-rest.service";
import { HotelRestService } from "src/app/services/hotelRest/hotel-res.service";
import { TypeEventRestService } from "src/app/services/typeEventRest/type-event-rest.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-events',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {
    token: any;
    identity: any;
    role: any;
    events: any;
    event: EventModel;
    search: any;
    hotels: any;
    eventUpdate: any
    newDate: any;
    typeEvents: any;

    constructor(
        private eventRest: EventRestService,
        private userRest: UserRestService,
        public hotelRest: HotelRestService,
        public typeEventRest: TypeEventRestService
    ) {
        this.event = new EventModel('', '', '', '', '', '');
    }

    ngOnInit(): void {
        this.getHotels();
        this.getEvents();
        this.getTypeEvents();
        this.token = this.userRest.getToken();
        this.identity = this.userRest.getIdentity();
        this.role = this.userRest.getIdentity().role;
    }

    getEvents() {
        this.eventRest.getEvents().subscribe({
            next: (res: any) => {
                this.events = res.events
                var arrayDates = [];
                for (var key = 0; key < this.events.lenght; key++) {
                    var actualDate = this.events[key].date;
                    var splitActualDate = actualDate.split('T');
                    arrayDates.push(splitActualDate[0]);
                }
                this.newDate = arrayDates;
            },
            error: (err) => console.log(err)
        })
    }

    getHotels() {
        this.hotelRest.getHotels().subscribe({
            next: (res: any) => {
                this.hotels = res.hotels,
                    console.log(res.hotels);
            },
            error: (err) => console.log(err)
        })
    }

    getTypeEvents() {
        this.typeEventRest.getTypesEvents().subscribe({
            next: (res: any) => {
                this.typeEvents = res.typeEvent,
                    console.log(res.typeEvent);
            },
            error: (err) => console.log(err)
        })
    }


    newEvent(newEventForm: any) {
        this.eventRest.newEvent(this.event).subscribe({
            next: (res: any) => {
                Swal.fire({
                    icon: 'success',
                    title: res.message
                });
                this.getEvents();
                newEventForm.reset();
            },
            error: (err: any) => {
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error
                });
                newEventForm.reset();
            }
        })


    }
    getEvent(id: string) {
        this.eventRest.getEvent(id).subscribe({
            next: (res: any) => {
                this.eventUpdate = res.event
            },
            error: (err) => { alert(err.error.message) }
        })
    }

    updateEvent() {
        this.eventRest.updateEvent(this.eventUpdate._id, this.eventUpdate).subscribe({
            next: (res: any) => {
                Swal.fire({
                    icon: 'success',
                    title: res.message
                });
                this.getEvents();
            },
            error: (err) => {
                Swal.fire({
                    icon: 'success',
                    title: err.error.message || err.error,
                });
            },
        })
    }

    deleteEvent(id:string){
        Swal.fire({
            title: 'Are you sure you want to delete this event?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: 'Cancel',
            confirmButtonColor: '#DC3311',
            denyButtonColor: '#118CDC'
        }).then((result)=>{
            if(result.isConfirmed){
                this.eventRest.deleteEvent(id).subscribe({
                    next:(res:any)=>{
                        Swal.fire({
                            icon: 'success',
                            title: res.message + ' : ' + res.deleteEvent.name,
                            position: 'center',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        this.getEvents();
                    },
                    error:(err)=>{
                        Swal.fire({
                            icon: 'error',
                            title: err.error.message
                        })
                        this.getEvents();
                    }
                })
            }
        })
    }
}