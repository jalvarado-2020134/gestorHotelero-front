import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"; 
import { environment } from "src/environments/environment";
import { UserRestService } from "../userRest/user-rest.service";

@Injectable({
    providedIn: 'root'
})

export class ServiceRestService{
    httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userRest.getToken(),
    });

    constructor(
        private userRest: UserRestService,
        private http: HttpClient,
    ){}

    getServices(){
        return this.http.get(environment.baseUrl + 'service/getServicesGeneral',{headers: this.httpOptions});
    }

    newService(params:{}){
        return this.http.post(environment.baseUrl + 'service/newService', params,{headers: this.httpOptions});
    }

    getService(id:string){
        return this.http.get(environment.baseUrl + 'service/getService/' + id,{headers: this.httpOptions});
    }

    serviceUpdate(id:string, params:{}){
        return this.http.put(environment.baseUrl + 'service/updateService/' + id,params,{headers:this.httpOptions});
    }

    deleteService(id:string){
        return this.http.delete(environment.baseUrl + 'service/deleteService/' + id,{headers:this.httpOptions});
    }
}