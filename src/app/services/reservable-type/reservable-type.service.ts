import {Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Court, ReservableType} from "../../types";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReservableTypeService {

  private reservableTypeUrl = `${environment.apiUrl}/reservabletypes`;
  private headers = { 'content-type': 'application/json'};

  constructor(readonly http: HttpClient) { }

  getReservableTypes(){
    return this.http.get<ReservableType[]>(`${this.reservableTypeUrl}`).pipe(
      map(types => types.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)))
    );
  }

  deleteReservableType(id: number){
    this.http.delete(`${this.reservableTypeUrl}/${id}`).subscribe();
  }

  createReservableType(reservableType: ReservableType){
    return this.http.post<ReservableType>(this.reservableTypeUrl, JSON.stringify(reservableType),{'headers':this.headers});
  }

  updateReservableType(reservableType: ReservableType){
    return this.http.put<ReservableType>(this.reservableTypeUrl, JSON.stringify(reservableType),{'headers':this.headers});
  }
}
