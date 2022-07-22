import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserRestService } from "../userRest/user-rest.service";

@Injectable({
    providedIn: 'root'
})

export class ReservationRestService{
    httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userRest.getToken()
    });

    constructor(
        private http: HttpClient,
        private userRest: UserRestService
    ){}

    getHotels(){
        return this.http.get(environment.baseUrl + 'hotel/getHotels',{headers: this.httpOptions});
    }

    makeReservation(idHotel: string, params:{}){
        return this.http.post(environment.baseUrl + 'reservation/makeReservation/' + idHotel, params,{headers: this.httpOptions})
    }

    myReservation(){
        return this.http.get(environment.baseUrl + 'reservation/myReservation',{headers:this.httpOptions});
    }

    myReservations(idHotel: string){
        return this.http.get(environment.baseUrl + 'reservation/myReservations/' + idHotel,{headers: this.httpOptions});
    }

    getReservationsInProgress(idHotel: string){
        return this.http.get(environment.baseUrl + 'reservation/getInProgress/' + idHotel,{headers: this.httpOptions});
    }

    getReservationsCancelled(idHotel:string){
        return this.http.get(environment.baseUrl + 'reservation/getCancelled/' + idHotel,{headers: this.httpOptions});
    }

    getReservation(idHotel: string, id: string){
        return this.http.get(environment.baseUrl + 'reservation/getReservation/' + idHotel + '/' + id,{headers:this.httpOptions});
    }

    getReservations(idHotel: string){
        return this.http.get(environment.baseUrl + 'reservation/getReservations/' + idHotel,{headers: this.httpOptions});
    }

    cancelReservation(idHotel: string, idReservation: string){
        return this.http.delete(environment.baseUrl + 'reservation/deleteReservation/' + idHotel + '/' + idReservation,{headers: this.httpOptions})
    }

    createBill(id: string, params:{}){
        return this.http.post(environment.baseUrl + 'bill/createBill/' + id,params,{headers: this.httpOptions});
    }

    getBill(idReservation: string){
        return this.http.get(environment.baseUrl + 'bill/getBill/' + idReservation,{headers: this.httpOptions})
    }
}