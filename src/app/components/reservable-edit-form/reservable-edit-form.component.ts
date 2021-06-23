import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Court, ReservableType} from "../../types";
import {ReservableTypeService} from "../../services/reservable-type/reservable-type.service";
import {ReservableService} from "../../services/reservable/reservable.service";

@Component({
  selector: 'app-reservable-edit-form',
  templateUrl: './reservable-edit-form.component.html',
  styleUrls: ['./reservable-edit-form.component.css']
})
export class ReservableEditFormComponent implements OnInit {

  court: Court;
  types!: ReservableType[];
  new: boolean

  constructor(readonly config: DynamicDialogConfig,
              private ref: DynamicDialogRef,
              readonly reservableTypeService: ReservableTypeService,
              readonly reservableService: ReservableService) {
    if (config.data.court){
      this.court = config.data.court;
      this.new = false;
    }else {
      this.court = {};
      this.new = true;
    }

    this.reservableTypeService.getReservableTypes().subscribe(types => {
      this.types = types;
      if (!this.court.reservableTypeId){
        this.court.reservableTypeId = types[0].id;
      }
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.new){
      this.reservableService.createCourt(this.court).subscribe(data => this.ref.close(data));
    }else{
      this.reservableService.updateCourt(this.court).subscribe(data => this.ref.close(data));
    }
  }
}
