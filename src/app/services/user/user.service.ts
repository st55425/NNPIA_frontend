import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../types";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = `${environment.apiUrl}/users`;

  constructor(readonly http: HttpClient) { }

  getAllUsers(){
    return this.http.get<User[]>(this.usersUrl);
  }
}
