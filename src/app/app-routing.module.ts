import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserComponent} from './components/Users/user.component';
import {HotelComponent} from './components/hotels/hotel.component';
import {ProfileComponent} from './components/profile/profile.component';
import {EventComponent} from './components/events/event.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UserComponent},
  {path: 'hotels', component: HotelComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'events', component: EventComponent}
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
