import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserRestService } from "../userRest/user-rest.service";

@Injectable({
    providedIn: 'root'
})

export class TypeEventRestService{
    httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userRest.getToken(),
    });

    constructor(
        private http: HttpClient,
        private userRest: UserRestService
    ){}

    getTypesEvents(){
        return this.http.get(environment.baseUrl + 'typeEvent/getTypes' ,{headers: this.httpOptions});
    }

    getTypeEvent(id:string){
        return this.http.get(environment.baseUrl + 'typeEvent/getType/' + id,{headers:this.httpOptions})
    }

    updateTypeEvent(id:string, params:{}){
        return this.http.put(environment.baseUrl + 'typeEvent/updateType/'+ id,params,{headers:this.httpOptions})
    }
}