import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthenticationService} from "../authentication/authentication.service";

//TODO přepsat na jednotlivé role
@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let canActivate = false;

    this.authService.usernameSubject.subscribe(username => {
      if (username === null || username === '') {
        this.router.navigate(['']);
        canActivate = false;
      } else {
        canActivate = true;
      }
    });
    return canActivate;
  }
}
