import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user:UserModel;

    constructor(private userRest: UserRestService,
                public router: Router){
        this.user = new UserModel('','','','','','','');
                }


  ngOnInit(): void {
  }

  login(){
    this.userRest.login(this.user).subscribe({
      next: (res: any)=>{
        Swal.fire({
          icon: 'success',
          title: res.message + '  ' + res.already.name,
        })
        localStorage.setItem('token' ,res.token);
        localStorage.setItem('identity',JSON.stringify(res.already));
        this.router.navigateByUrl('');
      },
      error: (err)=>{
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
        })
      }
    })
  }

  loginGoogle(){
    this.userRest.loginGoogle().then((res:any)=>{
      if(res.credential.accessToken){
        localStorage.setItem('token', res.credential.accessToken);
        localStorage.setItem('identity', JSON.stringify(res.additionalUserInfo.profile));
        localStorage.setItem('outService', 'true');
        this.router.navigateByUrl('')
      }else{
        console.log(res);
      }
    })
      
  }

}
