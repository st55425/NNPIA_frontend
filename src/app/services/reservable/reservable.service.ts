import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Court, Reservation} from "../../types";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReservableService {

  private courtsUrl = `${environment.apiUrl}/courts`;

  constructor(readonly http: HttpClient) { }

  getCourts(){
    return this.http.get<Court[]>(this.courtsUrl);
  }

  getCourtsByTypeId(id: number){
    return this.http.get<Court[]>(`${this.courtsUrl}/types/${id}`);
  }

  deleteCourt(id: number){
    return this.http.delete<Court>(`${this.courtsUrl}/${id}`);
  }

  createCourt(court: Court){
    const headers = { 'content-type': 'application/json'};
    return this.http.post<Court>(this.courtsUrl, JSON.stringify(court),{'headers':headers});
  }

  updateCourt(court: Court){
    const headers = { 'content-type': 'application/json'};
    return this.http.put<Court>(this.courtsUrl, JSON.stringify(court),{'headers':headers});
  }
}
