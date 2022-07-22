import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReservationRestService } from "src/app/services/reservationRest/reservation-rest.service";
import { Router } from "@angular/router";
import {BillModel} from 'src/app/models/bill.model'
import Swal from 'sweetalert2';

@Component({
    selector: 'app-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.css']
})

export class BillComponent implements OnInit{
    bill: BillModel;
    idReservation: any;
    billId: any;
    reservation: any;

    constructor(
        private reservationRest: ReservationRestService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ){
        this.bill = new BillModel('','','','','','','');
    }

    ngOnInit(): void{
        this.activatedRoute.paramMap.subscribe((idRuta)=>{
            this.idReservation = idRuta.get('idReservation');
        });
        this.getBill();
    }

    getBill(){
        this.reservationRest.getBill(this.idReservation).subscribe({
            next: (res:any)=>{
                this.billId = res.bill;
                this.reservation = res.checkReservation;
            },
            error:(err)=>{
                Swal.fire({
                    icon: 'warning',
                    title: err.error.message || err.error,
                })
            }
        })
    }
}