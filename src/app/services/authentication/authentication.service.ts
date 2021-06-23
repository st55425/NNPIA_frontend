import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {filter, map, tap} from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import {BehaviorSubject, fromEvent, of} from "rxjs";
import {environment} from "../../../environments/environment";

export interface JwtResponse{
  jwttoken: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  roleSubject = new BehaviorSubject(sessionStorage.getItem('role') ?? '');
  roleAsync = this.roleSubject.asObservable();

  usernameSubject = new BehaviorSubject(sessionStorage.getItem('username') ?? '');
  usernameAsync = this.usernameSubject.asObservable();
  userLoggedInAsync = this.usernameAsync.pipe(map(username => username !== ''));

  constructor(
    private httpClient:HttpClient
  ) {
  }

  authenticate(username: string, password: string) {
    return this.httpClient.post<JwtResponse>(`${environment.apiUrl}/authenticate`,{username,password}).pipe(
      map(
        userData => {
          try{
            let decodedToken: any = jwt_decode(userData.jwttoken);
            sessionStorage.setItem('token', `Bearer ${userData.jwttoken}`);
            this.setRole(decodedToken.role);
            this.setUsername(decodedToken.sub);
          }
          catch(Error){
            this.roleSubject.next('')
            return userData;
          }
          return userData;
        }
      )
    );
  }

  private setRole(newRole: string){
    sessionStorage.setItem('role', newRole);
    this.roleSubject.next(newRole);
  }

  private setUsername(newUsername: string){
    sessionStorage.setItem('username', newUsername);
    this.usernameSubject.next(newUsername);
  }

  logOut() {
    sessionStorage.removeItem('token');
    this.setUsername('');
    this.setRole('');
  }
}
