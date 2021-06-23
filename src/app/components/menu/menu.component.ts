import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items!: MenuItem[];

  constructor(private readonly authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.roleAsync.subscribe(role =>{
      this.items = [
        {label: 'Rezervace', routerLink: "/rezervace"},
        {label: 'Ceník', routerLink: "/cenik"},
      ];
      if (role === ''){
        this.items = [...this.items,
          {label: 'Log in', routerLink: "/login"},
        ];
      }
      else if (role === 'USER'){
        this.items = [...this.items,
          {label: 'Moje rezervace', routerLink: '/uzivatelrezervace'},
          {label: 'Logout', routerLink: "/logout"}
        ];
      }
      else if (role === 'STAFF'){
        this.items = [...this.items,
          {label: 'Rezervace uživatelů', routerLink: '/uzivatelrezervace'},
          {label: 'Logout', routerLink: "/logout"},
        ];
      }
      else {
        this.items = [...this.items,
          {label: 'Přehled sportovišť', routerLink: '/sportoviste'},
          {label: 'Rezervace uživatelů', routerLink: '/uzivatelrezervace'},
          {label: 'Logout', routerLink: "/logout"}
        ];
      }
    })
  }

}
