import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import {MenubarModule} from "primeng/menubar";
import { ReservationCalendarComponent } from './components/reservation-calendar/reservation-calendar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {ButtonModule} from "primeng/button";
import {FullCalendarModule} from "primeng/fullcalendar";
import { ReservationComponent } from './components/reservation/reservation.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './components/login/login.component';
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {AuthHtppInterceptorService} from "./services/auth-http-interceptor/auth-htpp-interceptor.service";
import {MessageModule} from "primeng/message";
import { LogoutComponent } from './components/logout/logout.component';
import { PricelistComponent } from './components/pricelist/pricelist.component';
import {TableModule} from "primeng/table";
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';
import { UserReservationsTableComponent } from './components/user-reservations-table/user-reservations-table.component';
import {RippleModule} from "primeng/ripple";
import { CourtManagementComponent } from './components/court-management/court-management.component';
import { NewReservationFormComponent } from './components/new-reservation-form/new-reservation-form.component';
import {CalendarModule} from "primeng/calendar";
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {MessagesModule} from "primeng/messages";
import { ReservableEditFormComponent } from './components/reservable-edit-form/reservable-edit-form.component';
import {ToggleButtonModule} from "primeng/togglebutton";
import { ReservableTypeEditFormComponent } from './components/reservable-type-edit-form/reservable-type-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ReservationCalendarComponent,
    PageNotFoundComponent,
    ReservationComponent,
    LoginComponent,
    LogoutComponent,
    PricelistComponent,
    UserReservationsComponent,
    UserReservationsTableComponent,
    CourtManagementComponent,
    NewReservationFormComponent,
    ReservableEditFormComponent,
    ReservableTypeEditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    ButtonModule,
    FullCalendarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    TableModule,
    RippleModule,
    CalendarModule,
    DynamicDialogModule,
    MessagesModule,
    ToggleButtonModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHtppInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
