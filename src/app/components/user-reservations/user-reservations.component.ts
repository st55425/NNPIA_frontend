import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReservationService} from "../../services/reservation/reservation.service";
import {Observable, Subscription} from "rxjs";
import {AnonymizedReservation, User} from "../../types";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {map} from "rxjs/operators";
import {FormControl} from "@angular/forms";
import {ifStmt} from "@angular/compiler/src/output/output_ast";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit, OnDestroy {

  usernameCtrl = new FormControl("");

  canChangeUserAsync = this.authService.roleAsync.pipe(map(role => role === "ADMIN"));

  rows = [2, 10, 25, 50];

  futureReservationsFunction = (username: string, page: number, size: number) =>{
    return this.reservationService.getFutureUserReservations(username, page, size);
  }
  pastReservationsFunction = (username: string, page: number, size: number) =>{
    return this.reservationService.getPastUserReservations(username, page, size);
  }

  users!: User[];
  username!: string;

  constructor(readonly reservationService: ReservationService,
              private readonly authService: AuthenticationService,
              private readonly userService: UserService) {
  }

  ngOnInit(): void {
    this.authService.usernameAsync.subscribe(username => {
      this.usernameCtrl.setValue(username);
      this.username = username;
    });
    if (this.authService.roleSubject.getValue() === 'ADMIN'){
      this.userService.getAllUsers().subscribe(users => this.users = users);
    }
    this.usernameCtrl.valueChanges.subscribe(username => {
      if (username){
        this.username = username;
      }
    })
  }

  ngOnDestroy() {
  }
}
