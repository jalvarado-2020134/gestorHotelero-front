import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserRestService} from 'src/app/services/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: any;
  role: any;

  constructor(
    private userRest: UserRestService, private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.userRest.getToken();
    this.role = this.userRest.getIdentity().role;
  }

  logOut(){
    localStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Log Out Successfully'
    })
    this.router.navigateByUrl('/login');
  }

}
