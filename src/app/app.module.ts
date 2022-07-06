import { NgModule, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {UserComponent} from './components/Users/user.component';
import { HotelComponent } from './components/hotels/hotel.component';
import {SearchPipe} from './pipes/search.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import {EventComponent} from './components/events/event.component';
import {TypeEventComponent} from './components/typeEvent/typeEvent.component';

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
    TypeEventComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
