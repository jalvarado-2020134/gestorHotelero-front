import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from "src/app/models/user.model";
import {UserRestService} from 'src/app/services/userRest/user-rest.service';
import { UploadImageService } from 'src/app/services/uploadImage/upload-image.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public userGetId: any;
  public identity: any;
  public ProfileModel: UserModel;
  public filesToUpload:any;
  public url:any;

  constructor(
    public UserRest: UserRestService, 
    private router: Router,
    private uploadImageRest: UploadImageService) {
    this.ProfileModel = new UserModel('', '', '', '','','','');
    this.url = environment.baseUrl;
  }
  ngOnInit(): void {}

  userUpdate() {
    this.userGetId = this.UserRest.getIdentity();
    this.UserRest.userUpdate(
      this.userGetId._id,
      this.ProfileModel
    ).subscribe({
      next: (res: any) => {
        this.identity = res.userUpdate;
        localStorage.setItem('identity', JSON.stringify(this.identity));
        Swal.fire({
          icon: 'success',
          title: res.message,
        });
      },
      error: (err) => alert(err.error.message || err.error),
    });
  }

  deleteHotel(id: string) {
    this.UserRest.deleteHotel(id).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'warning',
          title: res.message,
        });
        localStorage.clear();
        this.router.navigateByUrl('');
        //this.get_company();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message,
        });
      },
    });
  }


  filesChange(inputFile:any){
    this.filesToUpload = <Array<File>>inputFile.target.files;
    console.log(this.filesToUpload);
  }

  uploadImage(){
    this.userGetId = this.UserRest.getIdentity();
    this.uploadImageRest.requestFiles(this.userGetId._id, this.filesToUpload, 'image')
    .then((res:any)=>{
      if(!res.error){
        console.log(res);
      }else{
        console.log(res)
      }
    })
  }



}

