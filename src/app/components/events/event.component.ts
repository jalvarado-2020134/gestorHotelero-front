import { Component, OnInit } from "@angular/core";
import { EventModel } from "src/app/models/event.model";
import { EventRestService } from "src/app/services/eventRest/event-rest.service";
import { HotelRestService } from "src/app/services/hotelRest/hotel-res.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-events',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {
    events: any;
    event: EventModel;
    search: any;
    hotels: any;
    eventUpdate: any
    newDate: any;

    constructor(
        private eventRest: EventRestService,
        public hotelRest: HotelRestService
    ) {
        this.event = new EventModel('', '', '', '', '');
    }

    ngOnInit(): void {
        this.getHotels();
        this.getEvents();
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
    getEvent(id:string) {
        this.eventRest.getEvent(id).subscribe({
            next: (res:any)=>{
                this.eventUpdate = res.event
            },
            error: (err)=>{alert(err.error.message)}
        })
    }

    updateEvent(){
        this.eventRest.updateEvent(this.eventUpdate._id, this.eventUpdate).subscribe({
            next: (res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message
                });
                this.getEvents();
            },
            error: (err)=>{
                Swal.fire({
                    icon: 'success',
                    title: err.error.message || err.error,
                });
            },
        })
    }

    deleteEvent(id:string){
        this.eventRest.deleteEvent(id).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message + ' : ' + res.deleteEvent.name
                });
                this.getEvents();
            },
            error:(err)=>{
                Swal.fire({
                    icon: 'success',
                    title: err.error.message
                })
            }
        })
    }


}