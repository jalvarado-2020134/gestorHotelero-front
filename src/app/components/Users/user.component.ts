import { Component, OnInit } from "@angular/core";
import { UserAdminModel } from "src/app/models/userAdmin.model";
import { UserAdminRestService } from "src/app/services/userAdminRest/user-admin-rest";
import Swal from "sweetalert2";

@Component({
    selector: 'app-users',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit{
    users: any;
    user: UserAdminModel;
    search: string = '';
    userId: any;
    userUpdate_Admin: any;
    delete_Admin: any;
    constructor(private userRest: UserAdminRestService,
        ){
            this.user = new UserAdminModel('','','','','','','');
        }

        ngOnInit(): void {
            this.getUsers();
        }

        getUsers(){
            this.userRest.getUsers().subscribe({
                next:(res:any)=>{
                    this.users = res.user,
                    console.log(this.users);
                },
                error: (err)=> console.log(err)
            })
        }

        getUser(id:string){
            this.userRest.getUser(id).subscribe({
                next:(res:any)=>{
                    this.userId = res.user
                },
                error: (err)=>{alert(err.error.message)}
            })
        }

        newUser(newUserForm: any){
            this.userRest.newUser(this.user).subscribe({
                next:(res: any)=>{
                    Swal.fire({
                        icon: 'success',
                        title: res.message,
                    });
                    this.getUsers();
                    newUserForm.reset();
                },
                error: (err: any)=>{
                    Swal.fire({
                        icon: 'error',
                        title: err.error.message || err.error
                    });
                    newUserForm.reset();
                },
            })
        }

        updateUser(){
            this.userRest.updateUser(this.userId._id, this.userId).subscribe({
                next:(res:any)=>{
                    Swal.fire({
                        icon: 'success',
                        title: res.message,
                    });
                    this.getUsers();
                },
                error: (err)=>{
                    console.log(this.userId)
                    Swal.fire({
                        icon: 'error',
                        title: err.error.message || err.error,
                    })
                    this.getUsers
                },
            })
        }

        userDeleted(id:string){
            this.userRest.userDeleted(id).subscribe({
                next:(res:any)=>{
                    Swal.fire({
                        icon: 'success',
                        title: res.message + ' : ' + res.userDeleted.name
                    });
                    this.getUsers();
                },
                error:(err)=>{
                    Swal.fire({
                        icon: 'error',
                        title: err.error.message
                    })
                }
            })
        }
}