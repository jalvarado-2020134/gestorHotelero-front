import { Inject, Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from "src/environments/environment";
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from "firebase/compat/app";


@Injectable({
    providedIn: 'root'
})

export class UserRestService{
    httpOptions = new HttpHeaders({
        'Content-Type': 'application/json', 'Authorization': this.getToken()
    });

    constructor(
        private http: HttpClient,
        private fireAuth: AngularFireAuth
    ){}

    test(message: string){
        console.log(message);
    }

    login(params:{}){
        let body = JSON.stringify(params);
        return this.http.post(environment.baseUrl  + 'user/login', body,{headers: this.httpOptions});
    }
    

    getToken(){
        let globalToken = localStorage.getItem('token');
        let token;
        if(globalToken != undefined){

            token = globalToken;
        }else{
            token = '';
        }
        return token;
    }

    getIdentity(){
        let globalIdentity = localStorage.getItem('identity');
        let identity;
        if(globalIdentity != undefined){
            identity = JSON.parse(globalIdentity);
        }else{
            identity = '';
        }
        return identity;
    }

    register(params:{}){
        return this.http.post(environment.baseUrl + 'user/register', params, {headers: this.httpOptions});
    }

    userUpdate(id:string,params:{}){
        return this.http.put(environment.baseUrl + 'user/update/' + id,params,{headers:this.httpOptions.set('Authorization',this.getToken())});
    }
    
    deleteHotel(id:string){
      return this.http.delete(environment.baseUrl + 'user/delete/' + id,{headers:this.httpOptions.set('Authorization',this.getToken())});
    }

    async loginGoogle(){
        try{
            return await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        }catch(err){
            console.log(err)
            return err;
        }
    }
}
