import { Component, OnInit } from '@angular/core';
import {ReservableTypeService} from "../../services/reservable-type/reservable-type.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {ReservableType} from "../../types";

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  reservableTypes!: ReservableType[];

  cols: any[];

  constructor(private readonly reservableTypeService: ReservableTypeService) {
    this.cols = [
      {field: 'expand', header: ''},
      { field: 'name', header: 'Typ Sportoviště'},
      { field: 'openFrom', header: 'Otevřeno od' },
      { field: 'openTo', header: 'Otevřeno do' },
      { field: 'price', header: 'Základní cena' },
    ];
  }

  ngOnInit(): void {
    this.reservableTypeService.getReservableTypes().subscribe(data => this.reservableTypes = data);
  }

}
