import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
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

    getRooms(){
        return this.http.get(environment.baseUrl + 'room/getRooms',{headers: this.httpOptions});
    }

    newRoom(params:{}){
        return this.http.post(environment.baseUrl + 'room/newRoom', params,{headers:this.httpOptions});
    }

    getRoom(id:string){
        return this.http.get(environment.baseUrl + 'room/getRoom/' + id,{headers: this.httpOptions});
    }

    updateRoom(id:string,params:{}){
        return this.http.put(environment.baseUrl + 'room/updateRoom/' + id,params,{headers:this.httpOptions});
    }

    deleteRoom(id:string){
        return this.http.delete(environment.baseUrl + 'room/deleteRoom/' + id,{headers: this.httpOptions})
    }

    getRoomsByHotel(id:any){
        return this.http.get(environment.baseUrl + 'room/roomByHotel/' + id,{headers:this.httpOptions});
    }

    getRoomsAvailable(idHotel: any){
        return this.http.get(environment.baseUrl + 'room/roomAvailable/' + idHotel,{headers: this.httpOptions});
    }
}