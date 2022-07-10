import { Component, OnInit } from "@angular/core";
import { UserRestService } from "src/app/services/userRest/user-rest.service";
import { ServiceModel } from "src/app/models/service.model";
import { HotelRestService } from "src/app/services/hotelRest/hotel-res.service";
import { ServiceRestService } from "src/app/services/serviceRest/service-rest.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-services',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit{
    token: any;
    identity: any;
    role: any;
    services: any;
    hotels: any;
    service: ServiceModel;
    search: any;
    updateService: any;
    newPrices:any;
    newPrice:any;
    
    constructor(
        private hotelRest: HotelRestService,
        private userRest: UserRestService,
        private serviceRest: ServiceRestService

    ){
        this.service = new ServiceModel('','','',0,'');
    }

    ngOnInit(): void {
        this.getHotels();
        this.getServices();
        this.token = this.userRest.getToken();
        this.identity = this.userRest.getIdentity();
        this.role = this.userRest.getIdentity().role;
    }

    getServices(){
        this.serviceRest.getServices().subscribe({
            next:(res:any)=>{
                this.services = res.services;
                var arrayPrices = [];
                for(var key=0; key<this.services.lenght; key++){
                    var actualPrice = this.services[key].price;
                    var stringPrices = actualPrice.toString();
                    var checkPrice = stringPrices.includes(".")
                    if(checkPrice == true){
                        arrayPrices.push(stringPrices);
                    }
                    else if (checkPrice == false){

                        var newPrice = stringPrices+'.00'
                        arrayPrices.push(newPrice);
                    }
                }
                this.newPrices = arrayPrices;
            },
            error: (err)=> console.log(err)
        })
    }

    getHotels(){
        this.hotelRest.getHotels().subscribe({
            next:(res:any)=>{
                this.hotels = res.hotels,
                console.log(res.hotels);
            },
            error: (err)=> console.log(err)
        })
    }

    newService(newServiceForm:any){
        this.serviceRest.newService(this.service).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonColor: '#28B463'


                });
                this.getServices();
                newServiceForm.reset();
            },
            error: (err:any)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error,
                });
                newServiceForm.reset();
            }
        })
    }

    getService(id:string){
        this.serviceRest.getService(id).subscribe({
            next: (res:any)=>{
                this.updateService = res.service
                console.log(this.updateService)
            },
            error: (err)=>{alert(err.error.message)}
        })
    }

    serviceUpdate(){
        this.serviceRest.serviceUpdate(this.updateService._id, this.updateService).subscribe({
            next:(res:any)=>{
                Swal.fire({
                    icon: 'success',
                    title: res.message,
                    confirmButtonColor: '#E74C3C'

                });
                this.getServices();
            },
            error: (err)=>{
                Swal.fire({
                    icon: 'error',
                    title: err.error.message || err.error
                });
            },
        })

    }

    deleteService(id:string){
        Swal.fire({
            title: 'Are you sure you want to delete this service?',
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: 'Cancel',
            confirmButtonColor: '#DC3311',
            denyButtonColor: '#118CDC'
        }).then((result)=>{
            if(result.isConfirmed){
                this.serviceRest.deleteService(id).subscribe({
                    next:(res:any)=>{
                        Swal.fire({
                            icon: 'success',
                            title: res.message + '  ' + res.deleteService.name + ' has been deleted ',
                            position: 'center',
                            showConfirmButton: true,
                            timer: 2000
                        });
                        this.getServices();
                    },
                    error:(err)=>{
                        Swal.fire({
                            icon: 'error',
                            title: err.error.message
                        })
                        this.getServices();
                    }
                })
            }
        })
    }
}