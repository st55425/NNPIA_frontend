import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AnonymizedReservation, Page, Reservation} from "../../types";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationsUrl = `${environment.apiUrl}/reservations`;

  constructor(readonly http: HttpClient) { }

  getAnonymizedReservationsByCourt(id: number){
    return this.http.get<AnonymizedReservation[]>(`${this.reservationsUrl}/anonym/${id}`);
  }

  getFutureUserReservations(username: string, page: number, size: number){
    return this.http.get<Page<AnonymizedReservation>>(`${this.reservationsUrl}/future/${username}?page=${page}&size=${size}`);
  }

  getPastUserReservations(username: string, page: number, size: number){
    return this.http.get<Page<AnonymizedReservation>>(`${this.reservationsUrl}/past/${username}?page=${page}&size=${size}`);
  }

  deleteReservation(id: number){
    this.http.delete(`${this.reservationsUrl}/${id}`).subscribe();
  }

  createReservation(reservation: Reservation){
    const headers = { 'content-type': 'application/json'};
    return this.http.post<Reservation>(this.reservationsUrl, JSON.stringify(reservation),{'headers':headers});
  }
}
