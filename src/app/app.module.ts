import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserComponent} from './components/Users/user.component';
import { environment } from 'src/environments/environment';
import { HotelComponent } from './components/hotels/hotel.component';
import {SearchPipe} from './pipes/search.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import {EventComponent} from './components/events/event.component';
import {TypeEventComponent} from './components/typeEvent/typeEvent.component';
import {ServiceComponent} from './components/services/service.component';
import { HotelPipe } from './pipes/hotel.pipe';
import {RoomComponent} from './components/rooms/room.component';
import { ReservationManagerComponent } from './components/reservations/reservation-manager/reservation-manager.component';
import {ReservationUserComponent} from './components/reservations/reservation-client/reservation-client.component';
import {BillComponent} from './components/bill/bill.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    HotelComponent,
    SearchPipe,
    ProfileComponent,
    EventComponent,
    TypeEventComponent,
    ServiceComponent,
    HotelPipe,
    RoomComponent,
    ReservationManagerComponent,
    ReservationUserComponent,
    BillComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
