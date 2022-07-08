import { Component, OnInit } from "@angular/core";
import { TypeEventModel } from "src/app/models/typeEvent.model";
import { TypeEventRestService } from "src/app/services/typeEventRest/type-event-rest.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-typeEvent',
    templateUrl: './typeEvent.component.html',
    styleUrls: ['./typeEvent.component.css']
})

export class TypeEventComponent implements OnInit{
    typeEvent: TypeEventModel;
    typeEvents: any;
    typeEventId: any
    
    constructor(
        private typeEventRest: TypeEventRestService,
    ){
        this.typeEvent = new TypeEventModel('','');
    }

    ngOnInit(): void {
        this.getTypeEvents();
    }

    getTypeEvents(){
        this.typeEventRest.getTypesEvents().subscribe({
            next:(res:any)=>{
                this.typeEvent = res.typeEvent,
                console.log(this.typeEvent);
            },
            error:(err)=> console.log(err)
        })
    }

    getTypeEvent(id:string){
        this.typeEventRest.getTypeEvent(id).subscribe({
            next:(res:any)=>{
                this.typeEventId = res.typeEvent
            },
            error: (err)=>{alert(err.error.message)}
        })
    }

    
}