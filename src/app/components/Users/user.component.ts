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
    usersManagers: any;
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

        getManagers(){
            this.userRest.getManagers().subscribe({
                next:(res:any)=>{
                    this.usersManagers = res.usersExist
                }
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
                        confirmButtonColor: '#28B463'

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
                        confirmButtonColor: '#E74C3C'

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
            Swal.fire({
                title: 'Are you sure you want to delete this user?',
                showDenyButton: true,
                confirmButtonText: 'Delete',
                denyButtonText: 'Cancel',
                confirmButtonColor: '#DC3311',
                denyButtonColor: '#118CDC'
            }).then((result)=>{
                if(result.isConfirmed){
                    this.userRest.userDeleted(id).subscribe({
                        next:(res:any)=>{
                            Swal.fire({
                                icon: 'success',
                                title: res.message + '  "' + res.userDeleted.name + '" ' + ' has been deleted ',
                                position: 'center',
                                showConfirmButton: true,
                                timer: 2000
                            });
                            this.getUsers();
                        },
                        error:(err)=>{
                            Swal.fire({
                                icon: 'error',
                                title: err.error.message
                            })
                            this.getUsers();
                        }
                    })
                }
            })
        }
    }
