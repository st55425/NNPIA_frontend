import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Court, NewReservation, ReservableType, Reservation, User} from "../../types";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {ReservableService} from "../../services/reservable/reservable.service";
import {ReservableTypeService} from "../../services/reservable-type/reservable-type.service";
import {NgControl, NgForm} from "@angular/forms";
import {catchError, debounceTime, switchMap, tap} from "rxjs/operators";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ifStmt} from "@angular/compiler/src/output/output_ast";
import {ReservationService} from "../../services/reservation/reservation.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-new-reservation-form',
  templateUrl: './new-reservation-form.component.html',
  styleUrls: ['./new-reservation-form.component.css'],
  providers: [MessageService]
})
export class NewReservationFormComponent implements OnInit {

  @Output()

  @ViewChild('resForm', { static: true }) ngForm?: NgForm;

  court?: Court;

  reservation: NewReservation;

  types!: ReservableType[];
  courts!: Court[];
  users!: User[];
  privileged = false;

  constructor(readonly authService: AuthenticationService,
              readonly reservableService: ReservableService,
              readonly reservableTypeService: ReservableTypeService,
              readonly reservationService: ReservationService,
              readonly config: DynamicDialogConfig,
              private ref: DynamicDialogRef,
              private messageService: MessageService,
              private readonly userService: UserService) {
    this.reservation = {timeFrom: new Date(), timeTo: new Date()};
    this.reservation.timeFrom?.setSeconds(0);
    this.reservation.timeFrom?.setMinutes(0);
    this.reservation.timeFrom?.setHours(this.reservation.timeFrom?.getHours() +1);
    this.reservation.timeTo?.setSeconds(0);
    this.reservation.timeTo?.setMinutes(0);
    this.reservation.timeTo?.setHours(this.reservation.timeTo?.getHours() +2);
    this.authService.usernameAsync.subscribe(username => this.reservation.username = username);
    this.authService.roleAsync.subscribe(role => this.privileged = role === 'ADMIN' || role === 'STAFF');

    this.court = config.data.court
  }

  ngOnInit(): void {
    this.reservableTypeService.getReservableTypes().subscribe(types => {
      this.types = types;
      if (this.court){
        this.reservation.court = this.court.id;
        this.reservation.reservableType = this.types.find(type => type.reservableList?.find(court => court.id === this.reservation.court))?.id;
      }else {
        this.reservation.reservableType = this.types[0]?.id;
        this.courts = this.types[0].reservableList ?? [];
        this.reservation.court = this.courts[0]?.id;
      }
    });

    this.ngForm?.form.valueChanges?.pipe(
      switchMap(a => this.reservableService.getCourtsByTypeId(a.type ?? 1))
    ).subscribe(data => {
      this.courts = data;
      if (data.length >0){
        this.reservation.court = this.courts[0].id;
      }
    });
    if (this.authService.roleSubject.getValue() === 'ADMIN'){
      this.userService.getAllUsers().subscribe(users => this.users = users);
    }
  }

  onSubmit() {
    this.messageService.clear();
    this.reservation.timeFrom?.setDate(this.reservation.date?.getDate() ?? Date.now());
    this.reservation.timeTo?.setDate(this.reservation.date?.getDate() ?? Date.now());
    this.reservationService.createReservation({
      timeFrom: this.reservation.timeFrom ?? new Date(),
      timeTo: this.reservation.timeTo ?? new Date(),
      reservableId: this.reservation.reservableType ?? 0,
      userName: this.reservation.username ?? this.authService.usernameSubject.getValue()
    }).subscribe(data => this.ref.close(data), error => this.messageService.add({severity:'error', summary: 'Rezervaci nelze vytvořit'}));
  }
}
