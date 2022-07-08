import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http"; 
import { environment } from "src/environments/environment";
import { UserRestService } from "../userRest/user-rest.service";

@Injectable({
    providedIn: 'root'
})

export class RoomRestService{
    httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userRest.getToken(),
    });

    constructor(
        private http: HttpClient,
        private userRest: UserRestService
    ){}

    getRoomsByHotel(id:any){
        return this.http.get(environment.baseUrl + 'room/')
    }
    
}