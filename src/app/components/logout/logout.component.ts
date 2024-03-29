import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private readonly authentocationService: AuthenticationService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.authentocationService.logOut();
    this.router.navigate(['']);
  }

}
