import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserRestService } from "../userRest/user-rest.service";

@Injectable({
    providedIn: 'root'
})
export class EventRestService{
    httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userRest.getToken(),
    });
    
    constructor(
        private http: HttpClient,
        private userRest: UserRestService
    ){}

    getEvents(){
        return this.http.get(environment.baseUrl + 'event/getEvents',{headers: this.httpOptions});
    }

    getEvent(id:string){
        return this.http.get(environment.baseUrl + 'event/getEvent/' +id,{headers: this.httpOptions});
    }

    newEvent( params:{}){
        return this.http.post(environment.baseUrl + 'event/newEvent/', params,{headers: this.httpOptions});
    }

    updateEvent(id:string,params:{}){
        return this.http.put(environment.baseUrl + 'event/updateEvent/' + id,params,{headers:this.httpOptions});
    }

    deleteEvent(id: string){
        return this.http.delete(environment.baseUrl + 'event/deleteEvent/' + id,{headers: this.httpOptions})
    }
}